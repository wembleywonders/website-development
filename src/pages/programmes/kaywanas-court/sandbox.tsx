// src/pages/programmes/kaywanas-court/sandbox.tsx
import React from 'react';
import BaseSandbox from '../../../components/sandboxes/shared/BaseSandbox';
import ProductionPlannerV2 from '../../../components/sandboxes/kaywanas-court/ProductionPlannerV2';
import { SANDBOX_CONFIGS } from '../../../config/sandboxConfig';

const KaywanasCourtSandbox: React.FC = () => {
  const config = SANDBOX_CONFIGS.kaywanas;

  return (
    <BaseSandbox
      programmeSlug={config.slug}
      programmeName={config.name}
      icon={config.icon}
      title={config.title}
      subtitle={config.subtitle}
      ctaTitle={config.ctaTitle}
      ctaDescription={config.ctaDescription}
      primaryCtaText={config.primaryCtaText}
      primaryCtaUrl="/membership"
      secondaryCtaText="Learn More About Kaywana's Court"
      secondaryCtaUrl="/programmes/kaywanas-court"
      ctaNote={config.ctaNote}
    >
      {/* Passionistas Context */}
      <div className="passionistas-context" style={{
        background: 'rgba(168, 85, 247, 0.1)',
        border: '2px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}>
        <h3 style={{ color: '#a855f7', marginBottom: '0.5rem' }}>
          🎭 Kaywana's Court Team - Where Passionistas Bring Stories to Life
        </h3>
        <p style={{ color: '#cbd5e1', marginBottom: '0' }}>
          You're exploring the Kaywana's Court team as part of your Passionista journey. 
          Actors, directors, and cultural preservers who transform narratives into lived 
          experiences. Your performances become the cultural memory that connects 
          generations.
        </p>
      </div>

      {/* The actual tool */}
      <ProductionPlannerV2 />

      {/* Collaboration Section */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>
          🤝 How Other Wembley Wonders Teams Elevate Your Production
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem',
        }}>
          <div style={{
            background: 'rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#ec4899' }}>🎵 Trubble n Bass</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              <strong>Sound Design:</strong> Original score, atmospheric soundscapes, 
              and audio effects that deepen emotional impact.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Value add: +£45 in professional audio
            </p>
          </div>

          <div style={{
            background: 'rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#f59e0b' }}>🎙️ G-Tech Casters</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              <strong>Documentation:</strong> Behind-scenes footage, promotional content, 
              and performance capture for archive and marketing.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Value add: +£40 in video assets
            </p>
          </div>

          <div style={{
            background: 'rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#db2777' }}>👠 Silk Stilettos</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              <strong>Costume & Set Design:</strong> Visual identity, character costumes, 
              and stage aesthetics that bring your vision to life.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Value add: +£50 in production value
            </p>
          </div>

          <div style={{
            background: 'rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#06b6d4' }}>📖 Pageturners</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              <strong>Script Development:</strong> Dramaturgical support, script editing, 
              and narrative structure refinement.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Value add: +£30 in script quality
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(168, 85, 247, 0.1)',
          borderLeft: '4px solid #a855f7',
          borderRadius: '0.5rem',
        }}>
          <p style={{ color: '#e2e8f0', margin: 0 }}>
            <strong>Ready for a full production?</strong> Complex theatre projects like 
            radio plays, community productions, or cultural showcases require coordinated 
            teams. Maya can assemble your cast, crew, and support specialists - turning 
            your vision into a professional production that generates revenue and preserves 
            cultural memory.
          </p>
        </div>
      </div>
    </BaseSandbox>
  );
};

export default KaywanasCourtSandbox;
