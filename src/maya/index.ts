/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

// SERVICE BAY IP PROTECTION RUNTIME
(function () {
  const COMPONENT_TYPE = 'maya-index';
})();

/**
 * Maya Pedagogical System - Export Index
 * 
 * This module exports all Maya-related components, stores, and types
 * for the Wembley Wonders sandbox system.
 * 
 * Design Philosophy:
 * - Community visibility: Show others like you succeeding
 * - Gatekeeper bypass: No approval needed, create and share directly
 * - The push without judgment: Encourage without evaluating potential
 * - This IS the place: Not preparation for elsewhere
 * 
 * "Maya's silence is not absence—it's the sound of the user's own voice becoming primary."
 */

// ============================================
// TYPES
// ============================================

export {
  // Stage types
  type PedagogicalStage,
  type StageDefinition,
  STAGE_DEFINITIONS,
  
  // Mode types
  type MayaMode,
  type MayaModeDefinition,
  MAYA_MODE_DEFINITIONS,
  
  // Message types
  type MayaMessage,
  type MayaMessageType,
  type StageMessages,
  STAGE_MESSAGES,
  PUSH_MESSAGES,
  
  // Trigger types
  type QuietMomentTriggers,
  DEFAULT_QUIET_TRIGGERS,
  isReadyForSilence,
  
  // Pattern tracking types
  type WorkRhythm,
  type TradeoffTendency,
  type SilentObservations,
  type PatternInsight,
  DEFAULT_SILENT_OBSERVATIONS,
  
  // Community types
  type CommunityMetric,
  type CommunityStats,
  type SuccessStory,
  
  // State types
  type MayaState,
  DEFAULT_MAYA_STATE,
  
  // Concept types
  type ConceptSource,
  type ConceptDefinition,
  SHARED_CONCEPTS,
  
  // Special messages
  HANDOFF_MESSAGE,
  RE_ENTRY_MESSAGE,
  SESSION_END_PROMPTS,
  
  // Helpers
  getRandomMessage,
  formatCommunityMirror
} from './types/mayaTypes';

// ============================================
// STORE
// ============================================

export { 
  useMayaStore,
  useMayaStage,
  useMayaMode,
  useMayaMessages,
  useMayaTracking,
  useMayaCommunity
} from './stores/mayaStore';

// ============================================
// MAIN COMPONENTS (Floating Widget)
// ============================================

export { 
  MayaCompanion,
  MayaInlineOverlay,
  MayaContextPanel,
  MayaStatusIndicator,
  MayaCommunitySpotlight
} from './components/MayaCompanion';

// ============================================
// SANDBOX COMPONENTS (Embedded)
// ============================================

export {
  default as MayaConversation,
  MayaWelcome,
  MayaHint,
  MayaEncouragement,
  MayaReflection,
  MayaSilentIndicator,
  MayaConceptIntro,
  MayaCommunityMirror,
  MayaGatekeeperBypass,
  MayaPush,
  MayaIgnition,
  MayaSuccessStory,
  MayaPathwayReminder
} from './components/sandboxes/shared/MayaConversation';
