/**
 * API Client - Core HTTP client with authentication and error handling
 * Features: JWT auth, retry logic, request/response interceptors, error handling
 * @module features/workspace/services/apiClient
 */

/**
 * Local ApiRequestConfig since '../types' does not export it.
 * Define minimal commonly used fields for requests.
 */
interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  signal?: AbortSignal;
}

interface ApiMetrics {
  totalRequests: number;
  failedRequests: number;
  avgResponseTime: number;
  responseTimes: number[];
}

/**
/**
 * Local RetryConfig since '../types' does not export it.
 */
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryOn: number[];
}

/**
 * Local AuthToken shape since '../types' does not export it.
 */
interface AuthToken {
  accessToken: string;
  refreshToken?: string;
}
/**
 * Alias the imported ApiRequestConfig to the RequestConfig name used in this file,
 * and extend it locally with common HTTP request fields used by this client.
 */
type RequestConfig = ApiRequestConfig & {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: any;
  headers?: Record<string, string>;
  responseType?: 'blob' | 'json' | string;
  onUploadProgress?: (progressEvent: { total: number; loaded: number }) => void;
  retry?: boolean;
};

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: any[],
    public requestId?: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

/**
 * API Client configuration
 */
interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retryConfig?: RetryConfig;
  onAuthError?: () => void;
  onNetworkError?: () => void;
  enableMetrics?: boolean;
}

/**
 * Core API client with authentication and error handling
 */
class ApiClient {
  getAccessToken() {
      throw new Error('Method not implemented.');
  }
  private baseURL: string;
  private timeout: number;
  private retryConfig: RetryConfig;
  private authToken: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];
  private metrics: ApiMetrics = {
    totalRequests: 0,
    failedRequests: 0,
    avgResponseTime: 0,
    responseTimes: []
  };

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL || process.env.REACT_APP_API_URL || 'http://localhost:8080';
    this.timeout = config.timeout || 30000;
    this.retryConfig = config.retryConfig || {
      maxRetries: 3,
      retryDelay: 1000,
      retryOn: [408, 429, 500, 502, 503, 504]
    };

    // Load tokens from storage
    this.loadTokens();
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * Upload file with progress tracking
   */
  async upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
    config?: RequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data: formData,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent: { total: number; loaded: number; }) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });
  }

  /**
   * Download file
   */
  async download(url: string, filename?: string): Promise<void> {
    const response = await this.request<Blob>({
      method: 'GET',
      url,
      responseType: 'blob'
    });

    // Create download link
    const downloadUrl = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  /**
   * Core request method with retry logic
   */
  private async request<T>(config: RequestConfig): Promise<T> {
    const startTime = Date.now();
    let lastError: any;
    let attempt = 0;

    while (attempt <= this.retryConfig.maxRetries) {
      try {
        const response = await this.executeRequest<T>(config);
        
        // Update metrics
        this.updateMetrics(Date.now() - startTime, true);
        
        return response;
      } catch (error: any) {
        lastError = error;
        attempt++;

        // Check if we should retry
        if (!this.shouldRetry(error, attempt, config)) {
          this.updateMetrics(Date.now() - startTime, false);
          throw this.handleError(error);
        }

        // Wait before retry with exponential backoff
        const delay = this.calculateRetryDelay(attempt);
        await this.sleep(delay);
      }
    }

    this.updateMetrics(Date.now() - startTime, false);
    throw this.handleError(lastError);
  }

  /**
   * Execute single request
   */
  private async executeRequest<T>(config: RequestConfig): Promise<T> {
    // Ensure auth token is set
    await this.ensureAuthenticated();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${config.url}`, {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
          ...config.headers
        },
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle auth errors
      if (response.status === 401) {
        return this.handleAuthError(config);
      }

      // Handle errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiClientError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData.errors,
          response.headers.get('X-Request-Id') || undefined
        );
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      } else if (config.responseType === 'blob') {
        return await response.blob() as any;
      } else {
        return await response.text() as any;
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 408);
      }
      
      throw error;
    }
  }

  /**
   * Handle authentication error (401)
   */
  private async handleAuthError<T>(originalRequest: RequestConfig): Promise<T> {
    if (!this.refreshToken) {
      this.clearTokens();
      window.location.href = '/login';
      throw new ApiClientError('Authentication required', 401);
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;

      try {
        const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken: this.refreshToken })
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const data: AuthToken = await response.json();
        this.setTokens(data.accessToken, data.refreshToken);

        // Notify all subscribers
        this.refreshSubscribers.forEach(callback => callback(data.accessToken));
        this.refreshSubscribers = [];

      } catch (error) {
        this.clearTokens();
        window.location.href = '/login';
        throw new ApiClientError('Session expired', 401);
      } finally {
        this.isRefreshing = false;
      }
    }

    // Wait for token refresh
    return new Promise<T>((resolve, reject) => {
      this.refreshSubscribers.push((token: string) => {
        this.request<T>(originalRequest)
          .then(resolve)
          .catch(reject);
      });
    });
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(error: any, attempt: number, config: RequestConfig): boolean {
    // Don't retry if explicitly disabled
    if (config.retry === false) return false;

    // Don't retry if max attempts reached
    if (attempt > this.retryConfig.maxRetries) return false;

    // Check if status code is retryable
    if (error.statusCode && this.retryConfig.retryOn.includes(error.statusCode)) {
      return true;
    }

    // Retry on network errors
    if (!error.statusCode && error.name !== 'ApiClientError') {
      return true;
    }

    return false;
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number): number {
    const baseDelay = this.retryConfig.retryDelay;
    const maxDelay = baseDelay * Math.pow(2, 4); // Max 16x base delay
    const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
    
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay;
    
    return delay + jitter;
  }

  /**
   * Handle and transform errors
   */
  private handleError(error: any): Error {
    if (error instanceof ApiClientError) {
      return error;
    }

    if (error.name === 'NetworkError' || !navigator.onLine) {
      return new ApiClientError('Network error - please check your connection', 0);
    }

    return new ApiClientError(
      error.message || 'An unexpected error occurred',
      error.statusCode
    );
  }

  /**
   * Authentication helpers
   */

  private async ensureAuthenticated(): Promise<void> {
    if (!this.authToken) {
      this.loadTokens();
      if (!this.authToken) {
        throw new ApiClientError('Authentication required', 401);
      }
    }
  }

  private getAuthHeaders(): Record<string, string> {
    return this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {};
  }

  setTokens(accessToken: string, refreshToken?: string): void {
    this.authToken = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }

    // Store in localStorage
    localStorage.setItem('auth_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private loadTokens(): void {
    this.authToken = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    this.authToken = null;
    this.refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Metrics and monitoring
   */

  private updateMetrics(responseTime: number, success: boolean): void {
    this.metrics.totalRequests++;
    
    if (!success) {
      this.metrics.failedRequests++;
    }

    this.metrics.responseTimes.push(responseTime);
    
    // Keep only last 100 response times
    if (this.metrics.responseTimes.length > 100) {
      this.metrics.responseTimes.shift();
    }

    // Calculate average
    this.metrics.avgResponseTime = 
      this.metrics.responseTimes.reduce((a: any, b: any) => a + b, 0) / 
      this.metrics.responseTimes.length;
  }

  getMetrics(): ApiMetrics {
    return { ...this.metrics };
  }

  /**
   * Utility methods
   */

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getBaseURL(): string {
    return this.baseURL;
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }
}

// Export singleton instance
export const apiClient = new ApiClient({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 30000,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    retryOn: [408, 429, 500, 502, 503, 504]
  }
});