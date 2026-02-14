/**
 * WEMBLEY WONDERS BLOCKCHAIN MODULE
 * 
 * Transparent, community-first blockchain infrastructure.
 * 
 * NOT speculation. NOT extraction. This is:
 * - Proof of contribution (Community Tokens)
 * - Verifiable credentials (Soulbound NFTs)
 * - Transparent treasury (On-chain tracking)
 * - Pathway to sovereignty (Bitcoin bridge)
 * 
 * Philosophy: Local value circulation, radical transparency,
 * and a path from earning in GBP to holding in BTC.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * Flat 2, 452 High Road, Wembley HA9 7AY
 */

// ============================================================
// TYPES
// ============================================================
export type {
  // Config
  NetworkType,
  TokenType,
  TransactionType,
  BlockchainConfig,
  
  // Community Token
  CommunityToken,
  TokenSource,
  TokenTransaction,
  
  // Creator Credentials
  CreatorCredential,
  CredentialType,
  CredentialMetadata,
  CredentialAttribute,
  
  // Treasury
  TreasuryEntry,
  TreasuryAllocation,
  TreasurySummary,
  AllocationTarget,
  
  // Impact
  ImpactCertificate,
  ImpactType,
  ImpactMetrics,
  ImpactEvidence,
  ImpactFunder,
  ImpactSummary,
  
  // Bitcoin
  BitcoinJourneyStage,
  CreatorBitcoinProfile,
  BitcoinPayout,
  
  // Value Exchange
  ValueExchangeTransaction,
  CyberstoreIntegration,
  
  // Governance
  GovernanceProposal,
  GovernanceVote,
  
  // Transparency
  TransparencyReport,
  VerificationRequest
} from './types';

export {
  DEFAULT_CONFIG,
  TOKEN_CONFIG,
  TREASURY_CONFIG
} from './types';

// ============================================================
// TOKENS
// ============================================================
export {
  CommunityTokenService,
  createTokenWallet,
  calculateTokenEarnings,
  issueTokens,
  redeemTokens,
  transferTokens,
  calculateTokenAnalytics,
  issueForProgrammeCompletion,
  issueForSale,
  issueForVolunteering,
  issueForReferral,
  formatTokenBalance,
  calculateRedemptionValue,
  type TokenAnalytics
} from './tokens/CommunityToken';

export {
  CreatorCredentialService,
  PROGRAMME_CREDENTIALS,
  BADGE_CREDENTIALS,
  issueProgrammeCredential,
  issueBadgeCredential,
  issueMentorCertification,
  issueWorkshopAttendance,
  verifyCredential,
  getCreatorCredentials,
  hasCredential,
  formatCredentialForDisplay,
  generateCredentialShareLink,
  calculateCredentialRarity,
  type VerificationResult,
  type CredentialDisplay
} from './tokens/CreatorCredential';

// ============================================================
// TREASURY
// ============================================================
export {
  CommunityTreasuryService,
  recordContribution,
  recordDonation,
  recordGrant,
  createAllocation,
  recordAllocationImpact,
  markEntriesAllocated,
  calculateTreasurySummary,
  calculateImpactSummary,
  getBuyerContribution,
  getCreatorContribution,
  createProposal,
  castVote,
  checkProposalOutcome,
  calculateBtcReserveTarget,
  generateTransparencyReport,
  type TransparencyReportData
} from './treasury/CommunityTreasury';

// ============================================================
// INTEGRATIONS
// ============================================================
export {
  BitcoinBridgeService,
  BITCOIN_JOURNEY,
  createBitcoinProfile,
  updatePayoutPreference,
  completeEducationModule,
  calculatePayout,
  createPayout,
  processPayout,
  initializeBtcReserve,
  recordReservePurchase,
  updateReserveValue,
  calculateAveragePurchasePrice,
  calculateUnrealizedPnL,
  getEducationProgress,
  getModuleDetails,
  formatBtcAmount,
  btcToSats,
  satsToBtc,
  type BtcReserve,
  type BtcReservePurchase,
  type EducationProgress
} from './integrations/bitcoinBridge';

export {
  MarketplaceBlockchainService,
  processMarketplaceSale,
  processProgrammeCompletion,
  processBadgeAward,
  checkSalesMilestones,
  calculateBuyerImpact,
  getCheckoutBlockchainData,
  getCreatorBlockchainSummary,
  generateCyberstoreSync,
  type MarketplaceSale,
  type SaleProcessingResult,
  type ProgrammeCompletionResult,
  type BuyerImpactSummary,
  type CheckoutBlockchainData,
  type CreatorBlockchainSummary,
  type CyberstoreSyncData
} from './integrations/marketplaceIntegration';

// ============================================================
// COMPONENTS
// ============================================================
export {
  TransparencyDashboard,
  type TransparencyDashboardProps
} from './components/TransparencyDashboard';

// ============================================================
// CONSTANTS
// ============================================================
export const BLOCKCHAIN_VERSION = '1.0.0';

export const BLOCKCHAIN_PHILOSOPHY = {
  // What this is
  PURPOSE: [
    'Proof of contribution, not speculation',
    'Transparent treasury tracking',
    'Verifiable creator credentials',
    'Pathway to monetary sovereignty'
  ],
  
  // What this is NOT
  NOT_FOR: [
    'Speculation or trading',
    'Derivatives or leverage',
    'Extracting value from community',
    'Centralized control'
  ],
  
  // Core principles (from Simon's framework)
  PRINCIPLES: {
    LOCAL_CIRCULATION: 'Value stays in the community, not extracted upward',
    RADICAL_TRANSPARENCY: 'Every transaction, allocation, and impact visible on-chain',
    SELF_CUSTODY_PATH: 'From Gemini (training wheels) to hardware wallet (sovereign)',
    COMMUNITY_WEALTH: 'The 25% fund is our sovereign wealth, reinvested in our people',
    NO_DEBT_INSTRUMENTS: 'Never borrow against, never leverage, never create derivatives'
  }
} as const;