// src/pages/PartnershipsPage.tsx
// B2B HUB PAGE - £20-30K Year 1 across multiple partnership types
// Focus: Gateway page that routes businesses to appropriate revenue streams

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PartnershipsPage.css';

const PartnershipsPage: React.FC = () => {
  const [selectedPartnership, setSelectedPartnership] = useState<string | null>(null);

  const partnershipTypes = [
    {
      id: 'corporate-training',
      name: 'Corporate Training',
      icon: '🎓',
      tagline: 'Learn Our 80% Engagement Method',
      value: '£2,500-10,000',
      bestFor: 'HR leaders, L&D teams, DEI officers',
      description: 'Workshops teaching Foundation Before Skills methodology. Transform your team engagement from 30% to 80%.',
      outcomes: [
        'Workshop packages: Half-day, Full-day, Series',
        'Team engagement transformation',
        'Measurable ROI (20-80x)',
        'Industry-specific customization'
      ],
      cta: 'View Workshop Packages',
      link: '/corporate-training',
      color: '#0ea5e9'
    },
    {
      id: 'franchise',
      name: 'Franchise Opportunity',
      icon: '🚀',
      tagline: 'Own a Wembley Wonders Franchise',
      value: '£15,000-75,000',
      bestFor: 'Social entrepreneurs, established orgs',
      description: 'Launch proven social enterprise in your community. Complete system, full training, 80% engagement model.',
      outcomes: [
        'Three tiers: Starter, Growth, Master',
        'Turnkey operational system',
        'Ongoing support & platform access',
        'Revenue from Day 1'
      ],
      cta: 'Explore Franchise Options',
      link: '/franchise',
      color: '#f59e0b',
      featured: true
    },
    {
      id: 'platform-license',
      name: 'Platform Licensing',
      icon: '💻',
      tagline: 'White-Label Our Digital Platform',
      value: '£12,000-18,000/year',
      bestFor: 'Youth orgs, schools, social enterprises',
      description: 'License our £250K digital platform. White-label, rebrand, deploy for your participants.',
      outcomes: [
        'Complete digital infrastructure',
        'Customizable branding',
        'Training & implementation support',
        'Ongoing updates & maintenance'
      ],
      cta: 'Learn About Licensing',
      link: '/platform-license',
      color: '#8b5cf6'
    },
    {
      id: 'hire-talent',
      name: 'Hire Our Graduates',
      icon: '💼',
      tagline: 'Access Pre-Trained Talent Pool',
      value: '£3,000-5,000/hire',
      bestFor: 'Employers seeking diverse talent',
      description: 'Recruitment pipeline of trained participants. Foundation Before Skills = retention rates 2x industry average.',
      outcomes: [
        'Pre-vetted, trained candidates',
        'Higher retention (2x average)',
        'Diversity hiring made easy',
        'No upfront fees, pay on placement'
      ],
      cta: 'View Talent Pipeline',
      link: '/hire-talent',
      color: '#10b981'
    },
    {
      id: 'sponsorship',
      name: 'Brand Sponsorship',
      icon: '📢',
      tagline: 'Reach Our Community',
      value: '£2,000-12,000/year',
      bestFor: 'Brands targeting youth & families',
      description: 'Sponsor programmes, events, or digital channels. Authentic reach to engaged community.',
      outcomes: [
        'Raydyo radio sponsorship',
        'Joystick magazine placement',
        'Event title sponsorship',
        'Programme partnership'
      ],
      cta: 'View Sponsorship Packages',
      link: '/sponsorship',
      color: '#ef4444'
    },
    {
      id: 'custom',
      name: 'Custom Partnership',
      icon: '🤝',
      tagline: 'Something Different?',
      value: 'Negotiable',
      bestFor: 'Unique collaboration opportunities',
      description: 'Co-create programmes, joint ventures, research partnerships, impact investments, or other collaborations.',
      outcomes: [
        'Bespoke partnership structures',
        'Co-branded initiatives',
        'Research collaborations',
        'Impact measurement support'
      ],
      cta: 'Discuss Your Idea',
      link: '/contact',
      color: '#06b6d4'
    }
  ];

  const whyPartner = [
    {
      icon: '📊',
      title: '80% Engagement',
      description: 'Industry average is 30%. We achieve 80% because Foundation Before Skills works. Partner with proven results.'
    },
    {
      icon: '🏆',
      title: '50-Year Track Record',
      description: 'Not a startup. Serving Brent since 1970s. LSBU & MMU backed. Co-op Bank supported. Proven sustainability.'
    },
    {
      icon: '💰',
      title: 'Zero Grant Model',
      description: 'We don\'t rely on grants. Families pay £55/month + ISA. Partners pay for value. Sustainable, not subsidized.'
    },
    {
      icon: '🎯',
      title: 'Measurable Impact',
      description: 'ROI tracking, engagement metrics, outcome reporting. We measure everything. You get data, not stories.'
    }
  ];

  const existingPartners = [
    {
      name: 'London South Bank University',
      type: 'Academic Partner',
      logo: '🎓',
      description: 'Research validation, curriculum development, impact measurement'
    },
    {
      name: 'Manchester Metropolitan University',
      type: 'Academic Partner',
      logo: '🎓',
      description: 'Methodology research, social impact studies, graduate pathways'
    },
    {
      name: 'The Co-operative Bank',
      type: 'Financial Partner',
      logo: '🏦',
      description: 'Financial backing, ethical banking partnership, community investment'
    },
    {
      name: 'Brent Council',
      type: 'Public Sector Partner',
      logo: '🏛️',
      description: 'Subsidized places, facility access, community endorsement'
    }
  ];

  const partnerSuccess = [
    {
      company: 'Tech Startup (Hypothetical)',
      partnership: 'Corporate Training + Hiring',
      investment: '£4K training + £12K placement fees',
      result: 'Trained team on engagement methods, hired 4 graduates, 85% retention after 12 months',
      quote: 'The Foundation Before Skills training transformed how we onboard diverse hires. Then we hired 4 graduates and they outperform our traditional hires.'
    },
    {
      company: 'Youth Charity (Hypothetical)',
      partnership: 'Platform License',
      investment: '£15K/year platform license',
      result: 'Launched digital infrastructure in 6 weeks, serving 200 participants, engagement up 45%',
      quote: 'Building this ourselves would have cost £100K+. Licensing saved us money and we launched in weeks, not years.'
    },
    {
      company: 'Professional Services Firm (Hypothetical)',
      partnership: 'Sponsorship + Hiring',
      investment: '£8K sponsorship + £15K hiring',
      result: 'Brand exposure to 500+ youth, hired 5 interns, 3 converted to full-time, massive retention',
      quote: 'Best recruitment channel we\'ve ever used. These candidates are pre-trained, diverse, and they STAY.'
    }
  ];

  const handlePartnershipSelect = (partnershipId: string) => {
    setSelectedPartnership(partnershipId);
    const partnership = partnershipTypes.find(p => p.id === partnershipId);
    if (partnership && partnership.link !== '/contact') {
      // Redirect to specific partnership page
      window.location.href = partnership.link;
    } else {
      // For custom partnerships, scroll to contact form
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="partnerships-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">🤝</span>
            <span className="badge-text">50+ Years Experience • Multiple Partnership Models • Proven ROI</span>
          </div>
          
          <h1 className="hero-title">
            Partner With <span className="highlight">Wembley Wonders</span>
          </h1>
          
          <p className="hero-subtitle">
            Whether you want to learn our methods, franchise our model, license our platform, hire our graduates, 
            sponsor our programmes, or co-create something new - we have a partnership model for you.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">6</div>
              <div className="stat-label">Partnership Types</div>
            </div>
            <div className="stat">
              <div className="stat-number">80%</div>
              <div className="stat-label">Engagement Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Partnerships
            </button>
            <Link to="/contact" className="btn-secondary-large">
              Schedule Consultation
            </Link>
          </div>

          <p className="trust-text">
            Trusted by LSBU, MMU, Co-op Bank, Brent Council • Building Community Wealth Since 1970s
          </p>
        </div>
      </section>

      {/* WHY PARTNER SECTION */}
      <section className="why-partner-section">
        <div className="section-header">
          <h2>Why Partner With Wembley Wonders?</h2>
          <p>Four reasons we're not your typical community organization</p>
        </div>

        <div className="why-grid">
          {whyPartner.map((reason, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERSHIP TYPES SECTION */}
      <section id="partnership-types" className="partnership-types-section">
        <div className="section-header">
          <h2>Choose Your Partnership Model</h2>
          <p>Six ways to partner with us</p>
        </div>

        <div className="partnerships-grid">
          {partnershipTypes.map((partnership) => (
            <div 
              key={partnership.id}
              className={`partnership-card ${partnership.featured ? 'featured' : ''}`}
              onClick={() => handlePartnershipSelect(partnership.id)}
            >
              {partnership.featured && <div className="featured-badge">Most Popular</div>}
              
              <div className="partnership-icon" style={{ color: partnership.color }}>
                {partnership.icon}
              </div>
              
              <h3 className="partnership-name">{partnership.name}</h3>
              <p className="partnership-tagline">{partnership.tagline}</p>
              <div className="partnership-value">{partnership.value}</div>
              <div className="partnership-best-for">
                <strong>Best for:</strong> {partnership.bestFor}
              </div>

              <p className="partnership-description">{partnership.description}</p>

              <div className="partnership-outcomes">
                <h4>Key Benefits:</h4>
                <ul>
                  {partnership.outcomes.map((outcome, index) => (
                    <li key={index}>✓ {outcome}</li>
                  ))}
                </ul>
              </div>

              <Link 
                to={partnership.link}
                className="partnership-cta-btn"
                style={{ 
                  background: `linear-gradient(135deg, ${partnership.color} 0%, ${partnership.color}dd 100%)` 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {partnership.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="value-prop-section">
        <div className="section-header">
          <h2>What Makes Our Partnerships Different</h2>
          <p>Not transactional - transformational</p>
        </div>

        <div className="value-comparison">
          <div className="comparison-column traditional">
            <h3>❌ Traditional Partnerships</h3>
            <ul>
              <li>Grant-dependent (uncertain)</li>
              <li>30% engagement (industry average)</li>
              <li>Transaction-based relationships</li>
              <li>No measurable outcomes</li>
              <li>"Feel-good" impact claims</li>
              <li>One-size-fits-all approach</li>
            </ul>
          </div>

          <div className="comparison-column wembley">
            <h3>✓ Wembley Wonders Partnerships</h3>
            <ul>
              <li>Zero grant model (sustainable)</li>
              <li>80% engagement (proven)</li>
              <li>Strategic, long-term partnerships</li>
              <li>Measurable ROI & outcomes</li>
              <li>Data-driven impact reporting</li>
              <li>Customized to your goals</li>
            </ul>
          </div>
        </div>

        <div className="value-insight">
          <h4>The Bottom Line:</h4>
          <p>
            We're not asking for donations. We're offering valuable services at fair prices. Whether you're 
            learning our methods, franchising our model, licensing our platform, hiring our graduates, or 
            sponsoring our programmes - you get tangible business value. That's why partnerships work.
          </p>
        </div>
      </section>

      {/* EXISTING PARTNERS SECTION */}
      <section className="existing-partners-section">
        <div className="section-header">
          <h2>Current Strategic Partners</h2>
          <p>Organizations already working with us</p>
        </div>

        <div className="partners-grid">
          {existingPartners.map((partner, index) => (
            <div key={index} className="partner-card">
              <div className="partner-logo">{partner.logo}</div>
              <h3 className="partner-name">{partner.name}</h3>
              <div className="partner-type">{partner.type}</div>
              <p className="partner-description">{partner.description}</p>
            </div>
          ))}
        </div>

        <div className="partners-note">
          <p>
            We're selective about partnerships. Quality over quantity. Every partner must align with our values, 
            contribute meaningfully, and be committed to the Foundation Before Skills approach.
          </p>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="success-section">
        <div className="section-header">
          <h2>Partner Success Stories</h2>
          <p>Real partnerships, real results (hypothetical examples for illustration)</p>
        </div>

        <div className="success-grid">
          {partnerSuccess.map((story, index) => (
            <div key={index} className="success-card">
              <h3>{story.company}</h3>
              <div className="success-partnership">{story.partnership}</div>
              <div className="success-investment">
                <strong>Investment:</strong> {story.investment}
              </div>
              <div className="success-result">
                <strong>Result:</strong> {story.result}
              </div>
              <div className="success-quote">
                "{story.quote}"
              </div>
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <p>
            <strong>Note:</strong> Success stories are hypothetical examples for illustration purposes. 
            Results vary based on partnership type, implementation, and organizational commitment.
          </p>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact-form" className="contact-section">
        <div className="contact-container">
          <div className="form-header">
            <h2>Start a Partnership Conversation</h2>
            <p>Tell us what you're interested in and we'll get back to you within 24 hours</p>
          </div>

          <div className="contact-form">
            <form onSubmit={(e) => { e.preventDefault(); alert('Form submission coming soon!'); }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" id="name" required placeholder="Jane Smith" />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Job Title *</label>
                  <input type="text" id="title" required placeholder="CEO, Director, Manager" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" required placeholder="jane@company.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required placeholder="07XXX XXX XXX" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="organization">Organization Name *</label>
                  <input type="text" id="organization" required placeholder="Your Company/Org" />
                </div>

                <div className="form-group">
                  <label htmlFor="org-type">Organization Type *</label>
                  <select id="org-type" required>
                    <option value="">Select type</option>
                    <option value="corporate">Corporate / Business</option>
                    <option value="nonprofit">Nonprofit / Charity</option>
                    <option value="education">Education / School</option>
                    <option value="government">Government / Public Sector</option>
                    <option value="startup">Startup / SME</option>
                    <option value="individual">Individual / Entrepreneur</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="partnership-interest">Partnership Interest *</label>
                <select id="partnership-interest" required multiple size={6}>
                  <option value="corporate-training">Corporate Training Workshops</option>
                  <option value="franchise">Franchise Opportunity</option>
                  <option value="platform-license">Platform Licensing</option>
                  <option value="hire-graduates">Hire Graduates</option>
                  <option value="sponsorship">Brand Sponsorship</option>
                  <option value="custom">Custom Partnership</option>
                </select>
                <p className="help-text">Hold Ctrl/Cmd to select multiple options</p>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Approximate Budget Range</label>
                <select id="budget">
                  <option value="">Select range (optional)</option>
                  <option value="under-5k">Under £5,000</option>
                  <option value="5k-15k">£5,000 - £15,000</option>
                  <option value="15k-35k">£15,000 - £35,000</option>
                  <option value="35k-75k">£35,000 - £75,000</option>
                  <option value="75k-plus">£75,000+</option>
                  <option value="tbd">To be discussed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">Desired Timeline *</label>
                <select id="timeline" required>
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (within 1 month)</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell Us About Your Goals *</label>
                <textarea 
                  id="message" 
                  required 
                  rows={5}
                  placeholder="What do you hope to achieve through partnership? What problems are you trying to solve? What attracted you to Wembley Wonders?"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" required />
                  <span>
                    I understand this is a business partnership inquiry (not a donation request) and I'm 
                    authorized to discuss partnerships on behalf of my organization.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Submit Partnership Inquiry
              </button>

              <p className="form-footer-text">
                We'll review your inquiry within 24 hours • All inquiries confidential • No obligation consultation
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Partnership FAQ</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>What's the minimum investment for a partnership?</summary>
            <p>
              Varies by partnership type: Sponsorship starts at £2K/year, Corporate training from £2.5K, 
              Hiring starts at £3K/placement (success-based), Platform license from £12K/year, 
              Franchise from £15K. Custom partnerships are negotiable. Contact us to discuss.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you accept donations or CSR funding?</summary>
            <p>
              We operate a Zero Grant Model. We don't accept traditional donations because we believe in 
              sustainable, value-based partnerships. However, CSR budgets can fund partnerships where your 
              company receives tangible value (training, hiring, sponsorship visibility, etc.).
            </p>
          </details>

          <details className="faq-item">
            <summary>How do you measure partnership ROI?</summary>
            <p>
              Every partnership includes outcome tracking. Corporate training: engagement metrics, retention data. 
              Hiring: placement success, retention rates (currently 85%+). Sponsorship: reach, engagement, brand lift. 
              We provide quarterly reports with hard data, not anecdotes.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we combine multiple partnership types?</summary>
            <p>
              Absolutely! Many partners do: Corporate training + hiring, Sponsorship + franchise, Platform license + 
              training. We offer package discounts for multi-year or multi-type partnerships. Contact us to design 
              a custom partnership portfolio.
            </p>
          </details>

          <details className="faq-item">
            <summary>What's the typical partnership timeline?</summary>
            <p>
              From first conversation to launch: Corporate training (2-4 weeks), Hiring (immediate), 
              Sponsorship (4-8 weeks), Platform license (6-12 weeks), Franchise (3-6 months). 
              We can accelerate timelines when needed.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you work with competitors?</summary>
            <p>
              We don't see other youth organizations as competitors - we see a massive market where collaboration 
              beats competition. However, for corporate/commercial partnerships, we offer category exclusivity 
              options. Discuss your needs with us.
            </p>
          </details>

          <details className="faq-item">
            <summary>What geographic areas do you serve?</summary>
            <p>
              Currently: Brent/Wembley primary hub. Expanding: Northwest London. Franchises can operate anywhere in UK. 
              Platform licenses: global. Corporate training: we travel UK-wide or deliver virtually. 
              Hiring: primarily London-based candidates but open to relocation support.
            </p>
          </details>

          <details className="faq-item">
            <summary>How do I know if a partnership is right for us?</summary>
            <p>
              Schedule a no-obligation consultation call. We'll discuss your goals, budget, timeline, and recommend 
              the best partnership model(s). We're selective - we only partner where there's genuine mutual value. 
              Not every inquiry becomes a partnership, and that's okay.
            </p>
          </details>
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <Link to="/contact" className="btn-secondary">Schedule a Call</Link>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>Ready to Partner With Wembley Wonders?</h2>
          <p>
            Six partnership models. 80% engagement. 50-year track record. Zero grant dependency.
            <br />
            Let's build something sustainable together.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('partnership-types')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Partnership Options
          </button>
          <p className="trust-badges">
            🏛️ LSBU & MMU Partners | 🏦 Co-op Bank Supported | 🏆 Brent Council Approved
          </p>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsPage;