// src/types/skills/constants.ts
import { SkillCategory, ROVPersonality, ActivityType, SkillLevel } from './core';
import { MembershipTier } from '../membership';

export const SKILL_CATEGORIES_INFO = [
  {
    id: 'relationship-building' as const,
    name: 'Relationship Building',
    description: 'Building meaningful connections across cultural and professional boundaries',
    icon: '🤝',
    tierFocus: 'connector' as const,
    averageTimeToMaster: '6-9 months'
  },
  {
    id: 'experience-design' as const,
    name: 'Experience Design',
    description: 'Creating memorable and meaningful community experiences',
    icon: '🎯',
    tierFocus: 'curator' as const,
    averageTimeToMaster: '8-12 months'
  },
  {
    id: 'leadership' as const,
    name: 'Leadership',
    description: 'Leading initiatives and representing community interests',
    icon: '👑',
    tierFocus: 'champion' as const,
    averageTimeToMaster: '12-18 months'
  },
  {
    id: 'communication' as const,
    name: 'Communication',
    description: 'Effective communication across platforms and cultural contexts',
    icon: '💬',
    tierFocus: 'connector' as const,
    averageTimeToMaster: '4-6 months'
  },
  {
    id: 'cultural-intelligence' as const,
    name: 'Cultural Intelligence',
    description: 'Understanding and bridging cultural differences effectively',
    icon: '🌍',
    tierFocus: 'connector' as const,
    averageTimeToMaster: '6-9 months'
  },
  {
    id: 'digital-literacy' as const,
    name: 'Digital Literacy',
    description: 'Mastering UK digital systems and platforms',
    icon: '💻',
    tierFocus: 'connector' as const,
    averageTimeToMaster: '3-5 months'
  },
  {
    id: 'project-management' as const,
    name: 'Project Management',
    description: 'Planning and executing community initiatives effectively',
    icon: '📋',
    tierFocus: 'curator' as const,
    averageTimeToMaster: '7-10 months'
  },
  {
    id: 'governance' as const,
    name: 'Governance',
    description: 'Democratic leadership and community representation',
    icon: '🏛️',
    tierFocus: 'champion' as const,
    averageTimeToMaster: '12-18 months'
  }
] as const;

export const ROV_SPECIALIZATIONS: Record<ROVPersonality, {
  name: string;
  description: string;
  skillsSupported: SkillCategory[];
  coaching: string;
}> = {
  helper: {
    name: 'Helper Support ROV',
    description: 'Basic guidance and real-time assistance',
    skillsSupported: ['relationship-building', 'communication', 'digital-literacy'],
    coaching: 'Step-by-step guidance and encouragement'
  },
  insight: {
    name: 'Insight Analysis ROV',
    description: 'Data-driven analysis and strategic recommendations',
    skillsSupported: ['experience-design', 'project-management', 'leadership'],
    coaching: 'Performance analysis and optimization strategies'
  },
  justice: {
    name: 'Justice Compliance ROV',
    description: 'Ethical guidance and governance support',
    skillsSupported: ['governance', 'leadership'],
    coaching: 'Ethics, compliance, and democratic process guidance'
  },
  pathfinder: {
    name: 'Pathfinder Navigation ROV',
    description: 'Process optimization and strategic navigation',
    skillsSupported: ['experience-design', 'project-management', 'governance'],
    coaching: 'Strategic planning and process optimization'
  },
  guardian: {
    name: 'Guardian Security ROV',
    description: 'Risk assessment and community protection',
    skillsSupported: ['leadership', 'governance'],
    coaching: 'Risk management and crisis response planning'
  }
};

export const EXPERIENCE_POINT_VALUES: Record<ActivityType, number> = {
  'community-practice': 50,
  'workshop-attendance': 25,
  'event-organization': 100,
  'mentoring-session': 75,
  'governance-participation': 150,
  'project-leadership': 200,
  'rov-coaching': 40
};

export const SKILL_LEVEL_THRESHOLDS: Record<SkillLevel, number> = {
  novice: 0,
  competent: 25,
  proficient: 50,
  expert: 75,
  master: 90
};

export const WEEKLY_GOAL_DEFAULTS: Record<MembershipTier, number> = {
  connector: 100,
  curator: 150,
  champion: 200
};

export const ENDORSEMENT_REQUIREMENTS: Record<MembershipTier, {
  minimumForCertification: number;
  requiredTierLevel: MembershipTier;
}> = {
  connector: {
    minimumForCertification: 3,
    requiredTierLevel: 'connector'
  },
  curator: {
    minimumForCertification: 5,
    requiredTierLevel: 'curator'
  },
  champion: {
    minimumForCertification: 8,
    requiredTierLevel: 'champion'
  }
};

export const CERTIFICATION_REQUIREMENTS = {
  timeBasedCertifications: {
    'cultural-bridge-builder': {
      skillCategory: 'cultural-intelligence' as const,
      minimumLevel: 75,
      timeRequirement: 6, // months
      requiredActivities: ['community-practice', 'mentoring-session'] as ActivityType[],
      endorsementsNeeded: 5
    },
    'community-curator': {
      skillCategory: 'experience-design' as const,
      minimumLevel: 80,
      timeRequirement: 8,
      requiredActivities: ['event-organization', 'project-leadership'] as ActivityType[],
      endorsementsNeeded: 7
    },
    'governance-leader': {
      skillCategory: 'governance' as const,
      minimumLevel: 85,
      timeRequirement: 12,
      requiredActivities: ['governance-participation', 'project-leadership'] as ActivityType[],
      endorsementsNeeded: 10
    }
  }
};

export const ROV_COACHING_SCHEDULES = {
  frequencies: ['weekly', 'biweekly', 'monthly'] as const,
  sessionDurations: {
    assessment: 30, // minutes
    guidance: 20,
    practice: 45,
    reflection: 25,
    planning: 35
  },
  maxSessionsPerWeek: {
    connector: 2,
    curator: 3,
    champion: 5
  } as Record<MembershipTier, number>
};

export const SKILL_BADGES = {
  rarityLevels: ['common', 'uncommon', 'rare', 'legendary'] as const,
  colors: {
    common: '#95a5a6',
    uncommon: '#3498db',
    rare: '#9b59b6',
    legendary: '#f39c12'
  },
  requirements: {
    common: { endorsements: 3, level: 25 },
    uncommon: { endorsements: 5, level: 50 },
    rare: { endorsements: 8, level: 75 },
    legendary: { endorsements: 12, level: 90 }
  }
};

export const PROFESSIONAL_OUTCOMES = {
  trackableOutcomes: [
    'promotion',
    'new-job',
    'networking',
    'board-position',
    'speaking-opportunity',
    'consulting-gig',
    'startup-launch',
    'partnership-deal'
  ] as const,
  impactMetrics: {
    'salary-increase': 'percentage',
    'network-growth': 'connections-count',
    'leadership-roles': 'positions-count',
    'recognition-awards': 'awards-count'
  } as const
};

export const COMMUNITY_INTEGRATION_METRICS = {
  connectionTypes: [
    'cross-cultural',
    'professional',
    'mentorship',
    'friendship',
    'collaboration'
  ] as const,
  engagementLevels: [
    'casual-interaction',
    'regular-communication',
    'project-collaboration',
    'leadership-partnership'
  ] as const
};