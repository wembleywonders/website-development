/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 *
 * BLACK BRITISH EXCELLENCE DATABASE - ENHANCED v2.0
 * Disciplines: Sports · Music · Entrepreneurship · Arts · Activism · Science
 * Frameworks: Routes (geography) · Timeline (chronology) · Programme mapping
 */

import React, { createContext, useContext, useState, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

export type Discipline =
  | 'music'
  | 'sports'
  | 'entrepreneurship'
  | 'arts'
  | 'activism'
  | 'science-tech'
  | 'media'
  | 'fashion'
  | 'food-culture'
  | 'law-justice';

export type Era =
  | 'victorian'      // pre-1900
  | 'early-century'  // 1900–1950
  | 'windrush'       // 1948–1970
  | 'uprising'       // 1970–1985
  | 'renaissance'    // 1985–2000
  | 'established'    // 2000–2015
  | 'rising'         // 2015–present
  | 'emerging'       // new voices
  | 'legacy';        // historical, passed

export type AuthenticityLevel =
  | 'uncompromised'
  | 'high-integrity'
  | 'symbolic'
  | 'commercial';

export type TubeLineColour =
  | 'bakerloo'       // brown  — South/West London
  | 'central'        // red    — East–West corridor
  | 'jubilee'        // silver — NW London / Wembley
  | 'metropolitan'   // magenta — NW / outer London
  | 'victoria'       // blue   — North–South
  | 'northern'       // black  — North London
  | 'district'       // green  — South West / East
  | 'piccadilly'     // dark blue — NW / Heathrow
  | 'overground'     // orange — cross-London
  | 'elizabeth'      // purple — East–West express
  | 'dlr';           // teal   — East London

export interface GeographicPin {
  area: string;                  // e.g. "Wembley", "Brixton", "Hackney"
  borough?: string;              // e.g. "Brent", "Lambeth"
  postcodeStem?: string;         // e.g. "HA9", "SW2"
  tubeStation?: string;          // nearest tube/overground
  tubeLine?: TubeLineColour;
  overgroundZone?: number;       // 1–6
  aToZPage?: string;             // e.g. "47 C3" — A-Z London reference
  coordinates?: { lat: number; lng: number };
  significance: string;          // why this place matters to the profile
}

export interface SoundLineage {
  genre: string;
  rootGenres: string[];          // what came before
  descendantGenres: string[];    // what grew from it
  keyVenues: string[];           // London venues where it lived
  keyYears: string;              // e.g. "1978–1988"
  tubeRoutes: string[];          // tube lines that connected the scene
}

export interface TimelineEntry {
  year: number;
  event: string;
  significance: 'personal' | 'community' | 'national' | 'global';
  connectedProfiles?: string[];  // other profile IDs active at same time
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  ageGroup: string;
  programmes: string[];
  overview: string;
  keyTakeaways: string[];
  routesActivity?: string;       // geography-based activity
  timelineChallenge?: string;    // timeline game prompt
  debatePrompt?: string;         // for G-Tech Casters draft debates
}

export interface ExcellenceProfile {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  origin: string;
  heritage: string[];
  discipline: Discipline;
  secondaryDisciplines?: Discipline[];
  primaryField: string;
  knownFor: string[];
  programmes: string[];
  primaryProgramme: string;
  era: Era;
  authenticityLevel: AuthenticityLevel;
  biography: { heading: string; content: string }[];
  keyQuotes: { text: string; source?: string; forProgramme?: string[] }[];
  lessonsWeLearn: Lesson[];
  isActive: boolean;
  // Routes layer
  geographicPins: GeographicPin[];
  northWestLondonConnection?: string;
  // Timeline layer
  timeline: TimelineEntry[];
  // Sound lineage (music profiles only)
  soundLineage?: SoundLineage;
  // Structural analysis — what system were they navigating?
  structuralContext: string;
  // The gap — why aren't they more widely known?
  theGap?: string;
  // Pioneer index — for timeline game scoring
  pioneerScore: number;          // 1–10, subjective cultural impact
}

// ============================================
// PROFILES
// ============================================

export const BLACK_BRITISH_EXCELLENCE: ExcellenceProfile[] = [

  // ──────────────────────────────────────────
  // SPORTS: ARTHUR WHARTON
  // ──────────────────────────────────────────
  {
    id: 'arthur-wharton',
    name: 'Arthur Wharton',
    birthYear: 1865,
    deathYear: 1930,
    origin: 'Accra, Gold Coast (now Ghana)',
    heritage: ['Ghanaian', 'Scottish'],
    discipline: 'sports',
    primaryField: 'Professional Footballer / Sprinter',
    knownFor: [
      'World\'s first Black professional footballer',
      'Goalkeeper for Preston North End and Rotherham United',
      'Equal world record holder for 100 yards sprint (1886)',
      'Buried in an unmarked grave — restored 1997'
    ],
    programmes: ['gtechcasters', 'pageturners', 'heritage'],
    primaryProgramme: 'gtechcasters',
    era: 'victorian',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'The Pioneer Nobody Remembered',
        content: 'Arthur Wharton arrived in Britain from the Gold Coast in 1882 to train as a Methodist missionary. Instead he became the greatest sportsman of his generation — and was almost entirely erased from history.'
      },
      {
        heading: 'The Footballer',
        content: 'In 1889, Wharton became the world\'s first Black professional footballer, playing goalkeeper for Preston North End — the dominant team of the era. He was acrobatic, fearless, and extraordinary. He was also underpaid, undervalued, and eventually forgotten.'
      },
      {
        heading: 'The Sprinter',
        content: 'Before football, Wharton equalled the world record for the 100 yards sprint at the AAA Championships in 1886. The same year he turned professional in football. Had he focused on athletics, history might have named him differently.'
      },
      {
        heading: 'The Unmarked Grave',
        content: 'Wharton died in poverty in 1930 and was buried in an unmarked grave in Edlington, Yorkshire. He was not rediscovered until the 1990s. A headstone was finally erected in 1997. The Football Association\'s Hall of Fame inducted him in 2003 — 73 years after his death.'
      }
    ],
    keyQuotes: [
      {
        text: 'He was here. He excelled. We forgot him. That forgetting was not an accident.',
        forProgramme: ['gtechcasters', 'pageturners']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'wharton-lesson-1',
        title: 'Who Decides What Gets Remembered?',
        duration: 60,
        ageGroup: '12–18',
        programmes: ['gtechcasters', 'pageturners'],
        overview: 'Wharton\'s erasure from football history was not accidental. This lesson explores how archives are constructed and whose stories get told.',
        keyTakeaways: [
          'History is written by those who control the archive',
          'Being exceptional does not guarantee being remembered',
          'Counter-archives are acts of resistance'
        ],
        routesActivity: 'Map Wharton\'s career on the rail network of 1886 — Preston, Sheffield, Rotherham. How far from London? Why does distance from London affect historical memory?',
        timelineChallenge: 'Place Wharton on the timeline: what else was happening in British football in 1889?',
        debatePrompt: 'G-Tech Casters draft: Is Arthur Wharton the most important figure in British football history that nobody knows?'
      }
    ],
    isActive: false,
    geographicPins: [
      {
        area: 'Preston',
        significance: 'Played for Preston North End — the dominant English club of the 1880s',
        coordinates: { lat: 53.7632, lng: -2.7031 }
      },
      {
        area: 'Rotherham',
        significance: 'Later career in Yorkshire — further from London, further from historical memory',
        coordinates: { lat: 53.4326, lng: -1.3635 }
      },
      {
        area: 'Edlington, Yorkshire',
        significance: 'Died here in poverty. Buried in an unmarked grave until 1997.',
        coordinates: { lat: 53.5012, lng: -1.2178 }
      }
    ],
    timeline: [
      { year: 1882, event: 'Arrives in Britain from Gold Coast', significance: 'personal' },
      { year: 1886, event: 'Equals world 100 yards sprint record at AAA Championships', significance: 'national' },
      { year: 1889, event: 'Becomes world\'s first Black professional footballer at Preston North End', significance: 'global' },
      { year: 1930, event: 'Dies in poverty, buried in unmarked grave', significance: 'personal' },
      { year: 1997, event: 'Headstone finally erected — 67 years after death', significance: 'community' },
      { year: 2003, event: 'Inducted into Football Association Hall of Fame', significance: 'national' }
    ],
    structuralContext: 'Victorian Britain permitted Black excellence in performance but denied it in ownership, legacy, and memory. Wharton could play — but the institutions that preserved football history were not built to preserve him.',
    theGap: 'No statues. No stadium named after him. Inducted into the FA Hall of Fame 73 years after his death. Compare with white contemporaries of lesser achievement who have streets, stands, and plaques.',
    pioneerScore: 10
  },

  // ──────────────────────────────────────────
  // SPORTS: DALEY THOMPSON
  // ──────────────────────────────────────────
  {
    id: 'daley-thompson',
    name: 'Daley Thompson',
    birthYear: 1958,
    origin: 'Notting Hill, West London',
    heritage: ['Nigerian', 'Scottish'],
    discipline: 'sports',
    primaryField: 'Decathlete',
    knownFor: [
      'Double Olympic gold medallist (1980, 1984)',
      'Four-time World Champion',
      'Refused to perform deference — brash, irreverent, sovereign',
      'Wore a t-shirt mocking Carl Lewis at the 1984 Olympics'
    ],
    programmes: ['gtechcasters', 'heritage', 'bright-sparks'],
    primaryProgramme: 'gtechcasters',
    era: 'uprising',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Notting Hill Boy',
        content: 'Born in Notting Hill in 1958 — the same neighbourhood where the 1958 race riots had scarred the community. His Nigerian father was killed when Daley was twelve. He found athletics and became the best multi-event athlete on earth.'
      },
      {
        heading: 'Behavioural Sovereignty',
        content: 'At the 1984 Los Angeles Olympics, Thompson won gold in the decathlon and wore a t-shirt that referenced his rivalry with Carl Lewis. He smiled constantly, refused to be deferential, and performed joy rather than gratitude. In 1984 Britain, this was political.'
      },
      {
        heading: 'The Unbreakable Record',
        content: 'Thompson\'s world record in the decathlon stood for years. He was the dominant force in his event across two Olympic cycles. By any measure, one of the greatest British athletes ever — consistently undersold in national memory compared to white contemporaries.'
      }
    ],
    keyQuotes: [
      {
        text: 'I\'m the best athlete in the world. I\'ve proved it. Why would I pretend otherwise?',
        forProgramme: ['gtechcasters']
      },
      {
        text: 'The best motivation is when someone tells you that you can\'t.',
        forProgramme: ['bright-sparks', 'gtechcasters']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'daley-lesson-1',
        title: 'Sovereignty of Self — Not Performing Gratitude',
        duration: 45,
        ageGroup: '14–18',
        programmes: ['gtechcasters'],
        overview: 'Daley Thompson was the best in the world and acted like it. In 1984 Britain, a Black man refusing to be deferential was a political act. This lesson explores behavioural sovereignty.',
        keyTakeaways: [
          'Excellence does not require humility to systems that excluded you',
          'Joy and confidence are political',
          'Define your own terms of success'
        ],
        debatePrompt: 'Daley Thompson vs Kelly Holmes: Who had the greater cultural impact on British identity?',
        timelineChallenge: 'Place Thompson\'s 1984 gold against the political backdrop: Thatcher, the miners\' strike, Section 28 proposals. What Britain was he winning in?'
      }
    ],
    isActive: false,
    geographicPins: [
      {
        area: 'Notting Hill',
        borough: 'Kensington & Chelsea',
        postcodeStem: 'W11',
        tubeStation: 'Ladbroke Grove',
        tubeLine: 'central',
        significance: 'Born here — same neighbourhood as the 1958 race riots, ten years before his birth',
        aToZPage: '56 B2'
      },
      {
        area: 'Crystal Palace',
        borough: 'Bromley',
        tubeStation: 'Crystal Palace (Overground)',
        tubeLine: 'overground',
        significance: 'National Sports Centre — where British athletics was trained and tested',
        aToZPage: '91 D4'
      }
    ],
    timeline: [
      { year: 1958, event: 'Born in Notting Hill — same area as 1958 race riots', significance: 'personal' },
      { year: 1978, event: 'Wins first Commonwealth Games decathlon gold', significance: 'national' },
      { year: 1980, event: 'Olympic gold, Moscow', significance: 'global' },
      { year: 1984, event: 'Olympic gold, Los Angeles — wears the t-shirt', significance: 'global' },
      { year: 1986, event: 'Sets world decathlon record', significance: 'global' }
    ],
    structuralContext: '1980s Britain: Thatcherism, National Front activity, Brixton uprising 1981. Thompson\'s refusal to perform deference was a cultural intervention in a climate that expected gratitude from Black Britons.',
    theGap: 'No major national museum exhibition. Rarely cited in discussions of British sporting greatness at the level his achievements warrant.',
    pioneerScore: 9
  },

  // ──────────────────────────────────────────
  // SPORTS: LEN JOHNSON
  // ──────────────────────────────────────────
  {
    id: 'len-johnson',
    name: 'Len Johnson',
    birthYear: 1902,
    deathYear: 1974,
    origin: 'Miles Platting, Manchester',
    heritage: ['Madeiran-Portuguese', 'British'],
    discipline: 'sports',
    secondaryDisciplines: ['activism'],
    primaryField: 'Boxer / Community Organiser',
    knownFor: [
      'Barred from British title fights due to race',
      'Undefeated in many bouts he was never officially credited for',
      'Became a Communist Party organiser in Manchester',
      'His story recovers the hidden history of Black Britain in the North'
    ],
    programmes: ['gtechcasters', 'pageturners', 'heritage'],
    primaryProgramme: 'gtechcasters',
    era: 'early-century',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'The Boxer They Wouldn\'t Crown',
        content: 'Len Johnson was one of the finest middleweights in Britain during the 1920s and 1930s. The British Boxing Board of Control had an explicit rule: no person of "colour" could compete for a British title. Johnson never got his shot.'
      },
      {
        heading: 'After the Ring',
        content: 'Rather than disappearing in bitterness, Johnson became a Communist Party organiser in Manchester, fighting for workers\' rights and against racial discrimination. His political life was as remarkable as his sporting one.'
      },
      {
        heading: 'Why This Matters for Wembley Wonders',
        content: 'Johnson\'s story is the sports version of the structural lesson: exceptional performance does not guarantee access when the rules are designed to exclude. And the response — building political power rather than seeking permission — is the Wembley Wonders way.'
      }
    ],
    keyQuotes: [
      {
        text: 'They changed the rules to keep him out. He changed the rules to let everyone in.',
        forProgramme: ['gtechcasters', 'pageturners']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'johnson-lesson-1',
        title: 'When the Rules Are Rigged — Build New Rules',
        duration: 60,
        ageGroup: '14–18',
        programmes: ['gtechcasters', 'pageturners'],
        overview: 'Len Johnson was explicitly barred from British title fights by written rule. His response — community organising — shows what happens when you stop seeking permission from a system designed to exclude you.',
        keyTakeaways: [
          'Rules that exclude are rules that can be changed',
          'Sport and politics are never separate',
          'Community power outlasts individual glory'
        ],
        debatePrompt: 'Is Len Johnson more important than Muhammad Ali to the history of Black British boxing?',
        timelineChallenge: 'Who else was barred from British institutions in the 1920s–30s on grounds of race? Build the parallel timeline.'
      }
    ],
    isActive: false,
    geographicPins: [
      {
        area: 'Miles Platting, Manchester',
        significance: 'Born and raised here — demonstrates that Black Britain\'s history is not just London',
        coordinates: { lat: 53.4906, lng: -2.1987 }
      },
      {
        area: 'Manchester City Centre',
        significance: 'Communist Party organising — his political base after boxing',
        coordinates: { lat: 53.4808, lng: -2.2426 }
      }
    ],
    timeline: [
      { year: 1902, event: 'Born in Miles Platting, Manchester', significance: 'personal' },
      { year: 1920, event: 'Begins professional boxing career', significance: 'personal' },
      { year: 1929, event: 'Explicitly barred from British title fights by BBBofC racial rule', significance: 'national' },
      { year: 1935, event: 'Joins Communist Party, begins community organising', significance: 'community' },
      { year: 1948, event: 'Windrush arrives — Britain\'s racial landscape shifts', significance: 'national', connectedProfiles: ['claudia-jones'] },
      { year: 1974, event: 'Dies in Manchester', significance: 'personal' }
    ],
    structuralContext: 'The British Boxing Board of Control\'s racial exclusion rule was explicit and written. It wasn\'t prejudice — it was policy. Johnson\'s response was to organise politically rather than petition for inclusion.',
    theGap: 'Almost entirely unknown outside Manchester boxing history circles. No national recognition. His story is the northern counterpart to Wharton\'s southern erasure.',
    pioneerScore: 9
  },

  // ──────────────────────────────────────────
  // SPORTS: LEWIS HAMILTON
  // ──────────────────────────────────────────
  {
    id: 'lewis-hamilton',
    name: 'Lewis Hamilton',
    birthYear: 1985,
    origin: 'Stevenage, Hertfordshire',
    heritage: ['Grenadian', 'British'],
    discipline: 'sports',
    secondaryDisciplines: ['activism', 'entrepreneurship'],
    primaryField: 'Formula One Driver / Activist',
    knownFor: [
      'Seven World Championship titles — most in F1 history',
      'Only Black driver in F1 for most of his career',
      'Mission 44 — foundation for underrepresented young people',
      'Post-2020 transformation: public anti-racism activism'
    ],
    programmes: ['gtechcasters', 'stemgeneers', 'techreneurs'],
    primaryProgramme: 'stemgeneers',
    era: 'rising',
    authenticityLevel: 'high-integrity',
    biography: [
      {
        heading: 'Stevenage to the Grid',
        content: 'Born in Stevenage to a Grenadian father and British mother. His father worked multiple jobs to fund early karting. Hamilton was the only Black driver on the grid from his debut in 2007 until 2022 — a 15-year span of visible isolation in the most watched motorsport on earth.'
      },
      {
        heading: 'The Silence and the Speaking',
        content: 'For years Hamilton rarely spoke publicly about race. After the murder of George Floyd in 2020, he broke that silence entirely — taking a knee on the grid, calling out F1\'s diversity problem, launching Mission 44. The transformation was deliberate and costly in some circles.'
      },
      {
        heading: 'STEM as the Entry Point',
        content: 'F1 is the most technically complex sport on earth. Hamilton\'s excellence is not just physical — it is engineering literacy, data analysis, aerodynamic understanding. His story is the premier STEM-in-sports narrative for British young people.'
      }
    ],
    keyQuotes: [
      {
        text: 'I\'ve been one of the only people of colour in this space for 14 years. I\'m not going to be silent.',
        forProgramme: ['gtechcasters', 'stemgeneers']
      },
      {
        text: 'I want to be remembered for what I did off the track as much as on it.',
        forProgramme: ['techreneurs']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'hamilton-lesson-1',
        title: 'STEM is the New Track — Engineering Your Future',
        duration: 60,
        ageGroup: '12–18',
        programmes: ['stemgeneers', 'techreneurs'],
        overview: 'F1 is pure applied STEM. Hamilton\'s career shows how engineering, data science, and aerodynamics are as important as reflexes. This lesson connects sport to STEM pathways.',
        keyTakeaways: [
          'Sport at elite level is applied science',
          'Understanding systems gives you competitive advantage',
          'The pipeline from school to F1 is broken — Mission 44 is trying to fix it'
        ],
        routesActivity: 'Map every F1 circuit in Europe on an A-Z equivalent. Which cities? Which countries? What does the geography of F1 tell you about who the sport was built for?',
        debatePrompt: 'Hamilton: GOAT or product of the best car? Argue both sides with data.'
      },
      {
        id: 'hamilton-lesson-2',
        title: 'The Cost of Speaking — When Silence Ends',
        duration: 45,
        ageGroup: '16–25',
        programmes: ['gtechcasters', 'pageturners'],
        overview: 'Hamilton was silent on race for 13 years in F1. Then he wasn\'t. This lesson explores why people stay silent, what changes their minds, and what it costs to speak.',
        keyTakeaways: [
          'Silence in hostile spaces is a survival strategy, not cowardice',
          'Speaking carries real cost — count it before judging',
          'Platforms create obligations'
        ],
        debatePrompt: 'Should Hamilton have spoken sooner? What would it have cost him if he had?'
      }
    ],
    isActive: true,
    geographicPins: [
      {
        area: 'Stevenage',
        borough: 'Hertfordshire',
        significance: 'Born here — the unglamorous suburban origin that makes his journey more remarkable',
        coordinates: { lat: 51.9020, lng: -0.2042 }
      },
      {
        area: 'Silverstone',
        significance: 'British Grand Prix — his home race, where crowd dynamics and race are always visible',
        coordinates: { lat: 52.0786, lng: -1.0169 }
      }
    ],
    timeline: [
      { year: 1985, event: 'Born in Stevenage', significance: 'personal' },
      { year: 1998, event: 'Joins McLaren young driver programme aged 13', significance: 'personal' },
      { year: 2007, event: 'F1 debut — nearly wins championship in first season', significance: 'global' },
      { year: 2008, event: 'First World Championship title', significance: 'global' },
      { year: 2020, event: 'Takes knee on F1 grid. Launches Mission 44. Breaks silence on race.', significance: 'global' },
      { year: 2024, event: 'Knighted — Sir Lewis Hamilton', significance: 'national' }
    ],
    structuralContext: 'F1 is a sport built on generational wealth, European infrastructure, and inherited access. Hamilton broke into it via exceptional talent and a father who sacrificed everything. His isolation as the only Black driver for 15 years was structural, not accidental.',
    theGap: 'Despite seven world titles, Hamilton\'s cultural significance in British Black communities is arguably undersold. The STEM dimension of his career is almost never centred in discussions of his legacy.',
    pioneerScore: 10
  },

  // ──────────────────────────────────────────
  // MUSIC: JAZZIE B (retained, enhanced)
  // ──────────────────────────────────────────
  {
    id: 'jazzie-b',
    name: 'Jazzie B',
    birthYear: 1963,
    origin: 'Finsbury Park, North London',
    heritage: ['Antiguan', 'British'],
    discipline: 'music',
    primaryField: 'Music Producer / Sound System Pioneer',
    knownFor: [
      'Founder of Soul II Soul',
      'Pioneer of British soul and R&B as global export',
      '"A happy face, a thumpin\' bass" — the philosophy before the record',
      'Built the infrastructure before seeking the record deal'
    ],
    programmes: ['trubble-n-bass', 'techreneurs', 'gtechcasters'],
    primaryProgramme: 'trubble-n-bass',
    era: 'renaissance',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Sound System Roots',
        content: 'Born Beresford Romeo in 1963 to Antiguan parents in Finsbury Park. Grew up inside sound system culture — the mobile disco tradition from Jamaica that migrated to London and became the DNA of British Black music. Sound systems were the original community platform: controlled, owned, and operated by the community.'
      },
      {
        heading: 'Building Before Signing',
        content: 'Jazzie B built Soul II Soul\'s infrastructure entirely before approaching a label. Warehouse parties in Paddington. A shop on Camden High Street. A clothing line. A sound system. A community. The record deal came to them — not the other way round. Two Grammy Awards followed in 1990.'
      },
      {
        heading: 'The Architecture of Independence',
        content: 'Soul II Soul was not a band — it was a collective, a brand, a philosophy, and a business. The music was the most visible output of a much deeper structure. This is the model Wembley Wonders recognises in its own architecture.'
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
        ageGroup: '14–18',
        programmes: ['trubble-n-bass', 'techreneurs'],
        overview: 'Jazzie B built Soul II Soul\'s infrastructure before seeking a record deal. When the deal came, he negotiated from strength, not desperation.',
        keyTakeaways: [
          'Build your audience and infrastructure first',
          'A record deal is not the goal — it\'s a tool',
          'The community is the business model'
        ],
        routesActivity: 'Trace the Soul II Soul route: Finsbury Park → Paddington warehouses → Camden shop → global. Map it on the tube network. Which lines connected the scene?',
        timelineChallenge: 'What was happening in Black British music in 1982 when Soul II Soul started? Place it in the lineage.',
        debatePrompt: 'Soul II Soul or Massive Attack: Which British Black collective had the greater structural impact on music ownership?'
      }
    ],
    isActive: true,
    geographicPins: [
      {
        area: 'Finsbury Park',
        borough: 'Islington / Haringey',
        postcodeStem: 'N4',
        tubeStation: 'Finsbury Park',
        tubeLine: 'victoria',
        significance: 'Born and raised here — North London Caribbean community heartland',
        aToZPage: '48 A1'
      },
      {
        area: 'Camden',
        borough: 'Camden',
        postcodeStem: 'NW1',
        tubeStation: 'Camden Town',
        tubeLine: 'northern',
        significance: 'Soul II Soul shop on Camden High Street — the physical base of the operation',
        aToZPage: '46 C3'
      },
      {
        area: 'Paddington',
        borough: 'Westminster',
        tubeStation: 'Paddington',
        tubeLine: 'bakerloo',
        significance: 'Warehouse party scene — where Soul II Soul built its audience before any label',
        aToZPage: '55 D2'
      }
    ],
    timeline: [
      { year: 1963, event: 'Born in Finsbury Park to Antiguan parents', significance: 'personal' },
      { year: 1982, event: 'Founds Soul II Soul — starts with warehouse parties, no label', significance: 'community' },
      { year: 1988, event: 'Opens Soul II Soul shop on Camden High Street', significance: 'community' },
      { year: 1989, event: '"Keep On Movin\'" reaches #5 UK — album goes double platinum', significance: 'national' },
      { year: 1990, event: 'Two Grammy Awards — British Black music reaches global market', significance: 'global' }
    ],
    soundLineage: {
      genre: 'British Soul / Sound System R&B',
      rootGenres: ['Jamaican Sound System', 'Funk', 'Lovers Rock', 'Chicago House'],
      descendantGenres: ['UK Garage', 'Grime (indirect)', 'UK R&B', 'Neo-Soul'],
      keyVenues: ['Camden Soul II Soul shop', 'Paddington warehouse parties', 'Africa Centre Covent Garden'],
      keyYears: '1982–1995',
      tubeRoutes: ['Victoria line (Finsbury Park–Brixton corridor)', 'Northern line (Camden axis)']
    },
    structuralContext: 'The music industry in the 1980s controlled distribution, manufacturing, and radio access. Soul II Soul\'s strategy of building community infrastructure first meant they had leverage when they finally engaged the industry.',
    theGap: 'Soul II Soul\'s business model — collective ownership, community-first, brand before label — is rarely taught in music business courses despite being a more sustainable model than most of what replaced it.',
    pioneerScore: 9
  },

  // ──────────────────────────────────────────
  // ENTREPRENEURSHIP: KANYA KING (enhanced)
  // ──────────────────────────────────────────
  {
    id: 'kanya-king',
    name: 'Kanya King CBE',
    birthYear: 1970,
    origin: 'Kilburn, North West London',
    heritage: ['Ghanaian', 'Irish', 'British'],
    discipline: 'entrepreneurship',
    secondaryDisciplines: ['music', 'activism'],
    primaryField: 'Entrepreneur / Music Industry Pioneer',
    knownFor: [
      'Founder of MOBO Awards',
      'Remortgaged her home to fund the first ceremony (1996)',
      'CBE for services to music industry',
      'FROM KILBURN — same streets as Wembley Wonders young people'
    ],
    programmes: ['techreneurs', 'trubble-n-bass', 'kaywanas-court'],
    primaryProgramme: 'techreneurs',
    era: 'renaissance',
    authenticityLevel: 'high-integrity',
    biography: [
      {
        heading: 'Our Local Hero',
        content: 'Born in Kilburn, North West London to a Ghanaian father and Irish mother. THIS IS THE DETAIL THAT MATTERS TO WEMBLEY WONDERS: Kanya King comes from the same streets as our community. Same postcodes. Same NW London landscape. She is not a distant inspiration — she is a neighbour who made it and can be met.'
      },
      {
        heading: 'The Mortgage Risk',
        content: 'In 1996, Kanya King could not find anyone to fund the first MOBO Awards — Music of Black Origin. So she remortgaged her home. Everyone told her she was crazy. The ceremony nearly bankrupted her. She pushed through. MOBO became a national institution that created platforms for decades of Black British artists.'
      },
      {
        heading: 'Why MOBO Mattered',
        content: 'Before MOBO, Black British music was either ignored by mainstream awards or exoticised. MOBO said: this music deserves its own ceremony, on its own terms, celebrating its own excellence. It was an act of institutional self-determination — the Garvey principle in music industry form.'
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
        title: 'Risking Everything for Vision — The Calculated Bet',
        duration: 45,
        ageGroup: '14–25',
        programmes: ['techreneurs', 'kaywanas-court'],
        overview: 'Kanya King remortgaged her home — her only security — to fund the first MOBO Awards. This lesson explores the difference between reckless risk and calculated vision.',
        keyTakeaways: [
          'Some visions require real sacrifice, not just effort',
          'Know the difference between reckless and calculated risk',
          'Build what\'s missing instead of waiting for permission'
        ],
        routesActivity: 'Kilburn to the Royal Albert Hall (MOBO\'s early venue). Map it on the tube. How far is Kilburn from the establishment venues of London culture? What does the journey mean?',
        debatePrompt: 'Would MOBO have been possible without Kanya King\'s personal financial risk? Or would someone else have done it eventually?'
      }
    ],
    isActive: true,
    geographicPins: [
      {
        area: 'Kilburn',
        borough: 'Brent',
        postcodeStem: 'NW6',
        tubeStation: 'Kilburn',
        tubeLine: 'jubilee',
        overgroundZone: 2,
        significance: 'WHERE SHE GREW UP — same NW London community as Wembley Wonders. Jubilee line connects Kilburn directly to Wembley Park.',
        aToZPage: '45 C2'
      },
      {
        area: 'Wembley',
        borough: 'Brent',
        postcodeStem: 'HA9',
        tubeStation: 'Wembley Park',
        tubeLine: 'jubilee',
        overgroundZone: 4,
        significance: 'Direct Jubilee line connection from Kilburn — Kanya King\'s story connects directly to Wembley\'s community',
        aToZPage: '43 B1'
      }
    ],
    timeline: [
      { year: 1970, event: 'Born in Kilburn, North West London', significance: 'personal' },
      { year: 1996, event: 'Remortgages home to fund first MOBO Awards ceremony', significance: 'national' },
      { year: 1996, event: 'First MOBO Awards held at Royal Albert Hall', significance: 'national' },
      { year: 2000, event: 'MOBO establishes itself as major national institution', significance: 'national' },
      { year: 2014, event: 'Awarded CBE for services to music industry', significance: 'national' }
    ],
    structuralContext: 'The music awards industry in Britain in the 1990s did not have a framework to celebrate Black music on its own terms. The BRIT Awards treated it as a niche category. MOBO was an act of institutional self-determination — building the ceremony the industry refused to build.',
    northWestLondonConnection: 'FROM KILBURN — Jubilee line directly to Wembley Park. Same borough (Brent). Same community landscape. The most local hero in the database.',
    theGap: 'Kanya King\'s business story — the mortgage risk, the near-bankruptcy, the persistence — is almost never taught as an entrepreneurship case study despite being more instructive than most Silicon Valley origin myths.',
    pioneerScore: 9
  },

  // ──────────────────────────────────────────
  // ARTS / MEDIA: MICHAELA COEL (enhanced)
  // ──────────────────────────────────────────
  {
    id: 'michaela-coel',
    name: 'Michaela Coel',
    birthYear: 1987,
    origin: 'Tower Hamlets, East London',
    heritage: ['Ghanaian', 'British'],
    discipline: 'arts',
    secondaryDisciplines: ['media', 'entrepreneurship'],
    primaryField: 'Actor / Writer / Producer / IP Owner',
    knownFor: [
      'Created "I May Destroy You" — refused $1M Netflix deal to retain copyright',
      'Emmy Award winner',
      '"Chewing Gum" — wrote, starred, and produced from council estate experience',
      'Edinburgh Television Festival MacTaggart Lecture on ownership (2018)'
    ],
    programmes: ['kaywanas-court', 'techreneurs', 'pageturners', 'easy-street'],
    primaryProgramme: 'kaywanas-court',
    era: 'rising',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Tower Hamlets to Guildhall',
        content: 'Born in Tower Hamlets to Ghanaian parents. Grew up on a council estate. Won a scholarship to Guildhall School of Music and Drama. The scholarship was not the exception it should have been — it was the only door available.'
      },
      {
        heading: 'The MacTaggart Lecture',
        content: 'In 2018, Michaela delivered the Edinburgh Television Festival\'s MacTaggart Lecture — one of the most prestigious platforms in British broadcasting. She used it to discuss sexual assault, the industry\'s power imbalances, and the fundamental importance of ownership. It was a structural critique delivered from the establishment\'s own stage.'
      },
      {
        heading: 'The Million Dollar Decision',
        content: 'Netflix offered her $1 million for "I May Destroy You." The condition: they wanted all rights. Michaela said no. She made it with BBC instead, retaining copyright. The show won Emmy Awards, BAFTA Awards, and critical acclaim worldwide. She owns it. The lesson is permanent.'
      }
    ],
    keyQuotes: [
      {
        text: "I left the one million on the table. Ownership is everything.",
        forProgramme: ['kaywanas-court', 'techreneurs']
      },
      {
        text: "Do not be afraid to disappear, from it, from us, for a while, and see what comes to you in the silence.",
        source: 'Emmy acceptance speech 2021',
        forProgramme: ['kaywanas-court', 'easy-street']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'michaela-lesson-1',
        title: 'Ownership Over Everything — The $1M Decision',
        duration: 60,
        ageGroup: '16–25',
        programmes: ['kaywanas-court', 'techreneurs'],
        overview: 'Michaela turned down $1 million to keep copyright ownership of her work. This lesson dissects the economics: what is ownership worth versus a one-time payment?',
        keyTakeaways: [
          'Copyright ownership is a long-term annuity, not a one-time asset',
          'Know what you\'re signing away before you sign',
          'Walking away is sometimes the most powerful deal'
        ],
        debatePrompt: 'Was Michaela\'s decision to turn down Netflix financially rational? Run the numbers. What would the rights be worth now?'
      },
      {
        id: 'michaela-lesson-2',
        title: 'Writing What You Know — The Council Estate as Creative Resource',
        duration: 45,
        ageGroup: '14–18',
        programmes: ['pageturners', 'easy-street'],
        overview: '"Chewing Gum" came directly from Michaela\'s council estate experience. This lesson explores how lived experience is creative capital — not something to overcome but something to mine.',
        keyTakeaways: [
          'Your specific experience is your creative advantage',
          'The mainstream market will not commission your story unless you commission it yourself',
          'Specificity creates universality — the more real, the more resonant'
        ],
        routesActivity: 'Tower Hamlets to Guildhall School of Music & Drama. Map the journey. What does crossing London to access cultural education mean?'
      }
    ],
    isActive: true,
    geographicPins: [
      {
        area: 'Tower Hamlets',
        borough: 'Tower Hamlets',
        postcodeStem: 'E1',
        tubeStation: 'Stepney Green',
        tubeLine: 'district',
        significance: 'Grew up here on a council estate — the origin of Chewing Gum and I May Destroy You',
        aToZPage: '57 D3'
      },
      {
        area: 'Barbican / Guildhall',
        borough: 'City of London',
        tubeStation: 'Barbican',
        tubeLine: 'metropolitan',
        significance: 'Guildhall School of Music & Drama — accessed via scholarship. The contrast with Tower Hamlets is the story.',
        aToZPage: '57 A2'
      }
    ],
    timeline: [
      { year: 1987, event: 'Born in Tower Hamlets to Ghanaian parents', significance: 'personal' },
      { year: 2006, event: 'Wins scholarship to Guildhall School of Music & Drama', significance: 'personal' },
      { year: 2015, event: '"Chewing Gum" debuts on E4 — wrote, starred, produced', significance: 'national' },
      { year: 2018, event: 'MacTaggart Lecture at Edinburgh Television Festival — structural critique of the industry', significance: 'national' },
      { year: 2020, event: '"I May Destroy You" airs on BBC — having turned down $1M Netflix deal', significance: 'global' },
      { year: 2021, event: 'Emmy Award — owns every frame of the show', significance: 'global' }
    ],
    structuralContext: 'The television industry in Britain extracts IP from writers, particularly those without agents or legal backing. Michaela\'s decision to retain copyright was not just personal — it was a public demonstration that ownership was possible, and that the industry\'s standard offer could be refused.',
    theGap: 'Michaela Coel\'s ownership decision is the most important case study in British creative IP in 20 years. It is almost never taught in media studies or creative industries courses.',
    pioneerScore: 10
  },

  // ──────────────────────────────────────────
  // ACTIVISM: CLAUDIA JONES
  // ──────────────────────────────────────────
  {
    id: 'claudia-jones',
    name: 'Claudia Jones',
    birthYear: 1915,
    deathYear: 1964,
    origin: 'Trinidad (lived in Notting Hill, London)',
    heritage: ['Trinidadian', 'British'],
    discipline: 'activism',
    secondaryDisciplines: ['media'],
    primaryField: 'Political Organiser / Journalist / Carnival Founder',
    knownFor: [
      'Founded Notting Hill Carnival (1959) as a political response to race riots',
      'Founded the West Indian Gazette — first Black newspaper in Britain',
      'Deported from USA under McCarthyism',
      'Buried in Highgate Cemetery next to Karl Marx'
    ],
    programmes: ['pageturners', 'gtechcasters', 'joystick', 'heritage'],
    primaryProgramme: 'pageturners',
    era: 'windrush',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'From Trinidad to the FBI\'s Files',
        content: 'Claudia Jones was born in Trinidad, moved to New York as a child, and became one of the most important Black Communist activists in America. The FBI monitored her for years. She was deported under McCarthyism in 1955 — and came to Britain.'
      },
      {
        heading: 'The Carnival as Politics',
        content: 'After the 1958 Notting Hill race riots, Claudia Jones did not petition the government. She organised a Caribbean Carnival — indoors at St Pancras Town Hall in 1959. It was an act of defiance, community assertion, and joy as political resistance. This became the Notting Hill Carnival. The largest street festival in Europe grew from that indoor hall.'
      },
      {
        heading: 'The West Indian Gazette',
        content: 'Jones also founded the West Indian Gazette in 1958 — the first Black newspaper in Britain. It covered civil rights, colonial independence movements, and community news that mainstream British newspapers ignored. She understood that community media was community power.'
      }
    ],
    keyQuotes: [
      {
        text: 'A people\'s art is the genesis of their freedom.',
        source: 'West Indian Gazette',
        forProgramme: ['pageturners', 'gtechcasters', 'joystick']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'claudia-lesson-1',
        title: 'Joy as Politics — The Carnival Principle',
        duration: 60,
        ageGroup: '14–25',
        programmes: ['pageturners', 'gtechcasters'],
        overview: 'Claudia Jones created the Notting Hill Carnival as a political response to race riots. Joy, culture, and celebration were deliberate tools of community assertion — not entertainment for others.',
        keyTakeaways: [
          'Culture is infrastructure, not decoration',
          'Celebration after violence is an act of resistance',
          'Community media and community celebration serve the same function'
        ],
        routesActivity: 'Trace Carnival\'s route: St Pancras Town Hall (1959) → Notting Hill streets (1966 onwards). Map on the tube. What changed when it moved outside? What does that geography tell us?',
        debatePrompt: 'Is the modern Notting Hill Carnival still what Claudia Jones intended? What has been gained and lost?'
      }
    ],
    isActive: false,
    geographicPins: [
      {
        area: 'Notting Hill',
        borough: 'Kensington & Chelsea',
        postcodeStem: 'W11',
        tubeStation: 'Ladbroke Grove',
        tubeLine: 'central',
        significance: 'The 1958 race riots happened here. The Carnival was born here as a direct response.',
        aToZPage: '56 A2'
      },
      {
        area: 'St Pancras',
        borough: 'Camden',
        tubeStation: 'King\'s Cross St. Pancras',
        tubeLine: 'victoria',
        significance: 'St Pancras Town Hall — venue for the first indoor Caribbean Carnival (1959)',
        aToZPage: '47 A3'
      },
      {
        area: 'Highgate',
        borough: 'Haringey',
        tubeStation: 'Highgate',
        tubeLine: 'northern',
        significance: 'Buried in Highgate Cemetery, next to Karl Marx',
        aToZPage: '34 C4'
      }
    ],
    timeline: [
      { year: 1915, event: 'Born in Trinidad', significance: 'personal' },
      { year: 1955, event: 'Deported from USA under McCarthyism — arrives in Britain', significance: 'personal' },
      { year: 1958, event: 'Founds West Indian Gazette — first Black newspaper in Britain', significance: 'national' },
      { year: 1958, event: 'Notting Hill race riots', significance: 'national', connectedProfiles: ['daley-thompson'] },
      { year: 1959, event: 'Organises first Caribbean Carnival at St Pancras Town Hall', significance: 'community' },
      { year: 1964, event: 'Dies on Christmas Eve, aged 49 — buried next to Karl Marx', significance: 'national' }
    ],
    structuralContext: 'Britain in 1958 had no legal framework protecting Black citizens from racial violence. The government\'s response to the Notting Hill riots was inadequate. Claudia Jones\'s response was to build community infrastructure — a newspaper and a carnival — that outlasted the riots by decades.',
    theGap: 'The Notting Hill Carnival draws 2 million people annually. Most attendees have never heard of Claudia Jones. No statue. No national museum exhibition. A blue plaque on a building in Notting Hill.',
    northWestLondonConnection: 'Notting Hill is the western edge of the NW London arc. The communities she organised among are the same communities whose descendants now live across Brent.',
    pioneerScore: 10
  },

  // ──────────────────────────────────────────
  // SCIENCE / TECH: MARK DEAN
  // (for STEMgeneers — lesser known, gap finder)
  // ──────────────────────────────────────────
  {
    id: 'mark-dean',
    name: 'Mark Dean',
    birthYear: 1957,
    origin: 'Jefferson City, Tennessee, USA (Black British context: diaspora connection)',
    heritage: ['African-American'],
    discipline: 'science-tech',
    primaryField: 'Computer Engineer / IBM Pioneer',
    knownFor: [
      'Co-invented the IBM Personal Computer (1981)',
      'Holds three of IBM\'s original nine PC patents',
      'Developed the ISA bus — the architecture that allowed peripherals to connect to PCs',
      'First Black VP at IBM'
    ],
    programmes: ['stemgeneers', 'techreneurs', 'bright-sparks'],
    primaryProgramme: 'stemgeneers',
    era: 'established',
    authenticityLevel: 'uncompromised',
    biography: [
      {
        heading: 'Why Mark Dean in a UK Platform?',
        content: 'Mark Dean is American, not British. He is here because his story illustrates a specific structural lesson: Black excellence in technical fields is systematically erased from the history of those fields. British students learning about computing almost never encounter his name, despite him holding three of the nine original IBM PC patents — the device that defined personal computing.'
      },
      {
        heading: 'The Architecture of Everything',
        content: 'Dean co-developed the ISA bus — the interface that allowed the IBM PC to connect to printers, monitors, and peripherals. Without this, the personal computer as we know it does not function. He also led the team that developed the first 1GHz chip. He is foundational to the technology infrastructure that Wembley Wonders itself runs on.'
      }
    ],
    keyQuotes: [
      {
        text: 'I have a lot of patents. But the work that matters most to me is the work that opens doors for others.',
        forProgramme: ['stemgeneers']
      }
    ],
    lessonsWeLearn: [
      {
        id: 'dean-lesson-1',
        title: 'The Invisible Architect — How Black STEM History Gets Erased',
        duration: 45,
        ageGroup: '12–18',
        programmes: ['stemgeneers', 'bright-sparks'],
        overview: 'Mark Dean helped invent the computer you\'re probably using right now. Most people in tech have never heard of him. This lesson explores structural erasure in STEM history.',
        keyTakeaways: [
          'STEM has a diversity problem that starts in its historical narrative',
          'Representation in history changes what young people believe is possible',
          'Claiming credit for your work is not arrogance — it\'s accuracy'
        ],
        debatePrompt: 'Should school computing curricula be required to include Black inventors? Argue for and against.'
      }
    ],
    isActive: false,
    geographicPins: [
      {
        area: 'Global / Diaspora',
        significance: 'Included as diaspora STEM reference — the Black Atlantic intellectual tradition has no borders'
      }
    ],
    timeline: [
      { year: 1957, event: 'Born in Jefferson City, Tennessee', significance: 'personal' },
      { year: 1980, event: 'Joins IBM', significance: 'personal' },
      { year: 1981, event: 'IBM Personal Computer launches — Dean holds 3 of 9 original patents', significance: 'global' },
      { year: 1995, event: 'Becomes first Black VP at IBM', significance: 'national' },
      { year: 1999, event: 'Leads team developing first 1GHz chip', significance: 'global' }
    ],
    structuralContext: 'The computing industry in 1981 was almost entirely white and male. Dean\'s achievement in this context is not just technical — it is structural. The fact that he is unknown outside specialist circles is a feature of how STEM history is written, not an accident.',
    theGap: 'Every computing device in Wembley Wonders\' building connects via architecture Dean helped design. None of the young people who use those devices know his name.',
    pioneerScore: 8
  }

];

