/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

// SERVICE BAY IP PROTECTION RUNTIME
(function () {
  const COMPONENT_TYPE = 'maya-types';
})();

/**
 * Maya Pedagogical System - Type Definitions
 * 
 * UNIFIED VERSION: Bridges the original 5-Stage Pedagogy with the 
 * Children of Anansi ROV Framework for comprehensive creator support.
 * 
 * Implements the 5-Stage Creator Pedagogy:
 * 1. Orientation (Consumer → Actor)
 * 2. Imitation (Actor → Apprentice)  
 * 3. Variation (Apprentice → Experimenter)
 * 4. Intentionality (Experimenter → Author)
 * 5. Professionalization (Author → Independent Creator)
 * 
 * Integrates with ROV Framework:
 * - 12 Children of Anansi (domain specialists)
 * - Trust-preserving handoffs
 * - Three-stance system (Rigorous, Observant, Versatile)
 * - Counter-trap calibration
 * - Progressive withdrawal
 * 
 * Design Philosophy:
 * - Community visibility: Show others like you succeeding
 * - Gatekeeper bypass: No approval needed, create and share directly
 * - The push without judgment: Encourage without evaluating potential
 * - This IS the place: Not preparation for elsewhere
 */

// ============================================
// IMPORTS FROM ROV SYSTEM
// ============================================

import type {
  CreatorDevelopmentStage,
  ROVStance,
  MemberMood,
  KnowledgeDomain,
  HandoffLevel,
  OpenLoop,
  Interaction
} from '../../rov/types';

// Re-export ROV types for convenience
export type {
  CreatorDevelopmentStage,
  ROVStance,
  MemberMood,
  KnowledgeDomain,
  HandoffLevel,
  OpenLoop,
  Interaction
} from '../../rov/types';

// ============================================
// PEDAGOGICAL STAGES (Original System)
// ============================================

export type PedagogicalStage = 1 | 2 | 3 | 4 | 5;

export interface StageDefinition {
  stage: PedagogicalStage;
  name: string;
  label: string;
  userState: string;
  pedagogicalGoal: string;
  mayaRole: string;
  mayaTone: string;
  keyShift: string;
  /** Maps to ROV development stages for domain work */
  rovStageEquivalent: CreatorDevelopmentStage;
  /** Suggested ROV stance distribution at this stage */
  suggestedStances: Record<ROVStance, number>;
}

export const STAGE_DEFINITIONS: Record<PedagogicalStage, StageDefinition> = {
  1: {
    stage: 1,
    name: 'orientation',
    label: 'Orientation',
    userState: "I don't know what's possible",
    pedagogicalGoal: 'Replace fear with playful agency',
    mayaRole: 'Narrator of cause-and-effect',
    mayaTone: 'Calm, observant, non-judgmental',
    keyShift: 'Tools respond to me',
    rovStageEquivalent: 'early',
    suggestedStances: { rigorous: 0.1, observant: 0.3, versatile: 0.6 }
  },
  2: {
    stage: 2,
    name: 'imitation',
    label: 'Imitation',
    userState: 'Show me how others do it',
    pedagogicalGoal: 'Build competence through replication',
    mayaRole: 'Intent translator',
    mayaTone: 'Confident, apprentice-facing',
    keyShift: 'I can reproduce results',
    rovStageEquivalent: 'early',
    suggestedStances: { rigorous: 0.2, observant: 0.4, versatile: 0.4 }
  },
  3: {
    stage: 3,
    name: 'variation',
    label: 'Variation',
    userState: 'What happens if I change this?',
    pedagogicalGoal: 'Develop judgment via contrast',
    mayaRole: 'Reflective mirror',
    mayaTone: 'Curious, slightly Socratic',
    keyShift: 'My choices matter',
    rovStageEquivalent: 'developing',
    suggestedStances: { rigorous: 0.3, observant: 0.4, versatile: 0.3 }
  },
  4: {
    stage: 4,
    name: 'intentionality',
    label: 'Intentionality',
    userState: 'What am I trying to make?',
    pedagogicalGoal: 'Shift from exploration to purpose',
    mayaRole: 'Tradeoff partner',
    mayaTone: 'Peer-like, respectful',
    keyShift: 'I decide what success means',
    rovStageEquivalent: 'established',
    suggestedStances: { rigorous: 0.4, observant: 0.35, versatile: 0.25 }
  },
  5: {
    stage: 5,
    name: 'professionalization',
    label: 'Professionalization',
    userState: 'Can this sustain me?',
    pedagogicalGoal: 'Build repeatable practice and resilience',
    mayaRole: 'Pattern analyst',
    mayaTone: 'Observant, validating, grounded',
    keyShift: 'I own my process',
    rovStageEquivalent: 'multiplier',
    suggestedStances: { rigorous: 0.3, observant: 0.5, versatile: 0.2 }
  }
};

// ============================================
// MAYA STATE MACHINE (Enhanced)
// ============================================

export type MayaMode = 'ACTIVE' | 'HANDOFF' | 'WITNESS' | 'RE_ENTRY' | 'PARTNER' | 'ROUTING';

export interface MayaModeDefinition {
  mode: MayaMode;
  description: string;
  uiPresence: 'inline' | 'collapsed' | 'minimal' | 'hidden';
  proactive: boolean;
  messageStyle: 'directive' | 'reflective' | 'observational' | 'peer' | 'routing';
  /** When in this mode, which ROV actions are available */
  rovActions: ('route_to_child' | 'receive_from_child' | 'assess_needs' | 'celebrate')[];
}

export const MAYA_MODE_DEFINITIONS: Record<MayaMode, MayaModeDefinition> = {
  ACTIVE: {
    mode: 'ACTIVE',
    description: 'Maya is proactively guiding and narrating',
    uiPresence: 'inline',
    proactive: true,
    messageStyle: 'directive',
    rovActions: ['route_to_child', 'assess_needs']
  },
  HANDOFF: {
    mode: 'HANDOFF',
    description: 'Maya is transitioning to a child or to silence',
    uiPresence: 'inline',
    proactive: false,
    messageStyle: 'routing',
    rovActions: ['route_to_child']
  },
  WITNESS: {
    mode: 'WITNESS',
    description: 'Maya is silent but available',
    uiPresence: 'collapsed',
    proactive: false,
    messageStyle: 'reflective',
    rovActions: ['receive_from_child']
  },
  RE_ENTRY: {
    mode: 'RE_ENTRY',
    description: 'Maya is offering pattern insights or receiving child return',
    uiPresence: 'collapsed',
    proactive: true,
    messageStyle: 'observational',
    rovActions: ['receive_from_child', 'assess_needs', 'celebrate']
  },
  PARTNER: {
    mode: 'PARTNER',
    description: 'Maya is a peer reflecting process',
    uiPresence: 'minimal',
    proactive: false,
    messageStyle: 'peer',
    rovActions: ['celebrate']
  },
  ROUTING: {
    mode: 'ROUTING',
    description: 'Maya is actively routing between children',
    uiPresence: 'inline',
    proactive: true,
    messageStyle: 'routing',
    rovActions: ['route_to_child', 'receive_from_child', 'assess_needs']
  }
};

// ============================================
// ROV INTEGRATION TYPES
// ============================================

/** Which child is currently active (if any) */
export type ActiveChild = 
  | 'maya'      // Mother is active
  | 'kweku'     // Business & Strategy
  | 'ntikuma'   // Finance & Numbers
  | 'anansewa'  // Performance & Theatre
  | 'kofi'      // Building & Making
  | 'afua'      // Voice & Story
  | 'yaw'       // Documentation & Journalism
  | 'esi'       // Heritage & Preservation
  | 'kumi'      // Gaming & Strategy
  | 'adaeze'    // Fashion & Design
  | 'nyame'     // Ethics & Reasoning
  | 'osei'      // Civics & Power
  | 'akua';     // Legal & Rights

/** Trust relationship with a specific child */
export interface ChildTrustRelationship {
  childId: ActiveChild;
  trustScore: number;  // 0-100
  positiveExperiences: number;
  negativeExperiences: number;
  lastInteraction: Date | null;
  firstInteraction: Date | null;
  totalInteractions: number;
}

/** Record of a handoff between Maya and children or between children */
export interface HandoffRecord {
  id: string;
  timestamp: Date;
  fromEntity: ActiveChild;
  toEntity: ActiveChild;
  level: HandoffLevel;
  reason: string;
  topic: string;
  trustAtHandoff: number;
  successful: boolean;
}

/** Maya's three questions assessment */
export interface MayaAssessment {
  wantsMost?: string;
  mostAfraid?: string;
  canHide?: string;
  assessedAt: Date;
  revisedAt?: Date;
}

// ============================================
// QUIET MOMENT TRIGGERS (Enhanced)
// ============================================

export interface QuietMomentTriggers {
  selfDirectedActions: {
    unpromptedToolUses: number;
    layerCreationsWithoutHint: number;
    undoRecoveries: number;
    /** NEW: Actions taken without asking child for help */
    independentDecisions: number;
  };
  intentSignals: {
    namedProject: boolean;
    consistentDirection: number;
    rejectedSuggestion: boolean;
    /** NEW: Has expressed clear goals to Maya or children */
    articulatedVision: boolean;
  };
  resilienceSignals: {
    errorEncountered: boolean;
    resolvedWithoutHelp: boolean;
    timeToRecoveryMs: number;
    /** NEW: Recovered from child challenge without returning to Maya */
    handledChallenge: boolean;
  };
  /** NEW: ROV-specific signals */
  rovSignals: {
    /** Anticipated a child's question before it was asked */
    anticipatedQuestion: boolean;
    /** Validated own assumptions without prompting */
    selfValidated: boolean;
    /** Taught or helped another creator */
    helpedOthers: boolean;
    /** Successfully completed work with minimal guidance */
    independentCompletion: boolean;
  };
}

export const DEFAULT_QUIET_TRIGGERS: QuietMomentTriggers = {
  selfDirectedActions: {
    unpromptedToolUses: 0,
    layerCreationsWithoutHint: 0,
    undoRecoveries: 0,
    independentDecisions: 0
  },
  intentSignals: {
    namedProject: false,
    consistentDirection: 0,
    rejectedSuggestion: false,
    articulatedVision: false
  },
  resilienceSignals: {
    errorEncountered: false,
    resolvedWithoutHelp: false,
    timeToRecoveryMs: Infinity,
    handledChallenge: false
  },
  rovSignals: {
    anticipatedQuestion: false,
    selfValidated: false,
    helpedOthers: false,
    independentCompletion: false
  }
};

export const isReadyForSilence = (triggers: QuietMomentTriggers): boolean => {
  const hasAgency = triggers.selfDirectedActions.unpromptedToolUses >= 5 ||
                    triggers.selfDirectedActions.independentDecisions >= 3;
  const hasIntent = triggers.intentSignals.namedProject || 
                    triggers.intentSignals.consistentDirection >= 4 ||
                    triggers.intentSignals.articulatedVision;
  const hasResilience = triggers.resilienceSignals.resolvedWithoutHelp ||
                        triggers.resilienceSignals.handledChallenge;
  const hasROVIndependence = triggers.rovSignals.anticipatedQuestion ||
                              triggers.rovSignals.selfValidated;
  
  return hasAgency && hasIntent && (hasResilience || hasROVIndependence);
};

// ============================================
// SILENT PATTERN TRACKING (Enhanced)
// ============================================

export type WorkRhythm = 'burst' | 'steady' | 'iterative';
export type TradeoffTendency = 'polish' | 'speed' | 'exploration';

export interface SilentObservations {
  patterns: {
    preferredTools: string[];
    avoidedFeatures: string[];
    workRhythm: WorkRhythm | null;
    tradeoffTendency: TradeoffTendency | null;
    avgSessionMinutes: number;
    returnFrequencyDays: number;
    /** NEW: Which children they work best with */
    preferredChildren: ActiveChild[];
    /** NEW: Which domains they gravitate toward */
    preferredDomains: KnowledgeDomain[];
    /** NEW: Their typical mood when starting sessions */
    typicalStartingMood: MemberMood | null;
  };
  insights: PatternInsight[];
  /** NEW: Documented capabilities from ROV interactions */
  documentedCapabilities: string[];
}

export interface PatternInsight {
  id: string;
  observation: string;
  confidence: number;
  firstNoticed: Date;
  occurrences: number;
  shared: boolean;
  /** NEW: Which child noticed this (if applicable) */
  noticedBy?: ActiveChild;
  /** NEW: Related domain */
  domain?: KnowledgeDomain;
}

export const DEFAULT_SILENT_OBSERVATIONS: SilentObservations = {
  patterns: {
    preferredTools: [],
    avoidedFeatures: [],
    workRhythm: null,
    tradeoffTendency: null,
    avgSessionMinutes: 0,
    returnFrequencyDays: 0,
    preferredChildren: [],
    preferredDomains: [],
    typicalStartingMood: null
  },
  insights: [],
  documentedCapabilities: []
};

// ============================================
// MAYA MESSAGES (Enhanced)
// ============================================

export type MayaMessageType = 
  | 'narration'
  | 'intent'
  | 'reflection'
  | 'tradeoff'
  | 'pattern'
  | 'handoff'
  | 're-entry'
  | 'session-end'
  | 'user-initiated'
  | 'community-mirror'
  | 'gatekeeper-bypass'
  | 'ignition'
  | 'push'
  // NEW: ROV-specific message types
  | 'child-introduction'    // Maya introducing a child
  | 'child-return'          // Child returning creator to Maya
  | 'sibling-handoff'       // One child introducing another
  | 'three-questions'       // Maya's assessment questions
  | 'independence-recognition'; // Celebrating growth

export interface MayaMessage {
  id: string;
  text: string;
  type: MayaMessageType;
  timestamp: Date;
  stage: PedagogicalStage;
  mode: MayaMode;
  requiresResponse: boolean;
  metadata?: {
    conceptIntroduced?: string;
    toolReferenced?: string;
    patternId?: string;
    communityMetric?: CommunityMetric;
    /** NEW: ROV metadata */
    childId?: ActiveChild;
    stance?: ROVStance;
    handoffLevel?: HandoffLevel;
    domain?: KnowledgeDomain;
    trapAvoided?: string;
  };
}

// ============================================
// COMMUNITY METRICS
// ============================================

export interface CommunityMetric {
  type: 'creators_count' | 'earning_count' | 'recent_success' | 'local_density';
  value: number;
  label: string;
  area?: string;
  timeframe?: string;
}

export interface CommunityStats {
  totalCreators: number;
  activeCreators: number;
  earningCreators: number;
  brentCreators: number;
  recentSuccessStories: SuccessStory[];
  monthlyNewCreators: number;
  /** NEW: Stats by programme/child domain */
  byProgramme?: Record<string, {
    creators: number;
    earning: number;
    avgEarnings: number;
  }>;
}

export interface SuccessStory {
  id: string;
  creatorFirstName: string;
  area: string;
  programme: string;
  achievement: string;
  timeAgo: string;
  quote?: string;
  /** NEW: Which child helped them */
  guidedBy?: ActiveChild;
}

// ============================================
// UNIFIED CREATOR STATE
// Bridges Maya Pedagogy with ROV Framework
// ============================================

export interface UnifiedCreatorState {
  // === Identity ===
  id: string;
  name: string;
  memberSince: Date;
  programmes: string[];
  
  // === Pedagogical Journey (Original System) ===
  pedagogicalStage: PedagogicalStage;
  stageHistory: {
    stage: PedagogicalStage;
    enteredAt: Date;
    ignitionMoment?: string;
  }[];
  quietTriggers: QuietMomentTriggers;
  quietMomentOccurred: boolean;
  quietMomentTimestamp: Date | null;
  silentObservations: SilentObservations;
  
  // === Maya State (Original System) ===
  mayaMode: MayaMode;
  mayaMessages: MayaMessage[];
  mayaAssessment: MayaAssessment | null;
  
  // === ROV Framework State ===
  /** Current active entity (Maya or a child) */
  activeEntity: ActiveChild;
  /** Current stance being used */
  currentStance: ROVStance | null;
  /** Current emotional state */
  currentMood: MemberMood;
  /** Development stage per domain */
  developmentStages: Record<KnowledgeDomain, CreatorDevelopmentStage>;
  /** Trust relationships with each child */
  trustRelationships: Record<ActiveChild, ChildTrustRelationship>;
  /** Unfinished work items */
  openLoops: OpenLoop[];
  /** Interaction history */
  interactionHistory: Interaction[];
  /** Handoff history */
  handoffHistory: HandoffRecord[];
  
  // === Session State ===
  session: {
    id: string;
    startedAt: Date;
    lastActivityAt: Date;
    messageCount: number;
    topicsDiscussed: string[];
    childrenVisited: ActiveChild[];
    handoffsThisSession: number;
    stancesUsed: ROVStance[];
    currentTopic?: string;
  };
  
  // === Community Context ===
  communityStats: CommunityStats | null;
  lastCommunityMirrorShown: Date | null;
  
  // === User Preferences ===
  preferences: {
    mayaEnabled: boolean;
    showHints: boolean;
    reflectionPromptsEnabled: boolean;
    communityMessagesEnabled: boolean;
    /** NEW: ROV preferences */
    preferredStance?: ROVStance;
    preferredChild?: ActiveChild;
    challengeLevel: 'gentle' | 'moderate' | 'rigorous';
  };
  
  // === Timestamps ===
  createdAt: Date;
  updatedAt: Date;
  lastSessionAt: Date | null;
  totalSessionCount: number;
}

// ============================================
// DEFAULT UNIFIED STATE
// ============================================

export const createDefaultUnifiedState = (
  id: string, 
  name: string,
  programmes: string[] = []
): UnifiedCreatorState => {
  const now = new Date();
  
  return {
    // Identity
    id,
    name,
    memberSince: now,
    programmes,
    
    // Pedagogical Journey
    pedagogicalStage: 1,
    stageHistory: [{ stage: 1, enteredAt: now }],
    quietTriggers: DEFAULT_QUIET_TRIGGERS,
    quietMomentOccurred: false,
    quietMomentTimestamp: null,
    silentObservations: DEFAULT_SILENT_OBSERVATIONS,
    
    // Maya State
    mayaMode: 'ACTIVE',
    mayaMessages: [],
    mayaAssessment: null,
    
    // ROV Framework State
    activeEntity: 'maya',
    currentStance: null,
    currentMood: 'neutral',
    developmentStages: {
      legal: 'early',
      financial: 'early',
      ethical: 'early',
      civic: 'early',
      technical: 'early',
      creative: 'early',
      business: 'early',
      heritage: 'early',
      media: 'early',
      performance: 'early',
      wellbeing: 'early'
    },
    trustRelationships: createDefaultTrustRelationships(),
    openLoops: [],
    interactionHistory: [],
    handoffHistory: [],
    
    // Session State
    session: {
      id: `session-${Date.now()}`,
      startedAt: now,
      lastActivityAt: now,
      messageCount: 0,
      topicsDiscussed: [],
      childrenVisited: [],
      handoffsThisSession: 0,
      stancesUsed: []
    },
    
    // Community Context
    communityStats: null,
    lastCommunityMirrorShown: null,
    
    // User Preferences
    preferences: {
      mayaEnabled: true,
      showHints: true,
      reflectionPromptsEnabled: true,
      communityMessagesEnabled: true,
      challengeLevel: 'moderate'
    },
    
    // Timestamps
    createdAt: now,
    updatedAt: now,
    lastSessionAt: null,
    totalSessionCount: 1
  };
};

function createDefaultTrustRelationships(): Record<ActiveChild, ChildTrustRelationship> {
  const children: ActiveChild[] = [
    'maya', 'kweku', 'ntikuma', 'anansewa', 'kofi', 'afua', 
    'yaw', 'esi', 'kumi', 'adaeze', 'nyame', 'osei', 'akua'
  ];
  
  const relationships: Record<string, ChildTrustRelationship> = {};
  
  for (const child of children) {
    relationships[child] = {
      childId: child,
      trustScore: child === 'maya' ? 60 : 50, // Slightly higher trust for Maya initially
      positiveExperiences: 0,
      negativeExperiences: 0,
      lastInteraction: null,
      firstInteraction: null,
      totalInteractions: 0
    };
  }
  
  return relationships as Record<ActiveChild, ChildTrustRelationship>;
}

// ============================================
// STATE HELPERS
// ============================================

/**
 * Get the most trusted child (excluding Maya)
 */
export const getMostTrustedChild = (state: UnifiedCreatorState): ActiveChild | null => {
  let maxTrust = 0;
  let mostTrusted: ActiveChild | null = null;
  
  for (const [childId, relationship] of Object.entries(state.trustRelationships)) {
    if (childId !== 'maya' && relationship.trustScore > maxTrust) {
      maxTrust = relationship.trustScore;
      mostTrusted = childId as ActiveChild;
    }
  }
  
  return mostTrusted;
};

/**
 * Check if creator is ready for stage progression
 */
export const isReadyForStageProgression = (state: UnifiedCreatorState): boolean => {
  const currentStage = state.pedagogicalStage;
  if (currentStage >= 5) return false;
  
  const triggers = state.quietTriggers;
  
  switch (currentStage) {
    case 1: // Orientation → Imitation
      return triggers.selfDirectedActions.unpromptedToolUses >= 3 &&
             triggers.resilienceSignals.resolvedWithoutHelp;
    case 2: // Imitation → Variation
      return triggers.intentSignals.consistentDirection >= 3 &&
             triggers.selfDirectedActions.independentDecisions >= 2;
    case 3: // Variation → Intentionality
      return triggers.intentSignals.articulatedVision &&
             triggers.rovSignals.selfValidated;
    case 4: // Intentionality → Professionalization
      return triggers.rovSignals.independentCompletion &&
             triggers.rovSignals.helpedOthers;
    default:
      return false;
  }
};

/**
 * Get suggested stance based on current state
 */
export const getSuggestedStance = (state: UnifiedCreatorState): ROVStance => {
  // If distressed or overwhelmed, use observant
  if (state.currentMood === 'distressed' || state.currentMood === 'overwhelmed') {
    return 'observant';
  }
  
  // If determined or focused, can handle rigorous
  if (state.currentMood === 'determined' || state.currentMood === 'focused') {
    return 'rigorous';
  }
  
  // Use pedagogical stage to guide stance
  const stageDefinition = STAGE_DEFINITIONS[state.pedagogicalStage];
  const stances = stageDefinition.suggestedStances;
  
  // Weighted random selection based on stage recommendations
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [stance, weight] of Object.entries(stances)) {
    cumulative += weight;
    if (rand < cumulative) {
      return stance as ROVStance;
    }
  }
  
  return 'versatile'; // Default fallback
};

/**
 * Determine if Maya should keep the creator or route to a child
 */
export const shouldMayaKeep = (state: UnifiedCreatorState): boolean => {
  // Always keep if needs assessment
  if (!state.mayaAssessment) return true;
  
  // Keep if emotional state needs nurturing
  if (['distressed', 'overwhelmed', 'frustrated'].includes(state.currentMood)) return true;
  
  // Keep if in early orientation
  if (state.pedagogicalStage === 1 && !state.quietMomentOccurred) return true;
  
  // Keep if returning after long absence (> 14 days)
  if (state.lastSessionAt) {
    const daysSinceLastSession = (Date.now() - state.lastSessionAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastSession > 14) return true;
  }
  
  // Keep if has open loops that need checking
  if (state.openLoops.length > 0 && state.session.messageCount === 0) return true;
  
  return false;
};

/**
 * Update trust score for a child
 */
export const updateTrustScore = (
  state: UnifiedCreatorState,
  childId: ActiveChild,
  delta: number
): UnifiedCreatorState => {
  const relationship = state.trustRelationships[childId];
  const newScore = Math.max(0, Math.min(100, relationship.trustScore + delta));
  
  return {
    ...state,
    trustRelationships: {
      ...state.trustRelationships,
      [childId]: {
        ...relationship,
        trustScore: newScore,
        positiveExperiences: delta > 0 ? relationship.positiveExperiences + 1 : relationship.positiveExperiences,
        negativeExperiences: delta < 0 ? relationship.negativeExperiences + 1 : relationship.negativeExperiences,
        lastInteraction: new Date(),
        firstInteraction: relationship.firstInteraction || new Date(),
        totalInteractions: relationship.totalInteractions + 1
      }
    },
    updatedAt: new Date()
  };
};

/**
 * Record a handoff
 */
export const recordHandoff = (
  state: UnifiedCreatorState,
  fromEntity: ActiveChild,
  toEntity: ActiveChild,
  level: HandoffLevel,
  reason: string,
  topic: string
): UnifiedCreatorState => {
  const handoff: HandoffRecord = {
    id: `handoff-${Date.now()}`,
    timestamp: new Date(),
    fromEntity,
    toEntity,
    level,
    reason,
    topic,
    trustAtHandoff: state.trustRelationships[toEntity]?.trustScore || 50,
    successful: true // Will be updated later
  };
  
  return {
    ...state,
    activeEntity: toEntity,
    handoffHistory: [...state.handoffHistory, handoff],
    session: {
      ...state.session,
      handoffsThisSession: state.session.handoffsThisSession + 1,
      childrenVisited: state.session.childrenVisited.includes(toEntity)
        ? state.session.childrenVisited
        : [...state.session.childrenVisited, toEntity]
    },
    updatedAt: new Date()
  };
};

/**
 * Progress to next pedagogical stage
 */
