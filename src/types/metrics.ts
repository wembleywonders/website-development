// src/types/metrics.ts
// Core types for the Creator Factory metrics tracking system

// ============================================
// CREATOR JOURNEY TYPES
// ============================================

export type CreatorStage = 
  | 'prospect'      // Visited, showed interest
  | 'explorer'      // In Bright Sparks / sandbox
  | 'learner'       // Enrolled in a programme
  | 'builder'       // Creating products
  | 'seller'        // Completed TECHreneurs, products live
  | 'earner'        // First sale made
  | 'consistent'    // £100+/month for 3+ months
  | 'thriving'      // £300+/month for 3+ months
  | 'mentor'        // Now helping others
  | 'churned'       // Left the platform
  | 'paused';       // Inactive but not churned

export type IncomeLevel = 
  | 'zero'          // £0
  | 'first-sale'    // £1-49
  | 'side-income'   // £50-99
  | 'meaningful'    // £100-299
  | 'significant'   // £300-499
  | 'substantial'   // £500-999
  | 'professional'; // £1000+

export type GeographicTier = 
  | 'wembley'       // Core: Wembley area
  | 'brent'         // Core: Wider Brent borough
  | 'nw-london'     // Regional: NW London boroughs
  | 'london'        // Regional: Greater London
  | 'uk'            // National: UK-wide
  | 'international'; // Beyond UK

export type CreatorSource = 
  | 'local-outreach'    // Methodist circuit, community centres
  | 'word-of-mouth'     // Referred by existing creator
  | 'migration'         // From another platform
  | 'organic-search'    // Found us online
  | 'social-media'      // TikTok, Instagram, etc.
  | 'event'             // Workshop, showcase, etc.
  | 'partnership'       // School, org partnership
  | 'unknown';

export type ProgrammeId = 
  | 'bright-sparks'
  | 'stemgineers'
  | 'silk-stilettos'
  | 'trubble-n-bass'
  | 'pageturners'
  | 'kaywanas-court'
  | 'gtechcasters'
  | 'auntie-anansis-kitchen'
  | 'techreneurs';

// ============================================
// CORE DATA MODELS
// ============================================

export interface Creator {
  id: string;
  joinedAt: Date;
  stage: CreatorStage;
  stageHistory: StageTransition[];
  
  // Demographics
  ageGroup: '13-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  postcode?: string; // For geographic analysis
  geographicTier: GeographicTier;
  
  // Background
  source: CreatorSource;
  referredBy?: string; // Creator ID if word-of-mouth
  hadPriorIncome: boolean; // Did they earn from creating BEFORE us?
  priorPlatforms?: string[]; // Gumroad, Etsy, etc.
  
  // Programme journey
  programmes: ProgrammeEnrollment[];
  currentProgramme?: ProgrammeId;
  
  // Products & Income
  products: ProductRecord[];
  totalProductsCreated: number;
  totalProductsLive: number;
  
  // Income tracking
  incomeHistory: MonthlyIncome[];
  currentIncomeLevel: IncomeLevel;
  lifetimeEarnings: number; // Total £ earned on platform
  firstSaleDate?: Date;
  
  // Engagement
  lastActiveAt: Date;
  mentorId?: string;
  menteeIds: string[];
  
  // Flags
  isMigrated: boolean;
  isLocalBrent: boolean;
  completedTECHreneurs: boolean;
}

export interface StageTransition {
  from: CreatorStage;
  to: CreatorStage;
  date: Date;
  reason?: string;
}

export interface ProgrammeEnrollment {
  programmeId: ProgrammeId;
  enrolledAt: Date;
  completedAt?: Date;
  status: 'active' | 'completed' | 'dropped' | 'paused';
  productsCreated: number;
}

export interface ProductRecord {
  id: string;
  createdAt: Date;
  publishedAt?: Date;
  programmeId: ProgrammeId;
  productType: string;
  pricePoint: number;
  status: 'draft' | 'review' | 'live' | 'archived';
  totalSales: number;
  totalRevenue: number;
}

export interface MonthlyIncome {
  month: string; // YYYY-MM format
  grossRevenue: number;
  creatorShare: number; // 55%
  communityShare: number; // 25%
  operationsShare: number; // 20%
  productsSold: number;
  uniqueCustomers: number;
}

// ============================================
// AGGREGATE METRICS
// ============================================

export interface DashboardMetrics {
  // Core Mission Metrics
  totalCreators: number;
  creatorsFromZero: number; // Never earned before us
  creatorsNowEarning: number;
  conversionZeroToEarning: number; // %
  
  // Stage Distribution
  stageDistribution: Record<CreatorStage, number>;
  
  // Geographic Distribution
  geoDistribution: Record<GeographicTier, number>;
  brentPercentage: number;
  
  // Income Metrics
  incomeDistribution: Record<IncomeLevel, number>;
  avgMonthlyIncomePerEarner: number;
  medianMonthlyIncome: number;
  totalPlatformGMV: number;
  creatorPayouts: number;
  
  // Journey Metrics
  avgDaysToFirstSale: number;
  avgDaysToConsistent: number;
  programmeCompletionRates: Record<ProgrammeId, number>;
  
  // Product Metrics
  totalProductsCreated: number;
  totalProductsLive: number;
  avgProductsPerCreator: number;
  productsByProgramme: Record<ProgrammeId, number>;
  
  // Retention & Health
  monthlyRetentionRate: number;
  churnRate: number;
  mentorToMenteeRatio: number;
  avgMenteesPerMentor: number;
  
  // Source Effectiveness
  sourceDistribution: Record<CreatorSource, number>;
  sourceConversionRates: Record<CreatorSource, number>;
  
  // Competitive Moat Metrics
  migrationCount: number;
  migrationSources: Record<string, number>;
  migrationRetentionRate: number;
}

export interface TrendData {
  period: string;
  newCreators: number;
  activeCreators: number;
  totalGMV: number;
  avgIncomePerCreator: number;
  firstTimeSales: number;
  productLaunches: number;
}

export interface GoalProgress {
  goalId: string;
  name: string;
  target: number;
  current: number;
  percentage: number;
  deadline: Date;
  status: 'on-track' | 'at-risk' | 'behind' | 'achieved';
}

// ============================================
// STRATEGIC GOALS (Year 1-5)
// ============================================

export interface StrategicGoals {
  year1: {
    totalCreators: { target: 200; current: number };
    brentCreators: { target: 150; current: number };
    creatorsEarning: { target: 50; current: number };
    avgMonthlyIncome: { target: 150; current: number };
    monthlyGMV: { target: 10000; current: number };
  };
  year3: {
    totalCreators: { target: 1000; current: number };
    nwLondonCreators: { target: 700; current: number };
    creatorsEarning: { target: 400; current: number };
    avgMonthlyIncome: { target: 250; current: number };
    monthlyGMV: { target: 100000; current: number };
  };
  year5: {
    totalCreators: { target: 5000; current: number };
    ukWideCreators: { target: 3000; current: number };
    creatorsEarning: { target: 2500; current: number };
    avgMonthlyIncome: { target: 350; current: number };
    monthlyGMV: { target: 875000; current: number };
  };
}

// ============================================
// ROV/MAYA REPORT TYPES
// ============================================

export type ReportType = 
  | 'executive-summary'
  | 'creator-journey'
  | 'income-analysis'
  | 'geographic-breakdown'
  | 'programme-performance'
  | 'competitive-position'
  | 'goal-progress'
  | 'monthly-review'
  | 'weekly-snapshot';

export interface ReportRequest {
  type: ReportType;
  dateRange?: {
    start: Date;
    end: Date;
  };
  filters?: {
    geographic?: GeographicTier[];
    programmes?: ProgrammeId[];
    stages?: CreatorStage[];
    incomeLevels?: IncomeLevel[];
  };
  format: 'summary' | 'detailed' | 'data-export';
}

export interface GeneratedReport {
  type: ReportType;
  generatedAt: Date;
  period: string;
  highlights: string[];
  concerns: string[];
  recommendations: string[];
  metrics: Partial<DashboardMetrics>;
  trends?: TrendData[];
  goalProgress?: GoalProgress[];
}

// ============================================
// HELPER CONSTANTS
// ============================================

export const INCOME_THRESHOLDS = {
  'zero': 0,
  'first-sale': 1,
  'side-income': 50,
  'meaningful': 100,
  'significant': 300,
  'substantial': 500,
  'professional': 1000
} as const;

export const STAGE_ORDER: CreatorStage[] = [
  'prospect',
  'explorer',
  'learner',
  'builder',
  'seller',
  'earner',
  'consistent',
  'thriving',
  'mentor'
];

export const PROGRAMME_NAMES: Record<ProgrammeId, string> = {
  'bright-sparks': 'Bright Sparks',
  'stemgineers': 'STEMgineers',
  'silk-stilettos': 'Silk Stilettos',
  'trubble-n-bass': 'Trubble n Bass',
  'pageturners': 'Pageturners',
  'kaywanas-court': "Kaywana's Court",
  'gtechcasters': 'G-Tech Casters',
  'auntie-anansis-kitchen': "Auntie Anansi's Kitchen",
  'techreneurs': 'TECHreneurs'
};

export const GEOGRAPHIC_LABELS: Record<GeographicTier, string> = {
  'wembley': 'Wembley',
  'brent': 'Brent Borough',
  'nw-london': 'NW London',
  'london': 'Greater London',
  'uk': 'UK (Outside London)',
  'international': 'International'
};