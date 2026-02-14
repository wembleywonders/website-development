/**
 * Services Export Hub
 * Central export point for all workspace services
 * @module features/workspace/services
 */

// Core API client
export { apiClient, ApiClientError } from './apiClient';

// Project management
export { projectService } from './projectService';

// Workspace management  
export { workspaceService } from './workspaceService';

// Activity tracking
export { activityService } from './activityService';

// Quick actions
export { quickActionService } from './quickActionService';

// Synchronization
export { syncEngine } from './syncEngine';

// Re-export commonly used types
export type {
  // Project types
  Project,
  ProjectCreate,
  ProjectUpdate,
  ProjectVersion,
  ProjectFilters,
  ProjectSearch,
  
  // Workspace types
  WorkspaceStats,
  WorkspaceUsage,
  // Activity types
  Activity,
  ActivityFilters,
  
  // Quick action types
  QuickAction,
  QuickActionContext,
  
  // Sync types
  SyncStatus,
  SyncedAction,
  SyncConflict,
  
  // Common types
  PageRequest,
  JourneyStep
} from '../types';