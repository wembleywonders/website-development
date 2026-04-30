// AudioEngine.ts
// Extracted from TrubbleNBassPro.jsx — shared audio engine for all Trubble n Bass rooms
// Handles: drum synthesis, note playback, pitch detection, WAV export, offline rendering

export const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

export interface NoteInfo { name: string; freq: number; }

export const ALL_NOTES: NoteInfo[] = [1,2,3,4,5,6,7].flatMap(o =>
  NOTE_NAMES.map(n => ({
    name: `${n}${o}`,
    freq: 440 * Math.pow(2, (NOTE_NAMES.indexOf(n) + (o - 4) * 12 - 9) / 12)
  }))
);

// 80-key range: A0 to C8
export const KEYBOARD_80: NoteInfo[] = ALL_NOTES.filter(n => {
  const oct = parseInt(n.name.slice(-1));
  const note = n.name.slice(0, -1);
  if (oct === 0) return note === 'A' || note === 'A#' || note === 'B';
  if (oct === 8) return note === 'C';
  return oct >= 1 && oct <= 7;
});

export const SCALES: Record<string, number[]> = {
  major:      [0,2,4,5,7,9,11],
  minor:      [0,2,3,5,7,8,10],
  pentatonic: [0,2,4,7,9],
  blues:      [0,3,5,6,7,10],
  dorian:     [0,2,3,5,7,9,10],
  mixolydian: [0,2,4,5,7,9,10],
  chromatic:  [0,1,2,3,4,5,6,7,8,9,10,11],
};

export interface DrumSound { t: string; f: number; d: number; noise?: boolean; }

export const DRUM_KITS: Record<string, { name: string; sounds: Record<string, DrumSound> }> = {
  '808':      { name:'808 Kit',    sounds:{ kick:{t:'k8',f:45,d:0.8},  snare:{t:'s8',f:180,d:0.3},  hihat:{t:'hh',f:8000,d:0.05}, openhat:{t:'oh',f:7000,d:0.25}, clap:{t:'cl',f:1200,d:0.15}, tom:{t:'tm',f:100,d:0.4},  rim:{t:'rm',f:800,d:0.05},  perc:{t:'pc',f:2000,d:0.08} }},
  acoustic:   { name:'Acoustic',   sounds:{ kick:{t:'ka',f:65,d:0.5},  snare:{t:'sa',f:220,d:0.2},  hihat:{t:'hh',f:9000,d:0.04}, openhat:{t:'oh',f:8000,d:0.3},  clap:{t:'cl',f:1000,d:0.12}, tom:{t:'tm',f:120,d:0.35}, rim:{t:'rm',f:900,d:0.04},  perc:{t:'pc',f:1500,d:0.06} }},
  caribbean:  { name:'Caribbean',  sounds:{ kick:{t:'k8',f:55,d:0.6},  snare:{t:'sa',f:200,d:0.25}, hihat:{t:'hh',f:10000,d:0.03},openhat:{t:'oh',f:9000,d:0.2},  clap:{t:'cl',f:1100,d:0.1},  tom:{t:'cg',f:180,d:0.3},  rim:{t:'cb',f:680,d:0.08},  perc:{t:'sh',f:6000,d:0.04} }},
  grime:      { name:'Grime/Drill', sounds:{ kick:{t:'k8',f:38,d:1.0},  snare:{t:'s8',f:160,d:0.35}, hihat:{t:'hh',f:11000,d:0.03},openhat:{t:'oh',f:10000,d:0.15},clap:{t:'cl',f:1400,d:0.18}, tom:{t:'tm',f:80,d:0.5},   rim:{t:'rm',f:1000,d:0.03}, perc:{t:'pc',f:3000,d:0.05} }},
};

class AudioEngine {
  ctx: AudioContext | null = null;
  masterGain: GainNode | null = null;
  compressor: DynamicsCompressorNode | null = null;
  reverb: ConvolverNode | null = null;
  initialised = false;

  async init(): Promise<void> {
    if (this.initialised) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -20;
    this.compressor.ratio.value = 4;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.8;
    const rl = this.ctx.sampleRate * 1.5;
    const rb = this.ctx.createBuffer(2, rl, this.ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = rb.getChannelData(c);
      for (let i = 0; i < rl; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 2.5);
    }
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = rb;
    const rg = this.ctx.createGain(); rg.gain.value = 0.12;
    this.reverb.connect(rg); rg.connect(this.compressor);
    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.initialised = true;
  }

  async resume(): Promise<void> {
    await this.init();
    if (this.ctx?.state === 'suspended') await this.ctx.resume();
  }

  get time(): number { return this.ctx?.currentTime ?? 0; }

  setMasterVolume(v: number): void {
    if (this.masterGain) this.masterGain.gain.value = Math.max(0, Math.min(1, v));
  }

  private noise(c: AudioContext, dur: number): AudioBufferSourceNode {
    const b = c.createBuffer(1, Math.max(1, c.sampleRate * dur | 0), c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b; return s;
  }

  playDrum(sound: DrumSound, time?: number, vol = 0.7): void {
    if (!this.ctx || !this.compressor) return;
    const c = this.ctx; const dst = this.compressor;
    const t = time ?? c.currentTime;
    const g = c.createGain();
    const { t: type, f, d } = sound;
    if (type === 'k8' || type === 'ka') {
      const o = c.createOscillator(); o.type = 'sine';
      const m = type === 'k8' ? 4 : 2.5;
      o.frequency.setValueAtTime(f * m, t);
      o.frequency.exponentialRampToValueAtTime(f, t + (type === 'k8' ? 0.06 : 0.04));
      o.frequency.exponentialRampToValueAtTime(20, t + d);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g); g.connect(dst); o.start(t); o.stop(t + d + 0.05);
    } else if (type === 's8' || type === 'sa') {
      const n = this.noise(c, d); const hp = c.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = type === 's8' ? 2000 : 3000;
      const ng = c.createGain(); ng.gain.setValueAtTime(vol * 0.6, t);
      ng.gain.exponentialRampToValueAtTime(0.001, t + d);
      n.connect(hp); hp.connect(ng); ng.connect(dst); n.start(t); n.stop(t + d + 0.05);
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
      const tg = c.createGain(); tg.gain.setValueAtTime(vol * 0.5, t);
      tg.gain.exponentialRampToValueAtTime(0.001, t + d * 0.5);
      o.connect(tg); tg.connect(dst); o.start(t); o.stop(t + d * 0.5 + 0.05);
    } else if (type === 'hh' || type === 'oh') {
      const n = this.noise(c, d); const bp = c.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = type === 'hh' ? 3 : 1;
      g.gain.setValueAtTime(vol * 0.4, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
      n.connect(bp); bp.connect(g); g.connect(dst); n.start(t); n.stop(t + d + 0.05);
    } else if (type === 'cl') {
      for (let i = 0; i < 3; i++) {
        const off = t + i * 0.01; const n = this.noise(c, 0.04);
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 2;
        const cg = c.createGain(); cg.gain.setValueAtTime(vol * 0.3, off);
        cg.gain.exponentialRampToValueAtTime(0.001, off + d);
        n.connect(bp); bp.connect(cg); cg.connect(dst); n.start(off); n.stop(off + d + 0.05);
      }
    } else {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(vol * 0.6, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g); g.connect(dst); o.start(t); o.stop(t + d + 0.05);
    }
  }

  playNote(noteName: string, dur = 0.3, waveform: OscillatorType = 'sawtooth', time?: number, vol = 0.5): void {
    if (!this.ctx || !this.compressor) return;
    const note = ALL_NOTES.find(n => n.name === noteName); if (!note) return;
    const c = this.ctx; const dst = this.compressor; const t = time ?? c.currentTime;
    const o = c.createOscillator(); o.type = waveform; o.frequency.value = note.freq;
    const fl = c.createBiquadFilter(); fl.type = 'lowpass';
    fl.frequency.setValueAtTime(note.freq * 6, t);
    fl.frequency.exponentialRampToValueAtTime(note.freq * 1.5, t + dur * 0.7);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.005);
    g.gain.setValueAtTime(vol * 0.8, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(fl); fl.connect(g); g.connect(dst); o.start(t); o.stop(t + dur + 0.05);
  }

  // Scale lock — returns notes in scale closest to a given frequency
  snapToScale(freq: number, rootNote: string, scaleName: string): NoteInfo {
    const intervals = SCALES[scaleName] ?? SCALES.pentatonic;
    const rootIdx = NOTE_NAMES.indexOf(rootNote);
    const scaleFreqs = intervals.flatMap(interval =>
      [0,1,2,3,4,5,6,7].map(oct => {
        const noteIdx = (rootIdx + interval) % 12;
        const noteName = NOTE_NAMES[noteIdx] + oct;
        return ALL_NOTES.find(n => n.name === noteName);
      }).filter(Boolean) as NoteInfo[]
    );
    return scaleFreqs.reduce((closest, n) =>
      Math.abs(n.freq - freq) < Math.abs(closest.freq - freq) ? n : closest
    );
  }

  // WAV export
  toWav(buf: AudioBuffer): Blob {
    const nc = buf.numberOfChannels, sr = buf.sampleRate;
    const ds = buf.length * nc * 2;
    const ab = new ArrayBuffer(44 + ds); const v = new DataView(ab);
    const w = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0,'RIFF'); v.setUint32(4, 36 + ds, true); w(8,'WAVE'); w(12,'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, nc, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * nc * 2, true);
    v.setUint16(32, nc * 2, true); v.setUint16(34, 16, true);
    w(36,'data'); v.setUint32(40, ds, true);
    const chs: Float32Array[] = [];
    for (let c = 0; c < nc; c++) chs.push(buf.getChannelData(c));
    let off = 44;
    for (let i = 0; i < buf.length; i++)
      for (let c = 0; c < nc; c++) {
        v.setInt16(off, Math.max(-1, Math.min(1, chs[c][i])) * 0x7fff, true); off += 2;
      }
    return new Blob([ab], { type: 'audio/wav' });
  }
}

// Singleton — one engine shared across all rooms
export const audioEngine = new AudioEngine();
export default audioEngine;
