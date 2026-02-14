// src/systems/rovs/journal-integration/EntryClassifier.ts
// Classifies journal entries for routing and display

import { JournalEntry } from './JournalWriter';

export interface ClassificationResult {
  entryId: string;
  primaryCategory: string;
  secondaryCategories: string[];
  stage: string;
  publicationPotential: 'high' | 'medium' | 'low' | 'none';
  suggestedTags: string[];
  relevantBadges: string[];
  confidence: number;
}

export class EntryClassifier {
  private categoryKeywords: Record<string, string[]>;

  constructor() {
    this.categoryKeywords = {
      'technical': ['repair', 'fix', 'build', 'code', 'debug', 'solder', 'circuit'],
      'creative': ['design', 'create', 'write', 'record', 'produce', 'style', 'art'],
      'business': ['sell', 'market', 'pitch', 'customer', 'revenue', 'profit', 'price'],
      'heritage': ['family', 'tradition', 'elder', 'recipe', 'story', 'culture', 'history'],
      'mentoring': ['teach', 'mentor', 'guide', 'help', 'show', 'train', 'support'],
      'performance': ['perform', 'stage', 'act', 'present', 'speak', 'audience'],
      'community': ['community', 'volunteer', 'event', 'café', 'workshop', 'session']
    };
  }

  /**
   * Classify a journal entry
   */
  classify(entry: JournalEntry): ClassificationResult {
    const content = `${entry.title} ${entry.content}`.toLowerCase();
    
    // Calculate category scores
    const scores = new Map<string, number>();
    for (const [category, keywords] of Object.entries(this.categoryKeywords)) {
      const score = keywords.reduce((sum, keyword) => {
        const matches = (content.match(new RegExp(keyword, 'gi')) || []).length;
        return sum + matches;
      }, 0);
      if (score > 0) {
        scores.set(category, score);
      }
    }

    // Get sorted categories
    const sortedCategories = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat);

    // Determine publication potential
    let publicationPotential: ClassificationResult['publicationPotential'] = 'none';
    if (entry.type === 'milestone' || entry.type === 'story') {
      publicationPotential = 'high';
    } else if (entry.type === 'observation' && scores.has('heritage')) {
      publicationPotential = 'high';
    } else if (entry.type === 'observation' && scores.has('mentoring')) {
      publicationPotential = 'medium';
    } else if (scores.size > 2) {
      publicationPotential = 'low';
    }

    // Suggest tags
    const suggestedTags = this.suggestTags(entry, sortedCategories);

    // Find relevant badges
    const relevantBadges = this.findRelevantBadges(entry, sortedCategories);

    return {
      entryId: entry.id,
      primaryCategory: sortedCategories[0] || 'general',
      secondaryCategories: sortedCategories.slice(1, 3),
      stage: entry.stage,
      publicationPotential,
      suggestedTags,
      relevantBadges,
      confidence: this.calculateConfidence(scores)
    };
  }

  /**
   * Suggest tags based on content
   */
  private suggestTags(entry: JournalEntry, categories: string[]): string[] {
    const tags: string[] = [...categories.slice(0, 2)];
    
    if (entry.programme) {
      tags.push(entry.programme);
    }
    
    if (entry.type === 'milestone') {
      tags.push('achievement');
    }
    
    if (entry.content.toLowerCase().includes('first')) {
      tags.push('first-time');
    }

    return tags;
  }

  /**
   * Find badges related to entry content
   */
  private findRelevantBadges(entry: JournalEntry, categories: string[]): string[] {
    const badgeMapping: Record<string, string[]> = {
      'technical': ['sc-builder', 'sc-innovator', 'stm-builder'],
      'creative': ['gtc-builder', 'kc-innovator', 'pt-builder'],
      'business': ['te-builder', 'te-innovator', 'ss-innovator'],
      'heritage': ['aak-innovator', 'kc-innovator'],
      'mentoring': ['sc-leader', 'gtc-leader', 'te-leader'],
      'performance': ['kc-builder', 'kc-innovator'],
      'community': ['sc-innovator', 'gtc-innovator']
    };

    const badges: string[] = [];
    categories.forEach(cat => {
      if (badgeMapping[cat]) {
        badges.push(...badgeMapping[cat]);
      }
    });

    return [...new Set(badges)].slice(0, 3);
  }

  /**
   * Calculate classification confidence
   */
  private calculateConfidence(scores: Map<string, number>): number {
    if (scores.size === 0) return 0;
    
    const totalScore = Array.from(scores.values()).reduce((a, b) => a + b, 0);
    const maxScore = Math.max(...scores.values());
    
    // Higher confidence when one category dominates
    return Math.min(100, Math.round((maxScore / totalScore) * 100));
  }

  /**
   * Batch classify entries
   */
  classifyBatch(entries: JournalEntry[]): ClassificationResult[] {
    return entries.map(entry => this.classify(entry));
  }
}

export default EntryClassifier;
