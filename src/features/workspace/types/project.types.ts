/**
 * Project Type Definitions
 * Matches backend Project entity and related DTOs
 * Core types for project management and tracking
 * @module features/workspace/types/project
 */

import type { JourneyStep } from './journeyStep.types';
/**
 * Additional Type Definitions for API Operations
 */

export type ProjectCreate = CreateProjectRequest;
export type ProjectUpdate = UpdateProjectRequest;

export interface ProjectContent {
  format: 'markdown' | 'html' | 'json' | 'text';
  content: string;
  attachments?: string[]; // attachment IDs
  metadata?: {
    wordCount?: number;
    readingTime?: number;
    lastEditedBy?: string;
    version?: number;
  };
}

export interface ProjectAttachment {
  id: string;
  fileName: string;
  url?: string;
  size?: number;
  contentType?: string;
  uploadedAt?: string;
  uploadedBy?: string;
  metadata?: Record<string, any>;
}

export interface ProjectCollaborator {
  userId: number;
  role?: string;
  addedAt?: string;
  permissions?: string[];
}

export interface ProjectActivity {
  id: string;
  projectId: number;
  type: string;
  description?: string;
  createdAt: string;
  userId?: number;
  metadata?: Record<string, any>;
}

export interface ProjectExport {
  project: Project;
  content?: ProjectContent;
  versions?: ProjectVersion[];
  attachments?: ProjectAttachment[];
  collaborators?: ProjectCollaborator[];
  activities?: ProjectActivity[];
  format: 'json' | 'zip' | 'pdf';
  exportedAt: Date;
  exportedBy: string;
  downloadUrl?: string;
}

export interface ProjectImport {
  format: 'json' | 'zip';
  data: string | File | Blob;
  options?: {
    overwrite?: boolean;
    includeVersions?: boolean;
    includeAttachments?: boolean;
    includeCollaborators?: boolean;
    mapCollaborators?: Record<string, string>;
  };
}

export interface ProjectSearch {
  limit?: number;
  offset?: number;
  fields?: string[];
  includeArchived?: boolean;
  fuzzy?: boolean;
  highlight?: boolean;
}

export interface ProjectTag {
  id: string;
  name: string;
  color?: string;
  count: number;
  createdAt: Date;
  createdBy?: string;
}

export interface ProjectDuplicateOptions {
  name?: string;
  includeContent?: boolean;
  includeAttachments?: boolean;
  includeVersions?: boolean;
  includeCollaborators?: boolean;
  includeSettings?: boolean;
  targetWorkspaceId?: string;
}

export interface ProjectArchiveOptions {
  reason?: string;
  preserveData?: boolean;
  notifyCollaborators?: boolean;
  scheduledDate?: Date;
}

export interface ProjectRestoreOptions {
  targetWorkspaceId?: string;
  clearProgress?: boolean;
  updateDates?: boolean;
  notifyCollaborators?: boolean;
}

// Local ValidationResult type (defined here because journeyStep.types.ts doesn't export it)
export interface ValidationResult {
  valid: boolean;
  errors?: Array<{ field?: string; message: string }>;
  warnings?: Array<{ field?: string; message: string }>;
  details?: Record<string, any>;
}
// ============================================================================
// ENUMS
// ============================================================================