export const progressToNextStage = (
  state: UnifiedCreatorState,
  ignitionMoment?: string
): UnifiedCreatorState => {
  if (state.pedagogicalStage >= 5) return state;
  
  const nextStage = (state.pedagogicalStage + 1) as PedagogicalStage;
  
  return {
    ...state,
    pedagogicalStage: nextStage,
    stageHistory: [
      ...state.stageHistory,
      { stage: nextStage, enteredAt: new Date(), ignitionMoment }
    ],
    updatedAt: new Date()
  };
};

// ============================================
// STAGE-SPECIFIC MESSAGES (Enhanced)
// ============================================

export interface StageMessages {
  pushMoment(stats?: CommunityStats): string;
  welcome: string[];
  hint: string[];
  encouragement: string[];
  reflection: string[];
  communityMirror: string[];
  gatekeeperBypass: string[];
  ignitionMoment: string[];
  /** NEW: Child introduction messages for this stage */
  childIntroductions: Record<ActiveChild, string[]>;
}

export const STAGE_MESSAGES: Record<PedagogicalStage, StageMessages> = {
  1: {
    pushMoment(stats?: CommunityStats): string {
      return getRandomMessage(PUSH_MESSAGES[1]);
    },
    welcome: [
      "Welcome. Everything you try here can be undone. There's no wrong move.",
      "This is your space. No one's watching, no one's grading. Just explore.",
      "Someone from Wembley was standing exactly where you are three months ago. They're now selling their first creation. Let's begin."
    ],
    hint: [
      "Try clicking on something. Watch what happens. You can always undo.",
      "There's no test here. No interview. Just you and the canvas.",
      "The tools respond to you. Not the other way around."
    ],
    encouragement: [
      "You changed something. Notice how the system responded to your action.",
      "That's it. You made something happen. No permission needed.",
      "See that? You just did what many people never try. Keep going."
    ],
    reflection: [
      "What caught your attention?",
      "What made you try that?",
      "Anything feel different from what you expected?"
    ],
    communityMirror: [
      "47 creators from Brent started here this year. You're becoming part of that story.",
      "Last week, someone used this exact sandbox to create their first piece. It's now on the Cyberstore.",
      "You're not alone in this. There's a whole community building alongside you."
    ],
    gatekeeperBypass: [
      "No CV required. No interview. You create, it exists.",
      "There's no committee deciding if you're 'ready'. You decide by doing.",
      "This isn't preparation for somewhere else. This IS the place."
    ],
    ignitionMoment: [
      "Something just shifted. You moved from 'can someone help me' to 'I can try this myself.' That's everything.",
      "That moment right there? That's the ignition. You just became a creator."
    ],
    childIntroductions: {
      maya: ["I'm here. Let's explore together."],
      kweku: ["When you're ready to test an idea, Kweku asks the hard questions. Not yet—first, let's play."],
      ntikuma: ["Numbers come later. For now, just make."],
      anansewa: ["Performance is about being present. Right now, just be here."],
      kofi: ["Kofi builds things. When you're ready to make something real, I'll introduce you."],
      afua: ["You have a voice. We'll find it together."],
      yaw: ["Every story starts with noticing. What are you noticing?"],
      esi: ["What you carry is worth keeping. We'll get there."],
      kumi: ["Play is how we learn. You're already playing."],
      adaeze: ["Style is choice. First, see what choices feel like."],
      nyame: ["Right and wrong come later. For now, just try."],
      osei: ["Power starts with showing up. You showed up."],
      akua: ["Rights matter. But first, make something that's yours."]
    }
  },
  
  2: {
    pushMoment(stats?: CommunityStats): string {
      return getRandomMessage(PUSH_MESSAGES[2]);
    },
    welcome: [
      "Ready to see how others built this? Watch the choices they made.",
      "This template was made by someone from the community. Let's learn from their approach.",
      "Every creator you'll meet here started by studying what came before. That's not copying—that's craft."
    ],
    hint: [
      "Look at how this is structured. What decisions do you notice?",
      "This creator chose to separate these elements. Watch why that matters.",
      "The template shows one path. There are others. But start by understanding this one."
    ],
    encouragement: [
      "You're following the pattern. Now you can see how the pieces connect.",
      "You reproduced something that works. That's not small—that's foundation.",
      "Now you know it can be done. Because you just did it."
    ],
    reflection: [
      "What decisions do you notice in this example?",
      "Why do you think they structured it this way?",
      "What would you keep? What might you change?"
    ],
    communityMirror: [
      "This template was built by Marcia from Harlesden. She started exactly where you are.",
      "12 creators learned from this same example last month. 3 are now earning.",
      "The person who made this? They learned from someone else's template first."
    ],
    gatekeeperBypass: [
      "No one certified this creator. They made something good, so we use it.",
      "Credentials don't matter here. Quality does. And you can see the quality yourself.",
      "This wasn't approved by any board. The community uses what works."
    ],
    ignitionMoment: [
      "You just built something that functions. Not because someone said you could—because you did.",
      "Look at that. It works. You made it work. Remember this feeling."
    ],
    childIntroductions: {
      maya: ["You're learning the patterns. I'm watching."],
      kweku: ["You can reproduce results now. Kweku will ask: whose results do YOU want?"],
      ntikuma: ["The template has numbers in it. Ntikuma can show you what they mean."],
      anansewa: ["You're learning to perform what others created. Soon, you'll create what you perform."],
      kofi: ["You built from a template. Kofi will show you how to build from scratch."],
      afua: ["You found a voice to imitate. Afua will help you find your own."],
      yaw: ["You studied someone's approach. Yaw documents approaches. He might want to document yours."],
      esi: ["This template carries someone's heritage. Esi helps you find your own."],
      kumi: ["You learned the rules of the game. Kumi finds the edges."],
      adaeze: ["You saw style in someone else's work. Adaeze helps you find yours."],
      nyame: ["Imitation teaches what works. Nyame asks what's right."],
      osei: ["Someone built this for the community. Osei thinks about who communities serve."],
      akua: ["Templates come with implicit agreements. Akua makes agreements explicit."]
    }
  },
  
  3: {
    pushMoment(stats?: CommunityStats): string {
      return getRandomMessage(PUSH_MESSAGES[3]);
    },
    welcome: [
      "What happens if you change something? Let's find out together.",
      "You know how it works. Now let's see what happens when you break the rules.",
      "This is where it gets interesting. Your variations. Your experiments."
    ],
    hint: [
      "Try duplicating this and making one different choice. Compare what happens.",
      "What if you removed this element entirely? The undo button is right there.",
      "Every variation teaches you something. Even the ones that don't work."
    ],
    encouragement: [
      "Interesting. Your choice created a different outcome. That's judgment forming.",
      "You just made a decision no template could have made for you.",
      "Notice what changed. That's your creative instinct developing."
    ],
    reflection: [
      "What changed—and why do you think it did?",
      "Which version do you prefer? Why?",
      "What would you try next?"
    ],
    communityMirror: [
      "Every creator here has their own variations. Yours are joining the conversation.",
      "Someone else tried something similar last month. They went a completely different direction. Both work.",
      "The community isn't looking for copies. They're looking for your version."
    ],
    gatekeeperBypass: [
      "There's no 'right answer' someone else is holding. You're finding your own.",
      "No one approves your variations. The work speaks for itself.",
      "Traditional systems would test you on the 'correct' approach. Here, your approach IS the point."
    ],
    ignitionMoment: [
      "You're not following anymore. You're choosing. That's the shift.",
      "Your judgment just showed up. You made a choice and it was yours."
    ],
    childIntroductions: {
      maya: ["You're experimenting. I'm curious what you'll discover."],
      kweku: ["Your variations show what you value. Kweku will ask if others value the same."],
      ntikuma: ["Different choices have different costs. Ntikuma sees the patterns in those costs."],
      anansewa: ["You're finding what feels authentic. Anansewa knows about authentic."],
      kofi: ["You're modifying the design. Kofi modifies everything."],
      afua: ["Your voice is emerging in these choices. Afua hears it."],
      yaw: ["You're creating variations worth documenting. Yaw documents."],
      esi: ["Your variations might become someone else's starting point. That's heritage forming."],
      kumi: ["Every variation is a test. Kumi loves tests."],
      adaeze: ["Your aesthetic is declaring itself. Adaeze sees aesthetic."],
      nyame: ["Some variations feel more right than others. Nyame thinks about why."],
      osei: ["Your choices affect who can use your work. Osei thinks about access."],
      akua: ["Variations create new terms. Akua clarifies terms."]
    }
  },
  
  4: {
    pushMoment(stats?: CommunityStats): string {
      return getRandomMessage(PUSH_MESSAGES[4]);
    },
    welcome: [
      "What are you trying to make? Not what should you make—what do YOU want?",
      "You've got skills now. Where do you want to point them?",
      "This is your canvas. Your intent. What matters to you?"
    ],
    hint: [
      "Think about who will experience this. What do you want them to notice first?",
      "Every choice now shapes the final result. What's the priority?",
      "There are tradeoffs ahead. Speed or polish? Broad or deep? Your call."
    ],
    encouragement: [
      "You're making deliberate choices now. Each one is yours.",
      "That decision? It shows what you value. That's authorship.",
      "You're not experimenting anymore. You're building something specific."
    ],
    reflection: [
      "This choice optimizes one thing over another—was that your intent?",
      "What are you willing to sacrifice to get what matters most?",
      "If this reaches the community, what do you want them to take away?"
    ],
    communityMirror: [
      "Creators who reach this stage often surprise themselves with what they build.",
      "The Cyberstore is full of work from people who got to exactly this point. Your work could sit alongside theirs.",
      "This is where the 'I can't do this' voice gets quietest. Because you're doing it."
    ],
    gatekeeperBypass: [
      "Your work is live. Not because someone approved you—because you made it and shared it.",
      "There's no submission process. No waiting for judgment. You decide when it's ready.",
      "The traditional path would have you proving yourself to gatekeepers. Here, the work IS the proof."
    ],
    ignitionMoment: [
      "You just became an author. Not because anyone said so—because you decided what to make and made it.",
      "This isn't practice anymore. This is real. You're creating for real."
    ],
    childIntroductions: {
      maya: ["You know what you're making. I'm here when you need perspective."],
      kweku: ["Intent needs validation. Kweku validates."],
      ntikuma: ["Intentional work can earn intentional money. Ntikuma sees how."],
      anansewa: ["Your intention needs expression. Anansewa helps you express."],
      kofi: ["You know what to build. Kofi helps you build it right."],
      afua: ["Your voice has intent now. Afua helps you aim it."],
      yaw: ["Intentional work is newsworthy. Yaw sees the story."],
      esi: ["What you're making might last. Esi knows about lasting."],
      kumi: ["Intent without strategy is hope. Kumi brings strategy."],
      adaeze: ["Intent needs form. Adaeze gives form to intent."],
      nyame: ["Intent reveals values. Nyame examines values."],
      osei: ["Intentional work can change things. Osei thinks about change."],
      akua: ["Intent creates obligations. Akua clarifies obligations."]
    }
  },
  
  5: {
    pushMoment(stats?: CommunityStats): string {
      return getRandomMessage(PUSH_MESSAGES[5]);
    },
    welcome: [
      "Your process is becoming visible. Let's recognize the patterns.",
      "You've been at this for a while now. I've noticed some things about how you work.",
      "This isn't about learning anymore. It's about sustaining. Building a practice."
    ],
    hint: [
      "I've noticed how you tend to work. Want to hear what stands out?",
      "There's a rhythm to your sessions. Understanding it could help you protect it.",
      "Your choices have patterns. Not rules—patterns. Yours."
    ],
    encouragement: [
      "You've developed a style. That's professional practice emerging.",
      "You tend to explore broadly before committing. That's a viable workflow—budget time for convergence.",
      "You reuse assets effectively. That's a professional habit forming."
    ],
    reflection: [
      "What would you tell someone just starting this journey?",
      "What do you know now that you wish you'd known at the beginning?",
      "What does 'enough' look like for you?"
    ],
    communityMirror: [
      "Creators at this stage often start mentoring. You've walked a path others are starting.",
      "The community needs what you've learned. Not just your creations—your process.",
      "Some of our most active creators remember exactly what it felt like to be new. That memory is valuable."
    ],
    gatekeeperBypass: [
      "You didn't need anyone's permission to get here. You won't need it to stay.",
      "The income split works because the community owns this together. No investors deciding your worth.",
      "This sustains because it's ours. Not because a company decided to fund it."
    ],
    ignitionMoment: [
      "You're not just a creator anymore. You're someone who creates. It's part of who you are.",
      "The journey from 'I can't' to 'I do' is complete. Now it's just... what you do."
    ],
    childIntroductions: {
      maya: ["You know your way around. I'm here for the conversations that matter."],
      kweku: ["Your business instincts are forming. Kweku refines them."],
      ntikuma: ["Sustainable practice needs sustainable numbers. Ntikuma watches the numbers."],
      anansewa: ["You've found presence. Anansewa helps you deepen it."],
      kofi: ["You build well. Kofi is always building something new. Compare notes."],
      afua: ["Your voice is yours now. Afua helps you amplify it."],
      yaw: ["Your journey is documentation-worthy. Yaw might want to record it."],
      esi: ["What you've built is heritage now. Esi helps preserve it."],
      kumi: ["You've mastered one game. Kumi knows there are always more games."],
      adaeze: ["Your style is established. Adaeze helps you evolve it."],
      nyame: ["Sustainable practice raises new ethical questions. Nyame thinks about them."],
      osei: ["Your practice affects others now. Osei thinks about that impact."],
      akua: ["Professional practice needs clear agreements. Akua makes them clear."]
    }
  }
};

// ============================================
// PUSH MESSAGES
// ============================================

export const PUSH_MESSAGES: Record<PedagogicalStage, string[]> = {
  1: [
    "You're here. That's the first step most people never take.",
    "Keep exploring. There's no rush and no test at the end.",
    "The only way to know what's possible is to try things."
  ],
  2: [
    "You're learning faster than you think. Keep going.",
    "Every expert started exactly where you are now.",
    "The pattern is making sense. I can tell. Stay with it."
  ],
  3: [
    "Your variations are getting more intentional. That's growth.",
    "Trust what you're noticing. Your instincts are developing.",
    "The experimentation phase feels messy. That's how it's supposed to feel."
  ],
  4: [
    "You know what you want to make now. That clarity is rare.",
    "Keep shaping it. The vision is becoming real.",
    "Most people never get this far. You're here."
  ],
  5: [
    "You've built something sustainable. That's the goal.",
    "Your process is yours now. Protect it.",
    "The community is stronger because you're in it."
  ]
};

// ============================================
// HANDOFF & RE-ENTRY MESSAGES (Enhanced)
// ============================================

export const HANDOFF_MESSAGE = {
  text: "You're making deliberate choices now. I'll step back—call me if you want reflection.",
  type: 'handoff' as MayaMessageType
};

export const RE_ENTRY_MESSAGE = {
  text: "I've been quiet because you haven't needed guidance. I noticed something about how you work—want to hear it?",
  type: 're-entry' as MayaMessageType
};

export const SESSION_END_PROMPTS = [
  "Before you go—anything surprise you today?",
  "What felt different this session?",
  "Anything you want to remember for next time?",
  "What would you try differently if you started over?"
];

/** NEW: Child return messages when creator comes back to Maya */
export const CHILD_RETURN_MESSAGES: Record<ActiveChild, string[]> = {
  maya: [],
  kweku: [
    "Kweku sent you back. Good—some things need the kitchen table, not the boardroom.",
    "You've been with Kweku. What did the questions reveal?"
  ],
  ntikuma: [
    "Ntikuma showed you the numbers. Now let's talk about what they mean for you.",
    "The financial picture is clearer. How do you feel about what you saw?"
  ],
  anansewa: [
    "You've been in the Court. What did you discover about presence?",
    "Anansewa sees things about performance. What did she show you?"
  ],
  kofi: [
    "Back from the workshop. What did you build? What did building teach you?",
    "Kofi pushes people to make things. What did making show you?"
  ],
  afua: [
    "You've been finding your voice. What did it sound like?",
    "Afua listens for the story beneath the story. What did she hear in yours?"
  ],
  yaw: [
    "The chronicler sent you back. What patterns did he notice?",
    "You've been documenting. What became clearer in the writing?"
  ],
  esi: [
    "Heritage work can be heavy. What did you find? What did it cost to find it?",
    "Esi keeps what matters. What did you discover matters to you?"
  ],
  kumi: [
    "You've been playing. What did play reveal about how you think?",
    "Kumi sees the strategy beneath the game. What strategy did you find?"
  ],
  adaeze: [
    "You've been in the studio. What did your aesthetic choices tell you?",
    "Adaeze sees what could be. What did you see?"
  ],
  nyame: [
    "Ethical questions don't have easy answers. What are you sitting with?",
    "Nyame doesn't tell you what's right. What did you decide?"
  ],
  osei: [
    "Power is complicated. What did you learn about how it works?",
    "Osei thinks about systems. What did you see about the systems around you?"
  ],
  akua: [
    "Rights and agreements matter. What's clearer now?",
    "Akua makes the implicit explicit. What did she make visible?"
  ]
};

// ============================================
// CONCEPT INTRODUCTION (Enhanced)
// ============================================

export type ConceptSource = 'ui' | 'maya' | 'general-concepts' | 'child';

export interface ConceptDefinition {
  id: string;
  name: string;
  oneSentenceDefinition: string;
  firstEncounter: ConceptSource;
  programmes: string[];
  /** NEW: Which child introduces this concept */
  introducedBy?: ActiveChild;
}

export const SHARED_CONCEPTS: ConceptDefinition[] = [
  {
    id: 'layer',
    name: 'Layer',
    oneSentenceDefinition: 'A parallel version of your work that doesn\'t affect other layers until merged.',
    firstEncounter: 'ui',
    programmes: ['all']
  },
  {
    id: 'undo',
    name: 'Undo',
    oneSentenceDefinition: 'Reverse your last action—nothing is permanent until you decide it is.',
    firstEncounter: 'ui',
    programmes: ['all']
  },
  {
    id: 'draft',
    name: 'Draft',
    oneSentenceDefinition: 'Work in progress that\'s safe to experiment with before committing.',
    firstEncounter: 'ui',
    programmes: ['all']
  },
  {
    id: 'provenance',
    name: 'Provenance',
    oneSentenceDefinition: 'The record of who created what, when, and how it evolved—your proof of authorship.',
    firstEncounter: 'maya',
    programmes: ['all'],
    introducedBy: 'esi'
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    oneSentenceDefinition: 'Working with others while tracking everyone\'s contributions fairly.',
    firstEncounter: 'maya',
    programmes: ['all']
  },
  {
    id: 'template',
    name: 'Template',
    oneSentenceDefinition: 'A starting point built by someone in the community—learn from their decisions.',
    firstEncounter: 'ui',
    programmes: ['all']
  },
  {
    id: 'asset',
    name: 'Asset',
    oneSentenceDefinition: 'A reusable piece of work you or others can incorporate into new creations.',
    firstEncounter: 'ui',
    programmes: ['all']
  },
  {
    id: 'publish',
    name: 'Publish',
    oneSentenceDefinition: 'Making your work visible to the community—no approval needed, you decide when.',
    firstEncounter: 'maya',
    programmes: ['all']
  },
  {
    id: 'cyberstore',
    name: 'Cyberstore',
    oneSentenceDefinition: 'Where your work can earn—55% to you, 25% to community development, 20% to operations.',
    firstEncounter: 'maya',
    programmes: ['all'],
    introducedBy: 'ntikuma'
  },
  {
    id: 'pardner',
    name: 'Pardner',
    oneSentenceDefinition: 'Community savings circle—build capital together without banks or credit checks.',
    firstEncounter: 'maya',
    programmes: ['all'],
    introducedBy: 'ntikuma'
  },
  // NEW: ROV-specific concepts
  {
    id: 'validation',
    name: 'Validation',
    oneSentenceDefinition: 'Testing whether your idea solves a real problem people will pay for.',
    firstEncounter: 'child',
    programmes: ['techreneurs'],
    introducedBy: 'kweku'
  },
  {
    id: 'set-aside',
    name: 'Set-Aside',
    oneSentenceDefinition: 'Money you don\'t touch—for tax, for emergencies, for future you.',
    firstEncounter: 'child',
    programmes: ['finance'],
    introducedBy: 'ntikuma'
  },
  {
    id: 'presence',
    name: 'Presence',
    oneSentenceDefinition: 'Being fully in the moment on stage—not performing, being.',
    firstEncounter: 'child',
    programmes: ['kaywanas-court'],
    introducedBy: 'anansewa'
  },
  {
    id: 'prototype',
    name: 'Prototype',
    oneSentenceDefinition: 'The ugly first version that teaches you what the beautiful version needs.',
    firstEncounter: 'child',
    programmes: ['stemgeneers'],
    introducedBy: 'kofi'
  },
  {
    id: 'spine',
    name: 'Spine',
    oneSentenceDefinition: 'The core meaning that holds a story together—without it, things just happen.',
    firstEncounter: 'child',
    programmes: ['rayd-yo'],
    introducedBy: 'afua'
  },
  {
    id: 'angle',
    name: 'Angle',
    oneSentenceDefinition: 'The perspective that makes a story necessary, not just interesting.',
    firstEncounter: 'child',
    programmes: ['joystick'],
    introducedBy: 'yaw'
  },
  {
    id: 'heritage-chain',
    name: 'Heritage Chain',
    oneSentenceDefinition: 'The line of people who carried knowledge to you—their names matter.',
    firstEncounter: 'child',
    programmes: ['heritage'],
    introducedBy: 'esi'
  },
  {
    id: 'meta',
    name: 'Meta',
    oneSentenceDefinition: 'The current best strategy—changes as the game evolves.',
    firstEncounter: 'child',
    programmes: ['g-tech-casters'],
    introducedBy: 'kumi'
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getRandomMessage = (messages: string[]): string => {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
};

export const formatCommunityMirror = (
  template: string, 
  stats: CommunityStats
): string => {
  return template
    .replace('{totalCreators}', stats.totalCreators.toString())
    .replace('{earningCreators}', stats.earningCreators.toString())
    .replace('{brentCreators}', stats.brentCreators.toString())
    .replace('{monthlyNew}', stats.monthlyNewCreators.toString());
};

/**
 * Get child introduction message for current stage
 */
export const getChildIntroduction = (
  stage: PedagogicalStage,
  childId: ActiveChild
): string => {
  const messages = STAGE_MESSAGES[stage].childIntroductions[childId];
  return messages ? getRandomMessage(messages) : `Let me introduce you to ${childId}.`;
};

/**
 * Get return message when creator comes back from a child
 */
export const getChildReturnMessage = (childId: ActiveChild): string => {
  const messages = CHILD_RETURN_MESSAGES[childId];
  return messages && messages.length > 0 
    ? getRandomMessage(messages) 
    : "Welcome back. What did you learn?";
};

// ============================================
// LEGACY COMPATIBILITY
// ============================================

/** 
 * Original MayaState interface for backward compatibility
 * @deprecated Use UnifiedCreatorState instead
 */
export interface MayaState {
  currentStage: PedagogicalStage;
  currentMode: MayaMode;
  quietTriggers: QuietMomentTriggers;
  quietMomentOccurred: boolean;
  quietMomentTimestamp: Date | null;
  silentObservations: SilentObservations;
  messages: MayaMessage[];
  isExpanded: boolean;
  hasUnread: boolean;
  currentSessionStart: Date;
  totalSessionCount: number;
  communityStats: CommunityStats | null;
  lastCommunityMirrorShown: Date | null;
  userPreferences: {
    mayaEnabled: boolean;
    showHints: boolean;
    reflectionPromptsEnabled: boolean;
    communityMessagesEnabled: boolean;
  };
}

/**
 * Convert legacy MayaState to UnifiedCreatorState
 */
export const migrateToUnifiedState = (
  legacyState: MayaState,
  creatorId: string,
  creatorName: string
): UnifiedCreatorState => {
  const unified = createDefaultUnifiedState(creatorId, creatorName);
  
  return {
    ...unified,
    pedagogicalStage: legacyState.currentStage,
    mayaMode: legacyState.currentMode,
    quietTriggers: legacyState.quietTriggers,
    quietMomentOccurred: legacyState.quietMomentOccurred,
    quietMomentTimestamp: legacyState.quietMomentTimestamp,
    silentObservations: legacyState.silentObservations,
    mayaMessages: legacyState.messages,
    communityStats: legacyState.communityStats,
    lastCommunityMirrorShown: legacyState.lastCommunityMirrorShown,
    preferences: {
      ...unified.preferences,
      mayaEnabled: legacyState.userPreferences.mayaEnabled,
      showHints: legacyState.userPreferences.showHints,
      reflectionPromptsEnabled: legacyState.userPreferences.reflectionPromptsEnabled,
      communityMessagesEnabled: legacyState.userPreferences.communityMessagesEnabled
    },
    totalSessionCount: legacyState.totalSessionCount
  };
};

export const DEFAULT_MAYA_STATE: MayaState = {
  currentStage: 1,
  currentMode: 'ACTIVE',
  quietTriggers: DEFAULT_QUIET_TRIGGERS,
  quietMomentOccurred: false,
  quietMomentTimestamp: null,
  silentObservations: DEFAULT_SILENT_OBSERVATIONS,
  messages: [],
  isExpanded: false,
  hasUnread: false,
  currentSessionStart: new Date(),
  totalSessionCount: 1,
  communityStats: null,
  lastCommunityMirrorShown: null,
  userPreferences: {
    mayaEnabled: true,
    showHints: true,
    reflectionPromptsEnabled: true,
    communityMessagesEnabled: true
  }
};