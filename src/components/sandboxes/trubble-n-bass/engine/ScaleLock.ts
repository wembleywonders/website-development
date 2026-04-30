// ScaleLock.ts
// Scale-locked note input — no wrong notes for the Forgotten 60%
// Maps keyboard positions to scale degrees, not chromatic positions

import { NOTE_NAMES, SCALES, NoteInfo, ALL_NOTES } from './AudioEngine';

export interface ScaleLockConfig {
  rootNote: string;
  scaleName: string;
  octaveRange: [number, number];
}

export function getScaleNotes(config: ScaleLockConfig): NoteInfo[] {
  const { rootNote, scaleName, octaveRange } = config;
  const intervals = SCALES[scaleName] ?? SCALES.pentatonic;
  const rootIdx = NOTE_NAMES.indexOf(rootNote);
  const notes: NoteInfo[] = [];
  for (let oct = octaveRange[0]; oct <= octaveRange[1]; oct++) {
    for (const interval of intervals) {
      const noteIdx = (rootIdx + interval) % 12;
      const octAdjust = Math.floor((rootIdx + interval) / 12);
      const actualOct = oct + octAdjust;
      if (actualOct < 0 || actualOct > 8) continue;
      const name = NOTE_NAMES[noteIdx] + actualOct;
      const found = ALL_NOTES.find(n => n.name === name);
      if (found && !notes.find(n => n.name === found.name)) notes.push(found);
    }
  }
  return notes.sort((a, b) => a.freq - b.freq);
}

// QWERTY layout mapped to scale degrees — no wrong notes
// Z X C V B N M = degrees 0-6 (lower octave)
// A S D F G H J = degrees 7-13 (upper octave)
// Q W E R T Y   = degrees 14-19 (highest range)
export const SCALE_KEYBOARD_MAP: Record<string, number> = {
  'z': 0, 'x': 1, 'c': 2, 'v': 3, 'b': 4, 'n': 5, 'm': 6,
  'a': 7, 's': 8, 'd': 9, 'f': 10, 'g': 11, 'h': 12, 'j': 13,
  'q': 14, 'w': 15, 'e': 16, 'r': 17, 't': 18, 'y': 19,
};

export function keyToScaleNote(key: string, scaleNotes: NoteInfo[]): NoteInfo | null {
  const idx = SCALE_KEYBOARD_MAP[key.toLowerCase()];
  if (idx === undefined) return null;
  return scaleNotes[idx] ?? scaleNotes[scaleNotes.length - 1];
}
