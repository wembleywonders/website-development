// src/components/creators-journal/PublicationStatus.tsx
// Shows publication pipeline status for learner's stories

import React, { useState, useEffect } from 'react';
import './PublicationStatus.css';

export interface PublicationItem {
  id: string;
  title: string;
  type: 'joystick' | 'raydyo';
  status: 'drafting' | 'review' | 'approved' | 'published';
  submittedAt: Date;
  publishedAt?: Date;
  views?: number;
  shares?: number;
}

export interface PublicationStatusProps {
  // Either pass items directly OR pass learnerId to fetch
  items?: PublicationItem[];
  learnerId?: string;
  onViewItem?: (id: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  drafting: { label: 'Drafting', emoji: '✏️', color: '#f59e0b' },
  review: { label: 'In Review', emoji: '👀', color: '#3b82f6' },
  approved: { label: 'Approved', emoji: '✅', color: '#10b981' },
  published: { label: 'Published', emoji: '🎉', color: '#8b5cf6' }
};

const PLATFORM_CONFIG: Record<string, { label: string; emoji: string }> = {
  joystick: { label: 'Joystick', emoji: '🎮' },
  raydyo: { label: 'Rayd-yo', emoji: '📻' }
};

// Sample data for when learnerId is used
const SAMPLE_ITEMS: PublicationItem[] = [
  {
    id: '1',
    title: 'How I Fixed Uncle Winston\'s Speaker',
    type: 'joystick',
    status: 'review',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
];

export const PublicationStatus: React.FC<PublicationStatusProps> = ({
  items: propItems,
  learnerId,
  onViewItem = () => {}
}) => {
  const [items, setItems] = useState<PublicationItem[]>(propItems || []);
  
  useEffect(() => {
    if (learnerId && !propItems) {
      // In real implementation, fetch from API
      setItems(SAMPLE_ITEMS);
    }
  }, [learnerId, propItems]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const sortedItems = [...items].sort((a, b) => 
    b.submittedAt.getTime() - a.submittedAt.getTime()
  );

  const inPipeline = items.filter(i => i.status !== 'published').length;
  const published = items.filter(i => i.status === 'published').length;

  return (
    <section className="publication-status">
      <header className="publication-header">
        <h3>📰 Your Stories</h3>
        <div className="publication-summary">
          <span className="summary-item">
            <strong>{inPipeline}</strong> in pipeline
          </span>
          <span className="summary-item">
            <strong>{published}</strong> published
          </span>
        </div>
      </header>

      {sortedItems.length === 0 ? (
        <div className="publication-empty">
          <p>No stories in the pipeline yet.</p>
          <p className="hint">
            Keep creating and Collector ROV will flag story-worthy moments! 📝
          </p>
        </div>
      ) : (
        <ul className="publication-list">
          {sortedItems.map(item => {
            const status = STATUS_CONFIG[item.status];
            const platform = PLATFORM_CONFIG[item.type];
            
            return (
              <li 
                key={item.id} 
                className={`publication-item status-${item.status}`}
                onClick={() => onViewItem(item.id)}
              >
                <div className="item-main">
                  <span className="item-platform" title={platform.label}>
                    {platform.emoji}
                  </span>
                  <div className="item-content">
                    <h4 className="item-title">{item.title}</h4>
                    <div className="item-meta">
                      <span 
                        className="item-status"
                        style={{ backgroundColor: status.color }}
                      >
                        {status.emoji} {status.label}
                      </span>
                      <time className="item-date">
                        {item.publishedAt 
                          ? `Published ${formatDate(item.publishedAt)}`
                          : `Submitted ${formatDate(item.submittedAt)}`
                        }
                      </time>
                    </div>
                  </div>
                </div>
                
                {item.status === 'published' && (
                  <div className="item-stats">
                    {item.views !== undefined && (
                      <span className="stat">👁️ {item.views}</span>
                    )}
                    {item.shares !== undefined && (
                      <span className="stat">🔄 {item.shares}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PublicationStatus;
