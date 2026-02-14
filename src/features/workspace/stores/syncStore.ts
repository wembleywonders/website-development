/**
 * Sync Store - State management for offline synchronization
 * Features: Sync status, conflict resolution, offline queue monitoring
 * @module features/workspace/stores/syncStore
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { syncEngine } from '../services/syncEngine';
import type {
  SyncStatus,
  SyncOperation,
  SyncConflict,
  SyncEvent,
  ConflictResolutionStrategy,
  SyncMetadata
} from '../services/syncTypes';

/**
 * Sync store state interface
 */
interface SyncState {
  // Sync status
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  pendingOperations: number;
  
  // Queue & Conflicts
  syncQueue: SyncOperation[];
  conflicts: SyncConflict[];
  resolvedConflicts: SyncConflict[];
  
  // Sync metadata
  metadata: SyncMetadata | null;
  syncHistory: SyncEvent[];
  
  // Settings
  conflictStrategy: ConflictResolutionStrategy;
  autoSyncEnabled: boolean;
  syncInterval: number; // minutes
  
  // UI State
  showSyncStatus: boolean;
  showConflictDialog: boolean;
  selectedConflict: SyncConflict | null;
  
  // Actions - Sync Operations
  syncNow: () => Promise<void>;
  forcePush: () => Promise<void>;
  forcePull: (workspaceId: string) => Promise<void>;
  clearQueue: (force?: boolean) => void;
  
  // Actions - Conflict Management
  resolveConflict: (conflictId: string, resolution: 'client' | 'server' | 'merge', mergedData?: any) => Promise<void>;
  resolveAllConflicts: (resolution: 'client' | 'server') => Promise<void>;
  dismissConflict: (conflictId: string) => void;
  
  // Actions - Settings
  setConflictStrategy: (strategy: ConflictResolutionStrategy) => void;
  setAutoSync: (enabled: boolean) => void;
  setSyncInterval: (minutes: number) => void;
  
  // Actions - Monitoring
  subscribeToSyncEvents: () => () => void;
  loadSyncMetadata: (workspaceId: string) => Promise<void>;
  refreshSyncStatus: () => void;
  
  // UI Actions
  toggleSyncStatus: () => void;
  showConflictResolution: (conflict: SyncConflict) => void;
  hideConflictDialog: () => void;
  
  // Utility
  reset: () => void;
  getSyncStatus: () => SyncStatus;
  hasPendingChanges: () => boolean;
  hasUnresolvedConflicts: () => boolean;
  getQueuedOperations: (filter?: { resource?: string; resourceId?: string }) => SyncOperation[];
}

/**
 * Sync store implementation
 */
export const useSyncStore = create<SyncState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => {
        let eventUnsubscribe: (() => void) | null = null;
        
        return {
          // Initial state
          isOnline: navigator.onLine,
          isSyncing: false,
          lastSyncTime: null,
          pendingOperations: 0,
          
          syncQueue: [],
          conflicts: [],
          resolvedConflicts: [],
          
          metadata: null,
          syncHistory: [],
          
          conflictStrategy: 'client-wins',
          autoSyncEnabled: true,
          syncInterval: 5,
          
          showSyncStatus: false,
          showConflictDialog: false,
          selectedConflict: null,
          
          // Sync Operations
          syncNow: async () => {
            try {
              set(state => {
                state.isSyncing = true;
              });
              
              const status = await syncEngine.syncNow();
              
              set(state => {
                state.isOnline = status.isOnline;
                state.isSyncing = status.isSyncing;
                state.lastSyncTime = status.lastSyncTime;
                state.pendingOperations = status.pendingOperations;
                state.conflicts = status.conflicts;
                state.syncQueue = status.queuedOperations;
              });
            } catch (error) {
              set(state => {
                state.isSyncing = false;
              });
              throw error;
            }
          },
          
          forcePush: async () => {
            try {
              set(state => {
                state.isSyncing = true;
              });
              
              await syncEngine.forcePush();
              
              // Refresh status
              const status = syncEngine.getSyncStatus();
              
              set(state => {
                state.isSyncing = false;
                state.lastSyncTime = status.lastSyncTime;
                state.pendingOperations = status.pendingOperations;
                state.conflicts = [];
                state.syncQueue = status.queuedOperations;
              });
            } catch (error) {
              set(state => {
                state.isSyncing = false;
              });
              throw error;
            }
          },
          
          forcePull: async (workspaceId) => {
            try {
              set(state => {
                state.isSyncing = true;
              });
              
              await syncEngine.forcePull(workspaceId);
              
              set(state => {
                state.isSyncing = false;
                state.lastSyncTime = new Date();
                state.pendingOperations = 0;
                state.conflicts = [];
                state.syncQueue = [];
              });
            } catch (error) {
              set(state => {
                state.isSyncing = false;
              });
              throw error;
            }
          },
          
          clearQueue: (force = false) => {
            syncEngine.clearQueue(force);
            
            set(state => {
              state.syncQueue = [];
              state.pendingOperations = 0;
            });
          },
          
          // Conflict Management
          resolveConflict: async (conflictId, resolution, mergedData) => {
            const conflict = get().conflicts.find(c => c.id === conflictId);
            if (!conflict) throw new Error('Conflict not found');
            
            try {
              await syncEngine.resolveConflict(conflict, resolution, mergedData);
              
              set(state => {
                // Move from conflicts to resolved
                state.conflicts = state.conflicts.filter(c => c.id !== conflictId);
                conflict.resolved = true;
                conflict.resolution = { strategy: resolution, timestamp: new Date() };
                state.resolvedConflicts.unshift(conflict);
                
                // Close dialog if this was selected
                if (state.selectedConflict?.id === conflictId) {
                  state.showConflictDialog = false;
                  state.selectedConflict = null;
                }
              });
            } catch (error) {
              throw error;
            }
          },
          
          resolveAllConflicts: async (resolution) => {
            const conflicts = [...get().conflicts];
            
            for (const conflict of conflicts) {
              try {
                await get().resolveConflict(conflict.id, resolution);
              } catch (error) {
                console.error(`Failed to resolve conflict ${conflict.id}:`, error);
              }
            }
          },
          
          dismissConflict: (conflictId) => {
            set(state => {
              const conflict = state.conflicts.find(c => c.id === conflictId);
              if (conflict) {
                state.conflicts = state.conflicts.filter(c => c.id !== conflictId);
                state.resolvedConflicts.push({ ...conflict, resolved: true });
              }
            });
          },
          
          // Settings
          setConflictStrategy: (strategy) => {
            syncEngine.setConflictStrategy(strategy);
            set(state => {
              state.conflictStrategy = strategy;
            });
          },
          
          setAutoSync: (enabled) => {
            set(state => {
              state.autoSyncEnabled = enabled;
            });
            
            // Setup/clear auto-sync interval
            if (enabled) {
              // Implementation would setup interval
            }
          },
          
          setSyncInterval: (minutes) => {
            set(state => {
              state.syncInterval = minutes;
            });
          },
          
          // Monitoring
          subscribeToSyncEvents: () => {
            // Subscribe to sync engine events
            const unsubscribe = syncEngine.subscribe((event: SyncEvent) => {
              set(state => {
                // Update history
                state.syncHistory.unshift(event);
                if (state.syncHistory.length > 100) {
                  state.syncHistory.pop();
                }
                
                // Update state based on event
                switch (event.type) {
                  case 'online':
                    state.isOnline = true;
                    break;
                  case 'offline':
                    state.isOnline = false;
                    break;
                  case 'sync-started':
                    state.isSyncing = true;
                    break;
                  case 'sync-completed':
                    state.isSyncing = false;
                    state.lastSyncTime = event.timestamp;
                    if (event.conflicts) {
                      state.conflicts = event.conflicts;
                    }
                    break;
                  case 'conflict-resolved':
                    if (event.conflict) {
                      state.conflicts = state.conflicts.filter(c => c.id !== event.conflict!.id);
                    }
                    break;
                  case 'operation-queued':
                    state.pendingOperations++;
                    if (event.operation) {
                      state.syncQueue.push(event.operation);
                    }
                    break;
                }
              });
            });
            
            eventUnsubscribe = unsubscribe;
            return unsubscribe;
          },
          
          loadSyncMetadata: async (workspaceId) => {
            try {
              const metadata = await syncEngine.getSyncMetadata(workspaceId);
              
              set(state => {
                state.metadata = metadata;
              });
            } catch (error) {
              console.error('Failed to load sync metadata:', error);
            }
          },
          
          refreshSyncStatus: () => {
            const status = syncEngine.getSyncStatus();
            
            set(state => {
              state.isOnline = status.isOnline;
              state.isSyncing = status.isSyncing;
              state.lastSyncTime = status.lastSyncTime;
              state.pendingOperations = status.pendingOperations;
              state.conflicts = status.conflicts;
              state.syncQueue = status.queuedOperations;
            });
          },
          
          // UI Actions
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
              state.showConflictDialog = false;
              state.selectedConflict = null;
            });
          },
          
          // Utility
          reset: () => {
            if (eventUnsubscribe) {
              eventUnsubscribe();
              eventUnsubscribe = null;
            }
            
            set(state => {
              state.isOnline = navigator.onLine;
              state.isSyncing = false;
              state.lastSyncTime = null;
              state.pendingOperations = 0;
              state.syncQueue = [];
              state.conflicts = [];
              state.resolvedConflicts = [];
              state.metadata = null;
              state.syncHistory = [];
              state.showSyncStatus = false;
              state.showConflictDialog = false;
              state.selectedConflict = null;
            });
          },
          
          getSyncStatus: () => {
            return syncEngine.getSyncStatus();
          },
          
          hasPendingChanges: () => {
            return get().pendingOperations > 0;
          },
          
          hasUnresolvedConflicts: () => {
            return get().conflicts.some(c => !c.resolved);
          },
          
          getQueuedOperations: (filter) => {
            return syncEngine.getQueuedOperations(filter);
          }
        };
      })
    ),
    {
      name: 'sync-store'
    }
  )
);
