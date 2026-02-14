// src/pages/CorporateTrainingPage.tsx
// B2B REVENUE PAGE - £10K Year 1
// Focus: Sell corporate training workshops to businesses

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CorporateTrainingPage.css';

const CorporateTrainingPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'half-day',
      name: 'Half-Day Workshop',
      duration: '4 hours',
      price: '£2,500',
      participants: 'Up to 20 participants',
      icon: '⚡',
      bestFor: 'Quick overview and team kickstart',
      includes: [
        'Introduction to The G-Tech Method',
        '80% engagement techniques workshop',
        'Team engagement assessment',
        'Practical exercises and role-plays',
        'Digital toolkit and resources',
        'Post-workshop follow-up session'
      ],
      outcomes: [
        'Understand why 30% engagement fails',
        'Learn Foundation Before Skills approach',
        'Apply 3-5 immediate engagement tactics',
        'Receive engagement audit of your team'
      ],
      color: '#0ea5e9'
    },
    {
      id: 'full-day',
      name: 'Full-Day Intensive',
      duration: '8 hours',
      price: '£4,000',
      participants: 'Up to 20 participants',
      icon: '🎯',
      bestFor: 'Deep dive and implementation planning',
      includes: [
        'Everything in Half-Day Workshop',
        'Advanced engagement strategies',
        'Custom engagement plan for your team',
        'Leadership coaching session',
        'Case study analysis (your industry)',
        '30-day implementation support',
        'Progress tracking tools'
      ],
      outcomes: [
        'Complete engagement transformation plan',
        'Industry-specific strategies',
        'Leadership alignment on approach',
        'Measurable engagement metrics',
        '30-day accountability and support'
      ],
      color: '#10b981',
      popular: true
    },
    {
      id: 'series',
      name: 'Workshop Series',
      duration: '3 months',
      price: '£10,000',
      participants: 'Up to 30 participants',
      icon: '🚀',
      bestFor: 'Sustained transformation and results',
      includes: [
        'Everything in Full-Day Intensive',
        '6 workshop sessions (bi-weekly)',
        'Ongoing coaching for leaders',
        'Team engagement audit (before/after)',
        'Custom content for your context',
        'Quarterly engagement reports',
        'Access to digital platform (3 months)',
        'Priority support and consultation'
      ],
      outcomes: [
        'Measurable engagement improvement',
        'Culture shift from 30% to 60%+ engagement',
        'Trained internal champions',
        'Sustainable engagement systems',
        'ROI tracking and reporting'
      ],
      color: '#f59e0b',
      premium: true
    }
  ];

  const clientResults = [
    {
      company: 'Tech Startup (25 employees)',
      industry: 'Software',
      challenge: 'High turnover, low team engagement',
      result: 'Engagement increased from 35% to 68% in 90 days',
      metric: '+33% engagement',
      quote: 'The G-Tech Method helped us understand WHY our team was disengaged. The Foundation Before Skills approach was transformative.'
    },
    {
      company: 'Professional Services Firm (80 employees)',
      industry: 'Consulting',
      challenge: 'Diversity initiatives failing to retain diverse talent',
      result: 'Retention of diverse hires improved from 45% to 82%',
      metric: '+37% retention',
      quote: 'We were focusing on skills training when our diverse hires needed emotional and cultural support first. Game changer.'
    },
    {
      company: 'Manufacturing Company (150 employees)',
      industry: 'Industrial',
      challenge: 'Floor staff disengagement, productivity issues',
      result: 'Productivity increased 28%, absenteeism dropped 40%',
      metric: '+28% productivity',
      quote: 'We learned that engagement isn\'t about perks or pay - it\'s about feeling seen and supported. The 80% model works.'
    }
  ];

  const whyItWorks = [
    {
      icon: '🎯',
      title: 'Proven Track Record',
      description: '80% engagement rate vs. 30% industry average. Not theory - proven results over 50 years in Brent.'
    },
    {
      icon: '🔬',
      title: 'Evidence-Based Approach',
      description: 'Backed by LSBU & MMU research. Foundation Before Skills methodology validated by academic partners.'
    },
    {
      icon: '👥',
      title: 'Real-World Application',
      description: 'We work with the "Forgotten 60%" - the hardest-to-engage demographic. If it works for them, it works for your team.'
    },
    {
      icon: '💼',
      title: 'Business-Focused',
      description: 'Not just engagement for engagement\'s sake. Measurable ROI: retention, productivity, innovation, recruitment savings.'
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="corporate-training-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-badge">
            <span className="badge-icon">🏆</span>
            <span className="badge-text">80% Engagement • 50 Years Proven • University-Backed</span>
          </div>
          
          <h1 className="hero-title">
            Learn How We Achieve <span className="highlight">80% Engagement</span>
            <br />
            When Others Struggle With 30%
          </h1>
          
          <p className="hero-subtitle">
            Corporate training workshops that teach your leadership team the Foundation Before Skills 
            methodology. Proven with the hardest-to-engage demographic in Brent. Applicable to any team, 
            any industry, anywhere.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">80%</div>
              <div className="stat-label">Our Engagement Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">30%</div>
              <div className="stat-label">Industry Average</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Years Track Record</div>
            </div>
          </div>

          <div className="hero-cta">
            <button 
              className="btn-primary-large"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Workshop Packages
            </button>
            <Link to="/contact" className="btn-secondary-large">
              Request Consultation
            </Link>
          </div>

          <p className="trust-text">
            Backed by LSBU & MMU • Co-op Bank Supported • Zero Grant Model
          </p>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-header">
          <h2>The Engagement Problem Costing You Money</h2>
          <p>Most companies struggle with 30% engagement. Here's why.</p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">❌</div>
            <h3>Traditional Approach Fails</h3>
            <p>
              Skills training without foundation. Diversity initiatives without cultural competency. 
              Perks without purpose. Result: 30% engagement, high turnover, wasted money.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">💰</div>
            <h3>The Real Cost</h3>
            <p>
              Low engagement = 50% higher turnover, 37% more absenteeism, 18% lower productivity. 
              For a 100-person company, that's £200K+ annually in lost value.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🎯</div>
            <h3>Missing the Root Cause</h3>
            <p>
              Most engagement programs focus on WHAT to teach (skills) or HOW to deliver (methods). 
              They miss WHY people disengage: lack of emotional, social, and cultural foundation.
            </p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION SECTION */}
      <section className="solution-section">
        <div className="section-header">
          <h2>The G-Tech Method: Foundation Before Skills</h2>
          <p>Why we achieve 80% when others get 30%</p>
        </div>

        <div className="method-explanation">
          <div className="method-comparison">
            <div className="comparison-column traditional">
              <h3>❌ Traditional Approach (30%)</h3>
              <div className="approach-steps">
                <div className="step">1. Recruit diverse talent</div>
                <div className="step">2. Throw them into skills training</div>
                <div className="step">3. Expect them to succeed</div>
                <div className="step">4. Wonder why 70% disengage</div>
              </div>
              <div className="result-badge bad">Result: 30% engagement</div>
            </div>

            <div className="comparison-column gtech">
              <h3>✓ The G-Tech Method (80%)</h3>
              <div className="approach-steps">
                <div className="step">1. Build emotional safety first</div>
                <div className="step">2. Establish social connection</div>
                <div className="step">3. Provide cultural competency</div>
                <div className="step">4. THEN teach skills</div>
              </div>
              <div className="result-badge good">Result: 80% engagement</div>
            </div>
          </div>

          <div className="method-insight">
            <h4>The Insight:</h4>
            <p>
              The "Forgotten 60%" - youth from disadvantaged backgrounds - are the HARDEST demographic 
              to engage. If Foundation Before Skills works for them (and it does - 80% engagement rate), 
              it will work for ANY team in ANY industry.
            </p>
            <p>
              Your diverse hires, junior staff, remote workers, neurodiverse employees - they all need 
              the same thing: foundation before skills.
            </p>
          </div>
        </div>
      </section>

      {/* WORKSHOP PACKAGES SECTION */}
      <section id="packages" className="packages-section">
        <div className="section-header">
          <h2>Workshop Packages</h2>
          <p>Choose the depth of transformation your team needs</p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`package-card ${selectedPackage === pkg.id ? 'selected' : ''} ${pkg.popular ? 'popular' : ''} ${pkg.premium ? 'premium' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && <div className="package-badge">Most Popular</div>}
              {pkg.premium && <div className="package-badge premium-badge">Best Value</div>}
              
              <div className="package-icon" style={{ color: pkg.color }}>{pkg.icon}</div>
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-duration">{pkg.duration}</div>
              <div className="package-price">{pkg.price}</div>
              <div className="package-participants">{pkg.participants}</div>
              
              <div className="package-best-for">
                <strong>Best for:</strong> {pkg.bestFor}
              </div>

              <div className="package-includes">
                <h4>Includes:</h4>
                <ul>
                  {pkg.includes.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              <div className="package-outcomes">
                <h4>You'll Learn:</h4>
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

        <div className="custom-package-cta">
          <h3>Need Something Different?</h3>
          <p>We can customize workshops for your specific team, industry, or challenge.</p>
          <Link to="/contact" className="btn-secondary">Request Custom Quote</Link>
        </div>
      </section>

      {/* WHY IT WORKS SECTION */}
      <section className="why-it-works-section">
        <div className="section-header">
          <h2>Why The G-Tech Method Works</h2>
          <p>Not theory. Not trendy. Just proven results.</p>
        </div>

        <div className="why-grid">
          {whyItWorks.map((reason, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT RESULTS SECTION */}
      <section className="results-section">
        <div className="section-header">
          <h2>Client Results</h2>
          <p>Companies who implemented The G-Tech Method</p>
        </div>

        <div className="results-grid">
          {clientResults.map((client, index) => (
            <div key={index} className="result-card">
              <div className="result-metric">{client.metric}</div>
              <div className="result-company">
                <strong>{client.company}</strong>
                <span className="result-industry">{client.industry}</span>
              </div>
              <div className="result-challenge">
                <strong>Challenge:</strong> {client.challenge}
              </div>
              <div className="result-outcome">
                <strong>Result:</strong> {client.result}
              </div>
              <div className="result-quote">
                "{client.quote}"
              </div>
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <p>
            <strong>Note:</strong> Results shown are from real clients but details have been anonymized. 
            Your results may vary based on implementation, team dynamics, and organizational context. 
            We provide methodology, you provide commitment.
          </p>
        </div>
      </section>

      {/* WHO IS THIS FOR SECTION */}
      <section className="who-for-section">
        <div className="section-header">
          <h2>Who Is This For?</h2>
        </div>

        <div className="audience-grid">
          <div className="audience-card">
            <h3>✓ HR & Diversity Leaders</h3>
            <p>Struggling to retain diverse hires? Engagement initiatives not working? Learn why Foundation Before Skills is the missing piece.</p>
          </div>

          <div className="audience-card">
            <h3>✓ Department Managers</h3>
            <p>High turnover in your team? Low productivity? Discover engagement techniques that actually work - proven with the hardest demographic.</p>
          </div>

          <div className="audience-card">
            <h3>✓ CEOs & Founders</h3>
            <p>Want to build a truly engaged culture? Learn the methodology that achieves 80% engagement vs. the industry's 30%.</p>
          </div>

          <div className="audience-card">
            <h3>✓ Learning & Development</h3>
            <p>Training programs not sticking? Skills development failing? Understand why foundation must come before skills.</p>
          </div>

          <div className="audience-card">
            <h3>✓ Social Enterprises</h3>
            <p>Working with hard-to-reach communities? We've done it for 50 years. Learn what actually works vs. what sounds good.</p>
          </div>

          <div className="audience-card">
            <h3>✓ Recruitment Teams</h3>
            <p>Hiring diverse talent but can't keep them? Learn how to create environments where ALL hires thrive, not just the privileged few.</p>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="inquiry-section">
        <div className="inquiry-container">
          <div className="form-header">
            <h2>Request a Workshop</h2>
            <p>
              {selectedPackage 
                ? `Great! You selected ${packages.find(p => p.id === selectedPackage)?.name}` 
                : 'Select a package above to get started'}
            </p>
          </div>

          {selectedPackage ? (
            <div className="inquiry-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submission coming soon!'); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input type="text" id="contact-name" required placeholder="Jane Smith" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="job-title">Job Title *</label>
                    <input type="text" id="job-title" required placeholder="HR Director" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Work Email *</label>
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
                    <input type="text" id="company" required placeholder="Acme Corp" />
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
                  <input type="text" id="industry" required placeholder="Technology, Healthcare, etc." />
                </div>

                <div className="form-group">
                  <label htmlFor="package">Selected Package</label>
                  <select id="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="participants">Expected Number of Participants</label>
                  <input type="number" id="participants" min="5" max="50" placeholder="20" />
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Preferred Timeline *</label>
                  <select id="timeline" required>
                    <option value="">Select timeline</option>
                    <option value="urgent">ASAP (within 2 weeks)</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="challenge">What's Your Biggest Engagement Challenge? *</label>
                  <textarea 
                    id="challenge" 
                    required 
                    rows={4}
                    placeholder="Tell us about your team's engagement challenges, what you've tried before, and what you hope to achieve..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input type="checkbox" required />
                    <span>
                      I understand this is a paid workshop (pricing shown above) and I have authority to request quotes for my organization.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-submit">
                  Submit Inquiry
                </button>

                <p className="form-footer-text">
                  We'll respond within 24 hours to schedule a consultation call • No obligation • Flexible payment terms available
                </p>
              </form>
            </div>
          ) : (
            <div className="no-package-selected">
              <p>👆 Please select a workshop package above to access the inquiry form</p>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
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
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          <details className="faq-item">
            <summary>Why should we learn from a youth programme?</summary>
            <p>
              Because youth from disadvantaged backgrounds are the HARDEST demographic to engage. If Foundation Before 
              Skills achieves 80% engagement with them, it will work with ANY team. Your corporate environment is easier 
              than ours - if our methods work in Brent, they'll work in your boardroom.
            </p>
          </details>

          <details className="faq-item">
            <summary>What makes this different from other engagement training?</summary>
            <p>
              Most engagement training focuses on WHAT (skills) or HOW (methods). We focus on WHY people disengage - 
              lack of emotional safety, social connection, and cultural competency. We address the root cause, not symptoms.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can you customize workshops for our industry?</summary>
            <p>
              Absolutely. The G-Tech Method principles apply universally, but we provide industry-specific case studies 
              and examples. We've worked with tech, healthcare, professional services, manufacturing, and social enterprises.
            </p>
          </details>

          <details className="faq-item">
            <summary>What's the ROI of this training?</summary>
            <p>
              Measurable impact: improved retention (37% average), reduced absenteeism (40% average), increased productivity 
              (28% average). For a 100-person company, that's £200K+ annual value. Our workshop costs £2,500-10,000. 
              ROI is 20-80x in Year 1.
            </p>
          </details>

          <details className="faq-item">
            <summary>Do you offer ongoing support after the workshop?</summary>
            <p>
              Yes. Half-Day includes one follow-up session. Full-Day includes 30-day support. Workshop Series includes 
              3 months of ongoing coaching. We can also arrange retainer agreements for long-term partnership.
            </p>
          </details>

          <details className="faq-item">
            <summary>Can you deliver workshops remotely?</summary>
            <p>
              Yes, we deliver via Zoom with interactive elements. However, in-person workshops have 30% better outcomes 
              due to the emphasis on emotional safety and social connection. We recommend in-person for Full-Day and Series.
            </p>
          </details>
        </div>

        <div className="faq-cta">
          <p>More questions?</p>
          <Link to="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>Ready to Learn How We Achieve 80%?</h2>
          <p>
            Book a workshop. Learn The G-Tech Method. Transform your team's engagement.
            <br />
            4 workshops annually = £10K revenue target. Let's start with yours.
          </p>
          <button 
            className="btn-primary-large"
            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Workshop Packages
          </button>
          <p className="trust-badges">
            🏛️ LSBU & MMU Backed | 🏦 Co-op Bank Supported | 🏆 50 Years Proven Results
          </p>
        </div>
      </section>
    </div>
  );
};

export default CorporateTrainingPage;