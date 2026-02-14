// src/components/sandboxes/mini/AudioSnippetSandbox.tsx
// Mini-sandbox for creating 60-second audio snippets
// Programme: G-Tech Casters
// Constraint: 60 seconds max, basic editing only

import React, { useState, useRef, useEffect } from 'react';
import MiniSandboxBase, { ConstraintMeter, SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './AudioSnippetSandbox.css';

// ============================================
// PROMPTS
// ============================================

const AUDIO_PROMPTS: SandboxPrompt[] = [
  {
    id: 'audio-intro',
    title: 'Your 60-Second Intro',
    brief: 'Record a short introduction for a podcast or radio show. Who are you? What\'s your show about? Why should someone listen?',
    category: 'Voice Recording',
    hints: [
      'Start with energy - the first 5 seconds matter most',
      'Speak to ONE person, not "everyone out there"',
      'End with a hook or question'
    ],
    inspiration: 'Great intros like NPR\'s "This American Life" grab you immediately with a personal story or surprising fact, then pivot to what the episode explores. They\'re conversational, not announcer-y.'
  },
  {
    id: 'audio-story',
    title: 'One-Minute Story',
    brief: 'Tell a complete story in 60 seconds. It could be something that happened to you, a local legend, or a "what if" scenario. Beginning, middle, end.',
    category: 'Storytelling',
    hints: [
      'Start in the middle of the action',
      'One character, one problem, one resolution',
      'Use pauses for dramatic effect'
    ],
    inspiration: 'The "Story Corps" recordings prove that ordinary people telling ordinary stories can be deeply moving. Authenticity beats polish.'
  },
  {
    id: 'audio-soundscape',
    title: 'Wembley Soundscape',
    brief: 'Create a 60-second audio portrait of a place in Wembley using only sounds. No narration needed - let the sounds tell the story.',
    category: 'Sound Design',
    hints: [
      'Layer sounds from foreground and background',
      'Think about rhythm and pacing',
      'A soundscape can have a narrative arc too'
    ],
    inspiration: 'The BBC\'s "Sound Walks" create vivid sense of place through careful layering - footsteps, conversations fading in and out, environmental sounds that locate you instantly.'
  },
  {
    id: 'audio-review',
    title: 'Quick Take Review',
    brief: 'Review something in 60 seconds: a local restaurant, a product you bought, a film, a game. Give your honest take with specific details.',
    category: 'Commentary',
    hints: [
      'Lead with your verdict, then explain',
      'One specific detail is worth ten generalities',
      'Who would you recommend this to (or warn away)?'
    ],
    inspiration: 'Mark Kermode\'s film reviews work because they\'re opinionated but fair, specific but accessible. He assumes intelligence in his audience.'
  }
];

// ============================================
// TYPES
// ============================================

interface AudioClip {
  id: string;
  blob: Blob;
  duration: number;
  startTime: number; // position in timeline
  volume: number;
  label: string;
}

// ============================================
// COMPONENT
// ============================================

const AudioSnippetSandbox: React.FC = () => {
  // State
  const [currentPrompt] = useState<SandboxPrompt>(
    AUDIO_PROMPTS[Math.floor(Math.random() * AUDIO_PROMPTS.length)]
  );
  const [isRecording, setIsRecording] = useState(false);
  const [clips, setClips] = useState<AudioClip[]>([]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const constraints: SandboxConstraints = {
    maxDuration: 60,      // 60 seconds total
    timeLimit: 15,        // 15 minute session
  };

  // Calculate total duration of all clips
  useEffect(() => {
    const total = clips.reduce((sum, clip) => sum + clip.duration, 0);
    setCurrentDuration(total);
  }, [clips]);

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

  const startRecording = async () => {
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
        
        const newClip: AudioClip = {
          id: `clip-${Date.now()}`,
          blob,
          duration,
          startTime: currentDuration,
          volume: 1,
          label: `Recording ${clips.length + 1}`
        };
        
        setClips(prev => [...prev, newClip]);
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

  const deleteClip = (clipId: string) => {
    setClips(prev => prev.filter(c => c.id !== clipId));
  };

  const playAllClips = async () => {
    if (clips.length === 0) return;
    
    setIsPlaying(true);
    
    for (const clip of clips) {
      const audio = new Audio(URL.createObjectURL(clip.blob));
      audio.volume = clip.volume;
      
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.play();
      });
    }
    
    setIsPlaying(false);
  };

  const remainingTime = constraints.maxDuration! - currentDuration;
  const canRecord = remainingTime > 0;

  return (
    <MiniSandboxBase
      sandboxId="audio-snippet"
      sandboxName="60-Second Audio"
      sandboxEmoji="🎙️"
      programme="G-Tech Casters"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="audio-snippet-sandbox">
        {/* Duration Meter */}
        <div className="duration-display">
          <ConstraintMeter
            label="Total Duration"
            current={Math.round(currentDuration * 10) / 10}
            max={constraints.maxDuration!}
            unit="seconds"
            emoji="🎵"
          />
          <div className="remaining-time">
            {remainingTime > 0 ? (
              <span className="time-ok">⏱️ {remainingTime.toFixed(1)}s remaining</span>
            ) : (
              <span className="time-full">✅ Full 60 seconds used!</span>
            )}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="recording-section">
          <div className="recording-visual">
            {isRecording ? (
              <div className="recording-active">
                <div className="recording-pulse"></div>
                <span className="recording-time">{recordingTime.toFixed(1)}s</span>
              </div>
            ) : (
              <div className="recording-idle">
                <span className="mic-icon">🎤</span>
              </div>
            )}
          </div>
          
          <div className="recording-buttons">
            {!isRecording ? (
              <button 
                className="btn-record"
                onClick={startRecording}
                disabled={!canRecord}
              >
                {canRecord ? '⏺️ Start Recording' : '⏹️ Time Limit Reached'}
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
          
          {isRecording && (
            <div className="recording-hint">
              Recording... Click stop when done. Max remaining: {remainingTime.toFixed(1)}s
            </div>
          )}
        </div>

        {/* Clips Timeline */}
        <div className="clips-section">
          <h3>Your Clips ({clips.length})</h3>
          
          {clips.length === 0 ? (
            <div className="clips-empty">
              <p>No clips yet. Hit record to start!</p>
              <p className="hint">You can record multiple takes and they'll play in sequence.</p>
            </div>
          ) : (
            <div className="clips-list">
              {clips.map((clip, index) => (
                <div key={clip.id} className="clip-item">
                  <span className="clip-number">{index + 1}</span>
                  <div className="clip-info">
                    <span className="clip-label">{clip.label}</span>
                    <span className="clip-duration">{clip.duration.toFixed(1)}s</span>
                  </div>
                  <div className="clip-waveform">
                    {/* Simplified visual waveform */}
                    <div className="waveform-bar" style={{ width: `${(clip.duration / 60) * 100}%` }}></div>
                  </div>
                  <div className="clip-actions">
                    <button 
                      className="btn-play-clip"
                      onClick={() => {
                        const audio = new Audio(URL.createObjectURL(clip.blob));
                        audio.play();
                      }}
                    >
                      ▶️
                    </button>
                    <button 
                      className="btn-delete-clip"
                      onClick={() => deleteClip(clip.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Playback */}
        {clips.length > 0 && (
          <div className="playback-section">
            <button 
              className="btn-play-all"
              onClick={playAllClips}
              disabled={isPlaying}
            >
              {isPlaying ? '🔊 Playing...' : '▶️ Play Full Sequence'}
            </button>
          </div>
        )}

        {/* Tips Panel */}
        <div className="tips-panel">
          <h4>🎯 Quick Tips</h4>
          <ul>
            <li>60 seconds is longer than you think - don't rush</li>
            <li>Record multiple takes and keep the best</li>
            <li>Silence is powerful - pauses add drama</li>
            <li>Speak slightly slower than normal conversation</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default AudioSnippetSandbox;