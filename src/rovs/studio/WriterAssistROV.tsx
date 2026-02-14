/**
 * WRITER ASSIST ROV
 * 
 * Production guidance for PageTurners creators.
 * Covers creative writing, content creation, editing, and publishing.
 * 
 * Philosophy: AI can write. But it can't THINK like you.
 * Your voice, your perspective, your stories - that's what matters.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface WriterProfile {
  id: string;
  name: string;
  workshopsCompleted: number;
  specialization: 'fiction' | 'content' | 'copywriting' | 'journalism' | 'mixed' | null;
  wordsWritten: number;
  piecesPublished: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export type WritingTask = 
  | 'write-article'
  | 'write-story'
  | 'write-copy'
  | 'edit-work'
  | 'find-voice'
  | 'overcome-block'
  | 'pitch-idea'
  | 'build-audience'
  | 'create-newsletter';

export interface WritingToolRecommendation {
  name: string;
  type: 'writing' | 'ai' | 'editing' | 'research' | 'publishing';
  cost: 'free' | 'freemium' | 'paid';
  url?: string;
  purpose: string;
  learningCurve: 'easy' | 'medium' | 'hard';
  bestFor: string[];
  aiWarning?: string;
}

export interface WritingGuide {
  title: string;
  steps: WritingStep[];
  aiIntegration: AIWritingGuide;
  estimatedTime: string;
  skillsLearned: string[];
  wordCountGuide?: string;
}

export interface WritingStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  exercises?: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface AIWritingGuide {
  recommended: boolean;
  tools: string[];
  bestFor: string[];
  avoidFor: string[];
  philosophy: string;
  voiceWarning: string;
}

// ============================================================
// TOOL DATABASE
// ============================================================

const WRITING_TOOLS: WritingToolRecommendation[] = [
  // Writing Software
  {
    name: 'Google Docs',
    type: 'writing',
    cost: 'free',
    url: 'https://docs.google.com',
    purpose: 'Simple, collaborative writing',
    learningCurve: 'easy',
    bestFor: ['Collaboration', 'Simplicity', 'Sharing', 'Beginners']
  },
  {
    name: 'Notion',
    type: 'writing',
    cost: 'freemium',
    url: 'https://notion.so',
    purpose: 'Organized writing with databases',
    learningCurve: 'medium',
    bestFor: ['Long-form projects', 'Organization', 'Content planning', 'Notes']
  },
  {
    name: 'Scrivener',
    type: 'writing',
    cost: 'paid',
    purpose: 'Professional long-form writing software',
    learningCurve: 'medium',
    bestFor: ['Novels', 'Screenplays', 'Research-heavy projects', 'Organization']
  },
  {
    name: 'iA Writer',
    type: 'writing',
    cost: 'paid',
    purpose: 'Distraction-free writing',
    learningCurve: 'easy',
    bestFor: ['Focus', 'Markdown', 'Clean interface', 'Flow state']
  },
  
  // AI Writing Tools
  {
    name: 'Claude',
    type: 'ai',
    cost: 'freemium',
    url: 'https://claude.ai',
    purpose: 'Long-form writing assistance, analysis, feedback',
    learningCurve: 'easy',
    bestFor: ['Brainstorming', 'Feedback', 'Research', 'Outlining', 'Editing suggestions'],
    aiWarning: 'Use for thinking partner, not ghostwriting'
  },
  {
    name: 'ChatGPT',
    type: 'ai',
    cost: 'freemium',
    url: 'https://chat.openai.com',
    purpose: 'Versatile writing assistant',
    learningCurve: 'easy',
    bestFor: ['Quick drafts', 'Brainstorming', 'Research', 'Summarizing'],
    aiWarning: 'AI-generated text is detectable and lacks your voice'
  },
  {
    name: 'Grammarly',
    type: 'ai',
    cost: 'freemium',
    url: 'https://www.grammarly.com',
    purpose: 'Grammar, spelling, tone checking',
    learningCurve: 'easy',
    bestFor: ['Proofreading', 'Tone adjustment', 'Clarity', 'Non-native speakers'],
    aiWarning: 'Don\'t accept every suggestion blindly - sometimes "wrong" is your style'
  },
  {
    name: 'Hemingway Editor',
    type: 'editing',
    cost: 'freemium',
    url: 'https://hemingwayapp.com',
    purpose: 'Readability and simplicity checker',
    learningCurve: 'easy',
    bestFor: ['Simplifying writing', 'Readability', 'Cutting fluff']
  },
  {
    name: 'ProWritingAid',
    type: 'editing',
    cost: 'freemium',
    purpose: 'Deep editing analysis',
    learningCurve: 'medium',
    bestFor: ['Detailed feedback', 'Style analysis', 'Learning craft']
  },
  
  // Research
  {
    name: 'Perplexity',
    type: 'research',
    cost: 'freemium',
    url: 'https://perplexity.ai',
    purpose: 'AI-powered research with citations',
    learningCurve: 'easy',
    bestFor: ['Quick research', 'Fact-checking', 'Source finding']
  },
  {
    name: 'Google Scholar',
    type: 'research',
    cost: 'free',
    url: 'https://scholar.google.com',
    purpose: 'Academic source search',
    learningCurve: 'easy',
    bestFor: ['Academic writing', 'Credible sources', 'Deep research']
  },
  
  // Publishing
  {
    name: 'Substack',
    type: 'publishing',
    cost: 'free',
    url: 'https://substack.com',
    purpose: 'Newsletter publishing platform',
    learningCurve: 'easy',
    bestFor: ['Newsletters', 'Building audience', 'Monetization']
  },
  {
    name: 'Medium',
    type: 'publishing',
    cost: 'free',
    url: 'https://medium.com',
    purpose: 'Article publishing platform',
    learningCurve: 'easy',
    bestFor: ['Exposure', 'Articles', 'Building portfolio']
  },
  {
    name: 'Gumroad',
    type: 'publishing',
    cost: 'freemium',
    url: 'https://gumroad.com',
    purpose: 'Sell digital products',
    learningCurve: 'easy',
    bestFor: ['Ebooks', 'Courses', 'Direct sales']
  }
];

// ============================================================
// WRITING GUIDES
// ============================================================

const WRITING_GUIDES: Record<WritingTask, (profile: WriterProfile) => WritingGuide> = {
  'write-article': (profile) => ({
    title: 'Writing an Article',
    steps: [
      {
        step: 1,
        title: 'Find Your Angle',
        description: 'What\'s YOUR take on this topic?',
        tips: [
          'Don\'t write "10 Tips for..." - everyone does that',
          'What do you know that others don\'t?',
          'What\'s the contrarian view?',
          'What would you tell a friend over coffee?'
        ],
        exercises: [
          'Write 5 different headlines for the same topic',
          'Ask: Why would someone care about this NOW?'
        ]
      },
      {
        step: 2,
        title: 'Outline First',
        description: 'Structure before prose',
        tips: [
          'Hook → Problem → Solution → Call to action',
          'Each section answers one question',
          'If you can\'t outline it, you don\'t understand it',
          '3-5 main points maximum'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Brainstorm structure, not write content',
          warning: 'Outline your OWN ideas, use AI to organize, not generate'
        }
      },
      {
        step: 3,
        title: 'Write the Terrible First Draft',
        description: 'Get it down, don\'t get it right',
        tips: [
          'Write fast, edit slow',
          'Don\'t stop to fix anything',
          'Perfectionism kills first drafts',
          'You can\'t edit a blank page'
        ],
        exercises: [
          'Set a timer for 25 minutes, write without stopping',
          'Turn off your inner critic completely'
        ]
      },
      {
        step: 4,
        title: 'Edit Ruthlessly',
        description: 'Cut everything that doesn\'t serve the reader',
        tips: [
          'Read aloud - awkward sentences reveal themselves',
          'Cut your word count by 20%',
          'Every paragraph needs a job',
          'Delete your darlings'
        ],
        aiOption: {
          tool: 'Grammarly / Hemingway',
          howToUse: 'Check clarity and readability',
          warning: 'Don\'t lose your voice by accepting every suggestion'
        }
      },
      {
        step: 5,
        title: 'Nail the Opening',
        description: 'First line earns the second',
        tips: [
          'Start with a story, question, or surprising fact',
          'Never start with "In this article..."',
          'Hook them in 2 sentences or lose them',
          'Rewrite your opening 5 times'
        ]
      },
      {
        step: 6,
        title: 'End with Purpose',
        description: 'What should they do/think/feel?',
        tips: [
          'Summarize the key insight',
          'Give them a next step',
          'Don\'t introduce new ideas',
          'Leave them thinking'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'Grammarly', 'Perplexity'],
      bestFor: ['Research', 'Outlining', 'Grammar checking', 'Getting unstuck'],
      avoidFor: ['Writing the actual content', 'Finding your voice', 'Original ideas'],
      philosophy: 'AI can help you think, but it can\'t think FOR you. Your ideas, your voice, your byline.',
      voiceWarning: 'AI-written content is detectable and lacks the personality that builds loyal readers.'
    },
    estimatedTime: '3-6 hours for 1500 words',
    skillsLearned: ['Structure', 'Hooks', 'Editing', 'Voice'],
    wordCountGuide: '800-1500 words for blog, 1500-3000 for deep dives'
  }),

  'write-story': (profile) => ({
    title: 'Writing Fiction',
    steps: [
      {
        step: 1,
        title: 'Start with Character or Conflict',
        description: 'Stories need someone who wants something',
        tips: [
          'Character wants something + obstacle = story',
          'What does your character fear most?',
          'What are they willing to do to get what they want?',
          'Flawed characters are interesting characters'
        ],
        exercises: [
          'Write your character\'s worst day before the story starts',
          'What secret is your character keeping?'
        ]
      },
      {
        step: 2,
        title: 'Build Your World',
        description: 'Setting shapes story',
        tips: [
          'Know more than you write',
          'Specific details make it real',
          'Use all five senses',
          'The world should feel lived-in'
        ]
      },
      {
        step: 3,
        title: 'Plot the Journey',
        description: 'Beginning → Middle → End',
        tips: [
          'Opening: Hook + establish normal world',
          'Inciting incident: Something changes everything',
          'Rising action: Things get worse',
          'Climax: The big confrontation',
          'Resolution: New normal'
        ],
        aiOption: {
          tool: 'Claude',
          howToUse: 'Discuss plot problems, brainstorm alternatives',
          warning: 'NEVER let AI write your story. It will sound like AI.'
        }
      },
      {
        step: 4,
        title: 'Write Dialogue That Matters',
        description: 'Every line should do work',
        tips: [
          'Dialogue reveals character',
          'People rarely say what they mean',
          'Subtext > text',
          'Read it aloud - does it sound real?'
        ],
        exercises: [
          'Write a scene where characters argue without saying what they\'re really arguing about'
        ]
      },
      {
        step: 5,
        title: 'Show, Don\'t Tell',
        description: 'Let readers experience, not hear about',
        tips: [
          '"She was angry" → Show her actions, words, body',
          'Trust your readers',
          'Action reveals character',
          'Telling has its place, but sparingly'
        ]
      },
      {
        step: 6,
        title: 'Revise for Impact',
        description: 'Rewriting is where the magic happens',
        tips: [
          'First draft is discovery, revision is craft',
          'Read it as a reader, not the writer',
          'Kill scenes that don\'t advance plot or character',
          'Get feedback from trusted readers'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: ['Claude'],
      bestFor: ['Discussing ideas', 'Working through plot problems', 'Research for setting'],
      avoidFor: ['Writing prose', 'Dialogue', 'Anything that goes on the page'],
      philosophy: 'Fiction is YOU on the page. AI cannot replicate your lived experience, your perspective, your truth.',
      voiceWarning: 'AI fiction is soulless. Readers can tell. Your unique voice is your only competitive advantage.'
    },
    estimatedTime: 'Varies widely (days to years)',
    skillsLearned: ['Character', 'Plot', 'Dialogue', 'Voice', 'Revision'],
    wordCountGuide: 'Short story: 1,000-7,500 / Novella: 17,500-40,000 / Novel: 70,000-100,000'
  }),

  'write-copy': (profile) => ({
    title: 'Writing Copy That Converts',
    steps: [
      {
        step: 1,
        title: 'Know Your Audience',
        description: 'You can\'t persuade everyone',
        tips: [
          'One ideal customer in mind',
          'What keeps them up at night?',
          'What words do THEY use?',
          'Where are they in the buyer journey?'
        ]
      },
      {
        step: 2,
        title: 'Lead with Benefits',
        description: 'Features tell, benefits sell',
        tips: [
          'Feature: What it is',
          'Benefit: What it does for them',
          'Feature: "24/7 support"',
          'Benefit: "Never feel stuck again"'
        ],
        aiOption: {
          tool: 'ChatGPT / Claude',
          howToUse: 'Generate benefit variations, brainstorm angles',
          warning: 'AI copy is generic. Customize heavily or it won\'t convert.'
        }
      },
      {
        step: 3,
        title: 'Craft Headlines',
        description: 'The most important 5 seconds',
        tips: [
          'Write 20 headlines, pick the best',
          'Specific > vague ("10 pounds in 30 days" > "lose weight fast")',
          'Promise + curiosity',
          'Test variations'
        ],
        exercises: [
          'Rewrite your headline as a question',
          'Add a number to your headline',
          'What would make you stop scrolling?'
        ]
      },
      {
        step: 4,
        title: 'Use Social Proof',
        description: 'People follow people',
        tips: [
          'Testimonials with specifics',
          'Numbers (10,000 customers)',
          'Logos of clients/press',
          'Before/after stories'
        ]
      },
      {
        step: 5,
        title: 'Overcome Objections',
        description: 'Address the "but..."',
        tips: [
          'What stops people from buying?',
          'Answer it before they think it',
          'Guarantees reduce risk',
          'FAQ section as objection handler'
        ]
      },
      {
        step: 6,
        title: 'Clear Call to Action',
        description: 'Tell them exactly what to do',
        tips: [
          'One CTA per page',
          'Action words: Get, Start, Join, Claim',
          'Create urgency (genuinely)',
          'Make the button obvious'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['ChatGPT', 'Claude', 'Jasper'],
      bestFor: ['Generating variations', 'Overcoming blank page', 'A/B test options'],
      avoidFor: ['Final copy', 'Brand voice', 'Anything requiring trust'],
      philosophy: 'AI can generate copy, but copy is about CONNECTION. Your understanding of your audience is irreplaceable.',
      voiceWarning: 'Generic AI copy doesn\'t convert. Specificity and authenticity do.'
    },
    estimatedTime: '2-4 hours per page',
    skillsLearned: ['Persuasion', 'Headlines', 'Benefits', 'CTAs'],
    wordCountGuide: 'Headlines: 5-10 words / Body: As short as possible while complete'
  }),

  'edit-work': (profile) => ({
    title: 'Self-Editing Your Work',
    steps: [
      {
        step: 1,
        title: 'Let It Rest',
        description: 'Distance creates perspective',
        tips: [
          'Minimum 24 hours between writing and editing',
          'Longer is better for important pieces',
          'Work on something else in between',
          'Fresh eyes catch what tired eyes miss'
        ]
      },
      {
        step: 2,
        title: 'Structural Edit',
        description: 'Big picture first',
        tips: [
          'Does it deliver what the headline promises?',
          'Is the structure logical?',
          'Does every section earn its place?',
          'Cut or move entire sections if needed'
        ]
      },
      {
        step: 3,
        title: 'Line Edit',
        description: 'Sentence by sentence',
        tips: [
          'Read aloud - you\'ll catch awkwardness',
          'Vary sentence length',
          'Cut unnecessary words',
          'Active voice > passive voice (usually)'
        ],
        aiOption: {
          tool: 'Grammarly / ProWritingAid',
          howToUse: 'Get suggestions, but decide yourself',
          warning: 'These tools don\'t know your voice. Override when your style conflicts.'
        }
      },
      {
        step: 4,
        title: 'Word-Level Edit',
        description: 'Precision matters',
        tips: [
          'Replace weak verbs (is, was, has)',
          'Cut adverbs - use stronger verbs instead',
          'Eliminate redundancy',
          'Every word should earn its place'
        ]
      },
      {
        step: 5,
        title: 'Proofread',
        description: 'Final polish',
        tips: [
          'Different pass from editing',
          'Spelling, punctuation, formatting',
          'Read backwards to catch typos',
          'Print it out - you\'ll see errors you missed on screen'
        ],
        aiOption: {
          tool: 'Grammarly / spell check',
          howToUse: 'Final proofing pass',
          warning: 'Still human-review everything - AI misses context'
        }
      },
      {
        step: 6,
        title: 'Get External Feedback',
        description: 'You can\'t see your own blind spots',
        tips: [
          'Choose readers who will be honest',
          'Specific questions help: "Was the ending clear?"',
          'Listen without defending',
          'Not all feedback needs to be implemented'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Grammarly', 'Hemingway', 'ProWritingAid'],
      bestFor: ['Catching errors', 'Readability scores', 'Consistency'],
      avoidFor: ['Voice decisions', 'Creative choices', 'Final judgment'],
      philosophy: 'AI editing tools are assistants, not authorities. YOU are the editor. They\'re just highlighting options.',
      voiceWarning: 'If you accept every AI suggestion, your writing will sound generic. Your quirks are your style.'
    },
    estimatedTime: '1-2 hours per 1000 words',
    skillsLearned: ['Self-editing', 'Revision', 'Proofreading']
  }),

  'find-voice': (profile) => ({
    title: 'Finding Your Writing Voice',
    steps: [
      {
        step: 1,
        title: 'Study Writers You Love',
        description: 'Voice is learned by absorption',
        tips: [
          'Copy passages by hand (seriously)',
          'Ask: What makes their writing THEIRS?',
          'Notice rhythm, word choice, structure',
          'Don\'t copy style - understand it'
        ],
        exercises: [
          'Rewrite a passage in the style of your favorite writer',
          'Then rewrite it as yourself'
        ]
      },
      {
        step: 2,
        title: 'Write Like You Talk',
        description: 'Authenticity is magnetic',
        tips: [
          'Record yourself explaining something, then transcribe',
          'Would you say that sentence out loud?',
          'Contractions are okay',
          'Short sentences are okay'
        ]
      },
      {
        step: 3,
        title: 'Embrace Your Weird',
        description: 'Your quirks are your brand',
        tips: [
          'What do only YOU notice?',
          'What pisses you off?',
          'What makes you laugh?',
          'What do people come to you for?'
        ],
        exercises: [
          'Write about something you hate',
          'Write about something you love that others don\'t understand'
        ]
      },
      {
        step: 4,
        title: 'Practice Volume',
        description: 'Voice emerges through doing',
        tips: [
          'Write every day, even badly',
          'Try different topics, formats, styles',
          'Voice develops over 100,000+ words',
          'You can\'t think your way to voice'
        ]
      },
      {
        step: 5,
        title: 'Kill Imitation',
        description: 'Sound like you, not them',
        tips: [
          'Notice when you\'re performing',
          'Write for someone specific, not everyone',
          'First drafts reveal voice, editing can kill it',
          'When in doubt, simpler is more you'
        ]
      }
    ],
    aiIntegration: {
      recommended: false,
      tools: [],
      bestFor: [],
      avoidFor: ['Everything about voice'],
      philosophy: 'Voice is YOU. AI has no voice - it has an average of everyone else\'s. Using AI to find your voice is like asking a committee to pick your personality.',
      voiceWarning: 'This is the one thing AI genuinely cannot help with. Your voice must come from your life, your thoughts, your being.'
    },
    estimatedTime: 'Ongoing (months to years)',
    skillsLearned: ['Self-awareness', 'Authenticity', 'Style']
  }),

  'overcome-block': (profile) => ({
    title: 'Overcoming Writer\'s Block',
    steps: [
      {
        step: 1,
        title: 'Identify the Block',
        description: 'Different blocks need different solutions',
        tips: [
          'Fear of judgment? → Write badly on purpose',
          'Don\'t know what to write? → Brainstorm, don\'t write',
          'Perfectionism? → Give yourself permission to suck',
          'Burnout? → Rest is productive'
        ]
      },
      {
        step: 2,
        title: 'Lower the Stakes',
        description: 'Nobody needs to see this',
        tips: [
          'Write "THIS IS GARBAGE" at the top',
          'Write in a private document',
          'Write for 10 minutes, then delete it',
          'The goal is moving, not quality'
        ],
        exercises: [
          'Write the worst possible version of what you\'re trying to write',
          'Write about why you can\'t write'
        ]
      },
      {
        step: 3,
        title: 'Change the Context',
        description: 'Physical changes unlock mental changes',
        tips: [
          'Write somewhere different',
          'Write at a different time',
          'Write by hand instead of keyboard',
          'Take a walk, then write'
        ]
      },
      {
        step: 4,
        title: 'Use Prompts and Constraints',
        description: 'Limitations create freedom',
        tips: [
          'Write about [random object] in 100 words',
          'Start every sentence with "I"',
          'Write a list instead of prose',
          'Constraints remove the paralysis of infinite choice'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Generate prompts, brainstorm angles',
          warning: 'Use AI to SPARK ideas, not write for you. That won\'t cure the block, just postpone it.'
        }
      },
      {
        step: 5,
        title: 'Build a Practice',
        description: 'Consistency beats inspiration',
        tips: [
          'Same time, same place, every day',
          'Small goals: 200 words, 15 minutes',
          'Momentum matters more than volume',
          'Writers write, even when they don\'t feel like it'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT'],
      bestFor: ['Generating prompts', 'Brainstorming when stuck', 'Talking through ideas'],
      avoidFor: ['Writing for you', 'Avoiding the hard work'],
      philosophy: 'AI can help you start moving, but writer\'s block is often about fear. The only cure is writing through it.',
      voiceWarning: 'Using AI to write when you\'re blocked just creates dependency. Use it to spark, not substitute.'
    },
    estimatedTime: 'As long as it takes',
    skillsLearned: ['Self-awareness', 'Discipline', 'Resilience']
  }),

  'pitch-idea': (profile) => ({
    title: 'Pitching Your Ideas',
    steps: [
      {
        step: 1,
        title: 'Know Your Target',
        description: 'Research before reaching out',
        tips: [
          'Read what they\'ve published',
          'Understand their audience',
          'What gaps do they have?',
          'Personalize every pitch'
        ]
      },
      {
        step: 2,
        title: 'Lead with the Hook',
        description: 'First sentence is everything',
        tips: [
          'Subject line: Clear, specific, intriguing',
          'First line: Why you, why them, why now',
          'Get to the point immediately',
          'Editors are busy - respect their time'
        ]
      },
      {
        step: 3,
        title: 'Show, Don\'t Tell',
        description: 'Demonstrate your ability',
        tips: [
          'Include 2-3 relevant clips',
          'Brief bio that shows credibility',
          'Why you\'re qualified for THIS topic',
          'Links, not attachments'
        ]
      },
      {
        step: 4,
        title: 'Make It Easy',
        description: 'Reduce friction',
        tips: [
          'One idea per pitch',
          'Suggested headline and angle',
          'Approximate word count',
          'Proposed deadline',
          'Clear next step'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Refine pitch language, check for clarity',
          warning: 'Personalization must be genuine. AI templates are obvious.'
        }
      },
      {
        step: 5,
        title: 'Follow Up',
        description: 'Persistence pays',
        tips: [
          'Wait 1-2 weeks',
          'One polite follow-up',
          'No response often means try elsewhere',
          'Don\'t take silence personally'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'Grammarly'],
      bestFor: ['Editing pitches', 'Clarity check', 'Finding publications'],
      avoidFor: ['Fake personalization', 'Template pitches'],
      philosophy: 'A pitch is a promise. AI can help you articulate, but the idea and credibility must be yours.',
      voiceWarning: 'Editors can spot AI-written pitches. Be genuine.'
    },
    estimatedTime: '30-60 minutes per pitch',
    skillsLearned: ['Research', 'Persuasion', 'Professionalism']
  }),

  'build-audience': (profile) => ({
    title: 'Building Your Writing Audience',
    steps: [
      {
        step: 1,
        title: 'Define Your Niche',
        description: 'Specificity attracts',
        tips: [
          'What can you talk about forever?',
          'What do you know that others need?',
          'Who specifically is your reader?',
          'Niche down, then niche down again'
        ]
      },
      {
        step: 2,
        title: 'Pick One Platform',
        description: 'Master one before expanding',
        tips: [
          'Where does your audience already hang out?',
          'Newsletter? Substack, ConvertKit',
          'Articles? Medium, your blog',
          'Threads/Twitter for real-time engagement'
        ]
      },
      {
        step: 3,
        title: 'Consistency Over Virality',
        description: 'Show up reliably',
        tips: [
          'Weekly is minimum for most platforms',
          'Same day, same time builds habit',
          'Quality > quantity, but quantity matters',
          'Your 100th post beats your 10th'
        ]
      },
      {
        step: 4,
        title: 'Engage, Don\'t Broadcast',
        description: 'Community is two-way',
        tips: [
          'Reply to every comment (early on)',
          'Comment on others\' work generously',
          'Share what inspires you',
          'Be a person, not a brand'
        ]
      },
      {
        step: 5,
        title: 'Capture Email',
        description: 'Own your audience',
        tips: [
          'Platforms change, email persists',
          'Offer something valuable to subscribe',
          'Your list is your insurance',
          'Email > social followers'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT', 'Perplexity'],
      bestFor: ['Brainstorming content ideas', 'Research', 'Repurposing content'],
      avoidFor: ['Writing main content', 'Engagement', 'Authenticity'],
      philosophy: 'Audiences follow people, not content. AI can help with logistics, but connection requires YOU.',
      voiceWarning: 'AI-generated content won\'t build loyal readers. Your perspective will.'
    },
    estimatedTime: 'Ongoing (6-12 months minimum)',
    skillsLearned: ['Platform strategy', 'Consistency', 'Community building']
  }),

  'create-newsletter': (profile) => ({
    title: 'Creating a Newsletter',
    steps: [
      {
        step: 1,
        title: 'Define Your Promise',
        description: 'Why should someone subscribe?',
        tips: [
          'Specific value: "Weekly writing tips" not "thoughts"',
          'Unique angle: What only YOU can offer?',
          'Frequency: Set expectations',
          'One clear promise'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Platform',
        description: 'Tools for the job',
        tips: [
          'Substack: Free, simple, built-in discovery',
          'ConvertKit: More control, better for selling',
          'Buttondown: Clean, simple, affordable',
          'Start free, upgrade when you have 1000+'
        ]
      },
      {
        step: 3,
        title: 'Design Your Format',
        description: 'Consistency helps readers',
        tips: [
          'Recurring sections people can expect',
          'About the same length each time',
          'Personal touch: Why is this on your mind?',
          'One main idea per issue'
        ]
      },
      {
        step: 4,
        title: 'Create Your Welcome',
        description: 'First impression matters',
        tips: [
          'Welcome email: Who are you, what to expect',
          'Deliver immediate value',
          'Ask a question to start conversation',
          'Set reply expectations'
        ],
        aiOption: {
          tool: 'Claude',
          howToUse: 'Brainstorm welcome sequence, refine language',
          warning: 'Welcome must sound like YOU, not a template'
        }
      },
      {
        step: 5,
        title: 'Get Your First Subscribers',
        description: 'Start with people who know you',
        tips: [
          'Ask friends and colleagues directly',
          'Share on social media',
          'Guest post with newsletter link',
          'First 100 are hardest, but most important'
        ]
      },
      {
        step: 6,
        title: 'Maintain Momentum',
        description: 'Keep going even when it\'s hard',
        tips: [
          'Batch write when you\'re inspired',
          'Keep a running ideas list',
          'Growth is slow at first',
          'Reply to every email you get'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'Grammarly', 'Perplexity'],
      bestFor: ['Ideas', 'Editing', 'Research for content'],
      avoidFor: ['Main content', 'Your personal voice'],
      philosophy: 'Newsletter success is about relationship. AI can help with production, but connection is human.',
      voiceWarning: 'Readers subscribe for YOUR voice. AI content will feel hollow.'
    },
    estimatedTime: '2-4 hours per issue',
    skillsLearned: ['Email marketing', 'Consistency', 'Audience building'],
    wordCountGuide: '500-2000 words typical, depends on niche'
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface WriterAssistROVProps {
  profile: WriterProfile;
  onToolClick?: (tool: WritingToolRecommendation) => void;
}

export const WriterAssistROV: React.FC<WriterAssistROVProps> = ({
  profile,
  onToolClick
}) => {
  const [selectedTask, setSelectedTask] = useState<WritingTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return WRITING_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const recommendedTools = useMemo(() => {
    return WRITING_TOOLS.filter(tool => {
      if (profile.skillLevel === 'beginner') {
        return tool.learningCurve === 'easy';
      }
      return true;
    });
  }, [profile.skillLevel]);
  
  const tasks: { id: WritingTask; label: string; icon: string }[] = [
    { id: 'write-article', label: 'Write Article', icon: '📝' },
    { id: 'write-story', label: 'Write Fiction', icon: '📖' },
    { id: 'write-copy', label: 'Write Copy', icon: '💰' },
    { id: 'edit-work', label: 'Edit My Work', icon: '✂️' },
    { id: 'find-voice', label: 'Find My Voice', icon: '🎤' },
    { id: 'overcome-block', label: 'Beat Writer\'s Block', icon: '🧱' },
    { id: 'pitch-idea', label: 'Pitch an Idea', icon: '📧' },
    { id: 'build-audience', label: 'Build Audience', icon: '👥' },
    { id: 'create-newsletter', label: 'Start Newsletter', icon: '📬' }
  ];
  
  return (
    <div className="writer-assist-rov">
      <div className="writer-assist-rov__header">
        <div className="writer-assist-rov__avatar">✍️</div>
        <div className="writer-assist-rov__info">
          <h2>Writer Assist</h2>
          <span>PageTurners Writing Guide</span>
        </div>
      </div>
      
      <div className="writer-assist-rov__profile">
        <p>
          Hello {profile.name}! You've written approximately <strong>{profile.wordsWritten.toLocaleString()} words</strong>
          {profile.piecesPublished > 0 && ` and published ${profile.piecesPublished} pieces`}.
          {profile.wordsWritten < 50000 && ' Keep writing - voice emerges through practice.'}
          {profile.wordsWritten >= 50000 && ' Your voice is developing nicely!'}
        </p>
        <p className="philosophy">
          💡 AI can write, but it can't THINK like you. Your perspective, your stories, your voice - that's what readers want.
        </p>
      </div>
      
      <div className="writer-assist-rov__tasks">
        <h3>What are you working on?</h3>
        <div className="writer-assist-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`writer-assist-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="writer-assist-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="writer-assist-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
            {guide.wordCountGuide && <span>📏 {guide.wordCountGuide}</span>}
          </div>
          
          <div className="writer-assist-rov__ai-note">
            {guide.aiIntegration.recommended ? (
              <div className="ai-yes">
                <p>✅ AI can help with parts of this!</p>
                <p><strong>Good for:</strong> {guide.aiIntegration.bestFor.join(', ')}</p>
                <p><strong>Not for:</strong> {guide.aiIntegration.avoidFor.join(', ')}</p>
              </div>
            ) : (
              <div className="ai-no">
                <p>⚠️ This is a human-only skill.</p>
                <p>{guide.aiIntegration.philosophy}</p>
              </div>
            )}
            <p className="voice-warning">🎤 {guide.aiIntegration.voiceWarning}</p>
          </div>
          
          <div className="writer-assist-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="writer-assist-rov__step">
                <div className="writer-assist-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.exercises && (
                  <div className="exercises">
                    <strong>✏️ Exercises:</strong>
                    <ul>
                      {step.exercises.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.aiOption && (
                  <div className="writer-assist-rov__ai-option">
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
      
      <div className="writer-assist-rov__tools">
        <h3>Recommended Tools</h3>
        <div className="writer-assist-rov__tool-list">
          {recommendedTools.slice(0, 8).map(tool => (
            <button
              key={tool.name}
              className="writer-assist-rov__tool"
              onClick={() => onToolClick?.(tool)}
            >
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-cost cost-${tool.cost}`}>{tool.cost}</span>
              <span className="tool-purpose">{tool.purpose}</span>
              {tool.aiWarning && (
                <span className="tool-warning">⚠️ {tool.aiWarning}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="writer-assist-rov__footer">
        <p>
          💚 The world has infinite AI-generated content. 
          What it needs is YOUR truth, YOUR stories, YOUR perspective.
          That's what people pay for.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  WRITING_TOOLS,
  WRITING_GUIDES
};

export default WriterAssistROV;