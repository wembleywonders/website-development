/**
 * MARKETPLACE BLOCKCHAIN INTEGRATION
 * 
 * Connects the marketplace system to the blockchain layer:
 * - Record treasury contributions from sales
 * - Issue tokens for activity
 * - Track credentials for creators
 * - Enable BTC payouts
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type {
  TreasuryEntry,
  TokenTransaction,
  CreatorCredential,
  BitcoinPayout,
  CommunityToken,
  CreatorBitcoinProfile
} from '../types';
import { CommunityTokenService } from '../tokens/CommunityToken';
import { CreatorCredentialService } from '../tokens/CreatorCredential';
import { CommunityTreasuryService } from '../treasury/CommunityTreasury';
import { BitcoinBridgeService } from './bitcoinBridge';

// ============================================================
// SALE PROCESSING
// ============================================================

export interface MarketplaceSale {
  id: string;
  creatorId: string;
  buyerId: string;
  productId?: string;
  serviceId?: string;
  title: string;
  type: 'product' | 'service' | 'package';
  totalAmount: number;
  timestamp: string;
}

export interface SaleProcessingResult {
  treasury: TreasuryEntry;
  creatorTokens: TokenTransaction;
  buyerTokens: TokenTransaction;
  btcPayout?: BitcoinPayout;
  creatorPayout: {
    gbp: number;
    btc: number;
    btcAmount: number;
  };
}

/**
 * Process a marketplace sale through the blockchain layer
 */
export function processMarketplaceSale(
  sale: MarketplaceSale,
  creatorWallet: CommunityToken,
  buyerWallet: CommunityToken | null,
  creatorBtcProfile?: CreatorBitcoinProfile,
  currentBtcPrice?: number
): SaleProcessingResult {
  // 1. Record treasury contribution (25% for products, 20% for services)
  const treasuryEntry = CommunityTreasuryService.recordContribution(
    sale.id,
    `tx-${sale.id}`,
    sale.totalAmount,
    sale.type,
    sale.creatorId,
    sale.title,
    sale.buyerId
  );
  
  // 2. Issue tokens to creator (bonus tokens for sale)
  const creatorTokenResult = CommunityTokenService.issueForSale(
    creatorWallet,
    sale.id,
    sale.totalAmount
  );
  
  // 3. Issue tokens to buyer (if they have a wallet)
  let buyerTokenResult: { wallet: CommunityToken; transaction: TokenTransaction } | null = null;
  if (buyerWallet) {
    const buyerTokens = Math.floor(sale.totalAmount * 0.02 * 100); // 2% of sale in tokens
    buyerTokenResult = CommunityTokenService.issue(buyerWallet, buyerTokens, {
      type: 'community-contribution',
      timestamp: new Date().toISOString(),
      reference: `Purchase: ${sale.title}`,
      verified: true
    });
  }
  
  // 4. Calculate creator payout (55% for products, 60% for services)
  const splitPercentage = sale.type === 'service' ? 0.60 : 0.55;
  const creatorEarnings = sale.totalAmount * splitPercentage;
  
  // 5. Process BTC payout if configured
  let btcPayout: BitcoinPayout | undefined;
  let creatorPayout = { gbp: creatorEarnings, btc: 0, btcAmount: 0 };
  
  if (creatorBtcProfile && currentBtcPrice && creatorBtcProfile.preferredPayout !== 'gbp') {
    const payoutCalc = BitcoinBridgeService.calculatePayout(
      creatorBtcProfile,
      creatorEarnings,
      currentBtcPrice
    );
    
    creatorPayout = {
      gbp: payoutCalc.gbpPayout,
      btc: payoutCalc.btcPayout,
      btcAmount: payoutCalc.btcAmount
    };
    
    if (payoutCalc.btcPayout > 0) {
      btcPayout = BitcoinBridgeService.createPayout(
        sale.creatorId,
        sale.id,
        payoutCalc.btcPayout,
        payoutCalc.btcAmount,
        currentBtcPrice,
        creatorBtcProfile.custodian || 'gemini'
      );
    }
  }
  
  return {
    treasury: treasuryEntry,
    creatorTokens: creatorTokenResult.transaction,
    buyerTokens: buyerTokenResult?.transaction || {
      id: 'no-buyer-wallet',
      type: 'contribution',
      from: 'system',
      to: 'system',
      amount: 0,
      timestamp: new Date().toISOString(),
      reference: 'No buyer wallet',
      metadata: {}
    },
    btcPayout,
    creatorPayout
  };
}

// ============================================================
// PROGRAMME COMPLETION
// ============================================================

export interface ProgrammeCompletionResult {
  credential: CreatorCredential;
  tokens: TokenTransaction;
  updatedWallet: CommunityToken;
}

/**
 * Process programme completion through blockchain layer
 */
export function processProgrammeCompletion(
  creatorId: string,
  programmeId: string,
  programmeName: string,
  workshopsCompleted: number,
  creatorWallet: CommunityToken
): ProgrammeCompletionResult | { error: string } {
  // 1. Issue credential
  const credentialResult = CreatorCredentialService.issueProgramme(
    creatorId,
    programmeId,
    new Date().toISOString(),
    workshopsCompleted
  );
  
  if ('error' in credentialResult) {
    return credentialResult;
  }
  
  // 2. Issue tokens
  const tokenResult = CommunityTokenService.issueForProgramme(
    creatorWallet,
    programmeId,
    programmeName
  );
  
  return {
    credential: credentialResult,
    tokens: tokenResult.transaction,
    updatedWallet: tokenResult.wallet
  };
}

// ============================================================
// BADGE ISSUANCE
// ============================================================

/**
 * Issue badge when creator hits milestone
 */
export function processBadgeAward(
  creatorId: string,
  badgeId: string,
  evidence?: string[]
): CreatorCredential | { error: string } {
  return CreatorCredentialService.issueBadge(creatorId, badgeId, evidence);
}

/**
 * Check and award sales milestones
 */
export function checkSalesMilestones(
  creatorId: string,
  totalSales: number,
  existingCredentials: CreatorCredential[]
): CreatorCredential[] {
  const newCredentials: CreatorCredential[] = [];
  
  // First sale
  if (totalSales >= 1 && !hasCredential(creatorId, 'first-sale', existingCredentials)) {
    const cred = processBadgeAward(creatorId, 'first-sale');
    if (!('error' in cred)) newCredentials.push(cred);
  }
  
  // Rising star (10 sales)
  if (totalSales >= 10 && !hasCredential(creatorId, 'rising-star', existingCredentials)) {
    const cred = processBadgeAward(creatorId, 'rising-star');
    if (!('error' in cred)) newCredentials.push(cred);
  }
  
  // Top seller (50 sales)
  if (totalSales >= 50 && !hasCredential(creatorId, 'top-seller', existingCredentials)) {
    const cred = processBadgeAward(creatorId, 'top-seller');
    if (!('error' in cred)) newCredentials.push(cred);
  }
  
  return newCredentials;
}

function hasCredential(
  creatorId: string, 
  badgeId: string, 
  credentials: CreatorCredential[]
): boolean {
  return credentials.some(c => 
    c.creatorId === creatorId && 
    c.metadata.attributes.some(a => a.value === badgeId)
  );
}

// ============================================================
// IMPACT TRACKING
// ============================================================

export interface BuyerImpactSummary {
  totalContributed: number;
  workshopHoursFunded: number;
  participantsSupported: number;
  contributionRank: 'supporter' | 'advocate' | 'champion' | 'patron';
}

/**
 * Calculate buyer's community impact
 */
export function calculateBuyerImpact(
  buyerId: string,
  treasuryEntries: TreasuryEntry[]
): BuyerImpactSummary {
  const buyerEntries = treasuryEntries.filter(e => e.buyerId === buyerId);
  const totalContributed = buyerEntries.reduce((sum, e) => sum + e.amount, 0);
  
  // Estimate impact (£15 per workshop hour, 10 participants per workshop)
  const workshopHoursFunded = totalContributed / 15;
  const participantsSupported = Math.floor(workshopHoursFunded * 10 / 2); // 2-hour workshops
  
  // Determine rank
  let contributionRank: BuyerImpactSummary['contributionRank'] = 'supporter';
  if (totalContributed >= 500) contributionRank = 'patron';
  else if (totalContributed >= 200) contributionRank = 'champion';
  else if (totalContributed >= 50) contributionRank = 'advocate';
  
  return {
    totalContributed,
    workshopHoursFunded,
    participantsSupported,
    contributionRank
  };
}

// ============================================================
// CHECKOUT INTEGRATION
// ============================================================

export interface CheckoutBlockchainData {
  treasuryContribution: number;
  tokenReward: number;
  impactEstimate: string;
  btcPayoutAvailable: boolean;
}

/**
 * Calculate blockchain-related data for checkout display
 */
export function getCheckoutBlockchainData(
  items: Array<{ type: 'product' | 'service' | 'package'; totalPrice: number }>,
  buyerHasWallet: boolean
): CheckoutBlockchainData {
  // Calculate total treasury contribution
  const treasuryContribution = items.reduce((sum, item) => {
    const rate = item.type === 'service' ? 0.20 : 0.25;
    return sum + (item.totalPrice * rate);
  }, 0);
  
  // Calculate token reward for buyer
  const totalSpend = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tokenReward = buyerHasWallet ? Math.floor(totalSpend * 0.02 * 100) : 0;
  
  // Generate impact estimate
  const workshopMinutes = Math.round(treasuryContribution / 15 * 60);
  const impactEstimate = workshopMinutes >= 60
    ? `${Math.floor(workshopMinutes / 60)} hour${workshopMinutes >= 120 ? 's' : ''} of free workshops`
    : `${workshopMinutes} minutes of free workshops`;
  
  return {
    treasuryContribution,
    tokenReward,
    impactEstimate,
    btcPayoutAvailable: true // Creators can opt for BTC
  };
}

// ============================================================
// CREATOR DASHBOARD INTEGRATION
// ============================================================

export interface CreatorBlockchainSummary {
  tokenBalance: number;
  credentialCount: number;
  treasuryContribution: number; // How much their sales generated for community
  btcEarnings: number;
  educationProgress: number;
  nextMilestone?: {
    name: string;
    current: number;
    target: number;
  };
}

/**
 * Get blockchain summary for creator dashboard
 */
export function getCreatorBlockchainSummary(
  creatorId: string,
  wallet: CommunityToken,
  credentials: CreatorCredential[],
  treasuryEntries: TreasuryEntry[],
  btcProfile?: CreatorBitcoinProfile
): CreatorBlockchainSummary {
  const creatorCreds = credentials.filter(c => c.creatorId === creatorId);
  const creatorTreasury = CommunityTreasuryService.getCreatorContribution(
    creatorId,
    treasuryEntries
  );
  
  // Calculate next milestone
  const salesCount = creatorTreasury.salesCount;
  let nextMilestone: CreatorBlockchainSummary['nextMilestone'];
  
  if (salesCount < 1) {
    nextMilestone = { name: 'First Sale', current: salesCount, target: 1 };
  } else if (salesCount < 10) {
    nextMilestone = { name: 'Rising Star', current: salesCount, target: 10 };
  } else if (salesCount < 50) {
    nextMilestone = { name: 'Top Seller', current: salesCount, target: 50 };
  }
  
  return {
    tokenBalance: wallet.balance,
    credentialCount: creatorCreds.length,
    treasuryContribution: creatorTreasury.totalGenerated,
    btcEarnings: btcProfile?.totalBtcEarned || 0,
    educationProgress: btcProfile 
      ? BitcoinBridgeService.getProgress(btcProfile).percentComplete 
      : 0,
    nextMilestone
  };
}

// ============================================================
// CYBERSTORE SYNC
// ============================================================

export interface CyberstoreSyncData {
  productId: string;
  blockchainEnabled: boolean;
  tokenRewardsRate: number;
  revenueSplitDisplay: {
    creator: string;
    community: string;
    operations: string;
  };
  impactStatement: string;
}

/**
 * Generate Cyberstore product data with blockchain features
 */
export function generateCyberstoreSync(
  productId: string,
  productType: 'product' | 'service' | 'package',
  price: number
): CyberstoreSyncData {
  const splits = {
    product: { creator: 55, community: 25, operations: 20 },
    service: { creator: 60, community: 20, operations: 20 },
    package: { creator: 58, community: 22, operations: 20 }
  };
  
  const split = splits[productType];
  const communityAmount = price * (split.community / 100);
  const workshopMinutes = Math.round(communityAmount / 15 * 60);
  
  return {
    productId,
    blockchainEnabled: true,
    tokenRewardsRate: 2, // 2% of purchase in tokens
    revenueSplitDisplay: {
      creator: `${split.creator}%`,
      community: `${split.community}%`,
      operations: `${split.operations}%`
    },
    impactStatement: workshopMinutes >= 60
      ? `This purchase funds ${Math.floor(workshopMinutes / 60)}+ hours of free youth workshops`
      : `This purchase funds ${workshopMinutes} minutes of free youth workshops`
  };
}

// ============================================================
// EXPORT
// ============================================================

export const MarketplaceBlockchainService = {
  // Sale processing
  processSale: processMarketplaceSale,
  // Programme completion
  processProgrammeCompletion,
  // Badges
  awardBadge: processBadgeAward,
  checkMilestones: checkSalesMilestones,
  // Impact
  calculateBuyerImpact,
  // Checkout
  getCheckoutData: getCheckoutBlockchainData,
  // Dashboard
  getCreatorSummary: getCreatorBlockchainSummary,
  // Cyberstore
  generateCyberstoreSync
};

export default MarketplaceBlockchainService;