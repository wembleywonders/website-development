// src/components/creators-journal/CultivateSection.tsx
//
// WW-SPEC-DEVIATION-TOUCHPOINT-001 / TNB-2.4: the Development Log is the
// first real place a member can call submitDevelopmentEvidence() — until
// this, the type/store existed but no page in the live app ever created a
// DevelopmentEvidence record. See docs/WW-OUTSTANDING-TASKS.md's TNB-2.4
// section for the full history of that gap.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJournalStore } from '../../stores/journalStore';
import DevelopmentWitnessForm from './DevelopmentWitnessForm';
import './CultivateSection.css';

const EMPTY_FORM = {
  programme: '',
  developingDescription: '',
  methodDescription: '',
  sessionsCount: '',
  totalTimeSpent: '',
  outcomeDescription: '',
};

const CultivateSection: React.FC = () => {
  const developmentEvidence = useJournalStore((s) => s.developmentEvidence);
  const submitDevelopmentEvidence = useJournalStore((s) => s.submitDevelopmentEvidence);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const entries = Object.values(developmentEvidence).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const canSubmit =
    form.programme.trim() &&
    form.developingDescription.trim() &&
    form.methodDescription.trim() &&
    form.outcomeDescription.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitDevelopmentEvidence({
      journalEntryId: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdBy: 'current-user',
      programme: form.programme.trim(),
      developing: { description: form.developingDescription.trim() },
      process: {
        methodDescription: form.methodDescription.trim(),
        sessionsCount: parseInt(form.sessionsCount, 10) || 0,
        totalTimeSpent: parseInt(form.totalTimeSpent, 10) || 0,
      },
      outcome: { outcomeDescription: form.outcomeDescription.trim() },
      verification: { status: 'self-reported' },
    });
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="journal-section cultivate-section">
      <div className="section-header">
        <h2>🌱 Cultivate</h2>
        <p>Grow your skills, refine your craft, and develop expertise</p>
      </div>

      <div className="learning-path">
        <h3>Learning Journey</h3>
        <p className="placeholder-text">
          Track your progression through workshops, courses, and self-directed learning.
        </p>
      </div>

      <div className="development-log">
        <h3>Development Log</h3>
        <p className="section-subtext">
          Developed or mentored someone else? Log it here — this is the
          evidence used for criteria like Trubble n Bass's TNB-2.4 (Artist
          Development &amp; A&amp;R) and similar cross-programme mentorship
          requirements. The person you developed can confirm it themselves
          once it's logged, and it can also carry a third-party witness — see{' '}
          <Link to="/programmes/stemgeneers/prototype-lab">the Prototype Lab's Repair Workshop</Link>{' '}
          for the same witnessing mechanism applied to repairs.
        </p>

        {!showForm ? (
          <button className="devlog-openBtn" onClick={() => setShowForm(true)}>
            + Log a Development Record
          </button>
        ) : (
          <div className="devlog-form">
            <label>
              Programme
              <input
                type="text"
                placeholder="e.g. trubble-n-bass, stemgeneers, bright-sparks..."
                value={form.programme}
                onChange={(e) => setForm({ ...form, programme: e.target.value })}
                className="devlog-input"
              />
            </label>
            <label>
              Who/what did you develop?
              <textarea
                placeholder="Raw starting point — what were they like before?"
                value={form.developingDescription}
                onChange={(e) => setForm({ ...form, developingDescription: e.target.value })}
                className="devlog-textarea"
                rows={2}
              />
            </label>
            <label>
              How did you develop them?
              <textarea
                placeholder="The method — sessions, feedback, practice you ran together..."
                value={form.methodDescription}
                onChange={(e) => setForm({ ...form, methodDescription: e.target.value })}
                className="devlog-textarea"
                rows={3}
              />
            </label>
            <div className="devlog-row">
              <label>
                Sessions
                <input
                  type="number"
                  min="0"
                  value={form.sessionsCount}
                  onChange={(e) => setForm({ ...form, sessionsCount: e.target.value })}
                  className="devlog-input devlog-inputSmall"
                />
              </label>
              <label>
                Total time (minutes)
                <input
                  type="number"
                  min="0"
                  value={form.totalTimeSpent}
                  onChange={(e) => setForm({ ...form, totalTimeSpent: e.target.value })}
                  className="devlog-input devlog-inputSmall"
                />
              </label>
            </div>
            <label>
              Outcome
              <textarea
                placeholder="What changed for them, concretely?"
                value={form.outcomeDescription}
                onChange={(e) => setForm({ ...form, outcomeDescription: e.target.value })}
                className="devlog-textarea"
                rows={2}
              />
            </label>
            <div className="devlog-formActions">
              <button className="devlog-primaryBtn" disabled={!canSubmit} onClick={handleSubmit}>
                Log it
              </button>
              <button className="devlog-ghostBtn" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {entries.length > 0 && (
          <div className="devlog-list">
            {entries.map((entry) => (
              <div key={entry.id} className="devlog-card">
                <div className="devlog-cardHeader">
                  <span className="devlog-programme">{entry.programme}</span>
                  <span className="devlog-date">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="devlog-description">{entry.developing.description}</p>
                <p className="devlog-outcome">{entry.outcome.outcomeDescription}</p>
                <DevelopmentWitnessForm developmentEvidenceId={entry.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="reflections">
        <h3>Reflections & Notes</h3>
        <p className="placeholder-text">
          Document your learning insights, challenges overcome, and growth moments.
        </p>
        <button className="add-reflection-btn">+ Add Reflection</button>
      </div>
    </div>
  );
};

export default CultivateSection;
