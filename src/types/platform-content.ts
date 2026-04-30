/*
 * platform-content.ts
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Platform Content Provenance Model
 * Company No. 12960817
 *
 * The connective tissue of the platform.
 *
 * Every piece of content produced on this platform —
 * a Joystick article, a Rayd-yo broadcast, a Knowledge
 * Commons profile, a Pageturners story, an Oral History
 * testimony, an Anansi retelling from Bright Sparks —
 * carries four things:
 *
 *   originProgramme    which programme it came from
 *   relevantProgrammes where else it belongs
 *   status             where it is in its life
 *   contributedBy      who made it
 *
 * And one thing that is more important than all four:
 *
 *   humanStory         the specific, irreplaceable person
 *                      whose creative life this content
 *                      represents
 *
 * The humanStory field is not metadata.
 * It is the Hilda Ogden field.
 * It is what makes this content impossible to replicate
 * because it carries the specific person who made it.
 *
 * "Audience love like theirs can't be manufactured
 *  on a production schedule."
 *  — on Coronation Street, 2025
 *
 * Build the infrastructure that makes that love
 * possible to record, to surface, and to keep.
 * ─────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────
// PROGRAMME REGISTRY
// Every programme on the platform.
// Used for type-safe cross-programme routing.
// ─────────────────────────────────────────

export type ProgrammeId =
  | 'pageturners'
  | 'gtechcasters'
  | 'techreneurs'
  | 'stemgeneers'
  | 'kaywanas-court'
  | 'silk-stilettos'
  | 'bright-sparks'
  | 'auntie-anansis-kitchen'
  | 'rayd-yo'
  | 'joystick'
  | 'knowledge-commons'
  | 'oral-history'
  | 'trubble-n-bass'
  | 'community';            // content that belongs to no single programme

export const PROGRAMME_LABELS: Record<ProgrammeId, string> = {
  'pageturners':             'Pageturners',
  'gtechcasters':            'G-Tech Casters',
  'techreneurs':             'TECHreneurs',
  'stemgeneers':             'STEMgeneers',
  'kaywanas-court':          "Kaywana's Court",
  'silk-stilettos':          'Silk Stilettos',
  'bright-sparks':           'Bright Sparks',
  'auntie-anansis-kitchen':  "Auntie Anansi's Kitchen",
  'rayd-yo':                 'Rayd-yo',
  'joystick':                'Joystick',
  'knowledge-commons':       'Knowledge Commons',
  'oral-history':            'Oral History',
  'trubble-n-bass':          'Trubble n Bass',
  'community':               'Community',
};

export const PROGRAMME_COLOURS: Record<ProgrammeId, string> = {
  'pageturners':             '#c0392b',   // red ink
  'gtechcasters':            '#2980b9',   // broadcast blue
  'techreneurs':             '#27ae60',   // enterprise green
  'stemgeneers':             '#8e44ad',   // science violet
  'kaywanas-court':          '#d4a853',   // gold
  'silk-stilettos':          '#e91e8c',   // fashion pink
  'bright-sparks':           '#f39c12',   // warm amber
  'auntie-anansis-kitchen':  '#e67e22',   // spice orange
  'rayd-yo':                 '#3ecfcf',   // broadcast teal
  'joystick':                '#1a1612',   // ink
  'knowledge-commons':       '#9b7fe8',   // archive purple
  'oral-history':            '#6c5ce7',   // testimony indigo
  'trubble-n-bass':          '#00b894',   // bass green
  'community':               '#636e72',   // neutral
};

// ─────────────────────────────────────────
// CONTENT STATUS
// The lifecycle of a piece of platform content.
// These are not administrative states — they are
// milestones in a creative life.
// ─────────────────────────────────────────

export type ContentStatus =
  | 'seed'          // an idea, a prompt, a starting point — not yet writing
  | 'draft'         // being written — private, belongs to the creator
  | 'developing'    // in workshop or programme development — shared with facilitators
  | 'submitted'     // formally submitted to a programme or publication
  | 'in-review'     // editorial or production review
  | 'rehearsing'    // for performance content — in rehearsal at Kaywana's Court
  | 'scheduled'     // accepted, scheduled for broadcast or publication
  | 'published'     // live — in Joystick, the Knowledge Commons, or Oral History
  | 'broadcast'     // on air — Rayd-yo or performed at Kaywana's Court
  | 'archived';     // permanent record — the content has completed its journey

export const STATUS_LABELS: Record<ContentStatus, string> = {
  'seed':       'Seed',
  'draft':      'Draft',
  'developing': 'In development',
  'submitted':  'Submitted',
  'in-review':  'In review',
  'rehearsing': 'Rehearsing',
  'scheduled':  'Scheduled',
  'published':  'Published',
  'broadcast':  'Broadcast',
  'archived':   'Archived',
};

export const STATUS_COLOURS: Record<ContentStatus, string> = {
  'seed':       '#95a5a6',
  'draft':      '#7f8c8d',
  'developing': '#f39c12',
  'submitted':  '#3498db',
  'in-review':  '#9b59b6',
  'rehearsing': '#e67e22',
  'scheduled':  '#1abc9c',
  'published':  '#27ae60',
  'broadcast':  '#3ecfcf',
  'archived':   '#d4a853',
};

// ─────────────────────────────────────────
// CONTENT FORMAT
// What kind of thing it is.
// ─────────────────────────────────────────

export type ContentFormat =
  | 'story'               // fiction, short story, flash fiction
  | 'poem'                // poetry, dub poetry, spoken word
  | 'script'              // stage, screen, or radio script
  | 'essay'               // personal essay, opinion, critical piece
  | 'long-read'           // long-form journalism or narrative non-fiction
  | 'investigative'       // research and investigative journalism
  | 'profile'             // biographical — Knowledge Commons or Joystick
  | 'testimony'           // oral history — first-person community testimony
  | 'interview'           // conducted interview
  | 'review'              // book, film, show, music review
  | 'debate'              // G-Tech Casters structured debate
  | 'research'            // archival or academic research
  | 'broadcast-segment'   // Rayd-yo segment — packaged audio
  | 'performance-piece'   // Kaywana's Court — live performance text
  | 'game-narrative'      // interactive story or LARP scenario
  | 'anansi-retelling'    // retelling of an Anansi or heritage story
  | 'seed';               // a prompt or starting point — not yet content

// ─────────────────────────────────────────
// HUMAN STORY
//
// This is the centre of the model.
//
// Not a user record. Not a contributor ID.
// The specific, irreplaceable person whose
// creative life this content represents —
// written in their own voice, or by someone
// who knows them, in language that carries
// who they are.
//
// "Marcus, age 14, Bright Sparks cohort 2,
//  who heard the spider story and decided
//  Anansi would have a different opinion
//  about TikTok."
//
// That sentence cannot be generated by an
// algorithm. It has to be written by a person
// who was in the room. That is its value.
// ─────────────────────────────────────────

export interface HumanStory {
  // The name they want to be known by on the platform.
  // May be first name only, a full name, or a chosen name.
  displayName: string;

  // Their age at time of creation — optional, always their choice to share.
  // For Bright Sparks content this is often the most important field:
  // "written at age 12" is a fact that changes how the work is received.
  ageAtCreation?: number;

  // Which programme cohort they were part of when this was made.
  // "Pageturners cohort 3" or "Bright Sparks, autumn 2025"
  cohort?: string;

  // Their heritage connection — always their own words, never assumed.
  // "Antiguan roots, third generation Wembley"
  // "Guyanese-British, born here, grandmother from Georgetown"
  heritageNote?: string;

  // The one-sentence story of how this piece came to exist.
  // Written by a facilitator, a mentor, or the creator themselves.
  // This is the Hilda Ogden sentence.
  //
  // "Marcus heard the spider story and decided Anansi
  //  would have a different opinion about TikTok."
  //
  // "Eunice, 78, described the house on Harlesden Road
  //  for the first time in sixty years."
  //
  // "Felicia wrote the essay she couldn't write at school
  //  because she didn't know the words were allowed to be hers."
  //
  // If this field is empty, the connective tissue has failed.
  // This sentence must be written before content is published.
  originStory: string;

  // Where their creative journey on the platform started.
  // "First heard an Anansi story in the Kitchen, age 8"
  // "Came to Pageturners after a Rayd-yo broadcast"
  // "Been on the platform since the beginning — founding member"
  platformOrigin?: string;

  // Whether they want this human story displayed publicly.
  // Default: true for published content.
  // Always false for testimony until consent is confirmed.
  isPublic: boolean;
}

// ─────────────────────────────────────────
// JOURNEY STOP
// One step in the content's journey
// through the platform's programmes.
// ─────────────────────────────────────────

export interface JourneyStop {
  // Which programme this stop belongs to
  programme: ProgrammeId;

  // What happened at this stop
  action:
    | 'originated'      // this is where it started
    | 'developed'       // worked on here — workshop, feedback, iteration
    | 'performed'       // performed live — Kaywana's Court
    | 'broadcast'       // aired — Rayd-yo
    | 'published'       // went live — Joystick, Knowledge Commons
    | 'archived'        // entered permanent record
    | 'inspired';       // this content inspired other content — the lineage continues

  // When this happened
  date: string;         // ISO date string

  // A short note about what this stop meant.
  // Not required but powerful when present.
  // "Performed to 40 people at the spring showcase"
  // "Revised after feedback from the Knowledge Commons editorial team"
  // "Broadcast on Rayd-yo's Sunday morning heritage slot"
  note?: string;

  // If this stop resulted in a URL or reference
  url?: string;
}

// ─────────────────────────────────────────
// CROSS-PROGRAMME CONNECTION
// A named relationship between this content
// and something else on the platform.
// ─────────────────────────────────────────

export interface CrossProgrammeConnection {
  // The type of connection
  type:
    | 'research-source'     // this content drew on this as research
    | 'inspired-by'         // this content was inspired by
    | 'responds-to'         // this content is a direct response to
    | 'continues'           // this is the next chapter, episode, or instalment
    | 'performs'            // this is the performed version of a written piece
    | 'broadcasts'          // this is the broadcast version
    | 'archives'            // this is the archived form of a live event
    | 'seeds'               // this content seeded other content
    | 'extends-archive';    // this adds to a Knowledge Commons profile

  // The programme the connected content lives in
  programme: ProgrammeId;

  // The ID of the connected content
  contentId: string;

  // Human-readable label for display
  label: string;
}

// ─────────────────────────────────────────
// PLATFORM CONTENT
// The core interface. Everything implements this.
//
// Designed to be extended, not replaced.
// A Joystick article is PlatformContent + JoystickArticle.
// A Rayd-yo broadcast is PlatformContent + BroadcastSegment.
// A Knowledge Commons profile is PlatformContent + ExcellenceProfile.
// ─────────────────────────────────────────

export interface PlatformContent {
  // ── Identity ──────────────────────────────
  id: string;
  title: string;
  format: ContentFormat;

  // ── Human Story ───────────────────────────
  // The centre of the model.
  // Required before status reaches 'published' or 'broadcast'.
  humanStory: HumanStory;

  // ── Programme Provenance ──────────────────
  originProgramme: ProgrammeId;

  // Which other programmes this content is relevant to.
  // Not "which programmes should see this eventually"
  // but "which programmes would use this now."
  relevantProgrammes: ProgrammeId[];

  // ── Lifecycle ─────────────────────────────
  status: ContentStatus;
  createdAt: string;         // ISO date string
  updatedAt: string;         // ISO date string
  publishedAt?: string;      // ISO date string — when it went live

  // ── Journey ───────────────────────────────
  // The ordered record of every programme
  // this content has passed through.
  // The journey is the story of the connective tissue working.
  journey: JourneyStop[];

  // ── Cross-Programme Connections ───────────
  connections: CrossProgrammeConnection[];

  // ── Tags ──────────────────────────────────
  // Freeform tags for search and discovery.
  // Should include heritage tags, theme tags, and technique tags.
  tags: string[];

  // ── Knowledge Commons Integration ─────────
  // If this content connects to a Knowledge Commons profile,
  // name it here. The archive knows about the content.
  // The content knows about the archive.
  archiveProfileId?: string;

  // ── Revenue ───────────────────────────────
  // The 55/25/20 split, applied per content item.
  // Not present on all content — only on published/broadcast content
  // where revenue is tracked.
  revenue?: {
    creatorShare: 55;         // always 55%
    platformShare: 25;        // always 25%
    programmeShare: 20;       // always 20%
    totalEarned?: number;     // in pence — updated as revenue accrues
    currency: 'GBP';
  };
}

// ─────────────────────────────────────────
// CONTENT JOURNEY SUMMARY
// A condensed view of a piece of content's
// journey — used for display in badges,
// social media cards, and programme feeds.
// ─────────────────────────────────────────

export interface ContentJourneySummary {
  contentId: string;
  title: string;
  format: ContentFormat;
  humanStory: HumanStory;
  originProgramme: ProgrammeId;
  currentStatus: ContentStatus;
  journeyHighlights: JourneyStop[];  // the 2–3 most significant stops
  connections: CrossProgrammeConnection[];
  publishedAt?: string;
}

// ─────────────────────────────────────────
// ANANSI SEED
// A story seed from the Anansi / heritage
// tradition that routes into the Pageturners
// Story Starter and flags for Rayd-yo.
//
// The Bright Sparks entry point.
// The Kitchen's connection to the living tradition.
// The platform's shortest path from hearing
// a story to making one.
// ─────────────────────────────────────────

export interface AnansiSeed {
  id: string;

  // The source story
  sourceStory: string;       // e.g. "Anansi and the Box of Stories"
  sourceTradition: string;   // e.g. "Akan / Ashanti oral tradition"

  // The seed — the writing prompt
  seedPrompt: string;

  // The extended prompt for older writers (Pageturners)
  pageturnerPrompt: string;

  // The simplified prompt for younger writers (Bright Sparks)
  brightSparksPrompt: string;

  // Which technique this seed develops
  techniqueFocus: string;   // e.g. "Technique 03: High Stakes"

  // The Knowledge Commons connection
  archiveConnection?: {
    profileId: string;
    profileName: string;
    connectionNote: string;
  };

  // Whether this seed has been broadcast on Rayd-yo
  broadcastOnRadyo: boolean;
  raydyoEpisodeId?: string;

  // Age range
  ageRange: 'all' | 'bright-sparks' | 'pageturners';

  // The emotional truth this seed asks for
  emotionalCore: string;
}

// ─────────────────────────────────────────
// CONTENT FEED ITEM
// How content appears in cross-programme feeds:
// the Rayd-yo listener feed, the Joystick
// editorial queue, the Pageturners gallery,
// the social media content engine.
// ─────────────────────────────────────────

export interface ContentFeedItem {
  content: ContentJourneySummary;

  // The social media post this content generates automatically.
  // Written from the humanStory — this is the post that
  // carries a specific person's story, not a feature announcement.
  socialPost: {
    short: string;    // 280 chars — Twitter/X
    medium: string;   // 500 chars — Instagram caption
    long: string;     // Full — LinkedIn or newsletter
  };

  // The Rayd-yo intro — how a presenter introduces this content
  // when it airs. Written from the humanStory.
  raydyoIntro?: string;
}

// ─────────────────────────────────────────
// PROGRAMME CONTENT STATS
// Aggregate data for programme dashboards.
// Answers: how many journeys have completed?
// How many pieces have crossed programmes?
// How many human stories have been told?
// ─────────────────────────────────────────

export interface ProgrammeContentStats {
  programmeId: ProgrammeId;
  totalContent: number;
  publishedContent: number;
  broadcastContent: number;
  crossProgrammeContent: number;   // content that has visited 2+ programmes
  completedJourneys: number;       // content that has reached 'archived' status
  activeHumanStories: number;      // unique contributors with published content
  revenueGenerated?: number;       // total in pence
}

// ─────────────────────────────────────────
// TYPE GUARDS
// ─────────────────────────────────────────

export function isPlatformContent(obj: unknown): obj is PlatformContent {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'humanStory' in obj &&
    'originProgramme' in obj &&
    'status' in obj &&
    'journey' in obj
  );
}

export function hasHumanStory(content: PlatformContent): boolean {
  return (
    content.humanStory.originStory.trim().length > 0 &&
    content.humanStory.displayName.trim().length > 0
  );
}

export function isPublishable(content: PlatformContent): boolean {
  return hasHumanStory(content) && content.connections !== undefined;
}

export function journeyLength(content: PlatformContent): number {
  return content.journey.length;
}

export function hasCrossedProgrammes(content: PlatformContent): boolean {
  const programmes = new Set([
    content.originProgramme,
    ...content.journey.map(s => s.programme),
  ]);
  return programmes.size > 1;
}

export function getJourneyHighlights(
  content: PlatformContent,
  max = 3
): JourneyStop[] {
  // Priority order: originated → performed/broadcast/published → archived
  const priority: Record<JourneyStop['action'], number> = {
    originated: 5,
    broadcast:  4,
    published:  4,
    performed:  3,
    archived:   3,
    developed:  2,
    inspired:   2,
  };
  return [...content.journey]
    .sort((a, b) => (priority[b.action] ?? 0) - (priority[a.action] ?? 0))
    .slice(0, max);
}

// ─────────────────────────────────────────
// FACTORY HELPERS
// Create well-formed content objects
// with required fields defaulted correctly.
// ─────────────────────────────────────────

export function createPlatformContent(params: {
  id: string;
  title: string;
  format: ContentFormat;
  originProgramme: ProgrammeId;
  creatorName: string;
  originStory: string;
  cohort?: string;
  heritageNote?: string;
  ageAtCreation?: number;
  platformOrigin?: string;
  tags?: string[];
  archiveProfileId?: string;
}): PlatformContent {
  const now = new Date().toISOString();
  return {
    id: params.id,
    title: params.title,
    format: params.format,
    humanStory: {
      displayName:     params.creatorName,
      ageAtCreation:   params.ageAtCreation,
      cohort:          params.cohort,
      heritageNote:    params.heritageNote,
      originStory:     params.originStory,
      platformOrigin:  params.platformOrigin,
      isPublic:        true,
    },
    originProgramme:    params.originProgramme,
    relevantProgrammes: [],
    status:             'draft',
    createdAt:          now,
    updatedAt:          now,
    journey: [
      {
        programme: params.originProgramme,
        action:    'originated',
        date:      now,
        note:      `Created in ${PROGRAMME_LABELS[params.originProgramme]}`,
      },
    ],
    connections:       [],
    tags:              params.tags ?? [],
    archiveProfileId:  params.archiveProfileId,
  };
}

export function advanceJourney(
  content: PlatformContent,
  programme: ProgrammeId,
  action: JourneyStop['action'],
  note?: string,
  url?: string
): PlatformContent {
  const now = new Date().toISOString();
  const newStop: JourneyStop = {
    programme,
    action,
    date: now,
    note,
    url,
  };

  // Status transitions based on action
  const statusMap: Partial<Record<JourneyStop['action'], ContentStatus>> = {
    performed:  'broadcast',
    broadcast:  'broadcast',
    published:  'published',
    archived:   'archived',
  };

  return {
    ...content,
    status:    statusMap[action] ?? content.status,
    updatedAt: now,
    publishedAt: (action === 'published' || action === 'broadcast')
      ? now
      : content.publishedAt,
    journey: [...content.journey, newStop],
    relevantProgrammes: content.relevantProgrammes.includes(programme)
      ? content.relevantProgrammes
      : [...content.relevantProgrammes, programme],
  };
}

// ─────────────────────────────────────────
// SOCIAL POST GENERATOR
// Generates the social media post from the
// humanStory — not from the content features.
// The human story is always the hook.
// ─────────────────────────────────────────

export function generateSocialPost(content: PlatformContent): ContentFeedItem['socialPost'] {
  const { humanStory, title, format, journey, originProgramme } = content;
  const programme = PROGRAMME_LABELS[originProgramme];
  const broadcasts = journey.filter(s => s.action === 'broadcast' || s.action === 'performed');
  const hasReachedAudience = broadcasts.length > 0;

  const short = hasReachedAudience
    ? `${humanStory.originStory} Now ${format === 'broadcast-segment' ? 'on air' : 'published'}: "${title}" — ${programme}`
    : `"${title}" — ${humanStory.originStory} (${programme})`;

  const medium = [
    humanStory.originStory,
    hasReachedAudience
      ? `That story is now ${format === 'broadcast-segment' ? 'on Rayd-yo' : 'published on the platform'}: "${title}".`
      : `"${title}" is in development in ${programme}.`,
    humanStory.heritageNote ? `${humanStory.displayName} — ${humanStory.heritageNote}.` : '',
    humanStory.cohort ? `Part of ${humanStory.cohort}.` : '',
  ].filter(Boolean).join(' ');

  const long = [
    humanStory.originStory,
    '',
    `"${title}" ${hasReachedAudience
      ? `is now ${format === 'broadcast-segment' ? 'airing on Rayd-yo' : 'published'}.`
      : `is being developed in ${programme}.`}`,
    '',
    journey.length > 1
      ? `The journey so far: ${journey.map(s => `${PROGRAMME_LABELS[s.programme]} (${s.action})`).join(' → ')}.`
      : '',
    '',
    `${humanStory.heritageNote ? `${humanStory.displayName}: ${humanStory.heritageNote}.` : ''}`,
    humanStory.platformOrigin ? `Started here: ${humanStory.platformOrigin}.` : '',
  ].filter(Boolean).join('\n');

  return { short, medium, long };
}

// ─────────────────────────────────────────
// RAYD-YO INTRO GENERATOR
// How a presenter introduces this content.
// Always from the humanStory. Always specific.
// ─────────────────────────────────────────

export function generateRadyoIntro(content: PlatformContent): string {
  const { humanStory, title, format } = content;

  const formatLabel: Partial<Record<ContentFormat, string>> = {
    'story':            'a story',
    'poem':             'a poem',
    'script':           'a piece',
    'essay':            'an essay',
    'testimony':        'a testimony',
    'anansi-retelling': 'a retelling',
    'broadcast-segment':'a piece',
    'performance-piece':'a performance',
  };

  const label = formatLabel[format] ?? 'a piece';
  const age = humanStory.ageAtCreation
    ? `, who was ${humanStory.ageAtCreation} when they wrote this,`
    : '';

  return [
    `You're listening to Rayd-yo.`,
    `What you're about to hear is ${label} called "${title}"`,
    `by ${humanStory.displayName}${age}.`,
    humanStory.originStory,
    humanStory.heritageNote ? `${humanStory.displayName} — ${humanStory.heritageNote}.` : '',
  ].filter(Boolean).join(' ');
}