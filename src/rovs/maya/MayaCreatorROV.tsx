/**
 * MayaCreatorROV - Main ROV Component
 * 
 * The primary interface between creators and the Children of Anansi.
 * Maya serves as the entry point, routing creators to appropriate children
 * based on their needs, mood, and trust relationships.
 * 
 * This component:
 * - Manages conversation flow with Maya and her children
 * - Handles routing decisions (Maya keeps vs routes to child)
 * - Displays appropriate UI based on active entity and mode
 * - Tracks interactions for trust and development progression
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  useMayaStore,
  useMayaStage,
  useMayaMode,
  useMayaMessages,
  useMayaROV,
  useMayaOpenLoops,
  useMayaAssessment,
  useMayaSession,
  useMayaTracking,
  useMayaCommunity
} from '../../maya/stores/mayaStore';

import type {
  ActiveChild,
  MayaMessageType,
  PedagogicalStage,
  UnifiedCreatorState
} from '../../maya/types/mayaTypes';

import type {
  ROVStance,
  MemberMood,
  KnowledgeDomain
} from '../../rov/types';

// ============================================
// TYPES
// ============================================

interface MayaCreatorROVProps {
  /** Creator's unique ID */
  creatorId: string;
  /** Creator's display name */
  creatorName: string;
  /** Initial programmes the creator is enrolled in */
  programmes?: string[];
  /** Callback when creator sends a message */
  onSendMessage?: (message: string, entity: ActiveChild) => Promise<string>;
  /** Callback when routing occurs */
  onRouteChange?: (from: ActiveChild, to: ActiveChild, reason: string) => void;
  /** Custom class name */
  className?: string;
  /** Whether to show in compact mode */
  compact?: boolean;
  /** Whether Maya is minimized */
  minimized?: boolean;
  /** Callback when minimize state changes */
  onMinimizeChange?: (minimized: boolean) => void;
}

interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  entity: ActiveChild;
  stance?: ROVStance;
  timestamp: Date;
  metadata?: {
    type?: MayaMessageType;
    handoffTo?: ActiveChild;
    domain?: KnowledgeDomain;
  };
}

// ============================================
// CHILD METADATA
// ============================================

const CHILD_METADATA: Record<ActiveChild, {
  name: string;
  title: string;
  emoji: string;
  color: string;
  domain: string;
}> = {
  maya: {
    name: 'Maya',
    title: 'The Mother',
    emoji: '🏠',
    color: '#8B4513',
    domain: 'Guidance & Nurturing'
  },
  kweku: {
    name: 'Kweku',
    title: 'The Questioner',
    emoji: '🎯',
    color: '#10b981',
    domain: 'Business & Strategy'
  },
  ntikuma: {
    name: 'Ntikuma',
    title: 'The Watcher',
    emoji: '📊',
    color: '#8b5cf6',
    domain: 'Finance & Numbers'
  },
  anansewa: {
    name: 'Anansewa',
    title: 'The Performer',
    emoji: '🎭',
    color: '#ec4899',
    domain: 'Theatre & Presence'
  },
  kofi: {
    name: 'Kofi',
    title: 'The Builder',
    emoji: '🔧',
    color: '#06b6d4',
    domain: 'Making & Engineering'
  },
  afua: {
    name: 'Afua',
    title: 'The Storyteller',
    emoji: '🎙️',
    color: '#f59e0b',
    domain: 'Voice & Story'
  },
  yaw: {
    name: 'Yaw',
    title: 'The Chronicler',
    emoji: '📝',
    color: '#6366f1',
    domain: 'Documentation & Journalism'
  },
  esi: {
    name: 'Esi',
    title: 'The Keeper',
    emoji: '📚',
    color: '#84cc16',
    domain: 'Heritage & Preservation'
  },
  kumi: {
    name: 'Kumi',
    title: 'The Gamer',
    emoji: '🎮',
    color: '#ef4444',
    domain: 'Gaming & Strategy'
  },
  adaeze: {
    name: 'Adaeze',
    title: 'The Stylist',
    emoji: '✂️',
    color: '#DB2777',
    domain: 'Fashion & Design'
  },
  nyame: {
    name: 'Nyame',
    title: 'The Philosopher',
    emoji: '⚖️',
    color: '#1e3a5f',
    domain: 'Ethics & Reasoning'
  },
  osei: {
    name: 'Osei',
    title: 'The Organizer',
    emoji: '✊',
    color: '#dc2626',
    domain: 'Civics & Power'
  },
  akua: {
    name: 'Akua',
    title: 'The Advocate',
    emoji: '📜',
    color: '#0f766e',
    domain: 'Legal & Rights'
  }
};

