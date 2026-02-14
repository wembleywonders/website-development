/**
 * PORTFOLIO BUILDER ROV
 * 
 * Helps creators build and maintain their portfolio.
 * Your portfolio is your silent salesperson.
 * 
 * Philosophy: Show your best work, tell the story,
 * make it easy to hire you.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface PortfolioProfile {
  id: string;
  name: string;
  programme: string;
  currentProjects: number;
  hasWebsite: boolean;
  platforms: string[];
  targetAudience: string;
}

export type PortfolioTask = 
  | 'select-work'
  | 'write-case-study'
  | 'choose-platform'
  | 'structure-portfolio'
  | 'create-about'
  | 'optimize-seo'
  | 'get-feedback'
  | 'maintain-update';

export interface PortfolioGuide {
  title: string;
  steps: PortfolioStep[];
  templates?: PortfolioTemplate[];
  estimatedTime: string;
  skillsLearned: string[];
}

export interface PortfolioStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  checklist?: string[];
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface PortfolioTemplate {
  name: string;
  structure: string[];
  usage: string;
}

// ============================================================
// PORTFOLIO GUIDES
// ============================================================

const PORTFOLIO_GUIDES: Record<PortfolioTask, (profile: PortfolioProfile) => PortfolioGuide> = {
  'select-work': (profile) => ({
    title: 'Selecting Your Best Work',
    steps: [
      {
        step: 1,
        title: 'Quality Over Quantity',
        description: '5 great pieces beat 20 mediocre ones',
        tips: [
          '5-10 projects maximum',
          'Only show work you\'re proud of',
          'Only show work you want MORE of',
          'If you wouldn\'t show it to your dream client, don\'t include it'
        ]
      },
      {
        step: 2,
        title: 'Show Range Within Focus',
        description: 'Variety, but not randomness',
        tips: [
          'Different types of projects (if relevant)',
          'Different industries/clients',
          'But all within your specialty',
          'Avoid "I do everything" energy'
        ]
      },
      {
        step: 3,
        title: 'Lead with Your Best',
        description: 'First impression is everything',
        tips: [
          'Put your strongest 2-3 pieces first',
          'People often don\'t scroll past 3',
          'Most recent ≠ best (sometimes old work is better)',
          'Reorder based on what\'s working'
        ]
      },
      {
        step: 4,
        title: 'Include Context',
        description: 'Work without context is weak',
        tips: [
          'Who was the client?',
          'What was the challenge?',
          'What was your role?',
          'What were the results?'
        ],
        checklist: [
          'Is this my best work?',
          'Would I want more projects like this?',
          'Can I explain the context clearly?',
          'Does it show relevant skills?',
          'Is it recent enough to reflect my current abilities?'
        ]
      }
    ],
    estimatedTime: '2-3 hours',
    skillsLearned: ['Curation', 'Self-assessment']
  }),

  'write-case-study': (profile) => ({
    title: 'Writing Case Studies',
    steps: [
      {
        step: 1,
        title: 'Follow the Problem-Process-Result Framework',
        description: 'The story structure clients want',
        tips: [
          'Problem: What challenge did the client face?',
          'Process: How did you approach solving it?',
          'Result: What was the outcome?',
          'This is the narrative that sells'
        ]
      },
      {
        step: 2,
        title: 'Start with the Challenge',
        description: 'Hook them with the problem',
        tips: [
          'What was broken/missing/needed?',
          'What was at stake for the client?',
          'Make it relatable to your target audience',
          'Clients see themselves in the problem'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Help structure your story, refine language',
          warning: 'AI can polish, but the story must be authentically yours'
        }
      },
      {
        step: 3,
        title: 'Show Your Process',
        description: 'This is where you demonstrate expertise',
        tips: [
          'What was your approach?',
          'Include sketches, drafts, iterations',
          'Explain your thinking',
          'This builds trust and justifies your price'
        ]
      },
      {
        step: 4,
        title: 'Highlight Results',
        description: 'Quantify impact when possible',
        tips: [
          'Numbers are powerful (%, £, time saved)',
          'If no numbers, use qualitative outcomes',
          'Client testimonial if available',
          'What changed for the better?'
        ]
      },
      {
        step: 5,
        title: 'Keep It Scannable',
        description: 'People skim before they read',
        tips: [
          'Clear headings for each section',
          'Bullet points for key info',
          'Strong visuals throughout',
          'Summary at top for skimmers'
        ]
      }
    ],
    templates: [
      {
        name: 'Case Study Template',
        structure: [
          'Project Title & Client Name',
          'Quick Summary (2-3 sentences)',
          'The Challenge',
          'The Approach',
          'Key Decisions & Process',
          'The Solution (visuals)',
          'The Results',
          'Client Testimonial (optional)',
          'Credits & Timeline'
        ],
        usage: 'Portfolio website, PDF proposals'
      }
    ],
    estimatedTime: '2-4 hours per case study',
    skillsLearned: ['Storytelling', 'Documentation', 'Client communication']
  }),

  'choose-platform': (profile) => ({
    title: 'Choosing Your Portfolio Platform',
    steps: [
      {
        step: 1,
        title: 'Consider Your Needs',
        description: 'Match platform to purpose',
        tips: [
          'How technical are you?',
          'Do you need custom design?',
          'What\'s your budget?',
          'Do you need e-commerce?',
          'How often will you update?'
        ]
      },
      {
        step: 2,
        title: 'Free & Easy Options',
        description: 'Great for starting out',
        tips: [
          'Notion: Free, flexible, easy to update',
          'Carrd: Simple one-pager, very cheap',
          'Behance: Industry standard for creatives',
          'LinkedIn: Already has your network'
        ]
      },
      {
        step: 3,
        title: 'Professional Options',
        description: 'More control, more investment',
        tips: [
          'Squarespace: Beautiful templates, £12-18/month',
          'Webflow: Design freedom, learning curve',
          'Framer: Modern, AI features, design focus',
          'WordPress: Maximum flexibility, more setup'
        ]
      },
      {
        step: 4,
        title: 'Custom Website',
        description: 'Maximum control (for devs)',
        tips: [
          'Next.js + Vercel: Free hosting, full control',
          'Shows coding skills (for TECHreneurs)',
          'More work to maintain',
          'Best for technical portfolios'
        ]
      },
      {
        step: 5,
        title: 'Start Simple, Upgrade Later',
        description: 'Done is better than perfect',
        tips: [
          'A Notion page > no portfolio',
          'You can always migrate later',
          'Focus on content first, platform second',
          'Your work matters more than the platform'
        ]
      }
    ],
    estimatedTime: '1-2 hours research, 1-8 hours setup',
    skillsLearned: ['Platform evaluation', 'Website basics']
  }),

  'structure-portfolio': (profile) => ({
    title: 'Structuring Your Portfolio',
    steps: [
      {
        step: 1,
        title: 'Essential Pages/Sections',
        description: 'What every portfolio needs',
        tips: [
          'Home/Hero: Who you are, what you do',
          'Work/Projects: Your portfolio pieces',
          'About: Your story and credibility',
          'Contact: How to hire you',
          'That\'s it. Don\'t overcomplicate.'
        ]
      },
      {
        step: 2,
        title: 'Hero Section That Converts',
        description: 'You have 3 seconds',
        tips: [
          'Clear headline: What you do for who',
          'Subheadline: Credibility or unique approach',
          'One strong visual or featured project',
          'Clear CTA: View Work / Hire Me'
        ]
      },
      {
        step: 3,
        title: 'Work Section Organization',
        description: 'Make it easy to browse',
        tips: [
          'Thumbnail grid (standard, effective)',
          'Featured project first',
          'Filter by category if you have variety',
          'Click to open full case study'
        ]
      },
      {
        step: 4,
        title: 'About Section',
        description: 'Be a person, not a brand',
        tips: [
          'Photo (professional but human)',
          'Story: Why you do this',
          'Credibility: WW training, experience',
          'Personal touch: Make yourself memorable'
        ]
      },
      {
        step: 5,
        title: 'Contact Section',
        description: 'Make it stupid easy to reach you',
        tips: [
          'Simple contact form',
          'Email address (visible)',
          'Social links',
          'Response time expectation',
          'Don\'t make them hunt for how to hire you'
        ]
      }
    ],
    templates: [
      {
        name: 'Simple Portfolio Structure',
        structure: [
          '1. Hero (name, tagline, CTA)',
          '2. Featured Work (2-3 best projects)',
          '3. All Work (grid of 5-10 projects)',
          '4. About (photo, story, credentials)',
          '5. Contact (form, email, social)'
        ],
        usage: 'One-page portfolio'
      },
      {
        name: 'Multi-Page Structure',
        structure: [
          'Home: Hero + featured work + CTA',
          'Work: All projects with filters',
          'Project Pages: Individual case studies',
          'About: Full story + process',
          'Contact: Form + FAQ + booking'
        ],
        usage: 'Full website portfolio'
      }
    ],
    estimatedTime: '3-8 hours',
    skillsLearned: ['Information architecture', 'UX basics']
  }),

  'create-about': (profile) => ({
    title: 'Creating Your About Page',
    steps: [
      {
        step: 1,
        title: 'Lead with Relevance',
        description: 'What matters to your potential clients',
        tips: [
          'Not your whole life story',
          'Start with what you do and for who',
          'Then why you\'re good at it',
          'Then personal details that make you memorable'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Generate structure and variations',
          warning: 'Your about page must sound like YOU, not generic AI'
        }
      },
      {
        step: 2,
        title: 'Build Credibility',
        description: 'Why should they trust you?',
        tips: [
          'WW programme completion',
          'Years of experience / projects completed',
          'Specific results achieved',
          'Relevant background that adds context'
        ]
      },
      {
        step: 3,
        title: 'Share Your "Why"',
        description: 'Passion is magnetic',
        tips: [
          'Why do you do this work?',
          'What drives you?',
          'What do you believe about your craft?',
          'People connect with purpose'
        ]
      },
      {
        step: 4,
        title: 'Add Personal Touches',
        description: 'Be memorable',
        tips: [
          'One or two personal facts',
          'Something unexpected',
          'What you do outside work',
          'Makes you human, not a faceless brand'
        ]
      },
      {
        step: 5,
        title: 'Include a Good Photo',
        description: 'People want to see who they\'re hiring',
        tips: [
          'Professional but approachable',
          'Well-lit, clear face',
          'Matches your brand energy',
          'Smile - you\'re inviting them in'
        ]
      },
      {
        step: 6,
        title: 'End with a CTA',
        description: 'Don\'t leave them hanging',
        tips: [
          '"Ready to work together? Get in touch."',
          'Link to contact page/form',
          'Or "View my work" if they haven\'t yet',
          'Always tell them what to do next'
        ]
      }
    ],
    estimatedTime: '2-3 hours',
    skillsLearned: ['Personal branding', 'Copywriting']
  }),

  'optimize-seo': (profile) => ({
    title: 'Portfolio SEO Basics',
    steps: [
      {
        step: 1,
        title: 'Set Realistic Expectations',
        description: 'SEO is a long game',
        tips: [
          'Portfolio SEO isn\'t like blog SEO',
          'You won\'t rank for "graphic designer"',
          'Focus on your name + specific services',
          'Most portfolio traffic is direct or referral'
        ]
      },
      {
        step: 2,
        title: 'Nail the Basics',
        description: 'Foundational SEO',
        tips: [
          'Page titles: "Your Name | Service | Location"',
          'Meta descriptions: Brief summary + CTA',
          'Image alt text: Describe every image',
          'Fast loading: Compress images'
        ]
      },
      {
        step: 3,
        title: 'Target Your Name',
        description: 'Own your search results',
        tips: [
          'When someone Googles you, your portfolio should show',
          'Use your name in title, headings, content',
          'Link to your portfolio from social profiles',
          'This is the SEO that actually matters for portfolios'
        ]
      },
      {
        step: 4,
        title: 'Local SEO (If Relevant)',
        description: 'For local service providers',
        tips: [
          'Include your city/area',
          '"Designer in Wembley" type keywords',
          'Google Business Profile if appropriate',
          'Local directories'
        ]
      },
      {
        step: 5,
        title: 'Focus on Getting Found Other Ways',
        description: 'SEO isn\'t everything',
        tips: [
          'Social media profile links',
          'Behance/Dribbble/niche platforms',
          'Guest posts and features',
          'Client referrals',
          'Direct outreach'
        ]
      }
    ],
    estimatedTime: '2-3 hours one-time setup',
    skillsLearned: ['Basic SEO', 'Discoverability']
  }),

  'get-feedback': (profile) => ({
    title: 'Getting Portfolio Feedback',
    steps: [
      {
        step: 1,
        title: 'Who to Ask',
        description: 'The right feedback sources',
        tips: [
          'Fellow WW creators (they understand)',
          'People in your target audience',
          'Mentors or more experienced creators',
          'Not: Random friends who aren\'t your audience'
        ]
      },
      {
        step: 2,
        title: 'Ask Specific Questions',
        description: 'Vague asks get vague feedback',
        tips: [
          '"Is it clear what I do within 5 seconds?"',
          '"Would you hire me based on this?"',
          '"What\'s confusing?"',
          '"What\'s missing?"'
        ]
      },
      {
        step: 3,
        title: 'Watch, Don\'t Just Ask',
        description: 'Observe someone using your portfolio',
        tips: [
          'Watch someone navigate it',
          'Where do they click? Where do they hesitate?',
          'What do they say out loud?',
          'Screen share review is gold'
        ]
      },
      {
        step: 4,
        title: 'Look for Patterns',
        description: 'One opinion ≠ truth',
        tips: [
          'Collect 3-5 pieces of feedback',
          'Look for common themes',
          'Don\'t change everything based on one person',
          'Your audience\'s opinion matters most'
        ]
      },
      {
        step: 5,
        title: 'Iterate and Improve',
        description: 'Portfolios are never done',
        tips: [
          'Make changes based on feedback',
          'Test again',
          'Continuous improvement',
          'Update quarterly at minimum'
        ]
      }
    ],
    estimatedTime: '1-2 hours per feedback round',
    skillsLearned: ['Receiving feedback', 'Iteration']
  }),

  'maintain-update': (profile) => ({
    title: 'Maintaining Your Portfolio',
    steps: [
      {
        step: 1,
        title: 'Set a Review Schedule',
        description: 'Don\'t let it go stale',
        tips: [
          'Monthly: Quick check, fix broken links',
          'Quarterly: Add new work, remove weak pieces',
          'Yearly: Redesign if needed',
          'Put it in your calendar'
        ]
      },
      {
        step: 2,
        title: 'Add New Work Regularly',
        description: 'Fresh content shows you\'re active',
        tips: [
          'Add projects as you complete them',
          'Document while working (easier than recreating later)',
          'Fresh work > old work (usually)',
          'Keep it current'
        ]
      },
      {
        step: 3,
        title: 'Remove Weak Work',
        description: 'Quality over quantity',
        tips: [
          'As you improve, old work looks worse',
          'Remove anything you\'re not proud of',
          'Remove work that doesn\'t represent what you want to do',
          'Your worst piece sets the floor'
        ]
      },
      {
        step: 4,
        title: 'Update Bio and About',
        description: 'Keep your story current',
        tips: [
          'New skills? Add them',
          'New achievements? Include them',
          'Changed focus? Update messaging',
          'Keep it accurate'
        ]
      },
      {
        step: 5,
        title: 'Check Technical Health',
        description: 'Make sure it works',
        tips: [
          'Test all links',
          'Check loading speed',
          'View on mobile',
          'Test contact form',
          'Update platform/plugins if needed'
        ],
        checklist: [
          'All links working?',
          'Contact form functioning?',
          'Images loading properly?',
          'Mobile looks good?',
          'Bio/about still accurate?',
          'Work samples current?'
        ]
      }
    ],
    estimatedTime: '30 minutes monthly, 2-3 hours quarterly',
    skillsLearned: ['Maintenance discipline', 'Self-assessment']
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface PortfolioBuilderROVProps {
  profile: PortfolioProfile;
}

export const PortfolioBuilderROV: React.FC<PortfolioBuilderROVProps> = ({
  profile
}) => {
  const [selectedTask, setSelectedTask] = useState<PortfolioTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return PORTFOLIO_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const tasks: { id: PortfolioTask; label: string; icon: string }[] = [
    { id: 'select-work', label: 'Select Work', icon: '✨' },
    { id: 'write-case-study', label: 'Write Case Study', icon: '📝' },
    { id: 'choose-platform', label: 'Choose Platform', icon: '🌐' },
    { id: 'structure-portfolio', label: 'Structure It', icon: '🏗️' },
    { id: 'create-about', label: 'About Page', icon: '👤' },
    { id: 'optimize-seo', label: 'Basic SEO', icon: '🔍' },
    { id: 'get-feedback', label: 'Get Feedback', icon: '💬' },
    { id: 'maintain-update', label: 'Maintain', icon: '🔄' }
  ];
  
  return (
    <div className="portfolio-builder-rov">
      <div className="portfolio-builder-rov__header">
        <div className="portfolio-builder-rov__avatar">📁</div>
        <div className="portfolio-builder-rov__info">
          <h2>Portfolio Builder</h2>
          <span>Showcase Your Best Work</span>
        </div>
      </div>
      
      <div className="portfolio-builder-rov__profile">
        <p>
          Hey {profile.name}! You have <strong>{profile.currentProjects} projects</strong> to showcase
          {profile.hasWebsite ? ' and already have a website.' : ' but no website yet.'}
          {!profile.hasWebsite && ' Let\'s change that.'}
        </p>
        <p className="philosophy">
          💡 Your portfolio is your silent salesperson. It works 24/7, even when you're asleep.
        </p>
      </div>
      
      <div className="portfolio-builder-rov__tasks">
        <h3>What do you need help with?</h3>
        <div className="portfolio-builder-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`portfolio-builder-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="portfolio-builder-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="portfolio-builder-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          <div className="portfolio-builder-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="portfolio-builder-rov__step">
                <div className="portfolio-builder-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.checklist && (
                  <div className="checklist">
                    <strong>✅ Checklist:</strong>
                    <ul>
                      {step.checklist.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.aiOption && (
                  <div className="portfolio-builder-rov__ai-option">
                    <strong>🤖 AI Option: {step.aiOption.tool}</strong>
                    <p>{step.aiOption.howToUse}</p>
                    <p className="warning">⚠️ {step.aiOption.warning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {guide.templates && guide.templates.length > 0 && (
            <div className="portfolio-builder-rov__templates">
              <h4>📋 Templates</h4>
              {guide.templates.map((template, i) => (
                <div key={i} className="portfolio-builder-rov__template">
                  <h5>{template.name}</h5>
                  <p className="usage">{template.usage}</p>
                  <ol>
                    {template.structure.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="portfolio-builder-rov__footer">
        <p>
          💚 A great portfolio doesn't require fancy tools. 
          It requires showing your best work with clear context.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { PORTFOLIO_GUIDES };
export default PortfolioBuilderROV;