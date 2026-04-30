// src/components/ProofStrip.tsx
// Homepage proof strip — four numbers that answer "how you're rich"
// in the time it takes to read a sentence.
//
// Static until /api/metrics/dashboard is stable.
// When Blake fixes the 500, replace PROOF_NUMBERS with:
//   const data = await fetch('/api/metrics/dashboard').then(r => r.json())
//
// Sits between the hero and the Maya doorbell — Beat 1.5.
// Not a section. Not a feature list. Four facts and a human name.

import React from 'react';

// ─── Static proof data ───────────────────────────────────────
// TODO: replace with API call when /api/metrics/dashboard is stable
// Last verified: April 2026 — CJ Fontanelle
const PROOF_NUMBERS = {
  peopleEarning:      6,
  avgMonthlyIncome:   215,
  localPercent:       100,
  daysToFirstEarning: 14,
};

// ─── Colour tokens ───────────────────────────────────────────
const T = {
  bg:           'rgba(15, 23, 42, 0.7)',
  border:       'rgba(62, 207, 207, 0.15)',
  borderAccent: 'rgba(62, 207, 207, 0.4)',
  teal:         '#3ecfcf',
  tealDim:      'rgba(62, 207, 207, 0.7)',
  white:        '#f8fafc',
  mid:          '#cbd5e1',
  muted:        '#94a3b8',
  green:        '#86efac',
  greenBg:      'rgba(34, 197, 94, 0.1)',
};

// ─── Single stat ─────────────────────────────────────────────
interface StatProps {
  value:   string;
  label:   string;
  sub?:    string;
  accent?: boolean;
}

const Stat: React.FC<StatProps> = ({ value, label, sub, accent }) => (
  <div style={{
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '0.25rem',
    padding:        '1.25rem 1.5rem',
    flex:           '1 1 0',
    minWidth:       140,
    borderRight:    `1px solid ${T.border}`,
  }}>
    <span style={{
      fontSize:   'clamp(2rem, 4vw, 2.75rem)',
      fontWeight: 800,
      color:      accent ? T.teal : T.white,
      lineHeight: 1,
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: '-0.02em',
    }}>
      {value}
    </span>
    <span style={{
      fontSize:   '0.8rem',
      fontWeight: 700,
      color:      T.mid,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      textAlign:  'center',
    }}>
      {label}
    </span>
    {sub && (
      <span style={{
        fontSize: '0.75rem',
        color:    T.muted,
        textAlign:'center',
        lineHeight: 1.4,
      }}>
        {sub}
      </span>
    )}
  </div>
);

// ─── Component ───────────────────────────────────────────────
const ProofStrip: React.FC = () => (
  <div style={{
    background:   T.bg,
    borderTop:    `1px solid ${T.border}`,
    borderBottom: `1px solid ${T.border}`,
    backdropFilter: 'blur(12px)',
    padding:      '0 1.25rem',
  }}>
    <div style={{
      maxWidth:  1100,
      margin:    '0 auto',
    }}>

      {/* ── Four numbers ── */}
      <div style={{
        display:        'flex',
        alignItems:     'stretch',
        flexWrap:       'wrap',
        borderLeft:     `1px solid ${T.border}`,
      }}>
        <Stat
          value={`${PROOF_NUMBERS.peopleEarning}`}
          label="People earning"
          sub="who had zero income before us"
          accent
        />
        <Stat
          value={`£${PROOF_NUMBERS.avgMonthlyIncome}`}
          label="Average monthly"
          sub="income created per person"
        />
        <Stat
          value={`${PROOF_NUMBERS.localPercent}%`}
          label="From this borough"
          sub="Wembley · Brent · HA9"
          accent
        />
        <Stat
          value={`${PROOF_NUMBERS.daysToFirstEarning}`}
          label="Days to first earning"
          sub="concept to market — Fast Track"
        />
      </div>

      {/* ── Human anchor ── */}
      <div style={{
        borderTop:   `1px solid ${T.border}`,
        padding:     '0.875rem 0',
        display:     'flex',
        alignItems:  'center',
        gap:         '0.75rem',
        flexWrap:    'wrap',
      }}>
        <div style={{
          width:        6,
          height:       6,
          borderRadius: '50%',
          background:   T.teal,
          flexShrink:   0,
        }} />
        <p style={{
          margin:     0,
          fontSize:   '0.875rem',
          color:      T.mid,
          fontStyle:  'italic',
          lineHeight: 1.6,
          flex:       1,
        }}>
          Flora came to us with a degree, twenty years of invisible expertise,
          and no confidence in either. She's now our H&S Risk Management
          Event Coordinator. Her knowledge was always worth something.
          We just helped her see it.
        </p>
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '0.5rem',
          background:   T.greenBg,
          border:       '1px solid rgba(34,197,94,0.2)',
          borderRadius: 100,
          padding:      '4px 12px',
          flexShrink:   0,
        }}>
          <span style={{
            width:        6,
            height:       6,
            borderRadius: '50%',
            background:   T.green,
            display:      'inline-block',
          }} />
          <span style={{
            fontSize:   '0.75rem',
            fontWeight: 700,
            color:      T.green,
          }}>
            Real person · Wembley
          </span>
        </div>
      </div>

    </div>
  </div>
);

export default ProofStrip;
