/**
 * QuickAction Type Definitions
 * Matches backend QuickAction entity and DTOs
 */

import { JourneyStep } from './journeyStep.types';

// ============================================================================
// ENUMS
// ============================================================================

export enum QuickActionType {
  // CREATE Phase
  CREATE_PROJECT = 'CREATE_PROJECT',
  CONTINUE_PROJECT = 'CONTINUE_PROJECT',
  UPLOAD_CONTENT = 'UPLOAD_CONTENT',
  
  // LEARN Phase
  START_TUTORIAL = 'START_TUTORIAL',
  EXPLORE_RESOURCES = 'EXPLORE_RESOURCES',
  JOIN_WORKSHOP = 'JOIN_WORKSHOP',
  
  // IMPROVE Phase
  GET_FEEDBACK = 'GET_FEEDBACK',
  REVISE_PROJECT = 'REVISE_PROJECT',
  ADD_POLISH = 'ADD_POLISH',
  
  // SELL Phase
  SET_PRICING = 'SET_PRICING',
  UPLOAD_TO_STORE = 'UPLOAD_TO_STORE',
  CREATE_BUNDLE = 'CREATE_BUNDLE',
  
  // PROMOTE Phase
  SHARE_SOCIAL = 'SHARE_SOCIAL',
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  
  // CONNECT Phase
  MESSAGE_MENTOR = 'MESSAGE_MENTOR',
  JOIN_COMMUNITY = 'JOIN_COMMUNITY',
  
  // REFLECT Phase
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  SET_GOALS = 'SET_GOALS'
}

// ============================================================================
// QUICK ACTION INTERFACE
// ============================================================================

export interface QuickAction {
  id: number;
  userId: number;
  workspaceId: number;
  actionType: QuickActionType;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl?: string;
  priority: number; // 1 = highest
  journeyStep: JourneyStep;
  context: QuickActionContext;
  relevanceScore: number; // 0-100
  isCompleted: boolean;
  completedAt?: string; // ISO datetime
  expiresAt?: string; // ISO datetime
  createdAt: string;
}

// ============================================================================
// QUICK ACTION CONTEXT
// ============================================================================

export interface QuickActionContext {
  completionRate: undefined;
  timeOfDay: any;
  tags: any;
  journeyStep: any;
  recentActivity: any;
  projectId?: number;
  projectTitle?: string;
  projectType?: string;
  relatedResourceId?: number;
  relatedResourceType?: string;
  additionalData?: Record<string, any>;
}

// ============================================================================
// QUICK ACTION RESPONSE
// ============================================================================

export interface QuickActionResponse extends QuickAction {}

// ============================================================================
// QUICK ACTION FILTERS
// ============================================================================

export interface QuickActionFilters {
  journeyStep?: JourneyStep;
  actionType?: QuickActionType;
  isCompleted?: boolean;
  minPriority?: number;
  maxPriority?: number;
}

// ============================================================================
// ACTION TYPE METADATA
// ============================================================================

export interface QuickActionTypeMetadata {
  type: QuickActionType;
  journeyStep: JourneyStep;
  icon: string;
  color: string;
  estimatedTime: string; // e.g., "5 min", "30 min"
  category: 'create' | 'learn' | 'improve' | 'sell' | 'promote' | 'connect' | 'reflect';
}

// ============================================================================
// ACTION TYPE METADATA MAP
// ============================================================================

