/**
 * roce.ts
 * Wembley Wonders CIC
 *
 * Return on Creative Effort — what a creator's work returned
 * per hour of their time.
 *
 * The metric that treats the creator's time as the scarce resource,
 * not the platform's algorithm.
 *
 * Formula: Total earnings ÷ Hours spent = £ per hour
 *
 * Place in: src/utils/revenue/roce.ts
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ROCEResult {
  earningsGBP: number;
  durationMinutes: number;
  durationHours: number;
  ratePerHour: number;
  label: string;               // "£17.00/hr"
  tier: ROCETier;              // for colour coding
}

export interface ListingMetrics {
  listingId: string;
  title: string;
  programmeSlug: string;
  sold: number;                // confirmed purchases
  earningsGBP: number;         // total received by creator (55%)
  saved: number;               // wishlisted but not purchased
  durationMinutes: number;     // from provenance/sandbox session
  roce: ROCEResult | null;
  savesToSalesGap: number;     // saved - sold — latent demand signal
  mayaInsight: string | null;  // contextual one-liner
}

export interface ImpactLabSummary {
  periodLabel: string;         // "This quarter" / "This month"
  totalSold: number;
  totalEarningsGBP: number;
  totalSaved: number;
  averageROCEPerHour: number | null;
  bestROCEListing: ListingMetrics | null;
  mostSavedListing: ListingMetrics | null;
  highestGapListing: ListingMetrics | null;  // biggest save-to-sale gap
  communityReserveContributedGBP: number;    // 25% of their sales
  listings: ListingMetrics[];
}

// ─── ROCE tiers — for display colour ─────────────────────────────────────────

export type ROCETier =
  | 'exceptional'   // top 10% of platform
  | 'strong'        // above platform average
  | 'developing'    // below platform average but positive
  | 'early';        // first few sales, insufficient data

// Platform average — update from real data as platform grows
const PLATFORM_AVERAGE_ROCE = 12.00;  // £12/hr starting benchmark

// ─── Core calculation ─────────────────────────────────────────────────────────

/**
 * Calculate ROCE for a single piece of work.
 * Returns null if duration is unknown — we never fabricate the number.
 */
export function calculateROCE(
  earningsGBP: number,
  durationMinutes: number | null | undefined
): ROCEResult | null {
  if (!durationMinutes || durationMinutes <= 0) return null;
  if (earningsGBP < 0) return null;

  const durationHours = durationMinutes / 60;
  const ratePerHour = earningsGBP / durationHours;

  return {
    earningsGBP,
    durationMinutes,
    durationHours: Math.round(durationHours * 10) / 10,
    ratePerHour: Math.round(ratePerHour * 100) / 100,
    label: formatROCELabel(ratePerHour),
    tier: classifyROCETier(ratePerHour, earningsGBP),
  };
}

function formatROCELabel(ratePerHour: number): string {
  return `£${ratePerHour.toFixed(2)}/hr`;
}

function classifyROCETier(
  ratePerHour: number,
  earningsGBP: number
): ROCETier {
  if (earningsGBP < 1) return 'early';
  if (ratePerHour >= PLATFORM_AVERAGE_ROCE * 2) return 'exceptional';
  if (ratePerHour >= PLATFORM_AVERAGE_ROCE) return 'strong';
  return 'developing';
}

// ─── Listing metrics builder ──────────────────────────────────────────────────

/**
 * Builds a complete ListingMetrics object from raw listing data.
 * Wire to: GET /api/store/listings/:id/metrics
 */
export function buildListingMetrics(raw: {
  listingId: string;
  title: string;
  programmeSlug: string;
  copiesSold: number;
  creatorEarningsGBP: number;  // actual 55% received
  savedCount: number;
  durationMinutes: number | null;
}): ListingMetrics {
  const roce = calculateROCE(raw.creatorEarningsGBP, raw.durationMinutes);
  const gap = Math.max(0, raw.savedCount - raw.copiesSold);

  return {
    listingId: raw.listingId,
    title: raw.title,
    programmeSlug: raw.programmeSlug,
    sold: raw.copiesSold,
    earningsGBP: raw.creatorEarningsGBP,
    saved: raw.savedCount,
    durationMinutes: raw.durationMinutes ?? 0,
    roce,
    savesToSalesGap: gap,
    mayaInsight: generateMayaInsight(roce, raw.copiesSold, raw.savedCount, gap),
  };
}

