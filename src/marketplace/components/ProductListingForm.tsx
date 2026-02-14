/**
 * PRODUCT LISTING FORM COMPONENT
 * 
 * Multi-step form for creating product listings
 * with programme-aware guidance and pricing help.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useEffect } from 'react';
import type { ProgrammeId, Product, ProductCategory, DeliveryMethod } from '../types';
import { PROGRAMME_INFO, SINGLE_PROGRAMME_PRODUCTS } from '../data/skillCombinations';
import { getListingFormTips, getPricingGuidance } from '../rovs/marketplaceROV';
import './ProductListingForm.css';

export interface ProductListingFormProps {
  completedProgrammes: ProgrammeId[];
  initialData?: Partial<Product>;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
  onSaveDraft?: (product: Partial<Product>) => void;
  isEditing?: boolean;
}

type FormStep = 'basics' | 'details' | 'pricing' | 'media' | 'review';

const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'beats-music', label: 'Beats & Music' },
  { value: 'sample-packs', label: 'Sample Packs' },
  { value: 'sound-kits', label: 'Sound Kits' },
  { value: 'fashion-clothing', label: 'Fashion & Clothing' },
  { value: 'fashion-accessories', label: 'Accessories' },
  { value: 'patterns-templates', label: 'Patterns & Templates' },
  { value: 'website-themes', label: 'Website Themes' },
  { value: 'digital-templates', label: 'Digital Templates' },
  { value: 'e-books', label: 'E-Books & Guides' },
  { value: 'courses', label: 'Courses' },
  { value: 'artwork', label: 'Artwork' },
  { value: 'photography', label: 'Photography' },
  { value: 'video-content', label: 'Video Content' },
  { value: 'food-products', label: 'Food Products' },
  { value: 'crafts-handmade', label: 'Crafts & Handmade' },
  { value: 'upcycled-items', label: 'Upcycled Items' },
  { value: 'educational-materials', label: 'Educational Materials' },
  { value: 'other', label: 'Other' }
];

const DELIVERY_METHODS: { value: DeliveryMethod; label: string; description: string }[] = [
  { value: 'instant-download', label: 'Instant Download', description: 'Customer downloads immediately after purchase' },
  { value: 'email-delivery', label: 'Email Delivery', description: 'Sent to customer via email' },
  { value: 'digital-access', label: 'Digital Access', description: 'Access to online content or platform' },
  { value: 'shipping', label: 'Shipping', description: 'Physical item shipped to customer' },
  { value: 'local-pickup', label: 'Local Pickup', description: 'Customer collects in person' },
  { value: 'in-person', label: 'In-Person Delivery', description: 'You deliver to the customer' }
];

export const ProductListingForm: React.FC<ProductListingFormProps> = ({
  completedProgrammes,
  initialData,
  onSubmit,
  onCancel,
  onSaveDraft,
  isEditing = false
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('basics');
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    shortDescription: '',
    category: 'other',
    programmeId: completedProgrammes[0],
    type: 'digital',
    deliveryMethod: 'instant-download',
    tags: [],
    pricing: {
      basePrice: 0,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    status: 'draft',
    ...initialData
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get tips based on current form state
  const tips = getListingFormTips(
    {
      userId: '',
      completedProgrammes,
      workshopsCompleted: {
        "trubble-n-bass": 0,
        "silk-stilettos": 0,
        "techreneurs": 0,
        "gtechcasters": 0,
        "kaywanas-court": 0,
        "pageturners": 0,
        "stemgeneers": 0,
        "scrap-cat": 0,
        "bright-sparks": 0,
        "auntie-anansis-kitchen": 0
      },
      hasListings: false,
      totalSales: 0,
      totalEarnings: 0,
      averageRating: 0,
      currentPage: 'listing-form',
      cartItemCount: 0,
      isNewUser: false
    },
    {
      programmeId: formData.programmeId,
      price: formData.pricing?.basePrice,
      hasImages: false, // Would check actual images
      descriptionLength: formData.description?.length || 0,
      type: 'product'
    }
  );
  
  // Get pricing guidance for selected programme
  const pricingGuidance = formData.programmeId 
    ? getPricingGuidance(formData.programmeId, 'product', formData.category)
    : null;
  
  const updateFormData = (updates: Partial<Product>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  
  const updatePricing = (updates: Partial<Product['pricing']>) => {
    setFormData(prev => ({
      ...prev,
      pricing: { ...prev.pricing!, ...updates }
    }));
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      updateFormData({ tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    updateFormData({ tags: formData.tags?.filter(t => t !== tag) });
  };
  
  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 'basics':
        if (!formData.title?.trim()) newErrors.title = 'Title is required';
        if (!formData.shortDescription?.trim()) newErrors.shortDescription = 'Short description is required';
        if (!formData.programmeId) newErrors.programmeId = 'Select a programme';
        break;
      case 'details':
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (formData.description && formData.description.length < 100) {
          newErrors.description = 'Description should be at least 100 characters';
        }
        break;
      case 'pricing':
        if (!formData.pricing?.basePrice || formData.pricing.basePrice <= 0) {
          newErrors.basePrice = 'Price must be greater than 0';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    
    const steps: FormStep[] = ['basics', 'details', 'pricing', 'media', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const handleBack = () => {
    const steps: FormStep[] = ['basics', 'details', 'pricing', 'media', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };
  
  const handleSubmit = () => {
    onSubmit(formData);
  };
  
  const handleSaveDraft = () => {
    onSaveDraft?.(formData);
  };
  
  const renderStepIndicator = () => {
    const steps: { key: FormStep; label: string }[] = [
      { key: 'basics', label: 'Basics' },
      { key: 'details', label: 'Details' },
      { key: 'pricing', label: 'Pricing' },
      { key: 'media', label: 'Media' },
      { key: 'review', label: 'Review' }
    ];
    
    return (
      <div className="listing-form__steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div 
              className={`listing-form__step ${currentStep === step.key ? 'listing-form__step--active' : ''} ${steps.indexOf({ key: currentStep, label: '' }) > index ? 'listing-form__step--complete' : ''}`}
              onClick={() => setCurrentStep(step.key)}
            >
              <span className="listing-form__step-number">{index + 1}</span>
              <span className="listing-form__step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className="listing-form__step-line" />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="listing-form">
      <div className="listing-form__header">
        <h2 className="listing-form__title">
          {isEditing ? 'Edit Product' : 'Create New Product'}
        </h2>
        {renderStepIndicator()}
      </div>
      
      {/* Tips */}
      {tips.length > 0 && (
        <div className="listing-form__tips">
          {tips.map(tip => (
            <div key={tip.id} className={`listing-form__tip listing-form__tip--${tip.type}`}>
              {tip.type === 'warning' && '⚠️ '}
              {tip.type === 'tip' && '💡 '}
              {tip.message}
            </div>
          ))}
        </div>
      )}
      
      <div className="listing-form__content">
        {/* Step 1: Basics */}
        {currentStep === 'basics' && (
          <div className="listing-form__section">
            <div className="listing-form__field">
              <label className="listing-form__label">Title *</label>
              <input
                type="text"
                className={`listing-form__input ${errors.title ? 'listing-form__input--error' : ''}`}
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder="Give your product a clear, descriptive title"
                maxLength={100}
              />
              {errors.title && <span className="listing-form__error">{errors.title}</span>}
              <span className="listing-form__hint">{formData.title?.length || 0}/100 characters</span>
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Short Description *</label>
              <input
                type="text"
                className={`listing-form__input ${errors.shortDescription ? 'listing-form__input--error' : ''}`}
                value={formData.shortDescription}
                onChange={(e) => updateFormData({ shortDescription: e.target.value })}
                placeholder="One-line summary for search results"
                maxLength={160}
              />
              {errors.shortDescription && <span className="listing-form__error">{errors.shortDescription}</span>}
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Programme *</label>
              <select
                className={`listing-form__select ${errors.programmeId ? 'listing-form__input--error' : ''}`}
                value={formData.programmeId}
                onChange={(e) => updateFormData({ programmeId: e.target.value as ProgrammeId })}
              >
                {completedProgrammes.map(progId => (
                  <option key={progId} value={progId}>
                    {PROGRAMME_INFO[progId]?.icon} {PROGRAMME_INFO[progId]?.name}
                  </option>
                ))}
              </select>
              {errors.programmeId && <span className="listing-form__error">{errors.programmeId}</span>}
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Category</label>
              <select
                className="listing-form__select"
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value as ProductCategory })}
              >
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Product Type</label>
              <div className="listing-form__radio-group">
                <label className="listing-form__radio">
                  <input
                    type="radio"
                    name="productType"
                    value="digital"
                    checked={formData.type === 'digital'}
                    onChange={() => updateFormData({ type: 'digital', deliveryMethod: 'instant-download' })}
                  />
                  <span>⚡ Digital Product</span>
                </label>
                <label className="listing-form__radio">
                  <input
                    type="radio"
                    name="productType"
                    value="physical"
                    checked={formData.type === 'physical'}
                    onChange={() => updateFormData({ type: 'physical', deliveryMethod: 'shipping' })}
                  />
                  <span>📦 Physical Product</span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Details */}
        {currentStep === 'details' && (
          <div className="listing-form__section">
            <div className="listing-form__field">
              <label className="listing-form__label">Full Description *</label>
              <textarea
                className={`listing-form__textarea ${errors.description ? 'listing-form__input--error' : ''}`}
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Describe your product in detail. What's included? What will the buyer get? How can they use it?"
                rows={8}
              />
              {errors.description && <span className="listing-form__error">{errors.description}</span>}
              <span className="listing-form__hint">{formData.description?.length || 0} characters (minimum 100)</span>
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Tags</label>
              <div className="listing-form__tag-input">
                <input
                  type="text"
                  className="listing-form__input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tags to help buyers find your product"
                />
                <button 
                  type="button" 
                  className="listing-form__tag-add"
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              <div className="listing-form__tags">
                {formData.tags?.map(tag => (
                  <span key={tag} className="listing-form__tag">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="listing-form__field">
              <label className="listing-form__label">Delivery Method</label>
              <div className="listing-form__delivery-options">
                {DELIVERY_METHODS
                  .filter(dm => formData.type === 'digital' 
                    ? ['instant-download', 'email-delivery', 'digital-access'].includes(dm.value)
                    : ['shipping', 'local-pickup', 'in-person'].includes(dm.value)
                  )
                  .map(dm => (
                    <label key={dm.value} className="listing-form__delivery-option">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={dm.value}
                        checked={formData.deliveryMethod === dm.value}
                        onChange={() => updateFormData({ deliveryMethod: dm.value })}
                      />
                      <div className="listing-form__delivery-content">
                        <span className="listing-form__delivery-label">{dm.label}</span>
                        <span className="listing-form__delivery-desc">{dm.description}</span>
                      </div>
                    </label>
                  ))
                }
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Pricing */}
        {currentStep === 'pricing' && (
          <div className="listing-form__section">
            {pricingGuidance && (
              <div className="listing-form__pricing-guidance">
                <h4>💡 Pricing Guidance</h4>
                <p>
                  Similar products typically sell for <strong>£{pricingGuidance.min} - £{pricingGuidance.max}</strong>
                </p>
                <ul>
                  {pricingGuidance.factors.map((factor, i) => (
                    <li key={i}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="listing-form__field">
              <label className="listing-form__label">Price (£) *</label>
              <input
                type="number"
                className={`listing-form__input listing-form__input--price ${errors.basePrice ? 'listing-form__input--error' : ''}`}
                value={formData.pricing?.basePrice || ''}
                onChange={(e) => updatePricing({ basePrice: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.basePrice && <span className="listing-form__error">{errors.basePrice}</span>}
            </div>
            
            {formData.pricing?.basePrice && formData.pricing.basePrice > 0 && (
              <div className="listing-form__revenue-preview">
                <h4>Revenue Split Preview</h4>
                <div className="listing-form__revenue-bars">
                  <div className="listing-form__revenue-bar">
                    <div 
                      className="listing-form__revenue-fill listing-form__revenue-fill--creator"
                      style={{ width: '55%' }}
                    />
                    <span>You: £{(formData.pricing.basePrice * 0.55).toFixed(2)} (55%)</span>
                  </div>
                  <div className="listing-form__revenue-bar">
                    <div 
                      className="listing-form__revenue-fill listing-form__revenue-fill--community"
                      style={{ width: '25%' }}
                    />
                    <span>Community Fund: £{(formData.pricing.basePrice * 0.25).toFixed(2)} (25%)</span>
                  </div>
                  <div className="listing-form__revenue-bar">
                    <div 
                      className="listing-form__revenue-fill listing-form__revenue-fill--operations"
                      style={{ width: '20%' }}
                    />
                    <span>Platform: £{(formData.pricing.basePrice * 0.20).toFixed(2)} (20%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Step 4: Media */}
        {currentStep === 'media' && (
          <div className="listing-form__section">
            <div className="listing-form__field">
              <label className="listing-form__label">Product Images</label>
              <div className="listing-form__upload-zone">
                <div className="listing-form__upload-placeholder">
                  <span className="listing-form__upload-icon">📷</span>
                  <p>Drag and drop images here, or click to browse</p>
                  <p className="listing-form__upload-hint">Recommended: 1200x900px, max 5MB each</p>
                </div>
              </div>
            </div>
            
            {formData.type === 'digital' && (
              <div className="listing-form__field">
                <label className="listing-form__label">Preview File (Optional)</label>
                <div className="listing-form__upload-zone listing-form__upload-zone--small">
                  <p>Upload a preview or sample</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Step 5: Review */}
        {currentStep === 'review' && (
          <div className="listing-form__section listing-form__review">
            <h3>Review Your Listing</h3>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Title:</span>
              <span className="listing-form__review-value">{formData.title}</span>
            </div>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Programme:</span>
              <span className="listing-form__review-value">
                {PROGRAMME_INFO[formData.programmeId!]?.name}
              </span>
            </div>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Price:</span>
              <span className="listing-form__review-value">
                £{formData.pricing?.basePrice?.toFixed(2)}
              </span>
            </div>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Your Earnings:</span>
              <span className="listing-form__review-value listing-form__review-value--highlight">
                £{((formData.pricing?.basePrice || 0) * 0.55).toFixed(2)} per sale
              </span>
            </div>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Type:</span>
              <span className="listing-form__review-value">
                {formData.type === 'digital' ? '⚡ Digital' : '📦 Physical'}
              </span>
            </div>
            
            <div className="listing-form__review-item">
              <span className="listing-form__review-label">Delivery:</span>
              <span className="listing-form__review-value">
                {DELIVERY_METHODS.find(dm => dm.value === formData.deliveryMethod)?.label}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="listing-form__footer">
        <div className="listing-form__footer-left">
          <button 
            type="button" 
            className="listing-form__btn listing-form__btn--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          {onSaveDraft && (
            <button 
              type="button" 
              className="listing-form__btn listing-form__btn--ghost"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
          )}
        </div>
        
        <div className="listing-form__footer-right">
          {currentStep !== 'basics' && (
            <button 
              type="button" 
              className="listing-form__btn listing-form__btn--secondary"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {currentStep !== 'review' ? (
            <button 
              type="button" 
              className="listing-form__btn listing-form__btn--primary"
              onClick={handleNext}
            >
              Continue
            </button>
          ) : (
            <button 
              type="button" 
              className="listing-form__btn listing-form__btn--primary"
              onClick={handleSubmit}
            >
              {isEditing ? 'Update Listing' : 'Publish Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingForm;