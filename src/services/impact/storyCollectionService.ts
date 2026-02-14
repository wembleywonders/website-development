import { CommunityStory, ImpactMetric } from '../../types/stories';

class StoryCollectionService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  async collectStory(story: Omit<CommunityStory, 'id' | 'dateCollected'>): Promise<CommunityStory> {
    try {
      const response = await fetch(`${this.baseUrl}/api/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...story,
          dateCollected: new Date(),
          verificationStatus: 'unverified'
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Story collection error:', error);
      throw error;
    }
  }

  async getVerifiedStories(businessId?: string): Promise<CommunityStory[]> {
    const queryParam = businessId ? `?businessId=${businessId}` : '';
    try {
      const response = await fetch(`${this.baseUrl}/api/stories/verified${queryParam}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching verified stories:', error);
      return [];
    }
  }

  async recordConservativeMetric(metric: Omit<ImpactMetric, 'id' | 'dateRecorded'>): Promise<ImpactMetric> {
    try {
      const response = await fetch(`${this.baseUrl}/api/metrics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metric,
          dateRecorded: new Date()
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Metric recording error:', error);
      throw error;
    }
  }

  async getBusinessImpactSummary(businessId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/impact/business/${businessId}`);
      return await response.json();
    } catch (error) {
      console.error('Impact summary error:', error);
      return null;
    }
  }
}

export const storyCollectionService = new StoryCollectionService();
