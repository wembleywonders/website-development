import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import './VolumeControl.css';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const y = event.clientY - rect.top;
      const height = rect.height;
      const newVolume = Math.round((1 - y / height) * 100);
      onVolumeChange(Math.max(0, Math.min(100, newVolume)));
    }
  };

  return (
    <div 
      className={`volume-control ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Volume Icon Button */}
      <button 
        className="volume-btn"
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {getVolumeIcon()}
      </button>

      {/* Volume Slider */}
      <div className="volume-slider-container">
        <div 
          className="volume-slider"
          ref={sliderRef}
          onClick={handleSliderClick}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isMuted ? 0 : volume}
          aria-label="Volume"
        >
          {/* Volume Track */}
          <div className="volume-track">
            <div 
              className="volume-fill"
              style={{ height: `${isMuted ? 0 : volume}%` }}
            />
          </div>
          
          {/* Volume Handle */}
          <div 
            className="volume-handle"
            style={{ bottom: `${isMuted ? 0 : volume}%` }}
          />
        </div>
        
        {/* Volume Percentage */}
        <div className="volume-percentage">
          {isMuted ? 0 : volume}%
        </div>
      </div>
    </div>
  );
};