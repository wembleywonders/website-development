import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import MayaAvatar from './avatar/MayaAvatar';
import { MayaExpression } from '../../types/maya/avatar';
import { ConversationMessage, PageContext } from '../../types/maya/conversation';
import { conversationPersistence } from '../../services/maya/conversation/conversationPersistence';
import { rovIntegration } from '../../services/maya/conversation/rovIntegration';
import './DraggableMaya.css';

interface DraggableMayaProps {
  membershipTier: 'visitor' | 'membership' | 'connector' | 'curator' | 'champion' | 'apply';
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
  pageContext 
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [currentExpression, setCurrentExpression] = useState<MayaExpression>('neutral');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [quickActions, setQuickActions] = useState<Array<{text: string, action: string}>>([]);
  
  const dragRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // ── Quick actions ──────────────────────────────────────────────────────────

  const getQuickActionsForPage = (
    pageType: string,
    membershipTier: string,
    data?: Record<string, any>
  ) => {
    const baseActions = [
      { text: "What can you do?", action: "capabilities" },
      { text: "Site navigation help", action: "navigation" }
    ];

    const pageSpecificActions: Record<string, Array<{text: string, action: string}>> = {
      shop: [
        { text: "Community marketplace", action: "shop_guide" },
        { text: "Support local business", action: "local_business" },
        { text: "Creator earnings info", action: "creator_info" }
      ],
      programme: [
        { text: "Which programme suits me?", action: "programme_match" },
        { text: "Skill development paths", action: "skills_guide" },
        { text: "Workshop schedules", action: "workshop_info" }
      ],
      community: [
        { text: "Community support options", action: "community_help" },
        { text: "How to get involved", action: "involvement_guide" },
        { text: "Local community hubs", action: "hub_info" }
      ],
      framework: [
        { text: "5C Framework explained", action: "framework_guide" },
        { text: "Organisation structure", action: "org_structure" },
        { text: "How we share power", action: "governance_info" }
      ],
      // ── Discovery (Bright Sparks) — state-aware ────────────────────────────
      discovery: (() => {
        const completed = data?.challengesCompleted ?? 0;
        const track = data?.selectedTrack;

        if (track === 'migrating') {
          return [
            { text: "What can I bring across?", action: "migration_content" },
            { text: "How does the 55% work?", action: "revenue_model" },
            { text: "TECHreneurs onboarding", action: "techreneurs_info" },
            { text: "Talk to the team", action: "contact_team" }
          ];
        }

        if (completed === 0) {
          return [
            { text: "Which challenge should I try?", action: "challenge_advice" },
            { text: "What happens after this?", action: "journey_overview" },
            { text: "Tell me about the programmes", action: "programme_overview" },
            { text: "How does the 55% work?", action: "revenue_model" }
          ];
        }

        if (completed >= 1 && completed < 3) {
          return [
            { text: "Which programme fits me?", action: "programme_match" },
            { text: `I've done ${completed} — what next?`, action: "progress_advice" },
            { text: "Tell me about STEMgeneers", action: "stemgeneers_info" },
            { text: "How does the 55% work?", action: "revenue_model" }
          ];
        }

        // completed >= 3
        return [
          { text: "Help me choose a programme", action: "programme_match" },
          { text: "What is TECHreneurs?", action: "techreneurs_info" },
          { text: "When can I start earning?", action: "earning_timeline" },
          { text: "How does the 55% work?", action: "revenue_model" }
        ];
      })()
    };

    const membershipActions: Record<string, Array<{text: string, action: string}>> = {
      visitor: [{ text: "Membership benefits", action: "membership_info" }],
      membership: [{ text: "My member benefits", action: "member_dashboard" }],
      apply: [{ text: "Application help", action: "application_guide" }]
    };

    return [
      ...baseActions,
      ...(pageSpecificActions[pageType] || []),
      ...(membershipActions[membershipTier] || [])
    ].slice(0, 4);
  };

  // ── Effects ────────────────────────────────────────────────────────────────

  // Recompute quick actions when progress or track changes
  useEffect(() => {
    setQuickActions(
      getQuickActionsForPage(pageType, membershipTier, pageContext?.data)
    );
  }, [pageType, membershipTier, pageContext?.data?.challengesCompleted, pageContext?.data?.selectedTrack]); // ✅ Only primitive dependencies

  // Load conversation state on mount
  useEffect(() => {
    const savedState = conversationPersistence.loadConversationState();
    if (savedState && savedState.messages.length > 0) {
      setMessages(savedState.messages);
      setPosition(savedState.dragPosition || { x: 20, y: 20 });
    } else {
      const contextualWelcome = getContextualWelcome(pageType, pageContext?.title, pageContext?.data);
      const welcomeMessage: ConversationMessage = {
        id: `maya-${Date.now()}`,
        text: contextualWelcome,
        sender: 'maya',
        timestamp: new Date(),
        pageContext: location.pathname,
        expression: 'helpful'
      };
      setMessages([welcomeMessage]);
      conversationPersistence.addMessage(welcomeMessage);
    }
  }, []); // ✅ Only run once on mount

  // Separate effect for handling location changes
  useEffect(() => {
    conversationPersistence.updatePageContext({
      route: location.pathname,
      title: pageContext?.title || document.title,
      section: getPageSection(location.pathname),
      userIntent: 'browsing'
    });
  }, [location.pathname]); // ✅ Only update when location actually changes

  // ── Welcome message ────────────────────────────────────────────────────────

  const getContextualWelcome = (
    pageType: string,
    pageTitle?: string,
    data?: Record<string, any>
  ): string => {
    if (pageType === 'discovery') {
      const completed = data?.challengesCompleted ?? 0;
      const track = data?.selectedTrack;

      if (track === 'migrating') {
        return `Hi! I'm Maya. You're looking at bringing existing work across — good move. I can walk you through what content migrates cleanly, how the 55/25/20 split works in practice, and what TECHreneurs onboarding looks like. What do you want to know first?`;
      }

      if (completed === 0) {
        return `Hi! I'm Maya. Bright Sparks is where every Wembley Wonders journey starts — try 3 mini-challenges from different programmes, see what clicks, and walk away with a clear next step. Not sure which challenge to pick first? Ask me and I'll point you somewhere useful.`;
      }

      if (completed >= 1 && completed < 3) {
        return `Good to see you back — you've completed ${completed} challenge${completed > 1 ? 's' : ''} so far. Keep going — complete 3 to unlock your programme recommendations. If something you tried is pulling you in, tell me and I can tell you more about that programme.`;
      }

      // completed >= 3
      return `You've completed ${completed} challenges — you've earned a proper look at where you fit. I can help you compare programmes, understand what TECHreneurs adds on top, or talk through the 55% model before you commit. What's on your mind?`;
    }

    const welcomeMessages: Record<string, string> = {
      shop: `Hi! I'm Maya, your Technical Assistant. I can help you navigate our community marketplace, find local businesses to support, and understand creator opportunities. ${pageTitle ? `You're viewing ${pageTitle} - ` : ''}what interests you?`,
      programme: `Hello! I'm Maya, here to guide you through our programmes. I can help match you with the right learning pathway, explain our seasonal workshops, and connect you with skill development opportunities. What would you like to explore?`,
      community: `Hi there! I'm Maya, your community guide. I can help you find support services, connect with local hubs, and understand how to get more involved in building community wealth in Wembley. How can I assist?`,
      framework: `Welcome! I'm Maya, here to explain how Wembley Wonders works. I can guide you through our 5C Framework, explain our community ownership model, and show you how we share power. What would you like to understand?`,
      standard: `Hello! I'm Maya, your intelligent community guide. I remember our conversations across pages and provide contextual help. **New here?** Try the quick actions below or ask me anything about Wembley Wonders!`
    };

    return welcomeMessages[pageType] || welcomeMessages.standard;
  };

