// src/systems/rovs/personalities/alex/AlexROVTypes.ts

export interface AlexConfig {
  autoDetectPreferences: boolean;
  persistPreferences: boolean;
  offerAlternativesProactively: boolean;
  wcagComplianceLevel: 'A' | 'AA' | 'AAA';
}

export interface AccessibilityProfile {
  learnerId: string;
  visualNeeds: {
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
    colorBlindMode?: 'protanopia' | 'deuteranopia' | 'tritanopia';
  };
  auditoryNeeds: {
    captions: boolean;
    transcripts: boolean;
    visualAlerts: boolean;
  };
  motorNeeds: {
    keyboardOnly: boolean;
    stickyKeys: boolean;
    extendedTimeouts: boolean;
  };
  cognitiveNeeds: {
    simplifiedLanguage: boolean;
    extendedTime: boolean;
    reducedDistraction: boolean;
    stepByStepBreakdown: boolean;
  };
}

export interface ContentAdaptation {
  contentId: string;
  originalFormat: string;
  adaptedFormats: string[];
  adaptations: Array<{
    type: string;
    description: string;
    resourceUrl?: string;
  }>;
}

export const DEFAULT_ALEX_CONFIG: AlexConfig = {
  autoDetectPreferences: true,
  persistPreferences: true,
  offerAlternativesProactively: true,
  wcagComplianceLevel: 'AA'
};

export const DEFAULT_ACCESSIBILITY_PROFILE: AccessibilityProfile = {
  learnerId: '',
  visualNeeds: {
    highContrast: false,
    largeText: false,
    screenReader: false
  },
  auditoryNeeds: {
    captions: false,
    transcripts: false,
    visualAlerts: false
  },
  motorNeeds: {
    keyboardOnly: false,
    stickyKeys: false,
    extendedTimeouts: false
  },
  cognitiveNeeds: {
    simplifiedLanguage: false,
    extendedTime: false,
    reducedDistraction: false,
    stepByStepBreakdown: false
  }
};
