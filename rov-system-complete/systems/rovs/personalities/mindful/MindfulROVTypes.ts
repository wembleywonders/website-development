// src/systems/rovs/personalities/mindful/MindfulROVTypes.ts

export interface MindfulConfig {
  breakReminderIntervalMinutes: number;
  stressDetectionEnabled: boolean;
  wellbeingCheckInsEnabled: boolean;
  sessionLimitHours: number;
}

export interface WellbeingLog {
  learnerId: string;
  date: Date;
  sessionsCompleted: number;
  totalActiveMinutes: number;
  breaksTaken: number;
  averageEngagement: number;
  stressEvents: number;
  interventionsSuggested: number;
  interventionsAccepted: number;
}

export interface BreakActivity {
  id: string;
  name: string;
  duration: number; // minutes
  type: 'physical' | 'mental' | 'social' | 'creative';
  description: string;
  instructions?: string[];
}

export const DEFAULT_MINDFUL_CONFIG: MindfulConfig = {
  breakReminderIntervalMinutes: 45,
  stressDetectionEnabled: true,
  wellbeingCheckInsEnabled: true,
  sessionLimitHours: 4
};

export const BREAK_ACTIVITIES: BreakActivity[] = [
  {
    id: 'stretch',
    name: 'Quick Stretch',
    duration: 2,
    type: 'physical',
    description: 'Stretch your neck, shoulders, and back',
    instructions: [
      'Roll your shoulders back 5 times',
      'Turn your head slowly left, then right',
      'Stand up and touch your toes'
    ]
  },
  {
    id: 'breathe',
    name: 'Breathing Exercise',
    duration: 3,
    type: 'mental',
    description: 'Box breathing to reset focus',
    instructions: [
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 4 counts',
      'Hold for 4 counts',
      'Repeat 4 times'
    ]
  },
  {
    id: 'walk',
    name: 'Short Walk',
    duration: 5,
    type: 'physical',
    description: 'Get up and move around',
    instructions: [
      'Walk to a window or outside',
      'Look at something in the distance',
      'Take 100 steps'
    ]
  },
  {
    id: 'water',
    name: 'Hydration Break',
    duration: 2,
    type: 'physical',
    description: 'Get a drink of water',
    instructions: [
      'Get up and get a glass of water',
      'Drink it slowly',
      'Notice how it feels'
    ]
  }
];
