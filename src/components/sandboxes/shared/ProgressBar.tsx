import React from 'react';
import styles from './SandboxPlanner.module.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {labels && (
        <div className={styles.progressLabels}>
          {labels.map((label, idx) => (
            <span 
              key={idx}
              className={`${styles.progressLabel} ${idx + 1 <= currentStep ? styles.active : ''}`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;