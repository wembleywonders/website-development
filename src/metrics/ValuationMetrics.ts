/**
 * ValuationMetrics
 * Wembley Wonders CIC
 * 
 * Dashboard metrics for tracking Valuation Architecture adoption
 * and impact across the Creator Factory ecosystem.
 */

import {
  ValuationArchitectureRecord,
  ValuationWorksheet,
  QualityRubric,
  ScoreBand,
  getScoreBand,
  calculateMarketReadiness,
  Programme
} from '../prototype-registry/types/valuation';

// ============================================================================
// TYPES
// ============================================================================

export interface ValuationMetricsSummary {
  // Worksheet adoption
  totalWorksheets: number;
  worksheetsInProgress: number;
  worksheetsComplete: number;
  completionRate: number;
  
  // Quality distribution
  scoreBandDistribution: Record<ScoreBand, number>;
  averageQualityScore: number;
  
  // Defence stats
  defencesScheduled: number;
  defencesPassed: number;
  defencesConditional: number;
  defencePassRate: number;
  
  // Market readiness
  marketReadyPrototypes: number;
  marketReadinessRate: number;
  
  // Pricing
  totalValuationClaimed: number;
  averageValuationClaim: number;
  averageFloorPrice: number;
  claimToFloorRatio: number;
  
  // By programme
  byProgramme: Record<Programme, ProgrammeMetrics>;
  
  // Trends
  weeklyCompletions: WeeklyMetric[];
  weeklyDefences: WeeklyMetric[];
}

export interface ProgrammeMetrics {
  programme: Programme;
  totalWorksheets: number;
  completionRate: number;
  averageScore: number;
  marketReadyCount: number;
  totalValueClaimed: number;
}

export interface WeeklyMetric {
  weekStart: Date;
  count: number;
  label: string;
}

export interface CreatorValuationProgress {
  creatorId: string;
  creatorName: string;
  worksheetsStarted: number;
  worksheetsComplete: number;
  averageScore: number;
  highestScoreBand: ScoreBand | null;
  totalValueClaimed: number;
  defencesPassed: number;
  marketReadyCount: number;
}

export interface ValuationLeaderboard {
  topByScore: LeaderboardEntry[];
  topByValue: LeaderboardEntry[];
  topByVolume: LeaderboardEntry[];
  recentDefencePasses: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  creatorId: string;
  creatorName: string;
  programme: Programme;
  prototypeTitle: string;
  metric: number;
  metricLabel: string;
  achievedAt: Date;
}

// ============================================================================
// METRIC CALCULATIONS
// ============================================================================

export class ValuationMetricsService {
  
