/**
 * MARKETING COACH ROV
 * 
 * Helps creators promote their work and build audience.
 * Practical marketing guidance for the Forgotten 60%.
 * 
 * Philosophy: Marketing is connecting your work with people who need it.
 * It's not sleazy - it's service.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface MarketingProfile {
  id: string;
  name: string;
  programme: string;
  productType: 'product' | 'service' | 'both';
  currentFollowers: number;
  salesCount: number;
  hasWebsite: boolean;
  socialPlatforms: string[];
  marketingBudget: 'zero' | 'minimal' | 'some';
}

export type MarketingTask = 
  | 'define-audience'
  | 'create-offer'
  | 'write-bio'
  | 'social-strategy'
  | 'first-customers'
  | 'testimonials'
  | 'content-ideas'
  | 'zero-budget'
  | 'email-list';

export interface MarketingGuide {
  title: string;
  steps: MarketingStep[];
  templates?: MarketingTemplate[];
  estimatedTime: string;
  skillsLearned: string[];
  budgetRequired: 'zero' | 'minimal' | 'some';
}

export interface MarketingStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  examples?: string[];
  template?: string;
  aiOption?: {
    tool: string;
    howToUse: string;
    warning: string;
  };
}

export interface MarketingTemplate {
  name: string;
  template: string;
  usage: string;
}

// ============================================================
// MARKETING GUIDES
// ============================================================

const MARKETING_GUIDES: Record<MarketingTask, (profile: MarketingProfile) => MarketingGuide> = {
  'define-audience': (profile) => ({
    title: 'Defining Your Target Audience',
    steps: [
      {
        step: 1,
        title: 'Start with Who You Can Help',
        description: 'Your audience is people with a problem you can solve',
        tips: [
          'Who has the problem your work solves?',
          'Who do you understand deeply?',
          'Who can afford what you offer?',
          'Specific > general (not "everyone")'
        ],
        examples: [
          'Beat maker → Small YouTube creators who need affordable custom beats',
          'Designer → Local small businesses without a brand identity',
          'Writer → Busy professionals who need LinkedIn content'
        ]
      },
      {
        step: 2,
        title: 'Create One Ideal Customer',
        description: 'Give them a name and a story',
        tips: [
          'Age, location, occupation',
          'What frustrates them?',
          'What do they want to achieve?',
          'Where do they hang out online?',
          'What would make them buy from you?'
        ],
        template: `My ideal customer is [NAME], a [AGE]-year-old [OCCUPATION] in [LOCATION].
They struggle with [PROBLEM].
They want to [GOAL].
They spend time on [PLATFORMS].
They would buy from me because [REASON].`
      },
      {
        step: 3,
        title: 'Validate Your Assumptions',
        description: 'Talk to real people',
        tips: [
          'Find 5 people who fit your description',
          'Ask them about their problems',
          'Don\'t pitch - just listen',
          'Adjust your understanding based on reality'
        ]
      },
      {
        step: 4,
        title: 'Go Narrow First',
        description: 'Dominate a niche before expanding',
        tips: [
          'Being the best for 100 people > mediocre for 10,000',
          'Niche reputation spreads',
          'You can always expand later',
          '"I serve [specific group]" is memorable'
        ]
      }
    ],
    estimatedTime: '2-4 hours',
    skillsLearned: ['Customer research', 'Positioning', 'Niche selection'],
    budgetRequired: 'zero'
  }),

  'create-offer': (profile) => ({
    title: 'Creating an Irresistible Offer',
    steps: [
      {
        step: 1,
        title: 'Lead with Transformation',
        description: 'People buy outcomes, not products',
        tips: [
          'Before → After (what changes for them?)',
          'Pain → Relief (what problem goes away?)',
          'Features tell, benefits sell',
          'How will they FEEL after?'
        ],
        examples: [
          'Not: "5-track beat pack" → "Launch your music career with professional beats"',
          'Not: "Logo design" → "Look as professional as your bigger competitors"',
          'Not: "Video editing" → "Get your content out without the editing headache"'
        ]
      },
      {
        step: 2,
        title: 'Stack the Value',
        description: 'Make the deal feel like a no-brainer',
        tips: [
          'Main deliverable + bonuses',
          'List everything they get',
          'Calculate the real value',
          'Make price feel like a bargain'
        ],
        template: `What you get:
✓ [Main deliverable] (value: £X)
✓ [Bonus 1] (value: £X)
✓ [Bonus 2] (value: £X)
✓ [Support/guarantee]

Total value: £XXX
Your investment: £XX`
      },
      {
        step: 3,
        title: 'Remove the Risk',
        description: 'Make it safe to say yes',
        tips: [
          'Money-back guarantee if possible',
          'Free revision rounds',
          'Payment plans for big purchases',
          '"I\'ll work until you\'re happy"'
        ]
      },
      {
        step: 4,
        title: 'Create Urgency (Honestly)',
        description: 'Give them a reason to act now',
        tips: [
          'Limited spots (if true)',
          'Price increase coming (if true)',
          'Seasonal relevance',
          'Don\'t fake scarcity - it destroys trust'
        ]
      }
    ],
    templates: [
      {
        name: 'Service Offer',
        template: `[TRANSFORMATION HEADLINE]

Are you [PAIN POINT]?

I help [AUDIENCE] get [RESULT] without [COMMON OBSTACLE].

What you get:
• [Deliverable 1]
• [Deliverable 2]
• [Bonus]

Investment: £[PRICE]

[RISK REVERSAL]

[CALL TO ACTION]`,
        usage: 'Service pages, proposals'
      }
    ],
    estimatedTime: '2-3 hours',
    skillsLearned: ['Copywriting', 'Value stacking', 'Offer design'],
    budgetRequired: 'zero'
  }),

  'write-bio': (profile) => ({
    title: 'Writing Your Bio',
    steps: [
      {
        step: 1,
        title: 'Lead with What You Do for Others',
        description: 'Your bio is about THEM, not you',
        tips: [
          'Not: "I am a graphic designer"',
          'But: "I help small businesses look professional"',
          'Start with the transformation you provide',
          'Then add your credibility'
        ],
        examples: [
          'I help YouTubers sound professional with custom beats that match their vibe.',
          'I make small businesses look as polished as big brands.',
          'I turn your messy ideas into clear, engaging content.'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Generate variations, then make it sound like YOU',
          warning: 'AI bios sound generic. Add your personality.'
        }
      },
      {
        step: 2,
        title: 'Add Credibility',
        description: 'Why should they trust you?',
        tips: [
          'WW programme completion',
          'Number of projects/clients',
          'Specific results achieved',
          'Relevant background'
        ],
        template: `[What I do for you]

[Credibility: WW trained / X clients / specific result]

[Personal touch: why I do this]`
      },
      {
        step: 3,
        title: 'End with Personality',
        description: 'Be memorable',
        tips: [
          'One personal detail',
          'Something that makes you human',
          'What you do when not working',
          'Keep it brief'
        ]
      },
      {
        step: 4,
        title: 'Create Versions for Different Platforms',
        description: 'Adapt length and tone',
        tips: [
          'Twitter/X: 160 chars max',
          'Instagram: 150 chars bio, more in highlights',
          'LinkedIn: Longer, more professional',
          'Website: Can be longest, most personal'
        ]
      }
    ],
    templates: [
      {
        name: 'Short Bio (Social)',
        template: `[What you do] for [who]. [Credibility]. [Personal touch].`,
        usage: 'Twitter, Instagram, TikTok'
      },
      {
        name: 'Medium Bio (LinkedIn)',
        template: `I help [audience] achieve [result].

After [credibility/background], I now focus on [what you do].

My approach: [unique method or philosophy].

When I'm not [working], you'll find me [personal detail].`,
        usage: 'LinkedIn, professional profiles'
      }
    ],
    estimatedTime: '1-2 hours',
    skillsLearned: ['Personal branding', 'Copywriting'],
    budgetRequired: 'zero'
  }),

  'social-strategy': (profile) => ({
    title: 'Social Media Strategy',
    steps: [
      {
        step: 1,
        title: 'Choose ONE Platform',
        description: 'Master one before expanding',
        tips: [
          'Where does your audience hang out?',
          'Which platform do you enjoy using?',
          'Instagram: Visual work, lifestyle',
          'TikTok: Short-form, younger audience',
          'LinkedIn: Professional services',
          'Twitter/X: Conversations, thought leadership'
        ]
      },
      {
        step: 2,
        title: 'Define Your Content Pillars',
        description: '3-4 topics you\'ll consistently cover',
        tips: [
          'Your expertise/craft',
          'Behind the scenes/process',
          'Results/testimonials',
          'Personal/relatable content',
          'Keep it focused - don\'t post random stuff'
        ],
        examples: [
          'Beat maker: Production tips, beat previews, artist features, studio life',
          'Designer: Design breakdowns, before/afters, tool tips, client wins'
        ]
      },
      {
        step: 3,
        title: 'Create a Posting Schedule',
        description: 'Consistency beats frequency',
        tips: [
          'Realistic schedule you can maintain',
          '3x/week is enough to start',
          'Same days, similar times',
          'Batch create content to stay ahead'
        ]
      },
      {
        step: 4,
        title: 'Engage More Than You Post',
        description: 'Social media is SOCIAL',
        tips: [
          'Comment on others\' posts',
          'Reply to every comment on yours',
          'DM people you admire (genuinely)',
          'Engagement brings visibility'
        ]
      },
      {
        step: 5,
        title: 'Call to Action on Every Post',
        description: 'Tell people what to do',
        tips: [
          'Follow for more...',
          'DM me "X" for...',
          'Link in bio',
          'Comment if you...',
          'Don\'t sell on every post, but always have a CTA'
        ]
      }
    ],
    estimatedTime: '2-3 hours planning, ongoing execution',
    skillsLearned: ['Content strategy', 'Platform optimization', 'Community building'],
    budgetRequired: 'zero'
  }),

  'first-customers': (profile) => ({
    title: 'Getting Your First Customers',
    steps: [
      {
        step: 1,
        title: 'Start with Your Network',
        description: 'People who already know and trust you',
        tips: [
          'Tell everyone what you\'re doing now',
          'Friends, family, colleagues, old classmates',
          'Not asking them to buy - asking them to spread the word',
          '"Do you know anyone who needs...?"'
        ]
      },
      {
        step: 2,
        title: 'Offer a "Launch Special"',
        description: 'Discount in exchange for feedback and testimonials',
        tips: [
          '50% off for first 3 clients',
          'In exchange for honest feedback',
          'And permission to use as testimonial',
          'Build your portfolio while getting paid'
        ],
        template: `Hey [NAME],

I'm launching my [SERVICE] and offering 50% off to my first 3 clients.

In return, I just ask for your honest feedback and permission to share your testimonial.

Would you be interested, or know anyone who might be?`
      },
      {
        step: 3,
        title: 'Go Where They Already Are',
        description: 'Don\'t wait for them to find you',
        tips: [
          'Facebook groups for your audience',
          'Reddit communities (be helpful, not salesy)',
          'Local business events',
          'Online communities in your niche'
        ]
      },
      {
        step: 4,
        title: 'Solve Problems in Public',
        description: 'Demonstrate expertise by helping',
        tips: [
          'Answer questions in communities',
          'Share helpful content freely',
          'People will ask about your services',
          'Be generous - it comes back'
        ]
      },
      {
        step: 5,
        title: 'Ask for Referrals',
        description: 'Every happy client can bring more',
        tips: [
          'After delivering good work: "Do you know anyone else who needs...?"',
          'Offer referral bonus if appropriate',
          'Make it easy to refer (give them exact words)',
          'Best customers come from referrals'
        ]
      }
    ],
    estimatedTime: '1-2 weeks focused effort',
    skillsLearned: ['Outreach', 'Networking', 'Sales basics'],
    budgetRequired: 'zero'
  }),

  'testimonials': (profile) => ({
    title: 'Getting & Using Testimonials',
    steps: [
      {
        step: 1,
        title: 'Ask at the Right Time',
        description: 'Strike when they\'re happiest',
        tips: [
          'Immediately after delivery when they\'re excited',
          'After they thank you or express satisfaction',
          'After they get results from your work',
          'Don\'t wait too long - emotions fade'
        ]
      },
      {
        step: 2,
        title: 'Make It Easy',
        description: 'Guide them with questions',
        tips: [
          'Don\'t ask "Can you write a testimonial?"',
          'Ask specific questions they can answer',
          'You can edit their answers into a testimonial',
          'Get permission to use with name/photo'
        ],
        template: `Thanks so much for your kind words!

Would you mind answering 2-3 quick questions? I'd love to share your experience:

1. What was your situation before we worked together?
2. How did working with me help?
3. What would you say to someone considering my service?

I'll put this together as a testimonial - totally okay if you want to review before I post!`
      },
      {
        step: 3,
        title: 'Specific > Generic',
        description: 'Details make testimonials believable',
        tips: [
          '"Great work!" = useless',
          '"Increased my views by 40% in 2 weeks" = powerful',
          'Before/after results',
          'Specific problems solved',
          'Numbers, timeline, outcomes'
        ]
      },
      {
        step: 4,
        title: 'Collect Multiple Formats',
        description: 'Different formats for different uses',
        tips: [
          'Written: Easiest, most common',
          'Video: Most powerful, harder to get',
          'Screenshot of message: Feels authentic',
          'Case study: Deep dive for portfolio'
        ]
      },
      {
        step: 5,
        title: 'Use Them Everywhere',
        description: 'Don\'t hide your social proof',
        tips: [
          'Website/portfolio',
          'Social media posts',
          'Proposals and pitches',
          'Email signatures',
          'Checkout pages'
        ]
      }
    ],
    estimatedTime: 'Ongoing (ask after every project)',
    skillsLearned: ['Social proof', 'Client communication'],
    budgetRequired: 'zero'
  }),

  'content-ideas': (profile) => ({
    title: 'Content Ideas That Attract Customers',
    steps: [
      {
        step: 1,
        title: 'Answer Questions Your Audience Asks',
        description: 'Educational content builds trust',
        tips: [
          'What do people ask you?',
          'What do beginners not understand?',
          'What mistakes do people make?',
          'Search Reddit/Quora for questions in your niche'
        ],
        aiOption: {
          tool: 'Claude / ChatGPT',
          howToUse: 'Generate question lists for your niche',
          warning: 'Filter for questions YOU can answer well'
        }
      },
      {
        step: 2,
        title: 'Show Your Process',
        description: 'Behind-the-scenes builds connection',
        tips: [
          'How you make what you make',
          'Before/during/after',
          'Mistakes and how you fix them',
          'Tools you use',
          'People love seeing the work behind the work'
        ]
      },
      {
        step: 3,
        title: 'Share Client Results',
        description: 'Show what\'s possible',
        tips: [
          'Before/after transformations',
          'Client testimonials and stories',
          'Case studies (problem → solution → result)',
          'Always get permission'
        ]
      },
      {
        step: 4,
        title: 'Give Away Your Best Stuff',
        description: 'Generosity attracts customers',
        tips: [
          'Free templates, tips, resources',
          'People think "If the free stuff is this good..."',
          'You can\'t give away your service (you still have to DO it)',
          'Being helpful builds reputation'
        ]
      },
      {
        step: 5,
        title: 'Personal Stories',
        description: 'Be relatable, not just professional',
        tips: [
          'Your journey into this work',
          'Challenges you\'ve overcome',
          'Why you do what you do',
          'Makes you memorable'
        ]
      }
    ],
    templates: [
      {
        name: 'Content Formula',
        template: `Week 1: Educational (How to...)
Week 2: Behind the scenes (Working on...)
Week 3: Social proof (Client result...)
Week 4: Personal/relatable

Repeat with new topics.`,
        usage: 'Monthly content planning'
      }
    ],
    estimatedTime: '1-2 hours for a month of ideas',
    skillsLearned: ['Content marketing', 'Audience understanding'],
    budgetRequired: 'zero'
  }),

  'zero-budget': (profile) => ({
    title: 'Marketing with Zero Budget',
    steps: [
      {
        step: 1,
        title: 'Understand What Free Marketing Costs',
        description: 'You pay with time and effort',
        tips: [
          'Free = time and consistency',
          'Paid = money but faster',
          'With no budget, you invest time',
          'Results take longer but are sustainable'
        ]
      },
      {
        step: 2,
        title: 'Leverage What\'s Free',
        description: 'Platforms that cost nothing',
        tips: [
          'Social media (all major platforms)',
          'Google Business Profile (local)',
          'WW Marketplace (you\'re already here)',
          'Community groups and forums',
          'Word of mouth'
        ]
      },
      {
        step: 3,
        title: 'Trade Value for Exposure',
        description: 'Collaboration over competition',
        tips: [
          'Guest posts on relevant blogs',
          'Collaborate with complementary creators',
          'Offer free work for testimonials (limited)',
          'Cross-promotion with peers'
        ]
      },
      {
        step: 4,
        title: 'Maximize Every Customer',
        description: 'One customer can bring many',
        tips: [
          'Deliver exceptional work',
          'Ask for testimonials',
          'Ask for referrals',
          'Stay in touch for repeat business',
          'One great customer > 100 followers'
        ]
      },
      {
        step: 5,
        title: 'Be Patient and Consistent',
        description: 'Free marketing is a long game',
        tips: [
          '6-12 months for real traction',
          'Consistency compounds',
          'Don\'t give up after 2 weeks',
          'Keep improving based on what works'
        ]
      }
    ],
    estimatedTime: '6-12 months for significant results',
    skillsLearned: ['Organic marketing', 'Patience', 'Community building'],
    budgetRequired: 'zero'
  }),

  'email-list': (profile) => ({
    title: 'Building an Email List',
    steps: [
      {
        step: 1,
        title: 'Why Email > Social',
        description: 'You own your list',
        tips: [
          'Social platforms can change algorithms',
          'Your email list is YOURS',
          'Direct access to your audience',
          'Higher conversion than social',
          'Build it from day one'
        ]
      },
      {
        step: 2,
        title: 'Create a Lead Magnet',
        description: 'Give something valuable for free',
        tips: [
          'Solve a specific problem',
          'PDF guide, template, checklist',
          'Quick win - not a full course',
          'Related to what you sell'
        ],
        examples: [
          'Beat maker: "5 ways to make your beats sound more professional"',
          'Designer: "Brand checklist for new businesses"',
          'Writer: "Email templates that get responses"'
        ]
      },
      {
        step: 3,
        title: 'Set Up Simple Tech',
        description: 'Free tools to start',
        tips: [
          'Mailchimp: Free up to 500 subscribers',
          'ConvertKit: Free up to 1000 subscribers',
          'Buttondown: Simple newsletter tool',
          'Start with the simplest option'
        ]
      },
      {
        step: 4,
        title: 'Promote Your Lead Magnet',
        description: 'Get people to sign up',
        tips: [
          'Link in social bios',
          'End of every post: "Get my free [X]"',
          'Add to website',
          'Mention in conversations'
        ]
      },
      {
        step: 5,
        title: 'Provide Value Consistently',
        description: 'Don\'t just sell',
        tips: [
          'Weekly or bi-weekly email',
          'Helpful content > sales pitches',
          'Be a person, not a brand',
          'Reply to responses - build relationships'
        ]
      }
    ],
    estimatedTime: '2-3 hours setup, then ongoing',
    skillsLearned: ['Email marketing', 'Lead generation', 'List building'],
    budgetRequired: 'zero'
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface MarketingCoachROVProps {
  profile: MarketingProfile;
  onTemplateUse?: (template: MarketingTemplate) => void;
}

export const MarketingCoachROV: React.FC<MarketingCoachROVProps> = ({
  profile,
  onTemplateUse
}) => {
  const [selectedTask, setSelectedTask] = useState<MarketingTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return MARKETING_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  const tasks: { id: MarketingTask; label: string; icon: string }[] = [
    { id: 'define-audience', label: 'Define Audience', icon: '🎯' },
    { id: 'create-offer', label: 'Create Offer', icon: '💎' },
    { id: 'write-bio', label: 'Write Bio', icon: '✍️' },
    { id: 'social-strategy', label: 'Social Strategy', icon: '📱' },
    { id: 'first-customers', label: 'First Customers', icon: '🚀' },
    { id: 'testimonials', label: 'Get Testimonials', icon: '⭐' },
    { id: 'content-ideas', label: 'Content Ideas', icon: '💡' },
    { id: 'zero-budget', label: 'Zero Budget', icon: '💪' },
    { id: 'email-list', label: 'Build Email List', icon: '📧' }
  ];
  
  return (
    <div className="marketing-coach-rov">
      <div className="marketing-coach-rov__header">
        <div className="marketing-coach-rov__avatar">📣</div>
        <div className="marketing-coach-rov__info">
          <h2>Marketing Coach</h2>
          <span>Get Your Work Seen</span>
        </div>
      </div>
      
      <div className="marketing-coach-rov__profile">
        <p>
          Hey {profile.name}! You've made <strong>{profile.salesCount} sales</strong> so far
          {profile.socialPlatforms.length > 0 && ` and you're on ${profile.socialPlatforms.join(', ')}`}.
          {profile.salesCount === 0 && ' Let\'s get you your first customer.'}
          {profile.salesCount > 0 && ' Let\'s scale what\'s working.'}
        </p>
        <p className="philosophy">
          💡 Marketing isn't sleazy - it's connecting your work with people who need it.
        </p>
      </div>
      
      <div className="marketing-coach-rov__tasks">
        <h3>What do you need help with?</h3>
        <div className="marketing-coach-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`marketing-coach-rov__task ${selectedTask === task.id ? 'active' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {guide && (
        <div className="marketing-coach-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="marketing-coach-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
            <span>💰 Budget: {guide.budgetRequired}</span>
            <span>📚 Skills: {guide.skillsLearned.join(', ')}</span>
          </div>
          
          <div className="marketing-coach-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="marketing-coach-rov__step">
                <div className="marketing-coach-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.examples && (
                  <div className="examples">
                    <strong>Examples:</strong>
                    <ul>
                      {step.examples.map((ex, i) => (
                        <li key={i}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.template && (
                  <div className="template">
                    <strong>Template:</strong>
                    <pre>{step.template}</pre>
                  </div>
                )}
                {step.aiOption && (
                  <div className="marketing-coach-rov__ai-option">
                    <strong>🤖 AI Option: {step.aiOption.tool}</strong>
                    <p>{step.aiOption.howToUse}</p>
                    <p className="warning">⚠️ {step.aiOption.warning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {guide.templates && guide.templates.length > 0 && (
            <div className="marketing-coach-rov__templates">
              <h4>📋 Templates</h4>
              {guide.templates.map((template, i) => (
                <div key={i} className="marketing-coach-rov__template">
                  <h5>{template.name}</h5>
                  <p className="usage">{template.usage}</p>
                  <pre>{template.template}</pre>
                  <button onClick={() => onTemplateUse?.(template)}>
                    Use This Template
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="marketing-coach-rov__footer">
        <p>
          💚 Your work deserves to be seen. Marketing is just helping the right people find you.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { MARKETING_GUIDES };
export default MarketingCoachROV;