/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Programme Progression Framework
 * 
 * The master system that tracks learning progression across all programmes,
 * connects to Polish Labs for quality refinement, and enables Cyberstore monetisation.
 * 
 * Pipeline: SANDBOX → PROGRESSION → POLISH LAB → CYBERSTORE
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

export interface ProgressionLevel {
  level: number;
  name: string;
  description: string;
  requiredMinutes: number;         // Cumulative minutes needed
  requiredProjects: number;        // Projects to complete
  skills: string[];                // Skills demonstrated at this level
  badge: string;                   // Emoji badge
  cyberstoreEligible: boolean;     // Can sell at this level?
  polishLabAccess: string[];       // Which polish labs unlock
}

export interface ProgrammeDefinition {
  id: string;
  name: string;
  icon: string;
  category: 'creative' | 'technical' | 'performance' | 'business' | 'foundation';
  description: string;
  levels: ProgressionLevel[];
  monetisableOutputs: MonetisableOutput[];
  polishLab: string;               // Primary polish lab
  tutionEquivalent: number;        // £/hour equivalent
}

export interface MonetisableOutput {
  id: string;
  name: string;
  description: string;
  minLevel: number;                // Minimum level to create
  priceRange: { min: number; max: number };
  polishRequired: boolean;
  category: string;
}

export interface UserProgress {
  odataId: string;
  odataEtag: string;
  odataEditLink: string;
  odataContext: string;
  userId: string;
  odataType: string;
  programmeId: string;
  totalMinutes: number;
  projectsCompleted: number;
  currentLevel: number;
  skillsUnlocked: string[];
  polishLabCredits: number;        // Credits earned for polish lab access
  cyberstoreListings: number;
  totalEarnings: number;
  lastActivity: Date;
  levelHistory: { level: number; achievedAt: Date }[];
}

// ============================================
// PROGRAMME DEFINITIONS
// ============================================

export const PROGRAMME_DEFINITIONS: ProgrammeDefinition[] = [
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    category: 'creative',
    description: 'Music production, from first beat to professional release',
    tutionEquivalent: 55,
    polishLab: 'sound-lab',
    levels: [
      {
        level: 1,
        name: 'First Sounds',
        description: 'Explore the studio, make noise, find your vibe',
        requiredMinutes: 300,        // 5 hours
        requiredProjects: 1,
        skills: ['Basic rhythm', 'Pad triggering', 'Studio navigation'],
        badge: '🎵',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Beat Builder',
        description: 'Create structured loops and patterns',
        requiredMinutes: 900,        // 15 hours cumulative
        requiredProjects: 3,
        skills: ['Loop creation', 'Pattern sequencing', 'Kit selection', 'Basic arrangement'],
        badge: '🥁',
        cyberstoreEligible: false,
        polishLabAccess: ['sound-lab-basic']
      },
      {
        level: 3,
        name: 'Rhythm Master',
        description: 'Produce complete instrumentals with melody and harmony',
        requiredMinutes: 2400,       // 40 hours cumulative
        requiredProjects: 6,
        skills: ['Melody creation', 'Chord progressions', 'Song structure', 'Genre awareness'],
        badge: '🎹',
        cyberstoreEligible: true,    // CAN SELL BEATS
        polishLabAccess: ['sound-lab-basic', 'sound-lab-mixing']
      },
      {
        level: 4,
        name: 'Producer',
        description: 'Create polished, release-ready tracks',
        requiredMinutes: 4800,       // 80 hours cumulative
        requiredProjects: 12,
        skills: ['Mixing basics', 'Sound design', 'Collaboration', 'Client work'],
        badge: '🎛️',
        cyberstoreEligible: true,
        polishLabAccess: ['sound-lab-basic', 'sound-lab-mixing', 'sound-lab-mastering']
      },
      {
        level: 5,
        name: 'Sound Architect',
        description: 'Professional-level production and mentorship capability',
        requiredMinutes: 9000,       // 150 hours cumulative
        requiredProjects: 25,
        skills: ['Advanced mixing', 'Mastering basics', 'Production mentoring', 'Industry knowledge'],
        badge: '👑',
        cyberstoreEligible: true,
        polishLabAccess: ['sound-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'beat-lease',
        name: 'Beat Lease',
        description: 'Non-exclusive beat license',
        minLevel: 3,
        priceRange: { min: 25, max: 100 },
        polishRequired: true,
        category: 'music'
      },
      {
        id: 'beat-exclusive',
        name: 'Exclusive Beat',
        description: 'Full ownership transfer',
        minLevel: 3,
        priceRange: { min: 100, max: 500 },
        polishRequired: true,
        category: 'music'
      },
      {
        id: 'production-service',
        name: 'Production Service',
        description: 'Custom beat/track creation',
        minLevel: 4,
        priceRange: { min: 150, max: 1000 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'mixing-service',
        name: 'Mixing Service',
        description: 'Mix other artists\' tracks',
        minLevel: 4,
        priceRange: { min: 50, max: 200 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'sound-pack',
        name: 'Sound Pack',
        description: 'Collection of sounds/samples',
        minLevel: 4,
        priceRange: { min: 15, max: 50 },
        polishRequired: true,
        category: 'digital'
      },
      {
        id: 'jingle',
        name: 'Jingle/Ident',
        description: 'Short music for branding',
        minLevel: 3,
        priceRange: { min: 50, max: 300 },
        polishRequired: true,
        category: 'music'
      }
    ]
  },
  {
    id: 'pageturners',
    name: 'PageTurners',
    icon: '📚',
    category: 'creative',
    description: 'Creative writing, from first story to published author',
    tutionEquivalent: 45,
    polishLab: 'edit-lab',
    levels: [
      {
        level: 1,
        name: 'Word Explorer',
        description: 'Find your voice, start writing',
        requiredMinutes: 240,        // 4 hours
        requiredProjects: 1,
        skills: ['Freewriting', 'Journaling', 'Basic storytelling'],
        badge: '✏️',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Story Starter',
        description: 'Complete short pieces with structure',
        requiredMinutes: 720,        // 12 hours cumulative
        requiredProjects: 3,
        skills: ['Story structure', 'Character basics', 'Dialogue', 'Editing own work'],
        badge: '📝',
        cyberstoreEligible: false,
        polishLabAccess: ['edit-lab-basic']
      },
      {
        level: 3,
        name: 'Story Weaver',
        description: 'Create complete narratives with depth',
        requiredMinutes: 1680,       // 28 hours cumulative
        requiredProjects: 6,
        skills: ['Plot development', 'Character arcs', 'World building', 'Genre awareness'],
        badge: '📖',
        cyberstoreEligible: true,    // CAN SELL STORIES
        polishLabAccess: ['edit-lab-basic', 'edit-lab-developmental']
      },
      {
        level: 4,
        name: 'Author',
        description: 'Produce polished, publishable work',
        requiredMinutes: 3360,       // 56 hours cumulative
        requiredProjects: 12,
        skills: ['Advanced narrative', 'Self-editing', 'Reader engagement', 'Series planning'],
        badge: '📕',
        cyberstoreEligible: true,
        polishLabAccess: ['edit-lab-full', 'edit-lab-copyedit']
      },
      {
        level: 5,
        name: 'Literary Creator',
        description: 'Professional-level writing and mentorship',
        requiredMinutes: 6000,       // 100 hours cumulative
        requiredProjects: 25,
        skills: ['Multiple genres', 'Writing mentoring', 'Publishing knowledge', 'Platform building'],
        badge: '🏆',
        cyberstoreEligible: true,
        polishLabAccess: ['edit-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'short-story',
        name: 'Short Story',
        description: 'Complete short fiction',
        minLevel: 3,
        priceRange: { min: 2, max: 10 },
        polishRequired: true,
        category: 'ebook'
      },
      {
        id: 'story-collection',
        name: 'Story Collection',
        description: 'Multiple stories bundled',
        minLevel: 4,
        priceRange: { min: 5, max: 15 },
        polishRequired: true,
        category: 'ebook'
      },
      {
        id: 'novella',
        name: 'Novella',
        description: '15,000-40,000 words',
        minLevel: 4,
        priceRange: { min: 8, max: 20 },
        polishRequired: true,
        category: 'ebook'
      },
      {
        id: 'writing-service',
        name: 'Writing Service',
        description: 'Custom content creation',
        minLevel: 4,
        priceRange: { min: 50, max: 500 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'blog-article',
        name: 'Blog/Article',
        description: 'Non-fiction content',
        minLevel: 3,
        priceRange: { min: 25, max: 150 },
        polishRequired: true,
        category: 'content'
      }
    ]
  },
  {
    id: 'g-tech-casters',
    name: 'G-Tech Casters',
    icon: '🎙️',
    category: 'creative',
    description: 'Podcasting and audio content creation',
    tutionEquivalent: 40,
    polishLab: 'broadcast-lab',
    levels: [
      {
        level: 1,
        name: 'Voice Found',
        description: 'Find confidence speaking, basic recording',
        requiredMinutes: 180,        // 3 hours
        requiredProjects: 1,
        skills: ['Basic recording', 'Speaking to mic', 'Audio software basics'],
        badge: '🎤',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Podcaster',
        description: 'Create complete episodes with structure',
        requiredMinutes: 540,        // 9 hours cumulative
        requiredProjects: 3,
        skills: ['Episode structure', 'Basic editing', 'Show planning', 'Guest handling'],
        badge: '🎙️',
        cyberstoreEligible: true,    // CAN OFFER SERVICES
        polishLabAccess: ['broadcast-lab-basic']
      },
      {
        level: 3,
        name: 'Show Host',
        description: 'Run a consistent show with production value',
        requiredMinutes: 1140,       // 19 hours cumulative
        requiredProjects: 8,
        skills: ['Advanced editing', 'Music/SFX integration', 'Audience building', 'Interview skills'],
        badge: '📻',
        cyberstoreEligible: true,
        polishLabAccess: ['broadcast-lab-basic', 'broadcast-lab-production']
      },
      {
        level: 4,
        name: 'Broadcast Pro',
        description: 'Professional-quality audio content',
        requiredMinutes: 2040,       // 34 hours cumulative
        requiredProjects: 15,
        skills: ['Multi-format content', 'Monetisation', 'Team management', 'Live broadcasting'],
        badge: '🎚️',
        cyberstoreEligible: true,
        polishLabAccess: ['broadcast-lab-full']
      },
      {
        level: 5,
        name: 'Media Creator',
        description: 'Multi-platform presence and mentorship',
        requiredMinutes: 3240,       // 54 hours cumulative
        requiredProjects: 25,
        skills: ['Cross-platform', 'Mentoring', 'Industry connections', 'Brand partnerships'],
        badge: '📡',
        cyberstoreEligible: true,
        polishLabAccess: ['broadcast-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'podcast-episode',
        name: 'Sponsored Episode',
        description: 'Episode with integrated sponsorship',
        minLevel: 3,
        priceRange: { min: 50, max: 500 },
        polishRequired: true,
        category: 'content'
      },
      {
        id: 'voice-over',
        name: 'Voice Over Service',
        description: 'Custom voice recording',
        minLevel: 2,
        priceRange: { min: 30, max: 200 },
        polishRequired: true,
        category: 'service'
      },
      {
        id: 'podcast-production',
        name: 'Podcast Production',
        description: 'Edit and produce for others',
        minLevel: 3,
        priceRange: { min: 50, max: 150 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'audio-course',
        name: 'Audio Course',
        description: 'Educational audio content',
        minLevel: 4,
        priceRange: { min: 20, max: 100 },
        polishRequired: true,
        category: 'digital'
      }
    ]
  },
  {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🤖',
    category: 'technical',
    description: 'Robotics, coding, and engineering through play',
    tutionEquivalent: 50,
    polishLab: 'code-lab',
    levels: [
      {
        level: 1,
        name: 'Curious Mind',
        description: 'Explore, tinker, discover how things work',
        requiredMinutes: 360,        // 6 hours
        requiredProjects: 1,
        skills: ['Basic logic', 'Following instructions', 'Problem identification'],
        badge: '🔍',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Code Builder',
        description: 'Write working code, understand logic flow',
        requiredMinutes: 1080,       // 18 hours cumulative
        requiredProjects: 3,
        skills: ['Variables', 'Loops', 'Conditionals', 'Basic debugging'],
        badge: '💻',
        cyberstoreEligible: false,
        polishLabAccess: ['code-lab-basic']
      },
      {
        level: 3,
        name: 'Robot Wrangler',
        description: 'Build and program functional robots/devices',
        requiredMinutes: 2160,       // 36 hours cumulative
        requiredProjects: 6,
        skills: ['Hardware basics', 'Sensors', 'Motor control', 'Project planning'],
        badge: '🤖',
        cyberstoreEligible: false,
        polishLabAccess: ['code-lab-basic', 'code-lab-review']
      },
      {
        level: 4,
        name: 'Engineer',
        description: 'Create complex systems and solutions',
        requiredMinutes: 3600,       // 60 hours cumulative
        requiredProjects: 12,
        skills: ['System design', 'API integration', 'Documentation', 'Testing'],
        badge: '⚙️',
        cyberstoreEligible: true,    // CAN SELL CODE/PROJECTS
        polishLabAccess: ['code-lab-full']
      },
      {
        level: 5,
        name: 'Tech Innovator',
        description: 'Professional-level development and leadership',
        requiredMinutes: 5400,       // 90 hours cumulative
        requiredProjects: 25,
        skills: ['Architecture', 'Team leading', 'Tech mentoring', 'Industry awareness'],
        badge: '🚀',
        cyberstoreEligible: true,
        polishLabAccess: ['code-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'code-project',
        name: 'Code Project',
        description: 'Complete working application/tool',
        minLevel: 4,
        priceRange: { min: 50, max: 500 },
        polishRequired: true,
        category: 'digital'
      },
      {
        id: 'website',
        name: 'Website Build',
        description: 'Custom website creation',
        minLevel: 4,
        priceRange: { min: 100, max: 1000 },
        polishRequired: true,
        category: 'service'
      },
      {
        id: 'tutorial',
        name: 'Tech Tutorial',
        description: 'Educational coding content',
        minLevel: 4,
        priceRange: { min: 10, max: 50 },
        polishRequired: true,
        category: 'digital'
      },
      {
        id: 'tech-support',
        name: 'Tech Support Service',
        description: 'Help others with technical problems',
        minLevel: 4,
        priceRange: { min: 25, max: 100 },
        polishRequired: false,
        category: 'service'
      }
    ]
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    icon: '🎭',
    category: 'performance',
    description: 'Performance, drama, and cultural expression',
    tutionEquivalent: 50,
    polishLab: 'performance-lab',
    levels: [
      {
        level: 1,
        name: 'Stage Curious',
        description: 'Overcome stage fear, find your presence',
        requiredMinutes: 240,        // 4 hours
        requiredProjects: 1,
        skills: ['Basic presence', 'Breathing', 'Eye contact', 'Voice projection basics'],
        badge: '🎪',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Stage Ready',
        description: 'Perform prepared material confidently',
        requiredMinutes: 720,        // 12 hours cumulative
        requiredProjects: 3,
        skills: ['Memorisation', 'Character basics', 'Blocking', 'Audience awareness'],
        badge: '🎭',
        cyberstoreEligible: false,
        polishLabAccess: ['performance-lab-basic']
      },
      {
        level: 3,
        name: 'Performer',
        description: 'Create and deliver original performances',
        requiredMinutes: 1440,       // 24 hours cumulative
        requiredProjects: 6,
        skills: ['Original material', 'Physical expression', 'Emotional range', 'Performance timing'],
        badge: '⭐',
        cyberstoreEligible: true,    // CAN OFFER SERVICES
        polishLabAccess: ['performance-lab-basic', 'performance-lab-recording']
      },
      {
        level: 4,
        name: 'Stage Artist',
        description: 'Professional-quality performances',
        requiredMinutes: 2520,       // 42 hours cumulative
        requiredProjects: 12,
        skills: ['Multiple styles', 'Direction basics', 'Show construction', 'Collaboration'],
        badge: '🌟',
        cyberstoreEligible: true,
        polishLabAccess: ['performance-lab-full']
      },
      {
        level: 5,
        name: 'Performance Master',
        description: 'Leadership, direction, and mentorship',
        requiredMinutes: 4020,       // 67 hours cumulative
        requiredProjects: 25,
        skills: ['Direction', 'Mentoring', 'Event production', 'Cultural programming'],
        badge: '👑',
        cyberstoreEligible: true,
        polishLabAccess: ['performance-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'performance-booking',
        name: 'Performance Booking',
        description: 'Hire for events/shows',
        minLevel: 3,
        priceRange: { min: 50, max: 500 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'workshop-facilitation',
        name: 'Workshop Facilitation',
        description: 'Lead drama/performance workshops',
        minLevel: 4,
        priceRange: { min: 75, max: 200 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'mc-hosting',
        name: 'MC/Hosting',
        description: 'Event hosting services',
        minLevel: 3,
        priceRange: { min: 100, max: 400 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'performance-video',
        name: 'Performance Recording',
        description: 'Recorded performance for sale/streaming',
        minLevel: 3,
        priceRange: { min: 5, max: 25 },
        polishRequired: true,
        category: 'digital'
      }
    ]
  },
  {
    id: 'scrap-cat',
    name: 'Scrap Cat',
    icon: '♻️',
    category: 'creative',
    description: 'Upcycling, sustainable making, and craft',
    tutionEquivalent: 30,
    polishLab: 'design-lab',
    levels: [
      {
        level: 1,
        name: 'Material Explorer',
        description: 'Learn to see potential in discarded materials',
        requiredMinutes: 180,        // 3 hours
        requiredProjects: 1,
        skills: ['Material identification', 'Basic tools', 'Safety', 'Creative thinking'],
        badge: '🔍',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Maker',
        description: 'Create functional items from reclaimed materials',
        requiredMinutes: 540,        // 9 hours cumulative
        requiredProjects: 3,
        skills: ['Construction basics', 'Finishing', 'Design thinking', 'Tool proficiency'],
        badge: '🔨',
        cyberstoreEligible: true,    // CAN SELL ITEMS
        polishLabAccess: ['design-lab-basic']
      },
      {
        level: 3,
        name: 'Craftsperson',
        description: 'Produce consistent, sellable quality work',
        requiredMinutes: 1140,       // 19 hours cumulative
        requiredProjects: 8,
        skills: ['Quality control', 'Batch production', 'Pricing', 'Customer focus'],
        badge: '✂️',
        cyberstoreEligible: true,
        polishLabAccess: ['design-lab-basic', 'design-lab-photography']
      },
      {
        level: 4,
        name: 'Artisan',
        description: 'Create distinctive, signature pieces',
        requiredMinutes: 1740,       // 29 hours cumulative
        requiredProjects: 15,
        skills: ['Signature style', 'Complex techniques', 'Commission handling', 'Brand building'],
        badge: '🎨',
        cyberstoreEligible: true,
        polishLabAccess: ['design-lab-full']
      },
      {
        level: 5,
        name: 'Master Maker',
        description: 'Professional-level craft and teaching',
        requiredMinutes: 2940,       // 49 hours cumulative
        requiredProjects: 25,
        skills: ['Teaching', 'Workshop design', 'Sustainable business', 'Material sourcing'],
        badge: '🏅',
        cyberstoreEligible: true,
        polishLabAccess: ['design-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'handmade-item',
        name: 'Handmade Item',
        description: 'Individual crafted piece',
        minLevel: 2,
        priceRange: { min: 10, max: 200 },
        polishRequired: true,
        category: 'physical'
      },
      {
        id: 'commission',
        name: 'Custom Commission',
        description: 'Made-to-order piece',
        minLevel: 3,
        priceRange: { min: 50, max: 500 },
        polishRequired: false,
        category: 'physical'
      },
      {
        id: 'workshop',
        name: 'Workshop Session',
        description: 'Teach others your craft',
        minLevel: 4,
        priceRange: { min: 25, max: 100 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'craft-kit',
        name: 'DIY Craft Kit',
        description: 'Materials + instructions bundle',
        minLevel: 3,
        priceRange: { min: 15, max: 50 },
        polishRequired: true,
        category: 'physical'
      }
    ]
  },
  {
    id: 'joystick',
    name: 'Joystick',
    icon: '🎮',
    category: 'creative',
    description: 'Gaming content, journalism, and e-zine creation',
    tutionEquivalent: 35,
    polishLab: 'edit-lab',
    levels: [
      {
        level: 1,
        name: 'Player with Opinions',
        description: 'Start expressing thoughts about games',
        requiredMinutes: 240,        // 4 hours
        requiredProjects: 1,
        skills: ['Review basics', 'Opinion articulation', 'Gaming literacy'],
        badge: '🎮',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Content Creator',
        description: 'Create consistent gaming content',
        requiredMinutes: 720,        // 12 hours cumulative
        requiredProjects: 5,
        skills: ['Review writing', 'Video basics', 'Screenshot/capture', 'Editing'],
        badge: '📝',
        cyberstoreEligible: true,    // CAN CONTRIBUTE TO E-ZINE
        polishLabAccess: ['edit-lab-basic']
      },
      {
        level: 3,
        name: 'Games Journalist',
        description: 'Professional-quality gaming coverage',
        requiredMinutes: 1440,       // 24 hours cumulative
        requiredProjects: 12,
        skills: ['In-depth analysis', 'News coverage', 'Interview skills', 'Deadline management'],
        badge: '📰',
        cyberstoreEligible: true,
        polishLabAccess: ['edit-lab-basic', 'edit-lab-copyedit']
      },
      {
        level: 4,
        name: 'Editor',
        description: 'Lead content sections and mentor others',
        requiredMinutes: 2400,       // 40 hours cumulative
        requiredProjects: 20,
        skills: ['Editorial judgment', 'Team coordination', 'Section management', 'Quality standards'],
        badge: '📋',
        cyberstoreEligible: true,
        polishLabAccess: ['edit-lab-full']
      },
      {
        level: 5,
        name: 'Games Media Pro',
        description: 'Industry-level content and leadership',
        requiredMinutes: 3600,       // 60 hours cumulative
        requiredProjects: 35,
        skills: ['Publication management', 'Industry networking', 'Brand development', 'Monetisation'],
        badge: '🏆',
        cyberstoreEligible: true,
        polishLabAccess: ['edit-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'game-review',
        name: 'Game Review',
        description: 'Published review for e-zine',
        minLevel: 2,
        priceRange: { min: 25, max: 75 },
        polishRequired: true,
        category: 'content'
      },
      {
        id: 'feature-article',
        name: 'Feature Article',
        description: 'In-depth gaming feature',
        minLevel: 3,
        priceRange: { min: 50, max: 150 },
        polishRequired: true,
        category: 'content'
      },
      {
        id: 'gaming-guide',
        name: 'Gaming Guide',
        description: 'Strategy/walkthrough guide',
        minLevel: 2,
        priceRange: { min: 5, max: 25 },
        polishRequired: true,
        category: 'digital'
      },
      {
        id: 'video-content',
        name: 'Video Content',
        description: 'Gaming video for channels',
        minLevel: 3,
        priceRange: { min: 30, max: 100 },
        polishRequired: true,
        category: 'content'
      }
    ]
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    icon: '💼',
    category: 'business',
    description: 'Business skills, entrepreneurship, and launch',
    tutionEquivalent: 45,
    polishLab: 'business-lab',
    levels: [
      {
        level: 1,
        name: 'Idea Explorer',
        description: 'Identify opportunities and develop concepts',
        requiredMinutes: 300,        // 5 hours
        requiredProjects: 1,
        skills: ['Idea generation', 'Problem identification', 'Basic research'],
        badge: '💡',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Planner',
        description: 'Create viable business plans',
        requiredMinutes: 900,        // 15 hours cumulative
        requiredProjects: 2,
        skills: ['Business planning', 'Market research', 'Financial basics', 'Value proposition'],
        badge: '📊',
        cyberstoreEligible: false,
        polishLabAccess: ['business-lab-basic']
      },
      {
        level: 3,
        name: 'Launcher',
        description: 'Take products/services to market',
        requiredMinutes: 1800,       // 30 hours cumulative
        requiredProjects: 4,
        skills: ['Launch strategy', 'Marketing basics', 'Sales', 'Customer service'],
        badge: '🚀',
        cyberstoreEligible: true,    // CAN LIST SERVICES
        polishLabAccess: ['business-lab-basic', 'business-lab-pitch']
      },
      {
        level: 4,
        name: 'Entrepreneur',
        description: 'Run sustainable business operations',
        requiredMinutes: 3000,       // 50 hours cumulative
        requiredProjects: 8,
        skills: ['Operations', 'Scaling', 'Team building', 'Financial management'],
        badge: '💼',
        cyberstoreEligible: true,
        polishLabAccess: ['business-lab-full']
      },
      {
        level: 5,
        name: 'Business Leader',
        description: 'Leadership, investment, and mentorship',
        requiredMinutes: 4500,       // 75 hours cumulative
        requiredProjects: 15,
        skills: ['Strategic planning', 'Investment readiness', 'Mentoring', 'Community impact'],
        badge: '👔',
        cyberstoreEligible: true,
        polishLabAccess: ['business-lab-full', 'mentor-access']
      }
    ],
    monetisableOutputs: [
      {
        id: 'business-service',
        name: 'Business Service',
        description: 'Professional services offering',
        minLevel: 3,
        priceRange: { min: 50, max: 1000 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'consulting',
        name: 'Consulting Session',
        description: 'Business advice for others',
        minLevel: 4,
        priceRange: { min: 50, max: 200 },
        polishRequired: false,
        category: 'service'
      },
      {
        id: 'business-template',
        name: 'Business Template',
        description: 'Reusable business documents',
        minLevel: 3,
        priceRange: { min: 10, max: 50 },
        polishRequired: true,
        category: 'digital'
      }
    ]
  },
  {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    icon: '💡',
    category: 'foundation',
    description: 'Foundational learning through play (younger learners)',
    tutionEquivalent: 45,
    polishLab: 'none',
    levels: [
      {
        level: 1,
        name: 'Spark',
        description: 'Ignite curiosity and engagement',
        requiredMinutes: 300,        // 5 hours
        requiredProjects: 2,
        skills: ['Curiosity', 'Following instructions', 'Basic patterns'],
        badge: '✨',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Curious Mind',
        description: 'Ask questions and seek answers',
        requiredMinutes: 900,        // 15 hours cumulative
        requiredProjects: 5,
        skills: ['Questioning', 'Observation', 'Number basics', 'Letter recognition'],
        badge: '🔍',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 3,
        name: 'Explorer',
        description: 'Independent exploration and problem-solving',
        requiredMinutes: 1800,       // 30 hours cumulative
        requiredProjects: 10,
        skills: ['Problem solving', 'Pattern recognition', 'Reading basics', 'Simple maths'],
        badge: '🧭',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 4,
        name: 'Discoverer',
        description: 'Connect concepts and apply learning',
        requiredMinutes: 3000,       // 50 hours cumulative
        requiredProjects: 15,
        skills: ['Concept connection', 'Applied learning', 'Helping others', 'Creative thinking'],
        badge: '🌟',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 5,
        name: 'Ready to Rise',
        description: 'Prepared for advanced programmes',
        requiredMinutes: 4500,       // 75 hours cumulative
        requiredProjects: 20,
        skills: ['Independent learning', 'Multiple subjects', 'Peer support', 'Goal setting'],
        badge: '🦋',
        cyberstoreEligible: false,
        polishLabAccess: []
      }
    ],
    monetisableOutputs: [] // No monetisation - pure learning programme
  },
  {
    id: 'money-reset',
    name: 'Money Reset',
    icon: '💰',
    category: 'foundation',
    description: 'Financial literacy and community wealth building',
    tutionEquivalent: 40,
    polishLab: 'none',
    levels: [
      {
        level: 1,
        name: 'Aware',
        description: 'Understand your financial situation',
        requiredMinutes: 180,        // 3 hours
        requiredProjects: 1,
        skills: ['Budget awareness', 'Tracking spending', 'Goal identification'],
        badge: '👀',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 2,
        name: 'Planner',
        description: 'Create and follow financial plans',
        requiredMinutes: 540,        // 9 hours cumulative
        requiredProjects: 2,
        skills: ['Budgeting', 'Saving basics', 'Debt awareness', 'Pardner understanding'],
        badge: '📋',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 3,
        name: 'Builder',
        description: 'Actively building financial stability',
        requiredMinutes: 1140,       // 19 hours cumulative
        requiredProjects: 4,
        skills: ['Emergency fund', 'Debt reduction', 'Pardner participation', 'Income diversification'],
        badge: '🧱',
        cyberstoreEligible: false,
        polishLabAccess: []
      },
      {
        level: 4,
        name: 'Wealth Creator',
        description: 'Growing assets and helping others',
        requiredMinutes: 1740,       // 29 hours cumulative
        requiredProjects: 6,
        skills: ['Investment basics', 'Running pardner circles', 'Financial mentoring', 'Long-term planning'],
        badge: '📈',
        cyberstoreEligible: false,
        polishLabAccess: []
      }
    ],
    monetisableOutputs: [] // No direct monetisation - enables monetisation in other programmes
  }
];

// ============================================
// POLISH LAB DEFINITIONS
// ============================================

export interface PolishLab {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: PolishService[];
  programmes: string[];            // Which programmes feed into this lab
}

export interface PolishService {
  id: string;
  name: string;
  description: string;
  creditsRequired: number;         // Credits needed (earned through progression)
  turnaroundDays: number;
}

export const POLISH_LABS: PolishLab[] = [
  {
    id: 'sound-lab',
    name: 'Sound Lab',
    icon: '🎵',
    description: 'Audio mastering, mixing review, and format preparation',
    programmes: ['trubble-n-bass'],
    services: [
      { id: 'mix-review', name: 'Mix Review', description: 'Feedback on your mix with suggestions', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'basic-master', name: 'Basic Mastering', description: 'Loudness, EQ, limiting for release', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'full-master', name: 'Full Mastering', description: 'Professional mastering with revisions', creditsRequired: 4, turnaroundDays: 7 },
      { id: 'stem-master', name: 'Stem Mastering', description: 'Individual stem processing', creditsRequired: 6, turnaroundDays: 10 }
    ]
  },
  {
    id: 'edit-lab',
    name: 'Edit Lab',
    icon: '📝',
    description: 'Copy editing, proofreading, and formatting',
    programmes: ['pageturners', 'joystick'],
    services: [
      { id: 'proofread', name: 'Proofreading', description: 'Spelling, grammar, punctuation check', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'copy-edit', name: 'Copy Edit', description: 'Style, clarity, consistency', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'developmental', name: 'Developmental Edit', description: 'Structure and content feedback', creditsRequired: 4, turnaroundDays: 10 },
      { id: 'format', name: 'eBook Formatting', description: 'Format for digital publication', creditsRequired: 2, turnaroundDays: 5 }
    ]
  },
  {
    id: 'broadcast-lab',
    name: 'Broadcast Lab',
    icon: '📻',
    description: 'Audio cleanup, show production, and broadcast prep',
    programmes: ['g-tech-casters'],
    services: [
      { id: 'audio-cleanup', name: 'Audio Cleanup', description: 'Noise reduction, levels, clarity', creditsRequired: 1, turnaroundDays: 2 },
      { id: 'show-edit', name: 'Show Edit', description: 'Full episode editing and assembly', creditsRequired: 3, turnaroundDays: 5 },
      { id: 'intro-creation', name: 'Intro/Outro Creation', description: 'Custom show intro with music', creditsRequired: 2, turnaroundDays: 7 },
      { id: 'show-notes', name: 'Show Notes', description: 'Timestamped notes and description', creditsRequired: 1, turnaroundDays: 2 }
    ]
  },
  {
    id: 'design-lab',
    name: 'Design Lab',
    icon: '🎨',
    description: 'Product photography, descriptions, and listing prep',
    programmes: ['scrap-cat'],
    services: [
      { id: 'photo-shoot', name: 'Product Photography', description: 'Professional photos of your items', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'description', name: 'Product Description', description: 'Compelling sales copy', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'pricing-review', name: 'Pricing Review', description: 'Market-appropriate pricing guidance', creditsRequired: 1, turnaroundDays: 2 },
      { id: 'brand-pack', name: 'Brand Package', description: 'Logo, tags, packaging design', creditsRequired: 4, turnaroundDays: 10 }
    ]
  },
  {
    id: 'code-lab',
    name: 'Code Lab',
    icon: '💻',
    description: 'Code review, documentation, and deployment',
    programmes: ['stemgeneers'],
    services: [
      { id: 'code-review', name: 'Code Review', description: 'Feedback on code quality and style', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'documentation', name: 'Documentation Help', description: 'README and user guide assistance', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'deployment', name: 'Deployment Support', description: 'Help getting your project live', creditsRequired: 3, turnaroundDays: 7 },
      { id: 'testing', name: 'Testing Review', description: 'Test coverage and quality assurance', creditsRequired: 2, turnaroundDays: 5 }
    ]
  },
  {
    id: 'performance-lab',
    name: 'Performance Lab',
    icon: '🎭',
    description: 'Recording review, clip editing, and showcase prep',
    programmes: ['kaywanas-court'],
    services: [
      { id: 'recording-review', name: 'Recording Review', description: 'Feedback on recorded performance', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'clip-edit', name: 'Clip Editing', description: 'Edit performance highlights', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'showcase-prep', name: 'Showcase Preparation', description: 'Help preparing for live showcase', creditsRequired: 3, turnaroundDays: 7 },
      { id: 'demo-reel', name: 'Demo Reel Creation', description: 'Compiled performance highlights', creditsRequired: 4, turnaroundDays: 10 }
    ]
  },
  {
    id: 'business-lab',
    name: 'Business Lab',
    icon: '💼',
    description: 'Business plan review, pitch prep, and launch support',
    programmes: ['techreneurs'],
    services: [
      { id: 'plan-review', name: 'Business Plan Review', description: 'Feedback on your business plan', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'pitch-prep', name: 'Pitch Preparation', description: 'Help preparing your pitch', creditsRequired: 2, turnaroundDays: 5 },
      { id: 'pricing-strategy', name: 'Pricing Strategy', description: 'Develop your pricing model', creditsRequired: 1, turnaroundDays: 3 },
      { id: 'launch-support', name: 'Launch Support', description: 'Marketing and launch assistance', creditsRequired: 4, turnaroundDays: 10 }
    ]
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getProgrammeById = (id: string): ProgrammeDefinition | undefined => {
  return PROGRAMME_DEFINITIONS.find(p => p.id === id);
};

export const getPolishLabById = (id: string): PolishLab | undefined => {
  return POLISH_LABS.find(l => l.id === id);
};

export const calculateLevel = (progress: UserProgress): number => {
  const programme = getProgrammeById(progress.programmeId);
  if (!programme) return 1;
  
  for (let i = programme.levels.length - 1; i >= 0; i--) {
    const level = programme.levels[i];
    if (progress.totalMinutes >= level.requiredMinutes && 
        progress.projectsCompleted >= level.requiredProjects) {
      return level.level;
    }
  }
  return 1;
};

export const getNextLevelRequirements = (progress: UserProgress): { 
  minutesNeeded: number; 
  projectsNeeded: number;
  percentComplete: number;
} | null => {
  const programme = getProgrammeById(progress.programmeId);
  if (!programme) return null;
  
  const nextLevelIndex = progress.currentLevel;
  if (nextLevelIndex >= programme.levels.length) return null;
  
  const nextLevel = programme.levels[nextLevelIndex];
  const minutesNeeded = Math.max(0, nextLevel.requiredMinutes - progress.totalMinutes);
  const projectsNeeded = Math.max(0, nextLevel.requiredProjects - progress.projectsCompleted);
  
  const minutesPercent = Math.min(100, (progress.totalMinutes / nextLevel.requiredMinutes) * 100);
  const projectsPercent = Math.min(100, (progress.projectsCompleted / nextLevel.requiredProjects) * 100);
  const percentComplete = Math.floor((minutesPercent + projectsPercent) / 2);
  
  return { minutesNeeded, projectsNeeded, percentComplete };
};

export const canSellOnCyberstore = (progress: UserProgress): boolean => {
  const programme = getProgrammeById(progress.programmeId);
  if (!programme) return false;
  
  const currentLevelDef = programme.levels[progress.currentLevel - 1];
  return currentLevelDef?.cyberstoreEligible || false;
};

export const getAvailableOutputs = (progress: UserProgress): MonetisableOutput[] => {
  const programme = getProgrammeById(progress.programmeId);
  if (!programme) return [];
  
  return programme.monetisableOutputs.filter(output => output.minLevel <= progress.currentLevel);
};

export const calculateTuitionValue = (
  programmeId: string, 
  minutes: number
): number => {
  const programme = getProgrammeById(programmeId);
  if (!programme) return 0;
  
  const hours = minutes / 60;
  return Math.round(hours * programme.tutionEquivalent);
};

export const calculatePolishCredits = (progress: UserProgress): number => {
  // Earn 1 credit per level achieved, plus bonus for projects
  return progress.currentLevel + Math.floor(progress.projectsCompleted / 5);
};

// ============================================
// CONTEXT PROVIDER
// ============================================

interface ProgressionContextType {
  programmes: ProgrammeDefinition[];
  polishLabs: PolishLab[];
  getUserProgress: (userId: string, programmeId: string) => UserProgress | null;
  updateProgress: (userId: string, programmeId: string, minutesAdded: number, projectCompleted?: boolean) => void;
  checkLevelUp: (userId: string, programmeId: string) => boolean;
}

const ProgressionContext = createContext<ProgressionContextType | null>(null);

export const useProgression = () => {
  const context = useContext(ProgressionContext);
  if (!context) {
    throw new Error('useProgression must be used within ProgressionProvider');
  }
  return context;
};

export const ProgressionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<Map<string, UserProgress>>(new Map());
  
  const getUserProgress = useCallback((userId: string, programmeId: string): UserProgress | null => {
    const key = `${userId}-${programmeId}`;
    return userProgress.get(key) || null;
  }, [userProgress]);
  
  const updateProgress = useCallback((
    userId: string, 
    programmeId: string, 
    minutesAdded: number, 
    projectCompleted?: boolean
  ) => {
    const key = `${userId}-${programmeId}`;
    
    setUserProgress(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(key) || {
        odataId: '',
        odataEtag: '',
        odataEditLink: '',
        odataContext: '',
        odataType: '',
        userId,
        programmeId,
        totalMinutes: 0,
        projectsCompleted: 0,
        currentLevel: 1,
        skillsUnlocked: [],
        polishLabCredits: 0,
        cyberstoreListings: 0,
        totalEarnings: 0,
        lastActivity: new Date(),
        levelHistory: [{ level: 1, achievedAt: new Date() }]
      };
      
      const updated: UserProgress = {
        ...existing,
        totalMinutes: existing.totalMinutes + minutesAdded,
        projectsCompleted: existing.projectsCompleted + (projectCompleted ? 1 : 0),
        lastActivity: new Date()
      };
      
      // Check for level up
      const newLevel = calculateLevel(updated);
      if (newLevel > updated.currentLevel) {
        updated.currentLevel = newLevel;
        updated.levelHistory.push({ level: newLevel, achievedAt: new Date() });
        updated.polishLabCredits = calculatePolishCredits(updated);
        
        // Unlock skills for new level
        const programme = getProgrammeById(programmeId);
        if (programme) {
          const levelDef = programme.levels[newLevel - 1];
          updated.skillsUnlocked = [...new Set([...updated.skillsUnlocked, ...levelDef.skills])];
        }
      }
      
      newMap.set(key, updated);
      return newMap;
    });
  }, []);
  
  const checkLevelUp = useCallback((userId: string, programmeId: string): boolean => {
    const progress = getUserProgress(userId, programmeId);
    if (!progress) return false;
    
    const calculatedLevel = calculateLevel(progress);
    return calculatedLevel > progress.currentLevel;
  }, [getUserProgress]);
  
  return (
    <ProgressionContext.Provider value={{
      programmes: PROGRAMME_DEFINITIONS,
      polishLabs: POLISH_LABS,
      getUserProgress,
      updateProgress,
      checkLevelUp
    }}>
      {children}
    </ProgressionContext.Provider>
  );
};

export default ProgressionProvider;