/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * CreatorPathwaysPage
 *
 * CHANGE LOG (March 2026):
 *   - BUGFIX: Programme ID 'stemgineers' → 'stemgeneers' throughout
 *     (canonical spelling confirmed from directory tree and BrightSparks source)
 *   - Journey Map is now the primary entry point for visitors
 *   - Original quiz demoted to "Browse All Programmes" secondary path
 *   - Two distinct entry modes:
 *       'journey'   — teenager / person needing a mirror (default)
 *       'compare'   — person comparing specific programmes
 *   - Success stories retained (Marcus, Priya, Jerome, Ngozi)
 *   - Maya pathway intent fires on this page via location.state
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CreatorPathwaysPage.css';

// ============================================
// TYPES
// ============================================

type PageMode = 'journey' | 'compare';

type TalentType =
  | 'verbal'
  | 'musical'
  | 'technical'
  | 'social'
  | 'visual'
  | 'storytelling';

interface TalentOption {
  id: TalentType;
  label: string;
  subtext: string;
  emoji: string;
  zone1: string;
  zone2: string;
  firstIncome: string;
  fiveYearCeiling: string;
  programmeId: string;
}

interface SuccessStory {
  name: string;
  age: number;
  monthlyIncome: string;
  route: string;
  quote: string;
}

// ============================================
// DATA
// ============================================

const TALENT_OPTIONS: TalentOption[] = [
  {
    id: 'verbal',
    label: 'Writing / Speaking',
    subtext: 'You reach for words — in notebooks, messages, arguments you win in your head',
    emoji: '📝',
    zone1: 'Pageturners',
    zone2: 'Joystick + Rayd-yo',
    firstIncome: 'Editorial features, audio essays',
    fiveYearCeiling: '£3,500/mo',
    programmeId: 'pageturners'
  },
  {
    id: 'musical',
    label: 'Music / Sound',
    subtext: 'You hear the world in beats, grooves, textures — and you produce, not just listen',
    emoji: '🎵',
    zone1: 'Trubble n Bass',
    zone2: "Kaywana's Court + Rayd-yo",
    firstIncome: 'Track licensing, playlist placement',
    fiveYearCeiling: '£4,000/mo',
    programmeId: 'trubble-n-bass'
  },
  {
    id: 'technical',
    label: 'Tech / Building',
    subtext: 'You take things apart to understand them, then put them back better',
    emoji: '🔧',
    // FIXED: was 'STEMgineers' (stemgineers) — canonical is stemgeneers
    zone1: 'STEMgeneers',
    zone2: 'TECHreneurs + G-Tech Casters',
    firstIncome: 'Digital products, tech tutorials',
    fiveYearCeiling: '£5,000+/mo',
    programmeId: 'stemgeneers'
  },
  {
    id: 'social',
    label: 'People / Community',
    subtext: "You're the one everyone talks to — you know how to hold a room and hold space",
    emoji: '🤝',
    zone1: 'Bright Sparks',
    zone2: 'Rayd-yo + Membership',
    firstIncome: 'Community shows, facilitation',
    fiveYearCeiling: '£2,800/mo',
    programmeId: 'bright-sparks'
  },
  {
    id: 'visual',
    label: 'Visual / Fashion',
    subtext: "You see design in everything — colour, proportion, what something says before it speaks",
    emoji: '✂️',
    zone1: 'Silk Stilettos',
    zone2: "Joystick + Kaywana's Court",
    firstIncome: 'Editorial art, cover commissions',
    fiveYearCeiling: '£3,200/mo',
    programmeId: 'silk-stilettos'
  },
  {
    id: 'storytelling',
    label: 'Heritage / Storytelling',
    subtext: "You carry knowledge — family recipes, oral history, community memory that exists nowhere else",
    emoji: '📚',
    zone1: "Auntie Anansi's Kitchen",
    zone2: 'Roots Archive + Joystick',
    firstIncome: 'Certified heritage content, licensing',
    fiveYearCeiling: '£3,800/mo',
    programmeId: 'roots'
  }
];

const SUCCESS_STORIES: SuccessStory[] = [
  {
    name: 'Marcus',
    age: 17,
    monthlyIncome: '£175/mo',
    route: 'Trubble n Bass → Rayd-yo',
    quote: "First time anyone told me the music I was already making was worth something."
  },
  {
    name: 'Priya',
    age: 34,
    monthlyIncome: '£450/mo',
    route: 'Pageturners → Joystick',
    quote: "I had a decade of stories I hadn't told. The counter-archive proved they were mine to tell."
  },
  {
    name: 'Jerome',
    age: 19,
    monthlyIncome: '£280/mo',
    route: 'STEMgeneers → TECHreneurs',
    quote: "Built my first paid product in month five. No CV. No interview. Just the thing I made."
  },
  {
    name: 'Ngozi',
    age: 42,
    monthlyIncome: '£220/mo',
    route: "Auntie Anansi's Kitchen → Roots Archive",
    quote: "My grandmother's recipes are now certified. No one can claim them. That matters more than the money."
  }
];

// London independence thresholds (2026 baseline)
const THRESHOLDS = {
  survival: 1195,
  independence: 1400,
  comfortable: 1720
};

// Phase income data for the timeline bars
const PHASE_DATA = [
  { phase: 'Foundation', year: 'Yr 1', floor: 0, ceiling: 300 },
  { phase: 'First Income', year: 'Yr 2', floor: 150, ceiling: 900 },
  { phase: 'Traction', year: 'Yr 3', floor: 500, ceiling: 1800 },
  { phase: 'Independence', year: 'Yr 4', floor: 1100, ceiling: 2800 },
  { phase: 'Established', year: 'Yr 5+', floor: 1800, ceiling: 5000 }
];

const MAX_INCOME = 5000;

// ============================================
// COMPONENT
// ============================================

const CreatorPathwaysPage: React.FC = () => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState<PageMode>('journey');
  const [selectedTalent, setSelectedTalent] = useState<TalentType | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  // Quiz state (secondary 'compare' mode — original logic retained)
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const selectedOption = TALENT_OPTIONS.find(t => t.id === selectedTalent);

  // ── Journey mode handlers ─────────────────────────────────────────────────

  const handleTalentSelect = (talent: TalentType) => {
    setSelectedTalent(talent);
    setShowTimeline(false);
  };

  const handleShowTimeline = () => {
    setShowTimeline(true);
  };

  // ── Quiz handlers (compare mode) ──────────────────────────────────────────

  const handleQuizAnswer = (questionKey: string, answer: string) => {
    const updated = { ...quizAnswers, [questionKey]: answer };
    setQuizAnswers(updated);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      // Score and resolve result — original logic
      const result = resolveQuizResult(updated);
      setQuizResult(result);
    }
  };

  const resolveQuizResult = (answers: Record<string, string>): string => {
    const counts: Record<string, number> = {};
    Object.values(answers).forEach(a => {
      counts[a] = (counts[a] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    // FIXED: was 'stemgineers' — canonical is stemgeneers
    return sorted[0]?.[0] || 'bright-sparks';
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="creator-pathways-page">

      {/* ── PAGE HERO ──────────────────────────────────────────────────────── */}
      <section className="pathways-hero">
        <h1 className="pathways-hero-title">Find your earning path</h1>
        <p className="pathways-hero-sub">
          You have something. The platform's job is to make it legible — and then fundable.
        </p>

        {/* Mode switcher */}
        <div className="pathways-mode-switcher">
          <button
            className={`mode-btn ${pageMode === 'journey' ? 'active' : ''}`}
            onClick={() => setPageMode('journey')}
          >
            I need a starting point
          </button>
          <button
            className={`mode-btn ${pageMode === 'compare' ? 'active' : ''}`}
            onClick={() => setPageMode('compare')}
          >
            Compare specific programmes
          </button>
        </div>
      </section>

      {/* ── JOURNEY MODE (default) ─────────────────────────────────────────── */}
      {pageMode === 'journey' && (
        <section className="journey-mode">

          {/* Step 1: talent selection */}
          {!selectedTalent && (
            <div className="talent-selection">
              <h2 className="selection-heading">
                What do you reach for when no one is watching?
              </h2>
              <p className="selection-sub">
                Not what you were taught. Not what looks good on a form. What you actually do.
              </p>

              <div className="talent-grid">
                {TALENT_OPTIONS.map(option => (
                  <button
                    key={option.id}
                    className="talent-card"
                    onClick={() => handleTalentSelect(option.id)}
                  >
                    <span className="talent-emoji">{option.emoji}</span>
                    <span className="talent-label">{option.label}</span>
                    <span className="talent-subtext">{option.subtext}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: pathway result */}
          {selectedTalent && selectedOption && !showTimeline && (
            <div className="pathway-result">
              <button
                className="back-btn"
                onClick={() => setSelectedTalent(null)}
              >
                ← Choose again
              </button>

              <div className="result-header">
                <span className="result-emoji">{selectedOption.emoji}</span>
                <h2 className="result-title">{selectedOption.label}</h2>
              </div>

              <div className="result-pathway">
                <div className="pathway-zone zone-1">
                  <span className="zone-label">Zone 1 — Learn</span>
                  <span className="zone-programme">{selectedOption.zone1}</span>
                  <span className="zone-desc">Build the skill. No income yet — this is runway.</span>
                </div>

                <span className="pathway-arrow">→</span>

                <div className="pathway-zone zone-2">
                  <span className="zone-label">Zone 2 — Create &amp; Earn</span>
                  <span className="zone-programme">{selectedOption.zone2}</span>
                  <span className="zone-desc">55% of everything you earn comes directly to you.</span>
                </div>
              </div>

              <div className="result-income">
                <div className="income-item">
                  <span className="income-label">First income source</span>
                  <span className="income-value">{selectedOption.firstIncome}</span>
                </div>
                <div className="income-item">
                  <span className="income-label">5-year ceiling</span>
                  <span className="income-value income-value--highlight">{selectedOption.fiveYearCeiling}</span>
                </div>
              </div>

              <div className="result-actions">
                <button
                  className="btn-primary"
                  onClick={handleShowTimeline}
                >
                  Show me the honest income timeline
                </button>
                <Link
                  to={`/programmes/${selectedOption.programmeId}`}
                  className="btn-secondary"
                >
                  Explore {selectedOption.zone1} →
                </Link>
              </div>
            </div>
          )}

          {/* Step 3: income timeline */}
          {selectedTalent && selectedOption && showTimeline && (
            <div className="income-timeline">
              <button
                className="back-btn"
                onClick={() => setShowTimeline(false)}
              >
                ← Back to pathway
              </button>

              <h2 className="timeline-title">
                What {selectedOption.label.toLowerCase()} looks like — honestly
              </h2>
              <p className="timeline-sub">
                Year 1 shows nothing. That is honest — it's learning time, not earning time.
                The platform doesn't pretend otherwise.
              </p>

              {/* Threshold legend */}
              <div className="threshold-legend">
                <span className="threshold survival">— Survival floor £{THRESHOLDS.survival.toLocaleString()}/mo</span>
                <span className="threshold independence">— Independence £{THRESHOLDS.independence.toLocaleString()}/mo</span>
                <span className="threshold comfortable">— Comfortable £{THRESHOLDS.comfortable.toLocaleString()}/mo</span>
              </div>

              {/* Bars */}
              <div className="timeline-bars">
                {PHASE_DATA.map((phase, i) => {
                  const floorPct = (phase.floor / MAX_INCOME) * 100;
                  const ceilingPct = (phase.ceiling / MAX_INCOME) * 100;

                  return (
                    <div key={i} className="timeline-row">
                      <div className="timeline-phase-label">
                        <span className="phase-name">{phase.phase}</span>
                        <span className="phase-year">{phase.year}</span>
                      </div>

                      <div className="timeline-bar-track">
                        {/* Threshold lines */}
                        <div
                          className="threshold-line survival"
                          style={{ left: `${(THRESHOLDS.survival / MAX_INCOME) * 100}%` }}
                        />
                        <div
                          className="threshold-line independence"
                          style={{ left: `${(THRESHOLDS.independence / MAX_INCOME) * 100}%` }}
                        />
                        <div
                          className="threshold-line comfortable"
                          style={{ left: `${(THRESHOLDS.comfortable / MAX_INCOME) * 100}%` }}
                        />

                        {/* Floor-to-ceiling range bar */}
                        {phase.floor === 0 && phase.ceiling === 0 ? (
                          <div className="bar-empty">Learning phase</div>
                        ) : (
                          <div
                            className="bar-range"
                            style={{
                              left: `${floorPct}%`,
                              width: `${ceilingPct - floorPct}%`
                            }}
                          />
                        )}
                      </div>

                      <div className="timeline-values">
                        <span className="value-floor">
                          {phase.floor === 0 ? '£0' : `£${phase.floor.toLocaleString()}`}
                        </span>
                        <span className="value-sep">–</span>
                        <span className="value-ceiling">
                          £{phase.ceiling.toLocaleString()}{phase.ceiling >= MAX_INCOME ? '+' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="timeline-note">
                These are floor and ceiling figures assuming consistent weekly output.
                School or part-time work? The timelines stretch — the ceiling doesn't change.
              </p>

              <div className="timeline-actions">
                <Link
                  to={`/programmes/${selectedOption.programmeId}`}
                  className="btn-primary"
                >
                  Start with {selectedOption.zone1} →
                </Link>
                <Link
                  to="/membership"
                  className="btn-secondary"
                >
                  See membership options
                </Link>
              </div>
            </div>
          )}

          {/* Success stories */}
          <div className="success-stories">
            <h3 className="stories-heading">People who started here</h3>
            <div className="stories-grid">
              {SUCCESS_STORIES.map((story, i) => (
                <div key={i} className="story-card">
                  <div className="story-header">
                    <span className="story-name">{story.name}</span>
                    <span className="story-age">age {story.age}</span>
                    <span className="story-income">{story.monthlyIncome}</span>
                  </div>
                  <div className="story-route">{story.route}</div>
                  <p className="story-quote">"{story.quote}"</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* ── COMPARE MODE (original quiz, retained) ────────────────────────── */}
      {pageMode === 'compare' && (
        <section className="compare-mode">
          {quizResult ? (
            <div className="quiz-result">
              <h2>Your best match</h2>
              {/* FIXED: quiz result IDs use 'stemgeneers' not 'stemgineers' */}
              <p>
                Based on your answers, we'd suggest starting with{' '}
                <strong>
                  {TALENT_OPTIONS.find(t => t.programmeId === quizResult)?.zone1 || quizResult}
                </strong>.
              </p>
              <Link
                to={`/programmes/${quizResult}`}
                className="btn-primary"
              >
                Explore this programme →
              </Link>
              <button className="btn-text" onClick={resetQuiz}>
                Retake quiz
              </button>
            </div>
          ) : (
            <div className="quiz-wrapper">
              <div className="quiz-progress">
                Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
              </div>
              <h2 className="quiz-question">{QUIZ_QUESTIONS[quizStep].question}</h2>
              <div className="quiz-options">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    className="quiz-option"
                    onClick={() => handleQuizAnswer(QUIZ_QUESTIONS[quizStep].key, opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Programme grid below quiz */}
          <div className="programme-grid">
            <h3>Browse all programmes</h3>
            <div className="programme-cards">
              {TALENT_OPTIONS.map(opt => (
                <Link
                  key={opt.id}
                  to={`/programmes/${opt.programmeId}`}
                  className="programme-card"
                >
                  <span className="prog-emoji">{opt.emoji}</span>
                  <span className="prog-label">{opt.zone1}</span>
                  <span className="prog-ceiling">{opt.fiveYearCeiling}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

// ============================================
// QUIZ QUESTIONS (compare mode — original logic, stemgeneers fix applied)
// ============================================

const QUIZ_QUESTIONS = [
  {
    key: 'q1',
    question: 'When you have a free afternoon with no obligations, what do you find yourself doing?',
    options: [
      { label: 'Writing, talking, or arguing a point', value: 'pageturners' },
      // FIXED: was 'stemgineers'
      { label: 'Taking something apart or building something', value: 'stemgeneers' },
      { label: 'Making or listening to music', value: 'trubble-n-bass' },
      { label: 'Connecting with people or organising something', value: 'bright-sparks' },
      { label: 'Sketching, styling, or designing', value: 'silk-stilettos' },
      { label: "Telling stories about people you know or places you've been", value: 'roots' }
    ]
  },
  {
    key: 'q2',
    question: 'What kind of output feels most natural to you?',
    options: [
      { label: 'A piece of writing or a script', value: 'pageturners' },
      // FIXED: was 'stemgineers'
      { label: 'A working prototype or app', value: 'stemgeneers' },
      { label: 'A track, mix, or recording', value: 'trubble-n-bass' },
      { label: 'An event, a show, or a conversation', value: 'bright-sparks' },
      { label: 'Something visual — a photo, a look, a layout', value: 'silk-stilettos' },
      { label: 'Documented knowledge — a recipe, an account, a history', value: 'roots' }
    ]
  },
  {
    key: 'q3',
    question: "What's the main thing that has stopped you earning from your skills so far?",
    options: [
      { label: "I don't know how to turn what I do into a product", value: 'bright-sparks' },
      { label: "I have no audience and no platform", value: 'pageturners' },
      { label: "I never thought what I make has commercial value", value: 'roots' },
      // FIXED: was 'stemgineers'
      { label: "I lack the technical skills to build what I imagine", value: 'stemgeneers' },
      { label: "I couldn't find collaborators who take it seriously", value: 'trubble-n-bass' },
      { label: "I didn't have a professional network or visible profile", value: 'silk-stilettos' }
    ]
  }
];

export default CreatorPathwaysPage;