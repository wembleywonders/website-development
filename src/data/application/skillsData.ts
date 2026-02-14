// Skills data for Step 2 application form

import { MultiSelectOption } from '../../types/application/step2Types';

export const SKILL_CATEGORIES = {
  COMMUNICATION: 'Communication & Interpersonal',
  TECHNICAL: 'Technical & Digital',
  PROJECT_MANAGEMENT: 'Project Management & Organization',
  EDUCATION: 'Education & Training',
  HEALTH_SOCIAL: 'Health & Social Care',
  BUSINESS: 'Business & Finance',
  CREATIVE: 'Creative & Arts',
  LANGUAGE: 'Languages',
  PRACTICAL: 'Practical & Manual',
  LEADERSHIP: 'Leadership & Governance'
} as const;

export const AVAILABLE_SKILLS: MultiSelectOption[] = [
  // Communication & Interpersonal
  {
    value: 'public_speaking',
    label: 'Public Speaking',
    description: 'Presenting to groups, giving talks',
    category: SKILL_CATEGORIES.COMMUNICATION,
    icon: '🎤'
  },
  {
    value: 'active_listening',
    label: 'Active Listening',
    description: 'Understanding and responding to others',
    category: SKILL_CATEGORIES.COMMUNICATION,
    icon: '👂'
  },
  {
    value: 'conflict_resolution',
    label: 'Conflict Resolution',
    description: 'Mediating disputes and finding solutions',
    category: SKILL_CATEGORIES.COMMUNICATION,
    icon: '🤝'
  },
  {
    value: 'cultural_awareness',
    label: 'Cultural Awareness',
    description: 'Understanding diverse backgrounds',
    category: SKILL_CATEGORIES.COMMUNICATION,
    icon: '🌍'
  },
  {
    value: 'customer_service',
    label: 'Customer Service',
    description: 'Helping and supporting people',
    category: SKILL_CATEGORIES.COMMUNICATION,
    icon: '💬'
  },

  // Technical & Digital
  {
    value: 'microsoft_office',
    label: 'Microsoft Office',
    description: 'Word, Excel, PowerPoint, Outlook',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '💻'
  },
  {
    value: 'google_workspace',
    label: 'Google Workspace',
    description: 'Docs, Sheets, Slides, Gmail',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '📊'
  },
  {
    value: 'social_media',
    label: 'Social Media Management',
    description: 'Facebook, Instagram, Twitter, LinkedIn',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '📱'
  },
  {
    value: 'website_design',
    label: 'Website Design',
    description: 'Creating and maintaining websites',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '🌐'
  },
  {
    value: 'data_analysis',
    label: 'Data Analysis',
    description: 'Interpreting data and creating reports',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '📈'
  },
  {
    value: 'video_editing',
    label: 'Video Editing',
    description: 'Creating and editing video content',
    category: SKILL_CATEGORIES.TECHNICAL,
    icon: '🎬'
  },

  // Project Management & Organization
  {
    value: 'project_planning',
    label: 'Project Planning',
    description: 'Setting goals, timelines, and milestones',
    category: SKILL_CATEGORIES.PROJECT_MANAGEMENT,
    icon: '📋'
  },
  {
    value: 'budget_management',
    label: 'Budget Management',
    description: 'Planning and controlling finances',
    category: SKILL_CATEGORIES.PROJECT_MANAGEMENT,
    icon: '💰'
  },
  {
    value: 'event_planning',
    label: 'Event Planning',
    description: 'Organizing meetings, conferences, celebrations',
    category: SKILL_CATEGORIES.PROJECT_MANAGEMENT,
    icon: '🎪'
  },
  {
    value: 'risk_assessment',
    label: 'Risk Assessment',
    description: 'Identifying and managing potential issues',
    category: SKILL_CATEGORIES.PROJECT_MANAGEMENT,
    icon: '⚖️'
  },
  {
    value: 'volunteer_coordination',
    label: 'Volunteer Coordination',
    description: 'Managing and supporting volunteers',
    category: SKILL_CATEGORIES.PROJECT_MANAGEMENT,
    icon: '👥'
  },

  // Education & Training
  {
    value: 'teaching',
    label: 'Teaching',
    description: 'Educating individuals or groups',
    category: SKILL_CATEGORIES.EDUCATION,
    icon: '🎓'
  },
  {
    value: 'curriculum_development',
    label: 'Curriculum Development',
    description: 'Creating learning programs',
    category: SKILL_CATEGORIES.EDUCATION,
    icon: '📚'
  },
  {
    value: 'training_delivery',
    label: 'Training Delivery',
    description: 'Running workshops and courses',
    category: SKILL_CATEGORIES.EDUCATION,
    icon: '🏫'
  },
  {
    value: 'youth_work',
    label: 'Youth Work',
    description: 'Supporting young people',
    category: SKILL_CATEGORIES.EDUCATION,
    icon: '👦'
  },
  {
    value: 'adult_education',
    label: 'Adult Education',
    description: 'Teaching skills to adults',
    category: SKILL_CATEGORIES.EDUCATION,
    icon: '👩‍🎓'
  },

  // Health & Social Care
  {
    value: 'first_aid',
    label: 'First Aid',
    description: 'Emergency medical assistance',
    category: SKILL_CATEGORIES.HEALTH_SOCIAL,
    icon: '🚑'
  },
  {
    value: 'mental_health_awareness',
    label: 'Mental Health Awareness',
    description: 'Understanding mental health issues',
    category: SKILL_CATEGORIES.HEALTH_SOCIAL,
    icon: '🧠'
  },
  {
    value: 'safeguarding',
    label: 'Safeguarding',
    description: 'Protecting vulnerable people',
    category: SKILL_CATEGORIES.HEALTH_SOCIAL,
    icon: '🛡️'
  },
  {
    value: 'counselling',
    label: 'Counselling',
    description: 'Supporting people through difficulties',
    category: SKILL_CATEGORIES.HEALTH_SOCIAL,
    icon: '💭'
  },
  {
    value: 'elderly_care',
    label: 'Elderly Care',
    description: 'Supporting older adults',
    category: SKILL_CATEGORIES.HEALTH_SOCIAL,
    icon: '👵'
  },

  // Business & Finance
  {
    value: 'bookkeeping',
    label: 'Bookkeeping',
    description: 'Recording financial transactions',
    category: SKILL_CATEGORIES.BUSINESS,
    icon: '📊'
  },
  {
    value: 'grant_writing',
    label: 'Grant Writing',
    description: 'Securing funding through applications',
    category: SKILL_CATEGORIES.BUSINESS,
    icon: '📝'
  },
  {
    value: 'marketing',
    label: 'Marketing',
    description: 'Promoting services and events',
    category: SKILL_CATEGORIES.BUSINESS,
    icon: '📢'
  },
  {
    value: 'business_development',
    label: 'Business Development',
    description: 'Growing organizations and partnerships',
    category: SKILL_CATEGORIES.BUSINESS,
    icon: '📈'
  },
  {
    value: 'fundraising',
    label: 'Fundraising',
    description: 'Raising money for causes',
    category: SKILL_CATEGORIES.BUSINESS,
    icon: '💝'
  },

  // Creative & Arts
  {
    value: 'graphic_design',
    label: 'Graphic Design',
    description: 'Creating visual materials',
    category: SKILL_CATEGORIES.CREATIVE,
    icon: '🎨'
  },
  {
    value: 'photography',
    label: 'Photography',
    description: 'Taking and editing photos',
    category: SKILL_CATEGORIES.CREATIVE,
    icon: '📷'
  },
  {
    value: 'music',
    label: 'Music',
    description: 'Playing instruments or singing',
    category: SKILL_CATEGORIES.CREATIVE,
    icon: '🎵'
  },
  {
    value: 'drama_performance',
    label: 'Drama & Performance',
    description: 'Acting and theatrical skills',
    category: SKILL_CATEGORIES.CREATIVE,
    icon: '🎭'
  },
  {
    value: 'writing',
    label: 'Creative Writing',
    description: 'Writing stories, articles, content',
    category: SKILL_CATEGORIES.CREATIVE,
    icon: '✍️'
  },

  // Languages
  {
    value: 'english_tutoring',
    label: 'English Tutoring',
    description: 'Teaching English as a second language',
    category: SKILL_CATEGORIES.LANGUAGE,
    icon: '🇬🇧'
  },
  {
    value: 'interpretation',
    label: 'Interpretation',
    description: 'Translating between languages',
    category: SKILL_CATEGORIES.LANGUAGE,
    icon: '🗣️'
  },
  {
    value: 'sign_language',
    label: 'Sign Language',
    description: 'British Sign Language communication',
    category: SKILL_CATEGORIES.LANGUAGE,
    icon: '🤟'
  },

  // Practical & Manual
  {
    value: 'gardening',
    label: 'Gardening',
    description: 'Growing plants and maintaining gardens',
    category: SKILL_CATEGORIES.PRACTICAL,
    icon: '🌱'
  },
  {
    value: 'cooking',
    label: 'Cooking',
    description: 'Preparing meals and teaching nutrition',
    category: SKILL_CATEGORIES.PRACTICAL,
    icon: '👨‍🍳'
  },
  {
    value: 'diy_maintenance',
    label: 'DIY & Maintenance',
    description: 'Basic repairs and improvements',
    category: SKILL_CATEGORIES.PRACTICAL,
    icon: '🔧'
  },
  {
    value: 'driving',
    label: 'Driving',
    description: 'Transportation and delivery services',
    category: SKILL_CATEGORIES.PRACTICAL,
    icon: '🚗'
  },

  // Leadership & Governance
  {
    value: 'team_leadership',
    label: 'Team Leadership',
    description: 'Managing and motivating teams',
    category: SKILL_CATEGORIES.LEADERSHIP,
    icon: '👑'
  },
  {
    value: 'strategic_planning',
    label: 'Strategic Planning',
    description: 'Long-term organizational planning',
    category: SKILL_CATEGORIES.LEADERSHIP,
    icon: '🎯'
  },
  {
    value: 'board_experience',
    label: 'Board Experience',
    description: 'Governance and trustee roles',
    category: SKILL_CATEGORIES.LEADERSHIP,
    icon: '🏛️'
  },
  {
    value: 'policy_development',
    label: 'Policy Development',
    description: 'Creating organizational policies',
    category: SKILL_CATEGORIES.LEADERSHIP,
    icon: '📋'
  }
];

export const SKILL_LEVEL_OPTIONS = [
  { value: 'beginner', label: 'Beginner', description: 'New to this skill, willing to learn' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience, can work with guidance' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced, can work independently' },
  { value: 'expert', label: 'Expert', description: 'Highly skilled, can teach others' }
];

export const DIGITAL_SKILLS_ASSESSMENT = [
  {
    skill: 'Email and Internet',
    beginner: 'Can send basic emails and browse websites',
    intermediate: 'Comfortable with attachments, online forms, and search',
    advanced: 'Uses email efficiently, understands privacy settings',
    expert: 'Helps others with email and internet issues'
  },
  {
    skill: 'Social Media',
    beginner: 'Basic Facebook or WhatsApp use',
    intermediate: 'Active on multiple platforms, shares content',
    advanced: 'Creates engaging content, understands analytics',
    expert: 'Manages social media for organizations'
  },
  {
    skill: 'Digital Documents',
    beginner: 'Can open and read documents',
    intermediate: 'Creates basic documents and presentations',
    advanced: 'Advanced formatting, collaborates online',
    expert: 'Creates professional materials, teaches others'
  },
  {
    skill: 'Video Calls',
    beginner: 'Can join video calls with help',
    intermediate: 'Comfortable with Zoom, Teams, etc.',
    advanced: 'Hosts meetings, shares screens',
    expert: 'Manages large online events'
  }
];

// Helper functions
export const getSkillsByCategory = (category: string) => {
  return AVAILABLE_SKILLS.filter(skill => skill.category === category);
};

export const getAllCategories = () => {
  return Object.values(SKILL_CATEGORIES);
};

export const getSkillById = (skillId: string) => {
  return AVAILABLE_SKILLS.find(skill => skill.value === skillId);
};