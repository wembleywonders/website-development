import React, { useState, useRef } from 'react';
import { Play, Pause, Download, Mic, Music, Volume2, RefreshCw } from 'lucide-react';
import './PodcastIntroCreator.css';

interface Track {
  id: string;
  name: string;
  url: string;
  type: 'music' | 'voice';
}

const PodcastIntroCreator: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string>('');
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showName, setShowName] = useState('');
  const [hostName, setHostName] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const backgroundMusic = [
    { id: 'none', name: 'No Music', url: '' },
    { id: 'caribbean', name: 'Caribbean Steel Drums', url: '/audio/caribbean-drums.mp3' },
    { id: 'jazz', name: 'Smooth Jazz', url: '/audio/smooth-jazz.mp3' },
    { id: 'electronic', name: 'Electronic Beat', url: '/audio/electronic.mp3' },
    { id: 'acoustic', name: 'Acoustic Guitar', url: '/audio/acoustic.mp3' }
  ];

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
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playPreview = () => {
    if (!recordedAudio) return;
    
    const audio = new Audio(recordedAudio);
    audio.volume = voiceVolume / 100;
    audio.play();
    setIsPlaying(true);
    
    audio.onended = () => setIsPlaying(false);
  };

  const downloadIntro = () => {
    if (!recordedAudio) return;
    
    const link = document.createElement('a');
    link.href = recordedAudio;
    link.download = `${showName.replace(/\s+/g, '-')}-intro.wav`;
    link.click();
  };

  const resetAll = () => {
    setRecordedAudio(null);
    setSelectedMusic('');
    setVoiceVolume(80);
    setMusicVolume(30);
    setIsPlaying(false);
    setShowName('');
    setHostName('');
  };

  const generateScript = () => {
    if (!showName || !hostName) return "Fill in your show and host name above!";
    
    return `"Welcome to ${showName}, your source for Caribbean stories and culture. I'm ${hostName}, and today we're bringing you behind the scenes of our latest radio drama production. Stay tuned!"`;
  };

  return (
    <div className="podcast-intro-creator">
      <div className="creator-header">
        <h3>🎙️ Create Your Podcast Intro</h3>
        <p>Record your voice, add background music, and download your custom intro</p>
      </div>

      <div className="creator-grid">
        {/* Show Info */}
        <div className="creator-section">
          <h4>Show Information</h4>
          <div className="input-group">
            <label>Show Name</label>
            <input
              type="text"
              placeholder="e.g., Caribbean Stories"
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
              className="text-input"
            />
          </div>
          <div className="input-group">
            <label>Host Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="text-input"
            />
          </div>
          
          {showName && hostName && (
            <div className="script-suggestion">
              <strong>Suggested Script:</strong>
              <p>{generateScript()}</p>
            </div>
          )}
        </div>

        {/* Recording Section */}
        <div className="creator-section">
          <h4>Record Your Voice</h4>
          <div className="recording-controls">
            {!isRecording ? (
              <button 
                onClick={startRecording}
                className="record-button"
                disabled={!showName || !hostName}
              >
                <Mic size={24} />
                Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                className="record-button recording"
              >
                <Pause size={24} />
                Stop Recording
              </button>
            )}
          </div>
          
          {isRecording && (
            <div className="recording-indicator">
              <div className="pulse"></div>
              <span>Recording...</span>
            </div>
          )}
          
          {recordedAudio && !isRecording && (
            <div className="recording-success">
              ✓ Voice recorded! Add music and preview below.
            </div>
          )}
        </div>

        {/* Music Selection */}
        <div className="creator-section">
          <h4>Background Music (Optional)</h4>
          <select
            value={selectedMusic}
            onChange={(e) => setSelectedMusic(e.target.value)}
            className="music-select"
            disabled={!recordedAudio}
          >
            <option value="">Choose background music...</option>
            {backgroundMusic.map(music => (
              <option key={music.id} value={music.id}>
                {music.name}
              </option>
            ))}
          </select>
        </div>

        {/* Volume Controls */}
        {recordedAudio && (
          <div className="creator-section">
            <h4>Mix Your Audio</h4>
            <div className="volume-control">
              <label>
                <Volume2 size={16} />
                Voice Volume: {voiceVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(Number(e.target.value))}
                className="volume-slider"
              />
            </div>
            
            {selectedMusic && (
              <div className="volume-control">
                <label>
                  <Music size={16} />
                  Music Volume: {musicVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                  className="volume-slider"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {recordedAudio && (
        <div className="creator-actions">
          <button onClick={playPreview} className="action-button primary" disabled={isPlaying}>
            <Play size={20} />
            Preview Intro
          </button>
          <button onClick={downloadIntro} className="action-button secondary">
            <Download size={20} />
            Download Intro
          </button>
          <button onClick={resetAll} className="action-button tertiary">
            <RefreshCw size={20} />
            Start Over
          </button>
        </div>
      )}

      <div className="creator-tips">
        <strong>Pro Tips:</strong>
        <ul>
          <li>Speak clearly and confidently</li>
          <li>Keep intros under 15 seconds</li>
          <li>Record in a quiet space for best quality</li>
          <li>Preview and adjust volumes before downloading</li>
        </ul>
      </div>
    </div>
  );
};

export default PodcastIntroCreator;
