/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaCrisisIntegration - Crisis and Support Response Component
 * 
 * Handles crisis detection, support routing, and emergency escalation.
 * Integrates with the Children of Anansi framework for appropriate responses.
 * 
 * Key children for crisis:
 * - Maya (👩🏿‍🦱) - Primary emotional support, triage
 * - Akua (📜) - Safeguarding, rights protection, DBS protocols
 * - Nyame (⚖️) - Ethical considerations
 * - Osei (✊) - Community resources, mutual aid
 * 
 * Crisis levels:
 * - normal: Standard interaction
 * - support: Elevated attention, gentle check-ins
 * - crisis: Immediate response, resource provision
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  useMayaStore,
  useMayaROV,
  useMayaMode,
  useMayaPreferences,
  useMayaTracking,
  useMayaOpenLoops
} from '../maya/stores/mayaStore';
import type { ActiveChild, MayaMode } from '../maya/types/mayaTypes';
import MayaAvatar from '../features/workspace/components/MayaAssistant/MayaAvatar';

// ============================================
// TYPES
// ============================================

type CrisisLevel = 'normal' | 'support' | 'crisis';

interface MayaCrisisIntegrationProps {
  /** Current language for localization */
  currentLanguage?: string;
  /** Current crisis level */
  crisisLevel?: CrisisLevel;
  /** User's community for local resources */
  userCommunity?: string;
  /** Callback when crisis level changes */
  onCrisisLevelChange?: (level: CrisisLevel) => void;
  /** Callback when emergency escalation is triggered */
  onEmergencyEscalation?: () => void;
  /** Additional CSS class */
  className?: string;
}

interface CrisisResource {
  name: string;
  type: 'hotline' | 'website' | 'local' | 'community';
  contact: string;
  description: string;
  available: string;
  priority: number;
}

interface SupportPathway {
  id: string;
  name: string;
  description: string;
  childGuide: ActiveChild;
  crisisLevels: CrisisLevel[];
  resources: CrisisResource[];
}

// ============================================
// CRISIS RESOURCES
// ============================================

const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: 'Samaritans',
    type: 'hotline',
    contact: '116 123',
    description: 'Free 24/7 emotional support',
    available: '24/7',
    priority: 1
  },
  {
    name: 'Crisis Text Line',
    type: 'hotline',
    contact: 'Text SHOUT to 85258',
    description: 'Free text support',
    available: '24/7',
    priority: 2
  },
  {
    name: 'Childline',
    type: 'hotline',
    contact: '0800 1111',
    description: 'Support for under 19s',
    available: '24/7',
    priority: 1
  },
  {
    name: 'Mind',
    type: 'website',
    contact: 'mind.org.uk',
    description: 'Mental health information and support',
    available: 'Website always available',
    priority: 3
  },
  {
    name: 'Brent Mental Health Services',
    type: 'local',
    contact: '020 8937 4000',
    description: 'Local NHS mental health support',
    available: 'Mon-Fri 9am-5pm',
    priority: 2
  },
  {
    name: 'Wembley Wonders Community Support',
    type: 'community',
    contact: 'admin@wembleywonders.org',
    description: 'Community peer support network',
    available: 'Response within 24 hours',
    priority: 3
  }
];

// ============================================
// SUPPORT PATHWAYS
// ============================================

const SUPPORT_PATHWAYS: SupportPathway[] = [
  {
    id: 'emotional-support',
    name: 'Emotional Support',
    description: "I'm here to listen. Sometimes we just need someone to talk to.",
    childGuide: 'maya',
    crisisLevels: ['normal', 'support', 'crisis'],
    resources: CRISIS_RESOURCES.filter(r => r.type === 'hotline')
  },
  {
    id: 'safeguarding',
    name: 'Safeguarding & Protection',
    description: 'If you or someone you know is at risk, we can help connect you with protection services.',
    childGuide: 'akua',
    crisisLevels: ['support', 'crisis'],
    resources: CRISIS_RESOURCES.filter(r => r.priority <= 2)
  },
  {
    id: 'community-connection',
    name: 'Community Connection',
    description: 'Connect with others in your community who understand what you\'re going through.',
    childGuide: 'osei',
    crisisLevels: ['normal', 'support'],
    resources: CRISIS_RESOURCES.filter(r => r.type === 'community' || r.type === 'local')
  },
  {
    id: 'rights-advocacy',
    name: 'Know Your Rights',
    description: 'Understand your rights and get support navigating systems.',
    childGuide: 'akua',
    crisisLevels: ['normal', 'support'],
    resources: []
  },
  {
    id: 'practical-support',
    name: 'Practical Help',
    description: 'Help with immediate practical needs - housing, food, benefits.',
    childGuide: 'osei',
    crisisLevels: ['support', 'crisis'],
    resources: CRISIS_RESOURCES.filter(r => r.type === 'local')
  }
];

// ============================================
// CHILD INFO FOR CRISIS CONTEXTS
// ============================================

interface CrisisChildInfo {
  name: string;
  emoji: string;
  crisisRole: string;
  color: string;
}

const CRISIS_CHILD_INFO: Record<ActiveChild, CrisisChildInfo> = {
  maya: {
    name: 'Maya',
    emoji: '👩🏿‍🦱',
    crisisRole: 'Emotional support and triage',
    color: '#8B4513'
  },
  akua: {
    name: 'Akua',
    emoji: '📜',
    crisisRole: 'Safeguarding and rights protection',
    color: '#303F9F'
  },
  nyame: {
    name: 'Nyame',
    emoji: '⚖️',
    crisisRole: 'Ethical guidance',
    color: '#512DA8'
  },
  osei: {
    name: 'Osei',
    emoji: '✊',
    crisisRole: 'Community resources and mutual aid',
    color: '#E64A19'
  },
  // Other children (less involved in crisis but available)
  kweku: { name: 'Kweku', emoji: '🎯', crisisRole: 'Practical planning', color: '#D32F2F' },
  ntikuma: { name: 'Ntikuma', emoji: '📊', crisisRole: 'Benefits navigation', color: '#1976D2' },
  anansewa: { name: 'Anansewa', emoji: '🎭', crisisRole: 'Expression support', color: '#7B1FA2' },
  kofi: { name: 'Kofi', emoji: '🔧', crisisRole: 'Practical solutions', color: '#388E3C' },
  afua: { name: 'Afua', emoji: '🎙️', crisisRole: 'Voice and story', color: '#F57C00' },
  yaw: { name: 'Yaw', emoji: '📝', crisisRole: 'Documentation help', color: '#455A64' },
  esi: { name: 'Esi', emoji: '📚', crisisRole: 'Heritage connection', color: '#5D4037' },
  kumi: { name: 'Kumi', emoji: '🎮', crisisRole: 'Distraction and play', color: '#00796B' },
  adaeze: { name: 'Adaeze', emoji: '✂️', crisisRole: 'Creative expression', color: '#C2185B' }
};

// ============================================
// COMPONENT
// ============================================

const MayaCrisisIntegration: React.FC<MayaCrisisIntegrationProps> = ({
  currentLanguage = 'en',
  crisisLevel: externalCrisisLevel,
  userCommunity = 'Wembley',
  onCrisisLevelChange,
  onEmergencyEscalation,
  className = ''
}) => {
  // === Store Hooks ===
  const { 
    activeEntity, 
    setActiveEntity, 
    routeToChild 
  } = useMayaROV();
  const mayaMode = useMayaMode();
  const { preferences } = useMayaPreferences();
  const { trackAction } = useMayaTracking();
  const { openLoop, closeLoop } = useMayaOpenLoops();

  // === Local State ===
  const [crisisLevel, setCrisisLevel] = useState<CrisisLevel>(externalCrisisLevel || 'normal');
  const [selectedPathway, setSelectedPathway] = useState<SupportPathway | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [showPathwaySelector, setShowPathwaySelector] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState<string | null>(null);

  // === Sync external crisis level ===
  useEffect(() => {
    if (externalCrisisLevel && externalCrisisLevel !== crisisLevel) {
      setCrisisLevel(externalCrisisLevel);
    }
  }, [externalCrisisLevel]);

  // === Auto-show pathways in elevated states ===
  useEffect(() => {
    if (crisisLevel !== 'normal') {
      setShowPathwaySelector(true);
      // Route to Maya for initial triage
      if (activeEntity !== 'maya') {
        routeToChild('maya', 'FULL', 'Crisis support needed');
      }
    }
  }, [crisisLevel, activeEntity, routeToChild]);

  // === Get available pathways for current crisis level ===
  const availablePathways = SUPPORT_PATHWAYS.filter(
    p => p.crisisLevels.includes(crisisLevel)
  );

  // === Get prioritized resources ===
  const getPrioritizedResources = useCallback((): CrisisResource[] => {
    let resources = [...CRISIS_RESOURCES];
    
    // In crisis, prioritize hotlines
    if (crisisLevel === 'crisis') {
      resources = resources.sort((a, b) => a.priority - b.priority);
    }
    
    // Add community resources if we know the community
    if (userCommunity) {
      // Could fetch community-specific resources here
    }
    
    return resources;
  }, [crisisLevel, userCommunity]);

  // === Handle pathway selection ===
  const handlePathwaySelect = useCallback((pathway: SupportPathway) => {
    setSelectedPathway(pathway);
    trackAction('direction_action');
    
    // Route to the appropriate child
    routeToChild(pathway.childGuide, 'FULL', `Selected ${pathway.name} pathway`);
    
    // Open a loop for this support session
    openLoop(
      pathway.childGuide,
      crisisLevel === 'crisis' ? 'high' : 'medium',
      `Crisis level: ${crisisLevel}`
    );
    
    // Set acknowledgement
    const childInfo = CRISIS_CHILD_INFO[pathway.childGuide];
    setAcknowledgement(
      `${childInfo.emoji} ${childInfo.name} is here to help with ${pathway.name.toLowerCase()}.`
    );
    
    // Show resources for this pathway
    if (pathway.resources.length > 0) {
      setShowResources(true);
    }
    
    setShowPathwaySelector(false);
  }, [crisisLevel, routeToChild, trackAction, openLoop]);

  // === Handle emergency escalation ===
  const handleEmergencyEscalation = useCallback(() => {
    trackAction('direction_action');
    setCrisisLevel('crisis');
    onCrisisLevelChange?.('crisis');
    onEmergencyEscalation?.();
    
    // Route to Akua for safeguarding
    routeToChild('akua', 'FULL', 'Emergency escalation');
    
    // Set mode to ensure full attention
    // setMode is not available; if you need to change mode, update mayaMode.currentMode or use another available method
    // mayaMode.currentMode = 'ACTIVE'; // Uncomment if direct assignment is supported
    
    // Show resources immediately
    setShowResources(true);
    
    setAcknowledgement(
      "📜 Akua is here. Your safety is the priority. Here are immediate support resources."
    );
  }, [trackAction, onCrisisLevelChange, onEmergencyEscalation, routeToChild]);

  // === Handle crisis level change ===
  const handleCrisisLevelChange = useCallback((level: CrisisLevel) => {
    setCrisisLevel(level);
    onCrisisLevelChange?.(level);
    
    if (level === 'crisis') {
      handleEmergencyEscalation();
    }
  }, [onCrisisLevelChange, handleEmergencyEscalation]);

  // === Get crisis level styling ===
  const getCrisisLevelStyle = () => {
    switch (crisisLevel) {
      case 'crisis':
        return {
          borderColor: '#D32F2F',
          backgroundColor: '#FFEBEE',
          iconColor: '#D32F2F'
        };
      case 'support':
        return {
          borderColor: '#F57C00',
          backgroundColor: '#FFF3E0',
          iconColor: '#F57C00'
        };
      default:
        return {
          borderColor: '#8B4513',
          backgroundColor: '#FFF8F0',
          iconColor: '#8B4513'
        };
    }
  };

  const levelStyle = getCrisisLevelStyle();

  // === Don't render if Maya is disabled (but always render in crisis) ===
  if (!preferences.mayaEnabled && crisisLevel === 'normal') {
    return null;
  }

  return (
    <div 
      className={`maya-crisis-integration ${className}`}
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Crisis Alert Banner */}
      {crisisLevel === 'crisis' && (
        <div
          className="crisis-alert"
          style={{
            background: '#FFEBEE',
            borderLeft: '4px solid #D32F2F',
            padding: 16,
            marginBottom: 16,
            borderRadius: '0 8px 8px 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#D32F2F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#B71C1C', marginBottom: 4 }}>
              Crisis Support Active
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#C62828' }}>
              Your wellbeing matters. Immediate support resources are available below.
              If you're in immediate danger, please call 999.
            </p>
          </div>
        </div>
      )}

      {/* Support Banner */}
      {crisisLevel === 'support' && (
        <div
          className="support-alert"
          style={{
            background: '#FFF3E0',
            borderLeft: '4px solid #F57C00',
            padding: 16,
            marginBottom: 16,
            borderRadius: '0 8px 8px 0',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}
        >
          <span style={{ fontSize: 24 }}>💛</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#E65100', marginBottom: 4 }}>
              We're Here For You
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#EF6C00' }}>
              It sounds like you might be going through something difficult.
              Would you like to explore some support options?
            </p>
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div
        className="crisis-main-panel"
        style={{
          background: 'white',
          borderRadius: 12,
          border: `2px solid ${levelStyle.borderColor}`,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 16,
            background: levelStyle.backgroundColor,
            borderBottom: `1px solid ${levelStyle.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <MayaAvatar 
            entity={activeEntity} 
            size="md"
            showMood
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>
              {CRISIS_CHILD_INFO[activeEntity]?.name || 'Maya'}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              {CRISIS_CHILD_INFO[activeEntity]?.crisisRole || 'Here to help'}
            </div>
          </div>
          
          {/* Language indicator */}
          <div
            style={{
              fontSize: 12,
              color: '#666',
              padding: '4px 8px',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: 12
            }}
          >
            {currentLanguage.toUpperCase()}
          </div>
        </div>

        {/* Acknowledgement */}
        {acknowledgement && (
          <div
            style={{
              padding: 16,
              background: '#F5F5F5',
              borderBottom: '1px solid #eee',
              fontSize: 14
            }}
          >
            {acknowledgement}
          </div>
        )}

        {/* Pathway Selector */}
        {showPathwaySelector && (
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12, fontWeight: 500 }}>
              How can we support you?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {availablePathways.map(pathway => {
                const childInfo = CRISIS_CHILD_INFO[pathway.childGuide];
                return (
                  <button
                    key={pathway.id}
                    onClick={() => handlePathwaySelect(pathway)}
                    style={{
                      padding: 12,
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      background: 'white',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor = childInfo.color;
                      e.currentTarget.style.background = '#fafafa';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{childInfo.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>
                        {pathway.name}
                      </div>
                      <div style={{ fontSize: 13, color: '#666' }}>
                        {pathway.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources Panel */}
        {showResources && (
          <div style={{ padding: 16, borderTop: '1px solid #eee' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12 
            }}>
              <div style={{ fontWeight: 500 }}>Support Resources</div>
              <button
                onClick={() => setShowResources(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: 18
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {getPrioritizedResources().map((resource, i) => (
                <div
                  key={i}
                  style={{
                    padding: 12,
                    background: resource.priority === 1 ? '#FFF3E0' : '#F5F5F5',
                    borderRadius: 8,
                    border: resource.priority === 1 ? '1px solid #FFB74D' : '1px solid #eee'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontWeight: 500 }}>{resource.name}</div>
                    <div style={{ 
                      fontSize: 11, 
                      color: '#666',
                      background: 'rgba(0,0,0,0.05)',
                      padding: '2px 6px',
                      borderRadius: 8
                    }}>
                      {resource.type}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 600, 
                    color: '#1976D2',
                    marginBottom: 4 
                  }}>
                    {resource.contact}
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    {resource.description}
                  </div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                    {resource.available}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div
          style={{
            padding: 16,
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}
        >
          {!showPathwaySelector && (
            <button
              onClick={() => setShowPathwaySelector(true)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${levelStyle.borderColor}`,
                background: 'white',
                color: levelStyle.borderColor,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Show Support Options
            </button>
          )}
          
          <button
            onClick={() => setShowResources(!showResources)}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: 'white',
              color: '#333',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {showResources ? 'Hide Resources' : 'Show Resources'}
          </button>
          
          {crisisLevel !== 'crisis' && (
            <button
              onClick={handleEmergencyEscalation}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: '#D32F2F',
                color: 'white',
                fontWeight: 500,
                cursor: 'pointer',
                marginLeft: 'auto',
                transition: 'all 0.2s'
              }}
            >
              🚨 Emergency Help
            </button>
          )}
        </div>

        {/* Community info */}
        {userCommunity && (
          <div
            style={{
              padding: '12px 16px',
              background: '#F5F5F5',
              fontSize: 13,
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span>📍</span>
            <span>Showing resources for {userCommunity}</span>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .maya-crisis-integration button:hover {
          opacity: 0.9;
        }
        
        .maya-crisis-integration button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default MayaCrisisIntegration;