// src/components/rov-widgets/ROVMiniCard.tsx
// Compact card showing a single ROV's message

import React from 'react';
import './ROVMiniCard.css';

export interface ROVMiniCardProps {
  rovId: string;
  rovName: string;
  rovEmoji: string;
  message: string;
  timestamp: Date;
  type?: 'info' | 'success' | 'warning' | 'celebration';
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export const ROVMiniCard: React.FC<ROVMiniCardProps> = ({
  rovId,
  rovName,
  rovEmoji,
  message,
  timestamp,
  type = 'info',
  actionLabel,
  onAction,
  onDismiss
}) => {
  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Intl.DateTimeFormat('en-GB', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`rov-mini-card type-${type}`}>
      <div className="mini-card-avatar">
        {rovEmoji}
      </div>
      
      <div className="mini-card-content">
        <div className="mini-card-header">
          <span className="rov-name">{rovName}</span>
          <time className="mini-card-time">{formatTime(timestamp)}</time>
        </div>
        <p className="mini-card-message">{message}</p>
        
        {actionLabel && onAction && (
          <button className="mini-card-action" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>

      {onDismiss && (
        <button 
          className="mini-card-dismiss" 
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ROVMiniCard;
