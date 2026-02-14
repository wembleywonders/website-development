// src/systems/rovs/personalities/guardian/GuardianROV.tsx
// 🛡️ Guardian — The Safety Protector

import React from 'react';

export interface SafeguardingCheck {
  id: string;
  type: 'age-verification' | 'consent' | 'interaction' | 'content' | 'location';
  learnerId: string;
  status: 'pending' | 'approved' | 'flagged' | 'blocked';
  details: string;
  checkedAt: Date;
  resolvedBy?: string;
}

export interface GuardianProps {
  learnerId: string;
  learnerAge?: number;
  onConsentRequired: (type: string) => void;
  onSafeguardingAlert: (alert: SafeguardingCheck) => void;
}

/**
 * Guardian ROV - Ensures safe learning environment
 * 
 * Personality: Protective but not intrusive, clear boundaries
 * Primary Role: Safeguarding and consent management
 */
export const GuardianROV: React.FC<GuardianProps> = ({
  learnerId,
  learnerAge,
  onConsentRequired,
  onSafeguardingAlert
}) => {
  const [pendingConsents, setPendingConsents] = React.useState<string[]>([]);

  const messages: Record<string, string[]> = {
    ageCheck: [
      "Just checking — you're over 18 for this workshop?",
      "This activity has an age requirement. Can you confirm your age?",
      "Quick verification needed before we continue."
    ],
    consent: [
      "Before we record, I need consent from everyone participating.",
      "Can I get your permission to save this for your portfolio?",
      "Just need a quick yes before we capture this."
    ],
    safety: [
      "This is a safe space. Let me know if anything makes you uncomfortable.",
      "Your safety comes first. Don't hesitate to speak up.",
      "If anything doesn't feel right, I'm here to help."
    ],
    boundaries: [
      "That's outside what we can help with here. Let me connect you with the right support.",
      "I want to help, but this needs someone with specific expertise.",
      "Let's pause here and get you the right kind of support."
    ],
    protection: [
      "I've noticed something that needs a quick check. Nothing to worry about.",
      "Just doing my job keeping everyone safe.",
      "Routine safety check — everything looks good."
    ]
  };

  const requestConsent = (type: string) => {
    if (!pendingConsents.includes(type)) {
      setPendingConsents(prev => [...prev, type]);
      onConsentRequired(type);
    }
  };

  const checkAge = (requiredAge: number): boolean => {
    if (!learnerAge) return false;
    return learnerAge >= requiredAge;
  };

  return (
    <div className="rov-guardian" data-rov="guardian">
      <div className="rov-avatar">🛡️</div>
      <div className="rov-content">
        <div className="rov-name">Guardian</div>
        <div className="rov-role">Safety Protector</div>
        <div className="rov-status">
          {pendingConsents.length > 0 
            ? `${pendingConsents.length} consent(s) pending`
            : '✓ All clear'
          }
        </div>
      </div>
    </div>
  );
};

export const guardianUtils = {
  requiresParentalConsent: (age: number, activity: string): boolean => {
    const adultOnlyActivities = ['power-tools', 'soldering', 'off-site'];
    if (adultOnlyActivities.includes(activity)) {
      return age < 18;
    }
    return age < 16;
  },

  getConsentType: (activity: string): string => {
    const consentTypes: Record<string, string> = {
      'recording': 'media-consent',
      'interview': 'interview-consent',
      'photography': 'photo-consent',
      'workshop': 'activity-consent',
      'mentoring': 'mentoring-consent',
      'off-site': 'trip-consent'
    };
    return consentTypes[activity] || 'general-consent';
  },

  assessInteractionRisk: (interaction: any): 'low' | 'medium' | 'high' => {
    // Simplified risk assessment
    if (interaction.isFirstMeeting) return 'medium';
    if (interaction.ageGap > 10 && interaction.isPrivate) return 'medium';
    if (interaction.isUnsupervised && interaction.involvesMinor) return 'high';
    return 'low';
  },

  flagForReview: (check: SafeguardingCheck): SafeguardingCheck => {
    return {
      ...check,
      status: 'flagged',
      checkedAt: new Date()
    };
  }
};

export default GuardianROV;