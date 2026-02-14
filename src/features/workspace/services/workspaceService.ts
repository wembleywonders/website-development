/**
 * Workspace Service - Workspace settings, profile, and configuration management
 * Features: Settings, user profile, storage quota, statistics, preferences
 * @module features/workspace/services/workspaceService
 */

import { apiClient } from './apiClient';
import type {
  WorkspaceStats,
  WorkspaceUsage,
  WorkspaceNotifications,
  WorkspaceIntegration,
  WorkspaceTheme,
  WorkspaceExport,
  WorkspaceBackup,
  WorkspaceAuditLog,
  WorkspaceUpdate,
  WorkspaceCreate,
  WorkspaceQuota,
  PageRequest
} from '../types';

 // Fallback local type for WorkspaceSettings because the upstream types module
// Local fallback for Workspace because ../types does not export it; adjust fields to match upstream types if you later export Workspace.
type Workspace = {
  id: string;
  name?: string;
  slug?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

// Fallback local type for WorkspaceSettings because the upstream types module
// does not export it; adjust fields to a stricter shape if you add the proper
// export to ../types later.
type WorkspaceSettings = {
  id?: string;
  workspaceId?: string;
  preferences?: Record<string, any>;
  notifications?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
};

// WorkspaceBilling is not exported from ../types; provide a local fallback type.
// WorkspaceBilling is not exported from ../types; provide a local fallback type.
// Replace `any` with a stricter type if you add the proper export to ../types later.
type WorkspaceBilling = any;

// Local fallback for WorkspaceStorage because '../types' does not export it;
// adjust fields to a stricter shape if you add the proper export to ../types later.
type WorkspaceStorage = {
  totalBytes?: number;
  usedBytes?: number;
  filesCount?: number;
  [key: string]: any;
};
 /**
  * Local alias for workspace role used in this service; the upstream types module
  * does not export WorkspaceRole, so keep a narrow union plus string fallback.
  */
 type WorkspaceRole = 'owner' | 'admin' | 'member' | string;
 type WorkspacePermissions = {
   [permission: string]: boolean | undefined;
 };
 
 /**
  * Fallback local type for WorkspaceInvite because the upstream types module
  * does not export it; adjust fields to a stricter shape if you add the proper
  * export to ../types later.
  */
 type WorkspaceInvite = {
   id: string;
   email: string;
   role?: WorkspaceRole;
   permissions?: WorkspacePermissions;
   invitedAt?: string;
   status?: 'pending' | 'accepted' | 'declined' | string;
 };
 
 /**
  * Local fallback for WorkspaceUser because ../types does not export it.
  * Adjust fields to match your upstream types if you later export WorkspaceUser.
  */
 type WorkspaceUser = {
   id: string;
   email?: string;
   name?: string;
   role?: WorkspaceRole;
   permissions?: WorkspacePermissions;
   active?: boolean;
   joinedAt?: string;
   [key: string]: any;
 };
 
 type PageResponse<T> = {
   content: T[];
   page: number;
   size: number;
   totalElements: number;
   totalPages: number;
};
/**
 * Workspace management service
 */
class WorkspaceService {
  private currentWorkspace: Workspace | null = null;
  private workspaceCache: Map<string, Workspace> = new Map();
  private settingsCache: Map<string, WorkspaceSettings> = new Map();
  private membersCache: Map<string, WorkspaceUser[]> = new Map();

  /**
   * Get current workspace
   */
  async getCurrentWorkspace(): Promise<Workspace> {
    if (this.currentWorkspace && this.isCacheValid(this.currentWorkspace.updatedAt)) {
      return this.currentWorkspace;
    }

    const workspace = await apiClient.get<Workspace>('/api/workspaces/current');
    this.currentWorkspace = workspace;
    this.workspaceCache.set(workspace.id, workspace);

    return workspace;
  }

  /**
   * Get workspace by ID
   */
  async getWorkspace(workspaceId: string): Promise<Workspace> {
    // Check cache
    if (this.workspaceCache.has(workspaceId)) {
      const cached = this.workspaceCache.get(workspaceId)!;
      if (this.isCacheValid(cached.updatedAt)) {
        return cached;
      }
    }

    const workspace = await apiClient.get<Workspace>(`/api/workspaces/${workspaceId}`);
    this.workspaceCache.set(workspaceId, workspace);

    return workspace;
  }

  /**
   * Get all user workspaces
   */
  async getUserWorkspaces(options?: PageRequest): Promise<PageResponse<Workspace>> {
    const params = new URLSearchParams();
    
    if (options) {
      if (options.page !== undefined && options.page !== null) {
        params.append('page', options.page.toString());
      }
      if (options.size !== undefined && options.size !== null) {
        params.append('size', options.size.toString());
      }
      if (options.sort) params.append('sort', options.sort);
    }

    const response = await apiClient.get<PageResponse<Workspace>>(
      `/api/workspaces?${params}`
    );

    // Cache workspaces
    response.content.forEach(workspace => {
      this.workspaceCache.set(workspace.id, workspace);
    });

    return response;
  }

  /**
   * Create new workspace
   */
  async createWorkspace(data: WorkspaceCreate): Promise<Workspace> {
    const workspace = await apiClient.post<Workspace>('/api/workspaces', data);
    this.workspaceCache.set(workspace.id, workspace);

    return workspace;
  }

  /**
   * Update workspace
   */
  async updateWorkspace(
    workspaceId: string,
    updates: WorkspaceUpdate
  ): Promise<Workspace> {
    const workspace = await apiClient.patch<Workspace>(
      `/api/workspaces/${workspaceId}`,
      updates
    );

    this.workspaceCache.set(workspaceId, workspace);
    if (this.currentWorkspace?.id === workspaceId) {
      this.currentWorkspace = workspace;
    }

    return workspace;
  }

  /**
   * Delete workspace
   */
  async deleteWorkspace(workspaceId: string): Promise<void> {
    await apiClient.delete(`/api/workspaces/${workspaceId}`);
    
    this.workspaceCache.delete(workspaceId);
    this.settingsCache.delete(workspaceId);
    this.membersCache.delete(workspaceId);
    
    if (this.currentWorkspace?.id === workspaceId) {
      this.currentWorkspace = null;
    }
  }

  /**
   * Switch active workspace
   */
  async switchWorkspace(workspaceId: string): Promise<Workspace> {
    const workspace = await apiClient.post<Workspace>(
      `/api/workspaces/${workspaceId}/switch`
    );

    this.currentWorkspace = workspace;
    this.workspaceCache.set(workspaceId, workspace);

    return workspace;
  }

  /**
   * Settings Management
   */

  async getWorkspaceSettings(workspaceId: string): Promise<WorkspaceSettings> {
    // Check cache
    if (this.settingsCache.has(workspaceId)) {
      return this.settingsCache.get(workspaceId)!;
    }

    const settings = await apiClient.get<WorkspaceSettings>(
      `/api/workspaces/${workspaceId}/settings`
    );

    this.settingsCache.set(workspaceId, settings);

    return settings;
  }

  async updateWorkspaceSettings(
    workspaceId: string,
    settings: Partial<WorkspaceSettings>
  ): Promise<WorkspaceSettings> {
    const updated = await apiClient.patch<WorkspaceSettings>(
      `/api/workspaces/${workspaceId}/settings`,
      settings
    );

    this.settingsCache.set(workspaceId, updated);

    return updated;
  }

  /**
   * Member Management
   */

  async getWorkspaceMembers(
    workspaceId: string,
    options?: {
      role?: WorkspaceRole;
      active?: boolean;
      search?: string;
    }
  ): Promise<WorkspaceUser[]> {
    const params = new URLSearchParams();
    
    if (options?.role) params.append('role', options.role);
    if (options?.active !== undefined) params.append('active', options.active.toString());
    if (options?.search) params.append('search', options.search);

    const members = await apiClient.get<WorkspaceUser[]>(
      `/api/workspaces/${workspaceId}/members?${params}`
    );

    this.membersCache.set(workspaceId, members);

    return members;
  }

  async inviteMember(
    workspaceId: string,
    email: string,
    role: WorkspaceRole,
    permissions?: WorkspacePermissions
  ): Promise<WorkspaceInvite> {
    const invite = await apiClient.post<WorkspaceInvite>(
      `/api/workspaces/${workspaceId}/invites`,
      { email, role, permissions }
    );

    return invite;
  }

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    role: WorkspaceRole,
    permissions?: WorkspacePermissions
  ): Promise<WorkspaceUser> {
    const member = await apiClient.patch<WorkspaceUser>(
      `/api/workspaces/${workspaceId}/members/${userId}`,
      { role, permissions }
    );

    // Update members cache if present
    const members = this.membersCache.get(workspaceId);
    if (members) {
      const updated = members.map(m => (m.id === userId ? member : m));
      this.membersCache.set(workspaceId, updated);
    }

    return member;
  }

  async removeMember(
    workspaceId: string,
    userId: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/workspaces/${workspaceId}/members/${userId}`
    );

    // Update cache
    const members = this.membersCache.get(workspaceId);
    if (members) {
      const filtered = members.filter(m => m.id !== userId);
      this.membersCache.set(workspaceId, filtered);
    }
  }

  async getWorkspaceStorage(workspaceId: string): Promise<WorkspaceStorage> {
    return apiClient.get<WorkspaceStorage>(
      `/api/workspaces/${workspaceId}/storage`
    );
  }

  async getWorkspaceQuota(workspaceId: string): Promise<WorkspaceQuota> {
    return apiClient.get<WorkspaceQuota>(
      `/api/workspaces/${workspaceId}/quota`
    );
  }

  async getWorkspaceUsage(
    workspaceId: string,
    period?: 'day' | 'week' | 'month' | 'year'
  ): Promise<WorkspaceUsage> {
    const params = period ? `?period=${period}` : '';
    return apiClient.get<WorkspaceUsage>(
      `/api/workspaces/${workspaceId}/usage${params}`
    );
  }

  async cleanupStorage(
    workspaceId: string,
    options?: {
      deleteOldVersions?: boolean;
      deleteOrphans?: boolean;
      compressImages?: boolean;
    }
  ): Promise<{ freedSpace: number }> {
    return apiClient.post(
      `/api/workspaces/${workspaceId}/storage/cleanup`,
      options || {}
    );
  }

  /**
   * Statistics and Analytics
   */

  async getWorkspaceStatistics(
    workspaceId: string
  ): Promise<WorkspaceStats> {
    return apiClient.get<WorkspaceStats>(
      `/api/workspaces/${workspaceId}/statistics`
    );
  }
  async getWorkspaceAnalytics(
    workspaceId: string,
    startDate: Date,
    endDate: Date,
    metrics?: string[]
  ): Promise<any> {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      ...(metrics && { metrics: metrics.join(',') })
    });

    return apiClient.get(
      `/api/workspaces/${workspaceId}/analytics?${params}`
    );
  }

  /**
   * Billing and Subscription
   */

  async getWorkspaceBilling(workspaceId: string): Promise<WorkspaceBilling> {
    return apiClient.get<WorkspaceBilling>(
      `/api/workspaces/${workspaceId}/billing`
    );
  }

  async updateBillingPlan(
    workspaceId: string,
    planId: string
  ): Promise<WorkspaceBilling> {
    return apiClient.post<WorkspaceBilling>(
      `/api/workspaces/${workspaceId}/billing/plan`,
      { planId }
    );
  }

  async getBillingHistory(
    workspaceId: string,
    limit: number = 12
  ): Promise<any[]> {
    return apiClient.get<any[]>(
      `/api/workspaces/${workspaceId}/billing/history?limit=${limit}`
    );
  }

  /**
   * Notifications
   */

  async getNotificationSettings(
    workspaceId: string
  ): Promise<WorkspaceNotifications> {
    return apiClient.get<WorkspaceNotifications>(
      `/api/workspaces/${workspaceId}/notifications`
    );
  }

  async updateNotificationSettings(
    workspaceId: string,
    settings: Partial<WorkspaceNotifications>
  ): Promise<WorkspaceNotifications> {
    return apiClient.patch<WorkspaceNotifications>(
      `/api/workspaces/${workspaceId}/notifications`,
      settings
    );
  }

  /**
   * Integrations
   */

  async getIntegrations(
    workspaceId: string
  ): Promise<WorkspaceIntegration[]> {
    return apiClient.get<WorkspaceIntegration[]>(
      `/api/workspaces/${workspaceId}/integrations`
    );
  }

  async addIntegration(
    workspaceId: string,
    integration: Partial<WorkspaceIntegration>
  ): Promise<WorkspaceIntegration> {
    return apiClient.post<WorkspaceIntegration>(
      `/api/workspaces/${workspaceId}/integrations`,
      integration
    );
  }

  async updateIntegration(
    workspaceId: string,
    integrationId: string,
    updates: Partial<WorkspaceIntegration>
  ): Promise<WorkspaceIntegration> {
    return apiClient.patch<WorkspaceIntegration>(
      `/api/workspaces/${workspaceId}/integrations/${integrationId}`,
      updates
    );
  }

  async removeIntegration(
    workspaceId: string,
    integrationId: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/workspaces/${workspaceId}/integrations/${integrationId}`
    );
  }

  /**
   * Theme and Customization
   */

  async getWorkspaceTheme(workspaceId: string): Promise<WorkspaceTheme> {
    return apiClient.get<WorkspaceTheme>(
      `/api/workspaces/${workspaceId}/theme`
    );
  }

  async updateWorkspaceTheme(
    workspaceId: string,
    theme: Partial<WorkspaceTheme>
  ): Promise<WorkspaceTheme> {
    return apiClient.patch<WorkspaceTheme>(
      `/api/workspaces/${workspaceId}/theme`,
      theme
    );
  }

  /**
   * Export and Backup
   */

  async exportWorkspace(
    workspaceId: string,
    format: 'json' | 'zip',
    options?: {
      includeProjects?: boolean;
      includeMembers?: boolean;
      includeSettings?: boolean;
    }
  ): Promise<WorkspaceExport> {
    const params = new URLSearchParams({ format });
    
    if (options?.includeProjects) params.append('includeProjects', 'true');
    if (options?.includeMembers) params.append('includeMembers', 'true');
    if (options?.includeSettings) params.append('includeSettings', 'true');

    return apiClient.get<WorkspaceExport>(
      `/api/workspaces/${workspaceId}/export?${params}`
    );
  }

  async createBackup(
    workspaceId: string,
    description?: string
  ): Promise<WorkspaceBackup> {
    return apiClient.post<WorkspaceBackup>(
      `/api/workspaces/${workspaceId}/backups`,
      { description }
    );
  }

  async getBackups(workspaceId: string): Promise<WorkspaceBackup[]> {
    return apiClient.get<WorkspaceBackup[]>(
      `/api/workspaces/${workspaceId}/backups`
    );
  }

  async restoreBackup(
    workspaceId: string,
    backupId: string
  ): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/backups/${backupId}/restore`
    );

    // Clear all caches after restore
    this.clearCache();
  }

  /**
   * Audit Logs
   */

  async getAuditLogs(
    workspaceId: string,
    options?: {
      startDate?: Date;
      endDate?: Date;
      userId?: string;
      action?: string;
      limit?: number;
    }
  ): Promise<WorkspaceAuditLog[]> {
    const params = new URLSearchParams();
    
    if (options?.startDate) params.append('startDate', options.startDate.toISOString());
    if (options?.endDate) params.append('endDate', options.endDate.toISOString());
    if (options?.userId) params.append('userId', options.userId);
    if (options?.action) params.append('action', options.action);
    if (options?.limit) params.append('limit', options.limit.toString());

    return apiClient.get<WorkspaceAuditLog[]>(
      `/api/workspaces/${workspaceId}/audit-logs?${params}`
    );
  }

  /**
   * Utility Methods
   */

  private isCacheValid(timestamp?: Date | string | null): boolean {
    if (!timestamp) return false;
    const cacheTime = 10 * 60 * 1000; // 10 minutes for workspace data
    const time = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return Date.now() - time.getTime() < cacheTime;
  }

  clearCache(): void {
    this.currentWorkspace = null;
    this.workspaceCache.clear();
    this.settingsCache.clear();
    this.membersCache.clear();
  }

  getCurrentWorkspaceId(): string | null {
    return this.currentWorkspace?.id || null;
  }

  isWorkspaceOwner(workspaceId: string, userId: string): boolean {
    const workspace = this.workspaceCache.get(workspaceId);
    return workspace?.ownerId === userId;
  }

  hasPermission(
    workspaceId: string,
    userId: string,
    permission: keyof WorkspacePermissions
  ): boolean {
    const members = this.membersCache.get(workspaceId);
    const member = members?.find(m => m.id === userId);
    
    if (!member) return false;
    
    // Owners have all permissions
    if (this.isWorkspaceOwner(workspaceId, userId)) return true;
    
    // Check specific permission
    return member.permissions?.[permission] === true;
  }
}

// Export singleton instance
export const workspaceService = new WorkspaceService();