// src/components/workshops/CalendarView.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';
import './CalendarView.css';

interface Workshop {
  id: string;
  title: string;
  framework: 'CONNECT' | 'CREATE' | 'CULTIVATE' | 'COMPETE' | 'CELEBRATE';
  type: 'workshop' | 'programme' | 'event' | 'drop-in';
  schedule: string;
  nextSession?: Date;
  currentBookings: number;
  capacity: number;
  status: 'active' | 'full' | 'upcoming' | 'ended';
}

interface CalendarViewProps {
  workshops: Workshop[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ workshops }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'CONNECT': return '#06b6d4';
      case 'CREATE': return '#10b981';
      case 'CULTIVATE': return '#f59e0b';
      case 'COMPETE': return '#ef4444';
      case 'CELEBRATE': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getMonthWorkshops = () => {
    return workshops.filter(workshop => {
      if (!workshop.nextSession) return false;
      const sessionDate = new Date(workshop.nextSession);
      return sessionDate.getMonth() === currentDate.getMonth() && 
             sessionDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const monthWorkshops = getMonthWorkshops();
  
  // Get calendar grid
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayWorkshops = monthWorkshops.filter(workshop => {
      if (!workshop.nextSession) return false;
      return new Date(workshop.nextSession).getDate() === day;
    });
    
    calendarDays.push({
      day,
      workshops: dayWorkshops,
      isToday: new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
    });
  }

  const monthName = currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={goToPreviousMonth} className="nav-button">
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>
          
          <div className="current-month">
            <h3>{monthName}</h3>
            <button onClick={goToToday} className="today-button">
              Today
            </button>
          </div>
          
          <button onClick={goToNextMonth} className="nav-button">
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="calendar-stats">
          <div className="stat-item">
            <Calendar size={16} />
            <span>{monthWorkshops.length} sessions this month</span>
          </div>
          <div className="stat-item">
            <Users size={16} />
            <span>{monthWorkshops.reduce((sum, w) => sum + w.currentBookings, 0)} participants</span>
          </div>
        </div>
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#06b6d4' }}></div>
          <span>Connect</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Create</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Cultivate</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Compete</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
          <span>Celebrate</span>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {calendarDays.map((dayData, index) => (
            <div 
              key={index} 
              className={`calendar-day ${!dayData ? 'empty' : ''} ${dayData?.isToday ? 'today' : ''}`}
            >
              {dayData && (
                <>
                  <div className="day-number">
                    {dayData.day}
                  </div>
                  <div className="day-workshops">
                    {dayData.workshops.map(workshop => (
                      <div 
                        key={workshop.id}
                        className="workshop-dot"
                        style={{ backgroundColor: getFrameworkColor(workshop.framework) }}
                        title={`${workshop.title} - ${workshop.framework}`}
                      >
                        <span className="workshop-dot-text">
                          {workshop.title.substring(0, 3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {monthWorkshops.length > 0 && (
        <div className="workshop-list-section">
          <h4>Workshops This Month</h4>
          <div className="workshop-sessions">
            {monthWorkshops
              .sort((a, b) => {
                if (!a.nextSession || !b.nextSession) return 0;
                return new Date(a.nextSession).getTime() - new Date(b.nextSession).getTime();
              })
              .map(workshop => (
                <div key={workshop.id} className="calendar-workshop-item">
                  <div className="workshop-date">
                    <span className="date-day">
                      {workshop.nextSession?.getDate()}
                    </span>
                    <span className="date-month">
                      {workshop.nextSession?.toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                  </div>
                  
                  <div className="workshop-info">
                    <h5>{workshop.title}</h5>
                    <div className="workshop-details-row">
                      <span className="workshop-schedule">
                        <Clock size={14} />
                        {workshop.schedule}
                      </span>
                      <span className="workshop-capacity">
                        <Users size={14} />
                        {workshop.currentBookings}/{workshop.capacity}
                      </span>
                      <span 
                        className="framework-badge"
                        style={{ 
                          backgroundColor: `${getFrameworkColor(workshop.framework)}20`,
                          color: getFrameworkColor(workshop.framework)
                        }}
                      >
                        {workshop.framework}
                      </span>
                    </div>
                  </div>
                  
                  <div className="workshop-status">
                    <span className={`status-indicator ${workshop.status}`}>
                      {workshop.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {monthWorkshops.length === 0 && (
        <div className="no-workshops">
          <Calendar size={48} />
          <h4>No workshops scheduled</h4>
          <p>There are no workshops scheduled for {monthName}.</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;