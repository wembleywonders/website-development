import React, { useCallback } from 'react';
import { VoicePart as VoicePartProfile, VOICE_PARTS } from './voiceRanges';
import audioEngine from '../../engine/AudioEngine';

/**
 * VoicePart.tsx — one voice-part card within the Vocal Room.
 *
 * Mirrors Musician.tsx's pattern: one card per entity (here, a voice part
 * rather than an instrument), selectable, with a live preview using the
 * shared audioEngine singleton — never a custom AudioContext, per the
 * standing rule for this room set.
 *
 * "Preview" plays the low note, then the high note, of this voice part's
 * range, using its own waveform — giving the singer an audible sense of
 * "this is my part" before committing to it.
 */

export interface VoicePartCardProps {
  partId: string;
  isSelected: boolean;
  onSelect: (part: VoicePartProfile) => void;
}

const PREVIEW_NOTE_DURATION = 0.5;

const VoicePart: React.FC<VoicePartCardProps> = ({ partId, isSelected, onSelect }) => {
  const part = VOICE_PARTS.find((v) => v.id === partId);

  const handlePreview = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation(); // preview shouldn't also trigger selection
      if (!part) return;
      await audioEngine.resume();
      const now = audioEngine.time;
      audioEngine.playNote(part.lowNote, PREVIEW_NOTE_DURATION, part.waveform, now, 0.5);
      audioEngine.playNote(
        part.highNote,
        PREVIEW_NOTE_DURATION,
        part.waveform,
        now + PREVIEW_NOTE_DURATION + 0.15,
        0.5
      );
    },
    [part]
  );

  const handleSelect = useCallback(async () => {
    if (!part) return;
    await audioEngine.resume();
    onSelect(part);
  }, [part, onSelect]);

  if (!part) {
    return (
      <div className="voice-part voice-part--error">
        Unknown voice part: {partId}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`voice-part${isSelected ? ' voice-part--selected' : ''}`}
      style={{ '--voice-part-colour': part.colour } as React.CSSProperties}
      onClick={handleSelect}
      aria-pressed={isSelected}
    >
      <div className="voice-part__header">
        <span className="voice-part__label">{part.label}</span>
        <span className="voice-part__range">{part.rangeLabel}</span>
      </div>

      <p className="voice-part__description">{part.description}</p>
      <p className="voice-part__cultural-role">{part.culturalRole}</p>

      <button
        type="button"
        className="voice-part__preview-button"
        onClick={handlePreview}
        aria-label={`Preview ${part.label} range`}
      >
        ▶ Hear this range
      </button>
    </button>
  );
};

export default VoicePart;
