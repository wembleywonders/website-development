/**
 * Cultivation Pardner Engine
 * Wembley Wonders CIC
 *
 * The Pardner is funded by the community reserve — the 25% that every
 * transaction on this platform sets aside for the community itself.
 * It exists because good work takes time to find its audience.
 *
 * Named after the Caribbean Pardner/Sou-Sou tradition: mutual, trust-based,
 * dignified. Not charity. Community.
 *
 * Integration points:
 *   - CreatorEarnings: from retail/creator-economy/creator-system.js
 *   - CommunityReserve: from types/financials.ts (ReserveBalance)
 *   - PaymentDispatch: from utils/payments/ (your existing payment utils)
 *   - GovernanceVote: from value-exchange-system/governance/CommunityVoting.jsx
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/** Monthly earnings below this trigger Pardner eligibility assessment */
export const PARDNER_FLOOR_THRESHOLD_GBP = 150;

/** Quarterly top-up payment — enough to cover costs, not enough to reward passivity */
export const PARDNER_PAYMENT_AMOUNT_GBP = 87.50; // £350/year if all 4 quarters awarded

/** Maximum consecutive quarters a creator can receive Pardner support */
export const PARDNER_MAX_QUARTERS = 3;

/** Minimum content posts required in a quarter to be eligible */
export const PARDNER_MIN_POSTS_PER_QUARTER = 6;

/** Minimum community engagement actions required (comments, collabs, events) */
export const PARDNER_MIN_ENGAGEMENT_ACTIONS = 4;

/** Percentage of community reserve ring-fenced for Pardner payments */
export const RESERVE_PARDNER_ALLOCATION_PERCENT = 0.15; // 15% of the 25% reserve

// ─── Types ────────────────────────────────────────────────────────────────────

export type PardnerStatus =
  | 'NOT_ELIGIBLE'      // Does not meet activity criteria
  | 'ELIGIBLE'          // Meets criteria, awaiting Stewards Council assessment
  | 'APPROVED'          // Council approved, payment queued
  | 'ACTIVE'            // Currently receiving Pardner support
  | 'REVIEW_DUE'        // Approaching max quarters — structured review triggered
  | 'GRADUATED'         // Exceeded floor threshold — no longer needs support
  | 'COMPLETED'         // Reached max quarters, review completed, no longer active
  | 'SUSPENDED';        // Eligibility criteria no longer met mid-quarter

export type PardnerQuarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface QuarterlyEarnings {
  year: number;
  quarter: PardnerQuarter;
  totalEarningsGBP: number;
  monthlyBreakdown: [number, number, number]; // [month1, month2, month3]
  averageMonthlyGBP: number;
}

export interface CreatorActivityRecord {
  creatorId: string;
  year: number;
  quarter: PardnerQuarter;
  postsPublished: number;
  communityEngagementActions: number; // comments left, collabs joined, events attended
  programmeParticipation: string[];   // which of the 13 programmes they engaged with
  lastActiveDate: Date;
}

export interface PardnerRecord {
  creatorId: string;
  status: PardnerStatus;
  quartersReceived: number;           // running total, resets if they graduate then return
  quartersHistory: PardnerQuarterRecord[];
  currentQuarterAssessment?: PardnerAssessment;
  reviewScheduledDate?: Date;         // set when REVIEW_DUE triggered
  graduatedDate?: Date;               // when they crossed the threshold
  totalReceivedGBP: number;           // lifetime Pardner receipts
  createdAt: Date;
  updatedAt: Date;
}

export interface PardnerQuarterRecord {
  year: number;
  quarter: PardnerQuarter;
  status: 'APPROVED' | 'DECLINED' | 'SUSPENDED' | 'GRADUATED';
  amountPaidGBP: number;
  earningsAtAssessment: number;
  activityScore: number;              // 0–100 composite
  stewardsVoteId?: string;            // reference to GovernanceVote record
  notes?: string;                     // Stewards Council rationale (published)
  paymentDate?: Date;
}

export interface PardnerAssessment {
  creatorId: string;
  assessmentDate: Date;
  year: number;
  quarter: PardnerQuarter;

  // Earnings check
  averageMonthlyEarningsGBP: number;
  belowFloorThreshold: boolean;

  // Activity checks
  postsPublished: number;
  meetsPostMinimum: boolean;
  communityEngagementActions: number;
  meetsEngagementMinimum: boolean;

  // Composite eligibility
  activityScore: number;              // 0–100
  isEligible: boolean;
  ineligibilityReasons: string[];

  // Reserve check
  reserveBalanceGBP: number;
  reservePardnerAllocationGBP: number;
  reserveCanFundPayment: boolean;

  // Quarter limit check
  quartersAlreadyReceived: number;
  isApproachingLimit: boolean;        // true at quarter 2
  hasReachedLimit: boolean;           // true at quarter 3+

  // Recommended action
  recommendation: 'APPROVE' | 'DECLINE' | 'REVIEW' | 'GRADUATE';
  recommendationRationale: string;
}

export interface PardnerReserveSnapshot {
  totalReserveGBP: number;
  pardnerAllocationGBP: number;       // 15% of reserve
  committedThisQuarterGBP: number;    // approved but not yet paid
  availableForNewPaymentsGBP: number;
  estimatedCreatorsEligibleThisQuarter: number;
  canSupportAllEligible: boolean;
  snapshotDate: Date;
}

export interface PardnerPaymentInstruction {
  creatorId: string;
  amountGBP: number;
  quarter: PardnerQuarter;
  year: number;
  reserveDebitReference: string;      // audit trail back to reserve
  paymentMethod: 'STRIPE_CONNECT' | 'BANK_TRANSFER' | 'OPENCREDIT';
  scheduledDate: Date;
  status: 'QUEUED' | 'PROCESSING' | 'PAID' | 'FAILED';
}

// ─── Core Engine Functions ────────────────────────────────────────────────────

/**
 * Calculates a creator's activity score (0–100).
 * Weighted: content output (60%) + community engagement (40%)
 */
export function calculateActivityScore(activity: CreatorActivityRecord): number {
  const postScore = Math.min(
    (activity.postsPublished / PARDNER_MIN_POSTS_PER_QUARTER) * 60,
    60
  );

  const engagementScore = Math.min(
    (activity.communityEngagementActions / PARDNER_MIN_ENGAGEMENT_ACTIONS) * 40,
    40
  );

  return Math.round(postScore + engagementScore);
}

/**
 * Determines whether a creator is eligible for Pardner assessment.
 * Eligibility ≠ approval — approval requires Stewards Council vote.
 */
export function assessEligibility(
  earnings: QuarterlyEarnings,
  activity: CreatorActivityRecord,
  record: PardnerRecord,
  reserveSnapshot: PardnerReserveSnapshot
): PardnerAssessment {
  const ineligibilityReasons: string[] = [];

  // 1. Earnings check
  const belowFloorThreshold =
    earnings.averageMonthlyGBP < PARDNER_FLOOR_THRESHOLD_GBP;
  if (!belowFloorThreshold) {
    ineligibilityReasons.push(
      `Average monthly earnings (£${earnings.averageMonthlyGBP.toFixed(2)}) exceed the floor threshold of £${PARDNER_FLOOR_THRESHOLD_GBP}`
    );
  }

  // 2. Activity checks
  const meetsPostMinimum = activity.postsPublished >= PARDNER_MIN_POSTS_PER_QUARTER;
  if (!meetsPostMinimum) {
    ineligibilityReasons.push(
      `${activity.postsPublished} posts published this quarter — minimum is ${PARDNER_MIN_POSTS_PER_QUARTER}`
    );
  }

  const meetsEngagementMinimum =
    activity.communityEngagementActions >= PARDNER_MIN_ENGAGEMENT_ACTIONS;
  if (!meetsEngagementMinimum) {
    ineligibilityReasons.push(
      `${activity.communityEngagementActions} community engagements this quarter — minimum is ${PARDNER_MIN_ENGAGEMENT_ACTIONS}`
    );
  }

  // 3. Quarter limit check
  const quartersAlreadyReceived = record.quartersReceived;
  const hasReachedLimit = quartersAlreadyReceived >= PARDNER_MAX_QUARTERS;
  const isApproachingLimit = quartersAlreadyReceived === PARDNER_MAX_QUARTERS - 1;

  if (hasReachedLimit) {
    ineligibilityReasons.push(
      `Maximum ${PARDNER_MAX_QUARTERS} quarters of Pardner support reached — structured review required`
    );
  }

  // 4. Reserve check
  const reserveCanFundPayment =
    reserveSnapshot.availableForNewPaymentsGBP >= PARDNER_PAYMENT_AMOUNT_GBP;
  if (!reserveCanFundPayment) {
    ineligibilityReasons.push(
      `Community reserve Pardner allocation insufficient this quarter (£${reserveSnapshot.availableForNewPaymentsGBP.toFixed(2)} available)`
    );
  }

  // 5. Composite
  const activityScore = calculateActivityScore(activity);
  const isEligible =
    belowFloorThreshold &&
    meetsPostMinimum &&
    meetsEngagementMinimum &&
    !hasReachedLimit &&
    reserveCanFundPayment;

  // 6. Recommendation
  let recommendation: PardnerAssessment['recommendation'];
  let recommendationRationale: string;

  if (!belowFloorThreshold) {
    recommendation = 'GRADUATE';
    recommendationRationale = `Creator earnings have crossed the viability threshold. Pardner support is no longer needed — this is the outcome the Pardner exists to create.`;
  } else if (hasReachedLimit) {
    recommendation = 'REVIEW';
    recommendationRationale = `Three quarters of Pardner support received. A structured conversation about next steps is warranted — not a judgment, a plan.`;
  } else if (isEligible) {
    recommendation = 'APPROVE';
    recommendationRationale = `Creator meets all eligibility criteria. Activity score: ${activityScore}/100. Recommend approval for Stewards Council vote.`;
  } else {
    recommendation = 'DECLINE';
    recommendationRationale = `Creator does not meet eligibility criteria this quarter. Reasons: ${ineligibilityReasons.join('; ')}.`;
  }

  return {
    creatorId: activity.creatorId,
    assessmentDate: new Date(),
    year: earnings.year,
    quarter: earnings.quarter,
    averageMonthlyEarningsGBP: earnings.averageMonthlyGBP,
    belowFloorThreshold,
    postsPublished: activity.postsPublished,
    meetsPostMinimum,
    communityEngagementActions: activity.communityEngagementActions,
    meetsEngagementMinimum,
    activityScore,
    isEligible,
    ineligibilityReasons,
    reserveBalanceGBP: reserveSnapshot.totalReserveGBP,
    reservePardnerAllocationGBP: reserveSnapshot.pardnerAllocationGBP,
    reserveCanFundPayment,
    quartersAlreadyReceived,
    isApproachingLimit,
    hasReachedLimit,
    recommendation,
    recommendationRationale,
  };
}

/**
 * Calculates the reserve's Pardner allocation and capacity
 * for the current quarter.
 *
 * Wire to: types/financials.ts ReserveBalance
 */
export function calculateReserveSnapshot(
  totalReserveGBP: number,
  alreadyApprovedThisQuarterGBP: number,
  estimatedEligibleCreators: number
): PardnerReserveSnapshot {
  const pardnerAllocationGBP = totalReserveGBP * RESERVE_PARDNER_ALLOCATION_PERCENT;
  const availableForNewPaymentsGBP = Math.max(
    0,
    pardnerAllocationGBP - alreadyApprovedThisQuarterGBP
  );
  const maxCreatorsThisQuarter = Math.floor(
    availableForNewPaymentsGBP / PARDNER_PAYMENT_AMOUNT_GBP
  );

  return {
    totalReserveGBP,
    pardnerAllocationGBP,
    committedThisQuarterGBP: alreadyApprovedThisQuarterGBP,
    availableForNewPaymentsGBP,
    estimatedCreatorsEligibleThisQuarter: estimatedEligibleCreators,
    canSupportAllEligible: maxCreatorsThisQuarter >= estimatedEligibleCreators,
    snapshotDate: new Date(),
  };
}

/**
 * Builds a payment instruction after Stewards Council approval.
 * Wire to: utils/payments/ for dispatch to Stripe Connect or GoCardless.
 */
export function buildPaymentInstruction(
  creatorId: string,
  assessment: PardnerAssessment,
  preferredMethod: PardnerPaymentInstruction['paymentMethod'] = 'STRIPE_CONNECT'
): PardnerPaymentInstruction {
  const reserveDebitReference = [
    'PARDNER',
    assessment.year,
    assessment.quarter,
    creatorId.slice(0, 8).toUpperCase(),
    Date.now().toString(36).toUpperCase(),
  ].join('-');

  // Schedule 5 working days from now — allows Stewards to see before dispatch
  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + 7);

  return {
    creatorId,
    amountGBP: PARDNER_PAYMENT_AMOUNT_GBP,
    quarter: assessment.quarter,
    year: assessment.year,
    reserveDebitReference,
    paymentMethod: preferredMethod,
    scheduledDate,
    status: 'QUEUED',
  };
}

/**
 * Determines the updated PardnerStatus after a Stewards Council decision.
 */
export function applyCouncilDecision(
  record: PardnerRecord,
  decision: 'APPROVED' | 'DECLINED',
  assessment: PardnerAssessment
): Partial<PardnerRecord> {
  if (decision === 'APPROVED') {
    const newQuartersReceived = record.quartersReceived + 1;
    return {
      status: newQuartersReceived >= PARDNER_MAX_QUARTERS ? 'REVIEW_DUE' : 'ACTIVE',
      quartersReceived: newQuartersReceived,
      reviewScheduledDate:
        newQuartersReceived >= PARDNER_MAX_QUARTERS
          ? (() => {
              const d = new Date();
              d.setDate(d.getDate() + 14);
              return d;
            })()
          : undefined,
      updatedAt: new Date(),
    };
  }

  return {
    status: assessment.recommendation === 'GRADUATE' ? 'GRADUATED' : 'NOT_ELIGIBLE',
    graduatedDate: assessment.recommendation === 'GRADUATE' ? new Date() : undefined,
    updatedAt: new Date(),
  };
}

/**
 * Human-readable status label for UI display.
 * Deliberately warm — no bureaucratic language.
 */
export function getPardnerStatusLabel(status: PardnerStatus): string {
  const labels: Record<PardnerStatus, string> = {
    NOT_ELIGIBLE:  'Not currently eligible',
    ELIGIBLE:      'Being assessed',
    APPROVED:      'Approved — payment on its way',
    ACTIVE:        'Cultivation Pardner active',
    REVIEW_DUE:    'Review conversation due',
    GRADUATED:     'Graduated — above the floor',
    COMPLETED:     'Pardner journey complete',
    SUSPENDED:     'Paused this quarter',
  };
  return labels[status];
}

/**
 * Returns the quarter label for the current date.
 */
export function getCurrentQuarter(): { quarter: PardnerQuarter; year: number } {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();
  if (month < 3) return { quarter: 'Q1', year };
  if (month < 6) return { quarter: 'Q2', year };
  if (month < 9) return { quarter: 'Q3', year };
  return { quarter: 'Q4', year };
}

/**
 * Formats a GBP amount for display.
 */
export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
}