import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './JoinPage.css';

// Initialize Stripe (replace with your actual publishable key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  stripePriceId: string;
  recommended?: boolean;
}

const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedTier = searchParams.get('tier'); // Get tier from URL (?tier=participant)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    selectedTier: preselectedTier || 'participant',
    needsSlidingScale: false,
    slidingScaleAmount: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSlidingScale, setShowSlidingScale] = useState(false);

  // Pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      id: 'participant',
      name: 'Participant',
      price: 17,
      period: 'month',
      description: 'Perfect for casual learners and drop-in sessions',
      stripePriceId: 'price_participant_monthly', // Replace with actual Stripe Price ID
      features: [
        'Drop-in sessions (Tues/Thurs 6-8pm)',
        '3D printer access (1-hour slots)',
        'Zoom workshops (Sat 10am-12pm)',
        'WhatsApp community (24/7)',
        'Materials discount (50% off)',
        'Shared laptop use',
      ],
      recommended: true,
    },
    {
      id: 'member',
      name: 'Member',
      price: 30,
      period: 'month',
      description: 'For committed learners who want structured programmes',
      stripePriceId: 'price_member_monthly', // Replace with actual Stripe Price ID
      features: [
        'Everything in Participant, PLUS:',
        'Priority equipment booking',
        '12-week structured programmes',
        '1-on-1 monthly check-in (30 min)',
        'Portfolio support (CV, LinkedIn)',
        'Monthly showcase spot',
        'Certificate on completion',
      ],
    },
  ];

  const selectedTierData = pricingTiers.find(t => t.id === formData.selectedTier) || pricingTiers[0];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    
    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone (optional, but validate if provided)
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date of Birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        newErrors.dateOfBirth = 'You must be at least 13 years old to join';
      } else if (age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    // Sliding Scale Validation
    if (formData.needsSlidingScale && !formData.slidingScaleAmount) {
      newErrors.slidingScaleAmount = 'Please enter an amount you can afford';
    } else if (formData.needsSlidingScale) {
      const amount = parseFloat(formData.slidingScaleAmount);
      if (isNaN(amount) || amount < 10 || amount > selectedTierData.price) {
        newErrors.slidingScaleAmount = `Amount must be between £10 and £${selectedTierData.price}`;
      }
    }

    // Terms & Privacy
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.form-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Step 1: Create customer in your backend
      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        dateOfBirth: formData.dateOfBirth,
        selectedTier: formData.selectedTier,
        slidingScale: formData.needsSlidingScale ? parseFloat(formData.slidingScaleAmount) : undefined,
        marketingConsent: formData.marketingConsent,
      };

      // Replace with your actual API endpoint
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Step 2: Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrors({
        form: error.message || 'Something went wrong. Please try again or email us at hello@wembleywonders.org'
      });
      setIsSubmitting(false);
    }
  };

  const handleSlidingScaleToggle = () => {
    setShowSlidingScale(!showSlidingScale);
    setFormData(prev => ({
      ...prev,
      needsSlidingScale: !showSlidingScale,
      slidingScaleAmount: '',
    }));
  };

  return (
    <div className="join-page">
      {/* Background */}
      <div className="join-bg-overlay" />

      {/* Header */}
      <div className="join-header">
        <Link to="/" className="join-back-link">
          ← Back to Home
        </Link>
        <h1 className="join-title">Join Wembley Wonders</h1>
        <p className="join-subtitle">
          Choose your membership tier and start your learning journey today
        </p>
      </div>

      {/* Main Container */}
      <div className="join-container">
        
        {/* Tier Selection */}
        <section className="tier-selection-section">
          <h2 className="section-title">Choose Your Membership</h2>
          
          <div className="tier-cards">
            {pricingTiers.map(tier => (
              <div
                key={tier.id}
                className={`tier-card ${formData.selectedTier === tier.id ? 'selected' : ''} ${tier.recommended ? 'recommended' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, selectedTier: tier.id }))}
              >
                {tier.recommended && (
                  <div className="tier-badge">Most Popular</div>
                )}
                
                <div className="tier-header">
                  <h3 className="tier-name">{tier.name}</h3>
                  <div className="tier-price">
                    <span className="price-currency">£</span>
                    <span className="price-amount">{tier.price}</span>
                    <span className="price-period">/{tier.period}</span>
                  </div>
                  <p className="tier-description">{tier.description}</p>
                </div>

                <ul className="tier-features">
                  {tier.features.map((feature, index) => (
                    <li key={index} className={feature.includes('PLUS:') ? 'feature-heading' : ''}>
                      {!feature.includes('PLUS:') && '✓ '}
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="tier-select">
                  <input
                    type="radio"
                    name="selectedTier"
                    value={tier.id}
                    checked={formData.selectedTier === tier.id}
                    onChange={handleChange}
                    className="tier-radio"
                  />
                  <span className="tier-select-label">
                    {formData.selectedTier === tier.id ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sliding Scale Option */}
          <div className="sliding-scale-banner">
            <div className="sliding-scale-icon">💚</div>
            <div className="sliding-scale-content">
              <strong>Can't afford the full price?</strong>
              <p>
                We offer sliding scale pricing (£10-{selectedTierData.price}/month) for people on 
                Universal Credit, low income, or students. No one turned away for money.
              </p>
              <button
                type="button"
                onClick={handleSlidingScaleToggle}
                className="sliding-scale-toggle"
              >
                {showSlidingScale ? 'Use Standard Pricing' : 'Request Sliding Scale'}
              </button>
            </div>
          </div>

          {/* Sliding Scale Form */}
          {showSlidingScale && (
            <div className="sliding-scale-form">
              <h3>Sliding Scale Request</h3>
              <p>
                Tell us what you can afford (£10-{selectedTierData.price}/month). 
                This is honor system—we trust you.
              </p>
              <div className="form-group">
                <label htmlFor="slidingScaleAmount" className="form-label">
                  Monthly amount you can pay
                </label>
                <div className="currency-input">
                  <span className="currency-symbol">£</span>
                  <input
                    id="slidingScaleAmount"
                    type="number"
                    name="slidingScaleAmount"
                    value={formData.slidingScaleAmount}
                    onChange={handleChange}
                    className={`form-input ${errors.slidingScaleAmount ? 'error' : ''}`}
                    placeholder={`10-${selectedTierData.price}`}
                    min="10"
                    max={selectedTierData.price}
                    step="1"
                  />
                </div>
                {errors.slidingScaleAmount && (
                  <p className="form-error">{errors.slidingScaleAmount}</p>
                )}
                <p className="form-hint">
                  We'll manually review and approve within 24 hours. You won't be charged until approved.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Registration Form */}
        <section className="registration-section">
          <h2 className="section-title">Your Information</h2>

          {/* Error Alert */}
          {errors.form && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <span>{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="join-form">
            
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter first name"
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter last name"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="form-error">{errors.email}</p>
                )}
                <p className="form-hint">We'll send your welcome email and WhatsApp invite here</p>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="optional">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="07123 456789"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone}</p>
                )}
                <p className="form-hint">For WhatsApp group invite</p>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && (
                <p className="form-error">{errors.dateOfBirth}</p>
              )}
              <p className="form-hint">
                We serve ages 13-67+. Some programmes are age-specific, so we need this to recommend the right ones.
              </p>
            </div>

            {/* Terms & Checkboxes */}
            <div className="checkbox-section">
              <label className={`checkbox-label ${errors.agreeToTerms ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="checkbox-input"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="inline-link">
                    Terms of Service
                  </Link>{' '}
                  <span className="required">*</span>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="form-error checkbox-error">{errors.agreeToTerms}</p>
              )}

              <label className={`checkbox-label ${errors.agreeToPrivacy ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="checkbox-input"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/privacy" target="_blank" className="inline-link">
                    Privacy Policy
                  </Link>{' '}
                  <span className="required">*</span>
                </span>
              </label>
              {errors.agreeToPrivacy && (
                <p className="form-error checkbox-error">{errors.agreeToPrivacy}</p>
              )}

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="checkbox-input"
                />
                <span>
                  I'd like to receive updates about programmes, events, and community news (you can unsubscribe anytime)
                </span>
              </label>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Membership Tier:</span>
                <strong>{selectedTierData.name}</strong>
              </div>
              <div className="summary-row">
                <span>Billing:</span>
                <strong>Monthly (cancel anytime)</strong>
              </div>
              <div className="summary-row total">
                <span>Total Today:</span>
                <strong>
                  £{formData.needsSlidingScale && formData.slidingScaleAmount 
                    ? formData.slidingScaleAmount 
                    : selectedTierData.price}/month
                </strong>
              </div>
              {formData.needsSlidingScale && (
                <p className="summary-note">
                  ⏳ Sliding scale requests are manually reviewed within 24 hours. 
                  You won't be charged until approved.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment →
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Secure Checkout (Stripe)</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">↩️</span>
                <span>Cancel Anytime</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💰</span>
                <span>First Month Refundable</span>
              </div>
            </div>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="join-faq-section">
          <h2 className="section-title">Common Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>When will I be charged?</h3>
              <p>
                You'll be charged today for your first month. Then automatically on the same date 
                each month until you cancel. Cancel anytime in your Stripe portal (link in welcome email).
              </p>
            </div>

            <div className="faq-item">
              <h3>What happens after I pay?</h3>
              <p>
                You'll receive a welcome email with: (1) WhatsApp group invite, (2) Session schedule, 
                (3) Equipment booking instructions, (4) Your first steps. Check your email within 10 minutes.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I really cancel anytime?</h3>
              <p>
                Yes! No contracts. No penalties. Cancel in your Stripe Customer Portal with one click. 
                If you cancel before your next billing date, you keep access until the period ends.
              </p>
            </div>

            <div className="faq-item">
              <h3>What if I'm not happy?</h3>
              <p>
                If you're not satisfied in your first month, email us at hello@wembleywonders.org 
                within 30 days and we'll refund you. No questions asked.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JoinPage;
