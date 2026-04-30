
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './PanelPositionPage.css';

const API_BASE = '/api';

const FIVE_LAYERS = [
  { id: 'participant',  label: 'Participant',  desc: 'Active in at least one programme. Logged sessions. Producing outputs.',        colour: '#60a5fa' },
  { id: 'contributor', label: 'Contributor',  desc: 'Supporting others. Buddy roles. Co-production. Peer witness.',                   colour: '#a78bfa' },
  { id: 'practitioner',label: 'Practitioner', desc: 'Commercial outputs live. First sale or first broadcast. Recurring activity.',    colour: '#4ade80' },
  { id: 'mentor',      label: 'Mentor',       desc: 'Brought someone else to Participant level. Facilitated a documented session.',   colour: '#d4a853' },
  { id: 'elder',       label: 'Elder',        desc: 'Sustained contribution. Cross-programme impact. Stewards Council recognition.',  colour: '#f97316' },
];

const CROSS_POLLINATION_DESC = 'Cross-pollination rate measures how often your activity touches more than one programme in the same fortnight. The target is 40%. Above 60% signals a Fellow candidate.';

const PanelPositionPage: React.FC = () => {
  const { user, token } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${API_BASE}/panel/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSummary(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  // Derive local position from localStorage sessions
  const sessions = (() => {
    try { return JSON.parse(localStorage.getItem('ww_activity_sessions') || '[]'); } catch { return []; }
  })();
  const totalMins: number = sessions.reduce((s: number, x: any) => s + (x.sessionMinutes || 0), 0);
  const uniqueProgs = new Set(sessions.map((s: any) => s.programmeSlug)).size;
  const crossPollinationRate = sessions.length > 0
    ? Math.min(Math.round((uniqueProgs / Math.max(sessions.length, 1)) * 100), 100)
    : 0;

  const currentLayer = summary?.currentLayer ||
    (totalMins >= 95 ? 'participant' : 'none');

  return (
    <div className="ppos-page">
      <div className="ppos-header">
        <h1 className="ppos-title">Your Position</h1>
        <p className="ppos-subtitle">
          Where you stand in the five-layer mutual benefit society model.
          Position is earned through documented contribution, not time served.
        </p>
      </div>

      {/* Cross-pollination rate */}
      <div className="ppos-xp-card">
        <div className="ppos-xp-header">
          <span className="ppos-xp-label">Cross-pollination rate</span>
          <span className="ppos-xp-val">{crossPollinationRate}%</span>
        </div>
        <div className="ppos-xp-bar">
          <div className="ppos-xp-fill" style={{ width: crossPollinationRate + '%' }} />
          <div className="ppos-xp-target" style={{ left: '40%' }} title="Target: 40%" />
        </div>
        <p className="ppos-xp-desc">{CROSS_POLLINATION_DESC}</p>
        <div className="ppos-xp-markers">
          <span>0%</span>
          <span style={{marginLeft:'calc(40% - 8px)'}}>40% target</span>
          <span style={{marginLeft:'calc(20% - 8px)'}}>60% Fellow</span>
        </div>
      </div>

      {/* Five layers */}
      <div className="ppos-layers">
        <h2 className="ppos-section-title">Five-layer position</h2>
        {FIVE_LAYERS.map((layer, i) => {
          const isCurrent = currentLayer === layer.id;
          const isPast = FIVE_LAYERS.findIndex(l => l.id === currentLayer) > i;
          return (
            <div
              key={layer.id}
              className={'ppos-layer' + (isCurrent ? ' current' : '') + (isPast ? ' past' : '')}
              style={{'--lc': layer.colour} as React.CSSProperties}
            >
              <div className="ppos-layer-dot" />
              <div className="ppos-layer-content">
                <div className="ppos-layer-header">
                  <span className="ppos-layer-label">{layer.label}</span>
                  {isCurrent && <span className="ppos-layer-badge">Your position</span>}
                </div>
                <p className="ppos-layer-desc">{layer.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pardner eligibility */}
      <div className="ppos-pardner">
        <h2 className="ppos-section-title">Community reserve — Pardner</h2>
        <p className="ppos-pardner-desc">
          Members who sustain £150/month average earnings for three consecutive quarters
          become eligible for the Pardner hand — the community's mutual aid reserve.
        </p>
        <div className="ppos-pardner-stats">
          <div className="ppos-pardner-stat">
            <span className="ppos-pardner-val">
              {summary?.monthlyEarningsAverage ? '£' + summary.monthlyEarningsAverage.toFixed(0) : '—'}
            </span>
            <span className="ppos-pardner-label">Monthly avg</span>
          </div>
          <div className="ppos-pardner-stat">
            <span className="ppos-pardner-val">£150</span>
            <span className="ppos-pardner-label">Threshold</span>
          </div>
          <div className="ppos-pardner-stat">
            <span className="ppos-pardner-val">
              {summary?.pardnerEligible ? 'Eligible' : 'Building'}
            </span>
            <span className="ppos-pardner-label">Status</span>
          </div>
        </div>
        <Link to="/governance" className="ppos-link">How the Pardner works →</Link>
      </div>

      {/* What full participation builds */}
      <div className="ppos-what-builds">
        <Link to="/what-you-build" className="ppos-cta">
          What full participation builds →
        </Link>
      </div>
    </div>
  );
};

export default PanelPositionPage;
