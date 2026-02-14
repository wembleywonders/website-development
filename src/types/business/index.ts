export interface BusinessSponsor {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  status: 'pending' | 'active' | 'suspended' | 'cancelled';
  monthlyFee: number;
  signupDate: Date;
  nextBillingDate: Date;
  logo?: string;
  services: string[];
  targetAudience: string;
  specialOffers?: string;
}

export interface SponsorshipTier {
  name: string;
  monthlyPrice: number;
  benefits: string[];
  maxLogoPlacements: number;
  contentFeaturesPerMonth: number;
  socialMediaMentions: number;
}

export interface BusinessContent {
  id: string;
  businessId: string;
  platform: 'mayastore' | 'raydyo' | 'joystick';
  contentType: 'profile' | 'spotlight' | 'sponsored-content';
  title: string;
  content: string;
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
}
