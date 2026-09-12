/*
 * File: src/knowledge-commons/lesson-modules/lessonModuleStore.ts
 * Component: knowledge-commons/lesson-modules
 *
 * KC Lesson-Module Repository pilot (STEMgeneers only) — the review-status/
 * provenance piece, built per CJ's explicit goal: corrections are a
 * standing, citable research asset, not a status flag that overwrites its
 * own history.
 *
 * WHAT THIS EXTENDS, SPECIFICALLY (checked before writing, not assumed):
 * - `KcDepositType` (citationStore.ts) has six variants, all citation/
 *   research-artifact-shaped (author, year, WW-Harvard fields). None fit a
 *   lesson module's shape (programme/tier/technique). LessonModule is
 *   therefore a sibling record type, not a new KcDepositType variant —
 *   confirmed in the earlier scoping pass, not re-litigated here.
 * - "Conditional pass": confirmed as a documentation-only concept before
 *   this file (WW-RESEARCH-VESSEL-PRINCIPLE.md, describing the
 *   source-vetting pipeline's category for usable-but-uncorroborated
 *   material). No coded enum with this name existed anywhere in the repo.
 *   This file is the first place it becomes an actual status value —
 *   named to match the doc's wording ('conditional-pass') rather than
 *   inventing different wording for the same concept.
 * - C2PA / manifest-signing: citationStore.ts's own header confirms this
 *   is comment-only — no real signing/manifest code exists to extend. Not
 *   attempted here; `evidence.evidenceDepositId` below is a plain nullable
 *   reference, same honesty-over-fake-completeness pattern citationStore.ts
 *   already uses for `depositId`, not a C2PA manifest.
 * - "Checked by" attribution: no "Track 1/2 curator vetting" system exists
 *   anywhere in this repo under that name (checked directly). The real,
 *   existing "who verified this" pattern on the platform is journalStore.ts's
 *   witness object — {id, name, statement, relationship, timestamp} — used
 *   identically by both witnessRepair() and witnessDevelopment(). ReviewAttribution
 *   below matches that shape, extended with `checkerType: 'human' | 'automated'`
 *   since the witness pattern itself has no automated-check concept and this
 *   task explicitly asks for one — that one field is new, not reused.
 * - Backend write-side: same honest-stub discipline as citationStore.ts.
 *   There is no live KcResearchDeposit write endpoint for any deposit type
 *   yet (confirmed July 2026, re-affirmed 22 Aug 2026) — everything here is
 *   local-only until that exists. No fake network calls.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ===================================
// LESSON MODULE (scoped in the earlier pilot pass, built here since the
// review record needs something real to attach to)
// ===================================

/** Matches the level strings already used in accreditation-full/badge-system/progression-map.ts (untyped there — typed here for this record). */
export type LessonModuleTier = 'Explorer' | 'Builder' | 'Innovator' | 'Leader';

export interface LessonModule {
  id: string;
  title: string;
  programme: 'stemgeneers'; // single-programme pilot per CJ's scope — do not widen without a separate go-ahead
  technique: string; // e.g. "rational root theorem + synthetic division"
  tier: LessonModuleTier;
  license: string; // deposit-level license string; two-layer commercial opt-in is a separate member-level concern, not modelled here
  depositId: string | null; // null until a live KcResearchDeposit write-side exists — same pattern as CitationRecord.depositId
  createdAt: Date;
  lastEdited?: Date;
}

// ===================================
// REVIEW STATUS / CORRECTION RECORD
// ===================================

export type LessonModuleReviewStatus = 'conditional-pass' | 'cleared' | 'rejected';

/**
 * Distinguishes an error in the final arithmetic/computation from an error
 * in the underlying method — the exact distinction CJ drew for the
 * semicircle transcript (578π ≈ 1815.25 vs the correct ≈1815.84: the
 * geometry and algebra were both correct, only the final decimal step was
 * wrong). That distinction is worth keeping as data, not prose, since it's
 * what makes "show every module where an arithmetic-only error was caught"
 * a real query rather than something buried in free text.
 */
export type CorrectionErrorType = 'arithmetic' | 'conceptual' | 'citation' | 'other';

