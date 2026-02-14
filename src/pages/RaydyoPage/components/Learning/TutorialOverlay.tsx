import React from 'react';
import { X, Play, Mic, Search, Users, ArrowRight } from 'lucide-react';
import './TutorialOverlay.css';

interface TutorialOverlayProps {
  onClose: () => void;
  userType: 'listener' | 'host' | 'producer' | 'tech' | 'content_creator';
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose, userType }) => {
  const getTutorialContent = () => {
    switch (userType) {
      case 'host':
        return {
          title: 'Welcome, Radio Host!',
          steps: [
            { icon: Mic, text: 'Use the "Go Live" button to start broadcasting' },
            { icon: Users, text: 'Monitor listener count and reactions in real-time' },
            { icon: Search, text: 'Access your show archive and upcoming schedule' }
          ]
        };
      case 'producer':
        return {
          title: 'Producer Dashboard',
          steps: [
            { icon: Play, text: 'Upload and schedule content for broadcast' },
            { icon: Users, text: 'Manage show lineup and host coordination' },
            { icon: Search, text: 'Review analytics and community feedback' }
          ]
        };
      default:
        return {
          title: 'Welcome to Rayd-yo!',
          steps: [
            { icon: Play, text: 'Click play to listen to live or archived shows' },
            { icon: Users, text: 'Join the live chat during broadcasts' },
            { icon: Search, text: 'Search for shows by topic, host, or date' }
          ]
        };
    }
  };

  const { title, steps } = getTutorialContent();

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-backdrop" onClick={onClose}></div>
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="tutorial-content">
          <p className="tutorial-intro">
            Here's how to get the most out of your community radio experience:
          </p>
          
          <div className="tutorial-steps">
            {steps.map((step, index) => (
              <div key={index} className="tutorial-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">
                  <step.icon size={20} />
                </div>
                <div className="step-text">{step.text}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="tutorial-footer">
          <button className="tutorial-cta" onClick={onClose}>
            <span>Let's Get Started</span>
            <ArrowRight size={16} />
          </button>
          <small>You can always access help from the header menu</small>
        </div>
      </div>
    </div>
  );
};