import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMayaStore } from '../stores/mayaStore';
import { useAuth } from '../contexts/AuthContext';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import {
  Pencil, BookOpen, Radio, Users, DollarSign,
  Archive, ArrowRight, ExternalLink
} from 'lucide-react';
import './GetStartedPage.css';

interface ResumeItem {
  label: string;
  sublabel: string;
  path: string;
}

interface FinderCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  accentBg: string;
  accentColor: string;
}

interface MayaSuggestion {
  text: string;
  path: string;
}

interface MayaContext {
  message: string;
  suggestions: MayaSuggestion[];
}

interface MemberStats {
  covenantScore: number;
  covenantTier: string;
  programmesVisited: number;
  programmesTotal: number;
  crossPollinationPct: number;
  crossPollinationVsTierAvg: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function todayLabel(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const MayaBar: React.FC<{ context: MayaContext; onSuggestion: (path: string) => void }> = ({
  context,
  onSuggestion,
}) => (
  <div className="gs-maya-bar">
    <div className="gs-maya-avatar" aria-hidden="true">M</div>
    <div className="gs-maya-body">
      <p className="gs-maya-message">{context.message}</p>
      <div className="gs-maya-pills">
        {context.suggestions.map((s) => (
          <button
            key={s.path}
            className="gs-maya-pill"
            onClick={() => onSuggestion(s.path)}
          >
            {s.text}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ResumeCard: React.FC<{ item: ResumeItem; onGo: (path: string) => void }> = ({
  item,
  onGo,
}) => (
  <div className="gs-resume-card">
    <div className="gs-resume-icon" aria-hidden="true">
      <Radio size={20} />
    </div>
    <div className="gs-resume-text">
      <h3>{item.label}</h3>
      <p>{item.sublabel}</p>
    </div>
    <button className="gs-resume-btn" onClick={() => onGo(item.path)}>
      Continue <ArrowRight size={14} />
    </button>
  </div>
);

const FinderGrid: React.FC<{
  cards: FinderCard[];
  onNavigate: (path: string) => void;
}> = ({ cards, onNavigate }) => (
  <div className="gs-finder-grid">
    {cards.map((card) => {
      const Icon = card.icon;
      return (
        <button
          key={card.id}
          className="gs-finder-card"
          onClick={() => onNavigate(card.path)}
        >
          <div
            className="gs-finder-icon"
            style={{ backgroundColor: card.accentBg }}
            aria-hidden="true"
          >
            <span style={{ color: card.accentColor }}>
              <Icon size={16} className="gs-finder-icon-svg" />
            </span>
          </div>
          <h4>{card.title}</h4>
          <p>{card.subtitle}</p>
        </button>
      );
    })}
  </div>
);

const StatsRow: React.FC<{ stats: MemberStats }> = ({ stats }) => (
  <div className="gs-stats-row">
    <div className="gs-stat-card">
      <span className="gs-stat-label">Covenant score</span>
      <span className="gs-stat-value">{stats.covenantScore}</span>
      <span className="gs-stat-sub">{stats.covenantTier} tier</span>
    </div>
    <div className="gs-stat-card">
      <span className="gs-stat-label">Programmes visited</span>
      <span className="gs-stat-value">{stats.programmesVisited}</span>
      <span className="gs-stat-sub">of {stats.programmesTotal} available</span>
    </div>
    <div className="gs-stat-card">
      <span className="gs-stat-label">Cross-pollination</span>
      <span className="gs-stat-value">{stats.crossPollinationPct}%</span>
      <span className="gs-stat-sub">
        {stats.crossPollinationVsTierAvg >= 0 ? '+' : ''}
        {stats.crossPollinationVsTierAvg}% vs tier avg
      </span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Finder card definitions
// ---------------------------------------------------------------------------

const FINDER_CARDS: FinderCard[] = [
  {
    id: 'create',
    title: 'Create something',
    subtitle: 'Templates, audio, tutorials',
    icon: Pencil,
    path: '/create',
    accentBg: '#E1F5EE',
    accentColor: '#0F6E56',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    subtitle: 'Find and book sessions',
    icon: BookOpen,
    path: '/workshops',
    accentBg: '#EEEDFE',
    accentColor: '#534AB7',
  },
  {
    id: 'raydyo',
    title: 'Rayd-yo',
    subtitle: 'Listen live or get involved',
    icon: Radio,
    path: '/raydyo',
    accentBg: '#FAEEDA',
    accentColor: '#854F0B',
  },
  {
    id: 'community',
    title: 'Community',
    subtitle: 'Sessions, events, roles',
    icon: Users,
    path: '/community',
    accentBg: '#FBEAF0',
    accentColor: '#993556',
  },
  {
    id: 'counting-house',
    title: 'Counting House',
    subtitle: 'Money tools and calculators',
    icon: DollarSign,
    path: '/counting-house',
    accentBg: '#E6F1FB',
    accentColor: '#185FA5',
  },
  {
    id: 'knowledge-commons',
    title: 'Knowledge Commons',
    subtitle: 'Archive, heritage, stories',
    icon: Archive,
    path: '/knowledge-commons',
    accentBg: '#F1EFE8',
    accentColor: '#5F5E5A',
  },
];

// ---------------------------------------------------------------------------
// Mock data fetchers — replace with real API calls
// ---------------------------------------------------------------------------

function useMemberData(userId: number | null) {
  const [resumeItem, setResumeItem] = useState<ResumeItem | null>(null);
  const [mayaContext, setMayaContext] = useState<MayaContext | null>(null);
  const [stats, setStats] = useState<MemberStats | null>(null);
  const [raydyoLive, setRaydyoLive] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // TODO: replace with real API calls to /api/member/{userId}/resume etc.
    setResumeItem({
      label: 'Trubble n Bass — Production Brief',
      sublabel: 'Stage 1 of 4 · Last opened 3 days ago',
      path: '/trubble-n-bass',
    });

    setMayaContext({
      message:
        "You were in Trubble n Bass last week — your production brief is still open. There's also a Counting House session on Thursday you'd qualify for.",
      suggestions: [
        { text: 'Back to Trubble n Bass', path: '/trubble-n-bass' },
        { text: 'Thursday session', path: '/workshops/counting-house-thursday' },
        { text: 'Something else', path: '#finder' },
      ],
    });

    setStats({
      covenantScore: 74,
      covenantTier: 'Connector',
      programmesVisited: 4,
      programmesTotal: 11,
      crossPollinationPct: 31,
      crossPollinationVsTierAvg: 8,
    });

    // TODO: replace with real broadcast schedule check
    const hour = new Date().getHours();
    setRaydyoLive(hour >= 6 && hour < 23);
  }, [userId]);

  return { resumeItem, mayaContext, stats, raydyoLive };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const mayaStore = useMayaStore();

  // displayName is derived from email in AuthContext e.g. "Cj Fontanelle"
  // Fall back to first segment of username, then 'there'
  const firstName = user?.displayName?.split(' ')[0]
    ?? user?.username?.split(/[._-]/)[0]
    ?? 'there';

  if (isLoading) return null; // wait for /me before rendering
  const { resumeItem, mayaContext, stats, raydyoLive } = useMemberData(user?.id ?? null);

  const handleNavigate = (path: string) => {
    if (path === '#finder') {
      document.getElementById('gs-finder')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <PageTemplate
      pageTitle="Get Started"
      pageStrapline="Pick up where you left off and explore what's new"
      pageType="community"
      showMaya={false}
    >
      <div className="gs-page">

        {/* Header */}
        <header className="gs-header">
          <h1>{getGreeting()}, {firstName}</h1>
          <p>{todayLabel()} — here's where things stand</p>
        </header>

        {/* Maya bar */}
        {mayaContext && (
          <MayaBar context={mayaContext} onSuggestion={handleNavigate} />
        )}

        {/* Resume */}
        {resumeItem && (
          <>
            <p className="gs-section-label">Pick up where you left off</p>
            <ResumeCard item={resumeItem} onGo={handleNavigate} />
          </>
        )}

        {/* Finder */}
        <p className="gs-section-label" id="gs-finder">
          What do you want to do today?
        </p>
        <FinderGrid cards={FINDER_CARDS} onNavigate={handleNavigate} />

        {/* Stats */}
        {stats && (
          <>
            <p className="gs-section-label">Your position</p>
            <StatsRow stats={stats} />
          </>
        )}

        {/* Quick links */}
        <p className="gs-section-label">Quick links</p>
        <div className="gs-quick-row">
          {raydyoLive && (
            <button
              className="gs-quick-link gs-quick-link--live"
              onClick={() => navigate('/raydyo')}
            >
              <span className="gs-live-dot" aria-hidden="true" />
              Live on Rayd-yo now
            </button>
          )}
          <button className="gs-quick-link" onClick={() => navigate('/panel')}>
            My Panel
          </button>
          <button className="gs-quick-link" onClick={() => navigate('/workshops')}>
            Upcoming workshops
          </button>
          <button className="gs-quick-link" onClick={() => navigate('/cyberstore')}>
            Cyberstore
          </button>
          <button className="gs-quick-link" onClick={() => navigate('/joystick')}>
            Joystick
          </button>
        </div>

      </div>

      {mayaStore && (
        <DraggableMaya
          membershipTier={
            user?.role === 'ADMIN' ? 'ADMIN'
            : user?.member ? 'MEMBER'
            : 'GUEST'
          }
        />
      )}
    </PageTemplate>
  );
};

export default GetStartedPage;