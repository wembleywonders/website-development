/**
 * Project Type Definitions
 * @module features/project/types
 */

// ============================================================================
// PROJECT CORE TYPES
// ============================================================================

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  progress: number;
  priority: ProjectPriority;
  tags: string[];
  categories: string[];
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;
  archivedAt?: Date;
  
  // People
  ownerId: string;
  creatorId: string;
  collaborators?: ProjectCollaborator[];
  assignedTo?: string[];
  
  // Content
  content?: ProjectContent;
  attachments?: ProjectAttachment[];
  versions?: ProjectVersion[];
  currentVersionId?: string;
  
  // Metadata
  metadata?: ProjectMetadata;
  settings?: ProjectSettings;
  statistics?: ProjectStatistics;
  
  // Relations
  parentProjectId?: string;
  childProjectIds?: string[];
  relatedProjectIds?: string[];
  templateId?: string;
}

// ============================================================================
// PROJECT ENUMS & TYPES
// ============================================================================

export type ProjectStatus = 
  | 'draft'
  | 'active'
  | 'paused'
  | 'completed'
  | 'archived'
  | 'deleted';

export type ProjectType = 
  | 'personal'
  | 'team'
  | 'client'
  | 'research'
  | 'creative'
  | 'development'
  | 'marketing'
  | 'content'
  | 'event'
  | 'template';

export type ProjectVisibility = 
  | 'private'
  | 'team'
  | 'workspace'
  | 'public';

export type ProjectPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

// ============================================================================
// PROJECT COMPONENTS
// ============================================================================

export interface ProjectCollaborator {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: ProjectRole;
  permissions: ProjectPermissions;
  joinedAt: Date;
  lastActiveAt?: Date;
}

export type ProjectRole = 
  | 'owner'
  | 'admin'
  | 'editor'
  | 'contributor'
  | 'viewer';

export interface ProjectPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
  canArchive: boolean;
  canManageMembers: boolean;
  canManageSettings: boolean;
  canPublish: boolean;
  canComment: boolean;
  canExport: boolean;
}

export interface ProjectContent {
  format: 'markdown' | 'html' | 'json' | 'custom';
  data: any;
  summary?: string;
  outline?: ProjectOutline[];
  wordCount?: number;
  readingTime?: number;
}

export interface ProjectOutline {
  id: string;
  title: string;
  level: number;
  children?: ProjectOutline[];
}

export interface ProjectAttachment {
  id: string;
  projectId: string;
  name: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  metadata?: Record<string, any>;
}

export interface ProjectVersion {
  id: string;
  projectId: string;
  versionNumber: string;
  label?: string;
  description?: string;
  content: ProjectContent;
  createdBy: string;
  createdAt: Date;
  isPublished: boolean;
  isDraft: boolean;
  changes?: VersionChange[];
}

export interface VersionChange {
  field: string;
  oldValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date;
}

export interface ProjectMetadata {
  clientName?: string;
  projectCode?: string;
  budget?: number;
  currency?: string;
  department?: string;
  location?: string;
  customFields?: Record<string, any>;
}

export interface ProjectSettings {
  autoSave: boolean;
  autoSaveInterval: number;
  versionControl: boolean;
  requireApproval: boolean;
  notifyOnChange: boolean;
  allowComments: boolean;
  allowAnonymousView: boolean;
  enableAnalytics: boolean;
  aiAssistance: boolean;
  customWorkflow?: string;
}

export interface ProjectStatistics {
  views: number;
  uniqueViewers: number;
  edits: number;
  comments: number;
  shares: number;
  exports: number;
  averageTimeSpent: number;
  completionRate: number;
  lastViewedAt?: Date;
  lastEditedAt?: Date;
}

// ============================================================================
// PROJECT TEMPLATES
// ============================================================================

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  previewUrl?: string;
  content: ProjectContent;
  defaultSettings: Partial<ProjectSettings>;
  requiredFields: string[];
  tags: string[];
  popularity: number;
  createdBy: string;
  isOfficial: boolean;
  isPremium: boolean;
}

// ============================================================================
// PROJECT REQUESTS & RESPONSES
// ============================================================================

export interface CreateProjectRequest {
  workspaceId: string;
  name: string;
  type: ProjectType;
  description?: string;
  templateId?: string;
  parentProjectId?: string;
  settings?: Partial<ProjectSettings>;
  metadata?: Partial<ProjectMetadata>;
  dueDate?: Date;
  assignedTo?: string[];
  tags?: string[];
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  progress?: number;
  priority?: ProjectPriority;
  dueDate?: Date;
  settings?: Partial<ProjectSettings>;
  metadata?: Partial<ProjectMetadata>;
  tags?: string[];
}

export interface ProjectResponse {
  project: Project;
  collaborators: ProjectCollaborator[];
  versions: ProjectVersion[];
  statistics: ProjectStatistics;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ProjectFilterOptions {
  status?: ProjectStatus[];
  type?: ProjectType[];
  priority?: ProjectPriority[];
  tags?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery?: string;
}

export interface ProjectSortOptions {
  field: 'name' | 'updatedAt' | 'createdAt' | 'dueDate' | 'progress' | 'priority';
  direction: 'asc' | 'desc';
}

// ============================================================================
// PROJECT SUMMARY (For lists and cards)
// ============================================================================

export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  updatedAt: Date;
  thumbnail?: string;
  collaboratorCount: number;
  attachmentCount: number;
  tags: string[];
}

// ============================================================================
// PROJECT ANALYTICS
// ============================================================================

export interface ProjectAnalytics {
  projectId: string;
  period: AnalyticsPeriod;
  views: AnalyticsDataPoint[];
  edits: AnalyticsDataPoint[];
  collaborators: AnalyticsDataPoint[];
  progress: AnalyticsDataPoint[];
  engagement: EngagementMetrics;
}

export type AnalyticsPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface AnalyticsDataPoint {
  date: Date;
  value: number;
  label?: string;
}

export interface EngagementMetrics {
  averageSessionDuration: number;
  bounceRate: number;
  completionRate: number;
  collaborationIndex: number;
}

// ============================================================================
// PROJECT EXPORTS
// ============================================================================

export interface ProjectExport {
  format: ExportFormat;
  includeAttachments: boolean;
  includeComments: boolean;
  includeVersionHistory: boolean;
  includeAnalytics: boolean;
}

export type ExportFormat = 
  | 'pdf'
  | 'docx'
  | 'markdown'
  | 'html'
  | 'json'
  | 'csv';

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isProjectStatus(value: string): value is ProjectStatus {
  return ['draft', 'active', 'paused', 'completed', 'archived', 'deleted'].includes(value);
}

export function isProjectType(value: string): value is ProjectType {
  return [
    'personal', 'team', 'client', 'research', 'creative',
    'development', 'marketing', 'content', 'event', 'template'
  ].includes(value);
}

export function isProjectRole(value: string): value is ProjectRole {
  return ['owner', 'admin', 'editor', 'contributor', 'viewer'].includes(value);
}

export function canEditProject(role: ProjectRole): boolean {
  return ['owner', 'admin', 'editor'].includes(role);
}

export function canManageProject(role: ProjectRole): boolean {
  return ['owner', 'admin'].includes(role);
}