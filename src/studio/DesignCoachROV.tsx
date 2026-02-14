/**
 * DESIGN COACH ROV
 * 
 * Production guidance for Kaywana's Court creators.
 * Covers fashion design, visual arts, branding, and styling.
 * 
 * Philosophy: AI can generate infinite images.
 * Only you can develop YOUR aesthetic.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface DesignCreatorProfile {
  id: string;
  name: string;
  workshopsCompleted: number;
  specialization: 'fashion' | 'graphic' | 'branding' | 'mixed' | null;
  tools: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  portfolioItems: number;
  projectsCompleted: number;
}

export type DesignTask = 
  | 'create-logo'
  | 'design-brand'
  | 'fashion-sketch'
  | 'social-graphics'
  | 'mood-board'
  | 'color-palette'
  | 'typography'
  | 'portfolio'
  | 'client-presentation';

export interface DesignToolRecommendation {
  name: string;
  type: 'design' | 'ai' | 'resource' | 'inspiration';
  cost: 'free' | 'freemium' | 'paid';
  url?: string;
  purpose: string;
  learningCurve: 'easy' | 'medium' | 'hard';
  bestFor: string[];
  limitations: string[];
}

export interface DesignGuide {
  title: string;
  steps: DesignStep[];
  aiIntegration: AIDesignGuide;
  estimatedTime: string;
  skillsLearned: string[];
  deliverables: string[];
}

export interface DesignStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  commonMistakes?: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface AIDesignGuide {
  recommended: boolean;
  tools: string[];
  bestFor: string[];
  avoidFor: string[];
  philosophy: string;
  ethicalNote?: string;
}

// ============================================================
// TOOL DATABASE
// ============================================================

const DESIGN_TOOLS: DesignToolRecommendation[] = [
  // Design Software
  {
    name: 'Canva',
    type: 'design',
    cost: 'freemium',
    url: 'https://www.canva.com',
    purpose: 'All-in-one design platform with templates',
    learningCurve: 'easy',
    bestFor: ['Social media graphics', 'Presentations', 'Quick mockups', 'Beginners'],
    limitations: ['Less control than pro tools', 'Templates can look generic']
  },
  {
    name: 'Figma',
    type: 'design',
    cost: 'freemium',
    url: 'https://www.figma.com',
    purpose: 'Professional UI/UX and graphic design',
    learningCurve: 'medium',
    bestFor: ['Brand systems', 'UI design', 'Collaboration', 'Scalable design'],
    limitations: ['Steeper learning curve', 'Overkill for simple graphics']
  },
  {
    name: 'Adobe Illustrator',
    type: 'design',
    cost: 'paid',
    purpose: 'Industry-standard vector graphics',
    learningCurve: 'hard',
    bestFor: ['Logos', 'Print design', 'Professional work', 'Scalable graphics'],
    limitations: ['Expensive subscription', 'Complex for beginners']
  },
  {
    name: 'Procreate',
    type: 'design',
    cost: 'paid',
    purpose: 'Digital illustration on iPad',
    learningCurve: 'medium',
    bestFor: ['Fashion sketches', 'Illustration', 'Hand-drawn style', 'Texture'],
    limitations: ['iPad only', 'One-time purchase but needs hardware']
  },
  {
    name: 'Photopea',
    type: 'design',
    cost: 'free',
    url: 'https://www.photopea.com',
    purpose: 'Free Photoshop alternative in browser',
    learningCurve: 'medium',
    bestFor: ['Photo editing', 'Compositing', 'No budget', 'Quick edits'],
    limitations: ['Less powerful than Photoshop', 'Browser-based limitations']
  },
  
  // AI Tools
  {
    name: 'Midjourney',
    type: 'ai',
    cost: 'paid',
    url: 'https://midjourney.com',
    purpose: 'High-quality AI image generation',
    learningCurve: 'medium',
    bestFor: ['Mood boards', 'Concept exploration', 'Inspiration', 'Textures'],
    limitations: ['Can\'t create exact designs', 'Ethical concerns', 'Discord-based']
  },
  {
    name: 'DALL-E 3',
    type: 'ai',
    cost: 'freemium',
    url: 'https://openai.com/dall-e-3',
    purpose: 'Text-to-image with good prompt understanding',
    learningCurve: 'easy',
    bestFor: ['Quick concepts', 'Iteration', 'Specific prompts', 'ChatGPT integration'],
    limitations: ['Less artistic than Midjourney', 'Usage limits']
  },
  {
    name: 'Adobe Firefly',
    type: 'ai',
    cost: 'freemium',
    url: 'https://firefly.adobe.com',
    purpose: 'AI generation trained on licensed content',
    learningCurve: 'easy',
    bestFor: ['Commercial-safe images', 'Adobe integration', 'Extend/modify images'],
    limitations: ['Less creative than Midjourney', 'Adobe ecosystem']
  },
  {
    name: 'Canva AI',
    type: 'ai',
    cost: 'freemium',
    purpose: 'AI features built into Canva',
    learningCurve: 'easy',
    bestFor: ['Magic Design', 'Background removal', 'Quick generation'],
    limitations: ['Less powerful than dedicated AI tools']
  },
  {
    name: 'Vizcom',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.vizcom.ai',
    purpose: 'Sketch to render for product/fashion design',
    learningCurve: 'medium',
    bestFor: ['Fashion sketches to renders', 'Product visualization', 'Ideation'],
    limitations: ['Specific use case', 'Requires basic sketching']
  },
  
  // Inspiration & Resources
  {
    name: 'Pinterest',
    type: 'inspiration',
    cost: 'free',
    url: 'https://www.pinterest.com',
    purpose: 'Visual inspiration and mood boarding',
    learningCurve: 'easy',
    bestFor: ['Research', 'Mood boards', 'Client communication', 'Trends'],
    limitations: ['Can lead to copying', 'Algorithmic bubble']
  },
  {
    name: 'Behance',
    type: 'inspiration',
    cost: 'free',
    url: 'https://www.behance.net',
    purpose: 'Professional design portfolio platform',
    learningCurve: 'easy',
    bestFor: ['Portfolio hosting', 'Professional inspiration', 'Networking'],
    limitations: ['High bar can be intimidating', 'Adobe owned']
  },
  {
    name: 'Coolors',
    type: 'resource',
    cost: 'freemium',
    url: 'https://coolors.co',
    purpose: 'Color palette generator',
    learningCurve: 'easy',
    bestFor: ['Quick palettes', 'Color theory', 'Brand colors'],
    limitations: ['Still need eye for what works']
  },
  {
    name: 'Google Fonts',
    type: 'resource',
    cost: 'free',
    url: 'https://fonts.google.com',
    purpose: 'Free, commercial-use fonts',
    learningCurve: 'easy',
    bestFor: ['Typography', 'Brand fonts', 'Web-safe fonts'],
    limitations: ['Common fonts can look generic']
  }
];

// ============================================================
// DESIGN GUIDES
// ============================================================

const DESIGN_GUIDES: Record<DesignTask, (profile: DesignCreatorProfile) => DesignGuide> = {
  'create-logo': (profile) => ({
    title: 'Creating a Logo',
    steps: [
      {
        step: 1,
        title: 'Understand the Brief',
        description: 'Know what you\'re designing for before you design',
        tips: [
          'Ask: What does this brand stand for?',
          'Who is the target audience?',
          'What feeling should it evoke?',
          'Research competitors - be different'
        ],
        commonMistakes: [
          'Jumping straight into design without research',
          'Not asking enough questions'
        ]
      },
      {
        step: 2,
        title: 'Sketch Ideas',
        description: 'Start on paper, not screen',
        tips: [
          'Quantity over quality at this stage',
          '20+ rough sketches minimum',
          'Don\'t judge yet - explore freely',
          'Words, symbols, abstract shapes - try everything'
        ],
        aiOption: {
          tool: 'Midjourney / DALL-E',
          howToUse: 'Generate concepts for inspiration, not final use',
          warning: 'AI logos are generic. Use for ideation only, never final delivery.'
        }
      },
      {
        step: 3,
        title: 'Develop 3 Directions',
        description: 'Pick your strongest concepts',
        tips: [
          'Choose 3 very different approaches',
          'One safe, one bold, one unexpected',
          'Move to digital with these 3',
          'Each should work in black & white first'
        ]
      },
      {
        step: 4,
        title: 'Refine & Digitize',
        description: 'Build in vector format',
        tips: [
          'Use Illustrator, Figma, or Canva',
          'Work in black & white first',
          'Ensure it works at small sizes',
          'Test on different backgrounds'
        ]
      },
      {
        step: 5,
        title: 'Present Options',
        description: 'Show the work professionally',
        tips: [
          'Mockups help clients visualize',
          'Explain the thinking behind each',
          'Present on neutral backgrounds',
          'Include size variations'
        ]
      },
      {
        step: 6,
        title: 'Deliver Files',
        description: 'Professional handoff',
        tips: [
          'SVG/AI for vector (scalable)',
          'PNG with transparent background',
          'Multiple sizes (favicon to banner)',
          'Include a simple style guide'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: ['Midjourney', 'DALL-E'],
      bestFor: ['Early brainstorming', 'Exploring directions'],
      avoidFor: ['Final logo delivery', 'Client work', 'Anything commercial'],
      philosophy: 'AI can generate logos, but they\'re generic and potentially legally risky. Clients pay for YOUR creativity.',
      ethicalNote: 'Never deliver AI-generated logos as your own work. It\'s unethical and potentially illegal.'
    },
    estimatedTime: profile.skillLevel === 'beginner' ? '8-16 hours' : '4-8 hours',
    skillsLearned: ['Brand thinking', 'Sketching', 'Vector design', 'Client presentation'],
    deliverables: ['Logo files (SVG, PNG)', 'Color variations', 'Size variations', 'Basic style guide']
  }),

  'design-brand': (profile) => ({
    title: 'Creating a Brand Identity',
    steps: [
      {
        step: 1,
        title: 'Brand Discovery',
        description: 'Understand the brand deeply',
        tips: [
          'Mission, vision, values - get these clear',
          'Target audience personas',
          'Brand personality (if it were a person...)',
          'Competitor analysis'
        ]
      },
      {
        step: 2,
        title: 'Mood Board',
        description: 'Visual direction exploration',
        tips: [
          'Collect 20-30 images that feel right',
          'Include colors, textures, typography',
          'Share with client before proceeding',
          'Pinterest boards work well for this'
        ],
        aiOption: {
          tool: 'Midjourney',
          howToUse: 'Generate mood images for specific vibes',
          warning: 'Use for mood/direction only, not final assets'
        }
      },
      {
        step: 3,
        title: 'Color Palette',
        description: 'Define the brand colors',
        tips: [
          'Primary color: Main brand color',
          'Secondary: Supporting color',
          'Accent: For highlights and CTAs',
          'Neutrals: For text and backgrounds',
          'Test for accessibility (contrast)'
        ]
      },
      {
        step: 4,
        title: 'Typography',
        description: 'Choose brand fonts',
        tips: [
          'Heading font: Personality',
          'Body font: Readability',
          'Maximum 2-3 fonts total',
          'Ensure web availability'
        ]
      },
      {
        step: 5,
        title: 'Logo & Marks',
        description: 'Primary and secondary logos',
        tips: [
          'Primary logo (full)',
          'Secondary/simplified version',
          'Icon/favicon',
          'Clear space rules'
        ]
      },
      {
        step: 6,
        title: 'Brand Guidelines',
        description: 'Document everything',
        tips: [
          'Logo usage rules',
          'Color codes (HEX, RGB, CMYK)',
          'Typography hierarchy',
          'Do\'s and don\'ts',
          'Application examples'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Midjourney', 'Canva AI', 'Coolors'],
      bestFor: ['Mood board creation', 'Color exploration', 'Mockup generation'],
      avoidFor: ['Final logo', 'Unique brand elements', 'Typography selection'],
      philosophy: 'AI is great for exploration and presentation. The strategic decisions are yours.'
    },
    estimatedTime: '20-40 hours',
    skillsLearned: ['Brand strategy', 'Visual systems', 'Documentation', 'Client management'],
    deliverables: ['Brand guidelines PDF', 'Logo package', 'Color palette', 'Font files', 'Templates']
  }),

  'fashion-sketch': (profile) => ({
    title: 'Fashion Sketching & Design',
    steps: [
      {
        step: 1,
        title: 'Learn the Figure',
        description: 'Fashion croquis (figure template)',
        tips: [
          'Fashion figures are 9-10 heads tall (elongated)',
          'Start with a croquis template',
          'Practice the pose before adding clothes',
          'Front, side, and 3/4 views'
        ]
      },
      {
        step: 2,
        title: 'Sketch the Silhouette',
        description: 'Overall shape first',
        tips: [
          'Block out the garment shape',
          'Don\'t worry about details yet',
          'Consider proportion and balance',
          'Multiple silhouettes, then choose'
        ]
      },
      {
        step: 3,
        title: 'Add Details',
        description: 'Seams, closures, embellishments',
        tips: [
          'Think about construction',
          'How does it close? Zip, buttons?',
          'Where are the seams?',
          'Pockets, collars, cuffs'
        ]
      },
      {
        step: 4,
        title: 'Fabric & Texture',
        description: 'Show how it drapes and moves',
        tips: [
          'Heavy fabrics fall differently than light',
          'Show folds and creases',
          'Indicate texture (knit, leather, silk)',
          'Shading adds dimension'
        ],
        aiOption: {
          tool: 'Vizcom / Midjourney',
          howToUse: 'Render your sketch into a realistic visualization',
          warning: 'AI renders are for visualization, not replacing your design skills'
        }
      },
      {
        step: 5,
        title: 'Technical Flat',
        description: 'Production-ready drawing',
        tips: [
          'Flat, no figure, front and back',
          'All construction details visible',
          'Include measurements if needed',
          'This is what a manufacturer needs'
        ]
      },
      {
        step: 6,
        title: 'Color & Present',
        description: 'Final presentation',
        tips: [
          'Color your fashion illustration',
          'Create a lineup if it\'s a collection',
          'Add fabric swatches',
          'Mood board for context'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Vizcom', 'Midjourney', 'DALL-E'],
      bestFor: ['Rendering sketches', 'Exploring colorways', 'Presentation mockups'],
      avoidFor: ['Learning to draw', 'Original design creation', 'Technical flats'],
      philosophy: 'AI can make your sketches look polished, but you need to DESIGN first. The ideas are yours.',
      ethicalNote: 'Fashion is about YOUR vision. AI can help visualize but can\'t replace creativity.'
    },
    estimatedTime: '4-8 hours per design',
    skillsLearned: ['Fashion illustration', 'Technical drawing', 'Fabric rendering', 'Collection building'],
    deliverables: ['Fashion illustrations', 'Technical flats', 'Fabric swatches', 'Mood board']
  }),

  'social-graphics': (profile) => ({
    title: 'Creating Social Media Graphics',
    steps: [
      {
        step: 1,
        title: 'Know Your Platforms',
        description: 'Each platform has different needs',
        tips: [
          'Instagram: 1080x1080 (feed), 1080x1920 (stories)',
          'TikTok: 1080x1920',
          'Twitter/X: 1200x675',
          'LinkedIn: 1200x627',
          'Design for where your audience is'
        ]
      },
      {
        step: 2,
        title: 'Establish Visual Consistency',
        description: 'Brand recognition across posts',
        tips: [
          'Use consistent colors (2-3 max)',
          'Same fonts throughout',
          'Recurring layout patterns',
          'Templates save time and build recognition'
        ]
      },
      {
        step: 3,
        title: 'Hierarchy & Readability',
        description: 'Make it scannable',
        tips: [
          'One main message per graphic',
          'Large text for key info',
          'Contrast for readability',
          'Test at small size (thumbnail)'
        ],
        aiOption: {
          tool: 'Canva AI / Adobe Express',
          howToUse: 'Generate variations and resize automatically',
          warning: 'AI templates can look generic - customize heavily'
        }
      },
      {
        step: 4,
        title: 'Create Templates',
        description: 'Reusable formats',
        tips: [
          'Quote template',
          'Announcement template',
          'Tips/carousel template',
          'Story template',
          'Save hours by templating'
        ]
      },
      {
        step: 5,
        title: 'Batch Create',
        description: 'Efficient content production',
        tips: [
          'Plan a week/month of content',
          'Create all graphics in one session',
          'Duplicate and modify templates',
          'Export all sizes at once'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Canva AI', 'Adobe Express', 'DALL-E'],
      bestFor: ['Quick background images', 'Resizing', 'Variation generation'],
      avoidFor: ['Brand-critical posts', 'When consistency matters most'],
      philosophy: 'AI can speed up production, but your brand eye should guide every decision.'
    },
    estimatedTime: '1-2 hours for a week\'s content',
    skillsLearned: ['Platform optimization', 'Template design', 'Batch production', 'Brand consistency'],
    deliverables: ['Post graphics', 'Stories', 'Templates', 'Content calendar']
  }),

  'mood-board': (profile) => ({
    title: 'Creating a Mood Board',
    steps: [
      {
        step: 1,
        title: 'Define the Goal',
        description: 'What is this mood board for?',
        tips: [
          'Client presentation?',
          'Personal project direction?',
          'Fashion collection?',
          'Interior/event design?',
          'The goal shapes what you include'
        ]
      },
      {
        step: 2,
        title: 'Gather Inspiration',
        description: 'Cast a wide net',
        tips: [
          'Pinterest is your friend',
          'Save more than you need (50+ images)',
          'Include: colors, textures, typography, photography, art',
          'Look beyond your category (fashion → architecture)'
        ],
        aiOption: {
          tool: 'Midjourney',
          howToUse: 'Generate images for specific moods/concepts',
          warning: 'Mix AI with real references - pure AI boards feel synthetic'
        }
      },
      {
        step: 3,
        title: 'Curate Ruthlessly',
        description: 'Edit down to the essential',
        tips: [
          'If it doesn\'t strengthen the story, remove it',
          '10-15 images maximum',
          'Every image should earn its place',
          'Look for connections between images'
        ]
      },
      {
        step: 4,
        title: 'Compose the Board',
        description: 'Layout matters',
        tips: [
          'One hero image (largest)',
          'Balance and white space',
          'Group related elements',
          'Include color swatches and typography samples'
        ]
      },
      {
        step: 5,
        title: 'Add Context',
        description: 'Help others understand',
        tips: [
          'Brief title or theme',
          'Key words that capture the feeling',
          'Optional: color codes, font names',
          'Don\'t over-explain - let visuals speak'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Midjourney', 'DALL-E', 'Pinterest'],
      bestFor: ['Generating specific imagery', 'Exploring directions', 'Filling gaps'],
      avoidFor: ['Replacing real-world inspiration', 'Client-facing boards (sometimes)'],
      philosophy: 'AI can help visualize what doesn\'t exist. But the best mood boards mix AI with real-world inspiration.'
    },
    estimatedTime: '2-4 hours',
    skillsLearned: ['Visual curation', 'Storytelling', 'Composition', 'Client communication'],
    deliverables: ['Mood board (PDF or image)', 'Color palette', 'Typography samples']
  }),

  'color-palette': (profile) => ({
    title: 'Creating a Color Palette',
    steps: [
      {
        step: 1,
        title: 'Understand Color Theory Basics',
        description: 'The rules before you break them',
        tips: [
          'Complementary: Opposite on wheel (high contrast)',
          'Analogous: Adjacent colors (harmonious)',
          'Triadic: Three equally spaced (vibrant)',
          'Monochromatic: One hue, different values (sophisticated)'
        ]
      },
      {
        step: 2,
        title: 'Start with Inspiration',
        description: 'Pull colors from something real',
        tips: [
          'Photo that captures the mood',
          'Artwork you love',
          'Nature reference',
          'Use color picker tool'
        ],
        aiOption: {
          tool: 'Coolors / Adobe Color',
          howToUse: 'Generate palettes from images or explore combinations',
          warning: 'Generated palettes are starting points - trust your eye'
        }
      },
      {
        step: 3,
        title: 'Define Roles',
        description: 'Each color has a job',
        tips: [
          'Primary: Main brand color (60% usage)',
          'Secondary: Supporting color (30%)',
          'Accent: Highlights, CTAs (10%)',
          'Neutrals: Text, backgrounds'
        ]
      },
      {
        step: 4,
        title: 'Test Accessibility',
        description: 'Make sure it works for everyone',
        tips: [
          'Check contrast ratios (WCAG guidelines)',
          'Test text on background colors',
          'Consider colorblind users',
          'Tools: WebAIM Contrast Checker'
        ]
      },
      {
        step: 5,
        title: 'Document',
        description: 'Capture all the values',
        tips: [
          'HEX codes (web)',
          'RGB (digital)',
          'CMYK (print)',
          'Pantone (if needed for print)',
          'Name each color for easy reference'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Coolors', 'Adobe Color', 'Canva Color Wheel'],
      bestFor: ['Generating starting palettes', 'Finding harmonious combinations'],
      avoidFor: ['Replacing your eye for what works in context'],
      philosophy: 'AI can suggest infinite palettes. Your job is knowing which one is RIGHT for this project.'
    },
    estimatedTime: '1-2 hours',
    skillsLearned: ['Color theory', 'Accessibility', 'Documentation'],
    deliverables: ['Color palette with codes', 'Usage guidelines', 'Accessibility notes']
  }),

  'typography': (profile) => ({
    title: 'Typography & Font Selection',
    steps: [
      {
        step: 1,
        title: 'Understand Font Categories',
        description: 'Know what you\'re choosing from',
        tips: [
          'Serif: Traditional, trustworthy (Times, Garamond)',
          'Sans-serif: Modern, clean (Helvetica, Inter)',
          'Display: Headlines only (decorative)',
          'Script: Elegant, personal (use sparingly)',
          'Monospace: Technical, code'
        ]
      },
      {
        step: 2,
        title: 'Match Brand Personality',
        description: 'Fonts have character',
        tips: [
          'Luxury brand? Elegant serif or refined sans',
          'Tech startup? Clean, modern sans-serif',
          'Creative studio? Something with personality',
          'Children\'s brand? Friendly, rounded',
          'Look at competitors - then differentiate'
        ]
      },
      {
        step: 3,
        title: 'Pairing Fonts',
        description: 'Creating harmony',
        tips: [
          'Contrast: Pair serif heading with sans body',
          'Same family: Different weights (safe choice)',
          'Maximum 2-3 fonts total',
          'Test them together before committing'
        ]
      },
      {
        step: 4,
        title: 'Establish Hierarchy',
        description: 'Guide the eye',
        tips: [
          'H1: Largest, boldest',
          'H2: Subheadings',
          'Body: Most readable, 16px minimum for web',
          'Captions: Smaller, lighter',
          'Size jumps should be noticeable'
        ]
      },
      {
        step: 5,
        title: 'Check Licensing',
        description: 'Legal use',
        tips: [
          'Google Fonts: Free for commercial use',
          'Adobe Fonts: Included with CC subscription',
          'Purchased fonts: Check license terms',
          'Never use fonts without proper license'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: ['FontPair', 'Google Fonts'],
      bestFor: ['Font pairing suggestions'],
      avoidFor: ['Typography is about human judgment'],
      philosophy: 'AI can\'t replace an eye for typography. This is a skill you develop through practice and observation.'
    },
    estimatedTime: '1-2 hours',
    skillsLearned: ['Font categories', 'Pairing', 'Hierarchy', 'Licensing'],
    deliverables: ['Font selection', 'Type scale', 'Usage examples']
  }),

  'portfolio': (profile) => ({
    title: 'Building Your Design Portfolio',
    steps: [
      {
        step: 1,
        title: 'Select Your Best Work',
        description: 'Quality over quantity',
        tips: [
          '8-12 projects maximum',
          'Only show work you want more of',
          'Include variety (logo, brand, etc.)',
          'Recent work > old work'
        ]
      },
      {
        step: 2,
        title: 'Tell the Story',
        description: 'Context matters',
        tips: [
          'Brief: What was the challenge?',
          'Process: How did you solve it?',
          'Result: What was the outcome?',
          'Show sketches and iterations'
        ]
      },
      {
        step: 3,
        title: 'Create Case Studies',
        description: 'Deep dives on key projects',
        tips: [
          'Problem → Process → Solution',
          '3-5 strong case studies',
          'Show your thinking, not just final work',
          'Include metrics if available'
        ]
      },
      {
        step: 4,
        title: 'Presentation Quality',
        description: 'Your portfolio IS a design project',
        tips: [
          'Clean, consistent layout',
          'High-quality images',
          'Mockups help visualize',
          'Your portfolio should reflect your skills'
        ],
        aiOption: {
          tool: 'Midjourney / Canva',
          howToUse: 'Generate mockups for presenting work',
          warning: 'Mockups should enhance, not misrepresent your work'
        }
      },
      {
        step: 5,
        title: 'Choose Your Platform',
        description: 'Where to host',
        tips: [
          'Behance: Industry standard, free, discoverable',
          'Notion: Clean, easy, free',
          'Squarespace/Wix: Custom domain, paid',
          'PDF: For email applications'
        ]
      },
      {
        step: 6,
        title: 'Keep It Updated',
        description: 'Living document',
        tips: [
          'Add new work quarterly',
          'Remove weaker pieces as you improve',
          'Update bio and contact info',
          'Test all links'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Midjourney', 'Canva', 'ChatGPT/Claude'],
      bestFor: ['Mockup generation', 'Case study writing assistance', 'Presentation polish'],
      avoidFor: ['Creating fake projects', 'Misrepresenting your work'],
      philosophy: 'AI can help present your work beautifully. But the work must be genuinely yours.'
    },
    estimatedTime: '10-20 hours initial build',
    skillsLearned: ['Curation', 'Storytelling', 'Self-presentation', 'Case study writing'],
    deliverables: ['Portfolio website/PDF', 'Case studies', 'About/bio']
  }),

  'client-presentation': (profile) => ({
    title: 'Presenting to Clients',
    steps: [
      {
        step: 1,
        title: 'Prepare Your Narrative',
        description: 'Tell a story, don\'t show files',
        tips: [
          'Start with the brief/problem',
          'Show your process (builds trust)',
          'Explain your decisions',
          'End with the solution'
        ]
      },
      {
        step: 2,
        title: 'Create Mockups',
        description: 'Help them visualize',
        tips: [
          'Show logo on business cards, signage',
          'Show social posts in phone frames',
          'Show website on screens',
          'Context helps clients understand'
        ],
        aiOption: {
          tool: 'Midjourney / Placeit',
          howToUse: 'Generate realistic mockups quickly',
          warning: 'Don\'t use mockups to oversell - be honest about what they\'re getting'
        }
      },
      {
        step: 3,
        title: 'Present Options (If Applicable)',
        description: 'Give choice, not chaos',
        tips: [
          '2-3 options maximum',
          'Each distinctly different',
          'Have a recommendation',
          'Don\'t show work you don\'t believe in'
        ]
      },
      {
        step: 4,
        title: 'Explain Rationale',
        description: 'The why matters',
        tips: [
          'Connect to the brief',
          'Explain color/font choices',
          'Reference their competitors',
          'Don\'t be defensive, be educational'
        ]
      },
      {
        step: 5,
        title: 'Handle Feedback',
        description: 'This is a conversation',
        tips: [
          'Listen before responding',
          'Ask clarifying questions',
          'Separate preference from problem',
          '"I\'ll try that" > "That won\'t work"',
          'Document all feedback'
        ]
      },
      {
        step: 6,
        title: 'Next Steps',
        description: 'Clear path forward',
        tips: [
          'Summarize what was decided',
          'Outline revision process',
          'Confirm timeline',
          'Follow up in writing'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['ChatGPT/Claude', 'Midjourney', 'Beautiful.ai'],
      bestFor: ['Writing presentation scripts', 'Generating mockups', 'Slide design'],
      avoidFor: ['Replacing genuine expertise', 'Winging presentations'],
      philosophy: 'AI can help you prepare, but YOU are the expert in the room.'
    },
    estimatedTime: '2-4 hours prep',
    skillsLearned: ['Presentation skills', 'Client communication', 'Feedback handling'],
    deliverables: ['Presentation deck', 'Mockups', 'Meeting notes']
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface DesignCoachROVProps {
  profile: DesignCreatorProfile;
  onToolClick?: (tool: DesignToolRecommendation) => void;
}

export const DesignCoachROV: React.FC<DesignCoachROVProps> = ({
  profile,
  onToolClick
}) => {
  const [selectedTask, setSelectedTask] = useState<DesignTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return DESIGN_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const recommendedTools = useMemo(() => {
    return DESIGN_TOOLS.filter(tool => {
      if (profile.skillLevel === 'beginner') {
        return tool.learningCurve === 'easy';
      }
      return true;
    });
  }, [profile.skillLevel]);
  
  const tasks: { id: DesignTask; label: string; icon: string }[] = [
    { id: 'create-logo', label: 'Create Logo', icon: '✨' },
    { id: 'design-brand', label: 'Design Brand', icon: '🎨' },
    { id: 'fashion-sketch', label: 'Fashion Sketch', icon: '👗' },
    { id: 'social-graphics', label: 'Social Graphics', icon: '📱' },
    { id: 'mood-board', label: 'Mood Board', icon: '🖼️' },
    { id: 'color-palette', label: 'Color Palette', icon: '🌈' },
    { id: 'typography', label: 'Typography', icon: '🔤' },
    { id: 'portfolio', label: 'Build Portfolio', icon: '📁' },
    { id: 'client-presentation', label: 'Present to Client', icon: '🎤' }
  ];
  
  return (
    <div className="design-coach-rov">
      <div className="design-coach-rov__header">
        <div className="design-coach-rov__avatar">🎨</div>
        <div className="design-coach-rov__info">
          <h2>Design Coach</h2>
          <span>Kaywana's Court Creative Guide</span>
        </div>
      </div>
      
      <div className="design-coach-rov__profile">
        <p>
          Welcome {profile.name}! You've completed <strong>{profile.workshopsCompleted} workshops</strong>
          {profile.specialization && ` focusing on ${profile.specialization}`}.
          {profile.portfolioItems > 0 && ` Your portfolio has ${profile.portfolioItems} pieces.`}
        </p>
        <p className="philosophy">
          💡 AI can generate infinite designs. Your job is developing YOUR eye, YOUR aesthetic, YOUR voice.
        </p>
      </div>
      
      <div className="design-coach-rov__tasks">
        <h3>What are you working on?</h3>
        <div className="design-coach-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`design-coach-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="design-coach-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="design-coach-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          <div className="design-coach-rov__deliverables">
            <h4>What you'll deliver:</h4>
            <ul>
              {guide.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          
          <div className="design-coach-rov__ai-note">
            {guide.aiIntegration.recommended ? (
              <div className="ai-yes">
                <p>✅ AI tools can help here!</p>
                <p><strong>Best for:</strong> {guide.aiIntegration.bestFor.join(', ')}</p>
                <p><strong>Avoid for:</strong> {guide.aiIntegration.avoidFor.join(', ')}</p>
              </div>
            ) : (
              <div className="ai-no">
                <p>⚠️ Learn this skill without AI first.</p>
                <p>{guide.aiIntegration.philosophy}</p>
              </div>
            )}
            {guide.aiIntegration.ethicalNote && (
              <p className="ethical-note">🚨 {guide.aiIntegration.ethicalNote}</p>
            )}
          </div>
          
          <div className="design-coach-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="design-coach-rov__step">
                <div className="design-coach-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.commonMistakes && (
                  <div className="common-mistakes">
                    <strong>⚠️ Common mistakes:</strong>
                    <ul>
                      {step.commonMistakes.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.aiOption && (
                  <div className="design-coach-rov__ai-option">
                    <strong>🤖 AI Option: {step.aiOption.tool}</strong>
                    <p>{step.aiOption.howToUse}</p>
                    <p className="warning">⚠️ {step.aiOption.warning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="design-coach-rov__tools">
        <h3>Recommended Tools</h3>
        <div className="design-coach-rov__tool-list">
          {recommendedTools.slice(0, 8).map(tool => (
            <button
              key={tool.name}
              className="design-coach-rov__tool"
              onClick={() => onToolClick?.(tool)}
            >
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-cost cost-${tool.cost}`}>{tool.cost}</span>
              <span className="tool-purpose">{tool.purpose}</span>
              <span className={`tool-curve curve-${tool.learningCurve}`}>
                {tool.learningCurve} to learn
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="design-coach-rov__footer">
        <p>
          💚 Your unique perspective is your superpower. 
          AI can generate a million designs, but only YOU can create work that reflects your vision.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  DESIGN_TOOLS,
  DESIGN_GUIDES
};

export default DesignCoachROV;