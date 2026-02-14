/**
 * useRevenueShare Hook
 * Wembley Wonders CIC
 * 
 * Manages the 55/25/20 revenue share model.
 * Tracks sales, calculates splits, and manages payouts.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface RevenueSplit {
  creator: number;      // 55%
  community: number;    // 25%
  operations: number;   // 20%
}

export interface Sale {
  id: string;
  prototypeId: string;
  creatorId: string;
  
  // Transaction
  grossAmount: number;
  netAmount: number;
  platformFee: number;
  paymentProcessor: string;
  
  // Split
  creatorShare: number;
  communityShare: number;
  operationsShare: number;
  
  // Status
  status: 'pending' | 'completed' | 'refunded' | 'disputed';
  paidToCreator: boolean;
  paidAt?: string;
  
  // Metadata
  buyerType: 'individual' | 'business' | 'organization';
  location?: string;
  createdAt: string;
}

export interface RevenueStats {
  totalGross: number;
  totalNet: number;
  creatorEarnings: number;
  communityContribution: number;
  operationsContribution: number;
  salesCount: number;
  averageSaleValue: number;
  topProgramme: string;
}

export interface UseRevenueShareReturn {
  sales: Sale[];
  stats: RevenueStats;
  loading: boolean;
  error: string | null;
  
  // Sales
  recordSale: (sale: Omit<Sale, 'id' | 'creatorShare' | 'communityShare' | 'operationsShare' | 'createdAt'>) => Promise<string | null>;
  processPayout: (saleId: string) => Promise<boolean>;
  refundSale: (saleId: string, reason: string) => Promise<boolean>;
  
  // Calculations
  calculateSplit: (grossAmount: number) => RevenueSplit;
  getCreatorBalance: () => number;
  getPendingPayouts: () => Sale[];
  
  // Reporting
  getStatsByPeriod: (startDate: string, endDate: string) => RevenueStats;
  getStatsByProgramme: (programme: string) => RevenueStats;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const REVENUE_SPLIT = {
  creator: 0.55,
  community: 0.25,
  operations: 0.20
};

const PLATFORM_FEE_RATE = 0.029; // 2.9% payment processing

// ============================================================================
// HOOK
// ============================================================================

export function useRevenueShare(creatorId?: string): UseRevenueShareReturn {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate stats
  const calculateStats = useCallback((salesData: Sale[]): RevenueStats => {
    const completedSales = salesData.filter(s => s.status === 'completed');
    
    const totalGross = completedSales.reduce((sum, s) => sum + s.grossAmount, 0);
    const totalNet = completedSales.reduce((sum, s) => sum + s.netAmount, 0);
    const creatorEarnings = completedSales.reduce((sum, s) => sum + s.creatorShare, 0);
    const communityContribution = completedSales.reduce((sum, s) => sum + s.communityShare, 0);
    const operationsContribution = completedSales.reduce((sum, s) => sum + s.operationsShare, 0);
    
    // Find top programme (simplified)
    const topProgramme = 'STEMgeneers'; // TODO: Calculate from sales data
    
    return {
      totalGross,
      totalNet,
      creatorEarnings,
      communityContribution,
      operationsContribution,
      salesCount: completedSales.length,
      averageSaleValue: completedSales.length > 0 ? totalGross / completedSales.length : 0,
      topProgramme
    };
  }, []);

  const [stats, setStats] = useState<RevenueStats>(() => calculateStats([]));

  // Fetch sales
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      setSales([]);
      setStats(calculateStats([]));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sales');
    } finally {
      setLoading(false);
    }
  }, [creatorId, calculateStats]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Calculate split
  const calculateSplit = useCallback((grossAmount: number): RevenueSplit => {
    const platformFee = grossAmount * PLATFORM_FEE_RATE;
    const netAmount = grossAmount - platformFee;
    
    return {
      creator: Math.round(netAmount * REVENUE_SPLIT.creator * 100) / 100,
      community: Math.round(netAmount * REVENUE_SPLIT.community * 100) / 100,
      operations: Math.round(netAmount * REVENUE_SPLIT.operations * 100) / 100
    };
  }, []);

  // Record sale
  const recordSale = useCallback(async (
    sale: Omit<Sale, 'id' | 'creatorShare' | 'communityShare' | 'operationsShare' | 'createdAt'>
  ): Promise<string | null> => {
    try {
      const split = calculateSplit(sale.grossAmount);
      const newId = `sale-${Date.now()}`;
      
      const newSale: Sale = {
        ...sale,
        id: newId,
        creatorShare: split.creator,
        communityShare: split.community,
        operationsShare: split.operations,
        createdAt: new Date().toISOString()
      };
      
      setSales(prev => {
        const updated = [...prev, newSale];
        setStats(calculateStats(updated));
        return updated;
      });
      
      return newId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record sale');
      return null;
    }
  }, [calculateSplit, calculateStats]);

  // Process payout
  const processPayout = useCallback(async (saleId: string): Promise<boolean> => {
    setSales(prev => {
      const updated = prev.map(s => 
        s.id === saleId 
          ? { ...s, paidToCreator: true, paidAt: new Date().toISOString() }
          : s
      );
      setStats(calculateStats(updated));
      return updated;
    });
    
    return true;
  }, [calculateStats]);

  // Refund sale
  const refundSale = useCallback(async (saleId: string, reason: string): Promise<boolean> => {
    console.log(`[Revenue] Refunding sale ${saleId}: ${reason}`);
    
    setSales(prev => {
      const updated = prev.map(s => 
        s.id === saleId ? { ...s, status: 'refunded' as const } : s
      );
      setStats(calculateStats(updated));
      return updated;
    });
    
    return true;
  }, [calculateStats]);

  // Get creator balance
  const getCreatorBalance = useCallback((): number => {
    return sales
      .filter(s => s.status === 'completed' && !s.paidToCreator)
      .reduce((sum, s) => sum + s.creatorShare, 0);
  }, [sales]);

  // Get pending payouts
  const getPendingPayouts = useCallback((): Sale[] => {
    return sales.filter(s => s.status === 'completed' && !s.paidToCreator);
  }, [sales]);

  // Get stats by period
  const getStatsByPeriod = useCallback((startDate: string, endDate: string): RevenueStats => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    
    const periodSales = sales.filter(s => {
      const saleDate = new Date(s.createdAt).getTime();
      return saleDate >= start && saleDate <= end;
    });
    
    return calculateStats(periodSales);
  }, [sales, calculateStats]);

  // Get stats by programme
  const getStatsByProgramme = useCallback((programme: string): RevenueStats => {
    // TODO: Filter by programme when we have that data
    return calculateStats(sales);
  }, [sales, calculateStats]);

  return {
    sales,
    stats,
    loading,
    error,
    recordSale,
    processPayout,
    refundSale,
    calculateSplit,
    getCreatorBalance,
    getPendingPayouts,
    getStatsByPeriod,
    getStatsByProgramme,
    refresh: fetchSales
  };
}

export default useRevenueShare;
