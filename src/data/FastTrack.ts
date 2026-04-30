/*
 * FastTrack.ts
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Fast Track Production Protocol
 * Company No. 12960817
 *
 * THE COTTON CLUB PROTOCOL
 *
 * The Cotton Club had a standard.
 * Not everyone got on that stage.
 * But the gate was the quality of what was in the room —
 * not the approval of an institution that wasn't built
 * for the people performing.
 *
 * The Fast Track is the two-week production cycle
 * for first-response content: call-and-response culture
 * meeting craftsmanship meeting the feedback loop.
 *
 * It is not a simplified pathway.
 * It is not a children's version.
 * It is a different form — the form where the performance
 * happens in the room and the room responds in real time.
 *
 * Duke Ellington didn't perform simplified versions
 * at the Cotton Club because the audience was mixed.
 * He performed the real thing at the tempo the room required.
 *
 * TWO WEEKS. SEED TO BROADCAST.
 *
 * Day 1–2:   The call — seed, first draft, originStory written
 * Day 3–7:   One round of craft — one technique, one pass
 * Day 8–10:  Format and production — record, edit, or copy-edit
 * Day 11–12: The originStory final check — the gate
 * Day 13–14: Broadcast or publish — and the response activates
 *
 * The gate is not "is this good enough."
 * The gate is "is this piece ready to survive
 * contact with the room?"
 *
 * The cream rises because the room demands it.
 * The room is the community, not the mainstream.
 * ─────────────────────────────────────────────────────────────
 */

import { ProgrammeId, ContentFormat } from '../types/platform-content';

// ─────────────────────────────────────────
// FAST TRACK CONTENT TYPES
// What qualifies for the Fast Track.
// Deliberately constrained — not everything
// belongs here. The Fast Track is for
// first-response, immediate-voice content.
// ─────────────────────────────────────────

export type FastTrackFormat =
  | 'anansi-retelling'      // 200–500 words — the Bright Sparks entry point
  | 'response-poem'         // spoken or written — direct response to archive/seed
  | 'flash-story'           // 200–600 words — one scene, complete world
  | 'personal-response'     // 200–500 words — honest, immediate, first-person
  | 'broadcast-minute'      // 1–3 mins audio — produced for Rayd-yo
  | 'community-voice'       // 100–300 words — short, sharp, opinionated
  | 'character-sketch';     // 200–400 words — one character, fully inhabited

export const FAST_TRACK_FORMAT_LABELS: Record<FastTrackFormat, string> = {
  'anansi-retelling':  'Anansi Retelling',
  'response-poem':     'Response Poem',
  'flash-story':       'Flash Story',
  'personal-response': 'Personal Response',
  'broadcast-minute':  'Broadcast Minute',
  'community-voice':   'Community Voice',
  'character-sketch':  'Character Sketch',
};

export const FAST_TRACK_FORMAT_DESCRIPTIONS: Record<FastTrackFormat, string> = {
  'anansi-retelling':  'A retelling of an Anansi or heritage story in your own voice. The tradition is the source. You are the continuation.',
  'response-poem':     'A poem written in direct response to something in the Knowledge Commons, on Rayd-yo, or in the world. The call came first. This is the response.',
  'flash-story':       'One scene. One moment. One change. Complete in itself.',
  'personal-response': 'What you actually think and feel about something specific. Not the polished version. The honest one.',
  'broadcast-minute':  'Written to be spoken aloud on Rayd-yo. 1–3 minutes. The room is listening.',
  'community-voice':   'Short, sharp, specific. An observation, an argument, a question the community needs to hear.',
  'character-sketch':  'One character, fully inhabited. Not described — inhabited. Felicity Ethnic\'s method.',
};

// ─────────────────────────────────────────
// FAST TRACK CONTENT LIMITS
// The constraint is the form.
// ─────────────────────────────────────────

export const FAST_TRACK_LIMITS: Record<FastTrackFormat, {
  minWords: number;
  maxWords: number;
  minMinutes?: number;
  maxMinutes?: number;
  note: string;
}> = {
  'anansi-retelling':  { minWords: 150, maxWords: 500,  note: 'The length of a story told by firelight.' },
  'response-poem':     { minWords: 50,  maxWords: 300,  note: 'Long enough to land. Short enough to remember.' },
  'flash-story':       { minWords: 200, maxWords: 600,  note: 'One scene. If it needs more, it\'s a different piece.' },
  'personal-response': { minWords: 150, maxWords: 500,  note: 'The honest version, not the polished one.' },
  'broadcast-minute':  { minWords: 120, maxWords: 420,  minMinutes: 1, maxMinutes: 3, note: '150 words ≈ 1 minute at natural speaking pace.' },
  'community-voice':   { minWords: 80,  maxWords: 300,  note: 'If it needs more than 300 words it needs an editor, not a Fast Track.' },
  'character-sketch':  { minWords: 150, maxWords: 400,  note: 'The character should be recognisable. Not described — inhabited.' },
};

// ─────────────────────────────────────────
// FAST TRACK TECHNIQUE
// Each format has ONE technique focus.
// Not the full curriculum.
// The technique that makes this specific
// piece land harder.
// ─────────────────────────────────────────

export const FAST_TRACK_TECHNIQUE: Record<FastTrackFormat, {
  number: string;
  name: string;
  application: string;
}> = {
  'anansi-retelling': {
    number: '01',
    name: 'Narrative Momentum',
    application: 'Every sentence moves. The story doesn\'t breathe until the end.',
  },
  'response-poem': {
    number: '06',
    name: 'Controlled Pacing',
    application: 'The line break is everything. Where you pause is where the reader feels it.',
  },
  'flash-story': {
    number: '04',
    name: 'Tension-Driven Scenes',
    application: 'Want. Obstacle. Change. The scene ends differently from how it began.',
  },
  'personal-response': {
    number: 'A',
    name: 'Emotional Truth',
    application: 'Not the polished version. The accurate one. No hedging.',
  },
  'broadcast-minute': {
    number: '06',
    name: 'Controlled Pacing',
    application: 'Write for the ear, not the eye. Read it aloud three times before it\'s done.',
  },
  'community-voice': {
    number: '02',
    name: 'Strategic Questions',
    application: 'Open with the question. Don\'t answer it cleanly. Leave the room thinking.',
  },
  'character-sketch': {
    number: '07',
    name: 'Emotional Investment',
    application: 'Before you put the character in a situation, make the reader love them. Twenty seconds to do it.',
  },
};

// ─────────────────────────────────────────
// FAST TRACK DESTINATIONS
// Where each format goes after the two weeks.
// Not a choice — a route.
// ─────────────────────────────────────────

export const FAST_TRACK_DESTINATIONS: Record<FastTrackFormat, {
  primary: ProgrammeId;
  secondary?: ProgrammeId;
  label: string;
  note: string;
}> = {
  'anansi-retelling':  {
    primary:   'rayd-yo',
    secondary: 'auntie-anansis-kitchen',
    label:     'Rayd-yo broadcast + Kitchen archive',
    note:      'Heard on air. Stored in the tradition. Both at once.',
  },
  'response-poem':     {
    primary:   'rayd-yo',
    secondary: 'joystick',
    label:     'Rayd-yo broadcast or Joystick',
    note:      'Spoken word belongs on air first. Published second if the room calls for it.',
  },
  'flash-story':       {
    primary:   'joystick',
    label:     'Joystick — Flash Fiction',
    note:      'Published the week it\'s written. The room reads it.',
  },
  'personal-response': {
    primary:   'joystick',
    label:     'Joystick — Personal Essay',
    note:      'The honest version, published. The community recognises it.',
  },
  'broadcast-minute':  {
    primary:   'rayd-yo',
    label:     'Rayd-yo — live broadcast',
    note:      'Written for air. Goes on air. The response comes from the room.',
  },
  'community-voice':   {
    primary:   'joystick',
    secondary: 'rayd-yo',
    label:     'Joystick — Community Voice',
    note:      'Short, sharp, published immediately. Can be read on air.',
  },
  'character-sketch':  {
    primary:   'kaywanas-court',
    secondary: 'joystick',
    label:     "Kaywana's Court or Joystick",
    note:      'A character sketch that lives off the page belongs on a stage.',
  },
};

// ─────────────────────────────────────────
// THE FOURTEEN-DAY PROTOCOL
// The production timeline for facilitators.
// Not a guideline — a protocol.
// Every step has a named output.
// ─────────────────────────────────────────

export interface FastTrackDay {
  days: string;           // e.g. "1–2"
  phase: string;          // e.g. "The Call"
  description: string;
  facilitatorAction: string;
  creatorAction: string;
  output: string;         // what exists at the end of this phase
  gateCheck?: string;     // if present, content cannot proceed without this
}

export const FOURTEEN_DAY_PROTOCOL: FastTrackDay[] = [
  {
    days: '1–2',
    phase: 'The Call',
    description: 'The seed lands. The creator responds immediately. First draft written in the session — raw, unpolished, real. The facilitator writes the originStory the same day.',
    facilitatorAction: 'Present the seed or archive prompt. Give 20 minutes of uninterrupted writing time. While the creator writes, write the originStory. One sentence. Specific. True.',
    creatorAction: 'Write. Don\'t stop. Don\'t edit. Don\'t perform. The first response is the real one.',
    output: 'A raw first draft. A completed originStory field. Both exist before Day 3.',
    gateCheck: 'The originStory must be written before Day 3. If it isn\'t, the Fast Track has not started.',
  },
  {
    days: '3–7',
    phase: 'One Technique. One Pass.',
    description: 'Not the full Pageturners pathway. The one technique that will make this specific piece land harder. One round of facilitated feedback. No rewrites — refinements.',
    facilitatorAction: 'Identify the single technique most relevant to this piece. Apply it with the creator in one session. Read the piece aloud before and after. The difference should be audible.',
    creatorAction: 'Take the facilitated feedback. Apply one change at a time. Read aloud after each change. Trust your ear.',
    output: 'A second draft that is audibly better than the first. The technique is present. The voice is still the creator\'s.',
  },
  {
    days: '8–10',
    phase: 'Format and Production',
    description: 'For Rayd-yo: record. One take, one edit. The rawness is part of it. For Joystick: one light editorial pass. Accuracy, clarity, the ending. No rewrites.',
    facilitatorAction: 'For audio: set up the recording space. One microphone, one quiet room. Read the broadcast intro aloud before recording — the creator hears how it sounds. For text: one pass for accuracy and the ending. Nothing else.',
    creatorAction: 'For audio: perform it, don\'t recite it. For text: read it aloud one final time before submitting.',
    output: 'A production-ready piece. Audio file or final text. Both are complete.',
  },
  {
    days: '11–12',
    phase: 'The originStory Final Check',
    description: 'The gate. The facilitator reads the originStory aloud. If it doesn\'t sound like a sentence a human being would say about a specific human being, it isn\'t finished. This is the only gate. Not editorial quality. Not production standard. The human story.',
    facilitatorAction: 'Read the originStory aloud to the creator. Ask: does this sound like you? Does this sound like someone who was in the room? If the answer is no, rewrite it together. Ten minutes. No more.',
    creatorAction: 'Listen. Does the originStory sound like your story? If not, correct it. You have the right.',
    output: 'A confirmed originStory. The piece is cleared for broadcast or publication.',
    gateCheck: 'Nothing publishes or broadcasts without a confirmed originStory. This is not negotiable. This is the Cotton Club principle: the room must know who is performing.',
  },
  {
    days: '13–14',
    phase: 'Broadcast or Publish — and the Response',
    description: 'The piece goes on Rayd-yo or into Joystick. The social post goes out simultaneously. The response mechanism activates: the next session begins with hearing it together. The facilitator asks one question.',
    facilitatorAction: 'Schedule the broadcast or publish the piece. Post the social content — the originStory is the caption, not a feature announcement. In the next session: play or read the published piece to the group. Ask one question.',
    creatorAction: 'Hear your work in the room. That is the moment. The response is the next call.',
    output: 'A broadcast or published piece. A social post that carries the human story. A room that has responded. The loop is live.',
  },
];

