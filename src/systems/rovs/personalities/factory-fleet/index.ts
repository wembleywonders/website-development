/**
 * FACTORY ROV FLEET - Training Army Index
 * ========================================
 * 
 * The ROV fleet that trains 17+ creators per day through the Factory pipeline.
 * 
 * Architecture: Maya (orchestrator) → Stage ROVs → Sub-ROVs → Discipline ROVs
 */

// ============================================================================
// CORE TRAINING ROVS (Implemented)
// ============================================================================

export const SparkROV = {
  id: 'Spark',
  role: 'Sandbox ROV',
  description: 'Discovery and exploration ROV (stubbed)'
};

export const MerchantROV = {
  id: 'Merchant',
  role: 'TECHreneurs ROV',
  description: 'Economic literacy ROV (stubbed)'
};

export const SmithROV = {
  id: 'Smith',
  role: 'Forge ROV',
  description: 'Quality production ROV (stubbed)'
};

// ============================================================================
// ROV FLEET OVERVIEW
// ============================================================================

export const FACTORY_ROV_FLEET = {
  
  // Orchestration layer
  orchestrator: {
    name: 'Maya',
    role: 'Master Orchestrator',
    function: 'Routes creators to correct ROV based on stage and need',
    alwaysActive: true
  },

  // Stage-specific ROVs (the core pipeline)
  stageROVs: {
    sandbox: {
      primary: 'Spark',
      status: 'IMPLEMENTED',
      function: 'Discovery and exploration',
      capacity: '100+ concurrent creators'
    },
    testbed: {
      primary: 'Probe',
      status: 'PLANNED',
      function: 'Prototype validation',
      capacity: '50+ concurrent creators'
    },
    techreneurs: {
      primary: 'Merchant',
      status: 'IMPLEMENTED',
      function: 'Economic literacy',
      capacity: '30+ concurrent creators',
      subROVs: ['Appraiser', 'Surveyor', 'Packager', 'Scribe', 'Closer']
    },
    forge: {
      primary: 'Smith',
      status: 'IMPLEMENTED',
      function: 'Quality production',
      capacity: '20+ concurrent creators'
    },
    polishBay: {
      primary: 'Discipline-specific',
      status: 'PLANNED',
      function: 'Final refinement',
      capacity: '15+ per discipline'
    },
    distribution: {
      primary: 'Herald',
      status: 'PLANNED',
      function: 'Marketing and launch',
      capacity: '50+ concurrent creators'
    }
  },

  // Discipline-specific Polish Bay ROVs
  disciplineROVs: {
    stemgineers: { name: 'Circuit', status: 'PLANNED', specialty: 'Technical documentation' },
    silkStilettos: { name: 'Canvas', status: 'PLANNED', specialty: 'Design polish' },
    trubbleNBass: { name: 'Tempo', status: 'PLANNED', specialty: 'Audio mastering' },
    pageturners: { name: 'Quill', status: 'PLANNED', specialty: 'Writing polish' },
    kaywanasCourt: { name: 'Stage', status: 'PLANNED', specialty: 'Performance coaching' },
    gtechCasters: { name: 'Broadcast', status: 'PLANNED', specialty: 'Podcast structure' },
    auntieAnansisKitchen: { name: 'Hearth', status: 'PLANNED', specialty: 'Recipe formatting' },
    brightSparks: { name: 'Compass', status: 'PLANNED', specialty: 'Pathway discovery' }
  },

  // Support ROVs
  supportROVs: {
    guide: { name: 'Guide', function: 'General navigation help', status: 'EXISTING' },
    helper: { name: 'Helper', function: 'Technical support', status: 'EXISTING' }
  }
};

// ============================================================================
// PIPELINE FLOW
// ============================================================================

export const PIPELINE_FLOW = {
  /*
   * Creator Journey Through ROV Fleet:
   * 
   *   MAYA (always watching, routing)
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │                    STAGE 1: SANDBOX                         │
   *   │                                                             │
   *   │   SPARK                                                     │
   *   │   "What excites you? Let's explore."                        │
   *   │                                                             │
   *   │   Activities:                                               │
   *   │   • Interest discovery                                      │
   *   │   • Discipline tasters                                      │
   *   │   • First sketch                                            │
   *   │                                                             │
   *   │   Handoff trigger: Found direction, made first sketch       │
   *   └─────────────────────────────────────────────────────────────┘
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │                    STAGE 2: TESTBED                         │
   *   │                                                             │
   *   │   PROBE                                                     │
   *   │   "Let's see if this idea has legs."                        │
   *   │                                                             │
   *   │   Activities:                                               │
   *   │   • Prototype building                                      │
   *   │   • Early feedback gathering                                │
   *   │   • Viability assessment                                    │
   *   │                                                             │
   *   │   Handoff trigger: Prototype validated, ready for economics │
   *   └─────────────────────────────────────────────────────────────┘
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │              STAGE 3: TECHRENEURS (Critical)                │
   *   │                                                             │
   *   │   MERCHANT (Lead)                                           │
   *   │   "Price it. Package it. Position it. Sell it."             │
   *   │                                                             │
   *   │   Sub-ROVs (6-week curriculum):                             │
   *   │   Week 1: APPRAISER → Pricing strategy                      │
   *   │   Week 2: SURVEYOR → Audience definition                    │
   *   │   Week 3: PACKAGER → Tier structure                         │
   *   │   Week 4: SCRIBE → Sales copy                               │
   *   │   Week 5: CLOSER → Launch strategy                          │
   *   │   Week 6: MERCHANT → Integration & handoff                  │
   *   │                                                             │
   *   │   Handoff trigger: All deliverables complete, Forge-ready   │
   *   └─────────────────────────────────────────────────────────────┘
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │                    STAGE 4: THE FORGE                       │
   *   │                                                             │
   *   │   SMITH                                                     │
   *   │   "If it's not ready, it doesn't ship."                     │
   *   │                                                             │
   *   │   Phases (4-8 weeks):                                       │
   *   │   Phase 1: Foundation → Core product                        │
   *   │   Phase 2: Build-Out → All tiers + bonuses                  │
   *   │   Phase 3: Quality Pass → Professional polish               │
   *   │   Phase 4: Final Inspection → Ship/no-ship decision         │
   *   │                                                             │
   *   │   Handoff trigger: Forge approved, quality score ≥75%       │
   *   └─────────────────────────────────────────────────────────────┘
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │                 STAGE 5: POLISH BAYS                        │
   *   │                                                             │
   *   │   Discipline-specific ROVs:                                 │
   *   │   • CIRCUIT (STEM)         • QUILL (Writing)                │
   *   │   • CANVAS (Design)        • STAGE (Performance)            │
   *   │   • TEMPO (Audio)          • BROADCAST (Podcasting)         │
   *   │   • HEARTH (Culinary)      • COMPASS (Multi-track)          │
   *   │                                                             │
   *   │   Activities:                                               │
   *   │   • Discipline-specific refinement                          │
   *   │   • Platform preparation                                    │
   *   │   • Launch assets creation                                  │
   *   │                                                             │
   *   │   Handoff trigger: Launch-ready, all assets prepared        │
   *   └─────────────────────────────────────────────────────────────┘
   *     │
   *     ▼
   *   ┌─────────────────────────────────────────────────────────────┐
   *   │                 STAGE 6: DISTRIBUTION                       │
   *   │                                                             │
   *   │   HERALD                                                    │
   *   │   "Let's get this in front of buyers."                      │
   *   │                                                             │
   *   │   Activities:                                               │
   *   │   • Cyberstore listing                                      │
   *   │   • Rayd-yo promotion                                       │
   *   │   • Joystick event scheduling                               │
   *   │   • First 10 sales strategy execution                       │
   *   │                                                             │
   *   │   Outcome: Product live, first sales incoming               │
   *   └─────────────────────────────────────────────────────────────┘
   */
  
  stages: [
    { stage: 1, name: 'Sandbox', rov: 'Spark', duration: 'Variable' },
    { stage: 2, name: 'Testbed', rov: 'Probe', duration: '2-4 weeks' },
    { stage: 3, name: 'TECHreneurs', rov: 'Merchant', duration: '6 weeks' },
    { stage: 4, name: 'Forge', rov: 'Smith', duration: '4-8 weeks' },
    { stage: 5, name: 'Polish Bay', rov: 'Discipline-specific', duration: '2-4 weeks' },
    { stage: 6, name: 'Distribution', rov: 'Herald', duration: 'Ongoing' }
  ],

  // Total pipeline: 14-24 weeks from entry to first sale
  estimatedPipelineTime: {
    minimum: '14 weeks',
    typical: '18 weeks',
    maximum: '24 weeks'
  }
};

// ============================================================================
// CAPACITY PLANNING
// ============================================================================

export const CAPACITY_PLANNING = {
  
  // Daily throughput targets
  daily: {
    newEntrants: 17,           // Target: 17 new creators/day
    sandboxActive: 100,        // Concurrent in Sandbox
    testbedActive: 50,         // Concurrent in Testbed
    techreneursActive: 30,     // Concurrent in TECHreneurs
    forgeActive: 20,           // Concurrent in Forge
    polishActive: 15,          // Concurrent per Polish Bay
    distributionActive: 50     // Concurrent in Distribution
  },

  // Annual targets
  annual: {
    year1: { creators: 100, products: 150 },
    year2: { creators: 200, products: 350 },
    year3: { creators: 312, products: 500 }
  },

  // Bottleneck management
  bottlenecks: {
    techreneurs: {
      issue: 'Economic literacy requires structured curriculum',
      solution: 'Sub-ROVs handle weekly modules, Merchant orchestrates',
      capacity: '78 new starters per month (4 cohorts of ~20)'
    },
    forge: {
      issue: 'Quality assessment requires attention',
      solution: 'Automated quality scoring + Smith review on edge cases',
      capacity: '~30 completions per month'
    }
  }
};

// ============================================================================
// HANDOFF MATRIX
// ============================================================================

export const HANDOFF_MATRIX = {
  /*
   * Who hands off to whom, and under what conditions:
   * 
   * FROM          TO              CONDITION
   * ──────────────────────────────────────────────────────────────
   * Spark    →    Probe          Direction found, first sketch made
   * Spark    →    Compass        Needs more foundation (Bright Sparks)
   * Probe    →    Merchant       Prototype validated
   * Probe    →    Spark          Needs to rethink direction
   * Merchant →    Smith          All TECHreneurs deliverables complete
   * Merchant →    Probe          Market validation failed, needs pivot
   * Smith    →    [Polish Bay]   Forge approved (score ≥75%)
   * Smith    →    Merchant       Scope needs repositioning
   * Smith    →    Probe          Fundamental viability issue
   * [Polish] →    Herald         Launch-ready
   * Herald   →    Maya           Product live, ongoing support
   */

  handoffs: [
    { from: 'Spark', to: 'Probe', condition: 'found_direction' },
    { from: 'Spark', to: 'Compass', condition: 'needs_foundation' },
    { from: 'Probe', to: 'Merchant', condition: 'prototype_validated' },
    { from: 'Probe', to: 'Spark', condition: 'rethink_direction' },
    { from: 'Merchant', to: 'Smith', condition: 'techreneurs_complete' },
    { from: 'Merchant', to: 'Probe', condition: 'market_validation_failed' },
    { from: 'Smith', to: 'PolishBay', condition: 'forge_approved' },
    { from: 'Smith', to: 'Merchant', condition: 'scope_change_required' },
    { from: 'Smith', to: 'Probe', condition: 'fundamental_issue' },
    { from: 'PolishBay', to: 'Herald', condition: 'launch_ready' },
    { from: 'Herald', to: 'Maya', condition: 'product_live' }
  ]
};

// ============================================================================
// ROV PERSONALITY SUMMARY
// ============================================================================

