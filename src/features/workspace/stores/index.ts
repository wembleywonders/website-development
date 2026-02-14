/**
 * State Management Export Hub
 * Central export point for all Zustand stores
 * @module features/workspace/stores
 */

// Import all stores
// Note: removed the ambient `declare module './authStore'` block so TypeScript will use the real
// ./authStore.ts file; if that file intentionally contains only global/type-only declarations,
// add concrete exports there or convert it to a module (export something) to satisfy imports.

import { useProjectStore } from './projectStore';
import { useWorkspaceStore } from './workspaceStore';
import { useQuickActionStore } from './quickActionStore';
import { useSyncStore } from './syncStore';
// authStore.ts may be a type-only/ambient file; require at runtime and provide a clear error fallback.
let useAuthStore: any;
try {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const _authModule = require('./authStore');
  useAuthStore = _authModule?.useAuthStore ?? _authModule?.default ?? _authModule;
} catch (e) {
  // If authStore is only a type module at runtime, leave undefined and rely on other code paths.
  useAuthStore = undefined;
}

// uiStore.ts may be a type-only/ambient file; require at runtime and provide a clear error fallback.

// Core Stores - Re-exports are consolidated later in this file to avoid duplicate identifiers.

// Store Types (if you want to export the state types)
// Uncomment these if you have defined these types in your store files
// export type { ProjectState } from './projectStore';
// export type { WorkspaceState } from './workspaceStore';
// export type { QuickActionState } from './quickActionStore';
// export type { SyncState } from './syncStore';
// export type { AuthState } from './authStore';
// export type { UIState } from './uiStore';

/**
 * Root store hook for resetting all stores
 * Use this when user logs out or switches workspaces
 *
 * Implementation is defined once (exported) further down in this file.
 */

/**
 * Combined store selectors for common use cases
 */

/**
 * Current project with actions
 */
export const useCurrentProject = () => {
  const currentProject: Project | null = useProjectStore(state => state.currentProject);
  const updateProject = useProjectStore(state => state.updateCurrentProject) as (project: Partial<Project>) => void;
  const saveProject: (workspaceId: string) => Promise<void> | void = useProjectStore(state => state.saveCurrentProject);
  
  return {
    project: currentProject,
    updateProject,
    saveProject
  };
};

/**
 * Current workspace with related data
 * (Consolidated implementation exists later in this file to avoid duplicate declarations)
 */

/**
 * Authentication state and actions
 *
 * (Duplicate lightweight/untyped useAuth removed here; the typed `useAuth` hook is defined later in the file.)
 */

/**
 * Sync status for offline indicator
 *
 * NOTE: duplicate implementation removed here; the typed implementation appears later in this file.
 */

/**
 * Notifications management
 * (duplicate untyped implementation removed; use the typed `useNotifications` defined later in this file)
 */

/* Duplicate untyped `useToasts` removed — use the typed `useToasts` implementation defined later in this file. */

/* Duplicate useModals removed here; consolidated implementation exists later in this file. */

/**
 * Theme management (consolidated later)
 * Canonical implementation of `useTheme` is defined further down in this file to avoid duplicate exports.
 */

/**
 * Projects with loading state (duplicate removed; canonical, typed implementation appears later in this file)
 */

// Quick actions hook is implemented later in this file; remove duplicate placeholder.
/**
 * State Management Export Hub
 * Central export point for all Zustand stores
 * @module features/workspace/stores
 */

// Import all stores

/**
 * Lightweight interfaces for commonly used shapes.
 * Keep these minimal and permissive to avoid coupling to store internals.
 */

export interface Project {
    id: string | number;
    [key: string]: any;
}

export interface Workspace {
    id: string;
    [key: string]: any;
}

export interface QuickAction {
    id: string | number;
    title?: string;
    [key: string]: any;
}

export interface QuickActionSuggestion {
    id: string;
    content: string;
    [key: string]: any;
}

/**
 * MayaPersonality describes preset AI personality modes used by the QuickAction/Maya features.
 * Extend with specific modes used by your app; keep it permissive by allowing any string.
 */
export type MayaPersonality = 'friendly' | 'professional' | 'creative' | string;

export interface User {
    id: string;
    email?: string;
    [key: string]: any;
}

export interface ToastItem {
    id: string;
    type?: string;
    message: string;
    duration?: number;
    [key: string]: any;
}

/**
 * SyncConflict represents a conflict detected during sync operations.
 * Declared here so it can be referenced by hooks and subscriptions above.
 */
export interface SyncConflict {
    id: string;
    resourceId?: string;
    type?: string;
    details?: Record<string, any>;
}

export interface UINotificationAction {
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | string;
}

export interface UINotificationPayload {
    type: 'info' | 'success' | 'warning' | 'error' | string;
    title?: string;
    message: string;
    duration?: number;
    actions?: UINotificationAction[];
}

export interface AuthStoreState {
    validateSession: () => Promise<boolean>;
    loadUser: () => Promise<void>;
    user?: User | null;
    [key: string]: any;
}

export interface WorkspaceStoreState {
    loadCurrentWorkspace: () => Promise<Workspace | null>;
    currentWorkspace?: Workspace | null;
    [key: string]: any;
}

export interface ProjectStoreState {
    loadProjects: (workspaceId: string) => Promise<void>;
    projects?: Map<string, Project>;
    [key: string]: any;
}

/**
 * Core Stores - Re-export for easy importing
 * (consolidated later in this file to avoid duplicate identifiers)
 */
/**
 * Core Stores - Re-export for easy importing
 */
export { useProjectStore } from './projectStore';
export { useWorkspaceStore } from './workspaceStore';
export { useQuickActionStore } from './quickActionStore';
export { useSyncStore } from './syncStore';
// Auth store may be a type-only or runtime-only module; expose a getter to avoid creating a circular
// import/export alias with the runtime-resolved variable created above.
export const getAuthStore = (): any => useAuthStore;

export let useUIStore: any;
try {
  /* eslint-disable @typescript-eslint/no-var-requires */
  // @ts-ignore - allow optional runtime require for modules that may be type-only
  const _uiModule = require('./uiStore');
  useUIStore = _uiModule?.useUIStore ?? _uiModule?.default ?? _uiModule;
} catch (e) {
  // If uiStore is a type-only/ambient module it won't exist at runtime; keep undefined
  useUIStore = undefined;
}

// Store Types (if you want to export the state types)
// Uncomment these if you have defined these types in your store files
// export type { ProjectState } from './projectStore';
// export type { WorkspaceState } from './workspaceStore';
// export type { QuickActionState } from './quickActionStore';
// export type { SyncState } from './syncStore';
// export type { AuthState } from './authStore';
// export type { UIState } from './uiStore';

/**
 * Root store hook for resetting all stores
 * Use this when user logs out or switches workspaces
 */
export const useResetAllStores = (): (() => void) => {
  const resetProject: (() => void) | undefined = useProjectStore ? useProjectStore(state => state.reset) : undefined;
  const resetWorkspace: (() => void) | undefined = useWorkspaceStore ? useWorkspaceStore(state => state.reset) : undefined;
  const resetQuickAction: (() => void) | undefined = useQuickActionStore ? useQuickActionStore(state => state.reset) : undefined;
  const resetSync: (() => void) | undefined = useSyncStore ? useSyncStore(state => state.reset) : undefined;
  const resetAuth: (() => void) | undefined = useAuthStore ? useAuthStore((state: AuthStoreState) => state.reset) : undefined;
  const resetUI: (() => void) | undefined = useUIStore ? useUIStore((state: any) => state.reset) : undefined;

  // Always return a function (matches declared return type)
  return () => {
    try {
      if (resetProject) resetProject();
      if (resetWorkspace) resetWorkspace();
      if (resetQuickAction) resetQuickAction();
      if (resetSync) resetSync();
      if (resetAuth) resetAuth();
      if (resetUI) resetUI();
    } catch (err) {
      // Keep reset resilient to individual store errors
      // eslint-disable-next-line no-console
      console.warn('Error while resetting stores', err);
    }
  };
};

 /**
 * Current workspace with related data
export const useCurrentWorkspace = () => {
    const workspace: Workspace | null = useWorkspaceStore(state => state.currentWorkspace);
    const settings: Record<string, any> = useWorkspaceStore(state => state.settings);
    const members: any[] = useWorkspaceStore(state => state.members);
    const isOwner: boolean = useWorkspaceStore(state => state.isOwner);
    
    return {
        workspace,
        settings,
        members,
        isOwner
    };
};
};

/**
 * Authentication state and actions
 */
export const useAuth = () => {
    const user: User | null = useAuthStore((state: { user: any; }) => state.user);
    const isAuthenticated: boolean = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
    const login: (...args: any[]) => Promise<any> | void = useAuthStore((state: { login: any; }) => state.login);
    const logout: (...args: any[]) => Promise<any> | void = useAuthStore((state: { logout: any; }) => state.logout);
    const register: (...args: any[]) => Promise<any> | void = useAuthStore((state: { register: any; }) => state.register);
    
    return {
        user,
        isAuthenticated,
        login,
        logout,
        register
    };
};

/**
 * Sync status for offline indicator
 */
export const useSyncStatus = () => {
    const isOnline: boolean = useSyncStore(state => state.isOnline);
    const isSyncing: boolean = useSyncStore(state => state.isSyncing);
    const pendingOperations: number = useSyncStore(state => state.pendingOperations);
    const conflicts: SyncConflict[] = useSyncStore(state => state.conflicts);
    const syncNow: () => Promise<void> | void = useSyncStore(state => state.syncNow);
    
    return {
        isOnline,
        isSyncing,
        pendingOperations,
        hasConflicts: conflicts.length > 0,
        syncNow
    };
};

/**
 * Notifications management
 */
export const useNotifications = () => {
    const notifications: UINotificationPayload[] = useUIStore((state: { notifications: any; }) => state.notifications);
    const unreadCount: number = useUIStore((state: { unreadNotificationCount: any; }) => state.unreadNotificationCount);
    const addNotification: (payload: UINotificationPayload) => void = useUIStore((state: { addNotification: any; }) => state.addNotification);
    const removeNotification: (id: string) => void = useUIStore((state: { removeNotification: any; }) => state.removeNotification);
    const markAllRead: () => void = useUIStore((state: { markAllNotificationsRead: any; }) => state.markAllNotificationsRead);
    const clearNotifications: () => void = useUIStore((state: { clearNotifications: any; }) => state.clearNotifications);
    
    return {
        notifications,
        unreadCount,
        addNotification,
        removeNotification,
        markAllRead,
        clearNotifications
    };
};

/**
 * Toast notifications
 */
export const useToasts = () => {
    const toasts: ToastItem[] = useUIStore((state: { toasts: any; }) => state.toasts);
    const showToast: (t: Partial<ToastItem>) => void = useUIStore((state: { showToast: any; }) => state.showToast);
    const removeToast: (id: string) => void = useUIStore((state: { removeToast: any; }) => state.removeToast);
    const clearToasts: () => void = useUIStore((state: { clearToasts: any; }) => state.clearToasts);
    
    return {
        toasts,
        showToast,
        removeToast,
        clearToasts
    };
};

/**
 * Modal management
 */
export const useModals = () => {
    const activeModal: string | null = useUIStore((state: { activeModal: any; }) => state.activeModal);
    const openModal: (name: string, payload?: any) => void = useUIStore((state: { openModal: any; }) => state.openModal);
    const closeModal: (name?: string) => void = useUIStore((state: { closeModal: any; }) => state.closeModal);
    const closeAllModals: () => void = useUIStore((state: { closeAllModals: any; }) => state.closeAllModals);
    
    return {
        activeModal,
        openModal,
        closeModal,
        closeAllModals
    };
};

/**
 * Theme management
 */
export const useTheme = () => {
    const theme: string = useUIStore((state: { theme: any; }) => state.theme);
    const setTheme: (theme: string) => void = useUIStore((state: { setTheme: any; }) => state.setTheme);
    
    return {
        theme,
        setTheme
    };
};

/**
 * Projects with loading state
 */
export const useProjects = (workspaceId?: string) => {
    const projects: Map<string, Project> = useProjectStore(state => state.projects);
    const loading: boolean = useProjectStore(state => state.loading);
    const errors: any = useProjectStore(state => state.errors);
    const loadProjects: (workspaceId: string, options?: any) => Promise<void> = useProjectStore(state => state.loadProjects);
    const searchProjects: (wsId: string, query: string) => Promise<void> = useProjectStore(state => state.searchProjects);
    
    return {
        projects: Array.from(projects.values()),
        loading,
        errors,
        loadProjects: (wsId?: string) => loadProjects(wsId || workspaceId || ''),
        searchProjects: (wsId: string, query: string) => searchProjects(wsId || workspaceId || '', query)
    };
};

