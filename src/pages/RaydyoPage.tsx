import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, Play, Pause, Volume2, Calendar, Clock, 
  Mic, Users, Heart, Share2, Download, Headphones,
  MessageCircle, Award, Search, Globe, BookOpen, Coffee
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

// ========================================
// HERITAGE LANGUAGE PROGRAMMING DATA
// Shows hosted by community members - HOST earns £25/episode
// ========================================

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
    description: 'Morning conversations in Twi - news, proverbs, community updates for the Ghanaian community',
    schedule: 'Saturdays 8-9am',
    host: 'Community Host',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'patois-poetry',
    title: 'Yard Vibes',
    language: 'Jamaican Patois',
    languageFlag: '🇯🇲',
    description: 'Dub poetry, storytelling, and music in Patois. Louise Bennett would be proud.',
    schedule: 'Fridays 7-8pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'naija-hour',
    title: 'Naija Hour',
    language: 'Nigerian Pidgin / Yoruba / Igbo',
    languageFlag: '🇳🇬',
    description: 'Na we own time! Music, gist, and community tori for the Nigerian diaspora',
    schedule: 'Sundays 2-3pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'somali-voices',
    title: 'Codka Bulshada',
    language: 'Somali',
    languageFlag: '🇸🇴',
    description: 'Community voice - stories, poetry, and discussion for the Somali community',
    schedule: 'Saturdays 11am-12pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'trini-talk',
    title: 'Trini to de Bone',
    language: 'Trinidadian Creole',
    languageFlag: '🇹🇹',
    description: 'Lime with we! Calypso, soca, stories and sweet Trini talk',
    schedule: 'Saturdays 4-5pm',
    earningRate: 'Host earns £25/episode',
  },
  {
    id: 'creole-corner',
    title: 'Kwéyòl Koté',
    language: 'St Lucian / Dominican Creole',
    languageFlag: '🇱🇨',
    description: 'Pawòl an Kwéyòl - keeping the Creole languages alive in the diaspora',
    schedule: 'Sundays 10-11am',
    earningRate: 'Host earns £25/episode',
  },
];

// ========================================
// IMMIGRANT JOURNEY STORYTELLING
// Oral history archive - ONE unique testimony per person per series
// Editorial review required before payment
// ========================================

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
    description: 'First-person accounts of coming to the UK - the journey, the culture shock, the adaptation. Your unique testimony, preserved forever.',
    format: '15-30 min episodes',
    earningModel: '£25 for your testimony',
    editorialNote: 'One testimony per person - your arrival story, told once, preserved in our archive',
  },
  {
    id: 'kitchen-stories',
    title: 'Island Kitchen Stories',
    icon: '🍲',
    description: 'Connected to Auntie Anansi\'s Kitchen - recipes, food memories, what changed when we started cooking here',
    format: '20 min episodes',
    earningModel: '£25 for your food story',
    editorialNote: 'One food memory story per contributor - what makes YOUR kitchen unique',
  },
  {
    id: 'between-worlds',
    title: 'Between Two Worlds',
    icon: '🌍',
    description: 'Second generation voices - born here, from there. Identity, belonging, code-switching. Your perspective matters.',
    format: '25 min episodes',
    earningModel: '£25 for your story',
    editorialNote: 'One identity story per person - we\'re collecting diverse voices, not repeat visits',
  },
  {
    id: 'elder-wisdom',
    title: 'Elder Wisdom',
    icon: '👵',
    description: 'Conversations with community elders - preserving stories, advice, and heritage knowledge before it\'s lost',
    format: '30-45 min episodes',
    earningModel: '£25 per elder interviewed',
    editorialNote: 'Priority given to elders not yet in our archive - capturing voices while we can',
  },
  {
    id: 'windrush-legacy',
    title: 'Windrush & Beyond',
    icon: '🚢',
    description: 'The Windrush generation and their descendants - history, hostile environment, resilience',
    format: '30 min episodes',
    earningModel: '£25 for your testimony',
    editorialNote: 'Unique testimonies only - building a historical record, not a repeat roster',
  },
];

// ========================================
// COMPONENT
// ========================================

const RaydyoPage: React.FC = () => {
  // Component state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVolunteerTools, setShowVolunteerTools] = useState(false);
  const [activeLanguageTab, setActiveLanguageTab] = useState<'shows' | 'pitch'>('shows');

  // Custom hooks
  const audioPlayer = useAudioPlayer();
  const search = useSearch();
  const programData = useProgramData();
  const volunteerMode = useVolunteerMode();

  // Workaround: cast EnhancedPlayer to a loose component type so we can pass props
  // that may not be declared in the current EnhancedPlayerProps without a compile error.
  const AnyEnhancedPlayer = EnhancedPlayer as unknown as React.ComponentType<any>;

  // Check if user is currently live broadcasting
  const isCurrentlyLive = programData.currentProgram?.isLive || false;

  // Helper to play a show URL using whichever method the audioPlayer exposes.
  const handlePlayShow = (url?: string) => {
    const source = url || '';
    const p: any = audioPlayer as any;

    if (p && typeof p.loadAndPlay === 'function') {
      p.loadAndPlay(source);
      return;
    }
    if (p && typeof p.setSource === 'function' && typeof p.play === 'function') {
      p.setSource(source);
      p.play();
      return;
    }
    if (p && typeof p.playUrl === 'function') {
      p.playUrl(source);
      return;
    }

    console.warn('audioPlayer does not expose a known play method', audioPlayer);
  };

  return (
    <div className="raydyo-page">
      {/* Accessibility Helper */}
      <ScreenReaderHelper />

      {/* Tutorial Overlay for new users */}
      {showTutorial && (
        <TutorialOverlay 
          onClose={() => setShowTutorial(false)}
          userType={volunteerMode.profile?.role || 'listener'}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          {...({ isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false), searchState: search } as any)}
        />
      )}

      {/* Header Section */}
      <header className="raydyo-header">
        <div className="header-container">
          <div className="logo-section">
            <Radio size={32} className="logo-icon" />
            <h1 className="site-title">Rayd-yo</h1>
            <span className="tagline">Community Voice of Wembley</span>
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
            
            <button 
              className="tutorial-btn"
              onClick={() => setShowTutorial(true)}
            >
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

        {/* Enhanced Audio Player */}
        <section className="player-section">
          <AnyEnhancedPlayer
            playerState={audioPlayer}
            currentProgram={programData.currentProgram || undefined}
            isLive={isCurrentlyLive}
          />
        </section>
      </header>

      <main className="raydyo-main">

        {/* Live Programming Section */}
        <LiveNowSection
          currentProgram={programData.currentProgram}
          nextProgram={programData.nextProgram}
          isLive={isCurrentlyLive}
          listenerCount={programData.stats.currentListeners}
        />

        {/* ========================================
            HERITAGE LANGUAGE PROGRAMMING
            HOST earns £25/episode
            ======================================== */}
        <section className="heritage-language-section">
          <div className="section-header">
            <Globe size={28} className="section-icon" />
            <div className="section-title-group">
              <h2>Heritage Language Radio</h2>
              <p className="section-subtitle">
                Your language matters here. Twi, Patois, Pidgin, Somali, Creole - 
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

              {/* Call for more languages */}
              <div className="heritage-show-card call-for-hosts">
                <div className="show-header">
                  <span className="language-flag">🌍</span>
                  <div className="show-language">Your Language?</div>
                </div>
                <h3 className="show-title">We Need Your Voice</h3>
                <p className="show-description">
                  Speak Guyanese Creole? Bajan? Ga? Hausa? Amharic? 
                  Wembley's diaspora is diverse - we want shows in every community language.
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
                  You don't need radio experience - you need passion for your language and community.
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
                    <li>Youth voices - second generation perspectives</li>
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
                  Not sure? Come to a Rayd-yo open session first - every Thursday 6-8pm at Park Lane Methodist Church
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ========================================
            IMMIGRANT JOURNEY STORYTELLING
            Archive model - one unique testimony per person
            ======================================== */}
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
                  <span className="journey-earning">
                    💰 {show.earningModel}
                  </span>
                </div>
                <p className="journey-editorial-note">
                  📋 {show.editorialNote}
                </p>
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
                  <li><strong>One unique testimony per person</strong> per series - this is an archive, not a repeat roster</li>
                  <li>You earn <strong>£25</strong> when your story is approved and broadcast</li>
                  <li>Editorial review ensures every story adds something new to our collection</li>
                  <li>We handle recording, editing, production - you just share your story</li>
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
                Connected to <strong>Auntie Anansi's Kitchen</strong> - 
                the food, the recipes, what changed when we started cooking here. 
                What you couldn't get. What you substituted. What you miss.
              </p>
              <p>
                <strong>One food memory story per contributor</strong> - 
                what makes YOUR kitchen, your family's recipes, unique.
                Earn £25 when your story is broadcast.
              </p>
              <Link to="/programmes/auntie-anansis-kitchen" className="kitchen-cta">
                🍲 Visit Auntie Anansi's Kitchen
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Content Upload (if volunteer) */}
        {showVolunteerTools && volunteerMode.isVolunteer && (
          <section className="volunteer-section">
            <SimpleUploader 
              userProfile={volunteerMode.profile}
              onUploadComplete={() => {
                // Refresh program data after upload
                programData.refetch();
              }}
            />
          </section>
        )}

        {/* Community Interaction */}
        <section className="community-section">
          <div className="community-grid">
            <div className="reactions-panel">
              <h3>Show Your Support</h3>
              <ReactionButtons
                programId={programData.currentProgram?.id || ''}
                currentReactions={programData.stats.reactions}
                onReaction={(type) => {
                  // Handle reaction
                  console.log('Reaction:', type);
                }}
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

        {/* Integration Sections */}
        <section className="integration-section">
          <div className="integration-grid">
            <JoystickPromo />
            <KaywanasCourtLink />
            
            <div className="academy-connection">
              <h3>Learn Radio Skills</h3>
              <p>Join our community training programs</p>
              <Link to="/programmes/gtechcasters" className="cta-btn">
                <Award size={16} />
                G-Tech Casters Programme
              </Link>
            </div>

            {/* Pageturners Connection - NEW */}
            <div className="pageturners-connection">
              <h3>✍️ Writers to Radio</h3>
              <p>
                Written a diaspora story with Pageturners? 
                Record it for Rayd-yo and earn £25.
              </p>
              <Link to="/programmes/pageturners" className="cta-btn">
                <BookOpen size={16} />
                Pageturners Workshop
              </Link>
            </div>

            {/* Community Archivist Connection - NEW */}
            <div className="archivist-connection">
              <h3>📚 Become a Story Collector</h3>
              <p>
                Earn £15 per interview. Use your community connections 
                to help preserve our stories.
              </p>
              <Link to="/raydyo" className="cta-btn">
                <Mic size={16} />
                Community Archivist Role
              </Link>
            </div>
          </div>
        </section>

        {/* Schedule Preview */}
        <ComingUpNext
          upcomingPrograms={programData.upcomingPrograms}
          onSetReminder={(programId) => {
            programData.setReminder(programId);
          }}
        />

        {/* Community Stats */}
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
              <span className="stat-number">{heritageLanguageShows.length}+</span>
              <span className="stat-label">Heritage Languages</span>
            </div>
          </div>
        </section>

        {/* Language Commitment Statement */}
        <section className="language-commitment">
          <div className="commitment-content">
            <h3>🗣️ Our Language Commitment</h3>
            <p>
              Wembley is one of the most linguistically diverse places in England. 
              Rayd-yo believes that <strong>your heritage language is valid</strong> - 
              not just for private conversations, but for public broadcast.
            </p>
            <p>
              Louise Bennett proved that Patois is a literary language. 
              We're proving that community radio can sound like community - 
              in Twi, in Somali, in Pidgin, in Creole, in all the languages of home.
            </p>
            <p className="commitment-cta">
              <strong>Don't see your language?</strong> We want to change that. 
              <Link to="/contact?subject=heritage-radio-pitch"> Get in touch.</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Draggable Maya Assistant */}
      <DraggableMaya membershipTier={'visitor'} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RaydyoPage;