// src/studio/CyberstoreDock.tsx
// Dock panel for listing beats on Cyberstore directly from the studio

import React, { useState } from 'react';
import { 
  Store, Upload, DollarSign, Tag, Music, Info, 
  Check, AlertCircle, ChevronDown, ChevronUp,
  Shield, Users, Layers, Play, FileAudio, X
} from 'lucide-react';
import './CyberstoreDock.css';

interface BeatMetadata {
  title: string;
  description: string;
  bpm: number;
  key: string;
  genre: string;
  tags: string[];
  mood: string[];
}

interface LicenseTier {
  id: string;
  name: string;
  price: number;
  enabled: boolean;
  features: string[];
  maxStreams: string;
  creditRequired: boolean;
}

interface CyberstoreDockProps {
  beatData?: {
    audioBlob?: Blob;
    stemsAvailable?: boolean;
    duration?: number;
  };
  onClose?: () => void;
  onListingComplete?: (listingId: string) => void;
  isOpen: boolean;
}

const DEFAULT_LICENSE_TIERS: LicenseTier[] = [
  {
    id: 'mp3-lease',
    name: 'MP3 Lease',
    price: 25,
    enabled: true,
    features: ['MP3 file (320kbps)', 'Non-exclusive license', 'Distribute up to 5,000 copies'],
    maxStreams: '100,000',
    creditRequired: true
  },
  {
    id: 'wav-lease',
    name: 'WAV Lease',
    price: 50,
    enabled: true,
    features: ['WAV + MP3 files', 'Non-exclusive license', 'Distribute up to 10,000 copies', 'Music videos allowed'],
    maxStreams: '500,000',
    creditRequired: true
  },
  {
    id: 'trackout',
    name: 'Trackout/Stems',
    price: 100,
    enabled: true,
    features: ['Individual stems (WAV)', 'Full mixing control', 'Distribute up to 25,000 copies', 'Music videos + performances'],
    maxStreams: '1,000,000',
    creditRequired: true
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 200,
    enabled: true,
    features: ['WAV + Stems', 'Unlimited distribution', 'Unlimited streams', 'Radio, TV, Film sync'],
    maxStreams: 'Unlimited',
    creditRequired: false
  },
  {
    id: 'exclusive',
    name: 'Exclusive Rights',
    price: 500,
    enabled: false,
    features: ['Full ownership transfer', 'Beat removed from store', 'All rights included', 'Resale rights'],
    maxStreams: 'Unlimited',
    creditRequired: false
  }
];

const GENRES = [
  'Afrobeats', 'Amapiano', 'Dancehall', 'Drill', 'Grime', 
  'Hip Hop', 'Lo-Fi', 'R&B', 'Reggae', 'Soca', 
  'Trap', 'UK Garage', 'UK Rap', 'Other'
];

const KEYS = [
  'C major', 'C minor', 'C# major', 'C# minor',
  'D major', 'D minor', 'D# major', 'D# minor',
  'E major', 'E minor',
  'F major', 'F minor', 'F# major', 'F# minor',
  'G major', 'G minor', 'G# major', 'G# minor',
  'A major', 'A minor', 'A# major', 'A# minor',
  'B major', 'B minor'
];

const MOODS = [
  'Aggressive', 'Bouncy', 'Chill', 'Dark', 'Energetic',
  'Emotional', 'Happy', 'Hype', 'Melodic', 'Sad',
  'Smooth', 'Uplifting', 'Vibey'
];

const CyberstoreDock: React.FC<CyberstoreDockProps> = ({
  beatData,
  onClose,
  onListingComplete,
  isOpen
}) => {
  // State
  const [currentStep, setCurrentStep] = useState<'metadata' | 'licensing' | 'preview' | 'submit'>('metadata');
  const [metadata, setMetadata] = useState<BeatMetadata>({
    title: '',
    description: '',
    bpm: 120,
    key: 'C minor',
    genre: 'Hip Hop',
    tags: [],
    mood: []
  });
  const [licenseTiers, setLicenseTiers] = useState<LicenseTier[]>(DEFAULT_LICENSE_TIERS);
  const [tagInput, setTagInput] = useState('');
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handlers
  const handleMetadataChange = (field: keyof BeatMetadata, value: any) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && metadata.tags.length < 10) {
      const newTag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
      if (!metadata.tags.includes(newTag)) {
        setMetadata(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setMetadata(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleMoodToggle = (mood: string) => {
    setMetadata(prev => ({
      ...prev,
      mood: prev.mood.includes(mood)
        ? prev.mood.filter(m => m !== mood)
        : prev.mood.length < 3 ? [...prev.mood, mood] : prev.mood
    }));
  };

  const handleLicensePriceChange = (tierId: string, price: number) => {
    setLicenseTiers(prev => prev.map(tier => 
      tier.id === tierId ? { ...tier, price: Math.max(0, price) } : tier
    ));
  };

  const handleLicenseToggle = (tierId: string) => {
    setLicenseTiers(prev => prev.map(tier => 
      tier.id === tierId ? { ...tier, enabled: !tier.enabled } : tier
    ));
  };

  const validateMetadata = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!metadata.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (metadata.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!metadata.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (metadata.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (metadata.bpm < 60 || metadata.bpm > 200) {
      newErrors.bpm = 'BPM must be between 60 and 200';
    }
    
    if (metadata.tags.length < 3) {
      newErrors.tags = 'Add at least 3 tags';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 'metadata') {
      if (validateMetadata()) {
        setCurrentStep('licensing');
      }
    } else if (currentStep === 'licensing') {
      const enabledTiers = licenseTiers.filter(t => t.enabled);
      if (enabledTiers.length === 0) {
        setErrors({ licensing: 'Enable at least one license tier' });
      } else {
        setErrors({});
        setCurrentStep('preview');
      }
    } else if (currentStep === 'preview') {
      setCurrentStep('submit');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'licensing') setCurrentStep('metadata');
    else if (currentStep === 'preview') setCurrentStep('licensing');
    else if (currentStep === 'submit') setCurrentStep('preview');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, this would:
    // 1. Upload audio files to storage
    // 2. Create listing in database
    // 3. Return listing ID
    
    const mockListingId = `beat-${Date.now()}`;
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    if (onListingComplete) {
      onListingComplete(mockListingId);
    }
  };

  const calculateCreatorEarnings = (price: number): number => {
    return price * 0.55; // 55% to creator
  };

  if (!isOpen) return null;

  return (
    <div className="cyberstore-dock">
      {/* Header */}
      <div className="dock-header">
        <div className="dock-title">
          <Store size={24} />
          <div>
            <h2>List on Cyberstore</h2>
            <p>Sell your beat • Keep 55%</p>
          </div>
        </div>
        {onClose && (
          <button className="dock-close" onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="dock-progress">
        <div className={`progress-step ${currentStep === 'metadata' ? 'active' : ''} ${['licensing', 'preview', 'submit'].includes(currentStep) ? 'completed' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Details</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${currentStep === 'licensing' ? 'active' : ''} ${['preview', 'submit'].includes(currentStep) ? 'completed' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Licensing</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${currentStep === 'preview' ? 'active' : ''} ${currentStep === 'submit' ? 'completed' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Preview</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${currentStep === 'submit' ? 'active' : ''} ${submitSuccess ? 'completed' : ''}`}>
          <span className="step-number">4</span>
          <span className="step-label">Submit</span>
        </div>
      </div>

      {/* Content */}
      <div className="dock-content">
        
        {/* Step 1: Metadata */}
        {currentStep === 'metadata' && (
          <div className="step-content">
            <h3>Beat Details</h3>
            
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => handleMetadataChange('title', e.target.value)}
                placeholder="e.g., Caribbean Sunset Riddim"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={metadata.description}
                onChange={(e) => handleMetadataChange('description', e.target.value)}
                placeholder="Describe your beat - style, vibe, what it's good for..."
                rows={3}
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
              <span className="char-count">{metadata.description.length}/500</span>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>BPM *</label>
                <input
                  type="number"
                  value={metadata.bpm}
                  onChange={(e) => handleMetadataChange('bpm', parseInt(e.target.value) || 0)}
                  min={60}
                  max={200}
                  className={errors.bpm ? 'error' : ''}
                />
                {errors.bpm && <span className="error-text">{errors.bpm}</span>}
              </div>
              <div className="form-group half">
                <label>Key *</label>
                <select
                  value={metadata.key}
                  onChange={(e) => handleMetadataChange('key', e.target.value)}
                >
                  {KEYS.map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Genre *</label>
              <select
                value={metadata.genre}
                onChange={(e) => handleMetadataChange('genre', e.target.value)}
              >
                {GENRES.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Mood (select up to 3)</label>
              <div className="mood-grid">
                {MOODS.map(mood => (
                  <button
                    key={mood}
                    type="button"
                    className={`mood-btn ${metadata.mood.includes(mood) ? 'selected' : ''}`}
                    onClick={() => handleMoodToggle(mood)}
                    disabled={!metadata.mood.includes(mood) && metadata.mood.length >= 3}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tags * (at least 3)</label>
              <div className="tag-input-wrapper">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag and press Enter"
                />
                <button type="button" onClick={handleAddTag}>Add</button>
              </div>
              {errors.tags && <span className="error-text">{errors.tags}</span>}
              <div className="tags-list">
                {metadata.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)}>×</button>
                  </span>
                ))}
              </div>
              <span className="helper-text">Suggestions: {metadata.genre.toLowerCase()}, instrumental, {metadata.mood[0]?.toLowerCase() || 'chill'}</span>
            </div>
          </div>
        )}

        {/* Step 2: Licensing */}
        {currentStep === 'licensing' && (
          <div className="step-content">
            <h3>Set Your Prices</h3>
            <p className="step-intro">
              Choose which licenses to offer and set your prices. 
              <strong> You keep 55%</strong> of every sale.
            </p>

            {errors.licensing && (
              <div className="error-banner">
                <AlertCircle size={16} />
                {errors.licensing}
              </div>
            )}

            <div className="license-tiers">
              {licenseTiers.map(tier => (
                <div 
                  key={tier.id} 
                  className={`license-tier ${tier.enabled ? 'enabled' : 'disabled'}`}
                >
                  <div className="tier-header">
                    <label className="tier-toggle">
                      <input
                        type="checkbox"
                        checked={tier.enabled}
                        onChange={() => handleLicenseToggle(tier.id)}
                      />
                      <span className="toggle-slider" />
                    </label>
                    <div className="tier-info">
                      <h4>{tier.name}</h4>
                      {tier.id === 'wav-lease' && <span className="popular-tag">Most Popular</span>}
                    </div>
                    <button 
                      className="tier-expand"
                      onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                    >
                      {expandedTier === tier.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {tier.enabled && (
                    <div className="tier-pricing">
                      <div className="price-input">
                        <span className="currency">£</span>
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) => handleLicensePriceChange(tier.id, parseInt(e.target.value) || 0)}
                          min={0}
                        />
                      </div>
                      <div className="earnings-preview">
                        <span>You earn:</span>
                        <strong>£{calculateCreatorEarnings(tier.price).toFixed(2)}</strong>
                      </div>
                    </div>
                  )}

                  {expandedTier === tier.id && (
                    <div className="tier-details">
                      <ul>
                        {tier.features.map((feature, idx) => (
                          <li key={idx}>
                            <Check size={14} />
                            {feature}
                          </li>
                        ))}
                        <li>
                          <Music size={14} />
                          Max streams: {tier.maxStreams}
                        </li>
                        <li>
                          {tier.creditRequired ? (
                            <><Info size={14} /> Credit required</>
                          ) : (
                            <><Check size={14} /> No credit required</>
                          )}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stems Notice */}
            {beatData?.stemsAvailable && (
              <div className="stems-notice">
                <Layers size={20} />
                <div>
                  <strong>Stems Available</strong>
                  <p>Your trackout/stems license will include individual track files.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Preview */}
        {currentStep === 'preview' && (
          <div className="step-content">
            <h3>Preview Your Listing</h3>
            <p className="step-intro">This is how your beat will appear in the Cyberstore.</p>

            <div className="listing-preview">
              <div className="preview-card">
                <div className="preview-play">
                  <Play size={32} />
                </div>
                <div className="preview-info">
                  <h4>{metadata.title || 'Untitled Beat'}</h4>
                  <p className="preview-creator">by You</p>
                  <div className="preview-meta">
                    <span>{metadata.bpm} BPM</span>
                    <span>{metadata.key}</span>
                    <span>{metadata.genre}</span>
                  </div>
                </div>
                {beatData?.stemsAvailable && (
                  <div className="preview-stems-badge">
                    <Layers size={14} />
                  </div>
                )}
              </div>

              <p className="preview-description">{metadata.description}</p>

              <div className="preview-tags">
                {metadata.tags.map(tag => (
                  <span key={tag} className="preview-tag">{tag}</span>
                ))}
              </div>

              <div className="preview-moods">
                {metadata.mood.map(mood => (
                  <span key={mood} className="preview-mood">{mood}</span>
                ))}
              </div>

              <div className="preview-licenses">
                <h5>Available Licenses</h5>
                {licenseTiers.filter(t => t.enabled).map(tier => (
                  <div key={tier.id} className="preview-license">
                    <span className="license-name">{tier.name}</span>
                    <span className="license-price">£{tier.price}</span>
                  </div>
                ))}
              </div>

              <div className="preview-earnings">
                <Shield size={16} />
                <span>Protected by Wembley Wonders Creator Agreement</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Submit */}
        {currentStep === 'submit' && (
          <div className="step-content submit-step">
            {!submitSuccess ? (
              <>
                <h3>Ready to List</h3>
                <div className="submit-summary">
                  <div className="summary-item">
                    <FileAudio size={20} />
                    <div>
                      <strong>{metadata.title}</strong>
                      <span>{metadata.bpm} BPM • {metadata.key} • {metadata.genre}</span>
                    </div>
                  </div>

                  <div className="summary-item">
                    <DollarSign size={20} />
                    <div>
                      <strong>{licenseTiers.filter(t => t.enabled).length} License Tiers</strong>
                      <span>Starting at £{Math.min(...licenseTiers.filter(t => t.enabled).map(t => t.price))}</span>
                    </div>
                  </div>

                  <div className="summary-item">
                    <Users size={20} />
                    <div>
                      <strong>55% Creator Revenue</strong>
                      <span>25% Community • 20% Platform</span>
                    </div>
                  </div>
                </div>

                <div className="terms-agreement">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I confirm this is original work and I have the rights to sell it. 
                      I agree to the <a href="/about#agreement" target="_blank">Creator Agreement</a>.
                    </span>
                  </label>
                </div>

                <button 
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Listing Your Beat...
                    </>
                  ) : (
                    <>
                      <Store size={20} />
                      List on Cyberstore
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="submit-success">
                <div className="success-icon">
                  <Check size={48} />
                </div>
                <h3>Beat Listed Successfully! 🎉</h3>
                <p>
                  <strong>{metadata.title}</strong> is now live on the Cyberstore.
                  Share it with your audience and start earning.
                </p>
                <div className="success-actions">
                  <a href="/cyberstore" className="btn-view-listing">
                    View in Cyberstore
                  </a>
                  <button className="btn-share">
                    Share Link
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      {!submitSuccess && (
        <div className="dock-footer">
          {currentStep !== 'metadata' && (
            <button className="btn-back" onClick={handlePrevStep}>
              ← Back
            </button>
          )}
          {currentStep !== 'submit' && (
            <button className="btn-next" onClick={handleNextStep}>
              {currentStep === 'preview' ? 'Continue to Submit' : 'Next →'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CyberstoreDock;