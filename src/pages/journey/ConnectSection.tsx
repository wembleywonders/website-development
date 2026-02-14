import React from 'react';
import { Link } from 'react-router-dom';
import './ConnectSection.css';

interface ConnectSectionProps {
  reduceMotion: boolean;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({ reduceMotion }) => {
  const brands = [
    {
      id: 'raydyo',
      name: 'G-Tech Raydyo',
      icon: '🎙️',
      tagline: 'Your voice, your story',
      description: 'Community radio & podcasts',
      color: '#f87171', // warm amber/red
      link: '/raydyo',
    },
    {
      id: 'trubble',
      name: 'Trubble n Bass',
      icon: '🎚️',
      tagline: 'Feel the rhythm',
      description: 'Music production & culture',
      color: '#a855f7', // deep violet
      link: '/trubble',
    },
    {
      id: 'joystick',
      name: 'Joystick E-Zine',
      icon: '🕹️',
      tagline: 'Stories worth reading',
      description: 'Digital magazine & articles',
      color: '#06b6d4', // neon cyan
      link: '/joystick',
    },
  ];

  return (
    <div className="connect-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">Connect</h2>
          <p className="section-tagline">Where stories begin</p>
        </div>

        {/* Split Layout */}
        <div className="connect-content">
          
          {/* Left: Visual */}
          <div className="connect-visual">
            <div className={`radial-icons ${reduceMotion ? 'static' : ''}`}>
              <span className="icon-orbit microphone">🎤</span>
              <span className="icon-orbit joystick">🕹️</span>
              <span className="icon-orbit vinyl">💿</span>
              <span className="icon-orbit chat">💬</span>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="connect-narrative">
            <h3 className="narrative-title">Your Story Matters</h3>
            <p className="narrative-text">
              Every voice deserves to be heard. Whether you're sharing your journey on the radio, 
              expressing through music, or writing your truth - this is where it all begins.
            </p>

            {/* Brand Cards */}
            <div className="brand-cards">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={brand.link}
                  className="brand-card"
                  style={{ '--brand-color': brand.color } as React.CSSProperties}
                >
                  <span className="brand-icon">{brand.icon}</span>
                  <div className="brand-info">
                    <h4 className="brand-name">{brand.name}</h4>
                    <p className="brand-tagline">{brand.tagline}</p>
                    <p className="brand-description">{brand.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="section-ctas">
              <Link to="/raydyo" className="section-cta primary">
                Submit Your Story
              </Link>
              <Link to="/programmes" className="section-cta secondary">
                Join a Taster Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;
