/*
 * USE HERITAGE AWARENESS HOOK
 * A simpler hook that can be integrated into existing Maya components
 * 
 * Usage:
 * const { processMessage, heritageState } = useHeritageAwareness();
 * 
 * // In your message handler:
 * const heritageResponse = processMessage(userMessage);
 * if (heritageResponse) {
 *   // Maya should respond with heritage-aware content
 * }
 */

import { useState, useCallback } from 'react';

// ========================================
// TYPES
// ========================================

export interface HeritageContext {
  type: 'language' | 'food' | 'immigrant-journey' | 'identity' | 'elder-wisdom' | 'cultural-loss';
  confidence: number;
  detectedLanguage?: string;
  detectedRegion?: string;
}

export interface HeritageResponse {
  shouldRespond: boolean;
  message: string;
  followUp?: string;
  suggestedAction?: {
    label: string;
    path: string;
  };
  celebrationType?: 'language' | 'reclamation' | 'preservation' | 'connection';
  journalPrompt?: string;
}

export interface HeritageState {
  languageUsed: boolean;
  languagesDetected: string[];
  heritageTopicsDiscussed: string[];
  reclamationMomentAchieved: boolean;
  toolsSuggested: string[];
}

// ========================================
// DETECTION PATTERNS
// ========================================

const HERITAGE_LANGUAGE_MARKERS: Record<string, Record<string, string[]>> = {
  caribbean: {
    patois: ['mi', 'yuh', 'dat', 'ting', 'nuh', 'wha', 'gwaan', 'bredren', 'sistren', 'pickney', 'nyam', 'dutty', 'irie', 'bumbaclot'],
    'guyanese-creole': ['gyul', 'bai', 'wha wrong', 'leh we', 'nah', 'ow yuh'],
    'trini-creole': ['lime', 'liming', 'steups', 'mamaguy', 'tabanca', 'bacchanal', 'eh heh', 'rel'],
    'bajan': ['cuh dear', 'wunnah', 'mek sport', 'cheese on bread'],
    'st-lucian-creole': ['mwen', 'ou', 'ki jan', 'sa ka fèt', 'manman'],
  },
  african: {
    twi: ['ɛte', 'wo', 'yɛ', 'akwaaba', 'medase', 'ɛyɛ', 'papa'],
    yoruba: ['ẹ', 'mo', 'se', 'wa', 'omo', 'abi', 'sha', 'oya', 'shey'],
    igbo: ['nna', 'nne', 'kedu', 'ọ dị', 'biko'],
    pidgin: ['na', 'dey', 'wetin', 'abeg', 'wahala', 'gist', 'oga', 'no be', 'sha', 'abi'],
    somali: ['waa', 'tahay', 'iyo', 'ma', 'ka', 'haa', 'maya'],
    hausa: ['kai', 'yaya', 'ina', 'ba', 'da', 'sannu'],
  }
};

const FOOD_MARKERS = [
  // Caribbean specific
  'jerk', 'ackee', 'saltfish', 'callaloo', 'pelau', 'doubles', 'roti', 'buss up shut',
  'oil down', 'pepperpot', 'metemgee', 'cook-up', 'cou cou', 'flying fish', 'sorrel',
  'black cake', 'rum punch', 'dasheen', 'breadfruit', 'plantain', 'green fig',
  'scotch bonnet', 'green seasoning', 'provisions', 'ground provisions', 'pholourie',
  'curry goat', 'oxtail', 'rice and peas', 'festival', 'bammy', 'cassava',
  // African specific
  'jollof', 'fufu', 'egusi', 'suya', 'pounded yam', 'waakye', 'kelewele', 'banku',
  'kenkey', 'okro', 'palm oil', 'groundnut soup', 'light soup', 'kontomire',
  'injera', 'doro wat', 'canjeero', 'sambusa', 'shaah', 'xalwo',
  // Relational
  'grandmother', 'grandma', 'granny', 'nana', 'auntie', 'family recipe',
  'back home', 'how we make', 'the way my mother', 'my grandmother\'s', 'passed down'
];

