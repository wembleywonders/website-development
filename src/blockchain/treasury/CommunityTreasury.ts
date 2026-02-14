/**
 * COMMUNITY TREASURY SYSTEM
 * 
 * Transparent, on-chain tracking of the Community Fund.
 * 
 * The 25% (products) / 20% (services) that goes to community
 * is tracked here with full transparency:
 * - Every contribution recorded
 * - Every allocation visible
 * - Impact metrics tied to spending
 * 
 * Philosophy: This is WW's sovereign wealth. Like Gulf states
 * reinvest oil revenue for their people, WW reinvests marketplace
 * revenue for Wembley's youth.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type {
  TreasuryEntry,
  TreasuryAllocation,
  TreasurySummary,
  AllocationTarget,
  ImpactMetrics,
  ImpactSummary,
  GovernanceProposal,
  GovernanceVote
} from '../types';
import { TREASURY_CONFIG } from '../types';

// ============================================================
// TREASURY CONTRIBUTIONS
// ============================================================

/**
 * Record a contribution to the Community Fund from a sale
 */
export function recordContribution(
  saleId: string,
  transactionId: string,
  totalSaleAmount: number,
  itemType: 'product' | 'service' | 'package',
  creatorId: string,
  productOrService: string,
  buyerId?: string
): TreasuryEntry {
  const split = TREASURY_CONFIG.REVENUE_SPLIT[itemType.toUpperCase() as keyof typeof TREASURY_CONFIG.REVENUE_SPLIT];
  const communityAmount = totalSaleAmount * split.community;
  
  return {
    id: generateEntryId(),
    transactionId,
    saleId,
    amount: communityAmount,
    currency: 'GBP',
    timestamp: new Date().toISOString(),
    buyerId,
    creatorId,
    productOrService,
    allocated: false
  };
}

/**
 * Record a direct donation to the Community Fund
 */
export function recordDonation(
  donorId: string,
  donorName: string,
  amount: number,
  currency: 'GBP' | 'BTC' = 'GBP',
  btcEquivalent?: number
): TreasuryEntry {
  return {
    id: generateEntryId(),
    transactionId: `donation-${Date.now()}`,
    saleId: 'direct-donation',
    amount,
    currency,
    btcEquivalent,
    timestamp: new Date().toISOString(),
    buyerId: donorId,
    creatorId: 'community',
    productOrService: `Donation from ${donorName}`,
    allocated: false
  };
}

/**
 * Record a grant received
 */
export function recordGrant(
  grantorName: string,
  grantId: string,
  amount: number,
  purpose?: string
): TreasuryEntry {
  return {
    id: generateEntryId(),
    transactionId: `grant-${grantId}`,
    saleId: 'grant',
    amount,
    currency: 'GBP',
    timestamp: new Date().toISOString(),
    creatorId: 'community',
    productOrService: `Grant from ${grantorName}${purpose ? `: ${purpose}` : ''}`,
    allocated: false
  };
}

// ============================================================
// TREASURY ALLOCATION
// ============================================================

/**
 * Create an allocation proposal
 */
export function createAllocation(
  entryIds: string[],
  totalAmount: number,
  target: AllocationTarget,
  description: string,
  approvedBy: string[]
): TreasuryAllocation {
  return {
    id: generateAllocationId(),
    treasuryEntryIds: entryIds,
    totalAmount,
    allocatedTo: target,
    timestamp: new Date().toISOString(),
    approvedBy,
    evidence: '',
    impactMetrics: undefined
  };
}

/**
 * Update allocation with evidence and impact
 */
export function recordAllocationImpact(
  allocation: TreasuryAllocation,
  evidence: string,
  impactMetrics: ImpactMetrics
): TreasuryAllocation {
  return {
    ...allocation,
    evidence,
    impactMetrics
  };
}

/**
 * Mark treasury entries as allocated
 */
export function markEntriesAllocated(
  entries: TreasuryEntry[],
  allocationId: string
): TreasuryEntry[] {
  return entries.map(entry => ({
    ...entry,
    allocated: true,
    allocation: { id: allocationId } as TreasuryAllocation
  }));
}

