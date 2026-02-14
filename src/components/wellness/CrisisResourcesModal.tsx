/**
 * Crisis Resources Modal
 * ======================
 * 
 * Displays UK crisis support resources
 * Used by Emergency ROV specialist
 * 
 * Design principles:
 * - Immediate resources always visible first
 * - Clear, calm visual design
 * - One-tap calling where possible
 * - No barriers to access
 */

import React, { useState } from 'react';
import { 
  CRISIS_RESOURCES, 
  LOCAL_RESOURCES,
  type CrisisResource, 
  type ResourceCategory,
  type LocalResource
} from '../../data/wellness/crisisResources';

// ============================================
// TYPES
// ============================================

interface CrisisResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  showLocalFirst?: boolean;
}

// ============================================
// SUB-COMPONENTS
// ============================================

const ResourceCard: React.FC<{ resource: CrisisResource; priority?: boolean }> = ({ 
  resource, 
  priority = false 
}) => {
  const cardClass = priority 
    ? 'resource-card resource-card--priority' 
    : 'resource-card';

  return (
    <div className={cardClass}>
      <div className="resource-card__header">
        <h4 className="resource-card__name">{resource.name}</h4>
        {resource.free && <span className="resource-card__badge">Free</span>}
        {resource.forUnder19 && <span className="resource-card__badge resource-card__badge--youth">Under 19</span>}
      </div>
      
      <p className="resource-card__description">{resource.description}</p>
      
      <div className="resource-card__contact">
        {resource.phone && (
          <a 
            href={`tel:${resource.phone.replace(/\s/g, '')}`} 
            className="resource-card__phone"
            aria-label={`Call ${resource.name} at ${resource.phone}`}
          >
            <span className="resource-card__icon">📞</span>
            <span className="resource-card__number">{resource.phone}</span>
          </a>
        )}
        
        {resource.text && (
          <div className="resource-card__text">
            <span className="resource-card__icon">💬</span>
            <span>{resource.text}</span>
          </div>
        )}
        
        {resource.website && (
          <a 
            href={resource.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="resource-card__website"
            aria-label={`Visit ${resource.name} website`}
          >
            <span className="resource-card__icon">🌐</span>
            <span>Website</span>
          </a>
        )}
      </div>
      
      <div className="resource-card__hours">
        <span className="resource-card__icon">🕐</span>
        <span>{resource.hours}</span>
      </div>
      
      {/* Accessibility tags */}
      <div className="resource-card__tags">
        {resource.forMen && <span className="resource-card__tag">For men</span>}
        {resource.forWomen && <span className="resource-card__tag">For women</span>}
        {resource.forLGBTQ && <span className="resource-card__tag">LGBTQ+</span>}
        {resource.forBIPOC && <span className="resource-card__tag">Black communities</span>}
      </div>
    </div>
  );
};

const LocalResourceCard: React.FC<{ resource: LocalResource }> = ({ resource }) => {
  return (
    <div className="resource-card resource-card--local">
      <div className="resource-card__header">
        <h4 className="resource-card__name">{resource.name}</h4>
        {resource.walkIn && <span className="resource-card__badge resource-card__badge--walkin">Walk-in</span>}
      </div>
      
      {resource.address && (
        <p className="resource-card__address">
          <span className="resource-card__icon">📍</span>
          {resource.address}
        </p>
      )}
      
      <div className="resource-card__services">
        {resource.services.map((service, idx) => (
          <span key={idx} className="resource-card__service">{service}</span>
        ))}
      </div>
      
      <div className="resource-card__contact">
        {resource.phone && (
          <a 
            href={`tel:${resource.phone.replace(/\s/g, '')}`} 
            className="resource-card__phone"
          >
            <span className="resource-card__icon">📞</span>
            <span className="resource-card__number">{resource.phone}</span>
          </a>
        )}
        
        {resource.website && (
          <a 
            href={resource.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="resource-card__website"
          >
            <span className="resource-card__icon">🌐</span>
            <span>Website</span>
          </a>
        )}
      </div>
      
      <div className="resource-card__hours">
        <span className="resource-card__icon">🕐</span>
        <span>{resource.hours}</span>
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ category: ResourceCategory }> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(category.priority === 'immediate');
  
  return (
    <section className={`category-section category-section--${category.priority}`}>
      <button 
        className="category-section__header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="category-section__icon">{category.icon}</span>
        <div className="category-section__titles">
          <h3 className="category-section__title">{category.title}</h3>
          <p className="category-section__description">{category.description}</p>
        </div>
        <span className={`category-section__chevron ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div className="category-section__content">
          {category.resources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource}
              priority={category.priority === 'immediate'}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const CrisisResourcesModal: React.FC<CrisisResourcesModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  showLocalFirst = false
}) => {
  const [activeTab, setActiveTab] = useState<'national' | 'local'>(
    showLocalFirst ? 'local' : 'national'
  );
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter resources based on search
  const filteredCategories = searchQuery
    ? CRISIS_RESOURCES.map(cat => ({
        ...cat,
        resources: cat.resources.filter(r => 
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.resources.length > 0)
    : CRISIS_RESOURCES;

  const filteredLocalResources = searchQuery
    ? LOCAL_RESOURCES.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : LOCAL_RESOURCES;

  return (
    <div 
      className="crisis-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-modal-title"
    >
      <div 
        className="crisis-modal" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="crisis-modal__header">
          <h2 id="crisis-modal-title" className="crisis-modal__title">
            Support Resources
          </h2>
          <p className="crisis-modal__subtitle">
            You're not alone. Help is available.
          </p>
          <button 
            className="crisis-modal__close"
            onClick={onClose}
            aria-label="Close resources"
          >
            ✕
          </button>
        </header>

        {/* Emergency Banner - Always Visible */}
        <div className="crisis-modal__emergency-banner">
          <div className="emergency-banner__content">
            <span className="emergency-banner__icon">🚨</span>
            <div className="emergency-banner__text">
              <strong>In immediate danger?</strong>
              <span>Call 999 or go to your nearest A&E</span>
            </div>
            <a 
              href="tel:999" 
              className="emergency-banner__call"
              aria-label="Call 999"
            >
              Call 999
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="crisis-modal__search">
          <input
            type="search"
            placeholder="Search for support..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="crisis-modal__search-input"
            aria-label="Search resources"
          />
        </div>

        {/* Tabs */}
        <div className="crisis-modal__tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'national'}
            className={`crisis-modal__tab ${activeTab === 'national' ? 'active' : ''}`}
            onClick={() => setActiveTab('national')}
          >
            National Helplines
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'local'}
            className={`crisis-modal__tab ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            Local (Wembley/Brent)
          </button>
        </div>

        {/* Content */}
        <div className="crisis-modal__content">
          {activeTab === 'national' ? (
            <div className="crisis-modal__national">
              {filteredCategories.map(category => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="crisis-modal__local">
              <p className="crisis-modal__local-intro">
                These services are based in or near Wembley. They understand our community.
              </p>
              {filteredLocalResources.map(resource => (
                <LocalResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="crisis-modal__footer">
          <p>
            All helplines listed are free and confidential.
          </p>
          <p className="crisis-modal__footer-note">
            If you're supporting someone else, the Samaritans can help you too.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CrisisResourcesModal;