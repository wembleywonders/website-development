import React, { useState } from 'react';
import styles from './mountStupid.module.css';
import type { Track } from './types';

export default function SquaringDemo({ track }: { track: Track }) {
  const [raw, setRaw] = useState(150); // slider units, /100 = n
  const n = raw / 100;
  const nSquared = n * n;
  const holds = nSquared > n;
  const isEqual = n === 1 || n === 0;

  return (
    <div className={styles.panel}>
      <div className={styles.sliderRow}>
        <input
          type="range"
          min={0}
          max={300}
          value={raw}
          onChange={(e) => setRaw(Number(e.target.value))}
          className={track === 'bright' ? styles.sliderInputBright : styles.sliderInputStem}
        />
        <div className={styles.sliderVal}>{n.toFixed(2)}</div>
      </div>
      <div className={styles.compareRow}>
        <div className={styles.compareCard}>
          <div className={styles.compareLabel}>n</div>
          <div className={styles.compareNum}>{n.toFixed(2)}</div>
        </div>
        <div className={styles.compareCard}>
          <div className={styles.compareLabel}>n&sup2;</div>
          <div className={styles.compareNum}>{nSquared.toFixed(2)}</div>
        </div>
      </div>
      <div className={`${styles.verdict} ${holds ? styles.verdictHolds : styles.verdictBreaks}`}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          {holds ? (
            <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
        </svg>
        <span>
          {isEqual
            ? 'exactly equal'
            : holds
            ? 'holds here — n² is larger'
            : 'breaks here — n² is smaller than n'}
        </span>
      </div>
      <div className={styles.fixedExample}>
        {track === 'bright' ? (
          <>Slide it below 1 and n&sup2; gets <b>smaller</b>, not bigger. Try 0.5 — you get 0.25. That's the whole claim, broken by one number.</>
        ) : (
          <>The claim breaks for any n strictly between 0 and 1. Worked example from the actual critique: <b>&radic;64 = 8</b> — the root is larger than 64, so that direction of the claim looks fine. But the same treatise's logic depends on the reverse holding everywhere too, and it doesn't: pick any fraction below 1 and squaring shrinks it. One counter-example is enough to void a universal claim — that's the whole discipline of proof by counter-example.</>
        )}
      </div>
    </div>
  );
}
