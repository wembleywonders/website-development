import { BusinessSponsor, BusinessContent } from '../../types/business';

class BusinessService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  async createSponsor(sponsorData: Omit<BusinessSponsor, 'id' | 'status' | 'signupDate'>): Promise<BusinessSponsor> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sponsors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sponsorData,
          status: 'pending',
          signupDate: new Date(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create sponsor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating sponsor:', error);
      throw error;
    }
  }

  async processPayment(sponsorId: string, amount: number): Promise<{ success: boolean; paymentId?: string }> {
    // Stripe integration placeholder
    try {
      const response = await fetch(`${this.baseUrl}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sponsorId,
          amount,
          currency: 'GBP',
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false };
    }
  }

  async scheduleContent(content: Omit<BusinessContent, 'id'>): Promise<BusinessContent> {
    try {
      const response = await fetch(`${this.baseUrl}/api/content/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Content scheduling error:', error);
      throw error;
    }
  }

  async getSponsorDashboard(sponsorId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sponsors/${sponsorId}/dashboard`);
      return await response.json();
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      throw error;
    }
  }
}

export const businessService = new BusinessService();
