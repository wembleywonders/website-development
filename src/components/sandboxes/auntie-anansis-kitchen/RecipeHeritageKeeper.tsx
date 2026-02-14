import React, { useState, useEffect } from 'react';
import styles from './RecipeHeritageKeeper.module.css';

// ========================================
// RECIPE HERITAGE KEEPER 2.1
// Identity Restoration Platform
// + Heritage Language Preservation
// + Immigrant Journey Documentation
// ========================================

type JourneyPath = 'choosing' | 'lost-lamb' | 'elder-keeper' | 'somewhere-between';
type Island = 'guyana' | 'jamaica' | 'trinidad' | 'grenada' | 'st-lucia' | 'barbados' | 'dominica' | 'st-vincent' | 'ghana' | 'nigeria' | 'somalia' | 'other-caribbean' | 'other-african' | 'unknown';
type LearningOption = 'self-guided' | 'auntie-matched' | 'cohort' | null;

// ========================================
// HERITAGE LANGUAGE DATA STRUCTURE
// ========================================

interface HeritageLanguage {
  languageName: string;           // e.g., "Twi", "Patois", "Yoruba", "Creole"
  dishNameInLanguage: string;     // What your family calls this dish
  ingredientTerms: string;        // Traditional names for key ingredients
  techniqueTerms: string;         // Words for techniques that don't translate
  phrasesWhileCooking: string;    // Things said while cooking, proverbs, blessings
  measurementTerms: string;       // "A pinch", "til it looks right" in heritage language
}

// ========================================
// IMMIGRANT JOURNEY DATA STRUCTURE
// ========================================

interface ImmigrantJourney {
  arrivalStory: string;           // How family came to UK
  cultureShock: string;           // What was different/difficult
  foodAdaptations: string;        // What changed when cooking here
  ingredientSubstitutions: string; // What you couldn't get, what you used instead
  whatYouMiss: string;            // Flavours, ingredients, experiences from home
  whatYouDiscovered: string;      // New things found in UK
  connectionMaintained: string;   // How food keeps you connected to home
}

interface LostLambData {
  grewUpEating: string;
  knowledgeLevel: string;
  shameExperience: string;
  island: Island | null;
  chosenDish: string;
  learningOption: LearningOption;
  heritageLanguage: HeritageLanguage;
  reclamationJourney: {
    whereStarted: string;
    learningExperience: string;
    meaningNow: string;
    whatPassDown: string;
    languageLearned: string;      // Heritage words discovered during journey
  };
}

interface ElderKeeperData {
  dishName: string;
  island: Island | null;
  stories: {
    ancestral: string;
    family: string;
    spiritual: string;
    diaspora: string;
    technique: string;
  };
  heritageLanguage: HeritageLanguage;
  immigrantJourney: ImmigrantJourney;
  ingredients: string;
  seasonalTiming: string;
}

interface HeritageKeeperState {
  path: JourneyPath;
  currentStep: number;
  lostLambData: LostLambData;
  elderKeeperData: ElderKeeperData;
  lastSaved: string | null;
}

const STORAGE_KEY = 'wembley-heritage-keeper-progress';

// ========================================
// ISLAND DATA - EXPANDED WITH LANGUAGES
// ========================================

