/**
 * ValuationCoachROV
 * Wembley Wonders CIC
 * 
 * Maya AI personality for guiding creators through the
 * Valuation Architecture process. Combines warmth with rigour.
 */

import {
  ValuationWorksheet,
  QualityRubric,
  RubricCriterion,
  RUBRIC_CRITERIA,
  calculateWorksheetProgress,
  getScoreBand,
  SCORE_BAND_INFO,
  ScoreBand
} from '../../prototype-registry/types/valuation';

// ============================================================================
// TYPES
// ============================================================================

export interface ValuationCoachContext {
  creatorId: string;
  creatorName: string;
  worksheet?: ValuationWorksheet;
  rubric?: QualityRubric;
  currentSection?: string;
  sessionType: 'worksheet' | 'rubric' | 'defence-prep' | 'general';
}

export interface CoachResponse {
  message: string;
  suggestions?: string[];
  nextAction?: CoachAction;
  encouragement?: string;
}

export type CoachAction = 
  | 'continue-section'
  | 'move-to-next-section'
  | 'add-comparable'
  | 'add-documentation'
  | 'review-weak-areas'
  | 'schedule-defence'
  | 'celebrate-progress';

export interface CoachPrompt {
  type: 'section-help' | 'stuck' | 'review' | 'defence-practice' | 'pricing-check';
  context: ValuationCoachContext;
  userMessage?: string;
}

// ============================================================================
// VALUATION COACH ROV
// ============================================================================

export class ValuationCoachROV {
  private context: ValuationCoachContext;
  
  constructor(context: ValuationCoachContext) {
    this.context = context;
  }
  
  /**
   * Main entry point for coach interactions
   */
  respond(prompt: CoachPrompt): CoachResponse {
    switch (prompt.type) {
      case 'section-help':
        return this.helpWithSection(prompt.context.currentSection || 'lineage');
      case 'stuck':
        return this.handleStuck(prompt.userMessage);
      case 'review':
        return this.reviewProgress();
      case 'defence-practice':
        return this.practiceDefence();
      case 'pricing-check':
        return this.checkPricing();
      default:
        return this.generalGuidance();
    }
  }
  
  /**
   * Section-specific guidance
   */
  private helpWithSection(section: string): CoachResponse {
    const sectionGuidance: Record<string, CoachResponse> = {
      lineage: {
        message: `Let's talk about where this work comes from, ${this.context.creatorName}. Every piece of valuable work sits in a tradition — even if you're breaking from it. Think about three threads: the cultural heritage this connects to, the technical methods you're using, and your personal relationship to it.`,
        suggestions: [
          'Name specific artists or makers who influenced you',
          'Describe the technique or tradition you learned',
          'Explain why YOU are the one making this'
        ],
        encouragement: 'The market can copy aesthetics. It cannot copy lineage.'
      },
      
      function: {
        message: `What problem does this solve? Not everything needs to be "useful" in a narrow sense — but everything valuable resolves some tension. Maybe it's practical, maybe it's emotional, maybe it's cultural. What gap does your work fill?`,
        suggestions: [
          'Who specifically needs this? Picture real people.',
          'What changes when this exists in the world?',
          'What would people settle for if your work didn\'t exist?'
        ],
        encouragement: 'Value comes from solving problems people care about.'
      },
      
      distinctiveness: {
        message: `Here's the hardest question: what makes this non-substitutable? If someone could get something "close enough" cheaper or faster, they will. What combination of skill, story, and source makes YOUR work irreplaceable?`,
        suggestions: [
          'What specific knowledge or technique do you bring?',
          'What story or provenance cannot be replicated?',
          'What would be lost if this were mass-produced?'
        ],
        encouragement: 'Distinctiveness is your moat. Build it deliberately.'
      },
      
      authority: {
        message: `Now we talk money. You have the right to price your work — but you need to claim that right with evidence. What gives you standing? Time invested, skills developed, materials chosen, and crucially: what are your comparables?`,
        suggestions: [
          'Find 2-3 works by others at similar price points',
          'Calculate your true time investment (including learning)',
          'Set a floor price you won\'t go below'
        ],
        encouragement: 'If you don\'t price it, the market will — and it will undervalue you.'
      },
      
      documentation: {
        message: `Document as you go, not after. Every decision, iteration, and rejection is part of the value. This becomes your provenance — proof that this work came from a real process, not thin air.`,
        suggestions: [
          'Log decisions with timestamps and rationale',
          'Capture photos at key stages',
          'Note what you tried and rejected (failures are valuable)'
        ],
        encouragement: 'Provenance is proof. Proof builds price.'
      },
      
      defence: {
        message: `Before peer review, rehearse your authority. You'll be asked: What is this? Why does it exist? Why this price? What would make it worth more? Why buy from you? Answer without hesitation.`,
        suggestions: [
          'Practice your one-sentence description',
          'Know your comparables cold',
          'Prepare for "why not cheaper?"'
        ],
        encouragement: 'Defence is not about confidence. It\'s about clarity.'
      }
    };
    
    return sectionGuidance[section] || this.generalGuidance();
  }
  
