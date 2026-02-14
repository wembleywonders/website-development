/**
 * SAMPLE MARKETPLACE DATA
 * 
 * Demo data for testing and demonstration.
 * Shows the variety of products, services, and creators.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type { CreatorProfile, Product, Service, ProgrammeId } from '../types';

// ============================================
// SAMPLE CREATORS
// ============================================

export const SAMPLE_CREATORS: Partial<CreatorProfile>[] = [
  {
    id: 'creator-1',
    displayName: 'Marcus T',
    tagline: 'Beats that move the culture',
    bio: 'Producer and sound designer from Wembley. Specialising in UK drill and afrobeats production. Graduate of Trubble n Bass and TECHreneurs programmes.',
    location: {
      area: 'Wembley',
      borough: 'Brent',
      willingToTravel: true,
      travelRadius: 10,
      canWorkRemote: true
    },
    completedProgrammes: [
      { programmeId: 'trubble-n-bass', completedDate: new Date('2025-06-15'), level: 'practitioner', skills: [] },
      { programmeId: 'techreneurs', completedDate: new Date('2025-09-20'), level: 'foundation', skills: [] }
    ],
    activeSkills: [],
    skillCombinations: [],
    portfolio: [],
    featuredWork: [],
    products: ['product-1', 'product-2', 'product-3'],
    services: ['service-1'],
    packages: [],
    availability: 'available',
    responseTime: 'within-hours',
    ratings: {
      overall: 4.8,
      quality: 4.9,
      communication: 4.7,
      reliability: 4.8,
      totalReviews: 23
    },
    revenueStats: {
      totalEarnings: 2340,
      thisMonth: 450,
      lastMonth: 380,
      byStream: {
        products: 1890,
        services: 450,
        retainers: 0,
        collaborations: 0
      }
    },
    openToCollaboration: true,
    collaborationInterests: ['silk-stilettos', 'gtechcasters'],
    pastCollaborators: [],
    joinedDate: new Date('2025-03-10'),
    lastActive: new Date(),
    profileComplete: 95,
    verified: true
  },
  {
    id: 'creator-2',
    displayName: 'Amara O',
    tagline: 'Sustainable fashion with soul',
    bio: 'Fashion designer specialising in sustainable, upcycled clothing. Combining traditional African textiles with contemporary London style. Silk & Stilettos and Scrap Cat graduate.',
    location: {
      area: 'Harlesden',
      borough: 'Brent',
      willingToTravel: true,
      travelRadius: 15,
      canWorkRemote: false
    },
    completedProgrammes: [
      { programmeId: 'silk-stilettos', completedDate: new Date('2025-04-20'), level: 'specialist', skills: [] },
      { programmeId: 'scrap-cat', completedDate: new Date('2025-08-15'), level: 'practitioner', skills: [] }
    ],
    activeSkills: [],
    skillCombinations: [],
    portfolio: [],
    featuredWork: [],
    products: ['product-4', 'product-5'],
    services: ['service-2', 'service-3'],
    packages: [],
    availability: 'limited',
    responseTime: 'within-day',
    ratings: {
      overall: 5.0,
      quality: 5.0,
      communication: 5.0,
      reliability: 5.0,
      totalReviews: 12
    },
    revenueStats: {
      totalEarnings: 3200,
      thisMonth: 680,
      lastMonth: 520,
      byStream: {
        products: 2100,
        services: 1100,
        retainers: 0,
        collaborations: 0
      }
    },
    openToCollaboration: true,
    collaborationInterests: ['auntie-anansis-kitchen', 'pageturners'],
    pastCollaborators: [],
    joinedDate: new Date('2025-02-15'),
    lastActive: new Date(),
    profileComplete: 100,
    verified: true
  },
  {
    id: 'creator-3',
    displayName: 'Dev P',
    tagline: 'Tech solutions for creative businesses',
    bio: 'Full-stack developer helping creators build their digital presence. Websites, apps, and automation for the community.',
    location: {
      area: 'Wembley',
      borough: 'Brent',
      willingToTravel: false,
      travelRadius: 0,
      canWorkRemote: true
    },
    completedProgrammes: [
      { programmeId: 'techreneurs', completedDate: new Date('2025-05-10'), level: 'specialist', skills: [] }
    ],
    activeSkills: [],
    skillCombinations: [],
    portfolio: [],
    featuredWork: [],
    products: ['product-6', 'product-7'],
    services: ['service-4', 'service-5'],
    packages: [],
    availability: 'available',
    responseTime: 'within-hours',
    ratings: {
      overall: 4.7,
      quality: 4.8,
      communication: 4.6,
      reliability: 4.7,
      totalReviews: 18
    },
    revenueStats: {
      totalEarnings: 5600,
      thisMonth: 1200,
      lastMonth: 980,
      byStream: {
        products: 1400,
        services: 3200,
        retainers: 1000,
        collaborations: 0
      }
    },
    openToCollaboration: true,
    collaborationInterests: ['trubble-n-bass', 'gtechcasters'],
    pastCollaborators: ['creator-1'],
    joinedDate: new Date('2025-01-20'),
    lastActive: new Date(),
    profileComplete: 90,
    verified: true
  },
  {
    id: 'creator-4',
    displayName: 'Jasmine K',
    tagline: 'Stories that connect generations',
    bio: 'Podcaster and oral historian preserving Caribbean heritage through audio. G-Tech Casters and PageTurners graduate.',
    location: {
      area: 'Kilburn',
      borough: 'Brent',
      willingToTravel: true,
      travelRadius: 20,
      canWorkRemote: true
    },
    completedProgrammes: [
      { programmeId: 'gtechcasters', completedDate: new Date('2025-03-25'), level: 'practitioner', skills: [] },
      { programmeId: 'pageturners', completedDate: new Date('2025-07-10'), level: 'practitioner', skills: [] }
    ],
    activeSkills: [],
    skillCombinations: [],
    portfolio: [],
    featuredWork: [],
    products: ['product-8', 'product-9'],
    services: ['service-6', 'service-7'],
    packages: [],
    availability: 'available',
    responseTime: 'within-day',
    ratings: {
      overall: 4.9,
      quality: 5.0,
      communication: 4.9,
      reliability: 4.8,
      totalReviews: 15
    },
    revenueStats: {
      totalEarnings: 2800,
      thisMonth: 520,
      lastMonth: 480,
      byStream: {
        products: 800,
        services: 1600,
        retainers: 400,
        collaborations: 0
      }
    },
    openToCollaboration: true,
    collaborationInterests: ['auntie-anansis-kitchen', 'kaywanas-court'],
    pastCollaborators: [],
    joinedDate: new Date('2025-02-01'),
    lastActive: new Date(),
    profileComplete: 88,
    verified: true
  },
  {
    id: 'creator-5',
    displayName: 'Kofi A',
    tagline: 'STEM for every young mind',
    bio: 'Former engineer turned educator. Making science and maths accessible and fun for young people across Brent.',
    location: {
      area: 'Neasden',
      borough: 'Brent',
      willingToTravel: true,
      travelRadius: 15,
      canWorkRemote: true
    },
    completedProgrammes: [
      { programmeId: 'stemgeneers', completedDate: new Date('2025-04-05'), level: 'specialist', skills: [] },
      { programmeId: 'bright-sparks', completedDate: new Date('2025-08-20'), level: 'practitioner', skills: [] }
    ],
    activeSkills: [],
    skillCombinations: [],
    portfolio: [],
    featuredWork: [],
    products: ['product-10', 'product-11'],
    services: ['service-8', 'service-9'],
    packages: [],
    availability: 'limited',
    responseTime: 'within-day',
    ratings: {
      overall: 4.9,
      quality: 5.0,
      communication: 4.8,
      reliability: 5.0,
      totalReviews: 28
    },
    revenueStats: {
      totalEarnings: 4200,
      thisMonth: 850,
      lastMonth: 720,
      byStream: {
        products: 600,
        services: 3200,
        retainers: 400,
        collaborations: 0
      }
    },
    openToCollaboration: true,
    collaborationInterests: ['techreneurs', 'kaywanas-court'],
    pastCollaborators: [],
    joinedDate: new Date('2025-01-15'),
    lastActive: new Date(),
    profileComplete: 92,
    verified: true
  }
];

// ============================================
// SAMPLE PRODUCTS
// ============================================

export const SAMPLE_PRODUCTS: Partial<Product>[] = [
  // Music Products
  {
    id: 'product-1',
    creatorId: 'creator-1',
    title: 'Dark Drill Beat - "Pressure"',
    description: 'Hard-hitting UK drill beat with dark 808s and aggressive hi-hats. Perfect for artists like Central Cee or Digga D style tracks. 140 BPM, key of F minor.',
    shortDescription: 'UK drill beat with dark 808s, 140 BPM',
    category: 'beats-music',
    subcategory: 'drill',
    programmeId: 'trubble-n-bass',
    tags: ['drill', 'uk drill', 'dark', '808', 'hard'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 35,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/beats/pressure-thumb.jpg',
    images: ['/images/marketplace/beats/pressure-1.jpg'],
    previewUrl: '/audio/previews/pressure-preview.mp3',
    digitalDetails: {
      fileType: 'MP3, WAV, Stems',
      fileSize: 45000000,
      format: '44.1kHz 24bit',
      instantDelivery: true
    },
    licensing: {
      type: 'lease',
      terms: 'Non-exclusive lease - unlimited streams, 5000 sales',
      usageRights: ['Streaming', 'Music videos', 'Live performance'],
      exclusivityAvailable: true,
      exclusivePrice: 500
    },
    inStock: true,
    sales: 42,
    views: 380,
    favourites: 28,
    reviews: [],
    averageRating: 4.9,
    status: 'active',
    createdDate: new Date('2025-07-10'),
    lastUpdated: new Date()
  },
  {
    id: 'product-2',
    creatorId: 'creator-1',
    title: 'Afrobeats Summer Pack - 10 Loops',
    description: '10 afrobeats loops and drums perfect for summer vibes. Includes melodic loops, drum patterns, and FX. Royalty-free for commercial use.',
    shortDescription: '10 afrobeats loops and drums',
    category: 'sample-packs',
    subcategory: 'afrobeats',
    programmeId: 'trubble-n-bass',
    tags: ['afrobeats', 'loops', 'drums', 'summer', 'african'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 25,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/packs/afro-summer-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'WAV',
      fileSize: 120000000,
      format: '44.1kHz 24bit',
      instantDelivery: true
    },
    inStock: true,
    sales: 67,
    views: 520,
    favourites: 45,
    reviews: [],
    averageRating: 4.7,
    status: 'active',
    createdDate: new Date('2025-06-20'),
    lastUpdated: new Date()
  },
  {
    id: 'product-3',
    creatorId: 'creator-1',
    title: 'Producer Beat Store Template',
    description: 'Complete website template for producers to sell beats. Built with React, includes licensing system, audio preview player, shopping cart, and Stripe integration ready.',
    shortDescription: 'Full beat store website template',
    category: 'website-themes',
    subcategory: 'music',
    programmeId: 'techreneurs',
    tags: ['website', 'template', 'beats', 'producer', 'e-commerce'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 150,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/templates/beat-store-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'ZIP',
      fileSize: 25000000,
      format: 'React/Next.js',
      instantDelivery: true
    },
    inStock: true,
    sales: 12,
    views: 180,
    favourites: 22,
    reviews: [],
    averageRating: 4.8,
    status: 'active',
    createdDate: new Date('2025-10-05'),
    lastUpdated: new Date()
  },
  
  // Fashion Products
  {
    id: 'product-4',
    creatorId: 'creator-2',
    title: 'Ankara Patchwork Jacket',
    description: 'Unique jacket made from upcycled Ankara fabric pieces. Each piece is one-of-a-kind, combining different traditional prints into a modern silhouette. Fully lined with recycled materials.',
    shortDescription: 'One-of-a-kind upcycled Ankara jacket',
    category: 'fashion-clothing',
    subcategory: 'jackets',
    programmeId: 'silk-stilettos',
    tags: ['ankara', 'african', 'upcycled', 'sustainable', 'jacket'],
    type: 'physical',
    deliveryMethod: 'shipping',
    pricing: {
      basePrice: 180,
      currency: 'GBP',
      hasVariants: true,
      variants: [
        { id: 'v1', name: 'Size S', options: [{ name: 'size', value: 'S' }], price: 180 },
        { id: 'v2', name: 'Size M', options: [{ name: 'size', value: 'M' }], price: 180 },
        { id: 'v3', name: 'Size L', options: [{ name: 'size', value: 'L' }], price: 180 },
        { id: 'v4', name: 'Size XL', options: [{ name: 'size', value: 'XL' }], price: 195 }
      ],
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/fashion/ankara-jacket-thumb.jpg',
    images: [],
    physicalDetails: {
      materials: ['Ankara cotton', 'Recycled polyester lining'],
      madeToOrder: true,
      productionTime: 14,
      shippingOptions: [
        { name: 'UK Standard', price: 5.99, estimatedDays: 5, areas: ['UK'] },
        { name: 'London Same Day', price: 12.99, estimatedDays: 1, areas: ['London'] }
      ]
    },
    inStock: true,
    sales: 8,
    views: 145,
    favourites: 32,
    reviews: [],
    averageRating: 5.0,
    status: 'active',
    createdDate: new Date('2025-05-15'),
    lastUpdated: new Date()
  },
  {
    id: 'product-5',
    creatorId: 'creator-2',
    title: 'Zero-Waste Dress Pattern Pack',
    description: 'Digital sewing patterns for 3 zero-waste dress designs. Includes full instructions, cutting layouts optimised for minimal waste, and video tutorial links. Sizes UK 8-22.',
    shortDescription: '3 zero-waste dress patterns with tutorials',
    category: 'patterns-templates',
    subcategory: 'sewing',
    programmeId: 'silk-stilettos',
    tags: ['pattern', 'sewing', 'zero-waste', 'sustainable', 'dress'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 28,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/patterns/zero-waste-dress-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'PDF',
      fileSize: 15000000,
      format: 'A4/Letter printable',
      instantDelivery: true
    },
    inStock: true,
    sales: 24,
    views: 210,
    favourites: 18,
    reviews: [],
    averageRating: 4.9,
    status: 'active',
    createdDate: new Date('2025-09-01'),
    lastUpdated: new Date()
  },
  
  // Tech Products
  {
    id: 'product-6',
    creatorId: 'creator-3',
    title: 'Creator Portfolio Theme',
    description: 'Beautiful, fast portfolio website template for creative professionals. Built with Next.js, optimised for performance and SEO. Includes dark mode, project gallery, contact form, and blog.',
    shortDescription: 'Modern portfolio website template',
    category: 'website-themes',
    subcategory: 'portfolio',
    programmeId: 'techreneurs',
    tags: ['portfolio', 'website', 'template', 'nextjs', 'creative'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 89,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/templates/portfolio-theme-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'ZIP',
      fileSize: 18000000,
      format: 'Next.js/React',
      instantDelivery: true
    },
    inStock: true,
    sales: 31,
    views: 420,
    favourites: 56,
    reviews: [],
    averageRating: 4.6,
    status: 'active',
    createdDate: new Date('2025-06-01'),
    lastUpdated: new Date()
  },
  {
    id: 'product-7',
    creatorId: 'creator-3',
    title: 'Small Business Automation Kit',
    description: 'Collection of automation scripts and templates for small creative businesses. Includes invoice generator, email templates, booking system setup guide, and social media scheduler config.',
    shortDescription: 'Automation tools for creative businesses',
    category: 'digital-templates',
    subcategory: 'business',
    programmeId: 'techreneurs',
    tags: ['automation', 'business', 'tools', 'productivity', 'templates'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 45,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/tools/automation-kit-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'ZIP',
      fileSize: 8000000,
      format: 'Various (PDF, JS, JSON)',
      instantDelivery: true
    },
    inStock: true,
    sales: 19,
    views: 165,
    favourites: 24,
    reviews: [],
    averageRating: 4.7,
    status: 'active',
    createdDate: new Date('2025-08-15'),
    lastUpdated: new Date()
  },
  
  // Audio/Content Products
  {
    id: 'product-8',
    creatorId: 'creator-4',
    title: 'Heritage Voices: Caribbean Stories Collection',
    description: '10-episode audio series featuring oral histories from Caribbean elders in Brent. Professionally produced with transcripts and discussion guides. Perfect for schools, community groups, or personal listening.',
    shortDescription: 'Oral history audio series with transcripts',
    category: 'e-books',
    subcategory: 'audio',
    programmeId: 'gtechcasters',
    tags: ['oral history', 'caribbean', 'heritage', 'audio', 'stories'],
    type: 'digital',
    deliveryMethod: 'digital-access',
    pricing: {
      basePrice: 35,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/audio/heritage-voices-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'MP3 + PDF',
      fileSize: 250000000,
      format: '320kbps MP3',
      instantDelivery: true
    },
    inStock: true,
    sales: 45,
    views: 320,
    favourites: 67,
    reviews: [],
    averageRating: 5.0,
    status: 'active',
    createdDate: new Date('2025-04-20'),
    lastUpdated: new Date()
  },
  {
    id: 'product-9',
    creatorId: 'creator-4',
    title: 'Podcast Launch Guide',
    description: 'Complete guide to launching your community podcast. Covers equipment on a budget, recording techniques, editing workflow, distribution, and growing your audience. Includes templates and checklists.',
    shortDescription: 'Step-by-step podcast launch guide',
    category: 'e-books',
    subcategory: 'guides',
    programmeId: 'pageturners',
    tags: ['podcast', 'guide', 'audio', 'how-to', 'community'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 18,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/ebooks/podcast-guide-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'PDF',
      fileSize: 12000000,
      format: 'PDF with links',
      instantDelivery: true
    },
    inStock: true,
    sales: 38,
    views: 280,
    favourites: 42,
    reviews: [],
    averageRating: 4.8,
    status: 'active',
    createdDate: new Date('2025-07-25'),
    lastUpdated: new Date()
  },
  
  // STEM Products
  {
    id: 'product-10',
    creatorId: 'creator-5',
    title: 'STEM Activity Kit: Kitchen Science',
    description: '15 hands-on science experiments using everyday kitchen items. Designed for ages 7-12. Includes printable instruction cards, parent/teacher guide, and assessment rubrics. Curriculum-aligned.',
    shortDescription: '15 kitchen science experiments for kids',
    category: 'educational-materials',
    subcategory: 'stem',
    programmeId: 'stemgeneers',
    tags: ['stem', 'science', 'kids', 'experiments', 'education'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 22,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/stem/kitchen-science-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'PDF',
      fileSize: 8000000,
      format: 'Printable PDF',
      instantDelivery: true
    },
    inStock: true,
    sales: 56,
    views: 380,
    favourites: 48,
    reviews: [],
    averageRating: 4.9,
    status: 'active',
    createdDate: new Date('2025-05-10'),
    lastUpdated: new Date()
  },
  {
    id: 'product-11',
    creatorId: 'creator-5',
    title: 'Maths Games Collection',
    description: '20 printable maths games for KS2 level. Covers multiplication, fractions, geometry, and problem-solving. Low-prep, high-engagement activities perfect for classrooms or home learning.',
    shortDescription: '20 printable maths games for KS2',
    category: 'educational-materials',
    subcategory: 'maths',
    programmeId: 'stemgeneers',
    tags: ['maths', 'games', 'ks2', 'printable', 'education'],
    type: 'digital',
    deliveryMethod: 'instant-download',
    pricing: {
      basePrice: 15,
      currency: 'GBP',
      hasVariants: false,
      creatorShare: 0.55,
      communityShare: 0.25,
      operationsShare: 0.20
    },
    thumbnail: '/images/marketplace/stem/maths-games-thumb.jpg',
    images: [],
    digitalDetails: {
      fileType: 'PDF',
      fileSize: 5000000,
      format: 'Printable PDF',
      instantDelivery: true
    },
    inStock: true,
    sales: 82,
    views: 450,
    favourites: 63,
    reviews: [],
    averageRating: 4.8,
    status: 'active',
    createdDate: new Date('2025-06-05'),
    lastUpdated: new Date()
  }
];

// ============================================
// SAMPLE SERVICES
// ============================================

export const SAMPLE_SERVICES: Partial<Service>[] = [
  // Music Services
  {
    id: 'service-1',
    creatorId: 'creator-1',
    title: 'Custom Beat Production',
    description: 'Get a custom beat made to your specifications. I\'ll work with you to create the perfect instrumental for your project. Includes reference track analysis, 2 revision rounds, and stems.',
    shortDescription: 'Custom beat production service',
    category: 'music-production',
    subcategory: 'beats',
    programmeId: 'trubble-n-bass',
    tags: ['custom', 'beats', 'production', 'music'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 150,
      typicalRange: { min: 150, max: 500 },
      packages: [
        {
          id: 'basic',
          name: 'Basic',
          description: 'Simple beat with standard arrangement',
          price: 150,
          includes: ['MP3 & WAV delivery', 'Basic mix', '1 revision round'],
          deliverables: ['Stereo master file'],
          turnaround: '5 days'
        },
        {
          id: 'pro',
          name: 'Professional',
          description: 'Professional beat with full arrangement and stems',
          price: 300,
          includes: ['MP3, WAV & Stems', 'Full professional mix', '3 revision rounds', 'Commercial rights'],
          deliverables: ['Stereo master', 'Trackout stems (up to 20)'],
          turnaround: '7 days',
          popular: true
        },
        {
          id: 'premium',
          name: 'Premium Exclusive',
          description: 'Premium beat with exclusive rights',
          price: 500,
          includes: ['All formats and stems', 'Unlimited revisions', 'Exclusive rights', 'Project file available'],
          deliverables: ['Full project files on request'],
          turnaround: '10 days'
        }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'remote',
    turnaroundTime: '5-10 days',
    minimumNotice: 2,
    includes: ['Initial consultation call', 'Reference track analysis', 'Professional mixing'],
    deliverables: ['Beat files in requested formats', 'Mix session notes'],
    revisions: 3,
    requirements: ['Reference tracks or artists you like', 'Genre and mood description', 'BPM preference if any'],
    thumbnail: '/images/marketplace/services/custom-beats-thumb.jpg',
    images: [],
    portfolioExamples: ['product-1', 'product-2'],
    bookingType: 'consultation-first',
    completedProjects: 34,
    reviews: [],
    averageRating: 4.8,
    repeatClientRate: 45,
    status: 'active',
    createdDate: new Date('2025-06-20'),
    lastUpdated: new Date()
  },
  
  // Fashion Services
  {
    id: 'service-2',
    creatorId: 'creator-2',
    title: 'Custom Garment Design',
    description: 'Have a unique piece created just for you. We\'ll discuss your vision, take measurements, and create something special using sustainable materials and upcycled fabrics where possible.',
    shortDescription: 'Bespoke sustainable fashion design',
    category: 'fashion-design',
    subcategory: 'custom',
    programmeId: 'silk-stilettos',
    tags: ['custom', 'fashion', 'bespoke', 'sustainable'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 200,
      typicalRange: { min: 200, max: 800 },
      packages: [
        {
          id: 'simple',
          name: 'Simple Piece',
          description: 'Single garment - skirt, top, or simple dress',
          price: 200,
          includes: ['Design consultation', 'One fitting session', 'Materials', 'Final garment'],
          deliverables: ['1 custom garment'],
          turnaround: '2 weeks'
        },
        {
          id: 'statement',
          name: 'Statement Piece',
          description: 'Complex garment - jacket, structured dress, or set',
          price: 450,
          includes: ['Extended design consultation', '2 fitting sessions', 'Premium/complex construction'],
          deliverables: ['1 statement garment'],
          turnaround: '3 weeks',
          popular: true
        },
        {
          id: 'collection',
          name: 'Mini Collection',
          description: '3 coordinating pieces',
          price: 750,
          includes: ['Full wardrobe consultation', 'Multiple fittings', 'Coordinated design'],
          deliverables: ['3 coordinating garments'],
          turnaround: '5 weeks'
        }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'in-person',
    location: 'Harlesden, NW10',
    turnaroundTime: '2-5 weeks',
    minimumNotice: 7,
    includes: ['Design consultation', 'Fabric sourcing', 'Fittings', 'Alterations'],
    deliverables: ['Custom garment(s)', 'Care instructions'],
    requirements: ['In-person measurement session in Harlesden', 'Style references or inspiration images'],
    thumbnail: '/images/marketplace/services/custom-garment-thumb.jpg',
    images: [],
    portfolioExamples: ['product-4'],
    bookingType: 'consultation-first',
    completedProjects: 18,
    reviews: [],
    averageRating: 5.0,
    repeatClientRate: 60,
    status: 'active',
    createdDate: new Date('2025-05-01'),
    lastUpdated: new Date()
  },
  {
    id: 'service-3',
    creatorId: 'creator-2',
    title: 'Upcycling Workshop',
    description: 'Learn to transform old clothes into new treasures. Small group sessions covering cutting techniques, reconstruction methods, and styling upcycled pieces. All materials provided.',
    shortDescription: 'Learn sustainable fashion techniques',
    category: 'workshop-facilitation',
    subcategory: 'fashion',
    programmeId: 'scrap-cat',
    tags: ['workshop', 'upcycling', 'sustainable', 'learn', 'fashion'],
    pricingModel: 'hourly',
    pricing: {
      hourlyRate: 45,
      minimumHours: 3,
      creatorShare: 0.70,
      communityShare: 0.15,
      operationsShare: 0.15
    },
    deliveryMethod: 'in-person',
    location: 'Wembley Wonders Studio / Your venue',
    turnaroundTime: 'Single session',
    minimumNotice: 3,
    includes: ['All materials and tools', 'Expert instruction', 'Take-home project'],
    deliverables: ['Completed upcycled garment', 'Technique guide handout'],
    requirements: ['Bring 2-3 old garments to upcycle', 'Suitable for ages 16+'],
    thumbnail: '/images/marketplace/services/upcycling-workshop-thumb.jpg',
    images: [],
    portfolioExamples: [],
    bookingType: 'instant',
    completedProjects: 12,
    reviews: [],
    averageRating: 4.9,
    repeatClientRate: 30,
    status: 'active',
    createdDate: new Date('2025-09-15'),
    lastUpdated: new Date()
  },
  
  // Tech Services
  {
    id: 'service-4',
    creatorId: 'creator-3',
    title: 'Website Development',
    description: 'Professional website development for creative businesses. From portfolio sites to e-commerce stores. Mobile-responsive, fast, and SEO-optimised.',
    shortDescription: 'Custom website development',
    category: 'web-development',
    subcategory: 'full-stack',
    programmeId: 'techreneurs',
    tags: ['website', 'development', 'custom', 'business'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 500,
      typicalRange: { min: 500, max: 3000 },
      packages: [
        {
          id: 'portfolio',
          name: 'Portfolio Site',
          description: 'Beautiful portfolio to showcase your work',
          price: 500,
          includes: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup'],
          deliverables: ['Live website', '1 hour training'],
          turnaround: '2 weeks'
        },
        {
          id: 'business',
          name: 'Business Site',
          description: 'Full business website with booking/contact features',
          price: 1200,
          includes: ['Up to 10 pages', 'Booking/scheduling system', 'Blog capability', 'Full SEO'],
          deliverables: ['Live website', 'CMS training', 'Documentation'],
          turnaround: '4 weeks',
          popular: true
        },
        {
          id: 'ecommerce',
          name: 'E-commerce',
          description: 'Complete online store',
          price: 2500,
          includes: ['Unlimited products', 'Payment processing', 'Inventory management', 'Full SEO'],
          deliverables: ['Full e-commerce site', 'Admin training', 'Launch support'],
          turnaround: '6 weeks'
        }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'remote',
    turnaroundTime: '2-6 weeks',
    minimumNotice: 3,
    includes: ['Design mockups for approval', 'Development', 'Testing', 'Training session'],
    deliverables: ['Live website', 'Documentation', 'Training'],
    revisions: 3,
    requirements: ['Brand assets (logo, colours)', 'Content (text, images)', 'Domain (or we can help purchase)'],
    thumbnail: '/images/marketplace/services/web-dev-thumb.jpg',
    images: [],
    portfolioExamples: ['product-6'],
    bookingType: 'consultation-first',
    completedProjects: 28,
    reviews: [],
    averageRating: 4.7,
    repeatClientRate: 35,
    status: 'active',
    createdDate: new Date('2025-02-10'),
    lastUpdated: new Date()
  },
  {
    id: 'service-5',
    creatorId: 'creator-3',
    title: 'Tech Support Retainer',
    description: 'Ongoing tech support for your creative business. Website updates, troubleshooting, advice, and small changes. Priority response times.',
    shortDescription: 'Monthly tech support subscription',
    category: 'tech-support',
    subcategory: 'retainer',
    programmeId: 'techreneurs',
    tags: ['support', 'tech', 'monthly', 'maintenance', 'retainer'],
    pricingModel: 'retainer',
    pricing: {
      retainerOptions: [
        { name: 'Basic', hoursIncluded: 2, monthlyPrice: 100 },
        { name: 'Standard', hoursIncluded: 5, monthlyPrice: 200 },
        { name: 'Premium', hoursIncluded: 10, monthlyPrice: 350 }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'remote',
    turnaroundTime: 'Same day for urgent, 48hr standard',
    minimumNotice: 0,
    includes: ['Website updates', 'Bug fixes', 'Email support', 'Monthly check-in call'],
    deliverables: ['Monthly activity report', 'Priority support access'],
    requirements: ['Existing website or digital system'],
    thumbnail: '/images/marketplace/services/tech-support-thumb.jpg',
    images: [],
    portfolioExamples: [],
    bookingType: 'instant',
    completedProjects: 45,
    reviews: [],
    averageRating: 4.8,
    repeatClientRate: 80,
    status: 'active',
    createdDate: new Date('2025-04-01'),
    lastUpdated: new Date()
  },
  
  // Audio/Content Services
  {
    id: 'service-6',
    creatorId: 'creator-4',
    title: 'Podcast Production',
    description: 'Full podcast production service. From raw recording to polished episode ready for distribution. Includes editing, sound design, intro/outro music, and show notes.',
    shortDescription: 'Complete podcast production',
    category: 'podcast-production',
    subcategory: 'full-production',
    programmeId: 'gtechcasters',
    tags: ['podcast', 'production', 'editing', 'audio'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 75,
      typicalRange: { min: 75, max: 300 },
      packages: [
        {
          id: 'edit',
          name: 'Edit Only',
          description: 'Clean up and polish your recording',
          price: 75,
          includes: ['Noise reduction', 'Editing out mistakes', 'Level balancing', 'Export in multiple formats'],
          deliverables: ['Edited episode file'],
          turnaround: '3 days'
        },
        {
          id: 'standard',
          name: 'Standard Production',
          description: 'Full production with intro/outro',
          price: 150,
          includes: ['Full editing', 'Intro/outro music', 'Sound design', 'Show notes draft'],
          deliverables: ['Episode file', 'Show notes', 'Audiogram clip'],
          turnaround: '5 days',
          popular: true
        },
        {
          id: 'premium',
          name: 'Premium Package',
          description: 'Everything plus transcription and social clips',
          price: 250,
          includes: ['Premium editing', 'Full transcription', '3 social media clips', 'SEO-optimised notes'],
          deliverables: ['Episode', 'Transcript', 'Social clips', 'Full notes'],
          turnaround: '7 days'
        }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'remote',
    turnaroundTime: '3-7 days per episode',
    minimumNotice: 2,
    includes: ['Pre-production consultation', 'Professional editing', 'Quality assurance'],
    deliverables: ['Episode files', 'Show notes', 'Optional transcription'],
    requirements: ['Raw audio recording', 'Episode brief/topic'],
    thumbnail: '/images/marketplace/services/podcast-prod-thumb.jpg',
    images: [],
    portfolioExamples: ['product-8'],
    bookingType: 'instant',
    completedProjects: 85,
    reviews: [],
    averageRating: 4.9,
    repeatClientRate: 70,
    status: 'active',
    createdDate: new Date('2025-04-15'),
    lastUpdated: new Date()
  },
  {
    id: 'service-7',
    creatorId: 'creator-4',
    title: 'Oral History Recording',
    description: 'Professional oral history interviews to preserve family or community stories. Includes interview facilitation, recording, editing, and archival-quality final product.',
    shortDescription: 'Preserve your family or community stories',
    category: 'audio-editing',
    subcategory: 'oral-history',
    programmeId: 'gtechcasters',
    tags: ['oral history', 'recording', 'heritage', 'family', 'community'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 200,
      typicalRange: { min: 200, max: 500 },
      packages: [
        {
          id: 'single',
          name: 'Single Interview',
          description: 'One 90-minute interview session',
          price: 200,
          includes: ['Pre-interview consultation', '90-minute recording', 'Full editing', 'Transcript'],
          deliverables: ['Edited audio', 'Full transcript', 'USB copy'],
          turnaround: '2 weeks'
        },
        {
          id: 'extended',
          name: 'Extended Project',
          description: '3 interview sessions for in-depth storytelling',
          price: 450,
          includes: ['Multiple sessions', 'Themed episodes', 'Photo integration', 'Family tree research'],
          deliverables: ['3 edited episodes', 'Transcripts', 'Memory book'],
          turnaround: '4 weeks',
          popular: true
        }
      ],
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'hybrid',
    location: 'Your home or Wembley Wonders studio',
    turnaroundTime: '2-4 weeks',
    minimumNotice: 7,
    includes: ['Interview preparation', 'Professional recording equipment', 'Sensitive facilitation'],
    deliverables: ['Archival-quality audio', 'Written transcript', 'Physical copy'],
    requirements: ['Interview subject available', 'Quiet space for recording'],
    thumbnail: '/images/marketplace/services/oral-history-thumb.jpg',
    images: [],
    portfolioExamples: ['product-8'],
    bookingType: 'consultation-first',
    completedProjects: 15,
    reviews: [],
    averageRating: 5.0,
    repeatClientRate: 40,
    status: 'active',
    createdDate: new Date('2025-05-20'),
    lastUpdated: new Date()
  },
  
  // STEM Services
  {
    id: 'service-8',
    creatorId: 'creator-5',
    title: 'STEM Tutoring',
    description: 'One-to-one or small group STEM tutoring for ages 7-16. Covering maths, science, and basic coding. Engaging, hands-on approach that builds confidence.',
    shortDescription: 'Personal STEM tutoring for young people',
    category: 'tutoring',
    subcategory: 'stem',
    programmeId: 'stemgeneers',
    tags: ['tutoring', 'stem', 'maths', 'science', 'coding'],
    pricingModel: 'hourly',
    pricing: {
      hourlyRate: 45,
      minimumHours: 1,
      creatorShare: 0.60,
      communityShare: 0.20,
      operationsShare: 0.20
    },
    deliveryMethod: 'hybrid',
    location: 'Online or Brent area',
    turnaroundTime: 'Weekly sessions recommended',
    minimumNotice: 1,
    includes: ['Personalised learning plan', 'Progress tracking', 'Parent updates', 'Homework support'],
    deliverables: ['Session notes', 'Progress reports'],
    requirements: ['Initial assessment session', 'Regular weekly commitment recommended'],
    thumbnail: '/images/marketplace/services/stem-tutoring-thumb.jpg',
    images: [],
    portfolioExamples: ['product-10', 'product-11'],
    bookingType: 'consultation-first',
    completedProjects: 120,
    reviews: [],
    averageRating: 4.9,
    repeatClientRate: 85,
    status: 'active',
    createdDate: new Date('2025-03-01'),
    lastUpdated: new Date()
  },
  {
    id: 'service-9',
    creatorId: 'creator-5',
    title: 'School STEM Day',
    description: 'Full-day STEM programme for schools. Hands-on workshops, exciting demonstrations, and curriculum-aligned learning. Perfect for science weeks or enrichment days.',
    shortDescription: 'Full STEM day for schools',
    category: 'workshop-facilitation',
    subcategory: 'schools',
    programmeId: 'bright-sparks',
    tags: ['school', 'stem', 'workshop', 'science', 'education'],
    pricingModel: 'project',
    pricing: {
      startingPrice: 400,
      typicalRange: { min: 400, max: 800 },
      packages: [
        {
          id: 'half-day',
          name: 'Half Day',
          description: '3 hours of STEM activities',
          price: 400,
          includes: ['2 workshop sessions', 'All materials', 'Take-home activities', 'Teacher resources'],
          deliverables: ['Student workbooks', 'Follow-up lesson plan'],
          turnaround: 'Single day'
        },
        {
          id: 'full-day',
          name: 'Full Day',
          description: 'Complete STEM immersion day',
          price: 650,
          includes: ['4 workshop sessions', 'Science show', 'All materials', 'Certificates'],
          deliverables: ['Full resource pack', 'Photo documentation'],
          turnaround: 'Single day',
          popular: true
        },
        {
          id: 'week',
          name: 'STEM Week',
          description: 'Full week programme with different themes daily',
          price: 2500,
          includes: ['5 themed days', 'Assembly presentation', 'Parent showcase', 'Full resources'],
          deliverables: ['Complete curriculum pack', 'Celebration event'],
          turnaround: '5 days'
        }
      ],
      creatorShare: 0.70,
      communityShare: 0.15,
      operationsShare: 0.15
    },
    deliveryMethod: 'in-person',
    location: 'Your school (Brent and surrounding areas)',
    turnaroundTime: 'Single day to 1 week',
    minimumNotice: 14,
    includes: ['Pre-visit planning meeting', 'All equipment and materials', 'Risk assessment', 'DBS-checked facilitator'],
    deliverables: ['Student resources', 'Teacher follow-up pack', 'Certificates'],
    requirements: ['Classroom space', 'Access to water for some experiments', 'Teacher/TA support'],
    thumbnail: '/images/marketplace/services/stem-school-thumb.jpg',
    images: [],
    portfolioExamples: [],
    bookingType: 'consultation-first',
    completedProjects: 25,
    reviews: [],
    averageRating: 5.0,
    repeatClientRate: 70,
    status: 'active',
    createdDate: new Date('2025-04-10'),
    lastUpdated: new Date()
  }
];

// ============================================
// MARKETPLACE CATEGORIES
// ============================================

export const MARKETPLACE_CATEGORIES = [
  {
    id: 'music',
    name: 'Music & Audio',
    icon: '🎵',
    subcategories: ['Beats', 'Sample Packs', 'Sound Kits', 'Mixing/Mastering'],
    productCount: 124,
    programmeId: 'trubble-n-bass' as ProgrammeId
  },
  {
    id: 'fashion',
    name: 'Fashion & Accessories',
    icon: '👗',
    subcategories: ['Clothing', 'Accessories', 'Patterns', 'Upcycled'],
    productCount: 67,
    programmeId: 'silk-stilettos' as ProgrammeId
  },
  {
    id: 'tech',
    name: 'Tech & Digital',
    icon: '💻',
    subcategories: ['Websites', 'Templates', 'Apps', 'Automation'],
    productCount: 89,
    programmeId: 'techreneurs' as ProgrammeId
  },
  {
    id: 'content',
    name: 'Content & Media',
    icon: '🎙️',
    subcategories: ['Podcasting', 'Video', 'Writing', 'Photography'],
    productCount: 45,
    programmeId: 'gtechcasters' as ProgrammeId
  },
  {
    id: 'food',
    name: 'Food & Catering',
    icon: '🍲',
    subcategories: ['Catering', 'Recipes', 'Cooking Classes', 'Food Products'],
    productCount: 23,
    programmeId: 'auntie-anansis-kitchen' as ProgrammeId
  },
  {
    id: 'education',
    name: 'Education & Youth',
    icon: '📚',
    subcategories: ['Tutoring', 'Workshops', 'Lesson Plans', 'Youth Programmes'],
    productCount: 56,
    programmeId: 'stemgeneers' as ProgrammeId
  },
  {
    id: 'performance',
    name: 'Performance & Events',
    icon: '🎭',
    subcategories: ['MC/Hosting', 'Drama', 'Workshops', 'Entertainment'],
    productCount: 34,
    programmeId: 'kaywanas-court' as ProgrammeId
  },
  {
    id: 'sustainable',
    name: 'Sustainable & Upcycled',
    icon: '♻️',
    subcategories: ['Furniture', 'Fashion', 'Crafts', 'Repair Services'],
    productCount: 41,
    programmeId: 'scrap-cat' as ProgrammeId
  }
];

// ============================================
// FEATURED DATA
// ============================================

export const FEATURED_CREATORS = ['creator-1', 'creator-2', 'creator-5'];
export const FEATURED_PRODUCTS = ['product-1', 'product-4', 'product-8', 'product-10'];
export const FEATURED_SERVICES = ['service-1', 'service-4', 'service-6', 'service-9'];

// ============================================
// EXPORT
// ============================================

export default {
  SAMPLE_CREATORS,
  SAMPLE_PRODUCTS,
  SAMPLE_SERVICES,
  MARKETPLACE_CATEGORIES,
  FEATURED_CREATORS,
  FEATURED_PRODUCTS,
  FEATURED_SERVICES
};