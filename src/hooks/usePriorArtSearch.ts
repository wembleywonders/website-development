/**
 * usePriorArtSearch Hook
 * Wembley Wonders CIC
 * 
 * Manages prior art search for patent assessment.
 * Tracks searches, results, and novelty analysis.
 */

import { useState, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type SearchSource = 
  | 'google-patents'
  | 'espacenet'
  | 'uspto'
  | 'wipo'
  | 'google-scholar'
  | 'academic'
  | 'marketplace'
  | 'manual';

export interface PriorArtResult {
  id: string;
  source: SearchSource;
  title: string;
  description: string;
  url?: string;
  publicationDate?: string;
  relevanceScore: number; // 0-100
  threatLevel: 'low' | 'medium' | 'high' | 'blocking';
  notes: string;
  addedAt: string;
}

export interface PriorArtSearch {
  id: string;
  prototypeId: string;
  
  // Search Parameters
  searchTerms: string[];
  classifications: string[]; // IPC codes
  dateRange?: { start: string; end: string };
  
  // Results
  results: PriorArtResult[];
  totalFound: number;
  
  // Analysis
  noveltyScore: number; // 0-100
  freedomToOperate: boolean;
  blockingPatents: string[];
  recommendations: string[];
  
  // Status
  status: 'pending' | 'in-progress' | 'completed' | 'needs-update';
  searchedAt?: string;
  completedAt?: string;
  searchedBy?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface UsePriorArtSearchReturn {
  search: PriorArtSearch | null;
  loading: boolean;
  error: string | null;
  
  // Search Actions
  initiateSearch: (terms: string[], classifications?: string[]) => Promise<boolean>;
  addSearchTerm: (term: string) => void;
  removeSearchTerm: (term: string) => void;
  
  // Results
  addResult: (result: Omit<PriorArtResult, 'id' | 'addedAt'>) => Promise<boolean>;
  updateResult: (id: string, updates: Partial<PriorArtResult>) => Promise<boolean>;
  removeResult: (id: string) => Promise<boolean>;
  
  // Analysis
  analyzeNovelty: () => Promise<{ score: number; analysis: string }>;
  checkFreedomToOperate: () => Promise<boolean>;
  
  // Workflow
  completeSearch: (recommendations: string[]) => Promise<boolean>;
  requestProfessionalSearch: () => Promise<boolean>;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// HOOK
// ============================================================================

export function usePriorArtSearch(prototypeId: string): UsePriorArtSearchReturn {
  const [search, setSearch] = useState<PriorArtSearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing search
  const fetchSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Return null if no search exists yet
      setSearch(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load search');
    } finally {
      setLoading(false);
    }
  }, [prototypeId]);

  // Initiate new search
  const initiateSearch = useCallback(async (
    terms: string[], 
    classifications: string[] = []
  ): Promise<boolean> => {
    const now = new Date().toISOString();
    
    const newSearch: PriorArtSearch = {
      id: `pas-${Date.now()}`,
      prototypeId,
      searchTerms: terms,
      classifications,
      results: [],
      totalFound: 0,
      noveltyScore: 0,
      freedomToOperate: true,
      blockingPatents: [],
      recommendations: [],
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    
    setSearch(newSearch);
    return true;
  }, [prototypeId]);

  // Add search term
  const addSearchTerm = useCallback((term: string) => {
    setSearch(prev => prev ? {
      ...prev,
      searchTerms: [...prev.searchTerms, term],
      status: 'needs-update',
      updatedAt: new Date().toISOString()
    } : null);
  }, []);

  // Remove search term
  const removeSearchTerm = useCallback((term: string) => {
    setSearch(prev => prev ? {
      ...prev,
      searchTerms: prev.searchTerms.filter(t => t !== term),
      updatedAt: new Date().toISOString()
    } : null);
  }, []);

  // Add result
  const addResult = useCallback(async (
    result: Omit<PriorArtResult, 'id' | 'addedAt'>
  ): Promise<boolean> => {
    if (!search) return false;
    
    const newResult: PriorArtResult = {
      ...result,
      id: `par-${Date.now()}`,
      addedAt: new Date().toISOString()
    };
    
    setSearch(prev => prev ? {
      ...prev,
      results: [...prev.results, newResult],
      totalFound: prev.totalFound + 1,
      status: 'in-progress',
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [search]);

  // Update result
  const updateResult = useCallback(async (
    id: string, 
    updates: Partial<PriorArtResult>
  ): Promise<boolean> => {
    setSearch(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        results: prev.results.map(r => 
          r.id === id ? { ...r, ...updates } : r
        ),
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, []);

  // Remove result
  const removeResult = useCallback(async (id: string): Promise<boolean> => {
    setSearch(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        results: prev.results.filter(r => r.id !== id),
        totalFound: prev.totalFound - 1,
        updatedAt: new Date().toISOString()
      };
    });
    
    return true;
  }, []);

  // Analyze novelty
  const analyzeNovelty = useCallback(async (): Promise<{ score: number; analysis: string }> => {
    if (!search) return { score: 0, analysis: 'No search data available' };
    
    // Simple scoring based on results
    const highThreats = search.results.filter(r => r.threatLevel === 'high' || r.threatLevel === 'blocking').length;
    const mediumThreats = search.results.filter(r => r.threatLevel === 'medium').length;
    
    let score = 100;
    score -= highThreats * 25;
    score -= mediumThreats * 10;
    score = Math.max(0, score);
    
    let analysis = '';
    if (score >= 80) {
      analysis = 'High novelty - few similar inventions found. Good candidate for patent protection.';
    } else if (score >= 60) {
      analysis = 'Moderate novelty - some similar work exists. Focus on differentiating features.';
    } else if (score >= 40) {
      analysis = 'Low novelty - significant prior art found. Consider design-around or alternative protection.';
    } else {
      analysis = 'Very low novelty - blocking prior art exists. Patent protection unlikely.';
    }
    
    setSearch(prev => prev ? {
      ...prev,
      noveltyScore: score,
      updatedAt: new Date().toISOString()
    } : null);
    
    return { score, analysis };
  }, [search]);

  // Check freedom to operate
  const checkFreedomToOperate = useCallback(async (): Promise<boolean> => {
    if (!search) return false;
    
    const blockingResults = search.results.filter(r => r.threatLevel === 'blocking');
    const freedomToOperate = blockingResults.length === 0;
    
    setSearch(prev => prev ? {
      ...prev,
      freedomToOperate,
      blockingPatents: blockingResults.map(r => r.id),
      updatedAt: new Date().toISOString()
    } : null);
    
    return freedomToOperate;
  }, [search]);

  // Complete search
  const completeSearch = useCallback(async (recommendations: string[]): Promise<boolean> => {
    if (!search) return false;
    
    await analyzeNovelty();
    await checkFreedomToOperate();
    
    setSearch(prev => prev ? {
      ...prev,
      recommendations,
      status: 'completed',
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } : null);
    
    return true;
  }, [search, analyzeNovelty, checkFreedomToOperate]);

  // Request professional search
  const requestProfessionalSearch = useCallback(async (): Promise<boolean> => {
    if (!search) return false;
    
    console.log('[PriorArt] Professional search requested for:', search.id);
    // TODO: Integrate with professional search service
    
    return true;
  }, [search]);

  return {
    search,
    loading,
    error,
    initiateSearch,
    addSearchTerm,
    removeSearchTerm,
    addResult,
    updateResult,
    removeResult,
    analyzeNovelty,
    checkFreedomToOperate,
    completeSearch,
    requestProfessionalSearch,
    refresh: fetchSearch
  };
}

export default usePriorArtSearch;
