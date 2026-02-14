// src/pages/public-pages/attraction/NewResidentPage.tsx
import React, { useState, useEffect } from 'react';
import { BUILDINGS, MEMBERSHIP_PLANS } from '../../../types/membership';
import './NewResidentPage.css';

interface NewResidentStats {
  newHomesBuilt: number;
  averageCommute: string;
  countriesRepresented: number;
  averageTenancy: string;
}

interface ResidentTestimonial {
  name: string;
  building: string;
  country: string;
  memberSince: string;
  quote: string;
  achievement: string;
}

interface CommunityHighlight {
  title: string;
  description: string;
  impact: string;
  icon: string;
}

const NewResidentPage: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [stats] = useState<NewResidentStats>({
    newHomesBuilt: 8500,
    averageCommute: '12 min to Central London',
    countriesRepresented: 40,
    averageTenancy: '3+ years'
  });

  const [testimonials] = useState<ResidentTestimonial[]>([
    {
      name: 'Priya Singh',
      building: 'Luna Building',
      country: 'India',
      memberSince: 'Oct 2024',
      quote: 'Moving from Mumbai to London felt overwhelming until I joined Wembley Wonders. Within a week, I had local friends, knew how to navigate NHS services, and felt genuinely at home.',
      achievement: 'Now helps organize building social events'
    },
    {
      name: 'Ahmed Hassan',
      building: 'Solar Building',
      country: 'Egypt',
      memberSince: 'Sep 2024',
      quote: 'The portal simulators saved me hours of confusion and phone calls. I practiced everything from council tax to GP registration before doing it for real.',
      achievement: 'Started successful consulting business through network'
    },
    {
      name: 'Maria Santos',
      building: 'Madison Building',
      country: 'Brazil',
      memberSince: 'Dec 2024',
      quote: 'I thought premium housing meant isolation, but this community proved me wrong. My international perspective is valued, not just tolerated.',
      achievement: 'Became building community coordinator'
    }
  ]);

  const [highlights] = useState<CommunityHighlight[]>([
    {
      title: 'Skip the Learning Curve',
      description: 'Practice UK government services risk-free before submitting real applications',
      impact: '92% success rate on first attempts',
      icon: '🎯'
    },
    {
      title: 'Instant Community Access',
      description: 'Connect with residents from 40+ countries who understand your journey',
      impact: 'Average 5 meaningful connections in first month',
      icon: '🌍'
    },
    {
      title: 'Professional Network Ready',
      description: 'Build career connections with ambitious professionals in premium developments',
      impact: '67% report career advancement through community',
      icon: '🚀'
    },
    {
      title: 'Cultural Intelligence Boost',
      description: 'Develop skills that make you valuable in any international workplace',
      impact: 'Skills recognized by 500+ employers',
      icon: '🧠'
    }
  ]);

  const handleInstantAccess = () => {
    setShowWelcomeForm(true);
  };

  const handleBuildingSelect = (building: string) => {
    setSelectedBuilding(building);
  };

  const handleWelcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Welcome Package Sent!\n\nCheck your email for:\n• Building-specific resident guide\n• Local services quick-start guide\n• Community introduction package\n• Portal simulator trial access\n\nYour Wembley journey starts now!');
    setShowWelcomeForm(false);
  };

  const getAdventageText = () => {
    const advantages = [
      'Your international perspective is your superpower',
      'Turn moving stress into community success',
      'From day one, not month six',
      'Premium lifestyle with authentic meaning'
    ];
    return advantages;
  };

  return (
    <div className="new-resident-page">
      <header className="hero-section">
        <div className="hero-content">
          <div className="welcome-badge">New to Wembley Park?</div>
          <h1>Your Wembley Story Starts Here</h1>
          <p className="hero-subtitle">
            Don't just move in - make your mark. Join 1,300+ residents who transformed 
            premium living into meaningful community connection.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.newHomesBuilt.toLocaleString()}</span>
              <span className="stat-label">new homes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.averageCommute}</span>
              <span className="stat-label">to Central London</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.countriesRepresented}+</span>
              <span className="stat-label">countries represented</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.averageTenancy}</span>
              <span className="stat-label">average stay</span>
            </div>
          </div>

          <div className="hero-cta">
            <button className="primary-cta" onClick={handleInstantAccess}>
              Get Instant Insider Status
            </button>
            <p className="cta-subtitle">From £50/year • Cancel anytime</p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="community-preview">
            <h3>The New Resident Advantage</h3>
            <div className="advantages-list">
              {getAdventageText().map((advantage, index) => (
                <div key={index} className="advantage-item">
                  <span className="advantage-icon">✓</span>
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="community-highlights">
        <div className="container">
          <h2>Why New Residents Choose Wembley Wonders</h2>
          <div className="highlights-grid">
            {highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon">{highlight.icon}</div>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
                <div className="highlight-impact">{highlight.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resident-success-stories">
        <div className="container">
          <h2>Real Stories from New Residents</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="resident-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.building} • From {testimonial.country}</p>
                    <span className="member-since">Member since {testimonial.memberSince}</span>
                  </div>
                </div>
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="achievement">
                  <strong>Now:</strong> {testimonial.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="building-specific">
        <div className="container">
          <h2>Find Your Building Community</h2>
          <p>Each Quintain building has its own character and community network</p>
          
          <div className="building-selector">
            {BUILDINGS.map((building, index) => (
              <button
                key={index}
                className={`building-btn ${selectedBuilding === building ? 'selected' : ''}`}
                onClick={() => handleBuildingSelect(building)}
              >
                {building}
              </button>
            ))}
          </div>

          {selectedBuilding && (
            <div className="building-info">
              <h3>{selectedBuilding} Community</h3>
              <div className="building-details">
                <div className="building-stats">
                  <div className="building-stat">
                    <span className="stat-number">127</span>
                    <span className="stat-label">active members</span>
                  </div>
                  <div className="building-stat">
                    <span className="stat-number">18</span>
                    <span className="stat-label">countries represented</span>
                  </div>
                  <div className="building-stat">
                    <span className="stat-number">23</span>
                    <span className="stat-label">organized events</span>
                  </div>
                </div>
                <div className="building-features">
                  <h4>What makes {selectedBuilding} special:</h4>
                  <ul>
                    <li>Active building WhatsApp group with 85% participation</li>
                    <li>Monthly rooftop social events</li>
                    <li>Shared skills marketplace (design, consulting, languages)</li>
                    <li>New resident buddy system</li>
                    <li>Building-specific local recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="membership-preview">
        <div className="container">
          <h2>Choose Your Community Journey</h2>
          <div className="membership-tiers">
            {MEMBERSHIP_PLANS.map((plan, index) => (
              <div key={index} className="tier-card">
                <div className="tier-header">
                  <h3>{plan.name}</h3>
                  <div className="tier-price">£{plan.price}/year</div>
                </div>
                <p className="tier-description">{plan.description}</p>
                <div className="tier-features">
                  <h4>Perfect for:</h4>
                  <ul>
                    {plan.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="tier-cta">
                  Start as {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="instant-value">
        <div className="container">
          <div className="value-proposition">
            <h2>Get Value From Day One</h2>
            <div className="immediate-benefits">
              <div className="benefit-column">
                <h3>Week 1</h3>
                <ul>
                  <li>Building WhatsApp group access</li>
                  <li>New resident welcome package</li>
                  <li>Portal simulator trial access</li>
                  <li>Local services quick guide</li>
                </ul>
              </div>
              <div className="benefit-column">
                <h3>Month 1</h3>
                <ul>
                  <li>First community event attendance</li>
                  <li>3-5 meaningful resident connections</li>
                  <li>Complete UK service setup</li>
                  <li>Local area confidence boost</li>
                </ul>
              </div>
              <div className="benefit-column">
                <h3>Month 3</h3>
                <ul>
                  <li>Professional network expansion</li>
                  <li>Community project participation</li>
                  <li>Cultural intelligence development</li>
                  <li>Local reputation establishment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Stop Being Just Another Resident?</h2>
            <p>Join the community where your global perspective becomes your local advantage</p>
            
            <div className="cta-buttons">
              <button className="primary-cta large" onClick={handleInstantAccess}>
                Start Your Wembley Journey - £50/year
              </button>
              <div className="cta-guarantees">
                <span>30-day money-back guarantee</span>
                <span>Cancel anytime</span>
                <span>Instant access to community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showWelcomeForm && (
        <div className="welcome-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Get Your Wembley Welcome Package</h3>
              <button className="modal-close" onClick={() => setShowWelcomeForm(false)}>×</button>
            </div>
            
            <form onSubmit={handleWelcomeSubmit} className="welcome-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" required placeholder="First and last name" />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="your.email@example.com" />
              </div>
              
              <div className="form-group">
                <label>Your Building</label>
                <select required>
                  <option value="">Select your building...</option>
                  {BUILDINGS.map((building, index) => (
                    <option key={index} value={building}>{building}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Flat Number (optional)</label>
                <input type="text" placeholder="e.g., 15A" />
              </div>
              
              <div className="form-group">
                <label>Moving from</label>
                <input type="text" placeholder="Country or city" />
              </div>
              
              <div className="form-group">
                <label>Primary Interest</label>
                <select required>
                  <option value="">What matters most to you?</option>
                  <option value="professional-networking">Professional networking</option>
                  <option value="cultural-integration">Cultural integration</option>
                  <option value="uk-services-help">UK services navigation</option>
                  <option value="social-connections">Social connections</option>
                  <option value="community-leadership">Community leadership</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Send My Welcome Package
              </button>
              
              <p className="form-note">
                No spam, no sales calls. Just helpful information to make your Wembley experience amazing.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewResidentPage;