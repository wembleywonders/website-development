/**
 * Valuation Architecture Types
 * Wembley Wonders CIC
 * 
 * Extended data model integrating Valuation Architecture Toolkit
 * with the existing Prototype Registry system.
 */

// ============================================================================
// VALUATION ARCHITECTURE RECORD
// ============================================================================

export interface ValuationArchitectureRecord {
  // Worksheet
  worksheetId?: string;
  worksheetStatus: 'not-started' | 'in-progress' | 'complete';
  worksheetCompletedAt?: Date;
  
  // Summary from Worksheet (denormalized for quick access)
  lineageSummary?: string;
  functionStatement?: string;
  distinctivenessMarkers?: string[];
  
  // Pricing
  valuationClaim?: number;
  floorPrice?: number;
  comparables?: ComparableSummary[];
  
  // Quality Rubric
  selfAssessmentId?: string;
  selfAssessmentScore?: number;
  selfAssessmentDate?: Date;
  
  peerAssessmentIds?: string[];
  peerAssessmentScores?: number[];
  averagePeerScore?: number;
  peerAssessmentDate?: Date;
  
  // Calculated
  combinedScore?: number;
  scoreBand?: ScoreBand;
  weakCriteria?: string[];
  
  // Defence Protocol
  defenceSessionId?: string;
  defenceStatus: 'not-scheduled' | 'scheduled' | 'completed' | 'passed' | 'conditional' | 'not-yet';
  defenceDate?: Date;
  defenceDecision?: DefenceDecision;
  defenceNotes?: string;
  
  // Sign-offs
  creatorSignedOff: boolean;
  creatorSignedAt?: Date;
  peerWitnessSignedOff: boolean;
  peerWitnessName?: string;
  peerWitnessSignedAt?: Date;
  facilitatorSignedOff: boolean;
  facilitatorName?: string;
  facilitatorSignedAt?: Date;
  
  // Market Readiness
  marketReady: boolean;
  marketReadyDate?: Date;
  reasonNotReady?: string[];
}

export interface ComparableSummary {
  workMaker: string;
  price: number;
  whyComparable: string;
}

// ============================================================================
// WORKSHEET TYPES
// ============================================================================

export interface ValuationWorksheet {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: WorksheetStatus;
  
  meta: WorksheetMeta;
  lineage: LineageSection;
  function: FunctionSection;
  distinctiveness: DistinctivenessSection;
  authority: AuthoritySection;
  documentationLog: DocumentationEntry[];
  evidenceCapture: EvidenceChecklist;
  defencePrep: DefencePreparation;
  signOff?: WorksheetSignOff;
}

export type WorksheetStatus = 
  | 'draft'
  | 'in-progress'
  | 'ready-for-review'
  | 'under-review'
  | 'revision-needed'
  | 'approved'
  | 'archived';

export interface WorksheetMeta {
  creatorId: string;
  creatorName: string;
  programme: Programme;
  sessionLab: string;
  prototypeTitle: string;
  date: Date;
}

export type Programme = 
  | 'stemgeneers'
  | 'silk-stilettos'
  | 'techreneurs'
  | 'pageturners'
  | 'kaywanas-court'
  | 'gtech-casters'
  | 'trubble-n-bass'
  | 'bright-sparks'
  | 'auntie-anansis-kitchen';

// ============================================================================
// SECTION TYPES
// ============================================================================

export interface LineageSection {
  culturalHeritage: string;
  technicalLineage: string;
  personalConnection: string;
  namedInfluences: InfluenceEntry[];
}

export interface InfluenceEntry {
  id: string;
  name: string;
  whatLearned: string;
}

export interface FunctionSection {
  problemNeedGap: string;
  whoNeedsThis: string;
  whatChanges: string;
  practicalFunction: string;
  emotionalCulturalFunction: string;
}

export interface DistinctivenessSection {
  whatCantBeCopied: string;
  materialChoices: string;
  processChoices: string;
  ifNotYouTest: string;
  distinctivenessMarkers: DistinctivenessMarker[];
}

export type DistinctivenessMarker = 
  | 'unique-cultural-reference'
  | 'proprietary-technique'
  | 'specific-material-source'
  | 'unreplicable-story'
  | 'rare-skill-combination'
  | 'community-endorsement'
  | 'documented-development';

export const DISTINCTIVENESS_MARKER_LABELS: Record<DistinctivenessMarker, string> = {
  'unique-cultural-reference': 'Unique cultural reference that others cannot authentically claim',
  'proprietary-technique': 'Proprietary technique or method developed through practice',
  'specific-material-source': 'Material sourced from specific place/relationship',
  'unreplicable-story': 'Story/provenance that cannot be replicated',
  'rare-skill-combination': 'Combination of skills rarely found together',
  'community-endorsement': 'Community endorsement or cultural authority',
  'documented-development': 'Documented development process (iterations, tests, refinements)'
};

export interface AuthoritySection {
  standingToPriceThis: string;
  timeInvestment: string;
  materialCosts: number;
  equivalentLabourRate: number;
  comparables: Comparable[];
  valuationClaim: number;
  floorPrice: number;
}

export interface Comparable {
  id: string;
  workMaker: string;
  theirPrice: number;
  whyComparable: string;
}

// ============================================================================
// DOCUMENTATION TYPES
// ============================================================================

export interface DocumentationEntry {
  id: string;
  timestamp: Date;
  decisionActionObservation: string;
  rationale: string;
}

export interface EvidenceChecklist {
  startingMaterials: boolean;
  keyProcessStages: boolean;
  mistakesIterations: boolean;
  toolsWorkspace: boolean;
  finishedPiece: boolean;
  pieceInContext: boolean;
  creatorWithPiece: boolean;
}

export const EVIDENCE_CHECKLIST_LABELS: Record<keyof EvidenceChecklist, string> = {
  startingMaterials: 'Starting materials / raw state',
  keyProcessStages: 'Key process stages (at least 3)',
  mistakesIterations: 'Mistakes / iterations / rejected directions',
  toolsWorkspace: 'Tools and workspace',
  finishedPiece: 'Finished piece (multiple angles)',
  pieceInContext: 'Piece in context / in use',
  creatorWithPiece: 'Creator with piece (for provenance)'
};

export interface DefencePreparation {
  whatIsThis: string;
  whyDoesItExist: string;
  whyPricedHere: string;
  whatWouldMakeItMoreValuable: string;
  whyBuyFromYou: string;
}

export interface WorksheetSignOff {
  creatorSignature: string;
  creatorSignedAt: Date;
  peerWitness: string;
  peerSignedAt: Date;
  defenceScheduled: boolean;
  defenceDate?: Date;
}

// ============================================================================
// QUALITY RUBRIC TYPES
// ============================================================================

export interface QualityRubric {
  id: string;
  worksheetId: string;
  assessorId: string;
  assessorName: string;
  assessorType: 'self' | 'peer';
  createdAt: Date;
  
  scores: RubricScores;
  totalScore: number;
  
  gapAnalysis: GapAnalysisEntry[];
  signOff?: RubricSignOff;
}

export interface RubricScores {
  culturalIntegrity: RubricScore;
  materialIntelligence: RubricScore;
  processClarity: RubricScore;
  communityRelevance: RubricScore;
  durabilityLifecycle: RubricScore;
  storyCoherence: RubricScore;
  priceLogic: RubricScore;
}

export type RubricScore = 1 | 2 | 3 | 4 | 5;
export type RubricCriterion = keyof RubricScores;

export interface RubricCriterionDefinition {
  id: RubricCriterion;
  name: string;
  question: string;
  levels: [string, string, string, string, string];
}

export const RUBRIC_CRITERIA: RubricCriterionDefinition[] = [
  {
    id: 'culturalIntegrity',
    name: 'Cultural Integrity',
    question: 'Are the cultural references named, specific, and authentically held?',
    levels: [
      'No cultural reference or vague gestures',
      'References present but unnamed or generic',
      'References named but connection unclear',
      'Clear references with personal connection explained',
      'Deep, specific, documented lineage the maker can defend'
    ]
  },
  {
    id: 'materialIntelligence',
    name: 'Material Intelligence',
    question: 'Does the maker understand WHY this material?',
    levels: [
      'Material chosen by default or convenience only',
      'Some awareness of material properties',
      'Can explain basic material choice',
      'Clear rationale linking material to function/meaning',
      'Material choice is integral to the work\'s identity and value'
    ]
  },
  {
    id: 'processClarity',
    name: 'Process Clarity',
    question: 'Is the making process documented with iterations visible?',
    levels: [
      'No documentation; outcome only',
      'Minimal notes or photos',
      'Key stages captured but gaps remain',
      'Full process documented with rationale',
      'Complete provenance trail including failures and pivots'
    ]
  },
  {
    id: 'communityRelevance',
    name: 'Community Relevance',
    question: 'Does this work speak to real people the maker can identify?',
    levels: [
      'No clear audience identified',
      'Vague audience ("people who like nice things")',
      'General audience named but not specific',
      'Specific community with clear need articulated',
      'Deep understanding of audience; work shaped by their input'
    ]
  },
  {
    id: 'durabilityLifecycle',
    name: 'Durability / Lifecycle',
    question: 'Will this work last? Has the maker considered how it ages?',
    levels: [
      'No consideration of durability',
      'Basic structural soundness',
      'Will last with normal use',
      'Durability considered and built in; repair possible',
      'Lifecycle designed: ages well, repairable, or graceful end-of-life'
    ]
  },
  {
    id: 'storyCoherence',
    name: 'Story Coherence',
    question: 'Does the story hold together in one clear narrative?',
    levels: [
      'No story or disconnected elements',
      'Partial story with gaps',
      'Story present but not compelling',
      'Coherent story that connects all elements',
      'Story is memorable, distinctive, and adds to value'
    ]
  },
  {
    id: 'priceLogic',
    name: 'Price Logic',
    question: 'Can the maker defend their price without apology?',
    levels: [
      'No price rationale; guessing',
      'Price based on feelings or fear',
      'Some rationale but uncertain',
      'Clear logic with comparables identified',
      'Confident defence with evidence; floor price established'
    ]
  }
];

export interface GapAnalysisEntry {
  criterion: RubricCriterion;
  action: string;
}

export interface RubricSignOff {
  selfAssessmentDate?: Date;
  peerReviewDate?: Date;
  creatorSignature?: string;
  peerAssessorSignature?: string;
  readyForDefence: boolean;
}

// ============================================================================
// SCORE BANDS
// ============================================================================

export type ScoreBand = 'market-ready' | 'nearly-there' | 'development' | 'early-stage';

export const getScoreBand = (score: number): ScoreBand => {
  if (score >= 30) return 'market-ready';
  if (score >= 22) return 'nearly-there';
  if (score >= 15) return 'development';
  return 'early-stage';
};

export const SCORE_BAND_INFO: Record<ScoreBand, { label: string; description: string; color: string }> = {
  'market-ready': {
    label: 'MARKET-READY',
    description: 'Work has full valuation architecture. Proceed to market with confidence.',
    color: '#28A745'
  },
  'nearly-there': {
    label: 'NEARLY THERE',
    description: 'Strong foundation. Address weak criteria before market.',
    color: '#2E7D32'
  },
  'development': {
    label: 'DEVELOPMENT',
    description: 'Work has potential but gaps remain. Return to documentation.',
    color: '#B7791F'
  },
  'early-stage': {
    label: 'EARLY STAGE',
    description: 'Concept exists but valuation architecture missing. Treat as R&D.',
    color: '#C62828'
  }
};

// ============================================================================
// DEFENCE PROTOCOL TYPES
// ============================================================================

export interface DefenceSession {
  id: string;
  worksheetId: string;
  rubricIds: string[];
  
  scheduledDate: Date;
  actualDate?: Date;
  
  maker: ParticipantInfo;
  facilitator: ParticipantInfo;
  panelMembers: ParticipantInfo[];
  
  status: DefenceStatus;
  scores: DefenceSessionScores;
  
  strengths: string[];
  gaps: string[];
  
  decision: DefenceDecision;
  decisionNotes?: string;
  
  facilitatorSignature?: string;
  makerSignature?: string;
  signedAt?: Date;
}

export interface ParticipantInfo {
  id: string;
  name: string;
}

export type DefenceStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface DefenceSessionScores {
  averageRubricScore: number;
  individualScores: number[];
  scoreBand: ScoreBand;
}

export type DefenceDecision = 
  | 'passed'
  | 'conditional'
  | 'not-yet';

export const DEFENCE_DECISION_INFO: Record<DefenceDecision, { label: string; description: string; color: string }> = {
  'passed': {
    label: 'PASSED',
    description: 'Maker defended their claim. Work is market-ready.',
    color: '#28A745'
  },
  'conditional': {
    label: 'CONDITIONAL',
    description: 'Mostly strong but specific gaps need addressing.',
    color: '#B7791F'
  },
  'not-yet': {
    label: 'NOT YET',
    description: 'Significant gaps in valuation architecture. Schedule new defence.',
    color: '#C62828'
  }
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export interface WorksheetProgress {
  sectionsCompleted: number;
  totalSections: number;
  percentComplete: number;
  incompleteSections: string[];
}

export const calculateWorksheetProgress = (worksheet: ValuationWorksheet): WorksheetProgress => {
  const sections = [
    { name: 'Lineage', complete: Boolean(worksheet.lineage.culturalHeritage && worksheet.lineage.technicalLineage && worksheet.lineage.personalConnection) },
    { name: 'Function', complete: Boolean(worksheet.function.problemNeedGap && worksheet.function.whoNeedsThis && worksheet.function.whatChanges) },
    { name: 'Distinctiveness', complete: Boolean(worksheet.distinctiveness.whatCantBeCopied && worksheet.distinctiveness.distinctivenessMarkers.length > 0) },
    { name: 'Authority', complete: Boolean(worksheet.authority.valuationClaim > 0 && worksheet.authority.floorPrice > 0 && worksheet.authority.comparables.length >= 2) },
    { name: 'Documentation', complete: worksheet.documentationLog.length >= 3 },
    { name: 'Defence Prep', complete: Boolean(worksheet.defencePrep.whatIsThis && worksheet.defencePrep.whyDoesItExist && worksheet.defencePrep.whyPricedHere) }
  ];
  
  const completed = sections.filter(s => s.complete).length;
  const incomplete = sections.filter(s => !s.complete).map(s => s.name);
  
  return {
    sectionsCompleted: completed,
    totalSections: sections.length,
    percentComplete: Math.round((completed / sections.length) * 100),
    incompleteSections: incomplete
  };
};

// ============================================================================
// MARKET READINESS
// ============================================================================

export const canListOnMarketplace = (va: ValuationArchitectureRecord): { canList: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  
  if (va.worksheetStatus !== 'complete') {
    reasons.push('Valuation Worksheet incomplete');
  }
  
  if (!va.selfAssessmentScore) {
    reasons.push('Self-assessment not completed');
  }
  
  if (!va.averagePeerScore && (!va.peerAssessmentScores || va.peerAssessmentScores.length === 0)) {
    reasons.push('No peer assessment completed');
  }
  
  const combinedScore = va.combinedScore || va.selfAssessmentScore || 0;
  if (combinedScore < 22) {
    reasons.push(`Quality score ${combinedScore}/35 below threshold (need 22+)`);
  }
  
  if (va.defenceStatus !== 'passed' && va.defenceStatus !== 'completed') {
    reasons.push('Defence Protocol not passed');
  }
  
  if (!va.valuationClaim || va.valuationClaim <= 0) {
    reasons.push('No valuation claim set');
  }
  
  if (!va.floorPrice || va.floorPrice <= 0) {
    reasons.push('No floor price set');
  }
  
  return {
    canList: reasons.length === 0,
    reasons
  };
};

export const calculateMarketReadiness = (va: ValuationArchitectureRecord): number => {
  let score = 0;
  
  // Worksheet: 20 points
  if (va.worksheetStatus === 'complete') score += 20;
  else if (va.worksheetStatus === 'in-progress') score += 10;
  
  // Self-assessment: 15 points
  if (va.selfAssessmentScore) {
    score += Math.min(15, Math.round((va.selfAssessmentScore / 35) * 15));
  }
  
  // Peer assessment: 15 points
  if (va.averagePeerScore) {
    score += Math.min(15, Math.round((va.averagePeerScore / 35) * 15));
  }
  
  // Defence: 25 points
  if (va.defenceStatus === 'passed') score += 25;
  else if (va.defenceStatus === 'conditional') score += 15;
  else if (va.defenceStatus === 'scheduled') score += 5;
  
  // Pricing: 15 points
  if (va.valuationClaim && va.valuationClaim > 0) score += 8;
  if (va.floorPrice && va.floorPrice > 0) score += 4;
  if (va.comparables && va.comparables.length >= 2) score += 3;
  
  // Sign-offs: 10 points
  if (va.creatorSignedOff) score += 4;
  if (va.peerWitnessSignedOff) score += 3;
  if (va.facilitatorSignedOff) score += 3;
  
  return Math.min(100, score);
};

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

export const createEmptyValuationArchitecture = (): ValuationArchitectureRecord => ({
  worksheetStatus: 'not-started',
  defenceStatus: 'not-scheduled',
  creatorSignedOff: false,
  peerWitnessSignedOff: false,
  facilitatorSignedOff: false,
  marketReady: false
});

export const createEmptyWorksheet = (
  creatorId: string,
  creatorName: string,
  programme: Programme,
  prototypeTitle: string
): ValuationWorksheet => ({
  id: `ws-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  meta: {
    creatorId,
    creatorName,
    programme,
    sessionLab: '',
    prototypeTitle,
    date: new Date()
  },
  lineage: {
    culturalHeritage: '',
    technicalLineage: '',
    personalConnection: '',
    namedInfluences: []
  },
  function: {
    problemNeedGap: '',
    whoNeedsThis: '',
    whatChanges: '',
    practicalFunction: '',
    emotionalCulturalFunction: ''
  },
  distinctiveness: {
    whatCantBeCopied: '',
    materialChoices: '',
    processChoices: '',
    ifNotYouTest: '',
    distinctivenessMarkers: []
  },
  authority: {
    standingToPriceThis: '',
    timeInvestment: '',
    materialCosts: 0,
    equivalentLabourRate: 0,
    comparables: [],
    valuationClaim: 0,
    floorPrice: 0
  },
  documentationLog: [],
  evidenceCapture: {
    startingMaterials: false,
    keyProcessStages: false,
    mistakesIterations: false,
    toolsWorkspace: false,
    finishedPiece: false,
    pieceInContext: false,
    creatorWithPiece: false
  },
  defencePrep: {
    whatIsThis: '',
    whyDoesItExist: '',
    whyPricedHere: '',
    whatWouldMakeItMoreValuable: '',
    whyBuyFromYou: ''
  }
});
