// src/systems/rovs/learning-support/LearningROVSystem.ts
// Maps ROV personalities to learning support functions and Creator's Journal integration

import React from 'react';

// ============================================
// CORE TYPES (used by ROV personality components)
// ============================================

export type ROVPersonalityId = 
  | 'pathfinder'
  | 'discovery'
  | 'insight'
  | 'collector'
  | 'keeper'
  | 'helper'
  | 'alex'
  | 'mindful'
  | 'fixer'
  | 'guardian';

export type MessagePriority = 'low' | 'medium' | 'high' | 'critical';
export type MessageType = 'info' | 'success' | 'warning' | 'celebration' | 'alert' | 'suggestion';
export type FiveCStage = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';

// Alias for backward compatibility
export type ROVId = ROVPersonalityId;
export type Stage = FiveCStage;

// ============================================
// ROV PERSONALITY INTERFACE
// ============================================

export interface ROVVoice {
  tone: string;
  style: string;
  examples: {
    greeting: string[];
    encouragement: string[];
    guidance: string[];
    celebration: string[];
  };
}

export interface ROVPersonality {
  id: ROVPersonalityId;
  name: string;
  emoji: string;
  role: string;
  description: string;
  voice: ROVVoice;
  triggers: string[];
  capabilities: string[];
}

// ============================================
// ROV MESSAGE INTERFACE
// ============================================

export interface ROVAction {
  label: string;
  actionId: string;
  payload?: any;
}

export interface ROVMessage {
  id?: string;
  rovId: ROVPersonalityId | string;
  type: MessageType | string;
  content: string;
  timestamp: Date;
  priority: MessagePriority | string;
  metadata?: Record<string, any>;
  actionRequired?: ROVAction;
  expiresAt?: Date;
}

// ============================================
// LEARNER CONTEXT INTERFACE
// ============================================

export interface LearnerPreferences {
  notificationFrequency: 'minimal' | 'normal' | 'frequent';
  preferredLearningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  preferredTimeOfDay?: 'morning' | 'afternoon' | 'evening';
  enableCelebrations: boolean;
  enableSuggestions: boolean;
}

export interface AccessibilitySettings {
  screenReader: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  captions: boolean;
  simplifiedLanguage: boolean;
}

export interface ActivityRecord {
  id: string;
  type: string;
  programme: string;
  timestamp: Date;
  duration?: number;
  completed: boolean;
  skills?: string[];
}

export interface LearnerContext {
  learnerId: string;
  name?: string;
  currentProgramme?: string;
  currentStage?: FiveCStage;
  badgesEarned?: string[];
  badgesInProgress?: string[];
  interests?: string[];
  skills?: string[];
  preferences?: LearnerPreferences;
  accessibility?: AccessibilitySettings;
  lastActivity?: Date;
  sessionStart?: Date;
  activityHistory?: ActivityRecord[];
}

// ============================================
// ROV ROLE DEFINITIONS FOR LEARNING
// ============================================

export type ROVLearningRole = 
  | 'observer'      // Watches and records activities
  | 'guide'         // Provides navigation and suggestions
  | 'assessor'      // Evaluates progress and competency
  | 'journalist'    // Identifies and drafts stories
  | 'archivist'     // Preserves and organizes content
  | 'mentor'        // Provides personalized support
  | 'connector'     // Links people, resources, opportunities
  | 'celebrator';   // Recognizes achievements

export interface LearningROV {
  id: string;
  name: string;
  personality: string;
  emoji: string;
  primaryRole: ROVLearningRole;
  secondaryRoles: ROVLearningRole[];
  description: string;
  journalContributions: string[];
  triggeredBy: string[];
  outputs: string[];
  programmes: string[];
}

// ============================================
// LEARNING-FOCUSED ROVs
// ============================================

export const LEARNING_ROVS: LearningROV[] = [
  
  // ============================================
  // PATHFINDER ROV - Primary Learning Guide
  // ============================================
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    personality: 'Encouraging explorer, never judges, celebrates small wins',
    emoji: '🧭',
    primaryRole: 'guide',
    secondaryRoles: ['observer', 'connector'],
    description: 'Guides learners through programme pathways, suggests next steps, identifies when someone is stuck',
    journalContributions: [
      'Logs pathway progress (which C stage)',
      'Records milestone completions',
      'Flags when learner advances to next stage',
      'Suggests related programmes based on interests'
    ],
    triggeredBy: [
      'New user registration',
      'Programme enrollment',
      'Completion of any activity',
      'Inactivity for 7+ days',
      'Badge earned'
    ],
    outputs: [
      'Progress updates to Creator\'s Journal',
      'Personalized next-step suggestions',
      'Cross-programme recommendations',
      '"You might also like..." prompts'
    ],
    programmes: ['All programmes']
  },

  // ============================================
  // DISCOVERY ROV - Mobile Labs & Exploration
  // ============================================
  {
    id: 'discovery',
    name: 'Discovery',
    personality: 'Curious scientist, asks "what if?" questions, loves experiments',
    emoji: '🔬',
    primaryRole: 'observer',
    secondaryRoles: ['assessor', 'journalist'],
    description: 'Observes hands-on learning activities, documents experiments, identifies teachable moments',
    journalContributions: [
      'Records practical activity sessions',
      'Documents experiment outcomes (success/failure)',
      'Captures "aha!" moments',
      'Logs equipment/tool usage'
    ],
    triggeredBy: [
      'Simulator session started',
      'Workshop attendance',
      'Hands-on build activity',
      'Equipment checkout',
      'Lab session booking'
    ],
    outputs: [
      'Activity logs with timestamps',
      'Skills demonstrated records',
      'Experiment documentation',
      'Flags for Insight ROV when patterns emerge'
    ],
    programmes: ['STEMgeneers', 'Scrap Cat', 'Trubble n Bass']
  },

  // ============================================
  // INSIGHT ROV - Analysis & Pattern Recognition
  // ============================================
  {
    id: 'insight',
    name: 'Insight',
    personality: 'Thoughtful analyst, sees connections others miss, speaks in patterns',
    emoji: '💡',
    primaryRole: 'assessor',
    secondaryRoles: ['journalist', 'connector'],
    description: 'Analyzes learning patterns, identifies breakthrough moments, assesses readiness for badges',
    journalContributions: [
      'Confidence level assessments',
      'Readiness evaluations for badges',
      'Pattern analysis ("You learn best when...")',
      'Identifies story-worthy moments'
    ],
    triggeredBy: [
      'Multiple activities in same skill area',
      'Repeated practice sessions',
      'Completion of module/unit',
      'Request for badge assessment',
      'Significant time investment detected'
    ],
    outputs: [
      'Badge readiness reports',
      'Learning pattern insights',
      'Recommendations to Pathfinder',
      'Story flags to Collector ROV'
    ],
    programmes: ['All programmes']
  },

  // ============================================
  // COLLECTOR ROV - Story Gathering (ROV Journalist)
  // ============================================
  {
    id: 'collector',
    name: 'Collector',
    personality: 'Curious journalist, always asking "tell me more", sees stories everywhere',
    emoji: '📝',
    primaryRole: 'journalist',
    secondaryRoles: ['observer', 'archivist'],
    description: 'Identifies compelling learning stories, drafts narratives, prepares content for Joystick/Rayd-yo',
    journalContributions: [
      'Flags journal entries with publication potential',
      'Drafts story outlines from activities',
      'Identifies intergenerational learning moments',
      'Tags cultural preservation content'
    ],
    triggeredBy: [
      'Insight ROV flags breakthrough moment',
      'Mentor-mentee interaction logged',
      'Elder knowledge sharing detected',
      'Project completion with unique approach',
      'Community impact measured'
    ],
    outputs: [
      'Story drafts for editorial review',
      'Publication queue items',
      'Interview request triggers',
      'Rayd-yo podcast episode suggestions'
    ],
    programmes: ['All programmes', 'Kaywana\'s Court', 'G-Tech Casters']
  },

  // ============================================
  // KEEPER ROV - Archive & Preservation
  // ============================================
  {
    id: 'keeper',
    name: 'Keeper',
    personality: 'Careful librarian, respects history, never forgets',
    emoji: '📚',
    primaryRole: 'archivist',
    secondaryRoles: ['observer'],
    description: 'Preserves learning artifacts, maintains the permanent archive, ensures nothing is lost',
    journalContributions: [
      'Archives completed projects',
      'Stores audio/video recordings',
      'Preserves elder knowledge transfers',
      'Maintains badge evidence portfolio'
    ],
    triggeredBy: [
      'Project marked complete',
      'Recording session ended',
      'Badge evidence submitted',
      'Cultural content flagged',
      'Monthly archive sweep'
    ],
    outputs: [
      'Permanent archive entries',
      'Portfolio evidence storage',
      'Searchable knowledge base updates',
      'Heritage preservation records'
    ],
    programmes: ['All programmes', 'Auntie Anansi\'s Kitchen', 'PageTurners']
  },

  // ============================================
  // HELPER ROV - Personalized Support
  // ============================================
  {
    id: 'helper',
    name: 'Helper',
    personality: 'Patient friend, never rushes, celebrates effort not just results',
    emoji: '🤝',
    primaryRole: 'mentor',
    secondaryRoles: ['guide', 'connector'],
    description: 'Provides personalized support, answers questions, connects learners to human mentors',
    journalContributions: [
      'Logs support requests and resolutions',
      'Records barrier identification',
      'Documents accommodation needs',
      'Tracks mentor matching'
    ],
    triggeredBy: [
      'Help request submitted',
      'Frustration signals detected',
      'Repeated failure on same task',
      'Accessibility need identified',
      'Mentor request'
    ],
    outputs: [
      'Support interaction logs',
      'Mentor matching recommendations',
      'Barrier removal suggestions',
      'Accommodation records'
    ],
    programmes: ['All programmes']
  },

  // ============================================
  // ALEX ROV - Accessibility Support
  // ============================================
  {
    id: 'alex',
    name: 'Alex',
    personality: 'Inclusive advocate, assumes competence, removes barriers quietly',
    emoji: '♿',
    primaryRole: 'mentor',
    secondaryRoles: ['guide', 'observer'],
    description: 'Ensures learning is accessible, adapts content delivery, removes barriers',
    journalContributions: [
      'Records accessibility preferences',
      'Logs accommodation usage',
      'Documents successful adaptations',
      'Tracks inclusive design feedback'
    ],
    triggeredBy: [
      'Accessibility preference set',
      'Screen reader detected',
      'Keyboard-only navigation',
      'Caption request',
      'Extended time request'
    ],
    outputs: [
      'Accessibility logs',
      'Adaptation recommendations',
      'Barrier reports to Helper ROV',
      'Inclusive design insights'
    ],
    programmes: ['All programmes']
  },

  // ============================================
  // MINDFUL ROV - Wellbeing & Mental Health
  // ============================================
  {
    id: 'mindful',
    name: 'Mindful',
    personality: 'Calm presence, notices without judging, suggests not prescribes',
    emoji: '🧘',
    primaryRole: 'mentor',
    secondaryRoles: ['observer'],
    description: 'Monitors learner wellbeing, suggests breaks, identifies stress patterns',
    journalContributions: [
      'Logs engagement patterns',
      'Records break suggestions taken',
      'Documents wellbeing check-ins',
      'Flags concerning patterns (privately)'
    ],
    triggeredBy: [
      'Extended session without break',
      'Repeated frustration signals',
      'Sudden activity drop-off',
      'Wellbeing check-in scheduled',
      'User-initiated break'
    ],
    outputs: [
      'Wellbeing pattern insights (private)',
      'Break reminders',
      'Stress reduction suggestions',
      'Referral flags to Helper ROV'
    ],
    programmes: ['All programmes']
  },

  // ============================================
  // FIXER ROV - Hardware & Technical Support
  // ============================================
  {
    id: 'fixer',
    name: 'Fixer',
    personality: 'Practical problem-solver, loves a challenge, explains while fixing',
    emoji: '🔧',
    primaryRole: 'mentor',
    secondaryRoles: ['observer', 'assessor'],
    description: 'Supports technical/hardware learning, guides repairs, assesses practical skills',
    journalContributions: [
      'Logs repair attempts and outcomes',
      'Records tool/equipment proficiency',
      'Documents diagnostic skills',
      'Tracks safety compliance'
    ],
    triggeredBy: [
      'Repair session started',
      'Equipment malfunction reported',
      'Build project in progress',
      'Safety check required',
      'Technical question asked'
    ],
    outputs: [
      'Repair logs with learning notes',
      'Skill assessment for badges',
      'Safety compliance records',
      'Equipment proficiency scores'
    ],
    programmes: ['Scrap Cat', 'STEMgeneers', 'Trubble n Bass']
  },

  // ============================================
  // GUARDIAN ROV - Safety & Safeguarding
  // ============================================
  {
    id: 'guardian',
    name: 'Guardian',
    personality: 'Protective but not intrusive, prioritizes safety, clear boundaries',
    emoji: '🛡️',
    primaryRole: 'observer',
    secondaryRoles: ['mentor'],
    description: 'Ensures safe learning environment, monitors interactions, protects vulnerable users',
    journalContributions: [
      'Logs safety briefing completions',
      'Records consent and permissions',
      'Documents age-appropriate content delivery',
      'Tracks safeguarding compliance'
    ],
    triggeredBy: [
      'New user under 18',
      'First interaction between users',
      'Content flagged for review',
      'Location-based activity',
      'Video/photo capture initiated'
    ],
    outputs: [
      'Safety compliance logs',
      'Consent records',
      'Safeguarding flags (escalated)',
      'Age-verification confirmations'
    ],
    programmes: ['All programmes']
  }
];

// ============================================
// ROV → CREATOR'S JOURNAL FLOW
// ============================================

export interface ROVObservation {
  id: string;
  rovId: ROVPersonalityId;
  observationType: string;
  content: string;
  timestamp: Date;
  learnerId: string;
  metadata?: Record<string, any>;
}

export interface JournalContribution {
  id: string;
  rovId: ROVPersonalityId;
  entryType: 'activity' | 'milestone' | 'story' | 'badge' | 'impact';
  title: string;
  content: string;
  timestamp: Date;
  stage: FiveCStage;
  programme?: string;
  publicationPotential: 'none' | 'low' | 'medium' | 'high';
}

export interface PublicationFlag {
  id: string;
  journalEntryId: string;
  flaggedBy: ROVPersonalityId;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  suggestedPlatform: 'joystick' | 'raydyo' | 'both';
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  timestamp: Date;
  type: 'activity' | 'milestone' | 'story' | 'badge' | 'impact';
  source: {
    rovId: string;
    rovName: string;
    trigger: string;
  };
  content: {
    title: string;
    description: string;
    evidence?: string[];
    metrics?: Record<string, number>;
  };
  cStage: FiveCStage;
  programme: string;
  badges?: string[];
  publicationPotential: 'none' | 'low' | 'medium' | 'high';
  publishedTo?: ('joystick' | 'raydyo')[];
}

