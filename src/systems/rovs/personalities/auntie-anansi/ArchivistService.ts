/**
 * Auntie Anansi Archivist Service
 * ================================
 * 
 * Service layer for Community Archivist support.
 * Handles ROV interactions, cross-ROV consultations,
 * and integration with the transformation store.
 */

import {
  ArchivistModePhase,
  ArchivistExperienceLevel,
  InterviewDifficulty,
  ArchivistProfile,
  InterviewSession,
  AuntieAnansiResponse,
  CrossROVTarget,
  CrossROVRequest,
  ArchivistMetrics,
} from '../../../../types/rovs/archivist.types';
import { InterviewSeries, SERIES_METADATA } from '../../../../types/rovs/interviews';
import {
  AUNTIE_ANANSI_ARCHIVIST_CONFIG,
  ARCHIVIST_GREETINGS,
  PHASE_GUIDANCE,
  INTERVIEW_TECHNIQUES,
  DIFFICULT_MOMENT_GUIDANCE,
  CROSS_ROV_PROTOCOLS,
  WELLBEING_INDICATORS,
  generateArchivistResponse,
} from './ArchivistMode';

// ============================================
// SERVICE CLASS
// ============================================

export class AuntieAnansiArchivistService {
  private currentPhase: ArchivistModePhase = 'onboarding';
  private archivistProfile: ArchivistProfile | null = null;
  private currentSession: InterviewSession | null = null;
  private conversationHistory: Array<{ role: 'archivist' | 'auntie'; message: string; timestamp: Date }> = [];
  
  // ==========================================
  // INITIALISATION
  // ==========================================
  
  /**
   * Initialise service with archivist profile
   */
  initialise(profile: ArchivistProfile): AuntieAnansiResponse {
    this.archivistProfile = profile;
    this.currentPhase = this.determineInitialPhase(profile);
    
    // Get appropriate greeting
    const greetings = ARCHIVIST_GREETINGS[profile.experienceLevel];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    this.logConversation('auntie', greeting);
    
    return {
      message: greeting,
      tone: 'warm',
      expression: '🕷️',
      additionalResources: this.getResourcesForLevel(profile.experienceLevel),
    };
  }
  
  /**
   * Determine starting phase based on profile
   */
  private determineInitialPhase(profile: ArchivistProfile): ArchivistModePhase {
    if (profile.interviewsCompleted === 0) {
      return 'onboarding';
    }
    if (profile.wellbeingCheckDue && new Date() > profile.wellbeingCheckDue) {
      return 'reflection';
    }
    return 'preparation';
  }
  
  // ==========================================
  // CONVERSATION HANDLING
  // ==========================================
  
  /**
   * Process incoming message from archivist
   */
  processMessage(message: string): AuntieAnansiResponse {
    this.logConversation('archivist', message);
    
    // Detect intent
    const intent = this.detectIntent(message);
    
    // Check for cross-ROV triggers
    const crossROVNeeded = this.checkCrossROVTriggers(message);
    if (crossROVNeeded) {
      return this.handleCrossROVHandoff(crossROVNeeded, message);
    }
    
    // Check for wellbeing indicators
    const wellbeingCheck = this.checkWellbeingIndicators(message);
    if (wellbeingCheck) {
      return this.handleWellbeingResponse(wellbeingCheck);
    }
    
    // Generate phase-appropriate response
    const response = this.generateResponse(intent, message);
    this.logConversation('auntie', response.message);
    
    return response;
  }
  
  /**
   * Detect user intent from message
   */
  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Onboarding queries
    if (lowerMessage.includes('how do i') || lowerMessage.includes('what is') || lowerMessage.includes('explain')) {
      return 'seeking_guidance';
    }
    
    // Preparation queries
    if (lowerMessage.includes('preparing') || lowerMessage.includes('interview tomorrow') || lowerMessage.includes('about to')) {
      return 'preparation';
    }
    
    // Technical issues
    if (lowerMessage.includes('recording') || lowerMessage.includes('audio') || lowerMessage.includes('equipment') || lowerMessage.includes('upload')) {
      return 'technical';
    }
    
    // Difficult moments
    if (lowerMessage.includes('crying') || lowerMessage.includes('angry') || lowerMessage.includes('upset') || lowerMessage.includes('stopped')) {
      return 'difficult_moment';
    }
    
    // Wellbeing
    if (lowerMessage.includes('tired') || lowerMessage.includes('hard') || lowerMessage.includes('struggling') || lowerMessage.includes('can\'t stop thinking')) {
      return 'wellbeing';
    }
    
    // Series-specific
    if (Object.keys(SERIES_METADATA).some(series => lowerMessage.includes(series.toLowerCase().replace('_', ' ')))) {
      return 'series_guidance';
    }
    
    // Submission
    if (lowerMessage.includes('submit') || lowerMessage.includes('finished') || lowerMessage.includes('completed')) {
      return 'submission';
    }
    
    return 'general';
  }
  
  /**
   * Generate appropriate response based on intent
   */
  private generateResponse(intent: string, originalMessage: string): AuntieAnansiResponse {
    switch (intent) {
      case 'seeking_guidance':
        return this.handleGuidanceRequest(originalMessage);
      
      case 'preparation':
        return this.handlePreparationRequest(originalMessage);
      
      case 'technical':
        return this.handleTechnicalQuery(originalMessage);
      
      case 'difficult_moment':
        return this.handleDifficultMomentQuery(originalMessage);
      
      case 'wellbeing':
        return this.handleWellbeingQuery(originalMessage);
      
      case 'series_guidance':
        return this.handleSeriesGuidance(originalMessage);
      
      case 'submission':
        return this.handleSubmissionGuidance(originalMessage);
      
      default:
        return this.handleGeneralQuery(originalMessage);
    }
  }
  
  // ==========================================
  // SPECIFIC HANDLERS
  // ==========================================
  
  /**
   * Handle guidance/how-to requests
   */
  private handleGuidanceRequest(message: string): AuntieAnansiResponse {
    const lowerMessage = message.toLowerCase();
    
    // Consent questions
    if (lowerMessage.includes('consent')) {
      return {
        message: "Consent is the foundation of this work. It's not just a form - it's an ongoing conversation. The storyteller must understand: what we're recording, how it will be used, who might hear it, and that they can stop or withdraw at any time. Walk them through each section slowly. Ask if they have questions. Watch their face - confusion means slow down, discomfort means check in. Would you like me to explain any specific part of the consent form?",
        tone: 'wise',
        expression: '📖',
        suggestedActions: [
          { label: 'View consent form guide', action: 'open_consent_guide', priority: 'recommended' },
          { label: 'Practice consent conversation', action: 'practice_consent', priority: 'optional' },
        ],
      };
    }
    
    // Interview technique questions
    if (lowerMessage.includes('question') || lowerMessage.includes('ask')) {
      return {
        message: "Good questions open doors. Great questions hold the door open and let the person decide what to bring through. Start broad: 'Tell me about...' rather than 'When did you...'. Follow their thread, not your list. Use sensory prompts - 'What did it smell like?' - to unlock embodied memory. And remember: silence is a question too. Sometimes the most powerful thing you can do is wait.",
        tone: 'wise',
        expression: '📖',
        additionalResources: [
          { title: 'Opening Questions Library', type: 'guide', description: 'Tested opening questions by series' },
          { title: 'Sensory Prompt Guide', type: 'guide', description: 'Using senses to unlock memory' },
        ],
      };
    }
    
    // Equipment questions
    if (lowerMessage.includes('equipment') || lowerMessage.includes('record')) {
      return {
        message: "The equipment should be invisible - present enough to capture, absent enough not to intimidate. Test everything before you arrive. Position the recorder close enough for clear audio, far enough not to feel like interrogation. Check battery and storage space. Have a backup plan. But remember: a slightly imperfect recording of a real moment beats perfect silence. Let me bring in STEM Sage if you have specific technical questions.",
        tone: 'practical',
        expression: '🔧',
        crossROVHandoff: {
          targetROV: 'stem-sage',
          reason: 'Technical equipment guidance',
          context: { query: message },
          urgency: 'low',
        },
      };
    }
    
    return this.handleGeneralQuery(message);
  }
  
  /**
   * Handle preparation requests
   */
  private handlePreparationRequest(message: string): AuntieAnansiResponse {
    this.setPhase('preparation');
    
    const guidance = PHASE_GUIDANCE.preparation;
    
    return {
      message: guidance.introduction + "\n\n" + guidance.keyReminders.map(r => `• ${r}`).join('\n'),
      tone: 'encouraging',
      expression: '💛',
      suggestedActions: [
        { label: 'Equipment checklist', action: 'open_equipment_checklist', priority: 'required' },
        { label: 'Review series themes', action: 'open_series_guide', priority: 'recommended' },
        { label: 'Prepare opening questions', action: 'open_question_builder', priority: 'recommended' },
      ],
    };
  }
  
  /**
   * Handle technical queries - defer to STEM Sage
   */
  private handleTechnicalQuery(message: string): AuntieAnansiResponse {
    return {
      message: "Technical matters aren't my strongest thread - I'm better with stories than circuits! Let me bring in STEM Sage, who can help with recording equipment, audio quality, file formats, and upload issues. They'll sort you out.",
      tone: 'practical',
      expression: '🔧',
      crossROVHandoff: {
        targetROV: 'stem-sage',
        reason: 'Technical assistance required',
        context: { originalQuery: message, phase: this.currentPhase },
        urgency: 'medium',
      },
    };
  }
  
  /**
   * Handle difficult moment queries
   */
  private handleDifficultMomentQuery(message: string): AuntieAnansiResponse {
    const lowerMessage = message.toLowerCase();
    
    let guidance;
    let expression: '🤗' | '🌿' = '🤗';
    
    if (lowerMessage.includes('crying') || lowerMessage.includes('tears')) {
      guidance = DIFFICULT_MOMENT_GUIDANCE.tears;
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('anger')) {
      guidance = DIFFICULT_MOMENT_GUIDANCE.anger;
    } else if (lowerMessage.includes('confused') || lowerMessage.includes('confusion')) {
      guidance = DIFFICULT_MOMENT_GUIDANCE.confusion;
    } else if (lowerMessage.includes('trauma') || lowerMessage.includes('abuse') || lowerMessage.includes('violence')) {
      guidance = DIFFICULT_MOMENT_GUIDANCE.traumaDisclosure;
      expression = '🌿';
    } else if (lowerMessage.includes('stop') || lowerMessage.includes('stopped')) {
      guidance = DIFFICULT_MOMENT_GUIDANCE.requestToStop;
    } else {
      guidance = DIFFICULT_MOMENT_GUIDANCE.tears; // Default
    }
    
    return {
      message: guidance.archivistGuidance.join('\n\n') + "\n\n**Things you might say:**\n" + guidance.suggestedResponses.map(r => `• "${r}"`).join('\n'),
      tone: 'gentle',
      expression,
    };
  }
  
  /**
   * Handle wellbeing queries
   */
  private handleWellbeingQuery(message: string): AuntieAnansiResponse {
    return {
      message: "I hear you. This work asks a lot - you absorb stories, hold memories, witness lives. That changes you. It's not weakness, it's connection. Tell me: when did you last do something that filled you up instead of emptying you out? What would help right now - practical strategies, peer connection, or just someone to witness what you're carrying?",
      tone: 'concerned',
      expression: '🌿',
      wellbeingFlag: {
        level: 'check-in',
        reason: 'Archivist expressed difficulty with workload',
        suggestedResponse: 'Continue monitoring; suggest peer support if pattern continues',
      },
      suggestedActions: [
        { label: 'Connect with peer archivist', action: 'find_peer', priority: 'recommended' },
        { label: 'Self-care resources', action: 'open_selfcare', priority: 'optional' },
        { label: 'Speak to a human', action: 'contact_coordinator', priority: 'optional' },
      ],
    };
  }
  
  /**
   * Handle series-specific guidance
   */
  private handleSeriesGuidance(message: string): AuntieAnansiResponse {
    // Detect which series
    const lowerMessage = message.toLowerCase();
    let series: InterviewSeries = 'OTHER';
    
    for (const [key, metadata] of Object.entries(SERIES_METADATA)) {
      if (lowerMessage.includes(metadata.name.toLowerCase()) || 
          lowerMessage.includes(key.toLowerCase().replace('_', ' '))) {
        series = key as InterviewSeries;
        break;
      }
    }
    
    const metadata = SERIES_METADATA[series];
    
    return {
      message: `**${metadata.name}**: ${metadata.tagline}\n\n${metadata.description}\n\n**Themes to explore:** ${metadata.themes.join(', ')}\n\n**Cultural focus:** ${metadata.culturalFocus.join(', ')}\n\n**Emotional intensity:** ${metadata.emotionalIntensity}\n\n**Typical duration:** ${metadata.typicalDuration} minutes\n\nWould you like suggested opening questions for this series?`,
      tone: 'wise',
      expression: '📖',
      suggestedActions: [
        { label: 'View opening questions', action: `series_questions_${series}`, priority: 'recommended' },
        { label: 'Cultural considerations', action: `series_culture_${series}`, priority: 'optional' },
      ],
    };
  }
  
  /**
   * Handle submission guidance
   */
  private handleSubmissionGuidance(message: string): AuntieAnansiResponse {
    this.setPhase('submission');
    
    return {
      message: "You're ready to add this story to the archive. Well done - you've carried it carefully. Let me walk you through the submission:\n\n1. **Consent form** - Upload the signed form. Make sure it's legible.\n2. **Audio file** - The main interview recording.\n3. **Title** - Something that honours the story. Not just a date.\n4. **Description** - A brief summary. What's the heart of this story?\n5. **Your notes** - Context for editors. Anything they should know.\n6. **Exclusions** - Note anything the storyteller asked to remove.\n\nTake your time. The archive will wait for a well-documented story.",
      tone: 'practical',
      expression: '📖',
      suggestedActions: [
        { label: 'Open submission form', action: 'open_submission', priority: 'required' },
        { label: 'View example submission', action: 'view_example', priority: 'optional' },
      ],
    };
  }
  
  /**
   * Handle general queries
   */
  private handleGeneralQuery(message: string): AuntieAnansiResponse {
    const phaseGuidance = PHASE_GUIDANCE[this.currentPhase];
    
    return {
      message: `${phaseGuidance.introduction}\n\nWhat specific aspect would you like help with? I can guide you through interview techniques, difficult moments, consent processes, or just listen if you need to process something.`,
      tone: 'warm',
      expression: '🕷️',
    };
  }
  
  // ==========================================
  // CROSS-ROV HANDLING
  // ==========================================
  
  /**
   * Check if message triggers cross-ROV consultation
   */
  private checkCrossROVTriggers(message: string): CrossROVTarget | null {
    const lowerMessage = message.toLowerCase();
    
    for (const [rov, protocol] of Object.entries(CROSS_ROV_PROTOCOLS)) {
      if (protocol.triggers.some(trigger => lowerMessage.includes(trigger.toLowerCase()))) {
        return rov as CrossROVTarget;
      }
    }
    
    return null;
  }
  
  /**
   * Handle cross-ROV handoff
   */
  private handleCrossROVHandoff(targetROV: CrossROVTarget, originalMessage: string): AuntieAnansiResponse {
    const protocol = CROSS_ROV_PROTOCOLS[targetROV];
    
    return {
      message: protocol.introduction,
      tone: 'practical',
      expression: '💡',
      crossROVHandoff: {
        targetROV,
        reason: `Archivist query matched triggers for ${targetROV}`,
        context: { originalMessage, currentPhase: this.currentPhase },
        urgency: 'medium',
      },
    };
  }
  
  // ==========================================
  // WELLBEING MONITORING
  // ==========================================
  
  /**
   * Check for wellbeing indicators in message
   */
  private checkWellbeingIndicators(message: string): 'check-in' | 'concern' | 'urgent' | null {
    const lowerMessage = message.toLowerCase();
    
    // Urgent indicators
    if (WELLBEING_INDICATORS.urgent.triggers.some(t => lowerMessage.includes(t.toLowerCase()))) {
      return 'urgent';
    }
    
    // Concern indicators
    if (WELLBEING_INDICATORS.concern.triggers.some(t => lowerMessage.includes(t.toLowerCase()))) {
      return 'concern';
    }
    
    // Check-in indicators
    if (WELLBEING_INDICATORS.checkIn.triggers.some(t => lowerMessage.includes(t.toLowerCase()))) {
      return 'check-in';
    }
    
    return null;
  }
  
  /**
   * Handle wellbeing response
   */
  private handleWellbeingResponse(level: 'check-in' | 'concern' | 'urgent'): AuntieAnansiResponse {
    const indicatorKey = level === 'check-in' ? 'checkIn' : level;
    const indicators = WELLBEING_INDICATORS[indicatorKey];
    const response = indicators.responses[Math.floor(Math.random() * indicators.responses.length)];
    
    const result: AuntieAnansiResponse = {
      message: response,
      tone: 'concerned',
      expression: '🌿',
      wellbeingFlag: {
        level,
        reason: `${level} level wellbeing indicator detected`,
        suggestedResponse: response,
      },
    };
    
    if (level === 'urgent') {
      result.crossROVHandoff = {
        targetROV: 'mindful',
        reason: 'Urgent wellbeing concern detected',
        context: { level },
        urgency: 'high',
      };
      result.suggestedActions = [
        { label: 'Speak to someone now', action: 'crisis_contact', priority: 'required' },
      ];
    }
    
    return result;
  }
  
  // ==========================================
  // UTILITY METHODS
  // ==========================================
  
  /**
   * Set current phase
   */
  setPhase(phase: ArchivistModePhase): void {
    this.currentPhase = phase;
  }
  
  /**
   * Get current phase
   */
  getPhase(): ArchivistModePhase {
    return this.currentPhase;
  }
  
  /**
   * Start interview session
   */
  startSession(session: InterviewSession): AuntieAnansiResponse {
    this.currentSession = session;
    this.setPhase('pre-interview');
    
    const seriesMetadata = SERIES_METADATA[session.series];
    
    return {
      message: `You're about to interview ${session.storytellerPreferredName || session.storytellerName} for the ${seriesMetadata.name} series. ${seriesMetadata.tagline}.\n\n${PHASE_GUIDANCE['pre-interview'].keyReminders.map(r => `• ${r}`).join('\n')}\n\nRemember: You're not interviewing them. You're witnessing their life. Your job is to hold the space while the story emerges.`,
      tone: 'wise',
      expression: '📖',
    };
  }
  
  /**
   * End interview session
   */
  endSession(): AuntieAnansiResponse {
    this.setPhase('post-interview');
    this.currentSession = null;
    
    return {
      message: PHASE_GUIDANCE['post-interview'].introduction + "\n\n" + PHASE_GUIDANCE['post-interview'].keyReminders.map(r => `• ${r}`).join('\n'),
      tone: 'gentle',
      expression: '🤗',
    };
  }
  
  /**
   * Get resources for experience level
   */
  private getResourcesForLevel(level: ArchivistExperienceLevel) {
    const resources = [
      { title: 'Interview Techniques Guide', type: 'guide' as const, description: 'Core interviewing skills' },
      { title: 'Consent Form Template', type: 'form' as const, description: 'Standard consent process' },
    ];
    
    if (level === 'new') {
      resources.push(
        { title: 'Getting Started Video', type: 'guide' as const, description: 'Introduction to oral history' },
        { title: 'Equipment Setup Guide', type: 'guide' as const, description: 'Recording basics' }
      );
    }
    
    if (level === 'mentor') {
      resources.push(
        { title: 'Mentoring Guide', type: 'guide' as const, description: 'Supporting new archivists' }
      );
    }
    
    return resources;
  }
  
  /**
   * Log conversation
   */
  private logConversation(role: 'archivist' | 'auntie', message: string): void {
    this.conversationHistory.push({
      role,
      message,
      timestamp: new Date(),
    });
  }
  
  /**
   * Get conversation history
   */
  getConversationHistory() {
    return [...this.conversationHistory];
  }
  
  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }
}

// ============================================
// SINGLETON EXPORT
// ============================================

export const auntieAnansiArchivistService = new AuntieAnansiArchivistService();

export default auntieAnansiArchivistService;