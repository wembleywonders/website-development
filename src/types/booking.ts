// src/types/booking.ts

export interface CapacityData {
  total: number;
  booked: number;
  available: number;
  waitlist?: number;
  memberReserved?: number;
  lastUpdated?: Date;
}

export interface BookingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  description?: string;
  category?: string;
  duration?: string;
  instructor?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  membershipRequired?: MembershipLevel;
  capacity: CapacityData;
  imageUrl?: string;
  tags?: string[];
}

export type MembershipLevel = 'none' | 'core' | 'supporter';

export type BookingStatus = 'available' | 'low' | 'moderate' | 'full' | 'cancelled';

export type BookingAction = 'book' | 'waitlist' | 'membership' | 'cancel';

export interface UserMembership {
  level: MembershipLevel;
  startDate?: Date;
  endDate?: Date;
  benefits?: string[];
  isActive: boolean;
}

export interface BookingAttempt {
  eventId: string;
  action: BookingAction;
  timestamp: Date;
  userId?: string;
  userMembership: MembershipLevel;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  waitlistPosition?: number;
  membershipUpgradeRequired?: boolean;
  suggestedAlternatives?: BookingEvent[];
}

export interface BookingFormData {
  eventId: string;
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  emergencyContact?: string;
  specialRequirements?: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

export interface BookingError {
  code: string;
  message: string;
  details?: any;
  retryable: boolean;
}

// API Response Types
export interface BookingApiResponse {
  data?: BookingResponse;
  error?: BookingError;
  status: number;
}

export interface CapacityUpdate {
  eventId: string;
  capacity: CapacityData;
  timestamp: Date;
  source: 'booking' | 'cancellation' | 'admin' | 'system';
}

export interface EventListResponse {
  events: BookingEvent[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Real-time Updates
export interface RealtimeCapacityUpdate {
  eventId: string;
  capacity: CapacityData;
  type: 'capacity_change' | 'booking_made' | 'cancellation' | 'waitlist_update';
  timestamp: Date;
}

export interface WebSocketMessage {
  type: 'capacity_update' | 'booking_confirmation' | 'error' | 'heartbeat';
  data: any;
  timestamp: Date;
}

// Component Props Types
export interface BookingButtonProps {
  event: BookingEvent;
  userMembership?: MembershipLevel;
  variant?: 'primary' | 'secondary' | 'compact';
  showCapacity?: boolean;
  onBookingAttempt?: (eventId: string, action: BookingAction) => void;
  className?: string;
}

export interface CapacityIndicatorProps {
  capacity: CapacityData;
  variant?: 'minimal' | 'inline' | 'detailed';
  showDetails?: boolean;
  className?: string;
}

export interface WhatsOnWidgetProps {
  variant?: 'minimal' | 'compact' | 'detailed';
  maxEvents?: number;
  userMembership?: MembershipLevel;
  showBookingButtons?: boolean;
  className?: string;
}

// Hook Return Types
export interface UseCapacityManagementReturn {
  capacity: CapacityData | null;
  loading: boolean;
  error: BookingError | null;
  refresh: () => Promise<void>;
  subscribe: (eventId: string) => void;
  unsubscribe: () => void;
}

export interface UseEventBookingReturn {
  bookEvent: (eventId: string, formData?: BookingFormData) => Promise<BookingResponse>;
  joinWaitlist: (eventId: string, formData?: BookingFormData) => Promise<BookingResponse>;
  cancelBooking: (bookingId: string) => Promise<BookingResponse>;
  loading: boolean;
  error: BookingError | null;
  lastResponse: BookingResponse | null;
}

// Filter and Search Types
export interface EventFilters {
  category?: string[];
  membershipRequired?: MembershipLevel[];
  priceRange?: { min: number; max: number };
  skillLevel?: ('beginner' | 'intermediate' | 'advanced')[];
  availability?: BookingStatus[];
  dateRange?: { start: Date; end: Date };
  duration?: string[];
  location?: string[];
}

export interface SearchOptions {
  query?: string;
  filters?: EventFilters;
  sortBy?: 'date' | 'popularity' | 'price' | 'availability';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

// Utility Types
export interface BookingValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface MembershipBenefits {
  freeEvents: boolean;
  priorityBooking: boolean;
  discountPercentage: number;
  advancedBookingDays: number;
  waitlistPriority: boolean;
  exclusiveEvents: boolean;
}

// Constants
export const BOOKING_CONSTANTS = {
  MEMBERSHIP_LEVELS: {
    none: {
      name: 'Visitor',
      benefits: {
        freeEvents: false,
        priorityBooking: false,
        discountPercentage: 0,
        advancedBookingDays: 7,
        waitlistPriority: false,
        exclusiveEvents: false
      }
    },
    core: {
      name: 'Core Member',
      benefits: {
        freeEvents: true,
        priorityBooking: true,
        discountPercentage: 20,
        advancedBookingDays: 14,
        waitlistPriority: true,
        exclusiveEvents: false
      }
    },
    supporter: {
      name: 'Supporter Member',
      benefits: {
        freeEvents: true,
        priorityBooking: true,
        discountPercentage: 30,
        advancedBookingDays: 21,
        waitlistPriority: true,
        exclusiveEvents: true
      }
    }
  },
  CAPACITY_THRESHOLDS: {
    low: 3,
    moderate: 0.5, // 50% of total capacity
    urgent: 1
  },
  BOOKING_TIMEOUTS: {
    reservation: 900000, // 15 minutes in milliseconds
    payment: 1800000, // 30 minutes in milliseconds
    confirmation: 300000 // 5 minutes in milliseconds
  },
  WEBSOCKET_EVENTS: {
    CAPACITY_UPDATE: 'capacity_update',
    BOOKING_CONFIRMATION: 'booking_confirmation',
    WAITLIST_UPDATE: 'waitlist_update',
    ERROR: 'error',
    HEARTBEAT: 'heartbeat'
  }
} as const;

// Type Guards
export const isValidMembershipLevel = (level: string): level is MembershipLevel => {
  return ['none', 'core', 'supporter'].includes(level);
};

export const isValidBookingAction = (action: string): action is BookingAction => {
  return ['book', 'waitlist', 'membership', 'cancel'].includes(action);
};

export const isValidBookingStatus = (status: string): status is BookingStatus => {
  return ['available', 'low', 'moderate', 'full', 'cancelled'].includes(status);
};

// Utility Functions
export const getCapacityStatus = (capacity: CapacityData): BookingStatus => {
  const { available, total } = capacity;
  
  if (available === 0) return 'full';
  if (available <= BOOKING_CONSTANTS.CAPACITY_THRESHOLDS.low) return 'low';
  if (available <= total * BOOKING_CONSTANTS.CAPACITY_THRESHOLDS.moderate) return 'moderate';
  return 'available';
};

export const getMembershipBenefits = (level: MembershipLevel): MembershipBenefits => {
  return BOOKING_CONSTANTS.MEMBERSHIP_LEVELS[level].benefits;
};

export const canUserBookEvent = (
  event: BookingEvent, 
  userMembership: MembershipLevel
): boolean => {
  const required = event.membershipRequired || 'none';
  
  if (required === 'none') return true;
  if (required === 'core' && (userMembership === 'core' || userMembership === 'supporter')) return true;
  if (required === 'supporter' && userMembership === 'supporter') return true;
  
  return false;
};

export const getTimeUntilEvent = (event: BookingEvent): { days: number; hours: number; minutes: number } => {
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const now = new Date();
  const diffMs = eventDateTime.getTime() - now.getTime();
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};

export const generateBookingUrl = (eventId: string, action: BookingAction): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/booking/${eventId}?action=${action}`;
};

export const validateBookingRequest = (event: BookingEvent, userMembership: MembershipLevel): BookingValidation => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check capacity
  if (event.capacity.available === 0) {
    errors.push('Event is fully booked');
  }
  
  // Check membership requirements
  if (!canUserBookEvent(event, userMembership)) {
    errors.push(`${event.membershipRequired} membership required`);
  }
  
  // Check timing
  const timeUntil = getTimeUntilEvent(event);
  if (timeUntil.days < 0) {
    errors.push('Event has already passed');
  }
  
  // Add warnings
  if (event.capacity.available <= BOOKING_CONSTANTS.CAPACITY_THRESHOLDS.low) {
    warnings.push('Only a few spots remaining');
  }
  
  if (timeUntil.days === 0 && timeUntil.hours < 2) {
    warnings.push('Event starts soon');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};