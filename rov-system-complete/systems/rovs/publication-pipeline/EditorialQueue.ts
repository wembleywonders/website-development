// src/systems/rovs/publication-pipeline/EditorialQueue.ts
// Manages the editorial review queue

import { StoryFlag } from './StoryFlagger';
import { StoryDraft } from './DraftGenerator';

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

export class EditorialQueue {
  private queue: Map<string, QueueItem>;
  private reviewHistory: Array<{ itemId: string; action: string; timestamp: Date }>;

  constructor() {
    this.queue = new Map();
    this.reviewHistory = [];
  }

  /**
   * Add item to editorial queue
   */
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

  /**
   * Assign item to reviewer
   */
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

  /**
   * Approve item for publication
   */
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

  /**
   * Reject item
   */
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

  /**
   * Mark as published
   */
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

  /**
   * Get items by status
   */
  getByStatus(status: QueueItem['status']): QueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.status === status)
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  /**
   * Get pending items for a publication type
   */
  getPendingFor(type: 'joystick' | 'raydyo'): QueueItem[] {
    return Array.from(this.queue.values())
      .filter(item => item.type === type && item.status === 'pending')
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  /**
   * Get queue statistics
   */
  getStats(): EditorialStats {
    const items = Array.from(this.queue.values());
    
    const reviewedItems = items.filter(i => i.reviewedAt);
    let avgReviewTime = 0;
    
    if (reviewedItems.length > 0) {
      const totalTime = reviewedItems.reduce((sum, item) => {
        const submitTime = item.submittedAt.getTime();
        const reviewTime = item.reviewedAt!.getTime();
        return sum + (reviewTime - submitTime);
      }, 0);
      avgReviewTime = Math.round(totalTime / reviewedItems.length / (1000 * 60 * 60));
    }

    return {
      pending: items.filter(i => i.status === 'pending').length,
      inReview: items.filter(i => i.status === 'in-review').length,
      approved: items.filter(i => i.status === 'approved').length,
      published: items.filter(i => i.status === 'published').length,
      rejected: items.filter(i => i.status === 'rejected').length,
      avgReviewTime
    };
  }

  /**
   * Log action for audit trail
   */
  private logAction(itemId: string, action: string): void {
    this.reviewHistory.push({
      itemId,
      action,
      timestamp: new Date()
    });
  }

  /**
   * Get review history for an item
   */
  getHistory(itemId: string): Array<{ action: string; timestamp: Date }> {
    return this.reviewHistory
      .filter(h => h.itemId === itemId)
      .map(({ action, timestamp }) => ({ action, timestamp }));
  }
}

export default EditorialQueue;
