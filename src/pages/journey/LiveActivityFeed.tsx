import React, { useState, useEffect } from 'react';
import './LiveActivityFeed.css';

interface Activity {
  id: string;
  type: 'live' | 'new' | 'achievement';
  icon: string;
  message: string;
  timestamp: Date;
}

const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Demo activities (replace with real API data)
  const demoActivities: Activity[] = [
    {
      id: '1',
      type: 'live',
      icon: '🔴',
      message: 'Sarah streaming on G-Tech Casters',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'new',
      icon: '✨',
      message: 'New episode on Raydyo - "The Forgotten 60%"',
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'achievement',
      icon: '🎉',
      message: 'Marcus completed STEMgeneers programme',
      timestamp: new Date(),
    },
    {
      id: '4',
      type: 'live',
      icon: '🎙️',
      message: 'Podcast recording live in The Lab',
      timestamp: new Date(),
    },
    {
      id: '5',
      type: 'new',
      icon: '📰',
      message: 'New article in Joystick E-Zine',
      timestamp: new Date(),
    },
    {
      id: '6',
      type: 'achievement',
      icon: '🏆',
      message: 'Team Innovators won the Tech Challenge',
      timestamp: new Date(),
    },
  ];

  useEffect(() => {
    setActivities(demoActivities);
  }, []);

  // Auto-rotate activities
  useEffect(() => {
    if (activities.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [activities.length, isPaused]);

  if (activities.length === 0) return null;

  const currentActivity = activities[currentIndex];

  return (
    <div 
      className="live-activity-feed"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="activity-content">
        <span className={`activity-icon ${currentActivity.type}`}>
          {currentActivity.icon}
        </span>
        <span className="activity-message">{currentActivity.message}</span>
      </div>

      {/* Progress dots */}
      <div className="activity-indicators">
        {activities.map((_, index) => (
          <button
            key={index}
            className={`activity-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show activity ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause/Play */}
      <button
        className="activity-pause-btn"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Resume activity feed' : 'Pause activity feed'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  );
};

export default LiveActivityFeed;
