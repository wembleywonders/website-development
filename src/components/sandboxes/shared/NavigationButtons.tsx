import React from 'react';
import styles from './SandboxPlanner.module.css';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  canProceed: boolean;
  backLabel?: string;
  nextLabel?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  canProceed,
  backLabel = '← Back',
  nextLabel = 'Next →'
}) => {
  return (
    <div className={styles.navigation}>
      {onBack && (
        <button 
          className={styles.backButton}
          onClick={onBack}
        >
          {backLabel}
        </button>
      )}
      <button 
        className={`${styles.nextButton} ${!canProceed ? styles.disabled : ''}`}
        onClick={onNext}
        disabled={!canProceed}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default NavigationButtons;