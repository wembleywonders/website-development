/**
 * UI Type Definitions
 * @module features/ui/types
 */

// Local type definitions to avoid depending on ../stores/uiStore

export type Toast = {
  id: string;
  message: string;
  duration?: number;
  severity?: 'info' | 'success' | 'warning' | 'error';
  createdAt?: number;
};

export type NotificationAction = {
  id?: string;
  label: string;
  // action is intentionally kept as unknown to avoid importing functions across modules;
  // the runtime can map an action id to a handler.
  actionId?: string;
};

export type Notification = {
  id: string;
  title?: string;
  message?: string;
  read?: boolean;
  actions?: NotificationAction[];
  createdAt?: number;
};

export type ModalType = 'alert' | 'confirm' | 'form' | 'custom';

export type Modal = {
  id: string;
  type: ModalType;
  open: boolean;
  // modalProps is intentionally generic to allow various modal payloads
  modalProps?: Record<string, unknown>;
};

export type Theme = {
  name: string;
  colors?: Record<string, string>;
  // additional theme metadata
  [key: string]: unknown;
};

export type LayoutPreferences = {
  sidebarCollapsed?: boolean;
  sidebarWidth?: number;
  showHeader?: boolean;
};

export type UIPreferences = {
  theme: Theme | string;
  language?: string;
  fontSize?: number;
  layout?: LayoutPreferences;
};

export type GlobalLoadingState = {
  loading: boolean;
  count: number;
  message?: string;
};

export type CommandPaletteState = {
  open: boolean;
  query: string;
  results?: unknown[];
  selectedIndex?: number;
};