/**
 * Who/what caught an error or set a review status. Shape matches
 * journalStore.ts's witness object (userId, name, statement, relationship,
 * timestamp) used by witnessRepair()/witnessDevelopment() — the platform's
 * one existing "who verified this" pattern — plus `checkerType`, which
 * that pattern doesn't have, since this record needs to represent an
 * automated check (e.g. a symbolic-calculation re-check) as well as a
 * human reviewer.
 */
export interface ReviewAttribution {
  checkerType: 'human' | 'automated';
  checkerId: string; // userId for a human; a process/tool identifier for an automated check
  checkerName: string; // display name, or e.g. "symbolic-calc-recheck-v1"
  relationship?: string; // mirrors the witness object's `relationship` field — e.g. "second-reviewer", "original-curator"
  statement?: string; // reviewer's own note; optional since an automated check may have none
  at: Date;
}

/**
 * The evidence that backs a correction. For a maths claim this is the
 * verification calculation itself. Reuses citationStore.ts's own pattern
 * for referencing backing material: a required inline description (since
 * there is no live deposit write-side to depend on) plus an optional
 * pointer to a standalone deposit — CRITICAL_ANALYSIS is the existing
 * KcDepositType variant this naturally fits (a worked critical check of
 * someone else's claim), so a fuller write-up of the verification can
 * later be deposited under that existing type rather than a new one.
 */
export interface CorrectionEvidence {
  description: string; // the verification calculation/reasoning, inline
  evidenceDepositId: string | null; // optional link to a CRITICAL_ANALYSIS-type deposit holding the full worked check; null until deposited
}

export interface LessonModuleCorrection {
  id: string;
  originalClaim: string; // what the content actually said — the specific error, not "there was an error"
  correctedTo: string; // the corrected version
  errorType: CorrectionErrorType;
  checkedBy: ReviewAttribution; // who/what caught this specific correction
  evidence: CorrectionEvidence;
  caughtAt: Date;
}

/**
 * One per module ("a module has one of these records, not the other way
 * around" — per spec). Holds the current status plus the full correction
 * history, so a correction is never a private edit that overwrites what
 * came before — it's an appended, queryable record.
 */
export interface LessonModuleReviewRecord {
  id: string;
  moduleId: string;
  status: LessonModuleReviewStatus;
  corrections: LessonModuleCorrection[]; // usually empty; append-only when not
  reviewedBy: ReviewAttribution; // who/what most recently set `status`
  updatedAt: Date;
}

// ===================================
// STORE STATE & ACTIONS
// ===================================

interface LessonModuleState {
  modules: Record<string, LessonModule>;
  reviewRecords: Record<string, LessonModuleReviewRecord>; // keyed by moduleId, not record id — one-per-module lookup

  // ── Modules ──────────────────────────────────────────────────────────
  depositModule: (module: Omit<LessonModule, 'id' | 'createdAt'>) => string;
  getModuleById: (id: string) => LessonModule | null;
  getModulesByTier: (tier: LessonModuleTier) => LessonModule[];

  // ── Review status ────────────────────────────────────────────────────
  /** Creates the review record if one doesn't exist yet, defaulting to 'conditional-pass' — every deposited module starts unverified, never pre-cleared. */
  ensureReviewRecord: (moduleId: string) => LessonModuleReviewRecord;
  getReviewRecord: (moduleId: string) => LessonModuleReviewRecord | null;
  setReviewStatus: (
    moduleId: string,
    status: LessonModuleReviewStatus,
    reviewedBy: ReviewAttribution
  ) => void;
  recordCorrection: (
    moduleId: string,
    correction: Omit<LessonModuleCorrection, 'id' | 'caughtAt'>
  ) => string;

  // ── Query / list — makes "citable asset" real rather than aspirational ──
  getAllCorrections: () => Array<{ moduleId: string; moduleTitle: string; correction: LessonModuleCorrection }>;
  getCorrectionsByErrorType: (
    errorType: CorrectionErrorType
  ) => Array<{ moduleId: string; moduleTitle: string; correction: LessonModuleCorrection }>;
  getModulesByReviewStatus: (status: LessonModuleReviewStatus) => LessonModule[];
}

