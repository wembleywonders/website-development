import React, { useState } from 'react';
import VoicePartCard from './VoicePart';
import HarmonyBuilder from './HarmonyBuilder';
import ChantPatterns from './ChantPatterns';
import { VoicePart as VoicePartProfile, VOICE_PARTS } from './voiceRanges';
import type { ConceptRoomState } from '../concept/ConceptRoom';
import './VocalRoom.css';

export type VocalInput = 'sing' | 'harmony' | 'chant';

export interface VocalRoomState {
  voicePart: VoicePartProfile | null;
  recordedTake: { audioBlobUrl: string; durationSeconds: number } | null;
  harmonyParts: (VoicePartProfile | null)[];
  chantPattern: string[] | null;
}

interface VocalRoomProps {
  conceptState?: ConceptRoomState | null;
  onReadyForProduction?: (state: VocalRoomState) => void;
}

const TABS: { key: VocalInput; label: string }[] = [
  { key: 'sing', label: 'Sing' },
  { key: 'harmony', label: 'Harmony' },
  { key: 'chant', label: 'Chant' },
];

const VocalRoom: React.FC<VocalRoomProps> = ({
  conceptState,
  onReadyForProduction,
}) => {
  const [voicePart, setVoicePart] = useState<VoicePartProfile | null>(null);
  const [recordedTake, setRecordedTake] = useState<{ audioBlobUrl: string; durationSeconds: number } | null>(null);
  const [harmonyParts, setHarmonyParts] = useState<(VoicePartProfile | null)[]>([]);
  const [chantPattern, setChantPattern] = useState<string[] | null>(null);
  const [activeTab, setActiveTab] = useState<VocalInput>('sing');

  const hasVoicePart = !!voicePart;
  const hasRecording = !!recordedTake;
  const hasHarmony = harmonyParts.some(Boolean);
  const hasChant = !!chantPattern && chantPattern.length > 0;
  const readyForHarmony = hasVoicePart && hasRecording;

  const canContinue =
    (activeTab === 'sing' && hasVoicePart) ||
    (activeTab === 'harmony' && hasHarmony) ||
    (activeTab === 'chant' && hasChant);

  const handleContinue = () => {
    onReadyForProduction?.({
      voicePart,
      recordedTake,
      harmonyParts,
      chantPattern,
    });
  };

  return (
    <div className="vocal-room">
      <header className="vocal-room__header">
        <h2>Vocal Room</h2>
        <p className="vocal-room__subtitle">
          Find your part. Build the harmony. Raise the chant.
        </p>
      </header>

      <nav className="vocal-room__tabs" role="tablist" aria-label="Vocal input mode">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`vocal-room__tab${activeTab === tab.key ? ' vocal-room__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="vocal-room__panel">
        {activeTab === 'sing' && (
          <div className="vocal-room__sing">
            <div className="vocal-room__voice-grid">
              {VOICE_PARTS.map((part) => (
                <VoicePartCard
                  key={part.id}
                  partId={part.id}
                  isSelected={voicePart?.id === part.id}
                  onSelect={(selected) => setVoicePart(selected)}
                />
              ))}
            </div>

            {hasVoicePart && (
              <p className="vocal-room__selection-note">
                Singing as: <strong>{voicePart!.label}</strong>
              </p>
            )}

            {hasVoicePart && !hasRecording && (
              <button
                type="button"
                className="vocal-room__record-button"
                onClick={() =>
                  setRecordedTake({ audioBlobUrl: '', durationSeconds: 0 })
                }
              >
                ● Record your take
              </button>
            )}

            {hasRecording && (
              <p className="vocal-room__recording-note">Take recorded.</p>
            )}
          </div>
        )}

        {activeTab === 'harmony' && (
          readyForHarmony ? (
            <HarmonyBuilder
              leadVoice={voicePart!}
              leadTake={recordedTake!}
              onConfirm={(parts) => setHarmonyParts(parts)}
            />
          ) : (
            <p className="vocal-room__gate-note">
              Pick a voice part and record your take in Sing first.
            </p>
          )
        )}

        {activeTab === 'chant' && (
          <ChantPatterns
            styleProfile={null}
            onConfirm={(pattern) => setChantPattern(pattern)}
          />
        )}
      </div>

      {conceptState && (
        <p className="vocal-room__concept-context">
          Carrying forward from Concept Room.
        </p>
      )}

      <div className="vocal-room__actions">
        <button
          type="button"
          className="vocal-room__continue"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue to Production
        </button>
      </div>
    </div>
  );
};

export default VocalRoom;
