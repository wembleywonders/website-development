/**
 * src/systems/rovs/personalities/pathfinder/STEMSageWithTracking.tsx
 * ===================================================================
 * STEMSage With Tracking — Updated
 * Wembley Wonders CIC
 *
 * REVISION: Wired to journalStore verification system.
 *
 * This file is the bridge between:
 *   - transformationStore (legacy milestone system, still used platform-wide)
 *   - journalStore (verification layer: repair evidence, diagnostic sessions,
 *     skill gates, Maya verification sessions)
 *
 * ORIGINAL trackMilestone calls are preserved — nothing that imports
 * useSTEMSageTracking breaks. New verification-aware functions are
 * added alongside, not replacing.
 *
 * The key addition: trackDiagnosticTraining now records a real
 * DiagnosticSession to journalStore and returns gate status.
 * trackTechnicalProgress now optionally submits RepairEvidence and
 * triggers the Maya verification flow.
 *
 * Design principle:
 * STEMSage is Neville's data layer. Neville has the conversation.
 * STEMSage does the recording. They share the same journalStore.
 */

import { useTransformationStore } from '@/stores/transformationStore';
import {
  useJournalStore,
  useGateRequirements,
  useSTEMgeneersStats,
  usePendingVerificationId,
  usePendingVerificationSession,
  useDismissPendingVerification,
} from '@/stores/journalStore';
import type {
  RepairLayer,
  DiagnosisMethod,
  RepairEvidence,
  DiagnosticSession,
} from '@/types/creators-journal';

// ============================================================================
// ORIGINAL TYPES — all preserved exactly
// ============================================================================

type TechnicalProjectType = 'diagnostic' | 'repair' | 'build' | 'production';
type EcosystemEntryType = 'apprenticeship' | 'subcontracting' | 'partnership' | 'complementary' | 'contract';
type PathwayType = 'mobility' | 'devices' | 'studio';

type ValidMilestoneType =
  | 'problem-identified'
  | 'skill-learned'
  | 'prototype-built'
  | 'first-user'
  | 'showcase-completed'
  | 'impact-measured'
  | 'revenue-earned'
  | 'decision-made'
  | 'first-mentee'
  | 'collaboration-formed';

interface EcosystemConnection {
  businessType: string;
  entryType: EcosystemEntryType;
  pathway: PathwayType;
  relationshipStage: 'identified' | 'contacted' | 'trial' | 'established';
  notes?: string;
}

interface SuccessionOpportunity {
  businessName: string;
  ownerAge?: string;
  signals: string[];
  relationshipBuilding: string[];
  timelineEstimate: string;
}

interface EventParticipation {
  eventType: string;
  role: string;
  servicesProvided: string[];
  connectionsMade: number;
  followUpOpportunities: string[];
}

interface TechnicalMetric {
  metric: string;
  value: number;
  unit: string;
}

// ============================================================================
// NEW TYPES — verification-aware extensions
// ============================================================================

/**
 * Extended repair progress payload.
 * When repairEvidence is provided, the repair is submitted to journalStore
 * and Maya verification is triggered. Without it, falls back to the original
 * transformationStore milestone.
 */
interface TechnicalProgressPayload {
  skill: string;
  projectType: TechnicalProjectType;
  pathway: PathwayType;
  // NEW optional verification fields
  repairEvidence?: {
    layer: RepairLayer;
    itemDescription: string;
    symptomDescription: string;
    diagnosisReasoning: string;
    methodsUsed?: DiagnosisMethod[];
    physicsExplained?: string;
    methodDescription: string;
    timeSpent?: number;
    successful: boolean;
    outcomeDescription: string;
    savingAchieved?: number;
    incomeEarned?: number;
    claimTokenRef?: string;
    ruledOut?: string[];
  };
}

/**
 * Extended diagnostic training payload.
 * When scoredSession is provided, records a real DiagnosticSession
 * to journalStore with proper accuracy scoring.
 */
interface DiagnosticTrainingPayload {
  scenariosCompleted: number;
  accuracy: number;
  pathwaysCovered: PathwayType[];
  // NEW optional verification fields
  scoredSession?: {
    layer: RepairLayer;
    scenarioId: string;
    symptomPresented: string;
    correctDiagnosis: string;
    pathTaken: string[];
    correctPath: string[];
    timeToCorrectDiagnosis: number;
    diagnosisCorrect: boolean;
    accuracyScore: number;
    physicsExplanation?: string;
    physicsSubject?: string;
    variantSeed?: string;
  };
}

/**
 * Return type for verification-aware tracking functions.
 * Adds gate status and verification session info to original return shape.
 */
interface TrackingResult {
  // Original fields
  message: string;
  suggestEcosystemExplorer?: boolean;
  relevantPathway?: PathwayType;
  suggestRealWorldPractice?: boolean;
  readyForEcosystem?: boolean;
  suggestMoreTraining?: boolean;
  celebrateMilestone?: boolean;
  entryType?: EcosystemEntryType;
  nextStage?: EcosystemConnection['relationshipStage'] | null;
  followUps?: string[];
  urgency?: string;
  servicesProvided?: string[];
  equipmentNowAccessible?: string[];
  newCapabilities?: string[];
  reinforceEcosystem?: boolean;
  signals?: string[];
  suggestedActions?: string[];
  // NEW verification fields
  verificationTriggered?: boolean;
  verificationSessionId?: string;
  gateStatus?: 'below-threshold' | 'passed' | 'passed-with-distinction';
  gateProgress?: number;
  repairEvidenceId?: string;
  sessionFeedback?: string;
}

// ============================================================================
// ORIGINAL MILESTONE MAPPING — preserved exactly
// ============================================================================

const MILESTONE_MAPPING: Record<string, ValidMilestoneType> = {
  diagnostic: 'problem-identified',
  repair: 'skill-learned',
  build: 'prototype-built',
  production: 'impact-measured',
  'ecosystem-identified': 'problem-identified',
  'ecosystem-contacted': 'decision-made',
  'ecosystem-trial': 'first-user',
  'ecosystem-established': 'showcase-completed',
  succession: 'problem-identified',
  event: 'collaboration-formed',
  'collective-contribution': 'first-mentee',
  'collective-hand': 'first-mentee',
  income: 'revenue-earned',
  training: 'skill-learned',
};

// ============================================================================
// LAYER → PATHWAY MAPPING
// Maps STEMgeneers repair layers to original STEMSage pathway types.
// Needed to keep ecosystem connection tracking coherent.
// ============================================================================

const LAYER_TO_PATHWAY: Partial<Record<RepairLayer, PathwayType>> = {
  precision:  'devices',
  appliance:  'devices',
  trades:     'mobility',
  making:     'studio',
};

// ============================================================================
// COMPONENT — STEMSageWithTracking
// ============================================================================

export const STEMSageWithTracking = () => {
  const {
    journey,
    trackMilestone,
    recordSolutionDeployment,
  } = useTransformationStore();

  const {
    submitRepairEvidence,
    recordDiagnosticSession,
  } = useJournalStore.getState();

  // ── TECHNICAL SKILLS TRACKING ─────────────────────────────────────────────

  /**
   * Track technical skill development.
   *
   * ORIGINAL behaviour: trackMilestone to transformationStore.
   * NEW behaviour: if repairEvidence is provided, also submits to journalStore
   * and triggers Maya verification. Gate status returned in result.
   *
   * Both stores are updated — the transformation journey and the credential
   * record are separate concerns that both need the event.
   */
  const trackTechnicalProgress = (
    payloadOrSkill: TechnicalProgressPayload | string,
    projectType?: TechnicalProjectType,
    pathway?: PathwayType,
  ): TrackingResult => {
    // Support both new object API and original positional API
    const payload: TechnicalProgressPayload = typeof payloadOrSkill === 'string'
      ? { skill: payloadOrSkill, projectType: projectType!, pathway: pathway! }
      : payloadOrSkill;

    const { skill, projectType: pType, pathway: pWay, repairEvidence } = payload;

    // ── Original transformationStore milestone ────────────────────────────
    const milestoneDescriptions: Record<TechnicalProjectType, string> = {
      diagnostic: `[Diagnostic] Diagnosed ${skill} issue correctly`,
      repair:     `[Repair] Completed first ${skill} repair for real customer`,
      build:      `[Build] Built working ${skill} system/solution`,
      production: `[Production] ${skill} solution deployed and earning`,
    };

    trackMilestone({
      type: MILESTONE_MAPPING[pType],
      description: milestoneDescriptions[pType],
      rovSupport: 'STEM Sage',
    });

    // ── NEW: journalStore repair evidence submission ───────────────────────
    if (repairEvidence && (pType === 'repair' || pType === 'production')) {
      const derivedPathway = LAYER_TO_PATHWAY[repairEvidence.layer] ?? pWay;

      const { repairEvidenceId, verificationSessionId } = submitRepairEvidence({
        createdBy: 'current-user',
        journalEntryId: '',
        item: {
          description: repairEvidence.itemDescription,
          layer: repairEvidence.layer,
        },
        fault: {
          symptomDescription: repairEvidence.symptomDescription,
        },
        diagnosis: {
          reasoning: repairEvidence.diagnosisReasoning,
          methodsUsed: repairEvidence.methodsUsed ?? [],
          ruledOut: repairEvidence.ruledOut ?? [],
        },
        repair: {
          methodDescription: repairEvidence.methodDescription,
          partsUsed: [],
          totalPartsCost: 0,
          timeSpent: repairEvidence.timeSpent ?? 0,
          toolsUsed: [],
          physicsExplained: repairEvidence.physicsExplained,
        },
        outcome: {
          successful: repairEvidence.successful,
          outcomeDescription: repairEvidence.outcomeDescription,
          savingAchieved: repairEvidence.savingAchieved ?? 0,
        },
        photos: [],
        verification: { status: 'self-reported' },
        incomeEarned: repairEvidence.incomeEarned,
        claimTokenRef: repairEvidence.claimTokenRef,
      });

      return {
        message: `${skill} repair recorded. STEM Sage has a follow-up — check the verification prompt to confirm your understanding.`,
        suggestEcosystemExplorer: true,
        relevantPathway: derivedPathway,
        verificationTriggered: true,
        verificationSessionId,
        repairEvidenceId,
      };
    }

    // ── Original return for non-evidence calls ────────────────────────────
    if (pType === 'repair' || pType === 'production') {
      return {
        message: `Your ${skill} skills are proven. Ready to connect with local businesses that need this?`,
        suggestEcosystemExplorer: true,
        relevantPathway: pWay,
      };
    }

    return { message: `${skill} progress tracked. Keep building.` };
  };

  /**
   * Track diagnostic training completion.
   *
   * ORIGINAL behaviour: trackMilestone with accuracy summary.
   * NEW behaviour: if scoredSession is provided, records a real
   * DiagnosticSession to journalStore. Gate status and feedback returned.
   *
   * The 80% threshold check in the original is preserved and now
   * also maps to the journalStore gate constant (DIAGNOSTIC_GATE.PASS_THRESHOLD).
   */
  const trackDiagnosticTraining = (
    payloadOrScenarios: DiagnosticTrainingPayload | number,
    accuracy?: number,
    pathwaysCovered?: PathwayType[],
  ): TrackingResult => {
    // Support both new object API and original positional API
    const payload: DiagnosticTrainingPayload = typeof payloadOrScenarios === 'number'
      ? {
          scenariosCompleted: payloadOrScenarios,
          accuracy: accuracy!,
          pathwaysCovered: pathwaysCovered!,
        }
      : payloadOrScenarios;

    const { scenariosCompleted, accuracy: acc, pathwaysCovered: pwCovered, scoredSession } = payload;

    // ── Original transformationStore milestone ────────────────────────────
    trackMilestone({
      type: MILESTONE_MAPPING['training'],
      description: `[Training] Diagnostic training: ${scenariosCompleted} scenarios, ${Math.round(acc * 100)}% accuracy. Pathways: ${pwCovered.join(', ')}`,
      rovSupport: 'STEM Sage',
    });

    // ── NEW: journalStore diagnostic session recording ────────────────────
    if (scoredSession) {
      const { gateStatus, feedback } = recordDiagnosticSession({
        userId: 'current-user',
        layer: scoredSession.layer,
        scenario: {
          id: scoredSession.scenarioId,
          itemDescription: scoredSession.correctDiagnosis,
          symptomPresented: scoredSession.symptomPresented,
          correctDiagnosis: scoredSession.correctDiagnosis,
          variantSeed: scoredSession.variantSeed ?? '',
        },
        performance: {
          pathTaken: scoredSession.pathTaken,
          correctPath: scoredSession.correctPath,
          deviations: [],
          timeToCorrectDiagnosis: scoredSession.timeToCorrectDiagnosis,
          ruledOutCorrectly: [],
          incorrectEliminationsAttempted: [],
          finalDiagnosis: scoredSession.correctDiagnosis,
          diagnosisCorrect: scoredSession.diagnosisCorrect,
          accuracyScore: scoredSession.accuracyScore,
        },
        physicsExplanation: scoredSession.physicsExplanation
          ? {
              attempted: true,
              explanation: scoredSession.physicsExplanation,
              subject: scoredSession.physicsSubject ?? '',
            }
          : { attempted: false },
      });

      const passed = gateStatus !== 'below-threshold';

      return {
        message: passed
          ? `Strong diagnostic work — ${Math.round(scoredSession.accuracyScore * 100)}% accuracy. ${gateStatus === 'passed-with-distinction' ? 'Distinction track.' : 'This session counts toward your layer gate.'}`
          : `${Math.round(scoredSession.accuracyScore * 100)}% — below the 80% threshold. ${feedback} Try another scenario in this layer.`,
        suggestRealWorldPractice: passed,
        readyForEcosystem: passed,
        suggestMoreTraining: !passed,
        gateStatus,
        sessionFeedback: feedback,
      };
    }

    // ── Original return (no scored session) ──────────────────────────────
    if (acc >= 0.8) {
      return {
        message: "Strong diagnostic skills! You're ready for real-world troubleshooting.",
        suggestRealWorldPractice: true,
        readyForEcosystem: true,
      };
    }

    return {
      message: 'Keep practicing diagnostics. Accuracy builds customer trust.',
      suggestMoreTraining: true,
    };
  };

  // ── ECOSYSTEM CONNECTION TRACKING — original, unchanged ──────────────────

  const trackEcosystemConnection = (connection: EcosystemConnection): TrackingResult => {
    const stageDescriptions: Record<EcosystemConnection['relationshipStage'], string> = {
      identified: 'Identified potential business connection',
      contacted: 'Made initial contact with business',
      trial: 'Completed trial work/shadowing',
      established: 'Established ongoing relationship',
    };

    const stageToMilestone: Record<EcosystemConnection['relationshipStage'], string> = {
      identified: 'ecosystem-identified',
      contacted: 'ecosystem-contacted',
      trial: 'ecosystem-trial',
      established: 'ecosystem-established',
    };

    trackMilestone({
      type: MILESTONE_MAPPING[stageToMilestone[connection.relationshipStage]],
      description: `[Ecosystem] ${stageDescriptions[connection.relationshipStage]}: ${connection.businessType} (${connection.pathway}, ${connection.entryType})`,
      rovSupport: 'STEM Sage',
    });

    if (connection.relationshipStage === 'established') {
      return {
        message: `Relationship established with ${connection.businessType}. This is how sustainable income builds.`,
        celebrateMilestone: true,
        entryType: connection.entryType,
      };
    }

    const nextStepGuidance: Record<EcosystemEntryType, string> = {
      apprenticeship: 'Focus on showing up reliably. Skills transfer happens through presence.',
      subcontracting: 'Deliver quality on overflow work. Reputation builds through their customers.',
      partnership: 'Understand their business challenges. Your solutions should solve their problems.',
      complementary: 'Keep referrals flowing both ways. Mutual benefit sustains relationships.',
      contract: 'Document everything. Institutional relationships require professional processes.',
    };

    return {
      message: nextStepGuidance[connection.entryType],
      nextStage: getNextRelationshipStage(connection.relationshipStage),
    };
  };

  // ── SUCCESSION TRACKING — original, unchanged ────────────────────────────

  const trackSuccessionOpportunity = (opportunity: SuccessionOpportunity): TrackingResult => {
    trackMilestone({
      type: MILESTONE_MAPPING['succession'],
      description: `[Succession] Opportunity identified: ${opportunity.businessName}. Signals: ${opportunity.signals.slice(0, 2).join(', ')}. Timeline: ${opportunity.timelineEstimate}`,
      rovSupport: 'STEM Sage',
    });

    return {
      message: `Succession opportunity logged. Timeline: ${opportunity.timelineEstimate}. This is a long game — build trust through consistent usefulness.`,
      signals: opportunity.signals,
      suggestedActions: opportunity.relationshipBuilding,
    };
  };

  // ── EVENT PARTICIPATION — original, unchanged ─────────────────────────────

  const trackEventParticipation = (participation: EventParticipation): TrackingResult => {
    trackMilestone({
      type: 'problem-identified',
      description: `[Event] ${participation.role} at ${participation.eventType}. Services: ${participation.servicesProvided.join(', ')}. Connections: ${participation.connectionsMade}`,
      rovSupport: 'STEM Sage',
    });

    if (participation.connectionsMade > 0) {
      return {
        message: `${participation.connectionsMade} connections made. Follow up within 48 hours while context is fresh.`,
        followUps: participation.followUpOpportunities,
        urgency: 'high',
      };
    }

    return {
      message: 'Event completed. Track which services had highest demand for future positioning.',
      servicesProvided: participation.servicesProvided,
    };
  };

  // ── COLLECTIVE TRACKING — original, unchanged ─────────────────────────────

  const trackCollectiveParticipation = (
    collectiveId: string,
    contribution: number,
    equipmentAccessed: string[],
  ): TrackingResult => {
    trackMilestone({
      type: MILESTONE_MAPPING['collective-contribution'],
      description: `[Collective] Contribution: £${contribution} to ${collectiveId}. Equipment accessible: ${equipmentAccessed.length} items`,
      rovSupport: 'STEM Sage',
    });

    return {
      message: "Collective contribution logged. Shared equipment expands what's possible.",
      equipmentNowAccessible: equipmentAccessed,
    };
  };

  const trackCollectiveHandReceived = (
    collectiveId: string,
    amount: number,
    equipmentPurchased: string[],
  ): TrackingResult => {
    trackMilestone({
      type: MILESTONE_MAPPING['collective-hand'],
      description: `[Collective Hand] Received £${amount} from ${collectiveId}. Purchased: ${equipmentPurchased.join(', ')}`,
      rovSupport: 'STEM Sage',
    });

    return {
      message: `Hand received! Equipment purchased: ${equipmentPurchased.join(', ')}. These tools expand your service capacity.`,
      celebrateMilestone: true,
      newCapabilities: equipmentPurchased,
    };
  };

  // ── SOLUTION DEPLOYMENT — original, unchanged ─────────────────────────────

  const recordTechnicalSolution = (
    title: string,
    techStack: string[],
    metrics: TechnicalMetric[],
    ecosystemContext?: {
      servingBusiness?: string;
      entryType?: EcosystemEntryType;
      pathway?: PathwayType;
    },
  ): TrackingResult => {
    const description = ecosystemContext?.servingBusiness
      ? `Technical solution for ${ecosystemContext.servingBusiness}: ${techStack.join(', ')}`
      : `Technical solution built with: ${techStack.join(', ')}`;

    recordSolutionDeployment({
      title,
      description,
      category: 'product',
      usersReached: 0,
      feedback: [],
      showcasedAt: ecosystemContext?.servingBusiness
        ? [ecosystemContext.servingBusiness, 'Innovation Pod']
        : ['Innovation Pod'],
      impactMeasured: [
        { metric: 'Technical complexity', value: techStack.length, unit: 'technologies' },
        ...metrics,
      ],
    });

    return {
      message: ecosystemContext?.servingBusiness
        ? `Solution deployed for ${ecosystemContext.servingBusiness}. Track feedback and iterate.`
        : 'Solution deployed. Connect it to real business needs for sustainable income.',
    };
  };

  // ── INCOME TRACKING — original, unchanged ─────────────────────────────────

  const trackServiceIncome = (
    amount: number,
    serviceType: string,
    source: 'direct' | 'ecosystem-referral' | 'collective' | 'event',
    businessConnection?: string,
  ): TrackingResult => {
    const sourceLabel: Record<typeof source, string> = {
      direct: 'Direct client',
      'ecosystem-referral': 'Ecosystem referral',
      collective: 'Collective work',
      event: 'Event economy',
    };

    trackMilestone({
      type: MILESTONE_MAPPING['income'],
      description: `[Income] £${amount} earned: ${serviceType}. Source: ${sourceLabel[source]}${businessConnection ? ` via ${businessConnection}` : ''}`,
      rovSupport: 'STEM Sage',
    });

    if (source === 'ecosystem-referral' && businessConnection) {
      return {
        message: `£${amount} earned through ${businessConnection}. Relationship-based income is sustainable income.`,
        reinforceEcosystem: true,
      };
    }

    return {
      message: `£${amount} earned. ${source === 'direct' ? 'Consider how ecosystem connections could make this repeatable.' : ''}`,
    };
  };

  // ── HELPERS — original, unchanged ─────────────────────────────────────────

  const getNextRelationshipStage = (
    current: EcosystemConnection['relationshipStage'],
  ): EcosystemConnection['relationshipStage'] | null => {
    const progression: Record<EcosystemConnection['relationshipStage'], EcosystemConnection['relationshipStage'] | null> = {
      identified: 'contacted',
      contacted: 'trial',
      trial: 'established',
      established: null,
    };
    return progression[current];
  };

  // ── RENDER — original, unchanged ──────────────────────────────────────────

  return (
    <div className="stem-sage-tracking">
      {/* Interface renders based on consuming context */}
    </div>
  );
};

// ============================================================================
// HOOK — useSTEMSageTracking
// Updated to expose verification-aware variants alongside all originals.
// All original returned functions preserved with identical signatures.
// New functions added with clear NEW comments.
// ============================================================================

export const useSTEMSageTracking = () => {
  const { journey, trackMilestone, recordSolutionDeployment } = useTransformationStore();

  const {
    submitRepairEvidence,
    recordDiagnosticSession,
  } = useJournalStore.getState();

  // ── NEW: verification-aware hooks ────────────────────────────────────────

  /**
   * NEW — wraps usePendingVerification for consumers that only import
   * useSTEMSageTracking rather than reaching into journalStore directly.
   */
  const pendingVerification = {
    sessionId: usePendingVerificationId(),
    session:   usePendingVerificationSession(),
    dismiss:   useDismissPendingVerification(),
  };

  /**
   * NEW — wraps useSTEMgeneersStats for aggregated portfolio data.
   */
  const stemStats = useSTEMgeneersStats();

  // ── Technical skills (original signatures preserved) ─────────────────────

  const trackTechnicalProgress = (
    skill: string,
    projectType: TechnicalProjectType,
    pathway: PathwayType,
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING[projectType],
      description: `[${projectType}] ${skill} - ${pathway} pathway`,
      rovSupport: 'STEM Sage',
    });
  };

  /**
   * NEW — verification-aware variant of trackTechnicalProgress.
   * Submits RepairEvidence to journalStore and triggers Maya verification.
   * Use this when logging a repair that should count toward a skill gate.
   */
  const trackTechnicalProgressWithEvidence = (payload: TechnicalProgressPayload): TrackingResult => {
    trackMilestone({
      type: MILESTONE_MAPPING[payload.projectType],
      description: `[${payload.projectType}] ${payload.skill} - ${payload.pathway} pathway`,
      rovSupport: 'STEM Sage',
    });

    if (!payload.repairEvidence) {
      return { message: `${payload.skill} progress tracked.` };
    }

    const ev = payload.repairEvidence;

    const { repairEvidenceId, verificationSessionId } = submitRepairEvidence({
      createdBy: 'current-user',
      journalEntryId: '',
      item: { description: ev.itemDescription, layer: ev.layer },
      fault: { symptomDescription: ev.symptomDescription },
      diagnosis: {
        reasoning: ev.diagnosisReasoning,
        methodsUsed: ev.methodsUsed ?? [],
        ruledOut: ev.ruledOut ?? [],
      },
      repair: {
        methodDescription: ev.methodDescription,
        partsUsed: [],
        totalPartsCost: 0,
        timeSpent: ev.timeSpent ?? 0,
        toolsUsed: [],
        physicsExplained: ev.physicsExplained,
      },
      outcome: {
        successful: ev.successful,
        outcomeDescription: ev.outcomeDescription,
        savingAchieved: ev.savingAchieved ?? 0,
      },
      photos: [],
      verification: { status: 'self-reported' },
      incomeEarned: ev.incomeEarned,
      claimTokenRef: ev.claimTokenRef,
    });

    return {
      message: `${payload.skill} repair recorded and queued for STEM Sage verification.`,
      verificationTriggered: true,
      verificationSessionId,
      repairEvidenceId,
      suggestEcosystemExplorer: true,
      relevantPathway: LAYER_TO_PATHWAY[ev.layer] ?? payload.pathway,
    };
  };

  // ── Ecosystem connection (original signature preserved) ───────────────────

  const trackEcosystemConnection = (connection: EcosystemConnection) => {
    const stageToMilestone: Record<EcosystemConnection['relationshipStage'], string> = {
      identified: 'ecosystem-identified',
      contacted: 'ecosystem-contacted',
      trial: 'ecosystem-trial',
      established: 'ecosystem-established',
    };

    trackMilestone({
      type: MILESTONE_MAPPING[stageToMilestone[connection.relationshipStage]],
      description: `[Ecosystem] ${connection.relationshipStage}: ${connection.businessType}`,
      rovSupport: 'STEM Sage',
    });
  };

  // ── Income tracking (original signature preserved) ────────────────────────

  const trackServiceIncome = (
    amount: number,
    serviceType: string,
    source: string,
    businessConnection?: string,
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['income'],
      description: `[Income] £${amount}: ${serviceType} (${source})${businessConnection ? ` via ${businessConnection}` : ''}`,
      rovSupport: 'STEM Sage',
    });
  };

  /**
   * NEW — income tracking that also records against a repair evidence record
   * so it appears in the portfolio economic summary.
   * Pass repairEvidenceId to link income to a specific repair in journalStore.
   */
  const trackServiceIncomeWithRepair = (
    amount: number,
    serviceType: string,
    source: 'direct-client' | 'ecosystem-referral' | 'collective' | 'community-rate',
    repairEvidenceId?: string,
    businessConnection?: string,
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['income'],
      description: `[Income] £${amount}: ${serviceType} (${source})${businessConnection ? ` via ${businessConnection}` : ''}`,
      rovSupport: 'STEM Sage',
    });

    if (repairEvidenceId) {
      const store = useJournalStore.getState();
      const evidence = store.repairEvidence[repairEvidenceId];
      if (evidence) {
        // Update income on the existing repair evidence record
        store.repairEvidence[repairEvidenceId] = {
          ...evidence,
          incomeEarned: (evidence.incomeEarned ?? 0) + amount,
          incomeSource: source,
        };
        // Recalculate portfolio
        store.refreshPortfolio?.('current-user', store.portfolio?.profile.displayName ?? 'User');
      }
    }
  };

  // ── Event participation (original signature preserved) ────────────────────

  const trackEventParticipation = (
    eventType: string,
    role: string,
    connectionsMade: number,
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['event'],
      description: `[Event] ${role} at ${eventType}. ${connectionsMade} connections made.`,
      rovSupport: 'STEM Sage',
    });
  };

  // ── Collective participation (original signature preserved) ───────────────

  const trackCollectiveContribution = (collectiveId: string, amount: number) => {
    trackMilestone({
      type: MILESTONE_MAPPING['collective-contribution'],
      description: `[Collective] £${amount} contributed to ${collectiveId}`,
      rovSupport: 'STEM Sage',
    });
  };

  // ── Diagnostic training (original signature preserved) ───────────────────

  /**
   * Original three-argument form — no scoring, just milestone.
   * Preserved for backward compatibility.
   */
  const trackDiagnosticTrainingOriginal = (
    scenariosCompleted: number,
    accuracy: number,
    pathwaysCovered: PathwayType[],
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['training'],
      description: `[Training] Diagnostic training: ${scenariosCompleted} scenarios, ${Math.round(accuracy * 100)}% accuracy. Pathways: ${pathwaysCovered.join(', ')}`,
      rovSupport: 'STEM Sage',
    });
  };

  /**
   * NEW — verification-aware diagnostic training.
   * Records a real DiagnosticSession to journalStore.
   * Returns gate status and feedback. Use this from the sandbox Diagnostic Trainer.
   */
  const trackDiagnosticTrainingScored = (payload: DiagnosticTrainingPayload): TrackingResult => {
    // Always record the legacy milestone
    trackMilestone({
      type: MILESTONE_MAPPING['training'],
      description: `[Training] Diagnostic training: ${payload.scenariosCompleted} scenarios, ${Math.round(payload.accuracy * 100)}% accuracy. Pathways: ${payload.pathwaysCovered.join(', ')}`,
      rovSupport: 'STEM Sage',
    });

    if (!payload.scoredSession) {
      return payload.accuracy >= 0.8
        ? { message: "Strong diagnostic skills! You're ready for real-world troubleshooting.", suggestRealWorldPractice: true, readyForEcosystem: true }
        : { message: 'Keep practicing diagnostics. Accuracy builds customer trust.', suggestMoreTraining: true };
    }

    const s = payload.scoredSession;
    const { gateStatus, feedback } = recordDiagnosticSession({
      userId: 'current-user',
      layer: s.layer,
      scenario: {
        id: s.scenarioId,
        itemDescription: s.correctDiagnosis,
        symptomPresented: s.symptomPresented,
        correctDiagnosis: s.correctDiagnosis,
        variantSeed: s.variantSeed ?? '',
      },
      performance: {
        pathTaken: s.pathTaken,
        correctPath: s.correctPath,
        deviations: [],
        timeToCorrectDiagnosis: s.timeToCorrectDiagnosis,
        ruledOutCorrectly: [],
        incorrectEliminationsAttempted: [],
        finalDiagnosis: s.correctDiagnosis,
        diagnosisCorrect: s.diagnosisCorrect,
        accuracyScore: s.accuracyScore,
      },
      physicsExplanation: s.physicsExplanation
        ? { attempted: true, explanation: s.physicsExplanation, subject: s.physicsSubject ?? '' }
        : { attempted: false },
    });

    const passed = gateStatus !== 'below-threshold';

    return {
      message: passed
        ? `${Math.round(s.accuracyScore * 100)}% — ${gateStatus === 'passed-with-distinction' ? 'distinction. ' : ''}This session contributes to your ${s.layer} layer gate.`
        : `${Math.round(s.accuracyScore * 100)}% — below the 80% threshold. ${feedback}`,
      suggestRealWorldPractice: passed,
      readyForEcosystem: passed,
      suggestMoreTraining: !passed,
      gateStatus,
      sessionFeedback: feedback,
    };
  };

  // ── Return ────────────────────────────────────────────────────────────────

  return {
    // ORIGINAL — all preserved exactly
    trackTechnicalProgress,
    trackEcosystemConnection,
    trackServiceIncome,
    trackEventParticipation,
    trackCollectiveContribution,
    trackDiagnosticTraining: trackDiagnosticTrainingOriginal,
    journey,
    recordSolutionDeployment,

    // NEW — verification-aware additions
    trackTechnicalProgressWithEvidence,
    trackDiagnosticTrainingScored,
    trackServiceIncomeWithRepair,
    pendingVerification,
    stemStats,
  };
};

export type { TrackingResult, TechnicalProgressPayload, DiagnosticTrainingPayload };
export default STEMSageWithTracking;
