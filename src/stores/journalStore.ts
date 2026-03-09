/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/stores/journalStore.ts
 * Component: creators-journal
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 *
 * REVISION: Added STEMgeneers verification layer —
 * RepairEvidence, DiagnosticSession, SkillVerificationGate,
 * STEMgeneersPortfolio, and MayaVerificationSession state
 * and actions. All original types and actions preserved intact.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  RepairEvidence,
  DiagnosticSession,
  SkillVerificationGate,
  STEMgeneersPortfolio,
  MayaVerificationSession,
  RepairLayer,
  TradesPathway,
} from '@/types/creators-journal';

// ===================================
// ORIGINAL TYPES — unchanged
// ===================================

type TransformationStage = 1 | 2 | 3 | 4;
type CPhase = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
type EmotionalState =
  | 'excited' | 'anxious' | 'confident' | 'stuck'
  | 'breakthrough' | 'overwhelmed' | 'motivated' | 'proud' | 'uncertain';
type EntryType = 'reflection' | 'milestone' | 'challenge' | 'learning' | 'gratitude' | 'plan';

interface JournalEntry {
  id: string;
  stage: TransformationStage;
  cPhase: CPhase;
  entryType: EntryType;
  title?: string;
  content: string;
  emotionalState?: EmotionalState;
  energyLevel?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  linkedMilestoneId?: string;
  isPrivate: boolean;
  sharedWith?: string[];
  timestamp: Date;
  lastEdited?: Date;
  wordCount: number;
  repairEvidenceId?: string;
  diagnosticSessionId?: string;
  verificationStatus?: 'unverified' | 'self-reported' | 'witnessed' | 'claim-verified' | 'mentor-approved';
}

interface JournalPrompt {
  id: string;
  stage: TransformationStage;
  cPhase: CPhase;
  question: string;
  purpose: string;
  helpfulFor: string[];
}

interface JournalStats {
  totalEntries: number;
  entriesByStage: Record<TransformationStage, number>;
  entriesByCPhase: Record<CPhase, number>;
  currentStreak: number;
  longestStreak: number;
  lastEntryDate?: Date;
  totalWords: number;
  averageWordsPerEntry: number;
  mostCommonEmotions: Array<{ emotion: EmotionalState; count: number }>;
}

// ===================================
// NEW: STEMGENEERS VERIFICATION TYPES
// ===================================

const DIAGNOSTIC_GATE = {
  PASS_THRESHOLD: 0.8,
  DISTINCTION_THRESHOLD: 0.9,
  MIN_SESSIONS_PER_LAYER: 3,
  MIN_REAL_WORLD_REPAIRS: 2,
  MIN_WITNESSED_REPAIRS: 1,
  PHYSICS_QUALITY_THRESHOLD: 0.7,
  MAYA_PASS_THRESHOLD: 0.7,
  MAYA_GATE_THRESHOLD: 0.75,
} as const;

// ===================================
// STORE STATE & ACTIONS
// ===================================

interface JournalState {
  pendingSessionId: null;
  stemStats: any;
  // ── ORIGINAL STATE ──────────────────────────────────────────────────────
  entries: JournalEntry[];

  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp' | 'wordCount'>) => string;
  updateEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id' | 'timestamp'>>) => void;
  deleteEntry: (id: string) => void;
  getEntriesByStage: (stage: TransformationStage) => JournalEntry[];
  getEntriesByCPhase: (cPhase: CPhase) => JournalEntry[];
  getEntriesByEmotionalState: (emotion: EmotionalState) => JournalEntry[];
  getRecentEntries: (count?: number) => JournalEntry[];
  searchEntries: (query: string) => JournalEntry[];
  getPromptForCurrentStage: (stage: TransformationStage, cPhase?: CPhase) => JournalPrompt | null;
  getAllPromptsForStage: (stage: TransformationStage) => JournalPrompt[];
  shareEntryWith: (entryId: string, shareWith: string) => void;
  makeEntryPrivate: (entryId: string) => void;
  makeEntryPublic: (entryId: string) => void;
  getJournalStats: () => JournalStats;
  getEmotionalJourney: () => Array<{ date: Date; emotion: EmotionalState; stage: TransformationStage }>;
  exportJournal: (format: 'json' | 'markdown') => string;
  exportStageJournal: (stage: TransformationStage, format: 'json' | 'markdown') => string;

  // ── NEW: VERIFICATION STATE ──────────────────────────────────────────────
  repairEvidence: Record<string, RepairEvidence>;
  diagnosticSessions: Record<string, DiagnosticSession>;
  skillGates: Record<RepairLayer, SkillVerificationGate | null>;
  portfolio: STEMgeneersPortfolio | null;
  mayaVerificationSessions: Record<string, MayaVerificationSession>;
  pendingVerificationSessionId: string | null;

  // ── NEW: REPAIR EVIDENCE ACTIONS ─────────────────────────────────────────
  submitRepairEvidence: (
    evidence: Omit<RepairEvidence, 'id' | 'createdAt'>,
    linkedJournalEntryId?: string
  ) => {
    repairEvidenceId: string;
    verificationSessionId: string;
    verificationSession: Omit<MayaVerificationSession, 'id' | 'createdAt'>;
  };
  updateRepairEvidence: (id: string, updates: Partial<RepairEvidence>) => void;
  getRepairEvidenceById: (id: string) => RepairEvidence | null;
  getRepairEvidenceByLayer: (layer: RepairLayer) => RepairEvidence[];
  linkClaimTokenToRepair: (repairEvidenceId: string, claimTokenRef: string) => void;
  witnessRepair: (
    repairEvidenceId: string,
    witness: {
      userId: string;
      name: string;
      statement: string;
      relationship: RepairEvidence['verification']['witnessRelationship'];
    }
  ) => void;

  // ── NEW: DIAGNOSTIC SESSION ACTIONS ──────────────────────────────────────
  recordDiagnosticSession: (
    session: Omit<DiagnosticSession, 'id' | 'createdAt' | 'gateStatus'>
  ) => {
    sessionId: string;
    gateStatus: DiagnosticSession['gateStatus'];
    feedback: string;
    gateUpdated: boolean;
  };
  getDiagnosticSessionsByLayer: (layer: RepairLayer) => DiagnosticSession[];
  getLayerDiagnosticAccuracy: (layer: RepairLayer) => number;

  // ── NEW: SKILL GATE ACTIONS ───────────────────────────────────────────────
  recalculateGate: (layer: RepairLayer) => SkillVerificationGate;
  getGateStatus: (layer: RepairLayer) => SkillVerificationGate['status'];
  getGateRequirementsDisplay: (layer: RepairLayer) => GateRequirementsDisplay;

  // ── NEW: MAYA VERIFICATION ACTIONS ───────────────────────────────────────
  createVerificationSession: (
    session: Omit<MayaVerificationSession, 'id' | 'createdAt'>
  ) => string;
  completeVerificationSession: (
    sessionId: string,
    outcome: {
      overallScore: number;
      questionAssessments: Array<{
        questionId: string;
        score: number;
        demonstratesUnderstanding: boolean;
        specificFeedback: string;
        followUpTriggered: boolean;
        followUpQuestion?: string;
        gapsIdentified: string[];
      }>;
    }
  ) => {
    passed: boolean;
    failureResponse?: MayaVerificationSession['failureResponse'];
  };
  dismissPendingVerification: () => void;
  getVerificationSessionById: (id: string) => MayaVerificationSession | null;

