// src/pages/programmes/stemgeneers/sandbox.tsx
import React from 'react';
import BaseSandbox from '../../../components/sandboxes/shared/BaseSandbox';
import TechnicalBuilder from '../../../components/sandboxes/stemgeneers/TechnicalBuilder';
import { SANDBOX_CONFIGS } from '../../../config/sandboxConfig';

const STEMgeneersSandbox: React.FC = () => {
  const config = SANDBOX_CONFIGS.stemgeneers;

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
      secondaryCtaText="Learn More About STEMgeneers"
      secondaryCtaUrl="/programmes/stemgeneers"
      ctaNote={config.ctaNote}
    >
      {/* The actual technical builder tool */}
      <TechnicalBuilder />

      {/* Collaboration Section - Why Engineers Need Team */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '1.5rem' }}>
          🤝 Why Engineers Need Designers, Storytellers & Entrepreneurs
        </h3>
        
        <div style={{
          background: 'rgba(234, 179, 8, 0.1)',
          borderLeft: '4px solid #eab308',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
            <strong style={{ color: '#eab308' }}>Uncle Winston's hard-won wisdom:</strong>
          </p>
          <p style={{ color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '0' }}>
            "I built the best sound system Wembley had ever seen. Acoustics perfect. Signal 
            chain flawless. But you know what happened? Nobody bought it. Why? Because it 
            looked like a pile of wood and wires. My nephew's girlfriend - fashion designer - 
            spent TWO HOURS redesigning the enclosure. Same internals. Different box. Sold 
            three that week. That's when I learned: FUNCTIONAL isn't enough. You need the 
            complete package."
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }}>
          <div style={{
            background: 'rgba(219, 39, 119, 0.1)',
            border: '1px solid rgba(219, 39, 119, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#db2777', marginBottom: '0.75rem' }}>
              👠 Silk Stilettos Transform Function to Fashion
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Your circuit works. Their design makes people WANT it.
            </p>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Professional enclosure design</li>
              <li>User-friendly interfaces</li>
              <li>Market-ready aesthetics</li>
              <li>Premium positioning</li>
            </ul>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0' }}>
              <strong>Value add:</strong> +£40-80 market value
            </p>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem' }}>
              🎙️ G-Tech Casters Document Your Genius
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Your technical knowledge becomes teaching income.
            </p>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Build process documentation</li>
              <li>Tutorial video content</li>
              <li>Troubleshooting guides</li>
              <li>Workshop materials</li>
            </ul>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0' }}>
              <strong>Value add:</strong> +£25-50 per tutorial sale (ongoing)
            </p>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#10b981', marginBottom: '0.75rem' }}>
              💼 TECHreneurs Turn Builds into Business
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Your one-off build becomes sustainable income stream.
            </p>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Kit sales strategy</li>
              <li>Pricing optimization</li>
              <li>Customer acquisition</li>
              <li>Revenue modeling</li>
            </ul>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0' }}>
              <strong>Value add:</strong> +£100-300/month recurring revenue
            </p>
          </div>

          <div style={{
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h4 style={{ color: '#06b6d4', marginBottom: '0.75rem' }}>
              📖 Pageturners Explain Your Innovation
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Technical writing that non-engineers understand.
            </p>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Assembly instructions</li>
              <li>Technical blog posts</li>
              <li>Joystick feature articles</li>
              <li>Marketing copy</li>
            </ul>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0' }}>
              <strong>Value add:</strong> +£20-40 in professional documentation
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '1rem',
          textAlign: 'center',
        }}>
          <h4 style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '1.2rem' }}>
            🎬 Complex Team Projects: The Drone Championship Model
          </h4>
          <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
            Want to see what full-scale collaboration looks like?
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '0' }}>
            The <strong style={{ color: '#e2e8f0' }}>Starlight Express Pod Racing Championship</strong> brings 
            together 70+ Passionistas across 8 programmes: STEMgeneers build the drones, Silk Stilettos 
            design the livery, Kaywana's Court creates the narrative, G-Tech Casters broadcasts it, 
            Pageturners documents it, Trubble n Bass scores it, TECHreneurs monetizes it, and Auntie 
            Anansi's feeds everyone. That's £18,000-115,000 in revenue from ONE coordinated project.
          </p>
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '0.5rem',
        }}>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.7', margin: '0' }}>
            <strong style={{ color: '#e2e8f0' }}>Ready to build with a team?</strong> As a Passionista, 
            you can request Maya coordination for complex projects. Your technical excellence becomes 
            the foundation - collaboration makes it WONDERFUL.
          </p>
        </div>
      </div>
    </BaseSandbox>
  );
};

export default STEMgeneersSandbox;
