// src/production-hub/SimulationChamber.tsx
//
// Pipeline stage: IMPACT LAB (Technician ROV)
// Studio pair: SimulationChamber (this file — non-audio technical validation)
//              + AudioBay (audio-specific technical validation)
// Confirmed design source: Feb 2026 pipeline diagram (STUDIO_ROV_MAPPING —
//   SimulationChamber: stage 'impact-lab', primaryROV 'technician',
//   capabilities ['user-testing', 'quality-review']) + AudioBay.tsx's own
//   header comment (15 Aug 2026), which names this file directly as its
//   counterpart for interactive/functional review.
//
// What this room does: technical review of a non-audio submission —
// functionality/interactivity, cross-device/browser behaviour,
// accessibility basics, performance, and completeness of the user flow —
// before the piece is eligible to advance to Certification. This is NOT
// a build tool and NOT a creation studio — those live in each programme's
// own sandbox.tsx/studio.tsx. This is the gatekeeping room between "made"
// and "certified," same function as AudioBay for the non-audio case.
//
// CONSTITUTIONAL CONSTRAINT (per WW-SPEC-ROV-SUBMISSION-PIPELINE-001,
// Section 0 — same rule AudioBay follows): no automated path to an
// approved/certified status. The Technician ROV can run checks and flag
// results, but advancing a submission is always an explicit human
// (steward/reviewer) action.
//
// DATA NOTE: no confirmed backend endpoint exists yet for an Impact Lab
// non-audio submission queue. The submissions below are local mock state,
// clearly marked — not a real fetch pretending to be one. Mirrors
// AudioBay's honesty pattern rather than inventing a fake "live" feel.

import React, { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────────

type ChecklistKey =
  | 'functionality'
  | 'crossDeviceCompatibility'
  | 'accessibility'
  | 'performance'
  | 'userFlowCompleteness';

interface ChecklistState {
  functionality: boolean;
  crossDeviceCompatibility: boolean;
  accessibility: boolean;
  performance: boolean;
  userFlowCompleteness: boolean;
}

interface FlaggedIssue {
  key: ChecklistKey;
  note: string;
}

interface SimulationSubmission {
  id: string;
  title: string;
  programme: string;      // e.g. 'STEMgeneers', 'Scrap Cat', 'G-Tech Casters'
  submittedBy: string;
  submittedAt: string;    // display string, not a real timestamp system yet
  description: string;
  checklist: ChecklistState;
  flagged: FlaggedIssue[];
  reviewerNotes: string;
  advancedToCertification: boolean;
}

// ── Mock data — clearly not live (see DATA NOTE above) ───────────────────

const MOCK_SUBMISSIONS: SimulationSubmission[] = [
  {
    id: 'sim-001',
    title: 'Maze-Solver Robot Control Interface',
    programme: 'STEMgeneers',
    submittedBy: 'unassigned',
    submittedAt: 'mock — no real submission timestamp yet',
    description:
      'Web control panel for a programmable maze-solving robot build — directional controls, sensor readout, run log.',
    checklist: {
      functionality: false,
      crossDeviceCompatibility: false,
      accessibility: false,
      performance: false,
      userFlowCompleteness: false,
    },
    flagged: [],
    reviewerNotes: '',
    advancedToCertification: false,
  },
  {
    id: 'sim-002',
    title: 'Community Directory Search Filter',
    programme: 'G-Tech Casters',
    submittedBy: 'unassigned',
    submittedAt: 'mock — no real submission timestamp yet',
    description:
      'Search-and-filter component for the member business directory prototype.',
    checklist: {
      functionality: false,
      crossDeviceCompatibility: false,
      accessibility: false,
      performance: false,
      userFlowCompleteness: false,
    },
    flagged: [],
    reviewerNotes: '',
    advancedToCertification: false,
  },
];

const CHECKLIST_LABELS: Record<ChecklistKey, string> = {
  functionality: 'Core functionality works as described',
  crossDeviceCompatibility: 'Behaves correctly across common device/browser sizes',
  accessibility: 'Meets basic accessibility expectations (keyboard nav, contrast, labels)',
  performance: 'No obvious performance issues (load time, responsiveness)',
  userFlowCompleteness: 'The user flow is complete — no dead ends or missing steps',
};

// ── Component ──────────────────────────────────────────────────────────

const SimulationChamber: React.FC = () => {
  const [submissions, setSubmissions] = useState<SimulationSubmission[]>(MOCK_SUBMISSIONS);
  const [activeId, setActiveId] = useState<string | null>(MOCK_SUBMISSIONS[0]?.id ?? null);

  const active = submissions.find((s) => s.id === activeId) ?? null;

  const updateActive = (updater: (s: SimulationSubmission) => SimulationSubmission) => {
    if (!active) return;
    setSubmissions((prev) =>
      prev.map((s) => (s.id === active.id ? updater(s) : s))
    );
  };

  const toggleChecklistItem = (key: ChecklistKey) => {
    updateActive((s) => ({
      ...s,
      checklist: { ...s.checklist, [key]: !s.checklist[key] },
    }));
  };

  const toggleFlag = (key: ChecklistKey) => {
    updateActive((s) => {
      const isFlagged = s.flagged.some((f) => f.key === key);
      return {
        ...s,
        flagged: isFlagged
          ? s.flagged.filter((f) => f.key !== key)
          : [...s.flagged, { key, note: '' }],
      };
    });
  };

  const updateFlagNote = (key: ChecklistKey, note: string) => {
    updateActive((s) => ({
      ...s,
      flagged: s.flagged.map((f) => (f.key === key ? { ...f, note } : f)),
    }));
  };

  const updateReviewerNotes = (notes: string) => {
    updateActive((s) => ({ ...s, reviewerNotes: notes }));
  };

  // Gating: matches AudioBay — every checklist item must be checked AND
  // nothing may be flagged. This is a human decision recorded via an
  // explicit click, never an automated status change.
  const allChecked = active
    ? Object.values(active.checklist).every(Boolean)
    : false;
  const hasFlags = active ? active.flagged.length > 0 : false;
  const canAdvance = allChecked && !hasFlags && !active?.advancedToCertification;

  const handleAdvance = () => {
    if (!canAdvance) return;
    updateActive((s) => ({ ...s, advancedToCertification: true }));
  };

  return (
    <div className="simulation-chamber">
      <header className="simulation-chamber__header">
        <h2>Simulation Chamber</h2>
        <p className="simulation-chamber__subtitle">
          Impact Lab — non-audio technical review (Technician ROV)
        </p>
      </header>

      <div className="simulation-chamber__body">
        <aside className="simulation-chamber__queue">
          <h3>Submission queue</h3>
          <p className="simulation-chamber__queue-note">
            Mock data — no live Impact Lab submission endpoint confirmed yet.
          </p>
          <ul>
            {submissions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={
                    s.id === activeId
                      ? 'simulation-chamber__queue-item simulation-chamber__queue-item--active'
                      : 'simulation-chamber__queue-item'
                  }
                  onClick={() => setActiveId(s.id)}
                >
                  <span className="simulation-chamber__queue-title">{s.title}</span>
                  <span className="simulation-chamber__queue-programme">{s.programme}</span>
                  {s.advancedToCertification && (
                    <span className="simulation-chamber__queue-status">Advanced</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="simulation-chamber__review">
          {!active && <p>Select a submission from the queue.</p>}

          {active && (
            <>
              <h3>{active.title}</h3>
              <p className="simulation-chamber__description">{active.description}</p>
              <p className="simulation-chamber__meta">
                Programme: {active.programme} · Submitted by: {active.submittedBy} ·{' '}
                {active.submittedAt}
              </p>

              <section className="simulation-chamber__checklist">
                <h4>Technical checklist</h4>
                {(Object.keys(CHECKLIST_LABELS) as ChecklistKey[]).map((key) => {
                  const isFlagged = active.flagged.some((f) => f.key === key);
                  const flagEntry = active.flagged.find((f) => f.key === key);
                  return (
                    <div key={key} className="simulation-chamber__checklist-row">
                      <label>
                        <input
                          type="checkbox"
                          checked={active.checklist[key]}
                          onChange={() => toggleChecklistItem(key)}
                          disabled={active.advancedToCertification}
                        />
                        {CHECKLIST_LABELS[key]}
                      </label>
                      <button
                        type="button"
                        className={
                          isFlagged
                            ? 'simulation-chamber__flag-btn simulation-chamber__flag-btn--active'
                            : 'simulation-chamber__flag-btn'
                        }
                        onClick={() => toggleFlag(key)}
                        disabled={active.advancedToCertification}
                      >
                        {isFlagged ? 'Flagged' : 'Flag issue'}
                      </button>
                      {isFlagged && (
                        <textarea
                          className="simulation-chamber__flag-note"
                          placeholder="What's wrong here?"
                          value={flagEntry?.note ?? ''}
                          onChange={(e) => updateFlagNote(key, e.target.value)}
                          disabled={active.advancedToCertification}
                        />
                      )}
                    </div>
                  );
                })}
              </section>

              <section className="simulation-chamber__notes">
                <h4>Reviewer notes</h4>
                <textarea
                  value={active.reviewerNotes}
                  onChange={(e) => updateReviewerNotes(e.target.value)}
                  placeholder="General notes for this review — visible to the creator."
                  disabled={active.advancedToCertification}
                />
              </section>

              <section className="simulation-chamber__advance">
                {active.advancedToCertification ? (
                  <p className="simulation-chamber__advanced-notice">
                    Advanced to Certification.
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      className="simulation-chamber__advance-btn"
                      onClick={handleAdvance}
                      disabled={!canAdvance}
                    >
                      Advance to Certification
                    </button>
                    {!allChecked && (
                      <p className="simulation-chamber__advance-hint">
                        All checklist items must be checked before advancing.
                      </p>
                    )}
                    {hasFlags && (
                      <p className="simulation-chamber__advance-hint">
                        Resolve flagged issues before advancing.
                      </p>
                    )}
                  </>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SimulationChamber;