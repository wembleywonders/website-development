/**
 * BITCOIN BRIDGE
 * 
 * The pathway from earning in GBP to holding in BTC.
 * 
 * Simon's framework:
 * - Gemini = training wheels (custodial)
 * - Self-custody = sovereignty
 * - Never borrow against your Bitcoin
 * - Never use derivatives
 * 
 * This module provides:
 * - Creator payout options (GBP/BTC/split)
 * - Education pathway
 * - Self-custody graduation
 * - Community Fund BTC reserve
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type {
  CreatorBitcoinProfile,
  BitcoinPayout,
  BitcoinJourneyStage
} from '../types';

// ============================================================
// BITCOIN JOURNEY STAGES
// ============================================================

export const BITCOIN_JOURNEY = {
  stages: {
    unaware: {
      name: 'Unaware',
      description: 'Hasn\'t learned about Bitcoin yet',
      nextStep: 'Complete Bitcoin Basics module',
      modules: []
    },
    curious: {
      name: 'Curious',
      description: 'Learning about Bitcoin and monetary sovereignty',
      nextStep: 'Make first purchase on Gemini',
      modules: ['btc-basics', 'btc-why-matters']
    },
    'first-purchase': {
      name: 'First Purchase',
      description: 'Bought first sats through Gemini (custodial)',
      nextStep: 'Learn about self-custody',
      modules: ['btc-basics', 'btc-why-matters', 'btc-buying']
    },
    'self-custody': {
      name: 'Self-Custody',
      description: 'Moved Bitcoin to hardware wallet',
      nextStep: 'Consider running your own node',
      modules: ['btc-basics', 'btc-why-matters', 'btc-buying', 'btc-self-custody']
    },
    sovereign: {
      name: 'Sovereign',
      description: 'Runs own node, full monetary sovereignty',
      nextStep: 'You\'re sovereign! Help others on the journey',
      modules: ['btc-basics', 'btc-why-matters', 'btc-buying', 'btc-self-custody', 'btc-nodes']
    }
  },
  
  modules: {
    'btc-basics': {
      name: 'Bitcoin Basics',
      description: 'What is Bitcoin and why does it matter?',
      duration: 30, // minutes
      topics: [
        'What is money?',
        'The problem with fiat currency',
        'How Bitcoin solves this',
        'Scarcity and the 21 million cap'
      ]
    },
    'btc-why-matters': {
      name: 'Why Bitcoin Matters',
      description: 'Understanding monetary sovereignty',
      duration: 45,
      topics: [
        'The debt-based monetary system',
        'How inflation steals your wealth',
        'Self-custody vs trusting institutions',
        'Bitcoin as a boycott'
      ]
    },
    'btc-buying': {
      name: 'Buying Your First Bitcoin',
      description: 'How to purchase Bitcoin safely',
      duration: 30,
      topics: [
        'Choosing an exchange (Gemini)',
        'Setting up your account',
        'Making your first purchase',
        'Understanding fees'
      ]
    },
    'btc-self-custody': {
      name: 'Self-Custody',
      description: 'Taking control of your Bitcoin',
      duration: 60,
      topics: [
        'Why self-custody matters',
        'Hardware wallets explained',
        'Setting up a hardware wallet',
        'Backup and security'
      ]
    },
    'btc-nodes': {
      name: 'Running Your Node',
      description: 'Full monetary sovereignty',
      duration: 90,
      topics: [
        'Why run a node?',
        'Node options (Raspberry Pi, etc)',
        'Setting up your node',
        'Connecting your wallet'
      ]
    }
  }
} as const;

// ============================================================
// CREATOR BITCOIN PROFILE
// ============================================================

/**
 * Create a new Bitcoin profile for a creator
 */
export function createBitcoinProfile(creatorId: string): CreatorBitcoinProfile {
  return {
    creatorId,
    journeyStage: 'unaware',
    preferredPayout: 'gbp',
    totalBtcEarned: 0,
    educationCompleted: []
  };
}

/**
 * Update creator's payout preference
 */
export function updatePayoutPreference(
  profile: CreatorBitcoinProfile,
  preference: 'gbp' | 'btc' | 'split',
  btcPercentage?: number,
  custodian?: 'gemini' | 'self-custody',
  publicAddress?: string
): CreatorBitcoinProfile | { error: string } {
  
  // Validate requirements for BTC payout
  if (preference === 'btc' || preference === 'split') {
    if (profile.journeyStage === 'unaware' || profile.journeyStage === 'curious') {
      return { 
        error: 'Complete Bitcoin education modules before receiving BTC payouts' 
      };
    }
    
    if (custodian === 'self-custody' && !publicAddress) {
      return { error: 'Public address required for self-custody' };
    }
  }
  
  return {
    ...profile,
    preferredPayout: preference,
    btcPayoutPercentage: preference === 'split' ? btcPercentage : undefined,
    custodian,
    publicAddress
  };
}

/**
 * Record education module completion
 */
export function completeEducationModule(
  profile: CreatorBitcoinProfile,
  moduleId: string
): CreatorBitcoinProfile {
  if (profile.educationCompleted.includes(moduleId)) {
    return profile;
  }
  
  const updatedModules = [...profile.educationCompleted, moduleId];
  const newStage = calculateJourneyStage(updatedModules);
  
  return {
    ...profile,
    educationCompleted: updatedModules,
    journeyStage: newStage
  };
}

/**
 * Calculate journey stage based on completed modules
 */
function calculateJourneyStage(completedModules: string[]): BitcoinJourneyStage {
  const stages = BITCOIN_JOURNEY.stages;
  
  if (completedModules.includes('btc-nodes')) {
    return 'sovereign';
  }
  if (completedModules.includes('btc-self-custody')) {
    return 'self-custody';
  }
  if (completedModules.includes('btc-buying')) {
    return 'first-purchase';
  }
  if (completedModules.length > 0) {
    return 'curious';
  }
  return 'unaware';
}

// ============================================================
// BITCOIN PAYOUTS
// ============================================================

/**
 * Calculate payout in BTC based on preference
 */
export function calculatePayout(
  profile: CreatorBitcoinProfile,
  gbpAmount: number,
  currentBtcPrice: number
): {
  gbpPayout: number;
  btcPayout: number;
  btcAmount: number; // In BTC
} {
  if (profile.preferredPayout === 'gbp') {
    return { gbpPayout: gbpAmount, btcPayout: 0, btcAmount: 0 };
  }
  
  if (profile.preferredPayout === 'btc') {
    const btcAmount = gbpAmount / currentBtcPrice;
    return { gbpPayout: 0, btcPayout: gbpAmount, btcAmount };
  }
  
  // Split
  const btcPercentage = profile.btcPayoutPercentage || 50;
  const btcPortion = gbpAmount * (btcPercentage / 100);
  const gbpPortion = gbpAmount - btcPortion;
  const btcAmount = btcPortion / currentBtcPrice;
  
  return { gbpPayout: gbpPortion, btcPayout: btcPortion, btcAmount };
}

/**
 * Create a payout record
 */
export function createPayout(
  creatorId: string,
  saleId: string,
  gbpAmount: number,
  btcAmount: number,
  btcPrice: number,
  destination: 'gemini' | 'self-custody'
): BitcoinPayout {
  return {
    id: generatePayoutId(),
    creatorId,
    saleId,
    gbpAmount,
    btcAmount,
    btcPrice,
    timestamp: new Date().toISOString(),
    destination,
    status: 'pending'
  };
}

/**
 * Process payout (would integrate with actual payment processor)
 */
export async function processPayout(
  payout: BitcoinPayout,
  profile: CreatorBitcoinProfile
): Promise<BitcoinPayout> {
  // In production, this would:
  // 1. If Gemini: Use Gemini API to credit account
  // 2. If self-custody: Send to profile.publicAddress
  
  // Simulate processing
  return {
    ...payout,
    status: 'complete',
    txHash: payout.destination === 'self-custody' 
      ? `btc-tx-${Date.now()}-simulated`
      : undefined
  };
}

// ============================================================
// COMMUNITY FUND BTC RESERVE
// ============================================================

export interface BtcReserve {
  totalBtc: number;
  totalGbpValue: number;
  lastPrice: number;
  lastUpdated: string;
  purchases: BtcReservePurchase[];
}

export interface BtcReservePurchase {
  id: string;
  gbpAmount: number;
  btcAmount: number;
  price: number;
  timestamp: string;
  txHash?: string;
}

/**
 * Initialize BTC reserve tracking
 */
export function initializeBtcReserve(): BtcReserve {
  return {
    totalBtc: 0,
    totalGbpValue: 0,
    lastPrice: 0,
    lastUpdated: new Date().toISOString(),
    purchases: []
  };
}

/**
 * Record a BTC purchase for the reserve
 */
export function recordReservePurchase(
  reserve: BtcReserve,
  gbpAmount: number,
  btcPrice: number,
  txHash?: string
): BtcReserve {
  const btcAmount = gbpAmount / btcPrice;
  
  const purchase: BtcReservePurchase = {
    id: generatePurchaseId(),
    gbpAmount,
    btcAmount,
    price: btcPrice,
    timestamp: new Date().toISOString(),
    txHash
  };
  
  return {
    totalBtc: reserve.totalBtc + btcAmount,
    totalGbpValue: (reserve.totalBtc + btcAmount) * btcPrice,
    lastPrice: btcPrice,
    lastUpdated: new Date().toISOString(),
    purchases: [...reserve.purchases, purchase]
  };
}

/**
 * Update reserve value based on current price
 */
export function updateReserveValue(
  reserve: BtcReserve,
  currentPrice: number
): BtcReserve {
  return {
    ...reserve,
    totalGbpValue: reserve.totalBtc * currentPrice,
    lastPrice: currentPrice,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Calculate average purchase price
 */
export function calculateAveragePurchasePrice(reserve: BtcReserve): number {
  if (reserve.purchases.length === 0) return 0;
  
  const totalGbpSpent = reserve.purchases.reduce((sum, p) => sum + p.gbpAmount, 0);
  return totalGbpSpent / reserve.totalBtc;
}

/**
 * Calculate unrealized gains/losses
 */
export function calculateUnrealizedPnL(
  reserve: BtcReserve,
  currentPrice: number
): {
  pnl: number;
  percentage: number;
  isProfit: boolean;
} {
  const avgPrice = calculateAveragePurchasePrice(reserve);
  const currentValue = reserve.totalBtc * currentPrice;
  const costBasis = reserve.totalBtc * avgPrice;
  const pnl = currentValue - costBasis;
  
  return {
    pnl,
    percentage: costBasis > 0 ? (pnl / costBasis) * 100 : 0,
    isProfit: pnl >= 0
  };
}

// ============================================================
// EDUCATION TRACKING
// ============================================================

export interface EducationProgress {
  stage: BitcoinJourneyStage;
  completedModules: string[];
  currentModule?: string;
  nextModule?: string;
  percentComplete: number;
}

/**
 * Get creator's education progress
 */
export function getEducationProgress(profile: CreatorBitcoinProfile): EducationProgress {
  const totalModules = Object.keys(BITCOIN_JOURNEY.modules).length;
  const completedCount = profile.educationCompleted.length;
  
  const moduleOrder = ['btc-basics', 'btc-why-matters', 'btc-buying', 'btc-self-custody', 'btc-nodes'];
  const currentModule = moduleOrder.find(m => !profile.educationCompleted.includes(m));
  const currentIndex = currentModule ? moduleOrder.indexOf(currentModule) : -1;
  const nextModule = currentIndex < moduleOrder.length - 1 ? moduleOrder[currentIndex + 1] : undefined;
  
  return {
    stage: profile.journeyStage,
    completedModules: profile.educationCompleted,
    currentModule,
    nextModule,
    percentComplete: (completedCount / totalModules) * 100
  };
}

/**
 * Get module details
 */
export function getModuleDetails(moduleId: string): typeof BITCOIN_JOURNEY.modules[keyof typeof BITCOIN_JOURNEY.modules] | null {
  return BITCOIN_JOURNEY.modules[moduleId as keyof typeof BITCOIN_JOURNEY.modules] || null;
}

// ============================================================
// HELPERS
// ============================================================

function generatePayoutId(): string {
  return `ww-btc-payout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generatePurchaseId(): string {
  return `ww-btc-reserve-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format BTC amount for display
 */
export function formatBtcAmount(btc: number): string {
  if (btc >= 1) {
    return `${btc.toFixed(8)} BTC`;
  }
  // Show in sats for smaller amounts
  const sats = Math.round(btc * 100000000);
  return `${sats.toLocaleString()} sats`;
}

/**
 * Format satoshis
 */
export function btcToSats(btc: number): number {
  return Math.round(btc * 100000000);
}

/**
 * Format sats to BTC
 */
export function satsToBtc(sats: number): number {
  return sats / 100000000;
}

// ============================================================
// EXPORT
// ============================================================

export const BitcoinBridgeService = {
  // Journey
  JOURNEY: BITCOIN_JOURNEY,
  // Profile
  createProfile: createBitcoinProfile,
  updatePreference: updatePayoutPreference,
  completeModule: completeEducationModule,
  // Payouts
  calculatePayout,
  createPayout,
  processPayout,
  // Reserve
  initializeReserve: initializeBtcReserve,
  recordPurchase: recordReservePurchase,
  updateValue: updateReserveValue,
  calculateAvgPrice: calculateAveragePurchasePrice,
  calculatePnL: calculateUnrealizedPnL,
  // Education
  getProgress: getEducationProgress,
  getModule: getModuleDetails,
  // Helpers
  formatBtc: formatBtcAmount,
  btcToSats,
  satsToBtc
};

export default BitcoinBridgeService;