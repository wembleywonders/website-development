/**
 * PROGRAMME JOURNEY INTEGRATION
 * 
 * Connects programmes and workshops to marketplace unlocks.
 * Tracks progression from learner to seller.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { ProgrammeId } from '../types';
import { 
  PROGRAMME_INFO, 
  WORKSHOP_SKILLS, 
  SINGLE_PROGRAMME_PRODUCTS,
  getAvailableCombinations 
} from '../data/skillCombinations';

// ============================================
// TYPES
// ============================================

export interface WorkshopProgress {
  programmeId: ProgrammeId;
  workshopNumber: number;
  completedDate: Date;
  skillsGained: string[];
  canNowSell: string[];
}

export interface ProgrammeProgress {
  programmeId: ProgrammeId;
  enrolled: boolean;
  enrolledDate?: Date;
  workshopsCompleted: number;
  totalWorkshops: number;
  completedWorkshops: WorkshopProgress[];
  graduated: boolean;
  graduatedDate?: Date;
  marketplaceUnlocked: boolean;
  unlockedProducts: string[];
  unlockedServices: string[];
}

export interface MarketplaceReadiness {
  ready: boolean;
  completedProgrammes: ProgrammeId[];
  canSell: {
    products: string[];
    services: string[];
  };
  combinations: {
    id: string;
    name: string;
    unlocks: string[];
  }[];
  nextToUnlock?: {
    programmeId: ProgrammeId;
    workshopNumber: number;
    willUnlock: string[];
  };
}

export interface JourneyMilestone {
  id: string;
  type: 'workshop' | 'graduation' | 'first-listing' | 'first-sale' | 'combination';
  title: string;
  description: string;
  achievedDate?: Date;
  programmeId?: ProgrammeId;
  reward?: string;
}

// ============================================
// WORKSHOP COMPLETION HANDLERS
// ============================================

/**
 * Process workshop completion and return unlocks
 */
export function processWorkshopCompletion(
  programmeId: ProgrammeId,
  workshopNumber: number,
  existingProgress: WorkshopProgress[]
): {
  progress: WorkshopProgress;
  newUnlocks: string[];
  milestone?: JourneyMilestone;
} {
  const workshopData = WORKSHOP_SKILLS[programmeId];
  if (!workshopData) {
    throw new Error(`Unknown programme: ${programmeId}`);
  }
  
  const workshop = workshopData.find(w => w.workshopNumber === workshopNumber);
  if (!workshop) {
    throw new Error(`Workshop ${workshopNumber} not found in ${programmeId}`);
  }
  
  // Check if already completed
  const alreadyCompleted = existingProgress.some(
    p => p.programmeId === programmeId && p.workshopNumber === workshopNumber
  );
  
  if (alreadyCompleted) {
    throw new Error(`Workshop ${workshopNumber} already completed`);
  }
  
  const progress: WorkshopProgress = {
    programmeId,
    workshopNumber,
    completedDate: new Date(),
    skillsGained: workshop.skillsLearned,
    canNowSell: workshop.canSellAfter
  };
  
  // Determine new unlocks (items not previously unlocked)
  const previousUnlocks = existingProgress
    .filter(p => p.programmeId === programmeId)
    .flatMap(p => p.canNowSell);
  
  const newUnlocks = workshop.canSellAfter.filter(
    item => !previousUnlocks.includes(item)
  );
  
  // Create milestone if unlocks something new
  let milestone: JourneyMilestone | undefined;
  if (newUnlocks.length > 0) {
    const programmeInfo = PROGRAMME_INFO[programmeId];
    milestone = {
      id: `workshop-${programmeId}-${workshopNumber}`,
      type: 'workshop',
      title: `${programmeInfo.icon} Workshop ${workshopNumber} Complete!`,
      description: `You can now sell: ${newUnlocks.join(', ')}`,
      achievedDate: new Date(),
      programmeId,
      reward: `Unlocked ${newUnlocks.length} new listing types`
    };
  }
  
  return { progress, newUnlocks, milestone };
}

/**
 * Process programme graduation
 */
export function processProgrammeGraduation(
  programmeId: ProgrammeId,
  completedWorkshops: WorkshopProgress[],
  existingGraduations: ProgrammeId[]
): {
  graduated: boolean;
  milestone?: JourneyMilestone;
  combinationsUnlocked?: { id: string; name: string; unlocks: string[] }[];
} {
  const programmeInfo = PROGRAMME_INFO[programmeId];
  const workshopCount = completedWorkshops.filter(
    w => w.programmeId === programmeId
  ).length;
  
  const graduated = workshopCount >= programmeInfo.workshopsRequired;
  
  if (!graduated) {
    return { graduated: false };
  }
  
  // Already graduated?
  if (existingGraduations.includes(programmeId)) {
    return { graduated: true };
  }
  
  // Create graduation milestone
  const milestone: JourneyMilestone = {
    id: `graduation-${programmeId}`,
    type: 'graduation',
    title: `🎓 ${programmeInfo.name} Graduate!`,
    description: `You've completed all ${programmeInfo.workshopsRequired} workshops. Full marketplace access unlocked!`,
    achievedDate: new Date(),
    programmeId,
    reward: 'Full marketplace selling privileges'
  };
  
  // Check for new combinations
  const newGraduations = [...existingGraduations, programmeId];
  const newCombinations = getAvailableCombinations(newGraduations);
  const oldCombinations = getAvailableCombinations(existingGraduations);
  
  const combinationsUnlocked = newCombinations
    .filter(nc => !oldCombinations.some(oc => oc.id === nc.id))
    .map(c => ({ id: c.id, name: c.name, unlocks: c.unlocks }));
  
  return { graduated: true, milestone, combinationsUnlocked };
}

// ============================================
// MARKETPLACE READINESS
// ============================================

/**
 * Check if user is ready to sell on marketplace
 */
export function checkMarketplaceReadiness(
  completedWorkshops: WorkshopProgress[],
  completedProgrammes: ProgrammeId[]
): MarketplaceReadiness {
  // Must have at least one completed programme
  if (completedProgrammes.length === 0) {
    // Check if close to completing any programme
    const programmeProgress = getProgrammeProgressSummary(completedWorkshops);
    const closestProgramme = programmeProgress
      .filter(p => p.workshopsCompleted > 0 && !p.graduated)
      .sort((a, b) => {
        const aRemaining = a.totalWorkshops - a.workshopsCompleted;
        const bRemaining = b.totalWorkshops - b.workshopsCompleted;
        return aRemaining - bRemaining;
      })[0];
    
    if (closestProgramme) {
      const nextWorkshop = closestProgramme.workshopsCompleted + 1;
      const workshopData = WORKSHOP_SKILLS[closestProgramme.programmeId];
      const workshop = workshopData?.find(w => w.workshopNumber === nextWorkshop);
      
      return {
        ready: false,
        completedProgrammes: [],
        canSell: { products: [], services: [] },
        combinations: [],
        nextToUnlock: workshop ? {
          programmeId: closestProgramme.programmeId,
          workshopNumber: nextWorkshop,
          willUnlock: workshop.canSellAfter
        } : undefined
      };
    }
    
    return {
      ready: false,
      completedProgrammes: [],
      canSell: { products: [], services: [] },
      combinations: []
    };
  }
  
  // Gather all unlocked products and services
  const products: string[] = [];
  const services: string[] = [];
  
  completedProgrammes.forEach(programmeId => {
    const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
      p => p.programmeId === programmeId
    );
    
    if (programmeProducts) {
      products.push(...programmeProducts.products);
      services.push(...programmeProducts.services);
    }
  });
  
  // Get combinations
  const combinations = getAvailableCombinations(completedProgrammes).map(c => ({
    id: c.id,
    name: c.name,
    unlocks: c.unlocks
  }));
  
  return {
    ready: true,
    completedProgrammes,
    canSell: {
      products: [...new Set(products)],
      services: [...new Set(services)]
    },
    combinations
  };
}

/**
 * Get summary of progress across all programmes
 */
export function getProgrammeProgressSummary(
  completedWorkshops: WorkshopProgress[]
): ProgrammeProgress[] {
  const programmeIds = Object.keys(PROGRAMME_INFO) as ProgrammeId[];
  
  return programmeIds.map(programmeId => {
    const programmeWorkshops = completedWorkshops.filter(
      w => w.programmeId === programmeId
    );
    
    const programmeInfo = PROGRAMME_INFO[programmeId];
    const totalWorkshops = programmeInfo.workshopsRequired;
    const workshopsCompleted = programmeWorkshops.length;
    const graduated = workshopsCompleted >= totalWorkshops;
    
    // Collect all unlocked products/services
    const unlockedProducts: string[] = [];
    const unlockedServices: string[] = [];
    
    if (graduated) {
      const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
        p => p.programmeId === programmeId
      );
      
      if (programmeProducts) {
        unlockedProducts.push(...programmeProducts.products);
        unlockedServices.push(...programmeProducts.services);
      }
    } else {
      // Only items from completed workshops
      programmeWorkshops.forEach(w => {
        unlockedProducts.push(...w.canNowSell);
      });
    }
    
    return {
      programmeId,
      enrolled: workshopsCompleted > 0,
      enrolledDate: programmeWorkshops[0]?.completedDate,
      workshopsCompleted,
      totalWorkshops,
      completedWorkshops: programmeWorkshops,
      graduated,
      graduatedDate: graduated 
        ? programmeWorkshops[programmeWorkshops.length - 1]?.completedDate 
        : undefined,
      marketplaceUnlocked: graduated,
      unlockedProducts: [...new Set(unlockedProducts)],
      unlockedServices: [...new Set(unlockedServices)]
    };
  }).filter(p => p.enrolled); // Only return programmes with some progress
}