  /**
   * Calculate summary metrics from a collection of valuation records
   */
  calculateSummary(
    records: ValuationArchitectureRecord[],
    worksheets: ValuationWorksheet[],
    rubrics: QualityRubric[]
  ): ValuationMetricsSummary {
    
    // Worksheet stats
    const totalWorksheets = worksheets.length;
    const worksheetsComplete = worksheets.filter(w => w.status === 'approved').length;
    const worksheetsInProgress = worksheets.filter(w => 
      w.status === 'draft' || w.status === 'in-progress' || w.status === 'ready-for-review'
    ).length;
    const completionRate = totalWorksheets > 0 ? worksheetsComplete / totalWorksheets : 0;
    
    // Quality scores
    const scoreBandDistribution: Record<ScoreBand, number> = {
      'market-ready': 0,
      'nearly-there': 0,
      'development': 0,
      'early-stage': 0
    };
    
    let totalScore = 0;
    let scoredCount = 0;
    
    rubrics.forEach(rubric => {
      const band = getScoreBand(rubric.totalScore);
      scoreBandDistribution[band]++;
      totalScore += rubric.totalScore;
      scoredCount++;
    });
    
    const averageQualityScore = scoredCount > 0 ? totalScore / scoredCount : 0;
    
    // Defence stats
    const defencesScheduled = records.filter(r => 
      r.defenceStatus === 'scheduled' || r.defenceStatus === 'completed' || 
      r.defenceStatus === 'passed' || r.defenceStatus === 'conditional'
    ).length;
    
    const defencesPassed = records.filter(r => r.defenceDecision === 'passed').length;
    const defencesConditional = records.filter(r => r.defenceDecision === 'conditional').length;
    const defencePassRate = defencesScheduled > 0 ? defencesPassed / defencesScheduled : 0;
    
    // Market readiness
    const marketReadyPrototypes = records.filter(r => r.marketReady).length;
    const marketReadinessRate = records.length > 0 ? marketReadyPrototypes / records.length : 0;
    
    // Pricing
    const recordsWithPricing = records.filter(r => r.valuationClaim && r.valuationClaim > 0);
    const totalValuationClaimed = recordsWithPricing.reduce((sum, r) => sum + (r.valuationClaim || 0), 0);
    const averageValuationClaim = recordsWithPricing.length > 0 
      ? totalValuationClaimed / recordsWithPricing.length 
      : 0;
    
    const recordsWithFloor = records.filter(r => r.floorPrice && r.floorPrice > 0);
    const averageFloorPrice = recordsWithFloor.length > 0
      ? recordsWithFloor.reduce((sum, r) => sum + (r.floorPrice || 0), 0) / recordsWithFloor.length
      : 0;
    
    const claimToFloorRatio = averageFloorPrice > 0 ? averageValuationClaim / averageFloorPrice : 0;
    
    // By programme
    const byProgramme = this.calculateByProgramme(worksheets, records, rubrics);
    
    // Weekly trends (last 8 weeks)
    const weeklyCompletions = this.calculateWeeklyTrend(worksheets, 'completion');
    const weeklyDefences = this.calculateWeeklyTrend(records, 'defence');
    
    return {
      totalWorksheets,
      worksheetsInProgress,
      worksheetsComplete,
      completionRate,
      scoreBandDistribution,
      averageQualityScore,
      defencesScheduled,
      defencesPassed,
      defencesConditional,
      defencePassRate,
      marketReadyPrototypes,
      marketReadinessRate,
      totalValuationClaimed,
      averageValuationClaim,
      averageFloorPrice,
      claimToFloorRatio,
      byProgramme,
      weeklyCompletions,
      weeklyDefences
    };
  }
  
  /**
   * Calculate metrics grouped by programme
   */
  private calculateByProgramme(
    worksheets: ValuationWorksheet[],
    records: ValuationArchitectureRecord[],
    rubrics: QualityRubric[]
  ): Record<Programme, ProgrammeMetrics> {
    
    const programmes: Programme[] = [
      'stemgeneers', 'silk-stilettos', 'techreneurs', 'pageturners',
      'kaywanas-court', 'gtech-casters', 'trubble-n-bass', 'bright-sparks',
      'auntie-anansis-kitchen'
    ];
    
    const result: Record<Programme, ProgrammeMetrics> = {} as Record<Programme, ProgrammeMetrics>;
    
    programmes.forEach(programme => {
      const programmeWorksheets = worksheets.filter(w => w.meta.programme === programme);
      const programmeRubrics = rubrics.filter(r => {
        const ws = worksheets.find(w => w.id === r.worksheetId);
        return ws?.meta.programme === programme;
      });
      
      const complete = programmeWorksheets.filter(w => w.status === 'approved').length;
      const totalScore = programmeRubrics.reduce((sum, r) => sum + r.totalScore, 0);
      
      // Find market-ready by matching worksheet IDs
      const programmeWorksheetIds = new Set(programmeWorksheets.map(w => w.id));
      const marketReadyCount = records.filter(r => 
        r.marketReady && r.worksheetId && programmeWorksheetIds.has(r.worksheetId)
      ).length;
      
      const totalValueClaimed = programmeWorksheets.reduce((sum, w) => 
        sum + (w.authority.valuationClaim || 0), 0
      );
      
      result[programme] = {
        programme,
        totalWorksheets: programmeWorksheets.length,
        completionRate: programmeWorksheets.length > 0 ? complete / programmeWorksheets.length : 0,
        averageScore: programmeRubrics.length > 0 ? totalScore / programmeRubrics.length : 0,
        marketReadyCount,
        totalValueClaimed
      };
    });
    
    return result;
  }
  
