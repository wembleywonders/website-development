/**
 * UI Store - Global UI state management
 * Features: Modals, toasts, notifications, theme, layout preferences
 * @module features/workspace/stores/uiStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ============================================================================
// UI TYPE DEFINITIONS
// ============================================================================

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // milliseconds, 0 for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'mention' | 'update';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  metadata?: {
    resourceType?: string;
    resourceId?: string;
    actionUrl?: string;
    avatarUrl?: string;
    sender?: string;
  };
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface Modal {
  id: string;
  type: ModalType;
  title?: string;
  data?: any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  closable?: boolean;
  onClose?: () => void;
}

export type ModalType = 
  | 'createProject'
  | 'editProject'
  | 'deleteConfirm'
  | 'shareProject'
  | 'inviteMember'
  | 'conflictResolution'
  | 'workspaceSettings'
  | 'userProfile'
  | 'commandPalette'
  | 'feedback'
  | 'upgrade'
  | 'custom';

export type Theme = 'light' | 'dark' | 'system';

export interface LayoutPreferences {
  sidebarOpen: boolean;
  sidebarWidth: number;
  rightPanelOpen: boolean;
  rightPanelWidth: number;
  compactMode: boolean;
  showActivityBar: boolean;
  showStatusBar: boolean;
  density: 'comfortable' | 'compact' | 'spacious';
}

export interface UIPreferences {
  theme: Theme;
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  highContrast: boolean;
  showAnimations: boolean;
  soundEffects: boolean;
  keyboardShortcuts: boolean;
  tooltips: boolean;
  confirmDialogs: boolean;
}

export interface GlobalLoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  canCancel?: boolean;
  onCancel?: () => void;
}

export interface CommandPaletteState {
  isOpen: boolean;
  searchQuery: string;
  selectedIndex: number;
  recentCommands: string[];
}

// ============================================================================
// UI STORE STATE
// ============================================================================

interface UIState {
  // Notifications
  toasts: Toast[];
  notifications: Notification[];
  unreadNotificationCount: number;
  
  // Modals
  modalStack: Modal[];
  activeModal: Modal | null;
  
  // Theme & Layout
  theme: Theme;
  systemTheme: 'light' | 'dark';
  layoutPreferences: LayoutPreferences;
  uiPreferences: UIPreferences;
  
  // Global States
  globalLoading: GlobalLoadingState | null;
  commandPalette: CommandPaletteState;
  fullscreenMode: boolean;
  focusMode: boolean;
  
  // UI Feedback
  unsavedChangesWarning: boolean;
  connectionStatus: 'online' | 'offline' | 'connecting';
  lastInteraction: Date;
  
  // Actions - Toasts
  showToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: (type?: Notification['type']) => void;
  
  // Actions - Modals
  openModal: (modal: Omit<Modal, 'id'>) => void;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  replaceModal: (modal: Omit<Modal, 'id'>) => void;
  
  // Actions - Theme & Layout
  setTheme: (theme: Theme) => void;
  detectSystemTheme: () => void;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  toggleRightPanel: () => void;
  setRightPanelWidth: (width: number) => void;
  setLayoutPreference: <K extends keyof LayoutPreferences>(
    key: K,
    value: LayoutPreferences[K]
  ) => void;
  setUIPreference: <K extends keyof UIPreferences>(
    key: K,
    value: UIPreferences[K]
  ) => void;
  
  // Actions - Command Palette
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  setCommandPaletteQuery: (query: string) => void;
  selectCommandPaletteItem: (index: number) => void;
  executeCommand: (command: string) => void;
  
  // Actions - Global States
  setGlobalLoading: (state: GlobalLoadingState | null) => void;
  setConnectionStatus: (status: 'online' | 'offline' | 'connecting') => void;
  setUnsavedChangesWarning: (show: boolean) => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFocusMode: () => void;
  
  // Actions - Utility
  reset: () => void;
  resetLayout: () => void;
  exportSettings: () => string;
  importSettings: (settings: string) => void;
  updateLastInteraction: () => void;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const defaultLayoutPreferences: LayoutPreferences = {
  sidebarOpen: true,
  sidebarWidth: 240,
  rightPanelOpen: false,
  rightPanelWidth: 320,
  compactMode: false,
  showActivityBar: true,
  showStatusBar: true,
  density: 'comfortable'
};

const defaultUIPreferences: UIPreferences = {
  theme: 'system',
  accentColor: '#667eea',
  fontSize: 'medium',
  reducedMotion: false,
  highContrast: false,
  showAnimations: true,
  soundEffects: false,
  keyboardShortcuts: true,
  tooltips: true,
  confirmDialogs: true
};

const defaultCommandPaletteState: CommandPaletteState = {
  isOpen: false,
  searchQuery: '',
  selectedIndex: 0,
  recentCommands: []
};

// ============================================================================
// UI STORE IMPLEMENTATION
// ============================================================================

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        toasts: [],
        notifications: [],
        unreadNotificationCount: 0,
        modalStack: [],
        activeModal: null,
        theme: 'system',
        systemTheme: 'light',
        layoutPreferences: defaultLayoutPreferences,
        uiPreferences: defaultUIPreferences,
        globalLoading: null,
        commandPalette: defaultCommandPaletteState,
        fullscreenMode: false,
        focusMode: false,
        unsavedChangesWarning: false,
        connectionStatus: 'online',
        lastInteraction: new Date(),
        
        // Toast Actions
        showToast: (toast) => {
          const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newToast: Toast = {
            ...toast,
            id,
            createdAt: new Date()
          };
          
          set(state => {
            state.toasts.push(newToast);
          });
          
          // Auto-remove after duration (default 5 seconds)
          if (toast.duration !== 0) {
            const duration = toast.duration || 5000;
            setTimeout(() => {
              get().removeToast(id);
            }, duration);
          }
        },
        
        removeToast: (id) => {
          set(state => {
            state.toasts = state.toasts.filter(t => t.id !== id);
          });
        },
        
        clearToasts: () => {
          set(state => {
            state.toasts = [];
          });
        },
        
        // Notification Actions
        addNotification: (notification) => {
          const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newNotification: Notification = {
            ...notification,
            id,
            read: false,
            createdAt: new Date()
          };
          
          set(state => {
            state.notifications.unshift(newNotification);
            state.unreadNotificationCount++;
            
            // Keep only last 100 notifications
            if (state.notifications.length > 100) {
              state.notifications = state.notifications.slice(0, 100);
            }
          });
          
          // Also show as toast for important notifications
          if (notification.type === 'error' || notification.type === 'warning') {
            get().showToast({
              type: notification.type,
              title: notification.title,
              message: notification.message,
              duration: 7000
            });
          }
        },
        
        markNotificationRead: (id) => {
          set(state => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification && !notification.read) {
              notification.read = true;
              state.unreadNotificationCount = Math.max(0, state.unreadNotificationCount - 1);
            }
          });
        },
        
        markAllNotificationsRead: () => {
          set(state => {
            state.notifications.forEach(n => {
              n.read = true;
            });
            state.unreadNotificationCount = 0;
          });
        },
        
        removeNotification: (id) => {
          set(state => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification && !notification.read) {
              state.unreadNotificationCount = Math.max(0, state.unreadNotificationCount - 1);
            }
            state.notifications = state.notifications.filter(n => n.id !== id);
          });
        },
        
        clearNotifications: (type) => {
          set(state => {
            if (type) {
              const toRemove = state.notifications.filter(n => n.type === type);
              const unreadCount = toRemove.filter(n => !n.read).length;
              state.notifications = state.notifications.filter(n => n.type !== type);
              state.unreadNotificationCount = Math.max(0, state.unreadNotificationCount - unreadCount);
            } else {
              state.notifications = [];
              state.unreadNotificationCount = 0;
            }
          });
        },
        
        // Modal Actions
        openModal: (modal) => {
          const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newModal: Modal = {
            ...modal,
            id,
            closable: modal.closable !== false
          };
          
          set(state => {
            state.modalStack.push(newModal);
            state.activeModal = newModal;
          });
        },
        
        closeModal: (id) => {
          set(state => {
            if (id) {
              state.modalStack = state.modalStack.filter(m => m.id !== id);
            } else if (state.activeModal) {
              state.modalStack = state.modalStack.filter(m => m.id !== state.activeModal!.id);
            }
            
            state.activeModal = state.modalStack[state.modalStack.length - 1] || null;
          });
        },
        
        closeAllModals: () => {
          set(state => {
            state.modalStack = [];
            state.activeModal = null;
          });
        },
        
        replaceModal: (modal) => {
          const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newModal: Modal = {
            ...modal,
            id,
            closable: modal.closable !== false
          };
          
          set(state => {
            state.modalStack = [newModal];
            state.activeModal = newModal;
          });
        },
        
        // Theme & Layout Actions
        setTheme: (theme) => {
          set(state => {
            state.theme = theme;
            state.uiPreferences.theme = theme;
          });
          
          // Apply theme to document
          const effectiveTheme = theme === 'system' ? get().systemTheme : theme;
          document.documentElement.setAttribute('data-theme', effectiveTheme);
        },
        
        detectSystemTheme: () => {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set(state => {
            state.systemTheme = isDark ? 'dark' : 'light';
          });
          
          // Apply if using system theme
          if (get().theme === 'system') {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          }
        },
        
        toggleSidebar: () => {
          set(state => {
            state.layoutPreferences.sidebarOpen = !state.layoutPreferences.sidebarOpen;
          });
        },
        
        setSidebarWidth: (width) => {
          set(state => {
            state.layoutPreferences.sidebarWidth = Math.min(480, Math.max(200, width));
          });
        },
        
        toggleRightPanel: () => {
          set(state => {
            state.layoutPreferences.rightPanelOpen = !state.layoutPreferences.rightPanelOpen;
          });
        },
        
        setRightPanelWidth: (width) => {
          set(state => {
            state.layoutPreferences.rightPanelWidth = Math.min(600, Math.max(280, width));
          });
        },
        
        setLayoutPreference: (key, value) => {
          set(state => {
            state.layoutPreferences[key] = value;
          });
        },
        
        setUIPreference: (key, value) => {
          set(state => {
            state.uiPreferences[key] = value;
            
            // Apply certain preferences immediately
            if (key === 'fontSize') {
              document.documentElement.style.setProperty(
                '--base-font-size',
                value === 'small' ? '14px' : value === 'large' ? '18px' : '16px'
              );
            }
            
            if (key === 'reducedMotion') {
              document.documentElement.classList.toggle('reduce-motion', value as boolean);
            }
            
            if (key === 'highContrast') {
              document.documentElement.classList.toggle('high-contrast', value as boolean);
            }
          });
        },
        
        // Command Palette Actions
        openCommandPalette: () => {
          set(state => {
            state.commandPalette.isOpen = true;
            state.commandPalette.searchQuery = '';
            state.commandPalette.selectedIndex = 0;
          });
        },
        
        closeCommandPalette: () => {
          set(state => {
            state.commandPalette.isOpen = false;
            state.commandPalette.searchQuery = '';
            state.commandPalette.selectedIndex = 0;
          });
        },
        
        toggleCommandPalette: () => {
          set(state => {
            state.commandPalette.isOpen = !state.commandPalette.isOpen;
            if (state.commandPalette.isOpen) {
              state.commandPalette.searchQuery = '';
              state.commandPalette.selectedIndex = 0;
            }
          });
        },
        
        setCommandPaletteQuery: (query) => {
          set(state => {
            state.commandPalette.searchQuery = query;
            state.commandPalette.selectedIndex = 0;
          });
        },
        
        selectCommandPaletteItem: (index) => {
          set(state => {
            state.commandPalette.selectedIndex = index;
          });
        },
        
        executeCommand: (command) => {
          set(state => {
            // Add to recent commands
            state.commandPalette.recentCommands = [
              command,
              ...state.commandPalette.recentCommands.filter(c => c !== command)
            ].slice(0, 10);
            
            // Close palette
            state.commandPalette.isOpen = false;
          });
          
          // Execute command logic would go here
          console.log('Executing command:', command);
        },
        
        // Global State Actions
        setGlobalLoading: (state) => {
          set(draft => {
            draft.globalLoading = state;
          });
        },
        
        setConnectionStatus: (status) => {
          set(state => {
            state.connectionStatus = status;
            
            // Show toast for connection changes
            if (status === 'offline') {
              get().showToast({
                type: 'warning',
                message: 'You are offline. Changes will sync when connection returns.',
                duration: 0 // Persistent
              });
            } else if (status === 'online' && state.connectionStatus === 'offline') {
              get().showToast({
                type: 'success',
                message: 'Back online. Syncing changes...',
                duration: 3000
              });
            }
          });
        },
        
        setUnsavedChangesWarning: (show) => {
          set(state => {
            state.unsavedChangesWarning = show;
          });
        },
        
        enterFullscreen: () => {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
            set(state => {
              state.fullscreenMode = true;
            });
          }
        },
        
        exitFullscreen: () => {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            set(state => {
              state.fullscreenMode = false;
            });
          }
        },
        
        toggleFocusMode: () => {
          set(state => {
            state.focusMode = !state.focusMode;
            
            // In focus mode, hide distracting elements
            if (!state.focusMode) {
              state.layoutPreferences.showActivityBar = false;
              state.layoutPreferences.showStatusBar = false;
              state.layoutPreferences.rightPanelOpen = false;
            } else {
              state.layoutPreferences.showActivityBar = true;
              state.layoutPreferences.showStatusBar = true;
            }
          });
        },
        
        // Utility Actions
        reset: () => {
          set(state => {
            state.toasts = [];
            state.notifications = [];
            state.unreadNotificationCount = 0;
            state.modalStack = [];
            state.activeModal = null;
            state.globalLoading = null;
            state.commandPalette = defaultCommandPaletteState;
            state.fullscreenMode = false;
            state.focusMode = false;
            state.unsavedChangesWarning = false;
            state.connectionStatus = 'online';
          });
        },
        
        resetLayout: () => {
          set(state => {
            state.layoutPreferences = defaultLayoutPreferences;
            state.uiPreferences = defaultUIPreferences;
          });
        },
        
        exportSettings: () => {
          const state = get();
          const settings = {
            layoutPreferences: state.layoutPreferences,
            uiPreferences: state.uiPreferences,
            theme: state.theme,
            recentCommands: state.commandPalette.recentCommands
          };
          return JSON.stringify(settings, null, 2);
        },
        
        importSettings: (settingsJson) => {
          try {
            const settings = JSON.parse(settingsJson);
            set(state => {
              if (settings.layoutPreferences) {
                state.layoutPreferences = settings.layoutPreferences;
              }
              if (settings.uiPreferences) {
                state.uiPreferences = settings.uiPreferences;
              }
              if (settings.theme) {
                state.theme = settings.theme;
              }
              if (settings.recentCommands) {
                state.commandPalette.recentCommands = settings.recentCommands;
              }
            });
            
            // Apply theme
            get().setTheme(settings.theme || 'system');
            
            get().showToast({
              type: 'success',
              message: 'Settings imported successfully'
            });
          } catch (error) {
            get().showToast({
              type: 'error',
              message: 'Failed to import settings. Invalid format.'
            });
          }
        },
        
        updateLastInteraction: () => {
          set(state => {
            state.lastInteraction = new Date();
          });
        }
      })),
      {
        name: 'ui-store',
        partialize: (state) => ({
          theme: state.theme,
          layoutPreferences: state.layoutPreferences,
          uiPreferences: state.uiPreferences,
          commandPalette: {
            recentCommands: state.commandPalette.recentCommands
          }
        })
      }
    ),
    {
      name: 'ui-store'
    }
  )
);

// ============================================================================
// INITIALIZATION & EVENT LISTENERS
// ============================================================================

if (typeof window !== 'undefined') {
  // Detect system theme
  const { detectSystemTheme, setTheme, setConnectionStatus } = useUIStore.getState();
  detectSystemTheme();
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    detectSystemTheme();
    if (useUIStore.getState().theme === 'system') {
      const systemTheme = useUIStore.getState().systemTheme;
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  });
  
  // Apply initial theme
  const theme = useUIStore.getState().theme;
  const systemTheme = useUIStore.getState().systemTheme;
  const effectiveTheme = theme === 'system' ? systemTheme : theme;
  document.documentElement.setAttribute('data-theme', effectiveTheme);
  
  // Listen for connection status
  window.addEventListener('online', () => setConnectionStatus('online'));
  window.addEventListener('offline', () => setConnectionStatus('offline'));
  
  // Keyboard shortcuts for command palette
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      useUIStore.getState().toggleCommandPalette();
    }
  });
  
  // Warn about unsaved changes
  window.addEventListener('beforeunload', (e) => {
    if (useUIStore.getState().unsavedChangesWarning) {
      e.preventDefault();
      e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  });
  
  // Track user interaction for session timeout
  const updateInteraction = useUIStore.getState().updateLastInteraction;
  document.addEventListener('mousedown', updateInteraction);
  document.addEventListener('keydown', updateInteraction);
  document.addEventListener('scroll', updateInteraction);
}
