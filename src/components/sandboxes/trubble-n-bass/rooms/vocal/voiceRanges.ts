// voiceRanges.ts
// Vocal range definitions for the Vocal Room
// SATB plus extended voice types for gospel, world chant, football chant

export interface VoicePart {
  id: string;
  label: string;
  rangeLabel: string;
  lowNote: string;
  highNote: string;
  waveform: OscillatorType;
  colour: string;
  description: string;
  culturalRole: string;
}

export const VOICE_PARTS: VoicePart[] = [
  {
    id: 'soprano', label: 'Soprano', rangeLabel: 'C4 to A5',
    lowNote: 'C4', highNote: 'A5', waveform: 'sine', colour: '#d4a853',
    description: 'Highest female voice. Carries the melody.',
    culturalRole: 'Lead melody in gospel. The voice that soars.',
  },
  {
    id: 'alto', label: 'Alto', rangeLabel: 'F3 to D5',
    lowNote: 'F3', highNote: 'D5', waveform: 'sine', colour: '#60a5fa',
    description: 'Lower female voice. Carries the harmony.',
    culturalRole: 'Harmony in gospel. The voice that holds.',
  },
  {
    id: 'tenor', label: 'Tenor', rangeLabel: 'C3 to A4',
    lowNote: 'C3', highNote: 'A4', waveform: 'triangle', colour: '#a78bfa',
    description: 'Higher male voice. Counter-melody and response.',
    culturalRole: 'Call and response. The voice that answers.',
  },
  {
    id: 'bass-voice', label: 'Bass', rangeLabel: 'E2 to E4',
    lowNote: 'E2', highNote: 'E4', waveform: 'sawtooth', colour: '#34d399',
    description: 'Lowest male voice. Foundation and power.',
    culturalRole: 'Foundation in gospel. The voice that grounds.',
  },
  {
    id: 'unison', label: 'Unison / Chant', rangeLabel: 'A3 to A4',
    lowNote: 'A3', highNote: 'A4', waveform: 'sine', colour: '#f0e6d0',
    description: 'Everyone on the same note. Maximum crowd power.',
    culturalRole: 'Football chant. Protest song. Sweet Caroline. The crowd as one voice.',
  },
  {
    id: 'call', label: 'Call (Leader)', rangeLabel: 'C4 to G5',
    lowNote: 'C4', highNote: 'G5', waveform: 'sine', colour: '#d4a853',
    description: 'The voice that leads.',
    culturalRole: 'Call in call-and-response. The deacon, the lead singer, the choir director.',
  },
  {
    id: 'response', label: 'Response (Congregation)', rangeLabel: 'A3 to E5',
    lowNote: 'A3', highNote: 'E5', waveform: 'sine', colour: '#94a3b8',
    description: 'The voice that answers.',
    culturalRole: 'Response in call-and-response. The congregation, the crowd, the chorus.',
  },
];

export const SATB = ['soprano', 'alto', 'tenor', 'bass-voice'];
export const GOSPEL_CHOIR = ['soprano', 'alto', 'tenor', 'bass-voice', 'call', 'response'];
export const CHANT_CONFIG = ['unison', 'call', 'response'];

export function getVoicePart(id: string): VoicePart | undefined {
  return VOICE_PARTS.find(v => v.id === id);
}
