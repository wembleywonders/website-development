// src/systems/rovs/learning-support/index.ts
// Main exports for ROV learning support system

// Core system exports
export {
  default as LearningROVSystem,
  ROV_FLEET,
  DEFAULT_ROV_CONFIG,
  getROV,
  getROVMessage,
  createROVMessage,
  getROVsForEvent,
  createLearnerContext,
  ROVContext,
  useROVContext
} from './LearningROVSystem';

// Core type exports
export type {
  ROVPersonalityId,
  MessagePriority,
  MessageType,
  Stage,
  ROVPersonality,
  ROVVoice,
  ROVMessage,
  ROVAction,
  LearnerContext,
  LearnerPreferences,
  AccessibilitySettings,
  ActivityRecord,
  ROVEvent,
  ROVEventType,
  ROVSessionState,
  ROVSystemConfig,
  ROVContextValue
} from './LearningROVSystem';

// Orchestrator exports
export { default as ROVOrchestrator } from './ROVOrchestrator';

// Activity Observer exports
export { default as ActivityObserver } from './ActivityObserver';
export type { Activity, ActivityType } from './ActivityObserver';
