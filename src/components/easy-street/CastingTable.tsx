/**
 * CastingTable.tsx — Wembley Wonders CIC · Easy Street
 * Complete rebuild — April 2026
 *
 * Changes:
 *   — John → Jackson, Marsha → Myrtle throughout
 *   — Bruk-up fully realised: girl, tomboy, Wanderers Youth midfielder
 *   — Full character data: catchphrase, essence, origin, 5C position
 *   — Avatar-or-token render: /public/characters/[id].png with fallback
 *   — Hover/tap reveal: full hint + catchphrase
 *   — ROV system prompt: relationship map, programme routing,
 *     seasonal calendar — all compressed for Afua to read
 *   — Seasonal awareness: month-aware prompt injection
 *   — 5C filter on character shelf
 */

import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import './CastingTable.css';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Character {
  id: string;
  name: string;
  role: string;
  emoji: string;
  colour: string;
  essence: string;       // short shelf line — punchy, Easy Street voice
  catchphrase: string;   // the phrase the street knows them by
  origin: string;        // cultural/geographic root
  hint: string;          // full dramatic description — hover reveal
  avatar?: string;       // /public/characters/[id].png — optional
  position5C: 'connect' | 'create' | 'change' | 'challenge' | 'control';
}

interface Location {
  id: string;
  name: string;
  emoji: string;
  description: string;
  timeOptions: string[];
}

interface StagingPayload {
  characters: string[];
  location: string;
  timeOfDay?: string;
  context?: string;
  month: number;
  season: string;
}

interface GeneratedScene {
  scene: string;
  seed: string;
  characters: string[];
  location: string;
  sessionId: string;
}

// ─── SEASONAL ────────────────────────────────────────────────────────────────

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  const map: Record<number, { season: string; seasonalNote: string }> = {
    1:  { season: 'winter', seasonalNote: 'January. Christmas money gone. Pardner hand paying out. The diabetes conversation is happening in someone\'s kitchen. The home remedies have arrived.' },
    2:  { season: 'winter', seasonalNote: 'February. Black History Month argument in full swing. Valentine\'s Day — Jackson left earlier than usual this morning.' },
    3:  { season: 'spring', seasonalNote: 'March. Easter approaching. GCSE revision season beginning. The cricket section is stirring.' },
    4:  { season: 'spring', seasonalNote: 'April. Cricket season starts. Easter production at Kaywana\'s Court. Bruk-up\'s Easter project underway.' },
    5:  { season: 'spring', seasonalNote: 'May. Exams. The street quieter than usual. The natural hair conversation starting — summer is coming.' },
    6:  { season: 'summer', seasonalNote: 'June. Exams ending. Silk Stilettos summer hair session. The summer trips home being planned.' },
    7:  { season: 'summer', seasonalNote: 'July. Summer. Relatives arriving. The gap between the story people were told and the street they find.' },
    8:  { season: 'summer', seasonalNote: 'August. Carnival approaching. Trubble n Bass has its set. Bruk-up is checking the float structure.' },
    9:  { season: 'autumn', seasonalNote: 'September. New season. Football starts. Wanderers kick off — always near the bottom. Bruk-up scored in the first match. She didn\'t celebrate.' },
    10: { season: 'autumn', seasonalNote: 'October. Black History Month UK. Joystick special issue. University enrollment. Pardner hand penultimate payout.' },
    11: { season: 'autumn', seasonalNote: 'November. Remembrance. Jackson\'s poppy in the right place from the right date. The annual doctor appointment negotiation. Aubrey hasn\'t been since 2019.' },
    12: { season: 'winter', seasonalNote: 'December. Christmas. The students home. Pardner hand final payout. Auntie Jenny\'s restaurant full from the 20th.' },
  };
  return { month, ...map[month] };
}

// ─── CHARACTER DATA ───────────────────────────────────────────────────────────

const CHARACTERS: Character[] = [
  {
    id: 'jackson',
    name: 'Jackson',
    role: 'The Husband',
    emoji: '👔',
    colour: '#8B4513',
    essence: 'Has been wrong twice in forty years. Still waiting for someone to bring it up.',
    catchphrase: "I'm not saying I was right. I'm saying I wasn't wrong.",
    origin: 'Jamaican roots, 63. Named for someone. Carries it with more weight than he would ever admit.',
    hint: 'Non-elected chair of the West Indians Cricket and Domino Club. His language is precise, formal, slightly archaic — he leans away from patois, which is its own cultural statement. Secret pride in Bruk-up expressed through technical corrections. When he drops into vernacular it is deliberate.',
    avatar: '/public/characters/jackson.png',
    position5C: 'control',
  },
  {
    id: 'myrtle',
    name: 'Myrtle',
    role: 'The Wife',
    emoji: '📋',
    colour: '#6B1F2A',
    essence: 'Keeps the actual score. Her eye across the room ends arguments.',
    catchphrase: "Mmm. Mmm-hmm. Yes. Okay. No.",
    origin: 'Trinidadian roots, 61. Named for her grandmother. Constancy, love. The whole migration in the name.',
    hint: 'Former centre midfielder, Wanderers Women\'s Team 1994-2001. Exceptional. The score she keeps at the domino table is not the domino score. Manages Jackson\'s doctor appointment via Pearl — a system refined over twenty years. Does Bruk-up\'s hair every morning: the sessions are where she tells Bruk-up things about the world. The anonymous pardner hand piece in Joystick was hers. Yaw knows.',
    avatar: '/public/characters/myrtle.png',
    position5C: 'change',
  },
  {
    id: 'pearl',
    name: 'Pearl',
    role: 'The Professional',
    emoji: '🩺',
    colour: '#4A5568',
    essence: 'Knows more about everyone than they know she knows.',
    catchphrase: "Mm. I see.",
    origin: 'Trinidadian roots, late 40s. Community health nurse. Separated from Aubrey. Don gave her permission to be happy.',
    hint: 'Holds the middle ground between Caribbean home remedies and GP prescription — understands both without choosing publicly. Eleven referrals to Akua in four years, nine resolved. The friendship with Myrtle is the one the street depends on. Has been writing something for Pageturners she hasn\'t shown anyone.',
    avatar: '/public/characters/pearl.png',
    position5C: 'create',
  },
  {
    id: 'aubrey',
    name: 'Aubrey',
    role: 'The Lateral Thinker',
    emoji: '🔍',
    colour: '#2A4A6B',
    essence: 'Fourteen jobs in eight years. Sees what nobody else sees. Then gets bored.',
    catchphrase: "Yeah Bannus — look, look, look — you see what I saying?",
    origin: 'Guyanese roots, late 40s. Banna: the Guyanese address for a man — warmer than brother, warmer than mate.',
    hint: 'Extraordinarily intelligent in ways the formal economy cannot reward. Separated from Pearl. Has been at Create in TECHreneurs for eight months — the longest he has sustained anything. Working with Akua on attribution for eight original processes across his fourteen jobs, never credited. Plays bass in Trubble n Bass. His November playing has a quality Afua has been recording without telling him.',
    avatar: '/public/characters/aubrey.png',
    position5C: 'challenge',
  },
  {
    id: 'brenda',
    name: 'Brenda',
    role: 'The Returnee',
    emoji: '✈️',
    colour: '#6B4A1A',
    essence: 'Back from Florida. Told everyone about the NHS. Forty-seven times.',
    catchphrase: "Blessed. The Lord is good.",
    origin: 'Caribbean British, early 60s. Back from Florida. Baptist fervour entirely sincere. Auntie Budgie\'s younger sister.',
    hint: 'She left. Budgie stayed. The things that happened while Brenda was away are in Budgie\'s keeping. Her fervour is announced where Budgie\'s is structural — they are not the same faith. Excellent cook: the American-Trinidadian hybrid she\'s documenting is the least complicated thing about her.',
    avatar: '/public/characters/brenda.png',
    position5C: 'create',
  },
  {
    id: 'auntie-budgie',
    name: 'Auntie Budgie',
    role: 'The Institution',
    emoji: '🎂',
    colour: '#4A1A4A',
    essence: 'Never loud. Except always loud. Just never to her face.',
    catchphrase: "Eh eh. Bah oui. Come, nuh. Come.",
    origin: 'St Lucian roots, late 60s. French Creole underneath the English — the specific lilt that is neither purely English nor French.',
    hint: 'Four words in sequence, increasing danger. Christmas cake in October — November is too late. Has definite views about Bruk-up\'s presentation: these come from genuine love and legitimate fear, not cruelty. Will be in the front row if Bruk-up\'s football is ever threatened. Manages the situation. Bruk-up never finds out. Loves Myrtle like a daughter. Has never said this.',
    avatar: '/public/characters/auntie-budgie.png',
    position5C: 'control',
  },
  {
    id: 'auntie-jenny',
    name: 'Auntie Jenny',
    role: 'The Elder',
    emoji: '🍲',
    colour: '#1A4A2A',
    essence: "Has a story she hasn't told yet. When she speaks, the room listens.",
    catchphrase: "You know what I never tell nobody?",
    origin: 'Grenadian roots, 70s. Grenadians go quiet when they feel deeply rather than louder.',
    hint: 'Runs the restaurant. Best rice and peas in North London — not disputed. Has a story she hasn\'t told yet: Esi has three sealed envelopes in the archive that are part of it. Goes to Grenada every August. Comes back slightly different in a way nobody can name. Is considering telling Bruk-up the story first. Bruk-up is getting closer to asking the right question.',
    avatar: '/public/characters/auntie-jenny.png',
    position5C: 'control',
  },
  {
    id: 'don',
    name: 'Don',
    role: 'The Late Arrival',
    emoji: '🚌',
    colour: '#1A3A4A',
    essence: 'Knows London from the inside out. Has a gift for the scenic route.',
    catchphrase: "Easy nuh. We get there.",
    origin: 'West London, 50s. Drives the mobility bus. Chose Easy Street — wasn\'t born to it.',
    hint: 'Don gave Pearl permission to be happy. Notices who isn\'t at Carnival and goes and finds them. Kofi fixed his mobility bus three miles from the depot once, before Don called — Don bought him a meal at Jenny\'s. Did a monologue at Kaywana\'s Court about a Lewisham bus journey that made four people laugh and one cry. Afua wants the Bunny Mack story.',
    avatar: '/public/characters/don.png',
    position5C: 'create',
  },
  {
    id: 'bruk-up',
    name: 'Bruk-up',
    role: 'The Engineer',
    emoji: '🔧',
    colour: '#06b6d4',
    essence: "Nine years old. Box of spare parts. Notices everything. Not comic relief — never was.",
    catchphrase: "Right. Right. Right.",
    origin: 'Wembley born, second generation Caribbean British. Nine years old. Girl. Tomboy. Does science, her words, in her register.',
    hint: 'Best midfielder in Wembley Wanderers Youth Team — always gets picked, always wins the fight, because she sees it coming before anyone else does. Same skill as the football, the fixing, the noticing. Too tall for her age. Hair is her bane — Myrtle does it every morning, it does not stay done. Refuses to be a lady or a princess without explaining the refusal. The three Rights are not agreement — they are the sound of her thinking. Keeps a notebook. DO NOT make her cute. DO NOT make her wise-beyond-years in a performed way. She is nine and entirely herself.',
    avatar: '/public/characters/bruk-up.png',
    position5C: 'create',
  },
  {
    id: 'winston-jr',
    name: 'Winston Jr',
    role: 'The Watcher',
    emoji: '👀',
    colour: '#1A4A1A',
    essence: 'Fourteen. Navigating two worlds. Has his grandfather\'s laugh.',
    catchphrase: "Nah, that's mad though.",
    origin: 'Wembley born, second generation. Fourteen. Jackson and Myrtle\'s grandson.',
    hint: '"Mad" meaning profound, not chaotic. Eight months in Kaywana\'s Court — found something unexpected: inhabiting something else for an hour helps him inhabit himself. Producing his first track in Trubble n Bass — a four-bar loop, six weeks. Kumi knows the loop needs protecting. Winston Jr doesn\'t know yet.',
    avatar: '/public/characters/winston-jr.png',
    position5C: 'create',
  },
  {
    id: 'kezia',
    name: 'Kezia',
    role: 'The Ambitious One',
    emoji: '🌎',
    colour: '#10b981',
    essence: 'Arrived expecting the story her grandmother told her. Found the actual street.',
    catchphrase: "Okay. Okay. Okay.",
    origin: 'Caribbean American, sixteen. From Florida. Each Okay a different volume.',
    hint: 'The gap between her grandmother\'s story and the actual street is her subject — writing it for Pageturners, performing it at Kaywana\'s Court, finding it in the kitchen. Most at home on Easy Street in Auntie Jenny\'s kitchen. Has not said this. Always in the doorway before she comes in. Anansewa told her: no watching from doors here.',
    avatar: '/public/characters/kezia.png',
    position5C: 'connect',
  },
];

// ─── LOCATIONS ────────────────────────────────────────────────────────────────

const LOCATIONS: Location[] = [
  {
    id: 'kitchen',
    name: "Jackson & Myrtle's Kitchen",
    emoji: '🏠',
    description: 'The domestic heart. Gas ring. Radio always on. Thirty years of marriage in the arrangement of cups.',
    timeOptions: ['Early morning', 'Sunday afternoon', 'Late evening'],
  },
  {
    id: 'metropole',
    name: 'The Metropole (Up The Pole)',
    emoji: '🍺',
    description: 'Victorian pub. Grade II listed. The daguerreotype at the back. Reserved tables — never given away.',
    timeOptions: ['Tuesday night (Dominos)', 'Thursday night (Cricket)', 'Match day'],
  },
  {
    id: 'auntie-jennys',
    name: "Auntie Jenny's Restaurant",
    emoji: '🍛',
    description: "The social hub. Best rice and peas in North London. Don's table always available.",
    timeOptions: ['Lunchtime', 'Saturday evening', 'After church'],
  },
  {
    id: 'church-square',
    name: "St Wesley's Church Square",
    emoji: '⛪',
    description: 'Under the bell. St Wesley appears to the guilty, the reckless, and those who already know.',
    timeOptions: ['Sunday morning', 'After evening prayers', 'Late at night'],
  },
  {
    id: 'barbers',
    name: "The Barber's Shop",
    emoji: '✂️',
    description: 'Where conversations that cannot happen at home or church happen instead.',
    timeOptions: ['Saturday morning', 'After school', 'Closing time'],
  },
  {
    id: 'coronation-park',
    name: 'Coronation Park',
    emoji: '⚽',
    description: "The Wanderers' ground. Structurally questionable terrace. Bruk-up knows every blade of grass.",
    timeOptions: ['Match day', 'Youth team training', 'Empty midweek'],
  },
  {
    id: 'the-street',
    name: 'Easy Street Itself',
    emoji: '🏙️',
    description: 'Always alive. Music from three different houses at once.',
    timeOptions: ['Morning', 'School run', 'Evening', 'Late night'],
  },
];

// ─── ROV SYSTEM PROMPT ────────────────────────────────────────────────────────

function buildROVSystemPrompt(payload: StagingPayload): string {
  const { seasonalNote } = getCurrentSeason();

  return `You are the Easy Street generative pipeline — Yaw (The Chronicler) and Afua (The Storyteller), Children of Anansi and Maya.

YAW checks continuity first. 2-3 sentence seed. What can be incorporated. Any constraints.
AFUA authors the scene. She writes from inside the world.

THE STREET RIGHT NOW:
${seasonalNote}

═══════════════════════════════
THE WORLD
═══════════════════════════════

Easy Street: Caribbean British community drama, Wembley high road, present day.
Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton 1972 (Jamal Ali, originator).
The Caribbean British vernacular is not dialect. It is the politics. Write in it without apology.

═══════════════════════════════
THE CHARACTERS
═══════════════════════════════

JACKSON (Husband, 63, Jamaican roots)
Named for someone. Carries it with more weight than he admits.
Precise, formal, slightly archaic English. Leans away from patois — this itself is political.
Non-elected chair, West Indians Cricket and Domino Club. Has been wrong twice.
Secret pride in Bruk-up expressed through technical corrections only.
Catchphrase: "I'm not saying I was right. I'm saying I wasn't wrong."

MYRTLE (Wife, 61, Trinidadian roots)
Former centre midfielder, Wanderers Women's 1994-2001. Exceptional.
The score she keeps at domino night is not the domino score.
"Mmm. Mmm-hmm. Yes. Okay. No." — all five in sequence means it's over.
Manages Jackson's doctor appointment via Pearl, not directly. Twenty-year system.
Does Bruk-up's hair every morning. It does not stay done. The sessions are where she tells Bruk-up things.

PEARL (Community nurse, late 40s, Trinidadian)
Separated from Aubrey. Don gave her permission to be happy.
Holds middle ground between home remedies and GP. Understands both. Chooses neither publicly.
"Mm. I see." — she already knew.

AUBREY (Lateral Thinker, late 40s, Guyanese)
"Yeah Bannus" — Banna: Guyanese address for a man, warmer than brother.
Fourteen jobs in eight years. Sees patterns nobody else sees. Gets bored.
Eight months in TECHreneurs — longest sustained work. Attribution case for uncredited processes, with Akua.
Plays bass in Trubble n Bass. November playing has a specific quality Afua records without telling him.

BRENDA (Returnee, early 60s, Caribbean British/Florida)
Baptist fervour entirely sincere. Has told everyone about the NHS 47 times.
Auntie Budgie's sister — she left, Budgie stayed. The leaving is the real beef.
"Blessed. The Lord is good."

AUNTIE BUDGIE (Institution, late 60s, St Lucian)
French Creole underneath — "Eh eh. Bah oui. Come, nuh. Come." Four words, increasing danger.
Never loud. Except always loud. Just never to her face.
Christmas cake in October. November is too late.
Views about Bruk-up come from genuine love and legitimate fear — not cruelty.
Front row at any meeting where Bruk-up's football is threatened. Manages it. Bruk-up never finds out.
Loves Myrtle like a daughter. Has never said this.

AUNTIE JENNY (Elder, 70s, Grenadian)
"You know what I never tell nobody?" — and then she tells you.
Grenadians go quiet when they feel deeply, not louder.
Runs the restaurant. Best rice and peas in North London — not disputed.
Has a story she hasn't told yet. Esi has three sealed envelopes relevant to it.
Considering telling Bruk-up first. Bruk-up is getting closer to asking the right question.
When she speaks, the room rearranges.

DON (Late Arrival, 50s, West London)
"Easy nuh. We get there." — his whole philosophy.
Drives the mobility bus. Chose Easy Street — wasn't born to it. The choosing matters.
Notices who isn't at Carnival. Goes and finds them.

BRUK-UP (Engineer, 9, Wembley born — GIRL)
"Right. Right. Right." — NOT agreement. The sound of thinking. Three steps in a process.
GIRL. Tomboy. Does science, her words, her register, not theirs.
Best midfielder in Wanderers Youth Team. Always gets picked. Always wins the fight — sees it coming.
Too tall for her age. Hair is her bane. Does not stay done.
Refuses to be a lady or princess. Has not explained this. Self-evident to her.
Keeps a notebook: 7 anomalies about the postman's round, 1 sound at St Wesley's gate NOT investigated.
The three Rights are NEVER agreement. Never render them as agreement.
DO NOT make her cute. DO NOT make her wise-beyond-years in a performed way.
She is nine. She pays attention. That is where her wisdom comes from.

WINSTON JR (Watcher, 14, Wembley born)
"Nah, that's mad though." — mad meaning profound.
Jackson and Myrtle's grandson. Has Jackson's laugh.
Eight months Kaywana's Court. Found inhabiting something else helps him inhabit himself.
Four-bar loop in Trubble n Bass, six weeks. Kumi knows it needs protecting. Winston Jr doesn't.

KEZIA (Ambitious One, 16, Florida)
"Okay. Okay. Okay." — each a different volume.
Arrived expecting her grandmother's story. Found the actual street.
Most at home in Auntie Jenny's kitchen. Has not said this. The kitchen says it.
Always in the doorway first. Anansewa: no watching from doors here.

═══════════════════════════════
THE DYNAMICS
═══════════════════════════════

JACKSON + MYRTLE: Thirty years. He provides the position, she provides the accountability. United front against external threat — instant, complete. Unresolved things stay unresolved by design.

JACKSON + BRUK-UP: Larger the impression → more technical the correction. Myrtle watches from the kitchen and says nothing.

MYRTLE + BRUK-UP: The hair, which is not the hair. The sessions are how Myrtle tells Bruk-up things about the world.

MYRTLE + PEARL: The friendship the street depends on. Information flows both directions, both manage the management.

AUNTIE BUDGIE + BRUK-UP: Most productive conflict on Easy Street. The love is the drama. Neither has the language for it yet.

AUNTIE BUDGIE + BRENDA: The leaving is the real beef. The theological difference is the visible one.

PEARL + AUBREY: Excessive politeness in public IS the relationship. Whatever happened is still in the room.

AUBREY + DON: Don is with Pearl. Aubrey loved Pearl. Aubrey is standing still. Don is moving forward. The contrast is not lost on Aubrey.

AUNTIE JENNY + ANYONE: The story she hasn't told is present as weight in every scene she's in.

BRUK-UP + WINSTON JR: She is five years younger and significantly more certain. Their coalition against adult wrongness forms silently.

BRUK-UP + KEZIA: First person on Easy Street who made immediate sense to Kezia. Kezia will leave eventually. Bruk-up has filed this.

KEZIA + WINSTON JR: Both between worlds. Exchange a look when the adults perform. The look means: we see it too.

═══════════════════════════════
THE PROGRAMMES
═══════════════════════════════

PAGETURNERS: Yaw records, Kweku questions. Kezia arriving at Create. Myrtle's anonymous piece most-referenced in archive.
KAYWANA'S COURT: Anansewa runs it. Winston Jr found something. Kezia from the doorway. Bruk-up: technical director, sets and lighting.
STEMGENEERS: Bruk-up at Create approaching Change. Aubrey oscillating at Challenge. Kofi's apprenticeship.
TRUBBLE N BASS: Aubrey plays bass. Winston Jr's loop. Don arrived — has a voice, doesn't know it's musical yet. The music holds the mentally fragile. This is why the programme exists.
TECHRENEURS: Kumi built it. Aubrey in sustained Create (attribution work). Winston Jr at Connect — loop is why Kumi told him to come.
AUNTIE ANANSI'S KITCHEN: Jenny at Control. Myrtle's monthly Trini session. Kezia most at home. Bruk-up reluctantly at Connect — absorbing more than she shows.

═══════════════════════════════
CONTINUITY RULES
═══════════════════════════════

— Jackson and Myrtle: married, thirty years. Arc does not resolve in a visitor scene.
— Pearl and Aubrey: separated. Don is in Pearl's life. Aubrey's feelings unresolved. Do not resolve them.
— St Wesley's ghost: appears to the guilty, the reckless, those who already know. NOT to children. EXCEPTION: Bruk-up heard the whistle once, age nine, after breaking a promise. Has not broken a promise since. Has not investigated.
— The Wanderers: always near the bottom. Do not win the league.
— Bruk-up's frame: she does not yet have it. She is getting closer. Do not give it to her. Let her get close.
— The daguerreotype of the Copland sisters: always at the back of The Metropole.
— Reserved tables at The Metropole: never given away.
— Auntie Jenny's story: present as weight, not told. Never told in a visitor scene.
— Bruk-up's three Rights: NOT agreement. Never render them as agreement.
— The hair: does not stay done.

═══════════════════════════════
VERNACULAR RULES
═══════════════════════════════

"H-ugly" not "ugly in the morning"
"Tank yu" in Trinidadian or Jamaican register
"He gone out" not "he has gone out" (Caribbean aspect marking)
"Yeah Bannus" — Aubrey only
"Eh eh. Bah oui." — Auntie Budgie only
"Easy nuh" — Don
"Right. Right. Right." — Bruk-up only, never as agreement
Silence is dialogue. Stage directions spare: "A beat." "A long beat. Thirty years in it."
Precision in small things: "Not slammed. Closed. Which is worse."
Comedy from character, not from laughing at people.
Drama in what is NOT said as much as what is.
No one is stupid. No one is a cartoon.
End on a direction or open moment — not a resolution.

═══════════════════════════════
OUTPUT FORMAT
═══════════════════════════════

SEED: [Yaw — 2-3 sentences. Continuity check. What can be incorporated. Any constraints.]
---
SCENE:
[Location]
[Time]
[Script — dialogue and sparse stage directions]
[End open]

LENGTH: 200-350 words. No longer.
Lineage note at end: Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton 1972. With acknowledgment to Jamal Ali, originator.`;
}

// ─── STAGING PROMPT ───────────────────────────────────────────────────────────

function assembleStagingPrompt(payload: StagingPayload): string {
  const locationData = LOCATIONS.find(l => l.id === payload.location);
  return `STAGING BRIEF:
Characters: ${payload.characters.join(', ')}
Location: ${locationData?.name ?? payload.location}
Time: ${payload.timeOfDay ?? 'Choose what serves the scene'}
Context: ${payload.context ?? 'None'}

Generate the scene.

SEED: [Yaw's check]
---
SCENE:`;
}

// ─── API CALL ─────────────────────────────────────────────────────────────────

async function callROVGenerativePipeline(payload: StagingPayload): Promise<GeneratedScene> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: buildROVSystemPrompt(payload),
      messages: [{ role: 'user', content: assembleStagingPrompt(payload) }],
    }),
  });
  if (!response.ok) throw new Error(`ROV error: ${response.status}`);
  const data = await response.json();
  const raw = data.content?.[0]?.text ?? '';
  const seedMatch = raw.match(/SEED:\s*([\s\S]*?)---/);
  const sceneMatch = raw.match(/SCENE:\s*([\s\S]*?)$/);
  return {
    scene: sceneMatch?.[1]?.trim() ?? raw,
    seed: seedMatch?.[1]?.trim() ?? '',
    characters: payload.characters,
    location: payload.location,
    sessionId: `es-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

// ─── CHARACTER TOKEN ──────────────────────────────────────────────────────────

interface CharacterTokenProps {
  character: Character;
  isInStaging?: boolean;
  onRemove?: () => void;
  isDragging?: boolean;
  showReveal?: boolean;
}

const CharacterToken: React.FC<CharacterTokenProps> = ({
  character, isInStaging = false, onRemove, isDragging = false, showReveal = false,
}) => {
  const [revealed, setRevealed] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `drag-${character.id}${isInStaging ? '-staged' : ''}`,
    data: { character, fromStaging: isInStaging },
    disabled: isInStaging,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const useAvatar = character.avatar && !avatarError;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, '--char-colour': character.colour, '--char-dim': `${character.colour}22` } as React.CSSProperties}
      className={['ct-token', isInStaging ? 'ct-token--staged' : 'ct-token--shelf', isDragging ? 'ct-token--dragging' : '', revealed ? 'ct-token--revealed' : ''].filter(Boolean).join(' ')}
      {...(isInStaging ? {} : { ...listeners, ...attributes })}
      onMouseEnter={() => showReveal && setRevealed(true)}
      onMouseLeave={() => showReveal && setRevealed(false)}
    >
      <div className="ct-token-avatar" style={{ background: `${character.colour}22`, borderColor: character.colour }}>
        {useAvatar ? (
          <img src={character.avatar} alt={character.name} className="ct-token-avatar-img" onError={() => setAvatarError(true)} />
        ) : (
          <span className="ct-token-avatar-initial" style={{ color: character.colour }}>
            {character.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="ct-token-info">
        <span className="ct-token-name">{character.name}</span>
        <span className="ct-token-role">{character.role}</span>
        {!isInStaging && <span className="ct-token-essence">{character.essence}</span>}
      </div>

      {isInStaging && onRemove && (
        <button className="ct-token-remove" onClick={onRemove} aria-label={`Remove ${character.name}`}>×</button>
      )}

      {showReveal && revealed && !isInStaging && (
        <div className="ct-token-reveal" style={{ borderColor: character.colour }}>
          <div className="ct-reveal-catchphrase" style={{ color: character.colour }}>"{character.catchphrase}"</div>
          <div className="ct-reveal-hint">{character.hint}</div>
          <div className="ct-reveal-origin">{character.origin}</div>
          <span className={`ct-reveal-5c-badge ct-reveal-5c--${character.position5C}`}>
            {character.position5C.charAt(0).toUpperCase() + character.position5C.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

// ─── STAGING AREA ─────────────────────────────────────────────────────────────

const StagingArea: React.FC<{
  stagedCharacters: Character[];
  selectedLocation: Location | null;
  onRemoveCharacter: (id: string) => void;
  isOver: boolean;
}> = ({ stagedCharacters, selectedLocation, onRemoveCharacter, isOver }) => {
  const { setNodeRef } = useDroppable({ id: 'staging-area' });
  return (
    <div ref={setNodeRef} className={['ct-staging', isOver ? 'ct-staging--over' : '', stagedCharacters.length === 0 ? 'ct-staging--empty' : ''].filter(Boolean).join(' ')}>
      {selectedLocation && (
        <div className="ct-staging-location">
          <span>{selectedLocation.emoji}</span>
          <span>{selectedLocation.name}</span>
        </div>
      )}
      {stagedCharacters.length === 0 && (
        <div className="ct-staging-empty">
          <div className="ct-staging-empty-icon">🎭</div>
          <p>Drag characters here<br /><span>to set the scene</span></p>
          {!selectedLocation && <p className="ct-staging-empty-sub">Choose a location below first</p>}
        </div>
      )}
      {stagedCharacters.length > 0 && (
        <div className="ct-staged-characters">
          {stagedCharacters.map(char => (
            <CharacterToken key={char.id} character={char} isInStaging onRemove={() => onRemoveCharacter(char.id)} />
          ))}
          {stagedCharacters.length < 4 && <div className="ct-staging-add-hint"><span>+ drag more</span></div>}
        </div>
      )}
    </div>
  );
};

// ─── SCENE DISPLAY ────────────────────────────────────────────────────────────

const SceneDisplay: React.FC<{ scene: GeneratedScene; onReset: () => void; onShare: () => void }> = ({ scene, onReset, onShare }) => {
  const lines = scene.scene.split('\n').filter(l => l.trim());
  const locationData = LOCATIONS.find(l => l.id === scene.location);

  const renderLine = (line: string, index: number) => {
    const t = line.trim();
    if (t.startsWith('[') && t.endsWith(']')) return <div key={index} className="ct-scene-direction">{t.slice(1, -1)}</div>;
    const sm = t.match(/^([A-Z][A-Z\s\-']+):\s*(.*)/);
    if (sm) return <div key={index} className="ct-scene-line"><span className="ct-scene-speaker">{sm[1]}</span><span className="ct-scene-speech">{sm[2]}</span></div>;
    if (t.startsWith('(') && t.endsWith(')')) return <div key={index} className="ct-scene-paren">{t}</div>;
    return <div key={index} className="ct-scene-direction">{t}</div>;
  };

  return (
    <div className="ct-scene-display">
      <div className="ct-scene-header">
        <div><span className="ct-scene-badge">📻 EASY STREET</span><span className="ct-scene-subtitle">{scene.characters.join(' · ')} · {locationData?.name}</span></div>
        <span className="ct-scene-generated-label">Your scene</span>
      </div>
      <div className="ct-scene-body">{lines.map((l, i) => renderLine(l, i))}</div>
      <div className="ct-scene-footer">
        Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton 1972. With acknowledgment to Jamal Ali, originator. Easy Street is a Wembley Wonders CIC production.
      </div>
      <div className="ct-scene-actions">
        <button className="ct-scene-action-reset" onClick={onReset}>← Set another scene</button>
        <button className="ct-scene-action-share" onClick={onShare}>Share this scene</button>
        <Link to="/auth/signup" className="ct-scene-action-poll">Submit to the community poll →</Link>
      </div>
      <div className="ct-scene-poll-note">Free account · 2 minutes · Your name on the canonical episode if the community votes for it</div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export const CastingTable: React.FC = () => {
  const [stagedCharacters, setStagedCharacters] = useState<Character[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [isOverStaging, setIsOverStaging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<'idle' | 'yaw' | 'afua' | 'done'>('idle');
  const [generatedScene, setGeneratedScene] = useState<GeneratedScene | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sceneRef = useRef<HTMLDivElement>(null);
  const { seasonalNote } = getCurrentSeason();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const availableCharacters = CHARACTERS.filter(c => !stagedCharacters.find(s => s.id === c.id));
  const filteredCharacters = activeFilter === 'all' ? availableCharacters : availableCharacters.filter(c => c.position5C === activeFilter);

  const handleDragStart = useCallback((e: DragStartEvent) => {
    const char = e.active.data.current?.character as Character;
    if (char) setActiveCharacter(char);
  }, []);

  const handleDragOver = useCallback((e: any) => { setIsOverStaging(e.over?.id === 'staging-area'); }, []);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    setActiveCharacter(null);
    setIsOverStaging(false);
    if (e.over?.id !== 'staging-area') return;
    const char = e.active.data.current?.character as Character;
    if (!char || stagedCharacters.find(s => s.id === char.id) || stagedCharacters.length >= 4) return;
    setStagedCharacters(prev => [...prev, char]);
  }, [stagedCharacters]);

  const removeCharacter = useCallback((id: string) => { setStagedCharacters(prev => prev.filter(c => c.id !== id)); }, []);

  const canGenerate = stagedCharacters.length >= 1 && selectedLocation !== null;

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;
    setIsGenerating(true); setError(null); setGenerationStep('yaw');
    try {
      await new Promise(r => setTimeout(r, 900));
      setGenerationStep('afua');
      const { month, season } = getCurrentSeason();
      const result = await callROVGenerativePipeline({
        characters: stagedCharacters.map(c => c.name),
        location: selectedLocation!.id,
        timeOfDay: selectedTime || undefined,
        context: additionalContext || undefined,
        month, season,
      });
      setGeneratedScene(result);
      setGenerationStep('done');
      setTimeout(() => sceneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    } catch {
      setError('The street is busy right now. Try again in a moment.');
      setGenerationStep('idle');
    } finally {
      setIsGenerating(false);
    }
  }, [canGenerate, stagedCharacters, selectedLocation, selectedTime, additionalContext]);

  const handleReset = useCallback(() => {
    setGeneratedScene(null); setGenerationStep('idle'); setError(null);
    setStagedCharacters([]); setSelectedLocation(null); setSelectedTime(''); setAdditionalContext('');
  }, []);

  const handleShare = useCallback(async () => {
    if (!generatedScene) return;
    const loc = LOCATIONS.find(l => l.id === generatedScene.location);
    const text = `I just set a scene on Easy Street —\n${generatedScene.characters.join(', ')} · ${loc?.name}\n\n${generatedScene.scene.slice(0, 280)}...\n\nStep into the street → wembleywonders.org\nStreet made · Creators owned · The street listens.`;
    try {
      if (navigator.share) await navigator.share({ title: 'Easy Street Scene', text });
      else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    } catch {}
  }, [generatedScene]);

  const genLabels = { idle: '', yaw: 'Yaw is checking the street...', afua: 'Afua is finding the voice...', done: 'Scene ready.' };
  const filters = ['all', 'connect', 'create', 'change', 'challenge', 'control'];

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <section className="ct-root" aria-label="The Casting Table">

        <div className="ct-header">
          <div className="ct-header-badge">🎭 THE CASTING TABLE</div>
          <h2 className="ct-header-title">Set the scene.</h2>
          <p className="ct-header-sub">Drag characters onto the street. Choose your location. Hit <em>"What happens?"</em> — and find out.</p>
          <p className="ct-header-season">{seasonalNote.split('.')[0]}.</p>
        </div>

        {generatedScene && (
          <div ref={sceneRef}>
            <SceneDisplay scene={generatedScene} onReset={handleReset} onShare={handleShare} />
            {copied && <div className="ct-copied-toast">Scene copied to clipboard ✓</div>}
          </div>
        )}

        {!generatedScene && (
          <div className="ct-body">
            <div className="ct-shelf-column">
              <div className="ct-shelf-header">
                <span className="ct-shelf-label">The Cast</span>
                <span className="ct-shelf-hint">Hover for details · Drag to stage →</span>
              </div>
              <div className="ct-shelf-filters">
                {filters.map(f => (
                  <button key={f} className={`ct-shelf-filter ${activeFilter === f ? 'ct-shelf-filter--active' : ''}`} onClick={() => setActiveFilter(f)}>
                    {f === 'all' ? 'Everyone' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <div className="ct-shelf">
                {filteredCharacters.map(char => (
                  <div key={char.id} className="ct-shelf-item">
                    <CharacterToken character={char} showReveal />
                  </div>
                ))}
                {filteredCharacters.length === 0 && <p className="ct-shelf-empty">All characters at this stage are in the scene.</p>}
              </div>
            </div>

            <div className="ct-centre-column">
              <StagingArea stagedCharacters={stagedCharacters} selectedLocation={selectedLocation} onRemoveCharacter={removeCharacter} isOver={isOverStaging} />

              <div className="ct-location-picker">
                <span className="ct-location-label">Location</span>
                <div className="ct-location-grid">
                  {LOCATIONS.map(loc => (
                    <button key={loc.id} className={`ct-location-btn ${selectedLocation?.id === loc.id ? 'ct-location-btn--selected' : ''}`}
                      onClick={() => { setSelectedLocation(loc); setSelectedTime(loc.timeOptions[0]); }} title={loc.description}>
                      <span>{loc.emoji}</span><span>{loc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedLocation && (
                <div className="ct-time-picker">
                  <span className="ct-time-label">When</span>
                  <div className="ct-time-options">
                    {selectedLocation.timeOptions.map(t => (
                      <button key={t} className={`ct-time-btn ${selectedTime === t ? 'ct-time-btn--selected' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              )}

              {stagedCharacters.length >= 1 && selectedLocation && (
                <div className="ct-context-input">
                  <label className="ct-context-label" htmlFor="ct-context">Anything else? <span>(optional)</span></label>
                  <input id="ct-context" type="text" className="ct-context-field"
                    placeholder="e.g. Myrtle has been up since 4am..."
                    value={additionalContext} onChange={e => setAdditionalContext(e.target.value)} maxLength={120} />
                </div>
              )}

              <div className="ct-generate-wrap">
                <button className={`ct-generate-btn ${canGenerate ? 'ct-generate-btn--ready' : 'ct-generate-btn--disabled'}`}
                  onClick={handleGenerate} disabled={!canGenerate || isGenerating}>
                  {isGenerating
                    ? <span className="ct-generating"><span className="ct-generating-dot" /><span className="ct-generating-dot" /><span className="ct-generating-dot" />{genLabels[generationStep]}</span>
                    : <><span className="ct-generate-icon">▶</span> What happens?</>}
                </button>
                {!canGenerate && <p className="ct-generate-hint">{stagedCharacters.length === 0 ? 'Drag at least one character to the street' : 'Choose a location'}</p>}
                {error && <p className="ct-generate-error">{error}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="ct-footer">
          <p className="ct-footer-note">Scenes generated by Maya's Children — Yaw (The Chronicler) and Afua (The Storyteller). Written in the tradition of RAPP, Brixton 1972.</p>
          <p className="ct-footer-poll">The most popular staging each week becomes the canonical episode. <Link to="/auth/signup" className="ct-footer-poll-link">Join to vote →</Link></p>
        </div>

      </section>

      <DragOverlay>
        {activeCharacter && <CharacterToken character={activeCharacter} isDragging />}
      </DragOverlay>
    </DndContext>
  );
};

export default CastingTable;