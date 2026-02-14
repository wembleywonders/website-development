import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Zap, Upload, Users, CheckCircle,
  Star, Clock, Target, ChevronRight, Play, BookOpen,
  Music, Code, Palette, Mic, Heart, Package, Trophy,
  Shield, AlertCircle, X, Save, Send, Volume2, Camera,
  FileText, Utensils, ArrowLeft, RotateCcw, Download
} from 'lucide-react';
import PageTemplate from '../../../components/PageTemplate';
import DraggableMaya from '../../../components/maya/DraggableMaya';
import './BrightSparksPage.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Programme {
  id: string;
  name: string;
  icon: React.ReactNode;
  emoji: string;
  color: string;
  tagline: string;
  products: string[];
  childGuide: string;
  childEmoji: string;
}

interface MiniChallenge {
  id: string;
  programme: string;
  title: string;
  description: string;
  timeEstimate: string;
  action: string;
  instructions: string[];
  successCriteria: string;
  starterPrompt?: string;
  childGuide: string;
  childMessage: string;
}

interface ChallengeProgress {
  id: string;
  started: boolean;
  completed: boolean;
  submission?: string;
  completedAt?: string;
}

interface MigrationSubmission {
  platform: string;
  contentType: string;
  productCount: string;
  audienceSize: string;
  whyLeaving: string;
  submittedAt: string;
}

// ============================================
// DATA
// ============================================

const programmes: Programme[] = [
  { 
    id: 'stemgeneers', 
    name: 'STEMgeneers', 
    icon: <Code size={20} />, 
    emoji: '🤖', 
    color: '#10b981', 
    tagline: 'Build things that work', 
    products: ['Coding tutorials', 'Tool templates', 'Tech guides'],
    childGuide: 'Kofi',
    childEmoji: '🔧'
  },
  { 
    id: 'trubble-n-bass', 
    name: 'Trubble n Bass', 
    icon: <Music size={20} />, 
    emoji: '🎵', 
    color: '#f59e0b', 
    tagline: 'Make beats that sell', 
    products: ['Beat packs', 'Loop kits', 'SFX bundles'],
    childGuide: 'Afua',
    childEmoji: '🎙️'
  },
  { 
    id: 'pageturners', 
    name: 'Pageturners', 
    icon: <BookOpen size={20} />, 
    emoji: '📖', 
    color: '#06b6d4', 
    tagline: 'Words that earn', 
    products: ['E-books', 'Guides', 'Templates'],
    childGuide: 'Afua',
    childEmoji: '🎙️'
  },
  { 
    id: 'silk-stilettos', 
    name: 'Silk Stilettos', 
    icon: <Heart size={20} />, 
    emoji: '👗', 
    color: '#ec4899', 
    tagline: 'Women building in tech', 
    products: ['Notion templates', 'Planners', 'Design assets'],
    childGuide: 'Anansewa',
    childEmoji: '🎭'
  },
  { 
    id: 'kaywanas-court', 
    name: "Kaywana's Court", 
    icon: <Star size={20} />, 
    emoji: '🎭', 
    color: '#a855f7', 
    tagline: 'Performance meets product', 
    products: ['Performance packs', 'Workshop content', 'Cultural guides'],
    childGuide: 'Anansewa',
    childEmoji: '🎭'
  },
  { 
    id: 'gtechcasters', 
    name: 'G-Tech Casters', 
    icon: <Mic size={20} />, 
    emoji: '🎙️', 
    color: '#ef4444', 
    tagline: 'Stories through sound', 
    products: ['Podcast episodes', 'Audio assets', 'Production services'],
    childGuide: 'Afua',
    childEmoji: '🎙️'
  },
  { 
    id: 'auntie-anansis-kitchen', 
    name: "Auntie Anansi's Kitchen", 
    icon: <Package size={20} />, 
    emoji: '🍲', 
    color: '#84cc16', 
    tagline: 'Food culture preserved', 
    products: ['Recipe packs', 'Food guides', 'Cultural content'],
    childGuide: 'Esi',
    childEmoji: '📚'
  },
  { 
    id: 'techreneurs', 
    name: 'TECHreneurs', 
    icon: <Trophy size={20} />, 
    emoji: '💰', 
    color: '#10b981', 
    tagline: 'Creativity → Income', 
    products: ['Your products, properly priced'],
    childGuide: 'Kweku',
    childEmoji: '🎯'
  },
];

const miniChallenges: MiniChallenge[] = [
  { 
    id: 'beat', 
    programme: 'trubble-n-bass', 
    title: 'Make a 30-Second Loop', 
    description: 'Use any free DAW to create a simple beat or melody loop', 
    timeEstimate: '15 min', 
    action: 'Create',
    instructions: [
      'Open any music app (GarageBand, BandLab, or even voice memos)',
      'Create a simple 4-bar loop - drums, melody, or both',
      'Export as MP3 or voice memo',
      'Describe what you made below'
    ],
    successCriteria: 'A 30-second audio loop you created yourself',
    starterPrompt: 'Describe your loop: What instruments/sounds did you use? What mood does it create?',
    childGuide: 'Afua',
    childMessage: "Every great producer started with a simple loop. Don't aim for perfection—aim for completion. What does YOUR sound feel like?"
  },
  { 
    id: 'code', 
    programme: 'stemgeneers', 
    title: 'Build a Calculator', 
    description: 'Write a simple calculator in any language you know (or learn)', 
    timeEstimate: '20 min', 
    action: 'Code',
    instructions: [
      'Choose your language (Python, JavaScript, or even Scratch)',
      'Build a calculator that can add, subtract, multiply, divide',
      'Test it with at least 3 calculations',
      'Paste your code or describe what you built'
    ],
    successCriteria: 'Working code that performs basic arithmetic',
    starterPrompt: 'Paste your code here, or describe how you built it:',
    childGuide: 'Kofi',
    childMessage: "Stop explaining. Build it. If it breaks, good—now we know something. A working ugly thing beats a perfect idea every time."
  },
  { 
    id: 'write', 
    programme: 'pageturners', 
    title: 'Write a 200-Word Story', 
    description: 'Complete flash fiction or micro-memoir from your life', 
    timeEstimate: '10 min', 
    action: 'Write',
    instructions: [
      'Pick a moment from your life (first job, family dinner, a mistake you made)',
      'Write exactly 200 words—not 199, not 201',
      'Include one line of dialogue',
      'End on an image, not an explanation'
    ],
    successCriteria: '200 words of original storytelling',
    starterPrompt: 'Write your 200-word story here:',
    childGuide: 'Afua',
    childMessage: "Every story has a spine. Find yours before you tell it. What's the ONE thing you want the reader to feel?"
  },
  { 
    id: 'design', 
    programme: 'silk-stilettos', 
    title: 'Design a Social Graphic', 
    description: 'Create a quote card or announcement graphic', 
    timeEstimate: '15 min', 
    action: 'Design',
    instructions: [
      'Use Canva (free) or any design tool',
      'Create an Instagram-sized quote card (1080x1080)',
      'Use a quote that means something to you',
      'Pay attention to font pairing and whitespace'
    ],
    successCriteria: 'A shareable social media graphic',
    starterPrompt: 'Describe your design: What quote did you use? What colors and fonts did you choose? Why?',
    childGuide: 'Anansewa',
    childMessage: "Design is performance for the eyes. What do you want people to FEEL before they read a single word?"
  },
  { 
    id: 'record', 
    programme: 'gtechcasters', 
    title: 'Record a 60-Second Take', 
    description: 'Voice memo introducing yourself and one thing you know', 
    timeEstimate: '5 min', 
    action: 'Record',
    instructions: [
      'Find a quiet space',
      'Record a 60-second voice memo',
      'Introduce yourself (first name only is fine)',
      'Share ONE thing you know well—a skill, a fact, an opinion'
    ],
    successCriteria: '60 seconds of you speaking with intention',
    starterPrompt: 'What did you talk about? How did it feel to hear your own voice?',
    childGuide: 'Afua',
    childMessage: "Your voice is hiding. Breathe. From your belly. Again. Now speak. The world needs to hear what only YOU can say."
  },
  { 
    id: 'recipe', 
    programme: 'auntie-anansis-kitchen', 
    title: 'Document a Family Recipe', 
    description: 'Write down a recipe from memory with story context', 
    timeEstimate: '15 min', 
    action: 'Document',
    instructions: [
      'Pick a dish someone in your family makes (or made)',
      'Write down the recipe from memory—don\'t look it up',
      'Include the story: Who taught you? When do you eat it?',
      'Note what you\'re unsure about—"a pinch" is fine'
    ],
    successCriteria: 'A recipe + story that captures a family food tradition',
    starterPrompt: 'Write your recipe and its story here:',
    childGuide: 'Esi',
    childMessage: "A recipe without a story is just instructions. Who taught you this? Their name goes in the record. We keep it alive by passing it on."
  },
];

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const STORAGE_KEY = 'brightSparks_progress';
const MIGRATION_KEY = 'brightSparks_migration';