const JOURNEY_MARKERS = [
  'when i came', 'when we arrived', 'first winter', 'culture shock', 'cold here',
  'miss home', 'back home', 'in my country', 'where i\'m from', 'where i come from',
  'couldn\'t find', 'couldn\'t get', 'had to substitute', 'not available here',
  'different here', 'not the same', 'windrush', 'visa', 'papers', 'status',
  'home office', 'settled status', 'citizen', 'naturalised', 'belong', 'between two',
  'second generation', 'born here', 'parents came', 'family came', 'grew up here',
  'phone call home', 'send money', 'remittance', 'visit home', 'going back'
];

const LOSS_MARKERS = [
  'don\'t know', 'never learned', 'can\'t cook', 'can\'t speak', 'don\'t speak',
  'lost touch', 'disconnected', 'don\'t belong', 'fish fingers', 'chicken nuggets',
  'grew up on', 'didn\'t teach me', 'wish i knew', 'grandparents gone', 'died before',
  'before they died', 'never asked', 'too late now', 'cultural orphan', 'no heritage',
  'embarrassed', 'ashamed', 'made fun of', 'didn\'t fit', 'felt different'
];

const ELDER_MARKERS = [
  'grandmother used to', 'my mother always', 'old way', 'traditional way',
  'passed down', 'family secret', 'only she knows', 'before she goes', 'still alive',
  'while they\'re here', 'need to document', 'preserve', 'record it',
  'taught me', 'showed me', 'watching her cook', 'without measuring', 'by hand',
  'by eye', 'can\'t write down', 'never measured', 'just knows'
];

// ========================================
// DETECTION FUNCTIONS
// ========================================

const detectLanguage = (message: string): { language: string; region: string } | null => {
  const lower = message.toLowerCase();
  
  for (const [region, languages] of Object.entries(HERITAGE_LANGUAGE_MARKERS)) {
    for (const [language, markers] of Object.entries(languages)) {
      const matches = markers.filter(m => lower.includes(m)).length;
      if (matches >= 2) {
        return { language, region };
      }
    }
  }
  return null;
};

const countMatches = (message: string, markers: string[]): number => {
  const lower = message.toLowerCase();
  return markers.filter(m => lower.includes(m)).length;
};

const detectContext = (message: string): HeritageContext | null => {
  const foodScore = countMatches(message, FOOD_MARKERS);
  const journeyScore = countMatches(message, JOURNEY_MARKERS);
  const lossScore = countMatches(message, LOSS_MARKERS);
  const elderScore = countMatches(message, ELDER_MARKERS);
  
  const langDetect = detectLanguage(message);
  
  // Find highest scoring context
  const scores = [
    { type: 'food' as const, score: foodScore },
    { type: 'immigrant-journey' as const, score: journeyScore },
    { type: 'cultural-loss' as const, score: lossScore },
    { type: 'elder-wisdom' as const, score: elderScore },
  ];
  
  const best = scores.reduce((a, b) => a.score > b.score ? a : b);
  
  if (best.score >= 2) {
    return {
      type: best.type,
      confidence: Math.min(best.score / 4, 1),
      detectedLanguage: langDetect?.language,
      detectedRegion: langDetect?.region,
    };
  }
  
  // Check for language use even without other context
  if (langDetect) {
    return {
      type: 'language',
      confidence: 0.8,
      detectedLanguage: langDetect.language,
      detectedRegion: langDetect.region,
    };
  }
  
  return null;
};

// ========================================
// RESPONSE GENERATORS
// ========================================

const generateResponse = (context: HeritageContext, state: HeritageState): HeritageResponse => {
  
  // Language celebration (if not already celebrated this session)
  if (context.type === 'language' && context.detectedLanguage && !state.languagesDetected.includes(context.detectedLanguage)) {
    return getLanguageResponse(context.detectedLanguage, context.detectedRegion || 'unknown');
  }
  
  // Food heritage
  if (context.type === 'food') {
    return {
      shouldRespond: true,
      message: "Food carries so much more than nutrition - it carries memory, identity, belonging. Every dish has a story that deserves to be told.",
      followUp: "Have you thought about documenting this properly? Not just ingredients, but the stories, the techniques, the words your family uses. Auntie Anansi's Kitchen has tools built exactly for this.",
      suggestedAction: {
        label: "🍲 Recipe Heritage Keeper",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'preservation',
      journalPrompt: "Describe this dish - not just what's in it, but who made it, when, why, and what it means to you."
    };
  }
  
  // Immigrant journey
  if (context.type === 'immigrant-journey') {
    return {
      shouldRespond: true,
      message: "Your journey matters. The experience of arrival, adaptation, navigating between worlds - these stories need to be preserved.",
      followUp: "Pageturners has writing prompts specifically for diaspora narratives, and Rayd-yo has 'Arrival Stories' for oral histories. Your experience could help others feel less alone.",
      suggestedAction: {
        label: "✈️ Share Your Story",
        path: "/sandbox/pageturners?activity=diaspora-narratives"
      },
      celebrationType: 'connection',
      journalPrompt: "What's something about your journey to the UK that you've never told anyone?"
    };
  }
  
  // Cultural loss / disconnection
  if (context.type === 'cultural-loss') {
    return {
      shouldRespond: true,
      message: "I hear you. Growing up disconnected from your heritage isn't your fault - the chain was broken, but not by you. And here's the thing: it can be reclaimed.",
      followUp: "Our Recipe Heritage Keeper has a path specifically for people who feel disconnected. It's called 'Lost Lamb' - no judgment, just a gentle guide back to your heritage. You don't need to learn everything. Start with ONE dish. Make it yours.",
      suggestedAction: {
        label: "💔 Start Reclaiming",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'reclamation',
      journalPrompt: "What aspect of your heritage do you wish you knew more about? Who might still hold that knowledge?"
    };
  }
  
  // Elder wisdom / preservation urgency
  if (context.type === 'elder-wisdom') {
    return {
      shouldRespond: true,
      message: "What you're describing is precious and urgent. Knowledge that exists only in someone's hands, recipes never written down, techniques that could be lost - this needs to be documented.",
      followUp: "Our Recipe Heritage Keeper has an 'Elder Keeper' path designed for exactly this. It captures not just recipes, but heritage language terms, the stories, how the dish travelled with your family. Can you sit with that person soon?",
      suggestedAction: {
        label: "📜 Preserve This Knowledge",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'preservation',
      journalPrompt: "What knowledge does an elder in your life hold that hasn't been documented? What would be lost if it wasn't preserved?"
    };
  }
  
  return {
    shouldRespond: false,
    message: ''
  };
};

const getLanguageResponse = (language: string, region: string): HeritageResponse => {
  const responses: Record<string, HeritageResponse> = {
    patois: {
      shouldRespond: true,
      message: "Mi see yuh! 🇯🇲 You're writing in Patois - that's beautiful. Louise Bennett proved this is a literary language. Don't code-switch on my account.",
      followUp: "Pageturners has Heritage Language Writing prompts. And Rayd-yo has 'Yard Vibes' for dub poetry and storytelling in Patois.",
      suggestedAction: { label: "🗣️ Heritage Language Writing", path: "/sandbox/pageturners?activity=story-starter" },
      celebrationType: 'language'
    },
    pidgin: {
      shouldRespond: true,
      message: "Omo! 🇳🇬 You dey yarn Pidgin. Na real talk - millions of people speak this language. It's not 'broken' anything.",
      followUp: "Pageturners welcomes Pidgin writing. Rayd-yo's 'Naija Hour' broadcasts in Pidgin every Sunday.",
      suggestedAction: { label: "🗣️ Write in Pidgin", path: "/sandbox/pageturners?activity=story-starter" },
      celebrationType: 'language'
    },
    twi: {
      shouldRespond: true,
      message: "Akwaaba! 🇬🇭 You're using Twi - wonderful to see. Your heritage language matters here.",
      followUp: "Rayd-yo has 'Anɔpa Nkɔmmɔ' on Saturday mornings in Twi. And our writing tools welcome heritage language content.",
      suggestedAction: { label: "📻 Twi Programming", path: "/raydyo" },
      celebrationType: 'language'
    },
    yoruba: {
      shouldRespond: true,
      message: "Ẹ ku! 🇳🇬 I see you writing in Yoruba. Beautiful. Your language carries centuries of wisdom.",
      followUp: "We're building more Yoruba content. Would you be interested in helping?",
      celebrationType: 'language',
    },
    'trini-creole': {
      shouldRespond: true,
      message: "Wham! 🇹🇹 Trini talk sweet. Keep the language alive, nah.",
      followUp: "Rayd-yo has 'Trini to de Bone' on Saturdays. Lime with we!",
      suggestedAction: { label: "📻 Listen", path: "/raydyo" },
      celebrationType: 'language'
    },
    'st-lucian-creole': {
      shouldRespond: true,
      message: "Kwéyòl ka palé! 🇱🇨 You're keeping the Creole alive. Sa bèl.",
      followUp: "Rayd-yo has 'Kwéyòl Koté' on Sunday mornings. Your grandmother's language is welcome here.",
      suggestedAction: { label: "📻 Creole Programming", path: "/raydyo" },
      celebrationType: 'language'
    },
    somali: {
      shouldRespond: true,
      message: "Salaam! 🇸🇴 Soomaali - beautiful to see. Your language is welcome here.",
      followUp: "Rayd-yo has 'Codka Bulshada' - community voice in Somali. Would you like to contribute?",
      suggestedAction: { label: "📻 Somali Programming", path: "/raydyo" },
      celebrationType: 'language'
    },
  };
  
  return responses[language] || {
    shouldRespond: true,
    message: "I noticed you're using words from your heritage language - wonderful! Your language is valid and welcome here.",
    followUp: "We're actively building heritage language content. Would you like to help?",
    celebrationType: 'language'
  };
};

// ========================================
// THE HOOK
// ========================================

export const useHeritageAwareness = () => {
  const [state, setState] = useState<HeritageState>({
    languageUsed: false,
    languagesDetected: [],
    heritageTopicsDiscussed: [],
    reclamationMomentAchieved: false,
    toolsSuggested: [],
  });

  const processMessage = useCallback((message: string): HeritageResponse | null => {
    const context = detectContext(message);
    
    if (!context || context.confidence < 0.5) {
      return null;
    }
    
    const response = generateResponse(context, state);
    
    if (response.shouldRespond) {
      // Update state
      setState(prev => ({
        ...prev,
        languageUsed: prev.languageUsed || context.type === 'language',
        languagesDetected: context.detectedLanguage 
          ? [...new Set([...prev.languagesDetected, context.detectedLanguage])]
          : prev.languagesDetected,
        heritageTopicsDiscussed: [...new Set([...prev.heritageTopicsDiscussed, context.type])],
        toolsSuggested: response.suggestedAction 
          ? [...new Set([...prev.toolsSuggested, response.suggestedAction.path])]
          : prev.toolsSuggested,
      }));
    }
    
    return response;
  }, [state]);

  const checkReclamationMoment = useCallback((message: string): boolean => {
    if (state.reclamationMomentAchieved) return false;
    if (state.heritageTopicsDiscussed.length === 0) return false;
    
    const reclamationPhrases = [
      'i made it', 'i cooked it', 'first time', 'finally learned',
      'grandmother would be proud', 'passed it down', 'taught my',
      'recorded', 'documented', 'preserved', 'wrote it down'
    ];
    
    const lower = message.toLowerCase();
    const isReclamation = reclamationPhrases.some(p => lower.includes(p));
    
    if (isReclamation) {
      setState(prev => ({ ...prev, reclamationMomentAchieved: true }));
    }
    
    return isReclamation;
  }, [state]);

  const reset = useCallback(() => {
    setState({
      languageUsed: false,
      languagesDetected: [],
      heritageTopicsDiscussed: [],
      reclamationMomentAchieved: false,
      toolsSuggested: [],
    });
  }, []);

  return {
    processMessage,
    checkReclamationMoment,
    heritageState: state,
    reset,
  };
};

export default useHeritageAwareness;