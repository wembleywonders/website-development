// src/types/simulators/content.ts
import { SimulatorType, SimulatorStep } from './core';

export interface SimulatorContent {
  id: string;
  simulatorType: SimulatorType;
  authority: string; // e.g., "Brent Council", "NHS Digital"
  serviceUrl: string;
  mockDataSets: Array<{
    name: string;
    description: string;
    data: Record<string, any>;
    locale?: string;
    lastUpdated: Date;
  }>;
  formFields: Array<{
    id: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'date' | 'select' | 'checkbox' | 'file' | 'tel' | 'url';
    required: boolean;
    validation?: string;
    helpText?: string;
    mockValue?: string;
    options?: Array<{ value: string; label: string; }>;
    placeholder?: string;
    maxLength?: number;
  }>;
  workflowSteps: SimulatorStep[];
  resources: Array<{
    title: string;
    type: 'pdf' | 'link' | 'video' | 'guide' | 'checklist' | 'template';
    url: string;
    description: string;
    language?: string;
    estimatedReadTime?: number;
  }>;
  commonScenarios: Array<{
    id: string;
    name: string;
    description: string;
    initialData: Record<string, any>;
    expectedOutcome: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }>;
  errorScenarios: Array<{
    id: string;
    stepId: string;
    errorType: string;
    triggerCondition: string;
    errorMessage: string;
    resolutionSteps: string[];
  }>;
}

export interface ROVGuidance {
  id: string;
  sessionId: string;
  stepId: string;
  rovType: 'helper' | 'pathfinder' | 'insight';
  guidanceType: 'hint' | 'correction' | 'encouragement' | 'explanation' | 'warning';
  message: string;
  timestamp: Date;
  userResponse?: string;
  wasHelpful?: boolean;
  contextData?: Record<string, any>;
  followUpRequired?: boolean;
}

export interface LocalizationContent {
  simulatorId: string;
  language: string;
  translations: Record<string, string>;
  culturalAdaptations: Array<{
    field: string;
    originalValue: string;
    adaptedValue: string;
    reason: string;
  }>;
  localExamples: Array<{
    context: string;
    example: string;
    explanation?: string;
  }>;
}

export interface AccessibilityFeatures {
  simulatorId: string;
  features: {
    screenReaderSupport: boolean;
    keyboardNavigation: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    reducedMotion: boolean;
    largeText: boolean;
  };
  alternativeFormats: Array<{
    type: 'audio' | 'video' | 'simplified-text' | 'visual-guide';
    url: string;
    description: string;
  }>;
  assistiveTechnologyTested: string[];
}