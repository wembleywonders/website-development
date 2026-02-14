import React, { useState } from 'react';
import { CommunityBusiness } from '../../../types/business/directory';
import './BusinessCard.css';

interface BusinessCardProps {
  business: CommunityBusiness;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getTierBadge = (tier: string) => {
    const badges = {
      bronze: { color: '#CD7F32', label: 'Bronze Partner' },
      silver: { color: '#C0C0C0', label: 'Silver Partner' },
      gold: { color: '#FFD700', label: 'Gold Partner' },
      platinum: { color: '#E5E4E2', label: 'Platinum Partner' }
    };
    return badges[tier as keyof typeof badges];
  };

  const badge = getTierBadge(business.partnershipTier);

  return (
    <div className="business-card">
      <div className="business-header">
        <div className="business-logo">
          {/* Placeholder for business logo */}
          <div className="logo-placeholder">
            {business.name.charAt(0)}
          </div>
        </div>
        <div className="business-basic-info">
          <h3 className="business-name">{business.name}</h3>
          <div className="business-meta">
            <span className="business-category">
              {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
            </span>
            <span className="partnership-tier" style={{ backgroundColor: badge.color }}>
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <div className="business-description">
        <p>{business.description}</p>
      </div>

      <div className="community-commitment">
        <h4>Community Commitment</h4>
        <p>{business.communityCommitment}</p>
      </div>

      <div className="supported-programmes">
        <h4>Supporting:</h4>
        <div className="programme-tags">
          {business.supportedProgrammes.map(programme => (
            <span key={programme} className="programme-tag">
              {programme}
            </span>
          ))}
        </div>
      </div>

      {business.verifiedOutcomes && (
        <div className="verified-outcomes">
          <h4>Verified Impact:</h4>
          <div className="outcome-stats">
            {business.verifiedOutcomes.studentsSupported && (
              <div className="stat">
                <span className="stat-number">{business.verifiedOutcomes.studentsSupported}</span>
                <span className="stat-label">Students Supported</span>
              </div>
            )}
            {business.verifiedOutcomes.jobsCreated && (
              <div className="stat">
                <span className="stat-number">{business.verifiedOutcomes.jobsCreated}</span>
                <span className="stat-label">Jobs Created</span>
              </div>
            )}
            {business.verifiedOutcomes.projectsSponsored && (
              <div className="stat">
                <span className="stat-number">{business.verifiedOutcomes.projectsSponsored}</span>
                <span className="stat-label">Projects Sponsored</span>
              </div>
            )}
            {business.verifiedOutcomes.eventsSupported && (
              <div className="stat">
                <span className="stat-number">{business.verifiedOutcomes.eventsSupported}</span>
                <span className="stat-label">Events Supported</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="business-contact">
        <div className="contact-info">
          <p className="address">{business.address}</p>
          <p className="phone">{business.phone}</p>
          {business.website && (
            <a href={business.website} target="_blank" rel="noopener noreferrer" className="website-link">
              Visit Website
            </a>
          )}
        </div>
        
        <div className="community-badge">
          <span className="years-badge">
            {business.yearsInCommunity} years serving Wembley
          </span>
        </div>
      </div>

      {showDetails && business.communityStories.length > 0 && (
        <div className="community-stories">
          <h4>Community Stories:</h4>
          <ul>
            {business.communityStories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
        </div>
      )}

      <button 
        className="toggle-details"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Show Less' : 'Show Community Stories'}
      </button>
    </div>
  );
};

export default BusinessCard;
