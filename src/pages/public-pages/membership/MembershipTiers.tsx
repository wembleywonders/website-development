// src/pages/public-pages/membership/MembershipTiers.tsx
import React, { useState } from 'react';
import { MEMBERSHIP_PLANS, type MembershipTier } from '../../../types/membership';
import './MembershipTiers.css';

interface ComparisonFeature {
  category: string;
  features: Array<{
    name: string;
    connector: boolean | string;
    curator: boolean | string;
    champion: boolean | string;
  }>;
}

interface ProfessionalBenefit {
  skill: string;
  description: string;
  careerImpact: string;
  timeToMaster: string;
}

const MembershipTiers: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier>('curator');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<string>('networking');

  const comparisonFeatures: ComparisonFeature[] = [
    {
      category: 'Community Access',
      features: [
        { name: 'Resident Directory Access', connector: true, curator: true, champion: true },
        { name: 'Building WhatsApp Groups', connector: true, curator: true, champion: true },
        { name: 'Event Booking', connector: 'Basic', curator: 'Priority', champion: 'VIP' },
        { name: 'Directory Listing', connector: false, curator: 'Featured', champion: 'Premium' }
      ]
    },
    {
      category: 'Portal Simulators',
      features: [
        { name: 'Housing Portal Access', connector: true, curator: true, champion: true },
        { name: 'Healthcare Portal Access', connector: true, curator: true, champion: true },
        { name: 'Government Services Portal', connector: 'Basic', curator: true, champion: true },
        { name: 'Advanced Practice Sessions', connector: false, curator: true, champion: true }
      ]
    },
    {
      category: 'Professional Development',
      features: [
        { name: 'Skill Progress Tracking', connector: 'Basic', curator: true, champion: true },
        { name: 'ROV Coaching Access', connector: 'Helper Only', curator: 'Multi-ROV', champion: 'Full Suite' },
        { name: 'Certification Opportunities', connector: false, curator: true, champion: true },
        { name: 'Leadership Portfolio', connector: false, curator: false, champion: true }
      ]
    },
    {
      category: 'Governance & Leadership',
      features: [
        { name: 'Voting Rights', connector: true, curator: true, champion: true },
        { name: 'Proposal Submission', connector: false, curator: true, champion: true },
        { name: 'Committee Participation', connector: false, curator: 'Select Committees', champion: 'All Committees' },
        { name: 'Board Eligibility', connector: false, curator: false, champion: true }
      ]
    }
  ];

  const professionalBenefits: Record<string, ProfessionalBenefit[]> = {
    networking: [
      {
        skill: 'Professional Relationship Building',
        description: 'Build meaningful connections with ambitious residents across industries',
        careerImpact: 'Average 40% increase in professional opportunities through community connections',
        timeToMaster: '3-6 months'
      },
      {
        skill: 'Cross-Cultural Communication',
        description: 'Develop fluency in international business communication styles',
        careerImpact: 'Essential for global companies and multinational client management',
        timeToMaster: '6-9 months'
      }
    ],
    leadership: [
      {
        skill: 'Community Governance Experience',
        description: 'Gain board-level decision making experience through community leadership',
        careerImpact: 'Preparation for corporate board service and executive roles',
        timeToMaster: '12-18 months'
      },
      {
        skill: 'Stakeholder Management',
        description: 'Balance diverse interests in democratic community decision-making',
        careerImpact: 'Critical for senior management and public sector roles',
        timeToMaster: '15-20 months'
      }
    ],
    skills: [
      {
        skill: 'Cultural Intelligence',
        description: 'Navigate and bridge cultural differences in professional settings',
        careerImpact: 'Valued by 89% of multinational employers for leadership roles',
        timeToMaster: '6-9 months'
      },
      {
        skill: 'Digital Literacy & Innovation',
        description: 'Master UK digital systems and develop technology fluency',
        careerImpact: 'Essential for modern workplace efficiency and advancement',
        timeToMaster: '4-6 months'
      }
    ]
  };

  const handleTierSelection = (tier: MembershipTier) => {
    setSelectedTier(tier);
  };

  const handleSignUp = (tier: MembershipTier) => {
    const plan = MEMBERSHIP_PLANS.find(p => p.id === tier);
    alert(`Sign up for ${plan?.name} Membership\n\nPrice: £${plan?.price}/year\n\nYou'll get:\n${plan?.features.slice(0, 3).join('\n')}\n\nRedirecting to secure checkout...`);
  };

  const getTierColor = (tier: MembershipTier): string => {
    switch (tier) {
      case 'connector': return '#3498db';
      case 'curator': return '#e67e22';
      case 'champion': return '#9b59b6';
      default: return '#3498db';
    }
  };

  const getFeatureValue = (value: boolean | string): string => {
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }
    return value;
  };

  const getFeatureClass = (value: boolean | string): string => {
    if (typeof value === 'boolean') {
      return value ? 'feature-included' : 'feature-excluded';
    }
    return 'feature-partial';
  };

  return (
    <div className="membership-tiers-page">
      <header className="tiers-header">
        <div className="container">
          <h1>Choose Your Community Journey</h1>
          <p>Transform from anonymous resident to community leader through progressive skill development</p>
          
          <div className="tier-philosophy">
            <div className="philosophy-item">
              <h3>Connector</h3>
              <p>Build relationships, make introductions, expand networks</p>
            </div>
            <div className="philosophy-item">
              <h3>Curator</h3>
              <p>Select quality experiences, share valuable content, organize gatherings</p>
            </div>
            <div className="philosophy-item">
              <h3>Champion</h3>
              <p>Lead initiatives, advocate for community needs, shape direction</p>
            </div>
          </div>
        </div>
      </header>

      <section className="membership-plans">
        <div className="container">
          <div className="plans-grid">
            {MEMBERSHIP_PLANS.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`plan-card ${selectedTier === plan.id ? 'selected' : ''} ${plan.id}`}
                onClick={() => handleTierSelection(plan.id)}
              >
                <div className="plan-header">
                  <h2>{plan.name}</h2>
                  <div className="plan-price">
                    <span className="price-amount">£{plan.price}</span>
                    <span className="price-period">per year</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-features">
                  <h4>What You Get:</h4>
                  <ul>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="skill-focus">
                  <h4>Skill Development Focus:</h4>
                  <div className="skills-tags">
                    {plan.skillFocus.slice(0, 3).map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="rov-support">
                  <h4>ROV Assistance:</h4>
                  <div className="rov-list">
                    {plan.rovSupport.map((rov, rovIndex) => (
                      <span key={rovIndex} className="rov-item">{rov}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className="plan-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSignUp(plan.id);
                  }}
                  style={{ backgroundColor: getTierColor(plan.id) }}
                >
                  Start as {plan.name} - £{plan.price}/year
                </button>

                {index === 1 && <div className="popular-badge">Most Popular</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="professional-benefits">
        <div className="container">
          <h2>Professional Development Benefits</h2>
          <p>Real skills that advance your career while building authentic community</p>
          
          <div className="benefits-navigation">
            {(['networking', 'leadership', 'skills'] as const).map((category) => (
              <button
                key={category}
                className={`benefit-nav-btn ${selectedBenefit === category ? 'active' : ''}`}
                onClick={() => setSelectedBenefit(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="benefits-content">
            {professionalBenefits[selectedBenefit].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <h3>{benefit.skill}</h3>
                <p className="benefit-description">{benefit.description}</p>
                <div className="benefit-impact">
                  <strong>Career Impact:</strong> {benefit.careerImpact}
                </div>
                <div className="benefit-timeline">
                  <strong>Time to Master:</strong> {benefit.timeToMaster}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tier-comparison">
        <div className="container">
          <div className="comparison-header">
            <h2>Detailed Feature Comparison</h2>
            <button 
              className="comparison-toggle"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide' : 'Show'} Full Comparison
            </button>
          </div>

          {showComparison && (
            <div className="comparison-table">
              <div className="table-header">
                <div className="feature-column">Features</div>
                <div className="tier-column connector">Connector</div>
                <div className="tier-column curator">Curator</div>
                <div className="tier-column champion">Champion</div>
              </div>

              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex} className="category-section">
                  <div className="category-header">{category.category}</div>
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature-row">
                      <div className="feature-name">{feature.name}</div>
                      <div className={`feature-value ${getFeatureClass(feature.connector)}`}>
                        {getFeatureValue(feature.connector)}
                      </div>
                      <div className={`feature-value ${getFeatureClass(feature.curator)}`}>
                        {getFeatureValue(feature.curator)}
                      </div>
                      <div className={`feature-value ${getFeatureClass(feature.champion)}`}>
                        {getFeatureValue(feature.champion)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="upgrade-path">
        <div className="container">
          <h2>Your Growth Journey</h2>
          <div className="journey-timeline">
            <div className="journey-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Start as Connector</h3>
                <p>Build relationships and integrate into the community</p>
                <div className="step-duration">3-6 months</div>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Advance to Curator</h3>
                <p>Take on content creation and event organization responsibilities</p>
                <div className="step-duration">6-12 months</div>
              </div>
            </div>
            <div className="journey-arrow">→</div>
            <div className="journey-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Become a Champion</h3>
                <p>Lead community initiatives and represent external interests</p>
                <div className="step-duration">12+ months</div>
              </div>
            </div>
          </div>

          <div className="upgrade-benefits">
            <h3>Upgrade Anytime</h3>
            <ul>
              <li>No long-term contracts or commitments</li>
              <li>Instant access to higher tier benefits</li>
              <li>Pro-rated pricing for mid-year upgrades</li>
              <li>Skills and progress transfer between tiers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="container">
          <h2>Trusted by Wembley's Most Ambitious Residents</h2>
          <div className="proof-stats">
            <div className="proof-stat">
              <span className="stat-number">1,300+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="proof-stat">
              <span className="stat-number">40+</span>
              <span className="stat-label">Countries Represented</span>
            </div>
            <div className="proof-stat">
              <span className="stat-number">89%</span>
              <span className="stat-label">Report Career Benefits</span>
            </div>
            <div className="proof-stat">
              <span className="stat-number">3.2 years</span>
              <span className="stat-label">Average Membership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Wembley Experience?</h2>
            <p>Join the community where premium living meets authentic connection</p>
            
            <div className="cta-options">
              <button 
                className="cta-btn connector"
                onClick={() => handleSignUp('connector')}
              >
                Start as Connector - £50/year
              </button>
              <button 
                className="cta-btn curator popular"
                onClick={() => handleSignUp('curator')}
              >
                Start as Curator - £75/year
              </button>
              <button 
                className="cta-btn champion"
                onClick={() => handleSignUp('champion')}
              >
                Start as Champion - £100/year
              </button>
            </div>

            <div className="cta-guarantees">
              <div className="guarantee">30-day money-back guarantee</div>
              <div className="guarantee">Cancel anytime</div>
              <div className="guarantee">Instant community access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembershipTiers;