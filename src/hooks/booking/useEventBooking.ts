import { useState, useCallback, useRef } from 'react';
import { 
  BookingEvent, 
  BookingResponse, 
  BookingFormData, 
  BookingError, 
  BookingAttempt,
  MembershipLevel,
  BookingAction 
} from '../../types/booking';

interface UseEventBookingOptions {
  userMembership?: MembershipLevel;
  onBookingSuccess?: (response: BookingResponse) => void;
  onBookingError?: (error: BookingError) => void;
  onCapacityUpdate?: () => void;
}

interface UseEventBookingReturn {
  bookEvent: (eventId: string, formData?: Partial<BookingFormData>) => Promise<BookingResponse>;
  joinWaitlist: (eventId: string, formData?: Partial<BookingFormData>) => Promise<BookingResponse>;
  upgradeToMembership: (membershipLevel: MembershipLevel) => Promise<BookingResponse>;
  cancelBooking: (bookingId: string) => Promise<BookingResponse>;
  validateBooking: (event: BookingEvent) => BookingError | null;
  canUserBook: (event: BookingEvent) => boolean;
  calculatePrice: (event: BookingEvent) => { amount: number; currency: string; discounted?: boolean };
  loading: boolean;
  error: BookingError | null;
  lastBookingAttempt: BookingAttempt | null;
}

export const useEventBooking = (options: UseEventBookingOptions = {}): UseEventBookingReturn => {
  const {
    userMembership = 'none',
    onBookingSuccess,
    onBookingError,
    onCapacityUpdate
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BookingError | null>(null);
  const [lastBookingAttempt, setLastBookingAttempt] = useState<BookingAttempt | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  // Validate if user can book an event
  const canUserBook = useCallback((event: BookingEvent): boolean => {
    const { membershipRequired = 'none', capacity } = event;
    
    // Check capacity
    if (capacity.available === 0) {
      return false;
    }
    
    // Check membership requirements
    if (membershipRequired === 'none') {
      return true;
    }
    
    if (membershipRequired === 'core' && (userMembership === 'core' || userMembership === 'supporter')) {
      return true;
    }
    
    if (membershipRequired === 'supporter' && userMembership === 'supporter') {
      return true;
    }
    
    return false;
  }, [userMembership]);

  // Calculate event price based on membership
  const calculatePrice = useCallback((event: BookingEvent) => {
    const { price, membershipRequired = 'none' } = event;
    
    // Handle free events
    if (price.toLowerCase() === 'free' || price === '£0') {
      return { amount: 0, currency: 'GBP' };
    }
    
    // Handle member rate pricing
    if (price.toLowerCase() === 'member rate' || price.toLowerCase() === 'membership required') {
      if (userMembership === 'core') {
        return { amount: 0, currency: 'GBP', discounted: true };
      } else if (userMembership === 'supporter') {
        return { amount: 0, currency: 'GBP', discounted: true };
      } else {
        // Non-members pay full rate for member-only events
        return { amount: 15, currency: 'GBP' }; // Default non-member rate
      }
    }
    
    // Parse price string (e.g., "£5", "£10.50")
    const priceMatch = price.match(/£?(\d+(?:\.\d{2})?)/);
    const baseAmount = priceMatch ? parseFloat(priceMatch[1]) : 10; // Default fallback
    
    // Apply membership discounts
    let finalAmount = baseAmount;
    let isDiscounted = false;
    
    if (userMembership === 'core') {
      finalAmount = baseAmount * 0.8; // 20% discount
      isDiscounted = true;
    } else if (userMembership === 'supporter') {
      finalAmount = baseAmount * 0.7; // 30% discount
      isDiscounted = true;
    }
    
    return {
      amount: Math.round(finalAmount * 100) / 100, // Round to 2 decimal places
      currency: 'GBP',
      discounted: isDiscounted
    };
  }, [userMembership]);

  // Validate booking request
  const validateBooking = useCallback((event: BookingEvent): BookingError | null => {
    const { capacity, membershipRequired = 'none' } = event;
    
    // Check if event is in the past
    const eventDate = new Date(event.date);
    const now = new Date();
    if (eventDate < now) {
      return {
        code: 'EVENT_EXPIRED',
        message: 'Cannot book past events',
        userFriendlyMessage: 'This event has already occurred and cannot be booked.',
        suggestedActions: ['View upcoming events', 'Check the calendar for similar events']
      };
    }
    
    // Check capacity
    if (capacity.available === 0 && !capacity.waitlist) {
      return {
        code: 'EVENT_FULL',
        message: 'Event is fully booked with no waitlist',
        userFriendlyMessage: 'This event is fully booked and does not have a waitlist.',
        suggestedActions: ['Check for similar events', 'View upcoming dates']
      };
    }
    
    // Check membership requirements
    if (membershipRequired !== 'none' && !canUserBook(event)) {
      return {
        code: 'MEMBERSHIP_REQUIRED',
        message: `${membershipRequired} membership required`,
        userFriendlyMessage: `This event requires ${membershipRequired} membership to book.`,
        suggestedActions: [`Upgrade to ${membershipRequired} membership`, 'View membership options']
      };
    }
    
    return null;
  }, [canUserBook]);

  // Make API request
  const makeBookingRequest = useCallback(async (
    endpoint: string,
    data: any,
    action: BookingAction
  ): Promise<BookingResponse> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      
      // For demo purposes, simulate API responses
      console.warn('Using mock booking API. Replace with actual endpoints.');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different outcomes based on action
      if (Math.random() > 0.1) { // 90% success rate
        const mockResponse: BookingResponse = {
          success: true,
          bookingId: `booking_${Date.now()}`,
          message: action === 'book' ? 'Successfully booked!' : 
                   action === 'waitlist' ? 'Added to waitlist' : 
                   'Membership upgraded',
          nextSteps: action === 'book' ? 
            ['Check your email for confirmation', 'Add to calendar', 'Prepare for the event'] :
            action === 'waitlist' ?
            ['You will be notified if a spot becomes available', 'Check your email for updates'] :
            ['Access to member-only events', 'Enjoy your benefits'],
          ...(action === 'waitlist' && { waitlistPosition: Math.floor(Math.random() * 10) + 1 })
        };
        return mockResponse;
      } else {
        throw new Error('Booking failed due to server error');
      }
    }
  }, []);

  // Book an event
  const bookEvent = useCallback(async (
    eventId: string, 
    formData: Partial<BookingFormData> = {}
  ): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    const attempt: BookingAttempt = {
      eventId,
      action: 'book',
      timestamp: new Date(),
      status: 'pending'
    };
    setLastBookingAttempt(attempt);
    
    try {
      const bookingData = {
        eventId,
        userMembership,
        ...formData
      };
      
      const response = await makeBookingRequest('/api/bookings', bookingData, 'book');
      
      if (response.success) {
        setLastBookingAttempt({ ...attempt, status: 'confirmed' });
        if (onBookingSuccess) {
          onBookingSuccess(response);
        }
        if (onCapacityUpdate) {
          onCapacityUpdate();
        }
      } else {
        throw new Error(response.message || 'Booking failed');
      }
      
      return response;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      
      const error: BookingError = {
        code: 'BOOKING_FAILED',
        message: err instanceof Error ? err.message : 'Booking failed',
        userFriendlyMessage: 'Unable to complete your booking. Please try again.',
        suggestedActions: ['Check your internet connection', 'Try again', 'Contact support if the problem persists']
      };
      
      setError(error);
      setLastBookingAttempt({ ...attempt, status: 'failed' });
      
      if (onBookingError) {
        onBookingError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userMembership, makeBookingRequest, onBookingSuccess, onBookingError, onCapacityUpdate]);

  // Join waitlist
  const joinWaitlist = useCallback(async (
    eventId: string,
    formData: Partial<BookingFormData> = {}
  ): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    const attempt: BookingAttempt = {
      eventId,
      action: 'waitlist',
      timestamp: new Date(),
      status: 'pending'
    };
    setLastBookingAttempt(attempt);
    
    try {
      const waitlistData = {
        eventId,
        userMembership,
        ...formData
      };
      
      const response = await makeBookingRequest('/api/waitlist', waitlistData, 'waitlist');
      
      if (response.success) {
        setLastBookingAttempt({ ...attempt, status: 'confirmed' });
        if (onBookingSuccess) {
          onBookingSuccess(response);
        }
      }
      
      return response;
    } catch (err) {
      const error: BookingError = {
        code: 'WAITLIST_FAILED',
        message: err instanceof Error ? err.message : 'Failed to join waitlist',
        userFriendlyMessage: 'Unable to join the waitlist. Please try again.',
        suggestedActions: ['Try again', 'Contact support if the problem persists']
      };
      
      setError(error);
      setLastBookingAttempt({ ...attempt, status: 'failed' });
      
      if (onBookingError) {
        onBookingError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userMembership, makeBookingRequest, onBookingSuccess, onBookingError]);

  // Upgrade to membership
  const upgradeToMembership = useCallback(async (
    membershipLevel: MembershipLevel
  ): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const upgradeData = {
        currentLevel: userMembership,
        targetLevel: membershipLevel
      };
      
      const response = await makeBookingRequest('/api/membership/upgrade', upgradeData, 'membership');
      
      if (response.success && onBookingSuccess) {
        onBookingSuccess(response);
      }
      
      return response;
    } catch (err) {
      const error: BookingError = {
        code: 'MEMBERSHIP_UPGRADE_FAILED',
        message: err instanceof Error ? err.message : 'Membership upgrade failed',
        userFriendlyMessage: 'Unable to upgrade your membership. Please try again.',
        suggestedActions: ['Try again', 'Contact support for assistance']
      };
      
      setError(error);
      
      if (onBookingError) {
        onBookingError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userMembership, makeBookingRequest, onBookingSuccess, onBookingError]);

  // Cancel booking
  const cancelBooking = useCallback(async (bookingId: string): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeBookingRequest(`/api/bookings/${bookingId}/cancel`, {}, 'book');
      
      if (response.success) {
        if (onBookingSuccess) {
          onBookingSuccess(response);
        }
        if (onCapacityUpdate) {
          onCapacityUpdate();
        }
      }
      
      return response;
    } catch (err) {
      const error: BookingError = {
        code: 'CANCELLATION_FAILED',
        message: err instanceof Error ? err.message : 'Cancellation failed',
        userFriendlyMessage: 'Unable to cancel your booking. Please try again.',
        suggestedActions: ['Try again', 'Contact support for assistance']
      };
      
      setError(error);
      
      if (onBookingError) {
        onBookingError(error);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, [makeBookingRequest, onBookingSuccess, onBookingError, onCapacityUpdate]);

  return {
    bookEvent,
    joinWaitlist,
    upgradeToMembership,
    cancelBooking,
    validateBooking,
    canUserBook,
    calculatePrice,
    loading,
    error,
    lastBookingAttempt
  };
};