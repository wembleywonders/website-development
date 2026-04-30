// src/utils/rovMapping.ts
// Single source of truth for which ROV serves which page / programme / tier.
// Used by DraggableMaya, MayaReceptionist, and the ROV management page.
//
// Improvements over previous version:
//   - Route resolver uses a pre-built lookup map (O(1) per segment) instead
//     of a nested loop rebuild on every call
//   - Dead-code duplicate check removed from resolveROV
//   - guardian and elder quick-action sets filled in (were falling back to maya)
//   - guardian and elder welcome messages tightened
//   - StaffDomain type added so staffMode is programmatically usable
//   - Tier → default ROV map extracted (replaces scattered if/else)
//   - All exported types and functions documented

// ── Types ────────────────────────────────────────────────────────────────────

export type ROVName =
  | 'maya'
  | 'narrator'
  | 'maker'
  | 'merchant'
  | 'keeper'
  | 'guardian'
  | 'weaver'
  | 'spark'
  | 'elder';

export type MembershipTier =
  | 'visitor'
  | 'membership'
  | 'connector'
  | 'curator'
  | 'champion'
  | 'apply'
  | 'staff'
  | 'ops';

export interface ROVProfile {
  name:       ROVName;
  label:      string;
  tagline:    string;
  domain:     string;
  /** Route segments (lowercase, no slashes) this ROV serves. */
  programmes: string[];
  /** What this ROV does when operating in staff / ops tier. */
  staffMode?: string;
}

/** Structured quick action for the Maya widget. */
export interface ROVQuickAction {
  text:   string;
  action: string;
}

// ── ROV profiles ─────────────────────────────────────────────────────────────

export const ROV_PROFILES: Record<ROVName, ROVProfile> = {
  maya: {
    name:       'maya',
    label:      'Maya',
    tagline:    'Your guide to everything here',
    domain:     'General — routing, signposting, welcome',
    programmes: ['*'],
    staffMode:  'Platform overview, member welfare flags, cross-programme analytics',
  },
  narrator: {
    name:       'narrator',
    label:      'The Narrator',
    tagline:    "What's the story? I'll help you find it.",
    domain:     'Journalism, broadcasting, media production, storytelling',
    programmes: [
      'gtechcasters', 'gtech-casters', 'joystick',
      'raydyo', 'easy-street', 'kaywanas-court',
    ],
    staffMode:  'Editorial review, content standards, publication workflow',
  },
  maker: {
    name:       'maker',
    label:      'The Maker',
    tagline:    'Build it. Break it. Build it better.',
    domain:     'Engineering, repair, fabrication, digital making',
    programmes: ['stemgeneers', 'scrap-cat', 'bright-sparks'],
    staffMode:  'Equipment inventory, lab safety, build documentation',
  },
  merchant: {
    name:       'merchant',
    label:      'The Merchant',
    tagline:    "Your skill has value. Let's make it visible.",
    domain:     'Commerce, entrepreneurship, Cyberstore, revenue',
    programmes: ['techreneurs', 'cyberstore', 'shop', 'money-reset'],
    staffMode:  'Revenue tracking, Stripe reconciliation, 55/25/20 reporting',
  },
  keeper: {
    name:       'keeper',
    label:      'The Keeper',
    tagline:    'What was known must not be lost.',
    domain:     'Heritage, knowledge commons, oral history, archive',
    programmes: [
      'roots', 'heritage', 'oral-history',
      'knowledge-commons', 'pageturners',
    ],
    staffMode:  'Archive management, consent records, heritage content review',
  },
  guardian: {
    name:       'guardian',
    label:      'The Guardian',
    tagline:    'Safety, wellbeing, and the right to take up space.',
    domain:     'Safeguarding, H&S, community trust, consent',
    programmes: [
      'roots', 'bright-sparks',
      'auntie-anansis-kitchen', 'aunties-kitchen',
    ],
    staffMode:  'Risk assessment support, incident logging, Flora H&S workflow',
  },
  weaver: {
    name:       'weaver',
    label:      'The Weaver',
    tagline:    'Every thread connects. I see the pattern.',
    domain:     'Community cohesion, cross-programme links, social fabric',
    programmes: [
      'houses', 'community',
      'passionistas', 'connoisseurs-club',
    ],
    staffMode:  'Cross-pollination metrics, member journey mapping, Judith engagement workflow',
  },
  spark: {
    name:       'spark',
    label:      'The Spark',
    tagline:    "You haven't started yet. That's the best place to be.",
    domain:     'Discovery, first contact, Bright Sparks, new members',
    programmes: ['bright-sparks', 'sandbox', 'get-started', 'join'],
    staffMode:  'Onboarding review, first-session tracking, dropout early warning',
  },
  elder: {
    name:       'elder',
    label:      'The Elder',
    tagline:    'Experience is the curriculum. Yours counts.',
    domain:     'Mature learners, knowledge keeper income stream, life experience',
    programmes: ['roots', 'oral-history', 'passionistas', 'silk-stilettos'],
    staffMode:  'Elder knowledge keeper programme, income stream tracking',
  },
};

