// src/features/provenance/types/index.ts
// Provenance Types - Tracking creative work origins, authenticity, and heritage chain
// Supports Recipe Heritage Keeper, Joystick submissions, and creator portfolios

// ============================================
// CORE PROVENANCE TYPES
// ============================================

/**
 * The type of creative work being tracked
 */
export type ProvenanceItemType = 
  | 'recipe'           // Family recipes, food heritage
  | 'story'            // Oral histories, narratives
  | 'technique'        // Craft techniques, methods
  | 'design'           // Fashion, visual designs
  | 'audio'            // Podcasts, recordings, music
  | 'video'            // Films, streams, performances
  | 'article'          // Written pieces, journalism
  | 'prototype'        // Physical builds, inventions
  | 'performance'      // Theatre, live performances
  | 'game'             // Game designs, mods
  | 'code'             // Software, scripts
  | 'mixed';           // Multi-format works

/**
 * How confident we are in the provenance claim
 */
export type ProvenanceConfidence = 
  | 'verified'         // Multiple sources confirm
  | 'attested'         // Single credible source
  | 'claimed'          // Creator's word only
  | 'uncertain'        // Gaps in the chain
  | 'disputed';        // Conflicting claims

/**
 * The relationship between contributor and work
 */
export type ContributionType = 
  | 'originator'       // Created from nothing
  | 'inheritor'        // Received from family/community
  | 'adapter'          // Modified existing work
  | 'collaborator'     // Co-created with others
  | 'documenter'       // Recorded but didn't create
  | 'curator'          // Collected and preserved
  | 'interpreter';     // Performed/presented others' work

// ============================================
// PROVENANCE RECORD
// ============================================

/**
 * A single link in the provenance chain
 */
export interface ProvenanceLink {
  /** Unique identifier for this link */
  id: string;
  
  /** Who contributed at this point */
  contributor: ProvenanceContributor;
  
  /** What type of contribution */
  contributionType: ContributionType;
  
  /** When this link was established */
  date: Date | ProvenanceDate;
  
  /** Where this happened (if known) */
  location?: ProvenanceLocation;
  
  /** Description of what happened at this link */
  description: string;
  
  /** Evidence supporting this link */
  evidence?: ProvenanceEvidence[];
  
  /** How confident we are in this link */
  confidence: ProvenanceConfidence;
  
  /** Notes from the documenter */
  notes?: string;
}

/**
 * Someone who contributed to the work's provenance
 */
export interface ProvenanceContributor {
  /** Name as they wish to be credited */
  name: string;
  
  /** Relationship to the work */
  relationship?: string;
  
  /** Family/community connection */
  lineage?: string;
  
  /** Cultural/geographic origin */
  origin?: string;
  
  /** Wembley Wonders member ID (if member) */
  memberId?: string;
  
  /** Whether they've consented to being named */
  consentGiven: boolean;
  
  /** Whether they're still living */
  living?: boolean;
  
  /** Birth year (approximate okay) */
  birthYear?: number;
  
  /** Death year (if applicable) */
  deathYear?: number;
}

/**
 * Flexible date representation for historical provenance
 */
export interface ProvenanceDate {
  /** Exact date if known */
  exact?: Date;
  
  /** Year if exact date unknown */
  year?: number;
  
  /** Decade if year unknown (e.g., "1960s") */
  decade?: string;
  
  /** Era description if decade unknown */
  era?: string;
  
  /** Whether this is approximate */
  approximate: boolean;
  
  /** Notes on the dating */
  notes?: string;
}

/**
 * Location information for provenance
 */
export interface ProvenanceLocation {
  /** Country */
  country?: string;
  
  /** Region/state/parish */
  region?: string;
  
  /** City/town/village */
  locality?: string;
  
  /** Specific place (e.g., "grandmother's kitchen in Port of Spain") */
  specificPlace?: string;
  
  /** Cultural context (e.g., "Windrush community in Brixton") */
  culturalContext?: string;
  
  /** GPS coordinates if relevant */
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Evidence supporting a provenance claim
 */
export interface ProvenanceEvidence {
  /** Type of evidence */
  type: 'oral' | 'written' | 'photographic' | 'video' | 'audio' | 'physical' | 'digital';
  
  /** Description of the evidence */
  description: string;
  
  /** Who provided the evidence */
  source: string;
  
  /** When the evidence was collected */
  collectedAt: Date;
  
  /** Who collected it */
  collectedBy: string;
  
  /** File reference if digitized */
  fileReference?: string;
  
  /** URL if available online */
  url?: string;
  
  /** Transcript if audio/video */
  transcript?: string;
}

// ============================================
// COMPLETE PROVENANCE RECORD
// ============================================

/**
 * Complete provenance record for a creative work
 */
export interface ProvenanceRecord {
  /** Unique identifier */
  id: string;
  
  /** Type of work */
  itemType: ProvenanceItemType;
  
  /** Title/name of the work */
  title: string;
  
  /** Description of the work */
  description: string;
  
  /** The provenance chain, oldest to newest */
  chain: ProvenanceLink[];
  
  /** Current custodian (usually the documenter) */
  currentCustodian: ProvenanceContributor;
  
  /** Overall confidence in the provenance */
  overallConfidence: ProvenanceConfidence;
  
  /** Cultural/community context */
  culturalContext?: CulturalContext;
  
  /** Related works */
  relatedWorks?: RelatedWork[];
  
  /** Tags for searchability */
  tags: string[];
  
  /** When this record was created */
  createdAt: Date;
  
  /** When this record was last updated */
  updatedAt: Date;
  
  /** Who created this record */
  documentedBy: string;
  
  /** Wembley Wonders programme this relates to */
  programme?: string;
  
  /** Child of Anansi who helped document */
  guidedBy?: string;
  
  /** Whether this record is public */
  isPublic: boolean;
  
  /** Access control */
  accessControl?: AccessControl;
}

/**
 * Cultural context for the work
 */
export interface CulturalContext {
  /** Cultural tradition(s) this belongs to */
  traditions: string[];
  
  /** Languages involved */
  languages?: string[];
  
  /** Religious/spiritual context */
  spiritualContext?: string;
  
  /** Historical period */
  historicalPeriod?: string;
  
  /** Diaspora connection */
  diasporaConnection?: string;
  
  /** Community significance */
  communitySignificance?: string;
  
  /** Occasions when used/performed */
  occasions?: string[];
}

/**
 * Related work reference
 */
export interface RelatedWork {
  /** ID of the related work */
  workId?: string;
  
  /** Title if external */
  title: string;
  
  /** How it relates */
  relationship: 'variant' | 'inspiration' | 'derivative' | 'response' | 'collection' | 'series';
  
  /** Description of the relationship */
  description?: string;
}

/**
 * Access control for sensitive provenance
 */
export interface AccessControl {
  /** Who can view this record */
  viewAccess: 'public' | 'members' | 'family' | 'private';
  
  /** Who can edit this record */
  editAccess: string[];
  
  /** Time-based restrictions */
  embargo?: {
    until: Date;
    reason: string;
  };
  
  /** Specific exclusions */
  exclusions?: string[];
}

// ============================================
// HERITAGE-SPECIFIC TYPES
// ============================================

/**
 * Recipe-specific provenance extensions
 */
export interface RecipeProvenance extends ProvenanceRecord {
  itemType: 'recipe';
  
  /** Recipe-specific details */
  recipeDetails: {
    /** Cuisine type */
    cuisine: string;
    
    /** Dish category */
    category: 'main' | 'side' | 'dessert' | 'drink' | 'condiment' | 'snack' | 'bread' | 'preserve';
    
    /** Key ingredients */
    keyIngredients: string[];
    
    /** Techniques used */
    techniques: string[];
    
    /** Occasions */
    occasions: string[];
    
    /** Dietary notes */
    dietary?: string[];
    
    /** Regional variations known */
    knownVariations?: string[];
    
    /** "Secret" or special elements */
    specialElements?: string;
  };
}

/**
 * Oral history/story-specific provenance
 */
export interface StoryProvenance extends ProvenanceRecord {
  itemType: 'story';
  
