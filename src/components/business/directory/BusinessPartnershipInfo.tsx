import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessPartnershipInfo.css';

const BusinessPartnershipInfo: React.FC = () => {
  const tierBenefits = {
    bronze: {
      price: 25,
      benefits: [
        'Business listing in Community Partners directory',
        'Social media mentions in community posts',
        'Quarterly newsletter feature',
        'Community event invitations'
      ]
    },
    silver: {
      price: 50,
      benefits: [
        'All Bronze benefits',
        'Monthly Joystick Magazine feature',
        'Rayd-yo podcast mentions',
        'Business-creator collaboration opportunities',
        'Dedicated business profile page'
      ]
    },
    gold: {
      price: 100,
      benefits: [
        'All Silver benefits',
        'Custom content creation',
        'Event sponsorship opportunities',
        'Direct project commissioning with creators',
        'Priority placement in all materials'
      ]
    },
    platinum: {
      price: 200,
      benefits: [
        'All Gold benefits',
        'Programme naming rights opportunities',
        'Dedicated account management',
        'Custom partnership development',
        'Executive community advisory board access'
      ]
    }
  };

  return (
    <div className="business-partnership-info">
      <div className="partnership-intro">
        <h2>Partner with Wembley Wonders</h2>
        <p className="partnership-description">
          Join a community-first approach to business partnership. We connect local businesses 
          with emerging talent while investing in genuine community development rather than 
          traditional advertising.
        </p>
        
        <div className="partnership-philosophy">
          <h3>Our Partnership Philosophy</h3>
          <div className="philosophy-points">
            <div className="philosophy-point">
              <h4>🎯 Community Investment, Not Advertising</h4>
              <p>Your investment directly funds skills development and creates employment pathways for local residents.</p>
            </div>
            <div className="philosophy-point">
              <h4>🤝 Authentic Collaboration</h4>
              <p>Work directly with STEMgineers and Tech-preneurs on real projects that benefit your business and their development.</p>
            </div>
            <div className="philosophy-point">
              <h4>📊 Transparent Impact</h4>
              <p>See exactly how your partnership creates measurable community outcomes and skill development.</p>
            </div>
            <div className="philosophy-point">
              <h4>🌱 Long-term Growth</h4>
              <p>Build lasting relationships with local talent while contributing to Wembley's economic development.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="partnership-tiers">
        <h3>Partnership Tiers</h3>
        <div className="tiers-grid">
          {Object.entries(tierBenefits).map(([tier, details]) => (
            <div key={tier} className={`tier-card ${tier}`}>
              <div className="tier-header">
                <h4>{tier.charAt(0).toUpperCase() + tier.slice(1)} Partner</h4>
                <div className="tier-price">£{details.price}/month</div>
              </div>
              <ul className="tier-benefits">
                {details.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="partnership-expectations">
        <h3>What We Expect from Partners</h3>
        <div className="expectations-grid">
          <div className="expectation">
            <h4>🕐 Time Investment</h4>
            <p>4-6 hours monthly for meaningful collaboration, mentorship, and project involvement.</p>
          </div>
          <div className="expectation">
            <h4>🎓 Skill Sharing</h4>
            <p>Willingness to share expertise with programme participants and provide real learning opportunities.</p>
          </div>
          <div className="expectation">
            <h4>💼 Project Opportunities</h4>
            <p>Commission genuine work from creators that benefits both your business and their portfolio development.</p>
          </div>
          <div className="expectation">
            <h4>📈 Community Commitment</h4>
            <p>Long-term investment in community development rather than short-term marketing gains.</p>
          </div>
        </div>
      </div>

      <div className="partnership-outcomes">
        <h3>Partnership Outcomes</h3>
        <div className="outcomes-grid">
          <div className="outcome">
            <div className="outcome-icon">🎯</div>
            <h4>For Your Business</h4>
            <ul>
              <li>Access to emerging local talent</li>
              <li>Custom solutions from innovative creators</li>
              <li>Authentic community connection</li>
              <li>Enhanced local reputation</li>
            </ul>
          </div>
          <div className="outcome">
            <div className="outcome-icon">🌟</div>
            <h4>For Our Community</h4>
            <ul>
              <li>Real-world project experience</li>
              <li>Employment pathway development</li>
              <li>Professional mentorship access</li>
              <li>Economic opportunity creation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="partnership-cta">
        <h3>Ready to Invest in Wembley's Future?</h3>
        <p>
          Join businesses like Kumon, Angel Taxis, and Zaika Restaurant who are actively 
          investing in community development while building meaningful local connections.
        </p>
        <Link to="/partnerships" className="signup-button">
          Start Your Partnership Application
        </Link>
      </div>
    </div>
  );
};

export default BusinessPartnershipInfo;
