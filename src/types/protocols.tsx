/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/types/emergency/protocols.tsx
 * Component: general-component
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 * Service Bay Protected: 2025-08-05T10:21:53.659Z
 * Signature: eef5d3e533c83561df66852eddc3c3dc3061c2ecf53a3d77023aa045a6a81d4b
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

import React from 'react';
export type ValidationLevel = 'error' | 'warning' | 'info' | 'success';

export type ValidationType = 'format' | 'range' | 'threshold' | 'dependency' | 'permission' | 'duplication';

export type ValidationStatus = 'passed' | 'failed' | 'pending' | 'skipped';

export interface ValidationRule {
  id: string;
  name: string;
  type: ValidationType;
  level: ValidationLevel;
  description: string;
  enabled: boolean;
  conditions: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  message: string;
  metadata?: Record<string, unknown>;
}

export interface ValidationResult {
  ruleId: string;
  status: ValidationStatus;
  level: ValidationLevel;
  message: string;
  field?: string;
  value?: unknown;
  expected?: unknown;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ValidationCheck {
  id: string;
  alertId: string;
  rules: ValidationRule[];
  results: ValidationResult[];
  startTime: Date;
  endTime?: Date;
  status: ValidationStatus;
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

export interface ValidationError {
  code: string;
  message: string;
  level: ValidationLevel;
  field?: string;
  details?: string[];
  suggestedFix?: string;
}

export interface ValidationStats {
  totalChecks: number;
  byStatus: Record<ValidationStatus, number>;
  byLevel: Record<ValidationLevel, number>;
  byType: Record<ValidationType, number>;
  averageProcessingTime: number;
  commonErrors: {
    code: string;
    count: number;
    lastOccurred: Date;
  }[];
}

export interface ValidationConfig {
  rules: ValidationRule[];
  enabledTypes: ValidationType[];
  minimumLevel: ValidationLevel;
  autoFix: boolean;
  retryAttempts: number;
  timeout: number;
}

export interface ValidationContext {
  alertType: string;
  priority: string;
  source: string;
  environment: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ValidationQuery {
  status?: ValidationStatus[];
  level?: ValidationLevel[];
  type?: ValidationType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  alertId?: string;
  ruleId?: string;
  search?: string;
}
