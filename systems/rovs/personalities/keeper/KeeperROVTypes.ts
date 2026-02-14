// src/systems/rovs/personalities/keeper/KeeperROVTypes.ts

export interface KeeperConfig {
  autoArchiveCompletedProjects: boolean;
  heritageContentPriority: boolean;
  retentionPeriodDays: Record<string, number>;
  backupFrequencyHours: number;
}

export interface ArchiveSearch {
  query: string;
  filters: {
    type?: string[];
    programme?: string[];
    dateRange?: { start: Date; end: Date };
    permanence?: string[];
  };
  results: ArchiveSearchResult[];
}

export interface ArchiveSearchResult {
  entryId: string;
  title: string;
  type: string;
  relevanceScore: number;
  preview: string;
  archivedAt: Date;
}

export interface HeritageCollection {
  id: string;
  name: string;
  description: string;
  entries: string[];
  contributors: string[];
  createdAt: Date;
  featured: boolean;
}

export const DEFAULT_KEEPER_CONFIG: KeeperConfig = {
  autoArchiveCompletedProjects: true,
  heritageContentPriority: true,
  retentionPeriodDays: {
    temporary: 90,
    'long-term': 1095, // 3 years
    permanent: -1 // Never delete
  },
  backupFrequencyHours: 24
};