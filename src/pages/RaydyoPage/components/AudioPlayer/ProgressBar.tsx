import React, { useRef, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  disabled = false,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newTime = (percentage / 100) * duration;
    
    onSeek(newTime);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    handleClick(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (hoverX / rect.width) * 100));
    const time = (percentage / 100) * duration;
    
    setHoverTime(time);

    if (isDragging && !disabled) {
      onSeek(time);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setIsDragging(false);
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="progress-bar-container">
      <div 
        className={`progress-bar ${disabled ? 'disabled' : ''} ${isDragging ? 'dragging' : ''}`}
        ref={progressRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-label="Audio progress"
      >
        {/* Progress Track */}
        <div className="progress-track">
          {/* Buffered Progress (placeholder for future implementation) */}
          <div className="progress-buffered" style={{ width: '0%' }} />
          
          {/* Current Progress */}
          <div 
            className="progress-current"
            style={{ width: `${progressPercentage}%` }}
          />
          
          {/* Progress Handle */}
          <div 
            className="progress-handle"
            style={{ left: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Hover Tooltip */}
        {hoverTime !== null && (
          <div 
            className="progress-tooltip"
            style={{ 
              left: `${Math.max(0, Math.min(100, (hoverTime / duration) * 100))}%` 
            }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>
      
      {/* Time Labels */}
      <div className="progress-times">
        <span className="time-current">{formatTime(currentTime)}</span>
        <span className="time-duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
};