// ============================================
// COMPONENT
// ============================================

export const MayaCreatorROV: React.FC<MayaCreatorROVProps> = ({
  creatorId,
  creatorName,
  programmes = [],
  onSendMessage,
  onRouteChange,
  className = '',
  compact = false,
  minimized = false,
  onMinimizeChange
}) => {
  // === Store Hooks ===
  const store = useMayaStore();
  const { currentStage, stageDef } = useMayaStage();
  const { currentMode, modeDef, shouldShowInline, isProactive } = useMayaMode();
  const { messages, addMessage, addPushMessage, addCommunityMirrorMessage } = useMayaMessages();
  const { 
    activeEntity, 
    currentStance, 
    currentMood,
    routeToChild, 
    returnToMaya, 
    getSuggestedStance,
    shouldMayaKeep,
    getMostTrustedChild,
    setCurrentMood
  } = useMayaROV();
  const { openLoops } = useMayaOpenLoops();
  const { assessment, recordAssessment, needsAssessment } = useMayaAssessment();
  const { session, startSession, recordTopicDiscussed } = useMayaSession();
  const { trackAction, trackROVSignal } = useMayaTracking();
  const { communityStats } = useMayaCommunity();

  // === Local State ===
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!minimized);
  const [showChildInfo, setShowChildInfo] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // === Initialize creator state ===
  useEffect(() => {
    if (store.state.id !== creatorId) {
      store.initializeCreator(creatorId, creatorName, programmes);
      startSession();
    }
  }, [creatorId, creatorName, programmes]);

  // === Scroll to bottom on new messages ===
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // === Sync minimized state ===
  useEffect(() => {
    setIsExpanded(!minimized);
  }, [minimized]);

  // === Get current entity metadata ===
  const currentEntity = CHILD_METADATA[activeEntity];

  // === Handle sending a message ===
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message to conversation
    const userMsg: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      entity: activeEntity,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMsg]);

    // Track the action
    trackAction('direction_action');
    recordTopicDiscussed(extractTopic(userMessage));

    // Detect mood from message
    const detectedMood = detectMoodFromMessage(userMessage);
    if (detectedMood) {
      setCurrentMood(detectedMood);
    }

    try {
      // Get response from LLM (or callback)
      let response: string;
      
      if (onSendMessage) {
        response = await onSendMessage(userMessage, activeEntity);
      } else {
        // Default: simulate response based on entity
        response = await simulateResponse(userMessage, activeEntity, currentStage);
      }

      // Check if response contains routing instruction
      const routingMatch = response.match(/\[ROUTE_TO:(\w+)\]/);
      if (routingMatch) {
        const targetChild = routingMatch[1].toLowerCase() as ActiveChild;
        response = response.replace(/\[ROUTE_TO:\w+\]/, '').trim();
        
        // Handle routing after response
        setTimeout(() => {
          handleRouteToChild(targetChild, 'Intent detected in conversation', extractTopic(userMessage));
        }, 1000);
      }

      // Check if response contains return instruction
      const returnMatch = response.match(/\[RETURN_TO_MAYA:(\w+)\]/);
      if (returnMatch) {
        const outcome = returnMatch[1] as 'completed' | 'ongoing' | 'abandoned' | 'referred';
        response = response.replace(/\[RETURN_TO_MAYA:\w+\]/, '').trim();
        
        setTimeout(() => {
          returnToMaya(activeEntity, outcome);
        }, 1000);
      }

      // Add assistant response
      const assistantMsg: ConversationMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        entity: activeEntity,
        stance: currentStance || getSuggestedStance(),
        timestamp: new Date()
      };
      setConversation(prev => [...prev, assistantMsg]);

      // Check for stage progression signals
      checkProgressionSignals(userMessage, response);

    } catch (error) {
      console.error('[MayaCreatorROV] Error getting response:', error);
      
      const errorMsg: ConversationMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble responding right now. Let's try again in a moment.",
        entity: 'maya',
        timestamp: new Date()
      };
      setConversation(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [inputValue, isLoading, activeEntity, currentStage, currentStance, onSendMessage]);

  // === Handle routing to a child ===
  const handleRouteToChild = useCallback((
    childId: ActiveChild, 
    reason: string, 
    topic: string
  ) => {
    routeToChild(childId, reason, topic);
    
    // Add routing message to conversation
    const routingMsg: ConversationMessage = {
      id: `routing-${Date.now()}`,
      role: 'assistant',
      content: getHandoffMessage(activeEntity, childId),
      entity: activeEntity,
      timestamp: new Date(),
      metadata: {
        type: 'child-introduction',
        handoffTo: childId
      }
    };
    setConversation(prev => [...prev, routingMsg]);

    // Callback
    onRouteChange?.(activeEntity, childId, reason);
  }, [activeEntity, routeToChild, onRouteChange]);

  // === Handle key press ===
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // === Toggle expanded state ===
  const handleToggleExpanded = useCallback(() => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onMinimizeChange?.(!newExpanded);
  }, [isExpanded, onMinimizeChange]);

  // === Check for progression signals in conversation ===
  const checkProgressionSignals = useCallback((userMessage: string, response: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for independence signals
    if (lowerMessage.includes('i figured out') || lowerMessage.includes('i realized')) {
      trackROVSignal('selfValidated');
    }
    if (lowerMessage.includes('i helped') || lowerMessage.includes('i showed')) {
      trackROVSignal('helpedOthers');
    }
    if (lowerMessage.includes('i finished') || lowerMessage.includes('i completed')) {
      trackROVSignal('independentCompletion');
    }
  }, [trackROVSignal]);

  // === Render minimized state ===
  if (!isExpanded) {
    return (
      <button
        onClick={handleToggleExpanded}
        className={`maya-rov-minimized ${className}`}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: currentEntity.color,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'transform 0.2s ease'
        }}
        aria-label={`Open chat with ${currentEntity.name}`}
      >
        {currentEntity.emoji}
        {openLoops.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {openLoops.length}
          </span>
        )}
      </button>
    );
  }

  // === Render full component ===
  return (
    <div 
      className={`maya-rov-container ${className}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: compact ? '320px' : '400px',
        height: compact ? '450px' : '550px',
        backgroundColor: '#fff',
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
          backgroundColor: currentEntity.color,
          color: 'white',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{currentEntity.emoji}</span>
          <div>
            <div style={{ fontWeight: 600 }}>{currentEntity.name}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>{currentEntity.title}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowChildInfo(!showChildInfo)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '14px'
            }}
            aria-label="Show family info"
          >
            👨‍👩‍👧‍👦
          </button>
          <button
            onClick={handleToggleExpanded}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px'
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
        fontSize: '12px',
        color: '#6c757d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Stage {currentStage}: {stageDef.label}</span>
        <span style={{
          backgroundColor: getMoodColor(currentMood),
          color: 'white',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '10px'
        }}>
          {currentMood}
        </span>
      </div>

      {/* Child info panel (collapsible) */}
      {showChildInfo && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          maxHeight: '150px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
            The Family
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.entries(CHILD_METADATA).map(([id, child]) => (
              <button
                key={id}
                onClick={() => {
                  if (id !== 'maya' && id !== activeEntity) {
                    handleRouteToChild(id as ActiveChild, 'User selected', 'exploration');
                  }
                }}
                disabled={id === activeEntity}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  border: id === activeEntity ? `2px solid ${child.color}` : '1px solid #dee2e6',
                  backgroundColor: id === activeEntity ? child.color : 'white',
                  color: id === activeEntity ? 'white' : '#333',
                  fontSize: '11px',
                  cursor: id === activeEntity ? 'default' : 'pointer',
                  opacity: id === activeEntity ? 1 : 0.8
                }}
              >
                <span>{child.emoji}</span>
                <span>{child.name}</span>
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
          fontSize: '12px',
          color: '#856404'
        }}>
          📌 You have {openLoops.length} open {openLoops.length === 1 ? 'thread' : 'threads'}
          {openLoops[0] && `: "${openLoops[0].topic}" with ${CHILD_METADATA[openLoops[0].childId as ActiveChild]?.name || openLoops[0].childId}`}
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Welcome message if empty */}
        {conversation.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#6c757d',
            padding: '20px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {currentEntity.emoji}
            </div>
            <div style={{ fontWeight: 500 }}>
              Welcome to the kitchen table
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              {needsAssessment 
                ? "Before we begin, let me ask you something..."
                : `${currentEntity.name} is here to help.`
              }
            </div>
          </div>
        )}

        {/* Conversation messages */}
        {conversation.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '4px',
                fontSize: '11px',
                color: '#6c757d'
              }}>
                <span>{CHILD_METADATA[msg.entity]?.emoji}</span>
                <span>{CHILD_METADATA[msg.entity]?.name}</span>
                {msg.stance && (
                  <span style={{
                    backgroundColor: getStanceColor(msg.stance),
                    color: 'white',
                    padding: '1px 6px',
                    borderRadius: '8px',
                    fontSize: '9px',
                    marginLeft: '4px'
                  }}>
                    {msg.stance}
                  </span>
                )}
              </div>
            )}
            <div
              style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' 
                  ? '16px 16px 4px 16px' 
                  : '16px 16px 16px 4px',
                backgroundColor: msg.role === 'user' 
                  ? '#007bff' 
                  : msg.metadata?.type === 'child-introduction'
                    ? '#e8f4fd'
                    : '#f1f3f4',
                color: msg.role === 'user' ? 'white' : '#333',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}
            >
              {msg.content}
            </div>
            <div style={{
              fontSize: '10px',
              color: '#adb5bd',
              marginTop: '2px'
            }}>
              {formatTime(msg.timestamp)}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6c757d'
          }}>
            <span>{currentEntity.emoji}</span>
            <div style={{
              display: 'flex',
              gap: '4px'
            }}>
              <span className="maya-typing-dot" style={{ animationDelay: '0ms' }}>•</span>
              <span className="maya-typing-dot" style={{ animationDelay: '150ms' }}>•</span>
              <span className="maya-typing-dot" style={{ animationDelay: '300ms' }}>•</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${currentEntity.name}...`}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '20px',
              border: '1px solid #dee2e6',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: inputValue.trim() ? currentEntity.color : '#dee2e6',
              color: 'white',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'background-color 0.2s ease'
            }}
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
        
        {/* Quick actions */}
        {activeEntity === 'maya' && shouldMayaKeep() === false && (
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            flexWrap: 'wrap'
          }}>
            {getMostTrustedChild() && (
              <button
                onClick={() => {
                  const trusted = getMostTrustedChild();
                  if (trusted) handleRouteToChild(trusted, 'User chose trusted child', 'continuation');
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid #dee2e6',
                  backgroundColor: 'white',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Talk to {CHILD_METADATA[getMostTrustedChild()!]?.name}
              </button>
            )}
          </div>
        )}
      </div>

      {/* CSS for typing animation */}
      <style>{`
        @keyframes mayaTyping {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }
        .maya-typing-dot {
          animation: mayaTyping 1.4s infinite;
          font-size: 20px;
        }
        .maya-rov-minimized:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function extractTopic(message: string): string {
  // Simple topic extraction - first few words or key phrase
  const words = message.split(' ').slice(0, 5).join(' ');
  return words.length > 30 ? words.substring(0, 30) + '...' : words;
}

function detectMoodFromMessage(message: string): MemberMood | null {
  const lower = message.toLowerCase();
  
  if (/overwhelmed|can't cope|too much|stressed out|panic/.test(lower)) return 'overwhelmed';
  if (/frustrated|annoying|not working|broken|failed/.test(lower)) return 'frustrated';
  if (/sad|hopeless|depressed|down|struggling/.test(lower)) return 'distressed';
  if (/excited|amazing|great|awesome|breakthrough/.test(lower)) return 'excited';
  if (/wondering|curious|what if|how does/.test(lower)) return 'curious';
  if (/going to|will do|ready to|determined/.test(lower)) return 'determined';
  if (/focused|in the zone|working on/.test(lower)) return 'focused';
  if (/not sure|unsure|maybe|confused/.test(lower)) return 'uncertain';
  
  return null;
}

function getMoodColor(mood: MemberMood): string {
  const colors: Record<MemberMood, string> = {
    excited: '#10b981',
    neutral: '#6c757d',
    curious: '#8b5cf6',
    frustrated: '#f59e0b',
    distressed: '#ef4444',
    determined: '#3b82f6',
    overwhelmed: '#dc2626',
    focused: '#06b6d4',
    uncertain: '#9ca3af',
    celebratory: '#22c55e'
  };
  return colors[mood] || '#6c757d';
}

function getStanceColor(stance: ROVStance): string {
  const colors: Record<ROVStance, string> = {
    rigorous: '#dc2626',
    observant: '#8b5cf6',
    versatile: '#10b981'
  };
  return colors[stance];
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getHandoffMessage(from: ActiveChild, to: ActiveChild): string {
  const toMeta = CHILD_METADATA[to];
  
  if (from === 'maya') {
    const messages = [
      `Go talk to ${toMeta.name}. ${toMeta.title} will help you with this.`,
      `${toMeta.name} is the one for this. ${toMeta.emoji} They know about ${toMeta.domain.toLowerCase()}.`,
      `I'm sending you to ${toMeta.name}. Come back when you're ready.`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  const fromMeta = CHILD_METADATA[from];
  return `${fromMeta.name} thinks you should talk to ${toMeta.name} about this. ${toMeta.emoji}`;
}

async function simulateResponse(
  message: string, 
  entity: ActiveChild, 
  stage: PedagogicalStage
): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const meta = CHILD_METADATA[entity];
  
  // Simple response simulation based on entity
  const responses: Record<ActiveChild, string[]> = {
    maya: [
      "Tell me more about what's on your mind.",
      "I'm listening. What matters most to you right now?",
      "Before we go further—how are you feeling about this?"
    ],
    kweku: [
      "Interesting. But who's paying for this? And why would they?",
      "That's what you hope. What do you actually know?",
      "Have you talked to anyone who'd pay for this?"
    ],
    ntikuma: [
      "Let's look at the numbers. What does this actually cost?",
      "I notice a pattern here. You're avoiding something.",
      "The numbers don't lie. They just wait for you to look."
    ],
    anansewa: [
      "That was polished. Now do it again and mean it.",
      "You're performing. When will you let yourself be?",
      "Breathe. From your belly. Now speak."
    ],
    kofi: [
      "Stop explaining. Build it.",
      "What have you actually made? Show me.",
      "It failed? Good. Now we know something."
    ],
    afua: [
      "Every story has a spine. What's yours?",
      "That's a list. Tell me like it matters.",
      "Your voice is hiding. Let me hear the real one."
    ],
    yaw: [
      "If we don't write it down, it didn't happen.",
      "That's an opinion. What's the evidence?",
      "What's the story no one's telling?"
    ],
    esi: [
      "Who taught you this? Their name goes in the book.",
      "A recipe without a story is just instructions.",
      "What's the oldest thing you know how to make?"
    ],
    kumi: [
      "Play like it matters. Because it does.",
      "You're reacting, not thinking. What's your opponent likely to do next?",
      "That was a throw. Let's analyse why."
    ],
    adaeze: [
      "What is this piece trying to say?",
      "Beautiful and boring are not opposites. Interesting is what we're after.",
      "Your hands know things your mood board doesn't."
    ],
    nyame: [
      "That's what you want to do. But should you?",
      "There are no easy answers here. Let's think through it.",
      "What would you do if no one was watching?"
    ],
    osei: [
      "Who benefits from things staying the same?",
      "Power isn't given. It's taken or built.",
      "The meeting is where decisions are made. Are you in the room?"
    ],
    akua: [
      "Do you have that in writing?",
      "Know your rights. But also know what enforcing them costs.",
      "Document everything. Memory is not evidence."
    ]
  };
  
  const entityResponses = responses[entity] || responses.maya;
  return entityResponses[Math.floor(Math.random() * entityResponses.length)];
}

// ============================================
// EXPORTS
// ============================================

export default MayaCreatorROV;