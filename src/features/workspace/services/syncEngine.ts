/**
 * Sync Engine - Offline synchronization and auto-save management
 * Features: Offline queue, auto-save, conflict resolution, sync status
 * @module features/workspace/services/syncEngine
 */

import { apiClient } from './apiClient';
import { projectService } from './projectService';
import type { Project } from '../types';
type ProjectUpdate = Partial<Project>;
import type {
  SyncOperation,
  SyncStatus,
  SyncConflict,
  SyncResolution,
  SyncMetadata,
  SyncQueue,
  SyncEvent,
  SyncOptions,
  OfflineOperation,
  ConflictResolutionStrategy,
  AutoSaveConfig,
  SyncState
} from './syncTypes';

/**
 * Sync operation types enum
 */
enum SyncOperationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  BATCH = 'BATCH'
}

/**
 * Synchronization engine for offline support and auto-save
 */
class SyncEngine {
  private syncQueue: Map<string, SyncOperation> = new Map();
  private syncState: SyncState = {
    isOnline: navigator.onLine,
    isSyncing: false,
    lastSyncTime: null,
    pendingOperations: 0,
    conflicts: [],
    errors: []
  };
  
  private autoSaveConfig: AutoSaveConfig = {
    enabled: true,
    interval: 30000, // 30 seconds
    debounceTime: 2000, // 2 seconds
    maxRetries: 3
  };

  private autoSaveTimers: Map<string, NodeJS.Timeout> = new Map();
  private syncInterval: NodeJS.Timeout | null = null;
  private listeners: Set<(event: SyncEvent) => void> = new Set();
  private conflictStrategy: ConflictResolutionStrategy = 'client-wins';
  
  constructor() {
    this.initialize();
  }

  /**
   * Initialize sync engine
   */
  private initialize(): void {
    // Load queue from localStorage
    this.loadQueueFromStorage();

    // Setup online/offline listeners
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Start sync interval if online
    if (this.syncState.isOnline) {
      this.startSyncInterval();
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Queue an operation for sync
   */
  async queueOperation(operation: OfflineOperation): Promise<void> {
    const syncOp: SyncOperation = {
      id: `${Date.now()}-${Math.random()}`,
      type: operation.type as SyncOperationType,
      resource: operation.resource,
      resourceId: operation.resourceId,
      data: operation.data,
      timestamp: new Date(),
      attempts: 0,
      status: 'pending',
      workspaceId: operation.workspaceId,
      projectId: operation.projectId
    };

    // Add to queue
    this.syncQueue.set(syncOp.id, syncOp);
    this.syncState.pendingOperations = this.syncQueue.size;

    // Save to localStorage
    this.saveQueueToStorage();

    // Emit event
    this.emitEvent({
      type: 'operation-queued',
      operation: syncOp,
      timestamp: new Date()
    });

    // Try immediate sync if online
    if (this.syncState.isOnline && !this.syncState.isSyncing) {
      await this.syncNow();
    }
  }

  /**
   * Enable auto-save for a project
   */
  enableAutoSave(
    projectId: string,
    onChange: () => ProjectUpdate | null,
    options?: Partial<AutoSaveConfig>
  ): () => void {
    // Clear existing timer
    this.disableAutoSave(projectId);

    const config = { ...this.autoSaveConfig, ...options };
    let pendingChanges: ProjectUpdate | null = null;

    // Debounced save function
    const performSave = async () => {
      const changes = pendingChanges || onChange();
      if (!changes) return;

      try {
        await this.autoSaveProject(projectId, changes);
        pendingChanges = null;
        
        this.emitEvent({
          type: 'auto-save-success',
          resourceId: projectId,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Auto-save failed:', error);
        
        this.emitEvent({
          type: 'auto-save-failed',
          resourceId: projectId,
          error: error as Error,
          timestamp: new Date()
        });
      }
    };

    // Setup debounced save
    const debouncedSave = () => {
      // Clear existing timer
      const existingTimer = this.autoSaveTimers.get(projectId);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // Get latest changes
      pendingChanges = onChange();

      // Set new timer
      const timer = setTimeout(performSave, config.debounceTime);
      this.autoSaveTimers.set(projectId, timer);
    };

    // Setup interval save
    const intervalId = setInterval(performSave, config.interval);

    // Return cleanup function
    return () => {
      this.disableAutoSave(projectId);
      clearInterval(intervalId);
    };
  }

  /**
   * Disable auto-save for a project
   */
  disableAutoSave(projectId: string): void {
    const timer = this.autoSaveTimers.get(projectId);
    if (timer) {
      clearTimeout(timer);
      this.autoSaveTimers.delete(projectId);
    }
  }

  /**
   * Perform auto-save
   */
  private async autoSaveProject(
    projectId: string,
    changes: ProjectUpdate
  ): Promise<void> {
    const workspaceId = this.getCurrentWorkspaceId();
    
    if (this.syncState.isOnline) {
      // Direct save if online
      await projectService.updateProject(workspaceId, projectId, changes);
    } else {
      // Queue for offline sync
      await this.queueOperation({
        type: 'UPDATE',
        resource: 'project',
        resourceId: projectId,
        data: changes,
        workspaceId,
        projectId
      });
    }
  }

  /**
   * Sync all pending operations
   */
  async syncNow(): Promise<SyncStatus> {
    if (this.syncState.isSyncing) {
      return this.getSyncStatus();
    }

    this.syncState.isSyncing = true;
    const startTime = new Date();

    this.emitEvent({
      type: 'sync-started',
      timestamp: startTime
    });

    try {
      const operations = Array.from(this.syncQueue.values())
        .filter(op => op.status === 'pending')
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      let successCount = 0;
      let failureCount = 0;
      const conflicts: SyncConflict[] = [];

      for (const operation of operations) {
        try {
          await this.executeSyncOperation(operation);
          successCount++;
          
          // Remove from queue
          this.syncQueue.delete(operation.id);
        } catch (error: any) {
          failureCount++;
          
          // Check for conflict
          if (error.statusCode === 409) {
            const conflict = await this.handleConflict(operation, error);
            conflicts.push(conflict);
          } else {
            // Update operation status
            operation.status = 'failed';
            operation.attempts++;
            operation.lastError = error.message;

            // Remove if max retries exceeded
            if (operation.attempts >= this.autoSaveConfig.maxRetries) {
              this.syncQueue.delete(operation.id);
              this.syncState.errors.push(error);
            }
          }
        }
      }

      // Update state
      this.syncState.lastSyncTime = new Date();
      this.syncState.pendingOperations = this.syncQueue.size;
      this.syncState.conflicts = conflicts;

      // Save updated queue
      this.saveQueueToStorage();

      // Emit completion event
      this.emitEvent({
        type: 'sync-completed',
        successCount,
        failureCount,
        conflicts,
        timestamp: new Date()
      });

      return this.getSyncStatus();

    } finally {
      this.syncState.isSyncing = false;
    }
  }

  /**
   * Execute a sync operation
   */
  private async executeSyncOperation(operation: SyncOperation): Promise<void> {
    const { type, resource, resourceId, data, workspaceId, projectId } = operation;

    switch (type) {
      case SyncOperationType.CREATE:
        if (resource === 'project' && projectId) {
          await projectService.createProject(workspaceId, data);
        }
        break;

      case SyncOperationType.UPDATE:
        if (resource === 'project' && projectId) {
          await projectService.updateProject(workspaceId, projectId, data);
        }
        break;

      case SyncOperationType.DELETE:
        if (resource === 'project' && projectId) {
          await projectService.deleteProject(workspaceId, projectId);
        }
        break;

      case SyncOperationType.BATCH:
        // Handle batch operations
        for (const op of data.operations) {
          await this.executeSyncOperation(op);
        }
        break;

      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
  }

  /**
   * Handle sync conflict
   */
  private async handleConflict(
    operation: SyncOperation,
    error: any
  ): Promise<SyncConflict> {
    const conflict: SyncConflict = {
      id: `conflict-${Date.now()}`,
      operation,
      serverVersion: error.serverVersion,
      clientVersion: operation.data,
      timestamp: new Date(),
      resolved: false
    };

    // Auto-resolve based on strategy
    if (this.conflictStrategy === 'client-wins') {
      await this.resolveConflict(conflict, 'client');
    } else if (this.conflictStrategy === 'server-wins') {
      await this.resolveConflict(conflict, 'server');
    }
    // 'manual' strategy leaves conflict unresolved

    return conflict;
  }

  /**
   * Resolve a sync conflict
   */
  async resolveConflict(
    conflict: SyncConflict,
    resolution: 'client' | 'server' | 'merge',
    mergedData?: any
  ): Promise<void> {
    const { operation } = conflict;

    try {
      if (resolution === 'client') {
        // Retry with client data
        await this.executeSyncOperation(operation);
      } else if (resolution === 'server') {
        // Accept server version (no action needed)
        this.syncQueue.delete(operation.id);
      } else if (resolution === 'merge' && mergedData) {
        // Apply merged data
        operation.data = mergedData;
        await this.executeSyncOperation(operation);
      }

      // Mark as resolved
      conflict.resolved = true;
      conflict.resolution = { strategy: resolution, timestamp: new Date() };

      // Remove from conflicts
      this.syncState.conflicts = this.syncState.conflicts.filter(
        c => c.id !== conflict.id
      );

      this.emitEvent({
        type: 'conflict-resolved',
        conflict,
        resolution,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Failed to resolve conflict:', error);
      throw error;
    }
  }

  /**
   * Get sync status
   */
  getSyncStatus(): SyncStatus {
    return {
      isOnline: this.syncState.isOnline,
      isSyncing: this.syncState.isSyncing,
      lastSyncTime: this.syncState.lastSyncTime,
      pendingOperations: this.syncState.pendingOperations,
      hasConflicts: this.syncState.conflicts.length > 0,
      conflicts: this.syncState.conflicts,
      queuedOperations: Array.from(this.syncQueue.values())
    };
  }

  /**
   * Get sync metadata
   */
  async getSyncMetadata(
    workspaceId: string,
    resourceId?: string
  ): Promise<SyncMetadata> {
    const params = resourceId ? `?resourceId=${resourceId}` : '';
    
    return apiClient.get<SyncMetadata>(
      `/api/workspaces/${workspaceId}/sync/metadata${params}`
    );
  }

  /**
   * Force push local changes
   */
  async forcePush(): Promise<void> {
    this.conflictStrategy = 'client-wins';
    await this.syncNow();
  }

  /**
   * Force pull remote changes
   */
  async forcePull(workspaceId: string): Promise<void> {
    // Clear local queue
    this.syncQueue.clear();
    this.syncState.pendingOperations = 0;
    this.saveQueueToStorage();

    // Reload all data from server
    await projectService.clearCache();
    await projectService.getProjects(workspaceId, { page: { page: 0, size: 100 } });

    this.emitEvent({
      type: 'force-pull-completed',
      timestamp: new Date()
    });
  }

  /**
   * Subscribe to sync events
   */
  subscribe(callback: (event: SyncEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Set conflict resolution strategy
   */
  setConflictStrategy(strategy: ConflictResolutionStrategy): void {
    this.conflictStrategy = strategy;
  }

  /**
   * Get queued operations
   */
  getQueuedOperations(filter?: {
    resource?: string;
    resourceId?: string;
    status?: string;
  }): SyncOperation[] {
    let operations = Array.from(this.syncQueue.values());

    if (filter) {
      if (filter.resource) {
        operations = operations.filter(op => op.resource === filter.resource);
      }
      if (filter.resourceId) {
        operations = operations.filter(op => op.resourceId === filter.resourceId);
      }
      if (filter.status) {
        operations = operations.filter(op => op.status === filter.status);
      }
    }

    return operations;
  }

  /**
   * Clear sync queue
   */
  clearQueue(force: boolean = false): void {
    if (!force && this.syncQueue.size > 0) {
      if (!confirm('Clear all pending sync operations? This cannot be undone.')) {
        return;
      }
    }

    this.syncQueue.clear();
    this.syncState.pendingOperations = 0;
    this.saveQueueToStorage();

    this.emitEvent({
      type: 'queue-cleared',
      timestamp: new Date()
    });
  }

  /**
   * Private helper methods
   */

  private handleOnline = (): void => {
    this.syncState.isOnline = true;
    this.startSyncInterval();
    
    this.emitEvent({
      type: 'online',
      timestamp: new Date()
    });

    // Immediate sync attempt
    this.syncNow();
  };

  private handleOffline = (): void => {
    this.syncState.isOnline = false;
    this.stopSyncInterval();
    
    this.emitEvent({
      type: 'offline',
      timestamp: new Date()
    });
  };

  private handleVisibilityChange = (): void => {
    if (!document.hidden && this.syncState.isOnline) {
      // Page became visible, sync if needed
      if (this.syncQueue.size > 0) {
        this.syncNow();
      }
    }
  };

  private startSyncInterval(): void {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      if (this.syncQueue.size > 0 && !this.syncState.isSyncing) {
        this.syncNow();
      }
    }, 60000); // Sync every minute
  }

  private stopSyncInterval(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  private emitEvent(event: SyncEvent): void {
    this.listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Sync event listener error:', error);
      }
    });
  }

  private saveQueueToStorage(): void {
    try {
      const queueData = Array.from(this.syncQueue.entries());
      localStorage.setItem('sync_queue', JSON.stringify(queueData));
    } catch (error) {
      console.error('Failed to save sync queue:', error);
    }
  }

  private loadQueueFromStorage(): void {
    try {
      const stored = localStorage.getItem('sync_queue');
      if (stored) {
        const queueData = JSON.parse(stored);
        this.syncQueue = new Map(queueData.map(([id, op]: [string, any]) => [
          id,
          {
            ...op,
            timestamp: new Date(op.timestamp)
          }
        ]));
        this.syncState.pendingOperations = this.syncQueue.size;
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.syncQueue.clear();
    }
  }

  private getCurrentWorkspaceId(): string {
    // Get from workspace service or localStorage
    return localStorage.getItem('current_workspace_id') || '';
  }

  /**
   * Cleanup
   */
  destroy(): void {
    // Clear all timers
    this.autoSaveTimers.forEach(timer => clearTimeout(timer));
    this.autoSaveTimers.clear();

    // Stop sync interval
    this.stopSyncInterval();

    // Remove event listeners
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    // Clear listeners
    this.listeners.clear();
  }
}

// Export singleton instance
export const syncEngine = new SyncEngine();
