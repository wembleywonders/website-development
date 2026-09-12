// HarmonyBuilder.tsx
// Second panel of the Vocal Room — add complementary voice parts around
// the lead take recorded in VoicePart.
//
// SCOPE, stated plainly: this is a reference-tone tool, not pitch-matched
// auto-harmony. It suggests sensible complementary parts using the real
// SATB/GOSPEL_CHOIR/CHANT_CONFIG groupings from voiceRanges.ts, and lets
// the creator hear each candidate's register alongside their recorded
// take. It does NOT analyse the actual pitch of the recording — that
// would need PitchDetector.ts (confirmed to exist in engine/, content not
// yet seen by this build). Wiring real pitch-matched harmony is a
// follow-up once that file's interface is confirmed, not guessed here.

import React, { useState, useRef } from 'react';
import { audioEngine } from '../../engine/AudioEngine';
import {
  VOICE_PARTS,
  VoicePart,
  SATB,
  GOSPEL_CHOIR,
  CHANT_CONFIG,
  getVoicePart,
} from './voiceRanges';
import './HarmonyBuilder.css';

interface HarmonyBuilderProps {
  leadVoice: VoicePart;
  leadTake: { audioBlobUrl: string; durationSeconds: number };
  onConfirm: (parts: (VoicePart | null)[]) => void;
}

const MAX_HARMONY_PARTS = 3;
const PREVIEW_NOTE_DURATION = 0.5;

// ─────────────────────────────────────────────────────────────────────────────
// Suggest complementary parts using the real groupings, lead excluded
// ─────────────────────────────────────────────────────────────────────────────

function suggestHarmonyParts(leadId: string): VoicePart[] {
  let pool: string[];
  if (SATB.includes(leadId)) {
    pool = SATB;
  } else if (CHANT_CONFIG.includes(leadId)) {
    pool = CHANT_CONFIG;
  } else {
    pool = GOSPEL_CHOIR;
  }
  return pool
    .filter(id => id !== leadId)
    .map(getVoicePart)
    .filter((v): v is VoicePart => !!v);
}

const HarmonyBuilder: React.FC<HarmonyBuilderProps> = ({
  leadVoice,
  leadTake,
  onConfirm,
}) => {
  const [showAllParts, setShowAllParts] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [isPreviewingTogether, setIsPreviewingTogether] = useState(false);

  const leadAudioRef = useRef<HTMLAudioElement | null>(null);

  const suggested = suggestHarmonyParts(leadVoice.id);
  const candidates = showAllParts
    ? VOICE_PARTS.filter(v => v.id !== leadVoice.id)
    : suggested;

  const selectedParts = selectedIds
    .map(getVoicePart)
    .filter((v): v is VoicePart => !!v);

  // ─── RECONSTRUCTED SECTION — not recovered verbatim, built to match ───
  // ─── the established variable names and component contract above ───

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(existing => existing !== id);
      if (prev.length >= MAX_HARMONY_PARTS) return prev; // cap reached, ignore
      return [...prev, id];
    });
  };

  const previewPart = async (part: VoicePart) => {
    setPreviewingId(part.id);
    await audioEngine.resume();
    const now = audioEngine.time;
    audioEngine.playNote(part.lowNote, PREVIEW_NOTE_DURATION, part.waveform, now, 0.45);
    audioEngine.playNote(
      part.highNote,
      PREVIEW_NOTE_DURATION,
      part.waveform,
      now + PREVIEW_NOTE_DURATION + 0.1,
      0.45
    );
    setTimeout(() => setPreviewingId(null), (PREVIEW_NOTE_DURATION * 2 + 0.1) * 1000);
  };

  const previewTogether = async () => {
    if (selectedParts.length === 0) return;
    setIsPreviewingTogether(true);
    await audioEngine.resume();
    const now = audioEngine.time;
    // Lead plus every selected part sounds together, each at its own
    // mid-range note, so the creator hears the chord shape rather than
    // just a single line.
    [leadVoice, ...selectedParts].forEach(part => {
      audioEngine.playNote(part.lowNote, 1.2, part.waveform, now, 0.35);
    });
    setTimeout(() => setIsPreviewingTogether(false), 1300);
  };

  const handleSkip = () => {
    onConfirm([]);
  };

  const handleConfirm = () => {
    onConfirm(selectedParts);
  };

  // ─── END RECONSTRUCTED SECTION ───

  return (
    <div className="harmony-builder">
      <header className="harmony-builder__header">
        <h3>Build the harmony</h3>
        <p className="harmony-builder__lead-recap">
          Lead: <strong>{leadVoice.label}</strong>
          {leadTake.durationSeconds > 0 && ` · ${Math.round(leadTake.durationSeconds)}s take`}
        </p>
      </header>

      <div className="harmony-builder__toggle-row">
        <button
          type="button"
          className={`harmony-builder__filter-btn${!showAllParts ? ' harmony-builder__filter-btn--active' : ''}`}
          onClick={() => setShowAllParts(false)}
        >
          Suggested
        </button>
        <button
          type="button"
          className={`harmony-builder__filter-btn${showAllParts ? ' harmony-builder__filter-btn--active' : ''}`}
          onClick={() => setShowAllParts(true)}
        >
          All parts
        </button>
      </div>

      <div className="harmony-builder__grid">
        {candidates.map(part => (
          <div
            key={part.id}
            className={`harmony-builder__candidate${selectedIds.includes(part.id) ? ' harmony-builder__candidate--selected' : ''}`}
            style={{ '--hb-colour': part.colour } as React.CSSProperties}
          >
            <button
              type="button"
              className="harmony-builder__candidate-select"
              onClick={() => toggleSelect(part.id)}
              aria-pressed={selectedIds.includes(part.id)}
            >
              <span className="harmony-builder__candidate-label">{part.label}</span>
              <span className="harmony-builder__candidate-range">{part.rangeLabel}</span>
            </button>
            <button
              type="button"
              className="harmony-builder__candidate-preview"
              onClick={() => previewPart(part)}
              disabled={previewingId === part.id}
              aria-label={`Preview ${part.label}`}
            >
              {previewingId === part.id ? '…' : '▶'}
            </button>
          </div>
        ))}
      </div>

      {selectedParts.length > 0 && (
        <div className="harmony-builder__selected-row">
          <span className="harmony-builder__selected-count">
            {selectedParts.length} part{selectedParts.length > 1 ? 's' : ''} selected:
          </span>
          {selectedParts.map(part => (
            <span
              key={part.id}
              className="harmony-builder__selected-chip"
              style={{ '--hb-colour': part.colour } as React.CSSProperties}
            >
              {part.label}
            </span>
          ))}
          <button
            className="harmony-builder__preview-together-btn"
            onClick={previewTogether}
            disabled={isPreviewingTogether}
          >
            {isPreviewingTogether ? 'Playing…' : '▶ Preview together'}
          </button>
        </div>
      )}

      <div className="harmony-builder__actions">
        <button className="harmony-builder__skip-btn" onClick={handleSkip}>
          Skip harmony, take this as-is →
        </button>
        {selectedParts.length > 0 && (
          <button className="harmony-builder__confirm-btn" onClick={handleConfirm}>
            Confirm {selectedParts.length} harmony part{selectedParts.length > 1 ? 's' : ''} →
          </button>
        )}
      </div>
    </div>
  );
};

export default HarmonyBuilder;
