/**
 * useInventionDisclosure Hook
 * Wembley Wonders CIC
 * 
 * Manages invention disclosure workflow for IP protection.
 * Guides creators through documenting their innovations.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type DisclosureStatus = 
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'patent-pending';

export interface InventionDisclosure {
  id: string;
  prototypeId: string;
  creatorId: string;
  
  // Basic Info
  title: string;
  summary: string;
  problemSolved: string;
  
  // Technical Details
  howItWorks: string;
  keyFeatures: string[];
  materials: string[];
  novelAspects: string[];
  
  // Prior Art
  existingSolutions: string[];
  differentiators: string[];
  priorArtSearchDone: boolean;
  
  // Commercial Potential
  targetMarket: string;
  estimatedValue: number;
  competitiveAdvantage: string;
  
  // Status
  status: DisclosureStatus;
  submittedAt?: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  completionPercentage: number;
}

export interface UseInventionDisclosureReturn {
  disclosure: InventionDisclosure | null;
  loading: boolean;
  error: string | null;
  
  // CRUD
  createDisclosure: (prototypeId: string) => Promise<string | null>;
  updateDisclosure: (updates: Partial<InventionDisclosure>) => Promise<boolean>;
  submitDisclosure: () => Promise<boolean>;
  
  // Validation
  getCompletionPercentage: () => number;
  getMissingFields: () => string[];
  isReadyToSubmit: () => boolean;
  
  // Workflow
  saveDraft: () => Promise<boolean>;
  requestReview: () => Promise<boolean>;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// REQUIRED FIELDS
// ============================================================================

const REQUIRED_FIELDS: (keyof InventionDisclosure)[] = [
  'title',
  'summary',
  'problemSolved',
  'howItWorks',
  'keyFeatures',
  'novelAspects',
  'targetMarket'
];

// ============================================================================
// HOOK
// ============================================================================

export function useInventionDisclosure(disclosureId?: string): UseInventionDisclosureReturn {
  const [disclosure, setDisclosure] = useState<InventionDisclosure | null>(null);
  const [loading, setLoading] = useState(!!disclosureId);
  const [error, setError] = useState<string | null>(null);

  // Fetch disclosure
  const fetchDisclosure = useCallback(async () => {
    if (!disclosureId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock empty disclosure for new
      setDisclosure({
        id: disclosureId,
        prototypeId: '',
        creatorId: 'current-user',
        title: '',
        summary: '',
        problemSolved: '',
        howItWorks: '',
        keyFeatures: [],
        materials: [],
        novelAspects: [],
        existingSolutions: [],
        differentiators: [],
        priorArtSearchDone: false,
        targetMarket: '',
        estimatedValue: 0,
        competitiveAdvantage: '',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completionPercentage: 0
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load disclosure');
    } finally {
      setLoading(false);
    }
  }, [disclosureId]);

  useEffect(() => {
    if (disclosureId) {
      fetchDisclosure();
    }
  }, [disclosureId, fetchDisclosure]);

  // Create new disclosure
  const createDisclosure = useCallback(async (prototypeId: string): Promise<string | null> => {
    try {
      const newId = `disc-${Date.now()}`;
      
      const newDisclosure: InventionDisclosure = {
        id: newId,
        prototypeId,
        creatorId: 'current-user',
        title: '',
        summary: '',
        problemSolved: '',
        howItWorks: '',
        keyFeatures: [],
        materials: [],
        novelAspects: [],
        existingSolutions: [],
        differentiators: [],
        priorArtSearchDone: false,
        targetMarket: '',
        estimatedValue: 0,
        competitiveAdvantage: '',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completionPercentage: 0
      };
      
      setDisclosure(newDisclosure);
      return newId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create disclosure');
      return null;
    }
  }, []);

  // Update disclosure
  const updateDisclosure = useCallback(async (
    updates: Partial<InventionDisclosure>
  ): Promise<boolean> => {
    if (!disclosure) return false;
    
    setDisclosure(prev => {
      if (!prev) return null;
      
      const updated = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Recalculate completion
      updated.completionPercentage = calculateCompletion(updated);
      
      return updated;
    });
    
    return true;
  }, [disclosure]);

  // Calculate completion percentage
  const calculateCompletion = (disc: InventionDisclosure): number => {
    let completed = 0;
    let total = REQUIRED_FIELDS.length;
    
    REQUIRED_FIELDS.forEach(field => {
      const value = disc[field];
      if (Array.isArray(value)) {
        if (value.length > 0) completed++;
      } else if (typeof value === 'string') {
        if (value.trim().length > 0) completed++;
      } else if (value) {
        completed++;
      }
    });
    
    // Bonus for optional fields
    if (disc.priorArtSearchDone) completed += 0.5;
    if (disc.estimatedValue > 0) completed += 0.5;
    if (disc.differentiators.length > 0) completed += 0.5;
    
    return Math.round((completed / total) * 100);
  };

  // Get completion percentage
  const getCompletionPercentage = useCallback((): number => {
    if (!disclosure) return 0;
    return calculateCompletion(disclosure);
  }, [disclosure]);

  // Get missing fields
  const getMissingFields = useCallback((): string[] => {
    if (!disclosure) return REQUIRED_FIELDS as string[];
    
    return REQUIRED_FIELDS.filter(field => {
      const value = disclosure[field];
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === 'string') return value.trim().length === 0;
      return !value;
    }) as string[];
  }, [disclosure]);

  // Check if ready to submit
  const isReadyToSubmit = useCallback((): boolean => {
    return getMissingFields().length === 0;
  }, [getMissingFields]);

  // Save draft
  const saveDraft = useCallback(async (): Promise<boolean> => {
    if (!disclosure) return false;
    
    try {
      // TODO: API call to save
      console.log('[Disclosure] Saving draft:', disclosure.id);
      return true;
    } catch (err) {
      setError('Failed to save draft');
      return false;
    }
  }, [disclosure]);

  // Submit disclosure
  const submitDisclosure = useCallback(async (): Promise<boolean> => {
    if (!disclosure) return false;
    
    if (!isReadyToSubmit()) {
      setError(`Missing required fields: ${getMissingFields().join(', ')}`);
      return false;
    }
    
    setDisclosure(prev => prev ? {
      ...prev,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [disclosure, isReadyToSubmit, getMissingFields]);

  // Request review
  const requestReview = useCallback(async (): Promise<boolean> => {
    if (!disclosure || disclosure.status !== 'submitted') return false;
    
    setDisclosure(prev => prev ? {
      ...prev,
      status: 'under-review',
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [disclosure]);

  return {
    disclosure,
    loading,
    error,
    createDisclosure,
    updateDisclosure,
    submitDisclosure,
    getCompletionPercentage,
    getMissingFields,
    isReadyToSubmit,
    saveDraft,
    requestReview,
    refresh: fetchDisclosure
  };
}

export default useInventionDisclosure;
