export interface CommunityBusiness {
  id: string;
  name: string;
  category: 'education' | 'transport' | 'food' | 'retail' | 'services' | 'healthcare' | 'tech';
  logo: string;
  description: string;
  communityCommitment: string;
  supportedProgrammes: string[];
  yearsInCommunity: number;
  address: string;
  phone: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  partnershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  communityStories: string[];
  verifiedOutcomes: {
    studentsSupported?: number;
    jobsCreated?: number;
    projectsSponsored?: number;
    eventsSupported?: number;
  };
  lastUpdated: Date;
}

export interface BusinessCategory {
  name: string;
  icon: string;
  description: string;
  businesses: CommunityBusiness[];
}
