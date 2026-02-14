// src/components/membership/TierComparison.tsx
import React from 'react';
import { MEMBERSHIP_PLANS, MembershipTier } from '../../types/membership';
import './TierComparison.css';

interface TierComparisonProps {
  currentTier?: MembershipTier;
  onSelectTier: (tier: MembershipTier) => void;
}

const TierComparison: React.FC<TierComparisonProps> = ({
  currentTier,
  onSelectTier
}) => {
  const comparisonFeatures = [
    {
      category: 'Core Access',
      features: [
        { name: 'Resident Directory Access', connector: 'Basic', curator: 'Featured', champion: 'Premium' },
        { name: 'Event Booking', connector: 'Standard', curator: 'Priority', champion: 'VIP' },
        { name: 'Portal Simulators', connector: 'Basic Access', curator: 'Full Access', champion: 'Advanced Analytics' },
        { name: 'Community Groups', connector: 'WhatsApp Only', curator: 'All Channels', champion: 'Leadership Roles' }
      ]
    },
    {
      category: 'Professional Development',
      features: [
        { name: 'Skill Development Plans', connector: 'Self-Guided', curator: 'ROV Assisted', champion: 'Strategic Coaching' },
        { name: 'ROV Coaching Access', connector: 'Helper ROV', curator: '3 ROV Types', champion: 'All ROV Types' },
        { name: 'Certification Tracking', connector: 'Basic Badges', curator: 'Verified Certs', champion: 'Professional Portfolio' },
        { name: 'Mentorship Program', connector: 'None', curator: 'Peer Matching', champion: 'Executive Mentoring' }
      ]
    },
    {
      category: 'Community Leadership',
      features: [
        { name: 'Event Creation', connector: 'None', curator: 'Social Events', champion: 'All Event Types' },
        { name: 'Governance Participation', connector: 'Observer', curator: 'Committee Member', champion: 'Board Eligible' },
        { name: 'Project Leadership', connector: 'Participant', curator: 'Team Lead', champion: 'Initiative Creator' },
        { name: 'Strategic Planning', connector: 'None', curator: 'Input', champion: 'Co-Creation' }
      ]
    },
    {
      category: 'Business & Networking',
      features: [
        { name: 'Directory Listing', connector: 'Basic Profile', curator: 'Business Card', champion: 'Featured Premium' },
        { name: 'Partnership Opportunities', connector: 'None', curator: 'Local Partnerships', champion: 'Strategic Alliances' },
        { name: 'Marketing Support', connector: 'None', curator: 'Social Media', champion: 'Full Campaign Support' },
        { name: 'Revenue Sharing', connector: 'None', curator: 'Event Revenue', champion: 'Multiple Streams' }
      ]
    }
  ];

  const getTierColor = (tier: MembershipTier) => {
    const colors = {
      connector: '#3498db',
      curator: '#9b59b6',
      champion: '#f39c12'
    };
    return colors[tier];
  };

  const getFeatureLevel = (feature: any, tier: MembershipTier) => {
    return feature[tier];
  };

  const isFeatureUpgrade = (feature: any, tier: MembershipTier, currentTier?: MembershipTier) => {
    if (!currentTier) return false;
    const tierOrder = ['connector', 'curator', 'champion'];
    const currentIndex = tierOrder.indexOf(currentTier);
    const tierIndex = tierOrder.indexOf(tier);
    return tierIndex > currentIndex;
  };

  return (
    <div className="tier-comparison">
      <div className="comparison-header">
        <h2>Choose Your Membership Level</h2>
        <p>Compare features and benefits across our three membership tiers</p>
      </div>

      <div className="comparison-table">
        <div className="table-header">
          <div className="feature-column">Features</div>
          {MEMBERSHIP_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`tier-column ${plan.id} ${currentTier === plan.id ? 'current' : ''}`}
              style={{ borderTopColor: getTierColor(plan.id) }}
            >
              <div className="tier-header-content">
                <h3>{plan.name}</h3>
                <div className="tier-price">
                  <span className="price">£{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
                <p className="tier-description">{plan.description}</p>
                <button 
                  className={`select-tier-btn ${currentTier === plan.id ? 'current' : ''}`}
                  onClick={() => onSelectTier(plan.id)}
                  style={{ backgroundColor: getTierColor(plan.id) }}
                >
                  {currentTier === plan.id ? 'Current Plan' : 
                   plan.id === 'connector' ? 'Start Here' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {comparisonFeatures.map((category) => (
          <div key={category.category} className="feature-category">
            <div className="category-header">
              <h4>{category.category}</h4>
            </div>
            
            {category.features.map((feature) => (
              <div key={feature.name} className="feature-row">
                <div className="feature-name">{feature.name}</div>
                {MEMBERSHIP_PLANS.map((plan) => (
                  <div 
                    key={`${feature.name}-${plan.id}`} 
                    className={`feature-value ${plan.id} ${
                      isFeatureUpgrade(feature, plan.id, currentTier) ? 'upgrade' : ''
                    }`}
                  >
                    {getFeatureLevel(feature, plan.id)}
                    {isFeatureUpgrade(feature, plan.id, currentTier) && (
                      <span className="upgrade-indicator">↑</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="comparison-footer">
        <div className="progression-note">
          <h4>Natural Progression</h4>
          <p>
            Most members start as Connectors to build relationships, progress to Curators 
            to organize experiences, and advance to Champions to lead community initiatives. 
            Each tier builds upon the previous one's skills and responsibilities.
          </p>
        </div>
        
        <div className="value-proposition">
          <h4>Professional Development Investment</h4>
          <p>
            Your membership fee is an investment in developing real professional skills through 
            community engagement. ROV coaching, practical experience, and peer learning 
            translate directly to career advancement opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TierComparison;