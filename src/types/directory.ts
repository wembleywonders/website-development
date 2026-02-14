// src/types/directory.ts

export type ListingType = 'resident' | 'business';
export type ListingPlan = 'basic' | 'featured' | 'premium';

export interface DirectoryListing {
  id: string;
  type: ListingType;
  name: string;
  title: string;
  location: string;
  description: string;
  services: string[];
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  avatar: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    socialMedia?: {
      linkedin?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  category: BusinessCategory;
  tags: string[];
  createdDate: Date;
  lastUpdated: Date;
  isVerified: boolean;
  planType: ListingPlan;
  views: number;
  clicks: number;
}

export interface BusinessListing extends DirectoryListing {
  type: 'business';
  businessHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  pricing?: {
    currency: 'GBP';
    startingPrice?: number;
    priceRange?: string;
    consultation?: boolean;
  };
  gallery?: string[];
  certifications?: string[];
  yearsExperience?: number;
}

export interface ResidentListing extends DirectoryListing {
  type: 'resident';
  building: string;
  memberSince: Date;
  skills: string[];
  interests: string[];
  availableForMentoring: boolean;
  languages: string[];
  professionalBackground?: string;
}

export type BusinessCategory = 
  | 'dj-music'
  | 'artists'
  | 'tech-services'
  | 'food-catering'
  | 'fitness-wellness'
  | 'startups'
  | 'local-shops'
  | 'consulting'
  | 'education'
  | 'home-services'
  | 'other';

export interface BusinessCategoryInfo {
  id: BusinessCategory;
  label: string;
  icon: string;
  description: string;
  count: number;
}

export const BUSINESS_CATEGORIES: BusinessCategoryInfo[] = [
  {
    id: 'dj-music',
    label: 'DJs & Musicians',
    icon: '🎵',
    description: 'Live music, DJ services, sound production',
    count: 23
  },
  {
    id: 'artists',
    label: 'Artists & Sculptors',
    icon: '🎨',
    description: 'Visual arts, sculptures, creative workshops',
    count: 18
  },
  {
    id: 'tech-services',
    label: 'Tech & Digital',
    icon: '💻',
    description: 'Web development, IT support, digital consulting',
    count: 31
  },
  {
    id: 'food-catering',
    label: 'Food & Catering',
    icon: '🍽️',
    description: 'Catering, private chef, food delivery',
    count: 12
  },
  {
    id: 'fitness-wellness',
    label: 'Fitness & Wellness',
    icon: '🏃‍♀️',
    description: 'Personal training, yoga, wellness coaching',
    count: 15
  },
  {
    id: 'startups',
    label: 'Startups & Ideas',
    icon: '🚀',
    description: 'Startup services, innovation, entrepreneurship',
    count: 9
  },
  {
    id: 'local-shops',
    label: 'Local Shops',
    icon: '🏪',
    description: 'Retail, local businesses, specialty stores',
    count: 27
  },
  {
    id: 'consulting',
    label: 'Consulting',
    icon: '💼',
    description: 'Business consulting, strategy, professional services',
    count: 14
  },
  {
    id: 'education',
    label: 'Education & Training',
    icon: '📚',
    description: 'Tutoring, training, educational services',
    count: 19
  },
  {
    id: 'home-services',
    label: 'Home Services',
    icon: '🏠',
    description: 'Cleaning, maintenance, home improvement',
    count: 22
  },
  {
    id: 'other',
    label: 'Other Services',
    icon: '⭐',
    description: 'Miscellaneous services and offerings',
    count: 8
  }
];

export interface DirectorySearchFilters {
  searchTerm: string;
  category?: BusinessCategory;
  listingType?: ListingType;
  location?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  rating?: number;
  tags?: string[];
}

export interface DirectorySearchResults {
  listings: DirectoryListing[];
  totalCount: number;
  filteredCount: number;
  categories: BusinessCategoryInfo[];
  searchFilters: DirectorySearchFilters;
}

export interface ListingReview {
  id: string;
  listingId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
}

export interface ListingAnalytics {
  listingId: string;
  views: number;
  clicks: number;
  contactRequests: number;
  period: 'daily' | 'weekly' | 'monthly';
  data: Array<{
    date: Date;
    views: number;
    clicks: number;
    contacts: number;
  }>;
}

export interface BusinessListingFormData {
  businessName: string;
  category: BusinessCategory;
  description: string;
  email: string;
  phone: string;
  website?: string;
  services: string;
  plan: ListingPlan;
  pricing?: {
    startingPrice?: number;
    priceRange?: string;
  };
  businessHours?: {
    [key: string]: string;
  };
}

export const LISTING_PLANS = [
  {
    id: 'basic' as const,
    name: 'Basic',
    price: 8,
    period: 'per week',
    features: [
      'Basic listing',
      'Contact information',
      'Service description',
      'Member messaging'
    ]
  },
  {
    id: 'featured' as const,
    name: 'Featured',
    price: 15,
    period: 'per week',
    features: [
      'Featured placement',
      'Photo gallery',
      'Review system',
      'Event promotion',
      'Social media links'
    ]
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    price: 25,
    period: 'per week',
    features: [
      'Top of search results',
      'Homepage banner',
      'Event newsletter inclusion',
      'ROV promotion',
      'Analytics dashboard'
    ]
  }
];