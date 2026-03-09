import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import './ProgrammesPage.css';

const ProgrammesPage: React.FC = () => {
  const programmes = [
    {
      id: 'bright-sparks',
      name: 'Bright Sparks',
      icon: '✨',
      tagline: 'Not sure where to start? Begin here.',
      color: '#fbbf24',
      path: '/programmes/bright-sparks'
    },
    {
      id: 'stemgeneers',
      name: 'STEMgeneers',
      icon: '⚡',
      tagline: 'Build. Code. Engineer.',
      color: '#3b82f6',
      path: '/programmes/stemgeneers'
    },
    {
      id: 'techreneurs',
      name: 'TECHreneurs',
      icon: '💻',
      tagline: 'Build Businesses. Create Impact.',
      color: '#8b5cf6',
      path: '/programmes/techreneurs'
    },
    {
      id: 'gtechcasters',
      name: 'G-Tech Casters',
      icon: '🎙️',
      tagline: 'Create. Broadcast. Engage.',
      color: '#ef4444',
      path: '/programmes/gtechcasters'
    },
    {
      id: 'kaywanas-court',
      name: "Kaywana's Court",
      icon: '🎭',
      tagline: 'Culture. Heritage. Performance.',
      color: '#ec4899',
      path: '/programmes/kaywanas-court'
    },
    {
      id: 'pageturners',
      name: 'Pageturners',
      icon: '✍️',
      tagline: 'Write. Share. Publish.',
      color: '#f59e0b',
      path: '/programmes/pageturners'
    },
    {
      id: 'silk-stilettos',
      name: 'Silk Stilettos',
      icon: '🎨',
      tagline: 'Women Creating. Women Leading.',
      color: '#db2777',
      path: '/programmes/silk-stilettos'
    },
    {
      id: 'trubble-n-bass',
      name: 'Trubble n Bass',
      icon: '🎵',
      tagline: 'Create Beats. Get Heard. Earn Income.',
      color: '#10b981',
      path: '/programmes/trubble-n-bass'
    },
    {
      id: 'auntie-anansis-kitchen',
      name: "Auntie Anansi's Kitchen",
      icon: '🍲',
      tagline: 'Preserve Culture. Reclaim Heritage.',
      color: '#f97316',
      path: '/programmes/auntie-anansis-kitchen'
    },
    {
      id: 'easy-street',
      name: 'Easy Street',
      icon: '📻',
      tagline: 'Radio Drama. Community Storytelling.',
      color: '#06b6d4',
      path: '/programmes/easy-street'
    },
    {
      id: 'roots',
      name: 'Roots',
      icon: '🌿',
      tagline: 'Body Sovereignty. Knowledge Archive.',
      color: '#059669',
      path: '/programmes/roots'
    }
  ];

  return (
    <PageTemplate 
      pageTitle="Our Programmes"
      pageStrapline="Eleven pathways to build skills, create impact, and earn income"
      pageGuide="Choose your creative journey. Each programme includes hands-on learning, community projects, and real opportunities to showcase your work."
      pageType="standard"
    >
      <div className="programmes-directory">
        
        {/* Simple intro */}
        <section className="directory-intro">
          <p className="intro-text">
            All programmes run on a sliding scale (£0–200). Members attend free. 
            Each programme leads to showcase opportunities and ongoing income potential.
          </p>
        </section>

        {/* Clean programme grid */}
        <section className="programmes-grid">
          {programmes.map(programme => (
            <Link 
              key={programme.id}
              to={programme.path}
              className="programme-card"
              style={{ borderLeftColor: programme.color }}
            >
              <div className="card-icon" style={{ color: programme.color }}>
                {programme.icon}
              </div>
              <div className="card-content">
                <h3 className="card-title">{programme.name}</h3>
                <p className="card-tagline">{programme.tagline}</p>
              </div>
              <div className="card-arrow" style={{ color: programme.color }}>
                →
              </div>
            </Link>
          ))}
        </section>

        {/* Earning path CTA */}
        <section className="pathways-cta">
          <div className="cta-box">
            <span className="cta-icon">🗺️</span>
            <div className="cta-text">
              <h3>Not sure where to start?</h3>
              <p>Find your earning path — match your skills to a real income route</p>
            </div>
            <Link to="/creator-pathways" className="cta-button">
              Find your earning path
            </Link>
          </div>
        </section>

        {/* Quick links */}
        <section className="quick-links">
          <Link to="/membership" className="quick-link">
            <span>💳</span>
            <span>Become a Member</span>
          </Link>
          <Link to="/workshops" className="quick-link">
            <span>🔨</span>
            <span>Browse Workshops</span>
          </Link>
          <Link to="/calendar" className="quick-link">
            <span>📅</span>
            <span>View Schedule</span>
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default ProgrammesPage;