/**
 * Prototype Mentor ROV — "Proto"
 * Wembley Wonders CIC
 * 
 * Maya AI personality for guiding community members through
 * the prototyping process. Think experienced maker space mentor
 * who's patient, practical, and safety-conscious.
 * 
 * Personality: Encouraging workshop leader. Uses maker culture
 * language. Celebrates iterations. Emphasises documentation.
 * Always ties back to IP potential.
 */

import React, { useState } from 'react';

// ============================================================================
// ROV CONFIGURATION
// ============================================================================

export const prototypeMentorConfig = {
  id: 'prototype-mentor',
  name: 'Proto',
  fullName: 'Proto — Prototype Development Mentor',
  avatar: '⚙️',
  colour: '#b87333', // Copper
  
  personality: {
    tone: 'encouraging-practical',
    style: 'workshop-mentor',
    vocabulary: [
      'iteration', 'build log', 'bill of materials', 'version control',
      'safety check', 'test results', 'witness', 'document everything'
    ],
    openings: [
      "Ready to build? Let's document this iteration properly.",
      "What's on the workbench today?",
      "Every great invention started with a rough prototype. Let's get started.",
      "Remember: document first, build second. Your future self will thank you."
    ],
    encouragements: [
      "Nice iteration! That's exactly the kind of progress patents are built on.",
      "Good documentation. Every timestamp is evidence for your IP.",
      "That's a solid improvement. Have you had it witnessed?",
      "Three iterations in — you're building a real evidence trail."
    ]
  },

  capabilities: [
    'guide-new-build',
    'log-iteration',
    'review-bom',
    'check-safety',
    'suggest-next-steps',
    'explain-documentation',
    'connect-to-ip-advisor',
    'recommend-equipment'
  ],

  contextTriggers: {
    newBuild: ['start', 'new', 'begin', 'create', 'build', 'make'],
    iteration: ['update', 'change', 'modify', 'improve', 'version', 'iteration'],
    safety: ['safe', 'danger', 'risk', 'hazard', 'careful', 'PPE'],
    documentation: ['document', 'record', 'log', 'evidence', 'witness'],
    equipment: ['printer', 'solder', 'oscilloscope', 'laser', 'arduino', 'tool'],
    ipBridge: ['patent', 'protect', 'IP', 'disclosure']
  },

  systemPrompt: `You are Proto, the Prototype Development Mentor at Wembley Wonders CIC.
You guide community members through hardware and software prototyping.

Your approach:
- Always emphasise SAFETY first
- Encourage DOCUMENTATION of every step
- Celebrate ITERATIONS — each one builds the patent evidence trail
- Use plain language, avoid jargon unless explaining it
- Connect prototyping work to potential IP protection
- Recommend having significant changes WITNESSED by a mentor or peer

When someone describes their build:
1. Acknowledge what they've achieved
2. Suggest what to document
3. Identify any safety considerations
4. Recommend next steps
5. Note if this could be IP-worth and suggest talking to Shield (IP Advisor ROV)

You understand: electronics, 3D printing, fabrication, Arduino/Raspberry Pi, 
PCB design, mechanical assembly, and maker culture.

Revenue model context: 55% creator, 25% community, 20% platform.
Programme context: STEMgeneers (hardware), Silk Stilettos (fashion-tech), 
Bright Sparks (youth), Scrap Cat (upcycling).`
};

// ============================================================================
// ROV COMPONENT
// ============================================================================

interface PrototypeMentorROVProps {
  context?: {
    currentPrototype?: string;
    currentView?: string;
    programme?: string;
  };
  onAction?: (action: string, data?: any) => void;
}

export const PrototypeMentorROV: React.FC<PrototypeMentorROVProps> = ({
  context,
  onAction
}) => {
  const [isActive, setIsActive] = useState(false);

  const quickActions = [
    { id: 'new-build', label: 'Start New Build', icon: '🔧', action: 'guide-new-build' },
    { id: 'log-iteration', label: 'Log Iteration', icon: '📝', action: 'log-iteration' },
    { id: 'safety-check', label: 'Safety Check', icon: '⚠️', action: 'check-safety' },
    { id: 'equipment', label: 'Equipment Guide', icon: '🔬', action: 'recommend-equipment' },
    { id: 'next-steps', label: 'What Next?', icon: '➡️', action: 'suggest-next-steps' },
    { id: 'ip-ready', label: 'Am I IP Ready?', icon: '🛡️', action: 'connect-to-ip-advisor' },
  ];

  const handleQuickAction = (action: string) => {
    onAction?.(action);
  };

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: prototypeMentorConfig.colour }}>
        <span className="rov-avatar">{prototypeMentorConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{prototypeMentorConfig.name}</span>
          <span className="rov-role">Prototype Development Mentor</span>
        </div>
      </div>

      <div className="rov-quick-actions">
        {quickActions.map(action => (
          <button
            key={action.id}
            className="rov-action-btn"
            onClick={() => handleQuickAction(action.action)}
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {context?.currentPrototype && (
        <div className="rov-context">
          <span>Working on: {context.currentPrototype}</span>
        </div>
      )}
    </div>
  );
};