// src/pages/programmes/rayd-yo/sandbox.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo Sandbox
//
// Two tools in one sandbox:
//   Tab 1 — ShowPlanner: running order builder for the six confirmed shows
//   Tab 2 — JingleMaker: 30-second ident/jingle builder → Trubble n Bass brief
//
// Accessible at /programmes/rayd-yo/sandbox
// Also embedded in the Rayd-yo programme page Plan tab.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ShowPlanner from '../../../components/sandboxes/rayd-yo/ShowPlanner';
import JingleMaker from '../../../components/sandboxes/rayd-yo/JingleMaker';

type SandboxTab = 'planner' | 'jingle';

const RaydyoSandbox: React.FC = () => {
  const [activeTab, setActiveTab]   = useState<SandboxTab>('planner');
  const [showName, setShowName]     = useState('');
  const [planContext, setPlanContext] = useState('');
  const [jingleContext, setJingleContext] = useState('');

  const tabs: { key: SandboxTab; label: string; emoji: string; desc: string }[] = [
    { key: 'planner', label: 'Show Planner', emoji: '📋', desc: 'Build your running order' },
    { key: 'jingle',  label: 'Jingle Maker', emoji: '🎵', desc: '30-second ident builder' },
  ];

  // ─── RECONSTRUCTED — recovered fragments cut off before this logic ───
  // ShowPlanner's only output channel is onContextChange's string, which
  // is built as `"${selectedShow.label}" running order...`. Pull the
  // quoted show name out of that so JingleMaker's showName prop stays in
  // sync automatically, without ShowPlanner needing a second callback.
  const handlePlanContextChange = (ctx: string) => {
    setPlanContext(ctx);
    const match = ctx.match(/^"([^"]+)"/);
    if (match) setShowName(match[1]);
  };

  return (
    <div style={{
      maxWidth: '720px', margin: '0 auto',
      padding: '1.5rem',
      background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
          🔴 Rayd-yo · Studio Tools
        </p>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#f8fafc', margin: '0 0 0.5rem',
          fontFamily: 'var(--font-serif, Georgia, serif)',
        }}>
          Production Sandbox
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
          Plan your show. Build your jingle. Take the brief to Trubble n Bass.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
              padding: '0.75rem', borderRadius: '10px',
              border: activeTab === tab.key ? '1px solid #dc2626' : '1px solid rgba(100,116,139,0.2)',
              background: activeTab === tab.key ? 'rgba(220,38,38,0.1)' : 'rgba(15,23,42,0.4)',
              color: activeTab === tab.key ? '#f8fafc' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{tab.emoji}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{tab.label}</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Active tool */}
      <div style={{ marginBottom: '2rem' }}>
        {activeTab === 'planner' && (
          <ShowPlanner onContextChange={handlePlanContextChange} />
        )}
        {activeTab === 'jingle' && (
          <JingleMaker onContextChange={setJingleContext} showName={showName} />
        )}
      </div>
      {/* ─── END RECONSTRUCTED SECTION ─── */}

      {/* Related tools */}
      <div style={{ borderTop: '1px solid rgba(100,116,139,0.15)', paddingTop: '1.5rem' }}>
        <p style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Take it further
        </p>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {[
            { path: '/programmes/trubble-n-bass/sandbox', label: 'Trubble n Bass', desc: 'Produce the music bed' },
            { path: '/programmes/rayd-yo', label: 'Rayd-yo', desc: 'Back to the station' },
            { path: '/programmes/gtechcasters/sandbox', label: 'G-Tech Casters', desc: 'Podcast' },
          ].map(({ path, label, desc }) => (
            <a key={path} href={path} style={{
              display: 'block', padding: '0.6rem 0.875rem',
              background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(100,116,139,0.15)',
              borderRadius: '8px', textDecoration: 'none',
            }}>
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>{label}</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: '#475569' }}>{desc}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RaydyoSandbox;
