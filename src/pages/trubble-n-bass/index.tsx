import React from 'react';
import { Link } from 'react-router-dom';
import ProgrammePageTemplate from '../programmes/_shared/ProgrammePageTemplate';
import TrubbleNBassBuilder from '../../components/sandboxes/trubble-n-bass/TrubbleNBassBuilder';
import { getProgramme } from '../programmes/config';

const TrubbleNBassPage: React.FC = () => {
  const config = getProgramme('trubble-n-bass');

  if (!config) {
    return <div>Programme not found</div>;
  }

  return (
    <ProgrammePageTemplate
      config={config}
      interactiveTool={
        <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', border: '2px solid rgba(168, 85, 247, 0.3)' }}>
          <h3 style={{ fontSize: '1.8rem', color: '#a855f7', marginBottom: '1rem' }}>
            🎹 Complete Beat Maker Studio
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Professional music production with playable keyboard, MPC drum pads, 
            visual metronome, and 8-track sequencer. Learn through cultural heritage.
          </p>
          <Link 
            to="/programmes/trubble-n-bass/sandbox"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'white',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              border: 'none',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Launch Beat Maker Studio →
          </Link>
          <div style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#94a3b8' }}>
            <p>🎹 Playable Keyboard • 🥁 16 Drum Pads • ⏱️ Metronome • 🎚️ 8-Track Sequencer</p>
          </div>
        </div>
      }
      communityShowcase={
        <div className="showcase-grid">
          <div className="showcase-item">
            <div className="showcase-image">🎵</div>
            <h4>First Cohort Coming Soon</h4>
            <p>Join the first generation of Wembley Wonders producers. Your beat could be featured here.</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🎧</div>
            <h4>Glen's Journey</h4>
            <p>From 20+ years as a professional DJ to learning production. Your journey starts here.</p>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">📻</div>
            <h4>Raydyo Integration</h4>
            <p>Create radio jingles, drama soundbeds, and stings for Wembley Wonders community radio.</p>
          </div>
        </div>
      }
    />
  );
};

export default TrubbleNBassPage;