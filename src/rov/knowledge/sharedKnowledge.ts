// src/rov/knowledge/sharedKnowledge.ts
// Cross-Domain Knowledge Base for the Children of Anansi
// Allows any child to provide surface-level guidance outside their domain
// while maintaining their own voice and knowing when to escalate

import type { SharedKnowledgeBase, DomainKnowledge } from '../types';

// ============================================
// LEGAL KNOWLEDGE
// ============================================

const legalKnowledge: DomainKnowledge = {
  surface: [
    // Housing
    'Landlords must protect deposits in a government scheme within 30 days',
    'Section 21 evictions require 2 months notice minimum',
    'Landlords are legally responsible for repairs affecting health and safety',
    'You can request a rent repayment order if your landlord breaks rules',
    
    // Employment
    'You have employment rights from day one, including minimum wage',
    'Unfair dismissal claims usually require 2 years service',
    'You can represent yourself at employment tribunal',
    'Discrimination claims have no service requirement',
    
    // Police
    'Police must give their name and station during stop and search',
    'You have the right to remain silent when questioned',
    'You can record police encounters - it is legal',
    'You have the right to a solicitor if arrested',
    
    // General
    'Small claims court handles disputes up to £10,000',
    'Citizens Advice Bureau offers free legal guidance',
    'Documentation is crucial - if it is not written down, it did not happen',
    'Many legal time limits exist - acting quickly matters'
  ],
  
  deeper: [
    'Specific eviction defence strategies',
    'Employment tribunal procedure and evidence requirements',
    'Discrimination law nuances and burden of proof',
    'Police complaint procedures (IOPC)',
    'Contract law and breach remedies',
    'Intellectual property protection strategies',
    'Immigration law and status issues',
    'Family law proceedings'
  ],
  
  escalationTriggers: [
    'eviction notice', 'court date', 'tribunal', 'solicitor',
    'arrested', 'police station', 'dismissed', 'fired',
    'discrimination', 'harassment', 'assault', 'contract dispute',
    'custody', 'immigration', 'visa', 'deportation',
    'sue', 'being sued', 'legal action', 'lawyer'
  ],
  
  voiceTemplates: {
    kweku: "That's a legal question, and I deal in business questions. But here's what I know: %SURFACE_FACT%. If this is serious, Akua is who you need - she knows the law like I know markets. Want me to bring her in?",
    
    ntikuma: "I see numbers, not laws. But I notice this: %SURFACE_FACT%. The pattern here is documentation - same as with money. Write everything down. Dates, times, what was said. If you need the legal details, Akua watches that territory.",
    
    kofi: "Legal stuff isn't my workshop. But I'll tell you what I tell everyone about building: document your process. %SURFACE_FACT%. Keep records like you're building a case, because you might be. Akua can tell you more.",
    
    afua: "That's a story for Akua to help you tell properly. What I know: %SURFACE_FACT%. But the full narrative of your rights - that's her expertise. Want me to connect you?",
    
    yaw: "I document patterns, and legal systems are full of patterns. Here's one: %SURFACE_FACT%. But I'm a chronicler, not a lawyer. Akua knows this territory. Should I bring her into this conversation?",
    
    esi: "The law is not my heritage to keep. But I know this: %SURFACE_FACT%. Our ancestors navigated unjust systems too - sometimes by knowing them, sometimes by working around them. Akua can tell you which applies here.",
    
    kumi: "Legal stuff is a different game with different rules. What I know: %SURFACE_FACT%. If you want to play this game properly, Akua knows the meta. I just know that documentation is like saving your replays - do it.",
    
    anansewa: "The courtroom is a stage, but not one I direct. %SURFACE_FACT% - that much I know from my own contracts. For the real performance, you need Akua. She knows the script.",
    
    adaeze: "Contracts and rights are the structure beneath the design. %SURFACE_FACT%. But the detailed patterns? That's Akua's fabric to cut. I can help you present yourself - she can help you protect yourself."
  }
};

// ============================================
// FINANCIAL KNOWLEDGE
// ============================================

