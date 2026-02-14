import React from 'react';
import { Clock, Bell, Calendar, Radio, Play } from 'lucide-react';
import './ComingUpNext.css';

interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  category: string;
  description: string;
}

interface ComingUpNextProps {
  upcomingPrograms: Program[];
  onSetReminder: (programId: string) => void;
}

export const ComingUpNext: React.FC<ComingUpNextProps> = ({ 
  upcomingPrograms, 
  onSetReminder 
}) => {
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch {
      return timeString;
    }
  };

  const formatDate = (timeString: string) => {
    try {
      const date = new Date(timeString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-GB', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch {
      return 'Unknown date';
    }
  };

  if (!upcomingPrograms?.length) {
    return (
      <section className="coming-up-next">
        <h2>Coming Up Next</h2>
        <div className="no-programs">
          <Radio size={48} />
          <p>Schedule is being updated. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="coming-up-next">
      <div className="section-header">
        <h2>Coming Up Next</h2>
        <div className="schedule-actions">
          <button className="view-schedule-btn">
            <Calendar size={16} />
            Full Schedule
          </button>
        </div>
      </div>

      <div className="programs-list">
        {upcomingPrograms.slice(0, 4).map((program) => (
          <div key={program.id} className="program-item">
            <div className="program-time">
              <div className="time-display">
                <Clock size={16} />
                <span className="time">{formatTime(program.startTime)}</span>
              </div>
              <div className="date-display">
                {formatDate(program.startTime)}
              </div>
            </div>

            <div className="program-info">
              <h4 className="program-title">{program.title}</h4>
              <p className="program-host">with {program.host}</p>
              <p className="program-description">{program.description}</p>
              <span className="program-category">{program.category}</span>
            </div>

            <div className="program-actions">
              <button 
                className="reminder-btn"
                onClick={() => onSetReminder(program.id)}
                title="Set reminder for this show"
              >
                <Bell size={16} />
              </button>
              <button className="preview-btn" title="Preview show">
                <Play size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="schedule-footer">
        <p>Times shown in your local timezone</p>
        <button className="notify-btn">
          <Bell size={16} />
          Get notified about new shows
        </button>
      </div>
    </section>
  );
};