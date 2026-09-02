/**
 * revenueModels.ts — SINGLE SOURCE OF TRUTH for all revenue splits.
 *
 * The Equiano Principle in numbers: the creator keeps the lion's share,
 * the platform sustains itself, the community reserve grows.
 *
 * Rules:
 *  - No component, page, or service hardcodes a split percentage. Ever.
 *  - All splits are imported from this file by name.
 *  - Any change to these figures is a directors' decision (CJ and Judith),
 *    recorded before the code changes.
 *
 * NOTE: atelier.commission.settlement.enabled=false on the backend
 * (directors' decision). These figures are displayed for transparency;
 * settlement is not automated yet.
 *
 * REVISION: Added SILK_STILETTOS_WALL_RENT. This is a flat fee, not a
 * percentage split — it is deliberately NOT part of REVENUE_MODELS, so it
 * is never picked up by the sum-to-100 sanity check below. It covers
 * display-space rent only; ATELIER_COMMISSION / ATELIER_AUCTION still
 * apply on top of it for anything actually sold (Option C: layered, not
 * either/or). The weeklyRate is a PLACEHOLDER pending directors'
 * sign-off — do not treat it as a confirmed figure.
 *
 * REVISION (2026-09-02, CJ): STANDARD was { maker: 55, platform: 25,
 * community: 20 } — platform and community were reversed relative to
 * every WW-REVENUE-GOVERNANCE discussion and the board-level revenue
 * model, which fix the split at creator 55 / platform 20 / community 25.
 * Corrected here. See docs/WW-OUTSTANDING-TASKS.md ("revenueModels.ts
 * STANDARD split correction"). The two ATELIER_* splits were already
 * correct (platform 20 in both) and are unchanged. Values are integer
 * percentages, not decimals; consumers divide by 100.
 */

export interface RevenueSplit {
  /** Percentage retained by the maker/creator */
  maker: number;
  /** Percentage retained by the platform (Wembley Wonders CIC operations) */
  platform: number;
  /** Percentage directed to the community reserve */
  community: number;
}

/** Atelier commission sales — maker-first split */
export const ATELIER_COMMISSION: RevenueSplit = {
  maker: 75,
  platform: 20,
  community: 5,
};

/** Atelier auction sales */
export const ATELIER_AUCTION: RevenueSplit = {
  maker: 70,
  platform: 20,
  community: 10,
};

/** Standard platform split — the pardner-hand model: creator 55 / platform 20 / community 25 */
export const STANDARD: RevenueSplit = {
  maker: 55,
  platform: 20,
  community: 25,
};

/** All models by key, for iteration or lookup by string id */
export const REVENUE_MODELS = {
  ATELIER_COMMISSION,
  ATELIER_AUCTION,
  STANDARD,
} as const;

export type RevenueModelKey = keyof typeof REVENUE_MODELS;

/**
 * Flat-fee rental shape — structurally distinct from RevenueSplit.
 * A rent model has no maker/platform/community percentages to sum;
 * it's a standing charge for a display slot, independent of any sale.
 */
export interface WallRentModel {
  /** Fee per billing unit */
  weeklyRate: number;
  /** ISO 4217 currency code */
  currency: string;
  billingUnit: 'week';
  /** Matches canon: leave, and the spot's gone — no rolling grace period */
  vacatesOnNonPayment: boolean;
  notes: string;
}

/**
 * Silk Stilettos wall-space rent (Option C — layered model).
 *
 * weeklyRate is a PLACEHOLDER. It has NOT had directors' sign-off and
 * must not be treated as a real figure — confirm with Blake/finance and
 * record the decision here, per this file's own header rule, before
 * this ships to a live sandbox.
 */
export const SILK_STILETTOS_WALL_RENT: WallRentModel = {
  weeklyRate: 15, // PLACEHOLDER — pending directors' decision
  currency: 'GBP',
  billingUnit: 'week',
  vacatesOnNonPayment: true,
  notes:
    'Covers display space only. Commission on any sale off this wall is separate — see ATELIER_COMMISSION / ATELIER_AUCTION.',
};

/**
 * Runtime sanity check — every percentage split must total exactly 100.
 * Scoped to REVENUE_MODELS only: SILK_STILETTOS_WALL_RENT is a flat fee,
 * not a split, and is intentionally excluded from this registry so it's
 * never pulled into this check.
 */
Object.entries(REVENUE_MODELS).forEach(([name, split]) => {
  const total = split.maker + split.platform + split.community;
  if (total !== 100) {
    throw new Error(
      `revenueModels: ${name} sums to ${total}, expected 100. Fix before shipping.`
    );
  }
});