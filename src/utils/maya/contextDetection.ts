// Context Detection Utilities for Maya
// Analyzes visitor behavior and page context to provide relevant guidance

export interface UserContext {
  isLoggedIn: boolean;
  userType: 'visitor' | 'participant' | 'member' | 'active_volunteer';
  currentPage: string;
  timeOnPage: number;
  scrollDepth: number;
  visitCount: number;
  behaviorPattern: BehaviorPattern;
  interests: string[];
  lastActivity: Date;
}

export interface BehaviorPattern {
  type: 'browsing' | 'exploring' | 'deciding' | 'returning' | 'stuck';
  confidence: number;
  indicators: string[];
  suggestedActions: string[];
}

export interface PageContext {
  path: string;
  title: string;
  mainContent: string;
  keyTerms: string[];
  callsToAction: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  prerequisites: string[];
}

// Page context definitions
export const pageContexts: Record<string, PageContext> = {
  '/': {
    path: '/',
    title: 'Home',
    mainContent: 'Introduction to Wembley Wonders and main pathways',
    keyTerms: ['community', 'skills', 'leadership', 'pathways'],
    callsToAction: ['Get Started', 'Join as Member', 'Learn More'],
    difficulty: 'beginner',
    timeRequired: '2-3 minutes to explore',
    prerequisites: []
  },
  '/about': {
    path: '/about',
    title: 'About Us',
    mainContent: 'Organization mission, governance, and community focus',
    keyTerms: ['CIC', 'governance', 'community', 'transparency'],
    callsToAction: ['Join as Member', 'Volunteer and Join'],
    difficulty: 'beginner',
    timeRequired: '3-5 minutes to read',
    prerequisites: []
  },
  '/calendar': {
    path: '/calendar',
    title: 'Community Calendar',
    mainContent: 'Seasonal programmes and community events',
    keyTerms: ['programmes', 'STEMgineers', 'Tech-preneurs', 'LARP', 'Rayd-yo'],
    callsToAction: ['Join Programme', 'Learn More', 'Contact Us'],
    difficulty: 'intermediate',
    timeRequired: '5-10 minutes to explore programmes',
    prerequisites: ['Understanding of basic programme structure']
  },
  '/membership': {
    path: '/membership',
    title: 'Membership',
    mainContent: 'Membership tiers and application process',
    keyTerms: ['membership', 'benefits', 'voting rights', 'commitment'],
    callsToAction: ['Apply for Membership', 'Start as Volunteer'],
    difficulty: 'intermediate',
    timeRequired: '10-15 minutes for application',
    prerequisites: ['Attended at least one programme or event']
  },
  '/get-started': {
    path: '/get-started',
    title: 'Get Started',
    mainContent: 'Initial pathways and assessment',
    keyTerms: ['skills', 'interests', 'pathways', 'assessment'],
    callsToAction: ['Take Assessment', 'Join Programme', 'Contact Us'],
    difficulty: 'beginner',
    timeRequired: '5-10 minutes for assessment',
    prerequisites: []
  }
};

// Behavior pattern detection
export const detectBehaviorPattern = (context: Partial<UserContext>): BehaviorPattern => {
  const { timeOnPage = 0, scrollDepth = 0, visitCount = 1, currentPage = '/' } = context;

  // Browsing pattern: Quick page visits, low engagement
  if (timeOnPage < 30 && scrollDepth < 0.3 && visitCount <= 2) {
    return {
      type: 'browsing',
      confidence: 0.8,
      indicators: ['Short time on page', 'Minimal scrolling', 'First-time visitor'],
      suggestedActions: ['Offer quick overview', 'Highlight key benefits', 'Provide easy navigation']
    };
  }

  // Exploring pattern: Moderate engagement, checking multiple pages
  if (timeOnPage > 30 && timeOnPage < 120 && scrollDepth > 0.3 && visitCount <= 3) {
    return {
      type: 'exploring',
      confidence: 0.7,
      indicators: ['Moderate time investment', 'Reading content', 'Multiple page visits'],
      suggestedActions: ['Provide detailed information', 'Suggest related content', 'Offer programme comparisons']
    };
  }

  // Deciding pattern: High engagement, return visits, focusing on specific content
  if (timeOnPage > 120 || scrollDepth > 0.7 || visitCount > 3) {
    return {
      type: 'deciding',
      confidence: 0.9,
      indicators: ['High engagement', 'Thorough content review', 'Return visitor'],
      suggestedActions: ['Offer personal consultation', 'Provide next steps', 'Address common concerns']
    };
  }

  // Returning pattern: Multiple visits, familiar with content
  if (visitCount > 5) {
    return {
      type: 'returning',
      confidence: 0.8,
      indicators: ['Frequent visitor', 'Familiar with content'],
      suggestedActions: ['Check for updates', 'Offer advanced options', 'Suggest deeper engagement']
    };
  }

  // Stuck pattern: Long time on page but limited interaction
  if (timeOnPage > 180 && scrollDepth < 0.5) {
    return {
      type: 'stuck',
      confidence: 0.6,
      indicators: ['Extended time', 'Limited interaction', 'Possible confusion'],
      suggestedActions: ['Offer assistance', 'Simplify information', 'Provide direct contact']
    };
  }

  // Default to browsing
  return {
    type: 'browsing',
    confidence: 0.5,
    indicators: ['Standard visitor pattern'],
    suggestedActions: ['Welcome and orient', 'Provide overview']
  };
};

