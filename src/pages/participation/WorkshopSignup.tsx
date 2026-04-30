import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WorkshopSignup.css';

// ─────────────────────────────────────────────────────────────────────────────
// WorkshopSignup — Wembley Wonders CIC
// Route: /workshops/signup
//
// Three-step flow: session → role → details.
// Role selection sends a signal before arrival.
// Future: POST /api/workshops/register
// ─────────────────────────────────────────────────────────────────────────────

const upcomingSessions = [
  {
    id: 'ws-001',
    title: 'Workshop 1: Welcome to the System',
    date: 'Saturday 29 March 2026',
    time: '11:00 – 12:30',
    format: 'Zoom',
    facilitator: 'Claude & Judith',
    spotsLeft: 14,
    totalSpots: 20,
    description: "Orient new members, introduce the Houses and crew roles, activate first contributions. If you're new — start here.",
    roles: [
      { id: 'tech-host',    title: 'Tech Host',             level: 'Contributor', taken: false },
      { id: 'scribe',       title: 'Scribe',                level: 'Contributor', taken: false },
      { id: 'pulse-reader', title: 'Pulse Reader',          level: 'Contributor', taken: true  },
      { id: 'spotlight-1',  title: 'Spotlight Facilitator', level: 'Contributor', taken: false },
      { id: 'mapper',       title: 'Opportunity Mapper',    level: 'Operator',    taken: false },
    ],
  },
  {
    id: 'ws-002',
    title: 'Workshop 2: From Ideas to Opportunities',
    date: 'Saturday 5 April 2026',
    time: '11:00 – 12:30',
    format: 'Zoom',
    facilitator: 'Claude & Judith',
    spotsLeft: 18,
    totalSpots: 20,
    description: 'Turn ideas into real initiatives. Introduce funding logic. Good for members who attended Workshop 1 or already know the basics.',
    roles: [
      { id: 'tech-host',     title: 'Tech Host',             level: 'Contributor', taken: false },
      { id: 'scribe',        title: 'Scribe',                level: 'Contributor', taken: false },
      { id: 'pulse-reader',  title: 'Pulse Reader',          level: 'Contributor', taken: false },
      { id: 'spotlight-1',   title: 'Spotlight Facilitator', level: 'Contributor', taken: false },
      { id: 'funding-trans', title: 'Funding Translator',    level: 'Operator',    taken: false },
    ],
  },
];

const roleDescriptions: Record<string, string> = {
  'tech-host':    'Manage the Zoom room — waiting room, breakouts, screen share. Handle issues quietly so the session flows.',
  'scribe':       'Capture key ideas and decisions in Google Workspace. Publish a summary within 24 hours of the session.',
  'pulse-reader': 'Run live Joystick polls, track sentiment, report "community is leaning X" to the facilitator.',
  'spotlight-1':  'Bring members into conversation, manage Q&A, keep energy balanced.',
  'mapper':       'Identify who can do what next. Match people to roles and projects emerging from the session.',
  'funding-trans':'Turn ideas from the session into fundable proposals with clear asks and costings.',
};

