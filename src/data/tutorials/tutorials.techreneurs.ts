/**
 * TECHRENEURS TUTORIALS
 * =====================
 * 
 * 3 free tutorials per pathway = 9 free total
 * ROV-B (Business) guide throughout
 */

import { Tutorial } from './index';

export const TECHRENEURS_TUTORIALS: Tutorial[] = [
  // ========================================
  // BUSINESS FOUNDATIONS PATHWAY
  // ========================================
  {
    id: 'business-name-registration',
    slug: 'business-name-registration',
    title: 'Registering Your Business Name',
    description: 'Sole trader vs limited company. When to register, how to register, and what it actually means.',
    icon: '📋',
    programmes: ['techreneurs'],
    primaryProgramme: 'techreneurs',
    pathway: 'Business Foundations',
    tags: ['business', 'registration', 'legal', 'sole trader'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Do You Need to Register?', description: 'If earning over £1,000/year from self-employment, you must register with HMRC. Under that, it\'s "trading allowance."', tip: 'Even under £1,000, registering shows you\'re serious.' },
      { step: 2, title: 'Sole Trader vs Limited Company', description: 'Sole trader: simple, you ARE the business. Limited: separate legal entity, more paperwork, more protection.', rovPrompt: 'Which is better for someone just starting out?' },
      { step: 3, title: 'Choosing Your Business Name', description: 'Sole traders can use own name or trading name. Check Companies House that name isn\'t taken. Check domain availability.', tip: 'Keep it simple, memorable, and easy to spell.' },
      { step: 4, title: 'Register as Sole Trader', description: 'Go to gov.uk/register-for-self-assessment. You need National Insurance number and personal details. Takes 10 minutes.', checkpoint: true },
      { step: 5, title: 'Get Your UTR', description: 'Unique Taxpayer Reference arrives by post in 10 days. Keep this safe—you\'ll need it for tax returns.' },
      { step: 6, title: 'Understand Your Obligations', description: 'File tax return annually (by 31 January). Pay tax and National Insurance. Keep records for 5 years.' },
      { step: 7, title: 'Business Bank Account', description: 'Not legally required for sole traders, but HIGHLY recommended. Keeps personal and business money separate.', tip: 'Starling, Monzo, Tide offer free business accounts.' },
      { step: 8, title: 'What About VAT?', description: 'Only register if turnover exceeds £85,000. Below that, voluntary. Most small creative businesses don\'t need VAT.', tip: 'Don\'t register for VAT unless you have to—adds complexity.' }
    ],
    tools: [
      { name: 'National Insurance number', price: 'You have this', essential: true },
      { name: 'gov.uk account', price: 'Free', essential: true },
      { name: 'Business bank account', price: 'Free', essential: true }
    ],
    commonMistakes: ['Not registering when required', 'Mixing personal and business money', 'Registering as limited too early', 'Forgetting to file tax return', 'Not keeping receipts'],
    freeAccess: true,
    kit: { name: 'Business Starter Pack', slug: 'business-starter', price: '£14.99', contents: ['Registration checklist', 'Record keeping templates', 'Tax calendar', 'Business account comparison guide'] },
    workshop: { title: 'Business Basics Workshop', duration: '1 hour', price: '£20', format: 'zoom', bookingSlug: 'business-basics' },
    nextTutorials: ['simple-bookkeeping', 'tax-basics-self-employed'],
    badgeAwarded: 'registered-business',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'simple-bookkeeping',
    slug: 'simple-bookkeeping',
    title: 'Simple Bookkeeping for Creatives',
    description: 'You don\'t need an accountant to start. Learn to track income and expenses simply and effectively.',
    icon: '📒',
    programmes: ['techreneurs', 'stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'techreneurs',
    pathway: 'Business Foundations',
    tags: ['bookkeeping', 'accounting', 'records', 'expenses'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Why Keep Records?', description: 'Legal requirement (5 years). Know if you\'re making money. Reduce tax bill with legitimate expenses. Sleep at night.', tip: 'Good records = less stress at tax time.' },
      { step: 2, title: 'What to Track', description: 'Every penny IN (sales, payments, gifts). Every penny OUT (materials, tools, travel, subscriptions). Date, amount, what for.' },
      { step: 3, title: 'Choose Your System', description: 'Spreadsheet (free, flexible). Wave/FreeAgent (free accounting software). Notebook (works but harder to search).', rovPrompt: 'Show me the simplest spreadsheet setup.' },
      { step: 4, title: 'Set Up Your Spreadsheet', description: 'Columns: Date, Description, Category, Income, Expense, Running Balance. One row per transaction.', checkpoint: true },
      { step: 5, title: 'Expense Categories', description: 'Materials/Stock, Tools/Equipment, Travel, Marketing, Software/Subscriptions, Training, Professional Services, Other.', tip: 'Keep categories consistent—makes tax return easier.' },
      { step: 6, title: 'Keep Receipts', description: 'Photo everything immediately. Use an app like Receipt Bank or just phone camera + folder. Paper fades, phones don\'t.', warning: 'No receipt = HMRC may disallow the expense.' },
      { step: 7, title: 'Weekly Habit', description: 'Set 15 minutes weekly to update records. Don\'t let it pile up. Friday afternoon or Monday morning.', tip: 'Calendar reminder. Make it non-negotiable.' },
      { step: 8, title: 'Monthly Review', description: 'End of month: total income, total expenses, profit. Are you actually making money? Any surprises?', tip: 'This is where most people realize they\'re undercharging.' }
    ],
    tools: [
      { name: 'Google Sheets/Excel', price: 'Free', essential: true },
      { name: 'Receipt photo app', price: 'Free', essential: true },
      { name: 'Calculator', price: 'Phone has one', essential: true }
    ],
    commonMistakes: ['Not tracking small expenses', 'Mixing personal and business', 'Letting receipts pile up', 'Forgetting cash transactions', 'Not reviewing monthly'],
    freeAccess: true,
    kit: { name: 'Bookkeeping Template Pack', slug: 'bookkeeping-templates', price: '£9.99', contents: ['Income/expense spreadsheet', 'Invoice template', 'Receipt tracker', 'Tax summary sheet', 'Category guide'] },
    workshop: { title: 'Bookkeeping for Beginners', duration: '1 hour', price: '£20', format: 'zoom', bookingSlug: 'bookkeeping-basics' },
    nextTutorials: ['tax-basics-self-employed', 'calculating-your-rate'],
    badgeAwarded: 'bookkeeper',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'tax-basics-self-employed',
    slug: 'tax-basics-self-employed',
    title: 'Tax Basics for Self-Employed',
    description: 'Income tax, National Insurance, tax returns, and allowable expenses. Everything you need to know.',
    icon: '🧾',
    programmes: ['techreneurs'],
    primaryProgramme: 'techreneurs',
    pathway: 'Business Foundations',
    tags: ['tax', 'self-employed', 'hmrc', 'national insurance'],
    difficulty: 'beginner',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'How Self-Employment Tax Works', description: 'You pay Income Tax on profits (income minus expenses). Plus Class 2 and Class 4 National Insurance. All via tax return.' },
      { step: 2, title: 'The Tax Year', description: '6 April to 5 April. Tax return deadline: 31 January following. So 2024-25 year: return due 31 Jan 2026.', warning: 'Late filing = automatic £100 fine. More if very late.' },
      { step: 3, title: 'Personal Allowance', description: 'First £12,570 is tax-free (2024-25). You only pay tax on profit ABOVE this. If employed too, may already be used.', tip: 'This is why many part-time creatives pay little tax.' },
      { step: 4, title: 'Tax Rates', description: 'Basic rate: 20% on £12,571-50,270. Higher rate: 40% above that. Most creative side businesses stay in basic rate.' },
      { step: 5, title: 'Allowable Expenses', description: 'Materials, tools, travel to clients, portion of phone/internet, training, professional memberships, marketing.', rovPrompt: 'What expenses can I claim for my specific business?' },
      { step: 6, title: 'Expenses You Can\'t Claim', description: 'Commuting to regular workplace, clothing (unless costume), entertaining clients (meals out), fines/penalties.', warning: 'Don\'t claim personal expenses as business—it\'s fraud.' },
      { step: 7, title: 'Payment on Account', description: 'If tax bill over £1,000, HMRC wants advance payments. Can be a surprise in year 2. Budget for it.', tip: 'Save 25-30% of profit for tax. Open a separate savings pot.' },
      { step: 8, title: 'Getting Help', description: 'TaxAid (free for low income). HMRC helpline. Local accountants. Worth paying for help first year.', tip: 'A good accountant saves more than they cost.' }
    ],
    tools: [
      { name: 'HMRC online account', price: 'Free', essential: true },
      { name: 'Records from bookkeeping', price: 'You have this', essential: true },
      { name: 'Calculator', price: 'Free', essential: true }
    ],
    commonMistakes: ['Not saving for tax bill', 'Missing deadline', 'Not claiming legitimate expenses', 'Claiming personal expenses', 'Forgetting payment on account'],
    freeAccess: true,
    workshop: { title: 'Tax for Creatives', duration: '1.5 hours', price: '£25', format: 'zoom', bookingSlug: 'tax-creatives' },
    nextTutorials: ['calculating-your-rate', 'creating-quotes'],
    badgeAwarded: 'tax-aware',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // PRICING & SALES PATHWAY
  // ========================================
  {
    id: 'calculating-your-rate',
    slug: 'calculating-your-rate',
    title: 'Calculating Your Rate',
    description: 'How to set rates that value your time, cover your costs, and still get customers. The maths of sustainable income.',
    icon: '💷',
    programmes: ['techreneurs', 'stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pricing & Sales',
    tags: ['pricing', 'rates', 'value', 'income'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Know Your Target Income', description: 'What do you need to live? What do you want to earn? Be honest. Include tax, savings, holidays.', tip: 'Minimum wage in 2024 is £11.44/hour. You\'re worth more.' },
      { step: 2, title: 'Calculate Billable Hours', description: 'You can\'t bill every hour. Marketing, admin, travel, learning. Realistically 50-60% billable.', rovPrompt: 'How do I figure out my realistic billable hours?' },
      { step: 3, title: 'The Basic Formula', description: 'Target Income ÷ Billable Hours = Minimum Rate. E.g., £24,000 ÷ 1,000 hours = £24/hour minimum.', checkpoint: true },
      { step: 4, title: 'Add Your Costs', description: 'Materials, tools, software, travel, insurance. These are ON TOP of your rate, or factored in.', tip: 'Track actual costs for 3 months to know real numbers.' },
      { step: 5, title: 'Research Market Rates', description: 'What do others charge? Too low = suspicious, unsustainable. Too high = no work. Find the middle.', tip: 'Ask in maker communities. Check programme rate guides.' },
      { step: 6, title: 'Value vs Time Pricing', description: 'Some jobs are worth more than time suggests. Quick job that solves big problem = charge for value, not time.' },
      { step: 7, title: 'Build In Profit', description: 'Your rate covers costs and pays you. Profit is extra for growth, emergencies, investment. Add 10-20%.', tip: 'If there\'s no profit, you have a hobby, not a business.' },
      { step: 8, title: 'Review Quarterly', description: 'Are you too busy? Raise rates. No work? Check value proposition (don\'t just lower rates). Skills improved? Charge more.', tip: 'Tell existing customers before raising rates.' }
    ],
    tools: [
      { name: 'Calculator', price: 'Free', essential: true },
      { name: 'Expense records', price: 'From bookkeeping', essential: true },
      { name: 'Market rate research', price: 'Free', essential: true }
    ],
    commonMistakes: ['Undercharging to get work', 'Not counting all hours', 'Forgetting expenses', 'Comparing to employed salary', 'Never raising rates'],
    freeAccess: true,
    kit: { name: 'Pricing Calculator Pack', slug: 'pricing-pack', price: '£12.99', contents: ['Rate calculator spreadsheet', 'Market rate guide', 'Pricing scripts', 'Value justification templates'] },
    workshop: { title: 'Pricing Masterclass', duration: '1.5 hours', price: '£30', format: 'zoom', bookingSlug: 'pricing-masterclass' },
    nextTutorials: ['creating-quotes', 'handling-negotiations'],
    badgeAwarded: 'pricing-pro',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'creating-quotes',
    slug: 'creating-quotes',
    title: 'Creating Professional Quotes',
    description: 'Turn enquiries into bookings with clear, professional quotes that protect you and inform customers.',
    icon: '📝',
    programmes: ['techreneurs', 'stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pricing & Sales',
    tags: ['quotes', 'proposals', 'sales', 'professional'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'What Is a Quote?', description: 'A quote is a promise of price for defined work. It protects both parties. Verbal quotes are forgotten—write it down.' },
      { step: 2, title: 'Essential Elements', description: 'Your name/business, customer name, date, description of work, price, what\'s included, what\'s NOT included, validity period.' },
      { step: 3, title: 'Describe the Work Clearly', description: 'Be specific. "Repair dress" is vague. "Replace zip in navy cocktail dress, approx 16 inches" is clear.', tip: 'Specificity prevents "but I thought you\'d also..." conversations.' },
      { step: 4, title: 'Itemize When Helpful', description: 'Complex jobs: break down costs. Labour, materials, travel. Shows value, builds trust.', checkpoint: true },
      { step: 5, title: 'State What\'s NOT Included', description: 'Explicitly say what the price doesn\'t cover. "Does not include additional alterations discovered during fitting."', rovPrompt: 'How do I word exclusions professionally?' },
      { step: 6, title: 'Payment Terms', description: 'When is payment due? Deposit required? Payment methods? Late payment policy? State clearly.', tip: '50% deposit on booking is standard for custom work.' },
      { step: 7, title: 'Validity Period', description: 'Quote valid for 14/30 days. After that, re-quote. Material prices change. Your availability changes.' },
      { step: 8, title: 'Send and Follow Up', description: 'Send same day if possible. Follow up in 3-5 days if no response. Don\'t chase—inform.', tip: '"Just checking you received my quote" is fine.' }
    ],
    tools: [
      { name: 'Quote template', price: 'Free (create one)', essential: true },
      { name: 'Email/WhatsApp', price: 'Free', essential: true },
      { name: 'PDF creator', price: 'Free', essential: false }
    ],
    commonMistakes: ['Vague descriptions', 'Forgetting validity date', 'No deposit terms', 'Not following up', 'Changing price after quoting'],
    freeAccess: true,
    kit: { name: 'Quote Template Pack', slug: 'quote-templates', price: '£9.99', contents: ['Quote templates (3 styles)', 'Email scripts', 'Follow-up templates', 'Terms and conditions example'] },
    workshop: { title: 'Quotes That Convert', duration: '1 hour', price: '£20', format: 'zoom', bookingSlug: 'quotes-convert' },
    nextTutorials: ['handling-negotiations', 'customer-communication'],
    badgeAwarded: 'quote-creator',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'handling-negotiations',
    slug: 'handling-negotiations',
    title: 'Handling Price Negotiations',
    description: 'When customers ask for discounts, how do you respond? Scripts and strategies for protecting your value.',
    icon: '🤝',
    programmes: ['techreneurs', 'stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pricing & Sales',
    tags: ['negotiation', 'pricing', 'discounts', 'value'],
    difficulty: 'beginner',
    duration: '30 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Why People Negotiate', description: 'Some always ask (costs nothing to try). Some genuinely can\'t afford it. Some don\'t understand value. Different responses needed.' },
      { step: 2, title: 'The Pause', description: 'Don\'t respond immediately. "Let me think about that" or "I\'ll check what I can do." Gives you control.', tip: 'Instant "yes" to discount = you were overcharging.' },
      { step: 3, title: 'Never Discount Without Reason', description: 'If you lower price, remove something. "I can do £X if we skip the..." Otherwise you\'re saying original price was fake.', checkpoint: true },
      { step: 4, title: 'Script: "Can you do it cheaper?"', description: '"This price reflects the quality of work/materials. What aspects are most important to you?" Redirects to value.', rovPrompt: 'Give me more scripts for common negotiation situations.' },
      { step: 5, title: 'Script: "That\'s more than I expected"', description: '"What were you expecting to pay?" Understand their budget. Maybe scope needs adjusting, not price.' },
      { step: 6, title: 'When to Say No', description: 'If discount makes job unprofitable, decline gracefully. "I understand budget is tight. Unfortunately I can\'t go lower on this one."', tip: 'No job is better than losing money on a job.' },
      { step: 7, title: 'When to Say Yes', description: 'First-time customer you want to keep. Bulk/repeat work. Quiet period. Portfolio piece. YOUR choice, YOUR terms.' },
      { step: 8, title: 'Alternative Value', description: 'Instead of discount: faster delivery, added extra, payment plan, referral reward. Maintain price, add value.', tip: 'Adding value feels better than losing money.' }
    ],
    tools: [
      { name: 'Your pricing knowledge', price: 'From earlier tutorial', essential: true },
      { name: 'Negotiation scripts', price: 'In this tutorial', essential: true },
      { name: 'Confidence', price: 'Practice builds this', essential: true }
    ],
    commonMistakes: ['Discounting immediately', 'No reason for discount', 'Feeling guilty about prices', 'Taking it personally', 'Never saying no'],
    freeAccess: true,
    workshop: { title: 'Confident Pricing', duration: '1 hour', price: '£25', format: 'zoom', bookingSlug: 'confident-pricing' },
    nextTutorials: ['customer-communication', 'building-portfolio'],
    badgeAwarded: 'negotiator',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },

  // ========================================
  // PARDNER ECONOMICS PATHWAY
  // ========================================
  {
    id: 'pardner-basics',
    slug: 'pardner-basics',
    title: 'Understanding Pardner Economics',
    description: 'The Caribbean mutual aid system that built communities. How it works, why it matters, and how to adapt it.',
    icon: '🤲',
    programmes: ['techreneurs'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pardner Economics',
    tags: ['pardner', 'susu', 'mutual aid', 'collective', 'heritage'],
    difficulty: 'beginner',
    duration: '35 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    alternativeGuides: ['ROV-H'],
    steps: [
      { step: 1, title: 'What Is Pardner?', description: 'Rotating savings: group contributes regularly, one person receives the whole pot each round. Called pardner, susu, box hand across Caribbean.', rovPrompt: 'Tell me more about the history of pardner.' },
      { step: 2, title: 'How It Works', description: '10 people × £50/month = £500 pot. Each month, one person gets £500. After 10 months, everyone has received once.', tip: 'Order usually decided at start—first/last positions have advantages.' },
      { step: 3, title: 'Why It Works', description: 'Social pressure ensures payment. Community accountability. No interest. No banks. No credit checks. Trust-based.', checkpoint: true },
      { step: 4, title: 'Traditional Uses', description: 'School uniforms. Deposit for rental. Business startup. Christmas. Funerals. Big purchases that need lump sum.' },
      { step: 5, title: 'Modern Applications', description: 'Equipment purchases. Course fees. Studio setup. Marketing campaigns. Anything needing capital you\'d otherwise save slowly for.' },
      { step: 6, title: 'The Banker Role', description: 'Someone trustworthy organizes, collects, distributes. May take small fee or first/last hand. Responsibility + accountability.' },
      { step: 7, title: 'Risks and Mitigation', description: 'Late payments, dropouts, banker issues. Mitigation: written agreement, smaller trusted groups, clear consequences, transparent records.', warning: 'Only do pardner with people you genuinely trust.' },
      { step: 8, title: 'Adapting for Programmes', description: 'Tech Collective, Makers Pardner—same principle. Equipment, bulk buying, shared resources. Community economics work.' }
    ],
    tools: [
      { name: 'Trusted community', price: 'Priceless', essential: true },
      { name: 'Record keeping system', price: 'Free', essential: true },
      { name: 'Written agreement', price: 'Template provided', essential: true }
    ],
    commonMistakes: ['Too large a group', 'People you don\'t really know', 'No written records', 'No agreed consequences', 'Banker not trustworthy'],
    freeAccess: true,
    kit: { name: 'Pardner Starter Pack', slug: 'pardner-pack', price: '£7.99', contents: ['Agreement template', 'Tracking spreadsheet', 'Rules template', 'History booklet'] },
    workshop: { title: 'Setting Up Pardner', duration: '1 hour', price: '£15', format: 'zoom', bookingSlug: 'pardner-setup' },
    nextTutorials: ['setting-up-collective', 'managing-rotation'],
    badgeAwarded: 'pardner-understanding',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'setting-up-collective',
    slug: 'setting-up-collective',
    title: 'Setting Up a Makers Collective',
    description: 'Practical steps to start an equipment-sharing or resource-pooling collective in your programme.',
    icon: '👥',
    programmes: ['techreneurs', 'stemgeneers', 'silk-stilettos'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pardner Economics',
    tags: ['collective', 'cooperative', 'equipment', 'sharing'],
    difficulty: 'intermediate',
    duration: '40 mins',
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Define the Purpose', description: 'Equipment sharing? Bulk buying? Skills exchange? Space sharing? Be specific. One purpose to start.', tip: 'Start focused. Expand later.' },
      { step: 2, title: 'Find Your Founding Members', description: '4-8 people to start. Must be reliable, committed, trustworthy. Quality over quantity.', rovPrompt: 'How do I find the right people?' },
      { step: 3, title: 'Set Contribution Terms', description: 'Monthly fee? One-time buy-in? Time contribution? Make it affordable but meaningful.', checkpoint: true },
      { step: 4, title: 'Draft Simple Rules', description: 'How to join. How to leave. How decisions made. What happens if rules broken. Write it down, everyone signs.' },
      { step: 5, title: 'Equipment/Resource List', description: 'What does collective own? Where stored? Who maintains? Booking system? Damage responsibility?' },
      { step: 6, title: 'Financial Management', description: 'Separate account. Two signatories. Regular statements to members. Transparent, always.', warning: 'Money disputes kill collectives. Be scrupulous.' },
      { step: 7, title: 'Communication System', description: 'WhatsApp group? Monthly meeting? Booking calendar? Make it easy to coordinate.', tip: 'Monthly meeting keeps momentum. Even just 30 mins.' },
      { step: 8, title: 'First Purchase Together', description: 'Start with one thing everyone needs. Success builds trust. Then expand.', tip: 'First success matters more than first purchase size.' }
    ],
    tools: [
      { name: 'Agreement template', price: 'In pack', essential: true },
      { name: 'Bank account', price: 'Free', essential: true },
      { name: 'Communication platform', price: 'Free', essential: true },
      { name: 'Booking system', price: 'Free (Google Calendar)', essential: true }
    ],
    commonMistakes: ['Too many members too fast', 'No written agreement', 'One person controls money', 'No regular meetings', 'Unclear equipment rules'],
    freeAccess: true,
    kit: { name: 'Collective Starter Pack', slug: 'collective-pack', price: '£14.99', contents: ['Constitution template', 'Membership agreement', 'Equipment log', 'Financial templates', 'Meeting agenda template'] },
    workshop: { title: 'Collective Building', duration: '2 hours', price: '£30', format: 'zoom', bookingSlug: 'collective-building' },
    nextTutorials: ['managing-rotation', 'bulk-buying-power'],
    badgeAwarded: 'collective-founder',
    lastUpdated: '2024-12-26',
    version: '1.0'
  },
  {
    id: 'managing-rotation',
    slug: 'managing-rotation',
    title: 'Managing Pardner Rotation',
    description: 'Being the banker: collecting contributions, managing rotation order, handling issues, keeping everyone happy.',
    icon: '🔄',
    programmes: ['techreneurs'],
    primaryProgramme: 'techreneurs',
    pathway: 'Pardner Economics',
    tags: ['pardner', 'banker', 'management', 'rotation'],
    difficulty: 'intermediate',
    duration: '35 mins',
    prerequisites: ['pardner-basics'],
    format: 'step-by-step',
    rovGuide: 'ROV-B',
    steps: [
      { step: 1, title: 'Banker Responsibilities', description: 'Collect on time. Keep accurate records. Distribute to right person. Communicate clearly. Handle problems fairly.' },
      { step: 2, title: 'Deciding Rotation Order', description: 'Options: random draw, needs-based, first-come, auction for first position. Agree method before starting.', rovPrompt: 'What are the pros and cons of each order method?' },
      { step: 3, title: 'Collection Day', description: 'Set consistent day. Send reminder 2 days before. Confirm receipt immediately. Chase same day if missing.', tip: 'Standing orders/direct debits reduce chasing.' },
      { step: 4, title: 'Record Everything', description: 'Spreadsheet: date, person, amount, running total. Screenshot payments. Share records monthly.', checkpoint: true },
      { step: 5, title: 'Handling Late Payments', description: 'First time: gentle reminder. Second: firmer warning. Third: group discussion. Consistent rules, applied fairly.' },
      { step: 6, title: 'When Someone Wants to Leave', description: 'Before their hand: they forfeit contributions. After hand: must complete payments. Make this clear at start.' },
      { step: 7, title: 'Handling Disputes', description: 'Listen to both sides. Refer to written rules. Group decision if needed. Document outcome.', warning: 'Unresolved disputes end pardners. Address quickly.' },
      { step: 8, title: 'Banker Compensation', description: 'Options: free participation, small fee, first or last hand (both have advantages). Agree upfront.' }
    ],
    tools: [
      { name: 'Tracking spreadsheet', price: 'Template provided', essential: true },
      { name: 'Communication group', price: 'Free', essential: true },
      { name: 'Payment platform', price: 'Free (bank transfer)', essential: true }
    ],
    commonMistakes: ['Inconsistent collection', 'Poor records', 'Favouritism in enforcement', 'Not addressing problems quickly', 'Unclear leaving rules'],
    freeAccess: true,
    kit: { name: 'Banker Toolkit', slug: 'banker-toolkit', price: '£9.99', contents: ['Tracking spreadsheet', 'Reminder templates', 'Problem resolution guide', 'Member agreement template'] },
    workshop: { title: 'Pardner Management', duration: '1 hour', price: '£20', format: 'zoom', bookingSlug: 'pardner-management' },
    nextTutorials: ['scaling-collective', 'alternative-models'],
    badgeAwarded: 'pardner-banker',
    lastUpdated: '2024-12-26',
    version: '1.0'
  }
];

export default TECHRENEURS_TUTORIALS;