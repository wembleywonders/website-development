// src/types/rovs/index.ts
// Core type definitions for the ROV (Role-Optimised Virtual) system
// Updated with named ROV Family personalities

// ============================================
// ROV FAMILY IDENTIFIERS
// ============================================

/**
 * The 7 core ROV family members
 */
export type ROVFamilyMember = 
  | 'maya'      // Front door, welcoming guide
  | 'solomon'   // Business/financial wisdom
  | 'neville'   // Technical mentor
  | 'adaeze'    // Creative encourager
  | 'maxine'    // Performance coach
  | 'esther'    // Heritage keeper
  | 'tariq'     // Media guide
  | 'aya';      // Body sovereignty knowledge keeper

/**
 * Specialist ROVs (protocol-based, not personality)
 */
export type ROVSpecialist = 
  | 'emergency' // Crisis response
  | 'mindful';  // Mental health support

/**
 * Stage guide ROVs (pipeline-specific)
 */
export type ROVStageGuide =
  | 'experimenter'  // Exploration/sandbox (maps to Maya)
  | 'archivist'     // Journal (maps to current ROV based on context)
  | 'technician'    // Impact lab refinement
  | 'curator'       // Certification/quality gate
  | 'merchant';     // Cyberstore (maps to Solomon for business)

/**
 * All ROV identifiers
 */
export type ROVIdentifier = ROVFamilyMember | ROVSpecialist | ROVStageGuide;

// ============================================
// ROLE TYPES
// ============================================

export type ROVRole = 
  | 'family-guide'   // Named personality guides (Maya, Solomon, etc.)
  | 'stage-guide'    // Pipeline stage specialists
  | 'specialist'     // Emergency/mental health
  | 'matchmaker';    // Collaboration facilitator

// ============================================
// PROGRAMME & SPACE TYPES
// ============================================

export type CreatorSpace = 
  | 'stemgeneers' 
  | 'techreneurs' 
  | 'pageturners' 
  | 'gtech-casters'      // Updated: was gtechcasters
  | 'silk-stilettos'
  | 'kaywanas-court'
  | 'trubble-n-bass'     // NEW
  | 'aunties-kitchen'    // Updated: was auntie-anansis-kitchen
  | 'raydyo'             // NEW
  | 'joystick'           // NEW
  | 'scrap-cat'          // NEW
  | 'money-reset'         // NEW
  | 'roots';             // NEW: Body sovereignty

// Alias for backward compatibility
export type Programme = CreatorSpace;

export type PipelineStage = 
  | 'exploration'    // Just browsing
  | 'sandbox'        // Experimentation
  | 'journal'        // Documentation
  | 'impact-lab'     // Refinement
  | 'certification'  // Quality gate
  | 'cyberstore';    // Launch

export type ProjectType = 
  | 'stem-kit' 
  | 'prototype' 
  | 'experiment'
  | 'app' 
  | 'saas' 
  | 'digital-product'
  | 'story' 
  | 'script' 
  | 'anthology' 
  | 'game-narrative'
  | 'podcast' 
  | 'audio-drama' 
  | 'radio-show'
  | 'design' 
  | 'fashion' 
  | 'visual-content'
  | 'recipe'
  | 'heritage-capture'
  | 'performance'
  | 'theatre-production'
  | 'music'
  | 'workshop'
  | 'repair'           // NEW: Scrap Cat
  | 'device-revival'   // NEW: Scrap Cat
  | 'financial-plan'   // NEW: Money Reset
  | 'stream'           // NEW: G-Tech/Joystick
  | 'ezine-article'        // NEW: Joystick
  | 'hair-diagnostic'      // NEW: Aya/Roots
  | 'remedy-research'      // NEW: Aya/Roots
  | 'apothecary-formulation' // NEW: Aya/Roots
  | 'mixed-heritage-guidance' // NEW: Aya/Roots
  | 'legal-rights-query'   // NEW: Aya/Roots
  | 'creator-product-pathway'; // NEW: Aya/Roots

// ============================================
// ROV PERSONALITY & VOICE
// ============================================

export type VoiceStyle = 
  | 'warm' 
  | 'enthusiastic' 
  | 'calm' 
  | 'professional' 
  | 'playful'
  | 'authoritative'    // NEW: Solomon
  | 'nurturing'        // NEW: Esther
  | 'energetic'        // NEW: Maxine
  | 'contemporary'      // NEW: Tariq
  | 'warm-authoritative'; // NEW: Aya

export type GreetingStyle = 
  | 'casual' 
  | 'welcoming' 
  | 'encouraging' 
  | 'guiding'
  | 'warm-authority'   // NEW: Solomon
  | 'patient'          // NEW: Neville
  | 'affirming'        // NEW: Adaeze
  | 'direct'            // NEW: Maxine
  | 'community-elder';  // NEW: Aya

export interface ROVPersonality {
  tone: string;
  expertise: string[];
  avatar: string;
  colour: string;              // NEW: Brand colour
  voiceStyle: VoiceStyle;
  greetingStyle: GreetingStyle;
  speechPatterns?: string[];   // NEW: Characteristic phrases
  doNot?: string[];            // NEW: Things this ROV avoids
}

