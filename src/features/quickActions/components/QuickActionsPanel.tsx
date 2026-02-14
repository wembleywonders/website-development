/**
 * QuickActionsPanel - Quick actions display component
 * @module features/quickActions/components/QuickActionsPanel
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Bot, 
  ChevronRight, 
  ChevronDown,
  RefreshCw,
  Settings,
  CheckCircle,
  X
} from 'lucide-react';
import styles from './QuickActionsPanel.module.scss';

export type MayaPersonality = 'mentor' | 'coach' | 'assistant' | 'strategist' | 'creative' | 'analyst';

export interface QuickAction {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  estimatedTime?: number;
  points?: number;
}

interface QuickActionsPanelProps {
  actions: QuickAction[];
  workspaceId: string;
  projectId?: string;
  mayaPersonality: MayaPersonality;
  onPersonalityChange: (personality: MayaPersonality) => void;
  generating?: boolean;
  compact?: boolean;
  maxVisible?: number;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  actions,
  workspaceId,
  projectId,
  mayaPersonality,
  onPersonalityChange,
  generating = false,
  compact = false,
  maxVisible = 4
}) => {
  const [expanded, setExpanded] = useState(false);
  const [completingActions, setCompletingActions] = useState<Set<string>>(new Set());

  const visibleActions = expanded ? actions : actions.slice(0, maxVisible);

  const handleComplete = async (actionId: string) => {
    setCompletingActions(prev => new Set(prev).add(actionId));
    // Implementation would call store action
    setTimeout(() => {
      setCompletingActions(prev => {
        const next = new Set(prev);
        next.delete(actionId);
        return next;
      });
    }, 1000);
  };

  const handleDismiss = async (actionId: string) => {
    // Implementation would call store action
    console.log('Dismissing action:', actionId);
  };

  const getPersonalityIcon = () => {
    switch (mayaPersonality) {
      case 'mentor': return '🎓';
      case 'coach': return '💪';
      case 'assistant': return '🤝';
      case 'strategist': return '🎯';
      case 'creative': return '🎨';
      case 'analyst': return '📊';
      default: return '🤖';
    }
  };

  const getActionCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      task: '#667eea',
      learn: '#48bb78',
      create: '#ed8936',
      review: '#f56565',
      collaborate: '#4299e1',
      optimize: '#9f7aea'
    };
    return colors[category ?? ''] || '#718096';
  };

  if (actions.length === 0 && !generating) {
    return null;
  }

  return (
    <div className={`${styles.quickActionsPanel} ${compact ? styles.compact : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          <Zap size={20} />
          <h3>Quick Actions</h3>
          <span className={styles.badge}>{actions.length}</span>
        </div>

        <div className={styles.controls}>
          {/* Maya Personality Selector */}
          <div className={styles.personalitySelector}>
            <span className={styles.personalityIcon}>
              {getPersonalityIcon()}
            </span>
            <select
              value={mayaPersonality}
              onChange={(e) => onPersonalityChange(e.target.value as MayaPersonality)}
              className={styles.personalitySelect}
            >
              <option value="mentor">Mentor</option>
              <option value="coach">Coach</option>
              <option value="assistant">Assistant</option>
              <option value="strategist">Strategist</option>
              <option value="creative">Creative</option>
              <option value="analyst">Analyst</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button 
            className={styles.refreshButton}
            title="Generate new actions"
            disabled={generating}
          >
            <RefreshCw size={16} className={generating ? styles.spinning : ''} />
          </button>

          {/* Settings */}
          <button className={styles.settingsButton} title="Quick actions settings">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Actions List */}
      <div className={styles.actionsList}>
        {generating && (
          <div className={styles.generating}>
            <Bot className={styles.mayaIcon} size={24} />
            <span>Maya is thinking of helpful actions...</span>
          </div>
        )}

        {visibleActions.map(action => (
          <div 
            key={action.id} 
            className={`${styles.actionCard} ${action.priority ? styles[action.priority] : ''}`}
            style={{ borderLeftColor: getActionCategoryColor(action.category) }}
          >
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>
                {action.title}
              </h4>
              {action.description && (
                <p className={styles.actionDescription}>
                  {action.description}
                </p>
              )}
              <div className={styles.actionMeta}>
                <span 
                  className={styles.category}
                  style={{ color: getActionCategoryColor(action.category) }}
                >
                  {action.category}
                </span>
                {action.estimatedTime && (
                  <span className={styles.time}>
                    ~{action.estimatedTime} min
                  </span>
                )}
                {action.points && (
                  <span className={styles.points}>
                    +{action.points} pts
                  </span>
                )}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.completeButton}
                onClick={() => handleComplete(action.id)}
                disabled={completingActions.has(action.id)}
                title="Complete action"
              >
                {completingActions.has(action.id) ? (
                  <RefreshCw size={16} className={styles.spinning} />
                ) : (
                  <CheckCircle size={16} />
                )}
              </button>
              <button
                className={styles.dismissButton}
                onClick={() => handleDismiss(action.id)}
                title="Dismiss action"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less */}
      {actions.length > maxVisible && (
        <button
          className={styles.expandButton}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronDown size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronRight size={16} />
              Show {actions.length - maxVisible} More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default QuickActionsPanel;
