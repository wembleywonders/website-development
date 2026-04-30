// src/types/creatorJourney.ts
//
// Unified schema connecting Calendar → Archive → Podcast → Cyberstore
// Every field traces back to: knowledge first, products emerge from knowledge,
// income is a consequence of documentation.
//
// The 55/25/20 model:
//   55% → creator (Judith) from first pound
//   25% → community fund (shared equipment/training pool)
//   20% → platform operations (Rayd-yo, archive infrastructure, Cyberstore)
//
// Counter-archive tokens are minted at each stage — appointment, recording,
// episode drop, archive update, product listing. Judith's contribution is
// permanently recorded from the first appointment.

// ─── Revenue split ────────────────────────────────────────────────────────────


// ---- Programmes -------------------------------------------------------------

export type ProgrammeSlug =
  | "trubble-n-bass" | "joystick" | "pageturners" | "kaywanas-court"
  | "easy-street" | "silk-stilettos" | "stemgeneers" | "techreneurs"
  | "gtechcasters" | "auntie-anansis-kitchen" | "roots" | "bright-sparks" | "raydyo";

export const PROGRAMME_LABELS: Record<ProgrammeSlug, string> = {
  "trubble-n-bass": "Trubble n Bass",
  "joystick": "Joystick",
  "pageturners": "Pageturners",
  "kaywanas-court": "Kaywana's Court",
  "easy-street": "Easy Street",
  "silk-stilettos": "Silk Stilettos",
  "stemgeneers": "STEMgeneers",
  "techreneurs": "TECHreneurs",
  "gtechcasters": "G-Tech Casters",
  "auntie-anansis-kitchen": "Auntie Anansi's Kitchen",
  "roots": "Roots",
  "bright-sparks": "Bright Sparks",
  "raydyo": "Rayd-yo",
};

// ---- Badge system -----------------------------------------------------------

export type BadgeTier = "participant" | "practitioner" | "mentor";
export type BadgeType = "programme" | "rotation" | "commercial" | "community" | "ilp" | "stewards";
export type ProgrammeStatus = "not-started" | "active" | "participant" | "practitioner" | "mentor";

export interface WWBadge {
  id: string;
  type: BadgeType;
  tier?: BadgeTier;
  programmeSlug?: ProgrammeSlug;
  title: string;
  description: string;
  earnedAt: string;
  creatorId: string;
  evidence: {
    outputType: string;
    outputId?: string;
    provenanceToken?: string;
    verifiedBy?: string;
  };
  exportUrl?: string;
}

export type RotationBadgeId =
  | "audio-maker" | "word-and-sound" | "maker-broadcaster"
  | "heritage-keeper" | "stem-entrepreneur" | "dramatic-writer"
  | "community-builder" | "full-participation";

export const ROTATION_BADGE_REQUIREMENTS: Record<RotationBadgeId, {
  label: string;
  programmes: ProgrammeSlug[];
  description: string;
}> = {
  "audio-maker": {
    label: "Audio Maker",
    programmes: ["trubble-n-bass", "gtechcasters"],
    description: "Production and broadcast. Makes sound and knows how to share it.",
  },
  "word-and-sound": {
    label: "Word and Sound",
    programmes: ["pageturners", "raydyo"],
    description: "Writing and broadcasting. The literary voice that reaches an audience.",
  },
  "maker-broadcaster": {
    label: "Maker-Broadcaster",
    programmes: ["silk-stilettos", "gtechcasters"],
    description: "Construction and communication. Makes things and tells their story.",
  },
  "heritage-keeper": {
    label: "Heritage Keeper",
    programmes: ["roots", "auntie-anansis-kitchen"],
    description: "Body sovereignty and food culture. Holds the community's living knowledge.",
  },
  "stem-entrepreneur": {
    label: "STEM Entrepreneur",
    programmes: ["stemgeneers", "techreneurs"],
    description: "Technical skill and business practice. Builds products and businesses.",
  },
  "dramatic-writer": {
    label: "Dramatic Writer",
    programmes: ["kaywanas-court", "easy-street", "pageturners"],
    description: "Page, stage, and broadcast. The complete dramatic writing practice.",
  },
  "community-builder": {
    label: "Community Builder",
    programmes: ["bright-sparks", "joystick", "roots", "raydyo", "gtechcasters"],
    description: "Any five programmes completed. A practice that spans disciplines.",
  },
  "full-participation": {
    label: "Full Participation",
    programmes: ["trubble-n-bass","joystick","pageturners","kaywanas-court","easy-street","silk-stilettos","stemgeneers","techreneurs","gtechcasters","auntie-anansis-kitchen","roots","bright-sparks","raydyo"],
    description: "All 13 programmes touched. The complete Wembley Wonders practice.",
  },
};

export interface ProgrammeRotationRecord {
  programmeSlug: ProgrammeSlug;
  status: ProgrammeStatus;
  startedAt?: string;
  participantBadgeAt?: string;
  practitionerBadgeAt?: string;
  mentorBadgeAt?: string;
  outputCount: number;
  commercialOutputCount: number;
  roceAverage?: number;
}

// ---- ILP --------------------------------------------------------------------

export type ILPPhase = "exploration" | "foundation" | "development" | "consolidation" | "scale";

export interface ILPMilestone {
  id: string;
  phase: ILPPhase;
  title: string;
  description: string;
  targetDate?: string;
  achievedDate?: string;
  badgeEarned?: string;
  roceTarget?: number;
  earningsTarget?: number;
  programmeTarget?: ProgrammeSlug[];
  mayaNote?: string;
}

export interface IndividualLearningPlan {
  id: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  currentPhase: ILPPhase;
  practiceType: string;
  practiceDescription: string;
  audienceDescription: string;
  differentiator: string;
  twelveMonthVision: string;
  rotationPlan: {
    completed: ProgrammeSlug[];
    active: ProgrammeSlug[];
    planned: ProgrammeSlug[];
    rationale: string;
  };
  milestones: ILPMilestone[];
  commercialPosition: {
    activeListings: number;
    monthlyEarningsAverage: number;
    roceAverage: number;
    bestROCEProgramme?: ProgrammeSlug;
  };
  pardnerContext?: {
    currentPhase: ILPPhase;
    quarterlyEarningsAverage: number;
    isEligible: boolean;
    quartersReceived: number;
    quartersRemaining: number;
    pardnerPurpose: string;
    projectedBreakthroughQuarter?: string;
    projectedMonthlyEarnings?: number;
  };
  exportReady: boolean;
}

// ---- Helpers ----------------------------------------------------------------

export const getILPPhaseLabel = (phase: ILPPhase): string => ({
  exploration:   "Exploration",
  foundation:    "Foundation",
  development:   "Development",
  consolidation: "Consolidation",
  scale:         "Scale",
}[phase]);

export const getILPPhaseDescription = (phase: ILPPhase): string => ({
  exploration:   "Finding direction. Discovering which programmes connect with what you already know.",
  foundation:    "First badge earned. First output documented. The practice is taking shape.",
  development:   "Multiple programmes active. ROCE improving. The compound effect beginning.",
  consolidation: "Commercial outputs live. Rotation badges earned. Multiple income streams.",
  scale:         "Above the earnings threshold. Mentoring others. The practice is a business.",
}[phase]);

export const checkRotationBadgeEligibility = (
  rotation: ProgrammeRotationRecord[],
  badgeId: RotationBadgeId
): { eligible: boolean; missing: ProgrammeSlug[] } => {
  const req = ROTATION_BADGE_REQUIREMENTS[badgeId];
  const done = rotation
    .filter(r => r.status === "participant" || r.status === "practitioner" || r.status === "mentor")
    .map(r => r.programmeSlug);
  const missing = req.programmes.filter(p => !done.includes(p));
  return { eligible: missing.length === 0, missing };
};


export interface RevenueSplit {
  creatorPct: 55;          // always 55 — non-negotiable
  communityPct: 25;        // always 25
  platformPct: 20;         // always 20
  creatorId: string;       // 'judith-fontanelle'
  advanceBalance?: number; // outstanding CIC advance in £, reduces as income arrives
}

// ─── Counter-archive token ────────────────────────────────────────────────────

export type TokenStage =
  | 'appointment'        // trichologist visit documented
  | 'k2k-session'        // K2K recording session
  | 'raydyo-broadcast'   // episode goes live on Rayd-yo
  | 'archive-update'     // archive section updated from new knowledge
  | 'product-listing'    // Cyberstore product listed
  | 'workshop'           // live or recorded session
  | 'founding-session';  // founding team content session

export interface CounterArchiveToken {
  tokenId: string;                // e.g. 'CAT-JF-001'
  stage: TokenStage;
  mintedAt: string;               // ISO date
  creatorId: string;
  linkedEventId?: string;         // CalendarEvent.id
  linkedSectionId?: string;       // ArchiveSection.id
  linkedEpisodeId?: string;       // PodcastEpisode.id
  linkedProductIds?: string[];    // CyberstoreProduct.id[]
  description: string;
  blockchainRef?: string;         // future: actual chain reference
}

// ─── Calendar event ───────────────────────────────────────────────────────────

export type CalendarEventType =
  | 'trichologist'       // Healthy Hair Studio, Ealing
  | 'k2k-recording'      // K2K Radio recording session
  | 'raydyo-drop'        // Episode published to Rayd-yo
  | 'archive-update'     // Archive section goes live or updated
  | 'founding-session'   // Founding team content session
  | 'workshop'           // Public-facing workshop
  | 'cyberstore-launch'  // Product or bundle goes live
  | 'community';         // General community event

export type JourneyThread =
  | 'judith-hair-journey'   // the primary thread
  | 'roots-podcast'
  | 'roots-archive'
  | 'apothecary'
  | 'mothers-training';

export interface CalendarEvent {
  id: string;
  type: CalendarEventType;
  date: string;                    // ISO date
  title: string;
  description: string;
  location?: string;
  locationUrl?: string;            // e.g. healthyhairstudio.co.uk
  isPublic: boolean;               // visible on site calendar
  journeyThreads: JourneyThread[]; // which narrative threads this feeds
  creatorId?: string;              // 'judith-fontanelle' for her events
  
  // What this event generates
  generates: {
    archiveSectionId?: string;     // which section this feeds
    podcastEpisodeId?: string;     // which episode this produces
    productIds?: string[];         // which products this informs
    tokenId?: string;              // counter-archive token minted
  };

  // Cost tracking (for CIC advance model)
  cost?: {
    amount: number;                // £
    category: 'appointment' | 'course-fee' | 'product-testing' | 'travel' | 'time';
    advanceRef?: string;           // links to accountancy record
    recoveredBy?: string[];        // product IDs whose sales offset this cost
  };

  // Judith's public note (she controls what's shared)
  journeyNote?: string;            // what she's learning, in her words
  journeyNotePublic: boolean;      // she opts in to making this visible
}

// ─── Podcast episode ──────────────────────────────────────────────────────────

export type EpisodeStatus = 'planned' | 'recorded' | 'editing' | 'live';

export interface PodcastEpisode {
  id: string;                      // 'roots-ep-001'
  episodeNumber: number;
  title: string;
  description: string;
  status: EpisodeStatus;
  recordedAt?: string;             // ISO date — K2K session
  publishedAt?: string;            // ISO date — Rayd-yo drop
  duration?: string;               // e.g. '34:20'
  raydyoUrl?: string;
  k2kSessionEventId?: string;      // CalendarEvent.id for the recording session
  trichologistEventId?: string;    // CalendarEvent.id for the informing appointment
  archiveSectionId: string;        // which section this episode populates
  tokenId?: string;                // counter-archive token
  
  // What's available to buy from this episode
  cyberstoreProducts?: string[];   // CyberstoreProduct.id[]
  
  // Streaming income (future)
  streamCount?: number;
  estimatedIncome?: number;        // £
}

// ─── Cyberstore product ───────────────────────────────────────────────────────

export type ProductCategory =
  | 'digital-download'    // guides, templates, journal pages
  | 'audio'               // episode downloads
  | 'physical'            // t-shirts, printed journals
  | 'bundle'              // collections
  | 'workshop'            // live or recorded sessions
  | 'apothecary'          // physical products from the Apothecary pathway
  | 'consultation';       // referral/pathway products

export type ProductStatus = 'draft' | 'coming-soon' | 'live' | 'sold-out';

export interface CyberstoreProduct {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  price: number;                   // £
  currency: 'GBP';

  // The creator journey provenance chain — this is what separates this
  // from every other product on the market
  creatorJourney: {
    creatorId: string;             // 'judith-fontanelle'
    creatorName: string;
    
    // What generated this product
    sourcingEvents: string[];      // CalendarEvent.id[] — appointments, sessions
    archiveSectionId?: string;     // knowledge section this product draws from
    podcastEpisodeId?: string;     // episode this product accompanies or IS
    tokenId?: string;              // counter-archive token for this listing
    
    // Cost recovery — makes the business model transparent
    costsRecovered: {
      description: string;         // e.g. "Offsets trichologist appointment, Feb 2026"
      eventId: string;             // CalendarEvent.id
      amount: number;              // £ cost being recovered
    }[];
    
    // Revenue attribution
    revenueSplit: RevenueSplit;
    
    // Evidence trail
    evidenceGrade?: 'documented' | 'research' | 'traditional' | 'contested';
    clinicalBasis?: string;        // e.g. "Informed by trichologist consultation, Healthy Hair Studio Ealing"
    lastReviewed?: string;         // ISO date
    reviewedBy?: string;           // e.g. "Judith Fontanelle, following appointment Feb 2026"
  };

  // Product details
  images?: string[];
  tags: string[];
  relatedProductIds?: string[];    // bundle suggestions
  
  // For physical products
  variants?: { label: string; sku: string; stock?: number }[];
  
  // For digital products
  fileFormat?: string;             // 'PDF', 'MP3', etc.
  fileSize?: string;
  
  // For workshops
  workshopDate?: string;
  workshopCapacity?: number;
  workshopFormat?: 'in-person' | 'online' | 'recorded';
}

// ─── Creator profile ──────────────────────────────────────────────────────────

export interface CreatorProfile {
  id: string;                      // 'judith-fontanelle'
  name: string;
  role: string;
  bio: string;
  avatar: string;
  
  // Financial position
  economics: {
    totalCICAdvance: number;       // £ advanced by Wembley Wonders CIC
    advanceRepaid: number;         // £ repaid through 20% ops split
    advanceOutstanding: number;    // £ still to recover
    totalEarned: number;           // £ at 55% to date
    totalProducts: number;
    totalSales: number;
  };
  
  // Journey metadata
  journey: {
    startDate: string;
    trichologistClinic: string;    // 'Healthy Hair Studio, Ealing'
    trichologistUrl: string;       // 'https://www.healthyhairstudio.co.uk/'
    appointmentFrequency: string;  // 'Every six weeks, by appointment'
    podcastHome: string;           // 'K2K Radio → Rayd-yo'
    currentEpisode: number;
    archiveSectionsLive: number;
    archiveSectionsPlanned: number;
  };
  
  tokens: CounterArchiveToken[];
  events: string[];                // CalendarEvent.id[]
  products: string[];              // CyberstoreProduct.id[]
}

// ─── Judith's initial data ────────────────────────────────────────────────────

export const JUDITH_PROFILE: CreatorProfile = {
  id: 'judith-fontanelle',
  name: 'Judith Fontanelle',
  role: 'Director of Community Engagement · Roots Founding Lead',
  bio: `Judith Fontanelle is the Director of Community Engagement at Wembley Wonders CIC 
    and the lead founder of Roots — the body sovereignty and hair science resource. 
    She is currently completing a podcasting course at K2K Radio, seeing a trichologist 
    at Healthy Hair Studio in Ealing every six weeks, and building a knowledge archive 
    that documents her clinical learning journey in real time. Every product in her 
    Cyberstore range traces directly back to that journey.`,
  avatar: '🌱',
  economics: {
    totalCICAdvance: 0,            // to be populated by accountancy
    advanceRepaid: 0,
    advanceOutstanding: 0,
    totalEarned: 0,
    totalProducts: 0,
    totalSales: 0,
  },
  journey: {
    startDate: '2026-01-01',
    trichologistClinic: 'Healthy Hair Studio, Ealing',
    trichologistUrl: 'https://www.healthyhairstudio.co.uk/',
    appointmentFrequency: 'Every six weeks, by appointment',
    podcastHome: 'K2K Radio → Rayd-yo',
    currentEpisode: 0,
    archiveSectionsLive: 0,
    archiveSectionsPlanned: 6,
  },
  tokens: [],
  events: [],
  products: [],
};

// ─── Initial calendar events ──────────────────────────────────────────────────

export const JUDITH_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-jf-001',
    type: 'trichologist',
    date: '2026-03-01',
    title: 'Trichologist Consultation — Healthy Hair Studio, Ealing',
    description: 'First documented clinical appointment. Scalp health assessment, hair texture analysis, product recommendations. This appointment informs the Hair Science by Texture archive section and Episode 1 of the Roots podcast.',
    location: 'Healthy Hair Studio, Ealing',
    locationUrl: 'https://www.healthyhairstudio.co.uk/',
    isPublic: true,
    journeyThreads: ['judith-hair-journey', 'roots-archive', 'roots-podcast'],
    creatorId: 'judith-fontanelle',
    generates: {
      archiveSectionId: 'hair-science',
      podcastEpisodeId: 'roots-ep-001',
      tokenId: 'CAT-JF-001',
    },
    cost: {
      amount: 85,
      category: 'appointment',
      recoveredBy: ['prod-jf-journal-001', 'prod-jf-companion-ep1'],
    },
    journeyNote: 'First appointment. Learning what my hair actually is before trying to fix it.',
    journeyNotePublic: true,
  },
  {
    id: 'evt-jf-002',
    type: 'k2k-recording',
    date: '2026-03-15',
    title: 'K2K Radio — Recording Episode 1: Hair Science by Texture',
    description: 'Judith records Episode 1 of the Roots podcast series at K2K Radio. The episode draws directly from the trichologist appointment two weeks prior.',
    location: 'K2K Radio',
    isPublic: true,
    journeyThreads: ['judith-hair-journey', 'roots-podcast'],
    creatorId: 'judith-fontanelle',
    generates: {
      podcastEpisodeId: 'roots-ep-001',
      tokenId: 'CAT-JF-002',
    },
    cost: {
      amount: 45,
      category: 'course-fee',
      recoveredBy: ['prod-jf-companion-ep1'],
    },
    journeyNote: 'First time behind a microphone talking about something I actually know.',
    journeyNotePublic: true,
  },
  {
    id: 'evt-jf-003',
    type: 'raydyo-drop',
    date: '2026-03-22',
    title: 'Rayd-yo — Episode 1 Live: "Hair Science by Texture"',
    description: 'Episode 1 of the Roots podcast series publishes to Rayd-yo. The Hair Science by Texture archive section goes live simultaneously.',
    isPublic: true,
    journeyThreads: ['judith-hair-journey', 'roots-podcast', 'roots-archive'],
    creatorId: 'judith-fontanelle',
    generates: {
      archiveSectionId: 'hair-science',
      podcastEpisodeId: 'roots-ep-001',
      productIds: ['prod-jf-companion-ep1'],
      tokenId: 'CAT-JF-003',
    },
    journeyNotePublic: false,
  },
  {
    id: 'evt-jf-004',
    type: 'trichologist',
    date: '2026-04-12',
    title: 'Trichologist Follow-Up — Healthy Hair Studio, Ealing',
    description: 'Six-week follow-up appointment. Progress review, chemical literacy discussion — what products to avoid and why. Informs Episode 2: Chemical Literacy.',
    location: 'Healthy Hair Studio, Ealing',
    locationUrl: 'https://www.healthyhairstudio.co.uk/',
    isPublic: true,
    journeyThreads: ['judith-hair-journey', 'roots-archive', 'roots-podcast'],
    creatorId: 'judith-fontanelle',
    generates: {
      archiveSectionId: 'chemical-literacy',
      podcastEpisodeId: 'roots-ep-002',
      tokenId: 'CAT-JF-004',
    },
    cost: {
      amount: 85,
      category: 'appointment',
      recoveredBy: ['prod-jf-companion-ep2', 'prod-jf-tshirt-edges'],
    },
    journeyNote: 'Six weeks of actually understanding what I was putting on my hair. The difference is visible.',
    journeyNotePublic: true,
  },
  {
    id: 'evt-jf-005',
    type: 'cyberstore-launch',
    date: '2026-04-01',
    title: 'Cyberstore Launch — Judith\'s Roots Range',
    description: 'First products go live. Wash Day Journal template, Episode 1 companion guide, and the first t-shirt. The creator journey provenance chain is fully visible on each product page.',
    isPublic: true,
    journeyThreads: ['judith-hair-journey'],
    creatorId: 'judith-fontanelle',
    generates: {
      productIds: ['prod-jf-journal-001', 'prod-jf-companion-ep1', 'prod-jf-tshirt-edges'],
      tokenId: 'CAT-JF-005',
    },
    journeyNotePublic: false,
  },
];

// ─── Initial product range ────────────────────────────────────────────────────

