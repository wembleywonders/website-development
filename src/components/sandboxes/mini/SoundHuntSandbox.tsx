// src/components/sandboxes/mini/SoundHuntSandbox.tsx
// Mini-sandbox: Record 5 environmental sounds, arrange into a story
// Programme: G-Tech Casters
// Constraint: 5 sounds, 30 seconds total, no words

import React, { useState, useRef, useCallback, useEffect } from 'react';
import MiniSandboxBase, { ConstraintMeter, SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './SoundHuntSandbox.css';

// ============================================
// PROMPTS
// ============================================

const SOUND_PROMPTS: SandboxPrompt[] = [
  {
    id: 'sound-morning',
    title: 'Morning Routine',
    brief: 'Capture 5 sounds that tell the story of your morning - from waking up to leaving the house. No voices needed, just sounds.',
    category: 'Daily Life',
    hints: [
      'Alarm, kettle, toast, door, footsteps?',
      'Order matters - it\'s a timeline',
      'Some sounds can overlap in your final mix'
    ],
    inspiration: 'Radio dramas created entire worlds with sound alone. The BBC Radiophonic Workshop proved that footsteps on gravel sound completely different from footsteps on carpet - and both tell a story.'
  },
  {
    id: 'sound-weather',
    title: 'Weather Changes',
    brief: 'Tell a story of weather changing through 5 sounds. Start calm, build to storm, end with aftermath. Pure audio narrative.',
    category: 'Environment',
    hints: [
      'Wind, rain, thunder - but also leaves, windows, shelter sounds',
      'Volume and intensity build the drama',
      'The silence after a storm is a sound too'
    ],
    inspiration: 'Film sound designers know that real thunder doesn\'t sound "real" on screen - they layer multiple sounds. Your 5 sounds can feel bigger than they are.'
  },
  {
    id: 'sound-kitchen',
    title: 'Kitchen Symphony',
    brief: 'The kitchen is full of percussion. Record 5 sounds and arrange them into a rhythmic piece. Cooking as music.',
    category: 'Creative',
    hints: [
      'Chopping, sizzling, water, clanking, timer',
      'Think about rhythm - some sounds repeat naturally',
      'Fast sounds vs slow sounds create contrast'
    ],
    inspiration: 'Stomp made a career from everyday sounds as music. A pot lid is a cymbal, a knife on a board is percussion.'
  },
  {
    id: 'sound-journey',
    title: 'The Commute',
    brief: 'Capture a journey through 5 sounds. We should know where you started and where you ended up, without any words.',
    category: 'Urban',
    hints: [
      'Door closing, transport sounds, announcements (background), arrival',
      'Each sound should move us forward in space',
      'Traffic sounds different on different streets'
    ],
    inspiration: 'Field recordists capture "place" through sound. You can tell the difference between a Wembley street and a countryside lane in 3 seconds of audio.'
  }
];

// ============================================
// TYPES
// ============================================

interface Sound {
  id: string;
  blob: Blob;
  duration: number;
  label: string;
  recordedAt: Date;
}

// ============================================
// COMPONENT
// ============================================

const SoundHuntSandbox: React.FC = () => {
  const [currentPrompt] = useState<SandboxPrompt>(
    SOUND_PROMPTS[Math.floor(Math.random() * SOUND_PROMPTS.length)]
  );
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentLabel, setCurrentLabel] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrangement, setArrangement] = useState<string[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const constraints: SandboxConstraints = {
    maxItems: 5,
    maxDuration: 30,
    timeLimit: 20,
  };

  const totalDuration = sounds.reduce((sum, s) => sum + s.duration, 0);
  const canRecordMore = sounds.length < 5 && totalDuration < 30;

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 0.1);
      }, 100);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  // Initialize arrangement when sounds change
  useEffect(() => {
    setArrangement(sounds.map(s => s.id));
  }, [sounds]);

  const startRecording = async () => {
    if (!currentLabel.trim()) {
      alert('Give this sound a label first! e.g., "Kettle boiling" or "Door closing"');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const duration = recordingTime;
        
        const newSound: Sound = {
          id: `sound-${Date.now()}`,
          blob,
          duration,
          label: currentLabel,
          recordedAt: new Date()
        };
        
        setSounds(prev => [...prev, newSound]);
        setCurrentLabel('');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteSound = (soundId: string) => {
    setSounds(prev => prev.filter(s => s.id !== soundId));
  };

  const moveSound = (soundId: string, direction: 'up' | 'down') => {
    setArrangement(prev => {
      const index = prev.indexOf(soundId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  const playArrangement = async () => {
    if (arrangement.length === 0) return;
    
    setIsPlaying(true);
    
    for (const soundId of arrangement) {
      const sound = sounds.find(s => s.id === soundId);
      if (sound) {
        const audio = new Audio(URL.createObjectURL(sound.blob));
        await new Promise<void>((resolve) => {
          audio.onended = () => resolve();
          audio.play();
        });
        // Small gap between sounds
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setIsPlaying(false);
  };

  const getSoundById = (id: string) => sounds.find(s => s.id === id);

  return (
    <MiniSandboxBase
      sandboxId="sound-hunt"
      sandboxName="5-Sound Story"
      sandboxEmoji="👂"
      programme="G-Tech Casters"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="sound-hunt-sandbox">
        {/* Constraints Display */}
        <div className="sound-constraints">
          <ConstraintMeter
            label="Sounds Captured"
            current={sounds.length}
            max={5}
            unit="sounds"
            emoji="🎵"
          />
          <ConstraintMeter
            label="Total Duration"
            current={Math.round(totalDuration * 10) / 10}
            max={30}
            unit="seconds"
            emoji="⏱️"
          />
        </div>

        {/* Recording Section */}
        <div className="recording-section">
          {canRecordMore ? (
            <>
              <div className="label-input">
                <label>What sound will you capture?</label>
                <input
                  type="text"
                  value={currentLabel}
                  onChange={(e) => setCurrentLabel(e.target.value)}
                  placeholder="e.g., 'Door closing', 'Kettle boiling'"
                  disabled={isRecording}
                />
              </div>

              <div className="recording-visual">
                {isRecording ? (
                  <div className="recording-active">
                    <div className="sound-wave">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <span className="recording-time">{recordingTime.toFixed(1)}s</span>
                    <span className="recording-label">Recording: {currentLabel}</span>
                  </div>
                ) : (
                  <div className="recording-ready">
                    <span className="mic-icon">🎤</span>
                    <span className="ready-text">Ready to capture sound {sounds.length + 1} of 5</span>
                  </div>
                )}
              </div>

              <div className="recording-controls">
                {!isRecording ? (
                  <button 
                    className="btn-record"
                    onClick={startRecording}
                    disabled={!currentLabel.trim()}
                  >
                    ⏺️ Start Recording
                  </button>
                ) : (
                  <button 
                    className="btn-stop"
                    onClick={stopRecording}
                  >
                    ⏹️ Stop Recording
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="recording-complete">
              <span className="complete-icon">✅</span>
              <span className="complete-text">
                {sounds.length >= 5 ? 'All 5 sounds captured!' : 'Reached 30 second limit'}
              </span>
            </div>
          )}
        </div>

        {/* Arrangement Section */}
        {sounds.length > 0 && (
          <div className="arrangement-section">
            <div className="arrangement-header">
              <h3>🎬 Your Sound Story</h3>
              <span className="arrangement-hint">Drag to reorder, or use arrows</span>
            </div>

            <div className="sounds-timeline">
              {arrangement.map((soundId, index) => {
                const sound = getSoundById(soundId);
                if (!sound) return null;
                
                return (
                  <div key={soundId} className="sound-item">
                    <span className="sound-order">{index + 1}</span>
                    
                    <div className="sound-info">
                      <span className="sound-label">{sound.label}</span>
                      <span className="sound-duration">{sound.duration.toFixed(1)}s</span>
                    </div>

                    <div className="sound-waveform">
                      <div 
                        className="waveform-fill"
                        style={{ width: `${(sound.duration / 30) * 100}%` }}
                      />
                    </div>

                    <div className="sound-actions">
                      <button
                        onClick={() => {
                          const audio = new Audio(URL.createObjectURL(sound.blob));
                          audio.play();
                        }}
                      >
                        ▶️
                      </button>
                      <button
                        onClick={() => moveSound(soundId, 'up')}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSound(soundId, 'down')}
                        disabled={index === arrangement.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteSound(soundId)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              className="btn-play-all"
              onClick={playArrangement}
              disabled={isPlaying || sounds.length === 0}
            >
              {isPlaying ? '🔊 Playing Story...' : '▶️ Play Full Sound Story'}
            </button>
          </div>
        )}

        {/* Story Check */}
        {sounds.length >= 3 && (
          <div className="story-check">
            <h4>📖 Does Your Sound Story Work?</h4>
            <ul>
              <li>Can someone guess the setting without being told?</li>
              <li>Is there a sense of time passing or movement?</li>
              <li>Does the order feel like it tells a story?</li>
              <li>Would you know what's happening with eyes closed?</li>
            </ul>
          </div>
        )}

        {/* Tips Panel */}
        <div className="tips-panel">
          <h4>🎯 Sound Story Tips</h4>
          <ul>
            <li><strong>Get close</strong> - Sounds recorded up close have more detail</li>
            <li><strong>Avoid wind</strong> - Wind noise ruins outdoor recordings</li>
            <li><strong>Silence speaks</strong> - Quiet moments are part of the story</li>
            <li><strong>Be patient</strong> - Wait for the right moment to capture</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default SoundHuntSandbox;