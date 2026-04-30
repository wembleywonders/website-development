// src/systems/rovs/publication-pipeline/EditorialQueue.ts
// Manages the editorial review queue for Joystick and Rayd-yo publications,
// and the Knowledge Commons archive validation queue.
//
// The Knowledge Commons queue maps directly onto the epistemological framework
// outcome tiers defined in src/data/epistemologicalFramework.ts.
// The publication queue (joystick / raydyo) maps onto the editorial standards
// document (Beecher's Brook principle, five slot tiers).

import { StoryFlag } from './StoryFlagger';
import { StoryDraft } from './DraftGenerator';

import {
  getOutcomeTier,
  VALIDATION_OUTCOME_TIERS,
  type ValidationOutcome,
  type RovId
} from '../../../data/epistemologicalFramework';

// ─── PUBLICATION QUEUE TYPES ─────────────────────────────────────────────────

export interface QueueItem {
  id: string;
  storyId: string;
  draftId: string;
  type: 'joystick' | 'raydyo';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-review' | 'approved' | 'rejected' | 'published';
  assignedTo?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  publishedAt?: Date;
  reviewNotes?: string;
  rejectionReason?: string;
}

export interface EditorialStats {
  pending: number;
  inReview: number;
  approved: number;
  published: number;
  rejected: number;
  avgReviewTime: number; // hours
}

// ─── KNOWLEDGE COMMONS ARCHIVE QUEUE TYPES ───────────────────────────────────

/**
 * The archive queue status maps directly onto the epistemological framework
 * outcome tiers.
 *
 * Status flow:
 *   pending             — submitted, awaiting ROV validation
 *   in-validation       — ROV is applying the six-question checklist
 *   verified            — passes all 6 → enters verified knowledge section
 *   notated             — fails 1-2 → enters with notation
 *   contextualised      — fails 3-4 → enters as community testimony/oral tradition
 *   returned-first      — fails 5-6 → returned with notes, first attempt
 *   returned-second     — returned for second time, revision session offered
 *   session-scheduled   — contributor in guided revision with ROV
 *   withdrawn           — contributor withdrew the submission
 *   published           — live in the appropriate archive section
 */
export type ArchiveQueueStatus =
  | 'pending'
  | 'in-validation'
  | 'verified'
  | 'notated'
  | 'contextualised'
  | 'returned-first'
  | 'returned-second'
  | 'session-scheduled'
  | 'withdrawn'
  | 'published';

export interface ChecklistResult {
  questionId: string;         // Q1 – Q6
  passed: boolean;
  note?: string;              // ROV's specific note for this question
}

export interface ArchiveQueueItem {
  id: string;
  contributorId: string;
  contributorName: string;
  submissionTitle: string;
  submissionType:
    | 'heritage-profile'
    | 'oral-history'
    | 'deep-dive-thread'
    | 'plaque-nomination'
    | 'culinary-heritage'
    | 'wellness-knowledge'
    | 'technical-guide'
    | 'business-knowledge'
    | 'written-work'
    | 'broadcast-script';
  rovId: RovId;               // which specialist reviewed this
  status: ArchiveQueueStatus;
  priority: 'high' | 'medium' | 'low';

  // Validation
  checklistResults?: ChecklistResult[];
  failedCount?: number;
  validationOutcome?: ValidationOutcome;
  archiveSection?: 'verified' | 'testimony' | 'pending';
  archiveNotation?: string;   // displayed alongside the entry in the archive

  // Workflow timestamps
  submittedAt: Date;
  validationStartedAt?: Date;
  validationCompletedAt?: Date;
  publishedAt?: Date;
  lastReturnedAt?: Date;
  sessionScheduledAt?: Date;

  // ROV notes (returned to contributor)
  returnNotes?: string;
  returnAttemptNumber?: number;   // 1 or 2 before session is offered
}

export interface ArchiveStats {
  pending: number;
  inValidation: number;
  verified: number;
  notated: number;
  contextualised: number;
  returnedFirst: number;
  returnedSecond: number;
  sessionScheduled: number;
  published: number;
  withdrawn: number;
  avgValidationTime: number; // hours
  passRateAllSix: number;    // 0–1
}

// ─── PUBLICATION QUEUE ───────────────────────────────────────────────────────

