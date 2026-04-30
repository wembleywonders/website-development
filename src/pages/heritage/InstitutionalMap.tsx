import React, { useState } from 'react';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// INSTITUTIONAL MAP
// The post-colonial geography of London, rendered as a browseable archive.
//
// No external map API — this is an editorial tool, not a navigation app.
// The "map" is a structured list of institutions with their distances from
// Wembley, their tube connections, and their significance to the communities
// that arrived from the empire those institutions represent.
//
// The gap field is the editorial core: what is the distance (physical and
// institutional) between this building and the community it serves?
// ─────────────────────────────────────────────────────────────────────────────

type InstitutionType =
  | 'high-commission'
  | 'cultural-institute'
  | 'former-imperial'
  | 'community-institution'
  | 'protest-site'
  | 'cultural-venue';

type TubeLine = 'Bakerloo' | 'Central' | 'Circle' | 'District' | 'Jubilee'
  | 'Metropolitan' | 'Northern' | 'Piccadilly' | 'Victoria' | 'Overground';

const LINE_COLOURS: Record<TubeLine, string> = {
  Bakerloo:     '#B36305',
  Central:      '#E32017',
  Circle:       '#FFD300',
  District:     '#00782A',
  Jubilee:      '#A0A5A9',
  Metropolitan: '#9B0056',
  Northern:     '#000000',
  Piccadilly:   '#003688',
  Victoria:     '#0098D4',
  Overground:   '#EE7C0E',
};

export interface InstitutionalMarker {
  id:               string;
  name:             string;
  type:             InstitutionType;
  nationOrFocus:    string;
  address:          string;
  borough:          string;
  tubeStation:      string;
  tubeLine:         TubeLine;
  wembleyRoute:     string;    // How to get there from Wembley
  wembleyMinutes:   number;
  established:      number;
  currentStatus:    'active' | 'repurposed' | 'closed' | 'demolished';
  significance:     string;
  communityConnection: string;
  theGap:           string;
  threads:          string[];  // Thread IDs this place connects to
}

