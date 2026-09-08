// src/production-hub/AudioBay.tsx
//
// Pipeline stage: IMPACT LAB (Technician ROV)
// Studio pair: SimulationChamber (non-audio technical validation) + AudioBay (this file)
// Confirmed design source: 10 July 2026 session + earlier Feb 2026 pipeline diagram.
// Stage sequence: Sandbox (InnovationPod) → Journal (JournalWall/MissionDeck)
//   → IMPACT LAB (SimulationChamber/AudioBay) → Certification (KaywanasAtrium)
//   → Store (CyberstoreDock)
//
// What this room does: technical review of an audio submission — mix/level
// checks, format/metadata completeness, sample-clearance flag — before the
// piece is eligible to advance to Certification. This is NOT a mastering
// tool and NOT the creation studio (that's Trubble n Bass's studio.tsx,
// which already exists and is unrelated to this file). This is the
// gatekeeping room between "made" and "certified."
//
// CONSTITUTIONAL CONSTRAINT (per WW-SPEC-ROV-SUBMISSION-PIPELINE-001,
// Section 0): no automated path to an approved/certified status. The
// Technician ROV can run checks and flag results, but advancing a
// submission is always an explicit human (steward/reviewer) action.
//
// DATA NOTE: no confirmed backend endpoint exists yet for an Impact Lab
// audio queue. The submissions below are local mock state, clearly
// marked — not a real fetch pretending to be one. Wire this to a real
// endpoint once the Impact Lab backend surface is confirmed, matching
// the same honesty standard already applied elsewhere in production-hub.

import React, { useState } from 'react';
import './AudioBay.css';

// ─── Types ────────────────────────────────────────────────────────────────

type SubmissionStatus = 'queued' | 'in-review' | 'needs-revision' | 'ready-for-certification';

interface TechnicalCriterion {
  id: string;
  label: string;
  helpText: string;
  status: 'unchecked' | 'pass' | 'flag';
  note?: string;
}

interface AudioSubmission {
  id: string;
  title: string;
  creatorName: string;
  originProgramme: string; // e.g. 'Trubble n Bass', 'Rayd-yo'
  durationLabel: string; // e.g. '3:42' — display only, no real audio wired yet
  submittedAt: string;
  status: SubmissionStatus;
  criteria: TechnicalCriterion[];
  reviewerNotes: { author: string; note: string; at: string }[];
}

// ─── Mock queue — see DATA NOTE above ───────────────────────────────────────

const DEFAULT_CRITERIA: Omit<TechnicalCriterion, 'status' | 'note'>[] = [
  { id: 'levels', label: 'Levels & clipping', helpText: 'No clipping on peaks; consistent loudness across the piece.' },
  { id: 'format', label: 'Format & metadata', helpText: 'Correct file format, title/creator tags complete.' },
  { id: 'clearance', label: 'Sample / sound clearance', helpText: 'Any samples or third-party sounds used are cleared or original.' },
  { id: 'mix', label: 'Mix balance', helpText: 'Frequencies balanced — nothing buried, nothing overpowering.' },
];

function freshCriteria(): TechnicalCriterion[] {
  return DEFAULT_CRITERIA.map(c => ({ ...c, status: 'unchecked' as const }));
}

