import React, { useState, useRef, useEffect } from 'react';
import { useSandbox } from '../../contexts/SandboxContext';
import './ActivityShared.css';

interface VoiceNoteActivityProps {
  onClose: () => void;
}

const VoiceNoteActivity: React.FC<VoiceNoteActivityProps> = ({ onClose }) => {
  const { updateProgress, addAchievement } = useSandbox();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [step, setStep] = useState<'intro' | 'recording' | 'playback' | 'complete'>('intro');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_RECORDING_TIME = 60; // 1 minute for free users

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setStep('playback');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStep('recording');
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleComplete = () => {
    updateProgress('voice-note', 100);
    addAchievement('First Voice Note');
    setStep('complete');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="activity-page">
      <div className="activity-container">
        {/* Header */}
        <div className="activity-header-bar">
          <button className="back-btn" onClick={onClose}>
            ← Back to Sandbox
          </button>
          <h1 className="activity-page-title">🎙️ Record Your Voice</h1>
          <div className="spacer"></div>
        </div>

        {/* Intro Step */}
        {step === 'intro' && (
          <div className="activity-content">
            <div className="intro-section">
              <div className="intro-icon">🎙️</div>
              <h2>Share Your Story</h2>
              <p className="intro-text">
                Your voice matters. Record a voice note (up to 1 minute) and hear yourself back.
                This is how many of our podcasts and audio stories begin.
              </p>

              <div className="prompt-box">
                <h3>Try one of these prompts:</h3>
                <ul className="prompt-list">
                  <li>"What brought me to Wonderful Wembley today..."</li>
                  <li>"One thing I want to create is..."</li>
                  <li>"A skill I have that I could teach others..."</li>
                  <li>"Something I'm curious about..."</li>
                </ul>
              </div>

              <div className="info-note">
                <strong>Note:</strong> Free users get 1 minute. Members can record unlimited audio.
              </div>

              <button 
                className="activity-btn-large primary"
                onClick={startRecording}
              >
                🎙️ Start Recording
              </button>
            </div>
          </div>
        )}

        {/* Recording Step */}
        {step === 'recording' && (
          <div className="activity-content">
            <div className="recording-section">
              <div className="recording-animation">
                <div className={`pulse-ring ${isRecording ? 'active' : ''}`}></div>
                <div className="recording-icon">🔴</div>
              </div>

              <h2>Recording...</h2>
              
              <div className="timer">
                <span className="time-display">{formatTime(recordingTime)}</span>
                <span className="time-limit"> / {formatTime(MAX_RECORDING_TIME)}</span>
              </div>

              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(recordingTime / MAX_RECORDING_TIME) * 100}%` }}
                ></div>
              </div>

              <p className="recording-hint">
                Speak naturally. You can always re-record if you're not happy with it.
              </p>

              <button 
                className="activity-btn-large secondary"
                onClick={stopRecording}
              >
                ⏹️ Stop Recording
              </button>
            </div>
          </div>
        )}

        {/* Playback Step */}
        {step === 'playback' && audioURL && (
          <div className="activity-content">
            <div className="playback-section">
              <div className="success-icon">✓</div>
              <h2>Recording Complete!</h2>
              <p>Listen to your voice note:</p>

              <div className="audio-player">
                <audio controls src={audioURL} className="audio-element">
                  Your browser does not support audio playback.
                </audio>
              </div>

              <div className="playback-stats">
                <div className="stat">
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">{formatTime(recordingTime)}</span>
                </div>
              </div>

              <div className="playback-actions">
                <button 
                  className="activity-btn secondary"
                  onClick={() => {
                    setStep('intro');
                    setAudioURL(null);
                    setRecordingTime(0);
                  }}
                >
                  🔄 Record Again
                </button>
                <button 
                  className="activity-btn primary"
                  onClick={handleComplete}
                >
                  ✓ Complete Activity
                </button>
              </div>

              <div className="upgrade-hint">
                <p>
                  <strong>Members</strong> can save recordings, share them with the community, 
                  and turn them into podcast episodes on Rayd-yo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === 'complete' && (
          <div className="activity-content">
            <div className="complete-section">
              <div className="achievement-animation">
                <div className="achievement-icon">🏆</div>
                <div className="sparkles">✨</div>
              </div>

              <h2>Achievement Unlocked!</h2>
              <p className="achievement-name">First Voice Note</p>

              <div className="completion-message">
                <p>
                  You've taken the first step. Your voice is part of the community now.
                  This is exactly how our Rayd-yo podcasts and audio stories begin.
                </p>
              </div>

              <div className="next-steps">
                <h3>What's next?</h3>
                <div className="suggestion-cards">
                  <div className="suggestion-card">
                    <span className="suggestion-icon">📖</span>
                    <span className="suggestion-text">Try writing a journal entry</span>
                  </div>
                  <div className="suggestion-card">
                    <span className="suggestion-icon">🧪</span>
                    <span className="suggestion-text">Complete a mini lab project</span>
                  </div>
                  <div className="suggestion-card">
                    <span className="suggestion-icon">🌱</span>
                    <span className="suggestion-text">Become a member for unlimited recording</span>
                  </div>
                </div>
              </div>

              <button 
                className="activity-btn-large primary"
                onClick={onClose}
              >
                ← Back to Sandbox
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNoteActivity;
