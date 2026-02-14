// accreditation/badge-system/progression-map.ts
// Visual and data representation of learner progression pathways
// Badge → OCN Qualification → Apprenticeship

export interface ProgressionStep {
  id: string;
  type: 'badge' | 'qualification' | 'apprenticeship';
  name: string;
  level?: string;
  duration?: string;
  credits?: number;
  description: string;
}

export interface ProgressionPathway {
  id: string;
  programme: string;
  programmeEmoji: string;
  tagline: string;
  color: string;
  steps: ProgressionStep[];
  outcomes: string[];
  employerPartners: string[];
}

// ============================================
// SCRAP CAT PATHWAY
// ============================================

export const SCRAP_CAT_PATHWAY: ProgressionPathway = {
  id: 'scrap-cat',
  programme: 'Scrap Cat',
  programmeEmoji: '♻️',
  tagline: 'Reduce. Repair. Reuse.',
  color: '#10b981', // emerald
  steps: [
    {
      id: 'sc-step-1',
      type: 'badge',
      name: 'Device Diagnostic',
      level: 'Explorer',
      duration: '4-6 weeks',
      credits: 6,
      description: 'Learn to identify and diagnose common device issues'
    },
    {
      id: 'sc-step-2',
      type: 'badge',
      name: 'Repair Apprentice',
      level: 'Builder',
      duration: '6-8 weeks',
      credits: 6,
      description: 'Complete supervised repairs with safe practices'
    },
    {
      id: 'sc-step-3',
      type: 'qualification',
      name: 'OCN Award in IT User Skills',
      level: 'Entry 3 / Level 1',
      credits: 6,
      description: 'First nationally recognised qualification'
    },
    {
      id: 'sc-step-4',
      type: 'badge',
      name: 'Fixer',
      level: 'Innovator',
      duration: '8-10 weeks',
      credits: 12,
      description: 'Independent repairs and peer mentoring'
    },
    {
      id: 'sc-step-5',
      type: 'badge',
      name: 'Repair Leader',
      level: 'Leader',
      duration: '6-8 weeks',
      credits: 7,
      description: 'Lead sessions and train new apprentices'
    },
    {
      id: 'sc-step-6',
      type: 'qualification',
      name: 'OCN Certificate in IT Systems Support',
      level: 'Level 2',
      credits: 25,
      description: 'Full Level 2 qualification, employer-recognised'
    },
    {
      id: 'sc-step-7',
      type: 'apprenticeship',
      name: 'IT Support Technician',
      level: 'Level 3',
      duration: '18 months',
      description: 'Full apprenticeship with employer, leading to career'
    }
  ],
  outcomes: [
    'IT Support Technician',
    'Device Repair Specialist',
    'Sustainability Coordinator',
    'Tech Recycling Manager',
    'Self-employed repair service'
  ],
  employerPartners: [
    'Currys',
    'Local IT repair businesses',
    'Council IT departments',
    'NHS Digital',
    'Restart Project partners'
  ]
};

// ============================================
// G-TECH CASTERS PATHWAY
// ============================================

export const GTECH_CASTERS_PATHWAY: ProgressionPathway = {
  id: 'g-tech-casters',
  programme: 'G-Tech Casters',
  programmeEmoji: '🎙️',
  tagline: 'Your Voice. Your Platform. Your Story.',
  color: '#8b5cf6', // purple
  steps: [
    {
      id: 'gtc-step-1',
      type: 'badge',
      name: 'Podcast Explorer',
      level: 'Explorer',
      duration: '4-6 weeks',
      credits: 6,
      description: 'Audio production fundamentals and first publication'
    },
    {
      id: 'gtc-step-2',
      type: 'qualification',
      name: 'OCN Award in Creative Media Production',
      level: 'Level 1',
      credits: 6,
      description: 'First nationally recognised qualification'
    },
    {
      id: 'gtc-step-3',
      type: 'badge',
      name: 'Producer',
      level: 'Builder',
      duration: '8-10 weeks',
      credits: 9,
      description: 'Full episode production and interviews'
    },
    {
      id: 'gtc-step-4',
      type: 'badge',
      name: 'Broadcaster',
      level: 'Innovator',
      duration: '8-10 weeks',
      credits: 10,
      description: 'Live shows and audience building'
    },
    {
      id: 'gtc-step-5',
      type: 'badge',
      name: 'Media Leader',
      level: 'Leader',
      duration: '6-8 weeks',
      credits: 9,
      description: 'Programming leadership and mentoring'
    },
    {
      id: 'gtc-step-6',
      type: 'qualification',
      name: 'OCN Certificate in Digital Media',
      level: 'Level 2',
      credits: 28,
      description: 'Full Level 2 qualification, employer-recognised'
    },
    {
      id: 'gtc-step-7',
      type: 'apprenticeship',
      name: 'Content Creator',
      level: 'Level 3',
      duration: '15-18 months',
      description: 'Full apprenticeship with employer, leading to career'
    }
  ],
  outcomes: [
    'Content Creator',
    'Podcast Producer',
    'Radio Presenter',
    'Social Media Manager',
    'Video Editor',
    'Self-employed content business'
  ],
  employerPartners: [
    'BBC London',
    'Community radio stations',
    'Podcast production companies',
    'Media agencies',
    'In-house content teams'
  ]
};

