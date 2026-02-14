import React from 'react';
import { Link } from 'react-router-dom';
import { MembershipTier, MEMBERSHIP_TIERS, TIER_REQUIREMENTS } from '../../types/membership';

interface MembershipTierCardProps {
  tier: MembershipTier;
  isCurrentTier?: boolean;
  isAvailable?: boolean;
  compact?: boolean;
  showProgressButton?: boolean;
  progressPercentage?: number;
  className?: string;
}

const MembershipTierCard: React.FC<MembershipTierCardProps> = ({
  tier,
  isCurrentTier = false,
  isAvailable = true,
  compact = false,
  showProgressButton = false,
  progressPercentage,
  className = ''
}) => {
  const tierData = MEMBERSHIP_TIERS[tier];
  const requirements = TIER_REQUIREMENTS[tier];

  const getTierIcon = (tier: MembershipTier) => {
    const icons = {
      applicant: '📝',
      connector: '🔗',
      curator: '🎯',
      champion: '👑'
    };
    return icons[tier];
  };

  const getTierColor = (tier: MembershipTier) => {
    const colors = {
      applicant: '#718096',
      connector: '#4299e1',
      curator: '#48bb78',
      champion: '#ed8936'
    };
    return colors[tier];
  };

  const getTierGradient = (tier: MembershipTier) => {
    const gradients = {
      applicant: 'linear-gradient(135deg, #718096, #4a5568)',
      connector: 'linear-gradient(135deg, #4299e1, #3182ce)',
      curator: 'linear-gradient(135deg, #48bb78, #38a169)',
      champion: 'linear-gradient(135deg, #ed8936, #dd6b20)'
    };
    return gradients[tier];
  };

  const formatBudgetAuthority = (amount?: number) => {
    if (!amount) return 'No budget authority';
    return `£${amount.toLocaleString()} budget authority`;
  };

  const getActionLink = (tier: MembershipTier) => {
    const links = {
      applicant: '/apply',
      connector: '/connector',
      curator: '/curator',
      champion: '/champion'
    };
    return links[tier];
  };

  const getActionText = (tier: MembershipTier) => {
    if (isCurrentTier) return 'Current Tier';
    if (!isAvailable) return 'Not Available';
    
    const texts = {
      applicant: 'Apply Now',
      connector: 'Learn More',
      curator: 'View Requirements',
      champion: 'Explore Opportunities'
    };
    return texts[tier];
  };

  if (compact) {
    return (
      <div className={`tier-card-compact ${className} ${isCurrentTier ? 'current' : ''}`}>
        <div 
          className="tier-header"
          style={{ background: getTierGradient(tier) }}
        >
          <span className="tier-icon">{getTierIcon(tier)}</span>
          <span className="tier-name">{tierData.tier.charAt(0).toUpperCase() + tierData.tier.slice(1)}</span>
        </div>
        {progressPercentage !== undefined && (
          <div className="progress-indicator">
            <div 
              className="progress-bar"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: getTierColor(tier)
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`membership-tier-card ${className} ${isCurrentTier ? 'current-tier' : ''} ${!isAvailable ? 'unavailable' : ''}`}>
      {/* Tier Header */}
      <div 
        className="tier-header"
        style={{ background: getTierGradient(tier) }}
      >
        <div className="tier-icon-large">{getTierIcon(tier)}</div>
        <div className="tier-info">
          <h3 className="tier-title">
            {tierData.tier.charAt(0).toUpperCase() + tierData.tier.slice(1)}
          </h3>
          <p className="tier-commitment">{tierData.timeCommitment}</p>
        </div>
        {isCurrentTier && (
          <div className="current-badge">Current</div>
        )}
      </div>

      {/* Progress Bar (if applicable) */}
      {progressPercentage !== undefined && (
        <div className="tier-progress">
          <div className="progress-header">
            <span>Progress to Next Tier</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: getTierColor(tier)
              }}
            />
          </div>
        </div>
      )}

      {/* Key Highlights */}
      <div className="tier-highlights">
        {tierData.budgetAuthority && (
          <div className="highlight">
            <span className="highlight-icon">💰</span>
            <span>{formatBudgetAuthority(tierData.budgetAuthority)}</span>
          </div>
        )}
        
        <div className="highlight">
          <span className="highlight-icon">{tierData.votingRights ? '🗳️' : '👥'}</span>
          <span>{tierData.votingRights ? 'Voting rights' : 'Community access'}</span>
        </div>

        {tierData.tier === 'curator' && (
          <div className="highlight">
            <span className="highlight-icon">🎓</span>
            <span>Youth program leadership</span>
          </div>
        )}

        {tierData.tier === 'champion' && (
          <div className="highlight">
            <span className="highlight-icon">🤝</span>
            <span>Partnership negotiations</span>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="tier-benefits">
        <h4>Key Benefits</h4>
        <ul>
          {tierData.benefits.slice(0, 4).map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
          {tierData.benefits.length > 4 && (
            <li className="more-benefits">+{tierData.benefits.length - 4} more benefits</li>
          )}
        </ul>
      </div>

      {/* Requirements Preview */}
      {!isCurrentTier && requirements.prerequisites.length > 0 && (
        <div className="tier-requirements">
          <h4>Requirements</h4>
          <ul>
            {requirements.prerequisites.slice(0, 3).map((req, index) => (
              <li key={index}>{req}</li>
            ))}
            {requirements.prerequisites.length > 3 && (
              <li className="more-requirements">+{requirements.prerequisites.length - 3} more requirements</li>
            )}
          </ul>
        </div>
      )}

      {/* Training Requirements */}
      {tierData.trainingRequired.length > 0 && (
        <div className="tier-training">
          <h4>Training Required</h4>
          <div className="training-badges">
            {tierData.trainingRequired.map((training, index) => (
              <span key={index} className="training-badge">
                {training}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="tier-actions">
        {isAvailable && !isCurrentTier ? (
          <Link 
            to={getActionLink(tier)}
            className="btn btn-primary tier-action-btn"
            style={{ backgroundColor: getTierColor(tier) }}
          >
            {getActionText(tier)}
          </Link>
        ) : (
          <button 
            className={`btn tier-action-btn ${isCurrentTier ? 'btn-current' : 'btn-disabled'}`}
            disabled={!isAvailable}
          >
            {getActionText(tier)}
          </button>
        )}

        {showProgressButton && isCurrentTier && (
          <Link 
            to="/dashboard"
            className="btn btn-outline tier-progress-btn"
          >
            View Progress
          </Link>
        )}
      </div>

      {/* Time to Promotion (if applicable) */}
      {requirements.timeInPreviousTier && !isCurrentTier && (
        <div className="promotion-time">
          <small>
            Minimum {requirements.timeInPreviousTier} months in previous tier required
          </small>
        </div>
      )}
    </div>
  );
};

export default MembershipTierCard;