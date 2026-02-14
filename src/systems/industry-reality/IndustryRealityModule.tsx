/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * 
 * INDUSTRY REALITY MODULE
 * "The Twelve Truths They Won't Tell You"
 * Based on T-Pain's industry experiences and wisdom
 */

import React, { createContext, useContext, useState, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

export interface IndustryTruth {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tpainQuote: string;
  tpainSource: string;
  realityCheck: string;
  whatTheyTellYou: string;
  whatActuallyHappens: string;
  howToProtectYourself: string[];
  programmes: string[];
  ageAppropriate: 'all' | '11-14' | '14-18' | '18+';
  discussionQuestions: string[];
  activities: {
    title: string;
    duration: number;
    steps: string[];
  }[];
}

// ============================================
// THE TWELVE TRUTHS
// ============================================

export const INDUSTRY_TRUTHS: IndustryTruth[] = [
  
  // TRUTH #1: The Cool Legitimiser
  {
    id: 'truth-01-cool-legitimiser',
    number: 1,
    title: 'The Cool Legitimiser',
    subtitle: 'They need your culture more than you need their platform',
    tpainQuote: "They'd bring me in just to make their artist seem more credible. I was the 'urban' stamp of approval.",
    tpainSource: 'Shannon Sharpe Interview',
    realityCheck: 'Major labels and brands use Black artists to legitimise white artists or products. Your cultural capital has value - don\'t give it away.',
    whatTheyTellYou: '"This collaboration will be great exposure for you!"',
    whatActuallyHappens: 'You provide credibility; they provide nothing lasting. Your cultural authenticity becomes their marketing tool.',
    howToProtectYourself: [
      'Ask: "What am I getting beyond exposure?"',
      'Demand equal billing or fair compensation',
      'Understand that YOUR credibility is the product',
      'If they need you for "cool," charge accordingly'
    ],
    programmes: ['trubble-n-bass', 'techreneurs', 'kaywanas-court'],
    ageAppropriate: '14-18',
    discussionQuestions: [
      'Can you think of examples where Black culture was used to make something else seem "cool"?',
      'What\'s the difference between collaboration and exploitation?',
      'How do you know when your cultural capital is being used fairly?'
    ],
    activities: [
      {
        title: 'Spot the Legitimiser',
        duration: 20,
        steps: [
          'Find 3 ads or songs that feature Black artists with white artists',
          'Analyse: Who gets top billing? Who benefits more?',
          'Discuss: Was this fair collaboration or legitimising?'
        ]
      }
    ]
  },

  // TRUTH #5: Contract Reality
  {
    id: 'truth-05-contract-reality',
    number: 5,
    title: 'Contract Reality',
    subtitle: 'What you sign determines what you keep',
    tpainQuote: "I signed a 360 deal before I understood what 360 meant. They owned everything - music, touring, merch, everything.",
    tpainSource: 'Various interviews',
    realityCheck: 'Contracts are designed to benefit the label, not you. Every clause has consequences. Excitement makes you sign fast; regret makes you read slow.',
    whatTheyTellYou: '"This is standard. Everyone signs this. Don\'t worry about the details."',
    whatActuallyHappens: 'You sign away rights you didn\'t know you had. Years later, you discover you don\'t own your own music.',
    howToProtectYourself: [
      'NEVER sign without a lawyer reviewing',
      'If they rush you, that\'s a red flag',
      'Understand what "360 deal" means (they take from everything)',
      'Ask: "What do I OWN after this?"'
    ],
    programmes: ['trubble-n-bass', 'techreneurs', 'kaywanas-court'],
    ageAppropriate: '14-18',
    discussionQuestions: [
      'Why do labels want you to sign quickly?',
      'What does "owning your masters" mean?',
      'Why is a lawyer important even if you trust the other person?'
    ],
    activities: [
      {
        title: 'Contract Red Flags',
        duration: 30,
        steps: [
          'Read a sample contract (simplified version)',
          'Highlight every clause that takes something from the artist',
          'Calculate: What percentage does the artist actually keep?',
          'Rewrite one clause to be fairer'
        ]
      }
    ]
  },

  // TRUTH #10: Honesty as Currency
  {
    id: 'truth-10-honesty-currency',
    number: 10,
    title: 'Honesty as Currency',
    subtitle: 'Being real has long-term value',
    tpainQuote: "When I started being honest about what happened to me, that's when people really connected. The vulnerability is the power.",
    tpainSource: 'Shannon Sharpe Interview',
    realityCheck: 'The industry rewards image over honesty, but audiences connect with truth. Your real story - including struggles - is more valuable than a manufactured persona.',
    whatTheyTellYou: '"Don\'t talk about the hard stuff. Keep the image clean."',
    whatActuallyHappens: 'Artists who hide their truth burn out. Those who share authentically build lasting connections.',
    howToProtectYourself: [
      'Your struggles are not weaknesses - they\'re connection points',
      'Authenticity builds loyal audiences',
      'You control when and how you share your story',
      'Being real about the industry helps others avoid traps'
    ],
    programmes: ['trubble-n-bass', 'kaywanas-court', 'pageturners', 'g-tech-casters'],
    ageAppropriate: 'all',
    discussionQuestions: [
      'Why do we connect more with honest stories than perfect images?',
      'What\'s the difference between being vulnerable and oversharing?',
      'How did T-Pain\'s honesty change how people saw him?'
    ],
    activities: [
      {
        title: 'Your Real Story',
        duration: 25,
        steps: [
          'Write one true thing about yourself that you usually hide',
          'Why do you hide it? Fear? Shame? Expectation?',
          'Reframe it: How could this be a strength?',
          'Optional: Share with the group'
        ]
      }
    ]
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTruthById(id: string): IndustryTruth | undefined {
  return INDUSTRY_TRUTHS.find(t => t.id === id);
}

export function getTruthsByProgramme(programmeId: string): IndustryTruth[] {
  return INDUSTRY_TRUTHS.filter(t => t.programmes.includes(programmeId));
}

export function getTruthByNumber(num: number): IndustryTruth | undefined {
  return INDUSTRY_TRUTHS.find(t => t.number === num);
}

// ============================================
// CONTEXT
// ============================================

interface IndustryRealityContextType {
  truths: IndustryTruth[];
  getTruth: (id: string) => IndustryTruth | undefined;
  getTruthsForProgramme: (programmeId: string) => IndustryTruth[];
}

const IndustryRealityContext = createContext<IndustryRealityContextType | null>(null);

export function IndustryRealityProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({
    truths: INDUSTRY_TRUTHS,
    getTruth: getTruthById,
    getTruthsForProgramme: getTruthsByProgramme
  }), []);

  return (
    <IndustryRealityContext.Provider value={value}>
      {children}
    </IndustryRealityContext.Provider>
  );
}

export function useIndustryReality() {
  const context = useContext(IndustryRealityContext);
  if (!context) {
    throw new Error('useIndustryReality must be used within IndustryRealityProvider');
  }
  return context;
}

// ============================================
// COMPONENT
// ============================================

interface IndustryRealityModuleProps {
  programmeId?: string;
  truthId?: string;
}

export default function IndustryRealityModule({ programmeId, truthId }: IndustryRealityModuleProps) {
  const [selectedTruth, setSelectedTruth] = useState<IndustryTruth | null>(
    truthId ? getTruthById(truthId) || null : null
  );

  const truths = programmeId 
    ? getTruthsByProgramme(programmeId)
    : INDUSTRY_TRUTHS;

  return (
    <div className="industry-reality-module">
      <h2>Industry Reality: The Truths They Won't Tell You</h2>
      <p className="subtitle">Based on T-Pain's experiences in the music industry</p>
      
      <div className="truths-grid">
        {truths.map(truth => (
          <div 
            key={truth.id}
            className={`truth-card ${selectedTruth?.id === truth.id ? 'selected' : ''}`}
            onClick={() => setSelectedTruth(truth)}
          >
            <span className="truth-number">#{truth.number}</span>
            <h3>{truth.title}</h3>
            <p>{truth.subtitle}</p>
          </div>
        ))}
      </div>

      {selectedTruth && (
        <div className="truth-detail">
          <h3>Truth #{selectedTruth.number}: {selectedTruth.title}</h3>
          
          <blockquote className="tpain-quote">
            "{selectedTruth.tpainQuote}"
            <cite>— T-Pain, {selectedTruth.tpainSource}</cite>
          </blockquote>

          <div className="reality-section">
            <h4>What They Tell You:</h4>
            <p className="what-they-say">{selectedTruth.whatTheyTellYou}</p>
            
            <h4>What Actually Happens:</h4>
            <p className="what-happens">{selectedTruth.whatActuallyHappens}</p>
          </div>

          <div className="protection-section">
            <h4>How to Protect Yourself:</h4>
            <ul>
              {selectedTruth.howToProtectYourself.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="discussion-section">
            <h4>Discussion Questions:</h4>
            <ol>
              {selectedTruth.discussionQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
