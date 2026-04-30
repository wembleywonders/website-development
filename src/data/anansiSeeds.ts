/*
 * anansiSeeds.ts
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Auntie Anansi's Kitchen
 * Company No. 12960817
 *
 * Story seeds from the Anansi / West African oral tradition.
 *
 * Each seed is a living thing.
 * It starts in Auntie Anansi's Kitchen.
 * It grows in Pageturners or Bright Sparks.
 * It performs at Kaywana's Court.
 * It airs on Rayd-yo.
 * It connects to the Knowledge Commons.
 * It becomes a human story in the platform's content record.
 *
 * The seed is the platform's shortest path from
 * hearing a story to making one.
 * The iPad gives a child content to consume.
 * This gives a child a story that is theirs to continue.
 *
 * "Anansi stole fire by making the Sun laugh.
 *  Write the story of the thing your community
 *  stole back by making the powerful feel
 *  something they didn't expect."
 *
 * That prompt contains:
 * — a Pageturners exercise (Technique 03: High Stakes)
 * — a Knowledge Commons research prompt (Jack Gladstone)
 * — a Rayd-yo broadcast waiting to happen
 * — the beginning of a child's creative life on this platform
 * ─────────────────────────────────────────────────────────────
 */

import { AnansiSeed } from '../types/platform-content';

// ─────────────────────────────────────────
// THE SEEDS
// ─────────────────────────────────────────

export const ANANSI_SEEDS: AnansiSeed[] = [

  // ──────────────────────────────────────────────
  // SEED 01: The Box of Stories
  // Technique: Information Control (08)
  // Archive: Jonathan Strong — freedom withheld
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-01',
    sourceStory:     'Anansi and the Box of Stories',
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Anansi tricked the Sky God into giving him all the stories in the world — stories that had been locked in a box and kept from ordinary people. He paid the price: hornets, a python, a leopard. But he got the box. And stories have belonged to everyone ever since.

Write about something that was locked away and shouldn't have been. Who had the key? What did it cost to get it?`,

    pageturnerPrompt: `Before Anansi, the Sky God Nyame held all the world's stories in a box. Nobody could tell them without paying an impossible price. Anansi — small, clever, made of patience — paid it anyway.

This is a story about information control. The Sky God decided what people were allowed to know. Anansi decided that was wrong.

Write a story or essay about something withheld — a history, a truth, a story — that was kept from a community, and the person or moment that unlocked it. Use Technique 08: what did you know, what did you withhold, and when did the revelation land?

The Knowledge Commons connection: Jonathan Strong was baptised in 1765 believing that baptism meant freedom — information the system had deliberately confused. Research his story. Is your story about the same kind of withholding?`,

    brightSparksPrompt: `Anansi tricked the Sky God to get the box of stories. Before Anansi, nobody could tell stories. After Anansi, everyone could.

Write a short story where someone gets something important that was being kept away from them. Maybe it's a secret. Maybe it's a skill. Maybe it's a place they weren't allowed to go. How do they get it? What happens when they do?`,

    techniqueFocus:    'Technique 08: Information Control',

    archiveConnection: {
      profileId:      'jonathan-strong',
      profileName:    'Jonathan Strong',
      connectionNote: 'Strong was told baptism would free him — information the system deliberately confused. He was the box of stories, and he got the box back. His freedom was withheld and then won. The seed and the archive tell the same structural story.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'The rage at being told you cannot know what is yours to know — and the relief when you find it anyway.',
  },

  // ──────────────────────────────────────────────
  // SEED 02: Why Anansi Has a Bald Spot
  // Technique: Emotional Truth (I Write What I Like A)
  // Archive: Arthur Wharton — pride and the cost of it
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-02',
    sourceStory:     'Why Anansi Has a Bald Spot',
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Anansi was so proud of his cleverness that he made a bet he couldn't win. He lost a patch of hair — and every spider since has had that bald spot as a reminder.

Write about a time pride cost something. Not a lesson learned neatly. The real cost. The specific thing that isn't there anymore.`,

    pageturnerPrompt: `Anansi's pride is always his best quality and his biggest liability. In this story, pride costs him something permanent — something every spider that comes after him carries.

This is a seed for the I Write What I Like pathway: Emotional Truth.

Write about pride and its cost from full emotional accuracy. Not the version you tell when you want to look wise in retrospect. The version where the loss still stings.

Arthur Wharton was the best athlete of his generation. He refused to perform deference. His pride was real and it was right. And he was buried in an unmarked grave. Read his profile. Then write about pride — yours, or someone you know, or someone in the archive. Write it honestly. Not the lesson. The feeling.`,

    brightSparksPrompt: `Anansi was so clever that sometimes he was TOO clever — and he made bets he couldn't win. One time it cost him his hair. That's why spiders have bald spots.

Write about a time when being very sure of yourself went wrong. What happened? What did you learn — not the "good lesson" version, but what you actually felt?`,

    techniqueFocus:    'I Write What I Like — A: Emotional Truth',

    archiveConnection: {
      profileId:      'arthur-wharton',
      profileName:    'Arthur Wharton',
      connectionNote: 'Wharton\'s pride — refusing to be deferential, being the best and knowing it — was both his greatest quality and the thing the system punished him for. His bald spot was the unmarked grave. The seed and the archive share the structure of pride meeting a system designed to diminish it.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'Pride is not the same as arrogance. Knowing you are right and being punished for it anyway is a specific and legitimate grief.',
  },

  // ──────────────────────────────────────────────
  // SEED 03: Anansi and the Tar Baby
  // Technique: High Stakes (03)
  // Archive: Jack Gladstone — the trap that looked like opportunity
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-03',
    sourceStory:     'Anansi and the Tar Baby',
    sourceTradition: 'West African / African-American oral tradition',

    seedPrompt: `The Tar Baby didn't say a word. It just sat there. And the more Anansi tried to get a response, the more stuck he became.

Write about a trap that looked like something else. A situation where the more you tried to fix it, the worse it got. What was the tar? What were you trying to reach?`,

    pageturnerPrompt: `The Tar Baby is one of the most precise metaphors in the oral tradition: a trap that works by making you think engagement will help. The more you push, the more stuck you become. The trap is designed for people who refuse to ignore what they believe is wrong.

Apply Technique 03 (High Stakes) to this seed. Map the four stake types in a situation where someone is caught in a trap that was designed specifically for their values — where their best quality is what makes them vulnerable.

The Knowledge Commons connection: Jack Gladstone and the 10,000 people who rose in Demerara in 1823 were told that emancipation had already been granted in London — it was being withheld by the planters. They rose to claim what was already theirs. The trap was the false information. The tar was the system itself. Research his story. Does your story contain the same structure?`,

    brightSparksPrompt: `Sometimes Anansi got stuck — not because he was silly, but because he cared too much about getting a response from something that wasn't going to give him one.

Write a story about getting stuck — not because you made a mistake, but because you were trying to do the right thing and it backfired. What was the right thing? What went wrong? Did you get unstuck?`,

    techniqueFocus:    'Technique 03: High Stakes',

    archiveConnection: {
      profileId:      'jack-gladstone',
      profileName:    'Jack Gladstone',
      connectionNote: 'The Demerara Rebellion was triggered by false information about emancipation being withheld. 10,000 people rose to claim what they\'d been told was already theirs. The tar was the entire colonial system. Gladstone\'s story is the highest-stakes version of the Tar Baby: a trap designed for people whose values make them act.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'The specific frustration of doing the right thing and being punished for it. The trap that was set for your virtue, not your vice.',
  },

  // ──────────────────────────────────────────────
  // SEED 04: Anansi and the Wisdom Gourd
  // Technique: Specificity of Observation (I Write What I Like B)
  // Archive: George Padmore — what was carried and where
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-04',
    sourceStory:     'Anansi and the Wisdom Gourd',
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Anansi collected all the wisdom in the world into a gourd and tried to carry it up a tree to keep it for himself. His son watched from below and said: "Father, you might carry it better if you slung it behind you." Anansi realised: some wisdom is already in the people around you. He dropped the gourd. Wisdom scattered everywhere. And now everyone has a little.

Write about a piece of wisdom you didn't recognise as wisdom until someone else named it. Where did it come from? Who carried it?`,

    pageturnerPrompt: `The wisdom gourd story is about the arrogance of accumulation — the belief that wisdom should be collected and held rather than scattered and shared. Anansi's son teaches him more with one observation than the entire gourd contained.

This is a seed for the I Write What I Like pathway: Specificity of Observation.

Write about a specific person — someone you know, or someone in the archive — who carried wisdom that wasn't recognised as wisdom by the people around them. Be specific: not "she was wise" but what she knew, how she carried it, the specific moment when the gourd was dropped.

The Knowledge Commons connection: George Padmore organised African independence from a flat in North London. The wisdom he carried — Pan-Africanism as a political philosophy, the infrastructure of self-determination — was assembled in ordinary rooms among ordinary people. Research his story. Where was the gourd? Who was his son?`,

    brightSparksPrompt: `Anansi wanted to keep all the wisdom in the world for himself. But his son noticed something he hadn't — and that one small observation was wiser than the whole gourd.

Write about someone in your family or community who knows something important that doesn't get talked about enough. What do they know? How do they carry it? Have you ever learned something important from watching them?

Try to be very specific — don't write about "wisdom" in general. Write about the specific thing this specific person knows.`,

    techniqueFocus:    'I Write What I Like — B: Specificity of Observation',

    archiveConnection: {
      profileId:      'george-padmore',
      profileName:    'George Padmore',
      connectionNote: 'Padmore carried the wisdom of Pan-Africanism in ordinary rooms in North London. His flat in NW1 was the gourd. The delegates at the Manchester Congress were the ones who received it when it scattered. The seed asks for the specific person carrying wisdom that wasn\'t recognised — Padmore is that person, still unplaqued, still unrecognised in the official record.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'The specific person in your community who carries something important that nobody has named yet. The urgency of naming it before the gourd drops.',
  },

  // ──────────────────────────────────────────────
  // SEED 05: How Anansi Got His Stories from the Sky God
  // (Original — the full journey)
  // Technique: Narrative Momentum (01)
  // Archive: Jean Binta Breeze — performing before publishing
  // ─────────────────────────────────────────────
  {
    id: 'anansi-seed-05',
    sourceStory:     "How Anansi Got His Stories (full journey version)",
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Anansi wanted the Sky God's stories. The Sky God set three impossible prices: hornets, a python, a leopard. Anansi caught them all — not with strength, but with patience, cleverness, and the ability to make the trap look like something else.

Write about something that looked impossible until you changed how you approached it. Not a neat success story. The moment when you understood the trap from a different angle.`,

    pageturnerPrompt: `The journey Anansi makes to earn the stories is itself a page-turner: three tasks, each requiring a different kind of intelligence, each one apparently impossible. The story is structured so each task escalates — more dangerous, more clever, more at stake.

Apply Technique 01 (Narrative Momentum) to this seed. Write the story of a journey — yours, or someone you know, or someone from the archive — where each step escalated the stakes and changed the situation. Every scene should pass the change test: something different at the end from the beginning.

The Knowledge Commons connection: Jean Binta Breeze's journey to becoming the first woman on the international dub stage was exactly this structure: three impossible prices (the oral tradition that preceded her, the male-dominated stage, the expectation that her voice wasn't literary). She caught them all. Read her profile. Map her journey as a scene chain.`,

    brightSparksPrompt: `Anansi had to catch three impossible things to get the Sky God's stories: hornets (without getting stung), a python (without getting squeezed), and a leopard (without getting eaten). He caught them all — not by being stronger, but by being cleverer.

Write a story where your character has to do three impossible things to get what they want. Each one should be harder than the last. And each time, they have to find a clever solution, not a strong one.`,

    techniqueFocus:    'Technique 01: Narrative Momentum',

    archiveConnection: {
      profileId:      'jean-binta-breeze',
      profileName:    'Jean Binta Breeze',
      connectionNote: 'Breeze\'s journey to the international stage was a three-task structure: the oral tradition she came from, the male-dominated stage she entered, the expectation that her dialect wasn\'t literature. She caught them all with patience and intelligence. The seed asks for the same journey structure — and Breeze\'s profile is the worked example of how narrative momentum carries a real life.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'The specific quality of intelligence that makes the impossible achievable — not brute force, not luck, but understanding the trap better than the person who set it.',
  },

  // ──────────────────────────────────────────────
  // SEED 06: Anansi and His Sons
  // Technique: Emotional Investment (07)
  // Archive: Felicity Ethnic — characters who carry the community
  // Bright Sparks primary
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-06',
    sourceStory:     'Anansi and His Six Sons',
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Anansi had six sons, each with a different gift: one could see anywhere in the world, one could build a road instantly, one could drink a river, one could throw a stone to the moon, one could catch falling things, and one could bring the dead back to life. Working together, they saved Anansi from death. But there was only one reward — a glowing ball of light. Who deserved it most?

Write about a situation where a group worked together but only one person could receive the recognition. Was it fair? What happened to the people who didn't get it?`,

    pageturnerPrompt: `The six sons story is about collective work and individual recognition — a tension that runs through every creative community, every movement, every family.

This is a seed for Technique 07: Emotional Investment. Before you put characters in conflict, make the reader understand what each one wants and why. The six sons each have a legitimate claim. The reader should feel the unfairness of the singular reward even before it's given.

Write a story or essay where multiple people have equal claims to something that can only go to one of them. Make the reader care about all of them before the decision is made.

The Knowledge Commons connection: Felicity Ethnic's characters — Pearlene, Bigga International, Ma Bennette, Vilma Simmit — are each a different "son" with a different gift for understanding the community. Together they cover the whole picture. Read her profile. Which of her characters would have got the glowing ball?`,

    brightSparksPrompt: `Anansi had six sons who each had a special power. When Anansi needed help, they all worked together to save him. But there was only one prize — a glowing ball that lit up the night sky. Which son deserved it most?

Write the scene where Anansi has to decide. Give each son a turn to make their case. Then write Anansi's decision — and how it felt for the sons who didn't get the ball.

Tip: Before you write the decision, make sure your reader cares about ALL of the sons, not just one.`,

    techniqueFocus:    'Technique 07: Emotional Investment',

    archiveConnection: {
      profileId:      'felicity-ethnic',
      profileName:    'Felicity Ethnic',
      connectionNote: 'Felicity\'s four characters are each a different gift for understanding the community. Together they see everything. Separately, each would have a claim to the glowing ball. The seed\'s question — who deserves the recognition when the work was collective — is the same question that Felicity\'s career answers: the community built this, and the community should name who carried it.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'bright-sparks',
    emotionalCore:     'The specific ache of doing essential work that goes unrecognised because someone else received the singular reward.',
  },

  // ──────────────────────────────────────────────
  // SEED 07: Anansi Becomes a Story
  // Technique: All eight — the synthesis seed
  // Archive: The Knowledge Commons itself
  // This is the seed that completes the journey.
  // ──────────────────────────────────────────────
  {
    id: 'anansi-seed-07',
    sourceStory:     'Why Stories Are Called Anansi Stories',
    sourceTradition: 'Akan / Ashanti oral tradition, West Africa',

    seedPrompt: `Before Anansi, stories belonged to the Sky God. After Anansi, stories belonged to everyone. And stories were called Anansi stories — not because Anansi was in every story, but because Anansi was the reason every story could be told.

Write about someone who made something possible for everyone who came after them — without being in any of the stories those people went on to tell.`,

    pageturnerPrompt: `This is the synthesis seed. It asks you to use everything.

Narrative Momentum: their journey changed with every step.
Strategic Questions: what did the people who came after them never know about the cost?
High Stakes: what they gave up was permanent.
Tension-Driven Scenes: every step had an obstacle.
End-of-Chapter Hooks: the story of what they made possible is still unfolding.
Controlled Pacing: know when to slow down.
Emotional Investment: make the reader love them before they understand what they lost.
Information Control: the revelation that changes everything is saved for the end.

The Knowledge Commons is full of Anansi figures — people who made something possible for everyone who came after without being in any of the stories those people went on to tell. Choose one. Research them. Write the story that gives them back to the people they made possible.

This piece is eligible for submission to the Knowledge Commons as a profile contribution. It is eligible for Joystick as a long-read or essay. It is eligible for Rayd-yo as a broadcast piece. It is the full journey.`,

    brightSparksPrompt: `After Anansi got all the stories from the Sky God, they weren't called the Sky God's stories anymore. They were called Anansi stories — because Anansi was the reason everyone could tell them.

Think of someone who did something important so that other people could do things they couldn't before. It doesn't have to be a famous person — it could be someone in your family, your community, or your school.

Write their story. Tell us what they did, what it cost them, and why the things that happened after them are possible because of them.

This is the hardest prompt. Take your time.`,

    techniqueFocus:    'All eight techniques — the synthesis',

    archiveConnection: {
      profileId:      'jonathan-strong',
      profileName:    'Jonathan Strong (and the whole archive)',
      connectionNote: 'The entire Knowledge Commons is an answer to this seed. Every profile is an Anansi figure — someone who made something possible without being in the stories those possibilities produced. The seed routes to the whole archive, not a single profile. It is the founding prompt of the counter-archive tradition.',
    },

    broadcastOnRadyo:  false,
    ageRange:          'all',
    emotionalCore:     'The specific and legitimate grief of the person who made everything possible and is remembered by almost no one. And the specific and necessary act of remembering them anyway.',
  },

];

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

export function getSeedById(id: string): AnansiSeed | undefined {
  return ANANSI_SEEDS.find(s => s.id === id);
}

export function getSeedsByAgeRange(
  range: AnansiSeed['ageRange']
): AnansiSeed[] {
  return ANANSI_SEEDS.filter(
    s => s.ageRange === range || s.ageRange === 'all'
  );
}

export function getSeedsByTechnique(keyword: string): AnansiSeed[] {
  const k = keyword.toLowerCase();
  return ANANSI_SEEDS.filter(s =>
    s.techniqueFocus.toLowerCase().includes(k)
  );
}

export function getSeedByArchiveProfile(profileId: string): AnansiSeed | undefined {
  return ANANSI_SEEDS.find(s => s.archiveConnection?.profileId === profileId);
}

export function getBroadcastSeeds(): AnansiSeed[] {
  return ANANSI_SEEDS.filter(s => s.broadcastOnRadyo);
}

export function getSeedOfTheDay(): AnansiSeed {
  const day = new Date().getDate();
  return ANANSI_SEEDS[day % ANANSI_SEEDS.length];
}

// ─────────────────────────────────────────
// SEED PROMPT RESOLVER
// Returns the right prompt for the
// programme and the writer.
// ─────────────────────────────────────────

export function resolveSeedPrompt(
  seed: AnansiSeed,
  programme: 'bright-sparks' | 'pageturners' | 'general'
): string {
  switch (programme) {
    case 'bright-sparks': return seed.brightSparksPrompt;
    case 'pageturners':   return seed.pageturnerPrompt;
    default:              return seed.seedPrompt;
  }
}

export default ANANSI_SEEDS;