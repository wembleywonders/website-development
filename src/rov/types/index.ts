// src/rov/types/index.ts
// Complete Type Definitions for the Children of Anansi ROV System
//
// UPDATED:
//   - ChildPersonality: added coverIdentity, duppyRegister, philosophicalPairing
//   - PromptMetadata: handoffAssessment expanded to match rovPromptBuilder output
//   - frameworkInjected, stakesLevel, stakesDomainsActive added to PromptMetadata

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
  | 'early'       // New to programme/domain
  | 'developing'  // Building capability
  | 'established' // Demonstrated competence
  | 'multiplier'; // Teaching others

export type MemberMood =
  | 'excited'
  | 'neutral'
  | 'curious'
  | 'frustrated'
  | 'distressed'
  | 'determined'
  | 'overwhelmed'
  | 'focused'
  | 'uncertain'
  | 'celebratory';

// Stakes levels — used by Equiano Protocol pre-flight
export type StakesLevel = 'standard' | 'elevated' | 'high';

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
  developmentStage?: Record<string, CreatorDevelopmentStage>;
  trustRelationships?: Record<string, number>;
  documentedCapabilities?: string[];
  // Easy Street Rayd-yo — DJ context flag
  isRadioDJ?: boolean;
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
  counterTrapFocus: string[];
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
  surface: string[];
  deeper: string[];
  escalationTriggers: string[];
  voiceTemplates: Record<string, string>;
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
  contextToWithhold: string[];
  messageToCreator: string;
  messageToSibling?: string;
  returnProtocol?: string;
}

export interface HandoffProtocol {
  levelTriggers: Record<HandoffLevel, string[]>;
  siblingIntroductions: Record<string, string[]>;
  mayaReturns: {
    emotional: string[];
    completed: string[];
    stuck: string[];
  };
  receivingHandoff: {
    fromSibling: string;
    fromMaya: string;
  };
}

// ============================================
// PROGRESSIVE WITHDRAWAL
// ============================================

export interface ProgressiveWithdrawal {
  engagementByStage: Record<CreatorDevelopmentStage, EngagementPattern>;
  progressionSignals: string[];
  independenceRecognition: string[];
}

export interface EngagementPattern {
  feedbackDepth: 'detailed' | 'moderate' | 'minimal' | 'on-request';
  questionRatio: number;
  initiationFrequency: 'proactive' | 'responsive' | 'passive';
  stanceDistribution: Record<ROVStance, number>;
}

// ============================================
// GREETINGS
// ============================================

export interface Greetings {
  firstTime: string;
  returning: string;
  withContext: (context: MemberContext) => string;
  byMood?: Record<MemberMood, string>;
  afterAbsence?: string;
}

// ============================================
// CHALLENGES & ENCOURAGEMENTS
// ============================================

export interface ChallengePatterns {
  [category: string]: string[];
}

export interface EncouragementPatterns {
  goodAnswer?: string;
  goodProgress?: string;
  improvement?: string;
  breakthrough?: string;
  resilience?: string;
  firstStep?: string;
  consistency?: string;
  independence?: string;
  authentic?: string;
  progress?: string;
  powerful?: string;
  found?: string;
  original?: string;
  rigorous?: string;
  pattern?: string;
  growth?: string;
  recorded?: string;
  remembered?: string;
  connected?: string;
  passed?: string;
  clutch?: string;
  mindset?: string;
  strategy?: string;
  [key: string]: string | undefined;
}

// ============================================
// SAMPLE DIALOGUE
// ============================================

export interface SampleDialogue {
  [scenarioName: string]: string;
}

// ============================================
// PHILOSOPHICAL PAIRING
// Captures the canonical tension between paired Children.
// Reference: American Gods (Kweku/Afua), The Matrix (Yaw/Kumi),
//            Sandman (Anansewa/Adaeze), Martin/Malcolm (Osei/Akua),
//            Daedalus/Icarus (Kofi/Kumi), Index/Interpretation (Esi/Nyame)
// ============================================

export interface PhilosophicalPairing {
  /** childId of the tension partner */
  partner: string;
  /** Canonical cultural reference naming the argument */
  reference: string;
  /** What the productive argument between them is about */
  tension: string;
  /** Whether/how it resolves — usually "Never" */
  resolution: string;
}

// ============================================
// CHILD PERSONALITY (Complete)
// ============================================

