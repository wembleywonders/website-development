import React, { useState } from 'react';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// THREAD EXPLORER
// Six narrative threads, each a claim traced across multiple lives.
//
// A thread is not a topic. It's an argument.
// "The Same Rule, Different Arenas" doesn't just list athletes —
// it argues that the pattern of exceptional performance meeting
// structural exclusion is identical across every field, every era.
//
// Data structure: each thread has a claim, a through-line, and nodes.
// Nodes are the people/events that instantiate the claim.
// Connections show which nodes relate and how.
// ─────────────────────────────────────────────────────────────────────────────

export interface ThreadNode {
  id:         string;
  name:       string;
  dates:      string;
  field:      string;
  location:   string;
  claim:      string;       // One sentence: how this person instantiates the thread
  theGap:     string;       // The fact that should be on a plaque but isn't
  hasPlaque:  boolean;
  plaqueNote?: string;
  connectedTo: string[];   // ids of other nodes in this thread
  programme?: string;      // Which WW programme this connects to
}

export interface Thread {
  id:          string;
  title:       string;
  claim:       string;       // The argument in one sentence
  throughLine: string;       // The connective tissue — what makes these nodes one story
  eras:        string[];     // Which eras this thread spans
  nodes:       ThreadNode[];
  discipline:  string;       // Primary knowledge domain
  colour:      string;       // Display accent colour
}

