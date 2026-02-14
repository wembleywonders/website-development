/**
 * Prototype Registry Service
 * Wembley Wonders CIC - Community Innovation IP System
 * 
 * Core service for managing prototypes, tracking iterations,
 * and handling the innovation-to-marketplace pipeline.
 */

import {
  Prototype,
  PrototypeStatus,
  PrototypeCategory,
  ProgrammeSource,
  Creator,
  CreatorRole,
  Iteration,
  InventionDisclosure,
  PrototypeAsset,
  Documentation,
  License,
  PricingModel,
  PrototypeSearchParams,
  PrototypeSearchResult,
  PrototypeEvent,
  EventType,
  OwnershipModel,
  IPStatus,
  RevenueShare
} from '../types';

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const DEFAULT_REVENUE_SHARE: RevenueShare = {
  creator: 55,
  community: 25,
  platform: 20
};

// ============================================================================
// SERVICE CLASS
// ============================================================================

export class PrototypeRegistryService {
  private apiBaseUrl: string;
  
  constructor(apiBaseUrl: string = '/api/prototypes') {
    this.apiBaseUrl = apiBaseUrl;
  }

  // --------------------------------------------------------------------------
  // PROTOTYPE CRUD
  // --------------------------------------------------------------------------

  async createPrototype(data: CreatePrototypeInput): Promise<Prototype> {
    const prototype: Partial<Prototype> = {
      ...data,
      id: this.generateId(),
      slug: this.generateSlug(data.title),
      status: 'concept',
      ipStatus: 'unprotected',
      iterations: [],
      currentVersion: '0.1.0',
      creators: data.creators || [],
      ownershipModel: data.ownershipModel || 'community',
      communityContribution: data.communityContribution ?? 25,
      disclosures: [],
      assets: [],
      documentation: [],
      licenses: [],
      marketplaceStatus: 'not-listed',
      tags: data.tags || [],
      skills: data.skills || [],
      equipmentUsed: data.equipmentUsed || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Log creation event
    await this.logEvent(prototype.id!, 'created', 'Prototype created', {
      title: data.title,
      programme: data.programme
    });

    return prototype as Prototype;
  }

  async getPrototype(id: string): Promise<Prototype | null> {
    // In production, this would fetch from API/database
    // For now, return structure for type safety
    return null;
  }

  async updatePrototype(id: string, updates: Partial<Prototype>): Promise<Prototype> {
    const prototype = await this.getPrototype(id);
    if (!prototype) {
      throw new Error(`Prototype ${id} not found`);
    }

    const updated = {
      ...prototype,
      ...updates,
      updatedAt: new Date()
    };

    await this.logEvent(id, 'updated', 'Prototype updated', { updates });

    return updated;
  }

  async deletePrototype(id: string): Promise<void> {
    // Soft delete - move to archived status
    await this.updatePrototype(id, { status: 'archived' });
  }

  // --------------------------------------------------------------------------
  // ITERATION MANAGEMENT
  // --------------------------------------------------------------------------

  async addIteration(
    prototypeId: string,
    data: CreateIterationInput
  ): Promise<Iteration> {
    const prototype = await this.getPrototype(prototypeId);
    if (!prototype) {
      throw new Error(`Prototype ${prototypeId} not found`);
    }

    const iteration: Iteration = {
      id: this.generateId(),
      version: this.incrementVersion(prototype.currentVersion),
      title: data.title,
      description: data.description,
      changes: data.changes,
      createdAt: new Date(),
      createdBy: data.createdBy,
      assets: [],
      notes: data.notes || '',
      workshopSession: data.workshopSession,
      witnessed: data.witnessed || false,
      witnessedBy: data.witnessedBy
    };

    await this.logEvent(prototypeId, 'iteration-added', `Version ${iteration.version} added`, {
      version: iteration.version,
      changes: data.changes
    });

    return iteration;
  }

  async getIterationHistory(prototypeId: string): Promise<Iteration[]> {
    const prototype = await this.getPrototype(prototypeId);
    return prototype?.iterations || [];
  }

  // --------------------------------------------------------------------------
  // CREATOR MANAGEMENT
  // --------------------------------------------------------------------------

  async addCreator(prototypeId: string, creator: Creator): Promise<void> {
    const prototype = await this.getPrototype(prototypeId);
    if (!prototype) {
      throw new Error(`Prototype ${prototypeId} not found`);
    }

    // Validate contribution percentages don't exceed 100%
    const totalContribution = prototype.creators.reduce(
      (sum: any, c: { contributionPercentage: any; }) => sum + c.contributionPercentage, 0
    ) + creator.contributionPercentage;

    if (totalContribution > 100) {
      throw new Error('Total contribution percentage cannot exceed 100%');
    }

    await this.logEvent(prototypeId, 'creator-added', `${creator.name} added as ${creator.role}`, {
      creatorId: creator.id,
      role: creator.role,
      contribution: creator.contributionPercentage
    });
  }

  async updateCreatorContribution(
    prototypeId: string,
    creatorId: string,
    newPercentage: number
  ): Promise<void> {
    // Validate and update
    await this.logEvent(prototypeId, 'updated', `Creator contribution updated`, {
      creatorId,
      newPercentage
    });
  }

  async removeCreator(prototypeId: string, creatorId: string): Promise<void> {
    await this.logEvent(prototypeId, 'creator-removed', `Creator removed`, {
      creatorId
    });
  }

  // --------------------------------------------------------------------------
  // INVENTION DISCLOSURE
  // --------------------------------------------------------------------------

  async createDisclosure(
    prototypeId: string,
    data: CreateDisclosureInput
  ): Promise<InventionDisclosure> {
    const disclosure: InventionDisclosure = {
      id: this.generateId(),
      prototypeId,
      status: 'draft',
      inventionTitle: data.inventionTitle,
      technicalField: data.technicalField,
      problemSolved: data.problemSolved,
      solution: data.solution,
      novelFeatures: data.novelFeatures,
      knownPriorArt: data.knownPriorArt || [],
      conceptionDate: data.conceptionDate,
      firstDisclosureDate: new Date(),
      inventors: data.inventors,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.logEvent(prototypeId, 'disclosure-filed', 'Invention disclosure created', {
      disclosureId: disclosure.id
    });

    return disclosure;
  }

  async submitDisclosure(disclosureId: string): Promise<void> {
    // Update status to submitted
    // This would trigger review workflow
  }

  async assessPatentability(
    disclosureId: string,
    assessment: PatentabilityAssessmentInput
  ): Promise<void> {
    // Create patentability assessment
  }

  // --------------------------------------------------------------------------
  // PRIOR ART SEARCH
  // --------------------------------------------------------------------------

  async searchPriorArt(query: string): Promise<PriorArtSearchResult> {
    // In production, this would integrate with:
    // - Google Patents API
    // - USPTO API
    // - EPO Open Patent Services
    // - Academic databases
    
    return {
      query,
      results: [],
      searchedDatabases: ['patents', 'publications', 'products'],
      searchedAt: new Date()
    };
  }

  // --------------------------------------------------------------------------
  // MARKETPLACE INTEGRATION
  // --------------------------------------------------------------------------

  async listOnMarketplace(
    prototypeId: string,
    pricing: PricingModel,
    license: License
  ): Promise<void> {
    const prototype = await this.getPrototype(prototypeId);
    if (!prototype) {
      throw new Error(`Prototype ${prototypeId} not found`);
    }

    // Validate prototype is ready for marketplace
    if (prototype.status !== 'protected' && prototype.status !== 'documentation') {
      throw new Error('Prototype must be documented or protected before listing');
    }

    // Apply default revenue share if not specified
    if (!pricing.revenueShare) {
      pricing.revenueShare = DEFAULT_REVENUE_SHARE;
    }

    await this.logEvent(prototypeId, 'listed-marketplace', 'Listed on marketplace', {
      pricing,
      license: license.type
    });
  }

  async recordSale(
    prototypeId: string,
    saleData: SaleRecord
  ): Promise<void> {
    await this.logEvent(prototypeId, 'sold', 'Sale recorded', { saleData });
  }

  async recordLicense(
    prototypeId: string,
    licenseData: LicenseRecord
  ): Promise<void> {
    await this.logEvent(prototypeId, 'licensed', 'License granted', { licenseData });
  }

  // --------------------------------------------------------------------------
  // SEARCH AND DISCOVERY
  // --------------------------------------------------------------------------

  async searchPrototypes(params: PrototypeSearchParams): Promise<PrototypeSearchResult> {
    // Build query based on params
    // In production, this would query the database
    
    return {
      prototypes: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0
    };
  }

  async getPrototypesByProgramme(programme: ProgrammeSource): Promise<Prototype[]> {
    const result = await this.searchPrototypes({ programme: [programme] });
    return result.prototypes;
  }

  async getPrototypesByCreator(creatorId: string): Promise<Prototype[]> {
    const result = await this.searchPrototypes({ creatorId });
    return result.prototypes;
  }

  // --------------------------------------------------------------------------
  // STATUS MANAGEMENT
  // --------------------------------------------------------------------------

  async updateStatus(prototypeId: string, newStatus: PrototypeStatus): Promise<void> {
    const prototype = await this.getPrototype(prototypeId);
    if (!prototype) {
      throw new Error(`Prototype ${prototypeId} not found`);
    }

    // Validate status transition
    if (!this.isValidStatusTransition(prototype.status, newStatus)) {
      throw new Error(`Invalid status transition from ${prototype.status} to ${newStatus}`);
    }

    await this.logEvent(prototypeId, 'status-changed', `Status changed to ${newStatus}`, {
      previousStatus: prototype.status,
      newStatus
    });
  }

  async updateIPStatus(prototypeId: string, newIPStatus: IPStatus): Promise<void> {
    await this.logEvent(prototypeId, 'ip-status-changed', `IP status changed to ${newIPStatus}`, {
      newIPStatus
    });
  }

  // --------------------------------------------------------------------------
  // ASSET MANAGEMENT
  // --------------------------------------------------------------------------

  async addAsset(prototypeId: string, asset: Omit<PrototypeAsset, 'id'>): Promise<PrototypeAsset> {
    const fullAsset: PrototypeAsset = {
      ...asset,
      id: this.generateId()
    };

    return fullAsset;
  }

  async removeAsset(prototypeId: string, assetId: string): Promise<void> {
    // Remove asset reference
  }

  // --------------------------------------------------------------------------
  // DOCUMENTATION
  // --------------------------------------------------------------------------

  async addDocumentation(
    prototypeId: string,
    doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Documentation> {
    const fullDoc: Documentation = {
      ...doc,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return fullDoc;
  }

  // --------------------------------------------------------------------------
  // AUDIT AND EVENTS
  // --------------------------------------------------------------------------

  async getEventHistory(prototypeId: string): Promise<PrototypeEvent[]> {
    // Return event history for audit trail
    return [];
  }

  private async logEvent(
    prototypeId: string,
    type: EventType,
    description: string,
    data?: Record<string, unknown>
  ): Promise<void> {
    const event: PrototypeEvent = {
      id: this.generateId(),
      prototypeId,
      type,
      description,
      data,
      createdAt: new Date(),
      createdBy: 'system' // Would be actual user in production
    };

    // Store event
    console.log('Event logged:', event);
  }

  // --------------------------------------------------------------------------
  // UTILITY METHODS
  // --------------------------------------------------------------------------

  private generateId(): string {
    return `proto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private incrementVersion(currentVersion: string): string {
    const parts = currentVersion.split('.').map(Number);
    parts[2]++; // Increment patch version
    if (parts[2] >= 10) {
      parts[2] = 0;
      parts[1]++;
    }
    if (parts[1] >= 10) {
      parts[1] = 0;
      parts[0]++;
    }
    return parts.join('.');
  }

  private isValidStatusTransition(from: PrototypeStatus, to: PrototypeStatus): boolean {
    const validTransitions: Record<PrototypeStatus, PrototypeStatus[]> = {
      'concept': ['research', 'design', 'archived'],
      'research': ['concept', 'design', 'archived'],
      'design': ['research', 'development', 'archived'],
      'development': ['design', 'testing', 'archived'],
      'testing': ['development', 'documentation', 'archived'],
      'documentation': ['testing', 'review', 'marketplace', 'archived'],
      'review': ['documentation', 'protected', 'archived'],
      'protected': ['marketplace', 'archived'],
      'marketplace': ['protected', 'archived'],
      'archived': ['concept'] // Can be unarchived
    };

    return validTransitions[from]?.includes(to) ?? false;
  }
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreatePrototypeInput {
  title: string;
  description: string;
  category: PrototypeCategory;
  programme: ProgrammeSource;
  creators?: Creator[];
  ownershipModel?: OwnershipModel;
  communityContribution?: number;
  tags?: string[];
  skills?: string[];
  equipmentUsed?: string[];
}

export interface CreateIterationInput {
  title: string;
  description: string;
  changes: string[];
  createdBy: string;
  notes?: string;
  workshopSession?: string;
  witnessed?: boolean;
  witnessedBy?: string;
}

export interface CreateDisclosureInput {
  inventionTitle: string;
  technicalField: string;
  problemSolved: string;
  solution: string;
  novelFeatures: string[];
  knownPriorArt?: any[];
  conceptionDate: Date;
  inventors: any[];
}

export interface PatentabilityAssessmentInput {
  noveltyScore: number;
  nonObviousnessScore: number;
  utilityScore: number;
  recommendation: string;
  reasoning: string;
  suggestedIPStrategy: string[];
  notes?: string;
}

export interface PriorArtSearchResult {
  query: string;
  results: any[];
  searchedDatabases: string[];
  searchedAt: Date;
}

export interface SaleRecord {
  buyerId: string;
  amount: number;
  currency: string;
  transactionId: string;
  soldAt: Date;
}

export interface LicenseRecord {
  licenseeId: string;
  licenseType: string;
  terms: string;
  startDate: Date;
  endDate?: Date;
  fee?: number;
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const prototypeRegistry = new PrototypeRegistryService();