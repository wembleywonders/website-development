// src/pages/panel/PanelStoryPage.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC — Your Story
//
// The first thing a member sees after login.
// Not a dashboard. A longitudinal portrait.
//
// Three time horizons through the 5Cs lens:
//   PAST    — what you've done, what you've contributed, what you've built
//   PRESENT — where you are now across each C, active programmes, live stats
//   FUTURE  — where you're heading, what's opening up, Maya's read of your arc
//
// Data sources:
//   AuthContext    — user identity, role, member status
//   localStorage   — activity tracker (programme sessions, cross-pollination)
//   /api/auth/me   — live user profile
//   TODO: /api/panel/summary when PanelController is built
//
// Connected to:
//   /panel/programmes  — Your Programmes (depth per programme)
//   /panel/position    — Your Position (Five Layer economics)
//   /panel/settings    — Settings & Privacy
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './PanelStoryPage.css';
import EarningsInstrument from '../../components/earnings/EarningsInstrument';
import type { CreatorCurrentMetrics, StreamId } from '../../types/earningsInstrument';

// ── Types ────────────────────────────────────────────────────────────────────

interface ActivitySession {
  programmeSlug: string;
  userId: number;
  enteredAt: number;
  exitedAt: number | null;
  sessionMinutes: number | null;
}

interface PanelStats {
  totalMinutes: number;
  uniqueProgrammes: number;
  crossPollRate: number;
  totalSessions: number;
  programmeBreakdown: Record<string, number>; // slug → minutes
  firstSessionDate: Date | null;
  lastSessionDate: Date | null;
}

// ── 5Cs definitions ──────────────────────────────────────────────────────────

const FIVE_CS = [
  {
    id: 'creativity',
    label: 'Creativity',
    icon: '🎨',
    colour: '#e85d4a',
    programmes: ['trubble-n-bass', 'silk-stilettos', 'pageturners', 'easy-street', 'joystick'],
    description: 'Making, expressing, producing',
  },
  {
    id: 'coding',
    label: 'Coding',
    icon: '⚡',
    colour: '#f4a623',
    programmes: ['stemgeneers', 'techreneurs', 'sandbox'],
    description: 'Building, programming, engineering',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    icon: '📊',
    colour: '#2ecc71',
    programmes: ['creator-factory', 'auntie-anansis-kitchen', 'community/dashboard'],
    description: 'Earning, trading, building value',
  },
  {
    id: 'community',
    label: 'Community',
    icon: '🤝',
    colour: '#3498db',
    programmes: ['houses', 'kaywanas-court', 'workshops', 'roots'],
    description: 'Connecting, contributing, belonging',
  },
  {
    id: 'culture',
    label: 'Culture',
    icon: '🌍',
    colour: '#9b59b6',
    programmes: ['knowledge-commons', 'raydyo', 'gtechcasters', 'kaywanas-court'],
    description: 'Heritage, identity, knowledge',
  },
];

// ── Programme display names ───────────────────────────────────────────────────

const PROGRAMME_NAMES: Record<string, string> = {
  'stemgeneers': 'STEMgeneers',
  'techreneurs': 'TECHreneurs',
  'pageturners': 'Pageturners',
  'gtechcasters': 'G-Tech Casters',
  'silk-stilettos': 'Silk Stilettos',
  'kaywanas-court': "Kaywana's Court",
  'easy-street': 'Easy Street',
  'trubble-n-bass': 'Trubble n Bass',
  'auntie-anansis-kitchen': "Auntie Anansi's Kitchen",
  'roots': 'Roots',
  'knowledge-commons': 'Knowledge Commons',
  'raydyo': 'Rayd-yo',
  'joystick': 'Joystick',
  'community/dashboard': 'Community Dashboard',
  'workshops': 'Workshops',
  'sandbox': 'Sandbox',
  'creator-factory': 'Creator Factory',
  'houses': 'Houses',
};

// ── Activity data from localStorage ──────────────────────────────────────────

const getActivityData = (userId?: number): PanelStats => {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('ww_activity_'));
  const allSessions: ActivitySession[] = keys
    .map(k => {
      try { return JSON.parse(localStorage.getItem(k) || '{}'); }
      catch { return null; }
    })
    .filter(Boolean)
    .filter(s => !userId || s.userId === userId);

  const completed = allSessions.filter(s => s.sessionMinutes && s.sessionMinutes > 0);
  const totalMinutes = completed.reduce((a, s) => a + (s.sessionMinutes || 0), 0);
  const uniqueProgrammes = new Set(completed.map(s => s.programmeSlug)).size;

  const programmeBreakdown: Record<string, number> = {};
  completed.forEach(s => {
    programmeBreakdown[s.programmeSlug] = (programmeBreakdown[s.programmeSlug] || 0) + (s.sessionMinutes || 0);
  });

  const byDay: Record<string, Set<string>> = {};
  completed.forEach(s => {
    const day = new Date(s.enteredAt).toDateString();
    if (!byDay[day]) byDay[day] = new Set();
    byDay[day].add(s.programmeSlug);
  });
  const crossPollRate = Object.keys(byDay).length > 0
    ? Math.round((Object.values(byDay).filter(s => s.size > 1).length / Object.keys(byDay).length) * 100)
    : 0;

  const dates = completed.map(s => s.enteredAt).sort();

  return {
    totalMinutes,
    uniqueProgrammes,
    crossPollRate,
    totalSessions: completed.length,
    programmeBreakdown,
    firstSessionDate: dates.length > 0 ? new Date(dates[0]) : null,
    lastSessionDate: dates.length > 0 ? new Date(dates[dates.length - 1]) : null,
  };
};

const fmtMinutes = (mins: number): string => {
  if (mins === 0) return '0m';
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const fmtDate = (d: Date): string =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// ── 5C strength for a given user's activity ──────────────────────────────────

const getCStrength = (
  cId: string,
  programmes: string[],
  breakdown: Record<string, number>
): number => {
  const totalMins = programmes.reduce((a, p) => a + (breakdown[p] || 0), 0);
  // Scale: 0–100 where 120 mins = full strength
  return Math.min(100, Math.round((totalMins / 120) * 100));
};

// ── Maya arc inference ────────────────────────────────────────────────────────
// Simple pattern matching on activity — replace with /api/panel/maya-arc
// when backend panel service is built.

const inferArc = (stats: PanelStats): { headline: string; detail: string; next: string } => {
  const { totalMinutes, uniqueProgrammes, crossPollRate, programmeBreakdown } = stats;

  if (totalMinutes === 0) {
    return {
      headline: 'Your story is just beginning',
      detail: 'Every journey through the platform starts with a single session. The archive is waiting for your contribution.',
      next: 'Start with Bright Sparks or try the Sandbox — no commitment, just exploration.',
    };
  }

  const topProgramme = Object.entries(programmeBreakdown)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  if (uniqueProgrammes === 1 && totalMinutes < 60) {
    return {
      headline: 'First steps taken',
      detail: `You've started in ${PROGRAMME_NAMES[topProgramme] || topProgramme}. The depth is building.`,
      next: 'Try a second programme — cross-pollination is where the real connections happen.',
    };
  }

  if (crossPollRate > 50) {
    return {
      headline: 'A connector in the making',
      detail: `You move between programmes naturally — ${crossPollRate}% of your active days involve more than one space. That's community intelligence at work.`,
      next: 'Consider taking a facilitation role — your breadth makes you valuable as a connector for others.',
    };
  }

  if (topProgramme && programmeBreakdown[topProgramme] > 120) {
    return {
      headline: `Deep practice in ${PROGRAMME_NAMES[topProgramme] || topProgramme}`,
      detail: `You're investing serious time in ${PROGRAMME_NAMES[topProgramme] || topProgramme}. That depth is the foundation of genuine expertise.`,
      next: 'Document what you\'re learning — your Creator\'s Journal turns practice into evidence.',
    };
  }

  return {
    headline: 'Your practice is taking shape',
    detail: `${uniqueProgrammes} programme${uniqueProgrammes !== 1 ? 's' : ''}, ${fmtMinutes(totalMinutes)} invested. The pattern of your interests is becoming visible.`,
    next: 'Keep going — the arc of your story only becomes clear in retrospect.',
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const PanelStoryPage: React.FC = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeHorizon, setActiveHorizon] = useState<'past' | 'present' | 'future'>('present');
  const [stats, setStats] = useState<PanelStats>({
    totalMinutes: 0,
    uniqueProgrammes: 0,
    crossPollRate: 0,
    totalSessions: 0,
    programmeBreakdown: {},
    firstSessionDate: null,
    lastSessionDate: null,
  });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/auth/login', { state: { from: { pathname: '/panel/story' } } });
    }
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    if (user) setStats(getActivityData(user.id));
  }, [user]);

  const arc = useMemo(() => inferArc(stats), [stats]);

  const fiveCSStrengths = useMemo(() =>
    FIVE_CS.map(c => ({
      ...c,
      strength: getCStrength(c.id, c.programmes, stats.programmeBreakdown),
    })),
    [stats.programmeBreakdown]
  );

  const topProgrammes = useMemo(() =>
    Object.entries(stats.programmeBreakdown)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5),
    [stats.programmeBreakdown]
  );

  if (isLoading) return (
    <div className="panel-story-loading">
      <div className="panel-loading-pulse" />
    </div>
  );

  if (!user) return null;

  const displayName = user.displayName || user.email.split('@')[0];
  const memberSince = user.createdAt ? fmtDate(new Date(user.createdAt)) : 'Founding member';

  return (
    <div className="panel-story-page">

      {/* ── PANEL NAV ────────────────────────────────────────────────────── */}
      <nav className="panel-nav">
        <div className="panel-nav-inner">
          <span className="panel-nav-label">Your Panel</span>
          <div className="panel-nav-links">
            <Link to="/panel/story"      className="panel-nav-link active">📖 Your Story</Link>
            <Link to="/panel/programmes" className="panel-nav-link">🗺️ Your Programmes</Link>
            <Link to="/panel/position"   className="panel-nav-link">📊 Your Position</Link>
          </div>
          <Link to="/panel/settings" className="panel-nav-settings">⚙️</Link>
        </div>
      </nav>

      {/* ── IDENTITY HEADER ──────────────────────────────────────────────── */}
      <header className="panel-story-header">
        <div className="panel-story-header-inner">
          <div className="panel-identity">
            <div className="panel-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="panel-identity-text">
              <h1 className="panel-identity-name">{displayName}</h1>
              <div className="panel-identity-meta">
                <span className="panel-identity-role">
                  {user.role === 'ADMIN' ? '⚡ Platform Admin' : '✓ Member'}
                </span>
                <span className="panel-identity-since">
                  {memberSince !== 'Founding member' ? `Member since ${memberSince}` : memberSince}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="panel-quick-stats">
            <div className="panel-quick-stat">
              <span className="pqs-value">{fmtMinutes(stats.totalMinutes)}</span>
              <span className="pqs-label">time invested</span>
            </div>
            <div className="panel-quick-stat">
              <span className="pqs-value">{stats.uniqueProgrammes}</span>
              <span className="pqs-label">programmes</span>
            </div>
            <div className="panel-quick-stat">
              <span className="pqs-value">{stats.crossPollRate}%</span>
              <span className="pqs-label">cross-pollination</span>
            </div>
            <div className="panel-quick-stat">
              <span className="pqs-value">{stats.totalSessions}</span>
              <span className="pqs-label">sessions</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAYA ARC ─────────────────────────────────────────────────────── */}
      <section className="panel-arc">
        <div className="panel-arc-inner">
          <div className="panel-arc-maya">
            <span className="panel-arc-maya-icon">💬</span>
            <span className="panel-arc-maya-label">Maya's read</span>
          </div>
          <div className="panel-arc-content">
            <h2 className="panel-arc-headline">{arc.headline}</h2>
            <p className="panel-arc-detail">{arc.detail}</p>
            <p className="panel-arc-next">
              <span className="panel-arc-next-label">Next →</span> {arc.next}
            </p>
          </div>
        </div>
      </section>

      {/* ── TIME HORIZON TABS ────────────────────────────────────────────── */}
      <div className="panel-horizon-tabs">
        {(['past', 'present', 'future'] as const).map(h => (
          <button
            key={h}
            className={`panel-horizon-tab ${activeHorizon === h ? 'active' : ''}`}
            onClick={() => setActiveHorizon(h)}
          >
            {h === 'past' && '◀ Past'}
            {h === 'present' && '● Present'}
            {h === 'future' && 'Future ▶'}
          </button>
        ))}
      </div>

      {/* ── PAST ─────────────────────────────────────────────────────────── */}
      {activeHorizon === 'past' && (
        <section className="panel-horizon-content panel-past">
          <div className="panel-section-header">
            <h2>What you've built</h2>
            <p>The record of your practice. This is permanent — it doesn't expire or reset.</p>
          </div>

          {stats.totalSessions === 0 ? (
            <div className="panel-empty-state">
              <p>Your history is waiting to be written.</p>
              <p>Every session you attend, every programme you visit, every workshop you contribute to — it all accumulates here.</p>
              <Link to="/programmes" className="panel-empty-cta">Explore the programmes →</Link>
            </div>
          ) : (
            <>
              {/* Programme history */}
              <div className="panel-past-programmes">
                <h3>Time invested by programme</h3>
                <div className="panel-programme-bars">
                  {topProgrammes.map(([slug, mins]) => {
                    const maxMins = topProgrammes[0]?.[1] || 1;
                    const pct = Math.round((mins / maxMins) * 100);
                    return (
                      <div key={slug} className="panel-programme-bar-row">
                        <span className="ppb-label">
                          {PROGRAMME_NAMES[slug] || slug}
                        </span>
                        <div className="ppb-track">
                          <div
                            className="ppb-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="ppb-value">{fmtMinutes(mins)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline anchors */}
              {stats.firstSessionDate && (
                <div className="panel-past-timeline">
                  <div className="panel-timeline-anchor start">
                    <span className="pta-dot" />
                    <div className="pta-content">
                      <span className="pta-label">First session</span>
                      <span className="pta-date">{fmtDate(stats.firstSessionDate)}</span>
                    </div>
                  </div>
                  {stats.lastSessionDate && stats.lastSessionDate.getTime() !== stats.firstSessionDate.getTime() && (
                    <div className="panel-timeline-anchor end">
                      <span className="pta-dot" />
                      <div className="pta-content">
                        <span className="pta-label">Most recent</span>
                        <span className="pta-date">{fmtDate(stats.lastSessionDate)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="panel-past-links">
            <Link to="/creators-journal" className="panel-past-link">
              📔 Open Creator's Journal — full documented practice →
            </Link>
          </div>
        </section>
      )}

      {/* ── PRESENT ──────────────────────────────────────────────────────── */}
      {activeHorizon === 'present' && (
        <section className="panel-horizon-content panel-present">
          <div className="panel-section-header">
            <h2>Where you are now</h2>
            <p>Your current position across the Five Cs. Strength builds through time and practice.</p>
          </div>

          {/* 5Cs radar / bar display */}
          <div className="panel-5cs">
            {fiveCSStrengths.map(c => (
              <div key={c.id} className="panel-c-card">
                <div className="pcc-header">
                  <span className="pcc-icon">{c.icon}</span>
                  <div className="pcc-title">
                    <h3>{c.label}</h3>
                    <span className="pcc-desc">{c.description}</span>
                  </div>
                  <span
                    className="pcc-strength-value"
                    style={{ color: c.colour }}
                  >
                    {c.strength}%
                  </span>
                </div>
                <div className="pcc-bar-track">
                  <div
                    className="pcc-bar-fill"
                    style={{
                      width: `${c.strength}%`,
                      backgroundColor: c.colour,
                    }}
                  />
                </div>
                {c.strength === 0 && (
                  <p className="pcc-invitation">
                    Not started — {c.programmes.slice(0, 2).map(p => PROGRAMME_NAMES[p] || p).join(' or ')} is the entry point
                  </p>
                )}
                {c.strength > 0 && c.strength < 30 && (
                  <p className="pcc-invitation">Building — keep going</p>
                )}
                {c.strength >= 30 && c.strength < 70 && (
                  <p className="pcc-invitation">Developing — real depth forming</p>
                )}
                {c.strength >= 70 && (
                  <p className="pcc-invitation">Strong — consider a facilitation role</p>
                )}
              </div>
            ))}
          </div>

          {/* Cross-pollination indicator */}
          <div className="panel-cross-poll">
            <div className="pcp-header">
              <h3>Cross-pollination rate</h3>
              <span
                className="pcp-value"
                style={{
                  color: stats.crossPollRate >= 50 ? '#2ecc71'
                    : stats.crossPollRate >= 25 ? '#f4a623'
                    : '#e85d4a'
                }}
              >
                {stats.crossPollRate}%
              </span>
            </div>
            <p className="pcp-explanation">
              The proportion of your active days where you visited more than one programme.
              This is the platform's most important community health metric — it measures
              whether you're embedded in the ecosystem or just passing through.
            </p>
            <div className="pcp-bar-track">
              <div
                className="pcp-bar-fill"
                style={{
                  width: `${stats.crossPollRate}%`,
                  backgroundColor: stats.crossPollRate >= 50 ? '#2ecc71'
                    : stats.crossPollRate >= 25 ? '#f4a623'
                    : '#6b7280'
                }}
              />
            </div>
          </div>

          {/* Quick launch */}
          <div className="panel-quick-launch">
            <h3>Continue your practice</h3>
            <div className="pql-grid">
              <Link to="/sandbox" className="pql-card">
                <span className="pql-icon">🧪</span>
                <span className="pql-label">Sandbox</span>
              </Link>
              <Link to="/community/dashboard" className="pql-card">
                <span className="pql-icon">🏛️</span>
                <span className="pql-label">Community Dashboard</span>
              </Link>
              <Link to="/programmes" className="pql-card">
                <span className="pql-icon">🚀</span>
                <span className="pql-label">All Programmes</span>
              </Link>
              <Link to="/panel/programmes" className="pql-card">
                <span className="pql-icon">🗺️</span>
                <span className="pql-label">Your Programmes</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FUTURE ───────────────────────────────────────────────────────── */}
      {activeHorizon === 'future' && (
        <section className="panel-horizon-content panel-future">
          <div className="panel-section-header">
            <h2>Where you're heading</h2>
            <p>The platform's read of your trajectory — based on your practice, not your promises.</p>
          </div>

          {/* Underdeveloped Cs */}
          <div className="panel-future-gaps">
            <h3>Cs with room to grow</h3>
            <div className="pfg-list">
              {fiveCSStrengths
                .filter(c => c.strength < 40)
                .map(c => (
                  <div key={c.id} className="pfg-item">
                    <span className="pfg-icon" style={{ color: c.colour }}>{c.icon}</span>
                    <div className="pfg-content">
                      <strong>{c.label}</strong>
                      <p>
                        Entry point:{' '}
                        <Link to={`/programmes/${c.programmes[0]}`}>
                          {PROGRAMME_NAMES[c.programmes[0]] || c.programmes[0]}
                        </Link>
                      </p>
                    </div>
                  </div>
                ))
              }
              {fiveCSStrengths.filter(c => c.strength < 40).length === 0 && (
                <p className="pfg-complete">All five Cs are developing well. You're building a balanced practice.</p>
              )}
            </div>
          </div>

          {/* Pathway signals */}
          <div className="panel-future-pathways">
            <h3>Pathways opening up</h3>
            <div className="pfp-list">
              {stats.totalMinutes === 0 ? (
                <div className="pfp-item">
                  <span className="pfp-icon">🗺️</span>
                  <div className="pfp-content">
                    <strong>Find your earning path</strong>
                    <p>Match your skills and interests to a real income route through the platform.</p>
                    <Link to="/creator-pathways" className="pfp-link">Explore pathways →</Link>
                  </div>
                </div>
              ) : (
                <>
                  {stats.crossPollRate >= 25 && (
                    <div className="pfp-item">
                      <span className="pfp-icon">🎯</span>
                      <div className="pfp-content">
                        <strong>Facilitation role</strong>
                        <p>Your cross-programme movement makes you a natural connector. Facilitation roles suit people who can hold multiple spaces at once.</p>
                        <Link to="/volunteers" className="pfp-link">See open roles →</Link>
                      </div>
                    </div>
                  )}
                  {/* ── Earnings Instrument — Commerce C ─────────── */}
                  {(() => {
                    const metrics: CreatorCurrentMetrics = {
                      totalSavingsGenerated: 0,
                      totalIncomeEarned: 0,
                      repairsLogged: 0,
                      monthlyIncomeEstimate: 0,
                      activeStreamCount: 1,
                    };
                    const activeStreams: StreamId[] = ['repair-services'];
                    return (
                      <EarningsInstrument
                        compact
                        creatorId={String(user.id)}
                        activeStreams={activeStreams}
                        currentMetrics={metrics}
                        initialTarget={800}
                      />
                    );
                  })()}

                  {fiveCSStrengths.find(c => c.id === 'commerce')?.strength === 0 && (
                    <div className="pfp-item">
                      <span className="pfp-icon">📊</span>
                      <div className="pfp-content">
                        <strong>Commerce pathway not started</strong>
                        <p>Your creative and community practice is building. The commerce layer — where your skills become income — is the natural next step.</p>
                        <Link to="/creator-factory" className="pfp-link">The Creator Factory →</Link>
                      </div>
                    </div>
                  )}
                  <div className="pfp-item">
                    <span className="pfp-icon">📖</span>
                    <div className="pfp-content">
                      <strong>Annual Creator Review</strong>
                      <p>Every year, your arc gets reviewed — what you've built, what's changed, what the platform recommends next. Your first review will be one year from your member date.</p>
                      <span className="pfp-note">Coming in Year 1</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Position teaser */}
          <div className="panel-future-position">
            <h3>Your economic position</h3>
            <p>
              The Five Layer model maps your journey from community participant to
              passive income beneficiary. See where you currently sit and what
              each layer unlocks.
            </p>
            <Link to="/panel/position" className="panel-future-position-link">
              View Your Position →
            </Link>
          </div>
        </section>
      )}

      {/* ── FOOTER NAV ───────────────────────────────────────────────────── */}
      <nav className="panel-story-footer-nav">
        <Link to="/panel/programmes" className="psfn-link">
          <span className="psfn-arrow">→</span>
          <div>
            <strong>Your Programmes</strong>
            <span>Depth indicators, active spaces, where to go next</span>
          </div>
        </Link>
        <Link to="/panel/position" className="psfn-link">
          <span className="psfn-arrow">→</span>
          <div>
            <strong>Your Position</strong>
            <span>55/25/20 earnings, Five Layer status, community reserve share</span>
          </div>
        </Link>
      </nav>

    </div>
  );
};

export default PanelStoryPage;