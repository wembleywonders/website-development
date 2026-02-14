// src/rov/personalities/index.ts
// ROV Personality Scripts - The Children of Anansi & Maya
// Re-exports all children from their respective files

// Re-export types
export type { 
  ChildPersonality, 
  ROVPersonality,
  MemberContext,
  Stances,
  StanceConfig,
  CounterTrapCalibration,
  HandoffProtocol,
  ProgressiveWithdrawal,
  Greetings,
  ChallengePatterns,
  EncouragementPatterns
} from '../types';

// Export original 8 children from children.ts
export {
  Kweku,
  Ntikuma,
  Anansewa,
  Kofi,
  Afua,
  Yaw,
  Esi,
  Kumi,
  AllChildren,
  ChildByProgramme,
  ChildByDomain
} from './children';

// Export new 4 children (when available)
// export { NewChildren } from './newChildren';

// Combined exports for convenience
import { 
  AllChildren,
  Kweku,
  Ntikuma,
  Anansewa,
  Kofi,
  Afua,
  Yaw,
  Esi,
  Kumi
} from './children';

/**
 * Get a child by ID (lowercase)
 */
export function getChildById(id: string) {
  const lowerId = id.toLowerCase();
  const children: Record<string, typeof Kweku> = {
    kweku: Kweku,
    ntikuma: Ntikuma,
    anansewa: Anansewa,
    kofi: Kofi,
    afua: Afua,
    yaw: Yaw,
    esi: Esi,
    kumi: Kumi
  };
  return children[lowerId] || null;
}

/**
 * Get all active children
 */
export function getActiveChildren() {
  return Object.values(AllChildren).filter(child => child.isActive);
}

/**
 * Get children by programme
 */
export function getChildrenByProgramme(programme: string) {
  const normalizedProgramme = programme.toLowerCase().replace(/\s+/g, '-');
  return Object.values(AllChildren).filter(
    child => child.programme.toLowerCase().replace(/\s+/g, '-') === normalizedProgramme
  );
}

export default AllChildren;