/**
 * src/systems/rovs/personalities/pathfinder/STEMSageVerificationProtocol.ts
 * ===========================================================================
 * STEMSage — Maya Verification Follow-Up Protocol
 * Wembley Wonders CIC
 *
 * When a repair is logged or a milestone claimed, STEMSage triggers a
 * short conversational session through Maya that confirms understanding
 * rather than just completion.
 *
 * The key insight: you cannot fake reasoning to a system that asks
 * follow-up questions. A multiple-choice test can be gamed.
 * "Walk me through why you ruled out the carbon brushes" cannot.
 *
 * Three trigger points:
 * 1. repair-logged — fired when RepairEvidence is submitted
 * 2. milestone-claimed — fired when a layer milestone is claimed
 * 3. layer-gate-attempted — fired when portfolio gate is requested
 */

import {
  MayaVerificationSession,
  VerificationQuestion,
  RepairEvidence,
  DiagnosticSession,
  RepairLayer
} from '@/types/creators-journal';
import { useTransformationStore } from '@/stores/transformationStore';

// ============================================================================
// QUESTION BANKS — per trigger type and layer
// Questions are selected and varied to prevent rote answers
// ============================================================================

const REPAIR_VERIFICATION_QUESTIONS: Record<RepairLayer, VerificationQuestion[]> = {
  appliance: [
    {
      id: 'app-diag-1',
      questionText: "Walk me through how you knew it was the bearing and not something else. What did you rule out first?",
      questionType: 'open-reasoning',
    },
    {
      id: 'app-phys-1',
      questionText: "You mentioned the drum bearing. Can you explain what actually causes a bearing to fail — not just that it wears out, but the physics of why?",
      questionType: 'physics-explanation',
    },
    {
      id: 'app-dec-1',
      questionText: "At what point did you decide the repair was worth attempting rather than recommending replacement? What was that calculation?",
      questionType: 'decision-justification',
    },
    {
      id: 'app-ref-1',
      questionText: "What would you do differently next time, and what would you tell someone attempting this repair for the first time?",
      questionType: 'reflection',
    },
    {
      id: 'app-diag-2',
      questionText: "The noise happened during spin but not agitation. Why does that matter diagnostically — what does that tell you about where the fault is?",
      questionType: 'open-reasoning',
    },
  ],

  precision: [
    {
      id: 'pre-diag-1',
      questionText: "You replaced the watch battery. Before you opened the case — what told you it was the battery and not the movement?",
      questionType: 'open-reasoning',
    },
    {
      id: 'pre-phys-1',
      questionText: "What's the science behind why a watch stops when the battery voltage drops below a certain threshold? Why doesn't it just run slowly?",
      questionType: 'physics-explanation',
    },
    {
      id: 'pre-dec-1',
      questionText: "How did you choose the correct replacement battery? What would happen if you fitted one with the wrong voltage or the wrong physical size?",
      questionType: 'decision-justification',
    },
    {
      id: 'pre-diag-2',
      questionText: "You diagnosed a stiff lock as needing lubrication. What would the signs be if it actually needed the cylinder replacing — how would you tell the difference?",
      questionType: 'open-reasoning',
    },
  ],

  home: [
    {
      id: 'home-diag-1',
      questionText: "You replaced a tap washer. Before you touched anything — how did you identify which washer was failing, and how did you isolate the water supply safely?",
      questionType: 'open-reasoning',
    },
    {
      id: 'home-phys-1',
      questionText: "Why does a worn tap washer cause a drip rather than a steady flow? What's happening physically when you tighten the tap and the drip stops temporarily?",
      questionType: 'physics-explanation',
    },
    {
      id: 'home-dec-1',
      questionText: "At what point would a dripping tap stop being a washer job and become something that needs a plumber? What signs would tell you that?",
      questionType: 'decision-justification',
    },
  ],

  furniture: [
    {
      id: 'furn-diag-1',
      questionText: "Walk me through how you assessed whether the joint was worth repairing or whether the structure was compromised beyond repair.",
      questionType: 'open-reasoning',
    },
    {
      id: 'furn-phys-1',
      questionText: "You reglued a joint. Why does old glue have to be completely removed before regluing — what happens at the molecular level if you glue over old adhesive?",
      questionType: 'physics-explanation',
    },
  ],

  making: [
    {
      id: 'mak-diag-1',
      questionText: "You decided to 3D print a replacement part. Walk me through why you chose that filament type — what properties mattered for this application?",
      questionType: 'open-reasoning',
    },
    {
      id: 'mak-phys-1',
      questionText: "What are the structural differences between PLA and PETG, and why does that matter when the part will be near heat or under mechanical load?",
      questionType: 'physics-explanation',
    },
    {
      id: 'mak-dec-1',
      questionText: "How did you determine your tolerance margins when modelling the part? What would happen if you printed it 0.5mm too large or too small?",
      questionType: 'decision-justification',
    },
  ],

  trades: [
    {
      id: 'trd-diag-1',
      questionText: "Walk me through your diagnostic process — what did you check first and why, before touching anything?",
      questionType: 'open-reasoning',
    },
    {
      id: 'trd-phys-1',
      questionText: "Can you explain the underlying physics or science that makes this repair work — not just what you did, but why it works?",
      questionType: 'physics-explanation',
    },
    {
      id: 'trd-dec-1',
      questionText: "At what point in this job would you have stopped and referred to a qualified tradesperson? Where was the boundary for you?",
      questionType: 'decision-justification',
    },
    {
      id: 'trd-ref-1',
      questionText: "What did this job teach you that you didn't fully understand before you started it?",
      questionType: 'reflection',
    },
  ],
};

