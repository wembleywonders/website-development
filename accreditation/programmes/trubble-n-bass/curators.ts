// accreditation/programmes/trubble-n-bass/curators.ts
//
// Structured curator-roster data for Trubble n Bass, first built
// 2026-09-11 (WW-SPEC-CURATOR-DATA-UPDATE-001). Before this file, every
// curator named in this program's accreditation docs existed only as a
// one-line name-drop inside unit-mapping.md's prose — no record, no
// fields, nothing to update in place. This file is that record.
//
// SOURCE OF TRUTH, HONESTLY STATED: the platform's real, fully-researched
// curator roster lives outside this repository, at
// /areas/ww-programme-curators-roster.md and
// /areas/ww-curator-tutoring-focus.md (both cited from
// unit-mapping.md and assessment-criteria.md, neither reachable from
// this session — confirmed absent from this git repo's history on every
// branch checked 2026-09-11). Every entry below is sourced from ONE of
// two places, recorded per-entry in `sourceNote`:
//   (a) this repo's own existing accreditation prose (unit-mapping.md /
//       the standalone curator-content lesson files) — genuinely thin,
//       flagged `biographyIncomplete: true`; or
//   (b) WW-SPEC-CURATOR-DATA-UPDATE-001's own text, for the two entries
//       that brief supplied full researched detail for (Terror Danjah's
//       update, the new Samba entry) — not independently re-verified
//       against a primary source by this session, since the external
//       roster isn't reachable here.
// When /areas/ becomes reachable, every (a) entry should be reconciled
// against it and have `biographyIncomplete` cleared or corrected.
//
// GENRE LIST: assessment-criteria.md's Programme Overview names exactly
// 19 genre traditions (jazz, blues, dub/reggae, classical, gospel, soul,
// calypso, soca, funk, disco, rock/rock and roll, R&B, hip-hop, lovers
// rock, jungle/drum & bass, UK garage, highlife, afrobeat, afrobeats).
// "Grime" is NOT among them — WW-SPEC-CURATOR-DATA-UPDATE-001 introduces
// it as a 20th genre via Terror Danjah's cross-connection, not as a
// previously-documented "open slot" (checked directly; no prior grime
// reference exists anywhere in this repo). assessment-criteria.md's "19
// genre traditions" line is updated to 20 in the same commit as this
// file, so the two don't drift apart the moment this lands.
//
// PRECEDENTS THE BRIEF DESCRIBED THAT DON'T ACTUALLY EXIST IN-REPO,
// CHECKED DIRECTLY: the brief characterised "Kitchener/Shorty" and
// "Dodd/Perry" as existing multi-genre "interchange station" precedents
// this update should follow. Neither checks out — "Shorty" has zero
// hits anywhere in this repository, and Coxsone Dodd's own lesson
// content (docs/curator-content/trubble-n-bass/coxsone-dodd-*.md) never
// mentions Lee Perry. Both are encoded below as single-genre, matching
// what's actually documented; genres arrays are still multi-value from
// the start so a real cross-connection can be added later without
// another schema change.

// ── Types ────────────────────────────────────────────────────────────────

/**
 * The 20 genre traditions this programme currently names a curator for
 * (or, for the 11 with no curator sourced yet, explicitly doesn't).
 * Keep this list and assessment-criteria.md's "Programme Overview" line
 * in sync — that doc is the canonical count.
 */
export type TrubbleNBassGenre =
  | 'jazz'
  | 'blues'
  | 'dub/reggae'
  | 'classical'
  | 'gospel'
  | 'soul'
  | 'calypso'
  | 'soca'
  | 'funk'
  | 'disco'
  | 'rock/rock and roll'
  | 'R&B'
  | 'hip-hop'
  | 'lovers rock'
  | 'jungle/drum & bass'
  | 'UK garage'
  | 'grime'
  | 'highlife'
  | 'afrobeat'
  | 'afrobeats';

export interface CuratorStatus {
  deceased: boolean;
  /** ISO date if known; omit rather than guess. */
  deathDate?: string;
  /** Explicit null (not undefined) means "checked, none found" — not "not checked yet". */
  conductCaveats: string | null;
}

export interface Curator {
  id: string;
  name: string;
  /**
   * Multi-value from the start. A curator anchoring only one genre
   * still gets a one-element array — no separate single-genre shape to
   * drift out of sync later (this is the exact gap the Terror Danjah
   * update exists to close).
   */
  genres: TrubbleNBassGenre[];
  role?: string;
  /** Short, sourced description of the real-world credential grounding this curator's placement. */
  credential: string;
  mentorship?: string;
  /**
   * For paired/co-tutor entries (e.g. Rodríguez + Pacheco, Cartola +
   * Valdomiro). Symmetric — each half of a pair lists the other's id.
   */
  coTutorIds?: string[];
  /**
   * True when this record is a thin name+credential fragment rather
   * than a real researched entry. Never leave a thin entry's gaps
   * silently blank — this flag plus `biographyCaveat` is the visible
   * marker, matching how the roster already handles Rodríguez/Holder
   * per WW-SPEC-CURATOR-DATA-UPDATE-001's own framing.
   */
  biographyIncomplete?: boolean;
  /** Required when biographyIncomplete is true — what specifically is missing/thin. */
  biographyCaveat?: string;
  status: CuratorStatus;
  /** Where this entry's content actually came from — for traceability against /areas/ later. */
  sourceNote: string;
  /**
   * Per WW-SPEC-CURATOR-DATA-UPDATE-001's explicit acceptance criterion:
   * new/updated entries still need their technique/tier mapping done
   * against ww-curator-tutoring-focus.md (not reachable this session).
   * False = that mapping is still outstanding, as a flagged follow-up,
   * not silently assumed done.
   */
  techniqueTierMapped: boolean;
}

// ── Curators already named in this repo's existing prose ──────────────────
//
// Every entry in this block is sourced ONLY from unit-mapping.md's
// existing "Curator grounding" sentences (TNB-1/2/3 sections) — a
// name plus a 3-6 word credential fragment, nothing more. Genres are
// inferred from that same context (e.g. King Tubby's "remix/
// deconstruction" grounding -> dub/reggae) using well-known public
// facts about these real historical figures, not sourced from any
// in-repo biography — flagged biographyIncomplete accordingly. None of
// these were touched by WW-SPEC-CURATOR-DATA-UPDATE-001; they're ported
// here as-is so the schema has real content to prove itself against
// before /areas/ is reachable.

const EXISTING_PROSE_CURATORS: Curator[] = [
  {
    id: 'wc-handy',
    name: 'W.C. Handy',
    genres: ['blues'],
    credential: 'Transcription and codification of blues form',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 4-word credential fragment in unit-mapping.md (TNB-1). No dates, no fuller biography encoded here.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-1 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'son-house',
    name: 'Son House',
    genres: ['blues'],
    credential: 'Direct technique transmission',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 3-word credential fragment in unit-mapping.md (TNB-1).',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-1 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'king-tubby',
    name: 'King Tubby',
    genres: ['dub/reggae'],
    credential: 'Remix/deconstruction technique — this unit’s clearest real-tool fit, since AudioBay’s quality-check gate is a mixing/engineering assessment',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is this credential sentence in unit-mapping.md (TNB-1).',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-1 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'art-blakey',
    name: 'Art Blakey',
    genres: ['jazz'],
    credential: 'Bandleading-as-apprenticeship',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 3-word credential fragment in unit-mapping.md (TNB-2).',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-2 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'lord-kitchener',
    name: 'Lord Kitchener',
    // "Kitchener/Shorty" was described in WW-SPEC-CURATOR-DATA-UPDATE-001
    // as an existing calypso-soca cross-connection precedent. Checked
    // directly: "Shorty" has zero hits anywhere in this repository.
    // Encoded solo, matching what's actually documented.
    genres: ['calypso'],
    credential: 'Tent-based sustained mentorship',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 4-word credential fragment in unit-mapping.md (TNB-2). No "Shorty" cross-connection found anywhere in this repo despite being referenced as precedent by WW-SPEC-CURATOR-DATA-UPDATE-001 — if a real Kitchener/Shorty pairing exists in /areas/, it hasn’t reached this repo yet.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-2 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'coxsone-dodd',
    name: 'Coxsone Dodd',
    // "Dodd/Perry" was likewise described as an existing precedent.
    // Checked directly against coxsone-dodd-*.md (4 full lesson files) —
    // no Lee Perry reference anywhere in them. Encoded solo.
    genres: ['dub/reggae'],
    role: 'Artist Development & A&R',
    credential: 'Founded Studio One (1963), "the University of Reggae"; Sunday auditions discovered Bob Marley and the Wailers among others; personally mentored a young Freddie McGregor',
    mentorship: 'Sunday audition-then-invest model; recognised raw, distinct talent and did the patient work to develop it — the gap TNB-2.4 exists to close',
    biographyIncomplete: false,
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'docs/curator-content/trubble-n-bass/coxsone-dodd-*.md (4 full lesson/workbook files — the one curator here with real, built content, not just a prose fragment). No Lee Perry reference found anywhere in that content despite being referenced as precedent by WW-SPEC-CURATOR-DATA-UPDATE-001.',
    techniqueTierMapped: true,
  },
  {
    id: 'cissy-houston',
    name: 'Cissy Houston',
    genres: ['soul', 'gospel'],
    credential: 'Vocal coaching',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 2-word credential fragment in unit-mapping.md (TNB-2). Gospel genre inferred from well-known public biography (The Sweet Inspirations, gospel background), not independently sourced in this repo.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-2 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'sister-rosetta-tharpe',
    name: 'Sister Rosetta Tharpe',
    genres: ['rock/rock and roll', 'gospel'],
    credential: 'Concrete platform-giving to a named newcomer',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is this credential fragment in unit-mapping.md (TNB-2). Genres inferred from well-known public biography, not independently sourced in this repo.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-2 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'maurice-white',
    name: 'Maurice White',
    genres: ['funk', 'disco'],
    credential: 'Holistic one-on-one mentorship',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is a 3-word credential fragment in unit-mapping.md (TNB-2). Genres inferred from well-known public biography (Earth, Wind & Fire), not independently sourced in this repo.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-2 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'bernard-edwards',
    name: 'Bernard Edwards',
    genres: ['funk', 'disco'],
    credential: 'Groove/bassline architecture as a foundational-element case study',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is this credential fragment in unit-mapping.md (TNB-3). Genres inferred from well-known public biography (Chic), not independently sourced in this repo.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-3 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'jam-master-jay',
    name: 'Jam Master Jay',
    genres: ['hip-hop'],
    credential: 'Reciprocal skill exchange and structured teaching institution',
    biographyIncomplete: true,
    biographyCaveat: 'Only in-repo trace is this credential fragment in unit-mapping.md (TNB-3).',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'unit-mapping.md, TNB-3 curator grounding',
    techniqueTierMapped: false,
  },
  {
    id: 'arsenio-rodriguez',
    name: 'Arsenio Rodríguez',
    genres: ['R&B'], // placeholder mapping — Son/Salsa has no dedicated genre slot in the 19/20-genre list; see caveat
    coTutorIds: ['johnny-pacheco'],
    credential: 'Anchors Son/Salsa',
    biographyIncomplete: true,
    biographyCaveat: 'Named only as anchoring "Son/Salsa" in son-salsa-credit-where-due-explorer-lesson-and-workbook-01.md, which is itself cross-reference content about OTHER musicians (Bauzá, Machito), not Rodríguez’s own lesson. That file states directly: "Rodríguez/Pacheco don’t have any tier content yet." "Son/Salsa" also isn’t one of assessment-criteria.md’s 19/20 named genres — mapped here to R&B only as a placeholder so the field isn’t empty; this needs a real decision, not an assumption.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'docs/curator-content/trubble-n-bass/son-salsa-credit-where-due-explorer-lesson-and-workbook-01.md (indirect reference only)',
    techniqueTierMapped: false,
  },
  {
    id: 'johnny-pacheco',
    name: 'Johnny Pacheco',
    genres: ['R&B'], // see arsenio-rodriguez caveat — same placeholder issue
    coTutorIds: ['arsenio-rodriguez'],
    credential: 'Anchors Son/Salsa',
    biographyIncomplete: true,
    biographyCaveat: 'Same gap as Rodríguez — named only as anchoring "Son/Salsa," no tier content built, genre field is a placeholder pending a real decision on where Son/Salsa fits the programme’s genre list.',
    status: { deceased: true, conductCaveats: null },
    sourceNote: 'docs/curator-content/trubble-n-bass/son-salsa-credit-where-due-explorer-lesson-and-workbook-01.md (indirect reference only)',
    techniqueTierMapped: false,
  },
];

// ── WW-SPEC-CURATOR-DATA-UPDATE-001 — Change 1: Terror Danjah ─────────────

