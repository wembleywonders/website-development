/**
 * WEMBLEY WONDERS BLOCKCHAIN TYPES
 * 
 * Type definitions for the community blockchain layer.
 * Built on principles of transparency, local circulation,
 * and sovereign value — not speculation.
 * 
 * Philosophy: This is NOT a shitcoin. This is proof-of-contribution,
 * transparent treasury tracking, and a pathway to monetary sovereignty.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

// ============================================================
// CORE BLOCKCHAIN TYPES
// ============================================================

export type NetworkType = 'mainnet' | 'testnet' | 'local';
export type TokenType = 'community' | 'credential' | 'impact';
export type TransactionType = 'sale' | 'contribution' | 'grant' | 'redemption' | 'transfer';

export interface BlockchainConfig {
  network: NetworkType;
  contractAddresses: {
    communityToken: string;
    credentialRegistry: string;
    treasuryLedger: string;
    impactCertificates: string;
  };
  explorerUrl: string;
  rpcEndpoint: string;
}

// ============================================================
// COMMUNITY TOKEN
// ============================================================

/**
 * CommunityToken (WWT - Wembley Wonders Token)
 * 
 * NOT a speculative asset. This is:
 * - Proof of contribution to the ecosystem
 * - Redeemable for services/products within WW
 * - Earned through verified activities
 * - Cannot be bought/sold on exchanges
 */
export interface CommunityToken {
  id: string;
  holderId: string;
  balance: number;
  earnedTotal: number;
  spentTotal: number;
  lastActivity: string; // ISO date
  sources: TokenSource[];
}

export interface TokenSource {
  type: 'programme-completion' | 'sale-earnings' | 'volunteer-hours' | 'community-contribution' | 'referral';
  amount: number;
  timestamp: string;
  reference: string; // Link to the activity
  verified: boolean;
}

export interface TokenTransaction {
  id: string;
  type: TransactionType;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  reference: string;
  metadata: {
    programmeId?: string;
    productId?: string;
    serviceId?: string;
    description?: string;
  };
  blockNumber?: number;
  txHash?: string;
}

// ============================================================
// CREATOR CREDENTIALS (Soulbound NFTs)
// ============================================================

/**
 * CreatorCredential
 * 
 * Non-transferable proof of:
 * - Programme completion
 * - Skill verification
 * - Badge achievement
 * 
 * These are "soulbound" — tied to the creator, cannot be sold.
 */
export interface CreatorCredential {
  id: string;
  creatorId: string;
  credentialType: CredentialType;
  programmeId?: string;
  issuedAt: string;
  issuedBy: string; // WW authority address
  metadata: CredentialMetadata;
  verified: boolean;
  txHash?: string;
}

export type CredentialType = 
  | 'programme-completion'
  | 'workshop-attendance'
  | 'skill-badge'
  | 'mentor-certification'
  | 'creator-verified'
  | 'champion-status';

export interface CredentialMetadata {
  name: string;
  description: string;
  image?: string; // IPFS hash
  attributes: CredentialAttribute[];
  evidence?: string[]; // Links to supporting evidence
}

export interface CredentialAttribute {
  trait_type: string;
  value: string | number;
}

// ============================================================
// COMMUNITY TREASURY
// ============================================================

/**
 * TreasuryEntry
 * 
 * Every transaction that contributes to the 25% Community Fund
 * is recorded transparently on-chain.
 */
export interface TreasuryEntry {
  id: string;
  transactionId: string;
  saleId: string;
  amount: number; // The 25% (or 20% for services)
  currency: 'GBP' | 'BTC' | 'WWT';
  btcEquivalent?: number; // If held in BTC
  timestamp: string;
  buyerId?: string;
  creatorId: string;
  productOrService: string;
  allocated: boolean;
  allocation?: TreasuryAllocation;
  txHash?: string;
}

export interface TreasuryAllocation {
  id: string;
  treasuryEntryIds: string[];
  totalAmount: number;
  allocatedTo: AllocationTarget;
  timestamp: string;
  approvedBy: string[];
  evidence: string; // Link to proof of use
  impactMetrics?: ImpactMetrics;
}

export type AllocationTarget = 
  | 'youth-workshops'
  | 'equipment-purchase'
  | 'venue-hire'
  | 'mentor-stipends'
  | 'community-events'
  | 'hardship-fund'
  | 'bitcoin-reserve';

export interface TreasurySummary {
  totalCollected: number;
  totalAllocated: number;
  pendingAllocation: number;
  btcHoldings: number;
  gbpHoldings: number;
  allocationBreakdown: Record<AllocationTarget, number>;
  impactSummary: ImpactSummary;
}

// ============================================================
// IMPACT CERTIFICATES
// ============================================================

/**
 * ImpactCertificate
 * 
 * Verifiable proof of community impact.
 * Issued when treasury funds are used and outcomes measured.
 */
export interface ImpactCertificate {
  id: string;
  certificateType: ImpactType;
  issuedAt: string;
  period: {
    start: string;
    end: string;
  };
  metrics: ImpactMetrics;
  evidence: ImpactEvidence[];
  funders: ImpactFunder[];
  verified: boolean;
  verifiedBy?: string;
  txHash?: string;
  ipfsHash?: string; // Full certificate on IPFS
}

export type ImpactType = 
  | 'workshop-delivery'
  | 'creator-launch'
  | 'youth-engagement'
  | 'community-event'
  | 'equipment-provision'
  | 'annual-report';

export interface ImpactMetrics {
  workshopsDelivered?: number;
  participantsReached?: number;
  creatorsLaunched?: number;
  totalEarningsGenerated?: number;
  volunteerHours?: number;
  equipmentProvided?: number;
  eventsHosted?: number;
  // Custom metrics
  custom?: Record<string, number>;
}

export interface ImpactEvidence {
  type: 'photo' | 'video' | 'document' | 'testimonial' | 'attendance-record';
  url: string;
  ipfsHash?: string;
  description: string;
  timestamp: string;
}

export interface ImpactFunder {
  type: 'buyer' | 'donor' | 'grant' | 'sponsor';
  id?: string;
  name?: string;
  contribution: number;
  percentage: number;
}

export interface ImpactSummary {
  totalWorkshops: number;
  totalParticipants: number;
  totalCreatorsLaunched: number;
  totalEarningsGenerated: number;
  costPerParticipant: number;
  costPerCreatorLaunched: number;
}

// ============================================================
// BITCOIN INTEGRATION
// ============================================================

/**
 * Bitcoin pathway types for creator sovereignty
 */
export type BitcoinJourneyStage = 
  | 'unaware'        // Doesn't know about BTC
  | 'curious'        // Learning
  | 'first-purchase' // Bought first sats (custodial)
  | 'self-custody'   // Hardware wallet
  | 'sovereign';     // Runs own node

export interface CreatorBitcoinProfile {
  creatorId: string;
  journeyStage: BitcoinJourneyStage;
  preferredPayout: 'gbp' | 'btc' | 'split';
  btcPayoutPercentage?: number; // If split
  custodian?: 'gemini' | 'self-custody';
  publicAddress?: string; // Only if self-custody
  totalBtcEarned: number;
  lastPayout?: string;
  educationCompleted: string[]; // Module IDs
}

export interface BitcoinPayout {
  id: string;
  creatorId: string;
  saleId: string;
  gbpAmount: number;
  btcAmount: number;
  btcPrice: number; // At time of conversion
  timestamp: string;
  destination: 'gemini' | 'self-custody';
  txHash?: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
}

// ============================================================
// VALUE EXCHANGE BRIDGE
// ============================================================

/**
 * Integration with existing value-exchange-system
 */
export interface ValueExchangeTransaction {
  id: string;
  fromSystem: 'marketplace' | 'cyberstore' | 'volunteer' | 'programme';
  toSystem: 'treasury' | 'creator-wallet' | 'community-fund';
  tokenType: TokenType;
  amount: number;
  gbpEquivalent: number;
  timestamp: string;
  reference: string;
}

export interface CyberstoreIntegration {
  productId: string;
  marketplaceListingId?: string;
  blockchainTracked: boolean;
  revenueSplit: {
    creator: number;
    community: number;
    operations: number;
  };
  tokenRewardsEnabled: boolean;
  tokenRewardRate: number; // Tokens per £1 spent
}

// ============================================================
// GOVERNANCE
// ============================================================

