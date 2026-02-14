
/**
 * Quick Actions Store - State management for Maya AI quick actions
 * Features: Action generation, completion tracking, Maya personalities, metrics
 * @module features/quickActions/stores/quickActionStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { quickActionService } from '../services/quickActionService';
import type { Draft } from 'immer';
import type {
  QuickAction,
  QuickActionCategory,
  QuickActionStatus,
  QuickActionTemplate,
  QuickActionContext,
  QuickActionCompletion,
  QuickActionMetrics,
  QuickActionPreferences,
  MayaPersonality,
  GenerateQuickActionsRequest,
  CompleteQuickActionRequest,
  DismissQuickActionRequest,
  QuickActionSuggestion
} from '../types';

// ============================================================================
// STORE STATE INTERFACE
// ============================================================================

interface QuickActionStoreState {
  // Actions data (by projectId)
  actions: Map<string, QuickAction[]>;
  suggestions: Map<string, QuickActionSuggestion[]>;
  templates: Map<string, QuickActionTemplate>;
  completions: QuickActionCompletion[];
  
  // Maya AI
  mayaPersonality: MayaPersonality;
  mayaContext: QuickActionContext | null;
  generating: boolean;
  lastGenerated: Date | null;
  generationCount: number;
  
  // Metrics & Preferences
  metrics: QuickActionMetrics | null;
  preferences: QuickActionPreferences | null;
  
  // Current state
  currentProjectId: string | null;
  currentContext: QuickActionContext | null;
  
  // UI State
  loading: boolean;
  saving: boolean;
  errors: Map<string, Error>;
  
  // Action Management
  loadQuickActions: (workspaceId: string, projectId: string, context?: QuickActionContext) => Promise<void>;
  generateActions: (workspaceId: string, projectId: string, count?: number) => Promise<QuickAction[]>;
  getMayaSuggestions: (projectId: string, personality?: MayaPersonality) => Promise<QuickActionSuggestion[]>;
  refreshActions: (projectId: string) => Promise<void>;
  
  // Action Completion
  completeAction: (actionId: string, feedback?: CompleteQuickActionRequest) => Promise<void>;
  dismissAction: (actionId: string, request?: DismissQuickActionRequest) => Promise<void>;
  deferAction: (actionId: string, until: Date) => Promise<void>;
  undoComplete: (actionId: string) => Promise<void>;
  
  // Batch Operations
  batchComplete: (actionIds: string[]) => Promise<void>;
  batchDismiss: (actionIds: string[]) => Promise<void>;
  batchDefer: (actionIds: string[], until: Date) => Promise<void>;
  
  // Template Management
  loadTemplates: (category?: QuickActionCategory) => Promise<void>;
  createFromTemplate: (templateId: string, projectId: string) => Promise<QuickAction>;
  createCustomAction: (projectId: string, action: Partial<QuickAction>) => Promise<QuickAction>;
  saveAsTemplate: (actionId: string, name: string, description: string) => Promise<void>;
  
  // Journey Actions
  getJourneyActions: (journeyStep: string) => QuickAction[];
  getNextBestAction: (projectId: string) => QuickAction | null;
  getSuggestedActions: (projectId: string, count?: number) => QuickAction[];
  
  // Metrics & Analytics
  loadMetrics: () => Promise<void>;
  getCompletionRate: (period?: 'day' | 'week' | 'month' | 'all') => number;
  getAverageCompletionTime: (category?: QuickActionCategory) => number;
  getPersonalityMetrics: (personality: MayaPersonality) => any;
  
  // Preferences
  loadPreferences: () => Promise<void>;
  updatePreferences: (updates: Partial<QuickActionPreferences>) => Promise<void>;
  setMayaPersonality: (personality: MayaPersonality) => void;
  setContext: (context: QuickActionContext) => void;
  
  // UI Management
  setCurrentProject: (projectId: string | null) => void;
  clearActions: (projectId?: string) => void;
  
  // Utility
  reset: () => void;
  getActionsForProject: (projectId: string) => QuickAction[];
  getActionById: (actionId: string) => QuickAction | undefined;
  hasCompletedAction: (actionId: string) => boolean;
  getPendingActions: (projectId: string) => QuickAction[];
  getCompletedActions: (projectId: string) => QuickAction[];
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const defaultPreferences: QuickActionPreferences = {
  enabled: true,
  autoGenerate: true,
  generationFrequency: 'daily',
  maxSuggestions: 5,
  personalities: {
    enabled: ['mentor', 'coach', 'assistant', 'strategist', 'creative', 'analyst'],
    default: 'assistant',
    weights: {
      mentor: 0.2,
      coach: 0.15,
      assistant: 0.25,
      strategist: 0.15,
      creative: 0.15,
      analyst: 0.1
    }
  },
  categories: {
    enabled: ['task', 'learn', 'create', 'review', 'collaborate', 'optimize'],
    weights: {
      task: 0.3,
      learn: 0.2,
      create: 0.2,
      review: 0.1,
      collaborate: 0.1,
      optimize: 0.1,
      analyze: 0,
      communicate: 0,
      document: 0,
      automate: 0
    }
  },
  timing: {
    morningStart: '09:00',
    morningEnd: '12:00',
    afternoonStart: '13:00',
    afternoonEnd: '17:00',
    eveningStart: '17:00',
    eveningEnd: '21:00'
  },
  notifications: {
    enabled: true,
    channels: ['inApp'],
    frequency: 'batched'
  }
};

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useQuickActionStore = create<QuickActionStoreState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        actions: new Map(),
        suggestions: new Map(),
        templates: new Map(),
        completions: [],
        mayaPersonality: 'assistant',
        mayaContext: null,
        generating: false,
        lastGenerated: null,
        generationCount: 0,
        metrics: null,
        preferences: null,
        currentProjectId: null,
        currentContext: null,
        loading: false,
        saving: false,
        errors: new Map(),
        
        // Action Management
        loadQuickActions: async (workspaceId, projectId, context) => {
          try {
            set(state => {
              state.loading = true;
              state.currentProjectId = projectId;
              if (context) {
                state.currentContext = context;
              }
            });
            
            const actions = await quickActionService.getQuickActions(workspaceId, projectId);
            
            set(state => {
              state.actions.set(projectId, actions);
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
        
        generateActions: async (workspaceId, projectId, count = 5) => {
          try {
            set(state => {
              state.generating = true;
            });
            
            const request: GenerateQuickActionsRequest = {
              workspaceId,
              projectId,
              context: get().currentContext || undefined,
              personality: get().mayaPersonality,
              count
            };
            
            const generated = await quickActionService.generateActions(request);
            
            set(state => {
              const existing = state.actions.get(projectId) || [];
              state.actions.set(projectId, [...existing, ...generated]);
              state.generating = false;
              state.lastGenerated = new Date();
              state.generationCount++;
            });
            
            return generated;
          } catch (error) {
            set(state => {
              state.generating = false;
              state.errors.set('generate', error as Error);
            });
            throw error;
          }
        },
        
        getMayaSuggestions: async (projectId, personality) => {
          try {
            const suggestions = await quickActionService.getMayaSuggestions(
              projectId,
              personality || get().mayaPersonality
            );
            
            set(state => {
              state.suggestions.set(projectId, suggestions);
            });
            
            return suggestions;
          } catch (error) {
            throw error;
          }
        },
        
        refreshActions: async (projectId) => {
          const actions = get().actions.get(projectId) || [];
          const pendingActions = actions.filter(a => a.status === 'pending');
          
          if (pendingActions.length < 3) {
            await get().generateActions(get().currentProjectId!, projectId, 5);
          }
        },
        
        // Action Completion
        completeAction: async (actionId, feedback) => {
          const action = get().getActionById(actionId);
          if (!action) throw new Error('Action not found');
          
          // Optimistic update
          set(state => {
            const projectActions = state.actions.get(action.projectId!) || [];
            const index = projectActions.findIndex(a => a.id === actionId);
            if (index !== -1) {
              projectActions[index].status = 'completed';
              projectActions[index].completedAt = new Date();
            }
          });
          
          try {
            const completion = await quickActionService.completeAction(actionId, feedback);
            
            set(state => {
              state.completions.push(completion);
              if (state.completions.length > 100) {
                state.completions = state.completions.slice(-100);
              }
            });
          } catch (error) {
            // Revert on error
            set(state => {
              const projectActions = state.actions.get(action.projectId!) || [];
              const index = projectActions.findIndex(a => a.id === actionId);
              if (index !== -1) {
                projectActions[index].status = 'pending';
                projectActions[index].completedAt = undefined;
              }
            });
            throw error;
          }
        },
        
        dismissAction: async (actionId, request) => {
          const action = get().getActionById(actionId);
          if (!action) throw new Error('Action not found');
          
          set(state => {
            const projectActions = state.actions.get(action.projectId!) || [];
            const index = projectActions.findIndex(a => a.id === actionId);
            if (index !== -1) {
              projectActions[index].status = 'dismissed';
              projectActions[index].dismissedAt = new Date();
            }
          });
          
          try {
            await quickActionService.dismissAction(actionId, request);
          } catch (error) {
            // Revert on error
            set(state => {
              const projectActions = state.actions.get(action.projectId!) || [];
              const index = projectActions.findIndex(a => a.id === actionId);
              if (index !== -1) {
                projectActions[index].status = 'pending';
                projectActions[index].dismissedAt = undefined;
              }
            });
            throw error;
          }
        },
        
        deferAction: async (actionId, until) => {
          const action = get().getActionById(actionId);
          if (!action) throw new Error('Action not found');
          
          set(state => {
            const projectActions = state.actions.get(action.projectId!) || [];
            const index = projectActions.findIndex(a => a.id === actionId);
            if (index !== -1) {
              projectActions[index].status = 'deferred';
              projectActions[index].deferredUntil = until;
            }
          });
          
          try {
            await quickActionService.deferAction(actionId, until);
          } catch (error) {
            throw error;
          }
        },
        
        undoComplete: async (actionId) => {
          const action = get().getActionById(actionId);
          if (!action) throw new Error('Action not found');
          
          set(state => {
            const projectActions = state.actions.get(action.projectId!) || [];
            const index = projectActions.findIndex(a => a.id === actionId);
            if (index !== -1) {
              projectActions[index].status = 'pending';
              projectActions[index].completedAt = undefined;
            }
          });
          
          try {
            await quickActionService.undoComplete(actionId);
          } catch (error) {
            throw error;
          }
        },
        
        // Batch Operations
        batchComplete: async (actionIds) => {
          await Promise.all(
            actionIds.map(id => get().completeAction(id))
          );
        },
        
        batchDismiss: async (actionIds) => {
          await Promise.all(
            actionIds.map(id => get().dismissAction(id))
          );
        },
        
        batchDefer: async (actionIds, until) => {
          await Promise.all(
            actionIds.map(id => get().deferAction(id, until))
          );
        },
        
        // Template Management
        loadTemplates: async (category) => {
          try {
            const templates = await quickActionService.getTemplates(category);
            
            set(state => {
              templates.forEach((template: QuickActionTemplate) => {
                state.templates.set(template.id, template);
              });
            });
          } catch (error) {
            throw error;
          }
        },
        
        createFromTemplate: async (templateId, projectId) => {
          try {
            const template = get().templates.get(templateId);
            if (!template) throw new Error('Template not found');
            
            const action = await quickActionService.createFromTemplate(templateId, projectId);
            
            set(state => {
              const projectActions = state.actions.get(projectId) || [];
              projectActions.push(action);
              state.actions.set(projectId, projectActions);
            });
            
            return action;
          } catch (error) {
            throw error;
          }
        },
        
        createCustomAction: async (projectId, actionData) => {
          try {
            const action = await quickActionService.createCustomAction(projectId, actionData);
            
            set(state => {
              const projectActions = state.actions.get(projectId) || [];
              projectActions.push(action);
              state.actions.set(projectId, projectActions);
            });
            
            return action;
          } catch (error) {
            throw error;
          }
        },
        
        saveAsTemplate: async (actionId, name, description) => {
          try {
            await quickActionService.saveAsTemplate(actionId, name, description);
            await get().loadTemplates();
          } catch (error) {
            throw error;
          }
        },
        
        // Journey Actions
        getJourneyActions: (journeyStep) => {
          const allActions: QuickAction[] = [];
          get().actions.forEach(projectActions => {
            allActions.push(...projectActions);
          });
          
          return allActions.filter(action => 
            action.context?.projectPhase === journeyStep
          );
        },
        
        getNextBestAction: (projectId) => {
          const actions = get().getActionsForProject(projectId);
          const pending = actions.filter(a => a.status === 'pending');
          
          // Sort by priority and return the highest
          pending.sort((a, b) => {
            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3, optional: 4 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
          
          return pending[0] || null;
        },
        
        getSuggestedActions: (projectId, count = 3) => {
          const actions = get().getActionsForProject(projectId);
          const pending = actions.filter(a => a.status === 'pending');
          
          return pending.slice(0, count);
        },
        
        // Metrics & Analytics
        loadMetrics: async () => {
          try {
            const metrics = await quickActionService.getMetrics();
            
            set(state => {
              state.metrics = metrics;
            });
          } catch (error) {
            throw error;
          }
        },
        
        getCompletionRate: (period = 'all') => {
          const { metrics } = get();
          if (!metrics) return 0;
          
          return metrics.completionRate;
        },
        
        getAverageCompletionTime: (category) => {
          const { metrics } = get();
          if (!metrics) return 0;
          
          if (category && metrics.byCategory[category]) {
            return metrics.byCategory[category].averageTime;
          }
          
          return metrics.averageCompletionTime;
        },
        
        getPersonalityMetrics: (personality) => {
          const { metrics } = get();
          if (!metrics) return null;
          
          return metrics.byPersonality[personality] || null;
        },
        
        // Preferences
        loadPreferences: async () => {
          try {
            const preferences = await quickActionService.getPreferences();
            
            set(state => {
              state.preferences = preferences || defaultPreferences;
            });
          } catch (error) {
            set(state => {
              state.preferences = defaultPreferences;
            });
          }
        },
        
        updatePreferences: async (updates) => {
          try {
            set(state => {
              state.saving = true;
              if (state.preferences) {
                Object.assign(state.preferences, updates);
              }
            });
            
            await quickActionService.updatePreferences(updates);
            
            set(state => {
              state.saving = false;
            });
          } catch (error) {
            set(state => {
              state.saving = false;
            });
            throw error;
          }
        },
        
        setMayaPersonality: (personality) => {
          set(state => {
            state.mayaPersonality = personality;
          });
        },
        
        setContext: (context) => {
          set(state => {
            state.currentContext = context;
          });
        },
        
        // UI Management
        setCurrentProject: (projectId) => {
          set(state => {
            state.currentProjectId = projectId;
          });
        },
        
        clearActions: (projectId) => {
          set(state => {
            if (projectId) {
              state.actions.delete(projectId);
            } else {
              state.actions.clear();
            }
          });
        },
        
        // Utility
        reset: () => {
          set(state => {
            state.actions.clear();
            state.suggestions.clear();
            state.templates.clear();
            state.completions = [];
            state.mayaPersonality = 'assistant';
            state.mayaContext = null;
            state.generating = false;
            state.lastGenerated = null;
            state.generationCount = 0;
            state.metrics = null;
            state.preferences = null;
            state.currentProjectId = null;
            state.currentContext = null;
            state.loading = false;
            state.saving = false;
            state.errors.clear();
          });
        },
        
        getActionsForProject: (projectId) => {
          return get().actions.get(projectId) || [];
        },
        
        getActionById: (actionId) => {
          for (const [, actions] of get().actions) {
            const action = actions.find(a => a.id === actionId);
            if (action) return action;
          }
          return undefined;
        },
        
        hasCompletedAction: (actionId) => {
          const action = get().getActionById(actionId);
          return action?.status === 'completed' || false;
        },
        
        getPendingActions: (projectId) => {
          const actions = get().getActionsForProject(projectId);
          return actions.filter(a => a.status === 'pending');
        },
        
        getCompletedActions: (projectId) => {
          const actions = get().getActionsForProject(projectId);
          return actions.filter(a => a.status === 'completed');
        }
      })),
      {
        name: 'quickaction-store',
        partialize: (state) => ({
          mayaPersonality: state.mayaPersonality,
          preferences: state.preferences,
          completions: state.completions.slice(-50) // Keep last 50 completions
        })
      }
    ),
    {
      name: 'quickaction-store'
    }
  )
);