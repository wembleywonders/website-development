import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse, UserProfile, LoginRequest, RegisterRequest } from '../services/authService';

interface User {
  // avatar may be absent for some responses, make it optional
  avatar?: any;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  membershipStatus: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginData: LoginRequest) => Promise<AuthResponse>;
  register: (registerData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  // ✨ NEW: exposes the raw JWT Bearer token for direct API calls
  // Used by ClaimPage and any other component that calls the backend directly
  getToken: () => string | null;
  // Permission helpers
  canVote: () => boolean;
  canEnrollInProgrammes: () => boolean;
  isAdmin: () => boolean;
  isOrganizer: () => boolean;
  isMember: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setIsLoading(true);
    
    try {
      if (authService.isAuthenticated()) {
        // Validate token and get current user
        const isValid = await authService.validateToken();
        
        if (isValid) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        } else {
          // Token is invalid, clear auth data
          authService.logout();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const authResponse = await authService.login(loginData);
      
      // Set user from response
      setUser({
        id: authResponse.userId,
        email: authResponse.email,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        role: authResponse.role,
        membershipStatus: authResponse.membershipStatus,
      });

      return authResponse;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const authResponse = await authService.register(registerData);
      
      // Set user from response
      setUser({
        id: authResponse.userId,
        email: authResponse.email,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        role: authResponse.role,
        membershipStatus: authResponse.membershipStatus,
      });

      return authResponse;
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    if (!authService.isAuthenticated()) return;

    try {
      const profile = await authService.getProfile();
      setUser({
        id: profile.id,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: profile.role,
        membershipStatus: profile.membershipStatus,
      });
    } catch (error) {
      console.error('Error refreshing user:', error);
      // If refresh fails, might be due to expired token
      logout();
    }
  };

  // ✨ NEW: returns the raw JWT stored by authService, or null if not authenticated.
  // Delegates to authService so there is one source of truth for token storage.
  const getToken = (): string | null => authService.getToken?.() ?? null;

  // Permission helper functions
  const canVote = () => authService.canVote();
  const canEnrollInProgrammes = () => authService.canEnrollInProgrammes();
  const isAdmin = () => authService.isAdmin();
  const isOrganizer = () => authService.isOrganizer();
  const isMember = () => authService.isMember();

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    getToken,
    canVote,
    canEnrollInProgrammes,
    isAdmin,
    isOrganizer,
    isMember,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'VISITOR' | 'MEMBER' | 'ORGANIZER' | 'ADMIN';
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallback = <div className="text-center py-8">Please log in to access this page.</div> 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check role requirement
  if (requiredRole && user) {
    const roleHierarchy = { 'VISITOR': 0, 'MEMBER': 1, 'ORGANIZER': 2, 'ADMIN': 3 };
    const userRoleLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] ?? 0;
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return (
        <div className="text-center py-8">
          <p>You don't have permission to access this page.</p>
          <p>Required role: {requiredRole}</p>
        </div>
      );
    }
  }

  return <>{children}</>;
}