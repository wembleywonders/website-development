// src/components/skills/CertificationBadge.tsx
import React from 'react';
import './CertificationBadge.css';

interface CertificationBadgeProps {
  id: string;
  name: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  skillCategory: string;
  earnedDate: Date;
  issuedBy: string;
  verificationId: string;
  isVerified: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  id,
  name,
  level,
  skillCategory,
  earnedDate,
  issuedBy,
  verificationId,
  isVerified,
  onClick,
  showDetails = false
}) => {
  const getBadgeColor = (level: string) => {
    const colors = {
      bronze: '#cd7f32',
      silver: '#c0c0c0',
      gold: '#ffd700',
      platinum: '#e5e4e2'
    };
    return colors[level as keyof typeof colors];
  };

  const getBadgeIcon = (level: string) => {
    const icons = {
      bronze: '🥉',
      silver: '🥈',
      gold: '🥇',
      platinum: '💎'
    };
    return icons[level as keyof typeof icons];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`certification-badge ${level} ${isVerified ? 'verified' : 'pending'}`}
      onClick={onClick}
      style={{ borderColor: getBadgeColor(level) }}
    >
      <div className="badge-header">
        <div className="badge-icon" style={{ color: getBadgeColor(level) }}>
          {getBadgeIcon(level)}
        </div>
        {isVerified && (
          <div className="verification-check">
            <span className="check-mark">✓</span>
          </div>
        )}
      </div>
      
      <div className="badge-content">
        <h4 className="badge-name">{name}</h4>
        <p className="badge-category">{skillCategory}</p>
        
        {showDetails && (
          <div className="badge-details">
            <div className="detail-row">
              <span className="label">Earned:</span>
              <span className="value">{formatDate(earnedDate)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Issued by:</span>
              <span className="value">{issuedBy}</span>
            </div>
            <div className="detail-row">
              <span className="label">Verification ID:</span>
              <span className="value verification-id">{verificationId}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`value status ${isVerified ? 'verified' : 'pending'}`}>
                {isVerified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="badge-footer">
        <div className="badge-level">
          {level.charAt(0).toUpperCase() + level.slice(1)} Level
        </div>
        {!showDetails && (
          <div className="earned-date">
            {formatDate(earnedDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationBadge;