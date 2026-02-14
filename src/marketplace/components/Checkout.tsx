/**
 * CHECKOUT COMPONENT
 * 
 * Multi-step checkout with revenue transparency,
 * delivery options, and payment processing.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';
import type { CartItem, Address, DeliveryMethod } from '../types';
import { calculateRevenueSplit, calculateShipping, calculateCheckoutTotals } from '../integrations/cyberstoreIntegration';
import './Checkout.css';

export interface CheckoutProps {
  items: CartItem[];
  creatorNames: Record<string, string>;
  onComplete: (orderData: CheckoutOrderData) => void;
  onBack: () => void;
  userAddress?: Address;
}

export interface CheckoutOrderData {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  revenueSplit: {
    creators: { id: string; name: string; amount: number }[];
    community: number;
    operations: number;
  };
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  paymentMethod: string;
  discountCode?: string;
}

type CheckoutStep = 'review' | 'delivery' | 'payment' | 'confirmation';

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  creatorNames,
  onComplete,
  onBack,
  userAddress
}) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review');
  const [deliveryAddress, setDeliveryAddress] = useState<Address>(userAddress || {
    name: '',
    line1: '',
    line2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    phone: ''
  });
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Check if any items need shipping
  const hasPhysicalItems = items.some(item => 
    item.type === 'product' && !['instant-download', 'email-delivery', 'digital-access'].includes(item.type)
  );
  
  // Calculate totals
  const revenueSplit = useMemo(() => 
    calculateRevenueSplit(items, creatorNames),
    [items, creatorNames]
  );
  
  const shippingInfo = useMemo(() => {
    if (!hasPhysicalItems || !deliveryAddress.postcode) {
      return { zone: '', cost: 0, freeShipping: true };
    }
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    return calculateShipping(deliveryAddress.postcode, subtotal);
  }, [items, deliveryAddress.postcode, hasPhysicalItems]);
  
  const totals = useMemo(() => 
    calculateCheckoutTotals(items, shippingInfo.cost, appliedDiscount),
    [items, shippingInfo.cost, appliedDiscount]
  );
  
  const handleApplyDiscount = () => {
    // Simplified discount logic - in production would validate against backend
    if (discountCode.toUpperCase() === 'WELCOME10') {
      setAppliedDiscount(totals.subtotal * 0.1);
      setErrors({});
    } else if (discountCode.toUpperCase() === 'COMMUNITY') {
      setAppliedDiscount(5);
      setErrors({});
    } else {
      setErrors({ discount: 'Invalid discount code' });
    }
  };
  
  const validateDelivery = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (hasPhysicalItems) {
      if (!deliveryAddress.name) newErrors.name = 'Name is required';
      if (!deliveryAddress.line1) newErrors.line1 = 'Address is required';
      if (!deliveryAddress.city) newErrors.city = 'City is required';
      if (!deliveryAddress.postcode) newErrors.postcode = 'Postcode is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    const steps: CheckoutStep[] = ['review', 'delivery', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentStep === 'delivery' && !validateDelivery()) {
      return;
    }
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const handlePrevStep = () => {
    const steps: CheckoutStep[] = ['review', 'delivery', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex === 0) {
      onBack();
    } else {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  
  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderData: CheckoutOrderData = {
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      revenueSplit,
      deliveryMethod: hasPhysicalItems ? 'shipping' : 'instant-download',
      deliveryAddress: hasPhysicalItems ? deliveryAddress : undefined,
      paymentMethod,
      discountCode: appliedDiscount > 0 ? discountCode : undefined
    };
    
    setIsProcessing(false);
    setCurrentStep('confirmation');
    onComplete(orderData);
  };
  
  const updateAddress = (field: keyof Address, value: string) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="checkout">
      {/* Progress Steps */}
      <div className="checkout__progress">
        {['review', 'delivery', 'payment'].map((step, index) => (
          <div 
            key={step}
            className={`checkout__progress-step ${currentStep === step ? 'checkout__progress-step--active' : ''} ${['review', 'delivery', 'payment'].indexOf(currentStep) > index ? 'checkout__progress-step--complete' : ''}`}
          >
            <span className="checkout__progress-number">{index + 1}</span>
            <span className="checkout__progress-label">
              {step === 'review' && 'Review'}
              {step === 'delivery' && 'Delivery'}
              {step === 'payment' && 'Payment'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="checkout__container">
        <div className="checkout__main">
          {/* Step 1: Review */}
          {currentStep === 'review' && (
            <div className="checkout__section">
              <h2 className="checkout__section-title">Review Your Order</h2>
              
              <div className="checkout__items">
                {items.map(item => (
                  <div key={item.id} className="checkout__item">
                    <img 
                      src={item.thumbnail || '/images/placeholder.jpg'} 
                      alt={item.title}
                      className="checkout__item-image"
                    />
                    <div className="checkout__item-details">
                      <h4 className="checkout__item-title">{item.title}</h4>
                      <p className="checkout__item-creator">
                        by {creatorNames[item.creatorId] || 'Creator'}
                      </p>
                      {item.variant && (
                        <p className="checkout__item-variant">{item.variant.name}</p>
                      )}
                      <p className="checkout__item-qty">Qty: {item.quantity}</p>
                    </div>
                    <div className="checkout__item-price">
                      £{item.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Discount Code */}
              <div className="checkout__discount">
                <label className="checkout__discount-label">Discount Code</label>
                <div className="checkout__discount-input">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className={errors.discount ? 'checkout__input--error' : ''}
                  />
                  <button onClick={handleApplyDiscount}>Apply</button>
                </div>
                {errors.discount && (
                  <span className="checkout__error">{errors.discount}</span>
                )}
                {appliedDiscount > 0 && (
                  <span className="checkout__discount-applied">
                    ✓ Discount applied: -£{appliedDiscount.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Delivery */}
          {currentStep === 'delivery' && (
            <div className="checkout__section">
              <h2 className="checkout__section-title">Delivery Details</h2>
              
              {!hasPhysicalItems ? (
                <div className="checkout__digital-notice">
                  <span className="checkout__digital-icon">⚡</span>
                  <div>
                    <h4>Digital Delivery</h4>
                    <p>All items in your order are digital. You'll receive instant access after payment.</p>
                  </div>
                </div>
              ) : (
                <div className="checkout__address-form">
                  <div className="checkout__field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={deliveryAddress.name}
                      onChange={(e) => updateAddress('name', e.target.value)}
                      className={errors.name ? 'checkout__input--error' : ''}
                    />
                    {errors.name && <span className="checkout__error">{errors.name}</span>}
                  </div>
                  
                  <div className="checkout__field">
                    <label>Address Line 1 *</label>
                    <input
                      type="text"
                      value={deliveryAddress.line1}
                      onChange={(e) => updateAddress('line1', e.target.value)}
                      className={errors.line1 ? 'checkout__input--error' : ''}
                    />
                    {errors.line1 && <span className="checkout__error">{errors.line1}</span>}
                  </div>
                  
                  <div className="checkout__field">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      value={deliveryAddress.line2}
                      onChange={(e) => updateAddress('line2', e.target.value)}
                    />
                  </div>
                  
                  <div className="checkout__field-row">
                    <div className="checkout__field">
                      <label>City *</label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => updateAddress('city', e.target.value)}
                        className={errors.city ? 'checkout__input--error' : ''}
                      />
                      {errors.city && <span className="checkout__error">{errors.city}</span>}
                    </div>
                    
                    <div className="checkout__field">
                      <label>Postcode *</label>
                      <input
                        type="text"
                        value={deliveryAddress.postcode}
                        onChange={(e) => updateAddress('postcode', e.target.value)}
                        className={errors.postcode ? 'checkout__input--error' : ''}
                      />
                      {errors.postcode && <span className="checkout__error">{errors.postcode}</span>}
                    </div>
                  </div>
                  
                  <div className="checkout__field">
                    <label>Phone (for delivery updates)</label>
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => updateAddress('phone', e.target.value)}
                    />
                  </div>
                  
                  {shippingInfo.zone && (
                    <div className="checkout__shipping-info">
                      <p>Shipping to: <strong>{shippingInfo.zone}</strong></p>
                      {shippingInfo.freeShipping ? (
                        <p className="checkout__free-shipping">✓ Free shipping!</p>
                      ) : (
                        <p>Shipping cost: £{shippingInfo.cost.toFixed(2)}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Payment */}
          {currentStep === 'payment' && (
            <div className="checkout__section">
              <h2 className="checkout__section-title">Payment Method</h2>
              
              <div className="checkout__payment-methods">
                <label className={`checkout__payment-option ${paymentMethod === 'card' ? 'checkout__payment-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span className="checkout__payment-icon">💳</span>
                  <span className="checkout__payment-label">Card Payment</span>
                </label>
                
                <label className={`checkout__payment-option ${paymentMethod === 'paypal' ? 'checkout__payment-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <span className="checkout__payment-icon">🅿️</span>
                  <span className="checkout__payment-label">PayPal</span>
                </label>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="checkout__card-form">
                  <div className="checkout__field">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="checkout__field-row">
                    <div className="checkout__field">
                      <label>Expiry</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="checkout__field">
                      <label>CVC</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                  
                  <div className="checkout__field">
                    <label>Name on Card</label>
                    <input type="text" placeholder="J Smith" />
                  </div>
                </div>
              )}
              
              <div className="checkout__secure-notice">
                <span>🔒</span> Your payment is secure and encrypted
              </div>
            </div>
          )}
          
          {/* Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="checkout__confirmation">
              <div className="checkout__confirmation-icon">✓</div>
              <h2>Order Complete!</h2>
              <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
              
              <div className="checkout__confirmation-details">
                <p><strong>Order Total:</strong> £{totals.total.toFixed(2)}</p>
                <p><strong>Payment Method:</strong> {paymentMethod === 'card' ? 'Card' : 'PayPal'}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary Sidebar */}
        {currentStep !== 'confirmation' && (
          <div className="checkout__sidebar">
            <div className="checkout__summary">
              <h3 className="checkout__summary-title">Order Summary</h3>
              
              <div className="checkout__summary-row">
                <span>Subtotal ({items.length} items)</span>
                <span>£{totals.subtotal.toFixed(2)}</span>
              </div>
              
              {totals.shipping > 0 && (
                <div className="checkout__summary-row">
                  <span>Shipping</span>
                  <span>£{totals.shipping.toFixed(2)}</span>
                </div>
              )}
              
              {totals.discount > 0 && (
                <div className="checkout__summary-row checkout__summary-row--discount">
                  <span>Discount</span>
                  <span>-£{totals.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="checkout__summary-total">
                <span>Total</span>
                <span>£{totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Revenue Transparency */}
            <div className="checkout__revenue">
              <h4 className="checkout__revenue-title">
                💚 How Your Payment Helps
              </h4>
              
              <div className="checkout__revenue-split">
                {revenueSplit.creators.map(creator => (
                  <div key={creator.id} className="checkout__revenue-row">
                    <span>{creator.name}</span>
                    <span>£{creator.amount.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="checkout__revenue-row checkout__revenue-row--community">
                  <span>Community Fund</span>
                  <span>£{revenueSplit.community.toFixed(2)}</span>
                </div>
                
                <div className="checkout__revenue-row checkout__revenue-row--ops">
                  <span>Platform</span>
                  <span>£{revenueSplit.operations.toFixed(2)}</span>
                </div>
              </div>
              
              <p className="checkout__revenue-note">
                The Community Fund supports free workshops for local young people.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="checkout__actions">
              <button
                className="checkout__btn checkout__btn--secondary"
                onClick={handlePrevStep}
              >
                {currentStep === 'review' ? 'Back to Cart' : 'Back'}
              </button>
              
              {currentStep !== 'payment' ? (
                <button
                  className="checkout__btn checkout__btn--primary"
                  onClick={handleNextStep}
                >
                  Continue
                </button>
              ) : (
                <button
                  className="checkout__btn checkout__btn--primary"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay £${totals.total.toFixed(2)}`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
