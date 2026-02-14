/**
 * useROVContext Hook
 * Wembley Wonders CIC
 * 
 * Provides context-aware ROV selection and behaviour.
 * Determines which ROV is most appropriate for current situation.
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ============================================================================
// TYPES
// ============================================================================

export type ROVPersonality = 
  | 'maya'           // General assistant
  | 'mentor'         // Programme mentor
  | 'coach'          // Business coach
  | 'tech'           // Technical support
  | 'creative'       // Creative guidance
  | 'valuation'      // Valuation specialist
  | 'ip-advisor';    // IP protection

export interface ROVContext {
  currentPage: string;
  programme?: string;
  creatorStage?: string;
  taskType?: string;
  urgency: 'low' | 'medium' | 'high';
  previousInteractions: number;
}

export interface ROVRecommendation {
  personality: ROVPersonality;
  confidence: number;
  reason: string;
  greeting: string;
  suggestedActions: string[];
}

export interface UseROVContextReturn {
  context: ROVContext;
  recommendation: ROVRecommendation;
  
  // Context Updates
  updateContext: (updates: Partial<ROVContext>) => void;
  setTaskType: (taskType: string) => void;
  setUrgency: (urgency: 'low' | 'medium' | 'high') => void;
  
  // ROV Selection
  getRecommendedROV: () => ROVRecommendation;
  getGreeting: () => string;
  getSuggestedActions: () => string[];
  
  // Personality Info
  getPersonalityInfo: (personality: ROVPersonality) => PersonalityInfo;
}

export interface PersonalityInfo {
  name: string;
  emoji: string;
  description: string;
  strengths: string[];
  bestFor: string[];
}

// ============================================================================
// PERSONALITY DATA
// ============================================================================

const PERSONALITIES: Record<ROVPersonality, PersonalityInfo> = {
  'maya': {
    name: 'Maya',
    emoji: '🌟',
    description: 'Your general guide through Wembley Wonders',
    strengths: ['Navigation', 'General questions', 'Getting started'],
    bestFor: ['New visitors', 'General help', 'Overview information']
  },
  'mentor': {
    name: 'Programme Mentor',
    emoji: '🎓',
    description: 'Expert guidance for your programme journey',
    strengths: ['Curriculum', 'Skills development', 'Progress tracking'],
    bestFor: ['Learning paths', 'Skill building', 'Programme navigation']
  },
  'coach': {
    name: 'Business Coach',
    emoji: '💼',
    description: 'Helps you build sustainable creative income',
    strengths: ['Pricing', 'Client acquisition', 'Business planning'],
    bestFor: ['First sales', 'Growing business', 'Revenue strategies']
  },
  'tech': {
    name: 'Tech Support',
    emoji: '🔧',
    description: 'Technical help for tools and platforms',
    strengths: ['Troubleshooting', 'Tool setup', 'Technical guidance'],
    bestFor: ['Platform issues', 'Tool learning', 'Technical questions']
  },
  'creative': {
    name: 'Creative Guide',
    emoji: '🎨',
    description: 'Inspires and guides your creative work',
    strengths: ['Ideation', 'Feedback', 'Creative development'],
    bestFor: ['Creative blocks', 'Portfolio building', 'Artistic direction']
  },
  'valuation': {
    name: 'Valuation Specialist',
    emoji: '💎',
    description: 'Helps you understand and communicate your value',
    strengths: ['Pricing strategy', 'Value articulation', 'Market positioning'],
    bestFor: ['Pricing decisions', 'Pitching', 'Valuation worksheets']
  },
  'ip-advisor': {
    name: 'IP Advisor',
    emoji: '🛡️',
    description: 'Protects your creative intellectual property',
    strengths: ['IP strategy', 'Protection options', 'Patent guidance'],
    bestFor: ['Invention disclosure', 'Patent questions', 'IP protection']
  }
};

// ============================================================================
// HOOK
// ============================================================================

export function useROVContext(): UseROVContextReturn {
  const location = useLocation();
  
  const [context, setContext] = useState<ROVContext>({
    currentPage: location.pathname,
    urgency: 'low',
    previousInteractions: 0
  });

  // Update context when location changes
  useEffect(() => {
    setContext(prev => ({
      ...prev,
      currentPage: location.pathname
    }));
  }, [location.pathname]);

  // Update context
  const updateContext = useCallback((updates: Partial<ROVContext>) => {
    setContext(prev => ({ ...prev, ...updates }));
  }, []);

  // Set task type
  const setTaskType = useCallback((taskType: string) => {
    updateContext({ taskType });
  }, [updateContext]);

  // Set urgency
  const setUrgency = useCallback((urgency: 'low' | 'medium' | 'high') => {
    updateContext({ urgency });
  }, [updateContext]);

  // Get recommended ROV
  const getRecommendedROV = useCallback((): ROVRecommendation => {
    const { currentPage, taskType, programme } = context;
    
    // Page-based recommendations
    if (currentPage.includes('/valuation') || taskType === 'valuation') {
      return {
        personality: 'valuation',
        confidence: 0.95,
        reason: 'You\'re working on valuation - I can help you articulate your worth.',
        greeting: 'Ready to discover what makes your work valuable?',
        suggestedActions: [
          'Start valuation worksheet',
          'Review pricing strategy',
          'Prepare for client pitch'
        ]
      };
    }
    
    if (currentPage.includes('/prototype') || currentPage.includes('/ip')) {
      return {
        personality: 'ip-advisor',
        confidence: 0.9,
        reason: 'Protecting your innovations is crucial - let me guide you.',
        greeting: 'Let\'s make sure your ideas stay yours.',
        suggestedActions: [
          'Complete invention disclosure',
          'Check prior art',
          'Review protection options'
        ]
      };
    }
    
    if (currentPage.includes('/sandbox') || currentPage.includes('/workshop')) {
      return {
        personality: 'creative',
        confidence: 0.85,
        reason: 'Time to create! I\'m here for inspiration and feedback.',
        greeting: 'What shall we create today?',
        suggestedActions: [
          'Start a mini-sandbox',
          'Get feedback on work',
          'Explore new techniques'
        ]
      };
    }
    
    if (currentPage.includes('/marketplace') || currentPage.includes('/sales')) {
      return {
        personality: 'coach',
        confidence: 0.9,
        reason: 'Building your business - I\'ll help you earn from your skills.',
        greeting: 'Ready to turn skills into income?',
        suggestedActions: [
          'List a product',
          'Set your prices',
          'Find your first client'
        ]
      };
    }
    
    if (programme) {
      return {
        personality: 'mentor',
        confidence: 0.8,
        reason: `Guiding you through ${programme} - let's keep building.`,
        greeting: `Welcome back to ${programme}!`,
        suggestedActions: [
          'Continue learning path',
          'Check progress',
          'Start next exercise'
        ]
      };
    }
    
    // Default to Maya
    return {
      personality: 'maya',
      confidence: 0.7,
      reason: 'I\'m here to help with whatever you need.',
      greeting: 'Hello! How can I help you today?',
      suggestedActions: [
        'Explore programmes',
        'Check your dashboard',
        'Start a sandbox'
      ]
    };
  }, [context]);

  // Memoized recommendation
  const recommendation = useMemo(() => getRecommendedROV(), [getRecommendedROV]);

  // Get greeting
  const getGreeting = useCallback((): string => {
    return recommendation.greeting;
  }, [recommendation]);

  // Get suggested actions
  const getSuggestedActions = useCallback((): string[] => {
    return recommendation.suggestedActions;
  }, [recommendation]);

  // Get personality info
  const getPersonalityInfo = useCallback((personality: ROVPersonality): PersonalityInfo => {
    return PERSONALITIES[personality];
  }, []);

  return {
    context,
    recommendation,
    updateContext,
    setTaskType,
    setUrgency,
    getRecommendedROV,
    getGreeting,
    getSuggestedActions,
    getPersonalityInfo
  };
}

export default useROVContext;
