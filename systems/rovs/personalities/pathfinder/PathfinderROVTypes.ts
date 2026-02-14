// src/systems/rovs/personalities/pathfinder/PathfinderROVTypes.ts

export interface PathfinderConfig {
  reengagementThresholdDays: number;
  celebrationCooldownHours: number;
  maxSuggestionsToShow: number;
  enableProactiveSuggestions: boolean;
}

export interface PathfinderSuggestion {
  id: string;
  type: 'next-badge' | 'new-programme' | 'workshop' | 'mentor' | 'return';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  relevanceScore: number;
  expiresAt?: Date;
}

export interface PathfinderCelebration {
  id: string;
  achievementType: 'badge' | 'milestone' | 'streak' | 'first' | 'comeback';
  title: string;
  message: string;
  badgeId?: string;
  celebratedAt: Date;
}

export interface PathfinderJourneySnapshot {
  learnerId: string;
  currentStage: 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
  programmesExplored: string[];
  programmesActive: string[];
  programmesCompleted: string[];
  totalBadges: number;
  totalCredits: number;
  journeyStartDate: Date;
  lastActiveDate: Date;
  streakDays: number;
}

export const DEFAULT_PATHFINDER_CONFIG: PathfinderConfig = {
  reengagementThresholdDays: 7,
  celebrationCooldownHours: 24,
  maxSuggestionsToShow: 3,
  enableProactiveSuggestions: true
};