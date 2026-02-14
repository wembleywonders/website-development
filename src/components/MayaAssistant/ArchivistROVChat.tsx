/**
 * Archivist ROV Chat Component
 * ============================
 * 
 * Chat interface for Community Archivists to interact with
 * Auntie Anansi in Archivist Mode.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuntieAnansiArchivist } from '../../hooks/useAuntieAnansiArchivist';
import type { ArchivistProfile, CrossROVRequest } from '../../types/rovs/archivist.types';
import styles from './ArchivistROVChat.module.scss';

// ============================================
// TYPES
// ============================================

interface ArchivistROVChatProps {
  archivistProfile: ArchivistProfile;
  onCrossROVRequest?: (request: CrossROVRequest) => void;
  onWellbeingAlert?: (level: 'check-in' | 'concern' | 'urgent', reason: string) => void;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

export const ArchivistROVChat: React.FC<ArchivistROVChatProps> = ({
  archivistProfile,
  onCrossROVRequest,
  onWellbeingAlert,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isInitialised,
    currentPhase,
    messages,
    isProcessing,
    lastResponse,
    sendMessage,
    clearHistory,
  } = useAuntieAnansiArchivist({
    profile: archivistProfile,
    onCrossROVRequest,
    onWellbeingAlert,
  });
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle send
  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const message = inputValue.trim();
    setInputValue('');
    await sendMessage(message);
  };
  
  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Phase indicator
  const getPhaseLabel = (phase: string): string => {
    const labels: Record<string, string> = {
      onboarding: '🌱 Getting Started',
      preparation: '📋 Preparing',
      'pre-interview': '🎤 About to Interview',
      active: '🎧 Recording',
      'post-interview': '✨ Processing',
      submission: '📤 Submitting',
      reflection: '🌿 Reflecting',
      mentoring: '👥 Mentoring',
    };
    return labels[phase] || phase;
  };
  
  if (!isInitialised) {
    return (
      <div className={`${styles.chat} ${className || ''}`}>
        <div className={styles.loading}>
          <span className={styles.spinner}>🕷️</span>
          <p>Auntie Anansi is preparing...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${styles.chat} ${className || ''}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.avatar}>🕷️</span>
          <div className={styles.headerText}>
            <h3>Auntie Anansi</h3>
            <span className={styles.mode}>Archivist Mode</span>
          </div>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.phase}>{getPhaseLabel(currentPhase)}</span>
          <button 
            className={styles.clearBtn}
            onClick={clearHistory}
            title="Clear conversation"
          >
            🗑️
          </button>
        </div>
      </header>
      
      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${styles[msg.role]}`}
          >
            {msg.role === 'auntie' && (
              <span className={styles.messageAvatar}>
                {msg.response?.expression || '🕷️'}
              </span>
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageText}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              
              {/* Suggested Actions */}
              {msg.response?.suggestedActions && (
                <div className={styles.actions}>
                  {msg.response.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      className={`${styles.actionBtn} ${styles[action.priority]}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Cross-ROV Handoff */}
              {msg.response?.crossROVHandoff && (
                <div className={styles.crossROV}>
                  <span className={styles.crossROVIcon}>🔗</span>
                  <span>
                    Connecting to{' '}
                    <strong>{msg.response.crossROVHandoff.targetROV}</strong>
                  </span>
                </div>
              )}
              
              {/* Wellbeing Flag */}
              {msg.response?.wellbeingFlag && (
                <div className={`${styles.wellbeing} ${styles[msg.response.wellbeingFlag.level]}`}>
                  <span className={styles.wellbeingIcon}>💚</span>
                  <span>Wellbeing check triggered</span>
                </div>
              )}
              
              <span className={styles.timestamp}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {/* Processing indicator */}
        {isProcessing && (
          <div className={`${styles.message} ${styles.auntie}`}>
            <span className={styles.messageAvatar}>🕷️</span>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <button onClick={() => sendMessage("Help me prepare for an interview")}>
          📋 Prepare
        </button>
        <button onClick={() => sendMessage("I need help with a difficult moment")}>
          🤝 Difficult Moment
        </button>
        <button onClick={() => sendMessage("How do I submit my interview?")}>
          📤 Submit
        </button>
        <button onClick={() => sendMessage("I need to talk about how I'm feeling")}>
          💚 Wellbeing
        </button>
      </div>
      
      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Auntie Anansi anything about oral history..."
          disabled={isProcessing}
          rows={1}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!inputValue.trim() || isProcessing}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ArchivistROVChat;