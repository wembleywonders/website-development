/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaChat - Comprehensive Maya Chat Component
 *
 * UPDATED: Compatible with unified mayaStore and Children of Anansi ROV framework
 * CHANGE LOG (March 2026):
 *   - Added intentContext support via React Router location.state
 *   - 'pathway' intent triggers earning-path opening conversation
 *   - getPageContext extended with /creator-pathways and /bright-sparks routes
 *
 * Features:
 * - Member tier-specific guidance
 * - Visitor context detection
 * - Safeguarding protocols
 * - Progress tracking
 * - ROV personality switching (Maya + 12 Children)
 * - Jargon explanation
 * - Programme awareness
 * - Earning path intent from nav
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useMayaStore,
  useMayaStage,
  useMayaMode,
  useMayaROV,
  useMayaPreferences,
  useMayaTracking,
  useMayaSession,
  useMayaOpenLoops
} from '../maya/stores/mayaStore';
import type {
  ActiveChild,
  MayaMode,
  PedagogicalStage
} from '../maya/types/mayaTypes';
import './MayaChat.css';

// ============================================
// TYPES
// ============================================

interface ChatMessage {
  id: string;
  sender: 'maya' | 'child' | 'user';
  content: string;
  timestamp: Date;
  childId?: ActiveChild;
  metadata?: {
    progressTracking?: boolean;
    contextualHelp?: boolean;
    safeguardingAlert?: boolean;
    recommendationLevel?: 'low' | 'medium' | 'high';
    jargonExplanation?: boolean;
    domain?: string;
  };
}

interface MemberProgress {
  currentTier: 'visitor' | 'applicant' | 'connector' | 'curator' | 'champion';
  assessmentPeriodStart?: Date;
  completedActivities: string[];
  safeguardingStatus: 'pending' | 'cleared' | 'requires_review';
  progressScore: number;
  lastInteraction: Date;
}

interface UserContext {
  isLoggedIn: boolean;
  userType: 'visitor' | 'member';
  currentPage: string;
  timeOnPage: number;
  scrollDepth: number;
  visitCount: number;
  behaviorPattern: BehaviorPattern;
  interests: string[];
  lastActivity: Date;
}

interface BehaviorPattern {
  type: 'browsing' | 'exploring' | 'deciding' | 'returning';
  confidence: number;
  indicators: string[];
  suggestedActions: string[];
}

/**
 * intentContext — optional signal passed via React Router location.state.
 * Currently supported values:
 *   'pathway'  — visitor clicked "Find your earning path →" in the nav
 *
 * How to trigger from a nav link:
 *   <Link to="/creator-pathways" state={{ mayaIntent: 'pathway' }}>
 *     Find your earning path →
 *   </Link>
 *
 * MayaChat reads this from location.state directly — no prop needed.
 * The prop is retained here as an escape hatch for programmatic control.
 */
interface MayaChatProps {
  membershipTier: 'membership' | 'connector' | 'curator' | 'champion' | 'apply' | 'visitor';
  memberProgress?: MemberProgress;
  onProgressUpdate?: (progress: MemberProgress) => void;
  userId?: string;
  className?: string;
  /** Optional override — normally read from location.state.mayaIntent */
  intentContext?: string;
}

// ============================================
// CHILDREN OF ANANSI - ROV CONFIGURATION
// ============================================

interface ROVPersonality {
  id: ActiveChild;
  name: string;
  emoji: string;
  role: string;
  specialization: string;
  personality: string;
  greeting: string;
  /** Which membership tiers this child primarily serves */
  primaryTiers: string[];
  /** Topics this child handles */
  topics: string[];
}

const CHILDREN_OF_ANANSI: Record<ActiveChild, ROVPersonality> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    emoji: '👩🏿‍🦱',
    role: 'The Mother',
    specialization: 'Comprehensive guidance, emotional support, and community orientation',
    personality: 'Warm, nurturing, adapts to visitor needs, always welcoming',
    greeting: '',
    primaryTiers: ['all'],
    topics: ['general', 'emotional', 'orientation', 'community']
  },
  kweku: {
    id: 'kweku',
    name: 'Kweku',
    emoji: '🎯',
    role: 'The Questioner',
    specialization: 'Business validation, strategy, and entrepreneurial thinking',
    personality: 'Direct, challenging but fair, asks hard questions',
    greeting: "I'm Kweku. I ask the questions others don't. What are you building, and who's paying for it?",
    primaryTiers: ['connector', 'curator', 'champion'],
    topics: ['business', 'strategy', 'validation', 'revenue']
  },
  ntikuma: {
    id: 'ntikuma',
    name: 'Ntikuma',
    emoji: '📊',
    role: 'The Watcher',
    specialization: 'Financial planning, budgets, and pattern recognition',
    personality: 'Observant, analytical, sees what others miss',
    greeting: "I'm Ntikuma. I watch the numbers. They tell stories most people ignore.",
    primaryTiers: ['curator', 'champion'],
    topics: ['finance', 'budget', 'numbers', 'patterns', 'tax']
  },
  anansewa: {
    id: 'anansewa',
    name: 'Anansewa',
    emoji: '🎭',
    role: 'The Performer',
    specialization: 'Presentation skills, public speaking, and authentic presence',
    personality: 'Expressive, demanding of authenticity, theatrical',
    greeting: "I'm Anansewa. Show me who you really are, not who you think I want to see.",
    primaryTiers: ['connector', 'curator'],
    topics: ['performance', 'presentation', 'public speaking', 'drama']
  },
  kofi: {
    id: 'kofi',
    name: 'Kofi',
    emoji: '🔧',
    role: 'The Builder',
    specialization: 'Technical skills, prototyping, and making things work',
    personality: 'Practical, hands-on, prefers building to talking',
    greeting: "I'm Kofi. Stop explaining. Show me what you've built.",
    primaryTiers: ['membership', 'connector'],
    topics: ['technical', 'building', 'prototype', 'engineering', 'stemgineer']
  },
  afua: {
    id: 'afua',
    name: 'Afua',
    emoji: '🎙️',
    role: 'The Storyteller',
    specialization: 'Voice work, podcasting, and narrative structure',
    personality: 'Encouraging but exacting about authenticity',
    greeting: "I'm Afua. Every story has a spine. Let's find yours.",
    primaryTiers: ['membership', 'connector'],
    topics: ['voice', 'story', 'podcast', 'narrative', 'radio']
  },
  yaw: {
    id: 'yaw',
    name: 'Yaw',
    emoji: '📝',
    role: 'The Chronicler',
    specialization: 'Documentation, journalism, and finding the angle',
    personality: 'Curious, persistent, values truth over comfort',
    greeting: "I'm Yaw. If we don't write it down, it didn't happen. What's your story?",
    primaryTiers: ['connector', 'curator'],
    topics: ['documentation', 'journalism', 'writing', 'reporting']
  },
  esi: {
    id: 'esi',
    name: 'Esi',
    emoji: '📚',
    role: 'The Keeper',
    specialization: 'Heritage preservation, oral history, and cultural memory',
    personality: 'Reverent of the past, insistent on proper attribution',
    greeting: "I'm Esi. Who taught you what you know? Their names matter.",
    primaryTiers: ['all'],
    topics: ['heritage', 'history', 'culture', 'tradition', 'recipes']
  },
  kumi: {
    id: 'kumi',
    name: 'Kumi',
    emoji: '🎮',
    role: 'The Gamer',
    specialization: 'Gaming strategy, esports, and competitive thinking',
    personality: 'Strategic, competitive, teaches through play',
    greeting: "I'm Kumi. Everything is a game. What's your strategy?",
    primaryTiers: ['membership', 'connector'],
    topics: ['gaming', 'esports', 'strategy', 'competition']
  },
  adaeze: {
    id: 'adaeze',
    name: 'Adaeze',
    emoji: '✂️',
    role: 'The Stylist',
    specialization: 'Fashion design, visual identity, and aesthetic coherence',
    personality: 'Discerning, creative, values intention over trend',
    greeting: "I'm Adaeze. What is this piece trying to say?",
    primaryTiers: ['membership', 'connector'],
    topics: ['fashion', 'design', 'visual', 'style', 'aesthetic']
  },
  nyame: {
    id: 'nyame',
    name: 'Nyame',
    emoji: '⚖️',
    role: 'The Philosopher',
    specialization: 'Ethical reasoning, difficult decisions, and moral frameworks',
    personality: 'Thoughtful, non-judgmental, helps navigate complexity',
    greeting: "I'm Nyame. You know what you want to do. But should you?",
    primaryTiers: ['curator', 'champion'],
    topics: ['ethics', 'decisions', 'morality', 'philosophy', 'governance']
  },
  osei: {
    id: 'osei',
    name: 'Osei',
    emoji: '✊',
    role: 'The Organizer',
    specialization: 'Community organizing, power mapping, and collective action',
    personality: 'Politically aware, strategic about power, community-focused',
    greeting: "I'm Osei. Who benefits from things staying the same? Let's change that.",
    primaryTiers: ['curator', 'champion'],
    topics: ['organizing', 'community', 'power', 'politics', 'activism']
  },
  akua: {
    id: 'akua',
    name: 'Akua',
    emoji: '📜',
    role: 'The Advocate',
    specialization: 'Legal rights, contracts, and protecting creative work',
    personality: 'Precise, protective, ensures proper documentation',
    greeting: "I'm Akua. Do you have that in writing? Let's make sure you're protected.",
    primaryTiers: ['connector', 'curator', 'champion'],
    topics: ['legal', 'contracts', 'rights', 'protection', 'compliance']
  }
};

// ============================================
// PROGRAMME CONFIGURATION
// ============================================

interface Programme {
  name: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  status: 'upcoming' | 'ongoing' | 'completed';
  focus: string;
  children: ActiveChild[];
}

const getCurrentProgramme = (): Programme => {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) {
    return {
      name: 'Trubble n Bass',
      season: 'spring',
      status: 'ongoing',
      focus: 'Music & Media Production',
      children: ['afua', 'kofi', 'kumi']
    };
  } else if (month >= 5 && month <= 7) {
    return {
      name: "Kaywana's Court",
      season: 'summer',
      status: month >= 5 ? 'ongoing' : 'upcoming',
      focus: 'Drama & Creative Arts',
      children: ['anansewa', 'afua', 'adaeze']
    };
  } else if (month >= 8 && month <= 10) {
    return {
      name: 'Bright Sparks (STEMgineers)',
      season: 'autumn',
      status: 'ongoing',
      focus: 'STEM & Entrepreneurship',
      children: ['kofi', 'kweku', 'ntikuma']
    };
  } else {
    return {
      name: 'Connoisseurs Club',
      season: 'winter',
      status: 'ongoing',
      focus: 'Governance & Leadership',
      children: ['nyame', 'osei', 'akua']
    };
  }
};

// ============================================
// CONTEXT DETECTION
// ============================================

const detectBehaviorPattern = (context: {
  timeOnPage: number;
  scrollDepth: number;
  visitCount: number;
  currentPage: string;
}): BehaviorPattern => {
  const { timeOnPage, scrollDepth, visitCount } = context;

  if (visitCount > 1) {
    return {
      type: 'returning',
      confidence: 0.8,
      indicators: ['Multiple visits detected'],
      suggestedActions: ['Welcome back', "Show what's new"]
    };
  }

  if (timeOnPage > 120 && scrollDepth > 0.7) {
    return {
      type: 'deciding',
      confidence: 0.75,
      indicators: ['Long time on page', 'Deep scroll'],
      suggestedActions: ['Offer next step', 'Reduce friction']
    };
  }

  if (timeOnPage > 30 && scrollDepth > 0.3) {
    return {
      type: 'exploring',
      confidence: 0.7,
      indicators: ['Active engagement', 'Reading content'],
      suggestedActions: ['Provide context', 'Answer questions']
    };
  }

  return {
    type: 'browsing',
    confidence: 0.5,
    indicators: ['Initial visit'],
    suggestedActions: ['Welcome', 'Introduce community']
  };
};

const detectInterests = (pages: string[], timeSpent: Record<string, number>): string[] => {
  const interests: string[] = [];

  pages.forEach(page => {
    const time = timeSpent[page] || 0;
    if (time > 30) {
      if (page.includes('stem') || page.includes('tech')) interests.push('STEM');
      if (page.includes('art') || page.includes('creative')) interests.push('Creative Arts');
      if (page.includes('business') || page.includes('entrepreneur')) interests.push('Business');
      if (page.includes('music') || page.includes('media')) interests.push('Media');
      if (page.includes('membership')) interests.push('Membership');
    }
  });

  return [...new Set(interests)];
};

// ============================================
// JARGON DEFINITIONS
// ============================================

const JARGON_DEFINITIONS: Record<string, string> = {
  'connector': 'A probationary member in their first 12 months, learning community leadership skills.',
  'curator': 'A full member with project leadership authority and budget responsibility up to £50,000.',
  'champion': 'A senior member with strategic authority and governance responsibilities.',
  'stemgineer': 'Our STEM education programme teaching engineering, robotics, and technical skills.',
  'techreneur': 'Our entrepreneurship pathway teaching business skills and digital product creation.',
  'cyberstore': 'Our community marketplace where creators sell digital and physical products.',
  'maya': 'Our AI community guide, named after the concept of creative illusion and possibility.',
  'rov': 'Roving Orientation Voice - our family of AI guides with different specializations.',
  'scrap cat': 'Our recycling initiative that provides free materials for maker projects.',
  'passionistas': 'Our network of supporters who amplify creator work through social media.',
  'five cs': 'Connect, Create, Cultivate, Compete, Celebrate - our community framework.'
};

// ============================================
// COMMON QUESTIONS
// ============================================

const COMMON_QUESTIONS: Record<string, string> = {
  cost: "Good news - participation in our programmes is free! We believe cost shouldn't be a barrier to creativity. Membership has optional tiers with different benefits, but you can always participate without paying.",
  time: "Our programmes run for 8 weeks each season, typically 2-3 hours per week. You can drop in when it suits you - there's no attendance requirement for participants.",
  experience: "No experience needed! Our programmes are designed for complete beginners. You'll learn alongside others at your level, with support from experienced members.",
  membership: "There are three membership tiers: Connector (12-month probationary), Curator (full member with project authority), and Champion (leadership level). Each offers different responsibilities and benefits.",
  transport: "We're based in Wembley, well-connected by tube (Wembley Park, Wembley Central) and bus routes. We can discuss travel support if transport is a barrier.",
  childcare: "We don't currently provide childcare, but some of our programmes welcome families. Talk to us about your situation - we try to be flexible.",
  accessibility: "Our main space is wheelchair accessible with accessible toilets. We can discuss specific accommodations you might need."
};

// ============================================
// PATHWAY INTENT GREETING
// ============================================

/**
 * The four questions from the Skills-to-Income framework.
 * Activated when a visitor arrives via "Find your earning path →" nav link.
 * Does NOT reference programmes, seasons, or membership tiers —
 * those come after the person has answered, not before.
 */
const PATHWAY_GREETING =
  "You clicked 'Find your earning path' — good. I'm Maya.\n\n" +
  "Before I point you anywhere, I want to ask you four things:\n\n" +
  "What do you make, or want to make?\n" +
  "Who do you make it for?\n" +
  "What has stopped you so far?\n" +
  "And what would feel like winning in two years?\n\n" +
  "Take your time. There's no wrong answer.";

// ============================================
// MAIN COMPONENT
// ============================================

const MayaChat: React.FC<MayaChatProps> = ({
  membershipTier,
  memberProgress,
  onProgressUpdate,
  userId,
  className = '',
  intentContext: intentContextProp
}) => {
  // === Store Hooks ===
  const { currentStage } = useMayaStage();
  const { currentMode } = useMayaMode();
  const {
    activeEntity,
    setActiveEntity,
    routeToChild,
    returnToMaya,
    currentMood,
    setCurrentMood
  } = useMayaROV();
  const { preferences } = useMayaPreferences();
  const { trackAction, trackROVSignal } = useMayaTracking();
  const { session, startSession, recordTopicDiscussed } = useMayaSession();
  const { openLoops, openLoop } = useMayaOpenLoops();
  const addStoreMessage = useMayaStore((s) => s.addMessage);

  // === Location ===
  const location = useLocation();

  // === Resolve intent: prop override wins, then location.state ===
  const locationState = location.state as { mayaIntent?: string } | null;
  const resolvedIntent = intentContextProp ?? locationState?.mayaIntent ?? null;

  // === Local State ===
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({
    isLoggedIn: !!userId,
    userType: userId ? 'member' : 'visitor',
    currentPage: location.pathname,
    timeOnPage: 0,
    scrollDepth: 0,
    visitCount: parseInt(localStorage.getItem('maya_visit_count') || '1'),
    behaviorPattern: { type: 'browsing', confidence: 0.5, indicators: [], suggestedActions: [] },
    interests: [],
    lastActivity: new Date()
  });
  const [currentProgramme, setCurrentProgramme] = useState(getCurrentProgramme());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pageTimerRef = useRef<NodeJS.Timeout | null>(null);

  // === Get current child configuration ===
  const currentChild = CHILDREN_OF_ANANSI[activeEntity] || CHILDREN_OF_ANANSI.maya;

  // === Track page context ===
  useEffect(() => {
    const currentPage = location.pathname;

    setUserContext(prev => ({
      ...prev,
      isLoggedIn: !!userId,
      userType: userId ? 'member' : 'visitor',
      currentPage,
      timeOnPage: 0,
      scrollDepth: 0
    }));

    setCurrentProgramme(getCurrentProgramme());

    const visitCount = parseInt(localStorage.getItem('maya_visit_count') || '0') + 1;
    localStorage.setItem('maya_visit_count', visitCount.toString());
    setUserContext(prev => ({ ...prev, visitCount }));

    if (pageTimerRef.current) clearInterval(pageTimerRef.current);

    pageTimerRef.current = setInterval(() => {
      setUserContext(prev => ({
        ...prev,
        timeOnPage: prev.timeOnPage + 1,
        lastActivity: new Date()
      }));
    }, 1000);

    return () => {
      if (pageTimerRef.current) clearInterval(pageTimerRef.current);
    };
  }, [location.pathname, userId]);

  // === Reset messages when intent changes (new nav click) ===
  useEffect(() => {
    // When the visitor arrives with a fresh pathway intent, clear any prior
    // conversation so the greeting reflects the new context.
    if (resolvedIntent === 'pathway' && messages.length > 0) {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedIntent]);

  // === Behavior pattern detection ===
  useEffect(() => {
    const behaviorPattern = detectBehaviorPattern({
      timeOnPage: userContext.timeOnPage,
      scrollDepth: userContext.scrollDepth,
      visitCount: userContext.visitCount,
      currentPage: location.pathname
    });

    const interests = detectInterests(
      [location.pathname],
      { [location.pathname]: userContext.timeOnPage }
    );

    setUserContext(prev => ({ ...prev, behaviorPattern, interests }));
  }, [userContext.timeOnPage, userContext.scrollDepth, userContext.visitCount, location.pathname]);

  // === Track scroll depth ===
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const scrollDepth = documentHeight > 0 ? scrollTop / documentHeight : 0;
      setUserContext(prev => ({ ...prev, scrollDepth }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // === Initialize chat ===
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getGreeting();
      const welcomeMessage: ChatMessage = {
        id: `welcome-${Date.now()}`,
        sender: activeEntity === 'maya' ? 'maya' : 'child',
        content: greeting,
        timestamp: new Date(),
        childId: activeEntity,
        metadata: {
          progressTracking: !!userId,
          contextualHelp: !userId
        }
      };
      setMessages([welcomeMessage]);

      if (!session.id) startSession();
    }
  }, [isOpen, activeEntity]);

  // === Get appropriate greeting ===
  const getGreeting = useCallback((): string => {
    const isVisitor = !userId;

    // ── PATHWAY INTENT: visitor clicked "Find your earning path →" ──────────
    // Fires for both visitors and members — the four questions are universal.
    // Members who want to find an income path deserve the same entry point.
    if (resolvedIntent === 'pathway') {
      return PATHWAY_GREETING;
    }

    const child = CHILDREN_OF_ANANSI[activeEntity];

    if (isVisitor) {
      if (userContext.behaviorPattern.type === 'returning') {
        return `Welcome back! I'm ${child.name}, and I remember you've visited before. ${currentProgramme.name} is currently ${currentProgramme.status}. What brings you back today?`;
      }

      if (userContext.timeOnPage > 60) {
        return `I see you've been exploring! I'm ${child.name}, your community guide. You seem interested in ${getPageContext(location.pathname).focus}. Can I help answer any questions?`;
      }

      return `Hello! I'm ${child.name}, your community guide for Wembley Wonders. ${currentProgramme.name} is our current programme, focusing on ${currentProgramme.focus}. How can I help you today?`;
    }

    // Member greeting based on tier
    switch (membershipTier) {
      case 'membership':
        return `Hello! I'm ${child.name}, your Membership Guide. I can help you understand our three-tier system and find the right path for your community involvement. What questions do you have?`;
      case 'connector':
        return `Welcome to your Connector journey! I'm ${child.name}, here to support your 12-month development period. How can I help you progress today?`;
      case 'curator':
        return `Great to see you, Curator! I'm ${child.name}. You have project leadership authority now. What are you working on?`;
      case 'champion':
        return `Welcome, Champion! I'm ${child.name}, here for strategic discussions. What governance matters are on your mind?`;
      case 'apply':
        return `Ready to apply? I'm ${child.name}, your Application Guide. I'll help you prepare a strong application. What would you like to know?`;
      default:
        return child.greeting || `Hello! I'm ${child.name}. How can I help you today?`;
    }
  }, [activeEntity, userId, userContext, membershipTier, currentProgramme, location.pathname, resolvedIntent]);

  // === Scroll to bottom ===
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // === Route to appropriate child based on topic ===
  const routeToChildForTopic = useCallback((topic: string): ActiveChild => {
    const lowerTopic = topic.toLowerCase();

    for (const [childId, child] of Object.entries(CHILDREN_OF_ANANSI)) {
      if (child.topics.some(t => lowerTopic.includes(t))) {
        return childId as ActiveChild;
      }
    }

    return 'maya';
  }, []);

  // === Handle send message ===
  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    trackAction('direction_action');

    const input = inputMessage.trim();

    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);

      if (response.metadata?.progressTracking && memberProgress && onProgressUpdate) {
        const updatedProgress = {
          ...memberProgress,
          lastInteraction: new Date(),
          progressScore: Math.min(memberProgress.progressScore + 1, 100)
        };
        onProgressUpdate(updatedProgress);
      }

      addStoreMessage(
        `Chat: ${input.slice(0, 50)}...`,
        'narration',
        { childId: activeEntity }
      );

      recordTopicDiscussed(input.slice(0, 30));
    }, 1000 + Math.random() * 1000);
  }, [inputMessage, activeEntity, memberProgress, onProgressUpdate, trackAction, addStoreMessage, recordTopicDiscussed]);

  // === Generate response ===
  const generateResponse = useCallback((userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    const child = CHILDREN_OF_ANANSI[activeEntity];

    const safeguardingKeywords = ['child', 'young', 'youth', 'safeguarding', 'protection', 'vulnerable', 'concern', 'abuse'];
    const hasSafeguardingContent = safeguardingKeywords.some(keyword => input.includes(keyword));

    let responseContent = '';
    let metadata: ChatMessage['metadata'] = {
      progressTracking: !!userId,
      contextualHelp: !userId
    };

    if (hasSafeguardingContent && !input.includes('safeguarding status')) {
      metadata.safeguardingAlert = true;
      responseContent = `I understand you're asking about working with young people or vulnerable groups. This is important - we have strict safeguarding protocols. ${
        activeEntity === 'akua'
          ? "As your Legal Advocate, I need to emphasize that all work with young people requires enhanced DBS clearance, specific training, and adherence to our protection policies. No member has unsupervised access until fully cleared."
          : "Let me connect you with Akua, our Legal Advocate, who handles all safeguarding matters. No member has unsupervised access to youth programmes until they've completed our full assessment process."
      }`;

      if (activeEntity !== 'akua') {
        setTimeout(() => {
          routeToChild('akua', 'Safeguarding topic detected', 'safeguarding');
          setActiveEntity('akua');
        }, 2000);
      }

      return createResponse(responseContent, metadata);
    }

    if (!userId) {
      for (const [key, answer] of Object.entries(COMMON_QUESTIONS)) {
        if (input.includes(key)) {
          return createResponse(answer, metadata);
        }
      }
    }

    for (const [term, definition] of Object.entries(JARGON_DEFINITIONS)) {
      if (input.includes(term) && (input.includes('what is') || input.includes('explain') || input.includes('mean'))) {
        metadata.jargonExplanation = true;
        return createResponse(`**${term.charAt(0).toUpperCase() + term.slice(1)}**: ${definition}`, metadata);
      }
    }

    const suggestedChild = routeToChildForTopic(input);
    if (suggestedChild !== activeEntity && suggestedChild !== 'maya') {
      const targetChild = CHILDREN_OF_ANANSI[suggestedChild];
      responseContent = `That sounds like something ${targetChild.name} specializes in - ${targetChild.specialization.toLowerCase()}. Would you like me to connect you with them?`;

      if (targetChild.topics.some(t => input.includes(t))) {
        setTimeout(() => {
          routeToChild(suggestedChild, `Topic: ${input.slice(0, 30)}`, input.slice(0, 20));
          setActiveEntity(suggestedChild);
        }, 3000);
      }

      return createResponse(responseContent, metadata);
    }

    responseContent = getChildResponse(input, activeEntity, membershipTier, userContext);

    return createResponse(responseContent, metadata);
  }, [activeEntity, userId, membershipTier, userContext, routeToChild, setActiveEntity, routeToChildForTopic]);

  // === Create response message ===
  const createResponse = (content: string, metadata: ChatMessage['metadata']): ChatMessage => ({
    id: `response-${Date.now()}`,
    sender: activeEntity === 'maya' ? 'maya' : 'child',
    content,
    timestamp: new Date(),
    childId: activeEntity,
    metadata
  });

  // === Get child-specific response ===
  const getChildResponse = (
    input: string,
    childId: ActiveChild,
    tier: string,
    context: UserContext
  ): string => {
    const child = CHILDREN_OF_ANANSI[childId];

    if (input.includes('programme') || input.includes('program')) {
      const prog = currentProgramme;
      return `Our current programme is ${prog.name}, focusing on ${prog.focus}. It's ${prog.status}. ${
        childId === 'maya'
          ? 'I can tell you more about any of our four seasonal programmes.'
          : `${child.name === 'Kofi' ? "I'm involved with the technical aspects." : `My siblings ${prog.children.map(c => CHILDREN_OF_ANANSI[c].name).join(', ')} are leading this one.`}`
      }`;
    }

    if (input.includes('start') || input.includes('join') || input.includes('begin')) {
      if (!context.isLoggedIn) {
        return "There are several ways to get involved! You can participate in programmes without any commitment, join as a member for regular access, or apply to become a volunteer with leadership opportunities. What interests you most?";
      }
      return `As a ${tier}, you can ${
        tier === 'connector' ? "participate in programmes and start developing leadership skills"
        : tier === 'curator' ? "lead projects and mentor newer members"
        : tier === 'champion' ? "shape strategic direction and governance"
        : "explore our full range of activities"
      }. What would you like to work on?`;
    }

    if (context.isLoggedIn && (input.includes('progress') || input.includes('advance'))) {
      return `Advancement through our tiers requires demonstrating competence, commitment, and adherence to community standards. ${
        tier === 'connector' ? "You're in a 12-month probationary period. Focus on participation and skill development."
        : tier === 'curator' ? "Consider taking on larger projects or mentoring to progress to Champion."
        : "You're at our highest tier. Your focus is on governance and strategic leadership."
      }`;
    }

    if (input.includes('budget') || input.includes('money') || input.includes('funding')) {
      if (childId === 'ntikuma') {
        return "I watch the numbers carefully. Tell me what you're planning and I'll help you understand the financial implications.";
      }
      if (childId === 'kweku') {
        return "Before we talk budget, let's talk value. What problem are you solving and who benefits?";
      }
      return `Budget questions are best handled by Ntikuma, our finance specialist. ${
        tier === 'curator' ? "As a Curator, you have authority up to £50,000 for projects."
        : tier === 'champion' ? "As a Champion, you have strategic budget authority."
        : "Shall I connect you?"
      }`;
    }

    return `As ${child.role}, I specialize in ${child.specialization.toLowerCase()}. Could you tell me more about what you need help with?`;
  };

  // === Switch active child ===
  const handleSwitchChild = useCallback((childId: ActiveChild) => {
    const child = CHILDREN_OF_ANANSI[childId];

    routeToChild(childId, 'User selected', 'switch');
    setActiveEntity(childId);

    const introMessage: ChatMessage = {
      id: `intro-${Date.now()}`,
      sender: childId === 'maya' ? 'maya' : 'child',
      content: child.greeting || `Hello, I'm ${child.name}. ${child.specialization}. How can I help?`,
      timestamp: new Date(),
      childId
    };

    setMessages(prev => [...prev, introMessage]);
  }, [routeToChild, setActiveEntity]);

  // === Jargon hover handler ===
  const handleJargonHover = useCallback((term: string) => {
    const definition = JARGON_DEFINITIONS[term.toLowerCase()];
    if (definition && !userId) {
      const explanationMessage: ChatMessage = {
        id: `jargon-${Date.now()}`,
        sender: 'maya',
        content: `I noticed you're curious about "${term}". ${definition} Would you like to know more?`,
        timestamp: new Date(),
        childId: 'maya',
        metadata: { jargonExplanation: true }
      };

      setMessages(prev => [...prev, explanationMessage]);
    }
  }, [userId]);

  // === Expose to window for external access ===
  useEffect(() => {
    (window as any).mayaHandleJargonHover = handleJargonHover;
    (window as any).mayaUserContext = userContext;

    return () => {
      delete (window as any).mayaHandleJargonHover;
      delete (window as any).mayaUserContext;
    };
  }, [handleJargonHover, userContext]);

  // === Don't render if disabled ===
  if (!preferences.mayaEnabled) return null;

  // === Get available children for current tier ===
  const availableChildren = Object.values(CHILDREN_OF_ANANSI).filter(child =>
    child.primaryTiers.includes('all') || child.primaryTiers.includes(membershipTier)
  );

  return (
    <div className={`maya-chat-container ${className}`}>
      {/* Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''} ${!userId ? 'visitor-mode' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <div className="chat-avatar">
          <span className="avatar-emoji">{currentChild.emoji}</span>
        </div>
        <div className="chat-indicator">
          <div className="rov-name">{currentChild.name}</div>
          <div className="rov-role">{currentChild.role}</div>
          {!userId && (
            <div className="visitor-status">
              <span className="behavior-tag">{userContext.behaviorPattern.type}</span>
            </div>
          )}
        </div>
        {openLoops.length > 0 && (
          <span className="open-loops-badge">{openLoops.length}</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="rov-info">
              <div className="rov-avatar">
                <span>{currentChild.emoji}</span>
              </div>
              <div className="rov-details">
                <div className="rov-name">{currentChild.name}</div>
                <div className="rov-role">{currentChild.role}</div>
                {!userId && userContext.interests.length > 0 && (
                  <div className="rov-context">
                    Interests: {userContext.interests.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>
            </div>
            <div className="chat-controls">
              <div className="child-switcher">
                {availableChildren.slice(0, 4).map(child => (
                  <button
                    key={child.id}
                    className={`child-switch-btn ${child.id === activeEntity ? 'active' : ''}`}
                    onClick={() => handleSwitchChild(child.id)}
                    title={`${child.name} - ${child.role}`}
                    disabled={child.id === activeEntity}
                  >
                    {child.emoji}
                  </button>
                ))}
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                <span>×</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  <span>
                    {message.sender === 'user'
                      ? '👤'
                      : message.childId
                        ? CHILDREN_OF_ANANSI[message.childId]?.emoji || '👩🏿‍🦱'
                        : '👩🏿‍🦱'
                    }
                  </span>
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.content.split('\n').map((line, i) => {
                      if (line.includes('**')) {
                        return (
                          <p key={i} dangerouslySetInnerHTML={{
                            __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                          }} />
                        );
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                  <div className="message-meta">
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.metadata?.safeguardingAlert && (
                      <span className="safeguarding-indicator" title="Safeguarding protocols active">🛡️</span>
                    )}
                    {message.metadata?.progressTracking && (
                      <span className="progress-indicator" title="Progress tracked">📊</span>
                    )}
                    {message.metadata?.jargonExplanation && (
                      <span className="jargon-indicator" title="Jargon explanation">💡</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message child typing">
                <div className="message-avatar">
                  <span>{currentChild.emoji}</span>
                </div>
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

          {/* Input */}
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask ${currentChild.name} anything...`}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputMessage.trim()}
              className="send-button"
            >
              <span>→</span>
            </button>
          </div>

          {/* Visitor Context */}
          {!userId && (
            <div className="visitor-context">
              <div className="context-info">
                <span className="context-label">Exploring:</span>
                <span className="context-value">{getPageContext(location.pathname).focus}</span>
                <span className="time-indicator">
                  {Math.floor(userContext.timeOnPage / 60)}m {userContext.timeOnPage % 60}s
                </span>
              </div>
              {userContext.behaviorPattern.type === 'deciding' && (
                <div className="context-suggestion">
                  💡 Ready to take the next step? I can help you get started!
                </div>
              )}
              {currentProgramme.status === 'upcoming' && (
                <div className="programme-alert">
                  📅 {currentProgramme.name} starts soon!
                </div>
              )}
            </div>
          )}

          {/* Member Progress */}
          {memberProgress && userId && (
            <div className="progress-footer">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${memberProgress.progressScore}%` }}
                />
              </div>
              <div className="progress-text">
                {memberProgress.currentTier} Progress: {memberProgress.progressScore}%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// HELPER: Page Context
// ============================================

const getPageContext = (pathname: string): { focus: string; purpose: string } => {
  const contexts: Record<string, { focus: string; purpose: string }> = {
    '/': { focus: 'Overview', purpose: 'introducing community pathways' },
    '/about': { focus: 'Organization', purpose: 'explaining our mission and governance' },
    '/calendar': { focus: 'Programmes', purpose: 'showcasing learning opportunities' },
    '/membership': { focus: 'Membership', purpose: 'explaining benefits and tiers' },
    '/get-started': { focus: 'Getting Started', purpose: 'pathway assessment and guidance' },
    '/creator-pathways': { focus: 'Earning Path', purpose: 'matching skills to income routes' },
    '/bright-sparks': { focus: 'Bright Sparks', purpose: 'entry-level skill development' },
    '/stemgineers': { focus: 'STEMgineers', purpose: 'STEM education programme' },
    '/techreneurs': { focus: 'TECHreneurs', purpose: 'entrepreneurship pathway' },
    '/finance': { focus: 'Finance', purpose: 'creator financial tools' }
  };

  return contexts[pathname] || { focus: 'Community', purpose: 'general guidance' };
};

export default MayaChat;