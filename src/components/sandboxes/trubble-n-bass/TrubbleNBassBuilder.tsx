// src/components/sandboxes/trubble-n-bass/TrubbleNBassBuilder.tsx
// COMPLETE VERSION - Keyboard + Drum Pads + Metronome + Sequencer
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './TrubbleNBassBuilder.module.css';

interface Track {
  id: number;
  name: string;
  type: 'drums' | 'bass' | 'melody';
  pattern: boolean[];
  notes: (number | null)[];
  volume: number;
  mute: boolean;
  solo: boolean;
}

interface TrubbleNBassBuilderProps {
  onComplete: () => void;
}

const NOTES = [
  { note: 'C3', freq: 130.81, key: 'a' },
  { note: 'C#3', freq: 138.59, key: 'w', black: true },
  { note: 'D3', freq: 146.83, key: 's' },
  { note: 'D#3', freq: 155.56, key: 'e', black: true },
  { note: 'E3', freq: 164.81, key: 'd' },
  { note: 'F3', freq: 174.61, key: 'f' },
  { note: 'F#3', freq: 184.99, key: 't', black: true },
  { note: 'G3', freq: 196.00, key: 'g' },
  { note: 'G#3', freq: 207.65, key: 'y', black: true },
  { note: 'A3', freq: 220.00, key: 'h' },
  { note: 'A#3', freq: 233.08, key: 'u', black: true },
  { note: 'B3', freq: 246.94, key: 'j' },
  { note: 'C4', freq: 261.63, key: 'k' },
  { note: 'C#4', freq: 277.18, key: 'o', black: true },
  { note: 'D4', freq: 293.66, key: 'l' },
  { note: 'D#4', freq: 311.13, key: 'p', black: true },
  { note: 'E4', freq: 329.63, key: ';' },
  { note: 'F4', freq: 349.23, key: "'" },
  { note: 'F#4', freq: 369.99, key: ']', black: true },
  { note: 'G4', freq: 392.00, key: 'Enter' },
];

type DrumKey = 'kick' | 'snare' | 'hihat' | 'perc';
interface DrumSound {
  freq: number;
  decay: number;
  noise?: boolean;
}

const DRUM_SOUNDS: Record<DrumKey, DrumSound> = {
  kick: { freq: 50, decay: 0.5 },
  snare: { freq: 200, decay: 0.15, noise: true },
  hihat: { freq: 8000, decay: 0.05 },
  perc: { freq: 150, decay: 0.2 },
};

const DRUM_PADS = [
  { id: 1, name: 'Kick', type: 'kick', key: '1', trackId: 1 },
  { id: 2, name: 'Snare', type: 'snare', key: '2', trackId: 2 },
  { id: 3, name: 'HH-C', type: 'hihat', key: '3', trackId: 3 },
  { id: 4, name: 'HH-O', type: 'hihat', key: '4', trackId: 3 },
  { id: 5, name: 'Clap', type: 'snare', key: '5', trackId: 2 },
  { id: 6, name: 'Perc', type: 'perc', key: '6', trackId: 4 },
  { id: 7, name: 'Tom', type: 'kick', key: '7', trackId: 1 },
  { id: 8, name: 'FX', type: 'hihat', key: '8', trackId: 3 },
  { id: 9, name: 'Bass', type: 'bass', key: 'q', trackId: 5 },
  { id: 10, name: 'Lead', type: 'melody', key: 'w', trackId: 6 },
  { id: 11, name: 'Pad', type: 'melody', key: 'e', trackId: 7 },
  { id: 12, name: 'Vox', type: 'melody', key: 'r', trackId: 8 },
  { id: 13, name: 'Synth', type: 'melody', key: 't', trackId: 6 },
  { id: 14, name: 'Conga', type: 'perc', key: 'y', trackId: 4 },
  { id: 15, name: 'Cowbell', type: 'perc', key: 'u', trackId: 4 },
  { id: 16, name: 'Shaker', type: 'hihat', key: 'i', trackId: 3 },
];

const SCALES = {
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  pentatonic: [0, 2, 4, 7, 9, 12, 14, 16, 19], // C D E G A
  major: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19], // C D E F G A B
  minor: [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19], // C D Eb F G Ab Bb
};

const TrubbleNBassBuilder: React.FC<TrubbleNBassBuilderProps> = ({ onComplete }) => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, name: 'Kick Drum 🥁', type: 'drums', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 80, mute: false, solo: false },
    { id: 2, name: 'Snare/Clap 👏', type: 'drums', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 75, mute: false, solo: false },
    { id: 3, name: 'Hi-Hats 🎩', type: 'drums', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 65, mute: false, solo: false },
    { id: 4, name: 'Percussion 🪘', type: 'drums', pattern: Array(16).fill(false), notes: Array(16).fill(null), volume: 60, mute: false, solo: false },
    { id: 5, name: 'Bass 🎸', type: 'bass', pattern: Array(16).fill(false), notes: Array(16).fill(0), volume: 85, mute: false, solo: false },
    { id: 6, name: 'Melody 🎹', type: 'melody', pattern: Array(16).fill(false), notes: Array(16).fill(0), volume: 70, mute: false, solo: false },
    { id: 7, name: 'Harmony 🎵', type: 'melody', pattern: Array(16).fill(false), notes: Array(16).fill(0), volume: 55, mute: false, solo: false },
    { id: 8, name: 'Vocals 🎤', type: 'melody', pattern: Array(16).fill(false), notes: Array(16).fill(0), volume: 65, mute: false, solo: false },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [masterVolume, setMasterVolume] = useState(80);
  const [showTheory, setShowTheory] = useState(false);
  const [showHeritage, setShowHeritage] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedScale, setSelectedScale] = useState<keyof typeof SCALES>('pentatonic');
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());
  const [activePads, setActivePads] = useState<Set<number>>(new Set());
  const [metronomeEnabled, setMetronomeEnabled] = useState(true);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const [tip, setTip] = useState<string>(
    "Try the keyboard first! Play some notes to hear what they sound like, then add them to your beat."
  );

  // Initialize Audio Context
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

  // Update master volume
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = masterVolume / 100;
    }
  }, [masterVolume]);

  // Play sound function
  const playSound = useCallback((freq: number, type: 'sine' | 'sawtooth' | 'square' = 'sine', duration: number = 0.3, volume: number = 0.5) => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(masterGainRef.current);
    
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    osc.start(now);
    osc.stop(now + duration + 0.1);
  }, []);

  // Play metronome click
  const playMetronomeClick = useCallback((isBeatOne: boolean) => {
    if (!metronomeEnabled) return;
    const freq = isBeatOne ? 1000 : 800;
    const volume = isBeatOne ? 0.3 : 0.2;
    playSound(freq, 'sine', 0.05, volume);
  }, [metronomeEnabled, playSound]);

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / bpm) * 1000 / 4;
      
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % 16;
          
          // Update beat counter (every 4 steps = 1 beat)
          if (nextStep % 4 === 0) {
            const beatNum = (nextStep / 4);
            setCurrentBeat(beatNum);
            playMetronomeClick(beatNum === 0);
          }
          
          // Play active tracks
          tracks.forEach(track => {
            if (track.pattern[nextStep] && !track.mute) {
              const anySolo = tracks.some(t => t.solo);
              if (anySolo && !track.solo) return;
              
              const volume = (track.volume / 100) * 0.5;
              
              if (track.type === 'drums') {
                const drumType = ['kick', 'snare', 'hihat', 'perc'][track.id - 1];
                const drum = DRUM_SOUNDS[drumType as keyof typeof DRUM_SOUNDS];
                playSound(drum.freq, drum.noise ? 'square' : 'sine', drum.decay, volume);
              } else {
                const noteIndex = track.notes[nextStep];
                if (noteIndex !== null && noteIndex !== undefined) {
                  const note = NOTES.filter(n => !n.black)[noteIndex];
                  if (note) {
                    playSound(note.freq, track.type === 'bass' ? 'sawtooth' : 'sine', 0.4, volume);
                  }
                }
              }
            }
          });
          
          return nextStep;
        });
      }, stepDuration);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentStep(0);
      setCurrentBeat(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, tracks, playMetronomeClick, playSound]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return;
      
      const key = e.key.toLowerCase();
      
      // Check piano keys
      const noteIndex = NOTES.findIndex(n => n.key === key);
      if (noteIndex !== -1 && !activeKeys.has(noteIndex)) {
        setActiveKeys(prev => new Set(prev).add(noteIndex));
        playSound(NOTES[noteIndex].freq, 'sine', 0.5, 0.4);
      }
      
      // Check drum pads
      const padIndex = DRUM_PADS.findIndex(p => p.key === key);
      if (padIndex !== -1 && !activePads.has(padIndex)) {
        setActivePads(prev => new Set(prev).add(padIndex));
        const pad = DRUM_PADS[padIndex];
        const drum = DRUM_SOUNDS[pad.type as keyof typeof DRUM_SOUNDS];
        if (drum) {
          playSound(drum.freq, drum.noise ? 'square' : 'sine', drum.decay || 0.3, 0.5);
        }
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      const noteIndex = NOTES.findIndex(n => n.key === key);
      if (noteIndex !== -1) {
        setActiveKeys(prev => {
          const newSet = new Set(prev);
          newSet.delete(noteIndex);
          return newSet;
        });
      }
      
      const padIndex = DRUM_PADS.findIndex(p => p.key === key);
      if (padIndex !== -1) {
        setActivePads(prev => {
          const newSet = new Set(prev);
          newSet.delete(padIndex);
          return newSet;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [showIntro, activeKeys, activePads, playSound]);

  // Sequencer functions
  const toggleStep = (trackId: number, step: number) => {
    setTracks(prev => prev.map(track => {
      if (track.id === trackId) {
        const newPattern = [...track.pattern];
        newPattern[step] = !newPattern[step];
        return { ...track, pattern: newPattern };
      }
      return track;
    }));
  };

  const updateTrack = (trackId: number, updates: Partial<Track>) => {
    setTracks(prev => prev.map(track =>
      track.id === trackId ? { ...track, ...updates } : track
    ));
  };

  const updateNote = (trackId: number, step: number, noteIndex: number) => {
    setTracks(prev => prev.map(track => {
      if (track.id === trackId) {
        const newNotes = [...track.notes];
        newNotes[step] = noteIndex;
        return { ...track, notes: newNotes };
      }
      return track;
    }));
  };

  const clearAll = () => {
    setTracks(prev => prev.map(track => ({
      ...track,
      pattern: Array(16).fill(false),
      notes: Array(16).fill(track.type === 'drums' ? null : 0),
    })));
  };

  const downloadBeat = () => {
    alert('Download functionality - Members get unlimited WAV/MP3 exports!');
  };

  const handlePianoKeyClick = (index: number) => {
    setActiveKeys(prev => new Set(prev).add(index));
    playSound(NOTES[index].freq, 'sine', 0.5, 0.4);
    setTimeout(() => {
      setActiveKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 200);
  };

  const handleDrumPadClick = (index: number) => {
    setActivePads(prev => new Set(prev).add(index));
    const pad = DRUM_PADS[index];
    const drum = DRUM_SOUNDS[pad.type as keyof typeof DRUM_SOUNDS];
    if (drum) {
      playSound(drum.freq, drum.noise ? 'square' : 'sine', drum.decay || 0.3, 0.5);
    }
    setTimeout(() => {
      setActivePads(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 150);
  };

  // INTRO PANEL
  if (showIntro) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>🎵 8-Track Beat Maker</h1>
            <p className={styles.subtitle}>Professional production with keyboard, drum pads & metronome</p>
          </div>
          <button onClick={onComplete} className={styles.closeBtn}>
            ✕ Close
          </button>
        </div>

        <div className={styles.introPanel}>
          <div className={styles.introHeader}>
            <h2>Welcome to the Complete Beat Maker!</h2>
            <p className={styles.introTagline}>
              🎹 Playable Keyboard • 🥁 MPC Drum Pads • ⏱️ Metronome • 🎚️ 8-Track Sequencer
            </p>
          </div>

          <div className={styles.introContent}>
            <div className={styles.introSection}>
              <h3>🎹 Playable Piano Keyboard</h3>
              <ul>
                <li><strong>2-octave range (C3-G4)</strong> - Test melodies before adding to sequencer</li>
                <li><strong>Computer keyboard mapped</strong> - ASDFGHJKL = white keys, WETYUOP = black keys</li>
                <li><strong>Scale highlighting</strong> - See pentatonic, major, and minor scales</li>
                <li><strong>Note names visible</strong> - Learn as you play</li>
              </ul>
            </div>

            <div className={styles.introSection}>
              <h3>🥁 MPC-Style Drum Pads</h3>
              <ul>
                <li><strong>16 pads (8x2 grid)</strong> - Tap out rhythms with mouse or keyboard</li>
                <li><strong>Keyboard mapped</strong> - 1-8 top row, QWERTYUI bottom row</li>
                <li><strong>Instant playback</strong> - Hear sounds immediately</li>
                <li><strong>Cultural connection</strong> - Hip-hop, grime, UK garage tradition</li>
              </ul>
            </div>

            <div className={styles.introSection}>
              <h3>⏱️ Visual Metronome</h3>
              <ul>
                <li><strong>Click track</strong> - Hear beats 1, 2, 3, 4 with emphasis on 1</li>
                <li><strong>Visual flash</strong> - See the beat counter</li>
                <li><strong>Synced to BPM</strong> - Always in time with your beat</li>
                <li><strong>Toggle on/off</strong> - Enable when needed</li>
              </ul>
            </div>

            <div className={styles.introSection}>
              <h3>🌍 What You'll Learn</h3>
              <ul>
                <li><strong>Cultural Foundations</strong> - African polyrhythm, Caribbean syncopation, UK sound system</li>
                <li><strong>Music Theory</strong> - Scales, notes, rhythm patterns, time signatures</li>
                <li><strong>Production Skills</strong> - Beat construction, arrangement, mixing fundamentals</li>
              </ul>
            </div>
          </div>

          <div className={styles.introGuide}>
            <div className={styles.guideBox}>
              <h4>📖 Need Detailed Guidance?</h4>
              <p>
                Our ROV guide provides step-by-step tutorials, studio wisdom, and cultural context for every feature.
              </p>
              <a 
                href="/workshops/facilitation" 
                target="_blank"
                className={styles.guideLink}
              >
                Open Full Guide →
              </a>
            </div>
          </div>

          <div className={styles.gettingStarted}>
            <h3>🚀 Getting Started</h3>
            <div className={styles.tipsGrid}>
              <div className={styles.tipCard}>
                <span className={styles.tipNumber}>1</span>
                <p><strong>Try the keyboard:</strong> Click keys or use your computer keyboard (ASDF...)</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipNumber}>2</span>
                <p><strong>Hit the drum pads:</strong> Tap pads or press number keys (1-8, QWERTY...)</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipNumber}>3</span>
                <p><strong>Build in sequencer:</strong> Click step buttons to create patterns</p>
              </div>
              <div className={styles.tipCard}>
                <span className={styles.tipNumber}>4</span>
                <p><strong>Press Play:</strong> Hear your creation with metronome guidance!</p>
              </div>
            </div>
          </div>

          <div className={styles.introActions}>
            <button 
              className={styles.startBtn}
              onClick={() => setShowIntro(false)}
            >
              Start Creating →
            </button>
            <p className={styles.introNote}>
              💡 Re-open this guide anytime with the "📖 Guide" button
            </p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN INTERFACE
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>🎵 8-Track Beat Maker</h1>
          <p className={styles.subtitle}>Keyboard • Drum Pads • Metronome • Sequencer</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setShowIntro(true)} className={styles.headerBtn}>
            📖 Guide
          </button>
          <button onClick={() => setShowHeritage(!showHeritage)} className={styles.headerBtn}>
            🌍 Heritage
          </button>
          <button onClick={() => setShowTheory(!showTheory)} className={styles.headerBtn}>
            🎼 Theory
          </button>
          <button onClick={onComplete} className={styles.closeBtn}>
            ✕ Close
          </button>
        </div>
      </div>

      {/* Uncle Winston Tip */}
      <div className={styles.tip}>
        <span className={styles.tipIcon}>👴🏾</span>
        <div>
          <strong>Uncle Winston:</strong> {tip}
        </div>
      </div>

      {/* Heritage Panel */}
      {showHeritage && (
        <div className={styles.panel}>
          <h3>🌍 From Studio Heritage to Digital Tools</h3>
          <div className={styles.panelGrid}>
            <div className={styles.panelCard}>
              <h4>🎹 Ivan Hunte's Piano Lessons</h4>
              <p>
                Jazz pianist taught his son Gordon (Sade) keyboard. Not just notes - understand HARMONY. 
                How chords work together. This keyboard lets you explore that same way.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>🥁 Sound System Culture</h4>
              <p>
                UK sound systems had selector (DJ) and MC. Selector had to FEEL the rhythm, know when 
                to drop the bass. These drum pads teach that same tactile relationship with beats.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>⏱️ Studio Discipline</h4>
              <p>
                Alpine Grant's studio: Everything on time. Metronome always running. You learn to FEEL 
                the click track, internalize tempo. That's professional discipline.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>📼 8-Track Arrangement</h4>
              <p>
                TEAC 8-track taught arrangement: kick+bass foundation, percussion adds swing, melody 
                on top. Same principles, digital tools. Build track by track.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Theory Panel */}
      {showTheory && (
        <div className={styles.panel}>
          <h3>🎼 Music Theory Basics</h3>
          <div className={styles.panelGrid}>
            <div className={styles.panelCard}>
              <h4>🎹 Piano Layout</h4>
              <p>
                White keys = natural notes (C D E F G A B). Black keys = sharps/flats (C# D# F# G# A#). 
                Pattern repeats every octave. Learn this visually on the keyboard.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>🎵 Scales & Keys</h4>
              <p>
                <strong>Pentatonic:</strong> 5 notes, universal (C D E G A)<br/>
                <strong>Major:</strong> Happy sound (C D E F G A B)<br/>
                <strong>Minor:</strong> Sad sound (C D Eb F G Ab Bb)<br/>
                Use scale highlighter to see patterns.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>🥁 Rhythm Foundation</h4>
              <p>
                4/4 time = 4 beats per bar. Metronome counts: 1-2-3-4. Kick on 1 & 3 (downbeats). 
                Snare on 2 & 4 (backbeat). Hi-hats keep time between beats.
              </p>
            </div>
            <div className={styles.panelCard}>
              <h4>🎸 Frequency Balance</h4>
              <p>
                Bass = low frequencies (50-200 Hz). Kick lives here too - they can't fight. 
                Melody = mid-high (200-4000 Hz). Hi-hats = very high (8000+ Hz). Each has its space.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PLAYABLE KEYBOARD */}
      <div className={styles.keyboardSection}>
        <div className={styles.keyboardHeader}>
          <h3>🎹 Playable Keyboard</h3>
          <div className={styles.scaleSelector}>
            <label>Scale:</label>
            <button 
              className={selectedScale === 'pentatonic' ? styles.scaleActive : ''}
              onClick={() => setSelectedScale('pentatonic')}
            >
              Pentatonic
            </button>
            <button 
              className={selectedScale === 'major' ? styles.scaleActive : ''}
              onClick={() => setSelectedScale('major')}
            >
              Major
            </button>
            <button 
              className={selectedScale === 'minor' ? styles.scaleActive : ''}
              onClick={() => setSelectedScale('minor')}
            >
              Minor
            </button>
            <button 
              className={selectedScale === 'chromatic' ? styles.scaleActive : ''}
              onClick={() => setSelectedScale('chromatic')}
            >
              All Notes
            </button>
          </div>
        </div>
        
        <div className={styles.piano}>
          {NOTES.map((note, index) => {
            const isHighlighted = SCALES[selectedScale].includes(index);
            const isActive = activeKeys.has(index);
            
            if (note.black) {
              return (
                <div
                  key={index}
                  className={`${styles.blackKey} ${isActive ? styles.keyActive : ''} ${isHighlighted ? styles.keyHighlighted : ''}`}
                  onClick={() => handlePianoKeyClick(index)}
                >
                  <span className={styles.keyLabel}>{note.note}</span>
                  <span className={styles.keyboardKey}>{note.key.toUpperCase()}</span>
                </div>
              );
            }
            
            return (
              <div
                key={index}
                className={`${styles.whiteKey} ${isActive ? styles.keyActive : ''} ${isHighlighted ? styles.keyHighlighted : ''}`}
                onClick={() => handlePianoKeyClick(index)}
              >
                <span className={styles.keyLabel}>{note.note}</span>
                <span className={styles.keyboardKey}>{note.key.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DRUM PADS */}
      <div className={styles.drumPadsSection}>
        <div className={styles.drumPadsHeader}>
          <h3>🥁 MPC Drum Pads</h3>
          <p className={styles.drumPadsSubtitle}>Click pads or use keyboard (1-8, Q-I)</p>
        </div>
        
        <div className={styles.drumPads}>
          {DRUM_PADS.map((pad, index) => {
            const isActive = activePads.has(index);
            return (
              <div
                key={pad.id}
                className={`${styles.drumPad} ${isActive ? styles.padActive : ''}`}
                onClick={() => handleDrumPadClick(index)}
              >
                <span className={styles.padName}>{pad.name}</span>
                <span className={styles.padKey}>{pad.key.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* METRONOME */}
      <div className={styles.metronomeSection}>
        <div className={styles.metronomeHeader}>
          <h3>⏱️ Metronome</h3>
          <button 
            className={`${styles.metronomeToggle} ${metronomeEnabled ? styles.metronomeOn : ''}`}
            onClick={() => setMetronomeEnabled(!metronomeEnabled)}
          >
            {metronomeEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className={styles.metronomeDisplay}>
          {[0, 1, 2, 3].map(beat => (
            <div 
              key={beat}
              className={`${styles.metronomeBeat} ${currentBeat === beat && isPlaying ? styles.beatActive : ''}`}
            >
              {beat + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 8-TRACK SEQUENCER */}
      <div className={styles.sequencer}>
        <h3 className={styles.sequencerTitle}>🎚️ 8-Track Sequencer</h3>
        {tracks.map(track => (
          <div key={track.id} className={styles.track}>
            <div className={styles.trackInfo}>
              <h4>{track.name}</h4>
              <div className={styles.trackControls}>
                <button 
                  className={`${styles.trackBtn} ${track.solo ? styles.active : ''}`}
                  onClick={() => updateTrack(track.id, { solo: !track.solo })}
                  title="Solo"
                >
                  S
                </button>
                <button 
                  className={`${styles.trackBtn} ${track.mute ? styles.active : ''}`}
                  onClick={() => updateTrack(track.id, { mute: !track.mute })}
                  title="Mute"
                >
                  M
                </button>
              </div>
            </div>

            <div className={styles.steps}>
              {track.pattern.map((active, step) => (
                <div key={step} className={styles.stepContainer}>
                  <button
                    className={`${styles.step} ${active ? styles.stepActive : ''} ${currentStep === step && isPlaying ? styles.stepPlaying : ''} ${step % 4 === 0 ? styles.stepBeat : ''}`}
                    onClick={() => toggleStep(track.id, step)}
                  >
                    {track.type !== 'drums' && active && track.notes[step] !== null && (
                      <span className={styles.noteName}>
                        {NOTES.filter(n => !n.black)[track.notes[step]!]?.note}
                      </span>
                    )}
                    {track.type === 'drums' && step % 4 === 0 && (
                      <span className={styles.beatNum}>{(step / 4) + 1}</span>
                    )}
                  </button>
                  
                  {track.type !== 'drums' && active && (
                    <select 
                      className={styles.noteSelect}
                      value={track.notes[step] ?? 0}
                      onChange={(e) => updateNote(track.id, step, Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {NOTES.filter(n => !n.black).map((note, idx) => (
                        <option key={idx} value={idx}>{note.note}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.volumeControl}>
              <label>{track.volume}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={track.volume}
                onChange={(e) => updateTrack(track.id, { volume: Number(e.target.value) })}
                className={styles.volumeSlider}
              />
            </div>
          </div>
        ))}
      </div>

      {/* TRANSPORT CONTROLS */}
      <div className={styles.transport}>
        <div className={styles.transportLeft}>
          <button 
            className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button className={styles.transportBtn} onClick={() => setCurrentStep(0)}>
            ⏮ Reset
          </button>
          <button className={styles.transportBtn} onClick={clearAll}>
            Clear All
          </button>
          <button className={styles.transportBtn} onClick={downloadBeat}>
            💾 Download
          </button>
        </div>

        <div className={styles.transportRight}>
          <div className={styles.control}>
            <label>BPM: {bpm}</label>
            <input 
              type="range" 
              min="60" 
              max="180" 
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
            />
          </div>
          <div className={styles.control}>
            <label>Master: {masterVolume}</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={masterVolume}
              onChange={(e) => setMasterVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className={styles.info}>
        <p>
          💡 <strong>Pro Tip:</strong> Use keyboard to play notes (ASDF...), drum pads (1-8, QWERTY...), 
          then click sequencer steps to build your beat. Metronome keeps you in time!
        </p>
      </div>
    </div>
  );
};

export default TrubbleNBassBuilder;