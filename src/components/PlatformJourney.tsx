import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PlatformJourney.module.css';

// ============================================================
// PLATFORM JOURNEY — The 5Cs Arc
// ============================================================
// Copy upgraded April 2026 — phrases finalised:
//   Connect   → I find my pardners.
//   Create    → I make something useful.
//   Change    → Change is my reward.
//   Challenge → Challenges are both inevitable and survivable.
//   Control   → What I own matters here.
//
// Each stage body names the fear, dissolves it, opens the door.
// Judith's voice throughout. No jargon. No pity. Bold and bright.
// ============================================================

const STAGES = [
  {
    id:      'connect',
    c:       'Connect',
    phrase:  'I find my pardners.',
    heading: 'Complementary people. Real mutual aid.',
    body:    "However you got here — whether you've been in this community for twenty years or this morning was the morning everything changed — the platform's first job is to find you complementary pardners. People you can rely on. People who understand what you carry and are building something adjacent to it. Not a network. Not a directory. A pardner hand. The foundation of the journey from wage-dependence to income you actually own.",
    detail:  'Community hubs · Mutual aid · Onboarding · Referrals · Partnerships · The Passionistas · The Connoisseurs',
    colour:  '#1D9E75',
    glow:    'rgba(29,158,117,0.15)',
    cta:     'Find your hub',
    ctaHref: '/connect',
  },
  {
    id:      'create',
    c:       'Create',
    phrase:  'I make something useful.',
    heading: 'Your knowledge becomes currency.',
    body:    "Create is where what you carry stops being invisible. Where a trichologist becomes a teacher. Where twenty years of community work becomes a programme people pay to join. Where the skills a redundancy letter just called surplus turn out to be exactly what the room needed. 55% yours. No extraction. No revocation.",
    detail:  "Kaywana's Court · Trubble n Bass · Pageturners · Rayd-yo · Joystick · Auntie Anansi's Kitchen · STEMgeneers",
    colour:  '#0ea5e9',
    glow:    'rgba(14,165,233,0.15)',
    cta:     'Start creating',
    ctaHref: '/programmes',
  },
  {
    id:      'change',
    c:       'Change',
    phrase:  'Change is my reward.',
    heading: 'You were always more than your job title.',
    body:    "Most people are told that change is the problem — something to survive, manage, recover from. Here it's the opposite. Change is what you came to claim. The skills a redundancy letter called surplus. The knowledge a mainstream platform never had a category for. The craft that was always yours and is now, finally, visible. From here, change isn't what happened to you. It's what you walked in here to do.",
    detail:  'Community investment · Civic engagement · Policy influence · Social innovation · Impact tracking · The 20% community fund',
    colour:  '#a855f7',
    glow:    'rgba(168,85,247,0.15)',
    cta:     'See the impact',
    ctaHref: '/impact',
  },
  {
    id:      'challenge',
    c:       'Challenge',
    phrase:  'Challenges are both inevitable and survivable.',
    heading: 'You will not be destroyed by this.',
    body:    "Challenges are inevitable. The economy shifted. The industry moved. The email arrived at 6am. None of that is the end of the story — it's the condition that made this possible. Challenge is where you find out what you're actually capable of, without betting the mortgage on it. Hackathons, showcases, collaborations, competitions. A community that holds you to your potential because it has something at stake in your success. You survive. Then you do more than survive.",
    detail:  'Hackathons · Tournaments · Showcases · Gamification · The Connoisseurs stages · G-Tech Casters · TECHreneurs · Impact Labs',
    colour:  '#f59e0b',
    glow:    'rgba(245,158,11,0.15)',
    cta:     'Take the challenge',
    ctaHref: '/programmes/creator-factory',
  },
  {
    id:      'control',
    c:       'Control',
    phrase:  'What I own matters here.',
    heading: 'This is what every other platform withholds.',
    body:    "Control means what you build here is yours. Not subject to a budget decision. Not revocable by email. Self-enterprise on your own terms, inside a 55/25/20 model that puts the creator first and funds the community that held you when you arrived. You don't work for Wembley Wonders. You build with us. And what you build, you keep.",
    detail:  'Self-enterprise · Collective ownership · 55/25/20 revenue · IP protection · The counter-archive · Family Knowledge = Family Investment',
    colour:  '#ef4444',
    glow:    'rgba(239,68,68,0.15)',
    cta:     'Own your future',
    ctaHref: '/auth/signup',
  },
];

const PlatformJourney: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeStage = activeIndex !== null ? STAGES[activeIndex] : null;

  return (
    <section className={styles.journey}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.sectionLabel}>Your journey</span>
          <h2 className={styles.sectionTitle}>A pathway, not a menu.</h2>
          <p className={styles.sectionSub}>
            Five stages. One arc. Whoever you are when you arrive,
            this is where you go next.
          </p>
        </div>

        <div className={styles.arc}>
          {STAGES.map((stage, i) => (
            <React.Fragment key={stage.id}>
              <button
                className={`${styles.stageNode} ${activeIndex === i ? styles.stageNodeActive : ''}`}
                style={{ '--stage-colour': stage.colour, '--stage-glow': stage.glow } as React.CSSProperties}
                onClick={() => setActiveIndex(prev => prev === i ? null : i)}
              >
                <span className={styles.stageC}>{stage.c}</span>
                <span className={styles.stagePhrase}>{stage.phrase}</span>
              </button>
              {i < STAGES.length - 1 && (
                <div
                  className={`${styles.arcArrow} ${activeIndex !== null && activeIndex > i ? styles.arcArrowPassed : ''}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {activeStage && (
          <div
            className={styles.stagePanel}
            style={{ '--stage-colour': activeStage.colour, '--stage-glow': activeStage.glow } as React.CSSProperties}
          >
            <div className={styles.stagePanelInner}>
              <div className={styles.stagePanelLeft}>
                <div className={styles.stagePanelC}>{activeStage.c}</div>
                <h3 className={styles.stagePanelHeading}>{activeStage.heading}</h3>
                <p className={styles.stagePanelBody}>{activeStage.body}</p>
                <Link to={activeStage.ctaHref} className={styles.stagePanelCta}>
                  {activeStage.cta} →
                </Link>
              </div>
              <div className={styles.stagePanelRight}>
                <div className={styles.stagePanelLabel}>What lives here</div>
                <div className={styles.stagePanelDetail}>
                  {activeStage.detail.split(' · ').map(item => (
                    <span key={item} className={styles.stagePanelTag}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.riches}>
          <div className={styles.richesPhrase}>
            <span>I find my pardners.</span><span className={styles.richesDot} />
            <span>I make something useful.</span><span className={styles.richesDot} />
            <span>Change is my reward.</span><span className={styles.richesDot} />
            <span>Challenges are both inevitable and survivable.</span><span className={styles.richesDot} />
            <span>What I own matters here.</span>
          </div>
          <p className={styles.richesClose}>
            Thirty-one words. One complete arc.<br />
            From arrival to ownership. Yours to keep.
          </p>
          <p className={styles.richesTagline}>Family Knowledge = Family Investment.</p>
          <div className={styles.richesCtas}>
            <Link to="/join" className={styles.richesCtaPrimary}>
              Start your journey — join free →
            </Link>
            <Link to="/sandbox" className={styles.richesCtaGhost}>
              Try the sandbox first
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlatformJourney;