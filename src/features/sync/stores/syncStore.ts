/**
 * Sync Store - State management for offline sync and conflict resolution
 * Features: Offline queue, conflict resolution, sync status, real-time sync
 * @module features/sync/stores/syncStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { syncService } from '../services/syncService';
import type { Draft } from 'immer';
import type {
  SyncStatus,
  SyncOperation,
  SyncConflict,
  SyncEvent,
  ConflictResolutionStrategy,
  SyncMetadata,
  SyncQueue,
  SyncOptions,
  OfflineOperation
} from '../../workspace/services/syncTypes';

// ============================================================================
// ============================================================================
// STORE STATE INTERFACE
// ============================================================================

interface SyncStatistics {
  totalOperations: number;
  pendingOperations: number;
  completedOperations: number;
  failedOperations: number;
  conflicts: number;
  resolvedConflicts: number;
  lastSyncTime: Date | null;
  averageSyncTime: number;
  successRate: number;
}

interface SyncStoreState {
  isOnline: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'offline';
  lastOnlineTime: Date | null;
  
  // Sync state
  isSyncing: boolean;
  lastSyncTime: Date | null;
  lastSyncStatus: SyncStatus | null;
  syncProgress: number;
  syncMessage: string | null;
  
  // Queue & Operations
  pendingOperations: SyncOperation[];
  syncQueue: SyncQueue;
  failedOperations: SyncOperation[];
  completedOperations: SyncOperation[];
  
  // Conflicts
  conflicts: SyncConflict[];
  resolvedConflicts: SyncConflict[];
  conflictStrategy: ConflictResolutionStrategy;
  
  // Metadata
  metadata: SyncMetadata | null;
  statistics: SyncStatistics | null;
  
  // History
  syncHistory: SyncEvent[];
  
  // Settings
  autoSyncEnabled: boolean;
  syncInterval: number; // milliseconds
  maxRetries: number;
  batchSize: number;
  
  // UI State
  showSyncStatus: boolean;
  showConflictDialog: boolean;
  selectedConflict: SyncConflict | null;
  
  // Actions - Sync Operations
  syncNow: () => Promise<void>;
  syncWorkspace: (workspaceId: string) => Promise<void>;
  syncProject: (projectId: string) => Promise<void>;
  forcePush: () => Promise<void>;
  forcePull: () => Promise<void>;
  cancelSync: () => void;
  
  // Actions - Queue Management
  queueOperation: (operation: SyncOperation) => void;
  removeOperation: (operationId: string) => void;
  clearQueue: () => void;
  retryFailedOperations: () => Promise<void>;
  processPendingOperations: () => Promise<void>;
  
  // Actions - Conflict Resolution
  resolveConflict: (conflictId: string, resolution: ConflictResolutionStrategy, mergedData?: any) => Promise<void>;
  resolveAllConflicts: (strategy: ConflictResolutionStrategy) => Promise<void>;
  dismissConflict: (conflictId: string) => void;
  mergeConflict: (conflictId: string, mergedData: any) => Promise<void>;
  
  // Actions - Settings
  setAutoSync: (enabled: boolean) => void;
  setSyncInterval: (interval: number) => void;
  setConflictStrategy: (strategy: ConflictResolutionStrategy) => void;
  setBatchSize: (size: number) => void;
  setMaxRetries: (retries: number) => void;
  
  // Actions - Connection Management
  goOnline: () => void;
  goOffline: () => void;
  checkConnection: () => Promise<void>;
  updateConnectionQuality: () => void;
  
  // Actions - Monitoring
  subscribeToSyncEvents: () => () => void; // Returns unsubscribe function
  loadSyncMetadata: () => Promise<void>;
  refreshSyncStatus: () => Promise<void>;
  calculateStatistics: () => void;
  
  // Actions - UI
  toggleSyncStatus: () => void;
  showConflictResolution: (conflict: SyncConflict) => void;
  hideConflictDialog: () => void;
  
  // Utility
  reset: () => void;
  getSyncStatus: () => SyncStatus;
  hasPendingChanges: () => boolean;
  hasUnresolvedConflicts: () => boolean;
  getQueuedOperations: (resourceType?: string) => SyncOperation[];
  getConflictsByResource: (resourceType: string, resourceId: string) => SyncConflict[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_SYNC_INTERVAL = 60000; // 1 minute
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BATCH_SIZE = 10;
const MAX_SYNC_HISTORY = 100;

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useSyncStore = create<SyncStoreState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        isOnline: navigator.onLine,
        connectionQuality: navigator.onLine ? 'good' : 'offline',
        lastOnlineTime: navigator.onLine ? new Date() : null,
        isSyncing: false,
        lastSyncTime: null,
        lastSyncStatus: null,
        syncProgress: 0,
        syncMessage: null,
        pendingOperations: [],
        syncQueue: { operations: [], maxSize: 1000, currentSize: 0 },
        failedOperations: [],
        completedOperations: [],
        conflicts: [],
        resolvedConflicts: [],
        conflictStrategy: 'manual',
        metadata: null,
        statistics: null,
        syncHistory: [],
        autoSyncEnabled: true,
        syncInterval: DEFAULT_SYNC_INTERVAL,
        maxRetries: DEFAULT_MAX_RETRIES,
        batchSize: DEFAULT_BATCH_SIZE,
        showSyncStatus: false,
        showConflictDialog: false,
        selectedConflict: null,
        
        // Sync Operations
        syncNow: async () => {
          if (!get().isOnline) {
            throw new Error('Cannot sync while offline');
          }
          
          if (get().isSyncing) {
            console.warn('Sync already in progress');
            return;
          }
          
          try {
            set(state => {
              state.isSyncing = true;
              state.syncProgress = 0;
              state.syncMessage = 'Starting sync...';
            });
            
            // Process pending operations
            await get().processPendingOperations();
            
            // Perform full sync
            const result = await syncService.performFullSync();
            
            set(state => {
              state.lastSyncTime = new Date();
              state.lastSyncStatus = result.status;
              state.syncProgress = 100;
              state.syncMessage = 'Sync completed';
              
              if (result.conflicts && result.conflicts.length > 0) {
                state.conflicts.push(...result.conflicts);
              }
              
              // Add to history
              state.syncHistory.push({
                type: 'sync-completed',
                timestamp: new Date(),
                data: result
              } as unknown as SyncEvent);
              
              if (state.syncHistory.length > MAX_SYNC_HISTORY) {
                state.syncHistory = state.syncHistory.slice(-MAX_SYNC_HISTORY);
              }
            });
            
            // Calculate statistics
            get().calculateStatistics();
            
            setTimeout(() => {
              set(state => {
                state.isSyncing = false;
                state.syncMessage = null;
              });
            }, 2000);
            
          } catch (error) {
            set(state => {
              state.isSyncing = false;
              state.lastSyncStatus = 'error' as unknown as SyncStatus;
              state.syncMessage = 'Sync failed';
              
              state.syncHistory.push({
                type: 'sync-failed',
                timestamp: new Date(),
                error: error as Error
              } as unknown as SyncEvent);
            });
            throw error;
          }
        },
        
        syncWorkspace: async (workspaceId) => {
          if (!get().isOnline) {
            throw new Error('Cannot sync while offline');
          }
          
          try {
            set(state => {
              state.isSyncing = true;
              state.syncMessage = 'Syncing workspace...';
            });
            
            await syncService.syncWorkspace(workspaceId);
            
            set(state => {
              state.lastSyncTime = new Date();
              state.isSyncing = false;
            });
          } catch (error) {
            set(state => {
              state.isSyncing = false;
            });
            throw error;
          }
        },
        
        syncProject: async (projectId) => {
          if (!get().isOnline) {
            throw new Error('Cannot sync while offline');
          }
          
          try {
            set(state => {
              state.isSyncing = true;
              state.syncMessage = 'Syncing project...';
            });
            
            await syncService.syncProject(projectId);
            
            set(state => {
              state.lastSyncTime = new Date();
              state.isSyncing = false;
            });
          } catch (error) {
            set(state => {
              state.isSyncing = false;
            });
            throw error;
          }
        },
        
        forcePush: async () => {
          if (!get().isOnline) {
            throw new Error('Cannot force push while offline');
          }
          
          try {
            await syncService.forcePush(get().pendingOperations);
            
            set(state => {
              state.pendingOperations = [];
              state.lastSyncTime = new Date();
            });
          } catch (error) {
            throw error;
          }
        },
        
        forcePull: async () => {
          if (!get().isOnline) {
            throw new Error('Cannot force pull while offline');
          }
          
          try {
            await syncService.forcePull();
            
            set(state => {
              state.pendingOperations = [];
              state.lastSyncTime = new Date();
            });
          } catch (error) {
            throw error;
          }
        },
        
        cancelSync: () => {
          set(state => {
            state.isSyncing = false;
            state.syncMessage = 'Sync cancelled';
          });
        },
        
        // Queue Management
        queueOperation: (operation) => {
          set(state => {
            state.pendingOperations.push(operation);
            
            state.syncHistory.push({
              type: 'operation-queued',
              timestamp: new Date(),
              operation
            } as unknown as SyncEvent);
          });
          
          // Trigger sync if online and auto-sync enabled
          if (get().isOnline && get().autoSyncEnabled) {
            setTimeout(() => get().processPendingOperations(), 1000);
          }
        },
        
        removeOperation: (operationId) => {
          set(state => {
            state.pendingOperations = state.pendingOperations.filter(
              op => op.id !== operationId
            );
          });
        },
        
        clearQueue: () => {
          set(state => {
            state.pendingOperations = [];
            state.syncQueue.operations = [];
          });
        },
        
        retryFailedOperations: async () => {
          const failed = get().failedOperations;
          
          set(state => {
            state.failedOperations = [];
            state.pendingOperations.push(...failed);
          });
          
          await get().processPendingOperations();
        },
        
        processPendingOperations: async () => {
          const operations = get().pendingOperations;
          if (operations.length === 0) return;
          
          if (!get().isOnline) {
            console.log('Offline - operations queued for later');
            return;
          }
          
          const { batchSize } = get();
          const batch = operations.slice(0, batchSize);
          
          try {
            set(state => {
              state.syncProgress = 0;
              state.syncMessage = `Processing ${batch.length} operations...`;
            });
            
            const results = await syncService.processOperations(batch);
            
            set(state => {
              // Remove successful operations
              results.successful.forEach((id: string) => {
                const index = state.pendingOperations.findIndex((op: SyncOperation) => op.id === id);
                if (index !== -1) {
                  const op: SyncOperation = state.pendingOperations[index];
                  state.completedOperations.push(op);
                  state.pendingOperations.splice(index, 1);
                }
              });

              // Move failed operations
              results.failed.forEach(({ id, error }: { id: string; error: Error }) => {
                const index = state.pendingOperations.findIndex((op: SyncOperation) => op.id === id);
                if (index !== -1) {
                  const op: SyncOperation = state.pendingOperations[index];
                  const currentRetries = (op as any).retryCount ?? 0;
                  if (currentRetries < state.maxRetries) {
                    // Some SyncOperation shapes may not have retryCount; be tolerant
                    (op as any).retryCount = currentRetries + 1;
                  } else {
                    state.failedOperations.push(op);
                    state.pendingOperations.splice(index, 1);
                  }
                }
              });

              state.syncProgress = 100;
            });
            
            // Process next batch if available
            if (get().pendingOperations.length > 0) {
              await get().processPendingOperations();
            }
            
          } catch (error) {
            console.error('Failed to process operations:', error);
          }
        },
        
        // Conflict Resolution
        resolveConflict: async (conflictId, resolution, mergedData) => {
          try {
            const conflict = get().conflicts.find(c => c.id === conflictId);
            if (!conflict) throw new Error('Conflict not found');
            
            await syncService.resolveConflict(conflict, resolution, mergedData);
            
            set(state => {
              const index = state.conflicts.findIndex(c => c.id === conflictId);
              if (index !== -1) {
                const resolved = state.conflicts[index];
                resolved.resolved = true;
                // Cast resolution to any to satisfy WritableDraft<SyncResolution> expected by immer drafts
                resolved.resolution = resolution as unknown as any;
                state.resolvedConflicts.push(resolved);
                state.conflicts.splice(index, 1);
              }
              
              state.syncHistory.push({
                type: 'conflict-resolved',
                timestamp: new Date(),
                conflict: conflict,
                data: { resolution, mergedData }
              } as unknown as SyncEvent);
            });
          } catch (error) {
            throw error;
          }
        },
        
        resolveAllConflicts: async (strategy) => {
          const conflicts = get().conflicts;
          
          await Promise.all(
            conflicts.map(conflict => 
              get().resolveConflict(conflict.id, strategy)
            )
          );
        },
        
        dismissConflict: (conflictId) => {
          set(state => {
            state.conflicts = state.conflicts.filter(c => c.id !== conflictId);
          });
        },
        
        mergeConflict: async (conflictId, mergedData) => {
          await get().resolveConflict(conflictId, 'merge' as ConflictResolutionStrategy, mergedData);
        },
        
        // Settings
        setAutoSync: (enabled) => {
          set(state => {
            state.autoSyncEnabled = enabled;
          });
          
          if (enabled && get().isOnline && get().pendingOperations.length > 0) {
            get().processPendingOperations();
          }
        },
        
        setSyncInterval: (interval) => {
          set(state => {
            state.syncInterval = interval;
          });
        },
        
        setConflictStrategy: (strategy) => {
          set(state => {
            state.conflictStrategy = strategy;
          });
        },
        
        setBatchSize: (size) => {
          set(state => {
            state.batchSize = size;
          });
        },
        
        setMaxRetries: (retries) => {
          set(state => {
            state.maxRetries = retries;
          });
        },
        
        // Connection Management
        goOnline: () => {
          set(state => {
            state.isOnline = true;
            state.lastOnlineTime = new Date();
            state.connectionQuality = 'good';
            
            state.syncHistory.push({
              type: 'online',
              timestamp: new Date()
            });
          });
          
          // Process pending operations
          if (get().autoSyncEnabled && get().pendingOperations.length > 0) {
            get().processPendingOperations();
          }
        },
        
        goOffline: () => {
          set(state => {
            state.isOnline = false;
            state.connectionQuality = 'offline';
            
            state.syncHistory.push({
              type: 'offline',
              timestamp: new Date()
            });
          });
        },
        
        checkConnection: async () => {
          try {
            const isOnline = await syncService.checkConnection();
            
            set(state => {
              if (isOnline !== state.isOnline) {
                if (isOnline) {
                  get().goOnline();
                } else {
                  get().goOffline();
                }
              }
            });
          } catch (error) {
            get().goOffline();
          }
        },
        
        updateConnectionQuality: () => {
          // Implementation would measure connection speed/latency
          const quality = get().isOnline ? 'good' : 'offline';
          
          set(state => {
            state.connectionQuality = quality;
          });
        },
        
        // Monitoring
        subscribeToSyncEvents: () => {
          const unsubscribe = syncService.subscribeToEvents((event: SyncEvent) => {
            set(state => {
              state.syncHistory.push(event);
              
              if (state.syncHistory.length > MAX_SYNC_HISTORY) {
                state.syncHistory = state.syncHistory.slice(-MAX_SYNC_HISTORY);
              }
            });
            
            // Handle specific events
            switch (event.type) {
              case 'online':
                get().goOnline();
                break;
              case 'offline':
                get().goOffline();
                break;
              case 'conflict-detected':
                if (event.conflict) {
                  set(state => {
                    state.conflicts.push(event.conflict!);
                  });
                }
                break;
            }
          });
          
          return unsubscribe;
        },
        
        loadSyncMetadata: async () => {
          try {
            const metadata = await syncService.getMetadata();
            
            set(state => {
              state.metadata = metadata;
            });
          } catch (error) {
            console.error('Failed to load sync metadata:', error);
          }
        },
        
        refreshSyncStatus: async () => {
          await get().checkConnection();
          await get().loadSyncMetadata();
          get().calculateStatistics();
        },
        
        calculateStatistics: () => {
          const { pendingOperations, completedOperations, failedOperations, conflicts, resolvedConflicts } = get();
          
          const statistics: SyncStatistics = {
            totalOperations: pendingOperations.length + completedOperations.length + failedOperations.length,
            pendingOperations: pendingOperations.length,
            completedOperations: completedOperations.length,
            failedOperations: failedOperations.length,
            conflicts: conflicts.length,
            resolvedConflicts: resolvedConflicts.length,
            lastSyncTime: get().lastSyncTime,
            averageSyncTime: 0, // Would calculate from history
            successRate: completedOperations.length / 
              (completedOperations.length + failedOperations.length || 1)
          };
          
          set(state => {
            state.statistics = statistics;
          });
        },
        
        // UI
        toggleSyncStatus: () => {
          set(state => {
            state.showSyncStatus = !state.showSyncStatus;
          });
        },
        
        showConflictResolution: (conflict) => {
          set(state => {
            state.selectedConflict = conflict;
            state.showConflictDialog = true;
          });
        },
        
        hideConflictDialog: () => {
          set(state => {
            state.selectedConflict = null;
            state.showConflictDialog = false;
          });
        },
        
        // Utility
        reset: () => {
          set(state => {
            state.pendingOperations = [];
            state.syncQueue.operations = [];
            state.failedOperations = [];
            state.completedOperations = [];
            state.conflicts = [];
            state.resolvedConflicts = [];
            state.syncHistory = [];
            state.lastSyncTime = null;
            state.lastSyncStatus = null;
            state.syncProgress = 0;
            state.syncMessage = null;
            state.metadata = null;
            state.statistics = null;
            state.showSyncStatus = false;
            state.showConflictDialog = false;
            state.selectedConflict = null;
          });
        },
        
        getSyncStatus: (): SyncStatus => {
          const toSyncStatus = (s: string) => s as unknown as SyncStatus;
          if (get().isSyncing) return toSyncStatus('syncing');
          if (!get().isOnline) return toSyncStatus('offline');
          if (get().pendingOperations.length > 0) return toSyncStatus('pending');
          if (get().conflicts.length > 0) return toSyncStatus('conflicts');
          return toSyncStatus('synced');
        },
        
        hasPendingChanges: () => {
          return get().pendingOperations.length > 0;
        },
        
        hasUnresolvedConflicts: () => {
          return get().conflicts.length > 0;
        },
        
        getQueuedOperations: (resourceType) => {
          const operations = get().pendingOperations;
          
          if (resourceType) {
            return operations.filter(op => op.resource === resourceType);
          }
          
          return operations;
        },
        
        getConflictsByResource: (resourceType, resourceId) => {
          return get().conflicts.filter(c => {
            // Some SyncConflict shapes may use different property names; cast to any to be tolerant.
            const ct = (c as any).resourceType ?? (c as any).resource ?? (c as any).entityType;
            const id = (c as any).resourceId ?? (c as any).id ?? (c as any).entityId;
            return ct === resourceType && id === resourceId;
          });
        }
      })),
      {
        name: 'sync-store',
        partialize: (state) => ({
          pendingOperations: state.pendingOperations,
          failedOperations: state.failedOperations,
          conflicts: state.conflicts,
          conflictStrategy: state.conflictStrategy,
          autoSyncEnabled: state.autoSyncEnabled,
          syncInterval: state.syncInterval
        })
      }
    ),
    {
      name: 'sync-store'
    }
  )
);

// ============================================================================
// EVENT LISTENERS
// ============================================================================

if (typeof window !== 'undefined') {
  // Listen for online/offline events
  window.addEventListener('online', () => {
    useSyncStore.getState().goOnline();
  });
  
  window.addEventListener('offline', () => {
    useSyncStore.getState().goOffline();
  });
  
  // Set up auto-sync interval
  setInterval(() => {
    const state = useSyncStore.getState();
    if (state.autoSyncEnabled && state.isOnline && state.pendingOperations.length > 0) {
      state.processPendingOperations();
    }
  }, useSyncStore.getState().syncInterval);
  
  // Subscribe to sync events
  const unsubscribe = useSyncStore.getState().subscribeToSyncEvents();
  
  // Clean up on unload
  window.addEventListener('beforeunload', () => {
    unsubscribe();
  });
}