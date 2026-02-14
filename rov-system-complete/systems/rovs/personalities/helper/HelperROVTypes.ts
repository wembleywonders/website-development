// src/systems/rovs/personalities/helper/HelperROVTypes.ts

export interface HelperConfig {
  autoDetectFrustration: boolean;
  mentorMatchingEnabled: boolean;
  escalationThresholdMinutes: number;
  followUpEnabled: boolean;
}

export interface BarrierLog {
  id: string;
  learnerId: string;
  barrierType: 'time' | 'financial' | 'access' | 'confidence' | 'comprehension' | 'other';
  description: string;
  identifiedAt: Date;
  resolved: boolean;
  resolvedAt?: Date;
  resolution?: string;
  supportProvided: string[];
}

export interface MentorMatch {
  mentorId: string;
  mentorName: string;
  skillAreas: string[];
  availability: string;
  matchScore: number;
  previousMentees: number;
  rating: number;
}

export const DEFAULT_HELPER_CONFIG: HelperConfig = {
  autoDetectFrustration: true,
  mentorMatchingEnabled: true,
  escalationThresholdMinutes: 30,
  followUpEnabled: true
};

export const FRUSTRATION_SIGNALS = [
  'repeated failures on same task',
  'decreasing session duration',
  'increased time between attempts',
  'help requests with urgent language',
  'incomplete submissions'
];