  // ── NEW: PORTFOLIO ACTIONS ────────────────────────────────────────────────
  refreshPortfolio: (userId: string, displayName: string) => STEMgeneersPortfolio;
  addPortfolioEndorsement: (
    endorsement: STEMgeneersPortfolio['certification']['endorsedBy'][0]
  ) => void;
  requestCertification: () => {
    eligible: boolean;
    missingRequirements: string[];
    pathway?: TradesPathway[];
  };

  // ── NEW: STEMGENEERS ANALYTICS ────────────────────────────────────────────
  getSTEMgeneersStats: () => STEMgeneersStats;
  getPortfolioExport: () => string;
}

// ── DISPLAY TYPE for gate progress UI ─────────────────────────────────────

interface GateRequirementsDisplay {
  layer: RepairLayer;
  status: SkillVerificationGate['status'];
  requirements: Array<{
    label: string;
    completed: number;
    required: number;
    passed: boolean;
    description: string;
  }>;
  overallProgress: number;
  nextAction: string;
}

interface STEMgeneersStats {
  totalDiagnosticSessions: number;
  totalRepairs: number;
  witnessedRepairs: number;
  claimTokenLinkedRepairs: number;
  totalSavingsGenerated: number;
  totalIncomeEarned: number;
  averageDiagnosticAccuracy: number;
  layersInProgress: number;
  layersPassed: number;
  portfolioComplete: boolean;
  certificationStatus: STEMgeneersPortfolio['certification']['status'] | 'not-started';
}

// ===================================
// JOURNAL PROMPTS — original, unchanged
// ===================================

const JOURNAL_PROMPTS: JournalPrompt[] = [
  { id: 'stage1-problem', stage: 1, cPhase: 'connect', question: "What problem am I facing? Who else is affected by this?", purpose: "Clarify the problem you want to solve", helpfulFor: ['problem-identification', 'empathy-building'] },
  { id: 'stage1-impact', stage: 1, cPhase: 'connect', question: "How does this problem affect my life or my community?", purpose: "Understand personal motivation", helpfulFor: ['motivation', 'urgency-assessment'] },
  { id: 'stage1-tried', stage: 1, cPhase: 'create', question: "What have I already tried? What didn't work and why?", purpose: "Learn from past attempts", helpfulFor: ['learning', 'avoiding-repeats'] },
  { id: 'stage1-fear', stage: 1, cPhase: 'connect', question: "What am I afraid of? What's holding me back?", purpose: "Identify barriers", helpfulFor: ['self-awareness', 'barrier-removal'] },
  { id: 'stage2-ignition', stage: 2, cPhase: 'create', question: "What made me decide 'I can build this'? What changed?", purpose: "Capture the ignition moment", helpfulFor: ['transformation-tracking', 'inspiration'] },
  { id: 'stage2-approach', stage: 2, cPhase: 'create', question: "What's my approach? What tools and skills do I need?", purpose: "Plan the solution", helpfulFor: ['planning', 'skill-assessment'] },
  { id: 'stage2-stuck', stage: 2, cPhase: 'cultivate', question: "Where am I stuck right now? What would help me move forward?", purpose: "Identify blockers", helpfulFor: ['problem-solving', 'asking-for-help'] },
  { id: 'stage2-progress', stage: 2, cPhase: 'compete', question: "What progress have I made this week? What did I learn?", purpose: "Identify blockers", helpfulFor: ['motivation', 'skill-development'] },
  { id: 'stage2-support', stage: 2, cPhase: 'connect', question: "Who's helping me? How are they supporting my journey?", purpose: "Recognize support network", helpfulFor: ['gratitude', 'relationship-building'] },
  { id: 'stage3-launch', stage: 3, cPhase: 'celebrate', question: "How does it feel to have my solution out in the world?", purpose: "Celebrate achievement", helpfulFor: ['identity-shift', 'confidence-building'] },
  { id: 'stage3-feedback', stage: 3, cPhase: 'cultivate', question: "What feedback am I receiving? What's surprising?", purpose: "Learn from users", helpfulFor: ['improvement', 'user-understanding'] },
  { id: 'stage3-impact', stage: 3, cPhase: 'compete', question: "Who's using my solution? What impact am I seeing?", purpose: "Measure success", helpfulFor: ['validation', 'motivation'] },
  { id: 'stage3-iteration', stage: 3, cPhase: 'create', question: "What would I improve? What would I do differently?", purpose: "Reflect on learning", helpfulFor: ['continuous-improvement', 'wisdom'] },
  { id: 'stage3-future', stage: 3, cPhase: 'cultivate', question: "How can this solution grow? What's next?", purpose: "Plan sustainability", helpfulFor: ['strategic-thinking', 'scaling'] },
  { id: 'stage4-first-mentee', stage: 4, cPhase: 'connect', question: "How does it feel to guide someone through what I learned?", purpose: "Reflect on mentorship", helpfulFor: ['identity-shift', 'teaching-skills'] },
  { id: 'stage4-lessons', stage: 4, cPhase: 'cultivate', question: "What are the key lessons I want others to know?", purpose: "Distill wisdom", helpfulFor: ['knowledge-transfer', 'teaching'] },
  { id: 'stage4-patterns', stage: 4, cPhase: 'compete', question: "What patterns do I see across different creators' journeys?", purpose: "Recognize systems", helpfulFor: ['pattern-recognition', 'systemic-thinking'] },
  { id: 'stage4-growth', stage: 4, cPhase: 'celebrate', question: "How have I changed since I started? What surprised me?", purpose: "Recognize transformation", helpfulFor: ['self-awareness', 'inspiration'] },
  { id: 'stage4-legacy', stage: 4, cPhase: 'celebrate', question: "What do I want to be known for in this community?", purpose: "Define legacy", helpfulFor: ['purpose', 'long-term-thinking'] },
  { id: 'stem-repair-diag', stage: 2, cPhase: 'create', question: "Walk me through how you diagnosed the fault — what did you rule out and why?", purpose: "Surface diagnosis reasoning", helpfulFor: ['technical-thinking', 'verification'] },
  { id: 'stem-repair-phys', stage: 2, cPhase: 'create', question: "What's the physics or science behind why this repair works?", purpose: "Confirm understanding not just procedure", helpfulFor: ['deep-learning', 'verification'] },
  { id: 'stem-repair-econ', stage: 3, cPhase: 'compete', question: "What was the saving to the household? What was the economic argument for this repair?", purpose: "Connect repair to community economics", helpfulFor: ['community-value', 'income-tracking'] },
  { id: 'stem-pathway', stage: 3, cPhase: 'cultivate', question: "Does this repair point toward a formal pathway — apprenticeship, C&G, renewable energy? What would that next step look like?", purpose: "Surface pathway awareness", helpfulFor: ['career-development', 'trades-pathway'] },
];

// ===================================
// INITIAL GATE STATE
// ===================================

const initialSkillGates = (): Record<RepairLayer, SkillVerificationGate | null> => ({
  precision: null,
  appliance: null,
  home: null,
  furniture: null,
  making: null,
  trades: null,
});

// ===================================
// STORE IMPLEMENTATION
// ===================================

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({

      // ── ORIGINAL STATE ──────────────────────────────────────────────────
      entries: [],
      pendingSessionId: null,
      stemStats: null,

      // ── NEW STATE ───────────────────────────────────────────────────────
      repairEvidence: {},
      diagnosticSessions: {},
      skillGates: initialSkillGates(),
      portfolio: null,
      mayaVerificationSessions: {},
      pendingVerificationSessionId: null,

      // ===================================
      // ORIGINAL ACTIONS — all preserved exactly
      // ===================================

      addEntry: (entry) => {
        const wordCount = entry.content.trim().split(/\s+/).length;
        const newEntry: JournalEntry = {
          ...entry,
          id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          wordCount
        };
        set((state) => ({ entries: [...state.entries, newEntry] }));
        return newEntry.id;
      },

      updateEntry: (id, updates) => {
        set((state) => ({
          entries: state.entries.map(entry => {
            if (entry.id !== id) return entry;
            const updatedContent = updates.content !== undefined ? updates.content : entry.content;
            return {
              ...entry,
              ...updates,
              wordCount: updatedContent.trim().split(/\s+/).length,
              lastEdited: new Date()
            };
          })
        }));
      },

      deleteEntry: (id) => {
        set((state) => ({ entries: state.entries.filter(e => e.id !== id) }));
      },

      getEntriesByStage: (stage) =>
        get().entries
          .filter(e => e.stage === stage)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),

      getEntriesByCPhase: (cPhase) =>
        get().entries
          .filter(e => e.cPhase === cPhase)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),

      getEntriesByEmotionalState: (emotion) =>
        get().entries
          .filter(e => e.emotionalState === emotion)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),

      getRecentEntries: (count = 10) =>
        get().entries
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, count),

      searchEntries: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().entries
          .filter(e =>
            e.content.toLowerCase().includes(lowerQuery) ||
            e.title?.toLowerCase().includes(lowerQuery) ||
            e.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
          )
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },

      getPromptForCurrentStage: (stage, cPhase) => {
        const prompts = JOURNAL_PROMPTS.filter(p =>
          cPhase ? p.stage === stage && p.cPhase === cPhase : p.stage === stage
        );
        if (prompts.length === 0) return null;
        return prompts[Math.floor(Math.random() * prompts.length)];
      },

      getAllPromptsForStage: (stage) =>
        JOURNAL_PROMPTS.filter(p => p.stage === stage),

      shareEntryWith: (entryId, shareWith) => {
        set((state) => ({
          entries: state.entries.map(e =>
            e.id === entryId
              ? { ...e, sharedWith: [...(e.sharedWith || []), shareWith], isPrivate: false }
              : e
          )
        }));
      },

      makeEntryPrivate: (entryId) => {
        set((state) => ({
          entries: state.entries.map(e =>
            e.id === entryId ? { ...e, isPrivate: true, sharedWith: [] } : e
          )
        }));
      },

      makeEntryPublic: (entryId) => {
        set((state) => ({
          entries: state.entries.map(e =>
            e.id === entryId ? { ...e, isPrivate: false } : e
          )
        }));
      },

      getJournalStats: () => {
        const { entries } = get();

        if (entries.length === 0) {
          return {
            totalEntries: 0,
            entriesByStage: { 1: 0, 2: 0, 3: 0, 4: 0 },
            entriesByCPhase: { connect: 0, create: 0, cultivate: 0, compete: 0, celebrate: 0 },
            currentStreak: 0,
            longestStreak: 0,
            totalWords: 0,
            averageWordsPerEntry: 0,
            mostCommonEmotions: []
          };
        }

        const entriesByStage = entries.reduce((acc, e) => {
          acc[e.stage] = (acc[e.stage] || 0) + 1;
          return acc;
        }, {} as Record<TransformationStage, number>);

        const entriesByCPhase = entries.reduce((acc, e) => {
          acc[e.cPhase] = (acc[e.cPhase] || 0) + 1;
          return acc;
        }, {} as Record<CPhase, number>);

        const sortedEntries = [...entries].sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        let longestStreak = 0;
        let tempStreak = 1;
        for (let i = 1; i < sortedEntries.length; i++) {
          const daysDiff = Math.floor(
            (new Date(sortedEntries[i].timestamp).getTime() -
             new Date(sortedEntries[i - 1].timestamp).getTime()) / 86400000
          );
          tempStreak = daysDiff <= 1 ? tempStreak + 1 : 1;
          longestStreak = Math.max(longestStreak, tempStreak);
        }
        longestStreak = Math.max(longestStreak, tempStreak);

        const lastEntry = sortedEntries[sortedEntries.length - 1];
        const daysSinceLast = Math.floor(
          (Date.now() - new Date(lastEntry.timestamp).getTime()) / 86400000
        );
        const currentStreak = daysSinceLast <= 1 ? tempStreak : 0;

        const totalWords = entries.reduce((sum, e) => sum + e.wordCount, 0);

        const emotionCounts = entries.reduce((acc, e) => {
          if (e.emotionalState) acc[e.emotionalState] = (acc[e.emotionalState] || 0) + 1;
          return acc;
        }, {} as Record<EmotionalState, number>);

        return {
          totalEntries: entries.length,
          entriesByStage: { 1: entriesByStage[1] || 0, 2: entriesByStage[2] || 0, 3: entriesByStage[3] || 0, 4: entriesByStage[4] || 0 },
          entriesByCPhase: { connect: entriesByCPhase.connect || 0, create: entriesByCPhase.create || 0, cultivate: entriesByCPhase.cultivate || 0, compete: entriesByCPhase.compete || 0, celebrate: entriesByCPhase.celebrate || 0 },
          currentStreak,
          longestStreak,
          lastEntryDate: lastEntry.timestamp,
          totalWords,
          averageWordsPerEntry: Math.round(totalWords / entries.length),
          mostCommonEmotions: Object.entries(emotionCounts)
            .map(([emotion, count]) => ({ emotion: emotion as EmotionalState, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
        };
      },

      getEmotionalJourney: () =>
        get().entries
          .filter(e => e.emotionalState)
          .map(e => ({ date: e.timestamp, emotion: e.emotionalState!, stage: e.stage }))
          .sort((a, b) => a.date.getTime() - b.date.getTime()),

      exportJournal: (format) => {
        const { entries } = get();
        if (format === 'json') return JSON.stringify(entries, null, 2);
        const sorted = [...entries].sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        let md = `# My Creator's Journey\n\nTotal Entries: ${entries.length}\nTotal Words: ${entries.reduce((s, e) => s + e.wordCount, 0)}\n\n---\n\n`;
        sorted.forEach(e => {
          md += `## ${e.title || 'Journal Entry'}\n\n**Date:** ${new Date(e.timestamp).toLocaleDateString()}\n**Stage:** ${e.stage} | **Phase:** ${e.cPhase}\n`;
          if (e.emotionalState) md += `**Feeling:** ${e.emotionalState}\n`;
          md += `\n${e.content}\n\n---\n\n`;
        });
        return md;
      },

      exportStageJournal: (stage, format) => {
        const stageEntries = get().getEntriesByStage(stage);
        if (format === 'json') return JSON.stringify(stageEntries, null, 2);
        let md = `# Stage ${stage} Journey\n\nTotal Entries: ${stageEntries.length}\n\n---\n\n`;
        stageEntries.forEach(e => {
          md += `## ${e.title || 'Journal Entry'}\n\n**Date:** ${new Date(e.timestamp).toLocaleDateString()}\n**Phase:** ${e.cPhase}\n`;
          if (e.emotionalState) md += `**Feeling:** ${e.emotionalState}\n`;
          md += `\n${e.content}\n\n---\n\n`;
        });
        return md;
      },

      // ===================================
      // NEW: REPAIR EVIDENCE ACTIONS
      // ===================================

      submitRepairEvidence: (evidence, linkedJournalEntryId) => {
        const repairEvidenceId = `repair-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newEvidence: RepairEvidence = {
          ...evidence,
          id: repairEvidenceId,
          createdAt: new Date(),
        };

        let journalEntryId = linkedJournalEntryId;
        if (!journalEntryId) {
          journalEntryId = get().addEntry({
            stage: 2,
            cPhase: 'create',
            entryType: 'milestone',
            title: `Repair: ${evidence.item.description}`,
            content: `${evidence.fault.symptomDescription}\n\nDiagnosis: ${evidence.diagnosis.reasoning}\n\nOutcome: ${evidence.outcome.outcomeDescription}`,
            isPrivate: false,
            repairEvidenceId,
            verificationStatus: 'self-reported',
          });
        } else {
          get().updateEntry(journalEntryId, {
            repairEvidenceId,
            verificationStatus: 'self-reported',
          });
        }

        const verificationSessionId = `verify-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const verificationSession = buildRepairVerificationSessionData(newEvidence);

        set((state) => ({
          repairEvidence: { ...state.repairEvidence, [repairEvidenceId]: newEvidence },
          pendingVerificationSessionId: verificationSessionId,
          mayaVerificationSessions: {
            ...state.mayaVerificationSessions,
            [verificationSessionId]: {
              ...verificationSession,
              id: verificationSessionId,
              createdAt: new Date(),
              repairEvidenceId,
              status: 'pending' as const,
            }
          }
        }));

        get().recalculateGate(evidence.item.layer);

        return { repairEvidenceId, verificationSessionId, verificationSession };
      },

      updateRepairEvidence: (id, updates) => {
        set((state) => {
          const existing = state.repairEvidence[id];
          if (!existing) return state;
          return {
            repairEvidence: {
              ...state.repairEvidence,
              [id]: { ...existing, ...updates }
            }
          };
        });
      },

      getRepairEvidenceById: (id) =>
        get().repairEvidence[id] ?? null,

      getRepairEvidenceByLayer: (layer) =>
        Object.values(get().repairEvidence).filter(r => r.item.layer === layer),

      linkClaimTokenToRepair: (repairEvidenceId, claimTokenRef) => {
        set((state) => {
          const existing = state.repairEvidence[repairEvidenceId];
          if (!existing) return state;
          return {
            repairEvidence: {
              ...state.repairEvidence,
              [repairEvidenceId]: {
                ...existing,
                claimTokenRef,
                verification: {
                  ...existing.verification,
                  status: 'claim-verified' as const,
                  claimTokenRef,
                  claimTokenRedeemedAt: new Date(),
                }
              }
            }
          };
        });

        const repair = get().repairEvidence[repairEvidenceId];
        if (repair) get().recalculateGate(repair.item.layer);
      },

      witnessRepair: (repairEvidenceId, witness) => {
        set((state) => {
          const existing = state.repairEvidence[repairEvidenceId];
          if (!existing) return state;
          return {
            repairEvidence: {
              ...state.repairEvidence,
              [repairEvidenceId]: {
                ...existing,
                verification: {
                  ...existing.verification,
                  status: 'peer-witnessed' as const,
                  witnessUserId: witness.userId,
                  witnessName: witness.name,
                  witnessStatement: witness.statement,
                  witnessRelationship: witness.relationship,
                  witnessedAt: new Date(),
                }
              }
            }
          };
        });

        const repair = get().repairEvidence[repairEvidenceId];
        if (repair) get().recalculateGate(repair.item.layer);
      },

      // ===================================
      // NEW: DIAGNOSTIC SESSION ACTIONS
      // ===================================

      recordDiagnosticSession: (sessionData) => {
        const sessionId = `diag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const { accuracyScore } = sessionData.performance;
        const physicsAttempted = sessionData.physicsExplanation?.attempted ?? false;
        const gateStatus: DiagnosticSession['gateStatus'] =
          accuracyScore >= DIAGNOSTIC_GATE.DISTINCTION_THRESHOLD && physicsAttempted
            ? 'passed-with-distinction'
            : accuracyScore >= DIAGNOSTIC_GATE.PASS_THRESHOLD
            ? 'passed'
            : 'below-threshold';

        const session: DiagnosticSession = {
          ...sessionData,
          id: sessionId,
          createdAt: new Date(),
          gateStatus,
        };

        set((state) => ({
          diagnosticSessions: { ...state.diagnosticSessions, [sessionId]: session }
        }));

        const gateUpdated = gateStatus !== 'below-threshold';
        get().recalculateGate(sessionData.layer);

        return {
          sessionId,
          gateStatus,
          feedback: buildDiagnosticFeedbackText(session),
          gateUpdated,
        };
      },

      getDiagnosticSessionsByLayer: (layer) =>
        Object.values(get().diagnosticSessions)
          .filter(s => s.layer === layer)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),

      getLayerDiagnosticAccuracy: (layer) => {
        const sessions = get().getDiagnosticSessionsByLayer(layer);
        if (sessions.length === 0) return 0;
        return sessions.reduce((sum, s) => sum + s.performance.accuracyScore, 0) / sessions.length;
      },

      // ===================================
      // NEW: SKILL GATE ACTIONS
      // ===================================

      recalculateGate: (layer) => {
        const state = get();
        const layerRepairs = state.getRepairEvidenceByLayer(layer);
        const layerSessions = state.getDiagnosticSessionsByLayer(layer);
        const layerMayaSessions = Object.values(state.mayaVerificationSessions)
          .filter(s => {
            const linked = s.repairEvidenceId
              ? state.repairEvidence[s.repairEvidenceId]
              : null;
            return linked?.item.layer === layer;
          });

        const passedSessions = layerSessions.filter(s => s.gateStatus !== 'below-threshold');
        const avgAccuracy = layerSessions.length > 0
          ? layerSessions.reduce((sum, s) => sum + s.performance.accuracyScore, 0) / layerSessions.length
          : 0;
        const diagnosticPassed =
          passedSessions.length >= DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER &&
          avgAccuracy >= DIAGNOSTIC_GATE.PASS_THRESHOLD;

        const witnessedRepairs = layerRepairs.filter(
          r => r.verification.status === 'peer-witnessed' ||
               r.verification.status === 'claim-verified' ||
               r.verification.status === 'mentor-approved'
        );
        const claimLinked = layerRepairs.filter(r => r.claimTokenRef);
        const repairsPassed =
          layerRepairs.length >= DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS &&
          witnessedRepairs.length >= DIAGNOSTIC_GATE.MIN_WITNESSED_REPAIRS;

        const physicsAttempts = layerSessions.filter(
          s => s.physicsExplanation?.attempted &&
               (s.physicsExplanation.qualityScore ?? 0) >= DIAGNOSTIC_GATE.PHYSICS_QUALITY_THRESHOLD
        );
        const physicsPassed = physicsAttempts.length > 0;

        const passedMayaSessions = layerMayaSessions.filter(
          s => s.status === 'passed' &&
               (s.overallScore ?? 0) >= DIAGNOSTIC_GATE.MAYA_PASS_THRESHOLD
        );
        const mayaPassed = passedMayaSessions.length > 0;

        const allPassed = diagnosticPassed && repairsPassed && physicsPassed && mayaPassed;
        const distinctionSessions = layerSessions.filter(s => s.gateStatus === 'passed-with-distinction');
        const distinction = allPassed && distinctionSessions.length >= 2;

        const existingGate = state.skillGates[layer];
        const gateId = existingGate?.id ?? `gate-${layer}-${Date.now()}`;

        const gate: SkillVerificationGate = {
          id: gateId,
          userId: state.portfolio?.userId ?? 'current-user',
          layer,
          status: distinction
            ? 'passed-with-distinction'
            : allPassed
              ? 'passed'
              : layerRepairs.length > 0 || layerSessions.length > 0
                ? 'in-progress'
                : 'locked',
          updatedAt: new Date(),
          requirements: {
            diagnosticSessions: {
              required: DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER,
              completed: layerSessions.length,
              minimumAccuracy: DIAGNOSTIC_GATE.PASS_THRESHOLD,
              averageAccuracyAchieved: avgAccuracy,
              met: diagnosticPassed,
              sessionIds: []
            },
            realWorldRepairs: {
              required: DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS,
              completed: layerRepairs.length,
              witnessedCount: witnessedRepairs.length,
              claimTokenLinkedCount: claimLinked.length,
              met: repairsPassed,
            },
            physicsExplanation: {
              required: true,
              attempted: physicsAttempts.length > 0,
              qualityThreshold: DIAGNOSTIC_GATE.PHYSICS_QUALITY_THRESHOLD,
              met: physicsPassed,
              qualityAchieved: 0
            },
            mayaVerification: {
              required: true,
              sessionCompleted: passedMayaSessions.length > 0,
              met: mayaPassed,
              passed: false
            },
          },
          unlocks: {
            skillBadge: `stemgeneers-${layer}-${distinction ? 'distinction' : 'certified'}`,
            journalLayerUnlocked: true,
            sandboxToolsUnlocked: layerToSandboxTools(layer),
            pathwayRecommendation: layerToPathway(layer),
          },
          overallProgress: 0,
          diagnosticRequirement: {
            required: DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER,
            completed: layerSessions.length,
            minimumAccuracy: DIAGNOSTIC_GATE.PASS_THRESHOLD,
            averageAccuracyAchieved: avgAccuracy,
            met: diagnosticPassed,
            sessionIds: []
          },
          realWorldRepairsRequirement: {
            required: DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS,
            completed: layerRepairs.length,
            witnessedCount: witnessedRepairs.length,
            claimTokenLinkedCount: claimLinked.length,
            met: repairsPassed,
          },
          physicsExplanationRequirement: {
            required: true,
            attempted: physicsAttempts.length > 0,
            qualityThreshold: DIAGNOSTIC_GATE.PHYSICS_QUALITY_THRESHOLD,
            met: physicsPassed,
            qualityAchieved: 0,
          },
          mayaVerificationRequirement: {
            required: true,
            sessionCompleted: passedMayaSessions.length > 0,
            met: mayaPassed,
            passed: false
          },
          completedRequirements: 0,
          remainingRequirements: 0,
          diagnosticAccuracy: avgAccuracy,
          repairsLogged: layerRepairs.length,
          witnessedRepairsCount: witnessedRepairs.length,
          physicsExplanationMet: physicsPassed,
          verificationMet: mayaPassed
        };

        set((state) => ({
          skillGates: { ...state.skillGates, [layer]: gate }
        }));

        return gate;
      },

      getGateStatus: (layer) =>
        get().skillGates[layer]?.status ?? 'locked',

      getGateRequirementsDisplay: (layer): GateRequirementsDisplay => {
        const gate = get().skillGates[layer];
        const reqs = gate?.requirements;

        const requirements = [
          {
            label: 'Diagnostic training',
            completed: reqs?.diagnosticSessions.completed ?? 0,
            required: DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER,
            passed: (reqs?.diagnosticSessions.completed ?? 0) >= DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER &&
                    (reqs?.diagnosticSessions.averageAccuracyAchieved ?? 0) >= DIAGNOSTIC_GATE.PASS_THRESHOLD,
            description: `${DIAGNOSTIC_GATE.MIN_SESSIONS_PER_LAYER} sessions at ${DIAGNOSTIC_GATE.PASS_THRESHOLD * 100}%+ accuracy`,
          },
          {
            label: 'Real-world repairs',
            completed: reqs?.realWorldRepairs.completed ?? 0,
            required: DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS,
            passed: (reqs?.realWorldRepairs.completed ?? 0) >= DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS &&
                    (reqs?.realWorldRepairs.witnessedCount ?? 0) >= DIAGNOSTIC_GATE.MIN_WITNESSED_REPAIRS,
            description: `${DIAGNOSTIC_GATE.MIN_REAL_WORLD_REPAIRS} repairs, at least 1 witnessed`,
          },
          {
            label: 'Physics explanation',
            completed: reqs?.physicsExplanation.met ? 1 : 0,
            required: 1,
            passed: reqs?.physicsExplanation.met ?? false,
            description: 'Demonstrate you understand the why, not just the what',
          },
          {
            label: 'Maya verification',
            completed: reqs?.mayaVerification.met ? 1 : 0,
            required: 1,
            passed: reqs?.mayaVerification.met ?? false,
            description: 'Conversational check with STEM Sage',
          },
        ];

        const passedCount = requirements.filter(r => r.passed).length;
        const overallProgress = Math.round((passedCount / requirements.length) * 100);

        const nextRequirement = requirements.find(r => !r.passed);
        const nextAction = nextRequirement
          ? `Next: ${nextRequirement.description}`
          : gate?.status === 'passed' || gate?.status === 'passed-with-distinction'
          ? 'All requirements met — certification available'
          : 'Start with the Diagnostic Trainer in the sandbox';

        return {
          layer,
          status: gate?.status ?? 'locked',
          requirements,
          overallProgress,
          nextAction,
        };
      },

      // ===================================
      // NEW: MAYA VERIFICATION ACTIONS
      // ===================================

      createVerificationSession: (session) => {
        const sessionId = `verify-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        set((state) => ({
          mayaVerificationSessions: {
            ...state.mayaVerificationSessions,
            [sessionId]: { ...session, id: sessionId, createdAt: new Date() }
          },
          pendingVerificationSessionId: sessionId,
        }));
        return sessionId;
      },

      completeVerificationSession: (sessionId, outcome) => {
        const passed = outcome.overallScore >= DIAGNOSTIC_GATE.MAYA_PASS_THRESHOLD;

        const updatedQuestions = get().mayaVerificationSessions[sessionId]
          ?.questionSequence.map(q => {
            const assessment = outcome.questionAssessments.find(a => a.questionId === q.id);
            if (!assessment) return q;
            return {
              ...q,
              responseAssessment: {
                score: assessment.score,
                demonstratesUnderstanding: assessment.demonstratesUnderstanding,
                specificFeedback: assessment.specificFeedback,
              },
              followUpTriggered: assessment.followUpTriggered,
              followUpQuestion: assessment.followUpQuestion,
            };
          }) ?? [];

        const allGaps = outcome.questionAssessments.flatMap(a => a.gapsIdentified);

        const failureResponse: MayaVerificationSession['failureResponse'] | undefined = !passed
          ? {
              specificGaps: allGaps,
              recommendedReview: gapsToSandboxScenarios(allGaps),
              canRetryAfter: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              retryAvailableFrom: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              mentorReferral: outcome.overallScore < 0.5,
            }
          : undefined;

        set((state) => ({
          mayaVerificationSessions: {
            ...state.mayaVerificationSessions,
            [sessionId]: {
              ...state.mayaVerificationSessions[sessionId],
              status: passed ? 'passed' : outcome.overallScore < 0.5 ? 'referred-to-mentor' : 'failed',
              overallScore: outcome.overallScore,
              questionSequence: updatedQuestions,
              completedAt: new Date(),
              failureResponse,
            }
          },
          pendingVerificationSessionId: null,
        }));

        const session = get().mayaVerificationSessions[sessionId];
        if (passed && session?.repairEvidenceId) {
          get().updateRepairEvidence(session.repairEvidenceId, {
            verification: {
              ...get().repairEvidence[session.repairEvidenceId]?.verification,
              mayaVerificationSessionId: sessionId,
              mayaVerificationPassed: true,
              mayaVerificationDate: new Date(),
            }
          });

          const repair = get().repairEvidence[session.repairEvidenceId];
          if (repair) get().recalculateGate(repair.item.layer);
        }

        return { passed, failureResponse };
      },

      dismissPendingVerification: () => {
        set({ pendingVerificationSessionId: null });
      },

      getVerificationSessionById: (id) =>
        get().mayaVerificationSessions[id] ?? null,

      // ===================================
      // NEW: PORTFOLIO ACTIONS
      // ===================================

      refreshPortfolio: (userId, displayName) => {
        const state = get();
        const allRepairs = Object.values(state.repairEvidence);
        const allSessions = Object.values(state.diagnosticSessions);
        const allGates = state.skillGates;

        const repairsByLayer = allRepairs.reduce((acc, r) => {
          acc[r.item.layer] = (acc[r.item.layer] ?? 0) + 1;
          return acc;
        }, {} as { [K in RepairLayer]?: number });

        const witnessedRepairs = allRepairs.filter(r => r.verification.status !== 'self-reported');
        const claimLinked = allRepairs.filter(r => r.claimTokenRef);
        const totalSavings = allRepairs.reduce((sum, r) => sum + r.outcome.savingAchieved, 0);
        const totalIncome = allRepairs.reduce((sum, r) => sum + (r.incomeEarned ?? 0), 0);

        const avgAccuracy = allSessions.length > 0
          ? allSessions.reduce((sum, s) => sum + s.performance.accuracyScore, 0) / allSessions.length
          : 0;

        const layerAccuracies = (['precision', 'appliance', 'home', 'furniture', 'making', 'trades'] as RepairLayer[])
          .reduce((acc, layer) => {
            acc[layer] = state.getLayerDiagnosticAccuracy(layer);
            return acc;
          }, {} as { [K in RepairLayer]?: number });

        const passedLayers = Object.values(allGates).filter(
          g => g?.status === 'passed' || g?.status === 'passed-with-distinction'
        );

        const existing = state.portfolio;
        const portfolio: STEMgeneersPortfolio = {
          id: existing?.id ?? `portfolio-${userId}`,
          userId,
          createdAt: existing?.createdAt ?? new Date(),
          lastUpdatedAt: new Date(),
          profile: {
            displayName,
            strongestLayer: findStrongestLayer(repairsByLayer),
            communityRole: existing?.profile.communityRole,
            yearsActive: existing?.profile.yearsActive ?? 0,
            memberSince: existing?.profile.memberSince ?? new Date(),
          },
          layersCovered: Object.fromEntries(
            Object.entries(allGates).filter(([, g]) => g !== null)
          ) as STEMgeneersPortfolio['layersCovered'],
          repairRecord: {
            totalRepairs: allRepairs.length,
            witnessedRepairs: witnessedRepairs.length,
            claimTokenLinkedRepairs: claimLinked.length,
            totalSavingsGenerated: totalSavings,
            totalIncomeEarned: totalIncome,
            repairsByLayer,
            mostComplexRepairId: existing?.repairRecord.mostComplexRepairId,
          },
          diagnosticRecord: {
            totalSessionsCompleted: allSessions.length,
            averageAccuracy: avgAccuracy,
            bestAccuracy: allSessions.length > 0
              ? Math.max(...allSessions.map(s => s.performance.accuracyScore))
              : 0,
            layerAccuracies,
          },
          economicRecord: {
            totalIncomeFromRepairs: totalIncome,
            claimTokensGenerated: allRepairs.filter(r => r.claimTokenRef).length,
            claimTokensRedeemed: claimLinked.length,
            activeClientRelationships: existing?.economicRecord.activeClientRelationships ?? 0,
            ecosystemConnections: existing?.economicRecord.ecosystemConnections ?? [],
          },
          publicationRecord: existing?.publicationRecord ?? {
            joystickArticles: 0,
            raydyoFeatures: 0,
            journalEntriesPublished: 0,
            peopleInspiredToJoin: 0,
          },
          certification: {
            status: passedLayers.length >= 2 ? 'certified' : 'in-progress',
            certifiedAt: existing?.certification.certifiedAt,
            blockchainRef: existing?.certification.blockchainRef,
            endorsedBy: existing?.certification.endorsedBy ?? [],
            pathwayRecommendations: passedLayers
              .map(g => layerToPathway(g!.layer))
              .filter((p): p is TradesPathway => p !== undefined),
          },
        };

        set({ portfolio });
        return portfolio;
      },

      addPortfolioEndorsement: (endorsement) => {
        set((state) => {
          if (!state.portfolio) return state;
          return {
            portfolio: {
              ...state.portfolio,
              certification: {
                ...state.portfolio.certification,
                endorsedBy: [...state.portfolio.certification.endorsedBy, endorsement],
              }
            }
          };
        });
      },

      requestCertification: () => {
        const state = get();
        const gates = Object.values(state.skillGates).filter(Boolean) as SkillVerificationGate[];
        const passedGates = gates.filter(
          g => g.status === 'passed' || g.status === 'passed-with-distinction'
        );

        const missingRequirements: string[] = [];
        if (passedGates.length < 2) {
          missingRequirements.push(`Pass at least 2 skill layers (currently ${passedGates.length})`);
        }

        const totalRepairs = Object.values(state.repairEvidence).length;
        if (totalRepairs < 5) {
          missingRequirements.push(`Log at least 5 repairs (currently ${totalRepairs})`);
        }

        const witnessedCount = Object.values(state.repairEvidence).filter(
          r => r.verification.status !== 'self-reported'
        ).length;
        if (witnessedCount < 2) {
          missingRequirements.push(`At least 2 witnessed repairs (currently ${witnessedCount})`);
        }

        const eligible = missingRequirements.length === 0;
        const pathways = passedGates
          .map(g => layerToPathway(g.layer))
          .filter((p): p is TradesPathway => p !== undefined);

        return { eligible, missingRequirements, pathway: eligible ? pathways : undefined };
      },

      // ===================================
      // NEW: STEMGENEERS ANALYTICS
      // FIX: removed duplicate keys — second block was overwriting first with zeros
      // ===================================

      getSTEMgeneersStats: (): STEMgeneersStats => {
        const state = get();
        const allRepairs = Object.values(state.repairEvidence);
        const allSessions = Object.values(state.diagnosticSessions);
        const allGates = Object.values(state.skillGates).filter(Boolean) as SkillVerificationGate[];

        return {
          totalDiagnosticSessions: allSessions.length,
          totalRepairs: allRepairs.length,
          witnessedRepairs: allRepairs.filter(r => r.verification.status !== 'self-reported').length,
          claimTokenLinkedRepairs: allRepairs.filter(r => r.claimTokenRef).length,
          totalSavingsGenerated: allRepairs.reduce((sum, r) => sum + r.outcome.savingAchieved, 0),
          totalIncomeEarned: allRepairs.reduce((sum, r) => sum + (r.incomeEarned ?? 0), 0),
          averageDiagnosticAccuracy: allSessions.length > 0
            ? allSessions.reduce((sum, s) => sum + s.performance.accuracyScore, 0) / allSessions.length
            : 0,
          layersInProgress: allGates.filter(g => g.status === 'in-progress').length,
          layersPassed: allGates.filter(
            g => g.status === 'passed' || g.status === 'passed-with-distinction'
          ).length,
          portfolioComplete: state.portfolio?.certification.status === 'certified',
          certificationStatus: state.portfolio?.certification.status ?? 'not-started',
        };
      },

      getPortfolioExport: () => {
        const state = get();
        const p = state.portfolio;
        if (!p) return '# STEMgeneers Portfolio\n\nNo portfolio data yet.';

        const stats = state.getSTEMgeneersStats();
        const allRepairs = Object.values(state.repairEvidence)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        let md = `# STEMgeneers Portfolio — ${p.profile.displayName}\n\n`;
        md += `**Certification Status:** ${p.certification.status}\n`;
        md += `**Member Since:** ${new Date(p.profile.memberSince).toLocaleDateString('en-GB')}\n\n`;
        md += `---\n\n`;

        md += `## Summary\n\n`;
        md += `- Total Repairs Logged: ${stats.totalRepairs}\n`;
        md += `- Witnessed Repairs: ${stats.witnessedRepairs}\n`;
        md += `- Claim Token Verified: ${stats.claimTokenLinkedRepairs}\n`;
        md += `- Total Savings Generated: £${stats.totalSavingsGenerated}\n`;
        md += `- Total Income Earned: £${stats.totalIncomeEarned}\n`;
        md += `- Average Diagnostic Accuracy: ${Math.round(stats.averageDiagnosticAccuracy * 100)}%\n`;
        md += `- Layers Passed: ${stats.layersPassed}\n\n`;

        md += `## Repair Record\n\n`;
        allRepairs.forEach(r => {
          md += `### ${r.item.description}\n`;
          md += `**Date:** ${new Date(r.createdAt).toLocaleDateString('en-GB')} | `;
          md += `**Layer:** ${r.item.layer} | `;
          md += `**Verification:** ${r.verification.status}\n\n`;
          md += `**Fault:** ${r.fault.symptomDescription}\n\n`;
          md += `**Diagnosis:** ${r.diagnosis.reasoning}\n\n`;
          if (r.repair.physicsExplained) {
            md += `**Physics:** ${r.repair.physicsExplained}\n\n`;
          }
          md += `**Outcome:** ${r.outcome.outcomeDescription}\n`;
          md += `**Saving:** £${r.outcome.savingAchieved}`;
          if (r.incomeEarned) md += ` | **Income earned:** £${r.incomeEarned}`;
          if (r.claimTokenRef) md += ` | **Claim token:** ${r.claimTokenRef}`;
          md += `\n\n---\n\n`;
        });

        if (p.certification.endorsedBy.length > 0) {
          md += `## Endorsements\n\n`;
          p.certification.endorsedBy.forEach(e => {
            md += `> "${e.endorsementText}"\n`;
            md += `> — ${e.endorserName} (${e.endorserRole}), ${new Date(e.endorsedAt).toLocaleDateString('en-GB')}\n\n`;
          });
        }

        return md;
      },
    }),
    {
      name: 'journal-store',
      partialize: (state) => ({
        entries: state.entries,
        repairEvidence: state.repairEvidence,
        diagnosticSessions: state.diagnosticSessions,
        skillGates: state.skillGates,
        portfolio: state.portfolio,
        mayaVerificationSessions: state.mayaVerificationSessions,
      })
    }
  )
);