// Interest detection based on page visits and behavior
export const detectInterests = (visitHistory: string[], timeSpent: Record<string, number>): string[] => {
  const interests: string[] = [];
  
  // Programme-specific interests
  if (visitHistory.includes('/calendar') && timeSpent['/calendar'] > 60) {
    interests.push('programmes', 'learning');
  }
  
  // Governance interests
  if (visitHistory.includes('/about') && timeSpent['/about'] > 120) {
    interests.push('governance', 'transparency', 'community leadership');
  }
  
  // Membership interests
  if (visitHistory.includes('/membership')) {
    interests.push('membership', 'commitment', 'community involvement');
  }
  
  // STEM interests (based on calendar engagement)
  if (timeSpent['/calendar'] > 180) {
    interests.push('STEM', 'technology', 'innovation');
  }
  
  // Creative interests
  if (visitHistory.includes('/calendar') && interests.includes('programmes')) {
    interests.push('creativity', 'arts', 'writing');
  }
  
  return [...new Set(interests)]; // Remove duplicates
};

// Context-aware guidance generation
export const generateContextualGuidance = (userContext: UserContext): string[] => {
  const guidance: string[] = [];
  const { behaviorPattern, currentPage, interests, isLoggedIn } = userContext;
  
  // Page-specific guidance
  const pageContext = pageContexts[currentPage];
  if (pageContext) {
    switch (behaviorPattern.type) {
      case 'browsing':
        guidance.push(`Welcome to ${pageContext.title}! This will take about ${pageContext.timeRequired}.`);
        if (pageContext.keyTerms.length > 0) {
          guidance.push(`Key things to know: ${pageContext.keyTerms.slice(0, 3).join(', ')}.`);
        }
        break;
        
      case 'exploring':
        guidance.push(`I see you're exploring ${pageContext.title}. Here's what might interest you most...`);
        if (interests.length > 0) {
          const relevantTerms = pageContext.keyTerms.filter(term => 
            interests.some(interest => term.toLowerCase().includes(interest.toLowerCase()))
          );
          if (relevantTerms.length > 0) {
            guidance.push(`Based on your interests, focus on: ${relevantTerms.join(', ')}.`);
          }
        }
        break;
        
      case 'deciding':
        guidance.push(`You've been exploring our options thoroughly. Ready to take the next step?`);
        if (pageContext.callsToAction.length > 0) {
          guidance.push(`Your next actions could be: ${pageContext.callsToAction.join(' or ')}.`);
        }
        break;
        
      case 'returning':
        guidance.push(`Welcome back! Looking for something specific today?`);
        guidance.push(`I can help you find updates or dive deeper into areas you're interested in.`);
        break;
        
      case 'stuck':
        guidance.push(`I notice you've been here a while. Can I help clarify anything?`);
        guidance.push(`Sometimes it helps to have a quick chat about what you're looking for.`);
        break;
    }
  }
  
  // Authentication-specific guidance
  if (!isLoggedIn) {
    guidance.push(`You're browsing as a visitor. You can participate in programmes without membership.`);
  }
  
  // Interest-specific guidance
  if (interests.includes('programmes') && currentPage === '/calendar') {
    guidance.push(`Each programme runs 8 weeks (2 hours/week). No prior experience needed!`);
  }
  
  if (interests.includes('membership') && currentPage !== '/membership') {
    guidance.push(`Interested in membership? You can start as a participant and upgrade later.`);
  }
  
  return guidance;
};

// Jargon detection and explanation triggers
export const detectJargonNeed = (pageContent: string, userBehavior: BehaviorPattern): string[] => {
  const jargonTerms = [
    'STEMgineers', 'Tech-preneurs', 'LARP', 'Rayd-yo', 'Joystick e-zine',
    'Pageturner\'s', 'Silk Stilettos', 'CIC', 'active volunteer member'
  ];
  
  const foundTerms = jargonTerms.filter(term => 
    pageContent.toLowerCase().includes(term.toLowerCase())
  );
  
  // If user seems stuck or is exploring, offer jargon help
  if ((userBehavior.type === 'stuck' || userBehavior.type === 'exploring') && foundTerms.length > 0) {
    return foundTerms;
  }
  
  return [];
};

// Time-based context awareness
export const getTimeContext = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  
  if (month >= 3 && month <= 5) {
    return 'spring'; // March-May: Trubble n Bass season
  } else if (month >= 6 && month <= 8) {
    return 'summer'; // June-August: Kaywana's Court season
  } else if (month >= 9 && month <= 11) {
    return 'autumn'; // September-November: Bright Sparks season
  } else {
    return 'winter'; // December-February: Connoisseurs Club season
  }
};

// Get current programme based on time
export const getCurrentProgramme = (): { name: string; description: string; status: string } => {
  const season = getTimeContext();
  
  switch (season) {
    case 'spring':
      return {
        name: 'Trubble n Bass',
        description: 'Music production and sound engineering programme',
        status: 'Applications open'
      };
    case 'summer':
      return {
        name: 'Kaywana\'s Court',
        description: 'Drama, LARP, and creative arts programme',
        status: 'In progress'
      };
    case 'autumn':
      return {
        name: 'Bright Sparks',
        description: 'STEM and entrepreneurship showcase programme',
        status: 'Registration opening soon'
      };
    case 'winter':
      return {
        name: 'Connoisseurs Social Club',
        description: 'Governance and community leadership programme',
        status: 'Planning phase'
      };
    default:
      return {
        name: 'Year-round activities',
        description: 'Various workshops and community events',
        status: 'Ongoing'
      };
  }
};

export default {
  detectBehaviorPattern,
  detectInterests,
  generateContextualGuidance,
  detectJargonNeed,
  getTimeContext,
  getCurrentProgramme,
  pageContexts
};