const loadProgress = (): Record<string, ChallengeProgress> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveProgress = (progress: Record<string, ChallengeProgress>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const loadMigration = (): MigrationSubmission | null => {
  try {
    const saved = localStorage.getItem(MIGRATION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const saveMigration = (data: MigrationSubmission) => {
  localStorage.setItem(MIGRATION_KEY, JSON.stringify(data));
};

// ============================================
// CHALLENGE SANDBOX COMPONENT
// ============================================

interface ChallengeSandboxProps {
  challenge: MiniChallenge;
  programme: Programme;
  progress: ChallengeProgress | undefined;
  onClose: () => void;
  onComplete: (submission: string) => void;
  onSaveDraft: (submission: string) => void;
}

const ChallengeSandbox: React.FC<ChallengeSandboxProps> = ({
  challenge,
  programme,
  progress,
  onClose,
  onComplete,
  onSaveDraft
}) => {
  const [submission, setSubmission] = useState(progress?.submission || '');
  const [showSuccess, setShowSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const wordCount = submission.trim().split(/\s+/).filter(Boolean).length;
  const isWritingChallenge = challenge.id === 'write';
  const meetsWordCount = !isWritingChallenge || (wordCount >= 180 && wordCount <= 220);

  const handleComplete = () => {
    if (submission.trim().length < 20) {
      alert('Please write a bit more before submitting!');
      return;
    }
    if (isWritingChallenge && !meetsWordCount) {
      alert('Your story should be between 180-220 words. Currently: ' + wordCount);
      return;
    }
    onComplete(submission);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="sandbox-overlay" onClick={onClose}>
        <div className="sandbox-modal success" onClick={e => e.stopPropagation()}>
          <div className="sandbox-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Challenge Complete! 🎉</h2>
            <p>You just created something real. That's more than most people do.</p>
            
            <div className="success-guide">
              <span className="guide-emoji">{programme.childEmoji}</span>
              <div className="guide-message">
                <strong>{challenge.childGuide} says:</strong>
                <p>"Well done. You didn't just think about it—you did it. That's the difference between dreamers and creators."</p>
              </div>
            </div>

            <div className="success-actions">
              <button className="sandbox-btn primary" onClick={onClose}>
                Continue Journey
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sandbox-overlay" onClick={onClose}>
      <div 
        className="sandbox-modal" 
        onClick={e => e.stopPropagation()}
        style={{ '--sandbox-color': programme.color } as React.CSSProperties}
      >
        <div className="sandbox-header">
          <button className="sandbox-back" onClick={onClose}>
            <ArrowLeft size={20} />
            <span>Back to Challenges</span>
          </button>
          <div className="sandbox-timer">
            <Clock size={16} />
            <span>{challenge.timeEstimate}</span>
          </div>
        </div>

        <div className="sandbox-content">
          <div className="sandbox-intro">
            <span className="sandbox-emoji">{programme.emoji}</span>
            <div>
              <h2>{challenge.title}</h2>
              <p className="sandbox-programme">{programme.name}</p>
            </div>
          </div>

          <div className="sandbox-guide">
            <span className="guide-emoji">{programme.childEmoji}</span>
            <div className="guide-content">
              <strong>{challenge.childGuide} says:</strong>
              <p>"{challenge.childMessage}"</p>
            </div>
          </div>

          <div className="sandbox-instructions">
            <h3>Your Task</h3>
            <ol>
              {challenge.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
            <div className="sandbox-success-criteria">
              <Target size={16} />
              <span><strong>Success:</strong> {challenge.successCriteria}</span>
            </div>
          </div>

          <div className="sandbox-workspace">
            <label>{challenge.starterPrompt}</label>
            <textarea
              ref={textareaRef}
              value={submission}
              onChange={e => setSubmission(e.target.value)}
              placeholder="Start typing here..."
              rows={10}
            />
            {isWritingChallenge && (
              <div className={`word-counter ${meetsWordCount ? 'valid' : wordCount > 0 ? 'invalid' : ''}`}>
                {wordCount}/200 words
                {wordCount > 0 && !meetsWordCount && (
                  <span className="counter-hint">
                    {wordCount < 180 ? ` (need ${180 - wordCount} more)` : ` (${wordCount - 220} too many)`}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="sandbox-actions">
            <button 
              className="sandbox-btn secondary"
              onClick={() => onSaveDraft(submission)}
            >
              <Save size={18} />
              Save Draft
            </button>
            <button 
              className="sandbox-btn primary"
              onClick={handleComplete}
              disabled={submission.trim().length < 20}
            >
              <CheckCircle size={18} />
              Complete Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const BrightSparksPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<'new' | 'migrating' | null>(null);
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [showMigrationSuccess, setShowMigrationSuccess] = useState(false);
  const [activeSandbox, setActiveSandbox] = useState<MiniChallenge | null>(null);
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>(loadProgress);
  const [migrationData, setMigrationData] = useState({
    platform: '',
    contentType: '',
    productCount: '',
    audienceSize: '',
    whyLeaving: ''
  });

  // Refs for scrolling
  const discoveryRef = useRef<HTMLElement>(null);
  const migratingRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);

  // Check for existing migration
  const existingMigration = loadMigration();

  // Count completed challenges
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  // Handle track selection with scroll
  const handleTrackSelect = (track: 'new' | 'migrating') => {
    setSelectedTrack(track);
    
    // Scroll after state update
    setTimeout(() => {
      if (track === 'new' && discoveryRef.current) {
        discoveryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (track === 'migrating' && migratingRef.current) {
        migratingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Handle challenge click
  const handleChallengeClick = (challenge: MiniChallenge) => {
    // Mark as started
    const newProgress = {
      ...progress,
      [challenge.id]: {
        ...progress[challenge.id],
        id: challenge.id,
        started: true,
        completed: progress[challenge.id]?.completed || false
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
    
    // Open sandbox
    setActiveSandbox(challenge);
  };

  // Handle challenge completion
  const handleChallengeComplete = (challengeId: string, submission: string) => {
    const newProgress = {
      ...progress,
      [challengeId]: {
        id: challengeId,
        started: true,
        completed: true,
        submission,
        completedAt: new Date().toISOString()
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Handle save draft
  const handleSaveDraft = (challengeId: string, submission: string) => {
    const newProgress = {
      ...progress,
      [challengeId]: {
        ...progress[challengeId],
        id: challengeId,
        started: true,
        completed: false,
        submission
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Handle migration submission
  const handleMigrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!migrationData.platform || !migrationData.contentType || !migrationData.whyLeaving) {
      alert('Please fill in all required fields');
      return;
    }

    const submission: MigrationSubmission = {
      ...migrationData,
      submittedAt: new Date().toISOString()
    };
    
    saveMigration(submission);
    setShowMigrationModal(false);
    setShowMigrationSuccess(true);
  };

  // Reset progress (for testing)
  const handleResetProgress = () => {
    if (confirm('Reset all challenge progress? This cannot be undone.')) {
      setProgress({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Navigate to full discovery journey
  const handleStartDiscovery = () => {
    if (completedCount >= 3) {
      navigate('/programmes/bright-sparks/results', { 
        state: { progress, completedChallenges: Object.keys(progress).filter(k => progress[k].completed) }
      });
    } else {
      // Scroll to challenges
      challengesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageTemplate
      pageTitle="Bright Sparks"
      pageStrapline="Not sure where you fit? Start here."
      pageType="standard"
    >
      <div className="bs-content">

        {/* ============================================
            HERO WITH TRACK SELECTION
            ============================================ */}
        <section className="bs-hero">
          <div className="bs-hero-visual">
            <div className="bs-spark-icon">
              <Sparkles size={64} />
            </div>
            <div className="bs-spark-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>

          <h1>Find Your Spark</h1>
          <p className="bs-hero-intro">
            Whether you're completely new to creating or bringing years of work from other platforms,
            this is where every Wembley Wonders journey begins.
          </p>

          <div className="bs-track-selector">
            <button
              className={`bs-track-btn ${selectedTrack === 'new' ? 'active' : ''}`}
              onClick={() => handleTrackSelect('new')}
            >
              <div className="track-icon">
                <Zap size={32} />
              </div>
              <div className="track-content">
                <h3>I'm New to Creating</h3>
                <p>Explore all 8 programmes, discover what fits, build your first project</p>
              </div>
              <ChevronRight size={20} className="track-arrow" />
            </button>

            <button
              className={`bs-track-btn ${selectedTrack === 'migrating' ? 'active' : ''}`}
              onClick={() => handleTrackSelect('migrating')}
            >
              <div className="track-icon migrating">
                <Upload size={32} />
              </div>
              <div className="track-content">
                <h3>I'm Bringing Existing Work</h3>
                <p>Migrate your content, keep 55% forever, escape the algorithm</p>
              </div>
              <ChevronRight size={20} className="track-arrow" />
            </button>
          </div>
        </section>

        {/* ============================================
            NEW CREATOR TRACK
            ============================================ */}
        {selectedTrack === 'new' && (
          <section className="bs-new-track" ref={discoveryRef}>
            <div className="bs-section-header">
              <h2>Your Discovery Journey</h2>
              <p>Try mini-challenges from different programmes. See what clicks.</p>
            </div>

            {/* Progress Indicator */}
            {completedCount > 0 && (
              <div className="bs-progress-bar">
                <div className="progress-header">
                  <span>Your Progress</span>
                  <button className="reset-btn" onClick={handleResetProgress}>
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((completedCount / 3) * 100, 100)}%` }}
                  />
                </div>
                <div className="progress-label">
                  {completedCount}/3 challenges completed
                  {completedCount >= 3 && <span className="progress-ready"> — Ready for results!</span>}
                </div>
              </div>
            )}

            {/* The Promise */}
            <div className="bs-promise-box">
              <div className="promise-icon">🎯</div>
              <div className="promise-content">
                <h3>What You'll Walk Away With</h3>
                <ul>
                  <li><CheckCircle size={16} /> Clarity on which programme fits you</li>
                  <li><CheckCircle size={16} /> Your first portfolio pieces (created here)</li>
                  <li><CheckCircle size={16} /> A clear next step (not a sales pitch)</li>
                </ul>
              </div>
              <div className="promise-time">
                <Clock size={16} />
                <span>45 minutes</span>
              </div>
            </div>

            {/* Programme Overview */}
            <div className="bs-programmes-preview">
              <h3>8 Programmes to Explore</h3>
              <div className="programmes-grid">
                {programmes.slice(0, 7).map(prog => (
                  <Link
                    key={prog.id}
                    to={`/programmes/${prog.id}`}
                    className="programme-chip"
                    style={{ '--prog-color': prog.color } as React.CSSProperties}
                  >
                    <span className="prog-emoji">{prog.emoji}</span>
                    <span className="prog-name">{prog.name}</span>
                  </Link>
                ))}
              </div>
              <p className="programmes-note">
                Plus <Link to="/programmes/techreneurs" className="techreneurs-link"><strong>TECHreneurs</strong></Link> — your monetization gateway that ensures you get paid for your creations
              </p>
            </div>

            {/* Mini Challenges */}
            <div className="bs-challenges" ref={challengesRef}>
              <h3>Try 3 Mini-Challenges</h3>
              <p className="challenges-intro">
                Pick any 3. Complete them right here. No signup required.
                <br />
                <strong>Click a challenge to open its sandbox.</strong>
              </p>

              <div className="challenges-grid">
                {miniChallenges.map(challenge => {
                  const prog = programmes.find(p => p.id === challenge.programme);
                  const challengeProgress = progress[challenge.id];
                  const isCompleted = challengeProgress?.completed;
                  const isStarted = challengeProgress?.started && !isCompleted;
                  
                  return (
                    <div
                      key={challenge.id}
                      className={`challenge-card ${isCompleted ? 'completed' : ''} ${isStarted ? 'started' : ''}`}
                      style={{ '--challenge-color': prog?.color } as React.CSSProperties}
                      onClick={() => handleChallengeClick(challenge)}
                    >
                      <div className="challenge-header">
                        <span className="challenge-emoji">{prog?.emoji}</span>
                        <span className="challenge-programme">{prog?.name}</span>
                        <span className="challenge-time">
                          <Clock size={14} /> {challenge.timeEstimate}
                        </span>
                      </div>
                      <h4>{challenge.title}</h4>
                      <p>{challenge.description}</p>
                      <div className="challenge-footer">
                        <span className="challenge-action">
                          {isCompleted ? 'View Submission' : isStarted ? 'Continue' : challenge.action}
                        </span>
                        <div className={`challenge-status ${isCompleted ? 'completed' : isStarted ? 'started' : ''}`}>
                          {isCompleted ? (
                            <CheckCircle size={20} />
                          ) : isStarted ? (
                            <div className="status-started">In Progress</div>
                          ) : (
                            <Play size={20} />
                          )}
                        </div>
                      </div>
                      
                      {/* Guide hint */}
                      <div className="challenge-guide-hint">
                        <span>{prog?.childEmoji}</span>
                        <span>Guided by {challenge.childGuide}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="challenges-counter">
                {completedCount}/3 challenges completed
                {completedCount >= 3 && (
                  <span className="counter-ready"> — Ready to see your results!</span>
                )}
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bs-next-steps">
              <h3>What Happens After Bright Sparks?</h3>
              <div className="next-steps-flow">
                <div className={`flow-step ${completedCount < 3 ? 'current' : 'completed'}`}>
                  <div className="flow-marker">
                    {completedCount >= 3 ? <CheckCircle size={16} /> : '1'}
                  </div>
                  <div className="flow-content">
                    <strong>Bright Sparks</strong>
                    <span>{completedCount >= 3 ? 'Complete!' : 'You are here'}</span>
                  </div>
                </div>
                <ArrowRight size={20} className="flow-arrow" />
                <div className={`flow-step ${completedCount >= 3 ? 'current' : ''}`}>
                  <div className="flow-marker">2</div>
                  <div className="flow-content">
                    <strong>Choose Programme</strong>
                    <span>Build skills (20 weeks)</span>
                  </div>
                </div>
                <ArrowRight size={20} className="flow-arrow" />
                <div className="flow-step">
                  <div className="flow-marker">3</div>
                  <div className="flow-content">
                    <strong>TECHreneurs</strong>
                    <span>Learn to sell (6 weeks)</span>
                  </div>
                </div>
                <ArrowRight size={20} className="flow-arrow" />
                <div className="flow-step final">
                  <div className="flow-marker">💰</div>
                  <div className="flow-content">
                    <strong>Cyberstore</strong>
                    <span>Earn 55% forever</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bs-cta-box">
              <h3>
                {completedCount >= 3 
                  ? "You've Completed 3 Challenges!" 
                  : "Ready to Discover Your Spark?"}
              </h3>
              <p>
                {completedCount >= 3
                  ? "Let's see which programmes match your strengths and interests."
                  : `Complete ${3 - completedCount} more challenge${3 - completedCount !== 1 ? 's' : ''} to unlock your personalized results.`}
              </p>
              <div className="bs-cta-actions">
                {completedCount >= 3 ? (
                  <button className="bs-btn primary" onClick={handleStartDiscovery}>
                    <Trophy size={20} />
                    See My Results
                  </button>
                ) : (
                  <button className="bs-btn primary" onClick={() => challengesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    <Play size={20} />
                    Continue Challenges
                  </button>
                )}
                <Link to="/pathways" className="bs-btn secondary">
                  Browse All Programmes
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            MIGRATING CREATOR TRACK
            ============================================ */}
        {selectedTrack === 'migrating' && (
          <section className="bs-migrating-track" ref={migratingRef}>
            <div className="bs-section-header">
              <h2>Creator Migration Programme</h2>
              <p>Bring your best work. Leave the algorithm behind.</p>
            </div>

            {/* Existing Migration Notice */}
            {existingMigration && (
              <div className="bs-migration-pending">
                <CheckCircle size={24} />
                <div>
                  <strong>Application Submitted</strong>
                  <p>You submitted a migration request on {new Date(existingMigration.submittedAt).toLocaleDateString()}. We'll be in touch within 48 hours.</p>
                </div>
              </div>
            )}

            {/* The Pitch */}
            <div className="bs-migration-pitch">
              <div className="pitch-comparison">
                <div className="pitch-them">
                  <h4>Where You're Coming From</h4>
                  <ul>
                    <li><X size={16} /> Algorithm decides who sees your work</li>
                    <li><X size={16} /> Platform takes 30-50%+ of revenue</li>
                    <li><X size={16} /> Skip a week, lose your audience</li>
                    <li><X size={16} /> No ownership of customer relationships</li>
                    <li><X size={16} /> Terms change without notice</li>
                  </ul>
                </div>
                <div className="pitch-us">
                  <h4>What We Offer</h4>
                  <ul>
                    <li><CheckCircle size={16} /> Your products, your audience, forever</li>
                    <li><CheckCircle size={16} /> Keep 55% of every sale</li>
                    <li><CheckCircle size={16} /> Take a break, products keep selling</li>
                    <li><CheckCircle size={16} /> Direct customer relationships</li>
                    <li><CheckCircle size={16} /> CIC structure = legally can't exploit you</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Migration Requirements */}
            <div className="bs-migration-process">
              <h3>How Migration Works</h3>
              <p className="process-intro">
                We welcome creators from other platforms, but we're intentional about fit.
                This isn't just uploading files—it's joining a community.
              </p>

              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Assessment</h4>
                    <p>Tell us what you're bringing. We review for quality and community fit.</p>
                    <span className="step-time">~10 minutes</span>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>TECHreneurs Training</h4>
                    <p>6-week course on our pricing model, community values, and 55% structure.</p>
                    <span className="step-time">6 weeks</span>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Content Adaptation</h4>
                    <p>Enhance your content for our community. Not just dump and run.</p>
                    <span className="step-time">Ongoing</span>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Mentor Commitment</h4>
                    <p>Help one new creator get started. Pass it forward.</p>
                    <span className="step-time">3 months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What Can Be Ported */}
            <div className="bs-portable-content">
              <h3>What Can You Bring?</h3>
              <div className="portable-grid">
                <div className="portable-item allowed">
                  <CheckCircle size={20} />
                  <span>Digital templates (Notion, Figma, Canva)</span>
                </div>
                <div className="portable-item allowed">
                  <CheckCircle size={20} />
                  <span>E-books and guides you wrote</span>
                </div>
                <div className="portable-item allowed">
                  <CheckCircle size={20} />
                  <span>Audio assets you produced</span>
                </div>
                <div className="portable-item allowed">
                  <CheckCircle size={20} />
                  <span>Course content you created</span>
                </div>
                <div className="portable-item allowed">
                  <CheckCircle size={20} />
                  <span>Design assets (fonts, graphics, themes)</span>
                </div>
                <div className="portable-item caution">
                  <AlertCircle size={20} />
                  <span>Licensed content (must verify rights)</span>
                </div>
                <div className="portable-item blocked">
                  <X size={20} />
                  <span>Resold PLR content</span>
                </div>
                <div className="portable-item blocked">
                  <X size={20} />
                  <span>Content created by others</span>
                </div>
              </div>
            </div>

            {/* Success Stories from Migrants */}
            <div className="bs-migration-stories">
              <h3>Creators Who've Made the Move</h3>
              <div className="migration-stories-grid">
                <div className="migration-story">
                  <div className="story-header">
                    <div className="story-avatar">P</div>
                    <div className="story-meta">
                      <strong>Priya, 34</strong>
                      <span>From: Gumroad</span>
                    </div>
                    <div className="story-earnings">£450/mo</div>
                  </div>
                  <p>"Had 40+ templates scattered across platforms. Now they're all in one place, I keep 55%, and I've mentored 3 new creators."</p>
                </div>
                <div className="migration-story">
                  <div className="story-header">
                    <div className="story-avatar">D</div>
                    <div className="story-meta">
                      <strong>David, 56</strong>
                      <span>From: Udemy</span>
                    </div>
                    <div className="story-earnings">£400/mo</div>
                  </div>
                  <p>"Was getting 37% on Udemy after their cuts. Same courses here, better returns, and I actually know my students."</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bs-cta-box migration">
              <h3>Ready to Migrate?</h3>
              <p>
                Start with our assessment. We'll review your content and let you know if it's a good fit.
              </p>
              <div className="bs-cta-actions">
                {existingMigration ? (
                  <div className="bs-already-applied">
                    <CheckCircle size={20} />
                    <span>Application under review</span>
                  </div>
                ) : (
                  <button
                    className="bs-btn primary"
                    onClick={() => setShowMigrationModal(true)}
                  >
                    <Upload size={20} />
                    Start Migration Assessment
                  </button>
                )}
                <Link to="/pathways" className="bs-btn secondary">
                  Learn About Programmes First
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            NO TRACK SELECTED - SHOW BOTH OPTIONS
            ============================================ */}
        {!selectedTrack && (
          <section className="bs-both-tracks">
            <div className="bs-info-cards">
              <div className="bs-info-card">
                <div className="info-icon">
                  <Zap size={32} />
                </div>
                <h3>For New Creators</h3>
                <p>
                  Explore all 8 programmes through mini-challenges. Discover what fits you.
                  No commitment required.
                </p>
                <ul>
                  <li>45-minute Discovery Journey</li>
                  <li>Try challenges from all programmes</li>
                  <li>Walk away with first portfolio piece</li>
                  <li>Clear recommendation on next steps</li>
                </ul>
                <button
                  className="bs-btn secondary"
                  onClick={() => handleTrackSelect('new')}
                >
                  I'm New to Creating
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="bs-info-card">
                <div className="info-icon migrating">
                  <Upload size={32} />
                </div>
                <h3>For Migrating Creators</h3>
                <p>
                  Bring your existing content. Escape platform dependency.
                  Keep 55% of every sale, forever.
                </p>
                <ul>
                  <li>Port templates, e-books, courses</li>
                  <li>6-week TECHreneurs onboarding</li>
                  <li>Direct customer relationships</li>
                  <li>No algorithm punishment</li>
                </ul>
                <button
                  className="bs-btn secondary"
                  onClick={() => handleTrackSelect('migrating')}
                >
                  I Have Existing Work
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Common Benefits */}
            <div className="bs-common-benefits">
              <h3>Either Way, You Get</h3>
              <div className="benefits-row">
                <div className="benefit">
                  <Shield size={24} />
                  <span><strong>55%</strong> of every sale</span>
                </div>
                <div className="benefit">
                  <Users size={24} />
                  <span><strong>Community</strong> not competition</span>
                </div>
                <div className="benefit">
                  <Target size={24} />
                  <span><strong>No algorithm</strong> games</span>
                </div>
                <div className="benefit">
                  <Trophy size={24} />
                  <span><strong>Real skills</strong> not hustle culture</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            CHALLENGE SANDBOX MODAL
            ============================================ */}
        {activeSandbox && (
          <ChallengeSandbox
            challenge={activeSandbox}
            programme={programmes.find(p => p.id === activeSandbox.programme)!}
            progress={progress[activeSandbox.id]}
            onClose={() => setActiveSandbox(null)}
            onComplete={(submission) => {
              handleChallengeComplete(activeSandbox.id, submission);
            }}
            onSaveDraft={(submission) => {
              handleSaveDraft(activeSandbox.id, submission);
              setActiveSandbox(null);
            }}
          />
        )}

        {/* ============================================
            MIGRATION ASSESSMENT MODAL
            ============================================ */}
        {showMigrationModal && (
          <div className="bs-modal-overlay" onClick={() => setShowMigrationModal(false)}>
            <div className="bs-modal" onClick={e => e.stopPropagation()}>
              <button className="bs-modal-close" onClick={() => setShowMigrationModal(false)}>
                <X size={24} />
              </button>

              <h2>Migration Assessment</h2>
              <p className="modal-intro">
                Tell us about your existing content. We'll review and get back within 48 hours.
              </p>

              <form className="migration-form" onSubmit={handleMigrationSubmit}>
                <div className="form-group">
                  <label>Where are you coming from? *</label>
                  <select
                    value={migrationData.platform}
                    onChange={e => setMigrationData({...migrationData, platform: e.target.value})}
                    required
                  >
                    <option value="">Select platform</option>
                    <option value="gumroad">Gumroad</option>
                    <option value="etsy">Etsy (Digital)</option>
                    <option value="udemy">Udemy</option>
                    <option value="skillshare">Skillshare</option>
                    <option value="teachable">Teachable</option>
                    <option value="patreon">Patreon</option>
                    <option value="substack">Substack</option>
                    <option value="notion">Notion Marketplace</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>What type of content do you create? *</label>
                  <select
                    value={migrationData.contentType}
                    onChange={e => setMigrationData({...migrationData, contentType: e.target.value})}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="templates">Templates (Notion, Figma, etc.)</option>
                    <option value="ebooks">E-books / Guides</option>
                    <option value="courses">Courses / Tutorials</option>
                    <option value="audio">Audio (beats, podcasts, etc.)</option>
                    <option value="design">Design assets</option>
                    <option value="mixed">Mixed / Multiple types</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>How many products are you looking to migrate?</label>
                  <select
                    value={migrationData.productCount}
                    onChange={e => setMigrationData({...migrationData, productCount: e.target.value})}
                  >
                    <option value="">Select range</option>
                    <option value="1-5">1-5 products</option>
                    <option value="6-15">6-15 products</option>
                    <option value="16-30">16-30 products</option>
                    <option value="30+">30+ products</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Why are you leaving your current platform? *</label>
                  <textarea
                    value={migrationData.whyLeaving}
                    onChange={e => setMigrationData({...migrationData, whyLeaving: e.target.value})}
                    placeholder="What's not working? What are you hoping to find here?"
                    rows={4}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="bs-btn primary">
                    Submit Assessment
                    <Send size={18} />
                  </button>
                </div>

                <p className="form-note">
                  We review all applications personally. Expect a response within 48 hours.
                  If approved, you'll start with our TECHreneurs programme.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* ============================================
            MIGRATION SUCCESS MODAL
            ============================================ */}
        {showMigrationSuccess && (
          <div className="bs-modal-overlay" onClick={() => setShowMigrationSuccess(false)}>
            <div className="bs-modal success" onClick={e => e.stopPropagation()}>
              <div className="success-content">
                <div className="success-icon">
                  <CheckCircle size={64} />
                </div>
                <h2>Application Submitted!</h2>
                <p>
                  We've received your migration assessment. A member of our team will review
                  your application and get back to you within 48 hours.
                </p>
                <p>
                  In the meantime, feel free to explore our programmes and community.
                </p>
                <button 
                  className="bs-btn primary"
                  onClick={() => setShowMigrationSuccess(false)}
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <DraggableMaya
        membershipTier="visitor"
        pageType="standard"
        pageContext={{
          title: "Bright Sparks",
          section: "programmes",
          contentType: "discovery",
          data: {
            challengesCompleted: completedCount,
            selectedTrack
          }
        }}
      />
    </PageTemplate>
  );
};

export default BrightSparksPage;