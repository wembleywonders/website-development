import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid rgba(6, 182, 212, 0.2)',
              borderTopColor: '#06b6d4',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard-page">
      
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="dashboard-container">
          <div className="welcome-card">
            <h1 className="welcome-title">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="welcome-subtitle">
              Ready to continue your learning journey?
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="dashboard-stats">
        <div className="dashboard-container">
          <div className="stats-grid">
            
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3 className="stat-value">
                  {user.membershipStatus === 'ACTIVE' ? 'Active' : user.membershipStatus}
                </h3>
                <p className="stat-label">Membership Status</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <h3 className="stat-value">0</h3>
                <p className="stat-label">Certifications</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3 className="stat-value">0</h3>
                <p className="stat-label">Projects Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3 className="stat-value">0</h3>
                <p className="stat-label">Community Points</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dashboard-content">
        <div className="dashboard-container">
          
          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="action-grid">
              
              <button 
                className="action-card"
                onClick={() => navigate('/programmes')}
              >
                <span className="action-icon">🎓</span>
                <h3 className="action-title">Browse Programmes</h3>
                <p className="action-description">
                  Explore our learning pathways
                </p>
              </button>

              <button 
                className="action-card"
                onClick={() => navigate('/calendar')}
              >
                <span className="action-icon">📅</span>
                <h3 className="action-title">View Calendar</h3>
                <p className="action-description">
                  See upcoming events & workshops
                </p>
              </button>

              <button 
                className="action-card"
                onClick={() => navigate('/raydyo')}
              >
                <span className="action-icon">📻</span>
                <h3 className="action-title">Listen to Raydyo</h3>
                <p className="action-description">
                  Community radio & podcasts
                </p>
              </button>

              <button 
                className="action-card"
                onClick={() => navigate('/joystick')}
              >
                <span className="action-icon">📰</span>
                <h3 className="action-title">Read Joystick</h3>
                <p className="action-description">
                  Digital magazine & articles
                </p>
              </button>

            </div>
          </div>

          {/* Profile Section */}
          <div className="dashboard-section">
            <h2 className="section-title">Your Profile</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.firstName} />
                  ) : (
                    <span className="avatar-fallback">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  )}
                </div>
                <div className="profile-info">
                  <h3 className="profile-name">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="profile-email">{user.email}</p>
                  <p className="profile-role">
                    {user.role === 'MEMBER' ? '🎓 Member' : 
                     user.role === 'ORGANIZER' ? '👨‍🏫 Organizer' : 
                     user.role === 'ADMIN' ? '⚙️ Admin' : '👤 Visitor'}
                  </p>
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="profile-button secondary"
                  onClick={() => navigate('/profile')}
                >
                  Edit Profile
                </button>
                <button 
                  className="profile-button secondary"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
                <button 
                  className="profile-button danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="dashboard-section">
            <h2 className="section-title">Getting Started</h2>
            <div className="info-card">
              <h3 className="info-title">🚀 Welcome to Wembley Wonders!</h3>
              <p className="info-text">
                You're now part of a vibrant community dedicated to learning, 
                growth, and making an impact. Here's what you can do:
              </p>
              <ul className="info-list">
                <li>Browse our free learning programmes</li>
                <li>Join community events and workshops</li>
                <li>Connect with mentors and peers</li>
                <li>Listen to Raydyo podcasts and community radio</li>
                <li>Read Joystick digital magazine</li>
                <li>Earn certifications and build your portfolio</li>
              </ul>
              <button 
                className="info-button"
                onClick={() => navigate('/programmes')}
              >
                Explore Programmes →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;