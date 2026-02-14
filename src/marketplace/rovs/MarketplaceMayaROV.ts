/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MARKETPLACE MAYA ROV
 * 
 * Maya AI assistant integration for marketplace guidance.
 * Context-aware messages, celebrations, and proactive help.
 * 
 * UPDATED: Integrated with Children of Anansi framework
 * 
 * Key children for marketplace:
 * - Kweku (🎯) - Business validation, pricing strategy
 * - Ntikuma (📊) - Financial tracking, analytics
 * - Afua (🎙️) - Product descriptions, storytelling
 * - Akua (📜) - Terms, contracts, rights protection
 * - Adaeze (✂️) - Visual presentation, product photography
 */

import type { ActiveChild } from '../../maya/types/mayaTypes';

// ============================================
// TYPES
// ============================================

export type ProgrammeId = 
  | 'stemgineers' 
  | 'techreneurs' 
  | 'pageturners' 
  | 'kaywana' 
  | 'gtechcasters';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  creatorId: string;
}

export interface Service {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  creatorId: string;
}

export interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total: number;
  createdAt: Date;
}

export interface CreatorProfile {
  id: string;
  displayName: string;
  completedProgrammes: ProgrammeId[];
  rating: number;
  totalSales: number;
  totalEarnings: number;
}

export interface MayaContext {
  userId: string;
  completedProgrammes: ProgrammeId[];
  currentPage: MayaPage;
  products: Product[];
  services: Service[];
  orders: Order[];
  profile: CreatorProfile | null;
  sessionData: {
    timeOnPage: number;
    actionsThisSession: string[];
    lastAction?: string;
  };
}

export type MayaPage = 
  | 'home'
  | 'browse'
  | 'dashboard'
  | 'dashboard-listings'
  | 'dashboard-orders'
  | 'dashboard-analytics'
  | 'dashboard-collaborations'
  | 'listing-form'
  | 'checkout'
  | 'orders'
  | 'collaborations'
  | 'skills'
  | 'product-detail'
  | 'service-detail'
  | 'creator-profile';

export interface MayaMessage {
  id: string;
  content: string;
  type: 'greeting' | 'tip' | 'encouragement' | 'warning' | 'celebration' | 'question' | 'guidance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  actions?: MayaAction[];
  followUp?: string;
  dismissible: boolean;
  /** Which child should speak this message */
  speaker?: ActiveChild;
  /** Domain for tracking */
  domain?: string;
}

export interface MayaAction {
  label: string;
  type: 'link' | 'action' | 'dismiss';
  href?: string;
  actionId?: string;
}

// ============================================
// PROGRAMME INFO
// ============================================

export const PROGRAMME_INFO: Record<ProgrammeId, {
  name: string;
  shortName: string;
  emoji: string;
  marketplaceCategories: string[];
}> = {
  stemgineers: {
    name: 'STEMgineers',
    shortName: 'STEM',
    emoji: '🔧',
    marketplaceCategories: ['electronics', 'robotics', 'engineering', '3d-printing']
  },
  techreneurs: {
    name: 'TECHreneurs',
    shortName: 'Tech',
    emoji: '💼',
    marketplaceCategories: ['digital-products', 'templates', 'consulting', 'coaching']
  },
  pageturners: {
    name: 'PageTurners',
    shortName: 'Pages',
    emoji: '📚',
    marketplaceCategories: ['writing', 'editing', 'storytelling', 'content']
  },
  kaywana: {
    name: "Kaywana's Court",
    shortName: 'Kaywana',
    emoji: '🎭',
    marketplaceCategories: ['performance', 'drama', 'voice', 'presentation']
  },
  gtechcasters: {
    name: 'G-Tech Casters',
    shortName: 'Casters',
    emoji: '🎙️',
    marketplaceCategories: ['podcasting', 'audio', 'broadcasting', 'media']
  }
};

// ============================================
// CHILD EXPERTISE FOR MARKETPLACE
// ============================================

interface ChildMarketplaceExpertise {
  topics: string[];
  helpsWith: string[];
  avoidFor: string[];
}

