import React from 'react';

const ImpactSection: React.FC = () => {
  return (
    <section className="impact-section">
      <div className="impact-content">
        <div className="section-header fade-in">
          <h2 className="section-title">The Challenge We Address</h2>
          <p className="section-subtitle">
            Digital exclusion affects millions across the UK, creating barriers to essential services, employment, and community participation.
          </p>
        </div>
        
        <div className="market-context fade-in">
          <h3>National Digital Exclusion Crisis</h3>
          <p className="section-subtitle">
            While technology advances rapidly, millions remain excluded from digital participation, limiting their access to modern life and opportunities.
          </p>
          
          <div className="market-stats">
            <div className="market-stat">
              <span className="market-stat-number">10M+</span>
              <span className="market-stat-label">People facing digital exclusion in the UK</span>
            </div>
            <div className="market-stat">
              <span className="market-stat-number">1.5M+</span>
              <span className="market-stat-label">Disabled individuals unable to use internet independently</span>
            </div>
            <div className="market-stat">
              <span className="market-stat-number">£63B</span>
              <span className="market-stat-label">Annual economic cost of digital skills gap</span>
            </div>
          </div>
        </div>

        <div className="section-header fade-in">
          <h2 className="section-title">Our Community Impact</h2>
          <p className="section-subtitle">
            Four years of community-led change, measured through real relationships, documented engagement, and lasting community strengthening.
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item fade-in">
            <span className="stat-number">500+</span>
            <span className="stat-label">Residents Engaged Through Big Local Activities</span>
          </div>
          <div className="stat-item fade-in">
            <span className="stat-number">25+</span>
            <span className="stat-label">Community Events Supported Annually</span>
          </div>
          <div className="stat-item fade-in">
            <span className="stat-number">12+</span>
            <span className="stat-label">Local Partnerships Established</span>
          </div>
          <div className="stat-item fade-in">
            <span className="stat-number">4</span>
            <span className="stat-label">Years of Proven CIC Track Record</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;