import React, { useEffect, useRef, useState } from 'react';
import { useCommunityPool } from '../../hooks/cyberstore/useCommunityPool';
import './CommunityPoolTicker.css';

interface Props { compact?: boolean; }

function formatGBP(v: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP',
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(v);
}

export const CommunityPoolTicker: React.FC<Props> = ({ compact = false }) => {
  const { total, connected } = useCommunityPool();
  const [animating, setAnimating] = useState(false);
  const prev = useRef<number>(total);

  useEffect(() => {
    if (total !== prev.current) {
      setAnimating(true);
      const t = setTimeout(() => setAnimating(false), 800);
      prev.current = total;
      return () => clearTimeout(t);
    }
  }, [total]);

  const dot = <span className={`cpt-dot ${connected ? 'cpt-dot--live' : 'cpt-dot--off'}`} />;

  if (compact) {
    return (
      <div className="cpt-compact" aria-label="Community pool total">
        {dot}
        <span className="cpt-compact-label">Community Pool</span>
        <span className={`cpt-compact-total${animating ? ' cpt-animate' : ''}`}>
          {formatGBP(total)}
        </span>
      </div>
    );
  }

  return (
    <div className="cpt-panel" aria-label="Community pool live total">
      <div className="cpt-header">
        {dot}
        <span className="cpt-header-label">
          {connected ? 'Community Pool — Live' : 'Community Pool'}
        </span>
      </div>
      <div className={`cpt-total${animating ? ' cpt-animate' : ''}`}>
        {formatGBP(total)}
      </div>
      <p className="cpt-explainer">
        25p of every pound spent on Wembley Wonders flows here —
        governed by members, not shareholders.
      </p>
      <div className="cpt-split-row">
        <div className="cpt-split-item">
          <span className="cpt-split-pct cpt-split-pct--creator">55%</span>
          <span className="cpt-split-label">Creator</span>
        </div>
        <div className="cpt-split-item">
          <span className="cpt-split-pct cpt-split-pct--pool">25%</span>
          <span className="cpt-split-label">Community</span>
        </div>
        <div className="cpt-split-item">
          <span className="cpt-split-pct cpt-split-pct--platform">20%</span>
          <span className="cpt-split-label">Platform</span>
        </div>
      </div>
      {!connected && <p className="cpt-offline">Connecting to live data...</p>}
    </div>
  );
};
