import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HousesPage.css';

// ─────────────────────────────────────────────────────────────────────────────
// HousesPage — Wembley Wonders CIC
// Route: /houses  /houses/connoisseurs  /houses/passionistas
//
// Identity entry point for the participation spine.
// Two Houses: Connoisseurs Club (Claude, convenor) and
// Passionistas Fan Club (Judith, convenor).
// Together they form Kaywana's Court.
// ─────────────────────────────────────────────────────────────────────────────

const HousesPage: React.FC = () => {
  const [hoveredHouse, setHoveredHouse] = useState<'connoisseurs' | 'passionistas' | null>(null);

  return (
    <div className="houses-page">

      <nav className="houses-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link to="/get-involved">Get Involved</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">The Houses</span>
      </nav>

      <section className="houses-hero">
        <div className="houses-hero-inner">
          <p className="houses-overline">Kaywana's Court</p>
          <h1 className="houses-headline">
            Find your House.<br />
            Find your crew.
          </h1>
          <p className="houses-subheadline">
            Wembley Wonders is built around two Houses — each with its own
            character, its own convenor, and its own way of contributing.
            Together they form the democratic heart of the platform: Kaywana's Court.
          </p>
          <p className="houses-subheadline secondary">
            You don't have to be a creator to belong here. Curators, strategists,
            connectors, amplifiers — every role has a home.
          </p>
        </div>
      </section>

      <section className="houses-cards-section">
        <div className="houses-cards">

          <div
            className={`house-card house-card--connoisseurs ${hoveredHouse === 'connoisseurs' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredHouse('connoisseurs')}
            onMouseLeave={() => setHoveredHouse(null)}
          >
            <div className="house-card-inner">
              <div className="house-card-header">
                <span className="house-sigil">🎩</span>
                <div>
                  <h2 className="house-name">Connoisseurs Club</h2>
                  <p className="house-convenor">Convened by Claude</p>
                </div>
              </div>
              <p className="house-ethos">
                The House of standards, taste, and careful attention. If you
                believe quality is an act of respect — for the work, for the
                audience, for the community — you're a Connoisseur.
              </p>
              <div className="house-qualities">
                <h3 className="house-qualities-label">This House values</h3>
                <ul className="house-qualities-list">
                  <li>Curation over accumulation</li>
                  <li>Editorial rigour</li>
                  <li>Strategic thinking</li>
                  <li>The long view</li>
                  <li>Considered evaluation</li>
                </ul>
              </div>
              <div className="house-roles">
                <h3 className="house-qualities-label">Typical crew roles</h3>
                <div className="house-role-tags">
                  <span className="role-tag">Curator</span>
                  <span className="role-tag">Strategist</span>
                  <span className="role-tag">Knowledge Keeper</span>
                  <span className="role-tag">Evaluator</span>
                  <span className="role-tag">Programme Director</span>
                </div>
              </div>
              <div className="house-card-footer">
                <Link to="/workshops/signup" className="house-join-btn house-join-btn--connoisseurs">
                  Join the Connoisseurs Club →
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`house-card house-card--passionistas ${hoveredHouse === 'passionistas' ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredHouse('passionistas')}
            onMouseLeave={() => setHoveredHouse(null)}
          >
            <div className="house-card-inner">
              <div className="house-card-header">
                <span className="house-sigil">💃</span>
                <div>
                  <h2 className="house-name">Passionistas Fan Club</h2>
                  <p className="house-convenor">Convened by Judith</p>
                </div>
              </div>
              <p className="house-ethos">
                The House of energy, connection, and momentum. If you believe
                that enthusiasm is a skill — and that amplifying others is its
                own form of brilliance — you're a Passionista.
              </p>
              <div className="house-qualities">
                <h3 className="house-qualities-label">This House values</h3>
                <ul className="house-qualities-list">
                  <li>Energy and presence</li>
                  <li>Community amplification</li>
                  <li>Cultural instinct</li>
                  <li>Connections and introductions</li>
                  <li>Movement and momentum</li>
                </ul>
              </div>
              <div className="house-roles">
                <h3 className="house-qualities-label">Typical crew roles</h3>
                <div className="house-role-tags">
                  <span className="role-tag">Amplifier</span>
                  <span className="role-tag">Community Lead</span>
                  <span className="role-tag">Spotlight Facilitator</span>
                  <span className="role-tag">Follow-up Coordinator</span>
                  <span className="role-tag">Pulse Reader</span>
                </div>
              </div>
              <div className="house-card-footer">
                <Link to="/workshops/signup" className="house-join-btn house-join-btn--passionistas">
                  Join the Passionistas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="houses-court-section">
        <div className="houses-court-inner">
          <h2 className="court-title">Together: Kaywana's Court</h2>
          <p className="court-body">
            Both Houses meet in Kaywana's Court — the governance and creative
            assembly of Wembley Wonders. This is where strategy is tested,
            culture is shaped, and the platform's direction is decided.
          </p>
          <div className="court-meetings">
            <div className="court-meeting">
              <span className="meeting-icon">📋</span>
              <div>
                <strong>AGM</strong>
                <span>Annual General Meeting — full community, major decisions</span>
              </div>
            </div>
            <div className="court-meeting">
              <span className="meeting-icon">💻</span>
              <div>
                <strong>Quarterly Exec</strong>
                <span>Zoom — both Houses, programme review, fund proposals</span>
              </div>
            </div>
            <div className="court-meeting">
              <span className="meeting-icon">⚡</span>
              <div>
                <strong>Emergency General Meetings</strong>
                <span>Called when needed — any member can trigger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="houses-unsure-section">
        <div className="houses-unsure-inner">
          <h2 className="unsure-title">Not sure which House?</h2>
          <p className="unsure-body">
            Most people feel elements of both — that's expected. The Houses
            aren't permanent assignments; they're starting points. Many members
            move between roles as the platform evolves. Come to a workshop
            first, try a role, and let your participation reveal your fit.
          </p>
          <div className="unsure-actions">
            <Link to="/workshops/signup" className="unsure-btn unsure-btn--primary">
              Attend a workshop →
            </Link>
            <Link to="/community/dashboard" className="unsure-btn unsure-btn--secondary">
              Browse open roles →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HousesPage;