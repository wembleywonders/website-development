// Creator Factory Metrics API Service
import type { CreatorFactoryMetrics } from '../types/creatorMetrics';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const creatorMetricsApi = {
  async getDashboard(): Promise<CreatorFactoryMetrics> {
    const response = await fetch(`${API_BASE_URL}/metrics/dashboard`);
    if (!response.ok) {
      throw new Error(`Failed to fetch metrics: ${response.statusText}`);
    }
    return response.json();
  },

  async getMissionMetrics(): Promise<CreatorFactoryMetrics['mission']> {
    const response = await fetch(`${API_BASE_URL}/metrics/mission`);
    if (!response.ok) throw new Error('Failed to fetch mission metrics');
    return response.json();
  },

  async getStageMetrics(): Promise<CreatorFactoryMetrics['stages']> {
    const response = await fetch(`${API_BASE_URL}/metrics/stages`);
    if (!response.ok) throw new Error('Failed to fetch stage metrics');
    return response.json();
  },

  async getIncomeMetrics(): Promise<CreatorFactoryMetrics['income']> {
    const response = await fetch(`${API_BASE_URL}/metrics/income`);
    if (!response.ok) throw new Error('Failed to fetch income metrics');
    return response.json();
  }
};

export default creatorMetricsApi;
