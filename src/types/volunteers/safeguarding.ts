// safeguarding.ts
// NEW TERRITORY (15 July 2026 session) — authored from scratch.
//
// IMPORTANT: this file defines DATA SHAPES only. It does not implement any
// vetting logic, DBS integration, or barrier gate. A volunteer having a
// `SafeguardingStatus` of 'cleared' in this type must never be settable by
// the frontend alone — that transition belongs behind a real backend
// verification step once one exists. Treat every field here as "what we'd
// want to record", not "what we've implemented".
//
// This needs review against CJ/Judith's actual safeguarding policy before
// any UI built on it goes live to real volunteers — particularly whether
// enhanced DBS is required for any role touching Easy Street production,
// STEMgeneers sessions with minors, or similar.

export type SafeguardingStatus =
  | 'not_started'
  | 'pending_dbs'
  | 'pending_references'
  | 'cleared'
  | 'requires_review';

export type RoleSafeguardingTier =
  | 'no_minor_contact'      // e.g. admin, remote production support
  | 'supervised_minor_contact' // e.g. workshop assistant, always with a lead present
  | 'unsupervised_minor_contact'; // e.g. sole workshop lead — highest tier, enhanced DBS expected

export interface SafeguardingRecord {
  volunteerId: string;
  status: SafeguardingStatus;
  requiredTier: RoleSafeguardingTier;
  dbsCertificateNumber?: string;
  dbsCheckDate?: string; // ISO date
  referencesReceived: number;
  referencesRequired: number;
  notes?: string;
  lastUpdatedBy?: string; // staff/admin identifier — never the volunteer themselves
}