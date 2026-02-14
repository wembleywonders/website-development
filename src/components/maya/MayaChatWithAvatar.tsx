import React, { useState, useEffect } from 'react';
import MayaAvatar from './avatar/MayaAvatar';
import { MayaExpression } from '../../types/maya/avatar';
import './MayaChatWithAvatar.css';

interface Message {
  id: number;
  text: string;
  sender: 'maya' | 'user';
  timestamp: Date;
  expression?: MayaExpression;
}

interface MayaChatWithAvatarProps {
  membershipTier: 'visitor' | 'membership' | 'connector' | 'curator' | 'champion' | 'apply';
  userId?: string;
}

const MayaChatWithAvatar: React.FC<MayaChatWithAvatarProps> = ({ membershipTier, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<MayaExpression>('neutral');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Maya, your community guide. How can I help you explore Wembley Wonders today?",
      sender: 'maya',
      timestamp: new Date(),
      expression: 'helpful'
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Determine expression based on conversation context
  const getExpressionForResponse = (responseText: string): MayaExpression => {
    if (responseText.includes('sorry') || responseText.includes('unfortunately')) {
      return 'concerned';
    }
    if (responseText.includes('thinking') || responseText.includes('let me check')) {
      return 'thinking';
    }
    if (responseText.includes('great') || responseText.includes('excellent')) {
      return 'excited';
    }
    return 'helpful';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setCurrentExpression('thinking');
    setIsTyping(true);

    // Simulate Maya processing
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you find information about our programmes.",
        "I'd be happy to guide you through our community resources. What specific area interests you most?",
        "Our business partnership opportunities might be perfect for what you're looking for. Would you like to learn more?",
        "I can help you navigate our seasonal programmes. Each one offers unique skills development opportunities."
      ];

      const responseText = responses[Math.floor(Math.random() * responses.length)];
      const expression = getExpressionForResponse(responseText);

      const response: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'maya',
        timestamp: new Date(),
        expression
      };

      setMessages(prev => [...prev, response]);
      setCurrentExpression(expression);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    const lastMayaMessage = messages.filter(m => m.sender === 'maya').pop();
    if (lastMayaMessage?.expression) {
      setCurrentExpression(lastMayaMessage.expression);
    }
  }, [messages]);

  return (
    <div className="maya-chat-with-avatar">
      {!isOpen && (
        <button 
          className="maya-toggle-with-avatar"
          onClick={() => setIsOpen(true)}
        >
          <MayaAvatar 
            expression={currentExpression} 
            size="medium" 
            animated={true}
          />
          <span className="toggle-text">Maya Help</span>
        </button>
      )}
      
      {isOpen && (
        <div className="maya-chat-window-with-avatar">
          <div className="maya-header-with-avatar">
            <div className="header-content">
              <MayaAvatar 
                expression={isTyping ? 'thinking' : currentExpression} 
                size="small" 
                animated={true}
              />
              <span>Maya - Community Guide</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-button">×</button>
          </div>
          
          <div className="maya-messages-with-avatar">
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
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message maya typing">
                <div className="message-avatar">
                  <MayaAvatar 
                    expression="thinking" 
                    size="small" 
                    animated={true}
                  />
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="maya-input-with-avatar">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask Maya anything..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !inputText.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MayaChatWithAvatar;