// ============================================
// TECHRENEURS PATHWAY
// ============================================

export const TECHRENEURS_PATHWAY: ProgressionPathway = {
  id: 'techreneurs',
  programme: 'TECHreneurs',
  programmeEmoji: '💰',
  tagline: 'Ideas. Income. Impact.',
  color: '#f59e0b', // amber
  steps: [
    {
      id: 'te-step-1',
      type: 'badge',
      name: 'Business Canvas',
      level: 'Explorer',
      duration: '4-6 weeks',
      credits: 6,
      description: 'Develop and pitch a business idea'
    },
    {
      id: 'te-step-2',
      type: 'qualification',
      name: 'OCN Award in Business Enterprise',
      level: 'Level 1',
      credits: 6,
      description: 'First nationally recognised qualification'
    },
    {
      id: 'te-step-3',
      type: 'badge',
      name: 'Market Researcher',
      level: 'Builder',
      duration: '8-10 weeks',
      credits: 9,
      description: 'Market research and pricing strategy'
    },
    {
      id: 'te-step-4',
      type: 'badge',
      name: 'Entrepreneur',
      level: 'Innovator',
      duration: '8-10 weeks',
      credits: 10,
      description: 'Launch and market a product/service on Cyberstore'
    },
    {
      id: 'te-step-5',
      type: 'badge',
      name: 'Business Leader',
      level: 'Leader',
      duration: '6-8 weeks',
      credits: 9,
      description: 'Scale business and mentor others'
    },
    {
      id: 'te-step-6',
      type: 'qualification',
      name: 'OCN Certificate in Business Administration',
      level: 'Level 2',
      credits: 28,
      description: 'Full Level 2 qualification, employer-recognised'
    },
    {
      id: 'te-step-7',
      type: 'apprenticeship',
      name: 'Business Administrator',
      level: 'Level 3',
      duration: '18 months',
      description: 'Full apprenticeship with employer, leading to career'
    }
  ],
  outcomes: [
    'Business Administrator',
    'Digital Marketer',
    'Project Coordinator',
    'Self-employed entrepreneur',
    'Social Enterprise Manager'
  ],
  employerPartners: [
    'Local SMEs',
    'Social enterprises',
    'Council economic development',
    'Chambers of Commerce',
    'Start-up incubators'
  ]
};

// ============================================
// STEMGINEERS PATHWAY (Phase 2)
// ============================================

export const STEMGINEERS_PATHWAY: ProgressionPathway = {
  id: 'stemgineers',
  programme: 'STEMgineers',
  programmeEmoji: '🔧',
  tagline: 'Build. Code. Innovate.',
  color: '#3b82f6', // blue
  steps: [
    {
      id: 'stm-step-1',
      type: 'badge',
      name: 'Digital Literacy Explorer',
      level: 'Explorer',
      duration: '4-6 weeks',
      credits: 6,
      description: 'Coding basics and first mini-project'
    },
    {
      id: 'stm-step-2',
      type: 'badge',
      name: 'Maker Engineer',
      level: 'Builder',
      duration: '8-10 weeks',
      credits: 9,
      description: 'Build functional prototype (robot/IoT)'
    },
    {
      id: 'stm-step-3',
      type: 'qualification',
      name: 'OCN Award in STEM Skills',
      level: 'Entry 3',
      credits: 6,
      description: 'First nationally recognised qualification'
    },
    {
      id: 'stm-step-4',
      type: 'badge',
      name: 'AI Explorer',
      level: 'Innovator',
      duration: '8-10 weeks',
      credits: 10,
      description: 'Chatbot design and data ethics'
    },
    {
      id: 'stm-step-5',
      type: 'badge',
      name: 'Eco Innovator',
      level: 'Leader',
      duration: '6-8 weeks',
      credits: 9,
      description: 'Sustainable tech and Hackathon leadership'
    },
    {
      id: 'stm-step-6',
      type: 'qualification',
      name: 'OCN Certificate in Digital Skills for Work',
      level: 'Level 2',
      credits: 15,
      description: 'Full Level 2 qualification, employer-recognised'
    },
    {
      id: 'stm-step-7',
      type: 'apprenticeship',
      name: 'Digital Support Technician',
      level: 'Level 3',
      duration: '18 months',
      description: 'Full apprenticeship with employer, leading to career'
    }
  ],
  outcomes: [
    'Digital Support Technician',
    'Junior Developer',
    'Tech Support Specialist',
    'IoT Technician',
    'Data Analyst'
  ],
  employerPartners: [
    'Tech companies',
    'Digital agencies',
    'Council digital teams',
    'NHS Digital',
    'Start-ups'
  ]
};

