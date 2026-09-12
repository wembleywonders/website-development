/**
 * Creator Margin Banding — engine
 * Wembley Wonders CIC
 *
 * WW-SPEC-CREATOR-MARGIN-BANDING-001, Sections 3 & 4.
 *
 * Constitutional clause (Section 0): advisory only. Nothing here sets a
 * price, approves a listing, releases a payment, or issues a quota. Every
 * function takes the creator's own numbers and hands back arithmetic
 * about their own time. The creator decides.
 *
 * Framing rule: results are a mirror ("here's what 40 sales at this price
 * would mean for your time"), never a target ("you need to make 40").
 * Keep that in mind wherever these outputs are rendered.
 *
 * The one rule that must never be skipped (Section 3): the creator
 * receives their share of the sale price, NOT 100% of it. Every implied
 * hourly rate below applies `creatorShareFraction()` first. Skip it and
 * the tool tells creators they earn ~1.8x what they actually do.
 */

import {
  bandFor,
  creatorShareFraction,
  BOUNDARY_RATES,
  DEFAULT_REVENUE_MODEL,
  type RagBand,
  type RagResult,
  type RevenueModelKey,
} from './marginBandingConfig';

// ─── Shared types ────────────────────────────────────────────────────────────

export type CalculationMode = 'volume' | 'commission' | 'break-even-ip' | 'time-billed';

export const CALCULATION_MODE_LABELS: Record<CalculationMode, string> = {
  'volume': 'Repeatable production',
  'commission': 'Bespoke / one-off jobs',
  'break-even-ip': 'Reproducible creative work',
  'time-billed': 'Service work',
};

/** Weeks per month, for commission-mode capacity. 52 / 12. */
const WEEKS_PER_MONTH = 52 / 12;

interface BandedRate {
  impliedHourlyGbp: number;
  rag: RagResult;
}

