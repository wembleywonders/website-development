// accreditation/badge-system/badge-definitions.ts
// Wembley Wonders CIC — Internal Badge System Definitions
// Maps to OCN LOCN qualifications and apprenticeship standards

export type BadgeLevel = 'explorer' | 'builder' | 'innovator' | 'leader';
export type MembershipTier = 'visitor' | 'champion' | 'connector' | 'curator';

export interface Badge {
  id: string;
  name: string;
  level: BadgeLevel;
  programme: string;
  programmeEmoji: string;
  description: string;
  requirements: string[];
  evidenceTypes: string[];
  credits: number;
  glh: number; // Guided Learning Hours
  ocnUnits: string[];
  unlocks: string[];
  membershipAlignment: MembershipTier;
}

export interface OCNQualification {
  id: string;
  title: string;
  level: string;
  credits: number;
  requiredBadges: string[];
  apprenticeshipPathway?: string;
}

export interface ApprenticeshipStandard {
  id: string;
  title: string;
  level: number;
  duration: string;
  ksbCoverage: Record<string, 'full' | 'partial' | 'none'>;
}

// ============================================
// SCRAP CAT BADGES
// ============================================

export const SCRAP_CAT_BADGES: Badge[] = [
  {
    id: 'sc-explorer',
    name: 'Device Diagnostic',
    level: 'explorer',
    programme: 'Scrap Cat',
    programmeEmoji: '♻️',
    description: 'Identify and diagnose common device issues',
    requirements: [
      'Complete device identification module',
      'Successfully diagnose 3 common device issues',
      'Document findings using diagnostic template'
    ],
    evidenceTypes: [
      'Device identification worksheet (5+ devices)',
      'Diagnostic log (3 faults)',
      'Photo/video evidence',
      'Assessor observation'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['IT-E3-01', 'IT-E3-02', 'IT-L1-03'],
    unlocks: ['sc-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'sc-builder',
    name: 'Repair Apprentice',
    level: 'builder',
    programme: 'Scrap Cat',
    programmeEmoji: '♻️',
    description: 'Complete supervised repairs with safe working practices',
    requirements: [
      'Complete 5 supervised repairs',
      'Pass component handling assessment',
      'Demonstrate safe working practices'
    ],
    evidenceTypes: [
      'Repair log (5 repairs)',
      'Before/after photos',
      'H&S checklist signed',
      'Customer feedback',
      'Assessor observation'
    ],
    credits: 6,
    glh: 50,
    ocnUnits: ['IT-L1-04', 'IT-L1-05', 'IT-L1-06'],
    unlocks: ['sc-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'sc-innovator',
    name: 'Fixer',
    level: 'innovator',
    programme: 'Scrap Cat',
    programmeEmoji: '♻️',
    description: 'Complete independent repairs and mentor newcomers',
    requirements: [
      'Complete 10 independent repairs',
      'Mentor a new participant through first repair',
      'Present at Repair Café event'
    ],
    evidenceTypes: [
      'Independent repair portfolio (10 devices)',
      'Mentoring log with feedback',
      'Repair Café participation',
      'Video walkthrough',
      'Sustainability impact statement'
    ],
    credits: 12,
    glh: 95,
    ocnUnits: ['IT-L2-01', 'IT-L2-02', 'IT-L2-03', 'IT-L2-04'],
    unlocks: ['sc-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'sc-leader',
    name: 'Repair Leader',
    level: 'leader',
    programme: 'Scrap Cat',
    programmeEmoji: '♻️',
    description: 'Lead repair sessions and train new apprentices',
    requirements: [
      'Lead Repair Café session',
      'Train 3 new Repair Apprentices',
      'Create repair tutorial content for platform'
    ],
    evidenceTypes: [
      'Session plan',
      'Training materials',
      'Trainee assessments',
      'Tutorial content published',
      'Reflective journal'
    ],
    credits: 7,
    glh: 55,
    ocnUnits: ['IT-L2-05', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// G-TECH CASTERS BADGES
// ============================================

export const GTECH_CASTERS_BADGES: Badge[] = [
  {
    id: 'gtc-explorer',
    name: 'Podcast Explorer',
    level: 'explorer',
    programme: 'G-Tech Casters',
    programmeEmoji: '🎙️',
    description: 'Learn audio production fundamentals and publish first content',
    requirements: [
      'Complete audio recording fundamentals module',
      'Record and edit one 5-minute segment',
      'Publish first piece to Rayd-yo'
    ],
    evidenceTypes: [
      'Audio recording samples (3+)',
      'Edited project file',
      'Published Rayd-yo link',
      'Equipment observation',
      'Reflective log'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['CM-L1-01', 'CM-L1-02', 'CM-L1-03'],
    unlocks: ['gtc-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'gtc-builder',
    name: 'Producer',
    level: 'builder',
    programme: 'G-Tech Casters',
    programmeEmoji: '🎙️',
    description: 'Plan and produce complete podcast episodes',
    requirements: [
      'Plan and produce a 15-minute podcast episode',
      'Conduct at least one recorded interview',
      'Create show artwork and metadata'
    ],
    evidenceTypes: [
      'Episode planning document',
      'Raw and edited audio',
      'Interview with consent form',
      'Show artwork',
      'Metadata copy',
      'Assessor observation'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L1-04', 'CM-L2-01', 'CM-L2-02', 'CM-L2-03'],
    unlocks: ['gtc-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'gtc-innovator',
    name: 'Broadcaster',
    level: 'innovator',
    programme: 'G-Tech Casters',
    programmeEmoji: '🎙️',
    description: 'Host live shows and build audience',
    requirements: [
      'Host a live Rayd-yo show (30+ minutes)',
      'Produce a 4-episode podcast series',
      'Build audience of 100+ plays'
    ],
    evidenceTypes: [
      'Live show recording and cue sheet',
      '4-episode series',
      'Analytics showing growth',
      'Social media evidence',
      'Audience feedback',
      'Self-evaluation'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['CM-L2-04', 'CM-L2-05', 'CM-L2-06', 'CM-L2-07'],
    unlocks: ['gtc-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'gtc-leader',
    name: 'Media Leader',
    level: 'leader',
    programme: 'G-Tech Casters',
    programmeEmoji: '🎙️',
    description: 'Lead programming and mentor new casters',
    requirements: [
      'Mentor 3 new G-Tech Casters through first episode',
      'Lead a Rayd-yo programming slot (weekly)',
      'Create training content for platform'
    ],
    evidenceTypes: [
      'Mentoring log with feedback',
      'Programming schedule',
      'Training materials',
      'Project management docs',
      'Leadership journal',
      'Peer feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L2-08', 'GEN-L2-01', 'GEN-L2-02', 'CM-L2-09'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// TECHRENEURS BADGES
// ============================================

export const TECHRENEURS_BADGES: Badge[] = [
  {
    id: 'te-explorer',
    name: 'Business Canvas',
    level: 'explorer',
    programme: 'TECHreneurs',
    programmeEmoji: '💰',
    description: 'Develop and pitch a business idea',
    requirements: [
      'Complete Business Model Canvas for one idea',
      'Identify target customer and value proposition',
      'Present 60-second elevator pitch'
    ],
    evidenceTypes: [
      'Business Model Canvas',
      'Customer persona',
      'Value proposition',
      'Recorded pitch (60s)',
      'Peer feedback',
      'Self-reflection'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['BE-L1-01', 'BE-L1-02', 'BE-L1-03'],
    unlocks: ['te-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'te-builder',
    name: 'Market Researcher',
    level: 'builder',
    programme: 'TECHreneurs',
    programmeEmoji: '💰',
    description: 'Conduct market research and develop pricing',
    requirements: [
      'Conduct primary research (10+ surveys or 3+ interviews)',
      'Analyse competitor landscape',
      'Create pricing strategy'
    ],
    evidenceTypes: [
      'Survey design and responses',
      'Interview recordings',
      'Research summary report',
      'Competitor matrix',
      'Pricing document',
      'Financial projections'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['BE-L1-04', 'BE-L2-01', 'BE-L2-02', 'BE-L2-03'],
    unlocks: ['te-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'te-innovator',
    name: 'Entrepreneur',
    level: 'innovator',
    programme: 'TECHreneurs',
    programmeEmoji: '💰',
    description: 'Launch and market a product/service',
    requirements: [
      'Launch product/service on Cyberstore',
      'Generate first sale/revenue',
      'Create marketing campaign'
    ],
    evidenceTypes: [
      'Live Cyberstore listing',
      'Sales evidence',
      'Marketing materials',
      'Content calendar',
      'Customer feedback',
      'Revenue tracking'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['BE-L2-04', 'BE-L2-05', 'BE-L2-06', 'BE-L2-07'],
    unlocks: ['te-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'te-leader',
    name: 'Business Leader',
    level: 'leader',
    programme: 'TECHreneurs',
    programmeEmoji: '💰',
    description: 'Scale business and mentor others',
    requirements: [
      'Pitch at Kaywana\'s Court PitchFest',
      'Mentor 3 new TECHreneurs through Canvas stage',
      'Achieve £500+ revenue or 50+ customers'
    ],
    evidenceTypes: [
      'Full business plan',
      'PitchFest presentation',
      'Revenue evidence',
      'Mentoring log',
      'Financial records',
      'Growth plan'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['BE-L2-08', 'BE-L2-09', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// OCN QUALIFICATIONS
// ============================================

export const OCN_QUALIFICATIONS: OCNQualification[] = [
  // Scrap Cat
  {
    id: 'ocn-it-award',
    title: 'OCN Award in IT User Skills',
    level: 'Entry 3 / Level 1',
    credits: 6,
    requiredBadges: ['sc-explorer'],
    apprenticeshipPathway: 'it-support-technician'
  },
  {
    id: 'ocn-it-cert',
    title: 'OCN Certificate in IT Systems Support',
    level: 'Level 2',
    credits: 15,
    requiredBadges: ['sc-explorer', 'sc-builder', 'sc-innovator'],
    apprenticeshipPathway: 'it-support-technician'
  },
  
  // G-Tech Casters
  {
    id: 'ocn-media-award',
    title: 'OCN Award in Creative Media Production',
    level: 'Level 1',
    credits: 6,
    requiredBadges: ['gtc-explorer'],
    apprenticeshipPathway: 'content-creator'
  },
  {
    id: 'ocn-media-cert',
    title: 'OCN Certificate in Digital Media',
    level: 'Level 2',
    credits: 18,
    requiredBadges: ['gtc-explorer', 'gtc-builder', 'gtc-innovator'],
    apprenticeshipPathway: 'content-creator'
  },
  
  // TECHreneurs
  {
    id: 'ocn-business-award',
    title: 'OCN Award in Business Enterprise',
    level: 'Level 1',
    credits: 6,
    requiredBadges: ['te-explorer'],
    apprenticeshipPathway: 'business-administrator'
  },
  {
    id: 'ocn-business-cert',
    title: 'OCN Certificate in Business Administration',
    level: 'Level 2',
    credits: 18,
    requiredBadges: ['te-explorer', 'te-builder', 'te-innovator'],
    apprenticeshipPathway: 'business-administrator'
  }
];

// ============================================
// APPRENTICESHIP STANDARDS
// ============================================

export const APPRENTICESHIP_STANDARDS: ApprenticeshipStandard[] = [
  {
    id: 'it-support-technician',
    title: 'IT Support Technician',
    level: 3,
    duration: '18 months',
    ksbCoverage: {
      'K1-Hardware-Software': 'full',
      'K2-Troubleshooting': 'full',
      'K3-Customer-Service': 'partial',
      'K4-Health-Safety': 'full',
      'S1-Diagnose-Issues': 'full',
      'S2-Install-Configure': 'full',
      'S3-Communicate-Technical': 'partial',
      'B1-Professional-Ethical': 'full',
      'B2-Continuous-Learning': 'full'
    }
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    level: 3,
    duration: '15-18 months',
    ksbCoverage: {
      'K1-Content-Formats': 'full',
      'K2-Production-Equipment': 'full',
      'K3-Audience-Analytics': 'full',
      'K4-Copyright-Legal': 'partial',
      'K5-Brand-Guidelines': 'full',
      'S1-Plan-Produce': 'full',
      'S2-Edit-Optimise': 'full',
      'S3-Publish-Multiplatform': 'full',
      'S4-Analyse-Performance': 'full',
      'S5-Engage-Audiences': 'full',
      'B1-Creative-Problem-Solving': 'full',
      'B2-Time-Management': 'full',
      'B3-Collaborative': 'full'
    }
  },
  {
    id: 'business-administrator',
    title: 'Business Administrator',
    level: 3,
    duration: '18 months',
    ksbCoverage: {
      'K1-Organisation-Structures': 'full',
      'K2-Project-Management': 'partial',
      'K3-Stakeholder-Management': 'full',
      'K4-Business-Fundamentals': 'full',
      'K5-IT-Digital-Skills': 'full',
      'S1-Produce-Records': 'full',
      'S2-Use-IT-Systems': 'full',
      'S3-Build-Relationships': 'full',
      'S4-Support-Meetings': 'partial',
      'S5-Problem-Solving': 'full',
      'B1-Professionalism': 'full',
      'B2-Personal-Responsibility': 'full',
      'B3-Flexibility': 'full'
    }
  },
  {
    id: 'digital-support-technician',
    title: 'Digital Support Technician',
    level: 3,
    duration: '18 months',
    ksbCoverage: {
      'K1-Digital-Environment': 'full',
      'K2-Support-Technologies': 'full',
      'K3-Security-Awareness': 'full',
      'S1-Technical-Support': 'full',
      'S2-System-Administration': 'partial',
      'B1-Customer-Focus': 'full'
    }
  }
];

// ============================================
// ALL BADGES COMBINED
// ============================================

export const ALL_BADGES: Badge[] = [
  ...SCRAP_CAT_BADGES,
  ...GTECH_CASTERS_BADGES,
  ...TECHRENEURS_BADGES
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getBadgesByProgramme = (programme: string): Badge[] => {
  return ALL_BADGES.filter(badge => badge.programme === programme);
};

export const getBadgesByLevel = (level: BadgeLevel): Badge[] => {
  return ALL_BADGES.filter(badge => badge.level === level);
};

export const getQualificationProgress = (
  earnedBadgeIds: string[],
  qualificationId: string
): { earned: number; required: number; complete: boolean } => {
  const qualification = OCN_QUALIFICATIONS.find(q => q.id === qualificationId);
  if (!qualification) return { earned: 0, required: 0, complete: false };
  
  const earned = qualification.requiredBadges.filter(
    badgeId => earnedBadgeIds.includes(badgeId)
  ).length;
  
  return {
    earned,
    required: qualification.requiredBadges.length,
    complete: earned === qualification.requiredBadges.length
  };
};

export const getNextBadge = (
  earnedBadgeIds: string[],
  programme: string
): Badge | null => {
  const programmeBadges = getBadgesByProgramme(programme);
  const levels: BadgeLevel[] = ['explorer', 'builder', 'innovator', 'leader'];
  
  for (const level of levels) {
    const badge = programmeBadges.find(
      b => b.level === level && !earnedBadgeIds.includes(b.id)
    );
    if (badge) return badge;
  }
  
  return null;
};

export default {
  ALL_BADGES,
  SCRAP_CAT_BADGES,
  GTECH_CASTERS_BADGES,
  TECHRENEURS_BADGES,
  OCN_QUALIFICATIONS,
  APPRENTICESHIP_STANDARDS,
  getBadgesByProgramme,
  getBadgesByLevel,
  getQualificationProgress,
  getNextBadge
};
