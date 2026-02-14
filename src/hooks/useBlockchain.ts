/**
 * USE BLOCKCHAIN HOOK
 * 
 * Manages blockchain/treasury data for transparency features.
 * Provides community contribution tracking and impact metrics.
 * 
 * Note: This uses mock data initially. The actual blockchain
 * integration can be added later without changing the interface.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface TreasurySummary {
  totalContributions: number;
  workshopHoursFunded: number;
  participantsReached: number;
  contributorsCount: number;
  thisMonth: number;
  lastMonth: number;
  growthPercent: number;
}

export interface CommunityContribution {
  id: string;
  saleId: string;
  amount: number;
  contributorType: 'creator' | 'buyer';
  contributorId: string;
  createdAt: string;
  impactStatement: string;
}

export interface ImpactMetrics {
  totalWorkshopHours: number;
  totalParticipants: number;
  programmesSupported: string[];
  equipmentPurchased: string[];
  venuesBooked: number;
}

export interface UseBlockchainReturn {
  treasury: TreasurySummary | null;
  recentContributions: CommunityContribution[];
  impactMetrics: ImpactMetrics | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  calculateImpact: (amount: number) => ImpactEstimate;
  getCreatorContribution: (creatorId: string) => number;
}

export interface ImpactEstimate {
  workshopMinutes: number;
  participantsReached: number;
  statement: string;
}

// ============================================================
// CONSTANTS
// ============================================================

const WORKSHOP_COST_PER_HOUR = 15;
const PARTICIPANTS_PER_WORKSHOP = 12;

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_TREASURY: TreasurySummary = {
  totalContributions: 12450.75,
  workshopHoursFunded: 830,
  participantsReached: 9960,
  contributorsCount: 156,
  thisMonth: 1250.50,
  lastMonth: 980.25,
  growthPercent: 27.6
};

const MOCK_CONTRIBUTIONS: CommunityContribution[] = [
  {
    id: 'contrib-001',
    saleId: 'sale-123',
    amount: 25.00,
    contributorType: 'buyer',
    contributorId: 'buyer-456',
    createdAt: '2024-11-15T10:30:00Z',
    impactStatement: '1.7 hours of youth workshops'
  },
  {
    id: 'contrib-002',
    saleId: 'sale-124',
    amount: 12.50,
    contributorType: 'buyer',
    contributorId: 'buyer-789',
    createdAt: '2024-11-14T15:45:00Z',
    impactStatement: '50 minutes of creative education'
  },
  {
    id: 'contrib-003',
    saleId: 'sale-125',
    amount: 37.50,
    contributorType: 'buyer',
    contributorId: 'buyer-012',
    createdAt: '2024-11-13T09:15:00Z',
    impactStatement: '2.5 hours reaching 30 young people'
  }
];

const MOCK_IMPACT: ImpactMetrics = {
  totalWorkshopHours: 830,
  totalParticipants: 9960,
  programmesSupported: ['Trubble n Bass', 'Kaywana\'s Court', 'PageTurners', 'G-Tech Casters', 'TECHreneurs'],
  equipmentPurchased: ['MIDI Controllers x3', 'Microphones x5', 'Lighting Kit', 'Cameras x2'],
  venuesBooked: 45
};

// ============================================================
// HOOK
// ============================================================

export function useBlockchain(): UseBlockchainReturn {
  const [treasury, setTreasury] = useState<TreasurySummary | null>(null);
  const [recentContributions, setRecentContributions] = useState<CommunityContribution[]>([]);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all blockchain/treasury data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API/blockchain calls
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setTreasury(MOCK_TREASURY);
      setRecentContributions(MOCK_CONTRIBUTIONS);
      setImpactMetrics(MOCK_IMPACT);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load treasury data');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Calculate impact for a given contribution amount
  const calculateImpact = useCallback((amount: number): ImpactEstimate => {
    const workshopMinutes = Math.round((amount / WORKSHOP_COST_PER_HOUR) * 60);
    const workshopHours = workshopMinutes / 60;
    const participantsReached = Math.round(workshopHours * PARTICIPANTS_PER_WORKSHOP);
    
    let statement: string;
    if (workshopMinutes < 30) {
      statement = `${workshopMinutes} minutes of free creative education`;
    } else if (workshopMinutes < 120) {
      statement = `${workshopMinutes} minutes of free youth workshops`;
    } else {
      const hours = workshopHours.toFixed(1);
      statement = `${hours} hours of free workshops reaching ${participantsReached} young people`;
    }
    
    return {
      workshopMinutes,
      participantsReached,
      statement
    };
  }, []);
  
  // Get total contribution for a specific creator
  const getCreatorContribution = useCallback((creatorId: string): number => {
    // TODO: Replace with actual lookup
    // This would sum all contributions linked to sales by this creator
    return recentContributions
      .filter(c => c.contributorId === creatorId)
      .reduce((sum, c) => sum + c.amount, 0);
  }, [recentContributions]);
  
  return {
    treasury,
    recentContributions,
    impactMetrics,
    loading,
    error,
    refresh: fetchData,
    calculateImpact,
    getCreatorContribution
  };
}

export default useBlockchain;