// ─── Maya insight generator ───────────────────────────────────────────────────

/**
 * Generates a single contextual insight line.
 * One sentence. No jargon. Actionable.
 */
export function generateMayaInsight(
  roce: ROCEResult | null,
  sold: number,
  saved: number,
  gap: number
): string | null {
  // Significant save-to-sale gap — pricing or description issue
  if (gap >= 5 && sold > 0 && gap > sold * 1.5) {
    return `${saved} people saved this but only ${sold} bought it. That gap usually means the price needs looking at, or the description isn't closing the sale.`;
  }

  // Exceptional ROCE
  if (roce?.tier === 'exceptional') {
    return `This is your most efficient work — ${roce.label} is well above the platform average. More like this.`;
  }

  // Strong ROCE
  if (roce?.tier === 'strong') {
    return `${roce.label} is above the platform average of £${PLATFORM_AVERAGE_ROCE.toFixed(2)}/hr. Solid return on your time.`;
  }

  // High saves, no sales yet
  if (saved >= 3 && sold === 0) {
    return `${saved} people have saved this. Consider whether the price is right to convert them.`;
  }

  // Good sales volume
  if (sold >= 10) {
    return `${sold} copies sold. This is one of your stronger sellers.`;
  }

  // Early stage
  if (sold === 0 && saved === 0) {
    return `Just listed. Give it time — or share it with your community.`;
  }

  return null;
}

// ─── Impact Lab summary builder ───────────────────────────────────────────────

/**
 * Aggregates all listing metrics into an Impact Lab summary.
 */
export function buildImpactLabSummary(
  listings: ListingMetrics[],
  periodLabel: string = 'This quarter'
): ImpactLabSummary {
  const totalSold = listings.reduce((sum, l) => sum + l.sold, 0);
  const totalEarningsGBP = listings.reduce((sum, l) => sum + l.earningsGBP, 0);
  const totalSaved = listings.reduce((sum, l) => sum + l.saved, 0);
  const communityReserveContributedGBP = totalEarningsGBP * (25 / 55); // reverse the 55% to get 25%

  // Average ROCE across listings that have it
  const roceListings = listings.filter(l => l.roce !== null);
  const averageROCEPerHour = roceListings.length > 0
    ? roceListings.reduce((sum, l) => sum + (l.roce?.ratePerHour ?? 0), 0) / roceListings.length
    : null;

  // Best performers
  const bestROCEListing = roceListings.length > 0
    ? roceListings.reduce((best, l) =>
        (l.roce?.ratePerHour ?? 0) > (best.roce?.ratePerHour ?? 0) ? l : best)
    : null;

  const mostSavedListing = listings.length > 0
    ? listings.reduce((best, l) => l.saved > best.saved ? l : best)
    : null;

  const highestGapListing = listings.length > 0
    ? listings.reduce((best, l) => l.savesToSalesGap > best.savesToSalesGap ? l : best)
    : null;

  return {
    periodLabel,
    totalSold,
    totalEarningsGBP,
    totalSaved,
    averageROCEPerHour: averageROCEPerHour
      ? Math.round(averageROCEPerHour * 100) / 100
      : null,
    bestROCEListing: bestROCEListing ?? null,
    mostSavedListing: (mostSavedListing?.saved ?? 0) > 0 ? mostSavedListing : null,
    highestGapListing: (highestGapListing?.savesToSalesGap ?? 0) >= 3
      ? highestGapListing
      : null,
    communityReserveContributedGBP:
      Math.round(communityReserveContributedGBP * 100) / 100,
    listings,
  };
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}hr ${mins}m` : `${hrs}hr`;
}