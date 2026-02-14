/**
 * usePrototypeRegistry Hook
 * Wembley Wonders CIC
 * 
 * Central hook for managing prototypes in the registry.
 * Handles CRUD, versioning, and lifecycle management.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type PrototypeStatus = 
  | 'concept'
  | 'development'
  | 'testing'
  | 'review'
  | 'approved'
  | 'marketplace'
  | 'archived';

export type PrototypeCategory = 
  | 'hardware'
  | 'software'
  | 'fashion'
  | 'media'
  | 'service'
  | 'hybrid';

export interface Prototype {
  id: string;
  creatorId: string;
  programme: string;
  
  // Basic Info
  name: string;
  tagline: string;
  description: string;
  category: PrototypeCategory;
  tags: string[];
  
  // Versioning
  version: string;
  iterations: PrototypeIteration[];
  
  // Status
  status: PrototypeStatus;
  publishedAt?: string;
  
  // Assets
  thumbnailUrl?: string;
  assets: PrototypeAsset[];
  
  // Valuation
  estimatedValue?: number;
  valuationDate?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface PrototypeIteration {
  version: string;
  changes: string;
  createdAt: string;
  createdBy: string;
}

export interface PrototypeAsset {
  id: string;
  type: 'image' | 'video' | 'document' | 'model' | 'code';
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface UsePrototypeRegistryReturn {
  prototypes: Prototype[];
  currentPrototype: Prototype | null;
  loading: boolean;
  error: string | null;
  
  // CRUD
  createPrototype: (data: Partial<Prototype>) => Promise<string | null>;
  updatePrototype: (id: string, updates: Partial<Prototype>) => Promise<boolean>;
  deletePrototype: (id: string) => Promise<boolean>;
  
  // Selection
  selectPrototype: (id: string) => void;
  clearSelection: () => void;
  
  // Versioning
  createIteration: (id: string, changes: string) => Promise<boolean>;
  
  // Status
  updateStatus: (id: string, status: PrototypeStatus) => Promise<boolean>;
  publishToMarketplace: (id: string) => Promise<boolean>;
  
  // Assets
  addAsset: (prototypeId: string, asset: Omit<PrototypeAsset, 'id' | 'uploadedAt'>) => Promise<boolean>;
  removeAsset: (prototypeId: string, assetId: string) => Promise<boolean>;
  
  // Queries
  getByStatus: (status: PrototypeStatus) => Prototype[];
  getByProgramme: (programme: string) => Prototype[];
  searchPrototypes: (query: string) => Prototype[];
  
  refresh: () => Promise<void>;
}

// ============================================================================
// HOOK
// ============================================================================

export function usePrototypeRegistry(creatorId?: string): UsePrototypeRegistryReturn {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [currentPrototype, setCurrentPrototype] = useState<Prototype | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prototypes
  const fetchPrototypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      setPrototypes([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prototypes');
    } finally {
      setLoading(false);
    }
  }, [creatorId]);

  useEffect(() => {
    fetchPrototypes();
  }, [fetchPrototypes]);

  // Create prototype
  const createPrototype = useCallback(async (data: Partial<Prototype>): Promise<string | null> => {
    try {
      const now = new Date().toISOString();
      const newId = `proto-${Date.now()}`;
      
      const newPrototype: Prototype = {
        id: newId,
        creatorId: creatorId || 'unknown',
        programme: data.programme || 'unknown',
        name: data.name || 'Untitled Prototype',
        tagline: data.tagline || '',
        description: data.description || '',
        category: data.category || 'hybrid',
        tags: data.tags || [],
        version: '0.1.0',
        iterations: [{
          version: '0.1.0',
          changes: 'Initial creation',
          createdAt: now,
          createdBy: creatorId || 'unknown'
        }],
        status: 'concept',
        assets: [],
        createdAt: now,
        updatedAt: now,
        ...data
      };
      
      setPrototypes(prev => [...prev, newPrototype]);
      return newId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create prototype');
      return null;
    }
  }, [creatorId]);

  // Update prototype
  const updatePrototype = useCallback(async (
    id: string, 
    updates: Partial<Prototype>
  ): Promise<boolean> => {
    setPrototypes(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...updates, updatedAt: new Date().toISOString() }
        : p
    ));
    
    if (currentPrototype?.id === id) {
      setCurrentPrototype(prev => prev ? { ...prev, ...updates } : null);
    }
    
    return true;
  }, [currentPrototype]);

  // Delete prototype
  const deletePrototype = useCallback(async (id: string): Promise<boolean> => {
    setPrototypes(prev => prev.filter(p => p.id !== id));
    
    if (currentPrototype?.id === id) {
      setCurrentPrototype(null);
    }
    
    return true;
  }, [currentPrototype]);

  // Select prototype
  const selectPrototype = useCallback((id: string) => {
    const prototype = prototypes.find(p => p.id === id);
    setCurrentPrototype(prototype || null);
  }, [prototypes]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setCurrentPrototype(null);
  }, []);

  // Create iteration
  const createIteration = useCallback(async (id: string, changes: string): Promise<boolean> => {
    const prototype = prototypes.find(p => p.id === id);
    if (!prototype) return false;
    
    // Bump version
    const [major, minor, patch] = prototype.version.split('.').map(Number);
    const newVersion = `${major}.${minor}.${patch + 1}`;
    
    const newIteration: PrototypeIteration = {
      version: newVersion,
      changes,
      createdAt: new Date().toISOString(),
      createdBy: creatorId || 'unknown'
    };
    
    return updatePrototype(id, {
      version: newVersion,
      iterations: [...prototype.iterations, newIteration]
    });
  }, [prototypes, creatorId, updatePrototype]);

  // Update status
  const updateStatus = useCallback(async (
    id: string, 
    status: PrototypeStatus
  ): Promise<boolean> => {
    return updatePrototype(id, { status });
  }, [updatePrototype]);

  // Publish to marketplace
  const publishToMarketplace = useCallback(async (id: string): Promise<boolean> => {
    return updatePrototype(id, {
      status: 'marketplace',
      publishedAt: new Date().toISOString()
    });
  }, [updatePrototype]);

  // Add asset
  const addAsset = useCallback(async (
    prototypeId: string, 
    asset: Omit<PrototypeAsset, 'id' | 'uploadedAt'>
  ): Promise<boolean> => {
    const prototype = prototypes.find(p => p.id === prototypeId);
    if (!prototype) return false;
    
    const newAsset: PrototypeAsset = {
      ...asset,
      id: `asset-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    
    return updatePrototype(prototypeId, {
      assets: [...prototype.assets, newAsset]
    });
  }, [prototypes, updatePrototype]);

  // Remove asset
  const removeAsset = useCallback(async (
    prototypeId: string, 
    assetId: string
  ): Promise<boolean> => {
    const prototype = prototypes.find(p => p.id === prototypeId);
    if (!prototype) return false;
    
    return updatePrototype(prototypeId, {
      assets: prototype.assets.filter(a => a.id !== assetId)
    });
  }, [prototypes, updatePrototype]);

  // Get by status
  const getByStatus = useCallback((status: PrototypeStatus): Prototype[] => {
    return prototypes.filter(p => p.status === status);
  }, [prototypes]);

  // Get by programme
  const getByProgramme = useCallback((programme: string): Prototype[] => {
    return prototypes.filter(p => p.programme === programme);
  }, [prototypes]);

  // Search prototypes
  const searchPrototypes = useCallback((query: string): Prototype[] => {
    const q = query.toLowerCase();
    return prototypes.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [prototypes]);

  return {
    prototypes,
    currentPrototype,
    loading,
    error,
    createPrototype,
    updatePrototype,
    deletePrototype,
    selectPrototype,
    clearSelection,
    createIteration,
    updateStatus,
    publishToMarketplace,
    addAsset,
    removeAsset,
    getByStatus,
    getByProgramme,
    searchPrototypes,
    refresh: fetchPrototypes
  };
}

export default usePrototypeRegistry;
