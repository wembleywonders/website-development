import React from 'react';
import { Radio, Clock, Users, MessageCircle } from 'lucide-react';
import type { Program } from '../../hooks/useProgramData';
import './LiveNowSection.css';

interface LiveNowSectionProps {
  currentProgram: Program | null;
  nextProgram: Program | null;
  isLive: boolean;
  listenerCount?: number;
}

const formatTime = (timeString: string): string => {
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

const calculateTimeUntil = (startTime: string): string => {
  try {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 0) return 'Starting soon';
    if (diffMins < 60) return `In ${diffMins} minutes`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `In ${hours}h ${mins}m`;
  } catch {
    return 'Soon';
  }
};

export const LiveNowSection: React.FC<LiveNowSectionProps> = ({ 
  currentProgram, 
  nextProgram, 
  isLive,
  listenerCount = 0
}) => {
  if (!isLive || !currentProgram) {
    return (
      <section className="live-now-section offline">
        <div className="live-container">
          <div className="offline-content">
            <Radio size={48} />
            <h2>Currently Offline</h2>
            <p>We'll be back with more community programming soon!</p>
            <button className="archive-btn">
              Explore Our Archive
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="live-now-section">
      <div className="live-container">
        {/* Current Program */}
        <div className="current-program">
          <div className="program-status">
            <div className="live-indicator">
              <div className="live-dot"></div>
              <span>LIVE NOW</span>
            </div>
            <div className="listener-info">
              <Users size={16} />
              <span>{listenerCount} listening</span>
            </div>
          </div>

          <div className="program-details">
            <h2 className="program-title">{currentProgram.title}</h2>
            <p className="program-host">with {currentProgram.host}</p>
            <p className="program-description">{currentProgram.description}</p>

            <div className="program-meta">
              <div className="program-time">
                <Clock size={14} />
                <span>
                  {formatTime(currentProgram.startTime)} - {formatTime(currentProgram.endTime)}
                </span>
              </div>
              
              <div className="program-tags">
                {currentProgram.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="program-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="program-actions">
            <button className="action-btn primary">
              <MessageCircle size={16} />
              Chat Live
            </button>
            <button className="action-btn secondary">
              Share Show
            </button>
            <button className="action-btn secondary">
              Request Song
            </button>
          </div>
        </div>

        {/* Next Program */}
        {nextProgram && (
          <div className="next-program">
            <div className="next-header">
              <h3>Coming Up Next</h3>
              <div className="time-until">
                {calculateTimeUntil(nextProgram.startTime)}
              </div>
            </div>
            
            <div className="next-content">
              <div className="next-artwork">
                {nextProgram.artwork ? (
                  <img src={nextProgram.artwork} alt={nextProgram.title} />
                ) : (
                  <div className="artwork-placeholder">
                    <Radio size={24} />
                  </div>
                )}
              </div>
              
              <div className="next-details">
                <h4 className="next-title">{nextProgram.title}</h4>
                <p className="next-host">with {nextProgram.host}</p>
                <p className="next-time">
                  {formatTime(nextProgram.startTime)} - {formatTime(nextProgram.endTime)}
                </p>
              </div>
              
              <button className="remind-btn">
                Set Reminder
              </button>
            </div>
          </div>
        )}

        {/* Community Engagement */}
        <div className="community-engagement">
          <h3>Get Involved</h3>
          <div className="engagement-grid">
            <div className="engagement-item">
              <strong>Call the Studio</strong>
              <span>0208 902 9991</span>
            </div>
            <div className="engagement-item">
              <strong>Text Us</strong>
              <span>Send "RAYDYO" to 66777</span>
            </div>
            <div className="engagement-item">
              <strong>Email</strong>
              <span>live@raydyo.community</span>
            </div>
            <div className="engagement-item">
              <strong>Social Media</strong>
              <span>@RaydyoCommunity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};