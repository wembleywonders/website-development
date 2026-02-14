/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaFinance - Ntikuma's Finance Guidance Component
 * 
 * UPDATED: Compatible with unified mayaStore and ROV framework
 * 
 * Comprehensive financial guidance for self-employed creators including:
 * - Tax planning and set-aside
 * - Pension and retirement
 * - Creator Protection Package (the incidentals employees get free):
 *   • Sick pay circle
 *   • Holiday fund
 *   • Parental leave fund
 *   • Emergency fund
 *   • Equipment replacement fund
 *   • Professional development fund
 *   • Insurance guidance
 *   • Income smoothing
 * 
 * "The numbers don't lie. They just wait for you to look." - Ntikuma
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Calculator,
  PiggyBank,
  FileText,
  Receipt,
  Heart,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Shield,
  Baby,
  Umbrella,
  Wrench,
  GraduationCap,
  LineChart,
  Clock,
  Target
} from 'lucide-react';
import {
  useMayaStore,
  useMayaROV,
  useMayaPreferences,
  useMayaTracking,
  useMayaOpenLoops
} from '../../../maya/stores/mayaStore';
import type { ActiveChild } from '../../../maya/types/mayaTypes';
import './MayaFinance.css';

// ============================================
// TYPES
// ============================================

type MayaFinanceTopic = 
  | 'tax-overview'
  | 'tax-saving'
  | 'deadline-reminder'
  | 'pension-start'
  | 'pension-increase'
  | 'invoice-help'
  | 'expense-tracking'
  | 'sick-pay'
  | 'holiday-fund'
  | 'parental-leave'
  | 'emergency-fund'
  | 'equipment-fund'
  | 'professional-development'
  | 'insurance'
  | 'income-smoothing'
  | 'general-advice'
  | 'creator-protection';

interface MayaAction {
  id: string;
  label: string;
  type: 'link' | 'modal' | 'function';
  target: string;
  primary?: boolean;
}

interface ConversationNode {
  id: string;
  topic: MayaFinanceTopic;
  trigger: string[];
  message: string;
  suggestions?: string[];
  actions?: MayaAction[];
  followUp?: string;
  contextData?: string[];
  /** Which child speaks this? Ntikuma for finance, Maya for emotional support */
  speaker?: ActiveChild;
  /** Monthly set-aside recommendation if applicable */
  setAsidePercent?: number;
}

// ============================================
// CREATOR PROTECTION CALCULATOR
// ============================================

interface CreatorProtectionBreakdown {
  grossIncome: number;
  tax: number;
  nationalInsurance: number;
  pension: number;
  holidayFund: number;
  sickPayCircle: number;
  parentalLeaveFund: number;
  emergencyFund: number;
  equipmentFund: number;
  professionalDevelopment: number;
  insurance: number;
  totalSetAside: number;
  spendableIncome: number;
  protectionScore: number; // 0-100
}

const calculateCreatorProtection = (
  annualIncome: number,
  options: {
    includePension?: boolean;
    includeParentalLeave?: boolean;
    includeProfDev?: boolean;
    emergencyMonths?: number;
  } = {}
): CreatorProtectionBreakdown => {
  const {
    includePension = true,
    includeParentalLeave = false,
    includeProfDev = true,
    emergencyMonths = 3
  } = options;

  const monthlyIncome = annualIncome / 12;

  // Tax & NI (simplified - actual calculation is more complex)
  const taxableIncome = Math.max(0, annualIncome - 12570); // Personal allowance 2024-25
  const basicRateTax = Math.min(taxableIncome, 37700) * 0.20;
  const higherRateTax = Math.max(0, taxableIncome - 37700) * 0.40;
  const annualTax = basicRateTax + higherRateTax;
  
  // Class 2 NI: £3.45/week if profits > £12,570
  // Class 4 NI: 6% on profits between £12,570-50,270, 2% above
  const class2NI = annualIncome > 12570 ? 3.45 * 52 : 0;
  const class4Band1 = Math.min(Math.max(0, annualIncome - 12570), 37700) * 0.06;
  const class4Band2 = Math.max(0, annualIncome - 50270) * 0.02;
  const annualNI = class2NI + class4Band1 + class4Band2;

  // Protection funds (monthly amounts)
  const pension = includePension ? monthlyIncome * 0.08 : 0; // 8% recommended
  const holidayFund = monthlyIncome * 0.108; // 28 days / 260 working days = 10.8%
  const sickPayCircle = 20; // Fixed community contribution
  const parentalLeaveFund = includeParentalLeave ? monthlyIncome * 0.05 : 0; // 5% if planning
  const emergencyTarget = monthlyIncome * emergencyMonths;
  const emergencyFund = emergencyTarget / 24; // Build over 2 years
  const equipmentFund = monthlyIncome * 0.03; // 3% for equipment replacement
  const professionalDevelopment = includeProfDev ? monthlyIncome * 0.02 : 0; // 2% for courses/training
  const insurance = 50; // Typical professional indemnity estimate

  const monthlyTax = annualTax / 12;
  const monthlyNI = annualNI / 12;

  const totalSetAside = 
    monthlyTax + 
    monthlyNI + 
    pension + 
    holidayFund + 
    sickPayCircle + 
    parentalLeaveFund + 
    emergencyFund + 
    equipmentFund + 
    professionalDevelopment + 
    insurance;

  const spendableIncome = monthlyIncome - totalSetAside;

  // Protection score based on what's included
  let protectionScore = 30; // Base for tax & NI
  if (includePension) protectionScore += 15;
  if (holidayFund > 0) protectionScore += 15;
  if (sickPayCircle > 0) protectionScore += 10;
  if (includeParentalLeave) protectionScore += 10;
  if (emergencyFund > 0) protectionScore += 10;
  if (equipmentFund > 0) protectionScore += 5;
  if (includeProfDev) protectionScore += 5;

  return {
    grossIncome: monthlyIncome,
    tax: monthlyTax,
    nationalInsurance: monthlyNI,
    pension,
    holidayFund,
    sickPayCircle,
    parentalLeaveFund,
    emergencyFund,
    equipmentFund,
    professionalDevelopment,
    insurance,
    totalSetAside,
    spendableIncome,
    protectionScore
  };
};

// ============================================
// CONVERSATION DATA - ENHANCED
// ============================================

const MAYA_CONVERSATIONS: ConversationNode[] = [
  // ==========================================
  // CREATOR PROTECTION OVERVIEW
  // ==========================================
  {
    id: 'creator-protection-overview',
    topic: 'creator-protection',
    trigger: ['creator protection', 'employee benefits', 'what do I need', 'full package', 'protect myself'],
    speaker: 'ntikuma',
    message: `📊 **The Creator Protection Package**

Employees get these automatically. You have to build them yourself:

**What employees get FREE:**
• 28 days paid holiday (£3,200+ value)
• Statutory sick pay (£116/week)
• Maternity/paternity leave (39 weeks)
• Pension contributions (3% employer)
• Job security / notice period

**Your Creator Protection Package:**

| Protection | Monthly | Why |
|------------|---------|-----|
| Tax reserve | 20% | January won't surprise you |
| NI reserve | 9% | Same |
| Holiday fund | 10.8% | 28 days paid |
| Pension | 8% | Future you |
| Sick pay circle | £20 | Up to £300/week cover |
| Emergency fund | 5% | 3 months runway |
| Equipment fund | 3% | Replace gear |
| Prof. development | 2% | Stay current |

**Total: ~58% set aside**

Sounds like a lot? It's what employment actually costs. The difference is you keep it all if you don't use it.

Want me to calculate your specific numbers?`,
    suggestions: ['Calculate my numbers', 'That seems high', 'What can I skip?', 'Show me the breakdown'],
    actions: [
      { id: 'calc', label: 'Calculate My Package', type: 'modal', target: 'protection-calculator', primary: true }
    ]
  },

  // ==========================================
  // TAX CONVERSATIONS
  // ==========================================
  {
    id: 'tax-first-time',
    topic: 'tax-overview',
    trigger: ['first time', 'new to tax', 'never done tax', 'self assessment'],
    speaker: 'ntikuma',
    message: `Welcome to self-employment taxes! Don't worry, I see the patterns.

**As a creator, you'll pay:**
• **Income Tax** - On your profit (income minus expenses)
• **National Insurance** - Class 2 (flat rate) + Class 4 (percentage)

**Key dates burned into my calendar:**
• **31 January** - Tax return deadline + pay what you owe
• **31 July** - Second payment on account (if applicable)

**The rule that saves creators:**
Set aside money from EVERY payment. Not at year end. Every. Single. Time.

I recommend 29% for most creators (20% tax + 9% NI).

Would you like me to calculate your exact percentage?`,
    suggestions: ['Calculate my percentage', 'What expenses can I claim?', 'How do I register?'],
    actions: [
      { id: 'calc', label: 'Open Tax Calculator', type: 'link', target: '/finance/tax', primary: true }
    ],
    setAsidePercent: 29
  },
  {
    id: 'tax-saving-tips',
    topic: 'tax-saving',
    trigger: ['save tax', 'reduce tax', 'pay less tax', 'tax tips'],
    speaker: 'ntikuma',
    message: `I notice patterns in what creators miss. Here are legitimate ways to reduce your bill:

**1. Track ALL expenses** - Most creators under-claim by £1,000-3,000/year
**2. Home office allowance** - £6/week (£312/year) without receipts
**3. Pension contributions** - Get 25% tax relief (£100 costs you £80!)
**4. Equipment spreading** - Claim capital allowances on big purchases
**5. Phone & internet** - Business percentage of your bills
**6. Professional subscriptions** - Adobe, Canva, domain names, hosting

**The pattern I see most often?**
Creators forget the small things. That £3 cable, £15 software trial, £8 notebook — I've seen it add up to £800+ missed deductions.

£800 in expenses = £160-320 less tax.`,
    suggestions: ['Track an expense now', 'Set up pension', 'What about my phone?'],
    actions: [
      { id: 'expenses', label: 'Open Expense Tracker', type: 'link', target: '/finance/expenses', primary: true }
    ]
  },
  {
    id: 'tax-deadline-warning',
    topic: 'deadline-reminder',
    trigger: ['deadline', 'when is tax due', 'january', 'late'],
    speaker: 'ntikuma',
    message: `⏰ **The dates that matter:**

**31 January 2025**
• Submit your Self Assessment return
• Pay your tax bill for 2023-24
• Pay first Payment on Account for 2024-25

**31 July 2025**
• Second Payment on Account

**If you miss these, HMRC charges:**
• £100 immediate fine
• £10/day after 3 months (up to £900)
• 5% of tax owed after 30 days
• Interest on everything unpaid

I've watched creators lose £500+ to late payment penalties. Your tax pot should prevent this.

Want me to check if you're on track?`,
    suggestions: ['Check my tax pot', 'Set up reminders', "What if I can't pay?"],
    actions: [
      { id: 'check', label: 'Check Tax Pot', type: 'modal', target: 'tax-pot-check', primary: true },
      { id: 'remind', label: 'Set Reminder', type: 'function', target: 'setTaxReminder' }
    ]
  },

  // ==========================================
  // PENSION CONVERSATIONS
  // ==========================================
  {
    id: 'pension-start',
    topic: 'pension-start',
    trigger: ['start pension', 'pension advice', 'retirement', 'no pension'],
    speaker: 'ntikuma',
    message: `The numbers here are extraordinary. Let me show you:

**Free Money Alert! 🎁**
For every £80 you put in, the government adds £20. That's an instant 25% return before any investment growth.

**Self-Employed Options:**
• **SIPP** - Self-Invested Personal Pension (most control)
• **Stakeholder pension** - Simple, low fees
• **NEST** - Government-backed, easy setup

**The age rule:**
Half your age as a percentage. Age 30? Save 15%.

**But here's what I've observed:**
Even £50/month started at 25 beats £200/month started at 40.

Time is the most valuable asset. The numbers prove it.`,
    suggestions: ['Show me the projection', "What's a SIPP?", "I can't afford much"],
    actions: [
      { id: 'planner', label: 'Open Pension Planner', type: 'link', target: '/finance/pension', primary: true }
    ],
    setAsidePercent: 8
  },
  {
    id: 'pension-increase',
    topic: 'pension-increase',
    trigger: ['increase pension', 'more pension', 'boost retirement', 'pension projection'],
    speaker: 'ntikuma',
    message: `Let me show you compound growth in action...

**You're 32, saving £100/month:**
• At 67: ~£95,000 pot → £365/month income

**Increase to £200/month:**
• At 67: ~£190,000 pot → £730/month income

**That extra £100/month = £365 more per month for life in retirement.**

**The tax relief makes it better:**
£200/month actually costs you £160 (basic rate)
£200/month costs £120 if you're higher rate

The pattern is clear: every pound now is worth multiple pounds later.`,
    suggestions: ['Run my projection', 'How do I increase?', 'Tax relief explained'],
    actions: [
      { id: 'project', label: 'See My Projection', type: 'link', target: '/finance/pension', primary: true }
    ]
  },

  // ==========================================
  // HOLIDAY FUND - ENHANCED
  // ==========================================
  {
    id: 'holiday-fund',
    topic: 'holiday-fund',
    trigger: ['holiday', 'time off', 'vacation', 'paid leave', 'annual leave'],
    speaker: 'ntikuma',
    message: `Employees get 28 days paid. Self-employed? You fund it yourself or you don't take time off.

**The calculation:**
• Working days per year: ~260
• Holiday entitlement: 28 days
• Holiday percentage: 28/260 = **10.8%**

**Example (£30k/year income):**
• Daily rate: £115
• 28 days value: £3,220
• Monthly set-aside: £268

**When you want a week off:**
Instead of "losing" £575, you pay yourself from your holiday fund.

**The pattern I see:**
Creators who don't fund holidays either:
1. Never take time off (burnout)
2. Take time off but feel guilty (stress)
3. Take time off and panic about money (anxiety)

None of those are sustainable.`,
    suggestions: ['Calculate my target', 'I never take holidays', 'Set up auto-save'],
    actions: [
      { id: 'calc', label: 'Calculate Holiday Fund', type: 'modal', target: 'holiday-calculator', primary: true }
    ],
    setAsidePercent: 10.8
  },

  // ==========================================
  // SICK PAY CIRCLE
  // ==========================================
  {
    id: 'sick-pay-intro',
    topic: 'sick-pay',
    trigger: ['sick pay', 'illness cover', "can't work", 'health insurance', 'ill'],
    speaker: 'maya',
    message: `This is where I step in, because it's about community, not just numbers.

**The scary truth:**
Employees get £116.75/week Statutory Sick Pay.
Self-employed creators get £0.

**Our Solution: Creator Sick Pay Circle**

This isn't insurance. It's mutual aid. 127 creators looking out for each other.

**How it works:**
• Contribute £20/month
• Wait 3 months to qualify
• Claim up to £300/week (almost 3x SSP!)
• Self-certify for up to 7 days
• Doctor's note for longer
• Up to 4 weeks coverage per year

**Why £20?**
127 × £20 = £2,540/month pool
Average 2 claims/month = sustainable

When you're ill, you focus on getting better. The circle has you.`,
    suggestions: ['Join the circle', 'How does claiming work?', 'Is this insurance?', 'What about long-term illness?'],
    actions: [
      { id: 'join', label: 'Join Sick Pay Circle', type: 'link', target: '/finance/sickpay', primary: true }
    ],
    setAsidePercent: 0 // Fixed amount
  },

  // ==========================================
  // PARENTAL LEAVE - NEW
  // ==========================================
  {
    id: 'parental-leave',
    topic: 'parental-leave',
    trigger: ['parental leave', 'maternity', 'paternity', 'having a baby', 'pregnant', 'adoption'],
    speaker: 'maya',
    message: `Thinking about starting or growing your family? Let's make sure you're protected.

**What employees get:**
• 39 weeks statutory maternity pay
• 2 weeks statutory paternity pay
• Shared parental leave options
• Job protection

**What self-employed creators get:**
• Maternity Allowance: £172.48/week for 39 weeks (if you qualify)
• Paternity: Nothing statutory
• Job protection: N/A (you ARE the job)

**Building Your Parental Leave Fund:**

**Maternity/Primary carer:**
• Target: 6 months expenses (~£9,000-15,000)
• Build time: 2-3 years before needed
• Monthly set-aside: 5-8% of income

**Paternity/Secondary carer:**
• Target: 2-4 weeks expenses (~£1,500-3,000)
• Monthly set-aside: 2-3% of income

**The truth:**
This is one of the biggest gaps in self-employment. Plan early.

Would you like help building a parental leave fund?`,
    suggestions: ['Calculate my target', 'Check Maternity Allowance', "I'm not planning yet", 'Already pregnant'],
    actions: [
      { id: 'calc', label: 'Build Parental Fund', type: 'modal', target: 'parental-calculator', primary: true }
    ],
    setAsidePercent: 5
  },

  // ==========================================
  // EMERGENCY FUND - NEW
  // ==========================================
  {
    id: 'emergency-fund',
    topic: 'emergency-fund',
    trigger: ['emergency fund', 'rainy day', 'savings', 'runway', 'buffer', 'safety net'],
    speaker: 'ntikuma',
    message: `The emergency fund is your foundation. Without it, everything else is unstable.

**The numbers:**
• Minimum: 3 months expenses
• Recommended: 6 months expenses
• Ideal: 6 months + 3 months irregular income buffer

**Why creators need MORE than employees:**
1. No notice period if clients leave
2. Income can drop 50%+ month-to-month
3. No redundancy pay
4. Equipment failures don't wait

**Building it:**
Don't try to save it all at once. 5% of income, consistently, for 2 years.

**Example (£2,500/month expenses):**
• 3-month target: £7,500
• 5% of £30k income: £125/month
• Time to target: ~60 months (but partial protection from month 1)

**The pattern:**
Creators with emergency funds make better decisions. They don't take bad clients out of desperation.`,
    suggestions: ['Calculate my target', 'I have some savings', 'Start building now'],
    actions: [
      { id: 'start', label: 'Start Emergency Fund', type: 'link', target: '/finance/emergency', primary: true }
    ],
    setAsidePercent: 5
  },

  // ==========================================
  // EQUIPMENT REPLACEMENT FUND - NEW
  // ==========================================
  {
    id: 'equipment-fund',
    topic: 'equipment-fund',
    trigger: ['equipment', 'laptop', 'camera', 'gear', 'replace', 'upgrade', 'broken'],
    speaker: 'ntikuma',
    message: `Your equipment will fail. The only question is whether you're ready.

**Common creator equipment lifecycles:**
• Laptop: 3-5 years (£800-2,500)
• Camera: 5-7 years (£500-3,000)
• Phone: 2-3 years (£300-1,200)
• Software: Ongoing subscriptions
• Peripherals: 2-4 years (£200-500)

**The Equipment Fund Calculation:**

Total equipment value: £4,000 (example)
Average replacement cycle: 4 years
Annual replacement cost: £1,000
Monthly set-aside: £83 (or ~3% of typical creator income)

**When equipment dies:**
Without fund: "I can't work until I find £1,500 for a new laptop"
With fund: "Good thing I've been setting aside for this"

**Bonus:**
Equipment fund money can also cover repairs, not just replacement.`,
    suggestions: ['Calculate my equipment needs', 'My laptop is dying', 'Add to my funds'],
    actions: [
      { id: 'calc', label: 'Equipment Fund Calculator', type: 'modal', target: 'equipment-calculator', primary: true }
    ],
    setAsidePercent: 3
  },

  // ==========================================
  // PROFESSIONAL DEVELOPMENT - NEW
  // ==========================================
  {
    id: 'professional-development',
    topic: 'professional-development',
    trigger: ['training', 'courses', 'learning', 'skills', 'development', 'upskill', 'education'],
    speaker: 'maya',
    message: `Your skills are your business. Investing in them isn't optional—it's survival.

**What employees get:**
• Training budgets (£500-2,000/year typical)
• Paid time for courses
• Conference attendance
• Professional certifications

**Building your Professional Development Fund:**

**Monthly set-aside: 2% of income**

Example (£30k income):
• Annual budget: £600
• Monthly: £50

**What this covers:**
• Online courses (Skillshare, LinkedIn Learning, Udemy)
• Certifications
• Books and resources
• Conference tickets
• Coaching sessions
• Industry memberships

**The compound effect:**
£600/year in skill development can increase your rates by £2-5k/year.

**Pro tip:**
Professional development expenses are tax-deductible if related to your work!`,
    suggestions: ['Set up development fund', 'What courses?', 'Tax deduction?'],
    actions: [
      { id: 'start', label: 'Start Dev Fund', type: 'modal', target: 'profdev-setup', primary: true }
    ],
    setAsidePercent: 2
  },

  // ==========================================
  // INSURANCE - NEW
  // ==========================================
  {
    id: 'insurance-overview',
    topic: 'insurance',
    trigger: ['insurance', 'indemnity', 'liability', 'covered', 'protect', 'sued'],
    speaker: 'ntikuma',
    message: `Insurance is the protection you hope you never need but must have.

**Essential creator insurance:**

**1. Professional Indemnity (£30-100/month)**
Covers claims of negligence, mistakes, bad advice.
Essential if you: Give advice, create content for clients, provide services.

**2. Public Liability (£5-15/month)**
Covers injury or damage at events, meetings, shoots.
Essential if you: Meet clients in person, do events, have a studio.

**3. Equipment Insurance (£10-30/month)**
Covers theft, damage, breakdown of gear.
Essential if you: Own expensive equipment, travel with gear.

**4. Income Protection (£30-80/month)**
Covers long-term illness (beyond what sick pay circle covers).
Essential if you: Have dependents, mortgage, significant fixed costs.

**5. Critical Illness (varies)**
Lump sum if diagnosed with serious illness.
Consider if you: Have family responsibilities.

**Combined packages often cheaper than separate policies.**

Want me to help you identify what you actually need?`,
    suggestions: ['What do I need?', 'Get quotes', 'I have some already'],
    actions: [
      { id: 'assess', label: 'Insurance Assessment', type: 'modal', target: 'insurance-needs', primary: true }
    ]
  },

  // ==========================================
  // INCOME SMOOTHING - NEW
  // ==========================================
  {
    id: 'income-smoothing',
    topic: 'income-smoothing',
    trigger: ['irregular income', 'feast or famine', 'variable', 'inconsistent', 'months differ', 'uneven'],
    speaker: 'ntikuma',
    message: `I see this pattern constantly: £5k one month, £800 the next. It's exhausting.

**The Income Smoothing Strategy:**

**Step 1: Calculate your baseline**
Average last 6-12 months income = your "salary"

**Step 2: Good months → buffer**
Income above baseline goes into smoothing account

**Step 3: Bad months → draw down**
Pay yourself baseline from smoothing account

**Example:**
• Baseline: £2,500/month
• March income: £4,000 → £1,500 to buffer
• April income: £1,200 → Take £1,300 from buffer
• You paid yourself £2,500 both months

**The psychology matters:**
Consistent income = better decisions, less stress, sustainable creativity.

**Advanced:**
Combine with your other set-asides. All percentages come off gross, smoothing happens on what's left.`,
    suggestions: ['Calculate my baseline', 'Set up smoothing', 'What if buffer runs out?'],
    actions: [
      { id: 'setup', label: 'Set Up Income Smoothing', type: 'modal', target: 'smoothing-setup', primary: true }
    ]
  },

  // ==========================================
  // INVOICE & EXPENSE (existing, enhanced)
  // ==========================================
  {
    id: 'invoice-help',
    topic: 'invoice-help',
    trigger: ['create invoice', 'invoice help', 'bill client', 'get paid'],
    speaker: 'ntikuma',
    message: `Getting paid starts with a proper invoice. Here's what I've seen work:

**Essential Elements:**
✓ Your business name & contact
✓ Client's name & address  
✓ Unique invoice number (INV-2024-001)
✓ Date & due date
✓ Clear description of work
✓ Amount & payment terms
✓ Your bank details (or payment link)

**Pro Tips:**
• Send immediately when work is complete
• "Due on receipt" gets paid faster than "Net 30"
• Follow up at 7 days, firmly at 14
• Keep copies of everything

**The late payment epidemic:**
Average UK B2B payment time: 43 days.
Your terms won't always be respected. Budget for this.`,
    suggestions: ['Create invoice now', 'What payment terms?', 'Client won\'t pay'],
    actions: [
      { id: 'create', label: 'Create Invoice', type: 'link', target: '/finance/invoice', primary: true }
    ]
  },
  {
    id: 'invoice-chase',
    topic: 'invoice-help',
    trigger: ['not paid', 'late payment', 'chase invoice', 'client owes'],
    speaker: 'maya',
    message: `Late payments are frustrating. I know. Here's a professional approach:

**Week 1:** Friendly reminder
"Hi [Name], just checking you received invoice #123 for £X. Let me know if you have any questions!"

**Week 2:** Firmer follow-up
"Hi [Name], invoice #123 is now overdue. Please arrange payment within 7 days."

**Week 3+:** Final notice
"Invoice #123 remains unpaid. If not settled within 7 days, I'll need to consider further action."

**Your Rights:**
• Charge interest (8% + Bank of England base rate)
• Claim £40-100 compensation for late payment
• Small claims court for amounts under £10,000

**The emotional reality:**
Chasing money feels awful. It's not personal—it's business. You delivered value. You deserve to be paid.`,
    suggestions: ['Draft chasing email', 'My legal rights', 'Prevent this next time']
  },
  {
    id: 'expense-tracking',
    topic: 'expense-tracking',
    trigger: ['track expense', 'log expense', 'business expense', 'claim expense', 'deduction'],
    speaker: 'ntikuma',
    message: `Expense tracking can save you hundreds in tax. Here's what most creators miss:

**Commonly Forgotten Expenses:**
📱 Phone bill (business %)
🏠 Home office (£6/week flat rate OR actual costs)
🚗 Travel to meetings/events (45p/mile first 10k)
💻 Software subscriptions
📚 Books & courses (if work-related)
☕ Client meetings (reasonable meals)
🔌 Equipment and peripherals
📦 Shipping and packaging
🎨 Stock photos, fonts, assets

**The pattern I see:**
Creators under-claim by £1,000-3,000/year. That's £200-600 in unnecessary tax.

**Golden rule:**
If you need it to do your work, it's probably deductible. When in doubt, track it.`,
    suggestions: ['Log an expense', 'Home office explained', 'What about my car?'],
    actions: [
      { id: 'log', label: 'Log Expense', type: 'link', target: '/finance/expenses', primary: true }
    ]
  },

  // ==========================================
  // GENERAL ADVICE - UPDATED
  // ==========================================
  {
    id: 'general-advice',
    topic: 'general-advice',
    trigger: ['help', 'advice', 'money', 'finance', 'what should I do', 'start'],
    speaker: 'ntikuma',
    message: `I'm Ntikuma. I watch the numbers so you can focus on creating. Here's what I can help with:

**💰 Tax & Compliance**
Calculate what you owe, set aside correctly, avoid January surprises.

**👴 Pension & Retirement**
Project your future, maximize tax relief, make time work for you.

**🛡️ Creator Protection Package**
The benefits employees get free — sick pay, holidays, parental leave, emergencies.

**📄 Invoices & Getting Paid**
Professional invoicing, chasing late payers, knowing your rights.

**🧾 Expenses & Deductions**
Track everything, reduce your tax bill, never miss a deduction.

**📊 Income Smoothing**
Turn feast-or-famine into predictable income.

**🔧 Equipment & Development**
Plan for replacements, invest in skills.

What's most pressing for you right now?`,
    suggestions: ['Calculate my full package', 'Start with tax', 'I need the protection package', 'Just expense tracking']
  }
];

// ============================================
// MAYA FINANCE COMPONENT
// ============================================

interface MayaFinanceProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialTopic?: MayaFinanceTopic;
  contextData?: Record<string, any>;
  position?: 'bottom-right' | 'bottom-left' | 'inline';
  creatorIncome?: number;
}

const MayaFinance: React.FC<MayaFinanceProps> = ({
  isOpen: controlledOpen,
  onClose,
  initialTopic,
  contextData,
  position = 'bottom-right',
  creatorIncome
}) => {
  // === Store Hooks ===
  const { preferences } = useMayaPreferences();
  const { activeEntity, routeToChild, setActiveEntity } = useMayaROV();
  const { trackAction } = useMayaTracking();
  const { openLoop, closeLoop } = useMayaOpenLoops();
  const addStoreMessage = useMayaStore((s) => s.addMessage);

  // === Local State ===
  const [isOpen, setIsOpen] = useState<boolean>(controlledOpen ?? false);
  const [messages, setMessages] = useState<Array<{
    type: 'maya' | 'user';
    content: string;
    node?: ConversationNode;
    speaker?: ActiveChild;
  }>>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentNode, setCurrentNode] = useState<ConversationNode | null>(null);
  const [protectionBreakdown, setProtectionBreakdown] = useState<CreatorProtectionBreakdown | null>(null);

  // Sync controlled open state
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen]);

  // Initialize with topic
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeNode = initialTopic
        ? MAYA_CONVERSATIONS.find(c => c.topic === initialTopic)
        : MAYA_CONVERSATIONS.find(c => c.id === 'general-advice');

      if (welcomeNode) {
        const speaker = welcomeNode.speaker || 'ntikuma';
        setMessages([{
          type: 'maya',
          content: welcomeNode.message,
          node: welcomeNode,
          speaker
        }]);
        setCurrentNode(welcomeNode);
        
        // Set active entity to speaker
        if (speaker !== 'maya') {
          setActiveEntity(speaker);
        }
      }

      // Calculate protection breakdown if income provided
      if (creatorIncome) {
        setProtectionBreakdown(calculateCreatorProtection(creatorIncome));
      }
    }
  }, [isOpen, initialTopic, creatorIncome]);

  // Find matching conversation
  const findConversation = (input: string): ConversationNode | null => {
    const lowerInput = input.toLowerCase();

    for (const conv of MAYA_CONVERSATIONS) {
      for (const trigger of conv.trigger) {
        if (lowerInput.includes(trigger.toLowerCase())) {
          return conv;
        }
      }
    }

    return MAYA_CONVERSATIONS.find(c => c.id === 'general-advice') || null;
  };

  // Handle user input
  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    trackAction('direction_action');

    const response = findConversation(inputValue);
    if (response) {
      setTimeout(() => {
        const speaker = response.speaker || 'ntikuma';
        setMessages(prev => [...prev, {
          type: 'maya',
          content: response.message,
          node: response,
          speaker
        }]);
        setCurrentNode(response);

        // Switch active entity if needed
        if (speaker !== activeEntity) {
          setActiveEntity(speaker);
        }

        // Log to store
        addStoreMessage(
          `Finance topic: ${response.topic}`,
          'narration',
          { childId: speaker, domain: 'financial' }
        );
      }, 500);
    }

    setInputValue('');
  }, [inputValue, trackAction, addStoreMessage, activeEntity, setActiveEntity]);

  // Handle suggestion click
  const handleSuggestion = useCallback((suggestion: string) => {
    setMessages(prev => [...prev, { type: 'user', content: suggestion }]);
    trackAction('direction_action');

    const response = findConversation(suggestion);
    if (response) {
      setTimeout(() => {
        const speaker = response.speaker || 'ntikuma';
        setMessages(prev => [...prev, {
          type: 'maya',
          content: response.message,
          node: response,
          speaker
        }]);
        setCurrentNode(response);

        if (speaker !== activeEntity) {
          setActiveEntity(speaker);
        }
      }, 500);
    }
  }, [trackAction, activeEntity, setActiveEntity]);

  // Handle action
  const handleAction = useCallback((action: MayaAction) => {
    if (action.type === 'link') {
      window.location.href = action.target;
    } else if (action.type === 'modal') {
      // Open modal - would integrate with your modal system
      console.log('Open modal:', action.target);
      openLoop('ntikuma', action.target, `Finance action: ${action.label}`);
    } else if (action.type === 'function') {
      console.log('Execute function:', action.target);
    }
  }, [openLoop]);

  // Close handler
  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // Toggle handler
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  // Get speaker info
  const getSpeakerInfo = (speaker?: ActiveChild) => {
    const speakers: Record<ActiveChild, { emoji: string; name: string }> = {
      maya: { emoji: '👩🏿‍🦱', name: 'Maya' },
      ntikuma: { emoji: '📊', name: 'Ntikuma' },
      kweku: { emoji: '🎯', name: 'Kweku' },
      kofi: { emoji: '🔧', name: 'Kofi' },
      afua: { emoji: '🎙️', name: 'Afua' },
      anansewa: { emoji: '🎭', name: 'Anansewa' },
      yaw: { emoji: '📝', name: 'Yaw' },
      esi: { emoji: '📚', name: 'Esi' },
      kumi: { emoji: '🎮', name: 'Kumi' },
      adaeze: { emoji: '✂️', name: 'Adaeze' },
      nyame: { emoji: '⚖️', name: 'Nyame' },
      osei: { emoji: '✊', name: 'Osei' },
      akua: { emoji: '📜', name: 'Akua' }
    };
    return speakers[speaker || 'ntikuma'] || speakers.ntikuma;
  };

  // Format message with markdown-like syntax
  const formatMessage = (content: string): React.ReactNode => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Tables (simple detection)
      if (line.includes('|') && line.includes('---')) {
        return null; // Skip separator rows
      }
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter(c => c.trim());
        return (
          <div key={i} className="maya-table-row">
            {cells.map((cell, j) => (
              <span key={j} className="maya-table-cell">{cell.trim()}</span>
            ))}
          </div>
        );
      }

      // Bold
      if (line.includes('**')) {
        const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
      }

      // List items
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('✓')) {
        return <p key={i} className="maya-list-item">{line}</p>;
      }

      // Numbered items
      if (/^\d+\./.test(line)) {
        return <p key={i} className="maya-list-item">{line}</p>;
      }

      // Empty line
      if (!line.trim()) {
        return <br key={i} />;
      }

      return <p key={i}>{line}</p>;
    });
  };

  // Don't render if Maya is disabled
  if (!preferences.mayaEnabled) return null;

  // Get current speaker
  const currentSpeaker = getSpeakerInfo(currentNode?.speaker);

  if (position === 'inline') {
    return (
      <div className="maya-finance maya-finance-inline">
        <div className="maya-messages">
          {messages.map((msg, i) => {
            const speaker = getSpeakerInfo(msg.speaker);
            return (
              <div key={i} className={`maya-message maya-message-${msg.type}`}>
                {msg.type === 'maya' && (
                  <span className="maya-avatar" title={speaker.name}>
                    {speaker.emoji}
                  </span>
                )}
                <div className="maya-message-content">
                  {formatMessage(msg.content)}
                </div>
              </div>
            );
          })}
        </div>

        {currentNode?.suggestions && (
          <div className="maya-suggestions">
            {currentNode.suggestions.map((sug, i) => (
              <button key={i} onClick={() => handleSuggestion(sug)}>
                {sug}
              </button>
            ))}
          </div>
        )}

        {currentNode?.actions && (
          <div className="maya-actions">
            {currentNode.actions.map((action, i) => (
              <button
                key={i}
                className={action.primary ? 'maya-action-primary' : 'maya-action-secondary'}
                onClick={() => handleAction(action)}
              >
                {action.label}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}

        {/* Set-aside indicator */}
        {currentNode?.setAsidePercent !== undefined && (
          <div className="maya-set-aside-indicator">
            <Target size={14} />
            <span>Recommended set-aside: {currentNode.setAsidePercent}%</span>
          </div>
        )}

        <div className="maya-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask ${currentSpeaker.name} about finance...`}
          />
          <button onClick={handleSend} disabled={!inputValue.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className={`maya-fab maya-fab-${position}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close finance chat' : 'Open finance chat'}
      >
        {isOpen ? <X size={24} /> : <Calculator size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`maya-finance maya-finance-floating maya-finance-${position}`}>
          <div className="maya-header">
            <span className="maya-header-avatar">{currentSpeaker.emoji}</span>
            <div className="maya-header-info">
              <span className="maya-header-name">{currentSpeaker.name}</span>
              <span className="maya-header-status">Finance Guide</span>
            </div>
            <button className="maya-header-close" onClick={handleClose}>
              <X size={20} />
            </button>
          </div>

          {/* Protection Score (if calculated) */}
          {protectionBreakdown && (
            <div className="maya-protection-score">
              <div className="protection-score-value">
                <Shield size={16} />
                <span>Protection Score: {protectionBreakdown.protectionScore}/100</span>
              </div>
              <div className="protection-score-bar">
                <div
                  className="protection-score-fill"
                  style={{ width: `${protectionBreakdown.protectionScore}%` }}
                />
              </div>
            </div>
          )}

          <div className="maya-messages">
            {messages.map((msg, i) => {
              const speaker = getSpeakerInfo(msg.speaker);
              return (
                <div key={i} className={`maya-message maya-message-${msg.type}`}>
                  {msg.type === 'maya' && (
                    <span className="maya-avatar" title={speaker.name}>
                      {speaker.emoji}
                    </span>
                  )}
                  <div className="maya-message-content">
                    {formatMessage(msg.content)}
                  </div>
                </div>
              );
            })}
          </div>

          {currentNode?.suggestions && (
            <div className="maya-suggestions">
              {currentNode.suggestions.map((sug, i) => (
                <button key={i} onClick={() => handleSuggestion(sug)}>
                  {sug}
                </button>
              ))}
            </div>
          )}

          {currentNode?.actions && (
            <div className="maya-actions">
              {currentNode.actions.map((action, i) => (
                <button
                  key={i}
                  className={action.primary ? 'maya-action-primary' : 'maya-action-secondary'}
                  onClick={() => handleAction(action)}
                >
                  {action.label}
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          )}

          {/* Set-aside indicator */}
          {currentNode?.setAsidePercent !== undefined && (
            <div className="maya-set-aside-indicator">
              <Target size={14} />
              <span>Recommended set-aside: {currentNode.setAsidePercent}%</span>
            </div>
          )}

          <div className="maya-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${currentSpeaker.name}...`}
            />
            <button onClick={handleSend} disabled={!inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// CONTEXTUAL PROMPTS COMPONENT
// ============================================

interface MayaPromptProps {
  type: 'tip' | 'warning' | 'success' | 'insight';
  title: string;
  message: string;
  actions?: MayaAction[];
  onDismiss?: () => void;
  speaker?: ActiveChild;
}

export const MayaPrompt: React.FC<MayaPromptProps> = ({
  type,
  title,
  message,
  actions,
  onDismiss,
  speaker = 'ntikuma'
}) => {
  const icons = {
    tip: Lightbulb,
    warning: AlertTriangle,
    success: CheckCircle,
    insight: TrendingUp
  };

  const Icon = icons[type];

  const speakerEmoji: Record<ActiveChild, string> = {
    maya: '👩🏿‍🦱',
    ntikuma: '📊',
    kweku: '🎯',
    kofi: '🔧',
    afua: '🎙️',
    anansewa: '🎭',
    yaw: '📝',
    esi: '📚',
    kumi: '🎮',
    adaeze: '✂️',
    nyame: '⚖️',
    osei: '✊',
    akua: '📜'
  };

  return (
    <div className={`maya-prompt maya-prompt-${type}`}>
      <div className="maya-prompt-speaker">
        <span>{speakerEmoji[speaker]}</span>
      </div>
      <div className="maya-prompt-icon">
        <Icon size={20} />
      </div>
      <div className="maya-prompt-content">
        <span className="maya-prompt-title">{title}</span>
        <p className="maya-prompt-message">{message}</p>
        {actions && (
          <div className="maya-prompt-actions">
            {actions.map((action, i) => (
              <button key={i} className={action.primary ? 'primary' : ''}>
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {onDismiss && (
        <button className="maya-prompt-dismiss" onClick={onDismiss}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

// ============================================
// PROTECTION PACKAGE SUMMARY COMPONENT
// ============================================

interface ProtectionSummaryProps {
  income: number;
  options?: {
    includePension?: boolean;
    includeParentalLeave?: boolean;
    includeProfDev?: boolean;
    emergencyMonths?: number;
  };
}

export const ProtectionSummary: React.FC<ProtectionSummaryProps> = ({
  income,
  options
}) => {
  const breakdown = calculateCreatorProtection(income, options);

  const items = [
    { label: 'Tax Reserve', amount: breakdown.tax, icon: Receipt },
    { label: 'National Insurance', amount: breakdown.nationalInsurance, icon: FileText },
    { label: 'Pension', amount: breakdown.pension, icon: PiggyBank },
    { label: 'Holiday Fund', amount: breakdown.holidayFund, icon: Calendar },
    { label: 'Sick Pay Circle', amount: breakdown.sickPayCircle, icon: Heart },
    { label: 'Emergency Fund', amount: breakdown.emergencyFund, icon: Umbrella },
    { label: 'Equipment Fund', amount: breakdown.equipmentFund, icon: Wrench },
    { label: 'Professional Dev', amount: breakdown.professionalDevelopment, icon: GraduationCap },
    { label: 'Insurance', amount: breakdown.insurance, icon: Shield },
  ].filter(item => item.amount > 0);

  return (
    <div className="protection-summary">
      <div className="protection-header">
        <h3>Your Creator Protection Package</h3>
        <div className="protection-score">
          <Shield size={20} />
          <span>{breakdown.protectionScore}/100</span>
        </div>
      </div>

      <div className="protection-items">
        {items.map((item, i) => (
          <div key={i} className="protection-item">
            <item.icon size={16} />
            <span className="item-label">{item.label}</span>
            <span className="item-amount">£{item.amount.toFixed(0)}</span>
          </div>
        ))}
      </div>

      <div className="protection-totals">
        <div className="total-row">
          <span>Gross Monthly</span>
          <span>£{breakdown.grossIncome.toFixed(0)}</span>
        </div>
        <div className="total-row">
          <span>Total Set-Aside</span>
          <span>£{breakdown.totalSetAside.toFixed(0)}</span>
        </div>
        <div className="total-row spendable">
          <span>Spendable Income</span>
          <span>£{breakdown.spendableIncome.toFixed(0)}</span>
        </div>
      </div>

      <p className="protection-note">
        This is what employment actually costs. The difference: you keep what you don't use.
      </p>
    </div>
  );
};

// ============================================
// MAYA HOOKS FOR CONTEXTUAL TRIGGERS
// ============================================

export const useMayaFinance = () => {
  const [prompt, setPrompt] = useState<MayaPromptProps | null>(null);
  const { trackAction } = useMayaTracking();

  const showTaxTip = (taxDue: number, taxSaved: number) => {
    const shortfall = taxDue - taxSaved;
    if (shortfall > 0) {
      setPrompt({
        type: 'warning',
        title: 'Tax Pot Shortfall',
        message: `Your tax pot is £${shortfall.toLocaleString()} short. Transfer £${Math.ceil(shortfall / 4)} weekly to catch up before January.`,
        speaker: 'ntikuma',
        actions: [
          { id: 'fix', label: 'Set up transfer', type: 'function', target: 'setupTransfer', primary: true }
        ]
      });
      trackAction('direction_action');
    }
  };

  const showExpenseTip = (monthlyExpenses: number) => {
    if (monthlyExpenses < 100) {
      setPrompt({
        type: 'tip',
        title: 'Missing Expenses?',
        message: "You've logged fewer expenses than usual. Don't forget home office (£24/month free!), phone, and software.",
        speaker: 'ntikuma',
        actions: [
          { id: 'add', label: 'Add expenses', type: 'link', target: '/finance/expenses', primary: true }
        ]
      });
    }
  };

  const showInvoicePaid = (amount: number, breakdown: CreatorProtectionBreakdown) => {
    setPrompt({
      type: 'success',
      title: 'Invoice Paid!',
      message: `£${amount.toLocaleString()} received. Protection funds set aside automatically. Spendable: £${breakdown.spendableIncome.toFixed(0)}`,
      speaker: 'ntikuma',
      actions: [
        { id: 'view', label: 'View breakdown', type: 'modal', target: 'breakdown' }
      ]
    });
  };

  const showProtectionGap = (missingProtections: string[]) => {
    setPrompt({
      type: 'insight',
      title: 'Protection Gap Detected',
      message: `You're missing: ${missingProtections.join(', ')}. Employees get these free. Would you like to set them up?`,
      speaker: 'ntikuma',
      actions: [
        { id: 'setup', label: 'Set up protection', type: 'link', target: '/finance/protection', primary: true },
        { id: 'later', label: 'Remind me later', type: 'function', target: 'remindLater' }
      ]
    });
  };

  const showParentalLeaveReminder = () => {
    setPrompt({
      type: 'tip',
      title: 'Parental Leave Planning',
      message: 'Building a parental leave fund takes 2-3 years. If children might be in your future, start now.',
      speaker: 'maya',
      actions: [
        { id: 'start', label: 'Start planning', type: 'link', target: '/finance/parental', primary: true },
        { id: 'not-now', label: 'Not applicable', type: 'function', target: 'dismiss' }
      ]
    });
  };

  const dismissPrompt = () => setPrompt(null);

  return {
    prompt,
    showTaxTip,
    showExpenseTip,
    showInvoicePaid,
    showProtectionGap,
    showParentalLeaveReminder,
    dismissPrompt,
    calculateCreatorProtection
  };
};

export default MayaFinance;