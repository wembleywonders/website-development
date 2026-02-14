const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  membershipStatus: string;
  canVote: boolean;
  canEnrollInProgrammes: boolean;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  membershipStatus: string;
  registrationDate: string;
  lastLoginDate: string;
  canVote: boolean;
  canEnrollInProgrammes: boolean;
}

class AuthService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }

    const authResponse: AuthResponse = await response.json();
    
    // Store token and user info
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify({
      id: authResponse.userId,
      email: authResponse.email,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      role: authResponse.role,
      membershipStatus: authResponse.membershipStatus,
    }));

    return authResponse;
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }

    const authResponse: AuthResponse = await response.json();
    
    // Store token and user info
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify({
      id: authResponse.userId,
      email: authResponse.email,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      role: authResponse.role,
      membershipStatus: authResponse.membershipStatus,
    }));

    return authResponse;
  }

  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  }

  async validateToken(): Promise<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  canVote(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'MEMBER' || user?.role === 'ORGANIZER' || user?.role === 'ADMIN';
  }

  canEnrollInProgrammes(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'MEMBER' || user?.role === 'ORGANIZER' || user?.role === 'ADMIN';
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isOrganizer(): boolean {
    return this.hasRole('ORGANIZER') || this.hasRole('ADMIN');
  }

  isMember(): boolean {
    const user = this.getCurrentUser();
    return ['MEMBER', 'ORGANIZER', 'ADMIN'].includes(user?.role);
  }
}

export const authService = new AuthService();