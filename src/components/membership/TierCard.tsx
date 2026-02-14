// src/components/membership/TierCard.tsx
import React from 'react';
import { MembershipPlan, MembershipTier } from '../../types/membership';
import './TierCard.css';

interface TierCardProps {
  plan: MembershipPlan;
  isCurrentTier?: boolean;
  isPopular?: boolean;
  onSelectPlan: (tier: MembershipTier) => void;
  showUpgradeButton?: boolean;
}

const TierCard: React.FC<TierCardProps> = ({
  plan,
  isCurrentTier = false,
  isPopular = false,
  onSelectPlan,
  showUpgradeButton = true
}) => {
  const getTierIcon = (tier: MembershipTier) => {
    const icons = {
      connector: '🤝',
      curator: '🎨',
      champion: '🏆'
    };
    return icons[tier];
  };

  const getTierColor = (tier: MembershipTier) => {
    const colors = {
      connector: '#3498db',
      curator: '#9b59b6',
      champion: '#f39c12'
    };
    return colors[tier];
  };

  return (
    <div 
      className={`tier-card ${plan.id} ${isCurrentTier ? 'current' : ''} ${isPopular ? 'popular' : ''}`}
      style={{ borderColor: getTierColor(plan.id) }}
    >
      {isPopular && (
        <div className="popular-badge">Most Popular</div>
      )}
      
      {isCurrentTier && (
        <div className="current-badge">Your Current Plan</div>
      )}
      
      <div className="tier-header">
        <div className="tier-icon" style={{ color: getTierColor(plan.id) }}>
          {getTierIcon(plan.id)}
        </div>
        <h3 className="tier-name">{plan.name}</h3>
        <p className="tier-description">{plan.description}</p>
      </div>
      
      <div className="tier-price">
        <span className="price">£{plan.price}</span>
        <span className="period">/{plan.period}</span>
      </div>
      
      <div className="tier-features">
        <h4>Platform Features</h4>
        <ul>
          {plan.features.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="check-icon">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="tier-skills">
        <h4>Professional Skills Focus</h4>
        <div className="skills-list">
          {plan.skillFocus.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="tier-rov">
        <h4>ROV Support</h4>
        <ul>
          {plan.rovSupport.map((rov, index) => (
            <li key={index} className="rov-item">
              <span className="rov-icon">🤖</span>
              {rov}
            </li>
          ))}
        </ul>
      </div>
      
      {plan.limitations && plan.limitations.length > 0 && (
        <div className="tier-limitations">
          <h4>Limitations</h4>
          <ul>
            {plan.limitations.map((limitation, index) => (
              <li key={index} className="limitation-item">
                <span className="limit-icon">⚠️</span>
                {limitation}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="tier-actions">
        {isCurrentTier ? (
          <button className="current-plan-btn" disabled>
            Current Plan
          </button>
        ) : showUpgradeButton ? (
          <button 
            className="select-plan-btn"
            onClick={() => onSelectPlan(plan.id)}
            style={{ backgroundColor: getTierColor(plan.id) }}
          >
            {plan.id === 'connector' ? 'Start Journey' : 'Upgrade to ' + plan.name}
          </button>
        ) : (
          <button 
            className="learn-more-btn"
            onClick={() => onSelectPlan(plan.id)}
          >
            Learn More
          </button>
        )}
      </div>
    </div>
  );
};

export default TierCard;