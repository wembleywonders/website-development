/**
 * FINANCE GUIDE ROV
 * 
 * Basic financial literacy for creators.
 * Invoicing, tax basics, money management.
 * 
 * Philosophy: Creative success requires financial sustainability.
 * Know enough to not get caught out.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface FinanceProfile {
  id: string;
  name: string;
  salesCount: number;
  totalRevenue: number;
  isRegisteredSelfEmployed: boolean;
  hasBusinessAccount: boolean;
  trackingMethod: 'none' | 'spreadsheet' | 'app' | 'accountant';
}

export type FinanceTask = 
  | 'understand-tax'
  | 'create-invoice'
  | 'track-income'
  | 'separate-finances'
  | 'plan-for-tax'
  | 'understand-expenses'
  | 'get-paid';

export interface FinanceGuide {
  title: string;
  disclaimer: string;
  steps: FinanceStep[];
  resources: FinanceResource[];
  estimatedTime: string;
}

export interface FinanceStep {
  step: number;
  title: string;
  description: string;
  tips: string[];
  warning?: string;
  template?: string;
}

export interface FinanceResource {
  title: string;
  url: string;
  type: 'gov' | 'tool' | 'article';
}

// ============================================================
// FINANCE GUIDES
// ============================================================

const FINANCE_GUIDES: Record<FinanceTask, (profile: FinanceProfile) => FinanceGuide> = {
  'understand-tax': (profile) => ({
    title: 'Understanding UK Self-Employment Tax',
    disclaimer: 'This is general guidance only. Consult HMRC or an accountant for your specific situation.',
    steps: [
      {
        step: 1,
        title: 'Know When You Need to Register',
        description: 'Self-employment registration requirements',
        tips: [
          'Register with HMRC if you earn over £1,000/year from self-employment',
          'You must register by 5 October after the tax year you started',
          'Tax year runs April 6 to April 5',
          'Even if you have a day job, side income counts'
        ],
        warning: 'Failing to register can result in penalties'
      },
      {
        step: 2,
        title: 'Understand Self Assessment',
        description: 'How you report and pay tax',
        tips: [
          'Self Assessment is how you report income to HMRC',
          'Deadline: 31 January after the tax year ends',
          'Online submission required (paper deadline is earlier)',
          'You calculate what you owe, not HMRC'
        ]
      },
      {
        step: 3,
        title: 'Know Your Tax-Free Allowances',
        description: 'What you don\'t pay tax on',
        tips: [
          'Personal Allowance: £12,570 (2024/25) - no tax on this',
          'Trading Allowance: £1,000 - if total trading income is under this, no reporting needed',
          'These can change each year - check gov.uk'
        ]
      },
      {
        step: 4,
        title: 'Understand Income Tax Rates',
        description: 'How much you\'ll pay',
        tips: [
          'Basic rate: 20% on £12,571 to £50,270',
          'Higher rate: 40% on £50,271 to £125,140',
          'These rates apply to taxable income AFTER allowances',
          'If you have a job, your self-employment income is added on top'
        ]
      },
      {
        step: 5,
        title: 'Don\'t Forget National Insurance',
        description: 'The other contribution',
        tips: [
          'Class 2 NI: £3.45/week if profits over £12,570',
          'Class 4 NI: 9% on profits between £12,570-50,270',
          'NI is separate from Income Tax',
          'Both are paid through Self Assessment'
        ]
      }
    ],
    resources: [
      { title: 'Register for Self Assessment', url: 'https://www.gov.uk/register-for-self-assessment', type: 'gov' },
      { title: 'Self-employment tax calculator', url: 'https://www.gov.uk/self-assessment-tax-calculator', type: 'gov' }
    ],
    estimatedTime: '30 minutes to understand basics'
  }),

  'create-invoice': (profile) => ({
    title: 'Creating Professional Invoices',
    disclaimer: 'Invoices are legal documents. Include all required information.',
    steps: [
      {
        step: 1,
        title: 'Required Invoice Information',
        description: 'What must be on every invoice',
        tips: [
          'Your name and contact details',
          'Client name and address',
          'Unique invoice number',
          'Invoice date and due date',
          'Description of work/products',
          'Amount due',
          'Payment details'
        ]
      },
      {
        step: 2,
        title: 'Invoice Number System',
        description: 'Keep it simple and sequential',
        tips: [
          'Example: INV-001, INV-002, INV-003',
          'Or: 2024-001, 2024-002 (year-based)',
          'Never reuse an invoice number',
          'Keep a record of all invoices'
        ]
      },
      {
        step: 3,
        title: 'Describe Work Clearly',
        description: 'Be specific about what you delivered',
        tips: [
          'List each item/service separately',
          'Include dates of work if relevant',
          'Reference any project name or agreement',
          'Break down costs if multiple items'
        ],
        template: `Description: Logo design for XYZ Company
- Initial concepts x3
- Revisions x2
- Final logo files (AI, PNG, JPG)
- Basic brand guidelines

Total: £XXX`
      },
      {
        step: 4,
        title: 'Payment Terms',
        description: 'Be clear about how and when',
        tips: [
          'Standard: 14 or 30 days from invoice date',
          'Include bank details clearly',
          'Specify accepted payment methods',
          'Consider late payment terms'
        ]
      },
      {
        step: 5,
        title: 'Use a Template or Tool',
        description: 'Don\'t reinvent the wheel',
        tips: [
          'Free: Wave, PayPal invoicing, Canva templates',
          'Paid: FreshBooks, QuickBooks, Xero',
          'Even Word/Google Docs works for simple invoices',
          'Save a template for future use'
        ]
      }
    ],
    resources: [
      { title: 'Wave (free invoicing)', url: 'https://www.waveapps.com', type: 'tool' },
      { title: 'Canva invoice templates', url: 'https://www.canva.com/invoices/templates/', type: 'tool' }
    ],
    estimatedTime: '30 minutes to set up first invoice'
  }),

  'track-income': (profile) => ({
    title: 'Tracking Your Income & Expenses',
    disclaimer: 'Keep records for at least 5 years for tax purposes.',
    steps: [
      {
        step: 1,
        title: 'Why Track Everything',
        description: 'Legal requirement and financial clarity',
        tips: [
          'HMRC requires you to keep records',
          'Know what you\'re actually earning',
          'Track expenses to reduce tax bill',
          'Makes Self Assessment much easier'
        ]
      },
      {
        step: 2,
        title: 'Choose Your Method',
        description: 'Pick what you\'ll actually use',
        tips: [
          'Spreadsheet: Free, flexible (Google Sheets, Excel)',
          'App: Easy, automated (Wave, FreeAgent, QuickBooks)',
          'Accountant: Best if earnings significant (£10k+/year)',
          'Start simple, upgrade when needed'
        ]
      },
      {
        step: 3,
        title: 'What to Track',
        description: 'Income and expenses',
        tips: [
          'Every sale: Date, client, amount, what it was for',
          'Every expense: Date, what, amount, receipt',
          'Keep receipts (photos are fine)',
          'Categorize as you go'
        ],
        template: `Income Log:
Date | Client | Description | Amount | Invoice #

Expense Log:
Date | Category | Description | Amount | Receipt Y/N`
      },
      {
        step: 4,
        title: 'Track Weekly, Not Yearly',
        description: 'Little and often beats last-minute panic',
        tips: [
          'Set 15 minutes weekly for bookkeeping',
          'Sunday evening or Monday morning works',
          'Update immediately when you get paid',
          'Don\'t let receipts pile up'
        ]
      },
      {
        step: 5,
        title: 'Categorize Expenses',
        description: 'Know what you\'re spending on',
        tips: [
          'Software/subscriptions',
          'Equipment',
          'Marketing',
          'Training/education',
          'Professional services',
          'Travel',
          'Materials/supplies'
        ]
      }
    ],
    resources: [
      { title: 'Google Sheets income tracker template', url: 'https://docs.google.com/spreadsheets', type: 'tool' },
      { title: 'Wave (free accounting)', url: 'https://www.waveapps.com', type: 'tool' }
    ],
    estimatedTime: '1 hour setup, 15 min/week ongoing'
  }),

  'separate-finances': (profile) => ({
    title: 'Separating Business & Personal Finances',
    disclaimer: 'You don\'t legally need a business account as a sole trader, but it helps.',
    steps: [
      {
        step: 1,
        title: 'Why Separate?',
        description: 'Makes everything easier',
        tips: [
          'Clear view of business income vs personal',
          'Much easier to track expenses',
          'Looks professional to clients',
          'Simpler tax reporting'
        ]
      },
      {
        step: 2,
        title: 'Open a Separate Account',
        description: 'Options for sole traders',
        tips: [
          'Can use a second personal account (free)',
          'Business accounts: Starling, Tide, Monzo Business',
          'Many have free tiers for low transaction volumes',
          'Choose one with good app/export features'
        ]
      },
      {
        step: 3,
        title: 'Set Up the System',
        description: 'How money should flow',
        tips: [
          'All business income goes to business account',
          'All business expenses paid from business account',
          'Pay yourself a regular amount to personal',
          'Keep a buffer in business account for tax'
        ]
      },
      {
        step: 4,
        title: 'Handle Mixed Expenses',
        description: 'When personal and business overlap',
        tips: [
          'Phone bill? Pay from personal, claim % as expense',
          'Home office? Can claim % of bills',
          'Keep it simple - don\'t overcomplicate',
          'When in doubt, don\'t claim it'
        ]
      }
    ],
    resources: [
      { title: 'Starling Bank Business', url: 'https://www.starlingbank.com/business/', type: 'tool' },
      { title: 'Tide (free business account)', url: 'https://www.tide.co', type: 'tool' }
    ],
    estimatedTime: '30 minutes to set up account'
  }),

  'plan-for-tax': (profile) => ({
    title: 'Planning for Your Tax Bill',
    disclaimer: 'Set money aside as you go - don\'t get caught out.',
    steps: [
      {
        step: 1,
        title: 'The Problem',
        description: 'Tax bills can be a shock',
        tips: [
          'Self-employed tax is due in one/two lump sums',
          'If you don\'t plan, January can be painful',
          'First year: May need to pay tax + payments on account',
          'This catches many people out'
        ],
        warning: 'Your first tax bill can be up to 150% of what you expect due to payments on account'
      },
      {
        step: 2,
        title: 'The Simple Rule',
        description: 'Set aside a percentage of every payment',
        tips: [
          'Basic rule: 25-30% of every payment',
          'Put it in a separate savings account',
          'Don\'t touch it until tax time',
          'Better to over-save than under-save'
        ]
      },
      {
        step: 3,
        title: 'Calculate More Precisely',
        description: 'If you want to be exact',
        tips: [
          'Under £12,570 profit: 0% income tax (still may owe NI)',
          '£12,571-£50,270: ~25-30% (tax + NI combined)',
          'Remember to subtract allowable expenses first',
          'Use HMRC calculator for estimate'
        ]
      },
      {
        step: 4,
        title: 'Create a Tax Savings Account',
        description: 'Automate the process',
        tips: [
          'Open a separate savings account',
          'Transfer % immediately when you get paid',
          'Some banks let you auto-transfer',
          'Earn interest on it while you wait'
        ]
      },
      {
        step: 5,
        title: 'Know Your Deadlines',
        description: 'Don\'t miss them',
        tips: [
          'Register: 5 October after tax year you started',
          'File return: 31 January following end of tax year',
          'Pay tax: 31 January (and 31 July for payments on account)',
          'Late = penalties + interest'
        ]
      }
    ],
    resources: [
      { title: 'Self Assessment tax calculator', url: 'https://www.gov.uk/self-assessment-tax-calculator', type: 'gov' },
      { title: 'Payment on account explained', url: 'https://www.gov.uk/understand-self-assessment-bill/payments-on-account', type: 'gov' }
    ],
    estimatedTime: '15 minutes to set up savings system'
  }),

  'understand-expenses': (profile) => ({
    title: 'Understanding Allowable Expenses',
    disclaimer: 'Only claim expenses that are wholly and exclusively for business.',
    steps: [
      {
        step: 1,
        title: 'What Are Allowable Expenses?',
        description: 'Costs you can deduct from income',
        tips: [
          'Reduce your taxable profit',
          'Must be "wholly and exclusively" for business',
          'Keep receipts as proof',
          'If HMRC asks, you need evidence'
        ]
      },
      {
        step: 2,
        title: 'Common Allowable Expenses for Creators',
        description: 'What you can likely claim',
        tips: [
          'Software subscriptions (DAW, design tools, etc.)',
          'Equipment (computer, camera, mic)',
          'Website and hosting costs',
          'Marketing and advertising',
          'Professional development/training',
          'Bank fees and payment processing fees'
        ]
      },
      {
        step: 3,
        title: 'Working from Home',
        description: 'Claiming home office costs',
        tips: [
          'Simplified method: £6/week (£312/year) - no receipts needed',
          'Detailed method: Calculate actual % of bills',
          'Simplified is easier, detailed may give more',
          'Choose one method per year'
        ]
      },
      {
        step: 4,
        title: 'What You Can\'t Claim',
        description: 'Avoid these mistakes',
        tips: [
          'Personal expenses (even if used for work sometimes)',
          'Clothing (unless costume/uniform)',
          'Commuting costs',
          'Entertainment (very limited rules)',
          'When in doubt, don\'t claim it'
        ],
        warning: 'Claiming personal expenses as business is fraud'
      },
      {
        step: 5,
        title: 'Capital vs. Revenue Expenses',
        description: 'Big purchases work differently',
        tips: [
          'Revenue: Ongoing costs, claim in full that year',
          'Capital: Big equipment, spread over time (capital allowances)',
          'Under £1,000? Usually claim in full',
          'Complex? Ask an accountant'
        ]
      }
    ],
    resources: [
      { title: 'HMRC expenses guide', url: 'https://www.gov.uk/expenses-if-youre-self-employed', type: 'gov' },
      { title: 'Simplified expenses', url: 'https://www.gov.uk/simpler-income-tax-simplified-expenses', type: 'gov' }
    ],
    estimatedTime: '30 minutes to understand basics'
  }),

  'get-paid': (profile) => ({
    title: 'Getting Paid Reliably',
    disclaimer: 'Clear payment terms prevent most issues.',
    steps: [
      {
        step: 1,
        title: 'Set Clear Terms Upfront',
        description: 'Before you start work',
        tips: [
          'Agree on price before starting',
          'Specify when payment is due',
          'Get it in writing (email counts)',
          'For bigger jobs: Get a deposit'
        ]
      },
      {
        step: 2,
        title: 'Payment Methods',
        description: 'Make it easy to pay you',
        tips: [
          'Bank transfer: Free, standard in UK',
          'PayPal: Easy, but fees (~2.9% + 30p)',
          'Stripe: Professional, similar fees',
          'Offer multiple options when possible'
        ]
      },
      {
        step: 3,
        title: 'Deposits for Larger Work',
        description: 'Protect yourself',
        tips: [
          '50% upfront is standard for services',
          'Covers your time if they disappear',
          'Shows they\'re serious',
          'Final payment on delivery'
        ]
      },
      {
        step: 4,
        title: 'Chasing Late Payments',
        description: 'When they don\'t pay on time',
        tips: [
          'Day after due: Polite reminder email',
          'Week late: Follow-up call/email',
          'Two weeks late: Formal notice',
          'Stay professional, document everything'
        ],
        template: `Hi [Name],

Hope you're well. Just a quick note that invoice [#] for £[amount] was due on [date].

Could you let me know when I can expect payment?

Happy to answer any questions.

Thanks,
[Your name]`
      },
      {
        step: 5,
        title: 'Preventing Non-Payment',
        description: 'Better than chasing',
        tips: [
          'Clear written agreements',
          'Deposits for new clients',
          'Don\'t deliver final work until paid',
          'Build relationships with good clients'
        ]
      }
    ],
    resources: [
      { title: 'Late payment legislation', url: 'https://www.gov.uk/late-commercial-payments-interest-debt-recovery', type: 'gov' }
    ],
    estimatedTime: '15 minutes to set up payment process'
  })
};

// ============================================================
// COMPONENT
// ============================================================

export interface FinanceGuideROVProps {
  profile: FinanceProfile;
}

export const FinanceGuideROV: React.FC<FinanceGuideROVProps> = ({
  profile
}) => {
  const [selectedTask, setSelectedTask] = useState<FinanceTask | null>(null);
  
  const guide = useMemo(() => {
    if (!selectedTask) return null;
    return FINANCE_GUIDES[selectedTask](profile);
  }, [selectedTask, profile]);
  
  // Status checks
  const needsRegistration = profile.totalRevenue > 1000 && !profile.isRegisteredSelfEmployed;
  const needsTracking = profile.salesCount > 0 && profile.trackingMethod === 'none';
  
  const tasks: { id: FinanceTask; label: string; icon: string; urgent?: boolean }[] = [
    { id: 'understand-tax', label: 'Tax Basics', icon: '📋', urgent: needsRegistration },
    { id: 'create-invoice', label: 'Create Invoice', icon: '📄' },
    { id: 'track-income', label: 'Track Income', icon: '📊', urgent: needsTracking },
    { id: 'separate-finances', label: 'Separate Finances', icon: '🏦' },
    { id: 'plan-for-tax', label: 'Plan for Tax', icon: '🐷' },
    { id: 'understand-expenses', label: 'Expenses', icon: '🧾' },
    { id: 'get-paid', label: 'Get Paid', icon: '💰' }
  ];
  
  return (
    <div className="finance-guide-rov">
      <div className="finance-guide-rov__header">
        <div className="finance-guide-rov__avatar">💷</div>
        <div className="finance-guide-rov__info">
          <h2>Finance Guide</h2>
          <span>Money Basics for Creators</span>
        </div>
      </div>
      
      {/* Alerts */}
      {needsRegistration && (
        <div className="finance-guide-rov__alert alert--warning">
          ⚠️ You've earned over £1,000 - you may need to register for Self Assessment
        </div>
      )}
      
      {needsTracking && (
        <div className="finance-guide-rov__alert alert--info">
          💡 You're making sales - start tracking your income to make tax time easier
        </div>
      )}
      
      {/* Status Summary */}
      <div className="finance-guide-rov__summary">
        <div className="summary-item">
          <span className="label">Total Revenue</span>
          <span className="value">£{profile.totalRevenue.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Sales</span>
          <span className="value">{profile.salesCount}</span>
        </div>
        <div className="summary-item">
          <span className="label">Registered</span>
          <span className="value">{profile.isRegisteredSelfEmployed ? '✅' : '❌'}</span>
        </div>
        <div className="summary-item">
          <span className="label">Tracking</span>
          <span className="value">{profile.trackingMethod}</span>
        </div>
      </div>
      
      {/* Tasks */}
      <div className="finance-guide-rov__tasks">
        <h3>What do you need help with?</h3>
        <div className="finance-guide-rov__task-grid">
          {tasks.map(task => (
            <button
              key={task.id}
              className={`finance-guide-rov__task ${selectedTask === task.id ? 'active' : ''} ${task.urgent ? 'urgent' : ''}`}
              onClick={() => setSelectedTask(task.id)}
            >
              <span className="icon">{task.icon}</span>
              <span className="label">{task.label}</span>
              {task.urgent && <span className="urgent-badge">!</span>}
            </button>
          ))}
        </div>
      </div>
      
      {/* Guide Content */}
      {guide && (
        <div className="finance-guide-rov__guide">
          <h3>{guide.title}</h3>
          
          <div className="finance-guide-rov__disclaimer">
            ⚠️ {guide.disclaimer}
          </div>
          
          <div className="finance-guide-rov__meta">
            <span>⏱️ {guide.estimatedTime}</span>
          </div>
          
          <div className="finance-guide-rov__steps">
            {guide.steps.map(step => (
              <div key={step.step} className="finance-guide-rov__step">
                <div className="finance-guide-rov__step-header">
                  <span className="step-number">{step.step}</span>
                  <h4>{step.title}</h4>
                </div>
                <p>{step.description}</p>
                <ul>
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
                {step.warning && (
                  <div className="step-warning">⚠️ {step.warning}</div>
                )}
                {step.template && (
                  <pre className="step-template">{step.template}</pre>
                )}
              </div>
            ))}
          </div>
          
          {guide.resources.length > 0 && (
            <div className="finance-guide-rov__resources">
              <h4>📎 Helpful Resources</h4>
              {guide.resources.map((resource, i) => (
                <a 
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`resource-link resource-${resource.type}`}
                >
                  {resource.type === 'gov' && '🏛️'}
                  {resource.type === 'tool' && '🔧'}
                  {resource.type === 'article' && '📄'}
                  {resource.title}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="finance-guide-rov__footer">
        <p>
          💚 Financial literacy is creative freedom. 
          Know your numbers, own your future.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { FINANCE_GUIDES };
export default FinanceGuideROV;