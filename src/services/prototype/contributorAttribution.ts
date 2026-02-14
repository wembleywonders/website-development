/**
 * Contributor Attribution Service
 * Wembley Wonders CIC
 * 
 * Manages contributor tracking, verification, and revenue splits.
 * Ensures fair attribution for collaborative prototypes.
 */

// ============================================================================
// TYPES
// ============================================================================

export type ContributorRole = 
  | 'creator'
  | 'co-creator'
  | 'contributor'
  | 'advisor'
  | 'mentor'
  | 'technical-support'
  | 'investor';

export interface Contributor {
  id: string;
  userId: string;
  name: string;
  email?: string;
  role: ContributorRole;
  percentage: number;
  contributions: Contribution[];
  status: 'pending' | 'verified' | 'disputed';
  joinedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Contribution {
  id: string;
  type: 'code' | 'design' | 'idea' | 'testing' | 'documentation' | 'funding' | 'mentoring';
  description: string;
  date: string;
  verified: boolean;
  evidence?: string;
}

export interface Attribution {
  prototypeId: string;
  contributors: Contributor[];
  totalPercentage: number;
  isValid: boolean;
  lastUpdated: string;
  disputes: AttributionDispute[];
}

export interface AttributionDispute {
  id: string;
  raisedBy: string;
  against: string;
  reason: string;
  status: 'open' | 'under-review' | 'resolved' | 'rejected';
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ROLE_MIN_PERCENTAGE: Record<ContributorRole, number> = {
  'creator': 30,
  'co-creator': 20,
  'contributor': 5,
  'advisor': 2,
  'mentor': 2,
  'technical-support': 5,
  'investor': 0
};

const ROLE_MAX_PERCENTAGE: Record<ContributorRole, number> = {
  'creator': 100,
  'co-creator': 50,
  'contributor': 25,
  'advisor': 15,
  'mentor': 15,
  'technical-support': 20,
  'investor': 40
};

// ============================================================================
// SERVICE CLASS
// ============================================================================

class ContributorAttributionService {
  private attributions: Map<string, Attribution> = new Map();

  /**
   * Initialize attribution for a new prototype
   */
  initializeAttribution(prototypeId: string, creatorId: string, creatorName: string): Attribution {
    const attribution: Attribution = {
      prototypeId,
      contributors: [{
        id: `contrib-${Date.now()}`,
        userId: creatorId,
        name: creatorName,
        role: 'creator',
        percentage: 100,
        contributions: [{
          id: `contrib-${Date.now()}-init`,
          type: 'idea',
          description: 'Initial prototype creation',
          date: new Date().toISOString(),
          verified: true
        }],
        status: 'verified',
        joinedAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString()
      }],
      totalPercentage: 100,
      isValid: true,
      lastUpdated: new Date().toISOString(),
      disputes: []
    };

    this.attributions.set(prototypeId, attribution);
    return attribution;
  }

  /**
   * Get attribution for a prototype
   */
  getAttribution(prototypeId: string): Attribution | null {
    return this.attributions.get(prototypeId) || null;
  }

  /**
   * Add a new contributor
   */
  addContributor(
    prototypeId: string,
    userId: string,
    name: string,
    role: ContributorRole,
    percentage: number
  ): { success: boolean; error?: string; contributor?: Contributor } {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) {
      return { success: false, error: 'Attribution not found' };
    }

    // Validate percentage
    const validation = this.validatePercentage(role, percentage);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Check if total would exceed 100%
    const newTotal = attribution.totalPercentage + percentage;
    if (newTotal > 100) {
      return { success: false, error: `Would exceed 100% (current: ${attribution.totalPercentage}%)` };
    }

    // Check for existing contributor
    if (attribution.contributors.some(c => c.userId === userId)) {
      return { success: false, error: 'User is already a contributor' };
    }

    const contributor: Contributor = {
      id: `contrib-${Date.now()}`,
      userId,
      name,
      role,
      percentage,
      contributions: [],
      status: 'pending',
      joinedAt: new Date().toISOString()
    };

    attribution.contributors.push(contributor);
    attribution.totalPercentage = newTotal;
    attribution.isValid = newTotal === 100;
    attribution.lastUpdated = new Date().toISOString();

    // Adjust creator percentage if needed
    this.rebalanceIfNeeded(attribution, percentage);

    console.log('[Attribution] Added contributor:', name, `${percentage}%`);
    return { success: true, contributor };
  }

  /**
   * Update contributor percentage
   */
  updateContributorPercentage(
    prototypeId: string,
    contributorId: string,
    newPercentage: number
  ): { success: boolean; error?: string } {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) {
      return { success: false, error: 'Attribution not found' };
    }

    const contributor = attribution.contributors.find(c => c.id === contributorId);
    if (!contributor) {
      return { success: false, error: 'Contributor not found' };
    }

    const validation = this.validatePercentage(contributor.role, newPercentage);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const diff = newPercentage - contributor.percentage;
    const newTotal = attribution.totalPercentage + diff;
    
    if (newTotal > 100) {
      return { success: false, error: 'Would exceed 100%' };
    }

    contributor.percentage = newPercentage;
    attribution.totalPercentage = newTotal;
    attribution.isValid = newTotal === 100;
    attribution.lastUpdated = new Date().toISOString();

    return { success: true };
  }

  /**
   * Verify a contributor
   */
  verifyContributor(
    prototypeId: string,
    contributorId: string,
    verifiedBy: string
  ): boolean {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) return false;

    const contributor = attribution.contributors.find(c => c.id === contributorId);
    if (!contributor) return false;

    contributor.status = 'verified';
    contributor.verifiedAt = new Date().toISOString();
    contributor.verifiedBy = verifiedBy;
    attribution.lastUpdated = new Date().toISOString();

    console.log('[Attribution] Verified:', contributor.name);
    return true;
  }

  /**
   * Add a contribution record
   */
  addContribution(
    prototypeId: string,
    contributorId: string,
    contribution: Omit<Contribution, 'id' | 'verified'>
  ): boolean {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) return false;

    const contributor = attribution.contributors.find(c => c.id === contributorId);
    if (!contributor) return false;

    contributor.contributions.push({
      ...contribution,
      id: `contrib-${Date.now()}`,
      verified: false
    });

    attribution.lastUpdated = new Date().toISOString();
    return true;
  }

  /**
   * Raise a dispute
   */
  raiseDispute(
    prototypeId: string,
    raisedBy: string,
    against: string,
    reason: string
  ): AttributionDispute | null {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) return null;

    const dispute: AttributionDispute = {
      id: `dispute-${Date.now()}`,
      raisedBy,
      against,
      reason,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    attribution.disputes.push(dispute);
    attribution.lastUpdated = new Date().toISOString();

    // Mark disputed contributor
    const contributor = attribution.contributors.find(c => c.userId === against);
    if (contributor) {
      contributor.status = 'disputed';
    }

    console.log('[Attribution] Dispute raised:', dispute.id);
    return dispute;
  }

  /**
   * Resolve a dispute
   */
  resolveDispute(
    prototypeId: string,
    disputeId: string,
    resolution: string,
    status: 'resolved' | 'rejected'
  ): boolean {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) return false;

    const dispute = attribution.disputes.find(d => d.id === disputeId);
    if (!dispute) return false;

    dispute.status = status;
    dispute.resolution = resolution;
    dispute.resolvedAt = new Date().toISOString();

    // Update contributor status if resolved
    if (status === 'resolved') {
      const contributor = attribution.contributors.find(c => c.userId === dispute.against);
      if (contributor) {
        contributor.status = 'verified';
      }
    }

    attribution.lastUpdated = new Date().toISOString();
    return true;
  }

  /**
   * Calculate revenue split based on attribution
   */
  calculateRevenueSplit(prototypeId: string, totalRevenue: number): Map<string, number> {
    const splits = new Map<string, number>();
    const attribution = this.attributions.get(prototypeId);
    
    if (!attribution) return splits;

    for (const contributor of attribution.contributors) {
      if (contributor.status === 'verified') {
        const share = (totalRevenue * contributor.percentage) / 100;
        splits.set(contributor.userId, Math.round(share * 100) / 100);
      }
    }

    return splits;
  }

  /**
   * Get all verified contributors
   */
  getVerifiedContributors(prototypeId: string): Contributor[] {
    const attribution = this.attributions.get(prototypeId);
    if (!attribution) return [];
    return attribution.contributors.filter(c => c.status === 'verified');
  }

  // ============================================================================
  // PRIVATE HELPERS
  // ============================================================================

  private validatePercentage(role: ContributorRole, percentage: number): { valid: boolean; error?: string } {
    const min = ROLE_MIN_PERCENTAGE[role];
    const max = ROLE_MAX_PERCENTAGE[role];

    if (percentage < min) {
      return { valid: false, error: `${role} must have at least ${min}%` };
    }
    if (percentage > max) {
      return { valid: false, error: `${role} cannot exceed ${max}%` };
    }
    return { valid: true };
  }

  private rebalanceIfNeeded(attribution: Attribution, addedPercentage: number): void {
    const creator = attribution.contributors.find(c => c.role === 'creator');
    if (creator && creator.percentage > ROLE_MIN_PERCENTAGE.creator) {
      const newCreatorPercentage = creator.percentage - addedPercentage;
      if (newCreatorPercentage >= ROLE_MIN_PERCENTAGE.creator) {
        creator.percentage = newCreatorPercentage;
      }
    }
  }
}

// ============================================================================
// SINGLETON EXPORT
// ============================================================================

export const contributorAttributionService = new ContributorAttributionService();
export default contributorAttributionService;
