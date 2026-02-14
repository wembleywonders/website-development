/**
 * ActivityFeed - Activity feed component
 * @module features/activity/components/ActivityFeed
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity,
  FileText,
  CheckCircle,
  Edit3,
  Users,
  MessageSquare,
  Archive,
  Upload,
  RefreshCw
} from 'lucide-react';
import styles from './ActivityFeed.module.scss';

type Actor = {
  id: string;
  name: string;
  avatar?: string | undefined;
};

type Target = {
  type: string;
  id: string;
  name?: string;
};

type ActivityItem = {
  id: string;
  type: string;
  actor: Actor;
  action: string;
  target?: Target;
  timestamp: Date;
  read?: boolean;
  workspaceId?: string;
};

interface ActivityFeedProps {
  workspaceId: string;
  projectId?: string;
  compact?: boolean;
  maxItems?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  workspaceId,
  projectId,
  compact = false,
  maxItems = 20
}) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - would be replaced with actual API call
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'project_created',
        actor: { id: '1', name: 'You', avatar: undefined },
        action: 'created',
        target: { type: 'project', id: '1', name: 'New Website Design' },
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        workspaceId
      },
      {
        id: '2',
        type: 'task_completed',
        actor: { id: '1', name: 'You', avatar: undefined },
        action: 'completed',
        target: { type: 'task', id: '2', name: 'Setup project structure' },
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true,
        workspaceId
      },
      {
        id: '3',
        type: 'comment_added',
        actor: { id: '2', name: 'Team Member', avatar: undefined },
        action: 'commented on',
        target: { type: 'project', id: '1', name: 'New Website Design' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: true,
        workspaceId
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 500);
  }, [workspaceId, projectId]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_created': return <FileText size={16} />;
      case 'project_updated': return <Edit3 size={16} />;
      case 'task_completed': return <CheckCircle size={16} />;
      case 'comment_added': return <MessageSquare size={16} />;
      case 'member_joined': return <Users size={16} />;
      case 'file_uploaded': return <Upload size={16} />;
      case 'project_archived': return <Archive size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`${styles.activityFeed} ${compact ? styles.compact : ''}`}>
        <div className={styles.header}>
          <Activity size={20} />
          <h3>Activity</h3>
        </div>
        <div className={styles.loading}>
          <RefreshCw className={styles.spinner} size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.activityFeed} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <Activity size={20} />
        <h3>Activity</h3>
        <button className={styles.refreshButton}>
          <RefreshCw size={16} />
        </button>
      </div>

      <div className={styles.activities}>
        {activities.length === 0 ? (
          <div className={styles.empty}>
            <p>No recent activity</p>
          </div>
        ) : (
          activities.slice(0, maxItems).map(activity => (
            <div 
              key={activity.id}
              className={`${styles.activityItem} ${!activity.read ? styles.unread : ''}`}
            >
              <div className={styles.icon}>
                {getActivityIcon(activity.type)}
              </div>
              <div className={styles.content}>
                <div className={styles.text}>
                  <span className={styles.actor}>{activity.actor.name}</span>
                  {' '}
                  <span className={styles.action}>{activity.action}</span>
                  {' '}
                  {activity.target && (
                    <span className={styles.target}>{activity.target.name}</span>
                  )}
                </div>
                <div className={styles.time}>
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > maxItems && (
        <button className={styles.viewAll}>
          View all activity
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;
