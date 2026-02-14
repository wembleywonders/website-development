/**
 * WorkspaceStats - Statistics display component for workspace
 * @module features/workspace/views/components/WorkspaceStats
 */

import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  Edit3, 
  Archive,
  Eye,
  Heart,
  TrendingUp,
  Clock
} from 'lucide-react';
import styles from './WorkspaceStats.module.scss';
import type { WorkspaceStats as WorkspaceStatsType } from '../../types';

interface WorkspaceStatsProps {
  stats: WorkspaceStatsType;
  className?: string;
}

const WorkspaceStats: React.FC<WorkspaceStatsProps> = ({ 
  stats, 
  className = '' 
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const calculateGrowth = (): number => {
    const total = stats.totalProjects || 0;
    const published = stats.publishedProjects || 0;
    return total > 0 ? Math.round((published / total) * 100) : 0;
  };

  return (
    <div className={`${styles.statsContainer} ${className}`}>
      <div className={styles.statsGrid}>
        {/* Total Projects */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.totalProjects)}
            </span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
        </div>

        {/* Published */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.publishedProjects)}
            </span>
            <span className={styles.statLabel}>Published</span>
          </div>
        </div>

        {/* Draft */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Edit3 size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.draftProjects)}
            </span>
            <span className={styles.statLabel}>Drafts</span>
          </div>
        </div>

        {/* In Review */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.inReviewProjects)}
            </span>
            <span className={styles.statLabel}>In Review</span>
          </div>
        </div>

        {/* Archived */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Archive size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.archivedProjects)}
            </span>
            <span className={styles.statLabel}>Archived</span>
          </div>
        </div>

        {/* Views */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Eye size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.totalViews)}
            </span>
            <span className={styles.statLabel}>Total Views</span>
          </div>
        </div>

        {/* Likes */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Heart size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {formatNumber(stats.totalLikes)}
            </span>
            <span className={styles.statLabel}>Total Likes</span>
          </div>
        </div>

        {/* Completion Rate */}
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>
              {calculateGrowth()}%
            </span>
            <span className={styles.statLabel}>Completion Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceStats;