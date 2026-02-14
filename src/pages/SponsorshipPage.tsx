// src/pages/SponsorshipPage.tsx
// B2B SPONSORSHIP PAGE - £5-12K/year from brand partnerships
// Focus: Convert brands to sponsor programmes, events, and media channels

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SponsorshipPage.css';

const SponsorshipPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const sponsorshipPackages = [
    {
      id: 'programme',
      name: 'Programme Sponsorship',
      price: '£5,000/year',
      icon: '🎯',
      reach: '200-300 participants',
      bestFor: 'Brands targeting youth & families',
      description: 'Sponsor a specific programme (Raydyo, Joystick, Pageturners, etc). Logo placement, brand mentions, participant touchpoints.',
      includes: [
        'Programme title sponsorship',
        'Logo on all programme materials',
        'Brand mention in communications',
        'Social media shout-outs (quarterly)',
        'Presence at programme events',
        'Participant thank-you message',
        'Annual impact report featuring brand',
        'Community goodwill & reputation'
      ],
      outcomes: [
        'Authentic youth community reach',
        'Brand visibility: 200-300 participants + families',
        'Measurable impact attribution',
        'Tax-deductible community investment'
      ],
      color: '#0ea5e9'
    },
    {
      id: 'media',
      name: 'Media Sponsorship',
      price: '£8,000/year',
      icon: '📻',
      reach: '1,000+ monthly listeners/readers',
      bestFor: 'Brands wanting ongoing visibility',
      description: 'Sponsor Raydyo radio show OR Joystick magazine. Regular ad placements, content integration, sustained brand presence.',
      includes: [
        'Title sponsorship: "Raydyo, powered by [Brand]"',
        'Ad spots: 30 seconds, weekly broadcasts',
        'Logo on digital/print materials',
        'Social media integration',
        'Content collaboration opportunities',
        'Exclusive community partner status',
        'Quarterly performance reports',
        'First refusal on event sponsorships'
      ],
      outcomes: [
        'Weekly brand touchpoints',
        'Authentic community integration',
        '1,000+ monthly impressions',
        'Content amplification via social channels'
      ],
      color: '#10b981',
      popular: true
    },
    {
      id: 'event',
      name: 'Event Sponsorship',
      price: '£3,000-10,000/event',
      icon: '🎪',
      reach: '500-2,000 attendees',
      bestFor: 'Brands wanting high-impact moments',
      description: 'Title sponsor for major events (workshops, showcases, competitions, celebrations). High visibility, direct engagement.',
      includes: [
        'Event title rights: "[Brand] presents..."',
        'Logo prominence at venue',
        'Brand booth/activation space',
        'Speaking/presentation opportunity',
        'Branded giveaways distribution',
        'Social media coverage (before/during/after)',
        'Photo/video content rights',
        'Post-event impact summary'
      ],
      outcomes: [
        'Direct engagement: 500-2,000 attendees',
        'Brand association with success moments',
        'Content creation opportunities',
        'Community hero status'
      ],
      color: '#f59e0b'
    },
    {
      id: 'annual',
      name: 'Annual Partnership',
      price: '£15,000/year',
      icon: '🤝',
      reach: '2,000+ community touchpoints',
      bestFor: 'Strategic community investment',
      description: 'Become our official community partner. All-access sponsorship across programmes, media, and events. Maximum visibility.',
      includes: [
        'Everything in all packages above',
        'Official Community Partner status',
        'Logo on website homepage',
        'Quarterly co-branded content',
        'Priority event access',
        'Annual community celebration title sponsor',
        'Board meeting attendance (observer)',
        'Strategic input on initiatives',
        'Comprehensive impact reporting',
        'Media mentions across all channels'
      ],
      outcomes: [
        'Maximum brand visibility',
        'Strategic community positioning',
        'Deep relationship with youth community',
        'Measurable social impact attribution'
      ],
      color: '#8b5cf6',
      premium: true
    }
  ];

  const whySponsor = [
    {
      icon: '🎯',
      title: 'Authentic Reach',
      stat: '80%',
      description: 'Not advertising - authentic community integration. We have 80% engagement because people WANT to be here. Your brand benefits from that trust.'
    },
    {
      icon: '💰',
      title: 'Better ROI',
      stat: '10x',
      description: 'Traditional youth advertising: £50K+ campaigns, questionable reach. Our sponsorships: £3-15K, guaranteed engaged audience, measurable impact.'
    },
    {
      icon: '📊',
      title: 'Measurable Impact',
      stat: '100%',
      description: 'We track everything. Impressions, engagement, sentiment. You get quarterly reports showing exactly what your sponsorship achieved.'
    },
    {
      icon: '🌟',
      title: 'Community Credibility',
      stat: '50+ years',
      description: 'We\'ve been here since the 1970s. Families trust us. When we endorse a sponsor, that trust transfers. You can\'t buy that elsewhere.'
    }
  ];

  const sponsorshipChannels = [
    {
      channel: 'Raydyo Radio',
      icon: '📻',
      audience: '500+ monthly listeners',
      format: 'Weekly radio show, podcast, social media',
      opportunities: [
        'Show title sponsorship',
        '30-second ad spots',
        'Host-read endorsements',
        'Sponsored segments',
        'Content collaboration',
        'Live event presence'
      ],
      demographics: 'Ages 14-24, diverse, Wembley/Brent area'
    },
    {
      channel: 'Joystick Magazine',
      icon: '🎮',
      audience: '300+ monthly readers',
      format: 'Digital/print magazine, gaming content',
      opportunities: [
        'Magazine title sponsorship',
        'Full-page ads',
        'Sponsored articles/reviews',
        'Product placement',
        'Gaming tournament sponsorship',
        'Content partnerships'
      ],
      demographics: 'Ages 12-20, gaming enthusiasts, tech-savvy'
    },
    {
      channel: 'Pageturners Programme',
      icon: '📚',
      audience: '150 participants/year',
      format: 'Reading programme, workshops, events',
      opportunities: [
        'Programme sponsorship',
        'Book donation partnership',
        'Workshop sponsorship',
        'Reading competition title sponsor',
        'Author event sponsorship',
        'Literacy campaign partner'
      ],
      demographics: 'Ages 8-16, families, education-focused'
    },
    {
      channel: 'Major Events',
      icon: '🎪',
      audience: '500-2,000/event',
      format: 'Showcases, competitions, celebrations',
      opportunities: [
        'Event title sponsorship',
        'On-site brand activation',
        'Prize sponsorship',
        'VIP area sponsorship',
        'Photography/video rights',
        'Branded merchandise'
      ],
      demographics: 'All ages, families, community-wide reach'
    },
    {
      channel: 'Digital Channels',
      icon: '💻',
      audience: '2,000+ social followers',
      format: 'Website, social media, email',
      opportunities: [
        'Website banner ads',
        'Social media posts',
        'Email newsletter features',
        'Blog content sponsorship',
        'Digital campaign partnerships',
        'Influencer collaborations'
      ],
      demographics: 'All ages, parents, community stakeholders'
    }
  ];

  const successStories = [
    {
      sponsor: 'Local Tech Company (Hypothetical)',
      package: 'Media Sponsorship - Joystick',
      investment: '£8,000/year',
      duration: '12 months',
      results: [
        'Logo on 12 magazine issues',
        '48 social media mentions',
        '1,200+ impressions/month',
        'Recruited 3 interns from programme',
        'Massive brand lift with youth demographic'
      ],
      quote: 'We tried traditional youth advertising - £50K budget, no results. £8K with Wembley Wonders got us real engagement, actual hires, and community credibility.',
      roi: '£8K investment, hired 3 interns (£24K traditional recruitment cost saved), plus brand visibility'
    },
    {
      sponsor: 'Community Bank (Hypothetical)',
      package: 'Annual Partnership',
      investment: '£15,000/year',
      duration: '24 months (renewed)',
      results: [
        'Official Community Partner status',
        'Brand presence at 15+ events',
        'Quarterly co-branded financial literacy workshops',
        'Featured in all communications',
        'Opened 50+ youth accounts directly attributed'
      ],
      quote: 'Best marketing investment we make. Not just visibility - we\'re genuinely helping the community AND building future customers. Win-win.',
      roi: '50 new accounts = £250K+ lifetime customer value, plus immeasurable brand reputation'
    }
  ];

  const traditionalVsUs = {
    traditional: {
      approach: 'Traditional Youth Marketing',
      cost: '£50,000-100,000',
      reach: 'Broad, unengaged audience',
      credibility: 'Advertising skepticism',
      measurement: 'Impressions, clicks (vanity metrics)',
      relationship: 'Transactional, one-off',
      impact: 'Minimal community connection'
    },
    wembley: {
      approach: 'Wembley Wonders Sponsorship',
      cost: '£3,000-15,000',
      reach: 'Highly engaged community',
      credibility: 'Trusted endorsement',
      measurement: 'Real engagement, impact attribution',
      relationship: 'Partnership, ongoing',
      impact: 'Authentic community integration'
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sponsorship-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">📢</span>
            <span className="badge-text">80% Engaged Audience • 50 Years Trust • Authentic Community Reach</span>
          </div>
          
          <h1 className="hero-title">
            Sponsor <span className="highlight">Wembley Wonders</span>
            <br />
            Reach an Authentically Engaged Community
          </h1>
          
          <p className="hero-subtitle">
            Stop wasting £50K+ on youth marketing that doesn't work. Sponsor our programmes, events, 
            or media channels. Reach 2,000+ highly engaged participants and families who actually trust us.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">80%</div>
              <div className="stat-label">Engagement Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">2,000+</div>
              <div className="stat-label">Community Reach</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Years Trusted</div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('sponsorship-packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Sponsorship Packages
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => document.getElementById('sponsorship-channels')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Sponsorship Channels
            </button>
          </div>

          <p className="trust-text">
            Trusted by Local Businesses, Brands, Community Partners • Tax-Deductible • Measurable Impact
          </p>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-header">
          <h2>The Youth Marketing Problem</h2>
          <p>Why traditional approaches fail</p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">💸</div>
            <h3>Expensive & Ineffective</h3>
            <p>
              Traditional youth marketing: £50-100K campaigns. Social media ads. Influencer partnerships. 
              High cost, low engagement, zero trust. Youth see through advertising immediately.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🎭</div>
            <h3>Zero Credibility</h3>
            <p>
              Gen Z trusts brands less than any generation. They ignore ads, use ad blockers, skip 
              sponsorships. Traditional marketing is white noise. You need authentic community integration.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">📉</div>
            <h3>Unmeasurable Results</h3>
            <p>
              "Impressions" and "reach" are vanity metrics. Did anyone actually engage? Did brand sentiment 
              improve? Did it drive behavior? Most youth marketing can't answer these questions.
            </p>
          </div>
        </div>

        <div className="problem-insight">
          <h3>The Solution:</h3>
          <p>
            Partner with organizations youth already trust. We have 80% engagement because participants 
            CHOOSE to be here. When we endorse a sponsor, that trust transfers. You get authentic reach, 
            not advertising skepticism.
          </p>
        </div>
      </section>

      {/* WHY SPONSOR SECTION */}
      <section className="why-sponsor-section">
        <div className="section-header">
          <h2>Why Sponsor Wembley Wonders?</h2>
          <p>Four reasons we deliver better ROI than traditional marketing</p>
        </div>

        <div className="why-grid">
          {whySponsor.map((reason, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <div className="why-stat">{reason.stat}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="comparison-section">
        <div className="section-header">
          <h2>Traditional Marketing vs. Community Sponsorship</h2>
          <p>Why our model works better</p>
        </div>

        <div className="comparison-table">
          <div className="comparison-row header">
            <div className="comparison-cell"></div>
            <div className="comparison-cell traditional-header">
              <h4>❌ Traditional Youth Marketing</h4>
            </div>
            <div className="comparison-cell wembley-header">
              <h4>✓ Wembley Sponsorship</h4>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Annual Cost</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.cost}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.cost}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Audience Type</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.reach}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.reach}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Credibility</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.credibility}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.credibility}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Measurement</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.measurement}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.measurement}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Relationship</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.relationship}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.relationship}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Community Impact</div>
            <div className="comparison-cell traditional">{traditionalVsUs.traditional.impact}</div>
            <div className="comparison-cell wembley">{traditionalVsUs.wembley.impact}</div>
          </div>
        </div>

        <div className="comparison-conclusion">
          <h3>The ROI Math:</h3>
          <p>
            Traditional: £75K average spend, questionable engagement, zero community connection.
            <br />
            Our sponsorship: £3-15K, guaranteed engaged audience, authentic community credibility.
            <br />
            <strong>You save £60-72K AND get better results. That's 5-10x ROI improvement.</strong>
          </p>
        </div>
      </section>

      {/* SPONSORSHIP CHANNELS SECTION */}
      <section id="sponsorship-channels" className="channels-section">
        <div className="section-header">
          <h2>Sponsorship Channels</h2>
          <p>Five ways to reach our community</p>
        </div>

        <div className="channels-grid">
          {sponsorshipChannels.map((channel, index) => (
            <div key={index} className="channel-card">
              <div className="channel-header">
                <div className="channel-icon">{channel.icon}</div>
                <h3>{channel.channel}</h3>
              </div>

              <div className="channel-audience">
                <strong>Audience:</strong> {channel.audience}
              </div>

              <div className="channel-format">
                <strong>Format:</strong> {channel.format}
              </div>

              <div className="channel-opportunities">
                <h4>Sponsorship Opportunities:</h4>
                <ul>
                  {channel.opportunities.map((opp, idx) => (
                    <li key={idx}>• {opp}</li>
                  ))}
                </ul>
              </div>

              <div className="channel-demographics">
                <strong>Demographics:</strong> {channel.demographics}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORSHIP PACKAGES SECTION */}
      <section id="sponsorship-packages" className="packages-section">
        <div className="section-header">
          <h2>Sponsorship Packages</h2>
          <p>Four levels to match your budget and goals</p>
        </div>

        <div className="packages-grid">
          {sponsorshipPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''} ${pkg.premium ? 'premium' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && <div className="package-badge">Most Popular</div>}
              {pkg.premium && <div className="package-badge premium-badge">Maximum Impact</div>}
              
              <div className="package-icon" style={{ color: pkg.color }}>{pkg.icon}</div>
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-price">{pkg.price}</div>
              <div className="package-reach">{pkg.reach}</div>
              
              <div className="package-best-for">
                <strong>Best for:</strong> {pkg.bestFor}
              </div>

              <p className="package-description">{pkg.description}</p>

              <div className="package-includes">
                <h4>What's Included:</h4>
                <ul>
                  {pkg.includes.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="package-outcomes">
                <h4>Expected Outcomes:</h4>
                <ul>
                  {pkg.outcomes.map((outcome, index) => (
                    <li key={index}>→ {outcome}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="package-select-btn"
                style={{ 
                  background: selectedPackage === pkg.id 
                    ? `linear-gradient(135deg, ${pkg.color} 0%, ${pkg.color}dd 100%)` 
                    : 'transparent',
                  borderColor: pkg.color
                }}
              >
                {selectedPackage === pkg.id ? '✓ Selected' : 'Select This Package'}
              </button>
            </div>
          ))}
        </div>

        <div className="packages-note">
          <h3>Custom Sponsorship?</h3>
          <p>
            Have a specific idea? Want to sponsor something not listed? We're flexible. 
            Let's discuss a custom sponsorship package that meets your goals and budget.
          </p>
          <Link to="/contact" className="btn-secondary">Discuss Custom Sponsorship</Link>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="success-section">
        <div className="section-header">
          <h2>Sponsor Success Stories</h2>
          <p>Brands achieving real ROI (hypothetical examples)</p>
        </div>

        <div className="success-grid">
          {successStories.map((story, index) => (
            <div key={index} className="success-card">
              <div className="success-header">
                <h3>{story.sponsor}</h3>
                <div className="success-package">{story.package}</div>
              </div>

              <div className="success-investment">
                <strong>Investment:</strong> {story.investment}
                <br />
                <strong>Duration:</strong> {story.duration}
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
            Results vary by sponsor goals, package selected, and measurement methodology. 
            Sponsorship benefits are real but outcomes depend on implementation and partnership quality.
          </p>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="inquiry-container">
          <div className="form-header">
            <h2>Request Sponsorship Information</h2>
            <p>
              {selectedPackage 
                ? `You selected ${sponsorshipPackages.find(p => p.id === selectedPackage)?.name}` 
                : 'Select a sponsorship package above to get started'}
            </p>
          </div>

          {selectedPackage ? (
            <div className="inquiry-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submission coming soon!'); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" id="name" required placeholder="Jane Smith" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Job Title *</label>
                    <input type="text" id="title" required placeholder="Marketing Director, CMO" />
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
                    <label htmlFor="company">Company/Brand Name *</label>
                    <input type="text" id="company" required placeholder="Your Company" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="industry">Industry *</label>
                    <input type="text" id="industry" required placeholder="Tech, Retail, Finance, etc." />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="package">Selected Package</label>
                  <select id="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                    {sponsorshipPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Annual Marketing Budget for Youth/Community *</label>
                  <select id="budget" required>
                    <option value="">Select range</option>
                    <option value="under-5k">Under £5,000</option>
                    <option value="5k-15k">£5,000 - £15,000</option>
                    <option value="15k-50k">£15,000 - £50,000</option>
                    <option value="50k-plus">£50,000+</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Desired Start Timeline *</label>
                  <select id="timeline" required>
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (this month)</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="next-year">Next fiscal year</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="goals">Your Sponsorship Goals *</label>
                  <textarea 
                    id="goals" 
                    required 
                    rows={4}
                    placeholder="What do you hope to achieve? Brand awareness? Community engagement? Recruitment? Lead generation? Tell us your goals..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I understand sponsorship packages range from £3K-15K annually and I'm authorized 
                      to discuss sponsorship opportunities on behalf of my company.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-submit">
                  Submit Sponsorship Inquiry
                </button>

                <p className="form-footer-text">
                  We'll respond within 24 hours with sponsorship details • Tax-deductible options available • Flexible payment terms
                </p>
              </form>
            </div>
          ) : (
            <div className="no-package-selected">
              <p>👆 Please select a sponsorship package above to access the inquiry form</p>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('sponsorship-packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Packages
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Sponsorship FAQ</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>Is sponsorship tax-deductible?</summary>
            <p>
              Yes, if your company is UK-based. We're a registered charity/social enterprise (structure TBD), 
              so sponsorships typically qualify as charitable donations. Consult your accountant for specific 
              tax treatment. We provide all necessary documentation.
            </p>
          </details>

          <details className="faq-item">
            <summary>How do you measure sponsorship ROI?</summary>
            <p>
              Quarterly reports including: impressions/reach, engagement metrics, brand mentions, social media 
              analytics, participant feedback, and qualitative impact. For hiring sponsors, we track applications 
              attributed. For event sponsors, we provide attendance and engagement data.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we customize a sponsorship package?</summary>
            <p>
              Absolutely. Packages are starting points. Want to sponsor specific events? Co-create content? 
              Activate at venues? We're flexible. Annual Partnership sponsors get maximum customization. 
              Let's discuss your goals and design the right package.
            </p>
          </details>

          <details className="faq-item">
            <summary>What types of brands do you accept as sponsors?</summary>
            <p>
              We're selective. Must align with our values and be appropriate for youth/families. No: gambling, 
              alcohol, tobacco, weapons, controversial politics. Yes: tech, education, financial services, 
              retail, food/beverage (appropriate), healthcare, professional services, community businesses.
            </p>
          </details>

          <details className="faq-item">
            <summary>How long is the sponsorship commitment?</summary>
            <p>
              Typically 12 months. Event sponsorships are one-time. Programme/Media/Annual sponsorships are 
              annual with option to renew. Most sponsors renew because ROI is strong. We offer quarterly payment 
              plans to ease cash flow.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you offer exclusivity in categories?</summary>
            <p>
              Annual Partnership includes category exclusivity (e.g., you're the only bank, only telecom, etc.). 
              Other packages: exclusivity available for additional fee. We limit sponsors per category anyway to 
              maintain quality and avoid dilution.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we activate/engage beyond logo placement?</summary>
            <p>
              Please do! Best sponsors go beyond logos. Host workshops. Provide mentoring. Offer prizes. Create 
              content. Engage directly. We encourage activation. It's better for you, better for participants, 
              better for everyone.
            </p>
          </details>

          <details className="faq-item">
            <summary>What if we're a small local business with limited budget?</summary>
            <p>
              Talk to us. We have smaller sponsorship opportunities not listed here (£500-2,000 range). 
              Sponsor single events, specific workshops, provide in-kind donations. Community businesses are 
              some of our best sponsors - authentic, local, aligned values.
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
          <h2>Ready to Reach an Engaged Community?</h2>
          <p>
            Stop wasting money on traditional marketing. Start sponsoring authentic community engagement.
            <br />
            £3-15K packages. 80% engaged audience. Measurable impact.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('sponsorship-packages')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Sponsorship Packages
          </button>
          <p className="trust-badges">
            📢 2,000+ Community Reach | 🎯 80% Engagement | 🏆 50 Years Trusted
          </p>
        </div>
      </section>
    </div>
  );
};

export default SponsorshipPage;