import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Code, Mic, Palette, Heart, BookOpen, ChevronRight,
  Sparkles, Rocket, PlayCircle, Trophy,
  Coins, Package, Music, Shield, Zap,
  ShoppingBag, Users, ChevronDown,
  FlaskConical, Hammer, Store,
  ArrowRight, Check, Star, Target, Calculator,
  HelpCircle, Volume2
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import './CreatorFactoryPage.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface FactoryStage {
  id: string;
  name: string;
  subtitle: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: string;
  outputs: string[];
}

interface EntryPoint {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

interface QuizQuestion {
  question: string;
  options: { text: string; paths: string[] }[];
}

interface SuccessStory {
  name: string;
  age: number;
  path: string;
  earnings: string;
  product: string;
  quote: string;
  audioUrl?: string;
}

// ============================================
// DATA
// ============================================

const factoryStages: FactoryStage[] = [
  {
    id: 'sandbox',
    name: 'Sandbox',
    subtitle: 'Play & Explore',
    shortDesc: 'Try things. Break things. Find what excites you.',
    icon: <FlaskConical size={24} />,
    color: '#fbbf24',
    outputs: ['Ideas sketched', 'Tools tried', 'Interests found']
  },
  {
    id: 'testbed',
    name: 'Testbed',
    subtitle: 'Prototype',
    shortDesc: 'Build a rough version. See if it has legs.',
    icon: <Target size={24} />,
    color: '#f97316',
    outputs: ['Working prototype', 'Early feedback']
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    subtitle: 'Price & Package',
    shortDesc: 'Everyone passes here. Learn to price and sell.',
    icon: <Coins size={24} />,
    color: '#10b981',
    outputs: ['Pricing strategy', 'Sales page ready']
  },
  {
    id: 'forge',
    name: 'The Forge',
    subtitle: 'Build Product',
    shortDesc: 'Prototypes become polished, market-ready products.',
    icon: <Hammer size={24} />,
    color: '#8b5cf6',
    outputs: ['Finished product', 'Quality checked']
  },
  {
    id: 'polish',
    name: 'Polish Bays',
    subtitle: 'Refine',
    shortDesc: 'Discipline-specific finishing touches.',
    icon: <Star size={24} />,
    color: '#ec4899',
    outputs: ['Professional presentation', 'Launch-ready']
  },
  {
    id: 'distribute',
    name: 'Distribution',
    subtitle: 'Sell & Earn',
    shortDesc: 'Cyberstore sells. Rayd-yo promotes. You get paid.',
    icon: <Store size={24} />,
    color: '#06b6d4',
    outputs: ['Listed in Cyberstore', 'Earning income']
  }
];

const entryPoints: EntryPoint[] = [
  {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    tagline: 'Not sure yet? Start here.',
    forWho: 'No experience needed',
    icon: <Sparkles size={24} />,
    color: '#fbbf24',
    link: '/programmes/bright-sparks'
  },
  {
    id: 'stemgineers',
    name: 'STEMgineers',
    tagline: 'Build & code things',
    forWho: 'Technical makers',
    icon: <Code size={24} />,
    color: '#10b981',
    link: '/programmes/stemgeneers'
  },
  {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    tagline: 'Design & templates',
    forWho: 'Women in tech',
    icon: <Heart size={24} />,
    color: '#ec4899',
    link: '/programmes/silk-stilettos'
  },
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    tagline: 'Beats & sounds',
    forWho: 'Audio creators',
    icon: <Music size={24} />,
    color: '#f59e0b',
    link: '/programmes/trubble-n-bass'
  },
  {
    id: 'pageturners',
    name: 'Pageturners',
    tagline: 'Words & stories',
    forWho: 'Writers',
    icon: <BookOpen size={24} />,
    color: '#06b6d4',
    link: '/programmes/pageturners'
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    tagline: 'Performance & culture',
    forWho: 'Performers',
    icon: <Trophy size={24} />,
    color: '#a855f7',
    link: '/programmes/kaywanas-court'
  },
  {
    id: 'gtechcasters',
    name: 'G-Tech Casters',
    tagline: 'Podcasts & audio stories',
    forWho: 'Audio storytellers',
    icon: <Mic size={24} />,
    color: '#ef4444',
    link: '/programmes/gtechcasters'
  },
  {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    tagline: 'Food & heritage',
    forWho: 'Culinary creators',
    icon: <Package size={24} />,
    color: '#84cc16',
    link: '/programmes/auntie-anansis-kitchen'
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "When you have free time, you're drawn to...",
    options: [
      { text: "Building or fixing things", paths: ['stemgineers', 'bright-sparks'] },
      { text: "Making music or sounds", paths: ['trubble-n-bass', 'gtechcasters'] },
      { text: "Writing or storytelling", paths: ['pageturners', 'gtechcasters'] },
      { text: "Designing or organizing", paths: ['silk-stilettos', 'stemgineers'] },
      { text: "Cooking or food culture", paths: ['auntie-anansis-kitchen'] },
      { text: "Performing or expressing", paths: ['kaywanas-court'] },
      { text: "Honestly, not sure yet", paths: ['bright-sparks'] }
    ]
  },
  {
    question: "What sounds most like you?",
    options: [
      { text: "I think in systems and logic", paths: ['stemgineers', 'silk-stilettos'] },
      { text: "I feel rhythm and sound deeply", paths: ['trubble-n-bass', 'gtechcasters'] },
      { text: "I see stories everywhere", paths: ['pageturners', 'kaywanas-court'] },
      { text: "I notice design details others miss", paths: ['silk-stilettos'] },
      { text: "I connect through food and tradition", paths: ['auntie-anansis-kitchen', 'kaywanas-court'] },
      { text: "I come alive when performing", paths: ['kaywanas-court', 'gtechcasters'] },
      { text: "I'm still figuring it out", paths: ['bright-sparks'] }
    ]
  },
  {
    question: "What would you most like to sell?",
    options: [
      { text: "Tutorials, guides, or courses", paths: ['stemgineers', 'pageturners'] },
      { text: "Beat packs or sound effects", paths: ['trubble-n-bass'] },
      { text: "Templates, planners, or tools", paths: ['silk-stilettos', 'stemgineers'] },
      { text: "E-books or written content", paths: ['pageturners'] },
      { text: "Recipe packs or food guides", paths: ['auntie-anansis-kitchen'] },
      { text: "Performance content or workshops", paths: ['kaywanas-court'] },
      { text: "Podcast assets or audio content", paths: ['gtechcasters'] },
      { text: "Let me explore first", paths: ['bright-sparks'] }
    ]
  }
];

const successStories: SuccessStory[] = [
  {
    name: 'Marcus',
    age: 17,
    path: 'Bright Sparks → STEMgineers',
    earnings: '£175/month',
    product: 'Robotics starter guides',
    quote: "Teachers wrote me off. Turns out I just needed to build something real."
  },
  {
    name: 'Priya',
    age: 34,
    path: 'Silk Stilettos',
    earnings: '£450/month',
    product: 'Notion business templates',
    quote: "Redundancy letter came. Now I earn more than my old salary."
  }
];

// ============================================
// UTILITY HOOKS
// ============================================

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return progress;
}

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, inView };
}

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const { ref, inView } = useInView();
  
  useEffect(() => {
    if (!inView) return;
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(value * eased));
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [inView, value, duration]);
  
  return <span ref={ref}>{display}</span>;
}

// ============================================
// MAIN COMPONENT
// ============================================

const CreatorFactoryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const fromProgramme = searchParams.get('from');
  
  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[][]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [recommendedPath, setRecommendedPath] = useState<string | null>(null);
  
  // Calculator state
  const [productPrice, setProductPrice] = useState(25);
  const [monthlyUnits, setMonthlyUnits] = useState(20);
  const [productCount, setProductCount] = useState(3);
  
  // UI state
  const [showAllEntryPoints, setShowAllEntryPoints] = useState(false);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  
  const scrollProgress = useScrollProgress();
  
  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate earnings
  const monthlyEarnings = productPrice * 0.55 * monthlyUnits * productCount;
  const yearlyEarnings = monthlyEarnings * 12;
  
  // Quiz logic
  const handleQuizAnswer = (paths: string[]) => {
    const newAnswers = [...quizAnswers, paths];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate recommendation
      const pathCounts: Record<string, number> = {};
      newAnswers.flat().forEach(path => {
        pathCounts[path] = (pathCounts[path] || 0) + 1;
      });
      
      const recommended = Object.entries(pathCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'bright-sparks';
      
      setRecommendedPath(recommended);
      setQuizComplete(true);
    }
  };
  
  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizComplete(false);
    setRecommendedPath(null);
  };
  
  const getRecommendedEntry = () => {
    return entryPoints.find(e => e.id === recommendedPath) || entryPoints[0];
  };

  return (
    <PageTemplate
      pageTitle="The Creator Factory"
      pageStrapline="Where creativity becomes income"
      pageType="standard"
    >
      <div className="factory-page">

        {/* ============================================
            STICKY CTA
            ============================================ */}
        <div className={`factory-sticky-cta ${showStickyCta ? 'visible' : ''}`}>
          <div className="sticky-cta-content">
            <span className="sticky-cta-text">Ready to start?</span>
            <Link to="/sandbox" className="sticky-cta-btn">
              <PlayCircle size={18} />
              Try the Sandbox Free
            </Link>
          </div>
        </div>

        {/* ============================================
            HERO - ACTION ABOVE THE FOLD
            ============================================ */}
        <section className="factory-hero">
          <div className="factory-hero-content">
            <h1>
              <span className="hero-highlight">Creativity</span> becomes{' '}
              <span className="hero-highlight">income</span>
            </h1>
            
            <p className="hero-subtitle">
              No algorithms. No exploitation. Just a clear path from your ideas 
              to money in your pocket.
            </p>
            
            {/* IMMEDIATE CTAs */}
            <div className="hero-actions">
              <Link to="/sandbox" className="hero-btn primary">
                <PlayCircle size={22} />
                Try the Sandbox Free
                <span className="btn-subtext">No signup needed</span>
              </Link>
              <a href="#quiz" className="hero-btn secondary">
                <HelpCircle size={22} />
                Take the Quiz
                <span className="btn-subtext">60 seconds</span>
              </a>
            </div>
            
            {/* ANIMATED STATS */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number"><AnimatedNumber value={55} />%</span>
                <span className="stat-label">Yours. Always.</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number"><AnimatedNumber value={6} /></span>
                <span className="stat-label">Stages to income</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number"><AnimatedNumber value={0} /></span>
                <span className="stat-label">Algorithm games</span>
              </div>
            </div>
            
            {/* SOCIAL PROOF LINE */}
            <p className="hero-proof">
              Our creators average <strong>£300-£500/month</strong>. 
              Median elsewhere? £40/month.
            </p>
          </div>
          
          {/* VISUAL: Mini factory preview */}
          <div className="hero-factory-preview">
            <div className="preview-belt">
              {factoryStages.slice(0, 4).map((stage, i) => (
                <div 
                  key={stage.id} 
                  className="preview-station"
                  style={{ '--station-color': stage.color, '--delay': `${i * 0.1}s` } as React.CSSProperties}
                >
                  {stage.icon}
                </div>
              ))}
              <div className="preview-product">💡</div>
              <div className="preview-product delayed">📦</div>
              <div className="preview-product delayed-more">💰</div>
            </div>
          </div>
        </section>

        {/* ============================================
            INTERACTIVE QUIZ
            ============================================ */}
        <section className="factory-quiz" id="quiz">
          <div className="quiz-container">
            <div className="quiz-header">
              <h2>What Should You Create?</h2>
              <p>Answer 3 questions. Find your path. 60 seconds.</p>
            </div>
            
            {!quizComplete ? (
              <div className="quiz-active">
                {/* Progress dots */}
                <div className="quiz-progress">
                  {quizQuestions.map((_, i) => (
                    <div 
                      key={i}
                      className={`quiz-dot ${i < quizStep ? 'done' : ''} ${i === quizStep ? 'current' : ''}`}
                    />
                  ))}
                </div>
                
                {/* Current question */}
                <div className="quiz-question">
                  <h3>{quizQuestions[quizStep].question}</h3>
                  
                  <div className="quiz-options">
                    {quizQuestions[quizStep].options.map((option, i) => (
                      <button
                        key={i}
                        className="quiz-option"
                        onClick={() => handleQuizAnswer(option.paths)}
                      >
                        {option.text}
                        <ChevronRight size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="quiz-result">
                <div className="result-celebration">🎯</div>
                <h3>Your Path: <span style={{ color: getRecommendedEntry().color }}>{getRecommendedEntry().name}</span></h3>
                <p className="result-tagline">{getRecommendedEntry().tagline}</p>
                
                <div className="result-journey">
                  <span className="journey-start">{getRecommendedEntry().name}</span>
                  <ArrowRight size={16} />
                  <span className="journey-middle">TECHreneurs</span>
                  <ArrowRight size={16} />
                  <span className="journey-end">Cyberstore 💰</span>
                </div>
                
                <div className="result-actions">
                  <Link to={getRecommendedEntry().link} className="result-btn primary">
                    Start with {getRecommendedEntry().name}
                  </Link>
                  <Link to="/sandbox" className="result-btn secondary">
                    Try the Sandbox First
                  </Link>
                  <button onClick={resetQuiz} className="result-retake">
                    Retake quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================
            VISUAL FACTORY PIPELINE
            ============================================ */}
        <section className="factory-pipeline">
          <div className="pipeline-header">
            <h2>The Factory Floor</h2>
            <p>Hover to explore each stage. Everyone passes through TECHreneurs.</p>
          </div>
          
          <div className="pipeline-visual">
            <div className="pipeline-belt">
              {factoryStages.map((stage, index) => (
                <div 
                  key={stage.id}
                  className={`pipeline-stage ${activeStage === stage.id ? 'active' : ''} ${stage.id === 'techreneurs' ? 'mandatory' : ''}`}
                  style={{ '--stage-color': stage.color } as React.CSSProperties}
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  <div className="stage-building">
                    <div className="stage-roof" />
                    <div className="stage-body">
                      <div className="stage-icon">{stage.icon}</div>
                      <div className="stage-number">{index + 1}</div>
                    </div>
                    {stage.id === 'techreneurs' && (
                      <div className="stage-flag">★ Everyone</div>
                    )}
                  </div>
                  
                  <div className="stage-label">
                    <strong>{stage.name}</strong>
                    <span>{stage.subtitle}</span>
                  </div>
                  
                  {/* Hover tooltip */}
                  <div className="stage-tooltip">
                    <p>{stage.shortDesc}</p>
                    <ul>
                      {stage.outputs.map((o, i) => (
                        <li key={i}><Check size={14} /> {o}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Connector */}
                  {index < factoryStages.length - 1 && (
                    <div className="stage-connector">
                      <div className="connector-belt" />
                      <div className="connector-arrow">→</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Animated product */}
            <div className="pipeline-products">
              <div className="moving-product p1">💡</div>
              <div className="moving-product p2">🔧</div>
              <div className="moving-product p3">📦</div>
            </div>
          </div>
          
          <div className="pipeline-note">
            <Zap size={20} />
            <span>
              <strong>The key:</strong> Everyone passes through TECHreneurs. 
              That's where creativity becomes income.
            </span>
          </div>
        </section>

        {/* ============================================
            EARNINGS CALCULATOR
            ============================================ */}
        <section className="factory-calculator">
          <div className="calculator-container">
            <div className="calculator-header">
              <Calculator size={32} />
              <h2>What Could You Earn?</h2>
              <p>Adjust the sliders. See your potential.</p>
            </div>
            
            <div className="calculator-body">
              <div className="calculator-sliders">
                <div className="calc-slider">
                  <label>
                    <span>Average product price</span>
                    <strong>£{productPrice}</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                  />
                  <div className="slider-hints">
                    <span>£5</span>
                    <span>£100</span>
                  </div>
                </div>
                
                <div className="calc-slider">
                  <label>
                    <span>Sales per product/month</span>
                    <strong>{monthlyUnits}</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={monthlyUnits}
                    onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                  />
                  <div className="slider-hints">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="calc-slider">
                  <label>
                    <span>Number of products</span>
                    <strong>{productCount}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={productCount}
                    onChange={(e) => setProductCount(Number(e.target.value))}
                  />
                  <div className="slider-hints">
                    <span>1</span>
                    <span>15</span>
                  </div>
                </div>
              </div>
              
              <div className="calculator-result">
                <div className="result-main">
                  <span className="result-currency">£</span>
                  <span className="result-amount">{Math.round(monthlyEarnings).toLocaleString()}</span>
                  <span className="result-period">/month</span>
                </div>
                <div className="result-yearly">
                  £{Math.round(yearlyEarnings).toLocaleString()}/year
                </div>
                <div className="result-note">
                  55% to you. Products compound. Income grows while you sleep.
                </div>
              </div>
            </div>
            
            <div className="calculator-cta">
              <Link to="/sandbox" className="calc-btn">
                Start Building
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            ENTRY POINTS (Collapsed by default)
            ============================================ */}
        <section className="factory-entries">
          <div className="entries-header">
            <h2>Pick Your Door</h2>
            <p>Already know what you want to create? Jump straight in.</p>
          </div>
          
          <div className="entries-grid">
            {(showAllEntryPoints ? entryPoints : entryPoints.slice(0, 3)).map(entry => (
              <Link
                key={entry.id}
                to={entry.link}
                className={`entry-card ${recommendedPath === entry.id ? 'recommended' : ''}`}
                style={{ '--entry-color': entry.color } as React.CSSProperties}
              >
                {recommendedPath === entry.id && (
                  <div className="entry-badge">Your match</div>
                )}
                <div className="entry-icon">{entry.icon}</div>
                <div className="entry-content">
                  <h3>{entry.name}</h3>
                  <span className="entry-tagline">{entry.tagline}</span>
                  <span className="entry-for">{entry.forWho}</span>
                </div>
                <ChevronRight size={20} className="entry-arrow" />
              </Link>
            ))}
          </div>
          
          {!showAllEntryPoints && (
            <button 
              className="entries-expand"
              onClick={() => setShowAllEntryPoints(true)}
            >
              Show all {entryPoints.length} entry points
              <ChevronDown size={18} />
            </button>
          )}
        </section>

        {/* ============================================
            SOCIAL PROOF (Condensed)
            ============================================ */}
        <section className="factory-stories">
          <div className="stories-header">
            <h2>People Like You</h2>
            <p>Not influencers. Not lucky breaks. Just people who went through the factory.</p>
          </div>
          
          <div className="stories-grid">
            {successStories.map((story, i) => (
              <div key={i} className="story-card">
                <div className="story-header">
                  <div className="story-avatar">{story.name.charAt(0)}</div>
                  <div className="story-meta">
                    <strong>{story.name}, {story.age}</strong>
                    <span>{story.path}</span>
                  </div>
                  <div className="story-earnings">
                    <Coins size={16} />
                    {story.earnings}
                  </div>
                </div>
                <div className="story-product">
                  <ShoppingBag size={14} />
                  {story.product}
                </div>
                <blockquote>"{story.quote}"</blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            WHY IT WORKS (Condensed to icons + one-liners)
            ============================================ */}
        <section className="factory-why">
          <div className="why-grid">
            <div className="why-item">
              <Shield size={24} />
              <span><strong>CIC structure</strong> — we legally can't exploit you</span>
            </div>
            <div className="why-item">
              <Package size={24} />
              <span><strong>Products compound</strong> — make once, sell forever</span>
            </div>
            <div className="why-item">
              <Users size={24} />
              <span><strong>No fame needed</strong> — we handle marketing</span>
            </div>
            <div className="why-item">
              <Heart size={24} />
              <span><strong>No punishment</strong> — take breaks, keep earning</span>
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section className="factory-final-cta">
          <div className="final-cta-content">
            <h2>Ideas go in. Income comes out.</h2>
            <p>You've been let down before. This is different. This is structure.</p>
            
            <div className="final-cta-actions">
              <Link to="/sandbox" className="final-btn primary">
                <PlayCircle size={22} />
                Try the Sandbox Free
              </Link>
              <Link to="/programmes/bright-sparks" className="final-btn secondary">
                <Sparkles size={22} />
                Start at Bright Sparks
              </Link>
            </div>
          </div>
        </section>

      </div>

      <DraggableMaya 
        membershipTier="visitor"
        pageType="standard"
        pageContext={{
          title: "The Creator Factory",
          section: "factory",
          contentType: "pipeline"
        }}
      />
    </PageTemplate>
  );
};

export default CreatorFactoryPage;