/**
 * MARKETPLACE ROV
 * 
 * Context-aware guidance system for marketplace interactions.
 * Provides tips, warnings, and suggestions based on user state.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { ProgrammeId } from '../types';
import { PROGRAMME_INFO, SINGLE_PROGRAMME_PRODUCTS, WORKSHOP_SKILLS } from '../data/skillCombinations';

// ============================================
// TYPES
// ============================================

export interface ROVContext {
  userId?: string;
  completedProgrammes: ProgrammeId[];
  workshopsCompleted: Record<ProgrammeId, number>;
  hasListings: boolean;
  totalSales: number;
  totalEarnings: number;
  averageRating: number;
  currentPage: 'home' | 'browse' | 'product' | 'service' | 'cart' | 'checkout' | 'dashboard' | 'listing-form';
  cartItemCount: number;
  isNewUser: boolean;
}

export interface ROVMessage {
  id: string;
  type: 'tip' | 'warning' | 'success' | 'info' | 'encouragement';
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  dismissible: boolean;
  priority: 'low' | 'medium' | 'high';
}

// ============================================
// MESSAGE GENERATORS
// ============================================

export function getWelcomeMessage(context: ROVContext): ROVMessage | null {
  if (context.isNewUser) {
    return {
      id: 'welcome-new',
      type: 'info',
      title: 'Welcome to the Marketplace!',
      message: 'This is where Wembley Wonders creators sell their products and services. Complete a programme to start selling your own.',
      action: {
        label: 'Explore Programmes',
        href: '/programmes'
      },
      dismissible: true,
      priority: 'medium'
    };
  }
  
  if (context.completedProgrammes.length > 0 && !context.hasListings) {
    const programme = PROGRAMME_INFO[context.completedProgrammes[0]];
    return {
      id: 'welcome-ready-to-sell',
      type: 'encouragement',
      title: `Ready to start selling, ${programme.shortName} graduate?`,
      message: `You've completed ${programme.name}. Time to list your first product or service!`,
      action: {
        label: 'Create First Listing',
        href: '/marketplace/new'
      },
      dismissible: true,
      priority: 'high'
    };
  }
  
  return null;
}

export function getListingFormTips(context: ROVContext, formState: {
  programmeId?: ProgrammeId;
  price?: number;
  hasImages: boolean;
  descriptionLength: number;
  type: 'product' | 'service';
}): ROVMessage[] {
  const tips: ROVMessage[] = [];
  
  // Programme-specific tips
  if (formState.programmeId) {
    const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
      p => p.programmeId === formState.programmeId
    );
    
    if (programmeProducts) {
      const typicalPricing = formState.type === 'product' 
        ? programmeProducts.typicalPricing.products
        : programmeProducts.typicalPricing.services;
      
      if (formState.price && formState.price < typicalPricing.min) {
        tips.push({
          id: 'price-low',
          type: 'warning',
          title: 'Price might be too low',
          message: `Similar ${formState.type}s typically sell for £${typicalPricing.min}-£${typicalPricing.max}. You're valuing your skills and time!`,
          dismissible: true,
          priority: 'medium'
        });
      }
      
      if (formState.price && formState.price > typicalPricing.max * 2) {
        tips.push({
          id: 'price-high',
          type: 'info',
          title: 'Premium pricing',
          message: `This is above typical prices. Make sure your description clearly explains the premium value.`,
          dismissible: true,
          priority: 'low'
        });
      }
    }
  }
  
  // Image tips
  if (!formState.hasImages) {
    tips.push({
      id: 'no-images',
      type: 'warning',
      title: 'Add images',
      message: 'Listings with images get 3x more views. Show off your work!',
      dismissible: true,
      priority: 'high'
    });
  }
  
  // Description tips
  if (formState.descriptionLength < 100) {
    tips.push({
      id: 'short-description',
      type: 'tip',
      title: 'Expand your description',
      message: 'Detailed descriptions help buyers understand what they\'re getting. Aim for at least 100 characters.',
      dismissible: true,
      priority: 'medium'
    });
  }
  
  return tips;
}

export function getDashboardInsights(context: ROVContext): ROVMessage[] {
  const insights: ROVMessage[] = [];
  
  // No sales yet
  if (context.hasListings && context.totalSales === 0) {
    insights.push({
      id: 'no-sales',
      type: 'tip',
      title: 'Get your first sale',
      message: 'Share your listings with your network. First sales often come from people who already know you.',
      action: {
        label: 'View Listings',
        href: '/marketplace/dashboard/listings'
      },
      dismissible: true,
      priority: 'high'
    });
  }
  
  // Celebrate milestones
  if (context.totalSales === 1) {
    insights.push({
      id: 'first-sale',
      type: 'success',
      title: '🎉 First sale!',
      message: 'You did it! Your first sale is the hardest. Keep building momentum.',
      dismissible: true,
      priority: 'high'
    });
  }
  
  if (context.totalSales === 10) {
    insights.push({
      id: 'ten-sales',
      type: 'success',
      title: '🎉 10 sales!',
      message: 'Double digits! You\'re building a real customer base.',
      dismissible: true,
      priority: 'high'
    });
  }
  
  if (context.totalEarnings >= 100 && context.totalEarnings < 150) {
    insights.push({
      id: 'hundred-pounds',
      type: 'success',
      title: '💷 £100 earned!',
      message: 'Your first hundred pounds from your creative work. This is just the beginning.',
      dismissible: true,
      priority: 'high'
    });
  }
  
  // Suggest second programme
  if (context.completedProgrammes.length === 1 && context.totalSales >= 5) {
    insights.push({
      id: 'suggest-second-programme',
      type: 'tip',
      title: 'Unlock power combinations',
      message: 'Complete a second programme to unlock skill combinations and premium pricing.',
      action: {
        label: 'Explore Programmes',
        href: '/programmes'
      },
      dismissible: true,
      priority: 'medium'
    });
  }
  
  // Rating insights
  if (context.averageRating >= 4.8 && context.totalSales >= 10) {
    insights.push({
      id: 'excellent-rating',
      type: 'success',
      title: '⭐ Excellent reputation',
      message: `${context.averageRating} average rating! Your quality shows.`,
      dismissible: true,
      priority: 'low'
    });
  }
  
  return insights;
}

export function getWorkshopToMarketplacePrompt(
  programmeId: ProgrammeId,
  workshopNumber: number
): ROVMessage | null {
  const workshopData = WORKSHOP_SKILLS[programmeId];
  if (!workshopData) return null;
  
  const workshop = workshopData.find(w => w.workshopNumber === workshopNumber);
  if (!workshop || workshop.canSellAfter.length === 0) return null;
  
  return {
    id: `workshop-${programmeId}-${workshopNumber}-complete`,
    type: 'success',
    title: `Workshop ${workshopNumber} Complete!`,
    message: `You can now sell: ${workshop.canSellAfter.join(', ')}`,
    action: {
      label: 'Create Listing',
      href: '/marketplace/new'
    },
    dismissible: true,
    priority: 'high'
  };
}

export function getCartMessages(context: ROVContext): ROVMessage[] {
  const messages: ROVMessage[] = [];
  
  if (context.cartItemCount > 0 && context.currentPage === 'cart') {
    messages.push({
      id: 'cart-community-fund',
      type: 'info',
      title: 'Supporting the community',
      message: '25% of product sales and 20% of service bookings fund free workshops for others.',
      dismissible: true,
      priority: 'low'
    });
  }
  
  return messages;
}

// ============================================
// PRICING GUIDANCE
// ============================================

export interface PricingGuidance {
  min: number;
  max: number;
  typical: number;
  factors: string[];
}

export function getPricingGuidance(
  programmeId: ProgrammeId,
  type: 'product' | 'service',
  category?: string
): PricingGuidance {
  const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
    p => p.programmeId === programmeId
  );
  
  if (!programmeProducts) {
    return {
      min: type === 'product' ? 10 : 50,
      max: type === 'product' ? 200 : 500,
      typical: type === 'product' ? 50 : 150,
      factors: ['Quality of work', 'Time investment', 'Market demand']
    };
  }
  
  const pricing = type === 'product' 
    ? programmeProducts.typicalPricing.products
    : programmeProducts.typicalPricing.services;
  
  const factors: string[] = [];
  
  switch (programmeId) {
    case 'trubble-n-bass':
      factors.push(
        'Complexity of production',
        'Exclusivity (lease vs exclusive)',
        'Stems included',
        'Commercial rights'
      );
      break;
    case 'silk-stilettos':
      factors.push(
        'Materials used',
        'Construction complexity',
        'Custom vs ready-made',
        'Time to create'
      );
      break;
    case 'techreneurs':
      factors.push(
        'Project complexity',
        'Ongoing maintenance',
        'Custom features',
        'Support included'
      );
      break;
    default:
      factors.push(
        'Quality of work',
        'Time investment',
        'Experience level',
        'Market demand'
      );
  }
  
  return {
    min: pricing.min,
    max: pricing.max,
    typical: Math.round((pricing.min + pricing.max) / 2),
    factors
  };
}

// ============================================
// LISTING PROMPTS BY PROGRAMME
// ============================================

export function getListingPrompts(programmeId: ProgrammeId): {
  products: string[];
  services: string[];
  tips: string[];
} {
  const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
    p => p.programmeId === programmeId
  );
  
  if (!programmeProducts) {
    return {
      products: ['Digital products', 'Physical items'],
      services: ['Consulting', 'Custom work'],
      tips: ['Start with what you know best', 'Price your time fairly']
    };
  }
  
  const tips: string[] = [];
  
  switch (programmeId) {
    case 'trubble-n-bass':
      tips.push(
        'Offer both lease and exclusive options',
        'Include preview snippets for beats',
        'Bundle related items (e.g., drum kit + loop pack)',
        'Clearly state BPM and key'
      );
      break;
    case 'silk-stilettos':
      tips.push(
        'Show items on real people when possible',
        'Include size guides',
        'Mention sustainable/upcycled materials',
        'Offer custom sizing options'
      );
      break;
    case 'techreneurs':
      tips.push(
        'Include demo/preview links',
        'List technologies used',
        'Offer maintenance retainers',
        'Show before/after for redesigns'
      );
      break;
    case 'gtechcasters':
      tips.push(
        'Include audio samples',
        'Offer package deals (e.g., 4 episodes)',
        'Highlight turnaround times',
        'Show equipment quality'
      );
      break;
    case 'auntie-anansis-kitchen':
      tips.push(
        'Include allergen information',
        'Show plated presentation',
        'Mention dietary options',
        'Highlight cultural significance'
      );
      break;
    default:
      tips.push(
        'Start with what you know best',
        'Price your time fairly',
        'Include clear deliverables',
        'Add portfolio examples'
      );
  }
  
  return {
    products: programmeProducts.products,
    services: programmeProducts.services,
    tips
  };
}

// ============================================
// EXPORT
// ============================================

export default {
  getWelcomeMessage,
  getListingFormTips,
  getDashboardInsights,
  getWorkshopToMarketplacePrompt,
  getCartMessages,
  getPricingGuidance,
  getListingPrompts
};
