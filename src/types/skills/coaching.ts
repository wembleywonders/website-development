// src/types/skills/coaching.ts
import { ROVPersonality } from './core';

export interface ROVCoachingSession {
  id: string;
  userId: string;
  skillId: string;
  rovPersonality: ROVPersonality;
  startedAt: Date;
  endedAt?: Date;
  duration?: number; // minutes
  sessionType: 'assessment' | 'guidance' | 'practice' | 'reflection' | 'planning';
  goals: string[];
  keyInsights: string[];
  actionItems: string[];
  userSatisfaction?: number; // 1-5
  rovRecommendations: string[];
  nextSessionSuggested?: Date;
  skillProgressMade: number; // experience points
}

export interface ROVGuidance {
  id: string;
  sessionId: string;
  skillId: string;
  rovPersonality: ROVPersonality;
  guidanceType: 'hint' | 'correction' | 'encouragement' | 'explanation' | 'strategic-advice';
  message: string;
  timestamp: Date;
  userResponse?: string;
  wasHelpful?: boolean;
  contextData?: Record<string, any>;
}

export interface ROVAssessment {
  id: string;
  userId: string;
  skillId: string;
  rovPersonality: ROVPersonality;
  assessmentDate: Date;
  currentLevel: number;
  strengthAreas: string[];
  improvementAreas: string[];
  recommendedActivities: string[];
  nextMilestones: Array<{
    description: string;
    estimatedTimeframe: string;
    requiredActivities: string[];
  }>;
  careerRelevanceScore: number; // 1-10
  notes: string;
}