  /** Story-specific details */
  storyDetails: {
    /** Type of story */
    storyType: 'family' | 'community' | 'historical' | 'folklore' | 'personal' | 'migration';
    
    /** Themes */
    themes: string[];
    
    /** Key figures mentioned */
    keyFigures: string[];
    
    /** Time period covered */
    timePeriod?: string;
    
    /** Whether it should be told in specific contexts */
    tellingContext?: string;
    
    /** Languages/dialects in the original */
    originalLanguages?: string[];
  };
}

/**
 * Performance/technique-specific provenance
 */
export interface TechniqueProvenance extends ProvenanceRecord {
  itemType: 'technique';
  
  /** Technique-specific details */
  techniqueDetails: {
    /** Domain of the technique */
    domain: 'craft' | 'music' | 'dance' | 'culinary' | 'textile' | 'building' | 'agricultural' | 'healing';
    
    /** Materials/tools used */
    materialsOrTools: string[];
    
    /** Skill level required */
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
    
    /** Time to learn */
    learningTime?: string;
    
    /** Whether it requires in-person teaching */
    requiresInPerson: boolean;
    
    /** Safety considerations */
    safetyNotes?: string[];
  };
}

// ============================================
// PROVENANCE OPERATIONS
// ============================================

/**
 * Request to add a link to provenance chain
 */
export interface AddProvenanceLinkRequest {
  recordId: string;
  link: Omit<ProvenanceLink, 'id'>;
  addedBy: string;
  reason: string;
}

/**
 * Request to verify a provenance claim
 */
export interface VerificationRequest {
  recordId: string;
  linkId?: string;
  verifierName: string;
  verifierRelationship: string;
  verificationMethod: 'oral' | 'documentary' | 'physical' | 'digital';
  evidence?: ProvenanceEvidence;
  notes?: string;
}

/**
 * Provenance search parameters
 */
export interface ProvenanceSearchParams {
  /** Text search across all fields */
  query?: string;
  
  /** Filter by item type */
  itemTypes?: ProvenanceItemType[];
  
  /** Filter by cultural tradition */
  traditions?: string[];
  
  /** Filter by location */
  locations?: string[];
  
  /** Filter by contributor name */
  contributorName?: string;
  
  /** Filter by time period */
  timePeriod?: {
    from?: number;  // Year
    to?: number;    // Year
  };
  
  /** Filter by confidence level */
  minConfidence?: ProvenanceConfidence;
  
  /** Filter by programme */
  programme?: string;
  
  /** Filter by guide (Child of Anansi) */
  guidedBy?: string;
  
  /** Only public records */
  publicOnly?: boolean;
  
  /** Pagination */
  limit?: number;
  offset?: number;
  
  /** Sort order */
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'confidence';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Provenance search results
 */
export interface ProvenanceSearchResults {
  records: ProvenanceRecord[];
  total: number;
  limit: number;
  offset: number;
  facets?: {
    itemTypes: Record<ProvenanceItemType, number>;
    traditions: Record<string, number>;
    locations: Record<string, number>;
    programmes: Record<string, number>;
  };
}

// ============================================
// PROVENANCE EVENTS
// ============================================

/**
 * Events that can occur in provenance tracking
 */
export type ProvenanceEventType = 
  | 'record_created'
  | 'link_added'
  | 'verification_added'
  | 'confidence_updated'
  | 'access_changed'
  | 'record_published'
  | 'record_archived'
  | 'dispute_raised'
  | 'dispute_resolved';

/**
 * A logged provenance event
 */
export interface ProvenanceEvent {
  id: string;
  recordId: string;
  eventType: ProvenanceEventType;
  actor: string;
  timestamp: Date;
  details: Record<string, unknown>;
  previousState?: Record<string, unknown>;
}

// ============================================
// EXPORTS
// ============================================

export type {
  ProvenanceRecord as HeritageRecord  // Alias for heritage-focused contexts
};