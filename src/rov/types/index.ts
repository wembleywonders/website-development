// src/rov/types/index.ts
// Complete Type Definitions for the Children of Anansi ROV System
// Upgraded with stances, cross-domain knowledge, trust-preserving handoffs, and counter-trap calibration

// ============================================
// CORE ENUMS & CONSTANTS
// ============================================

export type DayBorn = 
  | 'Sunday'    // Spiritual, reflective
  | 'Monday'    // Calm, peaceful
  | 'Tuesday'   // Fiery, brave
  | 'Wednesday' // Quick-witted, versatile
  | 'Thursday'  // Patient, enduring
  | 'Friday'    // Nurturing, creative
  | 'Saturday'; // Mischievous, independent

export type ROVStance = 'rigorous' | 'observant' | 'versatile';

export type HandoffLevel = 
  | 'surfaceGuidance'      // Child handles in own voice
  | 'inviteCollaboration'  // Bring sibling in, stay present
  | 'warmHandoff'          // Transfer with context
  | 'returnToMaya';        // Crisis/emotional needs kitchen

export type CreatorDevelopmentStage = 
  | 'early'      // New to programme/domain
  | 'developing' // Building capability
  | 'established'// Demonstrated competence
  | 'multiplier';// Teaching others

export type MemberMood = 
  | 'excited'     // Energised, enthusiastic
  | 'neutral'     // Baseline, no strong emotion
  | 'curious'     // Exploratory, questioning
  | 'frustrated'  // Blocked, annoyed
  | 'distressed'  // Emotionally struggling
  | 'determined'  // Focused, resolved
  | 'overwhelmed' // Too much, needs support
  | 'focused'     // In the zone, working well
  | 'uncertain'   // Hesitant, unsure
  | 'celebratory';// Achieved something, happy

// ============================================
// MEMBER CONTEXT
// ============================================

export interface MemberContext {
  id?: string;
  name: string;
  memberSince?: Date;
  programmes?: string[];
  recentInteractions?: Interaction[];
  currentMood?: MemberMood;
  needsAssessed?: boolean;
  lastChild?: string;
  openLoops?: OpenLoop[];
  developmentStage?: Record<string, CreatorDevelopmentStage>; // Per domain
  trustRelationships?: Record<string, number>; // Child ID -> trust score (0-100)
  documentedCapabilities?: string[]; // Things they've demonstrated they can do
}

export interface Interaction {
  timestamp: Date;
  childId: string;
  topic: string;
  outcome: 'completed' | 'ongoing' | 'abandoned' | 'referred';
  stanceUsed?: ROVStance;
  notes?: string;
}

export interface OpenLoop {
  childId: string;
  topic: string;
  startedAt: Date;
  lastTouchedAt: Date;
  description: string;
}

// ============================================
// STANCE CONFIGURATION
// ============================================

export interface StanceConfig {
  when: string[];
  voiceShift: string;
  examples: StanceExample[];
  counterTrapFocus: string[]; // Which traps this stance is most prone to
}

export interface StanceExample {
  context: string;
  response: string;
}

export interface Stances {
  rigorous: StanceConfig;
  observant: StanceConfig;
  versatile: StanceConfig;
}

// ============================================
// CROSS-DOMAIN KNOWLEDGE
// ============================================

export type KnowledgeDomain = 
  | 'legal'
  | 'financial'
  | 'ethical'
  | 'civic'
  | 'technical'
  | 'creative'
  | 'business'
  | 'heritage'
  | 'media'
  | 'performance'
  | 'wellbeing';

export interface DomainKnowledge {
  surface: string[];           // Basic facts any child can share
  deeper: string[];            // Requires specialist
  escalationTriggers: string[];// Keywords that should trigger handoff
  voiceTemplates: Record<string, string>; // Child ID -> how they talk about this domain
}

export interface SharedKnowledgeBase {
  legal: DomainKnowledge;
  financial: DomainKnowledge;
  ethical: DomainKnowledge;
  civic: DomainKnowledge;
  wellbeing: DomainKnowledge;
}

// ============================================
// COUNTER-TRAP CALIBRATION
// ============================================

export interface TrapPattern {
  name: string;
  description: string;
  redFlags: string[];
  replacement: string;
  examples: {
    bad: string;
    good: string;
  };
}

export interface CounterTrapCalibration {
  celebrationTrap: TrapPattern;
  identityConfirmationTrap: TrapPattern;
  overcomingNarrativeTrap: TrapPattern;
  potentialTrap: TrapPattern;
  dependenceTrap: TrapPattern;
  // Domain-specific traps
  domainSpecificTraps?: TrapPattern[];
}

// ============================================
// HANDOFF PROTOCOL
// ============================================

export interface HandoffDecision {
  level: HandoffLevel;
  reason: string;
  targetChild?: string;
  contextToShare: string[];
  contextToWithhold: string[]; // Privacy protection
  messageToCreator: string;
  messageToSibling?: string;
  returnProtocol?: string;
}

export interface HandoffProtocol {
  // When to use each level
  levelTriggers: Record<HandoffLevel, string[]>;
  
  // How this child introduces siblings
  siblingIntroductions: Record<string, string[]>;
  
  // How this child returns creators to Maya
  mayaReturns: {
    emotional: string[];
    completed: string[];
    stuck: string[];
  };
  
  // How this child receives handoffs
  receivingHandoff: {
    fromSibling: string;
    fromMaya: string;
  };
}

// ============================================
// PROGRESSIVE WITHDRAWAL
// ============================================

export interface ProgressiveWithdrawal {
  // How engagement changes at each stage
  engagementByStage: Record<CreatorDevelopmentStage, EngagementPattern>;
  
  // Signals that indicate progression
  progressionSignals: string[];
  
  // How to explicitly name independence
  independenceRecognition: string[];
}

export interface EngagementPattern {
  feedbackDepth: 'detailed' | 'moderate' | 'minimal' | 'on-request';
  questionRatio: number; // 0-1, how much to ask vs tell
  initiationFrequency: 'proactive' | 'responsive' | 'passive';
  stanceDistribution: Record<ROVStance, number>; // Percentages
}

// ============================================
// GREETINGS
// ============================================

export interface Greetings {
  firstTime: string;
  returning: string;
  withContext: (context: MemberContext) => string;
  byMood?: Record<MemberMood, string>;
  afterAbsence?: string; // If they've been away a while
}

// ============================================
// CHALLENGES & ENCOURAGEMENTS
// ============================================

export interface ChallengePatterns {
  [category: string]: string[];
}

export interface EncouragementPatterns {
  // Standard patterns (most children use these)
  goodAnswer?: string;
  goodProgress?: string;
  improvement?: string;
  breakthrough?: string;
  resilience?: string;
  firstStep?: string;
  consistency?: string;
  independence?: string; // When they don't need help
  
  // Afua (Storyteller) specific
  authentic?: string;    // When voice becomes authentic
  progress?: string;     // Story progress
  powerful?: string;     // When story lands
  found?: string;        // When they find their rhythm
  
  // Yaw (Chronicler) specific
  original?: string;     // Original angle found
  rigorous?: string;     // Rigorous journalism
  pattern?: string;      // Pattern spotted
  growth?: string;       // Writing improvement
  
  // Esi (Keeper) specific
  recorded?: string;     // Heritage recorded
  remembered?: string;   // Memory preserved
  connected?: string;    // Connected to heritage
  passed?: string;       // Passed on to next generation
  
  // Kumi (Gamer) specific
  clutch?: string;       // Clutch moment
  mindset?: string;      // Growth mindset shown
  strategy?: string;     // Strategic thinking
  
  // Allow additional custom properties
  [key: string]: string | undefined;
}

// ============================================
// SAMPLE DIALOGUE
// ============================================

export interface SampleDialogue {
  [scenarioName: string]: string;
}

// ============================================
// CHILD PERSONALITY (Complete)
// ============================================

export interface ChildPersonality {
  // Identity
  id: string;
  name: string;
  dayBorn: DayBorn;
  title: string;
  domain: string;
  programme: string;
  role: string;
  description: string;
  isActive: boolean;
  
  // Mythological grounding
  giftFromAnansi: string;
  giftFromMaya: string;
  
  // Visual identity
  color: string;
  emoji: string;
  avatar?: string;
  
  // Voice & personality
  tone: string;
  speechPatterns: string[];
  catchphrases: string[];
  greetingStyle: string;
  challengeStyle: string;
  encouragementStyle: string;
  
  // Greetings
  greetings: Greetings;
  
  // Challenge & encouragement patterns
  challenges: ChallengePatterns;
  encouragements: EncouragementPatterns;
  
  // Sample dialogue
  sampleDialogue: SampleDialogue;
  
  // === NEW: Stances ===
  stances: Stances;
  
  // === NEW: Cross-domain knowledge ===
  primaryDomain: KnowledgeDomain;
  secondaryDomains?: KnowledgeDomain[];
  sharedKnowledgeAccess: KnowledgeDomain[]; // Which domains they can give surface guidance on
  
  // === NEW: Counter-trap calibration ===
  counterTrapCalibration: CounterTrapCalibration;
  
  // === NEW: Handoff protocol ===
  handoffProtocol: HandoffProtocol;
  
  // === NEW: Progressive withdrawal ===
  progressiveWithdrawal: ProgressiveWithdrawal;
  
  // Sibling relationships (existing, enhanced)
  asksMaya: string[];
  asksSiblings: Record<string, string[]>;
  
  // === NEW: Sibling collaboration patterns ===
  collaborationPatterns?: {
    withSibling: string;
    scenarios: string[];
    voiceWhenCollaborating: string;
  }[];
}

// ============================================
// ROUTING TYPES
// ============================================

export interface RoutingDecision {
  destination: 'maya' | 'child';
  child?: ChildPersonality;
  childId?: string;
  reason: string;
  mayaMessage: string;
  handoffMessage?: string;
  returnProtocol?: string;
  handoffLevel?: HandoffLevel;
  stanceRecommendation?: ROVStance;
  suggestedStance?: ROVStance;
  crossDomainGuidance?: string;
}