/**
 * Community governance for treasury allocation
 */
export interface GovernanceProposal {
  id: string;
  proposer: string;
  title: string;
  description: string;
  type: 'treasury-allocation' | 'policy-change' | 'programme-approval';
  requestedAmount?: number;
  allocation?: AllocationTarget;
  status: 'draft' | 'voting' | 'passed' | 'rejected' | 'executed';
  votes: GovernanceVote[];
  votingEnds: string;
  quorumRequired: number;
  currentVotes: {
    for: number;
    against: number;
    abstain: number;
  };
  executedAt?: string;
  txHash?: string;
}

export interface GovernanceVote {
  voterId: string;
  voterType: 'creator' | 'champion' | 'director' | 'community';
  vote: 'for' | 'against' | 'abstain';
  weight: number; // Based on contribution level
  timestamp: string;
  reason?: string;
}

// ============================================================
// TRANSPARENCY & VERIFICATION
// ============================================================

export interface TransparencyReport {
  id: string;
  period: {
    start: string;
    end: string;
  };
  treasury: TreasurySummary;
  transactions: TreasuryEntry[];
  allocations: TreasuryAllocation[];
  impact: ImpactCertificate[];
  generatedAt: string;
  ipfsHash?: string;
  verificationHash: string;
}

export interface VerificationRequest {
  id: string;
  type: 'credential' | 'impact' | 'treasury' | 'transaction';
  referenceId: string;
  requestedBy: string;
  timestamp: string;
  status: 'pending' | 'verified' | 'failed';
  verificationProof?: string;
}

// ============================================================
// CONFIGURATION
// ============================================================

export const DEFAULT_CONFIG: BlockchainConfig = {
  network: 'testnet',
  contractAddresses: {
    communityToken: '0x0000000000000000000000000000000000000000',
    credentialRegistry: '0x0000000000000000000000000000000000000000',
    treasuryLedger: '0x0000000000000000000000000000000000000000',
    impactCertificates: '0x0000000000000000000000000000000000000000'
  },
  explorerUrl: 'https://testnet.explorer.example.com',
  rpcEndpoint: 'https://testnet.rpc.example.com'
};

export const TOKEN_CONFIG = {
  // Token earning rates
  EARN_RATES: {
    PROGRAMME_COMPLETION: 100,      // WWT per programme completed
    WORKSHOP_ATTENDANCE: 10,        // WWT per workshop
    SALE_BONUS: 0.05,               // 5% of sale in WWT
    VOLUNTEER_HOUR: 20,             // WWT per volunteer hour
    REFERRAL: 50,                   // WWT per successful referral
    COMMUNITY_CONTRIBUTION: 25      // WWT per verified contribution
  },
  // Token redemption values
  REDEMPTION_RATES: {
    WORKSHOP_DISCOUNT: 10,          // WWT per £1 discount
    EQUIPMENT_RENTAL: 5,            // WWT per £1 rental value
    SERVICE_DISCOUNT: 8,            // WWT per £1 service discount
    PRIORITY_BOOKING: 25            // WWT for priority access
  }
} as const;

export const TREASURY_CONFIG = {
  REVENUE_SPLIT: {
    PRODUCT: { creator: 0.55, community: 0.25, operations: 0.20 },
    SERVICE: { creator: 0.60, community: 0.20, operations: 0.20 },
    PACKAGE: { creator: 0.58, community: 0.22, operations: 0.20 }
  },
  ALLOCATION_TARGETS: {
    'youth-workshops': { priority: 1, minAllocation: 0.40 },
    'equipment-purchase': { priority: 2, minAllocation: 0.15 },
    'mentor-stipends': { priority: 3, minAllocation: 0.10 },
    'community-events': { priority: 4, minAllocation: 0.10 },
    'venue-hire': { priority: 5, minAllocation: 0.10 },
    'hardship-fund': { priority: 6, minAllocation: 0.05 },
    'bitcoin-reserve': { priority: 7, minAllocation: 0.10 }
  },
  GOVERNANCE: {
    VOTING_PERIOD_DAYS: 7,
    QUORUM_PERCENTAGE: 0.30,
    APPROVAL_THRESHOLD: 0.60
  }
} as const;