const CHILD_MARKETPLACE_EXPERTISE: Partial<Record<ActiveChild, ChildMarketplaceExpertise>> = {
  kweku: {
    topics: ['pricing', 'business model', 'target audience', 'competition', 'value proposition'],
    helpsWith: ['Pricing strategy', 'Market validation', 'Business planning', 'Revenue optimization'],
    avoidFor: ['emotional support', 'creative writing', 'technical issues']
  },
  ntikuma: {
    topics: ['analytics', 'sales data', 'revenue', 'tax', 'budgeting', 'financial planning'],
    helpsWith: ['Sales tracking', 'Tax set-aside', 'Pricing analysis', 'Financial projections'],
    avoidFor: ['creative decisions', 'emotional support', 'marketing copy']
  },
  afua: {
    topics: ['description', 'story', 'copy', 'narrative', 'voice', 'branding'],
    helpsWith: ['Product descriptions', 'Brand storytelling', 'Marketing copy', 'Finding your voice'],
    avoidFor: ['pricing', 'technical issues', 'legal matters']
  },
  akua: {
    topics: ['terms', 'contracts', 'rights', 'copyright', 'licensing', 'legal'],
    helpsWith: ['Terms of service', 'Licensing decisions', 'Copyright protection', 'Contract review'],
    avoidFor: ['pricing', 'creative decisions', 'emotional support']
  },
  adaeze: {
    topics: ['images', 'photography', 'visual', 'presentation', 'design', 'aesthetic'],
    helpsWith: ['Product photography', 'Visual presentation', 'Design feedback', 'Brand aesthetics'],
    avoidFor: ['pricing', 'legal matters', 'technical issues']
  },
  kofi: {
    topics: ['prototype', 'build', 'technical', 'making', 'materials'],
    helpsWith: ['Product development', 'Technical specifications', 'Prototype iteration'],
    avoidFor: ['pricing', 'marketing', 'legal matters']
  }
};

/**
 * Get the best child to handle a marketplace topic
 */
export function getChildForMarketplaceTopic(topic: string): ActiveChild {
  const lowerTopic = topic.toLowerCase();
  
  for (const [childId, expertise] of Object.entries(CHILD_MARKETPLACE_EXPERTISE)) {
    if (expertise.topics.some(t => lowerTopic.includes(t))) {
      return childId as ActiveChild;
    }
  }
  
  // Default to Kweku for general marketplace business questions
  return 'kweku';
}

// ============================================
// TIME-BASED GREETINGS
// ============================================

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

function getGreeting(name?: string): string {
  const timeOfDay = getTimeOfDay();
  const nameStr = name ? `, ${name}` : '';
  
  const greetings = {
    morning: [
      `Good morning${nameStr}! ☀️`,
      `Morning${nameStr}! Ready to create?`,
      `Rise and shine${nameStr}! 🌅`
    ],
    afternoon: [
      `Good afternoon${nameStr}! 👋`,
      `Hey${nameStr}! How's your day going?`,
      `Afternoon${nameStr}! 🌤️`
    ],
    evening: [
      `Good evening${nameStr}! 🌙`,
      `Evening${nameStr}! Still creating?`,
      `Hey${nameStr}! Burning the midnight oil? 🦉`
    ]
  };
  
  const options = greetings[timeOfDay];
  return options[Math.floor(Math.random() * options.length)];
}

// ============================================
// SKILL COMBINATIONS
// ============================================

interface SkillCombination {
  id: string;
  name: string;
  requires: ProgrammeId[];
  unlocks: string[];
  description: string;
}

const SKILL_COMBINATIONS: SkillCombination[] = [
  {
    id: 'tech-content',
    name: 'Tech Content Creator',
    requires: ['techreneurs', 'gtechcasters'],
    unlocks: ['Tech tutorials', 'Course creation', 'Podcast coaching'],
    description: 'Create and monetize technical educational content'
  },
  {
    id: 'storytech',
    name: 'StoryTech Producer',
    requires: ['pageturners', 'gtechcasters'],
    unlocks: ['Audiobook production', 'Story podcasts', 'Audio dramas'],
    description: 'Bring stories to life through audio'
  },
  {
    id: 'maker-business',
    name: 'Maker Entrepreneur',
    requires: ['stemgineers', 'techreneurs'],
    unlocks: ['Product business', 'Hardware startups', 'Maker consulting'],
    description: 'Build and sell physical products'
  },
  {
    id: 'performance-media',
    name: 'Performance Media',
    requires: ['kaywana', 'gtechcasters'],
    unlocks: ['Voice acting', 'Dramatic podcasts', 'Audio theatre'],
    description: 'Performance skills for digital media'
  },
  {
    id: 'creative-business',
    name: 'Creative Business',
    requires: ['kaywana', 'techreneurs'],
    unlocks: ['Workshop facilitation', 'Creative consulting', 'Performance coaching'],
    description: 'Monetize creative and performance skills'
  }
];

export function getAvailableCombinations(completedProgrammes: ProgrammeId[]): SkillCombination[] {
  return SKILL_COMBINATIONS.filter(combo =>
    combo.requires.every(req => completedProgrammes.includes(req))
  );
}

export function getSuggestedNextProgramme(completedProgrammes: ProgrammeId[]): Array<{
  programmeId: ProgrammeId;
  unlocksCount: number;
  unlocks: string[];
}> {
  const allProgrammes: ProgrammeId[] = ['stemgineers', 'techreneurs', 'pageturners', 'kaywana', 'gtechcasters'];
  const notCompleted = allProgrammes.filter(p => !completedProgrammes.includes(p));
  
  const suggestions = notCompleted.map(programmeId => {
    const potentialCombos = SKILL_COMBINATIONS.filter(combo => {
      const withNew = [...completedProgrammes, programmeId];
      return combo.requires.every(req => withNew.includes(req)) &&
             !combo.requires.every(req => completedProgrammes.includes(req));
    });
    
    return {
      programmeId,
      unlocksCount: potentialCombos.length,
      unlocks: potentialCombos.flatMap(c => c.unlocks).slice(0, 3)
    };
  });
  
  return suggestions.sort((a, b) => b.unlocksCount - a.unlocksCount);
}

// ============================================
// PAGE-SPECIFIC GUIDANCE
// ============================================

