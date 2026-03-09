import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JourneyPage.css';

// ============================================
// JOURNEY PAGE — Two Tracks, One Arc
// ============================================
// The journey is NOT a linear programme with
// a graduation at the end.
//
// It's two parallel tracks running together:
//
// TRACK 1: Cultural recognition
//   Seedling → Apprentice → Journeyman →
//   Craftsperson → Elder
//   (The Connoisseurs Club progression)
//
// TRACK 2: Economic actualisation
//   First product → Portfolio → Provenance
//   premium → Sovereign earnings
//   (The earnings arc — honest, not promotional)
//
// Both tracks compound. Cultural recognition
// makes economic assets more defensible.
// Economic success funds cultural infrastructure.
//
// Exit pathways here are NOT employment or
// further education. They are:
// — Sovereign creator
// — Community elder / mentor
// — Cultural institution builder
// — Cross-programme combinations
// ============================================

const CC_STAGES = [
  {
    id: 'seedling',
    title: 'Seedling',
    subtitle: 'The asset is named',
    icon: '🌱',
    cultural: 'You have identified what you carry. The provenance document exists in first draft. You are in your matched programme.',
    economic: 'First session. First product taking shape. Economic framing — 55/25/20 — is understood as philosophy, not just mechanics.',
    timeframe: 'Months 1–3',
    earnings: '£0–500/mo supplementary',
    markers: [
      'Provenance document: first draft',
      'Programme session attendance',
      'Asset named and documented',
      'Ecosystem introduced',
    ],
  },
  {
    id: 'apprentice',
    title: 'Apprentice',
    subtitle: 'The craft is forming',
    icon: '🔨',
    cultural: 'You are refining the asset. PageTurners has sharpened the narrative. The cultural lineage is documented. You understand where your work sits in the broader tradition.',
    economic: 'First products in marketplace. First real earnings — supplementary, not primary. Cross-programme combinations being explored.',
    timeframe: 'Months 3–9',
    earnings: '£500–1,500/mo',
    markers: [
      'First product published',
      'Provenance document: second draft',
      'Cross-programme pairing identified',
      'First marketplace listing live',
    ],
  },
  {
    id: 'journeyman',
    title: 'Journeyman',
    subtitle: 'The market recognises it',
    icon: '⚒️',
    cultural: 'Your work is known beyond your immediate programme. Rayd-yo or Joystick has broadcast it. The cultural lineage gives it context the market values. You are beginning to be a reference point.',
    economic: 'Multiple streams generating income. Portfolio deepening. Provenance starting to command premium pricing. The 25% community pot is building optionality.',
    timeframe: 'Months 9–18',
    earnings: '£2,000–4,000/mo',
    markers: [
      'Work published on Rayd-yo or Joystick',
      'Multiple active revenue streams',
      'Premium pricing on documented assets',
      'Community pot contribution building',
    ],
  },
  {
    id: 'craftsperson',
    title: 'Craftsperson',
    subtitle: 'Provenance commands price',
    icon: '🏺',
    cultural: 'You are a recognised practitioner in your tradition. Institutions — museums, broadcasters, cultural organisations — are finding you. Your provenance trail is complete enough to command institutional recognition.',
    economic: 'Earnings approaching full actualisation. The rare one-off is happening — the piece that sells for serious money because its provenance trail is unimpeachable. Mentoring newer creators adds a fourth income stream.',
    timeframe: 'Months 18–36',
    earnings: '£5,000–8,000/mo',
    markers: [
      'Institutional recognition achieved',
      'Mentoring at least one Seedling',
      'Premium one-off sales documented',
      'IP portfolio legally protected',
    ],
  },
  {
    id: 'elder',
    title: 'Elder',
    subtitle: 'The ecosystem owes you',
    icon: '🌳',
    cultural: 'You are part of the cultural infrastructure. Your oral history is in the archive. Your provenance trail is referenced by others coming behind you. The ecosystem you helped build is sustaining the next generation.',
    economic: 'Sovereign earnings. Multiple documented IP streams. The community pot you contributed to is funding new Seedlings. The 20% infrastructure you helped sustain is protecting a new generation of creators.',
    timeframe: 'Year 3+',
    earnings: '£10,000+/mo sovereign',
    markers: [
      'Oral history archived',
      'Community pot funded three new Seedlings',
      'IP generating recurring passive income',
      'Recognised as cultural reference point',
    ],
  },
];

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Excavation',
    desc: 'Session one names the asset. Provenance document started. Cultural lineage identified.',
    colour: '#d4a853',
  },
  {
    step: '02',
    title: 'Refinement',
    desc: 'Programme workshops sharpen the craft. PageTurners embeds the narrative. Asset becomes product.',
    colour: '#3ecfcf',
  },
  {
    step: '03',
    title: 'Documentation',
    desc: 'IP assigned legally. Provenance trail complete. Cultural context authenticated. Oral history archived.',
    colour: '#9b7fe8',
  },
  {
    step: '04',
    title: 'Publication',
    desc: 'Marketplace listing live. Rayd-yo or Joystick broadcast. Premium pricing applied. First real sale.',
    colour: '#4ade80',
  },
  {
    step: '05',
    title: 'Compounding',
    desc: 'Cross-programme combinations multiply value. Mentoring adds income. Provenance appreciates over time.',
    colour: '#f97316',
  },
];

const COMBINATIONS = [
  {
    progs: ['Trubble n Bass', 'G-Tech Casters', 'Pageturners'],
    result: 'Music producer + broadcaster + cultural writer = media production unit',
    earnings: '£6,000–12,000/mo at full actualisation',
    colour: '#a855f7',
  },
  {
    progs: ['Auntie Anansi\'s Kitchen', 'Pageturners'],
    result: 'Heritage recipe documentation + oral history = premium cultural product',
    earnings: '£3,000–8,000/mo including digital products',
    colour: '#f59e0b',
  },
  {
    progs: ['Silk Stilettos', 'Kaywana\'s Court'],
    result: 'Designer + advocate = cultural fashion with documented provenance',
    earnings: '£5,000–15,000/mo at premium positioning',
    colour: '#ec4899',
  },
  {
    progs: ['STEMgeneers', 'TECHreneurs'],
    result: 'Repair intelligence + business model = recurring service revenue',
    earnings: '£4,000–9,000/mo with membership clients',
    colour: '#10b981',
  },
];

const HONEST_TRUTHS = [
  'Not every creator reaches Elder. Some stop at Journeyman and build a sustainable life there. That\'s a success, not a failure.',
  'The earnings figures are achievable for creators who combine programmes and commit to provenance documentation. Single-programme, undocumented work earns less.',
  'Cultural recognition and economic actualisation usually develop together but not always in sync. Some creators earn well before gaining institutional recognition. Some are culturally recognised before achieving full sovereign earnings.',
  'The 25% community contribution means your success funds the next Seedling\'s start. That\'s not charity. That\'s the system sustaining itself.',
  'Elders who mentor actively tend to sustain their earnings longer. Knowledge transfer is itself a premium product.',
];

