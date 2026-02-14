/**
 * USE TOKENS HOOK
 * 
 * Manages WWT token balance, transactions, and redemptions.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import { useState, useEffect, useCallback } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface TokenBalance {
  available: number;
  pending: number;
  lifetime: number;
}

export interface TokenTransaction {
  id: string;
  type: 'earn' | 'spend' | 'pending';
  amount: number;
  description: string;
  category: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface RedemptionOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'workshop' | 'equipment' | 'service' | 'priority';
  available: boolean;
}

export interface UseTokensReturn {
  balance: TokenBalance;
  transactions: TokenTransaction[];
  redemptionOptions: RedemptionOption[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  redeem: (optionId: string) => Promise<boolean>;
  getTransactionHistory: (limit?: number) => TokenTransaction[];
}

// ============================================================
// CONSTANTS
// ============================================================

export const TOKEN_EARN_RATES = {
  programmeCompletion: 100,
  workshopAttendance: 15,
  saleBonus: 0.05, // 5% of sale value
  volunteerHour: 20,
  referral: 50,
  communityContribution: 25,
  firstSale: 50,
  reviewReceived: 10
};

export const REDEMPTION_OPTIONS: RedemptionOption[] = [
  {
    id: 'workshop-discount-10',
    name: '£1 Workshop Discount',
    description: 'Get £1 off any WW workshop',
    cost: 10,
    category: 'workshop',
    available: true
  },
  {
    id: 'workshop-discount-50',
    name: '£5 Workshop Discount',
    description: 'Get £5 off any WW workshop',
    cost: 50,
    category: 'workshop',
    available: true
  },
  {
    id: 'equipment-rental',
    name: '1 Hour Equipment Rental',
    description: 'Free equipment rental at the studio',
    cost: 25,
    category: 'equipment',
    available: true
  },
  {
    id: 'priority-booking',
    name: 'Priority Booking',
    description: 'Book workshops before general release',
    cost: 30,
    category: 'priority',
    available: true
  },
  {
    id: 'mentor-session',
    name: '30min Mentor Session',
    description: 'One-on-one with a programme mentor',
    cost: 75,
    category: 'service',
    available: true
  },
  {
    id: 'marketplace-boost',
    name: 'Marketplace Feature',
    description: 'Featured placement for 1 week',
    cost: 100,
    category: 'service',
    available: true
  }
];

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_TRANSACTIONS: TokenTransaction[] = [
  {
    id: 'tx-001',
    type: 'earn',
    amount: 50,
    description: 'First sale bonus',
    category: 'milestone',
    createdAt: '2024-11-01T10:00:00Z',
    status: 'completed'
  },
  {
    id: 'tx-002',
    type: 'earn',
    amount: 15,
    description: 'Workshop attendance: Beat Making 101',
    category: 'attendance',
    createdAt: '2024-10-28T14:00:00Z',
    status: 'completed'
  },
  {
    id: 'tx-003',
    type: 'earn',
    amount: 12,
    description: 'Sale bonus: Custom Beat Pack',
    category: 'sale',
    createdAt: '2024-11-05T09:30:00Z',
    status: 'completed'
  },
  {
    id: 'tx-004',
    type: 'spend',
    amount: -25,
    description: 'Redeemed: Equipment Rental',
    category: 'redemption',
    createdAt: '2024-11-10T16:00:00Z',
    status: 'completed'
  },
  {
    id: 'tx-005',
    type: 'pending',
    amount: 25,
    description: 'Pending: Community contribution reward',
    category: 'community',
    createdAt: '2024-11-12T00:00:00Z',
    status: 'pending'
  }
];

// ============================================================
// HOOK
// ============================================================

export function useTokens(creatorId?: string): UseTokensReturn {
  const [balance, setBalance] = useState<TokenBalance>({
    available: 0,
    pending: 0,
    lifetime: 0
  });
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate balance from transactions
  const calculateBalance = useCallback((txs: TokenTransaction[]): TokenBalance => {
    let available = 0;
    let pending = 0;
    let lifetime = 0;
    
    txs.forEach(tx => {
      if (tx.status === 'completed') {
        if (tx.type === 'earn') {
          available += tx.amount;
          lifetime += tx.amount;
        } else if (tx.type === 'spend') {
          available += tx.amount; // Already negative
        }
      } else if (tx.status === 'pending') {
        pending += tx.amount;
      }
    });
    
    return { available, pending, lifetime };
  }, []);
  
  // Fetch token data
  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/tokens/${creatorId}`);
      // const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTransactions(MOCK_TRANSACTIONS);
      setBalance(calculateBalance(MOCK_TRANSACTIONS));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tokens');
    } finally {
      setLoading(false);
    }
  }, [creatorId, calculateBalance]);
  
  // Initial fetch
  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);
  
  // Redeem tokens
  const redeem = useCallback(async (optionId: string): Promise<boolean> => {
    const option = REDEMPTION_OPTIONS.find(o => o.id === optionId);
    if (!option) {
      setError('Invalid redemption option');
      return false;
    }
    
    if (balance.available < option.cost) {
      setError('Insufficient tokens');
      return false;
    }
    
    try {
      // TODO: Replace with actual API call
      const newTransaction: TokenTransaction = {
        id: `tx-${Date.now()}`,
        type: 'spend',
        amount: -option.cost,
        description: `Redeemed: ${option.name}`,
        category: 'redemption',
        createdAt: new Date().toISOString(),
        status: 'completed'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(prev => ({
        ...prev,
        available: prev.available - option.cost
      }));
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Redemption failed');
      return false;
    }
  }, [balance.available]);
  
  // Get transaction history
  const getTransactionHistory = useCallback((limit?: number) => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return limit ? sorted.slice(0, limit) : sorted;
  }, [transactions]);
  
  return {
    balance,
    transactions,
    redemptionOptions: REDEMPTION_OPTIONS,
    loading,
    error,
    refresh: fetchTokens,
    redeem,
    getTransactionHistory
  };
}

export default useTokens;