import { useState, useEffect, useCallback, useRef } from 'react';
import { CapacityData, BookingStatus, CapacityUpdate, BookingError } from '../../types/booking';

interface UseCapacityManagementOptions {
  eventId?: string;
  refreshInterval?: number;
  enableRealTimeUpdates?: boolean;
  onCapacityChange?: (update: CapacityUpdate) => void;
  onError?: (error: BookingError) => void;
}

interface UseCapacityManagementReturn {
  capacity: CapacityData | null;
  status: BookingStatus;
  loading: boolean;
  error: BookingError | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  subscribe: (eventId: string) => () => void;
  unsubscribe: (eventId: string) => void;
  calculateStatus: (capacity: CapacityData) => BookingStatus;
  formatDisplay: (capacity: CapacityData, variant?: 'minimal' | 'detailed') => string;
}

export const useCapacityManagement = (
  options: UseCapacityManagementOptions = {}
): UseCapacityManagementReturn => {
  const {
    eventId,
    refreshInterval = 30000, // 30 seconds
    enableRealTimeUpdates = true,
    onCapacityChange,
    onError
  } = options;

  const [capacity, setCapacity] = useState<CapacityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<BookingError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const subscriptionsRef = useRef<Map<string, () => void>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  // Calculate booking status based on capacity
  const calculateStatus = useCallback((capacityData: CapacityData): BookingStatus => {
    const { available, total } = capacityData;
    
    if (available === 0) {
      return 'full';
    } else if (available <= 3) {
      return 'urgent';
    } else if (available <= total * 0.25) {
      return 'low';
    } else {
      return 'available';
    }
  }, []);

  // Format capacity display
  const formatDisplay = useCallback((
    capacityData: CapacityData, 
    variant: 'minimal' | 'detailed' = 'minimal'
  ): string => {
    const { available, total, booked, waitlist = 0 } = capacityData;
    
    if (variant === 'detailed') {
      const status = calculateStatus(capacityData);
      
      switch (status) {
        case 'full':
          return waitlist > 0 
            ? `Fully booked (${waitlist} on waitlist)`
            : 'Fully booked';
        case 'urgent':
          return `Only ${available} spots left!`;
        case 'low':
          return `${available} spots remaining`;
        default:
          return `${available} of ${total} spots available`;
      }
    }
    
    // Minimal variant
    if (available === 0) {
      return 'Full';
    } else if (available <= 3) {
      return `${available} left`;
    } else {
      return `${available} spots`;
    }
  }, [calculateStatus]);

  // Fetch capacity data
  const fetchCapacity = useCallback(async (targetEventId: string): Promise<CapacityData> => {
    try {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      // Mock API call - replace with actual endpoint
      const response = await fetch(`/api/events/${targetEventId}/capacity`, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        ...data,
        lastUpdated: new Date()
      };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err; // Re-throw abort errors
      }
      
      // For demo purposes, return mock data
      console.warn('Using mock capacity data. Replace with actual API call.');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock capacity data with some randomness
      const mockCapacity: CapacityData = {
        total: 20,
        booked: Math.floor(Math.random() * 18) + 1,
        available: 0,
        waitlist: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
        memberReserved: Math.random() > 0.5 ? 2 : 0,
        lastUpdated: new Date()
      };
      
      mockCapacity.available = mockCapacity.total - mockCapacity.booked;
      
      return mockCapacity;
    }
  }, []);

  // Refresh capacity data
  const refresh = useCallback(async () => {
    if (!eventId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const capacityData = await fetchCapacity(eventId);
      setCapacity(capacityData);
      setLastUpdated(new Date());
      
      // Trigger callback if capacity changed
      if (onCapacityChange && capacity && capacityData.available !== capacity.available) {
        const update: CapacityUpdate = {
          eventId,
          capacity: capacityData,
          timestamp: new Date(),
          source: 'admin' // In real implementation, this would come from the API
        };
        onCapacityChange(update);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Don't set error for aborted requests
      }
      
      const error: BookingError = {
        code: 'CAPACITY_FETCH_FAILED',
        message: err instanceof Error ? err.message : 'Failed to fetch capacity',
        userFriendlyMessage: 'Unable to load current availability. Please try again.',
        suggestedActions: ['Refresh the page', 'Check your internet connection', 'Try again in a moment']
      };
      
      setError(error);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [eventId, fetchCapacity, onCapacityChange, onError, capacity]);

  // Subscribe to real-time updates for a specific event
  const subscribe = useCallback((targetEventId: string): (() => void) => {
    if (!enableRealTimeUpdates) {
      return () => {}; // Return no-op function
    }

    // Check if already subscribed
    if (subscriptionsRef.current.has(targetEventId)) {
      return subscriptionsRef.current.get(targetEventId)!;
    }

    // Mock WebSocket connection - replace with actual implementation
    console.log(`Subscribing to capacity updates for event ${targetEventId}`);
    
    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      // In a real implementation, this would be WebSocket messages
      if (Math.random() > 0.8) { // 20% chance of update
        fetchCapacity(targetEventId).then(capacityData => {
          if (capacity && capacityData.available !== capacity.available) {
            setCapacity(capacityData);
            setLastUpdated(new Date());
            
            if (onCapacityChange) {
              const update: CapacityUpdate = {
                eventId: targetEventId,
                capacity: capacityData,
                timestamp: new Date(),
                source: 'booking'
              };
              onCapacityChange(update);
            }
          }
        }).catch(console.warn);
      }
    }, 5000); // Check every 5 seconds

    const unsubscribeFn = () => {
      clearInterval(updateInterval);
      subscriptionsRef.current.delete(targetEventId);
      console.log(`Unsubscribed from capacity updates for event ${targetEventId}`);
    };

    subscriptionsRef.current.set(targetEventId, unsubscribeFn);
    return unsubscribeFn;
  }, [enableRealTimeUpdates, fetchCapacity, capacity, onCapacityChange]);

  // Unsubscribe from updates
  const unsubscribe = useCallback((targetEventId: string) => {
    const unsubscribeFn = subscriptionsRef.current.get(targetEventId);
    if (unsubscribeFn) {
      unsubscribeFn();
    }
  }, []);

  // Set up periodic refresh
  useEffect(() => {
    if (!eventId || !refreshInterval) return;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(refresh, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eventId, refreshInterval, refresh]);

  // Initial load
  useEffect(() => {
    if (eventId) {
      refresh();
    }
  }, [eventId, refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Unsubscribe from all events
      subscriptionsRef.current.forEach(unsubscribeFn => unsubscribeFn());
      subscriptionsRef.current.clear();
    };
  }, []);

  // Calculate current status
  const status = capacity ? calculateStatus(capacity) : 'available';

  return {
    capacity,
    status,
    loading,
    error,
    lastUpdated,
    refresh,
    subscribe,
    unsubscribe,
    calculateStatus,
    formatDisplay
  };
};