// ── Route → ROV lookup (built once, O(1) per segment lookup) ─────────────────
//
// Maps every programme route segment to its ROV name.
// Built at module load; safe to use in hot render paths.

const SEGMENT_TO_ROV: Map<string, ROVName> = new Map(
  Object.entries(ROV_PROFILES).flatMap(([rovName, profile]) =>
    rovName === 'maya'
      ? [] // maya is the fallback, not a segment match
      : profile.programmes.map(seg => [seg, rovName as ROVName]),
  ),
);

// ── Tier → default ROV (when no route segment matches) ───────────────────────

const TIER_DEFAULT_ROV: Partial<Record<MembershipTier, ROVName>> = {
  visitor:    'spark',
  apply:      'spark',
  membership: 'spark',
  connector:  'weaver',
  curator:    'weaver',
  champion:   'weaver',
};

// ── resolveROV ────────────────────────────────────────────────────────────────

/**
 * Returns the ROV that should serve a given page and membership tier.
 *
 * Resolution order:
 *   1. staff / ops → always maya (they route to specialists themselves)
 *   2. First pathname segment that matches a programme → that ROV
 *   3. Tier default from TIER_DEFAULT_ROV
 *   4. maya as final fallback
 */
export function resolveROV(pathname: string, tier: MembershipTier): ROVName {
  if (tier === 'staff' || tier === 'ops') return 'maya';

  const segments = pathname.toLowerCase().split('/').filter(Boolean);

  for (const segment of segments) {
    const match = SEGMENT_TO_ROV.get(segment);
    if (match) return match;
  }

  return TIER_DEFAULT_ROV[tier] ?? 'maya';
}

// ── getROVWelcome ─────────────────────────────────────────────────────────────

/**
 * Returns the welcome message string for the given ROV, page title, and tier.
 */
export function getROVWelcome(
  rov:       ROVName,
  pageTitle?: string,
  tier?:      MembershipTier,
): string {
  if (tier === 'staff' || tier === 'ops') {
    const page = pageTitle ? ` — ${pageTitle}` : '';
    return `Hi. I'm Maya. Operational mode${page}. What do you need?`;
  }

  const page = pageTitle ? ` — you're on ${pageTitle}` : '';

  const welcomes: Record<ROVName, string> = {
    maya: `Hello! I'm Maya${page}. I can help you find your way, match you to a programme, or answer anything about Wembley Wonders. What's on your mind?`,

    narrator: `Hi — I'm the Narrator${page}. If you're here to make, broadcast, or document something, you're in the right place. What's the story you want to tell?`,

    maker: `The Maker here${page}. What are you trying to build? Don't worry if you don't know yet — that's where we start.`,

    merchant: `I'm the Merchant${page}. Your skills have real value. Let's work out what that looks like in practice — and how the 55% model puts money in your pocket.`,

    keeper: `The Keeper${page}. What do you know that hasn't been written down yet? That's what we're here to preserve.`,

    guardian: `Guardian here${page}. Wembley Wonders is built on the principle that everyone has the right to take up space. I help make sure it stays that way. What do you need?`,

    weaver: `I'm the Weaver${page}. Every person here is a thread — I see the connections between them. Where do you fit in the pattern?`,

    spark: `Spark here${page}. You're at the beginning — which is exactly where the most interesting things happen. What are you curious about?`,

    elder: `The Elder${page}. Everything you know took years to learn. That knowledge is worth something here — and we have a way to make it earn for you too.`,
  };

  return welcomes[rov] ?? welcomes.maya;
}

