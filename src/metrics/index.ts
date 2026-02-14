// src/metrics/index.ts
// Central exports for the Creator Factory metrics system

// Types
export * from '../types/metrics';

// Services
export { metricsService, default as MetricsService } from '../services/MetricsService';
export { 
  handleMetricsQuery,
  getContextualMetrics,
  generateDailySnapshot,
  generateWeeklyReport,
  generateMonthlyReport
} from '../services/MayaMetricsIntegration';

// Hooks
export { 
  useMetrics,
  useMayaMetrics,
  useQuickMetrics
} from '../hooks/useMetrics';

// Components
export { default as CreatorFactoryDashboard } from '../components/admin/CreatorFactoryDashboard';
export * from './ValuationMetrics';