  /**
   * Calculate weekly trend data
   */
  private calculateWeeklyTrend(
    items: (ValuationWorksheet | ValuationArchitectureRecord)[],
    type: 'completion' | 'defence'
  ): WeeklyMetric[] {
    const weeks: WeeklyMetric[] = [];
    const now = new Date();
    
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      let count = 0;
      
      if (type === 'completion') {
        count = (items as ValuationWorksheet[]).filter(w => {
          const updated = new Date(w.updatedAt);
          return w.status === 'approved' && updated >= weekStart && updated < weekEnd;
        }).length;
      } else {
        count = (items as ValuationArchitectureRecord[]).filter(r => {
          if (!r.defenceDate) return false;
          const defenceDate = new Date(r.defenceDate);
          return r.defenceStatus === 'passed' && defenceDate >= weekStart && defenceDate < weekEnd;
        }).length;
      }
      
      weeks.push({
        weekStart,
        count,
        label: weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      });
    }
    
    return weeks;
  }
  
  /**
   * Calculate individual creator progress
   */
  calculateCreatorProgress(
    creatorId: string,
    creatorName: string,
    worksheets: ValuationWorksheet[],
    records: ValuationArchitectureRecord[],
    rubrics: QualityRubric[]
  ): CreatorValuationProgress {
    
    const creatorWorksheets = worksheets.filter(w => w.meta.creatorId === creatorId);
    const creatorRubrics = rubrics.filter(r => r.assessorId === creatorId || 
      creatorWorksheets.some(w => w.id === r.worksheetId)
    );
    
    const worksheetsComplete = creatorWorksheets.filter(w => w.status === 'approved').length;
    
    const scores = creatorRubrics.map(r => r.totalScore);
    const averageScore = scores.length > 0 
      ? scores.reduce((a, b) => a + b, 0) / scores.length 
      : 0;
    
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const highestScoreBand = highestScore > 0 ? getScoreBand(highestScore) : null;
    
    const totalValueClaimed = creatorWorksheets.reduce((sum, w) => 
      sum + (w.authority.valuationClaim || 0), 0
    );
    
    const creatorWorksheetIds = new Set(creatorWorksheets.map(w => w.id));
    const defencesPassed = records.filter(r => 
      r.defenceDecision === 'passed' && r.worksheetId && creatorWorksheetIds.has(r.worksheetId)
    ).length;
    
    const marketReadyCount = records.filter(r => 
      r.marketReady && r.worksheetId && creatorWorksheetIds.has(r.worksheetId)
    ).length;
    
    return {
      creatorId,
      creatorName,
      worksheetsStarted: creatorWorksheets.length,
      worksheetsComplete,
      averageScore,
      highestScoreBand,
      totalValueClaimed,
      defencesPassed,
      marketReadyCount
    };
  }
  
  /**
   * Generate leaderboard data
   */
  generateLeaderboard(
    worksheets: ValuationWorksheet[],
    records: ValuationArchitectureRecord[],
    rubrics: QualityRubric[],
    limit: number = 5
  ): ValuationLeaderboard {
    
    // Top by score
    const scoredWorksheets = worksheets
      .map(w => {
        const rubric = rubrics.find(r => r.worksheetId === w.id);
        return { worksheet: w, score: rubric?.totalScore || 0 };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    
    const topByScore: LeaderboardEntry[] = scoredWorksheets.map(item => ({
      creatorId: item.worksheet.meta.creatorId,
      creatorName: item.worksheet.meta.creatorName,
      programme: item.worksheet.meta.programme,
      prototypeTitle: item.worksheet.meta.prototypeTitle,
      metric: item.score,
      metricLabel: `${item.score}/35`,
      achievedAt: item.worksheet.updatedAt
    }));
    
    // Top by value claimed
    const topByValue: LeaderboardEntry[] = worksheets
      .filter(w => w.authority.valuationClaim > 0)
      .sort((a, b) => b.authority.valuationClaim - a.authority.valuationClaim)
      .slice(0, limit)
      .map(w => ({
        creatorId: w.meta.creatorId,
        creatorName: w.meta.creatorName,
        programme: w.meta.programme,
        prototypeTitle: w.meta.prototypeTitle,
        metric: w.authority.valuationClaim,
        metricLabel: `£${w.authority.valuationClaim.toLocaleString()}`,
        achievedAt: w.updatedAt
      }));
    
    // Top by volume (most worksheets completed)
    const creatorCounts = new Map<string, { count: number; name: string; latest: ValuationWorksheet }>();
    worksheets
      .filter(w => w.status === 'approved')
      .forEach(w => {
        const existing = creatorCounts.get(w.meta.creatorId);
        if (existing) {
          existing.count++;
          if (w.updatedAt > existing.latest.updatedAt) {
            existing.latest = w;
          }
        } else {
          creatorCounts.set(w.meta.creatorId, { count: 1, name: w.meta.creatorName, latest: w });
        }
      });
    
    const topByVolume: LeaderboardEntry[] = Array.from(creatorCounts.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, limit)
      .map(([creatorId, data]) => ({
        creatorId,
        creatorName: data.name,
        programme: data.latest.meta.programme,
        prototypeTitle: `${data.count} worksheets`,
        metric: data.count,
        metricLabel: `${data.count} complete`,
        achievedAt: data.latest.updatedAt
      }));
    
    // Recent defence passes
    const recentDefencePasses: LeaderboardEntry[] = records
      .filter(r => r.defenceDecision === 'passed' && r.defenceDate)
      .sort((a, b) => new Date(b.defenceDate!).getTime() - new Date(a.defenceDate!).getTime())
      .slice(0, limit)
      .map(r => {
        const worksheet = worksheets.find(w => w.id === r.worksheetId);
        return {
          creatorId: worksheet?.meta.creatorId || 'unknown',
          creatorName: worksheet?.meta.creatorName || 'Unknown',
          programme: worksheet?.meta.programme || 'stemgeneers',
          prototypeTitle: worksheet?.meta.prototypeTitle || 'Unknown',
          metric: r.combinedScore || 0,
          metricLabel: 'Defence Passed',
          achievedAt: r.defenceDate!
        };
      });
    
    return {
      topByScore,
      topByValue,
      topByVolume,
      recentDefencePasses
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const valuationMetrics = new ValuationMetricsService();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format currency for display
 */
export const formatValuation = (amount: number): string => {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

/**
 * Format percentage for display
 */
export const formatPercentage = (ratio: number): string => {
  return `${Math.round(ratio * 100)}%`;
};

/**
 * Get colour for score band (for charts)
 */
export const getScoreBandColor = (band: ScoreBand): string => {
  const colors: Record<ScoreBand, string> = {
    'market-ready': '#28A745',
    'nearly-there': '#2E7D32',
    'development': '#B7791F',
    'early-stage': '#C62828'
  };
  return colors[band];
};

/**
 * Calculate overall ecosystem health score
 */
export const calculateEcosystemHealth = (summary: ValuationMetricsSummary): number => {
  let score = 0;
  
  // Completion rate contributes 25 points
  score += summary.completionRate * 25;
  
  // Defence pass rate contributes 25 points
  score += summary.defencePassRate * 25;
  
  // Market readiness contributes 25 points
  score += summary.marketReadinessRate * 25;
  
  // Quality distribution contributes 25 points
  const qualityScore = (
    (summary.scoreBandDistribution['market-ready'] * 4) +
    (summary.scoreBandDistribution['nearly-there'] * 3) +
    (summary.scoreBandDistribution['development'] * 2) +
    (summary.scoreBandDistribution['early-stage'] * 1)
  );
  const maxQualityScore = summary.totalWorksheets * 4;
  if (maxQualityScore > 0) {
    score += (qualityScore / maxQualityScore) * 25;
  }
  
  return Math.round(score);
};
