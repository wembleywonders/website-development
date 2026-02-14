import React, { useEffect, useState } from 'react';
import { MayaAvatarProps, MayaExpression } from '../../../types/maya/avatar';
import './MayaAvatar.css';

const MayaAvatar: React.FC<MayaAvatarProps> = ({ 
  expression = 'neutral', 
  size = 'medium', 
  animated = true 
}) => {
  const [currentExpression, setCurrentExpression] = useState<MayaExpression>(expression);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (expression !== currentExpression && animated) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentExpression(expression);
        setIsTransitioning(false);
      }, 150);
    } else {
      setCurrentExpression(expression);
    }
  }, [expression, currentExpression, animated]);

  const getAvatarContent = () => {
    // Using CSS-based character representation until custom images are ready
    const expressions = {
      neutral: { face: '😊', color: '#8b5cf6' },
      thinking: { face: '🤔', color: '#3b82f6' },
      helpful: { face: '😄', color: '#10b981' },
      concerned: { face: '😐', color: '#f59e0b' },
      excited: { face: '🌟', color: '#ec4899' }
    };

    return expressions[currentExpression];
  };

  const avatarData = getAvatarContent();

  return (
    <div className={`maya-avatar ${size} ${isTransitioning ? 'transitioning' : ''}`}>
      <div 
        className="avatar-container"
        style={{ 
          '--avatar-color': avatarData.color,
          '--transition-duration': animated ? '0.3s' : '0s'
        } as React.CSSProperties}
      >
        <div className="avatar-background">
          <div className="avatar-face">
            {avatarData.face}
          </div>
        </div>
        <div className="avatar-glow"></div>
      </div>
    </div>
  );
};

export default MayaAvatar;
