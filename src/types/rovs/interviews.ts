/**
 * Interview Series Types
 * ======================
 * 
 * Defines the oral history interview series and their configurations.
 * Each series has specific themes, questions, and cultural considerations.
 */

// ============================================
// INTERVIEW SERIES ENUM
// ============================================

export type InterviewSeries =
  | 'ARRIVAL_STORIES'
  | 'ELDER_WISDOM'
  | 'ISLAND_KITCHEN'
  | 'BETWEEN_TWO_WORLDS'
  | 'WINDRUSH_AND_BEYOND'
  | 'SOUND_SYSTEM_STORIES'
  | 'WORKING_LIVES'
  | 'FAITH_AND_COMMUNITY'
  | 'RAISING_BRITISH'
  | 'OTHER';

// ============================================
// SERIES METADATA
// ============================================

export interface SeriesMetadata {
  id: InterviewSeries;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  colour: string;
  typicalDuration: number; // minutes
  themes: string[];
  suitableFor: string[];
  culturalFocus: string[];
  emotionalIntensity: 'low' | 'medium' | 'high' | 'variable';
  requiredTraining?: string[];
}

export const SERIES_METADATA: Record<InterviewSeries, SeriesMetadata> = {
  ARRIVAL_STORIES: {
    id: 'ARRIVAL_STORIES',
    name: 'Arrival Stories',
    tagline: 'First steps on new ground',
    description: 'Stories of coming to the UK - the journey, first impressions, early challenges, and moments of discovery.',
    icon: '🚢',
    colour: '#3b82f6',
    typicalDuration: 45,
    themes: ['migration', 'journey', 'first impressions', 'adaptation', 'home'],
    suitableFor: ['First-generation immigrants', 'Refugees', 'Those who remember arrival'],
    culturalFocus: ['Caribbean', 'African', 'South Asian', 'Irish', 'European'],
    emotionalIntensity: 'high',
  },
  
  ELDER_WISDOM: {
    id: 'ELDER_WISDOM',
    name: 'Elder Wisdom',
    tagline: 'Life lessons passed down',
    description: 'Reflections on life, advice for younger generations, and the wisdom that comes from lived experience.',
    icon: '🌳',
    colour: '#10b981',
    typicalDuration: 40,
    themes: ['life lessons', 'advice', 'values', 'legacy', 'generational knowledge'],
    suitableFor: ['Elders 65+', 'Community leaders', 'Family matriarchs/patriarchs'],
    culturalFocus: ['Universal', 'Culturally-informed wisdom'],
    emotionalIntensity: 'medium',
  },
  
  ISLAND_KITCHEN: {
    id: 'ISLAND_KITCHEN',
    name: 'Island Kitchen',
    tagline: 'Recipes and memories',
    description: 'Food memories, family recipes, kitchen traditions, and the stories that simmer with every dish.',
    icon: '🍲',
    colour: '#f97316',
    typicalDuration: 35,
    themes: ['food', 'recipes', 'family traditions', 'cultural preservation', 'sensory memories'],
    suitableFor: ['Home cooks', 'Family recipe keepers', 'Food culture enthusiasts'],
    culturalFocus: ['Caribbean', 'African', 'South Asian', 'Mediterranean'],
    emotionalIntensity: 'low',
  },
  
  BETWEEN_TWO_WORLDS: {
    id: 'BETWEEN_TWO_WORLDS',
    name: 'Between Two Worlds',
    tagline: 'Identity, belonging, navigation',
    description: 'Stories of navigating multiple cultural identities, belonging, code-switching, and finding home in the hyphen.',
    icon: '🌍',
    colour: '#8b5cf6',
    typicalDuration: 50,
    themes: ['identity', 'belonging', 'culture clash', 'code-switching', 'integration'],
    suitableFor: ['Second generation', 'Mixed heritage', 'Third culture individuals'],
    culturalFocus: ['Diaspora experience', 'Multicultural Britain'],
    emotionalIntensity: 'high',
  },
  
  WINDRUSH_AND_BEYOND: {
    id: 'WINDRUSH_AND_BEYOND',
    name: 'Windrush and Beyond',
    tagline: 'The generation that built Britain',
    description: 'Specific experiences of the Windrush generation - arrival, contribution, challenges, and legacy.',
    icon: '⚓',
    colour: '#eab308',
    typicalDuration: 60,
    themes: ['Windrush', 'post-war Britain', 'contribution', 'discrimination', 'resilience', 'legacy'],
    suitableFor: ['Windrush generation (arrived 1948-1971)', 'Their immediate family'],
    culturalFocus: ['Caribbean British'],
    emotionalIntensity: 'high',
    requiredTraining: ['trauma-informed-interviewing'],
  },
  
  SOUND_SYSTEM_STORIES: {
    id: 'SOUND_SYSTEM_STORIES',
    name: 'Sound System Stories',
    tagline: 'The bass that built community',
    description: 'The history of sound system culture - the music, the nights, the crews, and the community built around bass.',
    icon: '🔊',
    colour: '#ec4899',
    typicalDuration: 45,
    themes: ['music', 'sound systems', 'nightlife', 'community', 'Caribbean music history'],
    suitableFor: ['Sound system owners/operators', 'DJs/selectors', 'Venue owners', 'Scene participants'],
    culturalFocus: ['Caribbean British', 'UK Black music scene'],
    emotionalIntensity: 'medium',
  },
  
  WORKING_LIVES: {
    id: 'WORKING_LIVES',
    name: 'Working Lives',
    tagline: 'Labour, dignity, contribution',
    description: 'Stories of work - the jobs that built Britain, workplace experiences, careers, and economic contribution.',
    icon: '🔨',
    colour: '#64748b',
    typicalDuration: 40,
    themes: ['work', 'employment', 'discrimination', 'achievement', 'economic contribution'],
    suitableFor: ['Retired workers', 'Those with significant career stories'],
    culturalFocus: ['NHS workers', 'Transport workers', 'Factory workers', 'Entrepreneurs'],
    emotionalIntensity: 'medium',
  },
  
  FAITH_AND_COMMUNITY: {
    id: 'FAITH_AND_COMMUNITY',
    name: 'Faith and Community',
    tagline: 'Spiritual anchors, community pillars',
    description: 'The role of faith in diaspora life - churches, mosques, temples, community organisations, and spiritual resilience.',
    icon: '🙏',
    colour: '#a855f7',
    typicalDuration: 45,
    themes: ['faith', 'religion', 'community organisations', 'spiritual life', 'cultural preservation'],
    suitableFor: ['Religious leaders', 'Community organisers', 'Long-term congregation members'],
    culturalFocus: ['Black churches', 'Mosques', 'Mandirs', 'Community organisations'],
    emotionalIntensity: 'medium',
  },
  
  RAISING_BRITISH: {
    id: 'RAISING_BRITISH',
    name: 'Raising British',
    tagline: 'Parenting across cultures',
    description: 'Stories of raising children in Britain - balancing heritage with integration, education battles, and generational bridges.',
    icon: '👨‍👩‍👧‍👦',
    colour: '#06b6d4',
    typicalDuration: 45,
    themes: ['parenting', 'education', 'cultural transmission', 'generational differences', 'discipline', 'values'],
    suitableFor: ['Parents who raised children in UK', 'Grandparents'],
    culturalFocus: ['Diaspora parenting', 'Multicultural families'],
    emotionalIntensity: 'medium',
  },
  
  OTHER: {
    id: 'OTHER',
    name: 'Other Stories',
    tagline: 'Every story matters',
    description: 'Stories that don\'t fit neatly into other series but deserve preservation.',
    icon: '📖',
    colour: '#71717a',
    typicalDuration: 40,
    themes: ['varied'],
    suitableFor: ['Anyone with a story to tell'],
    culturalFocus: ['Universal'],
    emotionalIntensity: 'variable',
  },
};

// ============================================
// SERIES HELPERS
// ============================================

export const getSeriesMetadata = (series: InterviewSeries): SeriesMetadata => {
  return SERIES_METADATA[series];
};

export const getSeriesByEmotionalIntensity = (intensity: 'low' | 'medium' | 'high'): InterviewSeries[] => {
  return Object.values(SERIES_METADATA)
    .filter(s => s.emotionalIntensity === intensity)
    .map(s => s.id);
};

export const getSeriesRequiringTraining = (): InterviewSeries[] => {
  return Object.values(SERIES_METADATA)
    .filter(s => s.requiredTraining && s.requiredTraining.length > 0)
    .map(s => s.id);
};

export const getSeriesForCulture = (culture: string): InterviewSeries[] => {
  return Object.values(SERIES_METADATA)
    .filter(s => s.culturalFocus.some(c => 
      c.toLowerCase().includes(culture.toLowerCase()) || c === 'Universal'
    ))
    .map(s => s.id);
};