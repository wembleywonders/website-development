// src/systems/rovs/personalities/insight/InsightROVTypes.ts

export interface InsightConfig {
  minimumDataPointsForPattern: number;
  confidenceThreshold: number;
  badgeReadinessThreshold: number;
  analysisFrequencyHours: number;
}

export interface InsightAnalysis {
  learnerId: string;
  analysisDate: Date;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'multimodal';
  peakProductivityTime: string;
  preferredCollaborationMode: 'solo' | 'pair' | 'group';
  strengthAreas: string[];
  growthAreas: string[];
  breakthroughIndicators: string[];
}

export interface BadgeReadinessAssessment {
  badgeId: string;
  learnerId: string;
  readinessScore: number;
  criteriaMetCount: number;
  criteriaTotalCount: number;
  evidenceStrength: 'strong' | 'moderate' | 'weak';
  recommendedActions: string[];
  assessedAt: Date;
}

export const DEFAULT_INSIGHT_CONFIG: InsightConfig = {
  minimumDataPointsForPattern: 5,
  confidenceThreshold: 70,
  badgeReadinessThreshold: 80,
  analysisFrequencyHours: 24
};