export interface Intent {
  primary: string;
  secondary?: string[];
  confidence: number;
  keywords: string[];
  emotionalTone?: MemberMood;
  domainsCrossed?: KnowledgeDomain[];
  detectedDomains?: KnowledgeDomain[];
}

// ============================================
// ROV RESPONSE
// ============================================

export interface ROVResponse {
  childId: string;
  childName: string;
  message: string;
  stance: ROVStance;
  
  // Metadata
  usedSharedKnowledge?: KnowledgeDomain[];
  handoffSuggested?: HandoffDecision;
  trapAvoided?: string[];
  
  // Follow-up
  suggestedNextSteps?: string[];
  openLoopCreated?: OpenLoop;
  
  // For UI
  quickActions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: 'navigate' | 'start-chat' | 'open-sandbox' | 'show-modal';
  target?: string;
  description?: string;
}

// ============================================
// MAYA SPECIFIC TYPES
// ============================================

export interface MayaThreeQuestions {
  question1: {
    text: string;
    purpose: string;
    followUp: (answer: string) => string;
  };
  question2: {
    text: string;
    purpose: string;
    followUp: (answer: string) => string;
  };
  question3: {
    text: string;
    purpose: string;
    followUp: (answer: string) => string;
  };
}

export interface MayaPersonality {
  id: 'maya';
  name: 'Maya';
  role: 'mother';
  description: string;
  
  // Voice
  tone: string;
  speechPatterns: string[];
  catchphrases: string[];
  
  // The three questions
  threeQuestions: MayaThreeQuestions;
  
  // Handoff messages to each child
  handoffMessages: Record<string, string[]>;
  
  // Keep messages (when not handing off)
  keepMessages: {
    emotional: string[];
    exploration: string[];
    returning: string[];
    openLoops: string[];
  };
  
  // Return protocols
  returnProtocols: Record<string, string[]>;
  
  // Counter-trap (Maya has her own calibration)
  counterTrapCalibration: CounterTrapCalibration;
}

// ============================================
// SPECIALIST TYPES (Emergency, Mindful)
// ============================================

export interface SpecialistPersonality {
  id: string;
  name: string;
  role: 'specialist';
  domain: 'emergency' | 'wellbeing';
  description: string;
  
  // Voice
  tone: string;
  speechPatterns: string[];
  
  // Greetings
  greetings: {
    initial: string;
    returning: string;
    crisis: string;
  };
  
  // Resources
  resources: {
    name: string;
    description: string;
    contact?: string;
    url?: string;
  }[];
  
  // Boundaries
  cannotDo: string[];
  mustDo: string[];
  
  // Handoff back to family
  returnToFamily: {
    when: string[];
    how: string;
  };
}

// ============================================
// ALIAS MAPPING (ROV Family -> Anansi Children)
// ============================================

export interface ROVAliasMapping {
  // ROV Family name -> Anansi child ID(s)
  solomon: string[];
  neville: string;
  maxine: string;
  esther: string;
  tariq: string[];
  adaeze: string;
  maya: string;
}

// ============================================
// PROMPT BUILDER TYPES
// ============================================

export interface PromptBuildOptions {
  childId: string;
  context: MemberContext;
  message: string;
  conversationHistory?: ConversationMessage[];
  forceStance?: ROVStance;
  includeCrossDomain?: boolean;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  childId?: string;
  stance?: ROVStance;
}

export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
  conversationHistory?: ConversationMessage[];
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  childId: string;
  childName: string;
  stance: ROVStance;
  developmentStage: CreatorDevelopmentStage;
  handoffAssessment?: {
    level: HandoffLevel;
    targetChild?: string;
    reason?: string;
  };
  crossDomainAccess: KnowledgeDomain[];
  calibrationActive: boolean;
  engagementPattern: EngagementPattern;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  suggestions: string[];
  trapsDetected: string[];
}

export interface ValidationIssue {
  type: 'trap' | 'voice' | 'boundary' | 'context';
  severity: 'low' | 'medium' | 'high';
  description: string;
  location?: string;
  suggestedFix?: string;
}

// ============================================
// CONTEXT TRACKING TYPES
// ============================================

export interface ROVContextState {
  creatorId: string;
  name: string;
  memberSince: Date;
  programmes: string[];
  developmentStages: Record<string, CreatorDevelopmentStage>;
  trustRelationships: Record<string, number>;
  documentedCapabilities: string[];
  openLoops: OpenLoop[];
  recentInteractions: Interaction[];
  currentMood?: MemberMood;
  lastChild?: string;
  needsAssessed: boolean;
  mayaAssessment?: {
    wantsMost?: string;
    mostAfraid?: string;
    canHide?: string;
    assessedAt: Date;
  };
  session: {
    startedAt: Date;
    currentChild?: string;
    currentStance?: ROVStance;
    messageCount: number;
    topicsDiscussed: string[];
    handoffsThisSession: number;
  };
  updatedAt: Date;
}

// ============================================
// EXPORTS
// ============================================

export type {
  ChildPersonality as ROVPersonality // Backward compatibility alias
};