function bandedRate(impliedHourlyGbp: number): BandedRate {
  return { impliedHourlyGbp, rag: bandFor(impliedHourlyGbp) };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ─── 4.1 Volume mode — repeatable production ─────────────────────────────────

export interface VolumeInput {
  /** £ the buyer pays per unit */
  priceGbp: number;
  /** £ of materials consumed per unit */
  materialsCostPerUnitGbp: number;
  /** Hours of the creator's time per unit */
  hoursPerUnit: number;
  revenueModelKey?: RevenueModelKey;
}

export interface VolumeResult {
  mode: 'volume';
  /** price × creator share */
  creatorTakePerUnitGbp: number;
  /** creator take minus materials — what an hour of the work actually returns */
  netTakePerUnitGbp: number;
  impliedHourlyGbp: number;
  rag: RagResult;
  /** Whether materials cost exceeds the creator's take (net take is negative) */
  materialsExceedTake: boolean;
}

export function calcVolume(input: VolumeInput): VolumeResult {
  const share = creatorShareFraction(input.revenueModelKey ?? DEFAULT_REVENUE_MODEL);
  const creatorTakePerUnit = input.priceGbp * share;
  const netTakePerUnit = creatorTakePerUnit - input.materialsCostPerUnitGbp;
  const impliedHourly = input.hoursPerUnit > 0 ? netTakePerUnit / input.hoursPerUnit : 0;

  return {
    mode: 'volume',
    creatorTakePerUnitGbp: round2(creatorTakePerUnit),
    netTakePerUnitGbp: round2(netTakePerUnit),
    impliedHourlyGbp: round2(impliedHourly),
    rag: bandFor(impliedHourly),
    materialsExceedTake: netTakePerUnit < 0,
  };
}

export interface VolumeCurvePoint {
  priceGbp: number;
  impliedHourlyGbp: number;
  band: RagBand;
}

/**
 * The price→rate curve for the Volume-mode slider. Shows how the implied
 * hourly rate moves as the price moves, holding materials and hours fixed.
 */
export function volumeCurve(
  input: Omit<VolumeInput, 'priceGbp'>,
  fromGbp: number,
  toGbp: number,
  steps = 24,
): VolumeCurvePoint[] {
  if (toGbp <= fromGbp || steps < 1) return [];
  const points: VolumeCurvePoint[] = [];
  const stepSize = (toGbp - fromGbp) / steps;
  for (let i = 0; i <= steps; i++) {
    const priceGbp = round2(fromGbp + stepSize * i);
    const { impliedHourlyGbp, rag } = calcVolume({ ...input, priceGbp });
    points.push({ priceGbp, impliedHourlyGbp, band: rag.band });
  }
  return points;
}

// ─── 4.2 Commission mode — bespoke / one-off jobs ────────────────────────────

export interface CommissionInput {
  /** Total hours for THIS specific job (not an average) */
  jobHours: number;
  /** Materials cost for this job */
  jobMaterialsCostGbp: number;
  /** Price quoted for this job */
  jobPriceGbp: number;
  /** The creator's own ceiling on working hours per week — they set this, we don't */
  weeklyHoursCeiling: number;
  revenueModelKey?: RevenueModelKey;
}

export interface CommissionResult {
  mode: 'commission';
  jobCreatorTakeGbp: number;
  netJobTakeGbp: number;
  impliedHourlyGbp: number;
  rag: RagResult;
  materialsExceedTake: boolean;
  /**
   * How many jobs of this hour-count fit in a month under the creator's
   * own weekly-hours ceiling. A capacity figure, not a target.
   */
  feasibleJobsPerMonth: number | null;
}

export function calcCommission(input: CommissionInput): CommissionResult {
  const share = creatorShareFraction(input.revenueModelKey ?? DEFAULT_REVENUE_MODEL);
  const jobCreatorTake = input.jobPriceGbp * share;
  const netJobTake = jobCreatorTake - input.jobMaterialsCostGbp;
  const impliedHourly = input.jobHours > 0 ? netJobTake / input.jobHours : 0;

  const monthlyHourBudget = input.weeklyHoursCeiling * WEEKS_PER_MONTH;
  const feasibleJobsPerMonth =
    input.jobHours > 0 && input.weeklyHoursCeiling > 0
      ? Math.floor(monthlyHourBudget / input.jobHours)
      : null;

  return {
    mode: 'commission',
    jobCreatorTakeGbp: round2(jobCreatorTake),
    netJobTakeGbp: round2(netJobTake),
    impliedHourlyGbp: round2(impliedHourly),
    rag: bandFor(impliedHourly),
    materialsExceedTake: netJobTake < 0,
    feasibleJobsPerMonth,
  };
}

// ─── 4.3 Break-even-IP mode — reproducible creative / knowledge work ─────────

export interface BreakEvenIpInput {
  /** Hours to create the whole work (not per copy) */
  creationHours: number;
  /** Price per copy */
  pricePerCopyGbp: number;
  /**
   * Optional: the creator's own view of what an hour of their time is
   * worth. When present, adds a third break-even point alongside the two
   * statutory ones.
   */
  ownTimeValueGbp?: number;
  revenueModelKey?: RevenueModelKey;
}

export interface BreakEvenPoint {
  /** What this break-even is measured against */
  key: 'legalMinimum' | 'livingWage' | 'ownTimeValue';
  label: string;
  hourlyRateGbp: number;
  /** Copies to sell so creatorTakePerCopy × copies ≥ creationHours × hourlyRate */
  copies: number;
}

export interface BreakEvenIpResult {
  mode: 'break-even-ip';
  creatorTakePerCopyGbp: number;
  /** Total value of the creation time, at the living-wage rate */
  timeCostAtLivingWageGbp: number;
  breakEvenPoints: BreakEvenPoint[];
  /**
   * Copy at the point past the living-wage break-even, phrased as the
   * spec asks: every sale beyond it is margin beyond the time cost.
   */
  beyondGreenNote: string;
}

export function calcBreakEvenIp(input: BreakEvenIpInput): BreakEvenIpResult {
  const share = creatorShareFraction(input.revenueModelKey ?? DEFAULT_REVENUE_MODEL);
  const creatorTakePerCopy = input.pricePerCopyGbp * share;

  const copiesFor = (hourlyRateGbp: number): number => {
    if (creatorTakePerCopy <= 0 || input.creationHours <= 0) return 0;
    return Math.ceil((input.creationHours * hourlyRateGbp) / creatorTakePerCopy);
  };

  const points: BreakEvenPoint[] = [
    {
      key: 'legalMinimum',
      label: `Clears the UK minimum wage (£${BOUNDARY_RATES.legalMinimum.toFixed(2)}/hr)`,
      hourlyRateGbp: BOUNDARY_RATES.legalMinimum,
      copies: copiesFor(BOUNDARY_RATES.legalMinimum),
    },
    {
      key: 'livingWage',
      label: `Clears a London living wage (£${BOUNDARY_RATES.livingWage.toFixed(2)}/hr)`,
      hourlyRateGbp: BOUNDARY_RATES.livingWage,
      copies: copiesFor(BOUNDARY_RATES.livingWage),
    },
  ];

  if (typeof input.ownTimeValueGbp === 'number' && input.ownTimeValueGbp > 0) {
    points.push({
      key: 'ownTimeValue',
      label: `Clears your own rate (£${input.ownTimeValueGbp.toFixed(2)}/hr)`,
      hourlyRateGbp: input.ownTimeValueGbp,
      copies: copiesFor(input.ownTimeValueGbp),
    });
  }

  const greenCopies = copiesFor(BOUNDARY_RATES.livingWage);

  return {
    mode: 'break-even-ip',
    creatorTakePerCopyGbp: round2(creatorTakePerCopy),
    timeCostAtLivingWageGbp: round2(input.creationHours * BOUNDARY_RATES.livingWage),
    breakEvenPoints: points,
    beyondGreenNote:
      greenCopies > 0
        ? `Past ${greenCopies} ${greenCopies === 1 ? 'copy' : 'copies'}, the marginal cost of another sale is about £0, ` +
          'so every further copy is margin beyond the cost of your creation time.'
        : 'Enter a price and creation hours to see where your time cost is covered.',
  };
}

// ─── 4.4 Time-billed mode — service work ─────────────────────────────────────

export interface TimeBilledInput {
  /** The flat fee quoted for the job */
  flatFeeGbp: number;
  /** Estimated hours in the typical case */
  typicalHours: number;
  /** The creator's "bad case" hours estimate — troubleshooting, a bricked device, etc. */
  badCaseHours: number;
  revenueModelKey?: RevenueModelKey;
}

export interface TimeBilledResult {
  mode: 'time-billed';
  creatorTakeGbp: number;
  typical: BandedRate;
  badCase: BandedRate;
  /**
   * The whole point of this mode: the typical case looks fine but the
   * bad case drops below the legal minimum.
   */
  badCaseFallsToRedWhileTypicalIsNot: boolean;
}

export function calcTimeBilled(input: TimeBilledInput): TimeBilledResult {
  const share = creatorShareFraction(input.revenueModelKey ?? DEFAULT_REVENUE_MODEL);
  const creatorTake = input.flatFeeGbp * share;

  const typical = bandedRate(
    round2(input.typicalHours > 0 ? creatorTake / input.typicalHours : 0),
  );
  const badCase = bandedRate(
    round2(input.badCaseHours > 0 ? creatorTake / input.badCaseHours : 0),
  );

  return {
    mode: 'time-billed',
    creatorTakeGbp: round2(creatorTake),
    typical,
    badCase,
    badCaseFallsToRedWhileTypicalIsNot:
      badCase.rag.band === 'red' && typical.rag.band !== 'red',
  };
}
