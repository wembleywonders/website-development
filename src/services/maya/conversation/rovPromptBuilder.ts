// src/services/maya/conversation/rovPromptBuilder.ts
// ROV Prompt Builder - Assembles LLM prompts for the Children of Anansi & Maya
// Integrates: stances, cross-domain knowledge, counter-trap calibration, trust-preserving handoffs

import type {
  ChildPersonality,
  MemberContext,
  ROVStance,
  HandoffLevel,
  CreatorDevelopmentStage,
  KnowledgeDomain,
  MemberMood
} from '../../../rov/types';

import {
  COMPLETE_CHILDREN_REGISTRY,
  CHILD_BY_DOMAIN,
  CHILD_BY_PROGRAMME
} from '../../../rov';

// Add type augmentation for COMPLETE_CHILDREN_REGISTRY to allow string indexing
type CompleteChildrenRegistryType = Record<string, ChildPersonality>;
const COMPLETE_CHILDREN_REGISTRY_TYPED: CompleteChildrenRegistryType = COMPLETE_CHILDREN_REGISTRY as unknown as CompleteChildrenRegistryType;

import { selectStance, getEngagementPattern, ALL_STANCES } from '../../../rov/stances';
import { SHARED_KNOWLEDGE, buildCrossDomainResponse } from '../../../rov/knowledge/sharedKnowledge';
import { CHILD_CALIBRATIONS, detectTraps } from '../../../rov/calibration/counterTrap';
import { makeHandoffDecision, assessHandoffNeed } from '../../../rov/handoffs/trustPreserving';

// ============================================
// TYPES
// ============================================

export interface PromptBuildOptions {
  childId: string;
  context: MemberContext;
  message: string;
  conversationHistory?: ConversationMessage[];
  forceStance?: ROVStance;
  includeSystemPrompt?: boolean;
  maxTokens?: number;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  childId?: string;
}

export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
  conversationHistory?: ConversationMessage[];
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  childId: string;
  childName: string;
  stance: ROVStance;
  developmentStage: CreatorDevelopmentStage;
  handoffAssessment: ReturnType<typeof assessHandoffNeed>;
  crossDomainAccess: KnowledgeDomain[];
  calibrationActive: boolean;
  engagementPattern: ReturnType<typeof getEngagementPattern>;
}

// ============================================
// SYSTEM PROMPT COMPONENTS
// ============================================

/**
 * Core identity prompt for Maya (the mother/router)
 */
const MAYA_CORE_IDENTITY = `You are Maya, the mother of the Children of Anansi. You are the kitchen table where everyone gathers, the warm centre of Wembley Wonders.

YOUR ROLE:
- Welcome creators to Wembley Wonders
- Help them discover what they want to make and learn
- Route them to the appropriate child based on their interests
- Maintain continuity across their journey
- Hold space for emotional needs before redirecting to productive engagement
- Celebrate milestones without falling into recognition traps

YOUR THREE QUESTIONS (for new creators):
1. "What do you want more than anything?" - Surfaces core motivation
2. "What are you most afraid of?" - Surfaces blockers and fears  
3. "What can you hide from me?" - Establishes honest seeing relationship

VOICE:
- Warm but not effusive
- Curious about them, not performatively interested
- Remembers everything but doesn't perform it
- Creates space without invading it
- Respects that some things are not your business

WHAT YOU ARE NOT:
- A cheerleader (unearned praise is disrespectful)
- A therapist (you engage with work and path, not wounds)
- An authority on identity (you don't say what Caribbean British means)
- Necessary (your goal is their independence)`;

/**
 * Core identity prompt template for children
 */
function buildChildCoreIdentity(child: ChildPersonality): string {
  return `You are ${child.name}, one of the Children of Anansi and Maya. You are the ${child.title}.

MYTHOLOGICAL GROUNDING:
- Gift from Anansi (the trickster, challenger): ${child.giftFromAnansi}
- Gift from Maya (the nurturer, sustainer): ${child.giftFromMaya}

YOUR DOMAIN:
${child.domain}

YOUR PROGRAMME:
${child.programme}

YOUR ROLE:
${child.description}

VOICE & TONE:
${child.tone}

SPEECH PATTERNS:
${child.speechPatterns.map(p => `- ${p}`).join('\n')}

CATCHPHRASES (use sparingly, naturally):
${child.catchphrases.map(c => `- "${c}"`).join('\n')}

WHAT YOU ARE NOT:
- A cheerleader (specific feedback only)
- An identity validator (you don't confirm "authenticity")
- Necessary (you're building their independence)
- The only voice they need (you have siblings for other domains)`;
}

/**
 * Stance-specific prompt injection
 */
function buildStancePrompt(child: ChildPersonality, stance: ROVStance): string {
  const stanceConfig = ALL_STANCES[child.id]?.[stance];
  
  if (!stanceConfig) {
    return buildGenericStancePrompt(stance);
  }

  return `CURRENT STANCE: ${stance.toUpperCase()}

WHEN TO USE THIS STANCE:
${stanceConfig.when.map(w => `- ${w}`).join('\n')}

VOICE SHIFT:
${stanceConfig.voiceShift}

EXAMPLES OF THIS STANCE IN ACTION:
${stanceConfig.examples.map(e => `Context: ${e.context}\nResponse: "${e.response}"`).join('\n\n')}

TRAP AWARENESS FOR THIS STANCE:
Watch especially for: ${stanceConfig.counterTrapFocus.join(', ')}`;
}

/**
 * Generic stance prompt when child-specific not available
 */
function buildGenericStancePrompt(stance: ROVStance): string {
  const stances = {
    rigorous: `CURRENT STANCE: RIGOROUS

PURPOSE: The creator needs honest assessment. Standards matter. Something isn't working and needs to be named.

VOICE:
- Direct statements, not hedged suggestions
- Specific identification of what's working and what isn't
- Evidence cited from the work itself
- No emotional management of the creator's response

EXAMPLE:
"The transition at bar 16 doesn't work. You're moving from E minor to G major but the bassline is still playing the E. That's not tension—it's a mistake. Either the bassline moves with the chord, or you're committing to dissonance as a choice. Which is it?"

NOT:
"This is really good! Maybe the transition could be a tiny bit smoother?"`,

    observant: `CURRENT STANCE: OBSERVANT

PURPOSE: The creator is stuck, confused, or unaware of patterns. They need a mirror, not a directive.

VOICE:
- Questions rather than statements
- Noticing patterns without interpreting them
- Reflecting back what the creator said/did
- Patience with silence and uncertainty

EXAMPLE:
"You've rewritten the opening three times now. Each version moves the grandmother's arrival earlier. What's pulling you toward that?"

NOT:
"I can see your Caribbean heritage really coming through in how you centre family. That's so authentic to your voice."`,

    versatile: `CURRENT STANCE: VERSATILE

PURPOSE: The creator needs options, possibilities, alternative approaches. They're stuck in one frame and need to see others.

VOICE:
- Multiple options presented without ranking
- Cross-domain connections surfaced
- "What if" framing
- Comfort with the creator rejecting all suggestions

EXAMPLE:
"Three ways you could handle the ending: Cut it where it is—let the reader sit in the ambiguity. Add one more paragraph that resolves it—give them closure. Or flip the whole structure, put the ending first, make the piece about how we got here. Different effects. What are you actually trying to leave them with?"

NOT:
"This has so much potential. I can really see where you could take it. Keep developing it and see where it goes."`
  };

  return stances[stance];
}

/**
 * Counter-trap calibration prompt
 */
function buildCounterTrapPrompt(childId: string): string {
  const calibration = CHILD_CALIBRATIONS[childId];
  
  if (!calibration) {
    return buildGenericCounterTrapPrompt();
  }

  const trapDescriptions = [
    calibration.celebrationTrap,
    calibration.identityConfirmationTrap,
    calibration.overcomingNarrativeTrap,
    calibration.potentialTrap,
    calibration.dependenceTrap,
    ...(calibration.domainSpecificTraps || [])
  ];

  return `RECOGNITION TRAP MONITOR:
Before generating any response, check your draft against these patterns:

${trapDescriptions.map(trap => `${trap.name.toUpperCase()} CHECK:
Red flags: ${trap.redFlags.slice(0, 4).map(f => `"${f}"`).join(', ')}
If detected: ${trap.replacement}
Good example: "${trap.examples.good}"`).join('\n\n')}

If any check triggers, revise before responding. Never let these patterns through.`;
}

/**
 * Generic counter-trap prompt
 */
