/**
 * RecentProjects - Recent projects display component
 * @module features/project/components/RecentProjects
 */

import React from 'react';
import { 
  Grid3x3, 
  List, 
  Calendar,
  LayoutGrid,
  ChevronRight,
  Clock,
  Users,
  Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './RecentProjects.module.scss';

/**
 * Inline lightweight ProjectCard component to avoid a missing-module error.
 * This keeps RecentProjects self-contained; extract to a separate file later if desired.
 */
/**
 * Local Project type used by this component to avoid a missing ../types module.
 * Expand this with additional fields as your app requires.
 */
interface Project {
  id: string;
  name?: string;
  owner?: string;
  createdAt?: string; // ISO date string
  tags?: string[];
}

type ViewMode = 'grid' | 'list' | 'timeline' | 'kanban';

interface ProjectCardProps {
  project: Project;
  viewMode: ViewMode;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode, onClick }) => {
  return (
    <div
      className={`${(styles as any).projectCard ?? ''} ${(styles as any)[viewMode] ?? ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
    >
      <div className={(styles as any).projectTitle ?? ''}>
        {project?.name ?? 'Untitled Project'}
      </div>
      {project?.owner && (
        <div className={(styles as any).projectMeta ?? ''}>
          {project.owner}
        </div>
      )}
    </div>
  );
};

interface RecentProjectsProps {
  projects: Project[];
  viewMode: 'grid' | 'list' | 'timeline' | 'kanban';
  onProjectClick: (projectId: string) => void;
  loading?: boolean;
  showViewAll?: boolean;
}

const RecentProjects: React.FC<RecentProjectsProps> = ({
  projects,
  viewMode,
  onProjectClick,
  loading = false,
  showViewAll = false
}) => {
  const navigate = useNavigate();

  const getViewIcon = () => {
    switch (viewMode) {
      case 'list': return <List size={20} />;
      case 'timeline': return <Calendar size={20} />;
      case 'kanban': return <LayoutGrid size={20} />;
      default: return <Grid3x3 size={20} />;
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingCard} />
        <div className={styles.loadingCard} />
        <div className={styles.loadingCard} />
      </div>
    );
  }

  return (
    <div className={`${styles.recentProjects} ${styles[viewMode]}`}>
      {/* Projects Grid/List */}
      <div className={styles.projectsContainer}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            viewMode={viewMode}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </div>

      {/* View All Link */}
      {showViewAll && (
        <div className={styles.viewAll}>
          <button 
            className={styles.viewAllButton}
            onClick={() => navigate('/projects')}
          >
            View All Projects
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