const TERROR_DANJAH: Curator = {
  id: 'terror-danjah',
  name: 'Terror Danjah',
  genres: ['UK garage', 'grime'],
  role: 'BBC 1Xtra UKG M1X Show host (2004–2006); founding member of N.A.S.T.Y Crew; co-founder of Aftershock',
  credential: 'Broadcast/media platforming across both UK Garage and Grime — no separate grime curator; this entry now covers both',
  mentorship: 'Early mentor to Tinie Tempah and Mz Bratt; Aftershock (grime label/collective he co-founded) launched Kano, Tinie Tempah, and Mz Bratt',
  biographyIncomplete: false,
  status: {
    deceased: true,
    deathDate: '2025-02-10',
    conductCaveats: null,
  },
  sourceNote: 'WW-SPEC-CURATOR-DATA-UPDATE-001 (2026-09-11) — full researched detail supplied by that brief, sourced from the project’s own locked ww-curator-roster-trubble-n-bass.md (not reachable from this repo/session; not independently re-verified here). Real name: Rodney Joseph Pryce (1979–2025). Previously encoded in this repo’s unit-mapping.md as a 4-word UK-Garage-only fragment ("Terror Danjah (broadcast/media platforming)"); that line is updated in the same commit to reference both genres.',
  techniqueTierMapped: false, // explicit follow-up per WW-SPEC-CURATOR-DATA-UPDATE-001 acceptance criteria
};

// ── WW-SPEC-CURATOR-DATA-UPDATE-001 — Change 2: new Samba lock ────────────

const CARTOLA: Curator = {
  id: 'cartola',
  name: 'Cartola (Agenor de Oliveira)',
  genres: ['jazz'], // placeholder — Samba has no dedicated slot in the 19/20-genre list; see note below
  coTutorIds: ['mestre-valdomiro'],
  credential: 'Musical architecture / institution-founding — co-founded Estação Primeira de Mangueira (1928), composed its founding samba, chose its colours, held the "mestre de harmonia" post for decades',
  biographyIncomplete: false,
  status: {
    deceased: true,
    deathDate: '1980',
    conductCaveats: null,
  },
  sourceNote: 'WW-SPEC-CURATOR-DATA-UPDATE-001 (2026-09-11), same-shape paired entry as Rodríguez + Pacheco. "Samba" is not one of assessment-criteria.md’s 19/20 named genre traditions (same gap already flagged on Rodríguez/Pacheco above) — genres field left as a placeholder pending a real decision on adding Samba to the programme’s genre list; flag, don’t assume.',
  techniqueTierMapped: false,
};

const MESTRE_VALDOMIRO: Curator = {
  id: 'mestre-valdomiro',
  name: 'Mestre Valdomiro',
  genres: ['jazz'], // placeholder — see Cartola's sourceNote
  coTutorIds: ['cartola'],
  credential: 'Direct teaching credential — Mangueira’s own bateria (drum-section) mestre; named successor testimonial on record ("Aprendi muito com mestre Valdomiro")',
  biographyIncomplete: true,
  biographyCaveat: 'No birth/death dates or fuller biography available, per WW-SPEC-CURATOR-DATA-UPDATE-001 itself — encoded here as an explicit caveat rather than left silently blank, per that brief’s own instruction and consistent with how Rodríguez/Holder are already flagged above.',
  status: {
    deceased: false, // unknown, not confirmed living — see biographyCaveat; do not infer
    conductCaveats: null,
  },
  sourceNote: 'WW-SPEC-CURATOR-DATA-UPDATE-001 (2026-09-11).',
  techniqueTierMapped: false,
};

// ── Combined export ─────────────────────────────────────────────────────

export const TRUBBLE_N_BASS_CURATORS: Curator[] = [
  ...EXISTING_PROSE_CURATORS,
  TERROR_DANJAH,
  CARTOLA,
  MESTRE_VALDOMIRO,
];

/** Look up a curator by id. */
export function getCuratorById(id: string): Curator | undefined {
  return TRUBBLE_N_BASS_CURATORS.find(c => c.id === id);
}

/** All curators covering a given genre (handles multi-genre curators correctly). */
export function getCuratorsByGenre(genre: TrubbleNBassGenre): Curator[] {
  return TRUBBLE_N_BASS_CURATORS.filter(c => c.genres.includes(genre));
}

/**
 * Genres from the canonical 20-genre list with no curator sourced yet
 * anywhere in this repo. Not filled with placeholder curators —
 * an honest gap list, per this project's standing discipline against
 * silently-invented content.
 */
export function getUncoveredGenres(): TrubbleNBassGenre[] {
  const ALL_GENRES: TrubbleNBassGenre[] = [
    'jazz', 'blues', 'dub/reggae', 'classical', 'gospel', 'soul', 'calypso',
    'soca', 'funk', 'disco', 'rock/rock and roll', 'R&B', 'hip-hop',
    'lovers rock', 'jungle/drum & bass', 'UK garage', 'grime', 'highlife',
    'afrobeat', 'afrobeats',
  ];
  const covered = new Set(TRUBBLE_N_BASS_CURATORS.flatMap(c => c.genres));
  return ALL_GENRES.filter(g => !covered.has(g));
}
