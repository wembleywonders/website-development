/**
 * Quick Action Store - State management for context-aware quick actions
 * Features: Action generation, completion tracking, Maya AI suggestions
 * @module features/workspace/stores/quickActionStore
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/* Module types for the quickActionService have been moved to:
   src/features/workspace/services/quickActionService.d.ts
   This avoids declaring the module inside a regular source file which can
   conflict when the implementation file is not a module (no exports). */

import * as quickActionService from '../services/quickActionService';
import type {
  QuickAction,
  QuickActionType,
  QuickActionContext,
  JourneyStep
} from '../types';

type QuickActionMetrics = any;

type QuickActionPreferences = Record<string, any>;

type MayaPersonality = 'mentor' | 'companion' | 'expert';

type QuickActionCompletion = {
  actionId: string;
  completedAt?: string | Date;
  // preserve any additional fields returned by the service
  [key: string]: any;
};
/**
 * Quick action store state interface
 */
interface QuickActionState {
  // Data
  actions: Map<string, QuickAction[]>;
  templates: QuickActionType[];
  completions: QuickActionCompletion[];
  metrics: QuickActionMetrics | null;
  preferences: QuickActionPreferences | null;
  suggestions: QuickAction[];
  
  // Current context
  currentContext: QuickActionContext | null;
  currentProjectId: string | null;
  mayaPersonality: MayaPersonality;
  
  // UI State
  loading: boolean;
  generating: boolean;
  completing: Map<string, boolean>;
  errors: Map<string, Error>;
  
  // Actions - Load & Generate
  // Actions - Load & Generate
  loadQuickActions: (workspaceId: string, projectId: string, context?: QuickActionContext) => Promise<void>;
  generateActions: (workspaceId: string, projectId: string, options: any) => Promise<void>;
  getMayaSuggestions: (workspaceId: string, projectId: string, personality?: MayaPersonality) => Promise<void>;
  // Actions - Complete & Track
  completeAction: (workspaceId: string, projectId: string, actionId: string, data?: any) => Promise<void>;
  dismissAction: (workspaceId: string, projectId: string, actionId: string, reason?: string) => Promise<void>;
  deferAction: (workspaceId: string, projectId: string, actionId: string, until: Date) => Promise<void>;
  
  // Actions - Templates
  // Actions - Templates
  loadTemplates: (workspaceId: string, category?: string) => Promise<void>;
  createFromTemplate: (workspaceId: string, projectId: string, templateId: string) => Promise<QuickAction>;
  createCustomAction: (workspaceId: string, projectId: string, action: Partial<QuickAction>) => Promise<QuickAction>;
  // Actions - Journey
  getJourneyActions: (workspaceId: string, projectId: string, step: JourneyStep) => Promise<void>;
  getNextBestAction: (workspaceId: string, projectId: string) => Promise<QuickAction | null>;
  
  // Actions - Metrics & Preferences
  loadMetrics: (workspaceId: string, projectId?: string) => Promise<void>;
  loadPreferences: (workspaceId: string) => Promise<void>;
  updatePreferences: (workspaceId: string, prefs: Partial<QuickActionPreferences>) => Promise<void>;
  
  // Actions - Batch
  batchComplete: (workspaceId: string, projectId: string, actionIds: string[]) => Promise<void>;
  batchDismiss: (workspaceId: string, projectId: string, actionIds: string[], reason?: string) => Promise<void>;
  
  // Context & Settings
  setContext: (context: QuickActionContext) => void;
  setMayaPersonality: (personality: MayaPersonality) => void;
  setCurrentProject: (projectId: string | null) => void;
  
  // Utility
  reset: () => void;
  getActionsForProject: (projectId: string) => QuickAction[];
  getActionById: (projectId: string, actionId: string) => QuickAction | undefined;
  hasCompletedAction: (actionId: string) => boolean;
  getCompletionRate: () => number;
}

/**
 * Quick action store implementation
 */
