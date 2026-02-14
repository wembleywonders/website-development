// src/systems/rovs/personalities/insight/InsightAnalysisROVTypes.ts

export type AnalysisType = 'performance' | 'community' | 'engagement' | 'learning' | 'strategic';

export type PatternType = 'trend' | 'correlation' | 'anomaly' | 'cycle' | 'bottleneck' | 'opportunity' | 'engagement';

export type SignificanceLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DataPattern {
  type: PatternType;
  description: string;
  strength: number; // 0-1 confidence in pattern
  dataPoints: string[];
  significance: SignificanceLevel;
  timeRange?: {
    start: Date;
    end: Date;
  };
  metadata?: Record<string, any>;
}

export interface InsightSession {
  id: string;
  userId: string;
  skillId: string;
  startedAt: Date;
  completedAt?: Date;
  analysisType: AnalysisType;
  dataAnalyzed: string[];
  patternsIdentified: DataPattern[];
  recommendations: string[];
  confidence: number; // 0-1 overall confidence in analysis
  actionable: boolean;
  followUpRequired?: boolean;
}

export interface PerformanceMetrics {
  skillProgressions: Array<{
    skillId: string;
    timePoints: Array<{
      date: Date;
      level: number;
      activity: string;
    }>;
  }>;
  rovInteractions: Array<{
    date: Date;
    type: string;
    effectiveness: number;
  }>;
  communityEngagement: Array<{
    date: Date;
    type: 'event' | 'connection' | 'project' | 'mentoring';
    impact: number;
  }>;
  careerOutcomes: Array<{
    date: Date;
    type: 'promotion' | 'new-job' | 'networking' | 'skill-recognition';
    details: string;
  }>;
}

export interface CommunityAnalytics {
  engagementPatterns: Array<{
    timeSlot: string;
    activeUsers: number;
    activityTypes: Record<string, number>;
  }>;
  networkConnections: Array<{
    userId: string;
    connections: number;
    crossCultural: number;
    professional: number;
  }>;
  eventParticipation: Array<{
    eventId: string;
    attendance: number;
    satisfaction: number;
    demographics: Record<string, number>;
  }>;
  skillDistribution: Array<{
    skillCategory: string;
    practitioners: number;
    averageLevel: number;
    growthRate: number;
  }>;
}

export interface StrategicRecommendation {
  id: string;
  category: 'individual' | 'community' | 'operational' | 'strategic';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  expectedImpact: string;
  timeframe: string;
  resources: string[];
  successMetrics: string[];
  risks: string[];
}

export interface InsightAnalysisROVProps {
  userId: string;
  skillId?: string;
  analysisType?: AnalysisType;
  dataContext?: Record<string, any>;
  onAnalysisComplete?: (session: InsightSession) => void;
  onRecommendation?: (recommendation: string) => void;
  onPatternIdentified?: (pattern: DataPattern) => void;
  autoAnalyze?: boolean;
  realTimeMode?: boolean;
}

export interface AnalysisReport {
  id: string;
  sessionId: string;
  generatedAt: Date;
  analysisType: AnalysisType;
  executiveSummary: string;
  keyFindings: string[];
  patterns: DataPattern[];
  recommendations: StrategicRecommendation[];
  dataQuality: {
    completeness: number;
    accuracy: number;
    timeliness: number;
  };
  confidence: number;
  nextAnalysisDate?: Date;
}

export interface BenchmarkData {
  category: string;
  userValue: number;
  communityAverage: number;
  topPercentile: number;
  industryStandard?: number;
  interpretation: 'below-average' | 'average' | 'above-average' | 'exceptional';
  improvementPotential: number;
}

export interface PredictiveInsight {
  id: string;
  type: 'skill-progression' | 'career-outcome' | 'community-growth' | 'engagement-trend';
  prediction: string;
  confidence: number;
  timeframe: string;
  factors: string[];
  mitigationStrategies?: string[];
  opportunities?: string[];
}