// ===================================
// HELPERS — internal to store
// ===================================

function buildRepairVerificationSessionData(
  repair: RepairEvidence
): Omit<MayaVerificationSession, 'id' | 'createdAt'> {
  const questionsByLayer: Record<RepairLayer, Array<{ id: string; text: string; type: MayaVerificationSession['questionSequence'][0]['questionType'] }>> = {
    appliance: [
      { id: 'q-app-r', text: "Walk me through how you knew what the fault was. What did you rule out and why?", type: 'open-reasoning' },
      { id: 'q-app-p', text: "Can you explain the physics of why this part fails — not just that it wears out, but what's actually happening?", type: 'physics-explanation' },
      { id: 'q-app-d', text: "At what point did you decide repair was worth attempting rather than replacement? What was that calculation?", type: 'decision-justification' },
    ],
    precision: [
      { id: 'q-pre-r', text: "Before you opened anything — what told you what the fault was?", type: 'open-reasoning' },
      { id: 'q-pre-p', text: "What's the science behind why this particular failure mode happens?", type: 'physics-explanation' },
      { id: 'q-pre-d', text: "How did you choose the correct replacement component? What would have happened with the wrong spec?", type: 'decision-justification' },
    ],
    home: [
      { id: 'q-hom-r', text: "Walk me through your diagnosis — what told you what was wrong before you touched anything?", type: 'open-reasoning' },
      { id: 'q-hom-p', text: "What's the physics behind why this fix works?", type: 'physics-explanation' },
      { id: 'q-hom-d', text: "Where would this job stop being a DIY repair and need a qualified tradesperson?", type: 'decision-justification' },
    ],
    furniture: [
      { id: 'q-fur-r', text: "How did you assess whether the piece was worth repairing or structurally compromised?", type: 'open-reasoning' },
      { id: 'q-fur-p', text: "What's happening at a material level that makes your repair method work?", type: 'physics-explanation' },
      { id: 'q-fur-d', text: "What would you tell someone attempting this repair for the first time?", type: 'reflection' },
    ],
    making: [
      { id: 'q-mak-r', text: "Walk me through why you chose that filament/material for this application.", type: 'open-reasoning' },
      { id: 'q-mak-p', text: "What are the structural properties that make this material right for this part?", type: 'physics-explanation' },
      { id: 'q-mak-d', text: "How did you determine your tolerance margins? What would happen if you were 0.5mm out?", type: 'decision-justification' },
    ],
    trades: [
      { id: 'q-trd-r', text: "Walk me through your diagnostic process — what did you check first and why?", type: 'open-reasoning' },
      { id: 'q-trd-p', text: "Explain the underlying science that makes this repair work.", type: 'physics-explanation' },
      { id: 'q-trd-d', text: "Where was the boundary for you — what would have stopped you and referred to a qualified trade?", type: 'decision-justification' },
    ],
  };

  const qs = questionsByLayer[repair.item.layer];

  return {
    userId: repair.createdBy,
    repairEvidenceId: repair.id,
    triggerType: 'repair-logged',
    questionSequence: qs.map(q => ({
      id: q.id,
      questionText: q.text,
      questionType: q.type,
    })),
    status: 'pending',
    passThreshold: DIAGNOSTIC_GATE.MAYA_PASS_THRESHOLD,
  };
}

