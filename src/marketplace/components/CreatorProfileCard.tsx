/**
 * CREATOR PROFILE CARD COMPONENT
 * 
 * Displays a creator's profile summary with skills,
 * ratings, and availability.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React from 'react';
import type { CreatorProfile } from '../types';
import { PROGRAMME_INFO, getAvailableCombinations } from '../data/skillCombinations';
import './CreatorProfileCard.css';

export interface CreatorProfileCardProps {
  creator: CreatorProfile;
  onViewProfile?: (creator: CreatorProfile) => void;
  onContact?: (creator: CreatorProfile) => void;
  showCombinations?: boolean;
  compact?: boolean;
}

export const CreatorProfileCard: React.FC<CreatorProfileCardProps> = ({
  creator,
  onViewProfile,
  onContact,
  showCombinations = true,
  compact = false
}) => {
  const completedProgrammeIds = creator.completedProgrammes.map(p => p.programmeId);
  const combinations = getAvailableCombinations(completedProgrammeIds);
  
  const handleViewProfile = () => {
    onViewProfile?.(creator);
  };
  
  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    onContact?.(creator);
  };
  
  const getAvailabilityClass = () => {
    switch (creator.availability) {
      case 'available': return 'creator-card__availability--available';
      case 'limited': return 'creator-card__availability--limited';
      case 'unavailable': return 'creator-card__availability--unavailable';
      default: return '';
    }
  };
  
  const getAvailabilityText = () => {
    switch (creator.availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited Availability';
      case 'unavailable': return 'Unavailable';
      default: return '';
    }
  };

  return (
    <article 
      className={`creator-card ${compact ? 'creator-card--compact' : ''}`}
      onClick={handleViewProfile}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleViewProfile()}
    >
      {/* Header with avatar */}
      <div className="creator-card__header">
        <div className="creator-card__avatar-container">
          <img 
            src={creator.avatar || '/images/default-avatar.jpg'} 
            alt={creator.displayName}
            className="creator-card__avatar"
          />
          {creator.verified && (
            <span className="creator-card__verified" title="Verified Creator">
              ✓
            </span>
          )}
        </div>
        
        <div className="creator-card__header-info">
          <h3 className="creator-card__name">{creator.displayName}</h3>
          <p className="creator-card__tagline">{creator.tagline}</p>
          
          <div className="creator-card__location">
            📍 {creator.location.area}, {creator.location.borough}
            {creator.location.canWorkRemote && (
              <span className="creator-card__remote-badge">🌐 Remote</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Programmes */}
      <div className="creator-card__programmes">
        {creator.completedProgrammes.map(prog => {
          const info = PROGRAMME_INFO[prog.programmeId];
          return (
            <span 
              key={prog.programmeId}
              className="creator-card__programme-badge"
              style={{ backgroundColor: info?.color || '#6B7280' }}
              title={info?.name}
            >
              {info?.icon}
            </span>
          );
        })}
      </div>
      
      {/* Combinations */}
      {showCombinations && combinations.length > 0 && !compact && (
        <div className="creator-card__combinations">
          <span className="creator-card__combinations-label">
            🔗 {combinations.length} skill combination{combinations.length > 1 ? 's' : ''}
          </span>
          <div className="creator-card__combination-names">
            {combinations.slice(0, 2).map(combo => (
              <span key={combo.id} className="creator-card__combination-name">
                {combo.name}
              </span>
            ))}
            {combinations.length > 2 && (
              <span className="creator-card__combination-more">
                +{combinations.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Stats */}
      <div className="creator-card__stats">
        <div className="creator-card__stat">
          <span className="creator-card__stat-value">
            ⭐ {creator.ratings.overall.toFixed(1)}
          </span>
          <span className="creator-card__stat-label">
            ({creator.ratings.totalReviews} reviews)
          </span>
        </div>
        
        {!compact && (
          <>
            <div className="creator-card__stat">
              <span className="creator-card__stat-value">
                {creator.products.length + creator.services.length}
              </span>
              <span className="creator-card__stat-label">listings</span>
            </div>
            
            {creator.openToCollaboration && (
              <div className="creator-card__stat creator-card__stat--collab">
                <span className="creator-card__stat-value">🤝</span>
                <span className="creator-card__stat-label">Open to collab</span>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer */}
      <div className="creator-card__footer">
        <span className={`creator-card__availability ${getAvailabilityClass()}`}>
          {getAvailabilityText()}
        </span>
        
        {onContact && creator.availability !== 'unavailable' && (
          <button 
            className="creator-card__contact-btn"
            onClick={handleContact}
          >
            Contact
          </button>
        )}
      </div>
    </article>
  );
};

export default CreatorProfileCard;
