import React from 'react';
import { 
  Play, Pause, Square, RotateCcw, RotateCw, 
  Volume2, VolumeX, Radio, Clock, Users 
} from 'lucide-react';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { ProgressBar } from './ProgressBar';
import { TimeDisplay } from './TimeDisplay';
import './EnhancedPlayer.css';

interface EnhancedPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLive: boolean;
  currentShow: string | null;
  error: string | null;
  currentProgram?: {
    id: string;
    title: string;
    host: string;
    artwork?: string;
    description?: string;
  };
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  rewind: (seconds?: number) => void;
  fastForward: (seconds?: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  goLive: () => void;
}

export const EnhancedPlayer: React.FC<EnhancedPlayerProps> = ({
  isPlaying,
  isLoading,
  currentTime,
  duration,
  volume,
  isMuted,
  isLive,
  currentShow,
  error,
  currentProgram,
  play,
  pause,
  stop,
  seek,
  rewind,
  fastForward,
  setVolume,
  toggleMute,
  goLive,
}) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="enhanced-player">
      {/* Error Display */}
      {error && (
        <div className="player-error">
          <span className="error-message">{error}</span>
          <button onClick={goLive} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Program Info */}
      <div className="program-info">
        <div className="program-artwork">
          {currentProgram?.artwork ? (
            <img 
              src={currentProgram.artwork} 
              alt={currentProgram.title}
              className="artwork-image"
            />
          ) : (
            <div className="artwork-placeholder">
              <Radio size={32} />
            </div>
          )}
          
          {/* Live Indicator */}
          {isLive && (
            <div className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </div>
          )}
        </div>
        
        <div className="program-details">
          <h3 className="program-title">
            {currentProgram?.title || currentShow || 'Rayd-yo Community Radio'}
          </h3>
          {currentProgram?.host && (
            <p className="program-host">with {currentProgram.host}</p>
          )}
          {isLive && (
            <div className="live-info">
              <Clock size={14} />
              <span>Broadcasting Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Controls */}
      <div className="player-controls">
        <div className="primary-controls">
          {/* Rewind (only for recorded content) */}
          {!isLive && (
            <button 
              className="control-btn rewind-btn"
              onClick={() => rewind(15)}
              aria-label="Rewind 15 seconds"
              disabled={isLoading}
            >
              <RotateCcw size={20} />
              <span className="control-label">15s</span>
            </button>
          )}

          {/* Play/Pause */}
          <button 
            className="control-btn play-pause-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>

          {/* Fast Forward (only for recorded content) */}
          {!isLive && (
            <button 
              className="control-btn forward-btn"
              onClick={() => fastForward(15)}
              aria-label="Fast forward 15 seconds"
              disabled={isLoading}
            >
              <RotateCw size={20} />
              <span className="control-label">15s</span>
            </button>
          )}

          {/* Stop */}
          <button 
            className="control-btn stop-btn"
            onClick={stop}
            aria-label="Stop"
            disabled={isLoading}
          >
            <Square size={20} />
          </button>

          {/* Go Live (only when playing recorded content) */}
          {!isLive && (
            <button 
              className="control-btn live-btn"
              onClick={goLive}
              aria-label="Go Live"
            >
              <Radio size={20} />
              <span className="control-label">Live</span>
            </button>
          )}
        </div>

        {/* Progress Bar (only for recorded content) */}
        {!isLive && (
          <ProgressBar 
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
            disabled={isLoading}
          />
        )}

        {/* Secondary Controls */}
        <div className="secondary-controls">
          {/* Volume Control */}
          <VolumeControl 
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onToggleMute={toggleMute}
          />

          {/* Time Display */}
          <TimeDisplay 
            currentTime={currentTime}
            duration={duration}
            isLive={isLive}
          />

          {/* Listener Count (placeholder for future implementation) */}
          <div className="listener-count">
            <Users size={16} />
            <span>24 listening</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn">
          Request Song
        </button>
        <button className="quick-action-btn">
          Join Chat
        </button>
        <button className="quick-action-btn">
          Schedule Reminder
        </button>
      </div>
    </div>
  );
};