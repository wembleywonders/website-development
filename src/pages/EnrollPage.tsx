// src/pages/EnrollPage.tsx
// PRIMARY REVENUE PAGE - £38-65K Year 1
// Focus: Convert visitors to enrolled participants

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EnrollPage.css';

const EnrollPage: React.FC = () => {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('summer');

  const pathways = [
    {
      id: 'stemgeneers',
      name: 'Stemgeneers',
      icon: '🔬',
      tagline: 'Science, Tech, Engineering & Maths',
      description: 'Master digital skills, build tech projects, and launch your STEM career',
      outcomes: [
        'Build 3-5 portfolio projects',
        'Learn coding, robotics, and digital design',
        'Industry certifications available',
        'Job placement support included'
      ],
      color: '#0ea5e9'
    },
    {
      id: 'techtreneurs',
      name: 'Techtreneurs',
      icon: '💼',
      tagline: 'Digital Entrepreneurship & Business',
      description: 'Launch your own digital business while learning tech and entrepreneurship',
      outcomes: [
        'Start your own digital business',
        'Learn marketing, sales, and operations',
        'Access to Cyberstore marketplace',
        'Business mentorship included'
      ],
      color: '#10b981'
    },
    {
      id: 'silk-stilettos',
      name: 'Silk Stilettos',
      icon: '👠',
      tagline: 'Women\'s Empowerment & Leadership',
      description: 'Women-only programme combining tech skills with confidence and leadership',
      outcomes: [
        'Safe, supportive women-only space',
        'Tech skills + leadership development',
        'Female role models and mentors',
        'Community of empowered women'
      ],
      color: '#ec4899'
    }
  ];

  const seasons = [
    {
      id: 'summer',
      name: 'Summer 2025',
      dates: 'July 14 - August 22, 2025',
      weeks: '6 weeks',
      schedule: 'Mon-Fri, 10am-4pm',
      spots: 50,
      spotsLeft: 37,
      status: 'Enrolling Now',
      price: '£55/month membership + £30 equipment fee'
    },
    {
      id: 'winter',
      name: 'Winter 2025',
      dates: 'October 27 - December 19, 2025',
      weeks: '8 weeks',
      schedule: 'Mon-Wed, 4pm-7pm',
      spots: 60,
      spotsLeft: 60,
      status: 'Early Bird Registration',
      price: '£55/month membership'
    },
    {
      id: 'spring',
      name: 'Spring 2026',
      dates: 'February 2 - March 27, 2026',
      weeks: '8 weeks',
      schedule: 'Mon-Wed, 4pm-7pm',
      spots: 80,
      spotsLeft: 80,
      status: 'Waitlist Open',
      price: '£55/month membership'
    }
  ];

  const handlePathwaySelect = (pathwayId: string) => {
    setSelectedPathway(pathwayId);
    // Scroll to enrollment form
    document.getElementById('enrollment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="enroll-page">
      {/* HERO SECTION - Clear Value Prop */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">⭐</span>
            <span className="badge-text">80% Engagement Rate • Zero Grant Model • Proven Results</span>
          </div>
          
          <h1 className="hero-title">
            Join a Programme That <span className="highlight">Actually Works</span>
          </h1>
          
          <p className="hero-subtitle">
            While other programmes struggle with 30% engagement, we achieve 80% because we understand 
            the "Forgotten 60%" - and we know how to serve them.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">80%</div>
              <div className="stat-label">Engagement Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">50</div>
              <div className="stat-label">Years in Brent</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Pathways to Choose</div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Choose Your Pathway
            </button>
            <Link to="/method" className="btn-secondary-large">
              How It Works
            </Link>
          </div>

          <p className="trust-text">
            Backed by LSBU, MMU, and Co-op Bank • Council-approved • 50+ success stories
          </p>
        </div>
      </section>

      {/* PATHWAYS SECTION - Choose Your Journey */}
      <section id="pathways" className="pathways-section">
        <div className="section-header">
          <h2>Choose Your Pathway</h2>
          <p>Three distinct journeys, one proven method: Foundation Before Skills</p>
        </div>

        <div className="pathways-grid">
          {pathways.map((pathway) => (
            <div 
              key={pathway.id}
              className={`pathway-card ${selectedPathway === pathway.id ? 'selected' : ''}`}
              onClick={() => handlePathwaySelect(pathway.id)}
            >
              <div className="pathway-icon" style={{ color: pathway.color }}>
                {pathway.icon}
              </div>
              
              <h3 className="pathway-name">{pathway.name}</h3>
              <p className="pathway-tagline">{pathway.tagline}</p>
              <p className="pathway-description">{pathway.description}</p>

              <div className="pathway-outcomes">
                <h4>What You'll Achieve:</h4>
                <ul>
                  {pathway.outcomes.map((outcome, index) => (
                    <li key={index}>✓ {outcome}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="pathway-select-btn"
                style={{ 
                  background: selectedPathway === pathway.id 
                    ? `linear-gradient(135deg, ${pathway.color} 0%, ${pathway.color}dd 100%)` 
                    : 'transparent',
                  borderColor: pathway.color
                }}
              >
                {selectedPathway === pathway.id ? '✓ Selected' : 'Select This Pathway'}
              </button>

              <Link to={`/programmes/${pathway.id}`} className="learn-more-link">
                Learn more about {pathway.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEASONS SECTION - When to Start */}
      <section className="seasons-section">
        <div className="section-header">
          <h2>Choose Your Start Date</h2>
          <p>Year-round programmes with flexible scheduling</p>
        </div>

        <div className="seasons-selector">
          {seasons.map((season) => (
            <button
              key={season.id}
              className={`season-tab ${selectedSeason === season.id ? 'active' : ''}`}
              onClick={() => setSelectedSeason(season.id)}
            >
              <span className="season-name">{season.name}</span>
              <span className="season-status">{season.status}</span>
            </button>
          ))}
        </div>

        <div className="season-details">
          {seasons
            .filter((season) => season.id === selectedSeason)
            .map((season) => (
              <div key={season.id} className="season-info">
                <div className="season-info-grid">
                  <div className="info-item">
                    <div className="info-icon">📅</div>
                    <div className="info-content">
                      <div className="info-label">Dates</div>
                      <div className="info-value">{season.dates}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">⏰</div>
                    <div className="info-content">
                      <div className="info-label">Duration</div>
                      <div className="info-value">{season.weeks}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">🕐</div>
                    <div className="info-content">
                      <div className="info-label">Schedule</div>
                      <div className="info-value">{season.schedule}</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">👥</div>
                    <div className="info-content">
                      <div className="info-label">Spots Available</div>
                      <div className="info-value">
                        {season.spotsLeft} of {season.spots} left
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pricing-info">
                  <div className="price-primary">
                    <span className="price-label">Investment:</span>
                    <span className="price-amount">{season.price}</span>
                  </div>
                  <div className="price-secondary">
                    Plus: Income Share Agreement (4% of earnings above £25K for 2 years after programme)
                  </div>
                  <div className="price-note">
                    💰 Council subsidies available for families who qualify (20 subsidized places)
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED SECTION */}
      <section className="whats-included-section">
        <div className="section-header">
          <h2>What's Included in Every Programme</h2>
          <p>Comprehensive support from day one to job placement</p>
        </div>

        <div className="included-grid">
          <div className="included-item">
            <div className="included-icon">💻</div>
            <h3>Equipment & Tools</h3>
            <p>Laptop access, software licenses, project materials, and equipment provided</p>
          </div>

          <div className="included-item">
            <div className="included-icon">🎓</div>
            <h3>Digital Skills Training</h3>
            <p>Coding, design, digital literacy, and technical skills taught by industry professionals</p>
          </div>

          <div className="included-item">
            <div className="included-icon">👥</div>
            <h3>1-on-1 Mentorship</h3>
            <p>Personal mentor assigned to guide your journey and support your goals</p>
          </div>

          <div className="included-item">
            <div className="included-icon">📊</div>
            <h3>Portfolio Building</h3>
            <p>Create 3-5 real projects to showcase to employers and universities</p>
          </div>

          <div className="included-item">
            <div className="included-icon">🏢</div>
            <h3>Job Placement Support</h3>
            <p>CV help, interview prep, employer connections, and placement assistance</p>
          </div>

          <div className="included-item">
            <div className="included-icon">🤝</div>
            <h3>Community Access</h3>
            <p>Join Cyberstore marketplace, Raydyo radio, and lifelong alumni network</p>
          </div>

          <div className="included-item">
            <div className="included-icon">🎯</div>
            <h3>Foundation First</h3>
            <p>Emotional, social, and cultural support - not just technical skills</p>
          </div>

          <div className="included-item">
            <div className="included-icon">📜</div>
            <h3>Certifications</h3>
            <p>Industry-recognized certifications and pathway to university partnerships</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="social-proof-section">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>Real participants, real transformations</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "I came in with zero confidence and no tech skills. Six weeks later, I built my own website 
              and got hired as a junior developer. The G-Tech Method actually works."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Marcus, 19</div>
              <div className="author-pathway">Stemgeneers → Junior Developer</div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "This wasn't just a tech programme - it changed how I see myself. The women-only space 
              made me feel safe to try, fail, and grow. Now I'm running my own digital business."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Aisha, 24</div>
              <div className="author-pathway">Silk Stilettos → Digital Entrepreneur</div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Other programmes talked AT me. Wembley Wonders actually listened and met me where I was. 
              80% engagement? I believe it - everyone in my cohort showed up every single day."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Jamal, 22</div>
              <div className="author-pathway">Techtreneurs → Business Owner</div>
            </div>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">80%</div>
            <div className="stat-label">Complete programme</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">70%</div>
            <div className="stat-label">Employed within 6 months</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">90%</div>
            <div className="stat-label">Would recommend</div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM SECTION */}
      <section id="enrollment-form" className="enrollment-section">
        <div className="enrollment-container">
          <div className="form-header">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              {selectedPathway 
                ? `Great choice! You selected ${pathways.find(p => p.id === selectedPathway)?.name}` 
                : 'Select a pathway above to get started'}
            </p>
          </div>

          {selectedPathway ? (
            <div className="enrollment-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submission coming soon!'); }}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" required placeholder="Enter your full name" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" required placeholder="your.email@example.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required placeholder="07XXX XXX XXX" />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age *</label>
                  <input type="number" id="age" required min="16" max="30" placeholder="16-30" />
                </div>

                <div className="form-group">
                  <label htmlFor="postcode">Postcode *</label>
                  <input type="text" id="postcode" required placeholder="NW10 XXX" />
                </div>

                <div className="form-group">
                  <label htmlFor="pathway">Selected Pathway</label>
                  <select id="pathway" value={selectedPathway} onChange={(e) => setSelectedPathway(e.target.value)}>
                    {pathways.map((pathway) => (
                      <option key={pathway.id} value={pathway.id}>
                        {pathway.name} - {pathway.tagline}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="season">Preferred Start Date</label>
                  <select id="season" value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                    {seasons.map((season) => (
                      <option key={season.id} value={season.id}>
                        {season.name} - {season.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subsidy">Do you need financial support?</label>
                  <select id="subsidy">
                    <option value="no">No, I can pay £55/month</option>
                    <option value="partial">Partial subsidy needed</option>
                    <option value="full">Full council subsidy needed</option>
                  </select>
                  <p className="help-text">
                    We have 20 subsidized places for families who qualify. Apply regardless of your situation.
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="motivation">Why do you want to join? *</label>
                  <textarea 
                    id="motivation" 
                    required 
                    rows={4}
                    placeholder="Tell us what you hope to achieve and why this programme matters to you..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I understand the Income Share Agreement (4% of earnings above £25K for 2 years after graduation)
                    </span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-submit">
                  Submit Application
                </button>

                <p className="form-footer-text">
                  Applications reviewed within 48 hours • Spots fill fast • Apply early for best chance
                </p>
              </form>
            </div>
          ) : (
            <div className="no-pathway-selected">
              <p>👆 Please select a pathway above to access the enrollment form</p>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Pathways
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>What if I can't afford £55/month?</summary>
            <p>
              We have 20 council-subsidized places for families who qualify. Apply regardless - we'll work with you 
              to find a solution. The Income Share Agreement also means you only pay AFTER you're earning.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do I need any prior tech experience?</summary>
            <p>
              No! We start with Foundation Before Skills - building confidence, emotional resilience, and social 
              connection BEFORE technical training. Our method works for complete beginners.
            </p>
          </details>

          <details className="faq-item">
            <summary>What's the Income Share Agreement?</summary>
            <p>
              You pay 4% of your earnings above £25K for 2 years after programme completion. If you're not earning 
              above £25K, you pay nothing. This aligns our success with yours.
            </p>
          </details>

          <details className="faq-item">
            <summary>What makes your 80% engagement so different?</summary>
            <p>
              Most programmes fail because they focus only on skills. We understand the "Forgotten 60%" need emotional, 
              social, and cultural support FIRST. Foundation Before Skills = 80% stay and succeed.
            </p>
          </details>

          <details className="faq-item">
            <summary>What equipment do I need?</summary>
            <p>
              Nothing! We provide laptop access, software licenses, and all materials. Just bring yourself and 
              your willingness to learn.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can I work while doing the programme?</summary>
            <p>
              Summer is full-time (Mon-Fri, 10am-4pm). Winter and Spring are part-time (Mon-Wed, 4pm-7pm) 
              designed for working participants. Choose the schedule that fits your life.
            </p>
          </details>
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <Link to="/contact" className="btn-secondary">Contact Us</Link>
          <Link to="/faq" className="text-link">View All FAQs →</Link>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>Your Journey Starts Here</h2>
          <p>
            Join 50+ successful participants who transformed their lives through the G-Tech Method. 
            <br />
            80% engagement. Zero grants. Proven results.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Choose Your Pathway Now
          </button>
          <p className="trust-badges">
            🏛️ Backed by LSBU & MMU | 🏦 Co-op Bank Supported | 🏆 50 Years Community Trust
          </p>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;