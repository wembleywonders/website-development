// OnsetDetector.ts
// Rhythm/onset detection from microphone or click input
// Used for tap-to-rhythm in the Concept Room

export interface OnsetEvent {
  time: number;       // performance.now() timestamp
  strength: number;   // 0-1, how strong the onset was
}

export interface RhythmAnalysis {
  bpm: number | null;
  confidence: number;   // 0-1
  pattern: number[];    // inter-onset intervals in ms
}

// Detect onset from energy spike in audio buffer
export function detectOnset(
  prevEnergy: number,
  currentEnergy: number,
  threshold = 1.3
): boolean {
  return currentEnergy > prevEnergy * threshold && currentEnergy > 0.01;
}

// Calculate BPM from a series of tap timestamps
export function analyseTaps(timestamps: number[]): RhythmAnalysis {
  if (timestamps.length < 3) {
    return { bpm: null, confidence: 0, pattern: [] };
  }

  const intervals: number[] = [];
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1]);
  }

  // Filter out outliers (too fast or too slow)
  const filtered = intervals.filter(i => i > 200 && i < 3000);
  if (filtered.length < 2) return { bpm: null, confidence: 0, pattern: intervals };

  const avg = filtered.reduce((a, b) => a + b, 0) / filtered.length;
  const bpm = Math.round(60000 / avg);

  // Confidence based on consistency of intervals
  const variance = filtered.reduce((sum, i) => sum + Math.pow(i - avg, 2), 0) / filtered.length;
  const stdDev = Math.sqrt(variance);
  const confidence = Math.max(0, Math.min(1, 1 - stdDev / avg));

  return { bpm, confidence, pattern: intervals };
}

// Convert tap timestamps to a 16-step pattern
export function tapsToPattern(timestamps: number[], bpm: number): boolean[] {
  if (timestamps.length === 0 || bpm <= 0) return Array(16).fill(false);

  const stepDuration = 60000 / bpm / 4; // duration of one 16th note in ms
  const start = timestamps[0];
  const pattern = Array(16).fill(false);

  for (const ts of timestamps) {
    const offset = ts - start;
    const step = Math.round(offset / stepDuration) % 16;
    if (step >= 0 && step < 16) pattern[step] = true;
  }

  return pattern;
}

export class TapRecorder {
  private taps: number[] = [];
  private lastTap = 0;
  private resetTimeout: ReturnType<typeof setTimeout> | null = null;

  tap(): OnsetEvent {
    const now = performance.now();

    // Reset if more than 3 seconds since last tap
    if (now - this.lastTap > 3000) this.taps = [];

    this.taps.push(now);
    this.lastTap = now;

    // Auto-clear after 4 seconds of silence
    if (this.resetTimeout) clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(() => { this.taps = []; }, 4000);

    return { time: now, strength: 1 };
  }

  getAnalysis(): RhythmAnalysis {
    return analyseTaps(this.taps);
  }

  getTaps(): number[] {
    return [...this.taps];
  }

  clear(): void {
    this.taps = [];
    if (this.resetTimeout) clearTimeout(this.resetTimeout);
  }
}
