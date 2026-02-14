import React from 'react';
import { Link } from 'react-router-dom';
import DraggableMaya from "../components/maya/DraggableMaya";
import Footer from "../components/layout/Footer";
import './ChampionPage.css';

const ChampionPage: React.FC = () => {
  return (
    <div className="champion-page">
      <div className="champion-header">
        <div className="champion-badge">
          <span>👑</span>
          <span>Executive Leadership Tier</span>
        </div>
        <h1 className="champion-title">Champion Membership</h1>
        <p className="champion-subtitle">
          Exercise executive authority over strategic community development, with significant budget responsibility and democratic governance leadership in Wembley's transformation.
        </p>
      {/* Maya Chat Integration */}
      <DraggableMaya membershipTier="champion" />
      <Footer />
      </div>

      <div className="champion-content">
        {/* Executive Authority */}
        <section className="authority-section">
          <h2 className="section-title">Executive Authority & Budget Responsibility</h2>
          <p className="section-description">
            Champions wield real executive power in community decision-making, with substantial budget authority and strategic oversight responsibility.
          </p>
          
          <div className="authority-grid">
            <div className="authority-card">
              <div className="authority-icon">💰</div>
              <h3 className="authority-title">Strategic Budget Authority</h3>
              <div className="authority-amount">£250,000+</div>
              <p className="authority-description">
                Direct authority over annual community development budgets, major infrastructure projects, and strategic partnership investments.
              </p>
            </div>

            <div className="authority-card">
              <div className="authority-icon">🗳️</div>
              <h3 className="authority-title">Democratic Governance</h3>
              <div className="authority-amount">10x Voting Weight</div>
              <p className="authority-description">
                Lead democratic decision-making processes, policy development, and strategic planning for community transformation initiatives.
              </p>
            </div>

            <div className="authority-card">
              <div className="authority-icon">🏢</div>
              <h3 className="authority-title">Partnership Authority</h3>
              <div className="authority-amount">£500K+ Contracts</div>
              <p className="authority-description">
                Negotiate major partnerships with councils, businesses, and institutions. Represent Wembley Wonders at executive level meetings.
              </p>
            </div>

            <div className="authority-card">
              <div className="authority-icon">📊</div>
              <h3 className="authority-title">Strategic Oversight</h3>
              <div className="authority-amount">Full Platform Access</div>
              <p className="authority-description">
                Oversee all community programs, assess organizational performance, and guide long-term strategic development.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Responsibilities */}
        <section className="responsibilities-section">
          <h2 className="section-title">Executive Leadership Responsibilities</h2>
          
          <div className="responsibilities-grid">
            <div className="responsibility-card">
              <div className="responsibility-header">
                <div className="responsibility-icon">🎯</div>
                <h3 className="responsibility-title">Strategic Planning</h3>
              </div>
              <ul className="responsibility-list">
                <li>Develop 3-5 year community development strategies</li>
                <li>Set organizational priorities and resource allocation</li>
                <li>Assess community needs and plan program responses</li>
                <li>Guide major project planning and implementation</li>
                <li>Oversee risk management and contingency planning</li>
              </ul>
            </div>

            <div className="responsibility-card">
              <div className="responsibility-header">
                <div className="responsibility-icon">👥</div>
                <h3 className="responsibility-title">Leadership Development</h3>
              </div>
              <ul className="responsibility-list">
                <li>Mentor Curator members for advancement</li>
                <li>Design leadership development pathways</li>
                <li>Conduct performance evaluations for tier progression</li>
                <li>Lead executive training sessions for advanced members</li>
                <li>Represent organization at professional development events</li>
              </ul>
            </div>

            <div className="responsibility-card">
              <div className="responsibility-header">
                <div className="responsibility-icon">🤝</div>
                <h3 className="responsibility-title">External Relations</h3>
              </div>
              <ul className="responsibility-list">
                <li>Negotiate partnerships with major stakeholders</li>
                <li>Represent organization at council and government meetings</li>
                <li>Develop corporate sponsorship and funding strategies</li>
                <li>Build relationships with media and communications channels</li>
                <li>Coordinate with other community organizations</li>
              </ul>
            </div>

            <div className="responsibility-card">
              <div className="responsibility-header">
                <div className="responsibility-icon">💼</div>
                <h3 className="responsibility-title">Organizational Governance</h3>
              </div>
              <ul className="responsibility-list">
                <li>Chair governance committees and strategic meetings</li>
                <li>Ensure compliance with CIC regulations and reporting</li>
                <li>Oversee financial management and audit processes</li>
                <li>Guide policy development and implementation</li>
                <li>Maintain organizational standards and quality assurance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="impact-section">
          <h2 className="section-title">Champion Leadership Impact</h2>
          
          <div className="impact-grid">
            <div className="impact-metric">
              <div className="impact-number">£8.7M</div>
              <div className="impact-label">Community Investment Secured</div>
            </div>
            <div className="impact-metric">
              <div className="impact-number">2,400+</div>
              <div className="impact-label">Residents Directly Served</div>
            </div>
            <div className="impact-metric">
              <div className="impact-number">47</div>
              <div className="impact-label">Strategic Partnerships</div>
            </div>
            <div className="impact-metric">
              <div className="impact-number">15</div>
              <div className="impact-label">Community Leaders Developed</div>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section className="application-section">
          <h2 className="application-title">Executive Leadership Application</h2>
          <p className="application-text">
            Champion membership is reserved for exceptional leaders with proven track records of community impact and executive-level experience.
          </p>
          
          <div className="application-buttons">
            <Link to="/apply" className="btn btn-primary">
              <span>Apply for Champion</span>
              <span>→</span>
            </Link>
            <Link to="/membership" className="btn btn-secondary">
              <span>Compare All Tiers</span>
            </Link>
          </div>

          <div className="requirements-notice">
            <div className="requirements-title">
              <span>⚠️</span>
              <span>Stringent Executive Standards Required</span>
            </div>
            <p className="requirements-text">
              Champion applications require minimum 2 years Curator experience, professional executive references, enhanced background checks, and board approval. Only 8-12 Champion positions available at any time.
            </p>
          </div>
        </section>
      {/* Maya Chat Integration */}
      <DraggableMaya membershipTier="champion" />
      <Footer />
      </div>
    </div>
  );
};

export default ChampionPage;