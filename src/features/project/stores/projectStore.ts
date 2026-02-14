/**
 * Project Store - State management for projects
 * Features: CRUD operations, filtering, sorting, search, versions, templates
 * @module features/project/stores/projectStore
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { projectService } from '../services/projectService';
import type {
  Project,
  ProjectStatus,
  ProjectType,
  ProjectFilterOptions,
  ProjectSortOptions,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectTemplate,
  ProjectVersion,
  ProjectExport,
  ExportFormat,
  ProjectCollaborator,
  ProjectAttachment
} from '../types';
import { WritableDraft } from 'immer';

// ============================================================================
// STORE STATE INTERFACE
// ============================================================================

interface ProjectStoreState {
  // Projects data
  projects: Map<string, Project>;
  currentProject: Project | null;
  selectedProjects: Set<string>;
  
  // Related data
  templates: Map<string, ProjectTemplate>;
  versions: Map<string, ProjectVersion[]>;
  collaborators: Map<string, ProjectCollaborator[]>;
  attachments: Map<string, ProjectAttachment[]>;
  
  // Filtering & Search
  filter: ProjectFilterOptions;
  sort: ProjectSortOptions;
  searchQuery: string;
  searchResults: string[];
  
  // Pagination
  page: number;
  pageSize: number;
  totalProjects: number;
  hasMore: boolean;
  
  // UI State
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  exporting: boolean;
  errors: Map<string, Error>;
  
  // Actions - CRUD
  loadProjects: (workspaceId: string, options?: { 
    page?: number; 
    pageSize?: number; 
    refresh?: boolean 
  }) => Promise<void>;
  loadProject: (projectId: string) => Promise<Project>;
  createProject: (data: CreateProjectRequest) => Promise<Project>;
  updateProject: (projectId: string, updates: UpdateProjectRequest) => Promise<Project>;
  deleteProject: (projectId: string) => Promise<void>;
  deleteProjects: (projectIds: string[]) => Promise<void>;
  archiveProject: (projectId: string) => Promise<void>;
  restoreProject: (projectId: string) => Promise<void>;
  duplicateProject: (projectId: string, name?: string) => Promise<Project>;
  
  // Actions - Selection
  selectProject: (projectId: string) => void;
  deselectProject: (projectId: string) => void;
  selectAllProjects: () => void;
  clearSelection: () => void;
  toggleSelection: (projectId: string) => void;
  
  // Actions - Current Project
  setCurrentProject: (projectId: string | null) => void;
  loadCurrentProject: (projectId: string) => Promise<void>;
  saveCurrentProject: () => Promise<void>;
  
  // Actions - Filtering & Search
  setFilter: (filter: Partial<ProjectFilterOptions>) => void;
  clearFilters: () => void;
  setSort: (sort: ProjectSortOptions) => void;
  searchProjects: (workspaceId: string, query: string) => Promise<void>;
  clearSearch: () => void;
  
  // Actions - Templates
  loadTemplates: () => Promise<void>;
  createFromTemplate: (templateId: string, data: Partial<CreateProjectRequest>) => Promise<Project>;
  saveAsTemplate: (projectId: string, name: string, description: string) => Promise<ProjectTemplate>;
  
  // Actions - Versions
  loadVersions: (projectId: string) => Promise<void>;
  createVersion: (projectId: string, label?: string) => Promise<ProjectVersion>;
  restoreVersion: (projectId: string, versionId: string) => Promise<void>;
  deleteVersion: (projectId: string, versionId: string) => Promise<void>;
  compareVersions: (projectId: string, versionId1: string, versionId2: string) => Promise<any>;
  
  // Actions - Collaborators
  loadCollaborators: (projectId: string) => Promise<void>;
  addCollaborator: (projectId: string, userId: string, role: string) => Promise<void>;
  updateCollaborator: (projectId: string, userId: string, role: string) => Promise<void>;
  removeCollaborator: (projectId: string, userId: string) => Promise<void>;
  
  // Actions - Attachments
  loadAttachments: (projectId: string) => Promise<void>;
  uploadAttachment: (projectId: string, file: File) => Promise<ProjectAttachment>;
  deleteAttachment: (projectId: string, attachmentId: string) => Promise<void>;
  downloadAttachment: (projectId: string, attachmentId: string) => Promise<void>;
  
  // Actions - Export
  exportProject: (projectId: string, format: ExportFormat, options?: ProjectExport) => Promise<Blob>;
  exportProjects: (projectIds: string[], format: ExportFormat) => Promise<Blob>;
  
  // Actions - Bulk Operations
  bulkUpdateProjects: (projectIds: string[], updates: UpdateProjectRequest) => Promise<void>;
  bulkMoveProjects: (projectIds: string[], targetWorkspaceId: string) => Promise<void>;
  bulkArchiveProjects: (projectIds: string[]) => Promise<void>;
  
  // Utility
  reset: () => void;
  getProjectById: (projectId: string) => Project | undefined;
  getProjectsByStatus: (status: ProjectStatus) => Project[];
  getProjectsByType: (type: ProjectType) => Project[];
  hasUnsavedChanges: () => boolean;
  canEdit: (projectId: string) => boolean;
}

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useProjectStore = create<ProjectStoreState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        projects: new Map(),
        currentProject: null,
        selectedProjects: new Set(),
        templates: new Map(),
        versions: new Map(),
        collaborators: new Map(),
        attachments: new Map(),
        filter: {},
        sort: { field: 'updatedAt', direction: 'desc' },
        searchQuery: '',
        searchResults: [],
        page: 1,
        pageSize: 20,
        totalProjects: 0,
        hasMore: false,
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        exporting: false,
        errors: new Map(),
        
        // CRUD Actions
        loadProjects: async (workspaceId, options = {}) => {
          try {
            set(state => {
              state.loading = true;
              state.errors.delete('load');
            });
            
            const { page = 1, pageSize = 20, refresh = false } = options;
            const { filter, sort } = get();
            
            const response = await projectService.getProjects(workspaceId, {
              ...filter,
              page,
              pageSize,
              sort
            });
            
            set(state => {
              if (refresh || page === 1) {
                state.projects.clear();
              }
              
              response.projects.forEach((project: WritableDraft<Project>) => {
                state.projects.set(project.id, project);
              });
              
              state.page = page;
              state.pageSize = pageSize;
              state.totalProjects = response.total;
              state.hasMore = response.hasMore;
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
        
        loadProject: async (projectId) => {
          try {
            set(state => {
              state.loading = true;
            });
            
            const project = await projectService.getProject(projectId);
            
            set(state => {
              state.projects.set(projectId, project);
              state.loading = false;
            });
            
            return project;
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set(`load-${projectId}`, error as Error);
            });
            throw error;
          }
        },
        
        createProject: async (data) => {
          try {
            set(state => {
              state.creating = true;
              state.errors.delete('create');
            });
            
            const project = await projectService.createProject(data);
            
            set(state => {
              state.projects.set(project.id, project);
              state.creating = false;
              state.totalProjects++;
            });
            
            return project;
          } catch (error) {
            set(state => {
              state.creating = false;
              state.errors.set('create', error as Error);
            });
            throw error;
          }
        },
        
        updateProject: async (projectId, updates) => {
          const original = get().projects.get(projectId);
          
          // Optimistic update
          set(state => {
            state.updating = true;
            const project = state.projects.get(projectId);
            if (project) {
              Object.assign(project, updates);
              if (state.currentProject?.id === projectId) {
                Object.assign(state.currentProject, updates);
              }
            }
          });
          
          try {
            const updated = await projectService.updateProject(projectId, updates);
            
            set(state => {
              state.projects.set(projectId, updated);
              if (state.currentProject?.id === projectId) {
                state.currentProject = updated;
              }
              state.updating = false;
            });
            
            return updated;
          } catch (error) {
            // Revert on error
            if (original) {
              set(state => {
                state.projects.set(projectId, original);
                if (state.currentProject?.id === projectId) {
                  state.currentProject = original;
                }
              });
            }
            set(state => {
              state.updating = false;
              state.errors.set(`update-${projectId}`, error as Error);
            });
            throw error;
          }
        },
        
        deleteProject: async (projectId) => {
          try {
            set(state => {
              state.deleting = true;
            });
            
            await projectService.deleteProject(projectId);
            
            set(state => {
              state.projects.delete(projectId);
              state.selectedProjects.delete(projectId);
              if (state.currentProject?.id === projectId) {
                state.currentProject = null;
              }
              state.deleting = false;
              state.totalProjects = Math.max(0, state.totalProjects - 1);
            });
          } catch (error) {
            set(state => {
              state.deleting = false;
              state.errors.set(`delete-${projectId}`, error as Error);
            });
            throw error;
          }
        },
        
        deleteProjects: async (projectIds) => {
          try {
            set(state => {
              state.deleting = true;
            });
            
            await Promise.all(
              projectIds.map(id => projectService.deleteProject(id))
            );
            
            set(state => {
              projectIds.forEach(id => {
                state.projects.delete(id);
                state.selectedProjects.delete(id);
                if (state.currentProject?.id === id) {
                  state.currentProject = null;
                }
              });
              state.deleting = false;
              state.totalProjects = Math.max(0, state.totalProjects - projectIds.length);
            });
          } catch (error) {
            set(state => {
              state.deleting = false;
              state.errors.set('bulk-delete', error as Error);
            });
            throw error;
          }
        },
        
        archiveProject: async (projectId) => {
          await get().updateProject(projectId, { status: 'archived' });
        },
        
        restoreProject: async (projectId) => {
          await get().updateProject(projectId, { status: 'active' });
        },
        
        duplicateProject: async (projectId, name) => {
          try {
            const original = get().projects.get(projectId);
            if (!original) throw new Error('Project not found');
            
            const duplicated = await projectService.duplicateProject(projectId, name);
            
            set(state => {
              state.projects.set(duplicated.id, duplicated);
              state.totalProjects++;
            });
            
            return duplicated;
          } catch (error) {
            throw error;
          }
        },
        
        // Selection Actions
        selectProject: (projectId) => {
          set(state => {
            state.selectedProjects.add(projectId);
          });
        },
        
        deselectProject: (projectId) => {
          set(state => {
            state.selectedProjects.delete(projectId);
          });
        },
        
        selectAllProjects: () => {
          set(state => {
            state.projects.forEach((_, id) => {
              state.selectedProjects.add(id);
            });
          });
        },
        
        clearSelection: () => {
          set(state => {
            state.selectedProjects.clear();
          });
        },
        
        toggleSelection: (projectId) => {
          set(state => {
            if (state.selectedProjects.has(projectId)) {
              state.selectedProjects.delete(projectId);
            } else {
              state.selectedProjects.add(projectId);
            }
          });
        },
        
        // Current Project Actions
        setCurrentProject: (projectId) => {
          set(state => {
            if (projectId === null) {
              state.currentProject = null;
            } else {
              const project = state.projects.get(projectId);
              if (project) {
                state.currentProject = project;
              }
            }
          });
        },
        
        loadCurrentProject: async (projectId) => {
          try {
            const project = await get().loadProject(projectId);
            set(state => {
              state.currentProject = project;
            });
          } catch (error) {
            throw error;
          }
        },
        
        saveCurrentProject: async () => {
          const { currentProject } = get();
          if (!currentProject) throw new Error('No current project');
          
          await get().updateProject(currentProject.id, currentProject);
        },
        
        // Filtering & Search Actions
        setFilter: (filter) => {
          set(state => {
            state.filter = { ...state.filter, ...filter };
            state.page = 1; // Reset to first page
          });
        },
        
        clearFilters: () => {
          set(state => {
            state.filter = {};
            state.page = 1;
          });
        },
        
        setSort: (sort) => {
          set(state => {
            state.sort = sort;
            state.page = 1;
          });
        },
        
        searchProjects: async (workspaceId, query) => {
          try {
            set(state => {
              state.loading = true;
              state.searchQuery = query;
            });
            
            const results = await projectService.searchProjects(workspaceId, query);
            
            set(state => {
              state.searchResults = results.map((p: { id: any; }) => p.id);
              state.loading = false;
            });
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set('search', error as Error);
            });
            throw error;
          }
        },
        
        clearSearch: () => {
          set(state => {
            state.searchQuery = '';
            state.searchResults = [];
          });
        },
        
        // Template Actions
        loadTemplates: async () => {
          try {
            const templates = await projectService.getTemplates();
            
            set(state => {
              state.templates.clear();
              templates.forEach((template: ProjectTemplate) => {
                state.templates.set(template.id, template);
              });
            });
          } catch (error) {
            throw error;
          }
        },
        
        createFromTemplate: async (templateId, data) => {
          try {
            const template = get().templates.get(templateId);
            if (!template) throw new Error('Template not found');
            
            const project = await projectService.createFromTemplate(templateId, data);
            
            set(state => {
              state.projects.set(project.id, project);
              state.totalProjects++;
            });
            
            return project;
          } catch (error) {
            throw error;
          }
        },
        
        saveAsTemplate: async (projectId, name, description) => {
          try {
            const template = await projectService.saveAsTemplate(projectId, name, description);
            
            set(state => {
              state.templates.set(template.id, template);
            });
            
            return template;
          } catch (error) {
            throw error;
          }
        },
        
        // Version Actions
        loadVersions: async (projectId) => {
          try {
            const versions = await projectService.getVersions(projectId);
            
            set(state => {
              state.versions.set(projectId, versions);
            });
          } catch (error) {
            throw error;
          }
        },
        
        createVersion: async (projectId, label) => {
          try {
            const version = await projectService.createVersion(projectId, label);
            
            set(state => {
              const versions = state.versions.get(projectId) || [];
              versions.push(version);
              state.versions.set(projectId, versions);
            });
            
            return version;
          } catch (error) {
            throw error;
          }
        },
        
        restoreVersion: async (projectId, versionId) => {
          try {
            await projectService.restoreVersion(projectId, versionId);
            await get().loadProject(projectId);
          } catch (error) {
            throw error;
          }
        },
        
        deleteVersion: async (projectId, versionId) => {
          try {
            await projectService.deleteVersion(projectId, versionId);
            
            set(state => {
              const versions = state.versions.get(projectId) || [];
              const filtered = versions.filter(v => v.id !== versionId);
              state.versions.set(projectId, filtered);
            });
          } catch (error) {
            throw error;
          }
        },
        
        compareVersions: async (projectId, versionId1, versionId2) => {
          try {
            return await projectService.compareVersions(projectId, versionId1, versionId2);
          } catch (error) {
            throw error;
          }
        },
        
        // Collaborator Actions
        loadCollaborators: async (projectId) => {
          try {
            const collaborators = await projectService.getCollaborators(projectId);
            
            set(state => {
              state.collaborators.set(projectId, collaborators);
            });
          } catch (error) {
            throw error;
          }
        },
        
        addCollaborator: async (projectId, userId, role) => {
          try {
            const collaborator = await projectService.addCollaborator(projectId, userId, role);
            
            set(state => {
              const collaborators = state.collaborators.get(projectId) || [];
              collaborators.push(collaborator);
              state.collaborators.set(projectId, collaborators);
            });
          } catch (error) {
            throw error;
          }
        },
        
        updateCollaborator: async (projectId, userId, role) => {
          try {
            await projectService.updateCollaborator(projectId, userId, role);
            await get().loadCollaborators(projectId);
          } catch (error) {
            throw error;
          }
        },
        
        removeCollaborator: async (projectId, userId) => {
          try {
            await projectService.removeCollaborator(projectId, userId);
            
            set(state => {
              const collaborators = state.collaborators.get(projectId) || [];
              const filtered = collaborators.filter(c => c.userId !== userId);
              state.collaborators.set(projectId, filtered);
            });
          } catch (error) {
            throw error;
          }
        },
        
        // Attachment Actions
        loadAttachments: async (projectId) => {
          try {
            const attachments = await projectService.getAttachments(projectId);
            
            set(state => {
              state.attachments.set(projectId, attachments);
            });
          } catch (error) {
            throw error;
          }
        },
        
        uploadAttachment: async (projectId, file) => {
          try {
            const attachment = await projectService.uploadAttachment(projectId, file);
            
            set(state => {
              const attachments = state.attachments.get(projectId) || [];
              attachments.push(attachment);
              state.attachments.set(projectId, attachments);
            });
            
            return attachment;
          } catch (error) {
            throw error;
          }
        },
        
        deleteAttachment: async (projectId, attachmentId) => {
          try {
            await projectService.deleteAttachment(projectId, attachmentId);
            
            set(state => {
              const attachments = state.attachments.get(projectId) || [];
              const filtered = attachments.filter(a => a.id !== attachmentId);
              state.attachments.set(projectId, filtered);
            });
          } catch (error) {
            throw error;
          }
        },
        
        downloadAttachment: async (projectId, attachmentId) => {
          try {
            await projectService.downloadAttachment(projectId, attachmentId);
          } catch (error) {
            throw error;
          }
        },
        
        // Export Actions
        exportProject: async (projectId, format, options) => {
          try {
            set(state => {
              state.exporting = true;
            });
            
            const blob = await projectService.exportProject(projectId, format, options);
            
            set(state => {
              state.exporting = false;
            });
            
            return blob;
          } catch (error) {
            set(state => {
              state.exporting = false;
              state.errors.set('export', error as Error);
            });
            throw error;
          }
        },
        
        exportProjects: async (projectIds, format) => {
          try {
            set(state => {
              state.exporting = true;
            });
            
            const blob = await projectService.exportProjects(projectIds, format);
            
            set(state => {
              state.exporting = false;
            });
            
            return blob;
          } catch (error) {
            set(state => {
              state.exporting = false;
              state.errors.set('bulk-export', error as Error);
            });
            throw error;
          }
        },
        
        // Bulk Operations
        bulkUpdateProjects: async (projectIds, updates) => {
          try {
            set(state => {
              state.updating = true;
            });
            
            await projectService.bulkUpdateProjects(projectIds, updates);
            
            // Reload affected projects
            await Promise.all(
              projectIds.map(id => get().loadProject(id))
            );
            
            set(state => {
              state.updating = false;
            });
          } catch (error) {
            set(state => {
              state.updating = false;
              state.errors.set('bulk-update', error as Error);
            });
            throw error;
          }
        },
        
        bulkMoveProjects: async (projectIds, targetWorkspaceId) => {
          try {
            await projectService.bulkMoveProjects(projectIds, targetWorkspaceId);
            
            set(state => {
              projectIds.forEach(id => {
                state.projects.delete(id);
                state.selectedProjects.delete(id);
              });
              state.totalProjects = Math.max(0, state.totalProjects - projectIds.length);
            });
          } catch (error) {
            throw error;
          }
        },
        
        bulkArchiveProjects: async (projectIds) => {
          await get().bulkUpdateProjects(projectIds, { status: 'archived' });
        },
        
        // Utility
        reset: () => {
          set(state => {
            state.projects.clear();
            state.currentProject = null;
            state.selectedProjects.clear();
            state.templates.clear();
            state.versions.clear();
            state.collaborators.clear();
            state.attachments.clear();
            state.filter = {};
            state.sort = { field: 'updatedAt', direction: 'desc' };
            state.searchQuery = '';
            state.searchResults = [];
            state.page = 1;
            state.totalProjects = 0;
            state.hasMore = false;
            state.loading = false;
            state.creating = false;
            state.updating = false;
            state.deleting = false;
            state.exporting = false;
            state.errors.clear();
          });
        },
        
        getProjectById: (projectId) => {
          return get().projects.get(projectId);
        },
        
        getProjectsByStatus: (status) => {
          return Array.from(get().projects.values()).filter(
            p => p.status === status
          );
        },
        
        getProjectsByType: (type) => {
          return Array.from(get().projects.values()).filter(
            p => p.type === type
          );
        },
        
        hasUnsavedChanges: () => {
          // Implementation would check for unsaved changes
          return false;
        },
        
        canEdit: (projectId) => {
          const project = get().projects.get(projectId);
          if (!project) return false;
          
          // Check permissions based on user role
          // For now, assume user can edit
          return true;
        }
      })),
      {
        name: 'project-store',
        partialize: (state) => ({
          currentProject: state.currentProject,
          filter: state.filter,
          sort: state.sort
        })
      }
    ),
    {
      name: 'project-store'
    }
  )
);