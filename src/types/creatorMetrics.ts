// Creator Factory Metrics Types
// Mission: "Creating Creators Who Would Never Have Tried"

export interface MissionMetrics {
  totalCreators: number;
  activeCreators: number;
  creatorsFromZero: number;
  creatorsEarning: number;
  createdCreators: number;
  createdCreatorPercent: number;
  missionStatement: string;
}

export interface StageMetrics {
  distribution: Record<string, number>;
  prospects: number;
  explorers: number;
  learners: number;
  builders: number;
  sellers: number;
  earners: number;
  consistent: number;
  thriving: number;
  mentors: number;
  churned: number;
  paused: number;
}

export interface IncomeMetrics {
  distribution: Record<string, number>;
  totalMonthlyIncome: number;
  avgIncomePerEarner: number;
  createdCreatorIncome: number;
  lifetimeEarnings: number;
  creatorShare: number;
  communityShare: number;
  operationsShare: number;
}

export interface GeographicMetrics {
  distribution: Record<string, number>;
  brentCreators: number;
  nwLondonCreators: number;
  brentPercent: number;
  localDensity: number;
}

export interface JourneyMetrics {
  avgDaysToFirstSale: number;
  fastestToFirstSale: number;
  slowestToFirstSale: number;
  totalProductsCreated: number;
  totalProductsLive: number;
  avgProductsPerCreator: number;
  mentorCount: number;
  withMentorCount: number;
  sourceDistribution: Record<string, number>;
  earnersBySource: Record<string, number>;
}

export interface GoalProgress {
  year: number;
  targetTotal: number;
  targetActive: number;
  targetEarning: number;
  currentTotal: number;
  currentActive: number;
  currentEarning: number;
  totalProgress: number;
  activeProgress: number;
  earningProgress: number;
  status: 'ON_TRACK' | 'AHEAD' | 'BEHIND';
}

export interface CreatorFactoryMetrics {
  mission: MissionMetrics;
  stages: StageMetrics;
  income: IncomeMetrics;
  geographic: GeographicMetrics;
  journey: JourneyMetrics;
  goals: {
    year1: GoalProgress;
    year3: GoalProgress;
    year5: GoalProgress;
  };
  generatedAt: string;
}

export const CREATOR_STAGES = [
  'PROSPECT', 'EXPLORER', 'LEARNER', 'BUILDER', 
  'SELLER', 'EARNER', 'CONSISTENT', 'THRIVING', 'MENTOR'
] as const;

export const STAGE_COLORS: Record<string, string> = {
  PROSPECT: '#94a3b8',
  EXPLORER: '#60a5fa',
  LEARNER: '#a78bfa',
  BUILDER: '#f472b6',
  SELLER: '#fb923c',
  EARNER: '#4ade80',
  CONSISTENT: '#22d3d8',
  THRIVING: '#facc15',
  MENTOR: '#f43f5e',
  CHURNED: '#64748b',
  PAUSED: '#9ca3af'
};
