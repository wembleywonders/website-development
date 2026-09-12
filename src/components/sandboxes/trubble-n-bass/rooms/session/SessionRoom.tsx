import React, { useState, useMemo } from 'react';
import Musician, { CreatorInput, CreatorInputKind } from './Musician';
import {
  SESSION_MUSICIANS,
  DEFAULT_TRIO,
  DEFAULT_QUARTET,
  getMusician,
} from './musicianPersonas';
import './SessionRoom.css';

/**
 * SessionRoom.tsx — the songwriter's rehearsal room.
 *
 * The creator brings an idea (chord, rhythm, melody, feel) and directs it
 * at a musician, who interprets it within their own vocabulary — see
 * Musician.tsx for how that interpretation works.
 *
 * Ensemble sizes are constrained to what the real persona roster supports.
 * musicianPersonas.ts currently defines four musicians (Delroy, Pearl,
 * Rico, Grace) — DEFAULT_TRIO and DEFAULT_QUARTET are both real exports.
 * Quintet/Section/Full-ensemble tabs from the original design conversation
 * are NOT included here — that needs new personas added to the roster
 * first, a content decision, not a UI one.
 */

export type EnsembleSize = 'solo' | 'duo' | 'trio' | 'quartet';

const ENSEMBLE_TABS: { size: EnsembleSize; label: string }[] = [
  { size: 'solo', label: 'Solo' },
  { size: 'duo', label: 'Duo' },
  { size: 'trio', label: 'Trio' },
  { size: 'quartet', label: 'Quartet' },
];

function personaIdsForSize(size: EnsembleSize): string[] {
  switch (size) {
    case 'solo':
      return [DEFAULT_TRIO[0]]; // Delroy — rhythm is where most songwriters start
    case 'duo':
      return DEFAULT_TRIO.slice(0, 2); // Delroy + Pearl — rhythm and harmony
    case 'trio':
      return DEFAULT_TRIO;
    case 'quartet':
      return DEFAULT_QUARTET;
  }
}

const INPUT_KIND_OPTIONS: { kind: CreatorInputKind; label: string }[] = [
  { kind: 'tap', label: 'Tap a rhythm' },
  { kind: 'feel-descriptor', label: 'Describe the feel' },
  { kind: 'chord-progression', label: 'Name a chord' },
  { kind: 'hummed-melody', label: 'Hum a melody' },
  { kind: 'root-note', label: 'Set the root note' },
];

export interface SessionRoomState {
  ensembleSize: EnsembleSize;
  focusedPersonaId: string | null;
  lastInput: CreatorInput | null;
}

interface SessionRoomProps {
  onReadyForNextRoom?: (state: SessionRoomState) => void;
}

const SessionRoom: React.FC<SessionRoomProps> = ({ onReadyForNextRoom }) => {
  const [ensembleSize, setEnsembleSize] = useState<EnsembleSize>('trio');
  const [focusedPersonaId, setFocusedPersonaId] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<CreatorInput | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [draftKind, setDraftKind] = useState<CreatorInputKind>('feel-descriptor');

  const activePersonaIds = useMemo(() => personaIdsForSize(ensembleSize), [ensembleSize]);

  // Default focus to the first musician in the ensemble whenever size changes
  const effectiveFocusId = focusedPersonaId && activePersonaIds.includes(focusedPersonaId)
    ? focusedPersonaId
    : activePersonaIds[0] ?? null;

  const handleEnsembleChange = (size: EnsembleSize) => {
    setEnsembleSize(size);
    setFocusedPersonaId(null); // let it default to first musician in new size
  };

  const handleSendInput = () => {
    if (!draftValue.trim() || !effectiveFocusId) return;
    const input: CreatorInput = { kind: draftKind, value: draftValue.trim() };
    setLastInput(input);
    setDraftValue('');
  };

  const handleContinue = () => {
    onReadyForNextRoom?.({
      ensembleSize,
      focusedPersonaId: effectiveFocusId,
      lastInput,
    });
  };

  return (
    <div className="session-room">
      <header className="session-room__header">
        <h2>Session Room</h2>
        <p className="session-room__subtitle">
          Bring the band your idea. They'll interpret it their own way.
        </p>
      </header>

      <nav className="session-room__ensemble-tabs" role="tablist" aria-label="Ensemble size">
        {ENSEMBLE_TABS.map((tab) => (
          <button
            key={tab.size}
            type="button"
            role="tab"
            aria-selected={ensembleSize === tab.size}
            className={`session-room__ensemble-tab${ensembleSize === tab.size ? ' session-room__ensemble-tab--active' : ''}`}
            onClick={() => handleEnsembleChange(tab.size)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="session-room__stage">
        {activePersonaIds.map((personaId) => (
          <Musician
            key={personaId}
            personaId={personaId}
            currentInput={lastInput && effectiveFocusId === personaId ? lastInput : null}
            isActive={effectiveFocusId === personaId}
            onFocus={setFocusedPersonaId}
          />
        ))}
      </div>

      <div className="session-room__input-panel">
        <p className="session-room__input-target">
          {effectiveFocusId
            ? `Directing: ${getMusician(effectiveFocusId)?.name ?? effectiveFocusId}`
            : 'Tap a musician to direct them'}
        </p>

        <div className="session-room__input-kind-row">
          {INPUT_KIND_OPTIONS.map((opt) => (
            <button
              key={opt.kind}
              type="button"
              className={`session-room__input-kind-btn${draftKind === opt.kind ? ' session-room__input-kind-btn--active' : ''}`}
              onClick={() => setDraftKind(opt.kind)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="session-room__input-row">
          <input
            type="text"
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendInput()}
            placeholder="e.g. straight 4/4, or Cm7, or a mood word"
            disabled={!effectiveFocusId}
          />
          <button
            type="button"
            onClick={handleSendInput}
            disabled={!draftValue.trim() || !effectiveFocusId}
          >
            Send
          </button>
        </div>
      </div>

      <div className="session-room__actions">
        <button type="button" className="session-room__continue" onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default SessionRoom;
