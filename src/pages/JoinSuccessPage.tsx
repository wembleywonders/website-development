import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JoinSuccessPage.css';

const JoinSuccessPage: React.FC = () => {
  useEffect(() => {
    // Confetti effect or celebration animation here
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">Welcome to Wembley Wonders!</h1>
        <p className="success-message">
          Your payment was successful. Check your email (within 10 minutes) for:
        </p>
        
        <div className="success-checklist">
          <div className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>Payment confirmation & receipt</span>
          </div>
          <div className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>WhatsApp group invite link</span>
          </div>
          <div className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>Session schedule & addresses</span>
          </div>
          <div className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>Equipment booking instructions</span>
          </div>
          <div className="checklist-item">
            <span className="checklist-icon">✓</span>
            <span>Your first steps & orientation guide</span>
          </div>
        </div>

        <div className="success-next-steps">
          <h2>What's Next?</h2>
          <ol>
            <li>Check your email (and spam folder)</li>
            <li>Join the WhatsApp group</li>
            <li>Attend your first session (Tues/Thurs 6-8pm or Sat Zoom 10am)</li>
            <li>Say hi to the community!</li>
          </ol>
        </div>

        <div className="success-actions">
          <Link to="/" className="success-button primary">
            Back to Home
          </Link>
          <a 
            href="mailto:hello@wembleywonders.org" 
            className="success-button secondary"
          >
            Questions? Email Us
          </a>
        </div>

        <p className="success-note">
          💚 Didn't receive the email? Check spam, then email us at hello@wembleywonders.org
        </p>
      </div>
    </div>
  );
};

export default JoinSuccessPage;
