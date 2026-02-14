import React from 'react';
import { useWelcomeMessage } from '../../hooks/useSmartRouting';
import './WelcomeBanner.css';

export const WelcomeBanner: React.FC = () => {
  const { message, showBanner, contextualContent, dismissWelcome, acceptWelcome } = useWelcomeMessage();

  if (!showBanner || !message) return null;

  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <div className="banner-icon">👋</div>
        <div className="banner-text">
          <p>{message}</p>
        </div>
        <div className="banner-actions">
          <button 
            className="banner-btn accept"
            onClick={acceptWelcome}
          >
            Perfect!
          </button>
          <button 
            className="banner-btn dismiss"
            onClick={dismissWelcome}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
