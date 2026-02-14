/**
 * Auth Store - Authentication and user session management
 * Features: JWT tokens, session validation, user preferences, social login
 * @module features/workspace/stores/authStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { apiClient } from '../services/apiClient';

// Define User type locally since it's auth-specific
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: boolean;
  newsletter: boolean;
  marketingEmails: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

// ============================================================================
// AUTH STORE STATE
// ============================================================================

interface AuthState {
  // User data
  user: User | null;
  tokens: AuthTokens | null;
  
  // Session state
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  sessionExpiry: Date | null;
  
  // UI state
  error: string | null;
  successMessage: string | null;
  
  // Actions - Authentication
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  
  // Actions - Session
  refreshToken: () => Promise<void>;
  validateSession: () => Promise<boolean>;
  checkAuthStatus: () => void;
  
  // Actions - Password
  requestPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, password: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  
  // Actions - User
  loadUser: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  
  // Actions - Email
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  
  // Utility
  reset: () => void;
  clearError: () => void;
  clearSuccessMessage: () => void;
}

// ============================================================================
// AUTH STORE IMPLEMENTATION
// ============================================================================

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        isRefreshing: false,
        sessionExpiry: null,
        error: null,
        successMessage: null,
        
        // Authentication Actions
        login: async (credentials) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            const response = await apiClient.post<{
              user: User;
              tokens: AuthTokens;
            }>('/api/auth/login', credentials);
            
            // Set tokens in apiClient
            apiClient.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
            
            // Calculate session expiry
            const expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + response.tokens.expiresIn);
            
            set(state => {
              state.user = response.user;
              state.tokens = response.tokens;
              state.isAuthenticated = true;
              state.sessionExpiry = expiryDate;
              state.isLoading = false;
              state.successMessage = 'Successfully logged in';
            });
            
            // Store userId for workspace store
            localStorage.setItem('userId', response.user.id);
            
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Login failed';
            });
            throw error;
          }
        },
        
        loginWithGoogle: async () => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            // Redirect to Google OAuth
            window.location.href = `${apiClient.getBaseURL()}/api/auth/google`;
            
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Google login failed';
            });
            throw error;
          }
        },
        
        loginWithGithub: async () => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            // Redirect to GitHub OAuth
            window.location.href = `${apiClient.getBaseURL()}/api/auth/github`;
            
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'GitHub login failed';
            });
            throw error;
          }
        },
        
        logout: async () => {
          try {
            // Call logout endpoint
            await apiClient.post('/api/auth/logout', {});
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            // Clear tokens
            apiClient.clearTokens();
            localStorage.removeItem('userId');
            
            // Reset state
            set(state => {
              state.user = null;
              state.tokens = null;
              state.isAuthenticated = false;
              state.sessionExpiry = null;
              state.error = null;
              state.successMessage = null;
            });
          }
        },
        
        register: async (data) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            const response = await apiClient.post<{
              user: User;
              tokens: AuthTokens;
            }>('/api/auth/register', data);
            
            // Set tokens in apiClient
            apiClient.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
            
            // Calculate session expiry
            const expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + response.tokens.expiresIn);
            
            set(state => {
              state.user = response.user;
              state.tokens = response.tokens;
              state.isAuthenticated = true;
              state.sessionExpiry = expiryDate;
              state.isLoading = false;
              state.successMessage = 'Account created successfully';
            });
            
            localStorage.setItem('userId', response.user.id);
            
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Registration failed';
            });
            throw error;
          }
        },
        
        // Session Actions
        refreshToken: async () => {
          const { tokens } = get();
          if (!tokens?.refreshToken) {
            throw new Error('No refresh token available');
          }
          
          try {
            set(state => {
              state.isRefreshing = true;
            });
            
            const response = await apiClient.post<AuthTokens>(
              '/api/auth/refresh',
              { refreshToken: tokens.refreshToken }
            );
            
            // Update tokens
            apiClient.setTokens(response.accessToken, response.refreshToken);
            
            // Calculate new session expiry
            const expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + response.expiresIn);
            
            set(state => {
              state.tokens = response;
              state.sessionExpiry = expiryDate;
              state.isRefreshing = false;
            });
            
          } catch (error: any) {
            set(state => {
              state.isRefreshing = false;
              state.isAuthenticated = false;
              state.error = 'Session expired - please log in again';
            });
            throw error;
          }
        },
        
        validateSession: async () => {
          try {
            const response = await apiClient.get<{ valid: boolean; user?: User }>(
              '/api/auth/validate'
            );
            
            if (response.valid && response.user) {
              const user = response.user;
              set(state => {
                state.user = user;
                state.isAuthenticated = true;
              });
              return true;
            } else {
              set(state => {
                state.isAuthenticated = false;
              });
              return false;
            }
          } catch (error) {
            set(state => {
              state.isAuthenticated = false;
            });
            return false;
          }
        },
        
        checkAuthStatus: () => {
          const { sessionExpiry } = get();
          
          if (!sessionExpiry) {
            set(state => {
              state.isAuthenticated = false;
            });
            return;
          }
          
          const now = new Date();
          const isExpired = now >= sessionExpiry;
          
          if (isExpired) {
            // Try to refresh token
            get().refreshToken().catch(() => {
              get().logout();
            });
          }
        },
        
        // Password Actions
        requestPasswordReset: async (email) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/password-reset/request', { email });
            
            set(state => {
              state.isLoading = false;
              state.successMessage = 'Password reset email sent';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to send reset email';
            });
            throw error;
          }
        },
        
        confirmPasswordReset: async (token, password) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/password-reset/confirm', {
              token,
              password
            });
            
            set(state => {
              state.isLoading = false;
              state.successMessage = 'Password reset successfully';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to reset password';
            });
            throw error;
          }
        },
        
        changePassword: async (currentPassword, newPassword) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/change-password', {
              currentPassword,
              newPassword
            });
            
            set(state => {
              state.isLoading = false;
              state.successMessage = 'Password changed successfully';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to change password';
            });
            throw error;
          }
        },
        
        // User Actions
        loadUser: async () => {
          try {
            set(state => {
              state.isLoading = true;
            });
            
            const user = await apiClient.get<User>('/api/auth/me');
            
            set(state => {
              state.user = user;
              state.isAuthenticated = true;
              state.isLoading = false;
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to load user';
            });
            throw error;
          }
        },
        
        updateUser: async (updates) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            const updatedUser = await apiClient.patch<User>('/api/auth/me', updates);
            
            set(state => {
              state.user = updatedUser;
              state.isLoading = false;
              state.successMessage = 'Profile updated successfully';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to update profile';
            });
            throw error;
          }
        },
        
        updatePreferences: async (preferences) => {
          try {
            const updatedUser = await apiClient.patch<User>(
              '/api/auth/me/preferences',
              preferences
            );
            
            set(state => {
              if (state.user) {
                state.user.preferences = {
                  ...state.user.preferences,
                  ...preferences
                } as UserPreferences;
              }
            });
          } catch (error) {
            throw error;
          }
        },
        
        deleteAccount: async (password) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/delete-account', { password });
            
            // Clear everything
            apiClient.clearTokens();
            localStorage.clear();
            
            set(state => {
              state.user = null;
              state.tokens = null;
              state.isAuthenticated = false;
              state.isLoading = false;
            });
            
            // Redirect to home
            window.location.href = '/';
            
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to delete account';
            });
            throw error;
          }
        },
        
        // Email Actions
        verifyEmail: async (token) => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/verify-email', { token });
            
            set(state => {
              if (state.user) {
                state.user.emailVerified = true;
              }
              state.isLoading = false;
              state.successMessage = 'Email verified successfully';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to verify email';
            });
            throw error;
          }
        },
        
        resendVerificationEmail: async () => {
          try {
            set(state => {
              state.isLoading = true;
              state.error = null;
            });
            
            await apiClient.post('/api/auth/resend-verification', {});
            
            set(state => {
              state.isLoading = false;
              state.successMessage = 'Verification email sent';
            });
          } catch (error: any) {
            set(state => {
              state.isLoading = false;
              state.error = error.message || 'Failed to send verification email';
            });
            throw error;
          }
        },
        
        // Utility Actions
        reset: () => {
          set(state => {
            state.user = null;
            state.tokens = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.isRefreshing = false;
            state.sessionExpiry = null;
            state.error = null;
            state.successMessage = null;
          });
        },
        
        clearError: () => {
          set(state => {
            state.error = null;
          });
        },
        
        clearSuccessMessage: () => {
          set(state => {
            state.successMessage = null;
          });
        }
      })),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
          sessionExpiry: state.sessionExpiry
        })
      }
    ),
    {
      name: 'auth-store'
    }
  )
);
