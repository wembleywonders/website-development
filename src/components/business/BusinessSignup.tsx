import React, { useState } from 'react';
import { BusinessSponsor } from '../../types/business';
import { businessService } from '../../services/business/businessService';
import './BusinessSignup.css';

const BusinessSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    tier: 'bronze' as const,
    services: '',
    targetAudience: '',
    specialOffers: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const tierPricing = {
    bronze: 25,
    silver: 50,
    gold: 100,
    platinum: 200
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const sponsorData = {
        ...formData,
        services: formData.services.split(',').map(s => s.trim()),
        monthlyFee: tierPricing[formData.tier],
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };
      
      await businessService.createSponsor(sponsorData);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="business-signup">
      <h2>Partner with Wembley Wonders</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tier">Sponsorship Tier</label>
          <select
            id="tier"
            value={formData.tier}
            onChange={(e) => setFormData({...formData, tier: e.target.value as any})}
          >
            <option value="bronze">Bronze - £25/month</option>
            <option value="silver">Silver - £50/month</option>
            <option value="gold">Gold - £100/month</option>
            <option value="platinum">Platinum - £200/month</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Business Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : `Sign Up - £${tierPricing[formData.tier]}/month`}
        </button>
      </form>

      {submitStatus === 'success' && (
        <div className="success-message">
          Application submitted successfully! We'll contact you within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message">
          Something went wrong. Please try again or contact us directly.
        </div>
      )}
    </div>
  );
};

export default BusinessSignup;
