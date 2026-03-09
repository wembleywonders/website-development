// src/pages/programmes/gtechcasters/GTechCastersSandbox.tsx
// Media Pathways Planner - Ecosystem Edition
// "Your Voice. Your Platform. Your Community."

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Mic,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  ChevronRight,
  Download,
  Building,
  Briefcase,
  MapPin,
  Radio
} from 'lucide-react';
import './GTechCastersSandbox.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface MediaInterest {
  id: string;
  name: string;
  emoji: string;
  category: 'audio' | 'video' | 'writing' | 'technical';
}

interface MediaPathway {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  incomeRange: string;
  timeToEarn: string;
  skills: string[];
  nextSteps: string[];
  programmes: string[];
  pathwayType: 'internal' | 'ecosystem' | 'hybrid' | 'individual';
  stabilityRating: 'variable' | 'moderate' | 'stable';
  ecosystemContext?: string;
}

interface EcosystemOpportunity {
  id: string;
  sector: string;
  businessType: string;
  whatTheyNeed: string;
  howYouHelp: string;
  incomeModel: string;
  entryStrategy: string;
  brentContext: string;
  requiredSkills: string[];
}

interface InternalOpportunity {
  id: string;
  title: string;
  description: string;
  incomeRange: string;
  frequency: string;
  skills: string[];
  showTypes: string[];
}

interface ContentGoal {
  id: string;
  text: string;
  timeline: '1-month' | '3-months' | '6-months' | '1-year';
  priority: 'high' | 'medium' | 'low';
}

// ============================================
// DATA
// ============================================

const MEDIA_INTERESTS: MediaInterest[] = [
  { id: 'podcasting', name: 'Podcasting', emoji: '🎙️', category: 'audio' },
  { id: 'radio', name: 'Radio & Broadcasting', emoji: '📻', category: 'audio' },
  { id: 'voiceover', name: 'Voice-over & Narration', emoji: '🗣️', category: 'audio' },
  { id: 'music-production', name: 'Music Production', emoji: '🎵', category: 'audio' },
  { id: 'video-creation', name: 'Video Creation', emoji: '🎬', category: 'video' },
  { id: 'livestreaming', name: 'Livestreaming', emoji: '📡', category: 'video' },
  { id: 'video-editing', name: 'Video Editing', emoji: '✂️', category: 'technical' },
  { id: 'photography', name: 'Photography', emoji: '📸', category: 'video' },
  { id: 'writing', name: 'Writing & Scripting', emoji: '✍️', category: 'writing' },
  { id: 'journalism', name: 'Journalism & Reporting', emoji: '📰', category: 'writing' },
  { id: 'interviewing', name: 'Interviewing', emoji: '🎤', category: 'audio' },
  { id: 'sound-engineering', name: 'Sound Engineering', emoji: '🎚️', category: 'technical' },
  { id: 'social-media', name: 'Social Media', emoji: '📱', category: 'video' },
  { id: 'heritage-language', name: 'Heritage Language', emoji: '🌍', category: 'audio' }
];