const ISLANDS = [
  { 
    id: 'guyana', 
    name: 'Guyana', 
    flag: '🇬🇾', 
    region: 'caribbean',
    languages: ['Guyanese Creole', 'English', 'Hindi', 'Urdu'],
    dishes: 'Metemgee, Pepperpot, Garlic Pork, Cook-up Rice',
    featuredDishes: [
      { name: 'Metemgee', icon: '🍲', description: 'Ground provisions in coconut milk - the freedom pot', localName: 'Metem' },
      { name: 'Pepperpot', icon: '🥘', description: 'Cassareep stew that gets better with time', localName: 'Peppapot' },
      { name: 'Black Cake', icon: '🍰', description: 'Months of soaking, family ritual', localName: 'Black Cake' },
      { name: 'Garlic Pork', icon: '🐖', description: 'Vinegar preservation, pre-refrigeration innovation', localName: 'Garlic Pork' },
    ]
  },
  { 
    id: 'jamaica', 
    name: 'Jamaica', 
    flag: '🇯🇲', 
    region: 'caribbean',
    languages: ['Jamaican Patois', 'English'],
    dishes: 'Jerk, Ackee & Saltfish, Curry Goat, Rice & Peas',
    featuredDishes: [
      { name: 'Jerk Chicken', icon: '🔥', description: 'Pimento wood smoke, maroon innovation', localName: 'Jerk Chikn' },
      { name: 'Ackee & Saltfish', icon: '🍳', description: 'National dish, morning tradition', localName: 'Akii an Saltfish' },
      { name: 'Curry Goat', icon: '🍛', description: 'Sunday special, slow-cooked mastery', localName: 'Curry Goat' },
      { name: 'Rice & Peas', icon: '🍚', description: 'Kidney beans, coconut milk, Sunday staple', localName: 'Rice an Peas' },
    ]
  },
  { 
    id: 'trinidad', 
    name: 'Trinidad & Tobago', 
    flag: '🇹🇹', 
    region: 'caribbean',
    languages: ['Trinidadian Creole', 'English', 'Trinidadian Hindustani'],
    dishes: 'Pelau, Doubles, Callaloo, Roti',
    featuredDishes: [
      { name: 'Pelau', icon: '🍲', description: 'One-pot wonder, caramelized mastery', localName: 'Pelau' },
      { name: 'Doubles', icon: '🌮', description: 'Street food legend, chickpea perfection', localName: 'Doubles' },
      { name: 'Callaloo', icon: '🥬', description: 'Dasheen bush, coconut milk, Sunday soup', localName: 'Callaloo' },
      { name: 'Roti', icon: '🫓', description: 'Dhal puri, buss up shut, paratha perfection', localName: 'Roti / Buss Up Shut' },
    ]
  },
  { 
    id: 'grenada', 
    name: 'Grenada', 
    flag: '🇬🇩', 
    region: 'caribbean',
    languages: ['Grenadian Creole', 'English'],
    dishes: 'Oil Down, Nutmeg Ice Cream, Callaloo Soup',
    featuredDishes: [
      { name: 'Oil Down', icon: '🥥', description: 'National dish, breadfruit in coconut milk', localName: 'Oil Down' },
      { name: 'Nutmeg Ice Cream', icon: '🍨', description: 'Spice island signature', localName: 'Nutmeg Ice Cream' },
      { name: 'Callaloo Soup', icon: '🥣', description: 'Dasheen leaves, crab, Saturday tradition', localName: 'Callaloo' },
      { name: 'Cocoa Tea', icon: '☕', description: 'Hand-rolled cocoa balls, morning ritual', localName: 'Cocoa Tea' },
    ]
  },
  { 
    id: 'st-lucia', 
    name: 'St Lucia', 
    flag: '🇱🇨', 
    region: 'caribbean',
    languages: ['Saint Lucian Creole (Kwéyòl)', 'English'],
    dishes: 'Green Fig & Saltfish, Bouyon, Accra',
    featuredDishes: [
      { name: 'Green Fig & Saltfish', icon: '🐟', description: 'National dish, green banana perfection', localName: 'Fig Vèt épi Mowi Salé' },
      { name: 'Bouyon', icon: '🍲', description: 'Saturday soup, ground provisions', localName: 'Bouyon' },
      { name: 'Accra', icon: '🥘', description: 'Saltfish fritters, street food favorite', localName: 'Akwa' },
      { name: 'Lambi', icon: '🐚', description: 'Conch stew, coastal tradition', localName: 'Lanbi' },
    ]
  },
  { 
    id: 'barbados', 
    name: 'Barbados', 
    flag: '🇧🇧', 
    region: 'caribbean',
    languages: ['Bajan Creole', 'English'],
    dishes: 'Flying Fish, Cou Cou, Pudding & Souse',
    featuredDishes: [
      { name: 'Flying Fish & Cou Cou', icon: '🐟', description: 'National dish, cornmeal perfection', localName: 'Flyin Fish an Cou Cou' },
      { name: 'Pudding & Souse', icon: '🐖', description: 'Saturday special, pickled tradition', localName: 'Puddin an Souse' },
      { name: 'Bajan Macaroni Pie', icon: '🧀', description: 'Sunday side, ketchup topping', localName: 'Macaroni Pie' },
      { name: 'Fishcakes', icon: '🍤', description: 'Saltfish fritters, party food', localName: 'Fish Cakes' },
    ]
  },
  { 
    id: 'dominica', 
    name: 'Dominica', 
    flag: '🇩🇲', 
    region: 'caribbean',
    languages: ['Dominican Creole (Kwéyòl)', 'English'],
    dishes: 'Mountain Chicken, Callaloo Soup, Crab Back',
    featuredDishes: [
      { name: 'Mountain Chicken', icon: '🐸', description: 'Giant frog legs, national delicacy', localName: 'Crapaud' },
      { name: 'Callaloo Soup', icon: '🥣', description: 'Dasheen leaves, crab, cultural staple', localName: 'Kalalou' },
      { name: 'Crab Back', icon: '🦀', description: 'Stuffed land crab, heritage technique', localName: 'Kwab' },
      { name: 'Provision & Saltfish', icon: '🍠', description: 'Ground provisions, morning staple', localName: 'Pwovizyon' },
    ]
  },
  { 
    id: 'st-vincent', 
    name: 'St Vincent & Grenadines', 
    flag: '🇻🇨', 
    region: 'caribbean',
    languages: ['Vincentian Creole', 'English'],
    dishes: 'Roasted Breadfruit, Jackfish, Arrowroot',
    featuredDishes: [
      { name: 'Roasted Breadfruit & Jackfish', icon: '🥖', description: 'National dish, fire-roasted', localName: 'Roast Breadfruit' },
      { name: 'Arrowroot Products', icon: '🥤', description: 'Indigenous starch, cultural staple', localName: 'Arrowroot' },
      { name: 'Callaloo Soup', icon: '🥬', description: 'Dasheen bush, Saturday soup', localName: 'Callaloo' },
      { name: 'Conkies', icon: '🌽', description: 'Cornmeal wrapped, steamed tradition', localName: 'Conkies' },
    ]
  },
  // ========================================
  // AFRICAN NATIONS - NEW
  // ========================================
  { 
    id: 'ghana', 
    name: 'Ghana', 
    flag: '🇬🇭', 
    region: 'african',
    languages: ['Twi', 'Ga', 'Ewe', 'Fante', 'English'],
    dishes: 'Jollof Rice, Fufu, Banku, Waakye, Kelewele',
    featuredDishes: [
      { name: 'Jollof Rice', icon: '🍚', description: 'The one-pot dish that started the West African debate', localName: 'Jollof' },
      { name: 'Fufu & Light Soup', icon: '🍲', description: 'Pounded cassava/plantain, the family gathering dish', localName: 'Fufuo' },
      { name: 'Waakye', icon: '🫘', description: 'Rice and beans with millet leaves - the breakfast champion', localName: 'Waakye' },
      { name: 'Kelewele', icon: '🍌', description: 'Spiced fried plantain, street food perfection', localName: 'Kelewele' },
      { name: 'Banku & Tilapia', icon: '🐟', description: 'Fermented corn/cassava dough with grilled fish', localName: 'Bankye' },
    ]
  },
  { 
    id: 'nigeria', 
    name: 'Nigeria', 
    flag: '🇳🇬', 
    region: 'african',
    languages: ['Yoruba', 'Igbo', 'Hausa', 'Pidgin', 'English'],
    dishes: 'Jollof Rice, Egusi Soup, Pounded Yam, Suya, Puff Puff',
    featuredDishes: [
      { name: 'Jollof Rice', icon: '🍚', description: 'The REAL Jollof (don\'t @ us)', localName: 'Jollof' },
      { name: 'Egusi Soup', icon: '🥣', description: 'Melon seed soup, served with swallow', localName: 'Ofe Egusi (Igbo) / Efo Elegusi (Yoruba)' },
      { name: 'Pounded Yam', icon: '🥔', description: 'The ultimate swallow, smooth and stretchy', localName: 'Iyan (Yoruba) / Nni Ji (Igbo)' },
      { name: 'Suya', icon: '🍢', description: 'Spiced grilled meat, the night-time essential', localName: 'Suya / Tsire' },
      { name: 'Puff Puff', icon: '🍩', description: 'Fried dough balls, party staple', localName: 'Puff Puff / Bofrot' },
    ]
  },
  { 
    id: 'somalia', 
    name: 'Somalia', 
    flag: '🇸🇴', 
    region: 'african',
    languages: ['Somali', 'Arabic', 'English'],
    dishes: 'Canjeero, Suqaar, Bariis Iskukaris, Sambusa',
    featuredDishes: [
      { name: 'Canjeero', icon: '🫓', description: 'Sourdough flatbread, morning staple', localName: 'Canjeero / Laxoox' },
      { name: 'Suqaar', icon: '🥩', description: 'Sautéed meat cubes with vegetables', localName: 'Suqaar' },
      { name: 'Bariis Iskukaris', icon: '🍚', description: 'Spiced rice with meat, celebration dish', localName: 'Bariis' },
      { name: 'Sambusa', icon: '🥟', description: 'Fried pastry triangles, Ramadan essential', localName: 'Sambusa' },
      { name: 'Shaah', icon: '☕', description: 'Spiced tea with cardamom and cloves', localName: 'Shaah Cadays' },
    ]
  },
  { 
    id: 'other-caribbean', 
    name: 'Other Caribbean Nation', 
    flag: '🌴', 
    region: 'caribbean',
    languages: ['Various'],
    dishes: 'Tell us your heritage dishes',
    featuredDishes: []
  },
  { 
    id: 'other-african', 
    name: 'Other African Nation', 
    flag: '🌍', 
    region: 'african',
    languages: ['Various'],
    dishes: 'Tell us your heritage dishes',
    featuredDishes: []
  },
];

