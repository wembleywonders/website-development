import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio, Play, Pause, Volume2, Calendar, Clock,
  Mic, Users, Heart, Share2, Download, Headphones,
  MessageCircle, Award, Search, Globe, BookOpen, Coffee,
  ChevronRight, Waves, Archive
} from 'lucide-react';

// Import new modular components
import { EnhancedPlayer } from './RaydyoPage/components/AudioPlayer/EnhancedPlayer';
import { SearchModal } from './RaydyoPage/components/Search/SearchModal';
import { LiveNowSection } from './RaydyoPage/components/Programming/LiveNowSection';
import { ComingUpNext } from './RaydyoPage/components/Programming/ComingUpNext';
import { ReactionButtons } from './RaydyoPage/components/Community/ReactionButtons';
import { LiveFeed } from './RaydyoPage/components/Community/LiveFeed';
import { JoystickPromo } from './RaydyoPage/components/Integration/JoystickPromo';
import { KaywanasCourtLink } from './RaydyoPage/components/Integration/KaywanasCourtLink';
import { TutorialOverlay } from './RaydyoPage/components/Learning/TutorialOverlay';
import { SimpleUploader } from './RaydyoPage/components/Volunteer/SimpleUploader';
import { ScreenReaderHelper } from './RaydyoPage/components/Accessibility/ScreenReaderHelper';

// Import hooks
import { useAudioPlayer } from './RaydyoPage/hooks/useAudioPlayer';
import { useSearch } from './RaydyoPage/hooks/useSearch';
import { useProgramData } from './RaydyoPage/hooks/useProgramData';
import { useVolunteerMode } from './RaydyoPage/hooks/useVolunteerMode';

// Import existing layout components
import DraggableMaya from '../components/maya/DraggableMaya';

// Import styles
import './RaydyoPage.css';
import Footer from '@/components/layout/Footer';

// ============================================================
// BROADCASTING CLOCK — SIX LOCATIONS, SIX REGISTERS
// Brent doesn't have one voice. Rayd-yo has six.
// ============================================================

interface ClockSlot {
  id: string;
  time: string;
  location: string;
  locationIcon: string;
  tagline: string;
  description: string;
  programmes: string[];
  musicNote: string;
  toneNote: string;
  accentColor: string;
}

// ============================================================
// SIX ANCHOR SHOWS
// The founding programme slate. Six distinct voices.
// ============================================================

interface AnchorShow {
  id: string;
  title: string;
  slot: string;
  icon: string;
  description: string;
  tagline: string;
  host?: string;
  accent: string;
  crossPlatform?: string[];
}

const ANCHOR_SHOWS: AnchorShow[] = [
  {
    id: 'groans-and-moans',
    title: 'Groans and Moans',
    slot: 'Wednesdays · 9am · Kitchen Table AM',
    icon: '🌱',
    description: 'Child welfare intelligence disguised as everyday care guidance. What Black children’s hair, skin, routines, food, and school experience tells us about the quality of their care. For parents, foster carers, social workers, and teachers who were never shown what they needed to know.',
    tagline: '“Most of us were never shown. This is where that changes.”',
    host: 'Judith Fontanelle · Child development professional · Safeguarding specialist',
    accent: '#4A6741',
    crossPlatform: ['Joystick article', 'CPD extract', 'E-zine deepening notes', 'K2K Radio'],
  },
  {
    id: 'wembley-wonders-matchday',
    title: 'Wembley Wonders',
    slot: 'Match days · 6am–full time + 30min post-match · All registers',
    icon: '🏟️',
    description: '12-hour community witness of a major event happening on our doorstep. Not sports commentary — borough intelligence. Who’s coming today, what they bring, what Wembley looks like from the pavement. Includes Back of the Net — pure borough reaction the moment the ball hits the net — and a 30-minute post-match Zoom analysis live on YouTube.',
    tagline: '80,000 visitors. One borough. This is what it looks like from the pavement.',
    accent: '#C84B4B',
    crossPlatform: ['YouTube live', 'Joystick match day report', 'Cyberstore match day listings', 'WhatsApp community updates'],
  },
  {
    id: 'mother-tongue',
    title: 'Mother Tongue',
    slot: 'Saturdays · 10am · In the Queue / Between the Aisles',
    icon: '🌐',
    description: 'Community radio in the languages we actually speak. Twi, Patois, Nigerian Pidgin, Somali, Trinidadian Creole, St Lucian Kwéyòl — rotating 20-minute units across Saturday morning. Heritage language hosts earn £25 per episode. Louise Bennett proved Patois is a literary language. Mother Tongue proves community languages are broadcast languages.',
    tagline: '148 languages. All of them welcome here.',
    accent: '#8B6914',
    crossPlatform: ['Podcast archive', 'Knowledge Commons credit', 'Heritage host pathway'],
  },
  {
    id: 'away-from-the-terrace',
    title: 'Away from the Terrace',
    slot: 'Fridays · 8pm · Behind the Footlights',
    icon: '🎤',
    description: 'Friday nights. The culture the cameras miss. The studio session nobody filmed. The designer in Harlesden doing something nobody’s named yet. The producer in Stonebridge three tracks away from something significant. Youth-facing, music-led, culturally serious. Trubble n Bass meets Joystick meets the borough’s next generation of creators.',
    tagline: 'Where the real stuff is happening.',
    accent: '#9B4A7A',
    crossPlatform: ['Joystick review', 'YouTube short-form clip', 'Trubble n Bass cross-pollination'],
  },
  {
    id: 'remember-when',
    title: 'Remember When…',
    slot: 'Sundays · 4pm · Kitchen Table PM',
    icon: '🧓',
    description: 'The counter-archive in audio form. The knowledge that lives in people, not documents. Community elders sharing stories that don’t appear in the records — arrival stories, kitchen memories, the names of streets that no longer exist. What we remember is not past. It’s still shaping what’s happening now.',
    tagline: 'The stories that explain right now.',
    accent: '#3D5A80',
    crossPlatform: ['Roots archive', 'Knowledge Commons entry', 'Joystick long-read', 'Oral history record'],
  },
  {
    id: 'reckon-this-reckon-that',
    title: 'Reckon This, Reckon That',
    slot: 'Thursdays · 12pm · Under the Arches',
    icon: '💰',
    description: 'One member’s economic journey per episode. The Knowledge Commons entry that became a Cyberstore listing that became a corporate training offer. What your work is worth before you name the price. The Fiverr number before you quote. The market rate the platform protects. Real money, real decisions, real people doing it in real time.',
    tagline: 'What your work is worth. Before you name the price.',
    accent: '#5C7A9B',
    crossPlatform: ['Joystick profile', 'Cyberstore link', 'Badge record provenance', 'CPD evidence'],
  },
];

const broadcastingClock: ClockSlot[] = [
  {
    id: 'kitchen-table-am',
    time: '6–9am',
    location: 'Across the Kitchen Table',
    locationIcon: '☕',
    tagline: 'The day hasn\'t hardened yet.',
    description: 'The conversation that starts before the world interrupts. Intimate, warm, unhurried. People still soft. Still themselves.',
    programmes: ['Roots', 'Pageturners', 'Bright Sparks'],
    musicNote: 'Soulful, organic. Morning light through the window.',
    toneNote: 'Like someone you already know.',
    accentColor: '#C8956C',
  },
  {
    id: 'queue',
    time: '9–11am',
    location: 'In the Queue',
    locationIcon: '🚶',
    tagline: 'The borough is in motion.',
    description: 'The great democratic leveller. Nobody jumps it. Six languages in four minutes. The station speaking as Brent to Brent.',
    programmes: ['Community Notices', 'What\'s On', 'Maya\'s Morning'],
    musicNote: 'The playlist that belongs to nobody and everybody simultaneously.',
    toneNote: 'Cross-cultural, multilingual, connective.',
    accentColor: '#4A9B7F',
  },
  {
    id: 'aisles',
    time: '11am–1pm',
    location: 'Between the Aisles',
    locationIcon: '🌍',
    tagline: 'The unexpected encounter.',
    description: 'Sacred randomness. Lives colliding. The plaque you nearly walked past. Wisdom finds you — you weren\'t looking for it.',
    programmes: ['Auntie Anansi\'s Kitchen', 'Roots Knowledge Archive', 'Heritage Discovery'],
    musicNote: 'World, highlife, something that makes you stop what you\'re doing.',
    toneNote: 'Curious, warm, slightly conspiratorial.',
    accentColor: '#8B6914',
  },
  {
    id: 'arches',
    time: '1–4pm',
    location: 'Under the Arches',
    locationIcon: '🔧',
    tagline: 'Knowledge with dirt under its fingernails.',
    description: 'The informal economy taking itself seriously. Peer to peer. Nobody talking down to anybody. The mechanic who\'s also a philosopher.',
    programmes: ['TECHreneurs', 'STEMgeneers', 'Cyberstore'],
    musicNote: 'Rhythmic, purposeful. Background that becomes foreground.',
    toneNote: 'Practical, energetic, no-nonsense.',
    accentColor: '#5C7A9B',
  },
  {
    id: 'kitchen-table-pm',
    time: '4–6pm',
    location: 'Across the Kitchen Table',
    locationIcon: '🏠',
    tagline: 'School\'s out. The day folding back into home.',
    description: 'Intergenerational. Grandparents, parents, children all in the same room. The day being processed. Slower now.',
    programmes: ['Bright Sparks', 'Family Strand', 'Elder Hours'],
    musicNote: 'Songs that belong to more than one generation simultaneously.',
    toneNote: 'Warmer, slower. Generous.',
    accentColor: '#C8956C',
  },
  {
    id: 'footlights',
    time: '6–8pm',
    location: 'Behind the Footlights',
    locationIcon: '🎭',
    tagline: 'Someone stepping into their gift.',
    description: 'Performance, revelation, craft. Brent as a place that makes culture, not just consumes it. Elevated but never exclusive.',
    programmes: ['Kaywana\'s Court', 'Easy Street', 'Silk Stilettos'],
    musicNote: 'The album track, the deep cut. What daytime playlists never reach.',
    toneNote: 'Elevated. Committed. Present.',
    accentColor: '#9B4A7A',
  },
  {
    id: 'terrace',
    time: '8–10pm',
    location: 'The Terrace',
    locationIcon: '🔥',
    tagline: 'The crowd finding one throat.',
    description: 'Argument, passion, collective joy. The volume goes up. The stakes feel real. The station at full height.',
    programmes: ['Trubble n Bass', 'Joystick', 'G-Tech Casters'],
    musicNote: 'The drop. The riddim. The thing that makes the room move.',
    toneNote: 'Unfiltered, generous, alive.',
    accentColor: '#C84B4B',
  },
  {
    id: 'arches-late',
    time: '10pm–midnight',
    location: 'Under the Arches — Late',
    locationIcon: '🌙',
    tagline: 'The city still working.',
    description: 'The night economy. Different conversations now. The philosopher mechanic gets two hours instead of twenty minutes. For people who aren\'t ready to stop thinking.',
    programmes: ['Late Sessions', 'Extended Mixes', 'Long-form Interview'],
    musicNote: 'Jazz. Proper jazz. The thing this whole journey started with.',
    toneNote: 'Unhurried, exploratory, deep.',
    accentColor: '#3D5A80',
  },
  {
    id: 'archive',
    time: 'Midnight–6am',
    location: 'The Archive',
    locationIcon: '📻',
    tagline: 'Brent breathing in its sleep.',
    description: 'Recorded programming, heritage content. Rayd-yo as living document, not just live broadcast. The Black Atlantic in full flow.',
    programmes: ['Heritage Archive', 'Oral Histories', 'Continuous Mix'],
    musicNote: 'The continuous mix. The Black Atlantic uninterrupted.',
    toneNote: 'The station as memory.',
    accentColor: '#2A2A3E',
  },
];

// ============================================================
// HERITAGE LANGUAGE PROGRAMMING
// HOST earns £25/episode
// ============================================================

interface HeritageShow {
  id: string;
  title: string;
  language: string;
  languageFlag: string;
  description: string;
  schedule: string;
  host?: string;
  earningRate?: string;
}

const heritageLanguageShows: HeritageShow[] = [
  {
    id: 'twi-morning',
    title: 'Anɔpa Nkɔmmɔ',
    language: 'Twi / Akan',
    languageFlag: '🇬🇭',
    description: 'Morning conversations in Twi — news, proverbs, community updates for the Ghanaian community.',
    schedule: 'Saturdays 8–9am',
    host: 'Community Host',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'patois-poetry',
    title: 'Yard Vibes',
    language: 'Jamaican Patois',
    languageFlag: '🇯🇲',
    description: 'Dub poetry, storytelling, and music in Patois. Louise Bennett would be proud.',
    schedule: 'Fridays 7–8pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'naija-hour',
    title: 'Naija Hour',
    language: 'Nigerian Pidgin / Yoruba / Igbo',
    languageFlag: '🇳🇬',
    description: 'Na we own time! Music, gist, and community tori for the Nigerian diaspora.',
    schedule: 'Sundays 2–3pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'somali-voices',
    title: 'Codka Bulshada',
    language: 'Somali',
    languageFlag: '🇸🇴',
    description: 'Community voice — stories, poetry, and discussion for the Somali community.',
    schedule: 'Saturdays 11am–12pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'trini-talk',
    title: 'Trini to de Bone',
    language: 'Trinidadian Creole',
    languageFlag: '🇹🇹',
    description: 'Lime with we! Calypso, soca, stories and sweet Trini talk.',
    schedule: 'Saturdays 4–5pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'creole-corner',
    title: 'Kwéyòl Koté',
    language: 'St Lucian / Dominican Creole',
    languageFlag: '🇱🇨',
    description: 'Pawòl an Kwéyòl — keeping the Creole languages alive in the diaspora.',
    schedule: 'Sundays 10–11am',
    earningRate: 'Host earns £25/episode',
  },
];

// ============================================================
// IMMIGRANT JOURNEY STORYTELLING
// Archive model — one unique testimony per person per series
// ============================================================

interface JourneyShow {
  id: string;
  title: string;
  icon: string;
  description: string;
  format: string;
  earningModel: string;
  editorialNote: string;
}

const immigrantJourneyShows: JourneyShow[] = [
  {
    id: 'arrival-stories',
    title: 'Arrival Stories',
    icon: '✈️',
    description: 'First-person accounts of coming to the UK — the journey, the culture shock, the adaptation. Your unique testimony, preserved forever.',
    format: '15–30 min episodes',
    earningModel: '£25 for your testimony',
    editorialNote: 'One testimony per person — your arrival story, told once, preserved in our archive.',
  },
  {
    id: 'kitchen-stories',
    title: 'Island Kitchen Stories',
    icon: '🍲',
    description: 'Connected to Auntie Anansi\'s Kitchen — recipes, food memories, what changed when we started cooking here.',
    format: '20 min episodes',
    earningModel: '£25 for your food story',
    editorialNote: 'One food memory story per contributor — what makes YOUR kitchen unique.',
  },
  {
    id: 'between-worlds',
    title: 'Between Two Worlds',
    icon: '🌍',
    description: 'Second generation voices — born here, from there. Identity, belonging, code-switching. Your perspective matters.',
    format: '25 min episodes',
    earningModel: '£25 for your story',
    editorialNote: 'One identity story per person — we\'re collecting diverse voices, not repeat visits.',
  },
  {
    id: 'elder-wisdom',
    title: 'Elder Wisdom',
    icon: '👵',
    description: 'Conversations with community elders — preserving stories, advice, and heritage knowledge before it\'s lost.',
    format: '30–45 min episodes',
    earningModel: '£25 per elder interviewed',
    editorialNote: 'Priority given to elders not yet in our archive — capturing voices while we can.',
  },
  {
    id: 'windrush-legacy',
    title: 'Windrush & Beyond',
    icon: '🚢',
    description: 'The Windrush generation and their descendants — history, hostile environment, resilience.',
    format: '30 min episodes',
    earningModel: '£25 for your testimony',
    editorialNote: 'Unique testimonies only — building a historical record, not a repeat roster.',
  },
];

// ============================================================
// HELPERS
// ============================================================

function getCurrentClockSlot(): ClockSlot {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return broadcastingClock[0];
  if (hour >= 9 && hour < 11) return broadcastingClock[1];
  if (hour >= 11 && hour < 13) return broadcastingClock[2];
  if (hour >= 13 && hour < 16) return broadcastingClock[3];
  if (hour >= 16 && hour < 18) return broadcastingClock[4];
  if (hour >= 18 && hour < 20) return broadcastingClock[5];
  if (hour >= 20 && hour < 22) return broadcastingClock[6];
  if (hour >= 22 && hour < 24) return broadcastingClock[7];
  return broadcastingClock[8]; // midnight–6am archive
}

// ============================================================
// COMPONENT
// ============================================================

const RaydyoPage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVolunteerTools, setShowVolunteerTools] = useState(false);
  const [activeLanguageTab, setActiveLanguageTab] = useState<'shows' | 'pitch'>('shows');
  const [activeClockSlot, setActiveClockSlot] = useState<ClockSlot>(getCurrentClockSlot());
  const [clockExpanded, setClockExpanded] = useState(false);

  const audioPlayer = useAudioPlayer();
  const search = useSearch();
  const programData = useProgramData();
  const volunteerMode = useVolunteerMode();

  const AnyEnhancedPlayer = EnhancedPlayer as unknown as React.ComponentType<any>;
  const isCurrentlyLive = programData.currentProgram?.isLive || false;

  // Tick the clock highlight in sync with real time
  useEffect(() => {
    const tick = setInterval(() => {
      setActiveClockSlot(getCurrentClockSlot());
    }, 60_000);
    return () => clearInterval(tick);
  }, []);

  const handlePlayShow = (url?: string) => {
    const source = url || '';
    const p: any = audioPlayer as any;
    if (p && typeof p.loadAndPlay === 'function') { p.loadAndPlay(source); return; }
    if (p && typeof p.setSource === 'function' && typeof p.play === 'function') { p.setSource(source); p.play(); return; }
    if (p && typeof p.playUrl === 'function') { p.playUrl(source); return; }
    console.warn('audioPlayer does not expose a known play method', audioPlayer);
  };

  return (
    <div className="raydyo-page">
      <ScreenReaderHelper />

      {showTutorial && (
        <TutorialOverlay
          onClose={() => setShowTutorial(false)}
          userType={volunteerMode.profile?.role || 'listener'}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          {...({ isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false), searchState: search } as any)}
        />
      )}

      {/* ── HEADER ── */}
      <header className="raydyo-header">
        <div className="header-container">
          <div className="logo-section">
            <Radio size={32} className="logo-icon" />
            <div className="logo-text">
              <h1 className="site-title">Rayd-yo</h1>
              <span className="tagline">148 cultures. One borough. One frequency.</span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search shows and podcasts"
            >
              <Search size={20} />
              Search
            </button>
            <button className="tutorial-btn" onClick={() => setShowTutorial(true)}>
              Help
            </button>
            {volunteerMode.isVolunteer && (
              <button
                className="volunteer-toggle"
                onClick={() => setShowVolunteerTools(!showVolunteerTools)}
              >
                <Mic size={16} />
                Volunteer Tools
              </button>
            )}
          </div>
        </div>

        <section className="player-section">
          <AnyEnhancedPlayer
            playerState={audioPlayer}
            currentProgram={programData.currentProgram || undefined}
            isLive={isCurrentlyLive}
          />
        </section>
      </header>

      <main className="raydyo-main">

        {/* ── STATION MANIFESTO ── */}
        <section className="station-manifesto">
          <div className="manifesto-inner">
            <p className="manifesto-line">
              Rayd-yo doesn’t have a voice. <em>Brent has a voice.</em>
            </p>
            <p className="manifesto-sub">
              We are the terrace and the kitchen table. The footlights and the arches.
              The queue and the aisles. This is Brent learning to listen to itself.
            </p>
            <p className="manifesto-sub" style={{ marginTop: '1rem' }}>
              People often say ‘I wish I knew this before.’ The reality is, most of us were never shown.
              Rayd-yo exists to close that gap — not by broadcasting <em>at</em> communities,
              but by giving communities a frequency of their own.
              Every kitchen table. Every school run. Every conversation that deserves to be on air.
            </p>
            <p className="manifesto-identity">
              We are not a talk station. We are not a music station. We are not community radio
              in the traditional sense. Rayd-yo is where community knowledge becomes broadcast culture —
              and the music, the conversation, and the culture are always the same thing.
            </p>
          </div>
        </section>

        {/* ── LIVE PROGRAMMING ── */}
        <LiveNowSection
          currentProgram={programData.currentProgram}
          nextProgram={programData.nextProgram}
          isLive={isCurrentlyLive}
          listenerCount={programData.stats.currentListeners}
        />

        {/* ── ANCHOR SHOWS ── */}
        <section className="anchor-shows-section">
          <div className="section-header">
            <Radio size={28} className="section-icon" />
            <div className="section-title-group">
              <h2>Our Six Anchor Shows</h2>
              <p className="section-subtitle">
                Six founding programmes. Six distinct voices. None of them sound like anything else on UK radio.
              </p>
            </div>
          </div>
          <div className="anchor-shows-grid">
            {ANCHOR_SHOWS.map(show => (
              <div key={show.id} className="anchor-show-card" style={{ '--show-accent': show.accent } as React.CSSProperties}>
                <div className="anchor-show-card__header">
                  <span className="anchor-show-card__icon">{show.icon}</span>
                  <div>
                    <h3 className="anchor-show-card__title">{show.title}</h3>
                    <span className="anchor-show-card__slot">{show.slot}</span>
                  </div>
                </div>
                <p className="anchor-show-card__desc">{show.description}</p>
                <p className="anchor-show-card__tagline">{show.tagline}</p>
                {show.host && (
                  <div className="anchor-show-card__host">
                    <span className="anchor-show-card__host-label">Lead:</span>
                    <span className="anchor-show-card__host-name">{show.host}</span>
                  </div>
                )}
                {show.crossPlatform && (
                  <div className="anchor-show-card__cross">
                    {show.crossPlatform.map(cp => (
                      <span key={cp} className="anchor-show-card__cross-pill">{cp}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="k2k-partnership">
            <div className="k2k-partnership__inner">
              <span className="k2k-partnership__icon">📻</span>
              <div>
                <h4 className="k2k-partnership__title">Broadcasting partnership with K2K Radio</h4>
                <p className="k2k-partnership__desc">
                  Rayd-yo provides the podcast and long-form content architecture.
                  K2K Radio provides live broadcast reach and community trust.
                  Anchor show hosts earn through Rayd-yo’s 55% model regardless of which platform airs the content.
                  Groans and Moans is currently in production at K2K Radio with Judith Fontanelle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BROADCASTING CLOCK ── */}
        <section className="broadcasting-clock-section">
          <div className="section-header">
            <Clock size={28} className="section-icon" />
            <div className="section-title-group">
              <h2>The Broadcasting Clock</h2>
              <p className="section-subtitle">
                Six locations. Six registers. One borough, speaking in its own voice all day long.
              </p>
            </div>
            <button
              className="clock-expand-btn"
              onClick={() => setClockExpanded(!clockExpanded)}
              aria-expanded={clockExpanded}
            >
              {clockExpanded ? 'Collapse' : 'Full schedule'}
              <ChevronRight
                size={16}
                style={{ transform: clockExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </button>
          </div>

          {/* Current slot — always visible */}
          <div
            className="clock-current-slot"
            style={{ borderLeftColor: activeClockSlot.accentColor }}
          >
            <div className="clock-slot-badge" style={{ backgroundColor: activeClockSlot.accentColor }}>
              On Air Now
            </div>
            <div className="clock-slot-body">
              <span className="clock-slot-icon">{activeClockSlot.locationIcon}</span>
              <div className="clock-slot-text">
                <h3 className="clock-slot-time">{activeClockSlot.time}</h3>
                <h4 className="clock-slot-location">{activeClockSlot.location}</h4>
                <p className="clock-slot-tagline">{activeClockSlot.tagline}</p>
                <p className="clock-slot-description">{activeClockSlot.description}</p>
                <div className="clock-slot-programmes">
                  {activeClockSlot.programmes.map(p => (
                    <span key={p} className="clock-programme-pill">{p}</span>
                  ))}
                </div>
                <p className="clock-slot-music">
                  <Waves size={13} /> {activeClockSlot.musicNote}
                </p>
              </div>
            </div>
          </div>

          {/* Full clock — collapsible */}
          {clockExpanded && (
            <div className="clock-full-grid">
              {broadcastingClock.map((slot) => (
                <button
                  key={slot.id}
                  className={`clock-grid-slot ${slot.id === activeClockSlot.id ? 'is-now' : ''}`}
                  style={{ '--slot-accent': slot.accentColor } as React.CSSProperties}
                  onClick={() => setActiveClockSlot(slot)}
                >
                  <span className="clock-grid-icon">{slot.locationIcon}</span>
                  <span className="clock-grid-time">{slot.time}</span>
                  <span className="clock-grid-location">{slot.location}</span>
                  {slot.id === activeClockSlot.id && (
                    <span className="clock-grid-now-dot" />
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── HERITAGE LANGUAGE PROGRAMMING ── */}
        <section className="heritage-language-section">
          <div className="section-header">
            <Globe size={28} className="section-icon" />
            <div className="section-title-group">
              <h2>Heritage Language Radio</h2>
              <p className="section-subtitle">
                Your language matters here. Twi, Patois, Pidgin, Somali, Creole —
                community radio in the languages we actually speak.
              </p>
            </div>
          </div>

          <div className="heritage-tabs">
            <button
              className={`heritage-tab ${activeLanguageTab === 'shows' ? 'active' : ''}`}
              onClick={() => setActiveLanguageTab('shows')}
            >
              📻 Current Shows
            </button>
            <button
              className={`heritage-tab ${activeLanguageTab === 'pitch' ? 'active' : ''}`}
              onClick={() => setActiveLanguageTab('pitch')}
            >
              🎙️ Pitch Your Show
            </button>
          </div>

          {activeLanguageTab === 'shows' && (
            <div className="heritage-shows-grid">
              {heritageLanguageShows.map((show) => (
                <div key={show.id} className="heritage-show-card">
                  <div className="show-header">
                    <span className="language-flag">{show.languageFlag}</span>
                    <div className="show-language">{show.language}</div>
                  </div>
                  <h3 className="show-title">{show.title}</h3>
                  <p className="show-description">{show.description}</p>
                  <div className="show-meta">
                    <span className="show-schedule">
                      <Clock size={14} />
                      {show.schedule}
                    </span>
                    {show.earningRate && (
                      <span className="show-earning" title="Show hosts earn £25 per produced episode">
                        💰 {show.earningRate}
                      </span>
                    )}
                  </div>
                  <button className="listen-btn" onClick={() => handlePlayShow()}>
                    <Play size={16} />
                    Listen to Archive
                  </button>
                </div>
              ))}

              <div className="heritage-show-card call-for-hosts">
                <div className="show-header">
                  <span className="language-flag">🌍</span>
                  <div className="show-language">Your Language?</div>
                </div>
                <h3 className="show-title">We Need Your Voice</h3>
                <p className="show-description">
                  Speak Guyanese Creole? Bajan? Ga? Hausa? Amharic?
                  Wembley's diaspora is diverse — we want shows in every community language.
                </p>
                <button className="pitch-btn" onClick={() => setActiveLanguageTab('pitch')}>
                  <Mic size={16} />
                  Pitch Your Show
                </button>
              </div>
            </div>
          )}

          {activeLanguageTab === 'pitch' && (
            <div className="heritage-pitch-section">
              <div className="pitch-intro">
                <h3>🎙️ Host a Heritage Language Show</h3>
                <p>
                  We're actively looking for community members to host shows in heritage languages.
                  You don't need radio experience — you need passion for your language and your community.
                </p>
              </div>

              <div className="pitch-details">
                <div className="pitch-card">
                  <h4>💰 What You Earn (as Host)</h4>
                  <ul>
                    <li><strong>£25 per episode</strong> paid directly to you as host</li>
                    <li>55% of any sponsorship you bring to your show</li>
                    <li>Training and support from G-Tech Casters (free)</li>
                    <li>Equipment access at our community spaces</li>
                  </ul>
                </div>

                <div className="pitch-card">
                  <h4>📋 What We Need From You</h4>
                  <ul>
                    <li>Fluency in a heritage language</li>
                    <li>Connection to that community in Wembley/Brent</li>
                    <li>Commitment to regular episodes (weekly/fortnightly)</li>
                    <li>Ideas for engaging your community</li>
                  </ul>
                </div>

                <div className="pitch-card">
                  <h4>🎯 Show Ideas We Love</h4>
                  <ul>
                    <li>Community news and announcements</li>
                    <li>Elder interviews and oral history</li>
                    <li>Language learning segments</li>
                    <li>Music and cultural programming</li>
                    <li>Storytelling and proverbs</li>
                    <li>Youth voices — second generation perspectives</li>
                  </ul>
                </div>

                <div className="pitch-card">
                  <h4>🌍 Languages We're Looking For</h4>
                  <p className="languages-list">
                    Guyanese Creole • Bajan • Vincentian • Grenadian •
                    Ga • Ewe • Fante • Hausa • Igbo •
                    Amharic • Tigrinya • Arabic • Urdu • Hindi •
                    Tamil • Gujarati • Polish • Portuguese • Romanian •
                    <strong> + Any language spoken in Wembley</strong>
                  </p>
                </div>
              </div>

              <div className="pitch-cta">
                <Link to="/contact?subject=heritage-radio-pitch" className="primary-cta">
                  <Mic size={20} />
                  Submit Your Show Idea
                </Link>
                <p className="pitch-note">
                  Not sure? Come to a Rayd-yo open session first — every Thursday 6–8pm at Park Lane Methodist Church.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── IMMIGRANT JOURNEY STORYTELLING ── */}
        <section className="immigrant-journey-section">
          <div className="section-header">
            <BookOpen size={28} className="section-icon" />
            <div className="section-title-group">
              <h2>Immigrant Journeys</h2>
              <p className="section-subtitle">
                Building a permanent oral history archive. Your unique testimony,
                preserved forever. <strong>One story per person, £25 on publication.</strong>
              </p>
            </div>
          </div>

          <div className="journey-shows-grid">
            {immigrantJourneyShows.map((show) => (
              <div key={show.id} className="journey-show-card">
                <div className="journey-icon">{show.icon}</div>
                <h3>{show.title}</h3>
                <p>{show.description}</p>
                <div className="journey-meta">
                  <span className="journey-format">{show.format}</span>
                  <span className="journey-earning">💰 {show.earningModel}</span>
                </div>
                <p className="journey-editorial-note">📋 {show.editorialNote}</p>
                <div className="journey-actions">
                  <button className="listen-btn" onClick={() => handlePlayShow()}>
                    <Play size={16} />
                    Listen
                  </button>
                  <button className="share-btn">
                    <Share2 size={16} />
                    Share Your Story
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="journey-cta-section">
            <div className="journey-cta-card">
              <h3>📝 Share Your Story — Build Our Archive</h3>
              <p>
                When did you or your family come to the UK? What was that journey like?
                What surprised you? What do you miss?
              </p>
              <p>
                We're building a <strong>permanent oral history archive</strong> of Wembley's diverse communities.
                Your story matters. Your children and grandchildren will want to hear it.
              </p>

              <div className="earning-breakdown">
                <h4>💰 How It Works</h4>
                <ul>
                  <li><strong>One unique testimony per person</strong> per series — this is an archive, not a repeat roster</li>
                  <li>You earn <strong>£25</strong> when your story is approved and broadcast</li>
                  <li>Editorial review ensures every story adds something new to our collection</li>
                  <li>We handle recording, editing, production — you just share your story</li>
                  <li>Your story is preserved permanently in our community archive</li>
                </ul>
              </div>

              <div className="editorial-note-box">
                <h4>📋 What We're Looking For</h4>
                <p>
                  We want <strong>diverse voices</strong>, not repeat visits. If you've already shared your arrival story,
                  we won't pay for "my arrival story part 2." But if you have a <em>different</em> story
                  (kitchen memories, elder wisdom, second-gen identity), that's a separate contribution.
                </p>
                <p>
                  <strong>Priority given to:</strong> Voices not yet in our archive • Elders •
                  Underrepresented communities • Unique perspectives
                </p>
              </div>

              <div className="journey-cta-buttons">
                <Link to="/raydyo" className="primary-cta">
                  <Mic size={18} />
                  Submit Your Story
                </Link>
                <Link to="/programmes/pageturners?activity=diaspora-narratives" className="secondary-cta">
                  <BookOpen size={18} />
                  Write It Instead (Pageturners)
                </Link>
              </div>
            </div>

            <div className="journey-cta-card kitchen-link">
              <div className="kitchen-header">
                <span className="kitchen-icon">🍲</span>
                <h3>Island Kitchen Stories</h3>
              </div>
              <p>
                Connected to <strong>Auntie Anansi's Kitchen</strong> —
                the food, the recipes, what changed when we started cooking here.
                What you couldn't get. What you substituted. What you miss.
              </p>
              <p>
                <strong>One food memory story per contributor</strong> —
                what makes YOUR kitchen, your family's recipes, unique.
                Earn £25 when your story is broadcast.
              </p>
              <Link to="/programmes/auntie-anansis-kitchen" className="kitchen-cta">
                🍲 Visit Auntie Anansi's Kitchen
              </Link>
            </div>
          </div>
        </section>

        {/* ── VOLUNTEER TOOLS ── */}
        {showVolunteerTools && volunteerMode.isVolunteer && (
          <section className="volunteer-section">
            <SimpleUploader
              userProfile={volunteerMode.profile}
              onUploadComplete={() => { programData.refetch(); }}
            />
          </section>
        )}

        {/* ── COMMUNITY INTERACTION ── */}
        <section className="community-section">
          <div className="community-grid">
            <div className="reactions-panel">
              <h3>Show Your Support</h3>
              <ReactionButtons
                programId={programData.currentProgram?.id || ''}
                currentReactions={programData.stats.reactions}
                onReaction={(type) => { console.log('Reaction:', type); }}
              />
            </div>
            <div className="live-activity">
              <LiveFeed
                isLive={isCurrentlyLive}
                programId={programData.currentProgram?.id || ''}
              />
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="integration-section">
          <div className="integration-grid">
            <JoystickPromo />
            <KaywanasCourtLink />

            <div className="academy-connection">
              <h3>Learn Radio Skills</h3>
              <p>Join our community training programmes</p>
              <Link to="/programmes/gtechcasters" className="cta-btn">
                <Award size={16} />
                G-Tech Casters Programme
              </Link>
            </div>

            <div className="pageturners-connection">
              <h3>✍️ Writers to Radio</h3>
              <p>Written a diaspora story with Pageturners? Record it for Rayd-yo and earn £25.</p>
              <Link to="/programmes/pageturners" className="cta-btn">
                <BookOpen size={16} />
                Pageturners Workshop
              </Link>
            </div>

            <div className="archivist-connection">
              <h3>📚 Become a Story Collector</h3>
              <p>Earn £15 per interview. Use your community connections to help preserve our stories.</p>
              <Link to="/raydyo" className="cta-btn">
                <Mic size={16} />
                Community Archivist Role
              </Link>
            </div>
          </div>
        </section>

        {/* ── SCHEDULE ── */}
        <ComingUpNext
          upcomingPrograms={programData.upcomingPrograms}
          onSetReminder={(programId) => { programData.setReminder(programId); }}
        />

        {/* ── STATS ── */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <Users size={24} />
              <span className="stat-number">{programData.stats.totalMembers}</span>
              <span className="stat-label">Community Members</span>
            </div>
            <div className="stat-item">
              <Headphones size={24} />
              <span className="stat-number">{programData.stats.monthlyHours}</span>
              <span className="stat-label">Hours This Month</span>
            </div>
            <div className="stat-item">
              <Mic size={24} />
              <span className="stat-number">{programData.stats.activeVolunteers}</span>
              <span className="stat-label">Active Volunteers</span>
            </div>
            <div className="stat-item">
              <Globe size={24} />
              <span className="stat-number">148</span>
              <span className="stat-label">Cultures in Brent</span>
            </div>
          </div>
        </section>

        {/* ── LANGUAGE COMMITMENT ── */}
        <section className="language-commitment">
          <div className="commitment-content">
            <h3>🗣️ Our Language Commitment</h3>
            <p>
              Wembley is one of the most linguistically diverse places in England.
              Rayd-yo believes that <strong>your heritage language is valid</strong> —
              not just for private conversations, but for public broadcast.
            </p>
            <p>
              Louise Bennett proved that Patois is a literary language.
              We're proving that community radio can sound like community —
              in Twi, in Somali, in Pidgin, in Creole, in all the languages of home.
            </p>
            <p className="commitment-cta">
              <strong>Don't see your language?</strong> We want to change that.{' '}
              <Link to="/contact?subject=heritage-radio-pitch">Get in touch.</Link>
            </p>
          </div>
        </section>

        {/* ── ARCHIVE CTA ── */}
        <section className="archive-cta-section">
          <div className="archive-cta-inner">
            <Archive size={32} />
            <div>
              <h3>The Archive Never Sleeps</h3>
              <p>
                Midnight to 6am, Rayd-yo becomes a living document.
                Heritage recordings, oral histories, the continuous Black Atlantic mix.
                Brent breathing in its sleep.
              </p>
            </div>
            <Link to="/programmes/roots-knowledge-archive" className="archive-cta-btn">
              Explore the Archive <ChevronRight size={16} />
            </Link>
          </div>
        </section>

      </main>

      <DraggableMaya membershipTier={'visitor'} />
      <Footer />
    </div>
  );
};

export default RaydyoPage;