function buildDiagnosticFeedbackText(session: DiagnosticSession): string {
  const pct = Math.round(session.performance.accuracyScore * 100);
  if (session.gateStatus === 'passed-with-distinction')
    return `${pct}% with physics explanation. Strong — you understand the why, not just the what.`;
  if (session.gateStatus === 'passed')
    return session.performance.deviations.length === 0
      ? `${pct}% — clean diagnostic path. Good systematic reasoning.`
      : `${pct}% — correct conclusion reached with ${session.performance.deviations.length} deviation(s). Passed.`;
  const failures = session.performance.deviations.filter(d => d.consequence === 'diagnostic-failure');
  return failures.length > 0
    ? `${pct}% — below 80% threshold. ${failures.length} choice(s) would have led to the wrong repair. Revisit elimination method in the sandbox.`
    : `${pct}% — below 80% threshold. Work through more sandbox scenarios before retrying.`;
}

function gapsToSandboxScenarios(gaps: string[]): string[] {
  const map: Record<string, string> = {
    'diagnosis': 'Diagnostic Trainer — elimination pathway practice',
    'physics': 'Physics in the Fix — underlying science module',
    'decision': 'Repair viability calculator — when to repair vs replace',
    'materials': '3D Print Viability — filament selection tool',
    'safety': 'Safety layer — pre-repair checklist',
  };
  return gaps.map(gap => {
    const key = Object.keys(map).find(k => gap.toLowerCase().includes(k));
    return key ? map[key] : `Review: ${gap}`;
  });
}

function layerToPathway(layer: RepairLayer): TradesPathway | undefined {
  const map: Partial<Record<RepairLayer, TradesPathway>> = {
    appliance: 'community-stemgeneer',
    precision: 'community-stemgeneer',
    home: 'apprenticeship-plumbing',
    making: 'scrap-cat-technical-lead',
    trades: 'apprenticeship-electrical',
    furniture: 'community-stemgeneer',
  };
  return map[layer];
}

function layerToSandboxTools(layer: RepairLayer): string[] {
  const map: Record<RepairLayer, string[]> = {
    precision: ['diagnostic-trainer', 'cost-calculator'],
    appliance: ['diagnostic-trainer', 'cost-calculator', '3d-print-viability'],
    home: ['diagnostic-trainer', 'cost-calculator'],
    furniture: ['cost-calculator'],
    making: ['3d-print-viability', 'bill-of-materials'],
    trades: ['diagnostic-trainer', 'cost-calculator', 'collective-calculator'],
  };
  return map[layer] ?? [];
}

function findStrongestLayer(
  repairsByLayer: { [K in RepairLayer]?: number }
): RepairLayer {
  const layers = Object.entries(repairsByLayer) as [RepairLayer, number][];
  if (layers.length === 0) return 'appliance';
  return layers.sort(([, a], [, b]) => b - a)[0][0];
}

// ===================================
// CUSTOM HOOKS
// FIX: usePendingVerification — select primitives individually,
// never return an object literal from a Zustand selector (causes infinite loop)
// ===================================

export const useJournalStats = () =>
  useJournalStore((state) => state.getJournalStats());

export const useJournalPrompts = (stage: TransformationStage, cPhase?: CPhase) => {
  const getPrompt = useJournalStore((state) => state.getPromptForCurrentStage);
  const getAllPrompts = useJournalStore((state) => state.getAllPromptsForStage);
  return {
    currentPrompt: getPrompt(stage, cPhase),
    allPrompts: getAllPrompts(stage)
  };
};

export const useRecentJournalEntries = (count: number = 5) =>
  useJournalStore((state) => state.getRecentEntries(count));

// NEW hooks

export const useSTEMgeneersStats = () =>
  useJournalStore((state) => state.getSTEMgeneersStats());

export const useGateStatus = (layer: RepairLayer) =>
  useJournalStore((state) => state.getGateStatus(layer));

export const useGateRequirements = (layer: RepairLayer) =>
  useJournalStore((state) => state.getGateRequirementsDisplay(layer));

// FIX: was returning { sessionId, session, dismiss } — new object every render = infinite loop.
// Now exports three separate hooks. Callers use whichever they need.
export const usePendingVerificationId = () =>
  useJournalStore((state) => state.pendingVerificationSessionId);

export const usePendingVerificationSession = () =>
  useJournalStore((state) =>
    state.pendingVerificationSessionId
      ? state.mayaVerificationSessions[state.pendingVerificationSessionId] ?? null
      : null
  );

export const useDismissPendingVerification = () =>
  useJournalStore((state) => state.dismissPendingVerification);

export const useRepairEvidenceByLayer = (layer: RepairLayer) =>
  useJournalStore((state) => state.getRepairEvidenceByLayer(layer));

export default useJournalStore;