// ============================================================
// TREASURY SUMMARY & ANALYTICS
// ============================================================

/**
 * Calculate treasury summary
 */
export function calculateTreasurySummary(
  entries: TreasuryEntry[],
  allocations: TreasuryAllocation[]
): TreasurySummary {
  const totalCollected = entries.reduce((sum, e) => sum + e.amount, 0);
  const totalAllocated = allocations.reduce((sum, a) => sum + a.totalAmount, 0);
  const pendingAllocation = totalCollected - totalAllocated;
  
  // Calculate BTC vs GBP holdings
  const btcEntries = entries.filter(e => e.currency === 'BTC' && !e.allocated);
  const gbpEntries = entries.filter(e => e.currency === 'GBP' && !e.allocated);
  
  const btcHoldings = btcEntries.reduce((sum, e) => sum + (e.btcEquivalent || 0), 0);
  const gbpHoldings = gbpEntries.reduce((sum, e) => sum + e.amount, 0);
  
  // Allocation breakdown
  const allocationBreakdown = allocations.reduce((acc, a) => {
    acc[a.allocatedTo] = (acc[a.allocatedTo] || 0) + a.totalAmount;
    return acc;
  }, {} as Record<AllocationTarget, number>);
  
  // Impact summary
  const impactSummary = calculateImpactSummary(allocations);
  
  return {
    totalCollected,
    totalAllocated,
    pendingAllocation,
    btcHoldings,
    gbpHoldings,
    allocationBreakdown,
    impactSummary
  };
}

/**
 * Calculate impact summary from allocations
 */
export function calculateImpactSummary(
  allocations: TreasuryAllocation[]
): ImpactSummary {
  const workshopAllocations = allocations.filter(a => 
    a.allocatedTo === 'youth-workshops' && a.impactMetrics
  );
  
  const totalWorkshops = workshopAllocations.reduce(
    (sum, a) => sum + (a.impactMetrics?.workshopsDelivered || 0), 0
  );
  
  const totalParticipants = workshopAllocations.reduce(
    (sum, a) => sum + (a.impactMetrics?.participantsReached || 0), 0
  );
  
  const totalCreatorsLaunched = allocations.reduce(
    (sum, a) => sum + (a.impactMetrics?.creatorsLaunched || 0), 0
  );
  
  const totalEarningsGenerated = allocations.reduce(
    (sum, a) => sum + (a.impactMetrics?.totalEarningsGenerated || 0), 0
  );
  
  const workshopSpend = workshopAllocations.reduce(
    (sum, a) => sum + a.totalAmount, 0
  );
  
  return {
    totalWorkshops,
    totalParticipants,
    totalCreatorsLaunched,
    totalEarningsGenerated,
    costPerParticipant: totalParticipants > 0 ? workshopSpend / totalParticipants : 0,
    costPerCreatorLaunched: totalCreatorsLaunched > 0 
      ? allocations.reduce((s, a) => s + a.totalAmount, 0) / totalCreatorsLaunched 
      : 0
  };
}

// ============================================================
// CONTRIBUTION TRACKING
// ============================================================

/**
 * Get buyer's contribution to community fund
 */
export function getBuyerContribution(
  buyerId: string,
  entries: TreasuryEntry[]
): {
  totalContributed: number;
  purchases: number;
  impactEquivalent: string;
} {
  const buyerEntries = entries.filter(e => e.buyerId === buyerId);
  const totalContributed = buyerEntries.reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate impact equivalent
  const workshopHours = totalContributed / 15; // £15 per workshop hour
  const impactEquivalent = workshopHours >= 1 
    ? `${workshopHours.toFixed(1)} workshop hours for local youth`
    : `£${totalContributed.toFixed(2)} towards community programmes`;
  
  return {
    totalContributed,
    purchases: buyerEntries.length,
    impactEquivalent
  };
}

/**
 * Get creator's contribution to community fund (from their sales)
 */
export function getCreatorContribution(
  creatorId: string,
  entries: TreasuryEntry[]
): {
  totalGenerated: number;
  salesCount: number;
  rank: number;
} {
  const creatorEntries = entries.filter(e => e.creatorId === creatorId);
  const totalGenerated = creatorEntries.reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate rank among all creators
  const creatorTotals = new Map<string, number>();
  entries.forEach(e => {
    const current = creatorTotals.get(e.creatorId) || 0;
    creatorTotals.set(e.creatorId, current + e.amount);
  });
  
  const sortedCreators = Array.from(creatorTotals.entries())
    .sort((a, b) => b[1] - a[1]);
  
  const rank = sortedCreators.findIndex(([id]) => id === creatorId) + 1;
  
  return {
    totalGenerated,
    salesCount: creatorEntries.length,
    rank
  };
}

// ============================================================
// GOVERNANCE
// ============================================================

/**
 * Create a treasury allocation proposal
 */
export function createProposal(
  proposerId: string,
  title: string,
  description: string,
  requestedAmount: number,
  allocation: AllocationTarget
): GovernanceProposal {
  const votingPeriod = TREASURY_CONFIG.GOVERNANCE.VOTING_PERIOD_DAYS;
  const votingEnds = new Date();
  votingEnds.setDate(votingEnds.getDate() + votingPeriod);
  
  return {
    id: generateProposalId(),
    proposer: proposerId,
    title,
    description,
    type: 'treasury-allocation',
    requestedAmount,
    allocation,
    status: 'draft',
    votes: [],
    votingEnds: votingEnds.toISOString(),
    quorumRequired: TREASURY_CONFIG.GOVERNANCE.QUORUM_PERCENTAGE,
    currentVotes: { for: 0, against: 0, abstain: 0 }
  };
}

/**
 * Cast a vote on a proposal
 */
export function castVote(
  proposal: GovernanceProposal,
  voterId: string,
  voterType: GovernanceVote['voterType'],
  vote: 'for' | 'against' | 'abstain',
  reason?: string
): GovernanceProposal {
  // Calculate vote weight based on voter type
  const weights = {
    director: 3,
    champion: 2,
    creator: 1,
    community: 0.5
  };
  
  const newVote: GovernanceVote = {
    voterId,
    voterType,
    vote,
    weight: weights[voterType],
    timestamp: new Date().toISOString(),
    reason
  };
  
  const updatedVotes = [...proposal.votes, newVote];
  const currentVotes = {
    for: updatedVotes.filter(v => v.vote === 'for').reduce((s, v) => s + v.weight, 0),
    against: updatedVotes.filter(v => v.vote === 'against').reduce((s, v) => s + v.weight, 0),
    abstain: updatedVotes.filter(v => v.vote === 'abstain').reduce((s, v) => s + v.weight, 0)
  };
  
  return {
    ...proposal,
    votes: updatedVotes,
    currentVotes
  };
}

/**
 * Check if proposal has passed
 */
export function checkProposalOutcome(
  proposal: GovernanceProposal,
  totalEligibleVoters: number
): 'passed' | 'rejected' | 'pending' {
  const totalVotes = proposal.currentVotes.for + 
                     proposal.currentVotes.against + 
                     proposal.currentVotes.abstain;
  
  // Check quorum
  const quorumMet = totalVotes / totalEligibleVoters >= proposal.quorumRequired;
  
  // Check if voting period ended
  const votingEnded = new Date() > new Date(proposal.votingEnds);
  
  if (!votingEnded) {
    return 'pending';
  }
  
  if (!quorumMet) {
    return 'rejected';
  }
  
  const approvalRate = proposal.currentVotes.for / (proposal.currentVotes.for + proposal.currentVotes.against);
  
  return approvalRate >= TREASURY_CONFIG.GOVERNANCE.APPROVAL_THRESHOLD 
    ? 'passed' 
    : 'rejected';
}

// ============================================================
// BITCOIN RESERVE
// ============================================================

/**
 * Calculate suggested BTC reserve allocation
 * Based on Simon's principle: hold community fund in hard money
 */
export function calculateBtcReserveTarget(
  treasury: TreasurySummary,
  btcPrice: number
): {
  currentBtcValue: number;
  targetBtcAllocation: number;
  suggestedPurchase: number;
} {
  const targetPercentage = TREASURY_CONFIG.ALLOCATION_TARGETS['bitcoin-reserve'].minAllocation;
  const targetBtcAllocation = treasury.pendingAllocation * targetPercentage;
  
  const currentBtcValue = treasury.btcHoldings * btcPrice;
  const suggestedPurchase = Math.max(0, targetBtcAllocation - currentBtcValue);
  
  return {
    currentBtcValue,
    targetBtcAllocation,
    suggestedPurchase
  };
}

// ============================================================
// REPORTING
// ============================================================

export interface TransparencyReportData {
  period: { start: string; end: string };
  summary: TreasurySummary;
  topContributors: { name: string; amount: number; type: 'buyer' | 'creator' }[];
  allocations: TreasuryAllocation[];
  impact: ImpactSummary;
  pendingProposals: GovernanceProposal[];
}

/**
 * Generate transparency report data
 */
export function generateTransparencyReport(
  entries: TreasuryEntry[],
  allocations: TreasuryAllocation[],
  proposals: GovernanceProposal[],
  period: { start: Date; end: Date },
  creatorNames: Record<string, string>
): TransparencyReportData {
  // Filter entries by period
  const periodEntries = entries.filter(e => {
    const date = new Date(e.timestamp);
    return date >= period.start && date <= period.end;
  });
  
  const periodAllocations = allocations.filter(a => {
    const date = new Date(a.timestamp);
    return date >= period.start && date <= period.end;
  });
  
  // Calculate top contributors
  const buyerContributions = new Map<string, number>();
  const creatorContributions = new Map<string, number>();
  
  periodEntries.forEach(e => {
    if (e.buyerId) {
      buyerContributions.set(
        e.buyerId, 
        (buyerContributions.get(e.buyerId) || 0) + e.amount
      );
    }
    creatorContributions.set(
      e.creatorId,
      (creatorContributions.get(e.creatorId) || 0) + e.amount
    );
  });
  
  const topBuyers = Array.from(buyerContributions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, amount]) => ({ name: `Buyer ${id.slice(0, 8)}`, amount, type: 'buyer' as const }));
  
  const topCreators = Array.from(creatorContributions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, amount]) => ({ 
      name: creatorNames[id] || `Creator ${id.slice(0, 8)}`, 
      amount, 
      type: 'creator' as const 
    }));
  
  return {
    period: {
      start: period.start.toISOString(),
      end: period.end.toISOString()
    },
    summary: calculateTreasurySummary(periodEntries, periodAllocations),
    topContributors: [...topBuyers, ...topCreators]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10),
    allocations: periodAllocations,
    impact: calculateImpactSummary(periodAllocations),
    pendingProposals: proposals.filter(p => p.status === 'voting')
  };
}

// ============================================================
// HELPERS
// ============================================================

function generateEntryId(): string {
  return `ww-treasury-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateAllocationId(): string {
  return `ww-alloc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateProposalId(): string {
  return `ww-prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================
// EXPORT
// ============================================================

export const CommunityTreasuryService = {
  // Contributions
  recordContribution,
  recordDonation,
  recordGrant,
  // Allocation
  createAllocation,
  recordImpact: recordAllocationImpact,
  markAllocated: markEntriesAllocated,
  // Analytics
  calculateSummary: calculateTreasurySummary,
  calculateImpact: calculateImpactSummary,
  getBuyerContribution,
  getCreatorContribution,
  // Governance
  createProposal,
  castVote,
  checkOutcome: checkProposalOutcome,
  // Bitcoin
  calculateBtcTarget: calculateBtcReserveTarget,
  // Reporting
  generateReport: generateTransparencyReport
};

export default CommunityTreasuryService;