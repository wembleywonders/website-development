/**
 * Quick Action Service - Context-aware action generation and tracking
 * Features: Dynamic actions, completion tracking, Maya AI suggestions
 * @module features/workspace/services/quickActionService
 */

import { apiClient } from './apiClient';
import type {
  QuickAction,
  QuickActionType,
  JourneyStep,
  Project,
} from '../types';
import { MayaPersonality, QuickActionCategory, QuickActionGeneration, QuickActionMetrics } from '@/features/quickActions/types';

// Define QuickActionContext locally with completionRate typed as number
interface QuickActionContext {
  journeyStep?: string;
  projectType?: string;
  tags?: string[];
  recentActivity?: string;
  timeOfDay?: string;
  completionRate?: number;
  [key: string]: any;
}

// Define QuickActionCompletion locally (update fields as needed)
interface QuickActionCompletion {
  id: string;
  actionId: string;
  completedAt: string;
  completedBy?: string;
  [key: string]: any;
}

// Define QuickActionPreferences locally (update fields as needed)
interface QuickActionPreferences {
  // Example fields, update according to actual usage
  notificationsEnabled?: boolean;
  defaultActionView?: string;
  [key: string]: any;
}

/**
 * Quick action management service
 */
class QuickActionService {
  private actionCache: Map<string, QuickAction[]> = new Map();
  private templateCache: Map<string, QuickActionType[]> = new Map();
  private contextualActionsCache: Map<string, QuickAction[]> = new Map();
  // Define QuickActionCompletion locally (update fields as needed)
  private completionHistory: QuickActionCompletion[] = [];
  private preferences: QuickActionPreferences | null = null;

  /**
   * Get quick actions for current context
   */
  async getQuickActions(
    workspaceId: string,
    projectId: string,
    context?: QuickActionContext
  ): Promise<QuickAction[]> {
    const cacheKey = `${projectId}-${JSON.stringify(context || {})}`;
    
    // Check cache
    if (this.contextualActionsCache.has(cacheKey)) {
      const cached = this.contextualActionsCache.get(cacheKey)!;
      if (this.isCacheValid()) {
        return cached;
      }
    }

    const params = new URLSearchParams();
    
    if (context) {
      if (context.journeyStep) params.append('journeyStep', context.journeyStep);
      if (context.projectType) params.append('projectType', context.projectType);
      if (context.tags?.length) params.append('tags', context.tags.join(','));
      if (context.recentActivity) params.append('recentActivity', context.recentActivity);
      if (context.timeOfDay) params.append('timeOfDay', context.timeOfDay);
      if (context.completionRate !== undefined) {
        params.append('completionRate', context.completionRate.toString());
      }
    }

    const actions = await apiClient.get<QuickAction[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions?${params}`
    );

    // Cache actions
    this.contextualActionsCache.set(cacheKey, actions);

    return actions;
  }

  /**
   * Generate AI-powered quick actions
   */
  async generateQuickActions(
    workspaceId: string,
    projectId: string,
    options: QuickActionGeneration
  ): Promise<QuickAction[]> {
    const actions = await apiClient.post<QuickAction[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/generate`,
      options
    );

    // Update cache with new actions
    const cacheKey = `${projectId}-generated`;
    this.contextualActionsCache.set(cacheKey, actions);

    return actions;
  }

  /**
   * Get suggested actions from Maya AI
   */
  async getMayaSuggestions(
    workspaceId: string,
    projectId: string,
    personality: MayaPersonality,
    context?: QuickActionContext
  ): Promise<any[]> { // Changed QuickActionSuggestion[] to any[]
    const suggestions = await apiClient.post<any[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/maya-suggest`,
      {
        personality,
        context
      }
    );

    return suggestions;
  }

  /**
   * Complete a quick action
   */
  async completeAction(
    workspaceId: string,
    projectId: string,
    actionId: string,
    completion?: Partial<QuickActionCompletion>
  ): Promise<QuickActionCompletion> {
    const result = await apiClient.post<QuickActionCompletion>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/${actionId}/complete`,
      completion || {}
    );

    // Add to completion history
    this.completionHistory.unshift(result);
    if (this.completionHistory.length > 100) {
      this.completionHistory.pop();
    }

    // Clear contextual cache to refresh actions
    this.contextualActionsCache.clear();

    return result;
  }

