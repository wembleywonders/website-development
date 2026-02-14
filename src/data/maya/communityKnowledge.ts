// Community Knowledge Base for Maya
// This file contains community-specific information that Maya uses to provide contextual guidance

export interface CommunityFact {
  id: string;
  category: 'programme' | 'event' | 'local' | 'organization' | 'jargon';
  topic: string;
  content: string;
  relevantPages: string[];
  lastUpdated: Date;
  confidenceLevel: 'high' | 'medium' | 'low';
}

export interface ProgrammeOutcome {
  programmeId: string;
  programmeName: string;
  successStories: string[];
  skillsLearned: string[];
  communityImpact: string[];
  participantFeedback: string[];
}

export interface LocalContext {
  area: string;
  demographics: string;
  challenges: string[];
  opportunities: string[];
  partnerships: string[];
}

// Base community knowledge that Maya starts with
export const baseCommunityKnowledge: CommunityFact[] = [
  {
    id: 'org_mission',
    category: 'organization',
    topic: 'mission',
    content: 'Wembley Wonders is a Community Interest Company focused on building skills and leadership in Wembley through resident-led programmes.',
    relevantPages: ['/', '/about', '/membership'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'prog_trubble_bass',
    category: 'programme',
    topic: 'Trubble n Bass',
    content: 'Spring programme combining music production, sound engineering, and media skills. Culminates in a live music event and feeds into Rayd-yo podcast production.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'prog_kaywana_court',
    category: 'programme',
    topic: 'Kaywana\'s Court',
    content: 'Summer drama and creative arts programme including LARP, Pageturner\'s writing workshop, and Silk Stilettos arts & crafts. Results in community theatre presentations.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'prog_bright_sparks',
    category: 'programme',
    topic: 'Bright Sparks',
    content: 'Autumn STEM and entrepreneurship programme for STEMgineers and Tech-preneurs. Culminates in a community tech showcase.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'prog_connoisseurs',
    category: 'programme',
    topic: 'Connoisseurs Social Club',
    content: 'Winter governance and community leadership programme. Includes AGM preparation and culminates in community celebration.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_stemgineer',
    category: 'jargon',
    topic: 'STEMgineer',
    content: 'A hands-on innovator who turns STEM into real-world solutions.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_techpreneur',
    category: 'jargon',
    topic: 'Tech-preneur',
    content: 'A bold creator who transforms technology into enterprise.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_larp',
    category: 'jargon',
    topic: 'LARP',
    content: 'Live Action Role Playing - interactive storytelling where you become the character.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_raydyo',
    category: 'jargon',
    topic: 'Rayd-yo',
    content: 'Our community radio platform for podcasts and local voices.',
    relevantPages: ['/calendar', '/raydyo'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_joystick',
    category: 'jargon',
    topic: 'Joystick e-zine',
    content: 'Digital magazine showcasing community stories and achievements.',
    relevantPages: ['/calendar', '/joystick'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_pageturners',
    category: 'jargon',
    topic: 'Pageturner\'s',
    content: 'Creative writing workshop for aspiring authors.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'jargon_silk_stilettos',
    category: 'jargon',
    topic: 'Silk Stilettos',
    content: 'Arts and crafts sessions for hands-on creativity.',
    relevantPages: ['/calendar'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'membership_pathways',
    category: 'organization',
    topic: 'membership',
    content: 'Three engagement levels: Residents/Participants (drop-in), Members (regular access), and Active Volunteer Members (enhanced benefits and voting rights).',
    relevantPages: ['/about', '/membership'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'commitment_levels',
    category: 'organization',
    topic: 'time commitment',
    content: 'Each programme runs 8 weeks at 2 hours per week (16 total hours, about 4 hours monthly). Flexible participation encouraged.',
    relevantPages: ['/calendar', '/about'],
    lastUpdated: new Date(),
    confidenceLevel: 'high'
  },
  {
    id: 'local_wembley',
    category: 'local',
    topic: 'Wembley community',
    content: 'Diverse North London community known for Wembley Stadium. Mix of long-term residents and newcomers, with growing interest in community development.',
    relevantPages: ['/about'],
    lastUpdated: new Date(),
    confidenceLevel: 'medium'
  }
];

// Programme outcomes tracking (starts empty, gets populated over time)
export const programmeOutcomes: ProgrammeOutcome[] = [];

// Local context for Wembley
export const wembleyContext: LocalContext = {
  area: 'Wembley, North London',
  demographics: 'Diverse community with mix of families, young professionals, and long-term residents',
  challenges: [
    'Limited community spaces for creative activities',
    'Need for digital skills development',
    'Desire for more local leadership opportunities',
    'Building connections between different community groups'
  ],
  opportunities: [
    'Strong community spirit and engagement',
    'Proximity to major transport links',
    'Growing interest in sustainable community development',
    'Rich cultural diversity as community asset'
  ],
  partnerships: [
    'Local schools and educational institutions',
    'Brent Council community development initiatives',
    'Local businesses interested in community engagement',
    'Other community organizations in the area'
  ]
};

// Functions for updating community knowledge
export const updateCommunityKnowledge = (newFact: Omit<CommunityFact, 'id' | 'lastUpdated'>) => {
  const fact: CommunityFact = {
    ...newFact,
    id: `${newFact.category}_${Date.now()}`,
    lastUpdated: new Date()
  };
  baseCommunityKnowledge.push(fact);
  return fact;
};

export const addProgrammeOutcome = (outcome: ProgrammeOutcome) => {
  programmeOutcomes.push(outcome);
};

// Helper functions for Maya to use
export const getRelevantKnowledge = (page: string, topic?: string) => {
  return baseCommunityKnowledge.filter(fact => 
    fact.relevantPages.includes(page) || 
    (topic && fact.topic.toLowerCase().includes(topic.toLowerCase()))
  );
};

export const getJargonDefinition = (term: string) => {
  return baseCommunityKnowledge.find(fact => 
    fact.category === 'jargon' && 
    fact.topic.toLowerCase() === term.toLowerCase()
  );
};

export const getProgrammeInfo = (programmeName: string) => {
  return baseCommunityKnowledge.find(fact => 
    fact.category === 'programme' && 
    fact.topic.toLowerCase().includes(programmeName.toLowerCase())
  );
};

// Common visitor questions and responses
export const commonQuestions = {
  cost: "Most of our programmes are free or low-cost. We believe cost shouldn't be a barrier to community participation.",
  time: "Each programme runs 8 weeks with 2-hour sessions weekly. That's about 4 hours per month - very manageable!",
  experience: "No prior experience needed! Our programmes welcome complete beginners and build skills from the ground up.",
  commitment: "We understand life happens. While we encourage completion, you can participate at your own pace.",
  membership: "You can start as a drop-in participant, then become a member for regular access, and eventually an active volunteer member with voting rights.",
  transport: "We're well-connected by public transport. Wembley Central and Wembley Park stations are nearby.",
  childcare: "We're working on childcare options for some programmes. Contact us to discuss your specific needs.",
  accessibility: "We're committed to accessibility. Let us know what accommodations you need and we'll work to provide them."
};

export default {
  baseCommunityKnowledge,
  programmeOutcomes,
  wembleyContext,
  commonQuestions,
  updateCommunityKnowledge,
  addProgrammeOutcome,
  getRelevantKnowledge,
  getJargonDefinition,
  getProgrammeInfo
};