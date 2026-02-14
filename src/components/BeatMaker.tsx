import React, { useState, useEffect, useRef, useCallback } from 'react';
import './BeatMaker.css';

interface BeatPattern {
  kick: boolean[];
  snare: boolean[];
  hihat: boolean[];
  bass: boolean[];
}

interface BeatMakerProps {
  onSave?: (pattern: BeatPattern, bpm: number) => void;
  showSaveButton?: boolean;
}

const PRESETS = {
  clear: {
    kick: [false, false, false, false, false, false, false, false],
    snare: [false, false, false, false, false, false, false, false],
    hihat: [false, false, false, false, false, false, false, false],
    bass: [false, false, false, false, false, false, false, false],
  },
  ukDrill: {
    kick: [true, false, false, true, false, false, true, false],
    snare: [false, false, true, false, false, false, true, false],
    hihat: [true, true, true, true, true, true, true, true],
    bass: [true, false, false, false, true, false, true, false],
  },
  afrobeat: {
    kick: [true, false, false, false, true, false, false, false],
    snare: [false, false, true, false, false, false, true, false],
    hihat: [true, false, true, false, true, false, true, false],
    bass: [true, false, false, true, false, false, true, false],
  },
  grime: {
    kick: [true, false, false, false, false, false, true, false],
    snare: [false, false, false, false, true, false, false, false],
    hihat: [true, true, false, true, true, false, true, true],
    bass: [true, false, true, false, false, false, true, false],
  },
};

const BeatMaker: React.FC<BeatMakerProps> = ({ onSave, showSaveButton = true }) => {
  const [pattern, setPattern] = useState<BeatPattern>(PRESETS.clear);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mayaEncouragement, setMayaEncouragement] = useState<string>('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play sound function (synthesized drums)
  const playSound = useCallback((instrument: keyof BeatPattern) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    switch (instrument) {
      case 'kick': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }
      case 'snare': {
        const noise = ctx.createBufferSource();
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noiseGain.gain.setValueAtTime(0.7, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        noise.start(now);
        noise.stop(now + 0.2);
        break;
      }
      case 'hihat': {
        const noise = ctx.createBufferSource();
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;
        
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 7000;
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        noise.start(now);
        noise.stop(now + 0.05);
        break;
      }
      case 'bass': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(55, now);
        
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }
    }
  }, []);

  // Toggle beat in pattern
  const toggleBeat = (instrument: keyof BeatPattern, step: number) => {
    setPattern(prev => ({
      ...prev,
      [instrument]: prev[instrument].map((val, i) => i === step ? !val : val)
    }));

    // Play sound on toggle for immediate feedback
    playSound(instrument);

    // Maya encouragement
    const totalBeats = Object.values(pattern).flat().filter(Boolean).length;
    if (totalBeats === 0) {
      setMayaEncouragement("Great start! Click squares to add beats.");
    } else if (totalBeats < 5) {
      setMayaEncouragement("Nice! Keep building your rhythm.");
    } else if (totalBeats < 10) {
      setMayaEncouragement("You're cooking! Try adding hi-hats.");
    } else {
      setMayaEncouragement("Fire! 🔥 Hit play to hear your beat.");
    }
  };

  // Play/pause functionality
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / bpm) * 1000 / 2; // 8 steps per bar
      
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % 8;
          
          // Play sounds for active beats at current step
          (Object.keys(pattern) as Array<keyof BeatPattern>).forEach(instrument => {
            if (pattern[instrument][nextStep]) {
              playSound(instrument);
            }
          });
          
          return nextStep;
        });
      }, stepDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentStep(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm, pattern, playSound]);

  // Load preset
  const loadPreset = (presetName: keyof typeof PRESETS) => {
    setPattern(PRESETS[presetName]);
    setIsPlaying(false);
    setMayaEncouragement(
      presetName === 'clear' 
        ? "Cleared! Start fresh."
        : `Loaded ${presetName === 'ukDrill' ? 'UK Drill' : presetName === 'afrobeat' ? 'Afrobeat' : 'Grime'} pattern! Hit play.`
    );
  };

  // Handle save
  const handleSave = () => {
    const totalBeats = Object.values(pattern).flat().filter(Boolean).length;
    if (totalBeats === 0) {
      setMayaEncouragement("Add some beats first before saving!");
      return;
    }
    
    if (onSave) {
      onSave(pattern, bpm);
    }
    setShowSaveModal(true);
  };

  return (
    <div className="beat-maker">
      <div className="beat-maker-header">
        <h3>Beat Maker</h3>
        {mayaEncouragement && (
          <div className="maya-encouragement">
            🤖 {mayaEncouragement}
          </div>
        )}
      </div>

      {/* Drum Grid */}
      <div className="drum-grid">
        {(Object.keys(pattern) as Array<keyof BeatPattern>).map(instrument => (
          <div key={instrument} className="drum-row">
            <div className="instrument-label">
              {instrument === 'kick' && '🥁'} 
              {instrument === 'snare' && '🎯'}
              {instrument === 'hihat' && '⚡'}
              {instrument === 'bass' && '🔊'}
              <span>{instrument.toUpperCase()}</span>
            </div>
            <div className="steps">
              {pattern[instrument].map((active, step) => (
                <button
                  key={step}
                  className={`step ${active ? 'active' : ''} ${currentStep === step && isPlaying ? 'playing' : ''}`}
                  onClick={() => toggleBeat(instrument, step)}
                  aria-label={`${instrument} step ${step + 1}`}
                >
                  {active ? '■' : '□'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="beat-maker-controls">
        <div className="playback-controls">
          <button 
            className={`control-btn ${isPlaying ? 'playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button 
            className="control-btn"
            onClick={() => loadPreset('clear')}
          >
            🗑 Clear
          </button>
          {showSaveButton && (
            <button 
              className="control-btn save-btn"
              onClick={handleSave}
            >
              💾 Save Beat
            </button>
          )}
        </div>

        <div className="bpm-control">
          <label htmlFor="bpm">BPM: {bpm}</label>
          <input
            id="bpm"
            type="range"
            min="60"
            max="180"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Presets */}
      <div className="presets">
        <span className="presets-label">Quick Start:</span>
        <button onClick={() => loadPreset('ukDrill')} className="preset-btn">
          UK Drill
        </button>
        <button onClick={() => loadPreset('afrobeat')} className="preset-btn">
          Afrobeat
        </button>
        <button onClick={() => loadPreset('grime')} className="preset-btn">
          Grime
        </button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="save-modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSaveModal(false)}>×</button>
            <h3>🔥 Fire Beat!</h3>
            <p>Sign up to:</p>
            <ul>
              <li>💾 Save unlimited beats</li>
              <li>📻 Get featured on Rayd-yo radio</li>
              <li>🤝 Collaborate with producers</li>
              <li>💰 Sell beats & keep 55%</li>
            </ul>
            <div className="modal-actions">
              <a href="/auth/signup?intent=creator" className="modal-btn primary">
                Sign Up Free
              </a>
              <button onClick={() => setShowSaveModal(false)} className="modal-btn secondary">
                Keep Creating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeatMaker;