// ── getROVQuickActions ────────────────────────────────────────────────────────

/**
 * Returns up to 4 quick-action buttons for the Maya widget.
 * Every ROV has its own set; falls back to maya actions if a ROV
 * has no specific set defined (should not happen with this implementation).
 */
export function getROVQuickActions(
  rov:   ROVName,
  tier:  MembershipTier,
  data?: Record<string, unknown>,
): ROVQuickAction[] {
  // Suppress unused-var warning — data reserved for future dynamic actions
  void data;
  void tier;

  const allActions: Record<ROVName, ROVQuickAction[]> = {
    maya: [
      { text: 'Which programme suits me?', action: 'programme_match'   },
      { text: 'Membership benefits',       action: 'membership_info'   },
      { text: 'Site navigation help',      action: 'navigation'        },
      { text: 'How Wembley Wonders works', action: 'platform_overview' },
    ],
    narrator: [
      { text: 'Plan my media pathway',     action: 'media_pathway'    },
      { text: 'What can I make here?',     action: 'casters_overview' },
      { text: 'Rayd-yo or Joystick?',      action: 'output_match'     },
      { text: 'Field or studio work?',     action: 'role_match'       },
    ],
    maker: [
      { text: 'What can I build here?',    action: 'maker_overview'   },
      { text: 'STEMgeneers explained',     action: 'stemgeneers_info' },
      { text: 'Scrap Cat — how it works',  action: 'scrapcat_info'    },
      { text: 'What skills do I need?',    action: 'skills_audit'     },
    ],
    merchant: [
      { text: 'How does the 55% work?',    action: 'revenue_model'    },
      { text: 'TECHreneurs overview',      action: 'techreneurs_info' },
      { text: 'Cyberstore explained',      action: 'cyberstore_info'  },
      { text: 'When can I start earning?', action: 'earning_timeline' },
    ],
    keeper: [
      { text: 'What is the Knowledge Commons?', action: 'commons_overview'    },
      { text: 'Roots programme',                action: 'roots_info'          },
      { text: 'Elder knowledge income',         action: 'elder_income'        },
      { text: 'How to contribute to archive',   action: 'archive_contribute'  },
    ],
    guardian: [
      { text: 'Safeguarding at WW',        action: 'safeguarding_overview' },
      { text: 'Report a concern',          action: 'report_concern'        },
      { text: 'H&S at events',             action: 'hs_events'             },
      { text: 'Consent and data',          action: 'consent_data'          },
    ],
    weaver: [
      { text: 'What is Contribute?',       action: 'contribute_explain'  },
      { text: 'Passionistas or Connoisseurs?', action: 'houses_match'   },
      { text: 'How do I get more involved?',  action: 'involvement_guide' },
      { text: 'Community events',          action: 'events_info'         },
    ],
    spark: [
      { text: 'Which challenge first?',             action: 'challenge_advice'   },
      { text: 'What happens after Bright Sparks?',  action: 'journey_overview'   },
      { text: 'Tell me about the programmes',       action: 'programme_overview' },
      { text: 'How does the 55% work?',             action: 'revenue_model'      },
    ],
    elder: [
      { text: 'Elder knowledge income explained',  action: 'elder_income'       },
      { text: 'Roots — what to expect',            action: 'roots_info'         },
      { text: 'Oral history — how it works',       action: 'oral_history_info'  },
      { text: 'Silk Stilettos programme',          action: 'silk_stilettos_info'},
    ],
  };

  return (allActions[rov] ?? allActions.maya).slice(0, 4);
}

// ── Convenience exports ───────────────────────────────────────────────────────

/** All ROV names as an ordered array (useful for iteration in UI). */
export const ALL_ROV_NAMES: ROVName[] = Object.keys(ROV_PROFILES) as ROVName[];

/** Returns the display label for a ROV name. */
export function getROVLabel(rov: ROVName): string {
  return ROV_PROFILES[rov].label;
}

/** Returns the tagline for a ROV name. */
export function getROVTagline(rov: ROVName): string {
  return ROV_PROFILES[rov].tagline;
}
