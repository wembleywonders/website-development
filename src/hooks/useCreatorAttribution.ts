/**
 * useCreatorAttribution Hook
 * Wembley Wonders CIC
 * 
 * Manages creator attribution for prototypes and IP.
 * Tracks contributions, validates attribution, and handles disputes.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface Contributor {
  id: string;
  name: string;
  role: ContributorRole;
  percentage: number;
  joinedAt: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'disputed';
}

export type ContributorRole = 
  | 'creator'
  | 'co-creator'
  | 'contributor'
  | 'advisor'
  | 'mentor'
  | 'technical-support'
  | 'investor';

export interface Attribution {
  id: string;
  prototypeId: string;
  contributors: Contributor[];
  totalPercentage: number;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
  disputes: AttributionDispute[];
}

export interface AttributionDispute {
  id: string;
  raisedBy: string;
  against: string;
  reason: string;
  status: 'open' | 'under-review' | 'resolved' | 'rejected';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface UseCreatorAttributionReturn {
  attribution: Attribution | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  addContributor: (contributor: Omit<Contributor, 'id' | 'joinedAt' | 'status'>) => Promise<boolean>;
  updateContributor: (id: string, updates: Partial<Contributor>) => Promise<boolean>;
  removeContributor: (id: string) => Promise<boolean>;
  verifyContributor: (id: string) => Promise<boolean>;
  
  // Validation
  validateAttribution: () => { valid: boolean; errors: string[] };
  getContributorShare: (contributorId: string) => number;
  
  // Disputes
  raiseDispute: (against: string, reason: string) => Promise<boolean>;
  resolveDispute: (disputeId: string, resolution: string) => Promise<boolean>;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ROLE_MIN_PERCENTAGE: Record<ContributorRole, number> = {
  'creator': 30,
  'co-creator': 20,
  'contributor': 5,
  'advisor': 2,
  'mentor': 2,
  'technical-support': 5,
  'investor': 0
};

// ============================================================================
// HOOK
// ============================================================================

export function useCreatorAttribution(prototypeId: string): UseCreatorAttributionReturn {
  const [attribution, setAttribution] = useState<Attribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch attribution data
  const fetchAttribution = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock data
      setAttribution({
        id: `attr-${prototypeId}`,
        prototypeId,
        contributors: [
          {
            id: 'creator-1',
            name: 'Primary Creator',
            role: 'creator',
            percentage: 55,
            joinedAt: new Date().toISOString(),
            verifiedAt: new Date().toISOString(),
            status: 'verified'
          }
        ],
        totalPercentage: 55,
        isValid: false, // Not 100% yet
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        disputes: []
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attribution');
    } finally {
      setLoading(false);
    }
  }, [prototypeId]);

  useEffect(() => {
    if (prototypeId) {
      fetchAttribution();
    }
  }, [prototypeId, fetchAttribution]);

  // Add contributor
  const addContributor = useCallback(async (
    contributor: Omit<Contributor, 'id' | 'joinedAt' | 'status'>
  ): Promise<boolean> => {
    if (!attribution) return false;
    
    const newContributor: Contributor = {
      ...contributor,
      id: `contrib-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const newTotal = attribution.totalPercentage + contributor.percentage;
    if (newTotal > 100) {
      setError('Total attribution cannot exceed 100%');
      return false;
    }
    
    setAttribution(prev => prev ? {
      ...prev,
      contributors: [...prev.contributors, newContributor],
      totalPercentage: newTotal,
      isValid: newTotal === 100,
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [attribution]);

  // Update contributor
  const updateContributor = useCallback(async (
    id: string, 
    updates: Partial<Contributor>
  ): Promise<boolean> => {
    if (!attribution) return false;
    
    setAttribution(prev => {
      if (!prev) return null;
      
      const updatedContributors = prev.contributors.map(c => 
        c.id === id ? { ...c, ...updates } : c
      );
      
      const newTotal = updatedContributors.reduce((sum, c) => sum + c.percentage, 0);
      
      return {
        ...prev,
        contributors: updatedContributors,
        totalPercentage: newTotal,
        isValid: newTotal === 100,
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, [attribution]);

  // Remove contributor
  const removeContributor = useCallback(async (id: string): Promise<boolean> => {
    if (!attribution) return false;
    
    const contributor = attribution.contributors.find(c => c.id === id);
    if (!contributor) return false;
    
    // Can't remove verified creators without dispute
    if (contributor.status === 'verified' && contributor.role === 'creator') {
      setError('Cannot remove verified creator. Raise a dispute instead.');
      return false;
    }
    
    setAttribution(prev => {
      if (!prev) return null;
      
      const updatedContributors = prev.contributors.filter(c => c.id !== id);
      const newTotal = updatedContributors.reduce((sum, c) => sum + c.percentage, 0);
      
      return {
        ...prev,
        contributors: updatedContributors,
        totalPercentage: newTotal,
        isValid: newTotal === 100,
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, [attribution]);

  // Verify contributor
  const verifyContributor = useCallback(async (id: string): Promise<boolean> => {
    return updateContributor(id, { 
      status: 'verified', 
      verifiedAt: new Date().toISOString() 
    });
  }, [updateContributor]);

  // Validate attribution
  const validateAttribution = useCallback(() => {
    const errors: string[] = [];
    
    if (!attribution) {
      return { valid: false, errors: ['No attribution data'] };
    }
    
    if (attribution.totalPercentage !== 100) {
      errors.push(`Attribution must total 100% (currently ${attribution.totalPercentage}%)`);
    }
    
    const hasCreator = attribution.contributors.some(c => c.role === 'creator');
    if (!hasCreator) {
      errors.push('At least one creator is required');
    }
    
    attribution.contributors.forEach(c => {
      const minPercentage = ROLE_MIN_PERCENTAGE[c.role];
      if (c.percentage < minPercentage) {
        errors.push(`${c.role} must have at least ${minPercentage}% (${c.name} has ${c.percentage}%)`);
      }
    });
    
    const pendingDisputes = attribution.disputes.filter(d => d.status === 'open');
    if (pendingDisputes.length > 0) {
      errors.push(`${pendingDisputes.length} unresolved dispute(s)`);
    }
    
    return { valid: errors.length === 0, errors };
  }, [attribution]);

  // Get contributor share
  const getContributorShare = useCallback((contributorId: string): number => {
    if (!attribution) return 0;
    const contributor = attribution.contributors.find(c => c.id === contributorId);
    return contributor?.percentage || 0;
  }, [attribution]);

  // Raise dispute
  const raiseDispute = useCallback(async (against: string, reason: string): Promise<boolean> => {
    if (!attribution) return false;
    
    const dispute: AttributionDispute = {
      id: `dispute-${Date.now()}`,
      raisedBy: 'current-user', // TODO: Get from auth
      against,
      reason,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    
    setAttribution(prev => prev ? {
      ...prev,
      disputes: [...prev.disputes, dispute],
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [attribution]);

  // Resolve dispute
  const resolveDispute = useCallback(async (
    disputeId: string, 
    resolution: string
  ): Promise<boolean> => {
    if (!attribution) return false;
    
    setAttribution(prev => {
      if (!prev) return null;
      
      const updatedDisputes = prev.disputes.map(d => 
        d.id === disputeId ? {
          ...d,
          status: 'resolved' as const,
          resolution,
          resolvedAt: new Date().toISOString()
        } : d
      );
      
      return {
        ...prev,
        disputes: updatedDisputes,
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, [attribution]);

  return {
    attribution,
    loading,
    error,
    addContributor,
    updateContributor,
    removeContributor,
    verifyContributor,
    validateAttribution,
    getContributorShare,
    raiseDispute,
    resolveDispute,
    refresh: fetchAttribution
  };
}

export default useCreatorAttribution;
