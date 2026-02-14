/**
 * IterationTimeline Component
 * Wembley Wonders CIC
 * 
 * Displays prototype version history as a visual timeline.
 */

import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Tag, 
  RotateCcw, 
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  FileText,
  Plus,
  Minus,
  Edit
} from 'lucide-react';
import styles from './IterationTimeline.module.scss';

// ============================================================================
// TYPES
// ============================================================================

export interface IterationChange {
  field: string;
  type: 'add' | 'modify' | 'remove';
  description: string;
}

export interface Iteration {
  id: string;
  version: string;
  title: string;
  description: string;
  changes: IterationChange[];
  author: string;
  authorAvatar?: string;
  createdAt: string;
  status: 'draft' | 'active' | 'archived';
  tags: string[];
  isCurrent: boolean;
}

export interface IterationTimelineProps {
  prototypeId: string;
  iterations: Iteration[];
  currentVersion: string;
  onRollback?: (version: string) => void;
  onViewDetails?: (iterationId: string) => void;
  onCompare?: (version1: string, version2: string) => void;
  canRollback?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

const IterationTimeline: React.FC<IterationTimelineProps> = ({
  prototypeId,
  iterations,
  currentVersion,
  onRollback,
  onViewDetails,
  onCompare,
  canRollback = false
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const handleVersionSelect = (version: string) => {
    if (!compareMode) return;
    
    if (selectedVersions.includes(version)) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
    } else if (selectedVersions.length < 2) {
      const newSelected = [...selectedVersions, version];
      setSelectedVersions(newSelected);
      
      if (newSelected.length === 2 && onCompare) {
        onCompare(newSelected[0], newSelected[1]);
        setCompareMode(false);
        setSelectedVersions([]);
      }
    }
  };

  const getChangeIcon = (type: 'add' | 'modify' | 'remove') => {
    switch (type) {
      case 'add': return <Plus size={12} className={styles.addIcon} />;
      case 'modify': return <Edit size={12} className={styles.modifyIcon} />;
      case 'remove': return <Minus size={12} className={styles.removeIcon} />;
    }
  };

  const sortedIterations = [...iterations].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.timeline}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <GitBranch size={20} />
          <h3>Version History</h3>
          <span className={styles.currentVersion}>v{currentVersion}</span>
        </div>
        
        {onCompare && (
          <button 
            className={`${styles.compareBtn} ${compareMode ? styles.active : ''}`}
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedVersions([]);
            }}
          >
            {compareMode ? 'Cancel Compare' : 'Compare Versions'}
          </button>
        )}
      </div>

      {compareMode && (
        <div className={styles.compareHint}>
          Select two versions to compare
          {selectedVersions.length > 0 && (
            <span> ({selectedVersions.length}/2 selected)</span>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className={styles.timelineList}>
        {sortedIterations.map((iteration, index) => (
          <div 
            key={iteration.id} 
            className={`
              ${styles.timelineItem} 
              ${iteration.isCurrent ? styles.current : ''} 
              ${iteration.status === 'archived' ? styles.archived : ''}
              ${compareMode ? styles.selectable : ''}
              ${selectedVersions.includes(iteration.version) ? styles.selected : ''}
            `}
            onClick={() => handleVersionSelect(iteration.version)}
          >
            {/* Timeline Line */}
            <div className={styles.timelineLine}>
              <div className={styles.dot}>
                {iteration.isCurrent ? (
                  <div className={styles.currentDot} />
                ) : (
                  <GitCommit size={16} />
                )}
              </div>
              {index < sortedIterations.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>

            {/* Content */}
            <div className={styles.content}>
              {/* Main Row */}
              <div 
                className={styles.mainRow}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(iteration.id);
                }}
              >
                <div className={styles.versionInfo}>
                  <span className={styles.version}>v{iteration.version}</span>
                  {iteration.isCurrent && (
                    <span className={styles.currentBadge}>Current</span>
                  )}
                  {iteration.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={styles.meta}>
                  <span className={styles.time}>
                    {formatRelativeTime(iteration.createdAt)}
                  </span>
                  {expandedId === iteration.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </div>

              <h4 className={styles.title}>{iteration.title}</h4>

              <div className={styles.authorRow}>
                <div className={styles.author}>
                  {iteration.authorAvatar ? (
                    <img src={iteration.authorAvatar} alt={iteration.author} />
                  ) : (
                    <User size={14} />
                  )}
                  <span>{iteration.author}</span>
                </div>
                <span className={styles.date}>
                  <Calendar size={12} />
                  {formatDate(iteration.createdAt)}
                </span>
              </div>

              {/* Expanded Details */}
              {expandedId === iteration.id && (
                <div className={styles.details}>
                  {iteration.description && (
                    <p className={styles.description}>{iteration.description}</p>
                  )}

                  {iteration.changes.length > 0 && (
                    <div className={styles.changes}>
                      <h5>Changes</h5>
                      <ul>
                        {iteration.changes.map((change, i) => (
                          <li key={i} className={styles[change.type]}>
                            {getChangeIcon(change.type)}
                            <span className={styles.changeField}>{change.field}:</span>
                            <span className={styles.changeDesc}>{change.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.actions}>
                    {onViewDetails && (
                      <button 
                        className={styles.detailsBtn}
                        onClick={() => onViewDetails(iteration.id)}
                      >
                        <FileText size={14} />
                        View Full Details
                      </button>
                    )}
                    
                    {canRollback && !iteration.isCurrent && onRollback && (
                      <button 
                        className={styles.rollbackBtn}
                        onClick={() => onRollback(iteration.version)}
                      >
                        <RotateCcw size={14} />
                        Rollback to This Version
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {iterations.length === 0 && (
        <div className={styles.empty}>
          <GitCommit size={32} />
          <p>No version history yet</p>
        </div>
      )}
    </div>
  );
};

export default IterationTimeline;
