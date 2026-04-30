/**
 * Learner Help System — Type Definitions
 * =======================================
 * 
 * The help system surfaces at moments of uncertainty —
 * when a learner tries something and doesn't know what to do next.
 * It is triggered by action, not by navigation.
 */

import type { Programme, ROVGuide } from './tutorial';

// ── Context ────────────────────────────────────────────────────────────────

export interface LearnerHelpContext {
  // Where they are
  programme: Programme;
  sandbox: string;
  triggerPoint: string;

  // What they've done this session
  completedSteps?: string[];
  attemptCount?: number;

  // What they're looking at right now
  currentContent?: {
    type: 'grid' | 'result' | 'tool' | 'activity' | 'form' | 'keyboard' | 'panel';
    id: string;
    label: string;
  };

  // ILP context if available
  ilpContext?: {
    layersPassed?: string[];
    currentFocus?: string;
    recentActivity?: string;
  };

  // Facilitator context for Bright Sparks
  facilitatorMode?: boolean;
  childAge?: number;
}

// ── Response ───────────────────────────────────────────────────────────────

export interface HelpTutorialRef {
  id: string;
  title: string;
  entryStep?: number;       // open at relevant step, not from top
  triggerLabel: string;     // "Ready to fix this?" not "Tutorial"
}

export interface HelpROVPrompt {
  rov: ROVGuide;
  rovName: string;          // "Neville" | "Maya" etc
  rovAvatar: string;        // emoji
  rovColour: string;        // hex
  message: string;
  suggestedQuestions?: string[];
}

export interface HelpKnowledgeRef {
  referenceId: string;
  title: string;
  type: 'heritage' | 'technique' | 'provenance' | 'community-knowledge';
}

export interface HelpILPSuggestion {
  action: string;           // "log this as a repair"
  milestone: string;        // "appliance-layer diagnostic session"
  ctaLabel: string;         // "Log this now"
}

export interface HelpResponse {
  triggerPoint: string;
  tutorial?: HelpTutorialRef;
  rovPrompt?: HelpROVPrompt;
  knowledgeRef?: HelpKnowledgeRef;
  ilpSuggestion?: HelpILPSuggestion;
  // For facilitators in Bright Sparks
  facilitatorGuidance?: string;
}

// ── Store state ────────────────────────────────────────────────────────────

export interface LearnerHelpState {
  // Current active help response (null = no panel shown)
  activeHelp: HelpResponse | null;
  // Track which triggers have fired this session (don't repeat)
  firedTriggers: Set<string>;
  // Tutorial open state — id and step
  openTutorial: { id: string; step: number } | null;
}
