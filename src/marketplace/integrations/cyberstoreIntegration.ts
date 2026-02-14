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
  type: 'product' | 'service' | 'package';
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