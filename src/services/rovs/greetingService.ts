// src/services/rovs/greetingService.ts
// Service to manage ROV greetings and context-aware interactions

import { 
  ROVProfile, 
  ROVGreetingConfig, 
  ROVContext, 
  CreatorSpace, 
  PipelineStage,
  ROVQuickAction 
} from '../../types/rovs';
import { getPrimaryROV, getROV, ROV_REGISTRY } from './ROVRegistry';

// Storage keys
const STORAGE_KEYS = {
  FIRST_VISIT: 'ww_first_visit',
  LAST_VISIT: 'ww_last_visit',
  INTERACTION_COUNT: 'ww_interaction_count',
  DISMISSED_GREETINGS: 'ww_dismissed_greetings',
  LAST_ROV: 'ww_last_rov',
  USER_PREFERENCES: 'ww_rov_preferences'
};

interface GreetingDecision {
  shouldShow: boolean;
  rov: ROVProfile;
  greeting: string;
  variant: ROVGreetingConfig['variant'];
  delay: number;
  reason: string;
}

interface UserPreferences {
  disableGreetings: boolean;
  preferredVariant: ROVGreetingConfig['variant'];
  seenROVs: string[];
}

/**
 * ROV Greeting Service
 * 
 * Determines when and how to show ROV greetings based on:
 * - User's visit history
 * - Current page context
 * - User preferences
 * - Time of day
 */
class GreetingService {
  private userPreferences: UserPreferences;
  
  constructor() {
    this.userPreferences = this.loadPreferences();
  }
  
  // ============================================
  // CONTEXT DETECTION
  // ============================================
  
  /**
   * Detect creator space from URL pathname
   */
  detectCreatorSpace(pathname: string): CreatorSpace | null {
    const spaceMap: Record<string, CreatorSpace> = {
      '/programmes/stemgeneers': 'stemgeneers',
      '/programmes/techreneurs': 'techreneurs',
      '/programmes/pageturners': 'pageturners',
      '/programmes/gtechcasters': 'gtechcasters',
      '/programmes/silk-stilettos': 'silk-stilettos',
      '/programmes/kaywanas-court': 'kaywanas-court',
      '/programmes/bright-sparks': 'bright-sparks',
      '/programmes/auntie-anansis-kitchen': 'auntie-anansis-kitchen',
    };
    
    for (const [path, space] of Object.entries(spaceMap)) {
      if (pathname.startsWith(path)) return space;
    }
    return null;
  }
  
  /**
   * Detect pipeline stage from URL pathname
   */
  detectPipelineStage(pathname: string): PipelineStage | null {
    if (pathname === '/' || pathname === '/home') return 'exploration';
    if (pathname.includes('/sandbox')) return 'sandbox';
    if (pathname.includes('/journal') || pathname.includes('/creators-journal')) return 'journal';
    if (pathname.includes('/impact-lab') || pathname.includes('/studio')) return 'impact-lab';
    if (pathname.includes('/certification') || pathname.includes('/provenance')) return 'certification';
    if (pathname.includes('/cyberstore') || pathname.includes('/marketplace') || pathname.includes('/shop')) return 'cyberstore';
    return 'exploration';
  }
  
  /**
   * Build full context from current state
   */
  buildContext(pathname: string): ROVContext {
    const creatorSpace = this.detectCreatorSpace(pathname);
    const pipelineStage = this.detectPipelineStage(pathname);
    const isFirstVisit = this.isFirstVisit();
    const lastVisit = this.getLastVisit();
    const interactionCount = this.getInteractionCount();
    
    // Get active ROVs for this context
    const activeROVs: ROVProfile[] = [];
    
    // Add stage guide if applicable
    if (pipelineStage) {
      const stageROVs = Object.values(ROV_REGISTRY).filter(
        r => r.contexts.pipelineStages?.includes(pipelineStage)
      );
      activeROVs.push(...stageROVs);
    }
    
    // Add guild mentor if in a creator space
    if (creatorSpace) {
      const guildROVs = Object.values(ROV_REGISTRY).filter(
        r => r.contexts.creatorSpaces?.includes(creatorSpace)
      );
      activeROVs.push(...guildROVs);
    }
    
    // Always include pathfinder and matchmaker as available
    if (ROV_REGISTRY.pathfinder) activeROVs.push(ROV_REGISTRY.pathfinder);
    if (ROV_REGISTRY.matchmaker) activeROVs.push(ROV_REGISTRY.matchmaker);
    
    // Determine primary ROV
    const primaryROV = getPrimaryROV(pipelineStage, creatorSpace);
    
    return {
      activeROVs: [...new Set(activeROVs)], // Remove duplicates
      primaryROV,
      creatorSpace,
      pipelineStage,
      projectType: null, // Would need project context
      isFirstVisit,
      lastVisit,
      interactionCount
    };
  }
  
