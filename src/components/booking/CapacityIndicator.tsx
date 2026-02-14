import React from 'react';
import { Users, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import './CapacityIndicator.css';

export interface CapacityData {
  total: number;
  booked: number;
  available: number;
  waitlist?: number;
  memberReserved?: number;
  lastUpdated?: Date;
}

interface CapacityIndicatorProps {
  capacity: CapacityData;
  variant?: 'minimal' | 'inline' | 'detailed';
  showDetails?: boolean;
  className?: string;
}

export const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({
  capacity,
  variant = 'minimal',
  showDetails = false,
  className = ''
}) => {
  const { total, booked, available, waitlist = 0, memberReserved = 0 } = capacity;
  const bookedPercentage = (booked / total) * 100;
  const memberReservedPercentage = (memberReserved / total) * 100;

  // Determine status based on availability
  const getStatus = () => {
    if (available === 0) return 'full';
    if (available <= 3) return 'low';
    if (available <= total * 0.5) return 'moderate';
    return 'available';
  };

  const status = getStatus();

  // Status-specific icon and text
  const getStatusIcon = () => {
    switch (status) {
      case 'full':
        return <AlertCircle className="capacity-icon" size={16} />;
      case 'low':
        return <AlertCircle className="capacity-icon" size={16} />;
      case 'moderate':
        return <Users className="capacity-icon" size={16} />;
      case 'available':
        return <CheckCircle className="capacity-icon" size={16} />;
      default:
        return <Users className="capacity-icon" size={16} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'full':
        return waitlist > 0 ? `Full - ${waitlist} waiting` : 'Fully Booked';
      case 'low':
        return `Only ${available} left!`;
      case 'moderate':
        return `${available} spots available`;
      case 'available':
        return `${available} spots available`;
      default:
        return `${available} available`;
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={`capacity-indicator minimal ${status} ${className}`}>
        {getStatusIcon()}
        <span className="capacity-text">{getStatusText()}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`capacity-indicator inline ${status} ${className}`}>
        <div className="capacity-info">
          {getStatusIcon()}
          <span className="capacity-primary">{getStatusText()}</span>
          {waitlist > 0 && (
            <div className="capacity-waitlist">
              <Clock className="waitlist-icon" size={12} />
              <span>{waitlist} waiting</span>
            </div>
          )}
        </div>
        
        <div className="capacity-progress">
          <div className="capacity-bar inline">
            <div 
              className="capacity-fill"
              style={{ width: `${bookedPercentage}%` }}
            ></div>
            {memberReserved > 0 && (
              <div 
                className="member-reserved"
                style={{ width: `${memberReservedPercentage}%` }}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Detailed variant
  return (
    <div className={`capacity-indicator detailed ${status} ${className}`}>
      <div className="capacity-header">
        <div className="capacity-main">
          {getStatusIcon()}
          <span className="capacity-primary">{getStatusText()}</span>
        </div>
        {waitlist > 0 && (
          <div className="capacity-waitlist">
            <Clock className="waitlist-icon" size={14} />
            <span>{waitlist} waiting</span>
          </div>
        )}
      </div>

      <div className="capacity-progress">
        <div className="capacity-bar">
          <div 
            className="capacity-fill"
            style={{ width: `${bookedPercentage}%` }}
          ></div>
          {memberReserved > 0 && (
            <div 
              className="member-reserved"
              style={{ width: `${memberReservedPercentage}%` }}
            ></div>
          )}
        </div>
        
        <div className="capacity-labels">
          <span className="capacity-label">{booked} booked</span>
          {memberReserved > 0 && (
            <span className="member-label">{memberReserved} member reserved</span>
          )}
          <span className="capacity-label">{available} available</span>
        </div>
      </div>

      {showDetails && (
        <div className="capacity-breakdown">
          <div className="breakdown-item">
            <span className="breakdown-label">Total Capacity</span>
            <span className="breakdown-value">{total}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Currently Booked</span>
            <span className="breakdown-value">{booked}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Available Now</span>
            <span className="breakdown-value">{available}</span>
          </div>
          {memberReserved > 0 && (
            <div className="breakdown-item">
              <span className="breakdown-label">Member Reserved</span>
              <span className="breakdown-value">{memberReserved}</span>
            </div>
          )}
          {waitlist > 0 && (
            <div className="breakdown-item">
              <span className="breakdown-label">Waitlist</span>
              <span className="breakdown-value">{waitlist}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CapacityIndicator;