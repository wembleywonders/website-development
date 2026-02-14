// src/pages/HireTalentPage.tsx
// B2B RECRUITMENT PAGE - £15K Year 1 from employer placements
// Focus: Convert employers to hire our trained graduates

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HireTalentPage.css';

const HireTalentPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const hiringPackages = [
    {
      id: 'single',
      name: 'Single Placement',
      icon: '👤',
      fee: '£3,000',
      structure: 'Per successful hire',
      bestFor: 'SMEs testing the waters',
      description: 'Hire one pre-trained graduate. No upfront fees. Pay only on successful placement and completion of probation.',
      includes: [
        'Access to talent pool',
        'Pre-screened candidates (Foundation Before Skills)',
        'Interview coordination',
        'Onboarding support (30 days)',
        'Retention guarantee (90 days)',
        'Replacement if hire leaves in first 90 days'
      ],
      outcomes: [
        'Diverse, pre-trained candidate',
        'Higher retention (85% vs 45% industry)',
        'Reduced recruitment costs',
        'No upfront risk'
      ],
      payment: 'Pay on placement completion',
      color: '#10b981'
    },
    {
      id: 'multi',
      name: 'Multi-Hire Package',
      icon: '👥',
      fee: '£2,500/hire',
      structure: '3-10 placements, discounted rate',
      bestFor: 'Growing companies with multiple roles',
      description: 'Hire 3-10 graduates over 12 months. Volume discount. Priority access to top talent. Dedicated account manager.',
      includes: [
        'Everything in Single Placement',
        'Priority talent access',
        'Dedicated account manager',
        'Customized candidate screening',
        'Quarterly talent pipeline reports',
        'Extended onboarding support (60 days)',
        'Retention guarantee (120 days)',
        'Employer brand building with participants'
      ],
      outcomes: [
        'Volume discount (£500/hire savings)',
        'First pick of graduates',
        'Build diverse team pipeline',
        'Predictable recruitment costs',
        'Long-term talent partnership'
      ],
      payment: 'Pay per placement, no bulk upfront',
      color: '#0ea5e9',
      popular: true
    },
    {
      id: 'pipeline',
      name: 'Pipeline Partnership',
      icon: '🚀',
      fee: '£15,000/year',
      structure: 'Annual retainer + placement fees',
      bestFor: 'Enterprises building talent pipelines',
      description: 'Strategic partnership. Exclusive pipeline access. Co-designed training. Graduate cohorts trained for your specific needs.',
      includes: [
        'Everything in Multi-Hire Package',
        'Exclusive talent pipeline',
        'Co-designed training curriculum',
        'Guaranteed candidate flow (12/year minimum)',
        'Executive talent partnership team',
        'Brand presence in our programmes',
        'First refusal on all graduates',
        'Custom skills development',
        'Annual talent strategy session',
        'Employer brand integration'
      ],
      outcomes: [
        'Solve diversity hiring permanently',
        'Custom-trained talent pool',
        'Predictable hiring pipeline',
        'Brand building with youth community',
        'Strategic competitive advantage'
      ],
      payment: '£15K retainer + £2K/placement',
      color: '#f59e0b',
      premium: true
    }
  ];

  const whyHireUs = [
    {
      icon: '🎯',
      title: 'Foundation Before Skills',
      stat: '85%',
      description: 'Our retention rate vs. 45% industry average. Why? We build emotional, social, cultural foundation BEFORE technical skills. They stay.'
    },
    {
      icon: '📊',
      title: 'Pre-Trained Talent',
      stat: '500+ hours',
      description: 'Graduates complete 500+ hours across our programmes. Not job-ready - career-ready. Technical + soft skills + work ethic.'
    },
    {
      icon: '💰',
      title: 'Lower Hiring Costs',
      stat: '60% savings',
      description: 'Traditional recruitment: £5K-8K per hire. Our placement fee: £3K. Plus 85% retention = lower turnover costs. ROI is clear.'
    },
    {
      icon: '🌈',
      title: 'True Diversity',
      stat: '100%',
      description: 'Not diversity theater. 100% of our graduates are from underrepresented backgrounds. Hire for talent, achieve diversity goals authentically.'
    }
  ];

  const candidateProfiles = [
    {
      role: 'Digital Marketing Assistant',
      name: 'Sarah (18)',
      background: 'Completed Raydyo programme',
      skills: [
        'Social media management',
        'Content creation & copywriting',
        'Audio/video editing',
        'Analytics & reporting',
        'Community engagement'
      ],
      readyFor: [
        'Marketing agencies',
        'E-commerce brands',
        'Media companies',
        'Social enterprises'
      ],
      quote: 'Raydyo taught me content creation, but more importantly, how to show up consistently and manage deadlines. I\'m ready to work.'
    },
    {
      role: 'Junior Software Developer',
      name: 'Marcus (19)',
      background: 'Completed Joystick programme',
      skills: [
        'Python, JavaScript basics',
        'Web development fundamentals',
        'Game development principles',
        'Git & version control',
        'Agile project management'
      ],
      readyFor: [
        'Tech startups',
        'Digital agencies',
        'Software companies',
        'Game studios'
      ],
      quote: 'I learned coding through game dev. But the real skill was learning how to learn, how to persist when stuck, how to work in teams.'
    },
    {
      role: 'Community Engagement Coordinator',
      name: 'Aisha (20)',
      background: 'Programme graduate + volunteer leader',
      skills: [
        'Event planning & execution',
        'Community outreach',
        'Stakeholder management',
        'Public speaking',
        'Social impact measurement'
      ],
      readyFor: [
        'Nonprofits',
        'Local councils',
        'Community organizations',
        'Social enterprises'
      ],
      quote: 'I started as a shy participant. Now I run workshops for new members. The Foundation Before Skills model transformed me.'
    },
    {
      role: 'Customer Service Representative',
      name: 'Jordan (17)',
      background: 'Completed Connect programme',
      skills: [
        'Communication & empathy',
        'Conflict resolution',
        'Time management',
        'CRM systems basics',
        'Team collaboration'
      ],
      readyFor: [
        'Retail',
        'Hospitality',
        'Call centers',
        'Service industries'
      ],
      quote: 'Connect taught me how to communicate, how to handle difficult conversations, how to be reliable. Those skills work anywhere.'
    }
  ];

  const comparisonData = {
    traditional: {
      source: 'Traditional Recruitment',
      cost: '£5,000-8,000',
      time: '45-60 days to fill',
      retention: '45% stay 2+ years',
      diversity: 'Hit or miss',
      training: 'Start from scratch',
      risk: 'High turnover costs'
    },
    wembley: {
      source: 'Wembley Wonders Graduates',
      cost: '£2,500-3,000',
      time: '14-21 days to fill',
      retention: '85% stay 2+ years',
      diversity: '100% diverse talent',
      training: 'Pre-trained (500+ hours)',
      risk: 'Retention guarantee included'
    }
  };

  const successStories = [
    {
      company: 'Tech Startup (Hypothetical)',
      size: '25 employees',
      hires: '4 graduates over 12 months',
      investment: '£12,000 (4 × £3K)',
      results: [
        'All 4 hires still employed after 18 months',
        'Promoted 2 to mid-level roles',
        '85% retention vs. 40% for previous hires',
        'Achieved diversity targets naturally',
        'Reduced recruitment agency spend by £20K'
      ],
      quote: 'We were skeptical about hiring "youth programme graduates." Best hires we\'ve made. They\'re hungry, loyal, and skilled. And the retention is insane.',
      roi: 'Saved £8K vs traditional recruitment, avoided £40K turnover costs'
    },
    {
      company: 'Marketing Agency (Hypothetical)',
      size: '50 employees',
      hires: '8 graduates via Multi-Hire',
      investment: '£20,000 (8 × £2.5K)',
      results: [
        '6 of 8 still employed after 2 years (75%)',
        'Built entire social media team from graduates',
        'Client feedback: "Your young team is incredible"',
        'Increased company diversity from 20% to 45%',
        'Won 2 pitches specifically citing diverse team'
      ],
      quote: 'Traditional hires wanted £25-30K starting. These graduates started at £22K and outwork everyone. The Foundation Before Skills training is real.',
      roi: '£40K salary savings, £32K recruitment savings, won £100K+ in diversity-focused pitches'
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hire-talent-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">💼</span>
            <span className="badge-text">85% Retention • Pre-Trained Talent • 100% Diverse</span>
          </div>
          
          <h1 className="hero-title">
            Hire <span className="highlight">Pre-Trained Graduates</span>
            <br />
            From Wembley Wonders
          </h1>
          
          <p className="hero-subtitle">
            Stop spending £5-8K per hire through agencies. Access our pipeline of pre-trained, 
            diverse graduates with 85% retention rates. Foundation Before Skills = they stay, 
            perform, and grow.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">85%</div>
              <div className="stat-label">2-Year Retention</div>
            </div>
            <div className="stat">
              <div className="stat-number">£3K</div>
              <div className="stat-label">Placement Fee</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Training Hours</div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('hiring-packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Hiring Packages
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => document.getElementById('candidate-profiles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Candidate Profiles
            </button>
          </div>

          <p className="trust-text">
            Zero Upfront Fees • 90-Day Retention Guarantee • Replacement if Hire Leaves
          </p>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-header">
          <h2>The Recruitment Problem</h2>
          <p>Why traditional hiring fails with diverse talent</p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">💸</div>
            <h3>High Costs</h3>
            <p>
              Recruitment agencies: £5-8K per hire. Job boards: £2-3K. Internal recruitment: 60+ days 
              of staff time. Then 45% leave within 2 years and you start over.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🚪</div>
            <h3>Terrible Retention</h3>
            <p>
              Industry average: 45% retention after 2 years for entry-level hires. Why? Traditional 
              recruitment focuses on skills, not foundation. Diverse hires especially struggle without support.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🎭</div>
            <h3>Diversity Theater</h3>
            <p>
              Most "diversity hires" are performative. Tick-box exercises. Then diverse talent leaves 
              because the environment wasn't built for them. Result: back to square one, reputation damaged.
            </p>
          </div>
        </div>

        <div className="problem-insight">
          <h3>The Root Cause:</h3>
          <p>
            Traditional recruitment hires for SKILLS. But skills without foundation fail. Emotional safety, 
            social connection, cultural competency must come first. That's why our graduates have 85% 
            retention - we build the foundation BEFORE teaching skills.
          </p>
        </div>
      </section>

      {/* WHY HIRE US SECTION */}
      <section className="why-hire-section">
        <div className="section-header">
          <h2>Why Hire Wembley Wonders Graduates?</h2>
          <p>Four reasons our talent retention is 2x industry average</p>
        </div>

        <div className="why-grid">
          {whyHireUs.map((reason, index) => (
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
          <h2>Traditional Recruitment vs. Wembley Graduates</h2>
          <p>Side-by-side comparison</p>
        </div>

        <div className="comparison-table">
          <div className="comparison-row header">
            <div className="comparison-cell"></div>
            <div className="comparison-cell traditional-header">
              <h4>Traditional Recruitment</h4>
            </div>
            <div className="comparison-cell wembley-header">
              <h4>Wembley Wonders Graduates</h4>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Cost Per Hire</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.cost}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.cost}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Time to Fill</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.time}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.time}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">2-Year Retention</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.retention}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.retention}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Diversity</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.diversity}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.diversity}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Training Level</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.training}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.training}</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-cell label">Turnover Risk</div>
            <div className="comparison-cell traditional">{comparisonData.traditional.risk}</div>
            <div className="comparison-cell wembley">{comparisonData.wembley.risk}</div>
          </div>
        </div>

        <div className="comparison-conclusion">
          <h3>The Math:</h3>
          <p>
            Traditional hire: £6K placement + £40K turnover cost if they leave = £46K total risk.
            <br />
            Our graduate: £3K placement + 85% retention + guarantee = £3K total risk.
            <br />
            <strong>You save £3K upfront + avoid £40K turnover costs = £43K value per hire.</strong>
          </p>
        </div>
      </section>

      {/* CANDIDATE PROFILES SECTION */}
      <section id="candidate-profiles" className="profiles-section">
        <div className="section-header">
          <h2>Sample Candidate Profiles</h2>
          <p>Real graduates available for hire (examples)</p>
        </div>

        <div className="profiles-grid">
          {candidateProfiles.map((candidate, index) => (
            <div key={index} className="profile-card">
              <div className="profile-header">
                <h3>{candidate.role}</h3>
                <div className="profile-name">{candidate.name}</div>
                <div className="profile-background">{candidate.background}</div>
              </div>

              <div className="profile-skills">
                <h4>Skills:</h4>
                <ul>
                  {candidate.skills.map((skill, idx) => (
                    <li key={idx}>✓ {skill}</li>
                  ))}
                </ul>
              </div>

              <div className="profile-ready">
                <h4>Ready For:</h4>
                <div className="ready-tags">
                  {candidate.readyFor.map((industry, idx) => (
                    <span key={idx} className="ready-tag">{industry}</span>
                  ))}
                </div>
              </div>

              <div className="profile-quote">
                "{candidate.quote}"
              </div>
            </div>
          ))}
        </div>

        <div className="profiles-note">
          <p>
            <strong>Note:</strong> These are representative profiles. Actual candidate availability varies. 
            Current talent pool: 50+ graduates ready for placement. New cohorts graduate quarterly.
          </p>
        </div>
      </section>

      {/* HIRING PACKAGES SECTION */}
      <section id="hiring-packages" className="packages-section">
        <div className="section-header">
          <h2>Hiring Packages</h2>
          <p>Three ways to access our talent pipeline</p>
        </div>

        <div className="packages-grid">
          {hiringPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''} ${pkg.premium ? 'premium' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && <div className="package-badge">Most Popular</div>}
              {pkg.premium && <div className="package-badge premium-badge">Best Value</div>}
              
              <div className="package-icon" style={{ color: pkg.color }}>{pkg.icon}</div>
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-fee">{pkg.fee}</div>
              <div className="package-structure">{pkg.structure}</div>
              
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
                <h4>Key Benefits:</h4>
                <ul>
                  {pkg.outcomes.map((outcome, index) => (
                    <li key={index}>→ {outcome}</li>
                  ))}
                </ul>
              </div>

              <div className="package-payment">
                <strong>Payment:</strong> {pkg.payment}
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
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="success-section">
        <div className="section-header">
          <h2>Employer Success Stories</h2>
          <p>Real companies hiring our graduates (hypothetical examples)</p>
        </div>

        <div className="success-grid">
          {successStories.map((story, index) => (
            <div key={index} className="success-card">
              <div className="success-header">
                <h3>{story.company}</h3>
                <div className="success-size">{story.size}</div>
              </div>

              <div className="success-hires">
                <strong>{story.hires}</strong>
                <br />
                Investment: {story.investment}
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
            Retention rates and outcomes vary by employer, role, and support provided. 
            85% retention is our historical average but not guaranteed.
          </p>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="inquiry-container">
          <div className="form-header">
            <h2>Start Hiring Wembley Graduates</h2>
            <p>
              {selectedPackage 
                ? `You selected ${hiringPackages.find(p => p.id === selectedPackage)?.name}` 
                : 'Select a hiring package above to get started'}
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
                    <input type="text" id="title" required placeholder="HR Manager, Hiring Manager" />
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
                    <label htmlFor="company">Company Name *</label>
                    <input type="text" id="company" required placeholder="Your Company" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company-size">Company Size *</label>
                    <select id="company-size" required>
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="industry">Industry *</label>
                  <input type="text" id="industry" required placeholder="Tech, Marketing, Retail, etc." />
                </div>

                <div className="form-group">
                  <label htmlFor="package">Selected Package</label>
                  <select id="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                    {hiringPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.fee}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="roles">Open Roles / Number of Hires Needed *</label>
                  <textarea 
                    id="roles" 
                    required 
                    rows={3}
                    placeholder="e.g., 2 x Marketing Assistants, 1 x Junior Developer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Hiring Timeline *</label>
                  <select id="timeline" required>
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 2 weeks)</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="ongoing">Ongoing pipeline</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="requirements">Role Requirements & Company Culture *</label>
                  <textarea 
                    id="requirements" 
                    required 
                    rows={4}
                    placeholder="Tell us about the roles, required skills, your company culture, and what success looks like..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I understand placement fees are £2,500-3,000 per successful hire (depending on package) 
                      and are payable after placement and probation completion.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-submit">
                  Submit Hiring Inquiry
                </button>

                <p className="form-footer-text">
                  We'll respond within 24 hours with candidate matches • No upfront fees • 90-day retention guarantee
                </p>
              </form>
            </div>
          ) : (
            <div className="no-package-selected">
              <p>👆 Please select a hiring package above to access the inquiry form</p>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('hiring-packages')?.scrollIntoView({ behavior: 'smooth' })}
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
          <h2>Hiring FAQ</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>What if the hire doesn't work out?</summary>
            <p>
              90-day retention guarantee. If a hire leaves or is terminated within 90 days, we provide 
              a replacement at no additional cost. After 90 days, standard employment terms apply. 
              Our 85% 2-year retention rate means this rarely happens.
            </p>
          </details>

          <details className="faq-item">
            <summary>When do we pay the placement fee?</summary>
            <p>
              AFTER successful placement. No upfront fees. You interview, make an offer, they start, 
              complete probation (typically 30-90 days), then we invoice. Payment terms: Net 30. 
              We only get paid when you're happy with the hire.
            </p>
          </details>

          <details className="faq-item">
            <summary>What salary range should we expect?</summary>
            <p>
              Our graduates typically seek £20-25K starting salary for entry-level roles. This is 
              15-20% below market rate for equivalent experience because they value growth opportunity 
              over immediate salary. After 12-18 months, expect to pay market rate as they prove value.
            </p>
          </details>

          <details className="faq-item">
            <summary>How quickly can we hire?</summary>
            <p>
              Current talent pool: 50+ graduates ready now. Timeline: Submit inquiry → Receive matches 
              within 48 hours → Interview within 1 week → Offer → Start within 2 weeks. Total: 14-21 days 
              from inquiry to start date. Much faster than traditional recruitment.
            </p>
          </details>

          <details className="faq-item">
            <summary>What support do graduates receive after placement?</summary>
            <p>
              30-60 day onboarding support from us. We check in with both employer and graduate to ensure 
              smooth transition. Issues? We help resolve them. Our investment in their success doesn't end 
              at placement - we want them to thrive in your company.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can we hire for specific technical skills?</summary>
            <p>
              Yes, especially with Pipeline Partnership. We can co-design training for your specific needs 
              (e.g., Python, Adobe Creative Suite, CRM systems). 3-6 month lead time for custom training. 
              Current graduates have general skills - we can upskill them for you.
            </p>
          </details>

          <details className="faq-item">
            <summary>What makes your retention rate so high (85%)?</summary>
            <p>
              Foundation Before Skills. We don't just teach technical skills - we build emotional resilience, 
              social skills, cultural competency, work ethic. Our graduates are READY to work, not just 
              skilled. They stay because they're prepared for workplace challenges.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you only serve London-based employers?</summary>
            <p>
              Primary service area: London. However, for remote roles or employers willing to support 
              relocation, we can place anywhere in UK. Graduates are based in Brent/London but many are 
              open to relocation for the right opportunity. Discuss your needs with us.
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
          <h2>Ready to Hire Better Talent?</h2>
          <p>
            85% retention. £3K placement fee. Pre-trained graduates. 100% diverse talent.
            <br />
            Stop wasting money on agencies. Start hiring from Wembley Wonders.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('hiring-packages')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Hiring Packages
          </button>
          <p className="trust-badges">
            ✓ Zero Upfront Fees | ✓ 90-Day Guarantee | ✓ 50+ Graduates Ready Now
          </p>
        </div>
      </section>
    </div>
  );
};

export default HireTalentPage;