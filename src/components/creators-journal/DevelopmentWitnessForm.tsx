// src/components/creators-journal/DevelopmentWitnessForm.tsx
//
// Generic evidence-strengthening UI for a DevelopmentEvidence record —
// the "I developed/mentored someone else" credential added 21 Aug 2026
// to close the gap in docs/accreditation/WW-SESSION-HANDOFF-2026-08-21.md:
// no generic mentorship/development-log mechanism existed anywhere
// platform-wide, despite accreditation docs assuming one did.
//
// Modelled directly on PrototypeLab.tsx's inline WitnessForm pattern
// (src/pages/programmes/stemgeneers/PrototypeLab.tsx) — same open/closed
// toggle, same inline form shape — so it should feel familiar to anyone
// who's used that one. Two sections, not one, because this evidence type
// has two distinct kinds of corroboration:
//   1. The developed member's own confirmation — the PRIMARY evidence per
//      evidence-requirements.md (e.g. Trubble n Bass's TNB-2.4), since a
//      repair has no equivalent "person who was worked on" to ask.
//   2. A third-party witness — the same secondary mechanism RepairEvidence
//      already uses, reused as-is via the shared EvidenceVerification type.

import React, { useState } from 'react';
import { useJournalStore } from '../../stores/journalStore';
import type { DevelopmentEvidence } from '../../types/creators-journal';
import './DevelopmentWitnessForm.css';

export interface DevelopmentWitnessFormProps {
  developmentEvidenceId: string;
}

const DevelopmentWitnessForm: React.FC<DevelopmentWitnessFormProps> = ({ developmentEvidenceId }) => {
  const evidence = useJournalStore((s) => s.developmentEvidence[developmentEvidenceId]);

  if (!evidence) return null;

  const needsConfirmation = !evidence.developedMemberConfirmation;
  const needsWitness = evidence.verification.status === 'unverified' ||
    evidence.verification.status === 'self-reported';

  if (!needsConfirmation && !needsWitness) {
    return (
      <div className="dwf-strengthened">
        <span className="dwf-strengthenedIcon">&#10003;</span>
        Confirmed by the developed member{evidence.verification.witnessName ? ` and witnessed by ${evidence.verification.witnessName}` : ''}.
      </div>
    );
  }

  return (
    <div className="dwf-wrap">
      {needsConfirmation && <MemberConfirmationForm developmentEvidenceId={developmentEvidenceId} />}
      {needsWitness && <WitnessForm developmentEvidenceId={developmentEvidenceId} />}
    </div>
  );
};

// ── DEVELOPED MEMBER CONFIRMATION — primary evidence ─────────────────────────

const MemberConfirmationForm: React.FC<{ developmentEvidenceId: string }> = ({ developmentEvidenceId }) => {
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [statement, setStatement] = useState('');
  const confirmByDevelopedMember = useJournalStore((s) => s.confirmByDevelopedMember);

  const handleSubmit = () => {
    if (!memberName.trim() || !statement.trim()) return;
    confirmByDevelopedMember(developmentEvidenceId, {
      memberId: memberId.trim() || `member-${Date.now()}`,
      memberName: memberName.trim(),
      statement: statement.trim(),
    });
    setOpen(false);
    setMemberId('');
    setMemberName('');
    setStatement('');
  };

  return (
    <div className="dwf-prompt">
      <span className="dwf-promptIcon">&#128100;</span>
      <p>
        Ask the person who was developed to confirm this themselves — this is
        the primary evidence for this criterion, not the developing member's
        account alone.
      </p>
      {!open ? (
        <button className="dwf-openBtn" onClick={() => setOpen(true)}>
          Get developed member's confirmation
        </button>
      ) : (
        <div className="dwf-formInline">
          <input
            type="text"
            placeholder="Their name..."
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="dwf-input"
          />
          <textarea
            placeholder="In your own words — what changed, and how? (the developed member writes this)"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            className="dwf-textarea"
            rows={3}
          />
          <div className="dwf-formActions">
            <button className="dwf-primaryBtn" onClick={handleSubmit}>Confirm</button>
            <button className="dwf-ghostBtn" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── THIRD-PARTY WITNESS — secondary evidence, same mechanism as repairs ──────

const WitnessForm: React.FC<{ developmentEvidenceId: string }> = ({ developmentEvidenceId }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [statement, setStatement] = useState('');
  const [relationship, setRelationship] = useState<DevelopmentEvidence['verification']['witnessRelationship']>('collective-member');
  const witnessDevelopment = useJournalStore((s) => s.witnessDevelopment);

  const handleSubmit = () => {
    if (!name.trim() || !statement.trim()) return;
    witnessDevelopment(developmentEvidenceId, {
      userId: `witness-${Date.now()}`,
      name,
      statement,
      relationship,
    });
    setOpen(false);
    setName('');
    setStatement('');
  };

  if (!open) return (
    <button className="dwf-openBtn" onClick={() => setOpen(true)}>
      Add a third-party witness
    </button>
  );

  return (
    <div className="dwf-formInline">
      <input type="text" placeholder="Witness name..." value={name}
        onChange={(e) => setName(e.target.value)} className="dwf-input" />
      <select
        className="dwf-select"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value as typeof relationship)}
      >
        <option value="collective-member">Collective member</option>
        <option value="programme-peer">Programme peer</option>
        <option value="mentor">Mentor</option>
        <option value="client">Client</option>
      </select>
      <textarea placeholder="What did you observe? (Witness's own words)" value={statement}
        onChange={(e) => setStatement(e.target.value)} className="dwf-textarea" rows={3} />
      <div className="dwf-formActions">
        <button className="dwf-primaryBtn" onClick={handleSubmit}>Confirm witness</button>
        <button className="dwf-ghostBtn" onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default DevelopmentWitnessForm;
