/**
 * useIPStatus Hook
 * Wembley Wonders CIC
 * 
 * Tracks intellectual property status across the prototype lifecycle.
 * Manages IP stages from idea to protected asset.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type IPStage = 
  | 'idea'
  | 'documented'
  | 'disclosed'
  | 'prior-art-searched'
  | 'patent-assessment'
  | 'protection-strategy'
  | 'filing-prepared'
  | 'filed'
  | 'pending'
  | 'granted'
  | 'active';

export type ProtectionType = 
  | 'none'
  | 'trade-secret'
  | 'copyright'
  | 'trademark'
  | 'design-right'
  | 'patent'
  | 'utility-model';

export interface IPStatus {
  id: string;
  prototypeId: string;
  
  // Current State
  stage: IPStage;
  protectionType: ProtectionType;
  protectionStrategy: string;
  
  // Timeline
  stageHistory: IPStageEvent[];
  estimatedNextStage?: string;
  
  // Assessment
  patentabilityScore?: number;
  noveltyScore?: number;
  commercialScore?: number;
  overallScore?: number;
  
  // Protection Details
  filingNumber?: string;
  filingDate?: string;
  grantDate?: string;
  expiryDate?: string;
  
  // Costs
  estimatedCosts: IPCosts;
  actualCosts: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface IPStageEvent {
  stage: IPStage;
  enteredAt: string;
  completedAt?: string;
  notes?: string;
  completedBy?: string;
}

export interface IPCosts {
  search: number;
  filing: number;
  prosecution: number;
  maintenance: number;
  total: number;
}

export interface UseIPStatusReturn {
  status: IPStatus | null;
  loading: boolean;
  error: string | null;
  
  // Stage Management
  advanceStage: (notes?: string) => Promise<boolean>;
  revertStage: (reason: string) => Promise<boolean>;
  getStageProgress: () => { current: number; total: number; percentage: number };
  
  // Assessment
  updateAssessment: (scores: Partial<Pick<IPStatus, 'patentabilityScore' | 'noveltyScore' | 'commercialScore'>>) => Promise<boolean>;
  
  // Protection
  setProtectionType: (type: ProtectionType, strategy: string) => Promise<boolean>;
  recordFiling: (filingNumber: string, filingDate: string) => Promise<boolean>;
  recordGrant: (grantDate: string, expiryDate: string) => Promise<boolean>;
  
  // Costs
  updateCosts: (costs: Partial<IPCosts>) => Promise<boolean>;
  recordExpense: (amount: number, description: string) => Promise<boolean>;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const IP_STAGES: IPStage[] = [
  'idea',
  'documented',
  'disclosed',
  'prior-art-searched',
  'patent-assessment',
  'protection-strategy',
  'filing-prepared',
  'filed',
  'pending',
  'granted',
  'active'
];

const ESTIMATED_COSTS: Record<ProtectionType, IPCosts> = {
  'none': { search: 0, filing: 0, prosecution: 0, maintenance: 0, total: 0 },
  'trade-secret': { search: 0, filing: 0, prosecution: 0, maintenance: 100, total: 100 },
  'copyright': { search: 0, filing: 45, prosecution: 0, maintenance: 0, total: 45 },
  'trademark': { search: 200, filing: 170, prosecution: 500, maintenance: 200, total: 1070 },
  'design-right': { search: 150, filing: 60, prosecution: 200, maintenance: 0, total: 410 },
  'patent': { search: 500, filing: 310, prosecution: 2000, maintenance: 500, total: 3310 },
  'utility-model': { search: 300, filing: 200, prosecution: 500, maintenance: 200, total: 1200 }
};

// ============================================================================
// HOOK
// ============================================================================

export function useIPStatus(prototypeId: string): UseIPStatusReturn {
  const [status, setStatus] = useState<IPStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch IP status
  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setStatus({
        id: `ip-${prototypeId}`,
        prototypeId,
        stage: 'idea',
        protectionType: 'none',
        protectionStrategy: '',
        stageHistory: [{
          stage: 'idea',
          enteredAt: new Date().toISOString()
        }],
        estimatedCosts: ESTIMATED_COSTS['none'],
        actualCosts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load IP status');
    } finally {
      setLoading(false);
    }
  }, [prototypeId]);

  useEffect(() => {
    if (prototypeId) {
      fetchStatus();
    }
  }, [prototypeId, fetchStatus]);

  // Advance to next stage
  const advanceStage = useCallback(async (notes?: string): Promise<boolean> => {
    if (!status) return false;
    
    const currentIndex = IP_STAGES.indexOf(status.stage);
    if (currentIndex >= IP_STAGES.length - 1) {
      setError('Already at final stage');
      return false;
    }
    
    const nextStage = IP_STAGES[currentIndex + 1];
    const now = new Date().toISOString();
    
    setStatus(prev => {
      if (!prev) return null;
      
      // Complete current stage
      const updatedHistory = prev.stageHistory.map((event, idx) => 
        idx === prev.stageHistory.length - 1
          ? { ...event, completedAt: now }
          : event
      );
      
      // Add new stage
      updatedHistory.push({
        stage: nextStage,
        enteredAt: now,
        notes
      });
      
      return {
        ...prev,
        stage: nextStage,
        stageHistory: updatedHistory,
        updatedAt: now
      };
    });
    
    return true;
  }, [status]);

  // Revert to previous stage
  const revertStage = useCallback(async (reason: string): Promise<boolean> => {
    if (!status) return false;
    
    const currentIndex = IP_STAGES.indexOf(status.stage);
    if (currentIndex <= 0) {
      setError('Already at first stage');
      return false;
    }
    
    const prevStage = IP_STAGES[currentIndex - 1];
    const now = new Date().toISOString();
    
    setStatus(prev => {
      if (!prev) return null;
      
      // Remove current stage entry, add note about reversion
      const updatedHistory = prev.stageHistory.slice(0, -1);
      updatedHistory.push({
        stage: prevStage,
        enteredAt: now,
        notes: `Reverted: ${reason}`
      });
      
      return {
        ...prev,
        stage: prevStage,
        stageHistory: updatedHistory,
        updatedAt: now
      };
    });
    
    return true;
  }, [status]);

  // Get stage progress
  const getStageProgress = useCallback(() => {
    if (!status) return { current: 0, total: IP_STAGES.length, percentage: 0 };
    
    const current = IP_STAGES.indexOf(status.stage) + 1;
    const total = IP_STAGES.length;
    const percentage = Math.round((current / total) * 100);
    
    return { current, total, percentage };
  }, [status]);

  // Update assessment scores
  const updateAssessment = useCallback(async (
    scores: Partial<Pick<IPStatus, 'patentabilityScore' | 'noveltyScore' | 'commercialScore'>>
  ): Promise<boolean> => {
    if (!status) return false;
    
    setStatus(prev => {
      if (!prev) return null;
      
      const updated = { ...prev, ...scores };
      
      // Calculate overall score
      const scoreFields = [updated.patentabilityScore, updated.noveltyScore, updated.commercialScore];
      const validScores = scoreFields.filter((s): s is number => s !== undefined);
      
      if (validScores.length > 0) {
        updated.overallScore = Math.round(
          validScores.reduce((a, b) => a + b, 0) / validScores.length
        );
      }
      
      updated.updatedAt = new Date().toISOString();
      return updated;
    });
    
    return true;
  }, [status]);

  // Set protection type
  const setProtectionType = useCallback(async (
    type: ProtectionType, 
    strategy: string
  ): Promise<boolean> => {
    if (!status) return false;
    
    setStatus(prev => prev ? {
      ...prev,
      protectionType: type,
      protectionStrategy: strategy,
      estimatedCosts: ESTIMATED_COSTS[type],
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [status]);

  // Record filing
  const recordFiling = useCallback(async (
    filingNumber: string, 
    filingDate: string
  ): Promise<boolean> => {
    if (!status) return false;
    
    setStatus(prev => prev ? {
      ...prev,
      filingNumber,
      filingDate,
      stage: 'filed',
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [status]);

  // Record grant
  const recordGrant = useCallback(async (
    grantDate: string, 
    expiryDate: string
  ): Promise<boolean> => {
    if (!status) return false;
    
    setStatus(prev => prev ? {
      ...prev,
      grantDate,
      expiryDate,
      stage: 'granted',
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [status]);

  // Update costs
  const updateCosts = useCallback(async (costs: Partial<IPCosts>): Promise<boolean> => {
    if (!status) return false;
    
    setStatus(prev => {
      if (!prev) return null;
      
      const updatedCosts = { ...prev.estimatedCosts, ...costs };
      updatedCosts.total = 
        updatedCosts.search + 
        updatedCosts.filing + 
        updatedCosts.prosecution + 
        updatedCosts.maintenance;
      
      return {
        ...prev,
        estimatedCosts: updatedCosts,
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, [status]);

  // Record expense
  const recordExpense = useCallback(async (
    amount: number, 
    description: string
  ): Promise<boolean> => {
    if (!status) return false;
    
    console.log(`[IP] Expense recorded: £${amount} - ${description}`);
    
    setStatus(prev => prev ? {
      ...prev,
      actualCosts: prev.actualCosts + amount,
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [status]);

  return {
    status,
    loading,
    error,
    advanceStage,
    revertStage,
    getStageProgress,
    updateAssessment,
    setProtectionType,
    recordFiling,
    recordGrant,
    updateCosts,
    recordExpense,
    refresh: fetchStatus
  };
}

export default useIPStatus;
