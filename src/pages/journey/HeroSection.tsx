import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

interface HeroSectionProps {
  reduceMotion: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ reduceMotion }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in on load
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Parallax effect (only if motion not reduced)
    if (!reduceMotion) {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const parallaxOffset = reduceMotion ? 0 : scrollY * 0.5;

  return (
    <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
      
      {/* Background Layer */}
      <div 
        className="hero-background"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="hero-gradient-overlay" />
        
        {/* Animated elements (disabled if reduced motion) */}
        {!reduceMotion && (
          <>
            <div className="hero-ripple ripple-1" />
            <div className="hero-ripple ripple-2" />
            <div className="hero-ripple ripple-3" />
          </>
        )}
      </div>

      {/* Content Layer */}
      <div className="hero-content-wrapper">
        <div className="hero-content">
          
          {/* Intro Text */}
          <div className="hero-intro">
            <h1 className="hero-greeting">
              Hello from <span className="highlight-wembley">Wonderful Wembley</span>
            </h1>
          </div>

          {/* Main Title */}
          <div className="hero-main-title">
            <h2 className="space-between-title">
              We live in
              <span className="title-emphasis">The Space Between</span>
            </h2>
          </div>

          {/* Subtitle Lines */}
          <div className="hero-subtitle">
            <p className="subtitle-line delay-1">Where generations cross paths...</p>
            <p className="subtitle-line delay-2">Where tradition meets innovation...</p>
            <p className="subtitle-line delay-3">Where the forgotten become celebrated...</p>
          </div>

          {/* Call to Actions */}
          <div className="hero-cta-group">
            <Link to="/raydyo" className="hero-cta primary">
              <span className="cta-icon">🎧</span>
              <span className="cta-text">Listen on G-Tech Raydyo</span>
            </Link>

            <Link to="/programmes" className="hero-cta secondary">
              <span className="cta-icon">🧪</span>
              <span className="cta-text">Explore The Lab</span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-scroll-indicator">
            <div className="scroll-icon">
              <span>↓</span>
            </div>
            <p className="scroll-text">Discover your journey</p>
          </div>
        </div>
      </div>

      {/* Logo Watermark (subtle, bottom corner) */}
      <div className="hero-logo-watermark">
        <svg viewBox="0 0 100 100" className="watermark-svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
          <text x="50" y="55" textAnchor="middle" fontSize="24" fill="currentColor" opacity="0.2">
            WW
          </text>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
