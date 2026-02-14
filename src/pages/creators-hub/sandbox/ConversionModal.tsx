// src/pages/creators-hub/sandbox/ConversionModal.tsx
import React from 'react';
import './ConversionModal.css';

interface ConversionModalProps {
  type: 'first-post' | 'last-post';
  postsRemaining: number;
  onAccept: () => void;
  onDecline: () => void;
}

const ConversionModal: React.FC<ConversionModalProps> = ({
  type,
  postsRemaining,
  onAccept,
  onDecline,
}) => {
  if (type === 'first-post') {
    return (
      <div className="conversion-modal-overlay">
        <div className="conversion-modal">
          <div className="modal-header">
            <h2>🎉 Your work is live!</h2>
          </div>
          
          <div className="modal-body">
            <p className="modal-lead">
              Your voice note and journal are now in the Gallery.
            </p>
            
            <div className="feature-comparison">
              <div className="current-access">
                <h3>Right now you can:</h3>
                <ul>
                  <li>✓ Browse the Gallery</li>
                  <li>✓ See what other creators are making</li>
                  <li>✓ Create <strong>1 more free post</strong></li>
                </ul>
              </div>
              
              <div className="member-access">
                <h3>Members can:</h3>
                <ul>
                  <li>✓ Comment and connect with other creators</li>
                  <li>✓ See responses and reactions to their work</li>
                  <li>✓ Unlimited posts and labs</li>
                  <li>✓ Build their creator profile</li>
                  <li>✓ Earn 55% from published products</li>
                </ul>
              </div>
            </div>
            
            <div className="modal-cta">
              <button className="btn-primary" onClick={onAccept}>
                Become a Member
              </button>
              <button className="btn-secondary" onClick={onDecline}>
                Use My Last Free Post
              </button>
            </div>
            
            <p className="modal-footnote">
              You have <strong>{postsRemaining} free post</strong> remaining
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Last post - stronger conversion message
  return (
    <div className="conversion-modal-overlay urgent">
      <div className="conversion-modal">
        <div className="modal-header urgent">
          <h2>🔒 This was your last free post</h2>
        </div>
        
        <div className="modal-body">
          <p className="modal-lead">
            <strong>Join now to see who's responding to your work</strong> and keep the conversation going.
          </p>
          
          <div className="locked-features">
            <div className="locked-feature">
              <span className="lock-icon">🔒</span>
              <span>3 people commented on your work - join to see them</span>
            </div>
            <div className="locked-feature">
              <span className="lock-icon">🔒</span>
              <span>12 creators viewed your post - join to see who</span>
            </div>
            <div className="locked-feature">
              <span className="lock-icon">🔒</span>
              <span>Someone wants to collaborate - join to connect</span>
            </div>
          </div>
          
          <div className="urgency-message">
            <p>You can still browse the Gallery, but you've used both free posts.</p>
            <p><strong>Join now to unlock unlimited creation and see your impact.</strong></p>
          </div>
          
          <div className="modal-cta">
            <button className="btn-primary large" onClick={onAccept}>
              Join Now - £17/month
            </button>
            <button className="btn-text" onClick={onDecline}>
              Maybe later (browse only)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionModal;
