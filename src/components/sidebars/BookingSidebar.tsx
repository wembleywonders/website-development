import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { BookingButton } from '../booking/BookingButton';
import { CapacityIndicator } from '../booking/CapacityIndicator';
import { useCapacityManagement } from '../../hooks/booking/useCapacityManagement';
import { BookingEvent, MembershipLevel } from '../../types/booking';
import './BookingSidebar.css';

interface BookingSidebarProps {
  userMembership?: MembershipLevel;
  showFilters?: boolean;
  showSearch?: boolean;
  maxEvents?: number;
  onEventSelect?: (eventId: string) => void;
  className?: string;
}

export const BookingSidebar: React.FC<BookingSidebarProps> = ({
  userMembership = 'none',
  showFilters = true,
  showSearch = true,
  maxEvents = 5,
  onEventSelect,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  // Mock upcoming events - replace with actual data source
  const upcomingEvents: BookingEvent[] = [
    {
      id: 'workshop-digital-literacy',
      title: 'Digital Literacy Workshop',
      date: '2025-09-30',
      time: '10:00 AM',
      location: 'Community Hub',
      price: 'Free for Core Members',
      membershipRequired: 'core',
      capacity: {
        total: 20,
        booked: 15,
        available: 5,
        memberReserved: 3,
        waitlist: 2
      }
    },
    {
      id: 'cultural-storytelling',
      title: 'Auntie Anansi Storytelling',
      date: '2025-10-01',
      time: '2:00 PM',
      location: 'Cultural Center',
      price: '£5',
      membershipRequired: 'none',
      capacity: {
        total: 30,
        booked: 12,
        available: 18,
        waitlist: 0
      }
    },
    {
      id: 'wellness-session',
      title: 'Community Wellness Session',
      date: '2025-10-02',
      time: '6:00 PM',
      location: 'Wellness Center',
      price: 'Supporter Members Only',
      membershipRequired: 'supporter',
      capacity: {
        total: 15,
        booked: 14,
        available: 1,
        waitlist: 5
      }
    }
  ];

  const filterOptions = [
    { id: 'free', label: 'Free Events', count: 2 },
    { id: 'workshops', label: 'Workshops', count: 8 },
    { id: 'cultural', label: 'Cultural Events', count: 5 },
    { id: 'wellness', label: 'Wellness', count: 3 },
    { id: 'members-only', label: 'Members Only', count: 4 }
  ];

  const timeframeOptions = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'this-month', label: 'This Month' }
  ];

  const filteredEvents = upcomingEvents
    .filter(event => 
      searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, maxEvents);

  const handleEventClick = (eventId: string) => {
    if (onEventSelect) {
      onEventSelect(eventId);
    }
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className={`booking-sidebar ${className}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-icon">
          <Calendar className="icon" size={20} />
        </div>
        <div className="header-text">
          <h3 className="header-title">Quick Booking</h3>
          <p className="header-subtitle">Find and book events</p>
        </div>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="search-section">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Timeframe Selection */}
      <div className="timeframe-section">
        <div className="timeframe-tabs">
          {timeframeOptions.map(option => (
            <button
              key={option.id}
              className={`timeframe-tab ${selectedTimeframe === option.id ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="filters-section">
          <button
            className="filters-toggle"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <Filter className="filter-icon" size={16} />
            <span>Filters</span>
            {isFilterExpanded ? (
              <ChevronUp className="chevron-icon" size={16} />
            ) : (
              <ChevronDown className="chevron-icon" size={16} />
            )}
          </button>

          {isFilterExpanded && (
            <div className="filters-content">
              {filterOptions.map(filter => (
                <label key={filter.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter.id)}
                    onChange={() => toggleFilter(filter.id)}
                    className="filter-checkbox"
                  />
                  <span className="filter-label">{filter.label}</span>
                  <span className="filter-count">({filter.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Events List */}
      <div className="events-section">
        <div className="section-header">
          <h4 className="section-title">Upcoming Events</h4>
          <span className="events-count">{filteredEvents.length} events</span>
        </div>

        <div className="events-list">
          {filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h5 className="event-title">{event.title}</h5>
                <button
                  className="event-link"
                  onClick={() => handleEventClick(event.id)}
                >
                  View Details
                </button>
              </div>

              <div className="event-details">
                <div className="event-detail">
                  <Clock className="detail-icon" size={14} />
                  <span>{event.time}</span>
                </div>
                <div className="event-detail">
                  <MapPin className="detail-icon" size={14} />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="event-capacity">
                <CapacityIndicator 
                  capacity={event.capacity} 
                  variant="minimal"
                />
              </div>

              <div className="event-booking">
                <BookingButton
                  event={event}
                  userMembership={userMembership}
                  variant="compact"
                  showCapacity={false}
                />
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <Calendar className="no-events-icon" size={32} />
            <p className="no-events-text">No events found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn primary">
          <Calendar className="action-icon" size={16} />
          View Full Calendar
        </button>
        <button className="quick-action-btn secondary">
          <Users className="action-icon" size={16} />
          Join Membership
        </button>
      </div>

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
          <p className="membership-benefit">
            Join as a Core Member for free workshops and priority booking
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSidebar;