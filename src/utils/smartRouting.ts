// utils/smartRouting.ts
// Handles word-of-mouth referrals and smart redirects for Wembley Wonders

interface ReferralMapping {
  keywords: string[];
  destination: string;
  trackingId: string;
  welcomeMessage?: string;
}

export class SmartRouting {
  private static referralMappings: ReferralMapping[] = [
    {
      keywords: ['radio', 'raydyo', 'broadcasting', 'presenter', 'dj', 'music'],
      destination: '/raydyo',
      trackingId: 'radio_referral',
      welcomeMessage: "Welcome! Ready to get on the airwaves with Raydyo?"
    },
    {
      keywords: ['gaming', 'joystick', 'magazine', 'ezine', 'tournament', 'esports'],
      destination: '/joystick',
      trackingId: 'gaming_referral', 
      welcomeMessage: "Game on! Check out Joystick Magazine."
    },
    {
      keywords: ['training', 'workshop', 'skills', 'learning', 'course', 'classes'],
      destination: '/workshops',
      trackingId: 'training_referral',
      welcomeMessage: "Great choice! Let's develop those skills."
    },
    {
      keywords: ['membership', 'join', 'apply', 'member', 'champion', 'connector'],
      destination: '/membership',
      trackingId: 'membership_referral',
      welcomeMessage: "Ready to become part of our community?"
    },
    {
      keywords: ['shop', 'store', 'crowns', 'tilted-crowns', 'buy', 'purchase'],
      destination: '/shop',
      trackingId: 'shop_referral',
      welcomeMessage: "Welcome to our community shop!"
    },
    {
      keywords: ['events', 'calendar', 'activities', 'schedule', 'happening'],
      destination: '/calendar',
      trackingId: 'events_referral',
      welcomeMessage: "See what's happening in the community!"
    },
    {
      keywords: ['programmes', 'programs', 'activities', 'what-do-you-do'],
      destination: '/programmes',
      trackingId: 'programmes_referral',
      welcomeMessage: "Discover all our community programmes!"
    },
    {
      keywords: ['business', 'partner', 'investment', 'work-with-us', 'collaborate'],
      destination: '/partner-with-us',
      trackingId: 'business_referral',
      welcomeMessage: "Interested in partnering with us?"
    }
  ];

  // Track recent analytics calls to prevent duplicates
  private static recentAnalytics = new Map<string, number>();

  // Analyze URL parameters, referrer, and search terms
  static analyzeIncomingTraffic(): {
    suggestedPath?: string;
    trackingId?: string;
    welcomeMessage?: string;
    confidence: number;
  } {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    // Check URL parameters first (highest confidence)
    const urlHint = urlParams.get('interest') || urlParams.get('ref') || urlParams.get('from');
    if (urlHint) {
      const mapping = this.findBestMatch(urlHint);
      if (mapping) {
        return {
          suggestedPath: mapping.destination,
          trackingId: mapping.trackingId,
          welcomeMessage: mapping.welcomeMessage,
          confidence: 0.9
        };
      }
    }

    // Check Google search terms (medium confidence)
    if (referrer.includes('google.com')) {
      const searchQuery = this.extractGoogleSearchQuery(referrer);
      if (searchQuery) {
        const mapping = this.findBestMatch(searchQuery);
        if (mapping) {
          return {
            suggestedPath: mapping.destination,
            trackingId: mapping.trackingId + '_google',
            welcomeMessage: `Searched for "${searchQuery}"? ` + mapping.welcomeMessage,
            confidence: 0.7
          };
        }
      }
    }

    // Check local storage for return visitors (low confidence)
    const lastInterest = localStorage.getItem('ww_last_interest');
    const visitCount = parseInt(localStorage.getItem('ww_visit_count') || '0');
    
    if (lastInterest && visitCount > 1) {
      const mapping = this.findBestMatch(lastInterest);
      if (mapping) {
        return {
          suggestedPath: mapping.destination,
          trackingId: 'returning_visitor',
          welcomeMessage: "Welcome back! Continuing with " + lastInterest + "?",
          confidence: 0.4
        };
      }
    }

    return { confidence: 0 };
  }

  private static findBestMatch(searchTerm: string): ReferralMapping | null {
    const term = searchTerm.toLowerCase();
    
    // Find exact keyword matches first
    for (const mapping of this.referralMappings) {
      if (mapping.keywords.some(keyword => term.includes(keyword))) {
        return mapping;
      }
    }

    // Fuzzy matching for common misspellings or variations
    const fuzzyMappings = {
      'radio': ['raidio', 'radyo', 'radiio'],
      'gaming': ['gamng', 'gmaing', 'gayming'],
      'training': ['trainng', 'traning', 'trainin'],
      'workshop': ['workship', 'worshop', 'workshp'],
      'joystick': ['joystic', 'joistick', 'jostick'],
      'programmes': ['programs', 'programes', 'programmes']
    };

    for (const [correct, variants] of Object.entries(fuzzyMappings)) {
      if (variants.some(variant => term.includes(variant))) {
        return this.findBestMatch(correct);
      }
    }

    return null;
  }

  private static extractGoogleSearchQuery(referrer: string): string | null {
    try {
      const url = new URL(referrer);
      return url.searchParams.get('q') || null;
    } catch {
      return null;
    }
  }

  // Track user interests for future visits with duplicate prevention
  static trackInterest(interest: string, page: string | any) {
    // Handle both string and object page parameters
    const pageStr = typeof page === 'string' ? page : page?.path || window.location.pathname;
    
    // Create unique key to prevent duplicates
    const trackingKey = `${interest}_${pageStr}_${Date.now()}`;
    const recentKey = `${interest}_${pageStr}`;
    
    // Check if we've tracked this recently (within 1 second)
    const lastTrackTime = this.recentAnalytics.get(recentKey);
    if (lastTrackTime && Date.now() - lastTrackTime < 1000) {
      return; // Skip duplicate
    }
    
    // Update tracking timestamp
    this.recentAnalytics.set(recentKey, Date.now());
    
    // Clean old entries (keep only last 10 minutes)
    const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
    for (const [key, timestamp] of this.recentAnalytics.entries()) {
      if (timestamp < tenMinutesAgo) {
        this.recentAnalytics.delete(key);
      }
    }

    localStorage.setItem('ww_last_interest', interest);
    localStorage.setItem('ww_last_page', pageStr);
    
    // Update visit count
    const visitCount = parseInt(localStorage.getItem('ww_visit_count') || '0') + 1;
    localStorage.setItem('ww_visit_count', visitCount.toString());

    // Send analytics with error handling
    this.sendAnalytics('interest_tracked', {
      interest,
      page: pageStr,
      visitCount,
      timestamp: Date.now()
    });
  }

  // Generate smart welcome messages based on context
  static generateWelcomeMessage(context: {
    isFirstVisit: boolean;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
    suggestedPath?: string;
    referralSource?: string;
  }): string {
    const { isFirstVisit, timeOfDay, suggestedPath, referralSource } = context;
    
    const greetings = {
      morning: "Good morning!",
      afternoon: "Good afternoon!",
      evening: "Good evening!"
    };

    let message = greetings[timeOfDay];

    if (isFirstVisit) {
      message += " Welcome to Wembley Wonders.";
    } else {
      message += " Welcome back to Wembley Wonders.";
    }

    if (referralSource === 'google') {
      message += " Found us through search?";
    } else if (referralSource === 'word_of_mouth') {
      message += " Someone recommended us?";
    }

    if (suggestedPath) {
      message += " We think we know what you're looking for.";
    } else {
      message += " Let us help you find what you need.";
    }

    return message;
  }

  // Smart redirect for direct URLs that might be confusing
  static handleSmartRedirects(currentPath: string): string | null {
    const redirectMappings: Record<string, string> = {
      '/community-radio': '/raydyo',
      '/broadcasting': '/raydyo',
      '/gaming': '/joystick',
      '/games': '/joystick',
      '/training': '/workshops',
      '/learn': '/workshops',
      '/classes': '/workshops',
      '/courses': '/workshops',
      '/skills': '/workshops',
      '/register': '/signup',
      '/apply': '/membership',
      '/join': '/membership',
      '/help': '/contact',
      '/support': '/contact',
      '/faq': '/contact',
      '/store': '/shop',
      '/marketplace': '/shop',
      '/events': '/calendar',
      '/activities': '/calendar',
      '/schedule': '/calendar',
      '/programs': '/programmes',
      '/what-we-do': '/programmes',
      '/services': '/programmes'
    };

    return redirectMappings[currentPath] || null;
  }

  private static sendAnalytics(event: string, data: any) {
    // Skip analytics in development mode
    if (import.meta.env.DEV) {
      console.log('Analytics (dev mode):', event, data);
      return;
    }

    try {
      // Example: Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', event, data);
      }

      // Example: Custom analytics (only in production)
      if (import.meta.env.PROD) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            event, 
            data, 
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent.substring(0, 100) // Truncate for privacy
          })
        }).catch((error) => {
          // Silent fail for analytics - don't break user experience
          console.warn('Analytics failed:', error.message);
        });
      }
    } catch (error) {
      // Silent fail for analytics
      console.warn('Analytics error:', error);
    }
  }

  // Generate dynamic content based on referral context
  static getContextualContent(trackingId: string) {
    const content = {
      radio_referral: {
        heroImage: '/images/raydyo-studio.jpg',
        ctaText: 'Get on Air Today',
        testimonial: '"I started as a listener and now I host my own show!" - Marcus, Local Presenter'
      },
      gaming_referral: {
        heroImage: '/images/joystick-magazine.jpg', 
        ctaText: 'Read Latest Issue',
        testimonial: '"Joystick Magazine captures the heart of local gaming culture!" - Sarah, Regular Reader'
      },
      training_referral: {
        heroImage: '/images/workshop-session.jpg',
        ctaText: 'Book Your Workshop',
        testimonial: '"These workshops changed my career prospects completely." - David, Recent Graduate'
      },
      membership_referral: {
        heroImage: '/images/community-meeting.jpg',
        ctaText: 'Start Your Membership',
        testimonial: '"Being a member has given me purpose and new friends." - Lisa, Community Member'
      },
      shop_referral: {
        heroImage: '/images/community-shop.jpg',
        ctaText: 'Shop Now',
        testimonial: '"Love supporting local creators through the community shop!" - Ahmed, Regular Customer'
      },
      events_referral: {
        heroImage: '/images/community-events.jpg',
        ctaText: 'See Events',
        testimonial: '"There\'s always something interesting happening here!" - Maria, Event Attendee'
      }
    };

    return content[trackingId as keyof typeof content] || null;
  }
}

function gtag(arg0: string, event: string, data: any) {
  throw new Error("Function not implemented.");
}
