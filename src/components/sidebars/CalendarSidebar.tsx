import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  Grid,
  List,
  Download,
  Share2
} from 'lucide-react';
import { BookingButton } from '../booking/BookingButton';
import { CapacityIndicator } from '../booking/CapacityIndicator';
import { BookingEvent, MembershipLevel } from '../../types/booking';
import './CalendarSidebar.css';

interface CalendarSidebarProps {
  userMembership?: MembershipLevel;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onViewChange?: (view: 'month' | 'week' | 'day' | 'list') => void;
  currentView?: 'month' | 'week' | 'day' | 'list';
  className?: string;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  userMembership = 'none',
  selectedDate = new Date(),
  onDateSelect,
  onViewChange,
  currentView = 'month',
  className = ''
}) => {
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);

  // Mock events for selected date
  const todaysEvents: BookingEvent[] = [
    {
      id: 'morning-workshop',
      title: 'Digital Skills Workshop',
      date: '2025-09-28',
      time: '10:00 AM',
      location: 'Tech Hub',
      price: 'Free for Core Members',
      membershipRequired: 'core',
      capacity: {
        total: 16,
        booked: 12,
        available: 4,
        memberReserved: 2
      }
    },
    {
      id: 'lunch-social',
      title: 'Community Lunch',
      date: '2025-09-28',
      time: '12:30 PM',
      location: 'Main Hall',
      price: '£3',
      membershipRequired: 'none',
      capacity: {
        total: 50,
        booked: 23,
        available: 27
      }
    }
  ];

  const upcomingEvents: BookingEvent[] = [
    {
      id: 'cultural-event',
      title: 'Cultural Celebration',
      date: '2025-09-29',
      time: '3:00 PM',
      location: 'Cultural Center',
      price: '£8',
      membershipRequired: 'none',
      capacity: {
        total: 100,
        booked: 67,
        available: 33
      }
    }
  ];

  const generateMiniCalendar = () => {
    const year = miniCalendarDate.getFullYear();
    const month = miniCalendarDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = currentDate.toDateString() === new Date().toDateString();
        const isSelected = currentDate.toDateString() === selectedDate.toDateString();
        
        weekDays.push({
          date: new Date(currentDate),
          day: currentDate.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          hasEvents: Math.random() > 0.7 // Mock event indicator
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      days.push(weekDays);
    }
    
    return days;
  };

  const calendarDays = generateMiniCalendar();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(miniCalendarDate.getMonth() + (direction === 'next' ? 1 : -1));
    setMiniCalendarDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const viewOptions = [
    { id: 'month', icon: Grid, label: 'Month' },
    { id: 'week', icon: List, label: 'Week' },
    { id: 'day', icon: Clock, label: 'Day' },
    { id: 'list', icon: List, label: 'List' }
  ];

  return (
    <div className={`calendar-sidebar ${className}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="header-icon">
          <Calendar className="icon" size={20} />
        </div>
        <div className="header-text">
          <h3 className="header-title">Calendar Navigation</h3>
          <p className="header-subtitle">Quick access to events</p>
        </div>
      </div>

      {/* View Controls */}
      <div className="view-controls">
        <div className="view-buttons">
          {viewOptions.map(view => {
            const IconComponent = view.icon;
            return (
              <button
                key={view.id}
                className={`view-btn ${currentView === view.id ? 'active' : ''}`}
                onClick={() => onViewChange && onViewChange(view.id as any)}
              >
                <IconComponent className="view-icon" size={16} />
                <span className="view-label">{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="mini-calendar">
        <div className="calendar-header">
          <button 
            className="nav-btn"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="nav-icon" size={16} />
          </button>
          
          <h4 className="calendar-title">
            {monthNames[miniCalendarDate.getMonth()]} {miniCalendarDate.getFullYear()}
          </h4>
          
          <button 
            className="nav-btn"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="nav-icon" size={16} />
          </button>
        </div>

        <div className="calendar-grid">
          <div className="weekdays">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {calendarDays.map((week, weekIndex) => (
              <div key={weekIndex} className="calendar-week">
                {week.map((day, dayIndex) => (
                  <button
                    key={dayIndex}
                    className={`calendar-day ${
                      !day.isCurrentMonth ? 'other-month' : ''
                    } ${day.isToday ? 'today' : ''} ${
                      day.isSelected ? 'selected' : ''
                    } ${day.hasEvents ? 'has-events' : ''}`}
                    onClick={() => handleDateClick(day.date)}
                  >
                    <span className="day-number">{day.day}</span>
                    {day.hasEvents && <div className="event-dot"></div>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Events */}
      <div className="todays-events">
        <div className="section-header">
          <h4 className="section-title">Today's Events</h4>
          <span className="events-count">{todaysEvents.length}</span>
        </div>

        {todaysEvents.length > 0 ? (
          <div className="events-list">
            {todaysEvents.map(event => (
              <div key={event.id} className="event-card compact">
                <div className="event-time">
                  <Clock className="time-icon" size={14} />
                  <span>{event.time}</span>
                </div>
                
                <div className="event-content">
                  <h5 className="event-title">{event.title}</h5>
                  <div className="event-location">
                    <MapPin className="location-icon" size={12} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="event-actions">
                  <CapacityIndicator 
                    capacity={event.capacity} 
                    variant="minimal"
                  />
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
        ) : (
          <div className="no-events">
            <Calendar className="no-events-icon" size={24} />
            <p className="no-events-text">No events today</p>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events">
        <div className="section-header">
          <h4 className="section-title">This Week</h4>
          <button className="see-all-btn">See All</button>
        </div>

        <div className="events-list">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-card upcoming">
              <div className="event-date">
                <span className="date-day">
                  {new Date(event.date).getDate()}
                </span>
                <span className="date-month">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
              
              <div className="event-content">
                <h5 className="event-title">{event.title}</h5>
                <div className="event-details">
                  <div className="event-detail">
                    <Clock className="detail-icon" size={12} />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin className="detail-icon" size={12} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="event-booking-mini">
                <CapacityIndicator 
                  capacity={event.capacity} 
                  variant="minimal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="quick-action-btn primary">
          <Plus className="action-icon" size={16} />
          Create Event
        </button>
        
        <div className="action-row">
          <button className="quick-action-btn secondary">
            <Download className="action-icon" size={16} />
            Export
          </button>
          <button className="quick-action-btn secondary">
            <Share2 className="action-icon" size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Filters Toggle */}
      <div className="filters-toggle">
        <button
          className={`toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="filter-icon" size={16} />
          <span>Event Filters</span>
        </button>

        {showFilters && (
          <div className="filters-content">
            <div className="filter-group">
              <label className="filter-label">Event Type</label>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Workshops</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Cultural Events</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Wellness</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Membership</label>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Free Events</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Members Only</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Legend */}
      <div className="calendar-legend">
        <h5 className="legend-title">Legend</h5>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot low"></div>
            <span>Few spots left</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot full"></div>
            <span>Fully booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;