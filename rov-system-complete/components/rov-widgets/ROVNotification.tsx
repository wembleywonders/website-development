// src/components/rov-widgets/ROVNotification.tsx
// Toast-style notification from ROVs

import React, { useEffect, useState } from 'react';
import './ROVNotification.css';

export interface ROVNotificationProps {
  id: string;
  rovEmoji: string;
  rovName: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'celebration';
  duration?: number; // ms, 0 for persistent
  onDismiss: (id: string) => void;
  onClick?: () => void;
}

export const ROVNotification: React.FC<ROVNotificationProps> = ({
  id,
  rovEmoji,
  rovName,
  message,
  type,
  duration = 5000,
  onDismiss,
  onClick
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(id), 300);
  };

  return (
    <div 
      className={`rov-notification type-${type} ${isExiting ? 'exiting' : ''}`}
      onClick={onClick}
      role="alert"
    >
      <div className="notification-icon">
        {rovEmoji}
      </div>
      
      <div className="notification-content">
        <span className="notification-rov">{rovName}</span>
        <p className="notification-message">{message}</p>
      </div>

      <button 
        className="notification-close"
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Dismiss notification"
      >
        ×
      </button>

      {duration > 0 && (
        <div 
          className="notification-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

// Container for multiple notifications
export interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    rovEmoji: string;
    rovName: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'celebration';
    duration?: number;
    onClick?: () => void;
  }>;
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onDismiss,
  position = 'bottom-right'
}) => {
  return (
    <div className={`notification-container position-${position}`}>
      {notifications.map(notification => (
        <ROVNotification
          key={notification.id}
          {...notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default ROVNotification;