const ECOSYSTEM_OPPORTUNITIES: EcosystemOpportunity[] = [
  {
    id: 'church-media',
    sector: 'Churches & Faith Communities',
    businessType: 'Churches, mosques, temples, community faith groups',
    whatTheyNeed: 'Livestreaming, podcast production, event recording, social media clips',
    howYouHelp: 'Be their media partner for weekly services and special events',
    incomeModel: '£200-500/month retainer, or £50-150/event',
    entryStrategy: 'Start with your own faith community, build portfolio, approach others',
    brentContext: '100+ places of worship in Brent, most with weak or no media presence',
    requiredSkills: ['livestreaming', 'video-creation', 'sound-engineering']
  },
  {
    id: 'event-coverage',
    sector: 'Events & Conferences',
    businessType: 'Conference organizers, community events, corporate gatherings',
    whatTheyNeed: 'Event filming, highlight reels, speaker recordings, social clips',
    howYouHelp: 'Capture their events professionally, extend reach beyond attendees',
    incomeModel: '£200-800/event depending on scope',
    entryStrategy: 'Offer to cover one community event free, build portfolio, scale up',
    brentContext: 'Constant cycle of community events, conferences, celebrations',
    requiredSkills: ['video-creation', 'video-editing', 'photography', 'livestreaming']
  },
  {
    id: 'podcast-production',
    sector: 'Professional Services',
    businessType: 'Lawyers, accountants, coaches, consultants, therapists',
    whatTheyNeed: 'Podcast production, thought leadership content, interview series',
    howYouHelp: 'Turn their expertise into audio content that attracts clients',
    incomeModel: '£100-300/episode, or £400-800/month for full production',
    entryStrategy: 'Identify professionals who should have a podcast but don\'t, pitch them',
    brentContext: 'Hundreds of professionals in Brent who could use audio marketing',
    requiredSkills: ['podcasting', 'interviewing', 'sound-engineering', 'video-editing']
  },
  {
    id: 'restaurant-content',
    sector: 'Food & Hospitality',
    businessType: 'Restaurants, cafés, caterers, food vendors',
    whatTheyNeed: 'Video content, social media reels, behind-the-scenes, menu showcases',
    howYouHelp: 'Create the content that fills their tables',
    incomeModel: '£150-400/month retainer, or per-project',
    entryStrategy: 'Approach restaurants with before/after examples, offer one free session',
    brentContext: '200+ independent restaurants in Brent, most with poor video content',
    requiredSkills: ['video-creation', 'photography', 'social-media', 'video-editing']
  },
  {
    id: 'school-media',
    sector: 'Schools & Education',
    businessType: 'Schools, colleges, training providers, youth organizations',
    whatTheyNeed: 'Event coverage, promotional videos, student showcases, training content',
    howYouHelp: 'Document their work, create recruitment and celebration content',
    incomeModel: '£300-1,000/project, potential for ongoing relationship',
    entryStrategy: 'Approach local schools with specific project proposals',
    brentContext: '100+ schools in Brent, all needing content for recruitment and celebration',
    requiredSkills: ['video-creation', 'video-editing', 'interviewing', 'photography']
  },
  {
    id: 'oral-history',
    sector: 'Heritage & Archives',
    businessType: 'Museums, cultural organizations, families, community groups',
    whatTheyNeed: 'Oral history recording, archive digitization, documentary production',
    howYouHelp: 'Preserve stories and heritage before they\'re lost',
    incomeModel: '£50-150/interview, larger projects £500-2,000',
    entryStrategy: 'Start with your own family, build portfolio, approach organizations',
    brentContext: 'Windrush generation aging, stories need capturing urgently',
    requiredSkills: ['interviewing', 'podcasting', 'video-creation', 'heritage-language']
  },
  {
    id: 'small-business-media',
    sector: 'Small Businesses',
    businessType: 'Shops, salons, trades, service providers',
    whatTheyNeed: 'Video testimonials, service explainers, social content, Google presence',
    howYouHelp: 'Give them the video presence that builds trust and attracts customers',
    incomeModel: '£100-300/video, or £200-400/month retainer',
    entryStrategy: 'Walk into local businesses with portfolio, show ROI of video',
    brentContext: 'Thousands of small businesses in Brent with no video presence',
    requiredSkills: ['video-creation', 'video-editing', 'interviewing', 'social-media']
  },
  {
    id: 'stadium-events',
    sector: 'Wembley Event Economy',
    businessType: 'Event staffing, fan experiences, local businesses during events',
    whatTheyNeed: 'Event documentation, social coverage, vox pops, atmosphere capture',
    howYouHelp: 'Capture the energy around major events for businesses and organizers',
    incomeModel: '£150-500/event day',
    entryStrategy: 'Build relationship with event-adjacent businesses, offer coverage packages',
    brentContext: '90,000 people at Wembley events = massive content opportunity',
    requiredSkills: ['video-creation', 'photography', 'interviewing', 'livestreaming']
  }
];

const INTERNAL_OPPORTUNITIES: InternalOpportunity[] = [
  {
    id: 'raydyo-show',
    title: 'Rayd-yo Show Host',
    description: 'Host your own show on Wembley Wonders community radio',
    incomeRange: '£75-150/episode',
    frequency: '4 episodes/month = £300-600',
    skills: ['Broadcasting', 'Interviewing', 'Content planning'],
    showTypes: ['Heritage language', 'Music curation', 'Interview series', 'Topic deep-dives']
  },
  {
    id: 'joystick-writer',
    title: 'Joystick Contributor',
    description: 'Write articles for the Wembley Wonders e-zine',
    incomeRange: '£27.50/article',
    frequency: '3 articles/month = £82.50',
    skills: ['Writing', 'Research', 'Storytelling'],
    showTypes: ['Features', 'Reviews', 'Interviews', 'Heritage pieces']
  },
  {
    id: 'podcast-producer',
    title: 'Podcast Producer',
    description: 'Produce podcasts for other Wembley Wonders members',
    incomeRange: '£50-100/episode',
    frequency: 'Variable based on demand',
    skills: ['Audio editing', 'Sound design', 'Project management'],
    showTypes: ['Member podcasts', 'Programme content', 'Special series']
  },
  {
    id: 'video-creator',
    title: 'Video Content Creator',
    description: 'Create video content for programmes and Cyberstore',
    incomeRange: '£75-200/video',
    frequency: 'Variable based on commissions',
    skills: ['Video production', 'Editing', 'Storytelling'],
    showTypes: ['Programme promos', 'Tutorials', 'Event coverage', 'Member showcases']
  }
];

const MEDIA_PATHWAYS: MediaPathway[] = [
  {
    id: 'b2b-media',
    title: 'B2B Media Services',
    description: 'Serve local businesses and organizations that need media production — churches, schools, restaurants, professionals. Stable income, relationship-based.',
    matchScore: 0,
    incomeRange: '£500 - £2,000/month',
    timeToEarn: '1-2 months',
    skills: ['Client management', 'Multi-format production', 'Deadline delivery', 'Relationship building'],
    nextSteps: ['Identify 5 local organizations needing media', 'Create service packages', 'Approach with specific proposals', 'Deliver excellently, get referrals'],
    programmes: ['G-Tech Casters', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'stable',
    ecosystemContext: 'Churches, schools, and businesses have budgets and ongoing needs. One church contract = steady monthly work.'
  },
  {
    id: 'podcast-specialist',
    title: 'Podcast Production Specialist',
    description: 'Produce podcasts for professionals, businesses, and organizations who want audio presence but don\'t have time to do it themselves.',
    matchScore: 0,
    incomeRange: '£400 - £1,500/month',
    timeToEarn: '2-3 months',
    skills: ['Audio production', 'Interviewing', 'Content planning', 'Client management'],
    nextSteps: ['Build demo reel', 'Identify 10 professionals who should podcast', 'Pitch production services', 'Start with 2-3 clients'],
    programmes: ['G-Tech Casters', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'stable',
    ecosystemContext: 'Professionals want podcasts but hate the production work. Solve that problem.'
  },
  {
    id: 'heritage-broadcaster',
    title: 'Heritage Media Creator',
    description: 'Create content that preserves and celebrates Caribbean and diaspora heritage — oral histories, heritage language programming, cultural documentation.',
    matchScore: 0,
    incomeRange: '£300 - £1,000/month',
    timeToEarn: '1-3 months',
    skills: ['Heritage language', 'Interviewing', 'Audio/video production', 'Cultural knowledge'],
    nextSteps: ['Start with family oral histories', 'Pitch heritage show to Rayd-yo', 'Connect with cultural organizations', 'Build archive portfolio'],
    programmes: ['G-Tech Casters', 'Pageturners'],
    pathwayType: 'hybrid',
    stabilityRating: 'moderate',
    ecosystemContext: 'Windrush generation aging — this work is urgent. Cultural organizations and families will pay for preservation.'
  },
  {
    id: 'event-media',
    title: 'Event Media Producer',
    description: 'Cover events for organizations — conferences, celebrations, community gatherings. Capture, edit, deliver content that extends reach.',
    matchScore: 0,
    incomeRange: '£200 - £800/event',
    timeToEarn: '1-2 months',
    skills: ['Event filming', 'Quick turnaround editing', 'Social media optimization', 'Client liaison'],
    nextSteps: ['Cover 3 events for portfolio (even free)', 'Create packages for different event types', 'Approach event organizers', 'Build reputation for reliability'],
    programmes: ['G-Tech Casters', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'moderate',
    ecosystemContext: 'Events happen constantly. Build reputation as reliable, and bookings flow consistently.'
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    description: 'Build your own audience through podcasts, YouTube, social media. Monetize through sponsorships, memberships, and brand deals.',
    matchScore: 0,
    incomeRange: '£0 - £3,000/month',
    timeToEarn: '6-12 months',
    skills: ['Audience building', 'Consistent content', 'Platform algorithms', 'Brand negotiation'],
    nextSteps: ['Define your niche', 'Commit to consistent schedule', 'Build on 2 platforms', 'Engage community genuinely'],
    programmes: ['G-Tech Casters', 'Silk Stilettos'],
    pathwayType: 'individual',
    stabilityRating: 'variable',
    ecosystemContext: 'High ceiling, but requires 6-12 months of consistent work before meaningful income. Consider hybrid approach.'
  },
  {
    id: 'raydyo-host',
    title: 'Rayd-yo Show Host',
    description: 'Host your own show on Wembley Wonders community radio. Build skills, earn per episode, grow audience within supportive structure.',
    matchScore: 0,
    incomeRange: '£300 - £600/month',
    timeToEarn: '1 month',
    skills: ['Broadcasting', 'Content curation', 'Audience engagement', 'Consistency'],
    nextSteps: ['Develop show concept', 'Pitch to Rayd-yo team', 'Record pilot episode', 'Launch and iterate'],
    programmes: ['G-Tech Casters'],
    pathwayType: 'internal',
    stabilityRating: 'moderate',
    ecosystemContext: 'Earn while you learn. Rayd-yo provides structure, audience, and income while you build skills.'
  },
  {
    id: 'hybrid-media',
    title: 'Hybrid: B2B + Personal Brand',
    description: 'Stable B2B base (churches, businesses, events) plus your own content. Best of both worlds — floor and ceiling.',
    matchScore: 0,
    incomeRange: '£800 - £3,000/month',
    timeToEarn: '2-4 months',
    skills: ['Multi-client management', 'Time management', 'Diverse production', 'Personal branding'],
    nextSteps: ['Secure 2-3 B2B relationships first', 'Use B2B work for portfolio/examples', 'Build personal content on top', 'Let B2B cover base, personal adds upside'],
    programmes: ['G-Tech Casters', 'TECHreneurs'],
    pathwayType: 'hybrid',
    stabilityRating: 'stable',
    ecosystemContext: 'B2B provides floor, personal brand provides ceiling. Sustainable growth without gambling.'
  }
];

const TIMELINE_OPTIONS = [
  { value: '1-month', label: '1 Month', emoji: '🏃' },
  { value: '3-months', label: '3 Months', emoji: '📆' },
  { value: '6-months', label: '6 Months', emoji: '🎯' },
  { value: '1-year', label: '1 Year', emoji: '🌟' }
];

// ============================================
// COMPONENT
// ============================================

const GTechCastersSandbox: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [selectedInternals, setSelectedInternals] = useState<string[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<MediaPathway | null>(null);
  const [goals, setGoals] = useState<ContentGoal[]>([]);
  const [pathwayFilter, setPathwayFilter] = useState<'all' | 'ecosystem' | 'internal' | 'individual' | 'hybrid'>('all');

  const calculateMatches = (): MediaPathway[] => {
    return MEDIA_PATHWAYS.map(pathway => {
      let score = 0;
      
      if (pathway.id === 'b2b-media') {
        if (selectedInterests.includes('video-creation')) score += 20;
        if (selectedInterests.includes('livestreaming')) score += 20;
        if (selectedInterests.includes('video-editing')) score += 15;
        if (selectedInterests.includes('photography')) score += 15;
        if (selectedOpportunities.length > 0) score += 15;
      }

      if (pathway.id === 'podcast-specialist') {
        if (selectedInterests.includes('podcasting')) score += 30;
        if (selectedInterests.includes('interviewing')) score += 20;
        if (selectedInterests.includes('sound-engineering')) score += 15;
      }

      if (pathway.id === 'heritage-broadcaster') {
        if (selectedInterests.includes('heritage-language')) score += 30;
        if (selectedInterests.includes('interviewing')) score += 20;
        if (selectedInterests.includes('podcasting')) score += 15;
        if (selectedInterests.includes('radio')) score += 15;
      }

      if (pathway.id === 'event-media') {
        if (selectedInterests.includes('video-creation')) score += 25;
        if (selectedInterests.includes('photography')) score += 20;
        if (selectedInterests.includes('livestreaming')) score += 20;
      }

      if (pathway.id === 'content-creator') {
        if (selectedInterests.includes('video-creation')) score += 20;
        if (selectedInterests.includes('podcasting')) score += 20;
        if (selectedInterests.includes('social-media')) score += 20;
      }

      if (pathway.id === 'raydyo-host') {
        if (selectedInterests.includes('radio')) score += 30;
        if (selectedInterests.includes('podcasting')) score += 20;
        if (selectedInterests.includes('interviewing')) score += 15;
        if (selectedInterests.includes('heritage-language')) score += 15;
        if (selectedInternals.includes('raydyo-show')) score += 15;
      }

      if (pathway.id === 'hybrid-media') {
        score += selectedInterests.length * 3;
        if (selectedOpportunities.length > 0) score += 10;
        if (selectedInternals.length > 0) score += 10;
      }

      score += selectedInterests.length * 2;
      return { ...pathway, matchScore: Math.min(score, 100) };
    })
    .filter(p => pathwayFilter === 'all' || p.pathwayType === pathwayFilter)
    .sort((a, b) => b.matchScore - a.matchScore);
  };

  const matchedOpportunities = ECOSYSTEM_OPPORTUNITIES.filter(opp => 
    opp.requiredSkills.some(skill => selectedInterests.includes(skill))
  );

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleOpportunity = (id: string) => {
    setSelectedOpportunities(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleInternal = (id: string) => {
    setSelectedInternals(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addGoal = () => {
    setGoals(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      timeline: '3-months',
      priority: 'medium'
    }]);
  };

  const updateGoal = (id: string, field: keyof ContentGoal, value: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedInterests.length >= 2;
      case 2: return true;
      case 3: return true;
      case 4: return selectedPathway !== null;
      case 5: return goals.length > 0 && goals.every(g => g.text.trim() !== '');
      default: return true;
    }
  };

  const nextStep = () => {
    if (step < 6 && canProceed()) setStep((step + 1) as 1 | 2 | 3 | 4 | 5 | 6);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4 | 5 | 6);
  };

  const matchedPathways = calculateMatches();

  const getStabilityColor = (rating: string) => {
    switch(rating) {
      case 'stable': return '#10b981';
      case 'moderate': return '#fbbf24';
      case 'variable': return '#f87171';
      default: return '#94a3b8';
    }
  };

  const getPathwayTypeLabel = (type: string) => {
    switch(type) {
      case 'ecosystem': return '🏢 Ecosystem';
      case 'internal': return '🏠 WW Internal';
      case 'individual': return '👤 Individual';
      case 'hybrid': return '🔄 Hybrid';
      default: return type;
    }
  };

  return (
    <div className="gtc-sandbox">
      <header className="gtc-sandbox__header">
        <Link to="/programmes/gtechcasters" className="gtc-sandbox__back">
          <ArrowLeft size={20} />
          <span>Back to Programme</span>
        </Link>
        
        <div className="gtc-sandbox__title-area">
          <span className="gtc-sandbox__emoji">🎙️</span>
          <div>
            <h1>Media Pathways Planner</h1>
            <p>Connect your voice to what's already here</p>
          </div>
        </div>
      </header>

      <div className="gtc-sandbox__progress">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`gtc-sandbox__progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}
          >
            <span className="gtc-sandbox__progress-num">{s}</span>
            <span className="gtc-sandbox__progress-label">
              {s === 1 && 'Interests'}
              {s === 2 && 'Ecosystem'}
              {s === 3 && 'Internal'}
              {s === 4 && 'Pathways'}
              {s === 5 && 'Goals'}
              {s === 6 && 'Your Plan'}
            </span>
          </div>
        ))}
      </div>

      <main className="gtc-sandbox__content">
        
        {/* STEP 1: INTERESTS */}
        {step === 1 && (
          <div className="gtc-sandbox__step">
            <div className="gtc-sandbox__step-header">
              <Mic size={32} className="gtc-sandbox__step-icon" />
              <h2>What draws you to media?</h2>
              <p>Select at least 2 areas that excite you.</p>
            </div>

            <div className="gtc-sandbox__interests-grid">
              {MEDIA_INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  className={`gtc-sandbox__interest ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <span className="gtc-sandbox__interest-emoji">{interest.emoji}</span>
                  <span className="gtc-sandbox__interest-name">{interest.name}</span>
                  {selectedInterests.includes(interest.id) && (
                    <Check size={18} className="gtc-sandbox__interest-check" />
                  )}
                </button>
              ))}
            </div>

            <p className="gtc-sandbox__selection-count">
              {selectedInterests.length} selected {selectedInterests.length < 2 && '(select at least 2)'}
            </p>
          </div>
        )}

        {/* STEP 2: ECOSYSTEM */}
        {step === 2 && (
          <div className="gtc-sandbox__step">
            <div className="gtc-sandbox__step-header">
              <Building size={32} className="gtc-sandbox__step-icon" />
              <h2>Who already needs media help?</h2>
              <p>These local organizations need what you offer.</p>
            </div>

            <div className="gtc-sandbox__ecosystem-intro">
              <p>
                <strong>The insight:</strong> Churches need livestreams. Restaurants need video content. 
                Schools need event coverage. They have budgets — they just don't know you exist yet.
              </p>
            </div>

            {matchedOpportunities.length === 0 ? (
              <div className="gtc-sandbox__no-matches">
                <p>Select more interests to see matching ecosystem opportunities.</p>
              </div>
            ) : (
              <div className="gtc-sandbox__ecosystem-grid">
                {matchedOpportunities.map((opp) => (
                  <div 
                    key={opp.id}
                    className={`gtc-sandbox__ecosystem-card ${selectedOpportunities.includes(opp.id) ? 'selected' : ''}`}
                    onClick={() => toggleOpportunity(opp.id)}
                  >
                    <div className="gtc-sandbox__ecosystem-header">
                      <h3>{opp.sector}</h3>
                      {selectedOpportunities.includes(opp.id) && <Check size={20} />}
                    </div>
                    
                    <p className="gtc-sandbox__ecosystem-business">{opp.businessType}</p>
                    
                    <div className="gtc-sandbox__ecosystem-section">
                      <strong>What they need:</strong>
                      <p>{opp.whatTheyNeed}</p>
                    </div>
                    
                    <div className="gtc-sandbox__ecosystem-section">
                      <strong>How you help:</strong>
                      <p>{opp.howYouHelp}</p>
                    </div>
                    
                    <div className="gtc-sandbox__ecosystem-income">
                      <DollarSign size={14} />
                      <span>{opp.incomeModel}</span>
                    </div>
                    
                    <div className="gtc-sandbox__ecosystem-context">
                      <MapPin size={14} />
                      <span>{opp.brentContext}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="gtc-sandbox__ecosystem-note">
              <p><strong>Tip:</strong> Select opportunities that interest you. Start with your own community.</p>
            </div>
          </div>
        )}

        {/* STEP 3: INTERNAL */}
        {step === 3 && (
          <div className="gtc-sandbox__step">
            <div className="gtc-sandbox__step-header">
              <Radio size={32} className="gtc-sandbox__step-icon" />
              <h2>Wembley Wonders Opportunities</h2>
              <p>Earn while you learn within our platforms.</p>
            </div>

            <div className="gtc-sandbox__internal-intro">
              <p>
                <strong>Start here:</strong> Rayd-yo radio and Joystick e-zine provide structure, 
                audience, and income while you build skills. Lower stakes, supportive environment.
              </p>
            </div>

            <div className="gtc-sandbox__internal-grid">
              {INTERNAL_OPPORTUNITIES.map((opp) => (
                <div 
                  key={opp.id}
                  className={`gtc-sandbox__internal-card ${selectedInternals.includes(opp.id) ? 'selected' : ''}`}
                  onClick={() => toggleInternal(opp.id)}
                >
                  <div className="gtc-sandbox__internal-header">
                    <h3>{opp.title}</h3>
                    {selectedInternals.includes(opp.id) && <Check size={20} />}
                  </div>
                  
                  <p className="gtc-sandbox__internal-desc">{opp.description}</p>
                  
                  <div className="gtc-sandbox__internal-income">
                    <DollarSign size={14} />
                    <span>{opp.incomeRange}</span>
                  </div>
                  
                  <div className="gtc-sandbox__internal-frequency">
                    <Calendar size={14} />
                    <span>{opp.frequency}</span>
                  </div>
                  
                  <div className="gtc-sandbox__internal-types">
                    <strong>Formats:</strong>
                    <div className="gtc-sandbox__type-tags">
                      {opp.showTypes.map((type, i) => (
                        <span key={i} className="gtc-sandbox__type-tag">{type}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gtc-sandbox__internal-note">
              <p><strong>55/25/20:</strong> Your earnings are 55% of revenue. 25% community fund. 20% platform costs.</p>
            </div>
          </div>
        )}

        {/* STEP 4: PATHWAYS */}
        {step === 4 && (
          <div className="gtc-sandbox__step">
            <div className="gtc-sandbox__step-header">
              <Target size={32} className="gtc-sandbox__step-icon" />
              <h2>Choose your pathway</h2>
              <p>Based on your interests, here are pathways that could work for you.</p>
            </div>

            <div className="gtc-sandbox__pathway-filter">
              {['all', 'ecosystem', 'internal', 'individual', 'hybrid'].map(filter => (
                <button 
                  key={filter}
                  className={pathwayFilter === filter ? 'active' : ''}
                  onClick={() => setPathwayFilter(filter as typeof pathwayFilter)}
                >
                  {filter === 'all' && 'All'}
                  {filter === 'ecosystem' && '🏢 Ecosystem'}
                  {filter === 'internal' && '🏠 WW Internal'}
                  {filter === 'individual' && '👤 Individual'}
                  {filter === 'hybrid' && '🔄 Hybrid'}
                </button>
              ))}
            </div>

            <div className="gtc-sandbox__pathways-list">
              {matchedPathways.map((pathway) => (
                <button
                  key={pathway.id}
                  className={`gtc-sandbox__pathway ${selectedPathway?.id === pathway.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPathway(pathway)}
                >
                  <div className="gtc-sandbox__pathway-header">
                    <div>
                      <h3>{pathway.title}</h3>
                      <span className="gtc-sandbox__pathway-type">
                        {getPathwayTypeLabel(pathway.pathwayType)}
                      </span>
                    </div>
                    <span className="gtc-sandbox__pathway-score">{pathway.matchScore}% match</span>
                  </div>
                  
                  <p className="gtc-sandbox__pathway-desc">{pathway.description}</p>
                  
                  <div className="gtc-sandbox__pathway-meta">
                    <span><DollarSign size={14} />{pathway.incomeRange}</span>
                    <span><Calendar size={14} />{pathway.timeToEarn} to first £</span>
                    <span 
                      className="gtc-sandbox__pathway-stability"
                      style={{ color: getStabilityColor(pathway.stabilityRating) }}
                    >
                      ● {pathway.stabilityRating.charAt(0).toUpperCase() + pathway.stabilityRating.slice(1)}
                    </span>
                  </div>

                  {pathway.ecosystemContext && (
                    <p className="gtc-sandbox__pathway-context">{pathway.ecosystemContext}</p>
                  )}

                  <div className="gtc-sandbox__pathway-skills">
                    {pathway.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="gtc-sandbox__skill-tag">{skill}</span>
                    ))}
                  </div>

                  {selectedPathway?.id === pathway.id && (
                    <Check size={24} className="gtc-sandbox__pathway-check" />
                  )}
                </button>
              ))}
            </div>

            <div className="gtc-sandbox__pathway-insight">
              <h4>💡 The Ecosystem Advantage</h4>
              <p>
                One church livestream contract can be worth more than months of trying to build 
                YouTube subscribers. Ecosystem pathways provide stable income while you build skills.
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: GOALS */}
        {step === 5 && selectedPathway && (
          <div className="gtc-sandbox__step">
            <div className="gtc-sandbox__step-header">
              <TrendingUp size={32} className="gtc-sandbox__step-icon" />
              <h2>Set your goals</h2>
              <p>What do you want to achieve on your {selectedPathway.title} journey?</p>
            </div>

            <div className="gtc-sandbox__suggested-goals">
              <h3>Suggested first steps:</h3>
              <ul>
                {selectedPathway.nextSteps.map((s, i) => (
                  <li key={i}><ChevronRight size={16} />{s}</li>
                ))}
              </ul>
            </div>

            {selectedOpportunities.length > 0 && (
              <div className="gtc-sandbox__ecosystem-goals">
                <h3>Based on your ecosystem interests:</h3>
                <ul>
                  {selectedOpportunities.slice(0, 3).map(oppId => {
                    const opp = ECOSYSTEM_OPPORTUNITIES.find(o => o.id === oppId);
                    return opp ? (
                      <li key={oppId}>
                        <ChevronRight size={16} />
                        <strong>{opp.sector}:</strong> {opp.entryStrategy}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}

            {selectedInternals.length > 0 && (
              <div className="gtc-sandbox__internal-goals">
                <h3>Based on your WW interests:</h3>
                <ul>
                  {selectedInternals.map(intId => {
                    const int = INTERNAL_OPPORTUNITIES.find(o => o.id === intId);
                    return int ? (
                      <li key={intId}>
                        <ChevronRight size={16} />
                        <strong>{int.title}:</strong> Develop concept and pitch to team
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}

            <div className="gtc-sandbox__goals-section">
              <h3>Your personal goals:</h3>
              
              {goals.map((goal) => (
                <div key={goal.id} className="gtc-sandbox__goal-card">
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => updateGoal(goal.id, 'text', e.target.value)}
                    placeholder="What's your goal?"
                    className="gtc-sandbox__goal-input"
                  />
                  
                  <div className="gtc-sandbox__goal-options">
                    <select
                      value={goal.timeline}
                      onChange={(e) => updateGoal(goal.id, 'timeline', e.target.value)}
                    >
                      {TIMELINE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
                      ))}
                    </select>
                    
                    <select
                      value={goal.priority}
                      onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                    >
                      <option value="high">🔴 High</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="low">🟢 Low</option>
                    </select>
                    
                    <button onClick={() => removeGoal(goal.id)} className="gtc-sandbox__goal-remove">✕</button>
                  </div>
                </div>
              ))}

              <button onClick={addGoal} className="gtc-sandbox__add-goal">
                <Mic size={18} />Add Goal
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PLAN */}
        {step === 6 && selectedPathway && (
          <div className="gtc-sandbox__step gtc-sandbox__plan">
            <div className="gtc-sandbox__step-header">
              <Star size={32} className="gtc-sandbox__step-icon" />
              <h2>Your Media Pathway</h2>
              <p>Here's your personalised plan to start creating and earning.</p>
            </div>

            <div className="gtc-sandbox__plan-card">
              <div className="gtc-sandbox__plan-pathway">
                <div>
                  <h3>{selectedPathway.title}</h3>
                  <span className="gtc-sandbox__plan-type">
                    {getPathwayTypeLabel(selectedPathway.pathwayType)}
                  </span>
                </div>
                <span className="gtc-sandbox__plan-match">{selectedPathway.matchScore}% match</span>
              </div>

              <div className="gtc-sandbox__plan-stats">
                <div className="gtc-sandbox__plan-stat">
                  <DollarSign size={20} />
                  <div>
                    <span className="gtc-sandbox__plan-stat-value">{selectedPathway.incomeRange}</span>
                    <span className="gtc-sandbox__plan-stat-label">Potential income</span>
                  </div>
                </div>
                <div className="gtc-sandbox__plan-stat">
                  <Calendar size={20} />
                  <div>
                    <span className="gtc-sandbox__plan-stat-value">{selectedPathway.timeToEarn}</span>
                    <span className="gtc-sandbox__plan-stat-label">To first earnings</span>
                  </div>
                </div>
                <div className="gtc-sandbox__plan-stat">
                  <TrendingUp size={20} />
                  <div>
                    <span 
                      className="gtc-sandbox__plan-stat-value"
                      style={{ color: getStabilityColor(selectedPathway.stabilityRating) }}
                    >
                      {selectedPathway.stabilityRating.charAt(0).toUpperCase() + selectedPathway.stabilityRating.slice(1)}
                    </span>
                    <span className="gtc-sandbox__plan-stat-label">Stability</span>
                  </div>
                </div>
              </div>

              <div className="gtc-sandbox__plan-section">
                <h4>Your Interests</h4>
                <div className="gtc-sandbox__plan-interests">
                  {selectedInterests.map(id => {
                    const interest = MEDIA_INTERESTS.find(i => i.id === id);
                    return interest ? (
                      <span key={id} className="gtc-sandbox__plan-interest">
                        {interest.emoji} {interest.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {selectedOpportunities.length > 0 && (
                <div className="gtc-sandbox__plan-section">
                  <h4>Ecosystem Opportunities</h4>
                  <div className="gtc-sandbox__plan-ecosystems">
                    {selectedOpportunities.map(oppId => {
                      const opp = ECOSYSTEM_OPPORTUNITIES.find(o => o.id === oppId);
                      return opp ? (
                        <div key={oppId} className="gtc-sandbox__plan-ecosystem-item">
                          <strong>{opp.sector}</strong>
                          <span>{opp.incomeModel}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {selectedInternals.length > 0 && (
                <div className="gtc-sandbox__plan-section">
                  <h4>WW Internal Opportunities</h4>
                  <div className="gtc-sandbox__plan-internals">
                    {selectedInternals.map(intId => {
                      const int = INTERNAL_OPPORTUNITIES.find(o => o.id === intId);
                      return int ? (
                        <div key={intId} className="gtc-sandbox__plan-internal-item">
                          <strong>{int.title}</strong>
                          <span>{int.incomeRange}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="gtc-sandbox__plan-section">
                <h4>Skills You'll Develop</h4>
                <ul className="gtc-sandbox__plan-skills">
                  {selectedPathway.skills.map((skill, i) => (
                    <li key={i}><Check size={14} /> {skill}</li>
                  ))}
                </ul>
              </div>

              <div className="gtc-sandbox__plan-section">
                <h4>Your Goals</h4>
                {goals.length > 0 ? (
                  <ul className="gtc-sandbox__plan-goals">
                    {goals.map((goal) => (
                      <li key={goal.id}>
                        <span className={`gtc-sandbox__plan-priority gtc-sandbox__plan-priority--${goal.priority}`}>
                          {goal.priority === 'high' && '🔴'}
                          {goal.priority === 'medium' && '🟡'}
                          {goal.priority === 'low' && '🟢'}
                        </span>
                        <span>{goal.text}</span>
                        <span className="gtc-sandbox__plan-timeline">
                          {TIMELINE_OPTIONS.find(t => t.value === goal.timeline)?.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="gtc-sandbox__plan-empty">No goals set</p>
                )}
              </div>

              <div className="gtc-sandbox__plan-section">
                <h4>Recommended Programmes</h4>
                <div className="gtc-sandbox__plan-programmes">
                  {selectedPathway.programmes.map((prog, i) => (
                    <Link 
                      key={i} 
                      to={`/programmes/${prog.toLowerCase().replace(/['\s]/g, '-')}`}
                      className="gtc-sandbox__plan-programme"
                    >
                      {prog}<ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>

              {selectedPathway.ecosystemContext && (
                <div className="gtc-sandbox__plan-ecosystem-note">
                  <Briefcase size={18} />
                  <p>{selectedPathway.ecosystemContext}</p>
                </div>
              )}

              <div className="gtc-sandbox__plan-actions">
                <button className="gtc-sandbox__btn gtc-sandbox__btn--primary" disabled>
                  <Download size={18} />Download Plan (Coming Soon)
                </button>
                <Link to="/programmes/gtechcasters" className="gtc-sandbox__btn gtc-sandbox__btn--secondary">
                  <Mic size={18} />Join G-Tech Casters
                </Link>
              </div>
            </div>

            <div className="gtc-sandbox__philosophy">
              <h4>The Ecosystem Approach</h4>
              <p>
                One church livestream contract can be worth more than months of grinding for YouTube 
                subscribers. Connect to what's already here — churches, schools, businesses. 
                They need media. You create media. The math is simple.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="gtc-sandbox__footer">
        <button onClick={prevStep} disabled={step === 1} className="gtc-sandbox__btn gtc-sandbox__btn--nav">
          <ArrowLeft size={18} />Back
        </button>

        <div className="gtc-sandbox__step-indicator">Step {step} of 6</div>

        {step < 6 ? (
          <button 
            onClick={nextStep}
            disabled={!canProceed()}
            className="gtc-sandbox__btn gtc-sandbox__btn--nav gtc-sandbox__btn--primary"
          >
            Next<ArrowRight size={18} />
          </button>
        ) : (
          <Link to="/sandbox" className="gtc-sandbox__btn gtc-sandbox__btn--nav">
            Try Another Sandbox
          </Link>
        )}
      </footer>
    </div>
  );
};

export default GTechCastersSandbox;