import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, RefreshCw } from 'lucide-react';
import { BookingButton } from '../booking/BookingButton';
import { CapacityIndicator } from '../booking/CapacityIndicator';
import { BookingEvent, MembershipLevel } from '../../types/booking';
import './WhatsOnWidget.css';

interface WhatsOnWidgetProps {
  maxEvents?: number;
  showCapacity?: boolean;
  variant?: 'minimal' | 'detailed' | 'compact';
  userMembership?: MembershipLevel;
  onBookingAttempt?: (eventId: string, action: 'book' | 'waitlist' | 'membership') => void;
  className?: string;
}

export const WhatsOnWidget: React.FC<WhatsOnWidgetProps> = ({
  maxEvents = 3,
  showCapacity = true,
  variant = 'detailed',
  userMembership = 'none',
  onBookingAttempt,
  className = ''
}) => {
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockEvents: BookingEvent[] = [
        {
          id: '1',
          title: 'Trubble n Bass Studio Session',
          date: '2025-09-28',
          time: '14:00 - 17:00',
          location: 'Main Studio',
          price: 'Member rate',
          category: 'music',
          type: 'programme',
          membershipRequired: 'core',
          capacity: {
            total: 8,
            booked: 5,
            available: 3,
            memberReserved: 2
          }
        },
        {
          id: '2',
          title: 'Writing Circle Drop-in',
          date: '2025-09-29',
          time: '10:00 - 12:00',
          location: 'Creative Space',
          price: '£5',
          category: 'creative',
          type: 'workshop',
          membershipRequired: 'none',
          capacity: {
            total: 12,
            booked: 4,
            available: 8
          }
        },
        {
          id: '3',
          title: 'Community Social Meetup',
          date: '2025-09-30',
          time: '19:00 - 21:00',
          location: 'Community Hub',
          price: 'Free',
          category: 'social',
          type: 'social',
          membershipRequired: 'none',
          capacity: {
            total: 25,
            booked: 18,
            available: 7
          }
        }
      ];

      setEvents(mockEvents.slice(0, maxEvents));
      setLastUpdated(new Date());
      setLoading(false);
    };

    fetchEvents();
  }, [maxEvents]);

  const handleRefresh = async () => {
    setLoading(true);
    // Re-fetch events
    await new Promise(resolve => setTimeout(resolve, 300));
    setLastUpdated(new Date());
    setLoading(false);
  };

  const formatTimeUntilEvent = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffInHours = Math.round((event.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours <= 1 ? 'Starting soon' : `In ${diffInHours}h`;
    } else {
      const days = Math.round(diffInHours / 24);
      return `In ${days} day${days > 1 ? 's' : ''}`;
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`whats-on-widget minimal ${className}`}>
        <div className="widget-header">
          <h3>What's On Now</h3>
          <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
            <RefreshCw className={`refresh-icon ${loading ? 'spinning' : ''}`} size={16} />
          </button>
        </div>
        
        <div className="events-count">
          {loading ? (
            <div className="loading-placeholder">Loading events...</div>
          ) : (
            <span>{events.length} upcoming events</span>
          )}
        </div>
        
        <button className="view-all-btn">
          View All Events <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`whats-on-widget compact ${className}`}>
        <div className="widget-header">
          <h3>What's On</h3>
          <span className="last-updated">
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {loading ? (
          <div className="loading-events">
            {[1, 2].map(i => (
              <div key={i} className="event-skeleton" />
            ))}
          </div>
        ) : (
          <div className="compact-events">
            {events.slice(0, 2).map(event => (
              <div key={event.id} className="compact-event">
                <div className="event-info">
                  <span className="event-title">{event.title}</span>
                  <span className="event-time">{formatTimeUntilEvent(event.date)}</span>
                </div>
                {showCapacity && (
                  <CapacityIndicator capacity={event.capacity} variant="minimal" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Detailed variant (default)
  return (
    <div className={`whats-on-widget detailed ${className}`}>
      <div className="widget-header">
        <div className="header-main">
          <Calendar className="header-icon" size={20} />
          <h3>What's On Now</h3>
        </div>
        <div className="header-actions">
          <span className="last-updated">
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
            <RefreshCw className={`refresh-icon ${loading ? 'spinning' : ''}`} size={16} />
          </button>
        </div>
      </div>

      <div className="widget-content">
        {loading ? (
          <div className="loading-events">
            {Array.from({ length: maxEvents }).map((_, i) => (
              <div key={i} className="event-skeleton">
                <div className="skeleton-header" />
                <div className="skeleton-content" />
                <div className="skeleton-footer" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <Calendar className="no-events-icon" size={32} />
            <p>No upcoming events</p>
            <span>Check back later for new opportunities</span>
          </div>
        ) : (
          <div className="events-list">
            {events.map((event, index) => (
              <div key={event.id} className={`event-item ${event.category}`}>
                <div className="event-header">
                  <div className="event-badge">
                    <span className={`badge ${event.type}`}>{event.type}</span>
                    <span className="time-until">{formatTimeUntilEvent(event.date)}</span>
                  </div>
                </div>

                <div className="event-main">
                  <h4 className="event-title">{event.title}</h4>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <Clock className="detail-icon" size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin className="detail-icon" size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <Users className="detail-icon" size={14} />
                      <span>{event.capacity.available} spots left</span>
                    </div>
                  </div>
                </div>

                <div className="event-booking">
                  {showCapacity && (
                    <CapacityIndicator 
                      capacity={event.capacity} 
                      variant="inline"
                      className="event-capacity"
                    />
                  )}
                  
                  <BookingButton
                    event={event}
                    userMembership={userMembership}
                    variant="compact"
                    showCapacity={false}
                    onBookingAttempt={onBookingAttempt}
                    className="event-book-btn"
                  />
                </div>

                {index < events.length - 1 && <div className="event-divider" />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="widget-footer">
        <button className="view-all-btn">
          View Full Calendar <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default WhatsOnWidget;