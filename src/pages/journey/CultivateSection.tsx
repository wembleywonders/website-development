import React from 'react';
import { Link } from 'react-router-dom';
import './CultivateSection.css';

interface CultivateSectionProps {
  reduceMotion: boolean;
}

const CultivateSection: React.FC<CultivateSectionProps> = ({ reduceMotion }) => {
  return (
    <div className="cultivate-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Cultivate</h2>
          <p className="section-tagline">Safe spaces to grow</p>
        </div>

        <div className="cultivate-modules">
          <div className={`cultivate-module sandbox ${reduceMotion ? 'static' : ''}`}>
            <span className="module-icon">🏖️</span>
            <h3>The Sandbox</h3>
            <p>Experiment freely. No judgment. Just growth.</p>
            <Link to="/sandbox" className="module-link">Explore →</Link>
          </div>

          <div className={`cultivate-module journal ${reduceMotion ? 'static' : ''}`}>
            <span className="module-icon">📓</span>
            <h3>Creator's Journal</h3>
            <p>Document your journey. Reflect. Improve.</p>
            <Link to="/creators-journal" className="module-link">Start Writing →</Link>
          </div>

          <div className={`cultivate-module fanclub ${reduceMotion ? 'static' : ''}`}>
            <span className="module-icon">❤️</span>
            <h3>Passionistas Fanclub</h3>
            <p>Find your supporters. Build your community.</p>
            <Link to="/programmes/silk-stilettos" className="module-link">Join →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultivateSection;
