import React from 'react';
import { Link } from 'react-router-dom';
import './CelebrateSection.css';

interface CelebrateSectionProps {
  reduceMotion: boolean;
}

const CelebrateSection: React.FC<CelebrateSectionProps> = ({ reduceMotion }) => {
  return (
    <div className="celebrate-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2 className="section-title">Celebrate</h2>
          <p className="section-tagline">Share. Shine. Sell.</p>
        </div>

        <div className="celebrate-platforms">
          <div className="platform-card cyberstore">
            <span className="platform-icon">🛍️</span>
            <h3>Cyberstore</h3>
            <p>Showcase and sell your digital creations</p>
            <Link to="/cyberstore" className="platform-link">Shop Now →</Link>
          </div>

          <div className="platform-card silk-stilettos">
            <span className="platform-icon">💫</span>
            <h3>Silk Stilettos</h3>
            <p>Spotlight on women innovators</p>
            <Link to="/programmes/silk-stilettos" className="platform-link">Meet Them →</Link>
          </div>

          <div className="platform-card passionistas">
            <span className="platform-icon">❤️</span>
            <h3>Passionistas Fanclub</h3>
            <p>Support your favorite creators</p>
            <Link to="/programmes/silk-stilettos" className="platform-link">Join →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrateSection;
