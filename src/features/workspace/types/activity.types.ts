//src/features/workspace/types/activity.types.ts

/**
 * Activity Type Definitions
 * For tracking and displaying user activity in the workspace
 */

import { JourneyStep } from './journeyStep.types';
import { ProjectType, ProjectStatus } from './project.types';
import { QuickActionType } from './quickAction.types';

export interface ActivityItem {
  id: string;
  workspaceId: string;
  projectId?: string;
  type: ActivityType;
  actor: {
    id: string;
    name: string;
    avatar?: string;
  };
  action: string;
  target?: {
    type: string;
    id: string;
    name: string;
  };
  metadata?: Record<string, any>;
  timestamp: Date;
  read: boolean;
  project?: {
    id: string;
    name: string;
  };
  description?: string;
}

// Legacy string union ActivityType removed — use the ActivityType enum defined below

// ============================================================================
// ACTIVITY TYPE ENUM
// ============================================================================

export enum ActivityType {
  // Project Activities
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED',
  PROJECT_PUBLISHED = 'PROJECT_PUBLISHED',
  PROJECT_STATUS_CHANGED = 'PROJECT_STATUS_CHANGED',
  PROJECT_DUPLICATED = 'PROJECT_DUPLICATED',
  
  // Version Activities
  VERSION_CREATED = 'VERSION_CREATED',
  VERSION_RESTORED = 'VERSION_RESTORED',
  
  // Journey Activities
  JOURNEY_STEP_CHANGED = 'JOURNEY_STEP_CHANGED',
  JOURNEY_STEP_COMPLETED = 'JOURNEY_STEP_COMPLETED',
  MILESTONE_ACHIEVED = 'MILESTONE_ACHIEVED',
  
  // Quick Action Activities
  QUICK_ACTION_COMPLETED = 'QUICK_ACTION_COMPLETED',
  QUICK_ACTION_DISMISSED = 'QUICK_ACTION_DISMISSED',
  
  // Workspace Activities
  WORKSPACE_SYNCED = 'WORKSPACE_SYNCED',
  WORKSPACE_STATE_UPDATED = 'WORKSPACE_STATE_UPDATED',
  
  // Engagement Activities
  PROJECT_VIEWED = 'PROJECT_VIEWED',
  PROJECT_LIKED = 'PROJECT_LIKED',
  PROJECT_COMMENTED = 'PROJECT_COMMENTED',
  PROJECT_SHARED = 'PROJECT_SHARED',
  
  // Learning Activities
  TUTORIAL_STARTED = 'TUTORIAL_STARTED',
  TUTORIAL_COMPLETED = 'TUTORIAL_COMPLETED',
  RESOURCE_ACCESSED = 'RESOURCE_ACCESSED',
  WORKSHOP_ATTENDED = 'WORKSHOP_ATTENDED',
  
  // Social Activities
  FEEDBACK_RECEIVED = 'FEEDBACK_RECEIVED',
  FEEDBACK_GIVEN = 'FEEDBACK_GIVEN',
  MENTOR_MESSAGE = 'MENTOR_MESSAGE',
  COMMUNITY_JOINED = 'COMMUNITY_JOINED',
  
  // Achievement Activities
  BADGE_EARNED = 'BADGE_EARNED',
  GOAL_COMPLETED = 'GOAL_COMPLETED',
  STREAK_ACHIEVED = 'STREAK_ACHIEVED'
}

// ============================================================================
// BASE ACTIVITY INTERFACE
// ============================================================================

export interface Activity {
  id: string;
  userId: number;
  activityType: ActivityType;
  timestamp: string; // ISO datetime
  
  // Context
  projectId?: number;
  projectTitle?: string;
  projectType?: ProjectType;
  
  // Description
  title: string;
  description?: string;
  summary?: string;
  
  // Visual
  icon?: string;
  color?: string;
  imageUrl?: string;
  
  // Metadata
  metadata?: ActivityMetadata;
  
