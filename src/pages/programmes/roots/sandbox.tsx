// src/pages/programmes/roots/sandbox.tsx
// Roots sandbox — placeholder until founding team session
// Will contain: Aya interactive, Apothecary formulation tools,
// Remedies database explorer, Seasonal guide navigator

import React from 'react';

const RootsSandbox: React.FC = () => {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      background: '#FAF6EE',
      textAlign: 'center',
      fontFamily: "'Source Serif 4', Georgia, serif",
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '1.8rem',
        fontWeight: 900,
        color: '#2C1810',
        margin: '0 0 1rem',
      }}>
        Roots Sandbox
      </h2>
      <p style={{ color: '#5C3D2A', maxWidth: '480px', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
        The interactive Roots tools — Aya, the Remedies Database, the Apothecary
        formulation workspace, and the Seasonal Guide Navigator — are being built
        with the founding team.
      </p>
      <p style={{ color: '#8C6E57', fontSize: '0.9rem', fontStyle: 'italic' }}>
        Launching International Women's Day, 8 March 2026.
      </p>
    </div>
  );
};

export default RootsSandbox;