// ========================================
// INITIAL STATE
// ========================================

const initialHeritageLanguage: HeritageLanguage = {
  languageName: '',
  dishNameInLanguage: '',
  ingredientTerms: '',
  techniqueTerms: '',
  phrasesWhileCooking: '',
  measurementTerms: '',
};

const initialImmigrantJourney: ImmigrantJourney = {
  arrivalStory: '',
  cultureShock: '',
  foodAdaptations: '',
  ingredientSubstitutions: '',
  whatYouMiss: '',
  whatYouDiscovered: '',
  connectionMaintained: '',
};

const initialState: HeritageKeeperState = {
  path: 'choosing',
  currentStep: 0,
  lostLambData: {
    grewUpEating: '',
    knowledgeLevel: '',
    shameExperience: '',
    island: null,
    chosenDish: '',
    learningOption: null,
    heritageLanguage: { ...initialHeritageLanguage },
    reclamationJourney: {
      whereStarted: '',
      learningExperience: '',
      meaningNow: '',
      whatPassDown: '',
      languageLearned: '',
    },
  },
  elderKeeperData: {
    dishName: '',
    island: null,
    stories: {
      ancestral: '',
      family: '',
      spiritual: '',
      diaspora: '',
      technique: '',
    },
    heritageLanguage: { ...initialHeritageLanguage },
    immigrantJourney: { ...initialImmigrantJourney },
    ingredients: '',
    seasonalTiming: '',
  },
  lastSaved: null,
};

const RecipeHeritageKeeper: React.FC = () => {
  const [state, setState] = useState<HeritageKeeperState>(initialState);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        console.error('Failed to load saved progress', e);
      }
    }
  }, []);

  // Save progress whenever state changes
  useEffect(() => {
    if (state.path !== 'choosing' && state.currentStep > 0) {
      const toSave = {
        ...state,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setState(prev => ({ ...prev, lastSaved: toSave.lastSaved }));
    }
  }, [state.path, state.currentStep, state.lostLambData, state.elderKeeperData]);

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  // ========================================
  // MAYA MESSAGES (Soul-Guided)
  // ========================================
  
  const getMayaMessage = (): string => {
    if (state.path === 'choosing') {
      return "Welcome home. You're here because food matters - but not just as sustenance. Food is memory, identity, belonging. The words we use, the techniques we preserve, the stories we tell while cooking - all of it matters. I'm here to guide you to your place in the story. Where shall we begin?";
    }
    
    if (state.path === 'lost-lamb') {
      const messages = [
        "I see you. Growing up disconnected isn't your fault. The chain was broken, but not by you. Let me show you what you didn't know existed - the wealth, the innovation, the legacy. You come from transformers, not just workers.",
        "Let's find your heritage. Every island, every nation has distinct traditions - this isn't about generic 'Caribbean food' or 'African food', but about YOUR people's specific innovations.",
        `Look at this wealth. This is what a traditional ${state.lostLambData.island ? ISLANDS.find(i => i.id === state.lostLambData.island)?.name : 'heritage'} kitchen actually involves. You didn't know this existed because the chain was broken - but this is YOUR heritage.`,
        "Here's the truth: You don't come from just workers. You come from people who created abundance from oppression, who innovated under colonialism, who built legacies that survived centuries. You're their heir.",
        "You don't need to learn everything. Just choose ONE dish that speaks to you. That one dish becomes YOUR family dish. The one you contribute when life asks for it.",
        "How do you want to learn? With an Auntie or Elder who'll guide you in person? On your own with videos and guides? Or with others reclaiming their heritage alongside you?",
        "Now let's capture the WORDS. What do they call this dish in your heritage language? What phrases did your family use while cooking? These words carry culture - even if you don't speak the language fluently, these terms matter.",
        "Now document YOUR journey - not just the recipe, but your transformation. From fish fingers to cultural keeper. The words you learned, the meaning you found. This is your reclamation story.",
        "You did it. You reclaimed your heritage. You have a family dish now. You know words your grandparents used. The chain won't break again. You know who you are."
      ];
      return messages[Math.min(state.currentStep - 1, messages.length - 1)] || messages[0];
    }
    
    if (state.path === 'elder-keeper') {
      const messages = [
        "Guardian of knowledge. You carry recipes your grandmother cooked without measuring, stories that live only in practice, techniques that would die if not documented. Your work here isn't just preservation - it's an act of love for generations you'll never meet. Thank you for being here.",
        "Let's start with what you know. The dish, the origins, the basic story. We'll go deeper from here.",
        "Now the layers of story - not just WHAT you cook, but WHY it matters. The ancestral connections, the family memories, the spiritual significance, how it travelled with your family.",
        "This is crucial: the WORDS. What your grandmother called things. The phrases that don't translate. The measurements that were never written down. 'Til it looks right.' 'When you smell it change.' These are your heritage language - preserve them.",
        "Your journey matters too. If you came to the UK - what changed? What couldn't you get? What did you substitute? What do you miss? This adaptation story is part of the dish's evolution.",
        "The technical knowledge. Ingredients, timing, seasonality. The stuff that lets someone actually make this dish the way it should be made.",
        "You've preserved something precious. This knowledge will outlive us all. Future generations will know these words, these techniques, these stories - because you took the time to document them.",
      ];
      return messages[Math.min(state.currentStep - 1, messages.length - 1)] || messages[0];
    }
    
    return "Let's walk this journey together.";
  };

  // ========================================
  // NAVIGATION
  // ========================================
  
  const goToStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (state.currentStep > 1) {
      goToStep(state.currentStep - 1);
    } else {
      setState(prev => ({ ...prev, path: 'choosing', currentStep: 0 }));
    }
  };

  const goNext = () => {
    goToStep(state.currentStep + 1);
  };

  // ========================================
  // UPDATE HANDLERS
  // ========================================

  const updateLostLambData = (field: keyof LostLambData, value: any) => {
    setState(prev => ({
      ...prev,
      lostLambData: { ...prev.lostLambData, [field]: value }
    }));
  };

  const updateLostLambHeritageLanguage = (field: keyof HeritageLanguage, value: string) => {
    setState(prev => ({
      ...prev,
      lostLambData: {
        ...prev.lostLambData,
        heritageLanguage: { ...prev.lostLambData.heritageLanguage, [field]: value }
      }
    }));
  };

  const updateLostLambReclamation = (field: string, value: string) => {
    setState(prev => ({
      ...prev,
      lostLambData: {
        ...prev.lostLambData,
        reclamationJourney: { ...prev.lostLambData.reclamationJourney, [field]: value }
      }
    }));
  };

  const updateElderKeeperData = (field: keyof ElderKeeperData, value: any) => {
    setState(prev => ({
      ...prev,
      elderKeeperData: { ...prev.elderKeeperData, [field]: value }
    }));
  };

  const updateElderKeeperStory = (field: string, value: string) => {
    setState(prev => ({
      ...prev,
      elderKeeperData: {
        ...prev.elderKeeperData,
        stories: { ...prev.elderKeeperData.stories, [field]: value }
      }
    }));
  };

  const updateElderKeeperHeritageLanguage = (field: keyof HeritageLanguage, value: string) => {
    setState(prev => ({
      ...prev,
      elderKeeperData: {
        ...prev.elderKeeperData,
        heritageLanguage: { ...prev.elderKeeperData.heritageLanguage, [field]: value }
      }
    }));
  };

  const updateElderKeeperImmigrantJourney = (field: keyof ImmigrantJourney, value: string) => {
    setState(prev => ({
      ...prev,
      elderKeeperData: {
        ...prev.elderKeeperData,
        immigrantJourney: { ...prev.elderKeeperData.immigrantJourney, [field]: value }
      }
    }));
  };

  // ========================================
  // VALIDATION
  // ========================================
  
  const canProceedFromStep = (): boolean => {
    if (state.path === 'lost-lamb') {
      if (state.currentStep === 1) {
        return state.lostLambData.grewUpEating.trim().length > 10 &&
               state.lostLambData.knowledgeLevel.length > 0;
      }
      if (state.currentStep === 2) {
        return state.lostLambData.island !== null;
      }
      if (state.currentStep === 5) {
        return state.lostLambData.chosenDish.length > 0;
      }
      if (state.currentStep === 6) {
        return state.lostLambData.learningOption !== null;
      }
      // Heritage language step - optional but encouraged
      if (state.currentStep === 7) {
        return true; // Optional - can proceed without filling
      }
      if (state.currentStep === 8) {
        return state.lostLambData.reclamationJourney.whereStarted.trim().length > 20 &&
               state.lostLambData.reclamationJourney.meaningNow.trim().length > 20;
      }
    }
    if (state.path === 'elder-keeper') {
      if (state.currentStep === 1) {
        return state.elderKeeperData.dishName.trim().length > 0 &&
               state.elderKeeperData.island !== null;
      }
      // Other steps are encouraged but not required
    }
    return true;
  };

  // ========================================
  // CERTIFICATE GENERATION
  // ========================================
  
  const generateCertificate = () => {
    const islandData = ISLANDS.find(i => i.id === state.lostLambData.island);
    const islandName = islandData?.name || 'Heritage';
    const languages = islandData?.languages?.join(', ') || 'Heritage Language';
    
    const certificate = `
═══════════════════════════════════════════════════════════
          HERITAGE RECLAMATION CERTIFICATE
                Auntie Anansi's Kitchen
          Wembley Wonders Community Interest Company
═══════════════════════════════════════════════════════════

This certifies that:

                        [YOUR NAME HERE]

has successfully reclaimed their ${islandName} heritage
by learning and mastering:

                    ${state.lostLambData.chosenDish}

${state.lostLambData.heritageLanguage.dishNameInLanguage ? `
Called in heritage language: ${state.lostLambData.heritageLanguage.dishNameInLanguage}
Language: ${state.lostLambData.heritageLanguage.languageName || languages}
` : ''}
───────────────────────────────────────────────────────────
                        YOUR JOURNEY
───────────────────────────────────────────────────────────

WHERE YOU STARTED:
${state.lostLambData.grewUpEating}

WHAT THIS MEANS NOW:
${state.lostLambData.reclamationJourney.meaningNow}

WHAT YOU'LL PASS DOWN:
${state.lostLambData.reclamationJourney.whatPassDown}

${state.lostLambData.reclamationJourney.languageLearned ? `
HERITAGE WORDS LEARNED:
${state.lostLambData.reclamationJourney.languageLearned}
` : ''}
───────────────────────────────────────────────────────────
                      YOUR TRANSFORMATION
───────────────────────────────────────────────────────────

From: Disconnected → To: Cultural Keeper
From: Fish Fingers → To: ${state.lostLambData.chosenDish}
From: Cultural Orphan → To: Heritage Guardian

───────────────────────────────────────────────────────────

This dish is now YOUR family dish.
The next time life asks for it - at a birth, a wedding, a gathering -
you have something to contribute.

The chain was broken. You fixed it.

You come from innovators, transformers, legacy builders.
You know who you are now.

Pass it down - with the words, the stories, and the love.

───────────────────────────────────────────────────────────

Completed: ${new Date().toLocaleDateString('en-GB', { 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
})}

Wembley Wonders CIC
Auntie Anansi's Kitchen
${islandName} Heritage Restoration Programme

═══════════════════════════════════════════════════════════
    `;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Heritage_Certificate_${state.lostLambData.chosenDish.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ========================================
  // ELDER KEEPER DOCUMENT GENERATION
  // ========================================

  const generateElderDocument = () => {
    const islandData = ISLANDS.find(i => i.id === state.elderKeeperData.island);
    const islandName = islandData?.name || 'Heritage';
    const hl = state.elderKeeperData.heritageLanguage;
    const ij = state.elderKeeperData.immigrantJourney;
    const stories = state.elderKeeperData.stories;

    const docText = `
═══════════════════════════════════════════════════════════
              HERITAGE RECIPE PRESERVATION
                    ${state.elderKeeperData.dishName}
              From the ${islandName} Kitchen
═══════════════════════════════════════════════════════════

Documented by: [YOUR NAME HERE]
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Preserved with: Auntie Anansi's Kitchen, Wembley Wonders CIC

───────────────────────────────────────────────────────────
                    HERITAGE LANGUAGE
───────────────────────────────────────────────────────────

${hl.languageName ? `Language: ${hl.languageName}` : ''}
${hl.dishNameInLanguage ? `
This dish is called: ${hl.dishNameInLanguage}
` : ''}
${hl.ingredientTerms ? `
INGREDIENT NAMES (Traditional Terms):
${hl.ingredientTerms}
` : ''}
${hl.techniqueTerms ? `
TECHNIQUE WORDS (Things That Don't Translate):
${hl.techniqueTerms}
` : ''}
${hl.measurementTerms ? `
HOW WE MEASURE (The Unwritten Rules):
${hl.measurementTerms}
` : ''}
${hl.phrasesWhileCooking ? `
WHAT WE SAY WHILE COOKING (Phrases, Proverbs, Blessings):
${hl.phrasesWhileCooking}
` : ''}

───────────────────────────────────────────────────────────
                      THE STORIES
───────────────────────────────────────────────────────────

${stories.ancestral ? `
ANCESTRAL CONNECTIONS:
${stories.ancestral}
` : ''}
${stories.family ? `
FAMILY MEMORIES:
${stories.family}
` : ''}
${stories.spiritual ? `
SPIRITUAL SIGNIFICANCE:
${stories.spiritual}
` : ''}
${stories.diaspora ? `
DIASPORA JOURNEY:
${stories.diaspora}
` : ''}
${stories.technique ? `
TECHNIQUE STORIES:
${stories.technique}
` : ''}

───────────────────────────────────────────────────────────
                   IMMIGRANT JOURNEY
───────────────────────────────────────────────────────────

${ij.arrivalStory ? `
HOW WE CAME HERE:
${ij.arrivalStory}
` : ''}
${ij.cultureShock ? `
WHAT WAS DIFFERENT:
${ij.cultureShock}
` : ''}
${ij.foodAdaptations ? `
HOW THE COOKING CHANGED:
${ij.foodAdaptations}
` : ''}
${ij.ingredientSubstitutions ? `
WHAT WE COULDN'T GET (And What We Used Instead):
${ij.ingredientSubstitutions}
` : ''}
${ij.whatYouMiss ? `
WHAT WE MISS:
${ij.whatYouMiss}
` : ''}
${ij.whatYouDiscovered ? `
WHAT WE DISCOVERED HERE:
${ij.whatYouDiscovered}
` : ''}
${ij.connectionMaintained ? `
HOW FOOD KEEPS US CONNECTED:
${ij.connectionMaintained}
` : ''}

───────────────────────────────────────────────────────────
                    THE RECIPE
───────────────────────────────────────────────────────────

INGREDIENTS:
${state.elderKeeperData.ingredients || '[To be documented]'}

SEASONAL/TIMING NOTES:
${state.elderKeeperData.seasonalTiming || '[To be documented]'}

───────────────────────────────────────────────────────────

This knowledge has been preserved for future generations.
The words, the stories, the techniques - they will not be lost.

Thank you for being a guardian of heritage.

═══════════════════════════════════════════════════════════
    `;

    const blob = new Blob([docText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Heritage_Recipe_${state.elderKeeperData.dishName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ========================================
  // RENDER: PATH SELECTION
  // ========================================

  const renderPathSelection = () => (
    <div className={styles.pathSelection}>
      <div className={styles.mayaShepherd}>
        <div className={styles.mayaIcon}>✨</div>
        <div className={styles.mayaMessage}>
          <p>{getMayaMessage()}</p>
        </div>
      </div>

      {state.lastSaved && (
        <div className={styles.resumePrompt}>
          <p>📝 You have progress saved from {new Date(state.lastSaved).toLocaleDateString()}</p>
          <button onClick={clearProgress} className={styles.clearButton}>
            Start Fresh
          </button>
        </div>
      )}

      <div className={styles.pathGrid}>
        {/* LOST LAMB PATH */}
        <button
          className={styles.pathCard}
          onClick={() => setState({ ...state, path: 'lost-lamb', currentStep: 1 })}
        >
          <div className={styles.pathIcon}>💔</div>
          <h3>I'm Disconnected</h3>
          <p className={styles.pathDescription}>
            I grew up on fish fingers and chips. I don't know my heritage. 
            I feel like a cultural orphan. I have no "family dish" to contribute 
            when life asks for it.
          </p>
          <div className={styles.pathPromise}>
            → We'll show you the magnificence you never knew existed, 
            guide you to reclaim it, and help you find your place in the story.
          </div>
          <div className={styles.pathButton}>
            Guide Me Home →
          </div>
        </button>

        {/* ELDER KEEPER PATH */}
        <button
          className={styles.pathCard}
          onClick={() => setState({ ...state, path: 'elder-keeper', currentStep: 1 })}
        >
          <div className={styles.pathIcon}>🍲</div>
          <h3>I Know My Heritage</h3>
          <p className={styles.pathDescription}>
            I cook without measuring. I know the stories that live with each dish. 
            I carry knowledge my grandmother passed down. I need to document it 
            before it's lost.
          </p>
          <div className={styles.pathPromise}>
            → We'll help you preserve your knowledge at the depth it deserves - 
            the words, the stories, the immigrant journey, the sacred techniques.
          </div>
          <div className={styles.pathButton}>
            Preserve My Knowledge →
          </div>
        </button>

        {/* SOMEWHERE BETWEEN PATH */}
        <button
          className={styles.pathCard}
          onClick={() => setState({ ...state, path: 'somewhere-between', currentStep: 1 })}
        >
          <div className={styles.pathIcon}>🌱</div>
          <h3>I'm Somewhere Between</h3>
          <p className={styles.pathDescription}>
            I know some things - I've watched family cook, I remember flavors, 
            I have fragments. But there are gaps. I want to deepen what I know 
            and fill in what's missing.
          </p>
          <div className={styles.pathPromise}>
            → We'll honor what you already know while helping you discover 
            what's still waiting to be reclaimed.
          </div>
          <div className={styles.pathButton}>
            Deepen My Heritage →
          </div>
        </button>
      </div>
    </div>
  );

  // ========================================
  // RENDER: LOST LAMB JOURNEY
  // ========================================

  const renderLostLambStep = () => {
    const selectedIsland = ISLANDS.find(i => i.id === state.lostLambData.island);

    switch (state.currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Tell Me About Your Food Story</h2>
            <div className={styles.formGroup}>
              <label>What did you grow up eating?</label>
              <textarea
                value={state.lostLambData.grewUpEating}
                onChange={(e) => updateLostLambData('grewUpEating', e.target.value)}
                placeholder="Be honest - fish fingers, chicken nuggets, ready meals... No judgment here. This is your starting point."
                rows={4}
              />
            </div>
            <div className={styles.formGroup}>
              <label>How would you describe your current knowledge of your heritage food?</label>
              <div className={styles.optionGrid}>
                {['None - complete blank', 'Fragments - I remember some tastes', 'Basic - I know a few dishes exist', 'Some - I can name dishes but not cook them'].map(option => (
                  <button
                    key={option}
                    className={`${styles.optionButton} ${state.lostLambData.knowledgeLevel === option ? styles.selected : ''}`}
                    onClick={() => updateLostLambData('knowledgeLevel', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Where Does Your Heritage Come From?</h2>
            <p className={styles.stepIntro}>
              Each island and nation has distinct culinary traditions. This isn't generic "Caribbean" or "African" food - 
              it's YOUR people's specific innovations.
            </p>
            
            <h3>Caribbean Nations</h3>
            <div className={styles.islandGrid}>
              {ISLANDS.filter(i => i.region === 'caribbean').map(island => (
                <button
                  key={island.id}
                  className={`${styles.islandCard} ${state.lostLambData.island === island.id ? styles.selected : ''}`}
                  onClick={() => updateLostLambData('island', island.id as Island)}
                >
                  <span className={styles.islandFlag}>{island.flag}</span>
                  <strong>{island.name}</strong>
                  <span className={styles.islandDishes}>{island.dishes}</span>
                  {island.languages && (
                    <span className={styles.islandLanguages}>Languages: {island.languages.join(', ')}</span>
                  )}
                </button>
              ))}
            </div>

            <h3>African Nations</h3>
            <div className={styles.islandGrid}>
              {ISLANDS.filter(i => i.region === 'african').map(island => (
                <button
                  key={island.id}
                  className={`${styles.islandCard} ${state.lostLambData.island === island.id ? styles.selected : ''}`}
                  onClick={() => updateLostLambData('island', island.id as Island)}
                >
                  <span className={styles.islandFlag}>{island.flag}</span>
                  <strong>{island.name}</strong>
                  <span className={styles.islandDishes}>{island.dishes}</span>
                  {island.languages && (
                    <span className={styles.islandLanguages}>Languages: {island.languages.join(', ')}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Look At This Wealth</h2>
            {selectedIsland && selectedIsland.featuredDishes.length > 0 && (
              <>
                <p className={styles.stepIntro}>
                  This is what a traditional {selectedIsland.name} kitchen actually involves. 
                  You didn't know this existed because the chain was broken - but this is YOUR heritage.
                </p>
                <div className={styles.dishShowcase}>
                  {selectedIsland.featuredDishes.map(dish => (
                    <div key={dish.name} className={styles.dishCard}>
                      <span className={styles.dishIcon}>{dish.icon}</span>
                      <h4>{dish.name}</h4>
                      {dish.localName && dish.localName !== dish.name && (
                        <p className={styles.localName}>"{dish.localName}"</p>
                      )}
                      <p>{dish.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>The Truth About Your Lineage</h2>
            <div className={styles.truthCard}>
              <p>
                You don't come from just workers. You come from people who created abundance from oppression, 
                who innovated under slavery and colonialism, who built legacies that survived centuries. 
              </p>
              <p>
                Every dish in your heritage represents <strong>problem-solving</strong>, <strong>creativity</strong>, 
                and <strong>love</strong> under impossible circumstances.
              </p>
              <p>
                <strong>You're their heir.</strong>
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <h2>Choose Your Dish</h2>
            <p className={styles.stepIntro}>
              You don't need to learn everything. Just choose ONE dish that speaks to you. 
              That one dish becomes YOUR family dish - the one you contribute when life asks for it.
            </p>
            
            {selectedIsland && selectedIsland.featuredDishes.length > 0 ? (
              <div className={styles.dishSelector}>
                {selectedIsland.featuredDishes.map(dish => (
                  <button
                    key={dish.name}
                    className={`${styles.dishOption} ${state.lostLambData.chosenDish === dish.name ? styles.selected : ''}`}
                    onClick={() => updateLostLambData('chosenDish', dish.name)}
                  >
                    <span>{dish.icon}</span>
                    <strong>{dish.name}</strong>
                    {dish.localName && <span className={styles.localName}>({dish.localName})</span>}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label>What dish do you want to reclaim?</label>
                <input
                  type="text"
                  value={state.lostLambData.chosenDish}
                  onChange={(e) => updateLostLambData('chosenDish', e.target.value)}
                  placeholder="Enter the name of a dish from your heritage"
                />
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className={styles.stepContent}>
            <h2>How Do You Want to Learn?</h2>
            <div className={styles.learningOptions}>
              <button
                className={`${styles.learningCard} ${state.lostLambData.learningOption === 'auntie-matched' ? styles.selected : ''}`}
                onClick={() => updateLostLambData('learningOption', 'auntie-matched')}
              >
                <span className={styles.learningIcon}>👵</span>
                <h4>Match Me With an Auntie/Elder</h4>
                <p>Learn in person from someone who cooks this dish from memory. Real kitchen wisdom, passed down properly.</p>
              </button>

              <button
                className={`${styles.learningCard} ${state.lostLambData.learningOption === 'cohort' ? styles.selected : ''}`}
                onClick={() => updateLostLambData('learningOption', 'cohort')}
              >
                <span className={styles.learningIcon}>👥</span>
                <h4>Learn With Others</h4>
                <p>Join a cohort of people reclaiming their heritage alongside you. Shared journey, mutual support.</p>
              </button>

              <button
                className={`${styles.learningCard} ${state.lostLambData.learningOption === 'self-guided' ? styles.selected : ''}`}
                onClick={() => updateLostLambData('learningOption', 'self-guided')}
              >
                <span className={styles.learningIcon}>📚</span>
                <h4>Self-Guided</h4>
                <p>Videos, guides, and resources to learn at your own pace. We'll still be here when you need us.</p>
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className={styles.stepContent}>
            <h2>The Words That Matter</h2>
            <p className={styles.stepIntro}>
              Language carries culture. Even if you don't speak your heritage language fluently, 
              the food words matter. They connect you to everyone who made this dish before you.
            </p>

            <div className={styles.formGroup}>
              <label>What language(s) does your family use for food?</label>
              <input
                type="text"
                value={state.lostLambData.heritageLanguage.languageName}
                onChange={(e) => updateLostLambHeritageLanguage('languageName', e.target.value)}
                placeholder={selectedIsland?.languages ? `e.g., ${selectedIsland.languages.join(', ')}` : 'e.g., Patois, Twi, Yoruba, Creole'}
              />
            </div>

            <div className={styles.formGroup}>
              <label>What do they call {state.lostLambData.chosenDish} in your family's language?</label>
              <input
                type="text"
                value={state.lostLambData.heritageLanguage.dishNameInLanguage}
                onChange={(e) => updateLostLambHeritageLanguage('dishNameInLanguage', e.target.value)}
                placeholder="The name your grandmother would use"
              />
              <span className={styles.fieldHint}>Don't know? That's okay - this is what you're reclaiming.</span>
            </div>

            <div className={styles.formGroup}>
              <label>Any food words or phrases you remember from family?</label>
              <textarea
                value={state.lostLambData.heritageLanguage.phrasesWhileCooking}
                onChange={(e) => updateLostLambHeritageLanguage('phrasesWhileCooking', e.target.value)}
                placeholder="Things said while cooking, proverbs about food, blessings before meals, names for ingredients... Write anything you remember, even fragments."
                rows={4}
              />
            </div>

            <div className={styles.encouragementNote}>
              <p>
                <strong>Note:</strong> If these fields are empty, that's part of your story too. 
                Part of reclaiming your heritage is learning these words. 
                Come back and fill this in as you learn.
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className={styles.stepContent}>
            <h2>Document Your Reclamation Journey</h2>
            <p className={styles.stepIntro}>
              This isn't just about the recipe - it's about YOUR transformation. 
              From fish fingers to cultural keeper. This is your story.
            </p>

            <div className={styles.formGroup}>
              <label>Where did you start? (Your honest beginning)</label>
              <textarea
                value={state.lostLambData.reclamationJourney.whereStarted}
                onChange={(e) => updateLostLambReclamation('whereStarted', e.target.value)}
                placeholder="Describe where you were before this journey - the disconnection, the things you didn't know, how it felt"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>What does this dish mean to you now?</label>
              <textarea
                value={state.lostLambData.reclamationJourney.meaningNow}
                onChange={(e) => updateLostLambReclamation('meaningNow', e.target.value)}
                placeholder="How has learning this changed how you see yourself, your heritage, your identity?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>What will you pass down?</label>
              <textarea
                value={state.lostLambData.reclamationJourney.whatPassDown}
                onChange={(e) => updateLostLambReclamation('whatPassDown', e.target.value)}
                placeholder="What do you want the next generation to know? What will you make sure doesn't get lost again?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Heritage words you've learned on this journey</label>
              <textarea
                value={state.lostLambData.reclamationJourney.languageLearned}
                onChange={(e) => updateLostLambReclamation('languageLearned', e.target.value)}
                placeholder="List the words, phrases, and terms you've discovered - ingredient names, technique words, proverbs, anything"
                rows={3}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className={styles.stepContent}>
            <h2>You Did It</h2>
            <div className={styles.completionCard}>
              <div className={styles.completionIcon}>🎉</div>
              <h3>You Reclaimed Your Heritage</h3>
              <p>
                You have a family dish now: <strong>{state.lostLambData.chosenDish}</strong>
                {state.lostLambData.heritageLanguage.dishNameInLanguage && (
                  <> - "{state.lostLambData.heritageLanguage.dishNameInLanguage}"</>
                )}
              </p>
              <p>
                The next time life asks for it - at a birth, a wedding, a gathering - 
                you have something to contribute.
              </p>
              <p><strong>The chain was broken. You fixed it.</strong></p>
              <p>You know who you are now.</p>
              
              <button onClick={generateCertificate} className={styles.downloadButton}>
                📜 Download Your Heritage Certificate
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // RENDER: ELDER KEEPER JOURNEY
  // ========================================

  const renderElderKeeperStep = () => {
    const selectedIsland = ISLANDS.find(i => i.id === state.elderKeeperData.island);

    switch (state.currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>What Are You Preserving?</h2>
            
            <div className={styles.formGroup}>
              <label>Name of the dish</label>
              <input
                type="text"
                value={state.elderKeeperData.dishName}
                onChange={(e) => updateElderKeeperData('dishName', e.target.value)}
                placeholder="What your family calls this dish"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Where does this dish come from?</label>
              
              <h4>Caribbean Nations</h4>
              <div className={styles.islandGrid}>
                {ISLANDS.filter(i => i.region === 'caribbean').map(island => (
                  <button
                    key={island.id}
                    className={`${styles.islandCard} ${styles.compact} ${state.elderKeeperData.island === island.id ? styles.selected : ''}`}
                    onClick={() => updateElderKeeperData('island', island.id as Island)}
                  >
                    <span className={styles.islandFlag}>{island.flag}</span>
                    <strong>{island.name}</strong>
                  </button>
                ))}
              </div>

              <h4>African Nations</h4>
              <div className={styles.islandGrid}>
                {ISLANDS.filter(i => i.region === 'african').map(island => (
                  <button
                    key={island.id}
                    className={`${styles.islandCard} ${styles.compact} ${state.elderKeeperData.island === island.id ? styles.selected : ''}`}
                    onClick={() => updateElderKeeperData('island', island.id as Island)}
                  >
                    <span className={styles.islandFlag}>{island.flag}</span>
                    <strong>{island.name}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>The Stories Behind the Dish</h2>
            <p className={styles.stepIntro}>
              This is what makes your documentation invaluable. Not just the recipe - the MEANING.
            </p>

            <div className={styles.formGroup}>
              <label>🌍 Ancestral Connections</label>
              <textarea
                value={state.elderKeeperData.stories.ancestral}
                onChange={(e) => updateElderKeeperStory('ancestral', e.target.value)}
                placeholder="Where does this dish come from originally? What do you know about its history before your family? Any connections to Africa, to indigenous peoples, to colonial adaptations?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>👨‍👩‍👧‍👦 Family Memories</label>
              <textarea
                value={state.elderKeeperData.stories.family}
                onChange={(e) => updateElderKeeperStory('family', e.target.value)}
                placeholder="Who taught you? What do you remember about learning this? Specific memories - the kitchen, the smells, the conversations, the people who are no longer here..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>🙏 Spiritual Significance</label>
              <textarea
                value={state.elderKeeperData.stories.spiritual}
                onChange={(e) => updateElderKeeperStory('spiritual', e.target.value)}
                placeholder="Is this dish connected to any religious observances, celebrations, rites of passage? Any blessings said over it? Any spiritual meaning?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>✈️ Diaspora Journey</label>
              <textarea
                value={state.elderKeeperData.stories.diaspora}
                onChange={(e) => updateElderKeeperStory('diaspora', e.target.value)}
                placeholder="How has this dish travelled? How has it changed across generations or when your family moved? What adaptations have been made?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>🔧 Technique Stories</label>
              <textarea
                value={state.elderKeeperData.stories.technique}
                onChange={(e) => updateElderKeeperStory('technique', e.target.value)}
                placeholder="What makes YOUR way of making this special? Family secrets? Things that took years to learn? The 'feel' that can't be written down?"
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>The Words - Heritage Language</h2>
            <p className={styles.stepIntro}>
              This is crucial. The words your grandmother used. The phrases that don't translate. 
              The measurements that were never written down. This is your heritage language - preserve it.
            </p>

            <div className={styles.formGroup}>
              <label>What language(s)?</label>
              <input
                type="text"
                value={state.elderKeeperData.heritageLanguage.languageName}
                onChange={(e) => updateElderKeeperHeritageLanguage('languageName', e.target.value)}
                placeholder={selectedIsland?.languages ? `e.g., ${selectedIsland.languages.join(', ')}` : 'e.g., Patois, Twi, Yoruba, Creole, Somali'}
              />
            </div>

            <div className={styles.formGroup}>
              <label>What do you call this dish?</label>
              <input
                type="text"
                value={state.elderKeeperData.heritageLanguage.dishNameInLanguage}
                onChange={(e) => updateElderKeeperHeritageLanguage('dishNameInLanguage', e.target.value)}
                placeholder="The name in your heritage language"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Ingredient Names</label>
              <textarea
                value={state.elderKeeperData.heritageLanguage.ingredientTerms}
                onChange={(e) => updateElderKeeperHeritageLanguage('ingredientTerms', e.target.value)}
                placeholder="What do you call the ingredients? Traditional names that might not be on the supermarket label. e.g., 'cho-cho' not 'chayote', 'dasheen' not 'taro'..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Technique Words</label>
              <textarea
                value={state.elderKeeperData.heritageLanguage.techniqueTerms}
                onChange={(e) => updateElderKeeperHeritageLanguage('techniqueTerms', e.target.value)}
                placeholder="Words for techniques that don't translate well. e.g., 'chunkay' (tempering spices), 'buss up' (breaking up roti)..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>How You Measure</label>
              <textarea
                value={state.elderKeeperData.heritageLanguage.measurementTerms}
                onChange={(e) => updateElderKeeperHeritageLanguage('measurementTerms', e.target.value)}
                placeholder="The unwritten measurements. 'A pinch', 'til it looks right', 'when you smell it change', 'enough'... What do these mean in YOUR kitchen?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phrases, Proverbs, Blessings</label>
              <textarea
                value={state.elderKeeperData.heritageLanguage.phrasesWhileCooking}
                onChange={(e) => updateElderKeeperHeritageLanguage('phrasesWhileCooking', e.target.value)}
                placeholder="Things said while cooking. Proverbs about food. Blessings before eating. Phrases your grandmother used. Sayings that come to mind in the kitchen..."
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Your Immigrant Journey</h2>
            <p className={styles.stepIntro}>
              If you or your family came to the UK - this story matters. 
              How food changed, adapted, survived the journey. This is part of the dish's evolution.
            </p>

            <div className={styles.formGroup}>
              <label>✈️ How did you/your family come here?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.arrivalStory}
                onChange={(e) => updateElderKeeperImmigrantJourney('arrivalStory', e.target.value)}
                placeholder="When did you arrive? What brought you? What was the journey like?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>😮 What was different/difficult? (Culture shock)</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.cultureShock}
                onChange={(e) => updateElderKeeperImmigrantJourney('cultureShock', e.target.value)}
                placeholder="The weather? The food available? The way people ate? The kitchens? What surprised or challenged you?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>🔄 How did the cooking change?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.foodAdaptations}
                onChange={(e) => updateElderKeeperImmigrantJourney('foodAdaptations', e.target.value)}
                placeholder="What had to change when you started cooking here? Different equipment? Different timing? Different audience?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>🛒 What couldn't you get? What did you substitute?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.ingredientSubstitutions}
                onChange={(e) => updateElderKeeperImmigrantJourney('ingredientSubstitutions', e.target.value)}
                placeholder="Ingredients that weren't available (or were too expensive). What you used instead. How it changed the dish."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>💔 What do you miss?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.whatYouMiss}
                onChange={(e) => updateElderKeeperImmigrantJourney('whatYouMiss', e.target.value)}
                placeholder="Flavours you can't recreate. Ingredients that aren't the same. The way food was 'back home'. The people you ate with..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>✨ What did you discover here?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.whatYouDiscovered}
                onChange={(e) => updateElderKeeperImmigrantJourney('whatYouDiscovered', e.target.value)}
                placeholder="New ingredients that work well? Fusion discoveries? Things that are actually easier here?"
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>🔗 How does food keep you connected to home?</label>
              <textarea
                value={state.elderKeeperData.immigrantJourney.connectionMaintained}
                onChange={(e) => updateElderKeeperImmigrantJourney('connectionMaintained', e.target.value)}
                placeholder="Does cooking this dish feel like home? How does food help you stay connected to your heritage? To family far away?"
                rows={4}
              />
            </div>

            <div className={styles.optionalNote}>
              <p>
                <strong>Note:</strong> Not everyone has an immigrant story - if this doesn't apply, skip ahead. 
                If it does, this is some of the most valuable documentation you can create.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <h2>The Practical Details</h2>
            <p className={styles.stepIntro}>
              Now the stuff that lets someone actually make this dish.
            </p>

            <div className={styles.formGroup}>
              <label>Ingredients</label>
              <textarea
                value={state.elderKeeperData.ingredients}
                onChange={(e) => updateElderKeeperData('ingredients', e.target.value)}
                placeholder="List ingredients - include both traditional names AND what people might find in UK shops. Include rough quantities if you can, but 'enough' and 'to taste' are also valid measurements."
                rows={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Seasonal/Timing Notes</label>
              <textarea
                value={state.elderKeeperData.seasonalTiming}
                onChange={(e) => updateElderKeeperData('seasonalTiming', e.target.value)}
                placeholder="When is this dish traditionally made? Is it seasonal? For specific occasions? Does it need to be started days ahead? Any timing that matters?"
                rows={4}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className={styles.stepContent}>
            <h2>You've Preserved Something Precious</h2>
            <div className={styles.completionCard}>
              <div className={styles.completionIcon}>📜</div>
              <h3>Thank You, Guardian</h3>
              <p>
                You've documented <strong>{state.elderKeeperData.dishName}</strong> - 
                not just the recipe, but the words, the stories, the journey.
              </p>
              <p>
                This knowledge will outlive us all. Future generations will know these words, 
                these techniques, these stories - because you took the time to document them.
              </p>
              <p><strong>The chain continues because of you.</strong></p>
              
              <button onClick={generateElderDocument} className={styles.downloadButton}>
                📄 Download Heritage Recipe Document
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========================================
  // MAIN RENDER
  // ========================================

  const getTotalSteps = (): number => {
    if (state.path === 'lost-lamb') return 9;
    if (state.path === 'elder-keeper') return 6;
    return 0;
  };

  return (
    <div className={styles.heritageKeeper}>
      {/* Maya Guide */}
      {state.path !== 'choosing' && (
        <div className={styles.mayaShepherd}>
          <div className={styles.mayaIcon}>✨</div>
          <div className={styles.mayaMessage}>
            <p>{getMayaMessage()}</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {state.path !== 'choosing' && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${(state.currentStep / getTotalSteps()) * 100}%` }}
          />
          <span className={styles.progressText}>
            Step {state.currentStep} of {getTotalSteps()}
          </span>
        </div>
      )}

      {/* Content */}
      {state.path === 'choosing' && renderPathSelection()}
      {state.path === 'lost-lamb' && renderLostLambStep()}
      {state.path === 'elder-keeper' && renderElderKeeperStep()}
      {state.path === 'somewhere-between' && (
        <div className={styles.stepContent}>
          <h2>Coming Soon</h2>
          <p>The "Somewhere Between" journey is being developed. For now, choose either the Disconnected or Elder Keeper path based on which feels closer to your experience.</p>
          <button onClick={() => setState(initialState)} className={styles.backButton}>
            ← Go Back
          </button>
        </div>
      )}

      {/* Navigation */}
      {state.path !== 'choosing' && state.currentStep < getTotalSteps() && (
        <div className={styles.navigationButtons}>
          <button onClick={goBack} className={styles.backButton}>
            ← Back
          </button>
          <button 
            onClick={goNext} 
            className={styles.nextButton}
            disabled={!canProceedFromStep()}
          >
            Continue →
          </button>
        </div>
      )}

      {state.path !== 'choosing' && state.currentStep === getTotalSteps() && (
        <div className={styles.navigationButtons}>
          <button onClick={clearProgress} className={styles.restartButton}>
            🔄 Start Another Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeHeritageKeeper;