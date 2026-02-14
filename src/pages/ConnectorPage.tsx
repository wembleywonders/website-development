// src/pages/ConnectorPage.tsx
import React from 'react';
import DraggableMaya from "../components/maya/DraggableMaya";
import Footer from "../components/layout/Footer";
import { Link } from 'react-router-dom';
import './ConnectorPage.css';

const ConnectorPage: React.FC = () => {
  return (
    <div className="connector-page">
      
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="tier-badge connector-badge">Entry Level</div>
          <h1 className="page-title">Connector Tier</h1>
          <p className="page-subtitle">
            Compulsory Entry Level - Your Community Licence
          </p>
          
          <div className="tier-philosophy">
            <p className="philosophy-text">
              "Every journey begins with a single step. Every trusted community leader started as a Connector, proving their commitment through consistent action and professional conduct."
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="overview-section">
          <h2 className="section-title">The Foundation of Community Leadership</h2>
          <div className="overview-content">
            <div className="overview-text">
              <p>
                The Connector tier is designed as a comprehensive 12-month assessment period where you develop fundamental community leadership skills while we evaluate your suitability for advanced responsibilities. Like a provisional driving licence, this period ensures you understand our values, demonstrate professional conduct, and show genuine commitment to Wembley's future.
              </p>
              <p>
                This isn't just about volunteering - it's about proving you can be trusted with community reputation, youth safety, and organizational resources. We're investing in your development, and you're investing in proving your worth.
              </p>
            </div>
            <div className="overview-stats">
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Month Assessment</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">85%</div>
                <div className="stat-label">Advancement Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">DBS Checked</div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="learning-section">
          <h2 className="section-title">What You'll Develop</h2>
          <div className="learning-grid">
            <div className="learning-item">
              <div className="learning-icon">🛡️</div>
              <h3 className="learning-title">Safeguarding Excellence</h3>
              <p className="learning-description">
                Master child protection protocols, recognize safeguarding concerns, and understand your legal responsibilities. Essential before any youth contact is permitted.
              </p>
            </div>
            <div className="learning-item">
              <div className="learning-icon">🤝</div>
              <h3 className="learning-title">Professional Conduct</h3>
              <p className="learning-description">
                Learn to represent the organization with integrity, maintain appropriate boundaries, and handle sensitive community situations professionally.
              </p>
            </div>
            <div className="learning-item">
              <div className="learning-icon">📊</div>
              <h3 className="learning-title">Project Management</h3>
              <p className="learning-description">
                Start with supervised project participation, gradually taking on leadership responsibilities as you demonstrate capability and reliability.
              </p>
            </div>
            <div className="learning-item">
              <div className="learning-icon">🎯</div>
              <h3 className="learning-title">Community Impact</h3>
              <p className="learning-description">
                Understand how local action creates lasting change, develop systems thinking, and learn to measure and communicate impact effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Access & Privileges */}
        <div className="access-section">
          <h2 className="section-title">Your Access & Privileges</h2>
          <div className="access-grid">
            <div className="access-column">
              <h3 className="access-title">✅ Immediate Access</h3>
              <ul className="access-list">
                <li>Skills development workshops</li>
                <li>Adult-only community projects</li>
                <li>Basic ROV coaching sessions</li>
                <li>Member networking events</li>
                <li>Digital skills certification</li>
                <li>Peer mentorship program</li>
                <li>Community resource library</li>
              </ul>
            </div>
            <div className="access-column">
              <h3 className="access-title">⏳ Earned Through Progress</h3>
              <ul className="access-list">
                <li>Youth program leadership</li>
                <li>Campaign management rights</li>
                <li>Democratic voting privileges</li>
                <li>Advanced ROV coaching</li>
                <li>External representation</li>
                <li>Partnership development</li>
                <li>Strategic planning input</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment Process */}
        <div className="assessment-section">
          <h2 className="section-title">Your Assessment Journey</h2>
          <div className="assessment-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Months 1-3: Foundation</h3>
                <p className="timeline-description">
                  Complete safeguarding training, DBS check, and attend orientation workshops. Begin supervised community project participation.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Months 4-6: Development</h3>
                <p className="timeline-description">
                  Take on increased responsibilities, complete professional development modules, receive peer feedback and mentorship.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Months 7-9: Leadership</h3>
                <p className="timeline-description">
                  Lead smaller initiatives, demonstrate consistent engagement, show collaborative leadership skills.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Months 10-12: Assessment</h3>
                <p className="timeline-description">
                  Formal evaluation, peer review, and advancement recommendation. Successful candidates progress to Curator tier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="requirements-section">
          <h2 className="section-title">Entry Requirements</h2>
          <div className="requirements-grid">
            <div className="requirement-item">
              <h3 className="requirement-title">Age & Residency</h3>
              <p className="requirement-text">
                18+ years old, live or work in Wembley/surrounding areas, committed to local community development.
              </p>
            </div>
            <div className="requirement-item">
              <h3 className="requirement-title">Professional Standards</h3>
              <p className="requirement-text">
                Demonstrate professional conduct, maintain appropriate boundaries, represent the organization with integrity.
              </p>
            </div>
            <div className="requirement-item">
              <h3 className="requirement-title">Time Commitment</h3>
              <p className="requirement-text">
                Minimum 4 hours monthly participation, attend quarterly assessments, complete required training modules.
              </p>
            </div>
            <div className="requirement-item">
              <h3 className="requirement-title">Background Checks</h3>
              <p className="requirement-text">
                Enhanced DBS check, professional references, social media review, commitment to safeguarding policies.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Start Your Leadership Journey?</h2>
          <p className="cta-text">
            Join a selective community of professionals committed to excellence. The Connector tier is your gateway to meaningful community leadership and personal development.
          </p>
          <div className="cta-buttons">
            <Link to="/apply" className="btn-primary">Apply for Connector Tier</Link>
            <Link to="/rulebook" className="btn-secondary">Download Rule Book</Link>
          </div>
          <div className="cta-note">
            <p>Applications reviewed monthly. Current processing time: 2-3 weeks.</p>
          </div>
        </div>
      {/* Maya Chat Integration */}
      <DraggableMaya membershipTier="connector" />
      <Footer />
      </div>
    </div>
  );
};

export default ConnectorPage;