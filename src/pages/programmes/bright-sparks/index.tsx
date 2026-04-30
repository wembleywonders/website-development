/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Bright Sparks Programme Page
 *
 * CHANGE LOG (April 2026):
 *   - Wild West track added as 3rd entry path alongside 'new' and 'migrating'
 *   - 3-screen triage sequence: Recognition → Reorientation → Routing
 *   - Wild West challenges added — filtered to TECHreneurs + G-Tech Casters territory
 *   - Maya routing note surfaces at end of triage (Anansi ROV briefing)
 *   - PathwayPreview component preserved above track selector unchanged
 *   - useLearnerHelp wired into challenge sandbox trigger points (unchanged)
 *   - activity-step-failed-twice → Maya surfaces "Try it this way"
 *   - activity-completed-first-attempt → Maya surfaces "Try the harder version"
 *   - Spelling: stemgeneers confirmed canonical throughout
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearnerHelp } from '../../../hooks/useLearnerHelp';
import HelpPanel from '../../../components/learnerHelp/HelpPanel';
import './BrightSparksPage.css';
import { Programme } from '@/data/programmeSchedule';

// ============================================
// PATHWAY PREVIEW — pre-track component
// (unchanged)
// ============================================

const BRIGHT_SPARKS_PATHWAY = {
  zone1: 'Bright Sparks',
  zone2: 'Rayd-yo + Membership',
  description: 'Community broadcasting, facilitation, member events',
  fiveYearCeiling: '£2,800/mo',
  independence: 'Month 30–36 (most stable long-term base of any pathway)',
  splitNote: '55% of everything you earn through Zone 2 comes directly to you.'
};

interface PathwayPreviewProps {
  onDismiss: () => void;
}

const PathwayPreview: React.FC<PathwayPreviewProps> = ({ onDismiss }) => (
  <div className="pathway-preview">
    <div className="preview-header">
      <h3 className="preview-title">Before you choose a track — here's where this leads</h3>
      <button className="preview-dismiss" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
    <p className="preview-intro">
      Bright Sparks is Zone 1 — the skill-building phase. What you're really choosing
      is the income path it unlocks. Here's the honest picture:
    </p>
    <div className="preview-pathway">
      <div className="preview-zone preview-zone--1">
        <span className="preview-zone-label">Zone 1 · Learn</span>
        <span className="preview-zone-name">{BRIGHT_SPARKS_PATHWAY.zone1}</span>
        <span className="preview-zone-note">This is where you are now. No income yet — this is runway.</span>
      </div>
      <span className="preview-arrow">→</span>
      <div className="preview-zone preview-zone--2">
        <span className="preview-zone-label">Zone 2 · Create &amp; Earn</span>
        <span className="preview-zone-name">{BRIGHT_SPARKS_PATHWAY.zone2}</span>
        <span className="preview-zone-note">{BRIGHT_SPARKS_PATHWAY.description}</span>
      </div>
    </div>
    <div className="preview-stats">
      <div className="preview-stat">
        <span className="stat-label">5-year ceiling</span>
        <span className="stat-value">{BRIGHT_SPARKS_PATHWAY.fiveYearCeiling}</span>
      </div>
      <div className="preview-stat">
        <span className="stat-label">Independence reached</span>
        <span className="stat-value">{BRIGHT_SPARKS_PATHWAY.independence}</span>
      </div>
      <div className="preview-stat preview-stat--wide">
        <span className="stat-label">Revenue split</span>
        <span className="stat-value">{BRIGHT_SPARKS_PATHWAY.splitNote}</span>
      </div>
    </div>
    <div className="preview-actions">
      <Link to="/creator-pathways" className="preview-link-full">See all earning paths →</Link>
      <button className="preview-continue" onClick={onDismiss}>I'm ready — show me the tracks</button>
    </div>
  </div>
);

// ============================================
// WILD WEST TRIAGE — 3-screen sequence
// Recognition → Reorientation → Routing
// ============================================

type TriageScreen = 1 | 2 | 3;

interface WildWestTriageProps {
  onComplete: () => void;
  onBack: () => void;
}

const WildWestTriage: React.FC<WildWestTriageProps> = ({ onComplete, onBack }) => {
  const [screen, setScreen] = useState<TriageScreen>(1);

  const next = () => setScreen(s => (s < 3 ? (s + 1) as TriageScreen : 3));
  const prev = () => {
    if (screen === 1) onBack();
    else setScreen(s => (s - 1) as TriageScreen);
  };

  return (
    <div className="ww-triage">

      {/* Progress indicator */}
      <div className="ww-triage__progress">
        {([1, 2, 3] as TriageScreen[]).map(n => (
          <div
            key={n}
            className={`ww-triage__step ${screen === n ? 'active' : ''} ${screen > n ? 'done' : ''}`}
          >
            <div className="ww-step-dot">{screen > n ? '✓' : n}</div>
            <span className="ww-step-label">
              {n === 1 ? 'Recognition' : n === 2 ? 'Reorientation' : 'Routing'}
            </span>
          </div>
        ))}
        <div className="ww-triage__track" />
      </div>

      {/* Screen 1 — Recognition */}
      {screen === 1 && (
        <div className="ww-screen ww-screen--recognition">
          <div className="ww-screen__badge">Does this sound familiar?</div>
          <h2>You built something for someone else.</h2>
          <p className="ww-screen__lead">
            You edited the videos. Ran the streams. Managed the community. 
            Did the shoots. Kept the channel alive while they took the credit.
          </p>
          <div className="ww-pattern-list">
            <div className="ww-pattern-item">
              <span className="ww-pattern-icon">📋</span>
              <div>
                <strong>No contract.</strong>
                <span> "We'll sort the details later" — and then later never came.</span>
              </div>
            </div>
            <div className="ww-pattern-item">
              <span className="ww-pattern-icon">💸</span>
              <div>
                <strong>Chasing payment.</strong>
                <span> Cash App, Chime, personal accounts. Three weeks late. Then a thumbs up emoji.</span>
              </div>
            </div>
            <div className="ww-pattern-item">
              <span className="ww-pattern-icon">👻</span>
              <div>
                <strong>Ghosted when you asked.</strong>
                <span> They were live on Twitch while you were waiting on rent money.</span>
              </div>
            </div>
            <div className="ww-pattern-item">
              <span className="ww-pattern-icon">🎯</span>
              <div>
                <strong>No protection.</strong>
                <span> No legal recourse. No paper trail. Just a hit piece video that 
                everyone moved on from in a week.</span>
              </div>
            </div>
          </div>
          <p className="ww-screen__affirm">
            This is a documented pattern across the creator economy — not your fault, 
            not a one-off. You're in the right place.
          </p>
          <div className="ww-screen__actions">
            <button className="ww-btn ww-btn--secondary" onClick={prev}>← Back</button>
            <button className="ww-btn ww-btn--primary" onClick={next}>
              Yes, that's me — what now? →
            </button>
          </div>
        </div>
      )}

      {/* Screen 2 — Reorientation */}
      {screen === 2 && (
        <div className="ww-screen ww-screen--reorientation">
          <div className="ww-screen__badge">What you were actually worth</div>
          <h2>Your skills had market value.<br />The structure didn't reflect that.</h2>
          <p className="ww-screen__lead">
            The problem wasn't your work. The problem was the architecture around it — 
            no contracts, no payment rails, one person's ego where a system should have been.
          </p>

          <div className="ww-contrast">
            <div className="ww-contrast__side ww-contrast__side--bad">
              <h3>What you experienced</h3>
              <ul>
                <li>Verbal agreement — nothing in writing</li>
                <li>Payment whenever they felt like it</li>
                <li>Your income depended on one person's mood</li>
                <li>No record of what you built or contributed</li>
                <li>All risk on you. All upside on them.</li>
              </ul>
            </div>
            <div className="ww-contrast__side ww-contrast__side--good">
              <h3>What fair looks like</h3>
              <ul>
                <li>55% of revenue goes directly to the creator</li>
                <li>25% flows into a community fund — not one person's pocket</li>
                <li>Stripe-integrated payments — not someone's personal account</li>
                <li>Blockchain-verified earnings record, exportable</li>
                <li>CIC accountability — registered, governed, transparent</li>
              </ul>
            </div>
          </div>

          <div className="ww-principle">
            <div className="ww-principle__icon">⚖️</div>
            <div>
              <strong>The 55/25/20 model is the reference point.</strong>
              <p>
                55% to you. 25% to the community that made your work possible. 
                20% to keep the platform running. That's what a fair distribution looks like — 
                written down, documented, and the same for everyone.
              </p>
            </div>
          </div>

          <div className="ww-screen__actions">
            <button className="ww-btn ww-btn--secondary" onClick={prev}>← Back</button>
            <button className="ww-btn ww-btn--primary" onClick={next}>
              Where do I go from here? →
            </button>
          </div>
        </div>
      )}

      {/* Screen 3 — Routing */}
      {screen === 3 && (
        <div className="ww-screen ww-screen--routing">
          <div className="ww-screen__badge">Your starting point</div>
          <h2>You don't start from zero.<br />You start from experience.</h2>
          <p className="ww-screen__lead">
            What you built in the Wild West was real work. The skills are real. 
            The gaps were in the structure around you — not in you. 
            Here's where those skills plug in on proper rails.
          </p>

          <div className="ww-routes">
            <div className="ww-route-card ww-route-card--techreneurs">
              <div className="ww-route-card__header">
                <span className="ww-route-card__emoji">🔗</span>
                <div>
                  <h3>TECHreneurs</h3>
                  <span className="ww-route-card__tag">Ecosystem Economics</span>
                </div>
              </div>
              <p>
                Understand why the Wild West operates the way it does — and how to 
                build on proper economic rails instead. Contracts, payment structures, 
                B2B relationships, the pardner model. Start here if you want to understand 
                the economics before you build again.
              </p>
              <Link to="/programmes/techreneurs" className="ww-route-card__link">
                Go to TECHreneurs →
              </Link>
            </div>

            <div className="ww-route-card ww-route-card--gtechcasters">
              <div className="ww-route-card__header">
                <span className="ww-route-card__emoji">🎙️</span>
                <div>
                  <h3>G-Tech Casters</h3>
                  <span className="ww-route-card__tag">Production on Proper Rails</span>
                </div>
              </div>
              <p>
                You already know how to produce. G-Tech Casters gives you the platform 
                economics layer — what your content is worth, who owns what, how to 
                structure media partnerships that don't exploit you. Start here if you're 
                ready to create again, but differently.
              </p>
              <Link to="/programmes/g-tech-casters" className="ww-route-card__link">
                Go to G-Tech Casters →
              </Link>
            </div>

            <div className="ww-route-card ww-route-card--challenges">
              <div className="ww-route-card__header">
                <span className="ww-route-card__emoji">⚡</span>
                <div>
                  <h3>Wild West Challenges</h3>
                  <span className="ww-route-card__tag">Try Before You Commit</span>
                </div>
              </div>
              <p>
                Not sure yet? Try the challenges below — built specifically for people 
                coming from the creator economy who need to recalibrate before they 
                decide where to go next.
              </p>
              <button className="ww-route-card__link ww-route-card__link--btn" onClick={onComplete}>
                Try the challenges →
              </button>
            </div>
          </div>

          {/* Maya routing note */}
          <div className="ww-maya-note">
            <span className="ww-maya-note__avatar">🕷️</span>
            <div className="ww-maya-note__content">
              <strong>Maya will pick this up from here.</strong>
              <p>
                Based on where you've come from, Maya will route you through the platform 
                with your context already established — so you don't have to explain yourself 
                every time. The Anansi thread runs through everything.
              </p>
            </div>
          </div>

          <div className="ww-screen__actions">
            <button className="ww-btn ww-btn--secondary" onClick={prev}>← Back</button>
            <button className="ww-btn ww-btn--primary" onClick={onComplete}>
              Start the challenges →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// TYPES
// ============================================

type Track = 'new' | 'migrating' | 'wild-west' | null;

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'starter' | 'intermediate' | 'advanced';
  estimatedTime: string;
  skills: string[];
  sandbox?: boolean;
}

// ============================================
// CHALLENGE DATA
// Wild West challenges added as 3rd track
// ============================================

const CHALLENGES: Record<string, Challenge[]> = {
  new: [
    {
      id: 'bs-new-01',
      title: 'Community Signal',
      description: "Write 150-200 words about something happening in your area that most people don't know about. Be specific — name the street, the person, the thing. This is your first Rayd-yo submission. Audio version coming when you're ready.",
      difficulty: 'starter',
      estimatedTime: '1 hour',
      skills: ['Observation', 'Writing for broadcast', 'Community awareness'],
      sandbox: true
    },
    {
      id: 'bs-new-02',
      title: 'The Five Questions',
      description: "Interview someone in your community for 10 minutes. Edit it down to the most interesting 3 minutes. What did you learn that surprised you?",
      difficulty: 'starter',
      estimatedTime: '3 hours',
      skills: ['Interviewing', 'Audio editing', 'Active listening'],
      sandbox: true
    },
    {
      id: 'bs-new-03',
      title: 'Map Your Network',
      description: "Draw (literally or digitally) the web of people you know who create, build, or organise things. Who connects to whom? What's missing?",
      difficulty: 'starter',
      estimatedTime: '1 hour',
      skills: ['Network mapping', 'Community analysis', 'Strategic thinking']
    }
  ],
  migrating: [
    {
      id: 'bs-mig-01',
      title: 'Translate Your CV',
      description: "Take your three strongest professional skills and write a 200-word pitch for each that speaks to a creative community audience, not an employer.",
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      skills: ['Communication', 'Self-positioning', 'Audience awareness']
    },
    {
      id: 'bs-mig-02',
      title: 'The Knowledge Audit',
      description: "List everything you know that younger or less experienced people in your field would pay to learn. Which of these could become a Zone 2 product?",
      difficulty: 'intermediate',
      estimatedTime: '1.5 hours',
      skills: ['Knowledge mapping', 'Product thinking', 'Income planning']
    },
    {
      id: 'bs-mig-03',
      title: 'Counter-Archive Entry',
      description: "Submit one piece of knowledge, expertise, or community memory to the Roots Knowledge Archive. Write the provenance statement — where did this come from, and who should be credited?",
      difficulty: 'advanced',
      estimatedTime: '3 hours',
      skills: ['Documentation', 'Attribution', 'Archive practice'],
      sandbox: true
    }
  ],

  // Wild West track — calibrated for creator economy workers reorienting
  'wild-west': [
    {
      id: 'bs-ww-01',
      title: 'The Red Flag Audit',
      description: "Look back at your last creator economy role. List every moment something felt wrong — payment, communication, respect, ownership. Then map each one to the structural failure behind it. This isn't about blame. It's about pattern recognition so it doesn't happen again.",
      difficulty: 'starter',
      estimatedTime: '1 hour',
      skills: ['Pattern recognition', 'Economic literacy', 'Self-protection'],
      sandbox: true
    },
    {
      id: 'bs-ww-02',
      title: 'What Was Your Work Worth?',
      description: "Take one piece of work you did in the creator economy — one video edited, one stream managed, one channel built. Research the market rate for that work as a freelance service. Write up the gap between what you received and what the market would have paid. This is your opening number for any future negotiation.",
      difficulty: 'intermediate',
      estimatedTime: '2 hours',
      skills: ['Market research', 'Pricing literacy', 'Negotiation baseline']
    },
    {
      id: 'bs-ww-03',
      title: 'Draft Your First Contract Clause',
      description: "Using TECHreneurs resources, draft three clauses you would require in any future creator economy agreement: payment terms, ownership of work produced, and what happens if the relationship ends. Plain English. No legal jargon. Something you could hand to someone and they'd understand it.",
      difficulty: 'advanced',
      estimatedTime: '2.5 hours',
      skills: ['Contract basics', 'Work ownership', 'Payment protection'],
      sandbox: true
    },
    {
      id: 'bs-ww-04',
      title: 'Map Your Transferable Skills',
      description: "Everything you did in the creator economy maps to something in the broader ecosystem. Video editing maps to media production. Community management maps to B2B relationship work. Channel management maps to project coordination. Map your skills to the Brent business ecosystem — who needs what you know?",
      difficulty: 'intermediate',
      estimatedTime: '1.5 hours',
      skills: ['Skills translation', 'B2B positioning', 'Ecosystem thinking']
    }
  ]
};

// ============================================
// CHALLENGE SANDBOX — with useLearnerHelp wired
// (unchanged)
// ============================================

interface ChallengeSandboxProps {
  challenge: Challenge;
  onBack: () => void;
}

const ChallengeSandbox: React.FC<ChallengeSandboxProps> = ({ challenge, onBack }) => {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const { onLearnerNeedsHelp, activeHelp, dismissHelp, openTutorialAt } =
    useLearnerHelp('bright-sparks', `challenge-${challenge.id}`);

  const handleSubmit = () => {
    if (content.trim().length <= 20) {
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);
      if (newCount >= 2) {
        onLearnerNeedsHelp('activity-step-failed-twice', {
          currentContent: {
            type: 'activity',
            id: challenge.id,
            label: challenge.title,
          },
          attemptCount: newCount,
        });
      }
      return;
    }
    setSubmitted(true);
    onLearnerNeedsHelp('activity-completed-first-attempt', {
      currentContent: {
        type: 'activity',
        id: challenge.id,
        label: challenge.title,
      },
    });
  };

  if (submitted) {
    return (
      <div className="sandbox-confirmation">
        <span className="confirmation-icon">✓</span>
        <p>
          Submitted and logged. Your authorship is recorded in the
          counter-archive. This is the beginning of your provenance record.
        </p>
        <Link to="/roots" className="confirmation-link">View your archive entries →</Link>
      </div>
    );
  }

  return (
    <div className="challenge-sandbox">
      <label className="sandbox-label">
        Your response (text for now — audio upload coming soon)
      </label>
      <textarea
        className="sandbox-input"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your response here. This will be logged to the counter-archive with your authorship timestamp."
        rows={6}
      />
      {attemptCount > 0 && content.trim().length <= 20 && (
        <p className="sandbox-hint">At least 20 characters needed to submit.</p>
      )}
      <button className="sandbox-submit-btn" onClick={handleSubmit}>
        Submit to Bright Sparks archive
      </button>

      {activeHelp && (
        <HelpPanel
          help={activeHelp}
          onDismiss={dismissHelp}
          onOpenTutorial={openTutorialAt}
        />
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const BrightSparksPage: React.FC = () => {
  const [showPathwayPreview, setShowPathwayPreview] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<Track>(null);
  const [triageComplete, setTriageComplete] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  const handleDismissPreview = () => setShowPathwayPreview(false);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setTriageComplete(false);
    setActiveChallenge(null);
  };

  const handleTriageComplete = () => setTriageComplete(true);

  const handleChallengeSelect = (challenge: Challenge) => {
    setActiveChallenge(challenge);
  };

  // Determine which challenges to show
  const activeChallengeKey =
    selectedTrack === 'wild-west' ? 'wild-west' : selectedTrack ?? 'new';

  // Wild West track — show triage first, then challenges
  const showWildWestTriage =
    selectedTrack === 'wild-west' && !triageComplete;

  return (
    <div className="bright-sparks-page">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="bs-hero">
        <div className="bs-hero-badge">Zone 1 · Learn</div>
        <h1 className="bs-hero-title">Bright Sparks</h1>
        <p className="bs-hero-sub">
          Where the platform meets you — regardless of where you're starting from.
          No prior experience required. No credentials checked.
          What you make here is evidence. The counter-archive logs it from day one.
        </p>
      </section>

      {/* ── PATHWAY PREVIEW ──────────────────────────────────────────── */}
      {showPathwayPreview && (
        <PathwayPreview onDismiss={handleDismissPreview} />
      )}

      {/* ── TRACK SELECTOR ───────────────────────────────────────────── */}
      {!selectedTrack ? (
        <section className="track-selector">
          <h2 className="track-selector-heading">Which describes you?</h2>
          <div className="track-options track-options--three">

            <button
              className="track-card track-card--new"
              onClick={() => handleTrackSelect('new')}
            >
              <span className="track-icon">🌱</span>
              <span className="track-label">New to this</span>
              <span className="track-desc">
                You're starting fresh — you have something to say but haven't built
                the skills or platform yet.
              </span>
              <span className="track-cta">Start here →</span>
            </button>

            <button
              className="track-card track-card--migrating"
              onClick={() => handleTrackSelect('migrating')}
            >
              <span className="track-icon">🔄</span>
              <span className="track-label">Migrating skills</span>
              <span className="track-desc">
                You have professional experience, qualifications, or built knowledge —
                and you want to translate it into a creator economy income.
              </span>
              <span className="track-cta">Translate what you know →</span>
            </button>

            <button
              className="track-card track-card--wild-west"
              onClick={() => handleTrackSelect('wild-west')}
            >
              <span className="track-icon">⚡</span>
              <span className="track-label">Came from the Wild West</span>
              <span className="track-desc">
                You've worked in the creator economy — editing, managing, producing —
                under handshake agreements with no contracts, no protection, and payment
                that may never have arrived.
              </span>
              <span className="track-cta">Reorient here →</span>
            </button>

          </div>
        </section>

      ) : showWildWestTriage ? (
        /* ── WILD WEST TRIAGE ──────────────────────────────────────── */
        <WildWestTriage
          onComplete={handleTriageComplete}
          onBack={() => handleTrackSelect(null)}
        />

      ) : (
        /* ── CHALLENGE CONTENT ─────────────────────────────────────── */
        <section className="track-content">
          <div className="track-content-header">
            <button className="back-btn" onClick={() => handleTrackSelect(null)}>
              ← Change track
            </button>
            <h2 className="track-content-title">
              {selectedTrack === 'new'
                ? 'New to this — starting challenges'
                : selectedTrack === 'migrating'
                ? 'Migrating skills — translation challenges'
                : 'Wild West — reorientation challenges'}
            </h2>
          </div>

          {/* Wild West context strip */}
          {selectedTrack === 'wild-west' && (
            <div className="ww-context-strip">
              <span>⚡</span>
              <p>
                These challenges are calibrated for people coming from the creator economy.
                They're designed to help you name what happened, understand your market value,
                and map your skills to the Brent ecosystem — on proper rails this time.
              </p>
            </div>
          )}

          {!activeChallenge ? (
            <div className="challenge-list">
              {CHALLENGES[activeChallengeKey].map(challenge => (
                <button
                  key={challenge.id}
                  className={`challenge-card${selectedTrack === 'wild-west' ? ' challenge-card--ww' : ''}`}
                  onClick={() => handleChallengeSelect(challenge)}
                >
                  <div className="challenge-card-header">
                    <span className="challenge-title">{challenge.title}</span>
                    <span className={`challenge-difficulty difficulty--${challenge.difficulty}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="challenge-desc">{challenge.description}</p>
                  <div className="challenge-meta">
                    <span className="challenge-time">⏱ {challenge.estimatedTime}</span>
                    <span className="challenge-skills">
                      {challenge.skills.slice(0, 2).join(' · ')}
                    </span>
                    {challenge.sandbox && (
                      <span className="challenge-sandbox-badge">📤 Submit to platform</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="active-challenge">
              <button className="back-btn" onClick={() => setActiveChallenge(null)}>
                ← Back to challenges
              </button>
              <div className="challenge-detail">
                <h3 className="challenge-detail-title">{activeChallenge.title}</h3>
                <p className="challenge-detail-desc">{activeChallenge.description}</p>
                <div className="challenge-skills-list">
                  {activeChallenge.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
                {activeChallenge.sandbox ? (
                  <ChallengeSandbox
                    challenge={activeChallenge}
                    onBack={() => setActiveChallenge(null)}
                  />
                ) : (
                  <div className="challenge-no-sandbox">
                    <p>Complete this challenge offline, then return to log what you made.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── PROGRAMME INFO FOOTER ────────────────────────────────────── */}
      <section className="bs-info-footer">
        <div className="bs-info-grid">
          <div className="bs-info-item">
            <span className="bs-info-label">Programme type</span>
            <span className="bs-info-value">Year-round · Drop-in</span>
          </div>
          <div className="bs-info-item">
            <span className="bs-info-label">Time commitment</span>
            <span className="bs-info-value">2–3 hours/week</span>
          </div>
          <div className="bs-info-item">
            <span className="bs-info-label">Cost</span>
            <span className="bs-info-value">Free to participate</span>
          </div>
          <div className="bs-info-item">
            <span className="bs-info-label">Next step</span>
            <span className="bs-info-value">Zone 2 — when you're ready</span>
          </div>
        </div>
        <div className="bs-next-steps">
          <Link to="/creator-pathways" className="btn-secondary">Find your earning path →</Link>
          <Link to="/membership" className="btn-text">Explore membership</Link>
        </div>
      </section>

    </div>
  );
};

export default BrightSparksPage;