export const signpostingDirectory = {
  'statutory-services': {
    'benefits-support': {
      'citizens-advice-brent': {
        name: 'Citizens Advice Brent',
        description: 'Free, confidential advice on benefits, debt, housing, employment',
        contact: '0300 330 1197',
        address: '180 High Road, Wembley HA9 6AP',
        website: 'www.citizensadvicebrent.org.uk',
        dropIn: 'Mon-Fri 9:30am-3:30pm'
      },
      'job-centre-plus': {
        name: 'Jobcentre Plus Wembley',
        description: 'Universal Credit, job searching, employment support',
        address: '497 High Road, Wembley HA0 2DL',
        phone: '0800 169 0310'
      }
    },
    'housing': {
      'brent-housing': {
        name: 'Brent Council Housing',
        description: 'Housing applications, homelessness prevention, repairs',
        phone: '020 8937 1234',
        website: 'www.brent.gov.uk/housing',
        emergency: '020 8937 1234 (out of hours)'
      },
      'shelter': {
        name: 'Shelter Housing Advice',
        description: 'Free housing advice and support',
        phone: '0808 800 4444',
        website: 'england.shelter.org.uk'
      }
    },
    'health': {
      'nhs-111': {
        name: 'NHS 111',
        description: 'Non-emergency health advice 24/7',
        phone: '111',
        website: 'www.nhs.uk'
      },
      'wembley-centre-health': {
        name: 'Wembley Centre for Health & Care',
        description: 'Local GP services, mental health support',
        address: '116 Chaplin Road, Wembley HA0 4UZ',
        phone: '020 8900 1000'
      }
    }
  },
  
  'community-organizations': {
    'cultural-religious': {
      'wembley-mosque': {
        name: 'Wembley Islamic Cultural Centre',
        description: 'Community support, educational programs, cultural events',
        address: '120 Ealing Road, Wembley HA0 4TL',
        phone: '020 8903 6969'
      },
      'hindu-temple': {
        name: 'Shree Sanatan Hindu Mandir',
        description: 'Community activities, cultural programs, support services',
        address: 'Ealing Road, Wembley HA0 4TA',
        phone: '020 8904 1419'
      },
      'irish-centre': {
        name: 'Irish Centre Brent',
        description: 'Irish community support, cultural events, welfare advice',
        address: 'Willesden High Road, NW10 2NH',
        phone: '020 8451 6060'
      }
    },
    'family-support': {
      'family-action-brent': {
        name: 'Family Action Brent',
        description: 'Family support, parenting programs, financial assistance',
        phone: '020 8838 3800',
        website: 'www.family-action.org.uk'
      }
    }
  },
  
  'crisis-support': {
    'emergency': {
      'police-fire-ambulance': {
        name: 'Emergency Services',
        phone: '999',
        description: 'Life-threatening emergencies only'
      }
    },
    'mental-health': {
      'samaritans': {
        name: 'Samaritans',
        description: '24/7 emotional support for anyone in distress',
        phone: '116 123',
        website: 'www.samaritans.org'
      },
      'mind-brent': {
        name: 'Mind in Brent',
        description: 'Mental health support and advocacy',
        phone: '020 8450 2779',
        website: 'www.mindinbrent.org.uk'
      }
    },
    'domestic-violence': {
      'womens-aid': {
        name: 'National Domestic Violence Helpline',
        description: '24/7 support for domestic abuse survivors',
        phone: '0808 2000 247',
        website: 'www.womensaid.org.uk'
      }
    },
    'food-support': {
      'trussell-trust': {
        name: 'Wembley Foodbank',
        description: 'Emergency food parcels (referral required)',
        phone: '07984 806 681',
        location: 'Various locations across Wembley'
      }
    }
  },
  
  'education-training': {
    'adult-education': {
      'brent-adult-education': {
        name: 'Brent Start Adult Learning',
        description: 'ESOL, basic skills, vocational training',
        phone: '020 8937 3340',
        website: 'www.brent.gov.uk/adultlearning'
      }
    },
    'youth-services': {
      'brent-youth': {
        name: 'Brent Youth Services',
        description: 'Youth programs, mentoring, activities for 11-25 year olds',
        phone: '020 8937 1234',
        website: 'www.brent.gov.uk/youth'
      }
    }
  },
  
  'immigration-legal': {
    'immigration': {
      'praxis': {
        name: 'Praxis Community Projects',
        description: 'Immigration advice, community support for migrants',
        address: 'Pott Street, E2 0EF',
        phone: '020 7749 7608',
        website: 'www.praxis.org.uk'
      }
    },
    'legal-aid': {
      'legal-aid-agency': {
        name: 'Legal Aid Agency',
        description: 'Find legal aid and advice services',
        website: 'www.gov.uk/legal-aid',
        phone: '0345 345 4 345'
      }
    }
  },
  
  'employment': {
    'job-search': {
      'jobcentre-plus': {
        name: 'Jobcentre Plus Wembley',
        description: 'Job search support, CV help, interview skills',
        address: '497 High Road, Wembley HA0 2DL',
        phone: '0800 169 0310'
      },
      'brent-works': {
        name: 'Brent Works',
        description: 'Local employment support and job matching',
        phone: '020 8937 1234',
        website: 'www.brent.gov.uk/brentworks'
      }
    }
  }
};

export const signpostingCategories = {
  crisis: ['emergency', 'mental-health', 'domestic-violence', 'food-support'],
  daily_support: ['benefits-support', 'housing', 'health'],
  community: ['cultural-religious', 'family-support'],
  development: ['education-training', 'employment'],
  specialist: ['immigration-legal']
};