  // ============================================
  // GREETING DECISION ENGINE
  // ============================================
  
  /**
   * Decide whether to show a greeting and configure it
   */
  decideGreeting(pathname: string): GreetingDecision {
    const context = this.buildContext(pathname);
    
    // Check if greetings are disabled
    if (this.userPreferences.disableGreetings) {
      return {
        shouldShow: false,
        rov: context.primaryROV!,
        greeting: '',
        variant: 'corner',
        delay: 0,
        reason: 'User disabled greetings'
      };
    }
    
    // Check if this greeting was recently dismissed
    if (this.wasRecentlyDismissed(context.primaryROV?.id || '')) {
      return {
        shouldShow: false,
        rov: context.primaryROV!,
        greeting: '',
        variant: 'corner',
        delay: 0,
        reason: 'Recently dismissed'
      };
    }
    
    const rov = context.primaryROV!;
    
    // FIRST VISIT - Full overlay experience
    if (context.isFirstVisit) {
      return {
        shouldShow: true,
        rov,
        greeting: rov.greetings.firstVisit,
        variant: 'overlay',
        delay: 1500, // Let page load first
        reason: 'First visit'
      };
    }
    
    // RETURNING VISITOR - Welcome back
    if (this.shouldShowReturningGreeting(context)) {
      return {
        shouldShow: true,
        rov,
        greeting: rov.greetings.returning,
        variant: 'banner',
        delay: 800,
        reason: 'Returning visitor'
      };
    }
    
    // CONTEXT CHANGE - New area greeting
    if (this.hasContextChanged(context)) {
      const contextualGreeting = this.getContextualGreeting(rov, context);
      return {
        shouldShow: true,
        rov,
        greeting: contextualGreeting,
        variant: 'corner',
        delay: 500,
        reason: 'Context changed'
      };
    }
    
    // Default - no greeting needed
    return {
      shouldShow: false,
      rov,
      greeting: '',
      variant: 'corner',
      delay: 0,
      reason: 'No trigger'
    };
  }
  
  /**
   * Get a contextual greeting based on current context
   */
  private getContextualGreeting(rov: ROVProfile, context: ROVContext): string {
    const contextKeys = [
      context.creatorSpace,
      context.pipelineStage,
      'default'
    ].filter(Boolean);
    
    for (const key of contextKeys) {
      if (key && rov.greetings.contextual[key]) {
        return rov.greetings.contextual[key];
      }
    }
    
    return rov.greetings.returning;
  }
  
  /**
   * Check if we should show a returning user greeting
   */
  private shouldShowReturningGreeting(context: ROVContext): boolean {
    if (!context.lastVisit) return false;
    
    const hoursSinceLastVisit = 
      (Date.now() - context.lastVisit.getTime()) / (1000 * 60 * 60);
    
    // Show returning greeting if more than 2 hours since last visit
    return hoursSinceLastVisit > 2;
  }
  
  /**
   * Check if context has changed (different ROV territory)
   */
  private hasContextChanged(context: ROVContext): boolean {
    const lastROVId = localStorage.getItem(STORAGE_KEYS.LAST_ROV);
    return lastROVId !== context.primaryROV?.id;
  }
  
  // ============================================
  // VISIT TRACKING
  // ============================================
  
  /**
   * Check if this is the user's first visit
   */
  isFirstVisit(): boolean {
    return !localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
  }
  
  /**
   * Get the user's last visit timestamp
   */
  getLastVisit(): Date | null {
    const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
    return timestamp ? new Date(parseInt(timestamp)) : null;
  }
  
  /**
   * Get total interaction count
   */
  getInteractionCount(): number {
    const count = localStorage.getItem(STORAGE_KEYS.INTERACTION_COUNT);
    return count ? parseInt(count) : 0;
  }
  
  /**
   * Record a visit
   */
  recordVisit(): void {
    const now = Date.now().toString();
    
    if (this.isFirstVisit()) {
      localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, now);
    }
    
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT, now);
    
    const count = this.getInteractionCount();
    localStorage.setItem(STORAGE_KEYS.INTERACTION_COUNT, (count + 1).toString());
  }
  
  /**
   * Record which ROV was shown
   */
  recordROVShown(rovId: string): void {
    localStorage.setItem(STORAGE_KEYS.LAST_ROV, rovId);
    
    // Track seen ROVs
    const seen = new Set(this.userPreferences.seenROVs);
    seen.add(rovId);
    this.userPreferences.seenROVs = Array.from(seen);
    this.savePreferences();
  }
  
  // ============================================
  // DISMISSAL TRACKING
  // ============================================
  
  /**
   * Record that a greeting was dismissed
   */
  dismissGreeting(rovId: string): void {
    const dismissed = this.getDismissedGreetings();
    dismissed[rovId] = Date.now();
    localStorage.setItem(STORAGE_KEYS.DISMISSED_GREETINGS, JSON.stringify(dismissed));
  }
  
  /**
   * Check if a greeting was recently dismissed (within 1 hour)
   */
  wasRecentlyDismissed(rovId: string): boolean {
    const dismissed = this.getDismissedGreetings();
    const dismissedAt = dismissed[rovId];
    
    if (!dismissedAt) return false;
    
    const hoursSinceDismissal = (Date.now() - dismissedAt) / (1000 * 60 * 60);
    return hoursSinceDismissal < 1;
  }
  
  /**
   * Get all dismissed greetings
   */
  private getDismissedGreetings(): Record<string, number> {
    const data = localStorage.getItem(STORAGE_KEYS.DISMISSED_GREETINGS);
    return data ? JSON.parse(data) : {};
  }
  
  // ============================================
  // USER PREFERENCES
  // ============================================
  
  /**
   * Load user preferences from storage
   */
  private loadPreferences(): UserPreferences {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (data) {
      return JSON.parse(data);
    }
    return {
      disableGreetings: false,
      preferredVariant: 'overlay',
      seenROVs: []
    };
  }
  
  /**
   * Save user preferences
   */
  private savePreferences(): void {
    localStorage.setItem(
      STORAGE_KEYS.USER_PREFERENCES, 
      JSON.stringify(this.userPreferences)
    );
  }
  
  /**
   * Update user preferences
   */
  updatePreferences(updates: Partial<UserPreferences>): void {
    this.userPreferences = { ...this.userPreferences, ...updates };
    this.savePreferences();
  }
  
  /**
   * Disable all greetings
   */
  disableGreetings(): void {
    this.updatePreferences({ disableGreetings: true });
  }
  
  /**
   * Enable greetings
   */
  enableGreetings(): void {
    this.updatePreferences({ disableGreetings: false });
  }
  
  // ============================================
  // ROV HANDOFF
  // ============================================
  
  /**
   * Get handoff message when transitioning between ROVs
   */
  getHandoffMessage(fromROVId: string, toROVId: string): string | null {
    const fromROV = getROV(fromROVId);
    const toROV = getROV(toROVId);
    
    if (!fromROV || !toROV) return null;
    
    // Custom handoff messages
    const handoffs: Record<string, Record<string, string>> = {
      experimenter: {
        archivist: "Great work in the Sandbox! I'm handing you over to the Archivist who'll help you document what you've created.",
        technician: "You've got a solid prototype! The Technician will help you polish it to professional standard."
      },
      archivist: {
        technician: "Your documentation is looking good. The Technician is ready to help refine your work.",
        curator: "Your journey is well-documented. Let's see if the Curator thinks it's ready for certification."
      },
      technician: {
        curator: "Your work is polished and ready. The Curator will assess if it meets Wembley Provenance standards.",
        merchant: "Quality approved! The Merchant can help you get this into the Cyberstore."
      },
      curator: {
        merchant: "Congratulations on earning your badge! The Merchant will help you list this in the Cyberstore."
      }
    };
    
    return handoffs[fromROVId]?.[toROVId] || 
      `I'm introducing you to ${toROV.name}. They'll guide you through the next stage.`;
  }
}

// Export singleton instance
export const greetingService = new GreetingService();
export default greetingService;
