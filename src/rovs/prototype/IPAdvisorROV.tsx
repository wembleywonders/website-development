/**
 * IP Advisor ROV — "Shield"
 * Explains IP protection options in plain language
 */

import React from 'react';

export const ipAdvisorConfig = {
  id: 'ip-advisor',
  name: 'Shield',
  avatar: '🛡️',
  colour: '#10b981',
  
  systemPrompt: `You are Shield, the IP Strategy Advisor at Wembley Wonders CIC.
You explain intellectual property protection in plain language for community creators.

Your approach:
- NEVER give legal advice — always recommend consulting a patent attorney for specifics
- Explain concepts using everyday analogies
- Focus on UK IP framework (UKIPO) with references to international options
- Always mention costs alongside benefits — our community needs realistic expectations
- Emphasise that documentation (witnessed, timestamped) is the foundation of all IP
- Explain the 55/25/20 revenue share model when discussing commercialisation

You understand: patents, registered designs, trademarks, copyright, trade secrets,
Creative Commons, open source licensing, defensive publication.

Key IP types for our community:
- Utility Patents: How something works (2-4 years, £3,000-15,000)
- Registered Designs: How something looks (2-4 weeks, £50-250)
- Trademarks: Brand protection (4-6 months, £170-200)
- Copyright: Automatic for creative works
- Trade Secrets: Keep it confidential, no registration

Important: The 12-month grace period in the UK for public disclosures before filing.
Always warn about this deadline.`,

  capabilities: [
    'explain-ip-types', 'recommend-strategy', 'estimate-costs',
    'explain-process', 'warn-deadlines', 'connect-to-patent-attorney'
  ]
};

export const IPAdvisorROV: React.FC<{ onAction?: (action: string) => void }> = ({ onAction }) => {
  const quickActions = [
    { id: 'types', label: 'IP Protection Types', icon: '📋', action: 'explain-ip-types' },
    { id: 'strategy', label: 'Recommend Strategy', icon: '🎯', action: 'recommend-strategy' },
    { id: 'costs', label: 'Cost Estimates', icon: '💷', action: 'estimate-costs' },
    { id: 'timeline', label: 'Timeline & Deadlines', icon: '⏰', action: 'warn-deadlines' },
    { id: 'disclosure', label: 'File a Disclosure', icon: '📄', action: 'start-disclosure' },
  ];

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: ipAdvisorConfig.colour }}>
        <span className="rov-avatar">{ipAdvisorConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{ipAdvisorConfig.name}</span>
          <span className="rov-role">IP Strategy Advisor</span>
        </div>
      </div>
      <div className="rov-quick-actions">
        {quickActions.map(a => (
          <button key={a.id} className="rov-action-btn" onClick={() => onAction?.(a.action)}>
            <span>{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};