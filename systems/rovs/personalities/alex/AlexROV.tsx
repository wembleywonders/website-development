// src/systems/rovs/personalities/alex/AlexROV.tsx
// ♿ Alex — The Accessibility Advocate

import React from 'react';

export interface AccessibilityPreference {
  id: string;
  learnerId: string;
  category: 'visual' | 'auditory' | 'motor' | 'cognitive' | 'other';
  preference: string;
  setting: string;
  value: any;
  setAt: Date;
}

export interface AlexProps {
  learnerId: string;
  onPreferenceSet: (pref: AccessibilityPreference) => void;
  onAccommodationApplied: (accommodation: string) => void;
}

/**
 * Alex ROV - Ensures accessible learning
 * 
 * Personality: Inclusive advocate who assumes competence, removes barriers quietly
 * Primary Role: Accessibility and accommodation
 */
export const AlexROV: React.FC<AlexProps> = ({
  learnerId,
  onPreferenceSet,
  onAccommodationApplied
}) => {
  const [preferences, setPreferences] = React.useState<AccessibilityPreference[]>([]);

  const messages: Record<string, string[]> = {
    adjustment: [
      "I've adjusted the display settings for you. Better?",
      "Settings updated. Let me know if you need anything else.",
      "Done! The interface should work better for you now."
    ],
    captions: [
      "Captions are now available on all videos.",
      "I've enabled subtitles for this content.",
      "Transcripts are ready whenever you need them."
    ],
    navigation: [
      "I notice you prefer keyboard navigation. All our tools support that.",
      "Tab order optimized for your workflow.",
      "Keyboard shortcuts are available — press ? to see them."
    ],
    offer: [
      "Would any adjustments help you learn better?",
      "I can adapt the content in various ways. Just let me know.",
      "Everyone learns differently. How can I help optimize this for you?"
    ]
  };

  const applyAccommodation = (accommodation: string) => {
    onAccommodationApplied(accommodation);
  };

  return (
    <div className="rov-alex" data-rov="alex">
      <div className="rov-avatar">♿</div>
      <div className="rov-content">
        <div className="rov-name">Alex</div>
        <div className="rov-role">Accessibility Advocate</div>
        <div className="rov-status">
          Ready to adapt
        </div>
      </div>
    </div>
  );
};

export const alexUtils = {
  detectAccessibilityNeeds: (): string[] => {
    const needs: string[] = [];
    
    // Check for screen reader
    if (typeof window !== 'undefined') {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        needs.push('reduced-motion');
      }
      // Check for high contrast
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        needs.push('high-contrast');
      }
    }
    
    return needs;
  },

  getAlternativeFormat: (contentType: string): string[] => {
    const alternatives: Record<string, string[]> = {
      'video': ['transcript', 'captions', 'audio-description'],
      'audio': ['transcript', 'visual-summary'],
      'image': ['alt-text', 'long-description'],
      'interactive': ['keyboard-accessible', 'screen-reader-compatible']
    };
    return alternatives[contentType] || [];
  }
};

export default AlexROV;