export const INSTITUTIONAL_MARKERS: InstitutionalMarker[] = [
  {
    id:               'jamaican-high-commission',
    name:             'Jamaican High Commission',
    type:             'high-commission',
    nationOrFocus:    'Jamaica',
    address:          '1-2 Prince Consort Road, Kensington SW7 2BZ',
    borough:          'Royal Borough of Kensington and Chelsea',
    tubeStation:      'High Street Kensington',
    tubeLine:         'District',
    wembleyRoute:     'Jubilee to Green Park, Victoria to Victoria, Circle/District to High Street Kensington',
    wembleyMinutes:   45,
    established:      1962,
    currentStatus:    'active',
    significance:     'Opened the same year the Commonwealth Immigrants Act began restricting Jamaican movement to Britain. Located in one of the most expensive boroughs in the country, a commute from every Jamaican-heritage community in London.',
    communityConnection: 'The Windrush Scandal required affected families to travel here with proof of 50 years of UK residence. The journey itself — 45 minutes minimum, requiring an Oyster card — was a barrier for many of the elderly and most vulnerable.',
    theGap:           'The distance is 12 miles. The cultural distance is designed. No government has ever seriously proposed moving diplomatic institutions to the boroughs where their communities actually live.',
    threads:          ['distance-embassy-community', 'landscape-under-your-feet'],
  },
  {
    id:               'trinidad-tobago-hc',
    name:             'Trinidad & Tobago High Commission',
    type:             'high-commission',
    nationOrFocus:    'Trinidad & Tobago',
    address:          '42 Belgrave Square, Belgravia SW1X 8NT',
    borough:          'City of Westminster',
    tubeStation:      'Hyde Park Corner',
    tubeLine:         'Piccadilly',
    wembleyRoute:     'Jubilee to Green Park, then walk — or Metropolitan to Baker Street, Jubilee to Hyde Park Corner',
    wembleyMinutes:   40,
    established:      1962,
    currentStatus:    'active',
    significance:     'Claudia Jones was born in Trinidad. She organised in Britain, founded the Carnival, and was buried in Highgate. Her nation\'s diplomatic representation sits in Belgrave Square — the most expensive residential address in Britain.',
    communityConnection: 'The Trinidadian community in London is concentrated in Notting Hill, Ladbroke Grove, and North Kensington — the same streets where Jones organised, and where the Carnival still runs.',
    theGap:           'Belgrave Square is 4 miles from Notting Hill Gate by road. The symbolic distance — between the diplomatic address and the community history — is considerably further.',
    threads:          ['distance-embassy-community', 'who-owns-the-culture', 'joy-as-politics'],
  },
  {
    id:               'ghana-high-commission',
    name:             'Ghana High Commission',
    type:             'high-commission',
    nationOrFocus:    'Ghana',
    address:          '13 Belgrave Square, Belgravia SW1X 8PR',
    borough:          'City of Westminster',
    tubeStation:      'Hyde Park Corner',
    tubeLine:         'Piccadilly',
    wembleyRoute:     'Jubilee to Green Park, then walk',
    wembleyMinutes:   40,
    established:      1957,
    currentStatus:    'active',
    significance:     'Ghana was the first sub-Saharan African nation to achieve independence (1957). Its High Commission occupies one of the grandest addresses in London — in a building the Ghanaian state rents from the Grosvenor Estate, owned by the Duke of Westminster.',
    communityConnection: 'The Ghanaian community in London — one of the largest West African communities in Europe — is concentrated in Peckham, Lewisham, and Hackney. Not Belgravia.',
    theGap:           'The largest Ghanaian community festival in the UK, Ghanaian Independence Day at Crystal Palace Park, takes place in a different borough from the High Commission. The community has built its own geography.',
    threads:          ['distance-embassy-community'],
  },
  {
    id:               'commonwealth-institute',
    name:             'Commonwealth Institute (now Design Museum)',
    type:             'cultural-institute',
    nationOrFocus:    'Commonwealth of Nations (50 member states at peak)',
    address:          '224-238 Kensington High Street W8 6NQ',
    borough:          'Royal Borough of Kensington and Chelsea',
    tubeStation:      'High Street Kensington',
    tubeLine:         'District',
    wembleyRoute:     'Jubilee to Green Park, District to High Street Kensington',
    wembleyMinutes:   45,
    established:      1962,
    currentStatus:    'repurposed',
    significance:     'Designed by Kenyan-born architect Robert Matthew. Housed permanent exhibitions from 50 Commonwealth nations. Closed 2002. Converted into the Design Museum 2016 at a cost of £83 million, with no community consultation from any of the 50 nations it was built to represent.',
    communityConnection: 'The conversion is a case study in how cultural institutions built to represent the Commonwealth can be repurposed for the design industry without legal or political consequence. The tent-like roof — Grade I listed — is preserved. The mission isn\'t.',
    theGap:           'The £83m came partly from public funds. The communities the Institute was built to serve were not consulted on its repurposing. The Design Museum is excellent. The absence of acknowledgement is instructive.',
    threads:          ['landscape-under-your-feet', 'distance-embassy-community'],
  },
  {
    id:               'british-empire-exhibition-site',
    name:             '1924 British Empire Exhibition Site',
    type:             'former-imperial',
    nationOrFocus:    'British Empire (58 territories displayed)',
    address:          'Wembley Park, Empire Way HA9',
    borough:          'Brent',
    tubeStation:      'Wembley Park',
    tubeLine:         'Metropolitan',
    wembleyRoute:     'You\'re already here.',
    wembleyMinutes:   0,
    established:      1924,
    currentStatus:    'repurposed',
    significance:     'The Exhibition drew 27 million visitors in 1924–25. It displayed the peoples and resources of 58 territories as exhibits. Its permanent structures include the original Wembley Stadium (now rebuilt). The land it occupied is now home to the largest proportion of the descendants of those displayed territories anywhere in the UK.',
    communityConnection: 'The \'Empire Way\' address still exists. Brent is the most ethnically diverse borough in the UK. The descendants of the 1924 Exhibition\'s "subjects" are now the majority population of the borough it was built in. No marker explains this.',
    theGap:           'The 1924 Exhibition\'s narrative arc — empire as spectacle, then empire as neighbourhood — is one of the most extraordinary reversals in modern British urban history. The stadium\'s Wikipedia page begins in 1923.',
    threads:          ['landscape-under-your-feet'],
  },
  {
    id:               'south-africa-house',
    name:             'South Africa House',
    type:             'protest-site',
    nationOrFocus:    'South Africa / Anti-apartheid movement',
    address:          'Trafalgar Square WC2N 5DP',
    borough:          'City of Westminster',
    tubeStation:      'Charing Cross',
    tubeLine:         'Bakerloo',
    wembleyRoute:     'Jubilee to Charing Cross or Bakerloo to Charing Cross',
    wembleyMinutes:   35,
    established:      1933,
    currentStatus:    'active',
    significance:     'The site of the longest continuous anti-apartheid picket in history (1982–1990). Run by the City of London Anti-Apartheid Group, it maintained a 24-hour presence for eight years. Daley Thompson was among the athletes who refused to represent Britain in South Africa during this period.',
    communityConnection: 'The picket was sustained largely by Black British organisers and their allies. The building itself — built in 1933, during apartheid\'s formation — is the face of a regime that Britain maintained economic relations with throughout the picket.',
    theGap:           'There is no permanent marker at South Africa House acknowledging the picket. The City of London Anti-Apartheid Group has no blue plaque. The connection between South Africa House and the Caribbean community organising outside it is nowhere marked.',
    threads:          ['joy-as-politics', 'same-rule-different-arenas'],
  },
  {
    id:               'nigeria-high-commission',
    name:             'Nigeria House',
    type:             'high-commission',
    nationOrFocus:    'Nigeria',
    address:          '9 Northumberland Avenue WC2N 5BX',
    borough:          'City of Westminster',
    tubeStation:      'Charing Cross',
    tubeLine:         'Bakerloo',
    wembleyRoute:     'Jubilee to Charing Cross or Bakerloo to Charing Cross',
    wembleyMinutes:   35,
    established:      1960,
    currentStatus:    'active',
    significance:     'Nigeria became independent in 1960. Nigeria House is on Northumberland Avenue, a stone\'s throw from Trafalgar Square. The Nigerian community in London — the largest African diaspora in the UK — is concentrated in Peckham, Lewisham, and the outer East London boroughs.',
    communityConnection: 'Wembley has a substantial Nigerian community. The distance from 452 High Road to Nigeria House is 14 miles by road. The distance in terms of institutional representation is harder to measure.',
    theGap:           'The Nigerian High Commission hosts a National Day reception at a Mayfair hotel every October. The Nigerian community in Peckham organises its own cultural events with no connection to the diplomatic calendar.',
    threads:          ['distance-embassy-community'],
  },
  {
    id:               'wembley-wonders-hq',
    name:             'Wembley Wonders CIC',
    type:             'community-institution',
    nationOrFocus:    '148 cultures, one borough',
    address:          '452 High Road, Wembley HA9 7AY',
    borough:          'Brent',
    tubeStation:      'Wembley Central',
    tubeLine:         'Bakerloo',
    wembleyRoute:     'You are here.',
    wembleyMinutes:   0,
    established:      2020,
    currentStatus:    'active',
    significance:     'Founded on the same land as the 1924 British Empire Exhibition. A counter-institution: not a heritage display, not a nostalgia project, but a living economic infrastructure for the people the exhibition displayed as subjects.',
    communityConnection: 'The 55/25/20 split is the Equiano Principle made structural. The value created by this community stays in this community, documented, defended, and transmissible to the next generation.',
    theGap:           'There is no gap here. This is where the gap closes.',
    threads:          ['landscape-under-your-feet'],
  },
  {
    id:               'night-moves-shoreditch',
    name:             'Night Moves — The Right Moves',
    type:             'cultural-venue',
    nationOrFocus:    'Black British nightlife / Lovers Rock / RnB / Reggae',
    address:          'Shoreditch High Street, London E1',
    borough:          'Tower Hamlets',
    tubeStation:      'Shoreditch High Street',
    tubeLine:         'Overground',
    wembleyRoute:     'Jubilee to Stratford, Overground to Shoreditch High Street',
    wembleyMinutes:   45,
    established:      1979,
    currentStatus:    'closed',
    significance:     'Night Moves was London\'s premier Black nightclub from 1979 through the mid-1990s — a two-floor RnB, reggae, soul and rare groove venue that served the Black community when mainstream clubs did not. Founded by five Jamaican partners in 1979; taken over by Trevor Russell and Spencer Williams in 1986. It operated at the heart of the Lovers Rock scene, giving UK acts their first live PA breaks. It was not just a nightclub — it was a cultural institution, a community space, and a commercial infrastructure built by and for a community that mainstream entertainment was not built to serve.',
    communityConnection: 'Night Moves hosted comedy nights, live shows, and performances by Louisa Mark, Janet Kay, Carroll Thompson, Sandra Cross, Maxi Priest, Tippa Irie, and dozens more. It was where UK Lovers Rock took its first commercial breaths. Trevor Russell also invested in WNK Radio — London\'s second major Black commercial station — and supported the Nurses Association of Jamaica fundraisers and the Commonwealth Sports Awards. Night Moves was infrastructure, not just entertainment.',
    theGap:           'There is no plaque on Shoreditch High Street marking where Night Moves stood. The venue that gave UK Lovers Rock its live performance circuit, that served the Black community for fifteen years as London\'s premier nightspot, that was built and run by Windrush-generation entrepreneurs — is unmarked. Trevor Russell died in 2019. The Voice published an obituary. No mainstream cultural institution acknowledged the loss.',
    threads:          ['who-owns-the-culture', 'joy-as-politics', 'kingston-to-grid'],
  },
];

const TYPE_LABELS: Record<InstitutionType, string> = {
  'high-commission':       'High Commission',
  'cultural-institute':    'Cultural Institute',
  'former-imperial':       'Former Imperial Site',
  'community-institution': 'Community Institution',
  'protest-site':          'Protest Site',
  'cultural-venue':        'Cultural Venue',
};

const TYPE_COLOURS: Record<InstitutionType, string> = {
  'high-commission':       '#d4a853',
  'cultural-institute':    '#3ecfcf',
  'former-imperial':       '#f87171',
  'community-institution': '#4ade80',
  'protest-site':          '#9b7fe8',
  'cultural-venue':        '#f97316',
};

interface Props { ctx: CommonsContext; }

const InstitutionalMap: React.FC<Props> = ({ ctx }) => {
  const [activeMarker, setActiveMarkerId] = useState<InstitutionalMarker | null>(
    ctx.activeId ? (INSTITUTIONAL_MARKERS.find(m => m.id === ctx.activeId) ?? null) : null
  );
  const [filterType, setFilterType] = useState<InstitutionType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'name' | 'established'>('distance');

  const filtered = INSTITUTIONAL_MARKERS
    .filter(m => filterType === 'all' || m.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'distance')    return a.wembleyMinutes - b.wembleyMinutes;
      if (sortBy === 'established') return a.established - b.established;
      return a.name.localeCompare(b.name);
    });

  const openMarker = (m: InstitutionalMarker) => {
    setActiveMarkerId(m);
    ctx.setActiveId(m.id);
  };

  const closeMarker = () => {
    setActiveMarkerId(null);
    ctx.setActiveId(null);
  };

  if (activeMarker) {
    return (
      <div className="kc-marker-detail">
        <button className="kc-back-btn" onClick={closeMarker}>← All places</button>

        <div
          className="kc-marker-detail-header"
          style={{ '--marker-colour': TYPE_COLOURS[activeMarker.type] } as React.CSSProperties}
        >
          <div className="kc-marker-type-badge">
            {TYPE_LABELS[activeMarker.type]}
          </div>
          <h2 className="kc-marker-detail-name">{activeMarker.name}</h2>
          <p className="kc-marker-detail-nation">{activeMarker.nationOrFocus}</p>

          <div className="kc-marker-meta-row">
            <div className="kc-marker-meta-item">
              <span className="kc-marker-meta-label">Address</span>
              <span className="kc-marker-meta-value">{activeMarker.address}</span>
            </div>
            <div className="kc-marker-meta-item">
              <span className="kc-marker-meta-label">Nearest tube</span>
              <span className="kc-marker-meta-value">
                {activeMarker.tubeStation}
                <span
                  className="kc-tube-line-dot"
                  style={{ background: LINE_COLOURS[activeMarker.tubeLine] }}
                  title={activeMarker.tubeLine + ' line'}
                />
              </span>
            </div>
            <div className="kc-marker-meta-item">
              <span className="kc-marker-meta-label">From Wembley</span>
              <span className="kc-marker-meta-value kc-marker-distance">
                {activeMarker.wembleyMinutes === 0
                  ? 'You are here'
                  : `~${activeMarker.wembleyMinutes} min`
                }
              </span>
            </div>
            <div className="kc-marker-meta-item">
              <span className="kc-marker-meta-label">Established</span>
              <span className="kc-marker-meta-value">{activeMarker.established}</span>
            </div>
            {activeMarker.currentStatus !== 'active' && (
              <div className="kc-marker-meta-item">
                <span className="kc-marker-meta-label">Status</span>
                <span className="kc-marker-meta-value kc-marker-status">{activeMarker.currentStatus}</span>
              </div>
            )}
          </div>

          {activeMarker.wembleyMinutes > 0 && (
            <div className="kc-route-detail">
              <span className="kc-route-label">Route from Wembley</span>
              <p className="kc-route-text">{activeMarker.wembleyRoute}</p>
            </div>
          )}
        </div>

        <div className="kc-marker-sections">
          <div className="kc-marker-section">
            <span className="kc-marker-section-label">Significance</span>
            <p className="kc-marker-section-text">{activeMarker.significance}</p>
          </div>

          <div className="kc-marker-section">
            <span className="kc-marker-section-label">Community connection</span>
            <p className="kc-marker-section-text">{activeMarker.communityConnection}</p>
          </div>

          <div className="kc-marker-section kc-marker-section--gap">
            <span className="kc-marker-section-label kc-marker-section-label--gap">The gap</span>
            <p className="kc-marker-section-text">{activeMarker.theGap}</p>
          </div>
        </div>

        {activeMarker.threads.length > 0 && (
          <div className="kc-marker-threads">
            <span className="kc-marker-threads-label">Related threads</span>
            <div className="kc-marker-thread-list">
              {activeMarker.threads.map(tid => (
                <button
                  key={tid}
                  className="kc-marker-thread-btn"
                  onClick={() => { ctx.setMode('thread'); ctx.setActiveId(tid); }}
                >
                  {tid.replace(/-/g, ' ')} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="kc-map">

      {/* Distance visualiser — Wembley at centre */}
      <div className="kc-distance-visual">
        <div className="kc-distance-origin">
          <span className="kc-origin-dot" />
          <span className="kc-origin-label">Wembley HA9</span>
        </div>
        <div className="kc-distance-rings">
          {[15, 30, 45, 60].map(mins => (
            <div key={mins} className="kc-distance-ring">
              <span className="kc-distance-ring-label">{mins} min</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="kc-map-controls">
        <div className="kc-filter-row">
          <span className="kc-filter-label">Filter</span>
          {(['all', ...Object.keys(TYPE_LABELS)] as (InstitutionType | 'all')[]).map(t => (
            <button
              key={t}
              className={`kc-filter-btn${filterType === t ? ' active' : ''}`}
              style={t !== 'all' ? { '--filter-colour': TYPE_COLOURS[t as InstitutionType] } as React.CSSProperties : {}}
              onClick={() => setFilterType(t)}
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t as InstitutionType]}
            </button>
          ))}
        </div>
        <div className="kc-sort-row">
          <span className="kc-filter-label">Sort by</span>
          {(['distance', 'established', 'name'] as const).map(s => (
            <button
              key={s}
              className={`kc-sort-btn${sortBy === s ? ' active' : ''}`}
              onClick={() => setSortBy(s)}
            >
              {s === 'distance' ? 'Distance from Wembley' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Institution list */}
      <div className="kc-marker-list">
        {filtered.map(marker => (
          <button
            key={marker.id}
            className={`kc-marker-card${marker.type === 'community-institution' ? ' kc-marker-card--home' : ''}`}
            style={{ '--marker-colour': TYPE_COLOURS[marker.type] } as React.CSSProperties}
            onClick={() => openMarker(marker)}
          >
            <div className="kc-marker-card-left">
              <div
                className="kc-marker-type-indicator"
                style={{ background: TYPE_COLOURS[marker.type] }}
                title={TYPE_LABELS[marker.type]}
              />
              <div>
                <div className="kc-marker-card-name">{marker.name}</div>
                <div className="kc-marker-card-nation">{marker.nationOrFocus}</div>
              </div>
            </div>

            <div className="kc-marker-card-right">
              <div className="kc-marker-card-tube">
                <span
                  className="kc-tube-line-dot kc-tube-line-dot--sm"
                  style={{ background: LINE_COLOURS[marker.tubeLine] }}
                />
                {marker.tubeStation}
              </div>
              <div className={`kc-marker-card-distance${marker.wembleyMinutes === 0 ? ' kc-marker-card-distance--home' : ''}`}>
                {marker.wembleyMinutes === 0
                  ? '◆ Here'
                  : `${marker.wembleyMinutes} min`
                }
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="kc-map-footnote">
        Distances are approximate journey times from Wembley Central by public transport.
        They are editorial — the point is the journey, not the coordinates.
      </p>
    </div>
  );
};

export default InstitutionalMap;