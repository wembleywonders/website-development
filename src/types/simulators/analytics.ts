// src/types/simulators/analytics.ts
import { SimulatorType } from './core';

export interface SimulatorAnalytics {
  simulatorId: string;
  timeRange: 'day' | 'week' | 'month' | 'quarter' | 'year';
  data: {
    totalSessions: number;
    completedSessions: number;
    averageCompletionTime: number;
    successRate: number;
    mostCommonErrors: Array<{
      step: string;
      error: string;
      frequency: number;
    }>;
    userSatisfactionRating: number;
    rovUsageRate: number;
    dropOffPoints: Array<{
      step: string;
      dropOffRate: number;
    }>;
    peakUsageHours: Array<{
      hour: number;
      sessionCount: number;
    }>;
    deviceBreakdown: {
      desktop: number;
      mobile: number;
      tablet: number;
    };
    accessibilityUsage: {
      screenReader: number;
      keyboardOnly: number;
      highContrast: number;
    };
  };
}

export interface CommunitySimulatorMetrics {
  totalSimulators: number;
  activeUsers: number;
  totalPracticeSessions: number;
  overallSuccessRate: number;
  mostPopularSimulators: Array<{
    simulatorId: string;
    type: SimulatorType;
    sessionCount: number;
    averageRating: number;
  }>;
  userProgression: {
    beginners: number;
    intermediate: number;
    advanced: number;
    masters: number;
  };
  culturalDemographics: Array<{
    country: string;
    userCount: number;
    preferredSimulators: SimulatorType[];
  }>;
  outcomeTracking: {
    successfulRealApplications: number;
    timesSavedFromPractice: number; // hours
    confidenceIncrease: number; // percentage
    communityRecommendations: number;
  };
}

export interface PerformanceMetrics {
  simulatorId: string;
  loadTimes: {
    average: number;
    p95: number;
    p99: number;
  };
  errorRates: {
    clientErrors: number;
    serverErrors: number;
    networkErrors: number;
  };
  resourceUsage: {
    cpuUtilization: number;
    memoryUsage: number;
    bandwidth: number;
  };
  uptime: number; // percentage
  lastUpdated: Date;
}

export interface UserJourneyAnalytics {
  userId: string;
  journeyMaps: Array<{
    simulatorType: SimulatorType;
    sessions: Array<{
      sessionId: string;
      startStep: string;
      endStep: string;
      completionRate: number;
      timeSpent: number;
      errorsEncountered: string[];
      rovInterventions: number;
    }>;
    overallProgression: 'improving' | 'stable' | 'declining';
    identifiedChallenges: string[];
    recommendedNextSteps: string[];
  }>;
}

export interface ABTestResults {
  testId: string;
  simulatorId: string;
  hypothesis: string;
  variants: Array<{
    name: string;
    description: string;
    trafficPercentage: number;
  }>;
  metrics: Array<{
    name: string;
    baseline: number;
    results: Array<{
      variant: string;
      value: number;
      confidenceInterval: [number, number];
      significanceLevel: number;
    }>;
  }>;
  conclusion: string;
  implementationRecommendation: string;
  testPeriod: {
    startDate: Date;
    endDate: Date;
  };
}