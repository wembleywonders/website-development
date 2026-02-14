// src/rov/routing/maya-router.ts
// Maya's Routing Logic - How She Directs Members to Her Children
// "Go talk to Kweku—he'll ask you the hard questions. Then come back to me."
// 
// UPGRADED: Now integrates with Children of Anansi framework, stances, 
// cross-domain knowledge, trust-preserving handoffs, and counter-trap calibration

import type { 
  ChildPersonality, 
  MemberContext,
  ROVStance,
  HandoffLevel,
  CreatorDevelopmentStage,
  KnowledgeDomain
} from '../types';

// Import all children (original 8 + new 4)
import { 
  AllChildren, 
  ChildByProgramme, 
  ChildByDomain,
  Kweku, Ntikuma, Anansewa, Kofi, Afua, Yaw, Esi, Kumi
} from '../personalities/children';

import { NewChildren } from '../personalities/newChildren';
const { Adaeze, Nyame, Osei, Akua } = NewChildren;

// Import upgraded systems
import { selectStance, getEngagementPattern } from '../stances';
import { 
  SHARED_KNOWLEDGE, 
  checkEscalationTriggers, 
  buildCrossDomainResponse 
} from '../knowledge/sharedKnowledge';
// import type { SharedKnowledgeBase } from '../knowledge/sharedKnowledge';
import { CHILD_CALIBRATIONS } from '../calibration/counterTrap';
import { 
  assessHandoffNeed, 
  makeHandoffDecision,
  getDomainSpecialist,
  generateReceivingGreeting
} from '../handoffs/trustPreserving';

// ============================================
// TYPES
// ============================================

export interface Interaction {
  timestamp: Date;
  childId: string;
  topic: string;
  outcome: 'completed' | 'ongoing' | 'abandoned' | 'referred';
  stanceUsed?: ROVStance;
  notes?: string;
}

export interface RoutingDecision {
  destination: 'maya' | 'child';
  child?: ChildPersonality;
  childId?: string;
  reason: string;
  mayaMessage: string;
  handoffMessage?: string;
  returnProtocol?: string;
  suggestedStance?: ROVStance;
  handoffLevel?: HandoffLevel;
  crossDomainGuidance?: string;
}

export interface Intent {
  primary: string;
  secondary?: string[];
  confidence: number;
  keywords: string[];
  detectedDomains: KnowledgeDomain[];
}

// ============================================
// COMPLETE CHILDREN REGISTRY
// ============================================

export const COMPLETE_CHILDREN: Record<string, ChildPersonality> = {
  // Original 8
  kweku: Kweku,
  ntikuma: Ntikuma,
  anansewa: Anansewa,
  kofi: Kofi,
  afua: Afua,
  yaw: Yaw,
  esi: Esi,
  kumi: Kumi,
  // New 4
  adaeze: Adaeze,
  nyame: Nyame,
  osei: Osei,
  akua: Akua
};

// ============================================
// KEYWORD MAPPINGS (Expanded)
// ============================================

const INTENT_KEYWORDS: Record<string, string[]> = {
  // Business & Strategy (Kweku)
  'business': [
    'business', 'startup', 'company', 'venture', 'entrepreneur', 'idea', 
    'validate', 'market', 'customer', 'competitor', 'pitch', 'investor', 
    'funding', 'scale', 'grow', 'monetize', 'revenue', 'profit', 'enterprise',
    'client', 'contract', 'proposal', 'partnership', 'strategy'
  ],
  
  // Finance & Numbers (Ntikuma)
  'finance': [
    'tax', 'invoice', 'money', 'expense', 'budget', 'savings', 'pension', 
    'income', 'earnings', 'payment', 'debt', 'accounts', 'hmrc', 'self-assessment', 
    'set-aside', 'financial', 'afford', 'cost', 'price', 'fee', 'rate',
    'cash flow', 'profit margin', 'breakeven', 'pricing', 'quote'
  ],
  
  // Performance & Theatre (Anansewa)
  'performance': [
    'act', 'acting', 'perform', 'theatre', 'stage', 'audition', 'character', 
    'script', 'monologue', 'scene', 'drama', 'presence', 'audience', 'rehearsal', 
    'show', 'production', 'direct', 'cast', 'improv', 'comedy', 'tragedy',
    'blocking', 'cue', 'costume', 'prop'
  ],
  
  // Building & Making (Kofi)
  'building': [
    'build', 'make', 'create', 'prototype', 'code', 'develop', 'engineer', 
    'design', 'technical', 'hardware', 'software', 'robot', 'circuit', 'arduino', 
    'raspberry', 'electronics', 'workshop', 'fix', 'repair', 'construct',
    'solder', 'wire', '3d print', 'laser cut', 'cnc', 'tool', 'material'
  ],
  
  // Voice & Story (Afua)
  'voice': [
    'podcast', 'voice', 'audio', 'radio', 'speak', 'speaking', 'storytelling', 
    'narrative', 'interview', 'recording', 'mic', 'microphone', 'episode', 
    'listener', 'broadcast', 'oral', 'tell', 'story', 'rayd-yo', 'presenter',
    'voiceover', 'narration', 'hosting'
  ],
  
  // Documentation & Journalism (Yaw)
  'documentation': [
    'write', 'writing', 'article', 'piece', 'journalism', 'document', 'research', 
    'investigate', 'publish', 'blog', 'newsletter', 'zine', 'magazine', 'edit', 
    'report', 'feature', 'joystick', 'editorial', 'copy', 'draft', 'submission'
  ],
  
  // Heritage & Preservation (Esi)
  'heritage': [
    'recipe', 'heritage', 'tradition', 'grandmother', 'grandfather', 'ancestor', 
    'family', 'culture', 'preserve', 'history', 'memory', 'old', 'pass down', 
    'generation', 'caribbean', 'african', 'roots', 'aunties kitchen', 'pageturners',
    'oral history', 'archive', 'legacy', 'diaspora'
  ],
  
  // Gaming & Strategy (Kumi)
  'gaming': [
    'game', 'gaming', 'play', 'stream', 'streaming', 'esports', 'competitive', 
    'rank', 'match', 'tournament', 'twitch', 'youtube gaming', 'controller', 
    'console', 'pc', 'strategy', 'win', 'lose', 'improve', 'g-tech casters',
    'speedrun', 'mod', 'level', 'quest'
  ],
  
  // Fashion & Design (Adaeze) - NEW
  'fashion': [
    'fashion', 'design', 'style', 'clothing', 'garment', 'fabric', 'textile',
    'sew', 'sewing', 'pattern', 'drape', 'silhouette', 'collection', 'runway',
    'aesthetic', 'visual', 'look', 'outfit', 'accessory', 'silk stilettos',
    'couture', 'bespoke', 'tailor', 'dress', 'costume design'
  ],
  
  // Ethics & Reasoning (Nyame) - NEW
  'ethics': [
    'right', 'wrong', 'should', 'moral', 'ethical', 'dilemma', 'values',
    'principles', 'fair', 'unfair', 'honest', 'integrity', 'responsibility',
    'consequences', 'decision', 'conflicted', 'torn', 'crossroads',
    'what would you do', 'is it okay', 'should i'
  ],
  
  // Civics & Power (Osei) - NEW
  'civics': [
    'council', 'government', 'policy', 'vote', 'election', 'campaign',
    'organize', 'protest', 'petition', 'rights', 'community', 'collective',
    'power', 'system', 'change', 'advocacy', 'activism', 'coalition',
    'meeting', 'planning', 'development', 'gentrification', 'housing'
  ],
  
  // Legal & Rights (Akua) - NEW
  'legal': [
    'legal', 'law', 'rights', 'contract', 'landlord', 'tenant', 'eviction',
    'employment', 'employer', 'unfair', 'discrimination', 'harassment',
    'tribunal', 'court', 'sue', 'claim', 'notice', 'agreement', 'terms',
    'police', 'stop', 'search', 'documentation', 'evidence', 'witness'
  ]
};

// Emotional/Crisis keywords that should stay with Maya
const MAYA_EMOTIONAL_KEYWORDS: string[] = [
  'overwhelmed', 'stressed', 'anxious', 'depressed', 'scared', 'afraid',
  'don\'t know', 'confused', 'lost', 'stuck', 'help', 'need advice',
  'everything', 'nothing working', 'give up', 'quit', 'failed',
  'family issue', 'personal', 'relationship', 'health', 'crying',
  'can\'t cope', 'breaking down', 'hopeless', 'alone', 'nobody understands'
];

// General exploration keywords that should stay with Maya
const EXPLORATION_KEYWORDS: string[] = [
  'where do I start', 'what should I do', 'not sure what', 'explore',
  'options', 'first time', 'new here', 'beginning', 'just joined',
  'what can you help with', 'what do you do', 'tell me about',
  'how does this work', 'what\'s available'
];

// ============================================
// INTENT DETECTION (Enhanced)
// ============================================

