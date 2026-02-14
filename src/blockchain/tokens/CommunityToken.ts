/**
 * COMMUNITY TOKEN SYSTEM
 * 
 * The WWT (Wembley Wonders Token) is NOT a speculative asset.
 * It is proof-of-contribution that:
 * - Cannot be bought on exchanges
 * - Is earned through verified activities
 * - Can be redeemed for real value within the ecosystem
 * - Tracks community participation transparently
 * 
 * Philosophy: Local value circulation, not extraction.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type {
  CommunityToken,
  TokenSource,
  TokenTransaction,
  TransactionType
} from '../types';
import { TOKEN_CONFIG } from '../types';

// ============================================================
// TOKEN CREATION & MANAGEMENT
// ============================================================

/**
 * Create a new token wallet for a community member
 */
export function createTokenWallet(holderId: string): CommunityToken {
  return {
    id: generateTokenId(),
    holderId,
    balance: 0,
    earnedTotal: 0,
    spentTotal: 0,
    lastActivity: new Date().toISOString(),
    sources: []
  };
}

/**
 * Calculate tokens earned for an activity
 */
export function calculateTokenEarnings(
  activityType: TokenSource['type'],
  metadata?: { saleAmount?: number; hours?: number }
): number {
  const rates = TOKEN_CONFIG.EARN_RATES;
  
  switch (activityType) {
    case 'programme-completion':
      return rates.PROGRAMME_COMPLETION;
    
    case 'sale-earnings':
      // 5% of sale value in tokens
      return metadata?.saleAmount 
        ? Math.floor(metadata.saleAmount * rates.SALE_BONUS * 100) 
        : 0;
    
    case 'volunteer-hours':
      return (metadata?.hours || 0) * rates.VOLUNTEER_HOUR;
    
    case 'community-contribution':
      return rates.COMMUNITY_CONTRIBUTION;
    
    case 'referral':
      return rates.REFERRAL;
    
    default:
      return 0;
  }
}

/**
 * Issue tokens to a holder
 */
export function issueTokens(
  wallet: CommunityToken,
  amount: number,
  source: Omit<TokenSource, 'amount'>
): { wallet: CommunityToken; transaction: TokenTransaction } {
  const timestamp = new Date().toISOString();
  
  const updatedWallet: CommunityToken = {
    ...wallet,
    balance: wallet.balance + amount,
    earnedTotal: wallet.earnedTotal + amount,
    lastActivity: timestamp,
    sources: [
      ...wallet.sources,
      { ...source, amount, timestamp, verified: true }
    ]
  };
  
  const transaction: TokenTransaction = {
    id: generateTransactionId(),
    type: 'contribution',
    from: 'wembley-wonders-treasury',
    to: wallet.holderId,
    amount,
    timestamp,
    reference: source.reference,
    metadata: {
      description: `Token issuance: ${source.type}`
    }
  };
  
  return { wallet: updatedWallet, transaction };
}

/**
 * Redeem tokens for value
 */
export function redeemTokens(
  wallet: CommunityToken,
  amount: number,
  redemptionType: 'workshop' | 'equipment' | 'service' | 'priority',
  reference: string
): { 
  wallet: CommunityToken; 
  transaction: TokenTransaction;
  gbpValue: number;
} | { error: string } {
  
  if (wallet.balance < amount) {
    return { error: `Insufficient balance. Have ${wallet.balance}, need ${amount}` };
  }
  
  const rates = TOKEN_CONFIG.REDEMPTION_RATES;
  let tokensPerPound: number;
  
  switch (redemptionType) {
    case 'workshop':
      tokensPerPound = rates.WORKSHOP_DISCOUNT;
      break;
    case 'equipment':
      tokensPerPound = rates.EQUIPMENT_RENTAL;
      break;
    case 'service':
      tokensPerPound = rates.SERVICE_DISCOUNT;
      break;
    case 'priority':
      // Priority booking is flat rate
      return redeemPriorityAccess(wallet, reference);
    default:
      return { error: 'Invalid redemption type' };
  }
  
  const gbpValue = amount / tokensPerPound;
  const timestamp = new Date().toISOString();
  
  const updatedWallet: CommunityToken = {
    ...wallet,
    balance: wallet.balance - amount,
    spentTotal: wallet.spentTotal + amount,
    lastActivity: timestamp
  };
  
  const transaction: TokenTransaction = {
    id: generateTransactionId(),
    type: 'redemption',
    from: wallet.holderId,
    to: 'wembley-wonders-treasury',
    amount,
    timestamp,
    reference,
    metadata: {
      description: `Redeemed ${amount} WWT for £${gbpValue.toFixed(2)} ${redemptionType} discount`
    }
  };
  
  return { wallet: updatedWallet, transaction, gbpValue };
}

function redeemPriorityAccess(
  wallet: CommunityToken,
  reference: string
): { 
  wallet: CommunityToken; 
  transaction: TokenTransaction;
  gbpValue: number;
} | { error: string } {
  const cost = TOKEN_CONFIG.REDEMPTION_RATES.PRIORITY_BOOKING;
  
  if (wallet.balance < cost) {
    return { error: `Need ${cost} WWT for priority access, have ${wallet.balance}` };
  }
  
  const timestamp = new Date().toISOString();
  
  const updatedWallet: CommunityToken = {
    ...wallet,
    balance: wallet.balance - cost,
    spentTotal: wallet.spentTotal + cost,
    lastActivity: timestamp
  };
  
  const transaction: TokenTransaction = {
    id: generateTransactionId(),
    type: 'redemption',
    from: wallet.holderId,
    to: 'wembley-wonders-treasury',
    amount: cost,
    timestamp,
    reference,
    metadata: {
      description: 'Priority booking access'
    }
  };
  
  return { wallet: updatedWallet, transaction, gbpValue: 0 };
}

/**
 * Transfer tokens between community members
 * (Limited - tokens are primarily earned, not traded)
 */
export function transferTokens(
  fromWallet: CommunityToken,
  toWallet: CommunityToken,
  amount: number,
  reason: string
): {
  fromWallet: CommunityToken;
  toWallet: CommunityToken;
  transaction: TokenTransaction;
} | { error: string } {
  
  // Transfers are limited to prevent speculation
  const maxTransfer = fromWallet.earnedTotal * 0.1; // Max 10% of earned tokens
  
  if (amount > maxTransfer) {
    return { 
      error: `Transfer limit exceeded. Max transfer: ${maxTransfer} WWT (10% of earned total)` 
    };
  }
  
  if (fromWallet.balance < amount) {
    return { error: `Insufficient balance. Have ${fromWallet.balance}, need ${amount}` };
  }
  
  const timestamp = new Date().toISOString();
  
  const updatedFromWallet: CommunityToken = {
    ...fromWallet,
    balance: fromWallet.balance - amount,
    lastActivity: timestamp
  };
  
  const updatedToWallet: CommunityToken = {
    ...toWallet,
    balance: toWallet.balance + amount,
    lastActivity: timestamp,
    sources: [
      ...toWallet.sources,
      {
        type: 'community-contribution',
        amount,
        timestamp,
        reference: `Transfer from ${fromWallet.holderId}: ${reason}`,
        verified: true
      }
    ]
  };
  
  const transaction: TokenTransaction = {
    id: generateTransactionId(),
    type: 'transfer',
    from: fromWallet.holderId,
    to: toWallet.holderId,
    amount,
    timestamp,
    reference: reason,
    metadata: {
      description: `Community transfer: ${reason}`
    }
  };
  
  return { 
    fromWallet: updatedFromWallet, 
    toWallet: updatedToWallet, 
    transaction 
  };
}

// ============================================================
// TOKEN ANALYTICS
// ============================================================

export interface TokenAnalytics {
  totalSupply: number;
  totalHolders: number;
  totalEarned: number;
  totalRedeemed: number;
  circulationRate: number;
  averageBalance: number;
  topEarners: { holderId: string; earned: number }[];
  earningsBySource: Record<TokenSource['type'], number>;
  redemptionsByType: Record<string, number>;
}

