/**
 * Creator Margin Banding — configuration
 * Wembley Wonders CIC
 *
 * WW-SPEC-CREATOR-MARGIN-BANDING-001, Section 3.
 *
 * The three numbers that must live in exactly one place — the two wage
 * thresholds and the revenue split — live here (the split is re-exported
 * from revenueModels.ts, never copied). Everything downstream reads from
 * this file so a stale rate can't silently ship in one component while
 * another is current.
 *
 * ANNUAL REVIEW REQUIRED. Both wage figures change every year:
 *   - National Living Wage: set by GOV.UK, changes each April.
 *   - Real Living Wage: set by the Living Wage Foundation, announced each
 *     autumn, implemented by the following May.
 * When either changes, update the constant AND its `verifiedOn` /
 * `effectiveFrom` metadata below, and note it in docs/WW-OUTSTANDING-TASKS.md.
 */

import { REVENUE_MODELS, STANDARD, type RevenueModelKey } from '../../blockchain/config/revenueModels';

// ─── Wage thresholds (the RAG boundaries) ─────────────────────────────────────

interface WageThreshold {
  /** £ per hour */
  gbpPerHour: number;
  /** What this rate is and who sets it */
  label: string;
  source: string;
  /** ISO date this figure was last checked against the source */
  verifiedOn: string;
  /** When this figure takes / took effect */
  effectiveFrom: string;
}

/**
 * 🔴 / 🟡 boundary — UK statutory minimum for workers aged 21 and over.
 * Below this, the implied hourly rate is below the legal wage floor.
 */
export const NATIONAL_LIVING_WAGE: WageThreshold = {
  gbpPerHour: 12.71,
  label: 'National Living Wage (21 and over)',
  source: 'GOV.UK — National Minimum Wage and National Living Wage rates',
  verifiedOn: '2026-09-02',
  effectiveFrom: '2026-04-01',
};

/**
 * 🟡 / 🟢 boundary — Real Living Wage, London rate (Living Wage Foundation).
 * WW is Brent-based, so the London rate is the relevant one. Meeting this
 * means the work covers the actual cost of living in London.
 */
export const REAL_LIVING_WAGE_LONDON: WageThreshold = {
  gbpPerHour: 14.80,
  label: 'Real Living Wage (London)',
  source: 'Living Wage Foundation — 2025/26 rates (announced 22 Oct 2025)',
  verifiedOn: '2026-09-02',
  effectiveFrom: '2025-10-22',
};

// ─── RAG banding ─────────────────────────────────────────────────────────────

export type RagBand = 'red' | 'amber' | 'green';

export interface RagResult {
  band: RagBand;
  /** Short, mirror-framed explanation — never phrased as a target */
  meaning: string;
}

/**
 * Places an implied hourly rate into a band. This is the single place
 * the boundary comparison happens.
 */
export function bandFor(impliedHourlyGbp: number): RagResult {
  if (impliedHourlyGbp < NATIONAL_LIVING_WAGE.gbpPerHour) {
    return {
      band: 'red',
      meaning:
        `Below the UK minimum wage of £${NATIONAL_LIVING_WAGE.gbpPerHour.toFixed(2)}/hr. ` +
        'This is the gap the Pardner floor payment exists to cover while you build toward green — not a mark against you.',
    };
  }
  if (impliedHourlyGbp < REAL_LIVING_WAGE_LONDON.gbpPerHour) {
    return {
      band: 'amber',
      meaning:
        `Above the legal minimum, below the Real Living Wage for London ` +
        `(£${REAL_LIVING_WAGE_LONDON.gbpPerHour.toFixed(2)}/hr) — the rate that covers the real cost of living here.`,
    };
  }
  return {
    band: 'green',
    meaning:
      `Meets or beats the Real Living Wage for London ` +
      `(£${REAL_LIVING_WAGE_LONDON.gbpPerHour.toFixed(2)}/hr).`,
  };
}

/**
 * The two named boundary rates, for break-even-IP mode which shows a
 * break-even unit count against each (Section 4.3). A third break-even
 * point is added when the creator supplies their own hourly time value.
 */
export const BOUNDARY_RATES = {
  /** Clear the legal minimum — the red/amber boundary. */
  legalMinimum: NATIONAL_LIVING_WAGE.gbpPerHour,
  /** Clear a London living wage — the amber/green boundary. */
  livingWage: REAL_LIVING_WAGE_LONDON.gbpPerHour,
} as const;

// ─── Revenue split (re-exported, never copied) ────────────────────────────────

export { REVENUE_MODELS, type RevenueModelKey };

/**
 * The creator's share of a sale, as a fraction (0.55), for a given
 * revenue model. revenueModels.ts stores integer percentages; this is
 * the one place they are divided by 100 for the margin-banding engine.
 */
export function creatorShareFraction(modelKey: RevenueModelKey = 'STANDARD'): number {
  return REVENUE_MODELS[modelKey].maker / 100;
}

/**
 * Default revenue model when a caller doesn't specify one.
 *
 * NOTE: this also governs the 'time-billed' / service-work mode. Whether
 * service fees should use the STANDARD sale split at all is an OPEN
 * governance question (see docs/WW-OUTSTANDING-TASKS.md, "Interpretation
 * calls" → IC-2) — not a directors' decision. STANDARD is the working
 * default only so the tool functions; do not cite it as settled policy
 * for service work.
 */
export const DEFAULT_REVENUE_MODEL: RevenueModelKey = 'STANDARD';

// Guard: STANDARD must remain a creator-majority split, or every implied
// hourly rate this tool shows would be wrong in the reassuring direction.
if (STANDARD.maker < 50) {
  throw new Error(
    `marginBandingConfig: revenueModels STANDARD.maker is ${STANDARD.maker}, expected >= 50. ` +
    'The margin-banding tool assumes the creator keeps the majority share.'
  );
}

// ─── Per-tier suggested time value (Section 7 — suggestion only) ──────────────

/**
 * Badge levels, using the capitalised form from
 * src/accreditation/badge-system/progression-map.ts as canonical.
 *
 * NOTE (2026-09-02): src/accreditation/badge-system/badge-definitions.ts
 * declares the same concept lower-case (`BadgeLevel = 'explorer' | ...`).
 * That mismatch is logged in docs/WW-OUTSTANDING-TASKS.md and is NOT
 * fixed here — callers passing a lower-case value should run it through
 * `normalizeTier()` first.
 */
export type CreatorTier = 'Explorer' | 'Builder' | 'Innovator' | 'Leader';

/**
 * A starting suggestion for "what is your time worth per hour", by tier.
 * The creator always overrides this — it only pre-fills the input.
 *
 * PLACEHOLDER VALUES — pending a directors' decision on whether/how tier
 * should scale suggested time value. The floor (Explorer) is the Real
 * Living Wage; the higher tiers are illustrative only and must not be
 * quoted as WW policy. Same status as SILK_STILETTOS_WALL_RENT.weeklyRate
 * in revenueModels.ts.
 */
export const TIER_TIME_VALUE_SUGGESTION_GBP: Record<CreatorTier, number> = {
  Explorer: REAL_LIVING_WAGE_LONDON.gbpPerHour, // 14.80 — the green threshold, as a floor
  Builder: 18,   // PLACEHOLDER
  Innovator: 24, // PLACEHOLDER
  Leader: 32,    // PLACEHOLDER
};

/** Accepts either casing (or anything else) and returns a CreatorTier or null. */
export function normalizeTier(input: string | null | undefined): CreatorTier | null {
  if (!input) return null;
  const canonical = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  return canonical in TIER_TIME_VALUE_SUGGESTION_GBP ? (canonical as CreatorTier) : null;
}

export function suggestedTimeValueFor(tier: string | null | undefined): number | null {
  const t = normalizeTier(tier);
  return t ? TIER_TIME_VALUE_SUGGESTION_GBP[t] : null;
}