// ─────────────────────────────────────────
// FAST TRACK PROGRAMME AVAILABILITY
// Which programmes can run Fast Track.
// Not all programmes produce Fast Track content —
// the form requires immediate-voice material
// and a facilitator who was in the room.
// ─────────────────────────────────────────

export const FAST_TRACK_PROGRAMMES: ProgrammeId[] = [
  'pageturners',
  'bright-sparks',
  'auntie-anansis-kitchen',
  'kaywanas-court',
  'gtechcasters',
  'oral-history',
];

// ─────────────────────────────────────────
// FAST TRACK SEED SOURCES
// What can trigger a Fast Track piece.
// ─────────────────────────────────────────

export type FastTrackTrigger =
  | 'anansi-seed'           // from anansiSeeds.ts
  | 'archive-profile'       // response to a Knowledge Commons profile
  | 'raydyo-broadcast'      // response to something heard on Rayd-yo
  | 'community-event'       // response to something that happened in the community
  | 'joystick-piece'        // response to a published Joystick article
  | 'facilitator-prompt'    // a prompt set by the facilitator in session
  | 'free-call';            // the creator heard a call and is responding

export const FAST_TRACK_TRIGGER_LABELS: Record<FastTrackTrigger, string> = {
  'anansi-seed':        'Anansi seed',
  'archive-profile':    'Knowledge Commons profile',
  'raydyo-broadcast':   'Rayd-yo broadcast',
  'community-event':    'Community event',
  'joystick-piece':     'Joystick article',
  'facilitator-prompt': 'Facilitator prompt',
  'free-call':          'Open call',
};

// ─────────────────────────────────────────
// FAST TRACK SUBMISSION
// The record of a Fast Track piece
// as it moves through the protocol.
// ─────────────────────────────────────────

export interface FastTrackSubmission {
  id: string;
  contentId: string;           // links to PlatformContent

  // Format and trigger
  format: FastTrackFormat;
  trigger: FastTrackTrigger;
  triggerId?: string;          // e.g. anansi seed ID, archive profile ID

  // Programme
  programme: ProgrammeId;
  cohort?: string;

  // Protocol tracking
  currentPhase: number;        // 1–5 corresponding to FOURTEEN_DAY_PROTOCOL
  startDate: string;           // ISO — Day 1
  targetBroadcastDate: string; // ISO — Day 13–14

  // Gate checks
  originStoryConfirmed: boolean;
  productionComplete: boolean;
  facilitatorSignoff: boolean;

  // The originStory — stored here as well as on PlatformContent
  // so facilitators can see it in the Fast Track dashboard
  originStory: string;

  // Notes
  facilitatorNotes?: string;
  techniqueApplied: string;
}

// ─────────────────────────────────────────
// FAST TRACK STATS
// What has the Fast Track produced?
// The answer to: "does it work?"
// ─────────────────────────────────────────

export interface FastTrackStats {
  totalSubmissions: number;
  completedBroadcasts: number;
  completedPublications: number;
  averageDaysToCompletion: number;
  originStoriesConfirmed: number;  // how many had confirmed originStories
  crossProgrammeJourneys: number;  // how many crossed more than one programme
  byFormat: Record<FastTrackFormat, number>;
  byProgramme: Partial<Record<ProgrammeId, number>>;
  byTrigger: Record<FastTrackTrigger, number>;
  mostActiveCohort?: string;
  firstBroadcastDate?: string;     // the moment the Cotton Club opened
}

// ─────────────────────────────────────────
// FAST TRACK RESPONSE RECORD
// The call and response loop, documented.
// When a Fast Track piece produces a response —
// a reply piece, a conversation, another Fast Track —
// that connection is recorded here.
// ─────────────────────────────────────────

export interface FastTrackResponse {
  originalContentId: string;
  responseContentId: string;
  responseType:
    | 'reply-piece'      // another Fast Track piece directly responding
    | 'conversation'     // documented discussion at 452 High Road
    | 'social-response'  // community response via social media
    | 'further-journey'  // the piece entered a longer pathway (Pageturners full track)
    | 'archive-addition';// the piece triggered a Knowledge Commons nomination
  date: string;
  note?: string;
}

// ─────────────────────────────────────────
// HELPER — The Cotton Club check
// Before a Fast Track piece is cleared,
// ask the Cotton Club question:
// "Is the room ready to hear this?"
// Not: "Is this good enough?"
// The difference is everything.
// ─────────────────────────────────────────

export function cottonClubCheck(submission: FastTrackSubmission): {
  cleared: boolean;
  blockers: string[];
  readyForRoom: boolean;
} {
  const blockers: string[] = [];

  if (!submission.originStoryConfirmed) {
    blockers.push(
      'originStory not confirmed. ' +
      'The room must know who is performing. ' +
      'Write the originStory first.'
    );
  }

  if (!submission.productionComplete) {
    blockers.push('Production not complete. Read it aloud one more time.');
  }

  if (!submission.facilitatorSignoff) {
    blockers.push(
      'Facilitator signoff pending. ' +
      'The facilitator who was in the room must confirm ' +
      'the piece is ready to survive contact with the room.'
    );
  }

  const daysSinceStart = Math.floor(
    (Date.now() - new Date(submission.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceStart > 14) {
    blockers.push(
      `This piece has been in production for ${daysSinceStart} days. ` +
      'The Fast Track is a two-week protocol. ' +
      'If it needs more time, it belongs on the full Pageturners pathway, not the Fast Track. ' +
      'Move it, or make a decision.'
    );
  }

  const cleared = blockers.length === 0;

  return {
    cleared,
    blockers,
    // "Ready for the room" is a separate judgment from "cleared"
    // A piece can be technically cleared but not room-ready.
    // The facilitator makes this call. The system records it.
    readyForRoom: cleared && submission.facilitatorSignoff,
  };
}

// ─────────────────────────────────────────
// FAST TRACK MANIFESTO
// Displayed on the Fast Track UI.
// ─────────────────────────────────────────

export const FAST_TRACK_MANIFESTO = {
  headline: 'Fourteen days. Seed to broadcast.',
  subhead: 'The Cotton Club didn\'t ask permission. It set a standard.',
  body: [
    'The Fast Track is not a beginner\'s pathway. It\'s not a simplified version of the full programme. It\'s a different form — the call-and-response form, the form where the performance happens in the room and the room responds in real time.',
    'Every piece on the Fast Track is written in direct response to something: an Anansi seed, a Knowledge Commons profile, a Rayd-yo broadcast, something that happened in the community. The response is immediate. The craft is applied fast. The originStory is written the same day.',
    'The gate is not "is this good enough." The gate is whether the piece, when broadcast or published, produces a response. A piece that produces a response has risen. That\'s the Cotton Club principle: the cream rises because the room demands it. The room is the community. Not the mainstream.',
  ],
  gate: 'The only gate is the originStory. Nothing broadcasts or publishes without it. One sentence. Specific. The facilitator who was in the room writes it. That sentence is what makes the piece irreplaceable.',
  callToAction: 'Your call is waiting.',
};