export class EditorialQueue {
  private queue: Map<string, QueueItem>;
  private reviewHistory: Array<{ itemId: string; action: string; timestamp: Date }>;

  constructor() {
    this.queue = new Map();
    this.reviewHistory = [];
  }

  submit(
    storyId: string,
    draftId: string,
    type: 'joystick' | 'raydyo',
    priority: QueueItem['priority']
  ): QueueItem {
    const item: QueueItem = {
      id: `queue-${Date.now()}`,
      storyId,
      draftId,
      type,
      priority,
      status: 'pending',
      submittedAt: new Date()
    };
    this.queue.set(item.id, item);
    this.logAction(item.id, 'submitted');
    return item;
  }

  assign(itemId: string, reviewerId: string): boolean {
    const item = this.queue.get(itemId);
    if (item && item.status === 'pending') {
      item.status = 'in-review';
      item.assignedTo = reviewerId;
      this.logAction(itemId, `assigned to ${reviewerId}`);
      return true;
    }
    return false;
  }

  approve(itemId: string, notes?: string): boolean {
    const item = this.queue.get(itemId);
    if (item && item.status === 'in-review') {
      item.status = 'approved';
      item.reviewedAt = new Date();
      item.reviewNotes = notes;
      this.logAction(itemId, 'approved');
      return true;
    }
    return false;
  }

  reject(itemId: string, reason: string): boolean {
    const item = this.queue.get(itemId);
    if (item && item.status === 'in-review') {
      item.status = 'rejected';
      item.reviewedAt = new Date();
      item.rejectionReason = reason;
      this.logAction(itemId, `rejected: ${reason}`);
      return true;
    }
    return false;
  }

  markPublished(itemId: string): boolean {
    const item = this.queue.get(itemId);
    if (item && item.status === 'approved') {
      item.status = 'published';
      item.publishedAt = new Date();
      this.logAction(itemId, 'published');
      return true;
    }
    return false;
  }

  getByStatus(status: QueueItem['status']): QueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.status === status)
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  getPendingFor(type: 'joystick' | 'raydyo'): QueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.type === type && item.status === 'pending')
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  getStats(): EditorialStats {
    const items = Array.from(this.queue.values());
    const reviewedItems = items.filter(i => i.reviewedAt);
    let avgReviewTime = 0;

    if (reviewedItems.length > 0) {
      const totalTime = reviewedItems.reduce((sum, item) => {
        return sum + (item.reviewedAt!.getTime() - item.submittedAt.getTime());
      }, 0);
      avgReviewTime = Math.round(totalTime / reviewedItems.length / (1000 * 60 * 60));
    }

    return {
      pending:       items.filter(i => i.status === 'pending').length,
      inReview:      items.filter(i => i.status === 'in-review').length,
      approved:      items.filter(i => i.status === 'approved').length,
      published:     items.filter(i => i.status === 'published').length,
      rejected:      items.filter(i => i.status === 'rejected').length,
      avgReviewTime
    };
  }

  private logAction(itemId: string, action: string): void {
    this.reviewHistory.push({ itemId, action, timestamp: new Date() });
  }

  getHistory(itemId: string): Array<{ action: string; timestamp: Date }> {
    return this.reviewHistory
      .filter(h => h.itemId === itemId)
      .map(({ action, timestamp }) => ({ action, timestamp }));
  }
}

// ─── KNOWLEDGE COMMONS ARCHIVE QUEUE ─────────────────────────────────────────

export class ArchiveQueue {
  private queue: Map<string, ArchiveQueueItem>;
  private auditTrail: Array<{ itemId: string; action: string; timestamp: Date; detail?: string }>;

  constructor() {
    this.queue = new Map();
    this.auditTrail = [];
  }

