// src/components/rov-widgets/ROVStatusIndicator.tsx
// Shows which ROVs are active and their current status

import React from 'react';
import './ROVStatusIndicator.css';

export interface ROVStatus {
  id: string;
  name: string;
  emoji: string;
  role: string;
  isActive: boolean;
  lastActivity?: Date;
  currentTask?: string;
}

export interface ROVStatusIndicatorProps {
  rovs: ROVStatus[];
  compact?: boolean;
  onROVClick?: (rovId: string) => void;
}

export const ROVStatusIndicator: React.FC<ROVStatusIndicatorProps> = ({
  rovs,
  compact = false,
  onROVClick
}) => {
  const activeCount = rovs.filter(r => r.isActive).length;

  const formatLastActivity = (date?: Date): string => {
    if (!date) return 'Idle';
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  if (compact) {
    return (
      <div className="rov-status-compact">
        <div className="rov-avatars">
          {rovs.filter(r => r.isActive).slice(0, 5).map(rov => (
            <span 
              key={rov.id} 
              className="rov-avatar-small active"
              title={`${rov.name}: ${rov.currentTask || 'Active'}`}
              onClick={() => onROVClick?.(rov.id)}
            >
              {rov.emoji}
            </span>
          ))}
        </div>
        <span className="rov-count">{activeCount} ROVs active</span>
      </div>
    );
  }

  return (
    <div className="rov-status-indicator">
      <header className="status-header">
        <h4>🤖 ROV Fleet Status</h4>
        <span className="active-count">{activeCount}/{rovs.length} active</span>
      </header>

      <div className="rov-grid">
        {rovs.map(rov => (
          <div 
            key={rov.id} 
            className={`rov-status-card ${rov.isActive ? 'active' : 'inactive'}`}
            onClick={() => onROVClick?.(rov.id)}
          >
            <div className="rov-avatar">
              {rov.emoji}
              <span className={`status-dot ${rov.isActive ? 'online' : 'offline'}`} />
            </div>
            <div className="rov-info">
              <span className="rov-name">{rov.name}</span>
              <span className="rov-role">{rov.role}</span>
              {rov.isActive && rov.currentTask && (
                <span className="rov-task">{rov.currentTask}</span>
              )}
              <span className="rov-activity">
                {formatLastActivity(rov.lastActivity)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ROVStatusIndicator;
