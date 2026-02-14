/*
 * MAYA HERITAGE AWARENESS
 * Extends Maya to support:
 * - Heritage language preservation
 * - Immigrant journey documentation
 * - Cultural reclamation moments
 * - Cross-programme heritage connections
 * 
 * Wembley Wonders CIC
 */

import React, { useEffect, useCallback } from 'react';
import { useMayaStore } from '@/stores/mayaStore';
import { useTransformationStore, useCurrentStage } from '@/stores/transformationStore';
import { useJournalStore } from '@/stores/journalStore';

// ========================================
// HERITAGE DETECTION PATTERNS
// ========================================

interface HeritageContext {
  type: 'language' | 'food' | 'immigrant-journey' | 'identity' | 'elder-wisdom' | 'cultural-loss';
  confidence: number;
  suggestedProgramme: string;
  suggestedTool?: string;
}

// Language indicators by heritage
const HERITAGE_LANGUAGE_MARKERS = {
  caribbean: {
    patois: ['mi', 'yuh', 'dat', 'ting', 'nuh', 'wha', 'gwaan', 'bredren', 'sistren', 'pickney', 'nyam'],
    creole: ['mwen', 'ou', 'li', 'nou', 'yo', 'pawòl', 'manman', 'papa'],
    trini: ['lime', 'liming', 'steups', 'mamaguy', 'tabanca', 'bacchanal'],
  },
  african: {
    twi: ['ɛte', 'wo', 'me', 'yɛ', 'akwaaba', 'medase'],
    yoruba: ['ẹ', 'mo', 'se', 'wa', 'omo', 'abi'],
    pidgin: ['na', 'dey', 'wetin', 'abeg', 'wahala', 'gist', 'oga'],
    somali: ['waa', 'tahay', 'iyo', 'ma', 'ka'],
  }
};

// Food heritage indicators
const FOOD_HERITAGE_MARKERS = [
  // Caribbean
  'jerk', 'ackee', 'saltfish', 'callaloo', 'pelau', 'doubles', 'roti', 
  'oil down', 'pepperpot', 'metemgee', 'cou cou', 'flying fish', 'sorrel',
  'black cake', 'rum punch', 'coconut', 'dasheen', 'breadfruit', 'plantain',
  'scotch bonnet', 'green seasoning', 'provisions',
  // African
  'jollof', 'fufu', 'egusi', 'suya', 'pounded yam', 'waakye', 'kelewele',
  'banku', 'kenkey', 'injera', 'doro wat', 'canjeero', 'sambusa',
  // General
  'grandmother', 'grandma', 'granny', 'nana', 'auntie', 'family recipe',
  'back home', 'how we make it', 'the way my mother'
];

// Immigrant journey indicators
const IMMIGRANT_JOURNEY_MARKERS = [
  'when i came', 'when we arrived', 'first winter', 'culture shock',
  'miss home', 'back home', 'in my country', 'where i\'m from',
  'couldn\'t find', 'couldn\'t get', 'had to substitute',
  'different here', 'not the same', 'windrush', 'visa', 'papers',
  'home office', 'settled', 'citizen', 'belong', 'between two',
  'second generation', 'born here', 'parents came', 'family came',
  'phone call home', 'send money', 'remittance'
];

// Identity/cultural loss indicators
const IDENTITY_LOSS_MARKERS = [
  'don\'t know', 'never learned', 'can\'t cook', 'can\'t speak',
  'lost', 'disconnected', 'don\'t belong', 'fish fingers',
  'grew up on', 'didn\'t teach', 'wish i knew', 'grandparents gone',
  'before they died', 'never asked', 'too late', 'cultural orphan',
  'embarrassed', 'ashamed', 'didn\'t fit', 'made fun of'
];

// Elder wisdom / preservation indicators
const ELDER_WISDOM_MARKERS = [
  'grandmother used to', 'my mother always', 'old way', 'traditional',
  'passed down', 'family secret', 'only she knows', 'before she goes',
  'while they\'re still here', 'document', 'preserve', 'record',
  'taught me', 'showed me', 'watching her cook', 'without measuring'
];

// ========================================
// DETECTION FUNCTIONS
// ========================================

const detectHeritageLanguageUse = (message: string): { language: string; region: string } | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const [region, languages] of Object.entries(HERITAGE_LANGUAGE_MARKERS)) {
    for (const [language, markers] of Object.entries(languages)) {
      const matchCount = markers.filter(marker => lowerMessage.includes(marker)).length;
      if (matchCount >= 2) {
        return { language, region };
      }
    }
  }
  return null;
};

const detectHeritageContext = (message: string): HeritageContext | null => {
  const lowerMessage = message.toLowerCase();
  
  // Check for food heritage
  const foodMatches = FOOD_HERITAGE_MARKERS.filter(marker => lowerMessage.includes(marker)).length;
  if (foodMatches >= 2) {
    return {
      type: 'food',
      confidence: Math.min(foodMatches / 3, 1),
      suggestedProgramme: 'auntie-anansis-kitchen',
      suggestedTool: 'RecipeHeritageKeeper'
    };
  }
  
  // Check for immigrant journey
  const journeyMatches = IMMIGRANT_JOURNEY_MARKERS.filter(marker => lowerMessage.includes(marker)).length;
  if (journeyMatches >= 2) {
    return {
      type: 'immigrant-journey',
      confidence: Math.min(journeyMatches / 3, 1),
      suggestedProgramme: 'pageturners',
      suggestedTool: 'DiasporaNarratives'
    };
  }
  
  // Check for cultural loss / disconnection
  const lossMatches = IDENTITY_LOSS_MARKERS.filter(marker => lowerMessage.includes(marker)).length;
  if (lossMatches >= 2) {
    return {
      type: 'cultural-loss',
      confidence: Math.min(lossMatches / 3, 1),
      suggestedProgramme: 'auntie-anansis-kitchen',
      suggestedTool: 'RecipeHeritageKeeper' // Lost Lamb path
    };
  }
  
  // Check for elder wisdom / preservation
  const elderMatches = ELDER_WISDOM_MARKERS.filter(marker => lowerMessage.includes(marker)).length;
  if (elderMatches >= 2) {
    return {
      type: 'elder-wisdom',
      confidence: Math.min(elderMatches / 3, 1),
      suggestedProgramme: 'auntie-anansis-kitchen',
      suggestedTool: 'RecipeHeritageKeeper' // Elder Keeper path
    };
  }
  
  return null;
};

// ========================================
// MAYA RESPONSES
// ========================================

interface HeritageResponse {
  message: string;
  followUp?: string;
  suggestedAction?: {
    label: string;
    path: string;
  };
  celebrationType?: 'language' | 'reclamation' | 'preservation' | 'connection';
}