  /**
   * Submit a new item to the archive queue.
   * Status begins as 'pending' — the ROV has not yet touched it.
   */
  submit(
    params: Pick<ArchiveQueueItem,
      'contributorId' | 'contributorName' | 'submissionTitle' |
      'submissionType' | 'rovId' | 'priority'>
  ): ArchiveQueueItem {
    const item: ArchiveQueueItem = {
      id: `archive-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...params,
      status: 'pending',
      submittedAt: new Date()
    };
    this.queue.set(item.id, item);
    this.log(item.id, 'submitted', `type: ${item.submissionType}, rov: ${item.rovId}`);
    return item;
  }

  /**
   * Mark an item as being actively validated by its ROV.
   */
  beginValidation(itemId: string): boolean {
    const item = this.queue.get(itemId);
    if (!item || item.status !== 'pending') return false;
    item.status = 'in-validation';
    item.validationStartedAt = new Date();
    this.log(itemId, 'validation-started');
    return true;
  }

  /**
   * Record the checklist results and apply the outcome tier.
   *
   * This is the core integration point with the epistemological framework.
   * The outcome tier is determined by getOutcomeTier(failedCount) from
   * epistemologicalFramework.ts, which maps failed question counts to
   * the four archive statuses.
   *
   * The item's status, archive section, and notation are all set here
   * from the framework data — the queue does not make editorial judgements,
   * it applies the framework's decisions.
   */
  recordValidation(
    itemId: string,
    checklistResults: ChecklistResult[],
    rovReturnNotes?: string
  ): ArchiveQueueItem | null {
    const item = this.queue.get(itemId);
    if (!item || item.status !== 'in-validation') return null;

    const failedCount = checklistResults.filter(r => !r.passed).length;
    const tier = getOutcomeTier(failedCount);

    item.checklistResults = checklistResults;
    item.failedCount = failedCount;
    item.validationOutcome = tier.outcome;
    item.validationCompletedAt = new Date();
    item.returnNotes = rovReturnNotes;

    // Map framework outcome → queue status and archive section
    switch (tier.outcome) {
      case 'verified':
        item.status = 'verified';
        item.archiveSection = 'verified';
        item.archiveNotation = undefined;
        break;

      case 'notated':
        item.status = 'notated';
        item.archiveSection = 'verified';    // enters archive but with notation
        item.archiveNotation = tier.notation ?? undefined;
        break;

      case 'contextualised':
        item.status = 'contextualised';
        item.archiveSection = 'testimony';   // enters testimony section
        item.archiveNotation = tier.notation ?? undefined;
        break;

      case 'returned': {
        // Track attempt number to trigger revision session offer on second return
        const attemptNumber = (item.returnAttemptNumber ?? 0) + 1;
        item.returnAttemptNumber = attemptNumber;
        item.status = attemptNumber >= 2 ? 'returned-second' : 'returned-first';
        item.archiveSection = 'pending';
        item.lastReturnedAt = new Date();
        break;
      }
    }

    this.log(
      itemId,
      `validation-complete:${tier.outcome}`,
      `failed ${failedCount}/6 questions`
    );

    return item;
  }

  /**
   * Mark a returned item as having a revision session scheduled with the ROV.
   * Only valid when status is 'returned-second'.
   */
  scheduleRevisionSession(itemId: string, sessionDate: Date): boolean {
    const item = this.queue.get(itemId);
    if (!item || item.status !== 'returned-second') return false;
    item.status = 'session-scheduled';
    item.sessionScheduledAt = sessionDate;
    this.log(itemId, 'revision-session-scheduled', sessionDate.toISOString());
    return true;
  }

  /**
   * Mark an item as published in the archive.
   * Valid from: verified, notated, contextualised, session-scheduled.
   */
  markPublished(itemId: string): boolean {
    const item = this.queue.get(itemId);
    const publishableStatuses: ArchiveQueueStatus[] = [
      'verified', 'notated', 'contextualised', 'session-scheduled'
    ];
    if (!item || !publishableStatuses.includes(item.status)) return false;
    item.status = 'published';
    item.publishedAt = new Date();
    this.log(itemId, 'published', `section: ${item.archiveSection}`);
    return true;
  }

  /**
   * Withdraw a submission.
   */
  withdraw(itemId: string, reason?: string): boolean {
    const item = this.queue.get(itemId);
    if (!item || item.status === 'published') return false;
    item.status = 'withdrawn';
    this.log(itemId, 'withdrawn', reason);
    return true;
  }

  /**
   * Resubmit a returned item after revision.
   * Resets to pending so the ROV can validate the revised version.
   */
  resubmit(itemId: string): boolean {
    const item = this.queue.get(itemId);
    const resubmittableStatuses: ArchiveQueueStatus[] = [
      'returned-first', 'returned-second', 'session-scheduled'
    ];
    if (!item || !resubmittableStatuses.includes(item.status)) return false;
    item.status = 'pending';
    item.checklistResults = undefined;
    item.failedCount = undefined;
    item.validationOutcome = undefined;
    item.archiveSection = undefined;
    item.archiveNotation = undefined;
    item.submittedAt = new Date();   // update submission timestamp
    this.log(itemId, 'resubmitted', `attempt ${item.returnAttemptNumber}`);
    return true;
  }

  // ── QUERY METHODS ──────────────────────────────────────────────────────────

  getByStatus(status: ArchiveQueueStatus): ArchiveQueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.status === status)
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  getByRov(rovId: RovId): ArchiveQueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.rovId === rovId)
      .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());
  }

  getPendingValidation(): ArchiveQueueItem[] {
    return this.getByStatus('pending');
  }

  getReadyToPublish(): ArchiveQueueItem[] {
    return Array.from(this.queue.values()).filter(item =>
      ['verified', 'notated', 'contextualised'].includes(item.status)
    );
  }

  getItem(itemId: string): ArchiveQueueItem | undefined {
    return this.queue.get(itemId);
  }

  // ── STATISTICS ─────────────────────────────────────────────────────────────

  getStats(): ArchiveStats {
    const items = Array.from(this.queue.values());

    const validatedItems = items.filter(i => i.validationCompletedAt && i.validationStartedAt);
    let avgValidationTime = 0;
    if (validatedItems.length > 0) {
      const total = validatedItems.reduce((sum, item) => {
        return sum + (item.validationCompletedAt!.getTime() - item.validationStartedAt!.getTime());
      }, 0);
      avgValidationTime = Math.round(total / validatedItems.length / (1000 * 60 * 60));
    }

    const verifiedItems = items.filter(i => i.validationOutcome === 'verified');
    const passRateAllSix = validatedItems.length > 0
      ? verifiedItems.length / validatedItems.length
      : 0;

    return {
      pending:          items.filter(i => i.status === 'pending').length,
      inValidation:     items.filter(i => i.status === 'in-validation').length,
      verified:         items.filter(i => i.status === 'verified').length,
      notated:          items.filter(i => i.status === 'notated').length,
      contextualised:   items.filter(i => i.status === 'contextualised').length,
      returnedFirst:    items.filter(i => i.status === 'returned-first').length,
      returnedSecond:   items.filter(i => i.status === 'returned-second').length,
      sessionScheduled: items.filter(i => i.status === 'session-scheduled').length,
      published:        items.filter(i => i.status === 'published').length,
      withdrawn:        items.filter(i => i.status === 'withdrawn').length,
      avgValidationTime,
      passRateAllSix
    };
  }

  /**
   * Returns a summary of validation performance by ROV — useful for
   * identifying whether any ROV's domain is systematically harder to
   * pass (which might indicate the framework needs recalibration for
   * that domain, not that contributors are systematically failing).
   */
  getValidationByRov(): Record<string, {
    total: number;
    verified: number;
    notated: number;
    contextualised: number;
    returned: number;
    passRate: number;
  }> {
    const byRov: Record<string, ReturnType<typeof this.getValidationByRov>[string]> = {};

    for (const item of this.queue.values()) {
      if (!item.validationOutcome) continue;
      if (!byRov[item.rovId]) {
        byRov[item.rovId] = {
          total: 0, verified: 0, notated: 0, contextualised: 0, returned: 0, passRate: 0
        };
      }
      const entry = byRov[item.rovId];
      entry.total++;
      if (item.validationOutcome === 'verified')         entry.verified++;
      else if (item.validationOutcome === 'notated')     entry.notated++;
      else if (item.validationOutcome === 'contextualised') entry.contextualised++;
      else if (item.validationOutcome === 'returned')    entry.returned++;
      entry.passRate = entry.total > 0 ? entry.verified / entry.total : 0;
    }

    return byRov;
  }

  // ── AUDIT TRAIL ────────────────────────────────────────────────────────────

  private log(itemId: string, action: string, detail?: string): void {
    this.auditTrail.push({ itemId, action, timestamp: new Date(), detail });
  }

  getAuditTrail(itemId: string): Array<{ action: string; timestamp: Date; detail?: string }> {
    return this.auditTrail
      .filter(e => e.itemId === itemId)
      .map(({ action, timestamp, detail }) => ({ action, timestamp, detail }));
  }

  getFullAuditTrail(): typeof this.auditTrail {
    return [...this.auditTrail];
  }
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export default EditorialQueue;