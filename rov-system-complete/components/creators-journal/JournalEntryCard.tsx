// src/components/creators-journal/JournalEntryCard.tsx
// Individual journal entry display card

import React, { useState } from 'react';
import './JournalEntryCard.css';

export interface JournalEntryCardProps {
  entry: {
    id: string;
    type: 'activity' | 'observation' | 'milestone' | 'reflection' | 'evidence' | 'story';
    title: string;
    content: string;
    stage: string;
    programme?: string;
    badgeId?: string;
    rovSource: string;
    attachments: string[];
    tags: string[];
    isPublishable: boolean;
    createdAt: Date;
  };
  onPublish?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
  entry,
  onPublish,
  onEdit,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeEmojis: Record<string, string> = {
    activity: '🎯',
    observation: '👁️',
    milestone: '🏆',
    reflection: '💭',
    evidence: '📎',
    story: '📝'
  };

  const stageColors: Record<string, string> = {
    connect: '#4CAF50',
    create: '#2196F3',
    cultivate: '#FF9800',
    compete: '#9C27B0',
    celebrate: '#E91E63'
  };

  const rovEmojis: Record<string, string> = {
    pathfinder: '🧭',
    discovery: '🔬',
    insight: '💡',
    collector: '📝',
    keeper: '📚',
    helper: '🤝',
    alex: '♿',
    mindful: '🧘',
    fixer: '🔧',
    guardian: '🛡️'
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <article 
      className={`journal-entry-card ${entry.type} ${isExpanded ? 'expanded' : ''}`}
      style={{ borderLeftColor: stageColors[entry.stage] }}
    >
      <header className="entry-header">
        <div className="entry-type-badge">
          <span className="type-emoji">{typeEmojis[entry.type]}</span>
          <span className="type-label">{entry.type}</span>
        </div>

        <h3 className="entry-title">{entry.title}</h3>

        <div className="entry-meta">
          <span className="entry-date">{formatDate(entry.createdAt)}</span>
          <span className="entry-rov" title={`Captured by ${entry.rovSource}`}>
            {rovEmojis[entry.rovSource] || '🤖'}
          </span>
          {entry.isPublishable && (
            <span className="publishable-badge" title="Story-worthy!">
              ✨
            </span>
          )}
        </div>
      </header>

      <div className="entry-content">
        <p className={isExpanded ? '' : 'truncated'}>
          {entry.content}
        </p>
        {entry.content.length > 200 && (
          <button 
            className="expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {entry.attachments.length > 0 && (
        <div className="entry-attachments">
          <h4>📎 Attachments ({entry.attachments.length})</h4>
          <div className="attachment-list">
            {entry.attachments.map((att, index) => (
              <a key={index} href={att} className="attachment-link">
                {att.split('/').pop()}
              </a>
            ))}
          </div>
        </div>
      )}

      {entry.tags.length > 0 && (
        <div className="entry-tags">
          {entry.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <footer className="entry-footer">
        <div className="entry-context">
          {entry.programme && (
            <span className="programme-badge">{entry.programme}</span>
          )}
          {entry.badgeId && (
            <span className="badge-link">Related to badge work</span>
          )}
        </div>

        <div className="entry-actions">
          {entry.isPublishable && onPublish && (
            <button className="action-btn publish" onClick={onPublish}>
              📢 Submit for Publication
            </button>
          )}
          {onEdit && (
            <button className="action-btn edit" onClick={onEdit}>
              ✏️ Edit
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};

export default JournalEntryCard;
