// LyricRhythm.tsx
// An alternative path into a rhythm: instead of tapping it, speak or type
// a line and let its natural stress pattern become the beat.
//
// BUILT FROM EMPTY (27 June 2026). Produces the same shape TapRhythm does
// ({ pattern: boolean[]; bpm: number }) so it can sit alongside Tap in
// ConceptRoom's tab system. NOT wired into ConceptRoom here — ConceptRoom
// currently has its own self-contained "Words" tab (a plain textarea) and
// has never imported this file. Whether LyricRhythm replaces that tab,
// sits as a fifth tab, or stays a standalone tool is a design decision for
// you and Judith, not assumed here.
//
// Syllable/stress detection below is a simple approximation (vowel-group
// counting, alternating stress assumption) — NOT linguistically rigorous.
// Flagged rather than oversold, same caveat as the existing syllable
// counter already in ConceptRoom's Words tab.

import React, { useState, useCallback, useRef } from 'react';
import { audioEngine, DRUM_KITS } from '../../engine/AudioEngine';
import './LyricRhythm.css';

const STEPS = 16;
const DEFAULT_BPM = 100;

interface LyricRhythmProps {
  onPatternReady?: (pattern: boolean[], bpm: number) => void;
  initialLyric?: string;
}

/**
 * Breaks a phrase into syllable-ish chunks using vowel-group counting —
 * the same approximation already used elsewhere in this room. Each vowel
 * group (one or more consecutive vowels) counts as one syllable boundary.
 */
function splitIntoSyllableUnits(phrase: string): string[] {
  const words = phrase.trim().split(/\s+/).filter(Boolean);
  const units: string[] = [];

  for (const word of words) {
    const matches = word.match(/[^aeiouAEIOU]*[aeiouAEIOU]+/g);
    if (matches && matches.length > 0) {
      units.push(...matches);
    } else if (word.length > 0) {
      // No vowels found (e.g. "Mm", "Shh") — treat the whole word as one unit.
      units.push(word);
    }
  }

  return units;
}

/**
 * Maps syllable units onto a 16-step grid, spacing them out evenly across
 * the steps available and marking every syllable as a hit. This is a
 * starting point, not a phonetic stress analysis — the rhythm reflects
 * syllable COUNT and spacing, not which syllables are actually stressed.
 */
function deriveRhythmFromUnits(units: string[]): boolean[] {
  const pattern = new Array(STEPS).fill(false);
  if (units.length === 0) return pattern;

  // Cap at STEPS units — a longer phrase just uses the first 16 syllables.
  const usable = units.slice(0, STEPS);
  const spacing = STEPS / usable.length;

  usable.forEach((_, i) => {
    const step = Math.round(i * spacing);
    if (step < STEPS) {
      pattern[step] = true;
    }
  });

  // Always anchor beat 1 — gives the pattern something to lock onto even
  // for very short or very sparse phrases.
  pattern[0] = true;

  return pattern;
}

const LyricRhythm: React.FC<LyricRhythmProps> = ({
  onPatternReady,
  initialLyric = '',
}) => {
  const [lyric, setLyric] = useState(initialLyric);
  const [pattern, setPattern] = useState<boolean[]>(new Array(STEPS).fill(false));
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);

  const units = splitIntoSyllableUnits(lyric);
  const hasEnoughWords = units.length >= 2;

  const handleDerive = useCallback(() => {
    if (!hasEnoughWords) return;
    const derived = deriveRhythmFromUnits(units);
    setPattern(derived);
  }, [units, hasEnoughWords]);

  const toggleStep = (i: number) => {
    setPattern(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const stopPlayback = useCallback(() => {
    if (playRef.current) clearInterval(playRef.current);
    playRef.current = null;
    setIsPlaying(false);
    setCurrentStep(-1);
    stepRef.current = 0;
  }, []);

  const startPlayback = useCallback(() => {
    stopPlayback();
    setIsPlaying(true);
    stepRef.current = 0;
    const kit = DRUM_KITS['808'];
    const stepMs = (60000 / bpm) / 4;

    playRef.current = setInterval(() => {
      const step = stepRef.current % STEPS;
      setCurrentStep(step);
      if (pattern[step]) {
        audioEngine.playDrum(kit.sounds.kick, undefined, 0.8);
      }
      stepRef.current++;
    }, stepMs);
  }, [bpm, pattern, stopPlayback]);

  const handleConfirm = () => {
    stopPlayback();
    onPatternReady?.(pattern, bpm);
  };

  const hasPattern = pattern.some(Boolean);

  // ─── RECONSTRUCTED SECTION — recovered content cut off here ───

  return (
    <div className="lyric-rhythm">
      <div className="lyric-rhythm__intro">
        <h3 className="lyric-rhythm__title">Say it. We'll find the beat in it.</h3>
        <p className="lyric-rhythm__hint">
          Type a line, a title, a feeling in words.
        </p>
      </div>

      <textarea
        className="lyric-rhythm__input"
        value={lyric}
        onChange={(e) => setLyric(e.target.value)}
        placeholder="e.g. Walking home in the rain again"
        rows={3}
      />

      <button
        type="button"
        className="lyric-rhythm__derive-btn"
        onClick={handleDerive}
        disabled={!hasEnoughWords}
      >
        Find the beat in these words →
      </button>

      <div className="lyric-rhythm__grid">
        {pattern.map((hit, i) => (
          <button
            key={i}
            type="button"
            className={`lyric-rhythm__step${hit ? ' lyric-rhythm__step--hit' : ''}${currentStep === i ? ' lyric-rhythm__step--active' : ''}`}
            onClick={() => toggleStep(i)}
          />
        ))}
      </div>

      <div className="lyric-rhythm__transport">
        <button
          type="button"
          onClick={isPlaying ? stopPlayback : startPlayback}
          disabled={!hasPattern}
          className="lyric-rhythm__play-btn"
        >
          {isPlaying ? '■ Stop' : '▶ Play'}
        </button>

        <label className="lyric-rhythm__bpm">
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

      <div className="lyric-rhythm__actions">
        <button
          type="button"
          className="lyric-rhythm__confirm-btn"
          onClick={handleConfirm}
          disabled={!hasPattern}
        >
          Confirm this rhythm →
        </button>
      </div>
    </div>
  );
};

export default LyricRhythm;
