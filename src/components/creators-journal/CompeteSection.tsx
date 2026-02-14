import React from 'react';

const CompeteSection: React.FC = () => {
  return (
    <div className="journal-section compete-section">
      <div className="section-header">
        <h2>🏆 Compete</h2>
        <p>Showcase your work, enter competitions, and demonstrate your abilities</p>
      </div>

      <div className="portfolio">
        <h3>Portfolio Highlights</h3>
        <p className="placeholder-text">
          Display your best work for potential opportunities, competitions, or collaborations.
        </p>
      </div>

      <div className="achievements">
        <h3>Achievements & Awards</h3>
        <p className="placeholder-text">
          Record competitions entered, awards won, and recognition received.
        </p>
      </div>
    </div>
  );
};

export default CompeteSection;
