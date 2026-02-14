/**
 * CREDENTIALS WIDGET
 * 
 * Displays creator's soulbound credentials and achievements.
 * Compact widget for dashboard, expandable to full view.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface Credential {
  id: string;
  type: 'programme' | 'milestone' | 'skill' | 'community' | 'special';
  name: string;
  description: string;
  icon: string;
  issuedAt: string;
  metadata?: {
    level?: number;
    programmeName?: string;
    [key: string]: any;
  };
}

export interface CredentialsWidgetProps {
  credentials: Credential[];
  variant?: 'compact' | 'full' | 'badges-only';
  maxDisplay?: number;
  onViewCredential?: (credential: Credential) => void;
  onViewAll?: () => void;
}

// ============================================================
// CREDENTIAL TYPE METADATA
// ============================================================

const TYPE_INFO: Record<string, { label: string; color: string }> = {
  programme: { label: 'Programme', color: '#4CAF50' },
  milestone: { label: 'Milestone', color: '#FF9800' },
  skill: { label: 'Skill', color: '#2196F3' },
  community: { label: 'Community', color: '#E91E63' },
  special: { label: 'Special', color: '#9C27B0' }
};

// ============================================================
// COMPONENT
// ============================================================

export const CredentialsWidget: React.FC<CredentialsWidgetProps> = ({
  credentials,
  variant = 'compact',
  maxDisplay = 6,
  onViewCredential,
  onViewAll
}) => {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  
  const sortedCredentials = [...credentials].sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );
  
  const displayCredentials = sortedCredentials.slice(0, maxDisplay);
  const hasMore = credentials.length > maxDisplay;
  
  // Badges only variant - just icons
  if (variant === 'badges-only') {
    return (
      <div className="credentials-widget credentials-widget--badges-only">
        {displayCredentials.map(cred => (
          <span 
            key={cred.id}
            className="credential-badge"
            title={cred.name}
            onClick={() => onViewCredential?.(cred)}
          >
            {cred.icon}
          </span>
        ))}
        {hasMore && (
          <span className="more-badge" onClick={onViewAll}>
            +{credentials.length - maxDisplay}
          </span>
        )}
      </div>
    );
  }
  
  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="credentials-widget credentials-widget--compact">
        <div className="credentials-widget__header">
          <span className="widget-icon">🎖️</span>
          <h4>Credentials</h4>
          <span className="credential-count">{credentials.length}</span>
        </div>
        
        <div className="credentials-widget__grid">
          {displayCredentials.map(cred => (
            <div
              key={cred.id}
              className="credential-card-compact"
              onClick={() => setSelectedCredential(cred)}
            >
              <span className="credential-icon">{cred.icon}</span>
              <span className="credential-name">{cred.name}</span>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <button className="view-all-btn" onClick={onViewAll}>
            View all {credentials.length} credentials →
          </button>
        )}
        
        {/* Credential Detail Modal */}
        {selectedCredential && (
          <div className="credential-modal" onClick={() => setSelectedCredential(null)}>
            <div className="credential-modal__content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedCredential(null)}>×</button>
              
              <div className="credential-detail">
                <span className="credential-icon-large">{selectedCredential.icon}</span>
                <h3>{selectedCredential.name}</h3>
                <span 
                  className="credential-type"
                  style={{ backgroundColor: TYPE_INFO[selectedCredential.type]?.color }}
                >
                  {TYPE_INFO[selectedCredential.type]?.label}
                </span>
                <p className="credential-description">{selectedCredential.description}</p>
                <span className="credential-date">
                  Earned: {new Date(selectedCredential.issuedAt).toLocaleDateString()}
                </span>
                
                <div className="credential-verification">
                  <span className="verify-icon">✓</span>
                  <span>Verified by Wembley Wonders CIC</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Full variant
  return (
    <div className="credentials-widget credentials-widget--full">
      <div className="credentials-widget__header">
        <div className="header-main">
          <span className="widget-icon">🎖️</span>
          <div>
            <h3>Your Credentials</h3>
            <p>Non-transferable proof of your achievements</p>
          </div>
        </div>
        <span className="credential-count">{credentials.length} earned</span>
      </div>
      
      {/* Credential Categories */}
      <div className="credentials-widget__categories">
        {Object.entries(TYPE_INFO).map(([type, info]) => {
          const typeCount = credentials.filter(c => c.type === type).length;
          if (typeCount === 0) return null;
          
          return (
            <div key={type} className="category-section">
              <h4 style={{ borderColor: info.color }}>
                {info.label} ({typeCount})
              </h4>
              <div className="category-credentials">
                {credentials
                  .filter(c => c.type === type)
                  .map(cred => (
                    <div
                      key={cred.id}
                      className="credential-card"
                      onClick={() => onViewCredential?.(cred)}
                    >
                      <span className="credential-icon">{cred.icon}</span>
                      <div className="credential-info">
                        <span className="credential-name">{cred.name}</span>
                        <span className="credential-desc">{cred.description}</span>
                      </div>
                      <span className="credential-date">
                        {new Date(cred.issuedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty State */}
      {credentials.length === 0 && (
        <div className="credentials-widget__empty">
          <span className="empty-icon">🎯</span>
          <h4>No credentials yet</h4>
          <p>Complete workshops and milestones to earn your first credential!</p>
        </div>
      )}
      
      {/* Next Credentials */}
      <div className="credentials-widget__next">
        <h4>🎯 Available to Earn</h4>
        <div className="next-credentials">
          <div className="next-credential">
            <span className="next-icon">🎵</span>
            <div className="next-info">
              <span className="next-name">Programme Explorer</span>
              <span className="next-requirement">Complete 50% of your programme</span>
            </div>
          </div>
          <div className="next-credential">
            <span className="next-icon">💰</span>
            <div className="next-info">
              <span className="next-name">First Sale</span>
              <span className="next-requirement">Make your first marketplace sale</span>
            </div>
          </div>
          <div className="next-credential">
            <span className="next-icon">💚</span>
            <div className="next-info">
              <span className="next-name">Community Contributor</span>
              <span className="next-requirement">Fund 10 hours of workshops</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="credentials-widget__footer">
        <p>
          🔒 These credentials are soulbound - they can't be transferred and 
          permanently prove your achievements.
        </p>
      </div>
    </div>
  );
};

export default CredentialsWidget;