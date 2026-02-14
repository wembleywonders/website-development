// src/systems/rovs/personalities/index.ts
// Central export for all ROV personalities

// Pathfinder
export { default as PathfinderROV } from './pathfinder/PathfinderROV';
export * from './pathfinder/PathfinderROVTypes';

// Discovery
// TODO: Implement DiscoveryROV module
// export { default as DiscoveryROV, discoveryUtils } from './discovery/DiscoveryROV';
// export * from './discovery/DiscoveryROVTypes';

// Insight
// TODO: Implement InsightROV module (directory exists but no exports)
// export { default as InsightROV, insightUtils } from './insight/InsightROV';
// export * from './insight/InsightROVTypes';

// Collector
// TODO: Implement CollectorROV module
// export { default as CollectorROV, collectorUtils } from './collector/CollectorROV';
// export * from './collector/CollectorROVTypes';

// Keeper
// TODO: Implement KeeperROV module
// export { default as KeeperROV, keeperUtils } from './keeper/KeeperROV';
// export * from './keeper/KeeperROVTypes';

// Helper
export { default as HelperSupportROV } from './helper/HelperSupportROV';
export * from './helper/HelperSupportROVTypes';

// Alex
// TODO: Implement AlexROV module (AlexROVWithTracking exists in helper directory)
// export { default as AlexROV, alexUtils } from './alex/AlexROV';
// export * from './alex/AlexROVTypes';

// Mindful
export { default as MindfulMentalHealthROV } from './mindful/MindfulMentalHealthROV';
export * from './mindful/MindfulMentalHealthROVTypes';

// Fixer
// TODO: Implement FixerROV module
// export { default as FixerROV, fixerUtils } from './fixer/FixerROV';
// export * from './fixer/FixerROVTypes';

// Guardian
// TODO: Implement GuardianROV module
// export { default as GuardianROV, guardianUtils } from './guardian/GuardianROV';
// export * from './guardian/GuardianROVTypes';

// Emergency (exists but not in original list)
export { default as EmergencyResponseROV } from './emergency/EmergencyResponseROV';
export * from './emergency/EmergencyResponseROVTypes';

// ROV Fleet Type
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
  | 'guardian'
  | 'emergency';

export const ROV_FLEET: Record<ROVPersonalityId, {
  emoji: string;
  name: string;
  role: string;
  description: string;
}> = {
  pathfinder: {
    emoji: '🧭',
    name: 'Pathfinder',
    role: 'Learning Guide',
    description: 'Guides learners through their journey'
  },
  discovery: {
    emoji: '🔬',
    name: 'Discovery',
    role: 'Lab Observer',
    description: 'Observes and documents hands-on learning'
  },
  insight: {
    emoji: '💡',
    name: 'Insight',
    role: 'Pattern Analyst',
    description: 'Analyzes patterns and readiness'
  },
  collector: {
    emoji: '📝',
    name: 'Collector',
    role: 'Story Journalist',
    description: 'Identifies and drafts compelling stories'
  },
  keeper: {
    emoji: '📚',
    name: 'Keeper',
    role: 'Archive Guardian',
    description: 'Preserves learning artifacts permanently'
  },
  helper: {
    emoji: '🤝',
    name: 'Helper',
    role: 'Personal Support',
    description: 'Provides personalized support'
  },
  alex: {
    emoji: '♿',
    name: 'Alex',
    role: 'Accessibility Advocate',
    description: 'Ensures accessible learning'
  },
  mindful: {
    emoji: '🧘',
    name: 'Mindful',
    role: 'Wellbeing Monitor',
    description: 'Monitors learner wellbeing'
  },
  fixer: {
    emoji: '🔧',
    name: 'Fixer',
    role: 'Technical Mentor',
    description: 'Supports technical/hardware learning'
  },
  guardian: {
    emoji: '🛡️',
    name: 'Guardian',
    role: 'Safety Protector',
    description: 'Ensures safe learning environment'
  },
  emergency: {
    emoji: '🚨',
    name: 'Emergency',
    role: 'Emergency Response',
    description: 'Handles emergency situations'
  }
};