/**
 * Project Store - State management for projects
 * Features: CRUD, optimistic updates, caching, search, filtering
 * @module features/workspace/stores/projectStore
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { projectService } from '../services/projectService';
import { syncEngine } from '../services/syncEngine';
import type {
  Project,
  ProjectCreate,
  ProjectUpdate,
  ProjectVersion,
  ProjectFilters,
  PageRequest
} from '../types';
import type { ValidationResult as RemoteValidationResult } from '../types/project.types';

/**
 * ProjectSort is not exported from ../types (was causing compile error).
 * Provide a local fallback type here — replace `any` with a more specific type
 * if you add/know the correct shape later.
 */
type ProjectSort = any;

/**
 * Local ProjectTemplate type fallback when not exported from ../types
 */
interface LocalProjectTemplate {
  id: string | number;
  name: string;
  description?: string;
  createdAt?: string | Date;
}

/**
/**
 * Local generic PageResponse fallback for pagination responses when not exported from ../types
 */
interface PageResponse<T> {
  content: T[];
  totalElements: number;
  // Various libraries may use different property names for the page index
  number?: number;
  page?: number;
  pageNumber?: number;
  pageIndex?: number;
}

/**
 * Local fallback for JourneyStep when it's not exported from ../types
 */
interface JourneyStep {
  id: string;
  name?: string;
  completed?: boolean;
  // extend with actual shape from backend when available
}

/**
 * Project store state interface
 */
interface ProjectState {
  // Data
  projects: Map<string, Project>;
  currentProject: Project | null;
  selectedProjects: Set<string>;
  versions: Map<string, ProjectVersion[]>;
  templates: LocalProjectTemplate[];
  
  // UI State
  loading: boolean;
  saving: Map<string, boolean>;
  errors: Map<string, Error>;
  lastFetch: Date | null;
  
  // Pagination & Filtering
  totalProjects: number;
  currentPage: number;
  pageSize: number;
  filter: ProjectFilters | null;
  sort: ProjectSort | null;
  searchQuery: string;
  
  // Auto-save
  autoSaveEnabled: Map<string, boolean>;
  unsavedChanges: Map<string, ProjectUpdate>;
  
  // Actions - CRUD
  createProject: (workspaceId: string, data: ProjectCreate) => Promise<Project>;
  loadProject: (workspaceId: string, projectId: string) => Promise<Project>;
  loadProjects: (workspaceId: string, options?: LoadProjectsOptions) => Promise<void>;
  updateProject: (workspaceId: string, projectId: string, updates: ProjectUpdate) => Promise<Project>;
  deleteProject: (workspaceId: string, projectId: string, permanent?: boolean) => Promise<void>;
  duplicateProject: (workspaceId: string, projectId: string, name?: string) => Promise<Project>;
  
  // Actions - Versions
  loadVersions: (workspaceId: string, projectId: string) => Promise<any[]>;
  createVersion: (workspaceId: string, projectId: string, message?: string) => Promise<ProjectVersion>;
  restoreVersion: (workspaceId: string, projectId: string, versionId: string) => Promise<Project>;
  
