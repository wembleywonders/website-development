// src/types/simulators/sessions.ts
import { SimulatorType, ROVAssistanceLevel } from './core';

export type PracticeSessionStatus = 'completed' | 'in-progress' | 'not-started' | 'failed' | 'abandoned' | 'paused';

export interface PracticeSession {
  id: string;
  userId: string;
  simulatorId: string;
  simulatorType: SimulatorType;
  portalName: string;
  startedAt: Date;
  completedAt?: Date;
  lastActiveAt: Date;
  status: PracticeSessionStatus;
  progress: number; // 0-100
  statusLabel: string;
  stepsCompleted: number;
  totalSteps: number;
  errorsEncountered: number;
  hintsUsed: number;
  rovAssistanceUsed: boolean;
  rovAssistanceLevel?: ROVAssistanceLevel;
  rovSessionId?: string;
  completionScore?: number;
  feedback?: string;
  timeSpent: number; // minutes
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  browserInfo?: string;
  accessibilityFeaturesUsed?: string[];
}

export interface SessionBookmark {
  id: string;
  sessionId: string;
  stepId: string;
  timestamp: Date;
  note?: string;
  isAutomatic: boolean;
}

export interface SessionFeedback {
  id: string;
  sessionId: string;
  userId: string;
  rating: number; // 1-5
  difficulty: 'too-easy' | 'just-right' | 'too-hard';
  clarity: number; // 1-5
  usefulness: number; // 1-5
  suggestions: string;
  wouldRecommend: boolean;
  submittedAt: Date;
}

export interface UserSimulatorProgress {
  userId: string;
  simulatorProgress: Array<{
    simulatorId: string;
    simulatorType: SimulatorType;
    sessionsAttempted: number;
    sessionsCompleted: number;
    bestScore: number;
    averageScore: number;
    totalTimeSpent: number;
    lastAttempted: Date;
    masteryLevel: 'novice' | 'competent' | 'proficient' | 'expert';
    certificationsEarned: string[];
    personalNotes?: string;
    favoriteFeatures: string[];
  }>;
  overallStats: {
    totalSessionsCompleted: number;
    averageSuccessRate: number;
    totalHoursOfPractice: number;
    simulatorsMastered: number;
    rovInteractions: number;
    streakDays: number;
    lastActiveDate: Date;
  };
  preferences: {
    preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
    rovAssistanceLevel: ROVAssistanceLevel;
    notificationsEnabled: boolean;
    practiceReminders: boolean;
  };
}

export interface SimulatorCertification {
  id: string;
  simulatorType: SimulatorType;
  name: string;
  description: string;
  requirements: {
    minimumSessions: number;
    minimumSuccessRate: number;
    requiredSteps: string[];
    timeLimit?: number;
    mustCompleteWithoutErrors?: boolean;
  };
  badge: string;
  validityPeriod?: number; // months
  recognizedBy: string[]; // organizations that recognize this certification
  digitalBadgeUrl?: string;
  verificationUrl?: string;
}