export const QUICK_ACTION_METADATA: Record<QuickActionType, QuickActionTypeMetadata> = {
  // CREATE
  [QuickActionType.CREATE_PROJECT]: {
    type: QuickActionType.CREATE_PROJECT,
    journeyStep: JourneyStep.CREATE,
    icon: '✨',
    color: '#4F46E5',
    estimatedTime: '10 min',
    category: 'create'
  },
  [QuickActionType.CONTINUE_PROJECT]: {
    type: QuickActionType.CONTINUE_PROJECT,
    journeyStep: JourneyStep.CREATE,
    icon: '▶️',
    color: '#4F46E5',
    estimatedTime: '30 min',
    category: 'create'
  },
  [QuickActionType.UPLOAD_CONTENT]: {
    type: QuickActionType.UPLOAD_CONTENT,
    journeyStep: JourneyStep.CREATE,
    icon: '⬆️',
    color: '#4F46E5',
    estimatedTime: '5 min',
    category: 'create'
  },
  
  // LEARN
  [QuickActionType.START_TUTORIAL]: {
    type: QuickActionType.START_TUTORIAL,
    journeyStep: JourneyStep.LEARN,
    icon: '📚',
    color: '#059669',
    estimatedTime: '15 min',
    category: 'learn'
  },
  [QuickActionType.EXPLORE_RESOURCES]: {
    type: QuickActionType.EXPLORE_RESOURCES,
    journeyStep: JourneyStep.LEARN,
    icon: '🔍',
    color: '#059669',
    estimatedTime: '10 min',
    category: 'learn'
  },
  [QuickActionType.JOIN_WORKSHOP]: {
    type: QuickActionType.JOIN_WORKSHOP,
    journeyStep: JourneyStep.LEARN,
    icon: '🎓',
    color: '#059669',
    estimatedTime: '1 hour',
    category: 'learn'
  },
  
  // IMPROVE
  [QuickActionType.GET_FEEDBACK]: {
    type: QuickActionType.GET_FEEDBACK,
    journeyStep: JourneyStep.IMPROVE,
    icon: '💬',
    color: '#DC2626',
    estimatedTime: '5 min',
    category: 'improve'
  },
  [QuickActionType.REVISE_PROJECT]: {
    type: QuickActionType.REVISE_PROJECT,
    journeyStep: JourneyStep.IMPROVE,
    icon: '✏️',
    color: '#DC2626',
    estimatedTime: '30 min',
    category: 'improve'
  },
  [QuickActionType.ADD_POLISH]: {
    type: QuickActionType.ADD_POLISH,
    journeyStep: JourneyStep.IMPROVE,
    icon: '✨',
    color: '#DC2626',
    estimatedTime: '20 min',
    category: 'improve'
  },
  
  // SELL
  [QuickActionType.SET_PRICING]: {
    type: QuickActionType.SET_PRICING,
    journeyStep: JourneyStep.SELL,
    icon: '💰',
    color: '#F59E0B',
    estimatedTime: '10 min',
    category: 'sell'
  },
  [QuickActionType.UPLOAD_TO_STORE]: {
    type: QuickActionType.UPLOAD_TO_STORE,
    journeyStep: JourneyStep.SELL,
    icon: '🏪',
    color: '#F59E0B',
    estimatedTime: '15 min',
    category: 'sell'
  },
  [QuickActionType.CREATE_BUNDLE]: {
    type: QuickActionType.CREATE_BUNDLE,
    journeyStep: JourneyStep.SELL,
    icon: '📦',
    color: '#F59E0B',
    estimatedTime: '10 min',
    category: 'sell'
  },
  
  // PROMOTE
  [QuickActionType.SHARE_SOCIAL]: {
    type: QuickActionType.SHARE_SOCIAL,
    journeyStep: JourneyStep.PROMOTE,
    icon: '📢',
    color: '#8B5CF6',
    estimatedTime: '5 min',
    category: 'promote'
  },
  [QuickActionType.CREATE_CAMPAIGN]: {
    type: QuickActionType.CREATE_CAMPAIGN,
    journeyStep: JourneyStep.PROMOTE,
    icon: '📊',
    color: '#8B5CF6',
    estimatedTime: '20 min',
    category: 'promote'
  },
  
  // CONNECT
  [QuickActionType.MESSAGE_MENTOR]: {
    type: QuickActionType.MESSAGE_MENTOR,
    journeyStep: JourneyStep.CONNECT,
    icon: '💌',
    color: '#EC4899',
    estimatedTime: '5 min',
    category: 'connect'
  },
  [QuickActionType.JOIN_COMMUNITY]: {
    type: QuickActionType.JOIN_COMMUNITY,
    journeyStep: JourneyStep.CONNECT,
    icon: '👥',
    color: '#EC4899',
    estimatedTime: '5 min',
    category: 'connect'
  },
  
  // REFLECT
  [QuickActionType.VIEW_ANALYTICS]: {
    type: QuickActionType.VIEW_ANALYTICS,
    journeyStep: JourneyStep.REFLECT,
    icon: '📈',
    color: '#06B6D4',
    estimatedTime: '10 min',
    category: 'reflect'
  },
  [QuickActionType.SET_GOALS]: {
    type: QuickActionType.SET_GOALS,
    journeyStep: JourneyStep.REFLECT,
    icon: '🎯',
    color: '#06B6D4',
    estimatedTime: '15 min',
    category: 'reflect'
  }
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isQuickActionType(value: string): value is QuickActionType {
  return Object.values(QuickActionType).includes(value as QuickActionType);
}

export function getActionMetadata(type: QuickActionType): QuickActionTypeMetadata {
  return QUICK_ACTION_METADATA[type];
}

export function getActionsByJourneyStep(step: JourneyStep): QuickActionTypeMetadata[] {
  return Object.values(QUICK_ACTION_METADATA).filter(
    metadata => metadata.journeyStep === step
  );
}
