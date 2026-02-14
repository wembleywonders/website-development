/**
 * IPStatusBadge Component
 * Wembley Wonders CIC
 * 
 * Displays IP protection status with visual indicators.
 */

import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  FileText,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import styles from './IPStatusBadge.module.scss';

// ============================================================================
// TYPES
// ============================================================================

export type IPStage = 
  | 'idea'
  | 'documented'
  | 'disclosed'
  | 'prior-art-searched'
  | 'patent-assessment'
  | 'protection-strategy'
  | 'filing-prepared'
  | 'filed'
  | 'pending'
  | 'granted'
  | 'active';

export type ProtectionType = 
  | 'none'
  | 'trade-secret'
  | 'copyright'
  | 'trademark'
  | 'design-right'
  | 'patent'
  | 'utility-model';

export interface IPStatusBadgeProps {
  stage: IPStage;
  protectionType: ProtectionType;
  noveltyScore?: number;
  filingDate?: string;
  grantDate?: string;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  showDetails?: boolean;
  onClick?: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STAGE_CONFIG: Record<IPStage, { 
  label: string; 
  color: string; 
  icon: React.ReactNode;
  description: string;
}> = {
  'idea': { 
    label: 'Idea', 
    color: '#94a3b8', 
    icon: <Unlock size={16} />,
    description: 'Unprotected concept'
  },
  'documented': { 
    label: 'Documented', 
    color: '#6366f1', 
    icon: <FileText size={16} />,
    description: 'Initial documentation complete'
  },
  'disclosed': { 
    label: 'Disclosed', 
    color: '#8b5cf6', 
    icon: <Shield size={16} />,
    description: 'Invention disclosure filed'
  },
  'prior-art-searched': { 
    label: 'Prior Art Searched', 
    color: '#06b6d4', 
    icon: <Shield size={16} />,
    description: 'Prior art search completed'
  },
  'patent-assessment': { 
    label: 'Assessment', 
    color: '#f59e0b', 
    icon: <Clock size={16} />,
    description: 'Patentability under assessment'
  },
  'protection-strategy': { 
    label: 'Strategy Set', 
    color: '#10b981', 
    icon: <Shield size={16} />,
    description: 'Protection strategy defined'
  },
  'filing-prepared': { 
    label: 'Filing Prepared', 
    color: '#1a7a7a', 
    icon: <FileText size={16} />,
    description: 'Application ready for filing'
  },
  'filed': { 
    label: 'Filed', 
    color: '#1a7a7a', 
    icon: <ShieldCheck size={16} />,
    description: 'Application filed'
  },
  'pending': { 
    label: 'Pending', 
    color: '#f59e0b', 
    icon: <Clock size={16} />,
    description: 'Awaiting examination'
  },
  'granted': { 
    label: 'Granted', 
    color: '#16a34a', 
    icon: <ShieldCheck size={16} />,
    description: 'Protection granted'
  },
  'active': { 
    label: 'Active', 
    color: '#16a34a', 
    icon: <Lock size={16} />,
    description: 'Active protection in force'
  }
};

const PROTECTION_LABELS: Record<ProtectionType, string> = {
  'none': 'No Protection',
  'trade-secret': 'Trade Secret',
  'copyright': 'Copyright',
  'trademark': 'Trademark',
  'design-right': 'Design Right',
  'patent': 'Patent',
  'utility-model': 'Utility Model'
};

// ============================================================================
// COMPONENT
// ============================================================================

const IPStatusBadge: React.FC<IPStatusBadgeProps> = ({
  stage,
  protectionType,
  noveltyScore,
  filingDate,
  grantDate,
  size = 'medium',
  showLabel = true,
  showDetails = false,
  onClick
}) => {
  const config = STAGE_CONFIG[stage];
  const protectionLabel = PROTECTION_LABELS[protectionType];

  const getNoveltyColor = (score: number) => {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#dc2626';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`${styles.badge} ${styles[size]} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {/* Main Badge */}
      <div 
        className={styles.main}
        style={{ borderColor: config.color }}
      >
        <span className={styles.icon} style={{ color: config.color }}>
          {config.icon}
        </span>
        {showLabel && (
          <span className={styles.label}>{config.label}</span>
        )}
      </div>

      {/* Details Panel */}
      {showDetails && (
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Stage:</span>
            <span className={styles.detailValue}>{config.label}</span>
          </div>
          
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Protection:</span>
            <span className={styles.detailValue}>{protectionLabel}</span>
          </div>
          
          {noveltyScore !== undefined && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Novelty:</span>
              <span 
                className={styles.detailValue}
                style={{ color: getNoveltyColor(noveltyScore) }}
              >
                {noveltyScore}%
              </span>
            </div>
          )}
          
          {filingDate && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Filed:</span>
              <span className={styles.detailValue}>{formatDate(filingDate)}</span>
            </div>
          )}
          
          {grantDate && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Granted:</span>
              <span className={styles.detailValue}>{formatDate(grantDate)}</span>
            </div>
          )}

          <p className={styles.description}>{config.description}</p>
        </div>
      )}
    </div>
  );
};

export default IPStatusBadge;
