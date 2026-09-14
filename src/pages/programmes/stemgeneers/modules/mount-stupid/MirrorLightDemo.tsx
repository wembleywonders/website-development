import React, { useState } from 'react';
import styles from './mountStupid.module.css';

export default function MirrorLightDemo() {
  const [refl, setRefl] = useState(85); // reflectivity %, 50-99
  const [dist, setDist] = useState(140); // apparent-distance factor x100, 100-250

  const reflFraction = refl / 100;
  const distFactor = dist / 100;
  const reflectedFraction = reflFraction / (distFactor * distFactor);
  const totalReading = 1 + reflectedFraction;

  const ghostX = Math.min(215, 170 + (distFactor - 1) * 100 + 30);
  const ghostLabelX = Math.min(178, ghostX - 32);

  return (
    <div className={styles.panel}>
      <div className={styles.mirrorStage}>
        <svg className={styles.mirrorVisual} viewBox="0 0 220 140">
          <line x1="170" y1="10" x2="170" y2="130" stroke="#4a5568" strokeWidth={6} />
          <circle cx="70" cy="70" r="8" fill="#cfa235" />
          <circle cx={ghostX} cy="70" r="8" fill="#cfa235" opacity={0.5} />
          <text x="60" y="100" fill="#a6b0c0" fontSize="10" fontFamily="IBM Plex Mono, monospace">candle</text>
          <text x="182" y="24" fill="#a6b0c0" fontSize="10" fontFamily="IBM Plex Mono, monospace">mirror</text>
          <text x={ghostLabelX} y="100" fill="#a6b0c0" fontSize="9" fontFamily="IBM Plex Mono, monospace">reflection</text>
        </svg>
        <div className={styles.mirrorControls}>
          <div className={styles.controlLabel}>
            <span>mirror reflectivity</span>
            <span>{refl}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={99}
            value={refl}
            onChange={(e) => setRefl(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 16 }}
          />
          <div className={styles.controlLabel}>
            <span>reflection's extra distance</span>
            <span>{distFactor.toFixed(1)}&times;</span>
          </div>
          <input
            type="range"
            min={100}
            max={250}
            value={dist}
            onChange={(e) => setDist(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <div className={styles.compareRow}>
        <div className={styles.compareCard}>
          <div className={styles.compareLabel}>claimed</div>
          <div className={styles.compareNum}>2.00&times;</div>
        </div>
        <div className={styles.compareCard}>
          <div className={styles.compareLabel}>actual</div>
          <div className={styles.compareNum}>{totalReading.toFixed(2)}&times;</div>
        </div>
      </div>
      <div className={`${styles.verdict} ${styles.verdictBreaks}`}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <span>{totalReading < 1.99 ? 'the meter will always read under double' : 'approaching double, but never quite there'}</span>
      </div>
    </div>
  );
}
