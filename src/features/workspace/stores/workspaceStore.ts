/**
 * Workspace Store - State management for workspace settings and configuration
 * Features: Settings, members, billing, storage, themes
 * @module features/workspace/stores/workspaceStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { workspaceService } from '../services/workspaceService';

// Import actual types from workspace.types.ts
import type {
  CreatorWorkspace,
  WorkspaceResponse,
  WorkspaceState as WorkspaceStateType,
  WorkspaceStats,
  SyncWorkspaceRequest,
  WorkspaceSyncResponse,
  PendingAction,
  UpdateWorkspaceRequest as UpdateRequest,
  CreateWorkspaceRequest,
  WorkspaceType
} from '../types';

// Type aliases for compatibility with store implementation
type Workspace = CreatorWorkspace & {
  name: string;
  slug: string;
  description?: string;
  type: WorkspaceType;
  ownerId: string;
  settings: WorkspaceSettings;
};

type WorkspaceSettings = WorkspaceStateType & {
  visibility?: 'private' | 'team' | 'public';
  features?: WorkspaceFeatures;
};

type WorkspaceFeatures = {
  projectsEnabled: boolean;
  quickActionsEnabled: boolean;
  aiAssistantEnabled: boolean;
  collaborationEnabled: boolean;
};

type WorkspaceStatistics = WorkspaceStats;

type WorkspaceUser = {
  id: string;
  userId: string;
  workspaceId: string;
  name: string;
  email: string;
  avatar?: string;
  role: WorkspaceRole;
  permissions: WorkspacePermissions;
  joinedAt: Date;
  lastActiveAt?: Date;
};

type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer' | 'guest';

type WorkspacePermissions = {
  canEditWorkspace: boolean;
  canDeleteWorkspace: boolean;
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canManageRoles: boolean;
  canManageBilling: boolean;
  canCreateProjects: boolean;
  canEditAllProjects: boolean;
  canDeleteProjects: boolean;
  canArchiveProjects: boolean;
  canViewSettings: boolean;
  canEditSettings: boolean;
  canManageIntegrations: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
};

type WorkspaceBilling = {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'past_due' | 'cancelled' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  seats: {
    included: number;
    used: number;
    additional: number;
  };
  storage: {
    included: number;
    used: number;
    additional: number;
  };
  features: string[];
};

type WorkspaceStorage = {
  used: number;
  limit: number;
  breakdown: {
    projects: number;
    attachments: number;
    media: number;
    backups: number;
    other: number;
  };
};

type WorkspaceTheme = {
  mode: 'light' | 'dark' | 'system';
  primaryColor?: string;
  accentColor?: string;
};

type UpdateWorkspaceRequest = UpdateRequest & {
  name?: string;
  description?: string;
  settings?: Partial<WorkspaceSettings>;
};

/**
 * Workspace store state interface
 */
interface WorkspaceStoreState {
  // Current workspace
  currentWorkspace: Workspace | null;
  workspaceResponse: WorkspaceResponse | null;
  workspaces: Map<string, Workspace>;
  
  // Workspace data
  settings: WorkspaceSettings | null;
  members: WorkspaceUser[];
  statistics: WorkspaceStatistics | null;
  billing: WorkspaceBilling | null;
  storage: WorkspaceStorage | null;
  theme: WorkspaceTheme | null;
  
  // Sync state
  pendingActions: PendingAction[];
  lastSyncResponse: WorkspaceSyncResponse | null;
  
  // UI State
  loading: boolean;
  saving: boolean;
  syncing: boolean;
  errors: Map<string, Error>;
  
  // Actions - Workspace Management
  loadCurrentWorkspace: () => Promise<Workspace>;
  loadWorkspaces: () => Promise<void>;
  createWorkspace: (data: CreateWorkspaceRequest) => Promise<Workspace>;
  updateWorkspace: (workspaceId: string, updates: UpdateWorkspaceRequest) => Promise<Workspace>;
  deleteWorkspace: (workspaceId: string) => Promise<void>;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  
  // Actions - Sync
  syncWorkspace: () => Promise<WorkspaceSyncResponse>;
  addPendingAction: (action: PendingAction) => void;
  clearPendingActions: () => void;
  
  // Actions - Settings
  loadSettings: (workspaceId: string) => Promise<WorkspaceSettings>;
  updateSettings: (workspaceId: string, settings: Partial<WorkspaceSettings>) => Promise<void>;
  
  // Actions - Members
  loadMembers: (workspaceId: string) => Promise<void>;
  inviteMember: (workspaceId: string, email: string, role: WorkspaceRole) => Promise<void>;
  updateMemberRole: (workspaceId: string, userId: string, role: WorkspaceRole) => Promise<void>;
  removeMember: (workspaceId: string, userId: string) => Promise<void>;
  
  // Actions - Statistics & Analytics
  loadStatistics: (workspaceId: string) => Promise<void>;
  loadAnalytics: (workspaceId: string, startDate: Date, endDate: Date) => Promise<any>;
  
  // Actions - Billing
  loadBilling: (workspaceId: string) => Promise<void>;
  updateBillingPlan: (workspaceId: string, planId: string) => Promise<void>;
  
  // Actions - Storage
  loadStorage: (workspaceId: string) => Promise<void>;
  cleanupStorage: (workspaceId: string) => Promise<void>;
  
  // Actions - Theme
  loadTheme: (workspaceId: string) => Promise<void>;
  updateTheme: (workspaceId: string, theme: Partial<WorkspaceTheme>) => Promise<void>;
  
  // Utility
  reset: () => void;
  getCurrentWorkspaceId: () => string | null;
  hasPermission: (permission: keyof WorkspacePermissions) => boolean;
  isOwner: () => boolean;
  getMemberById: (userId: string) => WorkspaceUser | undefined;
}

/**
 * Workspace store implementation
 */
export const useWorkspaceStore = create<WorkspaceStoreState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        currentWorkspace: null,
        workspaceResponse: null,
        workspaces: new Map(),
        settings: null,
        members: [],
        statistics: null,
        billing: null,
        storage: null,
        theme: null,
        pendingActions: [],
        lastSyncResponse: null,
        loading: false,
        saving: false,
        syncing: false,
        errors: new Map(),
        
        // Workspace Management
        loadCurrentWorkspace: async () => {
          try {
            set(state => {
              state.loading = true;
              state.errors.delete('loadCurrent');
            });
            
            const response = await workspaceService.getCurrentWorkspace() as unknown as WorkspaceResponse;
            
            // Convert response to Workspace type
            const workspace: Workspace = {
              ...response,
              name: `Workspace ${response.id}`, // Default name
              slug: `workspace-${response.id}`,
              description: '',
              type: 'personal' as WorkspaceType,
              ownerId: String(response.userId),
              settings: response.workspaceState as WorkspaceSettings || {}
            };
            
            set(state => {
              state.currentWorkspace = workspace;
              state.workspaceResponse = response;
              state.workspaces.set(String(workspace.id), workspace);
              state.settings = workspace.settings;
              state.loading = false;
            });
            
            // Auto-load related data
            await Promise.all([
              get().loadStatistics(String(workspace.id))
            ]).catch(console.error);
            
            return workspace;
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set('loadCurrent', error as Error);
            });
            throw error;
          }
        },
        
        loadWorkspaces: async () => {
          try {
            set(state => {
              state.loading = true;
              state.errors.delete('loadAll');
            });
            
            // For now, just load current workspace
            await get().loadCurrentWorkspace();
            
            set(state => {
              state.loading = false;
            });
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set('loadAll', error as Error);
            });
            throw error;
          }
        },
        
        createWorkspace: async (data) => {
          try {
            set(state => {
              state.saving = true;
              state.errors.delete('create');
            });
            
            // Ensure the payload includes the required `userId` expected by WorkspaceCreate.
            // Prefer localStorage, then fall back to the current workspaceResponse, then 0 as a last resort.
            const userIdFromStorage = localStorage.getItem('userId');
            const userId = Number(userIdFromStorage ?? get().workspaceResponse?.userId ?? 0);
            const payload = {
              ...data,
              userId
            };
            
            const response = await workspaceService.createWorkspace(payload);
            
            const workspace: Workspace = {
              // Build the Workspace explicitly to avoid carrying optional properties from the raw response
              id: Number((response as any).id ?? 0),
              userId: Number(response.userId ?? payload.userId ?? userId),
              currentJourneyStep: (response as any).currentJourneyStep ?? 0,
              workspaceState: (response as any).workspaceState ?? (data.settings as WorkspaceSettings || {}),
              name: data.name,
              slug: data.name.toLowerCase().replace(/\s+/g, '-'),
              description: data.description,
              type: data.type,
              ownerId: String(response.userId ?? payload.userId ?? userId),
              settings: (data.settings as WorkspaceSettings) || {},
              // Ensure createdAt/updatedAt are always strings (non-optional) as required by CreatorWorkspace
              createdAt: String((response as any).createdAt ?? new Date().toISOString()),
              updatedAt: String((response as any).updatedAt ?? new Date().toISOString())
            };
            
            set(state => {
              state.workspaces.set(String(workspace.id), workspace);
              state.saving = false;
            });
            
            return workspace;
          } catch (error) {
            set(state => {
              state.saving = false;
              state.errors.set('create', error as Error);
            });
            throw error;
          }
        },
        
        updateWorkspace: async (workspaceId, updates) => {
          const original = get().workspaces.get(workspaceId);
          
          set(state => {
            state.saving = true;
            const workspace = state.workspaces.get(workspaceId);
            if (workspace) {
              Object.assign(workspace, updates);
              if (state.currentWorkspace?.id === Number(workspaceId)) {
                Object.assign(state.currentWorkspace, updates);
              }
            }
          });
          
          try {
            const updated = await workspaceService.updateWorkspace(workspaceId, updates);
            
            const workspace: Workspace = {
              ...updated,
              // Ensure required CreatorWorkspace fields exist and have correct types
              id: Number((updated as any).id ?? workspaceId),
              userId: Number((updated as any).userId ?? original?.userId ?? 0),
              currentJourneyStep: (updated as any).currentJourneyStep ?? original?.currentJourneyStep ?? 0,
              workspaceState: (updated as any).workspaceState ?? (original as any)?.workspaceState ?? {},
              name: updates.name || original?.name || '',
              slug: original?.slug || '',
              description: updates.description || original?.description,
              type: original?.type || 'personal',
              ownerId: String((updated as any).userId ?? original?.userId ?? 0),
              settings: ((updated as any).workspaceState ?? (original as any)?.workspaceState) as WorkspaceSettings || {},
              // Ensure createdAt/updatedAt are present and strings to satisfy CreatorWorkspace
              createdAt: String((updated as any).createdAt ?? original?.createdAt ?? new Date().toISOString()),
              updatedAt: String((updated as any).updatedAt ?? new Date().toISOString())
            };
            
            set(state => {
              state.workspaces.set(workspaceId, workspace);
              if (state.currentWorkspace?.id === Number(workspaceId)) {
                state.currentWorkspace = workspace;
              }
              state.saving = false;
            });
            
            return workspace;
          } catch (error) {
            if (original) {
              set(state => {
                state.workspaces.set(workspaceId, original);
                if (state.currentWorkspace?.id === Number(workspaceId)) {
                  state.currentWorkspace = original;
                }
              });
            }
            set(state => {
              state.saving = false;
              state.errors.set('update', error as Error);
            });
            throw error;
          }
        },
        
        deleteWorkspace: async (workspaceId) => {
          try {
            await workspaceService.deleteWorkspace(workspaceId);
            
            set(state => {
              state.workspaces.delete(workspaceId);
              if (state.currentWorkspace?.id === Number(workspaceId)) {
                state.currentWorkspace = null;
                state.settings = null;
                state.members = [];
                state.statistics = null;
              }
            });
          } catch (error) {
            throw error;
          }
        },
        
        switchWorkspace: async (workspaceId) => {
          try {
            set(state => {
              state.loading = true;
            });
            
            const response = await workspaceService.switchWorkspace(workspaceId) as unknown as WorkspaceResponse;
            
            const workspace: Workspace = {
              ...response,
              id: Number((response as any).id ?? 0),
              userId: Number((response as any).userId ?? 0),
              currentJourneyStep: (response as any).currentJourneyStep ?? 0,
              workspaceState: (response as any).workspaceState ?? {},
              name: `Workspace ${response.id}`,
              slug: `workspace-${response.id}`,
              description: '',
              type: 'personal' as WorkspaceType,
              ownerId: String(response.userId),
              settings: response.workspaceState as WorkspaceSettings || {}
            };
            
            set(state => {
              state.currentWorkspace = workspace;
              state.workspaceResponse = response;
              state.workspaces.set(workspaceId, workspace);
              state.loading = false;
              state.settings = workspace.settings;
              state.members = [];
              state.statistics = response.stats || null;
              state.billing = null;
              state.storage = null;
            });
          } catch (error) {
            set(state => {
              state.loading = false;
            });
            throw error;
          }
        },
        
        // Sync Actions
        syncWorkspace: async () => {
          try {
            set(state => {
              state.syncing = true;
            });
            
            const currentWorkspace = get().currentWorkspace;
            if (!currentWorkspace) throw new Error('No current workspace');
            
            const request: SyncWorkspaceRequest = {
              userId: Number(currentWorkspace.ownerId),
              workspaceState: currentWorkspace.settings,
              pendingActions: get().pendingActions,
              lastSyncTimestamp: currentWorkspace.lastSyncAt ? 
                new Date(currentWorkspace.lastSyncAt).getTime() : undefined
            };
            
            const response = await (workspaceService as any).syncWorkspace(request);
            
            set(state => {
              state.lastSyncResponse = response;
              state.syncing = false;
              if (response.status === 'SUCCESS') {
                state.pendingActions = [];
              }
            });
            
            return response;
          } catch (error) {
            set(state => {
              state.syncing = false;
            });
            throw error;
          }
        },
        
        addPendingAction: (action) => {
          set(state => {
            state.pendingActions.push(action);
          });
        },
        
        clearPendingActions: () => {
          set(state => {
            state.pendingActions = [];
          });
        },
        
        // Settings Management
        loadSettings: async (workspaceId) => {
          const workspace = get().workspaces.get(workspaceId);
          if (workspace) {
            return workspace.settings;
          }
          return {} as WorkspaceSettings;
        },
        
        updateSettings: async (workspaceId, settings) => {
          const workspace = get().workspaces.get(workspaceId);
          if (workspace) {
            const updated = { ...workspace.settings, ...settings };
            await get().updateWorkspace(workspaceId, { settings: updated });
            set(state => {
              state.settings = updated;
            });
          }
        },
        
        // Member Management (Mock implementations for now)
        loadMembers: async (workspaceId) => {
          // Mock implementation - would call API
          set(state => {
            state.members = [];
          });
        },
        
        inviteMember: async (workspaceId, email, role) => {
          // Mock implementation
          console.log('Inviting member:', email, role);
        },
        
        updateMemberRole: async (workspaceId, userId, role) => {
          // Mock implementation
          console.log('Updating member role:', userId, role);
        },
        
        removeMember: async (workspaceId, userId) => {
          // Mock implementation
          console.log('Removing member:', userId);
        },
        
        // Statistics
        loadStatistics: async (workspaceId) => {
          const response = get().workspaceResponse;
          if (response?.stats) {
            set(state => {
              state.statistics = response.stats!;
            });
          }
        },
        
        loadAnalytics: async (workspaceId, startDate, endDate) => {
          // Mock implementation
          return {};
        },
        
        // Billing (Mock implementations)
        loadBilling: async (workspaceId) => {
          set(state => {
            state.billing = {
              plan: 'free',
              status: 'active',
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(),
              cancelAtPeriodEnd: false,
              seats: { included: 1, used: 1, additional: 0 },
              storage: { included: 1000000, used: 0, additional: 0 },
              features: []
            };
          });
        },
        
        updateBillingPlan: async (workspaceId, planId) => {
          console.log('Updating billing plan:', planId);
        },
        
        // Storage
        loadStorage: async (workspaceId) => {
          set(state => {
            state.storage = {
              used: 0,
              limit: 1000000,
              breakdown: {
                projects: 0,
                attachments: 0,
                media: 0,
                backups: 0,
                other: 0
              }
            };
          });
        },
        
        cleanupStorage: async (workspaceId) => {
          console.log('Cleaning up storage');
        },
        
        // Theme
        loadTheme: async (workspaceId) => {
          set(state => {
            state.theme = {
              mode: 'system',
              primaryColor: '#667eea',
              accentColor: '#f56565'
            };
          });
        },
        
        updateTheme: async (workspaceId, theme) => {
          set(state => {
            if (state.theme) {
              Object.assign(state.theme, theme);
            } else {
              state.theme = theme as WorkspaceTheme;
            }
          });
        },
        
        // Utility
        reset: () => {
          set(state => {
            state.currentWorkspace = null;
            state.workspaceResponse = null;
            state.workspaces.clear();
            state.settings = null;
            state.members = [];
            state.statistics = null;
            state.billing = null;
            state.storage = null;
            state.theme = null;
            state.pendingActions = [];
            state.lastSyncResponse = null;
            state.loading = false;
            state.saving = false;
            state.syncing = false;
            state.errors.clear();
          });
        },
        
        getCurrentWorkspaceId: () => {
          return get().currentWorkspace ? String(get().currentWorkspace!.id) : null;
        },
        
        hasPermission: (permission) => {
          // For now, owner has all permissions
          return get().isOwner();
        },
        
        isOwner: () => {
          const workspace = get().currentWorkspace;
          if (!workspace) return false;
          
          const currentUser = localStorage.getItem('userId');
          return String(workspace.ownerId) === currentUser;
        },
        
        getMemberById: (userId) => {
          return get().members.find(m => m.id === userId);
        }
      })),
      {
        name: 'workspace-store',
        partialize: (state) => ({
          currentWorkspace: state.currentWorkspace,
          workspaces: Array.from(state.workspaces.entries()),
          pendingActions: state.pendingActions
        })
      }
    ),
    {
      name: 'workspace-store'
    }
  )
);
