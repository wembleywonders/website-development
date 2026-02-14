import React from 'react';
import { Link } from 'react-router-dom';
import './EasyStreetPage.css';

const EasyStreetPage: React.FC = () => {
  return (
    <div className="easy-street-page">
      {/* Hero Section */}
      <section className="easy-street-hero">
        <div className="hero-content">
          <span className="programme-badge">G-Tech Casters × Pageturners</span>
          <h1>Easy Street</h1>
          <p className="hero-tagline">A Radio Drama Development Lab</p>
          <p className="hero-description">
            Got a story to tell? Wembley has. Want to learn how radio drama gets made?
          </p>
        </div>
      </section>

      {/* What We're Building */}
      <section className="what-were-building">
        <div className="section-content">
          <h2>What We're Building</h2>
          <p>
            We're developing a new drama serial for Rayd-yo — a story about ambition, 
            family, and opportunity on the High Road. A proper drama with characters 
            you'll help create that recognise the challenges of city life and 
            conversations that build or break.
          </p>
          <p>We need writers, voices, and producers to build it together.</p>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="what-youll-get">
        <div className="section-content">
          <h2>What You'll Get</h2>
          <ul className="benefits-list">
            <li>
              <span className="benefit-icon">📅</span>
              <div className="benefit-text">
                <strong>Six weeks of workshops</strong>
                <span>Zoom, Tuesday evenings, 7–8:30pm</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">🎯</span>
              <div className="benefit-text">
                <strong>Real skills</strong>
                <span>Scriptwriting, audio production, collaborative storytelling</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">📻</span>
              <div className="benefit-text">
                <strong>Your name on a broadcast production</strong>
                <span>Credit on Rayd-yo and potential stage adaptation</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">🚀</span>
              <div className="benefit-text">
                <strong>Pathway into our programmes</strong>
                <span>Entry point for G-Tech Casters and Pageturners</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">💷</span>
              <div className="benefit-text">
                <strong>Potential revenue share</strong>
                <span>If the series gets commissioned or adapted</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* What You'll Bring */}
      <section className="what-youll-bring">
        <div className="section-content">
          <h2>What You'll Bring</h2>
          <div className="bring-grid">
            <div className="bring-item">
              <h3>Curiosity</h3>
              <p>About how stories work and why they matter</p>
            </div>
            <div className="bring-item">
              <h3>Connection</h3>
              <p>To life on roads like ours — the hustles, the pressures, the choices that don't feel like choices</p>
            </div>
            <div className="bring-item">
              <h3>Collaboration</h3>
              <p>Willingness to share ideas and build on others'</p>
            </div>
            <div className="bring-item">
              <h3>Commitment</h3>
              <p>To all six sessions — we're building something together</p>
            </div>
          </div>
        </div>
      </section>

      {/* You Don't Need */}
      <section className="you-dont-need">
        <div className="section-content">
          <h2>You Don't Need</h2>
          <div className="dont-need-list">
            <p>❌ Previous writing or production experience</p>
            <p>❌ To share anything personal you're not comfortable with</p>
            <p>❌ To have all the answers — we're figuring this out together</p>
          </div>
        </div>
      </section>

      {/* The Six Weeks */}
      <section className="the-six-weeks">
        <div className="section-content">
          <h2>The Six Weeks</h2>
          <div className="weeks-timeline">
            <div className="week-item">
              <span className="week-number">1</span>
              <div className="week-content">
                <h3>The World</h3>
                <p>Mapping the High Road. What stories does Wembley have?</p>
              </div>
            </div>
            <div className="week-item">
              <span className="week-number">2</span>
              <div className="week-content">
                <h3>The People</h3>
                <p>Building characters. Who lives here? Who's at the centre?</p>
              </div>
            </div>
            <div className="week-item">
              <span className="week-number">3</span>
              <div className="week-content">
                <h3>The Trap</h3>
                <p>How does it start? What looks like opportunity?</p>
              </div>
            </div>
            <div className="week-item">
              <span className="week-number">4</span>
              <div className="week-content">
                <h3>The Spiral</h3>
                <p>What gets hidden? How do lies become automatic?</p>
              </div>
            </div>
            <div className="week-item">
              <span className="week-number">5</span>
              <div className="week-content">
                <h3>The Break</h3>
                <p>What forces the truth out? The confrontation.</p>
              </div>
            </div>
            <div className="week-item">
              <span className="week-number">6</span>
              <div className="week-content">
                <h3>The After</h3>
                <p>What does moving forward look like? Series assembly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who's This For */}
      <section className="whos-this-for">
        <div className="section-content">
          <h2>Who's This For</h2>
          <p>
            Young adults 16–30 based in Brent. All backgrounds welcome. 
            If you're not sure whether this is for you, it probably is.
          </p>
        </div>
      </section>

      {/* Apply Section */}
      <section className="apply-section">
        <div className="section-content">
          <h2>How to Join</h2>
          <p>
            Email <a href="mailto:workshops@wembleywonders.org">workshops@wembleywonders.org</a> with 
            your name, age, and a few sentences about why this interests you.
          </p>
          <p className="no-formal">No formal application — just tell us what draws you to it.</p>
          <div className="deadline-box">
            <span className="deadline-label">Deadline</span>
            <span className="deadline-date">[Date two weeks before Session 1]</span>
          </div>
          <p className="questions">
            Questions? Drop into a <Link to="/programmes/coffee-morning">Coffee Morning</Link> or 
            message us on socials.
          </p>
        </div>
      </section>

      {/* Connected Programmes */}
      <section className="connected-programmes">
        <div className="section-content">
          <h2>Where This Leads</h2>
          <div className="programme-links">
            <Link to="/programmes/gtechcasters" className="programme-card">
              <h3>G-Tech Casters</h3>
              <p>Audio production, podcasting, and broadcast skills</p>
            </Link>
            <Link to="/programmes/pageturners" className="programme-card">
              <h3>Pageturners</h3>
              <p>Writing, storytelling, and narrative craft</p>
            </Link>
            <Link to="/programmes/kaywanas-court" className="programme-card">
              <h3>Kaywana's Court</h3>
              <p>Theatre, performance, and stage adaptation</p>
            </Link>
            <Link to="/raydyo" className="programme-card">
              <h3>Rayd-yo</h3>
              <p>Community radio — where your work gets heard</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="section-content">
          <p className="cta-text">
            Easy Street is a Wembley Wonders CIC production. We're a community interest 
            company building skills and platforms for the Forgotten 60% in Wembley.
          </p>
          <Link to="/membership" className="cta-button">Learn About Membership</Link>
        </div>
      </section>
    </div>
  );
};

export default EasyStreetPage;
