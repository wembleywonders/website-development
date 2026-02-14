/**
 * Prototype Registry Types
 * Wembley Wonders CIC - Community Innovation IP System
 * 
 * These types underpin the entire prototyping and patenting workflow,
 * tracking innovations from initial concept through to commercialisation.
 */

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Prototype {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: PrototypeStatus;
  category: PrototypeCategory;
  programme: ProgrammeSource;
  
  // Ownership and attribution
  creators: Creator[];
  ownershipModel: OwnershipModel;
  communityContribution: number; // Percentage owned by community (0-100)
  
  // Development tracking
  iterations: Iteration[];
  currentVersion: string;
  createdAt: Date;
  updatedAt: Date;
  
  // IP Status
  ipStatus: IPStatus;
  disclosures: InventionDisclosure[];
  
  // Assets
  assets: PrototypeAsset[];
  documentation: Documentation[];
  
  // Commercialisation
  marketplaceStatus: MarketplaceStatus;
  pricing?: PricingModel;
  licenses: License[];
  
  // Metadata
  tags: string[];
  skills: string[];
  equipmentUsed: string[];
}

export interface Creator {
  id: string;
  name: string;
  email?: string;
  role: CreatorRole;
  contributionPercentage: number;
  joinedAt: Date;
  programmeEnrolment?: string;
  consentGiven: boolean;
  consentDate?: Date;
}

export interface Iteration {
  id: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
  createdAt: Date;
  createdBy: string;
  assets: PrototypeAsset[];
  notes: string;
  workshopSession?: string;
  witnessed: boolean;
  witnessedBy?: string;
}

export interface InventionDisclosure {
  id: string;
  prototypeId: string;
  status: DisclosureStatus;
  
  // Core disclosure fields
  inventionTitle: string;
  technicalField: string;
  problemSolved: string;
  solution: string;
  novelFeatures: string[];
  knownPriorArt: PriorArtReference[];
  
  // Development history
  conceptionDate: Date;
  firstDisclosureDate: Date;
  reductionToPractice?: Date;
  
  // Contributors
  inventors: Inventor[];
  
  // Assessment
  patentabilityAssessment?: PatentabilityAssessment;
  
  // Timeline
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Inventor {
  creatorId: string;
  name: string;
  contribution: string;
  percentage: number;
  citizenship?: string;
  assignmentSigned: boolean;
  assignmentDate?: Date;
}

export interface PriorArtReference {
  id: string;
  type: 'patent' | 'publication' | 'product' | 'website' | 'other';
  title: string;
  reference: string;
  url?: string;
  date?: Date;
  relevance: string;
  distinguishingFeatures: string;
}

export interface PatentabilityAssessment {
  id: string;
  disclosureId: string;
  assessedAt: Date;
  assessedBy: string;
  
  // Assessment criteria
  noveltyScore: number; // 1-10
  nonObviousnessScore: number; // 1-10
  utilityScore: number; // 1-10
  overallScore: number;
  
  recommendation: PatentRecommendation;
  reasoning: string;
  suggestedIPStrategy: IPStrategy[];
  
  // Cost-benefit
  estimatedFilingCost?: number;
  estimatedMaintenanceCost?: number;
  potentialValue?: number;
  