  // Engagement
  isRead?: boolean;
  isStarred?: boolean;
  
  // Related entities
  relatedUserId?: number;
  relatedUserName?: string;
  relatedEntityType?: string;
  relatedEntityId?: number;
}

// ============================================================================
// ACTIVITY METADATA
// ============================================================================

export interface ActivityMetadata {
  // Project-related
  oldStatus?: ProjectStatus;
  newStatus?: ProjectStatus;
  versionNumber?: number;
  
  // Journey-related
  oldJourneyStep?: JourneyStep;
  newJourneyStep?: JourneyStep;
  progress?: number; // 0-100
  
  // Quick Action-related
  actionType?: QuickActionType;
  
  // Engagement-related
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  
  // Achievement-related
  badgeId?: string;
  badgeName?: string;
  streakDays?: number;
  
  // Additional data
  additionalData?: Record<string, any>;
}

// ============================================================================
// ACTIVITY RESPONSE (From Backend)
// ============================================================================

export interface ActivityResponse extends Activity {}

// ============================================================================
// ACTIVITY FILTERS
// ============================================================================

export interface ActivityFilters {
  activityTypes?: ActivityType[];
  projectId?: number;
  projectType?: ProjectType;
  journeyStep?: JourneyStep;
  dateFrom?: string; // ISO date
  dateTo?: string; // ISO date
  isRead?: boolean;
  isStarred?: boolean;
}

// ============================================================================
// ACTIVITY GROUPING
// ============================================================================

export interface ActivityGroup {
  date: string; // e.g., "Today", "Yesterday", "2024-01-15"
  activities: Activity[];
}

export enum ActivityGroupBy {
  DATE = 'DATE',
  PROJECT = 'PROJECT',
  TYPE = 'TYPE',
  JOURNEY_STEP = 'JOURNEY_STEP'
}

// ============================================================================
// ACTIVITY FEED STATE
// ============================================================================

export interface ActivityFeedState {
  activities: Activity[];
  groups?: ActivityGroup[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  filters: ActivityFilters;
  groupBy: ActivityGroupBy;
}

// ============================================================================
// ACTIVITY TYPE METADATA
// ============================================================================

export interface ActivityTypeMetadata {
  type: ActivityType;
  category: ActivityCategory;
  icon: string;
  color: string;
  priority: number; // 1 = highest
  defaultTitle: string;
  template: string; // Template for description
}

export enum ActivityCategory {
  PROJECT = 'PROJECT',
  JOURNEY = 'JOURNEY',
  SOCIAL = 'SOCIAL',
  LEARNING = 'LEARNING',
  ACHIEVEMENT = 'ACHIEVEMENT',
  SYSTEM = 'SYSTEM'
}

// ============================================================================
// ACTIVITY METADATA MAP
// ============================================================================

export const ACTIVITY_METADATA: Record<ActivityType, ActivityTypeMetadata> = {
  // Project Activities
  [ActivityType.PROJECT_CREATED]: {
    type: ActivityType.PROJECT_CREATED,
    category: ActivityCategory.PROJECT,
    icon: '✨',
    color: '#4F46E5',
    priority: 2,
    defaultTitle: 'New project created',
    template: 'Created "{title}"'
  },
  [ActivityType.PROJECT_UPDATED]: {
    type: ActivityType.PROJECT_UPDATED,
    category: ActivityCategory.PROJECT,
    icon: '✏️',
    color: '#6B7280',
    priority: 3,
    defaultTitle: 'Project updated',
    template: 'Updated "{title}"'
  },
  [ActivityType.PROJECT_DELETED]: {
    type: ActivityType.PROJECT_DELETED,
    category: ActivityCategory.PROJECT,
    icon: '🗑️',
    color: '#DC2626',
    priority: 3,
    defaultTitle: 'Project deleted',
    template: 'Deleted "{title}"'
  },
  [ActivityType.PROJECT_PUBLISHED]: {
    type: ActivityType.PROJECT_PUBLISHED,
    category: ActivityCategory.PROJECT,
    icon: '🚀',
    color: '#059669',
    priority: 1,
    defaultTitle: 'Project published',
    template: 'Published "{title}"'
  },
  [ActivityType.PROJECT_STATUS_CHANGED]: {
    type: ActivityType.PROJECT_STATUS_CHANGED,
    category: ActivityCategory.PROJECT,
    icon: '🔄',
    color: '#8B5CF6',
    priority: 2,
    defaultTitle: 'Project status changed',
    template: 'Changed "{title}" status to {newStatus}'
  },
  [ActivityType.PROJECT_DUPLICATED]: {
    type: ActivityType.PROJECT_DUPLICATED,
    category: ActivityCategory.PROJECT,
    icon: '📋',
    color: '#06B6D4',
    priority: 3,
    defaultTitle: 'Project duplicated',
    template: 'Duplicated "{title}"'
  },
  
  // Version Activities
  [ActivityType.VERSION_CREATED]: {
    type: ActivityType.VERSION_CREATED,
    category: ActivityCategory.PROJECT,
    icon: '💾',
    color: '#6B7280',
    priority: 4,
    defaultTitle: 'Version saved',
    template: 'Saved version {versionNumber} of "{title}"'
  },
  [ActivityType.VERSION_RESTORED]: {
    type: ActivityType.VERSION_RESTORED,
    category: ActivityCategory.PROJECT,
    icon: '⏮️',
    color: '#F59E0B',
    priority: 2,
    defaultTitle: 'Version restored',
    template: 'Restored "{title}" to version {versionNumber}'
  },
  
  // Journey Activities
  [ActivityType.JOURNEY_STEP_CHANGED]: {
    type: ActivityType.JOURNEY_STEP_CHANGED,
    category: ActivityCategory.JOURNEY,
    icon: '🎯',
    color: '#8B5CF6',
    priority: 2,
    defaultTitle: 'Journey step changed',
    template: 'Moved to {newJourneyStep} phase'
  },
  [ActivityType.JOURNEY_STEP_COMPLETED]: {
    type: ActivityType.JOURNEY_STEP_COMPLETED,
    category: ActivityCategory.JOURNEY,
    icon: '✅',
    color: '#059669',
    priority: 1,
    defaultTitle: 'Journey step completed',
    template: 'Completed {journeyStep} phase'
  },
  [ActivityType.MILESTONE_ACHIEVED]: {
    type: ActivityType.MILESTONE_ACHIEVED,
    category: ActivityCategory.ACHIEVEMENT,
    icon: '🏆',
    color: '#F59E0B',
    priority: 1,
    defaultTitle: 'Milestone achieved',
    template: 'Achieved milestone: {milestoneName}'
  },
  
  // Quick Action Activities
  [ActivityType.QUICK_ACTION_COMPLETED]: {
    type: ActivityType.QUICK_ACTION_COMPLETED,
    category: ActivityCategory.PROJECT,
    icon: '✓',
    color: '#059669',
    priority: 3,
    defaultTitle: 'Quick action completed',
    template: 'Completed: {actionTitle}'
  },
  [ActivityType.QUICK_ACTION_DISMISSED]: {
    type: ActivityType.QUICK_ACTION_DISMISSED,
    category: ActivityCategory.SYSTEM,
    icon: '✕',
    color: '#6B7280',
    priority: 5,
    defaultTitle: 'Quick action dismissed',
    template: 'Dismissed: {actionTitle}'
  },
  
  // Workspace Activities
  [ActivityType.WORKSPACE_SYNCED]: {
    type: ActivityType.WORKSPACE_SYNCED,
    category: ActivityCategory.SYSTEM,
    icon: '🔄',
    color: '#06B6D4',
    priority: 5,
    defaultTitle: 'Workspace synced',
    template: 'Workspace synced successfully'
  },
  [ActivityType.WORKSPACE_STATE_UPDATED]: {
    type: ActivityType.WORKSPACE_STATE_UPDATED,
    category: ActivityCategory.SYSTEM,
    icon: '💾',
    color: '#6B7280',
    priority: 5,
    defaultTitle: 'Workspace updated',
    template: 'Workspace state updated'
  },
  
  // Engagement Activities
  [ActivityType.PROJECT_VIEWED]: {
    type: ActivityType.PROJECT_VIEWED,
    category: ActivityCategory.SOCIAL,
    icon: '👁️',
    color: '#6B7280',
    priority: 4,
    defaultTitle: 'Project viewed',
    template: '{userName} viewed "{title}"'
  },
  [ActivityType.PROJECT_LIKED]: {
    type: ActivityType.PROJECT_LIKED,
    category: ActivityCategory.SOCIAL,
    icon: '❤️',
    color: '#EC4899',
    priority: 2,
    defaultTitle: 'Project liked',
    template: '{userName} liked "{title}"'
  },
  [ActivityType.PROJECT_COMMENTED]: {
    type: ActivityType.PROJECT_COMMENTED,
    category: ActivityCategory.SOCIAL,
    icon: '💬',
    color: '#8B5CF6',
    priority: 2,
    defaultTitle: 'New comment',
    template: '{userName} commented on "{title}"'
  },
  [ActivityType.PROJECT_SHARED]: {
    type: ActivityType.PROJECT_SHARED,
    category: ActivityCategory.SOCIAL,
    icon: '📤',
    color: '#06B6D4',
    priority: 3,
    defaultTitle: 'Project shared',
    template: 'Shared "{title}"'
  },
  
  // Learning Activities
  [ActivityType.TUTORIAL_STARTED]: {
    type: ActivityType.TUTORIAL_STARTED,
    category: ActivityCategory.LEARNING,
    icon: '📚',
    color: '#059669',
    priority: 3,
    defaultTitle: 'Tutorial started',
    template: 'Started tutorial: {tutorialName}'
  },
  [ActivityType.TUTORIAL_COMPLETED]: {
    type: ActivityType.TUTORIAL_COMPLETED,
    category: ActivityCategory.LEARNING,
    icon: '🎓',
    color: '#059669',
    priority: 2,
    defaultTitle: 'Tutorial completed',
    template: 'Completed tutorial: {tutorialName}'
  },
  [ActivityType.RESOURCE_ACCESSED]: {
    type: ActivityType.RESOURCE_ACCESSED,
    category: ActivityCategory.LEARNING,
    icon: '📖',
    color: '#6B7280',
    priority: 4,
    defaultTitle: 'Resource accessed',
    template: 'Accessed: {resourceName}'
  },
  [ActivityType.WORKSHOP_ATTENDED]: {
    type: ActivityType.WORKSHOP_ATTENDED,
    category: ActivityCategory.LEARNING,
    icon: '👥',
    color: '#8B5CF6',
    priority: 2,
    defaultTitle: 'Workshop attended',
    template: 'Attended: {workshopName}'
  },
  
  // Social Activities
  [ActivityType.FEEDBACK_RECEIVED]: {
    type: ActivityType.FEEDBACK_RECEIVED,
    category: ActivityCategory.SOCIAL,
    icon: '💬',
    color: '#059669',
    priority: 1,
    defaultTitle: 'Feedback received',
    template: 'Received feedback on "{title}"'
  },
  [ActivityType.FEEDBACK_GIVEN]: {
    type: ActivityType.FEEDBACK_GIVEN,
    category: ActivityCategory.SOCIAL,
    icon: '✍️',
    color: '#6B7280',
    priority: 3,
    defaultTitle: 'Feedback given',
    template: 'Gave feedback on "{title}"'
  },
  [ActivityType.MENTOR_MESSAGE]: {
    type: ActivityType.MENTOR_MESSAGE,
    category: ActivityCategory.SOCIAL,
    icon: '💌',
    color: '#EC4899',
    priority: 1,
    defaultTitle: 'Mentor message',
    template: 'New message from {mentorName}'
  },
  [ActivityType.COMMUNITY_JOINED]: {
    type: ActivityType.COMMUNITY_JOINED,
    category: ActivityCategory.SOCIAL,
    icon: '👥',
    color: '#8B5CF6',
    priority: 2,
    defaultTitle: 'Community joined',
    template: 'Joined {communityName}'
  },
  
  // Achievement Activities
  [ActivityType.BADGE_EARNED]: {
    type: ActivityType.BADGE_EARNED,
    category: ActivityCategory.ACHIEVEMENT,
    icon: '🏅',
    color: '#F59E0B',
    priority: 1,
    defaultTitle: 'Badge earned',
    template: 'Earned badge: {badgeName}'
  },
  [ActivityType.GOAL_COMPLETED]: {
    type: ActivityType.GOAL_COMPLETED,
    category: ActivityCategory.ACHIEVEMENT,
    icon: '🎯',
    color: '#059669',
    priority: 1,
    defaultTitle: 'Goal completed',
    template: 'Completed goal: {goalName}'
  },
  [ActivityType.STREAK_ACHIEVED]: {
    type: ActivityType.STREAK_ACHIEVED,
    category: ActivityCategory.ACHIEVEMENT,
    icon: '🔥',
    color: '#F59E0B',
    priority: 1,
    defaultTitle: 'Streak achieved',
    template: '{streakDays} day streak!'
  }
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isActivityType(value: string): value is ActivityType {
  return Object.values(ActivityType).includes(value as ActivityType);
}

export function isActivityCategory(value: string): value is ActivityCategory {
  return Object.values(ActivityCategory).includes(value as ActivityCategory);
}

export function getActivityMetadata(type: ActivityType): ActivityTypeMetadata {
  return ACTIVITY_METADATA[type];
}

export function getActivitiesByCategory(category: ActivityCategory): ActivityTypeMetadata[] {
  return Object.values(ACTIVITY_METADATA).filter(
    metadata => metadata.category === category
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format activity description using template and metadata
 */
export function formatActivityDescription(activity: Activity): string {
  const metadata = getActivityMetadata(activity.activityType);
  let description = metadata.template;
  
  // Replace placeholders
  if (activity.projectTitle) {
    description = description.replace('{title}', activity.projectTitle);
  }
  if (activity.metadata?.newStatus) {
    description = description.replace('{newStatus}', activity.metadata.newStatus);
  }
  if (activity.metadata?.versionNumber) {
    description = description.replace('{versionNumber}', String(activity.metadata.versionNumber));
  }
  if (activity.metadata?.newJourneyStep) {
    description = description.replace('{newJourneyStep}', activity.metadata.newJourneyStep);
  }
  if (activity.relatedUserName) {
    description = description.replace('{userName}', activity.relatedUserName);
  }
  
  return description;
}

/**
 * Group activities by date
 */
export function groupActivitiesByDate(activities: Activity[]): ActivityGroup[] {
  const groups = new Map<string, Activity[]>();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  activities.forEach(activity => {
    const date = activity.timestamp.split('T')[0];
    let groupKey: string;
    
    if (date === today) {
      groupKey = 'Today';
    } else if (date === yesterday) {
      groupKey = 'Yesterday';
    } else {
      groupKey = date;
    }
    
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(activity);
  });
  
  return Array.from(groups.entries()).map(([date, activities]) => ({
    date,
    activities: activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }));
}

/**
 * Get unread activity count
 */
export function getUnreadCount(activities: Activity[]): number {
  return activities.filter(a => !a.isRead).length;
}

/**
 * Sort activities by priority and recency
 */
export function sortActivities(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    const aMeta = getActivityMetadata(a.activityType);
    const bMeta = getActivityMetadata(b.activityType);
    
    // First sort by priority
    if (aMeta.priority !== bMeta.priority) {
      return aMeta.priority - bMeta.priority;
    }
    
    // Then by recency
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}