const MOCK_SUBMISSIONS: AudioSubmission[] = [
  {
    id: 'sub-001',
    title: 'Caribbean Sunset Riddim (rough mix)',
    creatorName: '[creator — mock data]',
    originProgramme: 'Trubble n Bass',
    durationLabel: '2:58',
    submittedAt: '2026-08-12',
    status: 'queued',
    criteria: freshCriteria(),
    reviewerNotes: [],
  },
  {
    id: 'sub-002',
    title: 'Founding Session — episode intro',
    creatorName: '[creator — mock data]',
    originProgramme: 'Rayd-yo',
    durationLabel: '0:47',
    submittedAt: '2026-08-10',
    status: 'in-review',
    criteria: freshCriteria(),
    reviewerNotes: [
      { author: 'Technician ROV', note: 'Initial pass: levels look clean. Awaiting human reviewer for sample clearance check.', at: '2026-08-13' },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatusPill: React.FC<{ status: SubmissionStatus }> = ({ status }) => {
  const config: Record<SubmissionStatus, { label: string; className: string }> = {
    'queued': { label: 'Queued', className: 'audiobay-pill--queued' },
    'in-review': { label: 'In review', className: 'audiobay-pill--review' },
    'needs-revision': { label: 'Needs revision', className: 'audiobay-pill--revision' },
    'ready-for-certification': { label: 'Ready for Certification', className: 'audiobay-pill--ready' },
  };
  const c = config[status];
  return <span className={`audiobay-pill ${c.className}`}>{c.label}</span>;
};

const CriterionRow: React.FC<{
  criterion: TechnicalCriterion;
  onSetStatus: (id: string, status: TechnicalCriterion['status']) => void;
}> = ({ criterion, onSetStatus }) => (
  <div className="audiobay-criterion">
    <div className="audiobay-criterion__text">
      <span className="audiobay-criterion__label">{criterion.label}</span>
      <span className="audiobay-criterion__help">{criterion.helpText}</span>
    </div>
    <div className="audiobay-criterion__actions">
      <button
        className={`audiobay-criterion__btn ${criterion.status === 'pass' ? 'active pass' : ''}`}
        onClick={() => onSetStatus(criterion.id, 'pass')}
      >
        ✓ Pass
      </button>
      <button
        className={`audiobay-criterion__btn ${criterion.status === 'flag' ? 'active flag' : ''}`}
        onClick={() => onSetStatus(criterion.id, 'flag')}
      >
        ⚑ Flag
      </button>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AudioBay: React.FC = () => {
  const [submissions, setSubmissions] = useState<AudioSubmission[]>(MOCK_SUBMISSIONS);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_SUBMISSIONS[0]?.id ?? null);
  const [noteDraft, setNoteDraft] = useState('');

  const selected = submissions.find(s => s.id === selectedId) ?? null;

  const updateCriterionStatus = (submissionId: string, criterionId: string, status: TechnicalCriterion['status']) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id !== submissionId
          ? s
          : {
              ...s,
              criteria: s.criteria.map(c => (c.id === criterionId ? { ...c, status } : c)),
              status: s.status === 'queued' ? 'in-review' : s.status,
            }
      )
    );
  };

  const addReviewerNote = (submissionId: string) => {
    if (!noteDraft.trim()) return;
    setSubmissions(prev =>
      prev.map(s =>
        s.id !== submissionId
          ? s
          : {
              ...s,
              reviewerNotes: [
                ...s.reviewerNotes,
                { author: '[you — reviewer name TBD from auth]', note: noteDraft.trim(), at: new Date().toISOString().slice(0, 10) },
              ],
            }
      )
    );
    setNoteDraft('');
  };

  // Advancing to Certification is always an explicit human action, never
  // automatic — even when every criterion shows 'pass'. This function does
  // not run itself; it only runs when the reviewer clicks the button below.
  const advanceToCertification = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(s => (s.id !== submissionId ? s : { ...s, status: 'ready-for-certification' }))
    );
  };

  const sendBackForRevision = (submissionId: string) => {
    setSubmissions(prev =>
      prev.map(s => (s.id !== submissionId ? s : { ...s, status: 'needs-revision' }))
    );
  };

  const allCriteriaChecked = selected?.criteria.every(c => c.status !== 'unchecked') ?? false;
  const anyFlagged = selected?.criteria.some(c => c.status === 'flag') ?? false;

  return (
    <div className="audiobay">
      <header className="audiobay-header">
        <div className="audiobay-header__icon">🎚️</div>
        <div>
          <h1>Audio Bay</h1>
          <p className="audiobay-header__tagline">
            Impact Lab — Technician ROV · Technical review before Certification
          </p>
        </div>
      </header>

      <p className="audiobay-note">
        This room checks technical readiness, not creative quality — mix, format,
        clearance. A human reviewer always makes the final call to advance a
        piece; nothing here auto-certifies.
      </p>

      <div className="audiobay-layout">

        {/* Queue */}
        <aside className="audiobay-queue">
          <h2 className="audiobay-queue__title">Queue ({submissions.length})</h2>
          {submissions.map(s => (
            <button
              key={s.id}
              className={`audiobay-queue__item ${selectedId === s.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(s.id)}
            >
              <span className="audiobay-queue__item-title">{s.title}</span>
              <span className="audiobay-queue__item-meta">{s.originProgramme} · {s.durationLabel}</span>
              <StatusPill status={s.status} />
            </button>
          ))}
        </aside>

        {/* Review panel */}
        <main className="audiobay-review">
          {!selected ? (
            <p className="audiobay-empty">Select a submission from the queue.</p>
          ) : (
            <>
              <div className="audiobay-review__header">
                <div>
                  <h2>{selected.title}</h2>
                  <p className="audiobay-review__meta">
                    {selected.creatorName} · {selected.originProgramme} · submitted {selected.submittedAt}
                  </p>
                </div>
                <StatusPill status={selected.status} />
              </div>

              <div className="audiobay-player-placeholder">
                ▶ [Audio player not wired — playback pending real submission storage]
              </div>

              <section className="audiobay-criteria">
                <h3>Technical checklist</h3>
                {selected.criteria.map(c => (
                  <CriterionRow
                    key={c.id}
                    criterion={c}
                    onSetStatus={(id, status) => updateCriterionStatus(selected.id, id, status)}
                  />
                ))}
              </section>

              <section className="audiobay-notes">
                <h3>Reviewer notes</h3>
                {selected.reviewerNotes.length === 0 ? (
                  <p className="audiobay-empty">No notes yet.</p>
                ) : (
                  <ul className="audiobay-notes__list">
                    {selected.reviewerNotes.map((n, i) => (
                      <li key={i}>
                        <strong>{n.author}</strong> · {n.at}
                        <p>{n.note}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="audiobay-notes__add">
                  <textarea
                    value={noteDraft}
                    onChange={e => setNoteDraft(e.target.value)}
                    placeholder="Add a review note…"
                    rows={2}
                  />
                  <button onClick={() => addReviewerNote(selected.id)}>Add note</button>
                </div>
              </section>

              {anyFlagged && (
                <div className="audiobay-alert audiobay-alert--flag">
                  One or more criteria are flagged. Resolve or send back for revision —
                  a flagged submission shouldn't advance silently.
                </div>
              )}

              <div className="audiobay-actions">
                <button
                  className="audiobay-actions__revision"
                  onClick={() => sendBackForRevision(selected.id)}
                >
                  ← Send back for revision
                </button>
                <button
                  className="audiobay-actions__advance"
                  disabled={!allCriteriaChecked || anyFlagged}
                  onClick={() => advanceToCertification(selected.id)}
                  title={
                    !allCriteriaChecked
                      ? 'All criteria must be checked first'
                      : anyFlagged
                      ? 'Resolve flags before advancing'
                      : 'Advance to Certification (KaywanasAtrium)'
                  }
                >
                  Advance to Certification →
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AudioBay;