/**
 * ============================================================================
 * WEMBLEY WONDERS — SAFEGUARDING FOCUS LAYER
 * ============================================================================
 * Source of record: WW-SPEC-SAFEGUARDING-STRATEGY-001.md
 *
 * Every ROV — whichever system it belongs to (the 12 Children of Anansi
 * identity layer, or the functional-capability layer) — imports its
 * safeguarding posture from THIS file, so the principles, categories, and
 * escalation contract live in exactly one place rather than being
 * re-implemented per ROV.
 *
 * LOCATION: src/safeguarding/SafeguardingFocus.ts — confirmed against the
 * live repo (2026-08-21). This is a cross-cutting concern, not a
 * ROVId-scoped one — it does NOT extend ROVCapabilities.ts's ROVId union
 * (marketing-coach/finance-guide/etc.) or the Children-of-Anansi registry.
 * Any ROV, regardless of which of those two systems it belongs to, imports
 * from here directly.
 *
 * WHAT THIS FILE IS: types, constants, and pure functions — the shared
 * "what to notice and how to respond" contract.
 * WHAT THIS FILE IS NOT: a backend client, a persistence layer, or a
 * notification system. Pattern-tracking storage and DSL routing/alerting
 * are honestly stubbed below (see STUBBED markers) pending the real
 * backend work flagged in WW-SPEC-SAFEGUARDING-STRATEGY-001.md's open
 * action items — faking success here would be worse than stubbing it.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// Risk categories (Section 10 of the spec)
// ---------------------------------------------------------------------------

export type RiskCategory =
  | 'fame-based'          // public platform confers presumed trustworthiness
  | 'institution-based'   // a trusted structure IS the access route
  | 'inherited-status'    // access/impunity rides on a parent's/mentor's standing
  | 'backstage-access'    // physical/logistics access, zero public reputation at stake
  | 'consequence-transfer'; // deniability engineered in advance, blame pre-positioned elsewhere

export interface RiskCategoryDefinition {
  id: RiskCategory;
  label: string;
  mechanism: string;
  /** True if this category has NO public-exposure deterrent at all (not even a delayed/theoretical one) */
  zeroPublicDeterrence: boolean;
}

export const RISK_CATEGORIES: Record<RiskCategory, RiskCategoryDefinition> = {
  'fame-based': {
    id: 'fame-based',
    label: 'Fame-based access',
    mechanism: 'Public platform confers presumed trustworthiness ("they\'d never").',
    zeroPublicDeterrence: false,
  },
  'institution-based': {
    id: 'institution-based',
    label: 'Institution-based access',
    mechanism: 'A trusted structure (mentorship, authority, broadcaster) IS the access route itself.',
    zeroPublicDeterrence: false,
  },
  'inherited-status': {
    id: 'inherited-status',
    label: 'Inherited/conferred status',
    mechanism: 'Access and impunity ride on a parent\'s or mentor\'s standing, not anything the person themselves earned.',
    zeroPublicDeterrence: false,
  },
  'backstage-access': {
    id: 'backstage-access',
    label: 'Backstage/logistics access',
    mechanism: 'Physical or logistical access plus informal authority over someone junior, with no public reputation at stake.',
    zeroPublicDeterrence: true,
  },
  'consequence-transfer': {
    id: 'consequence-transfer',
    label: 'Consequence transfer',
    mechanism: 'A transgression is planned with deniability engineered in advance so a less powerful collaborator absorbs the cost.',
    zeroPublicDeterrence: false,
  },
};

// ---------------------------------------------------------------------------
// Root-condition lenses (Section 9 of the spec) — informs content curation
// and what a ROV is trained to notice, distinct from the risk categories
// above (which describe access mechanisms, not root causes)
// ---------------------------------------------------------------------------

export type RootConditionLens =
  | 'cultural-conditioning'
  | 'codes-of-silence'
  | 'attitude-and-example'
  | 'discontent-with-lot';

export const ROOT_CONDITION_LENSES: Record<RootConditionLens, string> = {
  'cultural-conditioning':
    'Does this content model domination as aspirational, regardless of whether its individual claims pass sourcing? (Proposed fifth lens for the source-vetting rubric, alongside the existing four constitutional tests.)',
  'codes-of-silence':
    'Would raising this concern here survive social/status pressure from someone senior, or does the reporting path quietly favour institutional protection over the person raising it?',
  'attitude-and-example':
    'Is this figure/curator being held up as exemplary on the strength of craft alone, with no equivalent scrutiny of relational conduct?',
  'discontent-with-lot':
    'Is there a legitimate, WW-native outlet for grievance/status-seeking here, or does the gap risk being filled by an external source that offers belonging without the same values attached?',
};

// ---------------------------------------------------------------------------
// Trust-scaled scrutiny (Section 3) — visibility requirement scales UP with
// trust/access level, inverting the normal "ease off once established" instinct
// ---------------------------------------------------------------------------

export type MentorTrustLevel = 'new' | 'established' | 'senior' | 'founder-level';

export interface ScrutinyRequirement {
  recordedSessionsRequired: boolean;
  loggedOneToOneContact: boolean;
  independentReviewRequired: boolean; // Section 2: review must not be structurally dependent on the person reviewed
  notes: string;
}

/**
 * Pure function — no side effects, no backend call. Given a mentor's
 * trust/access level, returns the MINIMUM scrutiny posture required.
 * A ROV or Guardian tool can call this directly; it does not read or write
 * any real session/contact data itself (see STUBBED section below for that).
 */
export function scrutinyRequirementFor(trustLevel: MentorTrustLevel): ScrutinyRequirement {
  switch (trustLevel) {
    case 'new':
      return {
        recordedSessionsRequired: true,
        loggedOneToOneContact: true,
        independentReviewRequired: false,
        notes: 'Baseline scrutiny for any new mentor relationship.',
      };
    case 'established':
    case 'senior':
      return {
        recordedSessionsRequired: true,
        loggedOneToOneContact: true,
        independentReviewRequired: true,
        notes: 'Scrutiny INCREASES with trust, not decreases — established/senior mentors get MORE structural visibility, not less.',
      };
    case 'founder-level':
      return {
        recordedSessionsRequired: true,
        loggedOneToOneContact: true,
        independentReviewRequired: true,
        notes: 'No figure at WW, however senior or founding, sits permanently outside review (Section 2). Review must route to someone not structurally dependent on this person.',
      };
  }
}

// ---------------------------------------------------------------------------
// Confidentiality-with-override (Section 6) — the ROV/tutor sensing channel
// ---------------------------------------------------------------------------

/** The exact member-facing disclosure. Stated upfront, never covert. */
export const CONFIDENTIALITY_DISCLOSURE_TEXT =
  "What you tell me stays between us — except where it touches on someone's safety. Then I have a duty to pass it up.";

export type EscalationSeverity = 'none' | 'monitor' | 'escalate-to-dsl';

export interface EscalationDecision {
  severity: EscalationSeverity;
  reason: string;
  /** True if this is a single incident (data, not verdict) vs. a repeated pattern */
  isPattern: boolean;
}

/**
 * Pure decision-shape helper — pattern-vs-incident logic (Section 4).
 * Deliberately does NOT decide "is this concerning" on its own; that
 * judgement belongs to the tutor/ROV/DSL, not to this function. What it
 * enforces is the STRUCTURE of the decision: one incident is never
 * auto-escalated on its own; repetition is what triggers escalate-to-dsl.
 *
 * incidentCount: number of similar flagged moments for this
 * member/relationship pair, as counted by whatever pattern-tracking store
 * eventually gets built (see STUBBED section).
 */
export function classifyEscalation(incidentCount: number, thresholdForPattern = 3): EscalationDecision {
  if (incidentCount <= 0) {
    return { severity: 'none', reason: 'No flagged incidents.', isPattern: false };
  }
  if (incidentCount < thresholdForPattern) {
    return {
      severity: 'monitor',
      reason: 'Single or low-count incident — data, not a verdict. Correct at the small scale in the moment; do not escalate yet.',
      isPattern: false,
    };
  }
  return {
    severity: 'escalate-to-dsl',
    reason: `Pattern threshold reached (${incidentCount} flagged incidents) — route to DSL/deputy pair per Section 1. Never actioned unilaterally by the tutor/ROV.`,
    isPattern: true,
  };
}

