/**
 * ProjectCard - Individual project card component
 * @module features/project/components/ProjectCard
 */

import React from 'react';
import { 
  MoreVertical, 
  Clock, 
  Users, 
  Tag,
  CheckCircle,
  AlertCircle,
  Edit3,
  Archive
} from 'lucide-react';
import styles from './ProjectCard.module.scss';

type Project = {
  id: string;
  name: string;
  description?: string;
  status?: 'completed' | 'active' | 'paused' | 'draft' | 'archived' | string;
  progress?: number;
  updatedAt: string | Date;
  collaborators?: Array<{ id?: string; name?: string }>;
  tags?: string[];
  type?: string;
};

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list' | 'timeline' | 'kanban';
  onClick: () => void;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  showActions?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  viewMode,
  onClick,
  selected = false,
  onSelect,
  showActions = true
}) => {
  const getStatusIcon = () => {
    switch (project.status) {
      case 'completed': return <CheckCircle size={16} className={styles.completed} />;
      case 'active': return <AlertCircle size={16} className={styles.active} />;
      case 'draft': return <Edit3 size={16} className={styles.draft} />;
      case 'archived': return <Archive size={16} className={styles.archived} />;
      default: return null;
    }
  };

  const getStatusColor = () => {
    switch (project.status) {
      case 'completed': return '#48bb78';
      case 'active': return '#4299e1';
      case 'paused': return '#ed8936';
      case 'draft': return '#718096';
      case 'archived': return '#a0aec0';
      default: return '#718096';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleActionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open actions menu
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect?.(e.target.checked);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {onSelect && (
        <div className={styles.selectBox} onClick={handleSelectClick}>
          <input
            type="checkbox"
            checked={selected}
            onChange={handleSelectChange}
            onClick={handleSelectClick}
          />
        </div>
      )}

      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.titleSection}>
            {getStatusIcon()}
            <h3 className={styles.title}>{project.name}</h3>
          </div>
          {showActions && (
            <button 
              className={styles.actionsButton}
              onClick={handleActionsClick}
            >
              <MoreVertical size={16} />
            </button>
          )}
        </div>

        {/* Description */}
        {project.description && viewMode !== 'grid' && (
          <p className={styles.description}>
            {project.description}
          </p>
        )}

        {/* Progress Bar */}
        {project.progress !== undefined && (
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${project.progress}%`,
                  backgroundColor: getStatusColor()
                }}
              />
            </div>
            <span className={styles.progressText}>{project.progress}%</span>
          </div>
        )}

        {/* Meta Information */}
        <div className={styles.cardMeta}>
          {/* Updated Date */}
          <div className={styles.metaItem}>
            <Clock size={14} />
            <span>{formatDate(project.updatedAt)}</span>
          </div>

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className={styles.metaItem}>
              <Users size={14} />
              <span>{project.collaborators.length}</span>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className={styles.tags}>
              {project.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className={styles.moreTag}>
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Type Badge */}
        <div 
          className={styles.typeBadge}
          data-type={project.type}
        >
          {project.type}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