/**
 * Quick actions with Maya AI
export const useQuickActions = (projectId: string) => {
    const actions: QuickAction[] = useQuickActionStore(state => state.getActionsForProject(projectId));
    const suggestions: QuickAction[] = useQuickActionStore(state => state.suggestions);
    const loadQuickActions: (workspaceId: string, projectId: string, context?: any) => Promise<void> = useQuickActionStore(state => state.loadQuickActions);
    const completeAction: (workspaceId: string, projectId: string, actionId: string, data?: any) => Promise<void> = useQuickActionStore(state => state.completeAction);
    const dismissAction: (...args: any[]) => Promise<void> | void = useQuickActionStore(state => state.dismissAction);
    const mayaPersonality: MayaPersonality = useQuickActionStore(state => state.mayaPersonality);
    const setMayaPersonality = useQuickActionStore(state => state.setMayaPersonality);
    
    return {
        actions,
        suggestions,
        loadQuickActions,
        completeAction,
        dismissAction,
        mayaPersonality,
        setMayaPersonality
    };
};
};

/**
 * Initialize all stores on app start
 * (Consolidated implementation exists later in this file; use that single exported `initializeStores`.)
 */

/**
 * Global store subscriptions for side effects
 * Call this once in your app initialization
 */
// Duplicate setupStoreSubscriptions removed here; see the consolidated `export const setupStoreSubscriptions = () => { ... }` implementation later in this file.

/**
 * Development helper - log all store states
 *
 * Consolidated implementation exists later in this file; this earlier duplicate was removed
 * to avoid redeclaration of `logStoreStates`.
 */

// Duplicate exports removed here; consolidated `stores` and `StoreStates` are defined later in this file.
  const rawSuggestions = useQuickActionStore(state => state.suggestions) as QuickAction[];
  const suggestions: QuickActionSuggestion[] = rawSuggestions.map(s => {
    const { id, content, title, ...rest } = s as any;
    const finalContent: string = content ?? title ?? '';
    return {
      ...rest,
      id: String(id),
      content: finalContent
    } as QuickActionSuggestion;
  });
  const loadQuickActions = useQuickActionStore(state => state.loadQuickActions);
  const completeAction = useQuickActionStore(state => state.completeAction);
  const dismissAction = useQuickActionStore(state => state.dismissAction);
  const mayaPersonality = useQuickActionStore(state => state.mayaPersonality);
  const setMayaPersonality = useQuickActionStore(state => state.setMayaPersonality);
  
  return {
    actions,
    suggestions,
    loadQuickActions,
    completeAction,
    dismissAction,
    mayaPersonality,
    setMayaPersonality
  };
};

/**
 * Initialize all stores on app start
 */
export const initializeStores = async () => {
  const authStore = useAuthStore.getState();
  const workspaceStore = useWorkspaceStore.getState();
  const projectStore = useProjectStore.getState();
  const syncStore = useSyncStore.getState();
  
  try {
    // Validate session
    const isValid = await authStore.validateSession();
    
    if (isValid) {
      // Load user data
      await authStore.loadUser();
      
      // Load current workspace
      const workspace = await workspaceStore.loadCurrentWorkspace();
      
      if (workspace) {
        // Load projects for workspace
        await projectStore.loadProjects(workspace.id);
        
        // Subscribe to sync events
        syncStore.subscribeToSyncEvents();
        
        // Start auto-sync if enabled
        if (syncStore.autoSyncEnabled) {
          await syncStore.syncNow();
        }
      }
      
      return true;
    } else {
      // Clear all stores and redirect to login
      const resetAll = useResetAllStores();
      resetAll();
      
      // Redirect to login
      window.location.href = '/login';
      return false;
    }
  } catch (error) {
    console.error('Failed to initialize stores:', error);
    return false;
  }
};

/**
 * Global store subscriptions for side effects
 * Call this once in your app initialization
 */
export const setupStoreSubscriptions = () => {
  // Subscribe to auth changes
interface AuthSubscribeState {
    isAuthenticated: boolean;
}

const unsubAuth: () => void = useAuthStore.subscribe(
    (state: AuthSubscribeState) => state.isAuthenticated,
    (isAuthenticated: boolean) => {
        if (!isAuthenticated) {
            // Clear all stores on logout
            const resetAll = useResetAllStores();
            resetAll();
            
            // Redirect to login
            window.location.href = '/login';
        }
    }
);
  
  // Subscribe to workspace changes
interface WorkspaceRef {
    id: string;
    [key: string]: any;
}

const unsubWorkspace: () => void = (() => {
    let lastWorkspace: WorkspaceRef | null = null;
    const unsub = useWorkspaceStore.subscribe((state: { currentWorkspace: WorkspaceRef | null }) => {
        const workspace = state.currentWorkspace;
        // Only react when the workspace reference or id changes
        if (workspace && (!lastWorkspace || String(lastWorkspace.id) !== String(workspace.id))) {
            lastWorkspace = workspace;
            // Load projects for new workspace
            useProjectStore.getState().loadProjects(workspace.id);
            
            // Load quick actions
            useQuickActionStore.getState().loadQuickActions(workspace.id, 'workspace');
        } else if (workspace === null) {
            lastWorkspace = null;
        }
    });
    return unsub;
})();
  
  // Subscribe to sync conflicts
interface SyncConflict {
    id: string;
    resourceId?: string;
    type?: string;
    details?: Record<string, any>;
}

interface NotificationAction {
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | string;
}

interface NotificationPayload {
    type: 'info' | 'success' | 'warning' | 'error' | string;
    title?: string;
    message: string;
    duration?: number;
    actions?: NotificationAction[];
}

const unsubSync: () => void = useSyncStore.subscribe(
    (state: { conflicts: SyncConflict[] }) => state.conflicts,
    (conflicts: SyncConflict[]) => {
        if (conflicts.length > 0) {
            // Show conflict notification
            const notification: NotificationPayload = {
                type: 'warning',
                title: 'Sync Conflicts Detected',
                message: `${conflicts.length} conflict(s) need resolution`,
                duration: 0, // Persistent until resolved
                actions: [
                    {
                        label: 'Resolve',
                        action: () => {
                            useUIStore.getState().openModal('conflictResolution');
                        },
                        style: 'primary'
                    },
                    {
                        label: 'Ignore',
                        action: () => {
                            // Just close notification
                        },
                        style: 'secondary'
                    }
                ]
            };

            useUIStore.getState().addNotification(notification);
        }
    }
);
  
  // Subscribe to online/offline status
  const handleOnline = () => {
    useSyncStore.getState().refreshSyncStatus();
    useUIStore.getState().showToast({
      type: 'success',
      message: 'Back online - syncing changes...'
    });
  };
  
  const handleOffline = () => {
    useSyncStore.getState().refreshSyncStatus();
    useUIStore.getState().showToast({
      type: 'warning',
      message: 'Working offline - changes will sync when connection returns',
      duration: 5000
    });
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Return cleanup function
  return () => {
    unsubAuth();
    unsubWorkspace();
    unsubSync();
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

/**
 * Development helper - log all store states
 */
export const logStoreStates = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🗂️ Store States');
    console.log('Auth:', useAuthStore.getState());
    console.log('Workspace:', useWorkspaceStore.getState());
    console.log('Projects:', useProjectStore.getState());
    console.log('Quick Actions:', useQuickActionStore.getState());
    console.log('Sync:', useSyncStore.getState());
    console.log('UI:', useUIStore.getState());
    console.groupEnd();
  }
};

/**
 * Export store instances for direct access (use sparingly)
 * Prefer hooks in components
 */
export const stores = {
  auth: useAuthStore,
  workspace: useWorkspaceStore,
  project: useProjectStore,
  quickAction: useQuickActionStore,
  sync: useSyncStore,
  ui: useUIStore
};

/**
 * Type definitions for store states (if needed)
 */
export interface StoreStates {
  auth: ReturnType<typeof useAuthStore.getState>;
  workspace: ReturnType<typeof useWorkspaceStore.getState>;
  project: ReturnType<typeof useProjectStore.getState>;
  quickAction: ReturnType<typeof useQuickActionStore.getState>;
  sync: ReturnType<typeof useSyncStore.getState>;
  ui: ReturnType<typeof useUIStore.getState>;
}