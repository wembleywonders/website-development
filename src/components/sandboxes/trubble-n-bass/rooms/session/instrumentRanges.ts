// instrumentRanges.ts
// Instrument range definitions for the Session Room musicians

export interface InstrumentRange {
  id: string;
  name: string;
  family: 'strings' | 'brass' | 'wind' | 'percussion' | 'keys' | 'bass';
  lowNote: string;
  highNote: string;
  waveform: OscillatorType;
  culturalContext: string;
  description: string;
}

export const INSTRUMENTS: InstrumentRange[] = [
  { id:'piano',     name:'Piano',       family:'keys',       lowNote:'A0', highNote:'C8', waveform:'triangle', culturalContext:'Gospel, jazz, soul, lovers rock',              description:'Full 88-key range. The foundation of harmony.' },
  { id:'bass-gtr',  name:'Bass Guitar', family:'bass',       lowNote:'E1', highNote:'G4', waveform:'sawtooth', culturalContext:'Reggae, funk, grime, afrobeats',               description:'The low end. Drives the groove with the kick drum.' },
  { id:'trumpet',   name:'Trumpet',     family:'brass',      lowNote:'F#3',highNote:'D6', waveform:'sawtooth', culturalContext:'Jazz, highlife, afrobeats, soul',              description:'Bright brass lead. Cuts through any mix.' },
  { id:'trombone',  name:'Trombone',    family:'brass',      lowNote:'E2', highNote:'F5', waveform:'sawtooth', culturalContext:'Jazz, ska, reggae, gospel',                    description:'Warm brass harmony. The voice between bass and trumpet.' },
  { id:'saxophone', name:'Saxophone',   family:'wind',       lowNote:'Bb3',highNote:'F6', waveform:'sawtooth', culturalContext:'Jazz, soul, afrobeats, lovers rock',           description:'The most vocal of instruments. Sings like a human voice.' },
  { id:'flute',     name:'Flute',       family:'wind',       lowNote:'C4', highNote:'D7', waveform:'sine',     culturalContext:'Highlife, world music, classical, afrobeats',  description:'Pure tone. Floats above the ensemble.' },
  { id:'violin',    name:'Violin',      family:'strings',    lowNote:'G3', highNote:'A7', waveform:'sawtooth', culturalContext:'Classical, jazz, world, lovers rock strings',  description:'Expressive melodic lead or harmony.' },
  { id:'cello',     name:'Cello',       family:'strings',    lowNote:'C2', highNote:'C6', waveform:'sawtooth', culturalContext:'Classical, jazz, gospel strings',              description:'Rich, warm. Occupies the same register as the human voice.' },
  { id:'steelpan',  name:'Steel Pan',   family:'percussion', lowNote:'D4', highNote:'F#6',waveform:'triangle', culturalContext:'Trinidad, Caribbean, soca, calypso',          description:'Born from oil drums in Trinidad. Pure Caribbean identity.' },
  { id:'kora',      name:'Kora',        family:'strings',    lowNote:'C3', highNote:'C6', waveform:'triangle', culturalContext:'Mandinka / West African tradition',            description:'21-string bridge harp. The voice of West African griot tradition.' },
];

export function getInstrumentsByFamily(family: InstrumentRange['family']): InstrumentRange[] {
  return INSTRUMENTS.filter(i => i.family === family);
}
