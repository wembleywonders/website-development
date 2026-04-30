// ToolbarModes.ts
// Maya music toolbar mode definitions and suggestion types

export type ToolbarMode = 'listen' | 'suggest' | 'teach';

export interface MayaSuggestion {
  id: string;
  mode: ToolbarMode;
  text: string;
  action?: string;     // what clicking the suggestion does
  context?: string;    // what musical state triggered this
}

export interface TeachMoment {
  id: string;
  trigger: string;     // what musical event triggered this
  title: string;
  explanation: string; // plain language, grounded in cultural tradition
  tradition?: string;  // which tradition this knowledge comes from
}

// Default suggestions by mode and context
export const LISTEN_PROMPTS: Record<string, string> = {
  tapping:    'I can feel where the one is. Want me to lock the beat?',
  has_rhythm: 'That groove is working. Ready to add a feel?',
  has_style:  'Good. Now you need a rhythm to carry that feel.',
  keyboard:   'I can hear the shape of a melody forming.',
  idle:       'What do you have? Tap a rhythm, pick a feel, or just start playing.',
};

export const TEACH_MOMENTS: TeachMoment[] = [
  {
    id: 'one-drop',
    trigger: 'style:loversrock',
    title: 'The One-Drop',
    explanation: 'In Lovers Rock, the kick and snare hit together on beat 3 — not beat 2 like in most music. That one heavy hit is called the one-drop. Everything else in the arrangement serves it.',
    tradition: 'Jamaican / British-Caribbean',
  },
  {
    id: 'call-response',
    trigger: 'style:gospel',
    title: 'Call and Response',
    explanation: 'Gospel harmony is built on conversation. One voice calls, another answers. The deacon sings a line, the congregation responds. This is not decoration — it is the structure.',
    tradition: 'Black church / Baptist / Pentecostal',
  },
  {
    id: 'interlocking',
    trigger: 'style:afrobeats',
    title: 'Interlocking Parts',
    explanation: 'Each instrument in Afrobeats sounds simple alone. The complexity comes from parts that interlock — like fingers lacing together. Listen to each part separately, then hear what happens when they combine.',
    tradition: 'West African / Nigerian diaspora',
  },
  {
    id: 'scale-lock',
    trigger: 'keyboard:first-play',
    title: 'Why Every Note Sounds Right',
    explanation: 'The keyboard is locked to your chosen scale. Every key you press is a note that belongs in your song. You cannot play a wrong note. This is how traditional musicians learn — by playing inside a tradition first.',
    tradition: 'Universal',
  },
  {
    id: 'space',
    trigger: 'style:grime',
    title: 'Space Is the Weapon',
    explanation: 'Grime and Drill use silence as much as sound. A kick drum that hits 3 times in a bar creates more tension than one that hits 8 times. The space between the hits is where the power lives.',
    tradition: 'East London / UK garage lineage',
  },
];
