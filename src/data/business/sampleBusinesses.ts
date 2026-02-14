import { CommunityBusiness } from '../../types/business/directory';

export const sampleBusinesses: CommunityBusiness[] = [
  {
    id: 'kumon-wembley',
    name: 'Kumon Wembley Learning Centre',
    category: 'education',
    logo: '/images/businesses/kumon-logo.png',
    description: 'Educational enrichment supporting maths and English development for children aged 3-18.',
    communityCommitment: 'Providing scholarship places for Wembley Wonders participants and mentoring support for STEMgineers developing educational apps.',
    supportedProgrammes: ['Bright Sparks', 'Trubble n Bass'],
    yearsInCommunity: 8,
    address: '123 High Road, Wembley HA9 6AA',
    phone: '020 8900 1234',
    website: 'https://kumon.co.uk/wembley',
    partnershipTier: 'silver',
    communityStories: [
      'Supported 3 STEMgineers in developing educational game prototypes',
      'Provided mentorship for Tech-preneurs creating tutoring platforms'
    ],
    verifiedOutcomes: {
      studentsSupported: 12,
      projectsSponsored: 3
    },
    lastUpdated: new Date('2025-09-01')
  },
  {
    id: 'angel-taxis',
    name: 'Angel Taxis & Minicabs',
    category: 'transport',
    logo: '/images/businesses/angel-taxis-logo.png',
    description: 'Local minicab service serving Wembley and surrounding areas with reliable, affordable transport.',
    communityCommitment: 'Providing safe transport for community events and offering employment opportunities to local residents.',
    supportedProgrammes: ['Kaywanas Court', 'Connoisseurs Club'],
    yearsInCommunity: 15,
    address: '456 Station Road, Wembley HA0 2ST',
    phone: '020 8900 5678',
    partnershipTier: 'bronze',
    communityStories: [
      'Free transport for elderly residents to AGM events',
      'Employed 2 programme graduates as drivers'
    ],
    verifiedOutcomes: {
      jobsCreated: 2,
      eventsSupported: 8
    },
    lastUpdated: new Date('2025-09-01')
  },
  {
    id: 'zaika-restaurant',
    name: 'Zaika Indian Restaurant',
    category: 'food',
    logo: '/images/businesses/zaika-logo.png',
    description: 'Authentic Indian cuisine serving the Wembley community with traditional recipes and warm hospitality.',
    communityCommitment: 'Catering community celebrations, supporting local food entrepreneurs, and providing work experience for hospitality programme participants.',
    supportedProgrammes: ['Connoisseurs Club', 'Kaywanas Court'],
    yearsInCommunity: 12,
    address: '789 Harrow Road, Wembley HA0 3QX',
    phone: '020 8900 9012',
    website: 'https://zaika-wembley.co.uk',
    socialMedia: {
      facebook: 'https://facebook.com/zaikawembley',
      instagram: '@zaika_wembley'
    },
    partnershipTier: 'gold',
    communityStories: [
      'Catered 4 major community celebrations at cost price',
      'Mentored 2 Tech-preneurs developing food delivery apps'
    ],
    verifiedOutcomes: {
      eventsSupported: 4,
      projectsSponsored: 2
    },
    lastUpdated: new Date('2025-09-01')
  }
];
