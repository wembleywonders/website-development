import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './KaywanasAtrium.css';

interface PerformanceProject {
  id: number;
  title: string;
  type: 'theatre' | 'dance' | 'music' | 'spoken-word' | 'multimedia';
  status: 'draft' | 'rehearsing' | 'ready' | 'performed';
  lastEdited: string;
  progress: number;
}

interface UpcomingShow {
  id: number;
  title: string;
  date: string;
  venue: string;
  spotsAvailable: number;
}

interface CourtMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
}

const KaywanasAtrium: React.FC = () => {
  const [activeProjects, setActiveProjects] = useState<PerformanceProject[]>([]);
  const [upcomingShows, setUpcomingShows] = useState<UpcomingShow[]>([]);
  const [courtMembers, setCourtMembers] = useState<CourtMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    // In production, this would fetch from your backend
    setTimeout(() => {
      setActiveProjects([
        {
          id: 1,
          title: "Anansi's Web",
          type: 'theatre',
          status: 'rehearsing',
          lastEdited: '2 hours ago',
          progress: 65
        },
        {
          id: 2,
          title: "Carnival Rhythms",
          type: 'dance',
          status: 'draft',
          lastEdited: '1 day ago',
          progress: 30
        }
      ]);

      setUpcomingShows([
        {
          id: 1,
          title: "Community Showcase Night",
          date: "Dec 15, 2024",
          venue: "Troubadour Wembley",
          spotsAvailable: 3
        }
      ]);

      setCourtMembers([
        {
          id: 1,
          name: "Maya",
          role: "Director",
          isOnline: true
        },
        {
          id: 2,
          name: "Alex",
          role: "Performer",
          isOnline: true
        },
        {
          id: 3,
          name: "Jordan",
          role: "Stage Manager",
          isOnline: false
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getProjectTypeIcon = (type: string) => {
    const icons = {
      theatre: '🎭',
      dance: '💃',
      music: '🎵',
      'spoken-word': '📖',
      multimedia: '🎬'
    };
    return icons[type as keyof typeof icons] || '🎨';
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: 'Draft', color: '#6B7280' },
      rehearsing: { label: 'Rehearsing', color: '#F59E0B' },
      ready: { label: 'Performance Ready', color: '#059669' },
      performed: { label: 'Performed', color: '#8B5CF6' }
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  if (loading) {
    return (
      <div className="kaywanas-atrium">
        <div className="atrium-loading">
          <div className="loading-spinner">🎭</div>
          <p>Entering Kaywana's Court...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kaywanas-atrium">
      {/* Header */}
      <header className="atrium-header">
        <div className="header-content">
          <div className="header-icon">🎭</div>
          <div className="header-text">
            <h1>Kaywana's Court</h1>
            <p className="header-tagline">Where Caribbean Stories Take the Stage</p>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/programmes/kaywanas-court" className="btn-secondary">
            Programme Overview
          </Link>
          <button className="btn-primary">
            ✨ Start New Performance
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="atrium-grid">
        {/* Active Projects */}
        <section className="atrium-section projects-section">
          <div className="section-header">
            <h2>Your Performance Projects</h2>
            <span className="section-count">{activeProjects.length}</span>
          </div>

          {activeProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎭</div>
              <p>No active projects yet</p>
              <button className="btn-primary-small">Create Your First Performance</button>
            </div>
          ) : (
            <div className="projects-list">
              {activeProjects.map(project => {
                const statusInfo = getStatusBadge(project.status);
                return (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <div className="project-type">
                        <span className="type-icon">
                          {getProjectTypeIcon(project.type)}
                        </span>
                        <span className="type-label">
                          {project.type.replace('-', ' ')}
                        </span>
                      </div>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: statusInfo.color }}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    <h3 className="project-title">{project.title}</h3>

                    <div className="project-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="progress-label">{project.progress}% complete</span>
                    </div>

                    <div className="project-footer">
                      <span className="last-edited">Edited {project.lastEdited}</span>
                      <div className="project-actions">
                        <button className="btn-icon" title="Open Production Planner">
                          📋
                        </button>
                        <button className="btn-icon" title="Rehearsal Schedule">
                          📅
                        </button>
                        <button className="btn-text">Continue →</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="atrium-section quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="quick-actions-grid">
            <Link to="/programmes/kaywanas-court/sandbox" className="quick-action-card">
              <div className="action-icon">📋</div>
              <h4>Production Planner</h4>
              <p>Plan your next performance from script to stage</p>
            </Link>

            <button className="quick-action-card">
              <div className="action-icon">🎤</div>
              <h4>Rehearsal Space</h4>
              <p>Book practice time and coordinate with cast</p>
            </button>

            <button className="quick-action-card">
              <div className="action-icon">📸</div>
              <h4>Media Gallery</h4>
              <p>Access photos, videos, and promotional materials</p>
            </button>

            <button className="quick-action-card">
              <div className="action-icon">💰</div>
              <h4>Revenue Tracker</h4>
              <p>Track ticket sales and performance earnings</p>
            </button>

            <Link to="/raydyo" className="quick-action-card">
              <div className="action-icon">📻</div>
              <h4>Rayd-yo Feature</h4>
              <p>Submit your performance for radio showcase</p>
            </Link>

            <Link to="/joystick" className="quick-action-card">
              <div className="action-icon">📖</div>
              <h4>Joystick Article</h4>
              <p>Write about your creative process</p>
            </Link>
          </div>
        </section>

        {/* Upcoming Shows */}
        <section className="atrium-section shows-section">
          <div className="section-header">
            <h2>Upcoming Shows</h2>
          </div>

          {upcomingShows.length === 0 ? (
            <div className="empty-state-small">
              <p>No upcoming showcases scheduled</p>
              <button className="btn-text">View Performance Calendar →</button>
            </div>
          ) : (
            <div className="shows-list">
              {upcomingShows.map(show => (
                <div key={show.id} className="show-card">
                  <div className="show-date">
                    <span className="date-icon">📅</span>
                    <span className="date-text">{show.date}</span>
                  </div>
                  <div className="show-details">
                    <h4 className="show-title">{show.title}</h4>
                    <p className="show-venue">📍 {show.venue}</p>
                    {show.spotsAvailable > 0 && (
                      <p className="show-spots">
                        ⭐ {show.spotsAvailable} performance spots available
                      </p>
                    )}
                  </div>
                  <button className="btn-primary-small">Submit Performance</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Court Community */}
        <section className="atrium-section community-section">
          <div className="section-header">
            <h2>Court Community</h2>
            <span className="online-count">
              🟢 {courtMembers.filter(m => m.isOnline).length} online
            </span>
          </div>

          <div className="members-list">
            {courtMembers.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-avatar">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {member.isOnline && <span className="online-indicator" />}
                </div>
                <div className="member-info">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                </div>
                <button className="btn-icon" title="Send message">💬</button>
              </div>
            ))}
          </div>

          <button className="btn-text-center">View All Court Members →</button>
        </section>

        {/* Resources & Learning */}
        <section className="atrium-section resources-section">
          <div className="section-header">
            <h2>Resources & Learning</h2>
          </div>

          <div className="resources-list">
            <Link to="/programmes/kaywanas-court/workshops" className="resource-item">
              <span className="resource-icon">🎓</span>
              <div className="resource-text">
                <h4>Performance Workshops</h4>
                <p>Upcoming classes and training sessions</p>
              </div>
            </Link>

            <Link to="/programmes/kaywanas-court/library" className="resource-item">
              <span className="resource-icon">📚</span>
              <div className="resource-text">
                <h4>Script Library</h4>
                <p>Caribbean stories and performance scripts</p>
              </div>
            </Link>

            <Link to="/programmes/kaywanas-court/mentors" className="resource-item">
              <span className="resource-icon">🎭</span>
              <div className="resource-text">
                <h4>Find a Mentor</h4>
                <p>Connect with experienced performers</p>
              </div>
            </Link>

            <Link to="/programmes/kaywanas-court/venues" className="resource-item">
              <span className="resource-icon">🏛️</span>
              <div className="resource-text">
                <h4>Venue Partners</h4>
                <p>Performance spaces across Wembley</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Heritage Connection */}
        <section className="atrium-section heritage-section">
          <div className="heritage-card">
            <div className="heritage-icon">🕷️</div>
            <div className="heritage-content">
              <h3>Anansi's Wisdom</h3>
              <p className="heritage-quote">
                "Every performance is a thread in the web of our shared story. 
                Your voice on stage carries the echoes of ancestors and shapes the dreams of generations to come."
              </p>
              <button className="btn-text">Explore Caribbean Performance Heritage →</button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Quick Links */}
      <footer className="atrium-footer">
        <div className="footer-links">
          <Link to="/programmes/kaywanas-court/booking">Book Rehearsal Space</Link>
          <span className="separator">•</span>
          <Link to="/programmes/kaywanas-court/calendar">Performance Calendar</Link>
          <span className="separator">•</span>
          <Link to="/programmes/kaywanas-court/equipment">Equipment Library</Link>
          <span className="separator">•</span>
          <Link to="/programmes/kaywanas-court/feedback">Submit Feedback</Link>
        </div>
      </footer>
    </div>
  );
};

export default KaywanasAtrium;