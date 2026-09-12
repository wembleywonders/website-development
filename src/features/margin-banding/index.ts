/**
 * Creator Margin Banding — public surface
 * WW-SPEC-CREATOR-MARGIN-BANDING-001
 *
 * Advisory only (Section 0): shows arithmetic about the creator's own
 * inputs, never sets a price or approves anything.
 */

export {
  MarginBandingCalculator,
  default,
  type MarginBandingCalculatorProps,
} from './MarginBandingCalculator';

export {
  calcVolume,
  calcCommission,
  calcBreakEvenIp,
  calcTimeBilled,
  volumeCurve,
  CALCULATION_MODE_LABELS,
  type CalculationMode,
  type VolumeInput,
  type VolumeResult,
  type CommissionInput,
  type CommissionResult,
  type BreakEvenIpInput,
  type BreakEvenIpResult,
  type TimeBilledInput,
  type TimeBilledResult,
} from './MarginBandingEngine';

export {
  bandFor,
  creatorShareFraction,
  suggestedTimeValueFor,
  normalizeTier,
  NATIONAL_LIVING_WAGE,
  REAL_LIVING_WAGE_LONDON,
  BOUNDARY_RATES,
  TIER_TIME_VALUE_SUGGESTION_GBP,
  type RagBand,
  type RagResult,
  type CreatorTier,
} from './marginBandingConfig';
