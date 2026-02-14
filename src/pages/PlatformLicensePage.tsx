// src/pages/PlatformLicensePage.tsx
// B2B SAAS REVENUE PAGE - £12-18K/year recurring
// Focus: License our £250K digital platform to other organizations

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlatformLicensePage.css';

const PlatformLicensePage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const licenseTiers = [
    {
      id: 'starter',
      name: 'Starter License',
      price: '£12,000/year',
      participants: 'Up to 100 participants',
      icon: '🌱',
      bestFor: 'Small youth orgs, community groups',
      description: 'Complete digital infrastructure for your youth programme. White-label our £250K platform for a fraction of the cost.',
      includes: [
        'Full platform access (white-labeled)',
        'Participant management system',
        'Programme scheduling & calendar',
        'Engagement tracking & analytics',
        'Digital badges & achievements',
        'Parent/guardian portal',
        'Basic customization (colors, logo)',
        'Implementation support (4 weeks)',
        'Email support',
        'Monthly platform updates'
      ],
      outcomes: [
        'Launch digital infrastructure in 4 weeks',
        'Track 100 participants efficiently',
        'Professional branded experience',
        'Save £200K+ vs building yourself'
      ],
      color: '#0ea5e9'
    },
    {
      id: 'growth',
      name: 'Growth License',
      price: '£18,000/year',
      participants: 'Up to 500 participants',
      icon: '🚀',
      bestFor: 'Established orgs, schools, councils',
      description: 'Scale-ready platform with advanced features, API access, and priority support. Everything you need to grow.',
      includes: [
        'Everything in Starter License',
        'Advanced customization (full branding)',
        'API access for integrations',
        'Custom reporting & dashboards',
        'Multi-programme management',
        'Staff role management',
        'SMS notifications (included)',
        'Priority email + phone support',
        'Quarterly strategy sessions',
        'Beta access to new features',
        'Dedicated account manager'
      ],
      outcomes: [
        'Manage 500+ participants seamlessly',
        'Integrate with existing systems',
        'Advanced analytics & insights',
        'Scale without platform constraints'
      ],
      color: '#10b981',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise License',
      price: 'Custom Pricing',
      participants: 'Unlimited participants',
      icon: '🏢',
      bestFor: 'Large orgs, multi-site operations, councils',
      description: 'Full enterprise solution. Custom features, dedicated infrastructure, white-label reselling rights.',
      includes: [
        'Everything in Growth License',
        'Unlimited participants',
        'Custom feature development',
        'Dedicated infrastructure (optional)',
        'White-label reselling rights',
        'Multi-site/multi-org management',
        'Advanced security & compliance',
        'Dedicated implementation team',
        '24/7 priority support',
        'Quarterly on-site training',
        'SLA guarantees',
        'Co-development partnership'
      ],
      outcomes: [
        'Enterprise-grade solution',
        'Custom features for your needs',
        'Resell to your network',
        'Strategic technology partnership'
      ],
      color: '#8b5cf6',
      premium: true
    }
  ];

  const platformFeatures = [
    {
      category: 'Participant Management',
      icon: '👥',
      features: [
        'Digital enrollment & applications',
        'Participant profiles & history',
        'Attendance tracking',
        'Progress monitoring',
        'Notes & incident logging',
        'Parent/guardian accounts'
      ]
    },
    {
      category: 'Programme Delivery',
      icon: '📅',
      features: [
        'Programme scheduling',
        'Workshop calendar',
        'Session planning tools',
        'Resource library',
        'Digital curriculum',
        'Staff assignment'
      ]
    },
    {
      category: 'Engagement & Gamification',
      icon: '🎯',
      features: [
        'Digital badges & achievements',
        'Points & rewards system',
        'Leaderboards (optional)',
        'Challenge tracking',
        'Milestone celebrations',
        'Engagement analytics'
      ]
    },
    {
      category: 'Analytics & Reporting',
      icon: '📊',
      features: [
        'Real-time dashboards',
        'Engagement metrics',
        'Attendance reports',
        'Outcome tracking',
        'Custom report builder',
        'Export capabilities'
      ]
    },
    {
      category: 'Communications',
      icon: '💬',
      features: [
        'Email notifications',
        'SMS alerts (Growth+)',
        'In-app messaging',
        'Parent updates',
        'Programme announcements',
        'Emergency broadcasts'
      ]
    },
    {
      category: 'Administration',
      icon: '⚙️',
      features: [
        'Staff role management',
        'Permission controls',
        'Multi-programme setup',
        'Payment tracking',
        'Document storage',
        'Audit logs'
      ]
    }
  ];

  const whyLicense = [
    {
      icon: '💰',
      title: 'Save £200K+',
      stat: '95% savings',
      description: 'Building this platform cost us £250K over 2 years. License it for £12-18K/year. ROI immediate.'
    },
    {
      icon: '⚡',
      title: 'Launch in 4 Weeks',
      stat: '4 weeks',
      description: 'No 18-month development cycle. No hiring developers. White-label, configure, launch. That simple.'
    },
    {
      icon: '🎯',
      title: 'Proven at Scale',
      stat: '80%',
      description: 'Powers our 80% engagement rate. Battle-tested with the hardest-to-engage demographic. It works.'
    },
    {
      icon: '🔄',
      title: 'Always Current',
      stat: 'Monthly updates',
      description: 'We maintain it. We improve it. You benefit automatically. No tech debt, no obsolescence.'
    }
  ];

  const buildVsBuy = {
    build: {
      option: 'Build In-House',
      cost: '£250,000+',
      time: '18-24 months',
      team: 'Hire: PM, 3 devs, designer',
      risk: 'High - 70% fail',
      maintenance: '£40-60K/year ongoing',
      updates: 'Your responsibility',
      support: 'You provide it'
    },
    buy: {
      option: 'License Our Platform',
      cost: '£12-18K/year',
      time: '4 weeks to launch',
      team: 'No hiring needed',
      risk: 'Low - proven system',
      maintenance: 'Included in license',
      updates: 'Automatic, included',
      support: 'We provide it'
    }
  };

  const successStories = [
    {
      org: 'Youth Charity (Hypothetical)',
      type: 'Nonprofit',
      size: '150 participants',
      license: 'Starter License',
      investment: '£12,000/year',
      results: [
        'Launched in 3 weeks vs 18-month build estimate',
        'Tracking 150 participants across 8 programmes',
        'Parent engagement up 60% (portal access)',
        'Staff time saved: 15 hours/week on admin',
        'Avoided £250K+ development costs'
      ],
      quote: 'We almost built our own platform. Thank god we didn\'t. £12K to get what would have cost us £250K? No-brainer.',
      roi: 'Saved £238K capital + 15 hours/week staff time'
    },
    {
      org: 'School (Hypothetical)',
      type: 'Education',
      size: '400 students',
      license: 'Growth License',
      investment: '£18,000/year',
      results: [
        'Integrated with existing student information system via API',
        'Managing 400 students across after-school programmes',
        'Custom reports for board meetings',
        'Reduced no-shows by 40% (SMS reminders)',
        'Parents love the mobile-friendly portal'
      ],
      quote: 'The API access was crucial. We integrated with our SIS seamlessly. The Growth tier was perfect for our scale.',
      roi: '£18K vs £300K+ to build + integrate ourselves'
    }
  ];

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="platform-license-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">💻</span>
            <span className="badge-text">£250K Platform • 4-Week Launch • White-Label Ready</span>
          </div>
          
          <h1 className="hero-title">
            License Our <span className="highlight">£250K Digital Platform</span>
            <br />
            For £12-18K/Year
          </h1>
          
          <p className="hero-subtitle">
            Stop wasting £250K+ building your own youth programme platform. White-label ours. 
            Launch in 4 weeks, not 2 years. Battle-tested infrastructure that powers 80% engagement.
          </p>

          <div className="hero-value-props">
            <div className="value-prop">
              <div className="value-icon">💰</div>
              <div className="value-text">
                <div className="value-stat">95% savings</div>
                <div className="value-label">vs Building In-House</div>
              </div>
            </div>
            <div className="value-prop">
              <div className="value-icon">⚡</div>
              <div className="value-text">
                <div className="value-stat">4 weeks</div>
                <div className="value-label">To Launch</div>
              </div>
            </div>
            <div className="value-prop">
              <div className="value-icon">🎯</div>
              <div className="value-text">
                <div className="value-stat">80%</div>
                <div className="value-label">Engagement Powered</div>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('license-tiers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View License Tiers
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => document.getElementById('platform-demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Platform Features
            </button>
          </div>

          <p className="trust-text">
            Trusted by Youth Orgs, Schools, Councils • White-Label • Full Support Included
          </p>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-header">
          <h2>The Platform Problem</h2>
          <p>Why building your own is a terrible idea</p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">💸</div>
            <h3>Massive Cost</h3>
            <p>
              Custom platform development: £250-500K. Hire PM, 3 developers, designer. 18-24 months. 
              Then £40-60K/year maintenance. Most orgs can't afford it.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">⏰</div>
            <h3>Endless Timeline</h3>
            <p>
              By the time you finish building (if you finish), technology has moved on. Requirements 
              changed. Staff turned over. You're stuck with legacy tech on day one.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">💥</div>
            <h3>High Failure Rate</h3>
            <p>
              70% of custom software projects fail or are abandoned. Scope creep, budget overruns, 
              technical debt. Even if you finish, it might not work as planned.
            </p>
          </div>
        </div>

        <div className="problem-insight">
          <h3>The Truth:</h3>
          <p>
            Most youth organizations don't need custom software. They need proven infrastructure they 
            can brand as their own. That's exactly what we offer - our battle-tested platform that 
            powers 80% engagement, white-labeled for your organization.
          </p>
        </div>
      </section>

      {/* WHY LICENSE SECTION */}
      <section className="why-license-section">
        <div className="section-header">
          <h2>Why License Our Platform?</h2>
          <p>Four reasons this beats building your own</p>
        </div>

        <div className="why-grid">
          {whyLicense.map((reason, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <div className="why-stat">{reason.stat}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BUILD VS BUY COMPARISON */}
      <section className="comparison-section">
        <div className="section-header">
          <h2>Build vs. Buy: The Reality</h2>
          <p>Honest comparison of your options</p>
        </div>

        <div className="comparison-table">
          <div className="comparison-row header">
            <div className="comparison-cell"></div>
            <div className="comparison-cell build-header">
              <h4>❌ Build In-House</h4>
            </div>
            <div className="comparison-cell buy-header">
              <h4>✓ License Our Platform</h4>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Total Cost</div>
            <div className="comparison-cell build">{buildVsBuy.build.cost}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.cost}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Time to Launch</div>
            <div className="comparison-cell build">{buildVsBuy.build.time}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.time}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Team Required</div>
            <div className="comparison-cell build">{buildVsBuy.build.team}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.team}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Risk Level</div>
            <div className="comparison-cell build">{buildVsBuy.build.risk}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.risk}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Maintenance</div>
            <div className="comparison-cell build">{buildVsBuy.build.maintenance}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.maintenance}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Updates</div>
            <div className="comparison-cell build">{buildVsBuy.build.updates}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.updates}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Support</div>
            <div className="comparison-cell build">{buildVsBuy.build.support}</div>
            <div className="comparison-cell buy">{buildVsBuy.buy.support}</div>
          </div>
        </div>

        <div className="comparison-conclusion">
          <h3>The Math:</h3>
          <p>
            Build: £250K+ upfront + £50K/year maintenance = £400K over 3 years
            <br />
            License: £12-18K/year × 3 years = £36-54K over 3 years
            <br />
            <strong>You save £346-364K over 3 years. Plus you launch NOW, not in 2 years.</strong>
          </p>
        </div>
      </section>

      {/* PLATFORM FEATURES SECTION */}
      <section id="platform-demo" className="features-section">
        <div className="section-header">
          <h2>What's Included in the Platform</h2>
          <p>Complete digital infrastructure for youth programmes</p>
        </div>

        <div className="features-grid">
          {platformFeatures.map((category, index) => (
            <div key={index} className="feature-category">
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.category}</h3>
              </div>
              <ul className="feature-list">
                {category.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="features-note">
          <p>
            <strong>Plus:</strong> Mobile-responsive design, GDPR compliance, data security, 
            regular backups, 99.9% uptime SLA (Enterprise), and continuous improvements based 
            on real-world usage.
          </p>
        </div>
      </section>

      {/* LICENSE TIERS SECTION */}
      <section id="license-tiers" className="tiers-section">
        <div className="section-header">
          <h2>Choose Your License Tier</h2>
          <p>Three options to match your scale and needs</p>
        </div>

        <div className="tiers-grid">
          {licenseTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`tier-card ${selectedTier === tier.id ? 'selected' : ''} ${tier.popular ? 'popular' : ''} ${tier.premium ? 'premium' : ''}`}
              onClick={() => handleTierSelect(tier.id)}
            >
              {tier.popular && <div className="tier-badge">Most Popular</div>}
              {tier.premium && <div className="tier-badge premium-badge">Enterprise</div>}
              
              <div className="tier-icon" style={{ color: tier.color }}>{tier.icon}</div>
              <h3 className="tier-name">{tier.name}</h3>
              <div className="tier-price">{tier.price}</div>
              <div className="tier-participants">{tier.participants}</div>
              
              <div className="tier-best-for">
                <strong>Best for:</strong> {tier.bestFor}
              </div>

              <p className="tier-description">{tier.description}</p>

              <div className="tier-includes">
                <h4>What's Included:</h4>
                <ul>
                  {tier.includes.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="tier-outcomes">
                <h4>Key Benefits:</h4>
                <ul>
                  {tier.outcomes.map((outcome, index) => (
                    <li key={index}>→ {outcome}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="tier-select-btn"
                style={{ 
                  background: selectedTier === tier.id 
                    ? `linear-gradient(135deg, ${tier.color} 0%, ${tier.color}dd 100%)` 
                    : 'transparent',
                  borderColor: tier.color
                }}
              >
                {selectedTier === tier.id ? '✓ Selected' : 'Select This Tier'}
              </button>
            </div>
          ))}
        </div>

        <div className="tiers-note">
          <h3>Not Sure Which Tier?</h3>
          <p>
            Schedule a demo call. We'll assess your participant count, feature needs, and 
            integration requirements to recommend the right tier.
          </p>
          <Link to="/contact" className="btn-secondary">Request Demo</Link>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="success-section">
        <div className="section-header">
          <h2>Licensee Success Stories</h2>
          <p>Organizations using our platform (hypothetical examples)</p>
        </div>

        <div className="success-grid">
          {successStories.map((story, index) => (
            <div key={index} className="success-card">
              <div className="success-header">
                <h3>{story.org}</h3>
                <div className="success-meta">
                  <span className="success-type">{story.type}</span>
                  <span className="success-size">{story.size}</span>
                </div>
                <div className="success-license">{story.license}</div>
              </div>

              <div className="success-investment">
                <strong>Investment:</strong> {story.investment}
              </div>

              <div className="success-results">
                <h4>Results:</h4>
                <ul>
                  {story.results.map((result, idx) => (
                    <li key={idx}>✓ {result}</li>
                  ))}
                </ul>
              </div>

              <div className="success-quote">
                "{story.quote}"
              </div>

              <div className="success-roi">
                <strong>ROI:</strong> {story.roi}
              </div>
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <p>
            <strong>Note:</strong> Success stories are hypothetical examples for illustration. 
            Results vary by organization, implementation quality, and usage patterns. Platform 
            capabilities are real and proven in our own operations.
          </p>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="inquiry-container">
          <div className="form-header">
            <h2>Request Platform License Demo</h2>
            <p>
              {selectedTier 
                ? `You selected ${licenseTiers.find(t => t.id === selectedTier)?.name}` 
                : 'Select a license tier above to get started'}
            </p>
          </div>

          {selectedTier ? (
            <div className="inquiry-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submission coming soon!'); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" id="name" required placeholder="Jane Smith" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Job Title *</label>
                    <input type="text" id="title" required placeholder="Director, CEO, CTO" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" required placeholder="jane@organization.org" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" required placeholder="07XXX XXX XXX" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organization">Organization Name *</label>
                    <input type="text" id="organization" required placeholder="Your Organization" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="org-type">Organization Type *</label>
                    <select id="org-type" required>
                      <option value="">Select type</option>
                      <option value="nonprofit">Nonprofit / Charity</option>
                      <option value="school">School / Education</option>
                      <option value="council">Local Council / Government</option>
                      <option value="social-enterprise">Social Enterprise</option>
                      <option value="youth-org">Youth Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="tier">Selected License Tier</label>
                  <select id="tier" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                    {licenseTiers.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.name} - {tier.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="participant-count">Current Participant Count *</label>
                  <select id="participant-count" required>
                    <option value="">Select range</option>
                    <option value="0-50">0-50 participants</option>
                    <option value="51-100">51-100 participants</option>
                    <option value="101-250">101-250 participants</option>
                    <option value="251-500">251-500 participants</option>
                    <option value="500+">500+ participants</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Desired Launch Timeline *</label>
                  <select id="timeline" required>
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 4 weeks)</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="requirements">Your Platform Needs *</label>
                  <textarea 
                    id="requirements" 
                    required 
                    rows={4}
                    placeholder="Tell us about your current setup, what you need from a platform, any specific integrations, and what success looks like..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I understand this is an annual license (£12-18K/year or custom pricing for Enterprise) 
                      and I'm authorized to discuss platform licensing on behalf of my organization.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-submit">
                  Request Demo & Pricing
                </button>

                <p className="form-footer-text">
                  We'll respond within 24 hours to schedule a platform demo • No obligation • Custom pricing available
                </p>
              </form>
            </div>
          ) : (
            <div className="no-tier-selected">
              <p>👆 Please select a license tier above to access the demo request form</p>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('license-tiers')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View License Tiers
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Platform License FAQ</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>What exactly am I licensing?</summary>
            <p>
              You're licensing our complete digital platform - white-labeled with your branding. Includes: 
              participant management, programme scheduling, engagement tracking, analytics, communications, 
              and more. You get full platform access, we handle hosting, maintenance, updates, and support.
            </p>
          </details>

          <details className="faq-item">
            <summary>How does white-labeling work?</summary>
            <p>
              Starter: We customize colors and add your logo. Growth/Enterprise: Full branding customization 
              including custom domain (yourorg.com), all UI elements, email templates. To users, it looks 
              like YOUR platform, not ours.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we add custom features?</summary>
            <p>
              Starter/Growth: Platform as-is (very comprehensive already). Enterprise: Yes, custom feature 
              development available. We assess feasibility, quote cost, and build it into the platform. 
              If beneficial to all clients, included at no extra charge.
            </p>
          </details>

          <details className="faq-item">
            <summary>What about data ownership and privacy?</summary>
            <p>
              YOUR data is YOUR data. We host it securely, but you own it. GDPR compliant. You can export 
              all data anytime. Enterprise tier can opt for dedicated infrastructure if required. We never 
              share participant data across licensees.
            </p>
          </details>

          <details className="faq-item">
            <summary>What if we need to integrate with other systems?</summary>
            <p>
              Growth/Enterprise tiers include API access. We can integrate with: CRMs, student information 
              systems, payment processors, communication tools, etc. Common integrations already built. 
              Custom integrations available (Enterprise).
            </p>
          </details>

          <details className="faq-item">
            <summary>How quickly can we launch?</summary>
            <p>
              Typical timeline: 4 weeks from contract signing to go-live. Week 1: Setup and branding. 
              Week 2-3: Data migration and training. Week 4: Testing and launch. Enterprise may take 
              6-8 weeks for complex customizations.
            </p>
          </details>

          <details className="faq-item">
            <summary>What happens if we outgrow our tier?</summary>
            <p>
              Easy upgrade anytime. Pro-rated pricing for remainder of annual term. No data migration needed 
              - just unlock additional features. Most clients start Starter, upgrade to Growth within 12 months.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we cancel the license?</summary>
            <p>
              Annual commitment required. After Year 1, cancel with 90 days notice. We provide full data 
              export. No lock-in beyond annual term. Most clients renew - platform is too valuable to abandon.
            </p>
          </details>
        </div>

        <div className="faq-cta">
          <p>More questions?</p>
          <Link to="/contact" className="btn-secondary">Schedule a Call</Link>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>Ready to Launch Your Digital Platform?</h2>
          <p>
            £250K platform for £12-18K/year. 4 weeks to launch. White-label. Full support.
            <br />
            Stop planning to build. Start using proven infrastructure.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('license-tiers')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View License Tiers
          </button>
          <p className="trust-badges">
            💻 Battle-Tested Platform | ⚡ 4-Week Launch | 🎯 80% Engagement Powered
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlatformLicensePage;