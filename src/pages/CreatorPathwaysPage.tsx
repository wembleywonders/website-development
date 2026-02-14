import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Code, Mic, Palette, Heart, BookOpen, ChevronRight,
  Sparkles, Rocket, Target, CheckCircle, ArrowRight,
  Clock, Star, Brain, Map, PlayCircle, Trophy, Shield,
  Coins, Users, ChevronDown, Filter, X, Zap,
  Calendar, Award, Package, Music, ShoppingBag
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import './CreatorPathwaysPage.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Programme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  forWho: string[];
  notFor: string[];
  duration: string;
  commitment: string;
  price: string;
  outcomes: string[];
  products: string[];
  incomeRange: string;
  icon: React.ReactNode;
  color: string;
  pathway: 'technical' | 'creative' | 'business' | 'performance' | 'foundation';
  level: 'starter' | 'builder' | 'seller';
  ageGroup: 'youth' | 'adult' | 'all';
}

interface PathwayStage {
  id: string;
  name: string;
  description: string;
  programmes: string[];
  color: string;
  icon: React.ReactNode;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: { text: string; tags: string[] }[];
}

interface SuccessStory {
  name: string;
  age: number;
  programme: string;
  earnings: string;
  product: string;
  quote: string;
  timeline: string;
}

// ============================================
// DATA: PROGRAMMES
// ============================================

const programmes: Programme[] = [
  {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    tagline: 'Not sure where you fit? Start here.',
    description: '5-week exploration across all disciplines. Find what excites you before committing.',
    forWho: ['Complete beginners', 'Career changers', 'Curious explorers', 'Young people 13+'],
    notFor: ['Those who already know their path', 'Looking for advanced training'],
    duration: '5 weeks',
    commitment: '4-6 hours/week',
    price: 'Free taster / £30 full',
    outcomes: ['Discover your creative direction', 'First portfolio piece', 'Clear next step'],
    products: ['Discovery portfolio', 'Skills assessment'],
    incomeRange: 'Foundation stage',
    icon: <Sparkles size={24} />,
    color: '#fbbf24',
    pathway: 'foundation',
    level: 'starter',
    ageGroup: 'all'
  },
  {
    id: 'stemgineers',
    name: 'STEMgineers',
    tagline: 'Build things that work',
    description: 'Coding, electronics, robotics. Create tutorials, tools, and technical products people pay for.',
    forWho: ['Problem solvers', 'Tinkerers', 'Logic lovers', 'Tech curious'],
    notFor: ['Seeking quick creative output', 'Uncomfortable with technical detail'],
    duration: '20 weeks',
    commitment: '6-8 hours/week',
    price: '£25/month',
    outcomes: ['Python proficiency', '10 technical projects', 'Sellable digital products'],
    products: ['Coding tutorials (£15-£50)', 'Tool templates (£10-£30)', 'Course modules (£25-£100)'],
    incomeRange: '£100-£400/month',
    icon: <Code size={24} />,
    color: '#10b981',
    pathway: 'technical',
    level: 'builder',
    ageGroup: 'all'
  },
  {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    tagline: 'Women building in tech',
    description: 'Women-only space for digital skills. Templates, planners, design tools. No bro culture.',
    forWho: ['Women wanting tech careers', 'Design-minded creators', 'Those wanting supportive space'],
    notFor: ['Men (sorry!)', 'Those comfortable in mixed tech spaces'],
    duration: '20 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Tech confidence', 'Design portfolio', 'Female mentor network'],
    products: ['Notion templates (£5-£25)', 'Planners (£10-£35)', 'Design assets (£5-£45)'],
    incomeRange: '£150-£450/month',
    icon: <Heart size={24} />,
    color: '#ec4899',
    pathway: 'creative',
    level: 'builder',
    ageGroup: 'all'
  },
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    tagline: 'Make beats that sell',
    description: 'Music production from DAW basics to sellable beat packs. Lo-fi, trap, Caribbean rhythms.',
    forWho: ['Beat makers', 'Sound designers', 'Music lovers', 'Rhythm obsessed'],
    notFor: ['Classical musicians (different path)', 'Those seeking live performance'],
    duration: '16 weeks',
    commitment: '6-8 hours/week',
    price: '£25/month',
    outcomes: ['DAW mastery', 'Production portfolio', 'First beat pack published'],
    products: ['Beat packs (£7-£25)', 'Loop kits (£10-£35)', 'SFX bundles (£5-£20)'],
    incomeRange: '£100-£350/month',
    icon: <Music size={24} />,
    color: '#f59e0b',
    pathway: 'creative',
    level: 'builder',
    ageGroup: 'all'
  },
  {
    id: 'pageturners',
    name: 'Pageturners',
    tagline: 'Words that earn',
    description: 'From blank page to published e-book. Writing, formatting, publishing, marketing.',
    forWho: ['Writers', 'Storytellers', 'Knowledge sharers', 'Content creators'],
    notFor: ['Those seeking traditional publishing', 'Academic writers'],
    duration: '16 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Published e-book', 'Writing workflow', 'Marketing skills'],
    products: ['E-books (£5-£25)', 'Guides (£10-£35)', 'Templates (£5-£15)'],
    incomeRange: '£75-£300/month',
    icon: <BookOpen size={24} />,
    color: '#06b6d4',
    pathway: 'creative',
    level: 'builder',
    ageGroup: 'all'
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    tagline: 'Performance meets product',
    description: 'Drama, spoken word, cultural performance. Turn performances into packaged content.',
    forWho: ['Performers', 'Cultural practitioners', 'Spoken word artists', 'Drama lovers'],
    notFor: ['Those seeking stage careers only', 'Not interested in digital products'],
    duration: '20 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Performance portfolio', 'Digital content products', 'Workshop facilitation skills'],
    products: ['Performance packs (£15-£45)', 'Workshop content (£20-£50)', 'Cultural guides (£10-£35)'],
    incomeRange: '£100-£400/month',
    icon: <Trophy size={24} />,
    color: '#a855f7',
    pathway: 'performance',
    level: 'builder',
    ageGroup: 'all'
  },
  {
    id: 'gtechcasters',
    name: 'G-Tech Casters',
    tagline: 'Stories through sound',
    description: 'Podcasting from concept to monetization. Recording, editing, distribution, sponsorship.',
    forWho: ['Storytellers', 'Interviewers', 'Topic experts', 'Audio enthusiasts'],
    notFor: ['Camera-shy types wanting video', 'Those with nothing to say'],
    duration: '12 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Published podcast', 'Audio editing skills', 'Sponsorship ready'],
    products: ['Podcast episodes', 'Audio assets (£10-£30)', 'Production services (£50-£150)'],
    incomeRange: '£100-£500/month',
    icon: <Mic size={24} />,
    color: '#ef4444',
    pathway: 'creative',
    level: 'builder',
    ageGroup: 'adult'
  },
  {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    tagline: 'Food culture preserved',
    description: 'Caribbean and diaspora food heritage. Recipe development, food photography, cultural storytelling.',
    forWho: ['Food lovers', 'Cultural preservers', 'Recipe hoarders', 'Heritage keepers'],
    notFor: ['Professional chefs (different path)', 'Those without food passion'],
    duration: '16 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Recipe portfolio', 'Food photography skills', 'Published food content'],
    products: ['Recipe packs (£10-£25)', 'Food guides (£15-£35)', 'Cultural content (£10-£30)'],
    incomeRange: '£75-£300/month',
    icon: <Package size={24} />,
    color: '#84cc16',
    pathway: 'creative',
    level: 'builder',
    ageGroup: 'adult'
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    tagline: 'Creativity → Income',
    description: 'The monetization gateway. Everyone passes through. Pricing, packaging, positioning, selling.',
    forWho: ['Anyone with products to sell', 'Creators ready to monetize', 'Business-minded makers'],
    notFor: ['Not ready to sell yet', 'Still exploring'],
    duration: '6 weeks',
    commitment: '4-6 hours/week',
    price: '£25/month',
    outcomes: ['Pricing strategy', 'Sales page live', 'First sale made'],
    products: ['Your existing products, properly priced'],
    incomeRange: 'Unlocks earning',
    icon: <Coins size={24} />,
    color: '#10b981',
    pathway: 'business',
    level: 'seller',
    ageGroup: 'all'
  }
];

// ============================================
// DATA: PATHWAY STAGES
// ============================================

const pathwayStages: PathwayStage[] = [
  {
    id: 'explore',
    name: 'Explore',
    description: 'Find what excites you',
    programmes: ['bright-sparks'],
    color: '#fbbf24',
    icon: <Sparkles size={20} />
  },
  {
    id: 'build',
    name: 'Build',
    description: 'Develop your craft',
    programmes: ['stemgineers', 'silk-stilettos', 'trubble-n-bass', 'pageturners', 'kaywanas-court', 'gtechcasters', 'auntie-anansis-kitchen'],
    color: '#8b5cf6',
    icon: <Target size={20} />
  },
  {
    id: 'sell',
    name: 'Sell',
    description: 'Monetize your work',
    programmes: ['techreneurs'],
    color: '#10b981',
    icon: <Coins size={20} />
  },
  {
    id: 'earn',
    name: 'Earn',
    description: 'Ongoing income',
    programmes: [],
    color: '#ec4899',
    icon: <Trophy size={20} />
  }
];

// ============================================
// DATA: QUIZ QUESTIONS
// ============================================

const quizQuestions: QuizQuestion[] = [
  {
    id: 'interest',
    question: 'What pulls you in?',
    options: [
      { text: 'Building things, solving problems', tags: ['stemgineers', 'technical'] },
      { text: 'Making music, sounds, beats', tags: ['trubble-n-bass', 'gtechcasters', 'audio'] },
      { text: 'Writing, storytelling, words', tags: ['pageturners', 'gtechcasters', 'writing'] },
      { text: 'Design, aesthetics, visual things', tags: ['silk-stilettos', 'creative'] },
      { text: 'Performance, culture, expression', tags: ['kaywanas-court', 'performance'] },
      { text: 'Food, heritage, preservation', tags: ['auntie-anansis-kitchen', 'cultural'] },
      { text: 'Honestly not sure yet', tags: ['bright-sparks', 'explore'] }
    ]
  },
  {
    id: 'experience',
    question: 'Where are you starting from?',
    options: [
      { text: 'Complete beginner', tags: ['bright-sparks', 'starter'] },
      { text: 'Some basics, need structure', tags: ['builder'] },
      { text: 'Have skills, need to monetize', tags: ['techreneurs', 'seller'] },
      { text: 'Already creating, want community', tags: ['builder', 'community'] }
    ]
  },
  {
    id: 'time',
    question: 'How much time can you commit weekly?',
    options: [
      { text: '2-4 hours (light touch)', tags: ['pageturners', 'flexible'] },
      { text: '4-6 hours (steady pace)', tags: ['most-programmes'] },
      { text: '6-8+ hours (serious commitment)', tags: ['stemgineers', 'trubble-n-bass', 'intensive'] }
    ]
  },
  {
    id: 'goal',
    question: 'What does success look like?',
    options: [
      { text: 'Side income (£100-300/month)', tags: ['realistic', 'side-hustle'] },
      { text: 'Significant income (£500+/month)', tags: ['ambitious', 'full-focus'] },
      { text: 'Skills first, income later', tags: ['skill-building', 'foundation'] },
      { text: 'Community and connection', tags: ['community', 'network'] }
    ]
  }
];

// ============================================
// DATA: SUCCESS STORIES
// ============================================

const successStories: SuccessStory[] = [
  {
    name: 'Marcus',
    age: 17,
    programme: 'Bright Sparks → STEMgineers',
    earnings: '£175/month',
    product: 'Robotics starter guides',
    quote: 'Teachers wrote me off. Turns out I just needed to build something real.',
    timeline: '8 months'
  },
  {
    name: 'Priya',
    age: 34,
    programme: 'Silk Stilettos',
    earnings: '£450/month',
    product: 'Notion business templates',
    quote: 'Redundancy letter came. Now I earn more than my old salary.',
    timeline: '6 months'
  },
  {
    name: 'Jerome',
    age: 19,
    programme: 'Trubble n Bass',
    earnings: '£280/month',
    product: 'Lo-fi beat packs',
    quote: 'Everyone said music was a hobby. Producers in LA use my sounds now.',
    timeline: '10 months'
  },
  {
    name: 'Ngozi',
    age: 42,
    programme: "Auntie Anansi's Kitchen",
    earnings: '£220/month',
    product: 'Nigerian recipe collections',
    quote: "My grandmother's recipes are finally preserved AND earning.",
    timeline: '7 months'
  }
];

// ============================================
// MAIN COMPONENT
// ============================================

const CreatorPathwaysPage: React.FC = () => {
  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[][]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [recommendedProgrammes, setRecommendedProgrammes] = useState<string[]>([]);
  
  // Filter state
  const [activeFilters, setActiveFilters] = useState<{
    pathway: string | null;
    level: string | null;
    age: string | null;
  }>({ pathway: null, level: null, age: null });
  const [showFilters, setShowFilters] = useState(false);
  
  // UI state
  const [expandedProgramme, setExpandedProgramme] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  
  // Calculate quiz recommendation
  const handleQuizAnswer = (tags: string[]) => {
    const newAnswers = [...quizAnswers, tags];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate recommendations
      const tagCounts: Record<string, number> = {};
      newAnswers.flat().forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      
      // Score programmes
      const programmeScores = programmes.map(prog => {
        let score = 0;
        if (tagCounts[prog.id]) score += tagCounts[prog.id] * 3;
        if (tagCounts[prog.pathway]) score += tagCounts[prog.pathway] * 2;
        if (tagCounts[prog.level]) score += tagCounts[prog.level];
        if (tagCounts['bright-sparks'] && prog.id === 'bright-sparks') score += 5;
        if (tagCounts['techreneurs'] && prog.id === 'techreneurs') score += 4;
        return { id: prog.id, score };
      });
      
      const sorted = programmeScores
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(p => p.id);
      
      // Ensure at least bright-sparks if nothing matches
      if (sorted.length === 0) sorted.push('bright-sparks');
      
      setRecommendedProgrammes(sorted);
      setQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizComplete(false);
    setRecommendedProgrammes([]);
  };
  
  // Filter programmes
  const filteredProgrammes = useMemo(() => {
    return programmes.filter(prog => {
      if (activeFilters.pathway && prog.pathway !== activeFilters.pathway) return false;
      if (activeFilters.level && prog.level !== activeFilters.level) return false;
      if (activeFilters.age && prog.ageGroup !== activeFilters.age && prog.ageGroup !== 'all') return false;
      return true;
    });
  }, [activeFilters]);
  
  const toggleFilter = (type: 'pathway' | 'level' | 'age', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };
  
  const clearFilters = () => {
    setActiveFilters({ pathway: null, level: null, age: null });
  };
  
  const hasActiveFilters = Object.values(activeFilters).some(v => v !== null);
  
  // Compare functionality
  const toggleCompare = (id: string) => {
    setCompareList(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : prev.length < 3 
          ? [...prev, id]
          : prev
    );
  };
  
  const getProgramme = (id: string) => programmes.find(p => p.id === id);

  return (
    <PageTemplate
      pageTitle="Creator Pathways"
      pageStrapline="Find the programme that fits you. Every journey is different."
      pageType="standard"
    >
      <div className="cp-content">

        {/* ============================================
            HERO WITH EMBEDDED QUIZ
            ============================================ */}
        <section className="cp-hero">
          <div className="cp-hero-content">
            <p className="cp-hero-tagline">9 programmes. Clear outcomes. Your pace.</p>
            
            <h2>Which path is yours?</h2>
            
            <p className="cp-hero-intro">
              Answer 4 questions. Get matched to the right programme. 
              Or browse them all below.
            </p>

            <div className="cp-hero-promise">
              <div className="cp-promise-item">
                <span className="cp-promise-highlight">55%</span>
                <span>of every sale is yours</span>
              </div>
              <div className="cp-promise-item">
                <span className="cp-promise-highlight">£25/mo</span>
                <span>all programmes</span>
              </div>
              <div className="cp-promise-item">
                <span className="cp-promise-highlight">No lock-in</span>
                <span>cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            PATHWAY FINDER QUIZ
            ============================================ */}
        <section className="cp-quiz-section" id="quiz">
          <div className="cp-quiz-container">
            {!quizComplete ? (
              <>
                <div className="cp-quiz-header">
                  <Map size={24} />
                  <h3>Find Your Path</h3>
                  <span className="cp-quiz-step">Question {quizStep + 1} of {quizQuestions.length}</span>
                </div>
                
                <div className="cp-quiz-progress">
                  <div 
                    className="cp-quiz-progress-fill" 
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
                
                <div className="cp-quiz-question">
                  <h4>{quizQuestions[quizStep].question}</h4>
                  
                  <div className="cp-quiz-options">
                    {quizQuestions[quizStep].options.map((option, i) => (
                      <button
                        key={i}
                        className="cp-quiz-option"
                        onClick={() => handleQuizAnswer(option.tags)}
                      >
                        {option.text}
                        <ChevronRight size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="cp-quiz-result">
                <div className="cp-result-header">
                  <div className="cp-result-icon">🎯</div>
                  <h3>Your Recommended Path</h3>
                </div>
                
                <div className="cp-result-programmes">
                  {recommendedProgrammes.map((id, i) => {
                    const prog = getProgramme(id);
                    if (!prog) return null;
                    return (
                      <Link 
                        key={id}
                        to={`/programmes/${id}`}
                        className="cp-result-programme"
                        style={{ '--prog-color': prog.color } as React.CSSProperties}
                      >
                        <div className="cp-result-rank">{i + 1}</div>
                        <div className="cp-result-icon-wrap" style={{ background: prog.color }}>
                          {prog.icon}
                        </div>
                        <div className="cp-result-info">
                          <strong>{prog.name}</strong>
                          <span>{prog.tagline}</span>
                        </div>
                        <div className="cp-result-income">{prog.incomeRange}</div>
                        <ChevronRight size={20} />
                      </Link>
                    );
                  })}
                </div>
                
                <div className="cp-result-journey">
                  <p>Your journey:</p>
                  <div className="cp-journey-flow">
                    {recommendedProgrammes[0] !== 'bright-sparks' && recommendedProgrammes[0] !== 'techreneurs' && (
                      <>
                        <span className="cp-flow-step optional">Bright Sparks</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                    <span className="cp-flow-step main">{getProgramme(recommendedProgrammes[0])?.name}</span>
                    <ArrowRight size={16} />
                    <span className="cp-flow-step required">TECHreneurs</span>
                    <ArrowRight size={16} />
                    <span className="cp-flow-step final">Cyberstore 💰</span>
                  </div>
                </div>
                
                <div className="cp-result-actions">
                  <Link to={`/programmes/${recommendedProgrammes[0]}`} className="cp-btn-primary">
                    Start with {getProgramme(recommendedProgrammes[0])?.name}
                  </Link>
                  <button onClick={resetQuiz} className="cp-btn-secondary">
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================
            HOW WE'RE DIFFERENT
            ============================================ */}
        <section className="cp-different-section">
          <div className="cp-section-header">
            <h2>Not Another Course Platform</h2>
            <p>We're a creator factory, not a content library.</p>
          </div>

          <div className="cp-different-grid">
            <div className="cp-different-card">
              <div className="cp-different-icon">
                <Coins size={24} />
              </div>
              <h3>You Keep 55%</h3>
              <p>Of every sale, forever. CIC structure means we legally can't exploit you.</p>
            </div>
            
            <div className="cp-different-card">
              <div className="cp-different-icon">
                <Package size={24} />
              </div>
              <h3>Products, Not Content</h3>
              <p>You don't consume courses. You create sellable products from week one.</p>
            </div>
            
            <div className="cp-different-card">
              <div className="cp-different-icon">
                <Shield size={24} />
              </div>
              <h3>No Algorithm Games</h3>
              <p>Take a break. Your products keep selling. We never punish you for having a life.</p>
            </div>
            
            <div className="cp-different-card">
              <div className="cp-different-icon">
                <Users size={24} />
              </div>
              <h3>No Fame Required</h3>
              <p>You don't need followers. Products sell on utility, not clout.</p>
            </div>
          </div>

          <div className="cp-positioning-statement">
            <blockquote>
              "The forgotten 60%—the optimists looking for validation, the disheartened running on faith, 
              the dispossessed tired of false promises. These pathways were built for you."
            </blockquote>
          </div>
        </section>

        {/* ============================================
            YOUR JOURNEY VISUALIZATION
            ============================================ */}
        <section className="cp-journey-section">
          <div className="cp-section-header">
            <h2>Your Journey</h2>
            <p>Every creator passes through these stages. Your path determines which door you enter.</p>
          </div>

          <div className="cp-journey-timeline">
            <div className="cp-journey-line" />
            
            {pathwayStages.map((stage, i) => (
              <div key={stage.id} className="cp-journey-stage">
                <div 
                  className="cp-stage-marker" 
                  style={{ background: stage.color }}
                >
                  {stage.icon}
                </div>
                <div className="cp-stage-content">
                  <h3>{stage.name}</h3>
                  <span className="cp-stage-time">
                    {i === 0 && 'Week 1-5'}
                    {i === 1 && 'Week 6-25'}
                    {i === 2 && 'Week 26-32'}
                    {i === 3 && 'Ongoing'}
                  </span>
                  <p>{stage.description}</p>
                  {stage.programmes.length > 0 && (
                    <div className="cp-stage-programmes">
                      {stage.programmes.slice(0, 3).map(id => {
                        const prog = getProgramme(id);
                        return prog ? (
                          <span 
                            key={id} 
                            className="cp-stage-prog"
                            style={{ borderColor: prog.color }}
                          >
                            {prog.name}
                          </span>
                        ) : null;
                      })}
                      {stage.programmes.length > 3 && (
                        <span className="cp-stage-more">+{stage.programmes.length - 3} more</span>
                      )}
                    </div>
                  )}
                  {i === 3 && (
                    <div className="cp-stage-output">
                      <strong>Output:</strong> £100-500+/month
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            PROGRAMMES GRID WITH FILTERS
            ============================================ */}
        <section className="cp-programmes-section">
          <div className="cp-section-header">
            <h2>All Programmes</h2>
            <p>Browse, filter, compare. Find your fit.</p>
          </div>

          {/* Filter Bar */}
          <div className="cp-filter-bar">
            <button 
              className={`cp-filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filter
              {hasActiveFilters && <span className="cp-filter-count">{Object.values(activeFilters).filter(Boolean).length}</span>}
            </button>
            
            {hasActiveFilters && (
              <button className="cp-filter-clear" onClick={clearFilters}>
                <X size={16} />
                Clear filters
              </button>
            )}
            
            {compareList.length > 0 && (
              <button 
                className="cp-compare-btn"
                onClick={() => setShowCompare(true)}
              >
                Compare ({compareList.length})
              </button>
            )}
          </div>
          
          {showFilters && (
            <div className="cp-filters">
              <div className="cp-filter-group">
                <label>Pathway</label>
                <div className="cp-filter-options">
                  {['foundation', 'technical', 'creative', 'performance', 'business'].map(path => (
                    <button
                      key={path}
                      className={`cp-filter-btn ${activeFilters.pathway === path ? 'active' : ''}`}
                      onClick={() => toggleFilter('pathway', path)}
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="cp-filter-group">
                <label>Level</label>
                <div className="cp-filter-options">
                  {[
                    { id: 'starter', label: 'Explore' },
                    { id: 'builder', label: 'Build Skills' },
                    { id: 'seller', label: 'Monetize' }
                  ].map(level => (
                    <button
                      key={level.id}
                      className={`cp-filter-btn ${activeFilters.level === level.id ? 'active' : ''}`}
                      onClick={() => toggleFilter('level', level.id)}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="cp-filter-group">
                <label>Age Group</label>
                <div className="cp-filter-options">
                  {[
                    { id: 'youth', label: 'Youth (13-18)' },
                    { id: 'adult', label: 'Adult (18+)' },
                    { id: 'all', label: 'All Ages' }
                  ].map(age => (
                    <button
                      key={age.id}
                      className={`cp-filter-btn ${activeFilters.age === age.id ? 'active' : ''}`}
                      onClick={() => toggleFilter('age', age.id)}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Programme Cards */}
          <div className="cp-programmes-list">
            {filteredProgrammes.map(prog => (
              <div 
                key={prog.id}
                className={`cp-programme-card ${expandedProgramme === prog.id ? 'expanded' : ''} ${recommendedProgrammes.includes(prog.id) ? 'recommended' : ''}`}
                style={{ '--prog-color': prog.color } as React.CSSProperties}
              >
                {recommendedProgrammes.includes(prog.id) && (
                  <div className="cp-recommended-badge">
                    <Star size={12} /> Recommended for you
                  </div>
                )}
                
                <div 
                  className="cp-programme-header"
                  onClick={() => setExpandedProgramme(expandedProgramme === prog.id ? null : prog.id)}
                >
                  <div className="cp-programme-icon-wrap" style={{ background: prog.color }}>
                    {prog.icon}
                  </div>
                  
                  <div className="cp-programme-info">
                    <h3>{prog.name}</h3>
                    <p className="cp-programme-outcome">{prog.tagline}</p>
                    <div className="cp-programme-meta">
                      <span className="cp-meta-duration">
                        <Clock size={14} /> {prog.duration}
                      </span>
                      <span className="cp-meta-price">
                        {prog.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="cp-programme-income">
                    <Coins size={16} />
                    {prog.incomeRange}
                  </div>
                  
                  <ChevronDown 
                    size={20} 
                    className={`cp-programme-chevron ${expandedProgramme === prog.id ? 'rotated' : ''}`}
                  />
                </div>

                {expandedProgramme === prog.id && (
                  <div className="cp-programme-details">
                    <p className="cp-programme-description">{prog.description}</p>
                    
                    <div className="cp-programme-grid">
                      <div className="cp-detail-block">
                        <h4>This is for you if:</h4>
                        <ul>
                          {prog.forWho.map((item, i) => (
                            <li key={i}><CheckCircle size={14} /> {item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="cp-detail-block">
                        <h4>Not ideal if:</h4>
                        <ul className="not-for">
                          {prog.notFor.map((item, i) => (
                            <li key={i}><X size={14} /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="cp-programme-products">
                      <h4>What you'll create & sell:</h4>
                      <div className="cp-product-tags">
                        {prog.products.map((product, i) => (
                          <span key={i} className="cp-product-tag">{product}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="cp-programme-actions">
                      <Link to={`/programmes/${prog.id}`} className="cp-btn-primary">
                        Learn More
                        <ArrowRight size={16} />
                      </Link>
                      <Link to={`/sandbox/${prog.id}`} className="cp-btn-secondary">
                        <PlayCircle size={16} />
                        Try Sandbox
                      </Link>
                      <button 
                        className={`cp-btn-compare ${compareList.includes(prog.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(prog.id);
                        }}
                      >
                        {compareList.includes(prog.id) ? 'Remove' : 'Compare'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredProgrammes.length === 0 && (
            <div className="cp-no-results">
              <p>No programmes match your filters.</p>
              <button onClick={clearFilters} className="cp-btn-secondary">
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* ============================================
            SUCCESS STORIES
            ============================================ */}
        <section className="cp-stories-section">
          <div className="cp-section-header">
            <h2>People Like You</h2>
            <p>Not influencers. Not lucky breaks. Just people who found their path.</p>
          </div>

          <div className="cp-stories-grid">
            {successStories.map((story, i) => (
              <div key={i} className="cp-story-card">
                <div className="cp-story-header">
                  <div className="cp-story-avatar">{story.name.charAt(0)}</div>
                  <div className="cp-story-meta">
                    <strong>{story.name}, {story.age}</strong>
                    <span className="cp-story-pathway">{story.programme}</span>
                  </div>
                  <div className="cp-story-earnings">
                    <Coins size={16} />
                    {story.earnings}
                  </div>
                </div>
                
                <div className="cp-story-product">
                  <ShoppingBag size={14} />
                  Sells: {story.product}
                </div>
                
                <div className="cp-story-timeline">
                  <Calendar size={14} />
                  Time to first income: {story.timeline}
                </div>
                
                <blockquote>"{story.quote}"</blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section className="cp-cta-section">
          <div className="cp-cta-content">
            <h2>Ready to Find Your Path?</h2>
            <p>
              You've seen the programmes. You've read the stories.<br />
              The only thing left is to start.
            </p>

            <div className="cp-cta-options">
              <div className="cp-cta-option featured">
                <Sparkles size={32} />
                <h3>Not Sure? Start Here</h3>
                <p>Bright Sparks is designed for exactly where you are.</p>
                <Link to="/programmes/bright-sparks" className="cp-cta-btn primary">
                  Begin with Bright Sparks
                </Link>
              </div>

              <div className="cp-cta-option">
                <PlayCircle size={32} />
                <h3>Try Before You Commit</h3>
                <p>Free sandbox. No signup. Just make something.</p>
                <Link to="/sandbox" className="cp-cta-btn secondary">
                  Access Sandbox
                </Link>
              </div>
            </div>

            <div className="cp-cta-quote">
              <blockquote>
                "Stop waiting for permission. Stop thinking you're not ready. 
                Every expert was once exactly where you are. The only difference? They started."
              </blockquote>
              <cite>— David, 56, from redundancy to £400/month in 8 months</cite>
            </div>
          </div>
        </section>

        {/* ============================================
            COMPARE MODAL
            ============================================ */}
        {showCompare && compareList.length > 0 && (
          <div className="cp-modal-overlay" onClick={() => setShowCompare(false)}>
            <div className="cp-modal-content compare" onClick={e => e.stopPropagation()}>
              <button className="cp-modal-close" onClick={() => setShowCompare(false)}>
                <X size={20} />
              </button>
              
              <h3>Compare Programmes</h3>
              
              <div className="cp-compare-grid" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
                {compareList.map(id => {
                  const prog = getProgramme(id);
                  if (!prog) return null;
                  return (
                    <div key={id} className="cp-compare-col">
                      <div className="cp-compare-header" style={{ background: prog.color }}>
                        {prog.icon}
                        <h4>{prog.name}</h4>
                      </div>
                      
                      <div className="cp-compare-row">
                        <label>Duration</label>
                        <span>{prog.duration}</span>
                      </div>
                      
                      <div className="cp-compare-row">
                        <label>Commitment</label>
                        <span>{prog.commitment}</span>
                      </div>
                      
                      <div className="cp-compare-row">
                        <label>Price</label>
                        <span>{prog.price}</span>
                      </div>
                      
                      <div className="cp-compare-row">
                        <label>Income Range</label>
                        <span className="highlight">{prog.incomeRange}</span>
                      </div>
                      
                      <div className="cp-compare-row products">
                        <label>Products</label>
                        <ul>
                          {prog.products.slice(0, 3).map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="cp-compare-action">
                        <Link to={`/programmes/${id}`} className="cp-btn-primary small">
                          Choose {prog.name}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      <DraggableMaya 
        membershipTier="visitor"
        pageType="standard"
        pageContext={{
          title: "Creator Pathways",
          section: "programmes",
          contentType: "pathways"
        }}
      />
    </PageTemplate>
  );
};

export default CreatorPathwaysPage;