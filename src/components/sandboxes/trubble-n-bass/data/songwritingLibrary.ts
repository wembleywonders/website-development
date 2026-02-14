/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Songwriting Workshop - Data Library
 * Chord progressions, scales, song structures, lyric tools.
 * 
 * "The song was always in you. These tools help you find it."
 */

// ============================================
// TYPES
// ============================================

export interface Chord {
  name: string;
  symbol: string;
  notes: string[];
  type: 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7' | 'sus2' | 'sus4';
  mood: string;
  color: string;
}

export interface ChordProgression {
  id: string;
  name: string;
  numerals: string[];
  description: string;
  genres: string[];
  mood: string;
  famous?: string[];
  cultural?: string;
}

export interface Scale {
  id: string;
  name: string;
  intervals: number[];
  mood: string;
  genres: string[];
  description: string;
}

export interface MelodicPattern {
  id: string;
  name: string;
  contour: ('up' | 'down' | 'same' | 'jump-up' | 'jump-down')[];
  description: string;
  emotion: string;
  example?: string;
}

export interface SongSection {
  id: string;
  name: string;
  purpose: string;
  typicalBars: number;
  tips: string[];
  lyricalFocus?: string;
}

export interface SongStructure {
  id: string;
  name: string;
  sections: string[];
  genres: string[];
  description: string;
  totalBars?: number;
}

export interface RhymeType {
  id: string;
  name: string;
  description: string;
  example: [string, string];
}

export interface LyricPrompt {
  id: string;
  theme: string;
  prompt: string;
  keywords: string[];
  cultural?: string;
}

// ============================================
// MUSICAL KEYS & CHORDS
// ============================================

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const CHORD_TYPES: { [key: string]: { intervals: number[]; symbol: string; mood: string } } = {
  major: { intervals: [0, 4, 7], symbol: '', mood: 'Happy, bright, resolved' },
  minor: { intervals: [0, 3, 7], symbol: 'm', mood: 'Sad, dark, emotional' },
  diminished: { intervals: [0, 3, 6], symbol: 'dim', mood: 'Tense, unstable, suspenseful' },
  augmented: { intervals: [0, 4, 8], symbol: 'aug', mood: 'Dreamy, unsettled, mysterious' },
  dominant7: { intervals: [0, 4, 7, 10], symbol: '7', mood: 'Bluesy, tension wanting resolution' },
  major7: { intervals: [0, 4, 7, 11], symbol: 'maj7', mood: 'Jazzy, sophisticated, smooth' },
  minor7: { intervals: [0, 3, 7, 10], symbol: 'm7', mood: 'Soulful, mellow, reflective' },
  sus2: { intervals: [0, 2, 7], symbol: 'sus2', mood: 'Open, airy, unresolved' },
  sus4: { intervals: [0, 5, 7], symbol: 'sus4', mood: 'Anticipation, tension, folk' },
};

// Chords in each major key (I, ii, iii, IV, V, vi, vii°)
export const KEY_CHORDS: { [key: string]: string[] } = {
  'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
  'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
};

// ============================================
// CHORD PROGRESSIONS - By Genre & Culture
// ============================================

