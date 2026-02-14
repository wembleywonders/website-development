/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/types/rov/index.ts
 * Component: general-component
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 * Service Bay Protected: 2025-08-05T10:21:53.760Z
 * Signature: cb0a6b89757bd6c04cb70b019f3ea8ccaa86e61d85bd47b3ed42f9cf1088b1c1
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

// src/types/rov/index.ts

/**
 * ROV Configuration
 */
export interface RovConfig {
  endpoint: string;
  clientId: string;
  timeout: number;
  secure: boolean;
}

/**
 * ROV Message
 */
export interface RovMessage {
  action: string;
  payload: any;
  timestamp: number;
  signature?: string;
}

/**
 * ROV Response
 */
export interface RovResponse {
  success: boolean;
  data?: any;
  error?: string;
  messageId?: string;
  timestamp: number;
}

/**
 * Creator journey ROV data
 */
export interface CreatorJourneyData {
  userId: string;
  level: string;
  xp: number;
  journeyStage: string;
  completedSteps: string[];
  rewards: CreatorReward[];
  badges: Badge[];
}

/**
 * Creator rewards
 */
export interface CreatorReward {
  id: string;
  type: 'xp' | 'badge' | 'token' | 'cyberstore_credit';
  amount?: number;
  name?: string;
  description?: string;
  dateEarned: string;
}

/**
 * Badge
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateEarned: string;
}