const getHeritageResponse = (context: HeritageContext, languageDetected: { language: string; region: string } | null): HeritageResponse => {
  
  // FOOD HERITAGE
  if (context.type === 'food') {
    return {
      message: "I love that you're talking about food! Food carries so much more than nutrition - it carries memory, identity, belonging. Every dish has a story.",
      followUp: "Have you thought about documenting this recipe properly? Not just ingredients, but the stories, the techniques your family uses, the words they use while cooking? Auntie Anansi's Kitchen has tools for exactly this.",
      suggestedAction: {
        label: "🍲 Open Recipe Heritage Keeper",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'preservation'
    };
  }
  
  // IMMIGRANT JOURNEY
  if (context.type === 'immigrant-journey') {
    return {
      message: "Your journey matters. The experience of coming here, adapting, navigating between worlds - these stories need to be told and preserved.",
      followUp: "Would you like to write or record your arrival story? We have writers in Pageturners exploring exactly these themes, and Rayd-yo has an 'Arrival Stories' series for oral histories.",
      suggestedAction: {
        label: "✈️ Tell Your Story",
        path: "/sandbox/pageturners?activity=diaspora-narratives"
      },
      celebrationType: 'connection'
    };
  }
  
  // CULTURAL LOSS / DISCONNECTION
  if (context.type === 'cultural-loss') {
    return {
      message: "I hear you. Growing up disconnected from your heritage isn't your fault - the chain was broken, but not by you. The good news? It can be reclaimed.",
      followUp: "Our Recipe Heritage Keeper has a specific path for people who feel disconnected. It's called 'Lost Lamb' - no judgment, just guidance back to your heritage. You can learn ONE dish and make it yours. That's enough to start.",
      suggestedAction: {
        label: "💔 Start Reclaiming Your Heritage",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'reclamation'
    };
  }
  
  // ELDER WISDOM / PRESERVATION
  if (context.type === 'elder-wisdom') {
    return {
      message: "What you're describing is precious. The knowledge that exists only in practice, the recipes that were never written down, the techniques that live in someone's hands - this needs to be documented.",
      followUp: "Our Recipe Heritage Keeper has an 'Elder Keeper' path designed exactly for this. It captures not just recipes, but the heritage language terms, the stories, the immigrant journey of how the dish travelled. Would you like to preserve this knowledge?",
      suggestedAction: {
        label: "📜 Preserve This Knowledge",
        path: "/sandbox/auntie-anansis-kitchen"
      },
      celebrationType: 'preservation'
    };
  }
  
  // Default heritage response
  return {
    message: "It sounds like you're connecting with your heritage. That's powerful.",
    followUp: "We have tools across our programmes for exploring and preserving cultural knowledge. Would you like me to guide you to the right one?"
  };
};

const getLanguageCelebrationResponse = (language: string, region: string): HeritageResponse => {
  const responses: Record<string, HeritageResponse> = {
    patois: {
      message: "Mi see yuh! 🇯🇲 You're writing in Patois - that's beautiful. Louise Bennett proved this is a literary language. Don't let anyone tell you otherwise.",
      followUp: "Have you tried our Heritage Language Writing prompts in Pageturners? Or if you want to record spoken word, Rayd-yo has Yard Vibes for dub poetry and storytelling in Patois.",
      suggestedAction: {
        label: "🗣️ Write in Heritage Language",
        path: "/sandbox/pageturners?activity=story-starter"
      },
      celebrationType: 'language'
    },
    pidgin: {
      message: "Na so! 🇳🇬 You dey yarn Pidgin - we love to see it. Millions of people speak Pidgin. It's not 'broken English' - it's its own language.",
      followUp: "Pageturners has prompts specifically for Naija Pidgin writing. And Rayd-yo's 'Naija Hour' broadcasts in Pidgin every Sunday.",
      suggestedAction: {
        label: "🗣️ Write in Pidgin",
        path: "/sandbox/pageturners?activity=story-starter"
      },
      celebrationType: 'language'
    },
    twi: {
      message: "Akwaaba! 🇬🇭 You're using Twi - wonderful. Your heritage language matters here.",
      followUp: "We're building more Twi content. Rayd-yo has 'Anɔpa Nkɔmmɔ' on Saturday mornings in Twi. And if you're documenting family recipes, the Heritage Keeper has space for traditional terms.",
      suggestedAction: {
        label: "📻 Listen to Twi Programming",
        path: "/raydyo"
      },
      celebrationType: 'language'
    },
    creole: {
      message: "Pawòl Kwéyòl! 🇱🇨 You're keeping the Creole language alive. This matters more than you know.",
      followUp: "Rayd-yo has 'Kwéyòl Koté' on Sunday mornings. And our writing tools welcome Creole - your grandmother's language is literary.",
      suggestedAction: {
        label: "🗣️ Explore Heritage Language Tools",
        path: "/sandbox/pageturners?activity=story-starter"
      },
      celebrationType: 'language'
    },
  };
  
  return responses[language] || {
    message: `I noticed you're using words from your heritage language - that's wonderful! Your language matters here.`,
    followUp: "We're actively building content in heritage languages across Rayd-yo and our writing tools. Would you like to help us grow this?",
    celebrationType: 'language'
  };
};

// ========================================
// MAIN COMPONENT
// ========================================

export const MayaHeritageAwareness: React.FC = () => {
  // Access Maya store and avoid assuming a 'messages' property exists on the store's type.
  // Some store implementations may not expose 'messages' on the typed state; use a safe cast to access it if present.
  const mayaStore = useMayaStore();
  const { addMessage, engagement } = mayaStore;
  const messages = (mayaStore as any).messages ?? [];
  const { currentStage, advanceStage } = useCurrentStage();
  const { trackMilestone } = useTransformationStore();
  const { addEntry } = useJournalStore();

  // Track heritage engagement
  const [heritageEngagement, setHeritageEngagement] = React.useState({
    languageUsed: false,
    heritageTopicDiscussed: false,
    toolSuggested: false,
    reclamationMoment: false,
  });

  const handleUserMessage = useCallback((userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // ========================================
    // 1. DETECT HERITAGE LANGUAGE USE
    // ========================================
    const languageDetected = detectHeritageLanguageUse(userMessage);
    
    if (languageDetected && !heritageEngagement.languageUsed) {
      const response = getLanguageCelebrationResponse(languageDetected.language, languageDetected.region);
      
      addMessage({
        text: response.message,
        sender: 'maya',
        timestamp: new Date(),
        type: 'celebration'
      });
      
      if (response.followUp) {
        setTimeout(() => {
          const followUpText = response.followUp! + (response.suggestedAction ? `\n\n${response.suggestedAction.label} — ${response.suggestedAction.path}` : '');
          addMessage({
            text: followUpText,
            sender: 'maya',
            timestamp: new Date(),
            type: 'recommendation'
          });
        }, 1500);
      }
      
      setHeritageEngagement(prev => ({ ...prev, languageUsed: true }));
      
      // Track milestone
      trackMilestone({
        type: 'skill-learned',
        description: `User wrote in ${languageDetected.language}`,
        rovSupport: 'Maya'
      });
      
      return; // Don't double-process
    }
    
    // ========================================
    // 2. DETECT HERITAGE CONTEXT
    // ========================================
    const heritageContext = detectHeritageContext(userMessage);
    
    if (heritageContext && heritageContext.confidence > 0.5) {
      const response = getHeritageResponse(heritageContext, languageDetected);
      
      addMessage({
        text: response.message,
        sender: 'maya',
        timestamp: new Date(),
        type: heritageContext.type === 'cultural-loss' ? 'guidance' : 'celebration'
      });
      
      if (response.followUp) {
        setTimeout(() => {
          const followUpText = response.followUp! + (response.suggestedAction ? `\n\n${response.suggestedAction.label} — ${response.suggestedAction.path}` : '');
          addMessage({
            text: followUpText,
            sender: 'maya',
            timestamp: new Date(),
            type: 'recommendation'
          });
        }, 2000);
      }

      setHeritageEngagement(prev => ({
        ...prev,
        heritageTopicDiscussed: true,
        toolSuggested: !!response.suggestedAction
      }));
      
      // Track based on context type
      if (heritageContext.type === 'cultural-loss') {
        trackMilestone({
          type: 'decision-made',
          description: 'User expressed cultural disconnection - guided to reclamation tools',
          rovSupport: 'Maya'
        });
      } else if (heritageContext.type === 'elder-wisdom') {
        trackMilestone({
          type: 'decision-made',
          description: 'User wants to preserve elder knowledge',
          rovSupport: 'Maya'
        });
      }
      
      return;
    }
    
    // ========================================
    // 3. DETECT RECLAMATION MOMENTS
    // ========================================
    const reclamationPhrases = [
      'i made it', 'i cooked it', 'first time', 'finally learned',
      'my grandmother would be proud', 'passed it down', 'taught my kids',
      'recorded', 'documented', 'preserved', 'wrote it down'
    ];
    
    const isReclamationMoment = reclamationPhrases.some(phrase => lowerMessage.includes(phrase)) &&
      heritageEngagement.heritageTopicDiscussed;
    
    if (isReclamationMoment && !heritageEngagement.reclamationMoment) {
      addMessage({
        text: "🎉 This is a MOMENT! You just did something that matters - you reclaimed a piece of your heritage, or you preserved knowledge for the future. This is exactly what we're here for.",
        sender: 'maya',
        timestamp: new Date(),
        type: 'celebration'
      });
      
      addMessage({
        text: "📝 Would you like to record this in your Creator's Journal? These moments of cultural reclamation are worth documenting - for yourself, and as inspiration for others on the same journey.",
        sender: 'maya',
        timestamp: new Date(),
        type: 'recommendation'
      });
      
      setHeritageEngagement(prev => ({ ...prev, reclamationMoment: true }));
      
      // This could trigger stage advancement in transformation journey
      trackMilestone({
        type: 'impact-measured',
        description: 'User achieved a cultural reclamation milestone',
        rovSupport: 'Maya'
      });
      
      // Potentially advance transformation stage
      if (currentStage < 3) {
        advanceStage(3, true, "Cultural reclamation achievement");
      }
    }
    
    // ========================================
    // 4. CROSS-PROGRAMME SUGGESTIONS
    // ========================================
    
    // Food → Writing connection
    if (lowerMessage.includes('story') && heritageEngagement.heritageTopicDiscussed) {
      addMessage({
        text: "Food stories are some of the most powerful writing. Pageturners has prompts specifically for diaspora food narratives - and if you write something great, it could be published in Joystick (55% revenue to you) or recorded for Rayd-yo's Island Kitchen Stories (£25 per episode).",
        sender: 'maya',
        timestamp: new Date(),
        type: 'ecosystem',
        metadata: { ecosystemComponent: 'passionistas' }
      });
    }
    
    // Writing → Radio connection
    if (lowerMessage.includes('speak') || lowerMessage.includes('voice') || lowerMessage.includes('record')) {
      addMessage({
        text: "Your voice matters literally! Rayd-yo has heritage language programming and oral history shows. If you've written something in Pageturners, you could record it for broadcast. £25 per episode.",
        sender: 'maya',
        timestamp: new Date(),
        type: 'ecosystem',
        metadata: { ecosystemComponent: 'full-cycle' }
      });
    }
    
  }, [addMessage, trackMilestone, heritageEngagement, currentStage, advanceStage]);

  // Listen for new user messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      handleUserMessage(lastMessage.text);
    }
  }, [messages, handleUserMessage]);

  return null; // This is a logic component, no UI
};

// ========================================
// HERITAGE PROMPTS FOR JOURNAL
// ========================================

export const HERITAGE_JOURNAL_PROMPTS = {
  'cultural-loss': [
    {
      id: 'heritage-gap',
      question: "What aspect of your heritage do you wish you knew more about?",
      followUp: "Who in your family might still hold this knowledge?"
    },
    {
      id: 'reclamation-start',
      question: "If you could learn one dish, one tradition, one skill from your heritage - what would it be?",
      followUp: "What's stopping you from starting?"
    },
    {
      id: 'identity-reflection',
      question: "When did you first realize you'd lost connection to your heritage? How did that feel?",
      followUp: "What would it mean to you to reclaim it?"
    }
  ],
  'preservation': [
    {
      id: 'elder-knowledge',
      question: "What knowledge does an elder in your family hold that hasn't been documented?",
      followUp: "What would be lost if this wasn't preserved?"
    },
    {
      id: 'heritage-words',
      question: "What words or phrases from your heritage language do you still use or remember?",
      followUp: "What do they mean? What memories do they carry?"
    },
    {
      id: 'food-memory',
      question: "Describe a dish from your heritage. Not just ingredients - the smells, the sounds, the people, the occasion.",
      followUp: "Who taught you about this dish? What stories came with it?"
    }
  ],
  'immigrant-journey': [
    {
      id: 'arrival',
      question: "What's the first thing you remember noticing when you arrived in the UK?",
      followUp: "What surprised you most?"
    },
    {
      id: 'adaptation',
      question: "What did you have to change about yourself to fit in here?",
      followUp: "What did you refuse to change?"
    },
    {
      id: 'between-worlds',
      question: "Do you feel you belong fully to either place - where you're from or where you live now?",
      followUp: "What would it take to feel whole?"
    }
  ]
};

// ========================================
// UTILITY: HERITAGE CONTEXT FOR ROV ROUTING
// ========================================

export const getHeritageROVRecommendation = (context: HeritageContext): string => {
  switch (context.type) {
    case 'food':
      return 'Consider routing to Auntie Anansi ROV for food heritage guidance';
    case 'immigrant-journey':
    case 'identity':
      return 'Consider routing to Kaywana ROV for storytelling and identity exploration';
    case 'elder-wisdom':
      return 'Consider routing to Elder Guide ROV (if available) or Auntie Anansi';
    case 'cultural-loss':
      return 'Keep with Maya for gentle guidance, then route to appropriate programme';
    default:
      return 'Maya can handle general heritage conversations';
  }
};

export default MayaHeritageAwareness;