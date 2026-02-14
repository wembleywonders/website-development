# Wembley Wonders Marketplace

A community-first creator marketplace that transforms programme graduates into earning creators.

## Overview

The marketplace is the commercial engine of Wembley Wonders, providing a platform for creators who have completed our programmes to sell products and services. Every transaction supports the creator, funds community programmes, and sustains platform operations.

**Revenue Split Model:**

- **Products:** 55% Creator / 25% Community Fund / 20% Operations
- **Services:** 60% Creator / 20% Community Fund / 20% Operations
- **Packages:** 58% Creator / 22% Community Fund / 20% Operations

## Architecture

```plaintext
src/marketplace/
├── types/
│   └── index.ts              # TypeScript type definitions
├── data/
│   ├── skillCombinations.ts  # Programme → Products/Services mapping
│   └── sampleData.ts         # Development/testing data
├── stores/
│   └── marketplaceStore.ts   # Zustand state management
├── rovs/
│   ├── marketplaceROV.ts     # AI guidance logic
│   └── MarketplaceMayaROV.ts # Maya AI integration
├── integrations/
│   ├── cyberstoreIntegration.ts      # E-commerce sync
│   ├── programmeJourneyIntegration.ts # Programme tracking
│   └── userJourneyIntegration.ts      # User context
├── components/
│   ├── ProductCard.tsx/.css
│   ├── ServiceCard.tsx/.css
│   ├── CreatorProfileCard.tsx/.css
│   ├── CreatorDashboard.tsx/.css
│   ├── SkillUnlocks.tsx/.css
│   ├── WorkshopMarketplaceBridge.tsx/.css
│   ├── ProductListingForm.tsx/.css
│   ├── ListingWizard.tsx/.css
│   ├── Checkout.tsx/.css
│   └── CollaborationFinder.tsx/.css
├── pages/
│   └── MarketplaceHome.tsx/.css
├── index.ts                  # Barrel exports
└── README.md                 # This file
```

## Core Concepts

### 1. Programme-Based Unlocks

Creators can only sell products/services related to programmes they've completed:

|Programme|Products|Services|
|-----------|----------|----------|
|Trubble n Bass|Beats, Sample Packs, Sound Kits|Mixing, Beat Production|
|Kaywana's Court|Fashion, Patterns, Artwork|Custom Design, Styling|
|STEMgeneers|Educational Materials, Kits|Tutoring, Workshops|
|TECHreneurs|Templates, Courses, Tools|Web Development, Consulting|
|G-Tech Casters|Video Content, Graphics|Streaming Setup, Editing|
|PageTurners|E-books, Scripts, Content|Writing, Editing Services|

### 2. Skill Combinations

Completing multiple programmes unlocks premium combination offerings:

```typescript
// Example: Trubble n Bass + G-Tech Casters = "Audio-Visual Creator"
const combination = {
  id: 'audio-visual-creator',
  programmes: ['trubble-n-bass', 'g-tech-casters'],
  unlocks: ['Music Videos', 'Podcast Production', 'Live Stream Packages'],
  revenueMultiplier: 1.5
};
```

### 3. Workshop Progression

Each workshop within a programme unlocks specific selling capabilities:

```typescript
// Workshop 1: Basic skills → Can list simple products
// Workshop 4: Intermediate → Can offer services
// Workshop 8 (Graduation): Full marketplace access
```

## Usage

### Basic Import

```typescript
import {
  // Components
  ProductCard,
  ServiceCard,
  MarketplaceHome,
  
  // Data
  PROGRAMME_INFO,
  SAMPLE_PRODUCTS,
  
  // Store
  useMarketplaceStore,
  
  // Config
  MARKETPLACE_CONFIG
} from '@/marketplace';
```

### Displaying Products

```tsx
import { ProductCard } from '@/marketplace';

function ProductGrid({ products, creatorNames }) {
  return (
    
      {products.map(product => (
        
      ))}
    
  );
}
```

### Using the Store

```tsx
import { useMarketplaceStore } from '@/marketplace';

function CartButton() {
  const { cart, addToCart, getCartTotal } = useMarketplaceStore();
  
  return (
    
      Cart ({cart.length}) - £{getCartTotal().toFixed(2)}
    
  );
}
```

### Getting AI Guidance

```typescript
import { getListingFormTips, getPricingGuidance } from '@/marketplace';

// Get tips for listing form
const tips = getListingFormTips(userContext, listingContext);

// Get pricing guidance for a product type
const pricing = getPricingGuidance('trubble-n-bass', 'product', 'beats-music');
// Returns: { min: 5, max: 50, suggested: 15, factors: [...] }
```

### Checking Skill Unlocks

```typescript
import { getAvailableCombinations, getSuggestedNextProgramme } from '@/marketplace';

const completedProgrammes = ['trubble-n-bass', 'g-tech-casters'];

// Get unlocked combinations
const combinations = getAvailableCombinations(completedProgrammes);
// Returns: [{ id: 'audio-visual-creator', ... }]

// Get suggestions for next programme
const suggestions = getSuggestedNextProgramme(completedProgrammes);
// Returns: [{ programmeId: 'techreneurs', unlocksCount: 2, ... }]
```

## Components Reference

### ProductCard

Displays a product with pricing, creator info, and add-to-cart functionality.

**Props:**

- `product: Product` - Product data
- `creatorName?: string` - Creator's display name
- `onAddToCart?: (product) => void`
- `onViewDetails?: (product) => void`
- `showRevenueSplit?: boolean` - Show creator earnings
- `compact?: boolean` - Compact display mode

### ServiceCard

Displays a service with pricing options and booking functionality.

**Props:**

- `service: Service` - Service data
- `creatorName?: string`
- `onBook?: (service) => void`
- `onViewDetails?: (service) => void`
- `showRevenueSplit?: boolean`

### CreatorDashboard

Full dashboard for creators to manage listings and track earnings.

**Props:**

- `creator: CreatorProfile`
- `products: Product[]`
- `services: Service[]`
- `analytics: CreatorAnalytics`
- `onCreateListing?: () => void`
- `onWithdraw?: () => void`

### ListingWizard

Step-by-step wizard for creating new listings.

**Props:**

- `completedProgrammes: ProgrammeId[]`
- `initialType?: ItemType`
- `onComplete: (listing) => void`
- `onCancel: () => void`

### CollaborationFinder

Helps creators find partners with complementary skills.

**Props:**

- `currentUserProgrammes: ProgrammeId[]`
- `creators: CreatorProfile[]`
- `onContact?: (creator, combinationId) => void`

## Integration Points

### With Cyberstore

```typescript
import { syncProductToCyberstore } from '@/marketplace';

// Sync a product to the e-commerce backend
await syncProductToCyberstore(product, creator);
```

### With Programme Journey

```typescript
import { getCreatorJourneyStage, calculateJourneyProgress } from '@/marketplace';

const stage = getCreatorJourneyStage(creator);
// Returns: 'exploring' | 'learning' | 'creating' | 'selling' | 'scaling'

const progress = calculateJourneyProgress(creator);
// Returns: { overall: 0.65, byProgramme: {...}, milestones: [...] }
```

### With Maya AI

```typescript
import { MarketplaceMayaROV } from '@/marketplace';

const maya = new MarketplaceMayaROV();
const response = await maya.getGuidance(userContext, 'pricing');
```

## Styling

All components use BEM-style CSS classes with the component name as prefix:

```css
.product-card { }
.product-card__image { }
.product-card__title { }
.product-card--compact { }
```

CSS files are co-located with components and can be imported directly or bundled.

## Testing

Sample data is provided for development and testing:

```typescript
import { 
  SAMPLE_CREATORS, 
  SAMPLE_PRODUCTS, 
  SAMPLE_SERVICES,
  SAMPLE_ANALYTICS 
} from '@/marketplace';
```

## Configuration

Key configuration values in `MARKETPLACE_CONFIG`:

```typescript
MARKETPLACE_CONFIG.REVENUE_SPLIT.PRODUCT.creator // 0.55
MARKETPLACE_CONFIG.SHIPPING.FREE_THRESHOLD       // £30
MARKETPLACE_CONFIG.LIMITS.MAX_IMAGES_PER_LISTING // 10
MARKETPLACE_CONFIG.BADGES.TOP_SELLER_SALES       // 50
```

## Philosophy

This marketplace embodies the Wembley Wonders mission:

1. **Skills Before Sales** - Creators must complete programmes before selling
2. **Community Investment** - 20-25% of every sale funds youth programmes
3. **Transparent Economics** - Buyers see exactly how their money helps
4. **Local First** - Prioritising Wembley and Brent community creators
5. **Collaboration Over Competition** - Skill combinations encourage partnerships

---

**Wembley Wonders CIC**  
Company No. 12960817  
Flat 2, 452 High Road, Wembley HA9 7AY  
[admin@wembleywonders.org](mailto:admin@wembleywonders.org)