export const CHORD_PROGRESSIONS: ChordProgression[] = [
  // Pop Essentials
  {
    id: 'pop-anthem',
    name: 'The Pop Anthem',
    numerals: ['I', 'V', 'vi', 'IV'],
    description: 'The most common pop progression. Works for almost everything.',
    genres: ['pop', 'rock', 'country'],
    mood: 'Uplifting, anthemic, familiar',
    famous: ['Let It Be', 'No Woman No Cry', 'With or Without You', 'Someone Like You']
  },
  {
    id: 'sad-pop',
    name: 'The Emotional Journey',
    numerals: ['vi', 'IV', 'I', 'V'],
    description: 'Same chords as pop anthem but starting on minor. More emotional.',
    genres: ['pop', 'ballad'],
    mood: 'Emotional, reflective, bittersweet',
    famous: ['Apologize', 'Grenade', 'Complicated']
  },
  {
    id: 'fifties',
    name: 'The Fifties',
    numerals: ['I', 'vi', 'IV', 'V'],
    description: 'Classic doo-wop progression. Timeless and nostalgic.',
    genres: ['pop', 'doo-wop', 'ballad'],
    mood: 'Nostalgic, romantic, classic',
    famous: ['Stand By Me', 'Every Breath You Take', 'Earth Angel']
  },

  // Caribbean & Reggae
  {
    id: 'one-drop',
    name: 'One Drop Reggae',
    numerals: ['I', 'IV', 'I', 'V'],
    description: 'Classic reggae progression with space for the one-drop rhythm.',
    genres: ['reggae', 'dancehall'],
    mood: 'Laid-back, groovy, conscious',
    cultural: 'Jamaica - Bob Marley, roots reggae tradition',
    famous: ['Three Little Birds', 'One Love', 'Redemption Song']
  },
  {
    id: 'lovers-rock',
    name: 'Lovers Rock',
    numerals: ['I', 'vi', 'ii', 'V'],
    description: 'Smooth romantic reggae progression.',
    genres: ['lovers rock', 'reggae'],
    mood: 'Romantic, smooth, soulful',
    cultural: 'UK/Jamaica - British-Caribbean romantic style',
    famous: ['Silly Games', 'Night Nurse']
  },
  {
    id: 'dancehall-bounce',
    name: 'Dancehall Bounce',
    numerals: ['i', 'VI', 'III', 'VII'],
    description: 'Minor key dancehall with that distinctive bounce.',
    genres: ['dancehall', 'reggaeton'],
    mood: 'Energetic, bold, party',
    cultural: 'Jamaica/Caribbean - modern dancehall'
  },
  {
    id: 'calypso',
    name: 'Calypso Classic',
    numerals: ['I', 'IV', 'V', 'I'],
    description: 'Simple but effective Caribbean progression.',
    genres: ['calypso', 'soca', 'caribbean'],
    mood: 'Joyful, celebratory, carnival',
    cultural: 'Trinidad & Tobago - carnival tradition'
  },

  // UK Urban
  {
    id: 'grime-dark',
    name: 'Grime Tension',
    numerals: ['i', 'iv', 'i', 'VI'],
    description: 'Dark, tense minor progression for grime.',
    genres: ['grime', 'uk rap'],
    mood: 'Dark, intense, urban',
    cultural: 'London - Bow E3, pirate radio roots'
  },
  {
    id: 'uk-garage',
    name: 'UK Garage Swing',
    numerals: ['ii', 'V', 'I', 'vi'],
    description: 'Jazzy progression with that 2-step swing.',
    genres: ['uk garage', '2-step'],
    mood: 'Smooth, swinging, sophisticated',
    cultural: 'London - late 90s garage scene'
  },
  {
    id: 'drill-minor',
    name: 'UK Drill',
    numerals: ['i', 'VI', 'VII', 'i'],
    description: 'Dark minor progression for drill tracks.',
    genres: ['uk drill', 'trap'],
    mood: 'Dark, hard, street',
    cultural: 'London - South London drill scene'
  },

  // Gospel & Soul
  {
    id: 'gospel-traditional',
    name: 'Gospel Traditional',
    numerals: ['I', 'I7', 'IV', 'iv', 'I', 'V', 'I'],
    description: 'Classic gospel with the minor IV chord.',
    genres: ['gospel', 'soul'],
    mood: 'Uplifting, spiritual, powerful',
    cultural: 'African-American church tradition'
  },
  {
    id: 'neo-soul',
    name: 'Neo Soul Smooth',
    numerals: ['ii7', 'V7', 'Imaj7', 'vi7'],
    description: 'Jazzy soul progression with 7th chords.',
    genres: ['neo-soul', 'r&b', 'jazz'],
    mood: 'Smooth, sophisticated, mellow',
    famous: ["Erykah Badu", "D'Angelo", "Jill Scott"]
  },

  // African
  {
    id: 'afrobeats-groove',
    name: 'Afrobeats Groove',
    numerals: ['I', 'IV', 'vi', 'V'],
    description: 'Modern Afrobeats progression.',
    genres: ['afrobeats', 'afropop'],
    mood: 'Groovy, joyful, danceable',
    cultural: 'Nigeria/Ghana - Lagos sound'
  },
  {
    id: 'highlife',
    name: 'Highlife Classic',
    numerals: ['I', 'IV', 'I', 'V', 'I'],
    description: 'Traditional West African highlife.',
    genres: ['highlife', 'afrobeats'],
    mood: 'Celebratory, warm, nostalgic',
    cultural: 'Ghana/Nigeria - palm wine music tradition'
  },

  // Jazz & Blues
  {
    id: 'twelve-bar-blues',
    name: 'Twelve Bar Blues',
    numerals: ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'],
    description: 'The foundation of blues, rock, and so much more.',
    genres: ['blues', 'rock', 'jazz'],
    mood: 'Soulful, earthy, expressive',
    famous: ['Sweet Home Chicago', 'The Thrill Is Gone']
  },
  {
    id: 'jazz-two-five-one',
    name: 'Jazz ii-V-I',
    numerals: ['ii7', 'V7', 'Imaj7'],
    description: 'The essential jazz progression.',
    genres: ['jazz', 'bossa nova'],
    mood: 'Sophisticated, smooth, resolved',
    cultural: 'American jazz tradition - bebop to modern'
  },
  {
    id: 'rhythm-changes',
    name: 'Rhythm Changes',
    numerals: ['I', 'vi', 'ii', 'V', 'I', 'vi', 'ii', 'V'],
    description: 'Based on "I Got Rhythm" - jazz standard.',
    genres: ['jazz', 'swing'],
    mood: 'Swinging, energetic, playful'
  }
];

// ============================================
// SCALES FOR MELODY WRITING
// ============================================

export const SCALES: Scale[] = [
  {
    id: 'major',
    name: 'Major Scale',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    mood: 'Happy, bright, resolved',
    genres: ['pop', 'country', 'gospel'],
    description: 'The foundation of Western music. Happy and resolved.'
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    mood: 'Sad, dark, emotional',
    genres: ['pop', 'rock', 'classical'],
    description: 'The sad scale. Emotional and reflective.'
  },
  {
    id: 'pentatonic-major',
    name: 'Major Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    mood: 'Open, folk, universal',
    genres: ['pop', 'country', 'folk', 'world'],
    description: 'Five notes that work over almost anything. Impossible to sound bad.'
  },
  {
    id: 'pentatonic-minor',
    name: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    mood: 'Bluesy, soulful, rock',
    genres: ['blues', 'rock', 'r&b'],
    description: 'The blues scale without the blue note. Instantly soulful.'
  },
  {
    id: 'blues',
    name: 'Blues Scale',
    intervals: [0, 3, 5, 6, 7, 10],
    mood: 'Bluesy, gritty, emotional',
    genres: ['blues', 'rock', 'jazz', 'r&b'],
    description: 'Minor pentatonic plus the "blue note". Raw emotion.'
  },
  {
    id: 'dorian',
    name: 'Dorian Mode',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    mood: 'Jazzy minor, sophisticated, groovy',
    genres: ['jazz', 'funk', 'neo-soul'],
    description: 'Minor scale with a raised 6th. Sophisticated and groovy.'
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian Mode',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    mood: 'Bluesy major, rock, folk',
    genres: ['rock', 'blues', 'folk', 'reggae'],
    description: 'Major scale with a flat 7th. Rock and blues essential.'
  },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    mood: 'Exotic, dramatic, Middle Eastern',
    genres: ['classical', 'metal', 'world'],
    description: 'Natural minor with raised 7th. Dramatic and exotic.'
  }
];

// ============================================
// MELODIC PATTERNS & CONTOURS
// ============================================

export const MELODIC_PATTERNS: MelodicPattern[] = [
  {
    id: 'ascending',
    name: 'Rising Line',
    contour: ['up', 'up', 'up', 'up'],
    description: 'Steadily climbing melody. Builds energy and hope.',
    emotion: 'Hope, building, aspiration',
    example: 'Somewhere Over The Rainbow opening'
  },
  {
    id: 'descending',
    name: 'Falling Line',
    contour: ['down', 'down', 'down', 'down'],
    description: 'Steadily falling melody. Resolution or sadness.',
    emotion: 'Sadness, resolution, calm',
    example: 'Joy To The World opening'
  },
  {
    id: 'arch',
    name: 'The Arch',
    contour: ['up', 'up', 'same', 'down', 'down'],
    description: 'Rise and fall. The most common melodic shape.',
    emotion: 'Complete thought, satisfying',
    example: 'Most nursery rhymes'
  },
  {
    id: 'inverted-arch',
    name: 'The Valley',
    contour: ['down', 'down', 'same', 'up', 'up'],
    description: 'Dip then rise. Creates tension then release.',
    emotion: 'Tension, anticipation, release',
    example: 'National anthems often use this'
  },
  {
    id: 'hook-jump',
    name: 'The Hook Jump',
    contour: ['jump-up', 'down', 'down', 'same'],
    description: 'Big jump up then stepwise down. Attention-grabbing.',
    emotion: 'Excitement, memorable, catchy',
    example: 'Star Wars theme, My Heart Will Go On'
  },
  {
    id: 'stepwise',
    name: 'Stepwise Motion',
    contour: ['up', 'down', 'up', 'down'],
    description: 'Small steps up and down. Smooth and singable.',
    emotion: 'Gentle, flowing, easy',
    example: 'Most folk melodies'
  },
  {
    id: 'call-response',
    name: 'Call & Response',
    contour: ['up', 'up', 'same', 'down', 'down', 'down'],
    description: 'Question phrase followed by answer phrase.',
    emotion: 'Conversational, traditional, interactive',
    example: 'African & Caribbean musical traditions'
  },
  {
    id: 'pentatonic-riff',
    name: 'Pentatonic Riff',
    contour: ['jump-up', 'down', 'jump-down', 'up'],
    description: 'Bouncy pattern using pentatonic scale jumps.',
    emotion: 'Catchy, universal, memorable',
    example: 'My Girl intro, Amazing Grace'
  }
];

// ============================================
// SONG SECTIONS
// ============================================

export const SONG_SECTIONS: SongSection[] = [
  {
    id: 'intro',
    name: 'Intro',
    purpose: 'Set the mood, introduce the sound world, hook the listener.',
    typicalBars: 8,
    tips: [
      'Can be instrumental or have vocals',
      'Often uses a signature riff or hook',
      'Sets the energy level for the song',
      'Keep it short - get to the verse!'
    ]
  },
  {
    id: 'verse',
    name: 'Verse',
    purpose: 'Tell the story. Build toward the chorus.',
    typicalBars: 16,
    tips: [
      'Each verse should advance the story',
      'Keep melody lower than chorus',
      'Build energy toward the pre-chorus or chorus',
      'Verses can have the same melody but different lyrics'
    ],
    lyricalFocus: 'Story, details, setup, character, scene-setting'
  },
  {
    id: 'pre-chorus',
    name: 'Pre-Chorus',
    purpose: 'Build tension before the chorus explodes.',
    typicalBars: 4,
    tips: [
      'Raises energy from verse to chorus',
      'Often changes chord pattern',
      'Melody should lift toward chorus',
      'Creates anticipation - the "lift"'
    ],
    lyricalFocus: 'Transition, building tension, leading to main message'
  },
  {
    id: 'chorus',
    name: 'Chorus',
    purpose: 'The hook! Main message. Most memorable part.',
    typicalBars: 8,
    tips: [
      'Highest energy section',
      'Contains the song title (usually)',
      'Most repetitive - easy to sing along',
      'Melody should be the catchiest part'
    ],
    lyricalFocus: 'Main message, hook, emotional peak, title'
  },
  {
    id: 'post-chorus',
    name: 'Post-Chorus',
    purpose: 'Extend the chorus energy. Extra hook.',
    typicalBars: 4,
    tips: [
      'Maintains chorus energy',
      'Often instrumental or minimal lyrics',
      'Can feature additional hook or chant',
      'Popular in modern pop production'
    ]
  },
  {
    id: 'bridge',
    name: 'Bridge',
    purpose: 'Contrast. New perspective. Break the pattern.',
    typicalBars: 8,
    tips: [
      'Different chords than verse/chorus',
      'Often in a different key or mode',
      'Provides emotional shift',
      'Only happens once in the song'
    ],
    lyricalFocus: 'New perspective, twist, revelation, reflection'
  },
  {
    id: 'breakdown',
    name: 'Breakdown',
    purpose: 'Strip back for impact. Build to finale.',
    typicalBars: 8,
    tips: [
      'Reduces instrumentation',
      'Creates contrast for final chorus',
      'Often just vocals and minimal backing',
      'Common in dance and electronic music'
    ]
  },
  {
    id: 'outro',
    name: 'Outro',
    purpose: 'End the song. Leave lasting impression.',
    typicalBars: 8,
    tips: [
      'Can fade out or end definitively',
      'Often repeats chorus or hook',
      'May introduce new element for surprise',
      'Dont overstay - know when to end!'
    ]
  },
  {
    id: 'drop',
    name: 'Drop',
    purpose: 'Maximum impact moment. Dance music essential.',
    typicalBars: 16,
    tips: [
      'Full energy release after build',
      'All elements come in together',
      'The moment the crowd goes wild',
      'Essential for electronic/dance genres'
    ],
    lyricalFocus: 'Usually instrumental or minimal vocals'
  }
];

// ============================================
// SONG STRUCTURES BY GENRE
// ============================================

export const SONG_STRUCTURES: SongStructure[] = [
  {
    id: 'pop-standard',
    name: 'Pop Standard',
    sections: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'bridge', 'chorus', 'outro'],
    genres: ['pop', 'rock', 'r&b'],
    description: 'The most common pop structure. Proven to work.',
    totalBars: 80
  },
  {
    id: 'pop-modern',
    name: 'Modern Pop',
    sections: ['chorus', 'verse', 'pre-chorus', 'chorus', 'post-chorus', 'verse', 'pre-chorus', 'chorus', 'bridge', 'chorus', 'outro'],
    genres: ['pop', 'dance-pop'],
    description: 'Starts with chorus hook. Gets to the point fast.',
    totalBars: 96
  },
  {
    id: 'verse-chorus-simple',
    name: 'Simple Verse-Chorus',
    sections: ['verse', 'chorus', 'verse', 'chorus', 'chorus'],
    genres: ['folk', 'country', 'reggae'],
    description: 'Stripped back. Lets the song breathe.',
    totalBars: 64
  },
  {
    id: 'aaba',
    name: 'AABA (Tin Pan Alley)',
    sections: ['verse', 'verse', 'bridge', 'verse'],
    genres: ['jazz', 'standards', 'musical theatre'],
    description: 'Classic song form. Timeless elegance.',
    totalBars: 32
  },
  {
    id: 'edm-structure',
    name: 'EDM/Dance',
    sections: ['intro', 'breakdown', 'drop', 'breakdown', 'drop', 'outro'],
    genres: ['edm', 'house', 'techno'],
    description: 'Built for the dancefloor. Build and release.',
    totalBars: 128
  },
  {
    id: 'hip-hop',
    name: 'Hip-Hop Classic',
    sections: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'verse', 'chorus', 'outro'],
    genres: ['hip-hop', 'rap', 'grime'],
    description: 'Three verses with hooks. Room for storytelling.',
    totalBars: 96
  },
  {
    id: 'dancehall-riddim',
    name: 'Dancehall Riddim',
    sections: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'breakdown', 'chorus', 'outro'],
    genres: ['dancehall', 'reggae'],
    description: 'Riddim-driven structure with breakdown for DJ.',
    totalBars: 80
  },
  {
    id: 'gospel',
    name: 'Gospel Traditional',
    sections: ['intro', 'verse', 'chorus', 'verse', 'chorus', 'vamp', 'chorus', 'outro'],
    genres: ['gospel', 'soul'],
    description: 'Includes vamp section for spontaneous worship.',
    totalBars: 96
  }
];

// ============================================
// RHYME TYPES
// ============================================

export const RHYME_TYPES: RhymeType[] = [
  {
    id: 'perfect',
    name: 'Perfect Rhyme',
    description: 'Exact match of ending sounds. Classic and satisfying.',
    example: ['love', 'above']
  },
  {
    id: 'near',
    name: 'Near/Slant Rhyme',
    description: 'Similar but not exact sounds. More subtle.',
    example: ['love', 'move']
  },
  {
    id: 'internal',
    name: 'Internal Rhyme',
    description: 'Rhymes within the same line. Adds flow.',
    example: ['I bring the bling', 'and make the thing swing']
  },
  {
    id: 'multisyllabic',
    name: 'Multi-Syllable Rhyme',
    description: 'Multiple syllables rhyming. Impressive and complex.',
    example: ['elevation', 'celebration']
  },
  {
    id: 'assonance',
    name: 'Assonance',
    description: 'Matching vowel sounds only. Musical quality.',
    example: ['light', 'mind']
  },
  {
    id: 'consonance',
    name: 'Consonance',
    description: 'Matching consonant sounds. Rhythmic effect.',
    example: ['blank', 'think']
  },
  {
    id: 'identity',
    name: 'Identity Rhyme',
    description: 'Same word or homophone. Use sparingly.',
    example: ['time', 'time'] // or ['there', 'their']
  }
];

// ============================================
// LYRIC WRITING PROMPTS
// ============================================

export const LYRIC_PROMPTS: LyricPrompt[] = [
  // Love & Relationships
  {
    id: 'love-first-sight',
    theme: 'Love',
    prompt: 'Describe the moment you first saw someone who changed everything.',
    keywords: ['eyes', 'moment', 'frozen', 'heart', 'knew']
  },
  {
    id: 'love-distance',
    theme: 'Love',
    prompt: 'Write about loving someone who is far away.',
    keywords: ['miles', 'ocean', 'phone', 'waiting', 'tomorrow']
  },
  {
    id: 'heartbreak',
    theme: 'Heartbreak',
    prompt: 'Describe the last time you spoke to someone you loved.',
    keywords: ['goodbye', 'door', 'silence', 'tears', 'remember']
  },

  // Identity & Heritage
  {
    id: 'roots',
    theme: 'Heritage',
    prompt: 'Write about where your family comes from and what it means to you.',
    keywords: ['ancestors', 'home', 'blood', 'story', 'proud'],
    cultural: 'Caribbean diaspora - roots and identity'
  },
  {
    id: 'dual-identity',
    theme: 'Identity',
    prompt: 'Describe feeling caught between two cultures or worlds.',
    keywords: ['between', 'language', 'passport', 'belong', 'both'],
    cultural: 'British-Caribbean experience'
  },
  {
    id: 'grandmother-kitchen',
    theme: 'Heritage',
    prompt: 'Write about your grandmother\'s kitchen and the smells, sounds, stories.',
    keywords: ['rice', 'spice', 'stories', 'hands', 'recipe'],
    cultural: 'Caribbean family traditions'
  },

  // Struggle & Triumph
  {
    id: 'overcome',
    theme: 'Triumph',
    prompt: 'Write about something everyone said you couldn\'t do, but you did.',
    keywords: ['doubt', 'prove', 'rise', 'despite', 'finally']
  },
  {
    id: 'streets',
    theme: 'Struggle',
    prompt: 'Describe the streets you grew up on - the good and the bad.',
    keywords: ['block', 'corner', 'concrete', 'dreams', 'escape'],
    cultural: 'UK urban experience'
  },
  {
    id: 'hustle',
    theme: 'Ambition',
    prompt: 'Write about working toward a dream while everyone else sleeps.',
    keywords: ['late', 'grind', 'sacrifice', 'vision', 'one day']
  },

  // Joy & Celebration
  {
    id: 'carnival',
    theme: 'Celebration',
    prompt: 'Capture the energy of carnival - the music, the movement, the freedom.',
    keywords: ['jump', 'wine', 'colour', 'free', 'sun'],
    cultural: 'Notting Hill Carnival / Caribbean carnival'
  },
  {
    id: 'saturday-night',
    theme: 'Joy',
    prompt: 'Describe the feeling when your favourite song comes on.',
    keywords: ['bass', 'move', 'forget', 'alive', 'tonight']
  },

  // Spirituality & Reflection
  {
    id: 'faith',
    theme: 'Spirituality',
    prompt: 'Write about a moment when faith carried you through.',
    keywords: ['prayer', 'light', 'strength', 'believe', 'grace'],
    cultural: 'Gospel tradition'
  },
  {
    id: 'quiet-moment',
    theme: 'Reflection',
    prompt: 'Describe a quiet moment when you realised something important.',
    keywords: ['silence', 'realise', 'breathe', 'finally', 'peace']
  },

  // Social Commentary
  {
    id: 'change',
    theme: 'Social',
    prompt: 'Write about something in the world you want to change.',
    keywords: ['rise', 'voice', 'together', 'enough', 'change']
  },
  {
    id: 'next-gen',
    theme: 'Legacy',
    prompt: 'Write a message to the next generation coming up behind you.',
    keywords: ['teach', 'learn', 'path', 'future', 'yours']
  }
];

// ============================================
// COMMON RHYMING WORDS (Grouped by Sound)
// ============================================

export const RHYME_GROUPS: { [key: string]: string[] } = {
  'ay': ['day', 'way', 'say', 'play', 'stay', 'pray', 'away', 'today', 'okay', 'display', 'betray', 'hooray'],
  'ee': ['me', 'be', 'see', 'free', 'tree', 'key', 'we', 'dream', 'believe', 'receive', 'achieve'],
  'ight': ['night', 'light', 'right', 'fight', 'sight', 'bright', 'tight', 'might', 'flight', 'ignite', 'delight'],
  'ove': ['love', 'above', 'dove', 'of', 'shove', 'glove'],
  'ow': ['know', 'go', 'show', 'flow', 'grow', 'low', 'below', 'tomorrow', 'follow', 'shadow'],
  'ine': ['time', 'mine', 'line', 'fine', 'shine', 'divine', 'combine', 'define', 'design', 'wine', 'sign'],
  'eart': ['heart', 'start', 'part', 'art', 'apart', 'smart', 'chart', 'depart'],
  'ound': ['sound', 'ground', 'around', 'found', 'bound', 'round', 'profound', 'surround'],
  'ain': ['rain', 'pain', 'gain', 'train', 'brain', 'chain', 'remain', 'explain', 'contain', 'maintain'],
  'ire': ['fire', 'desire', 'higher', 'inspire', 'require', 'entire', 'retire', 'admire'],
};

// ============================================
// SYLLABLE PATTERNS FOR FLOW
// ============================================

export const SYLLABLE_PATTERNS: { name: string; pattern: number[]; description: string }[] = [
  { name: 'Common 8s', pattern: [8, 8, 8, 8], description: 'Classic 8 syllables per line. Easy to follow.' },
  { name: 'Ballad Meter', pattern: [8, 6, 8, 6], description: 'Alternating 8 and 6. Traditional ballad feel.' },
  { name: 'Rap 16s', pattern: [16, 16, 16, 16], description: 'Dense 16 syllables. Fast flow.' },
  { name: 'Short Punchy', pattern: [4, 4, 4, 4], description: 'Short lines. Impact and emphasis.' },
  { name: 'Build Up', pattern: [4, 6, 8, 10], description: 'Lines get longer. Building energy.' },
  { name: 'Wind Down', pattern: [10, 8, 6, 4], description: 'Lines get shorter. Winding down.' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getProgressionsByGenre = (genre: string): ChordProgression[] => {
  return CHORD_PROGRESSIONS.filter(p => p.genres.includes(genre.toLowerCase()));
};

export const getProgressionsByMood = (mood: string): ChordProgression[] => {
  return CHORD_PROGRESSIONS.filter(p => 
    p.mood.toLowerCase().includes(mood.toLowerCase())
  );
};

export const getScaleNotes = (rootNote: string, scaleId: string): string[] => {
  const scale = SCALES.find(s => s.id === scaleId);
  if (!scale) return [];
  
  const rootIndex = NOTES.indexOf(rootNote);
  if (rootIndex === -1) return [];
  
  return scale.intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
};

export const getChordsInKey = (key: string): string[] => {
  return KEY_CHORDS[key] || [];
};

export const findRhymes = (word: string): string[] => {
  const lowerWord = word.toLowerCase();
  for (const [, words] of Object.entries(RHYME_GROUPS)) {
    if (words.some(w => w.toLowerCase() === lowerWord)) {
      return words.filter(w => w.toLowerCase() !== lowerWord);
    }
  }
  return [];
};

export const countSyllables = (text: string): number => {
  // Simple syllable counter (not perfect but good enough)
  const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
  let total = 0;
  
  words.forEach(word => {
    if (word.length === 0) return;
    // Count vowel groups
    const matches = word.match(/[aeiouy]+/g);
    let count = matches ? matches.length : 1;
    // Adjust for silent e
    if (word.endsWith('e') && count > 1) count--;
    // Adjust for -le endings
    if (word.endsWith('le') && word.length > 2 && !/[aeiouy]/.test(word[word.length - 3])) count++;
    total += Math.max(1, count);
  });
  
  return total;
};

// ============================================
// LIBRARY STATS
// ============================================

export const SONGWRITING_STATS = {
  chordProgressions: CHORD_PROGRESSIONS.length,
  scales: SCALES.length,
  melodicPatterns: MELODIC_PATTERNS.length,
  songSections: SONG_SECTIONS.length,
  songStructures: SONG_STRUCTURES.length,
  rhymeTypes: RHYME_TYPES.length,
  lyricPrompts: LYRIC_PROMPTS.length
};