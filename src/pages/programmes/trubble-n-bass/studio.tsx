/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Trubble n Bass Studio - The Real Music-Making Instrument
 * 
 * A comprehensive music production tool for the community.
 * From the kid on the 183 bus to the next Jessye Norman.
 * 
 * "I started here."
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import {
  MayaCompanion,
  MayaWelcome,
  MayaEncouragement,
  MayaPush,
  useMayaStore,
  useMayaTracking,
} from '../../../maya';
import './studio.css';

// ============================================
// TYPES
// ============================================

type StudioMode = 'select' | 'studio' | 'quick' | 'soundboard';
type InstrumentType = 'drums' | 'keys' | 'bass';

interface DrumKit {
  id: string;
  name: string;
  icon: string;
  sounds: { [key: string]: string };
  description: string;
}

interface KeySound {
  id: string;
  name: string;
  icon: string;
  type: 'fm' | 'am' | 'synth';
  // Use a more flexible type to accommodate different synth options
  settings: Record<string, unknown>;
}

interface SequencerStep {
  active: boolean;
  velocity: number;
}

interface Project {
  id: string;
  name: string;
  bpm: number;
  sequence: { [padId: string]: SequencerStep[] };
  kit: string;
  keySound: string;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// ENVELOPE HELPER - Reusable envelope configs
// ============================================

const createEnvelope = (
  attack: number,
  decay: number,
  sustain: number,
  release: number
): Record<string, any> => ({
  attack,
  decay,
  sustain,
  release,
  attackCurve: 'linear',
  releaseCurve: 'exponential',
  decayCurve: 'exponential',
});

// ============================================
// SOUND DEFINITIONS
// ============================================

// Drum kit definitions with heritage sounds
const DRUM_KITS: DrumKit[] = [
  {
    id: 'caribbean-roots',
    name: 'Caribbean Roots',
    icon: '🌴',
    description: 'Steel pan, calypso percussion, island rhythms',
    sounds: {
      kick: 'C2', snare: 'D2', hihat: 'F#2', openhat: 'A#2',
      tom1: 'G2', tom2: 'A2', tom3: 'B2', crash: 'C#3',
      ride: 'D#3', clap: 'E2', rim: 'C#2', cowbell: 'G#2',
      shaker: 'D3', tambourine: 'F3', conga1: 'G3', conga2: 'A3'
    }
  },
  {
    id: 'gospel-church',
    name: 'Gospel & Church',
    icon: '⛪',
    description: 'Hammond grooves, tambourines, handclaps',
    sounds: {
      kick: 'C2', snare: 'D2', hihat: 'F#2', openhat: 'A#2',
      tom1: 'G2', tom2: 'A2', tom3: 'B2', crash: 'C#3',
      tambourine: 'F3', clap: 'E2', shaker: 'D3', rim: 'C#2',
      organ_stab: 'G3', choir_hit: 'A3', handclap2: 'B3', stomp: 'C3'
    }
  },
  {
    id: 'reggae-roots',
    name: 'Reggae Roots',
    icon: '🇯🇲',
    description: 'One-drop rhythms, dub sounds, nyabinghi',
    sounds: {
      kick: 'C2', snare: 'D2', hihat: 'F#2', openhat: 'A#2',
      rim: 'C#2', stick: 'D#2', tom1: 'G2', tom2: 'A2',
      shaker: 'D3', tambourine: 'F3', bongo1: 'G3', bongo2: 'A3',
      dub_siren: 'B3', spring: 'C3', echo_snare: 'E3', nyabinghi: 'F#3'
    }
  },
  {
    id: 'afrobeats',
    name: 'Afrobeats',
    icon: '🌍',
    description: 'Lagos rhythms, talking drum, highlife',
    sounds: {
      kick: 'C2', snare: 'D2', hihat: 'F#2', openhat: 'A#2',
      shekere: 'G2', talking_drum: 'A2', djembe1: 'B2', djembe2: 'C3',
      agogo: 'D3', clap: 'E2', log_drum: 'F3', udu: 'G3',
      shaker: 'A3', clave: 'B3', bell: 'C#3', rim: 'D#3'
    }
  },
  {
    id: 'uk-drill',
    name: 'UK Drill',
    icon: '🔥',
    description: '808s, sliding bass, dark energy',
    sounds: {
      kick: 'C2', snare: 'D2', hihat: 'F#2', openhat: 'A#2',
      '808_1': 'G2', '808_2': 'A2', clap: 'E2', rim: 'C#2',
      perc1: 'B2', perc2: 'C3', vox: 'D3', fx1: 'E3',
      slide: 'F3', glide: 'G3', dark_pad: 'A3', riser: 'B3'
    }
  },
  {
    id: 'comedy-sfx',
    name: 'Comedy & Theatre',
    icon: '🎭',
    description: 'Rimshots, sad trombones, dramatic stings',
    sounds: {
      rimshot: 'C2', sad_trombone: 'D2', applause: 'E2', crickets: 'F2',
      record_scratch: 'G2', boing: 'A2', slide_whistle: 'B2', honk: 'C3',
      dramatic_sting: 'D3', victory: 'E3', fail: 'F3', suspense: 'G3',
      doorbell: 'A3', phone: 'B3', thunder: 'C4', footsteps: 'D4'
    }
  }
];

// Keyboard sound presets (FM synthesis for DX7 feel)
// FIX: Using Record<string, unknown> for settings to avoid TS2322 with complex Tone.js types
const KEY_SOUNDS: KeySound[] = [
  {
    id: 'dx7-epiano',
    name: 'DX7 E.Piano',
    icon: '🎹',
    type: 'fm',
    settings: {
      harmonicity: 3.01,
      modulationIndex: 14,
      envelope: createEnvelope(0.01, 0.5, 0.2, 0.8),
      modulationEnvelope: createEnvelope(0.01, 0.3, 0.2, 0.5)
    }
  },
  {
    id: 'hammond-organ',
    name: 'Hammond Organ',
    icon: '⛪',
    type: 'am',
    settings: {
      harmonicity: 2,
      envelope: createEnvelope(0.01, 0.1, 0.9, 0.3),
      modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
        attackCurve: 'linear',
        releaseCurve: 'exponential',
        decayCurve: 'linear',
      }
    }
  },
  {
    id: 'steel-pan',
    name: 'Steel Pan',
    icon: '🥁',
    type: 'fm',
    settings: {
      harmonicity: 5.07,
      modulationIndex: 20,
      envelope: createEnvelope(0.001, 0.8, 0, 0.5),
      modulationEnvelope: createEnvelope(0.001, 0.4, 0, 0.3)
    }
  },
  {
    id: 'synth-bass',
    name: 'Synth Bass',
    icon: '🔊',
    type: 'synth',
    settings: {
      // FIX: Simplified oscillator type - Tone.js will handle the conversion
      oscillator: { type: 'sawtooth' },
      envelope: createEnvelope(0.01, 0.2, 0.5, 0.3)
    }
  },
  {
    id: 'gospel-piano',
    name: 'Gospel Piano',
    icon: '🙏',
    type: 'fm',
    settings: {
      harmonicity: 2,
      modulationIndex: 8,
      envelope: createEnvelope(0.005, 0.4, 0.3, 1.2),
      modulationEnvelope: createEnvelope(0.01, 0.5, 0.3, 0.8)
    }
  },
  {
    id: 'bossa-keys',
    name: 'Bossa Keys',
    icon: '🎷',
    type: 'fm',
    settings: {
      harmonicity: 2.5,
      modulationIndex: 10,
      envelope: createEnvelope(0.01, 0.6, 0.15, 1),
      modulationEnvelope: createEnvelope(0.02, 0.4, 0.1, 0.6)
    }
  }
];

// Scale definitions for Scale Lock feature
const SCALES: { [key: string]: number[] } = {
  'major': [0, 2, 4, 5, 7, 9, 11],
  'minor': [0, 2, 3, 5, 7, 8, 10],
  'pentatonic': [0, 2, 4, 7, 9],
  'blues': [0, 3, 5, 6, 7, 10],
  'dorian': [0, 2, 3, 5, 7, 9, 10],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10]
};

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// ============================================
// MAIN COMPONENT
// ============================================

const TrubbleNBassStudio: React.FC = () => {
  // Mode & UI State
  const [mode, setMode] = useState<StudioMode>('select');
  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>('drums');
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [showMayaHelp, setShowMayaHelp] = useState(false);
  
  // Drum Machine State
  const [selectedKit, setSelectedKit] = useState<string>('caribbean-roots');
  const [activePads, setActivePads] = useState<Set<string>>(new Set());
  
  // Keyboard State
  const [selectedKeySound, setSelectedKeySound] = useState<string>('dx7-epiano');
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [octave, setOctave] = useState<number>(4);
  const [scaleLock, setScaleLock] = useState<boolean>(true);
  const [selectedScale, setSelectedScale] = useState<string>('pentatonic');
  const [rootNote, setRootNote] = useState<number>(0); // C
  
  // Pitch Bend State
  const [pitchBend, setPitchBend] = useState<number>(0);
  const pitchBendRef = useRef<number>(0);
  
  // Sequencer State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(90);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [sequence, setSequence] = useState<{ [padId: string]: SequencerStep[] }>({});
  
  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  
  // Project State
  const [projectName, setProjectName] = useState<string>('Untitled');
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);
  
  // Audio References
  const drumSynthRef = useRef<Tone.MembraneSynth | null>(null);
  const noiseSynthRef = useRef<Tone.NoiseSynth | null>(null);
  const metalSynthRef = useRef<Tone.MetalSynth | null>(null);
  const keySynthRef = useRef<Tone.FMSynth | Tone.AMSynth | Tone.Synth | null>(null);
  const sequencerRef = useRef<Tone.Sequence | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  
  // Maya tracking
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);
  
  // ============================================
  // AUDIO INITIALIZATION
  // ============================================
  
  const initAudio = useCallback(async () => {
    if (isAudioStarted) return;
    
    await Tone.start();
    
    // Create effects chain
    reverbRef.current = new Tone.Reverb({ decay: 2, wet: 0.3 }).toDestination();
    delayRef.current = new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.3, wet: 0.2 }).connect(reverbRef.current);
    
    // Create drum synths
    drumSynthRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
    }).connect(delayRef.current);
    
    noiseSynthRef.current = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
    }).connect(delayRef.current);
    
    metalSynthRef.current = new Tone.MetalSynth({
      envelope: { attack: 0.001, decay: 0.1, release: 0.1 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).connect(delayRef.current);
    
    // Create key synth (default to FM for DX7 sound)
    updateKeySynth('dx7-epiano');
    
    // Set transport BPM
    Tone.Transport.bpm.value = bpm;
    
    setIsAudioStarted(true);
  }, [isAudioStarted, bpm]);
  
  const updateKeySynth = useCallback((soundId: string) => {
    const sound = KEY_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;
    
    // Dispose old synth
    if (keySynthRef.current) {
      keySynthRef.current.dispose();
    }
    
    // Create new synth based on type
    // FIX: Cast settings to appropriate Tone.js options type
    if (sound.type === 'fm') {
      keySynthRef.current = new Tone.FMSynth(sound.settings as Partial<Tone.FMSynthOptions>);
    } else if (sound.type === 'am') {
      keySynthRef.current = new Tone.AMSynth(sound.settings as Partial<Tone.AMSynthOptions>);
    } else {
      keySynthRef.current = new Tone.Synth(sound.settings as Partial<Tone.SynthOptions>);
    }
    
    if (reverbRef.current) {
      keySynthRef.current.connect(reverbRef.current);
    } else {
      keySynthRef.current.toDestination();
    }
  }, []);
  
  // ============================================
  // DRUM PAD HANDLERS
  // ============================================
  
  const triggerDrum = useCallback((padId: string, velocity: number = 0.8) => {
    if (!isAudioStarted) return;
    
    const kit = DRUM_KITS.find(k => k.id === selectedKit);
    if (!kit) return;
    
    const note = kit.sounds[padId];
    if (!note) return;
    
    // Different synth for different drum types
    const now = Tone.now();
    
    if (padId.includes('kick') || padId.includes('808') || padId.includes('tom')) {
      drumSynthRef.current?.triggerAttackRelease(note, '8n', now, velocity);
    } else if (padId.includes('hat') || padId.includes('shaker') || padId.includes('tambourine')) {
      metalSynthRef.current?.triggerAttackRelease('16n', now, velocity);
    } else {
      noiseSynthRef.current?.triggerAttackRelease('16n', now, velocity);
    }
    
    // Visual feedback
    setActivePads(prev => new Set(prev).add(padId));
    setTimeout(() => {
      setActivePads(prev => {
        const next = new Set(prev);
        next.delete(padId);
        return next;
      });
    }, 100);
    
    // Record if recording
    if (isRecording) {
      recordStep(padId);
    }
    
    trackAction('tool_use');
  }, [isAudioStarted, selectedKit, isRecording, trackAction]);
  
  // ============================================
  // KEYBOARD HANDLERS
  // ============================================
  
  const getNoteInScale = useCallback((noteIndex: number): string | null => {
    if (!scaleLock) {
      return NOTE_NAMES[noteIndex % 12] + Math.floor(noteIndex / 12 + octave);
    }
    
    const scale = SCALES[selectedScale];
    const scaleIndex = noteIndex % scale.length;
    const octaveOffset = Math.floor(noteIndex / scale.length);
    const semitone = (rootNote + scale[scaleIndex]) % 12;
    const noteOctave = octave + octaveOffset + Math.floor((rootNote + scale[scaleIndex]) / 12);
    
    return NOTE_NAMES[semitone] + noteOctave;
  }, [scaleLock, selectedScale, rootNote, octave]);
  
  const triggerKey = useCallback((keyIndex: number) => {
    if (!isAudioStarted || !keySynthRef.current) return;
    
    const note = getNoteInScale(keyIndex);
    if (!note) return;
    
    // Apply pitch bend
    const bendAmount = pitchBendRef.current * 2; // +/- 2 semitones
    const freq = Tone.Frequency(note).toFrequency();
    const bentFreq = freq * Math.pow(2, bendAmount / 12);
    
    keySynthRef.current.triggerAttack(bentFreq, Tone.now());
    
    setActiveKeys(prev => new Set(prev).add(keyIndex.toString()));
    trackAction('tool_use');
  }, [isAudioStarted, getNoteInScale, trackAction]);
  
  const releaseKey = useCallback((keyIndex: number) => {
    if (!keySynthRef.current) return;
    
    keySynthRef.current.triggerRelease(Tone.now());
    
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.delete(keyIndex.toString());
      return next;
    });
  }, []);
  
  // ============================================
  // PITCH BEND HANDLER
  // ============================================
  
  const handlePitchBend = useCallback((value: number) => {
    setPitchBend(value);
    pitchBendRef.current = value;
  }, []);
  
  // ============================================
  // SEQUENCER HANDLERS
  // ============================================
  
  const initSequence = useCallback(() => {
    const kit = DRUM_KITS.find(k => k.id === selectedKit);
    if (!kit) return;
    
    const newSequence: { [padId: string]: SequencerStep[] } = {};
    Object.keys(kit.sounds).forEach(padId => {
      newSequence[padId] = Array(16).fill(null).map(() => ({ active: false, velocity: 0.8 }));
    });
    setSequence(newSequence);
  }, [selectedKit]);
  
  const toggleStep = useCallback((padId: string, stepIndex: number) => {
    setSequence(prev => {
      const newSeq = { ...prev };
      if (!newSeq[padId]) {
        newSeq[padId] = Array(16).fill(null).map(() => ({ active: false, velocity: 0.8 }));
      }
      newSeq[padId] = [...newSeq[padId]];
      newSeq[padId][stepIndex] = {
        ...newSeq[padId][stepIndex],
        active: !newSeq[padId][stepIndex].active
      };
      return newSeq;
    });
  }, []);
  
  const recordStep = useCallback((padId: string) => {
    if (!isPlaying) return;
    toggleStep(padId, currentStep);
  }, [isPlaying, currentStep, toggleStep]);
  
  const startSequencer = useCallback(() => {
    if (!isAudioStarted) return;
    
    // Dispose old sequence
    if (sequencerRef.current) {
      sequencerRef.current.dispose();
    }
    
    const steps = Array.from({ length: 16 }, (_, i) => i);
    
    sequencerRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        
        // Trigger drums for active steps
        Object.entries(sequence).forEach(([padId, padSequence]) => {
          if (padSequence[step]?.active) {
            triggerDrum(padId, padSequence[step].velocity);
          }
        });
      },
      steps,
      '16n'
    );
    
    sequencerRef.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  }, [isAudioStarted, sequence, triggerDrum]);
  
  const stopSequencer = useCallback(() => {
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    
    if (sequencerRef.current) {
      sequencerRef.current.stop();
    }
    
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);
  
  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopSequencer();
    } else {
      startSequencer();
    }
  }, [isPlaying, startSequencer, stopSequencer]);
  
  // ============================================
  // PROJECT HANDLERS
  // ============================================
  
  const saveProject = useCallback(() => {
    const project: Project = {
      id: Date.now().toString(),
      name: projectName,
      bpm,
      sequence,
      kit: selectedKit,
      keySound: selectedKeySound,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const projects = JSON.parse(localStorage.getItem('tnb_projects') || '[]');
    projects.push(project);
    localStorage.setItem('tnb_projects', JSON.stringify(projects));
    
    setSavedProjects(projects);
    trackProjectNamed();
  }, [projectName, bpm, sequence, selectedKit, selectedKeySound, trackProjectNamed]);
  
  const loadProject = useCallback((project: Project) => {
    setProjectName(project.name);
    setBpm(project.bpm);
    setSequence(project.sequence);
    setSelectedKit(project.kit);
    setSelectedKeySound(project.keySound);
    updateKeySynth(project.keySound);
    Tone.Transport.bpm.value = project.bpm;
  }, [updateKeySynth]);
  
  // ============================================
  // EXPORT HANDLER
  // ============================================
  
  const exportAudio = useCallback(async () => {
    if (!isAudioStarted) return;
    
    // Create offline context for rendering
    const duration = (60 / bpm) * 4; // 4 bars
    
    const recorder = new Tone.Recorder();
    
    // Connect synths to recorder
    drumSynthRef.current?.connect(recorder);
    noiseSynthRef.current?.connect(recorder);
    metalSynthRef.current?.connect(recorder);
    
    // Start recording
    recorder.start();
    
    // Play sequence
    startSequencer();
    
    // Stop after duration
    setTimeout(async () => {
      stopSequencer();
      const recording = await recorder.stop();
      
      // Create download link
      const url = URL.createObjectURL(recording);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Reconnect synths to destination
      drumSynthRef.current?.disconnect();
      noiseSynthRef.current?.disconnect();
      metalSynthRef.current?.disconnect();
      
      if (reverbRef.current) {
        drumSynthRef.current?.connect(reverbRef.current);
        noiseSynthRef.current?.connect(reverbRef.current);
        metalSynthRef.current?.connect(reverbRef.current);
      }
    }, duration * 1000 * 4);
  }, [isAudioStarted, bpm, projectName, startSequencer, stopSequencer]);
  
  // ============================================
  // EFFECTS
  // ============================================
  
  useEffect(() => {
    startSession();
    initSequence();
    
    // Load saved projects
    const projects = JSON.parse(localStorage.getItem('tnb_projects') || '[]');
    setSavedProjects(projects);
  }, [startSession, initSequence]);
  
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
  
  useEffect(() => {
    if (isAudioStarted) {
      updateKeySynth(selectedKeySound);
    }
  }, [selectedKeySound, isAudioStarted, updateKeySynth]);
  
  useEffect(() => {
    initSequence();
  }, [selectedKit, initSequence]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAudioStarted) return;
      
      // Computer keyboard to piano keys mapping
      const keyMap: { [key: string]: number } = {
        'a': 0, 'w': 1, 's': 2, 'e': 3, 'd': 4,
        'f': 5, 't': 6, 'g': 7, 'y': 8, 'h': 9,
        'u': 10, 'j': 11, 'k': 12, 'o': 13, 'l': 14
      };
      
      if (keyMap[e.key.toLowerCase()] !== undefined) {
        triggerKey(keyMap[e.key.toLowerCase()]);
      }
      
      // Space for play/pause
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: number } = {
        'a': 0, 'w': 1, 's': 2, 'e': 3, 'd': 4,
        'f': 5, 't': 6, 'g': 7, 'y': 8, 'h': 9,
        'u': 10, 'j': 11, 'k': 12, 'o': 13, 'l': 14
      };
      
      if (keyMap[e.key.toLowerCase()] !== undefined) {
        releaseKey(keyMap[e.key.toLowerCase()]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isAudioStarted, triggerKey, releaseKey, togglePlayback]);
  
  // ============================================
  // RENDER HELPERS
  // ============================================
  
  const getCurrentKit = () => DRUM_KITS.find(k => k.id === selectedKit);
  
  const renderWhiteKey = (index: number, keyIndex: number) => {
    const note = getNoteInScale(keyIndex);
    return (
      <button
        key={`white-${index}`}
        className={`studio-key white-key ${activeKeys.has(keyIndex.toString()) ? 'active' : ''}`}
        onMouseDown={() => triggerKey(keyIndex)}
        onMouseUp={() => releaseKey(keyIndex)}
        onMouseLeave={() => releaseKey(keyIndex)}
        onTouchStart={(e) => { e.preventDefault(); triggerKey(keyIndex); }}
        onTouchEnd={() => releaseKey(keyIndex)}
      >
        <span className="key-note">{note}</span>
      </button>
    );
  };
  
  // ============================================
  // MAIN RENDER
  // ============================================
  
  // Mode Selection Screen
  if (mode === 'select') {
    return (
      <div className="studio-container mode-select">
        <MayaCompanion />
        
        <header className="studio-header">
          <h1>🎵 Trubble n Bass Studio</h1>
          <p className="studio-tagline">Your sound. Your heritage. Your future.</p>
        </header>
        
        <div className="maya-welcome-container">
          <MayaWelcome />
        </div>
        
        <section className="mode-selection">
          <h2>What brings you here today?</h2>
          
          <div className="mode-cards">
            <button 
              className="mode-card"
              onClick={async () => {
                await initAudio();
                setMode('studio');
              }}
            >
              <span className="mode-icon">🎹</span>
              <h3>Open Studio</h3>
              <p>Full instruments, sequencer, create freely</p>
            </button>
            
            <button 
              className="mode-card"
              onClick={async () => {
                await initAudio();
                setMode('quick');
              }}
            >
              <span className="mode-icon">⚡</span>
              <h3>Quick Create</h3>
              <p>Need something fast? Templates and presets</p>
            </button>
            
            <button 
              className="mode-card"
              onClick={async () => {
                await initAudio();
                setSelectedKit('comedy-sfx');
                setMode('soundboard');
              }}
            >
              <span className="mode-icon">🎭</span>
              <h3>Soundboard</h3>
              <p>Instant triggers for performance</p>
            </button>
            
            <button 
              className="mode-card"
              onClick={() => setShowMayaHelp(true)}
            >
              <span className="mode-icon">✨</span>
              <h3>Help Me Start</h3>
              <p>Not sure? Let Maya guide you</p>
            </button>
          </div>
        </section>
        
        {savedProjects.length > 0 && (
          <section className="saved-projects">
            <h3>Continue Working On</h3>
            <div className="project-list">
              {savedProjects.slice(-3).map(project => (
                <button
                  key={project.id}
                  className="project-card"
                  onClick={async () => {
                    await initAudio();
                    loadProject(project);
                    setMode('studio');
                  }}
                >
                  <span className="project-name">{project.name}</span>
                  <span className="project-date">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
        
        {showMayaHelp && (
          <div className="maya-help-modal">
            <div className="maya-help-content">
              <button className="close-btn" onClick={() => setShowMayaHelp(false)}>×</button>
              <MayaPush custom="Let's figure out where to start. What sounds most like you right now?" />
              
              <div className="help-options">
                <button onClick={async () => {
                  await initAudio();
                  setMode('studio');
                  setSelectedKit('uk-drill');
                  setShowMayaHelp(false);
                }}>
                  🔥 I want to make beats
                </button>
                <button onClick={async () => {
                  await initAudio();
                  setMode('studio');
                  setSelectedKeySound('dx7-epiano');
                  setActiveInstrument('keys');
                  setShowMayaHelp(false);
                }}>
                  🎹 I want to play keys
                </button>
                <button onClick={async () => {
                  await initAudio();
                  setSelectedKit('comedy-sfx');
                  setMode('soundboard');
                  setShowMayaHelp(false);
                }}>
                  🎭 I need sound effects
                </button>
                <button onClick={async () => {
                  await initAudio();
                  setSelectedKit('caribbean-roots');
                  setMode('studio');
                  setShowMayaHelp(false);
                }}>
                  🌴 Show me Caribbean sounds
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Main Studio View
  return (
    <div className="studio-container studio-mode">
      <MayaCompanion />
      
      {/* Header Bar */}
      <header className="studio-topbar">
        <button className="back-btn" onClick={() => setMode('select')}>
          ← Back
        </button>
        
        <div className="project-info">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="project-name-input"
            placeholder="Project name..."
          />
        </div>
        
        <div className="transport-controls">
          <button 
            className={`transport-btn ${isRecording ? 'recording' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            ⏺
          </button>
          <button 
            className={`transport-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlayback}
          >
            {isPlaying ? '⏹' : '▶'}
          </button>
          <div className="bpm-control">
            <label>BPM</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value) || 90)}
              min={60}
              max={200}
            />
          </div>
        </div>
        
        <div className="studio-actions">
          <button className="action-btn" onClick={saveProject}>Save</button>
          <button className="action-btn" onClick={exportAudio}>Export</button>
        </div>
      </header>
      
      {/* Instrument Tabs */}
      <nav className="instrument-tabs">
        <button 
          className={`tab ${activeInstrument === 'drums' ? 'active' : ''}`}
          onClick={() => setActiveInstrument('drums')}
        >
          🥁 Drums
        </button>
        <button 
          className={`tab ${activeInstrument === 'keys' ? 'active' : ''}`}
          onClick={() => setActiveInstrument('keys')}
        >
          🎹 Keys
        </button>
      </nav>
      
      <main className="studio-main">
        {/* Kit/Sound Selector */}
        <aside className="sound-selector">
          {activeInstrument === 'drums' ? (
            <>
              <h3>Drum Kits</h3>
              <div className="kit-list">
                {DRUM_KITS.map(kit => (
                  <button
                    key={kit.id}
                    className={`kit-btn ${selectedKit === kit.id ? 'selected' : ''}`}
                    onClick={() => setSelectedKit(kit.id)}
                  >
                    <span className="kit-icon">{kit.icon}</span>
                    <span className="kit-name">{kit.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3>Keyboard Sounds</h3>
              <div className="sound-list">
                {KEY_SOUNDS.map(sound => (
                  <button
                    key={sound.id}
                    className={`sound-btn ${selectedKeySound === sound.id ? 'selected' : ''}`}
                    onClick={() => setSelectedKeySound(sound.id)}
                  >
                    <span className="sound-icon">{sound.icon}</span>
                    <span className="sound-name">{sound.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="scale-lock-panel">
                <label className="scale-lock-toggle">
                  <input
                    type="checkbox"
                    checked={scaleLock}
                    onChange={(e) => setScaleLock(e.target.checked)}
                  />
                  <span>Scale Lock</span>
                </label>
                
                {scaleLock && (
                  <>
                    <select
                      value={selectedScale}
                      onChange={(e) => setSelectedScale(e.target.value)}
                    >
                      <option value="pentatonic">Pentatonic</option>
                      <option value="major">Major</option>
                      <option value="minor">Minor</option>
                      <option value="blues">Blues</option>
                      <option value="dorian">Dorian</option>
                      <option value="mixolydian">Mixolydian</option>
                    </select>
                    
                    <select
                      value={rootNote}
                      onChange={(e) => setRootNote(parseInt(e.target.value))}
                    >
                      {NOTE_NAMES.map((name, i) => (
                        <option key={name} value={i}>{name}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              
              <div className="octave-control">
                <label>Octave: {octave}</label>
                <div className="octave-btns">
                  <button onClick={() => setOctave(Math.max(1, octave - 1))}>−</button>
                  <button onClick={() => setOctave(Math.min(7, octave + 1))}>+</button>
                </div>
              </div>
            </>
          )}
        </aside>
        
        {/* Main Instrument Area */}
        <section className="instrument-area">
          {activeInstrument === 'drums' ? (
            <div className="drum-machine">
              <div className="drum-pads">
                {getCurrentKit() && Object.keys(getCurrentKit()!.sounds).map((padId, index) => (
                  <button
                    key={padId}
                    className={`drum-pad ${activePads.has(padId) ? 'active' : ''}`}
                    onMouseDown={() => triggerDrum(padId)}
                    onTouchStart={(e) => { e.preventDefault(); triggerDrum(padId); }}
                  >
                    <span className="pad-label">{padId.replace(/_/g, ' ')}</span>
                    <span className="pad-number">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="keyboard-area">
              {/* Pitch Bend Wheel */}
              <div className="pitch-bend-container">
                <label>Pitch</label>
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.01}
                  value={pitchBend}
                  onChange={(e) => handlePitchBend(parseFloat(e.target.value))}
                  onMouseUp={() => handlePitchBend(0)}
                  onTouchEnd={() => handlePitchBend(0)}
                  className="pitch-bend-wheel"
                />
              </div>
              
              {/* Keyboard */}
              <div className="keyboard">
                {Array.from({ length: 15 }).map((_, i) => renderWhiteKey(i, i))}
              </div>
            </div>
          )}
        </section>
        
        {/* Sequencer */}
        <section className="sequencer-area">
          <h3>Step Sequencer</h3>
          <div className="step-indicator">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className={`step-light ${currentStep === i ? 'current' : ''}`}
              />
            ))}
          </div>
          
          <div className="sequencer-grid">
            {getCurrentKit() && Object.keys(getCurrentKit()!.sounds).slice(0, 8).map(padId => (
              <div key={padId} className="sequencer-row">
                <span className="row-label">{padId.replace(/_/g, ' ').slice(0, 8)}</span>
                <div className="step-buttons">
                  {Array.from({ length: 16 }).map((_, stepIndex) => (
                    <button
                      key={stepIndex}
                      className={`step-btn 
                        ${sequence[padId]?.[stepIndex]?.active ? 'active' : ''} 
                        ${currentStep === stepIndex ? 'current' : ''}
                        ${stepIndex % 4 === 0 ? 'bar-start' : ''}
                      `}
                      onClick={() => toggleStep(padId, stepIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Maya Context Help */}
      <div className="maya-studio-help">
        <MayaEncouragement custom="You're making music. Real music. Keep going." />
      </div>
    </div>
  );
};

export default TrubbleNBassStudio;