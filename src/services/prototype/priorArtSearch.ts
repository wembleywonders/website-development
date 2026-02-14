/**
 * Prior Art Search Service
 * Wembley Wonders CIC
 * 
 * Searches for existing patents, products, and publications
 * to assess novelty of community innovations.
 */

// ============================================================================
// TYPES
// ============================================================================

export type SearchSource = 
  | 'google-patents'
  | 'espacenet'
  | 'uspto'
  | 'google-scholar'
  | 'marketplace'
  | 'manual';

export interface PriorArtResult {
  id: string;
  source: SearchSource;
  title: string;
  description: string;
  url?: string;
  publicationDate?: string;
  inventors?: string[];
  relevanceScore: number;
  threatLevel: 'low' | 'medium' | 'high' | 'blocking';
  matchedTerms: string[];
  notes: string;
}

export interface SearchSession {
  id: string;
  prototypeId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  searchTerms: string[];
  classifications: string[];
  results: PriorArtResult[];
  noveltyScore: number;
  freedomToOperate: boolean;
  recommendations: string[];
  createdAt: string;
  completedAt?: string;
  searchedBy: string;
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

class PriorArtSearchService {
  private sessions: Map<string, SearchSession[]> = new Map();

  /**
   * Start a new prior art search
   */
  async startSearch(
    prototypeId: string,
    searchTerms: string[],
    classifications: string[],
    searchedBy: string
  ): Promise<SearchSession> {
    const session: SearchSession = {
      id: `pas-${Date.now()}`,
      prototypeId,
      status: 'pending',
      searchTerms,
      classifications,
      results: [],
      noveltyScore: 0,
      freedomToOperate: true,
      recommendations: [],
      createdAt: new Date().toISOString(),
      searchedBy
    };

    const prototypeSessions = this.sessions.get(prototypeId) || [];
    prototypeSessions.push(session);
    this.sessions.set(prototypeId, prototypeSessions);

    console.log('[PriorArt] Search started:', session.id);
    
    // Start async search
    this.executeSearch(session);
    
    return session;
  }

  /**
   * Execute the search across multiple sources
   */
  private async executeSearch(session: SearchSession): Promise<void> {
    session.status = 'in-progress';

    try {
      // Simulate searches across different sources
      const sources: SearchSource[] = ['google-patents', 'espacenet', 'google-scholar'];
      
      for (const source of sources) {
        const results = await this.searchSource(source, session.searchTerms);
        session.results.push(...results);
      }

      // Analyze results
      session.noveltyScore = this.calculateNoveltyScore(session.results);
      session.freedomToOperate = this.assessFreedomToOperate(session.results);
      session.recommendations = this.generateRecommendations(session);

      session.status = 'completed';
      session.completedAt = new Date().toISOString();

      console.log('[PriorArt] Search completed:', session.id, 
        `Novelty: ${session.noveltyScore}%`);
    } catch (error) {
      session.status = 'failed';
      console.error('[PriorArt] Search failed:', error);
    }
  }

  /**
   * Search a specific source (simulated)
   */
  private async searchSource(source: SearchSource, terms: string[]): Promise<PriorArtResult[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // In production, this would call actual patent APIs
    // For now, return empty or mock results
    return [];
  }

  /**
   * Get search session
   */
  getSession(sessionId: string): SearchSession | null {
    for (const sessions of this.sessions.values()) {
      const found = sessions.find(s => s.id === sessionId);
      if (found) return found;
    }
    return null;
  }

  /**
   * Get all sessions for a prototype
   */
  getSessions(prototypeId: string): SearchSession[] {
    return this.sessions.get(prototypeId) || [];
  }

  /**
   * Get latest completed session
   */
  getLatestSession(prototypeId: string): SearchSession | null {
    const sessions = this.sessions.get(prototypeId) || [];
    const completed = sessions.filter(s => s.status === 'completed');
    if (completed.length === 0) return null;
    
    return completed.sort((a, b) => 
      new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    )[0];
  }

  /**
   * Add manual prior art result
   */
  addManualResult(
    sessionId: string,
    result: Omit<PriorArtResult, 'id' | 'source'>
  ): boolean {
    const session = this.getSession(sessionId);
    if (!session) return false;

    session.results.push({
      ...result,
      id: `par-${Date.now()}`,
      source: 'manual'
    });

    // Recalculate scores
    session.noveltyScore = this.calculateNoveltyScore(session.results);
    session.freedomToOperate = this.assessFreedomToOperate(session.results);
    session.recommendations = this.generateRecommendations(session);

    return true;
  }

  /**
   * Update result threat level
   */
  updateThreatLevel(
    sessionId: string,
    resultId: string,
    threatLevel: PriorArtResult['threatLevel'],
    notes: string
  ): boolean {
    const session = this.getSession(sessionId);
    if (!session) return false;

    const result = session.results.find(r => r.id === resultId);
    if (!result) return false;

    result.threatLevel = threatLevel;
    result.notes = notes;

    // Recalculate
    session.noveltyScore = this.calculateNoveltyScore(session.results);
    session.freedomToOperate = this.assessFreedomToOperate(session.results);

    return true;
  }

  /**
   * Generate search report
   */
  generateReport(sessionId: string): string {
    const session = this.getSession(sessionId);
    if (!session) return '';

    const report = `
# Prior Art Search Report
## Session: ${session.id}
## Date: ${new Date(session.createdAt).toLocaleDateString()}

### Search Terms
${session.searchTerms.map(t => `- ${t}`).join('\n')}

### Results Summary
- Total Results: ${session.results.length}
- Blocking: ${session.results.filter(r => r.threatLevel === 'blocking').length}
- High Risk: ${session.results.filter(r => r.threatLevel === 'high').length}
- Medium Risk: ${session.results.filter(r => r.threatLevel === 'medium').length}
- Low Risk: ${session.results.filter(r => r.threatLevel === 'low').length}

### Assessment
- **Novelty Score**: ${session.noveltyScore}%
- **Freedom to Operate**: ${session.freedomToOperate ? 'Yes' : 'No - Review blocking patents'}

### Recommendations
${session.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
    `;

    return report.trim();
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private calculateNoveltyScore(results: PriorArtResult[]): number {
    if (results.length === 0) return 100;

    let score = 100;
    
    for (const result of results) {
      switch (result.threatLevel) {
        case 'blocking':
          score -= 40;
          break;
        case 'high':
          score -= 20;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'low':
          score -= 2;
          break;
      }
    }

    return Math.max(0, score);
  }

  private assessFreedomToOperate(results: PriorArtResult[]): boolean {
    return !results.some(r => r.threatLevel === 'blocking');
  }

  private generateRecommendations(session: SearchSession): string[] {
    const recommendations: string[] = [];

    if (session.noveltyScore >= 80) {
      recommendations.push('High novelty - consider patent protection');
    } else if (session.noveltyScore >= 60) {
      recommendations.push('Moderate novelty - focus on differentiating features');
      recommendations.push('Consider design patent for unique visual elements');
    } else if (session.noveltyScore >= 40) {
      recommendations.push('Low novelty - significant prior art exists');
      recommendations.push('Consider trade secret protection instead');
    } else {
      recommendations.push('Very low novelty - patent protection unlikely');
      recommendations.push('Focus on implementation and branding');
    }

    if (!session.freedomToOperate) {
      recommendations.push('URGENT: Review blocking patents before commercialization');
      recommendations.push('Consider design-around strategies');
    }

    return recommendations;
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const priorArtSearchService = new PriorArtSearchService();
export default priorArtSearchService;
