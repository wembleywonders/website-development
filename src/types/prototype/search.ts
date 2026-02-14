/**
 * Prototype Search Types
 * Wembley Wonders CIC
 * 
 * Types for searching, filtering, and paginating prototypes
 * across the registry dashboard and programme views.
 */

// Define the missing types here if not exported from elsewhere
export type PrototypeStatus = 'draft' | 'design' | 'development' | 'testing' | 'documentation' | 'review' | 'protected' | 'marketplace';
export type PrototypeCategory = 'hardware' | 'software' | 'fashion-tech' | 'other';
export type ProgrammeSource = 'stemgeneers' | 'silk-stilettos' | 'techreneurs';
export type IPStatus = 'unprotected' | 'protected' | 'pending';

// Remove the import since types are now defined locally

// ============================================================================
// SEARCH PARAMS
// ============================================================================

export interface PrototypeSearchParams {
  query?: string;
  status?: PrototypeStatus[];
  category?: PrototypeCategory[];
  programme?: ProgrammeSource[];
  ipStatus?: IPStatus[];
  creatorId?: string;
  tags?: string[];
  skills?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  hasDisclosure?: boolean;
  isMarketplaceListed?: boolean;
  sortBy?: PrototypeSortField;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export type PrototypeSortField =
  | 'createdAt'
  | 'updatedAt'
  | 'title'
  | 'status'
  | 'ipStatus'
  | 'iterationCount'
  | 'creatorCount';

// ============================================================================
// SEARCH RESULTS
// ============================================================================

export interface PrototypeSearchResult {
  prototypes: PrototypeSummary[];
  total: number;
  page: number;
  totalPages: number;
  facets?: SearchFacets;
}

/**
 * Lightweight prototype summary for list views.
 * Full Prototype entity is loaded when user clicks through.
 */
export interface PrototypeSummary {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: PrototypeStatus;
  category: PrototypeCategory;
  programme: ProgrammeSource;
  ipStatus: IPStatus;
  currentVersion: string;
  iterationCount: number;
  creatorCount: number;
  leadCreator: string;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

// ============================================================================
// FACETED SEARCH
// ============================================================================

/**
 * Facet counts for filtering sidebar.
 * Shows how many prototypes match each filter option.
 */
export interface SearchFacets {
  byStatus: FacetCount<PrototypeStatus>[];
  byCategory: FacetCount<PrototypeCategory>[];
  byProgramme: FacetCount<ProgrammeSource>[];
  byIPStatus: FacetCount<IPStatus>[];
  byTag: FacetCount<string>[];
}

export interface FacetCount<T> {
  value: T;
  count: number;
  label: string;
}

// ============================================================================
// SAVED SEARCHES
// ============================================================================

export interface SavedSearch {
  id: string;
  name: string;
  params: PrototypeSearchParams;
  createdBy: string;
  createdAt: Date;
  isDefault?: boolean;
}

// ============================================================================
// QUICK FILTERS
// ============================================================================

/**
 * Pre-defined filter presets for common views
 */
export const QUICK_FILTERS: Record<string, Partial<PrototypeSearchParams>> = {
  'my-prototypes': {
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'needs-ip-review': {
    status: ['documentation', 'review'],
    ipStatus: ['unprotected'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'active-builds': {
    status: ['design', 'development', 'testing'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'marketplace-ready': {
    status: ['protected', 'marketplace'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'stemgeneers-hardware': {
    programme: ['stemgeneers'],
    category: ['hardware'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'silk-stilettos-fashion': {
    programme: ['silk-stilettos'],
    category: ['fashion-tech'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
  'techreneurs-ventures': {
    programme: ['techreneurs'],
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
} as const;