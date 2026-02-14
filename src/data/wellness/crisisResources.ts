/**
 * Crisis Resources - Types & Data
 * ================================
 * 
 * UK-focused crisis support resources
 * For use with Emergency ROV specialist
 */

// ============================================
// TYPES
// ============================================

export interface CrisisResource {
  id: string;
  name: string;
  description: string;
  phone?: string;
  text?: string;
  website?: string;
  hours: string;
  free: boolean;
  forUnder19?: boolean;
  forMen?: boolean;
  forWomen?: boolean;
  forLGBTQ?: boolean;
  forBIPOC?: boolean;
  languages?: string[];
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: 'immediate' | 'urgent' | 'support';
  resources: CrisisResource[];
}

export interface LocalResource {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  services: string[];
  hours: string;
  walkIn: boolean;
}

// ============================================
// NATIONAL CRISIS RESOURCES (UK)
// ============================================

export const CRISIS_RESOURCES: ResourceCategory[] = [
  {
    id: 'immediate',
    title: 'Immediate Crisis',
    description: 'If you or someone else is in immediate danger',
    icon: '🚨',
    priority: 'immediate',
    resources: [
      {
        id: 'emergency-999',
        name: 'Emergency Services',
        description: 'For life-threatening emergencies',
        phone: '999',
        hours: '24/7',
        free: true
      },
      {
        id: 'samaritans',
        name: 'Samaritans',
        description: 'Emotional support for anyone in distress',
        phone: '116 123',
        website: 'https://www.samaritans.org',
        hours: '24/7',
        free: true
      },
      {
        id: 'crisis-text',
        name: 'Crisis Text Line',
        description: 'Text support for any crisis',
        text: 'Text SHOUT to 85258',
        website: 'https://giveusashout.org',
        hours: '24/7',
        free: true
      },
      {
        id: 'nhs-111',
        name: 'NHS 111',
        description: 'Urgent medical help or mental health crisis',
        phone: '111',
        website: 'https://111.nhs.uk',
        hours: '24/7',
        free: true
      }
    ]
  },
  {
    id: 'young-people',
    title: 'Young People (Under 25)',
    description: 'Support specifically for children and young people',
    icon: '🧒',
    priority: 'urgent',
    resources: [
      {
        id: 'childline',
        name: 'Childline',
        description: 'Support for under 19s - any issue',
        phone: '0800 1111',
        website: 'https://www.childline.org.uk',
        hours: '24/7',
        free: true,
        forUnder19: true
      },
      {
        id: 'papyrus',
        name: 'PAPYRUS HOPELineUK',
        description: 'Suicide prevention for under 35s',
        phone: '0800 068 4141',
        text: 'Text 07860 039967',
        website: 'https://www.papyrus-uk.org',
        hours: '9am-midnight daily',
        free: true
      },
      {
        id: 'the-mix',
        name: 'The Mix',
        description: 'Support for under 25s',
        phone: '0808 808 4994',
        website: 'https://www.themix.org.uk',
        hours: '3pm-12am daily',
        free: true
      },
      {
        id: 'young-minds',
        name: 'YoungMinds Crisis Messenger',
        description: 'Text support for under 25s',
        text: 'Text YM to 85258',
        website: 'https://www.youngminds.org.uk',
        hours: '24/7',
        free: true
      }
    ]
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Ongoing mental health support and information',
    icon: '🧠',
    priority: 'support',
    resources: [
      {
        id: 'mind',
        name: 'Mind Infoline',
        description: 'Mental health information and support',
        phone: '0300 123 3393',
        text: 'Text 86463',
        website: 'https://www.mind.org.uk',
        hours: '9am-6pm Mon-Fri',
        free: true
      },
      {
        id: 'rethink',
        name: 'Rethink Mental Illness',
        description: 'Advice and information service',
        phone: '0808 801 0525',
        website: 'https://www.rethink.org',
        hours: '9:30am-4pm Mon-Fri',
        free: true
      },
      {
        id: 'sane',
        name: 'SANE',
        description: 'Emotional support and information',
        phone: '0300 304 7000',
        website: 'https://www.sane.org.uk',
        hours: '4pm-10pm daily',
        free: true
      },
      {
        id: 'anxiety-uk',
        name: 'Anxiety UK',
        description: 'Support for anxiety disorders',
        phone: '03444 775 774',
        text: 'Text 07537 416905',
        website: 'https://www.anxietyuk.org.uk',
        hours: '9:30am-5:30pm Mon-Fri',
        free: true
      }
    ]
  },
  {
    id: 'specific-support',
    title: 'Specific Communities',
    description: 'Tailored support for specific groups',
    icon: '🤝',
    priority: 'support',
    resources: [
      {
        id: 'calm',
        name: 'CALM (Campaign Against Living Miserably)',
        description: 'Support for men',
        phone: '0800 58 58 58',
        website: 'https://www.thecalmzone.net',
        hours: '5pm-midnight daily',
        free: true,
        forMen: true
      },
      {
        id: 'switchboard',
        name: 'Switchboard LGBT+',
        description: 'Support for LGBTQ+ people',
        phone: '0800 0119 100',
        website: 'https://switchboard.lgbt',
        hours: '10am-10pm daily',
        free: true,
        forLGBTQ: true
      },
      {
        id: 'black-minds',
        name: 'Black Minds Matter UK',
        description: 'Free therapy for Black individuals',
        website: 'https://www.blackmindsmatteruk.com',
        hours: 'Online booking',
        free: true,
        forBIPOC: true
      },
      {
        id: 'womens-aid',
        name: "Women's Aid",
        description: 'Support for domestic abuse survivors',
        phone: '0808 2000 247',
        website: 'https://www.womensaid.org.uk',
        hours: '24/7',
        free: true,
        forWomen: true
      },
      {
        id: 'refuge',
        name: 'Refuge National Domestic Abuse Helpline',
        description: 'Domestic abuse support',
        phone: '0808 2000 247',
        website: 'https://www.refuge.org.uk',
        hours: '24/7',
        free: true
      }
    ]
  },
  {
    id: 'addiction',
    title: 'Addiction & Substance Use',
    description: 'Support for addiction and substance misuse',
    icon: '💪',
    priority: 'support',
    resources: [
      {
        id: 'frank',
        name: 'FRANK',
        description: 'Drug advice and support',
        phone: '0300 123 6600',
        text: 'Text 82111',
        website: 'https://www.talktofrank.com',
        hours: '24/7',
        free: true
      },
      {
        id: 'drinkline',
        name: 'Drinkline',
        description: 'Alcohol support helpline',
        phone: '0300 123 1110',
        hours: '9am-8pm Mon-Fri, 11am-4pm weekends',
        free: true
      },
      {
        id: 'gamcare',
        name: 'GamCare',
        description: 'Gambling addiction support',
        phone: '0808 8020 133',
        website: 'https://www.gamcare.org.uk',
        hours: '24/7',
        free: true
      }
    ]
  }
];

// ============================================
// LOCAL RESOURCES (Wembley/Brent)
// ============================================

export const LOCAL_RESOURCES: LocalResource[] = [
  {
    id: 'brent-crisis',
    name: 'Brent Crisis Line',
    phone: '0800 0234 650',
    website: 'https://www.brent.gov.uk/mental-health',
    services: ['Mental health crisis', 'Emergency support', 'Signposting'],
    hours: '24/7',
    walkIn: false
  },
  {
    id: 'central-middlesex',
    name: 'Central Middlesex Hospital - Mental Health',
    address: 'Acton Lane, Park Royal, London NW10 7NS',
    phone: '020 8965 5733',
    services: ['A&E mental health', 'Crisis assessment', 'Psychiatric liaison'],
    hours: '24/7',
    walkIn: true
  },
  {
    id: 'brent-talking-therapies',
    name: 'NHS Brent Talking Therapies',
    phone: '020 8206 3100',
    website: 'https://www.brenttalking.nhs.uk',
    services: ['CBT', 'Counselling', 'Anxiety support', 'Depression support'],
    hours: '9am-5pm Mon-Fri',
    walkIn: false
  },
  {
    id: 'wembley-centre',
    name: 'Wembley Centre for Health and Care',
    address: '116 Chaplin Road, Wembley HA0 4UZ',
    phone: '020 8795 6090',
    services: ['GP services', 'Mental health referrals', 'Community support'],
    hours: '8am-6:30pm Mon-Fri',
    walkIn: true
  },
  {
    id: 'brent-mind',
    name: 'Brent Mind',
    address: '85 Wembley Hill Road, Wembley HA9 8BU',
    phone: '020 8903 3333',
    website: 'https://www.brentmind.org.uk',
    services: ['Counselling', 'Wellbeing activities', 'Peer support', 'Employment support'],
    hours: '10am-4pm Mon-Fri',
    walkIn: false
  },
  {
    id: 'ashford-place',
    name: 'Ashford Place',
    address: '60 Ashford Road, Cricklewood NW2 6TU',
    phone: '020 8208 8590',
    website: 'https://www.ashfordplace.org.uk',
    services: ['Mental health support', 'Homelessness support', 'Community hub'],
    hours: '9am-5pm Mon-Fri',
    walkIn: true
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get resources by priority level
 */
export function getResourcesByPriority(priority: 'immediate' | 'urgent' | 'support'): ResourceCategory[] {
  return CRISIS_RESOURCES.filter(cat => cat.priority === priority);
}

/**
 * Get immediate crisis resources (top priority)
 */
export function getImmediateResources(): CrisisResource[] {
  const immediate = CRISIS_RESOURCES.find(cat => cat.id === 'immediate');
  return immediate?.resources || [];
}

/**
 * Get resources for young people
 */
export function getYouthResources(): CrisisResource[] {
  const youth = CRISIS_RESOURCES.find(cat => cat.id === 'young-people');
  return youth?.resources || [];
}

/**
 * Search resources by keyword
 */
export function searchResources(query: string): CrisisResource[] {
  const lowerQuery = query.toLowerCase();
  const results: CrisisResource[] = [];
  
  CRISIS_RESOURCES.forEach(category => {
    category.resources.forEach(resource => {
      if (
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push(resource);
      }
    });
  });
  
  return results;
}

/**
 * Get all 24/7 resources
 */
export function get24HourResources(): CrisisResource[] {
  const results: CrisisResource[] = [];
  
  CRISIS_RESOURCES.forEach(category => {
    category.resources.forEach(resource => {
      if (resource.hours === '24/7') {
        results.push(resource);
      }
    });
  });
  
  return results;
}

export default CRISIS_RESOURCES;