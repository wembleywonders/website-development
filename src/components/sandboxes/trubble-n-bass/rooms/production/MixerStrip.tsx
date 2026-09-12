// MixerStrip.tsx
// Third tab of the Production Room — per-pad volume only.
//
// SCOPE NOTE: no prior build exists for this file — new territory, same
// position RhythmPad.tsx was in last turn. Deliberately does NOT include
// pan or EQ controls: engine/AudioEngine.ts's playDrum()/playNote() only
// accept a volume argument, no panner or filter nodes exist per-track.
// Building pan/EQ sliders with no audio behind them would be exactly the
// "looks built but isn't" problem this whole audit has been catching.
// A separate facilitation document also confirms "keep it simple: levels,
// pan, one EQ move, resist compression" as the teaching philosophy — so
// levels-only is the right pedagogical starting point too, not just an
// engine limitation.
//
// FOLLOW-UP NEEDED: RhythmPad.tsx currently hardcodes vol=0.7 in its
// playDrum() calls. For these faders to actually affect sound, RhythmPad
// needs a small patch to accept a padVolumes prop and use it instead of
// the hardcoded value. Not done here — this file wasn't asked to touch
// RhythmPad's internals.

import React, { useState } from 'react';
import { DRUM_KITS } from '../../engine/AudioEngine';
import './MixerStrip.css';

const PAD_ORDER: (keyof typeof DRUM_KITS['808']['sounds'])[] = [
  'kick', 'snare', 'hihat', 'openhat', 'clap', 'tom', 'rim', 'perc',
];

export type PadVolumes = Record<string, number>; // 0–1 per pad id

const DEFAULT_VOLUMES: PadVolumes = PAD_ORDER.reduce((acc, pad) => {
  acc[pad] = 0.7;
  return acc;
}, {} as PadVolumes);

export interface MixerStripProps {
  initialVolumes?: PadVolumes;
  onChange: (volumes: PadVolumes) => void;
}

const MixerStrip: React.FC<MixerStripProps> = ({
  initialVolumes = DEFAULT_VOLUMES,
  onChange,
}) => {
  const [volumes, setVolumes] = useState<PadVolumes>(initialVolumes);

  const handleFaderChange = (padId: string, value: number) => {
    setVolumes((prev) => {
      const next = { ...prev, [padId]: value };
      onChange(next);
      return next;
    });
  };

  const resetAll = () => {
    setVolumes(DEFAULT_VOLUMES);
    onChange(DEFAULT_VOLUMES);
  };

  return (
    <div className="mixer-strip-panel">
      <header className="mixer-strip-panel__header">
        <h3>Mixer</h3>
        <p className="mixer-strip-panel__subtitle">
          Balance your pads. Levels only — that&rsquo;s all you need to start.
        </p>
      </header>

      <div className="mixer-strip-panel__strips">
        {PAD_ORDER.map((padId) => (
          <div key={padId} className="mixer-strip">
            <span className="mixer-strip__label">{padId}</span>
            <input
              type="range"
              className="mixer-strip__fader"
              min={0}
              max={1}
              step={0.01}
              value={volumes[padId] ?? 0.7}
              onChange={(e) => handleFaderChange(padId, Number(e.target.value))}
              aria-label={`${padId} volume`}
              orient="vertical"
            />
            <span className="mixer-strip__value">
              {Math.round((volumes[padId] ?? 0.7) * 100)}
            </span>
          </div>
        ))}
      </div>

      <div className="mixer-strip-panel__actions">
        <button type="button" className="mixer-strip-panel__reset-btn" onClick={resetAll}>
          Reset all
        </button>
      </div>
    </div>
  );
};

export default MixerStrip;
