/**
 * Project Service
 * API service for project management
 * @module features/project/services/projectService
 */

import { apiClient } from '../../workspace/services/apiClient';
import type {
  Project,
  ProjectStatus,
  ProjectType,
  ProjectFilterOptions,
  ProjectSortOptions,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectResponse,
  ProjectListResponse,
  ProjectTemplate,
  ProjectVersion,
  ProjectCollaborator,
  ProjectAttachment,
  ProjectExport,
  ExportFormat,
  ProjectAnalytics,
  ProjectSummary,
  ProjectRole,
  ProjectPermissions
} from '../types';

// ============================================================================
// API ENDPOINTS
// ============================================================================

const ENDPOINTS = {
  // Projects
  projects: '/api/projects',
  project: (id: string) => `/api/projects/${id}`,
  workspaceProjects: (workspaceId: string) => `/api/workspaces/${workspaceId}/projects`,
  
  // Templates
  templates: '/api/projects/templates',
  template: (id: string) => `/api/projects/templates/${id}`,
  fromTemplate: '/api/projects/from-template',
  saveAsTemplate: (projectId: string) => `/api/projects/${projectId}/save-as-template`,
  
  // Versions
  versions: (projectId: string) => `/api/projects/${projectId}/versions`,
  version: (projectId: string, versionId: string) => `/api/projects/${projectId}/versions/${versionId}`,
  restoreVersion: (projectId: string, versionId: string) => `/api/projects/${projectId}/versions/${versionId}/restore`,
  compare: (projectId: string) => `/api/projects/${projectId}/versions/compare`,
  
  // Collaborators
  collaborators: (projectId: string) => `/api/projects/${projectId}/collaborators`,
  collaborator: (projectId: string, userId: string) => `/api/projects/${projectId}/collaborators/${userId}`,
  invite: (projectId: string) => `/api/projects/${projectId}/invite`,
  permissions: (projectId: string) => `/api/projects/${projectId}/permissions`,
  
  // Attachments
  attachments: (projectId: string) => `/api/projects/${projectId}/attachments`,
  attachment: (projectId: string, attachmentId: string) => `/api/projects/${projectId}/attachments/${attachmentId}`,
  upload: (projectId: string) => `/api/projects/${projectId}/attachments/upload`,
  download: (projectId: string, attachmentId: string) => `/api/projects/${projectId}/attachments/${attachmentId}/download`,
  
  // Actions
  duplicate: (projectId: string) => `/api/projects/${projectId}/duplicate`,
  archive: (projectId: string) => `/api/projects/${projectId}/archive`,
  restore: (projectId: string) => `/api/projects/${projectId}/restore`,
  delete: (projectId: string) => `/api/projects/${projectId}`,
  
  // Bulk operations
  bulkUpdate: '/api/projects/bulk/update',
  bulkDelete: '/api/projects/bulk/delete',
  bulkArchive: '/api/projects/bulk/archive',
  bulkMove: '/api/projects/bulk/move',
  bulkExport: '/api/projects/bulk/export',
  
  // Export/Import
  export: (projectId: string) => `/api/projects/${projectId}/export`,
  exportMultiple: '/api/projects/export',
  import: '/api/projects/import',
  
  // Search & Analytics
  search: '/api/projects/search',
  recent: '/api/projects/recent',
  analytics: (projectId: string) => `/api/projects/${projectId}/analytics`,
  statistics: '/api/projects/statistics',
  activity: (projectId: string) => `/api/projects/${projectId}/activity`,
  
  // Content
  content: (projectId: string) => `/api/projects/${projectId}/content`,
  preview: (projectId: string) => `/api/projects/${projectId}/preview`,
  publish: (projectId: string) => `/api/projects/${projectId}/publish`
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface ProjectSearchParams {
  query: string;
  workspaceId?: string;
  filters?: ProjectFilterOptions;
  page?: number;
  pageSize?: number;
}

interface BulkOperationResult {
  successful: string[];
  failed: Array<{ id: string; error: string }>;
}

interface VersionComparison {
  version1: ProjectVersion;
  version2: ProjectVersion;
  differences: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

class ProjectService {
  // ============================================================================
  // PROJECT CRUD
  // ============================================================================

  /**
   * Get projects for a workspace
   */
  async getProjects(
    workspaceId: string,
    options?: {
      page?: number;
      pageSize?: number;
      sort?: ProjectSortOptions;
      startDate?: Date;
      endDate?: Date;
    } & ProjectFilterOptions
  ): Promise<ProjectListResponse> {
    try {
      const params = new URLSearchParams();
      
      // Pagination
      if (options?.page) params.append('page', String(options.page));
      if (options?.pageSize) params.append('pageSize', String(options.pageSize));
      
      // Sorting
      if (options?.sort) {
        params.append('sortBy', options.sort.field);
        params.append('sortOrder', options.sort.direction);
      }
      
      // Filtering
      if (options?.status) {
        if (Array.isArray(options.status)) {
          options.status.forEach(s => params.append('status', s));
        } else {
          params.append('status', options.status);
        }
      }
      
      if (options?.type) {
        if (Array.isArray(options.type)) {
          options.type.forEach(t => params.append('type', t));
        } else {
          params.append('type', options.type);
        }
      }
      
      if (options?.tags) {
        options.tags.forEach(tag => params.append('tag', tag));
      }
      
      if ((options as any).categories) {
        (options as any).categories.forEach((cat: string) => params.append('category', cat));
      }
      
      if (options?.startDate) {
        params.append('startDate', options.startDate.toISOString());
      }
      
      if (options?.endDate) {
        params.append('endDate', options.endDate.toISOString());
      }
      
      if (options?.searchQuery) {
        params.append('q', options.searchQuery);
      }
      
      const response = await apiClient.get<ProjectListResponse>(
        `${ENDPOINTS.workspaceProjects(workspaceId)}?${params}`
      );
      
      return response;
    } catch (error) {
      console.error('Failed to get projects:', error);
      throw error;
    }
  }

  /**
   * Get a single project
   */
  async getProject(projectId: string): Promise<Project> {
    try {
      const response = await apiClient.get<Project>(
        ENDPOINTS.project(projectId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get project:', error);
      throw error;
    }
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectRequest): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.projects,
        {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }

  /**
   * Update a project
   */
  async updateProject(
    projectId: string,
    updates: UpdateProjectRequest
  ): Promise<Project> {
    try {
      const response = await apiClient.patch<Project>(
        ENDPOINTS.project(projectId),
        {
          ...updates,
          updatedAt: new Date()
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      await apiClient.delete(ENDPOINTS.delete(projectId));
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }

  /**
   * Archive a project
   */
  async archiveProject(projectId: string): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.archive(projectId),
        {}
      );
      return response;
    } catch (error) {
      console.error('Failed to archive project:', error);
      throw error;
    }
  }

  /**
   * Restore an archived project
   */
  async restoreProject(projectId: string): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.restore(projectId),
        {}
      );
      return response;
    } catch (error) {
      console.error('Failed to restore project:', error);
      throw error;
    }
  }

  /**
   * Duplicate a project
   */
  async duplicateProject(
    projectId: string,
    name?: string
  ): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.duplicate(projectId),
        { name: name || undefined }
      );
      return response;
    } catch (error) {
      console.error('Failed to duplicate project:', error);
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
    category?: string,
    type?: ProjectType
  ): Promise<ProjectTemplate[]> {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (type) params.append('type', type);
      
      const response = await apiClient.get<ProjectTemplate[]>(
        `${ENDPOINTS.templates}?${params}`
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
  async getTemplate(templateId: string): Promise<ProjectTemplate> {
    try {
      const response = await apiClient.get<ProjectTemplate>(
        ENDPOINTS.template(templateId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get template:', error);
      throw error;
    }
  }

  /**
   * Create project from template
   */
  async createFromTemplate(
    templateId: string,
    data: Partial<CreateProjectRequest>
  ): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.fromTemplate,
        {
          templateId,
          ...data
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create from template:', error);
      throw error;
    }
  }

  /**
   * Save project as template
   */
  async saveAsTemplate(
    projectId: string,
    name: string,
    description: string
  ): Promise<ProjectTemplate> {
    try {
      const response = await apiClient.post<ProjectTemplate>(
        ENDPOINTS.saveAsTemplate(projectId),
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

  // ============================================================================
  // VERSIONS
  // ============================================================================

  /**
   * Get project versions
   */
  async getVersions(projectId: string): Promise<ProjectVersion[]> {
    try {
      const response = await apiClient.get<ProjectVersion[]>(
        ENDPOINTS.versions(projectId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get versions:', error);
      throw error;
    }
  }

  /**
   * Create a new version
   */
  async createVersion(
    projectId: string,
    label?: string
  ): Promise<ProjectVersion> {
    try {
      const response = await apiClient.post<ProjectVersion>(
        ENDPOINTS.versions(projectId),
        {
          label: label || `Version ${Date.now()}`,
          createdAt: new Date()
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to create version:', error);
      throw error;
    }
  }

  /**
   * Restore a version
   */
  async restoreVersion(
    projectId: string,
    versionId: string
  ): Promise<Project> {
    try {
      const response = await apiClient.post<Project>(
        ENDPOINTS.restoreVersion(projectId, versionId),
        {}
      );
      return response;
    } catch (error) {
      console.error('Failed to restore version:', error);
      throw error;
    }
  }

  /**
   * Delete a version
   */
  async deleteVersion(
    projectId: string,
    versionId: string
  ): Promise<void> {
    try {
      await apiClient.delete(
        ENDPOINTS.version(projectId, versionId)
      );
    } catch (error) {
      console.error('Failed to delete version:', error);
      throw error;
    }
  }

  /**
   * Compare two versions
   */
  async compareVersions(
    projectId: string,
    versionId1: string,
    versionId2: string
  ): Promise<VersionComparison> {
    try {
      const response = await apiClient.post<VersionComparison>(
        ENDPOINTS.compare(projectId),
        {
          version1: versionId1,
          version2: versionId2
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to compare versions:', error);
      throw error;
    }
  }

  // ============================================================================
  // COLLABORATORS
  // ============================================================================

  /**
   * Get project collaborators
   */
  async getCollaborators(projectId: string): Promise<ProjectCollaborator[]> {
    try {
      const response = await apiClient.get<ProjectCollaborator[]>(
        ENDPOINTS.collaborators(projectId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get collaborators:', error);
      throw error;
    }
  }

  /**
   * Add a collaborator
   */
  async addCollaborator(
    projectId: string,
    userId: string,
    role: string
  ): Promise<ProjectCollaborator> {
    try {
      const response = await apiClient.post<ProjectCollaborator>(
        ENDPOINTS.collaborators(projectId),
        {
          userId,
          role,
          addedAt: new Date()
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to add collaborator:', error);
      throw error;
    }
  }

  /**
   * Update collaborator role
   */
  async updateCollaborator(
    projectId: string,
    userId: string,
    role: string
  ): Promise<ProjectCollaborator> {
    try {
      const response = await apiClient.patch<ProjectCollaborator>(
        ENDPOINTS.collaborator(projectId, userId),
        { role }
      );
      return response;
    } catch (error) {
      console.error('Failed to update collaborator:', error);
      throw error;
    }
  }

  /**
   * Remove a collaborator
   */
  async removeCollaborator(
    projectId: string,
    userId: string
  ): Promise<void> {
    try {
      await apiClient.delete(
        ENDPOINTS.collaborator(projectId, userId)
      );
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
      throw error;
    }
  }

  /**
   * Invite collaborators by email
   */
  async inviteCollaborators(
    projectId: string,
    emails: string[],
    role: ProjectRole,
    message?: string
  ): Promise<{ sent: string[]; failed: string[] }> {
    try {
      const response = await apiClient.post<{ sent: string[]; failed: string[] }>(
        ENDPOINTS.invite(projectId),
        {
          emails,
          role,
          message
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to invite collaborators:', error);
      throw error;
    }
  }

  /**
   * Update project permissions
   */
  async updatePermissions(
    projectId: string,
    permissions: Partial<ProjectPermissions>
  ): Promise<ProjectPermissions> {
    try {
      const response = await apiClient.patch<ProjectPermissions>(
        ENDPOINTS.permissions(projectId),
        permissions
      );
      return response;
    } catch (error) {
      console.error('Failed to update permissions:', error);
      throw error;
    }
  }

  // ============================================================================
  // ATTACHMENTS
  // ============================================================================

  /**
   * Get project attachments
   */
  async getAttachments(projectId: string): Promise<ProjectAttachment[]> {
    try {
      const response = await apiClient.get<ProjectAttachment[]>(
        ENDPOINTS.attachments(projectId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get attachments:', error);
      throw error;
    }
  }

  /**
   * Upload an attachment
   */
  async uploadAttachment(
    projectId: string,
    file: File,
    metadata?: {
      description?: string;
      tags?: string[];
    }
  ): Promise<ProjectAttachment> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (metadata?.description) {
        formData.append('description', metadata.description);
      }
      if (metadata?.tags) {
        formData.append('tags', JSON.stringify(metadata.tags));
      }
      
      const response = await apiClient.post<ProjectAttachment>(
        ENDPOINTS.upload(projectId),
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
      console.error('Failed to upload attachment:', error);
      throw error;
    }
  }

  /**
   * Delete an attachment
   */
  async deleteAttachment(
    projectId: string,
    attachmentId: string
  ): Promise<void> {
    try {
      await apiClient.delete(
        ENDPOINTS.attachment(projectId, attachmentId)
      );
    } catch (error) {
      console.error('Failed to delete attachment:', error);
      throw error;
    }
  }

  /**
   * Download an attachment
   */
  async downloadAttachment(
    projectId: string,
    attachmentId: string
  ): Promise<void> {
    try {
      const blob = await apiClient.get<Blob>(
        ENDPOINTS.download(projectId, attachmentId),
        {
          responseType: 'blob',
          url: ''
        }
      );

      // apiClient.get returns the Blob directly (no headers available),
      // so use a sensible fallback filename based on the attachment id.
      const filename = `attachment_${attachmentId}`;

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download attachment:', error);
      throw error;
    }
  }

  // ============================================================================
  // BULK OPERATIONS
  // ============================================================================

  /**
   * Bulk update projects
   */
  async bulkUpdateProjects(
    projectIds: string[],
    updates: UpdateProjectRequest
  ): Promise<BulkOperationResult> {
    try {
      const response = await apiClient.post<BulkOperationResult>(
        ENDPOINTS.bulkUpdate,
        {
          projectIds,
          updates
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to bulk update projects:', error);
      throw error;
    }
  }

  /**
   * Bulk delete projects
   */
  async bulkDeleteProjects(projectIds: string[]): Promise<BulkOperationResult> {
    try {
      const response = await apiClient.post<BulkOperationResult>(
        ENDPOINTS.bulkDelete,
        { projectIds }
      );
      return response;
    } catch (error) {
      console.error('Failed to bulk delete projects:', error);
      throw error;
    }
  }

  /**
   * Bulk archive projects
   */
  async bulkArchiveProjects(projectIds: string[]): Promise<BulkOperationResult> {
    try {
      const response = await apiClient.post<BulkOperationResult>(
        ENDPOINTS.bulkArchive,
        { projectIds }
      );
      return response;
    } catch (error) {
      console.error('Failed to bulk archive projects:', error);
      throw error;
    }
  }

  /**
   * Bulk move projects
   */
  async bulkMoveProjects(
    projectIds: string[],
    targetWorkspaceId: string
  ): Promise<BulkOperationResult> {
    try {
      const response = await apiClient.post<BulkOperationResult>(
        ENDPOINTS.bulkMove,
        {
          projectIds,
          targetWorkspaceId
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to bulk move projects:', error);
      throw error;
    }
  }

  // ============================================================================
  // EXPORT/IMPORT
  // ============================================================================

  /**
   * Export a project
   */
  async exportProject(
    projectId: string,
    format: ExportFormat,
    options?: ProjectExport
  ): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append('format', format);
      
      if (options) {
        const opts = options as Record<string, any>;
        Object.entries(opts).forEach(([key, value]) => {
          if (value === true) {
            params.append(key, 'true');
          } else if (value !== undefined && value !== null && value !== false) {
            params.append(key, String(value));
          }
        });
      }
      
      const response = await apiClient.get<Blob>(
        `${ENDPOINTS.export(projectId)}?${params}`,
        {
          responseType: 'blob',
          url: ''
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to export project:', error);
      throw error;
    }
  }

  /**
   * Export multiple projects
   */
  async exportProjects(
    projectIds: string[],
    format: ExportFormat
  ): Promise<Blob> {
    try {
      const response = await apiClient.post<Blob>(
        ENDPOINTS.exportMultiple,
        {
          projectIds,
          format
        },
        {
          responseType: 'blob',
          url: ''
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to export projects:', error);
      throw error;
    }
  }

  /**
   * Import projects from file
   */
  async importProjects(
    file: File,
    workspaceId: string,
    options?: {
      overwrite?: boolean;
      preserveIds?: boolean;
    }
  ): Promise<Project[]> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('workspaceId', workspaceId);
      
      if (options?.overwrite) {
        formData.append('overwrite', 'true');
      }
      if (options?.preserveIds) {
        formData.append('preserveIds', 'true');
      }
      
      const response = await apiClient.post<Project[]>(
        ENDPOINTS.import,
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
      console.error('Failed to import projects:', error);
      throw error;
    }
  }

  // ============================================================================
  // SEARCH & ANALYTICS
  // ============================================================================

  /**
   * Search projects
   */
  async searchProjects(
    workspaceId: string,
    query: string,
    options?: {
      filters?: ProjectFilterOptions;
      page?: number;
      pageSize?: number;
    }
  ): Promise<ProjectSummary[]> {
    try {
      const params: ProjectSearchParams = {
        query,
        workspaceId,
        filters: options?.filters,
        page: options?.page,
        pageSize: options?.pageSize
      };
      
      const response = await apiClient.post<ProjectSummary[]>(
        ENDPOINTS.search,
        params
      );
      return response;
    } catch (error) {
      console.error('Failed to search projects:', error);
      throw error;
    }
  }

  /**
   * Get recent projects
   */
  async getRecentProjects(
    workspaceId: string,
    limit: number = 10
  ): Promise<ProjectSummary[]> {
    try {
      const response = await apiClient.get<ProjectSummary[]>(
        `${ENDPOINTS.recent}?workspaceId=${workspaceId}&limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get recent projects:', error);
      throw error;
    }
  }

  /**
   * Get project analytics
   */
  async getProjectAnalytics(
    projectId: string,
    period?: 'day' | 'week' | 'month' | 'year' | 'all'
  ): Promise<ProjectAnalytics> {
    try {
      const params = period ? `?period=${period}` : '';
      const response = await apiClient.get<ProjectAnalytics>(
        `${ENDPOINTS.analytics(projectId)}${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get project analytics:', error);
      throw error;
    }
  }

  /**
   * Get project statistics
   */
  async getStatistics(
    workspaceId?: string,
    filters?: ProjectFilterOptions & { startDate?: Date; endDate?: Date }
  ): Promise<{
    total: number;
    byStatus: Record<ProjectStatus, number>;
    byType: Record<ProjectType, number>;
    recentActivity: number;
    completionRate: number;
  }> {
    try {
      const params = new URLSearchParams();
      if (workspaceId) params.append('workspaceId', workspaceId);
      
      if (filters?.startDate) {
        params.append('startDate', filters.startDate.toISOString());
      }
      if (filters?.endDate) {
        params.append('endDate', filters.endDate.toISOString());
      }
      
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
   * Get project activity
   */
  async getProjectActivity(
    projectId: string,
    options?: {
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (options?.limit) params.append('limit', String(options.limit));
      if (options?.offset) params.append('offset', String(options.offset));
      if (options?.startDate) params.append('startDate', options.startDate.toISOString());
      if (options?.endDate) params.append('endDate', options.endDate.toISOString());
      
      const response = await apiClient.get<any[]>(
        `${ENDPOINTS.activity(projectId)}?${params}`
      );
      return response;
    } catch (error) {
      console.error('Failed to get project activity:', error);
      throw error;
    }
  }

  // ============================================================================
  // CONTENT MANAGEMENT
  // ============================================================================

  /**
   * Get project content
   */
  async getProjectContent(projectId: string): Promise<any> {
    try {
      const response = await apiClient.get<any>(
        ENDPOINTS.content(projectId)
      );
      return response;
    } catch (error) {
      console.error('Failed to get project content:', error);
      throw error;
    }
  }

  /**
   * Update project content
   */
  async updateProjectContent(
    projectId: string,
    content: any
  ): Promise<void> {
    try {
      await apiClient.put(
        ENDPOINTS.content(projectId),
        content
      );
    } catch (error) {
      console.error('Failed to update project content:', error);
      throw error;
    }
  }

  /**
   * Get project preview
   */
  async getProjectPreview(projectId: string): Promise<string> {
    try {
      const response = await apiClient.get<{ preview: string }>(
        ENDPOINTS.preview(projectId)
      );
      return response.preview;
    } catch (error) {
      console.error('Failed to get project preview:', error);
      throw error;
    }
  }

  /**
   * Publish project
   */
  async publishProject(
    projectId: string,
    options?: {
      visibility?: 'private' | 'public' | 'unlisted';
      password?: string;
      expiresAt?: Date;
    }
  ): Promise<{
    url: string;
    publishedAt: Date;
    expiresAt?: Date;
  }> {
    try {
      const response = await apiClient.post<any>(
        ENDPOINTS.publish(projectId),
        options || {}
      );
      return response;
    } catch (error) {
      console.error('Failed to publish project:', error);
      throw error;
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Validate project name
   */
  async validateProjectName(
    name: string,
    workspaceId: string,
    excludeId?: string
  ): Promise<{ valid: boolean; message?: string }> {
    try {
      const response = await apiClient.post<{ valid: boolean; message?: string }>(
        '/api/projects/validate-name',
        {
          name,
          workspaceId,
          excludeId
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to validate project name:', error);
      return { valid: false, message: 'Validation failed' };
    }
  }

  /**
   * Generate project slug
   */
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  }

  /**
   * Check project permissions
   */
  async checkPermissions(
    projectId: string,
    permission: keyof ProjectPermissions
  ): Promise<boolean> {
    try {
      const response = await apiClient.get<{ hasPermission: boolean }>(
        `/api/projects/${projectId}/check-permission/${permission}`
      );
      return response.hasPermission;
    } catch (error) {
      console.error('Failed to check permissions:', error);
      return false;
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const projectService = new ProjectService();
