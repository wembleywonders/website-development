// src/components/sandboxes/discovery/challenges/DrumLoopChallenge.tsx
// Trubble n Bass: Build a 4-bar drum loop
// Simple grid-based drum machine

import React, { useState, useCallback, useRef, useEffect } from 'react';
import './ChallengeBase.css';

interface DrumLoopChallengeProps {
  onComplete: (result: { completed: boolean; pattern?: boolean[][]; timeSpent: number }) => void;
  onSkip: () => void;
}

// 4 bars = 16 steps (4 beats per bar)
const STEPS = 16;
const INSTRUMENTS = [
  { id: 'kick', name: 'Kick', emoji: '🥁', color: '#ef4444' },
  { id: 'snare', name: 'Snare', emoji: '🪘', color: '#f59e0b' },
  { id: 'hihat', name: 'Hi-Hat', emoji: '🎵', color: '#10b981' },
  { id: 'clap', name: 'Clap', emoji: '👏', color: '#8b5cf6' }
];

const DrumLoopChallenge: React.FC<DrumLoopChallengeProps> = ({ onComplete, onSkip }) => {
  // Pattern state: [instrument][step]
  const [pattern, setPattern] = useState<boolean[][]>(
    INSTRUMENTS.map(() => Array(STEPS).fill(false))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [tempo, setTempo] = useState(120);
  const [startTime] = useState(Date.now());
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Count active hits
  const totalHits = pattern.flat().filter(Boolean).length;
  const hasKick = pattern[0].some(Boolean);
  const hasSnare = pattern[1].some(Boolean);

  // Initialize audio context
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggleCell = useCallback((instrument: number, step: number) => {
    setPattern(prev => {
      const newPattern = prev.map(row => [...row]);
      newPattern[instrument][step] = !newPattern[instrument][step];
      return newPattern;
    });
  }, []);

  const playSound = useCallback((instrumentId: string) => {
    // Simple oscillator-based sounds (real app would use samples)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    switch (instrumentId) {
      case 'kick':
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        break;
      case 'snare':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        break;
      case 'hihat':
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        break;
      case 'clap':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        break;
    }
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      setCurrentStep(-1);
    } else {
      setIsPlaying(true);
      let step = 0;
      const msPerStep = (60 / tempo / 4) * 1000;
      
      intervalRef.current = setInterval(() => {
        setCurrentStep(step);
        
        // Play sounds for this step
        INSTRUMENTS.forEach((inst, i) => {
          if (pattern[i][step]) {
            playSound(inst.id);
          }
        });
        
        step = (step + 1) % STEPS;
      }, msPerStep);
    }
  }, [isPlaying, tempo, pattern, playSound]);

  const clearPattern = useCallback(() => {
    setPattern(INSTRUMENTS.map(() => Array(STEPS).fill(false)));
  }, []);

  const loadPreset = useCallback((preset: 'basic' | 'hiphop' | 'house') => {
    let newPattern: boolean[][] = INSTRUMENTS.map(() => Array(STEPS).fill(false));
    
    switch (preset) {
      case 'basic':
        newPattern[0] = [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false];
        newPattern[1] = [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false];
        newPattern[2] = [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false];
        break;
      case 'hiphop':
        newPattern[0] = [true,false,false,false, false,false,true,false, true,false,false,false, false,false,false,false];
        newPattern[1] = [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,true];
        newPattern[2] = [true,true,true,true, true,true,true,true, true,true,true,true, true,true,true,true];
        break;
      case 'house':
        newPattern[0] = [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false];
        newPattern[1] = [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false];
        newPattern[2] = [false,false,true,false, false,false,true,false, false,false,true,false, false,false,true,false];
        newPattern[3] = [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false];
        break;
    }
    
    setPattern(newPattern);
  }, []);

  const handleSubmit = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
    
    onComplete({
      completed: true,
      pattern,
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [pattern, startTime, onComplete]);

  const canSubmit = totalHits >= 4 && hasKick;

  return (
    <div className="challenge-container drum-challenge">
      <div className="drum-header">
        <div className="tempo-control">
          <label>Tempo: {tempo} BPM</label>
          <input
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
          />
        </div>
        
        <div className="transport-controls">
          <button className="btn-play" onClick={togglePlay}>
            {isPlaying ? '⏹️ Stop' : '▶️ Play'}
          </button>
          <button className="btn-clear" onClick={clearPattern}>
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="presets">
        <span>Try a preset:</span>
        <button onClick={() => loadPreset('basic')}>Basic Rock</button>
        <button onClick={() => loadPreset('hiphop')}>Hip Hop</button>
        <button onClick={() => loadPreset('house')}>House</button>
      </div>

      <div className="drum-grid">
        {/* Bar markers */}
        <div className="bar-markers">
          <span></span>
          {[1, 2, 3, 4].map(bar => (
            <span key={bar} className="bar-marker">Bar {bar}</span>
          ))}
        </div>
        
        {INSTRUMENTS.map((inst, i) => (
          <div key={inst.id} className="drum-row">
            <div className="instrument-label">
              <span className="inst-emoji">{inst.emoji}</span>
              <span className="inst-name">{inst.name}</span>
            </div>
            <div className="step-cells">
              {Array(STEPS).fill(0).map((_, step) => (
                <button
                  key={step}
                  className={`step-cell ${pattern[i][step] ? 'active' : ''} ${currentStep === step ? 'playing' : ''} ${step % 4 === 0 ? 'bar-start' : ''}`}
                  style={{ '--inst-color': inst.color } as React.CSSProperties}
                  onClick={() => toggleCell(i, step)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pattern-stats">
        <span className={hasKick ? 'check' : 'missing'}>
          {hasKick ? '✅' : '⬜'} Kick drum
        </span>
        <span className={hasSnare ? 'check' : 'optional'}>
          {hasSnare ? '✅' : '💡'} Snare (optional)
        </span>
        <span>{totalHits} total hits</span>
      </div>

      <div className="tips-compact">
        <strong>Tips:</strong> Click cells to add beats. Kick on 1 and 3, snare on 2 and 4 
        is a classic starting point. Listen as you build!
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {canSubmit ? '✅ Submit Beat' : 'Add at least 4 hits with kick'}
        </button>
      </div>
    </div>
  );
};

export default DrumLoopChallenge;