  // Actions - Selection
  selectProject: (projectId: string) => void;
  deselectProject: (projectId: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  
  // Actions - Current Project
  setCurrentProject: (project: Project | null) => void;
  updateCurrentProject: (updates: Partial<Project>) => void;
  saveCurrentProject: (workspaceId: string) => Promise<void>;
  
  // Actions - Journey
  updateJourneyStep: (workspaceId: string, projectId: string, step: JourneyStep) => Promise<void>;
  validateProgress: (workspaceId: string, projectId: string) => Promise<RemoteValidationResult>;
  
  // Actions - Search & Filter
  searchProjects: (workspaceId: string, query: string) => Promise<void>;
  setFilter: (filter: ProjectFilters | null) => void;
  setSort: (sort: ProjectSort | null) => void;
  clearFilters: () => void;
  
  // Actions - Auto-save
  enableAutoSave: (projectId: string) => void;
  disableAutoSave: (projectId: string) => void;
  trackChanges: (projectId: string, changes: ProjectUpdate) => void;
  clearUnsavedChanges: (projectId: string) => void;
  
  // Actions - Batch
  batchUpdateProjects: (workspaceId: string, projectIds: string[], updates: ProjectUpdate) => Promise<void>;
  batchDeleteProjects: (workspaceId: string, projectIds: string[]) => Promise<void>;
  
  // Actions - Templates
  loadTemplates: (workspaceId: string) => Promise<LocalProjectTemplate[]>;
  createFromTemplate: (workspaceId: string, templateId: string, data: ProjectCreate) => Promise<Project>;
  saveAsTemplate: (workspaceId: string, projectId: string, name: string) => Promise<LocalProjectTemplate>;
  
  // Utility
  reset: () => void;
  getProjectById: (projectId: string) => Project | undefined;
  getSelectedProjects: () => Project[];
  hasUnsavedChanges: (projectId?: string) => boolean;
}

interface LoadProjectsOptions {
  page?: PageRequest;
  filter?: ProjectFilters;
  sort?: ProjectSort;
  refresh?: boolean;
}

/**
 * Project store implementation
 */
export const useProjectStore = create<ProjectState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial state
        projects: new Map(),
        currentProject: null,
        selectedProjects: new Set(),
        versions: new Map(),
        templates: [],
        
        loading: false,
        saving: new Map(),
        errors: new Map(),
        lastFetch: null,
        
        totalProjects: 0,
        currentPage: 0,
        pageSize: 20,
        filter: null,
        sort: null,
        searchQuery: '',
        
        autoSaveEnabled: new Map(),
        unsavedChanges: new Map(),
        
        // CRUD Actions
        createProject: async (workspaceId: string, data: ProjectCreate): Promise<Project> => {
          try {
            set((state) => {
              state.loading = true;
              state.errors.delete('create');
            });
            
            const project = await projectService.createProject(workspaceId, data);
            
            set((state) => {
              state.projects.set(String(project.id), project);
              state.loading = false;
            });
            
            return project;
          } catch (error) {
            set((state) => {
              state.loading = false;
              state.errors.set('create', error as Error);
            });
            throw error;
          }
        },
        
