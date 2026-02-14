import React from 'react';
import './QuickStartOverlay.css';

interface QuickStartOverlayProps {
  onChoice: (choice: string) => void;
  onClose: () => void;
}

const QuickStartOverlay: React.FC<QuickStartOverlayProps> = ({ onChoice, onClose }) => {
  const choices = [
    {
      id: 'learn',
      icon: '🎓',
      label: 'Learn tech skills',
      description: 'Explore our programmes',
    },
    {
      id: 'story',
      icon: '🎙️',
      label: 'Share my story',
      description: 'Join G-Tech Raydyo',
    },
    {
      id: 'workshop',
      icon: '🛠️',
      label: 'Join a workshop',
      description: 'Hands-on learning',
    },
    {
      id: 'shop',
      icon: '🛍️',
      label: 'Shop creations',
      description: 'Visit the Cyberstore',
    },
    {
      id: 'mentor',
      icon: '💡',
      label: 'Mentor someone',
      description: 'Give back to community',
    },
    {
      id: 'connect',
      icon: '🌊',
      label: 'Explore the journey',
      description: 'Take the full tour',
    },
  ];

  return (
    <div className="quick-start-overlay" role="dialog" aria-labelledby="quick-start-title">
      <div className="quick-start-content">
        
        {/* Header */}
        <div className="quick-start-header">
          <h2 id="quick-start-title">Welcome to The Space Between</h2>
          <p className="subtitle">What brings you here today?</p>
        </div>

        {/* Choice Grid */}
        <div className="quick-start-grid">
          {choices.map((choice) => (
            <button
              key={choice.id}
              className="quick-start-choice"
              onClick={() => onChoice(choice.id)}
              aria-label={`${choice.label}: ${choice.description}`}
            >
              <span className="choice-icon">{choice.icon}</span>
              <div className="choice-content">
                <h3 className="choice-label">{choice.label}</h3>
                <p className="choice-description">{choice.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="quick-start-footer">
          <button 
            className="close-overlay-btn"
            onClick={onClose}
            aria-label="Close and browse freely"
          >
            I'll browse on my own
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="quick-start-backdrop" onClick={onClose} aria-hidden="true" />
    </div>
  );
};

export default QuickStartOverlay;
