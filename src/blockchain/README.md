# Wembley Wonders Blockchain Module

> "Your money is your vote." — Simon Dixon

## Philosophy

This blockchain layer exists to serve community values, **not speculation**.

Based on principles from monetary sovereignty frameworks:

- **Local value circulation** beats global extraction
- **Radical transparency** builds trust
- **Self-custody pathway** leads to sovereignty
- **Community fund = sovereign wealth** reinvested in our people

### What This IS

✅ Proof of contribution (Community Tokens)  
✅ Verifiable credentials (Soulbound badges)  
✅ Transparent treasury tracking  
✅ Bitcoin education pathway  
✅ Impact measurement on-chain  

### What This is NOT

❌ A speculative token  
❌ Something you can trade on exchanges  
❌ Derivatives or leverage  
❌ A mechanism for extraction  
❌ Centralized control  

---

## Architecture

```text
src/blockchain/
├── types/
│   └── index.ts                      # All type definitions
├── tokens/
│   ├── CommunityToken.ts             # WWT - earned, not bought
│   └── CreatorCredential.ts          # Soulbound badges
├── treasury/
│   └── CommunityTreasury.ts          # 25% fund tracking
├── integrations/
│   ├── bitcoinBridge.ts              # BTC payout pathway
│   └── marketplaceIntegration.ts     # Connect to marketplace
├── components/
│   ├── TransparencyDashboard.tsx     # Public fund view
│   └── TransparencyDashboard.css
├── index.ts                          # Barrel exports
└── README.md                         # This file
```

---

## Core Systems

### 1. Community Token (WWT)

Not a cryptocurrency. A **proof of contribution**.

**Earning tokens:**

- Complete a programme: 100 WWT
- Make a sale: 5% of sale value in WWT
- Volunteer: 20 WWT per hour
- Refer someone: 50 WWT
- Community contribution: 25 WWT

**Redeeming tokens:**

- Workshop discount: 10 WWT = £1 off
- Equipment rental: 5 WWT = £1 value
- Service discount: 8 WWT = £1 off
- Priority booking: 25 WWT flat

**Transfers are limited** (max 10% of earned total) to prevent speculation.

```typescript
import { CommunityTokenService } from '@/blockchain';

// Create wallet
const wallet = CommunityTokenService.createWallet(creatorId);

// Issue for programme completion
const { wallet: updated, transaction } = CommunityTokenService.issueForProgramme(
  wallet,
  'trubble-n-bass',
  'Trubble n Bass'
);

// Redeem for discount
const result = CommunityTokenService.redeem(
  wallet,
  100, // tokens
  'workshop',
  'workshop-booking-123'
);
// result.gbpValue = 10 (£10 discount)
```

---

### 2. Creator Credentials

**Soulbound NFTs** — cannot be bought, sold, or transferred.

Types:

- **Programme Completion** — Proof of graduating from a programme
- **Workshop Attendance** — Per-workshop tracking
- **Skill Badges** — Milestones (First Sale, Rising Star, Top Seller)
- **Mentor Certification** — Authorized to mentor others
- **Verified Creator** — Identity confirmed

```typescript
import { CreatorCredentialService } from '@/blockchain';

// Issue programme completion credential
const credential = CreatorCredentialService.issueProgramme(
  creatorId,
  'trubble-n-bass',
  '2025-01-15',
  8 // workshops completed
);

// Issue badge for milestone
const badge = CreatorCredentialService.issueBadge(
  creatorId,
  'first-sale',
  ['https://evidence-url.com']
);

// Verify credential
const verification = CreatorCredentialService.verify(
  credential.id,
  allCredentials
);
```

---

### 3. Community Treasury

The **25% (products) / 20% (services)** that funds community programmes.

Tracked transparently:

- Every contribution from sales
- Every allocation decision
- Every impact outcome

