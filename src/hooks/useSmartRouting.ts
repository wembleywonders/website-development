import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SmartRouting } from '../utils/smartRouting';

// Main hook for smart routing functionality
export const useSmartRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [routingData, setRoutingData] = useState(() => 
    SmartRouting.analyzeIncomingTraffic()
  );
  const [isLoading, setIsLoading] = useState(false);
  
  // Track if we've already analyzed this path to prevent duplicates
  const analyzedPaths = useRef(new Set<string>());

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Skip if we've already analyzed this path recently
    if (analyzedPaths.current.has(currentPath)) {
      return;
    }

    const data = SmartRouting.analyzeIncomingTraffic();
    setRoutingData(data);

    // Mark this path as analyzed
    analyzedPaths.current.add(currentPath);
    
    // Clean old entries (keep only last 10 paths)
    if (analyzedPaths.current.size > 10) {
      const pathsArray = Array.from(analyzedPaths.current);
      analyzedPaths.current = new Set(pathsArray.slice(-10));
    }

    // Track page visit with deduplication built into SmartRouting
    if (data.trackingId) {
      SmartRouting.trackInterest(data.trackingId, currentPath);
    } else {
      // Track generic page visit
      SmartRouting.trackInterest('page_visit', currentPath);
    }
  }, [location.pathname]);

  const redirectToSuggested = useCallback(() => {
    if (routingData.suggestedPath) {
      setIsLoading(true);
      SmartRouting.trackInterest('suggestion_accepted', routingData.suggestedPath);
      navigate(routingData.suggestedPath);
    }
  }, [routingData.suggestedPath, navigate]);

  const dismissSuggestion = useCallback(() => {
    SmartRouting.trackInterest('suggestion_dismissed', location.pathname);
    setRoutingData(prev => ({ ...prev, suggestedPath: undefined }));
  }, [location.pathname]);

  return {
    ...routingData,
    isLoading,
    redirectToSuggested,
    dismissSuggestion,
    hasHighConfidenceSuggestion: routingData.confidence > 0.7
  };
};

// Hook for welcome messages and contextual content
export const useWelcomeMessage = () => {
  const location = useLocation();
  const [welcomeData, setWelcomeData] = useState<{
    message: string;
    showBanner: boolean;
    contextualContent: any;
  }>({
    message: '',
    showBanner: false,
    contextualContent: null
  });
  
  // Track processed locations to prevent duplicate welcome messages
  const processedLocations = useRef(new Set<string>());

  useEffect(() => {
    const locationKey = `${location.pathname}${location.search}`;
    
    // Skip if we've already processed this location
    if (processedLocations.current.has(locationKey)) {
      return;
    }

    const routingData = SmartRouting.analyzeIncomingTraffic();
    const isFirstVisit = !localStorage.getItem('ww_visit_count');
    const timeOfDay = getTimeOfDay();
    
    // Check if we came from state (redirect with message)
    const stateMessage = (location.state as any)?.welcomeMessage;
    const stateTrackingId = (location.state as any)?.trackingId;

    if (stateMessage && stateTrackingId) {
      setWelcomeData({
        message: stateMessage,
        showBanner: true,
        contextualContent: SmartRouting.getContextualContent(stateTrackingId)
      });
    } else if (routingData.confidence > 0.6) {
      const message = SmartRouting.generateWelcomeMessage({
        isFirstVisit,
        timeOfDay,
        suggestedPath: routingData.suggestedPath,
        referralSource: routingData.trackingId?.includes('google') ? 'google' : 'word_of_mouth'
      });

      setWelcomeData({
        message: message + ' ' + (routingData.welcomeMessage || ''),
        showBanner: true,
        contextualContent: routingData.trackingId ? 
          SmartRouting.getContextualContent(routingData.trackingId) : null
      });
    }

    // Mark location as processed
    processedLocations.current.add(locationKey);
    
    // Clean old entries
    if (processedLocations.current.size > 20) {
      const locationsArray = Array.from(processedLocations.current);
      processedLocations.current = new Set(locationsArray.slice(-20));
    }
  }, [location]);

  const dismissWelcome = useCallback(() => {
    setWelcomeData(prev => ({ ...prev, showBanner: false }));
    SmartRouting.trackInterest('welcome_dismissed', location.pathname);
  }, [location.pathname]);

  const acceptWelcome = useCallback(() => {
    setWelcomeData(prev => ({ ...prev, showBanner: false }));
    SmartRouting.trackInterest('welcome_accepted', location.pathname);
  }, [location.pathname]);

  return {
    ...welcomeData,
    dismissWelcome,
    acceptWelcome
  };
};

// Hook for search functionality with smart suggestions
export const useSmartSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{
    title: string;
    path: string;
    description: string;
    confidence: number;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout>();

  const searchMappings = {
    // Programs
    'radio': { path: '/raydyo', title: 'Raydyo Community Radio', description: 'Listen live, learn broadcasting' },
    'raydyo': { path: '/raydyo', title: 'Raydyo Community Radio', description: 'Our community radio station' },
    'gaming': { path: '/joystick', title: 'Joystick Gaming', description: 'Gaming tournaments and events' },
    'joystick': { path: '/joystick', title: 'Joystick Gaming', description: 'Gaming community hub' },
    'workshop': { path: '/workshops', title: 'Skills Workshops', description: 'Learn new skills with us' },
    'training': { path: '/workshops', title: 'Skills Training', description: 'Professional development' },
    
    // Membership
    'join': { path: '/membership', title: 'Join Us', description: 'Become a community member' },
    'member': { path: '/membership', title: 'Membership', description: 'Community membership tiers' },
    'apply': { path: '/apply', title: 'Apply Now', description: 'Start your application' },
    'champion': { path: '/champion', title: 'Champion Role', description: 'Community leadership pathway' },
    'connector': { path: '/connector', title: 'Connector Role', description: 'Community connection role' },
    'curator': { path: '/curator', title: 'Curator Role', description: 'Content curation pathway' },
    
    // Assessment
    'assessment': { path: '/assessment-guide', title: 'Assessment Guide', description: 'Understand our process' },
    'practice': { path: '/practice-assessment', title: 'Practice Assessment', description: 'Try a sample test' },
    'test': { path: '/practice-assessment', title: 'Practice Test', description: 'Sample assessment' },
    
    // General
    'help': { path: '/contact', title: 'Contact Us', description: 'Get help and support' },
    'contact': { path: '/contact', title: 'Contact', description: 'Get in touch' },
    'about': { path: '/about', title: 'About Us', description: 'Learn about our mission' }
  };

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer
    debounceTimer.current = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const results: typeof suggestions = [];

      // Exact matches first
      Object.entries(searchMappings).forEach(([key, value]) => {
        if (key === term) {
          results.push({ ...value, confidence: 1.0 });
        } else if (key.includes(term) || term.includes(key)) {
          results.push({ ...value, confidence: 0.8 });
        } else if (value.title.toLowerCase().includes(term) || 
                   value.description.toLowerCase().includes(term)) {
          results.push({ ...value, confidence: 0.6 });
        }
      });

      // Remove duplicates and sort by confidence
      const uniqueResults = results.filter((item, index, self) => 
        index === self.findIndex(t => t.path === item.path)
      ).sort((a, b) => b.confidence - a.confidence).slice(0, 5);

      setSuggestions(uniqueResults);
      setIsSearching(false);
    }, 300);

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm]);

  const selectSuggestion = useCallback((suggestion: typeof suggestions[0]) => {
    SmartRouting.trackInterest('search_selection', suggestion.path);
    navigate(suggestion.path);
    setSearchTerm('');
    setSuggestions([]);
  }, [navigate]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSuggestions([]);
    setIsSearching(false);
    
    // Clear debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, []);

  return {
    searchTerm,
    suggestions,
    isSearching,
    handleSearch,
    selectSuggestion,
    clearSearch,
    hasResults: suggestions.length > 0
  };
};

// Hook for tracking user interactions with throttling
export const useInteractionTracking = () => {
  const location = useLocation();
  const throttleMap = useRef(new Map<string, number>());

  const trackClick = useCallback((element: string, context?: string) => {
    const key = `click_${element}_${context || location.pathname}`;
    const lastTrack = throttleMap.current.get(key);
    
    // Throttle to prevent spam (max once per 2 seconds)
    if (lastTrack && Date.now() - lastTrack < 2000) {
      return;
    }
    
    throttleMap.current.set(key, Date.now());
    SmartRouting.trackInterest(`click_${element}`, context || location.pathname);
  }, [location.pathname]);

  const trackView = useCallback((section: string, duration?: number) => {
    const key = `view_${section}_${location.pathname}`;
    const lastTrack = throttleMap.current.get(key);
    
    // Throttle views (max once per 5 seconds)
    if (lastTrack && Date.now() - lastTrack < 5000) {
      return;
    }
    
    throttleMap.current.set(key, Date.now());
    SmartRouting.trackInterest(`view_${section}`, {
      path: location.pathname,
      duration
    });
  }, [location.pathname]);

  const trackConversion = useCallback((type: string, value?: any) => {
    // Conversions are important, don't throttle them
    SmartRouting.trackInterest(`conversion_${type}`, {
      path: location.pathname,
      value
    });
  }, [location.pathname]);

  return {
    trackClick,
    trackView, 
    trackConversion
  };
};

// Utility function
function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}