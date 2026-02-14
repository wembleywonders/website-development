import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge fade-in">
          <span>🎵</span>
          Community Digital Connection
        </div>
        
        <h1 className="hero-title fade-in">
          Hey Wembley Resident..Let's Get Digital!
        </h1>
        
        <p className="hero-subtitle fade-in">
          No Pressure Drop....just 'Grab and Go'. Four Saturday afternoons a year where you can update your skills at your own pace.
        </p>
        
        <div className="hero-actions fade-in">
          <a href="/workshops" className="btn btn-primary btn-large">
            See Our Workshops
          </a>
          <a href="/about" className="btn btn-secondary btn-large">
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;