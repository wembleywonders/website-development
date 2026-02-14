export interface Workshop {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  facilitator: string;
  programmeTag: string;
  category: string;
  description: string;
  level: string;
}

export const workshopCatalog: Workshop[] = [
  {
    id: 'bid-writing-basics',
    title: 'Community Bid Writing',
    date: '2025-03-15',
    time: '10:00 AM - 1:00 PM',
    duration: '3 hours',
    location: 'Wembley Centre, Room 3',
    facilitator: 'Community Members',
    programmeTag: 'Community Skills',
    category: 'Community Skills',
    description: 'Learn to write funding applications through real examples.',
    level: 'Beginner'
  },
  {
    id: 'podcast-production',
    title: 'Rayd-yo Content Creation',
    date: '2025-03-22',
    time: '2:00 PM - 5:00 PM',
    duration: '3 hours',
    location: 'Raydyo Studio',
    facilitator: 'Rayd-yo Team',
    programmeTag: 'G-Tech Casters',
    category: 'Media Production',
    description: 'Create content for our community radio platform.',
    level: 'All Levels'
  },
  {
    id: 'event-planning-basics',
    title: 'Community Event Organization',
    date: '2025-04-05',
    time: '10:00 AM - 2:00 PM',
    duration: '4 hours',
    location: 'Wembley Centre, Main Hall',
    facilitator: 'Events Team',
    programmeTag: 'Community Skills',
    category: 'Community Skills',
    description: 'Plan and organize community events.',
    level: 'Beginner'
  },
  {
    id: 'stem-basics-intro',
    title: 'Introduction to Electronics',
    date: '2025-03-28',
    time: '1:00 PM - 4:00 PM',
    duration: '3 hours',
    location: 'STEM Lab',
    facilitator: 'STEMgeneers Team',
    programmeTag: 'STEMgeneers',
    category: 'STEM',
    description: 'Basic electronics and circuit building.',
    level: 'Beginner'
  },
  {
    id: 'kaywanas-storytelling',
    title: 'Caribbean Storytelling Workshop',
    date: '2025-04-12',
    time: '6:00 PM - 8:00 PM',
    duration: '2 hours',
    location: 'Community Hall',
    facilitator: 'Kaywana\'s Court',
    programmeTag: 'Kaywanas Court',
    category: 'Arts & Culture',
    description: 'Traditional storytelling techniques and performance.',
    level: 'All Levels'
  }
];

// Helper function to get upcoming workshops
export const getUpcomingWorkshops = (): Workshop[] => {
  const today = new Date();
  return workshopCatalog.filter(workshop => new Date(workshop.date) >= today);
};

// Helper function to get past workshops (for attendance logging)
export const getPastWorkshops = (): Workshop[] => {
  const today = new Date();
  return workshopCatalog.filter(workshop => new Date(workshop.date) < today);
};

// Helper function to get all workshops sorted by date
export const getAllWorkshopsSorted = (): Workshop[] => {
  return [...workshopCatalog].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};