// ============================================
// ALL PATHWAYS
// ============================================

export const ALL_PATHWAYS: ProgressionPathway[] = [
  SCRAP_CAT_PATHWAY,
  GTECH_CASTERS_PATHWAY,
  TECHRENEURS_PATHWAY,
  STEMGINEERS_PATHWAY
];

// ============================================
// MEMBERSHIP TIER ALIGNMENT
// ============================================

export const MEMBERSHIP_PROGRESSION = {
  visitor: {
    tier: 'Visitor',
    badgeLevel: 'Explorer',
    description: 'First steps into a programme',
    benefits: ['Access to sandbox tools', 'Taster sessions', 'Community events']
  },
  champion: {
    tier: 'Champion',
    badgeLevel: 'Builder',
    description: 'Active participant with first badge',
    benefits: ['Full programme access', 'Mentor matching', 'Cyberstore listing rights']
  },
  connector: {
    tier: 'Connector',
    badgeLevel: 'Innovator',
    description: 'Cross-programme participant, peer support',
    benefits: ['Multi-programme access', 'Revenue share priority', 'Leadership opportunities']
  },
  curator: {
    tier: 'Curator',
    badgeLevel: 'Leader',
    description: 'Programme contributor, community leader',
    benefits: ['Governance voting rights', 'Assessor training pathway', 'Revenue share bonus']
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getPathwayDuration = (pathway: ProgressionPathway): string => {
  const totalWeeks = pathway.steps
    .filter(step => step.duration)
    .reduce((total, step) => {
      const match = step.duration?.match(/(\d+)-(\d+)/);
      if (match) {
        return total + (parseInt(match[1]) + parseInt(match[2])) / 2;
      }
      return total;
    }, 0);
  
  const months = Math.ceil(totalWeeks / 4);
  return `${months} months to Level 2 Certificate`;
};

export const getTotalCredits = (pathway: ProgressionPathway): number => {
  return pathway.steps
    .filter(step => step.credits)
    .reduce((total, step) => total + (step.credits || 0), 0);
};

export const getPathwayMilestones = (pathway: ProgressionPathway) => {
  return {
    firstQualification: pathway.steps.find(s => s.type === 'qualification'),
    fullCertificate: pathway.steps.filter(s => s.type === 'qualification')[1],
    apprenticeship: pathway.steps.find(s => s.type === 'apprenticeship')
  };
};

// ============================================
// VISUAL MAP DATA
// ============================================

export const PATHWAY_VISUAL_CONFIG = {
  badgeColors: {
    explorer: '#22c55e', // green
    builder: '#3b82f6', // blue
    innovator: '#a855f7', // purple
    leader: '#f59e0b'   // amber
  },
  stepIcons: {
    badge: '🏅',
    qualification: '📜',
    apprenticeship: '💼'
  },
  levelLabels: {
    'Entry 3': 'Entry Level 3',
    'Level 1': 'Level 1 (GCSE Foundation)',
    'Level 2': 'Level 2 (GCSE Higher)',
    'Level 3': 'Level 3 (A-Level equivalent)'
  }
};

export default {
  ALL_PATHWAYS,
  SCRAP_CAT_PATHWAY,
  GTECH_CASTERS_PATHWAY,
  TECHRENEURS_PATHWAY,
  STEMGINEERS_PATHWAY,
  MEMBERSHIP_PROGRESSION,
  PATHWAY_VISUAL_CONFIG,
  getPathwayDuration,
  getTotalCredits,
  getPathwayMilestones
};
