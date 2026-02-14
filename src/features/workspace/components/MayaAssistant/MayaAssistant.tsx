/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaAssistant - Main Workspace Assistant Component
 * 
 * The primary Maya interface for workspace/sandbox environments.
 * Provides contextual AI assistance with full ROV framework integration.
 * 
 * Features:
 * - Floating assistant panel
 * - Context-aware suggestions
 * - Child routing and switching
 * - Open loop tracking
 * - Stage-aware behavior
 * - Sandbox integration
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  useMayaStore,
  useMayaStage,
  useMayaMode,
  useMayaROV,
  useMayaPreferences,
  useMayaTracking,
  useMayaMessages,
  useMayaOpenLoops,
  useMayaSession
} from '../../../../maya/stores/mayaStore';
import type { 
  ActiveChild, 
  MayaMode, 
  PedagogicalStage,
  MayaMessage,
  KnowledgeDomain
} from '../../../../maya/types/mayaTypes';
import MayaAvatar, { MayaChildSwitcher } from './MayaAvatar';

// ============================================
// TYPES
// ============================================

interface MayaAssistantProps {
  /** Sandbox/workspace context ID */
  contextId?: string;
  /** Sandbox type for contextual behavior */
  sandboxType?: 'stemgeneer' | 'techreneur' | 'pageturners' | 'kaywana' | 'general';
  /** Position of the assistant panel */
  position?: 'bottom-right' | 'bottom-left' | 'right' | 'inline';
  /** Initial expanded state */
  defaultExpanded?: boolean;
  /** Callback when assistant sends a message */
  onSendMessage?: (message: string, entity: ActiveChild) => Promise<string>;
  /** Callback when entity changes */
  onEntityChange?: (entity: ActiveChild) => void;
  /** Additional CSS class */
  className?: string;
  /** Z-index for floating position */
  zIndex?: number;
}

interface LocalMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  entity: ActiveChild;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action' | 'system';
}

// ============================================
// ENTITY METADATA
// ============================================

interface EntityMeta {
  name: string;
  emoji: string;
  title: string;
  color: string;
  quickPrompts: string[];
}

const ENTITY_META: Record<ActiveChild, EntityMeta> = {
  maya: {
    name: 'Maya',
    emoji: '👩🏿‍🦱',
    title: 'The Mother',
    color: '#8B4513',
    quickPrompts: ['I need help', "What should I work on?", "I'm feeling stuck"]
  },
  kweku: {
    name: 'Kweku',
    emoji: '🎯',
    title: 'The Questioner',
    color: '#D32F2F',
    quickPrompts: ['Validate my idea', "Who's my customer?", 'Revenue model help']
  },
  ntikuma: {
    name: 'Ntikuma',
    emoji: '📊',
    title: 'The Watcher',
    color: '#1976D2',
    quickPrompts: ['Check my numbers', 'Tax help', 'Budget review']
  },
  anansewa: {
    name: 'Anansewa',
    emoji: '🎭',
    title: 'The Performer',
    color: '#7B1FA2',
    quickPrompts: ['Practice my pitch', 'Presentation feedback', 'Find my presence']
  },
  kofi: {
    name: 'Kofi',
    emoji: '🔧',
    title: 'The Builder',
    color: '#388E3C',
    quickPrompts: ['Build a prototype', 'My project broke', 'What materials?']
  },
  afua: {
    name: 'Afua',
    emoji: '🎙️',
    title: 'The Storyteller',
    color: '#F57C00',
    quickPrompts: ['Find my story', 'Podcast structure', 'Voice coaching']
  },
  yaw: {
    name: 'Yaw',
    emoji: '📝',
    title: 'The Chronicler',
    color: '#455A64',
    quickPrompts: ['Document this', 'Find the angle', 'Write it down']
  },
  esi: {
    name: 'Esi',
    emoji: '📚',
    title: 'The Keeper',
    color: '#5D4037',
    quickPrompts: ['Preserve this recipe', 'Credit my sources', 'Heritage search']
  },
  kumi: {
    name: 'Kumi',
    emoji: '🎮',
    title: 'The Gamer',
    color: '#00796B',
    quickPrompts: ['Game strategy', 'Level up advice', 'Competition prep']
  },
  adaeze: {
    name: 'Adaeze',
    emoji: '✂️',
    title: 'The Stylist',
    color: '#C2185B',
    quickPrompts: ['Design feedback', 'Style direction', 'Visual identity']
  },
  nyame: {
    name: 'Nyame',
    emoji: '⚖️',
    title: 'The Philosopher',
    color: '#512DA8',
    quickPrompts: ['Ethical dilemma', 'Decision help', 'Think this through']
  },
  osei: {
    name: 'Osei',
    emoji: '✊',
    title: 'The Organizer',
    color: '#E64A19',
    quickPrompts: ['Community strategy', 'Power mapping', 'Organize action']
  },
  akua: {
    name: 'Akua',
    emoji: '📜',
    title: 'The Advocate',
    color: '#303F9F',
    quickPrompts: ['Contract review', 'Protect my work', 'Know my rights']
  }
};

// ============================================
// SANDBOX CONTEXT
// ============================================

interface SandboxContext {
  suggestedChildren: ActiveChild[];
  welcomeMessage: string;
  contextualPrompts: string[];
}

const SANDBOX_CONTEXTS: Record<string, SandboxContext> = {
  stemgeneer: {
    suggestedChildren: ['kofi', 'kumi', 'yaw'],
    welcomeMessage: "Welcome to STEMgineers! I'm here to help you build, experiment, and document your projects.",
    contextualPrompts: ['Help me debug', 'Explain this concept', 'What should I build next?']
  },
  techreneur: {
    suggestedChildren: ['kweku', 'ntikuma', 'afua'],
    welcomeMessage: "Welcome to TECHreneurs! Let's build your business skills and find your market.",
    contextualPrompts: ['Validate my business idea', 'Help with pricing', 'Marketing strategy']
  },
  pageturners: {
    suggestedChildren: ['afua', 'yaw', 'esi'],
    welcomeMessage: "Welcome to PageTurners! Let's explore stories and find your voice.",
    contextualPrompts: ['Story structure help', 'Character development', 'Find my genre']
  },
  kaywana: {
    suggestedChildren: ['anansewa', 'afua', 'adaeze'],
    welcomeMessage: "Welcome to Kaywana's Court! Time to explore performance, creativity, and presence.",
    contextualPrompts: ['Practice my scene', 'Costume ideas', 'Stage presence tips']
  },
  general: {
    suggestedChildren: ['kweku', 'kofi', 'afua', 'ntikuma', 'esi'],
    welcomeMessage: "Hi! I'm Maya. How can I help you today?",
    contextualPrompts: ['I need guidance', 'Show me what I can do', 'Connect me with help']
  }
};

// ============================================
// COMPONENT
// ============================================

const MayaAssistant: React.FC<MayaAssistantProps> = ({
  contextId,
  sandboxType = 'general',
  position = 'bottom-right',
  defaultExpanded = false,
  onSendMessage,
  onEntityChange,
  className = '',
  zIndex = 1000
}) => {
  // === Store Hooks ===
  const { currentStage } = useMayaStage();
  const { currentMode } = useMayaMode();
  const { 
    activeEntity, 
    setActiveEntity, 
    routeToChild, 
    returnToMaya,
    trustRelationships 
  } = useMayaROV();
  const { preferences } = useMayaPreferences();
  const { trackAction } = useMayaTracking();
  const { messages: storeMessages, addMessage } = useMayaMessages();
  const { openLoops, openLoop, closeLoop } = useMayaOpenLoops();
  const { startSession, recordTopicDiscussed } = useMayaSession();

  // === Local State ===
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChildPicker, setShowChildPicker] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // === Derived Values ===
  const entityMeta = ENTITY_META[activeEntity] || ENTITY_META.maya;
  const sandboxContext = SANDBOX_CONTEXTS[sandboxType] || SANDBOX_CONTEXTS.general;

  // === Initialize ===
  useEffect(() => {
    if (isExpanded && localMessages.length === 0) {
      // Add welcome message
      const welcomeMsg: LocalMessage = {
        id: `welcome-${Date.now()}`,
        content: sandboxContext.welcomeMessage,
        sender: 'assistant',
        entity: 'maya',
        timestamp: new Date(),
        type: 'system'
      };
      setLocalMessages([welcomeMsg]);
      startSession();
    }
  }, [isExpanded, sandboxContext.welcomeMessage, startSession]);

  // === Auto-scroll ===
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  // === Focus input when expanded ===
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded]);

  // === Handle entity change ===
  const handleEntityChange = useCallback((entity: ActiveChild) => {
    setActiveEntity(entity);
    onEntityChange?.(entity);
    setShowChildPicker(false);

    // Add system message about switch
    const meta = ENTITY_META[entity];
    const switchMsg: LocalMessage = {
      id: `switch-${Date.now()}`,
      content: entity === 'maya' 
        ? "I'm back. What do you need?"
        : `Hi, I'm ${meta.name}. ${meta.title}. How can I help?`,
      sender: 'assistant',
      entity,
      timestamp: new Date(),
      type: 'system'
    };
    setLocalMessages(prev => [...prev, switchMsg]);
  }, [setActiveEntity, onEntityChange]);

  // === Send message ===
  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: LocalMessage = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      sender: 'user',
      entity: activeEntity,
      timestamp: new Date(),
      type: 'text'
    };

    setLocalMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    trackAction('direction_action');
    recordTopicDiscussed(inputValue.slice(0, 30));

    try {
      let responseContent: string;

      if (onSendMessage) {
        // Use provided handler (e.g., LLM integration)
        responseContent = await onSendMessage(inputValue.trim(), activeEntity);
      } else {
        // Default simulation
        responseContent = simulateResponse(inputValue.trim(), activeEntity);
      }

      const assistantMessage: LocalMessage = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: 'assistant',
        entity: activeEntity,
        timestamp: new Date(),
        type: 'text'
      };

      setLocalMessages(prev => [...prev, assistantMessage]);
      
      // Log to store
      addMessage(responseContent, 'narration', { 
        domain: sandboxType as unknown as KnowledgeDomain,
        childId: activeEntity 
      });

    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: LocalMessage = {
        id: `error-${Date.now()}`,
        content: "I'm having trouble responding right now. Please try again.",
        sender: 'assistant',
        entity: 'maya',
        timestamp: new Date(),
        type: 'system'
      };
      setLocalMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping, activeEntity, onSendMessage, trackAction, recordTopicDiscussed, addMessage, sandboxType]);

  // === Simulate response (fallback) ===
  const simulateResponse = (input: string, entity: ActiveChild): string => {
    const responses: Record<ActiveChild, string[]> = {
      maya: [
        "Tell me more about what you're working on.",
        "That's interesting. What's the next step you're thinking about?",
        "I hear you. Would one of my children be better suited to help with this?"
      ],
      kweku: [
        "Interesting. But who's paying for this?",
        "What problem does this solve, specifically?",
        "Have you validated this with actual customers?"
      ],
      ntikuma: [
        "Let me look at those numbers.",
        "The pattern I see here is interesting.",
        "Have you accounted for all the costs?"
      ],
      anansewa: [
        "Show me, don't tell me.",
        "Where's the authenticity in this?",
        "Try it again, but mean it this time."
      ],
      kofi: [
        "Stop explaining. Build it.",
        "What have you actually made so far?",
        "Let me see the prototype."
      ],
      afua: [
        "Every story has a spine. What's yours?",
        "I hear your voice, but what's it saying?",
        "The narrative needs more structure."
      ],
      yaw: [
        "If we don't write it down, it didn't happen.",
        "What's the angle here?",
        "Document as you go."
      ],
      esi: [
        "Who taught you this? Their name matters.",
        "Let's trace where this knowledge came from.",
        "The tradition must be honored properly."
      ],
      kumi: [
        "What's your strategy?",
        "You're playing defensively. Push forward.",
        "Level up your approach."
      ],
      adaeze: [
        "What is this piece trying to say?",
        "The aesthetic needs intention.",
        "Style without substance is empty."
      ],
      nyame: [
        "You know what you want to do. But should you?",
        "Let's think about who this affects.",
        "The ethical dimension matters here."
      ],
      osei: [
        "Who benefits from things staying the same?",
        "Let's map the power dynamics.",
        "Collective action requires strategy."
      ],
      akua: [
        "Do you have that in writing?",
        "Let's make sure you're protected.",
        "Know your rights before you proceed."
      ]
    };

    const entityResponses = responses[entity] || responses.maya;
    return entityResponses[Math.floor(Math.random() * entityResponses.length)];
  };

  // === Handle quick prompt ===
  const handleQuickPrompt = useCallback((prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => handleSend(), 100);
  }, [handleSend]);

  // === Toggle expanded ===
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // === Don't render if disabled ===
  if (!preferences.mayaEnabled) return null;

  // === Position styles ===
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      zIndex
    };

    switch (position) {
      case 'bottom-right':
        return { ...base, bottom: 20, right: 20 };
      case 'bottom-left':
        return { ...base, bottom: 20, left: 20 };
      case 'right':
        return { ...base, top: '50%', right: 20, transform: 'translateY(-50%)' };
      case 'inline':
        return { position: 'relative', zIndex: 1 };
      default:
        return { ...base, bottom: 20, right: 20 };
    }
  };

  return (
    <div 
      className={`maya-assistant ${className}`}
      style={getPositionStyles()}
    >
      {/* Collapsed State - Avatar Button */}
      {!isExpanded && (
        <button
          className="maya-assistant-toggle"
          onClick={handleToggle}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: 'none',
            background: entityMeta.color,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative'
          }}
          aria-label="Open Maya Assistant"
        >
          <span style={{ fontSize: 28 }}>{entityMeta.emoji}</span>
          
          {/* Open loops badge */}
          {openLoops.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#F44336',
                color: 'white',
                fontSize: 11,
                fontWeight: 600,
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white'
              }}
            >
              {openLoops.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded State - Chat Panel */}
      {isExpanded && (
        <div
          className="maya-assistant-panel"
          style={{
            width: 360,
            height: 500,
            background: 'white',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            className="maya-assistant-header"
            style={{
              padding: '12px 16px',
              background: entityMeta.color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <MayaAvatar 
              entity={activeEntity} 
              size="sm" 
              animated={false}
              onClick={() => setShowChildPicker(!showChildPicker)}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{entityMeta.name}</div>
              <div style={{ fontSize: 11, opacity: 0.9 }}>{entityMeta.title}</div>
            </div>
            
            {/* Stage indicator */}
            <div
              style={{
                display: 'flex',
                gap: 4
              }}
            >
              {[1, 2, 3, 4, 5].map(stage => (
                <div
                  key={stage}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: stage <= (currentStage as number) 
                      ? 'white' 
                      : 'rgba(255,255,255,0.3)'
                  }}
                  title={`Stage ${stage}`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={handleToggle}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 18
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Child Picker (dropdown) */}
          {showChildPicker && (
            <div
              style={{
                padding: 12,
                borderBottom: '1px solid #eee',
                background: '#fafafa'
              }}
            >
              <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                Switch to another guide:
              </div>
              <MayaChildSwitcher
                children={sandboxContext.suggestedChildren}
                onSelect={handleEntityChange}
              />
            </div>
          )}

          {/* Messages */}
          <div
            className="maya-assistant-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            {localMessages.map(msg => (
              <div
                key={msg.id}
                className={`maya-message maya-message-${msg.sender}`}
                style={{
                  display: 'flex',
                  flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  gap: 8,
                  alignItems: 'flex-start'
                }}
              >
                {msg.sender === 'assistant' && (
                  <span style={{ fontSize: 20 }}>
                    {ENTITY_META[msg.entity]?.emoji || '👩🏿‍🦱'}
                  </span>
                )}
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' 
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    background: msg.sender === 'user' 
                      ? entityMeta.color
                      : msg.type === 'system' ? '#f0f0f0' : '#f5f5f5',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    fontSize: 14,
                    lineHeight: 1.5
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: 20 }}>{entityMeta.emoji}</span>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '16px 16px 16px 4px',
                    background: '#f5f5f5'
                  }}
                >
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#999',
                          animation: `typing-bounce 1s infinite ${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {localMessages.length <= 2 && (
            <div
              style={{
                padding: '8px 16px',
                borderTop: '1px solid #eee',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6
              }}
            >
              {entityMeta.quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(prompt)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 16,
                    border: `1px solid ${entityMeta.color}`,
                    background: 'white',
                    color: entityMeta.color,
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="maya-assistant-input"
            style={{
              padding: 12,
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: 8
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${entityMeta.name}...`}
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 20,
                border: '1px solid #ddd',
                fontSize: 14,
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: inputValue.trim() ? entityMeta.color : '#ddd',
                color: 'white',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                transition: 'background 0.2s'
              }}
              aria-label="Send"
            >
              →
            </button>
          </div>

          {/* Open Loops Indicator */}
          {openLoops.length > 0 && (
            <div
              style={{
                padding: '8px 16px',
                background: '#FFF3E0',
                borderTop: '1px solid #FFE0B2',
                fontSize: 12,
                color: '#E65100',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>🔄</span>
              <span>{openLoops.length} open thread{openLoops.length > 1 ? 's' : ''}</span>
              <button
                onClick={() => {/* Show open loops panel */}}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  color: '#E65100',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 12
                }}
              >
                View
              </button>
            </div>
          )}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        
        .maya-assistant-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        
        .maya-assistant-panel {
          animation: slideUp 0.2s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MayaAssistant;