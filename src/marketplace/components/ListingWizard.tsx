/**
 * LISTING WIZARD COMPONENT
 * 
 * Unified wizard for creating both product and service listings
 * with programme-aware suggestions and guidance.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';
import type { ProgrammeId, ItemType } from '../types';
import { PROGRAMME_INFO, SINGLE_PROGRAMME_PRODUCTS } from '../data/skillCombinations';
import { getListingPrompts } from '../rovs/marketplaceROV';
import './ListingWizard.css';

export interface ListingWizardProps {
  completedProgrammes: ProgrammeId[];
  initialType?: ItemType;
  initialSuggestion?: string;
  onComplete: (listing: ListingData) => void;
  onCancel: () => void;
}

export interface ListingData {
  type: ItemType;
  programmeId: ProgrammeId;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

type WizardStep = 'type' | 'programme' | 'suggestion' | 'details' | 'preview';

export const ListingWizard: React.FC<ListingWizardProps> = ({
  completedProgrammes,
  initialType,
  initialSuggestion,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(initialType ? 'programme' : 'type');
  const [listingData, setListingData] = useState<Partial<ListingData>>({
    type: initialType || 'product',
    title: initialSuggestion || ''
  });
  
  const updateData = (updates: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...updates }));
  };
  
  const selectedProgrammeInfo = listingData.programmeId 
    ? PROGRAMME_INFO[listingData.programmeId] 
    : null;
  
  const listingPrompts = listingData.programmeId 
    ? getListingPrompts(listingData.programmeId)
    : null;
  
  const goToStep = (step: WizardStep) => {
    setCurrentStep(step);
  };
  
  const handleComplete = () => {
    if (listingData.type && listingData.programmeId && listingData.title && listingData.price) {
      onComplete(listingData as ListingData);
    }
  };

  return (
    <div className="listing-wizard">
      {/* Progress */}
      <div className="listing-wizard__progress">
        <div className={`listing-wizard__step ${currentStep === 'type' ? 'listing-wizard__step--active' : ''}`}>
          <span>1</span> Type
        </div>
        <div className={`listing-wizard__step ${currentStep === 'programme' ? 'listing-wizard__step--active' : ''}`}>
          <span>2</span> Programme
        </div>
        <div className={`listing-wizard__step ${currentStep === 'suggestion' ? 'listing-wizard__step--active' : ''}`}>
          <span>3</span> Idea
        </div>
        <div className={`listing-wizard__step ${currentStep === 'details' ? 'listing-wizard__step--active' : ''}`}>
          <span>4</span> Details
        </div>
        <div className={`listing-wizard__step ${currentStep === 'preview' ? 'listing-wizard__step--active' : ''}`}>
          <span>5</span> Preview
        </div>
      </div>
      
      <div className="listing-wizard__content">
        {/* Step 1: Type Selection */}
        {currentStep === 'type' && (
          <div className="listing-wizard__section">
            <h2>What would you like to create?</h2>
            <p className="listing-wizard__hint">
              Choose the type of listing you want to create
            </p>
            
            <div className="listing-wizard__type-cards">
              <button
                className={`listing-wizard__type-card ${listingData.type === 'product' ? 'listing-wizard__type-card--selected' : ''}`}
                onClick={() => updateData({ type: 'product' })}
              >
                <span className="listing-wizard__type-icon">📦</span>
                <h3>Product</h3>
                <p>Digital downloads, physical items, templates, courses</p>
                <ul>
                  <li>Sell once, earn repeatedly (digital)</li>
                  <li>55% creator share</li>
                  <li>Instant or shipped delivery</li>
                </ul>
              </button>
              
              <button
                className={`listing-wizard__type-card ${listingData.type === 'service' ? 'listing-wizard__type-card--selected' : ''}`}
                onClick={() => updateData({ type: 'service' })}
              >
                <span className="listing-wizard__type-icon">🛠️</span>
                <h3>Service</h3>
                <p>Custom work, consultations, workshops, sessions</p>
                <ul>
                  <li>Trade time for higher rates</li>
                  <li>60% creator share</li>
                  <li>Build client relationships</li>
                </ul>
              </button>
              
              <button
                className={`listing-wizard__type-card ${listingData.type === 'package' ? 'listing-wizard__type-card--selected' : ''}`}
                onClick={() => updateData({ type: 'package' })}
              >
                <span className="listing-wizard__type-icon">🎁</span>
                <h3>Package</h3>
                <p>Combine products + services for premium offerings</p>
                <ul>
                  <li>Higher value bundles</li>
                  <li>58% creator share</li>
                  <li>Collaboration friendly</li>
                </ul>
              </button>
            </div>
            
            <div className="listing-wizard__actions">
              <button 
                className="listing-wizard__btn listing-wizard__btn--secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button 
                className="listing-wizard__btn listing-wizard__btn--primary"
                onClick={() => goToStep('programme')}
                disabled={!listingData.type}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Programme Selection */}
        {currentStep === 'programme' && (
          <div className="listing-wizard__section">
            <h2>Which programme does this come from?</h2>
            <p className="listing-wizard__hint">
              Select the programme that taught you these skills
            </p>
            
            <div className="listing-wizard__programme-grid">
              {completedProgrammes.map(progId => {
                const info = PROGRAMME_INFO[progId];
                const products = SINGLE_PROGRAMME_PRODUCTS.find(p => p.programmeId === progId);
                return (
                  <button
                    key={progId}
                    className={`listing-wizard__programme-card ${listingData.programmeId === progId ? 'listing-wizard__programme-card--selected' : ''}`}
                    onClick={() => updateData({ programmeId: progId })}
                  >
                    <span 
                      className="listing-wizard__programme-icon"
                      style={{ backgroundColor: info?.color }}
                    >
                      {info?.icon}
                    </span>
                    <h3>{info?.name}</h3>
                    <p>
                      {listingData.type === 'product' && products 
                        ? `${products.products.length} product types`
                        : listingData.type === 'service' && products
                        ? `${products.services.length} service types`
                        : 'Multiple options'}
                    </p>
                  </button>
                );
              })}
            </div>
            
            <div className="listing-wizard__actions">
              <button 
                className="listing-wizard__btn listing-wizard__btn--secondary"
                onClick={() => goToStep('type')}
              >
                Back
              </button>
              <button 
                className="listing-wizard__btn listing-wizard__btn--primary"
                onClick={() => goToStep('suggestion')}
                disabled={!listingData.programmeId}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Suggestion Selection */}
        {currentStep === 'suggestion' && listingPrompts && (
          <div className="listing-wizard__section">
            <h2>What would you like to offer?</h2>
            <p className="listing-wizard__hint">
              Choose from suggestions or enter your own idea
            </p>
            
            <div 
              className="listing-wizard__programme-header"
              style={{ backgroundColor: selectedProgrammeInfo?.color }}
            >
              <span>{selectedProgrammeInfo?.icon}</span>
              <span>{selectedProgrammeInfo?.name}</span>
            </div>
            
            <div className="listing-wizard__suggestions">
              <h4>
                {listingData.type === 'product' ? 'Product Ideas' : 'Service Ideas'}
              </h4>
              <div className="listing-wizard__suggestion-grid">
                {(listingData.type === 'product' ? listingPrompts.products : listingPrompts.services).map((item, index) => (
                  <button
                    key={index}
                    className={`listing-wizard__suggestion ${listingData.title === item ? 'listing-wizard__suggestion--selected' : ''}`}
                    onClick={() => updateData({ title: item })}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              <div className="listing-wizard__custom-input">
                <label>Or enter your own:</label>
                <input
                  type="text"
                  value={listingData.title || ''}
                  onChange={(e) => updateData({ title: e.target.value })}
                  placeholder="My custom offering..."
                />
              </div>
            </div>
            
            {/* Tips */}
            <div className="listing-wizard__tips">
              <h4>💡 Tips for {selectedProgrammeInfo?.shortName}</h4>
              <ul>
                {listingPrompts.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="listing-wizard__actions">
              <button 
                className="listing-wizard__btn listing-wizard__btn--secondary"
                onClick={() => goToStep('programme')}
              >
                Back
              </button>
              <button 
                className="listing-wizard__btn listing-wizard__btn--primary"
                onClick={() => goToStep('details')}
                disabled={!listingData.title}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Details */}
        {currentStep === 'details' && (
          <div className="listing-wizard__section">
            <h2>Add the details</h2>
            <p className="listing-wizard__hint">
              Describe your {listingData.type} and set your price
            </p>
            
            <div className="listing-wizard__form">
              <div className="listing-wizard__field">
                <label>Title</label>
                <input
                  type="text"
                  value={listingData.title || ''}
                  onChange={(e) => updateData({ title: e.target.value })}
                  placeholder="Give it a catchy title"
                />
              </div>
              
              <div className="listing-wizard__field">
                <label>Description</label>
                <textarea
                  value={listingData.description || ''}
                  onChange={(e) => updateData({ description: e.target.value })}
                  placeholder="Describe what you're offering. What's included? What will the buyer get?"
                  rows={5}
                />
              </div>
              
              <div className="listing-wizard__field">
                <label>Price (£)</label>
                <input
                  type="number"
                  value={listingData.price || ''}
                  onChange={(e) => updateData({ price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {listingData.price && listingData.price > 0 && (
                  <div className="listing-wizard__earnings-preview">
                    You'll earn: <strong>£{(listingData.price * (listingData.type === 'service' ? 0.6 : 0.55)).toFixed(2)}</strong> per sale
                  </div>
                )}
              </div>
            </div>
            
            <div className="listing-wizard__actions">
              <button 
                className="listing-wizard__btn listing-wizard__btn--secondary"
                onClick={() => goToStep('suggestion')}
              >
                Back
              </button>
              <button 
                className="listing-wizard__btn listing-wizard__btn--primary"
                onClick={() => goToStep('preview')}
                disabled={!listingData.title || !listingData.price}
              >
                Preview
              </button>
            </div>
          </div>
        )}
        
        {/* Step 5: Preview */}
        {currentStep === 'preview' && (
          <div className="listing-wizard__section">
            <h2>Preview your listing</h2>
            <p className="listing-wizard__hint">
              Here's how your listing will appear
            </p>
            
            <div className="listing-wizard__preview-card">
              <div className="listing-wizard__preview-image">
                <span>📷</span>
                <p>Add images after creation</p>
              </div>
              
              <div className="listing-wizard__preview-content">
                <div 
                  className="listing-wizard__preview-badge"
                  style={{ backgroundColor: selectedProgrammeInfo?.color }}
                >
                  {selectedProgrammeInfo?.icon} {selectedProgrammeInfo?.shortName}
                </div>
                
                <h3>{listingData.title}</h3>
                <p className="listing-wizard__preview-desc">
                  {listingData.description || 'No description yet'}
                </p>
                
                <div className="listing-wizard__preview-price">
                  <span className="listing-wizard__preview-amount">
                    £{listingData.price?.toFixed(2)}
                  </span>
                  <span className="listing-wizard__preview-type">
                    {listingData.type === 'product' ? '📦 Product' : '🛠️ Service'}
                  </span>
                </div>
                
                <div className="listing-wizard__preview-split">
                  <span>Your earnings: £{((listingData.price || 0) * (listingData.type === 'service' ? 0.6 : 0.55)).toFixed(2)}</span>
                  <span>Community fund: £{((listingData.price || 0) * (listingData.type === 'service' ? 0.2 : 0.25)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="listing-wizard__actions">
              <button 
                className="listing-wizard__btn listing-wizard__btn--secondary"
                onClick={() => goToStep('details')}
              >
                Back
              </button>
              <button 
                className="listing-wizard__btn listing-wizard__btn--primary"
                onClick={handleComplete}
              >
                Create Listing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingWizard;
