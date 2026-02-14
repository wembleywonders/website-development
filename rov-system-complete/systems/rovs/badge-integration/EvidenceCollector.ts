// src/systems/rovs/badge-integration/EvidenceCollector.ts
// Collects and organizes evidence for badge assessment

export interface Evidence {
  id: string;
  learnerId: string;
  badgeId: string;
  criterionRef: string;
  type: 'document' | 'photo' | 'video' | 'audio' | 'observation' | 'testimony';
  title: string;
  description: string;
  fileRef?: string;
  rovSource: string;
  collectedAt: Date;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
}

export interface EvidencePortfolio {
  learnerId: string;
  badgeId: string;
  evidenceItems: Evidence[];
  criteriaMetCount: number;
  criteriaTotalCount: number;
  completionPercentage: number;
  lastUpdated: Date;
  readyForAssessment: boolean;
}

export class EvidenceCollector {
  private evidence: Map<string, Evidence[]>;

  constructor() {
    this.evidence = new Map();
  }

  /**
   * Collect a piece of evidence
   */
  collect(
    learnerId: string,
    badgeId: string,
    criterionRef: string,
    type: Evidence['type'],
    title: string,
    description: string,
    rovSource: string,
    fileRef?: string
  ): Evidence {
    const item: Evidence = {
      id: `evidence-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      learnerId,
      badgeId,
      criterionRef,
      type,
      title,
      description,
      fileRef,
      rovSource,
      collectedAt: new Date(),
      verified: false
    };

    const key = `${learnerId}-${badgeId}`;
    const existing = this.evidence.get(key) || [];
    existing.push(item);
    this.evidence.set(key, existing);

    return item;
  }

  /**
   * Get evidence for a badge
   */
  getEvidence(learnerId: string, badgeId: string): Evidence[] {
    const key = `${learnerId}-${badgeId}`;
    return this.evidence.get(key) || [];
  }

  /**
   * Get evidence portfolio
   */
  getPortfolio(learnerId: string, badgeId: string, totalCriteria: number): EvidencePortfolio {
    const items = this.getEvidence(learnerId, badgeId);
    const criteriaRefs = new Set(items.map(e => e.criterionRef));
    
    return {
      learnerId,
      badgeId,
      evidenceItems: items,
      criteriaMetCount: criteriaRefs.size,
      criteriaTotalCount: totalCriteria,
      completionPercentage: Math.round((criteriaRefs.size / totalCriteria) * 100),
      lastUpdated: items.length > 0 
        ? new Date(Math.max(...items.map(e => e.collectedAt.getTime())))
        : new Date(),
      readyForAssessment: criteriaRefs.size >= totalCriteria
    };
  }

  /**
   * Verify a piece of evidence
   */
  verify(evidenceId: string, verifierId: string): boolean {
    for (const items of this.evidence.values()) {
      const item = items.find(e => e.id === evidenceId);
      if (item) {
        item.verified = true;
        item.verifiedBy = verifierId;
        item.verifiedAt = new Date();
        return true;
      }
    }
    return false;
  }

  /**
   * Get evidence by criterion
   */
  getEvidenceByCriterion(learnerId: string, badgeId: string, criterionRef: string): Evidence[] {
    return this.getEvidence(learnerId, badgeId)
      .filter(e => e.criterionRef === criterionRef);
  }

  /**
   * Check if criterion has evidence
   */
  hasCriterionEvidence(learnerId: string, badgeId: string, criterionRef: string): boolean {
    return this.getEvidenceByCriterion(learnerId, badgeId, criterionRef).length > 0;
  }

  /**
   * Get missing criteria
   */
  getMissingCriteria(learnerId: string, badgeId: string, allCriteria: string[]): string[] {
    const items = this.getEvidence(learnerId, badgeId);
    const coveredCriteria = new Set(items.map(e => e.criterionRef));
    return allCriteria.filter(c => !coveredCriteria.has(c));
  }
}

export default EvidenceCollector;
