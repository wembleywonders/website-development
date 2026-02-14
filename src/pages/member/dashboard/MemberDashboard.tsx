// src/pages/member/dashboard/MemberDashboard.tsx
import React, { useState, useEffect } from 'react';
import HelperSupportROV from '../../../systems/rovs/personalities/helper/HelperSupportROV';
import './MemberDashboard.css';

interface MemberStats {
  connectionsMade: number;
  eventsAttended: number;
  skillsShared: number;
}

interface Member {
  firstName: string;
  lastName: string;
  memberTier: 'connector' | 'curator' | 'champion';
  building: string;
  memberSince: string;
  avatarInitials: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'event' | 'connection';
}

const MemberDashboard: React.FC = () => {
  const [member] = useState<Member>({
    firstName: 'Sarah',
    lastName: 'Chen',
    memberTier: 'curator',
    building: 'Luna Building',
    memberSince: 'Oct 2024',
    avatarInitials: 'SC'
  });

  const [stats] = useState<MemberStats>({
    connectionsMade: 127,
    eventsAttended: 15,
    skillsShared: 8
  });

  const [notifications] = useState<Notification[]>([
    { id: '1', message: 'New member joined your building', type: 'connection' },
    { id: '2', message: 'Event reminder: Tech Talk tomorrow', type: 'event' },
    { id: '3', message: 'Sarah shared a skill you requested', type: 'info' }
  ]);

  const [language, setLanguage] = useState('English');
  const [rovAvailable, setRovAvailable] = useState(true);

  const handleQuickAction = (action: string) => {
    console.log(`Navigating to: ${action}`);
    // Route to appropriate member section
    switch (action) {
      case 'Book Event':
        window.location.href = '/member/events';
        break;
      case 'Find Members':
        window.location.href = '/member/directory';
        break;
      case 'Share Skills':
        window.location.href = '/member/skills';
        break;
      case 'Start Project':
        window.location.href = '/member/projects';
        break;
    }
  };

  const handleROVHelp = () => {
    alert('Helper ROV activated! How can I assist you today?\n\n• Navigate portal simulators\n• Find community members\n• Understand service connections\n• Practice government forms');
  };

  const handleNotifications = () => {
    const notificationText = notifications.map(n => `• ${n.message}`).join('\n');
    alert(`Notifications:\n${notificationText}`);
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'connector': return 'Connector';
      case 'curator': return 'Curator'; 
      case 'champion': return 'Champion';
      default: return 'Member';
    }
  };

  return (
    <div className="member-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-welcome">
            <div className="user-avatar">{member.avatarInitials}</div>
            <div className="welcome-text">
              <h2>Welcome back, {member.firstName}</h2>
              <p className="member-status">
                {getTierDisplayName(member.memberTier)} Member • {member.building} • Member since {member.memberSince}
              </p>
            </div>
          </div>
          <div className="header-actions">
            <select 
              className="language-toggle"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Español">Español</option>
              <option value="Français">Français</option>
              <option value="中文">中文</option>
            </select>
            <button className="notification-bell" onClick={handleNotifications}>
              🔔
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        <main className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="quick-actions">
              {['Book Event', 'Find Members', 'Share Skills', 'Start Project'].map((action) => (
                <button 
                  key={action}
                  className="action-button" 
                  onClick={() => handleQuickAction(action)}
                >
                  <span className="action-icon">
                    {action === 'Book Event' && '📅'}
                    {action === 'Find Members' && '🤝'}
                    {action === 'Share Skills' && '💡'}
                    {action === 'Start Project' && '🎯'}
                  </span>
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Upcoming Community Events</h3>
              <button className="card-action">View All</button>
            </div>
            <ul className="event-list">
              <li className="event-item">
                <div className="event-details">
                  <h4>Tech Talk & Live Music</h4>
                  <p className="event-date">Saturday, March 15 • Methodist Hall • 7:00 PM</p>
                </div>
                <span className="event-status status-registered">Registered</span>
              </li>
              <li className="event-item">
                <div className="event-details">
                  <h4>Intergenerational LARP Session</h4>
                  <p className="event-date">Thursday, March 20 • Kaywana's Court • 6:30 PM</p>
                </div>
                <span className="event-status status-upcoming">Available</span>
              </li>
            </ul>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Your Network</h3>
              <button className="card-action">Expand</button>
            </div>
            <div className="connection-grid">
              {[
                { initials: 'MJ', name: 'Marcus', building: 'Solar' },
                { initials: 'AL', name: 'Anna', building: 'Repton' },
                { initials: 'RK', name: 'Raj', building: 'Madison' },
                { initials: 'EP', name: 'Elena', building: 'Luna' }
              ].map((connection, index) => (
                <div key={index} className="connection-avatar">
                  <div className="connection-pic">{connection.initials}</div>
                  <div className="connection-name">{connection.name}</div>
                  <div className="connection-building">{connection.building}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className="sidebar">
          <div className="sidebar-card community-stats">
            <h4>Community Impact</h4>
            <div className="stat-number">{stats.connectionsMade}</div>
            <div className="stat-label">Connections Made</div>
            <br />
            <div className="stat-number">{stats.eventsAttended}</div>
            <div className="stat-label">Events Attended</div>
            <br />
            <div className="stat-number">{stats.skillsShared}</div>
            <div className="stat-label">Skills Shared</div>
          </div>

          {rovAvailable && (
            <div className="sidebar-card help-section">
              <div className="rov-indicator">🤖</div>
              <h4>Helper ROV Available</h4>
              <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '15px'}}>
                Need assistance navigating services or connecting with members?
              </p>
              <button className="help-button" onClick={handleROVHelp}>
                Get Help Now
              </button>
            </div>
          )}

          <div className="sidebar-card">
            <h4 style={{marginBottom: '15px', color: '#2c3e50'}}>Portal Simulators</h4>
            <div className="portal-access">
              {[
                { icon: '🏠', name: 'Housing Portal', href: '/member/simulators#housing' },
                { icon: '🩺', name: 'Healthcare Portal', href: '/member/simulators#healthcare' },
                { icon: '🎓', name: 'Education Portal', href: '/member/simulators#education' },
                { icon: '🏛️', name: 'Government Portal', href: '/member/simulators#government' }
              ].map((portal, index) => (
                <a key={index} href={portal.href} className="portal-link">
                  <span>{portal.icon}</span>
                  <span>{portal.name}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MemberDashboard;