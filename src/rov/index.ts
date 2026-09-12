// src/rov/index.ts
// The Children of Anansi & Maya - Complete ROV System
//
// CORRECTED 15 Aug 2026: the previous version of this file maintained
// its OWN copy of CHILD_BY_PROGRAMME / CHILD_BY_DOMAIN, hand-typed
// separately from children.ts's ChildByProgramme / ChildByDomain — and
// they had drifted into direct contradiction (techreneurs: Kumi in
// children.ts vs 'kweku' here; joystick: Ntikuma vs 'yaw'; pageturners:
// Kweku vs 'esi'). Worse, the original 8 Children's exports were
// commented out, so COMPLETE_CHILDREN_REGISTRY silently only contained
// the 4 new Children despite its name.
//
// Fixed by making this file a genuine re-export layer: children.ts and
// newChildren.ts are the single source of truth for identity and
// programme/domain routing. Nothing here hand-maintains a parallel
// mapping anymore — if a mapping needs to change, change it in
// children.ts or newChildren.ts, not here.
//
// STILL OPEN (separate, product-level decision, not fixed by this file):
// three founding programmes — G-Tech Casters, Roots, Bright Sparks —
// have no Child assignment in children.ts/newChildren.ts at all. This
// file surfaces that gap (see the console warning below) rather than
// papering over it with a guessed assignment.
//
// RESOLVED 15 Aug 2026: ROVsPage.tsx's old 9-archetype system has been
// retired and rebuilt to render the real 12 Children (CJ's decision) —
// see the rebuilt ROVsPage.tsx.
//
// RESOLVED 15 Aug 2026: the legacy "ROV Family" alias layer (Solomon,
// Neville, Maxine, Esther, Tariq) has been removed — grep confirmed it
// was dead code, referenced nowhere outside this file's own definition.

// ============================================
// TYPE EXPORTS
// ============================================

export * from './types';

// ============================================
// CHILDREN OF ANANSI — single source of truth
// ============================================

export {
  Kweku,
  Ntikuma,
  Anansewa,
  Kofi,
  Afua,
  Yaw,
  Esi,
  Kumi,
  AllChildren,
  ChildByProgramme as ORIGINAL_CHILD_BY_PROGRAMME,
  ChildByDomain as ORIGINAL_CHILD_BY_DOMAIN,
  AFUA_DJ_SYSTEM_PROMPT,
} from './personalities/children';

export {
  Adaeze,
  Nyame,
  Osei,
  Akua,
  NewChildren,
  NewChildByProgramme,
  NewChildByDomain,
} from './personalities/newChildren';

// ============================================
// STANCES
// ============================================

export {
  selectStance,
  getDefaultStanceForStage,
  getEngagementPattern,
  ALL_STANCES,
  KWEKU_STANCES,
  NTIKUMA_STANCES,
  KOFI_STANCES,
  AFUA_STANCES,
  YAW_STANCES,
  ESI_STANCES,
  KUMI_STANCES,
  ANANSEWA_STANCES,
  ADAEZE_STANCES,
  NYAME_STANCES,
  OSEI_STANCES,
  AKUA_STANCES
} from './stances';

// ============================================
// SHARED KNOWLEDGE
// ============================================

export {
  SHARED_KNOWLEDGE,
  getSurfaceKnowledge,
  checkEscalationTriggers,
  getVoiceTemplate,
  selectSurfaceFact,
  buildCrossDomainResponse
} from './knowledge/sharedKnowledge';

// ============================================
// COUNTER-TRAP CALIBRATION
// ============================================

export {
  UNIVERSAL_COUNTER_TRAP,
  CHILD_CALIBRATIONS,
  detectTraps,
  getTrapReplacement,
  getTrapGoodExample,
  CELEBRATION_TRAP,
  IDENTITY_CONFIRMATION_TRAP,
  OVERCOMING_NARRATIVE_TRAP,
  POTENTIAL_TRAP,
  DEPENDENCE_TRAP
} from './calibration/counterTrap';

// ============================================
// TRUST-PRESERVING HANDOFFS
// ============================================

export {
  assessHandoffNeed,
  makeHandoffDecision,
  generateSurfaceGuidance,
  generateCollaborationInvite,
  generateWarmHandoff,
  generateMayaReturn,
  generateReceivingGreeting,
  filterContextForHandoff,
  getDomainSpecialist
} from './handoffs/trustPreserving';

// ============================================
// COMPLETE CHILDREN REGISTRY
// ============================================
// All 12, genuinely — imported directly rather than hand-copied, so this
// cannot silently drift from children.ts/newChildren.ts again.

import {
  Kweku,
  Ntikuma,
  Anansewa,
  Kofi,
  Afua,
  Yaw,
  Esi,
  Kumi,
  ChildByProgramme as ORIGINAL_CHILD_BY_PROGRAMME,
  ChildByDomain as ORIGINAL_CHILD_BY_DOMAIN,
} from './personalities/children';
import { NewChildren, NewChildByProgramme, NewChildByDomain } from './personalities/newChildren';
import type { ChildPersonality } from './types';

export const COMPLETE_CHILDREN_REGISTRY: Record<string, ChildPersonality> = {
  kweku: Kweku,
  ntikuma: Ntikuma,
  anansewa: Anansewa,
  kofi: Kofi,
  afua: Afua,
  yaw: Yaw,
  esi: Esi,
  kumi: Kumi,
  adaeze: NewChildren.Adaeze,
  nyame: NewChildren.Nyame,
  osei: NewChildren.Osei,
  akua: NewChildren.Akua,
};