const JourneyPage: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string>('seedling');
  const active = CC_STAGES.find(s => s.id === activeStage)!;

  return (
    <div className="jp">

      {/* ── HERO ── */}
      <section className="jp-hero">
        <div className="jp-hero-bg">
          <div className="jp-orb jp-orb--1" />
          <div className="jp-orb jp-orb--2" />
        </div>
        <div className="jp-hero-content">
          <span className="jp-label">The arc</span>
          <h1 className="jp-hero-title">
            Not a programme.<br />
            <em>A becoming.</em>
          </h1>
          <p className="jp-hero-sub">
            The Wembley Wonders journey runs on two parallel tracks —
            cultural recognition and economic actualisation.
            They compound each other. The Connoisseurs Club is not a
            reward for completing a course. It's the frame for a life's work.
          </p>
          <div className="jp-hero-tracks">
            <div className="jp-track-pill jp-track-pill--gold">
              <span>Cultural recognition</span>
              <span>Seedling → Elder</span>
            </div>
            <div className="jp-track-connector">+</div>
            <div className="jp-track-pill jp-track-pill--teal">
              <span>Economic actualisation</span>
              <span>£500 → £10,000+/mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNOISSEURS CLUB STAGES ── */}
      <section className="jp-section">
        <div className="jp-container">
          <span className="jp-label">The Connoisseurs Club</span>
          <h2 className="jp-section-title">Five stages. Two tracks each.</h2>
          <p className="jp-section-sub">
            Select a stage to see what's happening culturally and economically at that point.
          </p>

          {/* Stage selector */}
          <div className="jp-stage-nav">
            {CC_STAGES.map(s => (
              <button
                key={s.id}
                className={`jp-stage-btn ${activeStage === s.id ? 'active' : ''}`}
                onClick={() => setActiveStage(s.id)}
              >
                <span className="jp-stage-btn-icon">{s.icon}</span>
                <span className="jp-stage-btn-title">{s.title}</span>
                <span className="jp-stage-btn-time">{s.timeframe}</span>
              </button>
            ))}
          </div>

          {/* Stage detail */}
          <div className="jp-stage-detail">
            <div className="jp-stage-header">
              <div className="jp-stage-icon-lg">{active.icon}</div>
              <div>
                <h3 className="jp-stage-title">{active.title}</h3>
                <p className="jp-stage-subtitle">{active.subtitle}</p>
              </div>
              <div className="jp-stage-earnings">
                <span className="jp-earnings-label">At this stage</span>
                <span className="jp-earnings-value">{active.earnings}</span>
                <span className="jp-earnings-period">{active.timeframe}</span>
              </div>
            </div>

            <div className="jp-stage-tracks">
              <div className="jp-track jp-track--cultural">
                <div className="jp-track-label">
                  <span className="jp-track-dot jp-track-dot--gold" />
                  Cultural track
                </div>
                <p>{active.cultural}</p>
              </div>
              <div className="jp-track jp-track--economic">
                <div className="jp-track-label">
                  <span className="jp-track-dot jp-track-dot--teal" />
                  Economic track
                </div>
                <p>{active.economic}</p>
              </div>
            </div>

            <div className="jp-stage-markers">
              <span className="jp-markers-label">Stage markers</span>
              <div className="jp-markers-list">
                {active.markers.map((m, i) => (
                  <div key={i} className="jp-marker">
                    <span className="jp-marker-check">✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROVENANCE PIPELINE ── */}
      <section className="jp-section jp-section--alt">
        <div className="jp-container">
          <span className="jp-label">How it works</span>
          <h2 className="jp-section-title">The provenance-to-product pipeline</h2>
          <p className="jp-section-sub">
            Every stage of the journey builds toward a documented, legally protected,
            premium-priced cultural asset. This is what makes it different from
            a skills programme with a graduation certificate.
          </p>

          <div className="jp-pipeline">
            {PIPELINE_STEPS.map((p, i) => (
              <div key={i} className="jp-pipeline-step" style={{ '--pipe-colour': p.colour } as React.CSSProperties}>
                <div className="jp-pipe-num">{p.step}</div>
                <div className="jp-pipe-content">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="jp-pipe-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-PROGRAMME COMBINATIONS ── */}
      <section className="jp-section">
        <div className="jp-container">
          <span className="jp-label">The wealth engine</span>
          <h2 className="jp-section-title">
            Cross-programme combinations<br />multiply value.
          </h2>
          <p className="jp-section-sub">
            A single programme gets you started. Two or more in combination
            build a defensible position the mainstream market cannot replicate.
          </p>

          <div className="jp-combos">
            {COMBINATIONS.map((c, i) => (
              <div key={i} className="jp-combo" style={{ '--combo-colour': c.colour } as React.CSSProperties}>
                <div className="jp-combo-progs">
                  {c.progs.map((p, pi) => (
                    <React.Fragment key={pi}>
                      <span className="jp-combo-prog">{p}</span>
                      {pi < c.progs.length - 1 && (
                        <span className="jp-combo-plus">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="jp-combo-result">{c.result}</p>
                <span className="jp-combo-earnings">{c.earnings}</span>
              </div>
            ))}
          </div>

          <p className="jp-combos-note">
            These are examples, not prescriptions. The actual combination that
            serves you best depends on what you carry. The GetStarted excavation
            identifies your primary asset first — combinations emerge from there.
          </p>
        </div>
      </section>

      {/* ── THE HONEST PICTURE ── */}
      <section className="jp-section jp-section--alt">
        <div className="jp-container">
          <span className="jp-label">Before you commit</span>
          <h2 className="jp-section-title">
            What we will tell you<br />that most platforms won't.
          </h2>

          <div className="jp-truths">
            {HONEST_TRUTHS.map((t, i) => (
              <div key={i} className="jp-truth">
                <span className="jp-truth-n">{String(i + 1).padStart(2, '0')}</span>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT ELDERS DO ── */}
      <section className="jp-section">
        <div className="jp-container">
          <span className="jp-label">The long view</span>
          <h2 className="jp-section-title">
            Graduation isn't the end.<br />
            It's the beginning of the work that matters.
          </h2>

          <div className="jp-elder-paths">
            <div className="jp-elder-path">
              <span className="jp-elder-icon">🌳</span>
              <h3>Cultural elder</h3>
              <p>
                Your oral history is in the archive. Your lineage documentation
                is referenced by researchers, broadcasters, institutions.
                You are part of the cultural infrastructure that outlasts you.
              </p>
            </div>
            <div className="jp-elder-path">
              <span className="jp-elder-icon">🔨</span>
              <h3>Sovereign creator</h3>
              <p>
                Multiple IP streams generating recurring income. The platform
                depends on your content, not the reverse. Premium pricing
                sustained because provenance is unimpeachable.
              </p>
            </div>
            <div className="jp-elder-path">
              <span className="jp-elder-icon">🤝</span>
              <h3>Ecosystem builder</h3>
              <p>
                The 25% you contributed is now funding new Seedlings.
                You are mentoring the next generation of creators.
                The infrastructure you helped build is protecting people
                who haven't arrived yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="jp-cta">
        <div className="jp-container">
          <div className="jp-cta-inner">
            <h2 className="jp-cta-title">
              Where does your journey start?
            </h2>
            <p className="jp-cta-sub">
              Not at the beginning of a programme. At the moment you name
              what you already carry.
            </p>
            <div className="jp-cta-btns">
              <Link to="/get-started" className="jp-btn jp-btn--primary">
                Start the excavation →
              </Link>
              <Link to="/programmes/bright-sparks" className="jp-btn jp-btn--outline">
                Begin with Bright Sparks
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default JourneyPage;