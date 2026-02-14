import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Clock, 
  Award, 
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BookingButton } from '../booking/BookingButton';
import { CapacityIndicator } from '../booking/CapacityIndicator';
import { BookingEvent, MembershipLevel } from '../../types/booking';
import './ProgrammesSidebar.css';

interface ProgrammesSidebarProps {
  userMembership?: MembershipLevel;
  selectedProgramme?: string;
  onProgrammeSelect?: (programmeId: string) => void;
  showProgressTracking?: boolean;
  className?: string;
}

export const ProgrammesSidebar: React.FC<ProgrammesSidebarProps> = ({
  userMembership = 'none',
  selectedProgramme = '',
  onProgrammeSelect,
  showProgressTracking = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['featured', 'my-programmes']);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const featuredProgrammes = [
    {
      id: 'digital-literacy-pathway',
      title: 'Digital Literacy Pathway',
      description: 'Complete journey from basic computer skills to advanced digital confidence',
      level: 'Beginner to Intermediate',
      duration: '12 weeks',
      modules: 8,
      participants: 156,
      rating: 4.8,
      nextStart: '2025-10-15',
      membershipRequired: 'core' as MembershipLevel,
      price: 'Free for Core Members',
      spots: {
        total: 25,
        available: 8,
        waitlist: 3
      },
      color: '#06b6d4'
    },
    {
      id: 'community-leadership',
      title: 'Community Leadership Development',
      description: 'Build skills for effective community organizing and civic engagement',
      level: 'Intermediate',
      duration: '16 weeks',
      modules: 12,
      participants: 89,
      rating: 4.9,
      nextStart: '2025-11-01',
      membershipRequired: 'supporter' as MembershipLevel,
      price: 'Supporter Members Only',
      spots: {
        total: 15,
        available: 4,
        waitlist: 7
      },
      color: '#8b5cf6'
    },
    {
      id: 'creative-storytelling',
      title: 'Creative Storytelling & Media',
      description: 'Express your voice through digital storytelling, podcasting, and content creation',
      level: 'All Levels',
      duration: '8 weeks',
      modules: 6,
      participants: 203,
      rating: 4.7,
      nextStart: '2025-10-08',
      membershipRequired: 'none' as MembershipLevel,
      price: '£45',
      spots: {
        total: 20,
        available: 12,
        waitlist: 0
      },
      color: '#10b981'
    }
  ];

  const myProgrammes = [
    {
      id: 'current-digital',
      title: 'Digital Literacy Pathway',
      status: 'in-progress',
      progress: 65,
      currentModule: 'Module 5: Internet Safety',
      nextSession: '2025-09-30 at 2:00 PM',
      completed: 5,
      total: 8
    },
    {
      id: 'completed-wellness',
      title: 'Wellness & Self-Care',
      status: 'completed',
      progress: 100,
      completedDate: '2025-08-15',
      certificateEarned: true,
      rating: 5
    }
  ];

  const upcomingSessions: BookingEvent[] = [
    {
      id: 'session-internet-safety',
      title: 'Internet Safety & Privacy',
      date: '2025-09-30',
      time: '2:00 PM',
      location: 'Computer Lab',
      price: 'Included in Programme',
      membershipRequired: 'core',
      capacity: {
        total: 25,
        booked: 18,
        available: 7
      }
    },
    {
      id: 'session-storytelling-intro',
      title: 'Introduction to Digital Storytelling',
      date: '2025-10-01',
      time: '10:00 AM',
      location: 'Creative Studio',
      price: 'Included in Programme',
      membershipRequired: 'none',
      capacity: {
        total: 20,
        booked: 15,
        available: 5
      }
    }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: '4-6 weeks' },
    { id: 'medium', label: '8-12 weeks' },
    { id: 'long', label: '16+ weeks' }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleProgrammeClick = (programmeId: string) => {
    if (onProgrammeSelect) {
      onProgrammeSelect(programmeId);
    }
  };

  return (
    <div className={`programmes-sidebar ${className}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-icon">
          <GraduationCap className="icon" size={20} />
        </div>
        <div className="header-text">
          <h3 className="header-title">Programme Navigator</h3>
          <p className="header-subtitle">Long-term learning pathways</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search programmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* My Programmes (for members) */}
      {userMembership !== 'none' && showProgressTracking && (
        <div className="my-programmes-section">
          <button
            className="section-toggle"
            onClick={() => toggleSection('my-programmes')}
          >
            <Target className="section-icon" size={16} />
            <span className="section-title">My Programmes</span>
            {expandedSections.includes('my-programmes') ? (
              <ChevronUp className="chevron-icon" size={16} />
            ) : (
              <ChevronDown className="chevron-icon" size={16} />
            )}
          </button>

          {expandedSections.includes('my-programmes') && (
            <div className="my-programmes-content">
              {myProgrammes.map(programme => (
                <div key={programme.id} className={`my-programme-card ${programme.status}`}>
                  {programme.status === 'in-progress' ? (
                    <>
                      <div className="programme-header">
                        <h5 className="programme-title">{programme.title}</h5>
                        <div className="status-badge in-progress">
                          <Clock className="status-icon" size={12} />
                          <span>In Progress</span>
                        </div>
                      </div>

                      <div className="progress-section">
                        <div className="progress-info">
                          <span className="progress-text">
                            Module {programme.completed}/{programme.total}
                          </span>
                          <span className="progress-percent">{programme.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${programme.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="current-module">
                        <p className="module-title">{programme.currentModule}</p>
                        <p className="next-session">Next: {programme.nextSession}</p>
                      </div>

                      <button className="continue-btn">
                        <ArrowRight className="btn-icon" size={16} />
                        Continue Learning
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="programme-header">
                        <h5 className="programme-title">{programme.title}</h5>
                        <div className="status-badge completed">
                          <CheckCircle className="status-icon" size={12} />
                          <span>Completed</span>
                        </div>
                      </div>

                      <div className="completion-info">
                        <p className="completion-date">
                          Completed on {programme.completedDate}
                        </p>
                        {programme.certificateEarned && (
                          <div className="certificate-earned">
                            <Award className="cert-icon" size={16} />
                            <span>Certificate Earned</span>
                          </div>
                        )}
                      </div>

                      <div className="rating-section">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`star ${i < programme.rating! ? 'filled' : ''}`}
                              size={14}
                            />
                          ))}
                        </div>
                        <span className="rating-text">Your rating</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Featured Programmes */}
      <div className="featured-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('featured')}
        >
          <Star className="section-icon" size={16} />
          <span className="section-title">Featured Programmes</span>
          {expandedSections.includes('featured') ? (
            <ChevronUp className="chevron-icon" size={16} />
          ) : (
            <ChevronDown className="chevron-icon" size={16} />
          )}
        </button>

        {expandedSections.includes('featured') && (
          <div className="featured-content">
            {featuredProgrammes.map(programme => (
              <div 
                key={programme.id} 
                className={`programme-card ${selectedProgramme === programme.id ? 'selected' : ''}`}
                style={{ '--programme-color': programme.color } as React.CSSProperties}
                onClick={() => handleProgrammeClick(programme.id)}
              >
                <div className="programme-header">
                  <h5 className="programme-title">{programme.title}</h5>
                  <div className="programme-rating">
                    <Star className="rating-star" size={14} />
                    <span className="rating-value">{programme.rating}</span>
                  </div>
                </div>

                <p className="programme-description">{programme.description}</p>

                <div className="programme-details">
                  <div className="detail-item">
                    <TrendingUp className="detail-icon" size={12} />
                    <span>{programme.level}</span>
                  </div>
                  <div className="detail-item">
                    <Clock className="detail-icon" size={12} />
                    <span>{programme.duration}</span>
                  </div>
                  <div className="detail-item">
                    <BookOpen className="detail-icon" size={12} />
                    <span>{programme.modules} modules</span>
                  </div>
                  <div className="detail-item">
                    <Users className="detail-icon" size={12} />
                    <span>{programme.participants} enrolled</span>
                  </div>
                </div>

                <div className="programme-availability">
                  <div className="availability-info">
                    <span className="next-start">Next start: {programme.nextStart}</span>
                    <CapacityIndicator 
                      capacity={{
                        total: programme.spots.total,
                        booked: programme.spots.total - programme.spots.available,
                        available: programme.spots.available,
                        waitlist: programme.spots.waitlist
                      }} 
                      variant="minimal"
                    />
                  </div>
                </div>

                <div className="programme-enrollment">
                  <BookingButton
                    event={{
                      id: programme.id,
                      title: programme.title,
                      date: programme.nextStart,
                      time: 'Programme Start',
                      location: 'Multiple Venues',
                      price: programme.price,
                      membershipRequired: programme.membershipRequired,
                      capacity: {
                        total: programme.spots.total,
                        booked: programme.spots.total - programme.spots.available,
                        available: programme.spots.available,
                        waitlist: programme.spots.waitlist
                      }
                    }}
                    userMembership={userMembership}
                    variant="compact"
                    showCapacity={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h4 className="section-title">Upcoming Sessions</h4>
          <span className="sessions-count">{upcomingSessions.length}</span>
        </div>

        <div className="sessions-list">
          {upcomingSessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <h5 className="session-title">{session.title}</h5>
                <div className="session-date">
                  <Calendar className="date-icon" size={12} />
                  <span>{session.date}</span>
                </div>
              </div>

              <div className="session-details">
                <div className="session-detail">
                  <Clock className="detail-icon" size={14} />
                  <span>{session.time}</span>
                </div>
                <div className="session-detail">
                  <Users className="detail-icon" size={14} />
                  <span>{session.location}</span>
                </div>
              </div>

              <div className="session-capacity">
                <CapacityIndicator 
                  capacity={session.capacity} 
                  variant="minimal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('filters')}
        >
          <Filter className="section-icon" size={16} />
          <span className="section-title">Programme Filters</span>
          {expandedSections.includes('filters') ? (
            <ChevronUp className="chevron-icon" size={16} />
          ) : (
            <ChevronDown className="chevron-icon" size={16} />
          )}
        </button>

        {expandedSections.includes('filters') && (
          <div className="filters-content">
            <div className="filter-group">
              <label className="filter-label">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="filter-select"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="filter-select"
              >
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Features</label>
              <div className="filter-checkboxes">
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Certification available</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Free for members</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Starting soon</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn primary">
          <BookOpen className="action-icon" size={16} />
          Browse All Programmes
        </button>
        <button className="quick-action-btn secondary">
          <Award className="action-icon" size={16} />
          My Certificates
        </button>
      </div>

      {/* Learning Goals (for members) */}
      {userMembership !== 'none' && (
        <div className="goals-section">
          <div className="section-header">
            <h4 className="section-title">Learning Goals</h4>
            <button className="edit-goals-btn">Edit</button>
          </div>

          <div className="goals-list">
            <div className="goal-item">
              <div className="goal-progress">
                <div className="progress-circle">
                  <span className="progress-text">3/5</span>
                </div>
              </div>
              <div className="goal-content">
                <h5 className="goal-title">Digital Confidence</h5>
                <p className="goal-description">Master essential computer skills</p>
              </div>
            </div>

            <div className="goal-item">
              <div className="goal-progress">
                <div className="progress-circle completed">
                  <CheckCircle className="check-icon" size={16} />
                </div>
              </div>
              <div className="goal-content">
                <h5 className="goal-title">Community Engagement</h5>
                <p className="goal-description">Learn leadership skills</p>
              </div>
            </div>
          </div>

          <button className="add-goal-btn">
            <Target className="btn-icon" size={16} />
            Add New Goal
          </button>
        </div>
      )}

      {/* Membership Status */}
      <div className="membership-status">
        <div className="status-indicator">
          <div className={`status-dot ${userMembership}`}></div>
          <span className="status-text">
            {userMembership === 'none' ? 'Visitor' : 
             userMembership === 'core' ? 'Core Member' : 'Supporter Member'}
          </span>
        </div>
        {userMembership === 'none' && (
          <div className="membership-benefits">
            <p className="benefit-text">Join as a Core Member for:</p>
            <ul className="benefits-list">
              <li>Free programme access</li>
              <li>Priority enrollment</li>
              <li>Progress tracking</li>
              <li>Certificate programs</li>
            </ul>
            <button className="join-btn">Join Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammesSidebar;
            