/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaPathwaySelector - Guided Pathway Discovery Component
 * 
 * UPDATED: Compatible with unified mayaStore structure
 * 
 * A conversational interface where Maya guides users through
 * discovering their ideal creator pathway (STEMgeneer, TECHreneur, or Hybrid).
 * 
 * Features:
 * - Conversational Q&A flow
 * - Profile building based on responses
 * - Pathway recommendation with confidence scoring
 * - Integration with ROV children for specialized guidance
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  useMayaStore,
  useMayaStage,
  useMayaTracking,
  useMayaROV,
  useMayaPreferences
} from '../../maya/stores/mayaStore';
import {
  PedagogicalStage,
  STAGE_MESSAGES,
  getRandomMessage,
  ActiveChild
} from '../../maya/types/mayaTypes';

// ============================================
// TYPES
// ============================================

interface UserProfile {
  interests: string[];
  experience: 'beginner' | 'some-experience' | 'experienced';
  goals: string[];
  timeCommitment: 'casual' | 'part-time' | 'full-time';
  revenueGoal: 'learning' | 'side-income' | 'main-income';
  preferredLearning: 'hands-on' | 'guided' | 'independent';
}

interface PathwayRecommendation {
  pathway: 'stemgeneer' | 'techreneur' | 'hybrid';
  confidence: number;
  reasons: string[];
  recommendedTools: string[];
  estimatedTimeToFirstSale: string;
  revenueProjection: string;
  /** NEW: Recommended child guides for this pathway */
  recommendedChildren: ActiveChild[];
}

interface ConversationMessage {
  id: string;
  text: string;
  sender: 'maya' | 'user';
  timestamp: Date;
  options?: string[];
  isQuickResponse?: boolean;
}

interface MayaPathwaySelectorProps {
  className?: string;
  children?: React.ReactNode;
  onPathwaySelected?: (pathway: string, profile: Partial<UserProfile>) => void;
}

// ============================================
// PATHWAY TO CHILDREN MAPPING
// ============================================

const PATHWAY_CHILDREN: Record<string, ActiveChild[]> = {
  stemgeneer: ['kofi', 'kumi', 'yaw'],      // Building, Gaming, Documentation
  techreneur: ['kweku', 'ntikuma', 'afua'], // Business, Finance, Voice
  hybrid: ['kofi', 'kweku', 'adaeze']       // Building, Business, Fashion
};

// ============================================
// COMPONENT
// ============================================

const MayaPathwaySelector: React.FC<MayaPathwaySelectorProps> = ({ 
  className = '', 
  children, 
  onPathwaySelected 
}) => {
  // === Store Hooks ===
  const { currentStage } = useMayaStage();
  const { trackAction } = useMayaTracking();
  const { routeToChild } = useMayaROV();
  const { preferences } = useMayaPreferences();
  const addMessage = useMayaStore((s) => s.addMessage);
  const recordTopicDiscussed = useMayaStore((s) => s.recordTopicDiscussed);
  
  // === Local State ===
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [recommendation, setRecommendation] = useState<PathwayRecommendation | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // === Conversation Steps ===
  const conversationSteps = [
    {
      question: "Hi! I'm Maya, your creative guide! 🏠 What kind of things spark your curiosity?",
      options: [
        'Building robots and gadgets 🤖',
        'Creating digital art and content 🎨',
        'Starting a business or selling online 💼',
        'Programming and AI 💻',
        'Science experiments and engineering 🔬',
        'Marketing and social media 📱',
        "I'm curious about everything! 🌟",
      ],
      key: 'interests',
    },
    {
      question: 'Awesome choice! How would you describe your current experience level?',
      options: [
        "Complete beginner - I'm just starting out 🌱",
        "Some experience - I've dabbled a bit 🌿",
        'Experienced - I know my way around 🌳',
      ],
      key: 'experience',
    },
    {
      question: "What's your main goal right now?",
      options: [
        'Learn new skills and have fun 📚',
        'Build something I can show off 🏆',
        'Make some extra money on the side 💰',
        'Start a serious business venture 🚀',
        'Express my creativity 🎭',
        'Solve real-world problems 🌍',
      ],
      key: 'goals',
    },
    {
      question: 'How much time can you dedicate to creating?',
      options: [
        'Just weekends - keeping it casual 🏖️',
        'Few hours per week - steady progress 📅',
        'This is my main focus right now! ⚡',
      ],
      key: 'timeCommitment',
    },
    {
      question: "What's your revenue goal?",
      options: [
        'Not focused on money - just learning 🎓',
        '£50-£500/month would be nice 💷',
        '£1,000+ per month - serious income 💵',
      ],
      key: 'revenueGoal',
    },
    {
      question: 'How do you prefer to learn?',
      options: [
        'Jump in and figure it out as I go 🏄‍♂️',
        'Step-by-step guidance please 👨‍🏫',
        'I like exploring on my own 🗺️',
      ],
      key: 'preferredLearning',
    },
  ];

  // === Initialize conversation ===
  useEffect(() => {
    // Get stage-appropriate welcome
    const stageMessages = STAGE_MESSAGES[currentStage as PedagogicalStage];
    const welcomePrefix = stageMessages?.welcome?.[0] || '';
    
    addMayaMessage(conversationSteps[0].question, conversationSteps[0].options);
    recordTopicDiscussed('pathway-selection');
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMayaMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(
      () => {
        const message: ConversationMessage = {
          id: Date.now().toString(),
          text,
          sender: 'maya',
          timestamp: new Date(),
          options,
        };
        setConversation(prev => [...prev, message]);
        setIsTyping(false);
      },
      800 + Math.random() * 700
    );
  };

  const addUserMessage = (text: string) => {
    const message: ConversationMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setConversation(prev => [...prev, message]);
    
    // Track the action
    trackAction('direction_action');
  };

  const handleOptionSelect = (option: string, stepKey: string) => {
    addUserMessage(option);

    // Update user profile based on selection
    const updatedProfile = { ...userProfile };

    switch (stepKey) {
      case 'interests':
        updatedProfile.interests = updatedProfile.interests || [];
        if (option.includes('robots') || option.includes('programming') || option.includes('science')) {
          updatedProfile.interests.push('stem');
        }
        if (option.includes('business') || option.includes('marketing') || option.includes('selling')) {
          updatedProfile.interests.push('business');
        }
        if (option.includes('art') || option.includes('content')) {
          updatedProfile.interests.push('creative');
        }
        if (option.includes('everything')) {
          updatedProfile.interests.push('stem', 'business', 'creative');
        }
        break;
      case 'experience':
        updatedProfile.experience = option.includes('beginner')
          ? 'beginner'
          : option.includes('Some')
            ? 'some-experience'
            : 'experienced';
        break;
      case 'goals':
        updatedProfile.goals = updatedProfile.goals || [];
        updatedProfile.goals.push(option.toLowerCase());
        break;
      case 'timeCommitment':
        updatedProfile.timeCommitment = option.includes('weekends')
          ? 'casual'
          : option.includes('Few hours')
            ? 'part-time'
            : 'full-time';
        break;
      case 'revenueGoal':
        updatedProfile.revenueGoal = option.includes('Not focused')
          ? 'learning'
          : option.includes('50-£500')
            ? 'side-income'
            : 'main-income';
        break;
      case 'preferredLearning':
        updatedProfile.preferredLearning = option.includes('Jump in')
          ? 'hands-on'
          : option.includes('Step-by-step')
            ? 'guided'
            : 'independent';
        break;
    }

    setUserProfile(updatedProfile);

    // Move to next step or generate recommendation
    const nextStep = currentStep + 1;
    if (nextStep < conversationSteps.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        addMayaMessage(conversationSteps[nextStep].question, conversationSteps[nextStep].options);
      }, 1200);
    } else {
      generateRecommendation(updatedProfile);
    }
  };

  const generateRecommendation = (profile: Partial<UserProfile>) => {
    setTimeout(() => {
      addMayaMessage('Let me think about what would work best for you... 🤔');

      setTimeout(() => {
        const rec = calculateRecommendation(profile);
        setRecommendation(rec);

        // Get child names for display
        const childNames = rec.recommendedChildren
          .map(id => getChildDisplayName(id))
          .join(', ');

        const recommendationText = `Based on our conversation, I recommend the **${rec.pathway.toUpperCase()}** pathway! 

Here's why this fits you:
${rec.reasons.map(reason => `• ${reason}`).join('\n')}

**Your Guides:**
${childNames} will help you along the way.

**Your Roadmap:**
🎯 Time to first sale: ${rec.estimatedTimeToFirstSale}
💰 Revenue projection: ${rec.revenueProjection}
🛠️ Top tools: ${rec.recommendedTools.slice(0, 3).join(', ')}

Ready to start?`;

        addMayaMessage(recommendationText, [
          `Yes! Start my ${rec.pathway.toUpperCase()} journey! 🚀`,
          'Tell me more about the tools 🛠️',
          'Who are my guides? 👨‍👩‍👧‍👦',
          'Show me success stories 📈',
        ]);
        
        // Log to Maya's messages
        addMessage(
          `Pathway recommendation: ${rec.pathway} (${rec.confidence}% confidence)`,
          'pattern',
          { domain: rec.pathway === 'stemgeneer' ? 'technical' : 'business' }
        );
      }, 2000);
    }, 1000);
  };

  const calculateRecommendation = (profile: Partial<UserProfile>): PathwayRecommendation => {
    let stemScore = 0;
    let techScore = 0;
    const reasons: string[] = [];

    // Score based on interests
    if (profile.interests?.includes('stem')) {
      stemScore += 3;
      reasons.push('You showed strong interest in STEM topics');
    }
    if (profile.interests?.includes('business')) {
      techScore += 3;
      reasons.push("You're interested in business and entrepreneurship");
    }
    if (profile.interests?.includes('creative')) {
      techScore += 2;
      stemScore += 1;
      reasons.push('Your creative interests align with digital product creation');
    }

    // Score based on goals
    if (profile.goals?.some(goal => goal.includes('money') || goal.includes('business'))) {
      techScore += 2;
      reasons.push('You have clear revenue and business goals');
    }
    if (profile.goals?.some(goal => goal.includes('solve') || goal.includes('problems'))) {
      stemScore += 2;
      reasons.push('You want to solve real-world problems through technology');
    }

    // Score based on revenue goals
    if (profile.revenueGoal === 'main-income') {
      techScore += 2;
      reasons.push('TECHreneur tools have faster paths to significant income');
    }
    if (profile.revenueGoal === 'learning') {
      stemScore += 1;
      reasons.push('STEM learning builds valuable long-term skills');
    }

    // Score based on learning preference
    if (profile.preferredLearning === 'hands-on') {
      stemScore += 1;
      reasons.push('Hands-on learning suits the STEMgeneer approach');
    }
    if (profile.preferredLearning === 'guided') {
      techScore += 1;
    }

    // Determine pathway
    let pathway: 'stemgeneer' | 'techreneur' | 'hybrid';
    let confidence: number;

    if (Math.abs(stemScore - techScore) <= 1) {
      pathway = 'hybrid';
      confidence = 85;
      reasons.push("You'd benefit from exploring both technical and business tools");
    } else if (stemScore > techScore) {
      pathway = 'stemgeneer';
      confidence = Math.min(95, 60 + (stemScore - techScore) * 10);
    } else {
      pathway = 'techreneur';
      confidence = Math.min(95, 60 + (techScore - stemScore) * 10);
    }

    // Generate tool recommendations
    const stemTools = [
      'Robotics Control Studio',
      'AI Character Programming',
      'Drone Flight Programming',
      '3D Modeling Studio',
    ];
    const techTools = [
      'Business Development Workshop',
      'Content Creation Studio',
      'Digital Art Studio',
      'E-commerce Builder',
    ];
    const hybridTools = [
      'Game Concept Studio',
      'Web Builder Pro',
      'Comic Production Pipeline',
      'Innovation Lab'
    ];

    let recommendedTools: string[];
    if (pathway === 'stemgeneer') {
      recommendedTools = stemTools;
    } else if (pathway === 'techreneur') {
      recommendedTools = techTools;
    } else {
      recommendedTools = hybridTools;
    }

    // Get recommended children
    const recommendedChildren = PATHWAY_CHILDREN[pathway] || PATHWAY_CHILDREN.hybrid;

    // Generate projections
    const timeToSale =
      profile.timeCommitment === 'full-time'
        ? '1-2 weeks'
        : profile.timeCommitment === 'part-time'
          ? '3-4 weeks'
          : '1-2 months';

    const revenueProjection =
      profile.revenueGoal === 'main-income'
        ? '£1,000-£5,000/month'
        : profile.revenueGoal === 'side-income'
          ? '£200-£1,000/month'
          : '£50-£300/month';

    return {
      pathway,
      confidence,
      reasons,
      recommendedTools,
      estimatedTimeToFirstSale: timeToSale,
      revenueProjection,
      recommendedChildren,
    };
  };

  const getChildDisplayName = (childId: ActiveChild): string => {
    const names: Record<ActiveChild, string> = {
      maya: 'Maya (Mother)',
      kweku: 'Kweku (Business)',
      ntikuma: 'Ntikuma (Finance)',
      anansewa: 'Anansewa (Performance)',
      kofi: 'Kofi (Building)',
      afua: 'Afua (Voice)',
      yaw: 'Yaw (Documentation)',
      esi: 'Esi (Heritage)',
      kumi: 'Kumi (Gaming)',
      adaeze: 'Adaeze (Fashion)',
      nyame: 'Nyame (Ethics)',
      osei: 'Osei (Civics)',
      akua: 'Akua (Legal)'
    };
    return names[childId] || childId;
  };

  const handleFinalAction = (action: string) => {
    addUserMessage(action);

    if (action.includes('Start my')) {
      const pathway = recommendation?.pathway || 'stemgeneer';
      setSelectedPathway(pathway);

      // Route to the first recommended child
      const firstChild = recommendation?.recommendedChildren[0];
      if (firstChild) {
        routeToChild(firstChild, 'Pathway selection complete', pathway);
      }

      addMayaMessage(
        `Fantastic! Welcome to your ${recommendation?.pathway.toUpperCase()} journey! 🎉\n\nI'm connecting you with ${getChildDisplayName(firstChild || 'kofi')} who will be your first guide. Remember, I'm always here at the kitchen table when you need me!\n\nLet's build something amazing together! 💫`
      );

      // Call the callback with profile data
      if (onPathwaySelected) {
        onPathwaySelected(pathway, userProfile);
      }

      // Redirect after a delay
      setTimeout(() => {
        if (recommendation?.pathway === 'stemgeneer') {
          window.location.href = '/creators-hub/stemgeneer';
        } else if (recommendation?.pathway === 'techreneur') {
          window.location.href = '/creators-hub/techreneur';
        } else {
          window.location.href = '/creators-hub/studio';
        }
      }, 3000);
      
    } else if (action.includes('Tell me more')) {
      addMayaMessage(
        `Here are the top tools I'd recommend for you:\n\n${recommendation?.recommendedTools
          .map((tool, index) => `${index + 1}. **${tool}** - Perfect for your interests and goals`)
          .join(
            '\n'
          )}\n\nEach tool comes with:\n• Step-by-step tutorials\n• Real project examples\n• Direct publishing to Cyberstore\n• Guidance from the Children of Anansi\n\nReady to dive in?`,
        [
          `Yes! Start with ${recommendation?.recommendedTools[0]} 🎯`,
          'Show me all available tools 🛠️',
          'I want to meet my guides first 👨‍👩‍👧‍👦',
        ]
      );
      
    } else if (action.includes('Who are my guides')) {
      const childDescriptions = recommendation?.recommendedChildren.map(childId => {
        const descriptions: Record<ActiveChild, string> = {
          maya: '👩🏿‍🦱 **Maya** - The Mother. Always here at the kitchen table.',
          kweku: '🎯 **Kweku** - The Questioner. He\'ll challenge your business assumptions.',
          ntikuma: '📊 **Ntikuma** - The Watcher. He sees patterns in your numbers.',
          anansewa: '🎭 **Anansewa** - The Performer. She\'ll help you find your presence.',
          kofi: '🔧 **Kofi** - The Builder. He turns ideas into prototypes.',
          afua: '🎙️ **Afua** - The Storyteller. She\'ll help you find your voice.',
          yaw: '📝 **Yaw** - The Chronicler. He documents what matters.',
          esi: '📚 **Esi** - The Keeper. She preserves heritage and tradition.',
          kumi: '🎮 **Kumi** - The Gamer. Strategy and play are his domain.',
          adaeze: '✂️ **Adaeze** - The Stylist. Fashion and design flow through her.',
          nyame: '⚖️ **Nyame** - The Philosopher. Ethics and reasoning are his guide.',
          osei: '✊ **Osei** - The Organizer. Community power is his focus.',
          akua: '📜 **Akua** - The Advocate. Rights and agreements are her expertise.'
        };
        return descriptions[childId] || childId;
      }).join('\n\n');

      addMayaMessage(
        `Let me introduce your guides for the ${recommendation?.pathway.toUpperCase()} pathway:\n\n${childDescriptions}\n\nThey're all my children, and they each have gifts to share. You'll work with different ones depending on what you need.`,
        [
          `Great! Let's start the journey! 🚀`,
          `Can I talk to ${recommendation?.recommendedChildren[0] || 'Kofi'} now?`,
        ]
      );
    }
  };

  // Don't render if Maya is disabled
  if (!preferences.mayaEnabled) {
    return null;
  }

  return (
    <div className={`maya-pathway-selector ${className}`}>
      <div className="selector-container">
        {/* Header */}
        <div className="selector-header">
          <div className="maya-avatar">
            <div className="avatar-circle">
              <span className="maya-emoji">👩🏿‍🦱</span>
              <div className="pulse-ring"></div>
            </div>
          </div>
          <h1 className="selector-title">Find Your Perfect Creator Pathway</h1>
          <p className="selector-subtitle">
            Let Maya guide you to the tools and pathway that match your interests and goals
          </p>
        </div>

        {/* Conversation Area */}
        <div className="conversation-container">
          <div className="messages-area">
            {conversation.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, index) => (
                      <div key={index}>
                        {line.startsWith('**') && line.endsWith('**') ? (
                          <strong>{line.slice(2, -2)}</strong>
                        ) : line.includes('**') ? (
                          <span dangerouslySetInnerHTML={{
                            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }} />
                        ) : line.startsWith('• ') ? (
                          <div className="bullet-point">{line}</div>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.options && (
                  <div className="message-options">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => {
                          if (recommendation) {
                            handleFinalAction(option);
                          } else {
                            handleOptionSelect(option, conversationSteps[currentStep]?.key);
                          }
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message maya">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / conversationSteps.length) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {recommendation 
              ? 'Recommendation Complete!' 
              : `Question ${currentStep + 1} of ${conversationSteps.length}`
            }
          </div>
        </div>

        {/* Quick Stats */}
        {recommendation && (
          <div className="recommendation-stats">
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-text">
                <div className="stat-label">Pathway Match</div>
                <div className="stat-value">{recommendation.confidence}% confident</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-text">
                <div className="stat-label">Time to First Sale</div>
                <div className="stat-value">{recommendation.estimatedTimeToFirstSale}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div className="stat-text">
                <div className="stat-label">Revenue Projection</div>
                <div className="stat-value">{recommendation.revenueProjection}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👨‍👩‍👧‍👦</div>
              <div className="stat-text">
                <div className="stat-label">Your Guides</div>
                <div className="stat-value">
                  {recommendation.recommendedChildren.length} specialists
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {children}

      {/* Inline Styles (would normally be in CSS module) */}
      <style>{`
        .maya-pathway-selector {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .selector-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .selector-header {
          text-align: center;
          padding: 32px 24px;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: white;
        }
        
        .maya-avatar {
          margin-bottom: 16px;
        }
        
        .avatar-circle {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .maya-emoji {
          font-size: 40px;
        }
        
        .pulse-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        .selector-title {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        
        .selector-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }
        
        .conversation-container {
          padding: 24px;
        }
        
        .messages-area {
          max-height: 400px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .message {
          display: flex;
          flex-direction: column;
        }
        
        .message.maya {
          align-items: flex-start;
        }
        
        .message.user {
          align-items: flex-end;
        }
        
        .message-content {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 16px;
          background: #f1f3f4;
        }
        
        .message.user .message-content {
          background: #8B4513;
          color: white;
        }
        
        .message-text {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .message-text strong {
          font-weight: 600;
        }
        
        .bullet-point {
          padding-left: 8px;
        }
        
        .message-time {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 4px;
        }
        
        .message-options {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        
        .option-button {
          padding: 10px 16px;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          background: white;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .option-button:hover {
          background: #8B4513;
          color: white;
          border-color: #8B4513;
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #8B4513;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        
        .progress-container {
          padding: 16px 24px;
          border-top: 1px solid #e9ecef;
        }
        
        .progress-bar {
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8B4513, #A0522D);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .progress-text {
          font-size: 12px;
          color: #6c757d;
          margin-top: 8px;
          text-align: center;
        }
        
        .recommendation-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          padding: 24px;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .stat-icon {
          font-size: 24px;
        }
        
        .stat-label {
          font-size: 11px;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default MayaPathwaySelector;