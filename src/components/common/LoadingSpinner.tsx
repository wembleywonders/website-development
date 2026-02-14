/**
 * LoadingSpinner - Reusable loading indicator component
 * @module components/common/LoadingSpinner
 */

import React from 'react';
import { RefreshCw } from 'lucide-react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  const content = (
    <>
      <RefreshCw 
        className={`${styles.spinner} ${styles[size]}`}
        aria-hidden="true"
      />
      {message && <p className={styles.message}>{message}</p>}
    </>
  );

  if (fullScreen) {
    return (
      <div className={`${styles.fullScreen} ${className}`}>
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={`${styles.overlay} ${className}`}>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {content}
    </div>
  );
};

export default LoadingSpinner;
