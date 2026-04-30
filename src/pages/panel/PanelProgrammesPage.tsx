
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BadgeProgress from '../../components/creators-journal/BadgeProgress';
import './PanelProgrammesPage.css';

const API_BASE = '/api';

const PROGRAMME_LABELS: Record<string, string> = {
  'roots':'Roots','raydyo':'Rayd-yo','gtechcasters':'G-Tech Casters',
  'trubble-n-bass':'Trubble n Bass','joystick':'Joystick',
  'pageturners':'Pageturners','kaywanas-court':"Kaywana's Court",
  'easy-street':'Easy Street','silk-stilettos':'Silk Stilettos',
  'stemgeneers':'STEMgeneers','techreneurs':'TECHreneurs',
  'auntie-anansis-kitchen':"Auntie Anansi's Kitchen",'bright-sparks':'Bright Sparks',
};

const PROGRAMME_ROVS: Record<string, string> = {
  'gtechcasters':'📡','raydyo':'📡','joystick':'📡','easy-street':'📡',
  'trubble-n-bass':'📡','stemgeneers':'🔧','techreneurs':'💳',
  'roots':'🌿','pageturners':'🌿','auntie-anansis-kitchen':'🌿',
  'silk-stilettos':'🕸','kaywanas-court':'🕸','bright-sparks':'✨',
};

interface SessionLog {
  programmeSlug: string;
  sessionMinutes: number;
  enteredAt: number;
}

const PanelProgrammesPage: React.FC = () => {
  const { user, token } = useAuth();
  const [sessions, setSessions] = useState<SessionLog[]>([]);
  const [logging, setLogging] = useState<string | null>(null);
  const [logMinutes, setLogMinutes] = useState(30);
  const [saved, setSaved] = useState(false);

  // Load sessions from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('ww_activity_sessions');
    if (raw) {
      try { setSessions(JSON.parse(raw)); } catch {}
    }
  }, []);

  // Aggregate by programme
  const byProgramme = sessions.reduce<Record<string, number>>((acc, s) => {
    acc[s.programmeSlug] = (acc[s.programmeSlug] || 0) + (s.sessionMinutes || 0);
    return acc;
  }, {});

  const allProgrammes = Object.keys(PROGRAMME_LABELS);

  const handleLogSession = (slug: string) => {
    const newSession: SessionLog = {
      programmeSlug: slug,
      sessionMinutes: logMinutes,
      enteredAt: Date.now(),
    };
    const updated = [...sessions, newSession];
    setSessions(updated);
    localStorage.setItem('ww_activity_sessions', JSON.stringify(updated));

    // POST to backend if authenticated
    if (token) {
      fetch(`${API_BASE}/panel/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          userId: user?.id,
          programmeSlug: slug,
          sessionMinutes: logMinutes,
          activityType: 'PROGRAMME_SESSION',
        }),
      }).catch(e => console.warn('[Activity] POST failed:', e));
    }

    setLogging(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.sessionMinutes || 0), 0);
  const activeProgrammes = Object.keys(byProgramme).length;

  return (
    <div className="ppp-page">
      <div className="ppp-header">
        <h1 className="ppp-title">Your Programmes</h1>
        <p className="ppp-subtitle">
          Every session logged builds your record. Your record earns your credentials.
        </p>
      </div>

      <div className="ppp-stats">
        {[
          { val: activeProgrammes, label: 'active' },
          { val: Math.round(totalMinutes / 60 * 10) / 10 + 'h', label: 'logged' },
          { val: sessions.length, label: 'sessions' },
        ].map((s, i) => (
          <div key={i} className="ppp-stat">
            <span className="ppp-stat-val">{s.val}</span>
            <span className="ppp-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {saved && <div className="ppp-saved">Session logged ✓</div>}

      <div className="ppp-programmes">
        {allProgrammes.map(slug => {
          const mins = byProgramme[slug] || 0;
          const hours = Math.round(mins / 60 * 10) / 10;
          const isActive = mins > 0;
          return (
            <div key={slug} className={'ppp-prog' + (isActive ? ' active' : '')}>
              <div className="ppp-prog-left">
                <span className="ppp-prog-rov">{PROGRAMME_ROVS[slug]}</span>
                <div className="ppp-prog-info">
                  <span className="ppp-prog-name">{PROGRAMME_LABELS[slug]}</span>
                  {isActive && (
                    <span className="ppp-prog-time">{hours}h logged</span>
                  )}
                </div>
              </div>
              <div className="ppp-prog-right">
                {logging === slug ? (
                  <div className="ppp-log-form">
                    <select value={logMinutes} onChange={e => setLogMinutes(Number(e.target.value))}>
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>90 min</option>
                      <option value={120}>2 hours</option>
                    </select>
                    <button className="ppp-btn-save" onClick={() => handleLogSession(slug)}>Log</button>
                    <button className="ppp-btn-cancel" onClick={() => setLogging(null)}>✕</button>
                  </div>
                ) : (
                  <button className="ppp-btn-log" onClick={() => setLogging(slug)}>
                    + Log session
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="ppp-badge-section">
        <h2 className="ppp-section-title">Progress and credentials</h2>
        <BadgeProgress />
        <Link to="/creators-journal" className="ppp-link">View full record →</Link>
      </div>

      <div className="ppp-fortnightly">
        <h3>Fortnightly commitment</h3>
        <div className="ppp-commitment-bar">
          <div
            className="ppp-commitment-fill"
            style={{ width: Math.min((totalMinutes / 95) * 100, 100) + '%' }}
          />
        </div>
        <p className="ppp-commitment-label">
          {totalMinutes >= 95
            ? 'Commitment met this fortnight ✓'
            : `${95 - totalMinutes} minutes to meet your fortnightly commitment`}
        </p>
      </div>
    </div>
  );
};

export default PanelProgrammesPage;
