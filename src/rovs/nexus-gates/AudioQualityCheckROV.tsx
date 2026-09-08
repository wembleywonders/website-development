// src/rovs/nexus-gates/AudioQualityCheckROV.tsx
//
// NEXUS-GATE ROV — Reference implementation (Phase 1 of the 23 Aug 2026
// nexus-gate build brief). The other two nexus-gate tools (Manuscript
// Analysis ROV / Pageturners, Staging/Production-Readiness ROV / Kaywana's
// Court) should clone this file's shape directly, not redesign it.
//
// WHAT THIS IS: a member-facing, pre-submission coaching self-check for
// Trubble n Bass audio work. It is NOT AudioBay.tsx (the human reviewer's
// console further down the pipeline) and does not duplicate it — this tool
// exists specifically because AudioBay confirmed-NOT-a-substitute per the
// 15 Aug audit: AudioBay is where a *reviewer* checks a submission;
// nothing existed where a *member* could self-check readiness before
// spending a real review cycle. That's the actual gap this component
// closes.
//
// CRITERIA SOURCE: not invented. Matches
// accreditation/programmes/trubble-n-bass/assessment-criteria.md,
// Unit TNB-1, Criterion 1.4 verbatim — "all technical checklist items
// (levels/format/clearance/mix) checked, none flagged, human-approved
// advance" — and the same four categories AudioBay.tsx's own
// DEFAULT_CRITERIA already uses on the reviewer side. Deliberately kept
// identical to both sources rather than inventing a fifth vocabulary for
// the same four checks.
//
// CONSTITUTIONAL CONSTRAINT (per WW-SPEC-ROV-SUBMISSION-PIPELINE-001,
// Section 0 — same rule AudioBay.tsx and SimulationChamber.tsx cite): no
// automated path to an approved/certified status. This component enforces
// that at the UI level — there is no "Approve" or "Certify" action anywhere
// in this file, only "Prepare for AudioBay review." Checked directly: the
// spec document itself (WW-SPEC-ROV-SUBMISSION-PIPELINE-001) does not exist
// anywhere in this repo — chat-memory-only, same pattern flagged elsewhere
// this session. The constraint is real and consistently followed in code
// regardless (both existing Impact Lab files cite it identically); this
// file follows the same convention rather than waiting on the source doc.
//
// HONESTY NOTE: there is no real audio-analysis capability anywhere in
// this codebase or backend (confirmed — no audio-processing service
// exists). This tool does not pretend to listen to or analyse a member's
// track. It is a structured self-assessment: real coaching guidance per
// criterion, the member judges their own work against it, same integrity
// standard as AudioBay's own "local mock state, clearly marked" pattern —
// not faking a capability that doesn't exist.

import React, { useState } from 'react';
import './AudioQualityCheckROV.css';

// ─── Types ──────────────────────────────────────────────────────────────

export type ReadinessStatus = 'not-yet-checked' | 'needs-work' | 'meets-criterion';

export interface QualityCriterion {
  id: 'levels' | 'format' | 'clearance' | 'mix';
  label: string;
  /** What "meets criterion" actually looks like — the coaching content, not just a checkbox label. */
  whatGoodLooksLike: string;
  /** The most common way members fall short here, and what to actually do about it. */
  commonIssueAndFix: string;
}

interface CriterionState {
  status: ReadinessStatus;
  memberNote: string;
}

/** One self-check pass, kept so a member can act on feedback and try again without losing prior context. */
export interface SelfCheckAttempt {
  id: string;
  at: string; // ISO date, display only
  summary: string; // e.g. "3 of 4 met, mix flagged"
}

// ─── Criteria — grounded in the real TNB-1 assessment criterion 1.4 ───────

export const AUDIO_QUALITY_CRITERIA: QualityCriterion[] = [
  {
    id: 'levels',
    label: 'Levels & clipping',
    whatGoodLooksLike:
      'No red/clipped peaks anywhere in the track, and the loudness feels consistent from start to end — no section suddenly much quieter or louder than the rest.',
    commonIssueAndFix:
      'The most common miss is one loud section (a drop, a hook) clipping while the rest of the track is fine. Fix: pull the peak gain down on that section specifically rather than turning the whole track down — turning everything down just moves the problem, it doesn\'t fix it.',
  },
  {
    id: 'format',
    label: 'Format & metadata',
    whatGoodLooksLike:
      'File is in the format Rayd-yo/Cyberstore actually accepts, and the title/creator tags are filled in correctly — not left as the default export filename.',
    commonIssueAndFix:
      'Most common miss: exporting straight from the beat-maker with its default filename/tags still attached. Fix: check the actual metadata fields before export, not just the audio — a technically perfect mix with wrong or missing tags still fails this criterion.',
  },
  {
    id: 'clearance',
    label: 'Sample / sound clearance',
    whatGoodLooksLike:
      'Every sample, loop, or sound used is either entirely your own work or confirmed clearable — sourced from Sample Explorer\'s own library, or otherwise documented as cleared.',
    commonIssueAndFix:
      'Most common miss: a sample pulled in from outside the platform "because it sounded right," with no record of where it came from. Fix: if you can\'t name the exact source and confirm it\'s clearable, swap it for something from Sample Explorer or your own recording before submitting — don\'t guess and hope.',
  },
  {
    id: 'mix',
    label: 'Mix balance',
    whatGoodLooksLike:
      'Nothing is buried (vocals/lead lost under the beat) and nothing is overpowering (one drum hit dominating everything else) — each element has its own space in the frequency range.',
    commonIssueAndFix:
      'Most common miss: bass and kick fighting each other in the same low-frequency space, making the low end feel muddy rather than punchy. Fix: listen specifically for whether you can hear the kick\'s attack AND the bass\'s note at the same time — if one disappears when the other hits, that\'s the mix balance issue this criterion is checking for.',
  },
];

function freshCriteriaState(): Record<QualityCriterion['id'], CriterionState> {
  return {
    levels: { status: 'not-yet-checked', memberNote: '' },
    format: { status: 'not-yet-checked', memberNote: '' },
    clearance: { status: 'not-yet-checked', memberNote: '' },
    mix: { status: 'not-yet-checked', memberNote: '' },
  };
}

// ─── Sub-components ─────────────────────────────────────────────────────

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

export interface AudioQualityCheckROVProps {
  /** Optional — lets the host page show which track this self-check is for. Display only. */
  trackTitle?: string;
  onClose?: () => void;
}

const AudioQualityCheckROV: React.FC<AudioQualityCheckROVProps> = ({ trackTitle, onClose }) => {
  const [criteriaState, setCriteriaState] = useState(freshCriteriaState());
  const [attempts, setAttempts] = useState<SelfCheckAttempt[]>([]);

  const setStatus = (id: QualityCriterion['id'], status: ReadinessStatus) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], status } }));
  };

  const setNote = (id: QualityCriterion['id'], memberNote: string) => {
    setCriteriaState((prev) => ({ ...prev, [id]: { ...prev[id], memberNote } }));
  };

  const allChecked = AUDIO_QUALITY_CRITERIA.every((c) => criteriaState[c.id].status !== 'not-yet-checked');
  const metCount = AUDIO_QUALITY_CRITERIA.filter((c) => criteriaState[c.id].status === 'meets-criterion').length;
  const needsWorkCount = AUDIO_QUALITY_CRITERIA.filter((c) => criteriaState[c.id].status === 'needs-work').length;
  const readyForAudioBay = allChecked && needsWorkCount === 0;

  // Logging an attempt is explicitly NOT approval or certification of anything —
  // it's a snapshot the member can look back on across resubmission passes.
  // This function never sets any kind of "approved"/"certified" state; the
  // only thing it produces is a dated summary string.
  const logAttempt = () => {
    const summary = `${metCount} of ${AUDIO_QUALITY_CRITERIA.length} met${
      needsWorkCount > 0 ? `, ${needsWorkCount} flagged needs-work` : ''
    }`;
    setAttempts((prev) => [
      { id: `attempt-${Date.now()}`, at: new Date().toISOString().slice(0, 10), summary },
      ...prev,
    ]);
  };

  // Resubmission = the member keeps working the SAME criteria state after
  // logging an attempt; nothing resets unless they explicitly ask for a
  // fresh pass. "Start over" is a deliberate, separate action.
  const startOver = () => setCriteriaState(freshCriteriaState());

  return (
    <div className="aqc">
      <header className="aqc-header">
        <div className="aqc-header__icon">🎚️</div>
        <div>
          <h1>Audio Quality Self-Check</h1>
          <p className="aqc-header__tagline">
            Trubble n Bass · Get ready for AudioBay{trackTitle ? ` · ${trackTitle}` : ''}
          </p>
        </div>
        {onClose && (
          <button className="aqc-close" onClick={onClose} aria-label="Close">×</button>
        )}
      </header>

      <p className="aqc-note">
        This checks the same four things AudioBay's human reviewer checks —
        levels, format, clearance, mix — so you can catch what's missing
        before you use a real review cycle. <strong>This tool cannot approve
        or certify anything itself.</strong> When everything below reads
        "Meets criterion," take your track to AudioBay for the actual human
        review — that's still where a submission gets signed off, same as
        every other route through this pipeline.
      </p>

      <section className="aqc-criteria">
        {AUDIO_QUALITY_CRITERIA.map((c) => (
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
          {metCount} of {AUDIO_QUALITY_CRITERIA.length} criteria met
          {needsWorkCount > 0 ? ` · ${needsWorkCount} flagged needs-work` : ''}
        </p>

        {readyForAudioBay ? (
          <div className="aqc-summary__ready">
            All four self-checked as met. Ready to take to AudioBay — this
            page doesn't submit anything for you; bring your track to the
            Impact Lab when you're ready.
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

export default AudioQualityCheckROV;