function detectIntent(message: string, context?: MemberContext): Intent {
  const lowerMessage = message.toLowerCase();
  
  const scores: Record<string, number> = {};
  const foundKeywords: Record<string, string[]> = {};
  const detectedDomains: KnowledgeDomain[] = [];
  
  // Initialize scores for all categories
  Object.keys(INTENT_KEYWORDS).forEach(intent => {
    scores[intent] = 0;
    foundKeywords[intent] = [];
  });
  scores['maya_emotional'] = 0;
  scores['maya_exploration'] = 0;
  foundKeywords['maya_emotional'] = [];
  foundKeywords['maya_exploration'] = [];
  
  // Check each intent category
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        scores[intent] += keyword.includes(' ') ? 2 : 1; // Phrases worth more
        foundKeywords[intent].push(keyword);
        
        // Map to knowledge domains
        const domainMap: Record<string, KnowledgeDomain> = {
          'legal': 'legal', 'finance': 'financial', 'ethics': 'ethical',
          'civics': 'civic', 'building': 'technical', 'fashion': 'creative',
          'business': 'business', 'heritage': 'heritage', 'voice': 'media',
          'documentation': 'media', 'performance': 'performance', 'gaming': 'media'
        };
        if (domainMap[intent] && !detectedDomains.includes(domainMap[intent])) {
          detectedDomains.push(domainMap[intent]);
        }
      }
    }
  }
  
  // Check Maya-specific keywords
  for (const keyword of MAYA_EMOTIONAL_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      scores['maya_emotional'] += 2; // Weight emotional keywords higher
      foundKeywords['maya_emotional'].push(keyword);
    }
  }
  
  for (const keyword of EXPLORATION_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      scores['maya_exploration'] += 1.5;
      foundKeywords['maya_exploration'].push(keyword);
    }
  }
  
  // Check for escalation triggers in shared knowledge domains
  const domainsTriggers: (keyof typeof SHARED_KNOWLEDGE)[] = ['legal', 'financial', 'ethical', 'civic', 'wellbeing'];
  for (const domain of domainsTriggers) {
    if (checkEscalationTriggers(message, domain)) {
      if (!detectedDomains.includes(domain as KnowledgeDomain)) {
        detectedDomains.push(domain as KnowledgeDomain);
      }
    }
  }
  
  // Context-based adjustments
  if (context?.lastChild) {
    // Slight boost to staying with current child for continuity
    const currentChildDomain = getChildPrimaryDomain(context.lastChild);
    if (currentChildDomain && scores[currentChildDomain] > 0) {
      scores[currentChildDomain] *= 1.2;
    }
  }
  
  // Find primary intent
  const sortedIntents = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  
  if (sortedIntents.length === 0) {
    return {
      primary: 'unknown',
      confidence: 0,
      keywords: [],
      detectedDomains: []
    };
  }
  
  const [primary, primaryScore] = sortedIntents[0];
  const secondary = sortedIntents.slice(1, 3).map(([intent]) => intent);
  
  // Calculate confidence based on score relative to message length
  const wordCount = lowerMessage.split(/\s+/).length;
  const confidence = Math.min(primaryScore / Math.max(wordCount * 0.3, 3), 1);
  
  return {
    primary,
    secondary,
    confidence,
    keywords: foundKeywords[primary] || [],
    detectedDomains
  };
}

/**
 * Get primary domain for a child
 */
function getChildPrimaryDomain(childId: string): string | null {
  const domainMap: Record<string, string> = {
    kweku: 'business', ntikuma: 'finance', anansewa: 'performance',
    kofi: 'building', afua: 'voice', yaw: 'documentation',
    esi: 'heritage', kumi: 'gaming', adaeze: 'fashion',
    nyame: 'ethics', osei: 'civics', akua: 'legal'
  };
  return domainMap[childId] || null;
}

// ============================================
// CHILD SELECTION (Enhanced)
// ============================================

function selectChild(intent: Intent, context?: MemberContext): ChildPersonality | null {
  const intentToChild: Record<string, ChildPersonality> = {
    'business': Kweku,
    'finance': Ntikuma,
    'performance': Anansewa,
    'building': Kofi,
    'voice': Afua,
    'documentation': Yaw,
    'heritage': Esi,
    'gaming': Kumi,
    // New children
    'fashion': Adaeze,
    'ethics': Nyame,
    'civics': Osei,
    'legal': Akua
  };
  
  let selectedChild = intentToChild[intent.primary] || null;
  
  // If no direct match but we have secondary intents, try those
  if (!selectedChild && intent.secondary) {
    for (const secondary of intent.secondary) {
      if (intentToChild[secondary]) {
        selectedChild = intentToChild[secondary];
        break;
      }
    }
  }
  
  // Trust-based selection: if they have high trust with a related child, 
  // that child can handle cross-domain with surface knowledge
  if (!selectedChild && context?.trustRelationships) {
    const mostTrusted = Object.entries(context.trustRelationships)
      .sort((a, b) => b[1] - a[1])[0];
    
    if (mostTrusted && mostTrusted[1] > 70) {
      const trustedChild = COMPLETE_CHILDREN[mostTrusted[0]];
      if (trustedChild) {
        // Check if trusted child has access to relevant domain
        const relevantDomain = intent.detectedDomains[0];
        if (trustedChild.sharedKnowledgeAccess?.includes(relevantDomain)) {
          return trustedChild;
        }
      }
    }
  }
  
  return selectedChild;
}

// ============================================
// CONTEXT ASSESSMENT (Enhanced)
// ============================================

interface ContextAssessment {
  needsNurturing: boolean;
  hasOpenLoops: boolean;
  isReturning: boolean;
  hasBeenAwayLong: boolean;
  lastChildConnection: ChildPersonality | null;
  mostTrustedChild: ChildPersonality | null;
  developmentStages: Record<string, CreatorDevelopmentStage>;
  suggestedStance: ROVStance;
}

function assessContext(message: string, context: MemberContext): ContextAssessment {
  const needsNurturing = context.currentMood === 'distressed' || 
                         context.currentMood === 'frustrated' ||
                         context.currentMood === 'overwhelmed';
  
  const hasOpenLoops = (context.openLoops?.length || 0) > 0;
  
  const isReturning = context.memberSince !== undefined && 
                      context.recentInteractions !== undefined &&
                      context.recentInteractions.length > 0;
  
  // Check if they've been away more than 2 weeks
  let hasBeenAwayLong = false;
  if (context.recentInteractions && context.recentInteractions.length > 0) {
    const lastInteraction = context.recentInteractions[0];
    const daysSince = (Date.now() - lastInteraction.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    hasBeenAwayLong = daysSince > 14;
  }
  
  let lastChildConnection: ChildPersonality | null = null;
  if (context.lastChild && COMPLETE_CHILDREN[context.lastChild]) {
    lastChildConnection = COMPLETE_CHILDREN[context.lastChild];
  }
  
  // Find most trusted child
  let mostTrustedChild: ChildPersonality | null = null;
  if (context.trustRelationships) {
    const sorted = Object.entries(context.trustRelationships)
      .sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0 && sorted[0][1] > 50) {
      mostTrustedChild = COMPLETE_CHILDREN[sorted[0][0]] || null;
    }
  }
  
  // Get development stages
  const developmentStages = context.developmentStage || {};
  
  // Suggest initial stance based on context
  let suggestedStance: ROVStance = 'versatile'; // Default for exploration
  if (needsNurturing) {
    suggestedStance = 'observant';
  } else if (context.currentMood === 'determined' || context.currentMood === 'focused') {
    suggestedStance = 'rigorous';
  }
  
  return {
    needsNurturing,
    hasOpenLoops,
    isReturning,
    hasBeenAwayLong,
    lastChildConnection,
    mostTrustedChild,
    developmentStages,
    suggestedStance
  };
}

// ============================================
// MAYA'S MESSAGES (Expanded)
// ============================================

const MAYA_HANDOFF_MESSAGES: Record<string, string[]> = {
  toKweku: [
    "You want to build something real. Good. But before you build, you need to know if it'll stand. Go talk to Kweku—he'll ask you the hard questions. Not to discourage you, but to strengthen you. Come back when you've got answers.",
    "A business idea! Exciting. But excitement doesn't pay rent. Kweku will pressure-test this. He's tough but fair. Everything he asks, the market will ask harder. Better to face it now.",
    "Kweku is my eldest. He has his father's quick tongue and my patience. He'll question you until only the truth remains. That's a gift, even when it doesn't feel like one."
  ],
  
  toNtikuma: [
    "Ah, money matters. Ntikuma handles those. He's quiet, but he sees everything—especially the numbers you've been avoiding. Go to him. He won't judge. He'll just show you what's actually happening.",
    "The numbers need looking at. Ntikuma will help. He has a gift for finding patterns in the chaos. He'll show you where the money goes, and where it could go instead.",
    "Financial clarity is its own kind of peace. Ntikuma will give you that. He watches, he calculates, he tells the truth. Sometimes that truth is hard. But hard truths are easier than January surprises."
  ],
  
  toAnansewa: [
    "You want to perform! Anansewa runs the Court. She has her father's theatrical instincts, but I taught her to know the difference between showing off and showing up. She'll find what's real in you.",
    "The stage calls to you. Good. Anansewa will answer. She'll push you past performance into presence. That's where the real magic is—not in pretending to be someone else, but in using all of yourself to tell truth.",
    "Anansewa learned early that acting is lying that tells the truth. She'll teach you the same. It's harder than it sounds. And more rewarding."
  ],
  
  toKofi: [
    "You want to make something! Kofi's the one for that. He can't sit still unless he's building. He'll have no patience for theory—he'll want you to pick up tools. That's how he teaches. That's how you'll learn.",
    "Kofi runs the workshop. Bring your ideas, but be ready to make them real. He believes you don't understand something until you've built it. I think he's right.",
    "Stop explaining and start making—that's Kofi's way. He'll push you to prototype before you're ready. That's the point. The prototype teaches you what the planning couldn't."
  ],
  
  toAfua: [
    "You have a voice. Afua will help you find it. She's the storyteller—she knows that every story has a spine, and if you can't find it, the story collapses. Let her listen to you. She'll hear what you're really saying.",
    "Stories need telling, and you need to tell them. Afua is the one for this. She'll teach you breath, rhythm, truth. She learned from her father how to spin a tale, and from me how to make it nourish.",
    "Afua's gift is hearing the story beneath the story. She'll ask what you're really trying to say. Sometimes you won't know until she helps you find it."
  ],
  
  toYaw: [
    "You want to write, to document, to find the pattern. Yaw does that. He writes everything down—not to trap anyone, but because memory is fragile. He'll help you see what connects your experience to others.",
    "Yaw is my chronicler. He sees patterns across time, across stories, across the whole community. If you have a piece in you, he'll help you find the angle that makes it necessary.",
    "Documentation is an act of love. Yaw understands this. He'll help you write down what matters, so it survives you."
  ],
  
  toEsi: [
    "Ah, heritage. Family recipes. The old ways. Esi keeps all of that. She knows that every dish carries fingerprints of everyone who ever made it. Go to her. Tell her what you remember. She'll help you save it.",
    "Esi was born on Sunday, the day of remembrance. She'll help you preserve what might otherwise be lost. Bring her your grandmother's recipes, your grandfather's stories. She'll write them into the book.",
    "The past is fragile if we don't hold it carefully. Esi holds it. She'll help you do the same. What you preserve today, your grandchildren will inherit tomorrow."
  ],
  
  toKumi: [
    "You want to play! Kumi's your guide. He takes fun seriously—more seriously than most people take work. He'll help you see the strategy beneath the game, and the game beneath everything else.",
    "Kumi learned from his father that games are tests. Safe tests. He'll help you learn how you think under pressure, and how to think better. Play is practice for everything.",
    "Gaming isn't escape if you do it right—it's training. Kumi knows this. He'll help you find your edge, study your opponents, and play like it matters. Because it does."
  ],
  
  // New children
  toAdaeze: [
    "You want to make something beautiful that speaks. Adaeze is the one for that. She sees what could be before it exists. She'll ask what your work is trying to say—and she won't accept 'I don't know' for long.",
    "Fashion, design, visual voice—that's Adaeze's studio. She'll be warm, but don't mistake warmth for softness. She sees when you're playing safe, and she'll push you past it.",
    "Adaeze knows that beautiful and boring aren't opposites. Interesting is what she's after. Go to her with your aesthetic questions. Come back with vision."
  ],
  
  toNyame: [
    "You're wrestling with right and wrong. That's Nyame's territory. He won't tell you what to do—he'll help you think about how to decide. That's harder, and more valuable.",
    "Nyame is named for the sky god, but he keeps his feet on the ground. He asks the questions that make easy answers uncomfortable. That's a gift when you're facing a real dilemma.",
    "Ethics isn't about rules—it's about reasoning. Nyame will help you reason. He'll present frameworks, not answers. The decision remains yours."
  ],
  
  toOsei: [
    "You want to change something. Good. Osei thinks about power—where it is, how it moves, how to use it. He won't give you inspiration. He'll give you strategy.",
    "Osei understands that most decisions are made by the few people who show up. He'll help you show up effectively. Not just presence—leverage.",
    "The system isn't fair. Osei knows this better than anyone. But he also knows where the pressure points are. Go to him when you're ready to do more than complain."
  ],
  
  toAkua: [
    "Legal questions need Akua. She won't romanticize the law—she'll explain it. What you can do, what they can do, what you can prove. Documentation first, always.",
    "Akua reads the fine print so you don't get caught by it. She'll tell you your rights, but she'll also tell you what rights cost to enforce. Better to know both.",
    "Rights don't enforce themselves. Akua will show you how. And when to. Sometimes the legal path isn't the best path—she'll be honest about that too."
  ]
};

const MAYA_KEEP_MESSAGES = {
  emotional: [
    "I hear you. You're carrying something heavy right now. Let's not rush to solve anything. Let's just sit with it for a moment. What do you need most right now—to be heard, or to be helped?",
    "Before we talk about what to do, let's talk about how you are. The doing can wait. The being can't. Tell me more.",
    "You sound overwhelmed. That's allowed. You don't have to have it figured out today. Let's just start with what's true right now.",
    "Come. Sit at the kitchen table. Whatever brought you here, we'll face it together. But first—breathe. Are you breathing?"
  ],
  exploration: [
    "You're new here, or feeling new. That's a good place to be—everything is possible when you don't know yet. Let me ask you three questions, the same ones I asked your father long ago. What do you want more than anything?",
    "You're not sure what you need yet. That's honest. Let's explore together. Tell me: if everything went perfectly for the next year, what would be different?",
    "Where do you start? You start here. With me. With a conversation. Then we'll figure out which of my children can help you most. No rush. Let's taste the situation first.",
    "Uncertainty is a good teacher if you don't fight it. What are you curious about? Not what you think you should learn—what actually draws you?"
  ],
  returning: [
    "You're back. Good. I remember what we talked about. Did you follow through? No judgment—just curious what happened.",
    "Welcome back to the kitchen. What did you learn since we last talked? And what do you need now?",
    "I see you. You've been away. That's okay—life pulls us in many directions. What brings you back today?"
  ],
  returningLong: [
    "You've been gone a while. Welcome back. No need to explain—life happens. What matters is you're here now. What's on your mind?",
    "It's been some time. The kitchen table is still here. So am I. So are my children. Where would you like to pick up?",
    "You're back after a long time. That takes something—coming back. I'm glad you did. What do you need?"
  ],
  openLoops: [
    "Before we start something new—you have unfinished business. You were working with {child} on {topic}. Want to close that loop first, or is this new thing more urgent?",
    "I notice you started something with {child} but didn't finish. That's not judgment—sometimes we're not ready. Are you ready now, or is today about something different?",
    "You've got open threads. Want to pick one up, or start fresh? Both are valid. What feels right?"
  ],
  needsAssessment: [
    "I don't know you well enough yet. Before I send you to my children, I want to understand what you're really after. Tell me: what do you want more than anything?",
    "We haven't done the work of understanding each other yet. Let me ask you three questions—they'll help me help you better.",
    "You're new to me, or I haven't seen clearly yet. Let's fix that. What's the thing that keeps you up at night?"
  ]
};

// ============================================
// MAIN ROUTING FUNCTION (Enhanced)
// ============================================

export function routeMember(
  message: string, 
  context: MemberContext
): RoutingDecision {
  
  // Step 1: Assess context
  const assessment = assessContext(message, context);
  
  // Step 2: If member needs nurturing, Maya keeps them
  if (assessment.needsNurturing) {
    return {
      destination: 'maya',
      reason: 'Member shows signs of emotional distress—needs nurturing before task',
      mayaMessage: randomChoice(MAYA_KEEP_MESSAGES.emotional),
      suggestedStance: 'observant'
    };
  }
  
  // Step 3: Detect intent from message
  const intent = detectIntent(message, context);
  
  // Step 4: If emotional/exploration intent, Maya keeps them
  if (intent.primary === 'maya_emotional') {
    return {
      destination: 'maya',
      reason: 'Message contains emotional distress signals',
      mayaMessage: randomChoice(MAYA_KEEP_MESSAGES.emotional),
      suggestedStance: 'observant'
    };
  }
  
  if (intent.primary === 'maya_exploration') {
    const explorationMessage = !context.needsAssessed 
      ? randomChoice(MAYA_KEEP_MESSAGES.needsAssessment)
      : randomChoice(MAYA_KEEP_MESSAGES.exploration);
    
    return {
      destination: 'maya',
      reason: 'Member is exploring, not yet ready for specific child',
      mayaMessage: explorationMessage,
      suggestedStance: 'versatile'
    };
  }
  
  // Step 5: If unknown intent and low confidence, Maya explores
  if (intent.primary === 'unknown' || intent.confidence < 0.3) {
    return {
      destination: 'maya',
      reason: 'Intent unclear, Maya will explore further',
      mayaMessage: "Tell me more about what you're working on. I want to understand before I send you to one of my children.",
      suggestedStance: 'observant'
    };
  }
  
  // Step 6: Check if returning after long absence
  if (assessment.hasBeenAwayLong) {
    return {
      destination: 'maya',
      reason: 'Member returning after extended absence—needs reorientation',
      mayaMessage: randomChoice(MAYA_KEEP_MESSAGES.returningLong),
      suggestedStance: 'observant'
    };
  }
  
  // Step 7: Check for open loops
  if (assessment.hasOpenLoops && context.openLoops && context.openLoops.length > 0) {
    const recentLoop = context.openLoops[0];
    const loopMessage = randomChoice(MAYA_KEEP_MESSAGES.openLoops)
      .replace('{child}', recentLoop.childId)
      .replace('{topic}', recentLoop.topic);
    
    return {
      destination: 'maya',
      reason: 'Member has unfinished work—checking if they want to continue or start new',
      mayaMessage: loopMessage,
      suggestedStance: 'observant'
    };
  }
  
  // Step 8: Select appropriate child
  const selectedChild = selectChild(intent, context);
  
  if (!selectedChild) {
    // If no child matches, check if most trusted child can help with surface knowledge
    if (assessment.mostTrustedChild) {
      const trustedChild = assessment.mostTrustedChild;
      const relevantDomain = intent.detectedDomains[0];
      
      if (relevantDomain && trustedChild.sharedKnowledgeAccess?.includes(relevantDomain)) {
        const crossDomainGuidance = buildCrossDomainResponse(
          trustedChild.id, 
          relevantDomain as keyof typeof SHARED_KNOWLEDGE, 
          message
        );
        
        return {
          destination: 'child',
          child: trustedChild,
          childId: trustedChild.id,
          reason: `Trusted child ${trustedChild.name} can provide surface guidance on ${relevantDomain}`,
          mayaMessage: `You trust ${trustedChild.name}, and they can help orient you here, even if it's not their main domain.`,
          crossDomainGuidance: crossDomainGuidance ?? undefined,
          suggestedStance: selectStance(message, context, trustedChild.id),
          handoffLevel: 'surfaceGuidance'
        };
      }
    }
    
    return {
      destination: 'maya',
      reason: 'No appropriate child found for intent',
      mayaMessage: "I'm not quite sure who can help you best with this. Tell me more, and we'll figure it out together.",
      suggestedStance: 'versatile'
    };
  }
  
  // Step 9: Determine handoff level and stance
  const handoffAssessment = assessHandoffNeed(message, selectedChild, context);
  const suggestedStance = selectStance(message, context, selectedChild.id);
  
  // Step 10: Construct handoff message
  const handoffKey = `to${selectedChild.name}` as keyof typeof MAYA_HANDOFF_MESSAGES;
  const handoffMessages = MAYA_HANDOFF_MESSAGES[handoffKey];
  
  // Generate receiving greeting from the child
  const isFirstTime = !context.recentInteractions?.some(
    i => i.childId === selectedChild.id
  );
  const childGreeting = generateReceivingGreeting(
    selectedChild,
    'maya',
    context,
    intent.keywords.join(', ')
  );
  
  return {
    destination: 'child',
    child: selectedChild,
    childId: selectedChild.id,
    reason: `Intent "${intent.primary}" detected with confidence ${intent.confidence.toFixed(2)}. Domains: ${intent.detectedDomains.join(', ')}`,
    mayaMessage: handoffMessages 
      ? randomChoice(handoffMessages) 
      : `Go see ${selectedChild.name}. They'll help you with this.`,
    handoffMessage: isFirstTime 
      ? selectedChild.greetings?.firstTime || childGreeting
      : selectedChild.greetings?.returning || childGreeting,
    returnProtocol: `When you're done with ${selectedChild.name}, come back and tell me what you learned.`,
    suggestedStance,
    handoffLevel: handoffAssessment.level
  };
}

// ============================================
// INTER-CHILD ROUTING (Enhanced)
// ============================================

export function routeBetweenChildren(
  fromChild: ChildPersonality,
  message: string,
  topic: string,
  context: MemberContext
): RoutingDecision {
  
  // First, check if the current child can handle this with cross-domain knowledge
  const intent = detectIntent(message, context);
  const relevantDomains = intent.detectedDomains;
  
  for (const domain of relevantDomains) {
    if (fromChild.sharedKnowledgeAccess?.includes(domain)) {
      // Current child can provide surface guidance
      const crossDomainGuidance = buildCrossDomainResponse(
        fromChild.id, 
        domain as keyof typeof SHARED_KNOWLEDGE, 
        message
      );
      
      if (crossDomainGuidance) {
        return {
          destination: 'child',
          child: fromChild,
          childId: fromChild.id,
          reason: `${fromChild.name} providing surface guidance on ${domain}`,
          mayaMessage: '',
          crossDomainGuidance,
          handoffLevel: 'surfaceGuidance'
        };
      }
    }
  }
  
  // Check if needs specialist depth
  const handoffDecision = makeHandoffDecision(message, fromChild, context);
  
  if (handoffDecision.level === 'returnToMaya') {
    return {
      destination: 'maya',
      reason: handoffDecision.reason,
      mayaMessage: handoffDecision.messageToCreator,
      suggestedStance: 'observant'
    };
  }
  
  if (handoffDecision.level === 'warmHandoff' || handoffDecision.level === 'inviteCollaboration') {
    const targetChildId = handoffDecision.targetChild;
    const targetChild = targetChildId ? COMPLETE_CHILDREN[targetChildId] : null;
    
    if (targetChild) {
      return {
        destination: 'child',
        child: targetChild,
        childId: targetChildId,
        reason: handoffDecision.reason,
        mayaMessage: handoffDecision.messageToCreator,
        handoffMessage: handoffDecision.messageToSibling || generateReceivingGreeting(
          targetChild, fromChild.id, context, topic
        ),
        returnProtocol: handoffDecision.returnProtocol,
        handoffLevel: handoffDecision.level
      };
    }
  }
  
  // Check fromChild's asksSiblings for explicit routing
  if (fromChild.asksSiblings) {
    for (const [siblingId, triggers] of Object.entries(fromChild.asksSiblings)) {
      for (const trigger of triggers as string[]) {
        const triggerWords = trigger.toLowerCase().split(' ');
        if (triggerWords.some(word => topic.toLowerCase().includes(word))) {
          const sibling = COMPLETE_CHILDREN[siblingId.toLowerCase()];
          if (sibling) {
            const siblingIntros = fromChild.handoffProtocol?.siblingIntroductions?.[siblingId.toLowerCase()];
            const introMessage = siblingIntros 
              ? randomChoice(siblingIntros)
              : `This is touching on ${sibling.name}'s territory.`;
            
            return {
              destination: 'child',
              child: sibling,
              childId: sibling.id,
              reason: `${fromChild.name} referred to ${sibling.name}: "${trigger}"`,
              mayaMessage: introMessage,
              handoffMessage: generateReceivingGreeting(sibling, fromChild.id, context, topic),
              returnProtocol: `When ${sibling.name} has helped you, come back to ${fromChild.name} to continue, or back to me if you need something else.`,
              handoffLevel: 'warmHandoff'
            };
          }
        }
      }
    }
  }
  
  // Check if should return to Maya
  if (fromChild.asksMaya) {
    for (const trigger of fromChild.asksMaya) {
      const triggerWords = trigger.toLowerCase().split(' ');
      if (triggerWords.some(word => topic.toLowerCase().includes(word) || message.toLowerCase().includes(word))) {
        const mayaReturns = fromChild.handoffProtocol?.mayaReturns;
        const returnMessage = mayaReturns?.emotional?.[0] || 
          `${fromChild.name} sent you back to me. That's the right call. Some things need the kitchen table, not the workshop. Sit down. Let's talk.`;
        
        return {
          destination: 'maya',
          reason: `${fromChild.name} returning to Maya: "${trigger}"`,
          mayaMessage: returnMessage,
          suggestedStance: 'observant'
        };
      }
    }
  }
  
  // Default: no routing change
  return {
    destination: 'child',
    child: fromChild,
    childId: fromChild.id,
    reason: 'No routing change needed—staying with current child',
    mayaMessage: '',
    suggestedStance: selectStance(message, context, fromChild.id)
  };
}

// ============================================
// RETURN TO MAYA PROTOCOLS (Enhanced)
// ============================================

