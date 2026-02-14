// src/systems/rovs/personalities/pathfinder/PathfinderROVTypes.ts

export type NavigationMode = 'guided' | 'autonomous' | 'collaborative';

export type PathDifficulty = 'easy' | 'moderate' | 'challenging' | 'complex';

export type RecommendationCategory = 'optimization' | 'risk-mitigation' | 'resource-allocation' | 'timeline-adjustment';

export type RecommendationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface NavigationStep {
  title: string;
  description: string;
  estimatedTime: string;
  prerequisites: string[];
  resources: string[];
  optional?: boolean;
  riskFactors?: string[];
  successCriteria?: string[];
}

export interface PathAlternative {
  name: string;
  description: string;
  tradeoffs: string[];
  suitability?: string[];
  estimatedDuration?: string;
}

export interface RiskAssessment {
  risk: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'minimal' | 'moderate' | 'significant' | 'severe';
  mitigation: string;
  contingencyPlan?: string;
}

export interface NavigationPath {
  id: string;
  objective: string;
  estimatedDuration: string;
  difficulty: PathDifficulty;
  steps: NavigationStep[];
  alternatives?: PathAlternative[];
  riskAssessment: RiskAssessment[];
  successProbability: number; // 0-1
  createdAt: Date;
  lastUpdated?: Date;
  completionRate?: number;
}

export interface StrategicRecommendation {
  id: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  description: string;
  expectedBenefit: string;
  implementation: string[];
  timeline: string;
  resourceRequirements?: string[];
  dependencies?: string[];
  successMetrics?: string[];
}

export interface NavigationContext {
  userExperience: 'beginner' | 'intermediate' | 'advanced';
  timeConstraints: 'tight' | 'moderate' | 'flexible';
  resourceAvailability: 'limited' | 'moderate' | 'extensive';
  supportNetwork: 'minimal' | 'moderate' | 'strong';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  previousAttempts?: number;
  blockers?: string[];
  strengths?: string[];
}

export interface PathfinderROVProps {
  userId: string;
  currentObjective: string;
  context: NavigationContext;
  mode?: NavigationMode;
  onPathGenerated?: (path: NavigationPath) => void;
  onNavigationUpdate?: (update: NavigationUpdate) => void;
  onStrategicAdvice?: (recommendations: StrategicRecommendation[]) => void;
  realTimeGuidance?: boolean;
  adaptivePath?: boolean;
}

export interface NavigationUpdate {
  currentStep: number;
  totalSteps: number;
  progress: number;
  timeSpent?: number;
  blockers?: string[];
  insights?: string[];
}

export interface PathOptimization {
  originalPath: NavigationPath;
  optimizedPath: NavigationPath;
  optimizationReason: string;
  improvements: Array<{
    area: string;
    change: string;
    benefit: string;
  }>;
  tradeoffs: string[];
  confidence: number;
}

export interface ProgressMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  completedDate?: Date;
  evidence?: string[];
  nextActions?: string[];
}

export interface LearningPattern {
  userId: string;
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  optimalSessionLength: number; // minutes
  bestTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'flexible';
  motivationFactors: string[];
  commonObstacles: string[];
  successPatterns: string[];
}