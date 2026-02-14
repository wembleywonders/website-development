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
  pageType?: 'standard' | 'shop' | 'programme' | 'community' | 'framework';
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

  // Generate contextual quick actions based on page type - moved outside useCallback to prevent dependencies
  const getQuickActionsForPage = (pageType: string, membershipTier: string) => {
    const baseActions = [
      { text: "What can you do?", action: "capabilities" },
      { text: "Site navigation help", action: "navigation" }
    ];

    const pageSpecificActions = {
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
        { text: "Organization structure", action: "org_structure" },
        { text: "How we share power", action: "governance_info" }
      ]
    };

    const membershipActions = {
      visitor: [{ text: "Membership benefits", action: "membership_info" }],
      membership: [{ text: "My member benefits", action: "member_dashboard" }],
      apply: [{ text: "Application help", action: "application_guide" }]
    };

    return [
      ...baseActions,
      ...(pageSpecificActions[pageType as keyof typeof pageSpecificActions] || []),
      ...(membershipActions[membershipTier as keyof typeof membershipActions] || [])
    ].slice(0, 4); // Limit to 4 quick actions
  };

  // Update quick actions when page type or membership changes - FIXED: removed function from dependency array
  useEffect(() => {
    setQuickActions(getQuickActionsForPage(pageType, membershipTier));
  }, [pageType, membershipTier]); // ✅ Only primitive dependencies

  // Load conversation state on mount - FIXED: added proper dependency array
  useEffect(() => {
    const savedState = conversationPersistence.loadConversationState();
    if (savedState && savedState.messages.length > 0) {
      setMessages(savedState.messages);
      setPosition(savedState.dragPosition || { x: 20, y: 20 });
    } else {
      const contextualWelcome = getContextualWelcome(pageType, pageContext?.title);
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
  }, []); // ✅ Only run once on mount - remove location.pathname dependency to prevent loops

  // Separate effect for handling location changes - FIXED: prevents infinite loops
  useEffect(() => {
    conversationPersistence.updatePageContext({
      route: location.pathname,
      title: pageContext?.title || document.title,
      section: getPageSection(location.pathname),
      userIntent: 'browsing'
    });
  }, [location.pathname]); // ✅ Only update when location actually changes

  // Generate contextual welcome message
  const getContextualWelcome = (pageType: string, pageTitle?: string): string => {
    const welcomeMessages = {
      shop: `Hi! I'm Maya, your Technical Assistant. I can help you navigate our community marketplace, find local businesses to support, and understand creator opportunities. ${pageTitle ? `You're viewing ${pageTitle} - ` : ''}what interests you?`,
      programme: `Hello! I'm Maya, here to guide you through our programmes. I can help match you with the right learning pathway, explain our seasonal workshops, and connect you with skill development opportunities. What would you like to explore?`,
      community: `Hi there! I'm Maya, your community guide. I can help you find support services, connect with local hubs, and understand how to get more involved in building community wealth in Wembley. How can I assist?`,
      framework: `Welcome! I'm Maya, here to explain how Wembley Wonders works. I can guide you through our 5C Framework, explain our community ownership model, and show you how we share power. What would you like to understand?`,
      standard: `Hello! I'm Maya, your intelligent community guide. I remember our conversations across pages and provide contextual help. **New here?** Try the quick actions below or ask me anything about Wembley Wonders!`
    };

    return welcomeMessages[pageType as keyof typeof welcomeMessages] || welcomeMessages.standard;
  };

  const getPageSection = (pathname: string): 'home' | 'about' | 'programs' | 'membership' | 'business' | 'apply' => {
    if (pathname.includes('/membership') || pathname.includes('/apply')) return 'membership';
    if (pathname.includes('/about')) return 'about';
    if (pathname.includes('/programmes') || pathname.includes('/workshops')) return 'programs';
    if (pathname.includes('/community-investment') || pathname.includes('/business')) return 'business';
    if (pathname.includes('/apply')) return 'apply';
    return 'home';
  };

  // Handle quick action clicks
  const handleQuickAction = async (action: string, text: string) => {
    setInputText('');
    setCurrentExpression('thinking');
    setIsTyping(true);

    const userMessage: ConversationMessage = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      timestamp: new Date(),
      pageContext: location.pathname
    };

    setMessages(prev => [...prev, userMessage]);
    conversationPersistence.addMessage(userMessage);

    try {
      const savedState = conversationPersistence.loadConversationState();
      const response = await rovIntegration.getContextualResponse(
        text,
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
    
    const contextualWelcome = getContextualWelcome(pageType, pageContext?.title);
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

  // Drag handlers - FIXED: removed unnecessary dependencies
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

  // Enhanced message sending with page context
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
        inputText,
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
                <small>{pageContext?.title ? `Help for ${pageContext.title}` : 'Contextual guidance & support'}</small>
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

          {/* Quick Actions Section */}
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
              placeholder={`Ask Maya about ${pageType === 'standard' ? 'anything' : pageType + ' topics'}...`}
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