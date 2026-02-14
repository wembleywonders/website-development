/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaConversation - Sandbox-Embedded Maya Component
 * 
 * UPDATED: Now compatible with unified mayaStore structure
 * 
 * A simpler, inline version of Maya for embedding directly in sandbox UIs.
 * Unlike MayaCompanion (floating panel), this integrates into the content flow.
 * 
 * Key features:
 * - Community visibility: "Others like you" messages
 * - Gatekeeper bypass: "No approval needed" messaging  
 * - Push without judgment: Encouraging without evaluating
 * - ROV Integration: Can introduce children contextually
 * 
 * Usage:
 * - In sandbox sidebars
 * - Within content panels
 * - As contextual guidance inline with work
 */

import React, { useState, useEffect } from 'react';
import { 
  useMayaStore, 
  useMayaMode, 
  useMayaStage, 
  useMayaTracking,
  useMayaCommunity,
  useMayaROV,
  useMayaPreferences
} from '../../../stores/mayaStore';
import { 
  MayaMessageType, 
  PedagogicalStage, 
  STAGE_MESSAGES,
  PUSH_MESSAGES,
  ActiveChild,
  getRandomMessage,
  getChildIntroduction
} from '../../../types/mayaTypes';
import styles from './MayaConversation.module.css';

// ============================================
// MAYA CONVERSATION PROPS
// ============================================

interface MayaConversationProps {
  /** The message to display */
  message?: string;
  /** Message type for styling */
  type?: MayaMessageType;
  /** Show avatar */
  showAvatar?: boolean;
  /** Current tool context */
  currentTool?: string;
  /** Current sandbox/programme */
  sandboxId?: string;
  /** Callback when user responds */
  onResponse?: (response: string) => void;
  /** Custom className */
  className?: string;
  /** Variant: inline (in content) or panel (sidebar) */
  variant?: 'inline' | 'panel' | 'minimal';
  /** Which entity is speaking (for ROV integration) */
  entity?: ActiveChild;
}

// ============================================
// CHILD METADATA (for avatars)
// ============================================

const CHILD_AVATARS: Record<ActiveChild, { emoji: string; label: string }> = {
  maya: { emoji: '👩🏿‍🦱', label: 'Maya' },
  kweku: { emoji: '🎯', label: 'Kweku' },
  ntikuma: { emoji: '📊', label: 'Ntikuma' },
  anansewa: { emoji: '🎭', label: 'Anansewa' },
  kofi: { emoji: '🔧', label: 'Kofi' },
  afua: { emoji: '🎙️', label: 'Afua' },
  yaw: { emoji: '📝', label: 'Yaw' },
  esi: { emoji: '📚', label: 'Esi' },
  kumi: { emoji: '🎮', label: 'Kumi' },
  adaeze: { emoji: '✂️', label: 'Adaeze' },
  nyame: { emoji: '⚖️', label: 'Nyame' },
  osei: { emoji: '✊', label: 'Osei' },
  akua: { emoji: '📜', label: 'Akua' }
};

// ============================================
// HELPER: Get stage messages safely
// ============================================

const getStageMessages = (stage: PedagogicalStage) => {
  return STAGE_MESSAGES[stage] || STAGE_MESSAGES[1];
};

// ============================================
// MAIN COMPONENT
// ============================================