const WorkshopSignup: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedRole,    setSelectedRole]    = useState<string | null>(null);
  const [house, setHouse] = useState<'connoisseurs' | 'passionistas' | 'unsure'>('unsure');
  const [submitted, setSubmitted] = useState(false);
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');

  const session = upcomingSessions.find(s => s.id === selectedSession);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || !name || !email) return;
    setSubmitted(true);
  };

  if (submitted && session) {
    const roleTitle = session.roles.find(r => r.id === selectedRole)?.title;
    return (
      <div className="ws-page">
        <div className="ws-confirmation">
          <span className="ws-confirm-icon">✓</span>
          <h1 className="ws-confirm-title">You're in.</h1>
          <p className="ws-confirm-session">{session.title}</p>
          <p className="ws-confirm-detail">{session.date} · {session.time} · {session.format}</p>
          {selectedRole && selectedRole !== 'participant' && (
            <p className="ws-confirm-role">Role: <strong>{roleTitle}</strong></p>
          )}
          <p className="ws-confirm-note">
            We'll send the Zoom link to <strong>{email}</strong> 24 hours before the session.
            {selectedRole && selectedRole !== 'participant' && ' The Programme Director will reach out with role notes.'}
          </p>
          <div className="ws-confirm-actions">
            <Link to="/community/dashboard" className="ws-confirm-btn">Community Dashboard →</Link>
            <Link to="/houses" className="ws-confirm-link">Explore the Houses →</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ws-page">

      <nav className="ws-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>›</span>
        <Link to="/get-involved">Get Involved</Link><span>›</span>
        <Link to="/workshops">Workshops</Link><span>›</span>
        <span aria-current="page">Sign up</span>
      </nav>

      <header className="ws-header">
        <div className="ws-header-inner">
          <p className="ws-overline">Kaywana's Court — Workshop Series</p>
          <h1 className="ws-headline">Pick your role.<br />Not just a seat.</h1>
          <p className="ws-strapline">
            Every session has open roles. Taking one — even a small one — is how
            you start building crew here. You're not locked in; you're trying it on.
          </p>
        </div>
      </header>

      <div className="ws-layout">

        {/* Step 1 */}
        <section className="ws-section">
          <h2 className="ws-section-title">
            <span className="ws-step">1</span>
            Choose a session
          </h2>
          <div className="ws-sessions">
            {upcomingSessions.map(s => {
              const spotsPercent = Math.round(((s.totalSpots - s.spotsLeft) / s.totalSpots) * 100);
              return (
                <button
                  key={s.id}
                  className={`ws-session-card ${selectedSession === s.id ? 'selected' : ''}`}
                  onClick={() => { setSelectedSession(s.id); setSelectedRole(null); }}
                >
                  <div className="ws-session-top">
                    <div>
                      <h3 className="ws-session-title">{s.title}</h3>
                      <p className="ws-session-meta">{s.date} · {s.time} · {s.format} · {s.facilitator}</p>
                    </div>
                    <span className={`ws-spots ${s.spotsLeft <= 5 ? 'ws-spots--low' : ''}`}>{s.spotsLeft} left</span>
                  </div>
                  <p className="ws-session-desc">{s.description}</p>
                  <div className="ws-session-fill">
                    <div className="ws-fill-bar"><div className="ws-fill-inner" style={{ width: `${spotsPercent}%` }} /></div>
                    <span className="ws-fill-label">{s.totalSpots - s.spotsLeft}/{s.totalSpots} registered</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2 */}
        {session && (
          <section className="ws-section ws-section--roles">
            <h2 className="ws-section-title">
              <span className="ws-step">2</span>
              Pick a role — or attend as a Participant
            </h2>
            <p className="ws-roles-note">
              Roles marked as taken are already claimed. Not ready to commit? Attend as a Participant.
            </p>
            <div className="ws-role-grid">
              <button
                className={`ws-role-chip ${selectedRole === 'participant' ? 'selected' : ''} role-chip--participant`}
                onClick={() => setSelectedRole(selectedRole === 'participant' ? null : 'participant')}
              >
                <span className="role-chip-title">Participant</span>
                <span className="role-chip-level">No commitment</span>
              </button>
              {session.roles.map(r => (
                <button
                  key={r.id}
                  className={`ws-role-chip ${r.level === 'Operator' ? 'role-chip--operator' : 'role-chip--contributor'} ${selectedRole === r.id ? 'selected' : ''} ${r.taken ? 'taken' : ''}`}
                  onClick={() => !r.taken && setSelectedRole(selectedRole === r.id ? null : r.id)}
                  disabled={r.taken}
                >
                  <span className="role-chip-title">{r.title}</span>
                  <span className="role-chip-level">{r.taken ? 'Taken' : r.level}</span>
                </button>
              ))}
            </div>
            {selectedRole && selectedRole !== 'participant' && roleDescriptions[selectedRole] && (
              <div className="ws-role-desc">
                <strong>{session.roles.find(r => r.id === selectedRole)?.title}</strong>
                <p>{roleDescriptions[selectedRole]}</p>
              </div>
            )}
          </section>
        )}

        {/* Step 3 */}
        {session && (
          <section className="ws-section">
            <h2 className="ws-section-title">
              <span className="ws-step">3</span>
              Your details
            </h2>
            <form className="ws-form" onSubmit={handleSubmit}>
              <div className="ws-form-row">
                <label className="ws-label" htmlFor="ws-name">Name</label>
                <input id="ws-name" className="ws-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="ws-form-row">
                <label className="ws-label" htmlFor="ws-email">Email</label>
                <input id="ws-email" className="ws-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="ws-form-row">
                <label className="ws-label">Which House are you drawn to?</label>
                <div className="ws-house-options">
                  {(['connoisseurs', 'passionistas', 'unsure'] as const).map(h => (
                    <button key={h} type="button" className={`ws-house-option ${house === h ? 'selected' : ''}`} onClick={() => setHouse(h)}>
                      {h === 'connoisseurs' && '🎩 Connoisseurs'}
                      {h === 'passionistas' && '💃 Passionistas'}
                      {h === 'unsure'       && 'Not sure yet'}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="ws-submit-btn" disabled={!name || !email}>
                Reserve my place
                {selectedRole && selectedRole !== 'participant'
                  ? ` as ${session.roles.find(r => r.id === selectedRole)?.title ?? 'Participant'}`
                  : ' as Participant'}
              </button>
              <p className="ws-submit-note">Zoom link sent 24 hours before. Role notes sent within 48 hours if you selected one.</p>
            </form>
          </section>
        )}

      </div>
    </div>
  );
};

export default WorkshopSignup;