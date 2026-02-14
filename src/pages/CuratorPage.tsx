import React from 'react';
import { Link } from 'react-router-dom';
import DraggableMaya from "../components/maya/DraggableMaya";
import Footer from "../components/layout/Footer";
import './CuratorPage.css';

const CuratorPage: React.FC = () => {
  return (
    <div className="curator-page">
      <div className="curator-header">
        <div className="curator-badge">
          <span>🎯</span>
          <span>Active Leadership Tier</span>
        </div>
        <h1 className="curator-title">Curator Membership</h1>
        <p className="curator-subtitle">
          Lead community initiatives, manage youth programs, and shape Wembley's digital future through active project leadership and democratic participation.
        </p>
      {/* Maya Chat Integration */}
      <DraggableMaya membershipTier="curator" />
      <Footer />
      </div>

      <div className="curator-content">
        {/* Leadership Responsibilities */}
        <section className="leadership-section">
          <h2 className="section-title">Leadership Responsibilities</h2>
          <p className="section-description">
            As a Curator, you'll take active leadership roles in our community initiatives, with real authority and measurable impact.
          </p>
          
          <div className="leadership-grid">
            <div className="leadership-card">
              <div className="leadership-icon">👥</div>
              <h3 className="leadership-title">Youth Program Management</h3>
              <div className="leadership-budget">Budget Authority: £5,000</div>
              <p className="leadership-description">
                Lead STEMgineer and Tech-preneur programs for young people aged 8-18, including workshop planning, mentor coordination, and progress tracking.
              </p>
              <ul className="leadership-activities">
                <li>Design and deliver coding workshops</li>
                <li>Coordinate maker space activities</li>
                <li>Manage youth project showcases</li>
                <li>Supervise Connector tier members in youth programs</li>
              </ul>
            </div>

            <div className="leadership-card">
              <div className="leadership-icon">🚀</div>
              <h3 className="leadership-title">Campaign Management</h3>
              <div className="leadership-budget">Campaign Target: £50,000</div>
              <p className="leadership-description">
                Lead major crowdfunding campaigns for community projects, from equipment purchases to event organization.
              </p>
              <ul className="leadership-activities">
                <li>Plan and execute crowdfunding strategies</li>
                <li>Coordinate with local business sponsors</li>
                <li>Manage volunteer teams for events</li>
                <li>Report impact metrics to Champion tier</li>
              </ul>
            </div>

            <div className="leadership-card">
              <div className="leadership-icon">🏛️</div>
              <h3 className="leadership-title">Democratic Participation</h3>
              <div className="leadership-budget">Voting Weight: 3x Standard</div>
              <p className="leadership-description">
                Participate in governance decisions, policy development, and strategic planning for community development.
              </p>
              <ul className="leadership-activities">
                <li>Lead policy discussion groups</li>
                <li>Represent community in council meetings</li>
                <li>Facilitate member voting processes</li>
                <li>Mentor Connector members in civic engagement</li>
              </ul>
            </div>

            <div className="leadership-card">
              <div className="leadership-icon">🤝</div>
              <h3 className="leadership-title">Partnership Development</h3>
              <div className="leadership-budget">Partnership Value: £25,000+</div>
              <p className="leadership-description">
                Build relationships with local schools, businesses, and organizations to expand community impact.
              </p>
              <ul className="leadership-activities">
                <li>Negotiate partnership agreements</li>
                <li>Present at stakeholder meetings</li>
                <li>Coordinate with Ark Elvin Academy</li>
                <li>Develop corporate sponsorship programs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Professional Development */}
        <section className="development-section">
          <h2 className="section-title">Professional Development Benefits</h2>
          <p className="section-description">
            Curator membership provides advanced professional development comparable to executive training programs.
          </p>

          <div className="development-grid">
            <div className="development-track">
              <h3 className="track-title">Executive Skills Training</h3>
              <div className="track-features">
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <div className="feature-content">
                    <h4>Budget Management Certification</h4>
                    <p>Learn financial planning, risk assessment, and resource allocation through real project budgets up to £50,000.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎤</span>
                  <div className="feature-content">
                    <h4>Public Speaking & Presentation</h4>
                    <p>Regular opportunities to present to community groups, council meetings, and business stakeholders.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📈</span>
                  <div className="feature-content">
                    <h4>Strategic Planning Experience</h4>
                    <p>Lead long-term project planning, community needs assessment, and impact measurement initiatives.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="development-track">
              <h3 className="track-title">ROV Executive Coaching</h3>
              <div className="track-features">
                <div className="feature-item">
                  <span className="feature-icon">🤖</span>
                  <div className="feature-content">
                    <h4>AI-Assisted Leadership Development</h4>
                    <p>Personalized coaching sessions using our ROV system for decision-making, conflict resolution, and team management.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📋</span>
                  <div className="feature-content">
                    <h4>Performance Analytics</h4>
                    <p>Detailed feedback on leadership effectiveness, communication skills, and project outcomes.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <div className="feature-content">
                    <h4>Career Advancement Planning</h4>
                    <p>Structured pathway development for progression to Champion tier or external leadership roles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements & Assessment */}
        <section className="requirements-section">
          <h2 className="section-title">Curator Requirements & Assessment</h2>
          
          <div className="requirements-grid">
            <div className="requirement-category">
              <h3 className="category-title">Advancement Criteria</h3>
              <div className="requirement-card">
                <h4>From Connector Tier</h4>
                <ul className="requirement-list">
                  <li>Completed 12-month Connector assessment period</li>
                  <li>Demonstrated consistent community engagement</li>
                  <li>Positive peer evaluations from existing Curators</li>
                  <li>Successfully led at least 2 community initiatives</li>
                  <li>Enhanced DBS clearance approved</li>
                </ul>
              </div>
            </div>

            <div className="requirement-category">
              <h3 className="category-title">Ongoing Commitments</h3>
              <div className="requirement-card">
                <h4>Active Leadership Standards</h4>
                <ul className="requirement-list">
                  <li>Minimum 8 hours community work per month</li>
                  <li>Lead or co-lead at least 1 major project annually</li>
                  <li>Attend monthly governance meetings</li>
                  <li>Mentor 2-3 Connector tier members</li>
                  <li>Participate in quarterly professional development</li>
                </ul>
              </div>
            </div>

            <div className="requirement-category">
              <h3 className="category-title">Professional Standards</h3>
              <div className="requirement-card">
                <h4>Code of Conduct</h4>
                <ul className="requirement-list">
                  <li>Maintain professional conduct in all community interactions</li>
                  <li>Adhere to safeguarding protocols for youth programs</li>
                  <li>Transparent financial management of project budgets</li>
                  <li>Respectful democratic participation in governance</li>
                  <li>Represent Wembley Wonders professionally in external meetings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="impact-section">
          <h2 className="section-title">Curator Impact & Recognition</h2>
          <p className="section-description">
            Curator achievements are formally recognized and can significantly enhance your professional portfolio.
          </p>

          <div className="impact-grid">
            <div className="impact-metric">
              <div className="metric-number">£2.5M</div>
              <div className="metric-label">Community Investment Led</div>
            </div>
            <div className="impact-metric">
              <div className="metric-number">847</div>
              <div className="metric-label">Young People Mentored</div>
            </div>
            <div className="impact-metric">
              <div className="metric-number">23</div>
              <div className="metric-label">Major Projects Delivered</div>
            </div>
            <div className="impact-metric">
              <div className="metric-number">156</div>
              <div className="metric-label">Connector Members Developed</div>
            </div>
          </div>

          <div className="recognition-section">
            <h3 className="recognition-title">Professional Recognition</h3>
            <div className="recognition-benefits">
              <div className="recognition-item">
                <span className="recognition-icon">🏆</span>
                <div>
                  <h4>LinkedIn Certification</h4>
                  <p>Verified community leadership and project management experience</p>
                </div>
              </div>
              <div className="recognition-item">
                <span className="recognition-icon">📜</span>
                <div>
                  <h4>Professional References</h4>
                  <p>Detailed references from Champion tier members for career advancement</p>
                </div>
              </div>
              <div className="recognition-item">
                <span className="recognition-icon">🤝</span>
                <div>
                  <h4>Network Access</h4>
                  <p>Direct connections to Wembley Park business leaders and council officials</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section className="application-section">
          <h2 className="application-title">Ready for Active Leadership?</h2>
          <p className="application-text">
            Curator membership is for committed community leaders ready to take on significant responsibility and make measurable impact in Wembley's development.
          </p>
          
          <div className="application-buttons">
            <Link to="/apply" className="btn btn-primary">
              <span>Apply for Curator</span>
              <span>→</span>
            </Link>
            <Link to="/membership" className="btn btn-secondary">
              <span>Compare All Tiers</span>
            </Link>
          </div>

          <div className="requirements-notice">
            <div className="requirements-title">
              <span>⚠️</span>
              <span>Important: Advanced Vetting Required</span>
            </div>
            <p className="requirements-text">
              Curator applications undergo enhanced background checks and require references from current Champion or Curator members. This process typically takes 4-6 weeks to complete.
            </p>
          </div>
        </section>
      {/* Maya Chat Integration */}
      <DraggableMaya membershipTier="curator" />
      <Footer />
      </div>
    </div>
  );
};

export default CuratorPage;