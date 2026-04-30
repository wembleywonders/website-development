// journeyConfig.ts
// Cross-programme journey bridge configuration
// Defines natural one-tap transitions between connected programmes

export interface JourneyBridge {
  id: string;
  from: string;
  to: string;
  triggerContext: string;
  mayaPrompt: string;
  ctaLabel: string;
  toPath: string;
  carryData?: string[];
}

export const JOURNEY_BRIDGES: JourneyBridge[] = [
  {
    id: 'tnb-to-raydyo',
    from: 'trubble-n-bass', to: 'rayd-yo',
    triggerContext: 'track-exported',
    mayaPrompt: 'This track is ready for broadcast. Want to schedule a Rayd-yo slot?',
    ctaLabel: 'Take to Rayd-yo',
    toPath: '/programmes/rayd-yo/sandbox',
    carryData: ['trackName', 'tempo', 'style'],
  },
  {
    id: 'tnb-to-pageturners',
    from: 'trubble-n-bass', to: 'pageturners',
    triggerContext: 'lyric-started',
    mayaPrompt: 'You have words forming. Pageturners has tools to help you shape them into a proper lyric.',
    ctaLabel: 'Shape the lyric in Pageturners',
    toPath: '/programmes/pageturners/sandbox',
    carryData: ['lyricDraft', 'style', 'tempo'],
  },
  {
    id: 'pageturners-to-tnb',
    from: 'pageturners', to: 'trubble-n-bass',
    triggerContext: 'poem-or-lyric-complete',
    mayaPrompt: 'This has a strong rhythm in it. Want to hear what it sounds like with music underneath?',
    ctaLabel: 'Find the music in Trubble n Bass',
    toPath: '/programmes/trubble-n-bass/sandbox?room=concept',
    carryData: ['lyricText', 'syllablePattern'],
  },
  {
    id: 'tnb-to-roots',
    from: 'trubble-n-bass', to: 'roots',
    triggerContext: 'elder-melody-captured',
    mayaPrompt: 'This melody deserves to be archived with its full story. Roots can hold it properly.',
    ctaLabel: 'Archive in Roots',
    toPath: '/programmes/roots/sandbox',
    carryData: ['melodyData', 'provenanceNote', 'style'],
  },
  {
    id: 'tnb-to-silk',
    from: 'trubble-n-bass', to: 'silk-stilettos',
    triggerContext: 'ready-to-release',
    mayaPrompt: 'Every release needs a visual identity. Silk Stilettos can build the artwork and merch.',
    ctaLabel: 'Build the visual identity',
    toPath: '/programmes/silk-stilettos/sandbox',
    carryData: ['trackName', 'style', 'mood'],
  },
  {
    id: 'tnb-to-gtechcasters',
    from: 'trubble-n-bass', to: 'gtechcasters',
    triggerContext: 'instrumental-complete',
    mayaPrompt: 'This would make a strong podcast bed or jingle. G-Tech Casters has the broadcast tools.',
    ctaLabel: 'Take to G-Tech Casters',
    toPath: '/pathways/gtechcasters/planner',
    carryData: ['trackName', 'tempo', 'mood'],
  },
];

export function getBridgesFrom(programmeId: string): JourneyBridge[] {
  return JOURNEY_BRIDGES.filter(b => b.from === programmeId);
}

export function getBridgeById(id: string): JourneyBridge | undefined {
  return JOURNEY_BRIDGES.find(b => b.id === id);
}
