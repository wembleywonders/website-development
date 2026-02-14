// src/types/membership.ts

export type MembershipTier = 'applicant' | 'connector' | 'curator' | 'champion';

export interface MembershipPlan {
  id: MembershipTier;
  name: string;
  price: number;
  period: 'annual' | 'monthly';
  description: string;
  features: string[];
  skillFocus: string[];
  rovSupport: string[];
  limitations?: string[];
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tier: MembershipTier;
  building: string;
  flatNumber?: string;
  memberSince: Date;
  avatar?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  languages: string[];
  isVerified: boolean;
  lastActive: Date;
}

export interface MemberStats {
  connectionsMade: number;
  eventsAttended: number;
  skillsShared: number;
  projectsStarted: number;
  communityScore: number;
}

export interface SkillEndorsement {
  id: string;
  skill: string;
  endorsedBy: string;
  endorserName: string;
  date: Date;
  note?: string;
}

export interface MembershipBenefits {
  portalSimulatorAccess: boolean;
  eventBookingPriority: number;
  directoryListingType: 'basic' | 'featured' | 'premium';
  rovAssistanceLevel: 'basic' | 'advanced' | 'priority';
  governanceParticipation: boolean;
  communityProjectCreation: boolean;
  mentorshipAccess: boolean;
}

export interface MembershipUpgrade {
  currentTier: MembershipTier;
  targetTier: MembershipTier;
  priceDifference: number;
  newBenefits: string[];
  effectiveDate: Date;
}

// New interfaces for community leadership system
export interface MemberProgress {
  currentTier: MembershipTier;
  assessmentPeriodStart?: Date;
  completedActivities: string[];
  safeguardingStatus: 'pending' | 'cleared' | 'requires_review';
  progressScore: number;
  lastInteraction: Date;
  nextMilestone?: string;
  nextMilestoneDate?: Date;
}

export interface TierBenefits {
  tier: MembershipTier;
  benefits: string[];
  responsibilities: string[];
  budgetAuthority?: number;
  votingRights: boolean;
  trainingRequired: string[];
  timeCommitment: string;
}

export interface TierRequirements {
  tier: MembershipTier;
  prerequisites: string[];
  timeInPreviousTier?: number;
  requiredActivities: string[];
  skillRequirements: SkillRequirement[];
  assessmentRequired: boolean;
  safeguardingLevel: 'basic' | 'enhanced' | 'advanced';
}

export interface SkillRequirement {
  skill: string;
  level: 'basic' | 'intermediate' | 'advanced';
  required: boolean;
  description: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'connector',
    name: 'Connector',
    price: 50,
    period: 'annual',
    description: 'Building relationships, making introductions, expanding networks',
    features: [
      'Access to resident directory',
      'Basic event booking',
      'Portal simulators access',
      'Community WhatsApp groups',
      'Helper ROV assistance'
    ],
    skillFocus: [
      'Relationship building',
      'Cultural intelligence',
      'Active listening',
      'Digital communication',
      'Community integration'
    ],
    rovSupport: ['Helper ROV for basic guidance']
  },
  {
    id: 'curator',
    name: 'Curator',
    price: 75,
    period: 'annual',
    description: 'Selecting quality experiences, sharing valuable content, organizing gatherings',
    features: [
      'Event creation privileges',
      'Featured directory placement',
      'Advanced portal access',
      'Content curation tools',
      'Partnership development support'
    ],
    skillFocus: [
      'Content strategy',
      'Experience design',
      'Quality assessment',
      'Brand management',
      'Partnership development'
    ],
    rovSupport: ['Insight Analysis ROV', 'Pathfinder ROV']
  },
  {
    id: 'champion',
    name: 'Champion',
    price: 100,
    period: 'annual',
    description: 'Leading initiatives, advocating for community needs, shaping direction',
    features: [
      'Governance participation',
      'Priority support',
      'Community project leadership',
      'Advanced analytics',
      'Strategic planning access'
    ],
    skillFocus: [
      'Strategic leadership',
      'Stakeholder management',
      'Public advocacy',
      'Organizational development',
      'Crisis management'
    ],
    rovSupport: ['Justice Compliance ROV', 'Insight Analysis ROV', 'Guardian Security ROV']
  }
];

// Community leadership tier system
export const MEMBERSHIP_TIERS: Record<MembershipTier, TierBenefits> = {
  applicant: {
    tier: 'applicant',
    benefits: [
      'Access to community resources',
      'Invitation to public events',
      'Newsletter subscription'
    ],
    responsibilities: [
      'Complete application process',
      'Attend orientation session'
    ],
    votingRights: false,
    trainingRequired: [],
    timeCommitment: '0-2 hours per month'
  },
  connector: {
    tier: 'connector',
    benefits: [
      'Full community access',
      'Skills development program',
      'Mentorship opportunities',
      'Project participation',
      'Member directory access'
    ],
    responsibilities: [
      'Participate in community activities',
      'Complete mandatory training',
      'Contribute 4-6 hours monthly',
      'Support community initiatives'
    ],
    votingRights: false,
    trainingRequired: ['Basic Safeguarding', 'Community Principles', 'Digital Skills'],
    timeCommitment: '4-6 hours per month'
  },
  curator: {
    tier: 'curator',
    benefits: [
      'Project leadership opportunities',
      'Budget management authority',
      'Youth program involvement',
      'Voting rights in governance',
      'Advanced training programs'
    ],
    responsibilities: [
      'Lead community projects',
      'Mentor new members',
      'Budget accountability',
      'Participate in governance',
      'Youth safeguarding duties'
    ],
    budgetAuthority: 50000,
    votingRights: true,
    trainingRequired: ['Enhanced Safeguarding', 'Project Management', 'Financial Management'],
    timeCommitment: '8-12 hours per month'
  },
  champion: {
    tier: 'champion',
    benefits: [
      'Strategic governance role',
      'Significant budget authority',
      'Partnership negotiations',
      'Community representation',
      'Executive decision making'
    ],
    responsibilities: [
      'Strategic planning',
      'Community representation',
      'Partnership development',
      'Executive oversight',
      'Policy development'
    ],
    budgetAuthority: 250000,
    votingRights: true,
    trainingRequired: ['Advanced Governance', 'Strategic Planning', 'Public Relations'],
    timeCommitment: '15-20 hours per month'
  }
};

export const TIER_REQUIREMENTS: Record<MembershipTier, TierRequirements> = {
  applicant: {
    tier: 'applicant',
    prerequisites: [],
    requiredActivities: ['Submit application', 'Complete initial assessment'],
    skillRequirements: [],
    assessmentRequired: true,
    safeguardingLevel: 'basic'
  },
  connector: {
    tier: 'connector',
    prerequisites: ['Approved application', 'Background check cleared'],
    timeInPreviousTier: 0,
    requiredActivities: [
      'Complete onboarding program',
      'Attend orientation session',
      'Complete basic training modules'
    ],
    skillRequirements: [
      {
        skill: 'Digital Literacy',
        level: 'basic',
        required: true,
        description: 'Basic computer and internet skills'
      },
      {
        skill: 'Communication',
        level: 'basic',
        required: true,
        description: 'Clear written and verbal communication'
      }
    ],
    assessmentRequired: false,
    safeguardingLevel: 'enhanced'
  },
  curator: {
    tier: 'curator',
    prerequisites: ['12 months as Connector', 'Enhanced safeguarding clearance'],
    timeInPreviousTier: 12,
    requiredActivities: [
      'Lead or co-lead a community project',
      'Complete intermediate training',
      'Mentor a new Connector',
      'Demonstrate budget management skills'
    ],
    skillRequirements: [
      {
        skill: 'Project Management',
        level: 'intermediate',
        required: true,
        description: 'Ability to plan and execute community projects'
      },
      {
        skill: 'Leadership',
        level: 'intermediate',
        required: true,
        description: 'Demonstrated leadership in community settings'
      },
      {
        skill: 'Financial Management',
        level: 'basic',
        required: true,
        description: 'Understanding of budget management and accountability'
      }
    ],
    assessmentRequired: true,
    safeguardingLevel: 'enhanced'
  },
  champion: {
    tier: 'champion',
    prerequisites: ['24+ months as Curator', 'Executive assessment passed'],
    timeInPreviousTier: 24,
    requiredActivities: [
      'Lead major community initiative',
      'Complete advanced governance training',
      'Participate in strategic planning',
      'Demonstrate partnership development'
    ],
    skillRequirements: [
      {
        skill: 'Strategic Planning',
        level: 'advanced',
        required: true,
        description: 'Ability to develop and implement long-term strategies'
      },
      {
        skill: 'Governance',
        level: 'advanced',
        required: true,
        description: 'Understanding of democratic governance and decision-making'
      },
      {
        skill: 'Partnership Development',
        level: 'intermediate',
        required: true,
        description: 'Ability to develop and maintain external partnerships'
      }
    ],
    assessmentRequired: true,
    safeguardingLevel: 'advanced'
  }
};

export const BUILDINGS = [
  'Solar Building',
  'Luna Building', 
  'Repton Gardens',
  'The Robinson',
  'Ferrum Building',
  'Canada Gardens',
  'Madison Building',
  'Landsby Building'
] as const;

export type BuildingName = typeof BUILDINGS[number];

export interface BuildingInfo {
  name: BuildingName;
  address: string;
  completedYear: number;
  units: number;
  amenities: string[];
  communityManager?: string;
}

export const SKILL_CATEGORIES = [
  'Technology & Digital',
  'Creative & Arts', 
  'Business & Finance',
  'Education & Training',
  'Health & Wellness',
  'Language & Communication',
  'Community & Social',
  'Practical & Trade'
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number];

// Utility functions for membership management
export const getNextTier = (currentTier: MembershipTier): MembershipTier | null => {
  const tierOrder: MembershipTier[] = ['applicant', 'connector', 'curator', 'champion'];
  const currentIndex = tierOrder.indexOf(currentTier);
  return currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;
};

export const canProgressToNextTier = (member: Member): boolean => {
  const nextTier = getNextTier(member.tier);
  if (!nextTier) return false;
  
  const requirements = TIER_REQUIREMENTS[nextTier];
  
  // Check time in current tier
  if (requirements.timeInPreviousTier) {
    const monthsInTier = (Date.now() - member.memberSince.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsInTier < requirements.timeInPreviousTier) return false;
  }
  
  return true;
};