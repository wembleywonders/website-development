/**
 * CreatorDashboard Component
 * Wembley Wonders CIC
 * 
 * Reusable dashboard component for creator members.
 * Used by pages/dashboard, marketplace, and retail systems.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  Clock, 
  Target,
  ChevronRight,
  Sparkles,
  Users,
  BookOpen
} from 'lucide-react';
import './CreatorDashboard.css';

// ============================================================================
// TYPES
// ============================================================================

export interface CreatorStats {
  projectsCompleted: number;
  projectsInProgress: number;
  badgesEarned: number;
  currentStreak: number;
  totalHours: number;
  communityImpact: number;
}

export interface JourneyStage {
  id: string;
  label: string;
  progress: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface UpcomingSession {
  id: string;
  title: string;
  programme: string;
  date: Date;
  type: 'workshop' | 'session' | 'mentoring' | 'showcase';
}

export interface RecentActivity {
  id: string;
  description: string;
  timestamp: Date;
  type: 'milestone' | 'badge' | 'project' | 'session';
}

export interface CreatorDashboardProps {
  creatorId: string;
  creatorName: string;
  stats?: CreatorStats;
  journeyStages?: JourneyStage[];
  upcomingSessions?: UpcomingSession[];
  recentActivity?: RecentActivity[];
  showQuickActions?: boolean;
  compact?: boolean;
}

// ============================================================================
// DEFAULT DATA
// ============================================================================

const DEFAULT_STATS: CreatorStats = {
  projectsCompleted: 0,
  projectsInProgress: 0,
  badgesEarned: 0,
  currentStreak: 0,
  totalHours: 0,
  communityImpact: 0
};

const DEFAULT_JOURNEY_STAGES: JourneyStage[] = [
  { id: 'explore', label: 'Explore', progress: 100, isComplete: true, isCurrent: false },
  { id: 'learn', label: 'Learn', progress: 60, isComplete: false, isCurrent: true },
  { id: 'create', label: 'Create', progress: 0, isComplete: false, isCurrent: false },
  { id: 'share', label: 'Share', progress: 0, isComplete: false, isCurrent: false },
  { id: 'earn', label: 'Earn', progress: 0, isComplete: false, isCurrent: false }
];

// ============================================================================
// COMPONENT
// ============================================================================

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  creatorId,
  creatorName,
  stats = DEFAULT_STATS,
  journeyStages = DEFAULT_JOURNEY_STAGES,
  upcomingSessions = [],
  recentActivity = [],
  showQuickActions = true,
  compact = false
}) => {
  const currentStage = journeyStages.find(s => s.isCurrent) || journeyStages[0];
  const overallProgress = Math.round(
    journeyStages.reduce((sum, s) => sum + s.progress, 0) / journeyStages.length
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (compact) {
    return (
      <div className="creator-dashboard creator-dashboard--compact">
        <div className="dashboard-compact-header">
          <h3>Welcome back, {creatorName}</h3>
          <span className="dashboard-stage-badge">{currentStage.label}</span>
        </div>
        <div className="dashboard-compact-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
          </div>
          <span>{overallProgress}% journey complete</span>
        </div>
        <Link to="/dashboard" className="dashboard-compact-link">
          View full dashboard <ChevronRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="creator-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Welcome back, {creatorName}</h1>
          <p>Your creative journey continues here.</p>
        </div>
        <div className="dashboard-stage">
          <span className="stage-label">Current Stage</span>
          <span className="stage-value">{currentStage.label}</span>
        </div>
      </header>

      {/* Journey Progress */}
      <section className="dashboard-section dashboard-journey">
        <h2><Sparkles size={20} /> Your Journey</h2>
        <div className="journey-stages">
          {journeyStages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`journey-stage ${stage.isComplete ? 'complete' : ''} ${stage.isCurrent ? 'current' : ''}`}
            >
              <div className="stage-indicator">
                {stage.isComplete ? '✓' : index + 1}
              </div>
              <span className="stage-name">{stage.label}</span>
              {stage.isCurrent && (
                <div className="stage-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${stage.progress}%` }} />
                  </div>
                  <span>{stage.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="dashboard-section dashboard-stats">
        <h2><TrendingUp size={20} /> Your Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <Target size={24} />
            <div className="stat-content">
              <span className="stat-value">{stats.projectsCompleted}</span>
              <span className="stat-label">Projects Complete</span>
            </div>
          </div>
          <div className="stat-card">
            <Clock size={24} />
            <div className="stat-content">
              <span className="stat-value">{stats.projectsInProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>
          <div className="stat-card">
            <Award size={24} />
            <div className="stat-content">
              <span className="stat-value">{stats.badgesEarned}</span>
              <span className="stat-label">Badges Earned</span>
            </div>
          </div>
          <div className="stat-card">
            <Sparkles size={24} />
            <div className="stat-content">
              <span className="stat-value">{stats.currentStreak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      {showQuickActions && (
        <section className="dashboard-section dashboard-actions">
          <h2><Target size={20} /> Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/sandbox" className="action-card">
              <BookOpen size={24} />
              <span>Start a Sandbox</span>
            </Link>
            <Link to="/programmes" className="action-card">
              <Calendar size={24} />
              <span>Book a Session</span>
            </Link>
            <Link to="/community" className="action-card">
              <Users size={24} />
              <span>Community</span>
            </Link>
          </div>
        </section>
      )}

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <section className="dashboard-section dashboard-upcoming">
          <h2><Calendar size={20} /> Upcoming Sessions</h2>
          <div className="sessions-list">
            {upcomingSessions.slice(0, 3).map(session => (
              <div key={session.id} className="session-card">
                <div className="session-date">{formatDate(session.date)}</div>
                <div className="session-info">
                  <span className="session-title">{session.title}</span>
                  <span className="session-programme">{session.programme}</span>
                </div>
                <span className={`session-type session-type--${session.type}`}>
                  {session.type}
                </span>
              </div>
            ))}
          </div>
          {upcomingSessions.length > 3 && (
            <Link to="/calendar" className="view-all-link">
              View all sessions <ChevronRight size={16} />
            </Link>
          )}
        </section>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <section className="dashboard-section dashboard-activity">
          <h2><Clock size={20} /> Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.slice(0, 5).map(activity => (
              <div key={activity.id} className="activity-item">
                <span className={`activity-dot activity-dot--${activity.type}`} />
                <span className="activity-description">{activity.description}</span>
                <span className="activity-time">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {upcomingSessions.length === 0 && recentActivity.length === 0 && (
        <section className="dashboard-section dashboard-empty">
          <div className="empty-state">
            <Sparkles size={48} />
            <h3>Your journey is just beginning!</h3>
            <p>Start by exploring our programmes or trying a sandbox exercise.</p>
            <div className="empty-actions">
              <Link to="/programmes" className="btn btn--primary">Explore Programmes</Link>
              <Link to="/sandbox" className="btn btn--secondary">Try a Sandbox</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CreatorDashboard;
