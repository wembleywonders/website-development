import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CommunityDashboard.css';

// ─────────────────────────────────────────────────────────────────────────────
// CommunityDashboard — Wembley Wonders CIC
// Route: /community/dashboard
//
// Governance transparency layer. Fund status, proposals, decisions,
// open roles. Data is seeded — connect to Spring Boot API when ready.
// Future API calls annotated per section.
// ─────────────────────────────────────────────────────────────────────────────

// Future: GET /api/community/fund-status
const fundStatus = { totalThisQuarter: 1240, allocated: 740, available: 500, currency: '£' };

// Future: GET /api/community/proposals?status=active
const activeProposals = [
  { id: 'prop-001', title: 'Workshop venue deposit — Wembley Library room hire (April)', proposedBy: 'Flora Agba', amount: 120, supportCount: 14, commentCount: 3, daysLeft: 5 },
  { id: 'prop-002', title: 'Storage unit — first month deposit for shared creator space', proposedBy: 'Community Exec', amount: 250, supportCount: 22, commentCount: 8, daysLeft: 9 },
];

// Future: GET /api/community/decisions?limit=3
const recentDecisions = [
  { id: 'dec-001', title: 'Roots Knowledge Archive — digitisation equipment budget', outcome: 'Approved', amount: 370, date: 'March 2026', votes: { for: 31, against: 2 } },
  { id: 'dec-002', title: 'IWD 2026 community documentation fund', outcome: 'Approved', amount: 0, date: 'February 2026', votes: { for: 28, against: 0 } },
];

// Future: GET /api/community/roles?status=open
const openRoles = [
  { id: 'role-001', title: 'Workshop Scribe', house: 'Either', commitment: 'Per session', level: 'Contributor', description: 'Capture key ideas and decisions, publish summary within 24 hours.' },
  { id: 'role-002', title: 'Pulse Reader', house: 'Either', commitment: 'Per session', level: 'Contributor', description: 'Run live Joystick polls, track sentiment, report to the team.' },
  { id: 'role-003', title: 'Opportunity Mapper', house: 'Connoisseurs', commitment: 'Weekly (1–2 hrs)', level: 'Operator', description: 'Match members to roles and projects based on their emerging contributions.' },
  { id: 'role-004', title: 'Follow-up Coordinator', house: 'Passionistas', commitment: 'Post-session', level: 'Contributor', description: 'Message participants, assign roles, keep momentum between sessions.' },
];

const levelColour = (level: string) => {
  if (level === 'Contributor') return 'level--contributor';
  if (level === 'Operator')    return 'level--operator';
  if (level === 'Steward')     return 'level--steward';
  return '';
};

const CommunityDashboard: React.FC = () => {
  const [signalledProposals, setSignalledProposals] = useState<Set<string>>(new Set());
  const [appliedRoles, setAppliedRoles]             = useState<Set<string>>(new Set());

  const handleSignal = (id: string) => {
    setSignalledProposals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleApply = (id: string) => {
    setAppliedRoles(prev => new Set(prev).add(id));
  };

  const allocated = Math.round((fundStatus.allocated / fundStatus.totalThisQuarter) * 100);

  return (
    <div className="community-dashboard">

      <nav className="cd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>›</span>
        <Link to="/get-involved">Get Involved</Link><span>›</span>
        <span aria-current="page">Community Dashboard</span>
      </nav>

      <header className="cd-header">
        <div className="cd-header-inner">
          <p className="cd-overline">The 25% Community Fund</p>
          <h1 className="cd-headline">The system, in plain sight.</h1>
          <p className="cd-strapline">
            Every proposal, every vote, every decision — visible to every member.
            This is what member-owned governance looks like in practice.
          </p>
        </div>
      </header>

      <div className="cd-layout">

        <div className="cd-main">

          {/* Fund status */}
          <section className="cd-card cd-fund-card">
            <div className="cd-card-header">
              <h2 className="cd-card-title">Fund status — Q1 2026</h2>
              <span className="cd-live-badge">Live</span>
            </div>
            <div className="cd-fund-figures">
              <div className="cd-figure">
                <span className="cd-figure-label">Received this quarter</span>
                <span className="cd-figure-value">{fundStatus.currency}{fundStatus.totalThisQuarter.toLocaleString()}</span>
              </div>
              <div className="cd-figure">
                <span className="cd-figure-label">Allocated</span>
                <span className="cd-figure-value allocated">{fundStatus.currency}{fundStatus.allocated.toLocaleString()}</span>
              </div>
              <div className="cd-figure">
                <span className="cd-figure-label">Available</span>
                <span className="cd-figure-value available">{fundStatus.currency}{fundStatus.available.toLocaleString()}</span>
              </div>
            </div>
            <div className="cd-progress-wrap">
              <div className="cd-progress-bar">
                <div className="cd-progress-fill" style={{ width: `${allocated}%` }} />
              </div>
              <span className="cd-progress-label">{allocated}% allocated</span>
            </div>
            <p className="cd-fund-note">
              25% of all platform revenue goes directly into this fund.
              Members vote on every allocation above £50. Below that threshold,
              the Community Exec decides.
            </p>
          </section>

          {/* Active proposals */}
          <section className="cd-card">
            <div className="cd-card-header">
              <h2 className="cd-card-title">Active proposals</h2>
              <span className="cd-count-badge">{activeProposals.length} open</span>
            </div>
            <p className="cd-card-intro">Signal your support before the voting window closes.</p>
            <div className="cd-proposals-list">
              {activeProposals.map(p => (
                <div key={p.id} className="cd-proposal">
                  <div className="cd-proposal-header">
                    <h3 className="cd-proposal-title">{p.title}</h3>
                    <span className="cd-proposal-amount">£{p.amount}</span>
                  </div>
                  <div className="cd-proposal-meta">
                    <span>Proposed by {p.proposedBy}</span>
                    <span className="cd-dot">·</span>
                    <span>{p.daysLeft} days left</span>
                    <span className="cd-dot">·</span>
                    <span>{p.commentCount} comments</span>
                  </div>
                  <div className="cd-proposal-actions">
                    <button
                      className={`cd-signal-btn ${signalledProposals.has(p.id) ? 'signalled' : ''}`}
                      onClick={() => handleSignal(p.id)}
                    >
                      {signalledProposals.has(p.id)
                        ? `✓ Signalled (${p.supportCount + 1})`
                        : `Signal support (${p.supportCount})`}
                    </button>
                    <Link to={`/community/proposals/${p.id}`} className="cd-view-link">View & comment →</Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="cd-card-footer">
              <Link to="/community/proposals/new" className="cd-propose-link">+ Submit a proposal</Link>
              <Link to="/community/proposals" className="cd-view-all-link">All proposals →</Link>
            </div>
          </section>

          {/* Recent decisions */}
          <section className="cd-card">
            <div className="cd-card-header">
              <h2 className="cd-card-title">Recent decisions</h2>
            </div>
            <div className="cd-decisions-list">
              {recentDecisions.map(d => (
                <div key={d.id} className="cd-decision">
                  <div className="cd-decision-row">
                    <span className={`cd-outcome-badge cd-outcome--${d.outcome.toLowerCase()}`}>{d.outcome}</span>
                    <h3 className="cd-decision-title">{d.title}</h3>
                  </div>
                  <div className="cd-decision-meta">
                    {d.amount > 0 && <><span>£{d.amount} allocated</span><span className="cd-dot">·</span></>}
                    <span>{d.votes.for} for, {d.votes.against} against</span>
                    <span className="cd-dot">·</span>
                    <span>{d.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="cd-card-footer">
              <Link to="/community/decisions" className="cd-view-all-link">All decisions →</Link>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="cd-sidebar">
          <section className="cd-card cd-roles-card">
            <div className="cd-card-header">
              <h2 className="cd-card-title">Open roles</h2>
              <span className="cd-count-badge">{openRoles.length} available</span>
            </div>
            <p className="cd-card-intro">Every role is a real contribution. Roles rotate — you're never stuck.</p>
            <div className="cd-roles-list">
              {openRoles.map(r => (
                <div key={r.id} className="cd-role">
                  <div className="cd-role-header">
                    <h3 className="cd-role-title">{r.title}</h3>
                    <span className={`cd-level-badge ${levelColour(r.level)}`}>{r.level}</span>
                  </div>
                  <div className="cd-role-tags">
                    <span className="cd-role-house">{r.house}</span>
                    <span className="cd-role-commitment">{r.commitment}</span>
                  </div>
                  <p className="cd-role-description">{r.description}</p>
                  <button
                    className={`cd-apply-btn ${appliedRoles.has(r.id) ? 'applied' : ''}`}
                    onClick={() => handleApply(r.id)}
                    disabled={appliedRoles.has(r.id)}
                  >
                    {appliedRoles.has(r.id) ? '✓ Expression of interest sent' : 'Express interest'}
                  </button>
                </div>
              ))}
            </div>
            <div className="cd-card-footer">
              <Link to="/community/roles" className="cd-view-all-link">All roles →</Link>
            </div>
          </section>

          <section className="cd-card cd-progression-card">
            <h2 className="cd-card-title">How crew levels work</h2>
            <div className="cd-levels">
              {[
                { level: 'Participant', desc: 'Listen, react, attend' },
                { level: 'Contributor', desc: 'Submit work, support sessions' },
                { level: 'Operator',    desc: 'Deliver real initiatives' },
                { level: 'Steward',     desc: 'Elected — oversee funds + decisions' },
                { level: 'Lead',        desc: 'Run a House, programme, or domain' },
              ].map((l, i) => (
                <div key={i} className="cd-level-row">
                  <span className="cd-level-number">{i + 1}</span>
                  <div><strong>{l.level}</strong><span>{l.desc}</span></div>
                </div>
              ))}
            </div>
            <Link to="/community/roles" className="cd-progression-link">See how members progress →</Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CommunityDashboard;