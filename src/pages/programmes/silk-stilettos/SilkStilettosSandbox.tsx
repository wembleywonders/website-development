// src/pages/programmes/silk-stilettos/SilkStilettosSandbox.tsx
// Creative Pathways Planner - Ecosystem Edition
// "Style. Confidence. Expression." → Connect to what's already here.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Sparkles,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  Heart,
  Star,
  ChevronRight,
  Download,
  Building,
  Users,
  Briefcase,
  MapPin
} from 'lucide-react';
import './SilkStilettosSandbox.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Interest {
  id: string;
  name: string;
  emoji: string;
  category: 'creative' | 'technical' | 'social' | 'business';
}

interface Pathway {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  incomeRange: string;
  timeToEarn: string;
  skills: string[];
  nextSteps: string[];
  programmes: string[];
  pathwayType: 'individual' | 'ecosystem' | 'hybrid';
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

interface Goal {
  id: string;
  text: string;
  timeline: '1-month' | '3-months' | '6-months' | '1-year';
  priority: 'high' | 'medium' | 'low';
}

// ============================================
// DATA
// ============================================

const INTERESTS: Interest[] = [
  { id: 'fashion', name: 'Fashion & Styling', emoji: '👗', category: 'creative' },
  { id: 'makeup', name: 'Makeup & Beauty', emoji: '💄', category: 'creative' },
  { id: 'photography', name: 'Photography', emoji: '📸', category: 'technical' },
  { id: 'social-media', name: 'Social Media', emoji: '📱', category: 'social' },
  { id: 'writing', name: 'Writing & Content', emoji: '✍️', category: 'creative' },
  { id: 'video', name: 'Video & Editing', emoji: '🎬', category: 'technical' },
  { id: 'events', name: 'Events & Hosting', emoji: '🎉', category: 'social' },
  { id: 'teaching', name: 'Teaching & Coaching', emoji: '🎓', category: 'social' },
  { id: 'design', name: 'Graphic Design', emoji: '🎨', category: 'creative' },
  { id: 'business', name: 'Business & Sales', emoji: '💼', category: 'business' },
  { id: 'wellness', name: 'Wellness & Self-Care', emoji: '🧘', category: 'social' },
  { id: 'crafts', name: 'Crafts & Handmade', emoji: '🧵', category: 'creative' },
  { id: 'hair', name: 'Hair & Braiding', emoji: '💇', category: 'creative' },
  { id: 'nails', name: 'Nails & Nail Art', emoji: '💅', category: 'creative' }
];

// Ecosystem opportunities - businesses that need creative skills
const ECOSYSTEM_OPPORTUNITIES: EcosystemOpportunity[] = [
  {
    id: 'bridal-styling',
    sector: 'Bridal & Weddings',
    businessType: 'Bridal shops, wedding planners, photographers',
    whatTheyNeed: 'Styling support for fittings, on-day coordination, accessory expertise',
    howYouHelp: 'Be the styling expert they bring in for consultations and wedding days',
    incomeModel: '£50-150/consultation, £200-400/wedding day',
    entryStrategy: 'Approach 3 bridal shops with a portfolio, offer to assist on one wedding free',
    brentContext: '20+ bridal shops and dozens of wedding photographers in NW London',
    requiredSkills: ['fashion', 'events', 'business']
  },
  {
    id: 'salon-overflow',
    sector: 'Beauty & Hair',
    businessType: 'Established salons, barbershops, beauty studios',
    whatTheyNeed: 'Overflow capacity, specialist services they don\'t offer, holiday cover',
    howYouHelp: 'Become their go-to for busy periods and specialist requests',
    incomeModel: '£30-80/client, steady referrals',
    entryStrategy: 'Visit local salons, offer specialist skills they lack, build relationship',
    brentContext: '100+ salons in Brent, many owner-operators who need backup',
    requiredSkills: ['makeup', 'hair', 'nails']
  },
  {
    id: 'care-dignity',
    sector: 'Care Sector',
    businessType: 'Care homes, domiciliary care, elderly support',
    whatTheyNeed: 'Dignity-focused personal styling, special occasion preparation, confidence support',
    howYouHelp: 'Help residents look and feel their best for family visits, events, daily life',
    incomeModel: '£200-400/month retainer per care home',
    entryStrategy: 'Approach care home managers, explain dignity-focused approach, offer trial session',
    brentContext: '30+ care homes in Brent, mostly overlooked by creatives',
    requiredSkills: ['fashion', 'makeup', 'hair', 'wellness']
  },
  {
    id: 'church-events',
    sector: 'Churches & Community',
    businessType: 'Churches, community centers, cultural organizations',
    whatTheyNeed: 'Event styling, décor, coordination for celebrations, conferences, weddings',
    howYouHelp: 'Be their trusted event styling partner for all occasions',
    incomeModel: '£150-500/event, potential for regular booking',
    entryStrategy: 'Start with your own church/community, build portfolio, expand through network',
    brentContext: '100+ churches in Brent, constant cycle of events and celebrations',
    requiredSkills: ['events', 'design', 'fashion']
  },
  {
    id: 'photographer-support',
    sector: 'Photography Studios',
    businessType: 'Portrait photographers, headshot specialists, family photo studios',
    whatTheyNeed: 'Styling, makeup, and wardrobe coordination for shoots',
    howYouHelp: 'Elevate their work by ensuring clients look their best',
    incomeModel: '£50-100/shoot, ongoing partnerships',
    entryStrategy: 'Reach out to local photographers, offer to collaborate on one shoot',
    brentContext: 'Dozens of photographers in Brent who could upgrade their offering with styling',
    requiredSkills: ['fashion', 'makeup', 'photography']
  },
  {
    id: 'restaurant-content',
    sector: 'Food & Hospitality',
    businessType: 'Restaurants, cafés, caterers',
    whatTheyNeed: 'Social media content, food styling, ambiance photography',
    howYouHelp: 'Create the content that fills their tables',
    incomeModel: '£150-300/month retainer, or per-project',
    entryStrategy: 'Approach restaurants with before/after examples, offer one free session',
    brentContext: '200+ independent restaurants in Brent, most with terrible social media',
    requiredSkills: ['photography', 'social-media', 'design']
  },
  {
    id: 'boutique-visual',
    sector: 'Retail & Boutiques',
    businessType: 'Independent clothing shops, gift shops, market stalls',
    whatTheyNeed: 'Product photography, visual merchandising, social media presence',
    howYouHelp: 'Make their products irresistible online and in-store',
    incomeModel: '£100-250/month retainer, or per-project',
    entryStrategy: 'Walk into boutiques with portfolio, show what good visuals do for sales',
    brentContext: 'Wembley Market alone has 100+ stalls, plus high street independents',
    requiredSkills: ['photography', 'fashion', 'social-media', 'design']
  },
  {
    id: 'performer-support',
    sector: 'Performance & Theatre',
    businessType: 'Theatre companies, dance schools, performers, musicians',
    whatTheyNeed: 'Costume support, makeup for performances, promotional shoots',
    howYouHelp: 'Be the creative support that makes performances shine',
    incomeModel: '£100-300/production, ongoing relationships',
    entryStrategy: 'Connect with local theatre groups, offer to help with one production',
    brentContext: 'Active theatre scene, dance schools, and musicians throughout Brent',
    requiredSkills: ['makeup', 'fashion', 'crafts', 'hair']
  }
];

// Updated pathways with ecosystem integration
const PATHWAYS: Pathway[] = [
  {
    id: 'b2b-creative',
    title: 'B2B Creative Services',
    description: 'Serve local businesses that need creative skills — salons, photographers, event venues, care homes. Stable income, relationship-based.',
    matchScore: 0,
    incomeRange: '£400 - £1,500/month',
    timeToEarn: '1-2 months',
    skills: ['Client management', 'Portfolio building', 'Relationship nurturing', 'Service delivery'],
    nextSteps: ['Identify 5 local businesses that need your skills', 'Create a simple service menu', 'Approach with specific offer', 'Deliver excellently, get referrals'],
    programmes: ['Silk Stilettos', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'stable',
    ecosystemContext: 'Businesses have budgets, ongoing needs, and refer you to other businesses.'
  },
  {
    id: 'bridal-specialist',
    title: 'Bridal & Events Specialist',
    description: 'Work with wedding planners, bridal shops, and event venues. High-value, seasonal, relationship-driven.',
    matchScore: 0,
    incomeRange: '£200 - £800/event',
    timeToEarn: '2-3 months',
    skills: ['Bridal styling', 'Event coordination', 'Vendor relationships', 'Client experience'],
    nextSteps: ['Build bridal portfolio', 'Connect with 3 wedding photographers', 'Approach 2 bridal shops', 'Assist on 2-3 weddings'],
    programmes: ['Silk Stilettos', "Kaywana's Court"],
    pathwayType: 'ecosystem',
    stabilityRating: 'moderate',
    ecosystemContext: 'Bridal industry runs on referrals. One good relationship opens many doors.'
  },
  {
    id: 'care-creative',
    title: 'Care Sector Creative',
    description: 'Bring dignity-focused styling to care homes and elderly clients. Underserved market, meaningful work, steady income.',
    matchScore: 0,
    incomeRange: '£300 - £800/month',
    timeToEarn: '1-2 months',
    skills: ['Gentle approach', 'Dignity focus', 'Patience', 'Relationship building'],
    nextSteps: ['Research care homes in your area', 'Develop dignity-focused service package', 'Approach 3 care home managers', 'Offer trial session'],
    programmes: ['Silk Stilettos', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'stable',
    ecosystemContext: '30+ care homes in Brent, mostly overlooked by creatives. Meaningful gap.'
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    description: 'Create engaging social media content, build an audience, and monetize through brand partnerships.',
    matchScore: 0,
    incomeRange: '£200 - £3,000/month',
    timeToEarn: '3-6 months',
    skills: ['Content planning', 'Video editing', 'Audience engagement', 'Brand negotiation'],
    nextSteps: ['Define your niche', 'Create a content calendar', 'Build presence on 2 platforms', 'Reach out to 5 brands'],
    programmes: ['G-Tech Casters', 'Silk Stilettos'],
    pathwayType: 'individual',
    stabilityRating: 'variable',
    ecosystemContext: 'High potential, but requires consistent content and audience building.'
  },
  {
    id: 'personal-stylist',
    title: 'Personal Stylist',
    description: 'Help individual clients discover their style, build wardrobes, and feel confident.',
    matchScore: 0,
    incomeRange: '£50 - £200/session',
    timeToEarn: '1-3 months',
    skills: ['Style consultation', 'Body type expertise', 'Wardrobe planning', 'Personal branding'],
    nextSteps: ['Create a portfolio', 'Offer 3 free sessions', 'Collect testimonials', 'Set pricing tiers'],
    programmes: ['Silk Stilettos', 'TECHreneurs'],
    pathwayType: 'individual',
    stabilityRating: 'variable',
    ecosystemContext: 'Direct clients require marketing. Consider hybrid: B2B base + individual upside.'
  },
  {
    id: 'hybrid-creative',
    title: 'Hybrid: B2B + Individual',
    description: 'Stable B2B base (salons, photographers, venues) plus individual client work. Best of both worlds.',
    matchScore: 0,
    incomeRange: '£600 - £2,000/month',
    timeToEarn: '2-3 months',
    skills: ['Multi-client management', 'Service diversification', 'Relationship building', 'Time management'],
    nextSteps: ['Secure 2-3 B2B relationships first', 'Use B2B work for portfolio', 'Add individual clients on top', 'Let B2B cover base, individuals add upside'],
    programmes: ['Silk Stilettos', 'TECHreneurs'],
    pathwayType: 'hybrid',
    stabilityRating: 'stable',
    ecosystemContext: 'B2B provides floor, individual work provides ceiling. Sustainable growth.'
  },
  {
    id: 'succession-path',
    title: 'Salon/Studio Succession',
    description: 'Position yourself to eventually inherit or buy into an existing salon, studio, or boutique.',
    matchScore: 0,
    incomeRange: 'Long-term wealth building',
    timeToEarn: '3-5 years',
    skills: ['Business operations', 'Client relationships', 'Industry expertise', 'Financial literacy'],
    nextSteps: ['Work within existing businesses', 'Identify owners approaching retirement', 'Become indispensable', 'Explore partnership/buyout options'],
    programmes: ['Silk Stilettos', 'TECHreneurs'],
    pathwayType: 'ecosystem',
    stabilityRating: 'stable',
    ecosystemContext: 'Many salon owners are 50s-60s with no succession plan. This is a 5-year play.'
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

const SilkStilettosSandbox: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null);
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [pathwayFilter, setPathwayFilter] = useState<'all' | 'ecosystem' | 'individual' | 'hybrid'>('all');

  // Calculate pathway matches
  const calculateMatches = (): Pathway[] => {
    return PATHWAYS.map(pathway => {
      let score = 0;
      
      // Ecosystem pathways get bonus for business/teaching interests
      if (selectedInterests.includes('business') || selectedInterests.includes('teaching')) {
        if (pathway.pathwayType === 'ecosystem' || pathway.pathwayType === 'hybrid') score += 15;
      }

      // B2B Creative matches
      if (pathway.id === 'b2b-creative') {
        if (selectedInterests.includes('makeup')) score += 20;
        if (selectedInterests.includes('hair')) score += 20;
        if (selectedInterests.includes('photography')) score += 20;
        if (selectedInterests.includes('business')) score += 15;
      }

      // Bridal specialist matches
      if (pathway.id === 'bridal-specialist') {
        if (selectedInterests.includes('fashion')) score += 25;
        if (selectedInterests.includes('makeup')) score += 20;
        if (selectedInterests.includes('events')) score += 20;
        if (selectedInterests.includes('hair')) score += 15;
      }

      // Care sector matches
      if (pathway.id === 'care-creative') {
        if (selectedInterests.includes('makeup')) score += 20;
        if (selectedInterests.includes('hair')) score += 20;
        if (selectedInterests.includes('wellness')) score += 20;
        if (selectedInterests.includes('fashion')) score += 15;
      }

      // Content creator matches
      if (pathway.id === 'content-creator') {
        if (selectedInterests.includes('social-media')) score += 30;
        if (selectedInterests.includes('video')) score += 25;
        if (selectedInterests.includes('photography')) score += 15;
      }

      // Personal stylist matches
      if (pathway.id === 'personal-stylist') {
        if (selectedInterests.includes('fashion')) score += 30;
        if (selectedInterests.includes('business')) score += 15;
      }

      // Hybrid creative matches
      if (pathway.id === 'hybrid-creative') {
        score += selectedInterests.length * 3;
        if (selectedInterests.includes('business')) score += 15;
      }

      // Succession path matches
      if (pathway.id === 'succession-path') {
        if (selectedInterests.includes('business')) score += 25;
        if (selectedInterests.includes('hair') || selectedInterests.includes('makeup') || selectedInterests.includes('nails')) score += 15;
      }

      score += selectedInterests.length * 3;
      return { ...pathway, matchScore: Math.min(score, 100) };
    })
    .filter(p => pathwayFilter === 'all' || p.pathwayType === pathwayFilter)
    .sort((a, b) => b.matchScore - a.matchScore);
  };

  // Match ecosystem opportunities to interests
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

  const addGoal = () => {
    setGoals(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      timeline: '3-months',
      priority: 'medium'
    }]);
  };

  const updateGoal = (id: string, field: keyof Goal, value: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedInterests.length >= 2;
      case 2: return true; // Can skip ecosystem exploration
      case 3: return selectedPathway !== null;
      case 4: return goals.length > 0 && goals.every(g => g.text.trim() !== '');
      default: return true;
    }
  };

  const nextStep = () => {
    if (step < 5 && canProceed()) setStep((step + 1) as 1 | 2 | 3 | 4 | 5);
  };

  const prevStep = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4 | 5);
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
      case 'individual': return '👤 Individual';
      case 'hybrid': return '🔄 Hybrid';
      default: return type;
    }
  };

  return (
    <div className="ss-sandbox">
      {/* Header */}
      <header className="ss-sandbox__header">
        <Link to="/programmes/silk-stilettos" className="ss-sandbox__back">
          <ArrowLeft size={20} />
          <span>Back to Programme</span>
        </Link>
        
        <div className="ss-sandbox__title-area">
          <span className="ss-sandbox__emoji">👗</span>
          <div>
            <h1>Creative Pathways Planner</h1>
            <p>Connect your creativity to what's already here</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="ss-sandbox__progress">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`ss-sandbox__progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}
          >
            <span className="ss-sandbox__progress-num">{s}</span>
            <span className="ss-sandbox__progress-label">
              {s === 1 && 'Interests'}
              {s === 2 && 'Ecosystem'}
              {s === 3 && 'Pathways'}
              {s === 4 && 'Goals'}
              {s === 5 && 'Your Plan'}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="ss-sandbox__content">
        
        {/* STEP 1: INTERESTS */}
        {step === 1 && (
          <div className="ss-sandbox__step">
            <div className="ss-sandbox__step-header">
              <Heart size={32} className="ss-sandbox__step-icon" />
              <h2>What lights you up?</h2>
              <p>Select at least 2 interests that excite you.</p>
            </div>

            <div className="ss-sandbox__interests-grid">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  className={`ss-sandbox__interest ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <span className="ss-sandbox__interest-emoji">{interest.emoji}</span>
                  <span className="ss-sandbox__interest-name">{interest.name}</span>
                  {selectedInterests.includes(interest.id) && (
                    <Check size={18} className="ss-sandbox__interest-check" />
                  )}
                </button>
              ))}
            </div>

            <p className="ss-sandbox__selection-count">
              {selectedInterests.length} selected {selectedInterests.length < 2 && '(select at least 2)'}
            </p>
          </div>
        )}

        {/* STEP 2: ECOSYSTEM OPPORTUNITIES */}
        {step === 2 && (
          <div className="ss-sandbox__step">
            <div className="ss-sandbox__step-header">
              <Building size={32} className="ss-sandbox__step-icon" />
              <h2>Who already needs your skills?</h2>
              <p>These local businesses need what you offer. Explore the ecosystem.</p>
            </div>

            <div className="ss-sandbox__ecosystem-intro">
              <p>
                <strong>The insight:</strong> You don't have to find individual clients from scratch. 
                Businesses in Brent already need creative skills — they just don't know you exist yet.
              </p>
            </div>

            {matchedOpportunities.length === 0 ? (
              <div className="ss-sandbox__no-matches">
                <p>Select more interests to see matching ecosystem opportunities.</p>
              </div>
            ) : (
              <div className="ss-sandbox__ecosystem-grid">
                {matchedOpportunities.map((opp) => (
                  <div 
                    key={opp.id}
                    className={`ss-sandbox__ecosystem-card ${selectedOpportunities.includes(opp.id) ? 'selected' : ''}`}
                    onClick={() => toggleOpportunity(opp.id)}
                  >
                    <div className="ss-sandbox__ecosystem-header">
                      <h3>{opp.sector}</h3>
                      {selectedOpportunities.includes(opp.id) && <Check size={20} />}
                    </div>
                    
                    <p className="ss-sandbox__ecosystem-business">{opp.businessType}</p>
                    
                    <div className="ss-sandbox__ecosystem-section">
                      <strong>What they need:</strong>
                      <p>{opp.whatTheyNeed}</p>
                    </div>
                    
                    <div className="ss-sandbox__ecosystem-section">
                      <strong>How you help:</strong>
                      <p>{opp.howYouHelp}</p>
                    </div>
                    
                    <div className="ss-sandbox__ecosystem-income">
                      <DollarSign size={14} />
                      <span>{opp.incomeModel}</span>
                    </div>
                    
                    <div className="ss-sandbox__ecosystem-context">
                      <MapPin size={14} />
                      <span>{opp.brentContext}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="ss-sandbox__ecosystem-note">
              <p>
                <strong>Tip:</strong> Select opportunities that interest you. They'll inform your pathway recommendations.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: PATHWAYS */}
        {step === 3 && (
          <div className="ss-sandbox__step">
            <div className="ss-sandbox__step-header">
              <Target size={32} className="ss-sandbox__step-icon" />
              <h2>Choose your pathway</h2>
              <p>Based on your interests, here are pathways that could work for you.</p>
            </div>

            <div className="ss-sandbox__pathway-filter">
              <button 
                className={pathwayFilter === 'all' ? 'active' : ''}
                onClick={() => setPathwayFilter('all')}
              >
                All
              </button>
              <button 
                className={pathwayFilter === 'ecosystem' ? 'active' : ''}
                onClick={() => setPathwayFilter('ecosystem')}
              >
                🏢 Ecosystem (Stable)
              </button>
              <button 
                className={pathwayFilter === 'individual' ? 'active' : ''}
                onClick={() => setPathwayFilter('individual')}
              >
                👤 Individual
              </button>
              <button 
                className={pathwayFilter === 'hybrid' ? 'active' : ''}
                onClick={() => setPathwayFilter('hybrid')}
              >
                🔄 Hybrid
              </button>
            </div>

            <div className="ss-sandbox__pathways-list">
              {matchedPathways.map((pathway) => (
                <button
                  key={pathway.id}
                  className={`ss-sandbox__pathway ${selectedPathway?.id === pathway.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPathway(pathway)}
                >
                  <div className="ss-sandbox__pathway-header">
                    <div>
                      <h3>{pathway.title}</h3>
                      <span className="ss-sandbox__pathway-type">
                        {getPathwayTypeLabel(pathway.pathwayType)}
                      </span>
                    </div>
                    <span className="ss-sandbox__pathway-score">{pathway.matchScore}% match</span>
                  </div>
                  
                  <p className="ss-sandbox__pathway-desc">{pathway.description}</p>
                  
                  <div className="ss-sandbox__pathway-meta">
                    <span><DollarSign size={14} />{pathway.incomeRange}</span>
                    <span><Calendar size={14} />{pathway.timeToEarn} to first £</span>
                    <span 
                      className="ss-sandbox__pathway-stability"
                      style={{ color: getStabilityColor(pathway.stabilityRating) }}
                    >
                      {pathway.stabilityRating === 'stable' && '● Stable'}
                      {pathway.stabilityRating === 'moderate' && '● Moderate'}
                      {pathway.stabilityRating === 'variable' && '● Variable'}
                    </span>
                  </div>

                  {pathway.ecosystemContext && (
                    <p className="ss-sandbox__pathway-context">{pathway.ecosystemContext}</p>
                  )}

                  <div className="ss-sandbox__pathway-skills">
                    {pathway.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="ss-sandbox__skill-tag">{skill}</span>
                    ))}
                  </div>

                  {selectedPathway?.id === pathway.id && (
                    <Check size={24} className="ss-sandbox__pathway-check" />
                  )}
                </button>
              ))}
            </div>

            <div className="ss-sandbox__pathway-insight">
              <h4>💡 The Ecosystem Advantage</h4>
              <p>
                Ecosystem pathways (serving businesses) typically provide more stable income than 
                individual client work. Businesses have budgets, ongoing needs, and refer you to 
                other businesses. Consider starting with ecosystem, adding individual clients on top.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: GOALS */}
        {step === 4 && selectedPathway && (
          <div className="ss-sandbox__step">
            <div className="ss-sandbox__step-header">
              <TrendingUp size={32} className="ss-sandbox__step-icon" />
              <h2>Set your goals</h2>
              <p>What do you want to achieve on your {selectedPathway.title} journey?</p>
            </div>

            <div className="ss-sandbox__suggested-goals">
              <h3>Suggested first steps:</h3>
              <ul>
                {selectedPathway.nextSteps.map((step, i) => (
                  <li key={i}><ChevronRight size={16} />{step}</li>
                ))}
              </ul>
            </div>

            {selectedOpportunities.length > 0 && (
              <div className="ss-sandbox__ecosystem-goals">
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

            <div className="ss-sandbox__goals-section">
              <h3>Your personal goals:</h3>
              
              {goals.map((goal) => (
                <div key={goal.id} className="ss-sandbox__goal-card">
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => updateGoal(goal.id, 'text', e.target.value)}
                    placeholder="What's your goal?"
                    className="ss-sandbox__goal-input"
                  />
                  
                  <div className="ss-sandbox__goal-options">
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
                    
                    <button onClick={() => removeGoal(goal.id)} className="ss-sandbox__goal-remove">✕</button>
                  </div>
                </div>
              ))}

              <button onClick={addGoal} className="ss-sandbox__add-goal">
                <Sparkles size={18} />Add Goal
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: YOUR PLAN */}
        {step === 5 && selectedPathway && (
          <div className="ss-sandbox__step ss-sandbox__plan">
            <div className="ss-sandbox__step-header">
              <Star size={32} className="ss-sandbox__step-icon" />
              <h2>Your Creative Pathway</h2>
              <p>Here's your personalised plan to start earning.</p>
            </div>

            <div className="ss-sandbox__plan-card">
              <div className="ss-sandbox__plan-pathway">
                <div>
                  <h3>{selectedPathway.title}</h3>
                  <span className="ss-sandbox__plan-type">
                    {getPathwayTypeLabel(selectedPathway.pathwayType)}
                  </span>
                </div>
                <span className="ss-sandbox__plan-match">{selectedPathway.matchScore}% match</span>
              </div>

              <div className="ss-sandbox__plan-stats">
                <div className="ss-sandbox__plan-stat">
                  <DollarSign size={20} />
                  <div>
                    <span className="ss-sandbox__plan-stat-value">{selectedPathway.incomeRange}</span>
                    <span className="ss-sandbox__plan-stat-label">Potential income</span>
                  </div>
                </div>
                <div className="ss-sandbox__plan-stat">
                  <Calendar size={20} />
                  <div>
                    <span className="ss-sandbox__plan-stat-value">{selectedPathway.timeToEarn}</span>
                    <span className="ss-sandbox__plan-stat-label">To first earnings</span>
                  </div>
                </div>
                <div className="ss-sandbox__plan-stat">
                  <TrendingUp size={20} />
                  <div>
                    <span 
                      className="ss-sandbox__plan-stat-value"
                      style={{ color: getStabilityColor(selectedPathway.stabilityRating) }}
                    >
                      {selectedPathway.stabilityRating.charAt(0).toUpperCase() + selectedPathway.stabilityRating.slice(1)}
                    </span>
                    <span className="ss-sandbox__plan-stat-label">Income stability</span>
                  </div>
                </div>
              </div>

              <div className="ss-sandbox__plan-section">
                <h4>Your Interests</h4>
                <div className="ss-sandbox__plan-interests">
                  {selectedInterests.map(id => {
                    const interest = INTERESTS.find(i => i.id === id);
                    return interest ? (
                      <span key={id} className="ss-sandbox__plan-interest">
                        {interest.emoji} {interest.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {selectedOpportunities.length > 0 && (
                <div className="ss-sandbox__plan-section">
                  <h4>Ecosystem Opportunities to Explore</h4>
                  <div className="ss-sandbox__plan-ecosystems">
                    {selectedOpportunities.map(oppId => {
                      const opp = ECOSYSTEM_OPPORTUNITIES.find(o => o.id === oppId);
                      return opp ? (
                        <div key={oppId} className="ss-sandbox__plan-ecosystem-item">
                          <strong>{opp.sector}</strong>
                          <span>{opp.incomeModel}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="ss-sandbox__plan-section">
                <h4>Skills You'll Develop</h4>
                <ul className="ss-sandbox__plan-skills">
                  {selectedPathway.skills.map((skill, i) => (
                    <li key={i}><Check size={14} /> {skill}</li>
                  ))}
                </ul>
              </div>

              <div className="ss-sandbox__plan-section">
                <h4>Your Goals</h4>
                {goals.length > 0 ? (
                  <ul className="ss-sandbox__plan-goals">
                    {goals.map((goal) => (
                      <li key={goal.id}>
                        <span className={`ss-sandbox__plan-priority ss-sandbox__plan-priority--${goal.priority}`}>
                          {goal.priority === 'high' && '🔴'}
                          {goal.priority === 'medium' && '🟡'}
                          {goal.priority === 'low' && '🟢'}
                        </span>
                        <span>{goal.text}</span>
                        <span className="ss-sandbox__plan-timeline">
                          {TIMELINE_OPTIONS.find(t => t.value === goal.timeline)?.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ss-sandbox__plan-empty">No goals set</p>
                )}
              </div>

              <div className="ss-sandbox__plan-section">
                <h4>Recommended Programmes</h4>
                <div className="ss-sandbox__plan-programmes">
                  {selectedPathway.programmes.map((prog, i) => (
                    <Link 
                      key={i} 
                      to={`/programmes/${prog.toLowerCase().replace(/['\s]/g, '-')}`}
                      className="ss-sandbox__plan-programme"
                    >
                      {prog}<ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>

              {selectedPathway.ecosystemContext && (
                <div className="ss-sandbox__plan-ecosystem-note">
                  <Briefcase size={18} />
                  <p>{selectedPathway.ecosystemContext}</p>
                </div>
              )}

              <div className="ss-sandbox__plan-actions">
                <button className="ss-sandbox__btn ss-sandbox__btn--primary" disabled>
                  <Download size={18} />Download Plan (Coming Soon)
                </button>
                <Link to="/programmes/silk-stilettos" className="ss-sandbox__btn ss-sandbox__btn--secondary">
                  <Sparkles size={18} />Join Silk Stilettos
                </Link>
              </div>
            </div>

            {/* Philosophy Note */}
            <div className="ss-sandbox__philosophy">
              <h4>The Ecosystem Approach</h4>
              <p>
                Instead of building everything from scratch, connect to what's already here. 
                Salons, photographers, event venues, care homes — they need your skills. 
                One good B2B relationship can be worth dozens of individual clients.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <footer className="ss-sandbox__footer">
        <button onClick={prevStep} disabled={step === 1} className="ss-sandbox__btn ss-sandbox__btn--nav">
          <ArrowLeft size={18} />Back
        </button>

        <div className="ss-sandbox__step-indicator">Step {step} of 5</div>

        {step < 5 ? (
          <button 
            onClick={nextStep}
            disabled={!canProceed()}
            className="ss-sandbox__btn ss-sandbox__btn--nav ss-sandbox__btn--primary"
          >
            Next<ArrowRight size={18} />
          </button>
        ) : (
          <Link to="/sandbox" className="ss-sandbox__btn ss-sandbox__btn--nav">
            Try Another Sandbox
          </Link>
        )}
      </footer>
    </div>
  );
};

export default SilkStilettosSandbox;