/**
 * EarningsInstrument — Type Definitions
 * ======================================
 * "You came here rich. This is what rich looks like in numbers."
 *
 * The instrument reads actual ILP data and lets the creator model
 * their next move using sliders. Solomon annotates the gap.
 *
 * 55/25/20 split is live throughout — not a policy, a number.
 */

// ── Income stream taxonomy ─────────────────────────────────────────────────
// Derived from: journalStore repair data, creatorJourney.ts revenue model,
// programmes active on the platform.

export type StreamId =
  | 'repair-services'      // STEMgeneers — paid repair jobs
  | 'workshop-facilitation'// Any programme — facilitating sessions
  | 'tutorial-kit-sales'   // Cyberstore — kits linked to tutorials
  | 'music-releases'       // Trubble n Bass — track/EP sales/streams
  | 'content-creation'     // G-Tech Casters / Rayd-yo — podcast/broadcast
  | 'textile-sales'        // Silk Stilettos — garments/accessories
  | 'food-products'        // Auntie Anansi's Kitchen — heritage food
  | 'written-work'         // Pageturners / Joystick — writing income
  | 'mentoring'            // Any programme — peer mentoring fees
  | 'community-savings';   // Not earned income — savings generated (STEMgeneers)

export interface IncomeStream {
  id: StreamId;
  label: string;
  icon: string;
  programme: string;           // primary programme it belongs to
  rov: string;                 // primary ROV who owns it
  rovAvatar: string;
  rovColour: string;
  unit: string;                // "per job" | "per session" | "per sale" etc
  // Slider ranges
  rateMin: number;
  rateMax: number;
  rateStep: number;
  rateDefault: number;
  volumeMin: number;
  volumeMax: number;
  volumeStep: number;
  volumeDefault: number;       // per month
  // Whether this stream is currently active for the creator
  active: boolean;
}

// ── Current metrics (from ILP/journalStore) ────────────────────────────────

export interface CreatorCurrentMetrics {
  // From journalStore STEMgeneers stats
  totalSavingsGenerated: number;
  totalIncomeEarned: number;
  repairsLogged: number;
  // From ILP
  earningsTarget?: number;
  advanceBalance?: number;
  // Derived
  monthlyIncomeEstimate: number;  // based on recent activity
  activeStreamCount: number;
}

// ── Slider state per stream ────────────────────────────────────────────────

export interface StreamSliderState {
  streamId: StreamId;
  rate: number;       // £ per unit
  volume: number;     // units per month
  enabled: boolean;
}

// ── Projection output ──────────────────────────────────────────────────────

export interface EarningsProjection {
  grossMonthly: number;
  creatorShare: number;        // 55%
  communityShare: number;      // 25%
  platformShare: number;       // 20%
  annualCreator: number;
  annualCommunity: number;
  vsCurrentMonthly: number;    // delta from baseline
  monthsToTarget: number | null;
  // Per stream breakdown
  streams: Array<{
    streamId: StreamId;
    label: string;
    grossMonthly: number;
    creatorMonthly: number;
    pctOfTotal: number;
  }>;
}

// ── Solomon annotation ─────────────────────────────────────────────────────

export interface SolomonAnnotation {
  headline: string;       // "You're on track for £800/month by October"
  gap: string | null;     // "£400 short of your target"
  primaryAdvice: string;  // "One more repair job per week closes this"
  secondaryAdvice?: string;
  realism: 'conservative' | 'realistic' | 'ambitious';
}

// ── Pardner visualisation ──────────────────────────────────────────────────

export interface PardnerState {
  monthlyContribution: number;   // what the creator puts in (community 25%)
  currentPot: number;            // total community reserve (simulated)
  rotationMonth: number;         // when their hand comes around (months)
  handValue: number;             // lump sum they receive
  membersInCircle: number;
}

// ── Component props ────────────────────────────────────────────────────────

export interface EarningsInstrumentProps {
  creatorId: string;
  activeStreams: StreamId[];
  currentMetrics: CreatorCurrentMetrics;
  compact?: boolean;             // Your Panel widget mode vs full TECHreneurs mode
  initialTarget?: number;
}
