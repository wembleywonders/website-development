import React from 'react';
import './ProgressIndicator.css';

interface ProgressIndicatorProps {
  currentSection: string;
  onSectionClick: (sectionId: string) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentSection, onSectionClick }) => {
  const sections = [
    { id: 'hero', label: 'Start', icon: '🌟' },
    { id: 'connect', label: 'Connect', icon: '🎙️' },
    { id: 'create', label: 'Create', icon: '🧪' },
    { id: 'cultivate', label: 'Cultivate', icon: '🌱' },
    { id: 'compete', label: 'Compete', icon: '🏆' },
    { id: 'celebrate', label: 'Celebrate', icon: '✨' },
    { id: 'loop', label: 'Loop', icon: '∞' },
  ];

  return (
    <nav className="progress-indicator" aria-label="Journey progress">
      <div className="progress-track">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <button
              className={`progress-step ${currentSection === section.id ? 'active' : ''} ${
                sections.findIndex(s => s.id === currentSection) > index ? 'completed' : ''
              }`}
              onClick={() => onSectionClick(section.id)}
              aria-label={`${section.label} section${currentSection === section.id ? ' - current' : ''}`}
              aria-current={currentSection === section.id ? 'location' : undefined}
            >
              <span className="step-icon">{section.icon}</span>
              <span className="step-label">{section.label}</span>
            </button>

            {index < sections.length - 1 && (
              <div className="progress-connector">
                <svg viewBox="0 0 50 2" className="connector-line">
                  <line 
                    x1="0" 
                    y1="1" 
                    x2="50" 
                    y2="1" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeDasharray={sections.findIndex(s => s.id === currentSection) > index ? '0' : '5,5'}
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default ProgressIndicator;
