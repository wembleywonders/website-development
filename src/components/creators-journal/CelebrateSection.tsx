import React from 'react';

const CelebrateSection: React.FC = () => {
  return (
    <div className="journal-section celebrate-section">
      <div className="section-header">
        <h2>🎉 Celebrate</h2>
        <p>Recognize milestones, share successes, and inspire others</p>
      </div>

      <div className="badges-display">
        <h3>Badges & Certifications</h3>
        <p className="placeholder-text">
          Display badges earned through completing programmes and reaching milestones.
        </p>
      </div>

      <div className="journey-timeline">
        <h3>My Journey</h3>
        <p className="placeholder-text">
          A visual timeline of your progress through Wembley Wonders programmes.
        </p>
      </div>
    </div>
  );
};

export default CelebrateSection;
