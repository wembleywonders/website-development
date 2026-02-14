/**
 * Quick Action Service
 * API service for Maya AI quick actions
 * @module features/quickActions/services/quickActionService
 */

import { apiClient } from '../../workspace/services/apiClient';
import type {
  QuickAction,
  QuickActionCategory,
  QuickActionStatus,
  QuickActionTemplate,
  QuickActionContext,
  QuickActionCompletion,
  QuickActionMetrics,
  QuickActionPreferences,
  QuickActionSuggestion,
  MayaPersonality,
  MayaResponse,
  GenerateQuickActionsRequest,
  CompleteQuickActionRequest,
  DismissQuickActionRequest,
  QuickActionResponse
} from '../types';

// ============================================================================
// API ENDPOINTS
// ============================================================================

const ENDPOINTS = {
  // Quick Actions
  quickActions: '/api/quick-actions',
  quickAction: (id: string) => `/api/quick-actions/${id}`,
  projectActions: (projectId: string) => `/api/projects/${projectId}/quick-actions`,
  workspaceActions: (workspaceId: string) => `/api/workspaces/${workspaceId}/quick-actions`,
  
  // Generation & AI
  generate: '/api/quick-actions/generate',
  suggest: '/api/quick-actions/suggest',
  mayaSuggestions: (projectId: string) => `/api/projects/${projectId}/maya-suggestions`,
  
  // Actions
  complete: (id: string) => `/api/quick-actions/${id}/complete`,
  dismiss: (id: string) => `/api/quick-actions/${id}/dismiss`,
  defer: (id: string) => `/api/quick-actions/${id}/defer`,
  undo: (id: string) => `/api/quick-actions/${id}/undo`,
  
  // Templates
  templates: '/api/quick-actions/templates',
  template: (id: string) => `/api/quick-actions/templates/${id}`,
  createFromTemplate: '/api/quick-actions/from-template',
  saveAsTemplate: (actionId: string) => `/api/quick-actions/${actionId}/save-as-template`,
  
  // Batch
  batchComplete: '/api/quick-actions/batch/complete',
  batchDismiss: '/api/quick-actions/batch/dismiss',
  batchDefer: '/api/quick-actions/batch/defer',
  
  // Analytics
  metrics: '/api/quick-actions/metrics',
  preferences: '/api/quick-actions/preferences',
  statistics: '/api/quick-actions/statistics',
  history: '/api/quick-actions/history',
  
  // Journey
  journeyActions: (journeyStep: string) => `/api/journey/${journeyStep}/actions`,
  recommendedActions: '/api/quick-actions/recommended'
} as const;

// ============================================================================
// SERVICE CLASS
// ============================================================================

class QuickActionService {
  // ============================================================================
  // QUICK ACTIONS CRUD
  // ============================================================================

  /**
   * Get quick actions for a project
   */
  async getQuickActions(
    workspaceId: string,
    projectId: string,
    options?: {
      status?: QuickActionStatus[];
      category?: QuickActionCategory[];
      priority?: string[];
      limit?: number;
    }
  ): Promise<QuickAction[]> {
    try {
      const params = new URLSearchParams();
      
      if (options?.status) {
        options.status.forEach(s => params.append('status', s));
      }
      if (options?.category) {
        options.category.forEach(c => params.append('category', c));
      }
      if (options?.priority) {
        options.priority.forEach(p => params.append('priority', p));
      }
      if (options?.limit) {
        params.append('limit', String(options.limit));
      }
      
      const response = await apiClient.get<QuickAction[]>(
        `${ENDPOINTS.projectActions(projectId)}?${params}`
      );
      
      return response;
    } catch (error) {
      console.error('Failed to get quick actions:', error);
      throw error;
    }
  }

  /**
   * Get a single quick action
   */
  async getQuickAction(actionId: string): Promise<QuickActionResponse> {
    try {
      const response = await apiClient.get<QuickActionResponse>(
        ENDPOINTS.quickAction(actionId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get quick action:', error);
      throw error;
    }
  }

  /**
   * Create a custom quick action
   */
  async createCustomAction(
    projectId: string,
    action: Partial<QuickAction>
  ): Promise<QuickAction> {
    try {
      const response = await apiClient.post<QuickAction>(
        ENDPOINTS.projectActions(projectId),
        {
          ...action,
          projectId,
          mayaGenerated: false,
          createdBy: 'user'
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create custom action:', error);
      throw error;
    }
  }

  /**
   * Update a quick action
   */
  async updateQuickAction(
    actionId: string,
    updates: Partial<QuickAction>
  ): Promise<QuickAction> {
    try {
      const response = await apiClient.patch<QuickAction>(
        ENDPOINTS.quickAction(actionId),
        updates
      );
      return response;
    } catch (error) {
      console.error('Failed to update quick action:', error);
      throw error;
    }
  }

  /**
   * Delete a quick action
   */
  async deleteQuickAction(actionId: string): Promise<void> {
    try {
      await apiClient.delete(ENDPOINTS.quickAction(actionId));
    } catch (error) {
      console.error('Failed to delete quick action:', error);
      throw error;
    }
  }

  // ============================================================================
  // MAYA AI GENERATION
  // ============================================================================

  /**
   * Generate quick actions using Maya AI
   */
  async generateActions(
    request: GenerateQuickActionsRequest
  ): Promise<QuickAction[]> {
    try {
      const response = await apiClient.post<MayaResponse>(
        ENDPOINTS.generate,
        request
      );
      
      // Extract actions from suggestions
      const actions = response.suggestions.map(s => s.action);
      
      // Store the suggestions for later reference
      this.storeSuggestions(request.projectId || '', response.suggestions);
      
      return actions;
    } catch (error) {
      console.error('Failed to generate actions:', error);
      throw error;
    }
  }

  /**
   * Get Maya AI suggestions for a project
   */
  async getMayaSuggestions(
    projectId: string,
    personality?: MayaPersonality
  ): Promise<QuickActionSuggestion[]> {
    try {
      const params = personality ? `?personality=${personality}` : '';
      const response = await apiClient.get<QuickActionSuggestion[]>(
        `${ENDPOINTS.mayaSuggestions(projectId)}${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get Maya suggestions:', error);
      throw error;
    }
  }

  /**
   * Get suggested actions based on context
   */
  async getSuggestedActions(
    workspaceId: string,
    context: QuickActionContext,
    count: number = 5
  ): Promise<QuickAction[]> {
    try {
      const response = await apiClient.post<QuickAction[]>(
        ENDPOINTS.suggest,
        {
          workspaceId,
          context,
          count
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to get suggested actions:', error);
      throw error;
    }
  }

  /**
   * Generate actions for a specific journey step
   */
  async generateJourneyActions(
    journeyStep: string,
    context?: QuickActionContext
  ): Promise<QuickAction[]> {
    try {
      const response = await apiClient.post<QuickAction[]>(
        ENDPOINTS.journeyActions(journeyStep),
        { context }
      );
      return response;
    } catch (error) {
      console.error('Failed to generate journey actions:', error);
      throw error;
    }
  }

  /**
   * Get recommended actions based on user behavior
   */
  async getRecommendedActions(
    workspaceId: string,
    limit: number = 10
  ): Promise<QuickAction[]> {
    try {
      const response = await apiClient.get<QuickAction[]>(
        `${ENDPOINTS.recommendedActions}?workspaceId=${workspaceId}&limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get recommended actions:', error);
      throw error;
    }
  }

  // ============================================================================
  // ACTION COMPLETION
  // ============================================================================

  /**
   * Complete a quick action
   */
  async completeAction(
    actionId: string,
    request?: CompleteQuickActionRequest
  ): Promise<QuickActionCompletion> {
    try {
      const response = await apiClient.post<QuickActionCompletion>(
        ENDPOINTS.complete(actionId),
        request || {}
      );
      return response;
    } catch (error) {
      console.error('Failed to complete action:', error);
      throw error;
    }
  }

  /**
   * Dismiss a quick action
   */
  async dismissAction(
    actionId: string,
    request?: DismissQuickActionRequest
  ): Promise<void> {
    try {
      await apiClient.post(
        ENDPOINTS.dismiss(actionId),
        request || {}
      );
    } catch (error) {
      console.error('Failed to dismiss action:', error);
      throw error;
    }
  }

  /**
   * Defer a quick action
   */
  async deferAction(actionId: string, until: Date): Promise<void> {
    try {
      await apiClient.post(
        ENDPOINTS.defer(actionId),
        { deferUntil: until.toISOString() }
      );
    } catch (error) {
      console.error('Failed to defer action:', error);
      throw error;
    }
  }

  /**
   * Undo action completion
   */
  async undoComplete(actionId: string): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.undo(actionId), {});
    } catch (error) {
      console.error('Failed to undo completion:', error);
      throw error;
    }
  }

  // ============================================================================
  // BATCH OPERATIONS
  // ============================================================================

  /**
   * Batch complete multiple actions
   */
  async batchComplete(
    actionIds: string[],
    feedback?: CompleteQuickActionRequest
  ): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.batchComplete, {
        actionIds,
        feedback
      });
    } catch (error) {
      console.error('Failed to batch complete actions:', error);
      throw error;
    }
  }

  /**
   * Batch dismiss multiple actions
   */
  async batchDismiss(
    actionIds: string[],
    reason?: string
  ): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.batchDismiss, {
        actionIds,
        reason
      });
    } catch (error) {
      console.error('Failed to batch dismiss actions:', error);
      throw error;
    }
  }

  /**
   * Batch defer multiple actions
   */
  async batchDefer(
    actionIds: string[],
    until: Date
  ): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.batchDefer, {
        actionIds,
        deferUntil: until.toISOString()
      });
    } catch (error) {
      console.error('Failed to batch defer actions:', error);
      throw error;
    }
  }

  // ============================================================================
  // TEMPLATES
  // ============================================================================

  /**
   * Get available templates
   */
  async getTemplates(
    category?: QuickActionCategory
  ): Promise<QuickActionTemplate[]> {
    try {
      const params = category ? `?category=${category}` : '';
      const response = await apiClient.get<QuickActionTemplate[]>(
        `${ENDPOINTS.templates}${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get templates:', error);
      throw error;
    }
  }

  /**
   * Get a single template
   */
  async getTemplate(templateId: string): Promise<QuickActionTemplate> {
    try {
      const response = await apiClient.get<QuickActionTemplate>(
        ENDPOINTS.template(templateId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get template:', error);
      throw error;
    }
  }

  /**
   * Create action from template
   */
  async createFromTemplate(
    templateId: string,
    projectId: string,
    variables?: Record<string, any>
  ): Promise<QuickAction> {
    try {
      const response = await apiClient.post<QuickAction>(
        ENDPOINTS.createFromTemplate,
        {
          templateId,
          projectId,
          variables
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create from template:', error);
      throw error;
    }
  }

  /**
   * Save action as template
   */
  async saveAsTemplate(
    actionId: string,
    name: string,
    description: string
  ): Promise<QuickActionTemplate> {
    try {
      const response = await apiClient.post<QuickActionTemplate>(
        ENDPOINTS.saveAsTemplate(actionId),
        {
          name,
          description,
          isCustom: true
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to save as template:', error);
      throw error;
    }
  }

  /**
   * Create a custom template
   */
  async createTemplate(
    template: Partial<QuickActionTemplate>
  ): Promise<QuickActionTemplate> {
    try {
      const response = await apiClient.post<QuickActionTemplate>(
        ENDPOINTS.templates,
        {
          ...template,
          isSystem: false,
          isCustom: true
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create template:', error);
      throw error;
    }
  }

  /**
   * Update a template
   */
  async updateTemplate(
    templateId: string,
    updates: Partial<QuickActionTemplate>
  ): Promise<QuickActionTemplate> {
    try {
      const response = await apiClient.patch<QuickActionTemplate>(
        ENDPOINTS.template(templateId),
        updates
      );
      return response;
    } catch (error) {
      console.error('Failed to update template:', error);
      throw error;
    }
  }

  /**
   * Delete a template
   */
  async deleteTemplate(templateId: string): Promise<void> {
    try {
      await apiClient.delete(ENDPOINTS.template(templateId));
    } catch (error) {
      console.error('Failed to delete template:', error);
      throw error;
    }
  }

  // ============================================================================
  // ANALYTICS & METRICS
  // ============================================================================

  /**
   * Get quick action metrics
   */
  async getMetrics(
    period?: 'day' | 'week' | 'month' | 'year' | 'all'
  ): Promise<QuickActionMetrics> {
    try {
      const params = period ? `?period=${period}` : '';
      const response = await apiClient.get<QuickActionMetrics>(
        `${ENDPOINTS.metrics}${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get metrics:', error);
      throw error;
    }
  }

  /**
   * Get user preferences
   */
  async getPreferences(): Promise<QuickActionPreferences> {
    try {
      const response = await apiClient.get<QuickActionPreferences>(
        ENDPOINTS.preferences
      );
      return response;
    } catch (error) {
      console.error('Failed to get preferences:', error);
      throw error;
    }
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    updates: Partial<QuickActionPreferences>
  ): Promise<QuickActionPreferences> {
    try {
      const response = await apiClient.patch<QuickActionPreferences>(
        ENDPOINTS.preferences,
        updates
      );
      return response;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  }

  /**
   * Get action statistics
   */
  async getStatistics(
    filters?: {
      projectId?: string;
      category?: QuickActionCategory;
      personality?: MayaPersonality;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<any> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.projectId) params.append('projectId', filters.projectId);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.personality) params.append('personality', filters.personality);
      if (filters?.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters?.endDate) params.append('endDate', filters.endDate.toISOString());
      
      const response = await apiClient.get<any>(
        `${ENDPOINTS.statistics}?${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get statistics:', error);
      throw error;
    }
  }

  /**
   * Get action history
   */
  async getHistory(
    options?: {
      projectId?: string;
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<QuickActionCompletion[]> {
    try {
      const params = new URLSearchParams();
      
      if (options?.projectId) params.append('projectId', options.projectId);
      if (options?.limit) params.append('limit', String(options.limit));
      if (options?.offset) params.append('offset', String(options.offset));
      if (options?.startDate) params.append('startDate', options.startDate.toISOString());
      if (options?.endDate) params.append('endDate', options.endDate.toISOString());
      
      const response = await apiClient.get<QuickActionCompletion[]>(
        `${ENDPOINTS.history}?${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get history:', error);
      throw error;
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Store suggestions locally (for reference)
   */
  private storeSuggestions(
    projectId: string,
    suggestions: QuickActionSuggestion[]
  ): void {
    try {
      const key = `maya_suggestions_${projectId}`;
      localStorage.setItem(key, JSON.stringify({
        suggestions,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Failed to store suggestions:', error);
    }
  }

  /**
   * Get stored suggestions
   */
  getStoredSuggestions(projectId: string): QuickActionSuggestion[] | null {
    try {
      const key = `maya_suggestions_${projectId}`;
      const stored = localStorage.getItem(key);
      
      if (stored) {
        const data = JSON.parse(stored);
        // Check if suggestions are less than 1 hour old
        const timestamp = new Date(data.timestamp);
        const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
        
        if (timestamp > hourAgo) {
          return data.suggestions;
        }
      }
    } catch (error) {
      console.warn('Failed to get stored suggestions:', error);
    }
    
    return null;
  }

  /**
   * Clear stored suggestions
   */
  clearStoredSuggestions(projectId?: string): void {
    try {
      if (projectId) {
        const key = `maya_suggestions_${projectId}`;
        localStorage.removeItem(key);
      } else {
        // Clear all suggestions
        Object.keys(localStorage)
          .filter(key => key.startsWith('maya_suggestions_'))
          .forEach(key => localStorage.removeItem(key));
      }
    } catch (error) {
      console.warn('Failed to clear stored suggestions:', error);
    }
  }

  /**
   * Export actions to CSV
   */
  async exportActions(
    projectId: string,
    format: 'csv' | 'json' = 'csv'
  ): Promise<Blob> {
    try {
      const response = await apiClient.get<Blob>(
        `${ENDPOINTS.projectActions(projectId)}/export?format=${format}`,
        {
            responseType: 'blob',
            url: ''
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to export actions:', error);
      throw error;
    }
  }

  /**
   * Import actions from file
   */
  async importActions(
    projectId: string,
    file: File
  ): Promise<QuickAction[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      
      const response = await apiClient.post<QuickAction[]>(
        `${ENDPOINTS.projectActions(projectId)}/import`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url: ''
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to import actions:', error);
      throw error;
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const quickActionService = new QuickActionService();
