// src/components/sandboxes/rayd-yo/LiveClock.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo LiveClock
//
// The liveness marker. Not decoration — this is the thing that
// distinguishes a broadcast from a recording. Should always be visible
// wherever Rayd-yo's production tools are in use.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '1rem',
      padding: '0.875rem 1.25rem',
      background: 'rgba(220, 38, 38, 0.08)',
      border: '1px solid rgba(220, 38, 38, 0.2)',
      borderRadius: '10px',
      marginBottom: '1.5rem',
    }}>
      <span style={{
        fontFamily: 'monospace',
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#dc2626',
        letterSpacing: '0.05em',
      }}>
        {timeStr}
      </span>
      <div>
        <span style={{
          display: 'inline-block',
          background: '#dc2626',
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.15rem 0.5rem',
          borderRadius: '3px',
          letterSpacing: '0.1em',
          marginRight: '0.625rem',
        }}>
          ON AIR
        </span>
        <span style={{ fontSize: '0.825rem', color: '#94a3b8' }}>{dateStr}</span>
      </div>
    </div>
  );
};

export default LiveClock;
