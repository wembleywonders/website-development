/**
 * CYBERSTORE INTEGRATION
 * 
 * Connects the marketplace to the existing Cyberstore
 * cart and checkout systems.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { 
  Product, 
  Service, 
  CartItem, 
  Order, 
  OrderItem,
  Address,
  CheckoutState 
} from '../types';

// ============================================
// TYPES
// ============================================

export interface CyberstoreCartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  creatorId: string;
  creatorName: string;
  type: 'product' | 'service';
}

export interface CyberstoreCheckout {
  items: CyberstoreCartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  revenueSplit: {
    creators: { id: string; name: string; amount: number }[];
    community: number;
    operations: number;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  clientSecret?: string;
}

// ============================================
// CART CONVERSION
// ============================================

/**
 * Convert marketplace cart item to cyberstore format
 */
export function toStorestoreCartItem(
  item: CartItem,
  creatorName: string
): CyberstoreCartItem {
  return {
    id: item.id,
    productId: item.itemId,
    name: item.title,
    price: item.unitPrice,
    quantity: item.quantity,
    image: item.thumbnail,
    variant: item.variant?.name,
    creatorId: item.creatorId,
    creatorName,
    type: item.type
  };
}

/**
 * Convert cyberstore cart item to marketplace format
 */
export function fromCyberstoreCartItem(
  item: CyberstoreCartItem
): CartItem {
  return {
    id: item.id,
    type: item.type,
    itemId: item.productId,
    creatorId: item.creatorId,
    title: item.name,
    thumbnail: item.image || '',
    variant: item.variant ? { 
      id: item.variant, 
      name: item.variant, 
      options: [], 
      price: item.price 
    } : undefined,
    quantity: item.quantity,
    unitPrice: item.price,
    totalPrice: item.price * item.quantity
  };
}

// ============================================
// REVENUE CALCULATION
// ============================================

/**
 * Calculate revenue split for cart items
 */
export function calculateRevenueSplit(
  items: CartItem[],
  creatorNames: Record<string, string>
): CyberstoreCheckout['revenueSplit'] {
  const creatorAmounts: Record<string, { name: string; amount: number }> = {};
  let communityTotal = 0;
  let operationsTotal = 0;
  
  items.forEach(item => {
    // Different splits for products vs services
    const isService = item.type === 'service';
    const creatorShare = isService ? 0.60 : 0.55;
    const communityShare = isService ? 0.20 : 0.25;
    const operationsShare = 0.20;
    
    const creatorAmount = item.totalPrice * creatorShare;
    const communityAmount = item.totalPrice * communityShare;
    const operationsAmount = item.totalPrice * operationsShare;
    
    if (!creatorAmounts[item.creatorId]) {
      creatorAmounts[item.creatorId] = {
        name: creatorNames[item.creatorId] || 'Creator',
        amount: 0
      };
    }
    
    creatorAmounts[item.creatorId].amount += creatorAmount;
    communityTotal += communityAmount;
    operationsTotal += operationsAmount;
  });
  
  return {
    creators: Object.entries(creatorAmounts).map(([id, data]) => ({
      id,
      name: data.name,
      amount: Math.round(data.amount * 100) / 100
    })),
    community: Math.round(communityTotal * 100) / 100,
    operations: Math.round(operationsTotal * 100) / 100
  };
}

/**
 * Calculate totals for checkout
 */
export function calculateCheckoutTotals(
  items: CartItem[],
  shippingCost: number = 0,
  discountAmount: number = 0
): { subtotal: number; shipping: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const total = Math.max(0, subtotal + shippingCost - discountAmount);
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shippingCost * 100) / 100,
    discount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100
  };
}

// ============================================
// ORDER CREATION
// ============================================

/**
 * Generate order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WW-${timestamp}-${random}`;
}

/**
 * Create order from checkout
 */
export function createOrder(
  checkout: CheckoutState,
  buyerId: string,
  paymentMethod: string
): Order {
  const orderNumber = generateOrderNumber();
  const now = new Date();
  
  // Group items by seller for potential order splitting
  const sellerIds = [...new Set(checkout.items.map(item => item.creatorId))];
  
  // For now, create single order (could split by seller in future)
  const order: Order = {
    id: `order-${Date.now()}`,
    orderNumber,
    buyerId,
    sellerId: sellerIds[0], // Primary seller (first one)
    items: checkout.items.map(item => ({
      id: item.id,
      type: item.type,
      itemId: item.itemId,
      title: item.title,
      variant: item.variant?.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice
    })),
    subtotal: checkout.subtotal,
    discount: checkout.discount,
    shipping: checkout.shipping,
    total: checkout.total,
    revenueSplit: {
      creatorAmount: checkout.revenueBreakdown.creators.reduce((sum, c) => sum + c.amount, 0),
      communityAmount: checkout.revenueBreakdown.community,
      operationsAmount: checkout.revenueBreakdown.operations
    },
    paymentStatus: 'pending',
    paymentMethod,
    deliveryMethod: checkout.deliveryMethod,
    deliveryAddress: checkout.deliveryAddress,
    status: 'pending',
    statusHistory: [
      { status: 'pending', date: now, note: 'Order placed' }
    ],
    messages: [],
    orderDate: now,
    reviewed: false
  };
  
  return order;
}

// ============================================
// DISCOUNT CODES
// ============================================

export interface DiscountCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validUntil?: Date;
  usageLimit?: number;
  usageCount: number;
  applicableTo?: 'products' | 'services' | 'all';
}

/**
 * Validate and apply discount code
 */
export function applyDiscountCode(
  code: string,
  discounts: DiscountCode[],
  cartItems: CartItem[],
  subtotal: number
): { valid: boolean; discount: number; error?: string } {
  const discount = discounts.find(d => d.code.toUpperCase() === code.toUpperCase());
  
  if (!discount) {
    return { valid: false, discount: 0, error: 'Invalid discount code' };
  }
  
  if (discount.validUntil && new Date() > discount.validUntil) {
    return { valid: false, discount: 0, error: 'Discount code has expired' };
  }
  
  if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
    return { valid: false, discount: 0, error: 'Discount code usage limit reached' };
  }
  
  if (discount.minPurchase && subtotal < discount.minPurchase) {
    return { 
      valid: false, 
      discount: 0, 
      error: `Minimum purchase of £${discount.minPurchase} required` 
    };
  }
  
  // Filter applicable items
  let applicableSubtotal = subtotal;
  if (discount.applicableTo && discount.applicableTo !== 'all') {
    const itemType = discount.applicableTo === 'products' ? 'product' : 'service';
    applicableSubtotal = cartItems
      .filter(item => item.type === itemType)
      .reduce((sum, item) => sum + item.totalPrice, 0);
  }
  
  // Calculate discount
  let discountAmount: number;
  if (discount.type === 'percentage') {
    discountAmount = applicableSubtotal * (discount.value / 100);
  } else {
    discountAmount = discount.value;
  }
  
  // Apply max discount cap
  if (discount.maxDiscount) {
    discountAmount = Math.min(discountAmount, discount.maxDiscount);
  }
  
  return {
    valid: true,
    discount: Math.round(discountAmount * 100) / 100
  };
}

// ============================================
// SHIPPING CALCULATION
// ============================================

export interface ShippingZone {
  id: string;
  name: string;
  postcodePatterns: string[];
  rates: {
    standard: number;
    express: number;
  };
  freeShippingThreshold?: number;
}

const DEFAULT_SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'brent',
    name: 'Brent (Local)',
    postcodePatterns: ['HA9', 'HA0', 'NW10', 'NW2', 'NW6'],
    rates: { standard: 3.99, express: 7.99 },
    freeShippingThreshold: 30
  },
  {
    id: 'london',
    name: 'Greater London',
    postcodePatterns: ['N', 'NW', 'W', 'SW', 'SE', 'E', 'EC', 'WC'],
    rates: { standard: 5.99, express: 12.99 },
    freeShippingThreshold: 50
  },
  {
    id: 'uk',
    name: 'UK Mainland',
    postcodePatterns: ['*'],
    rates: { standard: 7.99, express: 14.99 },
    freeShippingThreshold: 75
  }
];

/**
 * Calculate shipping cost based on postcode
 */
export function calculateShipping(
  postcode: string,
  subtotal: number,
  expressDelivery: boolean = false,
  zones: ShippingZone[] = DEFAULT_SHIPPING_ZONES
): { zone: string; cost: number; freeShipping: boolean } {
  const postcodePrefix = postcode.toUpperCase().replace(/\s/g, '').substring(0, 3);
  
  // Find matching zone
  let matchedZone = zones.find(zone => 
    zone.postcodePatterns.some(pattern => {
      if (pattern === '*') return true;
      return postcodePrefix.startsWith(pattern);
    })
  );
  
  // Default to UK if no match
  if (!matchedZone) {
    matchedZone = zones.find(z => z.id === 'uk') || zones[zones.length - 1];
  }
  
  // Check free shipping threshold
  const qualifiesForFreeShipping = matchedZone.freeShippingThreshold 
    ? subtotal >= matchedZone.freeShippingThreshold 
    : false;
  
  const cost = qualifiesForFreeShipping 
    ? 0 
    : (expressDelivery ? matchedZone.rates.express : matchedZone.rates.standard);
  
  return {
    zone: matchedZone.name,
    cost: Math.round(cost * 100) / 100,
    freeShipping: qualifiesForFreeShipping
  };
}

// ============================================
// PAYMENT INTEGRATION STUBS
// ============================================

/**
 * Create payment intent (stub - would connect to Stripe)
 */
export async function createPaymentIntent(
  amount: number,
  currency: string = 'gbp',
  metadata: Record<string, string> = {}
): Promise<PaymentIntent> {
  // Stub implementation
  // In production, this would call Stripe API
  return {
    id: `pi_${Date.now()}`,
    amount: Math.round(amount * 100), // Stripe uses smallest currency unit
    currency,
    status: 'pending'
  };
}

/**
 * Confirm payment (stub)
 */
export async function confirmPayment(
  paymentIntentId: string
): Promise<{ success: boolean; error?: string }> {
  // Stub implementation
  return { success: true };
}

// ============================================
// ORDER STATUS UPDATES
// ============================================

/**
 * Get next valid order statuses
 */
export function getNextOrderStatuses(
  currentStatus: Order['status']
): Order['status'][] {
  const transitions: Record<Order['status'], Order['status'][]> = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['in-progress', 'cancelled'],
    'in-progress': ['ready', 'cancelled'],
    'ready': ['shipped', 'delivered', 'cancelled'],
    'shipped': ['delivered'],
    'delivered': ['completed'],
    'completed': [],
    'cancelled': [],
    'refunded': []
  };
  
  return transitions[currentStatus] || [];
}

/**
 * Update order status with validation
 */
export function updateOrderStatus(
  order: Order,
  newStatus: Order['status'],
  note?: string
): Order {
  const validNextStatuses = getNextOrderStatuses(order.status);
  
  if (!validNextStatuses.includes(newStatus)) {
    throw new Error(`Cannot transition from ${order.status} to ${newStatus}`);
  }
  
  const now = new Date();
  
  return {
    ...order,
    status: newStatus,
    statusHistory: [
      ...order.statusHistory,
      { status: newStatus, date: now, note }
    ],
    completedDate: newStatus === 'completed' ? now : order.completedDate
  };
}

// ============================================
// EXPORT
// ============================================

export default {
  toStorestoreCartItem,
  fromCyberstoreCartItem,
  calculateRevenueSplit,
  calculateCheckoutTotals,
  generateOrderNumber,
  createOrder,
  applyDiscountCode,
  calculateShipping,
  createPaymentIntent,
  confirmPayment,
  getNextOrderStatuses,
  updateOrderStatus
};

/**
 * PROGRAMME JOURNEY INTEGRATION
 * 
 * Connects programmes and workshops to marketplace unlocks.
 * Tracks progression from learner to seller.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

// import type { ProgrammeId } from '../types';
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
    milestone = {
      id: `workshop-${programmeId}-${workshopNumber}`,
      type: 'workshop',
      title: `${PROGRAMME_INFO[programmeId].icon} Workshop ${workshopNumber} Complete!`,
      name: `Workshop ${workshopNumber} Complete`,
      description: `You can now sell: ${newUnlocks.join(', ')}`,
      achievedDate: new Date(),
      programmeId,
      reward: `Unlocked ${newUnlocks.length} new listing types`,
      stage: 'learning',
      condition: () => true
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
    name: `${programmeInfo.name} Graduate`,
    description: `You've completed all ${programmeInfo.workshopsRequired} workshops. Full marketplace access unlocked!`,
    achievedDate: new Date(),
    programmeId,
    reward: 'Full marketplace selling privileges',
    stage: 'creating',
    condition: () => true
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
  const programmes = Object.keys(PROGRAMME_INFO) as ProgrammeId[];
  
  return programmes.map(programmeId => {
    const programmeWorkshops = completedWorkshops.filter(
      w => w.programmeId === programmeId
    );
    
    const totalWorkshops = PROGRAMME_INFO[programmeId].workshopsRequired;
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
    const maxProgress = Math.max(...progress.map(p => p.workshopsCompleted / p.totalWorkshops));
    
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
// EXPORT
// ============================================

export const ProgrammeJourneyIntegration = {
  processWorkshopCompletion,
  processProgrammeGraduation,
  checkMarketplaceReadiness,
  getProgrammeProgressSummary,
  calculateJourneyProgress,
  getNewCombinations
};

/**
 * USER JOURNEY INTEGRATION
 * 
 * Unified user journey system connecting programmes,
 * marketplace, and Maya guidance across the platform.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { CreatorProfile } from '../types';
import type { ProgrammeId } from '../types';
import { PROGRAMME_INFO as USER_JOURNEY_PROGRAMME_INFO, getSuggestedNextProgramme } from '../data/skillCombinations';
import { getMilestoneCelebration } from '../rovs/MarketplaceMayaROV';

// ============================================
// TYPES
// ============================================

export type JourneyStage = 
  | 'discovery'
  | 'learning'
  | 'creating'
  | 'launching'
  | 'selling'
  | 'growing'
  | 'mastery';

export interface UserJourneyState {
  userId: string;
  
  // Current position
  stage: JourneyStage;
  substage: number; // 0-100 within stage
  
  // Programme progress
  enrolledProgrammes: ProgrammeId[];
  completedProgrammes: ProgrammeId[];
  workshopsAttended: number;
  
  // Marketplace progress
  marketplaceUnlocked: boolean;
  creatorProfile: CreatorProfile | null;
  products: Product[];
  services: Service[];
  orders: Order[];
  
  // Achievements
  achievedMilestones: string[];
  
  // Stats
  totalEarnings: number;
  totalSales: number;
  averageRating: number;
}

export interface JourneyMilestone {
  id: string;
  name: string;
  description: string;
  stage: JourneyStage;
  condition: (state: UserJourneyState) => boolean;
  celebration?: ReturnType<typeof getMilestoneCelebration>;
}

export interface StageInfo {
  stage: JourneyStage;
  name: string;
  description: string;
  focus: string;
  nextSteps: string[];
}

// ============================================
// STAGE DEFINITIONS
// ============================================

export const STAGE_INFO: Record<JourneyStage, StageInfo> = {
  discovery: {
    stage: 'discovery',
    name: 'Discovery',
    description: 'Exploring what Wembley Wonders offers',
    focus: 'Find your path',
    nextSteps: [
      'Explore available programmes',
      'Attend a taster session',
      'Talk to current members'
    ]
  },
  learning: {
    stage: 'learning',
    name: 'Learning',
    description: 'Building skills through programme workshops',
    focus: 'Develop your craft',
    nextSteps: [
      'Attend workshops regularly',
      'Practice between sessions',
      'Build your portfolio'
    ]
  },
  creating: {
    stage: 'creating',
    name: 'Creating',
    description: 'Preparing to enter the marketplace',
    focus: 'Package your skills',
    nextSteps: [
      'Complete your creator profile',
      'Photograph your work',
      'Write your first listing'
    ]
  },
  launching: {
    stage: 'launching',
    name: 'Launching',
    description: 'Getting your first sales',
    focus: 'Get visible',
    nextSteps: [
      'Share listings with network',
      'Gather testimonials',
      'Respond quickly to enquiries'
    ]
  },
  selling: {
    stage: 'selling',
    name: 'Selling',
    description: 'Building consistent sales',
    focus: 'Build momentum',
    nextSteps: [
      'Add more listings',
      'Request reviews from buyers',
      'Optimize pricing'
    ]
  },
  growing: {
    stage: 'growing',
    name: 'Growing',
    description: 'Scaling your creative business',
    focus: 'Expand and diversify',
    nextSteps: [
      'Consider a second programme',
      'Explore collaborations',
      'Add service offerings'
    ]
  },
  mastery: {
    stage: 'mastery',
    name: 'Mastery',
    description: 'Established creator with multiple income streams',
    focus: 'Lead and mentor',
    nextSteps: [
      'Mentor new creators',
      'Create premium offerings',
      'Build recurring revenue'
    ]
  }
};

// ============================================
// MILESTONE DEFINITIONS
// ============================================

export const MILESTONES: JourneyMilestone[] = [
  {
    id: 'first-workshop',
    type: 'workshop',
    title: 'First Steps',
    name: 'First Steps',
    description: 'Attended your first workshop',
    stage: 'learning',
    condition: (state) => state.workshopsAttended >= 1
  },
  {
    id: 'programme-complete',
    type: 'graduation',
    title: 'Graduate',
    name: 'Graduate',
    description: 'Completed your first programme',
    stage: 'creating',
    condition: (state) => state.completedProgrammes.length >= 1
  },
  {
    id: 'first-listing',
    type: 'first-listing',
    title: 'Open for Business',
    name: 'Open for Business',
    description: 'Published your first listing',
    stage: 'launching',
    condition: (state) => state.products.length + state.services.length >= 1
  },
  {
    id: 'first-sale',
    type: 'first-sale',
    title: 'First Sale',
    name: 'First Sale',
    description: 'Made your first sale',
    stage: 'selling',
    condition: (state) => state.totalSales >= 1
  },
  {
    id: 'ten-sales',
    type: 'first-sale',
    title: 'Getting Traction',
    name: 'Getting Traction',
    description: 'Reached 10 sales',
    stage: 'selling',
    condition: (state) => state.totalSales >= 10
  },
  {
    id: 'fifty-sales',
    type: 'first-sale',
    title: 'Consistent Seller',
    name: 'Consistent Seller',
    description: 'Reached 50 sales',
    stage: 'growing',
    condition: (state) => state.totalSales >= 50
  },
  {
    id: 'hundred-sales',
    type: 'first-sale',
    title: 'Century',
    name: 'Century',
    description: 'Reached 100 sales',
    stage: 'mastery',
    condition: (state) => state.totalSales >= 100
  },
  {
    id: 'hundred-pounds',
    type: 'first-sale',
    title: 'First Hundred',
    name: 'First Hundred',
    description: 'Earned £100 from your creative work',
    stage: 'selling',
    condition: (state) => state.totalEarnings >= 100
  },
  {
    id: 'five-hundred-pounds',
    type: 'first-sale',
    title: 'Serious Money',
    name: 'Serious Money',
    description: 'Earned £500 from your creative work',
    stage: 'growing',
    condition: (state) => state.totalEarnings >= 500
  },
  {
    id: 'thousand-pounds',
    type: 'first-sale',
    title: 'Four Figures',
    name: 'Four Figures',
    description: 'Earned £1,000 from your creative work',
    stage: 'growing',
    condition: (state) => state.totalEarnings >= 1000
  },
  {
    id: 'five-thousand-pounds',
    type: 'first-sale',
    title: 'Serious Creator',
    name: 'Serious Creator',
    description: 'Earned £5,000 from your creative work',
    stage: 'mastery',
    condition: (state) => state.totalEarnings >= 5000
  },
  {
    id: 'five-star',
    type: 'first-sale',
    title: 'Five Star',
    name: 'Five Star',
    description: 'Received a 5-star review',
    stage: 'selling',
    condition: (state) => state.averageRating >= 5.0
  },
  {
    id: 'dual-skilled',
    type: 'graduation',
    title: 'Dual Skilled',
    name: 'Dual Skilled',
    description: 'Completed two programmes',
    stage: 'growing',
    condition: (state) => state.completedProgrammes.length >= 2
  },
  {
    id: 'triple-threat',
    type: 'graduation',
    title: 'Triple Threat',
    name: 'Triple Threat',
    description: 'Completed three programmes',
    stage: 'mastery',
    condition: (state) => state.completedProgrammes.length >= 3
  },
  {
    id: 'first-combination',
    type: 'combination',
    title: 'Power Combo',
    name: 'Power Combo',
    description: 'Unlocked your first skill combination',
    stage: 'growing',
    condition: (state) => getAvailableCombinations(state.completedProgrammes).length >= 1
  }
];

// ============================================
// STAGE CALCULATION
// ============================================

/**
 * Calculate current journey stage from state
 */
export function calculateStage(state: UserJourneyState): {
  stage: JourneyStage;
  substage: number;
  info: StageInfo;
} {
  let stage: JourneyStage;
  let substage: number;
  
  if (state.workshopsAttended === 0) {
    stage = 'discovery';
    substage = state.enrolledProgrammes.length > 0 ? 50 : 0;
  } else if (state.completedProgrammes.length === 0) {
    stage = 'learning';
    // Substage based on workshop progress
    substage = Math.min(100, state.workshopsAttended * 15);
  } else if (state.products.length + state.services.length === 0) {
    stage = 'creating';
    substage = state.creatorProfile ? 50 : 0;
  } else if (state.totalSales === 0) {
    stage = 'launching';
    const listings = state.products.length + state.services.length;
    substage = Math.min(100, listings * 25);
  } else if (state.totalSales < 10) {
    stage = 'selling';
    substage = state.totalSales * 10;
  } else if (state.totalEarnings < 1000 || state.completedProgrammes.length < 2) {
    stage = 'growing';
    const earningsProgress = Math.min(50, (state.totalEarnings / 1000) * 50);
    const programmeProgress = state.completedProgrammes.length >= 2 ? 50 : 0;
    substage = earningsProgress + programmeProgress;
  } else {
    stage = 'mastery';
    const factors = [
      state.totalEarnings >= 5000 ? 25 : (state.totalEarnings / 5000) * 25,
      state.totalSales >= 100 ? 25 : (state.totalSales / 100) * 25,
      state.completedProgrammes.length >= 3 ? 25 : (state.completedProgrammes.length / 3) * 25,
      state.averageRating >= 4.8 ? 25 : (state.averageRating / 4.8) * 25
    ];
    substage = Math.round(factors.reduce((a, b) => a + b, 0));
  }
  
  return {
    stage,
    substage,
    info: STAGE_INFO[stage]
  };
}

