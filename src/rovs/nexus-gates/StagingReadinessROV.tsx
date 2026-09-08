// src/rovs/nexus-gates/StagingReadinessROV.tsx
//
// NEXUS-GATE ROV — Phase 2 clone of AudioQualityCheckROV.tsx (the Phase 1
// reference build, 23 Aug 2026). Same shape deliberately: types, criterion
// card, gating logic, coaching-feedback UI, resubmission-without-reset —
// swapped for Kaywana's Court's staging/production-readiness need. If you're
// comparing the two files, the divergence should be in the criteria
// content only, not the architecture.
//
// DIVERGENCE FROM PHASE 1, FLAGGED PER THE BUILD BRIEF'S OWN INSTRUCTION:
// TNB's criteria (Phase 1) are sourced verbatim from a real, locked
// accreditation doc (assessment-criteria.md, Criterion 1.4). Checked
// directly before building this file: Kaywana's Court has NO equivalent.
// accreditation/programmes/kaywanas-court/assessment-criteria.md,
// unit-mapping.md, and evidence-requirements.md are all still literally
// "<!-- To be completed. -->" stubs. The cited template
// (g-tech-casters/assessment-criteria.md) is real but covers a different
// domain (audio/broadcast production, not staging/event readiness) and
// doesn't transfer. The criteria below are therefore general theatrical/
// event production-readiness practice — real, standard professional
// concepts, not fabricated platform lore — grounded in the one piece of
// real WW-specific structure that does exist:
// `src/production-hub/KaywanasAtrium.tsx`'s own `PerformanceProject` type,
// whose status progression (draft → rehearsing → ready → performed) is
// the actual real signal this tool coaches a member toward. This is a
// genuine content-sourcing gap relative to Phase 1, not a design
// divergence — the shape fits fine; reporting the gap as instructed
// rather than quietly treating general practice as if it were a locked
// WW rubric.
//
// CONSTITUTIONAL CONSTRAINT — same as Phase 1: no automated path to an
// approved/certified status (per the same convention AudioBay.tsx and
// SimulationChamber.tsx follow, citing WW-SPEC-ROV-SUBMISSION-PIPELINE-001,
// Section 0 — that spec document itself still doesn't exist anywhere in
// this repo, same finding as Phase 1). No "Approve"/"Certify" action
// anywhere below.
//
// HONESTY NOTE — same as Phase 1: no real capability exists anywhere in
// this codebase to inspect an actual rehearsal, venue, or risk assessment.
// This is a structured self-assessment a member walks through, not an
// automated inspection pretending to be one.

import React, { useState } from 'react';
import './AudioQualityCheckROV.css'; // shared nexus-gate styling — see note in this file's CSS import below

// ─── Types ──────────────────────────────────────────────────────────────

export type ReadinessStatus = 'not-yet-checked' | 'needs-work' | 'meets-criterion';

