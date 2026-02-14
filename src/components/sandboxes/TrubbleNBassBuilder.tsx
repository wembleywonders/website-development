// src/components/sandboxes/TrubbleNBassBuilder.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Save, Sliders, BookOpen, Radio, Headphones } from 'lucide-react';
import './TrubbleNBassBuilder.css';

interface Track {
  id: number;
  name: string;
  type: 'drums' | 'bass' | 'melody' | 'harmony' | 'vocals';
  instrument: string;
  pattern: boolean[];
  notes: (number | null)[];
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
  eqLow: number;
  eqMid: number;
  eqHigh: number;
  compression: number;
  reverb: number;
}

const INSTRUMENT_LIBRARY = {
  kick: [
    { id: 'kick-808', name: '808 Kick', freq: 50, decay: 0.5, type: 'sine' },
    { id: 'kick-acoustic', name: 'Acoustic', freq: 60, decay: 0.4, type: 'sine' },
    { id: 'kick-electronic', name: 'Electronic', freq: 55, decay: 0.6, type: 'sine' },
  ],
  snare: [
    { id: 'snare-acoustic', name: 'Acoustic', freq: 200, noise: true, snap: 0.8 },
    { id: 'snare-clap', name: 'Clap', freq: 1000, noise: true, snap: 1.2 },
    { id: 'snare-rim', name: 'Rim Shot', freq: 400, noise: true, snap: 0.5 },
  ],
  hihat: [
    { id: 'hihat-closed', name: 'Closed', freq: 8000, decay: 0.05, noise: true },
    { id: 'hihat-open', name: 'Open', freq: 6000, decay: 0.3, noise: true },
  ],
  percussion: [
    { id: 'perc-conga', name: 'Conga', freq: 150, decay: 0.3, type: 'sine' },
    { id: 'perc-cowbell', name: 'Cowbell', freq: 800, decay: 0.2, type: 'square' },
    { id: 'perc-shaker', name: 'Shaker', freq: 5000, decay: 0.1, noise: true },
  ],
  bass: [
    { id: 'bass-sub', name: 'Sub Bass', type: 'sine', harmonics: [1] },
    { id: 'bass-synth', name: 'Synth Bass', type: 'sawtooth', harmonics: [1, 0.5, 0.3] },
    { id: 'bass-electric', name: 'Electric', type: 'triangle', harmonics: [1, 0.3] },
  ],
  melody: [
    { id: 'melody-piano', name: 'Piano', type: 'triangle', harmonics: [1, 0.5, 0.3, 0.2] },
    { id: 'melody-steelpan', name: 'Steel Pan', type: 'sine', harmonics: [1, 2, 3], metallic: true },
    { id: 'melody-lead', name: 'Synth Lead', type: 'sawtooth', harmonics: [1, 0.7, 0.5] },
    { id: 'melody-guitar', name: 'Guitar', type: 'triangle', harmonics: [1, 0.4, 0.2] },
  ],
  harmony: [
    { id: 'harmony-pad', name: 'Synth Pad', type: 'sine', harmonics: [1, 0.8, 0.6, 0.4] },
    { id: 'harmony-organ', name: 'Organ', type: 'sine', harmonics: [1, 1, 0.8, 0.6] },
    { id: 'harmony-strings', name: 'Strings', type: 'sawtooth', harmonics: [1, 0.6, 0.4] },
  ],
  vocals: [
    { id: 'vocals-choir', name: 'Choir', type: 'sine', harmonics: [1, 0.5, 0.3, 0.2, 0.1] },
    { id: 'vocals-lead', name: 'Lead Vocal', type: 'triangle', harmonics: [1, 0.4, 0.2] },
  ],
};

const NOTES = [
  { note: 'C3', freq: 130.81 }, { note: 'D3', freq: 146.83 },
  { note: 'E3', freq: 164.81 }, { note: 'F3', freq: 174.61 },
  { note: 'G3', freq: 196.00 }, { note: 'A3', freq: 220.00 },
  { note: 'B3', freq: 246.94 }, { note: 'C4', freq: 261.63 },
  { note: 'D4', freq: 293.66 }, { note: 'E4', freq: 329.63 },
  { note: 'F4', freq: 349.23 }, { note: 'G4', freq: 392.00 },
];

const RAYDYO_TEMPLATES = {
  jingle: { name: 'Station Jingle (10 sec)', bpm: 128, description: 'Punchy, memorable, broadcast-ready' },
  soundbed: { name: 'Drama Soundbed (90 sec)', bpm: 80, description: 'Subtle, atmospheric, dialogue-friendly' },
  sting: { name: 'Transition Sting (5 sec)', bpm: 120, description: 'Quick, punchy, clean impact' },
};

interface TrubbleNBassBuilderProps {
  mode?: 'demo' | 'practice' | 'impact-lab';
  showSaveButton?: boolean;
}

const TrubbleNBassBuilder: React.FC<TrubbleNBassBuilderProps> = ({
  mode = 'demo',
  showSaveButton = true,
}) => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, name: 'Kick Drum', type: 'drums', instrument: 'kick-808', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 90, pan: 0, mute: false, solo: false, eqLow: 4, eqMid: 0, eqHigh: -2, compression: 70, reverb: 10 },
    { id: 2, name: 'Snare/Clap', type: 'drums', instrument: 'snare-acoustic', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 85, pan: 0, mute: false, solo: false, eqLow: -2, eqMid: 3, eqHigh: 5, compression: 75, reverb: 30 },
    { id: 3, name: 'Hi-Hats', type: 'drums', instrument: 'hihat-closed', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 75, pan: 40, mute: false, solo: false, eqLow: -8, eqMid: 0, eqHigh: 8, compression: 60, reverb: 20 },
    { id: 4, name: 'Percussion', type: 'drums', instrument: 'perc-conga', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 70, pan: -40, mute: false, solo: false, eqLow: 2, eqMid: 3, eqHigh: 3, compression: 50, reverb: 35 },
    { id: 5, name: 'Bass', type: 'bass', instrument: 'bass-sub', pattern: Array(16).fill(false), notes: Array(16).fill(0), volume: 95, pan: 0, mute: false, solo: false, eqLow: 8, eqMid: -4, eqHigh: -8, compression: 85, reverb: 5 },
    { id: 6, name: 'Melody/Lead', type: 'melody', instrument: 'melody-steelpan', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 80, pan: 20, mute: false, solo: false, eqLow: -2, eqMid: 3, eqHigh: 4, compression: 60, reverb: 40 },
    { id: 7, name: 'Harmony/Pads', type: 'harmony', instrument: 'harmony-pad', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 65, pan: -20, mute: false, solo: false, eqLow: 0, eqMid: 2, eqHigh: 3, compression: 50, reverb: 65 },
    { id: 8, name: 'Choir/Vocals', type: 'vocals', instrument: 'vocals-choir', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 75, pan: 0, mute: false, solo: false, eqLow: -3, eqMid: 5, eqHigh: 3, compression: 65, reverb: 55 },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(90);
  const [headphoneMode, setHeadphoneMode] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'sequencer' | 'mixer'>('sequencer');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showControlsHelp, setShowControlsHelp] = useState(true);
  
  const [uncleWinstonTip, setUncleWinstonTip] = useState<string>(
    "Start with drums and bass. They're your foundation. Everything else sits on top."
  );

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (masterGainRef.current) {
      const vol = headphoneMode ? (masterVolume / 100) * 1.2 : (masterVolume / 100);
      masterGainRef.current.gain.value = vol;
    }
  }, [masterVolume, headphoneMode]);

  const playSound = useCallback((track: Track, step: number) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    if (track.mute) return;
    
    const anySolo = tracks.some(t => t.solo);
    if (anySolo && !track.solo) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Enhanced panning with headphone mode
    const panValue = headphoneMode ? (track.pan / 100) * 1.5 : (track.pan / 100);
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.max(-1, Math.min(1, panValue));
    
    // Create gain node
    const gain = ctx.createGain();
    
    // EQ Chain
    const lowShelf = ctx.createBiquadFilter();
    const midPeak = ctx.createBiquadFilter();
    const highShelf = ctx.createBiquadFilter();
    
    lowShelf.type = 'lowshelf';
    lowShelf.frequency.value = 250;
    lowShelf.gain.value = track.eqLow;
    
    midPeak.type = 'peaking';
    midPeak.frequency.value = 1200;
    midPeak.Q.value = 1.5;
    midPeak.gain.value = track.eqMid;
    
    highShelf.type = 'highshelf';
    highShelf.frequency.value = 4000;
    highShelf.gain.value = track.eqHigh;
    
    // Reverb simulation
    const reverbGain = ctx.createGain();
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.03;
    const feedback = ctx.createGain();
    feedback.gain.value = track.reverb / 200;
    
    // DRUMS - More distinctive sounds
    if (track.type === 'drums') {
      const instData = INSTRUMENT_LIBRARY[track.instrument.split('-')[0] as keyof typeof INSTRUMENT_LIBRARY];
      if (instData && instData.length > 0) {
        const inst = instData[0] as any;
        
        if (inst.noise) {
          // Noise-based percussion (snare, hihat, shaker)
          const bufferSize = ctx.sampleRate * 0.1;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.value = inst.freq;
          noiseFilter.Q.value = inst.snap || 1;
          
          noise.connect(noiseFilter);
          noiseFilter.connect(gain);
          
          const volume = (track.volume / 100) * 0.8;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(volume, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.01, now + (inst.decay || 0.1));
          
          noise.start(now);
          noise.stop(now + (inst.decay || 0.1) + 0.01);
        } else {
          // Tonal drums (kick, conga, cowbell)
          const osc = ctx.createOscillator();
          osc.type = inst.type || 'sine';
          osc.frequency.setValueAtTime(inst.freq, now);
          osc.frequency.exponentialRampToValueAtTime(inst.freq * 0.5, now + inst.decay);
          
          osc.connect(gain);
          
          const volume = (track.volume / 100) * 1.2;
          const compression = 1 + (track.compression / 200);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(volume * compression, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.01, now + inst.decay);
          
          osc.start(now);
          osc.stop(now + inst.decay + 0.01);
        }
      }
    } 
    // PITCHED INSTRUMENTS - Richer harmonics
    else {
      const noteIndex = track.notes[step];
      if (noteIndex === null || noteIndex === undefined) return;
      
      const note = NOTES[noteIndex];
      if (!note) return;
      
      const instType = INSTRUMENT_LIBRARY[track.type][0] as any;
      const harmonics = instType.harmonics || [1];
      
      // Create multiple oscillators for richer sound
      const oscillators: OscillatorNode[] = [];
      harmonics.forEach((harmonic: number, index: number) => {
        const osc = ctx.createOscillator();
        osc.type = instType.type || 'sine';
        
        if (instType.metallic && index > 0) {
          osc.frequency.value = note.freq * (index + 1) * 2.1;
        } else {
          osc.frequency.value = note.freq * (index + 1);
        }
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = harmonic * (1 / (index + 1));
        
        osc.connect(oscGain);
        oscGain.connect(gain);
        oscillators.push(osc);
      });
      
      const volume = (track.volume / 100) * 0.7;
      const compression = 1 + (track.compression / 300);
      const sustain = track.type === 'harmony' ? 0.9 : track.type === 'bass' ? 0.6 : 0.5;
      const attack = track.type === 'harmony' ? 0.05 : 0.01;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * compression, now + attack);
      gain.gain.exponentialRampToValueAtTime(0.01, now + sustain);
      
      oscillators.forEach(osc => {
        osc.start(now);
        osc.stop(now + sustain + 0.01);
      });
    }
    
    // Connect audio chain
    gain.connect(lowShelf);
    lowShelf.connect(midPeak);
    midPeak.connect(highShelf);
    highShelf.connect(panner);
    
    // Reverb path
    panner.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(reverbGain);
    reverbGain.gain.value = track.reverb / 100;
    
    // Connect to master
    panner.connect(masterGainRef.current);
    reverbGain.connect(masterGainRef.current);
    
  }, [tracks, headphoneMode]);

  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / bpm) * 1000 / 4;
      
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % 16;
          
          tracks.forEach(track => {
            if (track.pattern[nextStep]) {
              playSound(track, nextStep);
            }
          });
          
          return nextStep;
        });
      }, stepDuration);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentStep(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, tracks, playSound]);

  const toggleStep = (trackId: number, step: number) => {
    setTracks(prev => prev.map(track => {
      if (track.id === trackId) {
        const newPattern = [...track.pattern];
        newPattern[step] = !newPattern[step];
        
        if (newPattern[step] && (track.type === 'bass' || track.type === 'melody' || track.type === 'harmony' || track.type === 'vocals')) {
          const newNotes = [...track.notes];
          if (newNotes[step] === null) {
            newNotes[step] = 0;
          }
          return { ...track, pattern: newPattern, notes: newNotes };
        }
        
        return { ...track, pattern: newPattern };
      }
      return track;
    }));
    
    const track = tracks.find(t => t.id === trackId);
    if (track && !track.pattern[step]) {
      playSound(track, step);
    }
  };

  const updateTrack = (trackId: number, updates: Partial<Track>) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, ...updates } : track
    ));
  };

  const clearAllTracks = () => {
    setTracks(prev => prev.map(track => ({
      ...track,
      pattern: Array(16).fill(false),
      notes: Array(16).fill(track.type === 'drums' ? null : 0),
    })));
  };

  const loadTemplate = (templateKey: keyof typeof RAYDYO_TEMPLATES) => {
    const template = RAYDYO_TEMPLATES[templateKey];
    setBpm(template.bpm);
    clearAllTracks();
    setUncleWinstonTip(`Loaded "${template.name}" template. ${template.description}. Study the structure.`);
  };

  return (
    <div className="trubble-8track">
      <div className="builder-header">
        <div className="builder-title">
          <h3>🎚️ Trubble n Bass - 8-Track Production Lab</h3>
          <p className="builder-subtitle">
            Professional broadcast production • Learn arrangement & mixing from OG studio wisdom
          </p>
        </div>
        
        <div className="header-actions">
          <button 
            className={`action-btn ${showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            <BookOpen size={20} />
            Heritage
          </button>
          <button 
            className={`action-btn ${showTemplates ? 'active' : ''}`}
            onClick={() => setShowTemplates(!showTemplates)}
          >
            <Radio size={20} />
            Templates
          </button>
          <button 
            className={`action-btn ${headphoneMode ? 'active' : ''}`}
            onClick={() => setHeadphoneMode(!headphoneMode)}
            title="Enhanced stereo for headphones"
          >
            <Headphones size={20} />
            {headphoneMode ? '🎧 ON' : 'Speakers'}
          </button>
          <button 
            className={`action-btn ${viewMode === 'mixer' ? 'active' : ''}`}
            onClick={() => setViewMode(viewMode === 'sequencer' ? 'mixer' : 'sequencer')}
          >
            <Sliders size={20} />
            {viewMode === 'sequencer' ? 'Mixer' : 'Sequencer'}
          </button>
        </div>
      </div>

      <div className="uncle-winston-tip">
        <div className="tip-icon">👴🏾</div>
        <div className="tip-content">
          <strong>Uncle Winston:</strong> {uncleWinstonTip}
        </div>
      </div>

      {showControlsHelp && (
        <div className="controls-help">
          <div className="help-header">
            <h4>🎛️ Track Controls Quick Guide</h4>
            <button className="close-help" onClick={() => setShowControlsHelp(false)}>✕</button>
          </div>
          <div className="help-grid">
            <div className="help-item">
              <strong>S (Solo)</strong>
              <p>Play ONLY this track (mutes all others temporarily)</p>
            </div>
            <div className="help-item">
              <strong>M (Mute)</strong>
              <p>Silence this track (others keep playing)</p>
            </div>
            <div className="help-item">
              <strong>⚙️ (Mixer)</strong>
              <p>Open mixing panel: Volume, Pan, EQ, Compression, Reverb</p>
            </div>
            <div className="help-item">
              <strong>🎧 Headphones</strong>
              <p>Enhanced stereo + volume boost for headphone listening</p>
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="heritage-panel">
          <h4>🎚️ From TEAC 8-Track to Digital Production</h4>
          <div className="heritage-grid">
            <div className="heritage-card">
              <h5>📼 The TEAC Era (1970s-80s)</h5>
              <p>
                Your mum's TEAC 8-track deck was professional equipment. 8 independent tracks meant 
                you could layer drums, bass, instruments, vocals. Each track had its own level.
              </p>
            </div>
            <div className="heritage-card">
              <h5>🎹 Ivan Hunte Teaching Gordon (Sade)</h5>
              <p>
                Jazz pianist teaching his son guitar. Structure. Harmony. How instruments RELATE. 
                Not just "play notes" - understand the ROLE each plays.
              </p>
            </div>
            <div className="heritage-card">
              <h5>🎸 Alpine Grant's Studio (The Equals)</h5>
              <p>
                Full professional studio. Learned by DOING. Watched mixing. Understood frequency balance. 
                Why kick and bass can't fight. How reverb creates depth.
              </p>
            </div>
            <div className="heritage-card">
              <h5>🎙️ Today: Same Principles, Digital Tools</h5>
              <p>
                This 8-track lab teaches what you learned in those analogue studios. Arrangement. 
                Mixing. Professional production. Accessible to kids with laptops.
              </p>
            </div>
          </div>
        </div>
      )}

      {showTemplates && (
        <div className="templates-panel">
          <h4>📻 Rayd-yo Broadcast Templates</h4>
          <p>Professional radio formats - study these structures</p>
          <div className="templates-grid">
            {Object.entries(RAYDYO_TEMPLATES).map(([key, template]) => (
              <div key={key} className="template-card" onClick={() => loadTemplate(key as keyof typeof RAYDYO_TEMPLATES)}>
                <h5>{template.name}</h5>
                <p className="template-desc">{template.description}</p>
                <div className="template-meta">
                  <span>{template.bpm} BPM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'sequencer' ? (
        <div className="sequencer-daw">
          <div className="timeline-header">
            <div className="timeline-label">TRACKS</div>
            <div className="timeline-steps">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`step-number ${i % 4 === 0 ? 'beat' : ''}`}>
                  {i % 4 === 0 ? Math.floor(i / 4) + 1 : ''}
                </div>
              ))}
            </div>
            <div className="timeline-controls">CTRL</div>
          </div>

          <div className="daw-tracks">
            {tracks.map(track => (
              <div key={track.id} className={`daw-track ${track.mute ? 'muted' : ''} ${track.solo ? 'solo' : ''}`}>
                <div className="track-name-col">
                  <div className="track-name-header">
                    <h4>{track.name}</h4>
                    <select 
                      value={track.instrument}
                      onChange={(e) => updateTrack(track.id, { instrument: e.target.value })}
                      className="instrument-select-compact"
                    >
                      {(() => {
                        // Build the correct instrument list depending on the track type.
                        // 'drums' is not a key in INSTRUMENT_LIBRARY, so combine relevant drum collections.
                        const getOptions = (t: Track['type']) => {
                          if (t === 'drums') {
                            return [
                              ...INSTRUMENT_LIBRARY.kick,
                              ...INSTRUMENT_LIBRARY.snare,
                              ...INSTRUMENT_LIBRARY.hihat,
                              ...INSTRUMENT_LIBRARY.percussion,
                            ];
                          }
                          // For other track types index safely (cast to any to avoid TS complaining about dynamic key)
                          return (INSTRUMENT_LIBRARY as any)[t] || [];
                        };
                        
                        const options = getOptions(track.type);
                        return options.map((inst: any) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.name.length > 12 ? inst.name.substring(0, 10) + '..' : inst.name}
                          </option>
                        ));
                      })()}
                    </select>
                  </div>
                </div>

                <div className="track-steps-horizontal">
                  {track.pattern.map((active, step) => (
                    <button
                      key={step}
                      className={`daw-step ${active ? 'active' : ''} ${currentStep === step && isPlaying ? 'playing' : ''} ${step % 4 === 0 ? 'beat-marker' : ''}`}
                      onClick={() => toggleStep(track.id, step)}
                    >
                      <span className="step-indicator">{active ? '■' : '·'}</span>
                    </button>
                  ))}
                </div>

                <div className="track-quick-controls">
                  <button 
                    className={`quick-btn solo ${track.solo ? 'active' : ''}`}
                    onClick={() => updateTrack(track.id, { solo: !track.solo })}
                    title="Solo"
                  >
                    S
                  </button>
                  <button 
                    className={`quick-btn mute ${track.mute ? 'active' : ''}`}
                    onClick={() => updateTrack(track.id, { mute: !track.mute })}
                    title="Mute"
                  >
                    M
                  </button>
                  <button 
                    className={`quick-btn mixer ${selectedTrack === track.id ? 'active' : ''}`}
                    onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                    title="Mixer"
                  >
                    <Sliders size={14} />
                  </button>
                </div>

                {selectedTrack === track.id && (
                  <div className="track-mixing-panel">
                    <div className="mixing-grid">
                      <div className="mix-param">
                        <label>Volume</label>
                        <input type="range" min="0" max="100" value={track.volume} onChange={(e) => updateTrack(track.id, { volume: Number(e.target.value) })} className="mix-slider" />
                        <span className="mix-value">{track.volume}</span>
                      </div>
                      <div className="mix-param">
                        <label>Pan</label>
                        <input type="range" min="-100" max="100" value={track.pan} onChange={(e) => updateTrack(track.id, { pan: Number(e.target.value) })} className="mix-slider" />
                        <span className="mix-value">{track.pan === 0 ? 'C' : track.pan > 0 ? `R${track.pan}` : `L${Math.abs(track.pan)}`}</span>
                      </div>
                      <div className="mix-param">
                        <label>Low</label>
                        <input type="range" min="-12" max="12" value={track.eqLow} onChange={(e) => updateTrack(track.id, { eqLow: Number(e.target.value) })} className="mix-slider eq" />
                        <span className="mix-value">{track.eqLow > 0 ? '+' : ''}{track.eqLow}</span>
                      </div>
                      <div className="mix-param">
                        <label>Mid</label>
                        <input type="range" min="-12" max="12" value={track.eqMid} onChange={(e) => updateTrack(track.id, { eqMid: Number(e.target.value) })} className="mix-slider eq" />
                        <span className="mix-value">{track.eqMid > 0 ? '+' : ''}{track.eqMid}</span>
                      </div>
                      <div className="mix-param">
                        <label>High</label>
                        <input type="range" min="-12" max="12" value={track.eqHigh} onChange={(e) => updateTrack(track.id, { eqHigh: Number(e.target.value) })} className="mix-slider eq" />
                        <span className="mix-value">{track.eqHigh > 0 ? '+' : ''}{track.eqHigh}</span>
                      </div>
                      <div className="mix-param">
                        <label>Comp</label>
                        <input type="range" min="0" max="100" value={track.compression} onChange={(e) => updateTrack(track.id, { compression: Number(e.target.value) })} className="mix-slider" />
                        <span className="mix-value">{track.compression}%</span>
                      </div>
                      <div className="mix-param">
                        <label>Reverb</label>
                        <input type="range" min="0" max="100" value={track.reverb} onChange={(e) => updateTrack(track.id, { reverb: Number(e.target.value) })} className="mix-slider" />
                        <span className="mix-value">{track.reverb}%</span>
                      </div>
                      <button className="close-mixer" onClick={() => setSelectedTrack(null)}>Close ✕</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="arrangement-tip">
            <span className="tip-icon">👴🏾</span>
            <span className="tip-text">
              <strong>Uncle Winston:</strong> See how kick and bass hit together? That's your pocket. 
              Notice snare on 2 and 4? That's your backbeat. This is how you SEE arrangement.
            </span>
          </div>
        </div>
      ) : (
        <div className="mixer-view">
          <div className="mixer-strips">
            {tracks.map(track => (
              <div key={track.id} className="mixer-strip">
                <div className="strip-header">
                  <h5>{track.name}</h5>
                </div>
                <div className="strip-controls">
                  <div className="fader-section">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={track.volume} 
                      onChange={(e) => updateTrack(track.id, { volume: Number(e.target.value) })} 
                      className="vertical-fader" 
                    />
                    <span className="fader-value">{track.volume}</span>
                  </div>
                  <div className="pan-knob">
                    <input type="range" min="-100" max="100" value={track.pan} onChange={(e) => updateTrack(track.id, { pan: Number(e.target.value) })} />
                    <span>Pan</span>
                  </div>
                  <div className="strip-buttons">
                    <button className={`strip-btn ${track.solo ? 'active' : ''}`} onClick={() => updateTrack(track.id, { solo: !track.solo })}>S</button>
                    <button className={`strip-btn ${track.mute ? 'active' : ''}`} onClick={() => updateTrack(track.id, { mute: !track.mute })}>M</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="transport-controls">
        <div className="playback-section">
          <button className={`transport-btn ${isPlaying ? 'playing' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="transport-btn" onClick={() => setCurrentStep(0)}>
            <RotateCcw size={20} />
          </button>
          <button className="transport-btn" onClick={clearAllTracks}>Clear</button>
          {showSaveButton && (
            <button className="transport-btn save"><Save size={20} />Save</button>
          )}
        </div>
        
        <div className="bpm-section">
          <label>BPM: {bpm}</label>
          <input type="range" min="60" max="180" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} />
        </div>
        
        <div className="master-section">
          <label>Master: {masterVolume}</label>
          <input type="range" min="0" max="100" value={masterVolume} onChange={(e) => setMasterVolume(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
};

export default TrubbleNBassBuilder;