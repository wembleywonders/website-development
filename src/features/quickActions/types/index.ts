/**
 * Quick Actions Type Definitions
 * @module features/quickActions/types
 */

// ============================================================================
// QUICK ACTION CORE TYPES
// ============================================================================

export interface QuickAction {
  id: string;
  projectId?: string;
  workspaceId: string;
  title: string;
  description?: string;
  category: QuickActionCategory;
  type: QuickActionType;
  priority: QuickActionPriority;
  status: QuickActionStatus;
  
  // Execution
  action?: QuickActionExecutor;
  command?: string;
  url?: string;
  data?: any;
  
  // Metadata
  icon?: string;
  color?: string;
  tags: string[];
  estimatedTime?: number; // minutes
  points?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // AI/Maya
  mayaGenerated?: boolean;
  mayaPersonality?: MayaPersonality;
  mayaConfidence?: number;
  mayaReasoning?: string;
  
  // Tracking
  createdAt: Date;
  createdBy: string;
  completedAt?: Date;
  completedBy?: string;
  dismissedAt?: Date;
  deferredUntil?: Date;
  
  // Context
  context?: QuickActionContext;
  requirements?: QuickActionRequirement[];
  outcomes?: QuickActionOutcome[];
}

// ============================================================================
// QUICK ACTION ENUMS & TYPES
// ============================================================================

export type QuickActionCategory = 
  | 'task'
  | 'learn'
  | 'create'
  | 'review'
  | 'collaborate'
  | 'optimize'
  | 'analyze'
  | 'communicate'
  | 'document'
  | 'automate';

export type QuickActionType = 
  | 'immediate'
  | 'scheduled'
  | 'recurring'
  | 'conditional'
  | 'milestone';

export type QuickActionPriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'optional';

export type QuickActionStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'dismissed'
  | 'deferred'
  | 'failed';

export type MayaPersonality = 
  | 'mentor'     // Teaching and guiding
  | 'coach'      // Motivating and pushing
  | 'assistant'  // Helping and supporting
  | 'strategist' // Planning and analyzing
  | 'creative'   // Inspiring and innovating
  | 'analyst';   // Data-driven insights

// ============================================================================
// QUICK ACTION COMPONENTS
// ============================================================================

export interface QuickActionContext {
  projectPhase?: string;
  userActivity?: string;
  timeOfDay?: string;
  workload?: 'light' | 'moderate' | 'heavy';
  energy?: 'low' | 'medium' | 'high';
  deadline?: Date;
  recentActions?: string[];
  preferences?: Record<string, any>;
}

export interface QuickActionRequirement {
  type: 'skill' | 'resource' | 'time' | 'dependency';
  name: string;
  description?: string;
  isMet: boolean;
}

export interface QuickActionOutcome {
  type: 'deliverable' | 'skill' | 'progress' | 'insight';
  name: string;
  description?: string;
  value?: any;
}

export type QuickActionExecutor = (action: QuickAction) => Promise<void>;

// ============================================================================
// QUICK ACTION TEMPLATES
// ============================================================================

export interface QuickActionTemplate {
  id: string;
  name: string;
  description: string;
  category: QuickActionCategory;
  icon?: string;
  color?: string;
  defaultData: Partial<QuickAction>;
  variables?: TemplateVariable[];
  conditions?: TemplateCondition[];
  isSystem: boolean;
  isCustom: boolean;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select';
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: { label: string; value: any }[];
}

export interface TemplateCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'between';
  value: any;
}

// ============================================================================
// MAYA AI TYPES
// ============================================================================

export interface QuickActionGeneration {
  workspaceId: string;
  projectId?: string;
  context: QuickActionContext;
  personality: MayaPersonality;
  count?: number;
  categories?: QuickActionCategory[];
  excludeCompleted?: boolean;
}

export interface QuickActionSuggestion {
  action: QuickAction;
  confidence: number;
  reasoning: string;
  alternativePersonalities?: {
    personality: MayaPersonality;
    variation: string;
  }[];
}

export interface MayaResponse {
  suggestions: QuickActionSuggestion[];
  personality: MayaPersonality;
  context: QuickActionContext;
  generatedAt: Date;
  processingTime: number;
}

// ============================================================================
// QUICK ACTION METRICS
// ============================================================================

export interface QuickActionMetrics {
  totalGenerated: number;
  totalCompleted: number;
  totalDismissed: number;
  completionRate: number;
  averageCompletionTime: number;
  
  byCategory: Record<QuickActionCategory, CategoryMetrics>;
  byPersonality: Record<MayaPersonality, PersonalityMetrics>;
  
  mostProductiveTime: string;
  preferredCategories: QuickActionCategory[];
  preferredPersonality: MayaPersonality;
}

export interface CategoryMetrics {
  count: number;
  completed: number;
  dismissed: number;
  averageTime: number;
  successRate: number;
}

export interface PersonalityMetrics {
  suggestionsGenerated: number;
  suggestionsAccepted: number;
  acceptanceRate: number;
  averageConfidence: number;
  userRating?: number;
}

// ============================================================================
// QUICK ACTION PREFERENCES
// ============================================================================

export interface QuickActionPreferences {
  enabled: boolean;
  autoGenerate: boolean;
  generationFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  maxSuggestions: number;
  
  personalities: {
    enabled: MayaPersonality[];
    default: MayaPersonality;
    weights: Record<MayaPersonality, number>;
  };
  
  categories: {
    enabled: QuickActionCategory[];
    weights: Record<QuickActionCategory, number>;
  };
  
  timing: {
    morningStart: string; // HH:MM
    morningEnd: string;
    afternoonStart: string;
    afternoonEnd: string;
    eveningStart: string;
    eveningEnd: string;
  };
  
  notifications: {
    enabled: boolean;
    channels: ('inApp' | 'email' | 'push')[];
    frequency: 'immediate' | 'batched' | 'daily';
  };
}

// ============================================================================
// QUICK ACTION COMPLETION
// ============================================================================

export interface QuickActionCompletion {
  actionId: string;
  completedAt: Date;
  completedBy: string;
  duration: number; // seconds
  result?: any;
  feedback?: CompletionFeedback;
  artifacts?: CompletionArtifact[];
}

export interface CompletionFeedback {
  helpful: boolean;
  difficulty: 'easier' | 'accurate' | 'harder';
  wouldRepeat: boolean;
  comment?: string;
  rating?: number; // 1-5
}

export interface CompletionArtifact {
  type: 'file' | 'link' | 'note' | 'code' | 'image';
  name: string;
  url?: string;
  content?: string;
  metadata?: Record<string, any>;
}

// ============================================================================
// QUICK ACTION REQUESTS & RESPONSES
// ============================================================================

export interface GenerateQuickActionsRequest {
  workspaceId: string;
  projectId?: string;
  context?: Partial<QuickActionContext>;
  personality?: MayaPersonality;
  count?: number;
}

export interface QuickActionResponse extends QuickAction {
  mayaSuggestion?: QuickActionSuggestion;
  relatedActions?: QuickAction[];
}

export interface CompleteQuickActionRequest {
  feedback?: CompletionFeedback;
  artifacts?: CompletionArtifact[];
  duration?: number;
  result?: any;
}

export interface DismissQuickActionRequest {
  reason?: 'not_relevant' | 'too_difficult' | 'already_done' | 'not_now' | 'other';
  feedback?: string;
  deferUntil?: Date;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isQuickActionCategory(value: string): value is QuickActionCategory {
  return [
    'task', 'learn', 'create', 'review', 'collaborate',
    'optimize', 'analyze', 'communicate', 'document', 'automate'
  ].includes(value);
}

export function isQuickActionStatus(value: string): value is QuickActionStatus {
  return [
    'pending', 'in_progress', 'completed', 
    'dismissed', 'deferred', 'failed'
  ].includes(value);
}

export function isMayaPersonality(value: string): value is MayaPersonality {
  return [
    'mentor', 'coach', 'assistant', 
    'strategist', 'creative', 'analyst'
  ].includes(value);
}

export function isActionable(action: QuickAction): boolean {
  return action.status === 'pending' || action.status === 'deferred';
}

export function isCompleted(action: QuickAction): boolean {
  return action.status === 'completed';
}
