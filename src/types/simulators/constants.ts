// src/types/simulators/constants.ts
import { SimulatorType, SimulatorDifficulty } from './core';
import { PracticeSession } from './sessions';

export const SIMULATOR_CATEGORIES = [
  {
    id: 'housing' as const,
    name: 'Housing Services',
    authority: 'Brent Council',
    description: 'Housing applications, council tax, repairs, and local housing support',
    icon: '🏠',
    estimatedSessions: 3,
    averageDuration: 25,
    difficulty: 'beginner' as const
  },
  {
    id: 'healthcare' as const,
    name: 'Healthcare Services', 
    authority: 'NHS Digital',
    description: 'GP registration, appointments, prescriptions, and health records',
    icon: '🩺',
    estimatedSessions: 4,
    averageDuration: 30,
    difficulty: 'intermediate' as const
  },
  {
    id: 'education' as const,
    name: 'Education Services',
    authority: 'Brent Education',
    description: 'School admissions, childcare, SEN support, and adult education',
    icon: '🎓',
    estimatedSessions: 3,
    averageDuration: 35,
    difficulty: 'intermediate' as const
  },
  {
    id: 'government' as const,
    name: 'Government Services',
    authority: 'GOV.UK',
    description: 'Tax returns, benefits, passports, visas, and electoral registration',
    icon: '🏛️',
    estimatedSessions: 5,
    averageDuration: 45,
    difficulty: 'advanced' as const
  },
  {
    id: 'transport' as const,
    name: 'Transport Services',
    authority: 'Transport for London',
    description: 'Oyster cards, season tickets, journey planning, and accessibility',
    icon: '🚌',
    estimatedSessions: 2,
    averageDuration: 20,
    difficulty: 'beginner' as const
  },
  {
    id: 'employment' as const,
    name: 'Employment Services',
    authority: 'JobCentre Plus',
    description: 'Job searching, benefits, CV building, and work coaching',
    icon: '💼',
    estimatedSessions: 4,
    averageDuration: 35,
    difficulty: 'intermediate' as const
  }
] as const;

export const DEFAULT_PRACTICE_SESSION: Omit<PracticeSession, 'id' | 'userId' | 'startedAt'> = {
  simulatorId: '',
  simulatorType: 'housing',
  portalName: '',
  lastActiveAt: new Date(),
  status: 'not-started',
  progress: 0,
  statusLabel: 'Ready to begin',
  stepsCompleted: 0,
  totalSteps: 0,
  errorsEncountered: 0,
  hintsUsed: 0,
  rovAssistanceUsed: false,
  timeSpent: 0
};

export const PRE_LAUNCH_CHECKLIST_ITEMS = [
  {
    id: 'dummy-data',
    label: 'Understanding this uses dummy data only',
    description: 'No real personal information will be submitted',
    required: true
  },
  {
    id: 'time-available',
    label: '15-30 minutes available for practice',
    description: 'Enough time to complete a meaningful practice session',
    required: true
  },
  {
    id: 'helper-rov',
    label: 'Helper ROV activated for assistance',
    description: 'Real-time guidance available throughout the session',
    required: true
  },
  {
    id: 'save-progress',
    label: 'Progress will be saved to your account',
    description: 'You can continue from where you left off',
    required: false
  }
] as const;

export const MASTERY_LEVEL_REQUIREMENTS = {
  novice: { sessionsCompleted: 0, successRate: 0 },
  competent: { sessionsCompleted: 3, successRate: 60 },
  proficient: { sessionsCompleted: 5, successRate: 75 },
  expert: { sessionsCompleted: 8, successRate: 85 }
} as const;

export const ROV_ASSISTANCE_LEVELS = {
  basic: {
    name: 'Basic Assistance',
    description: 'Simple hints and navigation help',
    interventionThreshold: 3, // errors before ROV intervenes
    maxInterventionsPerSession: 5
  },
  guided: {
    name: 'Guided Practice',
    description: 'Step-by-step guidance with explanations',
    interventionThreshold: 2,
    maxInterventionsPerSession: 10
  },
  advanced: {
    name: 'Advanced Coaching',
    description: 'Proactive guidance and learning optimization',
    interventionThreshold: 1,
    maxInterventionsPerSession: 15
  },
  autonomous: {
    name: 'Autonomous Learning',
    description: 'Minimal intervention, user-driven exploration',
    interventionThreshold: 5,
    maxInterventionsPerSession: 3
  }
} as const;

export const SIMULATOR_TAGS = {
  categories: [
    'essential', 'popular', 'new-resident', 'advanced', 'quick-start',
    'government', 'local-council', 'healthcare', 'employment', 'housing',
    'transport', 'education', 'benefits', 'taxes', 'immigration'
  ],
  targetAudience: [
    'new-residents', 'international-users', 'seniors', 'students',
    'families', 'professionals', 'business-owners'
  ],
  difficulty: ['beginner-friendly', 'intermediate-level', 'advanced-users'],
  features: [
    'mobile-optimized', 'screen-reader-friendly', 'multi-language',
    'rov-enabled', 'quick-completion', 'detailed-guidance'
  ]
} as const;

export const SUCCESS_CRITERIA_TEMPLATES = {
  formCompletion: [
    'All required fields completed correctly',
    'Valid data format for each field',
    'Successfully submitted without errors'
  ],
  navigation: [
    'Successfully navigated to target page',
    'Found required information or service',
    'Completed intended user journey'
  ],
  verification: [
    'Identity verification completed',
    'Documents uploaded successfully',
    'Account or application activated'
  ]
} as const;

export const COMMON_ERROR_CATEGORIES = [
  'invalid-input',
  'missing-required-field',
  'navigation-error',
  'timeout',
  'validation-failure',
  'authentication-error',
  'file-upload-error',
  'network-connectivity'
] as const;

export const ACCESSIBILITY_STANDARDS = {
  wcag_aa_compliance: true,
  keyboard_navigation: true,
  screen_reader_support: true,
  color_contrast_ratio: 4.5,
  text_size_options: ['small', 'medium', 'large', 'extra-large'],
  language_support: ['en', 'es', 'fr', 'ar', 'ur', 'hi', 'pt', 'pl'],
  reduced_motion_options: true
} as const;