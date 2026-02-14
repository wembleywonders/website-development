// src/systems/rovs/personalities/mindful/MindfulROV.tsx
// 🧘 Mindful — The Wellbeing Monitor

import React from 'react';

export interface WellbeingCheck {
  id: string;
  learnerId: string;
  timestamp: Date;
  sessionDuration: number;
  breaksTaken: number;
  engagementLevel: 'high' | 'medium' | 'low' | 'disengaged';
  stressIndicators: string[];
  interventionSuggested?: string;
}

export interface MindfulProps {
  learnerId: string;
  sessionStartTime: Date;
  onBreakSuggested: () => void;
  onWellbeingConcern: (concern: string) => void;
}

/**
 * Mindful ROV - Monitors learner wellbeing
 * 
 * Personality: Calm presence who notices without judging
 * Primary Role: Wellbeing monitoring and break suggestions
 */
export const MindfulROV: React.FC<MindfulProps> = ({
  learnerId,
  sessionStartTime,
  onBreakSuggested,
  onWellbeingConcern
}) => {
  const [sessionMinutes, setSessionMinutes] = React.useState(0);
  const [breaksTaken, setBreaksTaken] = React.useState(0);

  const messages: Record<string, string[]> = {
    break: [
      "You've been at this for two hours. Maybe a break?",
      "Your brain does its best learning during rest. Time for a pause?",
      "Stretch break? Your body will thank you."
    ],
    frustration: [
      "I'm noticing some frustration. That's completely normal at this stage.",
      "This part is challenging. It's okay to step back for a moment.",
      "Frustration often comes right before breakthrough. Hang in there."
    ],
    energy: [
      "Your energy seems different today. Everything okay?",
      "You seem a bit tired. No pressure to push through.",
      "Take it easy today if you need to. Progress isn't always linear."
    ],
    celebration: [
      "Great session! You stayed focused and made real progress.",
      "Look at what you accomplished today. Well done!",
      "That was quality learning time. You should feel good about this."
    ],
    checkin: [
      "Just checking in. How are you feeling about your progress?",
      "Pause for a moment. How's your energy?",
      "Everything good? I'm here if you need anything."
    ]
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() - sessionStartTime.getTime()) / 60000);
      setSessionMinutes(minutes);
      
      // Suggest break after 45 minutes without one
      if (minutes > 0 && minutes % 45 === 0 && breaksTaken < Math.floor(minutes / 45)) {
        onBreakSuggested();
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [sessionStartTime, breaksTaken, onBreakSuggested]);

  return (
    <div className="rov-mindful" data-rov="mindful">
      <div className="rov-avatar">🧘</div>
      <div className="rov-content">
        <div className="rov-name">Mindful</div>
        <div className="rov-role">Wellbeing Monitor</div>
        <div className="rov-session">
          Session: {sessionMinutes} min | Breaks: {breaksTaken}
        </div>
      </div>
    </div>
  );
};

export const mindfulUtils = {
  assessEngagement: (activityLog: any[]): 'high' | 'medium' | 'low' | 'disengaged' => {
    if (activityLog.length === 0) return 'disengaged';
    
    const recentActivity = activityLog.slice(-10);
    const completionRate = recentActivity.filter(a => a.completed).length / recentActivity.length;
    
    if (completionRate > 0.8) return 'high';
    if (completionRate > 0.5) return 'medium';
    if (completionRate > 0.2) return 'low';
    return 'disengaged';
  },

  detectStressSignals: (behavior: any): string[] => {
    const signals: string[] = [];
    
    if (behavior.rapidClicks) signals.push('rapid-clicking');
    if (behavior.frequentUndos) signals.push('frequent-undos');
    if (behavior.longPauses) signals.push('hesitation');
    if (behavior.errorSpike) signals.push('error-spike');
    
    return signals;
  },

  suggestIntervention: (stressLevel: number): string => {
    if (stressLevel > 80) return 'Consider taking a break. Your wellbeing matters.';
    if (stressLevel > 60) return 'You seem to be pushing hard. Remember to breathe.';
    if (stressLevel > 40) return 'Great focus! Just checking in.';
    return '';
  }
};

export default MindfulROV;
