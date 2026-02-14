/**
 * Activity Service - Real-time activity feed management
 * Features: Activity tracking, filtering, read states, real-time updates
 * @module features/workspace/services/activityService
 */

import { apiClient } from './apiClient';

// Fallback/local type for ActivityFilter when not exported from ../types.
// Keep permissive to support filtering options used by this service.
type ActivityFilter = {
  types?: string[];
  projectId?: string;
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
  [key: string]: any;
};

// Fallback/local type for ActivityNotification when not exported from ../types.
// Keep permissive to allow additional fields coming from the server and to avoid
// breaking callers; extend with specific fields if desired.
type ActivityNotification = {
  id: string;
  activityId?: string;
  title?: string;
  message?: string;
  read?: boolean;
  timestamp?: string | Date;
  [key: string]: any;
};

// Fallback/local type for ActivityType when not exported from ../types.
// Fallback/local type for ActivityType when not exported from ../types.
// Keep permissive to avoid breaking callers; extend with specific literals if desired.
type ActivityType = string;

// Fallback/local type for ActivityTimeline when not exported from ../types.
// Represented as a mapping of ISO date strings to arrays of activities, with
// optional metadata; keep permissive so server shapes can be extended.
type ActivityTimeline = {
  [date: string]: Activity[] | any;
  total?: number;
};

// Local fallback for RecentActivity when ../types does not export it.
// Keep properties minimal and permissive to match usage across the service.
type RecentActivity = {
  id: string;
  title?: string;
  excerpt?: string;
  timestamp: string;
  [key: string]: any;
};
// Local fallback for Activity when ../types does not export it.
// Local fallback for Activity when ../types does not export it.
// Local fallback for Activity when ../types does not export it.
// Local fallback for Activity when ../types does not export it.
// Local fallback for Activity when ../types does not export it.
// Keep properties minimal and permissive to match usage across the service.
type Activity = {
  id: string;
  timestamp: string;
  readAt?: string | Date | null;
  [key: string]: any;
};

type ActivityEvent = {
  // Minimal event shape used when the type is not exported from ../types.
  // Extend fields as needed to match server/client contract.
  type: string;
  actorId?: string;
  targetId?: string;
  payload?: any;
  timestamp?: string | Date;
  [key: string]: any;
};

type ActivityFeed = {
  activities: Activity[];
  total?: number;
  page?: number;
  size?: number;
};

type ActivityMetrics = {
  // Total number of activities in the measured period
  total?: number;
  // Metrics broken down by period/key (e.g., day => count)
  perPeriod?: Record<string, number>;
  // Trends or series data points
  trends?: any[];
  // Optional top entities/actors contributing to activity
  topEntities?: any[];
  // Number of active users in the period
  activeUsers?: number;
  // Allow additional fields to match server shape
  [key: string]: any;
};
// Fallback for ActivityPreferences when not exported from ../types.
// Keep permissive so the shape can be extended without breaking the service.
type ActivityPreferences = {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  digestFrequency?: 'instant' | 'daily' | 'weekly';
  [key: string]: any;
};

type ActivityContext = {
  // IDs of related entities (e.g., commentId, taskId, etc.)
  relatedIds?: string[];
  // Optional rich objects related to the activity
  relatedItems?: any[];
  // Allow additional fields to match the server shape
  [key: string]: any;
};

type ActivitySummary = {
  // Total number of activities in the requested scope
  totalActivities: number;
  // Number of unread activities
  unread: number;
  // Optional period or date for the summary (e.g., day/week)
  period?: string;
  // Optional highlights or top items from the summary
  highlights?: any[];
  // Allow additional fields to match server shape
  [key: string]: any;
};
/**
 * Activity tracking and feed management service
 */
class ActivityService {
  private eventSource: EventSource | null = null;
  private activityCache: Map<string, Activity> = new Map();
  private unreadCount: number = 0;
  private listeners: Set<(activity: Activity) => void> = new Set();

