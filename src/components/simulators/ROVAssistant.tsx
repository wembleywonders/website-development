// src/components/simulators/ROVAssistant.tsx
import React from 'react';

interface ROVAssistantProps {
  onHelp: (action: 'help' | 'tips' | 'demo') => void;
}

const ROVAssistant: React.FC<ROVAssistantProps> = ({ onHelp }) => {
  return (
    <div className="rov-assistant">
      <div className="rov-avatar">🤖</div>
      <div className="rov-message">
        Helper ROV is here to guide you through any portal. Need assistance or have questions?
      </div>
      <div className="rov-actions">
        <button className="rov-btn" onClick={() => onHelp('help')}>
          Get Help
        </button>
        <button className="rov-btn" onClick={() => onHelp('tips')}>
          Quick Tips
        </button>
        <button className="rov-btn" onClick={() => onHelp('demo')}>
          Show Me Around
        </button>
      </div>
    </div>
  );
};

export default ROVAssistant;