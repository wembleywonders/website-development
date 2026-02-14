//src/features/workspace/types/workspace.types.ts
/**
 * Workspace Store - State management for workspace settings and configuration
 * Features: Settings, members, billing, storage, themes
 * @module features/workspace/stores/workspaceStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { workspaceService } from '../services/workspaceService';

/**
 * Workspace Type Definitions
 * Matches backend CreatorWorkspace entity and sync DTOs
 */

import type {
  QuickAction,
  QuickActionContext,
  WorkspaceTheme,
  WorkspaceNotifications,
  WorkspaceIntegration,
  WorkspaceExport,
  WorkspaceBackup,
  WorkspaceAuditLog,
  WorkspaceUpdate,
  WorkspaceCreate,
  WorkspaceQuota,
  WorkspaceUsage,
  PageRequest
} from '../types';
import { ProjectSummary } from './project.types';
import { QuickActionResponse } from './quickAction.types';

export type JourneyStep = string;
// ============================================================================
// WORKSPACE INTERFACE
// ============================================================================

export interface CreatorWorkspace {
  id: number;
  userId: number;
  currentJourneyStep: JourneyStep;
  workspaceState: Record<string, any>; // JSONB from backend
  lastActiveProjectId?: number;
  lastSyncAt?: string; // ISO datetime
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// WORKSPACE RESPONSE (With Related Data)
// ============================================================================

export interface WorkspaceResponse extends CreatorWorkspace {
  stats?: WorkspaceStats;
  recentProjects?: ProjectSummary[];
  quickActions?: QuickActionResponse[];
}

// ============================================================================
// WORKSPACE STATS
// ============================================================================

export interface WorkspaceStats {
  totalProjects: number;
  draftProjects: number;
  publishedProjects: number;
  inReviewProjects: number;
  archivedProjects: number;
  totalViews: number;
  totalLikes: number;
  lastActivity?: string; // ISO datetime
}

// ============================================================================
// WORKSPACE STATE STRUCTURE
// ============================================================================

export interface WorkspaceState {
  // UI State
  activeTab?: 'create' | 'learn' | 'improve' | 'sell' | 'promote' | 'connect' | 'reflect';
  sidebarCollapsed?: boolean;
  expandedSections?: string[];
  viewMode?: 'grid' | 'list';
  
  // Project State
  activeProjectId?: number;
  recentProjectIds?: number[];
  projectFilters?: {
    status?: string[];
    type?: string[];
    tags?: string[];
  };
  
  // Journey State
  completedSteps?: JourneyStep[];
  currentGoals?: string[];
  milestones?: Array<{
    id: string;
    title: string;
    completed: boolean;
    completedAt?: string;
  }>;
  
  // Preferences
  preferences?: {
    theme?: 'light' | 'dark' | 'auto';
    notifications?: boolean;
    autoSave?: boolean;
    saveInterval?: number; // seconds
  };
  
  // Custom Data
  customFields?: Record<string, any>;
}

// ============================================================================
// SYNC REQUEST & RESPONSE
// ============================================================================

export interface SyncWorkspaceRequest {
  userId: number;
  workspaceState?: Record<string, any>;
  lastSyncTimestamp?: number; // Unix timestamp in milliseconds
  pendingActions?: PendingAction[];
  clientVersion?: string;
}

export interface PendingAction {
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  resourceType: 'PROJECT' | 'QUICK_ACTION' | 'WORKSPACE' | 'PROJECT_VERSION';
  resourceId?: number;
  payload?: any;
  timestamp: number; // Unix timestamp
  tempClientId?: string;
}

export interface WorkspaceSyncResponse {
  status: SyncStatus;
  serverTimestamp: number; // Unix timestamp
  successfulActions?: SyncedAction[];
  failedActions?: FailedAction[];
  conflicts?: SyncConflict[];
  updatedWorkspaceState?: Record<string, any>;
  stats?: SyncStats;
  userMessages?: string[];
  