// ============================================
// DOMAIN MAPPINGS
// ============================================
// Merged directly from children.ts + newChildren.ts's own routing
// tables — this file no longer hand-maintains its own copy. If a
// programme's Child assignment needs to change, change it at the
// source (children.ts or newChildren.ts), not here.
//
// NOTE: ORIGINAL_CHILD_BY_PROGRAMME/ORIGINAL_CHILD_BY_DOMAIN in
// children.ts are keyed by ChildPersonality object, not string id —
// converted to id-keyed maps below to match this file's existing
// string-based consumers.

function toIdKeyed(
  source: Record<string, ChildPersonality>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(source).map(([key, child]) => [key, child.id])
  );
}

export const CHILD_BY_PROGRAMME: Record<string, string> = {
  ...toIdKeyed(ORIGINAL_CHILD_BY_PROGRAMME),
  ...toIdKeyed(NewChildByProgramme),
};

export const CHILD_BY_DOMAIN: Record<string, string> = {
  ...toIdKeyed(ORIGINAL_CHILD_BY_DOMAIN),
  ...toIdKeyed(NewChildByDomain),
};

// Surface the known coverage gap at module load rather than hiding it —
// three founding programmes have no Child assignment in the source files.
// UPDATED 15 Aug 2026: G-Tech Casters and Roots now have real Child
// assignments (Kumi and Esi respectively) in children.ts's
// ChildByProgramme. Bright Sparks is deliberately excluded from this
// list — it's the pre-Child discovery phase, routes through Maya
// directly by design, not a routing gap.
const KNOWN_UNROUTED_PROGRAMMES: string[] = [];
const missingFromRouting = KNOWN_UNROUTED_PROGRAMMES.filter(
  (p) => !(p in CHILD_BY_PROGRAMME)
);
if (missingFromRouting.length > 0 && process.env.NODE_ENV !== 'production') {
  console.warn(
    `[rov/index.ts] Programmes with no Child assignment: ${missingFromRouting.join(', ')}. ` +
      'This is a known gap (flagged 15 Aug 2026), not a bug in this file — needs a product decision on which Child each should route to, or whether these programmes route through Maya directly.'
  );
}

// ============================================
// ROV FAMILY ALIASES — REMOVED 15 Aug 2026
// ============================================
// The legacy "ROV Family" backward-compat layer (Solomon, Neville,
// Maxine, Esther, Tariq → current Children) was removed after grep
// confirmed resolveROVAlias() and ROV_FAMILY_ALIASES were referenced
// nowhere in src/ outside this file's own definition. Dead code, not
// load-bearing. If this needs reviving later, it's in version control.

// ============================================
// INTEGRATION HELPERS
// ============================================

import type { MemberContext, ROVStance } from './types';
import { selectStance } from './stances';
import { makeHandoffDecision } from './handoffs/trustPreserving';
import { detectTraps, CHILD_CALIBRATIONS } from './calibration/counterTrap';

/**
 * Process a message through the complete ROV system
 */
export async function processWithROV(
  message: string,
  childId: string,
  context: MemberContext
): Promise<{
  stance: ROVStance;
  handoffDecision: ReturnType<typeof makeHandoffDecision>;
  calibration: typeof CHILD_CALIBRATIONS[string];
  warnings: string[];
}> {
  const stance = selectStance(message, context, childId);
  const calibration = CHILD_CALIBRATIONS[childId];

  // NOTE: still a placeholder, same as before this fix — makeHandoffDecision
  // needs a real child lookup + draft response to run for real. Not
  // resolved by this file's rewrite; flagged here rather than silently
  // left as dead-looking code.
  const warnings: string[] = [];

  return {
    stance,
    handoffDecision: {} as any, // Placeholder — unresolved, see note above
    calibration,
    warnings
  };
}

/**
 * Validate a response against counter-trap calibration
 */
export function validateResponse(
  response: string,
  childId: string
): { valid: boolean; trapsDetected: string[]; suggestions: string[] } {
  const calibration = CHILD_CALIBRATIONS[childId];

  if (!calibration) {
    return { valid: true, trapsDetected: [], suggestions: [] };
  }

  const trapsDetected = detectTraps(response, calibration);

  interface TrapConfig {
    name: string;
    replacement?: string;
    [key: string]: any;
  }

  const suggestions: string[] = trapsDetected.map((trap: string) => {
    const allTraps: TrapConfig[] = [
      calibration.celebrationTrap,
      calibration.identityConfirmationTrap,
      calibration.overcomingNarrativeTrap,
      calibration.potentialTrap,
      calibration.dependenceTrap,
      ...(calibration.domainSpecificTraps || [])
    ];

    const trapConfig: TrapConfig | undefined = allTraps.find((t: TrapConfig) => t.name === trap);
    return trapConfig?.replacement || '';
  }).filter(Boolean);

  return {
    valid: trapsDetected.length === 0,
    trapsDetected,
    suggestions
  };
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  COMPLETE_CHILDREN_REGISTRY,
  CHILD_BY_PROGRAMME,
  CHILD_BY_DOMAIN,
  processWithROV,
  validateResponse
};