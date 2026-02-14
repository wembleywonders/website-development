/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

// SERVICE BAY IP PROTECTION RUNTIME
(function () {
  const COMPONENT_TYPE = 'maya-companion';
})();

/**
 * MayaCompanion - Main Maya AI Component
 * 
 * Implements the full pedagogical state machine with:
 * - ACTIVE mode: Inline overlays, proactive tips
 * - WITNESS mode: Collapsed icon, pull-only
 * - PARTNER mode: Minimal presence, pattern sharing
 * 
 * Key features:
 * - Community visibility: "Others like you" messages
 * - Gatekeeper bypass: "No approval needed" messaging
 * - Push without judgment: Encouraging without evaluating
 * 
 * Maya's silence is not absence—it's the sound of the user's own voice becoming primary.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  useMayaStore, 
  useMayaMode, 
  useMayaMessages, 
  useMayaStage
} from '../stores/mayaStore';
import useMayaCommunity from '../stores/mayaStore';
import { 
  MayaMessage, 
  MayaMode, 
  STAGE_DEFINITIONS,
  STAGE_MESSAGES,
  getRandomMessage 
} from '../types/mayaTypes';
import styles from './MayaCompanion.module.css';

// ============================================
// MAYA AVATAR
// ============================================

interface MayaAvatarProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  hasUnread?: boolean;
}

const MayaAvatar: React.FC<MayaAvatarProps> = ({ 
  size = 'medium', 
  animated = false,
  hasUnread = false 
}) => {
  return (
    <div className={`${styles.avatar} ${styles[size]} ${animated ? styles.animated : ''}`}>
      <span className={styles.avatarEmoji}>👩🏾‍💼</span>
      {hasUnread && <span className={styles.unreadDot} />}
    </div>
  );
};

// ============================================
// MAYA MESSAGE BUBBLE
// ============================================

interface MayaMessageBubbleProps {
  message: MayaMessage;
  onResponse?: (response: string) => void;
}

const MayaMessageBubble: React.FC<MayaMessageBubbleProps> = ({ message, onResponse }) => {
  const [responded, setResponded] = useState(false);
  
  const handleResponse = (response: string) => {
    setResponded(true);
    onResponse?.(response);
  };
  
  // Get message type label for accessibility
  const getTypeLabel = () => {
    switch (message.type) {
      case 'community-mirror': return '🌍';
      case 'gatekeeper-bypass': return '🚀';
      case 'ignition': return '🎯';
      case 'push': return '💪';
      case 'reflection': return '💭';
      case 'pattern': return '🔍';
      default: return '';
    }
  };
  
  return (
    <div className={`${styles.messageBubble} ${styles[message.type]}`}>
      {getTypeLabel() && <span className={styles.typeLabel}>{getTypeLabel()}</span>}
      <p className={styles.messageText}>{message.text}</p>
      
      {message.requiresResponse && !responded && (
        <div className={styles.responseButtons}>
          {message.type === 're-entry' && (
            <>
              <button 
                className={styles.responseBtn}
                onClick={() => handleResponse('not-now')}
              >
                Not now
              </button>
              <button 
                className={`${styles.responseBtn} ${styles.primary}`}
                onClick={() => handleResponse('tell-me')}
              >
                Tell me
              </button>
            </>
          )}
          
          {message.type === 'session-end' && (
            <>
              <button 
                className={styles.responseBtn}
                onClick={() => handleResponse('nothing')}
              >
                Nothing comes to mind
              </button>
              <button 
                className={`${styles.responseBtn} ${styles.primary}`}
                onClick={() => handleResponse('yes')}
              >
                Yes, actually...
              </button>
            </>
          )}
          
          {message.type === 'reflection' && (
            <input 
              type="text"
              className={styles.reflectionInput}
              placeholder="Type your thought..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                  handleResponse((e.target as HTMLInputElement).value);
                }
              }}
            />
          )}
        </div>
      )}
      
      <span className={styles.messageTime}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

// ============================================
// MAYA INLINE OVERLAY (ACTIVE MODE)
// ============================================

interface MayaInlineOverlayProps {
  message: string;
  type?: string;
  onDismiss?: () => void;
}

export const MayaInlineOverlay: React.FC<MayaInlineOverlayProps> = ({ 
  message, 
  type = 'narration',
  onDismiss 
}) => {
  return (
    <div className={`${styles.inlineOverlay} ${styles[type]}`}>
      <MayaAvatar size="small" />
      <div className={styles.inlineContent}>
        <p>{message}</p>
        {onDismiss && (
          <button className={styles.dismissBtn} onClick={onDismiss}>
            Got it
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// MAYA COLLAPSED ICON (WITNESS MODE)
// ============================================

interface MayaCollapsedIconProps {
  onClick: () => void;
  hasUnread: boolean;
}

const MayaCollapsedIcon: React.FC<MayaCollapsedIconProps> = ({ onClick, hasUnread }) => {
  return (
    <button 
      className={styles.collapsedIcon}
      onClick={onClick}
      aria-label="Open Maya"
      title="Maya is here if you need"
    >
      <MayaAvatar size="medium" hasUnread={hasUnread} />
    </button>
  );
};

// ============================================
// MAYA CHAT PANEL
// ============================================

interface MayaChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: MayaMessage[];
  onSendMessage: (text: string) => void;
  onMessageResponse: (messageId: string, response: string) => void;
  mode: MayaMode;
  stage: number;
}

const MayaChatPanel: React.FC<MayaChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onMessageResponse,
  mode,
  stage
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };
  
  // Different placeholder based on mode
  const getPlaceholder = () => {
    switch (mode) {
      case 'ACTIVE':
        return 'Ask Maya anything...';
      case 'WITNESS':
      case 'PARTNER':
        return 'What are you thinking about?';
      default:
        return 'Type a message...';
    }
  };
  
  // Get Maya's current role description
  const getRoleDescription = () => {
    const stageDef = STAGE_DEFINITIONS[stage as 1|2|3|4|5];
    if (mode === 'WITNESS') {
      return 'Here when you need reflection';
    }
    if (mode === 'PARTNER') {
      return 'Your creative partner';
    }
    return stageDef.mayaRole;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <MayaAvatar size="small" />
          <div className={styles.chatHeaderInfo}>
            <span className={styles.chatHeaderName}>Maya</span>
            <span className={styles.chatHeaderStatus}>
              {getRoleDescription()}
            </span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      
      <div className={styles.chatMessages}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <MayaAvatar size="large" />
            <p>
              {mode === 'WITNESS' 
                ? "I'm here when you need reflection. No rush."
                : "This isn't preparation for somewhere else. This IS the place."
              }
            </p>
          </div>
        )}
        
        {messages.map((msg) => (
          <MayaMessageBubble 
            key={msg.id}
            message={msg}
            onResponse={(response) => onMessageResponse(msg.id, response)}
          />
        ))}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className={styles.chatInput} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={getPlaceholder()}
          className={styles.input}
        />
        <button 
          type="submit" 
          className={styles.sendBtn}
          disabled={!inputValue.trim()}
          aria-label="Send"
        >
          →
        </button>
      </form>
    </div>
  );
};

// ============================================
// MAIN MAYA COMPANION COMPONENT
// ============================================

interface MayaCompanionProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  sandboxId?: string;
}

export const MayaCompanion: React.FC<MayaCompanionProps> = ({
  className = '',
  position = 'bottom-right',
  sandboxId
}) => {
  const { currentMode, shouldShowInline, isProactive } = useMayaMode();
  const { currentStage } = useMayaStage();
  const { 
    messages, 
    addMessage, 
    // addStageMessage, // Removed because it does not exist
    // addGatekeeperBypass, // Removed: does not exist
    hasUnread, 
    markAsRead 
  } = useMayaMessages();
  const { communityStats } = useMayaCommunity();
  const isExpanded = useMayaStore((s) => s.isExpanded);
  const toggleExpanded = useMayaStore((s) => s.toggleExpanded);
  const setExpanded = useMayaStore((s) => s.setExpanded);
  const userPreferences = useMayaStore((s) => s.userPreferences);
  const shareInsight = useMayaStore((s) => s.shareInsight);
  const silentObservations = useMayaStore((s) => s.silentObservations);
  
  // Handle user sending a message
  const handleSendMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Detect key phrases and respond appropriately
    if (currentMode === 'WITNESS' || currentMode === 'PARTNER') {
      // Reflective response - ask a question back
      setTimeout(() => {
        addMessage(
          "What made you think of that?",
          'reflection'
        );
      }, 500);
    } else {
      // Check for breakthrough/ignition moments
      if (
        lowerText.includes('i could build') ||
        lowerText.includes('i want to create') ||
        lowerText.includes('i have an idea') ||
        lowerText.includes('what if i')
      ) {
        setTimeout(() => {
          addMessage(
            getRandomMessage(STAGE_MESSAGES[currentStage].ignitionMoment),
            'ignition'
          );
        }, 500);
      }
      // Check for struggle/stuck signals
      else if (
        lowerText.includes('stuck') ||
        lowerText.includes('confused') ||
        lowerText.includes('not working') ||
        lowerText.includes("don't know")
      ) {
        setTimeout(() => {
          addMessage(
            getRandomMessage(STAGE_MESSAGES[currentStage].pushMoment),
            'push'
          );
          // Follow up with gatekeeper bypass if relevant
          setTimeout(() => {
            addMessage(
              getRandomMessage(STAGE_MESSAGES[currentStage].gatekeeperBypass),
              'gatekeeper-bypass'
            );
          }, 2000);
        }, 500);
      }
      // Check for community questions
      else if (
        lowerText.includes('anyone else') ||
        lowerText.includes('am i the only') ||
        lowerText.includes('others')
      ) {
        setTimeout(() => {
          addCommunityMirror();
        }, 500);
      }
      // Default helpful response
      else {
        setTimeout(() => {
          addMessage(
            "I see what you're working on. Try experimenting—you can always undo. There's no wrong move here.",
            'narration'
          );
        }, 500);
      }
    }
  };
  
  // Handle response to Maya's questions
  const handleMessageResponse = (messageId: string, response: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    if (message.type === 're-entry' && response === 'tell-me') {
      // Share the pattern insight
      const insight = silentObservations.insights.find(i => !i.shared);
      if (insight) {
        shareInsight(insight.id);
        addMessage(
          insight.observation + " This isn't advice—it's a mirror.",
          'pattern'
        );
      }
    }
    
    if (message.type === 'session-end' && response === 'yes') {
      addMessage(
        "I'm listening. What stood out to you?",
        'reflection'
      );
    }
  };
  
  // Don't render if Maya is disabled
  if (!userPreferences.mayaEnabled) return null;
  
  return (
    <div className={`${styles.mayaCompanion} ${styles[position]} ${className}`}>
      {/* Collapsed icon (WITNESS/PARTNER mode) */}
      {!shouldShowInline && !isExpanded && (
        <MayaCollapsedIcon 
          onClick={() => {
            toggleExpanded();
            markAsRead();
          }}
          hasUnread={hasUnread}
        />
      )}
      
      {/* Floating button for ACTIVE mode when not expanded */}
      {shouldShowInline && !isExpanded && (
        <button 
          className={styles.floatingBtn}
          onClick={() => {
            toggleExpanded();
            markAsRead();
          }}
          aria-label="Open Maya"
        >
          <MayaAvatar size="medium" hasUnread={hasUnread} animated={hasUnread} />
        </button>
      )}
      
      {/* Chat panel */}
      <MayaChatPanel
        isOpen={isExpanded}
        onClose={() => setExpanded(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onMessageResponse={handleMessageResponse}
        mode={currentMode}
        stage={currentStage}
      />
      
      {/* Stage indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.devIndicator}>
          Stage {currentStage} | {currentMode}
        </div>
      )}
    </div>
  );
};

// ============================================
// MAYA CONTEXT PANEL (Sidebar Integration)
// ============================================

interface MayaContextPanelProps {
  currentTool?: string;
  currentAction?: string;
  className?: string;
}

export const MayaContextPanel: React.FC<MayaContextPanelProps> = ({
  currentTool,
  currentAction,
  className = ''
}) => {
  const { currentMode } = useMayaMode();
  const { currentStage } = useMayaStage();
  const userPreferences = useMayaStore((s) => s.userPreferences);
  
  // Only show in ACTIVE mode or when user has hints enabled
  if (currentMode !== 'ACTIVE' || !userPreferences.showHints) {
    return null;
  }
  
  // Context-sensitive hints based on current tool/action
  const getContextHint = () => {
    if (currentTool === 'layer') {
      return "Layers let you test ideas without committing—watch how toggling this changes the outcome.";
    }
    if (currentTool === 'undo') {
      return "Nothing is permanent here. Experiment freely.";
    }
    if (currentAction === 'stuck') {
      return getRandomMessage(STAGE_MESSAGES[currentStage].hint);
    }
    if (currentAction === 'first-action') {
      return getRandomMessage(STAGE_MESSAGES[currentStage].gatekeeperBypass);
    }
    return null;
  };
  
  const hint = getContextHint();
  if (!hint) return null;
  
  return (
    <div className={`${styles.contextPanel} ${className}`}>
      <div className={styles.contextHeader}>
        <MayaAvatar size="small" />
        <span>Maya</span>
      </div>
      <p className={styles.contextHint}>{hint}</p>
    </div>
  );
};

// ============================================
// MAYA STATUS BAR INDICATOR
// ============================================

interface MayaStatusIndicatorProps {
  onNextAction?: () => void;
  nextActionLabel?: string;
}

export const MayaStatusIndicator: React.FC<MayaStatusIndicatorProps> = ({
  onNextAction,
  nextActionLabel = 'Next →'
}) => {
  const { currentMode } = useMayaMode();
  const toggleExpanded = useMayaStore((s) => s.toggleExpanded);
  
  return (
    <div className={styles.statusIndicator}>
      <button 
        className={styles.statusMayaBtn}
        onClick={toggleExpanded}
        title="Talk to Maya"
      >
        💬
      </button>
      {onNextAction && currentMode !== 'ACTIVE' && (
        <button 
          className={styles.nextActionBtn}
          onClick={onNextAction}
        >
          {nextActionLabel}
        </button>
      )}
    </div>
  );
};

// ============================================
// MAYA COMMUNITY SPOTLIGHT
// For showing recent success stories
// ============================================

interface MayaCommunitySpotlightProps {
  className?: string;
}

export const MayaCommunitySpotlight: React.FC<MayaCommunitySpotlightProps> = ({
  className = ''
}) => {
  const { communityStats } = useMayaCommunity();
  const userPreferences = useMayaStore((s) => s.userPreferences);
  
  if (!userPreferences.communityMessagesEnabled || !communityStats) {
    return null;
  }
  
  const recentStory = communityStats.recentSuccessStories[0];
  if (!recentStory) return null;
  
  return (
    <div className={`${styles.communitySpotlight} ${className}`}>
      <div className={styles.spotlightHeader}>
        <span className={styles.spotlightIcon}>🌟</span>
        <span>Community Spotlight</span>
      </div>
      <p className={styles.spotlightText}>
        <strong>{recentStory.creatorFirstName}</strong> from {recentStory.area} {recentStory.achievement} {recentStory.timeAgo}.
      </p>
      {recentStory.quote && (
        <p className={styles.spotlightQuote}>"{recentStory.quote}"</p>
      )}
    </div>
  );
};

export default MayaCompanion;
import type { MayaMessageType } from '../types/mayaTypes';

function addCommunityMirror() {
  // Use addMessage to show a community-mirror message
  // Example: "Others have wondered about this too. You're not alone."
  addMessage(
    getRandomMessage([
      "Others have wondered about this too. You're not alone.",
      "You're not the only one thinking about this—many have asked similar questions.",
      "Others like you have explored this path. Want to see what they discovered?"
    ]),
    'community-mirror'
  );
}
function addMessage(text: string, type: MayaMessageType) {
  // Generate a unique ID for the message
  const id = Math.random().toString(36).substr(2, 9);
  // Use current timestamp
  const timestamp = new Date();
  // Default message object
  const message: MayaMessage = {
    id,
    text,
    type,
    timestamp,
    requiresResponse: type === 're-entry' || type === 'session-end' || type === 'reflection',
    // Provide default values for stage and mode, or retrieve them as needed
    stage: 1, // Replace with actual current stage if available
    mode: 'ACTIVE' // Replace with actual current mode if available
  };
  // Add the message to the store
  useMayaMessages().addMessage(
    message.text,
    message.type
  );
}

