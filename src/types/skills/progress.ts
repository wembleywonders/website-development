// src/types/skills/progress.ts
import { SkillCategory, SkillLevel, ActivityType, ROVPersonality } from './core';
import { MembershipTier } from '../membership';

export interface SkillProgress {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  tier: MembershipTier;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  experiencePoints: number;
  lastPracticed: Date;
  sessionsCompleted: number;
  rovSessions: number;
  endorsements: number;
  weeklyGoal: number;
  weeklyProgress: number;
  masteryLevel: SkillLevel;
  improvementTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface SkillDevelopmentPlan {
  userId: string;
  tier: MembershipTier;
  currentFocus: string[]; // skill IDs
  shortTermGoals: Array<{
    skillId: string;
    targetLevel: number;
    deadline: Date;
    milestones: Array<{
      description: string;
      completed: boolean;
      completedDate?: Date;
    }>;
  }>;
  longTermGoals: Array<{
    description: string;
    relatedSkills: string[];
    careerRelevance: string;
    timeframe: string;
  }>;
  weeklyCommitment: number; // hours
  preferredActivities: ActivityType[];
  rovCoachingSchedule: Array<{
    rovPersonality: ROVPersonality;
    frequency: 'weekly' | 'biweekly' | 'monthly';
    focus: string;
  }>;
}

export interface CommunitySkillsMetrics {
  totalSkillsTracked: number;
  activeSkillBuilders: number;
  endorsementsThisMonth: number;
  certificationsAwarded: number;
  averageSkillProgress: number;
  mostPopularSkills: Array<{
    skillId: string;
    skillName: string;
    practitionerCount: number;
    averageLevel: number;
  }>;
  tierDistribution: {
    connector: number;
    curator: number;
    champion: number;
  };
  crossCulturalConnections: number;
  professionalOutcomes: Array<{
    type: 'promotion' | 'new-job' | 'networking' | 'board-position';
    count: number;
    attributedToSkills: string[];
  }>;
}

export interface SkillProgressBar {
  current: number;
  target: number;
  skillName: string;
  showProgress?: boolean;
  animated?: boolean;
}