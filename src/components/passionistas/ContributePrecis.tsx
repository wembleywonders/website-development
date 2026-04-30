// Drop this into your PassionistasPage.tsx or PassionistasTools.tsx
// Sits naturally after the intro / welcome section, before programme listings
// Links to /about#judith-on-contribution

import React from 'react';

const PassionistasContributePrecis: React.FC = () => (
  <div
    style={{
      margin: '2rem 0',
      padding: '1.5rem 1.75rem',
      background: 'var(--color-background-secondary)',
      borderRadius: 'var(--border-radius-lg)',
      border: '0.5px solid var(--color-border-tertiary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    {/* Judith avatar + name */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'var(--color-background-info)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--color-text-info)',
          flexShrink: 0,
        }}
      >
        JF
      </div>
      <div>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          Judith Fontanelle
        </p>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-tertiary)',
            margin: 0,
          }}
        >
          Director of Community Engagement
        </p>
      </div>
    </div>

    {/* Précis */}
    <p
      style={{
        fontSize: '0.9375rem',
        lineHeight: 1.7,
        color: 'var(--color-text-primary)',
        margin: 0,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
      }}
    >
      "Feeling that your contribution is recorded — and therefore recognised —
      is not a nice-to-have. It is the difference between belonging and tolerating.
      Between staying and leaving."
    </p>

    <p
      style={{
        fontSize: '0.875rem',
        lineHeight: 1.65,
        color: 'var(--color-text-secondary)',
        margin: 0,
      }}
    >
      Everything here — every session, every creation, every connection —
      is held on the platform permanently. Not as data. As evidence of
      a life adding to something larger than itself. That is why
      the word at the centre of your membership is{' '}
      <strong style={{ color: 'var(--color-text-primary)' }}>Contribute</strong>.
    </p>

    {/* Link */}
    <a
      href="/about#judith-on-contribution"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.875rem',
        color: '#1D9E75',
        textDecoration: 'none',
        fontWeight: 500,
        alignSelf: 'flex-start',
      }}
    >
      Read Judith's full statement on contribution and recognition
      <span style={{ fontSize: '12px' }}>→</span>
    </a>
  </div>
);

export default PassionistasContributePrecis;