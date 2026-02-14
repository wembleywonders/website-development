import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// ============================================
// HOMEPAGE — Community-First Entry Point
// ============================================
// "Learn Skills. Earn Money. Build Community."
//
// This is the FIRST DOOR — practical, immediate, answerable.
// The Connoisseurs Club is the SECOND DOOR — cultural, aspirational.
// Both essential. Different purposes.
// ============================================

// Programme data (minimal — matches sparkData keys)
const PROGRAMMES = [
  { id: 'stemgeneers', name: 'STEMgeneers', icon: '⚡', tag: 'Build & Repair', outcome: 'Device repair (earn £15-40/job)', day: 'Mon 7pm', season: 'Spring', color: '#10b981' },
  { id: 'techreneurs', name: 'TECHreneurs', icon: '💻', tag: 'Launch & Sell', outcome: 'Launch a product, first real sale', day: 'Thu 7pm', season: 'Autumn', color: '#3b82f6' },
  { id: 'pageturners', name: 'Pageturners', icon: '✍️', tag: 'Write & Publish', outcome: 'Published in Joystick e-zine', day: 'Tue 7pm', season: 'Year-round', color: '#8b5cf6' },
  { id: 'gtechcasters', name: 'G-Tech Casters', icon: '🎙️', tag: 'Record & Broadcast', outcome: 'Your show on Rayd-yo Radio', day: 'Wed 7pm', season: 'Year-round', color: '#06b6d4' },
  { id: 'kaywanas_court', name: "Kaywana's Court", icon: '🎭', tag: 'Debate & Lead', outcome: 'Win a courtroom debate', day: 'Thu 7pm', season: 'Summer', color: '#f97316' },
  { id: 'silk_stilettos', name: 'Silk Stilettos', icon: '👠', tag: 'Speak & Influence', outcome: "Women's leadership presence", day: 'Mon 7pm', season: 'Summer', color: '#ec4899' },
  { id: 'trubble_n_bass', name: 'Trubble n Bass', icon: '🎵', tag: 'Produce & Release', outcome: 'Release a track, listening party', day: 'Thu 7pm', season: 'Spring', color: '#a855f7' },
  { id: 'auntie_anansi', name: "Auntie Anansi's Kitchen", icon: '🍲', tag: 'Cook & Preserve', outcome: 'Heritage recipes documented', day: 'Sat 11am', season: 'Summer', color: '#f59e0b' },
  { id: 'impact_labs', name: 'Impact Labs', icon: '🔬', tag: 'Research & Propose', outcome: 'Real proposal to directors', day: 'Mon 7pm', season: 'Autumn', color: '#14b8a6' },
  { id: 'creator_factory', name: 'Creator Factory', icon: '🏭', tag: 'Create Under Pressure', outcome: 'Portfolio of timed challenges', day: 'Wed 6pm', season: 'Autumn', color: '#ef4444' },
  { id: 'bright_sparks', name: 'Bright Sparks', icon: '✨', tag: 'Discover Your Path', outcome: 'Personalised pathway recommendation', day: 'Sat 10am', season: 'Year-round', color: '#fbbf24' },
  { id: 'easy_street', name: 'Easy Street', icon: '🎬', tag: 'Drama & Storytelling', outcome: 'Radio drama on Rayd-yo', day: 'Fri 7pm', season: 'Year-round', color: '#84cc16' },
];

const TESTIMONIALS = [
  { name: 'Mrs. Patel', detail: 'Parent, Wembley Park', quote: 'My son learned phone repair in STEMgeneers. He now earns £200 a month fixing screens for neighbours. He has purpose.' },
  { name: 'Winston', detail: '58, retired engineer', quote: "I podcast Caribbean history on Rayd-yo every Wednesday. Forty years of stories — now they're preserved for my grandchildren." },
  { name: 'Aaliyah', detail: '19, music producer', quote: "55% is mine, not Spotify's 30%. I released my first EP through Trubble n Bass and kept more than I'd earn anywhere else." },
];

const VALUE_PANELS = [
  { icon: '🛠️', title: 'Learn Real Skills', desc: 'Device repair, music production, writing, podcasting, cooking, debating — practical skills you can use this week.', color: '#10b981' },
  { icon: '📻', title: 'Get Promoted', desc: "Your work goes on Rayd-yo Radio and Joystick e-zine. Real audiences, real feedback, real portfolio pieces.", color: '#06b6d4' },
  { icon: '💰', title: 'Earn Fair Money', desc: 'Keep 55% of what you create. Community gets 25%, platform gets 20%. No hidden fees. Transparent from day one.', color: '#fbbf24' },
  { icon: '🎭', title: 'Celebrate With Dignity', desc: 'The Connoisseurs Club recognises your growth through cultural ceremonies — from Seedling to Elder.', color: '#a855f7' },
];

const SCHEDULE = [
  { day: 'Monday', items: [{ time: '7:00 PM', name: 'STEMgeneers / Silk Stilettos / Impact Labs', note: 'Seasonal rotation' }] },
  { day: 'Tuesday', items: [{ time: '7:00 PM', name: 'Pageturners', note: 'Year-round' }] },
  { day: 'Wednesday', items: [
    { time: '12:00 PM', name: 'Drop-in Help Desk', note: 'Open to all' },
    { time: '6:00 PM', name: 'Creator Factory', note: 'Autumn' },
    { time: '7:00 PM', name: 'G-Tech Casters', note: 'Year-round' },
  ]},
  { day: 'Thursday', items: [{ time: '7:00 PM', name: 'TECHreneurs / Trubble n Bass / Kaywana\'s Court', note: 'Seasonal rotation' }] },
  { day: 'Friday', items: [
    { time: '5:00 PM', name: 'Friday Feedback Circle', note: 'Open to all' },
    { time: '7:00 PM', name: 'Easy Street', note: 'Year-round' },
  ]},
  { day: 'Saturday', items: [
    { time: '10:00 AM', name: 'Bright Sparks', note: 'Year-round' },
    { time: '11:00 AM', name: "Auntie Anansi's Kitchen", note: 'Summer' },
    { time: '2:00 PM', name: 'Saturday Skills Swap', note: 'Open to all' },
  ]},
];

const HomePage: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<string>('all');

  const filteredProgrammes = activeSeason === 'all'
    ? PROGRAMMES
    : PROGRAMMES.filter(p => p.season === activeSeason || p.season === 'Year-round');

  return (
    <div className="hp">

      {/* ── HERO ── */}
      <section className="hp-hero">
        <div className="hp-hero-bg">
          <div className="hp-hero-glow hp-hero-glow--1" />
          <div className="hp-hero-glow hp-hero-glow--2" />
          <div className="hp-hero-pattern" />
        </div>

        <div className="hp-hero-content">
          <div className="hp-hero-badge">
            <span>🌟</span>
            <span>Wembley's Community Skills Platform</span>
          </div>

          <h1 className="hp-hero-title">
            Learn Skills.<br />
            Earn Money.<br />
            Build Community.
          </h1>

          <p className="hp-hero-subtitle">
            Free weekly workshops in device repair, music production, writing,
            podcasting, cooking, and more. Keep <strong>55%</strong> of what you earn.
            Celebrate with cultural dignity.
          </p>

          <div className="hp-hero-ctas">
            <Link to="/programmes/bright-sparks" className="hp-cta hp-cta--primary">
              ✨ Not Sure? Start with Bright Sparks
            </Link>
            <Link to="/sandbox" className="hp-cta hp-cta--secondary">
              🎨 Try a Sandbox — No Signup
            </Link>
          </div>

          <div className="hp-hero-tertiary">
            <Link to="/join" className="hp-hero-join">Join Free →</Link>
            <span className="hp-hero-divider">·</span>
            <Link to="/login" className="hp-hero-login">Already a member? Log in</Link>
          </div>

          {/* Stats bar */}
          <div className="hp-hero-stats">
            <div className="hp-stat">
              <span className="hp-stat-value">12</span>
              <span className="hp-stat-label">Programmes</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value">FREE</span>
              <span className="hp-stat-label">All workshops</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value">55%</span>
              <span className="hp-stat-label">Revenue to you</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value">32</span>
              <span className="hp-stat-label">Weeks / year</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="hp-section">
        <div className="hp-container">
          <h2 className="hp-section-title">How It Works</h2>
          <div className="hp-value-grid">
            {VALUE_PANELS.map((panel, i) => (
              <div key={i} className="hp-value-card" style={{ '--card-color': panel.color } as React.CSSProperties}>
                <span className="hp-value-icon">{panel.icon}</span>
                <h3 className="hp-value-title">{panel.title}</h3>
                <p className="hp-value-desc">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEEKLY SCHEDULE ── */}
      <section className="hp-section hp-section--alt">
        <div className="hp-container">
          <h2 className="hp-section-title">This Week's Schedule</h2>
          <p className="hp-section-sub">All sessions on Zoom · Free · Open to members</p>
          <div className="hp-schedule">
            {SCHEDULE.map((day, di) => (
              <div key={di} className="hp-schedule-day">
                <div className="hp-schedule-day-name">{day.day}</div>
                <div className="hp-schedule-items">
                  {day.items.map((item, ii) => (
                    <div key={ii} className="hp-schedule-item">
                      <span className="hp-schedule-time">{item.time}</span>
                      <span className="hp-schedule-name">{item.name}</span>
                      <span className="hp-schedule-note">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hp-schedule-footer">
            <Link to="/sessions" className="hp-cta hp-cta--secondary">
              📅 Full Sessions Schedule
            </Link>
            <Link to="/calendar" className="hp-cta hp-cta--ghost">
              View Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES ── */}
      <section className="hp-section">
        <div className="hp-container">
          <h2 className="hp-section-title">12 Programmes. Real Outcomes.</h2>
          <p className="hp-section-sub">Each programme runs for 8 weeks. Choose your season.</p>

          <div className="hp-season-filter">
            {['all', 'Year-round', 'Spring', 'Summer', 'Autumn'].map(s => (
              <button key={s} className={`hp-season-btn ${activeSeason === s ? 'active' : ''}`}
                onClick={() => setActiveSeason(s)}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>

          <div className="hp-programme-grid">
            {filteredProgrammes.map(p => (
              <Link key={p.id} to={`/programmes/${p.id.replace(/_/g, '-')}`}
                className="hp-programme-card" style={{ '--prog-color': p.color } as React.CSSProperties}>
                <div className="hp-prog-header">
                  <span className="hp-prog-icon">{p.icon}</span>
                  <div>
                    <div className="hp-prog-name">{p.name}</div>
                    <div className="hp-prog-tag">{p.tag}</div>
                  </div>
                </div>
                <div className="hp-prog-outcome">{p.outcome}</div>
                <div className="hp-prog-meta">
                  <span>{p.day}</span>
                  <span className="hp-prog-season">{p.season}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/programmes" className="hp-cta hp-cta--ghost">View all programmes →</Link>
          </div>
        </div>
      </section>

      {/* ── START HERE PATHWAYS ── */}
      <section className="hp-section hp-section--alt">
        <div className="hp-container">
          <h2 className="hp-section-title">Where Do I Start?</h2>
          <div className="hp-pathways">
            <div className="hp-pathway" style={{ '--path-color': '#fbbf24' } as React.CSSProperties}>
              <div className="hp-pathway-age">Age 13-19</div>
              <h3>Young Creators</h3>
              <p>Start with <strong>Bright Sparks</strong> on Saturday mornings — discover what excites you, then choose your programme.</p>
              <Link to="/programmes/bright-sparks" className="hp-pathway-link">Start with Bright Sparks →</Link>
            </div>
            <div className="hp-pathway" style={{ '--path-color': '#3b82f6' } as React.CSSProperties}>
              <div className="hp-pathway-age">Age 20-39</div>
              <h3>Working Creators</h3>
              <p>Evening sessions fit around your job. <strong>TECHreneurs</strong> if you want to sell. <strong>G-Tech Casters</strong> if you want an audience.</p>
              <Link to="/programmes" className="hp-pathway-link">Browse programmes →</Link>
            </div>
            <div className="hp-pathway" style={{ '--path-color': '#a855f7' } as React.CSSProperties}>
              <div className="hp-pathway-age">Age 40+</div>
              <h3>Heritage Creators</h3>
              <p>Your stories matter. <strong>Pageturners</strong> preserves them. <strong>Auntie Anansi's Kitchen</strong> documents recipes. <strong>Rayd-yo</strong> gives you a voice.</p>
              <Link to="/programmes/pageturners" className="hp-pathway-link">Start with Pageturners →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="hp-section">
        <div className="hp-container">
          <h2 className="hp-section-title">Real People. Real Results.</h2>
          <div className="hp-testimonials">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="hp-testimonial">
                <p className="hp-testimonial-quote">"{t.quote}"</p>
                <div className="hp-testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TRANSPARENCY ── */}
      <section className="hp-section hp-section--alt">
        <div className="hp-container">
          <h2 className="hp-section-title">Transparent Pricing</h2>
          <div className="hp-pricing">
            <div className="hp-price-card">
              <div className="hp-price-amount">FREE</div>
              <div className="hp-price-label">All workshops & programmes</div>
              <p className="hp-price-detail">No registration fee. No materials fee. Just show up.</p>
            </div>
            <div className="hp-price-card">
              <div className="hp-price-amount">£3</div>
              <div className="hp-price-label">Auntie Anansi's Kitchen only</div>
              <p className="hp-price-detail">Covers ingredients. Everything else is free.</p>
            </div>
            <div className="hp-price-card hp-price-card--highlight">
              <div className="hp-price-amount">55%</div>
              <div className="hp-price-label">Revenue goes to you</div>
              <p className="hp-price-detail">You create it, you keep the majority. 25% to community pot, 20% to platform costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNOISSEURS CLUB TEASER ── */}
      <section className="hp-section">
        <div className="hp-container">
          <div className="hp-cc-teaser">
            <div className="hp-cc-content">
              <span className="hp-cc-badge">Cultural Recognition</span>
              <h2 className="hp-cc-title">The Connoisseurs Club</h2>
              <p className="hp-cc-text">
                Beyond skills — a rites of passage framework celebrating African and
                Diasporan culture. Five stages from Seedling to Elder, marked by community
                ceremonies that witness your growth.
              </p>
              <p className="hp-cc-sub">
                People come for skills. They stay for belonging.
              </p>
              <Link to="/connoisseurs-club" className="hp-cta hp-cta--secondary">
                🎭 Discover the Five Stages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEDIA CHANNELS ── */}
      <section className="hp-section hp-section--alt">
        <div className="hp-container">
          <h2 className="hp-section-title">Community Media</h2>
          <div className="hp-media-grid">
            <Link to="/raydyo" className="hp-media-card hp-media-card--raydyo">
              <span className="hp-media-icon">📻</span>
              <h3>Rayd-yo Radio</h3>
              <p>Community radio made by members. Podcasts, interviews, music, and heritage storytelling.</p>
              <span className="hp-media-action">Listen now →</span>
            </Link>
            <Link to="/joystick" className="hp-media-card hp-media-card--joystick">
              <span className="hp-media-icon">📰</span>
              <h3>Joystick E-zine</h3>
              <p>Digital magazine written, designed, and published by the community. Your words, your audience.</p>
              <span className="hp-media-action">Read now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="hp-footer-cta">
        <div className="hp-container">
          <h2>Ready to start?</h2>
          <p>Join free. Show up. Learn something real.</p>
          <div className="hp-hero-ctas">
            <Link to="/join" className="hp-cta hp-cta--primary">
              Join Free — Takes 2 Minutes
            </Link>
            <Link to="/sandbox" className="hp-cta hp-cta--secondary">
              🎨 Try It First — No Signup
            </Link>
          </div>
          <div className="hp-footer-info">
            <p>
              Wembley Wonders CIC · Company No. 12960817<br />
              Flat 2, 452 High Road, Wembley HA9 7AY<br />
              <span style={{ opacity: 0.5 }}>
                All volunteers DBS-checked · Activity logs viewable by parents
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;