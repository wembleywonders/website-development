import React from 'react';
import './PlatformLicencingPage.css';

const PlatformLicencingPage: React.FC = () => {
  return (
    <div className="platform-licensing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Platform Licencing</h1>
          <p className="hero-subtitle">
            White-label our proven digital infrastructure to power your youth development programmes
          </p>
          <div className="hero-stats">
            <div className="stat">
              <strong>£111</strong>
              <span>per learner at scale</span>
            </div>
            <div className="stat">
              <strong>80%</strong>
              <span>engagement rate</span>
            </div>
            <div className="stat">
              <strong>2 years</strong>
              <span>ahead of market</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="content-wrapper">
          <h2>Building EdTech Infrastructure Is Expensive & Time-Consuming</h2>
          <div className="problem-grid">
            <div className="problem-card">
              <span className="problem-icon">💰</span>
              <h3>High Development Costs</h3>
              <p>£500K+ to build from scratch with 18-24 month timeline</p>
            </div>
            <div className="problem-card">
              <span className="problem-icon">🔧</span>
              <h3>Technical Complexity</h3>
              <p>Accessibility, SEND support, safeguarding, and integration requirements</p>
            </div>
            <div className="problem-card">
              <span className="problem-icon">📊</span>
              <h3>Engagement Challenge</h3>
              <p>Most platforms achieve only 30% engagement with the Forgotten 60%</p>
            </div>
            <div className="problem-card">
              <span className="problem-icon">⚖️</span>
              <h3>Equity Barriers</h3>
              <p>Difficult to serve diverse learners with disabilities, women-only needs, and cultural sensitivity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="content-wrapper">
          <h2>Licence Our Battle-Tested Platform</h2>
          <p className="section-intro">
            We've spent 2 years and significant investment building what you need. Now you can deploy it in weeks, not years.
          </p>
          
          <div className="platform-features">
            <div className="feature-category">
              <h3>Core Educational Systems</h3>
              <ul>
                <li><strong>CodeCrawler:</strong> Interactive coding environment with real-time feedback</li>
                <li><strong>Virtual Classroom:</strong> Live and asynchronous learning spaces</li>
                <li><strong>Impact Lab:</strong> Project-based learning with portfolio building</li>
                <li><strong>Digital Literacy Hubs:</strong> Comprehensive skills development</li>
                <li><strong>Assessment Tools:</strong> Progress tracking and competency validation</li>
              </ul>
            </div>

            <div className="feature-category">
              <h3>Accessibility & SEND Infrastructure</h3>
              <ul>
                <li><strong>Alex ROV:</strong> AI companion for neurodivergent learners</li>
                <li><strong>Content Filtering:</strong> Adaptive reading levels and formats</li>
                <li><strong>Behaviour Monitoring:</strong> Early intervention systems</li>
                <li><strong>Disability Liberation Framework:</strong> Built-in accommodations</li>
              </ul>
            </div>

            <div className="feature-category">
              <h3>Cultural & Gender Support</h3>
              <ul>
                <li><strong>Women-Only Spaces:</strong> Private learning environments</li>
                <li><strong>Cultural Token System:</strong> Recognises diverse backgrounds</li>
                <li><strong>Community Governance:</strong> Shared decision-making</li>
                <li><strong>Multi-language Support:</strong> Interface and content localisation</li>
              </ul>
            </div>

            <div className="feature-category">
              <h3>Integration Bridges</h3>
              <ul>
                <li><strong>Education Systems:</strong> School MIS, attendance, grades</li>
                <li><strong>Employment Services:</strong> Job boards, employer matching</li>
                <li><strong>Healthcare:</strong> CAMHS, therapy services</li>
                <li><strong>Government:</strong> DWP, benefits, housing</li>
                <li><strong>Financial:</strong> Banking, credit building, ISAs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="content-wrapper">
          <h2>Transparent, Scalable Pricing</h2>
          
          <div className="pricing-tiers">
            <div className="pricing-card starter">
              <div className="tier-header">
                <h3>Starter</h3>
                <p className="tier-subtitle">For organisations serving 50-200 learners</p>
              </div>
              <div className="price">
                <span className="amount">£12K</span>
                <span className="period">per year</span>
              </div>
              <ul className="tier-features">
                <li>✓ Full platform access</li>
                <li>✓ Up to 200 active learners</li>
                <li>✓ Basic branding customisation</li>
                <li>✓ Standard integrations</li>
                <li>✓ Email support (48hr response)</li>
                <li>✓ Monthly training sessions</li>
              </ul>
              <button className="cta-button secondary">Start Conversation</button>
            </div>

            <div className="pricing-card growth">
              <div className="popular-badge">Most Popular</div>
              <div className="tier-header">
                <h3>Growth</h3>
                <p className="tier-subtitle">For scaling to 200-500 learners</p>
              </div>
              <div className="price">
                <span className="amount">£28K</span>
                <span className="period">per year</span>
              </div>
              <ul className="tier-features">
                <li>✓ Everything in Starter, plus:</li>
                <li>✓ Up to 500 active learners</li>
                <li>✓ Full white-labelling</li>
                <li>✓ Custom integrations (2 included)</li>
                <li>✓ Priority support (24hr response)</li>
                <li>✓ Weekly training & strategy calls</li>
                <li>✓ Quarterly impact reports</li>
              </ul>
              <button className="cta-button primary">Start Conversation</button>
            </div>

            <div className="pricing-card enterprise">
              <div className="tier-header">
                <h3>Enterprise</h3>
                <p className="tier-subtitle">For large-scale deployment (500+ learners)</p>
              </div>
              <div className="price">
                <span className="amount">Custom</span>
                <span className="period">tailored to needs</span>
              </div>
              <ul className="tier-features">
                <li>✓ Everything in Growth, plus:</li>
                <li>✓ Unlimited learners</li>
                <li>✓ Multi-site deployment</li>
                <li>✓ Unlimited custom integrations</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ 24/7 technical support</li>
                <li>✓ Custom feature development</li>
                <li>✓ SLA guarantees</li>
              </ul>
              <button className="cta-button secondary">Start Conversation</button>
            </div>
          </div>

          <div className="pricing-note">
            <p><strong>Volume Discounts:</strong> Multi-year commitments receive 15-25% discount. Non-profit organisations receive additional 10% discount.</p>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="differentiation-section">
        <div className="content-wrapper">
          <h2>Why We're Different</h2>
          
          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>Other EdTech Platforms</h3>
              <ul className="comparison-list negative">
                <li>Built for mainstream learners</li>
                <li>30% engagement with marginalised youth</li>
                <li>Generic accessibility features</li>
                <li>Limited cultural competency</li>
                <li>Separate systems for different needs</li>
                <li>£150-200 per learner cost</li>
              </ul>
            </div>

            <div className="comparison-card highlight">
              <h3>Wembley Wonders Platform</h3>
              <ul className="comparison-list positive">
                <li>Purpose-built for the Forgotten 60%</li>
                <li>80% engagement with same cohort</li>
                <li>Deep SEND & neurodivergent support</li>
                <li>Cultural liberation embedded throughout</li>
                <li>Holistic integrated ecosystem</li>
                <li>£111 per learner at scale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="case-study-section">
        <div className="content-wrapper">
          <h2>Proven Results</h2>
          
          <div className="case-study">
            <div className="case-study-stats">
              <div className="case-stat">
                <strong>80%</strong>
                <span>Engagement Rate</span>
              </div>
              <div className="case-stat">
                <strong>92%</strong>
                <span>Programme Completion</span>
              </div>
              <div className="case-stat">
                <strong>40</strong>
                <span>Active Learners</span>
              </div>
            </div>

            <div className="case-study-content">
              <h3>Wembley Wonders Summer Programme 2024</h3>
              <p>
                Our platform powers our own flagship programme, serving the exact cohort you want to reach. 
                We're not selling theory—we're licencing the infrastructure that's delivering real outcomes with 
                the most challenging-to-engage young people in Brent.
              </p>
              <ul className="case-highlights">
                <li><strong>Cohort:</strong> 40 young people aged 16-24, 60% SEND, 75% from Forgotten 60%</li>
                <li><strong>Retention:</strong> 92% completion rate vs. 30% sector average</li>
                <li><strong>Engagement:</strong> 80% active participation vs. 30% sector average</li>
                <li><strong>Outcomes:</strong> 60% progressed to education/employment within 6 months</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="technical-section">
        <div className="content-wrapper">
          <h2>Technical Specifications</h2>
          
          <div className="tech-grid">
            <div className="tech-card">
              <h3>Architecture</h3>
              <ul>
                <li>Multi-tenant SaaS infrastructure</li>
                <li>Microservices architecture</li>
                <li>Scalable to 1,000+ concurrent users</li>
                <li>99.9% uptime SLA</li>
              </ul>
            </div>

            <div className="tech-card">
              <h3>Security & Compliance</h3>
              <ul>
                <li>GDPR compliant</li>
                <li>UK data residency</li>
                <li>Role-based access control</li>
                <li>Audit logs & safeguarding alerts</li>
              </ul>
            </div>

            <div className="tech-card">
              <h3>Integration</h3>
              <ul>
                <li>RESTful APIs</li>
                <li>Webhook support</li>
                <li>SSO/SAML authentication</li>
                <li>Custom integration support</li>
              </ul>
            </div>

            <div className="tech-card">
              <h3>Support & Training</h3>
              <ul>
                <li>Comprehensive documentation</li>
                <li>Video training library</li>
                <li>Onboarding programme (4-6 weeks)</li>
                <li>Ongoing technical support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="implementation-section">
        <div className="content-wrapper">
          <h2>Implementation Timeline</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">Week 1-2</div>
              <div className="timeline-content">
                <h3>Discovery & Setup</h3>
                <p>Requirements gathering, branding customisation, and initial configuration</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 3-4</div>
              <div className="timeline-content">
                <h3>Integration & Testing</h3>
                <p>Connect your existing systems, migrate data, and conduct user acceptance testing</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 5-6</div>
              <div className="timeline-content">
                <h3>Training & Soft Launch</h3>
                <p>Staff training, pilot with small cohort, iterate based on feedback</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 7+</div>
              <div className="timeline-content">
                <h3>Full Launch & Scale</h3>
                <p>Go live with full cohort, ongoing support and optimisation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="content-wrapper">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can we customise the platform to match our brand?</h3>
              <p>Yes! All plans include branding customisation (colours, logos, domain). Growth and Enterprise plans include full white-labelling where the platform appears entirely as your own product.</p>
            </div>

            <div className="faq-item">
              <h3>What kind of training and support do you provide?</h3>
              <p>We provide comprehensive onboarding (4-6 weeks), video training library, documentation, and ongoing support. Growth plans include weekly strategy calls, Enterprise includes a dedicated account manager.</p>
            </div>

            <div className="faq-item">
              <h3>Can the platform integrate with our existing systems?</h3>
              <p>Yes. We have pre-built integrations for common systems (MIS, CRM, etc.) and can build custom integrations. Growth plans include 2 custom integrations, Enterprise includes unlimited.</p>
            </div>

            <div className="faq-item">
              <h3>Who owns the data?</h3>
              <p>You do. All learner data belongs to your organisation. We're GDPR compliant with UK data residency. You can export your data at any time.</p>
            </div>

            <div className="faq-item">
              <h3>What happens if we outgrow our plan?</h3>
              <p>You can upgrade at any time. We'll pro-rate the difference and transition you seamlessly. Most organisations start with Starter and upgrade within 6-12 months.</p>
            </div>

            <div className="faq-item">
              <h3>Can we try before we commit?</h3>
              <p>Yes! We offer a 30-day pilot programme where you can test the platform with a small cohort (up to 20 learners) at a reduced rate. 85% of pilots convert to full licences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Youth Development Programme?</h2>
          <p>
            Stop building from scratch. Licence proven infrastructure and be operational in 6 weeks, not 2 years.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary large">Schedule a Demo</button>
            <button className="cta-button secondary large">Download Technical Spec Sheet</button>
          </div>
          <p className="cta-note">
            Or call us: 020 XXXX XXXX | platform@wembleywonders.org
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlatformLicencingPage;