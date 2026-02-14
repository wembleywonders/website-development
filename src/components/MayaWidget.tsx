/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaWidget - Floating Maya Access Widget
 * 
 * A persistent, minimizable widget that provides quick access to Maya
 * and her children from anywhere in the platform.
 * 
 * Features:
 * - Floating button when minimized
 * - Expandable chat interface
 * - Shows active entity (Maya or child)
 * - Open loop notifications
 * - Stage progress indicator
 * - Quick child switching
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  useMayaStore,
  useMayaStage,
  useMayaMode,
  useMayaROV,
  useMayaOpenLoops,
  useMayaPreferences,
  useMayaSession
} from '../maya/stores/mayaStore';
import type { ActiveChild } from '../maya/types/mayaTypes';

// ============================================
// TYPES
// ============================================

interface MayaWidgetProps {
  /** Initial position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Whether to start expanded */
  defaultExpanded?: boolean;
  /** Custom z-index */
  zIndex?: number;
  /** Callback when chat is opened */
  onOpen?: () => void;
  /** Callback when chat is closed */
  onClose?: () => void;
  /** Custom class name */
  className?: string;
}

// ============================================
// CHILD METADATA
// ============================================

const CHILD_INFO: Record<ActiveChild, {
  name: string;
  emoji: string;
  color: string;
  shortDesc: string;
}> = {
  maya: {
    name: 'Maya',
    emoji: '👩🏿‍🦱',
    color: '#8B4513',
    shortDesc: 'The Mother'
  },
  kweku: {
    name: 'Kweku',
    emoji: '🎯',
    color: '#10b981',
    shortDesc: 'Business'
  },
  ntikuma: {
    name: 'Ntikuma',
    emoji: '📊',
    color: '#8b5cf6',
    shortDesc: 'Finance'
  },
  anansewa: {
    name: 'Anansewa',
    emoji: '🎭',
    color: '#ec4899',
    shortDesc: 'Performance'
  },
  kofi: {
    name: 'Kofi',
    emoji: '🔧',
    color: '#06b6d4',
    shortDesc: 'Building'
  },
  afua: {
    name: 'Afua',
    emoji: '🎙️',
    color: '#f59e0b',
    shortDesc: 'Voice'
  },
  yaw: {
    name: 'Yaw',
    emoji: '📝',
    color: '#6366f1',
    shortDesc: 'Journalism'
  },
  esi: {
    name: 'Esi',
    emoji: '📚',
    color: '#84cc16',
    shortDesc: 'Heritage'
  },
  kumi: {
    name: 'Kumi',
    emoji: '🎮',
    color: '#ef4444',
    shortDesc: 'Gaming'
  },
  adaeze: {
    name: 'Adaeze',
    emoji: '✂️',
    color: '#DB2777',
    shortDesc: 'Fashion'
  },
  nyame: {
    name: 'Nyame',
    emoji: '⚖️',
    color: '#1e3a5f',
    shortDesc: 'Ethics'
  },
  osei: {
    name: 'Osei',
    emoji: '✊',
    color: '#dc2626',
    shortDesc: 'Civics'
  },
  akua: {
    name: 'Akua',
    emoji: '📜',
    color: '#0f766e',
    shortDesc: 'Legal'
  }
};

// ============================================
// POSITION STYLES
// ============================================

const POSITION_STYLES: Record<string, React.CSSProperties> = {
  'bottom-right': { bottom: '20px', right: '20px' },
  'bottom-left': { bottom: '20px', left: '20px' },
  'top-right': { top: '20px', right: '20px' },
  'top-left': { top: '20px', left: '20px' }
};

// ============================================
// COMPONENT
// ============================================

export const MayaWidget: React.FC<MayaWidgetProps> = ({
  position = 'bottom-right',
  defaultExpanded = false,
  zIndex = 1000,
  onOpen,
  onClose,
  className = ''
}) => {
  // === Store Hooks ===
  const { currentStage, stageDef } = useMayaStage();
  const { currentMode } = useMayaMode();
  const { activeEntity, routeToChild, returnToMaya } = useMayaROV();
  const { openLoops } = useMayaOpenLoops();
  const { preferences } = useMayaPreferences();
  const { session, startSession } = useMayaSession();
  
  // === Local State ===
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showFamilyPicker, setShowFamilyPicker] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  // === Current entity info ===
  const currentInfo = CHILD_INFO[activeEntity] || CHILD_INFO.maya;
  
  // === Don't render if Maya is disabled ===
  if (!preferences.mayaEnabled) return null;
  
  // === Handle expand/collapse ===
  const handleToggle = useCallback(() => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    setHasUnread(false);
    
    if (newExpanded) {
      onOpen?.();
      // Start session if needed
      if (!session.id || session.messageCount === 0) {
        startSession();
      }
    } else {
      onClose?.();
    }
  }, [isExpanded, onOpen, onClose, session, startSession]);
  
  // === Handle child selection ===
  const handleSelectChild = useCallback((childId: ActiveChild) => {
    if (childId === 'maya') {
      returnToMaya(activeEntity, 'ongoing');
    } else {
      routeToChild(childId, 'User selected from widget', 'exploration');
    }
    setShowFamilyPicker(false);
  }, [activeEntity, routeToChild, returnToMaya]);
  
  // === Minimized button ===
  if (!isExpanded) {
    return (
      <button
        onClick={handleToggle}
        className={`maya-widget-button ${className}`}
        style={{
          position: 'fixed',
          ...POSITION_STYLES[position],
          zIndex,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: currentInfo.color,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        aria-label={`Open chat with ${currentInfo.name}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
      >
        {currentInfo.emoji}
        
        {/* Notification badges */}
        {(openLoops.length > 0 || hasUnread) && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            {openLoops.length || '•'}
          </span>
        )}
        
        {/* Stage progress ring */}
        <svg
          style={{
            position: 'absolute',
            top: '-3px',
            left: '-3px',
            width: '62px',
            height: '62px',
            transform: 'rotate(-90deg)'
          }}
        >
          <circle
            cx="31"
            cy="31"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3"
          />
          <circle
            cx="31"
            cy="31"
            r="28"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray={`${(currentStage / 5) * 176} 176`}
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  }
  
  // === Expanded widget ===
  return (
    <div
      className={`maya-widget-expanded ${className}`}
      style={{
        position: 'fixed',
        ...POSITION_STYLES[position],
        zIndex,
        width: '340px',
        maxHeight: '500px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: currentInfo.color,
          color: 'white',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>{currentInfo.emoji}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{currentInfo.name}</div>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>{currentInfo.shortDesc}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Family picker toggle */}
          <button
            onClick={() => setShowFamilyPicker(!showFamilyPicker)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Show family"
            title="Switch to another guide"
          >
            👨‍👩‍👧‍👦
          </button>
          
          {/* Minimize button */}
          <button
            onClick={handleToggle}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Minimize"
          >
            −
          </button>
        </div>
      </div>
      
      {/* Stage indicator */}
      <div style={{
        padding: '8px 16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: '#6c757d'
      }}>
        <span>Stage {currentStage}: {stageDef.label}</span>
        <span style={{
          display: 'flex',
          gap: '2px'
        }}>
          {[1, 2, 3, 4, 5].map(stage => (
            <span
              key={stage}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: stage <= currentStage ? currentInfo.color : '#dee2e6'
              }}
            />
          ))}
        </span>
      </div>
      
      {/* Family picker (collapsible) */}
      {showFamilyPicker && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: 600, 
            marginBottom: '8px',
            color: '#6c757d'
          }}>
            The Family
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px'
          }}>
            {Object.entries(CHILD_INFO).map(([id, info]) => (
              <button
                key={id}
                onClick={() => handleSelectChild(id as ActiveChild)}
                disabled={id === activeEntity}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: id === activeEntity 
                    ? `2px solid ${info.color}` 
                    : '1px solid #dee2e6',
                  backgroundColor: id === activeEntity ? info.color : 'white',
                  color: id === activeEntity ? 'white' : '#333',
                  fontSize: '10px',
                  cursor: id === activeEntity ? 'default' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '16px' }}>{info.emoji}</span>
                <span style={{ fontWeight: 500 }}>{info.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Open loops indicator */}
      {openLoops.length > 0 && (
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#fff3cd',
          borderBottom: '1px solid #ffc107',
          fontSize: '11px',
          color: '#856404',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>📌</span>
          <span>
            {openLoops.length} open {openLoops.length === 1 ? 'thread' : 'threads'}
            {openLoops[0] && (
              <span style={{ opacity: 0.8 }}>
                : {openLoops[0].topic.slice(0, 20)}...
              </span>
            )}
          </span>
        </div>
      )}
      
      {/* Content area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        minHeight: '200px'
      }}>
        {/* Welcome message based on entity */}
        <div style={{
          textAlign: 'center',
          color: '#6c757d'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>
            {currentInfo.emoji}
          </div>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>
            {activeEntity === 'maya' 
              ? "Welcome to the kitchen table"
              : `Working with ${currentInfo.name}`
            }
          </div>
          <div style={{ fontSize: '13px' }}>
            {activeEntity === 'maya'
              ? "What's on your mind?"
              : currentInfo.shortDesc
            }
          </div>
        </div>
        
        {/* Quick prompts */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '16px',
          justifyContent: 'center'
        }}>
          {getQuickPrompts(activeEntity).map((prompt, i) => (
            <button
              key={i}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: '1px solid #dee2e6',
                backgroundColor: 'white',
                fontSize: '12px',
                color: '#495057',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentInfo.color;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = currentInfo.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#495057';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #e9ecef',
        backgroundColor: '#fff'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder={`Message ${currentInfo.name}...`}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '20px',
              border: '1px solid #dee2e6',
              outline: 'none',
              fontSize: '13px'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = currentInfo.color;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
            }}
          />
          <button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentInfo.color,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
      
      {/* Mode indicator (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          padding: '4px 16px',
          backgroundColor: '#e9ecef',
          fontSize: '9px',
          color: '#6c757d',
          textAlign: 'center'
        }}>
          Mode: {currentMode} | Entity: {activeEntity}
        </div>
      )}
    </div>
  );
};

// ============================================
// HELPER: Get quick prompts per entity
// ============================================

function getQuickPrompts(entity: ActiveChild): string[] {
  const prompts: Record<ActiveChild, string[]> = {
    maya: [
      "I need help",
      "What should I work on?",
      "I'm stuck"
    ],
    kweku: [
      "Validate my idea",
      "Who's my customer?",
      "Revenue model"
    ],
    ntikuma: [
      "Check my numbers",
      "Tax help",
      "Set-aside rate"
    ],
    anansewa: [
      "I have a performance",
      "Finding presence",
      "Stage fright"
    ],
    kofi: [
      "Build a prototype",
      "My project broke",
      "What materials?"
    ],
    afua: [
      "Find my voice",
      "Story structure",
      "Podcast help"
    ],
    yaw: [
      "Write an article",
      "Find the angle",
      "Research help"
    ],
    esi: [
      "Record a recipe",
      "Family history",
      "Preserve tradition"
    ],
    kumi: [
      "Gaming strategy",
      "Start streaming",
      "Improve my game"
    ],
    adaeze: [
      "Design feedback",
      "Find my style",
      "Fashion business"
    ],
    nyame: [
      "Ethical dilemma",
      "Is this right?",
      "Think it through"
    ],
    osei: [
      "Community organizing",
      "Know my rights",
      "Power mapping"
    ],
    akua: [
      "Contract review",
      "Legal question",
      "Protect my work"
    ]
  };
  
  return prompts[entity] || prompts.maya;
}

// ============================================
// EXPORTS
// ============================================

export default MayaWidget;