export const THREADS: Thread[] = [
  {
    id:         'same-rule-different-arenas',
    title:      'The Same Rule, Different Arenas',
    claim:      'The pattern of exceptional Black performance meeting structural exclusion is identical across sport, music, business, and law — only the arena changes.',
    throughLine: 'Each node demonstrates the same dynamic: undeniable achievement, then a rule invented or enforced specifically to exclude. The rule always has a neutral-sounding name.',
    eras:       ['1865–1914', '1914–1948', '1948–1981', '1981–2010'],
    discipline: 'Structural analysis',
    colour:     '#d4a853',
    nodes: [
      {
        id:          'arthur-wharton',
        name:        'Arthur Wharton',
        dates:       '1865–1930',
        field:       'Football & Athletics',
        location:    'Darlington / Sheffield',
        claim:       'World\'s first Black professional footballer and sprint world record holder, died in an unmarked pauper\'s grave. The football authorities of his era operated an unwritten colour bar for forty years after his death.',
        theGap:      'He held the 100-yard world sprint record from 1886. No English Heritage plaque exists. A community campaign funded a gravestone in 1997 — 67 years late.',
        hasPlaque:   false,
        connectedTo: ['len-johnson', 'linford-christie'],
        programme:   'pageturners',
      },
      {
        id:          'len-johnson',
        name:        'Len Johnson',
        dates:       '1902–1974',
        field:       'Boxing',
        location:    'Manchester',
        claim:       'Undefeated middleweight who was barred from the British title for his entire career under the British Boxing Board of Control\'s explicit racial rule, which remained in force until 1948.',
        theGap:      'The rule stated that a "British title" could only be held by a "British-born white subject". Johnson won over 100 fights. He organised the Communist Party in Manchester. No plaque.',
        hasPlaque:   false,
        connectedTo: ['arthur-wharton', 'claudia-jones'],
        programme:   'kaywanas-court',
      },
      {
        id:          'jazzie-b',
        name:        'Jazzie B (Beresford Romeo)',
        dates:       '1963–',
        field:       'Music / Cultural Enterprise',
        location:    'Holloway / Seven Sisters',
        claim:       'Founded Soul II Soul as an independent Black British enterprise — the label, the shop, the sound system, the philosophy — and was systematically marginalised by the British music industry even while the music sold globally.',
        theGap:      'Soul II Soul\'s 55/45 split prefigured what Wembley Wonders formalised as 55/25/20. The cultural infrastructure he built in north London has no institutional recognition.',
        hasPlaque:   false,
        connectedTo: ['kanya-king', 'michaela-coel'],
        programme:   'trubble-n-bass',
      },
      {
        id:          'kanya-king',
        name:        'Kanya King',
        dates:       '1969–',
        field:       'Music Industry / Cultural Institution',
        location:    'London',
        claim:       'Founded the MOBO Awards in 1996 after every mainstream broadcaster and music industry body declined to recognise Black British music. Created the institution that the existing institutions refused to be.',
        theGap:      'She was told the market didn\'t exist. She proved it did. The response from the mainstream was to absorb the format while minimising the founder. Standard operating procedure.',
        hasPlaque:   false,
        connectedTo: ['jazzie-b', 'michaela-coel'],
        programme:   'gtechcasters',
      },
      {
        id:          'michaela-coel',
        name:        'Michaela Coel',
        dates:       '1987–',
        field:       'Television / Writing',
        location:    'Hackney / London',
        claim:       'Turned down $1 million from Netflix to retain copyright of I May Destroy You. The principle: ownership of the story is not separable from the story itself.',
        theGap:      'Her 2018 MacTaggart lecture named the structural conditions precisely. The industry listened, praised her, and continued the same practices. Copyright remains the key.',
        hasPlaque:   false,
        connectedTo: ['jazzie-b', 'kanya-king'],
        programme:   'pageturners',
      },
    ],
  },
  {
    id:         'who-owns-the-culture',
    title:      'Who Owns the Culture?',
    claim:      'Black British cultural production has consistently generated value that accrued to white-owned institutions — the mechanism changes, the extraction doesn\'t.',
    throughLine: 'From sound systems to streaming, the distance between creator and owner has been maintained by the same logic: separate the product from its provenance, price the product, ignore the provenance.',
    eras:       ['1948–1981', '1981–2010', '2010–present'],
    discipline: 'Political economy of culture',
    colour:     '#3ecfcf',
    nodes: [
      {
        id:          'claudia-jones-carnival',
        name:        'Claudia Jones (Carnival)',
        dates:       '1915–1964',
        field:       'Journalism / Cultural Organising',
        location:    'Notting Hill, London',
        claim:       'Founded the Notting Hill Carnival in 1959 as a political response to the race riots. The event now generates £450 million annually for London. The neighbourhood that hosted the riots has been entirely gentrified.',
        theGap:      'Jones is buried in Highgate Cemetery, next to Karl Marx, at her explicit request. The Carnival she founded is now policed by the same state that deported the Windrush generation.',
        hasPlaque:   true,
        plaqueNote:  'Blue plaque at 332 Portobello Road — one of the few in this archive that exist.',
        connectedTo: ['linton-kwesi-johnson', 'jazzie-b'],
        programme:   'gtechcasters',
      },
      {
        id:          'linton-kwesi-johnson',
        name:        'Linton Kwesi Johnson',
        dates:       '1952–',
        field:       'Poetry / Music',
        location:    'Brixton, London',
        claim:       'Invented dub poetry and released it on an independent Black-owned label (Race Records, later LKJ Records) — the infrastructure of ownership was as political as the content.',
        theGap:      'The second living poet to have their collected works published by Penguin Modern Classics. Built the label before the music. The music was inseparable from the economic architecture.',
        hasPlaque:   false,
        connectedTo: ['claudia-jones-carnival', 'jazzie-b'],
        programme:   'trubble-n-bass',
      },
      {
        id:          'michaela-coel',
        name:        'Michaela Coel',
        dates:       '1987–',
        field:       'Television / Writing',
        location:    'Hackney, London',
        claim:       'The Netflix negotiation is the definitive contemporary case. Turned down $1m to keep copyright. Won the Emmy. The industry called it brave. The principle was simply basic.',
        theGap:      'Her MacTaggart lecture is the clearest statement of the structural problem written by someone inside it. Read it alongside Jazzie B\'s history and Kanya King\'s founding of MOBO.',
        hasPlaque:   false,
        connectedTo: ['linton-kwesi-johnson', 'jazzie-b', 'kanya-king'],
        programme:   'pageturners',
      },
    ],
  },
  {
    id:         'landscape-under-your-feet',
    title:      'The Landscape Under Your Feet',
    claim:      'Wembley and its surrounding geography is a direct physical record of imperial history — the same ground that hosted the British Empire Exhibition now hosts the descendants of the empire\'s subjects.',
    throughLine: 'The 1924 Exhibition. The Windrush arrivals. The Carnival. The stadium rebuilt. Wembley Wonders CIC. Same land, different relationship to it.',
    eras:       ['1865–1914', '1914–1948', '1948–1981', '2020–present'],
    discipline: 'Historical geography',
    colour:     '#9b7fe8',
    nodes: [
      {
        id:          '1924-empire-exhibition',
        name:        'British Empire Exhibition, 1924',
        dates:       '1924–1925',
        field:       'Imperial spectacle / Political economy',
        location:    'Wembley Park, HA9',
        claim:       'The Exhibition displayed the empire\'s subject peoples and resources as commodities. Its permanent structures include Wembley Stadium. The land it occupied is now home to the descendants of those subject peoples.',
        theGap:      'The Exhibition drew 27 million visitors. It was explicitly designed to reassert imperial confidence after WWI. No marker at Wembley Park explains this. The stadium\'s origin story begins in 1923.',
        hasPlaque:   false,
        connectedTo: ['windrush-arrival', 'commonwealth-institute'],
        programme:   'impact-labs',
      },
      {
        id:          'windrush-arrival',
        name:        'Windrush Arrival & Settlement',
        dates:       '1948–1962',
        field:       'Migration / Community formation',
        location:    'Wembley / Brent / North-West London',
        claim:       'The Windrush generation were invited by the empire that had subject them. They settled in areas like Wembley precisely because the empire\'s infrastructure — the railway lines, the exhibition grounds, the manufacturing zones — had created affordable housing there.',
        theGap:      'The same government that invited them passed the Commonwealth Immigrants Act in 1962 to restrict them. Then the Windrush scandal of 2018 destroyed the documents that proved they were here legally.',
        hasPlaque:   false,
        connectedTo: ['1924-empire-exhibition', 'wembley-wonders'],
        programme:   'pageturners',
      },
      {
        id:          'commonwealth-institute',
        name:        'Commonwealth Institute',
        dates:       '1962–2002',
        field:       'Cultural institution / Repurposing',
        location:    'Kensington, London',
        claim:       'Built to represent 50 nations. Designed by a Kenyan-born architect. Converted into the Design Museum in 2016 without community consultation from any of the 50 nations it was built to represent.',
        theGap:      'The conversion cost £83 million. The Design Museum is free to visit. The communities whose cultures were displayed there were not consulted. The tent-like roof — one of the most distinctive buildings in London — survives. The mission doesn\'t.',
        hasPlaque:   false,
        connectedTo: ['1924-empire-exhibition', 'windrush-arrival'],
        programme:   'impact-labs',
      },
      {
        id:          'wembley-wonders',
        name:        'Wembley Wonders CIC',
        dates:       '2020–',
        field:       'Community enterprise / Counter-institution',
        location:    '452 High Road, Wembley HA9 7AY',
        claim:       'Founded on the same land. The counter-institution — not a nostalgia project, not a heritage display, but a living economic infrastructure for the people the exhibition displayed as subjects.',
        theGap:      'The 55/25/20 split is the Equiano Principle made structural: the value created by this community stays in this community, documented and defended.',
        hasPlaque:   false,
        connectedTo: ['windrush-arrival'],
        programme:   'all',
      },
    ],
  },
  {
    id:         'kingston-to-the-grid',
    title:      'From Kingston to the Grid',
    claim:      'British dance music is a direct and traceable lineage from Jamaican sound system culture — the technology, the economics, the vocabulary, and the philosophy all transfer intact.',
    throughLine: 'Sound system → Dub → Lovers rock → Jungle → Drum & Bass → Grime → Afrobeats-UK. Each transition is a generation inheriting and transforming the same economic model: community ownership, direct audience relationship, bypassing the industry gatekeepers.',
    eras:       ['1948–1981', '1981–2010', '2010–present'],
    discipline: 'Music history / Political economy',
    colour:     '#a855f7',
    nodes: [
      {
        id:          'sound-system-origins',
        name:        'Sound System Culture (UK arrival)',
        dates:       '1948–1960s',
        field:       'Music / Community infrastructure',
        location:    'Notting Hill / Brixton / Leeds',
        claim:       'Jamaican sound systems arrived with the Windrush generation and immediately became the primary infrastructure for Black British cultural life — because the mainstream venues wouldn\'t admit them.',
        theGap:      'The exclusion created the infrastructure. The clubs that wouldn\'t let them in forced the creation of a parallel economy that eventually became the British music industry\'s most valuable export.',
        hasPlaque:   false,
        connectedTo: ['claudia-jones-carnival', 'linton-kwesi-johnson', 'jazzie-b'],
        programme:   'trubble-n-bass',
      },
      {
        id:          'jungle-dnb',
        name:        'Jungle / Drum & Bass',
        dates:       '1992–2000',
        field:       'Music production / Cultural form',
        location:    'East London / South London / Bristol',
        claim:       'Jungle was the sound system tradition processed through the Amen break — a direct sonic lineage from Kingston to Hackney, using the cheapest available technology to create the most original British music of its era.',
        theGap:      'The mainstream music press was decades behind. The white rave scene appropriated the sound without the economics or the community. When D&B went global, the originators were already being displaced.',
        hasPlaque:   false,
        connectedTo: ['sound-system-origins', 'grime-origins'],
        programme:   'trubble-n-bass',
      },
      {
        id:          'grime-origins',
        name:        'Grime (The Pirate Phase)',
        dates:       '2000–2008',
        field:       'Music production / Broadcast',
        location:    'Bow, East London',
        claim:       'Grime began on pirate radio stations — the direct descendant of the sound system, using frequency instead of speakers. Rinse FM, Deja Vu, Heat. The industry ignored it for a decade, then claimed ownership of the aesthetic.',
        theGap:      'The pirate infrastructure built the audience the industry then sold to. Wiley invented the genre. The mainstream remembered Drake\'s interest in it.',
        hasPlaque:   false,
        connectedTo: ['jungle-dnb'],
        programme:   'trubble-n-bass',
      },
    ],
  },
  {
    id:         'distance-embassy-community',
    title:      'The Distance Between the Embassy and the Community',
    claim:      'The official diplomatic geography of post-colonial London places the institutions of 53 nations in Kensington and Mayfair — a commute from the communities those nations built in Brent, Hackney, and Brixton.',
    throughLine: 'The Jamaican High Commission is 35 minutes by tube from Wembley. The communities it serves have been there since 1948. The institutional geography was never designed with them in mind.',
    eras:       ['1948–1981', '1981–2010'],
    discipline: 'Institutional geography',
    colour:     '#3ecfcf',
    nodes: [
      {
        id:          'jamaican-high-commission',
        name:        'Jamaican High Commission',
        dates:       '1962–',
        field:       'Diplomatic institution',
        location:    '1-2 Prince Consort Road, Kensington SW7',
        claim:       'Opened the year the Commonwealth Immigrants Act restricted Jamaican movement. Located in Kensington — the same borough as the Commonwealth Institute. The distance from Wembley is 35 minutes by tube: Victoria line to Green Park, District to High Street Ken.',
        theGap:      'The Windrush Scandal required affected families to travel to Kensington with evidence of 50 years of residence. Many couldn\'t afford the transport. Some lost their homes before they made it.',
        hasPlaque:   false,
        connectedTo: ['windrush-arrival', 'commonwealth-institute'],
        programme:   'impact-labs',
      },
      {
        id:          'trinidad-tobago-hc',
        name:        'Trinidad & Tobago High Commission',
        dates:       '1962–',
        field:       'Diplomatic institution',
        location:    'Belgrave Square, Belgravia SW1',
        claim:       'Claudia Jones was born in Trinidad. She organised in London, founded the Carnival, edited the West Indian Gazette from Brixton. Her High Commission is in Belgravia — the most expensive residential square in Britain.',
        theGap:      'The juxtaposition is the argument. Jones was a communist. Her nation\'s diplomatic representation occupies land that costs more per square foot than anywhere else in the country she spent her life organising against.',
        hasPlaque:   false,
        connectedTo: ['claudia-jones-carnival'],
        programme:   'kaywanas-court',
      },
    ],
  },
  {
    id:         'joy-as-politics',
    title:      'Joy as Politics',
    claim:      'Black British joy has consistently been a political act — not because Black people chose to make it political, but because the state consistently treated it as a threat.',
    throughLine: 'From Claudia Jones\'s Carnival to Daley Thompson\'s double-gold grin to Jazzie B\'s sound system — each expression of public Black joy in Britain occurred in a context where that joy was being managed, policed, or monetised by someone else.',
    eras:       ['1948–1981', '1981–2010', '2010–present'],
    discipline: 'Cultural politics',
    colour:     '#4ade80',
    nodes: [
      {
        id:          'claudia-jones',
        name:        'Claudia Jones',
        dates:       '1915–1964',
        field:       'Journalism / Carnival founding',
        location:    'Notting Hill, London',
        claim:       'Founded the Carnival as a deliberate act of joyful political resistance after the Notting Hill riots. "A people\'s art is the genesis of their freedom."',
        theGap:      'She was deported from the United States under McCarthy, then died at 49 in Britain, exhausted. The Carnival she founded now draws 2.5 million people. Her contribution is marked — barely.',
        hasPlaque:   true,
        plaqueNote:  '332 Portobello Road — one of the few.',
        connectedTo: ['daley-thompson', 'jazzie-b'],
        programme:   'gtechcasters',
      },
      {
        id:          'daley-thompson',
        name:        'Daley Thompson',
        dates:       '1958–',
        field:       'Athletics',
        location:    'London (born Notting Hill)',
        claim:       'Won Olympic decathlon gold in 1980 and 1984. Celebrated with a joy so conspicuous and uncontained that it became the story — a Black British man who refused to perform gratitude for existing.',
        theGap:      'Born in Notting Hill the year before the riots that prompted Claudia Jones to found the Carnival. The geography connects them. The refusal to be diminished connects them. No plaque in Notting Hill acknowledges either.',
        hasPlaque:   false,
        connectedTo: ['claudia-jones', 'jazzie-b'],
        programme:   'kaywanas-court',
      },
      {
        id:          'stormzy-pyramid',
        name:        'Stormzy at Glastonbury',
        dates:       '2019',
        field:       'Music / Cultural landmark',
        location:    'Worthy Farm, Somerset',
        claim:       'First Black British solo headliner at Glastonbury. The debate about whether he deserved it happened in public, in the press, for months. He opened with the Glastonbury anthem and then performed for 90 minutes to prove a point no one should have had to prove.',
        theGap:      'The debate itself is the evidence. The preparation he and his team put into the set to silence the critics is the work nobody else had to do. That\'s the rule, different arena.',
        hasPlaque:   false,
        connectedTo: ['grime-origins', 'jazzie-b'],
        programme:   'trubble-n-bass',
      },
    ],
  },
];

