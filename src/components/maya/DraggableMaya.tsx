// src/components/maya/DraggableMaya.tsx
// Wired to rovMapping.ts — ROV identity, welcome, and quick actions
// all driven by pathname + membershipTier automatically

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MayaAvatar from './avatar/MayaAvatar';
import { MayaExpression } from '../../types/maya/avatar';
import { ConversationMessage } from '../../types/maya/conversation';
import { conversationPersistence } from '../../services/maya/conversation/conversationPersistence';
import { rovIntegration } from '../../services/maya/conversation/rovIntegration';
import {
  resolveROV,
  getROVWelcome,
  getROVQuickActions,
  ROVName,
  MembershipTier,
} from '../../utils/rovMapping';
import './DraggableMaya.css';

interface DraggableMayaProps {
  membershipTier: MembershipTier;
  userId?: string;
  pageType?: 'standard' | 'shop' | 'programme' | 'community' | 'framework' | 'discovery';
  pageContext?: {
    title: string;
    section: string;
    contentType?: string;
    page?: string;
    actions?: string[];
    data?: Record<string, any>;
  };
}

const DraggableMaya: React.FC<DraggableMayaProps> = ({
  membershipTier,
  userId,
  pageType = 'standard',
  pageContext,
}) => {
  const location = useLocation();
  const activeROV: ROVName = resolveROV(location.pathname, membershipTier);

  const [isOpen, setIsOpen]                     = useState(false);
  const [isDragging, setIsDragging]             = useState(false);
  const [position, setPosition]                 = useState({ x: 20, y: 20 });
  const [currentExpression, setCurrentExpression] = useState<MayaExpression>('neutral');
  const [isTyping, setIsTyping]                 = useState(false);
  const [messages, setMessages]                 = useState<ConversationMessage[]>([]);
  const [inputText, setInputText]               = useState('');
  const [dragOffset, setDragOffset]             = useState({ x: 0, y: 0 });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [quickActions, setQuickActions]         = useState<Array<{ text: string; action: string }>>([]);

  const dragRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const rovLabels: Record<ROVName, string> = {
    maya:     'Maya',
    narrator: 'The Narrator',
    maker:    'The Maker',
    merchant: 'The Merchant',
    keeper:   'The Keeper',
    guardian: 'The Guardian',
    weaver:   'The Weaver',
    spark:    'The Spark',
    elder:    'The Elder',
  };

  useEffect(() => {
    if (pageType === 'discovery') {
      const completed = pageContext?.data?.challengesCompleted ?? 0;
      const track     = pageContext?.data?.selectedTrack;
      if (track === 'migrating') {
        setQuickActions([
          { text: 'What can I bring across?', action: 'migration_content' },
          { text: 'How does the 55% work?',   action: 'revenue_model'    },
          { text: 'TECHreneurs onboarding',   action: 'techreneurs_info' },
          { text: 'Talk to the team',         action: 'contact_team'     },
        ]);
        return;
      }
      if (completed === 0) {
        setQuickActions([
          { text: 'Which challenge should I try?',  action: 'challenge_advice'   },
          { text: 'What happens after this?',       action: 'journey_overview'   },
          { text: 'Tell me about the programmes',   action: 'programme_overview' },
          { text: 'How does the 55% work?',         action: 'revenue_model'      },
        ]);
        return;
      }
      if (completed >= 1 && completed < 3) {
        setQuickActions([
          { text: 'Which programme fits me?',           action: 'programme_match' },
          { text: `I've done ${completed} — what next?`, action: 'progress_advice' },
          { text: 'Tell me about STEMgeneers',          action: 'stemgeneers_info'},
          { text: 'How does the 55% work?',             action: 'revenue_model'   },
        ]);
        return;
      }
      setQuickActions([
        { text: 'Help me choose a programme', action: 'programme_match'  },
        { text: 'What is TECHreneurs?',       action: 'techreneurs_info' },
        { text: 'When can I start earning?',  action: 'earning_timeline' },
        { text: 'How does the 55% work?',     action: 'revenue_model'    },
      ]);
      return;
    }
    setQuickActions(getROVQuickActions(activeROV, membershipTier, pageContext?.data));
  }, [pageType, membershipTier, activeROV, pageContext?.data?.challengesCompleted, pageContext?.data?.selectedTrack]);

  const buildWelcome = (): string => {
    if (pageType === 'discovery') {
      const completed = pageContext?.data?.challengesCompleted ?? 0;
      const track     = pageContext?.data?.selectedTrack;
      if (track === 'migrating') return `Hi! I'm Maya. You're looking at bringing existing work across — good move. I can walk you through what content migrates cleanly, how the 55/25/20 split works in practice, and what TECHreneurs onboarding looks like. What do you want to know first?`;
      if (completed === 0) return `Hi! I'm Maya. Bright Sparks is where every Wembley Wonders journey starts — try 3 mini-challenges from different programmes, see what clicks, and walk away with a clear next step. Not sure which challenge to pick first? Ask me and I'll point you somewhere useful.`;
      if (completed >= 1 && completed < 3) return `Good to see you back — you've completed ${completed} challenge${completed > 1 ? 's' : ''} so far. Keep going — complete 3 to unlock your programme recommendations.`;
      return `You've completed ${completed} challenges — you've earned a proper look at where you fit. I can help you compare programmes, understand what TECHreneurs adds on top, or talk through the 55% model before you commit. What's on your mind?`;
    }
    return getROVWelcome(activeROV, pageContext?.title, membershipTier);
  };

  useEffect(() => {
    const savedState = conversationPersistence.loadConversationState();
    if (savedState && savedState.messages.length > 0) {
      setMessages(savedState.messages);
      setPosition(savedState.dragPosition || { x: 20, y: 20 });
    } else {
      const welcomeMessage: ConversationMessage = {
        id: `maya-${Date.now()}`, text: buildWelcome(), sender: 'maya',
        timestamp: new Date(), pageContext: location.pathname, expression: 'helpful',
      };
      setMessages([welcomeMessage]);
      conversationPersistence.addMessage(welcomeMessage);
    }
  }, []);

  useEffect(() => {
    conversationPersistence.updatePageContext({
      route: location.pathname, title: pageContext?.title || document.title,
      section: getPageSection(location.pathname), userIntent: 'browsing',
    });
  }, [location.pathname]);

  const getPageSection = (pathname: string): 'home' | 'about' | 'programs' | 'membership' | 'business' | 'apply' => {
    if (pathname.includes('/membership') || pathname.includes('/apply')) return 'membership';
    if (pathname.includes('/about')) return 'about';
    if (pathname.includes('/programmes') || pathname.includes('/workshops')) return 'programs';
    if (pathname.includes('/community-investment') || pathname.includes('/business')) return 'business';
    return 'home';
  };

  const buildEnrichedPrompt = (userText: string): string => {
    if (pageType !== 'discovery' || !pageContext?.data) return userText;
    const { challengesCompleted = 0, selectedTrack, completedChallengeIds = [] } = pageContext.data;
    return [
      `[BRIGHT SPARKS CONTEXT]`, `Track: ${selectedTrack ?? 'not yet selected'}`,
      `Challenges completed: ${challengesCompleted}/3`,
      completedChallengeIds.length ? `Completed: ${completedChallengeIds.join(', ')}` : null,
      `[ACTIVE ROV: ${activeROV.toUpperCase()}]`, `[USER MESSAGE]`, userText,
    ].filter(Boolean).join('\n');
  };

  const handleQuickAction = async (action: string, text: string) => {
    setInputText(''); setCurrentExpression('thinking'); setIsTyping(true);
    const userMessage: ConversationMessage = { id: `user-${Date.now()}`, text, sender: 'user', timestamp: new Date(), pageContext: location.pathname };
    setMessages(prev => [...prev, userMessage]);
    conversationPersistence.addMessage(userMessage);
    try {
      const savedState = conversationPersistence.loadConversationState();
      const response = await rovIntegration.getContextualResponse(buildEnrichedPrompt(text), location.pathname, savedState?.userJourney || [location.pathname], membershipTier);
      const mayaMessage: ConversationMessage = { id: `maya-${Date.now()}`, text: response.text, sender: 'maya', timestamp: new Date(), pageContext: location.pathname, expression: response.expression, rovPersonality: response.personality };
      setMessages(prev => [...prev, mayaMessage]);
      conversationPersistence.addMessage(mayaMessage);
      setCurrentExpression(response.expression); setIsTyping(false);
    } catch {
      const err: ConversationMessage = { id: `maya-${Date.now()}`, text: "I'm having trouble with that request. Please try again.", sender: 'maya', timestamp: new Date(), pageContext: location.pathname, expression: 'concerned' };
      setMessages(prev => [...prev, err]); setCurrentExpression('concerned'); setIsTyping(false);
    }
  };

  const handleClearConversation = () => {
    setShowClearConfirm(false); conversationPersistence.clearConversation();
    const welcomeMessage: ConversationMessage = { id: `maya-${Date.now()}`, text: buildWelcome(), sender: 'maya', timestamp: new Date(), pageContext: location.pathname, expression: 'helpful' };
    setMessages([welcomeMessage]); conversationPersistence.addMessage(welcomeMessage); setCurrentExpression('helpful');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage: ConversationMessage = { id: `user-${Date.now()}`, text: inputText, sender: 'user', timestamp: new Date(), pageContext: location.pathname };
    setMessages(prev => [...prev, userMessage]); conversationPersistence.addMessage(userMessage);
    setInputText(''); setCurrentExpression('thinking'); setIsTyping(true);
    try {
      const savedState = conversationPersistence.loadConversationState();
      const response = await rovIntegration.getContextualResponse(buildEnrichedPrompt(inputText), location.pathname, savedState?.userJourney || [location.pathname], membershipTier);
      const mayaMessage: ConversationMessage = { id: `maya-${Date.now()}`, text: response.text, sender: 'maya', timestamp: new Date(), pageContext: location.pathname, expression: response.expression, rovPersonality: response.personality };
      setMessages(prev => [...prev, mayaMessage]); conversationPersistence.addMessage(mayaMessage);
      setCurrentExpression(response.expression); setIsTyping(false);
    } catch {
      const err: ConversationMessage = { id: `maya-${Date.now()}`, text: "I'm having trouble responding right now. Please try again.", sender: 'maya', timestamp: new Date(), pageContext: location.pathname, expression: 'concerned' };
      setMessages(prev => [...prev, err]); setCurrentExpression('concerned'); setIsTyping(false);
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (chatRef.current && chatRef.current.contains(e.target as Node)) return;
    if ((e.target as Element).closest('.header-controls')) return;
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: Math.max(0, Math.min(window.innerWidth - 350, e.clientX - dragOffset.x)), y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y)) });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) { setIsDragging(false); conversationPersistence.updateDragPosition(position); }
  }, [isDragging, position]);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const headerSubtitle = (): string => {
    if (pageType === 'discovery') return `Discovery guide · ${pageContext?.data?.challengesCompleted ?? 0}/3 challenges`;
    if (pageContext?.title) return `Help for ${pageContext.title}`;
    return 'Contextual guidance & support';
  };

  const inputPlaceholder = (): string => {
    if (pageType === 'discovery') return 'Ask about programmes, challenges, or the 55% model...';
    return `Ask ${rovLabels[activeROV]} anything...`;
  };

  return (
    <div ref={dragRef} className={`draggable-maya ${isDragging ? 'dragging' : ''} page-${pageType} rov-${activeROV}`}
      style={{ left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}>
      {!isOpen && (
        <div className="maya-minimized" onClick={() => setIsOpen(true)}>
          <MayaAvatar expression={currentExpression} size="medium" animated={!isDragging} rov={activeROV} />
          <div className="conversation-indicator">
            {messages.length > 1 && <span className="message-count">{messages.length}</span>}
            <span className="rov-badge">{rovLabels[activeROV]}</span>
          </div>
        </div>
      )}
      {isOpen && (
        <div ref={chatRef} className="maya-expanded" onClick={e => e.stopPropagation()}>
          <div className={`maya-header maya-header--${activeROV}`}>
            <div className="header-content">
              <MayaAvatar expression={isTyping ? 'thinking' : currentExpression} size="small" animated={true} rov={activeROV} showLabel={false} />
              <div className="header-text">
                <span>{rovLabels[activeROV]}</span>
                <small>{headerSubtitle()}</small>
              </div>
            </div>
            <div className="header-controls">
              {!showClearConfirm ? (
                <><button onClick={() => setShowClearConfirm(true)} className="clear-button" title="Clear conversation">🗑️</button>
                <button onClick={() => setIsOpen(false)} className="minimize-button">−</button></>
              ) : (
                <><button onClick={handleClearConversation} className="confirm-clear">✓</button>
                <button onClick={() => setShowClearConfirm(false)} className="cancel-clear">✕</button></>
              )}
            </div>
          </div>
          {quickActions.length > 0 && messages.length <= 1 && (
            <div className="quick-actions">
              <div className="quick-actions-label">Quick help:</div>
              <div className="quick-actions-grid">
                {quickActions.map((action, i) => (
                  <button key={i} className="quick-action-btn" onClick={() => handleQuickAction(action.action, action.text)} disabled={isTyping}>{action.text}</button>
                ))}
              </div>
            </div>
          )}
          <div className="maya-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === 'maya' && <div className="message-avatar"><MayaAvatar expression={msg.expression || 'neutral'} size="small" animated={false} rov={activeROV} /></div>}
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  {msg.pageContext && msg.pageContext !== location.pathname && <div className="context-tag">From {msg.pageContext}</div>}
                  {msg.rovPersonality && <div className="rov-tag">via {msg.rovPersonality}</div>}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message maya typing">
                <div className="message-avatar"><MayaAvatar expression="thinking" size="small" animated={true} rov={activeROV} /></div>
                <div className="typing-indicator"><span /><span /><span /></div>
              </div>
            )}
          </div>
          <div className="maya-input">
            <input type="text" value={inputText} onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder={inputPlaceholder()} disabled={isTyping} />
            <button onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableMaya;