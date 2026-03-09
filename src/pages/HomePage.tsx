import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// ============================================
// HOMEPAGE — The Honest Mirror
// ============================================
// Entry principle: You arrived rich. We help
// you know what you're worth.
//
// Narrative sequence:
// 1. REVALUATION — stop them mid-scroll
// 2. EXCAVATION — name what they carry
//    + UNTOLD — name what they were never given  ← NEW
// 3. STRUCTURAL TRUTH — name the broken system
// 4. PROPOSITION — what we do together
// 5. HONEST TIMELINE — realistic earnings arc
// 6. PROGRAMMES — the refinery, not the source
// 7. PROVENANCE — what makes it premium
// 8. PATHWAYS — age-appropriate entry
// 9. PROOF — testimonials
// 10. THE PHILOSOPHY — 55/25/20 explained properly
// ============================================

const PROGRAMMES = [
  { id: 'stemgeneers',          name: 'STEMgeneers',           icon: '⚡',  tag: 'Build & Repair',        outcome: 'Device repair (earn £15-40/job)',          day: 'Mon 7pm',  season: 'Spring',     color: '#10b981' },
  { id: 'techreneurs',          name: 'TECHreneurs',            icon: '💻',  tag: 'Launch & Sell',         outcome: 'Launch a product, first real sale',        day: 'Thu 7pm',  season: 'Autumn',     color: '#3b82f6' },
  { id: 'pageturners',          name: 'Pageturners',            icon: '✍️', tag: 'Write & Publish',       outcome: 'Published in Joystick e-zine',             day: 'Tue 7pm',  season: 'Year-round', color: '#8b5cf6' },
  { id: 'gtechcasters',         name: 'G-Tech Casters',         icon: '🎙️', tag: 'Record & Broadcast',    outcome: 'Your show on Rayd-yo Radio',               day: 'Wed 7pm',  season: 'Year-round', color: '#06b6d4' },
  { id: 'kaywanas-court',       name: "Kaywana's Court",        icon: '🎭',  tag: 'Debate & Lead',         outcome: 'Win a courtroom debate',                  day: 'Thu 7pm',  season: 'Summer',     color: '#f97316' },
  { id: 'silk-stilettos',       name: 'Silk Stilettos',         icon: '👠',  tag: 'Design & Influence',    outcome: 'Portfolio of original pieces',             day: 'Mon 7pm',  season: 'Summer',     color: '#ec4899' },
  { id: 'trubble-n-bass',       name: 'Trubble n Bass',         icon: '🎵',  tag: 'Produce & Release',     outcome: 'Release a track, listening party',         day: 'Thu 7pm',  season: 'Spring',     color: '#a855f7' },
  { id: 'auntie-anansis-kitchen', name: "Auntie Anansi's Kitchen", icon: '🍲', tag: 'Cook & Preserve',   outcome: 'Heritage recipes documented',              day: 'Sat 11am', season: 'Summer',     color: '#f59e0b' },
  { id: 'impact-labs',          name: 'Impact Labs',            icon: '🔬',  tag: 'Research & Propose',    outcome: 'Real proposal to directors',              day: 'Mon 7pm',  season: 'Autumn',     color: '#14b8a6' },
  { id: 'creator-factory',      name: 'Creator Factory',        icon: '🏭',  tag: 'Create Under Pressure', outcome: 'Portfolio of timed challenges',            day: 'Wed 6pm',  season: 'Autumn',     color: '#ef4444' },
  { id: 'bright-sparks',        name: 'Bright Sparks',          icon: '✨',  tag: 'Discover Your Path',    outcome: 'Personalised pathway recommendation',      day: 'Sat 10am', season: 'Year-round', color: '#fbbf24' },
  { id: 'easy-street',          name: 'Easy Street',            icon: '🎬',  tag: 'Drama & Storytelling',  outcome: 'Radio drama on Rayd-yo',                  day: 'Fri 7pm',  season: 'Year-round', color: '#84cc16' },
  // ✨ Roots — Body Sovereignty Resource
  // Women-led · Women-directed · Women-managed
  // Leads: Judith Fontanelle · Flora Agba · Natalie | ROV: Aya
  // Status: coming soon → active IWD 8 March 2026
  { id: 'roots',                name: 'Roots',                  icon: '🌿',  tag: 'Know & Reclaim',        outcome: 'Hair science, body sovereignty, legal rights', day: 'Launching Mar 8', season: 'Year-round', color: '#4A6741', isComingSoon: true },
];

const TESTIMONIALS = [
  {
    name: 'Mrs. Patel',
    detail: 'Parent, Wembley Park',
    quote: 'My son learned phone repair in STEMgeneers. He now earns £200 a month fixing screens for neighbours. He has purpose.',
    asset: 'Inherited mechanical patience. Nobody taught him that.'
  },
  {
    name: 'Winston',
    detail: '58, retired engineer',
    quote: "I podcast Caribbean history on Rayd-yo every Wednesday. Forty years of stories — now they're preserved for my grandchildren.",
    asset: 'Forty years of lived knowledge the internet doesn\'t have.'
  },
  {
    name: 'Aaliyah',
    detail: '19, music producer',
    quote: "55% is mine, not Spotify's 30%. I released my first EP through Trubble n Bass and kept more than I'd earn anywhere else.",
    asset: 'A sonic vocabulary built in Wembley, not LA.'
  },
];

const SCHEDULE = [
  { day: 'Monday', items: [{ time: '7:00 PM', name: 'STEMgeneers / Silk Stilettos / Impact Labs', note: 'Seasonal rotation' }] },
  { day: 'Tuesday', items: [{ time: '7:00 PM', name: 'Pageturners', note: 'Year-round' }] },
  { day: 'Wednesday', items: [
    { time: '12:00 PM', name: 'Drop-in Help Desk', note: 'Open to all' },
    { time: '6:00 PM', name: 'Creator Factory', note: 'Autumn' },
    { time: '7:00 PM', name: 'G-Tech Casters', note: 'Year-round' },
  ]},
  { day: 'Thursday', items: [{ time: '7:00 PM', name: "TECHreneurs / Trubble n Bass / Kaywana's Court", note: 'Seasonal rotation' }] },
  { day: 'Friday', items: [
    { time: '5:00 PM', name: 'Friday Feedback Circle', note: 'Open to all' },
    { time: '7:00 PM', name: 'Easy Street', note: 'Year-round' },
  ]},
  { day: 'Saturday', items: [
    { time: '10:00 AM', name: 'Bright Sparks', note: 'Year-round' },
    { time: '11:00 AM', name: "Auntie Anansi's Kitchen", note: 'Summer' },
    { time: '2:00 PM', name: 'Saturday Skills Swap', note: 'Open to all' },
  ]},
  // ✨ Roots launches IWD 8 March 2026 — full schedule TBC after founding team session
  { day: 'Coming Mar 8', items: [{ time: 'IWD Launch', name: 'Roots — Body Sovereignty', note: 'Women-led · Judith · Flora · Natalie' }] },
];

// ── CHANGE 1 ──────────────────────────────────────────────────────────────────
// EXCAVATION_PROMPTS: inward-facing — what you carry but haven't named.
// Speaks to the core Wembley audience: suppressed knowledge.
// ─────────────────────────────────────────────────────────────────────────────
const EXCAVATION_PROMPTS = [
  "Your grandmother's recipe that exists in no cookbook.",
  "The pattern you've been drawing since you were seven.",
  "The way your family explains something no one else can.",
  "The story only your ends knows.",
  "Your Nigerian roots filtered through Wembley endz.",
  "Forty years of Caribbean history living in your memory.",
  "The technique you inherited without being taught.",
  "The rhythm you tap without thinking.",
  "The hair knowledge that never made it into any salon training.",
];

// ── CHANGE 1 (continued) ──────────────────────────────────────────────────────
// UNTOLD_PROMPTS: outward-facing — what was withheld, not suppressed.
//
// This second register speaks to the Jimmy demographic:
// people from declining towns who experienced the consequences of empire
// and de-industrialisation without ever being given the framework to
// understand it. They filled that gap with available narratives —
// some of them destructive.
//
// These prompts don't lecture. They make curiosity feel like self-interest.
// "Your town was a node in an empire" is not a guilt trip.
// It's the most interesting thing anyone has ever said about Dunstable.
//
// The emotional register is identical to the hero line:
// accusatory in the most generous sense.
// ─────────────────────────────────────────────────────────────────────────────
const UNTOLD_PROMPTS = [
  "That your town was a node in an empire before it was a postcode.",
  "That the road your dad drove to work was built by Romans to move colonial goods.",
  "That the factory that closed wasn't bad luck — it was a decision made elsewhere.",
  "That the community you resented was doing what your community used to do.",
  "That the Windrush generation came because the empire invited them — then forgot.",
  "That your grandfather's trade and their grandfather's trade fed the same machine.",
  "That decline isn't destiny. It was designed.",
  "That the knowledge your family carries survived everything they were told to forget.",
  "That 148 cultures in one borough isn't a problem to manage. It's an archive to open.",
];

function useTypewriter(strings: string[], speed = 45, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
    }
  }, [charIdx, deleting, idx, strings, speed, pause]);

  useEffect(() => {
    setDisplay(strings[idx].slice(0, charIdx));
  }, [charIdx, idx, strings]);

  return display;
}

const HomePage: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<string>('all');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const excavationText = useTypewriter(EXCAVATION_PROMPTS);
  // ── CHANGE 1 (hook) ──────────────────────────────────────────────────────────
  // Second typewriter instance for the untold register.
  // Offset the initial index so both typewriters don't start simultaneously —
  // the untold prompts begin mid-cycle to avoid visual sync.
  // ─────────────────────────────────────────────────────────────────────────────
  const untoldText = useTypewriter(UNTOLD_PROMPTS, 42, 2600);

  // Intersection observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProgrammes = activeSeason === 'all'
    ? PROGRAMMES
    : PROGRAMMES.filter(p => p.season === activeSeason || p.season === 'Year-round');

  return (
    <div className="hp">

      {/* ══════════════════════════════════════
          BEAT 1 — THE REVALUATION
          Stop them. Name the inversion.
      ══════════════════════════════════════ */}
      <section className="hp-hero">
        <div className="hp-hero-atmosphere">
          <div className="hp-atm-orb hp-atm-orb--1" />
          <div className="hp-atm-orb hp-atm-orb--2" />
          <div className="hp-atm-orb hp-atm-orb--3" />
          <div className="hp-atm-grain" />
        </div>

        <div className="hp-hero-content">
          <div className="hp-hero-eyebrow">
            <span className="hp-eyebrow-dot" />
            <span>Wembley Wonders CIC · Est. 2020 · 148 cultures, one borough</span>
          </div>

          <h1 className="hp-hero-title">
            You walked in here<br />
            <span className="hp-title-rich">rich.</span>
          </h1>

          <p className="hp-hero-declaration">
            You just didn't know it yet.
          </p>

          <p className="hp-hero-sub">
            Not rich in money. Rich in what you carry — the knowledge, the story,
            the technique, the taste, the memory that nobody else on earth holds
            in exactly your combination. In a world of infinite bland replicas,
            that's the scarcest thing there is.
          </p>

          {/* ── CHANGE 2 ────────────────────────────────────────────────────────
              One sentence added to hero sub-copy.
              Purpose: seed the second question (the untold history register)
              before the user reaches Beat 2, so it doesn't arrive cold.

              "You think this is their story" speaks directly to the visitor
              who arrived feeling like an outsider to the Wembley Wonders
              world — the Jimmy who grew up in a declining town and assumed
              this platform was for "them, not me."

              It reframes the entire page before they've scrolled an inch.
              ────────────────────────────────────────────────────────────── */}
          <p className="hp-hero-sub hp-hero-sub--untold">
            You think this is their story. It's yours too.
            You just weren't told your part.
          </p>

          <div className="hp-hero-ctas">
            <Link to="/programmes/bright-sparks" className="hp-cta hp-cta--primary">
              Find what you carry →
            </Link>
            <Link to="/sandbox" className="hp-cta hp-cta--outline">
              Try a sandbox first
            </Link>
          </div>

          <div className="hp-hero-meta">
            <Link to="/join" className="hp-meta-join">Join free</Link>
            <span className="hp-meta-sep">·</span>
            <Link to="/login" className="hp-meta-login">Already a member</Link>
          </div>
        </div>

        <div className="hp-hero-scroll-hint">
          <span>scroll</span>
          <div className="hp-scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 2 — THE EXCAVATION
          Name what they carry specifically
          + THE UNTOLD (new second panel)
          Name what they were never given
      ══════════════════════════════════════ */}
      <section className="hp-excavation" id="excavation" data-reveal>
        <div className="hp-container">

          {/* Original panel — inward facing */}
          <div className="hp-exc-layout">
            <div className="hp-exc-left">
              <span className="hp-section-label">The question</span>
              <h2 className="hp-exc-heading">
                What do you know that<br />nobody taught you?
              </h2>
              <p className="hp-exc-body">
                Sit with that. Because whatever just came to mind — that specific
                thing, that perspective shaped by every street, every kitchen,
                every conversation that made you who you are — nobody else holds
                exactly that combination.
              </p>
              <p className="hp-exc-body">
                Wembley alone holds 148 distinct cultures. Each one a map of
                knowledge the mainstream market has spent fifty years diluting,
                homogenising, and selling back to us at a discount. The original
                is still here. In you.
              </p>
            </div>
            <div className="hp-exc-right">
              <div className="hp-typewriter-frame">
                <span className="hp-tw-label">It might be —</span>
                <p className="hp-typewriter-text">
                  {excavationText}
                  <span className="hp-tw-cursor">|</span>
                </p>
              </div>
              <p className="hp-exc-aside">
                That's not nostalgia. That's not background.
                <strong> That's your primary economic asset.</strong>
              </p>
            </div>
          </div>

          {/* ── CHANGE 3 ────────────────────────────────────────────────────────
              Second panel — outward facing. The untold register.

              Visual logic: same two-column rhythm as the first panel, but
              the colours invert (use hp-exc-layout--untold class) so it reads
              as a continuation, not a repetition. The divider between panels
              is a thin rule with the label "The other question" — making clear
              this is a pivot not a repeat.

              Why this matters structurally:
              The first panel asks "what do you carry?" — it speaks to people
              who sense their value has been suppressed (the core Wembley
              audience).

              The second panel asks "what were you never told?" — it speaks to
              people who have been misdirected rather than suppressed. Jimmy.
              The Dunstable lad. The declining-town voter who filled the gap
              with GB News because nobody else offered a framework.

              The UNTOLD_PROMPTS are deliberately written without political
              framing. "That decline isn't destiny. It was designed." is not
              a manifesto line. It's an invitation to curiosity. The same
              curiosity the sandbox is built to reward.

              CSS note: hp-exc-layout--untold should mirror hp-exc-layout
              but with reversed column order on desktop (right question,
              left typewriter) to create visual variety while maintaining
              the established rhythm. On mobile both stack identically.
              ────────────────────────────────────────────────────────────── */}
          <div className="hp-exc-divider">
            <span className="hp-exc-divider-label">The other question</span>
          </div>

          <div className="hp-exc-layout hp-exc-layout--untold">
            <div className="hp-exc-right">
              <div className="hp-typewriter-frame hp-typewriter-frame--untold">
                <span className="hp-tw-label">Nobody told you —</span>
                <p className="hp-typewriter-text">
                  {untoldText}
                  <span className="hp-tw-cursor">|</span>
                </p>
              </div>
              <p className="hp-exc-aside">
                That's not politics. That's not guilt.
                <strong> That's the part of your story that was edited out.</strong>
              </p>
            </div>
            <div className="hp-exc-left">
              <span className="hp-section-label">The other question</span>
              <h2 className="hp-exc-heading">
                What were you never taught<br />that would change everything<br />
                you think you know?
              </h2>
              <p className="hp-exc-body">
                The knowledge you carry didn't arrive from nowhere. It came through
                families, streets, trades, migrations — through a history that most
                of us were handed in fragments, with the connective tissue removed.
              </p>
              <p className="hp-exc-body">
                Wembley is where those fragments meet. Where the story of a town
                on a Roman road and the story of a family on a Windrush ship and
                the story of a workshop on the High Road turn out to be
                the same story, told from different ends.
              </p>
              <p className="hp-exc-body">
                The sandbox is where you start finding your end of it.
              </p>
              <Link to="/sandbox" className="hp-pathway-cta">
                Find your part of the story →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 3 — THE STRUCTURAL TRUTH
          Name the broken system honestly
      ══════════════════════════════════════ */}
      <section className="hp-truth" id="truth" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">Why now</span>
          <h2 className="hp-truth-heading">
            The old deal is broken.<br />
            <span className="hp-truth-accent">Both of them.</span>
          </h2>

          <div className="hp-truth-columns">
            <div className="hp-truth-col">
              <div className="hp-truth-col-marker hp-truth-col-marker--red" />
              <h3>The employment promise</h3>
              <p>
                Real wages haven't grown since 2008 but employers still act like
                they have a captive market. The graduate queue gets longer.
                The entry-level role gets automated. The door stays shut.
                16.1% of under-25s can't find work — not because they lack
                ability, but because the system was never designed to reward it.
              </p>
            </div>
            <div className="hp-truth-col">
              <div className="hp-truth-col-marker hp-truth-col-marker--amber" />
              <h3>The creator economy promise</h3>
              <p>
                Build a following. Monetise your life. Be your own boss. What
                they don't tell you: TikTok won't pay unless your video is over
                a minute long. YouTube demonetises your channel overnight because
                of a sample in your intro. Twitch's algorithm shifts and six
                figures becomes two grand a month. Platform dependency isn't freedom.
                It's a different cage.
              </p>
            </div>
            <div className="hp-truth-col">
              <div className="hp-truth-col-marker hp-truth-col-marker--green" />
              <h3>The third way</h3>
              <p>
                It starts with what you already own. Not a platform, not an
                employer, not a follower count. Your provenance — documented,
                protected, and priced to sustain a real life. That's not a
                new idea. The Windrush generation built it when the doors
                were closed. We're making it legible for the generation
                the current system has decided is surplus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 4 — THE PROPOSITION
          What we do together
      ══════════════════════════════════════ */}
      <section className="hp-proposition" id="proposition" data-reveal>
        <div className="hp-container">
          <div className="hp-prop-frame">
            <span className="hp-section-label">What we do</span>
            <h2 className="hp-prop-heading">
              We don't give you skills.<br />
              We help you know what<br />
              you already own.
            </h2>
            <p className="hp-prop-body">
              The workshops aren't where your value comes from.
              They're where you learn to articulate it, refine it,
              document it, protect it legally, and sell it at a price
              that sustains a real life — not for a month, for a lifetime.
            </p>

            <div className="hp-prop-pillars">
              <div className="hp-pillar">
                <span className="hp-pillar-num">01</span>
                <h4>Excavate</h4>
                <p>Session one isn't an induction. It's a valuation. We identify what you carry that nobody else does.</p>
              </div>
              <div className="hp-pillar">
                <span className="hp-pillar-num">02</span>
                <h4>Document</h4>
                <p>Provenance is the asset. PageTurners embeds the story into every product. That's what commands premium pricing.</p>
              </div>
              <div className="hp-pillar">
                <span className="hp-pillar-num">03</span>
                <h4>Protect</h4>
                <p>Your IP is legally yours from day one. We don't extract — we authenticate and defend what you created.</p>
              </div>
              <div className="hp-pillar">
                <span className="hp-pillar-num">04</span>
                <h4>Earn</h4>
                <p>55% of what you create stays with you. Not Spotify's 30%. Not a platform's terms. Yours, documented, verifiable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 5 — THE HONEST TIMELINE
          Realistic earnings arc, no false promises
      ══════════════════════════════════════ */}
      <section className="hp-timeline" id="timeline" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">The honest picture</span>
          <h2 className="hp-tl-heading">
            What earning actualisation<br />actually looks like
          </h2>
          <p className="hp-tl-sub">
            We won't tell you everything you make is worth premium money.
            We will tell you exactly what it takes to get there.
          </p>

          <div className="hp-tl-arc">
            <div className="hp-tl-stage hp-tl-stage--1">
              <div className="hp-tl-marker">
                <span>Months 1–6</span>
              </div>
              <div className="hp-tl-content">
                <h4>Excavation & first product</h4>
                <p>Skill development, first products in marketplace, earnings supplementary. £500–1,500/month possible while other income bridges.</p>
                <span className="hp-tl-tag">The refinery opens</span>
              </div>
            </div>
            <div className="hp-tl-stage hp-tl-stage--2">
              <div className="hp-tl-marker">
                <span>Months 6–18</span>
              </div>
              <div className="hp-tl-content">
                <h4>Portfolio building</h4>
                <p>Cross-programme combinations activate. Collaborations generate compound value. £2,000–4,000/month becoming realistic.</p>
                <span className="hp-tl-tag">Multiple streams open</span>
              </div>
            </div>
            <div className="hp-tl-stage hp-tl-stage--3">
              <div className="hp-tl-marker">
                <span>Months 18–36</span>
              </div>
              <div className="hp-tl-content">
                <h4>Reputation established</h4>
                <p>Provenance commands premium. Mentoring newer creators adds income. £5,000–8,000/month within reach for committed creators.</p>
                <span className="hp-tl-tag">Provenance commands price</span>
              </div>
            </div>
            <div className="hp-tl-stage hp-tl-stage--4">
              <div className="hp-tl-marker">
                <span>Year 3+</span>
              </div>
              <div className="hp-tl-content">
                <h4>Earning actualisation</h4>
                <p>Documented cultural assets generating recurring revenue. The rare one-off that sells for silly money has a provenance trail that began in session one.</p>
                <span className="hp-tl-tag">Full sovereignty</span>
              </div>
            </div>
          </div>

          <p className="hp-tl-caveat">
            This is honest, not discouraging. The employment market offers no such
            roadmap at all — just a door that doesn't open.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 6 — THE PROGRAMMES
          The refinery, not the source
      ══════════════════════════════════════ */}
      <section className="hp-programmes" id="programmes" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">The refinery</span>
          <h2 className="hp-section-heading">13 programmes. Each one a different lens on what you already carry.</h2>
          <p className="hp-section-sub-text">
            Cross-programme combinations are the real wealth engine.
            A Trubble n Bass creator who also moves through G-Tech Casters
            isn't just a musician — they're a media production unit.
          </p>

          <div className="hp-season-filter">
            {['all', 'Year-round', 'Spring', 'Summer', 'Autumn'].map(s => (
              <button key={s}
                className={`hp-season-btn ${activeSeason === s ? 'active' : ''}`}
                onClick={() => setActiveSeason(s)}>
                {s === 'all' ? 'All seasons' : s}
              </button>
            ))}
          </div>

          <div className="hp-programme-grid">
            {filteredProgrammes.map(p => (
              <Link key={p.id} to={`/programmes/${p.id}`}
                className={`hp-programme-card${(p as any).isComingSoon ? ' hp-programme-card--coming-soon' : ''}`}
                style={{ '--prog-color': p.color } as React.CSSProperties}>
                <div className="hp-prog-top">
                  <span className="hp-prog-icon">{p.icon}</span>
                  <div>
                    <div className="hp-prog-name">
                      {p.name}
                      {(p as any).isComingSoon && (
                        <span className="hp-prog-cs-badge">Mar 8</span>
                      )}
                    </div>
                    <div className="hp-prog-tag">{p.tag}</div>
                  </div>
                </div>
                <div className="hp-prog-outcome">{p.outcome}</div>
                <div className="hp-prog-footer">
                  <span>{p.day}</span>
                  <span className="hp-prog-season">{p.season}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="hp-programmes-footer">
            <Link to="/programmes" className="hp-cta hp-cta--ghost">
              View all programmes →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 7 — THE 55/25/20 PHILOSOPHY
          Not mechanics — meaning
      ══════════════════════════════════════ */}
      <section className="hp-philosophy" id="philosophy" data-reveal>
        <div className="hp-container">
          <div className="hp-phil-layout">
            <div className="hp-phil-left">
              <span className="hp-section-label">The split</span>
              <h2 className="hp-phil-heading">
                55/25/20 isn't a revenue model.<br />
                It's a philosophy.
              </h2>
              <p className="hp-phil-body">
                55% is yours because your knowledge, your provenance, your
                authenticity is the asset. We don't create that. You brought it.
              </p>
              <p className="hp-phil-body">
                25% builds something that outlasts you — for your children, for
                the next person sitting where you're sitting now. That's not
                charity. That's optionality. The capital pool that means when
                an opportunity arrives, it's there.
              </p>
              <p className="hp-phil-body">
                20% keeps the infrastructure that protects and authenticates
                what you create. The legal structures, the documentation,
                the platform that means nobody can strip-mine your
                culture without acknowledgement or payment.
              </p>
              <p className="hp-phil-body hp-phil-body--accent">
                The Windrush generation built parallel economies when the
                doors were closed. We're making that intelligence
                legible and transmissible.
              </p>
            </div>
            <div className="hp-phil-right">
              <div className="hp-split-visual">
                <div className="hp-split-ring">
                  <div className="hp-split-segment hp-split-55">
                    <span className="hp-split-pct">55%</span>
                    <span className="hp-split-lbl">Yours</span>
                  </div>
                  <div className="hp-split-segment hp-split-25">
                    <span className="hp-split-pct">25%</span>
                    <span className="hp-split-lbl">Community future</span>
                  </div>
                  <div className="hp-split-segment hp-split-20">
                    <span className="hp-split-pct">20%</span>
                    <span className="hp-split-lbl">Platform protection</span>
                  </div>
                </div>
              </div>
              <div className="hp-pricing-row">
                <div className="hp-price-pill">
                  <span className="hp-price-amt">FREE</span>
                  <span>All workshops</span>
                </div>
                <div className="hp-price-pill">
                  <span className="hp-price-amt">£3</span>
                  <span>Auntie Anansi's only (ingredients)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 8 — PATHWAYS
          Age-appropriate entry points
      ══════════════════════════════════════ */}
      <section className="hp-pathways-section" id="pathways" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">Where you start</span>
          <h2 className="hp-section-heading">The door opens wherever you are.</h2>

          <div className="hp-pathways">
            <div className="hp-pathway" style={{ '--path-color': '#fbbf24' } as React.CSSProperties}>
              <span className="hp-pathway-age">Age 13–19</span>
              <h3>Young Creators</h3>
              <p>
                Start with <strong>Bright Sparks</strong> on Saturday mornings.
                Before you choose a programme, we help you name what you
                already carry. The session one valuation isn't a test.
                It's a conversation.
              </p>
              <Link to="/programmes/bright-sparks" className="hp-pathway-cta">
                Start with Bright Sparks →
              </Link>
            </div>
            <div className="hp-pathway" style={{ '--path-color': '#06b6d4' } as React.CSSProperties}>
              <span className="hp-pathway-age">Age 20–39</span>
              <h3>Working Creators</h3>
              <p>
                Evening sessions fit around your job — the one that isn't paying
                real wages. <strong>TECHreneurs</strong> if you want to sell.
                <strong> G-Tech Casters</strong> if you want an audience.
                <strong> Trubble n Bass</strong> if the rhythm is already there.
              </p>
              <Link to="/programmes" className="hp-pathway-cta">
                Browse programmes →
              </Link>
            </div>
            <div className="hp-pathway" style={{ '--path-color': '#a855f7' } as React.CSSProperties}>
              <span className="hp-pathway-age">Age 40+</span>
              <h3>Heritage Creators</h3>
              <p>
                You are sitting on the rarest asset in the room.
                <strong> Pageturners</strong> documents it.
                <strong> Auntie Anansi's Kitchen</strong> preserves it.
                <strong> Rayd-yo</strong> broadcasts it.
                Forty years of knowledge doesn't retire.
              </p>
              <Link to="/programmes/pageturners" className="hp-pathway-cta">
                Start with Pageturners →
              </Link>
            </div>
            {/* ✨ Women — Roots pathway */}
            <div className="hp-pathway hp-pathway--roots" style={{ '--path-color': '#4A6741' } as React.CSSProperties}>
              <span className="hp-pathway-age">Women</span>
              <h3>
                Body Sovereignty
                <span className="hp-pathway-badge">IWD Mar 8</span>
              </h3>
              <p>
                <strong>Roots</strong> is the knowledge that should have been handed down.
                Hair science. Chemical literacy. Legal rights. The Apothecary
                creator pathway. Led by <strong>Judith Fontanelle, Flora Agba,
                and Natalie</strong>. Women-led, women-directed, women-managed.
              </p>
              <Link to="/programmes/roots" className="hp-pathway-cta">
                Find out more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEAT 9 — PROOF
          Real people, real assets named
      ══════════════════════════════════════ */}
      <section className="hp-proof" id="proof" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">It works</span>
          <h2 className="hp-section-heading">Real people. Real assets. Real earnings.</h2>

          <div className="hp-testimonials">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="hp-testimonial">
                <div className="hp-testimonial-asset">{t.asset}</div>
                <blockquote className="hp-testimonial-quote">
                  "{t.quote}"
                </blockquote>
                <div className="hp-testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SCHEDULE
      ══════════════════════════════════════ */}
      <section className="hp-schedule-section" id="schedule" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">This week</span>
          <h2 className="hp-section-heading">When we meet</h2>
          <p className="hp-section-sub-text">All sessions on Zoom · Free · Open to members</p>

          <div className="hp-schedule">
            {SCHEDULE.map((day, di) => (
              <div key={di} className={`hp-schedule-day${day.day === 'Coming Mar 8' ? ' hp-schedule-day--roots' : ''}`}>
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

          <div className="hp-schedule-links">
            <Link to="/sessions" className="hp-cta hp-cta--outline">Full schedule →</Link>
            <Link to="/calendar" className="hp-cta hp-cta--ghost">View calendar</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONNOISSEURS CLUB
      ══════════════════════════════════════ */}
      <section className="hp-cc" id="cc" data-reveal>
        <div className="hp-container">
          <div className="hp-cc-frame">
            <span className="hp-cc-badge">Cultural recognition</span>
            <h2 className="hp-cc-title">The Connoisseurs Club</h2>
            <p className="hp-cc-text">
              Beyond earnings — a rites of passage framework celebrating African
              and Diasporan culture. Five stages from Seedling to Elder, marked
              by community ceremonies that witness your growth.
            </p>
            <p className="hp-cc-line">People come for the earnings. They stay for the belonging.</p>
            <Link to="/connoisseurs-club" className="hp-cta hp-cta--outline">
              Discover the five stages →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MEDIA CHANNELS
      ══════════════════════════════════════ */}
      <section className="hp-media" id="media" data-reveal>
        <div className="hp-container">
          <span className="hp-section-label">Where your work lives</span>
          <h2 className="hp-section-heading">Community media. Real audiences.</h2>
          <div className="hp-media-grid">
            <Link to="/raydyo" className="hp-media-card hp-media-card--raydyo">
              <span className="hp-media-icon">📻</span>
              <div>
                <h3>Rayd-yo Radio</h3>
                <p>Community radio made by members. Podcasts, interviews, music, heritage storytelling. Your voice, your audience.</p>
              </div>
              <span className="hp-media-cta">Listen now →</span>
            </Link>
            <Link to="/joystick" className="hp-media-card hp-media-card--joystick">
              <span className="hp-media-icon">📰</span>
              <div>
                <h3>Joystick E-zine</h3>
                <p>Digital magazine written, designed, and published by the community. Your words, documented, attributed, yours.</p>
              </div>
              <span className="hp-media-cta">Read now →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER CTA — The invitation
      ══════════════════════════════════════ */}
      <section className="hp-footer-cta">
        <div className="hp-container">
          <div className="hp-footer-inner">
            <h2 className="hp-footer-title">
              Let's find it.<br />
              Refine it.<br />
              Make it yours to own.
            </h2>
            <p className="hp-footer-sub">
              Not a course. Not a qualification. Not another door to knock on.
              A process that starts with what you already carry.
            </p>
            <div className="hp-footer-ctas">
              <Link to="/join" className="hp-cta hp-cta--primary">
                Join free — takes 2 minutes
              </Link>
              <Link to="/sandbox" className="hp-cta hp-cta--outline">
                Try the sandbox first
              </Link>
            </div>
            <div className="hp-footer-org">
              Wembley Wonders CIC · Company No. 12960817<br />
              Flat 2, 452 High Road, Wembley HA9 7AY · 0208 902 9991<br />
              <span>All volunteers DBS-checked · Activity logs viewable by parents</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;