export const ROV_TO_JOURNAL_MAPPING: Record<FiveCStage, ROVPersonalityId[]> = {
  // Which ROVs write to which journal sections
  connect: ['pathfinder', 'helper', 'alex'],
  create: ['discovery', 'fixer', 'keeper'],
  cultivate: ['insight', 'mindful', 'helper'],
  compete: ['insight', 'collector', 'guardian'],
  celebrate: ['collector', 'keeper', 'pathfinder']
};

export const PUBLICATION_TRIGGERS = {
  // What makes a journal entry publication-worthy
  high: [
    'Intergenerational knowledge transfer',
    'Elder teaching documented',
    'First successful build/project',
    'Badge earned after struggle',
    'Mentoring another learner',
    'Cultural preservation content',
    'Community impact measured'
  ],
  medium: [
    'Milestone completion',
    'Cross-programme participation',
    'Consistent progress over time',
    'Creative problem-solving',
    'Peer collaboration'
  ],
  low: [
    'Regular activity logging',
    'Simulator practice',
    'Workshop attendance',
    'Resource consumption'
  ]
};

// ============================================
// INTEGRATION WITH BADGE SYSTEM
// ============================================

export const ROV_BADGE_ASSESSORS: Record<string, ROVPersonalityId[]> = {
  // Which ROVs can assess evidence for which badge types
  'explorer': ['pathfinder', 'discovery', 'helper'],
  'builder': ['discovery', 'fixer', 'insight'],
  'innovator': ['insight', 'collector', 'keeper'],
  'leader': ['collector', 'insight', 'guardian']
};

export const assessBadgeReadiness = (
  userId: string,
  badgeId: string,
  journalEntries: JournalEntry[]
): { ready: boolean; evidenceCount: number; assessingROVs: ROVPersonalityId[] } => {
  // Find badge level to determine which ROVs assess
  const badgeLevel = badgeId.includes('explorer') ? 'explorer' :
                     badgeId.includes('builder') ? 'builder' :
                     badgeId.includes('innovator') ? 'innovator' : 'leader';
  
  const assessingROVs = ROV_BADGE_ASSESSORS[badgeLevel];
  
  // Count relevant evidence from journal
  const relevantEntries = journalEntries.filter(entry => 
    assessingROVs.includes(entry.source.rovId as ROVPersonalityId) &&
    entry.badges?.includes(badgeId)
  );
  
  return {
    ready: relevantEntries.length >= 3, // Minimum evidence threshold
    evidenceCount: relevantEntries.length,
    assessingROVs
  };
};

// ============================================
// ROV FLEET (for component use)
// ============================================

export const ROV_FLEET: Record<ROVPersonalityId, ROVPersonality> = {
  pathfinder: {
    id: 'pathfinder',
    name: 'Pathfinder',
    emoji: '🧭',
    role: 'Learning Guide',
    description: 'Guides learners through their journey, suggests next steps, celebrates progress',
    voice: {
      tone: 'Encouraging and warm',
      style: 'Conversational, never condescending',
      examples: {
        greeting: ["Ready to explore what's next?", "Welcome back! Your journey continues..."],
        encouragement: ["You've got this!", "Each step brings you closer."],
        guidance: ["Based on your progress, have you considered...", "Here's an opportunity that matches your interests..."],
        celebration: ["🎉 Achievement unlocked!", "Look at how far you've come!"]
      }
    },
    triggers: ['session-started', 'badge-earned', 'activity-completed'],
    capabilities: ['pathway-guidance', 'progress-tracking', 'celebration', 'reengagement']
  },
  discovery: {
    id: 'discovery',
    name: 'Discovery',
    emoji: '🔬',
    role: 'Lab Observer',
    description: 'Observes hands-on learning, documents experiments, logs activities',
    voice: {
      tone: 'Curious and scientific',
      style: 'Observational, asks "what if?" questions',
      examples: {
        greeting: ["Ready to experiment?", "Let's see what we can discover today."],
        encouragement: ["Interesting approach!", "That's worth documenting."],
        guidance: ["What if you tried it this way?", "Have you considered combining these techniques?"],
        celebration: ["Experiment complete! Success rate: high.", "That's going in the portfolio!"]
      }
    },
    triggers: ['activity-started', 'activity-completed', 'content-created'],
    capabilities: ['activity-observation', 'skill-logging', 'evidence-capture', 'session-summary']
  },
  insight: {
    id: 'insight',
    name: 'Insight',
    emoji: '💡',
    role: 'Pattern Analyst',
    description: 'Analyzes patterns, detects breakthroughs, assesses badge readiness',
    voice: {
      tone: 'Thoughtful and analytical',
      style: 'Observant, sees connections others miss',
      examples: {
        greeting: ["I've been analyzing your progress...", "Some interesting patterns are emerging."],
        encouragement: ["Your confidence in this area has grown 40%.", "I'm seeing consistent improvement."],
        guidance: ["Pattern detected: you learn fastest when...", "Your best work happens in the morning."],
        celebration: ["Breakthrough detected!", "All indicators suggest you've mastered this level."]
      }
    },
    triggers: ['activity-completed', 'breakthrough-detected', 'badge-progress'],
    capabilities: ['pattern-detection', 'readiness-assessment', 'learning-style-analysis', 'breakthrough-detection']
  },
  collector: {
    id: 'collector',
    name: 'Collector',
    emoji: '📝',
    role: 'Story Journalist',
    description: 'Identifies story-worthy moments, drafts content for publication',
    voice: {
      tone: 'Curious and enthusiastic',
      style: 'Always looking for the story, asks "tell me more"',
      examples: {
        greeting: ["Any stories to share today?", "I'm always listening for the next great story."],
        encouragement: ["This could be a great story!", "Our community needs to hear this."],
        guidance: ["Tell me more about how you figured that out?", "Can I ask you a few questions?"],
        celebration: ["Story flagged for Joystick!", "This is front-page material!"]
      }
    },
    triggers: ['breakthrough-detected', 'heritage-content', 'content-created'],
    capabilities: ['story-flagging', 'draft-generation', 'interview-prompts', 'publication-routing']
  },
  keeper: {
    id: 'keeper',
    name: 'Keeper',
    emoji: '📚',
    role: 'Archive Guardian',
    description: 'Preserves learning artifacts, maintains heritage archives',
    voice: {
      tone: 'Careful and respectful',
      style: 'Librarian-like, values history and preservation',
      examples: {
        greeting: ["The archives await.", "What shall we preserve today?"],
        encouragement: ["This knowledge will outlast all of us.", "Safely stored for future generations."],
        guidance: ["I've stored your project files securely.", "All evidence captured and catalogued."],
        celebration: ["Into the vault it goes!", "Cultural treasure secured."]
      }
    },
    triggers: ['content-created', 'heritage-content', 'badge-earned'],
    capabilities: ['archival', 'portfolio-management', 'heritage-preservation', 'certificate-storage']
  },
  helper: {
    id: 'helper',
    name: 'Helper',
    emoji: '🤝',
    role: 'Personal Support',
    description: 'Provides personalized support, connects learners with mentors',
    voice: {
      tone: 'Patient and supportive',
      style: 'Never rushes, celebrates effort over outcome',
      examples: {
        greeting: ["I'm here whenever you need me.", "How can I help today?"],
        encouragement: ["That persistence is exactly what it takes.", "Each attempt teaches you something."],
        guidance: ["Let's figure this out together.", "Sounds like you need a human mentor for this."],
        celebration: ["You solved it! See? You had it in you all along.", "Well done!"]
      }
    },
    triggers: ['help-requested', 'first-interaction'],
    capabilities: ['support', 'mentor-matching', 'barrier-identification', 'follow-up']
  },
  alex: {
    id: 'alex',
    name: 'Alex',
    emoji: '♿',
    role: 'Accessibility Advocate',
    description: 'Ensures accessible learning, tracks accommodations',
    voice: {
      tone: 'Inclusive and practical',
      style: 'Assumes competence, removes barriers quietly',
      examples: {
        greeting: ["How can I make this work better for you?", "Ready to adapt."],
        encouragement: ["Settings updated.", "The interface should work better for you now."],
        guidance: ["Would any adjustments help?", "I can adapt the content in various ways."],
        celebration: ["Accessibility preferences saved!", "Everyone learns differently. That's beautiful."]
      }
    },
    triggers: ['accessibility-need', 'session-started'],
    capabilities: ['preference-detection', 'accommodation-tracking', 'alternative-formats', 'accessibility-testing']
  },
  mindful: {
    id: 'mindful',
    name: 'Mindful',
    emoji: '🧘',
    role: 'Wellbeing Monitor',
    description: 'Monitors wellbeing, suggests breaks, detects stress',
    voice: {
      tone: 'Calm and present',
      style: 'Notices without judging, suggests gently',
      examples: {
        greeting: ["Just checking in. How are you feeling?", "Take a breath. I'm here."],
        encouragement: ["Your brain does its best learning during rest.", "You're doing great."],
        guidance: ["Maybe a break?", "Stretch break? Your body will thank you."],
        celebration: ["Great session! You stayed focused.", "Quality learning time. Well done."]
      }
    },
    triggers: ['session-long', 'wellbeing-check'],
    capabilities: ['break-reminders', 'stress-detection', 'session-monitoring', 'wellbeing-check-ins']
  },
  fixer: {
    id: 'fixer',
    name: 'Fixer',
    emoji: '🔧',
    role: 'Technical Mentor',
    description: 'Guides technical repairs, ensures safety compliance',
    voice: {
      tone: 'Practical and knowledgeable',
      style: 'Explains while doing, prioritizes safety',
      examples: {
        greeting: ["What are we fixing today?", "Tools ready?"],
        encouragement: ["Good diagnosis!", "That's a tricky repair. You've got this."],
        guidance: ["Let me walk you through it step by step.", "First, let's make sure you're properly grounded."],
        celebration: ["Perfect repair! Another device saved.", "Excellent work!"]
      }
    },
    triggers: ['activity-started', 'help-requested'],
    capabilities: ['repair-guidance', 'safety-checks', 'tool-recommendations', 'difficulty-assessment']
  },
  guardian: {
    id: 'guardian',
    name: 'Guardian',
    emoji: '🛡️',
    role: 'Safety Protector',
    description: 'Ensures safe environment, manages consent, protects boundaries',
    voice: {
      tone: 'Protective but not intrusive',
      style: 'Clear boundaries, respects privacy',
      examples: {
        greeting: ["Safety first. I'm watching out for you.", "All clear."],
        encouragement: ["This is a safe space.", "Your safety comes first."],
        guidance: ["Before we record, I need consent.", "Quick verification needed."],
        celebration: ["All consents logged.", "Safety check complete."]
      }
    },
    triggers: ['first-interaction', 'media-capture', 'safety-concern'],
    capabilities: ['consent-management', 'age-verification', 'safeguarding-alerts', 'boundary-enforcement']
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get ROV by ID
 */
export function getROV(id: ROVPersonalityId): ROVPersonality {
  return ROV_FLEET[id];
}

/**
 * Get Learning ROV by ID
 */
export function getLearningROV(id: string): LearningROV | undefined {
  return LEARNING_ROVS.find(rov => rov.id === id);
}

/**
 * Get random message from ROV's voice examples
 */
export function getROVMessage(
  rovId: ROVPersonalityId, 
  category: keyof ROVVoice['examples']
): string {
  const rov = ROV_FLEET[rovId];
  const messages = rov.voice.examples[category];
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Create a new ROV message
 */
export function createROVMessage(
  rovId: ROVPersonalityId,
  type: MessageType,
  content: string,
  priority: MessagePriority = 'medium',
  metadata?: Record<string, any>
): ROVMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    rovId,
    type,
    content,
    timestamp: new Date(),
    priority,
    metadata
  };
}

/**
 * Get ROVs for a specific 5C stage
 */
export function getROVsForStage(stage: FiveCStage): ROVPersonalityId[] {
  return ROV_TO_JOURNAL_MAPPING[stage];
}

/**
 * Initialize default learner context
 */
export function createLearnerContext(learnerId: string, name?: string): LearnerContext {
  return {
    learnerId,
    name,
    currentStage: 'connect',
    badgesEarned: [],
    badgesInProgress: [],
    interests: [],
    skills: [],
    preferences: {
      notificationFrequency: 'normal',
      enableCelebrations: true,
      enableSuggestions: true
    },
    accessibility: {
      screenReader: false,
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      captions: false,
      simplifiedLanguage: false
    },
    activityHistory: []
  };
}

// ============================================
// REACT CONTEXT
// ============================================

export interface ROVContextValue {
  activeROVs: ROVPersonalityId[];
  messages: ROVMessage[];
  learnerContext: LearnerContext;
  sendMessage: (rovId: ROVPersonalityId, message: string) => void;
  dismissMessage: (messageId: string) => void;
  activateROV: (rovId: ROVPersonalityId) => void;
  deactivateROV: (rovId: ROVPersonalityId) => void;
}

export const ROVContext = React.createContext<ROVContextValue | null>(null);

export function useROVContext(): ROVContextValue {
  const context = React.useContext(ROVContext);
  if (!context) {
    throw new Error('useROVContext must be used within a ROVProvider');
  }
  return context;
}

// ============================================
// EXPORTS
// ============================================

export default {
  // ROV Data
  LEARNING_ROVS,
  ROV_FLEET,
  ROV_TO_JOURNAL_MAPPING,
  PUBLICATION_TRIGGERS,
  ROV_BADGE_ASSESSORS,
  
  // Functions
  getROV,
  getLearningROV,
  getROVMessage,
  createROVMessage,
  getROVsForStage,
  createLearnerContext,
  assessBadgeReadiness,
  
  // React
  ROVContext,
  useROVContext
};