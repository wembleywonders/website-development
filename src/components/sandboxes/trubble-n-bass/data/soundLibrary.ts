/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Trubble n Bass - Sound Effects & Music Library
 * Comprehensive sound library for radio production, podcasting, and music creation.
 * 
 * "From Rayd-yo jingles to full productions."
 */

// ============================================
// TYPES
// ============================================

export interface SoundCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  description?: string;
}

export interface MoodCategory {
  id: string;
  name: string;
  featured: boolean;
  color: string;
  description?: string;
}

export interface Genre {
  id: string;
  name: string;
  icon: string;
  description: string;
  bpmRange?: [number, number];
}

// ============================================
// SOUND EFFECTS LIBRARY - 19 Categories, 150+ Subcategories
// ============================================

export const SOUND_EFFECT_CATEGORIES: SoundCategory[] = [
  {
    id: 'air',
    name: 'Air',
    icon: '💨',
    description: 'Wind, breath, and atmospheric air sounds',
    subcategories: ['Blow', 'Burst', 'Hiss', 'Misc', 'Suction']
  },
  {
    id: 'aircraft',
    name: 'Aircraft',
    icon: '✈️',
    description: 'Planes, helicopters, and flying vehicles',
    subcategories: [
      'Helicopter', 'Interior', 'Jet', 'Military', 'Misc',
      'Prop', 'Radio Controlled', 'Rocket'
    ]
  },
  {
    id: 'alarms',
    name: 'Alarms',
    icon: '🚨',
    description: 'Alert sounds, sirens, and warning tones',
    subcategories: ['Bell', 'Buzzer', 'Clock', 'Electronic', 'Misc', 'Siren']
  },
  {
    id: 'ambience',
    name: 'Ambience',
    icon: '🌍',
    description: 'Environmental backgrounds and atmospheres',
    subcategories: [
      'Air', 'Alpine', 'Amusement', 'Birdsong', 'Celebration', 'Construction',
      'Desert', 'Designed', 'Emergency', 'Fantasy', 'Farm', 'Forest',
      'Grassland', 'Historical', 'Hitech', 'Hospital', 'Industrial', 'Insect',
      'Lakeside', 'Market', 'Misc', 'Nautical', 'Office', 'Park', 'Prison',
      'Protest', 'Public Place', 'Religious', 'Residential', 'Restaurant & Bar',
      'Room Tone', 'Rural', 'School', 'Scifi', 'Seaside', 'Sport', 'Suburban',
      'Swamp', 'Town', 'Traffic', 'Transportation', 'Tropical', 'Tundra',
      'Underground', 'Underwater', 'Urban', 'Warfare'
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    description: 'Creature sounds from around the world',
    subcategories: [
      'Amphibian', 'Aquatic', 'Bat', 'Cat Domestic', 'Cat Wild', 'Dog',
      'Dog Wild', 'Farm', 'Horse', 'Insect', 'Misc', 'Primate', 'Reptile',
      'Rodent', 'Wild'
    ]
  },
  {
    id: 'archived',
    name: 'Archived',
    icon: '📦',
    description: 'Technical and reference sounds',
    subcategories: ['Impulse Response', 'Test Tone', 'Wtf']
  },
  {
    id: 'beeps',
    name: 'Beeps',
    icon: '📟',
    description: 'Electronic beeps and notification sounds',
    subcategories: ['Appliance', 'General', 'Lofi', 'Medical', 'Timer', 'Vehicle']
  },
  {
    id: 'bells',
    name: 'Bells',
    icon: '🔔',
    description: 'Bell sounds from doorbells to church bells',
    subcategories: ['Animal', 'Doorbell', 'Gong', 'Handbell', 'Large', 'Misc']
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: '🐦',
    description: 'Bird calls and wing sounds',
    subcategories: [
      'Bird Of Prey', 'Crow', 'Fowl', 'Misc', 'Sea', 'Songbird',
      'Tropical', 'Wading'
    ]
  },
  {
    id: 'boats',
    name: 'Boats',
    icon: '⛵',
    description: 'Marine vessels and water craft',
    subcategories: [
      'Air Boat', 'Bow Wash', 'Door', 'Fishing', 'Horn', 'Interior',
      'Mechanism', 'Misc', 'Motorboat', 'Racing', 'Rowboat', 'Sailboat',
      'Ship', 'Steam', 'Submarine', 'Underwater'
    ]
  },
  {
    id: 'bullets',
    name: 'Bullets',
    icon: '💥',
    description: 'Projectile and impact sounds',
    subcategories: ['By', 'Impact', 'Misc', 'Ricochet', 'Shell']
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    icon: '🎭',
    description: 'Classic cartoon and comedy effects',
    subcategories: [
      'Animal', 'Boing', 'Creak', 'Horn', 'Impact', 'Machine', 'Misc',
      'Musical', 'Pluck', 'Pop', 'Shake', 'Splat', 'Squeak', 'Stretch',
      'Swish', 'Twang', 'Vehicle', 'Vocal', 'Warble', 'Whistle'
    ]
  },
  {
    id: 'ceramics',
    name: 'Ceramics',
    icon: '🏺',
    description: 'Pottery, plates, and breakable objects',
    subcategories: ['Break', 'Crash & Debris', 'Friction', 'Handle', 'Impact', 'Movement']
  },
  {
    id: 'chains',
    name: 'Chains',
    icon: '⛓️',
    description: 'Metal chain and link sounds',
    subcategories: ['Handle', 'Impact', 'Movement']
  },
  {
    id: 'chemicals',
    name: 'Chemicals',
    icon: '🧪',
    description: 'Chemical reactions and laboratory sounds',
    subcategories: ['Acid', 'Reaction']
  },
  {
    id: 'clocks',
    name: 'Clocks',
    icon: '🕐',
    description: 'Timepiece sounds and mechanisms',
    subcategories: ['Chime', 'Mechanics', 'Misc', 'Tick']
  },
  {
    id: 'cloth',
    name: 'Cloth',
    icon: '🧵',
    description: 'Fabric, clothing, and textile sounds',
    subcategories: ['Flap', 'Handle', 'Impact', 'Movement', 'Rip']
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: '📡',
    description: 'Technology and communication devices',
    subcategories: [
      'Audio Visual', 'Camera', 'Cellphone', 'Microphone', 'Misc',
      'Phonograph', 'Radio', 'Static', 'Telemetry', 'Telephone',
      'Television', 'Transceiver', 'Typewriter'
    ]
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: '💻',
    description: 'Computer and digital device sounds',
    subcategories: ['Hard Drive', 'Keyboard & Mouse', 'Misc']
  },
  {
    id: 'creatures',
    name: 'Creatures',
    icon: '👾',
    description: 'Fantasy and sci-fi creature sounds',
    subcategories: ['Misc', 'Monster', 'Alien', 'Zombie', 'Robot']
  }
];

// ============================================
// MUSIC MOODS - Featured + A-Z
// ============================================

export const MOOD_CATEGORIES: MoodCategory[] = [
  // Featured Moods (primary selection)
  { id: 'happy', name: 'Happy', featured: true, color: '#FFD93D', description: 'Upbeat, joyful, positive energy' },
  { id: 'dreamy', name: 'Dreamy', featured: true, color: '#C9B1FF', description: 'Ethereal, floating, atmospheric' },
  { id: 'epic', name: 'Epic', featured: true, color: '#FF6B35', description: 'Grand, cinematic, powerful' },
  { id: 'laid-back', name: 'Laid Back', featured: true, color: '#6BCB77', description: 'Relaxed, easy-going, chill' },
  { id: 'euphoric', name: 'Euphoric', featured: true, color: '#FF69B4', description: 'Ecstatic, peak energy, blissful' },
  { id: 'quirky', name: 'Quirky', featured: true, color: '#00D9FF', description: 'Playful, unusual, whimsical' },
  { id: 'suspense', name: 'Suspense', featured: true, color: '#4A4A4A', description: 'Tension, anticipation, thriller' },
  { id: 'running', name: 'Running', featured: true, color: '#FF4757', description: 'Fast-paced, energetic, driving' },
  { id: 'relaxing', name: 'Relaxing', featured: true, color: '#54A0FF', description: 'Calm, soothing, peaceful' },
  { id: 'mysterious', name: 'Mysterious', featured: true, color: '#5F27CD', description: 'Enigmatic, intriguing, dark' },
  { id: 'sentimental', name: 'Sentimental', featured: true, color: '#FF9FF3', description: 'Emotional, nostalgic, heartfelt' },
  { id: 'sad', name: 'Sad', featured: true, color: '#576574', description: 'Melancholy, emotional, reflective' },

  // A-Z Extended Moods
  { id: 'angry', name: 'Angry', featured: false, color: '#EE5A24', description: 'Aggressive, intense, furious' },
  { id: 'busy-frantic', name: 'Busy & Frantic', featured: false, color: '#F79F1F', description: 'Chaotic, rushed, hectic' },
  { id: 'changing-tempo', name: 'Changing Tempo', featured: false, color: '#A3CB38', description: 'Dynamic speed shifts' },
  { id: 'chasing', name: 'Chasing', featured: false, color: '#12CBC4', description: 'Pursuit, chase scenes, urgent' },
  { id: 'dark', name: 'Dark', featured: false, color: '#1B1464', description: 'Sinister, ominous, foreboding' },
  { id: 'eccentric', name: 'Eccentric', featured: false, color: '#FDA7DF', description: 'Unusual, odd, unconventional' },
  { id: 'elegant', name: 'Elegant', featured: false, color: '#D4AF37', description: 'Sophisticated, refined, classy' },
  { id: 'fear', name: 'Fear', featured: false, color: '#2C3A47', description: 'Horror, scary, frightening' },
  { id: 'floating', name: 'Floating', featured: false, color: '#82CCDD', description: 'Weightless, drifting, ambient' },
  { id: 'funny', name: 'Funny', featured: false, color: '#FDCB6E', description: 'Comedic, humorous, silly' },
  { id: 'glamorous', name: 'Glamorous', featured: false, color: '#E84393', description: 'Luxurious, stylish, fashionable' },
  { id: 'heavy-ponderous', name: 'Heavy & Ponderous', featured: false, color: '#636E72', description: 'Weighty, slow, massive' },
  { id: 'hopeful', name: 'Hopeful', featured: false, color: '#00B894', description: 'Optimistic, uplifting, promising' },
  { id: 'marching', name: 'Marching', featured: false, color: '#D63031', description: 'Military, parade, rhythmic' },
  { id: 'peaceful', name: 'Peaceful', featured: false, color: '#74B9FF', description: 'Tranquil, serene, calm' },
  { id: 'restless', name: 'Restless', featured: false, color: '#E17055', description: 'Uneasy, agitated, nervous' },
  { id: 'romantic', name: 'Romantic', featured: false, color: '#FD79A8', description: 'Love, passion, intimate' },
  { id: 'scary', name: 'Scary', featured: false, color: '#2D3436', description: 'Horror, frightening, terrifying' },
  { id: 'sexy', name: 'Sexy', featured: false, color: '#B53471', description: 'Sensual, seductive, sultry' },
  { id: 'smooth', name: 'Smooth', featured: false, color: '#00CEC9', description: 'Silky, polished, flowing' },
  { id: 'sneaking', name: 'Sneaking', featured: false, color: '#81ECEC', description: 'Stealthy, covert, subtle' },
  { id: 'weird', name: 'Weird', featured: false, color: '#6C5CE7', description: 'Strange, bizarre, otherworldly' }
];

// ============================================
// MUSIC GENRES
// ============================================

export const MUSIC_GENRES: Genre[] = [
  {
    id: 'pop',
    name: 'Pop',
    icon: '🎤',
    description: 'Contemporary popular music with catchy melodies and hooks',
    bpmRange: [100, 130]
  },
  {
    id: 'rock',
    name: 'Rock',
    icon: '🎸',
    description: 'Guitar-driven music with strong rhythms and energy',
    bpmRange: [110, 140]
  },
  {
    id: 'electronic',
    name: 'Electronic',
    icon: '🎛️',
    description: 'Synthesizer and computer-based music production',
    bpmRange: [120, 150]
  },
  {
    id: 'jazz',
    name: 'Jazz',
    icon: '🎺',
    description: 'Improvisational music with complex harmonies and rhythms',
    bpmRange: [80, 160]
  },
  {
    id: 'classical',
    name: 'Classical',
    icon: '🎻',
    description: 'Orchestral and chamber music from the Western tradition',
    bpmRange: [40, 180]
  },
  {
    id: 'country',
    name: 'Country',
    icon: '🤠',
    description: 'American roots music with storytelling and acoustic instruments',
    bpmRange: [90, 130]
  },
  {
    id: 'acoustic',
    name: 'Acoustic',
    icon: '🪕',
    description: 'Unplugged, natural instrument-based music',
    bpmRange: [70, 120]
  },
  {
    id: 'hip-hop',
    name: 'Hip-Hop',
    icon: '🎧',
    description: 'Rhythm and poetry with beats and sampling',
    bpmRange: [80, 115]
  },
  {
    id: 'funk',
    name: 'Funk',
    icon: '🕺',
    description: 'Groove-heavy music with syncopated bass and rhythms',
    bpmRange: [100, 130]
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all subcategories for a sound effect category
 */
export const getSubcategories = (categoryId: string): string[] => {
  const category = SOUND_EFFECT_CATEGORIES.find(c => c.id === categoryId);
  return category?.subcategories || [];
};

/**
 * Get featured moods for quick selection
 */
export const getFeaturedMoods = (): MoodCategory[] => {
  return MOOD_CATEGORIES.filter(m => m.featured);
};

/**
 * Get all moods sorted alphabetically
 */
export const getAllMoodsSorted = (): MoodCategory[] => {
  return [...MOOD_CATEGORIES].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Search sound effects by keyword
 */
export const searchSoundEffects = (query: string): SoundCategory[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return SOUND_EFFECT_CATEGORIES;
  
  return SOUND_EFFECT_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(lowerQuery) ||
    category.description?.toLowerCase().includes(lowerQuery) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get flat list of all sound effect paths (category/subcategory)
 */
export const getAllSoundEffectPaths = (): { category: string; subcategory: string; path: string }[] => {
  const paths: { category: string; subcategory: string; path: string }[] = [];

  SOUND_EFFECT_CATEGORIES.forEach(category => {
    category.subcategories.forEach(subcategory => {
      paths.push({
        category: category.name,
        subcategory,
        path: `${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`
      });
    });
  });

  return paths;
};

/**
 * Get total count of sound effect subcategories
 */
export const getTotalSoundEffectCount = (): number => {
  return SOUND_EFFECT_CATEGORIES.reduce((total, cat) => total + cat.subcategories.length, 0);
};

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): SoundCategory | undefined => {
  return SOUND_EFFECT_CATEGORIES.find(c => c.id === id);
};

/**
 * Get mood by ID
 */
export const getMoodById = (id: string): MoodCategory | undefined => {
  return MOOD_CATEGORIES.find(m => m.id === id);
};

/**
 * Get genre by ID
 */
export const getGenreById = (id: string): Genre | undefined => {
  return MUSIC_GENRES.find(g => g.id === id);
};

/**
 * Filter genres by BPM
 */
export const getGenresByBpm = (bpm: number): Genre[] => {
  return MUSIC_GENRES.filter(g => {
    if (!g.bpmRange) return true;
    return bpm >= g.bpmRange[0] && bpm <= g.bpmRange[1];
  });
};

// ============================================
// RAYD-YO PRODUCTION TEMPLATES
// ============================================

export interface ProductionTemplate {
  id: string;
  name: string;
  category: 'jingle' | 'soundbed' | 'sting' | 'intro' | 'outro';
  duration: number; // seconds
  bpm: number;
  description: string;
  suggestedMoods: string[];
  suggestedGenres: string[];
}

export const RAYDYO_TEMPLATES: ProductionTemplate[] = [
  {
    id: 'station-jingle-10',
    name: 'Station Jingle',
    category: 'jingle',
    duration: 10,
    bpm: 128,
    description: 'Punchy, memorable, broadcast-ready station identification',
    suggestedMoods: ['happy', 'euphoric', 'quirky'],
    suggestedGenres: ['pop', 'electronic']
  },
  {
    id: 'drama-soundbed-90',
    name: 'Drama Soundbed',
    category: 'soundbed',
    duration: 90,
    bpm: 80,
    description: 'Subtle, atmospheric, dialogue-friendly background',
    suggestedMoods: ['suspense', 'mysterious', 'dark'],
    suggestedGenres: ['classical', 'electronic']
  },
  {
    id: 'transition-sting-5',
    name: 'Transition Sting',
    category: 'sting',
    duration: 5,
    bpm: 120,
    description: 'Quick, punchy, clean impact for segment transitions',
    suggestedMoods: ['epic', 'running'],
    suggestedGenres: ['electronic', 'rock']
  },
  {
    id: 'show-intro-15',
    name: 'Show Intro',
    category: 'intro',
    duration: 15,
    bpm: 110,
    description: 'Energy-building opening for radio shows',
    suggestedMoods: ['happy', 'euphoric', 'epic'],
    suggestedGenres: ['pop', 'funk', 'hip-hop']
  },
  {
    id: 'show-outro-20',
    name: 'Show Outro',
    category: 'outro',
    duration: 20,
    bpm: 100,
    description: 'Smooth fadeout with branding space',
    suggestedMoods: ['laid-back', 'relaxing', 'sentimental'],
    suggestedGenres: ['jazz', 'acoustic']
  }
];

// ============================================
// EXPORT SUMMARY
// ============================================

export const LIBRARY_STATS = {
  soundCategories: SOUND_EFFECT_CATEGORIES.length,
  soundSubcategories: getTotalSoundEffectCount(),
  moods: MOOD_CATEGORIES.length,
  featuredMoods: getFeaturedMoods().length,
  genres: MUSIC_GENRES.length,
  templates: RAYDYO_TEMPLATES.length
};