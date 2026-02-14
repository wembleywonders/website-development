/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/types/emergency/alerts.ts
 * Component: general-component
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 * Service Bay Protected: 2025-08-05T10:21:53.657Z
 * Signature: f25e034ebff84dd62e66794d9392d162db08328525827c92d23b5138621c1489
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

export type EmergencyLevel = 'critical' | 'severe' | 'moderate' | 'minor' | 'informational';

export type EmergencyType = 'safety' | 'security' | 'medical' | 'environmental' | 'technical' | 'facility';

export type EmergencyStatus = 'active' | 'pending' | 'resolved' | 'monitoring' | 'archived';

export type NotificationChannel = 'sms' | 'email' | 'push' | 'whatsapp' | 'discord' | 'broadcast';

export interface EmergencyLocation {
  area: string;
  building?: string;
  floor?: string;
  room?: string;
  postcode?: string;
  accessInstructions?: string;
}

export interface EmergencyContact {
  name: string;
  role: string;
  primary: boolean;
  phone?: string;
  mobile?: string;
  email?: string;
  availability?: {
    days: string[];
    hours: string;
  };
}

export interface EmergencyAction {
  id: string;
  description: string;
  assignedTo?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: number;
  startTime?: Date;
  completionTime?: Date;
}

export interface EmergencyProtocol {
  id: string;
  name: string;
  steps: string[];
  contacts: EmergencyContact[];
  resources: string[];
  evacuationRoutes?: string[];
}

export interface EmergencyAlert {
  id: string;
  type: EmergencyType;
  level: EmergencyLevel;
  status: EmergencyStatus;
  title: string;
  description: string;
  location: EmergencyLocation;
  reportedBy: string;
  reportedAt: Date;
  protocol?: EmergencyProtocol;
  actions: EmergencyAction[];
  affectedAreas: string[];
  notifications: {
    channel: NotificationChannel;
    sentAt: Date;
    recipients: number;
    delivered: number;
  }[];
  updates: {
    timestamp: Date;
    message: string;
    author: string;
  }[];
  resolvedAt?: Date;
  notes?: string[];
}

export interface EmergencyStats {
  activeAlerts: number;
  byType: Record<EmergencyType, number>;
  byLevel: Record<EmergencyLevel, number>;
  byStatus: Record<EmergencyStatus, number>;
  averageResponseTime: number;
  notificationDeliveryRate: number;
}

export interface EmergencyNotification {
  alertId: string;
  channel: NotificationChannel;
  message: string;
  recipients: string[];
  priority: boolean;
  scheduledFor?: Date;
  expiration?: Date;
  requiresAcknowledgment: boolean;
}

export interface EmergencyQuery {
  types?: EmergencyType[];
  levels?: EmergencyLevel[];
  status?: EmergencyStatus[];
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}