/**
 * Check which milestones are newly achieved
 */
export function checkMilestones(
  state: UserJourneyState
): JourneyMilestone[] {
  return MILESTONES.filter(
    milestone => 
      !state.achievedMilestones.includes(milestone.id) && 
      milestone.condition(state)
  );
}

// ============================================
// PROGRESS CALCULATION
// ============================================

/**
 * Calculate overall journey progress percentage
 */
export function calculateProgress(state: UserJourneyState): {
  overall: number;
  currentStage: number;
  byStage: Record<JourneyStage, number>;
} {
  const stageWeights: Record<JourneyStage, { start: number; end: number }> = {
    discovery: { start: 0, end: 5 },
    learning: { start: 5, end: 20 },
    creating: { start: 20, end: 30 },
    launching: { start: 30, end: 45 },
    selling: { start: 45, end: 60 },
    growing: { start: 60, end: 80 },
    mastery: { start: 80, end: 100 }
  };
  
  const { stage, substage } = calculateStage(state);
  const weight = stageWeights[stage];
  const stageRange = weight.end - weight.start;
  const overall = weight.start + (substage / 100) * stageRange;
  
  // Calculate progress within each stage
  const byStage: Record<JourneyStage, number> = {
    discovery: 0,
    learning: 0,
    creating: 0,
    launching: 0,
    selling: 0,
    growing: 0,
    mastery: 0
  };
  
  const stages: JourneyStage[] = ['discovery', 'learning', 'creating', 'launching', 'selling', 'growing', 'mastery'];
  const currentIndex = stages.indexOf(stage);
  
  stages.forEach((s, i) => {
    if (i < currentIndex) {
      byStage[s] = 100;
    } else if (i === currentIndex) {
      byStage[s] = substage;
    } else {
      byStage[s] = 0;
    }
  });
  
  return {
    overall: Math.round(overall),
    currentStage: substage,
    byStage
  };
}

// ============================================
// NEXT ACTIONS
// ============================================

/**
 * Get suggested next actions based on current state
 */
export function getNextActions(state: UserJourneyState): {
  primary: { action: string; href: string; priority: 'high' | 'medium' | 'low' };
  secondary: { action: string; href: string }[];
} {
  const { stage } = calculateStage(state);
  
  switch (stage) {
    case 'discovery':
      return {
        primary: {
          action: 'Explore programmes to find your path',
          href: '/programmes',
          priority: 'high'
        },
        secondary: [
          { action: 'Meet current creators', href: '/community' },
          { action: 'Attend a taster session', href: '/events' }
        ]
      };
    
    case 'learning':
      const inProgressProgramme = state.enrolledProgrammes[0];
      return {
        primary: {
          action: `Continue ${inProgressProgramme ? USER_JOURNEY_PROGRAMME_INFO[inProgressProgramme].name : 'your programme'}`,
          href: inProgressProgramme ? `/programmes/${inProgressProgramme}` : '/programmes',
          priority: 'high'
        },
        secondary: [
          { action: 'Practice between workshops', href: '/workspace' },
          { action: 'Connect with cohort', href: '/community' }
        ]
      };
    
    case 'creating':
      return {
        primary: {
          action: 'Create your first listing',
          href: '/marketplace/new',
          priority: 'high'
        },
        secondary: [
          { action: 'Complete your creator profile', href: '/marketplace/profile' },
          { action: 'See what others are selling', href: '/marketplace/browse' }
        ]
      };
    
    case 'launching':
      return {
        primary: {
          action: 'Share your listings to get your first sale',
          href: '/marketplace/dashboard',
          priority: 'high'
        },
        secondary: [
          { action: 'Add more listings', href: '/marketplace/new' },
          { action: 'Optimize your pricing', href: '/marketplace/dashboard/listings' }
        ]
      };
    
    case 'selling':
      return {
        primary: {
          action: 'Request reviews from happy customers',
          href: '/marketplace/dashboard/orders',
          priority: 'medium'
        },
        secondary: [
          { action: 'Add service offerings', href: '/marketplace/new?type=service' },
          { action: 'Consider a second programme', href: '/programmes' }
        ]
      };
    
    case 'growing':
      const suggestions = getSuggestedNextProgramme(state.completedProgrammes);
      return {
        primary: {
          action: suggestions.length > 0 
            ? `Add ${USER_JOURNEY_PROGRAMME_INFO[suggestions[0].programmeId].name} to unlock combinations`
            : 'Explore collaboration opportunities',
          href: suggestions.length > 0 
            ? `/programmes/${suggestions[0].programmeId}`
            : '/marketplace/collaborations',
          priority: 'medium'
        },
        secondary: [
          { action: 'Find collaboration partners', href: '/marketplace/collaborations' },
          { action: 'Create package offerings', href: '/marketplace/new?type=package' }
        ]
      };
    
    case 'mastery':
      return {
        primary: {
          action: 'Mentor new creators',
          href: '/community/mentoring',
          priority: 'low'
        },
        secondary: [
          { action: 'Create premium offerings', href: '/marketplace/new' },
          { action: 'Build retainer clients', href: '/marketplace/dashboard' }
        ]
      };
  }
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle workshop completion event
 */
export function onWorkshopComplete(
  state: UserJourneyState,
  programmeId: ProgrammeId,
  workshopNumber: number
): {
  updatedState: Partial<UserJourneyState>;
  newMilestones: JourneyMilestone[];
  mayaMessage?: ReturnType<typeof getMilestoneCelebration>;
} {
  const updatedState: Partial<UserJourneyState> = {
    workshopsAttended: state.workshopsAttended + 1
  };
  
  // Add to enrolled if not already
  if (!state.enrolledProgrammes.includes(programmeId)) {
    updatedState.enrolledProgrammes = [...state.enrolledProgrammes, programmeId];
  }
  
  // Check for new milestones
  const newState = { ...state, ...updatedState };
  const newMilestones = checkMilestones(newState);
  
  if (newMilestones.length > 0) {
    updatedState.achievedMilestones = [
      ...state.achievedMilestones,
      ...newMilestones.map(m => m.id)
    ];
  }
  
  // Generate Maya message for first workshop
  let mayaMessage;
  if (state.workshopsAttended === 0) {
    mayaMessage = getMilestoneCelebration('first-listing'); // Reuse celebration format
  }
  
  return { updatedState, newMilestones, mayaMessage };
}

/**
 * Handle programme completion event
 */
export function onProgrammeComplete(
  state: UserJourneyState,
  programmeId: ProgrammeId
): {
  updatedState: Partial<UserJourneyState>;
  newMilestones: JourneyMilestone[];
  combinationsUnlocked: { id: string; name: string; unlocks: string[] }[];
  mayaMessage?: ReturnType<typeof getMilestoneCelebration>;
} {
  const updatedState: Partial<UserJourneyState> = {
    completedProgrammes: [...state.completedProgrammes, programmeId],
    marketplaceUnlocked: true
  };
  
  // Check for new combinations
  const previousCombinations = getAvailableCombinations(state.completedProgrammes);
  const newCombinations = getAvailableCombinations([...state.completedProgrammes, programmeId]);
  const combinationsUnlocked = newCombinations
    .filter(nc => !previousCombinations.some(pc => pc.id === nc.id))
    .map(c => ({ id: c.id, name: c.name, unlocks: c.unlocks }));
  
  // Check for new milestones
  const newState = { ...state, ...updatedState };
  const newMilestones = checkMilestones(newState);
  
  if (newMilestones.length > 0) {
    updatedState.achievedMilestones = [
      ...state.achievedMilestones,
      ...newMilestones.map(m => m.id)
    ];
  }
  
  // Generate Maya celebration
  let mayaMessage;
  if (combinationsUnlocked.length > 0) {
    mayaMessage = getMilestoneCelebration('new-combination', {
      name: combinationsUnlocked[0].name,
      unlocks: combinationsUnlocked[0].unlocks
    });
  }
  
  return { updatedState, newMilestones, combinationsUnlocked, mayaMessage };
}

/**
 * Handle sale event
 */
export function onSale(
  state: UserJourneyState,
  saleAmount: number,
  creatorEarnings: number,
  productTitle: string
): {
  updatedState: Partial<UserJourneyState>;
  newMilestones: JourneyMilestone[];
  mayaMessage?: ReturnType<typeof getMilestoneCelebration>;
} {
  const updatedState: Partial<UserJourneyState> = {
    totalSales: state.totalSales + 1,
    totalEarnings: state.totalEarnings + creatorEarnings
  };
  
  // Check for new milestones
  const newState = { ...state, ...updatedState };
  const newMilestones = checkMilestones(newState);
  
  if (newMilestones.length > 0) {
    updatedState.achievedMilestones = [
      ...state.achievedMilestones,
      ...newMilestones.map(m => m.id)
    ];
  }
  
  // Generate Maya celebration for first sale
  let mayaMessage;
  if (state.totalSales === 0) {
    mayaMessage = getMilestoneCelebration('first-sale', {
      title: productTitle,
      price: saleAmount,
      earnings: creatorEarnings
    });
  } else if (newState.totalSales === 10) {
    mayaMessage = getMilestoneCelebration('tenth-sale');
  } else if (state.totalEarnings < 100 && newState.totalEarnings >= 100) {
    mayaMessage = getMilestoneCelebration('hundred-pounds');
  } else if (state.totalEarnings < 1000 && newState.totalEarnings >= 1000) {
    mayaMessage = getMilestoneCelebration('thousand-pounds');
  }
  
  return { updatedState, newMilestones, mayaMessage };
}

// ============================================
// EXPORT
// ============================================

export const UserJourneyIntegration = {
  STAGE_INFO,
  MILESTONES,
  calculateStage,
  checkMilestones,
  calculateProgress,
  getNextActions,
  onWorkshopComplete,
  onProgrammeComplete,
  onSale
};