export const useLessonModuleStore = create<LessonModuleState>()(
  persist(
    (set, get) => ({
      modules: {},
      reviewRecords: {},

      depositModule: (module) => {
        const id = `lesson-module-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newModule: LessonModule = { ...module, id, createdAt: new Date() };
        set((state) => ({ modules: { ...state.modules, [id]: newModule } }));
        get().ensureReviewRecord(id);
        return id;
      },

      getModuleById: (id) => get().modules[id] ?? null,

      getModulesByTier: (tier) =>
        Object.values(get().modules).filter((m) => m.tier === tier),

      ensureReviewRecord: (moduleId) => {
        const existing = get().reviewRecords[moduleId];
        if (existing) return existing;

        const record: LessonModuleReviewRecord = {
          id: `review-${moduleId}`,
          moduleId,
          status: 'conditional-pass',
          corrections: [],
          reviewedBy: {
            checkerType: 'automated',
            checkerId: 'system-deposit',
            checkerName: 'deposit-default',
            statement: 'Default status on deposit — not yet independently checked.',
            at: new Date(),
          },
          updatedAt: new Date(),
        };
        set((state) => ({
          reviewRecords: { ...state.reviewRecords, [moduleId]: record },
        }));
        return record;
      },

      getReviewRecord: (moduleId) => get().reviewRecords[moduleId] ?? null,

      setReviewStatus: (moduleId, status, reviewedBy) => {
        const record = get().ensureReviewRecord(moduleId);
        set((state) => ({
          reviewRecords: {
            ...state.reviewRecords,
            [moduleId]: { ...record, status, reviewedBy, updatedAt: new Date() },
          },
        }));
      },

      recordCorrection: (moduleId, correction) => {
        const record = get().ensureReviewRecord(moduleId);
        const correctionId = `correction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newCorrection: LessonModuleCorrection = {
          ...correction,
          id: correctionId,
          caughtAt: new Date(),
        };
        set((state) => ({
          reviewRecords: {
            ...state.reviewRecords,
            [moduleId]: {
              ...record,
              corrections: [...record.corrections, newCorrection],
              updatedAt: new Date(),
            },
          },
        }));
        return correctionId;
      },

      getAllCorrections: () => {
        const { modules, reviewRecords } = get();
        return Object.values(reviewRecords).flatMap((record) =>
          record.corrections.map((correction) => ({
            moduleId: record.moduleId,
            moduleTitle: modules[record.moduleId]?.title ?? '(unknown module)',
            correction,
          }))
        );
      },

      getCorrectionsByErrorType: (errorType) =>
        get().getAllCorrections().filter((c) => c.correction.errorType === errorType),

      getModulesByReviewStatus: (status) => {
        const { modules, reviewRecords } = get();
        return Object.values(reviewRecords)
          .filter((r) => r.status === status)
          .map((r) => modules[r.moduleId])
          .filter((m): m is LessonModule => Boolean(m));
      },
    }),
    {
      name: 'lesson-module-store',
      partialize: (state) => ({
        modules: state.modules,
        reviewRecords: state.reviewRecords,
      }),
    }
  )
);

// ============================================
// CONVENIENCE HOOKS
// ============================================

export const useLessonModule = (id: string) =>
  useLessonModuleStore((s) => s.getModuleById(id));

export const useLessonModuleReview = (moduleId: string) =>
  useLessonModuleStore((s) => s.getReviewRecord(moduleId));

export const useLessonModuleCorrections = (moduleId: string) =>
  useLessonModuleStore((s) => s.getReviewRecord(moduleId)?.corrections ?? []);

/** All corrections across every deposited module — the query that makes corrections a citable asset rather than a private edit history. */
export const useAllCorrections = () =>
  useLessonModuleStore((s) => s.getAllCorrections());

export const useCorrectionsByErrorType = (errorType: CorrectionErrorType) =>
  useLessonModuleStore((s) => s.getCorrectionsByErrorType(errorType));

export const useModulesByReviewStatus = (status: LessonModuleReviewStatus) =>
  useLessonModuleStore((s) => s.getModulesByReviewStatus(status));

export default useLessonModuleStore;