export function calculateTokenAnalytics(
  wallets: CommunityToken[],
  transactions: TokenTransaction[]
): TokenAnalytics {
  const totalSupply = wallets.reduce((sum, w) => sum + w.balance, 0);
  const totalEarned = wallets.reduce((sum, w) => sum + w.earnedTotal, 0);
  const totalRedeemed = wallets.reduce((sum, w) => sum + w.spentTotal, 0);
  
  const earningsBySource: Record<string, number> = {
    'programme-completion': 0,
    'sale-earnings': 0,
    'volunteer-hours': 0,
    'community-contribution': 0,
    'referral': 0
  };
  
  wallets.forEach(w => {
    w.sources.forEach(s => {
      if (earningsBySource[s.type] !== undefined) {
        earningsBySource[s.type] += s.amount;
      }
    });
  });
  
  const redemptions = transactions.filter(t => t.type === 'redemption');
  const redemptionsByType: Record<string, number> = {};
  redemptions.forEach(r => {
    const type = r.metadata?.description?.includes('workshop') ? 'workshop' :
                 r.metadata?.description?.includes('equipment') ? 'equipment' :
                 r.metadata?.description?.includes('service') ? 'service' : 'other';
    redemptionsByType[type] = (redemptionsByType[type] || 0) + r.amount;
  });
  
  const topEarners = wallets
    .map(w => ({ holderId: w.holderId, earned: w.earnedTotal }))
    .sort((a, b) => b.earned - a.earned)
    .slice(0, 10);
  
  return {
    totalSupply,
    totalHolders: wallets.length,
    totalEarned,
    totalRedeemed,
    circulationRate: totalEarned > 0 ? totalRedeemed / totalEarned : 0,
    averageBalance: wallets.length > 0 ? totalSupply / wallets.length : 0,
    topEarners,
    earningsBySource: earningsBySource as Record<TokenSource['type'], number>,
    redemptionsByType
  };
}

// ============================================================
// ACTIVITY-BASED TOKEN ISSUANCE
// ============================================================

/**
 * Issue tokens for programme completion
 */
export function issueForProgrammeCompletion(
  wallet: CommunityToken,
  programmeId: string,
  programmeName: string
): { wallet: CommunityToken; transaction: TokenTransaction } {
  const amount = TOKEN_CONFIG.EARN_RATES.PROGRAMME_COMPLETION;
  
  return issueTokens(wallet, amount, {
    type: 'programme-completion',
    timestamp: new Date().toISOString(),
    reference: `Programme completion: ${programmeName} (${programmeId})`,
    verified: true
  });
}

/**
 * Issue tokens for marketplace sale
 */
export function issueForSale(
  wallet: CommunityToken,
  saleId: string,
  saleAmount: number
): { wallet: CommunityToken; transaction: TokenTransaction } {
  const amount = calculateTokenEarnings('sale-earnings', { saleAmount });
  
  return issueTokens(wallet, amount, {
    type: 'sale-earnings',
    timestamp: new Date().toISOString(),
    reference: `Sale bonus: ${saleId} (£${saleAmount.toFixed(2)})`,
    verified: true
  });
}

/**
 * Issue tokens for volunteer hours
 */
export function issueForVolunteering(
  wallet: CommunityToken,
  hours: number,
  activity: string
): { wallet: CommunityToken; transaction: TokenTransaction } {
  const amount = calculateTokenEarnings('volunteer-hours', { hours });
  
  return issueTokens(wallet, amount, {
    type: 'volunteer-hours',
    timestamp: new Date().toISOString(),
    reference: `Volunteer hours: ${hours}h - ${activity}`,
    verified: true
  });
}

/**
 * Issue tokens for referral
 */
export function issueForReferral(
  wallet: CommunityToken,
  referredUserId: string
): { wallet: CommunityToken; transaction: TokenTransaction } {
  const amount = TOKEN_CONFIG.EARN_RATES.REFERRAL;
  
  return issueTokens(wallet, amount, {
    type: 'referral',
    timestamp: new Date().toISOString(),
    reference: `Referral: ${referredUserId}`,
    verified: true
  });
}

// ============================================================
// HELPERS
// ============================================================

function generateTokenId(): string {
  return `ww-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateTransactionId(): string {
  return `ww-tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format token balance for display
 */
export function formatTokenBalance(balance: number): string {
  return `${balance.toLocaleString()} WWT`;
}

/**
 * Calculate redemption value
 */
export function calculateRedemptionValue(
  tokens: number,
  type: 'workshop' | 'equipment' | 'service'
): number {
  const rates = TOKEN_CONFIG.REDEMPTION_RATES;
  const rate = type === 'workshop' ? rates.WORKSHOP_DISCOUNT :
               type === 'equipment' ? rates.EQUIPMENT_RENTAL :
               rates.SERVICE_DISCOUNT;
  return tokens / rate;
}

// ============================================================
// EXPORT
// ============================================================

export const CommunityTokenService = {
  createWallet: createTokenWallet,
  calculateEarnings: calculateTokenEarnings,
  issue: issueTokens,
  redeem: redeemTokens,
  transfer: transferTokens,
  analytics: calculateTokenAnalytics,
  // Activity-specific issuance
  issueForProgramme: issueForProgrammeCompletion,
  issueForSale,
  issueForVolunteering,
  issueForReferral,
  // Helpers
  formatBalance: formatTokenBalance,
  calculateRedemptionValue
};

export default CommunityTokenService;