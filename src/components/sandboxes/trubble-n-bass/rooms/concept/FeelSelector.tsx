// FeelSelector.tsx
// Creator picks the cultural feel of their music
// Selecting a card plays a 2-bar demo loop immediately
// Nine traditions — Afrobeats to Gospel to Grime

import React, { useState, useRef, useEffect } from 'react';
import { STYLE_PROFILES, StyleProfile } from '../../engine/StyleProfiles';
import { audioEngine, DRUM_KITS } from '../../engine/AudioEngine';
import './FeelSelector.css';

interface FeelSelectorProps {
  selected?: string;
  onSelect?: (profile: StyleProfile) => void;
  rhythmPattern?: boolean[];
  rhythmBpm?: number;
}

const FeelSelector: React.FC<FeelSelectorProps> = ({
  selected,
  onSelect,
  rhythmPattern,
  rhythmBpm,
}) => {
  const [previewing, setPreviewing] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<StyleProfile | null>(
    STYLE_PROFILES.find(p => p.id === selected) || null
  );
  const previewRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef<number>(0);

  const stopPreview = () => {
    if (previewRef.current) clearInterval(previewRef.current);
    previewRef.current = null;
    setPreviewing(null);
    stepRef.current = 0;
  };

  const playPreview = (profile: StyleProfile) => {
    stopPreview();
    setPreviewing(profile.id);
    stepRef.current = 0;

    const kit = DRUM_KITS[profile.kit] || DRUM_KITS['808'];
    const bpm = rhythmBpm || profile.defaultBpm;
    const stepMs = (60000 / bpm) / 4;
    const STEPS = 16;

    // Use creator's pattern if available, otherwise use style's characteristic pattern
    const getPattern = () => {
      if (rhythmPattern && rhythmPattern.some(Boolean)) return rhythmPattern;
      // Default patterns per style
      const defaults: Record<string, boolean[]> = {
        afrobeats:    [1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0].map(Boolean),
        lovers_rock:  [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0].map(Boolean),
        gospel:       [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0].map(Boolean),
        grime:        [1,0,1,0,0,0,1,0,1,0,0,1,0,1,0,0].map(Boolean),
        soca:         [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0].map(Boolean),
        roots_reggae: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0].map(Boolean),
        jazz:         [1,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0].map(Boolean),
        highlife:     [1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1].map(Boolean),
        world_chant:  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0].map(Boolean),
      };
      return defaults[profile.id] || [true, false, false, false, true, false, false, false,
                                       true, false, false, false, true, false, false, false];
    };

    const pattern = getPattern();

    // Play 2 bars then stop
    const totalSteps = STEPS * 2;

    previewRef.current = setInterval(() => {
      const step = stepRef.current % STEPS;

      if (pattern[step]) {
        audioEngine.playDrum(kit.sounds.kick, undefined, 0.8);
      }
      if (step % 2 === 0) {
        audioEngine.playDrum(kit.sounds.hihat, undefined, 0.2);
      }
      if (step === 4 || step === 12) {
        const snare = kit.sounds.snare || kit.sounds.clap;
        if (snare) audioEngine.playDrum(snare, undefined, 0.5);
      }
      if (profile.kit === 'caribbean' && (step === 2 || step === 6 || step === 10 || step === 14)) {
        const perc = kit.sounds.perc || kit.sounds.rim;
        if (perc) audioEngine.playDrum(perc, undefined, 0.25);
      }

      stepRef.current++;
      if (stepRef.current >= totalSteps) stopPreview();
    }, stepMs);
  };

  const handleSelect = (profile: StyleProfile) => {
    setSelectedProfile(profile);
    onSelect?.(profile);
    playPreview(profile);
  };

  useEffect(() => {
    return () => stopPreview();
  }, []);

  return (
    <div className="feel-selector">
      <p className="feel-selector__hint">
        Pick the tradition that fits your feeling. Tap a card to hear it.
      </p>
      <div className="feel-selector__grid">
        {STYLE_PROFILES.map(profile => (
          <button
            key={profile.id}
            className={[
              'feel-selector__card',
              selectedProfile?.id === profile.id ? 'feel-selector__card--selected' : '',
              previewing === profile.id ? 'feel-selector__card--previewing' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleSelect(profile)}
          >
            <div className="feel-selector__card-header">
              <span className="feel-selector__card-name">{profile.name}</span>
              {previewing === profile.id && (
                <span className="feel-selector__card-playing">♪</span>
              )}
              {selectedProfile?.id === profile.id && previewing !== profile.id && (
                <span className="feel-selector__card-check">✓</span>
              )}
            </div>
            <div className="feel-selector__card-meta">
              {profile.defaultBpm} BPM · {profile.key} {profile.scale}
            </div>
            <div className="feel-selector__card-heritage">{profile.heritage}</div>
            <div className="feel-selector__card-desc">{profile.description}</div>
          </button>
        ))}
      </div>

      {selectedProfile && (
        <div className="feel-selector__selected-summary">
          <span className="feel-selector__selected-icon">◈</span>
          <span>
            <strong>{selectedProfile.name}</strong> —
            {selectedProfile.defaultBpm} BPM,
            {selectedProfile.key} {selectedProfile.scale} scale,
            {selectedProfile.kit} kit
          </span>
          <button
            className="feel-selector__preview-btn"
            onClick={() => playPreview(selectedProfile)}
          >
            ▶ Hear it again
          </button>
        </div>
      )}
    </div>
  );
};

export default FeelSelector;
