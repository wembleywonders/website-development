import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './ApplicationSuccessPage.css';

interface LocationState {
  applicationType?: string;
  applicationData?: any;
  offerAccountCreation?: boolean;
}

const ApplicationSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState || {};
  
  const applicationType = state.applicationType || 'connector';
  const offerAccountCreation = state.offerAccountCreation || false;
  const applicationData = state.applicationData;

  // Generate reference number (in production, this would come from backend)
  const applicationRef = `WW-${applicationType.toUpperCase().substring(0, 4)}-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  const submissionDate = new Date().toLocaleDateString();

  // Dynamic content based on application type
  const getApplicationTitle = () => {
    switch(applicationType) {
      case 'volunteer': return 'Volunteer Application';
      case 'connector': return 'Connector Membership';
      case 'champion': return 'Champion Membership';
      case 'curator': return 'Curator Membership';
      case 'director': return 'Director Position';
      case 'staff': return 'Staff Position';
      default: return 'Application';
    }
  };

  const getResponseTime = () => {
    switch(applicationType) {
      case 'volunteer': return 'Within 2-3 business days';
      case 'staff': return 'Within 1 week';
      default: return 'Within 3-5 business days';
    }
  };

  const nextSteps = [
    {
      step: 1,
      title: "Application Review",
      timeframe: getResponseTime(),
      description: "Our team will review your application and verify all submitted information.",
      icon: "📋"
    },
    {
      step: 2,
      title: applicationType === 'volunteer' ? "Interview Scheduling" : "Assessment Scheduling",
      timeframe: "Within 1 week",
      description: applicationType === 'volunteer' 
        ? "We'll contact you to schedule a brief interview to discuss your interests and availability."
        : "If your application meets initial requirements, we'll contact you to schedule your assessment.",
      icon: "📅"
    },
    {
      step: 3,
      title: applicationType === 'volunteer' ? "Onboarding" : "Assessment",
      timeframe: applicationType === 'volunteer' ? "2-3 hours" : "90 minutes",
      description: applicationType === 'volunteer'
        ? "Complete safeguarding training and receive your volunteer handbook and introduction to programmes."
        : "Complete your practical assessment covering community knowledge and role-specific skills.",
      icon: "🎯"
    },
    {
      step: 4,
      title: "Welcome & Start",
      timeframe: "Within 2 weeks",
      description: applicationType === 'volunteer'
        ? "Begin volunteering with your chosen programme and meet your coordinator."
        : "Receive your decision and begin the onboarding process if successful.",
      icon: "🎉"
    }
  ];

  const importantInfo = [
    {
      title: "Keep Your Reference Number",
      content: `Save your reference number (${applicationRef}) for all future communications.`,
      icon: "🔢"
    },
    {
      title: "Check Your Email",
      content: "We'll send all updates to the email address you provided. Check spam folders too.",
      icon: "📧"
    },
    {
      title: offerAccountCreation ? "Track Your Application" : "Assessment Preparation",
      content: offerAccountCreation 
        ? "Create an account to check your application status online anytime."
        : "Use this time to prepare for your assessment using our comprehensive guide.",
      icon: offerAccountCreation ? "👤" : "📚"
    },
    {
      title: "Questions & Support",
      content: "Contact us anytime if you have questions about the process.",
      icon: "💬"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="application-success-page">
      
      <div className="success-container">
        <div className="success-content">
          <div className="success-header">
            <div className="success-icon">✅</div>
            <h1>Application Submitted Successfully!</h1>
            <p>Thank you for your interest in {getApplicationTitle()} with Wembley Wonders</p>
          </div>

          <div className="application-details">
            <div className="detail-card">
              <h2>Application Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Reference Number:</label>
                  <span className="reference-number">{applicationRef}</span>
                </div>
                <div className="detail-item">
                  <label>Submission Date:</label>
                  <span>{submissionDate}</span>
                </div>
                <div className="detail-item">
                  <label>Application Type:</label>
                  <span>{getApplicationTitle()}</span>
                </div>
                <div className="detail-item">
                  <label>Expected Response:</label>
                  <span>{getResponseTime()}</span>
                </div>
              </div>
              <button onClick={handlePrint} className="print-button">
                🖨️ Print Confirmation
              </button>
            </div>
          </div>

          {/* Optional Account Creation Section - Only for guest applications */}
          {offerAccountCreation && (
            <div className="account-creation-section">
              <div className="account-creation-card">
                <div className="account-creation-content">
                  <h2>Want to Track Your Application?</h2>
                  <p>Create a free account to:</p>
                  <ul className="benefits-list">
                    <li>✓ Check your application status online anytime</li>
                    <li>✓ Access your volunteer portal once approved</li>
                    <li>✓ Book workshops and events</li>
                    <li>✓ Connect with the community</li>
                    <li>✓ Receive personalized programme recommendations</li>
                  </ul>
                  
                  <div className="account-creation-actions">
                    <Link 
                      to={`/signup?from=${applicationType}-application&ref=${applicationRef}`}
                      className="create-account-btn primary"
                    >
                      Create Free Account
                    </Link>
                    <Link 
                      to="/" 
                      className="create-account-btn secondary"
                    >
                      Maybe Later, Return Home
                    </Link>
                  </div>
                  
                  <p className="account-note">
                    Don't worry - we'll still process your application if you skip this step. 
                    You can create an account anytime later.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="timeline-section">
            <h2>What Happens Next?</h2>
            <div className="timeline">
              {nextSteps.map((step) => (
                <div key={step.step} className="timeline-item">
                  <div className="timeline-marker">
                    <span className="step-icon">{step.icon}</span>
                    <span className="step-number">{step.step}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="step-header">
                      <h3>{step.title}</h3>
                      <span className="timeframe">{step.timeframe}</span>
                    </div>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="important-information">
            <h2>Important Information</h2>
            <div className="info-grid">
              {importantInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    <p>{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Only show preparation resources for non-volunteer applications */}
          {applicationType !== 'volunteer' && (
            <div className="preparation-section">
              <h2>Prepare for Success</h2>
              <p>While you wait for our response, explore these resources:</p>
              
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">📖</div>
                  <div className="resource-content">
                    <h3>Assessment Guide</h3>
                    <p>Comprehensive preparation covering all assessment areas</p>
                    <Link to="/assessment-guide" className="resource-link">
                      Explore →
                    </Link>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">🎯</div>
                  <div className="resource-content">
                    <h3>Practice Assessment</h3>
                    <p>Test your knowledge with our practice tool</p>
                    <Link to="/practice-assessment" className="resource-link">
                      Explore →
                    </Link>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">🏘️</div>
                  <div className="resource-content">
                    <h3>Community Overview</h3>
                    <p>Learn about Wembley's demographics and opportunities</p>
                    <Link to="/community/overview" className="resource-link">
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="contact-section">
            <h2>Questions or Need Help?</h2>
            <p>Our team is here to support you throughout the application process.</p>
            
            <div className="contact-options">
              <div className="contact-method">
                <strong>Email:</strong> applications@wembleywonders.org
              </div>
              <div className="contact-method">
                <strong>Phone:</strong> 020 8902 9991
              </div>
              <div className="contact-method">
                <strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM
              </div>
            </div>

            <div className="contact-actions">
              <Link to="/contact" className="contact-button primary">
                💬 Contact Us
              </Link>
              <Link to="/" className="contact-button secondary">
                🏠 Return Home
              </Link>
            </div>
          </div>

          <div className="encouragement-section">
            <div className="encouragement-card">
              <h2>Welcome to the Journey!</h2>
              <p>
                You've taken the first step toward making a meaningful difference in the Wembley community. 
                We're excited about the possibility of working together to create positive change.
              </p>
              <p>
                Remember, {applicationType === 'volunteer' ? 'volunteering' : 'joining our community'} isn't just about what you can give – 
                it's also about the skills, connections, and personal growth you'll gain along the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationSuccessPage;