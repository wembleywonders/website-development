/**
 * Activity Type Definitions
 * @module features/activity/types
 */

// ============================================================================
// ACTIVITY CORE TYPES
// ============================================================================

export interface ActivityItem {
  id: string;
  workspaceId: string;
  projectId?: string;
  type: ActivityType;
  action: string;
  actor: ActivityActor;
  target?: ActivityTarget;
  context?: ActivityContext;
  metadata?: Record<string, any>;
  timestamp: Date;
  read: boolean;
  important: boolean;
  grouped?: boolean;
  groupId?: string;
}

export interface ActivityActor {
  id: string;
  type: 'user' | 'system' | 'integration';
  name: string;
  email?: string;
  avatar?: string;
}

export interface ActivityTarget {
  id: string;
  type: 'project' | 'task' | 'file' | 'comment' | 'member' | 'setting';
  name: string;
  url?: string;
}

export interface ActivityContext {
  before?: any;
  after?: any;
  diff?: any;
  relatedItems?: ActivityTarget[];
}

// ============================================================================
// ACTIVITY ENUMS
// ============================================================================

export type ActivityType = 
  | 'project_created'
  | 'project_updated'
  | 'project_deleted'
  | 'project_archived'
  | 'project_published'
  | 'task_created'
  | 'task_completed'
  | 'task_assigned'
  | 'file_uploaded'
  | 'file_deleted'
  | 'comment_added'
  | 'comment_edited'
  | 'comment_deleted'
  | 'member_joined'
  | 'member_left'
  | 'member_invited'
  | 'role_changed'
  | 'settings_updated'
  | 'integration_connected'
  | 'integration_disconnected'
  | 'milestone_reached'
  | 'deadline_approaching'
  | 'sync_completed'
  | 'sync_failed';

// ============================================================================
// ACTIVITY FEED
// ============================================================================

export interface ActivityFeed {
  items: ActivityItem[];
  hasMore: boolean;
  nextCursor?: string;
  filters?: ActivityFilters;
  grouping?: ActivityGrouping;
}

export interface ActivityFilters {
  types?: ActivityType[];
  actors?: string[];
  projects?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  unreadOnly?: boolean;
  importantOnly?: boolean;
}

export interface ActivityGrouping {
  enabled: boolean;
  by: 'actor' | 'target' | 'type' | 'time';
  interval?: 'hour' | 'day' | 'week';
}

export interface ActivityGroup {
  id: string;
  title: string;
  count: number;
  items: ActivityItem[];
  collapsed: boolean;
  timestamp: Date;
}

// ============================================================================
// ACTIVITY NOTIFICATIONS
// ============================================================================

export interface ActivityNotification {
  id: string;
  activityId: string;
  userId: string;
  type: 'mention' | 'assignment' | 'deadline' | 'update' | 'comment';
  title: string;
  message: string;
  read: boolean;
  seen: boolean;
  actionUrl?: string;
  actions?: NotificationAction[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationAction {
  label: string;
  action: string;
  style: 'primary' | 'secondary' | 'danger';
  url?: string;
}

// ============================================================================
// ACTIVITY REQUESTS & RESPONSES
// ============================================================================

export interface GetActivitiesRequest {
  workspaceId: string;
  projectId?: string;
  filters?: ActivityFilters;
  grouping?: ActivityGrouping;
  cursor?: string;
  limit?: number;
}

export interface MarkActivityReadRequest {
  activityIds: string[];
  read: boolean;
}

export interface ActivityStats {
  totalActivities: number;
  unreadCount: number;
  importantCount: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
  topActors: { actor: ActivityActor; count: number }[];
  topProjects: { projectId: string; name: string; count: number }[];
  activityByType: Record<ActivityType, number>;
  activityByHour: number[];
  activityByDay: number[];
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isActivityType(value: string): value is ActivityType {
  return [
    'project_created', 'project_updated', 'project_deleted', 'project_archived',
    'project_published', 'task_created', 'task_completed', 'task_assigned',
    'file_uploaded', 'file_deleted', 'comment_added', 'comment_edited',
    'comment_deleted', 'member_joined', 'member_left', 'member_invited',
    'role_changed', 'settings_updated', 'integration_connected',
    'integration_disconnected', 'milestone_reached', 'deadline_approaching',
    'sync_completed', 'sync_failed'
  ].includes(value);
}