export interface QualityCriterion {
  id: 'cast-crew' | 'venue-technical' | 'safety-logistics' | 'audience-ready';
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

// ─── Criteria — general staging/production-readiness practice, grounded in
// KaywanasAtrium.tsx's real draft→rehearsing→ready progression; see the
// divergence note above for why these aren't drawn from a locked WW rubric ─

export const STAGING_READINESS_CRITERIA: QualityCriterion[] = [
  {
    id: 'cast-crew',
    label: 'Cast & crew readiness',
    whatGoodLooksLike:
      'Everyone involved has run the piece start-to-finish at least once without stopping, knows their entrances/exits and cues, and any last-minute substitutions have actually rehearsed their part — not just been briefed on it.',
    commonIssueAndFix:
      'Most common miss: a late substitution who was told what to do but never actually walked through it live with the rest of the cast. Fix: run it again with everyone present before calling this one done — a verbal briefing is not the same as a rehearsed run.',
  },
  {
    id: 'venue-technical',
    label: 'Venue & technical readiness',
    whatGoodLooksLike:
      'The actual performance space has been used for at least one rehearsal (not just a similar room), and sound/lighting/staging needs specific to that space are confirmed working, not assumed.',
    commonIssueAndFix:
      'Most common miss: rehearsing somewhere convenient and assuming the real venue will "basically be the same." Fix: get one real run in the actual space before this counts as met — acoustics, sightlines, and available power/lighting rarely transfer cleanly between spaces.',
  },
  {
    id: 'safety-logistics',
    label: 'Safety & logistics readiness',
    whatGoodLooksLike:
      'A basic risk assessment has actually been done for this specific piece (not a generic template left unread), access/egress is clear, and anyone with a safety-relevant role (e.g. handling fire, rigging, working at height) is confirmed competent to do it.',
    commonIssueAndFix:
      'Most common miss: a risk assessment that exists as a document but was never actually walked through against what this specific piece does. Fix: read it against your actual running order line by line — a generic template that doesn\'t mention what your piece specifically does hasn\'t done its job yet.',
  },
  {
    id: 'audience-ready',
    label: 'Audience-facing readiness',
    whatGoodLooksLike:
      'The running order is timed and correct, front-of-house knows what\'s happening and when, and anything the audience needs to know in advance (content warnings, timing, accessibility) has actually been communicated, not just decided internally.',
    commonIssueAndFix:
      'Most common miss: a running order that\'s accurate on paper but was never actually shared with the people running the door/seating. Fix: confirm front-of-house has the same running order you do, not an earlier draft.',
  },
];

function freshCriteriaState(): Record<QualityCriterion['id'], CriterionState> {
  return {
    'cast-crew': { status: 'not-yet-checked', memberNote: '' },
    'venue-technical': { status: 'not-yet-checked', memberNote: '' },
    'safety-logistics': { status: 'not-yet-checked', memberNote: '' },
    'audience-ready': { status: 'not-yet-checked', memberNote: '' },
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

export interface StagingReadinessROVProps {
  /** Optional — lets the host page show which production this self-check is for. Display only. */
  productionTitle?: string;
  onClose?: () => void;
}

const StagingReadinessROV: React.FC<StagingReadinessROVProps> = ({ productionTitle, onClose }) => {
  const [criteriaState, setCriteriaState] = useState(freshCriteriaState());
  const [attempts, setAttempts] = useState<SelfCheckAttempt[]>([]);

  const setStatus = (id: QualityCriterion['id'], status: ReadinessStatus) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], status } }));
  };

  const setNote = (id: QualityCriterion['id'], memberNote: string) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], memberNote } }));
  };

  const allChecked = STAGING_READINESS_CRITERIA.every((c) => criteriaState[c.id].status !== 'not-yet-checked');
  const metCount = STAGING_READINESS_CRITERIA.filter((c) => criteriaState[c.id].status === 'meets-criterion').length;
  const needsWorkCount = STAGING_READINESS_CRITERIA.filter((c) => criteriaState[c.id].status === 'needs-work').length;
  const readyToAdvance = allChecked && needsWorkCount === 0;

  // Same as Phase 1 — logging an attempt is a snapshot, never an approval.
  const logAttempt = () => {
    const summary = `${metCount} of ${STAGING_READINESS_CRITERIA.length} met${
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
        <div className="aqc-header__icon">🎭</div>
        <div>
          <h1>Staging & Production Readiness Self-Check</h1>
          <p className="aqc-header__tagline">
            Kaywana's Court · Before you move a production from Rehearsing to Ready
            {productionTitle ? ` · ${productionTitle}` : ''}
          </p>
        </div>
        {onClose && (
          <button className="aqc-close" onClick={onClose} aria-label="Close">×</button>
        )}
      </header>

      <p className="aqc-note">
        This walks through the same four areas a production needs solid
        before it's genuinely ready to perform — cast & crew, venue &
        technical, safety & logistics, audience-facing readiness.
        <strong> This tool cannot mark a production ready or approved
        itself.</strong> That call — and the responsibility for it — stays
        with your production team and named steward, the same way it does
        for every other route through this pipeline.
      </p>

      <section className="aqc-criteria">
        {STAGING_READINESS_CRITERIA.map((c) => (
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
          {metCount} of {STAGING_READINESS_CRITERIA.length} criteria met
          {needsWorkCount > 0 ? ` · ${needsWorkCount} flagged needs-work` : ''}
        </p>

        {readyToAdvance ? (
          <div className="aqc-summary__ready">
            All four self-checked as met. This page doesn't change your
            production's status for you — take this to whoever confirms
            readiness for your production when you're ready.
          </div>
        ) : (
          <div className="aqc-summary__not-ready">
            Not all areas are checked and clear yet. Work through the
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

export default StagingReadinessROV;
