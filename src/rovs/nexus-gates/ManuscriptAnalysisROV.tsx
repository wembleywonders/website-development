// src/rovs/nexus-gates/ManuscriptAnalysisROV.tsx
//
// NEXUS-GATE ROV — Phase 2 clone of AudioQualityCheckROV.tsx (the Phase 1
// reference build, 23 Aug 2026). Same shape deliberately — see
// StagingReadinessROV.tsx's header for the same note; not repeated here in
// full. If you're comparing all three, the divergence should be in the
// criteria content only, not the architecture.
//
// DIVERGENCE FROM PHASE 1, FLAGGED PER THE BUILD BRIEF'S OWN INSTRUCTION:
// checked directly before building this file: Pageturners has NO
// accreditation/programmes/pageturners/ directory at all — confirmed by
// direct search, not assumed. Unlike TNB (Phase 1, sourced from a real,
// locked Criterion 1.4) or even Kaywana's Court (Phase 2 sibling, at least
// has a stub structure to point at), there is nothing WW-specific to
// ground manuscript-review criteria in at all. The criteria below are
// therefore general manuscript/editorial-review practice — real, standard
// professional concepts (structure, sourcing, voice, mechanics), not
// fabricated platform lore — not drawn from any WW-locked rubric. This is
// the largest content-sourcing gap of the three nexus-gate tools; flagging
// it plainly rather than presenting these as if they came from a real
// Pageturners assessment document, because none exists.
//
// CONSTITUTIONAL CONSTRAINT — same as Phase 1 and the Staging sibling: no
// automated path to an approved/certified status. No "Approve"/"Certify"
// action anywhere below.
//
// HONESTY NOTE — same as the other two: no real capability exists
// anywhere in this codebase to actually read and analyse a manuscript.
// This is a structured self-assessment a member walks through, not an
// automated text-analysis tool pretending to be one.

import React, { useState } from 'react';
import './AudioQualityCheckROV.css'; // shared nexus-gate styling — same file all three use

// ─── Types ──────────────────────────────────────────────────────────────

export type ReadinessStatus = 'not-yet-checked' | 'needs-work' | 'meets-criterion';

export interface QualityCriterion {
  id: 'structure' | 'sourcing' | 'voice' | 'mechanics';
  label: string;
  whatGoodLooksLike: string;
  commonIssueAndFix: string;
}

interface CriterionState {
  status: ReadinessStatus;
  memberNote: string;
}

export interface SelfCheckAttempt {
  id: string;
  at: string;
  summary: string;
}

// ─── Criteria — general manuscript/editorial-review practice; see the
// divergence note above for why these aren't drawn from a locked WW rubric ─

export const MANUSCRIPT_ANALYSIS_CRITERIA: QualityCriterion[] = [
  {
    id: 'structure',
    label: 'Structure & pacing',
    whatGoodLooksLike:
      'The piece has a clear shape a reader can follow — a real beginning that sets up what\'s at stake, a middle that develops it, an ending that actually resolves or deliberately leaves something open on purpose, not by accident.',
    commonIssueAndFix:
      'Most common miss: a strong opening that trails off into a list of events with no real ending. Fix: read just your last page on its own — if it doesn\'t feel like an ending, it probably needs one more deliberate beat, not just a stopping point.',
  },
  {
    id: 'sourcing',
    label: 'Sourcing & attribution',
    whatGoodLooksLike:
      'Anywhere you\'ve drawn on a real tradition, story, technique, or another person\'s work, it\'s credited — the reader can tell what\'s yours and what you\'re building on.',
    commonIssueAndFix:
      'Most common miss: a technique or story element pulled from a specific tradition without naming it, so it reads as invented when it isn\'t. Fix: go back through and name the tradition or source explicitly wherever you\'ve drawn on one — this isn\'t just courtesy, it\'s what makes the borrowing legible as a choice rather than an accident.',
  },
  {
    id: 'voice',
    label: 'Voice consistency',
    whatGoodLooksLike:
      'The narrator or characters sound like the same person/people throughout — vocabulary, rhythm, and register don\'t suddenly shift for no story reason.',
    commonIssueAndFix:
      'Most common miss: a section written on a different day reads noticeably more formal or more casual than the rest, with no in-story reason for the shift. Fix: read that section out loud right after reading the section before it — a voice shift is usually obvious to the ear even when it\'s easy to miss on the page.',
  },
  {
    id: 'mechanics',
    label: 'Mechanical readiness',
    whatGoodLooksLike:
      'Spelling, grammar, and formatting are clean enough that a reader isn\'t pulled out of the piece by errors — this isn\'t about perfection, it\'s about nothing distracting from the actual writing.',
    commonIssueAndFix:
      'Most common miss: submitting straight after finishing a draft, before a separate read-through pass. Fix: read it once specifically for mechanics only, separately from reading it for story — trying to catch both at once is why errors get missed.',
  },
];

function freshCriteriaState(): Record<QualityCriterion['id'], CriterionState> {
  return {
    structure: { status: 'not-yet-checked', memberNote: '' },
    sourcing: { status: 'not-yet-checked', memberNote: '' },
    voice: { status: 'not-yet-checked', memberNote: '' },
    mechanics: { status: 'not-yet-checked', memberNote: '' },
  };
}

// ─── Sub-components — identical shape to Phase 1, class names shared ──────

const StatusBadge: React.FC<{ status: ReadinessStatus }> = ({ status }) => {
  const config: Record<ReadinessStatus, { label: string; className: string }> = {
    'not-yet-checked': { label: 'Not checked yet', className: 'aqc-badge--pending' },
    'needs-work': { label: 'Needs work', className: 'aqc-badge--needs-work' },
    'meets-criterion': { label: 'Meets criterion', className: 'aqc-badge--met' },
  };
  const c = config[status];
  return <span className={`aqc-badge ${c.className}`}>{c.label}</span>;
};

const CriterionCard: React.FC<{
  criterion: QualityCriterion;
  state: CriterionState;
  onSetStatus: (id: QualityCriterion['id'], status: ReadinessStatus) => void;
  onSetNote: (id: QualityCriterion['id'], note: string) => void;
}> = ({ criterion, state, onSetStatus, onSetNote }) => (
  <div className="aqc-criterion">
    <div className="aqc-criterion__head">
      <h3>{criterion.label}</h3>
      <StatusBadge status={state.status} />
    </div>

    <p className="aqc-criterion__good">
      <strong>What meets this criterion:</strong> {criterion.whatGoodLooksLike}
    </p>

    {state.status === 'needs-work' && (
      <p className="aqc-criterion__fix">
        <strong>Common issue & fix:</strong> {criterion.commonIssueAndFix}
      </p>
    )}

    <div className="aqc-criterion__actions">
      <button
        className={`aqc-criterion__btn ${state.status === 'meets-criterion' ? 'active met' : ''}`}
        onClick={() => onSetStatus(criterion.id, 'meets-criterion')}
      >
        ✓ Meets this
      </button>
      <button
        className={`aqc-criterion__btn ${state.status === 'needs-work' ? 'active needs-work' : ''}`}
        onClick={() => onSetStatus(criterion.id, 'needs-work')}
      >
        ⚑ Not yet
      </button>
    </div>

    <textarea
      className="aqc-criterion__note"
      placeholder="Notes to yourself — what you checked, what you fixed…"
      rows={2}
      value={state.memberNote}
      onChange={(e) => onSetNote(criterion.id, e.target.value)}
    />
  </div>
);

// ─── Main component ─────────────────────────────────────────────────────

export interface ManuscriptAnalysisROVProps {
  /** Optional — lets the host page show which piece this self-check is for. Display only. */
  manuscriptTitle?: string;
  onClose?: () => void;
}

const ManuscriptAnalysisROV: React.FC<ManuscriptAnalysisROVProps> = ({ manuscriptTitle, onClose }) => {
  const [criteriaState, setCriteriaState] = useState(freshCriteriaState());
  const [attempts, setAttempts] = useState<SelfCheckAttempt[]>([]);

  const setStatus = (id: QualityCriterion['id'], status: ReadinessStatus) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], status } }));
  };

  const setNote = (id: QualityCriterion['id'], memberNote: string) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], memberNote } }));
  };

  const allChecked = MANUSCRIPT_ANALYSIS_CRITERIA.every((c) => criteriaState[c.id].status !== 'not-yet-checked');
  const metCount = MANUSCRIPT_ANALYSIS_CRITERIA.filter((c) => criteriaState[c.id].status === 'meets-criterion').length;
  const needsWorkCount = MANUSCRIPT_ANALYSIS_CRITERIA.filter((c) => criteriaState[c.id].status === 'needs-work').length;
  const readyToSubmit = allChecked && needsWorkCount === 0;

  const logAttempt = () => {
    const summary = `${metCount} of ${MANUSCRIPT_ANALYSIS_CRITERIA.length} met${
      needsWorkCount > 0 ? `, ${needsWorkCount} flagged needs-work` : ''
    }`;
    setAttempts((prev) => [
      { id: `attempt-${Date.now()}`, at: new Date().toISOString().slice(0, 10), summary },
      ...prev,
    ]);
  };

  const startOver = () => setCriteriaState(freshCriteriaState());

  return (
    <div className="aqc">
      <header className="aqc-header">
        <div className="aqc-header__icon">📖</div>
        <div>
          <h1>Manuscript Self-Check</h1>
          <p className="aqc-header__tagline">
            Pageturners · Before you submit for review{manuscriptTitle ? ` · ${manuscriptTitle}` : ''}
          </p>
        </div>
        {onClose && (
          <button className="aqc-close" onClick={onClose} aria-label="Close">×</button>
        )}
      </header>

      <p className="aqc-note">
        A structural self-check across four areas — structure & pacing,
        sourcing & attribution, voice consistency, mechanical readiness —
        so you can catch what's missing before you use a real review cycle.
        <strong> This tool cannot approve or certify your manuscript
        itself.</strong> A human reviewer still makes that call, same as
        every other route through this pipeline.
      </p>

      <section className="aqc-criteria">
        {MANUSCRIPT_ANALYSIS_CRITERIA.map((c) => (
          <CriterionCard
            key={c.id}
            criterion={c}
            state={criteriaState[c.id]}
            onSetStatus={setStatus}
            onSetNote={setNote}
          />
        ))}
      </section>

      <section className="aqc-summary">
        <p className="aqc-summary__line">
          {metCount} of {MANUSCRIPT_ANALYSIS_CRITERIA.length} criteria met
          {needsWorkCount > 0 ? ` · ${needsWorkCount} flagged needs-work` : ''}
        </p>

        {readyToSubmit ? (
          <div className="aqc-summary__ready">
            All four self-checked as met. This page doesn't submit anything
            for you — bring your manuscript to review when you're ready.
          </div>
        ) : (
          <div className="aqc-summary__not-ready">
            Not all criteria are checked and clear yet. Work through the
            "Not yet" items above, then log another attempt below — your
            notes stay in place, nothing resets.
          </div>
        )}

        <div className="aqc-summary__actions">
          <button className="aqc-log-attempt" onClick={logAttempt}>
            Log this attempt
          </button>
          <button className="aqc-start-over" onClick={startOver}>
            Start a fresh pass
          </button>
        </div>
      </section>

      {attempts.length > 0 && (
        <section className="aqc-attempts">
          <h3>Your self-check history</h3>
          <ul className="aqc-attempts__list">
            {attempts.map((a) => (
              <li key={a.id}>
                <span className="aqc-attempts__date">{a.at}</span> — {a.summary}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ManuscriptAnalysisROV;
