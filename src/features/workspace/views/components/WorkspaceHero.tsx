/**
 * WorkspaceHero - Hero section for workspace
 * @module features/workspace/views/components/WorkspaceHero
 */

import React from 'react';
import { 
  Plus, 
  RefreshCw, 
  Settings, 
  Clock,
  WifiOff,
  Wifi
} from 'lucide-react';
import styles from './WorkspaceHero.module.scss';
import type { 
  CreatorWorkspace, 
  WorkspaceResponse 
} from '../../types';

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
};

interface WorkspaceHeroProps {
  workspace: CreatorWorkspace;
  workspaceResponse?: WorkspaceResponse | null;
  user?: User | null;
  onCreateProject: () => void;
  onRefresh: () => void;
  onSettings: () => void;
  isOnline: boolean;
  isSyncing: boolean;
  pendingOperations: number;
}

const WorkspaceHero: React.FC<WorkspaceHeroProps> = ({
  workspace,
  workspaceResponse,
  user,
  onCreateProject,
  onRefresh,
  onSettings,
  isOnline,
  isSyncing,
  pendingOperations
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getJourneyStepLabel = () => {
    const steps: Record<string, string> = {
      'discover': 'Discovering',
      'learn': 'Learning',
      'create': 'Creating',
      'improve': 'Improving',
      'share': 'Sharing',
      'sell': 'Selling',
      'scale': 'Scaling'
    };
    return steps[workspace.currentJourneyStep] || workspace.currentJourneyStep;
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.greeting}>
          <h1>
            {getGreeting()}, {user?.name || 'Creator'}!
          </h1>
          <p className={styles.subtitle}>
            You're currently in the <strong>{getJourneyStepLabel()}</strong> stage
          </p>
        </div>

        <div className={styles.heroActions}>
          {/* Sync Status */}
          <div className={styles.syncStatus}>
            {isSyncing ? (
              <>
                <RefreshCw className={styles.syncIcon} size={16} />
                <span>Syncing...</span>
              </>
            ) : isOnline ? (
              <>
                <Wifi size={16} className={styles.onlineIcon} />
                <span>Online</span>
                {pendingOperations > 0 && (
                  <span className={styles.pendingBadge}>
                    {pendingOperations}
                  </span>
                )}
              </>
            ) : (
              <>
                <WifiOff size={16} className={styles.offlineIcon} />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <button 
            className={styles.iconButton}
            onClick={onRefresh}
            disabled={isSyncing}
            title="Refresh workspace"
          >
            <RefreshCw size={20} />
          </button>
          
          <button 
            className={styles.iconButton}
            onClick={onSettings}
            title="Workspace settings"
          >
            <Settings size={20} />
          </button>
          
          <button 
            className={styles.primaryButton}
            onClick={onCreateProject}
          >
            <Plus size={20} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Last Activity */}
      {workspaceResponse?.stats?.lastActivity && (
        <div className={styles.lastActivity}>
          <Clock size={14} />
          <span>
            Last activity: {new Date(workspaceResponse.stats.lastActivity).toRelativeTime()}
          </span>
        </div>
      )}
    </div>
  );
};

// Helper to format relative time
declare global {
  interface Date {
    toRelativeTime(): string;
  }
}

Date.prototype.toRelativeTime = function() {
  const seconds = Math.floor((new Date().getTime() - this.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
};

export default WorkspaceHero;