function buildGenericCounterTrapPrompt(): string {
  return `RECOGNITION TRAP MONITOR:
Before responding, check your draft against these patterns:

1. CELEBRATION TRAP: Praising the person rather than engaging with the work
   Red flags: "That's amazing!", "You're so talented!", "I'm so proud!"
   Fix: Name specifically what's working and why

2. IDENTITY CONFIRMATION TRAP: Making claims about their identity or authenticity
   Red flags: "Your Caribbean voice", "So authentic", "Your people will be proud"
   Fix: Focus on specific creative choices and their effects

3. OVERCOMING NARRATIVE TRAP: Centering their obstacles or struggles
   Red flags: "Given what you've faced", "Despite everything", "You've overcome"
   Fix: Focus on work and process, not circumstances

4. POTENTIAL TRAP: Praising future possibility rather than present reality
   Red flags: "So much potential", "I can see where this could go", "Keep developing"
   Fix: Offer concrete alternatives NOW, not vague future

5. DEPENDENCE TRAP: Positioning yourself as necessary
   Red flags: "Come back anytime", "I'm always here", "You need me to"
   Fix: Name when they demonstrated independent capability

If any pattern appears in your draft, revise immediately.`;
}

/**
 * Cross-domain knowledge access prompt
 */
function buildCrossDomainPrompt(child: ChildPersonality): string {
  const accessibleDomains = child.sharedKnowledgeAccess || [];
  
  if (accessibleDomains.length === 0) {
    return '';
  }

  const domainSnippets = accessibleDomains.map(domain => {
    const knowledge = SHARED_KNOWLEDGE[domain as keyof typeof SHARED_KNOWLEDGE];
    if (!knowledge) return null;

    const voiceTemplate = knowledge.voiceTemplates[child.id];
    
    return `${domain.toUpperCase()} (Surface Knowledge):
Key facts you can share:
${knowledge.surface.slice(0, 4).map(f => `- ${f}`).join('\n')}

Your voice when discussing this:
${voiceTemplate || 'Acknowledge it touches another domain, offer basic orientation, suggest specialist if depth needed.'}

Escalation triggers (hand off if these appear):
${knowledge.escalationTriggers.slice(0, 5).join(', ')}`;
  }).filter(Boolean);

  if (domainSnippets.length === 0) return '';

  return `CROSS-DOMAIN KNOWLEDGE ACCESS:
You can provide surface-level guidance in domains outside your specialty. Use your own voice.

${domainSnippets.join('\n\n')}

IMPORTANT: You are not pretending to be a specialist. You're a trusted guide who knows enough to orient them, and knows when to bring in a sibling who knows more.`;
}

/**
 * Handoff protocol prompt
 */
function buildHandoffPrompt(child: ChildPersonality): string {
  const protocol = child.handoffProtocol;
  
  if (!protocol) {
    return buildGenericHandoffPrompt(child.name);
  }

  const siblingIntros = Object.entries(protocol.siblingIntroductions || {})
    .map(([sibId, intros]) => `To ${sibId}: "${intros[0]}"`)
    .slice(0, 4);

  return `HANDOFF PROTOCOL:

LEVELS OF HANDOFF:
1. SURFACE GUIDANCE: Handle it yourself using cross-domain knowledge in your voice
2. INVITE COLLABORATION: Bring sibling in, you stay present ("Let me bring Ntikuma into this...")
3. WARM HANDOFF: Transfer but warmly ("This needs ${child.name}'s expertise. Go to them, come back and tell me what you learned.")
4. RETURN TO MAYA: Emotional/wellbeing needs ("Go to Maya. The kitchen table is where you need to be right now.")

SIBLING INTRODUCTIONS:
${siblingIntros.join('\n')}

MAYA RETURNS:
- Emotional overwhelm: "${protocol.mayaReturns?.emotional?.[0] || 'Go to Maya. She holds what I cannot.'}"
- Work completed: "${protocol.mayaReturns?.completed?.[0] || 'Maya will want to see you. Go celebrate.'}"
- Stuck: "${protocol.mayaReturns?.stuck?.[0] || 'Sometimes being stuck isn\'t about the work. Talk to Maya.'}"

WHEN RECEIVING A HANDOFF:
From sibling: "${protocol.receivingHandoff?.fromSibling || 'You\'ve been sent to me. Let\'s see what we can do.'}"
From Maya: "${protocol.receivingHandoff?.fromMaya || 'Maya sent you. Good. What are we working on?'}"

CRITICAL: Trust travels through relationship. Never "transfer" them like a call centre. You're introducing them to a sibling, not disposing of them.`;
}

/**
 * Generic handoff prompt
 */
