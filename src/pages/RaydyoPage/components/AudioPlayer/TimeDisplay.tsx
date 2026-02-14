import React from 'react';
import { Clock, Radio } from 'lucide-react';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
  isLive: boolean;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  currentTime,
  duration,
  isLive,
}) => {
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

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (isLive) {
    return (
      <div className="time-display live">
        <Radio size={14} />
        <span className="live-label">LIVE</span>
        <Clock size={14} />
        <span className="current-time">{getCurrentTime()}</span>
      </div>
    );
  }

  return (
    <div className="time-display recorded">
      <span className="playback-time">
        {formatTime(currentTime)}
      </span>
      <span className="time-separator">/</span>
      <span className="total-time">
        {formatTime(duration)}
      </span>
    </div>
  );
};