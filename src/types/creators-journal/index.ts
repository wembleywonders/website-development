/**
 * src/types/creators-journal/index.ts
 * =====================================
 * Creator's Journal — Type Schema
 * Wembley Wonders CIC
 *
 * REVISION LOG
 * ────────────
 * Initial: JournalEntry, Milestone, Skill, Badge, Project
 * +verification: RepairEvidence, DiagnosticSession, SkillVerificationGate,
 *                STEMgeneersPortfolio, MayaVerificationSession
 * +cleanup (this revision):
 *   - SkillVerificationGate: removed `any` stubs, added `overallProgress`,
 *     flattened `requirements` sub-fields to match journalStore gate access
 *     pattern (e.g. gate.diagnosticRequirement.met)
 *   - MayaVerificationSession: failureResponse.retryAvailableFrom typed as
 *     Date throughout (was `string | number | Date`)
 *   - Added GateRequirementStatus, GateUnlocks helper types (used by store
 *     and UI components)
 *   - Added IncomeSource, WitnessRelationship, VerificationStatus as
 *     explicit union type exports (referenced across STEMSage, PathfinderROV,
 *     STEMgeneersPage)
 *   - STEMgeneersStats: new read-model type for useSTEMgeneersStats() hook
 *   - PortfolioExportDocument: structured markdown export type
 *   - All original types preserved exactly
 *
 * PRINCIPLE
 * ─────────
 * "I said I fixed it" is a log entry.
 * "Here is the fault, my diagnosis reasoning, the fix, the result,
 *  witnessed by [name], claim token [ref]" is a credential.
 */

// ============================================================================
// PRIMITIVE UNION TYPES
// Exported so consuming files don't have to inline these strings.
// ============================================================================

export type VerificationStatus =
  | 'unverified'
  | 'self-reported'
  | 'peer-witnessed'
  | 'mentor-approved'
  | 'claim-verified';

export type WitnessRelationship =
  | 'collective-member'
  | 'programme-peer'
  | 'mentor'
  | 'client';

export type IncomeSource =
  | 'direct-client'
  | 'ecosystem-referral'
  | 'collective'
  | 'community-rate'
  | 'event';

export type MilestoneCategory =
  | 'connect'
  | 'create'
  | 'cultivate'
  | 'compete'
  | 'celebrate';

export type VerificationMethod =
  | 'peer-witness'
  | 'mentor-sign-off'
  | 'claim-token'
  | 'diagnostic-gate'
  | 'income-evidence';

export type GateStatusValue =
  | 'locked'
  | 'in-progress'
  | 'passed'
  | 'passed-with-distinction';

export type DiagnosticGateStatus =
  | 'below-threshold'
  | 'passed'
  | 'passed-with-distinction';

// ============================================================================
// REPAIR LAYER + RELATED DOMAIN TYPES
// ============================================================================

export type RepairLayer =
  | 'precision'    // watch, phone, lock, small electronics
  | 'appliance'    // washing machine, vacuum, sewing machine, kitchen
  | 'home'         // tap, plumbing, plastering, decorating, basic electrical
  | 'furniture'    // joinery, upholstery, repurposing
  | 'making'       // 3D printing, fabrication, custom parts
  | 'trades';      // electrical, plumbing, HVAC, renewable energy

export type DiagnosisMethod =
  | 'visual-inspection'
  | 'auditory-diagnosis'
  | 'multimeter'
  | 'oscilloscope'
  | 'disassembly-inspection'
  | 'elimination'
  | 'sandbox-diagnostic-trainer'
  | 'research'
  | 'mentor-consultation';

export type TradesPathway =
  | 'community-stemgeneer'
  | 'apprenticeship-electrical'
  | 'apprenticeship-plumbing'
  | 'city-guilds-part-time'
  | 'renewable-energy-specialist'
  | 'scrap-cat-technical-lead';

export type EcosystemEntryType =
  | 'apprenticeship'
  | 'subcontracting'
  | 'partnership'
  | 'complementary'
  | 'contract'
  | 'referral';

// ============================================================================
// ORIGINAL TYPES — preserved exactly
// ============================================================================

export interface JournalEntry {
  id: string;
  date: Date;
  type:
    | 'reflection'
    | 'milestone'
    | 'project'
    | 'skill'
    | 'repair'
    | 'diagnostic-session';
  content: string;
  attachments?: string[];
  repairEvidenceId?: string;
  diagnosticSessionId?: string;
  verificationStatus: VerificationStatus;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  completed: boolean;
  completedDate?: Date;
  evidence?: string[];
  verifiedBy?: string;
  verifiedByName?: string;
  verificationDate?: Date;
  verificationMethod?: VerificationMethod;
  requiresEvidence: boolean;
  evidenceSufficient: boolean;     // computed by store
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  dateAcquired: Date;
  verifiedBy?: string;
  verifiedByName?: string;
  verificationMethod?: VerificationMethod;
  diagnosticAccuracyAchieved?: number;
  realWorldApplicationCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: MilestoneCategory;
  earnedDate: Date;
  criteria: string[];
  criteriaEvidence: CriteriaEvidence[];
  blockchainVerified: boolean;
  blockchainRef?: string;
}

export interface CriteriaEvidence {
  criterionId: string;
  evidenceType:
    | 'photo'
    | 'claim-token'
    | 'witness-statement'
    | 'diagnostic-score'
    | 'income-record';
  evidenceRef: string;
  verifiedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'planning' | 'in-progress' | 'completed' | 'archived';
  category: string;
  skills: string[];
  collaborators?: string[];
  mediaUrls?: string[];
  repairEvidenceIds?: string[];
  incomeGenerated?: number;
  claimTokenRefs?: string[];
}

// ============================================================================
// REPAIR EVIDENCE
// The core credential structure. Every logged repair produces one of these.
// ============================================================================

export interface RepairPart {
  name: string;
  partNumber?: string;
  supplier?: string;
  cost: number;
  printed3D: boolean;
  printFilament?: string;
  printCost?: number;
}

export interface RepairPhoto {
  id: string;
  url: string;
  stage:
    | 'before'
    | 'during-disassembly'
    | 'fault-identified'
    | 'during-repair'
    | 'after'
    | 'part-detail';
  caption?: string;
  takenAt: Date;
}

export interface RepairVerification {
  status: VerificationStatus;
  // Witness fields
  witnessUserId?: string;
  witnessName?: string;
  witnessStatement?: string;
  witnessedAt?: Date;
  witnessRelationship?: WitnessRelationship;
  // Claim token fields
  claimTokenRef?: string;
  claimTokenRedeemedAt?: Date;
  // Neville verification fields
  mayaVerificationSessionId?: string;
  mayaVerificationPassed?: boolean;
  mayaVerificationDate?: Date;
  // Mentor fields
  mentorUserId?: string;
  mentorName?: string;
  mentorNotes?: string;
  mentorApprovedAt?: Date;
}

export interface RepairEvidence {
  id: string;
  journalEntryId: string;
  createdAt: Date;
  createdBy: string;

  item: {
    description: string;
    layer: RepairLayer;
    estimatedAge?: string;
    estimatedValue?: number;         // £ replacement cost
  };

  fault: {
    symptomDescription: string;
    onsetDescription?: string;
  };

  diagnosis: {
    reasoning: string;
    // Critical field — must show the WHY, not just the WHAT.
    // "Grinding during spin but not agitation indicated drum bearing rather
    //  than motor brushes. Confirmed by removing drum — outer race had visible
    //  pitting consistent with lubricant breakdown after ~8 years of load cycles."
    methodsUsed: DiagnosisMethod[];
    ruledOut: string[];
    diagnosticSessionRef?: string;   // links to DiagnosticSession if sandbox used
  };

  repair: {
    methodDescription: string;
    partsUsed: RepairPart[];
    totalPartsCost: number;          // £
    timeSpent: number;               // minutes
    toolsUsed: string[];
    physicsExplained?: string;
    // e.g. "Tribology — bearing fails when lubricant breaks down under load
    //        cycles. Rumbling frequency = ball contact with degraded raceway.
    //        New bearing restores smooth rolling contact."
    difficultiesEncountered?: string;
    whatWouldDoDifferently?: string;
  };

  outcome: {
    successful: boolean;
    outcomeDescription: string;
    savingAchieved: number;          // £ vs professional quote
    professionalQuoteReceived?: number;
  };

  photos: RepairPhoto[];

  verification: RepairVerification;

  claimTokenRef?: string;
  incomeEarned?: number;
  incomeSource?: IncomeSource;
}

// ============================================================================
// DIAGNOSTIC SESSION
// Captures sandbox Diagnostic Trainer performance with real scoring.
// ============================================================================

export type DeviationConsequence = 'minor' | 'significant' | 'diagnostic-failure';

export interface DiagnosticDeviation {
  step: string;
  chosenPath: string;
  correctPath: string;
  consequence: DeviationConsequence;
  // minor:             slightly inefficient route
  // significant:       would waste time/money in real repair
  // diagnostic-failure: would lead to wrong repair being attempted
}

export interface DiagnosticSession {
  id: string;
  createdAt: Date;
  userId: string;
  layer: RepairLayer;

  scenario: {
    id: string;
    itemDescription: string;
    symptomPresented: string;
    correctDiagnosis: string;
    variantSeed: string;             // randomised — prevents memorisation across sessions
  };

  performance: {
    pathTaken: string[];
    correctPath: string[];
    deviations: DiagnosticDeviation[];
    timeToCorrectDiagnosis: number;  // seconds
    ruledOutCorrectly: string[];
    incorrectEliminationsAttempted: string[];
    finalDiagnosis: string;
    diagnosisCorrect: boolean;
    accuracyScore: number;
    // 0.85 = correct diagnosis + correct eliminations + reasonable time
    // 0.40 = correct diagnosis but wrong eliminations — guessed, not diagnosed
  };

  physicsExplanation?: {
    attempted: boolean;
    explanation?: string;
    qualityScore?: number;           // 0-1, assessed by Neville follow-up
    subject?: string;                // e.g. "Tribology", "Fluid Mechanics"
  };

  // 0.8 accuracy required to pass; 0.9+ with physics explanation = distinction
  gateStatus: DiagnosticGateStatus;
}

// ============================================================================
// SKILL VERIFICATION GATE
// Controls whether a layer is genuinely covered — not just claimed.
//
// REVISED: Removed `any` stubs. Each requirement is a self-contained
// sub-type (GateDiagnosticRequirement etc.) with a `met` boolean that
// the store computes. Components read `gate.diagnosticRequirement.met`
// rather than diving into nested objects.
// ============================================================================

export interface GateDiagnosticRequirement {
  required: number;                  // minimum sessions (3)
  completed: number;
  minimumAccuracy: number;           // 0.8
  averageAccuracyAchieved: number;
  sessionIds: string[];
  met: boolean;                      // completed >= required && avg >= minimum
}

export interface GateRepairRequirement {
  required: number;                  // minimum repairs (2)
  completed: number;
  witnessedCount: number;            // at least 1 must be witnessed
  claimTokenLinkedCount: number;
  met: boolean;                      // completed >= required && witnessedCount >= 1
}

export interface GatePhysicsRequirement {
  required: boolean;
  attempted: boolean;
  qualityThreshold: number;          // 0.7
  qualityAchieved: number;           // 0 if not attempted
  met: boolean;                      // attempted && qualityAchieved >= threshold
}

export interface GateVerificationRequirement {
  required: boolean;
  sessionId?: string;
  sessionCompleted: boolean;
  passed: boolean;
  met: boolean;                      // sessionCompleted && passed
}

export interface GateUnlocks {
  skillBadge: string;
  journalLayerUnlocked: boolean;
  sandboxToolsUnlocked: string[];
  pathwayRecommendation?: TradesPathway;
}

export interface SkillVerificationGate {
  id: string;
  userId: string;
  layer: RepairLayer;
  status: GateStatusValue;
  overallProgress: number;           // 0-100 — weighted across all four requirements
  updatedAt: Date;

  // Four named requirements — components access these directly
  diagnosticRequirement: GateDiagnosticRequirement;
  realWorldRepairsRequirement: GateRepairRequirement;
  physicsExplanationRequirement: GatePhysicsRequirement;
  mayaVerificationRequirement: GateVerificationRequirement;

  // Convenience aliases — computed by store, match original nested shape
  // where consuming code used requirements.diagnosticSessions etc.
  requirements: {
    diagnosticSessions:   GateDiagnosticRequirement;
    realWorldRepairs:     GateRepairRequirement;
    physicsExplanation:   GatePhysicsRequirement;
    mayaVerification:     GateVerificationRequirement;
  };

  unlocks: GateUnlocks;

  // Read-model helpers — derived fields used by LayerGateCard, LayerGateMini,
  // STEMgeneersPage gate overview, and portfolio export
  completedRequirements: number;     // 0-4
  remainingRequirements: number;     // 4 - completedRequirements
  diagnosticAccuracy: number;        // alias: diagnosticRequirement.averageAccuracyAchieved
  repairsLogged: number;             // alias: realWorldRepairsRequirement.completed
  witnessedRepairsCount: number;     // alias: realWorldRepairsRequirement.witnessedCount
  physicsExplanationMet: boolean;    // alias: physicsExplanationRequirement.met
  verificationMet: boolean;          // alias: mayaVerificationRequirement.met
}

// ============================================================================
// STEMGENEERS PORTFOLIO
// The portfolio IS the credential for community-based learners.
// ============================================================================

export interface EcosystemConnectionSummary {
  businessType: string;
  connectionType: EcosystemEntryType;
  establishedAt: Date;
  incomeGenerated?: number;
}

export interface PortfolioEndorsement {
  endorserId: string;
  endorserName: string;
  endorserRole:
    | 'mentor'
    | 'collective-member'
    | 'programme-director'
    | 'community-member'
    | 'trade-professional';
  endorsementText: string;
  endorsedAt: Date;
  specificSkillsEndorsed: string[];
}

export interface STEMgeneersPortfolio {
  id: string;
  userId: string;
  createdAt: Date;
  lastUpdatedAt: Date;

  profile: {
    displayName: string;
    strongestLayer: RepairLayer;
    communityRole?: string;          // e.g. "The person my estate calls for appliances"
    yearsActive: number;
    memberSince: Date;
  };

  layersCovered: Partial<Record<RepairLayer, SkillVerificationGate>>;

  repairRecord: {
    totalRepairs: number;
    witnessedRepairs: number;
    claimTokenLinkedRepairs: number;
    totalSavingsGenerated: number;   // £ community economic value
    totalIncomeEarned: number;       // £ personal income
    repairsByLayer: Partial<Record<RepairLayer, number>>;
    mostComplexRepairId?: string;
  };

  diagnosticRecord: {
    totalSessionsCompleted: number;
    averageAccuracy: number;
    bestAccuracy: number;
    layerAccuracies: Partial<Record<RepairLayer, number>>;
  };

  economicRecord: {
    totalIncomeFromRepairs: number;
    claimTokensGenerated: number;
    claimTokensRedeemed: number;
    activeClientRelationships: number;
    ecosystemConnections: EcosystemConnectionSummary[];
  };

  publicationRecord: {
    joystickArticles: number;
    raydyoFeatures: number;
    journalEntriesPublished: number;
    peopleInspiredToJoin: number;
  };

  certification: {
    status: 'in-progress' | 'certified' | 'certified-with-distinction';
    certifiedAt?: Date;
    blockchainRef?: string;
    endorsedBy: PortfolioEndorsement[];
    pathwayRecommendations: TradesPathway[];
  };
}

// ============================================================================
// MAYA VERIFICATION SESSION
// Conversational follow-up after a repair or milestone is logged.
// Confirms understanding, not just completion.
// ============================================================================

export type QuestionType =
  | 'open-reasoning'
  | 'physics-explanation'
  | 'decision-justification'
  | 'reflection';

export interface ResponseAssessment {
  score: number;                     // 0-1
  demonstratesUnderstanding: boolean;
  specificFeedback: string;
  // e.g. "You correctly identified tribology as the underlying science.
  //        Your explanation of lubricant breakdown shows genuine understanding
  //        rather than following a procedure you don't understand."
  followUpTriggered?: boolean;
  followUpQuestion?: string;
}

export interface VerificationQuestion {
  id: string;
  questionText: string;
  questionType: QuestionType;
  userResponse?: string;
  responseAssessment?: ResponseAssessment;
  followUpTriggered?: boolean;       // preserved for backward compat with ResponseAssessment
  followUpQuestion?: string;
}

export interface VerificationFailureResponse {
  retryAvailableFrom: Date;          // was `string | number | Date` — narrowed to Date
  specificGaps: string[];
  recommendedReview: string[];
  canRetryAfter: Date;               // alias: retryAvailableFrom
  mentorReferral: boolean;
}

export interface MayaVerificationSession {
  id: string;
  userId: string;
  createdAt: Date;
  repairEvidenceId?: string;
  diagnosticSessionId?: string;
  milestoneId?: string;

  triggerType:
    | 'repair-logged'
    | 'milestone-claimed'
    | 'layer-gate-attempted';

  questionSequence: VerificationQuestion[];

  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'referred-to-mentor';
  overallScore?: number;
  passThreshold: number;             // 0.7 default
  completedAt?: Date;

  failureResponse?: VerificationFailureResponse;
}

// ============================================================================
// READ-MODEL TYPES
// Used by hooks (useSTEMgeneersStats, useGateRequirements) and UI components.
// Not stored — computed from the above.
// ============================================================================

/**
 * Returned by useSTEMgeneersStats().
 * Drives the live stats strip in STEMgeneersPage and the stats panel
 * in CreatorsJournalPage and PathfinderROV (Neville).
 */
export interface STEMgeneersStats {
  totalRepairs: number;
  witnessedRepairs: number;
  claimTokenLinkedRepairs: number;
  totalSavingsGenerated: number;
  totalIncomeEarned: number;
  totalDiagnosticSessions: number;
  averageDiagnosticAccuracy: number;
  layersPassed: number;
  layersInProgress: number;
  pendingVerification: boolean;
  mostActiveLayer?: RepairLayer;
  certificationEligible: boolean;    // layersPassed >= 2
}

/**
 * Returned by useGateRequirements(layer).
 * Drives LayerGateCard and LayerGateMini.
 */
export interface GateRequirementSummary {
  layer: RepairLayer;
  status: GateStatusValue;
  overallProgress: number;           // 0-100
  diagnosticSessions: GateDiagnosticRequirement;
  realWorldRepairs: GateRepairRequirement;
  physicsExplanation: GatePhysicsRequirement;
  mayaVerification: GateVerificationRequirement;
  nextAction: string;                // plain-English next step for this gate
  unlocks: GateUnlocks;
}

/**
 * Structured type for getPortfolioExport().
 * Produces a markdown document suitable for certification applications.
 */
export interface PortfolioExportDocument {
  generatedAt: Date;
  displayName: string;
  layersSummary: Array<{
    layer: RepairLayer;
    status: GateStatusValue;
    repairsLogged: number;
    witnessedRepairs: number;
    diagnosticAccuracy: number;
  }>;
  repairHighlights: Array<{
    description: string;
    layer: RepairLayer;
    saving: number;
    income: number;
    verificationStatus: VerificationStatus;
    claimTokenRef?: string;
  }>;
  economicSummary: {
    totalSavings: number;
    totalIncome: number;
    claimTokensLinked: number;
  };
  certificationStatus: STEMgeneersPortfolio['certification']['status'];
  markdownContent: string;           // full formatted document
}