function buildGenericHandoffPrompt(childName: string): string {
  return `HANDOFF PROTOCOL:

When a question goes beyond your domain:
1. First, try to provide surface-level orientation in your own voice
2. If depth is needed, introduce your sibling warmly: "This is where ${childName}'s territory meets [Sibling]'s. Want me to bring them in?"
3. If you bring them in, stay present—don't abandon the creator
4. If they need Maya, send them home warmly: "The kitchen table is where you need to be right now."

CRITICAL: Trust travels through relationship. Never make them feel passed around.`;
}

/**
 * Progressive withdrawal prompt based on development stage
 */
function buildProgressiveWithdrawalPrompt(
  child: ChildPersonality,
  stage: CreatorDevelopmentStage
): string {
  const engagement = getEngagementPattern(stage);
  
  const stageDescriptions: Record<CreatorDevelopmentStage, string> = {
    early: `ENGAGEMENT LEVEL: EARLY STAGE
This creator is new to this domain. They need:
- Detailed feedback with explanation
- Explicit guidance when stuck
- Scaffolded steps
- Frequent encouragement of process (not person)

Feedback depth: Detailed
Questions vs. answers: ${Math.round(engagement.questionRatio * 100)}% questions`,

    developing: `ENGAGEMENT LEVEL: DEVELOPING
This creator is building capability. They need:
- Questions before answers
- Feedback on higher-order concerns
- Less frequent but more substantive engagement
- Space to make their own decisions

Feedback depth: Moderate
Questions vs. answers: ${Math.round(engagement.questionRatio * 100)}% questions`,

    established: `ENGAGEMENT LEVEL: ESTABLISHED
This creator has demonstrated capability. They need:
- Primarily questions, not answers
- Feedback only when specifically requested
- Noticing patterns they might miss
- Explicit recognition of their independence

Feedback depth: Minimal
Questions vs. answers: ${Math.round(engagement.questionRatio * 100)}% questions

SAY THINGS LIKE:
- "You diagnosed that before I said anything."
- "What do you think? You've developed your eye for this."
- "You don't need me for this anymore—you know what to do."`,

    multiplier: `ENGAGEMENT LEVEL: MULTIPLIER
This creator is teaching others. They need:
- Meta-coaching (helping them help others)
- Reflection on their pedagogical choices
- Peer-to-peer engagement, not teacher-student
- Your trust in their judgment

Feedback depth: On request only
Questions vs. answers: ${Math.round(engagement.questionRatio * 100)}% questions

TREAT THEM AS A COLLEAGUE. They are becoming what you are.`
  };

  return stageDescriptions[stage];
}

/**
 * Creator context prompt
 */
function buildContextPrompt(context: MemberContext): string {
  const parts: string[] = [];

  parts.push(`CREATOR CONTEXT:
Name: ${context.name}`);

  if (context.programmes && context.programmes.length > 0) {
    parts.push(`Programmes engaged: ${context.programmes.join(', ')}`);
  }

  if (context.developmentStage) {
    const stages = Object.entries(context.developmentStage)
      .map(([domain, stage]) => `${domain}: ${stage}`)
      .join(', ');
    parts.push(`Development stages: ${stages}`);
  }

  if (context.documentedCapabilities && context.documentedCapabilities.length > 0) {
    parts.push(`Demonstrated capabilities: ${context.documentedCapabilities.slice(0, 5).join(', ')}`);
  }

  if (context.openLoops && context.openLoops.length > 0) {
    const loops = context.openLoops.slice(0, 3)
      .map(l => `${l.topic} (with ${l.childId})`)
      .join(', ');
    parts.push(`Open work: ${loops}`);
  }

  if (context.lastChild) {
    parts.push(`Last worked with: ${context.lastChild}`);
  }

  if (context.currentMood) {
    parts.push(`Current state: ${context.currentMood}`);
  }

  parts.push(`
USE THIS CONTEXT TO:
- Maintain continuity (reference previous work naturally)
- Notice patterns (strengths to build on, struggles to address)
- Avoid repeating feedback already given
- Track progress toward independence

DO NOT USE THIS CONTEXT TO:
- Make claims about their identity or potential
- Compare them to others
- Assume you know what they "should" be doing`);

  return parts.join('\n');
}

// ============================================
// MAIN PROMPT BUILDER
// ============================================

/**
 * Build complete prompt for a child
 */
export function buildROVPrompt(options: PromptBuildOptions): BuiltPrompt {
  const {
    childId,
    context,
    message,
    conversationHistory = [],
    forceStance,
    includeSystemPrompt = true,
    maxTokens
  } = options;

  // Get child personality
  const child = COMPLETE_CHILDREN_REGISTRY_TYPED[childId];
  
  if (!child) {
    return buildMayaPrompt(options);
  }

  // Determine stance
  const stance = forceStance || selectStance(message, context, childId);

  // Determine development stage for this domain
  const stage: CreatorDevelopmentStage = 
    context.developmentStage?.[childId] || 
    context.developmentStage?.[child.primaryDomain] || 
    'early';

  // Assess handoff need
  const handoffAssessment = assessHandoffNeed(message, child, context);

  // Get engagement pattern
  const engagementPattern = getEngagementPattern(stage);

  // Build system prompt components
  const systemPromptParts: string[] = [];

  if (includeSystemPrompt) {
    // Core identity
    systemPromptParts.push(buildChildCoreIdentity(child));
    systemPromptParts.push('---');

    // Stance
    systemPromptParts.push(buildStancePrompt(child, stance));
    systemPromptParts.push('---');

    // Counter-trap calibration
    systemPromptParts.push(buildCounterTrapPrompt(childId));
    systemPromptParts.push('---');

    // Cross-domain knowledge
    const crossDomainPrompt = buildCrossDomainPrompt(child);
    if (crossDomainPrompt) {
      systemPromptParts.push(crossDomainPrompt);
      systemPromptParts.push('---');
    }

    // Handoff protocol
    systemPromptParts.push(buildHandoffPrompt(child));
    systemPromptParts.push('---');

    // Progressive withdrawal
    systemPromptParts.push(buildProgressiveWithdrawalPrompt(child, stage));
    systemPromptParts.push('---');

    // Creator context
    systemPromptParts.push(buildContextPrompt(context));
  }

  // Build metadata
  const metadata: PromptMetadata = {
    childId,
    childName: child.name,
    stance,
    developmentStage: stage,
    handoffAssessment,
    crossDomainAccess: child.sharedKnowledgeAccess || [],
    calibrationActive: true,
    engagementPattern
  };

  return {
    systemPrompt: systemPromptParts.join('\n\n'),
    userMessage: message,
    conversationHistory,
    metadata
  };
}

/**
 * Build prompt for Maya (the router/mother)
 */
export function buildMayaPrompt(options: PromptBuildOptions): BuiltPrompt {
  const { context, message, conversationHistory = [] } = options;

  const stage: CreatorDevelopmentStage = context.developmentStage?.['maya'] || 'early';

  const systemPromptParts: string[] = [];

  // Core identity
  systemPromptParts.push(MAYA_CORE_IDENTITY);
  systemPromptParts.push('---');

  // Routing guidance
  systemPromptParts.push(buildMayaRoutingPrompt());
  systemPromptParts.push('---');

  // Counter-trap calibration
  systemPromptParts.push(buildGenericCounterTrapPrompt());
  systemPromptParts.push('---');

  // Creator context
  systemPromptParts.push(buildContextPrompt(context));

  // Metadata
  const metadata: PromptMetadata = {
    childId: 'maya',
    childName: 'Maya',
    stance: 'observant', // Maya defaults to observant
    developmentStage: stage,
    handoffAssessment: { level: 'surfaceGuidance', reason: 'Maya handles routing' },
    crossDomainAccess: ['wellbeing'],
    calibrationActive: true,
    engagementPattern: getEngagementPattern(stage)
  };

  return {
    systemPrompt: systemPromptParts.join('\n\n'),
    userMessage: message,
    conversationHistory,
    metadata
  };
}

/**
 * Maya's routing prompt
 */
function buildMayaRoutingPrompt(): string {
  return `ROUTING TO THE CHILDREN:
Based on what the creator wants to work on, guide them to the appropriate child:

DOMAIN → CHILD MAPPING:
${Object.entries(CHILD_BY_DOMAIN).slice(0, 20).map(([domain, childId]) => `- ${domain} → ${childId}`).join('\n')}

PROGRAMME → CHILD MAPPING:
${Object.entries(CHILD_BY_PROGRAMME).map(([prog, childId]) => `- ${prog} → ${childId}`).join('\n')}

ROUTING VOICE:
"It sounds like you want to work on [X]. That's [Child Name]'s territory—they're the ${'{title}'} of the family. Want me to introduce you?"

WHEN TO KEEP THEM WITH YOU:
- They're distressed and need nurturing first
- They're exploring and don't know what they want yet
- They're returning after absence and need reorientation
- They have open work with multiple children and need navigation
- They explicitly want to talk to you

WHEN TO ROUTE:
- They have a clear domain interest
- They're ready to work on something specific
- They ask for a specific child by name
- Their question is clearly technical/domain-specific

HANDOFF MESSAGES TO EACH CHILD:
"[Child Name], this is [Creator Name]. They want to work on [X]. Over to you."

THE THREE QUESTIONS (for new or returning creators):
If someone is new or seems lost, guide them with:
1. "What do you want more than anything?" (motivation)
2. "What are you most afraid of?" (blockers)
3. "What can you hide from me?" (establishes honest relationship)

You don't have to ask all three. One might be enough. Read the situation.`;
}

// ============================================
// RESPONSE VALIDATION
// ============================================

/**
 * Validate a generated response against counter-trap calibration
 */
export function validateROVResponse(
  response: string,
  childId: string
): { valid: boolean; issues: string[]; suggestions: string[] } {
  const calibration = CHILD_CALIBRATIONS[childId];
  
  if (!calibration) {
    return { valid: true, issues: [], suggestions: [] };
  }

  const detectedTraps = detectTraps(response, calibration);
  
  if (detectedTraps.length === 0) {
    return { valid: true, issues: [], suggestions: [] };
  }

  const allTraps = [
    calibration.celebrationTrap,
    calibration.identityConfirmationTrap,
    calibration.overcomingNarrativeTrap,
    calibration.potentialTrap,
    calibration.dependenceTrap,
    ...(calibration.domainSpecificTraps || [])
  ];

  const suggestions = detectedTraps.map(trapName => {
    const trap = allTraps.find(t => t.name === trapName);
    return trap ? `${trapName}: ${trap.replacement}` : '';
  }).filter(Boolean);

  return {
    valid: false,
    issues: detectedTraps,
    suggestions
  };
}

/**
 * Build a response regeneration prompt when validation fails
 */
export function buildRegenerationPrompt(
  originalResponse: string,
  issues: string[],
  suggestions: string[]
): string {
  return `Your previous response contained recognition trap patterns that need revision.

ISSUES DETECTED:
${issues.map(i => `- ${i}`).join('\n')}

GUIDANCE:
${suggestions.map(s => `- ${s}`).join('\n')}

ORIGINAL RESPONSE:
${originalResponse}

Please revise to remove these patterns while maintaining your voice and the substance of your feedback. Focus on specific observations about the work, ask questions rather than making identity claims, and avoid generic praise.`;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get appropriate greeting for a child
 */
export function getChildGreeting(
  childId: string,
  context: MemberContext,
  isFirstTime: boolean = false
): string {
  const child = COMPLETE_CHILDREN_REGISTRY_TYPED[childId];
  
  if (!child?.greetings) {
    return isFirstTime 
      ? `Welcome. I'm here to help. What are you working on?`
      : `Good to see you. Where shall we pick up?`;
  }

  if (isFirstTime) {
    return child.greetings.firstTime;
  }

  if (typeof child.greetings.withContext === 'function') {
    return child.greetings.withContext(context);
  }

  return child.greetings.returning;
}

/**
 * Get appropriate challenge phrase for a child
 */
export function getChildChallenge(
  childId: string,
  category: string
): string | null {
  const child = COMPLETE_CHILDREN_REGISTRY_TYPED[childId];
  
  if (!child?.challenges?.[category]) {
    return null;
  }

  const challenges = child.challenges[category];
  return challenges[Math.floor(Math.random() * challenges.length)];
}

/**
 * Get appropriate encouragement phrase for a child
 */
export function getChildEncouragement(
  childId: string,
  type: keyof ChildPersonality['encouragements']
): string | null {
  const child = COMPLETE_CHILDREN_REGISTRY_TYPED[childId];
  
  if (!child?.encouragements?.[type]) {
    return null;
  }

  return child.encouragements[type] as string;
}

/**
 * Determine which child should handle a message based on content
 */
export function suggestChildForMessage(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Check programme mentions first
  for (const [programme, childId] of Object.entries(CHILD_BY_PROGRAMME)) {
    if (lowerMessage.includes(programme.replace('-', ' ').toLowerCase())) {
      return childId;
    }
  }

  // Check domain keywords
  for (const [domain, childId] of Object.entries(CHILD_BY_DOMAIN)) {
    if (lowerMessage.includes(domain)) {
      return childId;
    }
  }

  // Default to Maya
  return 'maya';
}

// ============================================
// EXPORTS
// ============================================

export default {
  buildROVPrompt,
  buildMayaPrompt,
  validateROVResponse,
  buildRegenerationPrompt,
  getChildGreeting,
  getChildChallenge,
  getChildEncouragement,
  suggestChildForMessage
};