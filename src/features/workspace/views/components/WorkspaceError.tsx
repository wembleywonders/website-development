/**
 * WorkspaceError - Error display component for workspace
 * @module features/workspace/views/components/WorkspaceError
 */

import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './WorkspaceError.module.scss';

interface WorkspaceErrorProps {
  error: Error;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const WorkspaceError: React.FC<WorkspaceErrorProps> = ({
  error,
  onRetry,
  showHomeButton = true
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <AlertCircle className={styles.icon} size={64} />
        <h2>Something went wrong</h2>
        <p className={styles.message}>{error.message}</p>
        
        <div className={styles.actions}>
          {onRetry && (
            <button 
              className={styles.retryButton}
              onClick={onRetry}
            >
              <RefreshCw size={20} />
              Try Again
            </button>
          )}
          
          {showHomeButton && (
            <button 
              className={styles.homeButton}
              onClick={() => navigate('/')}
            >
              <Home size={20} />
              Go Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceError;
