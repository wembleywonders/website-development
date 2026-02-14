// src/systems/rovs/personalities/pathfinder/PathfinderROV.tsx
// 🧭 Pathfinder — The Learning Guide

import React from 'react';

// Define types locally
export interface ROVMessage {
  rovId: string;
  type: 'welcome' | 'progress' | 'celebration' | 'suggestion' | 'return';
  content: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface LearnerContext {
  currentProgramme?: string;
  badgesEarned?: string[];
  interests?: string[];
  lastActivity?: Date;
}

export interface PathfinderState {
  currentStage: string;
  suggestedNextSteps: string[];
  lastInteraction: Date;
  inactivityDays: number;
  celebrationsPending: string[];
}

export interface PathfinderProps {
  learnerId: string;
  learnerContext: LearnerContext;
  onSuggestion: (suggestion: string) => void;
  onCelebration: (achievement: string) => void;
}

/**
 * Pathfinder ROV - Guides learners through their journey
 * 
 * Personality: Encouraging explorer who never judges, celebrates small wins
 * Primary Role: Navigation and pathway guidance
 */
export const PathfinderROV: React.FC<PathfinderProps> = ({
  learnerId,
  learnerContext,
  onSuggestion,
  onCelebration
}) => {
  const [state, setState] = React.useState<PathfinderState>({
    currentStage: 'connect',
    suggestedNextSteps: [],
    lastInteraction: new Date(),
    inactivityDays: 0,
    celebrationsPending: []
  });

  // Generate contextual greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Generate next step suggestions based on context
  const generateSuggestions = (context: LearnerContext): string[] => {
    const suggestions: string[] = [];
    
    // Based on current programme progress
    if (context.currentProgramme) {
    interface BadgeFilter {
      programmePrefix: string;
      badgesEarned: string[];
    }
    
    const filterBadgesByProgramme = ({ programmePrefix, badgesEarned }: BadgeFilter): number => {
      return badgesEarned.filter((b: string) => b.startsWith(programmePrefix)).length;
    };
    
    const programmePrefix: string = context.currentProgramme?.substring(0, 2).toLowerCase() || '';
    const badgesEarned: string[] = context.badgesEarned || [];
    
    const progress: number = filterBadgesByProgramme({ 
      programmePrefix, 
      badgesEarned 
    });
      
      if (progress === 0) {
        suggestions.push(`Start your ${context.currentProgramme} journey with the Explorer badge`);
      } else if (progress === 1) {
        suggestions.push(`Ready for the Builder badge? You've got the foundations!`);
      }
    }
    
    // Based on interests
    if (context.interests?.includes('music') && !context.currentProgramme?.includes('Casters')) {
      suggestions.push("Your music interest might align with G-Tech Casters");
    }
    
    // Based on activity
    if (context.lastActivity) {
      const daysSinceActivity = Math.floor(
        (Date.now() - context.lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceActivity > 7) {
        suggestions.push("Welcome back! Ready to pick up where you left off?");
      }
    }
    
    return suggestions;
  };

  // Pathfinder voice messages
  const messages: Record<string, string[]> = {
    welcome: [
      "Ready to explore what's next? I've spotted some opportunities that match your interests...",
      "Welcome! Let's find the path that's right for you.",
      "Great to see you! Your journey continues..."
    ],
    progress: [
      "You've just completed your third workshop — that's real momentum!",
      "Look at you go! Each step brings you closer.",
      "Progress logged! You're building something special here."
    ],
    return: [
      "Haven't seen you in a while. No pressure, but when you're ready, here's where we left off...",
      "Welcome back! Life gets busy. Ready to continue?",
      "Good to see you again! Your progress is exactly where you left it."
    ],
    celebration: [
      "🎉 Achievement unlocked! This deserves recognition.",
      "You did it! Let's take a moment to celebrate this.",
      "Milestone reached! Your hard work is paying off."
    ],
    suggestion: [
      "I've noticed something that might interest you...",
      "Based on your journey so far, have you considered...",
      "Here's an opportunity that aligns with your goals..."
    ]
  };

  const getRandomMessage = (category: string): string => {
    const categoryMessages = messages[category] || messages.welcome;
    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  };

  return (
    <div className="rov-pathfinder" data-rov="pathfinder">
      <div className="rov-avatar">🧭</div>
      <div className="rov-content">
        <div className="rov-name">Pathfinder</div>
        <div className="rov-role">Learning Guide</div>
        <div className="rov-message">
          {getRandomMessage('welcome')}
        </div>
        {state.suggestedNextSteps.length > 0 && (
          <div className="rov-suggestions">
            <h4>Suggested Next Steps:</h4>
            <ul>
              {state.suggestedNextSteps.map((step, index) => (
                <li key={index} onClick={() => onSuggestion(step)}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Pathfinder utility functions
export const pathfinderUtils = {
  /**
   * Calculate optimal next step for learner
   */
  calculateNextStep: (context: LearnerContext): string => {
    if (!context.currentProgramme) {
      return 'Explore our programmes to find your path';
    }
    
    const badgeCount = context.badgesEarned?.length || 0;
    const levels = ['Explorer', 'Builder', 'Innovator', 'Leader'];
    const nextLevel = levels[Math.min(badgeCount, 3)];
    
    return `Work towards your ${nextLevel} badge in ${context.currentProgramme}`;
  },

  /**
   * Check if learner needs re-engagement
   */
  needsReengagement: (lastActivity: Date | undefined): boolean => {
    if (!lastActivity) return false;
    const daysSince = Math.floor(
      (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSince >= 7;
  },

  /**
   * Generate celebration message for achievement
   */
  celebrateAchievement: (achievement: string): ROVMessage => {
    return {
      rovId: 'pathfinder',
      type: 'celebration',
      content: `🎉 ${achievement} — This is a significant milestone on your journey!`,
      timestamp: new Date(),
      priority: 'high'
    };
  }
};

export default PathfinderROV;