export enum ProjectType {
  AUDIO = 'AUDIO',
  GAME = 'GAME',
  WRITING = 'WRITING',
  ART = 'ART',
  RECIPE = 'RECIPE',
  VIDEO = 'VIDEO',
  MIXED_MEDIA = 'MIXED_MEDIA',
  OTHER = 'OTHER'
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

// ============================================================================
// BASE PROJECT INTERFACE
// ============================================================================

export interface Project {
  name: any;
  type(type: any): unknown;
  id: number;
  title: string;
  description?: string;
  projectType: ProjectType;
  status: ProjectStatus;
  journeyStage: JourneyStep;
  userId: number;
  workspaceId: number;
  content: Record<string, any>; // JsonNode from backend
  tags: string[];
  thumbnailUrl?: string;
  publishedAt?: string; // ISO datetime
  createdAt: string;
  updatedAt: string;
  lastEditedAt: string;
  version: number;
}

// ============================================================================
// PROJECT SUMMARY (For Lists)
// ============================================================================

export interface ProjectSummary {
  id: number;
  title: string;
  description?: string;
  projectType: ProjectType;
  status: ProjectStatus;
  journeyStage: JourneyStep;
  thumbnailUrl?: string;
  lastEditedAt: string;
  progress: number; // 0-100
}

// ============================================================================
// PROJECT VERSION
// ============================================================================

export interface ProjectVersion {
  id: number;
  projectId: number;
  versionNumber: number;
  title: string;
  description?: string;
  content: Record<string, any>;
  changeDescription?: string;
  createdByUserId: number;
  createdAt: string;
}

// ============================================================================
// PROJECT METRICS
// ============================================================================

export interface ProjectMetrics {
  views: number;
  likes: number;
  comments: number;
  downloads: number;
  purchases: number;
  averageRating: number;
}

// ============================================================================
// PROJECT RESPONSE (Full detail with metrics)
// ============================================================================

export interface ProjectResponse extends Project {
  metrics?: ProjectMetrics;
  versions?: ProjectVersion[];
}

// ============================================================================
// REQUEST DTOs
// ============================================================================

export interface CreateProjectRequest {
  title: string;
  description?: string;
  projectType: ProjectType;
  journeyStage?: JourneyStep;
  content?: Record<string, any>;
  tags?: string[];
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  content?: Record<string, any>;
  tags?: string[];
  thumbnailUrl?: string;
  changeDescription?: string;
}

export interface DuplicateProjectRequest {
  sourceProjectId: number;
  newTitle?: string;
  newDescription?: string;
  includeVersionHistory?: boolean;
  resetJourneyStage?: boolean;
}

// ============================================================================
// FILTER & SEARCH
// ============================================================================

export interface ProjectFilters {
  search: any;
  journeyStep: any;
  createdAfter: any;
  createdBefore: any;
  status?: ProjectStatus;
  projectType?: ProjectType;
  journeyStage?: JourneyStep;
  tags?: string[];
  searchQuery?: string;
}

export interface ProjectListParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
  filters?: ProjectFilters;
}

// ============================================================================
// PAGINATION RESPONSE
// ============================================================================

export interface PagedProjectResponse {
  content: ProjectSummary[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
}

// ============================================================================
// JOURNEY STEP (imported from journeyStep.types.ts but defined here for reference)
// ============================================================================
// JOURNEY STEP (use the JourneyStep type imported from './journeyStep.types'; local enum removed to avoid duplicate declarations)
// ============================================================================
// PROJECT STATUS TRANSITIONS
// ============================================================================

export const VALID_STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  [ProjectStatus.DRAFT]: [ProjectStatus.IN_REVIEW, ProjectStatus.ARCHIVED],
  [ProjectStatus.IN_REVIEW]: [ProjectStatus.APPROVED, ProjectStatus.DRAFT],
  [ProjectStatus.APPROVED]: [ProjectStatus.PUBLISHED, ProjectStatus.DRAFT],
  [ProjectStatus.PUBLISHED]: [ProjectStatus.ARCHIVED],
  [ProjectStatus.ARCHIVED]: [ProjectStatus.DRAFT]
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isProjectType(value: string): value is ProjectType {
  return Object.values(ProjectType).includes(value as ProjectType);
}

export function isProjectStatus(value: string): value is ProjectStatus {
  return Object.values(ProjectStatus).includes(value as ProjectStatus);
}

export function canTransitionStatus(from: ProjectStatus, to: ProjectStatus): boolean {
  return VALID_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ProjectContentType<T extends ProjectType> = 
  T extends ProjectType.AUDIO ? AudioContent :
  T extends ProjectType.GAME ? GameContent :
  T extends ProjectType.WRITING ? WritingContent :
  T extends ProjectType.ART ? ArtContent :
  T extends ProjectType.RECIPE ? RecipeContent :
  T extends ProjectType.VIDEO ? VideoContent :
  Record<string, any>;

// Content type interfaces (extend these based on your needs)
export interface AudioContent {
  tracks?: Array<{
    name: string;
    url?: string;
    duration?: number;
  }>;
  bpm?: number;
  genre?: string;
}

export interface GameContent {
  engine?: string;
  genre?: string;
  mechanics?: string[];
  playTime?: number;
}

export interface WritingContent {
  chapters?: Array<{
    title: string;
    content: string;
    wordCount: number;
  }>;
  genre?: string;
  wordCount?: number;
}

export interface ArtContent {
  medium?: string;
  dimensions?: {
    width: number;
    height: number;
    unit: string;
  };
  images?: string[];
}

export interface RecipeContent {
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  ingredients?: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
  instructions?: Array<{
    step: number;
    instruction: string;
  }>;
}

export interface VideoContent {
  duration?: number;
  resolution?: string;
  format?: string;
  thumbnails?: string[];
}