export interface ChildPersonality {
  // ── Core identity
  id: string;
  name: string;
  dayBorn: DayBorn;
  title: string;
  domain: string;
  programme: string;
  role: string;
  description: string;
  isActive: boolean;

  // ── Mythological grounding
  giftFromAnansi: string;
  giftFromMaya: string;

  // ── Easy Street world fields ──────────────────────────────────────────────
  /**
   * The Child's cover identity on Easy Street — the role the community
   * sees without knowing their deeper function.
   * e.g. Kweku: "barman at The Metropole"
   *      Ntikuma: "the postman"
   *      Esi: "the librarian"
   */
  coverIdentity?: string;

  /**
   * The Child's register in the duppy/jumbie tradition — how they appear
   * in the community's spiritual and folkloric imagination.
   * Used for Halloween special content on Easy Street Rayd-yo.
   */
  duppyRegister?: string;

  /**
   * The philosophical pairing — the canonical tension partner and
   * the cultural reference that names the argument between them.
   * The argument never fully resolves. That's the point.
   */
  philosophicalPairing?: PhilosophicalPairing;
  // ──────────────────────────────────────────────────────────────────────────

  // ── Visual identity
  color: string;
  emoji: string;
  avatar?: string;

  // ── Voice & personality
  tone: string;
  speechPatterns: string[];
  catchphrases: string[];
  greetingStyle?: string;
  challengeStyle?: string;
  encouragementStyle?: string;

  // ── Greetings
  greetings: Greetings;

  // ── Interaction patterns
  challenges: ChallengePatterns;
  encouragements: EncouragementPatterns;

  // ── Sample dialogue
  sampleDialogue?: SampleDialogue;

  // ── Stances
  stances: Stances;

  // ── Domain routing
  primaryDomain: KnowledgeDomain;
  secondaryDomains?: KnowledgeDomain[];
  sharedKnowledgeAccess: KnowledgeDomain[];

  // ── Counter-trap calibration
  counterTrapCalibration: CounterTrapCalibration;

  // ── Handoff protocol
  handoffProtocol: HandoffProtocol;

  // ── Progressive withdrawal
  progressiveWithdrawal: ProgressiveWithdrawal;

  // ── Sibling relationships
  asksMaya: string[];
  asksSiblings: Record<string, string[]>;

  // ── Sibling collaboration patterns
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
  usedSharedKnowledge?: KnowledgeDomain[];
  handoffSuggested?: HandoffDecision;
  trapAvoided?: string[];
  suggestedNextSteps?: string[];
  openLoopCreated?: OpenLoop;
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
  tone: string;
  speechPatterns: string[];
  catchphrases: string[];
  threeQuestions: MayaThreeQuestions;
  handoffMessages: Record<string, string[]>;
  keepMessages: {
    emotional: string[];
    exploration: string[];
    returning: string[];
    openLoops: string[];
  };
  returnProtocols: Record<string, string[]>;
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
  tone: string;
  speechPatterns: string[];
  greetings: {
    initial: string;
    returning: string;
    crisis: string;
  };
  resources: {
    name: string;
    description: string;
    contact?: string;
    url?: string;
  }[];
  cannotDo: string[];
  mustDo: string[];
  returnToFamily: {
    when: string[];
    how: string;
  };
}

// ============================================
// ALIAS MAPPING
// ============================================

export interface ROVAliasMapping {
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
  includeSystemPrompt?: boolean;
  maxTokens?: number;
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

  /**
   * Handoff assessment from assessHandoffNeed().
   * level is always present; targetChild and reason are optional.
   */
  handoffAssessment: {
    level: HandoffLevel;
    targetChild?: string;
    reason?: string;
  };

  crossDomainAccess: KnowledgeDomain[];
  calibrationActive: boolean;
  engagementPattern: EngagementPattern;

  /**
   * Whether the epistemological framework block was injected
   * into the system prompt for this child.
   */
  frameworkInjected: boolean;

  /**
   * Highest stakes domain detected in the incoming message
   * by the Equiano Protocol pre-flight classifier.
   * 'standard' means no elevated/high-stakes domain detected.
   */
  stakesLevel: StakesLevel;

  /**
   * All domain names flagged by the stakes classifier.
   * Used for logging and audit. Empty array for standard messages.
   */
  stakesDomainsActive: string[];
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