// ============================================
// ROUTES DATA — GEOGRAPHIC LAYER
// ============================================

export interface RouteStop {
  area: string;
  tubeStation?: string;
  tubeLine?: TubeLineColour;
  profiles: string[];         // profile IDs connected to this stop
  significance: string;
  era: Era;
}

export const LONDON_ROUTES: RouteStop[] = [
  {
    area: 'Wembley',
    tubeStation: 'Wembley Park',
    tubeLine: 'jubilee',
    profiles: ['kanya-king'],
    significance: 'Wembley Wonders HQ. The High Road community. End of the Jubilee line arc from Kilburn.',
    era: 'rising'
  },
  {
    area: 'Kilburn',
    tubeStation: 'Kilburn',
    tubeLine: 'jubilee',
    profiles: ['kanya-king'],
    significance: 'Kanya King\'s origin — NW London Caribbean community. Direct Jubilee line to Wembley.',
    era: 'renaissance'
  },
  {
    area: 'Notting Hill',
    tubeStation: 'Ladbroke Grove',
    tubeLine: 'central',
    profiles: ['daley-thompson', 'claudia-jones'],
    significance: '1958 race riots. Daley Thompson\'s birthplace. Claudia Jones\'s Carnival origin.',
    era: 'uprising'
  },
  {
    area: 'Finsbury Park',
    tubeStation: 'Finsbury Park',
    tubeLine: 'victoria',
    profiles: ['jazzie-b'],
    significance: 'North London Caribbean heartland. Jazzie B\'s origin.',
    era: 'renaissance'
  },
  {
    area: 'Camden',
    tubeStation: 'Camden Town',
    tubeLine: 'northern',
    profiles: ['jazzie-b'],
    significance: 'Soul II Soul shop. Counter-cultural music commerce.',
    era: 'renaissance'
  },
  {
    area: 'Brixton',
    tubeStation: 'Brixton',
    tubeLine: 'victoria',
    profiles: [],
    significance: 'Windrush landing zone. 1981 uprisings. Cultural heartland of South London Black community.',
    era: 'windrush'
  },
  {
    area: 'Hackney / Dalston',
    tubeStation: 'Dalston Kingsland',
    tubeLine: 'overground',
    profiles: [],
    significance: 'Sound system culture. Early jungle and drum & bass scene. East London Caribbean community.',
    era: 'uprising'
  },
  {
    area: 'Tower Hamlets',
    tubeStation: 'Stepney Green',
    tubeLine: 'district',
    profiles: ['michaela-coel'],
    significance: 'Michaela Coel\'s origin. Council estate to Guildhall scholarship.',
    era: 'rising'
  },
  {
    area: 'St Pancras / King\'s Cross',
    tubeStation: "King's Cross St. Pancras",
    tubeLine: 'victoria',
    profiles: ['claudia-jones'],
    significance: 'First Caribbean Carnival venue (1959). The indoor beginning of what became Europe\'s largest street festival.',
    era: 'windrush'
  }
];

// ============================================
// TIMELINE GAME DATA
// ============================================

export interface TimelineGameEvent {
  id: string;
  year: number;
  description: string;
  profileId?: string;
  category: 'sport' | 'music' | 'politics' | 'arts' | 'science' | 'community';
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  funFact: string;
}

export const TIMELINE_GAME_EVENTS: TimelineGameEvent[] = [
  {
    id: 'tge-wharton-first',
    year: 1889,
    description: 'The world\'s first Black professional footballer signs for Preston North End',
    profileId: 'arthur-wharton',
    category: 'sport',
    difficulty: 'hard',
    hint: 'Victorian era. Northern England. A goalkeeper from Ghana.',
    funFact: 'He also held the world sprint record. Preston North End were the dominant English club at the time.'
  },
  {
    id: 'tge-carnival-first',
    year: 1959,
    description: 'First Caribbean Carnival held indoors at St Pancras Town Hall — a political response to the 1958 race riots',
    profileId: 'claudia-jones',
    category: 'community',
    difficulty: 'medium',
    hint: 'A Trinidadian woman deported from America organised this.',
    funFact: 'It is now the largest street festival in Europe, attended by 2 million people annually.'
  },
  {
    id: 'tge-daley-double',
    year: 1984,
    description: 'A Notting Hill-born decathlete wins his second Olympic gold and wears a controversial t-shirt on the podium',
    profileId: 'daley-thompson',
    category: 'sport',
    difficulty: 'easy',
    hint: 'Los Angeles Olympics. Decathlon. The t-shirt referenced a rival.',
    funFact: 'The t-shirt read "Is the world\'s second greatest athlete gay?" — a reference to his rivalry with Carl Lewis.'
  },
  {
    id: 'tge-soul-ii-soul',
    year: 1989,
    description: '"Keep On Movin\'" reaches the UK top five. British Black music goes global for the first time on its own terms.',
    profileId: 'jazzie-b',
    category: 'music',
    difficulty: 'medium',
    hint: 'Antiguan roots. North London. A collective, not a band.',
    funFact: 'The album went double platinum. Two Grammys followed in 1990. The shop came before the record deal.'
  },
  {
    id: 'tge-mobo-first',
    year: 1996,
    description: 'A Kilburn woman remortgages her home to fund the first ceremony celebrating Music of Black Origin',
    profileId: 'kanya-king',
    category: 'music',
    difficulty: 'medium',
    hint: 'NW London. Jubilee line. The gamble paid off.',
    funFact: 'The first MOBO Awards were held at the Royal Albert Hall. Everyone told her she was crazy.'
  },
  {
    id: 'tge-hamilton-first',
    year: 2007,
    description: 'The only Black driver on the Formula One grid nearly wins the championship in his first season',
    profileId: 'lewis-hamilton',
    category: 'sport',
    difficulty: 'easy',
    hint: 'Stevenage. Grenadian heritage. McLaren.',
    funFact: 'He missed the 2007 championship by one point. He would go on to win seven.'
  },
  {
    id: 'tge-coel-netflix',
    year: 2020,
    description: 'A British writer-director turns down $1 million to retain ownership of her work',
    profileId: 'michaela-coel',
    category: 'arts',
    difficulty: 'medium',
    hint: 'Tower Hamlets. Council estate. Guildhall. Emmy Award.',
    funFact: 'She made the show with BBC instead. She won the Emmy. She owns every frame.'
  },
  {
    id: 'tge-len-johnson-bar',
    year: 1929,
    description: 'The British Boxing Board of Control issues an explicit written rule barring people of colour from British title fights',
    profileId: 'len-johnson',
    category: 'sport',
    difficulty: 'hard',
    hint: 'Manchester. Middleweight. Communist Party organiser.',
    funFact: 'The rule was not a prejudice — it was a written policy. Johnson responded by becoming a community organiser.'
  }
];

// ============================================
// SOUND LINEAGE MAP — for Trubble n Bass
// ============================================

export interface SoundJourney {
  id: string;
  name: string;
  startGenre: string;
  startLocation: string;
  startYear: number;
  endGenre: string;
  endLocation: string;
  endYear: number;
  stops: {
    genre: string;
    location: string;
    year: number;
    tubeStation?: string;
    tubeLine?: TubeLineColour;
    note: string;
  }[];
  profileIds: string[];
}

export const SOUND_JOURNEYS: SoundJourney[] = [
  {
    id: 'ska-to-grime',
    name: 'From Kingston to the Grid: The Bass Music Journey',
    startGenre: 'Ska / Mento',
    startLocation: 'Kingston, Jamaica',
    startYear: 1958,
    endGenre: 'Grime / UK Drill',
    endLocation: 'East London',
    endYear: 2003,
    stops: [
      {
        genre: 'Ska / Rocksteady',
        location: 'Kingston, Jamaica → Brixton, London',
        year: 1962,
        tubeStation: 'Brixton',
        tubeLine: 'victoria',
        note: 'Windrush generation brings the sound. Brixton becomes the London base.'
      },
      {
        genre: 'Reggae / Lovers Rock',
        location: 'Brixton / Ladbroke Grove',
        year: 1972,
        tubeStation: 'Ladbroke Grove',
        tubeLine: 'central',
        note: 'Lovers Rock is invented in South London — the first specifically Black British pop genre.'
      },
      {
        genre: 'Sound System Soul / Early Hip-Hop influence',
        location: 'Finsbury Park / Camden / Paddington',
        year: 1982,
        tubeStation: 'Camden Town',
        tubeLine: 'northern',
        note: 'Jazzie B builds Soul II Soul in warehouse parties. North London becomes a creative hub.'
      },
      {
        genre: 'Jungle / Drum and Bass',
        location: 'Hackney / Dalston / Bristol',
        year: 1992,
        tubeStation: 'Dalston Kingsland',
        tubeLine: 'overground',
        note: 'Jungle emerges from rave culture and reggae bass. East London and Bristol co-create it.'
      },
      {
        genre: 'UK Garage',
        location: 'South London / East London',
        year: 1995,
        tubeStation: 'Elephant & Castle',
        tubeLine: 'bakerloo',
        note: 'Speed garage and 2-step. The template for everything that follows.'
      },
      {
        genre: 'Grime',
        location: 'Bow, East London',
        year: 2003,
        tubeStation: 'Bow Road',
        tubeLine: 'district',
        note: 'Pirate radio, MC culture, council estate production. Grime is the final compression of the whole lineage.'
      }
    ],
    profileIds: ['jazzie-b']
  }
];

// ============================================
// HELPER FUNCTIONS — ENHANCED
// ============================================

export function getProfilesByProgramme(programmeId: string): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(p => p.programmes.includes(programmeId));
}

export function getProfileById(id: string): ExcellenceProfile | undefined {
  return BLACK_BRITISH_EXCELLENCE.find(p => p.id === id);
}

export function getProfilesByDiscipline(discipline: Discipline): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(
    p => p.discipline === discipline || p.secondaryDisciplines?.includes(discipline)
  );
}

export function getProfilesByEra(era: Era): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(p => p.era === era);
}

export function getLocalHeroes(): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE.filter(p => p.northWestLondonConnection);
}

export function getRoutesByTubeLine(line: TubeLineColour): RouteStop[] {
  return LONDON_ROUTES.filter(r => r.tubeLine === line);
}

export function getProfilesNearStation(station: string): ExcellenceProfile[] {
  const profileIds = new Set<string>();
  BLACK_BRITISH_EXCELLENCE.forEach(p => {
    p.geographicPins.forEach(pin => {
      if (pin.tubeStation?.toLowerCase().includes(station.toLowerCase())) {
        profileIds.add(p.id);
      }
    });
  });
  return BLACK_BRITISH_EXCELLENCE.filter(p => profileIds.has(p.id));
}

export function getTimelineGameEvents(
  category?: TimelineGameEvent['category'],
  difficulty?: TimelineGameEvent['difficulty']
): TimelineGameEvent[] {
  return TIMELINE_GAME_EVENTS.filter(e => {
    if (category && e.category !== category) return false;
    if (difficulty && e.difficulty !== difficulty) return false;
    return true;
  });
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

export function getSoundJourneyForProgramme(programmeId: string): SoundJourney[] {
  const profileIds = getProfilesByProgramme(programmeId).map(p => p.id);
  return SOUND_JOURNEYS.filter(j =>
    j.profileIds.some(id => profileIds.includes(id))
  );
}

export function getDebatePrompts(programmeId: string): { prompt: string; profileName: string }[] {
  const profiles = getProfilesByProgramme(programmeId);
  return profiles.flatMap(p =>
    p.lessonsWeLearn
      .filter(l => l.debatePrompt)
      .map(l => ({ prompt: l.debatePrompt!, profileName: p.name }))
  );
}

export function getPioneersByScore(minScore = 8): ExcellenceProfile[] {
  return BLACK_BRITISH_EXCELLENCE
    .filter(p => p.pioneerScore >= minScore)
    .sort((a, b) => b.pioneerScore - a.pioneerScore);
}

// ============================================
// CONTEXT
// ============================================

interface ExcellenceContextType {
  profiles: ExcellenceProfile[];
  routes: RouteStop[];
  timelineEvents: TimelineGameEvent[];
  soundJourneys: SoundJourney[];
  getProfile: (id: string) => ExcellenceProfile | undefined;
  getByProgramme: (programmeId: string) => ExcellenceProfile[];
  getByDiscipline: (discipline: Discipline) => ExcellenceProfile[];
  getByEra: (era: Era) => ExcellenceProfile[];
  getLocalHeroes: () => ExcellenceProfile[];
  getNearStation: (station: string) => ExcellenceProfile[];
  getRoutesByLine: (line: TubeLineColour) => RouteStop[];
  getTimelineEvents: (category?: TimelineGameEvent['category'], difficulty?: TimelineGameEvent['difficulty']) => TimelineGameEvent[];
  getSoundJourneys: (programmeId: string) => SoundJourney[];
  getDebatePrompts: (programmeId: string) => { prompt: string; profileName: string }[];
  quoteOfTheDay: (programmeId?: string) => { text: string; profileName: string };
  pioneers: ExcellenceProfile[];
}

const ExcellenceContext = createContext<ExcellenceContextType | null>(null);

export function ExcellenceProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => ({
    profiles: BLACK_BRITISH_EXCELLENCE,
    routes: LONDON_ROUTES,
    timelineEvents: TIMELINE_GAME_EVENTS,
    soundJourneys: SOUND_JOURNEYS,
    getProfile: getProfileById,
    getByProgramme: getProfilesByProgramme,
    getByDiscipline: getProfilesByDiscipline,
    getByEra: getProfilesByEra,
    getLocalHeroes,
    getNearStation: getProfilesNearStation,
    getRoutesByLine: getRoutesByTubeLine,
    getTimelineEvents: getTimelineGameEvents,
    getSoundJourneys: getSoundJourneyForProgramme,
    getDebatePrompts,
    quoteOfTheDay: getQuoteOfTheDay,
    pioneers: getPioneersByScore()
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