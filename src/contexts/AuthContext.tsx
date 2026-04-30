
// src/contexts/AuthContext.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC — Authentication Context
//
// Provides platform-wide auth state derived from the Spring Boot JWT backend.
// Token stored in localStorage under 'ww_token'.
// On app load, if a token exists, /api/auth/me is called to hydrate the user.
// If /me returns 401 (expired/invalid), token is cleared and user is logged out.
//
// User shape matches AuthResponse / UserProfileResponse from backend:
//   { id, email, username, role, status, canVote, canEnrollInProgrammes, member }
//
// Exposed via useAuth() hook — import anywhere in the tree.
//
// Connected to:
//   Header.tsx          — isLoggedIn, user, logout()
//   Your Panel pages    — user.id for API calls, user.role for admin views
//   Maya               — user.member for ROV context
//   Activity tracker   — user.id for POST /api/panel/activity
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

export interface WembleyUser {
  createdAt: string | number | Date;
  id: number;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  canVote: boolean;
  canEnrollInProgrammes: boolean;
  member: boolean;
  // Derived display fields — computed from email until profile endpoint
  // returns firstName/lastName separately
  displayName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  canVote: boolean;
  member: boolean;
}

interface AuthContextShape {
  // State
  user: WembleyUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;         // true while /me is being called on startup
  authError: string | null;   // last login/register error message

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearAuthError: () => void;
  refreshUser: () => Promise<void>; // re-fetches /me, use after role changes
}

// ── Constants ────────────────────────────────────────────────────────────────

const TOKEN_KEY    = 'ww_token';
const API_BASE     = '/api';  // proxied via Vite or Nginx to :8080

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextShape | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser]           = useState<WembleyUser | null>(null);
  const [token, setToken]         = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // ── Derive display name from email until profile returns full name ─────────
  const deriveDisplayName = (email: string): string => {
    const local = email.split('@')[0];
    return local.replace(/[._-]/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  // ── Fetch /me and hydrate user state ──────────────────────────────────────
  const fetchMe = useCallback(async (jwt: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (res.status === 401 || res.status === 403) {
        // Token expired or invalid — clear everything
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        return false;
      }

      if (!res.ok) throw new Error(`/me returned ${res.status}`);

      const data: WembleyUser = await res.json();
      setUser({
        ...data,
        displayName: deriveDisplayName(data.email),
      });
      setToken(jwt);
      return true;
    } catch (err) {
      console.error('[AuthContext] fetchMe failed:', err);
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
      return false;
    }
  }, []);

  // ── On mount: hydrate from stored token ───────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      fetchMe(stored).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchMe]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Login failed. Please check your details.');
        return false;
      }

      const authData = data as AuthResponse;
      localStorage.setItem(TOKEN_KEY, authData.token);

      // Hydrate full user from /me so role/status are always current
      const ok = await fetchMe(authData.token);
      if (!ok) {
        setAuthError('Login succeeded but profile could not be loaded.');
        return false;
      }

      // Dispatch event so Maya and activity tracker can respond
      window.dispatchEvent(new CustomEvent('ww:auth:login', {
        detail: { userId: authData.userId, role: authData.role }
      }));

      return true;
    } catch (err) {
      setAuthError('Connection error. Please try again.');
      return false;
    }
  }, [fetchMe]);

  // ── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Registration failed.');
        return false;
      }

      const authData = data as AuthResponse;
      localStorage.setItem(TOKEN_KEY, authData.token);
      await fetchMe(authData.token);

      window.dispatchEvent(new CustomEvent('ww:auth:register', {
        detail: { userId: authData.userId }
      }));

      return true;
    } catch (err) {
      setAuthError('Connection error. Please try again.');
      return false;
    }
  }, [fetchMe]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthError(null);

    // Clear activity tracking localStorage on logout
    Object.keys(localStorage)
      .filter(k => k.startsWith('ww_activity_'))
      .forEach(k => localStorage.removeItem(k));

    window.dispatchEvent(new CustomEvent('ww:auth:logout'));

    // Redirect to home — don't use navigate() here to avoid
    // circular dependency with router; let components handle redirect
    window.location.href = '/';
  }, []);

  // ── Refresh user (call after admin promotes role etc.) ────────────────────
  const refreshUser = useCallback(async () => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) await fetchMe(stored);
  }, [fetchMe]);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  // ── Value ─────────────────────────────────────────────────────────────────
  const value: AuthContextShape = {
    user,
    token,
    isLoggedIn: !!user,
    isLoading,
    authError,
    login,
    register,
    logout,
    clearAuthError,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextShape => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// ── Utility: get token for direct API calls outside React ─────────────────
// Use in activity tracker POSTs, Maya API calls etc.
export const getStoredToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