// ---------------------------------------------------------------------------
// Deterrence-scale design conclusion (Section 11), expressed as a constant
// any ROV's messaging/coaching copy can pull from directly, so the principle
// stays consistent wherever it surfaces in the UI
// ---------------------------------------------------------------------------

export const DETERRENCE_PRINCIPLE =
  'Certainty of a small, immediate correction beats severity of a distant, hypothetical one. Correct small and early — do not save it up.';

// ---------------------------------------------------------------------------
// Progressive reapplication tiers (Section 13)
//
// Named SafeguardingBadgeTier (not BadgeTier) — src/types/creatorJourney.ts
// already exports a BadgeTier with a different value set ('participant' |
// 'practitioner' | 'mentor'). Same bare name, unrelated meaning; keeping
// this one distinct avoids an aliased import wherever a ROV needs both.
// ---------------------------------------------------------------------------

export type SafeguardingBadgeTier = 'bright-sparks' | 'explorer' | 'builder' | 'innovator' | 'leader';

export interface TierSafeguardingPosture {
  badgeGated: boolean;
  focus: string;
}

export const TIER_SAFEGUARDING_POSTURE: Record<SafeguardingBadgeTier, TierSafeguardingPosture> = {
  'bright-sparks': {
    badgeGated: false,
    focus: 'Awareness-level only. Does not assume a shared starting line — teach, do not presume.',
  },
  explorer: {
    badgeGated: true,
    focus: 'Personal conduct — reliability, how the member treats collaborators, what they post about others.',
  },
  builder: {
    badgeGated: true,
    focus: 'Personal conduct — reliability, how the member treats collaborators, what they post about others.',
  },
  innovator: {
    badgeGated: true,
    focus: 'Public-facing conduct — the member is now shipping visible work; audience-facing behaviour starts to matter.',
  },
  leader: {
    badgeGated: true,
    focus: 'Full structural weight. Real visibility/power asymmetry. Guardian + Elder sign-off gates already sit here.',
  },
};

// ---------------------------------------------------------------------------
// STUBBED — honestly incomplete pending real backend work (see
// WW-SPEC-SAFEGUARDING-STRATEGY-001.md open action items #2 and #4).
// These are NOT wired to any real persistence or notification system yet.
// Calling them will not silently fake success — they say so.
// ---------------------------------------------------------------------------

export interface PatternTrackingRecord {
  memberId: string;
  category: RiskCategory | null;
  incidentCount: number;
  lastFlaggedAt: string | null;
}

/**
 * STUBBED. Real implementation needs a persistence layer (open action
 * item #2 — no data field/threshold currently exists for relational-conduct
 * pattern tracking, same gap as originally flagged for Pass It On's
 * missed-deadline use case). Returns a clearly-marked placeholder rather
 * than pretending to read real data.
 */
export async function getPatternRecord(memberId: string): Promise<PatternTrackingRecord> {
  console.warn(
    '[SafeguardingFocus] getPatternRecord is a stub — no backend wired yet. ' +
    'See WW-SPEC-SAFEGUARDING-STRATEGY-001.md open action item #2.'
  );
  return {
    memberId,
    category: null,
    incidentCount: 0,
    lastFlaggedAt: null,
  };
}

/**
 * STUBBED. Real implementation needs to route to the actual DSL/deputy
 * notification mechanism (Section 1) — not yet built. Logs rather than
 * silently no-oping, so a caller in development notices this isn't live.
 */
export async function routeToDSL(decision: EscalationDecision, context: { memberId: string; raisedBy: string }): Promise<void> {
  console.warn(
    '[SafeguardingFocus] routeToDSL is a stub — no DSL notification channel wired yet.',
    { decision, context }
  );
}

export default {
  RISK_CATEGORIES,
  ROOT_CONDITION_LENSES,
  scrutinyRequirementFor,
  CONFIDENTIALITY_DISCLOSURE_TEXT,
  classifyEscalation,
  DETERRENCE_PRINCIPLE,
  TIER_SAFEGUARDING_POSTURE,
  getPatternRecord,
  routeToDSL,
};
