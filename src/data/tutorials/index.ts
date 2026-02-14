/**
 * TUTORIAL SYSTEM - Main Index
 * ============================
 * 
 * Import everything from here:
 *   import { Tutorial, SILK_STILETTOS_TUTORIALS, ROV_GUIDES } from './tutorials';
 * 
 * File Structure:
 *   src/types/
 *     tutorial.ts           <- Type definitions
 *   src/data/tutorials/
 *     index.ts              <- This file (data + helpers)
 *     tutorials.stemgeneers.ts
 *     tutorials.silk-stilettos.ts
 *     ... etc
 */

// ========================================
// RE-EXPORT TYPES
// ========================================

export type {
  Programme,
  ROVGuide,
  Difficulty,
  TutorialFormat,
  TutorialStep,
  Tool,
  Kit,
  Workshop,
  Tutorial,
  ROVGuideInfo,
  ProgrammeInfo,
  UserProgress
} from '../../types/tutorial';

import type { 
  Programme, 
  ROVGuide, 
  Difficulty, 
  Tutorial, 
  ROVGuideInfo, 
  ProgrammeInfo 
} from '../../types/tutorial';

// ========================================
// ROV GUIDE DATA
// ========================================

export const ROV_GUIDES: Record<ROVGuide, ROVGuideInfo> = {
  'ROV-T': {
    id: 'ROV-T',
    name: 'ROV-T',
    personality: 'Technical, precise, patient. Explains complex concepts simply. Celebrates small wins.',
    avatar: '🔧',
    colour: '#10b981',
    specialisms: ['Device repair', 'E-bike service', 'PC building', 'Electronics', 'Diagnostics'],
    greeting: "Ready to get technical? I'll walk you through this step by step. No question is too basic."
  },
  'ROV-C': {
    id: 'ROV-C',
    name: 'ROV-C',
    personality: 'Creative, encouraging, detail-oriented. Balances artistry with practicality.',
    avatar: '🎨',
    colour: '#db2777',
    specialisms: ['Textiles', 'Design', 'Pattern-making', 'Costume', 'Carnival', 'Styling'],
    greeting: "Let's create something beautiful. Every stitch tells a story—I'll help you tell yours."
  },
  'ROV-B': {
    id: 'ROV-B',
    name: 'ROV-B',
    personality: 'Strategic, realistic, supportive. Focused on sustainable income, not hype.',
    avatar: '💼',
    colour: '#f59e0b',
    specialisms: ['Business planning', 'Pricing', 'Marketing', 'Pardner economics', 'Multiple streams'],
    greeting: "Let's build something sustainable. Not overnight riches—real income that grows."
  },
  'ROV-M': {
    id: 'ROV-M',
    name: 'ROV-M',
    personality: 'Creative-technical hybrid. Understands both content and equipment.',
    avatar: '🎬',
    colour: '#8b5cf6',
    specialisms: ['Video production', 'Audio', 'Streaming', 'Podcasting', 'Content strategy'],
    greeting: "Ready to create content that connects? Let's get your setup right first."
  },
  'ROV-H': {
    id: 'ROV-H',
    name: 'ROV-H',
    personality: 'Warm, storytelling, preservation-focused. Connects skills to heritage.',
    avatar: '📚',
    colour: '#92400e',
    specialisms: ['Heritage recipes', 'Oral history', 'Cultural preservation', 'Storytelling', 'Documentation'],
    greeting: "Every skill we learn carries the wisdom of those before us. Let me share some of that with you."
  },
  'ROV-P': {
    id: 'ROV-P',
    name: 'ROV-P',
    personality: 'Energetic, rhythmic, performance-focused. Understands stagecraft.',
    avatar: '🎭',
    colour: '#7c3aed',
    specialisms: ['Performance', 'Music production', 'Stage presence', 'Sound systems', 'Event production'],
    greeting: "The stage is waiting. Let's make sure you're ready to own it."
  },
  'Maya': {
    id: 'Maya',
    name: 'Maya',
    personality: 'Warm, knowledgeable, adaptive. Can navigate across all programmes.',
    avatar: '🌟',
    colour: '#0ea5e9',
    specialisms: ['General guidance', 'Programme navigation', 'Membership', 'Cross-programme connections'],
    greeting: "Welcome to Wembley Wonders. I'm Maya—I can help you find your path across all our programmes."
  }
};

// ========================================
// PROGRAMME DATA
// ========================================

export const PROGRAMMES: Record<Programme, ProgrammeInfo> = {
  'stemgeneers': {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🔧',
    colour: '#10b981',
    tagline: 'Applied Technical Skills That Earn',
    primaryROV: 'ROV-T',
    pathways: ['Devices & Phones', 'Wheels & Mobility', 'Home Tech & Studio']
  },
  'silk-stilettos': {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    icon: '👠',
    colour: '#db2777',
    tagline: 'Applied Textile & Design Skills',
    primaryROV: 'ROV-C',
    pathways: ['Garment Construction', 'Textile Arts', 'Accessories', 'Carnival & Costume', 'Styling']
  },
  'techreneurs': {
    id: 'techreneurs',
    name: 'TECHreneurs',
    icon: '💡',
    colour: '#f59e0b',
    tagline: 'Creative Business Skills',
    primaryROV: 'ROV-B',
    pathways: ['Business Foundations', 'Pricing & Sales', 'Marketing', 'Pardner Economics', 'Multiple Streams']
  },
  'kaywanas-court': {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    icon: '🎭',
    colour: '#7c3aed',
    tagline: 'Heritage Theatre & Performance',
    primaryROV: 'ROV-P',
    pathways: ['Performance', 'Production', 'Heritage Storytelling', 'Technical Theatre']
  },
  'gtech-casters': {
    id: 'gtech-casters',
    name: 'G-Tech Casters',
    icon: '🎬',
    colour: '#8b5cf6',
    tagline: 'Gaming & Content Creation',
    primaryROV: 'ROV-M',
    pathways: ['Streaming', 'Video Production', 'Gaming Content', 'Community Building']
  },
  'trubble-n-bass': {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    colour: '#ec4899',
    tagline: 'Music Production & Sound',
    primaryROV: 'ROV-P',
    pathways: ['Production', 'Performance', 'Sound System', 'Release Strategy']
  },
  'aunties-kitchen': {
    id: 'aunties-kitchen',
    name: "Auntie Anansi's Kitchen",
    icon: '🍲',
    colour: '#92400e',
    tagline: 'Heritage Food & Storytelling',
    primaryROV: 'ROV-H',
    pathways: ['Heritage Recipes', 'Food Business', 'Storytelling', 'Event Catering']
  },
  'pageturners': {
    id: 'pageturners',
    name: 'Pageturners',
    icon: '📖',
    colour: '#0d9488',
    tagline: 'Reading, Writing & Publishing',
    primaryROV: 'ROV-H',
    pathways: ['Creative Writing', 'Publishing', 'Book Club', 'Oral History']
  },
  'raydyo': {
    id: 'raydyo',
    name: 'Rayd-yo',
    icon: '📻',
    colour: '#dc2626',
    tagline: 'Community Radio & Podcasting',
    primaryROV: 'ROV-M',
    pathways: ['Podcasting', 'Radio Production', 'Interview Skills', 'Community Journalism']
  },
  'joystick': {
    id: 'joystick',
    name: 'Joystick',
    icon: '📰',
    colour: '#2563eb',
    tagline: 'Community E-zine',
    primaryROV: 'ROV-M',
    pathways: ['Writing', 'Photography', 'Layout', 'Digital Publishing']
  }
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get all tutorials for a specific programme
 */
export function getTutorialsByProgramme(tutorials: Tutorial[], programme: Programme): Tutorial[] {
  return tutorials.filter(t => t.programmes.includes(programme));
}

/**
 * Get all free tutorials
 */
export function getFreeTutorials(tutorials: Tutorial[]): Tutorial[] {
  return tutorials.filter(t => t.freeAccess);
}

/**
 * Get tutorials by pathway within a programme
 */
export function getTutorialsByPathway(tutorials: Tutorial[], programme: Programme, pathway: string): Tutorial[] {
  return tutorials.filter(t => 
    t.programmes.includes(programme) && t.pathway === pathway
  );
}

/**
 * Get tutorials by difficulty
 */
export function getTutorialsByDifficulty(tutorials: Tutorial[], difficulty: Difficulty): Tutorial[] {
  return tutorials.filter(t => t.difficulty === difficulty);
}

/**
 * Get tutorials by ROV guide
 */
export function getTutorialsByROV(tutorials: Tutorial[], rovGuide: ROVGuide): Tutorial[] {
  return tutorials.filter(t => 
    t.rovGuide === rovGuide || t.alternativeGuides?.includes(rovGuide)
  );
}

/**
 * Get next recommended tutorials
 */
export function getNextTutorials(allTutorials: Tutorial[], currentTutorial: Tutorial): Tutorial[] {
  if (!currentTutorial.nextTutorials) return [];
  return allTutorials.filter(t => currentTutorial.nextTutorials?.includes(t.id));
}

/**
 * Search tutorials by keyword
 */
export function searchTutorials(tutorials: Tutorial[], query: string): Tutorial[] {
  const lowerQuery = query.toLowerCase();
  return tutorials.filter(t => 
    t.title.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get tutorials that award a specific badge
 */
export function getTutorialsByBadge(tutorials: Tutorial[], badgeId: string): Tutorial[] {
  return tutorials.filter(t => t.badgeAwarded === badgeId);
}

/**
 * Calculate total tutorial duration for a list
 */
export function calculateTotalDuration(tutorials: Tutorial[]): string {
  let totalMinutes = 0;
  tutorials.forEach(t => {
    const match = t.duration.match(/(\d+)/);
    if (match) {
      totalMinutes += parseInt(match[1]);
    }
  });
  
  if (totalMinutes < 60) return `${totalMinutes} mins`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// ========================================
// DEFAULT EXPORT
// ========================================

export default {
  ROV_GUIDES,
  PROGRAMMES,
  getTutorialsByProgramme,
  getFreeTutorials,
  getTutorialsByPathway,
  getTutorialsByDifficulty,
  getTutorialsByROV,
  getNextTutorials,
  searchTutorials,
  getTutorialsByBadge,
  calculateTotalDuration
};