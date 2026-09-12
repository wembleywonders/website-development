// ChantPatterns.tsx
// Third panel of the Vocal Room — unison/call/response chant patterns.
//
// SCOPE NOTE: there's no existing "chant pattern" data file in this
// programme to build against (unlike voiceRanges.ts, which already
// existed for VoicePart/HarmonyBuilder) — this is new design territory,
// not a discovery. Built from two pieces that DO already exist and are
// real: the unison/call/response voice parts in voiceRanges.ts, and the
// DRUM_KITS clap sounds in engine/AudioEngine.ts. No new data shape
// invented beyond the step-pattern array itself.

import React, { useState, useRef } from 'react';
import { audioEngine, DRUM_KITS } from '../../engine/AudioEngine';
import { getVoicePart } from './voiceRanges';
import './ChantPatterns.css';

export type ChantCell = 'rest' | 'unison' | 'call' | 'response' | 'clap';

interface ChantPatternsProps {
  styleProfile?: { name?: string; defaultBpm?: number } | null;
  onConfirm: (pattern: string[]) => void;
}

const STEP_COUNT = 8;
const CELL_CYCLE: ChantCell[] = ['rest', 'call', 'response', 'unison', 'clap'];
const DEFAULT_BPM = 120;

const CELL_LABEL: Record<ChantCell, string> = {
  rest: '·',
  call: 'Call',
  response: 'Resp',
  unison: 'Unison',
  clap: 'Clap',
};

const CELL_DESCRIPTION: Record<ChantCell, string> = {
  rest: 'Silence — a beat to breathe',
  call: 'The leader sings out',
  response: 'The crowd answers back',
  unison: 'Everyone, one voice, one note',
  clap: 'A clap on the beat',
};

function nextCell(current: ChantCell): ChantCell {
  const idx = CELL_CYCLE.indexOf(current);
  return CELL_CYCLE[(idx + 1) % CELL_CYCLE.length];
}

const ChantPatterns: React.FC<ChantPatternsProps> = ({
  styleProfile,
  onConfirm,
}) => {
  const [pattern, setPattern] = useState<ChantCell[]>(
    Array(STEP_COUNT).fill('rest')
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const playbackTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const bpm = styleProfile?.defaultBpm ?? DEFAULT_BPM;

  // ─── RECONSTRUCTED SECTION — not recovered verbatim, built to match ───
  // ─── the established variable names, cell cycle, and scope note above ───

  const stepDurationMs = (60 / bpm) * 1000; // one beat per step, 8 steps = 2 bars at 4/4

  const toggleCell = (index: number) => {
    if (isPlaying) return; // don't edit mid-playback
    setPattern(prev => {
      const next = [...prev];
      next[index] = nextCell(prev[index]);
      return next;
    });
  };

  const clearPattern = () => {
    if (isPlaying) return;
    setPattern(Array(STEP_COUNT).fill('rest'));
  };

  const stopPlayback = () => {
    playbackTimeoutsRef.current.forEach(clearTimeout);
    playbackTimeoutsRef.current = [];
    setIsPlaying(false);
    setActiveStep(null);
  };

  const playPattern = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    await audioEngine.resume();
    setIsPlaying(true);
    const now = audioEngine.time;
    const clapSound = DRUM_KITS['808']?.sounds.clap;

    pattern.forEach((cell, i) => {
      const stepTime = now + (i * stepDurationMs) / 1000;

      // Schedule the sound for this step
      if (cell === 'clap' && clapSound) {
        audioEngine.playDrum(clapSound, stepTime, 0.6);
      } else if (cell === 'unison' || cell === 'call' || cell === 'response') {
        const voicePart = getVoicePart(cell);
        if (voicePart) {
          audioEngine.playNote(voicePart.lowNote, stepDurationMs / 1000 * 0.8, voicePart.waveform, stepTime, 0.4);
        }
      }

      // Schedule the UI highlight for this step, in real wall-clock time
      const timeout = setTimeout(() => {
        setActiveStep(i);
      }, i * stepDurationMs);
      playbackTimeoutsRef.current.push(timeout);
    });

    // Stop after the full pattern has played once
    const endTimeout = setTimeout(() => {
      stopPlayback();
    }, STEP_COUNT * stepDurationMs);
    playbackTimeoutsRef.current.push(endTimeout);
  };

  const handleConfirm = () => {
    onConfirm(pattern);
  };

  // ─── END RECONSTRUCTED SECTION ───

  return (
    <div className="chant-patterns">
      <header className="chant-patterns__header">
        <h3>Raise the chant</h3>
        <p className="chant-patterns__subtitle">
          Tap a step to cycle through: rest → call → response → unison → clap.
        </p>
      </header>

      <div className="chant-patterns__grid">
        {pattern.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={`chant-patterns__cell chant-patterns__cell--${cell}${activeStep === i ? ' chant-patterns__cell--active' : ''}`}
            onClick={() => toggleCell(i)}
            title={CELL_DESCRIPTION[cell]}
            disabled={isPlaying}
          >
            {CELL_LABEL[cell]}
          </button>
        ))}
      </div>

      <div className="chant-patterns__transport">
        <button type="button" onClick={playPattern} className="chant-patterns__play-btn">
          {isPlaying ? '■ Stop' : '▶ Play'}
        </button>
        <button
          type="button"
          onClick={clearPattern}
          className="chant-patterns__clear-btn"
          disabled={isPlaying}
        >
          Clear
        </button>
      </div>

      <div className="chant-patterns__actions">
        <button className="chant-patterns__confirm-btn" onClick={handleConfirm}>
          Confirm this chant →
        </button>
      </div>
    </div>
  );
};

export default ChantPatterns;
