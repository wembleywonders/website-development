// Keyboard80.tsx
// 80-key scale-locked piano keyboard
// Every key plays a note in the chosen scale — no wrong notes
// Input: mouse click, touch, QWERTY keyboard
// Scale lock via ScaleLock.ts — creator plays musically from first touch

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getScaleNotes, keyToScaleNote } from '../../engine/ScaleLock';
import { KEYBOARD_80, NoteInfo } from '../../engine/AudioEngine';
import audioEngine from '../../engine/AudioEngine';
import './Keyboard80.css';

interface Keyboard80Props {
  rootNote?: string;
  scaleName?: string;
  waveform?: OscillatorType;
  noteDuration?: number;
  onNotePlay?: (note: NoteInfo) => void;
  highlightNotes?: string[];
}

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const isBlack = (name: string) => name.includes('#');

// Visible octave range on screen — show octaves 2-6 (50 keys) for screen fit
const VISIBLE_RANGE = KEYBOARD_80.filter(n => {
  const oct = parseInt(n.name.slice(-1));
  return oct >= 2 && oct <= 6;
});

const Keyboard80: React.FC<Keyboard80Props> = ({
  rootNote = 'C',
  scaleName = 'pentatonic',
  waveform = 'triangle',
  noteDuration = 0.4,
  onNotePlay,
  highlightNotes = [],
}) => {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [scaleNotes, setScaleNotes] = useState<NoteInfo[]>([]);
  const [octaveShift, setOctaveShift] = useState(0); // -1, 0, +1
  const pressedKeys = useRef<Set<string>>(new Set());

  // Recalculate scale notes when root/scale changes
  useEffect(() => {
    const notes = getScaleNotes({
      rootNote,
      scaleName,
      octaveRange: [1, 7],
    });
    setScaleNotes(notes);
  }, [rootNote, scaleName]);

  const playNote = useCallback(async (note: NoteInfo) => {
    await audioEngine.resume();
    audioEngine.playNote(note.name, noteDuration, waveform);
    setActiveNotes(prev => new Set([...prev, note.name]));
    onNotePlay?.(note);
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note.name);
        return next;
      });
    }, noteDuration * 1000 + 50);
  }, [noteDuration, waveform, onNotePlay]);

  // QWERTY keyboard input — scale-locked
  useEffect(() => {
    const onDown = async (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.target !== document.body && (e.target as HTMLElement).tagName !== 'BODY') return;
      const key = e.key.toLowerCase();

      // Octave shift with Z and X when combined with Shift
      if (e.shiftKey && key === 'z') { setOctaveShift(s => Math.max(-2, s - 1)); return; }
      if (e.shiftKey && key === 'x') { setOctaveShift(s => Math.min(2, s + 1)); return; }

      if (pressedKeys.current.has(key)) return;
      pressedKeys.current.add(key);

      // Build shifted scale notes
      const shifted = getScaleNotes({
        rootNote,
        scaleName,
        octaveRange: [Math.max(1, 2 + octaveShift), Math.min(7, 6 + octaveShift)],
      });
      const note = keyToScaleNote(key, shifted);
      if (note) playNote(note);
    };

    const onUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [rootNote, scaleName, octaveShift, playNote]);

  const inScale = (noteName: string): boolean => {
    return scaleNotes.some(n => n.name === noteName);
  };

  const isHighlighted = (noteName: string): boolean => {
    return highlightNotes.includes(noteName);
  };

  // Group visible keys — whites and blacks
  const whites = VISIBLE_RANGE.filter(n => !isBlack(n.name));
  const blacks = VISIBLE_RANGE.filter(n => isBlack(n.name));

  return (
    <div className="keyboard80">
      <div className="keyboard80__controls">
        <div className="keyboard80__scale-info">
          <span className="keyboard80__root">{rootNote}</span>
          <span className="keyboard80__scale">{scaleName}</span>
          <span className="keyboard80__hint">Every key you press sounds right</span>
        </div>
        <div className="keyboard80__octave-shift">
          <button
            className="keyboard80__oct-btn"
            onClick={() => setOctaveShift(s => Math.max(-2, s - 1))}
            title="Shift down one octave"
          >↓ Oct</button>
          <span className="keyboard80__oct-val">
            {octaveShift === 0 ? 'Middle' : octaveShift > 0 ? `+${octaveShift}` : octaveShift}
          </span>
          <button
            className="keyboard80__oct-btn"
            onClick={() => setOctaveShift(s => Math.min(2, s + 1))}
            title="Shift up one octave"
          >Oct ↑</button>
        </div>
      </div>

      <div className="keyboard80__wrapper">
        <div className="keyboard80__keys">
          {whites.map((note, i) => {
            const active = activeNotes.has(note.name);
            const scale = inScale(note.name);
            const hi = isHighlighted(note.name);
            return (
              <button
                key={note.name}
                className={[
                  'keyboard80__white',
                  active ? 'keyboard80__white--active' : '',
                  scale ? 'keyboard80__white--scale' : 'keyboard80__white--off-scale',
                  hi ? 'keyboard80__white--highlight' : '',
                ].filter(Boolean).join(' ')}
                onMouseDown={() => playNote(note)}
                onTouchStart={(e) => { e.preventDefault(); playNote(note); }}
                aria-label={note.name}
              >
                {i % 7 === 0 && (
                  <span className="keyboard80__note-label">
                    {note.name.replace(/\d/, '')}
                    <span className="keyboard80__oct-label">{note.name.slice(-1)}</span>
                  </span>
                )}
              </button>
            );
          })}

          {/* Black keys — positioned absolutely */}
          {VISIBLE_RANGE.map((note, idx) => {
            if (!isBlack(note.name)) return null;
            const active = activeNotes.has(note.name);
            const scale = inScale(note.name);
            const hi = isHighlighted(note.name);
            // Calculate position based on white key index before this black key
            const noteBase = note.name.slice(0, -1);
            const octave = note.name.slice(-1);
            const whitesBefore = whites.filter(w => {
              const wOct = parseInt(w.name.slice(-1));
              const nOct = parseInt(octave);
              if (wOct < nOct) return true;
              if (wOct > nOct) return false;
              return NOTE_NAMES.indexOf(w.name.slice(0, -1)) < NOTE_NAMES.indexOf(noteBase);
            });
            const pos = whitesBefore.length;
            return (
              <button
                key={note.name}
                className={[
                  'keyboard80__black',
                  active ? 'keyboard80__black--active' : '',
                  scale ? 'keyboard80__black--scale' : 'keyboard80__black--off-scale',
                  hi ? 'keyboard80__black--highlight' : '',
                ].filter(Boolean).join(' ')}
                style={{ left: `calc(${pos} * var(--key-w) - var(--black-w) / 2)` }}
                onMouseDown={(e) => { e.stopPropagation(); playNote(note); }}
                onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); playNote(note); }}
                aria-label={note.name}
              />
            );
          })}
        </div>
      </div>

      <div className="keyboard80__footer">
        <span className="keyboard80__footer-hint">
          QWERTY keys play scale notes · Z/X shift octave · Click or touch any key
        </span>
      </div>
    </div>
  );
};

export default Keyboard80;
