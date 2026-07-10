/**
 * BEATMAKER ROV
 * 
 * Production guidance for Trubble n Bass creators.
 * Integrates AI tools while teaching the fundamentals.
 * 
 * Philosophy: AI should accelerate learning, not replace it.
 * Use AI for inspiration and iteration, but learn the craft.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface MusicCreatorProfile {
  id: string;
  name: string;
  workshopsCompleted: number;
  daw: string | null;
  genres: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  hasEquipment: boolean;
  beatsCreated: number;
}

export type ProductionTask = 
  | 'make-beat'
  | 'find-samples'
  | 'mix-track'
  | 'master-track'
  | 'create-melody'
  | 'arrange-song'
  | 'collaborate'
  | 'learn-daw';

export interface ToolRecommendation {
  name: string;
  type: 'daw' | 'ai' | 'plugin' | 'resource';
  cost: 'free' | 'freemium' | 'paid';
  url?: string;
  purpose: string;
  learningCurve: 'easy' | 'medium' | 'hard';
  whenToUse: string;
  whenNotToUse: string;
}

export interface ProductionGuide {
  title: string;
  steps: ProductionStep[];
  aiIntegration: AIUsageGuide;
  estimatedTime: string;
  skillsLearned: string[];
}

export interface ProductionStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface AIUsageGuide {
  recommended: boolean;
  tools: string[];
  bestFor: string[];
  avoidFor: string[];
  philosophy: string;
}

// ============================================================
// TOOL DATABASE
// ============================================================

const MUSIC_TOOLS: ToolRecommendation[] = [
  // DAWs
  {
    name: 'BandLab',
    type: 'daw',
    cost: 'free',
    url: 'https://www.bandlab.com',
    purpose: 'Browser-based DAW with AI features, no download required',
    learningCurve: 'easy',
    whenToUse: 'Starting out, no budget, want to create anywhere',
    whenNotToUse: 'Complex productions, professional mixing'
  },
  {
    name: 'FL Studio',
    type: 'daw',
    cost: 'paid',
    purpose: 'Industry-standard for beat production',
    learningCurve: 'medium',
    whenToUse: 'Serious about production, want industry-standard workflow',
    whenNotToUse: 'Just testing the waters, tight budget'
  },
  {
    name: 'Ableton Live',
    type: 'daw',
    cost: 'paid',
    purpose: 'Powerful for both production and live performance',
    learningCurve: 'hard',
    whenToUse: 'Want to perform live, electronic music focus',
    whenNotToUse: 'Just making beats, prefer step sequencers'
  },
  {
    name: 'GarageBand',
    type: 'daw',
    cost: 'free',
    purpose: 'Apple\'s free DAW, great for beginners',
    learningCurve: 'easy',
    whenToUse: 'Have a Mac/iPad, learning basics',
    whenNotToUse: 'Need advanced features, on Windows'
  },
  
  // AI Tools
  {
    name: 'Suno AI',
    type: 'ai',
    cost: 'freemium',
    url: 'https://suno.ai',
    purpose: 'Generate full songs from text prompts',
    learningCurve: 'easy',
    whenToUse: 'Inspiration, reference tracks, backing music',
    whenNotToUse: 'Final production - learn the craft yourself'
  },
  {
    name: 'AIVA',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.aiva.ai',
    purpose: 'AI music composition for arrangements',
    learningCurve: 'medium',
    whenToUse: 'Need orchestral arrangements, composition ideas',
    whenNotToUse: 'Hip-hop beats, trap production'
  },
  {
    name: 'Splice',
    type: 'ai',
    cost: 'paid',
    url: 'https://splice.com',
    purpose: 'Sample library with AI recommendations',
    learningCurve: 'easy',
    whenToUse: 'Need high-quality samples, royalty-free sounds',
    whenNotToUse: 'Want to create everything from scratch'
  },
  
  // Plugins
  {
    name: 'iZotope Ozone',
    type: 'plugin',
    cost: 'paid',
    purpose: 'AI-assisted mastering',
    learningCurve: 'medium',
    whenToUse: 'Finishing tracks, professional sound',
    whenNotToUse: 'Before you understand EQ and compression basics'
  },
  {
    name: 'LANDR',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.landr.com',
    purpose: 'Automated mastering service',
    learningCurve: 'easy',
    whenToUse: 'Quick masters for demos',
    whenNotToUse: 'Learning mixing, professional releases'
  },
  
  // Learning Resources
  {
    name: 'YouTube',
    type: 'resource',
    cost: 'free',
    purpose: 'Tutorials for everything',
    learningCurve: 'easy',
    whenToUse: 'Always - best free learning resource',
    whenNotToUse: 'Never - but watch critically'
  }
];

// ============================================================
// PRODUCTION GUIDES
// ============================================================

const PRODUCTION_GUIDES: Record<ProductionTask, (profile: MusicCreatorProfile) => ProductionGuide> = {
  'make-beat': (profile) => ({
    title: 'Making Your First Beat',
    steps: [
      {
        step: 1,
        title: 'Choose Your Sound',
        description: 'Decide on genre, tempo, and mood before you start',
        tips: [
          'Reference a track you like - what makes it work?',
          'Set your BPM (90-170 for hip-hop, 120-150 for trap)',
          'Choose a key (C minor and A minor are good starting points)'
        ]
      },
      {
        step: 2,
        title: 'Lay Down Drums',
        description: 'Start with kick, snare, hi-hats',
        tips: [
          'Kick on 1 and 3, snare on 2 and 4 for standard patterns',
          'Keep it simple - complexity comes later',
          'Use your ear - if it sounds good, it is good'
        ],
        aiOption: {
          tool: 'BandLab AI Drums',
          howToUse: 'Use AI to generate a starting pattern, then customize',
          warning: 'Don\'t just accept the AI pattern - make it yours'
        }
      },
      {
        step: 3,
        title: 'Add Bass',
        description: 'Foundation of your track',
        tips: [
          'Bass notes should follow your chord progression',
          'Less is more - leave space',
          'Make sure bass and kick work together (sidechain if needed)'
        ]
      },
      {
        step: 4,
        title: 'Create Melody',
        description: 'The memorable part of your beat',
        tips: [
          'Start simple - 4-8 notes can be enough',
          'Use repetition with small variations',
          'Leave space for vocals if this is for a rapper/singer'
        ],
        aiOption: {
          tool: 'Suno AI',
          howToUse: 'Generate a reference melody to inspire you',
          warning: 'Use AI for inspiration, not the final melody'
        }
      },
      {
        step: 5,
        title: 'Arrange',
        description: 'Turn your loop into a full song',
        tips: [
          'Typical structure: Intro - Verse - Hook - Verse - Hook - Outro',
          'Add/remove elements to create sections',
          '16 bars minimum for a full beat'
        ]
      }
    ],
    aiIntegration: {
      recommended: profile.beatsCreated < 10 ? false : true,
      tools: ['Suno AI', 'BandLab AI'],
      bestFor: ['Getting unstuck', 'Finding inspiration', 'Quick demos'],
      avoidFor: ['Your first 10 beats', 'Learning fundamentals', 'Final production'],
      philosophy: 'AI is a tool, not a shortcut. Learn the craft first.'
    },
    estimatedTime: profile.skillLevel === 'beginner' ? '4-8 hours' : '1-4 hours',
    skillsLearned: ['Drum programming', 'Bass lines', 'Melody creation', 'Arrangement']
  }),
  
  'find-samples': (profile) => ({
    title: 'Finding and Using Samples',
    steps: [
      {
        step: 1,
        title: 'Know What You Need',
        description: 'Define the sound you\'re looking for',
        tips: [
          'Be specific: "vinyl soul loop" not just "sample"',
          'Know your BPM and key first',
          'Think about how it fits your beat'
        ]
      },
      {
        step: 2,
        title: 'Find Samples',
        description: 'Where to get royalty-free sounds',
        tips: [
          'Splice - industry standard, AI recommendations',
          'Looperman - free community samples',
          'Tracklib - clear sample from real records'
        ],
        aiOption: {
          tool: 'Splice AI',
          howToUse: 'Use AI recommendations based on your project',
          warning: 'Don\'t let AI choose everything - develop your ear'
        }
      },
      {
        step: 3,
        title: 'Chop and Flip',
        description: 'Make the sample yours',
        tips: [
          'Never use a sample as-is - that\'s lazy',
          'Chop into pieces, rearrange, add effects',
          'Pitch shift, time stretch, filter - experiment'
        ]
      },
      {
        step: 4,
        title: 'Clear Your Samples',
        description: 'Understand copyright',
        tips: [
          'Royalty-free = safe to use commercially',
          'If sampling records, you need to clear it',
          'WW marketplace requires royalty-free or original'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Splice AI'],
      bestFor: ['Finding matching sounds', 'Discovering new sources'],
      avoidFor: ['Replacing your ear', 'Making all decisions for you'],
      philosophy: 'Use AI to expand your palette, not define it.'
    },
    estimatedTime: '1-2 hours',
    skillsLearned: ['Sample selection', 'Chopping', 'Copyright basics']
  }),
  
  'mix-track': (profile) => ({
    title: 'Mixing Your Beat',
    steps: [
      {
        step: 1,
        title: 'Organize Your Session',
        description: 'Clean project = better mix',
        tips: [
          'Name all your tracks clearly',
          'Color code by type (drums, bass, melodies)',
          'Remove unused tracks and sounds'
        ]
      },
      {
        step: 2,
        title: 'Set Levels',
        description: 'Balance your sounds',
        tips: [
          'Start with everything at -inf, bring up one by one',
          'Kick and snare are your foundation',
          'If something isn\'t adding value, remove it'
        ]
      },
      {
        step: 3,
        title: 'EQ',
        description: 'Carve space for each element',
        tips: [
          'Cut before you boost',
          'Every sound doesn\'t need full frequency range',
          'High-pass filter almost everything except bass'
        ]
      },
      {
        step: 4,
        title: 'Compression',
        description: 'Control dynamics',
        tips: [
          'Subtle compression on most things',
          'Heavier compression on drums for punch',
          'Don\'t over-compress - you\'ll kill the life'
        ],
        aiOption: {
          tool: 'iZotope Neutron',
          howToUse: 'Use AI suggestions as starting point',
          warning: 'Learn what the AI is doing - don\'t just accept'
        }
      },
      {
        step: 5,
        title: 'Effects',
        description: 'Add space and character',
        tips: [
          'Reverb creates depth - use sparingly',
          'Delay adds movement',
          'Saturation adds warmth'
        ]
      }
    ],
    aiIntegration: {
      recommended: profile.skillLevel !== 'beginner',
      tools: ['iZotope Neutron', 'LANDR', 'BandLab Mastering'],
      bestFor: ['Getting a reference point', 'Learning what good sounds like'],
      avoidFor: ['Replacing learning fundamentals', 'Professional releases'],
      philosophy: 'AI mixing tools teach you what to aim for, but you need to understand why.'
    },
    estimatedTime: profile.skillLevel === 'beginner' ? '4-8 hours' : '2-4 hours',
    skillsLearned: ['Levels', 'EQ', 'Compression', 'Effects']
  }),
  
  'master-track': (profile) => ({
    title: 'Mastering Your Beat',
    steps: [
      {
        step: 1,
        title: 'Rest Your Ears',
        description: 'Take a break before mastering',
        tips: [
          'At least 24 hours between mix and master',
          'Fresh ears hear problems you missed',
          'Listen on different speakers/headphones'
        ]
      },
      {
        step: 2,
        title: 'Reference Track',
        description: 'Compare to professional releases',
        tips: [
          'Choose a well-mastered track in your genre',
          'Match loudness first, then compare',
          'A/B constantly during mastering'
        ]
      },
      {
        step: 3,
        title: 'Master Chain',
        description: 'Standard mastering signal flow',
        tips: [
          'EQ → Compression → Limiting (typical order)',
          'Small moves - 1-2dB max on EQ',
          'Don\'t over-limit - preserve dynamics'
        ],
        aiOption: {
          tool: 'LANDR / iZotope Ozone',
          howToUse: 'Use AI mastering for demos and learning',
          warning: 'AI mastering is one-size-fits-all - won\'t match human'
        }
      },
      {
        step: 4,
        title: 'Export',
        description: 'Final delivery formats',
        tips: [
          'WAV 24-bit for streaming (Spotify, Apple Music)',
          'MP3 320kbps for previews',
          'Leave headroom (-1dB true peak minimum)'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['LANDR', 'iZotope Ozone', 'BandLab Mastering'],
      bestFor: ['Quick demos', 'Learning what mastered sounds like', 'Budget constraint'],
      avoidFor: ['Professional releases you\'re proud of', 'Learning the skill'],
      philosophy: 'AI mastering is fine for demos. Learn to master yourself for your best work.'
    },
    estimatedTime: '1-2 hours',
    skillsLearned: ['Mastering fundamentals', 'Loudness', 'Final delivery']
  }),
  
  'create-melody': (profile) => ({
    title: 'Creating Melodies',
    steps: [
      {
        step: 1,
        title: 'Understand Scales',
        description: 'The foundation of melody',
        tips: [
          'Start with minor pentatonic - 5 notes, hard to go wrong',
          'C minor: C, Eb, F, G, Bb',
          'Stay in scale and it will sound good'
        ]
      },
      {
        step: 2,
        title: 'Hum First',
        description: 'Your voice knows melody',
        tips: [
          'Hum or sing before touching your DAW',
          'Record your voice memo, then replicate',
          'The melody should be singable'
        ]
      },
      {
        step: 3,
        title: 'Keep It Simple',
        description: 'Less is more',
        tips: [
          'The best melodies are often the simplest',
          'Repetition is your friend',
          'Leave space - silence is powerful'
        ],
        aiOption: {
          tool: 'Suno AI / AIVA',
          howToUse: 'Generate melody ideas when stuck',
          warning: 'Use for inspiration, not copying'
        }
      },
      {
        step: 4,
        title: 'Layer and Develop',
        description: 'Build complexity',
        tips: [
          'Add counter-melody for depth',
          'Variation each time it repeats',
          'Build throughout the track'
        ]
      }
    ],
    aiIntegration: {
      recommended: profile.beatsCreated < 5 ? false : true,
      tools: ['Suno AI', 'AIVA', 'Amper Music'],
      bestFor: ['Breaking creative blocks', 'Reference ideas', 'Learning patterns'],
      avoidFor: ['Your first melodies', 'Developing your unique voice'],
      philosophy: 'AI can generate infinite melodies. Only you can create YOUR melodies.'
    },
    estimatedTime: '1-3 hours',
    skillsLearned: ['Music theory basics', 'Melodic writing', 'Counter-melody']
  }),
  
  'arrange-song': (profile) => ({
    title: 'Arranging Your Beat',
    steps: [
      {
        step: 1,
        title: 'Study Structure',
        description: 'Learn from your favorite tracks',
        tips: [
          'Import a reference track and mark sections',
          'Count bars for each section',
          'Note what enters/exits at each transition'
        ]
      },
      {
        step: 2,
        title: 'Create Sections',
        description: 'Build distinct parts',
        tips: [
          'Intro: Build anticipation (4-8 bars)',
          'Verse: Pull back, leave space for vocals',
          'Hook/Chorus: Everything comes together',
          'Outro: Wind down gracefully'
        ]
      },
      {
        step: 3,
        title: 'Transitions',
        description: 'Smooth connections',
        tips: [
          'Risers and sweeps signal change',
          'Drop elements before big moments',
          'Drum fills mark section changes'
        ]
      },
      {
        step: 4,
        title: 'Energy Flow',
        description: 'Keep it interesting',
        tips: [
          'Tension and release throughout',
          'Not everything at once - save elements',
          'The drop means more if you build to it'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: [],
      bestFor: [],
      avoidFor: ['Arrangement is your creative fingerprint'],
      philosophy: 'Arrangement is storytelling. AI can\'t tell YOUR story.'
    },
    estimatedTime: '2-4 hours',
    skillsLearned: ['Song structure', 'Transitions', 'Energy management']
  }),
  
  'collaborate': (profile) => ({
    title: 'Collaborating with Other Creators',
    steps: [
      {
        step: 1,
        title: 'Find Collaborators',
        description: 'Connect with complementary skills',
        tips: [
          'Use WW\'s CollabFinder to match skills',
          'Look for artists who complement, not duplicate',
          'Start with one collaboration before committing to more'
        ]
      },
      {
        step: 2,
        title: 'Set Expectations',
        description: 'Clear agreements prevent problems',
        tips: [
          'Discuss split before you start',
          'Who handles what? Be explicit',
          'Set deadlines and check-in points'
        ]
      },
      {
        step: 3,
        title: 'Share Files',
        description: 'Technical workflow',
        tips: [
          'Use stems (individual tracks) for flexibility',
          'Agree on BPM and key before starting',
          'Cloud storage (Google Drive) for sharing'
        ]
      },
      {
        step: 4,
        title: 'Credit Properly',
        description: 'Everyone gets their due',
        tips: [
          'Credit all contributors on marketplace listing',
          'Revenue split according to agreement',
          "WW's system handles split automatically"
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: [],
      bestFor: [],
      avoidFor: ['Human collaboration - that\'s the point'],
      philosophy: 'Collaboration is about human connection. AI can\'t replace that.'
    },
    estimatedTime: 'Varies',
    skillsLearned: ['Communication', 'File management', 'Business basics']
  }),
  
  'learn-daw': (profile) => ({
    title: 'Learning Your DAW',
    steps: [
      {
        step: 1,
        title: 'Choose Your DAW',
        description: 'Pick one and commit',
        tips: [
          'BandLab: Free, browser-based, great for starting',
          'FL Studio: Industry standard for beats, one-time payment',
          'Ableton: Powerful but steeper learning curve',
          'GarageBand: Free on Mac, good basics'
        ]
      },
      {
        step: 2,
        title: 'Learn the Basics',
        description: 'Core skills first',
        tips: [
          'Navigation and playback controls',
          'Adding tracks and instruments',
          'Recording MIDI and audio',
          'Basic editing (cut, copy, paste)'
        ]
      },
      {
        step: 3,
        title: 'Follow Tutorials',
        description: 'Structured learning',
        tips: [
          'YouTube is your friend - search "[your DAW] tutorial"',
          'Start with "beginner" or "basics" tutorials',
          'Follow along - don\'t just watch'
        ]
      },
      {
        step: 4,
        title: 'Make Something',
        description: 'Learn by doing',
        tips: [
          'Make a beat every day for a week',
          'Finish what you start - completion teaches more than perfection',
          'Your first 10 beats will be rough - that\'s normal'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['ChatGPT/Claude'],
      bestFor: ['Answering specific questions', 'Explaining concepts'],
      avoidFor: ['Replacing hands-on practice'],
      philosophy: 'AI can explain anything. But you learn by doing.'
    },
    estimatedTime: '10-20 hours to basics',
    skillsLearned: ['DAW navigation', 'MIDI editing', 'Basic workflow']
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface BeatMakerROVProps {
  profile: MusicCreatorProfile;
  onToolClick?: (tool: ToolRecommendation) => void;
}

export const BeatMakerROV: React.FC<BeatMakerROVProps> = ({
  profile,
  onToolClick
}) => {
  const [selectedTask, setSelectedTask] = useState<ProductionTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return PRODUCTION_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const recommendedTools = useMemo(() => {
    return MUSIC_TOOLS.filter(tool => {
      if (profile.skillLevel === 'beginner') {
        return tool.learningCurve === 'easy';
      }
      return true;
    });
  }, [profile.skillLevel]);
  
  const tasks: { id: ProductionTask; label: string; icon: string }[] = [
    { id: 'make-beat', label: 'Make a Beat', icon: '🥁' },
    { id: 'find-samples', label: 'Find Samples', icon: '🔍' },
    { id: 'create-melody', label: 'Create Melody', icon: '🎹' },
    { id: 'arrange-song', label: 'Arrange Song', icon: '📐' },
    { id: 'mix-track', label: 'Mix Track', icon: '🎚️' },
    { id: 'master-track', label: 'Master Track', icon: '✨' },
    { id: 'collaborate', label: 'Collaborate', icon: '🤝' },
    { id: 'learn-daw', label: 'Learn DAW', icon: '📚' }
  ];
  
  return (
    <div className="beatmaker-rov">
      <div className="beatmaker-rov__header">
        <div className="beatmaker-rov__avatar">🎵</div>
        <div className="beatmaker-rov__info">
          <h2>BeatMaker</h2>
          <span>Trubble n Bass Production Guide</span>
        </div>
      </div>
      
      <div className="beatmaker-rov__profile">
        <p>
          Hey {profile.name}! You've made <strong>{profile.beatsCreated} beats</strong> so far
          {profile.daw && ` using ${profile.daw}`}.
          {profile.beatsCreated < 10 && ' Focus on fundamentals - AI tools come later.'}
          {profile.beatsCreated >= 10 && ' Ready to level up with some AI assistance.'}
        </p>
      </div>
      
      <div className="beatmaker-rov__tasks">
        <h3>What do you want to do?</h3>
        <div className="beatmaker-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`beatmaker-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="beatmaker-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="beatmaker-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          <div className="beatmaker-rov__ai-note">
            {guide.aiIntegration.recommended ? (
              <p className="ai-yes">
                ✅ AI tools can help with this! Best for: {guide.aiIntegration.bestFor.join(', ')}
              </p>
            ) : (
              <p className="ai-no">
                ⚠️ Learn this without AI first. {guide.aiIntegration.philosophy}
              </p>
            )}
          </div>
          
          <div className="beatmaker-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="beatmaker-rov__step">
                <div className="beatmaker-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.aiOption && (
                  <div className="beatmaker-rov__ai-option">
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
      
      <div className="beatmaker-rov__tools">
        <h3>Recommended Tools</h3>
        <div className="beatmaker-rov__tool-list">
          {recommendedTools.slice(0, 6).map(tool => (
            <button
              key={tool.name}
              className="beatmaker-rov__tool"
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
      
      <div className="beatmaker-rov__footer">
        <p>
          💚 Remember: AI is a tool, not a shortcut. 
          The producers you admire spent years learning their craft.
          Use AI to accelerate, not to skip the journey.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  MUSIC_TOOLS,
  PRODUCTION_GUIDES
};

export default BeatMakerROV;