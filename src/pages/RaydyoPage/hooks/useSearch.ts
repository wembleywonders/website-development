import { useState, useCallback, useMemo } from 'react';

export interface SearchResult {
  id: string;
  type: 'show' | 'episode' | 'host' | 'topic';
  title: string;
  description: string;
  host?: string;
  date?: string;
  duration?: string;
  audioUrl?: string;
  artwork?: string;
  tags?: string[];
}

export interface SearchFilters {
  type: string[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
  duration: {
    min?: number;
    max?: number;
  };
  hosts: string[];
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  suggestions: string[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
}

// Mock data for demonstration - replace with actual API calls
const mockData: SearchResult[] = [
  {
    id: '1',
    type: 'show',
    title: 'Wembley Voices',
    description: 'Weekly conversations with local residents sharing their stories',
    host: 'Sarah Johnson',
    date: '2024-01-15',
    duration: '45:30',
    tags: ['community', 'interviews', 'local']
  },
  {
    id: '2',
    type: 'episode',
    title: 'New Year Resolutions in our Community',
    description: 'Local residents share their hopes and goals for 2024',
    host: 'Michael Chen',
    date: '2024-01-08',
    duration: '28:15',
    tags: ['community', 'new year', 'goals']
  },
  {
    id: '3',
    type: 'show',
    title: 'Tech Talk Tuesday',
    description: 'Breaking down technology for everyone in simple terms',
    host: 'Dr. Priya Patel',
    date: '2024-01-10',
    duration: '35:20',
    tags: ['technology', 'education', 'digital literacy']
  },
  {
    id: '4',
    type: 'episode',
    title: 'Local Business Spotlight: Jamaican Kitchen',
    description: 'Interview with the owners of our beloved local restaurant',
    host: 'Marcus Williams',
    date: '2024-01-12',
    duration: '22:45',
    tags: ['business', 'food', 'caribbean', 'local']
  }
];

const popularSearches = [
  'community news',
  'local business',
  'tech tips',
  'music shows',
  'interviews',
  'Caribbean culture'
];

export const useSearch = () => {
  const [state, setState] = useState<SearchState>({
    isOpen: false,
    query: '',
    results: [],
    suggestions: [],
    filters: {
      type: [],
      dateRange: {},
      duration: {},
      hosts: []
    },
    isLoading: false,
    error: null,
    recentSearches: JSON.parse(localStorage.getItem('raydyo-recent-searches') || '[]')
  });

  const open = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const close = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isOpen: false, 
      query: '', 
      results: [], 
      suggestions: [],
      error: null 
    }));
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setState(prev => ({ ...prev, results: [], suggestions: [] }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Filter mock data based on search query
      const filteredResults = mockData.filter(item => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const searchableText = `${item.title} ${item.description} ${item.host || ''} ${item.tags?.join(' ') || ''}`.toLowerCase();
        
        return searchTerms.some(term => searchableText.includes(term));
      });

      // Update recent searches
      const updatedRecentSearches = [
        searchQuery,
        ...state.recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);

      localStorage.setItem('raydyo-recent-searches', JSON.stringify(updatedRecentSearches));

      setState(prev => ({
        ...prev,
        query: searchQuery,
        results: filteredResults,
        suggestions: [],
        isLoading: false,
        recentSearches: updatedRecentSearches
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Search failed. Please try again.'
      }));
    }
  }, [state.recentSearches]);

  const getSuggestions = useCallback((inputQuery: string) => {
    if (!inputQuery.trim()) {
      setState(prev => ({ ...prev, suggestions: popularSearches }));
      return;
    }

    const query = inputQuery.toLowerCase();
    const suggestions = [
      ...popularSearches.filter(s => s.toLowerCase().includes(query)),
      ...state.recentSearches.filter(s => s.toLowerCase().includes(query) && s !== inputQuery)
    ].slice(0, 6);

    setState(prev => ({ ...prev, suggestions }));
  }, [state.recentSearches]);

  const applyFilters = useCallback((filters: Partial<SearchFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
    
    // Re-run search with new filters if there's a query
    if (state.query) {
      performSearch(state.query);
    }
  }, [state.query, performSearch]);

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {
        type: [],
        dateRange: {},
        duration: {},
        hosts: []
      }
    }));
  }, []);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem('raydyo-recent-searches');
    setState(prev => ({ ...prev, recentSearches: [] }));
  }, []);

  return {
    ...state,
    open,
    close,
    performSearch,
    getSuggestions,
    applyFilters,
    clearFilters,
    clearRecentSearches
  };
};