        loadProject: async (workspaceId: string, projectId: string): Promise<Project> => {
          try {
            set(state => {
              state.loading = true;
              state.errors.delete(projectId);
            });
            
            const project = await projectService.getProject(workspaceId, projectId, true);
            
            set(state => {
              state.projects.set(projectId, project);
              state.loading = false;
            });
            
            return project;
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set(projectId, error as Error);
            });
            throw error;
          }
        },
        
        loadProjects: async (workspaceId: string, options?: LoadProjectsOptions): Promise<void> => {
          const opts: LoadProjectsOptions = options || {};
          const { filter, sort, page, refresh } = opts;
          
          // Skip if recently fetched and not forcing refresh
          const lastFetch: Date | null = get().lastFetch;
          if (!refresh && lastFetch) {
            const timeSince: number = Date.now() - lastFetch.getTime();
            if (timeSince < 30000) return; // 30 seconds cache
          }
          
          try {
            set(state => {
              state.loading = true;
              state.errors.delete('load');
              if (filter) state.filter = filter;
              if (sort) state.sort = sort;
            });
            
            const pageNumber: number = (page && typeof page.page === 'number') ? page.page : get().currentPage;
            const pageSizeNum: number = (page && typeof page.size === 'number') ? page.size : get().pageSize;
            // Build a plain object and use `any` to avoid duplicate PageRequest type incompatibilities
            const pageRequest: any = {
              ...(page || {}),
              page: pageNumber,
              size: pageSizeNum
            };
            const response: PageResponse<Project> = await projectService.getProjects(workspaceId, {
              page: pageRequest,
              filter: filter || get().filter || undefined,
              sort: sort || get().sort || undefined
            });
            
            set(state => {
              // Clear projects on first page or refresh
              if (refresh || state.currentPage === 0) {
                state.projects.clear();
              }
              
              // Add projects to map
              response.content.forEach((project: Project) => {
                state.projects.set(String(project.id), project);
              });
              
              state.totalProjects = response.totalElements;
              // PageResponse may use different property names for the page index (e.g. number, page, pageNumber, pageIndex).
              // Use a safe any-cast fallback to pick the first available property, otherwise keep the current page.
              const pageIndex: number = (response as any).number ?? (response as any).page ?? (response as any).pageNumber ?? (response as any).pageIndex ?? state.currentPage;
              state.currentPage = pageIndex;
              state.loading = false;
              state.lastFetch = new Date();
            });
          } catch (error) {
            set(state => {
              state.loading = false;
              state.errors.set('load', error as Error);
            });
            throw error;
          }
        },
        
        updateProject: async (workspaceId: string, projectId: string, updates: ProjectUpdate): Promise<Project> => {
          // Optimistic update
          const original: Project | undefined = get().projects.get(projectId);
          
          set(state => {
            state.saving.set(projectId, true);
            state.errors.delete(projectId);
            
            const project = state.projects.get(projectId);
            if (project) {
              Object.assign(project, updates);
              project.updatedAt = new Date().toISOString();
            }
          });
          
          try {
            const updated = await projectService.updateProject(workspaceId, projectId, updates);
            
            set(state => {
              state.projects.set(projectId, updated);
              state.saving.delete(projectId);
              state.unsavedChanges.delete(projectId);
              
              if (String(state.currentProject?.id) === projectId) {
            state.currentProject = updated;
              }
            });
            
            return updated;
          } catch (error) {
            // Revert optimistic update
            set(state => {
              if (original) {
            state.projects.set(projectId, original);
              }
              state.saving.delete(projectId);
              state.errors.set(projectId, error as Error);
            });
            throw error;
          }
        },
        
        deleteProject: async (workspaceId: string, projectId: string, permanent: boolean = false): Promise<void> => {
          const original = get().projects.get(projectId);
          
          // Optimistic delete
          set(state => {
            state.projects.delete(projectId);
            state.selectedProjects.delete(projectId);
            if (String(state.currentProject?.id) === projectId) {
              state.currentProject = null;
            }
          });
          
          try {
            await projectService.deleteProject(workspaceId, projectId, permanent);
            
            set(state => {
              state.unsavedChanges.delete(projectId);
              state.autoSaveEnabled.delete(projectId);
            });
          } catch (error) {
            // Revert delete
            if (original) {
              set(state => {
                state.projects.set(projectId, original);
              });
            }
            throw error;
          }
        },
        
        duplicateProject: async (workspaceId: string, projectId: string, name?: string): Promise<Project> => {
          try {
            set((state) => {
              state.loading = true;
            });
            
            const options: { name?: string; includeContent?: boolean } = {
              name,
              includeContent: true
            };
            
            const duplicate: Project = await projectService.duplicateProject(workspaceId, projectId, options);
            
            set((state) => {
              state.projects.set(String(duplicate.id), duplicate);
              state.loading = false;
            });
            
            return duplicate;
          } catch (error) {
            set((state) => {
              state.loading = false;
            });
            throw error;
          }
        },
        // Version Management
                loadVersions: async (workspaceId: string, projectId: string): Promise<ProjectVersion[]> => {
                  try {
                    const raw = await projectService.getProjectVersions(workspaceId, projectId);
                    const versions: ProjectVersion[] = raw as unknown as ProjectVersion[];
                    
                    set(state => {
                      // store as any to satisfy immer typing
                      state.versions.set(projectId, versions as unknown as any);
                    });
                    
                    return versions;
                  } catch (error) {
                    throw error;
                  }
                },
                createVersion: async (workspaceId: string, projectId: string, message?: string): Promise<ProjectVersion> => {
                  try {
                    const raw = await projectService.createProjectVersion(workspaceId, projectId, message);
                    const version: ProjectVersion = raw as unknown as ProjectVersion;
                    
                    set(state => {
                      const versions = state.versions.get(projectId) || [];
                      // non-mutating update to avoid immer WritableDraft mismatch
                      state.versions.set(projectId, [version, ...versions] as unknown as any);
                    });
                    
                    return version;
                  } catch (error) {
                    throw error;
                  }
                },
        
        restoreVersion: async (workspaceId, projectId, versionId) => {
          try {
            const restored = await projectService.restoreProjectVersion(workspaceId, projectId, versionId);
            
            set(state => {
              state.projects.set(projectId, restored);
              if (String(state.currentProject?.id) === projectId) {
                state.currentProject = restored;
              }
            });
            
            return restored;
          } catch (error) {
            throw error;
          }
        },
        
        // Selection Management
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
        
        clearSelection: () => {
          set(state => {
            state.selectedProjects.clear();
          });
        },
        
        selectAll: () => {
          set(state => {
            state.projects.forEach((_, id) => {
              state.selectedProjects.add(id);
            });
          });
        },
        
        // Current Project
        setCurrentProject: (project) => {
          set(state => {
            state.currentProject = project;
            if (project) {
              state.projects.set(String(project.id), project);
            }
          });
        },
        
        updateCurrentProject: (updates) => {
          set(state => {
            if (state.currentProject) {
              Object.assign(state.currentProject, updates);
              state.currentProject.updatedAt = new Date().toISOString();
              state.projects.set(String(state.currentProject.id), state.currentProject);
            }
          });
        },
        
        saveCurrentProject: async (workspaceId) => {
          const { currentProject } = get();
          if (!currentProject) throw new Error('No current project');
          
          await get().updateProject(workspaceId, String(currentProject.id), currentProject);
        },
        
        // Journey Management
        updateJourneyStep: async (workspaceId: string, projectId: string, step: JourneyStep) => {
          await get().updateProject(workspaceId, projectId, { currentStep: step } as any);
        },
        
        validateProgress: async (workspaceId: string, projectId: string): Promise<RemoteValidationResult> => {
          const result: any = await projectService.validateJourneyProgress(workspaceId, projectId);
          
          // Normalize `warnings` to match RemoteValidationResult shape: { field?: string; message: string }[]
          let warnings: { field?: string; message: string }[] | undefined;
          if (Array.isArray(result?.warnings)) {
            const first = result.warnings[0];
            if (typeof first === 'string') {
              warnings = result.warnings.map((w: string) => ({ message: w }));
            } else {
              warnings = result.warnings as { field?: string; message: string }[];
            }
          }
          
          const normalized: RemoteValidationResult = {
            ...(result as object),
            warnings
          } as RemoteValidationResult;
          
          return normalized;
        },
        
        // Search & Filter
        searchProjects: async (workspaceId, query) => {
          set(state => {
            state.searchQuery = query;
            state.loading = true;
          });
          
          try {
            const results = await projectService.searchProjects(workspaceId, query);
            
            set(state => {
              state.projects.clear();
              results.forEach(project => {
                state.projects.set(String(project.id), project);
              });
              state.loading = false;
            });
          } catch (error) {
            set(state => {
              state.loading = false;
            });
            throw error;
          }
        },
        
        setFilter: (filter) => {
          set(state => {
            state.filter = filter;
          });
        },
        
        setSort: (sort) => {
          set(state => {
            state.sort = sort;
          });
        },
        
        clearFilters: () => {
          set(state => {
            state.filter = null;
            state.sort = null;
            state.searchQuery = '';
          });
        },
        
        // Auto-save
        enableAutoSave: (projectId) => {
          set(state => {
            state.autoSaveEnabled.set(projectId, true);
          });
          
          // Setup auto-save with sync engine
          const cleanup = syncEngine.enableAutoSave(
            projectId,
            () => get().unsavedChanges.get(projectId) || null,
            { debounceTime: 2000 }
          );
          
          // Store cleanup function (you'd need to manage this separately)
        },
        
        disableAutoSave: (projectId) => {
          set(state => {
            state.autoSaveEnabled.set(projectId, false);
          });
          
          syncEngine.disableAutoSave(projectId);
        },
        
        trackChanges: (projectId, changes) => {
          set(state => {
            const existing = state.unsavedChanges.get(projectId) || {};
            state.unsavedChanges.set(projectId, { ...existing, ...changes });
          });
        },
        
        clearUnsavedChanges: (projectId) => {
          set(state => {
            state.unsavedChanges.delete(projectId);
          });
        },
        
        // Batch Operations
        batchUpdateProjects: async (workspaceId, projectIds, updates) => {
          try {
            set(state => {
              state.loading = true;
            });
            
            const updated = await projectService.batchUpdateProjects(workspaceId, projectIds, updates);
            
            set(state => {
              updated.forEach(project => {
                state.projects.set(String(project.id), project);
              });
              state.loading = false;
            });
          } catch (error) {
            set(state => {
              state.loading = false;
            });
            throw error;
          }
        },
        
        batchDeleteProjects: async (workspaceId, projectIds) => {
          try {
            await projectService.batchDeleteProjects(workspaceId, projectIds);
            
            set(state => {
              projectIds.forEach(id => {
                state.projects.delete(id);
                state.selectedProjects.delete(id);
                state.unsavedChanges.delete(id);
              });
            });
          } catch (error) {
            throw error;
          }
        },
        
        // Templates
        loadTemplates: async (workspaceId): Promise<LocalProjectTemplate[]> => {
          try {
            const templates = await projectService.getProjectTemplates(workspaceId) as unknown as LocalProjectTemplate[];
            
            set(state => {
              state.templates = templates;
            });
            
            return templates;
          } catch (error) {
            throw error;
          }
        },
        
        createFromTemplate: async (workspaceId, templateId, data) => {
          try {
            const project = await projectService.createFromTemplate(workspaceId, templateId, data);
            
            set(state => {
              state.projects.set(String(project.id), project);
            });
            
            return project;
          } catch (error) {
            throw error;
          }
        },
        
        saveAsTemplate: async (workspaceId, projectId, name): Promise<LocalProjectTemplate> => {
          try {
            // Use a safe cast to `any` so this compiles if the ProjectService type doesn't declare saveAsTemplate.
            // If the method does not exist at runtime, fall back to constructing a template from the existing project.
            let template: LocalProjectTemplate;
            const svcAny = projectService as any;
            if (typeof svcAny.saveAsTemplate === 'function') {
              template = await svcAny.saveAsTemplate(workspaceId, projectId, name) as unknown as LocalProjectTemplate;
            } else {
              const project = await projectService.getProject(workspaceId, projectId, true);
              template = {
                id: project.id as any,
                name,
                description: (project as any).description,
                createdAt: (project as any).createdAt ?? new Date().toISOString()
              };
            }
            
            set(state => {
              state.templates.push(template);
            });
            
            return template;
          } catch (error) {
            throw error;
          }
        },
        
        // Utility
        reset: () => {
          set(state => {
            state.projects.clear();
            state.currentProject = null;
            state.selectedProjects.clear();
            state.versions.clear();
            state.templates = [];
            state.loading = false;
            state.saving.clear();
            state.errors.clear();
            state.unsavedChanges.clear();
            state.autoSaveEnabled.clear();
          });
        },
        
        getProjectById: (projectId) => {
          return get().projects.get(projectId);
        },
        
        getSelectedProjects: () => {
          const selected: Project[] = [];
          get().selectedProjects.forEach(id => {
            const project = get().projects.get(id);
            if (project) selected.push(project);
          });
          return selected;
        },
        
        hasUnsavedChanges: (projectId) => {
          if (projectId) {
            return get().unsavedChanges.has(projectId);
          }
          return get().unsavedChanges.size > 0;
        }
      }))
    ),
    {
      name: 'project-store'
    }
  )
);
