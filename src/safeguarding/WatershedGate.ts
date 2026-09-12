/**
 * ============================================================================
 * WEMBLEY WONDERS — WATERSHED & AGE-GATE LAYER
 * ============================================================================
 * Decided 22 Aug 2026 (CJ, direct): 9pm watershed, chosen as a broadcast
 * convention that's worked for decades and is familiar across all the
 * cultures WW serves — not a placeholder hour.
 *
 * The age/consent rule reuses the "STEMgeneers Layer 1" mechanism exactly,
 * per CJ's explicit confirmation the same session: minimum age 13, paired
 * with active supervision (not age alone) — here specifically in the form
 * of parental/guardian consent — with a restricted route for anyone who is
 * under 13 or lacks that consent. That mechanism did not exist anywhere in
 * the repo before this file (confirmed via full-repo search, see
 * WW-OUTSTANDING-TASKS.md's "STEMgeneers Layer 1" entry) — this is the
 * first real implementation of it, not a port of existing code.
 *
 * WHAT THIS FILE IS: types and pure functions — the age/watershed decision
 * logic itself, decoupled from where the age/consent data actually comes
 * from.
 * WHAT THIS FILE IS NOT: wired to any real user data yet. `WembleyUser`
 * (src/contexts/AuthContext.tsx) has no dateOfBirth or guardianConsent
 * field today — that's a confirmed backend/API dependency, not something
 * this file can supply. The STUBBED accessor below says so explicitly
 * rather than faking a value. Do not wire this into a live page until that
 * backend field exists — a gate that cannot check real data is worse than
 * no gate for a safeguarding feature.
 *
 * WHAT THIS FILE DOES NOT COVER: the broader pre-watershed named-category
 * scheduling framework (Mother's Hour, Children's Storytime, term-time
 * scheduling, producer-facing category selection) — that's a separate,
 * larger, not-yet-scoped-to-implementation piece of work. This file is
 * the access-gate mechanism only.
 * ============================================================================
 */

export const WATERSHED_HOUR_24 = 21; // 9pm, local time. Not configurable per CJ — this is the hour, not a placeholder.

export const MINIMUM_AGE_WITHOUT_SUPERVISION = 13;

// ---------------------------------------------------------------------------
// Age calculation — pure, no side effects
// ---------------------------------------------------------------------------

/**
 * Calculates age in whole years from an ISO date string, as of a given
 * moment (defaults to now). Pure function — no clock access unless asOf
 * is omitted, which keeps this testable.
 */
export function ageFromDateOfBirth(dateOfBirth: string, asOf: Date = new Date()): number {
  const dob = new Date(dateOfBirth);
  let age = asOf.getFullYear() - dob.getFullYear();
  const monthDiff = asOf.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// ---------------------------------------------------------------------------
// The age/consent decision (the "Layer 1" mechanism)
// ---------------------------------------------------------------------------

export interface GuardianConsent {
  granted: boolean;
  grantedAt?: string;
  guardianName?: string;
}

export interface AgeGateInput {
  dateOfBirth: string;
  guardianConsent?: GuardianConsent;
}

export type AgeGateRoute = 'full-access' | 'restricted-route' | 'no-access';

export interface AgeGateDecision {
  route: AgeGateRoute;
  reason: string;
}

/**
 * The Layer 1 rule, generalised: age alone is never sufficient. A member
 * 13 or older with granted guardian consent gets full access. A member
 * under 13, or 13+ without granted consent, gets the restricted route
 * (matching STEMgeneers Layer 1's "API-only route for under-13 members
 * who still want the content" — the restricted route removes the
 * public-facing exposure, it does not simply deny access outright).
 */
export function evaluateAgeGate(input: AgeGateInput, asOf: Date = new Date()): AgeGateDecision {
  const age = ageFromDateOfBirth(input.dateOfBirth, asOf);
  const hasConsent = input.guardianConsent?.granted === true;

  if (age >= MINIMUM_AGE_WITHOUT_SUPERVISION && hasConsent) {
    return { route: 'full-access', reason: `Age ${age}, guardian consent granted.` };
  }

  if (age >= MINIMUM_AGE_WITHOUT_SUPERVISION && !hasConsent) {
    return {
      route: 'restricted-route',
      reason: `Age ${age} meets the minimum, but guardian/parental consent has not been granted — age alone is not sufficient per the Layer 1 rule.`,
    };
  }

  return {
    route: 'restricted-route',
    reason: `Under minimum age (${MINIMUM_AGE_WITHOUT_SUPERVISION}) — restricted route only, matching Layer 1's under-13 handling.`,
  };
}

// ---------------------------------------------------------------------------
// The watershed time check — reuses evaluateAgeGate exactly, per CJ's
// explicit confirmation ("same rule, reused exactly"), rather than
// defining a separate threshold for broadcast-content exposure.
// ---------------------------------------------------------------------------

/** True if the given moment (defaults to now, local time) is at or past the 9pm watershed. */
export function isPastWatershed(asOf: Date = new Date()): boolean {
  return asOf.getHours() >= WATERSHED_HOUR_24;
}

export interface WatershedAccessDecision extends AgeGateDecision {
  isPastWatershed: boolean;
}

/**
 * Full watershed access decision for post-9pm content. Before the
 * watershed, this function is not the relevant check at all — pre-watershed
 * content access is a separate, not-yet-designed question (see file header).
 * Calling this before 9pm still returns a real decision (useful for
 * "what would happen after 9pm" previews) but callers gating live content
 * should check `isPastWatershed` first.
 */
export function evaluateWatershedAccess(input: AgeGateInput, asOf: Date = new Date()): WatershedAccessDecision {
  return {
    ...evaluateAgeGate(input, asOf),
    isPastWatershed: isPastWatershed(asOf),
  };
}

// ---------------------------------------------------------------------------
// STUBBED — honestly incomplete pending the backend dependency (see file
// header). Does not fake a value; says so explicitly.
// ---------------------------------------------------------------------------

/**
 * STUBBED. Real implementation needs `dateOfBirth` and `guardianConsent`
 * added to the live `WembleyUser` model/API (confirmed absent as of
 * 22 Aug 2026 — see src/contexts/AuthContext.tsx). Until that backend
 * field exists, there is no real data source for this function to read.
 */
export async function getAgeGateInputForUser(userId: number): Promise<AgeGateInput | null> {
  console.warn(
    '[WatershedGate] getAgeGateInputForUser is a stub — WembleyUser has no ' +
    'dateOfBirth/guardianConsent field yet. Backend change needed first.',
    { userId }
  );
  return null;
}

export default {
  WATERSHED_HOUR_24,
  MINIMUM_AGE_WITHOUT_SUPERVISION,
  ageFromDateOfBirth,
  evaluateAgeGate,
  isPastWatershed,
  evaluateWatershedAccess,
  getAgeGateInputForUser,
};
