/**
 * VIDEO GUIDE ROV
 * 
 * Production guidance for G-Tech Casters creators.
 * Covers video production, editing, streaming, and content creation.
 * 
 * Philosophy: AI can edit faster, but it can't tell YOUR story.
 * Use AI to accelerate production, not replace creativity.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface VideoCreatorProfile {
  id: string;
  name: string;
  workshopsCompleted: number;
  specialization: 'youtube' | 'streaming' | 'short-form' | 'production' | 'mixed' | null;
  equipment: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  videosCreated: number;
  totalViews: number;
}

export type VideoTask = 
  | 'plan-video'
  | 'shoot-video'
  | 'edit-video'
  | 'add-captions'
  | 'create-thumbnail'
  | 'start-streaming'
  | 'short-form'
  | 'setup-studio'
  | 'grow-channel';

export interface VideoToolRecommendation {
  name: string;
  type: 'editing' | 'ai' | 'streaming' | 'equipment' | 'platform';
  cost: 'free' | 'freemium' | 'paid';
  url?: string;
  purpose: string;
  learningCurve: 'easy' | 'medium' | 'hard';
  bestFor: string[];
  aiFeatures?: string[];
}

export interface VideoGuide {
  title: string;
  steps: VideoStep[];
  aiIntegration: AIVideoGuide;
  estimatedTime: string;
  skillsLearned: string[];
  equipmentNeeded?: string[];
}

export interface VideoStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  technicalNotes?: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    timeSaved: string;
    warning: string;
  };
}

export interface AIVideoGuide {
  recommended: boolean;
  tools: string[];
  bestFor: string[];
  avoidFor: string[];
  philosophy: string;
  timeSavings?: string;
}

// ============================================================
// TOOL DATABASE
// ============================================================

const VIDEO_TOOLS: VideoToolRecommendation[] = [
  // Editing Software
  {
    name: 'DaVinci Resolve',
    type: 'editing',
    cost: 'free',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve',
    purpose: 'Professional editing, color grading, effects',
    learningCurve: 'hard',
    bestFor: ['Professional work', 'Color grading', 'Long-form content', 'Free power']
  },
  {
    name: 'CapCut',
    type: 'editing',
    cost: 'free',
    url: 'https://www.capcut.com',
    purpose: 'Easy mobile/desktop editing with AI features',
    learningCurve: 'easy',
    bestFor: ['Short-form', 'Social media', 'Beginners', 'Quick edits'],
    aiFeatures: ['Auto-captions', 'Background removal', 'Smart effects']
  },
  {
    name: 'Adobe Premiere Pro',
    type: 'editing',
    cost: 'paid',
    purpose: 'Industry-standard professional editing',
    learningCurve: 'hard',
    bestFor: ['Professional work', 'Team collaboration', 'Complex projects']
  },
  {
    name: 'Final Cut Pro',
    type: 'editing',
    cost: 'paid',
    purpose: 'Professional editing for Mac',
    learningCurve: 'medium',
    bestFor: ['Mac users', 'YouTubers', 'Fast workflow']
  },
  {
    name: 'iMovie',
    type: 'editing',
    cost: 'free',
    purpose: 'Basic editing for Mac/iOS',
    learningCurve: 'easy',
    bestFor: ['Beginners', 'Simple projects', 'Learning basics']
  },
  
  // AI Video Tools
  {
    name: 'Descript',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.descript.com',
    purpose: 'Edit video by editing text transcript',
    learningCurve: 'easy',
    bestFor: ['Talking head videos', 'Podcasts', 'Quick edits', 'Removing filler words'],
    aiFeatures: ['Transcription', 'Filler word removal', 'Eye contact correction', 'Overdub']
  },
  {
    name: 'Runway ML',
    type: 'ai',
    cost: 'freemium',
    url: 'https://runwayml.com',
    purpose: 'AI video effects and generation',
    learningCurve: 'medium',
    bestFor: ['Visual effects', 'Background removal', 'Style transfer', 'B-roll generation'],
    aiFeatures: ['Gen-2 video', 'Inpainting', 'Green screen', 'Motion tracking']
  },
  {
    name: 'Opus Clip',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.opus.pro',
    purpose: 'Turn long videos into short clips',
    learningCurve: 'easy',
    bestFor: ['Repurposing content', 'Finding highlights', 'Social media clips'],
    aiFeatures: ['Auto-clipping', 'Virality score', 'Caption styling']
  },
  {
    name: 'ElevenLabs',
    type: 'ai',
    cost: 'freemium',
    url: 'https://elevenlabs.io',
    purpose: 'AI voice generation and cloning',
    learningCurve: 'easy',
    bestFor: ['Voiceovers', 'Translations', 'Accessibility'],
    aiFeatures: ['Voice cloning', 'Text-to-speech', 'Voice dubbing']
  },
  {
    name: 'Synthesia',
    type: 'ai',
    cost: 'paid',
    url: 'https://www.synthesia.io',
    purpose: 'AI avatar video creation',
    learningCurve: 'easy',
    bestFor: ['Training videos', 'Explainers', 'Multilingual content'],
    aiFeatures: ['AI presenters', 'Multilingual', 'Script-to-video']
  },
  
  // Streaming
  {
    name: 'OBS Studio',
    type: 'streaming',
    cost: 'free',
    url: 'https://obsproject.com',
    purpose: 'Open-source streaming and recording',
    learningCurve: 'medium',
    bestFor: ['Streaming', 'Recording', 'Customization', 'Free professional tool']
  },
  {
    name: 'StreamYard',
    type: 'streaming',
    cost: 'freemium',
    url: 'https://streamyard.com',
    purpose: 'Browser-based streaming',
    learningCurve: 'easy',
    bestFor: ['Beginners', 'Multi-platform', 'Guests', 'No software install']
  },
  
  // Platforms
  {
    name: 'YouTube',
    type: 'platform',
    cost: 'free',
    url: 'https://youtube.com',
    purpose: 'Long-form video hosting',
    learningCurve: 'easy',
    bestFor: ['Long-form', 'Tutorials', 'Vlogs', 'Monetization']
  },
  {
    name: 'TikTok',
    type: 'platform',
    cost: 'free',
    url: 'https://tiktok.com',
    purpose: 'Short-form vertical video',
    learningCurve: 'easy',
    bestFor: ['Short-form', 'Trends', 'Discovery', 'Young audience']
  }
];

// ============================================================
// VIDEO GUIDES
// ============================================================

const VIDEO_GUIDES: Record<VideoTask, (profile: VideoCreatorProfile) => VideoGuide> = {
  'plan-video': (profile) => ({
    title: 'Planning Your Video',
    steps: [
      {
        step: 1,
        title: 'Define the Goal',
        description: 'What should viewers DO after watching?',
        tips: [
          'One video = one clear goal',
          'Entertain? Educate? Inspire? Sell?',
          'What\'s the hook? (Why watch THIS video?)',
          'Who specifically is this for?'
        ]
      },
      {
        step: 2,
        title: 'Research & Outline',
        description: 'Know what you\'re saying before recording',
        tips: [
          'What questions does your audience have?',
          'What are successful videos in this space doing?',
          'Structure: Hook → Content → CTA',
          'Keep it tight - cut anything that doesn\'t serve the goal'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Brainstorm angles, research topics, create outlines',
          timeSaved: '30-60 minutes',
          warning: 'The IDEAS should be yours. AI helps organize, not originate.'
        }
      },
      {
        step: 3,
        title: 'Write the Script/Outline',
        description: 'Know your words before camera rolls',
        tips: [
          'Full script for tutorials/educational',
          'Bullet points for vlogs/casual',
          'Always script the intro and outro',
          'Read it aloud - is it natural?'
        ]
      },
      {
        step: 4,
        title: 'Plan the Visuals',
        description: 'What will viewers see?',
        tips: [
          'B-roll list: What footage do you need?',
          'Graphics/text needed?',
          'Locations and setups',
          'Shot list for complex productions'
        ]
      },
      {
        step: 5,
        title: 'Title & Thumbnail First',
        description: 'If you can\'t sell it, don\'t make it',
        tips: [
          'Write 10 title options',
          'Would YOU click on this?',
          'Sketch thumbnail concept',
          'If title/thumbnail don\'t excite you, rethink the video'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT', 'Perplexity'],
      bestFor: ['Research', 'Outline creation', 'Title brainstorming'],
      avoidFor: ['Your unique perspective', 'Personal stories', 'Original ideas'],
      philosophy: 'AI can help you prepare efficiently, but your unique angle is what makes content worth watching.',
      timeSavings: '1-2 hours of planning time'
    },
    estimatedTime: '1-3 hours',
    skillsLearned: ['Content planning', 'Scripting', 'Research', 'Packaging']
  }),

  'shoot-video': (profile) => ({
    title: 'Shooting Your Video',
    steps: [
      {
        step: 1,
        title: 'Set Up Your Space',
        description: 'Environment matters more than camera',
        tips: [
          'Face a window for natural lighting',
          'Clean, uncluttered background',
          'Reduce echo with soft furnishings',
          'Remove distractions (phone, notifications)'
        ],
        technicalNotes: [
          'Light source should be in front of you, not behind',
          'Camera at eye level or slightly above',
          'Leave headroom but not too much'
        ]
      },
      {
        step: 2,
        title: 'Check Audio',
        description: 'Bad audio = unwatchable video',
        tips: [
          'Audio is MORE important than video quality',
          'External mic >> phone/laptop mic',
          'Test recording and listen back',
          'Quiet environment is essential'
        ],
        technicalNotes: [
          'Lavalier/lapel mics: £20-50 makes huge difference',
          'USB mics for desktop: Blue Yeti, Rode NT-USB',
          'Monitor with headphones while recording'
        ]
      },
      {
        step: 3,
        title: 'Frame Your Shot',
        description: 'Composition basics',
        tips: [
          'Rule of thirds: Eyes on upper third line',
          'Look at the camera lens, not the screen',
          'Consistent framing throughout',
          'Leave room for graphics/text if planned'
        ]
      },
      {
        step: 4,
        title: 'Deliver with Energy',
        description: 'Camera flattens energy - bring extra',
        tips: [
          '20% more energy than feels natural',
          'Speak to ONE person, not an audience',
          'Smile before you start recording',
          'Pauses are better than filler words'
        ]
      },
      {
        step: 5,
        title: 'Capture B-Roll',
        description: 'Footage that covers cuts and adds interest',
        tips: [
          'Hands doing things, products, screens',
          'Different angles of same scene',
          'Establishing shots (location, context)',
          'More is better - easier to cut than reshoot'
        ]
      },
      {
        step: 6,
        title: 'Review Before Wrapping',
        description: 'Check your footage immediately',
        tips: [
          'Watch key sections before packing up',
          'Check audio levels',
          'Ensure nothing important got cut off',
          'Reshoot now is easier than scheduling again'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: [],
      bestFor: [],
      avoidFor: ['Shooting is a human skill'],
      philosophy: 'There\'s no AI for being on camera. This is about presence, energy, and craft.'
    },
    estimatedTime: '30 min - 4 hours depending on complexity',
    skillsLearned: ['Camera presence', 'Technical setup', 'B-roll capture'],
    equipmentNeeded: ['Camera (phone works)', 'External microphone', 'Tripod', 'Lighting']
  }),

  'edit-video': (profile) => ({
    title: 'Editing Your Video',
    steps: [
      {
        step: 1,
        title: 'Organize Your Footage',
        description: 'Structure before cutting',
        tips: [
          'Watch all footage, mark best takes',
          'Name clips clearly',
          'Create folders: A-roll, B-roll, Audio, Graphics',
          'Delete obviously unusable footage'
        ]
      },
      {
        step: 2,
        title: 'Assembly Cut',
        description: 'Get everything in order',
        tips: [
          'Lay down the main content in sequence',
          'Don\'t worry about timing yet',
          'Follow your script/outline',
          'Include everything, cut later'
        ],
        aiOption: {
          tool: 'Descript',
          howToUse: 'Import video, edit by editing the transcript',
          timeSaved: '50% faster for talking-head content',
          warning: 'Great for cuts, but creative editing needs human judgment'
        }
      },
      {
        step: 3,
        title: 'Rough Cut',
        description: 'Cut the fat',
        tips: [
          'Remove mistakes, pauses, rambling',
          'Cut anything that doesn\'t serve the video',
          'Tighten, tighten, tighten',
          'If in doubt, cut it out'
        ],
        aiOption: {
          tool: 'Descript Filler Word Removal',
          howToUse: 'Automatically remove "um", "uh", "like"',
          timeSaved: '15-30 minutes',
          warning: 'Review after - sometimes filler words are natural'
        }
      },
      {
        step: 4,
        title: 'Add B-Roll & Graphics',
        description: 'Visual interest and clarity',
        tips: [
          'Cover cuts with B-roll',
          'Add text for key points',
          'Use graphics to explain complex ideas',
          'Don\'t overdo it - less is more'
        ],
        aiOption: {
          tool: 'Runway ML',
          howToUse: 'Generate B-roll, remove backgrounds, add effects',
          timeSaved: 'Hours of shooting/stock footage hunting',
          warning: 'AI-generated footage can look generic - use sparingly'
        }
      },
      {
        step: 5,
        title: 'Fine Cut',
        description: 'Polish the details',
        tips: [
          'Smooth audio transitions',
          'Add music (if appropriate)',
          'Color correction/grading',
          'Check pacing - does it flow?'
        ]
      },
      {
        step: 6,
        title: 'Export & Review',
        description: 'Final check before publishing',
        tips: [
          'Export at appropriate quality for platform',
          'Watch the whole thing through',
          'Check on phone (most viewers are mobile)',
          'Get a second opinion if possible'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Descript', 'CapCut', 'Runway ML', 'Opus Clip'],
      bestFor: ['Rough cuts', 'Filler word removal', 'Captions', 'Repurposing'],
      avoidFor: ['Creative decisions', 'Pacing', 'Storytelling'],
      philosophy: 'AI can make editing faster, but the story is yours to tell. Use AI for tedious tasks, keep creative control.',
      timeSavings: '50-70% time savings on talking-head content'
    },
    estimatedTime: profile.skillLevel === 'beginner' ? '4-8 hours per 10 min video' : '2-4 hours',
    skillsLearned: ['Editing workflow', 'Pacing', 'Visual storytelling']
  }),

  'add-captions': (profile) => ({
    title: 'Adding Captions & Subtitles',
    steps: [
      {
        step: 1,
        title: 'Why Captions Matter',
        description: 'Accessibility and engagement',
        tips: [
          '85% of Facebook video is watched without sound',
          'Captions improve retention and comprehension',
          'Required for accessibility',
          'Helps with SEO and discoverability'
        ]
      },
      {
        step: 2,
        title: 'Generate Captions',
        description: 'Transcribe your video',
        tips: [
          'AI transcription is 90-95% accurate',
          'Always review and correct',
          'Break into readable chunks',
          'Time correctly to speech'
        ],
        aiOption: {
          tool: 'Descript / CapCut / YouTube',
          howToUse: 'Auto-generate from video, then edit',
          timeSaved: '90% faster than manual transcription',
          warning: 'ALWAYS review - AI makes mistakes, especially with names/jargon'
        }
      },
      {
        step: 3,
        title: 'Style Your Captions',
        description: 'Make them readable and on-brand',
        tips: [
          'High contrast (white text, dark outline)',
          'Readable font size (not too small)',
          'Position: Bottom third, centered',
          'Don\'t cover faces or important visuals'
        ],
        technicalNotes: [
          'Safe area: Keep away from edges (10-15%)',
          'Max 2 lines at a time',
          '32-38 characters per line ideal'
        ]
      },
      {
        step: 4,
        title: 'Choose Caption Type',
        description: 'Burned-in vs. separate file',
        tips: [
          'Burned-in: Visible on all platforms, no toggle',
          'SRT/VTT: Toggleable, required by some platforms',
          'YouTube: Upload SRT for translations',
          'Short-form (TikTok, Reels): Burned-in preferred'
        ]
      },
      {
        step: 5,
        title: 'Dynamic Captions',
        description: 'Modern caption styles',
        tips: [
          'Word-by-word highlighting (CapCut)',
          'Animated captions for short-form',
          'Emoji integration for tone',
          'Don\'t overdo effects - readability first'
        ],
        aiOption: {
          tool: 'CapCut / Premiere Pro',
          howToUse: 'Apply templates with word-by-word animation',
          timeSaved: 'Hours of manual animation',
          warning: 'Trendy styles date quickly - balance style with longevity'
        }
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Descript', 'CapCut', 'YouTube Auto-Captions', 'Premiere Pro'],
      bestFor: ['Transcription', 'Timing', 'Basic styling'],
      avoidFor: ['Final accuracy check', 'Creative styling decisions'],
      philosophy: 'AI makes captions possible at scale. Just don\'t skip the human review.',
      timeSavings: '90% time saved on transcription'
    },
    estimatedTime: '30-60 minutes per 10 min video',
    skillsLearned: ['Accessibility', 'Caption styling', 'Platform optimization']
  }),

  'create-thumbnail': (profile) => ({
    title: 'Creating Thumbnails',
    steps: [
      {
        step: 1,
        title: 'Understand What Works',
        description: 'Thumbnails are mini movie posters',
        tips: [
          'Emotion: Faces showing clear emotion',
          'Curiosity: What makes someone NEED to click?',
          'Contrast: Stand out in a sea of thumbnails',
          'Clarity: Readable at small size'
        ]
      },
      {
        step: 2,
        title: 'Study Your Niche',
        description: 'What\'s working for similar content?',
        tips: [
          'Look at successful channels in your space',
          'Note patterns: Colors, layouts, text',
          'Be different enough to stand out',
          'Respect audience expectations'
        ]
      },
      {
        step: 3,
        title: 'Design Elements',
        description: 'Key components',
        tips: [
          'Face: Close-up with clear emotion',
          'Text: 3-5 words maximum, large font',
          'Context: Visual hint of video content',
          'Branding: Consistent style across videos'
        ],
        technicalNotes: [
          'Resolution: 1280x720 minimum',
          'Aspect ratio: 16:9',
          'File size: Under 2MB',
          'Test at small size (mobile)'
        ]
      },
      {
        step: 4,
        title: 'Create Multiple Options',
        description: 'A/B test when possible',
        tips: [
          'Create 3+ variations',
          'Different emotions, text, layouts',
          'YouTube allows thumbnail testing',
          'Data > opinions'
        ],
        aiOption: {
          tool: 'Midjourney / DALL-E',
          howToUse: 'Generate background concepts, not final thumbnails',
          timeSaved: 'Skip stock photo hunting',
          warning: 'AI faces look wrong. Use real photos of faces.'
        }
      },
      {
        step: 5,
        title: 'Tools & Templates',
        description: 'Speed up production',
        tips: [
          'Canva: Easiest, templates available',
          'Photoshop: Most control',
          'Create templates for consistency',
          'Build a library of your best performers'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Canva AI', 'Midjourney', 'Adobe Firefly'],
      bestFor: ['Background generation', 'Concept exploration', 'Removing backgrounds'],
      avoidFor: ['Faces', 'Final design decisions', 'Text placement'],
      philosophy: 'AI can generate elements, but thumbnail strategy requires understanding your audience. That\'s human.',
      timeSavings: '30-50% on background/element creation'
    },
    estimatedTime: '30-60 minutes per thumbnail',
    skillsLearned: ['Visual design', 'Click psychology', 'Branding']
  }),

  'start-streaming': (profile) => ({
    title: 'Starting Your Live Stream',
    steps: [
      {
        step: 1,
        title: 'Choose Your Platform',
        description: 'Where is your audience?',
        tips: [
          'Twitch: Gaming, creative, established streaming culture',
          'YouTube: Long-form content, older audience',
          'TikTok: Discovery, younger audience',
          'Instagram: Existing followers',
          'Start with one platform, expand later'
        ]
      },
      {
        step: 2,
        title: 'Set Up Software',
        description: 'Your streaming toolkit',
        tips: [
          'OBS Studio: Free, powerful, industry standard',
          'StreamYard: Browser-based, easier, guests',
          'Streamlabs: OBS with built-in overlays',
          'Test BEFORE going live'
        ],
        technicalNotes: [
          'Bitrate: 4500-6000 kbps for 1080p',
          'Keyframe interval: 2 seconds',
          'Test your upload speed (speedtest.net)'
        ]
      },
      {
        step: 3,
        title: 'Design Your Scene',
        description: 'What viewers see',
        tips: [
          'Webcam: Main focus, good lighting',
          'Overlay: Branding, alerts, chat',
          'Don\'t clutter - clean is better',
          'Starting soon / BRB / Ending scenes'
        ]
      },
      {
        step: 4,
        title: 'Audio Setup',
        description: 'Sound is everything',
        tips: [
          'External mic essential',
          'Noise gate to cut background',
          'Compressor to even out volume',
          'Test with a friend before going live'
        ]
      },
      {
        step: 5,
        title: 'Engage Your Audience',
        description: 'Streaming is interactive',
        tips: [
          'Read chat out loud',
          'Call out viewers by name',
          'Have a topic/activity, not just "hanging out"',
          'Consistent schedule builds audience'
        ]
      },
      {
        step: 6,
        title: 'Go Live',
        description: 'Your first stream',
        tips: [
          'Announce in advance',
          'Start simple - don\'t overcomplicate',
          'Energy is contagious - bring it',
          'Stream for at least 1 hour (discovery)',
          'Save the VOD for repurposing'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: [],
      bestFor: [],
      avoidFor: ['Live streaming is authentically human'],
      philosophy: 'The whole point of live streaming is real-time human connection. AI can\'t replicate that.'
    },
    estimatedTime: '2-4 hours setup, then ongoing',
    skillsLearned: ['Live presentation', 'Technical setup', 'Audience engagement'],
    equipmentNeeded: ['Webcam', 'Microphone', 'Good internet', 'Second monitor (helpful)']
  }),

  'short-form': (profile) => ({
    title: 'Creating Short-Form Content',
    steps: [
      {
        step: 1,
        title: 'Hook in 1 Second',
        description: 'You have zero time to waste',
        tips: [
          'First frame must grab attention',
          'Movement, curiosity, emotion',
          'Don\'t start with "Hey guys"',
          'Pattern interrupt: Something unexpected'
        ]
      },
      {
        step: 2,
        title: 'Structure for Retention',
        description: 'Keep them watching to the end',
        tips: [
          'Hook → Tension → Payoff',
          'Promise something, deliver it',
          'Open loops (resolve at end)',
          'No slow moments - every second counts'
        ]
      },
      {
        step: 3,
        title: 'Shoot Vertical',
        description: '9:16 is the format',
        tips: [
          'Hold phone vertical',
          'Frame yourself in upper third',
          'Leave room for captions at bottom',
          'Good lighting is non-negotiable'
        ]
      },
      {
        step: 4,
        title: 'Edit for Pace',
        description: 'No dead air',
        tips: [
          'Cut every pause',
          'Jump cuts are normal/expected',
          'Add captions (85% watch muted)',
          'Music/sound effects add energy'
        ],
        aiOption: {
          tool: 'CapCut / Opus Clip',
          howToUse: 'Auto-captions, effects, templates',
          timeSaved: '50-70% editing time',
          warning: 'Trending effects date quickly - develop your own style'
        }
      },
      {
        step: 5,
        title: 'Repurpose Long-Form',
        description: 'One piece of content, many clips',
        tips: [
          'Identify 3-5 highlights from long videos',
          'Each clip should stand alone',
          'Add context if needed',
          'Cross-post to all platforms'
        ],
        aiOption: {
          tool: 'Opus Clip',
          howToUse: 'Upload long video, AI finds best clips',
          timeSaved: 'Hours of manual clipping',
          warning: 'AI picks viral potential, not necessarily your best content'
        }
      },
      {
        step: 6,
        title: 'Post Strategically',
        description: 'Timing and consistency matter',
        tips: [
          'Post when your audience is active',
          '1-3x per day for growth',
          'Consistency > volume',
          'Engage with comments quickly (first hour)'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['CapCut', 'Opus Clip', 'Descript'],
      bestFor: ['Auto-captions', 'Finding clips', 'Quick effects'],
      avoidFor: ['Creative direction', 'Trend-jacking decisions', 'Your unique style'],
      philosophy: 'AI makes short-form production faster, but standing out requires YOUR creativity.',
      timeSavings: '50-70% on editing and repurposing'
    },
    estimatedTime: '30-60 minutes per clip',
    skillsLearned: ['Hooks', 'Pacing', 'Platform optimization', 'Trend awareness']
  }),

  'setup-studio': (profile) => ({
    title: 'Setting Up Your Home Studio',
    steps: [
      {
        step: 1,
        title: 'Choose Your Space',
        description: 'Find the best spot in your home',
        tips: [
          'Natural light source (window)',
          'Quiet area (away from traffic, appliances)',
          'Consistent backdrop option',
          'Enough space for equipment'
        ]
      },
      {
        step: 2,
        title: 'Lighting (Most Important)',
        description: 'Good light = professional look',
        tips: [
          'Natural light: Face window, camera facing you',
          'Ring light: Even, flattering (£20-50)',
          'Key light + fill: More control (£50-150)',
          'Avoid overhead lighting alone'
        ],
        technicalNotes: [
          'Color temperature: 5000-5500K for neutral',
          'Soft light (diffused) is more flattering',
          'Light in front of you, not behind'
        ]
      },
      {
        step: 3,
        title: 'Audio Setup',
        description: 'Sound matters more than video quality',
        tips: [
          'Budget: Lavalier mic (£20-50)',
          'Better: USB condenser (£50-150)',
          'Best: XLR setup with interface (£200+)',
          'Treat echo: Soft furnishings, blankets, foam'
        ],
        technicalNotes: [
          'Position mic 6-12 inches from mouth',
          'Pop filter for plosives (P, B sounds)',
          'Monitor with headphones'
        ]
      },
      {
        step: 4,
        title: 'Camera',
        description: 'You probably already have one',
        tips: [
          'Smartphone: Already great quality',
          'Webcam upgrade: Logitech C920/C922 (£70-100)',
          'Mirrorless/DSLR: Best quality (£500+)',
          'Clean lens, eye-level position'
        ]
      },
      {
        step: 5,
        title: 'Background',
        description: 'What viewers see behind you',
        tips: [
          'Clean and uncluttered',
          'Add interest: Books, plants, art',
          'Consistent branding',
          'Green screen option for flexibility'
        ]
      },
      {
        step: 6,
        title: 'Budget Starter Kit',
        description: 'What to buy first',
        tips: [
          '£0: Phone, natural light, quiet room',
          '£50: Lavalier mic, phone tripod',
          '£150: Ring light, USB mic',
          '£500: Full setup with proper lighting and audio'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: ['Runway ML'],
      bestFor: ['Virtual backgrounds if needed'],
      avoidFor: ['Physical setup is human work'],
      philosophy: 'Your studio is physical infrastructure. AI can enhance output but can\'t build your space.'
    },
    estimatedTime: '2-8 hours for initial setup',
    skillsLearned: ['Technical setup', 'Lighting', 'Audio engineering'],
    equipmentNeeded: ['Light source', 'Microphone', 'Camera/phone', 'Tripod/mount']
  }),

  'grow-channel': (profile) => ({
    title: 'Growing Your Video Channel',
    steps: [
      {
        step: 1,
        title: 'Define Your Niche',
        description: 'You can\'t be everything to everyone',
        tips: [
          'What can you make 100 videos about?',
          'Who specifically is your viewer?',
          'What makes you different from others?',
          'Niche down, then niche down again'
        ]
      },
      {
        step: 2,
        title: 'Consistency is Key',
        description: 'Algorithm rewards reliability',
        tips: [
          'Same day, same time, every week',
          'Realistic schedule you can maintain',
          'Quality > quantity, but quantity matters',
          'Don\'t disappear for weeks'
        ]
      },
      {
        step: 3,
        title: 'Package for Clicks',
        description: 'Title + thumbnail = 80% of success',
        tips: [
          'Spend as long on packaging as content',
          'Study what\'s working in your niche',
          'A/B test thumbnails',
          'Title should create curiosity'
        ]
      },
      {
        step: 4,
        title: 'Retain Viewers',
        description: 'Getting them to stay is harder than getting them to click',
        tips: [
          'Hook in first 30 seconds',
          'Open loops throughout',
          'Study your retention graphs',
          'Cut anything that causes drop-offs'
        ]
      },
      {
        step: 5,
        title: 'Engage Community',
        description: 'Build relationships, not just views',
        tips: [
          'Reply to every comment (early on)',
          'Ask questions to prompt discussion',
          'Community posts between videos',
          'Live streams for deeper connection'
        ]
      },
      {
        step: 6,
        title: 'Analyze and Adapt',
        description: 'Let data guide decisions',
        tips: [
          'Study your analytics weekly',
          'What topics perform best?',
          'When do viewers drop off?',
          'Double down on what works'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'Opus Clip', 'TubeBuddy', 'VidIQ'],
      bestFor: ['Title/thumbnail ideas', 'Repurposing content', 'Trend research'],
      avoidFor: ['Creative direction', 'Audience understanding', 'Authenticity'],
      philosophy: 'AI can help optimize, but growth comes from connection. You can\'t automate relationship.',
      timeSavings: 'Hours on research and repurposing'
    },
    estimatedTime: 'Ongoing (6-12 months minimum for traction)',
    skillsLearned: ['Content strategy', 'Analytics', 'Community building']
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface VideoGuideROVProps {
  profile: VideoCreatorProfile;
  onToolClick?: (tool: VideoToolRecommendation) => void;
}

export const VideoGuideROV: React.FC<VideoGuideROVProps> = ({
  profile,
  onToolClick
}) => {
  const [selectedTask, setSelectedTask] = useState<VideoTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return VIDEO_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const recommendedTools = useMemo(() => {
    return VIDEO_TOOLS.filter(tool => {
      if (profile.skillLevel === 'beginner') {
        return tool.learningCurve === 'easy';
      }
      return true;
    });
  }, [profile.skillLevel]);
  
  const tasks: { id: VideoTask; label: string; icon: string }[] = [
    { id: 'plan-video', label: 'Plan Video', icon: '📋' },
    { id: 'shoot-video', label: 'Shoot Video', icon: '🎬' },
    { id: 'edit-video', label: 'Edit Video', icon: '✂️' },
    { id: 'add-captions', label: 'Add Captions', icon: '💬' },
    { id: 'create-thumbnail', label: 'Create Thumbnail', icon: '🖼️' },
    { id: 'start-streaming', label: 'Start Streaming', icon: '📡' },
    { id: 'short-form', label: 'Short-Form Content', icon: '📱' },
    { id: 'setup-studio', label: 'Setup Studio', icon: '🎙️' },
    { id: 'grow-channel', label: 'Grow Channel', icon: '📈' }
  ];
  
  return (
    <div className="video-guide-rov">
      <div className="video-guide-rov__header">
        <div className="video-guide-rov__avatar">🎬</div>
        <div className="video-guide-rov__info">
          <h2>Video Guide</h2>
          <span>G-Tech Casters Production Guide</span>
        </div>
      </div>
      
      <div className="video-guide-rov__profile">
        <p>
          Hey {profile.name}! You've created <strong>{profile.videosCreated} videos</strong>
          {profile.totalViews > 0 && ` with ${profile.totalViews.toLocaleString()} total views`}.
          {profile.videosCreated < 10 && ' Focus on consistency - your first 10 videos are for learning.'}
          {profile.videosCreated >= 10 && ' You\'re building momentum. Keep going!'}
        </p>
        <p className="philosophy">
          💡 AI can edit faster, but it can't tell YOUR story. Use AI to accelerate, not replace your creativity.
        </p>
      </div>
      
      <div className="video-guide-rov__tasks">
        <h3>What are you working on?</h3>
        <div className="video-guide-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`video-guide-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="video-guide-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="video-guide-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          {guide.equipmentNeeded && (
            <div className="video-guide-rov__equipment">
              <h4>Equipment needed:</h4>
              <ul>
                {guide.equipmentNeeded.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="video-guide-rov__ai-note">
            {guide.aiIntegration.recommended ? (
              <div className="ai-yes">
                <p>✅ AI can speed this up significantly!</p>
                <p><strong>Best for:</strong> {guide.aiIntegration.bestFor.join(', ')}</p>
                <p><strong>Not for:</strong> {guide.aiIntegration.avoidFor.join(', ')}</p>
                {guide.aiIntegration.timeSavings && (
                  <p><strong>⏱️ Time savings:</strong> {guide.aiIntegration.timeSavings}</p>
                )}
              </div>
            ) : (
              <div className="ai-no">
                <p>⚠️ This is a human skill.</p>
                <p>{guide.aiIntegration.philosophy}</p>
              </div>
            )}
          </div>
          
          <div className="video-guide-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="video-guide-rov__step">
                <div className="video-guide-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.technicalNotes && (
                  <div className="technical-notes">
                    <strong>🔧 Technical:</strong>
                    <ul>
                      {step.technicalNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.aiOption && (
                  <div className="video-guide-rov__ai-option">
                    <strong>🤖 AI Option: {step.aiOption.tool}</strong>
                    <p>{step.aiOption.howToUse}</p>
                    <p className="time-saved">⏱️ {step.aiOption.timeSaved}</p>
                    <p className="warning">⚠️ {step.aiOption.warning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="video-guide-rov__tools">
        <h3>Recommended Tools</h3>
        <div className="video-guide-rov__tool-list">
          {recommendedTools.slice(0, 8).map(tool => (
            <button
              key={tool.name}
              className="video-guide-rov__tool"
              onClick={() => onToolClick?.(tool)}
            >
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-cost cost-${tool.cost}`}>{tool.cost}</span>
              <span className="tool-purpose">{tool.purpose}</span>
              {tool.aiFeatures && (
                <span className="tool-ai">AI: {tool.aiFeatures.slice(0, 2).join(', ')}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="video-guide-rov__footer">
        <p>
          💚 Video is the most powerful medium on the internet.
          AI can help you produce more, but YOUR personality is what builds audience.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  VIDEO_TOOLS,
  VIDEO_GUIDES
};

export default VideoGuideROV;