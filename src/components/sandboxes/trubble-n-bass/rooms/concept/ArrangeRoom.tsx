// ArrangeRoom.tsx
// The bridge between Concept and Production
// Creator hears rhythm + melody together before moving on
// 8 melody steps on top of the 16-step rhythm pattern
// Scale-locked — every note sounds right in the chosen feel

import React, { useState, useRef, useEffect } from 'react';
import { audioEngine, DRUM_KITS, SCALES, ALL_NOTES } from '../../engine/AudioEngine';
import { StyleProfile } from '../../engine/StyleProfiles';
import './ArrangeRoom.css';
import { useLearnerHelp } from '../../../../../hooks/useLearnerHelp';
import HelpPanel from '../../../../learnerHelp/HelpPanel';

interface ArrangeRoomProps {
  rhythmPattern: boolean[];
  rhythmBpm: number;
  styleProfile: StyleProfile;
  onConfirm?: (melodyPattern: (string | null)[]) => void;
}

const MELODY_STEPS = 8;
const DRUM_STEPS = 16;

// Scale degree labels — plain language
const DEGREE_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8'];

const ArrangeRoom: React.FC<ArrangeRoomProps> = ({
  rhythmPattern,
  rhythmBpm,
  styleProfile,
  onConfirm,
}) => {
  // Melody: 8 steps, each null (silent) or a note name
  const [melodySteps, setMelodySteps] = useState<(string | null)[]>(
    Array(MELODY_STEPS).fill(null)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const { onLearnerNeedsHelp, activeHelp, dismissHelp, openTutorialAt } =
    useLearnerHelp('trubble-n-bass', 'arrange-room');
  const [currentDrumStep, setCurrentDrumStep] = useState(-1);
  const [currentMelodyStep, setCurrentMelodyStep] = useState(-1);
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const drumStepRef = useRef(0);

  // Build scale notes from style profile
  const getScaleNotes = (): string[] => {
    const rootNote = styleProfile.key;
    const scaleName = styleProfile.scale;
    const intervals = SCALES[scaleName] || SCALES['pentatonic'];
    const rootIndex = ALL_NOTES.findIndex(n => n.name === `${rootNote}4`);
    if (rootIndex === -1) return [];
    return intervals.map(interval => {
      const note = ALL_NOTES[rootIndex + interval];
      return note ? note.name : null;
    }).filter(Boolean) as string[];
  };

  const scaleNotes = getScaleNotes();

  const toggleMelodyStep = (stepIndex: number, noteIndex: number) => {
    setMelodySteps(prev => {
      const next = [...prev];
      const note = scaleNotes[noteIndex];
      // If this step already has this note, clear it; otherwise set it
      next[stepIndex] = next[stepIndex] === note ? null : note;
      return next;
    });
  };

  const handlePlaybackStart = () => {
    if (hasMelody) {
      onLearnerNeedsHelp('first-playback-after-melody', {}, { allowRepeat: false });
    }
    startPlayback();
  };

  const startPlayback = () => {
    stopPlayback();
    setIsPlaying(true);
    drumStepRef.current = 0;
    const kit = DRUM_KITS[styleProfile.kit] || DRUM_KITS['808'];
    const stepMs = (60000 / rhythmBpm) / 4; // 16th note

    playRef.current = setInterval(() => {
      const drumStep = drumStepRef.current % DRUM_STEPS;
      // Every 2 drum steps = 1 melody step (melody runs at 8th notes)
      const melodyStep = Math.floor(drumStepRef.current / 2) % MELODY_STEPS;

      setCurrentDrumStep(drumStep);
      setCurrentMelodyStep(melodyStep);

      // Drums
      if (rhythmPattern[drumStep]) {
        audioEngine.playDrum(kit.sounds.kick, undefined, 0.8);
      }
      if (drumStep % 2 === 0) {
        audioEngine.playDrum(kit.sounds.hihat, undefined, 0.2);
      }
      if (drumStep === 4 || drumStep === 12) {
        const snare = kit.sounds.snare || kit.sounds.clap;
        if (snare) audioEngine.playDrum(snare, undefined, 0.45);
      }

      // Melody — plays on even drum steps (8th note grid)
      if (drumStep % 2 === 0 && melodySteps[melodyStep]) {
        audioEngine.playNote(melodySteps[melodyStep]!, 0.4, 'triangle', undefined, 0.4);
      }

      drumStepRef.current++;
    }, stepMs);
  };

  const stopPlayback = () => {
    if (playRef.current) clearInterval(playRef.current);
    playRef.current = null;
    setIsPlaying(false);
    setCurrentDrumStep(-1);
    setCurrentMelodyStep(-1);
    drumStepRef.current = 0;
  };

  useEffect(() => {
    // Trigger help on first open
    if (!hasOpenedBefore) {
      setHasOpenedBefore(true);
      setTimeout(() => {
        onLearnerNeedsHelp('arrange-tab-first-open');
      }, 800); // Small delay so the grid renders first
    }
    return () => stopPlayback();
  }, []);

  // Replay when melody changes during playback
  useEffect(() => {
    if (isPlaying) {
      stopPlayback();
      setTimeout(startPlayback, 50);
    }
  }, [melodySteps]);

  const hasMelody = melodySteps.some(Boolean);

  return (
    <div className="arrange-room">
      <div className="arrange-room__intro">
        <h3 className="arrange-room__title">Build your idea</h3>
        <p className="arrange-room__hint">
          Your rhythm is locked in. Now add a melody on top.
          Each column is a beat. Each row is a note in your scale.
          Tap to place a note. Play to hear it.
        </p>
      </div>

      {/* Style context strip */}
      <div className="arrange-room__context">
        <span className="arrange-room__context-tag">♩ {rhythmBpm} BPM</span>
        <span className="arrange-room__context-tag">◈ {styleProfile.name}</span>
        <span className="arrange-room__context-tag">♪ {styleProfile.key} {styleProfile.scale}</span>
      </div>

      {/* Melody grid — 8 steps × scale degrees */}
      <div className="arrange-room__grid-wrap">
        {/* Note labels */}
        <div className="arrange-room__note-labels">
          {scaleNotes.slice(0, 7).reverse().map((note, i) => (
            <div key={note} className="arrange-room__note-label">
              {DEGREE_LABELS[scaleNotes.length - 1 - i]}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="arrange-room__grid">
          {scaleNotes.slice(0, 7).reverse().map((note, rowIdx) => (
            <div key={note} className="arrange-room__row">
              {Array(MELODY_STEPS).fill(null).map((_, colIdx) => {
                const isActive = melodySteps[colIdx] === note;
                const isCurrent = currentMelodyStep === colIdx && isPlaying;
                return (
                  <button
                    key={colIdx}
                    className={[
                      'arrange-room__cell',
                      isActive ? 'arrange-room__cell--on' : '',
                      isCurrent ? 'arrange-room__cell--current' : '',
                      colIdx % 2 === 0 ? 'arrange-room__cell--beat' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => toggleMelodyStep(colIdx, scaleNotes.length - 1 - rowIdx)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Rhythm reference strip */}
      <div className="arrange-room__rhythm-strip">
        <span className="arrange-room__rhythm-label">Your rhythm</span>
        <div className="arrange-room__rhythm-steps">
          {rhythmPattern.map((on, i) => (
            <div
              key={i}
              className={[
                'arrange-room__rhythm-step',
                on ? 'arrange-room__rhythm-step--on' : '',
                currentDrumStep === i && isPlaying ? 'arrange-room__rhythm-step--current' : '',
              ].filter(Boolean).join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="arrange-room__controls">
        {!isPlaying ? (
          <button className="arrange-room__btn arrange-room__btn--play" onClick={handlePlaybackStart}>
            ▶ Hear rhythm {hasMelody ? '+ melody' : 'only'}
          </button>
        ) : (
          <button className="arrange-room__btn arrange-room__btn--stop" onClick={stopPlayback}>
            ■ Stop
          </button>
        )}

        <button
          className="arrange-room__btn arrange-room__btn--clear"
          onClick={() => setMelodySteps(Array(MELODY_STEPS).fill(null))}
        >
          Clear melody
        </button>

        <button
          className="arrange-room__btn arrange-room__btn--confirm"
          onClick={() => { stopPlayback(); onConfirm?.(melodySteps); }}
        >
          ✓ Take this to Production →
        </button>
      </div>

      {!hasMelody && (
        <p className="arrange-room__skip-hint">
          No melody yet? That is fine —{' '}
          <button
            className="arrange-room__skip-link"
            onClick={() => onConfirm?.(melodySteps)}
          >
            go straight to Production
          </button>
        </p>
      )}
      {/* Contextual help panel */}
      {activeHelp && (
        <HelpPanel
          help={activeHelp}
          onDismiss={dismissHelp}
          onOpenTutorial={openTutorialAt}
        />
      )}
    </div>
  );
};

export default ArrangeRoom;
