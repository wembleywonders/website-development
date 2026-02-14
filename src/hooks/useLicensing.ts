/**
 * useLicensing Hook
 * Wembley Wonders CIC
 * 
 * Manages licensing agreements for prototypes and IP.
 * Handles license creation, terms, and revenue tracking.
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type LicenseType = 
  | 'exclusive'
  | 'non-exclusive'
  | 'sole'
  | 'sub-licensable'
  | 'limited-use'
  | 'educational'
  | 'open-source';

export type LicenseStatus = 
  | 'draft'
  | 'proposed'
  | 'negotiating'
  | 'active'
  | 'expired'
  | 'terminated'
  | 'disputed';

export interface License {
  id: string;
  prototypeId: string;
  licensorId: string;
  licenseeId: string;
  licenseeName: string;
  
  // Terms
  type: LicenseType;
  territory: string[];
  duration: number; // months
  startDate: string;
  endDate: string;
  
  // Financial
  upfrontFee: number;
  royaltyRate: number; // percentage
  minimumRoyalty: number;
  paymentTerms: string;
  
  // Rights
  canSublicense: boolean;
  canModify: boolean;
  mustAttribute: boolean;
  restrictions: string[];
  
  // Status
  status: LicenseStatus;
  revenue: LicenseRevenue[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface LicenseRevenue {
  id: string;
  period: string; // YYYY-MM
  grossSales: number;
  royaltyDue: number;
  royaltyPaid: number;
  paidAt?: string;
  status: 'due' | 'paid' | 'overdue' | 'disputed';
}

export interface UseLicensingReturn {
  licenses: License[];
  loading: boolean;
  error: string | null;
  
  // CRUD
  createLicense: (license: Omit<License, 'id' | 'createdAt' | 'updatedAt' | 'revenue'>) => Promise<string | null>;
  updateLicense: (id: string, updates: Partial<License>) => Promise<boolean>;
  terminateLicense: (id: string, reason: string) => Promise<boolean>;
  
  // Revenue
  recordRevenue: (licenseId: string, period: string, grossSales: number) => Promise<boolean>;
  markRoyaltyPaid: (licenseId: string, revenueId: string) => Promise<boolean>;
  
  // Queries
  getActiveLicenses: () => License[];
  getTotalRevenue: () => number;
  getPendingRoyalties: () => number;
  
  refresh: () => Promise<void>;
}

// ============================================================================
// HOOK
// ============================================================================

export function useLicensing(prototypeId: string): UseLicensingReturn {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch licenses
  const fetchLicenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 200));
      setLicenses([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load licenses');
    } finally {
      setLoading(false);
    }
  }, [prototypeId]);

  useEffect(() => {
    if (prototypeId) {
      fetchLicenses();
    }
  }, [prototypeId, fetchLicenses]);

  // Create license
  const createLicense = useCallback(async (
    license: Omit<License, 'id' | 'createdAt' | 'updatedAt' | 'revenue'>
  ): Promise<string | null> => {
    try {
      const newId = `lic-${Date.now()}`;
      const now = new Date().toISOString();
      
      const newLicense: License = {
        ...license,
        id: newId,
        revenue: [],
        createdAt: now,
        updatedAt: now
      };
      
      setLicenses(prev => [...prev, newLicense]);
      return newId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create license');
      return null;
    }
  }, []);

  // Update license
  const updateLicense = useCallback(async (
    id: string, 
    updates: Partial<License>
  ): Promise<boolean> => {
    setLicenses(prev => prev.map(lic => 
      lic.id === id 
        ? { ...lic, ...updates, updatedAt: new Date().toISOString() }
        : lic
    ));
    return true;
  }, []);

  // Terminate license
  const terminateLicense = useCallback(async (
    id: string, 
    reason: string
  ): Promise<boolean> => {
    console.log(`[Licensing] Terminating ${id}: ${reason}`);
    return updateLicense(id, { status: 'terminated' });
  }, [updateLicense]);

  // Record revenue
  const recordRevenue = useCallback(async (
    licenseId: string, 
    period: string, 
    grossSales: number
  ): Promise<boolean> => {
    const license = licenses.find(l => l.id === licenseId);
    if (!license) return false;
    
    const royaltyDue = Math.max(
      grossSales * (license.royaltyRate / 100),
      license.minimumRoyalty
    );
    
    const newRevenue: LicenseRevenue = {
      id: `rev-${Date.now()}`,
      period,
      grossSales,
      royaltyDue,
      royaltyPaid: 0,
      status: 'due'
    };
    
    setLicenses(prev => prev.map(lic => 
      lic.id === licenseId
        ? { 
            ...lic, 
            revenue: [...lic.revenue, newRevenue],
            updatedAt: new Date().toISOString()
          }
        : lic
    ));
    
    return true;
  }, [licenses]);

  // Mark royalty paid
  const markRoyaltyPaid = useCallback(async (
    licenseId: string, 
    revenueId: string
  ): Promise<boolean> => {
    setLicenses(prev => prev.map(lic => {
      if (lic.id !== licenseId) return lic;
      
      return {
        ...lic,
        revenue: lic.revenue.map(rev => 
          rev.id === revenueId
            ? { 
                ...rev, 
                royaltyPaid: rev.royaltyDue,
                paidAt: new Date().toISOString(),
                status: 'paid' as const
              }
            : rev
        ),
        updatedAt: new Date().toISOString()
      };
    }));
    
    return true;
  }, []);

  // Get active licenses
  const getActiveLicenses = useCallback((): License[] => {
    return licenses.filter(l => l.status === 'active');
  }, [licenses]);

  // Get total revenue
  const getTotalRevenue = useCallback((): number => {
    return licenses.reduce((total, lic) => 
      total + lic.revenue.reduce((sum, rev) => sum + rev.royaltyPaid, 0), 
      0
    );
  }, [licenses]);

  // Get pending royalties
  const getPendingRoyalties = useCallback((): number => {
    return licenses.reduce((total, lic) => 
      total + lic.revenue
        .filter(rev => rev.status === 'due' || rev.status === 'overdue')
        .reduce((sum, rev) => sum + (rev.royaltyDue - rev.royaltyPaid), 0), 
      0
    );
  }, [licenses]);

  return {
    licenses,
    loading,
    error,
    createLicense,
    updateLicense,
    terminateLicense,
    recordRevenue,
    markRoyaltyPaid,
    getActiveLicenses,
    getTotalRevenue,
    getPendingRoyalties,
    refresh: fetchLicenses
  };
}

export default useLicensing;