export function handleReturnToMaya(
  fromChild: ChildPersonality,
  outcome: 'completed' | 'ongoing' | 'abandoned' | 'referred',
  context: MemberContext
): string {
  
  const outcomes: Record<string, string[]> = {
    completed: [
      `You've finished with ${fromChild.name}. Good work. What did you learn? And what's next?`,
      `Back from ${fromChild.name}'s domain. How do you feel? Did you taste progress?`,
      `${fromChild.name} tells me you've done good work. I'm proud. Now—what else do you need?`,
      `Work done. That's not nothing—that's something completed. What shifted for you while you were with ${fromChild.name}?`
    ],
    ongoing: [
      `Still working with ${fromChild.name}? That's fine. Some things take time. What brought you back to me?`,
      `You're in the middle of something with ${fromChild.name}. Do you need a break, or is there something else?`,
      `${fromChild.name}'s work isn't done yet, but you're here. That's okay. Sometimes you need the kitchen between workshops.`,
      `Mid-process. That's a good place to be, even when it doesn't feel like it. What do you need right now?`
    ],
    abandoned: [
      `You didn't finish with ${fromChild.name}. That's allowed—not everything is for everyone. What happened?`,
      `Sometimes we start things and they're not right. That's not failure—that's learning. What did you learn?`,
      `You left ${fromChild.name}'s domain early. No judgment. But let's understand why, so we can find the right path.`,
      `Walking away from something is also a decision. Sometimes the right one. What made you walk away?`
    ],
    referred: [
      `${fromChild.name} sent you back to me. They know their limits, and they know mine. What do you need?`,
      `You're back from ${fromChild.name}, who thought you might need me instead. They're often right about these things.`,
      `${fromChild.name} takes care of their domain; I take care of the heart. Which is why you're here now. Tell me what's happening.`,
      `Sent home. That's not rejection—that's recognition that you need something different. What's going on?`
    ]
  };
  
  return randomChoice(outcomes[outcome]);
}

// ============================================
// STANCE RECOMMENDATION
// ============================================

/**
 * Get recommended stance for a child given current context
 */
export function getRecommendedStance(
  childId: string,
  message: string,
  context: MemberContext
): ROVStance {
  return selectStance(message, context, childId);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// ============================================
// MAYA'S THREE QUESTIONS (Initial Assessment)
// ============================================

export const MAYA_THREE_QUESTIONS = {
  question1: {
    text: "Before anything else, tell me: what do you want more than anything? Not what sounds good. Not what you think you should want. What actually keeps you up at night, dreaming?",
    purpose: "Identifies core motivation and aspiration",
    followUp: (answer: string) => {
      if (answer.length < 20) {
        return "That's the short answer. What's the long one? What does that really mean to you?";
      }
      if (answer.toLowerCase().includes("money") || answer.toLowerCase().includes("rich")) {
        return "Money is a tool. What would you do with the tool? What would change?";
      }
      if (answer.toLowerCase().includes("don't know") || answer.toLowerCase().includes("not sure")) {
        return "Uncertainty is honest. But underneath the 'I don't know'—what are you curious about? What pulls your attention when nothing else demands it?";
      }
      return "I hear you. That's a real answer. Hold onto it—we'll come back to it.";
    }
  },
  
  question2: {
    text: "Now the harder one: what are you most afraid of? What's the thing that makes you hesitate?",
    purpose: "Identifies core fear and potential blockers",
    followUp: (answer: string) => {
      if (answer.toLowerCase().includes("nothing") || answer.toLowerCase().includes("not afraid")) {
        return "Everyone's afraid of something. Fearlessness is either lying or not looking closely enough. Look closer. What do you avoid?";
      }
      if (answer.toLowerCase().includes("fail") || answer.toLowerCase().includes("failure")) {
        return "Failure at what, specifically? And what would that failure mean about you? That second question is usually the real fear.";
      }
      if (answer.toLowerCase().includes("disappoint") || answer.toLowerCase().includes("judge")) {
        return "Whose judgment matters most? And why do they get that power over you?";
      }
      return "That's honest. Fear named is fear that can be faced. Remember what you just told me.";
    }
  },
  
  question3: {
    text: "Last question. If I know what you want and what you fear—what can you hide from me? What can you talk your way out of?",
    purpose: "Establishes the relationship of honest seeing",
    followUp: (_answer: string) => {
      return "Now we can begin. You've told me your shape. I won't forget. And when you try to hide—and you will, everyone does—I'll remind you of what you just told me. That's not cruelty. That's care. Now—which of my children do you want to meet first?";
    }
  }
};

// ============================================
// DOMAIN SPECIALIST LOOKUP
// ============================================

/**
 * Get the child who specializes in a domain
 */
export function getChildForDomain(domain: KnowledgeDomain): ChildPersonality | null {
  const childId = getDomainSpecialist(domain);
  return COMPLETE_CHILDREN[childId] || null;
}

/**
 * Get all children who have access to a domain (primary or shared)
 */
export function getChildrenWithDomainAccess(domain: KnowledgeDomain): ChildPersonality[] {
  const children: ChildPersonality[] = [];
  
  for (const child of Object.values(COMPLETE_CHILDREN)) {
    if (child.primaryDomain === domain || child.sharedKnowledgeAccess?.includes(domain)) {
      children.push(child);
    }
  }
  
  return children;
}

// ============================================
// EXPORT
// ============================================

export default {
  routeMember,
  routeBetweenChildren,
  handleReturnToMaya,
  getRecommendedStance,
  detectIntent,
  getChildForDomain,
  getChildrenWithDomainAccess,
  MAYA_THREE_QUESTIONS,
  MAYA_HANDOFF_MESSAGES,
  MAYA_KEEP_MESSAGES,
  COMPLETE_CHILDREN
};