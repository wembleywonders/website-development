/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/types/chat.ts
 * Component: general-component
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 * Service Bay Protected: 2025-08-05T10:21:53.626Z
 * Signature: ae22957ffddca13eab9428384727579aa5fbbd65ed5da76976de9c4f4435419c
 *
 * LEGAL NOTICE:
 * This code contains proprietary intellectual property of G-Tech Community Platform.
 * Unauthorized reverse engineering, corporate extraction, or commercial appropriation
 * constitutes willful copyright infringement under 17 USC 1201.
 *
 * Community use authorized under community license
 * Corporate use explicitly prohibited without written authorization
 *
 * Violation triggers automatic legal action and evidence preservation
 * Contact: legal@g-tech.org for licensing inquiries
 */

// SERVICE BAY IP PROTECTION RUNTIME
(function () {
  const COMPONENT_TYPE = 'general-component';

  function validateServiceBayAccess() {
    if (typeof window === 'undefined') return true;

    const domain = window.location.hostname;

    const authorizedDomains = ['wembleywonders.org', 'g-tech.org', 'localhost', '127.0.0.1'];

    if (authorizedDomains.some(d => domain.includes(d))) {
      return true;
    }

    const corporateThreats = [
      'facebook.com',
      'meta.com',
      'google.com',
      'alphabet.com',
      'amazon.com',
      'aws.com',
      'microsoft.com',
      'azure.com',
      'virgin.com',
      'virgingroup.com',
    ];

    if (corporateThreats.some(threat => domain.includes(threat))) {
      console.error('🚨 SERVICE BAY IP VIOLATION: Corporate access blocked');
      return false;
    }

    return true;
  }

  if (!validateServiceBayAccess()) {
    throw new Error(`SERVICE BAY IP PROTECTION: Unauthorized corporate access to ${COMPONENT_TYPE}`);
  }
})();

// src/types/chat.ts

export enum MessageSource {
  USER = 'user',
  SYSTEM = 'system',
}

export enum MessageFormat {
  TEXT = 'text',
  JSON = 'json',
  HTML = 'html',
  MARKDOWN = 'markdown',
  AUDIO = 'audio',
  IMAGE = 'image',
}

export enum MessagePriority {
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

export enum AccessibilityLevel {
  NONE = 'none',
  LIGHT = 'light',
  MODERATE = 'moderate',
  SIGNIFICANT = 'significant',
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: any;
  timestamp: Date;
  source: MessageSource;
  format: MessageFormat;
  priority: MessagePriority;
  bypassEthics: boolean;
  processed: boolean;
}

export interface HistoricalMessage {
  id: string;
  content: any;
  timestamp: Date;
  source: MessageSource;
}

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  displayName?: string;
  accessTier: number;
  accessibilityPreferences: AccessibilityPreferences;
  platformPreferences?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface AccessibilityPreferences {
  textSize: 'small' | 'medium' | 'large' | 'x-large';
  contrast: 'standard' | 'high' | 'inverted';
  reduceMotion: boolean;
  simplifiedLanguage: AccessibilityLevel;
  screenReader: boolean;
  responseFormat: MessageFormat;
}

export interface ChatSession {
  id: string;
  userId: string;
  platformId: string;
  accessLevel: number;
  userProfile: UserProfile | null;
  accessibilityPreferences: AccessibilityPreferences;
  conversationHistory: HistoricalMessage[];
  createdAt: Date;
  lastActivityAt: Date;
}

export interface ChatbotConfig {
  allowNewSessions: boolean;
  maxActiveSessions: number;
  sessionExpirationMinutes: number;
  maxConversationHistory: number;
  queueProcessingInterval: number;
  maxQueueSize: number;
  defaultResponseFormat: MessageFormat;
}