export const useQuickActionStore = create<QuickActionState>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      actions: new Map(),
      suggestions: [],
      templates: [],
      completions: [],
      metrics: null,
      preferences: null,
      
      currentContext: null,
      currentProjectId: null,
      mayaPersonality: 'mentor',
      
      loading: false,
      generating: false,
      completing: new Map(),
      errors: new Map(),
      
      // Load & Generate Actions
      loadQuickActions: async (workspaceId, projectId, context) => {
        try {
          set(state => {
            state.loading = true;
            state.errors.delete('load');
            if (context) state.currentContext = context;
          });
          
          const actions = await quickActionService.getQuickActions(
            workspaceId,
            projectId,
            context || get().currentContext || undefined
          );
          
          set(state => {
            state.actions.set(projectId, actions);
            state.currentProjectId = projectId;
            state.loading = false;
          });
        } catch (error) {
          set(state => {
            state.loading = false;
            state.errors.set('load', error as Error);
          });
          throw error;
        }
      },
      
      generateActions: async (workspaceId, projectId, options) => {
        try {
          set(state => {
            state.generating = true;
            state.errors.delete('generate');
          });
          
          const generated = await quickActionService.generateQuickActions(
            workspaceId,
            projectId,
            options
          );
          
          set(state => {
            // Merge with existing actions
            const existing = state.actions.get(projectId) || [];
            state.actions.set(projectId, [...existing, ...generated]);
            state.generating = false;
          });
        } catch (error) {
          set(state => {
            state.generating = false;
            state.errors.set('generate', error as Error);
          });
          throw error;
        }
      },
      
      getMayaSuggestions: async (workspaceId, projectId, personality) => {
        try {
          set(state => {
            state.loading = true;
            if (personality) state.mayaPersonality = personality;
          });
          
          const suggestions = await quickActionService.getMayaSuggestions(
            workspaceId,
            projectId,
            personality || get().mayaPersonality,
            get().currentContext || undefined
          );
          
          set(state => {
            state.suggestions = suggestions;
            state.loading = false;
          });
        } catch (error) {
          set(state => {
            state.loading = false;
          });
          throw error;
        }
      },
      
      // Complete & Track Actions
      completeAction: async (workspaceId, projectId, actionId, data) => {
        try {
          set(state => {
            state.completing.set(actionId, true);
          });
          
          const completion = await quickActionService.completeAction(
            workspaceId,
            projectId,
            actionId,
            data
          );
          
          set(state => {
            // Remove completed action
            const actions = state.actions.get(projectId);
            if (actions) {
              const filtered = actions.filter(a => String(a.id) !== String(actionId));
              state.actions.set(projectId, filtered);
            }
            
            // Add to completions
            state.completions.unshift(completion);
            if (state.completions.length > 100) {
              state.completions.pop();
            }
            
            state.completing.delete(actionId);
          });
        } catch (error) {
          set(state => {
            state.completing.delete(actionId);
          });
          throw error;
        }
      },
      
      dismissAction: async (workspaceId, projectId, actionId, reason) => {
        try {
          // Optimistic remove
          set(state => {
            const actions = state.actions.get(projectId);
            if (actions) {
              const filtered = actions.filter(a => String(a.id) !== String(actionId));
              state.actions.set(projectId, filtered);
            }
          });
          
          await quickActionService.dismissAction(workspaceId, projectId, actionId, reason);
        } catch (error) {
          // Reload actions on error
          await get().loadQuickActions(workspaceId, projectId);
          throw error;
        }
      },
      
      deferAction: async (workspaceId, projectId, actionId, until) => {
        try {
          set(state => {
            state.completing.set(actionId, true);
          });
          
          const deferred = await quickActionService.deferAction(
            workspaceId,
            projectId,
            actionId,
            until
          );
          
          set(state => {
            // Update action in list
            const actions = state.actions.get(projectId);
            if (actions) {
              const index = actions.findIndex(a => String(a.id) === String(actionId));
              if (index !== -1) {
                actions[index] = deferred;
              }
            }
            state.completing.delete(actionId);
          });
        } catch (error) {
          set(state => {
            state.completing.delete(actionId);
          });
          throw error;
        }
      },
      
      // Templates
      loadTemplates: async (workspaceId, category) => {
        try {
          const templates = await quickActionService.getActionTemplates(workspaceId, category);
          
          set(state => {
            state.templates = templates;
          });
        } catch (error) {
          throw error;
        }
      },
      
      createFromTemplate: async (workspaceId, projectId, templateId) => {
        try {
          const action = await quickActionService.createFromTemplate(
            workspaceId,
            projectId,
            templateId
          );
          
          set(state => {
            const actions = state.actions.get(projectId) || [];
            actions.push(action);
            state.actions.set(projectId, actions);
          });
          
          return action;
        } catch (error) {
          throw error;
        }
      },
      
      createCustomAction: async (workspaceId, projectId, action) => {
        try {
          const created = await quickActionService.createCustomAction(
            workspaceId,
            projectId,
            action
          );
          
          set(state => {
            const actions = state.actions.get(projectId) || [];
            actions.push(created);
            state.actions.set(projectId, actions);
          });
          
          return created;
        } catch (error) {
          throw error;
        }
      },
      
      // Journey
      getJourneyActions: async (workspaceId, projectId, step) => {
        try {
          set(state => {
            state.loading = true;
          });
          
          const actions = await quickActionService.getJourneyActions(
            workspaceId,
            projectId,
            step
          );
          
          set(state => {
            // Support step being either a string or an object with an `id` property
            const stepId = typeof (step as any) === 'object' && (step as any)?.id ? (step as any).id : String(step);
            state.actions.set(`${projectId}-${stepId}`, actions);
            state.loading = false;
          });
        } catch (error) {
          set(state => {
            state.loading = false;
          });
          throw error;
        }
      },
      
      getNextBestAction: async (workspaceId, projectId) => {
        try {
          const action = await quickActionService.getNextBestAction(
            workspaceId,
            projectId,
            get().currentContext || undefined
          );
          
          if (action) {
            set(state => {
              const actions = state.actions.get(projectId) || [];
              // Move to front if exists, add if not
              const filtered = actions.filter(a => String(a.id) !== String(action.id));
              state.actions.set(projectId, [action, ...filtered]);
            });
          }
          
          return action;
        } catch (error) {
          throw error;
        }
      },
      
      // Metrics & Preferences
      loadMetrics: async (workspaceId, projectId) => {
        try {
          const metrics = await quickActionService.getActionMetrics(
            workspaceId,
            projectId
          );
          
          set(state => {
            state.metrics = metrics;
          });
        } catch (error) {
          throw error;
        }
      },
      
      loadPreferences: async (workspaceId) => {
        try {
          const preferences = await quickActionService.getActionPreferences(workspaceId);
          
          set(state => {
            state.preferences = preferences;
          });
        } catch (error) {
          throw error;
        }
      },
      
      updatePreferences: async (workspaceId, prefs) => {
        const original = get().preferences;
        
        try {
          // Optimistic update
          set(state => {
            if (state.preferences) {
              Object.assign(state.preferences, prefs);
            }
          });
          
          const updated = await quickActionService.updateActionPreferences(workspaceId, prefs);
          
          set(state => {
            state.preferences = updated;
          });
        } catch (error) {
          set(state => {
            state.preferences = original;
          });
          throw error;
        }
      },
      
      // Batch Operations
      batchComplete: async (workspaceId, projectId, actionIds) => {
        try {
          set(state => {
            actionIds.forEach(id => state.completing.set(id, true));
          });
          
          const completions = await quickActionService.batchCompleteActions(
            workspaceId,
            projectId,
            actionIds
          );
          
          set(state => {
            // Remove completed actions
            const actions = state.actions.get(projectId);
            if (actions) {
              const filtered = actions.filter(a => !actionIds.includes(String(a.id)));
              state.actions.set(projectId, filtered);
            }
            
            // Add completions
            state.completions.unshift(...completions);
            
            // Clear completing status
            actionIds.forEach(id => state.completing.delete(id));
          });
        } catch (error) {
          set(state => {
            actionIds.forEach(id => state.completing.delete(id));
          });
          throw error;
        }
      },
      
      batchDismiss: async (workspaceId, projectId, actionIds, reason) => {
        try {
          // Optimistic remove
          set(state => {
            const actions = state.actions.get(projectId);
            if (actions) {
              const filtered = actions.filter(a => !actionIds.includes(String(a.id)));
              state.actions.set(projectId, filtered);
            }
          });
          
          await quickActionService.batchDismissActions(
            workspaceId,
            projectId,
            actionIds,
            reason
          );
        } catch (error) {
          // Reload on error
          await get().loadQuickActions(workspaceId, projectId);
          throw error;
        }
      },
      
      // Context & Settings
      setContext: (context) => {
        set(state => {
          state.currentContext = context;
        });
      },
      
      setMayaPersonality: (personality) => {
        set(state => {
          state.mayaPersonality = personality;
        });
      },
      
      setCurrentProject: (projectId) => {
        set(state => {
          state.currentProjectId = projectId;
        });
      },
      
      // Utility
      reset: () => {
        set(state => {
          state.actions.clear();
          state.suggestions = [];
          state.templates = [];
          state.completions = [];
          state.metrics = null;
          state.preferences = null;
          state.currentContext = null;
          state.currentProjectId = null;
          state.loading = false;
          state.generating = false;
          state.completing.clear();
          state.errors.clear();
        });
      },
      
      getActionsForProject: (projectId) => {
        return get().actions.get(projectId) || [];
      },
      
      getActionById: (projectId, actionId) => {
        const actions = get().actions.get(projectId);
        return actions?.find(a => String(a.id) === String(actionId));
      },
      
      hasCompletedAction: (actionId) => {
        return get().completions.some(c => c.actionId === actionId);
      },
      
      getCompletionRate: () => {
        const { completions, actions } = get();
        const totalActions = Array.from(actions.values()).flat().length;
        const totalCompleted = completions.length;
        
        if (totalActions + totalCompleted === 0) return 0;
        return (totalCompleted / (totalActions + totalCompleted)) * 100;
      }
    })),
    {
      name: 'quick-action-store'
    }
  )
);
