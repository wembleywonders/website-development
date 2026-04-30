import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMayaStore } from '../../stores/mayaStore';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

// ─────────────────────────────────────────────────────────────────────────────
// Header — Wembley Wonders CIC
//
// Change log (April 2026):
//   — isLoggedIn and user now from AuthContext (real JWT auth)
//   — "Get Involved" → "Your Panel" for authenticated members
//   — Panel summary strip: time in platform, programmes visited,
//     cross-pollination rate (localStorage activity tracker)
//   — Your Story / Your Programmes / Your Position panel routes
//   — Unauthenticated state retains participation spine under "Get Involved"
//   — Activity tracker hook logs programme entry/exit to localStorage
//     TODO: wire to POST /api/panel/activity/enter|exit when PanelController live
//   — logout() wired to AuthContext.logout()
//   — Admin badge + Admin Dashboard link visible to ADMIN role users
//   — Loading skeleton prevents flash of logged-out state on token hydration
//
// Change log (April 2026 — Easy Street update):
//   — Tagline updated to "Street made · Creators owned"
//   — Maya button renamed "Talk to Maya" with 🌟 icon
//   — Easy Street promoted to top-level nav item with full dropdown
//   — Facilitator Tools gated behind auth (logged-in members only)
//   — What's On dropdown simplified (events/calendar remain, Easy Street removed)
//   — Easy Street removed from Creator Spaces compact grid
// ─────────────────────────────────────────────────────────────────────────────

// ── Activity tracking hook ───────────────────────────────────────────────────
const PROGRAMME_SLUGS = [
  'stemgeneers','techreneurs','pageturners','gtechcasters',
  'silk-stilettos','kaywanas-court','easy-street','trubble-n-bass',
  'auntie-anansis-kitchen','roots','knowledge-commons','raydyo',
  'joystick','community/dashboard','workshops','sandbox',
  'creator-factory','houses',
];

const useActivityTracker = (isLoggedIn: boolean, userId?: number) => {
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    const slug = PROGRAMME_SLUGS.find(s => location.pathname.includes(s));
    if (!slug) return;
    const key = `ww_activity_${slug}_${Date.now()}`;
    const enteredAt = Date.now();
    localStorage.setItem(key, JSON.stringify({ programmeSlug: slug, userId, enteredAt, exitedAt: null, sessionMinutes: null }));
    // TODO: POST /api/panel/activity/enter
    return () => {
      const exitedAt = Date.now();
      const sessionMinutes = Math.round((exitedAt - enteredAt) / 60000);
      const existing = localStorage.getItem(key);
      if (existing) {
        localStorage.setItem(key, JSON.stringify({ ...JSON.parse(existing), exitedAt, sessionMinutes }));
        // TODO: POST /api/panel/activity/exit
      }
    };
  }, [location.pathname, isLoggedIn, userId]);
};

const getPanelSummary = () => {
  const sessions  = Object.keys(localStorage).filter(k => k.startsWith('ww_activity_')).map(k => JSON.parse(localStorage.getItem(k) || '{}'));
  const completed = sessions.filter(s => s.sessionMinutes && s.sessionMinutes > 0);
  const totalMinutes     = completed.reduce((a, s) => a + (s.sessionMinutes || 0), 0);
  const uniqueProgrammes = new Set(completed.map(s => s.programmeSlug)).size;
  const byDay: Record<string, Set<string>> = {};
  completed.forEach(s => { const d = new Date(s.enteredAt).toDateString(); if (!byDay[d]) byDay[d] = new Set(); byDay[d].add(s.programmeSlug); });
  const crossPollRate = Object.keys(byDay).length > 0
    ? Math.round((Object.values(byDay).filter(s => s.size > 1).length / Object.keys(byDay).length) * 100)
    : 0;
  return { totalMinutes, uniqueProgrammes, crossPollRate };
};

const fmt = (mins: number) =>
  mins === 0 ? '0m' : mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h ${mins % 60}m`;

// ─────────────────────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled]         = useState(false);
  const [panelSummary, setPanelSummary]     = useState({ totalMinutes: 0, uniqueProgrammes: 0, crossPollRate: 0 });

  const location = useLocation();
  const { isVisitorGuideActive, toggleVisitorGuide } = useMayaStore();
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  const userName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Member';
  const isAdmin  = user?.role === 'ADMIN';

  useActivityTracker(isLoggedIn, user?.id);

  useEffect(() => { if (isLoggedIn) setPanelSummary(getPanelSummary()); }, [isLoggedIn, location.pathname]);
  useEffect(() => { const h = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { setIsMenuOpen(false); setActiveDropdown(null); }, [location.pathname]);

  const toggleMenu   = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu    = () => { setIsMenuOpen(false); setActiveDropdown(null); };
  const isActive     = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/');
  const handleMaya   = () => { toggleVisitorGuide(); window.dispatchEvent(new CustomEvent('maya:open', { detail: { source: 'header' } })); };
  const handleLogout = () => { closeMenu(); logout(); };

  // Prevent flash of logged-out state while token is being hydrated
  if (isLoading) return (
    <>
      <header className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <Link to="/" className="logo-link">
              <img src="/images/ww-badge.png" alt="Wembley Wonders" className="logo-img"
                onError={e => { e.currentTarget.style.display='none'; }} />
              <div className="logo-text">
                <span className="logo-name">Wembley Wonders</span>
                {/* ── CHANGE 1: Updated tagline ── */}
                <span className="logo-tagline">Street made · Creators owned</span>
              </div>
            </Link>
          </div>
          <div className="top-bar-right"><div className="auth-loading-placeholder" /></div>
        </div>
      </header>
      <nav className="main-nav" />
    </>
  );

  return (
    <>
      {/* ══════ ROW 1: TOP BAR ══════ */}
      <header className={`top-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="top-bar-container">
          <div className="top-bar-left">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img src="/images/ww-badge.png" alt="Wembley Wonders" className="logo-img"
                onError={e => {
                  e.currentTarget.style.display='none';
                  (e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement | null)?.style &&
                  ((e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement).style.display='flex');
                }} />
              <span className="logo-fallback">🌟</span>
              <div className="logo-text">
                <span className="logo-name">Wembley Wonders</span>
                {/* ── CHANGE 1: Updated tagline ── */}
                <span className="logo-tagline">Street made · Creators owned</span>
              </div>
            </Link>
            <button className="search-button" aria-label="Search">
              <span className="search-icon">🔍</span>
              <span className="search-text">Search...</span>
            </button>
          </div>

          <div className="top-bar-right">
            {/* ── CHANGE 2: Maya button — "Talk to Maya" with 🌟 ── */}
            <button
              className={`maya-button ${isVisitorGuideActive ? 'active' : ''}`}
              onClick={handleMaya}
              aria-label="Talk to Maya"
            >
              <span className="maya-icon">🌟</span>
              <span className="maya-text">Talk to Maya</span>
              {isVisitorGuideActive && <span className="maya-active-dot" />}
            </button>

            <div className="media-links">
              <Link to="/raydyo"   className="media-link"><span className="media-icon">📻</span><span className="media-text">Listen</span></Link>
              <Link to="/joystick" className="media-link"><span className="media-icon">📰</span><span className="media-text">Read</span></Link>
            </div>

            <div className="account-section"
              onMouseEnter={() => setActiveDropdown('account')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {isLoggedIn ? (
                <button className="account-button">
                  <span className="account-icon">👤</span>
                  <span className="account-text">
                    {userName}
                    {isAdmin && <span className="admin-badge">ADMIN</span>}
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </button>
              ) : (
                <div className="auth-buttons">
                  <a
                    href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Wembley%20Wonders"
                    target="_blank" rel="noopener noreferrer"
                    className="whatsapp-button"
                  >💬</a>
                  <Link to="/login"  className="login-button">Log in</Link>
                  <Link to="/signup" className="signup-button">Join Free</Link>
                </div>
              )}

              {activeDropdown === 'account' && isLoggedIn && (
                <div className="account-dropdown">
                  <div className="account-identity-strip">
                    <span className="account-identity-name">{userName}</span>
                    <span className="account-identity-email">{user?.email}</span>
                    {user?.member && (
                      <span className="account-identity-badge">
                        {isAdmin ? '⚡ Admin' : '✓ Member'}
                      </span>
                    )}
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/panel/story"      className="dropdown-link" onClick={closeMenu}><span className="link-icon">📖</span>Your Story</Link>
                  <Link to="/panel/programmes" className="dropdown-link" onClick={closeMenu}><span className="link-icon">🗺️</span>Your Programmes</Link>
                  <Link to="/panel/position"   className="dropdown-link" onClick={closeMenu}><span className="link-icon">📊</span>Your Position</Link>
                  <div className="dropdown-divider" />
                  <Link to="/creators-journal" className="dropdown-link" onClick={closeMenu}><span className="link-icon">📔</span>Creator's Journal</Link>
                  {isAdmin && (
                    <>
                      <div className="dropdown-divider" />
                      <Link to="/admin" className="dropdown-link admin-link" onClick={closeMenu}>
                        <span className="link-icon">⚡</span>Admin Dashboard
                      </Link>
                    </>
                  )}
                  <div className="dropdown-divider" />
                  <Link to="/panel/settings" className="dropdown-link" onClick={closeMenu}><span className="link-icon">⚙️</span>Settings & Privacy</Link>
                  <button className="dropdown-link logout" onClick={handleLogout}><span className="link-icon">🚪</span>Log out</button>
                </div>
              )}
            </div>
          </div>

          <button
            className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ══════ ROW 2: MAIN NAV ══════ */}
      <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="main-nav-container">
          <ul className="nav-list">

            {/* YOUR PANEL / GET INVOLVED */}
            <li className="nav-item nav-dropdown nav-primary"
              onMouseEnter={() => setActiveDropdown('your-panel')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link nav-cta ${
                isActive('/panel')||isActive('/houses')||isActive('/community/dashboard')||
                isActive('/storage')||isActive('/workshops/signup') ? 'active' : ''
              }`}>
                <span className="nav-icon">{isLoggedIn ? '🗂️' : '🤝'}</span>
                <span>{isLoggedIn ? 'Your Panel' : 'Get Involved'}</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'your-panel' && (
                <div className="nav-dropdown-menu nav-dropdown-wide">
                  {isLoggedIn ? (
                    <>
                      <div className="panel-summary-strip">
                        <div className="panel-summary-item">
                          <span className="panel-summary-value">{fmt(panelSummary.totalMinutes)}</span>
                          <span className="panel-summary-label">time in platform</span>
                        </div>
                        <div className="panel-summary-divider" />
                        <div className="panel-summary-item">
                          <span className="panel-summary-value">{panelSummary.uniqueProgrammes}</span>
                          <span className="panel-summary-label">programmes visited</span>
                        </div>
                        <div className="panel-summary-divider" />
                        <div className="panel-summary-item">
                          <span className="panel-summary-value">{panelSummary.crossPollRate}%</span>
                          <span className="panel-summary-label">cross-pollination</span>
                        </div>
                      </div>
                      <div className="dropdown-divider" />
                      <div className="dropdown-section-label">Your account</div>
                      <Link to="/panel/story"      className="dropdown-item featured panel-story"      onClick={closeMenu}><span className="item-icon">📖</span><div className="item-content"><strong>Your Story</strong><span className="item-subtitle">Time, contributions, community connections</span></div></Link>
                      <Link to="/panel/programmes" className="dropdown-item featured panel-programmes" onClick={closeMenu}><span className="item-icon">🗺️</span><div className="item-content"><strong>Your Programmes</strong><span className="item-subtitle">Active spaces, depth indicators, where next</span></div></Link>
                      <Link to="/panel/position"   className="dropdown-item featured panel-position"   onClick={closeMenu}><span className="item-icon">📊</span><div className="item-content"><strong>Your Position</strong><span className="item-subtitle">55/25/20 earnings, Five Layer status</span></div></Link>
                      <div className="dropdown-divider" />
                      <div className="dropdown-section-label">Quick launch</div>
                      <Link to="/sandbox"             className="dropdown-item" onClick={closeMenu}><span className="item-icon">🧪</span><div className="item-content"><strong>Sandbox</strong><span className="item-subtitle">Continue where you left off</span></div></Link>
                      <Link to="/community/dashboard" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🏛️</span><div className="item-content"><strong>Community Dashboard</strong><span className="item-subtitle">Fund status, proposals, open roles</span></div></Link>
                      {isAdmin && (
                        <>
                          <div className="dropdown-divider" />
                          <Link to="/admin" className="dropdown-item admin-panel-link" onClick={closeMenu}>
                            <span className="item-icon">⚡</span>
                            <div className="item-content"><strong>Admin Dashboard</strong><span className="item-subtitle">Programme health, foot traffic, member metrics</span></div>
                          </Link>
                        </>
                      )}
                      <div className="dropdown-divider" />
                      <Link to="/panel/settings" className="dropdown-item" onClick={closeMenu}><span className="item-icon">⚙️</span><div className="item-content"><strong>Settings & Privacy</strong><span className="item-subtitle">Control what you share and with whom</span></div></Link>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-section-label">Find your House</div>
                      <Link to="/houses/connoisseurs" className="dropdown-item featured connoisseurs-featured" onClick={closeMenu}><span className="item-icon">🎩</span><div className="item-content"><strong>Connoisseurs Club</strong><span className="item-subtitle">Curators, strategists, standard-setters</span></div></Link>
                      <Link to="/houses/passionistas" className="dropdown-item featured passionistas-featured" onClick={closeMenu}><span className="item-icon">💃</span><div className="item-content"><strong>Passionistas Fan Club</strong><span className="item-subtitle">Amplifiers, connectors, cultural drivers</span></div></Link>
                      <div className="dropdown-divider" />
                      <div className="dropdown-section-label">Join a session</div>
                      <Link to="/workshops/signup" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🛠️</span><div className="item-content"><strong>Workshops</strong><span className="item-subtitle">Next session — pick a role before you arrive</span></div></Link>
                      <Link to="/sessions"         className="dropdown-item" onClick={closeMenu}><span className="item-icon">💻</span><div className="item-content"><strong>Zoom Sessions</strong><span className="item-subtitle">Weekly programme sessions</span></div></Link>
                      <div className="dropdown-divider" />
                      <div className="dropdown-section-label">The system</div>
                      <Link to="/community/dashboard" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🏛️</span><div className="item-content"><strong>Community Dashboard</strong><span className="item-subtitle">Fund status, active proposals, open roles</span></div></Link>
                      <Link to="/storage"             className="dropdown-item" onClick={closeMenu}><span className="item-icon">📦</span><div className="item-content"><strong>Storage & Services</strong><span className="item-subtitle">Affordable shared storage for creators</span></div></Link>
                      <Link to="/volunteers"          className="dropdown-item" onClick={closeMenu}><span className="item-icon">🤝</span><div className="item-content"><strong>Volunteer</strong><span className="item-subtitle">Roles available now — all levels welcome</span></div></Link>
                      <div className="dropdown-divider" />
                      <Link to="/sandbox" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🧪</span><div className="item-content"><strong>Try the Sandbox</strong><span className="item-subtitle">Explore the tools — no sign-up needed</span></div></Link>
                      <div className="dropdown-divider" />
                      <div className="panel-join-prompt">
                        <p className="panel-join-text">Join free to unlock Your Panel — track your time, growth, and earnings across every programme.</p>
                        <Link to="/signup" className="panel-join-cta" onClick={closeMenu}>Create your account →</Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>

            {/* ── CHANGE 3: EASY STREET — promoted to top-level nav ── */}
            <li className="nav-item nav-dropdown nav-easy-street"
              onMouseEnter={() => setActiveDropdown('easy-street')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link nav-easy-street-btn ${isActive('/programmes/easy-street') || isActive('/easy-street') ? 'active' : ''}`}>
                <span className="nav-icon">🎬</span>
                <span>Easy Street</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'easy-street' && (
                <div className="nav-dropdown-menu nav-dropdown-wide">
                  {/* Hero — latest episode */}
                  <Link to="/programmes/easy-street" className="dropdown-item featured easy-street-hero" onClick={closeMenu}>
                    <span className="item-icon">🎬</span>
                    <div className="item-content">
                      <strong>Watch Easy Street</strong>
                      <span className="item-subtitle">The street where the community tells its own story</span>
                    </div>
                    <span className="new-badge">LIVE</span>
                  </Link>
                  <div className="dropdown-divider" />
                  <div className="dropdown-section-label">The world</div>
                  <Link to="/programmes/easy-street/sandbox"  className="dropdown-item" onClick={closeMenu}><span className="item-icon">✍️</span><div className="item-content"><strong>Write a Scene</strong><span className="item-subtitle">The writing room is open — your name on the broadcast</span></div></Link>
                  <Link to="/programmes/easy-street/fan-tv"   className="dropdown-item" onClick={closeMenu}><span className="item-icon">📹</span><div className="item-content"><strong>Wembley Wanderers Fan TV</strong><span className="item-subtitle">Robbie, Micha, Troops and Ty — post-match at the Pole</span></div></Link>
                  <Link to="/raydyo"                          className="dropdown-item" onClick={closeMenu}><span className="item-icon">📻</span><div className="item-content"><strong>Easy Street Radio</strong><span className="item-subtitle">The broadcast from Auntie Jenny's — live on Rayd-yo</span></div></Link>
                  <div className="dropdown-divider" />
                  <div className="dropdown-section-label">Make it with us</div>
                  <Link to="/programmes/pageturners"  className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">✍️</span><strong>Write</strong><span className="item-subtitle-inline"> — Pageturners</span></Link>
                  <Link to="/programmes/gtechcasters" className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎙️</span><strong>Produce</strong><span className="item-subtitle-inline"> — G-Tech Casters</span></Link>
                  <Link to="/programmes/trubble-n-bass" className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎵</span><strong>Score</strong><span className="item-subtitle-inline"> — Trubble n Bass</span></Link>
                  <Link to="/programmes/kaywanas-court" className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎭</span><strong>Perform</strong><span className="item-subtitle-inline"> — Kaywana's Court</span></Link>
                  <Link to="/programmes/silk-stilettos" className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎨</span><strong>Design</strong><span className="item-subtitle-inline"> — Silk Stilettos</span></Link>
                  <div className="dropdown-divider" />
                  <Link to="/joystick" className="dropdown-item" onClick={closeMenu}><span className="item-icon">📰</span><div className="item-content"><strong>Joystick Coverage</strong><span className="item-subtitle">Reviews, behind-the-scenes, episode archive</span></div></Link>
                </div>
              )}
            </li>

            {/* WHAT'S ON — Easy Street removed, calendar/events remain */}
            <li className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('whats-on')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">📅</span>
                <span>What's On</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'whats-on' && (
                <div className="nav-dropdown-menu">
                  <Link to="/editorial/iwd-2026" className="dropdown-item featured iwd-featured" onClick={closeMenu}>
                    <span className="item-icon">✊🏿</span>
                    <div className="item-content"><strong>Women's Voices — IWD 2026</strong><span className="item-subtitle">Community responses to International Women's Day</span></div>
                    <span className="new-badge">NOW</span>
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/calendar"  className="dropdown-item" onClick={closeMenu}><span className="item-icon">📆</span><div className="item-content"><strong>Calendar</strong><span className="item-subtitle">All events & activities</span></div></Link>
                  <Link to="/workshops" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🛠️</span><div className="item-content"><strong>Workshops</strong><span className="item-subtitle">Hands-on skill sessions</span></div></Link>
                  <Link to="/sessions"  className="dropdown-item" onClick={closeMenu}><span className="item-icon">💻</span><div className="item-content"><strong>Zoom Sessions</strong><span className="item-subtitle">Weekly programme sessions</span></div></Link>
                  <Link to="/events"    className="dropdown-item" onClick={closeMenu}><span className="item-icon">🎉</span><div className="item-content"><strong>Events</strong><span className="item-subtitle">Showcases & celebrations</span></div></Link>
                  <div className="dropdown-divider" />
                  <Link to="/raydyo"    className="dropdown-item featured" onClick={closeMenu}><span className="item-icon">📻</span><div className="item-content"><strong>Rayd-yo Live</strong><span className="item-subtitle">Community radio — always on</span></div></Link>
                </div>
              )}
            </li>

            {/* CREATOR SPACES — Easy Street removed from grid */}
            <li className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('creator-spaces')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">🚀</span>
                <span>Creator Spaces</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'creator-spaces' && (
                <div className="nav-dropdown-menu nav-dropdown-wide">
                  <Link to="/creator-factory"          className="dropdown-item featured factory-featured"   onClick={closeMenu}><span className="item-icon">🏭</span><div className="item-content"><strong>The Creator Factory</strong><span className="item-subtitle">Ideas go in. Income comes out.</span></div><span className="new-badge">NEW</span></Link>
                  <Link to="/programmes/bright-sparks" className="dropdown-item bright-sparks-featured"      onClick={closeMenu}><span className="item-icon">✨</span><div className="item-content"><strong>Bright Sparks</strong><span className="item-subtitle">Not sure where to start? Begin here.</span></div></Link>
                  <Link to="/creator-pathways" state={{ mayaIntent: 'pathway' }} className="dropdown-item pathway-featured" onClick={closeMenu}><span className="item-icon">🗺️</span><div className="item-content"><strong>Find your earning path</strong><span className="item-subtitle">Match your skills to a real income route</span></div></Link>
                  <div className="dropdown-divider" />
                  {/*
                    ── Easy Street removed from this grid.
                       It now has its own top-level nav item.
                       Remaining nine programmes listed below.
                  */}
                  <div className="dropdown-grid">
                    <Link to="/programmes/stemgeneers"            className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">⚡</span><strong>STEMgeneers</strong></Link>
                    <Link to="/programmes/techreneurs"            className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">💻</span><strong>TECHreneurs</strong></Link>
                    <Link to="/programmes/pageturners"            className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">✍️</span><strong>Pageturners</strong></Link>
                    <Link to="/programmes/gtechcasters"           className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎙️</span><strong>G-Tech Casters</strong></Link>
                    <Link to="/programmes/silk-stilettos"         className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎨</span><strong>Silk Stilettos</strong></Link>
                    <Link to="/programmes/kaywanas-court"         className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎭</span><strong>Kaywana's Court</strong></Link>
                    <Link to="/programmes/trubble-n-bass"         className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🎵</span><strong>Trubble n Bass</strong></Link>
                    <Link to="/programmes/auntie-anansis-kitchen" className="dropdown-item compact" onClick={closeMenu}><span className="item-icon">🍲</span><strong>Auntie Anansi's Kitchen</strong></Link>
                    <Link to="/programmes/roots"                  className="dropdown-item compact roots-nav" onClick={closeMenu}><span className="item-icon">🌿</span><strong>Roots</strong></Link>
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-footer-links">
                    <Link to="/programmes"       className="dropdown-item view-all"           onClick={closeMenu}>View all programmes →</Link>
                    <Link to="/creator-pathways" state={{ mayaIntent: 'pathway' }} className="dropdown-item view-all secondary" onClick={closeMenu}>Find your earning path →</Link>
                  </div>
                </div>
              )}
            </li>

            {/* ── CHANGE 4: FACILITATOR TOOLS — auth-gated (logged-in only) ── */}
            {isLoggedIn && (
              <li className="nav-item nav-dropdown"
                onMouseEnter={() => setActiveDropdown('facilitator-tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`nav-link ${
                  isActive('/workshops/spark-generator') || isActive('/workshops/facilitation') ? 'active' : ''
                }`}>
                  <span className="nav-icon">⚡</span>
                  <span>Facilitator Tools</span>
                  <span className="nav-arrow">▼</span>
                </button>
                {activeDropdown === 'facilitator-tools' && (
                  <div className="nav-dropdown-menu">
                    <Link to="/workshops/spark-generator" className="dropdown-item featured" onClick={closeMenu}><span className="item-icon">🎯</span><div className="item-content"><strong>Spark Generator</strong><span className="item-subtitle">Zoom warm-up prompts for every programme</span></div></Link>
                    <Link to="/workshops/facilitation"    className="dropdown-item"          onClick={closeMenu}><span className="item-icon">📋</span><div className="item-content"><strong>Facilitation Guides</strong><span className="item-subtitle">Week-by-week session plans</span></div></Link>
                    <Link to="/sessions"                  className="dropdown-item"          onClick={closeMenu}><span className="item-icon">📅</span><div className="item-content"><strong>Sessions Schedule</strong><span className="item-subtitle">Upcoming Zoom sessions with quick links</span></div></Link>
                    <div className="dropdown-divider" />
                    <Link to="/sandbox"   className="dropdown-item" onClick={closeMenu}><span className="item-icon">🧪</span><div className="item-content"><strong>Sandbox Challenges</strong><span className="item-subtitle">Interactive activities for applied tasks</span></div></Link>
                    <Link to="/downloads" className="dropdown-item" onClick={closeMenu}><span className="item-icon">📥</span><div className="item-content"><strong>Downloads</strong><span className="item-subtitle">Worksheets & resources</span></div></Link>
                  </div>
                )}
              </li>
            )}

            {/* OUR WORK */}
            <li className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('our-work')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link ${
                isActive('/manifesto')||isActive('/knowledge-commons')||
                isActive('/editorial-standards')||isActive('/impact') ? 'active' : ''
              }`}>
                <span className="nav-icon">◆</span>
                <span>Our Work</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'our-work' && (
                <div className="nav-dropdown-menu nav-dropdown-wide">
                  <Link to="/manifesto" className="dropdown-item featured manifesto-featured" onClick={closeMenu}><span className="item-icon">◆</span><div className="item-content"><strong>The Wembley Wonders Manifesto</strong><span className="item-subtitle">What we are building and why. Read this first.</span></div></Link>
                  <div className="dropdown-divider" />
                  <Link to="/knowledge-commons"  className="dropdown-item" onClick={closeMenu}><span className="item-icon">🗂️</span><div className="item-content"><strong>Knowledge Commons</strong><span className="item-subtitle">The counter-archive. Assembled, not generated.</span></div></Link>
                  <Link to="/editorial-standard" className="dropdown-item" onClick={closeMenu}><span className="item-icon">📐</span><div className="item-content"><strong>Our Editorial Standard</strong><span className="item-subtitle">The six-question framework.</span></div></Link>
                  <Link to="/joystick"           className="dropdown-item" onClick={closeMenu}><span className="item-icon">📰</span><div className="item-content"><strong>Joystick</strong><span className="item-subtitle">The community e-zine.</span></div></Link>
                  <Link to="/raydyo"             className="dropdown-item" onClick={closeMenu}><span className="item-icon">📻</span><div className="item-content"><strong>Rayd-yo</strong><span className="item-subtitle">Community radio. Call-and-response as broadcast structure.</span></div></Link>
                  <div className="dropdown-divider" />
                  <Link to="/impact"       className="dropdown-item" onClick={closeMenu}><span className="item-icon">📊</span><div className="item-content"><strong>Our Impact</strong><span className="item-subtitle">What the platform has produced and who it has reached.</span></div></Link>
                  <Link to="/how-it-works" className="dropdown-item" onClick={closeMenu}><span className="item-icon">⚖️</span><div className="item-content"><strong>The 55/25/20 Model</strong><span className="item-subtitle">How creators own the economy they build.</span></div></Link>
                </div>
              )}
            </li>

            {/* WHO WE ARE */}
            <li className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('who-we-are')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">👥</span>
                <span>Who We Are</span>
                <span className="nav-arrow">▼</span>
              </button>
              {activeDropdown === 'who-we-are' && (
                <div className="nav-dropdown-menu">
                  <Link to="/about"      className="dropdown-item" onClick={closeMenu}><span className="item-icon">📖</span><div className="item-content"><strong>Our Story</strong><span className="item-subtitle">How Wembley Wonders began</span></div></Link>
                  <Link to="/team"       className="dropdown-item" onClick={closeMenu}><span className="item-icon">👋</span><div className="item-content"><strong>The Team</strong><span className="item-subtitle">Meet the people behind it</span></div></Link>
                  <div className="dropdown-divider" />
                  <Link to="/volunteers" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🤝</span><div className="item-content"><strong>Volunteer</strong><span className="item-subtitle">Join our team</span></div></Link>
                  <Link to="/contact"    className="dropdown-item" onClick={closeMenu}><span className="item-icon">💬</span><div className="item-content"><strong>Contact</strong><span className="item-subtitle">Get in touch</span></div></Link>
                  <div className="dropdown-divider" />
                  <Link to="/governance" className="dropdown-item" onClick={closeMenu}><span className="item-icon">🏛️</span><div className="item-content"><strong>Governance</strong><span className="item-subtitle">Reserve, Pardner, Stewards Council</span></div></Link>
                </div>
              )}
            </li>

            {/* SHOP */}
            <li className="nav-item">
              <Link to="/shop" className={`nav-link nav-shop ${isActive('/shop') ? 'active' : ''}`} onClick={closeMenu}>
                <span className="nav-icon">🛒</span>
                <span>Shop</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ══════ MOBILE NAV ══════ */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-cta-section">
            {isLoggedIn
              ? <Link to="/panel/story" className="mobile-cta-button mobile-cta-panel" onClick={closeMenu}>🗂️ Your Panel — Story, Programmes, Position</Link>
              : <Link to="/houses"      className="mobile-cta-button"                  onClick={closeMenu}>🤝 Get Involved — Find Your House</Link>
            }
          </div>

          <div className="mobile-quick-section">
            {/* ── CHANGE 2 (mobile): Talk to Maya with 🌟 ── */}
            <button
              className={`mobile-maya-btn ${isVisitorGuideActive ? 'active' : ''}`}
              onClick={() => { handleMaya(); closeMenu(); }}
            >
              🌟 Talk to Maya {isVisitorGuideActive && '(Active)'}
            </button>
          </div>

          {isLoggedIn && (
            <div className="mobile-panel-summary">
              <div className="mobile-panel-stat"><span className="mobile-panel-value">{fmt(panelSummary.totalMinutes)}</span><span className="mobile-panel-label">in platform</span></div>
              <div className="mobile-panel-stat"><span className="mobile-panel-value">{panelSummary.uniqueProgrammes}</span><span className="mobile-panel-label">programmes</span></div>
              <div className="mobile-panel-stat"><span className="mobile-panel-value">{panelSummary.crossPollRate}%</span><span className="mobile-panel-label">cross-pollination</span></div>
            </div>
          )}

          <div className="mobile-manifesto-section">
            <Link to="/manifesto" className="mobile-manifesto-btn" onClick={closeMenu}>
              <span className="mobile-manifesto-mark">◆</span>
              The Wembley Wonders Manifesto
              <span className="mobile-manifesto-subtitle">What we are building and why</span>
            </Link>
          </div>

          {/* ── CHANGE 3 (mobile): Easy Street featured section ── */}
          <div className="mobile-easy-street-section">
            <Link to="/programmes/easy-street" className="mobile-easy-street-btn" onClick={closeMenu}>
              🎬 Easy Street
              <span className="mobile-easy-street-subtitle">Street made · Creators owned</span>
            </Link>
          </div>

          <div className="mobile-factory-section">
            <Link to="/creator-factory" className="mobile-factory-btn" onClick={closeMenu}>
              🏭 The Creator Factory
              <span className="mobile-factory-subtitle">Ideas → Income Pipeline</span>
            </Link>
          </div>

          <div className="mobile-media-section">
            <h3 className="mobile-section-title">Community Media</h3>
            <Link to="/raydyo"   className="mobile-media-btn raydyo"   onClick={closeMenu}>📻 Listen — Rayd-yo</Link>
            <Link to="/joystick" className="mobile-media-btn joystick" onClick={closeMenu}>📰 Read — Joystick</Link>
          </div>

          <div className="mobile-account-section">
            <h3 className="mobile-section-title">Account</h3>
            {isLoggedIn ? (
              <>
                <div className="mobile-account-identity">
                  <span className="mobile-account-name">{userName}</span>
                  {isAdmin && <span className="mobile-admin-badge">ADMIN</span>}
                </div>
                <Link to="/panel/story"      className="mobile-nav-link" onClick={closeMenu}>📖 Your Story</Link>
                <Link to="/panel/programmes" className="mobile-nav-link" onClick={closeMenu}>🗺️ Your Programmes</Link>
                <Link to="/panel/position"   className="mobile-nav-link" onClick={closeMenu}>📊 Your Position</Link>
                <Link to="/creators-journal" className="mobile-nav-link" onClick={closeMenu}>📔 Creator's Journal</Link>
                {isAdmin && <Link to="/admin" className="mobile-nav-link admin-link" onClick={closeMenu}>⚡ Admin Dashboard</Link>}
                <Link to="/panel/settings"   className="mobile-nav-link" onClick={closeMenu}>⚙️ Settings & Privacy</Link>
                <button className="mobile-nav-link logout" onClick={handleLogout}>🚪 Log out</button>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login"  className="mobile-login-btn"  onClick={closeMenu}>Log in</Link>
                <Link to="/signup" className="mobile-signup-btn" onClick={closeMenu}>Join Free</Link>
              </div>
            )}
          </div>

          <div className="mobile-main-section">
            <h3 className="mobile-section-title">Explore</h3>

            {/* Panel / Get Involved */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn mobile-expand-btn--get-involved"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-panel' ? null : 'mobile-panel')}>
                {isLoggedIn ? '🗂️ Your Panel' : '🤝 Get Involved'} {activeDropdown === 'mobile-panel' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-panel' && (
                <div className="mobile-submenu">
                  {isLoggedIn ? (
                    <>
                      <div className="mobile-submenu-label">Your account</div>
                      <Link to="/panel/story"      className="mobile-nav-link sub featured" onClick={closeMenu}>📖 Your Story</Link>
                      <Link to="/panel/programmes" className="mobile-nav-link sub featured" onClick={closeMenu}>🗺️ Your Programmes</Link>
                      <Link to="/panel/position"   className="mobile-nav-link sub featured" onClick={closeMenu}>📊 Your Position</Link>
                      <div className="mobile-submenu-divider" />
                      <div className="mobile-submenu-label">Quick launch</div>
                      <Link to="/sandbox"             className="mobile-nav-link sub" onClick={closeMenu}>🧪 Sandbox</Link>
                      <Link to="/community/dashboard" className="mobile-nav-link sub" onClick={closeMenu}>🏛️ Community Dashboard</Link>
                      {isAdmin && <Link to="/admin" className="mobile-nav-link sub admin-link" onClick={closeMenu}>⚡ Admin Dashboard</Link>}
                      <div className="mobile-submenu-divider" />
                      <Link to="/panel/settings" className="mobile-nav-link sub" onClick={closeMenu}>⚙️ Settings & Privacy</Link>
                    </>
                  ) : (
                    <>
                      <div className="mobile-submenu-label">Find your House</div>
                      <Link to="/houses/connoisseurs" className="mobile-nav-link sub featured" onClick={closeMenu}>🎩 Connoisseurs Club</Link>
                      <Link to="/houses/passionistas" className="mobile-nav-link sub featured" onClick={closeMenu}>💃 Passionistas Fan Club</Link>
                      <div className="mobile-submenu-divider" />
                      <div className="mobile-submenu-label">Join a session</div>
                      <Link to="/workshops/signup" className="mobile-nav-link sub" onClick={closeMenu}>🛠️ Workshops</Link>
                      <Link to="/sessions"         className="mobile-nav-link sub" onClick={closeMenu}>💻 Zoom Sessions</Link>
                      <div className="mobile-submenu-divider" />
                      <Link to="/community/dashboard" className="mobile-nav-link sub" onClick={closeMenu}>🏛️ Community Dashboard</Link>
                      <Link to="/storage"             className="mobile-nav-link sub" onClick={closeMenu}>📦 Storage & Services</Link>
                      <Link to="/volunteers"          className="mobile-nav-link sub" onClick={closeMenu}>🤝 Volunteer</Link>
                      <div className="mobile-submenu-divider" />
                      <Link to="/sandbox" className="mobile-nav-link sub"          onClick={closeMenu}>🧪 Try the Sandbox</Link>
                      <Link to="/signup"  className="mobile-nav-link sub featured" onClick={closeMenu}>✨ Join free — unlock Your Panel</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ── CHANGE 3 (mobile expandable): Easy Street ── */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn mobile-expand-btn--easy-street"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-easy-street' ? null : 'mobile-easy-street')}>
                🎬 Easy Street {activeDropdown === 'mobile-easy-street' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-easy-street' && (
                <div className="mobile-submenu">
                  <Link to="/programmes/easy-street"          className="mobile-nav-link sub featured" onClick={closeMenu}>🎬 Watch Easy Street</Link>
                  <Link to="/programmes/easy-street/sandbox"  className="mobile-nav-link sub"          onClick={closeMenu}>✍️ Write a Scene</Link>
                  <Link to="/programmes/easy-street/fan-tv"   className="mobile-nav-link sub"          onClick={closeMenu}>📹 Wembley Wanderers Fan TV</Link>
                  <Link to="/raydyo"                          className="mobile-nav-link sub"          onClick={closeMenu}>📻 Easy Street Radio</Link>
                  <div className="mobile-submenu-divider" />
                  <div className="mobile-submenu-label">Make it with us</div>
                  <Link to="/programmes/pageturners"    className="mobile-nav-link sub" onClick={closeMenu}>✍️ Write — Pageturners</Link>
                  <Link to="/programmes/gtechcasters"   className="mobile-nav-link sub" onClick={closeMenu}>🎙️ Produce — G-Tech Casters</Link>
                  <Link to="/programmes/trubble-n-bass" className="mobile-nav-link sub" onClick={closeMenu}>🎵 Score — Trubble n Bass</Link>
                  <Link to="/programmes/kaywanas-court" className="mobile-nav-link sub" onClick={closeMenu}>🎭 Perform — Kaywana's Court</Link>
                  <Link to="/programmes/silk-stilettos" className="mobile-nav-link sub" onClick={closeMenu}>🎨 Design — Silk Stilettos</Link>
                  <div className="mobile-submenu-divider" />
                  <Link to="/joystick" className="mobile-nav-link sub" onClick={closeMenu}>📰 Joystick Coverage</Link>
                </div>
              )}
            </div>

            {/* What's On */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-whats-on' ? null : 'mobile-whats-on')}>
                📅 What's On {activeDropdown === 'mobile-whats-on' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-whats-on' && (
                <div className="mobile-submenu">
                  <Link to="/editorial/iwd-2026" className="mobile-nav-link sub featured iwd" onClick={closeMenu}>✊🏿 Women's Voices — IWD 2026</Link>
                  <div className="mobile-submenu-divider" />
                  <Link to="/calendar"  className="mobile-nav-link sub" onClick={closeMenu}>📆 Calendar</Link>
                  <Link to="/workshops" className="mobile-nav-link sub" onClick={closeMenu}>🛠️ Workshops</Link>
                  <Link to="/sessions"  className="mobile-nav-link sub" onClick={closeMenu}>💻 Zoom Sessions</Link>
                  <Link to="/events"    className="mobile-nav-link sub" onClick={closeMenu}>🎉 Events</Link>
                  <div className="mobile-submenu-divider" />
                  <Link to="/raydyo"    className="mobile-nav-link sub" onClick={closeMenu}>📻 Rayd-yo Live</Link>
                </div>
              )}
            </div>

            {/* Creator Spaces */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-spaces' ? null : 'mobile-spaces')}>
                🚀 Creator Spaces {activeDropdown === 'mobile-spaces' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-spaces' && (
                <div className="mobile-submenu">
                  <Link to="/creator-factory"          className="mobile-nav-link sub featured factory" onClick={closeMenu}>🏭 The Creator Factory <span className="mobile-new-badge">NEW</span></Link>
                  <Link to="/programmes/bright-sparks" className="mobile-nav-link sub featured"        onClick={closeMenu}>✨ Bright Sparks — Start Here</Link>
                  <Link to="/creator-pathways" state={{ mayaIntent: 'pathway' }} className="mobile-nav-link sub featured pathway" onClick={closeMenu}>🗺️ Find your earning path</Link>
                  <div className="mobile-submenu-divider" />
                  {/* Easy Street removed — has its own expandable above */}
                  <Link to="/programmes/stemgeneers"            className="mobile-nav-link sub" onClick={closeMenu}>⚡ STEMgeneers</Link>
                  <Link to="/programmes/techreneurs"            className="mobile-nav-link sub" onClick={closeMenu}>💻 TECHreneurs</Link>
                  <Link to="/programmes/pageturners"            className="mobile-nav-link sub" onClick={closeMenu}>✍️ Pageturners</Link>
                  <Link to="/programmes/gtechcasters"           className="mobile-nav-link sub" onClick={closeMenu}>🎙️ G-Tech Casters</Link>
                  <Link to="/programmes/silk-stilettos"         className="mobile-nav-link sub" onClick={closeMenu}>🎨 Silk Stilettos</Link>
                  <Link to="/programmes/kaywanas-court"         className="mobile-nav-link sub" onClick={closeMenu}>🎭 Kaywana's Court</Link>
                  <Link to="/programmes/trubble-n-bass"         className="mobile-nav-link sub" onClick={closeMenu}>🎵 Trubble n Bass</Link>
                  <Link to="/programmes/auntie-anansis-kitchen" className="mobile-nav-link sub" onClick={closeMenu}>🍲 Auntie Anansi's Kitchen</Link>
                  <Link to="/programmes/roots"                  className="mobile-nav-link sub" onClick={closeMenu}>🌿 Roots</Link>
                  <div className="mobile-submenu-divider" />
                  <Link to="/programmes"       className="mobile-nav-link sub view-all"           onClick={closeMenu}>View all programmes →</Link>
                  <Link to="/creator-pathways" state={{ mayaIntent: 'pathway' }} className="mobile-nav-link sub view-all secondary" onClick={closeMenu}>Find your earning path →</Link>
                </div>
              )}
            </div>

            {/* ── CHANGE 4 (mobile): Facilitator Tools — auth-gated ── */}
            {isLoggedIn && (
              <div className="mobile-expandable">
                <button className="mobile-expand-btn"
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-facilitator' ? null : 'mobile-facilitator')}>
                  ⚡ Facilitator Tools {activeDropdown === 'mobile-facilitator' ? '▲' : '▼'}
                </button>
                {activeDropdown === 'mobile-facilitator' && (
                  <div className="mobile-submenu">
                    <Link to="/workshops/spark-generator" className="mobile-nav-link sub featured" onClick={closeMenu}>🎯 Spark Generator</Link>
                    <Link to="/workshops/facilitation"    className="mobile-nav-link sub"          onClick={closeMenu}>📋 Facilitation Guides</Link>
                    <Link to="/sessions"                  className="mobile-nav-link sub"          onClick={closeMenu}>📅 Sessions Schedule</Link>
                    <div className="mobile-submenu-divider" />
                    <Link to="/sandbox"   className="mobile-nav-link sub" onClick={closeMenu}>🧪 Sandbox Challenges</Link>
                    <Link to="/downloads" className="mobile-nav-link sub" onClick={closeMenu}>📥 Downloads</Link>
                  </div>
                )}
              </div>
            )}

            {/* Our Work */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn mobile-expand-btn--work"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-our-work' ? null : 'mobile-our-work')}>
                ◆ Our Work {activeDropdown === 'mobile-our-work' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-our-work' && (
                <div className="mobile-submenu">
                  <Link to="/manifesto"          className="mobile-nav-link sub featured" onClick={closeMenu}>◆ The Manifesto</Link>
                  <Link to="/knowledge-commons"  className="mobile-nav-link sub"          onClick={closeMenu}>🗂️ Knowledge Commons</Link>
                  <Link to="/editorial-standard" className="mobile-nav-link sub"          onClick={closeMenu}>📐 Our Editorial Standard</Link>
                  <Link to="/joystick"           className="mobile-nav-link sub"          onClick={closeMenu}>📰 Joystick</Link>
                  <Link to="/raydyo"             className="mobile-nav-link sub"          onClick={closeMenu}>📻 Rayd-yo</Link>
                  <div className="mobile-submenu-divider" />
                  <Link to="/impact"       className="mobile-nav-link sub" onClick={closeMenu}>📊 Our Impact</Link>
                  <Link to="/how-it-works" className="mobile-nav-link sub" onClick={closeMenu}>⚖️ The 55/25/20 Model</Link>
                </div>
              )}
            </div>

            {/* Who We Are */}
            <div className="mobile-expandable">
              <button className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-about' ? null : 'mobile-about')}>
                👥 Who We Are {activeDropdown === 'mobile-about' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-about' && (
                <div className="mobile-submenu">
                  <Link to="/about"      className="mobile-nav-link sub" onClick={closeMenu}>📖 Our Story</Link>
                  <Link to="/team"       className="mobile-nav-link sub" onClick={closeMenu}>👋 The Team</Link>
                  <Link to="/volunteers" className="mobile-nav-link sub" onClick={closeMenu}>🤝 Volunteer</Link>
                  <Link to="/contact"    className="mobile-nav-link sub" onClick={closeMenu}>💬 Contact</Link>
                  <Link to="/legal"      className="mobile-nav-link sub" onClick={closeMenu}>📋 Governance</Link>
                </div>
              )}
            </div>

            <Link to="/shop" className="mobile-nav-link" onClick={closeMenu}>🛒 Shop</Link>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="mobile-nav-backdrop" onClick={closeMenu} aria-hidden="true" />}
    </>
  );
};

export default Header;