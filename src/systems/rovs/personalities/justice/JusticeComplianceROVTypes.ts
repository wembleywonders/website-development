// src/systems/rovs/personalities/justice/JusticeComplianceROVTypes.ts

export type ComplianceType = 
  | 'cic-asset-lock'
  | 'community-benefit'
  | 'transparency'
  | 'democratic-process'
  | 'conflict-of-interest'
  | 'quorum'
  | 'equal-access'
  | 'expenditure-authorization'
  | 'budget-compliance'
  | 'data-protection'
  | 'financial-reporting';

export type ComplianceSeverity = 'low' | 'medium' | 'high' | 'critical';

export type EthicalCategory = 
  | 'leadership-ethics'
  | 'conflict-resolution'
  | 'transparency'
  | 'fairness'
  | 'accountability'
  | 'inclusivity'
  | 'sustainability';

export type MonitoringMode = 'advisory' | 'monitoring' | 'enforcement';

export interface ComplianceCheck {
  id: string;
  type: ComplianceType;
  description: string;
  compliant: boolean;
  severity: ComplianceSeverity;
  regulation: string;
  recommendation: string;
  timestamp: Date;
  evidence?: string[];
  remediation?: {
    steps: string[];
    deadline?: Date;
    responsible?: string;
  };
}

export interface EthicalGuidance {
  id: string;
  category: EthicalCategory;
  principle: string;
  guidance: string;
  examples?: string[];
  consequences: string;
  relevantCases?: string[];
  timestamp: Date;
}

export interface GovernanceContext {
  type: 'cic-governance' | 'community-governance' | 'democratic-process' | 'financial' | 'operational';
  stakeholders: string[];
  decisionLevel: 'individual' | 'committee' | 'board' | 'community';
  impactScope: 'local' | 'community-wide' | 'external';
  timeConstraints?: {
    urgent: boolean;
    deadline?: Date;
  };
}

export interface JusticeComplianceROVProps {
  userId: string;
  context: GovernanceContext;
  mode?: MonitoringMode;
  onComplianceCheck?: (checks: ComplianceCheck[]) => void;
  onEthicalGuidance?: (guidance: EthicalGuidance[]) => void;
  onViolationDetected?: (violations: ComplianceCheck[]) => void;
  realTimeMonitoring?: boolean;
  alertThreshold?: ComplianceSeverity;
}

export interface ComplianceReport {
  id: string;
  userId: string;
  context: GovernanceContext;
  generatedAt: Date;
  overallScore: number;
  checks: ComplianceCheck[];
  violations: ComplianceCheck[];
  recommendations: string[];
  nextReviewDate: Date;
  signedOff?: {
    by: string;
    date: Date;
    notes?: string;
  };
}

export interface LegalFramework {
  jurisdiction: 'UK' | 'England' | 'Local';
  applicableLaws: Array<{
    name: string;
    reference: string;
    relevantSections: string[];
    complianceRequirements: string[];
  }>;
  regulatoryBodies: Array<{
    name: string;
    authority: string;
    reportingRequirements: string[];
  }>;
  penalties: Array<{
    violationType: ComplianceType;
    consequences: string[];
    severity: ComplianceSeverity;
  }>;
}

export interface AuditTrail {
  id: string;
  action: string;
  actor: string;
  timestamp: Date;
  context: Record<string, any>;
  complianceChecked: boolean;
  approvals: Array<{
    approver: string;
    timestamp: Date;
    notes?: string;
  }>;
  modifications: Array<{
    field: string;
    oldValue: any;
    newValue: any;
    reason: string;
    timestamp: Date;
  }>;
}

export interface RiskAssessment {
  id: string;
  scenario: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-1
  impact: number; // 0-1
  mitigationStrategies: string[];
  residualRisk: number; // 0-1 after mitigation
  reviewDate: Date;
  responsible: string;
}