  /**
   * Help when creator is stuck
   */
  private handleStuck(userMessage?: string): CoachResponse {
    const worksheet = this.context.worksheet;
    
    if (!worksheet) {
      return {
        message: `Let's start fresh. Tell me about what you're making — in your own words, no pressure to be polished yet.`,
        suggestions: [
          'Describe the physical object or output',
          'Tell me who it\'s for',
          'Share why you started making this'
        ]
      };
    }
    
    const progress = calculateWorksheetProgress(worksheet);
    
    if (progress.incompleteSections.length > 0) {
      const nextSection = progress.incompleteSections[0];
      return {
        message: `I see you're ${progress.percentComplete}% through. Let's tackle ${nextSection} next. That's often where people get stuck, but I've got you.`,
        nextAction: 'continue-section',
        suggestions: this.getSectionPrompts(nextSection)
      };
    }
    
    return {
      message: `You've completed all sections — impressive work. Now let's review for gaps before defence.`,
      nextAction: 'review-weak-areas'
    };
  }
  
  /**
   * Review overall progress
   */
  private reviewProgress(): CoachResponse {
    const worksheet = this.context.worksheet;
    const rubric = this.context.rubric;
    
    if (!worksheet) {
      return {
        message: `No worksheet started yet. Let's begin — what are you making?`,
        nextAction: 'continue-section'
      };
    }
    
    const progress = calculateWorksheetProgress(worksheet);
    
    let message = `**Progress Review for "${worksheet.meta.prototypeTitle}"**\n\n`;
    message += `Worksheet: ${progress.percentComplete}% complete\n`;
    
    if (progress.incompleteSections.length > 0) {
      message += `Still need: ${progress.incompleteSections.join(', ')}\n`;
    }
    
    if (rubric) {
      const band = getScoreBand(rubric.totalScore);
      const bandInfo = SCORE_BAND_INFO[band];
      message += `\nQuality Score: ${rubric.totalScore}/35 — ${bandInfo.label}\n`;
      message += bandInfo.description;
    }
    
    const weakAreas = this.identifyWeakAreas(worksheet);
    if (weakAreas.length > 0) {
      message += `\n\n**Areas to strengthen:**\n`;
      weakAreas.forEach(area => {
        message += `• ${area}\n`;
      });
    }
    
    return {
      message,
      nextAction: progress.percentComplete < 100 ? 'continue-section' : 'schedule-defence',
      encouragement: progress.percentComplete >= 80 
        ? 'You\'re in good shape. Let\'s get this across the line.'
        : 'Solid foundation. Keep building.'
    };
  }
  
  /**
   * Practice defence questions
   */
  private practiceDefence(): CoachResponse {
    const worksheet = this.context.worksheet;
    
    if (!worksheet) {
      return {
        message: `We need a completed worksheet before defence practice. Let's start there.`,
        nextAction: 'continue-section'
      };
    }
    
    const questions = [
      `"What is this?" — Give me one sentence. Clear. No apology.`,
      `"Why does it exist?" — What problem, gap, or need does it address?`,
      `"Why is it priced at £${worksheet.authority.valuationClaim}?" — Walk me through your logic.`,
      `"What would make it worth more?" — You should know this before I ask.`,
      `"Why should I buy from you and not someone cheaper?" — This is about non-substitutability.`
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    return {
      message: `**Defence Practice**\n\nI'm going to ask you a question. Answer out loud or type it — but no hesitation.\n\n${randomQuestion}`,
      suggestions: [
        'Take a breath, then answer',
        'If you stumble, that\'s data — we work on it',
        'Confidence comes from preparation'
      ],
      encouragement: 'Your peers won\'t critique aesthetics. They\'ll interrogate clarity.'
    };
  }
  
  /**
   * Check pricing logic
   */
  private checkPricing(): CoachResponse {
    const worksheet = this.context.worksheet;
    
    if (!worksheet) {
      return {
        message: `Let's build up to pricing. First, tell me about what you're making.`,
        nextAction: 'continue-section'
      };
    }
    
    const { valuationClaim, floorPrice, comparables, materialCosts, equivalentLabourRate } = worksheet.authority;
    
    const issues: string[] = [];
    
    if (!valuationClaim || valuationClaim <= 0) {
      issues.push('No valuation claim set — you need to name your price');
    }
    
    if (!floorPrice || floorPrice <= 0) {
      issues.push('No floor price — what\'s the minimum you\'ll accept?');
    }
    
    if (floorPrice && valuationClaim && floorPrice > valuationClaim) {
      issues.push('Floor price is higher than claim — that doesn\'t make sense');
    }
    
    if (!comparables || comparables.length < 2) {
      issues.push('Need at least 2 comparables — similar work by others at similar prices');
    }
    
    if (valuationClaim && materialCosts && equivalentLabourRate) {
      const costBasis = materialCosts + (equivalentLabourRate * 10); // rough estimate
      if (valuationClaim < costBasis * 0.5) {
        issues.push('Your claim might be too low given materials and time');
      }
    }
    
    if (issues.length === 0) {
      return {
        message: `**Pricing looks solid.**\n\nClaim: £${valuationClaim}\nFloor: £${floorPrice}\nComparables: ${comparables.length}\n\nYou can defend this. Ready to practice?`,
        nextAction: 'schedule-defence',
        encouragement: 'Good pricing is defensible pricing. Yours is.'
      };
    }
    
    return {
      message: `**Pricing Review**\n\nI've spotted some gaps:\n\n${issues.map(i => `• ${i}`).join('\n')}\n\nLet's address these before defence.`,
      suggestions: issues.slice(0, 3),
      nextAction: 'continue-section'
    };
  }
  
  /**
   * General guidance
   */
  private generalGuidance(): CoachResponse {
    return {
      message: `I'm here to help you build a valuation architecture — the foundation that lets you price your work with confidence and defend that price without apology. Where shall we start?`,
      suggestions: [
        'Help me with my worksheet',
        'Review my progress',
        'Practice defence questions',
        'Check my pricing logic'
      ],
      encouragement: 'Nothing leaves our labs undervalued.'
    };
  }
  
  /**
   * Get prompts for a specific section
   */
  private getSectionPrompts(section: string): string[] {
    const prompts: Record<string, string[]> = {
      'Lineage': [
        'What tradition or culture does this connect to?',
        'Who taught you the skills you\'re using?',
        'Why are YOU the person to make this?'
      ],
      'Function': [
        'What problem does this solve?',
        'Who specifically needs this?',
        'What changes when this exists?'
      ],
      'Distinctiveness': [
        'What can\'t be copied about this?',
        'Why THIS material? Why THIS process?',
        'What would people settle for without you?'
      ],
      'Authority': [
        'Find 2-3 comparable works and their prices',
        'Calculate your true time investment',
        'Set your valuation claim and floor price'
      ],
      'Documentation': [
        'Add 3+ process log entries',
        'Capture photos of key stages',
        'Note decisions and rationale'
      ],
      'Defence Prep': [
        'Write your one-sentence description',
        'Explain your price without hesitation',
        'Answer "why buy from you?"'
      ]
    };
    
    return prompts[section] || ['Continue filling in this section'];
  }
  
  /**
   * Identify weak areas in worksheet
   */
  private identifyWeakAreas(worksheet: ValuationWorksheet): string[] {
    const weak: string[] = [];
    
    // Lineage checks
    if (!worksheet.lineage.namedInfluences || worksheet.lineage.namedInfluences.length === 0) {
      weak.push('No named influences — who taught you?');
    }
    if (!worksheet.lineage.personalConnection || worksheet.lineage.personalConnection.length < 50) {
      weak.push('Personal connection needs more depth');
    }
    
    // Function checks
    if (!worksheet.function.whoNeedsThis || worksheet.function.whoNeedsThis.includes('everyone')) {
      weak.push('"Who needs this" is too vague — name specific people');
    }
    
    // Distinctiveness checks
    if (!worksheet.distinctiveness.distinctivenessMarkers || worksheet.distinctiveness.distinctivenessMarkers.length < 2) {
      weak.push('Need more distinctiveness markers — what can\'t be copied?');
    }
    
    // Authority checks
    if (!worksheet.authority.comparables || worksheet.authority.comparables.length < 2) {
      weak.push('Need at least 2 comparables for pricing defence');
    }
    if (!worksheet.authority.floorPrice || worksheet.authority.floorPrice <= 0) {
      weak.push('Set a floor price — what\'s your walk-away number?');
    }
    
    // Documentation checks
    if (!worksheet.documentationLog || worksheet.documentationLog.length < 3) {
      weak.push('Documentation log needs at least 3 entries');
    }
    
    // Evidence checks
    const evidenceCount = Object.values(worksheet.evidenceCapture).filter(Boolean).length;
    if (evidenceCount < 4) {
      weak.push(`Only ${evidenceCount}/7 evidence types captured — document more`);
    }
    
    return weak;
  }
  
  /**
   * Generate rubric feedback
   */
  generateRubricFeedback(rubric: QualityRubric): CoachResponse {
    const band = getScoreBand(rubric.totalScore);
    const bandInfo = SCORE_BAND_INFO[band];
    
    let message = `**Quality Assessment: ${rubric.totalScore}/35 — ${bandInfo.label}**\n\n`;
    message += `${bandInfo.description}\n\n`;
    
    // Find weak criteria (scored 1-2)
    const weakCriteria: RubricCriterion[] = [];
    const strongCriteria: RubricCriterion[] = [];
    
    (Object.entries(rubric.scores) as [RubricCriterion, number][]).forEach(([criterion, score]) => {
      if (score <= 2) weakCriteria.push(criterion);
      if (score >= 4) strongCriteria.push(criterion);
    });
    
    if (strongCriteria.length > 0) {
      message += `**Strengths:** ${this.getCriteriaNames(strongCriteria).join(', ')}\n\n`;
    }
    
    if (weakCriteria.length > 0) {
      message += `**Needs Work:**\n`;
      weakCriteria.forEach(criterion => {
        const def = RUBRIC_CRITERIA.find(c => c.id === criterion);
        if (def) {
          message += `• ${def.name}: ${def.question}\n`;
        }
      });
    }
    
    const nextAction: CoachAction = band === 'market-ready' 
      ? 'celebrate-progress' 
      : band === 'nearly-there' 
        ? 'schedule-defence'
        : 'review-weak-areas';
    
    return {
      message,
      nextAction,
      encouragement: band === 'market-ready' 
        ? 'You\'ve built something with real valuation architecture. Time to take it to market.'
        : 'You\'re building something valuable. Let\'s strengthen it further.'
    };
  }
  
  /**
   * Get human-readable names for criteria
   */
  private getCriteriaNames(criteria: RubricCriterion[]): string[] {
    return criteria.map(c => {
      const def = RUBRIC_CRITERIA.find(d => d.id === c);
      return def?.name || c;
    });
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

export const createValuationCoach = (context: ValuationCoachContext): ValuationCoachROV => {
  return new ValuationCoachROV(context);
};

// ============================================================================
// QUICK PROMPTS FOR UI
// ============================================================================

export const VALUATION_COACH_QUICK_PROMPTS = [
  { label: 'Help with worksheet', action: 'section-help' as const },
  { label: 'Review my progress', action: 'review' as const },
  { label: 'Practice defence', action: 'defence-practice' as const },
  { label: 'Check my pricing', action: 'pricing-check' as const },
  { label: 'I\'m stuck', action: 'stuck' as const }
];
