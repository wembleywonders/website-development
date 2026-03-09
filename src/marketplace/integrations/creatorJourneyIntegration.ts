// src/marketplace/integrations/creatorJourneyIntegration.ts
//
// Bridges the CyberstoreProduct / CalendarEvent / CreatorProfile schema
// (creatorJourney.ts) to the existing CartItem / Order / CheckoutState
// types already wired in cyberstoreIntegration.ts.
//
// Nothing in cyberstoreIntegration.ts is touched — this file is additive only.
// CommunityShopPage can import from here to feed standard cart/checkout flow.

import type { CartItem } from '../types';
import {
  CyberstoreProduct,
  CalendarEvent,
  PodcastEpisode,
  CreatorProfile,
  CounterArchiveToken,
  TokenStage,
  JUDITH_PRODUCTS,
  JUDITH_CALENDAR_EVENTS,
  JUDITH_PROFILE,
  getProductProvenance,
  getCostRecoveryStatus,
  formatRevenueSplit,
} from '../../types/creatorJourney';

// Re-export data so CommunityShopPage has a single import point
export {
  JUDITH_PRODUCTS,
  JUDITH_CALENDAR_EVENTS,
  JUDITH_PROFILE,
  getProductProvenance,
  getCostRecoveryStatus,
  formatRevenueSplit,
};

// ─── Convert CyberstoreProduct → CartItem ─────────────────────────────────────
// Lets our rich creator-journey product feed directly into the existing
// calculateRevenueSplit / createOrder pipeline without modification.

export function journeyProductToCartItem(
  product: CyberstoreProduct,
  quantity: number = 1,
  selectedVariant?: string
): CartItem {
  return {
    id: `cart-${product.id}-${Date.now()}`,
    type: product.category === 'workshop' ? 'service' : 'product',
    itemId: product.id,
    creatorId: product.creatorJourney.creatorId,
    title: product.title,
    thumbnail: '',                          // populated by UI if image exists
    variant: selectedVariant
      ? { id: selectedVariant, name: selectedVariant, options: [], price: product.price }
      : undefined,
    quantity,
    unitPrice: product.price,
    totalPrice: product.price * quantity,
  };
}

// ─── Journey event → calendar display shape ───────────────────────────────────
// A slimmed-down view model for calendar components that don't need the full
// CalendarEvent type.

export interface JourneyEventDisplay {
  id: string;
  date: string;
  title: string;
  typeLabel: string;
  typeIcon: string;
  typeColour: string;
  location?: string;
  locationUrl?: string;
  journeyNote?: string;
  journeyNotePublic: boolean;
  linkedProducts: CyberstoreProduct[];
  linkedEpisode?: PodcastEpisode;
  tokenId?: string;
  cost?: { amount: number; category: string };
}

const EVENT_DISPLAY_CONFIG: Record<string, { label: string; icon: string; colour: string }> = {
  trichologist:      { label: 'Trichologist',     icon: '🩺', colour: '#86b880' },
  'k2k-recording':   { label: 'K2K Recording',    icon: '🎙️', colour: '#60a5fa' },
  'raydyo-drop':     { label: 'Rayd-yo Episode',  icon: '📻', colour: '#a78bfa' },
  'archive-update':  { label: 'Archive Update',   icon: '📚', colour: '#fbbf24' },
  'founding-session':{ label: 'Founding Session', icon: '✦',  colour: '#f472b6' },
  workshop:          { label: 'Workshop',          icon: '👥', colour: '#34d399' },
  'cyberstore-launch':{ label: 'Cyberstore',       icon: '🛍️', colour: '#fb923c' },
  community:         { label: 'Community',         icon: '🌍', colour: '#94a3b8' },
};

export function toJourneyEventDisplay(
  event: CalendarEvent,
  allProducts: CyberstoreProduct[],
  allEpisodes: PodcastEpisode[] = []
): JourneyEventDisplay {
  const config = EVENT_DISPLAY_CONFIG[event.type] ?? EVENT_DISPLAY_CONFIG.community;

  const linkedProducts = allProducts.filter(p =>
    p.creatorJourney.sourcingEvents.includes(event.id)
  );

  const linkedEpisode = event.generates.podcastEpisodeId
    ? allEpisodes.find(ep => ep.id === event.generates.podcastEpisodeId)
    : undefined;

  return {
    id: event.id,
    date: event.date,
    title: event.title,
    typeLabel: config.label,
    typeIcon: config.icon,
    typeColour: config.colour,
    location: event.location,
    locationUrl: event.locationUrl,
    journeyNote: event.journeyNotePublic ? event.journeyNote : undefined,
    journeyNotePublic: event.journeyNotePublic,
    linkedProducts,
    linkedEpisode,
    tokenId: event.generates.tokenId,
    cost: event.cost ? { amount: event.cost.amount, category: event.cost.category } : undefined,
  };
}

// ─── Full journey thread ───────────────────────────────────────────────────────
// Returns events in chronological order, enriched with their linked products
// and episodes. Used by the Calendar "Follow Judith's Thread" view and by
// the Roots page journey strip.

export interface JourneyThread {
  creator: CreatorProfile;
  events: JourneyEventDisplay[];
  totalCosts: number;
  totalProductsLive: number;
  totalProductsPlanned: number;
  costsProjectedRecovery: number; // £ earned at 55% if all live products reach salesNeeded
}

