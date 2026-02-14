import React from 'react';
import { Link } from 'react-router-dom';
import { useSmartRouting } from '../hooks/useSmartRouting';
import { WelcomeBanner } from '../components/smart/WelcomeBanner';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import './IndividualBenefits.css';

const IndividualBenefits: React.FC = () => {
  const { confidence, suggestedPath, trackingId } = useSmartRouting();

  // Show smart welcome if user arrived through membership interest
  const showSmartWelcome = confidence > 0.6 && (
    trackingId?.includes('membership') || 
    suggestedPath === '/membership' ||
    trackingId?.includes('community')
  );

  return (
    <PageTemplate
      pageTitle="Member Benefits"
      pageStrapline="Clear benefits and pricing for community participation"
      pageType="community"
      showMaya={false}
      pageGuide="Explore our membership options and find the level that works for your community participation goals."
    >
      {/* Smart Welcome Banner */}
      {showSmartWelcome && <WelcomeBanner />}

      {/* Main Content Container */}
      <div className="content-container">
        {/* Value Proposition Hero */}
        <section className="benefits-hero">
          <div className="hero-content">
            <h1>Why Join Wembley Wonders?</h1>
            <p className="hero-description">
              Membership isn't just about access - it's about building community wealth, 
              developing skills, and creating lasting connections with your neighbors.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Programs</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">閹凤拷300+</div>
                <div className="stat-label">Annual Savings</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="community-showcase">
              <div className="showcase-item">
                <span className="showcase-icon">妫ｅ啯鎳�</span>
                <span>Community Radio</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">妫ｅ啫绠�</span>
                <span>Gaming Events</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">妫ｅ啯绀堥柨鏃撴嫹</span>
                <span>Skills Workshops</span>
              </div>
              <div className="showcase-item">
                <span className="showcase-icon">妫ｅ啯鍣�</span>
                <span>Community Network</span>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="membership-tiers">
          <h2>Membership Options</h2>
          
          <div className="tiers-grid">
            {/* Basic Membership */}
            <div className="tier-card">
              <div className="tier-header">
                <h3>Basic Member</h3>
                <div className="tier-price">閹凤拷15/month</div>
                <div className="tier-tagline">Perfect for exploring our community</div>
              </div>
              
              <div className="tier-benefits">
                <h4>What's Included:</h4>
                <ul>
                  <li>Programme enrollment discounts</li>
                  <li>Community event priority booking</li>
                  <li>Maya guidance and support</li>
                  <li>Community decision-making vote</li>
                  <li>Access to member-only events</li>
                </ul>
              </div>
              
              <div className="tier-footer">
                <Link to="/get-started" className="btn-tier">Join Basic</Link>
              </div>
            </div>

            {/* Full Membership */}
            <div className="tier-card featured">
              <div className="tier-badge">Most Popular</div>
              <div className="tier-header">
                <h3>Full Member</h3>
                <div className="tier-price">閹凤拷25/month</div>
                <div className="tier-tagline">Best value for active participants</div>
              </div>
              
              <div className="tier-benefits">
                <h4>Everything in Basic, plus:</h4>
                <ul>
                  <li>One free programme per season</li>
                  <li>Workshop material discounts</li>
                  <li>Community shop member pricing</li>
                  <li>Free guest passes for events</li>
                  <li>Leadership pathway opportunities</li>
                </ul>
              </div>
              
              <div className="tier-footer">
                <Link to="/get-started" className="btn-tier featured-btn">Join Full</Link>
              </div>
            </div>

            {/* Supporter Membership */}
            <div className="tier-card">
              <div className="tier-header">
                <h3>Supporter</h3>
                <div className="tier-price">閹凤拷40+/month</div>
                <div className="tier-tagline">Champion community growth</div>
              </div>
              
              <div className="tier-benefits">
                <h4>Everything in Full, plus:</h4>
                <ul>
                  <li>Unlimited programme access</li>
                  <li>Mentor and volunteer opportunities</li>
                  <li>Community investment participation</li>
                  <li>Special recognition at events</li>
                  <li>Direct input on programme development</li>
                </ul>
              </div>
              
              <div className="tier-footer">
                <Link to="/get-started" className="btn-tier">Become Supporter</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Member Success Stories */}
        <section className="member-stories">
          <h2>What Our Members Say</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                <p>"The workshops completely changed my career prospects. I'm now working in digital marketing thanks to the skills I learned here."</p>
                <div className="story-author">
                  <strong>Marcus, Full Member</strong>
                  <span>Joined 2 years ago</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <p>"My kids love the gaming nights, and I've made genuine friends through the community events. Worth every penny."</p>
                <div className="story-author">
                  <strong>Sarah, Basic Member</strong>
                  <span>Joined 1 year ago</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <p>"Being a Supporter gives me a real say in shaping programs. I love helping decide what our community needs most."</p>
                <div className="story-author">
                  <strong>David, Supporter</strong>
                  <span>Founding member</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programme Add-Ons */}
        <section className="programme-addons">
          <h2>Programme Add-Ons</h2>
          <p>Additional programmes and experiences available to all members</p>
          
          <div className="addons-grid">
            <div className="addon-card">
              <div className="addon-icon">闁跨喐鏋婚幏锟�</div>
              <h3>Children's STEM Activities</h3>
              <div className="addon-price">閹凤拷20/month</div>
              <p>Weekly structured STEM learning for children 6-16</p>
              <div className="addon-details">
                <span>Members save 閹凤拷5/month</span>
              </div>
            </div>

            <div className="addon-card">
              <div className="addon-icon">妫ｅ啯鐤�</div>
              <h3>Community Day Trips</h3>
              <div className="addon-price">閹凤拷25/trip</div>
              <p>Seasonal community outings like "Wembley Wonderful Days"</p>
              <div className="addon-details">
                <span>Members save 閹凤拷10/trip</span>
              </div>
            </div>

            <div className="addon-card">
              <div className="addon-icon">闁虫寧鐟辩粭锟�</div>
              <h3>Advanced Workshop Access</h3>
              <div className="addon-price">閹凤拷15/month</div>
              <p>Specialized equipment training and advanced skill sessions</p>
              <div className="addon-details">
                <span>Members save 閹凤拷8/month</span>
              </div>
            </div>

            <div className="addon-card">
              <div className="addon-icon">妫ｅ啫绠�</div>
              <h3>Mentorship Programme</h3>
              <div className="addon-price">閹凤拷30/month</div>
              <p>1:1 guidance for personal and professional development</p>
              <div className="addon-details">
                <span>Members save 閹凤拷15/month</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Summary */}
        <section className="value-summary">
          <h2>Membership Value</h2>
          
          <div className="value-comparison">
            <div className="value-item">
              <h3>Non-Member</h3>
              <ul>
                <li>Programme access: 閹凤拷40/season</li>
                <li>Event tickets: Full price</li>
                <li>Workshop materials: Full price</li>
                <li>Community trips: 閹凤拷35/trip</li>
              </ul>
              <div className="value-total">Annual cost: 閹凤拷300+</div>
            </div>

            <div className="value-item featured">
              <h3>Full Member</h3>
              <ul>
                <li>Programme access: 1 free/season</li>
                <li>Event tickets: Member discounts</li>
                <li>Workshop materials: Discounted</li>
                <li>Community trips: 閹凤拷25/trip</li>
              </ul>
              <div className="value-total">Annual cost: 閹凤拷300 + savings</div>
            </div>
          </div>
          
          <div className="value-note">
            <p>Full membership typically pays for itself through programme and event savings</p>
          </div>
        </section>

        {/* Community Philosophy Link */}
        <section className="philosophy-link">
          <h2>Our Community Approach</h2>
          <p>
            Membership isn't just about individual benefits - it's about building community wealth 
            and supporting each other's success.
          </p>
          <Link to="/membership" className="btn-secondary">
            Learn About Our Values
          </Link>
        </section>

        {/* Call to Action */}
        <section className="benefits-cta">
          <h2>Ready to Join?</h2>
          <p>Start your membership journey and become part of Wembley's growing community</p>
          <div className="cta-buttons">
            <Link to="/get-started" className="btn-primary">Get Started</Link>
            <Link to="/calendar" className="btn-secondary">See What's On</Link>
          </div>
        </section>
      </div>

      {/* Maya Integration with Community Context */}
      <DraggableMaya 
        membershipTier={'visitor'} 
        pageType="community"
        pageContext={{
          title: "Member Benefits",
          section: "membership",
          smartRouting: { confidence, trackingId }
        }}
      />
    </PageTemplate>
  );
};

export default IndividualBenefits;