export const ROV_PERSONALITIES = {
  
  spark: {
    name: 'Spark',
    emoji: '✨',
    color: '#fbbf24',
    tone: 'Warm, curious, encouraging',
    catchphrase: "Let's find what lights you up.",
    traits: 'Patient, playful, never pushes'
  },

  probe: {
    name: 'Probe',
    emoji: '🔬',
    color: '#3b82f6',
    tone: 'Curious, analytical, supportive',
    catchphrase: "Let's see if this has legs.",
    traits: 'Methodical, helpful, data-driven'
  },

  merchant: {
    name: 'Merchant',
    emoji: '💰',
    color: '#f59e0b',
    tone: 'Direct, challenging, business-focused',
    catchphrase: "Price it. Package it. Position it.",
    traits: 'Demanding, clear, practical'
  },

  smith: {
    name: 'Smith',
    emoji: '🔨',
    color: '#dc2626',
    tone: 'Direct, exacting, craftsman',
    catchphrase: "If it's not ready, it doesn't ship.",
    traits: 'High standards, fair, respects effort'
  },

  herald: {
    name: 'Herald',
    emoji: '📣',
    color: '#10b981',
    tone: 'Energetic, tactical, supportive',
    catchphrase: "Let's get this in front of buyers.",
    traits: 'Strategic, encouraging, action-oriented'
  }
};

// ============================================================================
// IMPLEMENTATION ROADMAP
// ============================================================================

export const IMPLEMENTATION_ROADMAP = {
  
  phase1: {
    name: 'Core Training ROVs',
    timeline: 'Month 1-2',
    deliverables: [
      '✓ Spark (Sandbox) - IMPLEMENTED',
      '✓ Merchant (TECHreneurs) - IMPLEMENTED',
      '✓ Smith (Forge) - IMPLEMENTED'
    ]
  },

  phase2: {
    name: 'TECHreneurs Sub-ROVs',
    timeline: 'Month 2-3',
    deliverables: [
      '□ Appraiser (Pricing)',
      '□ Surveyor (Audience)',
      '□ Packager (Tiers)',
      '□ Scribe (Copy)',
      '□ Closer (Launch)'
    ]
  },

  phase3: {
    name: 'Discipline ROVs',
    timeline: 'Month 3-4',
    deliverables: [
      '□ Circuit (STEM)',
      '□ Canvas (Design)',
      '□ Tempo (Audio)',
      '□ Quill (Writing)',
      '□ Stage (Performance)',
      '□ Broadcast (Podcasting)',
      '□ Hearth (Culinary)',
      '□ Compass (Bright Sparks)'
    ]
  },

  phase4: {
    name: 'Distribution & Support',
    timeline: 'Month 4-5',
    deliverables: [
      '□ Probe (Testbed)',
      '□ Herald (Distribution)',
      '□ Integration testing',
      '□ Full pipeline validation'
    ]
  }
};

// ============================================================================
// TYPES
// ============================================================================

export interface ROVPersonality {
  name: string;
  role: string;
  stage: string;
  tagline: string;
  avatar: {
    primaryColor: string;
    secondaryColor: string;
    icon: string;
    mood: string;
  };
  traits: Record<string, number>;
  voice: {
    tone: string;
    pace: string;
    formality: string;
    humor: string;
    patterns: Record<string, string[]>;
    vocabulary: {
      positive: string[];
      avoids: string[];
    };
  };
}

export interface HandoffPayload {
  creatorId: string;
  fromROV: string;
  toROV: string;
  timestamp: Date;
  data: Record<string, unknown>;
  notes: string;
}

export interface QualityAssessment {
  productId: string;
  assessorROV: string;
  overallScore: number;
  criteriaScores: Array<{
    name: string;
    score: number;
    maxScore: number;
    feedback: string;
  }>;
  passed: boolean;
  recommendations: string[];
}

export default {
  FACTORY_ROV_FLEET,
  PIPELINE_FLOW,
  CAPACITY_PLANNING,
  HANDOFF_MATRIX,
  ROV_PERSONALITIES,
  IMPLEMENTATION_ROADMAP
};