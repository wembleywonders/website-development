/**
 * WEMBLEY WONDERS MARKETPLACE TYPES
 * 
 * Complete type definitions for the creator economy system.
 * Products, services, creators, orders, and skill combinations.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import { ReactNode } from "react";

// ============================================
// SHARED TYPES
// ============================================

export type ItemType = 'product' | 'service' | 'package';

// ============================================
// PROGRAMME TYPES
// ============================================

export type ProgrammeId = 
  | 'trubble-n-bass'
  | 'silk-stilettos'
  | 'techreneurs'
  | 'gtechcasters'
  | 'kaywanas-court'
  | 'pageturners'
  | 'stemgeneers'
  | 'scrap-cat'
  | 'bright-sparks'
  | 'auntie-anansis-kitchen';

export interface ProgrammeInfo {
  id: ProgrammeId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  workshopsRequired: number;
}

// ============================================
// CREATOR TYPES
// ============================================

export interface CreatorProfile {
  id: string;
  userId: string;
  displayName: string;
  tagline: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  
  // Location
  location: {
    area: string;
    borough: string;
    postcode?: string;
    willingToTravel: boolean;
    travelRadius?: number; // miles
    canWorkRemote: boolean;
  };
  
  // Skills & Programmes
  completedProgrammes: CompletedProgramme[];
  activeSkills: Skill[];
  skillCombinations: SkillCombination[];
  
  // Portfolio
  portfolio: PortfolioItem[];
  featuredWork: string[]; // IDs of featured items
  
  // Marketplace
  products: string[]; // Product IDs
  services: string[]; // Service IDs
  packages: string[]; // Package IDs
  
  // Availability
  availability: 'available' | 'limited' | 'unavailable';
  responseTime: 'within-hours' | 'within-day' | 'within-week';
  
  // Ratings & Reviews
  ratings: {
    overall: number;
    quality: number;
    communication: number;
    reliability: number;
    totalReviews: number;
  };
  
  // Revenue
  revenueStats: {
    totalEarnings: number;
    thisMonth: number;
    lastMonth: number;
    byStream: {
      products: number;
      services: number;
      retainers: number;
      collaborations: number;
    };
  };
  
  // Collaboration
  openToCollaboration: boolean;
  collaborationInterests: ProgrammeId[];
  pastCollaborators: string[]; // Creator IDs
  
  // Meta
  joinedDate: Date;
  lastActive: Date;
  profileComplete: number; // percentage
  verified: boolean;
}

export interface CompletedProgramme {
  programmeId: ProgrammeId;
  completedDate: Date;
  certificateId?: string;
  level: 'foundation' | 'practitioner' | 'specialist';
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  programmeId: ProgrammeId;
  level: 1 | 2 | 3 | 4 | 5;
  verified: boolean;
  endorsements: number;
}

export interface SkillCombination {
  id: string;
  name: string;
  programmes: ProgrammeId[];
  description: string;
  unlocks: string[]; // What this combination enables
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'link';
  url: string;
  thumbnail?: string;
  programmeId?: ProgrammeId;
  skills: string[];
  createdDate: Date;
  featured: boolean;
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: string;
  creatorId: string;
  
  // Basic Info
  title: string;
  description: string;
  shortDescription: string;
  
  // Categorisation
  category: ProductCategory;
  subcategory: string;
  programmeId: ProgrammeId;
  tags: string[];
  
  // Type
  type: 'digital' | 'physical';
  deliveryMethod: DeliveryMethod;
  
  // Pricing
  pricing: ProductPricing;
  
  // Media
  thumbnail: string;
  images: string[];
  previewUrl?: string;
  
  // Digital specifics
  digitalDetails?: {
    fileType: string;
    fileSize: number;
    format: string;
    instantDelivery: boolean;
  };
  
  // Physical specifics
  physicalDetails?: {
    dimensions?: { width: number; height: number; depth: number };
    weight?: number;
    materials?: string[];
    madeToOrder: boolean;
    productionTime?: number; // days
    shippingOptions: ShippingOption[];
  };
  
  // Licensing (for digital)
  licensing?: {
    type: 'standard' | 'extended' | 'exclusive' | 'lease';
    terms: string;
    usageRights: string[];
    exclusivityAvailable: boolean;
    exclusivePrice?: number;
  };
  
  // Stock
  inStock: boolean;
  stockCount?: number;
  
  // Stats
  sales: number;
  views: number;
  favourites: number;
  reviews: Review[];
  averageRating: number;
  
  // Status
  status: 'draft' | 'active' | 'paused' | 'sold-out' | 'archived';
  
  // Meta
  createdDate: Date;
  lastUpdated: Date;
}

export type ProductCategory = 
  | 'beats-music'
  | 'sample-packs'
  | 'sound-kits'
  | 'fashion-clothing'
  | 'fashion-accessories'
  | 'patterns-templates'
  | 'website-themes'
  | 'digital-templates'
  | 'e-books'
  | 'courses'
  | 'artwork'
  | 'photography'
  | 'video-content'
  | 'food-products'
  | 'crafts-handmade'
  | 'upcycled-items'
  | 'educational-materials'
  | 'other';

export type DeliveryMethod = 
  | 'instant-download'
  | 'email-delivery'
  | 'digital-access'
  | 'shipping'
  | 'local-pickup'
  | 'in-person';

export interface ProductPricing {
  basePrice: number;
  currency: 'GBP';
  salePrice?: number;
  saleEnds?: Date;
  hasVariants: boolean;
  variants?: ProductVariant[];
  
  // Revenue split
  creatorShare: number; // 0.55 default
  communityShare: number; // 0.25 default
  operationsShare: number; // 0.20 default
}

export interface ProductVariant {
  id: string;
  name: string;
  options: { name: string; value: string }[];
  price: number;
  stockCount?: number;
  sku?: string;
}

export interface ShippingOption {
  name: string;
  price: number;
  estimatedDays: number;
  areas: string[];
}

// ============================================
// SERVICE TYPES
// ============================================

export interface Service {
  id: string;
  creatorId: string;
  
  // Basic Info
  title: string;
  description: string;
  shortDescription: string;
  
  // Categorisation
  category: ServiceCategory;
  subcategory: string;
  programmeId: ProgrammeId;
  tags: string[];
  
  // Pricing
  pricingModel: 'hourly' | 'project' | 'retainer' | 'custom';
  pricing: ServicePricing;
  
  // Delivery
  deliveryMethod: 'remote' | 'in-person' | 'hybrid';
  location?: string;
  turnaroundTime: string;
  minimumNotice: number; // days
  
  // What's included
  includes: string[];
  deliverables: string[];
  revisions?: number;
  
  // Requirements
  requirements: string[];
  
  // Media
  thumbnail: string;
  images: string[];
  portfolioExamples: string[];
  
  // Booking
  bookingType: 'instant' | 'request' | 'consultation-first';
  consultationFee?: number;
  depositRequired?: number; // percentage
  
  // Stats
  completedProjects: number;
  reviews: Review[];
  averageRating: number;
  repeatClientRate: number;
  
  // Status
  status: 'active' | 'paused' | 'fully-booked' | 'archived';
  
  // Meta
  createdDate: Date;
  lastUpdated: Date;
}

export type ServiceCategory = 
  | 'music-production'
  | 'mixing-mastering'
  | 'vocal-recording'
  | 'fashion-design'
  | 'styling'
  | 'alterations'
  | 'web-development'
  | 'app-development'
  | 'tech-support'
  | 'podcast-production'
  | 'audio-editing'
  | 'voiceover'
  | 'mc-hosting'
  | 'performance'
  | 'drama-facilitation'
  | 'copywriting'
  | 'editing-proofreading'
  | 'content-writing'
  | 'tutoring'
  | 'workshop-facilitation'
  | 'stem-education'
  | 'upcycling-repair'
  | 'furniture-restoration'
  | 'youth-programmes'
  | 'party-entertainment'
  | 'catering'
  | 'cooking-classes'
  | 'food-consulting'
  | 'mentoring'
  | 'consulting'
  | 'other';

export interface ServicePricing {
  // Hourly
  hourlyRate?: number;
  minimumHours?: number;
  
  // Project
  startingPrice?: number;
  typicalRange?: { min: number; max: number };
  
  // Packages
  packages?: ServicePackage[];
  
  // Retainer
  retainerOptions?: {
    name: string;
    hoursIncluded: number;
    monthlyPrice: number;
  }[];
  
  // Revenue split
  creatorShare: number; // 0.60 for services
  communityShare: number; // 0.20
  operationsShare: number; // 0.20
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
  deliverables: string[];
  turnaround: string;
  popular?: boolean;
}

// ============================================
// ORDER TYPES
// ============================================

export interface Order {
  id: string;
  orderNumber: string;
  
  // Parties
  buyerId: string;
  sellerId: string;
  
  // Items
  items: OrderItem[];
  
  // Pricing
  subtotal: number;
  discount?: { code: string; amount: number };
  shipping?: number;
  total: number;
  
  // Revenue split
  revenueSplit: {
    creatorAmount: number;
    communityAmount: number;
    operationsAmount: number;
  };
  
  // Payment
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'disputed';
  paymentMethod?: string;
  paymentDate?: Date;
  
  // Delivery
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  trackingNumber?: string;
  
  // Status
  status: OrderStatus;
  statusHistory: { status: OrderStatus; date: Date; note?: string }[];
  
  // Communication
  messages: OrderMessage[];
  
  // Dates
  orderDate: Date;
  completedDate?: Date;
  
  // Review
  reviewed: boolean;
  review?: Review;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  type: ItemType;
  itemId: string;
  title: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderMessage {
  id: string;
  senderId: string;
  senderType: 'buyer' | 'seller';
  message: string;
  attachments?: string[];
  timestamp: Date;
  read: boolean;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
  phone?: string;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  
  // Ratings
  rating: 1 | 2 | 3 | 4 | 5;
  qualityRating?: 1 | 2 | 3 | 4 | 5;
  communicationRating?: 1 | 2 | 3 | 4 | 5;
  
  // Content
  title?: string;
  content: string;
  images?: string[];
  
  // Response
  response?: {
    content: string;
    date: Date;
  };
  
  // Meta
  verified: boolean;
  helpful: number;
  createdDate: Date;
}

// ============================================
// COLLABORATION TYPES
// ============================================

export interface Collaboration {
  id: string;
  name: string;
  description: string;
  
  // Team
  initiatorId: string;
  members: CollaborationMember[];
  
  // Project
  projectType: string;
  clientId?: string;
  
  // Revenue
  totalValue: number;
  revenueSplit: CollaborationSplit[];
  
  // Status
  status: 'proposed' | 'active' | 'completed' | 'cancelled';
  
  // Dates
  proposedDate: Date;
  startDate?: Date;
  completedDate?: Date;
}

export interface CollaborationMember {
  creatorId: string;
  role: string;
  skills: string[];
  sharePercentage: number;
  status: 'invited' | 'accepted' | 'declined';
}

export interface CollaborationSplit {
  creatorId: string;
  percentage: number;
  amount: number;
  paid: boolean;
  paidDate?: Date;
}

// ============================================
// CART & CHECKOUT TYPES
// ============================================

export interface CartItem {
  id: string;
  type: ItemType;
  itemId: string;
  creatorId: string;
  title: string;
  thumbnail: string;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  
  // Service specifics
  serviceOptions?: {
    packageId?: string;
    customRequirements?: string;
    preferredDate?: Date;
  };
}

export interface CheckoutState {
  items: CartItem[];
  subtotal: number;
  discount?: { code: string; amount: number };
  shipping?: number;
  total: number;
  
  // Revenue breakdown
  revenueBreakdown: {
    creators: { id: string; amount: number }[];
    community: number;
    operations: number;
  };
  
  // Delivery
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  
  // Payment
  paymentMethod?: string;
  
  // Status
  step: 'cart' | 'details' | 'payment' | 'confirmation';
}

// ============================================
// MARKETPLACE STATE TYPES
// ============================================

export interface MarketplaceState {
  // Listings
  products: Product[];
  services: Service[];
  creators: CreatorProfile[];
  
  // User's marketplace data
  userProfile?: CreatorProfile;
  userProducts: Product[];
  userServices: Service[];
  userOrders: Order[];
  
  // Cart
  cart: CartItem[];
  
  // Filters
  filters: MarketplaceFilters;
  
  // UI State
  isLoading: boolean;
  error?: string;
}

export interface MarketplaceFilters {
  search: string;
  category?: string;
  programmeId?: ProgrammeId;
  priceRange?: { min: number; max: number };
  location?: string;
  deliveryMethod?: DeliveryMethod;
  rating?: number;
  sortBy: 'newest' | 'popular' | 'price-low' | 'price-high' | 'rating';
}

// ============================================
// SKILL COMBINATION TYPES
// ============================================

export interface SkillCombinationDefinition {
  id: string;
  name: string;
  programmes: ProgrammeId[];
  description: string;
  unlocks: string[];
  potentialProducts: string[];
  potentialServices: string[];
  examplePackages: string[];
  revenueMultiplier: number;
}

export interface SingleProgrammeProduct {
  programmeId: ProgrammeId;
  products: string[];
  services: string[];
  typicalPricing: {
    products: { min: number; max: number };
    services: { min: number; max: number };
  };
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface CreatorAnalytics {
  topPerformers: never[];
  repeatCustomers: ReactNode;
  earnings: any;
  creatorId: string;
  period: 'day' | 'week' | 'month' | 'year' | 'all-time';
  
  // Revenue
  revenue: {
    total: number;
    byProduct: { id: string; amount: number }[];
    byService: { id: string; amount: number }[];
    trend: number; // percentage change
  };
  
  // Sales
  sales: {
    total: number;
    products: number;
    services: number;
    trend: number;
  };
  
  // Engagement
  engagement: {
    views: number;
    favourites: number;
    enquiries: number;
    conversionRate: number;
  };
  
  // Reviews
  reviews: {
    total: ReactNode;
    count: number;
    averageRating: number;
    trend: number;
  };
  
  // Top performers
  topProducts: { id: string; title: string; sales: number; revenue: number }[];
  topServices: { id: string; title: string; bookings: number; revenue: number }[];
}

// ============================================
// EXPORT ALL
// ============================================

// All types are already exported above; no need for a re-export block here.