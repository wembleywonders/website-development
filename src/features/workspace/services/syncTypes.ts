/**
 * Sync Engine Type Definitions
 * All types needed for the sync engine service
 * @module features/workspace/types/sync
 */

/**
 * Core sync operation interface
 */
export interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'BATCH';
  resource: string;
  resourceId: string;
  data: any;
  timestamp: Date;
  attempts: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  lastError?: string;
  workspaceId: string;
  projectId?: string;
}

/**
 * Offline operation to be queued
 */
export interface OfflineOperation {
  type: string;
  resource: string;
  resourceId: string;
  data: any;
  workspaceId: string;
  projectId?: string;
}

/**
 * Current sync status
 */
export interface SyncStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  pendingOperations: number;
  hasConflicts: boolean;
  conflicts: SyncConflict[];
  queuedOperations: SyncOperation[];
}

/**
 * Sync conflict information
 */
export interface SyncConflict {
  id: string;
  operation: SyncOperation;
  serverVersion: any;
  clientVersion: any;
  timestamp: Date;
  resolved: boolean;
  resolution?: SyncResolution;
}

/**
 * Conflict resolution details
 */
export interface SyncResolution {
  strategy: 'client' | 'server' | 'merge';
  timestamp: Date;
  mergedData?: any;
}

/**
 * Sync metadata from server
 */
export interface SyncMetadata {
  lastSyncTime: Date;
  syncVersion: string;
  checksum?: string;
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
}

/**
 * Sync queue information
 */
export interface SyncQueue {
  operations: SyncOperation[];
  maxSize: number;
  currentSize: number;
}

/**
 * Sync event for subscribers
 */
export interface SyncEvent {
  type: 
    | 'sync-started' 
    | 'sync-completed' 
    | 'sync-failed'
    | 'operation-queued'
    | 'operation-completed'
    | 'operation-failed'
    | 'conflict-detected'
    | 'conflict-resolved'
    | 'auto-save-success'
    | 'auto-save-failed'
    | 'online'
    | 'offline'
    | 'queue-cleared'
    | 'force-pull-completed';
  operation?: SyncOperation;
  conflict?: SyncConflict;
  resolution?: string;
  error?: Error;
  resourceId?: string;
  timestamp: Date;
  successCount?: number;
  failureCount?: number;
  conflicts?: SyncConflict[];
}

/**
 * Sync configuration options
 */
export interface SyncOptions {
  autoSync?: boolean;
  syncInterval?: number;
  maxRetries?: number;
  conflictStrategy?: ConflictResolutionStrategy;
}

/**
 * Conflict resolution strategies
 */
export type ConflictResolutionStrategy = 'client-wins' | 'server-wins' | 'manual';

/**
 * Auto-save configuration
 */
export interface AutoSaveConfig {
  enabled: boolean;
  interval: number; // milliseconds
  debounceTime: number; // milliseconds
  maxRetries: number;
}

/**
 * Sync state for internal tracking
 */
export interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  pendingOperations: number;
  conflicts: SyncConflict[];
  errors: Error[];
}
