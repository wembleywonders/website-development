// src/rov/index.ts
// The Children of Anansi & Maya - Complete ROV System
// Upgraded with stances, cross-domain knowledge, trust-preserving handoffs, and counter-trap calibration

// ============================================
// TYPE EXPORTS
// ============================================

export * from './types';

// ============================================
// ORIGINAL CHILDREN (from existing personalities)
// ============================================

// These would be imported from the existing file and enhanced
// For now, we export the structure they should follow

export { 
  // Original 8 children
  // Kweku, Ntikuma, Anansewa, Kofi, Afua, Yaw, Esi, Kumi,
  // AllChildren, ChildByProgramme, ChildByDomain
} from './personalities/children';

// ============================================
// NEW CHILDREN
// ============================================

export { 
  Adaeze,   // Fashion & Design
  Nyame,    // Ethics
  Osei,     // Civics
  Akua,     // Legal
  NewChildren 
} from './personalities/newChildren';

// ============================================
// STANCES
// ============================================

export {
  selectStance,
  getDefaultStanceForStage,
  getEngagementPattern,
  ALL_STANCES,
  KWEKU_STANCES,
  NTIKUMA_STANCES,
  KOFI_STANCES,
  AFUA_STANCES,
  YAW_STANCES,
  ESI_STANCES,
  KUMI_STANCES,
  ANANSEWA_STANCES,
  ADAEZE_STANCES,
  NYAME_STANCES,
  OSEI_STANCES,
  AKUA_STANCES
} from './stances';

// ============================================
// SHARED KNOWLEDGE
// ============================================

export {
  SHARED_KNOWLEDGE,
  getSurfaceKnowledge,
  checkEscalationTriggers,
  getVoiceTemplate,
  selectSurfaceFact,
  buildCrossDomainResponse
} from './knowledge/sharedKnowledge';

// ============================================
// COUNTER-TRAP CALIBRATION
// ============================================

export {
  UNIVERSAL_COUNTER_TRAP,
  CHILD_CALIBRATIONS,
  detectTraps,
  getTrapReplacement,
  getTrapGoodExample,
  CELEBRATION_TRAP,
  IDENTITY_CONFIRMATION_TRAP,
  OVERCOMING_NARRATIVE_TRAP,
  POTENTIAL_TRAP,
  DEPENDENCE_TRAP
} from './calibration/counterTrap';

// ============================================
// TRUST-PRESERVING HANDOFFS
// ============================================

export {
  assessHandoffNeed,
  makeHandoffDecision,
  generateSurfaceGuidance,
  generateCollaborationInvite,
  generateWarmHandoff,
  generateMayaReturn,
  generateReceivingGreeting,
  filterContextForHandoff,
  getDomainSpecialist
} from './handoffs/trustPreserving';

// ============================================
// COMPLETE CHILDREN REGISTRY
// ============================================

// If NewChildren is a named export:
import { NewChildren } from './personalities/newChildren';
// Or, if NewChildren is a default export, use:
// import NewChildren from './personalities/newChildren';

// This would merge with existing children when integrated
export const COMPLETE_CHILDREN_REGISTRY = {
  // Original 8 (would be imported from existing)
  // kweku: Kweku,
  // ntikuma: Ntikuma,
  // anansewa: Anansewa,
  // kofi: Kofi,
  // afua: Afua,
  // yaw: Yaw,
  // esi: Esi,
  // kumi: Kumi,
  
  // New 4
  adaeze: NewChildren.Adaeze,
  nyame: NewChildren.Nyame,
  osei: NewChildren.Osei,
  akua: NewChildren.Akua
};

// ============================================
// DOMAIN MAPPINGS
// ============================================

export const CHILD_BY_PROGRAMME: Record<string, string> = {
  // Original mappings
  'techreneurs': 'kweku',
  'finance': 'ntikuma',
  'money-reset': 'ntikuma',
  'kaywanas-court': 'anansewa',
  'stemgeneers': 'kofi',
  'scrap-cat': 'kofi',
  'rayd-yo': 'afua',
  'joystick': 'yaw',
  'heritage': 'esi',
  'aunties-kitchen': 'esi',
  'pageturners': 'esi',
  'g-tech-casters': 'kumi',
  
  // New mappings
  'silk-stilettos': 'adaeze',
  'crossroads': 'nyame',
  'the-council': 'osei',
  'know-your-rights': 'akua'
};

export const CHILD_BY_DOMAIN: Record<string, string> = {
  // Original mappings
  'business': 'kweku',
  'money': 'ntikuma',
  'finance': 'ntikuma',
  'tax': 'ntikuma',
  'performance': 'anansewa',
  'theatre': 'anansewa',
  'acting': 'anansewa',
  'building': 'kofi',
  'making': 'kofi',
  'stem': 'kofi',
  'code': 'kofi',
  'voice': 'afua',
  'podcast': 'afua',
  'audio': 'afua',
  'story': 'afua',
  'writing': 'yaw',
  'journalism': 'yaw',
  'documenting': 'yaw',
  'heritage': 'esi',
  'recipes': 'esi',
  'family': 'esi',
  'culture': 'esi',
  'gaming': 'kumi',
  'streaming': 'kumi',
  'esports': 'kumi',
  'play': 'kumi',
  
  // New mappings
  'fashion': 'adaeze',
  'design': 'adaeze',
  'visual': 'adaeze',
  'style': 'adaeze',
  'ethics': 'nyame',
  'morals': 'nyame',
  'values': 'nyame',
  'dilemma': 'nyame',
  'civics': 'osei',
  'politics': 'osei',
  'power': 'osei',
  'organizing': 'osei',
  'campaign': 'osei',
  'legal': 'akua',
  'rights': 'akua',
  'law': 'akua',
  'contract': 'akua',
  'tenant': 'akua',
  'employment': 'akua'
};

// ============================================
// ROV FAMILY ALIASES (backward compatibility)
// ============================================

export const ROV_FAMILY_ALIASES: Record<string, string | string[]> = {
  // Maps ROV Family names to Anansi children
  'solomon': ['kweku', 'ntikuma'], // Solomon covered both business and finance
  'neville': 'kofi',
  'maxine': 'anansewa',
  'esther': 'esi',
  'tariq': ['afua', 'yaw', 'kumi'], // Tariq covered all media
  'adaeze': 'adaeze', // Same name, now properly defined
  'maya': 'maya'
};

/**
 * Resolve a ROV Family name to the appropriate Anansi child
 */
export function resolveROVAlias(familyName: string, context?: string): string {
  const mapping = ROV_FAMILY_ALIASES[familyName.toLowerCase()];
  
  if (!mapping) return familyName;
  
  if (Array.isArray(mapping)) {
    // Multiple children mapped - use context to decide
    if (context) {
      const lowerContext = context.toLowerCase();
      
      // Solomon -> kweku (business) or ntikuma (finance)
      if (familyName.toLowerCase() === 'solomon') {
        if (['tax', 'budget', 'savings', 'expense', 'invoice'].some(k => lowerContext.includes(k))) {
          return 'ntikuma';
        }
        return 'kweku'; // Default to business
      }
      
      // Tariq -> afua (voice), yaw (writing), or kumi (gaming)
      if (familyName.toLowerCase() === 'tariq') {
        if (['podcast', 'voice', 'audio', 'radio', 'speaking'].some(k => lowerContext.includes(k))) {
          return 'afua';
        }
        if (['writing', 'article', 'journalism', 'document'].some(k => lowerContext.includes(k))) {
          return 'yaw';
        }
        if (['game', 'gaming', 'stream', 'esport'].some(k => lowerContext.includes(k))) {
          return 'kumi';
        }
        return 'afua'; // Default to voice
      }
    }
    
    // Default to first in array
    return mapping[0];
  }
  
  return mapping;
}

// ============================================
// INTEGRATION HELPERS
// ============================================

import type { ChildPersonality, MemberContext, ROVStance } from './types';
import { selectStance } from './stances';
import { makeHandoffDecision } from './handoffs/trustPreserving';
import { detectTraps, CHILD_CALIBRATIONS } from './calibration/counterTrap';

/**
 * Process a message through the complete ROV system
 */
export async function processWithROV(
  message: string,
  childId: string,
  context: MemberContext
): Promise<{
  stance: ROVStance;
  handoffDecision: ReturnType<typeof makeHandoffDecision>;
  calibration: typeof CHILD_CALIBRATIONS[string];
  warnings: string[];
}> {
  // Select appropriate stance
  const stance = selectStance(message, context, childId);
  
  // Assess handoff need (requires child personality - would be looked up in real implementation)
  // const child = COMPLETE_CHILDREN_REGISTRY[childId];
  // const handoffDecision = makeHandoffDecision(message, child, context);
  
  // Get calibration for trap detection
  const calibration = CHILD_CALIBRATIONS[childId];
  
  // Note: In real implementation, this would process a draft response
  // and check for traps before returning
  const warnings: string[] = [];
  
  return {
    stance,
    handoffDecision: {} as any, // Placeholder
    calibration,
    warnings
  };
}

/**
 * Validate a response against counter-trap calibration
 */
export function validateResponse(
  response: string,
  childId: string
): { valid: boolean; trapsDetected: string[]; suggestions: string[] } {
  const calibration = CHILD_CALIBRATIONS[childId];
  
  if (!calibration) {
    return { valid: true, trapsDetected: [], suggestions: [] };
  }
  
  const trapsDetected = detectTraps(response, calibration);
  
  interface TrapConfig {
    name: string;
    replacement?: string;
    [key: string]: any;
  }

  interface Calibration {
    celebrationTrap: TrapConfig;
    identityConfirmationTrap: TrapConfig;
    overcomingNarrativeTrap: TrapConfig;
    potentialTrap: TrapConfig;
    dependenceTrap: TrapConfig;
    domainSpecificTraps?: TrapConfig[];
    [key: string]: any;
  }

  // const calibration: Calibration = CHILD_CALIBRATIONS[childId];

  const suggestions: string[] = trapsDetected.map((trap: string) => {
    const allTraps: TrapConfig[] = [
      calibration.celebrationTrap,
      calibration.identityConfirmationTrap,
      calibration.overcomingNarrativeTrap,
      calibration.potentialTrap,
      calibration.dependenceTrap,
      ...(calibration.domainSpecificTraps || [])
    ];

    const trapConfig: TrapConfig | undefined = allTraps.find((t: TrapConfig) => t.name === trap);
    return trapConfig?.replacement || '';
  }).filter(Boolean);
  
  return {
    valid: trapsDetected.length === 0,
    trapsDetected,
    suggestions
  };
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  // Children
  COMPLETE_CHILDREN_REGISTRY,
  CHILD_BY_PROGRAMME,
  CHILD_BY_DOMAIN,
  
  // Aliases
  ROV_FAMILY_ALIASES,
  resolveROVAlias,
  
  // Processing
  processWithROV,
  validateResponse
};