  notes: string;
}

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

export type PrototypeStatus = 
  | 'concept'           // Initial idea stage
  | 'research'          // Researching feasibility
  | 'design'            // Design phase
  | 'development'       // Active building
  | 'testing'           // Testing and refinement
  | 'documentation'     // Documenting for IP
  | 'review'            // Under IP review
  | 'protected'         // IP protection filed
  | 'marketplace'       // Available in cyberstore
  | 'archived';         // No longer active

export type PrototypeCategory =
  | 'hardware'          // Physical devices, circuits
  | 'software'          // Apps, scripts, algorithms
  | 'fashion-tech'      // Wearables, smart accessories
  | 'content'           // Media, educational materials
  | 'service'           // Service designs, processes
  | 'hybrid';           // Combination

export type ProgrammeSource =
  | 'stemgeneers'
  | 'silk-stilettos'
  | 'techreneurs'
  | 'gtechcasters'
  | 'bright-sparks'
  | 'trubble-n-bass'
  | 'kaywanas-court'
  | 'pageturners'
  | 'auntie-anansis-kitchen'
  | 'scrap-cat'
  | 'money-reset'
  | 'community-project'
  | 'independent';

export type CreatorRole =
  | 'lead'              // Primary creator
  | 'contributor'       // Significant contribution
  | 'collaborator'      // Collaborative work
  | 'mentor'            // Guided development
  | 'community';        // Community contribution

export type OwnershipModel =
  | 'individual'        // Single creator owns
  | 'team'              // Shared among team
  | 'community'         // Community ownership (55/25/20 model)
  | 'hybrid';           // Mixed ownership

export type IPStatus =
  | 'unprotected'
  | 'disclosure-filed'
  | 'under-review'
  | 'patent-pending'
  | 'patent-granted'
  | 'design-registered'
  | 'trademarked'
  | 'copyrighted'
  | 'open-source'
  | 'creative-commons';

export type DisclosureStatus =
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'additional-info-needed'
  | 'approved'
  | 'rejected'
  | 'filed';

export type PatentRecommendation =
  | 'strong-candidate'
  | 'moderate-candidate'
  | 'weak-candidate'
  | 'not-recommended'
  | 'alternative-protection';

export type IPStrategy =
  | 'utility-patent'
  | 'design-patent'
  | 'trademark'
  | 'copyright'
  | 'trade-secret'
  | 'open-source'
  | 'creative-commons'
  | 'defensive-publication';

export type MarketplaceStatus =
  | 'not-listed'
  | 'pending-review'
  | 'listed'
  | 'featured'
  | 'sold-out'
  | 'discontinued';

// ============================================================================
// ASSETS AND DOCUMENTATION
// ============================================================================

export interface PrototypeAsset {
  id: string;
  type: AssetType;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  description?: string;
  iterationId?: string;
}

export type AssetType =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'cad-file'
  | 'schematic'
  | 'code'
  | 'pattern'
  | 'other';

export interface Documentation {
  id: string;
  type: DocumentationType;
  title: string;
  content: string;
  format: 'markdown' | 'html' | 'pdf';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type DocumentationType =
  | 'overview'
  | 'technical-spec'
  | 'user-guide'
  | 'assembly-instructions'
  | 'safety-notes'
  | 'bill-of-materials'
  | 'testing-results'
  | 'ip-disclosure';

// ============================================================================
// LICENSING AND PRICING
// ============================================================================

export interface License {
  id: string;
  type: LicenseType;
  name: string;
  terms: string;
  url?: string;
  restrictions: string[];
  permissions: string[];
  attribution: boolean;
  commercial: boolean;
  derivatives: boolean;
  shareAlike: boolean;
}

export type LicenseType =
  | 'proprietary'
  | 'cc-by'
  | 'cc-by-sa'
  | 'cc-by-nc'
  | 'cc-by-nc-sa'
  | 'mit'
  | 'gpl'
  | 'custom';

export interface PricingModel {
  type: PricingType;
  basePrice: number;
  currency: 'GBP';
  revenueShare: RevenueShare;
  bulkDiscounts?: BulkDiscount[];
  communityDiscount?: number;
}

export type PricingType =
  | 'one-time'
  | 'subscription'
  | 'pay-what-you-can'
  | 'free'
  | 'license-fee';

export interface RevenueShare {
  // The 55/25/20 model
  creator: number;      // Default 55%
  community: number;    // Default 25%
  platform: number;     // Default 20%
}

export interface BulkDiscount {
  quantity: number;
  discountPercentage: number;
}

// ============================================================================
// SEARCH AND FILTERING
// ============================================================================

export interface PrototypeSearchParams {
  query?: string;
  status?: PrototypeStatus[];
  category?: PrototypeCategory[];
  programme?: ProgrammeSource[];
  ipStatus?: IPStatus[];
  creatorId?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PrototypeSearchResult {
  prototypes: Prototype[];
  total: number;
  page: number;
  totalPages: number;
}

// ============================================================================
// EVENTS AND AUDIT
// ============================================================================

export interface PrototypeEvent {
  id: string;
  prototypeId: string;
  type: EventType;
  description: string;
  data?: Record<string, unknown>;
  createdAt: Date;
  createdBy: string;
  workshopSession?: string;
}

export type EventType =
  | 'created'
  | 'updated'
  | 'iteration-added'
  | 'creator-added'
  | 'creator-removed'
  | 'disclosure-filed'
  | 'status-changed'
  | 'ip-status-changed'
  | 'listed-marketplace'
  | 'sold'
  | 'licensed';