interface Props { ctx: CommonsContext; }

const ThreadExplorer: React.FC<Props> = ({ ctx }) => {
  const [activeThread, setActiveThread] = useState<Thread | null>(
    ctx.activeId ? (THREADS.find(t => t.id === ctx.activeId) ?? null) : null
  );
  const [activeNode, setActiveNode] = useState<ThreadNode | null>(null);
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);

  const openThread = (thread: Thread) => {
    setActiveThread(thread);
    setActiveNode(null);
    setExpandedNodeId(null);
    ctx.setActiveId(thread.id);
  };

  const closeThread = () => {
    setActiveThread(null);
    setActiveNode(null);
    ctx.setActiveId(null);
  };

  const toggleNode = (node: ThreadNode) => {
    if (expandedNodeId === node.id) {
      setExpandedNodeId(null);
      setActiveNode(null);
    } else {
      setExpandedNodeId(node.id);
      setActiveNode(node);
    }
  };

  // Thread list view
  if (!activeThread) {
    return (
      <div className="kc-threads">
        <div className="kc-threads-grid">
          {THREADS.map(thread => (
            <button
              key={thread.id}
              className="kc-thread-card"
              style={{ '--thread-colour': thread.colour } as React.CSSProperties}
              onClick={() => openThread(thread)}
            >
              <div className="kc-thread-card-top">
                <span className="kc-thread-discipline">{thread.discipline}</span>
                <span className="kc-thread-node-count">{thread.nodes.length} profiles</span>
              </div>
              <h3 className="kc-thread-title">{thread.title}</h3>
              <p className="kc-thread-claim">{thread.claim}</p>
              <div className="kc-thread-eras">
                {thread.eras.map(era => (
                  <span key={era} className="kc-era-tag">{era}</span>
                ))}
              </div>
              <span className="kc-thread-enter">Follow the thread →</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Thread detail view
  return (
    <div className="kc-thread-detail" style={{ '--thread-colour': activeThread.colour } as React.CSSProperties}>

      <div className="kc-thread-detail-header">
        <button className="kc-back-btn" onClick={closeThread}>← All threads</button>
        <span className="kc-thread-detail-discipline">{activeThread.discipline}</span>
      </div>

      <div className="kc-thread-detail-hero">
        <h2 className="kc-thread-detail-title">{activeThread.title}</h2>
        <p className="kc-thread-detail-claim">{activeThread.claim}</p>
      </div>

      <div className="kc-thread-through-line">
        <span className="kc-tl-label">The connective tissue</span>
        <p className="kc-tl-text">{activeThread.throughLine}</p>
      </div>

      {/* Node chain — vertical with connection lines */}
      <div className="kc-node-chain">
        {activeThread.nodes.map((node, i) => (
          <div key={node.id} className="kc-node-wrapper">
            {/* Connection line between nodes */}
            {i > 0 && (
              <div className="kc-node-connector">
                <div className="kc-connector-line" />
                <span className="kc-connector-label">connects to</span>
              </div>
            )}

            <div
              className={`kc-node${expandedNodeId === node.id ? ' kc-node--expanded' : ''}${node.hasPlaque ? ' kc-node--has-plaque' : ''}`}
            >
              {/* Node header — always visible */}
              <button
                className="kc-node-header"
                onClick={() => toggleNode(node)}
                aria-expanded={expandedNodeId === node.id}
              >
                <div className="kc-node-header-left">
                  {/* Mini plaque circle */}
                  <div className={`kc-node-plaque${node.hasPlaque ? ' kc-node-plaque--exists' : ''}`}>
                    {node.hasPlaque ? '◆' : '○'}
                  </div>
                  <div>
                    <div className="kc-node-name">{node.name}</div>
                    <div className="kc-node-meta">{node.dates} · {node.field}</div>
                  </div>
                </div>
                <span className="kc-node-toggle">{expandedNodeId === node.id ? '−' : '+'}</span>
              </button>

              {/* Expanded content */}
              {expandedNodeId === node.id && (
                <div className="kc-node-body">
                  <div className="kc-node-location">
                    <span className="kc-node-location-icon">◎</span>
                    {node.location}
                  </div>

                  <div className="kc-node-section">
                    <span className="kc-node-section-label">The argument</span>
                    <p className="kc-node-claim">{node.claim}</p>
                  </div>

                  <div className="kc-node-section kc-node-section--gap">
                    <span className="kc-node-section-label kc-node-section-label--gap">
                      {node.hasPlaque ? 'The plaque that exists' : 'The gap'}
                    </span>
                    <p className="kc-node-gap">{node.theGap}</p>
                    {!node.hasPlaque && (
                      <button
                        className="kc-node-nominate-btn"
                        onClick={() => ctx.setMode('plaque')}
                      >
                        Nominate for a counter-plaque →
                      </button>
                    )}
                  </div>

                  {node.programme && node.programme !== 'all' && (
                    <div className="kc-node-programme">
                      <span className="kc-node-prog-label">Related programme</span>
                      <span className="kc-node-prog-name">{node.programme}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-thread connections */}
      <div className="kc-cross-threads">
        <span className="kc-cross-label">This thread connects to</span>
        <div className="kc-cross-list">
          {THREADS.filter(t => t.id !== activeThread.id).slice(0, 3).map(t => (
            <button
              key={t.id}
              className="kc-cross-thread-btn"
              style={{ '--thread-colour': t.colour } as React.CSSProperties}
              onClick={() => openThread(t)}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ThreadExplorer;