// ============================================
// JOURNEY TRACKING
// ============================================

/**
 * Calculate overall journey progress
 */
export function calculateJourneyProgress(
  completedWorkshops: WorkshopProgress[],
  completedProgrammes: ProgrammeId[],
  listings: number,
  sales: number,
  earnings: number
): {
  stage: 'discovery' | 'learning' | 'creating' | 'launching' | 'growing' | 'mastery';
  stageProgress: number;
  overallProgress: number;
  nextMilestone: string;
} {
  // Define stages
  if (completedWorkshops.length === 0) {
    return {
      stage: 'discovery',
      stageProgress: 0,
      overallProgress: 0,
      nextMilestone: 'Complete your first workshop'
    };
  }
  
  if (completedProgrammes.length === 0) {
    const progress = getProgrammeProgressSummary(completedWorkshops);
    const maxProgress = progress.length > 0 
      ? Math.max(...progress.map(p => p.workshopsCompleted / p.totalWorkshops))
      : 0;
    
    return {
      stage: 'learning',
      stageProgress: Math.round(maxProgress * 100),
      overallProgress: Math.round(maxProgress * 20), // Learning is 0-20%
      nextMilestone: 'Complete a programme to unlock marketplace'
    };
  }
  
  if (listings === 0) {
    return {
      stage: 'creating',
      stageProgress: 0,
      overallProgress: 25,
      nextMilestone: 'Create your first listing'
    };
  }
  
  if (sales === 0) {
    return {
      stage: 'launching',
      stageProgress: Math.min(100, listings * 20), // 5 listings = 100%
      overallProgress: 30 + Math.min(20, listings * 4),
      nextMilestone: 'Get your first sale'
    };
  }
  
  if (earnings < 1000) {
    const earningsProgress = (earnings / 1000) * 100;
    return {
      stage: 'growing',
      stageProgress: Math.round(earningsProgress),
      overallProgress: 50 + Math.round(earningsProgress * 0.3),
      nextMilestone: `Earn £1,000 (£${Math.round(1000 - earnings)} to go)`
    };
  }
  
  // Mastery stage
  const masteryFactors = [
    completedProgrammes.length >= 2 ? 25 : (completedProgrammes.length / 2) * 25,
    Math.min(25, sales / 4), // 100 sales = 25%
    Math.min(25, earnings / 200), // £5,000 = 25%
    listings >= 10 ? 25 : (listings / 10) * 25
  ];
  
  const masteryProgress = masteryFactors.reduce((a, b) => a + b, 0);
  
  return {
    stage: 'mastery',
    stageProgress: Math.round(masteryProgress),
    overallProgress: 80 + Math.round(masteryProgress * 0.2),
    nextMilestone: masteryProgress >= 100 
      ? 'You\'ve reached mastery! Consider mentoring others.'
      : 'Continue building your creative empire'
  };
}

// ============================================
// SKILL COMBINATION TRACKING
// ============================================

/**
 * Get newly available combinations after completing a programme
 */
export function getNewCombinations(
  previousProgrammes: ProgrammeId[],
  newProgramme: ProgrammeId
): { id: string; name: string; description: string; unlocks: string[] }[] {
  const allProgrammes = [...previousProgrammes, newProgramme];
  
  const previousCombinations = getAvailableCombinations(previousProgrammes);
  const newCombinations = getAvailableCombinations(allProgrammes);
  
  return newCombinations
    .filter(nc => !previousCombinations.some(pc => pc.id === nc.id))
    .map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      unlocks: c.unlocks
    }));
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  processWorkshopCompletion,
  processProgrammeGraduation,
  checkMarketplaceReadiness,
  getProgrammeProgressSummary,
  calculateJourneyProgress,
  getNewCombinations
};