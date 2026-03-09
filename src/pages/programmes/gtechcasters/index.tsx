/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../ProgrammePage.css';
import './GTechCastersPage.css';

const GTechCastersPage: React.FC = () => {
  return (
    <div className="programme-content gtechcasters-page">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="programme-hero gtechcasters-hero">
        <div className="hero-badge">🎙️ G-Tech Casters</div>
        <h1 className="hero-tagline">Your Voice.<br />Your Platform.<br />Your Community.</h1>
        <p className="hero-sub">
          Media skills that connect to what's already here — churches, schools,
          restaurants, stadiums. Stop broadcasting into the void. Start serving
          the Brent ecosystem that needs you now.
        </p>
        <div className="gtc-hero-cta">
          <Link to="/pathways/gtechcasters/sandbox" className="gtc-cta-primary">
            Plan Your Media Pathway →
          </Link>
          <Link to="/pathways/rayd-yo" className="gtc-cta-secondary">
            Tune in to Rayd-yo 📻
          </Link>
        </div>
      </div>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <section className="programme-section gtc-problem-section">
        <h2 className="section-intro">The media trap</h2>
        <div className="gtc-problem-grid">
          <div className="gtc-problem-card gtc-problem-card--wrong">
            <div className="gtc-problem-label">The treadmill</div>
            <p>
              Chase YouTube subscribers for 12 months. Post every day.
              Algorithm ignores you. Sponsorship never comes.
              Give up or grind forever.
            </p>
          </div>
          <div className="gtc-problem-card gtc-problem-card--right">
            <div className="gtc-problem-label">The ecosystem path</div>
            <p>
              One church livestream contract: £200–500/month. One school event
              package: £300–1,000. One professional podcast retainer: £400–800/month.
              Same skills. Real money. Starts in weeks.
            </p>
          </div>
        </div>
        <p className="gtc-problem-insight">
          <strong>100+ places of worship in Brent.</strong> 200+ independent restaurants.
          100+ schools. Wembley Stadium events drawing 90,000 people. They all need media.
          Most have no one. That gap is your opportunity.
        </p>
      </section>

      {/* ── WHAT YOU'LL DO ───────────────────────────────────────── */}
      <section className="programme-section gtc-pathways-section">
        <h2 className="section-intro">What G-Tech Casters actually builds</h2>
        <div className="gtc-pathways-grid">

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">🏢</span>
            <h3>Ecosystem media</h3>
            <p>
              Serve local businesses, faith communities, schools and event organizers
              who have budgets and ongoing needs. Stable, relationship-based income.
            </p>
            <div className="gtc-pathway-income">£500 – £2,000/month</div>
          </div>

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">📻</span>
            <h3>Rayd-yo broadcasting</h3>
            <p>
              Host your own show on Wembley Wonders community radio. Heritage
              language programming, music curation, interview series — earn per
              episode while you build skills in a supportive structure.
            </p>
            <div className="gtc-pathway-income">£300 – £600/month</div>
          </div>

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">🎤</span>
            <h3>Podcast production</h3>
            <p>
              Professionals want podcasts but hate the production work. Lawyers,
              coaches, consultants — turn their expertise into audio content
              that attracts their clients.
            </p>
            <div className="gtc-pathway-income">£400 – £1,500/month</div>
          </div>

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">🌍</span>
            <h3>Heritage media</h3>
            <p>
              The Windrush generation is aging. Stories need capturing now.
              Oral histories, heritage language programming, cultural documentation
              — urgent, meaningful, and fundable.
            </p>
            <div className="gtc-pathway-income">£300 – £1,000/month</div>
          </div>

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">🎬</span>
            <h3>Event coverage</h3>
            <p>
              Events happen constantly in Brent. Build reputation as the reliable
              event media producer and bookings flow consistently.
            </p>
            <div className="gtc-pathway-income">£200 – £800/event</div>
          </div>

          <div className="gtc-pathway-card">
            <span className="gtc-pathway-emoji">🔄</span>
            <h3>Hybrid: B2B + personal brand</h3>
            <p>
              Stable B2B base plus your own content. B2B covers the floor,
              personal brand adds the ceiling. Build both at once, sustainably.
            </p>
            <div className="gtc-pathway-income">£800 – £3,000/month</div>
          </div>

        </div>
      </section>

      {/* ── 55/25/20 ─────────────────────────────────────────────── */}
      <section className="programme-section gtc-model-section">
        <h2 className="section-intro">How the money works</h2>
        <div className="gtc-model-grid">
          <div className="gtc-model-card gtc-model-card--creator">
            <div className="gtc-model-pct">55%</div>
            <div className="gtc-model-label">To you</div>
            <p>Direct to the creator. Your work, your earnings.</p>
          </div>
          <div className="gtc-model-card gtc-model-card--community">
            <div className="gtc-model-pct">25%</div>
            <div className="gtc-model-label">Community fund</div>
            <p>Shared pool — equipment, training, supporting other members.</p>
          </div>
          <div className="gtc-model-card gtc-model-card--platform">
            <div className="gtc-model-pct">20%</div>
            <div className="gtc-model-label">Platform costs</div>
            <p>Keeps Rayd-yo, Joystick, and the whole infrastructure running.</p>
          </div>
        </div>
        <p className="gtc-model-note">
          This isn't a gig platform taking 30%. This is a community wealth model —
          the more creators earn, the stronger the whole platform gets.
        </p>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────── */}
      <section className="programme-section gtc-audience-section">
        <h2 className="section-intro">Who this is for</h2>
        <div className="gtc-audience-grid">
          <div className="gtc-audience-card">
            <span>🎙️</span>
            <p>You've got a voice but no clear path to earning with it</p>
          </div>
          <div className="gtc-audience-card">
            <span>📱</span>
            <p>You post content but the algorithm isn't paying your bills</p>
          </div>
          <div className="gtc-audience-card">
            <span>🌍</span>
            <p>You speak a heritage language and know communities that need that</p>
          </div>
          <div className="gtc-audience-card">
            <span>🏘️</span>
            <p>You're connected to Brent's community and want to serve it</p>
          </div>
          <div className="gtc-audience-card">
            <span>🎚️</span>
            <p>You have technical media skills but no clients yet</p>
          </div>
          <div className="gtc-audience-card">
            <span>⏰</span>
            <p>You want to start earning from media in weeks, not years</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="programme-section gtc-cta-section">
        <div className="gtc-final-cta">
          <h2>Find your pathway</h2>
          <p>
            The Media Pathways Planner takes 5 minutes. Tell it what draws you to
            media, which local sectors interest you, and it maps the routes to real
            income — with ecosystem opportunities, internal WW options, and a
            personalised plan to take away.
          </p>
          <Link to="/pathways/gtechcasters/sandbox" className="gtc-cta-primary gtc-cta-large">
            Open the Media Pathways Planner →
          </Link>
          <p className="gtc-cta-sub">
            Already a member? Your plan connects to your Creator's Journal.
          </p>
        </div>
      </section>

    </div>
  );
};

export { GTechCastersPage };
export default GTechCastersPage;