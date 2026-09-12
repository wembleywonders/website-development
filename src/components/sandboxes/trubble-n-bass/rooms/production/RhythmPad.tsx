// RhythmPad.tsx
// Second tab of the Production Room — live pad performance.
//
// UPDATE (this session): now accepts an optional padVolumes prop from
// MixerStrip.tsx, so the mixer's faders actually affect playback instead
// of being decorative. Falls back to 0.7 per pad if no volumes are
// supplied, preserving the original standalone behaviour.

import React, { useState, useRef, useCallback } from 'react';
import { audioEngine, DRUM_KITS, DrumSound } from '../../engine/AudioEngine';
import type { PadVolumes } from './MixerStrip';
import './RhythmPad.css';

const STEP_COUNT = 8;
const DEFAULT_KIT = '808';
const FALLBACK_VOLUME = 0.7;

const PAD_ORDER: (keyof typeof DRUM_KITS['808']['sounds'])[] = [
  'kick', 'snare', 'hihat', 'openhat', 'clap', 'tom', 'rim', 'perc',
];

export interface RhythmPadProps {
  bpm?: number;
  /** Per-pad volume from MixerStrip.tsx. If omitted, every pad plays at
   *  FALLBACK_VOLUME — RhythmPad still works standalone without a mixer. */
  padVolumes?: PadVolumes;
  onChange: (pattern: boolean[], bpm: number) => void;
}

const RhythmPad: React.FC<RhythmPadProps> = ({ bpm: initialBpm = 100, padVolumes, onChange }) => {
  const [kitId, setKitId] = useState<string>(DEFAULT_KIT);
  const [selectedPad, setSelectedPad] = useState<string>('kick');
  const [bpm, setBpm] = useState(initialBpm);
  const [pattern, setPattern] = useState<boolean[]>(Array(STEP_COUNT).fill(false));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const currentStepRef = useRef<number>(0);

  const kit = DRUM_KITS[kitId];
  const stepDurationMs = (60 / bpm) * 1000;

  const volumeFor = useCallback(
    (padId: string) => padVolumes?.[padId] ?? FALLBACK_VOLUME,
    [padVolumes]
  );

  const stopPlayback = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsPlaying(false);
    setIsRecording(false);
    setActiveStep(null);
  }, []);

  const startLoop = useCallback(() => {
    setIsPlaying(true);
    for (let i = 0; i < STEP_COUNT; i++) {
      const t = setTimeout(() => {
        currentStepRef.current = i;
        setActiveStep(i);
        if (pattern[i]) {
          audioEngine.playDrum(
            kit.sounds[selectedPad as keyof typeof kit.sounds],
            audioEngine.time,
            volumeFor(selectedPad)
          );
        }
      }, i * stepDurationMs);
      timeoutsRef.current.push(t);
    }
    const loopEnd = setTimeout(() => {
      startLoop();
    }, STEP_COUNT * stepDurationMs);
    timeoutsRef.current.push(loopEnd);
  }, [pattern, kit, selectedPad, stepDurationMs, volumeFor]);

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    await audioEngine.resume();
    startLoop();
  };

  const toggleRecord = () => {
    setIsRecording((prev) => !prev);
  };

  const handlePadTap = async (padId: string) => {
    setSelectedPad(padId);
    await audioEngine.resume();
    audioEngine.playDrum(
      kit.sounds[padId as keyof typeof kit.sounds],
      audioEngine.time,
      volumeFor(padId)
    );

    if (isPlaying && isRecording) {
      const step = currentStepRef.current;
      setPattern((prev) => {
        const next = [...prev];
        next[step] = true;
        return next;
      });
    }
  };

  const clearPattern = () => {
    setPattern(Array(STEP_COUNT).fill(false));
  };

  const handleConfirm = () => {
    onChange(pattern, bpm);
  };

  return (
    <div className="rhythm-pad">
      <header className="rhythm-pad__header">
        <h3>Rhythm Pad</h3>
        <p className="rhythm-pad__subtitle">
          Press play, then tap along. Whatever you hit gets recorded.
        </p>
      </header>

      <div className="rhythm-pad__kit-row">
        {Object.entries(DRUM_KITS).map(([id, k]) => (
          <button
            key={id}
            type="button"
            className={`rhythm-pad__kit-btn${kitId === id ? ' rhythm-pad__kit-btn--active' : ''}`}
            onClick={() => setKitId(id)}
          >
            {k.name}
          </button>
        ))}
      </div>

      <div className="rhythm-pad__grid">
        {PAD_ORDER.map((padId) => (
          <button
            key={padId}
            type="button"
            className={`rhythm-pad__pad${selectedPad === padId ? ' rhythm-pad__pad--selected' : ''}`}
            onClick={() => handlePadTap(padId)}
          >
            {padId}
          </button>
        ))}
      </div>

      <div className="rhythm-pad__step-indicator">
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`rhythm-pad__step${pattern[i] ? ' rhythm-pad__step--hit' : ''}${activeStep === i ? ' rhythm-pad__step--active' : ''}`}
          />
        ))}
      </div>

      <div className="rhythm-pad__transport">
        <button type="button" onClick={togglePlay} className="rhythm-pad__play-btn">
          {isPlaying ? '■ Stop' : '▶ Play'}
        </button>
        <button
          type="button"
          onClick={toggleRecord}
          className={`rhythm-pad__record-btn${isRecording ? ' rhythm-pad__record-btn--active' : ''}`}
          disabled={!isPlaying}
        >
          ● {isRecording ? 'Recording' : 'Record'}
        </button>
        <button type="button" onClick={clearPattern} className="rhythm-pad__clear-btn">
          Clear
        </button>
        <label className="rhythm-pad__bpm">
          BPM
          <input
            type="number"
            min={60}
            max={200}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="rhythm-pad__actions">
        <button type="button" className="rhythm-pad__confirm-btn" onClick={handleConfirm}>
          Confirm this rhythm →
        </button>
      </div>
    </div>
  );
};

export default RhythmPad;
