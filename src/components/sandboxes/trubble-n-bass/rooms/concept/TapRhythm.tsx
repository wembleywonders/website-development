// TapRhythm.tsx
// Creator taps a rhythm — no instrument required
// Pattern plays back using the selected style's kit and BPM
// No wrong answers. Just what you have in your head.

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { audioEngine, DRUM_KITS } from '../../engine/AudioEngine';
import { StyleProfile } from '../../engine/StyleProfiles';
import './TapRhythm.css';

interface TapRhythmProps {
  onPatternReady?: (pattern: boolean[], bpm: number) => void;
  onBpmChange?: (bpm: number) => void;
  styleProfile?: StyleProfile | null;
}

const MIN_TAPS = 3;
const MAX_TAPS = 32;
const STEPS = 16;

const TapRhythm: React.FC<TapRhythmProps> = ({
  onPatternReady,
  onBpmChange,
  styleProfile = null,
}) => {
  const [phase, setPhase] = useState<'tap' | 'review' | 'playing'>('tap');
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(styleProfile?.defaultBpm || 100);
  const [pattern, setPattern] = useState<boolean[]>(Array(STEPS).fill(false));
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef<number>(0);
  const lastTapRef = useRef<number>(0);

  // Update BPM when style changes
  useEffect(() => {
    if (styleProfile?.defaultBpm) {
      setBpm(styleProfile.defaultBpm);
      onBpmChange?.(styleProfile.defaultBpm);
    }
  }, [styleProfile?.id]);

  const getKit = () => {
    if (styleProfile?.kit && DRUM_KITS[styleProfile.kit]) {
      return DRUM_KITS[styleProfile.kit];
    }
    return DRUM_KITS['808'];
  };

  const handleTap = useCallback(() => {
    const now = Date.now();
    const newTaps = [...taps, now].slice(-MAX_TAPS);
    setTaps(newTaps);

    // Calculate BPM from intervals
    if (newTaps.length >= 2) {
      const intervals = newTaps.slice(1).map((t, i) => t - newTaps[i]);
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      const clampedBpm = styleProfile
        ? Math.max(styleProfile.bpm[0], Math.min(styleProfile.bpm[1], calculatedBpm))
        : Math.max(60, Math.min(200, calculatedBpm));
      setBpm(clampedBpm);
      onBpmChange?.(clampedBpm);
    }

    // Map taps to 16-step grid
    if (newTaps.length >= MIN_TAPS) {
      const intervals = newTaps.slice(1).map((t, i) => t - newTaps[i]);
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const totalDuration = avgInterval * STEPS;
      const newPattern = Array(STEPS).fill(false);
      newTaps.forEach(tap => {
        const offset = tap - newTaps[0];
        const step = Math.round((offset / totalDuration) * STEPS) % STEPS;
        if (step >= 0 && step < STEPS) newPattern[step] = true;
      });
      newPattern[0] = true; // always start on beat 1
      setPattern(newPattern);
      if (phase === 'tap' && newTaps.length >= MIN_TAPS) setPhase('review');
    }

    lastTapRef.current = now;
  }, [taps, phase, styleProfile, onBpmChange]);

  const toggleStep = (i: number) => {
    setPattern(p => {
      const next = [...p];
      next[i] = !next[i];
      return next;
    });
  };

  const startPlayback = () => {
    stopPlayback();
    setPhase('playing');
    stepRef.current = 0;
    const kit = getKit();
    const stepMs = (60000 / bpm) / 4; // 16th note

    playIntervalRef.current = setInterval(() => {
      const step = stepRef.current % STEPS;
      setCurrentStep(step);
      if (pattern[step]) {
        audioEngine.playDrum(kit.sounds.kick, undefined, 0.8);
      }
      // Hihat on every 8th note
      if (step % 2 === 0) {
        audioEngine.playDrum(kit.sounds.hihat, undefined, 0.25);
      }
      // Snare / clap on beats 2 and 4 (steps 4 and 12)
      if (step === 4 || step === 12) {
        const snare = kit.sounds.snare || kit.sounds.clap;
        if (snare) audioEngine.playDrum(snare, undefined, 0.5);
      }
      // Caribbean rim / perc flavour on off-beats
      if (styleProfile?.kit === 'caribbean' && (step === 2 || step === 10)) {
        const rim = kit.sounds.rim || kit.sounds.perc;
        if (rim) audioEngine.playDrum(rim, undefined, 0.3);
      }
      stepRef.current++;
    }, stepMs);
  };

  const stopPlayback = () => {
    if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    playIntervalRef.current = null;
    setCurrentStep(-1);
    setPhase(pattern.some(Boolean) ? 'review' : 'tap');
  };

  const confirmPattern = () => {
    stopPlayback();
    onPatternReady?.(pattern, bpm);
  };

  const reset = () => {
    stopPlayback();
    setTaps([]);
    setPattern(Array(STEPS).fill(false));
    setCurrentStep(-1);
    setPhase('tap');
  };

  useEffect(() => {
    return () => { if (playIntervalRef.current) clearInterval(playIntervalRef.current); };
  }, []);

  const kitName = getKit().name;
  const styleName = styleProfile ? ` · ${styleProfile.name}` : '';

  return (
    <div className="tap-rhythm">
      <div className="tap-rhythm__context">
        {bpm} BPM{styleName} · {kitName}
      </div>

      <div className="tap-rhythm__phase-hint">
        {phase === 'tap' && 'Tap the button to the beat in your head. Keep going until it feels right.'}
        {phase === 'review' && 'That is your rhythm. Adjust the steps, play it back, or confirm it.'}
        {phase === 'playing' && 'Listening to your rhythm...'}
      </div>

      {/* 16-step grid */}
      {phase !== 'tap' && (
        <div className="tap-rhythm__grid">
          {pattern.map((on, i) => (
            <button
              key={i}
              className={[
                'tap-rhythm__step',
                on ? 'tap-rhythm__step--on' : '',
                currentStep === i ? 'tap-rhythm__step--current' : '',
                i % 4 === 0 ? 'tap-rhythm__step--beat' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => toggleStep(i)}
              aria-label={`Step ${i + 1} ${on ? 'on' : 'off'}`}
            />
          ))}
        </div>
      )}

      {/* Tap zone */}
      {phase === 'tap' && (
        <button className="tap-rhythm__tap-btn" onClick={handleTap}>
          <span className="tap-rhythm__tap-icon">♩</span>
          <span className="tap-rhythm__tap-label">
            {taps.length === 0 ? 'Tap here' : `${taps.length} tap${taps.length > 1 ? 's' : ''}...`}
          </span>
        </button>
      )}

      {/* BPM slider */}
      {phase !== 'tap' && (
        <div className="tap-rhythm__bpm-row">
          <label className="tap-rhythm__bpm-label">Tempo</label>
          <input
            type="range"
            min={styleProfile?.bpm[0] || 60}
            max={styleProfile?.bpm[1] || 200}
            value={bpm}
            onChange={e => {
              const v = Number(e.target.value);
              setBpm(v);
              onBpmChange?.(v);
              if (phase === 'playing') {
                stopPlayback();
                setTimeout(startPlayback, 50);
              }
            }}
            className="tap-rhythm__bpm-slider"
          />
          <span className="tap-rhythm__bpm-value">{bpm} BPM</span>
        </div>
      )}

      {/* Controls */}
      <div className="tap-rhythm__controls">
        {phase === 'tap' && taps.length > 0 && (
          <button className="tap-rhythm__btn tap-rhythm__btn--reset" onClick={reset}>
            Start again
          </button>
        )}
        {phase === 'review' && (
          <>
            <button className="tap-rhythm__btn tap-rhythm__btn--play" onClick={startPlayback}>
              ▶ Play it back
            </button>
            <button className="tap-rhythm__btn tap-rhythm__btn--confirm" onClick={confirmPattern}>
              ✓ This is my rhythm
            </button>
            <button className="tap-rhythm__btn tap-rhythm__btn--reset" onClick={reset}>
              Start again
            </button>
          </>
        )}
        {phase === 'playing' && (
          <button className="tap-rhythm__btn tap-rhythm__btn--stop" onClick={stopPlayback}>
            ■ Stop
          </button>
        )}
        {phase === 'playing' && (
          <button className="tap-rhythm__btn tap-rhythm__btn--confirm" onClick={confirmPattern}>
            ✓ This is my rhythm
          </button>
        )}
      </div>
    </div>
  );
};

export default TapRhythm;
