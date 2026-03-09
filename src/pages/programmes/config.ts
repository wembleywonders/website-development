/**
 * Central configuration for all programmes
 * Edit programme details here - they'll update across the site
 */

export interface ProgrammeConfig {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  color: string;
  duration: string;
  groupSize: string;
  timeCommitment: string;
  investment: string;
  location: string;
  whoFor: string;
  // Optional fields for specialist programmes
  led?: string;
  leads?: string[];
  rov?: string;
  status?: 'active' | 'coming-soon' | 'building';
  launchDate?: string;
  cyberstore?: boolean;
  apothecary?: boolean;
  pipeline: {
    impactLab: string;
    platform: string;
    showcase: string;
    monetize: string;
  };
  learning: {
    cultural?: string[];
    technical?: string[];
    performance?: string[];
    professional?: string[];
  };
}

export const PROGRAMMES: Record<string, ProgrammeConfig> = {
  'trubble-n-bass': {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    tagline: 'Create Beats. Get Heard. Earn Income.',
    description: 'Music production rooted in African and Caribbean rhythms.',
    color: '#10b981',
    duration: '8-week seasonal programmes',
    groupSize: '12-15 creators per cohort',
    timeCommitment: '2 hours/week workshops + self-paced practice',
    investment: 'Sliding scale £0-200 (no one turned away)',
    location: 'Wembley Hub + Online (hybrid)',
    whoFor: 'Ages 16+ | All skill levels',
    pipeline: {
      impactLab: 'Create certified beats in Trubble n Bass Builder',
      platform: 'Get featured on Rayd-yo radio every Friday',
      showcase: 'Perform live at quarterly showcases',
      monetize: 'Sell beats on Cyberstore - keep 55% of every sale'
    },
    learning: {
      cultural: [
        'African polyrhythm & drumming traditions',
        'Caribbean syncopation & groove',
        'UK sound system culture'
      ],
      technical: [
        'Beat construction & arrangement',
        'Sound design & synthesis basics',
        'Mixing & mastering fundamentals'
      ]
    }
  },

  'stemgeneers': {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🤖',
    tagline: 'Build. Code. Engineer.',
    description: 'Science, Technology, Engineering, and Math through hands-on projects.',
    color: '#3b82f6',
    duration: 'Year-round track',
    groupSize: '12-15 participants',
    timeCommitment: '2 hours/week + project time',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub + Online',
    whoFor: 'Ages 13+ | Beginners welcome',
    pipeline: {
      impactLab: 'Build robots, code projects, solve challenges',
      platform: 'Share on community showcase',
      showcase: 'Demo at tech fairs',
      monetize: 'Sell tech solutions'
    },
    learning: {
      technical: [
        'Programming (Python, JavaScript)',
        'Robotics & electronics',
        'Problem-solving'
      ]
    }
  },

  'techreneurs': {
    id: 'techreneurs',
    name: 'TECHreneurs',
    icon: '💼',
    tagline: 'Build Businesses. Create Impact.',
    description: 'Tech entrepreneurship - from idea to launch.',
    color: '#8b5cf6',
    duration: 'Year-round track',
    groupSize: '10-12 entrepreneurs',
    timeCommitment: '2 hours/week + venture building',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub + Online',
    whoFor: 'Ages 16+ | Aspiring entrepreneurs',
    pipeline: {
      impactLab: 'Develop and validate business ideas',
      platform: 'Pitch at community events',
      showcase: 'Launch products/services',
      monetize: 'Generate revenue'
    },
    learning: {
      technical: [
        'Business model development',
        'Market research',
        'Financial planning'
      ]
    }
  },

  'gtechcasters': {
    id: 'gtechcasters',
    name: 'G-TechCasters',
    icon: '🎙️',
    tagline: 'Create. Broadcast. Engage.',
    description: 'Digital media & broadcasting.',
    color: '#ef4444',
    duration: 'Year-round track',
    groupSize: '12-15 creators',
    timeCommitment: '2 hours/week + content creation',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub + Online',
    whoFor: 'Ages 13+ | All levels',
    pipeline: {
      impactLab: 'Produce podcasts and digital content',
      platform: 'Publish on Rayd-yo',
      showcase: 'Featured at showcases',
      monetize: 'Sponsored content'
    },
    learning: {
      technical: [
        'Audio recording & editing',
        'Video production',
        'Broadcasting skills'
      ]
    }
  },

  'kaywanas-court': {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    icon: '🎭',
    tagline: 'Culture. Heritage. Performance.',
    description: 'Cultural arts celebrating African and Caribbean heritage.',
    color: '#ec4899',
    duration: '8-week seasonal programmes',
    groupSize: '15-20 participants',
    timeCommitment: '2 hours/week + rehearsal',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub',
    whoFor: 'All ages | All levels',
    pipeline: {
      impactLab: 'Develop performances and art',
      platform: 'Showcase at community events',
      showcase: 'Quarterly performances',
      monetize: 'Performance fees'
    },
    learning: {
      cultural: [
        'African and Caribbean cultural history',
        'Traditional and contemporary performance'
      ]
    }
  },

  'pageturners': {
    id: 'pageturners',
    name: 'Pageturners',
    icon: '✍️',
    tagline: 'Write. Share. Publish.',
    description: 'Creative writing workshop.',
    color: '#f59e0b',
    duration: '8-week seasonal programmes',
    groupSize: '12-15 writers',
    timeCommitment: '2 hours/week + writing time',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub + Online',
    whoFor: 'Ages 13+ | All levels',
    pipeline: {
      impactLab: 'Write and refine your work',
      platform: 'Publish in Joystick e-zine',
      showcase: 'Reading series',
      monetize: 'Paid publications'
    },
    learning: {
      technical: [
        'Creative writing techniques',
        'Editing and revision'
      ]
    }
  },

  'silk-stilettos': {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    icon: '👠',
    tagline: 'Women Creating. Women Leading.',
    description: 'Women-only creative space.',
    color: '#db2777',
    duration: '8-week seasonal programmes',
    groupSize: '12-15 women',
    timeCommitment: '2 hours/week + project time',
    investment: 'Sliding scale £0-200',
    location: 'Wembley Hub',
    whoFor: 'Women 16+',
    pipeline: {
      impactLab: 'Create art, fashion, business projects',
      platform: 'Showcase in community events',
      showcase: 'Silk Stilettos exhibitions',
      monetize: 'Sell work and build businesses'
    },
    learning: {
      technical: [
        'Fashion design & illustration',
        'Product development',
        'Business for creatives'
      ]
    }
  },

  'bright-sparks': {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    icon: '⚡',
    tagline: 'Young Minds. Big Ideas.',
    description: 'Summer programme exploring all creative pathways.',
    color: '#fbbf24',
    duration: '8-week summer intensive',
    groupSize: '20-25 youth',
    timeCommitment: '4 hours/week',
    investment: 'Sliding scale £0-150',
    location: 'Wembley Hub',
    whoFor: 'Ages 13-16',
    pipeline: {
      impactLab: 'Try all programmes',
      platform: 'Share across all platforms',
      showcase: 'End-of-summer showcase',
      monetize: 'Continue into year-round programmes'
    },
    learning: {
      technical: [
        'Introduction to all creative pathways',
        'Project-based learning'
      ]
    }
  },

  'auntie-anansis-kitchen': {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Spoon-Lickin' Kitchen",
    icon: '🍲',
    tagline: 'Preserve Culture. Reclaim Heritage. Build Wealth.',
    description: 'Where Caribbean diversity meets culinary sovereignty. The UK food market treats "Caribbean cuisine" as if Jamaica is the only island. Notting Hill Carnival - started by Trinidadians - is now 90% Jamaican vendors. Meanwhile, Grenadian, St Lucian, Bajan, Vincentian, Guyanese, Dominican, and Antiguan recipes are dying with diaspora elders. We document island-specific traditions, challenge cultural monoculture, and help you build authentic food businesses that honour ALL Caribbean nations.',
    color: '#f97316',
    duration: '8-week seasonal programmes',
    groupSize: '10-12 heritage keepers per cohort',
    timeCommitment: '3 hours/week (includes cooking + documentation)',
    investment: 'Sliding scale £0-200 (ingredients provided)',
    location: 'Wembley Hub Community Kitchen',
    whoFor: 'Caribbean diaspora (ALL islands) | Food entrepreneurs | Heritage keepers | Ages 16+',
    pipeline: {
      impactLab: 'Document family recipes from YOUR island - Grenada, St Lucia, Barbados, Trinidad, Dominica, St Vincent, Guyana, Antigua. Record Auntie\'s stories and traditional methods before they\'re lost.',
      platform: 'Publish island-specific cookbooks and video archives challenging UK Caribbean food monoculture',
      showcase: 'Host educational pop-up dinners - teach customers Caribbean diversity beyond jerk chicken',
      monetize: 'Launch authentic island-specific catering/products filling massive market gap - keep 55%'
    },
    learning: {
      cultural: [
        'Caribbean culinary diversity - why Grenadian oil down ≠ Jamaican jerk ≠ Bajan cou-cou',
        'How commercial interests and licensing erased non-Jamaican cuisines from Notting Hill Carnival',
        'Anansi folklore across different Caribbean storytelling traditions',
        'Food as political resistance, cultural preservation, and identity reclamation',
        'Intergenerational knowledge transfer - recording Aunties\' wisdom before it\'s too late',
        'Market reality: UK customers want "authentic Caribbean" but only know one island\'s food'
      ],
      technical: [
        'Island-specific traditional cooking methods and ingredients',
        'Recipe documentation, video archiving, and oral history recording',
        'Food costing for authentic (not fusion) dishes',
        'Sourcing authentic ingredients for underrepresented island cuisines',
        'Pop-up operations with cultural education component',
        'Food safety, kitchen management, and scaling traditional recipes'
      ],
      professional: [
        'Market positioning: "authentic Grenadian" not "Caribbean fusion"',
        'Storytelling that educates customers on Caribbean diversity',
        'Building food business serving underrepresented diaspora communities',
        'Heritage tourism partnerships and cultural consultation opportunities',
        'Creating island-specific brands (cookbooks, bottled products, catering)',
        'Navigating licensing, pop-ups, and food business regulations'
      ]
    }
  },

  // ── Roots ────────────────────────────────────────────────────────────────
  // Women-led · Women-directed · Women-managed
  // Leads: Judith Fontanelle (Director, Community Engagement)
  //        Flora Agba (H&S Risk Management Event Coordinator)
  //        Natalie (Women's Studies Consultant, BA Roehampton)
  // ROV: Aya — body sovereignty knowledge keeper
  // Status: coming-soon → building (after founding team session)
  //         → active on IWD 8 March 2026

  'roots': {
    id: 'roots',
    name: 'Roots',
    icon: '🌿',
    tagline: 'The knowledge that should have been handed down.',
    description: 'A women-led body sovereignty resource — hair science, chemical literacy, the history of appearance standards, evidence-graded remedies, mixed heritage hair care for new mothers, and a creator economy for community-developed natural alternatives. What your body is. What it isn\'t. What they didn\'t tell you.',
    color: '#4A6741',
    duration: 'Year-round resource + seasonal workshops',
    groupSize: 'Open community resource + cohort training (12-15 per mothers\' pathway)',
    timeCommitment: 'Self-paced archive access + monthly workshops',
    investment: 'Free resource access | Sliding scale £0-200 for training pathways',
    location: 'Online archive + Wembley Hub workshops + East London salon network',
    whoFor: 'Women of all ages | New and young mothers | Mixed heritage families | Natural hair creators | Ages 16+',
    led: 'Women-led · Women-directed · Women-managed',
    leads: ['Judith Fontanelle', 'Flora Agba', 'Natalie'],
    rov: 'aya',
    status: 'coming-soon',
    launchDate: '2026-03-08',
    cyberstore: true,
    apothecary: true,
    pipeline: {
      impactLab: 'Access the knowledge archive — hair science by texture, ingredient literacy, remedies database, legal rights. Use Aya to get personalised guidance.',
      platform: 'Contribute to the archive. Share seasonal guides. Add your remedies and formulations to the community database.',
      showcase: 'IWD launch event 8 March 2026 — "What They Didn\'t Tell You". Mothers\' Day workshop 22 March. Quarterly Apothecary showcases.',
      monetize: 'Develop natural hair and beauty alternatives through the Apothecary pathway. List on Cyberstore — keep 55% of every sale.'
    },
    learning: {
      cultural: [
        'History of appearance standards — the nasal index, lip standards, colorism, the nubility requirement',
        'The good hair taxonomy and its origins in plantation social hierarchies',
        'Skin bleaching — Fair & Lovely campaign history, mercury content, the anti-Blackness operating at the level of the body',
        'The natural hair movement as political act — the Halo Code, the CROWN Act, UK workplace discrimination',
        'Intragroup colorism as legacy of divide-and-rule',
        'Caribbean, South Asian, East Asian, and MENA beauty standard pressures and their distinct histories',
        'The Sapeur principle: style as conscious choice, not compelled compliance'
      ],
      technical: [
        'Hair science by texture — porosity, density, elasticity, scalp pH, sebum travel',
        'Chemical literacy — sodium hydroxide in edge controls, relaxer chemistry, bleach developer volumes, DMDM hydantoin',
        'Evidence-graded remedies — traction alopecia, chemical damage, hyperpigmentation, skin bleaching damage',
        'Ingredient red flags — INCI naming, what to look for, what to avoid',
        'Mixed heritage hair care by texture type — practical guidance for new and young mothers',
        'Seasonal hair care — back to school, winter damage, half-term reset, spring/summer management',
        'Your rights in the hairdresser\'s chair — consent, scripts for speaking up, what to do when things go wrong'
      ],
      professional: [
        'Apothecary formulation — ingredient combinations, what works together and why',
        'UK Cosmetic Products Regulation — what claims you can make, INCI naming, the compliance pathway',
        'Community testing methodology — getting real feedback before commercial launch',
        'Cyberstore listing and brand development for natural hair and beauty products',
        'Regulatory literacy — the difference between a cosmetic and a medicinal product',
        'Pricing for community economics — not extractive, not exploitative'
      ]
    }
  }

};

// ── Helper functions ─────────────────────────────────────────────────────────

export function getProgramme(id: string): ProgrammeConfig | undefined {
  return PROGRAMMES[id];
}

export function getAllProgrammeIds(): string[] {
  return Object.keys(PROGRAMMES);
}

export function getActiveProgrammes(): ProgrammeConfig[] {
  return Object.values(PROGRAMMES).filter(
    (p) => !p.status || p.status === 'active'
  );
}

export function getComingSoonProgrammes(): ProgrammeConfig[] {
  return Object.values(PROGRAMMES).filter(
    (p) => p.status === 'coming-soon' || p.status === 'building'
  );
}