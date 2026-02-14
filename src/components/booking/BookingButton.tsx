import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { CapacityIndicator, CapacityData } from './CapacityIndicator';
import './BookingButton.css';

export interface BookingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  membershipRequired?: 'none' | 'core' | 'supporter';
  capacity: CapacityData;
}

interface BookingButtonProps {
  event: BookingEvent;
  userMembership?: 'none' | 'core' | 'supporter';
  variant?: 'primary' | 'secondary' | 'compact';
  showCapacity?: boolean;
  onBookingAttempt?: (eventId: string, action: 'book' | 'waitlist' | 'membership') => void;
  className?: string;
}

export const BookingButton: React.FC<BookingButtonProps> = ({
  event,
  userMembership = 'none',
  variant = 'primary',
  showCapacity = true,
  onBookingAttempt,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const { capacity, membershipRequired = 'none' } = event;
  const { available, waitlist = 0 } = capacity;

  // Determine if user can book based on membership
  const canUserBook = () => {
    if (membershipRequired === 'none') return true;
    if (membershipRequired === 'core' && (userMembership === 'core' || userMembership === 'supporter')) return true;
    if (membershipRequired === 'supporter' && userMembership === 'supporter') return true;
    return false;
  };

  // Determine button state and actions
  const getButtonConfig = () => {
    const hasAccess = canUserBook();
    
    if (!hasAccess) {
      return {
        action: 'membership' as const,
        text: `Join as ${membershipRequired === 'core' ? 'Core Member' : 'Supporter'}`,
        subtitle: 'Membership required',
        disabled: false,
        variant: 'membership',
        icon: Users
      };
    }

    if (available === 0) {
      if (waitlist > 0) {
        return {
          action: 'waitlist' as const,
          text: 'Join Waitlist',
          subtitle: `${waitlist} people waiting`,
          disabled: false,
          variant: 'waitlist',
          icon: Clock
        };
      } else {
        return {
          action: 'book' as const,
          text: 'Fully Booked',
          subtitle: 'No spaces available',
          disabled: true,
          variant: 'disabled',
          icon: AlertCircle
        };
      }
    }

    if (available <= 3) {
      return {
        action: 'book' as const,
        text: 'Book Now',
        subtitle: `Only ${available} left!`,
        disabled: false,
        variant: 'urgent',
        icon: Calendar
      };
    }

    return {
      action: 'book' as const,
      text: 'Book Now',
      subtitle: event.price,
      disabled: false,
      variant: 'available',
      icon: Calendar
    };
  };

  const buttonConfig = getButtonConfig();
  const ButtonIcon = buttonConfig.icon;

  const handleClick = async () => {
    if (buttonConfig.disabled || isLoading) return;

    setIsLoading(true);
    setBookingState('processing');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onBookingAttempt) {
        onBookingAttempt(event.id, buttonConfig.action);
      }
      
      setBookingState('success');
      setTimeout(() => setBookingState('idle'), 2000);
    } catch (error) {
      setBookingState('error');
      setTimeout(() => setBookingState('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`booking-button-container compact ${className}`}>
        {showCapacity && (
          <CapacityIndicator capacity={capacity} variant="inline" />
        )}
        <button
          className={`booking-btn compact ${buttonConfig.variant} ${bookingState}`}
          onClick={handleClick}
          disabled={buttonConfig.disabled || isLoading}
        >
          {isLoading ? (
            <Loader className="btn-icon spinning" size={16} />
          ) : bookingState === 'success' ? (
            <CheckCircle className="btn-icon" size={16} />
          ) : (
            <ButtonIcon className="btn-icon" size={16} />
          )}
          <span className="btn-text">{buttonConfig.text}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`booking-button-container ${variant} ${className}`}>
      {showCapacity && (
        <CapacityIndicator 
          capacity={capacity} 
          variant={variant === 'primary' ? 'detailed' : 'minimal'}
          showDetails={variant === 'primary'}
        />
      )}
      
      <button
        className={`booking-btn ${variant} ${buttonConfig.variant} ${bookingState}`}
        onClick={handleClick}
        disabled={buttonConfig.disabled || isLoading}
      >
        <div className="btn-content">
          <div className="btn-main">
            {isLoading ? (
              <Loader className="btn-icon spinning" size={20} />
            ) : bookingState === 'success' ? (
              <CheckCircle className="btn-icon" size={20} />
            ) : bookingState === 'error' ? (
              <AlertCircle className="btn-icon" size={20} />
            ) : (
              <ButtonIcon className="btn-icon" size={20} />
            )}
            
            <div className="btn-text-container">
              <span className="btn-text">
                {bookingState === 'success' ? 'Booked!' : 
                 bookingState === 'error' ? 'Error - Try Again' :
                 buttonConfig.text}
              </span>
              {buttonConfig.subtitle && bookingState === 'idle' && (
                <span className="btn-subtitle">{buttonConfig.subtitle}</span>
              )}
            </div>
          </div>

          {variant === 'primary' && bookingState === 'idle' && (
            <div className="btn-details">
              <div className="event-detail">
                <Calendar className="detail-icon" size={14} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="event-detail">
                <Clock className="detail-icon" size={14} />
                <span>{event.time}</span>
              </div>
            </div>
          )}
        </div>
      </button>

      {membershipRequired !== 'none' && userMembership === 'none' && (
        <div className="membership-note">
          <AlertCircle className="note-icon" size={14} />
          <span>
            {membershipRequired === 'core' ? 'Core' : 'Supporter'} membership required
          </span>
        </div>
      )}
    </div>
  );
};

export default BookingButton;