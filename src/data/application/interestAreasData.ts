// Interest areas data for Step 2 application form

import { MultiSelectOption } from '../../types/application/step2Types';

export const INTEREST_CATEGORIES = {
  YOUTH_FAMILIES: 'Youth & Families',
  EDUCATION: 'Education & Skills',
  HEALTH_WELLBEING: 'Health & Wellbeing',
  COMMUNITY_DEVELOPMENT: 'Community Development',
  ARTS_CULTURE: 'Arts & Culture',
  ENVIRONMENT: 'Environment & Sustainability',
  BUSINESS_ECONOMY: 'Business & Economy',
  DIGITAL_INCLUSION: 'Digital Inclusion',
  ADVOCACY: 'Advocacy & Rights',
  GOVERNANCE: 'Governance & Leadership'
} as const;

export const INTEREST_AREAS: MultiSelectOption[] = [
  // Youth & Families
  {
    value: 'youth_mentoring',
    label: 'Youth Mentoring',
    description: 'Supporting young people aged 11-25 with guidance and development',
    category: INTEREST_CATEGORIES.YOUTH_FAMILIES
  },
  {
    value: 'parenting_support',
    label: 'Parenting Support',
    description: 'Helping families with parenting skills and family wellbeing',
    category: INTEREST_CATEGORIES.YOUTH_FAMILIES
  },
  {
    value: 'childcare_services',
    label: 'Childcare Services',
    description: 'Supporting affordable and accessible childcare options',
    category: INTEREST_CATEGORIES.YOUTH_FAMILIES
  },
  {
    value: 'youth_employment',
    label: 'Youth Employment',
    description: 'Helping young people find jobs and develop career skills',
    category: INTEREST_CATEGORIES.YOUTH_FAMILIES
  },
  {
    value: 'children_activities',
    label: 'Children\'s Activities',
    description: 'Organizing sports, arts, and educational activities for children',
    category: INTEREST_CATEGORIES.YOUTH_FAMILIES
  },

  // Education & Skills
  {
    value: 'adult_learning',
    label: 'Adult Learning',
    description: 'Supporting adults to gain new skills and qualifications',
    category: INTEREST_CATEGORIES.EDUCATION
  },
  {
    value: 'literacy_numeracy',
    label: 'Literacy & Numeracy',
    description: 'Helping people improve reading, writing, and math skills',
    category: INTEREST_CATEGORIES.EDUCATION
  },
  {
    value: 'english_language',
    label: 'English Language Support',
    description: 'Teaching English to speakers of other languages',
    category: INTEREST_CATEGORIES.EDUCATION
  },
  {
    value: 'job_training',
    label: 'Job Training & Skills',
    description: 'Providing vocational training and employment skills',
    category: INTEREST_CATEGORIES.EDUCATION
  },
  {
    value: 'school_support',
    label: 'School Support',
    description: 'Working with local schools on community projects',
    category: INTEREST_CATEGORIES.EDUCATION
  },

  // Health & Wellbeing
  {
    value: 'mental_health',
    label: 'Mental Health Support',
    description: 'Promoting mental wellbeing and supporting those in need',
    category: INTEREST_CATEGORIES.HEALTH_WELLBEING
  },
  {
    value: 'elderly_support',
    label: 'Elderly Support',
    description: 'Helping older residents stay connected and independent',
    category: INTEREST_CATEGORIES.HEALTH_WELLBEING
  },
  {
    value: 'disability_support',
    label: 'Disability Support',
    description: 'Supporting people with disabilities and their families',
    category: INTEREST_CATEGORIES.HEALTH_WELLBEING
  },
  {
    value: 'health_promotion',
    label: 'Health Promotion',
    description: 'Encouraging healthy lifestyles and preventive care',
    category: INTEREST_CATEGORIES.HEALTH_WELLBEING
  },
  {
    value: 'addiction_recovery',
    label: 'Addiction Recovery',
    description: 'Supporting people in recovery from substance abuse',
    category: INTEREST_CATEGORIES.HEALTH_WELLBEING
  },

  // Community Development
  {
    value: 'housing_issues',
    label: 'Housing Issues',
    description: 'Advocating for affordable housing and tenant rights',
    category: INTEREST_CATEGORIES.COMMUNITY_DEVELOPMENT
  },
  {
    value: 'community_safety',
    label: 'Community Safety',
    description: 'Working to make neighborhoods safer for everyone',
    category: INTEREST_CATEGORIES.COMMUNITY_DEVELOPMENT
  },
  {
    value: 'local_planning',
    label: 'Local Planning',
    description: 'Having a say in how the community is developed',
    category: INTEREST_CATEGORIES.COMMUNITY_DEVELOPMENT
  },
  {
    value: 'transport_access',
    label: 'Transport & Access',
    description: 'Improving public transport and accessibility',
    category: INTEREST_CATEGORIES.COMMUNITY_DEVELOPMENT
  },
  {
    value: 'community_spaces',
    label: 'Community Spaces',
    description: 'Creating and maintaining shared community facilities',
    category: INTEREST_CATEGORIES.COMMUNITY_DEVELOPMENT
  },

  // Arts & Culture
  {
    value: 'cultural_events',
    label: 'Cultural Events',
    description: 'Organizing festivals, celebrations, and cultural activities',
    category: INTEREST_CATEGORIES.ARTS_CULTURE
  },
  {
    value: 'local_history',
    label: 'Local History',
    description: 'Preserving and sharing Wembley\'s heritage and stories',
    category: INTEREST_CATEGORIES.ARTS_CULTURE
  },
  {
    value: 'arts_programs',
    label: 'Arts Programs',
    description: 'Supporting music, drama, visual arts, and creative activities',
    category: INTEREST_CATEGORIES.ARTS_CULTURE
  },
  {
    value: 'community_media',
    label: 'Community Media',
    description: 'Creating newsletters, podcasts, or local media content',
    category: INTEREST_CATEGORIES.ARTS_CULTURE
  },
  {
    value: 'library_services',
    label: 'Library Services',
    description: 'Supporting local libraries and reading programs',
    category: INTEREST_CATEGORIES.ARTS_CULTURE
  },

  // Environment & Sustainability
  {
    value: 'environmental_action',
    label: 'Environmental Action',
    description: 'Working on climate change and environmental issues',
    category: INTEREST_CATEGORIES.ENVIRONMENT
  },
  {
    value: 'community_gardens',
    label: 'Community Gardens',
    description: 'Creating and maintaining local growing spaces',
    category: INTEREST_CATEGORIES.ENVIRONMENT
  },
  {
    value: 'waste_reduction',
    label: 'Waste Reduction',
    description: 'Promoting recycling, reuse, and reducing waste',
    category: INTEREST_CATEGORIES.ENVIRONMENT
  },
  {
    value: 'green_spaces',
    label: 'Green Spaces',
    description: 'Protecting and improving parks and natural areas',
    category: INTEREST_CATEGORIES.ENVIRONMENT
  },
  {
    value: 'sustainable_living',
    label: 'Sustainable Living',
    description: 'Teaching eco-friendly lifestyle choices',
    category: INTEREST_CATEGORIES.ENVIRONMENT
  },

  // Business & Economy
  {
    value: 'local_business',
    label: 'Local Business Support',
    description: 'Helping small businesses and entrepreneurs thrive',
    category: INTEREST_CATEGORIES.BUSINESS_ECONOMY
  },
  {
    value: 'cooperative_economy',
    label: 'Cooperative Economy',
    description: 'Developing community-owned businesses and services',
    category: INTEREST_CATEGORIES.BUSINESS_ECONOMY
  },
  {
    value: 'financial_inclusion',
    label: 'Financial Inclusion',
    description: 'Helping people access banking and financial services',
    category: INTEREST_CATEGORIES.BUSINESS_ECONOMY
  },
  {
    value: 'local_markets',
    label: 'Local Markets',
    description: 'Supporting farmers markets and local trade',
    category: INTEREST_CATEGORIES.BUSINESS_ECONOMY
  },
  {
    value: 'social_enterprise',
    label: 'Social Enterprise',
    description: 'Businesses that create social and environmental value',
    category: INTEREST_CATEGORIES.BUSINESS_ECONOMY
  },

  // Digital Inclusion
  {
    value: 'digital_literacy',
    label: 'Digital Literacy',
    description: 'Teaching basic computer and internet skills',
    category: INTEREST_CATEGORIES.DIGITAL_INCLUSION
  },
  {
    value: 'online_safety',
    label: 'Online Safety',
    description: 'Helping people stay safe and secure online',
    category: INTEREST_CATEGORIES.DIGITAL_INCLUSION
  },
  {
    value: 'digital_access',
    label: 'Digital Access',
    description: 'Ensuring everyone has access to technology and internet',
    category: INTEREST_CATEGORIES.DIGITAL_INCLUSION
  },
  {
    value: 'coding_tech',
    label: 'Coding & Technology',
    description: 'Teaching programming and technical skills',
    category: INTEREST_CATEGORIES.DIGITAL_INCLUSION
  },

  // Advocacy & Rights
  {
    value: 'human_rights',
    label: 'Human Rights',
    description: 'Promoting equality and protecting people\'s rights',
    category: INTEREST_CATEGORIES.ADVOCACY
  },
  {
    value: 'immigration_support',
    label: 'Immigration Support',
    description: 'Helping refugees and immigrants settle in the community',
    category: INTEREST_CATEGORIES.ADVOCACY
  },
  {
    value: 'legal_advocacy',
    label: 'Legal Advocacy',
    description: 'Supporting people with legal issues and rights',
    category: INTEREST_CATEGORIES.ADVOCACY
  },
  {
    value: 'disability_rights',
    label: 'Disability Rights',
    description: 'Advocating for accessibility and inclusion',
    category: INTEREST_CATEGORIES.ADVOCACY
  },
  {
    value: 'domestic_violence',
    label: 'Domestic Violence Support',
    description: 'Supporting survivors of domestic abuse',
    category: INTEREST_CATEGORIES.ADVOCACY
  },

  // Governance & Leadership
  {
    value: 'community_governance',
    label: 'Community Governance',
    description: 'Participating in community decision-making processes',
    category: INTEREST_CATEGORIES.GOVERNANCE
  },
  {
    value: 'policy_advocacy',
    label: 'Policy Advocacy',
    description: 'Influencing local and national policies',
    category: INTEREST_CATEGORIES.GOVERNANCE
  },
  {
    value: 'civic_engagement',
    label: 'Civic Engagement',
    description: 'Encouraging democratic participation and voting',
    category: INTEREST_CATEGORIES.GOVERNANCE
  },
  {
    value: 'leadership_development',
    label: 'Leadership Development',
    description: 'Training and mentoring future community leaders',
    category: INTEREST_CATEGORIES.GOVERNANCE
  },
  {
    value: 'transparency_accountability',
    label: 'Transparency & Accountability',
    description: 'Ensuring organizations are open and accountable',
    category: INTEREST_CATEGORIES.GOVERNANCE
  }
];

export const TIME_COMMITMENT_OPTIONS = [
  {
    value: '1-2_hours',
    label: '1-2 hours per week',
    description: 'Light involvement, specific tasks'
  },
  {
    value: '3-5_hours',
    label: '3-5 hours per week',
    description: 'Regular participation, project support'
  },
  {
    value: '6-10_hours',
    label: '6-10 hours per week',
    description: 'Active involvement, some leadership'
  },
  {
    value: '11-15_hours',
    label: '11-15 hours per week',
    description: 'Significant commitment, leading projects'
  },
  {
    value: '16-20_hours',
    label: '16-20 hours per week',
    description: 'Major role, multiple responsibilities'
  },
  {
    value: '20+_hours',
    label: '20+ hours per week',
    description: 'Full-time equivalent, leadership position'
  }
];

export const AVAILABILITY_OPTIONS = {
  days: [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ],
  timeSlots: [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 9 PM)' },
    { value: 'weekend', label: 'Weekends' }
  ],
  notice: [
    { value: 'immediate', label: 'Available immediately' },
    { value: '24_hours', label: '24 hours notice' },
    { value: '1_week', label: '1 week notice' },
    { value: '2_weeks', label: '2 weeks notice' }
  ]
};

// Helper functions
export const getInterestAreasByCategory = (category: string) => {
  return INTEREST_AREAS.filter(area => area.category === category);
};

export const getAllInterestCategories = () => {
  return Object.values(INTEREST_CATEGORIES);
};

export const getInterestAreaById = (areaId: string) => {
  return INTEREST_AREAS.find(area => area.value === areaId);
};

export const getPopularInterestAreas = () => {
  // Return most commonly selected areas based on typical community needs
  return [
    'youth_mentoring',
    'elderly_support',
    'community_events',
    'environmental_action',
    'digital_literacy',
    'local_business',
    'health_promotion',
    'education_support'
  ].map(id => getInterestAreaById(id)).filter(Boolean);
};