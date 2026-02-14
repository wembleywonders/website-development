/**
 * PrototypeCard Component
 * Wembley Wonders CIC
 * 
 * Displays a prototype summary in grid/list views.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Layers, 
  Users, 
  Calendar, 
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';
import styles from './PrototypeCard.module.scss';

// ============================================================================
// TYPES
// ============================================================================

export type PrototypeStatus = 
  | 'concept'
  | 'development'
  | 'testing'
  | 'review'
  | 'approved'
  | 'marketplace'
  | 'archived';

export type PrototypeCategory = 
  | 'hardware'
  | 'software'
  | 'fashion'
  | 'media'
  | 'service'
  | 'hybrid';

export interface PrototypeCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: PrototypeCategory;
  status: PrototypeStatus;
  version: string;
  thumbnailUrl?: string;
  creatorName: string;
  contributorCount: number;
  createdAt: string;
  updatedAt: string;
  hasIPProtection: boolean;
  estimatedValue?: number;
  tags: string[];
  onClick?: () => void;
  compact?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STATUS_CONFIG: Record<PrototypeStatus, { label: string; color: string; bg: string }> = {
  concept: { label: 'Concept', color: '#6366f1', bg: '#eef2ff' },
  development: { label: 'In Development', color: '#f59e0b', bg: '#fffbeb' },
  testing: { label: 'Testing', color: '#06b6d4', bg: '#ecfeff' },
  review: { label: 'Under Review', color: '#8b5cf6', bg: '#f5f3ff' },
  approved: { label: 'Approved', color: '#10b981', bg: '#ecfdf5' },
  marketplace: { label: 'On Marketplace', color: '#1a7a7a', bg: '#f0fdfa' },
  archived: { label: 'Archived', color: '#64748b', bg: '#f1f5f9' }
};

const CATEGORY_ICONS: Record<PrototypeCategory, React.ReactNode> = {
  hardware: <Box size={16} />,
  software: <Layers size={16} />,
  fashion: <Star size={16} />,
  media: <Box size={16} />,
  service: <Users size={16} />,
  hybrid: <Layers size={16} />
};

// ============================================================================
// COMPONENT
// ============================================================================

const PrototypeCard: React.FC<PrototypeCardProps> = ({
  id,
  name,
  tagline,
  description,
  category,
  status,
  version,
  thumbnailUrl,
  creatorName,
  contributorCount,
  createdAt,
  updatedAt,
  hasIPProtection,
  estimatedValue,
  tags,
  onClick,
  compact = false
}) => {
  const statusConfig = STATUS_CONFIG[status];
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (compact) {
    return (
      <div className={styles.cardCompact} onClick={onClick}>
        <div className={styles.compactLeft}>
          <span className={styles.categoryIcon}>{CATEGORY_ICONS[category]}</span>
          <div className={styles.compactInfo}>
            <h4>{name}</h4>
            <span className={styles.creator}>by {creatorName}</span>
          </div>
        </div>
        <div className={styles.compactRight}>
          <span 
            className={styles.statusBadge}
            style={{ color: statusConfig.color, backgroundColor: statusConfig.bg }}
          >
            {statusConfig.label}
          </span>
          <span className={styles.version}>v{version}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Thumbnail */}
      <div className={styles.thumbnail}>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={name} />
        ) : (
          <div className={styles.placeholderThumb}>
            {CATEGORY_ICONS[category]}
          </div>
        )}
        {hasIPProtection && (
          <div className={styles.ipBadge} title="IP Protected">
            <Shield size={14} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.name}>{name}</h3>
            <span className={styles.version}>v{version}</span>
          </div>
          <p className={styles.tagline}>{tagline}</p>
        </div>

        {/* Status & Category */}
        <div className={styles.meta}>
          <span 
            className={styles.statusBadge}
            style={{ color: statusConfig.color, backgroundColor: statusConfig.bg }}
          >
            {statusConfig.label}
          </span>
          <span className={styles.category}>
            {CATEGORY_ICONS[category]}
            {category}
          </span>
        </div>

        {/* Creator Info */}
        <div className={styles.creatorInfo}>
          <span className={styles.creator}>
            <Users size={14} />
            {creatorName}
            {contributorCount > 1 && (
              <span className={styles.contributorCount}>
                +{contributorCount - 1} contributors
              </span>
            )}
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className={styles.tagMore}>+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.dates}>
            <span className={styles.date}>
              <Calendar size={12} />
              Updated {formatDate(updatedAt)}
            </span>
          </div>
          {estimatedValue && (
            <span className={styles.value}>
              {formatCurrency(estimatedValue)}
            </span>
          )}
        </div>

        {/* Action */}
        <Link 
          to={`/prototypes/${id}`} 
          className={styles.viewLink}
          onClick={(e) => e.stopPropagation()}
        >
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default PrototypeCard;