  // Alternative field names (server uses these)
  userId?: number;
  workspaceId?: number;
  serverState?: Record<string, any>;
  lastSyncAt?: string;
  hasConflicts?: boolean;
  syncStatus?: SyncStatus;
  message?: string;
}

export enum SyncStatus {
  SUCCESS = 'SUCCESS',
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
  SUCCESS_WITH_CONFLICTS = 'SUCCESS_WITH_CONFLICTS',
  CONFLICT = 'CONFLICT',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR',
  OUT_OF_SYNC = 'OUT_OF_SYNC',
  PENDING = 'PENDING'
}

export interface SyncedAction {
  tempClientId?: string;
  serverId?: number;
  resourceType: string;
  actionType: string;
  syncedAt?: string;
}

export interface FailedAction {
  tempClientId?: string;
  resourceType: string;
  actionType: string;
  reason: string;
  errorCode?: string;
}

export interface SyncConflict {
  resourceType: string;
  resourceId?: number;
  clientVersion?: any;
  serverVersion?: any;
  conflictType: ConflictType;
  resolution?: 'use_client' | 'use_server' | 'merge';
  resolvedValue?: any;
}

export enum ConflictType {
  VERSION_MISMATCH = 'VERSION_MISMATCH',
  DELETED_ON_SERVER = 'DELETED_ON_SERVER',
  MODIFIED_BY_BOTH = 'MODIFIED_BY_BOTH',
  ALREADY_EXISTS = 'ALREADY_EXISTS'
}

export interface SyncStats {
  totalActions?: number;
  successfulActions?: number;
  failedActions?: number;
  conflicts?: number;
  syncDurationMs?: number;
}

// ============================================================================
// WORKSPACE CONTEXT (For React Context)
// ============================================================================

export interface WorkspaceContextValue {
  workspace: WorkspaceResponse | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadWorkspace: () => Promise<void>;
  updateWorkspaceState: (state: Partial<WorkspaceState>) => Promise<void>;
  syncWorkspace: (pendingActions?: PendingAction[]) => Promise<WorkspaceSyncResponse>;
  setCurrentJourneyStep: (step: JourneyStep) => Promise<void>;
  
  // Computed
  isOnline: boolean;
  hasPendingChanges: boolean;
  lastSyncTime: Date | null;
}

// ============================================================================
// OFFLINE SYNC QUEUE
// ============================================================================

export interface OfflineSyncQueue {
  actions: PendingAction[];
  lastAttempt?: number;
  failedAttempts: number;
}

// ============================================================================
// WORKSPACE UPDATE REQUEST
// ============================================================================

export interface UpdateWorkspaceRequest {
  currentJourneyStep?: JourneyStep;
  workspaceState?: Record<string, any>;
  lastActiveProjectId?: number;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isSyncStatus(value: string): value is SyncStatus {
  return Object.values(SyncStatus).includes(value as SyncStatus);
}

export function isConflictType(value: string): value is ConflictType {
  return Object.values(ConflictType).includes(value as ConflictType);
}

export function hasConflicts(response: WorkspaceSyncResponse): boolean {
  return (
    response.hasConflicts === true ||
    (response.conflicts && response.conflicts.length > 0) ||
    response.status === SyncStatus.CONFLICT ||
    response.syncStatus === SyncStatus.CONFLICT
  );
}

export function isSuccessfulSync(response: WorkspaceSyncResponse): boolean {
  const status = response.status || response.syncStatus;
  return (
    status === SyncStatus.SUCCESS ||
    status === SyncStatus.PARTIAL_SUCCESS ||
    status === SyncStatus.SUCCESS_WITH_CONFLICTS
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getServerState(response: WorkspaceSyncResponse): Record<string, any> {
  return response.serverState || response.updatedWorkspaceState || {};
}

export function getLastSyncTimestamp(response: WorkspaceSyncResponse): number {
  if (response.serverTimestamp) {
    return response.serverTimestamp;
  }
  if (response.lastSyncAt) {
    return new Date(response.lastSyncAt).getTime();
  }
  return Date.now();
}
/**
 * API Request/Response Types for Workspace Operations
 */

// These were mentioned but not fully defined
export type WorkspaceType = 'personal' | 'team' | 'enterprise';

export interface CreateWorkspaceRequest {
  name: string;
  type: WorkspaceType;
  description?: string;
  settings?: Partial<WorkspaceState>;
}

export interface WorkspaceMetadata {
  [key: string]: any;
}

export interface UpdateWorkspaceRequest {
  name?: string;
  description?: string;
  settings?: Partial<WorkspaceState>;
  metadata?: Partial<WorkspaceMetadata>;
}
// Make sure these are exported (they should already be in the file)
// Make sure these are exported (they should already be in the file)
// Make sure these are exported (they should already be in the file)
export type { WorkspaceTheme } from '../types';
// Re-export the locally-defined WorkspaceStats as WorkspaceStatistics to preserve external typings
export type WorkspaceStatistics = WorkspaceStats;
