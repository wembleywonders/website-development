import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  FileText, 
  ArrowRight,
  HelpCircle,
  Award,
  Users
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import './ConnectorApplicationGatewayPage.css';

const ConnectorApplicationGatewayPage: React.FC = () => {
  return (
    <div className="connector-gateway-page">
      <div className="gateway-container">
        
        {/* Hero Section */}
        <div className="gateway-hero">
          <div className="hero-content">
            <h1>Become a Connector</h1>
            <p className="hero-subtitle">
              Choose your application pathway based on your experience and preparation
            </p>
            <div className="hero-badges">
              <div className="badge">
                <Users className="badge-icon" size={20} />
                <span>Community Role</span>
              </div>
              <div className="badge">
                <Clock className="badge-icon" size={20} />
                <span>4-6 Hours/Month</span>
              </div>
              <div className="badge">
                <Award className="badge-icon" size={20} />
                <span>Pathway to Curator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pathway Selection */}
        <div className="pathway-selection">
          <h2>Choose Your Application Pathway</h2>
          <p className="section-intro">
            Select the option that best matches your current readiness and experience level
          </p>

          <div className="pathways-grid">
            
            {/* Direct Application Path */}
            <div className="pathway-card direct">
              <div className="pathway-header">
                <div className="pathway-icon-wrapper">
                  <FileText className="pathway-icon" size={32} />
                </div>
                <h3>Apply Directly</h3>
                <p className="pathway-subtitle">I'm ready to submit my application</p>
              </div>

              <div className="pathway-content">
                <div className="time-estimate">
                  <Clock className="time-icon" size={16} />
                  <span>30-45 minutes to complete</span>
                </div>

                <div className="pathway-info">
                  <h4>Best for:</h4>
                  <ul className="info-list">
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Previous community organizing experience</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Familiarity with our community values</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Clear understanding of the Connector role</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Ready to demonstrate relevant skills</span>
                    </li>
                  </ul>
                </div>

                <div className="pathway-requirements">
                  <h4>You'll need:</h4>
                  <ul className="requirements-list">
                    <li>Personal information and background</li>
                    <li>Community engagement history</li>
                    <li>Skills and experience examples</li>
                    <li>Availability and commitment statement</li>
                  </ul>
                </div>
              </div>

              <div className="pathway-actions">
                <Link to="/apply" className="pathway-btn primary">
                  <span>Start Application</span>
                  <ArrowRight className="btn-icon" size={18} />
                </Link>
                <Link to="/membership" className="pathway-link">
                  Review handbook first
                </Link>
              </div>
            </div>

            {/* Assessment First Path */}
            <div className="pathway-card assessment">
              <div className="pathway-badge">Recommended</div>
              <div className="pathway-header">
                <div className="pathway-icon-wrapper">
                  <BookOpen className="pathway-icon" size={32} />
                </div>
                <h3>Take Assessment First</h3>
                <p className="pathway-subtitle">Prepare and practice before applying</p>
              </div>

              <div className="pathway-content">
                <div className="time-estimate">
                  <Clock className="time-icon" size={16} />
                  <span>1-2 hours total preparation</span>
                </div>

                <div className="pathway-info">
                  <h4>Best for:</h4>
                  <ul className="info-list">
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>New to community organizing roles</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Want to understand expectations better</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Prefer structured preparation process</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={16} />
                      <span>Want to identify skill development areas</span>
                    </li>
                  </ul>
                </div>

                <div className="pathway-steps">
                  <h4>Assessment pathway:</h4>
                  <ol className="steps-list">
                    <li>
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <strong>Read Assessment Guide</strong>
                        <span>Understand what we're looking for</span>
                      </div>
                    </li>
                    <li>
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <strong>Practice Assessment</strong>
                        <span>Test your readiness with scenarios</span>
                      </div>
                    </li>
                    <li>
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <strong>Review Sample Scenarios</strong>
                        <span>Learn from real-world examples</span>
                      </div>
                    </li>
                    <li>
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <strong>Complete Application</strong>
                        <span>Apply with confidence</span>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="pathway-actions">
                <Link to="/assessment-guide" className="pathway-btn primary">
                  <span>Start Assessment Path</span>
                  <ArrowRight className="btn-icon" size={18} />
                </Link>
                <Link to="/practice-assessment" className="pathway-link">
                  Preview sample scenarios
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <div className="help-card">
            <HelpCircle className="help-icon" size={24} />
            <div className="help-content">
              <h3>Not sure which path to choose?</h3>
              <p>
                If you're new to community organizing or want to better understand what the 
                Connector role involves, we recommend starting with the assessment pathway. 
                It provides valuable preparation and helps you identify areas where you might 
                want to develop additional skills before applying.
              </p>
              <div className="help-actions">
                <Link to="/membership" className="help-link">
                  Read the Connector Handbook
                </Link>
                <Link to="/success-stories" className="help-link">
                  Read Success Stories
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Role Overview */}
        <div className="role-overview">
          <h2>What Does a Connector Do?</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-icon">🤝</div>
              <h4>Build Bridges</h4>
              <p>Connect community members with opportunities, resources, and each other</p>
            </div>
            <div className="overview-card">
              <div className="overview-icon">💬</div>
              <h4>Facilitate Communication</h4>
              <p>Ensure information flows effectively between different parts of the community</p>
            </div>
            <div className="overview-card">
              <div className="overview-icon">📚</div>
              <h4>Share Resources</h4>
              <p>Maintain and distribute knowledge about available programs and support</p>
            </div>
            <div className="overview-card">
              <div className="overview-icon">🌱</div>
              <h4>Support Growth</h4>
              <p>Help others discover pathways for personal development and contribution</p>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="commitment-section">
          <h2>Time Commitment & Expectations</h2>
          <div className="commitment-grid">
            <div className="commitment-item">
              <div className="commitment-value">4-6</div>
              <div className="commitment-label">Hours per month</div>
            </div>
            <div className="commitment-item">
              <div className="commitment-value">12+</div>
              <div className="commitment-label">Months commitment</div>
            </div>
            <div className="commitment-item">
              <div className="commitment-value">Weekly</div>
              <div className="commitment-label">Team meetings</div>
            </div>
            <div className="commitment-item">
              <div className="commitment-value">Flexible</div>
              <div className="commitment-label">Schedule options</div>
            </div>
          </div>
          <p className="commitment-note">
            Connectors typically dedicate 4-6 hours per month to community activities, 
            with flexibility to adjust based on personal capacity and project needs.
          </p>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Make an Impact?</h2>
          <p>Join our community of Connectors making a difference in Wembley</p>
          <div className="cta-buttons">
            <Link to="/assessment-guide" className="cta-btn primary">
              Start with Assessment
            </Link>
            <Link to="/apply" className="cta-btn secondary">
              Apply Directly
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectorApplicationGatewayPage;