/**
 * Valuation Architecture Types
 * Wembley Wonders CIC
 * 
 * TypeScript definitions for the Valuation Architecture Toolkit
 */

// ============================================================================
// WORKSHEET TYPES
// ============================================================================

export interface ValuationWorksheet {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: WorksheetStatus;
  
  // Meta
  meta: WorksheetMeta;
  
  // Section 1: Lineage
  lineage: LineageSection;
  
  // Section 2: Function
  function: FunctionSection;
  
  // Section 3: Distinctiveness
  distinctiveness: DistinctivenessSection;
  
  // Section 4: Authority
  authority: AuthoritySection;
  
  // Section 5: Documentation Log
  documentationLog: DocumentationEntry[];
  evidenceCapture: EvidenceChecklist;
  
  // Section 6: Defence Preparation
  defencePrep: DefencePreparation;
  
  // Sign-off
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
// SECTION 1: LINEAGE
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

// ============================================================================
// SECTION 2: FUNCTION
// ============================================================================

export interface FunctionSection {
  problemNeedGap: string;
  whoNeedsThis: string;
  whatChanges: string;
  practicalFunction: string;
  emotionalCulturalFunction: string;
}

// ============================================================================
// SECTION 3: DISTINCTIVENESS
// ============================================================================

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
  'unique-cultural-reference': 'Unique cultural reference that others can\'t authentically claim',
  'proprietary-technique': 'Proprietary technique or method developed through practice',
  'specific-material-source': 'Material sourced from specific place/relationship',
  'unreplicable-story': 'Story/provenance that cannot be replicated',
  'rare-skill-combination': 'Combination of skills rarely found together',
  'community-endorsement': 'Community endorsement or cultural authority',
  'documented-development': 'Documented development process (iterations, tests, refinements)'
};

// ============================================================================
// SECTION 4: AUTHORITY
// ============================================================================

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
// SECTION 5: DOCUMENTATION LOG
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

// ============================================================================
// SECTION 6: DEFENCE PREPARATION
// ============================================================================

export interface DefencePreparation {
  whatIsThis: string;
  whyDoesItExist: string;
  whyPricedHere: string;
  whatWouldMakeItMoreValuable: string;
  whyBuyFromYou: string;
}

// ============================================================================
// SIGN-OFF
// ============================================================================

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
  levels: [string, string, string, string, string]; // Levels 1-5
}

export const RUBRIC_CRITERIA: RubricCriterionDefinition[] = [
  {
    id: 'culturalIntegrity',
    name: 'Cultural Integrity',
    question: 'Are the cultural references named, specific, and authentically held — not borrowed or implied?',
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
    question: 'Does the maker understand WHY this material, and can they articulate what it does that others wouldn\'t?',
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
    question: 'Is the making process documented with iterations, decisions, and rejections visible?',
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
    question: 'Does this work speak to real people the maker can identify — not "everyone" but a specific community or need?',
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
    question: 'Will this work last? Has the maker considered how it ages, breaks, repairs, or ends?',
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
    question: 'Does the story of the work hold together — lineage, function, material, maker — in one clear narrative?',
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
    question: 'Can the maker defend their price with comparables, time, skill, and scarcity — without apology?',
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
    description: 'Work has full valuation architecture. Proceed to market with confidence. Price holds.',
    color: '#28A745'
  },
  'nearly-there': {
    label: 'NEARLY THERE',
    description: 'Strong foundation. Address weak criteria before market. May soft-launch for feedback.',
    color: '#2E7D32'
  },
  'development': {
    label: 'DEVELOPMENT',
    description: 'Work has potential but gaps remain. Return to documentation and defence prep. Not yet priced.',
    color: '#B7791F'
  },
  'early-stage': {
    label: 'EARLY STAGE',
    description: 'Concept exists but valuation architecture missing. Treat as R&D. Do not price yet.',
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
    description: 'Maker defended their claim. Work is market-ready. Sign off the Valuation Architecture Worksheet.',
    color: '#28A745'
  },
  'conditional': {
    label: 'CONDITIONAL',
    description: 'Defence was mostly strong but specific gaps need addressing. Rework and return for brief re-defence.',
    color: '#B7791F'
  },
  'not-yet': {
    label: 'NOT YET',
    description: 'Significant gaps in valuation architecture. Return to Worksheet and Rubric. Schedule new defence.',
    color: '#C62828'
  }
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

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