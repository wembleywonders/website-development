/**
 * USE CREATOR PROFILE HOOK
 * 
 * Manages creator profile state and API interactions.
 * Central hook for all creator-related data.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import { useState, useEffect, useCallback } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface CreatorProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membershipLevel: 'visitor' | 'explorer' | 'member' | 'champion';
  
  programme: {
    id: string;
    name: string;
    workshopsCompleted: number;
    totalWorkshops: number;
    startedAt: string;
  };
  
  tokens: {
    balance: number;
    lifetimeEarned: number;
    pendingRewards: number;
  };
  
  credentials: Credential[];
  
  marketplace: {
    productsListed: number;
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    reviewCount: number;
  };
  
  community: {
    totalContributed: number;
    workshopHoursFunded: number;
  };
  
  skills: SkillAssessment[];
  
  activity: {
    lastActive: string;
    streakDays: number;
    projectsCompleted: number;
  };
}

export interface Credential {
  id: string;
  type: 'programme' | 'badge' | 'mentor';
  name: string;
  issuedAt: string;
  icon: string;
  metadata?: Record<string, any>;
}

export interface SkillAssessment {
  skillId: string;
  level: 0 | 1 | 2 | 3 | 4 | 5;
  lastPracticed?: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface UseCreatorProfileReturn {
  profile: CreatorProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (updates: Partial<CreatorProfile>) => Promise<void>;
  addCredential: (credential: Omit<Credential, 'id'>) => Promise<void>;
  updateSkill: (skillId: string, level: number) => Promise<void>;
}

// ============================================================
// MOCK DATA (Replace with API calls)
// ============================================================

const MOCK_PROFILE: CreatorProfile = {
  id: 'creator-001',
  name: 'Demo Creator',
  email: 'demo@wembleywonders.org',
  membershipLevel: 'member',
  
  programme: {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    workshopsCompleted: 5,
    totalWorkshops: 8,
    startedAt: '2024-09-01'
  },
  
  tokens: {
    balance: 150,
    lifetimeEarned: 275,
    pendingRewards: 25
  },
  
  credentials: [
    { id: 'cred-1', type: 'programme', name: 'Trubble n Bass Explorer', issuedAt: '2024-10-15', icon: '🎵' },
    { id: 'cred-2', type: 'badge', name: 'First Sale', issuedAt: '2024-11-01', icon: '💰' }
  ],
  
  marketplace: {
    productsListed: 3,
    totalSales: 7,
    totalRevenue: 245,
    averageRating: 4.8,
    reviewCount: 5
  },
  
  community: {
    totalContributed: 61.25,
    workshopHoursFunded: 4.1
  },
  
  skills: [
    { skillId: 'beat-production', level: 3, confidence: 'medium' },
    { skillId: 'daw-basics', level: 4, confidence: 'high' },
    { skillId: 'pricing', level: 2, confidence: 'low' }
  ],
  
  activity: {
    lastActive: new Date().toISOString(),
    streakDays: 12,
    projectsCompleted: 8
  }
};

// ============================================================
// HOOK
// ============================================================

export function useCreatorProfile(creatorId?: string): UseCreatorProfileReturn {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch profile
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/creators/${creatorId}`);
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfile(MOCK_PROFILE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [creatorId]);
  
  // Initial fetch
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  // Update profile
  const updateProfile = useCallback(async (updates: Partial<CreatorProfile>) => {
    if (!profile) return;
    
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/creators/${profile.id}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify(updates)
      // });
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  }, [profile]);
  
  // Add credential
  const addCredential = useCallback(async (credential: Omit<Credential, 'id'>) => {
    if (!profile) return;
    
    const newCredential: Credential = {
      ...credential,
      id: `cred-${Date.now()}`
    };
    
    try {
      // TODO: Replace with actual API call
      setProfile(prev => prev ? {
        ...prev,
        credentials: [...prev.credentials, newCredential]
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add credential');
      throw err;
    }
  }, [profile]);
  
  // Update skill
  const updateSkill = useCallback(async (skillId: string, level: number) => {
    if (!profile) return;
    
    try {
      // TODO: Replace with actual API call
      setProfile(prev => {
        if (!prev) return null;
        
        const existingIndex = prev.skills.findIndex(s => s.skillId === skillId);
        const updatedSkills = [...prev.skills];
        
        if (existingIndex >= 0) {
          updatedSkills[existingIndex] = {
            ...updatedSkills[existingIndex],
            level: level as SkillAssessment['level'],
            lastPracticed: new Date().toISOString()
          };
        } else {
          updatedSkills.push({
            skillId,
            level: level as SkillAssessment['level'],
            confidence: 'low'
          });
        }
        
        return { ...prev, skills: updatedSkills };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skill');
      throw err;
    }
  }, [profile]);
  
  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
    addCredential,
    updateSkill
  };
}

export default useCreatorProfile;