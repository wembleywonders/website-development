/**
 * WEMBLEY WONDERS MARKETPLACE
 * 
 * Central export file for the marketplace module.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * Flat 2, 452 High Road, Wembley HA9 7AY
 */

// ============================================================
// TYPES
// ============================================================
export type {
  // Core types
  ProgrammeId,
  ItemType,
  ProductCategory,
  ServiceCategory,
  DeliveryMethod,
  
  // Product types
  Product,
  ProductVariant,
  ProductPricing,
  
  // Service types
  Service,
  ServicePackage,
  ServicePricing,
  
  // Creator types
  CreatorProfile,
  CompletedProgramme,
  
  // Commerce types
  CartItem,
  Order,
  OrderItem,
  Review,
  Address,
  
  // Analytics types
  CreatorAnalytics,
  
  // ROV types
} from './types';

// ============================================================
// DATA & CONFIGURATION
// ============================================================
export {
  // Programme information
  PROGRAMME_INFO,
  
  // Single programme products/services
  SINGLE_PROGRAMME_PRODUCTS,
  
  // Skill combinations
  SKILL_COMBINATIONS,
  
  // Workshop skills progression
  WORKSHOP_SKILLS,
  
  // Utility functions
  getAvailableCombinations,
  getSuggestedNextProgramme
} from './data/skillCombinations';
import canCreateCombinationListing from './data/skillCombinations';

export {
  // Sample data for development/testing
  SAMPLE_CREATORS,
  SAMPLE_PRODUCTS,
  SAMPLE_SERVICES
} from './data/sampleData';
import getCreatorNames from './data/sampleData';
import SAMPLE_ANALYTICS from './data/sampleData';
export { getCreatorNames, SAMPLE_ANALYTICS };

// ============================================================
// STORES (State Management)
// ============================================================
export { useMarketplaceStore } from './stores/marketplaceStore';
import MarketplaceState from './stores/marketplaceStore';
export type { MarketplaceState };

// ============================================================
// ROV (AI Guidance)
// ============================================================
export {
  // Main ROV functions
  getListingFormTips,
  getPricingGuidance,
  getListingPrompts,
  
  // Types
  type PricingGuidance
} from './rovs/marketplaceROV';

export { default as MayaMarketplaceResponse } from './rovs/MarketplaceMayaROV';
export { default as MarketplaceMayaROV } from './rovs/MarketplaceMayaROV';

// ============================================================
// INTEGRATIONS
// ============================================================
export {
  // Cyberstore integration
  calculateRevenueSplit,
  calculateShipping,
  calculateCheckoutTotals,
  
  // Types
  type CyberstoreCartItem
} from './integrations/cyberstoreIntegration';
import CyberstoreProduct from './integrations/cyberstoreIntegration';
import CheckoutTotals from './integrations/cyberstoreIntegration';
import syncProductToCyberstore from './integrations/cyberstoreIntegration';
import syncServiceToCyberstore from './integrations/cyberstoreIntegration';
import ShippingInfo from './integrations/cyberstoreIntegration';
import RevenueSplitResult from './integrations/cyberstoreIntegration';
export { CyberstoreProduct, CheckoutTotals, syncProductToCyberstore, syncServiceToCyberstore, ShippingInfo, RevenueSplitResult };

import getCreatorJourneyStage from './integrations/programmeJourneyIntegration';
import JourneyStage from './integrations/programmeJourneyIntegration';
export {
  // Programme journey integration
  calculateJourneyProgress
} from './integrations/programmeJourneyIntegration';
import Milestone from './integrations/programmeJourneyIntegration';
import JourneyProgress from './integrations/programmeJourneyIntegration';
import getNextMilestone from './integrations/programmeJourneyIntegration';
export { getCreatorJourneyStage, getNextMilestone, JourneyStage, JourneyProgress, Milestone };

import getUserMarketplaceContext from './integrations/userJourneyIntegration';
import getPersonalizedRecommendations from './integrations/userJourneyIntegration';
import trackMarketplaceEvent from './integrations/userJourneyIntegration';
import UserMarketplaceContext from './integrations/userJourneyIntegration';
import Recommendation from './integrations/userJourneyIntegration';
import MarketplaceEvent from './integrations/userJourneyIntegration';
export { Recommendation };
export { getPersonalizedRecommendations, trackMarketplaceEvent, UserMarketplaceContext, MarketplaceEvent };

// ============================================================
// COMPONENTS
// ============================================================

// Product & Service Cards
export { ProductCard, type ProductCardProps } from './components/ProductCard';
export { ServiceCard, type ServiceCardProps } from './components/ServiceCard';

// Creator Components
export { CreatorProfileCard, type CreatorProfileCardProps } from './components/CreatorProfileCard';
export { CreatorDashboard, type CreatorDashboardProps } from './components/CreatorDashboard';

// Skill & Programme Components
export { SkillUnlocks, type SkillUnlocksProps } from './components/SkillUnlocks';
export { WorkshopMarketplaceBridge, type WorkshopMarketplaceBridgeProps } from './components/WorkshopMarketplaceBridge';

// Forms & Wizards
export { ProductListingForm, type ProductListingFormProps } from './components/ProductListingForm';
export { ListingWizard, type ListingWizardProps, type ListingData } from './components/ListingWizard';

// Commerce Components
export { Checkout, type CheckoutProps, type CheckoutOrderData } from './components/Checkout';

// Discovery & Collaboration
export { CollaborationFinder, type CollaborationFinderProps } from './components/CollaborationFinder';

// ============================================================
// PAGES
// ============================================================
export { 
  MarketplaceHome, 
  type MarketplaceHomeProps,
  type SearchFilters 
} from './pages/MarketplaceHome';

// ============================================================
// CONSTANTS
// ============================================================
export const MARKETPLACE_CONFIG = {
  // Revenue split percentages
  REVENUE_SPLIT: {
    PRODUCT: { creator: 0.55, community: 0.25, operations: 0.20 },
    SERVICE: { creator: 0.60, community: 0.20, operations: 0.20 },
    PACKAGE: { creator: 0.58, community: 0.22, operations: 0.20 }
  },
  
  // Shipping thresholds
  SHIPPING: {
    FREE_THRESHOLD: 30,
    LOCAL_RATE: 3.99,
    UK_RATE: 5.99,
    INTERNATIONAL_RATE: 12.99
  },
  
  // Platform limits
  LIMITS: {
    MAX_IMAGES_PER_LISTING: 10,
    MAX_VARIANTS_PER_PRODUCT: 20,
    MAX_PACKAGES_PER_SERVICE: 5,
    MIN_PRICE: 0.99,
    MAX_PRICE: 10000
  },
  
  // Badge thresholds
  BADGES: {
    RISING_STAR_SALES: 10,
    TOP_SELLER_SALES: 50,
    SUPER_SELLER_SALES: 100,
    VERIFIED_RATING: 4.5,
    VERIFIED_REVIEWS: 10
  }
} as const;

// ============================================================
// VERSION
// ============================================================
export const MARKETPLACE_VERSION = '1.0.0';