import React, { useState } from 'react';
import { 
  Wrench, 
  Users, 
  Clock, 
  Award, 
  BookOpen, 
  Monitor, 
  Heart,
  Lightbulb,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp
} from 'lucide-react';
import { BookingButton } from '../booking/BookingButton';
import { CapacityIndicator } from '../booking/CapacityIndicator';
import { BookingEvent, MembershipLevel } from '../../types/booking';
import './WorkshopsSidebar.css';

interface WorkshopsSidebarProps {
  userMembership?: MembershipLevel;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
  showPersonalizedRecommendations?: boolean;
  className?: string;
}

export const WorkshopsSidebar: React.FC<WorkshopsSidebarProps> = ({
  userMembership = 'none',
  selectedCategory = 'all',
  onCategorySelect,
  showPersonalizedRecommendations = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'recommended']);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const workshopCategories = [
    {
      id: 'digital-literacy',
      name: 'Digital Literacy',
      icon: Monitor,
      count: 12,
      color: '#06b6d4',
      description: 'Computer skills, internet safety, digital tools'
    },
    {
      id: 'creative-arts',
      name: 'Creative Arts',
      icon: Lightbulb,
      count: 8,
      color: '#8b5cf6',
      description: 'Crafts, storytelling, music, visual arts'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      icon: Heart,
      count: 6,
      color: '#10b981',
      description: 'Mental health, physical fitness, nutrition'
    },
    {
      id: 'life-skills',
      name: 'Life Skills',
      icon: BookOpen,
      count: 10,
      color: '#f59e0b',
      description: 'Financial literacy, cooking, home maintenance'
    },
    {
      id: 'community',
      name: 'Community Engagement',
      icon: Users,
      count: 5,
      color: '#ef4444',
      description: 'Leadership, volunteering, civic participation'
    }
  ];

  const upcomingWorkshops: BookingEvent[] = [
    {
      id: 'excel-basics',
      title: 'Excel Basics for Beginners',
      date: '2025-09-30',
      time: '2:00 PM',
      location: 'Computer Lab',
      price: 'Free for Core Members',
      membershipRequired: 'core',
      capacity: {
        total: 12,
        booked: 8,
        available: 4,
        memberReserved: 2
      }
    },
    {
      id: 'storytelling-workshop',
      title: 'Digital Storytelling',
      date: '2025-10-02',
      time: '10:00 AM',
      location: 'Creative Studio',
      price: '£8',
      membershipRequired: 'none',
      capacity: {
        total: 15,
        booked: 12,
        available: 3
      }
    },
    {
      id: 'mindfulness-session',
      title: 'Mindfulness & Meditation',
      date: '2025-10-03',
      time: '6:00 PM',
      location: 'Wellness Room',
      price: 'Supporter Members Only',
      membershipRequired: 'supporter',
      capacity: {
        total: 8,
        booked: 6,
        available: 2,
        waitlist: 3
      }
    }
  ];

  const personalizedRecommendations = [
    {
      id: 'recommended-1',
      title: 'Introduction to Social Media Safety',
      reason: 'Based on your digital literacy interests',
      match: 85,
      date: '2025-10-05',
      time: '11:00 AM'
    },
    {
      id: 'recommended-2',
      title: 'Community Leadership Skills',
      reason: 'Perfect for developing civic engagement',
      match: 78,
      date: '2025-10-07',
      time: '1:00 PM'
    }
  ];

  const skillLevels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: '1-2 hours' },
    { id: 'medium', label: '3-4 hours' },
    { id: 'long', label: 'Full day' },
    { id: 'multi', label: 'Multi-session' }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <div className={`workshops-sidebar ${className}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-icon">
          <Wrench className="icon" size={20} />
        </div>
        <div className="header-text">
          <h3 className="header-title">Workshop Explorer</h3>
          <p className="header-subtitle">Learn new skills</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search workshops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Personalized Recommendations */}
      {showPersonalizedRecommendations && userMembership !== 'none' && (
        <div className="recommendations-section">
          <button
            className="section-toggle"
            onClick={() => toggleSection('recommended')}
          >
            <Star className="section-icon" size={16} />
            <span className="section-title">Recommended for You</span>
            {expandedSections.includes('recommended') ? (
              <ChevronUp className="chevron-icon" size={16} />
            ) : (
              <ChevronDown className="chevron-icon" size={16} />
            )}
          </button>

          {expandedSections.includes('recommended') && (
            <div className="recommendations-content">
              {personalizedRecommendations.map(rec => (
                <div key={rec.id} className="recommendation-card">
                  <div className="rec-header">
                    <div className="rec-match">
                      <TrendingUp className="match-icon" size={14} />
                      <span className="match-percent">{rec.match}% match</span>
                    </div>
                  </div>
                  
                  <h5 className="rec-title">{rec.title}</h5>
                  <p className="rec-reason">{rec.reason}</p>
                  
                  <div className="rec-details">
                    <Clock className="detail-icon" size={12} />
                    <span>{rec.date} at {rec.time}</span>
                  </div>
                  
                  <button className="rec-action-btn">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Workshop Categories */}
      <div className="categories-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('categories')}
        >
          <BookOpen className="section-icon" size={16} />
          <span className="section-title">Categories</span>
          {expandedSections.includes('categories') ? (
            <ChevronUp className="chevron-icon" size={16} />
          ) : (
            <ChevronDown className="chevron-icon" size={16} />
          )}
        </button>

        {expandedSections.includes('categories') && (
          <div className="categories-content">
            {workshopCategories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ '--category-color': category.color } as React.CSSProperties}
                >
                  <div className="category-header">
                    <div className="category-icon">
                      <IconComponent className="icon" size={18} />
                    </div>
                    <div className="category-info">
                      <h5 className="category-name">{category.name}</h5>
                      <span className="category-count">{category.count} workshops</span>
                    </div>
                  </div>
                  <p className="category-description">{category.description}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="filters-section">
        <button
          className="section-toggle"
          onClick={() => toggleSection('filters')}
        >
          <Filter className="section-icon" size={16} />
          <span className="section-title">Filters</span>
          {expandedSections.includes('filters') ? (
            <ChevronUp className="chevron-icon" size={16} />
          ) : (
            <ChevronDown className="chevron-icon" size={16} />
          )}
        </button>

        {expandedSections.includes('filters') && (
          <div className="filters-content">
            <div className="filter-group">
              <label className="filter-label">Skill Level</label>
              <select
                value={selectedSkillLevel}
                onChange={(e) => setSelectedSkillLevel(e.target.value)}
                className="filter-select"
              >
                {skillLevels.map(level => (
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
              <label className="filter-label">Membership</label>
              <div className="filter-checkboxes">
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Free for members</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Open to all</span>
                </label>
                <label className="checkbox-option">
                  <input type="checkbox" />
                  <span>Certification available</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Workshops */}
      <div className="upcoming-section">
        <div className="section-header">
          <h4 className="section-title">Next Workshops</h4>
          <span className="workshop-count">{upcomingWorkshops.length}</span>
        </div>

        <div className="workshops-list">
          {upcomingWorkshops.map(workshop => (
            <div key={workshop.id} className="workshop-card">
              <div className="workshop-header">
                <h5 className="workshop-title">{workshop.title}</h5>
                {workshop.membershipRequired !== 'none' && (
                  <div className="membership-badge">
                    <Award className="badge-icon" size={12} />
                    <span>Members</span>
                  </div>
                )}
              </div>

              <div className="workshop-details">
                <div className="workshop-detail">
                  <Clock className="detail-icon" size={14} />
                  <span>{workshop.time}</span>
                </div>
                <div className="workshop-detail">
                  <Users className="detail-icon" size={14} />
                  <span>{workshop.location}</span>
                </div>
              </div>

              <div className="workshop-capacity">
                <CapacityIndicator 
                  capacity={workshop.capacity} 
                  variant="minimal"
                />
              </div>

              <div className="workshop-booking">
                <BookingButton
                  event={workshop}
                  userMembership={userMembership}
                  variant="compact"
                  showCapacity={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn primary">
          <BookOpen className="action-icon" size={16} />
          Browse All Workshops
        </button>
        <button className="quick-action-btn secondary">
          <Award className="action-icon" size={16} />
          My Certificates
        </button>
      </div>

      {/* Progress Tracker (for members) */}
      {userMembership !== 'none' && (
        <div className="progress-section">
          <div className="section-header">
            <h4 className="section-title">Your Progress</h4>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-number">7</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Certificates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>

          <div className="recent-achievements">
            <h5 className="achievements-title">Recent Achievements</h5>
            <div className="achievement-item">
              <Award className="achievement-icon" size={16} />
              <span>Digital Literacy Fundamentals</span>
            </div>
            <div className="achievement-item">
              <Award className="achievement-icon" size={16} />
              <span>Community Leadership Basics</span>
            </div>
          </div>
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
              <li>Free workshop access</li>
              <li>Priority booking</li>
              <li>Certificate programs</li>
            </ul>
            <button className="join-btn">Join Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopsSidebar;