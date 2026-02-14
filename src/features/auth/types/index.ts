/**
 * Auth Type Definitions
 * @module features/auth/types
 */

// Local fallback definitions for auth types (used when ../stores/authStore is not available)
export interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
  preferences?: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  locale?: string;
  theme?: 'light' | 'dark';
  timezone?: string;
  newsletter?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  agreeToTerms?: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Local definition for AuthTokens (keeps this module self-contained if the store doesn't export it)
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
  issuedAt?: Date;
}

// Additional auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
}

export interface OAuthProvider {
  name: 'google' | 'github' | 'microsoft' | 'apple';
  enabled: boolean;
  clientId: string;
  scope: string[];
  authUrl: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  lastActivityAt: Date;
  ip: string;
  userAgent: string;
  device?: string;
}