export interface ROVContexts {
  creatorSpaces?: CreatorSpace[];
  pipelineStages?: PipelineStage[];
  projectTypes?: ProjectType[];
}

// ============================================
// ROV PROFILE
// ============================================

export interface ROVProfile {
  id: string;
  name: string;
  shortName: string;
  role: ROVRole;
  tagline: string;
  archetype?: string;          // NEW: Character archetype
  personality: ROVPersonality;
  contexts: ROVContexts;
  capabilities: string[];
  greetings: {
    firstVisit: string;
    returning: string;
    contextual: Record<string, string>;
  };
  quickActions: ROVQuickAction[];
  isSpecialist?: boolean;      // NEW: Flag for emergency/mindful
  familyMember?: ROVFamilyMember;  // NEW: Which family member this maps to
}

export interface ROVQuickAction {
  id: string;
  label: string;
  icon: string;
  action: 'navigate' | 'open-sandbox' | 'show-modal' | 'start-chat' | 'dismiss';
  target?: string;
  description?: string;
  rovId?: ROVIdentifier;       // NEW: Which ROV handles this action
}

// ============================================
// ROV GREETING & DISPLAY
// ============================================

export interface ROVGreetingConfig {
  rov: ROVProfile;
  variant: 'overlay' | 'inline' | 'corner' | 'banner';
  dismissible: boolean;
  autoShow: boolean;
  delayMs: number;
  showActions: boolean;
  onDismiss?: () => void;
  onAction?: (action: ROVQuickAction) => void;
}

// ============================================
// ROV CONTEXT & STATE
// ============================================

export interface ROVContext {
  activeROVs: ROVProfile[];
  primaryROV: ROVProfile | null;
  previousROV?: ROVProfile | null;  // NEW: For returning
  creatorSpace: CreatorSpace | null;
  pipelineStage: PipelineStage | null;
  projectType: ProjectType | null;
  isFirstVisit: boolean;
  lastVisit: Date | null;
  interactionCount: number;
  conversationState?: 'greeting' | 'exploring' | 'guided' | 'specialist';  // NEW
}

export interface ROVInteraction {
  rovId: string;
  timestamp: Date;
  type: 'greeting' | 'guidance' | 'feedback' | 'approval' | 'suggestion' | 'milestone' | 'handoff';
  content: string;
  userResponse?: string;
  actionTaken?: string;
}

export interface ROVHandoff {
  fromROV: string;
  toROV: string;
  reason: string;
  message: string;
  timestamp: Date;
}

export interface ROVTransition {
  from: ROVIdentifier;
  to: ROVIdentifier;
  reason: string;
  message: string;
  timestamp?: Date;
}

// ============================================
// ROV STATE MANAGEMENT
// ============================================

export interface ROVState {
  currentROV: ROVProfile | null;
  context: ROVContext;
  isGreetingVisible: boolean;
  isMessageVisible: boolean;
  messageQueue: ROVMessage[];
  interactions: ROVInteraction[];
  transitionHistory: ROVTransition[];  // NEW
}

export interface ROVMessage {
  id: string;
  rovId: string;
  content: string;
  type: 'greeting' | 'tip' | 'celebration' | 'guidance' | 'question' | 'handoff';
  actions?: ROVQuickAction[];
  dismissible: boolean;
  duration?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';  // Added 'urgent' for specialists
}

// ============================================
// PROGRAMME-ROV MAPPING
// ============================================

/**
 * Maps programmes to their primary ROV family member
 */
export const PROGRAMME_ROV_MAP: Record<CreatorSpace, ROVFamilyMember> = {
  'stemgeneers': 'neville',
  'scrap-cat': 'neville',
  'techreneurs': 'solomon',
  'money-reset': 'solomon',
  'silk-stilettos': 'adaeze',
  'kaywanas-court': 'maxine',
  'trubble-n-bass': 'maxine',
  'aunties-kitchen': 'esther',
  'pageturners': 'esther',
  'gtech-casters': 'tariq',
  'raydyo': 'tariq',
  'joystick': 'tariq'
};

// ============================================
// HELPER TYPE GUARDS
// ============================================

export function isFamilyMember(id: string): id is ROVFamilyMember {
  return ['maya', 'solomon', 'neville', 'adaeze', 'maxine', 'esther', 'tariq'].includes(id);
}

export function isSpecialist(id: string): id is ROVSpecialist {
  return ['emergency', 'mindful'].includes(id);
}

export function isStageGuide(id: string): id is ROVStageGuide {
  return ['experimenter', 'archivist', 'technician', 'curator', 'merchant'].includes(id);
}

// ============================================
// BACKWARD COMPATIBILITY ALIASES
// ============================================

// Old names → New names mapping for gradual migration
export const ROV_MIGRATION_MAP: Record<string, ROVFamilyMember> = {
  'inventor': 'neville',
  'architect': 'solomon',
  'storykeeper': 'esther',
  'producer': 'tariq',
  'artisan': 'adaeze',
  'pathfinder': 'maya',
  'helper': 'maya',
  'business': 'solomon'
};