/**
 * Prototype Services - Spring Boot Backend Integration
 * Wembley Wonders CIC
 * 
 * These services connect the frontend prototype registry to the
 * Spring Boot backend API. Handles all CRUD operations, search,
 * and business logic through REST endpoints.
 * 
 * Backend base URL: /api/v1 (configured in environment)
 */

// ============================================================================
// services/prototype/index.ts
// ============================================================================

// export { VersionControlService } from './versionControl';
export { contributorAttributionService } from './contributorAttribution';
export { priorArtSearchService } from './priorArtSearch';
export { iterationService } from './iterationService';
// export { AssetManagementService } from './assetManagement';

// ============================================================================
// services/prototype/versionControl.ts
// Version tracking with semantic versioning for prototypes
// ============================================================================

interface VersionInfo {
  current: string;
  history: VersionEntry[];
  nextSuggested: string;
}

interface VersionEntry {
  version: string;
  createdAt: string;
  createdBy: string;
  iterationId: string;
  changeSummary: string;
}

export class VersionControlService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/prototypes') {
    this.baseUrl = baseUrl;
  }

  async getVersionInfo(prototypeId: string): Promise<VersionInfo> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/versions`);
    if (!response.ok) throw new Error('Failed to fetch version info');
    return response.json();
  }

  async createVersion(prototypeId: string, data: {
    title: string;
    changes: string[];
    createdBy: string;
    witnessed?: boolean;
    witnessedBy?: string;
  }): Promise<VersionEntry> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/versions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create version');
    return response.json();
  }

  /**
   * Semantic versioning logic:
   * Major (x.0.0): Breaking changes or complete redesign
   * Minor (0.x.0): New features or significant improvements
   * Patch (0.0.x): Bug fixes, refinements, documentation
   */
  suggestNextVersion(current: string, changeType: 'major' | 'minor' | 'patch'): string {
    const [major, minor, patch] = current.split('.').map(Number);
    switch (changeType) {
      case 'major': return `${major + 1}.0.0`;
      case 'minor': return `${major}.${minor + 1}.0`;
      case 'patch': return `${major}.${minor}.${patch + 1}`;
    }
  }
}

// ============================================================================
// services/prototype/contributorAttribution.ts
// Manages creator roles and contribution percentages
// ============================================================================

interface ContributorData {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  contributionPercentage: number;
  joinedAt: string;
  consentGiven: boolean;
  consentDate?: string;
}

export class ContributorAttributionService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/prototypes') {
    this.baseUrl = baseUrl;
  }

  async getContributors(prototypeId: string): Promise<ContributorData[]> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/contributors`);
    if (!response.ok) throw new Error('Failed to fetch contributors');
    return response.json();
  }

  async addContributor(prototypeId: string, data: Omit<ContributorData, 'id'>): Promise<ContributorData> {
    // Validate percentages won't exceed 100%
    const existing = await this.getContributors(prototypeId);
    const currentTotal = existing.reduce((sum, c) => sum + c.contributionPercentage, 0);
    
    if (currentTotal + data.contributionPercentage > 100) {
      throw new Error(
        `Cannot add ${data.contributionPercentage}% — current total is ${currentTotal}%. ` +
        `Maximum additional: ${100 - currentTotal}%`
      );
    }

    const response = await fetch(`${this.baseUrl}/${prototypeId}/contributors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add contributor');
    return response.json();
  }

  async updateContribution(
    prototypeId: string,
    contributorId: string,
    newPercentage: number
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/contributors/${contributorId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contributionPercentage: newPercentage })
      }
    );
    if (!response.ok) throw new Error('Failed to update contribution');
  }

  async removeContributor(prototypeId: string, contributorId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/contributors/${contributorId}`,
      { method: 'DELETE' }
    );
    if (!response.ok) throw new Error('Failed to remove contributor');
  }

  async recordConsent(
    prototypeId: string,
    contributorId: string,
    consent: boolean
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/contributors/${contributorId}/consent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentGiven: consent, consentDate: new Date().toISOString() })
      }
    );
    if (!response.ok) throw new Error('Failed to record consent');
  }

  /**
   * Calculate revenue distribution based on the 55/25/20 model
   * and individual contribution percentages
   */
  calculateRevenueDistribution(
    totalRevenue: number,
    contributors: ContributorData[]
  ): { contributor: string; amount: number; percentage: number }[] {
    const creatorPool = totalRevenue * 0.55; // 55% to creators
    
    return contributors.map(c => ({
      contributor: c.name,
      amount: Math.round(creatorPool * (c.contributionPercentage / 100) * 100) / 100,
      percentage: c.contributionPercentage
    }));
  }
}

// ============================================================================
// services/prototype/priorArtSearch.ts
// Prior art search integration with patent databases
// ============================================================================

interface PriorArtResult {
  source: string;
  title: string;
  reference: string;
  url?: string;
  date?: string;
  abstract?: string;
  relevanceScore: number;
  type: 'patent' | 'publication' | 'product' | 'other';
}

interface SearchSession {
  id: string;
  query: string;
  databases: string[];
  results: PriorArtResult[];
  searchedAt: string;
  savedToDisclosure: boolean;
}

export class PriorArtSearchService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/prior-art') {
    this.baseUrl = baseUrl;
  }

  /**
   * Search across multiple patent and publication databases.
   * In production, this proxies through our backend to avoid
   * CORS issues and manage API rate limits.
   */
  async search(query: string, databases?: string[]): Promise<SearchSession> {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        databases: databases || ['google-patents', 'espacenet', 'google-scholar']
      })
    });
    if (!response.ok) throw new Error('Prior art search failed');
    return response.json();
  }

  async getSearchHistory(prototypeId: string): Promise<SearchSession[]> {
    const response = await fetch(`${this.baseUrl}/history/${prototypeId}`);
    if (!response.ok) throw new Error('Failed to fetch search history');
    return response.json();
  }

  async saveResultToDisclosure(
    disclosureId: string,
    result: PriorArtResult,
    distinguishingFeatures: string
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/save-to-disclosure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disclosureId, result, distinguishingFeatures })
    });
    if (!response.ok) throw new Error('Failed to save result');
  }

  /**
   * Generate search suggestions based on the invention description.
   * Helps participants formulate effective search queries.
   */
  suggestSearchTerms(description: string): string[] {
    // Extract key technical terms
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
      'it', 'its', 'my', 'our', 'your', 'their'
    ]);

    const words = description.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w));

    // Get unique meaningful terms
    const unique = [...new Set(words)];

    // Generate search combinations
    const suggestions: string[] = [];
    if (unique.length >= 2) {
      suggestions.push(unique.slice(0, 3).join(' '));
      suggestions.push(unique.slice(0, 2).join(' AND '));
    }
    if (unique.length >= 3) {
      suggestions.push(`"${unique.slice(0, 2).join(' ')}" ${unique[2]}`);
    }
    suggestions.push(unique.join(' '));

    return suggestions.slice(0, 5);
  }
}

// ============================================================================
// services/prototype/iterationService.ts
// Manages build iterations with witnessed timestamps
// ============================================================================

interface IterationData {
  id: string;
  prototypeId: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
  createdAt: string;
  createdBy: string;
  workshopSession?: string;
  witnessed: boolean;
  witnessedBy?: string;
  witnessedAt?: string;
  assets: string[];
  notes: string;
}

export class IterationService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/prototypes') {
    this.baseUrl = baseUrl;
  }

  async getIterations(prototypeId: string): Promise<IterationData[]> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/iterations`);
    if (!response.ok) throw new Error('Failed to fetch iterations');
    return response.json();
  }

  async createIteration(prototypeId: string, data: {
    title: string;
    description: string;
    changes: string[];
    createdBy: string;
    workshopSession?: string;
    notes?: string;
  }): Promise<IterationData> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/iterations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create iteration');
    return response.json();
  }

  /**
   * Record a witness signature for an iteration.
   * Witnessed iterations are critical patent evidence.
   */
  async witnessIteration(
    prototypeId: string,
    iterationId: string,
    witnessName: string
  ): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/iterations/${iterationId}/witness`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          witnessedBy: witnessName,
          witnessedAt: new Date().toISOString()
        })
      }
    );
    if (!response.ok) throw new Error('Failed to record witness');
  }

  /**
   * Generate a PDF evidence report of all iterations for patent filing
   */
  async generateEvidenceReport(prototypeId: string): Promise<Blob> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/iterations/evidence-report`,
      { headers: { 'Accept': 'application/pdf' } }
    );
    if (!response.ok) throw new Error('Failed to generate report');
    return response.blob();
  }
}

// ============================================================================
// services/prototype/assetManagement.ts
// File upload and management for prototype documentation
// ============================================================================

interface AssetData {
  id: string;
  prototypeId: string;
  iterationId?: string;
  type: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  description?: string;
}

export class AssetManagementService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1/prototypes') {
    this.baseUrl = baseUrl;
  }

  async getAssets(prototypeId: string): Promise<AssetData[]> {
    const response = await fetch(`${this.baseUrl}/${prototypeId}/assets`);
    if (!response.ok) throw new Error('Failed to fetch assets');
    return response.json();
  }

  async uploadAsset(
    prototypeId: string,
    file: File,
    metadata: {
      type: string;
      description?: string;
      iterationId?: string;
      uploadedBy: string;
    }
  ): Promise<AssetData> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', metadata.type);
    formData.append('uploadedBy', metadata.uploadedBy);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.iterationId) formData.append('iterationId', metadata.iterationId);

    const response = await fetch(`${this.baseUrl}/${prototypeId}/assets`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload asset');
    return response.json();
  }

  async deleteAsset(prototypeId: string, assetId: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}/${prototypeId}/assets/${assetId}`,
      { method: 'DELETE' }
    );
    if (!response.ok) throw new Error('Failed to delete asset');
  }

  /**
   * Classify asset type based on file extension
   */
  classifyAssetType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const typeMap: Record<string, string> = {
      'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image', 'webp': 'image',
      'mp4': 'video', 'mov': 'video', 'avi': 'video', 'webm': 'video',
      'mp3': 'audio', 'wav': 'audio', 'ogg': 'audio',
      'pdf': 'document', 'doc': 'document', 'docx': 'document', 'txt': 'document',
      'stl': 'cad-file', 'obj': 'cad-file', 'step': 'cad-file', 'iges': 'cad-file',
      'kicad': 'schematic', 'sch': 'schematic', 'brd': 'schematic', 'pcb': 'schematic',
      'ino': 'code', 'py': 'code', 'js': 'code', 'ts': 'code', 'cpp': 'code',
      'svg': 'pattern', 'dxf': 'pattern', 'ai': 'pattern',
    };
    return typeMap[ext] || 'other';
  }
}