  /**
   * Dismiss/skip a quick action
   */
  async dismissAction(
    workspaceId: string,
    projectId: string,
    actionId: string,
    reason?: string
  ): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/${actionId}/dismiss`,
      { reason }
    );

    // Clear contextual cache to refresh actions
    this.contextualActionsCache.clear();
  }

  /**
   * Defer action to later
   */
  async deferAction(
    workspaceId: string,
    projectId: string,
    actionId: string,
    deferUntil: Date
  ): Promise<QuickAction> {
    const action = await apiClient.post<QuickAction>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/${actionId}/defer`,
      { deferUntil: deferUntil.toISOString() }
    );

    // Update cache
    this.updateCachedAction(projectId, action);

    return action;
  }

  /**
   * Get action templates
   */
  async getActionTemplates(
    workspaceId: string,
    category?: QuickActionCategory
  ): Promise<QuickActionType[]> {
    const cacheKey = `${workspaceId}-${category || 'all'}`;
    
    // Check cache
    if (this.templateCache.has(cacheKey)) {
      return this.templateCache.get(cacheKey)!;
    }

    const params = category ? `?category=${category}` : '';
    const templates = await apiClient.get<QuickActionType[]>(
      `/api/workspaces/${workspaceId}/quick-actions/templates${params}`
    );

    // Cache templates
    this.templateCache.set(cacheKey, templates);

    return templates;
  }

  /**
   * Create custom action from template
   */
  async createFromTemplate(
    workspaceId: string,
    projectId: string,
    templateId: string,
    customization?: Partial<QuickAction>
  ): Promise<QuickAction> {
    const action = await apiClient.post<QuickAction>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/from-template`,
      {
        templateId,
        ...customization
      }
    );

    // Clear cache to include new action
    this.contextualActionsCache.clear();

    return action;
  }

  /**
   * Create custom quick action
   */
  async createCustomAction(
    workspaceId: string,
    projectId: string,
    action: Partial<QuickAction>
  ): Promise<QuickAction> {
    const created = await apiClient.post<QuickAction>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions`,
      action
    );

    // Clear cache to include new action
    this.contextualActionsCache.clear();

    return created;
  }

  /**
   * Update quick action
   */
  async updateAction(
    workspaceId: string,
    projectId: string,
    actionId: string,
    updates: Partial<QuickAction>
  ): Promise<QuickAction> {
    const action = await apiClient.patch<QuickAction>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/${actionId}`,
      updates
    );

    // Update cache
    this.updateCachedAction(projectId, action);

    return action;
  }

  /**
   * Delete quick action
   */
  async deleteAction(
    workspaceId: string,
    projectId: string,
    actionId: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/${actionId}`
    );

    // Clear cache
    this.contextualActionsCache.clear();
  }

  /**
   * Get action history
   */
  async getActionHistory(
    workspaceId: string,
    projectId?: string,
    options?: {
      limit?: number;
      offset?: number;
      includeCompleted?: boolean;
      includeDismissed?: boolean;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<any[]> { // Changed QuickActionHistory[] to any[]
    const params = new URLSearchParams();
    
    if (projectId) params.append('projectId', projectId);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.includeCompleted) params.append('includeCompleted', 'true');
    if (options?.includeDismissed) params.append('includeDismissed', 'true');
    if (options?.startDate) params.append('startDate', options.startDate.toISOString());
    if (options?.endDate) params.append('endDate', options.endDate.toISOString());

    const history = await apiClient.get<any[]>(
      `/api/workspaces/${workspaceId}/quick-actions/history?${params}`
    );

    return history;
  }

  /**
   * Get action metrics
   */
  async getActionMetrics(
    workspaceId: string,
    projectId?: string,
    period: 'day' | 'week' | 'month' | 'year' = 'week'
  ): Promise<QuickActionMetrics> {
    const params = new URLSearchParams({ period });
    if (projectId) params.append('projectId', projectId);

    const metrics = await apiClient.get<QuickActionMetrics>(
      `/api/workspaces/${workspaceId}/quick-actions/metrics?${params}`
    );

    return metrics;
  }

  /**
   * Get action preferences
   */
  async getActionPreferences(workspaceId: string): Promise<QuickActionPreferences> {
    if (this.preferences) {
      return this.preferences;
    }

    const prefs = await apiClient.get<QuickActionPreferences>(
      `/api/workspaces/${workspaceId}/quick-actions/preferences`
    );

    this.preferences = prefs;

    return prefs;
  }

  /**
   * Update action preferences
   */
  async updateActionPreferences(
    workspaceId: string,
    preferences: Partial<QuickActionPreferences>
  ): Promise<QuickActionPreferences> {
    const updated = await apiClient.patch<QuickActionPreferences>(
      `/api/workspaces/${workspaceId}/quick-actions/preferences`,
      preferences
    );

    this.preferences = updated;

    return updated;
  }

  /**
   * Batch operations
   */

  async batchCompleteActions(
    workspaceId: string,
    projectId: string,
    actionIds: string[]
  ): Promise<QuickActionCompletion[]> {
    const completions = await apiClient.post<QuickActionCompletion[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/batch-complete`,
      { actionIds }
    );

    // Add to history
    this.completionHistory.unshift(...completions);

    // Clear cache
    this.contextualActionsCache.clear();

    return completions;
  }

  async batchDismissActions(
    workspaceId: string,
    projectId: string,
    actionIds: string[],
    reason?: string
  ): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/batch-dismiss`,
      { actionIds, reason }
    );

    // Clear cache
    this.contextualActionsCache.clear();
  }

  /**
   * Smart action recommendations
   */

  async getRecommendedActions(
    workspaceId: string,
    projectId: string,
    limit: number = 5
  ): Promise<QuickAction[]> {
    const actions = await apiClient.get<QuickAction[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/recommended?limit=${limit}`
    );

    return actions;
  }

  async getNextBestAction(
    workspaceId: string,
    projectId: string,
    context?: QuickActionContext
  ): Promise<QuickAction | null> {
    try {
      const action = await apiClient.post<QuickAction>(
        `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/next-best`,
        { context }
      );

      return action;
    } catch (error) {
      console.error('Failed to get next best action:', error);
      return null;
    }
  }

  /**
   * Journey-specific actions
   */

  async getJourneyActions(
    workspaceId: string,
    projectId: string,
    journeyStep: JourneyStep
  ): Promise<QuickAction[]> {
    const actions = await apiClient.get<QuickAction[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/journey/${journeyStep}`
    );

    return actions;
  }

  async getJourneyProgress(
    workspaceId: string,
    projectId: string
  ): Promise<{
    currentStep: JourneyStep;
    completedActions: number;
    totalActions: number;
    nextActions: QuickAction[];
  }> {
    return apiClient.get(
      `/api/workspaces/${workspaceId}/projects/${projectId}/quick-actions/journey-progress`
    );
  }

  /**
   * Action insights
   */

  async getActionInsights(
    workspaceId: string,
    projectId?: string
  ): Promise<{
    mostCompleted: QuickAction[];
    mostDismissed: QuickAction[];
    averageCompletionTime: number;
    peakActivityHours: number[];
    successRate: number;
  }> {
    const params = projectId ? `?projectId=${projectId}` : '';
    
    return apiClient.get(
      `/api/workspaces/${workspaceId}/quick-actions/insights${params}`
    );
  }

  /**
   * Utility methods
   */

  private updateCachedAction(projectId: string, action: QuickAction): void {
    this.contextualActionsCache.forEach((actions, key) => {
      if (key.startsWith(projectId)) {
        const index = actions.findIndex(a => a.id === action.id);
        if (index !== -1) {
          actions[index] = action;
        }
      }
    });
  }

  private isCacheValid(): boolean {
    // Quick actions cache for 2 minutes (they're dynamic)
    const cacheTime = 2 * 60 * 1000;
    return true; // Simplified for now
  }

  clearCache(): void {
    this.actionCache.clear();
    this.templateCache.clear();
    this.contextualActionsCache.clear();
    this.completionHistory = [];
    this.preferences = null;
  }

  getCompletionHistory(): QuickActionCompletion[] {
    return [...this.completionHistory];
  }

  getCachedActions(projectId: string): QuickAction[] {
    const actions: QuickAction[] = [];
    
    this.contextualActionsCache.forEach((cached, key) => {
      if (key.startsWith(projectId)) {
        actions.push(...cached);
      }
    });

    // Remove duplicates
    const unique = new Map(actions.map(a => [a.id, a]));
    
    return Array.from(unique.values());
  }
}

// Export singleton instance
export const quickActionService = new QuickActionService();
