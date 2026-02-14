// src/hooks/useMetrics.ts
// React hook for accessing Creator Factory metrics

import { useState, useEffect, useCallback } from 'react';
import { metricsService } from '../services/MetricsService';
import { 
  handleMetricsQuery, 
  getContextualMetrics,
  generateDailySnapshot,
  generateWeeklyReport,
  generateMonthlyReport,
  MetricsQueryResult,
  ROVMetricsContext
} from '../services/MayaMetricsIntegration';
import {
  DashboardMetrics,
  GoalProgress,
  ReportType,
  GeneratedReport,
  StrategicGoals
} from '../types/metrics';

// ============================================
// MAIN METRICS HOOK
// ============================================

export interface UseMetricsReturn {
  // Data
  metrics: DashboardMetrics | null;
  goals: GoalProgress[];
  strategicGoals: StrategicGoals | null;
  createdCreators: {
    count: number;
    totalMonthlyIncome: number;
    avgIncome: number;
  } | null;
  
  // State
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  refresh: () => Promise<void>;
  generateReport: (type: ReportType) => GeneratedReport;
  askMetrics: (query: string) => MetricsQueryResult;
  getContextual: (context: ROVMetricsContext) => string;
  
  // Scheduled reports
  getDailySnapshot: () => string;
  getWeeklyReport: () => string;
  getMonthlyReport: () => string;
  
  // Goal switching
  selectedYear: 1 | 3 | 5;
  setSelectedYear: (year: 1 | 3 | 5) => void;
}

export function useMetrics(): UseMetricsReturn {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [goals, setGoals] = useState<GoalProgress[]>([]);
  const [strategicGoals, setStrategicGoals] = useState<StrategicGoals | null>(null);
  const [createdCreators, setCreatedCreators] = useState<{
    count: number;
    totalMonthlyIncome: number;
    avgIncome: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<1 | 3 | 5>(1);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await metricsService.refreshData();
      setMetrics(metricsService.getDashboardMetrics());
      setGoals(metricsService.getGoalProgress(selectedYear));
      setStrategicGoals(metricsService.getStrategicGoals());
      setCreatedCreators(metricsService.getCreatedCreatorsEarning());
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    // Update goals when year changes
    if (metrics) {
      setGoals(metricsService.getGoalProgress(selectedYear));
    }
  }, [selectedYear, metrics]);

  const generateReport = useCallback((type: ReportType): GeneratedReport => {
    return metricsService.generateReport({ type, format: 'summary' });
  }, []);

  const askMetrics = useCallback((query: string): MetricsQueryResult => {
    return handleMetricsQuery(query);
  }, []);

  const getContextual = useCallback((context: ROVMetricsContext): string => {
    return getContextualMetrics(context);
  }, []);

  return {
    metrics,
    goals,
    strategicGoals,
    createdCreators,
    loading,
    error,
    lastUpdated,
    refresh,
    generateReport,
    askMetrics,
    getContextual,
    getDailySnapshot: generateDailySnapshot,
    getWeeklyReport: generateWeeklyReport,
    getMonthlyReport: generateMonthlyReport,
    selectedYear,
    setSelectedYear
  };
}

// ============================================
// MAYA METRICS HOOK (For Maya/ROV integration)
// ============================================

export interface UseMayaMetricsReturn {
  handleQuery: (query: string) => MetricsQueryResult;
  getQuickStat: (stat: string) => string;
  getMission: () => string;
  getContextualInfo: (context: ROVMetricsContext) => string;
  isMetricsQuery: (query: string) => boolean;
}

export function useMayaMetrics(): UseMayaMetricsReturn {
  const handleQuery = useCallback((query: string): MetricsQueryResult => {
    return handleMetricsQuery(query);
  }, []);

  const getQuickStat = useCallback((stat: string): string => {
    return metricsService.getQuickStat(stat);
  }, []);

  const getMission = useCallback((): string => {
    return metricsService.getMissionStatement();
  }, []);

  const getContextualInfo = useCallback((context: ROVMetricsContext): string => {
    return getContextualMetrics(context);
  }, []);

  const isMetricsQuery = useCallback((query: string): boolean => {
    const metricsKeywords = [
      'creator', 'earning', 'income', 'revenue', 'gmv', 'goal', 'target',
      'funnel', 'journey', 'geographic', 'brent', 'local', 'competitive',
      'moat', 'conversion', 'retention', 'metric', 'stat', 'report',
      'summary', 'dashboard', 'how many', 'how much', 'mission'
    ];
    
    const normalizedQuery = query.toLowerCase();
    return metricsKeywords.some(keyword => normalizedQuery.includes(keyword));
  }, []);

  return {
    handleQuery,
    getQuickStat,
    getMission,
    getContextualInfo,
    isMetricsQuery
  };
}

// ============================================
// QUICK METRICS DISPLAY HOOK
// ============================================

export interface QuickMetrics {
  totalCreators: number;
  creatorsEarning: number;
  platformGMV: number;
  brentPercentage: number;
  createdFromZero: number;
}

export function useQuickMetrics(): {
  metrics: QuickMetrics | null;
  loading: boolean;
} {
  const [metrics, setMetrics] = useState<QuickMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuickMetrics = async () => {
      await metricsService.refreshData();
      const full = metricsService.getDashboardMetrics();
      const created = metricsService.getCreatedCreatorsEarning();
      
      setMetrics({
        totalCreators: full.totalCreators,
        creatorsEarning: full.creatorsNowEarning,
        platformGMV: full.totalPlatformGMV,
        brentPercentage: Math.round(full.brentPercentage),
        createdFromZero: created.count
      });
      setLoading(false);
    };

    loadQuickMetrics();
  }, []);

  return { metrics, loading };
}

export default useMetrics;