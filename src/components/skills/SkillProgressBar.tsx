// src/components/skills/SkillProgressBar.tsx
import React from 'react';
import './SkillProgressBar.css';

interface SkillProgressBarProps {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number; // 0-100
  category: string;
  timeToNext?: string;
  isActive?: boolean;
  onSkillClick?: () => void;
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skillName,
  currentLevel,
  targetLevel,
  progress,
  category,
  timeToNext,
  isActive = false,
  onSkillClick
}) => {
  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#ff6b6b';
    if (progress < 70) return '#ffd93d';
    return '#6bcf7f';
  };

  const getLevelText = (level: number) => {
    const levels = ['Beginner', 'Developing', 'Competent', 'Proficient', 'Expert'];
    return levels[Math.min(level - 1, levels.length - 1)];
  };

  return (
    <div 
      className={`skill-progress-bar ${isActive ? 'active' : ''}`}
      onClick={onSkillClick}
    >
      <div className="skill-header">
        <div className="skill-info">
          <h4 className="skill-name">{skillName}</h4>
          <span className="skill-category">{category}</span>
        </div>
        <div className="skill-levels">
          <span className="current-level">
            Level {currentLevel} ({getLevelText(currentLevel)})
          </span>
          <span className="arrow">→</span>
          <span className="target-level">
            Level {targetLevel} ({getLevelText(targetLevel)})
          </span>
        </div>
      </div>
      
      <div className="progress-container">
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ 
              width: `${progress}%`,
              backgroundColor: getProgressColor(progress)
            }}
          />
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      
      {timeToNext && (
        <div className="time-estimate">
          <span>Estimated time to next level: {timeToNext}</span>
        </div>
      )}
      
      <div className="skill-actions">
        <button className="practice-btn">Practice</button>
        <button className="track-btn">Track Activity</button>
      </div>
    </div>
  );
};

export default SkillProgressBar;