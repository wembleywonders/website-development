// src/systems/rovs/journal-integration/JournalWriter.ts
// Writes entries to the Creator's Journal

export interface JournalEntry {
  id: string;
  learnerId: string;
  type: 'activity' | 'observation' | 'milestone' | 'reflection' | 'evidence' | 'story';
  title: string;
  content: string;
  stage: 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
  programme?: string;
  badgeId?: string;
  rovSource: string;
  attachments: string[];
  tags: string[];
  isPublishable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class JournalWriter {
  private entries: Map<string, JournalEntry[]>;

  constructor() {
    this.entries = new Map();
  }

  /**
   * Create a new journal entry
   */
  createEntry(
    learnerId: string,
    type: JournalEntry['type'],
    title: string,
    content: string,
    rovSource: string,
    options: Partial<JournalEntry> = {}
  ): JournalEntry {
    const entry: JournalEntry = {
      id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      learnerId,
      type,
      title,
      content,
      stage: options.stage || 'create',
      programme: options.programme,
      badgeId: options.badgeId,
      rovSource,
      attachments: options.attachments || [],
      tags: options.tags || [],
      isPublishable: options.isPublishable || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const learnerEntries = this.entries.get(learnerId) || [];
    learnerEntries.push(entry);
    this.entries.set(learnerId, learnerEntries);

    return entry;
  }

  /**
   * Update an existing entry
   */
  updateEntry(entryId: string, updates: Partial<JournalEntry>): JournalEntry | null {
    for (const [learnerId, entries] of this.entries) {
      const index = entries.findIndex(e => e.id === entryId);
      if (index !== -1) {
        entries[index] = {
          ...entries[index],
          ...updates,
          updatedAt: new Date()
        };
        return entries[index];
      }
    }
    return null;
  }

  /**
   * Get entries for a learner
   */
  getEntries(learnerId: string, filters?: {
    type?: JournalEntry['type'];
    stage?: JournalEntry['stage'];
    programme?: string;
    isPublishable?: boolean;
  }): JournalEntry[] {
    let entries = this.entries.get(learnerId) || [];

    if (filters) {
      if (filters.type) {
        entries = entries.filter(e => e.type === filters.type);
      }
      if (filters.stage) {
        entries = entries.filter(e => e.stage === filters.stage);
      }
      if (filters.programme) {
        entries = entries.filter(e => e.programme === filters.programme);
      }
      if (filters.isPublishable !== undefined) {
        entries = entries.filter(e => e.isPublishable === filters.isPublishable);
      }
    }

    return entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get publishable entries for editorial review
   */
  getPublishableEntries(): JournalEntry[] {
    const all: JournalEntry[] = [];
    for (const entries of this.entries.values()) {
      all.push(...entries.filter(e => e.isPublishable));
    }
    return all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Mark entry as publishable
   */
  flagForPublication(entryId: string): boolean {
    const entry = this.updateEntry(entryId, { isPublishable: true });
    return entry !== null;
  }

  /**
   * Add attachment to entry
   */
  addAttachment(entryId: string, attachmentRef: string): boolean {
    for (const entries of this.entries.values()) {
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        entry.attachments.push(attachmentRef);
        entry.updatedAt = new Date();
        return true;
      }
    }
    return false;
  }

  /**
   * Get entry count by stage
   */
  getEntriesByStage(learnerId: string): Record<string, number> {
    const entries = this.entries.get(learnerId) || [];
    const counts: Record<string, number> = {
      connect: 0,
      create: 0,
      cultivate: 0,
      compete: 0,
      celebrate: 0
    };

    entries.forEach(e => {
      counts[e.stage]++;
    });

    return counts;
  }
}

export default JournalWriter;