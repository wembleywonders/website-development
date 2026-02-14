/**
 * TUTORIAL SYSTEM - Type Definitions
 * ===================================
 * 
 * All types for the tutorial system.
 * Import from here in tutorial data files.
 */

// ========================================
// CORE TYPES
// ========================================

export type Programme = 
  | 'stemgeneers'
  | 'silk-stilettos'
  | 'techreneurs'
  | 'kaywanas-court'
  | 'gtech-casters'
  | 'trubble-n-bass'
  | 'aunties-kitchen'
  | 'pageturners'
  | 'raydyo'
  | 'joystick'
  | 'scrap-cat'      // NEW: Device/bike repair programme (Neville)
  | 'money-reset';   // NEW: Financial bootcamp (Solomon)

export type ROVGuide = 
  | 'ROV-T'   // Tech guide (Neville)
  | 'ROV-C'   // Creative guide (Adaeze)
  | 'ROV-B'   // Business guide (Solomon)
  | 'ROV-M'   // Media guide (Tariq)
  | 'ROV-H'   // Heritage guide (Esther)
  | 'ROV-P'   // Performance guide (Maxine)
  | 'Maya';   // General guide (Maya)

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type TutorialFormat = 'step-by-step' | 'video' | 'interactive' | 'project' | 'assessment';

// ========================================
// TUTORIAL COMPONENT INTERFACES
// ========================================

export interface TutorialStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
  image?: string;
  video?: string;
  checkpoint?: boolean;
  rovPrompt?: string;
}

export interface Tool {
  name: string;
  price?: string;
  cyberstoreSlug?: string;
  essential: boolean;
  notes?: string;
}

export interface Kit {
  name: string;
  slug: string;
  price: string;
  contents: string[];
  savings?: string;
}

export interface Workshop {
  title: string;
  duration: string;
  price: string;
  format: 'zoom' | 'in-person' | 'hybrid';
  bookingSlug: string;
}

// ========================================
// MAIN TUTORIAL INTERFACE
// ========================================

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  programmes: Programme[];
  primaryProgramme: Programme;
  pathway?: string;
  tags: string[];
  difficulty: Difficulty;
  duration: string;
  prerequisites?: string[];
  format: TutorialFormat;
  rovGuide: ROVGuide;
  alternativeGuides?: ROVGuide[];
  steps: TutorialStep[];
  tools: Tool[];
  commonMistakes: string[];
  freeAccess: boolean;
  kit?: Kit;
  workshop?: Workshop;
  nextTutorials?: string[];
  relatedTutorials?: string[];
  badgeAwarded?: string;
  author?: string;
  lastUpdated: string;
  version: string;
}

// ========================================
// ROV & PROGRAMME INFO INTERFACES
// ========================================

export interface ROVGuideInfo {
  id: ROVGuide;
  name: string;
  personality: string;
  avatar: string;
  colour: string;
  specialisms: string[];
  greeting: string;
}

export interface ProgrammeInfo {
  id: Programme;
  name: string;
  icon: string;
  colour: string;
  tagline: string;
  primaryROV: ROVGuide;
  pathways: string[];
}

// ========================================
// USER PROGRESS INTERFACE
// ========================================

export interface UserProgress {
  completedTutorials: string[];
  tutorialProgress: Record<string, number[]>; // tutorialId -> completed step indices
  lastAccessed: Record<string, string>; // tutorialId -> ISO date
  badgesEarned: string[];
}