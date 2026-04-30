// StyleProfiles.ts
// Cultural style profiles for the Concept Room feel selector
// Each profile carries BPM, scale, kit, cultural context and lesson

export interface StyleProfile {
  id: string;
  name: string;
  heritage: string;
  artists: string;
  bpm: [number, number];
  defaultBpm: number;
  key: string;
  scale: string;
  kit: string;
  feel: string[];
  lesson: string;
  vocalStyle?: string;
  gospelChant?: boolean;
}

export const STYLE_PROFILES: StyleProfile[] = [
  {
    id: 'afrobeats', name: 'Afrobeats',
    heritage: 'West African / Nigerian diaspora',
    artists: 'Fela Kuti to Burna Boy to Wizkid',
    bpm: [100, 115], defaultBpm: 108, key: 'C', scale: 'pentatonic', kit: 'caribbean',
    feel: ['bouncy', 'warm', 'celebratory', 'moving', 'Lagos night'],
    lesson: 'Layering is the secret. Each part sounds simple alone. The complexity comes from interlocking.',
  },
  {
    id: 'loversrock', name: 'Lovers Rock',
    heritage: 'British-Caribbean / South London',
    artists: 'Janet Kay to Carroll Thompson to Maxi Priest',
    bpm: [72, 88], defaultBpm: 80, key: 'F', scale: 'major', kit: 'caribbean',
    feel: ['smooth', 'romantic', 'Sunday morning', 'gentle', 'warm'],
    lesson: 'Kick and snare TOGETHER on beat 3. That one-drop is everything. Everything else serves the groove.',
  },
  {
    id: 'gospel', name: 'Gospel',
    heritage: 'Black church tradition / Baptist / Pentecostal',
    artists: 'Mahalia Jackson to Kirk Franklin to Israel Houghton',
    bpm: [68, 120], defaultBpm: 88, key: 'Bb', scale: 'major', kit: 'acoustic',
    feel: ['uplifting', 'powerful', 'joyful', 'church', 'spiritual', 'communal'],
    lesson: 'Gospel harmony is about voices answering each other. Call and response is built into the DNA.',
    vocalStyle: 'gospel', gospelChant: true,
  },
  {
    id: 'grime', name: 'Grime',
    heritage: 'East London / UK garage lineage',
    artists: 'Wiley to Skepta to Stormzy',
    bpm: [136, 144], defaultBpm: 140, key: 'D#', scale: 'minor', kit: 'grime',
    feel: ['dark', 'urgent', 'tense', 'raw', 'street', 'cold'],
    lesson: 'Space is the weapon. Only 3 kick hits in the whole bar. Stop filling every gap.',
  },
  {
    id: 'soca', name: 'Soca',
    heritage: 'Trinidad and Tobago / Caribbean carnival',
    artists: 'Machel Montano to Bunji Garlin',
    bpm: [128, 142], defaultBpm: 135, key: 'G', scale: 'major', kit: 'caribbean',
    feel: ['unstoppable', 'carnival', 'hot', 'road march', 'free'],
    lesson: 'Four on the floor plus constant hats equals unstoppable motion. Soca does not breathe.',
  },
  {
    id: 'roots-reggae', name: 'Roots Reggae',
    heritage: 'Jamaican / Rastafari tradition',
    artists: 'Bob Marley to Burning Spear to Culture',
    bpm: [64, 80], defaultBpm: 72, key: 'G', scale: 'minor', kit: 'caribbean',
    feel: ['righteous', 'heavy', 'meditative', 'conscious', 'roots'],
    lesson: 'The skank is the heartbeat. Bass and drum are one organism. Everything else decorates.',
  },
  {
    id: 'jazz', name: 'Jazz',
    heritage: 'African American / Black Atlantic',
    artists: 'Art Blakey to Miles Davis to Soweto Kinch',
    bpm: [100, 200], defaultBpm: 120, key: 'C', scale: 'dorian', kit: 'acoustic',
    feel: ['conversational', 'sophisticated', 'late night', 'alive', 'searching'],
    lesson: 'Instruments that converse make music. Instruments that shout make noise.',
  },
  {
    id: 'highlife', name: 'Highlife',
    heritage: 'Ghana / Nigeria / West African',
    artists: 'E.T. Mensah to Osibisa to Femi Kuti',
    bpm: [92, 112], defaultBpm: 100, key: 'D', scale: 'major', kit: 'caribbean',
    feel: ['joyful', 'brass', 'party', 'golden', 'celebratory', 'urban Africa'],
    lesson: 'Highlife carries joy as a political act. To dance is to resist. The groove is the message.',
  },
  {
    id: 'world-chant', name: 'World Chant',
    heritage: 'Global oral traditions',
    artists: 'Nusrat Fateh Ali Khan to Bobby McFerrin to Sweet Honey in the Rock',
    bpm: [60, 100], defaultBpm: 76, key: 'A', scale: 'pentatonic', kit: 'acoustic',
    feel: ['ancient', 'communal', 'meditative', 'crowd', 'together', 'one voice'],
    lesson: 'Chant works because everyone can join. One note at a time. The power is in the unison.',
    vocalStyle: 'chant', gospelChant: true,
  },
];

export function getStyleByFeel(feelWord: string): StyleProfile[] {
  const word = feelWord.toLowerCase();
  return STYLE_PROFILES.filter(p => p.feel.some(f => f.includes(word)));
}

export function getStyleById(id: string): StyleProfile | undefined {
  return STYLE_PROFILES.find(p => p.id === id);
}