  /**
   * Get activity feed with optional filtering
   */
  async getActivityFeed(
    workspaceId: string,
    filter?: ActivityFilter,
    page: number = 0,
    size: number = 50
  ): Promise<ActivityFeed> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(filter?.types && { types: filter.types.join(',') }),
      ...(filter?.projectId && { projectId: filter.projectId }),
      ...(filter?.userId && { userId: filter.userId }),
      ...(filter?.dateFrom && { dateFrom: filter.dateFrom.toISOString() }),
      ...(filter?.dateTo && { dateTo: filter.dateTo.toISOString() }),
      ...(filter?.searchQuery && { q: filter.searchQuery })
    });

    const response = await apiClient.get<ActivityFeed>(
      `/api/workspaces/${workspaceId}/activities?${params}`
    );

    // Update cache
    response.activities.forEach(activity => {
      this.activityCache.set(activity.id, activity);
    });

    return response;
  }

  /**
   * Get activity details by ID
   */
  async getActivity(workspaceId: string, activityId: string): Promise<Activity> {
    // Check cache first
    const cached = this.activityCache.get(activityId);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }

    const activity = await apiClient.get<Activity>(
      `/api/workspaces/${workspaceId}/activities/${activityId}`
    );

    this.activityCache.set(activityId, activity);
    return activity;
  }

  /**
   * Get recent activities for quick access
   */
  async getRecentActivities(
    workspaceId: string,
    limit: number = 10
  ): Promise<RecentActivity[]> {
    const response = await apiClient.get<RecentActivity[]>(
      `/api/workspaces/${workspaceId}/activities/recent?limit=${limit}`
    );

    return response;
  }

  /**
   * Get activity timeline (grouped by date)
   */
  async getActivityTimeline(
    workspaceId: string,
    days: number = 7
  ): Promise<ActivityTimeline> {
    const response = await apiClient.get<ActivityTimeline>(
      `/api/workspaces/${workspaceId}/activities/timeline?days=${days}`
    );

    return response;
  }

  /**
   * Get activity metrics and statistics
   */
  async getActivityMetrics(
    workspaceId: string,
    period: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<ActivityMetrics> {
    const response = await apiClient.get<ActivityMetrics>(
      `/api/workspaces/${workspaceId}/activities/metrics?period=${period}`
    );

    return response;
  }

  /**
   * Get activity summary
   */
  async getActivitySummary(
    workspaceId: string,
    date?: Date
  ): Promise<ActivitySummary> {
    const params = date ? `?date=${date.toISOString()}` : '';
    const response = await apiClient.get<ActivitySummary>(
      `/api/workspaces/${workspaceId}/activities/summary${params}`
    );

    return response;
  }

  /**
   * Mark activities as read
   */
  async markAsRead(
    workspaceId: string,
    activityIds: string[]
  ): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/activities/read`,
      { activityIds }
    );

    // Update cache
    activityIds.forEach(id => {
      const activity = this.activityCache.get(id);
      if (activity) {
        activity.readAt = new Date();
        this.activityCache.set(id, activity);
      }
    });

    // Update unread count
    this.unreadCount = Math.max(0, this.unreadCount - activityIds.length);
  }

  /**
   * Mark all activities as read
   */
  async markAllAsRead(workspaceId: string): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/activities/read-all`
    );

    // Update cache
    this.activityCache.forEach(activity => {
      activity.readAt = new Date();
    });

    this.unreadCount = 0;
  }

  /**
   * Get unread activity count
   */
  async getUnreadCount(workspaceId: string): Promise<number> {
    const response = await apiClient.get<{ count: number }>(
      `/api/workspaces/${workspaceId}/activities/unread-count`
    );

    this.unreadCount = response.count;
    return response.count;
  }

  /**
   * Get activity notifications
   */
  async getNotifications(
    workspaceId: string
  ): Promise<ActivityNotification[]> {
    const response = await apiClient.get<ActivityNotification[]>(
      `/api/workspaces/${workspaceId}/activities/notifications`
    );

    return response;
  }

  /**
   * Update activity preferences
   */
  async updatePreferences(
    workspaceId: string,
    preferences: Partial<ActivityPreferences>
  ): Promise<ActivityPreferences> {
    const response = await apiClient.patch<ActivityPreferences>(
      `/api/workspaces/${workspaceId}/activities/preferences`,
      preferences
    );

    return response;
  }

  /**
   * Subscribe to real-time activity updates
   */
  subscribeToUpdates(
    workspaceId: string,
    callback: (activity: Activity) => void
  ): () => void {
    this.listeners.add(callback);

    // Initialize SSE connection if not already connected
    if (!this.eventSource) {
      this.initializeEventSource(workspaceId);
    }

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) {
        this.closeEventSource();
      }
    };
  }

  /**
   * Log a custom activity
   */
  async logActivity(
    workspaceId: string,
    event: ActivityEvent
  ): Promise<Activity> {
    const activity = await apiClient.post<Activity>(
      `/api/workspaces/${workspaceId}/activities`,
      event
    );

    this.activityCache.set(activity.id, activity);
    this.notifyListeners(activity);

    return activity;
  }

  /**
   * Search activities
   */
  async searchActivities(
    workspaceId: string,
    query: string,
    options?: {
      types?: ActivityType[];
      limit?: number;
      offset?: number;
    }
  ): Promise<Activity[]> {
    const params = new URLSearchParams({
      q: query,
      ...(options?.types && { types: options.types.join(',') }),
      ...(options?.limit && { limit: options.limit.toString() }),
      ...(options?.offset && { offset: options.offset.toString() })
    });

    const response = await apiClient.get<Activity[]>(
      `/api/workspaces/${workspaceId}/activities/search?${params}`
    );

    return response;
  }

  /**
   * Get activity context (related items)
   */
  async getActivityContext(
    workspaceId: string,
    activityId: string
  ): Promise<ActivityContext> {
    const response = await apiClient.get<ActivityContext>(
      `/api/workspaces/${workspaceId}/activities/${activityId}/context`
    );

    return response;
  }

  /**
   * Archive old activities
   */
  async archiveActivities(
    workspaceId: string,
    beforeDate: Date
  ): Promise<number> {
    const response = await apiClient.post<{ archived: number }>(
      `/api/workspaces/${workspaceId}/activities/archive`,
      { beforeDate: beforeDate.toISOString() }
    );

    // Clear old items from cache
    this.activityCache.forEach((activity, id) => {
      if (new Date(activity.timestamp) < beforeDate) {
        this.activityCache.delete(id);
      }
    });

    return response.archived;
  }

  /**
   * Private helper methods
   */

  private initializeEventSource(workspaceId: string): void {
    const token = localStorage.getItem('auth_token');
    const url = `${apiClient.getBaseURL()}/api/workspaces/${workspaceId}/activities/stream`;

    this.eventSource = new EventSource(`${url}?token=${token}`);

    this.eventSource.onmessage = (event) => {
      try {
        const activity: Activity = JSON.parse(event.data);
        this.activityCache.set(activity.id, activity);
        this.notifyListeners(activity);

        // Update unread count
        if (!activity.readAt) {
          this.unreadCount++;
        }
      } catch (error) {
        console.error('Failed to parse activity update:', error);
      }
    };

    this.eventSource.onerror = () => {
      console.error('Activity stream connection error');
      this.closeEventSource();
      
      // Retry connection after delay
      setTimeout(() => {
        if (this.listeners.size > 0) {
          this.initializeEventSource(workspaceId);
        }
      }, 5000);
    };
  }

  private closeEventSource(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  private notifyListeners(activity: Activity): void {
    this.listeners.forEach(callback => {
      try {
        callback(activity);
      } catch (error) {
        console.error('Activity listener error:', error);
      }
    });
  }

  private isCacheValid(activity: Activity): boolean {
    const cacheTime = 5 * 60 * 1000; // 5 minutes
    const activityTime = new Date(activity.timestamp).getTime();
    return Date.now() - activityTime < cacheTime;
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.activityCache.clear();
    this.unreadCount = 0;
  }
}

// Export singleton instance
export const activityService = new ActivityService();