const MayaConversation: React.FC<MayaConversationProps> = ({
  message,
  type = 'narration',
  showAvatar = true,
  currentTool,
  sandboxId,
  onResponse,
  className = '',
  variant = 'inline',
  entity = 'maya'
}) => {
  const { currentStage } = useMayaStage();
  const { currentMode, shouldShowInline, isProactive } = useMayaMode();
  const { trackAction } = useMayaTracking();
  const { communityStats } = useMayaCommunity();
  const { activeEntity } = useMayaROV();
  const { preferences } = useMayaPreferences();
  const addMessage = useMayaStore((s) => s.addMessage);
  
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [localType, setLocalType] = useState<MayaMessageType>(type);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const stageMessages = getStageMessages(currentStage);
  
  // Use active entity from store if not explicitly provided
  const displayEntity = entity || activeEntity;
  const avatarInfo = CHILD_AVATARS[displayEntity] || CHILD_AVATARS.maya;
  
  // Get contextual message based on stage if no message provided
  useEffect(() => {
    if (!message && isProactive && preferences.showHints) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        const messageTypes: ('hint' | 'communityMirror' | 'gatekeeperBypass')[] = [
          'hint', 
          'communityMirror', 
          'gatekeeperBypass'
        ];
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        const messages = stageMessages[randomType];
        
        if (messages && messages.length > 0) {
          let text = getRandomMessage(messages);
          
          // Inject real community stats if available
          if (communityStats && randomType === 'communityMirror') {
            text = text
              .replace(/47/g, communityStats.totalCreators.toString());
          }
          
          setLocalMessage(text);
          setLocalType(
            randomType === 'communityMirror' ? 'community-mirror' :
            randomType === 'gatekeeperBypass' ? 'gatekeeper-bypass' :
            'narration'
          );
        }
        setIsTyping(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [message, isProactive, currentStage, preferences.showHints, stageMessages, communityStats]);
  
  // Determine what message to show
  const displayMessage = message || localMessage;
  const displayType = message ? type : localType;
  
  // Don't render if Maya is disabled or no message in WITNESS mode
  if (!preferences.mayaEnabled) return null;
  if (!displayMessage && !isTyping && currentMode === 'WITNESS') return null;
  
  // Handle user input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onResponse?.(inputValue.trim());
      trackAction('direction_action');
      setInputValue('');
    }
  };
  
  // Get type indicator emoji
  const getTypeIndicator = () => {
    switch (displayType) {
      case 'community-mirror': return '🌐';
      case 'gatekeeper-bypass': return '🚀';
      case 'ignition': return '🎯';
      case 'push': return '💪';
      case 'reflection': return '💡';
      case 'pattern': return '🔍';
      case 'child-introduction': return '👋';
      case 'child-return': return '🏠';
      case 'independence-recognition': return '🌟';
      default: return null;
    }
  };
  
  // Get appropriate response prompt based on type
  const getResponsePrompt = () => {
    switch (displayType) {
      case 'reflection':
        return 'Share your thought...';
      case 'tradeoff':
        return 'Your choice...';
      case 'three-questions':
        return 'Tell me...';
      default:
        return null;
    }
  };
  
  const responsePrompt = getResponsePrompt();
  const typeIndicator = getTypeIndicator();
  
  return (
    <div className={`${styles.mayaConversation} ${styles[variant]} ${styles[displayType]} ${className}`}>
      {showAvatar && (
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <span>{avatarInfo.emoji}</span>
          </div>
          {variant !== 'minimal' && (
            <span className={styles.avatarLabel}>{avatarInfo.label}</span>
          )}
        </div>
      )}
      
      <div className={styles.content}>
        {isTyping ? (
          <div className={styles.typing}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : displayMessage ? (
          <>
            <p className={styles.message}>
              {typeIndicator && <span className={styles.typeIndicator}>{typeIndicator}</span>}
              {displayMessage}
            </p>
            
            {responsePrompt && onResponse && (
              <form onSubmit={handleSubmit} className={styles.responseForm}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={responsePrompt}
                  className={styles.responseInput}
                />
                <button 
                  type="submit" 
                  className={styles.responseSubmit}
                  disabled={!inputValue.trim()}
                >
                  →
                </button>
              </form>
            )}
          </>
        ) : null}
        
        {/* Stage indicator for development */}
        {process.env.NODE_ENV === 'development' && variant === 'panel' && (
          <div className={styles.stageIndicator}>
            Stage {currentStage} — {currentMode} — {displayEntity}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// SPECIALIZED VARIANTS
// ============================================

/**
 * Maya welcome message at start of sandbox
 */
export const MayaWelcome: React.FC<{ sandboxId?: string }> = ({ sandboxId }) => {
  const { currentStage } = useMayaStage();
  const { communityStats } = useMayaCommunity();
  const stageMessages = getStageMessages(currentStage);
  
  // Get welcome message with community stats injected
  let welcomeMessage = getRandomMessage(stageMessages.welcome);
  if (communityStats) {
    welcomeMessage = welcomeMessage
      .replace(/47/g, communityStats.totalCreators.toString());
  }
  
  return (
    <MayaConversation
      message={welcomeMessage}
      type="narration"
      variant="panel"
      sandboxId={sandboxId}
    />
  );
};

/**
 * Maya hint that appears contextually
 */
export const MayaHint: React.FC<{ 
  hint?: string;
  tool?: string;
  onDismiss?: () => void;
}> = ({ hint, tool, onDismiss }) => {
  const { currentStage } = useMayaStage();
  const stageMessages = getStageMessages(currentStage);
  const displayHint = hint || getRandomMessage(stageMessages.hint);
  
  return (
    <div className={styles.hintWrapper}>
      <MayaConversation
        message={displayHint}
        type="intent"
        variant="inline"
        currentTool={tool}
        showAvatar={false}
      />
      {onDismiss && (
        <button className={styles.hintDismiss} onClick={onDismiss}>
          Got it
        </button>
      )}
    </div>
  );
};

/**
 * Maya encouragement after an action
 */
export const MayaEncouragement: React.FC<{ 
  action?: string;
  custom?: string;
}> = ({ action, custom }) => {
  const { currentStage } = useMayaStage();
  const stageMessages = getStageMessages(currentStage);
  const message = custom || getRandomMessage(stageMessages.encouragement);
  
  return (
    <MayaConversation
      message={message}
      type="narration"
      variant="minimal"
      showAvatar={true}
    />
  );
};

/**
 * Maya reflection prompt at end of work
 */
export const MayaReflection: React.FC<{
  onResponse: (response: string) => void;
  custom?: string;
}> = ({ onResponse, custom }) => {
  const { currentStage } = useMayaStage();
  const stageMessages = getStageMessages(currentStage);
  const message = custom || getRandomMessage(stageMessages.reflection);
  
  return (
    <MayaConversation
      message={message}
      type="reflection"
      variant="panel"
      onResponse={onResponse}
    />
  );
};

/**
 * Maya silent indicator - shows Maya is watching but not speaking
 */
export const MayaSilentIndicator: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  const { currentMode } = useMayaMode();
  
  // Only show in WITNESS mode
  if (currentMode !== 'WITNESS') return null;
  
  return (
    <button className={styles.silentIndicator} onClick={onClick}>
      <span className={styles.silentAvatar}>👩🏿‍🦱</span>
      <span className={styles.silentLabel}>Maya is here if you need</span>
    </button>
  );
};

/**
 * Maya concept explainer - introduces a concept
 */
export const MayaConceptIntro: React.FC<{
  conceptId: string;
  conceptName: string;
  definition: string;
  onLearnMore?: () => void;
}> = ({ conceptId, conceptName, definition, onLearnMore }) => {
  return (
    <div className={styles.conceptIntro}>
      <MayaConversation
        message={`${conceptName}: ${definition}`}
        type="intent"
        variant="inline"
      />
      {onLearnMore && (
        <button className={styles.learnMore} onClick={onLearnMore}>
          Learn more
        </button>
      )}
    </div>
  );
};

/**
 * Maya community mirror - shows "others like you" message
 */
export const MayaCommunityMirror: React.FC<{
  custom?: string;
}> = ({ custom }) => {
  const { currentStage } = useMayaStage();
  const { communityStats } = useMayaCommunity();
  const { preferences } = useMayaPreferences();
  const stageMessages = getStageMessages(currentStage);
  
  if (!preferences.communityMessagesEnabled) return null;
  
  let message = custom || getRandomMessage(stageMessages.communityMirror);
  
  // Inject real stats
  if (communityStats) {
    message = message
      .replace(/47/g, communityStats.totalCreators.toString());
  }
  
  return (
    <MayaConversation
      message={message}
      type="community-mirror"
      variant="panel"
      showAvatar={true}
    />
  );
};

/**
 * Maya gatekeeper bypass - "no approval needed" message
 */
export const MayaGatekeeperBypass: React.FC<{
  custom?: string;
}> = ({ custom }) => {
  const { currentStage } = useMayaStage();
  const stageMessages = getStageMessages(currentStage);
  const message = custom || getRandomMessage(stageMessages.gatekeeperBypass);
  
  return (
    <MayaConversation
      message={message}
      type="gatekeeper-bypass"
      variant="inline"
      showAvatar={true}
    />
  );
};

/**
 * Maya push - non-judgmental encouragement (what Joseph's mother did)
 */
export const MayaPush: React.FC<{
  custom?: string;
}> = ({ custom }) => {
  const { currentStage } = useMayaStage();
  const message = custom || getRandomMessage(PUSH_MESSAGES[currentStage]);
  
  return (
    <MayaConversation
      message={message}
      type="push"
      variant="minimal"
      showAvatar={true}
    />
  );
};

/**
 * Maya ignition celebration - stage transition moment
 */
export const MayaIgnition: React.FC<{
  custom?: string;
}> = ({ custom }) => {
  const { currentStage } = useMayaStage();
  const stageMessages = getStageMessages(currentStage);
  const message = custom || getRandomMessage(stageMessages.ignitionMoment);
  
  return (
    <MayaConversation
      message={message}
      type="ignition"
      variant="panel"
      showAvatar={true}
    />
  );
};

/**
 * Maya success story - highlights a community member's achievement
 */
export const MayaSuccessStory: React.FC<{
  name: string;
  area: string;
  achievement: string;
  timeAgo: string;
  quote?: string;
  guidedBy?: ActiveChild;
}> = ({ name, area, achievement, timeAgo, quote, guidedBy }) => {
  const childInfo = guidedBy ? CHILD_AVATARS[guidedBy] : null;
  const message = `${name} from ${area} ${achievement} ${timeAgo}.${quote ? ` "${quote}"` : ''}${childInfo ? ` (guided by ${childInfo.label})` : ''}`;
  
  return (
    <div className={styles.successStory}>
      <div className={styles.successHeader}>
        <span className={styles.successIcon}>🌟</span>
        <span>Community Spotlight</span>
      </div>
      <MayaConversation
        message={message}
        type="community-mirror"
        variant="inline"
        showAvatar={false}
      />
    </div>
  );
};

/**
 * Maya pathway reminder - "this IS the place" message
 */
export const MayaPathwayReminder: React.FC = () => {
  const messages = [
    "This isn't preparation for somewhere else. This IS the place.",
    "Create here. Earn here. Build here. No gatekeepers.",
    "The path isn't through them. It's through this.",
    "You don't need their approval. You need to make something."
  ];
  
  return (
    <MayaConversation
      message={getRandomMessage(messages)}
      type="gatekeeper-bypass"
      variant="panel"
      showAvatar={true}
    />
  );
};

/**
 * NEW: Child Introduction - Maya introduces a child
 */
export const MayaChildIntroduction: React.FC<{
  childId: ActiveChild;
  custom?: string;
}> = ({ childId, custom }) => {
  const { currentStage } = useMayaStage();
  const message = custom || getChildIntroduction(currentStage, childId);
  const childInfo = CHILD_AVATARS[childId];
  
  return (
    <div className={styles.childIntroduction}>
      <MayaConversation
        message={message}
        type="child-introduction"
        variant="panel"
        showAvatar={true}
        entity="maya"
      />
      <div className={styles.childPreview}>
        <span className={styles.childEmoji}>{childInfo.emoji}</span>
        <span className={styles.childName}>{childInfo.label}</span>
      </div>
    </div>
  );
};

/**
 * NEW: Independence Recognition - celebrates growth
 */
export const MayaIndependenceRecognition: React.FC<{
  achievement: string;
  custom?: string;
}> = ({ achievement, custom }) => {
  const messages = [
    `You didn't need me for that. You see it now.`,
    `You diagnosed the problem yourself. That's growth.`,
    `That decision was all you. Good.`,
    `Six months ago you would have asked me. You don't need me for this anymore.`
  ];
  
  const message = custom || getRandomMessage(messages);
  
  return (
    <MayaConversation
      message={message}
      type="independence-recognition"
      variant="panel"
      showAvatar={true}
    />
  );
};

/**
 * NEW: Child Speaking - when a child (not Maya) is the speaker
 */
export const ChildSpeaking: React.FC<{
  childId: ActiveChild;
  message: string;
  type?: MayaMessageType;
  variant?: 'inline' | 'panel' | 'minimal';
  onResponse?: (response: string) => void;
}> = ({ childId, message, type = 'narration', variant = 'panel', onResponse }) => {
  return (
    <MayaConversation
      message={message}
      type={type}
      variant={variant}
      showAvatar={true}
      entity={childId}
      onResponse={onResponse}
    />
  );
};

export default MayaConversation;