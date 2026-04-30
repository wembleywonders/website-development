// src/cyberstore/pricing/types/pricing.types.ts
//
// Wembley Wonders pricing architecture.
//
// Three modes. One principle: community pool is always 25%.
// The flex is between creator share and platform rate only.
//
// LIVE_AUCTION   55 / 25 / 20  — price discovery, limited runs
// BUY_NOW        60 / 25 / 15  — fixed price, regular stock
// COMMUNITY_PRICE 65 / 25 / 10 — accessible pricing, verified sellers
//
// Community pool = 25% in ALL modes. Non-negotiable.

// -------------------------------------------------------------------------
// Pricing mode
// -------------------------------------------------------------------------

export type PricingMode =
  | 'LIVE_AUCTION'
  | 'BUY_NOW'
  | 'COMMUNITY_PRICE';

/**
 * The revenue split for a given pricing mode.
 * Rates are stored as decimals: 0.55 = 55%.
 * creatorRate + communityPoolRate + platformRate must = 1.0 exactly.
 */
export interface RevenueSplit {
  mode: PricingMode;
  creatorRate: number;        // 0.55 | 0.60 | 0.65
  communityPoolRate: number;  // always 0.25
  platformRate: number;       // 0.20 | 0.15 | 0.10
}

export const REVENUE_SPLITS: Record<PricingMode, RevenueSplit> = {
  LIVE_AUCTION: {
    mode: 'LIVE_AUCTION',
    creatorRate: 0.55,
    communityPoolRate: 0.25,
    platformRate: 0.20,
  },
  BUY_NOW: {
    mode: 'BUY_NOW',
    creatorRate: 0.60,
    communityPoolRate: 0.25,
    platformRate: 0.15,
  },
  COMMUNITY_PRICE: {
    mode: 'COMMUNITY_PRICE',
    creatorRate: 0.65,
    communityPoolRate: 0.25,
    platformRate: 0.10,
  },
} as const;

// -------------------------------------------------------------------------
// Category pricing config (governance-set, not platform-set)
// -------------------------------------------------------------------------

/**
 * PricingCategoryConfig is set by Community Session vote.
 * The platform provides the mechanism; the community sets the parameters.
 *
 * communityPriceThreshold: maximum price (GBP) eligible for COMMUNITY_PRICE mode.
 * Set per category. Below this price + verified seller = Community Price eligible.
 *
 * Examples (illustrative — actual values set by governance):
 *   "caribbean-food-condiments":  threshold £8.00
 *   "west-african-food-condiments": threshold £8.00
 *   "fresh-produce":              threshold £5.00
 *   "handmade-clothing":          threshold £35.00
 *   "digital-music":              threshold £3.00
 */
export interface PricingCategoryConfig {
  categorySlug: string;
  categoryDisplayName: string;
  communityPriceThreshold: number;    // GBP — governance-set
  communityPriceEnabled: boolean;     // can be suspended by governance
  auctionEnabled: boolean;
  buyNowEnabled: boolean;
  minimumPrice: number;               // floor across all modes
  governanceSessionId: string | null; // session that set this config
  setAt: string;                      // ISO date
  setByMemberId: string;              // governance authority
  notes: string | null;               // governance rationale
}

// -------------------------------------------------------------------------
// Listing pricing config (per listing)
// -------------------------------------------------------------------------

/**
 * Each listing has an active pricing config that determines:
 * - Which modes are available (can offer both BUY_NOW + LIVE_AUCTION)
 * - Whether COMMUNITY_PRICE eligibility has been granted
 * - The prices for each active mode
 */
export interface ListingPricingConfig {
  listingId: string;
  categorySlug: string;
  sellerId: string;

  // Active modes for this listing
  activeModes: PricingMode[];

  // Prices per mode
  auctionStartPrice: number | null;     // LIVE_AUCTION start
  auctionReservePrice: number | null;   // LIVE_AUCTION reserve (optional)
  buyNowPrice: number | null;           // BUY_NOW fixed price
  communityPrice: number | null;        // COMMUNITY_PRICE fixed price

  // Community Price eligibility
  communityPriceEligible: boolean;
  communityPriceGrantedAt: string | null;
  communityPriceGrantedBy: string | null;  // governance or platform admin
  communityPriceEligibilityReason: CommunityPriceEligibilityReason | null;

  // Stock management
  stockCount: number | null;            // null = unlimited (digital goods)
  reserveStockForLiveAuction: number | null; // hold back N units for live show

  updatedAt: string;
}

export type CommunityPriceEligibilityReason =
  | 'easy_street_arc_completed'   // completed onboarding arc
  | 'seller_tenure_verified'      // 5+ years trading in Brent, verified
  | 'governance_granted'          // direct Community Session vote
  | 'provisional'                 // new seller, 3-month provisional period
  | 'not_eligible';               // does not meet criteria

// -------------------------------------------------------------------------
// Price calculation — what the buyer pays, what each party receives
// -------------------------------------------------------------------------

/**
 * PriceBreakdown is computed fresh on every transaction.
 * Never stored — always derived from sale price + mode split.
 * Shown to seller before listing, shown to buyer at checkout,
 * shown to the room during live auction.
 */
