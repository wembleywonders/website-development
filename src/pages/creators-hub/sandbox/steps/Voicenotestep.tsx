import React, { useState, useRef } from 'react';
import '../ActivityShared.css';

interface VoiceNoteStepProps {
  journalEntry?: string;
  onComplete: (audioUrl: string) => void;
}

const VoiceNoteStep: React.FC<VoiceNoteStepProps> = ({ journalEntry, onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Stop after permission check
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) { // 2 minute max
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setHasPermission(false);
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

  const handleContinue = () => {
    if (audioUrl) {
      onComplete(audioUrl);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>🎙️ Record Your Voice Note</h2>
        <p className="activity-subtitle">
          Share your story verbally. Tell us about what you created and what it means to you.
        </p>
      </div>

      {journalEntry && (
        <div className="context-box">
          <h3>Your Journal Reflection</h3>
          <p className="journal-preview">
            {journalEntry.substring(0, 200)}
            {journalEntry.length > 200 && '...'}
          </p>
          <p className="helper-text">Now share your thoughts out loud.</p>
        </div>
      )}

      <div className="voice-section">
        <div className="recording-prompts">
          <h3>Talk about:</h3>
          <ul className="prompts-list">
            <li>What you created and why it matters</li>
            <li>The inspiration behind your work</li>
            <li>What you learned during the process</li>
            <li>How this connects to your journey</li>
            <li>What you're proud of</li>
          </ul>
        </div>

        {hasPermission === null && (
          <div className="permission-request">
            <p>We need access to your microphone to record audio.</p>
            <button className="btn-primary" onClick={requestMicPermission}>
              Enable Microphone
            </button>
          </div>
        )}

        {hasPermission === false && (
          <div className="permission-denied">
            <p>⚠️ Microphone access denied. Please enable it in your browser settings.</p>
            <button className="btn-secondary" onClick={requestMicPermission}>
              Try Again
            </button>
          </div>
        )}

        {hasPermission && (
          <div className="recording-controls">
            {!audioUrl ? (
              <>
                <div className="recording-status">
                  {isRecording ? (
                    <div className="recording-active">
                      <span className="recording-indicator">🔴 Recording</span>
                      <span className="recording-time">{formatTime(recordingTime)}</span>
                      <span className="time-limit">/ 2:00 max</span>
                    </div>
                  ) : (
                    <p>Ready to record. Press start when you're ready.</p>
                  )}
                </div>

                {!isRecording ? (
                  <button className="btn-primary btn-large" onClick={startRecording}>
                    🎙️ Start Recording
                  </button>
                ) : (
                  <button className="btn-danger btn-large" onClick={stopRecording}>
                    ⏹️ Stop Recording
                  </button>
                )}

                <p className="helper-text">
                  Take a moment to gather your thoughts, then hit record!
                </p>
              </>
            ) : (
              <div className="playback-section">
                <h3>✅ Recording Complete!</h3>
                <audio controls src={audioUrl} className="audio-player">
                  Your browser doesn't support audio playback.
                </audio>
                <div className="playback-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      setAudioUrl(null);
                      setRecordingTime(0);
                    }}
                  >
                    🔄 Record Again
                  </button>
                  <button className="btn-primary" onClick={handleContinue}>
                    Continue to Gallery →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="tips-section">
        <h4>🎯 Tips for a great voice note:</h4>
        <ul>
          <li>Find a quiet space</li>
          <li>Speak clearly and at a normal pace</li>
          <li>Be yourself - authentic voice matters</li>
          <li>Don't worry about perfection - it's about sharing</li>
          <li>1-2 minutes is ideal</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceNoteStep;
