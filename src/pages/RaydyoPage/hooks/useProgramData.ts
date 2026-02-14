import { useState, useEffect, useCallback } from 'react';

export interface Program {
  id: string;
  title: string;
  host: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  isLive: boolean;
  artwork?: string;
  audioUrl?: string;
  tags: string[];
  category: 'talk' | 'music' | 'news' | 'community' | 'education';
}

export interface ProgramDataState {
  currentProgram: Program | null;
  nextProgram: Program | null;
  upcomingPrograms: Program[];
  featuredShows: Program[];
  stats: {
    currentListeners: number;
    totalMembers: number;
    monthlyHours: number;
    activeVolunteers: number;
    reactions: {
      hearts: number;
      likes: number;
      stars: number;
      comments: number;
      shares: number;
    };
  };
  integrationData: {
    joystickLatestIssue: string;
    kaywanasAvailable: boolean;
    academyUpcomingCourses: number;
  };
}

export const useProgramData = () => {
  const [data, setData] = useState<ProgramDataState>({
    currentProgram: null,
    nextProgram: null,
    upcomingPrograms: [],
    featuredShows: [],
    stats: {
      currentListeners: 0,
      totalMembers: 1247,
      monthlyHours: 156,
      activeVolunteers: 23,
      reactions: {
        hearts: 0,
        likes: 0,
        stars: 0,
        comments: 0,
        shares: 0
      }
    },
    integrationData: {
      joystickLatestIssue: 'Wembley Gaming Scene 2025',
      kaywanasAvailable: true,
      academyUpcomingCourses: 4
    }
  });

  const [reminders, setReminders] = useState<Set<string>>(new Set());

  // Mock program schedule data
  const mockPrograms: Program[] = [
    {
      id: 'live-1',
      title: 'Community Voices',
      host: 'Sarah McKenzie',
      description: 'Local news, community updates, and conversations with Wembley residents',
      startTime: new Date(Date.now() - 30 * 60000).toISOString(), // Started 30 mins ago
      endTime: new Date(Date.now() + 30 * 60000).toISOString(), // Ends in 30 mins
      duration: 60,
      isLive: true,
      audioUrl: '/audio/community-voices-live.mp3',
      tags: ['community', 'news', 'local'],
      category: 'community'
    },
    {
      id: 'next-1',
      title: 'Wembley Sounds',
      host: 'Marcus Thompson',
      description: 'Showcasing local musicians and the diverse sounds of our community',
      startTime: new Date(Date.now() + 30 * 60000).toISOString(), // Starts in 30 mins
      endTime: new Date(Date.now() + 90 * 60000).toISOString(), // Ends in 90 mins
      duration: 60,
      isLive: false,
      artwork: '/images/wembley-sounds.jpg',
      audioUrl: '/audio/wembley-sounds.mp3',
      tags: ['music', 'local artists', 'culture'],
      category: 'music'
    },
    {
      id: 'upcoming-1',
      title: 'Tech Talk Tuesday',
      host: 'Priya Patel',
      description: 'Digital skills, online safety, and technology news for the community',
      startTime: new Date(Date.now() + 2 * 60 * 60000).toISOString(), // In 2 hours
      endTime: new Date(Date.now() + 3 * 60 * 60000).toISOString(),
      duration: 60,
      isLive: false,
      tags: ['technology', 'education', 'digital skills'],
      category: 'education'
    },
    {
      id: 'upcoming-2',
      title: 'Heritage Hour',
      host: 'David Williams',
      description: 'Exploring the rich history and cultural heritage of Wembley and beyond',
      startTime: new Date(Date.now() + 4 * 60 * 60000).toISOString(), // In 4 hours
      endTime: new Date(Date.now() + 5 * 60 * 60000).toISOString(),
      duration: 60,
      isLive: false,
      tags: ['heritage', 'history', 'culture'],
      category: 'education'
    },
    {
      id: 'featured-1',
      title: 'Young Voices',
      host: 'Aisha Johnson',
      description: 'Platform for young people in Wembley to share their stories and perspectives',
      startTime: new Date(Date.now() + 6 * 60 * 60000).toISOString(),
      endTime: new Date(Date.now() + 7 * 60 * 60000).toISOString(),
      duration: 60,
      isLive: false,
      artwork: '/images/young-voices.jpg',
      audioUrl: '/audio/young-voices-latest.mp3',
      tags: ['youth', 'community', 'perspectives'],
      category: 'community'
    },
    {
      id: 'featured-2',
      title: 'Business Spotlight',
      host: 'James Chen',
      description: 'Featuring local businesses, entrepreneurs, and economic opportunities',
      startTime: new Date(Date.now() + 24 * 60 * 60000).toISOString(), // Tomorrow
      endTime: new Date(Date.now() + 25 * 60 * 60000).toISOString(),
      duration: 60,
      isLive: false,
      tags: ['business', 'entrepreneurs', 'local economy'],
      category: 'talk'
    }
  ];

  // Determine current live program
  const getCurrentProgram = useCallback(() => {
    const now = new Date();
    return mockPrograms.find(program => {
      const start = new Date(program.startTime);
      const end = new Date(program.endTime);
      return now >= start && now <= end && program.isLive;
    }) || null;
  }, []);

  // Get next upcoming program
  const getNextProgram = useCallback(() => {
    const now = new Date();
    const upcomingPrograms = mockPrograms
      .filter(program => new Date(program.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    
    return upcomingPrograms[0] || null;
  }, []);

  // Get list of upcoming programs
  const getUpcomingPrograms = useCallback(() => {
    const now = new Date();
    return mockPrograms
      .filter(program => new Date(program.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 6); // Next 6 programs
  }, []);

  // Get featured shows (recorded content)
  const getFeaturedShows = useCallback(() => {
    return mockPrograms
      .filter(program => !program.isLive && program.audioUrl)
      .slice(0, 4); // Top 4 featured shows
  }, []);

  // Simulate live listener count
  const updateListenerCount = useCallback(() => {
    const currentProgram = getCurrentProgram();
    if (currentProgram) {
      // Simulate realistic listener count for community radio
      const baseCount = 15;
      const variation = Math.floor(Math.random() * 20) - 10;
      const newCount = Math.max(5, baseCount + variation);
      
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentListeners: newCount
        }
      }));
    } else {
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          currentListeners: 0
        }
      }));
    }
  }, [getCurrentProgram]);

  // Update program data
  const updateProgramData = useCallback(() => {
    const currentProgram = getCurrentProgram();
    const nextProgram = getNextProgram();
    const upcomingPrograms = getUpcomingPrograms();
    const featuredShows = getFeaturedShows();

    setData(prev => ({
      ...prev,
      currentProgram,
      nextProgram,
      upcomingPrograms,
      featuredShows
    }));
  }, [getCurrentProgram, getNextProgram, getUpcomingPrograms, getFeaturedShows]);

  // Set reminder for a program
  const setReminder = useCallback((programId: string) => {
    setReminders(prev => new Set([...prev, programId]));
    
    // Store in localStorage for persistence
    const storedReminders = JSON.parse(localStorage.getItem('raydyo-reminders') || '[]');
    const updatedReminders = [...storedReminders, programId];
    localStorage.setItem('raydyo-reminders', JSON.stringify(updatedReminders));
    
    // In a real app, you'd set up push notifications here
    console.log(`Reminder set for program: ${programId}`);
  }, []);

  // Simulate community reactions
  const updateReactions = useCallback(() => {
    const currentProgram = getCurrentProgram();
    if (currentProgram) {
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          reactions: {
            hearts: prev.stats.reactions.hearts + Math.floor(Math.random() * 3),
            likes: prev.stats.reactions.likes + Math.floor(Math.random() * 2),
            stars: prev.stats.reactions.stars + Math.floor(Math.random() * 2),
            comments: prev.stats.reactions.comments + Math.floor(Math.random() * 2),
            shares: prev.stats.reactions.shares + Math.floor(Math.random() * 1)
          }
        }
      }));
    }
  }, [getCurrentProgram]);

  // Refresh/refetch data
  const refetch = useCallback(() => {
    updateProgramData();
    updateListenerCount();
  }, [updateProgramData, updateListenerCount]);

  // Initialize and set up intervals
  useEffect(() => {
    // Load saved reminders
    const storedReminders = JSON.parse(localStorage.getItem('raydyo-reminders') || '[]');
    setReminders(new Set(storedReminders));

    // Initial data load
    updateProgramData();
    updateListenerCount();

    // Set up auto-refresh intervals
    const programInterval = setInterval(updateProgramData, 30000); // Every 30 seconds
    const listenerInterval = setInterval(updateListenerCount, 15000); // Every 15 seconds
    const reactionInterval = setInterval(updateReactions, 45000); // Every 45 seconds

    return () => {
      clearInterval(programInterval);
      clearInterval(listenerInterval);
      clearInterval(reactionInterval);
    };
  }, [updateProgramData, updateListenerCount, updateReactions]);

  return {
    ...data,
    setReminder,
    refetch,
    hasReminder: (programId: string) => reminders.has(programId)
  };
};