export interface PriceBreakdown {
  salePrice: number;
  mode: PricingMode;
  split: RevenueSplit;

  // What each party receives (rounded to 2dp)
  creatorAmount: number;       // salePrice × creatorRate
  communityPoolAmount: number; // salePrice × 0.25 (always)
  platformAmount: number;      // salePrice × platformRate

  // Platform viability check
  platformCoversTransactionCost: boolean;
  estimatedTransactionCost: number;   // Stripe fees estimate
  platformSurplus: number;            // platformAmount - transactionCost

  // For display
  modeLabel: string;
  communityPoolPercentage: 25;        // always 25, typed as literal
}

/**
 * Compute a price breakdown for a given sale price and mode.
 * Pure function — no side effects.
 */
export function computePriceBreakdown(
  salePrice: number,
  mode: PricingMode
): PriceBreakdown {
  const split = REVENUE_SPLITS[mode];
  const creatorAmount = round2dp(salePrice * split.creatorRate);
  const communityPoolAmount = round2dp(salePrice * split.communityPoolRate);
  // Platform gets the remainder to avoid rounding drift
  const platformAmount = round2dp(salePrice - creatorAmount - communityPoolAmount);

  // Stripe fee estimate: 1.5% + 20p for UK cards (approximate)
  const estimatedTransactionCost = round2dp(salePrice * 0.015 + 0.20);
  const platformSurplus = round2dp(platformAmount - estimatedTransactionCost);

  return {
    salePrice,
    mode,
    split,
    creatorAmount,
    communityPoolAmount,
    platformAmount,
    platformCoversTransactionCost: platformSurplus >= 0,
    estimatedTransactionCost,
    platformSurplus,
    modeLabel: modeLabelMap[mode],
    communityPoolPercentage: 25,
  };
}

/**
 * Find the best mode for a given price — used by the listing editor
 * to suggest the appropriate mode when a seller enters a price.
 */
export function suggestPricingMode(
  price: number,
  categoryConfig: PricingCategoryConfig,
  sellerEligibleForCommunityPrice: boolean
): PricingMode {
  const isBelowCommunityThreshold =
    price <= categoryConfig.communityPriceThreshold;

  if (
    sellerEligibleForCommunityPrice &&
    categoryConfig.communityPriceEnabled &&
    isBelowCommunityThreshold
  ) {
    return 'COMMUNITY_PRICE';
  }
  // For consumables/regular stock below £25 — suggest BUY_NOW
  if (price <= 25) return 'BUY_NOW';
  // For higher-value items — suggest LIVE_AUCTION
  return 'LIVE_AUCTION';
}

// -------------------------------------------------------------------------
// Revenue projection — for the 55 Calculator (Counting House)
// -------------------------------------------------------------------------

export interface RevenueProjection {
  unitPrice: number;
  mode: PricingMode;
  unitsPerMonth: number;
  breakdown: PriceBreakdown;

  // Monthly totals
  monthlyRevenue: number;           // unitPrice × unitsPerMonth
  monthlyCreatorIncome: number;     // creatorAmount × unitsPerMonth
  monthlyCommunityPool: number;     // communityPoolAmount × unitsPerMonth
  monthlyPlatformFee: number;       // platformAmount × unitsPerMonth

  // Comparison: what seller would net on mainstream platform
  // Assumes 20% creator share (TikTok/Instagram shop model)
  mainstreamCreatorIncome: number;  // unitPrice × 0.20 × unitsPerMonth
  incomeAdvantage: number;          // monthlyCreatorIncome - mainstreamCreatorIncome
  incomeAdvantagePercent: number;   // how much more the seller earns
}

export function computeRevenueProjection(
  unitPrice: number,
  mode: PricingMode,
  unitsPerMonth: number
): RevenueProjection {
  const breakdown = computePriceBreakdown(unitPrice, mode);
  const monthlyRevenue = round2dp(unitPrice * unitsPerMonth);
  const monthlyCreatorIncome = round2dp(breakdown.creatorAmount * unitsPerMonth);
  const monthlyCommunityPool = round2dp(breakdown.communityPoolAmount * unitsPerMonth);
  const monthlyPlatformFee = round2dp(breakdown.platformAmount * unitsPerMonth);
  const mainstreamCreatorIncome = round2dp(unitPrice * 0.20 * unitsPerMonth);
  const incomeAdvantage = round2dp(monthlyCreatorIncome - mainstreamCreatorIncome);
  const incomeAdvantagePercent = Math.round(
    (incomeAdvantage / mainstreamCreatorIncome) * 100
  );

  return {
    unitPrice,
    mode,
    unitsPerMonth,
    breakdown,
    monthlyRevenue,
    monthlyCreatorIncome,
    monthlyCommunityPool,
    monthlyPlatformFee,
    mainstreamCreatorIncome,
    incomeAdvantage,
    incomeAdvantagePercent,
  };
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function round2dp(n: number): number {
  return Math.round(n * 100) / 100;
}

const modeLabelMap: Record<PricingMode, string> = {
  LIVE_AUCTION: 'Live auction',
  BUY_NOW: 'Buy now',
  COMMUNITY_PRICE: 'Community price',
};