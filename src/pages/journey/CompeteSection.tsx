import React from 'react';
import { Link } from 'react-router-dom';
import './CompeteSection.css';

interface CompeteSectionProps {
  reduceMotion: boolean;
}

const CompeteSection: React.FC<CompeteSectionProps> = ({ reduceMotion }) => {
  return (
    <div className="compete-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">Compete</h2>
          <p className="section-tagline">Show what you've built</p>
        </div>

        <div className="compete-content">
          <div className="compete-arena kaywanas-court">
            <h3>🏛️ Kaywana's Court</h3>
            <p>Cultural celebrations meet tech showcases</p>
            <Link to="/programmes/kaywanas-court" className="arena-link">Enter the Court →</Link>
          </div>

          <div className="compete-arena casters-arena">
            <h3>🎮 G-Tech Casters Arena</h3>
            <p>Live competitions, digital showcases, eSports</p>
            <Link to="/programmes/gtechcasters" className="arena-link">Watch Live →</Link>
          </div>
        </div>

        <div className="section-ctas center">
          <Link to="/sessions" className="section-cta primary">
            Enter Challenge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompeteSection;
