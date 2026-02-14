/**
 * CreatorAttributionPanel Component
 * Wembley Wonders CIC
 * 
 * Displays and manages contributor attribution for prototypes.
 */

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Check, 
  AlertTriangle, 
  Clock,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import styles from './CreatorAttributionPanel.module.scss';

// ============================================================================
// TYPES
// ============================================================================

export type ContributorRole = 
  | 'creator'
  | 'co-creator'
  | 'contributor'
  | 'advisor'
  | 'mentor'
  | 'technical-support'
  | 'investor';

export type ContributorStatus = 'pending' | 'verified' | 'disputed';

export interface Contributor {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  role: ContributorRole;
  percentage: number;
  status: ContributorStatus;
  contributions: {
    type: string;
    description: string;
    date: string;
  }[];
  joinedAt: string;
  verifiedAt?: string;
}

export interface CreatorAttributionPanelProps {
  prototypeId: string;
  contributors: Contributor[];
  totalPercentage: number;
  isValid: boolean;
  canEdit?: boolean;
  onAddContributor?: () => void;
  onEditContributor?: (contributorId: string) => void;
  onRemoveContributor?: (contributorId: string) => void;
  onVerifyContributor?: (contributorId: string) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ROLE_CONFIG: Record<ContributorRole, { label: string; color: string }> = {
  'creator': { label: 'Creator', color: '#1a7a7a' },
  'co-creator': { label: 'Co-Creator', color: '#8b5cf6' },
  'contributor': { label: 'Contributor', color: '#06b6d4' },
  'advisor': { label: 'Advisor', color: '#f59e0b' },
  'mentor': { label: 'Mentor', color: '#10b981' },
  'technical-support': { label: 'Technical Support', color: '#6366f1' },
  'investor': { label: 'Investor', color: '#ec4899' }
};

const STATUS_CONFIG: Record<ContributorStatus, { icon: React.ReactNode; color: string }> = {
  'pending': { icon: <Clock size={14} />, color: '#f59e0b' },
  'verified': { icon: <Check size={14} />, color: '#16a34a' },
  'disputed': { icon: <AlertTriangle size={14} />, color: '#dc2626' }
};

// ============================================================================
// COMPONENT
// ============================================================================

const CreatorAttributionPanel: React.FC<CreatorAttributionPanelProps> = ({
  prototypeId,
  contributors,
  totalPercentage,
  isValid,
  canEdit = false,
  onAddContributor,
  onEditContributor,
  onRemoveContributor,
  onVerifyContributor
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const sortedContributors = [...contributors].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Users size={20} />
          <h3>Attribution</h3>
          <span className={styles.count}>{contributors.length} contributors</span>
        </div>
        {canEdit && onAddContributor && (
          <button className={styles.addBtn} onClick={onAddContributor}>
            <UserPlus size={16} />
            Add Contributor
          </button>
        )}
      </div>

      {/* Validation Status */}
      <div className={`${styles.validation} ${isValid ? styles.valid : styles.invalid}`}>
        {isValid ? (
          <>
            <Check size={16} />
            <span>Attribution complete ({totalPercentage}%)</span>
          </>
        ) : (
          <>
            <AlertTriangle size={16} />
            <span>Attribution incomplete ({totalPercentage}% of 100%)</span>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        {sortedContributors.map((contributor, index) => (
          <div
            key={contributor.id}
            className={styles.progressSegment}
            style={{
              width: `${contributor.percentage}%`,
              backgroundColor: ROLE_CONFIG[contributor.role].color
            }}
            title={`${contributor.name}: ${contributor.percentage}%`}
          />
        ))}
        {totalPercentage < 100 && (
          <div
            className={styles.progressEmpty}
            style={{ width: `${100 - totalPercentage}%` }}
          />
        )}
      </div>

      {/* Contributor List */}
      <div className={styles.contributorList}>
        {sortedContributors.map(contributor => (
          <div key={contributor.id} className={styles.contributorItem}>
            {/* Main Row */}
            <div 
              className={styles.contributorMain}
              onClick={() => toggleExpand(contributor.id)}
            >
              <div className={styles.contributorLeft}>
                {/* Avatar */}
                <div className={styles.avatar}>
                  {contributor.avatarUrl ? (
                    <img src={contributor.avatarUrl} alt={contributor.name} />
                  ) : (
                    <span>{contributor.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>

                {/* Info */}
                <div className={styles.contributorInfo}>
                  <div className={styles.nameRow}>
                    <span className={styles.name}>{contributor.name}</span>
                    {contributor.role === 'creator' && (
                      <Award size={14} className={styles.creatorIcon} />
                    )}
                  </div>
                  <div className={styles.roleRow}>
                    <span 
                      className={styles.role}
                      style={{ color: ROLE_CONFIG[contributor.role].color }}
                    >
                      {ROLE_CONFIG[contributor.role].label}
                    </span>
                    <span 
                      className={styles.status}
                      style={{ color: STATUS_CONFIG[contributor.status].color }}
                    >
                      {STATUS_CONFIG[contributor.status].icon}
                      {contributor.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.contributorRight}>
                <span className={styles.percentage}>{contributor.percentage}%</span>
                {expandedId === contributor.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === contributor.id && (
              <div className={styles.contributorDetails}>
                <div className={styles.detailSection}>
                  <h4>Contributions</h4>
                  {contributor.contributions.length > 0 ? (
                    <ul className={styles.contributionList}>
                      {contributor.contributions.map((c, i) => (
                        <li key={i}>
                          <span className={styles.contribType}>{c.type}</span>
                          <span className={styles.contribDesc}>{c.description}</span>
                          <span className={styles.contribDate}>{formatDate(c.date)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noContributions}>No contributions recorded</p>
                  )}
                </div>

                <div className={styles.detailSection}>
                  <div className={styles.detailRow}>
                    <span>Joined:</span>
                    <span>{formatDate(contributor.joinedAt)}</span>
                  </div>
                  {contributor.verifiedAt && (
                    <div className={styles.detailRow}>
                      <span>Verified:</span>
                      <span>{formatDate(contributor.verifiedAt)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {canEdit && (
                  <div className={styles.actions}>
                    {contributor.status === 'pending' && onVerifyContributor && (
                      <button 
                        className={styles.verifyBtn}
                        onClick={() => onVerifyContributor(contributor.id)}
                      >
                        <Check size={14} />
                        Verify
                      </button>
                    )}
                    {onEditContributor && (
                      <button 
                        className={styles.editBtn}
                        onClick={() => onEditContributor(contributor.id)}
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                    )}
                    {contributor.role !== 'creator' && onRemoveContributor && (
                      <button 
                        className={styles.removeBtn}
                        onClick={() => onRemoveContributor(contributor.id)}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorAttributionPanel;