// Milestone verification — fired when a layer milestone is claimed
const MILESTONE_VERIFICATION_QUESTIONS: VerificationQuestion[] = [
  {
    id: 'ms-ev-1',
    questionText: "You've claimed this milestone. Tell me about the most difficult repair in this layer — what made it difficult and how did you work through it?",
    questionType: 'open-reasoning',
  },
  {
    id: 'ms-ev-2',
    questionText: "What's the most important thing someone attempting their first repair in this layer needs to understand — not a tip, but a principle?",
    questionType: 'reflection',
  },
  {
    id: 'ms-ev-3',
    questionText: "Describe a situation in this layer where you started a diagnosis, found something unexpected, and had to change your approach.",
    questionType: 'open-reasoning',
  },
  {
    id: 'ms-ev-4',
    questionText: "You've done several repairs in this layer now. How has your diagnostic thinking changed from your first repair to your most recent one?",
    questionType: 'reflection',
  },
];

// Gate verification — fired when portfolio certification is requested
const GATE_VERIFICATION_QUESTIONS: VerificationQuestion[] = [
  {
    id: 'gate-1',
    questionText: "Someone brings you an appliance they've been told isn't worth repairing. Walk me through how you would make that assessment yourself.",
    questionType: 'open-reasoning',
  },
  {
    id: 'gate-2',
    questionText: "A young person wants to learn from you. What's the first thing you'd teach them — not a skill, but a way of thinking?",
    questionType: 'reflection',
  },
  {
    id: 'gate-3',
    questionText: "Where does your skill confidently end? What would you refer rather than attempt, and why?",
    questionType: 'decision-justification',
  },
  {
    id: 'gate-4',
    questionText: "You've logged [X] repairs and earned [£Y] from your technical work. What has changed in how your community relates to you as a result?",
    questionType: 'reflection',
  },
];

// ============================================================================
// RESPONSE ASSESSMENT
// Evaluates whether an answer demonstrates genuine understanding
// Uses the Anthropic API via the existing Maya integration
// ============================================================================

export const ASSESSMENT_SYSTEM_PROMPT = `
You are STEM Sage, part of the Maya AI system at Wembley Wonders CIC.

You are assessing whether a STEMgeneers member's answer to a verification 
question demonstrates GENUINE UNDERSTANDING of the repair or skill being verified.

You are NOT looking for perfect technical language. You ARE looking for:
- Evidence they understood WHY, not just WHAT to do
- Reasoning that could only come from having done the work
- Honest acknowledgment of what they found difficult or uncertain
- Physics or science explained in their own words (not copied from a guide)

Score from 0.0 to 1.0:
- 0.9-1.0: Demonstrates clear understanding, explains underlying principles, 
           shows genuine reflection. Could teach this to someone else.
- 0.7-0.8: Shows solid understanding with minor gaps. Clearly did the work.
- 0.5-0.6: Some understanding but gaps suggest they followed steps without
           fully understanding why they work. Follow-up needed.
- 0.3-0.4: Surface-level answer. Could be from watching a video without 
           doing the work. Does not demonstrate genuine competence.
- 0.0-0.2: Does not demonstrate understanding. Vague, generic, or 
           inconsistent with having performed this repair.

Return JSON only:
{
  "score": 0.0-1.0,
  "demonstratesUnderstanding": true/false,
  "specificFeedback": "Your specific, honest, constructive feedback here",
  "followUpTriggered": true/false,
  "followUpQuestion": "Follow-up question if score < 0.7, otherwise null",
  "gapsIdentified": ["specific gap 1", "specific gap 2"]
}

Be honest. Warm but not soft. The integrity of the STEMgeneers credential 
depends on your assessment meaning something.
`;

// ============================================================================
// PROTOCOL FUNCTIONS
// ============================================================================

/**
 * Builds a verification session when a repair is logged
 * Selects 2-3 questions appropriate to the layer and repair type
 */
export const buildRepairVerificationSession = (
  repairEvidence: RepairEvidence,
  userId: string
): Omit<MayaVerificationSession, 'id' | 'createdAt'> => {
  const layerQuestions = REPAIR_VERIFICATION_QUESTIONS[repairEvidence.item.layer];

  // Always include one reasoning question + one physics question
  // Add a reflection question if this is their first repair in this layer
  const selected: VerificationQuestion[] = [
    layerQuestions.find(q => q.questionType === 'open-reasoning')!,
    layerQuestions.find(q => q.questionType === 'physics-explanation')!,
    // Contextualise the decision question to this specific repair
    {
      ...layerQuestions.find(q => q.questionType === 'decision-justification')!,
      questionText: contextualiseDecisionQuestion(
        layerQuestions.find(q => q.questionType === 'decision-justification')!.questionText,
        repairEvidence
      )
    },
  ].filter(Boolean);

  return {
    userId,
    repairEvidenceId: repairEvidence.id,
    triggerType: 'repair-logged',
    questionSequence: selected,
    status: 'pending',
    passThreshold: 0.7,
  };
};

/**
 * Builds a verification session when a milestone is claimed
 */
export const buildMilestoneVerificationSession = (
  milestoneId: string,
  layer: RepairLayer,
  userId: string
): Omit<MayaVerificationSession, 'id' | 'createdAt'> => {
  // Mix layer-specific and general milestone questions
  const layerQ = REPAIR_VERIFICATION_QUESTIONS[layer]
    .find(q => q.questionType === 'reflection');
  
  const selected = [
    MILESTONE_VERIFICATION_QUESTIONS[0],  // most difficult repair
    MILESTONE_VERIFICATION_QUESTIONS[3],  // how thinking has changed
    layerQ,                               // layer-specific reflection
  ].filter(Boolean) as VerificationQuestion[];

  return {
    userId,
    milestoneId,
    triggerType: 'milestone-claimed',
    questionSequence: selected,
    status: 'pending',
    passThreshold: 0.7,
  };
};

/**
 * Builds a verification session when portfolio gate is attempted
 */
export const buildGateVerificationSession = (
  userId: string,
  repairCount: number,
  totalIncome: number
): Omit<MayaVerificationSession, 'id' | 'createdAt'> => {
  // Personalise gate question 4 with their actual stats
  const gateQs = [...GATE_VERIFICATION_QUESTIONS];
  gateQs[3] = {
    ...gateQs[3],
    questionText: gateQs[3].questionText
      .replace('[X]', String(repairCount))
      .replace('[£Y]', `£${totalIncome}`)
  };

  return {
    userId,
    triggerType: 'layer-gate-attempted',
    questionSequence: gateQs,
    status: 'pending',
    passThreshold: 0.75,  // higher threshold for certification gate
  };
};

/**
 * Generates the failure response when a session doesn't pass
 * Specific, actionable, not discouraging
 */
export const buildFailureResponse = (
  session: MayaVerificationSession,
  gaps: string[]
): MayaVerificationSession['failureResponse'] => {
  const retryDate = new Date();
  retryDate.setDate(retryDate.getDate() + 7); // 1 week before retry

  return {
    specificGaps: gaps,
    recommendedReview: gapsToSandboxScenarios(gaps),
    canRetryAfter: retryDate,
    mentorReferral: (session.overallScore ?? 0) < 0.5,
    // Below 0.5 overall: something is genuinely wrong — refer to mentor
    // 0.5-0.69: gaps are specific and addressable — sandbox review first
  };
};

// ============================================================================
// STEMSAGE TRACKING EXTENSION
// Adds verification protocol to the existing useSTEMSageTracking hook
// ============================================================================

export const useSTEMSageVerification = () => {
  const { trackMilestone } = useTransformationStore();

  /**
   * Called when a repair evidence submission triggers verification
   * Returns the session to be presented to the user via Maya UI
   */
  const initiateRepairVerification = (
    repairEvidence: RepairEvidence
  ): Omit<MayaVerificationSession, 'id' | 'createdAt'> => {
    // Log that verification was initiated
    trackMilestone({
      type: 'problem-identified',
      description: `[Verification] Repair verification initiated: ${repairEvidence.item.description} (${repairEvidence.item.layer})`,
      rovSupport: 'STEM Sage'
    });

    return buildRepairVerificationSession(repairEvidence, repairEvidence.createdBy);
  };

  /**
   * Called when verification session completes
   * Updates milestone tracking based on outcome
   */
  const recordVerificationOutcome = (
    session: MayaVerificationSession,
    passed: boolean
  ) => {
    if (passed) {
      trackMilestone({
        type: 'skill-learned',
        description: `[Verification Passed] Maya verification confirmed genuine understanding. Score: ${Math.round((session.overallScore ?? 0) * 100)}%`,
        rovSupport: 'STEM Sage'
      });
    } else {
      trackMilestone({
        type: 'decision-made',
        description: `[Verification] Gaps identified. Score: ${Math.round((session.overallScore ?? 0) * 100)}%. Review recommended before retry.`,
        rovSupport: 'STEM Sage'
      });
    }
  };

  /**
   * Called when diagnostic session completes
   * Applies gate logic — 0.8 threshold to pass layer
   */
  const evaluateDiagnosticGate = (
    session: DiagnosticSession
  ): { passed: boolean; distinction: boolean; feedback: string } => {
    const passed = session.performance.accuracyScore >= 0.8;
    const distinction = session.performance.accuracyScore >= 0.9
      && (session.physicsExplanation?.attempted ?? false);

    if (passed) {
      trackMilestone({
        type: 'skill-learned',
        description: `[Diagnostic Gate] ${session.layer} layer: ${Math.round(session.performance.accuracyScore * 100)}% accuracy. ${distinction ? 'Distinction.' : 'Passed.'}`,
        rovSupport: 'STEM Sage'
      });
    }

    return {
      passed,
      distinction,
      feedback: buildDiagnosticFeedback(session)
    };
  };

  return {
    initiateRepairVerification,
    recordVerificationOutcome,
    evaluateDiagnosticGate,
  };
};

// ============================================================================
// HELPERS
// ============================================================================

function contextualiseDecisionQuestion(
  template: string,
  repair: RepairEvidence
): string {
  // Personalise generic decision questions with repair-specific details
  return template
    .replace('this repair', `the ${repair.item.description} repair`)
    .replace('the repair', `the ${repair.item.description} repair`);
}

function gapsToSandboxScenarios(gaps: string[]): string[] {
  // Maps identified gaps to specific sandbox scenarios to revisit
  const gapScenarioMap: Record<string, string> = {
    'diagnosis reasoning': 'Diagnostic Trainer — elimination pathway practice',
    'physics explanation': 'Physics in the Fix — underlying science module',
    'decision justification': 'Repair viability calculator — when to repair vs replace',
    'materials knowledge': '3D Print Viability — filament selection tool',
    'safety awareness': 'Safety layer — pre-repair checklist',
  };

  return gaps
    .map(gap => {
      const key = Object.keys(gapScenarioMap).find(k => gap.toLowerCase().includes(k));
      return key ? gapScenarioMap[key] : `Review: ${gap}`;
    })
    .filter(Boolean);
}

function buildDiagnosticFeedback(session: DiagnosticSession): string {
  const score = Math.round(session.performance.accuracyScore * 100);
  const deviationCount = session.performance.deviations.length;
  const failures = session.performance.deviations
    .filter(d => d.consequence === 'diagnostic-failure');

  if (session.gateStatus === 'passed-with-distinction') {
    return `${score}% accuracy with physics explanation. Strong diagnostic reasoning — you understand the why, not just the what.`;
  }

  if (session.gateStatus === 'passed') {
    if (deviationCount === 0) {
      return `${score}% accuracy. Clean diagnostic path — good systematic reasoning.`;
    }
    return `${score}% accuracy. ${deviationCount} deviation(s) from optimal path — correct conclusion reached but some inefficiency. Passed.`;
  }

  // Below threshold
  if (failures.length > 0) {
    return `${score}% — below the 80% threshold. ${failures.length} diagnostic choice(s) would have led to the wrong repair being attempted. Revisit the elimination method in the sandbox before retrying.`;
  }

  return `${score}% — below the 80% threshold. Accuracy needs improvement before this layer is confirmed. The sandbox diagnostic trainer has randomised scenario variants — work through three more before retrying.`;
}
