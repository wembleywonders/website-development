/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 *
 * SOUND LINEAGE PANEL
 * Cultural heritage layer for Trubble n Bass Studio
 * Surfaces sound genealogy inline — no disruption to the music-making flow
 */

import React, { useState, useEffect } from 'react';
import './SoundLineagePanel.css';

// ============================================
// INLINE HERITAGE DATA
// Mapped directly to studio.tsx kit/sound IDs
// Draws from BlackBritishExcellence data layer
// ============================================

interface LineageStop {
  genre: string;
  location: string;
  year: number;
  note: string;
  tubeStation?: string;
  tubeLine?: string;
  tubeColour?: string;
}

interface KitLineage {
  kitId: string;
  headline: string;
  tagline: string;
  stops: LineageStop[];
  pioneerQuote?: { text: string; name: string };
  profileId?: string;
}

interface SoundLineage {
  soundId: string;
  headline: string;
  origin: string;
  yearsActive: string;
  note: string;
  pioneerQuote?: { text: string; name: string };
}

// Tube line colour map — matches BlackBritishExcellence TubeLineColour type
const TUBE_COLOURS: Record<string, string> = {
  victoria:     '#009FE0',
  northern:     '#231F20',
  jubilee:      '#A0A5A9',
  central:      '#DC241F',
  bakerloo:     '#894E24',
  metropolitan: '#751056',
  district:     '#007229',
  piccadilly:   '#0019A8',
  overground:   '#EE7C0E',
  elizabeth:    '#6B50A2',
  dlr:          '#00AFAD',
};

const KIT_LINEAGES: KitLineage[] = [
  {
    kitId: 'caribbean-roots',
    headline: 'From Kingston to London',
    tagline: 'The sound that crossed the Atlantic and changed British music forever',
    stops: [
      { genre: 'Mento / Calypso', location: 'Kingston, Jamaica', year: 1950, note: 'The root — acoustic, satirical, rhythmically complex' },
      { genre: 'Ska', location: 'Kingston → Brixton', year: 1962, note: 'Windrush generation carries it to London. Brixton becomes the UK base.', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
      { genre: 'Rocksteady', location: 'Brixton / Notting Hill', year: 1966, note: 'Slower, heavier. The bass moves forward for the first time.', tubeStation: 'Ladbroke Grove', tubeLine: 'central', tubeColour: TUBE_COLOURS.central },
      { genre: 'Reggae / Lovers Rock', location: 'South London', year: 1975, note: 'Lovers Rock is INVENTED in London — the first specifically Black British pop genre', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
    ],
    pioneerQuote: {
      text: "A happy face, a thumpin' bass, for a lovin' race.",
      name: 'Jazzie B — Soul II Soul'
    },
    profileId: 'jazzie-b'
  },
  {
    kitId: 'reggae-roots',
    headline: 'One Drop — The Pulse of the Diaspora',
    tagline: 'Rhythm as resistance, bass as politics',
    stops: [
      { genre: 'Nyabinghi Drumming', location: 'Ethiopia / Jamaica', year: 1930, note: 'Rastafarian drumming tradition — spiritual root of all reggae rhythm' },
      { genre: 'Roots Reggae', location: 'Kingston → UK Sound Systems', year: 1972, note: 'Sound system culture transforms reggae into a London community practice' },
      { genre: 'Dub', location: 'UK Sound Systems', year: 1976, note: 'Dub is invented by removing the vocals and extending the bass. London engineers extend it further.', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
      { genre: 'Jungle / D&B (descendant)', location: 'Hackney / Bristol', year: 1992, note: 'Jungle samples reggae breaks and accelerates them. The bass lineage continues.', tubeStation: 'Dalston Kingsland', tubeLine: 'overground', tubeColour: TUBE_COLOURS.overground },
    ],
    pioneerQuote: {
      text: "They changed the rules to keep him out. He changed the rules to let everyone in.",
      name: 'On Len Johnson — boxer, organiser'
    }
  },
  {
    kitId: 'gospel-church',
    headline: 'The Black Church as Music School',
    tagline: 'Every British soul singer learned harmony here first',
    stops: [
      { genre: 'Negro Spirituals', location: 'USA → Caribbean', year: 1870, note: 'The theological and harmonic root — call and response, communal voice' },
      { genre: 'Gospel', location: 'Chicago → UK Black Churches', year: 1950, note: 'Windrush generation brings the church. The church brings the Hammond organ.', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
      { genre: 'UK Soul / R&B', location: 'North & South London', year: 1985, note: 'Soul II Soul, Loose Ends — church harmonics fused with London production', tubeStation: 'Finsbury Park', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
      { genre: 'Contemporary Gospel / Neo-Soul', location: 'UK Black Churches', year: 2000, note: 'The church remains the training ground for virtually every Black British vocalist' },
    ],
    pioneerQuote: {
      text: "We built it ourselves. The shop, the sound system, the parties. The record deal came after, not before.",
      name: 'Jazzie B'
    },
    profileId: 'jazzie-b'
  },
  {
    kitId: 'afrobeats',
    headline: 'Lagos to London — The Circular Journey',
    tagline: 'British-born Africans brought it back and made it global',
    stops: [
      { genre: 'Highlife', location: 'Ghana / Nigeria', year: 1950, note: 'The parent genre — horn-led, melodic, celebratory' },
      { genre: 'Fela Kuti\'s Afrobeat', location: 'Lagos', year: 1970, note: 'Political, long-form, revolutionary. Note the spelling: Afrobeat (singular) is Fela\'s genre.' },
      { genre: 'Jùjú Music', location: 'Nigeria → UK Nigerian diaspora', year: 1980, note: 'King Sunny Ade brings it to British concert halls. The London Nigerian community builds its own scene.' },
      { genre: 'Afrobeats (plural)', location: 'London / Lagos / Accra', year: 2012, note: 'British-born Africans — Ghanaian, Nigerian, Togolese — create the global genre. Made in London, claimed by Africa.', tubeStation: 'Peckham Rye', tubeLine: 'overground', tubeColour: TUBE_COLOURS.overground },
    ],
    pioneerQuote: {
      text: "If no one is going to celebrate our music properly, we have to create the ceremony ourselves.",
      name: 'Kanya King CBE — MOBO Awards founder, Kilburn'
    },
    profileId: 'kanya-king'
  },
  {
    kitId: 'uk-drill',
    headline: 'The Full Lineage — 60 Years of Bass',
    tagline: 'Every element of Drill traces back through this exact chain',
    stops: [
      { genre: 'Reggae / Sound System', location: 'Brixton / Notting Hill', year: 1970, note: 'The bass culture root. The sound system is the original community platform.', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
      { genre: 'Jungle', location: 'Hackney / East London', year: 1992, note: 'Amen breaks + reggae bass + rave culture. Born on the overground arc.', tubeStation: 'Dalston Kingsland', tubeLine: 'overground', tubeColour: TUBE_COLOURS.overground },
      { genre: 'UK Garage / 2-Step', location: 'South & East London', year: 1996, note: 'Speed and syncopation. The rhythmic template for everything after.', tubeStation: 'Elephant & Castle', tubeLine: 'bakerloo', tubeColour: TUBE_COLOURS.bakerloo },
      { genre: 'Grime', location: 'Bow, East London', year: 2003, note: 'Pirate radio, council estates, MC culture. The compressed fury of all the lineages combined.', tubeStation: 'Bow Road', tubeLine: 'district', tubeColour: TUBE_COLOURS.district },
      { genre: 'UK Drill', location: 'Brixton / Harlesden / Birmingham', year: 2012, note: 'Chicago Drill\'s structure, London\'s sound system bass. The circle closes.', tubeStation: 'Brixton', tubeLine: 'victoria', tubeColour: TUBE_COLOURS.victoria },
    ]
  },
  {
    kitId: 'comedy-sfx',
    headline: 'Black British Comedy — A Political Tradition',
    tagline: 'From music hall exclusion to the main stage — on our own terms',
    stops: [
      { genre: 'Caribbean Calypso Satire', location: 'Trinidad / Windrush ships', year: 1948, note: 'Calypso was always satirical and political. The Windrush generation brought the tradition.' },
      { genre: 'Black British Club Circuit', location: 'Brixton / Hackney clubs', year: 1975, note: 'A parallel comedy circuit developed because mainstream venues excluded Black acts' },
      { genre: 'Lenny Henry / The Crucial Three', location: 'UK TV & Stage', year: 1985, note: 'The first generation to break through — but often on terms set by white producers' },
      { genre: 'UK Black Comedy Ownership', location: 'UK TV / Streaming', year: 2015, note: 'Michaela Coel, Chewing Gum — writing, producing, and owning the comedy for the first time' },
    ],
    pioneerQuote: {
      text: "I left the one million on the table. Ownership is everything.",
      name: 'Michaela Coel'
    },
    profileId: 'michaela-coel'
  }
];

const SOUND_LINEAGES: SoundLineage[] = [
  {
    soundId: 'dx7-epiano',
    headline: 'The DX7 Changed Black Music',
    origin: 'Yamaha, Japan — adopted by Black American and British musicians',
    yearsActive: '1983–present',
    note: 'The DX7 electric piano became the signature sound of 80s soul, gospel, and R&B. Its metallic shimmer is in virtually every Soul II Soul, Loose Ends, and Sade record.',
    pioneerQuote: { text: "A happy face, a thumpin' bass.", name: 'Jazzie B' }
  },
  {
    soundId: 'hammond-organ',
    headline: 'The Hammond — Voice of the Black Church',
    origin: 'Chicago, USA → UK Black Churches via Windrush',
    yearsActive: '1935–present',
    note: 'The Hammond B3 is the instrument of the Black church — gospel, soul, jazz. Every British soul vocalist trained their ear to it.'
  },
  {
    soundId: 'steel-pan',
    headline: 'Steel Pan — Built from Nothing',
    origin: 'Trinidad, 1940s — from oil drums left by US military',
    yearsActive: '1940s–present',
    note: 'The steel pan is the only acoustic instrument invented in the 20th century. Made from discarded oil drums in Trinidad. Brought to Britain by the Windrush generation. Now taught in London schools.',
    pioneerQuote: { text: "A people's art is the genesis of their freedom.", name: 'Claudia Jones' }
  },
  {
    soundId: 'synth-bass',
    headline: 'The Bass Line as Politics',
    origin: 'Sound system culture, Jamaica → UK',
    yearsActive: '1960s–present',
    note: 'In sound system culture, the bass was not background — it was the message. The sub-bass frequencies you feel in your chest are a deliberate assertion of presence. Bass as sovereignty.'
  },
  {
    soundId: 'gospel-piano',
    headline: 'Gospel Piano — The Training Ground',
    origin: 'Black American church → Caribbean church → UK Black churches',
    yearsActive: '1900s–present',
    note: 'Virtually every Black British soul and R&B artist learned to play in church. The gospel piano tradition is the hidden curriculum behind decades of British popular music.'
  },
  {
    soundId: 'bossa-keys',
    headline: 'Bossa Nova — The Black Atlantic at its Most Fluid',
    origin: 'Rio de Janeiro, Brazil — African rhythms + Portuguese harmony',
    yearsActive: '1958–present',
    note: 'Bossa Nova is the meeting point of the African diaspora in the Americas. Its syncopated piano style travelled through jazz into British soul. Evidence that the Black Atlantic is one continuous musical conversation.'
  }
];

// ============================================
// COMPONENT
// ============================================

interface SoundLineagePanelProps {
  selectedKitId?: string;
  selectedSoundId?: string;
  mode?: 'kit' | 'sound' | 'journey';
  compact?: boolean;
}

const SoundLineagePanel: React.FC<SoundLineagePanelProps> = ({
  selectedKitId,
  selectedSoundId,
  mode = 'kit',
  compact = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Reset on kit/sound change
  useEffect(() => {
    setExpanded(false);
    setActiveStop(null);
    setAnimationKey(k => k + 1);
  }, [selectedKitId, selectedSoundId]);

  if (mode === 'kit' && selectedKitId) {
    const lineage = KIT_LINEAGES.find(l => l.kitId === selectedKitId);
    if (!lineage) return null;

    return (
      <div className={`slp slp--kit ${compact ? 'slp--compact' : ''} ${expanded ? 'slp--expanded' : ''}`}
           key={animationKey}>
        <button className="slp__trigger" onClick={() => setExpanded(!expanded)}>
          <span className="slp__trigger-icon">🗺</span>
          <span className="slp__trigger-text">
            <strong>{lineage.headline}</strong>
            <em>{lineage.tagline}</em>
          </span>
          <span className={`slp__chevron ${expanded ? 'slp__chevron--open' : ''}`}>▾</span>
        </button>

        {expanded && (
          <div className="slp__body">
            {/* Timeline strip */}
            <div className="slp__timeline">
              {lineage.stops.map((stop, i) => (
                <button
                  key={i}
                  className={`slp__stop ${activeStop === i ? 'slp__stop--active' : ''}`}
                  onClick={() => setActiveStop(activeStop === i ? null : i)}
                >
                  {/* Connector line */}
                  {i < lineage.stops.length - 1 && (
                    <div
                      className="slp__connector"
                      style={{ backgroundColor: stop.tubeColour || '#555' }}
                    />
                  )}

                  {/* Station dot */}
                  <div
                    className="slp__dot"
                    style={{ backgroundColor: stop.tubeColour || '#888' }}
                  >
                    {stop.tubeStation && (
                      <span className="slp__dot-icon">⬤</span>
                    )}
                  </div>

                  {/* Year + Genre */}
                  <div className="slp__stop-label">
                    <span className="slp__year">{stop.year}</span>
                    <span className="slp__genre">{stop.genre}</span>
                    {stop.tubeStation && (
                      <span
                        className="slp__station"
                        style={{ borderColor: stop.tubeColour }}
                      >
                        {stop.tubeStation}
                      </span>
                    )}
                  </div>

                  {/* Expanded stop detail */}
                  {activeStop === i && (
                    <div className="slp__stop-detail">
                      <p className="slp__stop-location">📍 {stop.location}</p>
                      <p className="slp__stop-note">{stop.note}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Pioneer quote */}
            {lineage.pioneerQuote && (
              <blockquote className="slp__quote">
                <p>"{lineage.pioneerQuote.text}"</p>
                <cite>— {lineage.pioneerQuote.name}</cite>
              </blockquote>
            )}

            {/* Debate prompt link — connects to GTech Casters */}
            <div className="slp__footer">
              <span className="slp__footer-label">🎙 Casters prompt:</span>
              <span className="slp__footer-text">
                Which of these stops had the biggest impact on British culture?
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === 'sound' && selectedSoundId) {
    const lineage = SOUND_LINEAGES.find(l => l.soundId === selectedSoundId);
    if (!lineage) return null;

    return (
      <div className={`slp slp--sound ${compact ? 'slp--compact' : ''} ${expanded ? 'slp--expanded' : ''}`}
           key={animationKey}>
        <button className="slp__trigger" onClick={() => setExpanded(!expanded)}>
          <span className="slp__trigger-icon">📖</span>
          <span className="slp__trigger-text">
            <strong>{lineage.headline}</strong>
            <em>{lineage.origin}</em>
          </span>
          <span className={`slp__chevron ${expanded ? 'slp__chevron--open' : ''}`}>▾</span>
        </button>

        {expanded && (
          <div className="slp__body">
            <div className="slp__sound-meta">
              <span className="slp__badge">{lineage.yearsActive}</span>
            </div>
            <p className="slp__sound-note">{lineage.note}</p>
            {lineage.pioneerQuote && (
              <blockquote className="slp__quote">
                <p>"{lineage.pioneerQuote.text}"</p>
                <cite>— {lineage.pioneerQuote.name}</cite>
              </blockquote>
            )}
          </div>
        )}
      </div>
    );
  }

  // Journey mode — full sound journey for mode select screen
  if (mode === 'journey') {
    return (
      <div className="slp slp--journey">
        <div className="slp__journey-header">
          <h3 className="slp__journey-title">From Kingston to the Grid</h3>
          <p className="slp__journey-subtitle">
            Every sound in this studio has a story. Here's where British Black music came from.
          </p>
        </div>

        <div className="slp__journey-map">
          {[
            { year: '1950s', genre: 'Ska / Calypso', location: 'Kingston, Jamaica', colour: '#FFD700' },
            { year: '1962', genre: 'Reggae arrives in Brixton', location: 'Brixton, London', colour: TUBE_COLOURS.victoria },
            { year: '1975', genre: 'Lovers Rock — first Black British pop', location: 'South London', colour: '#E91E8C' },
            { year: '1982', genre: 'Soul II Soul — Finsbury Park → Camden', location: 'North London', colour: TUBE_COLOURS.northern },
            { year: '1992', genre: 'Jungle — bass music accelerates', location: 'Hackney / Bristol', colour: TUBE_COLOURS.overground },
            { year: '1996', genre: 'UK Garage / 2-Step', location: 'South London', colour: TUBE_COLOURS.bakerloo },
            { year: '2003', genre: 'Grime — Bow E3', location: 'East London', colour: TUBE_COLOURS.district },
            { year: 'Now', genre: 'Afrobeats / UK Drill / Neo-Soul', location: 'Wembley · Brixton · Birmingham', colour: TUBE_COLOURS.jubilee },
          ].map((stop, i, arr) => (
            <div key={i} className="slp__journey-stop">
              <div className="slp__journey-dot" style={{ backgroundColor: stop.colour }} />
              {i < arr.length - 1 && (
                <div className="slp__journey-line" style={{ backgroundColor: stop.colour }} />
              )}
              <div className="slp__journey-info">
                <span className="slp__journey-year">{stop.year}</span>
                <span className="slp__journey-genre">{stop.genre}</span>
                <span className="slp__journey-loc">📍 {stop.location}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="slp__journey-coda">
          You're not just making beats. You're continuing a 70-year conversation.
        </p>
      </div>
    );
  }

  return null;
};

export default SoundLineagePanel;