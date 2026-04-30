import React, { useState } from 'react';
// SERVICE BAY IP PROTECTION RUNTIME
(function() {
  const COMPONENT_TYPE = 'community-platform';
  
  function validateServiceBayAccess() {
    if (typeof window === 'undefined') return true;
    
    const domain = window.location.hostname;
    
    const authorizedDomains = [
      'wembleywonders.org',
      'g-tech.org', 
      'localhost',
      '127.0.0.1'
    ];
    
    if (authorizedDomains.some(d => domain.includes(d))) {
      return true;
    }
    
    const corporateThreats = [
      'facebook.com', 'meta.com',
      'google.com', 'alphabet.com',
      'amazon.com', 'aws.com',
      'microsoft.com', 'azure.com',
      'virgin.com', 'virgingroup.com'
    ];
    
    if (corporateThreats.some(threat => domain.includes(threat))) {
      console.error('🚨 SERVICE BAY IP VIOLATION: Corporate access blocked');
      return false;
    }
    
    return true;
  }
  
  if (!validateServiceBayAccess()) {
    throw new Error(`SERVICE BAY IP PROTECTION: Unauthorized corporate access to ${COMPONENT_TYPE}`);
  }
})();

;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
import { SafeComponent } from '../wrapper/SafeReact';
// src/components/community/chat/LiveChat.tsx
;
import { Paperclip, Search } from 'lucide-react';

// Define supported languages type
type SupportedLanguage = 'en' | 'es' | 'fr' | 'zh' | 'ar' | 'hi' | 'pt';

interface Translations {
  en?: string;
  es?: string;
  fr?: string;
  zh?: string;
  ar?: string;
  hi?: string;
  pt?: string;
}

interface Message {
  id: string;
  text: string;
  translations?: Translations;
  originalLanguage: SupportedLanguage;
  parentId?: string;
  threadId?: string;
  sender: {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'away';
    avatar?: string;
    preferredLanguage: SupportedLanguage;
  };
  timestamp: Date;
  isCurrentUser: boolean;
  status: 'sent' | 'delivered' | 'read';
  reactions?: {
    emoji: string;
    users: string[];
  }[];
}

const SUPPORTED_LANGUAGES = [
  { code: 'en' as SupportedLanguage, name: 'English' },
  { code: 'es' as SupportedLanguage, name: 'Spanish' },
  { code: 'fr' as SupportedLanguage, name: 'French' },
  { code: 'zh' as SupportedLanguage, name: 'Chinese' },
  { code: 'ar' as SupportedLanguage, name: 'Arabic' },
  { code: 'hi' as SupportedLanguage, name: 'Hindi' },
  { code: 'pt' as SupportedLanguage, name: 'Portuguese' }
];

// Sample data with correct typing
const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Welcome to the community chat! 👋',
    translations: {
      es: '¡Bienvenido al chat de la comunidad! 👋',
      fr: 'Bienvenue sur le chat de la communauté! 👋',
      zh: '欢迎来到社区聊天! 👋',
      ar: 'مرحبا بكم في الدردشة المجتمعية! 👋',
      hi: 'समुदाय चैट में आपका स्वागत है! 👋',
      pt: 'Bem-vindo ao chat da comunidade! 👋'
    },
    originalLanguage: 'en',
    sender: {
      id: 'system',
      name: 'System',
      status: 'online',
      avatar: '/avatars/system.png',
      preferredLanguage: 'en'
    },
    timestamp: new Date(),
    isCurrentUser: false,
    status: 'read',
    reactions: [{ emoji: '👋', users: ['user1'] }]
  }
];

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected] = useState(true);

  const getDisplayMessages = () => {
    if (searchQuery) {
      return messages.filter(message => {
        const translatedText = message.translations?.[currentLanguage]?.toLowerCase() ?? '';
        const searchLower = searchQuery.toLowerCase();
        return (
          message.text.toLowerCase().includes(searchLower) ||
          translatedText.includes(searchLower) ||
          message.sender.name.toLowerCase().includes(searchLower)
        );
      });
    }
    return messages;
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      translations: {},
      originalLanguage: currentLanguage,
      sender: {
        id: 'current-user',
        name: 'You',
        status: 'online',
        preferredLanguage: currentLanguage
      },
      timestamp: new Date(),
      isCurrentUser: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const getMessageText = (message: Message): string => {
    if (message.translations && currentLanguage in message.translations) {
      return message.translations[currentLanguage] ?? message.text;
    }
    return message.text;
  };

  return (
    <div className="flex flex-col h-full md:h-[600px] bg-white rounded-lg shadow">
      {/* Header - Mobile Responsive */}
      <div className="p-3 md:p-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <h2 className="font-semibold text-gray-900">Chat</h2>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4">
          {/* Language Selector */}
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value as SupportedLanguage)}
            className="px-2 py-1 border rounded text-sm"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-4 py-1 text-sm border rounded"
            />
            <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Messages - Mobile Responsive */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
        {getDisplayMessages().map(message => (
          <div
            key={message.id}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[85%] md:max-w-[70%] flex">
              {!message.isCurrentUser && (
                <div className="mr-2 flex-shrink-0 hidden md:block">
                  <img
                    src={message.sender.avatar || '/avatars/default.png'}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              
              <div>
                {!message.isCurrentUser && (
                  <div className="text-sm text-gray-600 mb-1">
                    {message.sender.name}
                  </div>
                )}
                
                <div className={`rounded-lg p-3 ${
                  message.isCurrentUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {getMessageText(message)}
                </div>
                
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input - Mobile Responsive */}
      <div className="p-3 md:p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.querySelector('input');
            if (input?.value.trim()) {
              handleSendMessage(input.value.trim());
              input.value = '';
            }
          }}
          className="flex space-x-2"
        >
          <button
            type="button"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SafeComponent(LiveChat);