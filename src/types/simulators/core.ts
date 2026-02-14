// src/types/simulators/core.ts

export type SimulatorType = 'housing' | 'healthcare' | 'education' | 'government' | 'transport' | 'employment';

export type SimulatorStatus = 'most-popular' | 'updated' | 'new' | 'maintenance' | 'deprecated';

export type SimulatorDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ROVAssistanceLevel = 'basic' | 'guided' | 'advanced' | 'autonomous';

export interface Simulator {
  id: string;
  type: SimulatorType;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  stats: {
    sessions: number;
    rating: number;
    successRate: number;
    averageCompletionTime: number;
  };
  status?: SimulatorStatus;
  difficulty: SimulatorDifficulty;
  estimatedDuration: number; // minutes
  prerequisites?: string[];
  tags: string[];
  isActive: boolean;
  lastUpdated: Date;
  version: string;
  targetAudience: Array<{
    type: 'new-residents' | 'existing-residents' | 'international-users' | 'seniors';
    description: string;
  }>;
}

export interface SimulatorStep {
  id: string;
  simulatorId: string;
  stepNumber: number;
  title: string;
  description: string;
  instructions: string[];
  expectedActions: Array<{
    type: 'click' | 'input' | 'select' | 'navigate' | 'upload' | 'download';
    target: string;
    value?: string;
    validation?: string;
  }>;
  hints: string[];
  commonMistakes: Array<{
    mistake: string;
    guidance: string;
    recoverySteps?: string[];
  }>;
  successCriteria: string[];
  isOptional: boolean;
  timeLimit?: number; // minutes
  rovGuidanceAvailable: boolean;
  accessibilityNotes?: string[];
}

export interface PreLaunchChecklist {
  items: Array<{
    id: string;
    label: string;
    description: string;
    checked: boolean;
    required: boolean;
  }>;
  allRequiredChecked: boolean;
  userAgreedToTerms: boolean;
  estimatedCompletionTime: number;
}