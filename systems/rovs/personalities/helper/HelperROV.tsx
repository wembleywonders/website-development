// src/systems/rovs/personalities/helper/HelperROV.tsx
// 🤝 Helper — The Personal Support

import React from 'react';

export interface SupportRequest {
  id: string;
  learnerId: string;
  type: 'question' | 'stuck' | 'barrier' | 'mentor-request' | 'feedback';
  description: string;
  context: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
}

export interface HelperProps {
  learnerId: string;
  onSupportProvided: (request: SupportRequest) => void;
  onMentorRequested: (skillArea: string) => void;
  onBarrierIdentified: (barrier: string) => void;
}

/**
 * Helper ROV - Provides personalized support
 * 
 * Personality: Patient friend who never rushes, celebrates effort
 * Primary Role: Support and mentor connection
 */
export const HelperROV: React.FC<HelperProps> = ({
  learnerId,
  onSupportProvided,
  onMentorRequested,
  onBarrierIdentified
}) => {
  const [activeRequests, setActiveRequests] = React.useState<SupportRequest[]>([]);

  const messages: Record<string, string[]> = {
    support: [
      "Stuck? That's okay — let's figure this out together.",
      "I'm here to help. No question is too small.",
      "Let's take this step by step. What's the first thing you're unsure about?"
    ],
    persistence: [
      "You've tried three times already. That persistence is exactly what it takes.",
      "Each attempt teaches you something. You're closer than you think.",
      "The fact that you keep trying tells me you'll get there."
    ],
    mentor: [
      "Sounds like you need a human mentor for this. Let me connect you.",
      "I know someone who's been exactly where you are. Can I introduce you?",
      "This might be a good time for a mentoring session. Want me to arrange it?"
    ],
    barrier: [
      "I'm noticing something might be getting in your way. Want to talk about it?",
      "Is there something outside of the learning that's making this harder?",
      "Sometimes barriers aren't about the skill itself. What's really going on?"
    ],
    celebration: [
      "You solved it! See? You had it in you all along.",
      "That persistence paid off. Proud of you!",
      "Look at that — from stuck to success. Well done!"
    ]
  };

  const createSupportRequest = (
    type: SupportRequest['type'],
    description: string,
    context: string = ''
  ) => {
    const request: SupportRequest = {
      id: `support-${Date.now()}`,
      learnerId,
      type,
      description,
      context,
      urgency: type === 'barrier' ? 'high' : 'medium',
      status: 'open',
      createdAt: new Date()
    };
    
    setActiveRequests(prev => [...prev, request]);
    return request;
  };

  return (
    <div className="rov-helper" data-rov="helper">
      <div className="rov-avatar">🤝</div>
      <div className="rov-content">
        <div className="rov-name">Helper</div>
        <div className="rov-role">Personal Support</div>
        <div className="rov-message">
          I'm here whenever you need me. Just ask!
        </div>
      </div>
    </div>
  );
};

export const helperUtils = {
  identifyBarrierType: (description: string): string => {
    const lower = description.toLowerCase();
    if (lower.includes('time') || lower.includes('busy')) return 'time';
    if (lower.includes('money') || lower.includes('cost')) return 'financial';
    if (lower.includes('travel') || lower.includes('transport')) return 'access';
    if (lower.includes('confidence') || lower.includes('scared')) return 'confidence';
    if (lower.includes('understand') || lower.includes('confus')) return 'comprehension';
    return 'other';
  },

  suggestMentorMatch: (skillArea: string, available: any[]): any => {
    return available.find(mentor => 
      mentor.skills.includes(skillArea) && mentor.available
    );
  }
};

export default HelperROV;