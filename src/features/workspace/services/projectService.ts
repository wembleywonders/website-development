/**
 * Project Service - Complete project management operations
 * Features: CRUD, versions, templates, search, tags, duplication
 * @module features/workspace/services/projectService
 */

import { apiClient } from './apiClient';
import type {
  Project,
  ProjectFilters,
  ProjectTag,
  ProjectStatus,
  ProjectDuplicateOptions,
  ProjectArchiveOptions,
  ProjectRestoreOptions
} from '../types';

/**
 * Local fallback type for JourneyStep when it's not exported from ../types
 */
type JourneyStep = {
  id?: string | number;
  name?: string;
  completed?: boolean;
  order?: number;
  [key: string]: any;
};

/**
 * Local fallback type for ProjectMetadata when it's not exported from ../types
 */
type ProjectMetadata = {
  [key: string]: any;
  createdBy?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

/**
/**
/**
 * Local fallback type for ProjectSort when it's not exported from ../types
 */
type ProjectSort = {
  field: string;
  direction?: 'asc' | 'desc';
};

type PageRequest = {
  page: number;
  size: number;
  sort?: string;
};

type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

type ProjectSearch = {
  q?: string;
  query?: string;
  limit?: number;
  offset?: number;
  fields?: string[];
  includeArchived?: boolean;
};
/**
/**
 * Local fallback type for ProjectExport when it's not exported from ../types
 */
type ProjectExport = {
  data: any;
  filename?: string;
  format?: string;
  [key: string]: any;
};

// Local fallback type for ValidationResult when it's not exported from ../types
type ValidationResult = {
  valid: boolean;
  errors?: Array<{ field?: string; message: string }>;
  warnings?: string[];
  [key: string]: any;
};
// Local fallback type for ProjectImport when it's not exported from ../types
// Local fallback type for ProjectImport when it's not exported from ../types
type ProjectImport = {
  // import payload (adjust fields as needed)
  source?: any;
  name?: string;
  overwrite?: boolean;
  [key: string]: any;
};
// Local fallback type for ProjectStatistics when it's not exported from ../types
type ProjectStatistics = {
  views?: number;
  likes?: number;
  comments?: number;
  [key: string]: any;
};

// Local fallback type for ProjectContent when it's not exported from ../types
type ProjectContent = {
  // basic content structure; adjust fields as needed
  blocks?: any[];
  assets?: any[];
  metadata?: Record<string, any>;
  [key: string]: any;
};
// Local fallback type for ProjectTemplate when it's not exported from ../types
// Local fallback type for ProjectPermissions when it's not exported from ../types
type ProjectPermissions = {
  // basic permission flags (extend as needed)
  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  [key: string]: boolean | undefined;
};

// Local fallback type for ProjectTemplate when it's not exported from ../types
type ProjectTemplate = {
  id: string | number;
  name: string;
  description?: string;
  category?: string;
  createdAt?: string | Date;
  [key: string]: any;
};

// Local fallback type for ProjectVersion when it's not exported from ../types
// Includes createdAt because the service cache validation relies on it.
type ProjectVersion = {
  id: string | number;
  createdAt: string | Date;
  message?: string;
  [key: string]: any;
};

// Local fallback type for ProjectCollaborator when it's not exported from ../types
type ProjectCollaborator = {
  id: string | number;
  userId?: string | number;
  permissions?: ProjectPermissions;
  role?: string;
  [key: string]: any;
};
/**
 * Project management service with full CRUD operations
 */
class ProjectService {
  private projectCache: Map<string | number, Project> = new Map();
  private versionCache: Map<string | number, ProjectVersion[]> = new Map();
  private templateCache: Map<string, ProjectTemplate[]> = new Map();
  private lastSyncTime: Date | null = null;

  /**
   * Create a new project
   */
  async createProject(
    workspaceId: string,
    data: Partial<Project>
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects`,
      data
    );
    // Cache the new project
    this.projectCache.set(project.id, project);

    return project;
  }

  /**
   * Get project by ID
   */
  async getProject(
    workspaceId: string,
    projectId: string,
    includeContent: boolean = false
  ): Promise<Project> {
    // Check cache for basic project data
    if (!includeContent && this.projectCache.has(projectId)) {
      const cached = this.projectCache.get(projectId)!;
      if (this.isCacheValid(cached.updatedAt)) {
        return cached;
      }
    }

    const params = includeContent ? '?includeContent=true' : '';
    const project = await apiClient.get<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}${params}`
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  /**
   * Get all projects with pagination and filtering
   */
  async getProjects(
    workspaceId: string,
    options?: {
      page?: PageRequest;
      filter?: ProjectFilters;
      sort?: ProjectSort;
      includeArchived?: boolean;
    }
  ): Promise<PageResponse<Project>> {
    const params = new URLSearchParams();

    // Pagination
    if (options?.page) {
      params.append('page', options.page.page.toString());
      params.append('size', options.page.size.toString());
      if (options.page.sort) {
        params.append('sort', options.page.sort);
      }
    }

    // Filtering
    if (options?.filter) {
      if (options.filter.search) {
        params.append('search', options.filter.search);
      }
      if (options.filter.tags?.length) {
        params.append('tags', options.filter.tags.join(','));
      }
      if (options.filter.journeyStep) {
        params.append('journeyStep', options.filter.journeyStep);
      }
      if (options.filter.status) {
        params.append('status', options.filter.status);
      }
      if (options.filter.createdAfter) {
        params.append('createdAfter', options.filter.createdAfter.toISOString());
      }
      if (options.filter.createdBefore) {
        params.append('createdBefore', options.filter.createdBefore.toISOString());
      }
    }

    // Sorting
    if (options?.sort) {
      params.append('sortBy', options.sort.field);
      if (options.sort.direction) {
        params.append('sortDirection', options.sort.direction);
      }
    }

    // Include archived
    if (options?.includeArchived) {
      params.append('includeArchived', 'true');
    }

    const response = await apiClient.get<PageResponse<Project>>(
      `/api/workspaces/${workspaceId}/projects?${params}`
    );

    // Cache projects
    response.content.forEach((project: Project) => {
      this.projectCache.set(project.id, project);
    });

    return response;
  }

  /**
   * Update project
   */
  async updateProject(
    workspaceId: string,
    projectId: string,
    updates: Partial<Project>
  ): Promise<Project> {
    const project = await apiClient.patch<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}`,
      updates
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }
  /**
   * Update project content
   */
  async updateProjectContent(
    workspaceId: string,
    projectId: string,
    content: ProjectContent
  ): Promise<Project> {
    const project = await apiClient.put<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/content`,
      content
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  /**
   * Delete project
   */
  async deleteProject(
    workspaceId: string,
    projectId: string,
    permanent: boolean = false
  ): Promise<void> {
    const params = permanent ? '?permanent=true' : '';
    await apiClient.delete(
      `/api/workspaces/${workspaceId}/projects/${projectId}${params}`
    );

    // Remove from cache
    this.projectCache.delete(projectId);
    this.versionCache.delete(projectId);
  }

  /**
   * Duplicate project
   */
  async duplicateProject(
    workspaceId: string,
    projectId: string,
    options?: ProjectDuplicateOptions
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/duplicate`,
      options || {}
    );

    // Cache the new project
    this.projectCache.set(project.id, project);

    return project;
  }

  /**
   * Archive project
   */
  async archiveProject(
    workspaceId: string,
    projectId: string,
    options?: ProjectArchiveOptions
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/archive`,
      options || {}
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  /**
   * Restore archived project
   */
  async restoreProject(
    workspaceId: string,
    projectId: string,
    options?: ProjectRestoreOptions
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/restore`,
      options || {}
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  /**
   * Search projects
   */
  async searchProjects(
    workspaceId: string,
    query: string,
    options?: ProjectSearch
  ): Promise<Project[]> {
    const params = new URLSearchParams({ q: query });

    if (options) {
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.offset) params.append('offset', options.offset.toString());
      if (options.fields?.length) params.append('fields', options.fields.join(','));
      if (options.includeArchived) params.append('includeArchived', 'true');
    }

    const projects = await apiClient.get<Project[]>(
      `/api/workspaces/${workspaceId}/projects/search?${params}`
    );

    // Cache results
    projects.forEach(project => {
      this.projectCache.set(project.id, project);
    });

    return projects;
  }

  /**
   * Version Management
   */

  async getProjectVersions(
    workspaceId: string,
    projectId: string
  ): Promise<ProjectVersion[]> {
    // Check cache
    if (this.versionCache.has(projectId)) {
      const cached = this.versionCache.get(projectId)!;
      if (cached.length > 0 && this.isCacheValid(cached[0].createdAt)) {
        return cached;
      }
    }

    const versions = await apiClient.get<ProjectVersion[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/versions`
    );

    // Cache versions
    this.versionCache.set(projectId, versions);

    return versions;
  }

  async createProjectVersion(
    workspaceId: string,
    projectId: string,
    message?: string
  ): Promise<ProjectVersion> {
    const version = await apiClient.post<ProjectVersion>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/versions`,
      { message }
    );

    // Update version cache
    const versions = this.versionCache.get(projectId) || [];
    versions.unshift(version);
    this.versionCache.set(projectId, versions);

    return version;
  }

  async restoreProjectVersion(
    workspaceId: string,
    projectId: string,
    versionId: string
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/versions/${versionId}/restore`
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  async compareVersions(
    workspaceId: string,
    projectId: string,
    version1: string,
    version2: string
  ): Promise<any> {
    return apiClient.get(
      `/api/workspaces/${workspaceId}/projects/${projectId}/versions/compare?v1=${version1}&v2=${version2}`
    );
  }

  /**
   * Template Management
   */

  async getProjectTemplates(
    workspaceId: string,
    category?: string
  ): Promise<ProjectTemplate[]> {
    const cacheKey = `${workspaceId}-${category || 'all'}`;
    
    // Check cache
    if (this.templateCache.has(cacheKey)) {
      return this.templateCache.get(cacheKey)!;
    }

    const params = category ? `?category=${category}` : '';
    const templates = await apiClient.get<ProjectTemplate[]>(
      `/api/workspaces/${workspaceId}/projects/templates${params}`
    );

    // Cache templates
    this.templateCache.set(cacheKey, templates);

    return templates;
  }

  async createFromTemplate(
    workspaceId: string,
    templateId: string,
    data: Partial<Project>
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/templates/${templateId}/create`,
      data
    );
    // Cache project
    this.projectCache.set(project.id, project);

    return project;
  }

  async saveProjectAsTemplate(
    workspaceId: string,
    projectId: string,
    name: string,
    description?: string
  ): Promise<ProjectTemplate> {
    const template = await apiClient.post<ProjectTemplate>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/save-as-template`,
      { name, description }
    );

    // Clear template cache
    this.templateCache.clear();

    return template;
  }
  /**
   * Collaboration
   */

  async getProjectCollaborators(
    workspaceId: string,
    projectId: string
  ): Promise<ProjectCollaborator[]> {
    return apiClient.get<ProjectCollaborator[]>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/collaborators`
    );
  }

  async addCollaborator(
    workspaceId: string,
    projectId: string,
    userId: string,
    permissions: ProjectPermissions
  ): Promise<ProjectCollaborator> {
    return apiClient.post<ProjectCollaborator>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/collaborators`,
      { userId, permissions }
    );
  }

  async updateCollaboratorPermissions(
    workspaceId: string,
    projectId: string,
    collaboratorId: string,
    permissions: ProjectPermissions
  ): Promise<ProjectCollaborator> {
    return apiClient.patch<ProjectCollaborator>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/collaborators/${collaboratorId}`,
      { permissions }
    );
  }

  async removeCollaborator(
    workspaceId: string,
    projectId: string,
    collaboratorId: string
  ): Promise<void> {
    await apiClient.delete(
      `/api/workspaces/${workspaceId}/projects/${projectId}/collaborators/${collaboratorId}`
    );
  }

  /**
   * Tags and Metadata
   */

  async getProjectTags(workspaceId: string): Promise<ProjectTag[]> {
    return apiClient.get<ProjectTag[]>(
      `/api/workspaces/${workspaceId}/projects/tags`
    );
  }

  async addProjectTags(
    workspaceId: string,
    projectId: string,
    tags: string[]
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/tags`,
      { tags }
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  async removeProjectTag(
    workspaceId: string,
    projectId: string,
    tag: string
  ): Promise<Project> {
    const project = await apiClient.delete<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/tags/${encodeURIComponent(tag)}`
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  async updateProjectMetadata(
    workspaceId: string,
    projectId: string,
    metadata: Partial<ProjectMetadata>
  ): Promise<Project> {
    const project = await apiClient.patch<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/metadata`,
      metadata
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  /**
   * Project Settings
   */

  async getProjectSettings(
    workspaceId: string,
    projectId: string
  ): Promise<ProjectStatus> {
    return apiClient.get<ProjectStatus>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/settings`
    );
  }

  async updateProjectSettings(
    workspaceId: string,
    projectId: string,
    settings: Partial<ProjectStatus>
  ): Promise<ProjectStatus> {
    return apiClient.patch<ProjectStatus>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/settings`,
      settings
    );
  }

  /**
   * Statistics and Analytics
   */

  async getProjectStatistics(
    workspaceId: string,
    projectId: string
  ): Promise<ProjectStatistics> {
    return apiClient.get<ProjectStatistics>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/statistics`
    );
  }

  /**
   * Export/Import
   */

  async exportProject(
    workspaceId: string,
    projectId: string,
    format: 'json' | 'zip' | 'pdf'
  ): Promise<ProjectExport> {
    return apiClient.get<ProjectExport>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/export?format=${format}`
    );
  }

  async importProject(
    workspaceId: string,
    data: ProjectImport
  ): Promise<Project> {
    const project = await apiClient.post<Project>(
      `/api/workspaces/${workspaceId}/projects/import`,
      data
    );

    // Cache imported project
    this.projectCache.set(project.id, project);

    return project;
  }

  /**
   * Journey Step Management
   */

  async updateJourneyStep(
    workspaceId: string,
    projectId: string,
    step: JourneyStep
  ): Promise<Project> {
    const project = await apiClient.patch<Project>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/journey-step`,
      { step }
    );

    // Update cache
    this.projectCache.set(projectId, project);

    return project;
  }

  async validateJourneyProgress(
    workspaceId: string,
    projectId: string
  ): Promise<ValidationResult> {
    return apiClient.get<ValidationResult>(
      `/api/workspaces/${workspaceId}/projects/${projectId}/validate-progress`
    );
  }

  /**
   * Batch Operations
   */

  async batchUpdateProjects(
    workspaceId: string,
    projectIds: string[],
    updates: Partial<Project>
  ): Promise<Project[]> {
    const projects = await apiClient.patch<Project[]>(
      `/api/workspaces/${workspaceId}/projects/batch`,
      { projectIds, updates }
    );

    // Update cache
    projects.forEach((project: Project) => {
      this.projectCache.set(project.id, project);
    });

    return projects;
  }

  async batchDeleteProjects(
    workspaceId: string,
    projectIds: string[]
  ): Promise<void> {
    await apiClient.post(
      `/api/workspaces/${workspaceId}/projects/batch/delete`,
      { projectIds }
    );

    // Remove from cache
    projectIds.forEach((id: any) => {
      this.projectCache.delete(id);
      this.versionCache.delete(id);
    });
  }

  /**
   * Utility Methods
   */

  private isCacheValid(timestamp: Date | string): boolean {
    const cacheTime = 5 * 60 * 1000; // 5 minutes
    const time = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return Date.now() - time.getTime() < cacheTime;
  }

  clearCache(): void {
    this.projectCache.clear();
    this.versionCache.clear();
    this.templateCache.clear();
    this.lastSyncTime = null;
  }

  getCachedProjects(): Project[] {
    return Array.from(this.projectCache.values());
  }

  getCacheSize(): number {
    return this.projectCache.size;
  }

  getLastSyncTime(): Date | null {
    return this.lastSyncTime;
  }
}

// Export singleton instance
export const projectService = new ProjectService();