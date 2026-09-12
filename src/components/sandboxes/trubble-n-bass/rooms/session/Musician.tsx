import React, { useMemo } from 'react';
import { MusicianPersona, getMusician } from './musicianPersonas';
import { InstrumentRange, INSTRUMENTS } from './instrumentRanges';

/**
 * Musician.tsx — one musician within a Trubble n Bass session.
 *
 * Two independent constraints, from two independent data sources:
 *  - persona.listens: which input VOCABULARIES this musician understands
 *    (musicianPersonas.ts) — a musical-idiom constraint.
 *  - instrument range/waveform (instrumentRanges.ts) — a pitch constraint,
 *    looked up by persona.instrument as an id. Rhythm-section musicians
 *    (e.g. Delroy, 'percussion') have no id match here by design — that's
 *    correct, not missing data, since unpitched percussion has no note range.
 */

export type CreatorInputKind =
  | 'tap' | 'click-timing' | 'feel-descriptor' | 'style-selector'
  | 'played-notes' | 'chord-name' | 'mood-word' | 'hummed-melody'
  | 'lyric-rhythm' | 'rhythm-pattern' | 'root-note' | 'chord-progression';

export interface CreatorInput {
  kind: CreatorInputKind;
  value: string;
}

export interface MusicianProps {
  personaId: string;
  currentInput: CreatorInput | null;
  isActive: boolean;
  onFocus?: (personaId: string) => void;
}

/** Minimal note-name → MIDI number, supports sharps/flats, e.g. 'F#3', 'Bb3', 'A0'. */
const NOTE_INDEX: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};

function noteToMidi(note: string): number | null {
  const match = note.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return null;
  const [, name, octaveStr] = match;
  if (!(name in NOTE_INDEX)) return null;
  const octave = parseInt(octaveStr, 10);
  return NOTE_INDEX[name] + (octave + 1) * 12;
}

function resolveInstrumentRange(instrumentField: string): InstrumentRange | null {
  return INSTRUMENTS.find((i) => i.id === instrumentField) ?? null;
}

const interpretationFor = (
  persona: MusicianPersona,
  input: CreatorInput,
  range: InstrumentRange | null
): string => {
  const understands = persona.listens.includes(input.kind);
  if (!understands) {
    return `That's not really my language on ${persona.instrument} \u2014 try me with ${persona.listens[0].replace(/-/g, ' ')}.`;
  }

  // Pitch-range check only applies to pitched inputs on pitched instruments.
  if (range && (input.kind === 'played-notes' || input.kind === 'hummed-melody' || input.kind === 'root-note')) {
    const midi = noteToMidi(input.value);
    const lowMidi = noteToMidi(range.lowNote);
    const highMidi = noteToMidi(range.highNote);
    if (midi !== null && lowMidi !== null && highMidi !== null && (midi < lowMidi || midi > highMidi)) {
      return `That's outside my range (${range.lowNote}\u2013${range.highNote} on ${range.name}) \u2014 I'll take it up or down an octave.`;
    }
  }

  switch (input.kind) {
    case 'tap':
    case 'click-timing':
      return `Locking to that timing: ${input.value}`;
    case 'feel-descriptor':
    case 'style-selector':
      return `Playing it ${input.value}.`;
    case 'played-notes':
    case 'hummed-melody':
      return `I hear it \u2014 following that line on ${persona.instrument}.`;
    case 'chord-name':
    case 'chord-progression':
      return `Voicing: ${input.value}`;
    case 'mood-word':
      return `${input.value}. I know exactly what that calls for.`;
    case 'lyric-rhythm':
      return `Shaping the line around: ${input.value}`;
    case 'root-note':
      return `Anchoring on ${input.value}.`;
    default:
      return persona.speaks;
  }
};

const Musician: React.FC<MusicianProps> = ({ personaId, currentInput, isActive, onFocus }) => {
  const persona: MusicianPersona | undefined = useMemo(() => getMusician(personaId), [personaId]);
  const range = useMemo(() => (persona ? resolveInstrumentRange(persona.instrument) : null), [persona]);

  if (!persona) {
    return (
      <div className="musician musician--error">
        Unknown musician: {personaId}
      </div>
    );
  }

  const line = currentInput ? interpretationFor(persona, currentInput, range) : persona.speaks;

  return (
    <button
      type="button"
      className={`musician${isActive ? ' musician--active' : ''}`}
      style={{ '--musician-colour': persona.colour } as React.CSSProperties}
      onClick={() => onFocus?.(personaId)}
      aria-pressed={isActive}
    >
      <div className="musician__avatar" aria-hidden="true">
        {persona.name.slice(0, 2)}
      </div>
      <div className="musician__info">
        <span className="musician__name">{persona.name}</span>
        <span className="musician__instrument">{persona.instrument}</span>
        <span className="musician__role">{persona.role}</span>
        {range && (
          <span className="musician__range" title={range.culturalContext}>
            {range.lowNote}\u2013{range.highNote}
          </span>
        )}
      </div>
      <p className="musician__line">{line}</p>
    </button>
  );
};

export default Musician;