export function buildJudithJourneyThread(
  episodes: PodcastEpisode[] = []
): JourneyThread {
  const sortedEvents = [...JUDITH_CALENDAR_EVENTS].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const displayEvents = sortedEvents.map(ev =>
    toJourneyEventDisplay(ev, JUDITH_PRODUCTS, episodes)
  );

  const totalCosts = JUDITH_CALENDAR_EVENTS.reduce(
    (sum, ev) => sum + (ev.cost?.amount ?? 0), 0
  );

  const liveProducts   = JUDITH_PRODUCTS.filter(p => p.status === 'live');
  const plannedProducts = JUDITH_PRODUCTS.filter(p => p.status !== 'live');

  const costsProjectedRecovery = JUDITH_PRODUCTS.reduce((sum, p) => {
    const { creatorEarningPerSale, salesNeeded } = getCostRecoveryStatus(p);
    return sum + creatorEarningPerSale * salesNeeded;
  }, 0);

  return {
    creator: JUDITH_PROFILE,
    events: displayEvents,
    totalCosts,
    totalProductsLive: liveProducts.length,
    totalProductsPlanned: plannedProducts.length,
    costsProjectedRecovery,
  };
}

// ─── CommunityShopPage adapter ────────────────────────────────────────────────
// Converts JUDITH_PRODUCTS into the existing local Product shape that
// CommunityShopPage already uses, so Judith's range slots into the existing
// product grid without requiring CommunityShopPage to be rewritten.
// The provenance-chain card (CreatorJourneyProductCard) renders separately
// in the featured Judith section above the main grid.

export interface ShopProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'journal' | 'toolkit' | 'tutorial' | 'template' | 'course' | 'guide' | 'media' | 'beats' | 'roots';
  format: 'pdf' | 'epub' | 'video' | 'audio' | 'zip' | 'bundle' | 'mp3' | 'wav' | 'stems';
  creatorName: string;
  creatorEarnings: number;
  communityContribution: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  lastUpdated: Date;
  previewAvailable: boolean;
  relatedProgramme?: string;
  // Journey-product extras
  journeyProductId?: string;     // links back to CyberstoreProduct for provenance panel
  evidenceGrade?: string;
}

const CATEGORY_MAP: Record<string, ShopProduct['category']> = {
  'digital-download': 'guide',
  'audio':            'media',
  'physical':         'toolkit',
  'bundle':           'guide',
  'workshop':         'course',
  'apothecary':       'toolkit',
  'consultation':     'guide',
};

const FORMAT_MAP: Record<string, ShopProduct['format']> = {
  'digital-download': 'pdf',
  'audio':            'audio',
  'physical':         'bundle',
  'bundle':           'bundle',
  'workshop':         'bundle',
  'apothecary':       'bundle',
  'consultation':     'bundle',
};

export function journeyProductToShopProduct(p: CyberstoreProduct): ShopProduct {
  const { creatorEarningPerSale } = getCostRecoveryStatus(p);
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    category: CATEGORY_MAP[p.category] ?? 'guide',
    format: FORMAT_MAP[p.category] ?? 'pdf',
    creatorName: p.creatorJourney.creatorName,
    creatorEarnings: creatorEarningPerSale,
    communityContribution: parseFloat((p.price * 0.25).toFixed(2)),
    totalSales: 0,
    rating: 5.0,
    reviewCount: 0,
    tags: p.tags,
    featured: false,
    lastUpdated: new Date(p.creatorJourney.lastReviewed ?? '2026-03-01'),
    previewAvailable: false,
    relatedProgramme: 'Roots',
    journeyProductId: p.id,
    evidenceGrade: p.creatorJourney.evidenceGrade,
  };
}

// Convenience: all Judith products as ShopProduct[]
export const JUDITH_SHOP_PRODUCTS: ShopProduct[] =
  JUDITH_PRODUCTS.map(journeyProductToShopProduct);

// ─── Counter-archive token mint helper ────────────────────────────────────────
// Generates the next token ID in Judith's sequence.
// In production this would call the blockchain service.
// Used by CyberstoreDock when a creator lists a new Roots product.

export function mintJourneyToken(
  stage: TokenStage,
  creatorId: string,
  existingTokens: CounterArchiveToken[]
): CounterArchiveToken {
  const creatorTokens = existingTokens.filter(t => t.creatorId === creatorId);
  const nextNum = (creatorTokens.length + 1).toString().padStart(3, '0');
  const prefix = creatorId === 'judith-fontanelle' ? 'JF' : creatorId.toUpperCase().slice(0, 2);

  return {
    tokenId: `CAT-${prefix}-${nextNum}`,
    stage,
    mintedAt: new Date().toISOString(),
    creatorId,
    description: `Counter-archive token minted at stage: ${stage}`,
    blockchainRef: undefined,   // populated when chain integration is live
  };
}

// ─── Revenue split reconciliation ─────────────────────────────────────────────
// Note: cyberstoreIntegration.ts uses 55/25/20 for products, 60/20/20 for
// services. Our creator-journey products are always 55/25/20 (non-service).
// Workshops are typed as 'service' in CartItem but we keep them at 55/25/20
// because Judith's labour rate is the whole point. Override here.

export function getJourneyProductSplit(product: CyberstoreProduct): {
  creator: number; community: number; platform: number
} {
  // All journey products honour the founding 55/25/20 model regardless of
  // whether they map to 'service' type in CartItem.
  return formatRevenueSplit(product.price);
}