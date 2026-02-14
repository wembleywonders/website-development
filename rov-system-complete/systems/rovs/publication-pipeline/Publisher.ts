// src/systems/rovs/publication-pipeline/Publisher.ts
// Handles final publication to Joystick and Rayd-yo

import { StoryDraft } from './DraftGenerator';
import { QueueItem } from './EditorialQueue';

export interface PublishedContent {
  id: string;
  storyId: string;
  draftId: string;
  platform: 'joystick' | 'raydyo';
  url: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  featuredImage?: string;
  audioFile?: string;
  views: number;
  shares: number;
  reactions: number;
}

export interface PublicationResult {
  success: boolean;
  contentId?: string;
  url?: string;
  error?: string;
}

export class Publisher {
  private published: Map<string, PublishedContent>;
  private baseUrls: Record<string, string>;

  constructor() {
    this.published = new Map();
    this.baseUrls = {
      joystick: 'https://wembleywonders.org/joystick',
      raydyo: 'https://wembleywonders.org/raydyo'
    };
  }

  /**
   * Publish content to platform
   */
  async publish(
    draft: StoryDraft,
    platform: 'joystick' | 'raydyo',
    author: string,
    featuredImage?: string,
    audioFile?: string
  ): Promise<PublicationResult> {
    try {
      // Generate slug from headline
      const slug = this.generateSlug(draft.headline);
      
      // Create published content record
      const content: PublishedContent = {
        id: `pub-${Date.now()}`,
        storyId: draft.storyId,
        draftId: draft.id,
        platform,
        url: `${this.baseUrls[platform]}/${slug}`,
        title: draft.headline,
        excerpt: draft.leadParagraph.substring(0, 200) + '...',
        author,
        publishedAt: new Date(),
        featuredImage,
        audioFile,
        views: 0,
        shares: 0,
        reactions: 0
      };

      // Store published content
      this.published.set(content.id, content);

      // In real implementation, this would:
      // 1. Upload to CMS/database
      // 2. Generate social media posts
      // 3. Notify subscribers
      // 4. Update search index

      return {
        success: true,
        contentId: content.id,
        url: content.url
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Publication failed'
      };
    }
  }

  /**
   * Generate URL slug from headline
   */
  private generateSlug(headline: string): string {
    return headline
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);
  }

  /**
   * Get published content by platform
   */
  getByPlatform(platform: 'joystick' | 'raydyo'): PublishedContent[] {
    return Array.from(this.published.values())
      .filter(c => c.platform === platform)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  /**
   * Get recent publications
   */
  getRecent(limit: number = 10): PublishedContent[] {
    return Array.from(this.published.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  /**
   * Update engagement metrics
   */
  updateMetrics(
    contentId: string,
    metrics: Partial<{ views: number; shares: number; reactions: number }>
  ): boolean {
    const content = this.published.get(contentId);
    if (content) {
      if (metrics.views !== undefined) content.views = metrics.views;
      if (metrics.shares !== undefined) content.shares = metrics.shares;
      if (metrics.reactions !== undefined) content.reactions = metrics.reactions;
      return true;
    }
    return false;
  }

  /**
   * Get top performing content
   */
  getTopPerforming(metric: 'views' | 'shares' | 'reactions', limit: number = 5): PublishedContent[] {
    return Array.from(this.published.values())
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, limit);
  }

  /**
   * Get content for learner
   */
  getByLearner(learnerId: string): PublishedContent[] {
    // Would need to cross-reference with story data
    return [];
  }

  /**
   * Schedule publication for future date
   */
  schedule(
    draft: StoryDraft,
    platform: 'joystick' | 'raydyo',
    author: string,
    publishAt: Date
  ): string {
    // In real implementation, would add to scheduling queue
    const scheduleId = `schedule-${Date.now()}`;
    console.log(`Scheduled ${draft.headline} for ${publishAt.toISOString()}`);
    return scheduleId;
  }
}

export default Publisher;