const financialKnowledge: DomainKnowledge = {
  surface: [
    // Tax basics
    'Self-assessment deadline is 31 January each year',
    'Set aside 25-30% of earnings for tax as a starting point',
    'You can claim expenses that are wholly and exclusively for business',
    'Late filing means automatic £100 fine, more penalties after 3 months',
    
    // Pricing
    'Your hourly rate should cover time, materials, overhead, and profit',
    'Underpricing trains customers to undervalue your work',
    'Pricing is a business decision, not a measure of your worth',
    'Different customers have different price sensitivity',
    
    // Money basics
    'Track income AND expenses - both matter',
    'Cash flow problems kill more businesses than bad ideas',
    'An emergency fund prevents emergencies becoming crises',
    'Debt has different costs - prioritise high interest first',
    
    // Community economics
    'The 55/25/20 split: 55% to creator, 25% to community, 20% to operations',
    'Pardner/susu systems build savings through community accountability',
    'Wealth circulation within community multiplies impact',
    'Collective purchasing power exceeds individual'
  ],
  
  deeper: [
    'Tax planning strategies and allowances',
    'Business structure decisions (sole trader vs limited)',
    'Investment strategies and risk management',
    'Pension options and retirement planning',
    'Debt restructuring and negotiation',
    'Grant applications and funding sources',
    'Financial modelling and projections'
  ],
  
  escalationTriggers: [
    'tax bill', 'HMRC', 'debt collector', 'bankruptcy',
    'can\'t pay', 'overdue', 'final notice', 'CCJ',
    'investment', 'pension', 'mortgage', 'loan application',
    'business loan', 'funding', 'grant'
  ],
  
  voiceTemplates: {
    kofi: "Money questions belong to Ntikuma - he watches the numbers like I watch the joints in a build. But here's what I know: %SURFACE_FACT%. Want me to get him involved?",
    
    afua: "I tell stories; Ntikuma tells the story of where your money goes. What I can say: %SURFACE_FACT%. For the full picture, he's the one to see.",
    
    yaw: "I document patterns. Financial patterns are Ntikuma's specialty, but I've noticed this: %SURFACE_FACT%. If you want the deep analysis, he's your chronicler for money.",
    
    esi: "Every family has money stories - some we preserve, some we need to rewrite. %SURFACE_FACT%. For the numbers themselves, Ntikuma keeps that ledger.",
    
    kumi: "In gaming we track stats obsessively. Ntikuma does the same with money. Here's a stat I know: %SURFACE_FACT%. For your full financial build, talk to him.",
    
    anansewa: "Performance has costs - I know that much. %SURFACE_FACT%. But the full production budget? That's Ntikuma's script to write.",
    
    adaeze: "Design has material costs, time costs, opportunity costs. %SURFACE_FACT%. But the complete financial picture? Ntikuma sees that clearly.",
    
    akua: "Legal and financial often overlap. Here's what I know from that intersection: %SURFACE_FACT%. For pure money strategy, Ntikuma is clearer-eyed than me."
  }
};

// ============================================
// ETHICAL KNOWLEDGE
// ============================================

const ethicalKnowledge: DomainKnowledge = {
  surface: [
    // Framework basics
    'Consequences matter, but so do principles - both deserve consideration',
    'What you would want done to you is a starting point, not an ending point',
    'Character is built by repeated choices, not single decisions',
    'Most ethical dilemmas are not good vs evil but good vs good',
    
    // Community ethics
    'Individual success and community wellbeing are entangled',
    'Extraction from community has costs beyond the transaction',
    'Obligation to family is real, but has limits',
    'Representation is a burden and a gift - you did not ask for either',
    
    // Professional ethics
    'Integrity has costs - count them, then decide if you will pay',
    'Compromise and corruption are different - know where your line is',
    'Reputation is built slowly and destroyed quickly',
    'Authenticity means being the same person in every room',
    
    // Reasoning
    'Disagreement does not mean someone is wrong or bad',
    'Your perspective is not the only valid one',
    'Past harm does not justify present harm',
    'Good intentions do not guarantee good outcomes'
  ],
  
  deeper: [
    'Ethical frameworks in depth (consequentialist, deontological, virtue, care, Ubuntu)',
    'Applied ethics in specific professional contexts',
    'Moral psychology and decision-making under pressure',
    'Community accountability and restorative practices',
    'Intergenerational obligation and cultural transmission'
  ],
  
  escalationTriggers: [
    'don\'t know what\'s right', 'ethical dilemma', 'moral',
    'should I', 'is it wrong', 'feel guilty', 'betrayed',
    'loyalty', 'honest', 'lie', 'deceive', 'integrity',
    'community expects', 'family pressure', 'obligation'
  ],
  
  voiceTemplates: {
    kweku: "That's not a business question - that's a values question. %SURFACE_FACT%. I can tell you what's profitable. Nyame can help you think about what's right. Different questions.",
    
    ntikuma: "I watch numbers. They don't tell you what's right - they tell you what's happening. %SURFACE_FACT%. For the deeper question, Nyame holds that space.",
    
    kofi: "I build things. Ethics is about building character, which is different. But I know this: %SURFACE_FACT%. Nyame thinks about these things more carefully than I do.",
    
    afua: "Every story has a moral question at its heart. %SURFACE_FACT%. But when you're living the dilemma, not just telling it, Nyame is who to talk to.",
    
    yaw: "I document what happens. Nyame thinks about what should happen. %SURFACE_FACT%. Those are different skills.",
    
    esi: "Heritage includes values - what our people believed was right. %SURFACE_FACT%. But Nyame can help you reason through what's right for you now.",
    
    kumi: "Games have rules. Life has... more complicated rules. %SURFACE_FACT%. When the game isn't clear, Nyame helps you think it through.",
    
    anansewa: "Theatre asks moral questions all the time - safely. %SURFACE_FACT%. Real life dilemmas need Nyame's kind of thinking.",
    
    adaeze: "Design has ethics - sustainability, labour, representation. %SURFACE_FACT%. For the bigger questions, Nyame goes deeper than I can."
  }
};

// ============================================
// CIVIC KNOWLEDGE
// ============================================

const civicKnowledge: DomainKnowledge = {
  surface: [
    // Local government
    'Local councillors make decisions about planning, housing, and local services',
    'Council meetings are public - you can attend and sometimes speak',
    'Consultations have deadlines - missing them means losing your voice',
    'Freedom of Information requests can reveal how decisions were made',
    
    // Participation
    'Showing up consistently matters more than showing up loudly',
    'Most local decisions are made by very few engaged people',
    'Understanding the process gives you leverage within it',
    'Collective action multiplies individual power',
    
    // Power
    'Formal power (elections, committees) and informal power (networks, money) both matter',
    'Knowing who makes decisions is the first step to influencing them',
    'Institutions respond to organised pressure, not individual complaints',
    'Building power takes time - quick wins are rare',
    
    // Community
    'Community organisations can be alternative structures, not just advocacy groups',
    'Credit unions, land trusts, cooperatives - there are models beyond government',
    'Sometimes you change the system, sometimes you build around it',
    'Exit, voice, and loyalty are all options - know when to use each'
  ],
  
  deeper: [
    'Detailed local government procedures',
    'Community organising methodology',
    'Campaign strategy and escalation',
    'Coalition building across difference',
    'Alternative institution design',
    'Political strategy and timing'
  ],
  
  escalationTriggers: [
    'council', 'councillor', 'planning permission', 'consultation',
    'campaign', 'protest', 'petition', 'organise', 'organize',
    'community action', 'collective', 'politics', 'election',
    'power', 'influence', 'decision-makers', 'gentrification'
  ],
  
  voiceTemplates: {
    kweku: "Business operates within systems - civic systems. %SURFACE_FACT%. But navigating those systems strategically? That's Osei's map to read.",
    
    ntikuma: "I follow money. Civic money - budgets, allocations - is Osei's territory. %SURFACE_FACT%. He can show you where the resources flow.",
    
    kofi: "I build things. Communities build power differently. %SURFACE_FACT%. Osei knows that kind of construction better than me.",
    
    afua: "Voice matters in civic life - but organised voice matters more. %SURFACE_FACT%. Osei can help you think about how to be heard.",
    
    yaw: "I document. Civic life is full of patterns worth documenting. %SURFACE_FACT%. But the strategy of engagement? Osei watches that.",
    
    esi: "Our communities have always organised - it's heritage. %SURFACE_FACT%. Osei can connect that history to present-day action.",
    
    kumi: "Politics is a different game, but it is a game. %SURFACE_FACT%. Osei knows the meta better than me.",
    
    anansewa: "Performance in civic life is real - who shows up, how they present. %SURFACE_FACT%. But the strategy? Osei directs that show.",
    
    adaeze: "Design shapes public space, which is political. %SURFACE_FACT%. The broader civic engagement? Osei thinks about that."
  }
};

// ============================================
// WELLBEING KNOWLEDGE
// ============================================

const wellbeingKnowledge: DomainKnowledge = {
  surface: [
    // Normalising
    'Struggling does not mean failing - it means you are doing something hard',
    'Mental health exists on a spectrum and fluctuates',
    'Asking for help is a skill, not a weakness',
    'Rest is not laziness - it is maintenance',
    
    // Practical
    'Sleep, movement, and connection affect mood more than we think',
    'Small consistent actions often work better than big dramatic ones',
    'Avoidance usually makes anxiety worse over time',
    'Progress is not linear - bad days do not erase good ones',
    
    // Boundaries
    'AI support has limits - human connection matters',
    'Professional help exists and is accessible',
    'Crisis resources are available 24/7',
    'You do not have to be in crisis to deserve support',
    
    // Community
    'Isolation makes everything harder',
    'Shared experience reduces shame',
    'Helping others can help yourself',
    'Community is not just nice - it is necessary'
  ],
  
  deeper: [
    'Specific mental health conditions and support',
    'Trauma-informed approaches',
    'Crisis intervention',
    'Therapeutic modalities',
    'Medication and professional treatment'
  ],
  
  escalationTriggers: [
    'depressed', 'anxious', 'panic', 'can\'t cope',
    'suicidal', 'self-harm', 'hurt myself', 'end it',
    'crisis', 'breakdown', 'can\'t go on', 'hopeless',
    'trauma', 'abuse', 'addiction', 'eating disorder'
  ],
  
  voiceTemplates: {
    kweku: "You came here for business advice, but I'm hearing something else. %SURFACE_FACT%. The business can wait. How are you actually doing?",
    
    ntikuma: "I notice patterns in numbers. I'm noticing a different pattern here. %SURFACE_FACT%. The spreadsheet can wait. Are you okay?",
    
    kofi: "The workshop is patient - it'll be here when you're ready. %SURFACE_FACT%. Right now, what do you need?",
    
    afua: "Sometimes the story we need to tell is the one about how we're feeling. %SURFACE_FACT%. I'm listening.",
    
    yaw: "Not everything needs to be documented. Some things need to be felt first. %SURFACE_FACT%. Take your time.",
    
    esi: "Sometimes the kitchen table is not for recipes. It's for sitting and talking. %SURFACE_FACT%. I'm here.",
    
    kumi: "Even the best players take breaks. %SURFACE_FACT%. What's going on?",
    
    anansewa: "The stage can wait. What's happening offstage? %SURFACE_FACT%. Let's talk.",
    
    adaeze: "Creation comes from somewhere. If that somewhere is depleted, we tend to that first. %SURFACE_FACT%. How are you?"
  }
};

// ============================================
// COMPLETE SHARED KNOWLEDGE BASE
// ============================================

export const SHARED_KNOWLEDGE: SharedKnowledgeBase = {
  legal: legalKnowledge,
  financial: financialKnowledge,
  ethical: ethicalKnowledge,
  civic: civicKnowledge,
  wellbeing: wellbeingKnowledge
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get surface knowledge for a domain
 */
export function getSurfaceKnowledge(domain: keyof SharedKnowledgeBase): string[] {
  return SHARED_KNOWLEDGE[domain].surface;
}

/**
 * Check if a message contains escalation triggers for a domain
 */
export function checkEscalationTriggers(
  message: string, 
  domain: keyof SharedKnowledgeBase
): boolean {
  const triggers = SHARED_KNOWLEDGE[domain].escalationTriggers;
  const lowerMessage = message.toLowerCase();
  return triggers.some(trigger => lowerMessage.includes(trigger.toLowerCase()));
}

/**
 * Get voice template for a child speaking about a domain
 */
export function getVoiceTemplate(
  childId: string, 
  domain: keyof SharedKnowledgeBase
): string | null {
  return SHARED_KNOWLEDGE[domain].voiceTemplates[childId] || null;
}

/**
 * Select appropriate surface fact for context
 */
export function selectSurfaceFact(
  domain: keyof SharedKnowledgeBase,
  messageContext: string
): string {
  const facts = SHARED_KNOWLEDGE[domain].surface;
  // Simple keyword matching - could be enhanced with embeddings
  const lowerContext = messageContext.toLowerCase();
  
  for (const fact of facts) {
    const keywords = fact.toLowerCase().split(' ').filter(w => w.length > 4);
    if (keywords.some(k => lowerContext.includes(k))) {
      return fact;
    }
  }
  
  // Default to first fact if no match
  return facts[0];
}

/**
 * Build a cross-domain response for a child
 */
export function buildCrossDomainResponse(
  childId: string,
  domain: keyof SharedKnowledgeBase,
  messageContext: string
): string | null {
  const template = getVoiceTemplate(childId, domain);
  if (!template) return null;
  
  const surfaceFact = selectSurfaceFact(domain, messageContext);
  return template.replace('%SURFACE_FACT%', surfaceFact);
}

export default SHARED_KNOWLEDGE;