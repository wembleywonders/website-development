/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 * 
 * BLACK BRITISH EXCELLENCE DATABASE - STARTER VERSION
 * This is a minimal version to get you started.
 * Full database has 39 profiles - contact for complete version.
 */

import React, { createContext, useContext, useState, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

export interface ExcellenceProfile {
  id: string;
  name: string;
  birthYear?: number;
  origin: string;
  heritage: string[];
  primaryField: string;
  knownFor: string[];
  programmes: string[];
  primaryProgramme: string;
  era: 'pioneer' | 'established' | 'rising' | 'emerging' | 'legacy';
  authenticityLevel: 'uncompromised' | 'high-integrity' | 'symbolic' | 'commercial';
  biography: { heading: string; content: string }[];
  keyQuotes: { text: string; source?: string; forProgramme?: string[] }[];
  lessonsWeLearn: Lesson[];
  isActive: boolean;
  northWestLondonConnection?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  ageGroup: string;
  programmes: string[];
  overview: string;
  keyTakeaways: string[];
}

// ============================================
// STARTER PROFILES (3 Examples)
// ============================================

export const BLACK_BRITISH_EXCELLENCE: ExcellenceProfile[] = [
  
  // JAZZIE B - Music Pioneer
  {
    id: 'jazzie-b',
    name: 'Jazzie B',
    birthYear: 1963,
    origin: 'Finsbury Park, North London',
    heritage: ['Antiguan', 'British'],
    primaryField: 'Music Production / Sound System Culture',
    knownFor: [
      'Founder of Soul II Soul',
      'Pioneer of British soul/R&B',
      '"A happy face, a thumpin\' bass" philosophy'
    ],
    programmes: ['trubble-n-bass', 'techreneurs'],
    primaryProgramme: 'trubble-n-bass',
    era: 'established',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Origins',
        content: 'Born Beresford Romeo in 1963 to Antiguan parents in Finsbury Park. Grew up in sound system culture - the mobile disco tradition from Jamaica that became the foundation of British Black music.'
      },
      {
        heading: 'Building Soul II Soul',
        content: 'Founded Soul II Soul in 1982. Built from the ground up: warehouse parties, a Camden shop, a clothing line - all before a record deal. Two Grammy Awards followed in 1990.'
      }
    ],
    keyQuotes: [
      {
        text: "A happy face, a thumpin' bass, for a lovin' race.",
        source: 'Soul II Soul philosophy',
        forProgramme: ['trubble-n-bass']
      },
      {
        text: "We built it ourselves. The shop, the sound system, the parties. The record deal came after, not before.",
        forProgramme: ['trubble-n-bass', 'techreneurs']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'jazzie-b-lesson-1',
        title: 'Build Before You Sign',
        duration: 45,
        ageGroup: '14-18',
        programmes: ['trubble-n-bass', 'techreneurs'],
        overview: 'Jazzie B built Soul II Soul\'s infrastructure before seeking a record deal. When the deal came, he negotiated from strength.',
        keyTakeaways: [
          'Build your audience and infrastructure first',
          'A record deal is not the goal - it\'s a tool',
          'Community investment pays long-term dividends'
        ]
      }
    ],
    isActive: true,
    northWestLondonConnection: 'Soul II Soul\'s influence spread across London including NW London Caribbean communities.'
  },

  // KANYA KING - LOCAL HERO (Kilburn)
  {
    id: 'kanya-king',
    name: 'Kanya King',
    birthYear: 1970,
    origin: 'Kilburn, North West London',
    heritage: ['Ghanaian', 'Irish', 'British'],
    primaryField: 'Entrepreneur / Music Industry',
    knownFor: [
      'Founder of MOBO Awards',
      'Remortgaged home to fund first ceremony',
      'CBE for services to music industry'
    ],
    programmes: ['techreneurs', 'trubble-n-bass'],
    primaryProgramme: 'techreneurs',
    era: 'established',
    authenticityLevel: 'high-integrity',
    biography: [
      {
        heading: 'Origins',
        content: 'Born in Kilburn, North West London to a Ghanaian father and Irish mother. THIS IS OUR LOCAL HERO - from the same streets as our young people.'
      },
      {
        heading: 'The Risk',
        content: 'In 1996, Kanya remortgaged her home to fund the first MOBO (Music of Black Origin) Awards. Everyone said she was crazy. The ceremony nearly bankrupted her. But she persisted, and MOBO became a national institution.'
      }
    ],
    keyQuotes: [
      {
        text: "I remortgaged my home. Everyone said I was crazy. But I knew we needed this platform.",
        forProgramme: ['techreneurs']
      },
      {
        text: "If no one is going to celebrate our music properly, we have to create the ceremony ourselves.",
        forProgramme: ['techreneurs', 'trubble-n-bass']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'kanya-lesson-1',
        title: 'Risking Everything for Vision',
        duration: 45,
        ageGroup: '14-18',
        programmes: ['techreneurs'],
        overview: 'Kanya King remortgaged her home - her only security - to fund the first MOBO Awards. This lesson explores calculated risk.',
        keyTakeaways: [
          'Some visions require real sacrifice',
          'Know the difference between reckless and calculated risk',
          'Build what\'s missing instead of waiting'
        ]
      }
    ],
    isActive: true,
    northWestLondonConnection: 'FROM KILBURN - Same postcode as many Wembley Wonders young people.'
  },

  // MICHAELA COEL - Ownership
  {
    id: 'michaela-coel',
    name: 'Michaela Coel',
    birthYear: 1987,
    origin: 'Tower Hamlets, East London',
    heritage: ['Ghanaian', 'British'],
    primaryField: 'Actor / Writer / Producer',
    knownFor: [
      'Created "I May Destroy You"',
      'Turned down $1M Netflix deal to retain copyright',
      'Emmy Award winner',
      '"Chewing Gum" creator'
    ],
    programmes: ['kaywanas-court', 'techreneurs', 'pageturners'],
    primaryProgramme: 'kaywanas-court',
    era: 'rising',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Origins',
        content: 'Born in Tower Hamlets, East London to Ghanaian parents. Grew up on a council estate. Studied at Guildhall School of Music and Drama.'
      },
      {
        heading: 'The Million Dollar Decision',
        content: 'Netflix offered her $1 million for "I May Destroy You." The catch: they wanted all rights. Michaela said no. She made it with BBC instead, retaining copyright. The show won acclaim and awards - and she OWNS it.'
      }
    ],
    keyQuotes: [
      {
        text: "I left the one million on the table. Ownership is everything.",
        forProgramme: ['kaywanas-court', 'techreneurs']
      },
      {
        text: "Do not be afraid to disappear, from it, from us, for a while, and see what comes to you in the silence.",
        source: 'Emmy acceptance speech',
        forProgramme: ['kaywanas-court']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'michaela-lesson-1',
        title: 'Ownership Over Everything',
        duration: 60,
        ageGroup: '14-18',
        programmes: ['kaywanas-court', 'techreneurs'],
        overview: 'Michaela turned down $1M to keep ownership of her work. This lesson explores why ownership matters more than one-time payments.',
        keyTakeaways: [
          'Ownership is more valuable than one-time payment',
          'Know what you\'re signing away',
          'Walking away is sometimes the best deal'
        ]
      }
    ],
    isActive: true,
    northWestLondonConnection: 'Though from East London, represents estate-background success that resonates with NW London youth.'
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProfilesByProgramme(programmeId: string): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(p => p.programmes.includes(programmeId));
}

export function getProfileById(id: string): ExcellenceProfile | undefined {
  return BLACK_BRITISH_EXCELLENCE.find(p => p.id === id);
}

export function getQuoteOfTheDay(programmeId?: string): { text: string; profileName: string } {
  const profiles = programmeId 
    ? getProfilesByProgramme(programmeId)
    : BLACK_BRITISH_EXCELLENCE;
  
  const allQuotes = profiles.flatMap(p => 
    p.keyQuotes.map(q => ({ text: q.text, profileName: p.name }))
  );
  
  const today = new Date().getDate();
  return allQuotes[today % allQuotes.length] || { text: '', profileName: '' };
}

export function getLocalHeroes(): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(p => p.northWestLondonConnection);
}

// ============================================
// CONTEXT
// ============================================

interface ExcellenceContextType {
  profiles: ExcellenceProfile[];
  getProfile: (id: string) => ExcellenceProfile | undefined;
  quoteOfTheDay: (programmeId?: string) => { text: string; profileName: string };
}

const ExcellenceContext = createContext<ExcellenceContextType | null>(null);

export function ExcellenceProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({
    profiles: BLACK_BRITISH_EXCELLENCE,
    getProfile: getProfileById,
    quoteOfTheDay: getQuoteOfTheDay
  }), []);

  return (
    <ExcellenceContext.Provider value={value}>
      {children}
    </ExcellenceContext.Provider>
  );
}

export function useExcellence() {
  const context = useContext(ExcellenceContext);
  if (!context) {
    throw new Error('useExcellence must be used within ExcellenceProvider');
  }
  return context;
}

export default BLACK_BRITISH_EXCELLENCE;
