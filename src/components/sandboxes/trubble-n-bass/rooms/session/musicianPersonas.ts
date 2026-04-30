// musicianPersonas.ts
// Named session musicians — translators between creator intent and musical output

export interface MusicianPersona {
  id: string;
  name: string;
  instrument: string;
  role: string;
  background: string;
  listens: string[];
  speaks: string;
  colour: string;
}

export const SESSION_MUSICIANS: MusicianPersona[] = [
  {
    id: 'delroy',
    name: 'Delroy',
    instrument: 'percussion',
    role: 'Rhythm and feel. The heartbeat of the session.',
    background: 'Grew up hearing sound system culture in Brixton and carnival rhythms from his Trinidadian grandmother. He hears rhythm in everything.',
    listens: ['tap', 'click-timing', 'feel-descriptor', 'style-selector'],
    speaks: 'I can feel where the one is. Let me lock that down.',
    colour: '#d4a853',
  },
  {
    id: 'pearl',
    name: 'Pearl',
    instrument: 'piano',
    role: 'Harmony and chords. The colour of the music.',
    background: 'Trained in church — gospel first, then jazz theory at Goldsmiths. She hears the chord that wants to live under any melody.',
    listens: ['played-notes', 'chord-name', 'mood-word', 'hummed-melody'],
    speaks: 'That melody wants a minor chord underneath it. Something that aches a little.',
    colour: '#60a5fa',
  },
  {
    id: 'rico',
    name: 'Rico',
    instrument: 'saxophone',
    role: 'Melody and lead. The voice of the session.',
    background: 'Plays saxophone but thinks like a singer. Grew up in a Jamaican family in Wembley, plays highlife and jazz and lovers rock with equal fluency.',
    listens: ['hummed-melody', 'played-notes', 'lyric-rhythm', 'feel-descriptor'],
    speaks: 'I can hear what you are humming. Let me play it back and we build from there.',
    colour: '#a78bfa',
  },
  {
    id: 'grace',
    name: 'Grace',
    instrument: 'bass-gtr',
    role: 'Bass and low end. The foundation.',
    background: 'Plays bass like she is having a conversation with the kick drum. Roots reggae tradition, studio musician background, ear trained by dub.',
    listens: ['rhythm-pattern', 'root-note', 'chord-progression', 'style-selector'],
    speaks: 'The bass line is a decision about where the weight falls. Tell me the feeling and I will find the line.',
    colour: '#34d399',
  },
];

export function getMusician(id: string): MusicianPersona | undefined {
  return SESSION_MUSICIANS.find(m => m.id === id);
}

export const DEFAULT_TRIO = ['delroy', 'pearl', 'rico'];
export const DEFAULT_QUARTET = ['delroy', 'pearl', 'rico', 'grace'];
