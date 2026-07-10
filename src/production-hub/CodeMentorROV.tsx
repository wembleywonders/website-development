/**
 * CODE MENTOR ROV
 * 
 * Development guidance for TECHreneurs creators.
 * Covers web development, app building, and tech entrepreneurship.
 * 
 * Philosophy: AI can write code, but it can't understand YOUR problem.
 * Learn the fundamentals, then use AI to accelerate.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface TechCreatorProfile {
  id: string;
  name: string;
  workshopsCompleted: number;
  specialization: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'nocode' | null;
  languages: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  projectsCompleted: number;
  clientProjects: number;
}

export type TechTask = 
  | 'learn-coding'
  | 'build-website'
  | 'build-app'
  | 'debug-code'
  | 'learn-framework'
  | 'use-ai-coding'
  | 'freelance-dev'
  | 'build-portfolio'
  | 'nocode-tools';

export interface TechToolRecommendation {
  name: string;
  type: 'language' | 'framework' | 'ai' | 'platform' | 'tool' | 'nocode';
  cost: 'free' | 'freemium' | 'paid';
  url?: string;
  purpose: string;
  learningCurve: 'easy' | 'medium' | 'hard';
  bestFor: string[];
  aiFeatures?: string[];
}

export interface TechGuide {
  title: string;
  steps: TechStep[];
  aiIntegration: AITechGuide;
  estimatedTime: string;
  skillsLearned: string[];
  prerequisites?: string[];
}

export interface TechStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  codeExample?: string;
  resources?: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface AITechGuide {
  recommended: boolean;
  tools: string[];
  bestFor: string[];
  avoidFor: string[];
  philosophy: string;
  dangerZone?: string;
}

// ============================================================
// TOOL DATABASE
// ============================================================

const TECH_TOOLS: TechToolRecommendation[] = [
  // Languages
  {
    name: 'JavaScript',
    type: 'language',
    cost: 'free',
    purpose: 'The language of the web - runs everywhere',
    learningCurve: 'medium',
    bestFor: ['Web development', 'Full-stack', 'Beginners to coding']
  },
  {
    name: 'Python',
    type: 'language',
    cost: 'free',
    purpose: 'Readable, versatile, great for beginners',
    learningCurve: 'easy',
    bestFor: ['Beginners', 'Data science', 'Automation', 'Backend']
  },
  {
    name: 'TypeScript',
    type: 'language',
    cost: 'free',
    purpose: 'JavaScript with types - fewer bugs',
    learningCurve: 'medium',
    bestFor: ['Large projects', 'Team work', 'Professional development']
  },
  
  // Frameworks
  {
    name: 'React',
    type: 'framework',
    cost: 'free',
    url: 'https://react.dev',
    purpose: 'Build interactive web interfaces',
    learningCurve: 'medium',
    bestFor: ['Web apps', 'Single-page apps', 'Job market demand']
  },
  {
    name: 'Next.js',
    type: 'framework',
    cost: 'free',
    url: 'https://nextjs.org',
    purpose: 'Full-stack React framework',
    learningCurve: 'medium',
    bestFor: ['Full websites', 'SEO', 'Server-side rendering']
  },
  {
    name: 'Node.js',
    type: 'framework',
    cost: 'free',
    url: 'https://nodejs.org',
    purpose: 'Run JavaScript on servers',
    learningCurve: 'medium',
    bestFor: ['Backend APIs', 'Full-stack JS', 'Real-time apps']
  },
  
  // AI Coding Tools
  {
    name: 'GitHub Copilot',
    type: 'ai',
    cost: 'paid',
    url: 'https://github.com/features/copilot',
    purpose: 'AI code completion in your editor',
    learningCurve: 'easy',
    bestFor: ['Boilerplate code', 'Common patterns', 'Learning syntax'],
    aiFeatures: ['Auto-complete', 'Generate functions', 'Explain code']
  },
  {
    name: 'Cursor',
    type: 'ai',
    cost: 'freemium',
    url: 'https://cursor.sh',
    purpose: 'AI-native code editor',
    learningCurve: 'easy',
    bestFor: ['Chat with codebase', 'Refactoring', 'Learning'],
    aiFeatures: ['Codebase chat', 'Multi-file edits', 'AI debugging']
  },
  {
    name: 'Claude / ChatGPT',
    type: 'ai',
    cost: 'freemium',
    purpose: 'General AI for code explanation and generation',
    learningCurve: 'easy',
    bestFor: ['Learning concepts', 'Debugging help', 'Code review'],
    aiFeatures: ['Explain code', 'Generate snippets', 'Debug help']
  },
  {
    name: 'Replit AI',
    type: 'ai',
    cost: 'freemium',
    url: 'https://replit.com',
    purpose: 'Browser-based coding with AI',
    learningCurve: 'easy',
    bestFor: ['Beginners', 'No setup needed', 'Quick prototypes'],
    aiFeatures: ['Ghostwriter', 'Code generation', 'Explain code']
  },
  {
    name: 'v0 by Vercel',
    type: 'ai',
    cost: 'freemium',
    url: 'https://v0.dev',
    purpose: 'Generate UI from text prompts',
    learningCurve: 'easy',
    bestFor: ['UI prototypes', 'React components', 'Design-to-code'],
    aiFeatures: ['Text-to-UI', 'React/Tailwind output']
  },
  
  // No-Code
  {
    name: 'Webflow',
    type: 'nocode',
    cost: 'freemium',
    url: 'https://webflow.com',
    purpose: 'Visual web development',
    learningCurve: 'medium',
    bestFor: ['Marketing sites', 'Client work', 'Design-focused']
  },
  {
    name: 'Framer',
    type: 'nocode',
    cost: 'freemium',
    url: 'https://framer.com',
    purpose: 'Build websites visually with AI',
    learningCurve: 'easy',
    bestFor: ['Landing pages', 'Portfolios', 'Quick launches'],
    aiFeatures: ['AI site generation', 'AI copywriting']
  },
  {
    name: 'Bubble',
    type: 'nocode',
    cost: 'freemium',
    url: 'https://bubble.io',
    purpose: 'Build web apps without code',
    learningCurve: 'medium',
    bestFor: ['MVPs', 'Web apps', 'Non-programmers']
  },
  
  // Platforms & Tools
  {
    name: 'VS Code',
    type: 'tool',
    cost: 'free',
    url: 'https://code.visualstudio.com',
    purpose: 'Industry-standard code editor',
    learningCurve: 'easy',
    bestFor: ['Everything', 'Extensions', 'Industry standard']
  },
  {
    name: 'GitHub',
    type: 'platform',
    cost: 'free',
    url: 'https://github.com',
    purpose: 'Code hosting and version control',
    learningCurve: 'medium',
    bestFor: ['Collaboration', 'Portfolio', 'Version control']
  },
  {
    name: 'Vercel',
    type: 'platform',
    cost: 'freemium',
    url: 'https://vercel.com',
    purpose: 'Deploy websites instantly',
    learningCurve: 'easy',
    bestFor: ['React/Next.js', 'Instant deploys', 'Free hosting']
  }
];

// ============================================================
// TECH GUIDES
// ============================================================

const TECH_GUIDES: Record<TechTask, (profile: TechCreatorProfile) => TechGuide> = {
  'learn-coding': (profile) => ({
    title: 'Learning to Code',
    steps: [
      {
        step: 1,
        title: 'Choose Your First Language',
        description: 'Start with one language, master it',
        tips: [
          'JavaScript: Best for web, most job opportunities',
          'Python: Easiest to read, great for beginners',
          'Don\'t learn multiple languages at once',
          'Stick with your choice for 3-6 months minimum'
        ]
      },
      {
        step: 2,
        title: 'Learn the Fundamentals',
        description: 'Core concepts that transfer to any language',
        tips: [
          'Variables: Storing information',
          'Functions: Reusable blocks of code',
          'Conditionals: if/else logic',
          'Loops: Repeating actions',
          'Data structures: Arrays, objects'
        ],
        resources: [
          'freeCodeCamp.org - Free full curriculum',
          'The Odin Project - Free web dev path',
          'Codecademy - Interactive learning'
        ]
      },
      {
        step: 3,
        title: 'Build Something Simple',
        description: 'Learning by doing beats tutorials',
        tips: [
          'Todo list app (classic first project)',
          'Calculator',
          'Personal website',
          'Don\'t just watch - type the code yourself'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Ask it to explain concepts, not write code for you',
          warning: 'Copying AI code without understanding = learning nothing'
        }
      },
      {
        step: 4,
        title: 'Get Stuck, Then Unstuck',
        description: 'Struggle is where learning happens',
        tips: [
          'Try to solve problems for 20 minutes before asking for help',
          'Read error messages - they tell you what\'s wrong',
          'Google your errors - someone else had the same problem',
          'Stack Overflow is your friend'
        ]
      },
      {
        step: 5,
        title: 'Build Progressively Harder Projects',
        description: 'Comfort zone → stretch zone → growth',
        tips: [
          'Each project should be slightly beyond your current ability',
          'Clone simple apps you use (weather app, notes app)',
          'Add features to things you\'ve built',
          'Build things YOU want to use'
        ]
      },
      {
        step: 6,
        title: 'Code Every Day',
        description: 'Consistency beats intensity',
        tips: [
          '30 minutes daily > 5 hours on weekends',
          '100 Days of Code challenge',
          'Small progress compounds',
          'Don\'t break the chain'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT', 'Replit AI'],
      bestFor: ['Explaining concepts', 'Debugging help', 'Understanding errors'],
      avoidFor: ['Writing code for you', 'Skipping fundamentals', 'Copying without understanding'],
      philosophy: 'AI is the best coding tutor ever created. But it can\'t LEARN for you. You must struggle.',
      dangerZone: 'If you ask AI to write all your code, you won\'t actually learn to code.'
    },
    estimatedTime: '3-6 months to build simple projects',
    skillsLearned: ['Programming fundamentals', 'Problem-solving', 'Debugging'],
    prerequisites: ['Patience', 'Willingness to be confused']
  }),

  'build-website': (profile) => ({
    title: 'Building a Website',
    steps: [
      {
        step: 1,
        title: 'Define the Purpose',
        description: 'What is this website for?',
        tips: [
          'Portfolio? Landing page? Web app?',
          'Who is it for?',
          'What action should visitors take?',
          'Sketch out pages before coding'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Approach',
        description: 'Code vs no-code decision',
        tips: [
          'No-code (Framer, Webflow): Fast, limited customization',
          'Static HTML/CSS: Simple, full control, good for learning',
          'React/Next.js: Complex, powerful, industry standard',
          'For learning: Code it. For speed: No-code is fine.'
        ],
        aiOption: {
          tool: 'Framer AI / v0',
          howToUse: 'Generate initial design, then customize',
          warning: 'Good for prototypes, but learn to code for real control'
        }
      },
      {
        step: 3,
        title: 'Set Up Your Project',
        description: 'Get the foundation ready',
        tips: [
          'Create a folder for your project',
          'Initialize with npm/yarn (if using React)',
          'Set up version control (Git)',
          'Connect to GitHub'
        ],
        codeExample: `# For a React project
npx create-next-app@latest my-website
cd my-website
npm run dev`
      },
      {
        step: 4,
        title: 'Build the Structure',
        description: 'HTML/JSX structure first',
        tips: [
          'Mobile-first design',
          'Semantic HTML (header, main, footer)',
          'Component-based thinking',
          'Get the content right before styling'
        ]
      },
      {
        step: 5,
        title: 'Style It',
        description: 'Make it look good',
        tips: [
          'CSS or Tailwind CSS',
          'Start with layout (flexbox, grid)',
          'Consistent spacing and colors',
          'Responsive design (test on phone)'
        ],
        aiOption: {
          tool: 'GitHub Copilot / Cursor',
          howToUse: 'Generate CSS for common patterns',
          warning: 'AI CSS can be verbose - clean up after'
        }
      },
      {
        step: 6,
        title: 'Deploy It',
        description: 'Get it online',
        tips: [
          'Vercel: Best for React/Next.js (free)',
          'Netlify: Great for static sites (free)',
          'GitHub Pages: Simple, free',
          'Deploy early, deploy often'
        ],
        codeExample: `# Deploy to Vercel
npm install -g vercel
vercel`
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['v0', 'GitHub Copilot', 'Cursor', 'Framer AI'],
      bestFor: ['Boilerplate code', 'Styling', 'Common components', 'Prototyping'],
      avoidFor: ['Understanding the code', 'Complex logic', 'Security-critical code'],
      philosophy: 'AI can scaffold quickly, but you need to understand what it generates to maintain and extend it.'
    },
    estimatedTime: '1-4 days for simple site, 1-4 weeks for complex',
    skillsLearned: ['HTML/CSS', 'React basics', 'Deployment'],
    prerequisites: ['Basic coding knowledge']
  }),

  'build-app': (profile) => ({
    title: 'Building a Web Application',
    steps: [
      {
        step: 1,
        title: 'Define the MVP',
        description: 'Minimum Viable Product',
        tips: [
          'What\'s the ONE core feature?',
          'Cut everything that isn\'t essential',
          'You can add features later',
          'Perfect is the enemy of shipped'
        ]
      },
      {
        step: 2,
        title: 'Design the Data Model',
        description: 'What data does your app need?',
        tips: [
          'Users: What info do you store?',
          'Content: What does your app manage?',
          'Relationships: How is data connected?',
          'Sketch it out before coding'
        ]
      },
      {
        step: 3,
        title: 'Choose Your Stack',
        description: 'Technologies for each layer',
        tips: [
          'Frontend: React, Vue, or Svelte',
          'Backend: Node.js, Python, or BaaS (Firebase, Supabase)',
          'Database: PostgreSQL, MongoDB, or SQLite',
          'For beginners: Next.js + Supabase is easiest full-stack'
        ]
      },
      {
        step: 4,
        title: 'Build the Backend First',
        description: 'Data and logic before UI',
        tips: [
          'Set up database schema',
          'Create API endpoints',
          'Add authentication if needed',
          'Test with Postman or similar'
        ],
        aiOption: {
          tool: 'Cursor / GitHub Copilot',
          howToUse: 'Generate boilerplate, API routes, database queries',
          warning: 'AI doesn\'t know your business logic - you must direct it'
        }
      },
      {
        step: 5,
        title: 'Build the Frontend',
        description: 'User interface and interactions',
        tips: [
          'Start with wireframes',
          'Component-based architecture',
          'State management (React hooks, Context)',
          'Connect to your API'
        ],
        aiOption: {
          tool: 'v0 / Claude',
          howToUse: 'Generate UI components, form handling',
          warning: 'Review generated code carefully - AI makes mistakes'
        }
      },
      {
        step: 6,
        title: 'Test and Deploy',
        description: 'Get it into users\' hands',
        tips: [
          'Test main user flows',
          'Fix critical bugs only (for MVP)',
          'Deploy to production',
          'Get feedback, iterate'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Cursor', 'GitHub Copilot', 'Claude', 'v0', 'Supabase'],
      bestFor: ['Boilerplate', 'CRUD operations', 'UI components', 'Debugging'],
      avoidFor: ['Architecture decisions', 'Security logic', 'Business rules'],
      philosophy: 'AI can 10x your speed on routine code. Complex logic and architecture still require human brain.',
      dangerZone: 'AI-generated auth/security code can have vulnerabilities. Review carefully or use established libraries.'
    },
    estimatedTime: '2-8 weeks for MVP',
    skillsLearned: ['Full-stack development', 'Databases', 'API design', 'Deployment'],
    prerequisites: ['JavaScript/TypeScript', 'React basics']
  }),

  'debug-code': (profile) => ({
    title: 'Debugging Your Code',
    steps: [
      {
        step: 1,
        title: 'Read the Error Message',
        description: 'Errors tell you what\'s wrong',
        tips: [
          'Read the WHOLE error message',
          'Look for file name and line number',
          'Google the exact error text',
          'Stack traces show the path to the error'
        ]
      },
      {
        step: 2,
        title: 'Isolate the Problem',
        description: 'Where exactly is it breaking?',
        tips: [
          'Comment out code until it works',
          'Add console.log statements',
          'Binary search: Comment out half, which half breaks?',
          'Simplify until the bug is obvious'
        ],
        codeExample: `// Add these to track what's happening
console.log('Step 1:', variable1);
console.log('Step 2:', variable2);
// See where the unexpected value appears`
      },
      {
        step: 3,
        title: 'Understand the Cause',
        description: 'WHY is it breaking?',
        tips: [
          'What did you expect to happen?',
          'What actually happened?',
          'What changed since it last worked?',
          'Check your assumptions'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Paste error + code, ask for explanation',
          warning: 'Explain your logic too - AI needs context'
        }
      },
      {
        step: 4,
        title: 'Use Debugging Tools',
        description: 'Beyond console.log',
        tips: [
          'Browser DevTools: Network, Console, Sources',
          'Breakpoints: Pause execution, inspect state',
          'VS Code debugger: Step through code',
          'React DevTools: Component state inspection'
        ]
      },
      {
        step: 5,
        title: 'Fix and Test',
        description: 'Actually solve the problem',
        tips: [
          'Fix the root cause, not the symptom',
          'Test the fix',
          'Check if fix broke anything else',
          'Document tricky bugs for future you'
        ]
      },
      {
        step: 6,
        title: 'Rubber Duck Debugging',
        description: 'Explain the problem out loud',
        tips: [
          'Explain code line by line',
          'To a rubber duck, colleague, or AI',
          'Often you\'ll find the bug while explaining',
          'This works surprisingly well'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Explain your code to it, ask it to find issues',
          warning: 'AI is great at spotting obvious errors, less so at logic bugs'
        }
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT', 'Cursor'],
      bestFor: ['Error explanation', 'Common bug patterns', 'Syntax errors', 'Stack trace analysis'],
      avoidFor: ['Logic bugs specific to your app', 'Performance issues', 'Intermittent bugs'],
      philosophy: 'AI is an excellent first responder for bugs. But the hardest bugs require understanding YOUR specific code.'
    },
    estimatedTime: 'Minutes to hours depending on complexity',
    skillsLearned: ['Systematic debugging', 'Tool usage', 'Problem decomposition']
  }),

  'learn-framework': (profile) => ({
    title: 'Learning a New Framework',
    steps: [
      {
        step: 1,
        title: 'Choose the Right Framework',
        description: 'Don\'t learn everything - choose wisely',
        tips: [
          'React: Most jobs, huge ecosystem',
          'Vue: Easier to learn, great docs',
          'Next.js: Full-stack React, growing fast',
          'Svelte: Simplest syntax, growing'
        ]
      },
      {
        step: 2,
        title: 'Follow Official Tutorial',
        description: 'Start with the source',
        tips: [
          'Official docs are usually best',
          'React: react.dev/learn',
          'Next.js: nextjs.org/learn',
          'Type every example - don\'t just read'
        ]
      },
      {
        step: 3,
        title: 'Understand the Mental Model',
        description: 'How does this framework think?',
        tips: [
          'React: Component-based, one-way data flow',
          'Next.js: File-based routing, SSR/SSG',
          'Understanding "why" helps "how" make sense',
          'Ask AI to explain core concepts'
        ],
        aiOption: {
          tool: 'Claude',
          howToUse: 'Ask it to explain concepts in simple terms',
          warning: 'AI info might be outdated - check docs for latest'
        }
      },
      {
        step: 4,
        title: 'Build a Small Project',
        description: 'Apply what you\'re learning',
        tips: [
          'Todo app (covers state, events, lists)',
          'Weather app (covers API calls)',
          'Blog (covers routing, data fetching)',
          'Build something YOU want to use'
        ]
      },
      {
        step: 5,
        title: 'Learn Incrementally',
        description: 'You don\'t need to know everything',
        tips: [
          'Core concepts first (components, state, props)',
          'Add complexity as needed',
          'Learn routing when you need multiple pages',
          'Learn state management when local state isn\'t enough'
        ]
      },
      {
        step: 6,
        title: 'Read Real Code',
        description: 'Learn from others',
        tips: [
          'Open source projects on GitHub',
          'Official example repos',
          'YouTube: Build-along videos',
          'Reading code is a skill - practice it'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'ChatGPT', 'Cursor'],
      bestFor: ['Concept explanation', 'Boilerplate generation', 'Error resolution'],
      avoidFor: ['Understanding architecture', 'Best practices (can be outdated)', 'Building without learning'],
      philosophy: 'AI can accelerate learning, but you still need to BUILD things yourself to truly understand.'
    },
    estimatedTime: '2-4 weeks for basics, 2-3 months for proficiency',
    skillsLearned: ['Framework patterns', 'Component architecture', 'State management'],
    prerequisites: ['JavaScript fundamentals']
  }),

  'use-ai-coding': (profile) => ({
    title: 'Using AI for Coding Effectively',
    steps: [
      {
        step: 1,
        title: 'Understand What AI Can/Can\'t Do',
        description: 'Set realistic expectations',
        tips: [
          'CAN: Boilerplate, common patterns, syntax, explanation',
          'CAN\'T: Understand your specific app, guarantee correctness, replace learning',
          'AI is autocomplete on steroids, not a junior developer',
          'You\'re still responsible for the code'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Tools',
        description: 'Different tools for different purposes',
        tips: [
          'Copilot: Best for inline completion while typing',
          'Cursor: Best for multi-file changes, chat with codebase',
          'Claude/ChatGPT: Best for explanation, debugging, planning',
          'v0: Best for UI component generation'
        ]
      },
      {
        step: 3,
        title: 'Write Good Prompts',
        description: 'Better input = better output',
        tips: [
          'Be specific about language, framework, versions',
          'Include relevant context',
          'Specify output format you want',
          'Give examples of what you\'re looking for'
        ],
        codeExample: `Good: "Write a React component using TypeScript that displays a 
list of users with name and email. Use Tailwind for styling. 
Include loading and error states."

Bad: "Make a user list"`
      },
      {
        step: 4,
        title: 'Review Everything',
        description: 'AI makes mistakes - you own the code',
        tips: [
          'Read generated code before using',
          'Understand what it does',
          'Check for security issues',
          'Test it - AI code often has bugs'
        ]
      },
      {
        step: 5,
        title: 'Use AI as a Learning Tool',
        description: 'Don\'t just copy - learn',
        tips: [
          'Ask AI to explain code it generates',
          'Ask "why this approach vs alternatives?"',
          'Use AI to learn new patterns',
          'Don\'t let AI be a crutch'
        ]
      },
      {
        step: 6,
        title: 'Know When NOT to Use AI',
        description: 'Sometimes AI slows you down',
        tips: [
          'Complex business logic you understand',
          'When learning fundamentals',
          'Security-critical code',
          'When you could write it faster yourself'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Copilot', 'Cursor', 'Claude', 'ChatGPT', 'v0'],
      bestFor: ['Everything in this guide'],
      avoidFor: ['Thinking for you'],
      philosophy: 'AI is a power tool. Power tools are dangerous without skill. Learn to code first, then accelerate with AI.',
      dangerZone: 'Developers who over-rely on AI without understanding code can\'t debug, can\'t adapt, can\'t grow.'
    },
    estimatedTime: 'Ongoing skill development',
    skillsLearned: ['Prompt engineering', 'Code review', 'AI tool selection']
  }),

  'freelance-dev': (profile) => ({
    title: 'Freelancing as a Developer',
    steps: [
      {
        step: 1,
        title: 'Build Your Portfolio',
        description: 'Show what you can do',
        tips: [
          '3-5 quality projects > 10 mediocre ones',
          'Include case studies: Problem → Process → Result',
          'Real projects > tutorial clones',
          'Your portfolio website IS a portfolio piece'
        ]
      },
      {
        step: 2,
        title: 'Define Your Services',
        description: 'What specifically do you offer?',
        tips: [
          'Landing pages for small businesses',
          'WordPress customization',
          'React web apps',
          'Shopify/ecommerce',
          'Specialize - don\'t be "I do everything"'
        ]
      },
      {
        step: 3,
        title: 'Price Your Work',
        description: 'Getting paid what you\'re worth',
        tips: [
          'Hourly OR project-based, not both',
          'Project-based is often better (scope clearly)',
          'Research market rates in your area',
          'Start lower to get testimonials, raise over time'
        ]
      },
      {
        step: 4,
        title: 'Find Clients',
        description: 'Where the work comes from',
        tips: [
          'Personal network first (tell everyone)',
          'Local businesses with bad websites',
          'Upwork/Fiverr (competitive but possible)',
          'Referrals from happy clients (best source)'
        ]
      },
      {
        step: 5,
        title: 'Manage Projects',
        description: 'Professional process',
        tips: [
          'Clear contracts before starting',
          'Scope creep kills projects - document everything',
          '50% upfront, 50% on completion',
          'Regular updates and demos'
        ]
      },
      {
        step: 6,
        title: 'Deliver and Get Testimonials',
        description: 'Finish strong',
        tips: [
          'Over-deliver on first projects',
          'Ask for testimonials and referrals',
          'Offer maintenance packages',
          'Stay in touch for repeat business'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Draft proposals, contracts, client emails',
          warning: 'Personalize everything - generic proposals don\'t win'
        }
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'Copilot', 'Cursor'],
      bestFor: ['Writing proposals', 'Code speed', 'Client communication'],
      avoidFor: ['Replacing understanding of client needs', 'Estimating time (AI doesn\'t know your speed)'],
      philosophy: 'AI can make you 2-3x faster. Faster delivery = more projects = more income. But client relationships are human.'
    },
    estimatedTime: '3-6 months to first consistent income',
    skillsLearned: ['Client management', 'Pricing', 'Business development'],
    prerequisites: ['Can build websites/apps reliably']
  }),

  'build-portfolio': (profile) => ({
    title: 'Building Your Developer Portfolio',
    steps: [
      {
        step: 1,
        title: 'Plan Your Content',
        description: 'What should your portfolio include?',
        tips: [
          'Hero section: Who are you, what you do',
          'Projects: 3-5 best work with case studies',
          'Skills: Technologies you know',
          'Contact: How to reach you',
          'Blog (optional): Shows you think'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Platform',
        description: 'How to build it',
        tips: [
          'Code it yourself (shows skills)',
          'Next.js + Vercel (free, fast)',
          'Templates: Fine if customized heavily',
          'Your portfolio IS a project - treat it as such'
        ],
        aiOption: {
          tool: 'v0 / Framer',
          howToUse: 'Generate initial design, then code it yourself',
          warning: 'A portfolio you can\'t explain won\'t impress interviewers'
        }
      },
      {
        step: 3,
        title: 'Write Case Studies',
        description: 'Show your process, not just results',
        tips: [
          'Problem: What challenge were you solving?',
          'Process: How did you approach it?',
          'Solution: What did you build?',
          'Results: What was the impact?',
          'Include screenshots/demos'
        ]
      },
      {
        step: 4,
        title: 'Showcase Your Code',
        description: 'Let people see how you write',
        tips: [
          'GitHub profile with pinned repos',
          'Clean, well-documented code',
          'Meaningful commit messages',
          'README files for each project'
        ]
      },
      {
        step: 5,
        title: 'Design for Impact',
        description: 'First impressions matter',
        tips: [
          'Clean, modern design',
          'Fast loading (optimize images)',
          'Mobile-responsive',
          'Clear typography and hierarchy'
        ]
      },
      {
        step: 6,
        title: 'Keep It Updated',
        description: 'Living document',
        tips: [
          'Add new projects regularly',
          'Remove weaker projects as you improve',
          'Keep skills current',
          'Check all links work'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Claude', 'v0', 'Cursor'],
      bestFor: ['Writing case studies', 'UI inspiration', 'Code generation'],
      avoidFor: ['Entire portfolio (show YOUR skills)', 'Projects you can\'t explain'],
      philosophy: 'Your portfolio demonstrates YOUR abilities. If AI built it, what are you demonstrating?'
    },
    estimatedTime: '1-2 weeks',
    skillsLearned: ['Self-presentation', 'Design', 'Writing']
  }),

  'nocode-tools': (profile) => ({
    title: 'Building with No-Code Tools',
    steps: [
      {
        step: 1,
        title: 'Understand When No-Code Makes Sense',
        description: 'Right tool for the job',
        tips: [
          'YES: Landing pages, portfolios, simple sites',
          'YES: MVPs to test ideas quickly',
          'MAYBE: Simple web apps, internal tools',
          'NO: Complex apps, anything requiring custom logic'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Tool',
        description: 'Different tools for different needs',
        tips: [
          'Framer: Best for landing pages, portfolios',
          'Webflow: Best for marketing sites, CMS',
          'Bubble: Best for web apps, MVPs',
          'Softr/Glide: Best for database-driven apps'
        ]
      },
      {
        step: 3,
        title: 'Learn the Platform',
        description: 'Each has its own logic',
        tips: [
          'Follow official tutorials first',
          'Understand the data model',
          'Learn keyboard shortcuts',
          'Join community (forums, Discord)'
        ],
        aiOption: {
          tool: 'Framer AI',
          howToUse: 'Generate initial layouts, then customize',
          warning: 'AI-generated sites look generic - personalize heavily'
        }
      },
      {
        step: 4,
        title: 'Design With Intent',
        description: 'No-code doesn\'t mean no skill',
        tips: [
          'Plan your layout before building',
          'Use design systems (consistent spacing, colors)',
          'Mobile-first design',
          'Optimize for conversion if it\'s a landing page'
        ]
      },
      {
        step: 5,
        title: 'Know the Limitations',
        description: 'What you\'re giving up',
        tips: [
          'Less control than custom code',
          'Platform lock-in',
          'Costs can add up',
          'Performance may not be optimal',
          'Some things are impossible without code'
        ]
      },
      {
        step: 6,
        title: 'Hybrid Approach',
        description: 'Combine no-code with code when needed',
        tips: [
          'Webflow + custom JS for interactivity',
          'Framer components in code',
          'No-code for frontend, coded backend',
          'Use no-code for speed, add code for power'
        ]
      }
    ],
    aiIntegration: {
      recommended: true,
      tools: ['Framer AI', 'Webflow AI', 'Claude'],
      bestFor: ['Initial layouts', 'Copy generation', 'Image generation'],
      avoidFor: ['Replacing learning the tool', 'Complex logic'],
      philosophy: 'No-code is powerful for speed. Learning to code gives you unlimited power. Know when each is appropriate.'
    },
    estimatedTime: '1-2 weeks to proficiency',
    skillsLearned: ['Visual development', 'Design systems', 'Tool-specific skills']
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface CodeMentorROVProps {
  profile: TechCreatorProfile;
  onToolClick?: (tool: TechToolRecommendation) => void;
}

export const CodeMentorROV: React.FC<CodeMentorROVProps> = ({
  profile,
  onToolClick
}) => {
  const [selectedTask, setSelectedTask] = useState<TechTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return TECH_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const recommendedTools = useMemo(() => {
    return TECH_TOOLS.filter(tool => {
      if (profile.skillLevel === 'beginner') {
        return tool.learningCurve === 'easy';
      }
      return true;
    });
  }, [profile.skillLevel]);
  
  const tasks: { id: TechTask; label: string; icon: string }[] = [
    { id: 'learn-coding', label: 'Learn to Code', icon: '📚' },
    { id: 'build-website', label: 'Build Website', icon: '🌐' },
    { id: 'build-app', label: 'Build Web App', icon: '⚙️' },
    { id: 'debug-code', label: 'Debug Code', icon: '🐛' },
    { id: 'learn-framework', label: 'Learn Framework', icon: '🧩' },
    { id: 'use-ai-coding', label: 'Use AI for Coding', icon: '🤖' },
    { id: 'freelance-dev', label: 'Freelance Dev', icon: '💼' },
    { id: 'build-portfolio', label: 'Build Portfolio', icon: '📁' },
    { id: 'nocode-tools', label: 'No-Code Tools', icon: '🔧' }
  ];
  
  return (
    <div className="code-mentor-rov">
      <div className="code-mentor-rov__header">
        <div className="code-mentor-rov__avatar">💻</div>
        <div className="code-mentor-rov__info">
          <h2>Code Mentor</h2>
          <span>TECHreneurs Development Guide</span>
        </div>
      </div>
      
      <div className="code-mentor-rov__profile">
        <p>
          Hey {profile.name}! You've completed <strong>{profile.projectsCompleted} projects</strong>
          {profile.languages.length > 0 && ` and know ${profile.languages.join(', ')}`}.
          {profile.projectsCompleted < 5 && ' Focus on building - every project teaches you more.'}
          {profile.projectsCompleted >= 5 && ' You\'re building real skills. Keep shipping!'}
        </p>
        <p className="philosophy">
          💡 AI can write code, but it can't understand YOUR problem. Learn the fundamentals, then accelerate with AI.
        </p>
      </div>
      
      <div className="code-mentor-rov__tasks">
        <h3>What are you working on?</h3>
        <div className="code-mentor-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`code-mentor-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="code-mentor-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="code-mentor-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          {guide.prerequisites && (
            <div className="code-mentor-rov__prereqs">
              <strong>Prerequisites:</strong> {guide.prerequisites.join(', ')}
            </div>
          )}
          
          <div className="code-mentor-rov__ai-note">
            {guide.aiIntegration.recommended ? (
              <div className="ai-yes">
                <p>✅ AI can accelerate this!</p>
                <p><strong>Best for:</strong> {guide.aiIntegration.bestFor.join(', ')}</p>
                <p><strong>Not for:</strong> {guide.aiIntegration.avoidFor.join(', ')}</p>
              </div>
            ) : (
              <div className="ai-no">
                <p>⚠️ Learn this without AI first.</p>
                <p>{guide.aiIntegration.philosophy}</p>
              </div>
            )}
            {guide.aiIntegration.dangerZone && (
              <p className="danger-zone">🚨 {guide.aiIntegration.dangerZone}</p>
            )}
          </div>
          
          <div className="code-mentor-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="code-mentor-rov__step">
                <div className="code-mentor-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.codeExample && (
                  <pre className="code-example">
                    <code>{step.codeExample}</code>
                  </pre>
                )}
                {step.resources && (
                  <div className="resources">
                    <strong>📎 Resources:</strong>
                    <ul>
                      {step.resources.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.aiOption && (
                  <div className="code-mentor-rov__ai-option">
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
      
      <div className="code-mentor-rov__tools">
        <h3>Recommended Tools</h3>
        <div className="code-mentor-rov__tool-list">
          {recommendedTools.slice(0, 8).map(tool => (
            <button
              key={tool.name}
              className="code-mentor-rov__tool"
              onClick={() => onToolClick?.(tool)}
            >
              <span className="tool-name">{tool.name}</span>
              <span className={`tool-type type-${tool.type}`}>{tool.type}</span>
              <span className={`tool-cost cost-${tool.cost}`}>{tool.cost}</span>
              <span className="tool-purpose">{tool.purpose}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="code-mentor-rov__footer">
        <p>
          💚 The ability to build software is a superpower.
          AI makes you faster, but understanding makes you powerful.
          Don't shortcut the learning.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export {
  TECH_TOOLS,
  TECH_GUIDES
};

export default CodeMentorROV;