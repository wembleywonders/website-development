// src/components/workshops/WorkshopCard.tsx
import React from 'react';
import { Clock, Users, MapPin, Calendar, ExternalLink } from 'lucide-react';
import './WorkshopCard.css';

interface Workshop {
  id: string;
  title: string;
  framework: 'CONNECT' | 'CREATE' | 'CULTIVATE' | 'COMPETE' | 'CELEBRATE';
  type: 'workshop' | 'programme' | 'event' | 'drop-in';
  duration: string;
  schedule: string;
  capacity: number;
  currentBookings: number;
  facilitator: string;
  description: string;
  mediaOutputs: ('raydyo' | 'joystick' | 'portfolio' | 'showcase')[];
  shopIntegration?: string;
  nextSession?: Date;
  status: 'active' | 'full' | 'upcoming' | 'ended';
}

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return { color: '#10b981', text: 'Active' };
      case 'full': return { color: '#ef4444', text: 'Full' };
      case 'upcoming': return { color: '#f59e0b', text: 'Upcoming' };
      case 'ended': return { color: '#64748b', text: 'Ended' };
      default: return { color: '#64748b', text: 'Unknown' };
    }
  };

  const statusBadge = getStatusBadge(workshop.status);
  const frameworkColor = getFrameworkColor(workshop.framework);
  const availableSpaces = workshop.capacity - workshop.currentBookings;

  return (
    <div className="workshop-card" style={{ borderLeftColor: frameworkColor }}>
      <div className="workshop-card-header">
        <div className="workshop-title-section">
          <h3>{workshop.title}</h3>
          <div className="workshop-badges">
            <span 
              className="framework-badge" 
              style={{ backgroundColor: `${frameworkColor}20`, color: frameworkColor }}
            >
              {workshop.framework}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: `${statusBadge.color}20`, color: statusBadge.color }}
            >
              {statusBadge.text}
            </span>
            <span className="type-badge">{workshop.type}</span>
          </div>
        </div>
      </div>

      <p className="workshop-description">{workshop.description}</p>

      <div className="workshop-details">
        <div className="detail-item">
          <Clock size={16} />
          <span>{workshop.schedule}</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} />
          <span>{workshop.duration}</span>
        </div>
        <div className="detail-item">
          <Users size={16} />
          <span>{workshop.currentBookings}/{workshop.capacity} participants</span>
        </div>
        <div className="detail-item">
          <MapPin size={16} />
          <span>{workshop.facilitator}</span>
        </div>
      </div>

      <div className="workshop-capacity">
        <div className="capacity-bar">
          <div 
            className="capacity-fill" 
            style={{ 
              width: `${(workshop.currentBookings / workshop.capacity) * 100}%`,
              backgroundColor: workshop.status === 'full' ? '#ef4444' : frameworkColor
            }}
          ></div>
        </div>
        <span className="capacity-text">
          {availableSpaces > 0 ? `${availableSpaces} spaces available` : 'Fully booked'}
        </span>
      </div>

      <div className="workshop-outputs">
        <h4>Content Outputs</h4>
        <div className="output-tags">
          {workshop.mediaOutputs.map(output => (
            <span key={output} className={`output-tag ${output}`}>
              {output}
            </span>
          ))}
        </div>
      </div>

      {workshop.shopIntegration && (
        <div className="workshop-shop">
          <h4>Shop Integration</h4>
          <p>{workshop.shopIntegration}</p>
        </div>
      )}

      <div className="workshop-actions">
        {workshop.nextSession && (
          <div className="next-session">
            <Calendar size={14} />
            <span>Next: {workshop.nextSession.toLocaleDateString()}</span>
          </div>
        )}
        <button 
          className="workshop-book-btn"
          disabled={workshop.status === 'full' || workshop.status === 'ended'}
          style={{ backgroundColor: workshop.status === 'active' ? frameworkColor : '#64748b' }}
        >
          {workshop.status === 'active' ? 'Book Now' : 
           workshop.status === 'full' ? 'Join Waitlist' : 
           workshop.status === 'upcoming' ? 'Register Interest' : 'View Archive'}
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;