```typescript
import { CommunityTreasuryService } from '@/blockchain';

// Record contribution from sale
const entry = CommunityTreasuryService.recordContribution(
  'sale-123',
  'tx-456',
  100, // total sale amount
  'product',
  'creator-abc',
  'Beat Pack Vol.1',
  'buyer-xyz'
);
// entry.amount = 25 (the 25%)

// Create allocation
const allocation = CommunityTreasuryService.createAllocation(
  [entry.id],
  25,
  'youth-workshops',
  'Fund Saturday workshop',
  ['director-1', 'director-2']
);

// Get buyer's contribution
const impact = CommunityTreasuryService.getBuyerContribution(
  'buyer-xyz',
  allEntries
);
// { totalContributed: 25, purchases: 1, impactEquivalent: '1.7 workshop hours' }
```

---

### 4. Bitcoin Bridge

The pathway from **earning in GBP** to **sovereignty in BTC**.

**Journey stages:**

1. **Unaware** — Hasn't learned about Bitcoin
2. **Curious** — Taking education modules
3. **First Purchase** — Bought sats on Gemini (custodial)
4. **Self-Custody** — Hardware wallet
5. **Sovereign** — Runs own node

```typescript
import { BitcoinBridgeService } from '@/blockchain';

// Create profile
const profile = BitcoinBridgeService.createProfile(creatorId);

// Complete education module
const updated = BitcoinBridgeService.completeModule(profile, 'btc-basics');

// Update payout preference
const result = BitcoinBridgeService.updatePreference(
  profile,
  'split',        // gbp | btc | split
  50,             // 50% in BTC
  'gemini',       // or 'self-custody'
  undefined       // or public address for self-custody
);

// Calculate payout
const payout = BitcoinBridgeService.calculatePayout(
  profile,
  55,             // GBP earnings
  80000           // current BTC price
);
// { gbpPayout: 27.50, btcPayout: 27.50, btcAmount: 0.00034375 }
```

**Bitcoin Reserve:**
The Community Fund can hold a portion in BTC to protect against GBP debasement.

```typescript
// Track BTC reserve
const reserve = BitcoinBridgeService.initializeReserve();

// Record purchase
const updated = BitcoinBridgeService.recordPurchase(
  reserve,
  500,    // GBP spent
  80000   // BTC price
);

// Calculate P&L
const pnl = BitcoinBridgeService.calculatePnL(updated, 85000);
// { pnl: 31.25, percentage: 6.25, isProfit: true }
```

---

### 5. Marketplace Integration

Connects blockchain layer to the marketplace:

```typescript
import { MarketplaceBlockchainService } from '@/blockchain';

// Process a sale through blockchain layer
const result = MarketplaceBlockchainService.processSale(
  sale,
  creatorWallet,
  buyerWallet,
  creatorBtcProfile,
  80000 // current BTC price
);
// Returns: { treasury, creatorTokens, buyerTokens, btcPayout, creatorPayout }

// Get checkout data for display
const checkoutData = MarketplaceBlockchainService.getCheckoutData(
  cartItems,
  buyerHasWallet
);
// { treasuryContribution: 12.50, tokenReward: 100, impactEstimate: '50 minutes...' }

// Generate Cyberstore sync data
const sync = MarketplaceBlockchainService.generateCyberstoreSync(
  'product-123',
  'product',
  50
);
// { blockchainEnabled: true, tokenRewardsRate: 2, ... }
```

---

## Components

### TransparencyDashboard

Public view of the Community Fund.

```tsx
import { TransparencyDashboard } from '@/blockchain';

<TransparencyDashboard
  summary={treasurySummary}
  allocations={allocations}
  proposals={governanceProposals}
  btcPrice={80000}
  onViewAllocation={handleViewAllocation}
  onViewProposal={handleViewProposal}
/>
```

Shows:

- Total collected / allocated / pending
- Bitcoin reserve value
- Allocation breakdown by category
- Impact metrics
- Active governance proposals

---

## Integration with Existing Systems

### Value Exchange System

The existing `/src/value-exchange-system/` can be bridged:

```typescript
// value-exchange-system → blockchain
import { CommunityTokenService } from '@/blockchain';
import { TokenWallet } from '@/value-exchange-system';

// Sync existing cultural tokens to blockchain layer
function syncToCommunityToken(culturalWallet: TokenWallet): CommunityToken {
  return CommunityTokenService.createWallet(culturalWallet.userId);
}
```

### Cyberstore / Retail

```typescript
import { MarketplaceBlockchainService } from '@/blockchain';

// In retail checkout
const blockchainData = MarketplaceBlockchainService.generateCyberstoreSync(
  product.id,
  product.type,
  product.price
);

// Display in checkout UI
<p>{blockchainData.impactStatement}</p>
// "This purchase funds 45 minutes of free youth workshops"
```

---

## Governance

Community members can propose and vote on treasury allocation:

```typescript
import { CommunityTreasuryService } from '@/blockchain';

// Create proposal
const proposal = CommunityTreasuryService.createProposal(
  proposerId,
  'Fund Summer Camp Equipment',
  'Purchase 10 laptops for Bright Sparks programme',
  2000,
  'equipment-purchase'
);

// Cast vote
const updated = CommunityTreasuryService.castVote(
  proposal,
  voterId,
  'champion', // voter type affects weight
  'for',
  'Essential for the programme'
);

// Check outcome
const outcome = CommunityTreasuryService.checkOutcome(updated, 50);
// 'passed' | 'rejected' | 'pending'
```

Vote weights:

- Director: 3x
- Champion: 2x
- Creator: 1x
- Community: 0.5x

---

## Configuration

```typescript
import { TOKEN_CONFIG, TREASURY_CONFIG } from '@/blockchain';

// Token earning rates
TOKEN_CONFIG.EARN_RATES.PROGRAMME_COMPLETION // 100 WWT
TOKEN_CONFIG.EARN_RATES.SALE_BONUS          // 5% in WWT

// Treasury allocation targets
TREASURY_CONFIG.ALLOCATION_TARGETS['youth-workshops'].minAllocation // 40%
TREASURY_CONFIG.ALLOCATION_TARGETS['bitcoin-reserve'].minAllocation // 10%

// Governance settings
TREASURY_CONFIG.GOVERNANCE.VOTING_PERIOD_DAYS // 7
TREASURY_CONFIG.GOVERNANCE.APPROVAL_THRESHOLD // 60%
```

---

## The Big Picture

This module embodies the Wembley Wonders philosophy:

```
┌─────────────────────────────────────────────────────────┐
│                    MARKETPLACE SALE                      │
│                         £100                             │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
        ┌───────┐      ┌───────┐       ┌───────┐
        │ £55   │      │ £25   │       │ £20   │
        │Creator│      │Commun.│       │ Ops   │
        └───────┘      └───────┘       └───────┘
            │               │
            ▼               ▼
    ┌──────────────┐  ┌──────────────┐
    │ BTC Option   │  │  Treasury    │
    │ (sovereign)  │  │  (tracked)   │
    └──────────────┘  └──────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
        ┌───────┐      ┌───────┐       ┌───────┐
        │Youth  │      │Equip- │       │  BTC  │
        │Wkshps │      │ment   │       │Reserve│
        └───────┘      └───────┘       └───────┘
```

Every transaction:

- Rewards creators (tokens)
- Thanks buyers (tokens)
- Funds youth programmes (treasury)
- Builds Bitcoin reserve (sovereignty)
- Creates verifiable impact (on-chain)

---

## Remember

From Simon's framework:

> "The minute you figure out how this system works, you have to decide where you're going to live... The real boycott is playing outside the system as much as possible."

This blockchain module is our **boycott infrastructure**:

- Local value instead of extraction
- Transparent treasury instead of corporate opacity
- Bitcoin pathway instead of debt dependence
- Community governance instead of shareholder control

---

**Wembley Wonders CIC**  
Company No. 12960817  
Flat 2, 452 High Road, Wembley HA9 7AY  
[admin@wembleywonders.org](mailto:admin@wembleywonders.org)