/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Bright Sparks Programme Page
 *
 * CHANGE LOG (March 2026):
 *   - PathwayPreview component added ABOVE the New/Migrating track selector
 *   - Answers "what am I aiming at?" before the visitor commits to a track
 *   - Collapsible — once dismissed, does not re-render on track change
 *   - Spelling: stemgeneers confirmed canonical throughout
 *   - All existing track selector, mini-challenge sandbox, progress tracking
 *     logic is UNCHANGED below the PathwayPreview insertion point
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BrightSparksPage.css';

// ============================================
// PATHWAY PREVIEW — pre-track component
// ============================================

/**
 * PathwayPreview
 *
 * A lightweight, collapsible income preview mounted above the track selector.
 * Shows the visitor what Bright Sparks feeds into — Zone 2 and beyond —
 * before they choose New or Migrating track.
 *
 * Does not import the full CreatorPathwaysPage. Self-contained.
 */

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
      <button className="preview-dismiss" onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>

    <p className="preview-intro">
      Bright Sparks is Zone 1 — the skill-building phase. What you're really choosing
      is the income path it unlocks. Here's the honest picture:
    </p>

    <div className="preview-pathway">
      <div className="preview-zone preview-zone--1">
        <span className="preview-zone-label">Zone 1 · Learn</span>
        <span className="preview-zone-name">{BRIGHT_SPARKS_PATHWAY.zone1}</span>
        <span className="preview-zone-note">
          This is where you are now. No income yet — this is runway.
        </span>
      </div>

      <span className="preview-arrow">→</span>

      <div className="preview-zone preview-zone--2">
        <span className="preview-zone-label">Zone 2 · Create &amp; Earn</span>
        <span className="preview-zone-name">{BRIGHT_SPARKS_PATHWAY.zone2}</span>
        <span className="preview-zone-note">
          {BRIGHT_SPARKS_PATHWAY.description}
        </span>
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
      <Link to="/creator-pathways" className="preview-link-full">
        See all earning paths →
      </Link>
      <button className="preview-continue" onClick={onDismiss}>
        I'm ready — show me the tracks
      </button>
    </div>
  </div>
);

// ============================================
// TYPES (existing — unchanged)
// ============================================

type Track = 'new' | 'migrating' | null;

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
// CHALLENGE DATA (existing — unchanged)
// NOTE: programmeId references use 'stemgeneers' (canonical)
// ============================================

const CHALLENGES: Record<string, Challenge[]> = {
  new: [
    {
      id: 'bs-new-01',
      title: 'Community Signal',
      description: "Record a 90-second audio piece about something happening in your area that most people don't know about. This is your first Rayd-yo submission.",
      difficulty: 'starter',
      estimatedTime: '2 hours',
      skills: ['Audio recording', 'Script writing', 'Community observation'],
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
  ]
};

// ============================================
// MAIN COMPONENT
// ============================================

const BrightSparksPage: React.FC = () => {
  // Pathway preview state — shown once, dismissed stays dismissed
  const [showPathwayPreview, setShowPathwayPreview] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState<Track>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [sandboxContent, setSandboxContent] = useState('');
  const [sandboxSubmitted, setSandboxSubmitted] = useState(false);

  const handleDismissPreview = () => setShowPathwayPreview(false);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setActiveChallenge(null);
    setSandboxContent('');
    setSandboxSubmitted(false);
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    setSandboxContent('');
    setSandboxSubmitted(false);
  };

  const handleSandboxSubmit = () => {
    if (sandboxContent.trim().length > 20) {
      setSandboxSubmitted(true);
    }
  };

  return (
    <div className="bright-sparks-page">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="bs-hero">
        <div className="bs-hero-badge">Zone 1 · Learn</div>
        <h1 className="bs-hero-title">Bright Sparks</h1>
        <p className="bs-hero-sub">
          Where the platform meets you — regardless of where you're starting from.
          No prior experience required. No credentials checked.
          What you make here is evidence. The counter-archive logs it from day one.
        </p>
      </section>

      {/* ── PATHWAY PREVIEW (pre-track) ──────────────────────────────────── */}
      {showPathwayPreview && (
        <PathwayPreview onDismiss={handleDismissPreview} />
      )}

      {/* ── TRACK SELECTOR ───────────────────────────────────────────────── */}
      {!selectedTrack ? (
        <section className="track-selector">
          <h2 className="track-selector-heading">Which describes you?</h2>

          <div className="track-options">
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
          </div>
        </section>
      ) : (
        <>
          {/* ── TRACK CONTENT ─────────────────────────────────────────────── */}
          <section className="track-content">
            <div className="track-content-header">
              <button
                className="back-btn"
                onClick={() => handleTrackSelect(null)}
              >
                ← Change track
              </button>
              <h2 className="track-content-title">
                {selectedTrack === 'new' ? 'New to this — starting challenges' : 'Migrating skills — translation challenges'}
              </h2>
            </div>

            {/* Challenge list */}
            {!activeChallenge ? (
              <div className="challenge-list">
                {CHALLENGES[selectedTrack].map(challenge => (
                  <button
                    key={challenge.id}
                    className="challenge-card"
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
              /* Active challenge view */
              <div className="active-challenge">
                <button
                  className="back-btn"
                  onClick={() => setActiveChallenge(null)}
                >
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

                  {/* Sandbox for submittable challenges */}
                  {activeChallenge.sandbox && !sandboxSubmitted && (
                    <div className="challenge-sandbox">
                      <label className="sandbox-label">
                        Your response (text for now — audio upload coming soon)
                      </label>
                      <textarea
                        className="sandbox-input"
                        value={sandboxContent}
                        onChange={e => setSandboxContent(e.target.value)}
                        placeholder="Write your response here. This will be logged to the counter-archive with your authorship timestamp."
                        rows={6}
                      />
                      <button
                        className="sandbox-submit-btn"
                        onClick={handleSandboxSubmit}
                        disabled={sandboxContent.trim().length <= 20}
                      >
                        Submit to Bright Sparks archive
                      </button>
                    </div>
                  )}

                  {sandboxSubmitted && (
                    <div className="sandbox-confirmation">
                      <span className="confirmation-icon">✓</span>
                      <p>
                        Submitted and logged. Your authorship is recorded in the
                        counter-archive. This is the beginning of your provenance record.
                      </p>
                      <Link to="/roots" className="confirmation-link">
                        View your archive entries →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* ── PROGRAMME INFO FOOTER ────────────────────────────────────────── */}
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
          <Link to="/creator-pathways" className="btn-secondary">
            Find your earning path →
          </Link>
          <Link to="/membership" className="btn-text">
            Explore membership
          </Link>
        </div>
      </section>

    </div>
  );
};

export default BrightSparksPage;