export const JUDITH_PRODUCTS: CyberstoreProduct[] = [
  {
    id: 'prod-jf-journal-001',
    title: 'The Six-Week Hair Journal',
    tagline: 'Track your hair journey the way a trichologist would.',
    description: `A structured 42-day journal built around the six-week trichologist appointment cycle. 
      Wash day logs, product reaction notes, scalp health tracker, photographic progress prompts, 
      and the evidence-grading framework as a personal tool. Designed by Judith from her own 
      clinical journey at Healthy Hair Studio, Ealing.`,
    category: 'digital-download',
    status: 'coming-soon',
    price: 12,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001'],
      archiveSectionId: 'hair-science',
      tokenId: 'CAT-JF-005',
      costsRecovered: [
        {
          description: 'Offsets trichologist appointment, March 2026',
          eventId: 'evt-jf-001',
          amount: 85,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Informed by trichologist consultation, Healthy Hair Studio Ealing',
      lastReviewed: '2026-03-01',
      reviewedBy: 'Judith Fontanelle, following appointment March 2026',
    },
    fileFormat: 'PDF',
    tags: ['journal', 'wash day', 'hair tracking', 'trichologist', 'six-week cycle'],
  },
  {
    id: 'prod-jf-companion-ep1',
    title: 'Episode 1 Companion Guide — Hair Science by Texture',
    tagline: 'The written, evidence-graded companion to the Rayd-yo episode.',
    description: `A printable companion guide to Episode 1 of the Roots podcast. 
      Covers porosity, density, elasticity, scalp pH, and sebum travel — with 
      evidence grades on every claim, a personal assessment worksheet, and a 
      product-matching framework based on your texture profile.`,
    category: 'digital-download',
    status: 'coming-soon',
    price: 8,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001', 'evt-jf-002'],
      archiveSectionId: 'hair-science',
      podcastEpisodeId: 'roots-ep-001',
      tokenId: 'CAT-JF-003',
      costsRecovered: [
        {
          description: 'Partial offset: K2K course fee, March 2026',
          eventId: 'evt-jf-002',
          amount: 45,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Informed by trichologist consultation, Healthy Hair Studio Ealing',
      lastReviewed: '2026-03-22',
      reviewedBy: 'Judith Fontanelle',
    },
    fileFormat: 'PDF',
    tags: ['porosity', 'hair science', 'texture', 'guide', 'episode companion'],
    relatedProductIds: ['prod-jf-journal-001'],
  },
  {
    id: 'prod-jf-companion-ep2',
    title: 'Episode 2 Companion Guide — Chemical Literacy',
    tagline: 'What\'s actually in your products. In plain English.',
    description: `Companion guide to Episode 2. Covers relaxer chemistry, bleach and developer,
      edge control ingredients, adhesives, and how to read an INCI list. 
      Includes an ingredient red-flag reference card and a product audit worksheet.`,
    category: 'digital-download',
    status: 'coming-soon',
    price: 8,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-004'],
      archiveSectionId: 'chemical-literacy',
      podcastEpisodeId: 'roots-ep-002',
      costsRecovered: [
        {
          description: 'Partial offset: trichologist follow-up, April 2026',
          eventId: 'evt-jf-004',
          amount: 85,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Informed by trichologist follow-up, Healthy Hair Studio Ealing',
      lastReviewed: '2026-04-12',
      reviewedBy: 'Judith Fontanelle, following appointment April 2026',
    },
    fileFormat: 'PDF',
    tags: ['chemicals', 'ingredients', 'relaxer', 'bleach', 'INCI', 'episode companion'],
    relatedProductIds: ['prod-jf-journal-001', 'prod-jf-companion-ep1'],
  },
  {
    id: 'prod-jf-tshirt-edges',
    title: '"Know Your Edges" T-Shirt',
    tagline: 'The archive on your back.',
    description: `The first Roots cultural product. "Know Your Edges" — a reference to 
      the hair science, the legal rights, and the body sovereignty that Roots exists to 
      document. 100% organic cotton. Designed in-house. Printed ethically. 
      Every sale funds the next trichologist appointment.`,
    category: 'physical',
    status: 'coming-soon',
    price: 28,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001', 'evt-jf-004'],
      archiveSectionId: 'hair-science',
      costsRecovered: [
        {
          description: 'Offsets trichologist appointments — the R&D that makes this product credible',
          eventId: 'evt-jf-001',
          amount: 85,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      lastReviewed: '2026-04-01',
      reviewedBy: 'Judith Fontanelle',
    },
    variants: [
      { label: 'XS', sku: 'EDGES-XS' },
      { label: 'S',  sku: 'EDGES-S'  },
      { label: 'M',  sku: 'EDGES-M'  },
      { label: 'L',  sku: 'EDGES-L'  },
      { label: 'XL', sku: 'EDGES-XL' },
      { label: 'XXL', sku: 'EDGES-XXL' },
    ],
    tags: ['t-shirt', 'cultural product', 'edges', 'roots', 'organic cotton'],
    relatedProductIds: ['prod-jf-journal-001'],
  },
  {
    id: 'prod-jf-washday-template',
    title: 'Wash Day Log Templates',
    tagline: 'Five printable pages. Every wash day documented.',
    description: `Five evidence-informed wash day log templates. Product tracking, 
      scalp observation, detangling notes, moisture retention assessment, 
      and a before/after photographic prompt. Based on the documentation 
      framework Judith developed from her trichologist appointments.`,
    category: 'digital-download',
    status: 'coming-soon',
    price: 4,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001'],
      archiveSectionId: 'hair-science',
      costsRecovered: [],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Framework derived from trichologist documentation practice',
      lastReviewed: '2026-03-01',
    },
    fileFormat: 'PDF',
    tags: ['wash day', 'templates', 'log', 'tracking', 'printable'],
    relatedProductIds: ['prod-jf-journal-001'],
  },
  {
    id: 'prod-jf-archive-bundle',
    title: 'The Roots Archive — Complete Bundle',
    tagline: 'All six sections. All six seasonal guides. One resource.',
    description: `The complete Roots Knowledge Archive as a downloadable bundle. 
      All six knowledge sections (hair science, chemical literacy, feature pressure, 
      mixed heritage hair, remedies, legal rights) plus all six seasonal guides — 
      evidence-graded, clinically informed, built from Judith's documented journey. 
      Updated as each new episode and appointment adds depth.`,
    category: 'bundle',
    status: 'coming-soon',
    price: 55,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001', 'evt-jf-002', 'evt-jf-004'],
      costsRecovered: [
        {
          description: 'Offsets full appointment and course cost cycle',
          eventId: 'evt-jf-001',
          amount: 130,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Informed by ongoing trichologist consultations, Healthy Hair Studio Ealing',
      lastReviewed: '2026-04-01',
      reviewedBy: 'Judith Fontanelle',
    },
    fileFormat: 'PDF',
    tags: ['bundle', 'complete archive', 'hair science', 'all sections'],
    relatedProductIds: [
      'prod-jf-journal-001',
      'prod-jf-companion-ep1',
      'prod-jf-companion-ep2',
    ],
  },
  {
    id: 'prod-jf-mothers-workshop',
    title: 'Mixed Heritage Hair — Mothers\' Workshop',
    tagline: 'Judith Fontanelle. Two hours. Everything they didn\'t tell you.',
    description: `A live workshop for mothers whose child's hair texture differs from their own. 
      Covers hair science by texture, children's product literacy, making wash day positive, 
      school regulations and the Halo Code. Led by Judith Fontanelle — child development 
      specialist, Roots founding lead, and the person who built the archive this workshop draws from.`,
    category: 'workshop',
    status: 'coming-soon',
    price: 45,
    currency: 'GBP',
    creatorJourney: {
      creatorId: 'judith-fontanelle',
      creatorName: 'Judith Fontanelle',
      sourcingEvents: ['evt-jf-001', 'evt-jf-004'],
      archiveSectionId: 'mixed-heritage',
      costsRecovered: [
        {
          description: 'Offsets appointment costs — the clinical knowledge this workshop delivers',
          eventId: 'evt-jf-001',
          amount: 85,
        },
      ],
      revenueSplit: { creatorPct: 55, communityPct: 25, platformPct: 20, creatorId: 'judith-fontanelle' },
      evidenceGrade: 'documented',
      clinicalBasis: 'Content derived from trichologist consultations and child development practice',
    },
    workshopCapacity: 20,
    workshopFormat: 'in-person',
    tags: ['workshop', 'mothers', 'mixed heritage', 'children\'s hair', 'judith'],
    relatedProductIds: ['prod-jf-journal-001', 'prod-jf-washday-template'],
  },
];

// ─── Helper: get all events for a product's provenance chain ─────────────────

export const getProductProvenance = (
  product: CyberstoreProduct,
  events: CalendarEvent[]
): CalendarEvent[] => {
  return product.creatorJourney.sourcingEvents
    .map(id => events.find(e => e.id === id))
    .filter(Boolean) as CalendarEvent[];
};

// ─── Helper: get all products generated by a calendar event ──────────────────

export const getEventProducts = (
  event: CalendarEvent,
  products: CyberstoreProduct[]
): CyberstoreProduct[] => {
  return products.filter(p =>
    p.creatorJourney.sourcingEvents.includes(event.id)
  );
};

// ─── Helper: calculate cost recovery for a product ───────────────────────────

export const getCostRecoveryStatus = (product: CyberstoreProduct): {
  costsToRecover: number;
  salesNeeded: number;
  creatorEarningPerSale: number;
} => {
  const costsToRecover = product.creatorJourney.costsRecovered
    .reduce((sum, c) => sum + c.amount, 0);
  const creatorEarningPerSale = product.price * 0.55;
  const salesNeeded = Math.ceil(costsToRecover / creatorEarningPerSale);
  return { costsToRecover, salesNeeded, creatorEarningPerSale };
};

// ─── Helper: format revenue split display ────────────────────────────────────

export const formatRevenueSplit = (price: number): {
  creator: number;
  community: number;
  platform: number;
} => ({
  creator:   parseFloat((price * 0.55).toFixed(2)),
  community: parseFloat((price * 0.25).toFixed(2)),
  platform:  parseFloat((price * 0.20).toFixed(2)),
});
// ── ROV badge custodians ──────────────────────────────────────────────────────

export type ROVName =
  | 'narrator' | 'maker' | 'merchant' | 'keeper'
  | 'weaver' | 'spark' | 'guardian' | 'elder' | 'maya';

export const ROV_BADGE_CUSTODIANS: Record<ProgrammeSlug, ROVName> = {
  'gtechcasters':           'narrator',
  'raydyo':                 'narrator',
  'joystick':               'narrator',
  'easy-street':            'narrator',
  'trubble-n-bass':         'narrator',
  'stemgeneers':            'maker',
  'techreneurs':            'merchant',
  'roots':                  'keeper',
  'pageturners':            'keeper',
  'auntie-anansis-kitchen': 'keeper',
  'silk-stilettos':         'weaver',
  'kaywanas-court':         'weaver',
  'bright-sparks':          'spark',
};

// ── Programme badge definitions ───────────────────────────────────────────────

export interface ProgrammeBadgeDef {
  id: string;
  programmeSlug: ProgrammeSlug;
  tier: string;
  title: string;
  criteria: string;
  rovRequired: ROVName;
  guardianCoSignRequired: boolean;
  witnessRequired: boolean;
}

export const PROGRAMME_BADGES: ProgrammeBadgeDef[] = [
  { id: 'casters-first-frame',     programmeSlug: 'gtechcasters',          tier: 'participant',   title: 'First Frame',          criteria: 'First documented assignment with consent record',                rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'casters-field-ready',     programmeSlug: 'gtechcasters',          tier: 'practitioner',  title: 'Field Ready',          criteria: 'Three assignments across two different stream types',             rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: true  },
  { id: 'casters-corps-member',    programmeSlug: 'gtechcasters',          tier: 'contributor',   title: 'Corps Member',         criteria: 'Buddy confirmed on at least two assignments',                    rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: true  },
  { id: 'casters-journalist',      programmeSlug: 'gtechcasters',          tier: 'mentor',        title: 'Community Journalist', criteria: 'Piece published in Joystick with editorial sign-off',            rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: true  },
  { id: 'raydyo-on-air',           programmeSlug: 'raydyo',                tier: 'participant',   title: 'On Air',               criteria: 'First live or recorded show completed',                          rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'raydyo-regular',          programmeSlug: 'raydyo',                tier: 'practitioner',  title: 'Regular',              criteria: 'Six consecutive fortnightly shows',                               rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'roots-story-collected',   programmeSlug: 'roots',                 tier: 'participant',   title: 'Story Collected',      criteria: 'First documented heritage interview with full consent',           rovRequired: 'keeper',   guardianCoSignRequired: true,  witnessRequired: false },
  { id: 'roots-archive-contrib',   programmeSlug: 'roots',                 tier: 'practitioner',  title: 'Archive Contributor',  criteria: 'Submission accepted into the community archive',                 rovRequired: 'keeper',   guardianCoSignRequired: false, witnessRequired: false },
  { id: 'roots-knowledge-keeper',  programmeSlug: 'roots',                 tier: 'mentor',        title: 'Knowledge Keeper',     criteria: 'Three or more documented elder interviews',                      rovRequired: 'keeper',   guardianCoSignRequired: true,  witnessRequired: true  },
  { id: 'tech-first-listing',      programmeSlug: 'techreneurs',           tier: 'participant',   title: 'First Listing',        criteria: 'First Cyberstore listing live',                                  rovRequired: 'merchant', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'tech-first-sale',         programmeSlug: 'techreneurs',           tier: 'practitioner',  title: 'First Sale',           criteria: 'First documented transaction',                                   rovRequired: 'merchant', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'stem-first-build',        programmeSlug: 'stemgeneers',           tier: 'participant',   title: 'First Build',          criteria: 'First documented project with build log',                        rovRequired: 'maker',    guardianCoSignRequired: false, witnessRequired: false },
  { id: 'joystick-first-byline',   programmeSlug: 'joystick',              tier: 'participant',   title: 'First Byline',         criteria: 'First piece published in Joystick',                              rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'pages-first-review',      programmeSlug: 'pageturners',           tier: 'participant',   title: 'First Review',         criteria: 'First documented book review or reading group contribution',     rovRequired: 'keeper',   guardianCoSignRequired: false, witnessRequired: false },
  { id: 'sparks-three-challenges', programmeSlug: 'bright-sparks',         tier: 'participant',   title: 'Three Challenges',     criteria: 'Completed discovery phase across three different programmes',    rovRequired: 'spark',    guardianCoSignRequired: false, witnessRequired: false },
  { id: 'sparks-pathway-found',    programmeSlug: 'bright-sparks',         tier: 'participant',   title: 'Pathway Found',        criteria: 'Completed the planner and attended cohort induction',           rovRequired: 'spark',    guardianCoSignRequired: false, witnessRequired: true  },
  { id: 'tnb-sound-documented',    programmeSlug: 'trubble-n-bass',        tier: 'participant',   title: 'Sound Documented',     criteria: 'First track with full provenance record on the platform',       rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'kc-case-filed',           programmeSlug: 'kaywanas-court',        tier: 'participant',   title: 'Case Filed',           criteria: 'First documented creative legal scenario completed',             rovRequired: 'weaver',   guardianCoSignRequired: false, witnessRequired: false },
  { id: 'es-first-scene',          programmeSlug: 'easy-street',           tier: 'participant',   title: 'First Scene',          criteria: 'First documented radio drama contribution',                      rovRequired: 'narrator', guardianCoSignRequired: false, witnessRequired: false },
  { id: 'ss-first-piece',          programmeSlug: 'silk-stilettos',        tier: 'participant',   title: 'First Piece',          criteria: 'First documented creative fashion or styling output',            rovRequired: 'weaver',   guardianCoSignRequired: false, witnessRequired: false },
  { id: 'aak-first-recipe',        programmeSlug: 'auntie-anansis-kitchen',tier: 'participant',   title: 'First Recipe',         criteria: 'First documented recipe with cultural context',                 rovRequired: 'keeper',   guardianCoSignRequired: false, witnessRequired: false },
];
