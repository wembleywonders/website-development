/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/knowledge-commons/citation/citationStore.ts
 * Component: knowledge-commons/citation
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 *
 * Frontend cache/display layer for citation and provenance data — per
 * CJ's decision (15 Aug 2026): this store is NOT a replacement for the
 * KcResearchDeposit backend, it sits in front of it. Both need building.
 *
 * STATE OF THE BACKEND (confirmed July 2026 session, not re-verified this
 * session): KcResearchDeposit is a real, well-designed entity with a
 * working monthly-cron Covenant Score engine already consuming it
 * (KcCovenantScoringServiceImpl.java) — but the WRITE-SIDE has never been
 * built. This store's fetch/write actions are therefore honestly stubbed
 * below, matching the same pattern used in AudioBay.tsx/SimulationChamber.tsx
 * — no fake "success" states pretending a live endpoint exists when it
 * doesn't.
 *
 * SPEC SOURCE: WW-SPEC-CITATION-001 (June 2026). Base citation format is
 * WW-Harvard (surname + year in-text, e.g. "Rodney, 1972"). Depends on:
 * C2PA provenance architecture, Voice Provenance Record, Equiano
 * Protocol, Covenant Score.
 *
 * PATTERN SOURCE: the codebase does NOT have one uniform store pattern —
 * confirmed 15 Aug 2026 comparing journalStore.ts and mayaStore.ts side
 * by side (both pasted in full). Consistent across both: create<T>()
 * (persist(...)), a partialize, bottom-of-file convenience hooks rather
 * than one raw export. Inconsistent: header style, id-generation format,
 * partialize granularity, and — the one that matters for this file —
 * hook style. journalStore.ts exports one hook per getter; mayaStore.ts
 * groups related state + actions into domain hooks (useMayaROV,
 * useMayaSession, etc). This file was first built matching journalStore's
 * style, then explicitly restructured (15 Aug 2026, CJ's call) to match
 * mayaStore's domain-grouped style instead, since citationStore's small
 * surface area (six fields) suits a small number of grouped hooks better
 * than six near-identical one-liners.
 *
 * KcDepositType mirrors the real backend enum (confirmed July 2026 —
 * re-verify against src/main/java if this store is touched again after
 * a gap).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ===================================
// TYPES
// ===================================

export type KcDepositType =
  | 'PRIMARY_SOURCE'
  | 'INTERVIEW_NOTES'
  | 'WORKSHOP_OUTPUT'
  | 'CRITICAL_ANALYSIS'
  | 'IMPACT_FINDING'
  | 'LINEAGE_RECORD';

type SignOffStatus = 'not-required' | 'pending' | 'approved';

/**
 * A single citation/provenance record, cached on the frontend for
 * display. `depositId` links back to the KcResearchDeposit backend
 * entity once its write-side exists — until then, records here are
 * either locally drafted (not yet submitted) or seeded mock data.
 */
interface CitationRecord {
  id: string;
  depositId: string | null; // null = not yet written to KcResearchDeposit
  depositType: KcDepositType;

  // WW-Harvard citation fields
  authorSurname: string;
  authorFirstInitial?: string;
  year: number | 'n.d.';
  title: string;
  sourceDescription?: string; // e.g. publisher, oral interview context

  // Provenance / consent gates — CHECK-constraint equivalents from the
  // V59 migration intent (oral consent + AI disclosure). Both default to
  // false/undisclosed until explicitly set — never assume consent.
  oralConsentGiven: boolean | null; // null = not applicable (not an oral source)
  aiAssisted: boolean;
  aiDisclosureNote?: string;

  // Editorial gates
  blakeSignOffStatus: SignOffStatus;
  judithGateStatus: SignOffStatus;

  createdAt: Date;
  lastEdited?: Date;
}

interface CitationDefaults {
  blakeSignOffStatus: SignOffStatus;
  judithGateStatus: SignOffStatus;
  oralConsentApplicable: boolean;
}

// ===================================
// DEPOSIT TYPE DEFAULTS
// ===================================
// Re-homed from the old getCitationDefaults() helper (built into
// revenueModels.ts in June 2026, since removed from that file — this is
// where it actually belongs).

const DEPOSIT_TYPE_DEFAULTS: Record<KcDepositType, CitationDefaults> = {
  PRIMARY_SOURCE: {
    blakeSignOffStatus: 'not-required',
    judithGateStatus: 'pending',
    oralConsentApplicable: false,
  },
  INTERVIEW_NOTES: {
    blakeSignOffStatus: 'not-required',
    judithGateStatus: 'pending',
    oralConsentApplicable: true, // oral source — consent gate is live
  },
  WORKSHOP_OUTPUT: {
    blakeSignOffStatus: 'not-required',
    judithGateStatus: 'pending',
    oralConsentApplicable: false,
  },
  CRITICAL_ANALYSIS: {
    blakeSignOffStatus: 'not-required',
    judithGateStatus: 'pending',
    oralConsentApplicable: false,
  },
  IMPACT_FINDING: {
    // Impact findings feed the Covenant Score — treated as higher
    // sensitivity pending Blake's confirmation this is the right default.
    blakeSignOffStatus: 'pending',
    judithGateStatus: 'pending',
    oralConsentApplicable: false,
  },
  LINEAGE_RECORD: {
    // Family/lineage material — genealogy-adjacent, matches the caution
    // already established for Bright Sparks/Roots record-gap work.
    blakeSignOffStatus: 'not-required',
    judithGateStatus: 'pending',
    oralConsentApplicable: true,
  },
};

export function getCitationDefaults(depositType: KcDepositType): CitationDefaults {
  return DEPOSIT_TYPE_DEFAULTS[depositType];
}

// ===================================
// STORE STATE & ACTIONS
// ===================================

interface CitationState {
  records: Record<string, CitationRecord>;
  syncStatus: 'idle' | 'syncing' | 'unavailable';

  // ── Actions ──────────────────────────────────────────────────────────
  draftRecord: (record: Omit<CitationRecord, 'id' | 'createdAt'>) => string;
  updateRecord: (id: string, updates: Partial<Omit<CitationRecord, 'id' | 'createdAt'>>) => void;
  deleteRecord: (id: string) => void;

  // ── Selectors ────────────────────────────────────────────────────────
  getRecordById: (id: string) => CitationRecord | null;
  getRecordsByType: (depositType: KcDepositType) => CitationRecord[];
  formatWWHarvard: (id: string) => string;
  requiresBlakeSignOff: (id: string) => boolean;
  requiresJudithGate: (id: string) => boolean;

  // ── Backend sync (STUBBED — see header note) ────────────────────────
  fetchFromBackend: (depositId: string) => Promise<CitationRecord | null>;
  submitToBackend: (id: string) => Promise<{ ok: boolean; message: string }>;
}

export const useCitationStore = create<CitationState>()(
  persist(
    (set, get) => ({
      records: {},
      syncStatus: 'idle',

      draftRecord: (record) => {
        const id = `citation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newRecord: CitationRecord = {
          ...record,
          id,
          createdAt: new Date(),
        };
        set((state) => ({
          records: { ...state.records, [id]: newRecord },
        }));
        return id;
      },

      updateRecord: (id, updates) => {
        set((state) => {
          const existing = state.records[id];
          if (!existing) return state;
          return {
            records: {
              ...state.records,
              [id]: { ...existing, ...updates, lastEdited: new Date() },
            },
          };
        });
      },

      deleteRecord: (id) => {
        set((state) => {
          const { [id]: _removed, ...rest } = state.records;
          return { records: rest };
        });
      },

      getRecordById: (id) => get().records[id] ?? null,

      getRecordsByType: (depositType) =>
        Object.values(get().records).filter((r) => r.depositType === depositType),

      formatWWHarvard: (id) => {
        const record = get().records[id];
        if (!record) return '';
        const initial = record.authorFirstInitial ? ` ${record.authorFirstInitial}.` : '';
        const year = record.year === 'n.d.' ? 'n.d.' : record.year;
        return `${record.authorSurname},${initial} (${year}). ${record.title}.`;
      },

      requiresBlakeSignOff: (id) => {
        const record = get().records[id];
        return record ? record.blakeSignOffStatus !== 'not-required' : false;
      },

      requiresJudithGate: (id) => {
        const record = get().records[id];
        return record ? record.judithGateStatus !== 'not-required' : false;
      },

      // STUBBED: no confirmed KcResearchDeposit write-side exists (per
      // July 2026 session finding). Returns null / an honest failure
      // rather than faking a network round-trip.
      fetchFromBackend: async (_depositId) => {
        set({ syncStatus: 'unavailable' });
        console.warn(
          'citationStore.fetchFromBackend: no live KcResearchDeposit read endpoint confirmed yet — returning null.'
        );
        return null;
      },

      submitToBackend: async (_id) => {
        set({ syncStatus: 'unavailable' });
        return {
          ok: false,
          message:
            'KcResearchDeposit write-side is not built yet — this record is saved locally only.',
        };
      },
    }),
    {
      name: 'citation-store',
      partialize: (state) => ({
        records: state.records,
      }),
    }
  )
);

// ============================================
// CUSTOM HOOKS — domain-grouped, matching mayaStore.ts's style
// ============================================

/**
 * A single citation record: its data, its formatted WW-Harvard display
 * string, and the actions that mutate it. Bundles read + format + write
 * for one record, the way useMayaROV bundles a domain's state + actions.
 */
export const useCitationRecord = (id: string) => {
  const record = useCitationStore((s) => s.getRecordById(id));
  const formatted = useCitationStore((s) => s.formatWWHarvard(id));
  const updateRecord = useCitationStore((s) => s.updateRecord);
  const deleteRecord = useCitationStore((s) => s.deleteRecord);

  return {
    record,
    formatted,
    updateRecord: (updates: Partial<Omit<CitationRecord, 'id' | 'createdAt'>>) =>
      updateRecord(id, updates),
    deleteRecord: () => deleteRecord(id),
  };
};

/** Drafting a new record — creation only, kept separate from single-record read/write. */
export const useCitationDraft = () => {
  const draftRecord = useCitationStore((s) => s.draftRecord);
  return { draftRecord };
};

/**
 * Editorial gate status for a record — Blake/Judith sign-off checks
 * bundled together, since they're always consulted as a pair before a
 * citation is considered clear to publish.
 */
export const useCitationGates = (id: string) => {
  const requiresBlakeSignOff = useCitationStore((s) => s.requiresBlakeSignOff(id));
  const requiresJudithGate = useCitationStore((s) => s.requiresJudithGate(id));
  const record = useCitationStore((s) => s.getRecordById(id));

  return {
    requiresBlakeSignOff,
    requiresJudithGate,
    blakeSignOffStatus: record?.blakeSignOffStatus ?? 'not-required',
    judithGateStatus: record?.judithGateStatus ?? 'not-required',
    clearToPublish:
      !requiresBlakeSignOff && !requiresJudithGate
        ? true
        : record?.blakeSignOffStatus === 'approved' && record?.judithGateStatus === 'approved',
  };
};

/** All records of a given deposit type, plus that type's defaults — for list/filter views. */
export const useCitationsByType = (depositType: KcDepositType) => {
  const records = useCitationStore((s) => s.getRecordsByType(depositType));
  const defaults = getCitationDefaults(depositType);

  return { records, defaults };
};

/**
 * Backend sync state and actions — grouped together since a consumer
 * almost always needs syncStatus alongside the actions that change it,
 * the same way useMayaSession bundles session state with its actions.
 */
export const useCitationSync = () => {
  const syncStatus = useCitationStore((s) => s.syncStatus);
  const fetchFromBackend = useCitationStore((s) => s.fetchFromBackend);
  const submitToBackend = useCitationStore((s) => s.submitToBackend);

  return { syncStatus, fetchFromBackend, submitToBackend };
};

export default useCitationStore;