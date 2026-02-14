//src/features/workspace/types/journeyStep.types.ts

/**
 * JourneyStep Type Definitions
 * The 7-stage creator journey for Wembley Wonders
 */
export interface JourneyStepItem {
  id: string;
  name: string;
  description?: string;
  order: number;
  status: 'locked' | 'available' | 'current' | 'completed';
  requirements?: string[];
  milestones?: string[];
  estimatedDuration?: number; // days
  actualDuration?: number;
  completedAt?: Date;
  resources?: JourneyResource[];
  tasks?: JourneyTask[];
}

export interface JourneyResource {
  id: string;
  type: 'guide' | 'video' | 'template' | 'tool';
  title: string;
  url: string;
  required: boolean;
}

export interface JourneyTask {
  id: string;
  title: string;
  completed: boolean;
  required: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
  nextStep?: JourneyStepItem;
}

// ============================================================================
// JOURNEY STEP ENUM
// ============================================================================

export enum JourneyStep {
  CREATE = 'CREATE',
  LEARN = 'LEARN',
  IMPROVE = 'IMPROVE',
  SELL = 'SELL',
  PROMOTE = 'PROMOTE',
  CONNECT = 'CONNECT',
  REFLECT = 'REFLECT'
}

// ============================================================================
// JOURNEY STEP METADATA
// ============================================================================

export interface JourneyStepMetadata {
  step: JourneyStep;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  goals: string[];
  activities: string[];
}

// ============================================================================
// JOURNEY STEP METADATA MAP
// ============================================================================

export const JOURNEY_STEPS: Record<JourneyStep, JourneyStepMetadata> = {
  [JourneyStep.CREATE]: {
    step: JourneyStep.CREATE,
    order: 1,
    title: 'Create',
    shortTitle: 'Create',
    description: 'Bring your creative vision to life',
    icon: '✨',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    goals: [
      'Start a new project',
      'Develop your creative skills',
      'Build a portfolio piece'
    ],
    activities: [
      'Start new project',
      'Upload content',
      'Set project goals',
      'Choose project type'
    ]
  },
  
  [JourneyStep.LEARN]: {
    step: JourneyStep.LEARN,
    order: 2,
    title: 'Learn',
    shortTitle: 'Learn',
    description: 'Develop your skills and knowledge',
    icon: '📚',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    goals: [
      'Master new techniques',
      'Learn from experts',
      'Build technical skills'
    ],
    activities: [
      'Take tutorials',
      'Join workshops',
      'Explore resources',
      'Practice new skills'
    ]
  },
  
  [JourneyStep.IMPROVE]: {
    step: JourneyStep.IMPROVE,
    order: 3,
    title: 'Improve',
    shortTitle: 'Improve',
    description: 'Refine and polish your work',
    icon: '⚡',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    goals: [
      'Get feedback',
      'Refine your work',
      'Achieve quality standards'
    ],
    activities: [
      'Request feedback',
      'Revise project',
      'Add polish',
      'Test with users'
    ]
  },
  
  [JourneyStep.SELL]: {
    step: JourneyStep.SELL,
    order: 4,
    title: 'Sell',
    shortTitle: 'Sell',
    description: 'Monetize your creative work',
    icon: '💰',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    goals: [
      'Set competitive pricing',
      'List on marketplace',
      'Earn from your creativity'
    ],
    activities: [
      'Set pricing',
      'Upload to Cyberstore',
      'Create bundles',
      'Manage inventory'
    ]
  },
  
  [JourneyStep.PROMOTE]: {
    step: JourneyStep.PROMOTE,
    order: 5,
    title: 'Promote',
    shortTitle: 'Promote',
    description: 'Share your work with the world',
    icon: '📢',
    color: '#8B5CF6',
    bgColor: '#FAF5FF',
    borderColor: '#DDD6FE',
    goals: [
      'Build an audience',
      'Increase visibility',
      'Drive engagement'
    ],
    activities: [
      'Share on social media',
      'Create campaigns',
      'Write blog posts',
      'Email newsletter'
    ]
  },
  
  [JourneyStep.CONNECT]: {
    step: JourneyStep.CONNECT,
    order: 6,
    title: 'Connect',
    shortTitle: 'Connect',
    description: 'Build relationships in the community',
    icon: '👥',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    goals: [
      'Find mentors',
      'Join communities',
      'Build your network'
    ],
    activities: [
      'Message mentors',
      'Join community',
      'Attend events',
      'Collaborate'
    ]
  },
  
  [JourneyStep.REFLECT]: {
    step: JourneyStep.REFLECT,
    order: 7,
    title: 'Reflect',
    shortTitle: 'Reflect',
    description: 'Review progress and set new goals',
    icon: '🎯',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    borderColor: '#A5F3FC',
    goals: [
      'Track your progress',
      'Celebrate achievements',
      'Plan next steps'
    ],
    activities: [
      'View analytics',
      'Set new goals',
      'Review feedback',
      'Plan improvements'
    ]
  }
};

// ============================================================================
// JOURNEY STEP ARRAY (Ordered)
// ============================================================================

export const JOURNEY_STEPS_ORDERED = Object.values(JOURNEY_STEPS).sort(
  (a, b) => a.order - b.order
);

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isJourneyStep(value: string): value is JourneyStep {
  return Object.values(JourneyStep).includes(value as JourneyStep);
}

export function getJourneyStepMetadata(step: JourneyStep): JourneyStepMetadata {
  return JOURNEY_STEPS[step];
}

export function getNextJourneyStep(currentStep: JourneyStep): JourneyStep | null {
  const currentMetadata = JOURNEY_STEPS[currentStep];
  const nextStep = JOURNEY_STEPS_ORDERED.find(
    step => step.order === currentMetadata.order + 1
  );
  return nextStep?.step || null;
}

export function getPreviousJourneyStep(currentStep: JourneyStep): JourneyStep | null {
  const currentMetadata = JOURNEY_STEPS[currentStep];
  const prevStep = JOURNEY_STEPS_ORDERED.find(
    step => step.order === currentMetadata.order - 1
  );
  return prevStep?.step || null;
}

export function getJourneyStepByOrder(order: number): JourneyStep | null {
  const step = JOURNEY_STEPS_ORDERED.find(step => step.order === order);
  return step?.step || null;
}

// ============================================================================
// JOURNEY PROGRESS
// ============================================================================

export interface JourneyProgress {
  currentStep: JourneyStep;
  completedSteps: JourneyStep[];
  progressPercentage: number; // 0-100
  totalSteps: number;
  completedCount: number;
}

export function calculateJourneyProgress(
  currentStep: JourneyStep,
  completedSteps: JourneyStep[]
): JourneyProgress {
  const totalSteps = JOURNEY_STEPS_ORDERED.length;
  const completedCount = completedSteps.length;
  const progressPercentage = Math.round((completedCount / totalSteps) * 100);
  
  return {
    currentStep,
    completedSteps,
    progressPercentage,
    totalSteps,
    completedCount
  };
}