export function getPageGuidance(context: MayaContext): MayaMessage | null {
  const { currentPage, completedProgrammes, products, services, profile } = context;
  
  switch (currentPage) {
    case 'home':
      if (completedProgrammes.length === 0) {
        return {
          id: 'home-no-programmes',
          content: `${getGreeting()} Welcome to the marketplace! This is where our creators sell their work. Complete a programme to join them.`,
          type: 'greeting',
          priority: 'medium',
          speaker: 'maya',
          actions: [
            { label: 'Explore Programmes', type: 'link', href: '/programmes' }
          ],
          dismissible: true
        };
      }
      
      if (completedProgrammes.length > 0 && products.length === 0 && services.length === 0) {
        return {
          id: 'home-ready-to-sell',
          content: `${getGreeting()} You've completed ${PROGRAMME_INFO[completedProgrammes[0]].name}! Ready to list your first product or service?`,
          type: 'encouragement',
          priority: 'high',
          speaker: 'kweku',
          actions: [
            { label: 'Create Listing', type: 'link', href: '/marketplace/new' }
          ],
          dismissible: true
        };
      }
      
      return {
        id: 'home-welcome-back',
        content: `${getGreeting(profile?.displayName)} Good to see you in the marketplace!`,
        type: 'greeting',
        priority: 'low',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'browse':
      return {
        id: 'browse-tip',
        content: 'Use filters to find exactly what you need. Every purchase supports local creators and funds free workshops.',
        type: 'tip',
        priority: 'low',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'dashboard':
      if (products.length === 0 && services.length === 0) {
        return {
          id: 'dashboard-empty',
          content: "Your creator dashboard is ready! Let's get your first listing up. What would you like to sell?",
          type: 'guidance',
          priority: 'high',
          speaker: 'kweku',
          actions: [
            { label: 'Add Product', type: 'link', href: '/marketplace/new?type=product' },
            { label: 'Add Service', type: 'link', href: '/marketplace/new?type=service' }
          ],
          dismissible: true
        };
      }
      return null;
    
    case 'dashboard-listings':
      if (products.length + services.length < 3) {
        return {
          id: 'listings-tip',
          content: 'Creators with 3+ listings get 2x more visibility. Consider adding more variety!',
          type: 'tip',
          priority: 'medium',
          speaker: 'kweku',
          dismissible: true
        };
      }
      return null;
    
    case 'dashboard-orders':
      return {
        id: 'orders-tip',
        content: 'Quick responses build your reputation. Try to respond to all orders within 24 hours.',
        type: 'tip',
        priority: 'low',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'dashboard-analytics':
      return {
        id: 'analytics-tip',
        content: "I see patterns here. Your best-performing listings can tell us what to create next. Want me to analyze?",
        type: 'tip',
        priority: 'low',
        speaker: 'ntikuma',
        dismissible: true
      };
    
    case 'dashboard-collaborations':
      const combinations = getAvailableCombinations(completedProgrammes);
      if (combinations.length > 0) {
        return {
          id: 'collab-combinations',
          content: `You've unlocked ${combinations.length} skill combination${combinations.length > 1 ? 's' : ''}! Team up with other creators to offer unique packages.`,
          type: 'tip',
          priority: 'medium',
          speaker: 'kweku',
          actions: [
            { label: 'Find Collaborators', type: 'link', href: '/marketplace/collaborations/find' }
          ],
          dismissible: true
        };
      }
      return {
        id: 'collab-suggest',
        content: 'Collaborations multiply your reach. Find creators with complementary skills to yours.',
        type: 'tip',
        priority: 'low',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'listing-form':
      return {
        id: 'listing-form-help',
        content: "Don't overthink it - a clear title, honest description, and fair price makes a solid listing. I can help with each part.",
        type: 'guidance',
        priority: 'medium',
        speaker: 'afua',
        dismissible: true
      };
    
    case 'checkout':
      return {
        id: 'checkout-transparency',
        content: 'Thank you for supporting local creators! You can see exactly how your payment is split above.',
        type: 'tip',
        priority: 'low',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'skills':
      const suggestions = getSuggestedNextProgramme(completedProgrammes);
      if (suggestions.length > 0) {
        const top = suggestions[0];
        return {
          id: 'skills-suggestion',
          content: `Adding ${PROGRAMME_INFO[top.programmeId].name} would unlock ${top.unlocksCount} new skill combination${top.unlocksCount > 1 ? 's' : ''}: ${top.unlocks.join(', ')}.`,
          type: 'tip',
          priority: 'medium',
          speaker: 'kweku',
          actions: [
            { label: `Learn about ${PROGRAMME_INFO[top.programmeId].shortName}`, type: 'link', href: `/programmes/${top.programmeId}` }
          ],
          dismissible: true
        };
      }
      return null;
    
    default:
      return null;
  }
}

// ============================================
// CONTEXTUAL TIPS (with child speakers)
// ============================================

export function getContextualTip(
  tipContext: 'pricing-low' | 'pricing-high' | 'description-short' | 'no-images' | 'first-sale' | 'bad-review' | 'no-sales' | 'tax-reminder' | 'terms-missing'
): MayaMessage {
  switch (tipContext) {
    case 'pricing-low':
      return {
        id: 'tip-pricing-low',
        content: "Your price might be too low. You're valuing your skills and time here. What problem does this solve for the buyer?",
        type: 'warning',
        priority: 'medium',
        speaker: 'kweku',
        dismissible: true
      };
    
    case 'pricing-high':
      return {
        id: 'tip-pricing-high',
        content: "Premium pricing is fine if you can justify the value. Make sure your description and images match the price point.",
        type: 'tip',
        priority: 'low',
        speaker: 'kweku',
        dismissible: true
      };
    
    case 'description-short':
      return {
        id: 'tip-description',
        content: "This description needs more story. What makes this special? What transformation does the buyer get?",
        type: 'tip',
        priority: 'medium',
        speaker: 'afua',
        dismissible: true
      };
    
    case 'no-images':
      return {
        id: 'tip-images',
        content: "Listings with images get 3x more views. Even a phone photo is better than none - but good lighting makes a difference.",
        type: 'warning',
        priority: 'high',
        speaker: 'adaeze',
        dismissible: true
      };
    
    case 'first-sale':
      return {
        id: 'tip-first-sale',
        content: "Your first sale often comes from people who already know you. Share your listings with your network to get started.",
        type: 'tip',
        priority: 'medium',
        speaker: 'kweku',
        actions: [
          { label: 'Copy Listing Link', type: 'action', actionId: 'copy-link' }
        ],
        dismissible: true
      };
    
    case 'bad-review':
      return {
        id: 'tip-bad-review',
        content: "Every creator gets tough feedback sometimes. Take what's useful, respond professionally, and keep improving.",
        type: 'encouragement',
        priority: 'medium',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'no-sales':
      return {
        id: 'tip-no-sales',
        content: "No sales yet? Let's diagnose: 1) Is your audience seeing this? 2) Is the price right? 3) Do the images sell it?",
        type: 'guidance',
        priority: 'medium',
        speaker: 'kweku',
        dismissible: true
      };
    
    case 'tax-reminder':
      return {
        id: 'tip-tax-reminder',
        content: "I notice you've earned over £100 this month. Are you setting aside for tax? I recommend 29% minimum.",
        type: 'warning',
        priority: 'high',
        speaker: 'ntikuma',
        actions: [
          { label: 'Open Tax Calculator', type: 'link', href: '/finance/tax' }
        ],
        dismissible: true
      };
    
    case 'terms-missing':
      return {
        id: 'tip-terms',
        content: "Your listing doesn't have clear terms. What's your refund policy? Delivery timeline? Let's protect you properly.",
        type: 'warning',
        priority: 'medium',
        speaker: 'akua',
        dismissible: true
      };
  }
}

// ============================================
// MILESTONE CELEBRATIONS
// ============================================

export function getMilestoneCelebration(
  milestone: 'first-listing' | 'first-sale' | 'tenth-sale' | 'hundred-pounds' | 'thousand-pounds' | 'five-star' | 'new-combination',
  details?: Record<string, unknown>
): MayaMessage {
  switch (milestone) {
    case 'first-listing':
      return {
        id: 'celebrate-first-listing',
        content: "🎉 Your first listing is live! You're officially a Wembley Wonders creator. Share it with your network to get your first sale!",
        type: 'celebration',
        priority: 'high',
        speaker: 'maya',
        actions: [
          { label: 'Share Listing', type: 'action', actionId: 'share-listing' },
          { label: 'Add Another', type: 'link', href: '/marketplace/new' }
        ],
        dismissible: true
      };
    
    case 'first-sale':
      const saleDetails = details as { title?: string; price?: number; earnings?: number } | undefined;
      return {
        id: 'celebrate-first-sale',
        content: `🎉 FIRST SALE! "${saleDetails?.title || 'Your item'}" just sold for £${saleDetails?.price || '??'}. You earned £${saleDetails?.earnings || '??'}. This is just the beginning!`,
        type: 'celebration',
        priority: 'critical',
        speaker: 'maya',
        followUp: "The first sale is always the hardest. You've proven people will pay for your work. Keep going!",
        dismissible: true
      };
    
    case 'tenth-sale':
      return {
        id: 'celebrate-tenth-sale',
        content: "🎉 10 SALES! You're building a real customer base. The pattern is clear - this is working!",
        type: 'celebration',
        priority: 'high',
        speaker: 'ntikuma',
        dismissible: true
      };
    
    case 'hundred-pounds':
      return {
        id: 'celebrate-hundred',
        content: "💷 £100 EARNED! Your first hundred from your creative work. And 25% of that funded workshops for others!",
        type: 'celebration',
        priority: 'high',
        speaker: 'maya',
        dismissible: true
      };
    
    case 'thousand-pounds':
      return {
        id: 'celebrate-thousand',
        content: "💷💷💷 £1,000 EARNED! This is a real income stream now. That's £250 you've contributed to community workshops!",
        type: 'celebration',
        priority: 'critical',
        speaker: 'maya',
        followUp: "Time to think about tax strategy. Let me introduce you to Ntikuma.",
        dismissible: true
      };
    
    case 'five-star':
      return {
        id: 'celebrate-five-star',
        content: "⭐⭐⭐⭐⭐ A perfect 5-star review! Your quality is showing. This is worth documenting.",
        type: 'celebration',
        priority: 'high',
        speaker: 'yaw',
        dismissible: true
      };
    
    case 'new-combination':
      const comboDetails = details as { name?: string; unlocks?: string[] } | undefined;
      return {
        id: 'celebrate-combination',
        content: `🔓 NEW COMBINATION UNLOCKED: ${comboDetails?.name || 'Power Combo'}! You can now offer: ${comboDetails?.unlocks?.join(', ') || 'unique combined services'}.`,
        type: 'celebration',
        priority: 'high',
        speaker: 'kweku',
        actions: [
          { label: 'Explore Combinations', type: 'link', href: '/marketplace/skills' }
        ],
        dismissible: true
      };
  }
}

// ============================================
// PROACTIVE SUGGESTIONS
// ============================================

export function getProactiveSuggestion(context: MayaContext): MayaMessage | null {
  const { completedProgrammes, products, services, profile, orders } = context;
  
  // Suggest listing if graduated but no listings
  if (completedProgrammes.length > 0 && products.length === 0 && services.length === 0) {
    return {
      id: 'proactive-first-listing',
      content: `You've got the skills from ${PROGRAMME_INFO[completedProgrammes[0]].name}. Who's paying for this? Let's figure out your first listing.`,
      type: 'question',
      priority: 'high',
      speaker: 'kweku',
      actions: [
        { label: 'Create First Listing', type: 'link', href: '/marketplace/new' },
        { label: 'See What Others Sell', type: 'link', href: '/marketplace/browse' }
      ],
      dismissible: true
    };
  }
  
  // Suggest collaboration if multiple programmes
  if (completedProgrammes.length >= 2) {
    const combinations = getAvailableCombinations(completedProgrammes);
    if (combinations.length > 0) {
      return {
        id: 'proactive-collaboration',
        content: `With ${completedProgrammes.length} programmes completed, you've got ${combinations.length} skill combination${combinations.length > 1 ? 's' : ''} available. Have you explored collaboration opportunities?`,
        type: 'question',
        priority: 'medium',
        speaker: 'kweku',
        actions: [
          { label: 'Find Collaborators', type: 'link', href: '/marketplace/collaborations' }
        ],
        dismissible: true
      };
    }
  }
  
  // Suggest next programme
  if (completedProgrammes.length === 1 && (products.length > 0 || services.length > 0)) {
    const suggestions = getSuggestedNextProgramme(completedProgrammes);
    if (suggestions.length > 0) {
      const top = suggestions[0];
      return {
        id: 'proactive-next-programme',
        content: `Want to multiply your earning potential? Adding ${PROGRAMME_INFO[top.programmeId].name} would unlock ${top.unlocksCount} new skill combination${top.unlocksCount > 1 ? 's' : ''}.`,
        type: 'tip',
        priority: 'medium',
        speaker: 'kweku',
        actions: [
          { label: 'Learn More', type: 'link', href: `/programmes/${top.programmeId}` }
        ],
        dismissible: true
      };
    }
  }
  
  // Suggest services if only products
  if (products.length >= 2 && services.length === 0) {
    return {
      id: 'proactive-add-services',
      content: "Products are good, but services build relationships. Could you teach what you know? Consult? Coach?",
      type: 'tip',
      priority: 'low',
      speaker: 'kweku',
      actions: [
        { label: 'Add a Service', type: 'link', href: '/marketplace/new?type=service' }
      ],
      dismissible: true
    };
  }
  
  // Suggest products if only services
  if (services.length >= 2 && products.length === 0) {
    return {
      id: 'proactive-add-products',
      content: "Services trade time for money. Products can earn while you sleep. Could you package your knowledge into something sellable?",
      type: 'tip',
      priority: 'low',
      speaker: 'kweku',
      actions: [
        { label: 'Add a Product', type: 'link', href: '/marketplace/new?type=product' }
      ],
      dismissible: true
    };
  }
  
  // Tax reminder for earners
  if (profile && profile.totalEarnings > 500) {
    return {
      id: 'proactive-tax',
      content: `You've earned £${profile.totalEarnings.toLocaleString()}. Are you setting aside for tax? The numbers suggest you should have ~£${Math.round(profile.totalEarnings * 0.29)} in your tax pot.`,
      type: 'warning',
      priority: 'medium',
      speaker: 'ntikuma',
      actions: [
        { label: 'Check Tax Calculator', type: 'link', href: '/finance/tax' }
      ],
      dismissible: true
    };
  }
  
  return null;
}

// ============================================
// LISTING FORM FIELD GUIDANCE
// ============================================

export function getListingFieldGuidance(
  field: 'title' | 'description' | 'price' | 'images' | 'category' | 'terms'
): MayaMessage {
  switch (field) {
    case 'title':
      return {
        id: 'field-title',
        content: "Your title should say what it is AND who it's for. 'Logo Design' is okay. 'Logo Design for Food Startups' is better.",
        type: 'tip',
        priority: 'low',
        speaker: 'afua',
        dismissible: true
      };
    
    case 'description':
      return {
        id: 'field-description',
        content: "Tell a story: What problem does this solve? What does the buyer get? What's included? What's NOT included?",
        type: 'tip',
        priority: 'low',
        speaker: 'afua',
        dismissible: true
      };
    
    case 'price':
      return {
        id: 'field-price',
        content: "Price = Value delivered, not time spent. What's this worth to your buyer? What do competitors charge?",
        type: 'tip',
        priority: 'low',
        speaker: 'kweku',
        dismissible: true
      };
    
    case 'images':
      return {
        id: 'field-images',
        content: "Good lighting, clean background, multiple angles. Show the product in use if possible. First image is your thumbnail.",
        type: 'tip',
        priority: 'low',
        speaker: 'adaeze',
        dismissible: true
      };
    
    case 'category':
      return {
        id: 'field-category',
        content: "Choose the category where YOUR buyers would look, not just where you think it fits technically.",
        type: 'tip',
        priority: 'low',
        speaker: 'kweku',
        dismissible: true
      };
    
    case 'terms':
      return {
        id: 'field-terms',
        content: "Be clear about: refund policy, delivery timeline, revision limits, usage rights. This protects both you and the buyer.",
        type: 'tip',
        priority: 'medium',
        speaker: 'akua',
        dismissible: true
      };
  }
}

// ============================================
// MAIN GUIDANCE FUNCTION
// ============================================

export function getMayaGuidance(context: MayaContext): MayaMessage[] {
  const messages: MayaMessage[] = [];
  
  // Always try to add page-specific guidance
  const pageGuidance = getPageGuidance(context);
  if (pageGuidance) {
    messages.push(pageGuidance);
  }
  
  // Add proactive suggestion if we don't have page guidance
  if (!pageGuidance) {
    const proactive = getProactiveSuggestion(context);
    if (proactive) {
      messages.push(proactive);
    }
  }
  
  return messages;
}

// ============================================
// EXPORT
// ============================================

export const MarketplaceMayaROV = {
  getPageGuidance,
  getContextualTip,
  getMilestoneCelebration,
  getProactiveSuggestion,
  getMayaGuidance,
  getGreeting,
  getListingFieldGuidance,
  getChildForMarketplaceTopic,
  getAvailableCombinations,
  getSuggestedNextProgramme,
  PROGRAMME_INFO,
  CHILD_MARKETPLACE_EXPERTISE
};

export default MarketplaceMayaROV;