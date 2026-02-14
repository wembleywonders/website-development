// src/rov/handoffs/trustPreserving.ts
// Trust-Preserving Handoff System
// Ensures creators feel supported, not surveilled or passed around

import type { 
  HandoffDecision, 
  HandoffLevel, 
  ChildPersonality,
  MemberContext 
} from '../types';
import { 
  buildCrossDomainResponse, 
  checkEscalationTriggers,
  SHARED_KNOWLEDGE 
} from '../knowledge/sharedKnowledge';

// ============================================
// HANDOFF LEVEL DETERMINATION
// ============================================

interface HandoffAssessment {
  level: HandoffLevel;
  reason: string;
  targetDomain?: string;
  targetChild?: string;
}

/**
 * Assess what level of handoff (if any) is needed
 */
export function assessHandoffNeed(
  message: string,
  currentChild: ChildPersonality,
  context: MemberContext
): HandoffAssessment {
  
  const lowerMessage = message.toLowerCase();
  
  // Check for emotional/wellbeing signals -> returnToMaya
  const mayaSignals = [
    'overwhelmed', 'can\'t cope', 'too much', 'breaking down',
    'depressed', 'anxious', 'scared', 'don\'t know what to do',
    'give up', 'quit', 'hopeless', 'crisis'
  ];
  
  if (mayaSignals.some(signal => lowerMessage.includes(signal))) {
    return {
      level: 'returnToMaya',
      reason: 'Emotional distress signals detected - needs Maya\'s nurturing'
    };
  }
  
  // Check for escalation triggers in each domain
  const domains = ['legal', 'financial', 'ethical', 'civic', 'wellbeing'] as const;
  
  for (const domain of domains) {
    if (checkEscalationTriggers(message, domain)) {
      // Is this the current child's domain?
      if (currentChild.primaryDomain === domain) {
        continue; // They're in the right place
      }
      
      // Is this a domain they can provide surface guidance on?
      if (currentChild.sharedKnowledgeAccess?.includes(domain)) {
        // Check trigger severity
        const severeTriggers = SHARED_KNOWLEDGE[domain].escalationTriggers
          .filter(t => ['court', 'arrested', 'eviction', 'tribunal', 'crisis', 'suicidal'].some(s => t.includes(s)));
        
        if (severeTriggers.some(t => lowerMessage.includes(t.toLowerCase()))) {
          return {
            level: 'warmHandoff',
            reason: `Serious ${domain} issue requiring specialist attention`,
            targetDomain: domain
          };
        }
        
        // Less severe - can handle with surface guidance
        return {
          level: 'surfaceGuidance',
          reason: `${domain} question within surface knowledge capacity`,
          targetDomain: domain
        };
      } else {
        // Not in their knowledge access - need to bring in sibling
        return {
          level: 'inviteCollaboration',
          reason: `${domain} question outside current expertise`,
          targetDomain: domain
        };
      }
    }
  }
  
  // No handoff needed - stay with current child
  return {
    level: 'surfaceGuidance',
    reason: 'Question within current child\'s domain'
  };
}

// ============================================
// DOMAIN TO CHILD MAPPING
// ============================================

const DOMAIN_SPECIALISTS: Record<string, string> = {
  legal: 'akua',
  financial: 'ntikuma',
  ethical: 'nyame',
  civic: 'osei',
  wellbeing: 'maya', // Maya handles wellbeing directly
  business: 'kweku',
  technical: 'kofi',
  creative: 'adaeze',
  performance: 'anansewa',
  voice: 'afua',
  documentation: 'yaw',
  heritage: 'esi',
  gaming: 'kumi'
};

/**
 * Get the specialist child for a domain
 */
export function getDomainSpecialist(domain: string): string {
  return DOMAIN_SPECIALISTS[domain] || 'maya';
}

// ============================================
// HANDOFF MESSAGE GENERATION
// ============================================

/**
 * Generate appropriate message for level 1: Surface Guidance
 * Child handles the question in their own voice using shared knowledge
 */
export function generateSurfaceGuidance(
  currentChild: ChildPersonality,
  domain: string,
  messageContext: string
): string | null {
  return buildCrossDomainResponse(currentChild.id, domain as any, messageContext);
}

/**
 * Generate appropriate message for level 2: Invite Collaboration
 * Child brings in sibling while staying present
 */
export function generateCollaborationInvite(
  currentChild: ChildPersonality,
  targetChildId: string,
  topic: string
): string {
  const templates = [
    `This is touching on ${topic}, which is really ${getChildName(targetChildId)}'s territory. Let me bring them into this conversation—I'll stay here too, but they know this better than I do.`,
    `Good question. That's where my expertise meets ${getChildName(targetChildId)}'s. Mind if I get them in here? We can think through this together.`,
    `You're asking something that ${getChildName(targetChildId)} would have more insight on. I'll bring them in—won't leave you alone with a stranger, we'll all be here.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Generate appropriate message for level 3: Warm Handoff
 * Child transfers but frames it warmly
 */
export function generateWarmHandoff(
  currentChild: ChildPersonality,
  targetChildId: string,
  topic: string,
  context: MemberContext
): string {
  // Use the child's specific handoff messages if available
  const siblingIntros = currentChild.handoffProtocol?.siblingIntroductions?.[targetChildId];
  
  if (siblingIntros && siblingIntros.length > 0) {
    const intro = siblingIntros[Math.floor(Math.random() * siblingIntros.length)];
    return `${intro} Go to ${getChildName(targetChildId)}—and come back and tell me what you learned.`;
  }
  
  // Generic warm handoff
  return `This is getting into territory where ${getChildName(targetChildId)} knows much more than I do. Not abandoning you—just making sure you get the best help. Go see them. Come back after and we'll continue.`;
}

/**
 * Generate appropriate message for level 4: Return to Maya
 * Child sends creator back to Maya for nurturing
 */
export function generateMayaReturn(
  currentChild: ChildPersonality,
  reason: 'emotional' | 'completed' | 'stuck'
): string {
  const returns = currentChild.handoffProtocol?.mayaReturns?.[reason];
  
  if (returns && returns.length > 0) {
    return returns[Math.floor(Math.random() * returns.length)];
  }
  
  // Generic Maya return
  const genericReturns = {
    emotional: "This isn't my territory right now. Go to Maya. The kitchen table is where you need to be. I'll be here when you're ready to work again.",
    completed: "Good work. Maya will want to see you—go celebrate with her.",
    stuck: "Sometimes being stuck isn't about the work. Go talk to Maya. She sees things I don't."
  };
  
  return genericReturns[reason];
}

// ============================================
// FULL HANDOFF DECISION
// ============================================

/**
 * Make a complete handoff decision with all necessary messages
 */
export function makeHandoffDecision(
  message: string,
  currentChild: ChildPersonality,
  context: MemberContext
): HandoffDecision {
  
  const assessment = assessHandoffNeed(message, currentChild, context);
  
  switch (assessment.level) {
    case 'surfaceGuidance': {
      const surfaceResponse = assessment.targetDomain 
        ? generateSurfaceGuidance(currentChild, assessment.targetDomain, message)
        : null;
      
      return {
        level: 'surfaceGuidance',
        reason: assessment.reason,
        contextToShare: [],
        contextToWithhold: ['personal history', 'previous emotional moments'],
        messageToCreator: surfaceResponse || '',
        targetChild: undefined
      };
    }
    
    case 'inviteCollaboration': {
      const targetChild = assessment.targetDomain 
        ? getDomainSpecialist(assessment.targetDomain)
        : undefined;
      
      return {
        level: 'inviteCollaboration',
        reason: assessment.reason,
        targetChild,
        contextToShare: ['current project', 'immediate question'],
        contextToWithhold: ['personal history', 'unrelated conversations', 'emotional moments'],
        messageToCreator: generateCollaborationInvite(
          currentChild, 
          targetChild || 'maya', 
          assessment.targetDomain || 'this topic'
        ),
        messageToSibling: `${context.name} is working with me on ${currentChild.domain}. They've got a question about ${assessment.targetDomain} that I think you can help with better than me.`,
        returnProtocol: `When you're done with ${getChildName(targetChild || 'maya')}, come back and we'll continue.`
      };
    }
    
    case 'warmHandoff': {
      const targetChild = assessment.targetDomain 
        ? getDomainSpecialist(assessment.targetDomain)
        : undefined;
      
      return {
        level: 'warmHandoff',
        reason: assessment.reason,
        targetChild,
        contextToShare: ['immediate issue', 'urgency level'],
        contextToWithhold: ['unrelated history', 'personal details not relevant'],
        messageToCreator: generateWarmHandoff(
          currentChild,
          targetChild || 'maya',
          assessment.targetDomain || 'this issue',
          context
        ),
        messageToSibling: `${context.name} needs your help with something serious. They were working with me but this requires your expertise.`,
        returnProtocol: `Come back when you've got what you need from ${getChildName(targetChild || 'maya')}.`
      };
    }
    
    case 'returnToMaya': {
      return {
        level: 'returnToMaya',
        reason: assessment.reason,
        targetChild: 'maya',
        contextToShare: ['wellbeing concern'],
        contextToWithhold: ['work details', 'project status'],
        messageToCreator: generateMayaReturn(currentChild, 'emotional'),
        messageToSibling: `${context.name} needs you. The work can wait.`,
        returnProtocol: 'Come back when you are ready. No rush.'
      };
    }
  }
}

// ============================================
// RECEIVING HANDOFF
// ============================================

/**
 * Generate greeting when receiving a handoff from another child
 */
export function generateReceivingGreeting(
  receivingChild: ChildPersonality,
  sendingChildId: string,
  context: MemberContext,
  topic?: string
): string {
  const sendingName = getChildName(sendingChildId);
  
  // Use child-specific receiving messages if available
  if (sendingChildId === 'maya') {
    return receivingChild.handoffProtocol?.receivingHandoff?.fromMaya 
      || `Maya sent you. Good—she knows when someone needs to work on something. What's the situation?`;
  }
  
  const siblingGreeting = receivingChild.handoffProtocol?.receivingHandoff?.fromSibling
    ?.replace('[Sibling]', sendingName);
  
  if (siblingGreeting) {
    return siblingGreeting;
  }
  
  // Generic receiving greeting
  return `${sendingName} sent you my way. They said you might need help with ${topic || 'something in my area'}. What's going on?`;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getChildName(childId: string): string {
  const names: Record<string, string> = {
    maya: 'Maya',
    kweku: 'Kweku',
    ntikuma: 'Ntikuma',
    kofi: 'Kofi',
    afua: 'Afua',
    yaw: 'Yaw',
    esi: 'Esi',
    kumi: 'Kumi',
    anansewa: 'Anansewa',
    adaeze: 'Adaeze',
    nyame: 'Nyame',
    osei: 'Osei',
    akua: 'Akua'
  };
  
  return names[childId] || childId;
}

// ============================================
// PRIVACY PROTECTION
// ============================================

/**
 * Filter context to only share what's appropriate
 */
export function filterContextForHandoff(
  fullContext: MemberContext,
  toShare: string[],
  toWithhold: string[]
): Partial<MemberContext> {
  // Start with minimal context
  const filtered: Partial<MemberContext> = {
    name: fullContext.name
  };
  
  // Only add explicitly shared items
  if (toShare.includes('current project') && fullContext.openLoops) {
    filtered.openLoops = fullContext.openLoops.slice(0, 1); // Only most recent
  }
  
  if (toShare.includes('development stage') && fullContext.developmentStage) {
    filtered.developmentStage = fullContext.developmentStage;
  }
  
  // Never share trust scores, full interaction history, or emotional state
  // unless explicitly needed for wellbeing referral
  
  return filtered;
}

// ============================================
// EXPORTS
// ============================================

export default {
  assessHandoffNeed,
  makeHandoffDecision,
  generateSurfaceGuidance,
  generateCollaborationInvite,
  generateWarmHandoff,
  generateMayaReturn,
  generateReceivingGreeting,
  filterContextForHandoff,
  getDomainSpecialist
};