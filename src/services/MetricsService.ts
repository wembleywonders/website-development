// src/services/MetricsService.ts
// Core service for tracking, calculating, and reporting Creator Factory KPIs

import {
  Creator,
  CreatorStage,
  IncomeLevel,
  GeographicTier,
  CreatorSource,
  ProgrammeId,
  DashboardMetrics,
  TrendData,
  GoalProgress,
  StrategicGoals,
  ReportType,
  ReportRequest,
  GeneratedReport,
  MonthlyIncome,
  INCOME_THRESHOLDS,
  STAGE_ORDER,
  PROGRAMME_NAMES,
  GEOGRAPHIC_LABELS
} from '../types/metrics';

// ============================================
// MOCK DATA GENERATOR (Replace with real DB)
// ============================================

const generateMockCreators = (): Creator[] => {
  // This would be replaced with actual database queries
  // For now, generating realistic mock data
  const stages: CreatorStage[] = ['prospect', 'explorer', 'learner', 'builder', 'seller', 'earner', 'consistent', 'thriving', 'mentor'];
  const sources: CreatorSource[] = ['local-outreach', 'word-of-mouth', 'migration', 'organic-search', 'event', 'partnership'];
  const geos: GeographicTier[] = ['wembley', 'wembley', 'wembley', 'brent', 'brent', 'nw-london', 'london'];
  
  const creators: Creator[] = [];
  
  for (let i = 0; i < 127; i++) {
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const hasIncome = ['earner', 'consistent', 'thriving', 'mentor'].includes(stage);
    const monthlyIncome = hasIncome ? Math.floor(Math.random() * 500) + 50 : 0;
    
    creators.push({
      id: `creator-${i}`,
      joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      stage,
      stageHistory: [],
      ageGroup: ['18-24', '25-34', '35-44', '45-54'][Math.floor(Math.random() * 4)] as any,
      geographicTier: geos[Math.floor(Math.random() * geos.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      hadPriorIncome: Math.random() < 0.15, // Only 15% had prior income
      programmes: [],
      products: [],
      totalProductsCreated: Math.floor(Math.random() * 8),
      totalProductsLive: hasIncome ? Math.floor(Math.random() * 5) + 1 : 0,
      incomeHistory: [],
      currentIncomeLevel: getIncomeLevel(monthlyIncome),
      lifetimeEarnings: monthlyIncome * Math.floor(Math.random() * 6),
      firstSaleDate: hasIncome ? new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000) : undefined,
      lastActiveAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      menteeIds: [],
      isMigrated: Math.random() < 0.12,
      isLocalBrent: Math.random() < 0.65,
      completedTECHreneurs: ['seller', 'earner', 'consistent', 'thriving', 'mentor'].includes(stage)
    });
  }
  
  return creators;
};

const getIncomeLevel = (amount: number): IncomeLevel => {
  if (amount >= 1000) return 'professional';
  if (amount >= 500) return 'substantial';
  if (amount >= 300) return 'significant';
  if (amount >= 100) return 'meaningful';
  if (amount >= 50) return 'side-income';
  if (amount >= 1) return 'first-sale';
  return 'zero';
};

// ============================================
// METRICS SERVICE CLASS
// ============================================

class MetricsService {
  private creators: Creator[] = [];
  private lastUpdated: Date = new Date();

  constructor() {
    this.refreshData();
  }

  // Refresh data from database
  async refreshData(): Promise<void> {
    // In production, this would fetch from your database
    this.creators = generateMockCreators();
    this.lastUpdated = new Date();
  }

  // ============================================
  // CORE MISSION METRICS
  // ============================================

  getTotalCreators(): number {
    return this.creators.filter(c => c.stage !== 'churned').length;
  }

  getCreatorsFromZero(): number {
    // Creators who had NO prior income before joining us
    return this.creators.filter(c => !c.hadPriorIncome && c.stage !== 'churned').length;
  }

  getCreatorsNowEarning(): number {
    return this.creators.filter(c => 
      ['earner', 'consistent', 'thriving', 'mentor'].includes(c.stage)
    ).length;
  }

  getZeroToEarningConversion(): number {
    const fromZero = this.getCreatorsFromZero();
    const nowEarning = this.creators.filter(c => 
      !c.hadPriorIncome && 
      ['earner', 'consistent', 'thriving', 'mentor'].includes(c.stage)
    ).length;
    return fromZero > 0 ? (nowEarning / fromZero) * 100 : 0;
  }

  // The key metric: How many people who NEVER would have tried are now earning?
  getCreatedCreatorsEarning(): { count: number; totalMonthlyIncome: number; avgIncome: number } {
    const created = this.creators.filter(c => 
      !c.hadPriorIncome && 
      ['earner', 'consistent', 'thriving', 'mentor'].includes(c.stage)
    );
    
    // Estimate monthly income based on level
    const incomeEstimates: Record<IncomeLevel, number> = {
      'zero': 0,
      'first-sale': 25,
      'side-income': 75,
      'meaningful': 175,
      'significant': 400,
      'substantial': 700,
      'professional': 1200
    };
    
    const totalMonthly = created.reduce((sum, c) => sum + incomeEstimates[c.currentIncomeLevel], 0);
    
    return {
      count: created.length,
      totalMonthlyIncome: totalMonthly,
      avgIncome: created.length > 0 ? totalMonthly / created.length : 0
    };
  }

  // ============================================
  // STAGE DISTRIBUTION
  // ============================================

  getStageDistribution(): Record<CreatorStage, number> {
    const distribution: Record<CreatorStage, number> = {
      'prospect': 0,
      'explorer': 0,
      'learner': 0,
      'builder': 0,
      'seller': 0,
      'earner': 0,
      'consistent': 0,
      'thriving': 0,
      'mentor': 0,
      'churned': 0,
      'paused': 0
    };
    
    this.creators.forEach(c => {
      distribution[c.stage]++;
    });
    
    return distribution;
  }

  getStageFunnel(): { stage: string; count: number; percentage: number }[] {
    const distribution = this.getStageDistribution();
    const total = this.getTotalCreators();
    
    return STAGE_ORDER.map(stage => ({
      stage,
      count: distribution[stage],
      percentage: total > 0 ? (distribution[stage] / total) * 100 : 0
    }));
  }

  // ============================================
  // GEOGRAPHIC DISTRIBUTION
  // ============================================

  getGeographicDistribution(): Record<GeographicTier, number> {
    const distribution: Record<GeographicTier, number> = {
      'wembley': 0,
      'brent': 0,
      'nw-london': 0,
      'london': 0,
      'uk': 0,
      'international': 0
    };
    
    this.creators.filter(c => c.stage !== 'churned').forEach(c => {
      distribution[c.geographicTier]++;
    });
    
    return distribution;
  }

  getBrentPercentage(): number {
    const total = this.getTotalCreators();
    const brent = this.creators.filter(c => 
      ['wembley', 'brent'].includes(c.geographicTier) && c.stage !== 'churned'
    ).length;
    return total > 0 ? (brent / total) * 100 : 0;
  }

  getLocalDensityScore(): { score: number; interpretation: string } {
    const brentPct = this.getBrentPercentage();
    const nwLondonPct = this.creators.filter(c => 
      ['wembley', 'brent', 'nw-london'].includes(c.geographicTier) && c.stage !== 'churned'
    ).length / this.getTotalCreators() * 100;
    
    const score = (brentPct * 0.6) + (nwLondonPct * 0.4);
    
    let interpretation = '';
    if (score >= 70) interpretation = 'Excellent local density - strong community foundation';
    else if (score >= 50) interpretation = 'Good local presence - continue nurturing Brent roots';
    else if (score >= 30) interpretation = 'Moderate - may be expanding too fast from core';
    else interpretation = 'Low local density - refocus on Wembley/Brent community';
    
    return { score, interpretation };
  }

  // ============================================
  // INCOME & REVENUE METRICS
  // ============================================

  getIncomeDistribution(): Record<IncomeLevel, number> {
    const distribution: Record<IncomeLevel, number> = {
      'zero': 0,
      'first-sale': 0,
      'side-income': 0,
      'meaningful': 0,
      'significant': 0,
      'substantial': 0,
      'professional': 0
    };
    
    this.creators.filter(c => c.stage !== 'churned').forEach(c => {
      distribution[c.currentIncomeLevel]++;
    });
    
    return distribution;
  }

  getRevenueMetrics(): {
    totalPlatformGMV: number;
    creatorPayouts: number;
    communityFund: number;
    operationsFund: number;
    avgIncomePerEarner: number;
  } {
    // Estimate based on income levels
    const incomeEstimates: Record<IncomeLevel, number> = {
      'zero': 0, 'first-sale': 25, 'side-income': 75,
      'meaningful': 175, 'significant': 400, 'substantial': 700, 'professional': 1200
    };
    
    const earners = this.creators.filter(c => 
      ['earner', 'consistent', 'thriving', 'mentor'].includes(c.stage)
    );
    
    const totalCreatorIncome = earners.reduce((sum, c) => 
      sum + incomeEstimates[c.currentIncomeLevel], 0
    );
    
    // Work backwards: creator gets 55%, so GMV = creator income / 0.55
    const totalGMV = totalCreatorIncome / 0.55;
    
    return {
      totalPlatformGMV: Math.round(totalGMV),
      creatorPayouts: Math.round(totalCreatorIncome), // 55%
      communityFund: Math.round(totalGMV * 0.25), // 25%
      operationsFund: Math.round(totalGMV * 0.20), // 20%
      avgIncomePerEarner: earners.length > 0 ? Math.round(totalCreatorIncome / earners.length) : 0
    };
  }

  // ============================================
  // JOURNEY METRICS
  // ============================================

  getJourneyMetrics(): {
    avgDaysToFirstSale: number;
    avgDaysToConsistent: number;
    fastestToFirstSale: number;
    slowestToFirstSale: number;
  } {
    const withSales = this.creators.filter(c => c.firstSaleDate);
    
    const daysToFirstSale = withSales.map(c => {
      const joined = new Date(c.joinedAt).getTime();
      const firstSale = new Date(c.firstSaleDate!).getTime();
      return Math.floor((firstSale - joined) / (1000 * 60 * 60 * 24));
    });
    
    const consistent = this.creators.filter(c => 
      ['consistent', 'thriving', 'mentor'].includes(c.stage)
    );
    
    return {
      avgDaysToFirstSale: daysToFirstSale.length > 0 
        ? Math.round(daysToFirstSale.reduce((a, b) => a + b, 0) / daysToFirstSale.length)
        : 0,
      avgDaysToConsistent: consistent.length > 0 ? 120 : 0, // Placeholder
      fastestToFirstSale: daysToFirstSale.length > 0 ? Math.min(...daysToFirstSale) : 0,
      slowestToFirstSale: daysToFirstSale.length > 0 ? Math.max(...daysToFirstSale) : 0
    };
  }

  // ============================================
  // SOURCE EFFECTIVENESS
  // ============================================

  getSourceMetrics(): {
    distribution: Record<CreatorSource, number>;
    conversionToEarner: Record<CreatorSource, number>;
    bestSource: { source: CreatorSource; rate: number };
  } {
    const distribution: Record<CreatorSource, number> = {
      'local-outreach': 0, 'word-of-mouth': 0, 'migration': 0,
      'organic-search': 0, 'social-media': 0, 'event': 0,
      'partnership': 0, 'unknown': 0
    };
    
    const earnersBySource: Record<CreatorSource, number> = { ...distribution };
    
    this.creators.filter(c => c.stage !== 'churned').forEach(c => {
      distribution[c.source]++;
      if (['earner', 'consistent', 'thriving', 'mentor'].includes(c.stage)) {
        earnersBySource[c.source]++;
      }
    });
    
    const conversionRates: Record<CreatorSource, number> = {} as any;
    let bestSource: CreatorSource = 'local-outreach';
    let bestRate = 0;
    
    (Object.keys(distribution) as CreatorSource[]).forEach(source => {
      const rate = distribution[source] > 0 
        ? (earnersBySource[source] / distribution[source]) * 100 
        : 0;
      conversionRates[source] = Math.round(rate);
      if (rate > bestRate) {
        bestRate = rate;
        bestSource = source;
      }
    });
    
    return {
      distribution,
      conversionToEarner: conversionRates,
      bestSource: { source: bestSource, rate: bestRate }
    };
  }

  // ============================================
  // COMPETITIVE MOAT METRICS
  // ============================================

  getCompetitiveMoatMetrics(): {
    migrationCount: number;
    migrationRetentionRate: number;
    avgIncomeIncrease: number; // vs their prior platform
    localCommunityStrength: number;
    mentorRatio: number;
  } {
    const migrants = this.creators.filter(c => c.isMigrated);
    const activeMigrants = migrants.filter(c => c.stage !== 'churned');
    const mentors = this.creators.filter(c => c.stage === 'mentor').length;
    const mentees = this.creators.filter(c => c.menteeIds.length > 0).length;
    
    return {
      migrationCount: migrants.length,
      migrationRetentionRate: migrants.length > 0 
        ? (activeMigrants.length / migrants.length) * 100 
        : 0,
      avgIncomeIncrease: 35, // Placeholder - would track vs prior platform
      localCommunityStrength: this.getBrentPercentage(),
      mentorRatio: mentees > 0 ? mentors / mentees : 0
    };
  }

  // ============================================
  // STRATEGIC GOAL PROGRESS
  // ============================================

  getStrategicGoals(): StrategicGoals {
    const total = this.getTotalCreators();
    const brent = this.creators.filter(c => 
      ['wembley', 'brent'].includes(c.geographicTier) && c.stage !== 'churned'
    ).length;
    const nwLondon = this.creators.filter(c => 
      ['wembley', 'brent', 'nw-london'].includes(c.geographicTier) && c.stage !== 'churned'
    ).length;
    const earning = this.getCreatorsNowEarning();
    const revenue = this.getRevenueMetrics();
    
    return {
      year1: {
        totalCreators: { target: 200, current: total },
        brentCreators: { target: 150, current: brent },
        creatorsEarning: { target: 50, current: earning },
        avgMonthlyIncome: { target: 150, current: revenue.avgIncomePerEarner },
        monthlyGMV: { target: 10000, current: revenue.totalPlatformGMV }
      },
      year3: {
        totalCreators: { target: 1000, current: total },
        nwLondonCreators: { target: 700, current: nwLondon },
        creatorsEarning: { target: 400, current: earning },
        avgMonthlyIncome: { target: 250, current: revenue.avgIncomePerEarner },
        monthlyGMV: { target: 100000, current: revenue.totalPlatformGMV }
      },
      year5: {
        totalCreators: { target: 5000, current: total },
        ukWideCreators: { target: 3000, current: total },
        creatorsEarning: { target: 2500, current: earning },
        avgMonthlyIncome: { target: 350, current: revenue.avgIncomePerEarner },
        monthlyGMV: { target: 875000, current: revenue.totalPlatformGMV }
      }
    };
  }

  getGoalProgress(year: 1 | 3 | 5): GoalProgress[] {
    const goals = this.getStrategicGoals();
    const yearGoals = year === 1 ? goals.year1 : year === 3 ? goals.year3 : goals.year5;
    
    return Object.entries(yearGoals).map(([key, value]) => {
      const percentage = (value.current / value.target) * 100;
      let status: GoalProgress['status'] = 'on-track';
      if (percentage >= 100) status = 'achieved';
      else if (percentage < 50) status = 'behind';
      else if (percentage < 75) status = 'at-risk';
      
      return {
        goalId: key,
        name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        target: value.target,
        current: value.current,
        percentage: Math.round(percentage),
        deadline: new Date(Date.now() + year * 365 * 24 * 60 * 60 * 1000),
        status
      };
    });
  }

  // ============================================
  // FULL DASHBOARD METRICS
  // ============================================

  getDashboardMetrics(): DashboardMetrics {
    const stageDistribution = this.getStageDistribution();
    const geoDistribution = this.getGeographicDistribution();
    const incomeDistribution = this.getIncomeDistribution();
    const revenue = this.getRevenueMetrics();
    const journey = this.getJourneyMetrics();
    const source = this.getSourceMetrics();
    const moat = this.getCompetitiveMoatMetrics();
    
    return {
      // Core Mission
      totalCreators: this.getTotalCreators(),
      creatorsFromZero: this.getCreatorsFromZero(),
      creatorsNowEarning: this.getCreatorsNowEarning(),
      conversionZeroToEarning: this.getZeroToEarningConversion(),
      
      // Distributions
      stageDistribution,
      geoDistribution,
      incomeDistribution,
      brentPercentage: this.getBrentPercentage(),
      
      // Income
      avgMonthlyIncomePerEarner: revenue.avgIncomePerEarner,
      medianMonthlyIncome: 150, // Would calculate properly
      totalPlatformGMV: revenue.totalPlatformGMV,
      creatorPayouts: revenue.creatorPayouts,
      
      // Journey
      avgDaysToFirstSale: journey.avgDaysToFirstSale,
      avgDaysToConsistent: journey.avgDaysToConsistent,
      programmeCompletionRates: {} as any, // Would populate
      
      // Products
      totalProductsCreated: this.creators.reduce((sum, c) => sum + c.totalProductsCreated, 0),
      totalProductsLive: this.creators.reduce((sum, c) => sum + c.totalProductsLive, 0),
      avgProductsPerCreator: 3.2, // Would calculate
      productsByProgramme: {} as any,
      
      // Retention
      monthlyRetentionRate: 85,
      churnRate: 15,
      mentorToMenteeRatio: moat.mentorRatio,
      avgMenteesPerMentor: 2.5,
      
      // Sources
      sourceDistribution: source.distribution,
      sourceConversionRates: source.conversionToEarner,
      
      // Competitive
      migrationCount: moat.migrationCount,
      migrationSources: { 'Gumroad': 5, 'Etsy': 3, 'Teachable': 2 },
      migrationRetentionRate: moat.migrationRetentionRate
    };
  }

  // ============================================
  // REPORT GENERATION (For Maya/ROVs)
  // ============================================

  generateReport(request: ReportRequest): GeneratedReport {
    const metrics = this.getDashboardMetrics();
    const goals = this.getGoalProgress(1);
    const createdCreators = this.getCreatedCreatorsEarning();
    const localDensity = this.getLocalDensityScore();
    const sourceMetrics = this.getSourceMetrics();
    
    const highlights: string[] = [];
    const concerns: string[] = [];
    const recommendations: string[] = [];

    // Generate insights based on report type
    switch (request.type) {
      case 'executive-summary':
        // Highlights
        if (createdCreators.count > 0) {
          highlights.push(`🎯 ${createdCreators.count} people who NEVER earned from creating before are now earning an average of £${Math.round(createdCreators.avgIncome)}/month`);
        }
        highlights.push(`📍 ${Math.round(metrics.brentPercentage)}% of creators are from Brent - maintaining strong local roots`);
        highlights.push(`💰 Platform GMV: £${metrics.totalPlatformGMV.toLocaleString()}/month (£${metrics.creatorPayouts.toLocaleString()} to creators)`);
        
        // Concerns
        if (metrics.conversionZeroToEarning < 25) {
          concerns.push(`⚠️ Zero-to-earning conversion at ${Math.round(metrics.conversionZeroToEarning)}% - below 25% target`);
        }
        if (metrics.brentPercentage < 50) {
          concerns.push(`⚠️ Brent concentration dropping - may be expanding too fast from core`);
        }
        
        // Recommendations
        recommendations.push(`Focus outreach on ${sourceMetrics.bestSource.source} - ${Math.round(sourceMetrics.bestSource.rate)}% conversion to earner`);
        if (metrics.avgDaysToFirstSale > 90) {
          recommendations.push(`Reduce time-to-first-sale (currently ${metrics.avgDaysToFirstSale} days) - consider accelerated TECHreneurs track`);
        }
        break;
        
      case 'creator-journey':
        const funnel = this.getStageFunnel();
        highlights.push(`Creator funnel: ${funnel.map(s => `${s.stage}: ${s.count}`).join(' → ')}`);
        highlights.push(`${metrics.creatorsNowEarning} creators are now earning (${Math.round(metrics.creatorsNowEarning / metrics.totalCreators * 100)}% of active)`);
        
        if (metrics.avgDaysToFirstSale < 60) {
          highlights.push(`✨ Average ${metrics.avgDaysToFirstSale} days to first sale - excellent velocity`);
        }
        break;
        
      case 'income-analysis':
        const revenue = this.getRevenueMetrics();
        highlights.push(`Total platform GMV: £${revenue.totalPlatformGMV.toLocaleString()}`);
        highlights.push(`Creator payouts (55%): £${revenue.creatorPayouts.toLocaleString()}`);
        highlights.push(`Community fund (25%): £${revenue.communityFund.toLocaleString()}`);
        highlights.push(`Average earner income: £${revenue.avgIncomePerEarner}/month`);
        
        const incDist = metrics.incomeDistribution;
        highlights.push(`Income distribution: Zero: ${incDist.zero}, £1-49: ${incDist['first-sale']}, £50-99: ${incDist['side-income']}, £100-299: ${incDist.meaningful}, £300+: ${incDist.significant + incDist.substantial + incDist.professional}`);
        break;
        
      case 'geographic-breakdown':
        highlights.push(`Local density score: ${Math.round(localDensity.score)}% - ${localDensity.interpretation}`);
        Object.entries(metrics.geoDistribution).forEach(([geo, count]) => {
          if (count > 0) {
            highlights.push(`${GEOGRAPHIC_LABELS[geo as GeographicTier]}: ${count} creators`);
          }
        });
        break;
        
      case 'competitive-position':
        const moat = this.getCompetitiveMoatMetrics();
        highlights.push(`🛡️ ${moat.migrationCount} creators migrated from other platforms`);
        highlights.push(`📊 Migration retention: ${Math.round(moat.migrationRetentionRate)}%`);
        highlights.push(`🏘️ ${Math.round(moat.localCommunityStrength)}% local (Brent) - our moat vs global platforms`);
        highlights.push(`👥 Mentor ratio: 1:${Math.round(1/moat.mentorRatio)} (target 1:5)`);
        
        recommendations.push(`Our advantage: We CREATE creators (${metrics.creatorsFromZero} from zero income). Competitors only serve existing creators.`);
        break;
        
      case 'goal-progress':
        goals.forEach(goal => {
          const emoji = goal.status === 'achieved' ? '✅' : goal.status === 'on-track' ? '📈' : goal.status === 'at-risk' ? '⚠️' : '🔴';
          highlights.push(`${emoji} ${goal.name}: ${goal.current}/${goal.target} (${goal.percentage}%)`);
        });
        break;
        
      default:
        highlights.push(`Total creators: ${metrics.totalCreators}`);
        highlights.push(`Creators earning: ${metrics.creatorsNowEarning}`);
        highlights.push(`Platform GMV: £${metrics.totalPlatformGMV.toLocaleString()}`);
    }

    return {
      type: request.type,
      generatedAt: new Date(),
      period: request.dateRange 
        ? `${request.dateRange.start.toLocaleDateString()} - ${request.dateRange.end.toLocaleDateString()}`
        : 'Current snapshot',
      highlights,
      concerns,
      recommendations,
      metrics,
      goalProgress: goals
    };
  }

  // ============================================
  // MAYA/ROV CONVERSATIONAL INTERFACE
  // ============================================

  getQuickStat(stat: string): string {
    const metrics = this.getDashboardMetrics();
    const created = this.getCreatedCreatorsEarning();
    const revenue = this.getRevenueMetrics();
    
    const stats: Record<string, () => string> = {
      'total-creators': () => `We have ${metrics.totalCreators} active creators.`,
      'earning': () => `${metrics.creatorsNowEarning} creators are now earning money.`,
      'created-creators': () => `${created.count} people who NEVER earned from creating before are now making an average of £${Math.round(created.avgIncome)}/month with us.`,
      'gmv': () => `Monthly GMV is £${revenue.totalPlatformGMV.toLocaleString()}. Creators receive £${revenue.creatorPayouts.toLocaleString()} (55%), community fund gets £${revenue.communityFund.toLocaleString()} (25%).`,
      'local': () => `${Math.round(metrics.brentPercentage)}% of our creators are from Brent. This local density is our competitive moat.`,
      'conversion': () => `${Math.round(metrics.conversionZeroToEarning)}% of people who joined with zero income are now earning.`,
      'time-to-sale': () => `Average time from joining to first sale: ${metrics.avgDaysToFirstSale} days.`,
      'year1-goals': () => {
        const goals = this.getGoalProgress(1);
        return goals.map(g => `${g.name}: ${g.percentage}% (${g.status})`).join('. ');
      }
    };
    
    const handler = stats[stat.toLowerCase()];
    return handler ? handler() : `I don't have a quick stat for "${stat}". Try: total-creators, earning, created-creators, gmv, local, conversion, time-to-sale, year1-goals.`;
  }

  getMissionStatement(): string {
    const created = this.getCreatedCreatorsEarning();
    const localDensity = this.getLocalDensityScore();
    
    return `
🎯 WEMBLEY WONDERS MISSION METRICS

Our Goal: CREATE creators who would never have tried

Current Impact:
• ${created.count} people earning who had ZERO income before us
• Average new creator earning: £${Math.round(created.avgIncome)}/month
• Total created for "never would have tried" creators: £${created.totalMonthlyIncome.toLocaleString()}/month

Local Community Strength:
• ${Math.round(localDensity.score)}% local density score
• ${localDensity.interpretation}

Why We're Different:
• Competitors serve the 1-5% who already have audiences
• We serve the forgotten 60% who need training AND marketplace
• 55% to creators (vs Gumroad's 90% to platform after fees)
• CIC structure = legally cannot exploit

Year 1 Target: 200 creators, 150 from Brent, 50 earning
    `.trim();
  }
}

// Export singleton instance
export const metricsService = new MetricsService();
export default MetricsService;