  const getPageSection = (pathname: string): 'home' | 'about' | 'programs' | 'membership' | 'business' | 'apply' => {
    if (pathname.includes('/membership') || pathname.includes('/apply')) return 'membership';
    if (pathname.includes('/about')) return 'about';
    if (pathname.includes('/programmes') || pathname.includes('/workshops')) return 'programs';
    if (pathname.includes('/community-investment') || pathname.includes('/business')) return 'business';
    if (pathname.includes('/apply')) return 'apply';
    return 'home';
  };

  // ── Enrich prompt with Bright Sparks context ──────────────────────────────

  const buildEnrichedPrompt = (userText: string): string => {
    if (pageType !== 'discovery' || !pageContext?.data) return userText;

    const { challengesCompleted = 0, selectedTrack, completedChallengeIds = [] } = pageContext.data;

    const lines = [
      `[BRIGHT SPARKS CONTEXT]`,
      `Track: ${selectedTrack ?? 'not yet selected'}`,
      `Challenges completed: ${challengesCompleted}/3`,
      completedChallengeIds.length
        ? `Completed challenges: ${completedChallengeIds.join(', ')}`
        : null,
      `[USER MESSAGE]`,
      userText
    ].filter(Boolean);

    return lines.join('\n');
  };

  // ── Messaging ──────────────────────────────────────────────────────────────

  const handleQuickAction = async (action: string, text: string) => {
    setInputText('');
    setCurrentExpression('thinking');
    setIsTyping(true);

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
      pageContext: location.pathname
    };

    setMessages(prev => [...prev, userMessage]);
    conversationPersistence.addMessage(userMessage);

    try {
      const savedState = conversationPersistence.loadConversationState();
      const response = await rovIntegration.getContextualResponse(
        buildEnrichedPrompt(text),
        location.pathname,
        savedState?.userJourney || [location.pathname],
        membershipTier
      );

      const mayaMessage: ConversationMessage = {
        id: `maya-${Date.now()}`,
        text: response.text,
        sender: 'maya',
        timestamp: new Date(),
        pageContext: location.pathname,
        expression: response.expression,
        rovPersonality: response.personality
      };

      setMessages(prev => [...prev, mayaMessage]);
      conversationPersistence.addMessage(mayaMessage);
      setCurrentExpression(response.expression);
      setIsTyping(false);
    } catch (error) {
      console.error('Maya quick action error:', error);
      
      const errorMessage: ConversationMessage = {
        id: `maya-${Date.now()}`,
        text: "I'm having trouble with that request. Please try again, or ask me directly what you need help with.",
        sender: 'maya',
        timestamp: new Date(),
        pageContext: location.pathname,
        expression: 'concerned'
      };

      setMessages(prev => [...prev, errorMessage]);
      setCurrentExpression('concerned');
      setIsTyping(false);
    }
  };

  // Clear conversation handler
  const handleClearConversation = () => {
    setShowClearConfirm(false);
    conversationPersistence.clearConversation();
    
    const contextualWelcome = getContextualWelcome(pageType, pageContext?.title, pageContext?.data);
    const welcomeMessage: ConversationMessage = {
      id: `maya-${Date.now()}`,
      text: contextualWelcome,
      sender: 'maya',
      timestamp: new Date(),
      pageContext: location.pathname,
      expression: 'helpful'
    };
    
    setMessages([welcomeMessage]);
    conversationPersistence.addMessage(welcomeMessage);
    setCurrentExpression('helpful');
  };

  // ── Drag handlers ──────────────────────────────────────────────────────────

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (chatRef.current && chatRef.current.contains(e.target as Node)) return;
    if ((e.target as Element).closest('.header-controls')) return;
    
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = Math.max(0, Math.min(window.innerWidth - 350, e.clientX - dragOffset.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.y));
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      conversationPersistence.updateDragPosition(position);
    }
  }, [isDragging, position]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // ── Enhanced message sending with page context ─────────────────────────────

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      pageContext: location.pathname
    };

    setMessages(prev => [...prev, userMessage]);
    conversationPersistence.addMessage(userMessage);
    setInputText('');
    setCurrentExpression('thinking');
    setIsTyping(true);

    try {
      const savedState = conversationPersistence.loadConversationState();
      const response = await rovIntegration.getContextualResponse(
        buildEnrichedPrompt(inputText),
        location.pathname,
        savedState?.userJourney || [location.pathname],
        membershipTier
      );

      const mayaMessage: ConversationMessage = {
        id: `maya-${Date.now()}`,
        text: response.text,
        sender: 'maya',
        timestamp: new Date(),
        pageContext: location.pathname,
        expression: response.expression,
        rovPersonality: response.personality
      };

      setMessages(prev => [...prev, mayaMessage]);
      conversationPersistence.addMessage(mayaMessage);
      setCurrentExpression(response.expression);
      setIsTyping(false);
    } catch (error) {
      console.error('Maya response error:', error);
      
      const errorMessage: ConversationMessage = {
        id: `maya-${Date.now()}`,
        text: "I'm having trouble responding right now. Please try again, or let me know if you need immediate assistance.",
        sender: 'maya',
        timestamp: new Date(),
        pageContext: location.pathname,
        expression: 'concerned'
      };

      setMessages(prev => [...prev, errorMessage]);
      setCurrentExpression('concerned');
      setIsTyping(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div 
      ref={dragRef}
      className={`draggable-maya ${isDragging ? 'dragging' : ''} ${pageType ? `page-${pageType}` : ''}`}
      style={{ 
        left: position.x, 
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {!isOpen && (
        <div className="maya-minimized" onClick={() => setIsOpen(true)}>
          <MayaAvatar 
            expression={currentExpression} 
            size="medium" 
            animated={!isDragging}
          />
          <div className="conversation-indicator">
            {messages.length > 1 && (
              <span className="message-count">{messages.length}</span>
            )}
            {pageType !== 'standard' && (
              <span className="page-type-indicator">{pageType}</span>
            )}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div ref={chatRef} className="maya-expanded" onClick={(e) => e.stopPropagation()}>
          <div className="maya-header">
            <div className="header-content">
              <MayaAvatar 
                expression={isTyping ? 'thinking' : currentExpression} 
                size="small" 
                animated={true}
              />
              <div className="header-text">
                <span>Maya - Technical Assistant</span>
                <small>
                  {pageType === 'discovery'
                    ? `Discovery guide · ${pageContext?.data?.challengesCompleted ?? 0}/3 challenges`
                    : pageContext?.title
                      ? `Help for ${pageContext.title}`
                      : 'Contextual guidance & support'}
                </small>
              </div>
            </div>
            <div className="header-controls">
              {!showClearConfirm ? (
                <>
                  <button 
                    onClick={() => setShowClearConfirm(true)} 
                    className="clear-button"
                    title="Clear conversation history"
                  >
                    🗑️
                  </button>
                  <button onClick={() => setIsOpen(false)} className="minimize-button">−</button>
                </>
              ) : (
                <>
                  <button onClick={handleClearConversation} className="confirm-clear">✓</button>
                  <button onClick={() => setShowClearConfirm(false)} className="cancel-clear">✕</button>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          {quickActions.length > 0 && messages.length <= 1 && (
            <div className="quick-actions">
              <div className="quick-actions-label">Quick help:</div>
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.action, action.text)}
                    disabled={isTyping}
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="maya-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === 'maya' && (
                  <div className="message-avatar">
                    <MayaAvatar 
                      expression={msg.expression || 'neutral'} 
                      size="small" 
                      animated={false}
                    />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  {msg.pageContext && msg.pageContext !== location.pathname && (
                    <div className="context-tag">From {msg.pageContext}</div>
                  )}
                  {msg.rovPersonality && (
                    <div className="rov-tag">via {msg.rovPersonality}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message maya typing">
                <div className="message-avatar">
                  <MayaAvatar expression="thinking" size="small" animated={true} />
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="maya-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                pageType === 'discovery'
                  ? 'Ask Maya about programmes, challenges, or the 55% model...'
                  : `Ask Maya about ${pageType === 'standard' ? 'anything' : pageType + ' topics'}...`
              }
              disabled={isTyping}
            />
            <button onClick={handleSendMessage} disabled={isTyping || !inputText.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableMaya;