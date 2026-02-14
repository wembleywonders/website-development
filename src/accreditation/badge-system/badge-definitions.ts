// src/accreditation/badge-system/badge-definitions.ts
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
// PROGRAMME DEFINITIONS
// ============================================

export interface Programme {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  badges: string[]; // Badge IDs
  ocnPathway: string[];
  apprenticeshipPathway?: string;
}

export const PROGRAMMES: Programme[] = [
  {
    id: 'scrap-cat',
    name: 'Scrap Cat',
    emoji: '♻️',
    tagline: 'Reduce. Repair. Reuse.',
    color: '#10b981',
    badges: ['sc-explorer', 'sc-builder', 'sc-innovator', 'sc-leader'],
    ocnPathway: ['ocn-it-award', 'ocn-it-cert'],
    apprenticeshipPathway: 'it-support-technician'
  },
  {
    id: 'g-tech-casters',
    name: 'G-Tech Casters',
    emoji: '🎙️',
    tagline: 'Your Voice. Your Platform. Your Story.',
    color: '#8b5cf6',
    badges: ['gtc-explorer', 'gtc-builder', 'gtc-innovator', 'gtc-leader'],
    ocnPathway: ['ocn-media-award', 'ocn-media-cert'],
    apprenticeshipPathway: 'content-creator'
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    emoji: '💰',
    tagline: 'Ideas. Income. Impact.',
    color: '#f59e0b',
    badges: ['te-explorer', 'te-builder', 'te-innovator', 'te-leader'],
    ocnPathway: ['ocn-business-award', 'ocn-business-cert'],
    apprenticeshipPathway: 'business-administrator'
  },
  {
    id: 'stemgineers',
    name: 'STEMgineers',
    emoji: '🔧',
    tagline: 'Build. Code. Innovate.',
    color: '#3b82f6',
    badges: ['stm-explorer', 'stm-builder', 'stm-innovator', 'stm-leader'],
    ocnPathway: ['ocn-stem-award', 'ocn-digital-cert'],
    apprenticeshipPathway: 'digital-support-technician'
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    emoji: '🎭',
    tagline: 'Stories. Stage. Legacy.',
    color: '#ec4899',
    badges: ['kc-explorer', 'kc-builder', 'kc-innovator', 'kc-leader'],
    ocnPathway: ['ocn-performing-award', 'ocn-performing-cert'],
    apprenticeshipPathway: undefined
  },
  {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    emoji: '👗',
    tagline: 'Style. Confidence. Success.',
    color: '#d62828',
    badges: ['ss-explorer', 'ss-builder', 'ss-innovator', 'ss-leader'],
    ocnPathway: ['ocn-creative-award'],
    apprenticeshipPathway: undefined
  },
  {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    emoji: '🍲',
    tagline: 'Heritage. Flavor. Memory.',
    color: '#ea580c',
    badges: ['aak-explorer', 'aak-builder', 'aak-innovator', 'aak-leader'],
    ocnPathway: [],
    apprenticeshipPathway: undefined
  },
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    emoji: '🎧',
    tagline: 'Sound. System. Culture.',
    color: '#7c3aed',
    badges: ['tnb-explorer', 'tnb-builder', 'tnb-innovator', 'tnb-leader'],
    ocnPathway: ['ocn-media-award'],
    apprenticeshipPathway: undefined
  },
  {
    id: 'page-turners',
    name: 'PageTurners',
    emoji: '📚',
    tagline: 'Read. Write. Publish.',
    color: '#0891b2',
    badges: ['pt-explorer', 'pt-builder', 'pt-innovator', 'pt-leader'],
    ocnPathway: [],
    apprenticeshipPathway: undefined
  },
  {
    id: 'joystick',
    name: 'Joystick',
    emoji: '🎮',
    tagline: 'Play. Create. Compete.',
    color: '#16a34a',
    badges: ['js-explorer', 'js-builder', 'js-innovator', 'js-leader'],
    ocnPathway: ['ocn-media-award'],
    apprenticeshipPathway: undefined
  }
];

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
// STEMGINEERS BADGES
// ============================================

export const STEMGINEERS_BADGES: Badge[] = [
  {
    id: 'stm-explorer',
    name: 'Digital Literacy Explorer',
    level: 'explorer',
    programme: 'STEMgineers',
    programmeEmoji: '🔧',
    description: 'Learn coding basics and complete first mini-project',
    requirements: [
      'Complete digital literacy fundamentals',
      'Write and run first code program',
      'Build a simple project (LED, game, etc.)'
    ],
    evidenceTypes: [
      'Code samples',
      'Project demonstration',
      'Learning log',
      'Assessor observation'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['STEM-E3-01', 'STEM-E3-02', 'STEM-L1-01'],
    unlocks: ['stm-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'stm-builder',
    name: 'Maker Engineer',
    level: 'builder',
    programme: 'STEMgineers',
    programmeEmoji: '🔧',
    description: 'Build functional prototypes using electronics/robotics',
    requirements: [
      'Complete a functional hardware project',
      'Document the build process',
      'Present at showcase event'
    ],
    evidenceTypes: [
      'Working prototype',
      'Build documentation',
      'Circuit diagrams',
      'Presentation recording',
      'Peer feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['STEM-L1-02', 'STEM-L1-03', 'STEM-L2-01'],
    unlocks: ['stm-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'stm-innovator',
    name: 'AI Explorer',
    level: 'innovator',
    programme: 'STEMgineers',
    programmeEmoji: '🔧',
    description: 'Design AI-powered solutions and understand data ethics',
    requirements: [
      'Build a chatbot or AI-assisted tool',
      'Complete data ethics module',
      'Create solution for real community problem'
    ],
    evidenceTypes: [
      'AI project demonstration',
      'Ethics reflection',
      'Community impact statement',
      'Technical documentation'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['STEM-L2-02', 'STEM-L2-03', 'STEM-L2-04'],
    unlocks: ['stm-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'stm-leader',
    name: 'Eco Innovator',
    level: 'leader',
    programme: 'STEMgineers',
    programmeEmoji: '🔧',
    description: 'Lead sustainability projects and mentor others',
    requirements: [
      'Lead a Hackathon team',
      'Create sustainable tech solution',
      'Mentor 3 new STEMgineers'
    ],
    evidenceTypes: [
      'Hackathon project',
      'Sustainability assessment',
      'Mentoring log',
      'Leadership reflection'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['STEM-L2-05', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// KAYWANA'S COURT BADGES
// ============================================

export const KAYWANAS_COURT_BADGES: Badge[] = [
  {
    id: 'kc-explorer',
    name: 'Character Workshop',
    level: 'explorer',
    programme: "Kaywana's Court",
    programmeEmoji: '🎭',
    description: 'Explore character development and basic performance',
    requirements: [
      'Complete character creation workshop',
      'Perform a short monologue',
      'Participate in ensemble exercise'
    ],
    evidenceTypes: [
      'Character profile',
      'Monologue recording',
      'Workshop attendance',
      'Peer feedback'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['PA-L1-01', 'PA-L1-02'],
    unlocks: ['kc-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'kc-builder',
    name: 'Ensemble Member',
    level: 'builder',
    programme: "Kaywana's Court",
    programmeEmoji: '🎭',
    description: 'Perform in group productions and develop stage presence',
    requirements: [
      'Perform in one production',
      'Complete stage movement workshop',
      'Support technical/backstage role'
    ],
    evidenceTypes: [
      'Performance recording',
      'Workshop completion',
      'Technical role log',
      'Director feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['PA-L1-03', 'PA-L2-01', 'PA-L2-02'],
    unlocks: ['kc-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'kc-innovator',
    name: 'Featured Performer',
    level: 'innovator',
    programme: "Kaywana's Court",
    programmeEmoji: '🎭',
    description: 'Take leading roles and contribute to production',
    requirements: [
      'Lead role in production',
      'Contribute original writing/devising',
      'Document oral history from elder'
    ],
    evidenceTypes: [
      'Lead performance recording',
      'Original script/devised piece',
      'Oral history recording',
      'Audience feedback'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['PA-L2-03', 'PA-L2-04', 'PA-L2-05'],
    unlocks: ['kc-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'kc-leader',
    name: 'Director',
    level: 'leader',
    programme: "Kaywana's Court",
    programmeEmoji: '🎭',
    description: 'Direct productions and mentor performers',
    requirements: [
      'Direct a short production',
      'Mentor 3 new performers',
      'Preserve heritage performance tradition'
    ],
    evidenceTypes: [
      'Production documentation',
      'Mentoring log',
      'Heritage preservation record',
      'Cast/crew feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['PA-L2-06', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// SILK STILETTOS BADGES
// ============================================

export const SILK_STILETTOS_BADGES: Badge[] = [
  {
    id: 'ss-explorer',
    name: 'Style Explorer',
    level: 'explorer',
    programme: 'Silk Stilettos',
    programmeEmoji: '👗',
    description: 'Discover personal style and creative interests',
    requirements: [
      'Complete style assessment',
      'Identify 3+ creative pathways',
      'Set personal style goals'
    ],
    evidenceTypes: [
      'Style profile',
      'Pathways selected',
      'Goals documented',
      'Self-reflection'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['CI-L1-01', 'CI-L1-02'],
    unlocks: ['ss-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'ss-builder',
    name: 'Personal Stylist',
    level: 'builder',
    programme: 'Silk Stilettos',
    programmeEmoji: '👗',
    description: 'Develop styling skills and build portfolio',
    requirements: [
      'Complete 3 styling consultations',
      'Build mood board portfolio',
      'Create social media content'
    ],
    evidenceTypes: [
      'Consultation records',
      'Portfolio images',
      'Social content',
      'Client feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CI-L1-03', 'CI-L2-01', 'CI-L2-02'],
    unlocks: ['ss-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'ss-innovator',
    name: 'Creative Entrepreneur',
    level: 'innovator',
    programme: 'Silk Stilettos',
    programmeEmoji: '👗',
    description: 'Launch creative services and generate income',
    requirements: [
      'Launch service on Cyberstore',
      'Complete 5 paid consultations',
      'Host styling workshop'
    ],
    evidenceTypes: [
      'Cyberstore listing',
      'Revenue evidence',
      'Workshop documentation',
      'Testimonials'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['CI-L2-03', 'CI-L2-04', 'BE-L2-04'],
    unlocks: ['ss-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'ss-leader',
    name: 'Creative Director',
    level: 'leader',
    programme: 'Silk Stilettos',
    programmeEmoji: '👗',
    description: 'Lead creative projects and mentor others',
    requirements: [
      'Direct photoshoot or event',
      'Mentor 3 new stylists',
      'Create programme content'
    ],
    evidenceTypes: [
      'Project portfolio',
      'Mentoring log',
      'Content created',
      'Team feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CI-L2-05', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// AUNTIE ANANSI'S KITCHEN BADGES
// ============================================

export const AUNTIE_ANANSIS_KITCHEN_BADGES: Badge[] = [
  {
    id: 'aak-explorer',
    name: 'Recipe Keeper',
    level: 'explorer',
    programme: "Auntie Anansi's Kitchen",
    programmeEmoji: '🍲',
    description: 'Document family recipes and food memories',
    requirements: [
      'Document 3 family recipes',
      'Record heritage story for each',
      'Complete food safety basics'
    ],
    evidenceTypes: [
      'Recipe documentation',
      'Heritage notes',
      'Food safety certificate',
      'Photo evidence'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: [],
    unlocks: ['aak-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'aak-builder',
    name: 'Heritage Cook',
    level: 'builder',
    programme: "Auntie Anansi's Kitchen",
    programmeEmoji: '🍲',
    description: 'Master traditional techniques and share knowledge',
    requirements: [
      'Complete 5 heritage dishes',
      'Interview elder about food traditions',
      'Host tasting session'
    ],
    evidenceTypes: [
      'Cooking portfolio',
      'Elder interview recording',
      'Tasting event photos',
      'Feedback forms'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: [],
    unlocks: ['aak-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'aak-innovator',
    name: 'Food Storyteller',
    level: 'innovator',
    programme: "Auntie Anansi's Kitchen",
    programmeEmoji: '🍲',
    description: 'Publish recipes and preserve culinary heritage',
    requirements: [
      'Publish 10 recipes on platform',
      'Create video cooking content',
      'Preserve endangered recipe'
    ],
    evidenceTypes: [
      'Published recipes',
      'Video content',
      'Heritage preservation record',
      'Community feedback'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: [],
    unlocks: ['aak-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'aak-leader',
    name: 'Kitchen Elder',
    level: 'leader',
    programme: "Auntie Anansi's Kitchen",
    programmeEmoji: '🍲',
    description: 'Lead cooking sessions and mentor food storytellers',
    requirements: [
      'Lead cooking workshop series',
      'Mentor 3 new participants',
      'Create heritage cookbook content'
    ],
    evidenceTypes: [
      'Workshop documentation',
      'Mentoring log',
      'Cookbook contributions',
      'Participant feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: [],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// TRUBBLE N BASS BADGES
// ============================================

export const TRUBBLE_N_BASS_BADGES: Badge[] = [
  {
    id: 'tnb-explorer',
    name: 'Sound System Student',
    level: 'explorer',
    programme: 'Trubble n Bass',
    programmeEmoji: '🎧',
    description: 'Learn sound system fundamentals and music selection',
    requirements: [
      'Complete sound system history module',
      'Learn basic mixing techniques',
      'Curate first playlist'
    ],
    evidenceTypes: [
      'History quiz completion',
      'Mix recording',
      'Playlist documentation',
      'Mentor feedback'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['CM-L1-01', 'CM-L1-02'],
    unlocks: ['tnb-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'tnb-builder',
    name: 'Selector',
    level: 'builder',
    programme: 'Trubble n Bass',
    programmeEmoji: '🎧',
    description: 'Develop DJ skills and perform at events',
    requirements: [
      'Complete 3 practice sets',
      'Support at live event',
      'Build equipment knowledge'
    ],
    evidenceTypes: [
      'Set recordings',
      'Event participation',
      'Equipment assessment',
      'Peer feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L2-01', 'CM-L2-02'],
    unlocks: ['tnb-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'tnb-innovator',
    name: 'Sound System Operator',
    level: 'innovator',
    programme: 'Trubble n Bass',
    programmeEmoji: '🎧',
    description: 'Master sound system operation and live performance',
    requirements: [
      'Headline set at event',
      'Complete sound system build/setup',
      'Produce original music'
    ],
    evidenceTypes: [
      'Live performance recording',
      'Setup documentation',
      'Original production',
      'Audience feedback'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['CM-L2-03', 'CM-L2-04'],
    unlocks: ['tnb-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'tnb-leader',
    name: 'Sound System Owner',
    level: 'leader',
    programme: 'Trubble n Bass',
    programmeEmoji: '🎧',
    description: 'Lead sound system crew and preserve culture',
    requirements: [
      'Lead event production',
      'Mentor 3 selectors',
      'Document sound system heritage'
    ],
    evidenceTypes: [
      'Event documentation',
      'Mentoring log',
      'Heritage preservation',
      'Crew feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L2-05', 'GEN-L2-01', 'GEN-L2-02'],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// PAGETURNERS BADGES
// ============================================

export const PAGETURNERS_BADGES: Badge[] = [
  {
    id: 'pt-explorer',
    name: 'Reader',
    level: 'explorer',
    programme: 'PageTurners',
    programmeEmoji: '📚',
    description: 'Develop reading habits and share discoveries',
    requirements: [
      'Complete 3 books',
      'Write reading reflections',
      'Participate in book discussion'
    ],
    evidenceTypes: [
      'Reading log',
      'Reflection writing',
      'Discussion participation',
      'Book recommendations'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: [],
    unlocks: ['pt-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'pt-builder',
    name: 'Writer',
    level: 'builder',
    programme: 'PageTurners',
    programmeEmoji: '📚',
    description: 'Develop writing skills and create original content',
    requirements: [
      'Complete writing workshop series',
      'Write 3 original pieces',
      'Receive peer feedback'
    ],
    evidenceTypes: [
      'Workshop attendance',
      'Writing portfolio',
      'Peer feedback',
      'Self-reflection'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: [],
    unlocks: ['pt-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'pt-innovator',
    name: 'Published Author',
    level: 'innovator',
    programme: 'PageTurners',
    programmeEmoji: '📚',
    description: 'Publish written work and build audience',
    requirements: [
      'Publish on Joystick platform',
      'Complete longer-form piece',
      'Build reader following'
    ],
    evidenceTypes: [
      'Published work links',
      'Long-form manuscript',
      'Reader metrics',
      'Feedback compilation'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: [],
    unlocks: ['pt-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'pt-leader',
    name: 'Editor',
    level: 'leader',
    programme: 'PageTurners',
    programmeEmoji: '📚',
    description: 'Lead writing groups and mentor authors',
    requirements: [
      'Lead book club or writing group',
      'Mentor 3 new writers',
      'Edit anthology contribution'
    ],
    evidenceTypes: [
      'Group leadership log',
      'Mentoring records',
      'Editing portfolio',
      'Participant feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: [],
    unlocks: [],
    membershipAlignment: 'curator'
  }
];

// ============================================
// JOYSTICK BADGES
// ============================================

export const JOYSTICK_BADGES: Badge[] = [
  {
    id: 'js-explorer',
    name: 'Gamer',
    level: 'explorer',
    programme: 'Joystick',
    programmeEmoji: '🎮',
    description: 'Explore gaming community and develop skills',
    requirements: [
      'Join gaming community',
      'Complete skill assessment',
      'Participate in casual tournament'
    ],
    evidenceTypes: [
      'Community membership',
      'Skill profile',
      'Tournament participation',
      'Gaming log'
    ],
    credits: 6,
    glh: 45,
    ocnUnits: ['CM-L1-03'],
    unlocks: ['js-builder'],
    membershipAlignment: 'visitor'
  },
  {
    id: 'js-builder',
    name: 'Content Creator',
    level: 'builder',
    programme: 'Joystick',
    programmeEmoji: '🎮',
    description: 'Create gaming content and build following',
    requirements: [
      'Create 5 content pieces',
      'Stream or record gameplay',
      'Build social presence'
    ],
    evidenceTypes: [
      'Content portfolio',
      'Stream/video links',
      'Social analytics',
      'Audience feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L2-01', 'CM-L2-07'],
    unlocks: ['js-innovator'],
    membershipAlignment: 'champion'
  },
  {
    id: 'js-innovator',
    name: 'Esports Competitor',
    level: 'innovator',
    programme: 'Joystick',
    programmeEmoji: '🎮',
    description: 'Compete in tournaments and represent community',
    requirements: [
      'Compete in ranked tournament',
      'Achieve competitive ranking',
      'Represent Wembley Wonders team'
    ],
    evidenceTypes: [
      'Tournament results',
      'Ranking evidence',
      'Team participation',
      'Performance analysis'
    ],
    credits: 10,
    glh: 80,
    ocnUnits: ['CM-L2-04', 'CM-L2-05'],
    unlocks: ['js-leader'],
    membershipAlignment: 'connector'
  },
  {
    id: 'js-leader',
    name: 'Team Captain',
    level: 'leader',
    programme: 'Joystick',
    programmeEmoji: '🎮',
    description: 'Lead esports team and organize events',
    requirements: [
      'Captain competitive team',
      'Organize tournament/event',
      'Mentor 3 new gamers'
    ],
    evidenceTypes: [
      'Team leadership log',
      'Event documentation',
      'Mentoring records',
      'Team feedback'
    ],
    credits: 9,
    glh: 70,
    ocnUnits: ['CM-L2-08', 'GEN-L2-01', 'GEN-L2-02'],
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
  },
  
  // STEMgineers
  {
    id: 'ocn-stem-award',
    title: 'OCN Award in STEM Skills',
    level: 'Entry 3',
    credits: 6,
    requiredBadges: ['stm-explorer'],
    apprenticeshipPathway: 'digital-support-technician'
  },
  {
    id: 'ocn-digital-cert',
    title: 'OCN Certificate in Digital Skills for Work',
    level: 'Level 2',
    credits: 15,
    requiredBadges: ['stm-explorer', 'stm-builder', 'stm-innovator'],
    apprenticeshipPathway: 'digital-support-technician'
  },
  
  // Kaywana's Court
  {
    id: 'ocn-performing-award',
    title: 'OCN Award in Performing Arts',
    level: 'Level 1',
    credits: 6,
    requiredBadges: ['kc-explorer']
  },
  {
    id: 'ocn-performing-cert',
    title: 'OCN Certificate in Performance Skills',
    level: 'Level 2',
    credits: 18,
    requiredBadges: ['kc-explorer', 'kc-builder', 'kc-innovator']
  },
  
  // Creative Industries (shared)
  {
    id: 'ocn-creative-award',
    title: 'OCN Award in Creative Industries',
    level: 'Level 1',
    credits: 6,
    requiredBadges: ['ss-explorer']
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
  ...TECHRENEURS_BADGES,
  ...STEMGINEERS_BADGES,
  ...KAYWANAS_COURT_BADGES,
  ...SILK_STILETTOS_BADGES,
  ...AUNTIE_ANANSIS_KITCHEN_BADGES,
  ...TRUBBLE_N_BASS_BADGES,
  ...PAGETURNERS_BADGES,
  ...JOYSTICK_BADGES
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getBadgesByProgramme = (programmeId: string): Badge[] => {
  const programme = PROGRAMMES.find(p => p.id === programmeId);
  if (!programme) return [];
  return ALL_BADGES.filter(badge => programme.badges.includes(badge.id));
};

export const getBadgesByLevel = (level: BadgeLevel): Badge[] => {
  return ALL_BADGES.filter(badge => badge.level === level);
};

export const getBadgeById = (badgeId: string): Badge | undefined => {
  return ALL_BADGES.find(badge => badge.id === badgeId);
};

export const getProgrammeById = (programmeId: string): Programme | undefined => {
  return PROGRAMMES.find(p => p.id === programmeId);
};

export const getQualificationProgress = (
  earnedBadgeIds: string[],
  qualificationId: string
): { earned: number; required: number; complete: boolean; percentage: number } => {
  const qualification = OCN_QUALIFICATIONS.find(q => q.id === qualificationId);
  if (!qualification) return { earned: 0, required: 0, complete: false, percentage: 0 };
  
  const earned = qualification.requiredBadges.filter(
    badgeId => earnedBadgeIds.includes(badgeId)
  ).length;
  
  const required = qualification.requiredBadges.length;
  
  return {
    earned,
    required,
    complete: earned === required,
    percentage: Math.round((earned / required) * 100)
  };
};

export const getNextBadge = (
  earnedBadgeIds: string[],
  programmeId: string
): Badge | null => {
  const programmeBadges = getBadgesByProgramme(programmeId);
  const levels: BadgeLevel[] = ['explorer', 'builder', 'innovator', 'leader'];
  
  for (const level of levels) {
    const badge = programmeBadges.find(
      b => b.level === level && !earnedBadgeIds.includes(b.id)
    );
    if (badge) return badge;
  }
  
  return null;
};

export const getMembershipTierFromBadges = (earnedBadgeIds: string[]): MembershipTier => {
  const earnedBadges = earnedBadgeIds.map(id => getBadgeById(id)).filter(Boolean) as Badge[];
  
  const hasLeader = earnedBadges.some(b => b.level === 'leader');
  const hasInnovator = earnedBadges.some(b => b.level === 'innovator');
  const hasBuilder = earnedBadges.some(b => b.level === 'builder');
  
  if (hasLeader) return 'curator';
  if (hasInnovator) return 'connector';
  if (hasBuilder) return 'champion';
  return 'visitor';
};

export const getTotalCredits = (earnedBadgeIds: string[]): number => {
  return earnedBadgeIds
    .map(id => getBadgeById(id))
    .filter(Boolean)
    .reduce((total, badge) => total + (badge?.credits || 0), 0);
};

export const getTotalGLH = (earnedBadgeIds: string[]): number => {
  return earnedBadgeIds
    .map(id => getBadgeById(id))
    .filter(Boolean)
    .reduce((total, badge) => total + (badge?.glh || 0), 0);
};

// ============================================
// EXPORTS
// ============================================

export default {
  // Types (re-exported for convenience)
  // Badge, BadgeLevel, MembershipTier, OCNQualification, ApprenticeshipStandard, Programme
  
  // Data
  PROGRAMMES,
  ALL_BADGES,
  SCRAP_CAT_BADGES,
  GTECH_CASTERS_BADGES,
  TECHRENEURS_BADGES,
  STEMGINEERS_BADGES,
  KAYWANAS_COURT_BADGES,
  SILK_STILETTOS_BADGES,
  AUNTIE_ANANSIS_KITCHEN_BADGES,
  TRUBBLE_N_BASS_BADGES,
  PAGETURNERS_BADGES,
  JOYSTICK_BADGES,
  OCN_QUALIFICATIONS,
  APPRENTICESHIP_STANDARDS,
  
  // Functions
  getBadgesByProgramme,
  getBadgesByLevel,
  getBadgeById,
  getProgrammeById,
  getQualificationProgress,
  getNextBadge,
  getMembershipTierFromBadges,
  getTotalCredits,
  getTotalGLH
};