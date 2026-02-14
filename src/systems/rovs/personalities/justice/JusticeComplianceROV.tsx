// src/systems/rovs/personalities/justice/JusticeComplianceROV.tsx
import React, { useState, useEffect } from 'react';
import { JusticeComplianceROVProps, ComplianceCheck, EthicalGuidance } from './JusticeComplianceROVTypes';

const JusticeComplianceROV: React.FC<JusticeComplianceROVProps> = ({
  userId,
  context,
  onComplianceCheck,
  onEthicalGuidance,
  onViolationDetected,
  mode = 'advisory'
}) => {
  const [currentChecks, setCurrentChecks] = useState<ComplianceCheck[]>([]);
  const [ethicalGuidance, setEthicalGuidance] = useState<EthicalGuidance[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (mode === 'monitoring') {
      startContinuousMonitoring();
    }
    return () => stopMonitoring();
  }, [mode]);

  const startContinuousMonitoring = () => {
    setIsMonitoring(true);
    // In real implementation, this would set up event listeners for governance actions
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const performComplianceCheck = (action: string, data: any = {}) => {
    const checks: ComplianceCheck[] = [];

    // CIC Compliance Checks
    if (context.type === 'cic-governance') {
      checks.push(...performCICComplianceChecks(action, data));
    }

    // Community Governance Checks
    if (context.type === 'community-governance') {
      checks.push(...performGovernanceChecks(action, data));
    }

    // Democratic Process Checks
    if (context.type === 'democratic-process') {
      checks.push(...performDemocraticChecks(action, data));
    }

    // Financial Compliance Checks
    if (context.type === 'financial') {
      checks.push(...performFinancialChecks(action, data));
    }

    setCurrentChecks(checks);

    const violations = checks.filter(check => !check.compliant);
    if (violations.length > 0 && onViolationDetected) {
      onViolationDetected(violations);
    }

    if (onComplianceCheck) {
      onComplianceCheck(checks);
    }

    return checks;
  };

  const performCICComplianceChecks = (action: string, data: any): ComplianceCheck[] => {
    const checks: ComplianceCheck[] = [];

    // Asset Lock Compliance
    if (action.includes('financial') || action.includes('payment')) {
      checks.push({
        id: `asset-lock-${Date.now()}`,
        type: 'cic-asset-lock',
        description: 'Ensuring payments comply with CIC asset lock requirements',
        compliant: data.purpose !== 'personal-benefit',
        severity: 'high',
        regulation: 'CIC Regulations 2005, Part 6',
        recommendation: data.purpose === 'personal-benefit' 
          ? 'Payments to community members must be for legitimate community services only'
          : 'Payment complies with asset lock requirements',
        timestamp: new Date()
      });
    }

    // Community Benefit Test
    if (action.includes('decision') || action.includes('policy')) {
      checks.push({
        id: `community-benefit-${Date.now()}`,
        type: 'community-benefit',
        description: 'Verifying decision serves community interest',
        compliant: data.beneficiaries === 'community' || data.beneficiaries === 'public',
        severity: 'high',
        regulation: 'CIC Community Interest Test',
        recommendation: 'All decisions must demonstrably serve community interest rather than private gain',
        timestamp: new Date()
      });
    }

    return checks;
  };

  const performGovernanceChecks = (action: string, data: any): ComplianceCheck[] => {
    const checks: ComplianceCheck[] = [];

    // Transparency Requirements
    if (action.includes('meeting') || action.includes('decision')) {
      checks.push({
        id: `transparency-${Date.now()}`,
        type: 'transparency',
        description: 'Checking governance transparency requirements',
        compliant: data.publicRecord === true && data.reasoningDocumented === true,
        severity: 'medium',
        regulation: 'Community Governance Framework',
        recommendation: 'All governance decisions must be publicly recorded with clear reasoning',
        timestamp: new Date()
      });
    }

    // Democratic Process
    if (action.includes('voting') || action.includes('proposal')) {
      checks.push({
        id: `democratic-process-${Date.now()}`,
        type: 'democratic-process',
        description: 'Validating democratic procedures',
        compliant: data.votingPeriod >= 7 && data.discussionPeriod >= 7,
        severity: 'high',
        regulation: 'Democratic Participation Framework',
        recommendation: 'Minimum 7 days required for both discussion and voting periods',
        timestamp: new Date()
      });
    }

    // Conflict of Interest
    if (action.includes('decision') && data.decisionMaker) {
      const hasConflict = checkConflictOfInterest(data.decisionMaker, data.subject);
      checks.push({
        id: `conflict-interest-${Date.now()}`,
        type: 'conflict-of-interest',
        description: 'Conflict of interest assessment',
        compliant: !hasConflict,
        severity: hasConflict ? 'high' : 'low',
        regulation: 'Ethical Governance Standards',
        recommendation: hasConflict 
          ? 'Decision maker must recuse themselves due to conflict of interest'
          : 'No conflict of interest detected',
        timestamp: new Date()
      });
    }

    return checks;
  };

  const performDemocraticChecks = (action: string, data: any): ComplianceCheck[] => {
    const checks: ComplianceCheck[] = [];

    // Quorum Requirements
    if (action.includes('vote') || action.includes('meeting')) {
      const quorumMet = data.participants >= (data.totalEligible * 0.1); // 10% quorum
      checks.push({
        id: `quorum-${Date.now()}`,
        type: 'quorum',
        description: 'Checking minimum participation requirements',
        compliant: quorumMet,
        severity: 'high',
        regulation: 'Democratic Participation Rules',
        recommendation: quorumMet 
          ? 'Quorum requirements satisfied'
          : 'Insufficient participation for valid democratic decision',
        timestamp: new Date()
      });
    }

    // Equal Access
    if (action.includes('proposal') || action.includes('vote')) {
      checks.push({
        id: `equal-access-${Date.now()}`,
        type: 'equal-access',
        description: 'Ensuring equal access to democratic processes',
        compliant: data.multilingualSupport && data.accessibilitySupport,
        severity: 'medium',
        regulation: 'Inclusive Participation Standards',
        recommendation: 'All democratic processes must support multilingual and accessibility needs',
        timestamp: new Date()
      });
    }

    return checks;
  };

  const performFinancialChecks = (action: string, data: any): ComplianceCheck[] => {
    const checks: ComplianceCheck[] = [];

    // Expenditure Authorization
    if (action.includes('expenditure') && data.amount > 500) {
      checks.push({
        id: `expenditure-auth-${Date.now()}`,
        type: 'expenditure-authorization',
        description: 'Checking expenditure authorization requirements',
        compliant: data.boardApproval === true,
        severity: 'high',
        regulation: 'Financial Governance Policy',
        recommendation: 'Expenditures over £500 require board approval',
        timestamp: new Date()
      });
    }

    // Budget Compliance
    if (action.includes('expenditure')) {
      const withinBudget = data.amount <= data.budgetAllocation;
      checks.push({
        id: `budget-compliance-${Date.now()}`,
        type: 'budget-compliance',
        description: 'Verifying expenditure is within approved budget',
        compliant: withinBudget,
        severity: 'medium',
        regulation: 'Annual Budget Framework',
        recommendation: withinBudget 
          ? 'Expenditure is within approved budget allocation'
          : 'Expenditure exceeds budget allocation - requires budget amendment',
        timestamp: new Date()
      });
    }

    return checks;
  };

  const checkConflictOfInterest = (decisionMaker: string, subject: string): boolean => {
    // Mock conflict detection - in real implementation would check against database
    const conflictScenarios = [
      'personal financial benefit',
      'family member involvement',
      'business relationship',
      'personal dispute'
    ];
    
    return conflictScenarios.some(scenario => 
      subject.toLowerCase().includes(scenario) || 
      decisionMaker.toLowerCase().includes(scenario)
    );
  };

  const provideEthicalGuidance = (situation: string) => {
    const guidance: EthicalGuidance[] = [];

    if (situation.includes('leadership')) {
      guidance.push({
        id: `leadership-ethics-${Date.now()}`,
        category: 'leadership-ethics',
        principle: 'Servant Leadership',
        guidance: 'Leadership in community governance means serving the community\'s interests, not personal advancement. Every decision should prioritize collective benefit over individual gain.',
        examples: [
          'Transparent decision-making processes',
          'Regular community consultation',
          'Accountability to membership'
        ],
        consequences: 'Leaders who prioritize personal benefit lose community trust and legitimacy',
        timestamp: new Date()
      });
    }

    if (situation.includes('conflict') || situation.includes('dispute')) {
      guidance.push({
        id: `conflict-resolution-${Date.now()}`,
        category: 'conflict-resolution',
        principle: 'Fair Process',
        guidance: 'All community conflicts must be resolved through fair, transparent processes that give all parties equal voice and opportunity for resolution.',
        examples: [
          'Mediated discussions with neutral facilitator',
          'Clear process timeline and steps',
          'Appeal mechanisms for disputed outcomes'
        ],
        consequences: 'Unfair conflict resolution damages community cohesion and trust',
        timestamp: new Date()
      });
    }

    setEthicalGuidance(guidance);

    if (onEthicalGuidance) {
      onEthicalGuidance(guidance);
    }

    return guidance;
  };

  const handleManualCheck = () => {
    const mockAction = 'governance-decision';
    const mockData = {
      purpose: 'community-benefit',
      beneficiaries: 'community',
      publicRecord: true,
      reasoningDocumented: true,
      votingPeriod: 7,
      discussionPeriod: 7
    };
    
    performComplianceCheck(mockAction, mockData);
  };

  const getComplianceScore = (): number => {
    if (currentChecks.length === 0) return 100;
    const compliantChecks = currentChecks.filter(check => check.compliant).length;
    return Math.round((compliantChecks / currentChecks.length) * 100);
  };

  return (
    <div className="justice-compliance-rov">
      <div className="rov-header">
        <div className="rov-avatar">⚖️</div>
        <div className="rov-info">
          <h3>Justice Compliance ROV</h3>
          <p>Ethical guidance and governance compliance</p>
        </div>
        <div className="compliance-score">
          <span className="score-label">Compliance Score</span>
          <span className={`score-value ${getComplianceScore() >= 80 ? 'good' : 'warning'}`}>
            {getComplianceScore()}%
          </span>
        </div>
      </div>

      <div className="monitoring-status">
        {isMonitoring ? (
          <div className="monitoring-active">
            <span className="status-indicator">👁️</span>
            <span>Actively monitoring governance actions</span>
          </div>
        ) : (
          <div className="monitoring-inactive">
            <span className="status-indicator">⏸️</span>
            <span>Advisory mode - manual checks available</span>
          </div>
        )}
      </div>

      {alerts.length > 0 && (
        <div className="compliance-alerts">
          <h4>⚠️ Compliance Alerts</h4>
          {alerts.map((alert, index) => (
            <div key={index} className="alert-item">
              {alert}
            </div>
          ))}
        </div>
      )}

      {!isMonitoring && (
        <div className="manual-controls">
          <button 
            className="compliance-check-btn"
            onClick={handleManualCheck}
          >
            Run Compliance Check
          </button>
          <button 
            className="ethics-guidance-btn"
            onClick={() => provideEthicalGuidance('leadership')}
          >
            Get Ethical Guidance
          </button>
        </div>
      )}

      {currentChecks.length > 0 && (
        <div className="compliance-results">
          <h4>Compliance Check Results</h4>
          <div className="checks-list">
            {currentChecks.map((check) => (
              <div 
                key={check.id} 
                className={`check-item ${check.compliant ? 'compliant' : 'non-compliant'}`}
              >
                <div className="check-header">
                  <span className="check-status">
                    {check.compliant ? '✅' : '❌'}
                  </span>
                  <span className="check-type">{check.type}</span>
                  <span className={`check-severity ${check.severity}`}>
                    {check.severity}
                  </span>
                </div>
                <div className="check-description">{check.description}</div>
                <div className="check-regulation">{check.regulation}</div>
                <div className="check-recommendation">{check.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ethicalGuidance.length > 0 && (
        <div className="ethical-guidance">
          <h4>Ethical Guidance</h4>
          <div className="guidance-list">
            {ethicalGuidance.map((guidance) => (
              <div key={guidance.id} className="guidance-item">
                <div className="guidance-header">
                  <span className="guidance-principle">{guidance.principle}</span>
                  <span className="guidance-category">{guidance.category}</span>
                </div>
                <div className="guidance-text">{guidance.guidance}</div>
                {guidance.examples && guidance.examples.length > 0 && (
                  <div className="guidance-examples">
                    <strong>Examples:</strong>
                    <ul>
                      {guidance.examples.map((example: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="guidance-consequences">
                  <strong>Potential consequences:</strong> {guidance.consequences}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rov-footer">
        <div className="legal-notice">
          <small>
            This ROV provides guidance based on CIC regulations and community governance best practices. 
            For complex legal matters, consult qualified legal counsel.
          </small>
        </div>
      </div>
    </div>
  );
};

export default JusticeComplianceROV;