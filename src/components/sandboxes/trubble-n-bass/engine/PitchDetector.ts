// PitchDetector.ts
// Basic pitch detection from microphone input using autocorrelation
// Works on built-in laptop mics — designed for humming/singing input

export interface PitchResult {
  frequency: number | null;
  clarity: number;    // 0-1, how confident we are
  noteName: string | null;
}

const NOTE_STRINGS = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

export function freqToNoteName(freq: number): string {
  const noteNum = 12 * (Math.log(freq / 440) / Math.log(2));
  const noteInt = Math.round(noteNum) + 69;
  const octave = Math.floor(noteInt / 12) - 1;
  const note = NOTE_STRINGS[noteInt % 12];
  return note + octave;
}

// Autocorrelation pitch detection — reliable on voice/hum
export function detectPitch(buffer: Float32Array, sampleRate: number): PitchResult {
  const SIZE = buffer.length;
  const MAX_SAMPLES = Math.floor(SIZE / 2);
  let bestOffset = -1;
  let bestCorrelation = 0;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);

  if (rms < 0.01) return { frequency: null, clarity: 0, noteName: null };

  let lastCorrelation = 1;
  for (let offset = 0; offset < MAX_SAMPLES; offset++) {
    let correlation = 0;
    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation = 1 - correlation / MAX_SAMPLES;
    if (correlation > 0.9 && correlation > lastCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
    lastCorrelation = correlation;
  }

  if (bestCorrelation > 0.01 && bestOffset > 0) {
    const freq = sampleRate / bestOffset;
    // Only return human-voice range: 80Hz - 1100Hz
    if (freq >= 80 && freq <= 1100) {
      return {
        frequency: freq,
        clarity: bestCorrelation,
        noteName: freqToNoteName(freq),
      };
    }
  }
  return { frequency: null, clarity: 0, noteName: null };
}

export class PitchDetectorNode {
  private ctx: AudioContext;
  private analyser: AnalyserNode;
  private buffer: Float32Array;
  private rafId: number | null = null;
  onPitch?: (result: PitchResult) => void;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.buffer = new Float32Array(this.analyser.fftSize);
  }

  connect(source: AudioNode): void {
    source.connect(this.analyser);
  }

  start(): void {
    const tick = () => {
      this.analyser.getFloatTimeDomainData(this.buffer);
      const result = detectPitch(this.buffer, this.ctx.sampleRate);
      if (this.onPitch) this.onPitch(result);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  getAnalyserNode(): AnalyserNode {
    return this.analyser;
  }
}
