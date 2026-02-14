import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Zap, CheckCircle, Clock, Target,
  Play, BookOpen, Music, Code, Heart, Mic, Package,
  ArrowLeft, Save, RotateCcw, ChevronRight, Trophy
} from 'lucide-react';
import './sandbox.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Programme {
  id: string;
  name: string;
  emoji: string;
  color: string;
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
  starterPrompt: string;
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

// ============================================
// DATA
// ============================================

const programmes: Record<string, Programme> = {
  'stemgeneers': { id: 'stemgeneers', name: 'STEMgeneers', emoji: '🤖', color: '#10b981', childGuide: 'Kofi', childEmoji: '🔧' },
  'trubble-n-bass': { id: 'trubble-n-bass', name: 'Trubble n Bass', emoji: '🎵', color: '#f59e0b', childGuide: 'Afua', childEmoji: '🎙️' },
  'pageturners': { id: 'pageturners', name: 'Pageturners', emoji: '📖', color: '#06b6d4', childGuide: 'Afua', childEmoji: '🎙️' },
  'silk-stilettos': { id: 'silk-stilettos', name: 'Silk Stilettos', emoji: '👗', color: '#ec4899', childGuide: 'Anansewa', childEmoji: '🎭' },
  'gtechcasters': { id: 'gtechcasters', name: 'G-Tech Casters', emoji: '🎙️', color: '#ef4444', childGuide: 'Afua', childEmoji: '🎙️' },
  'auntie-anansis-kitchen': { id: 'auntie-anansis-kitchen', name: "Auntie Anansi's Kitchen", emoji: '🍲', color: '#84cc16', childGuide: 'Esi', childEmoji: '📚' },
};

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
// LOCAL STORAGE
// ============================================

const STORAGE_KEY = 'brightSparks_progress';

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
// MAIN SANDBOX PAGE COMPONENT
// ============================================

const BrightSparksSandbox: React.FC = () => {
  const navigate = useNavigate();
  const [activeSandbox, setActiveSandbox] = useState<MiniChallenge | null>(null);
  const [progress, setProgress] = useState<Record<string, ChallengeProgress>>(loadProgress);

  const completedCount = Object.values(progress).filter(p => p.completed).length;

  const handleChallengeClick = (challenge: MiniChallenge) => {
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
    setActiveSandbox(challenge);
  };

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
    setActiveSandbox(null);
  };

  const handleResetProgress = () => {
    if (confirm('Reset all challenge progress? This cannot be undone.')) {
      setProgress({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleViewResults = () => {
    navigate('/programmes/bright-sparks/results', { 
      state: { 
        progress, 
        completedChallenges: Object.keys(progress).filter(k => progress[k].completed) 
      }
    });
  };

  return (
    <div className="sandbox-page">
      {/* Header */}
      <div className="sandbox-header">
        <div className="sandbox-breadcrumb">
          <Link to="/programmes">Programmes</Link>
          <span className="separator">/</span>
          <Link to="/programmes/bright-sparks">Bright Sparks</Link>
          <span className="separator">/</span>
          <span className="current">Sandbox</span>
        </div>
        
        <h1 className="sandbox-title">
          <span className="sandbox-icon">⚡</span>
          Spark Discovery Journey
        </h1>
        
        <p className="sandbox-subtitle">
          Complete 3 mini-challenges to discover which programme fits you best. 
          Each challenge is guided by one of Maya's children—they'll push you, 
          encourage you, and help you see what you're capable of.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="sandbox-progress">
        <div className="sandbox-progress-inner">
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
      </div>

      {/* Challenge Grid */}
      <div className="sandbox-tool-container">
        <h2>Choose Your Challenges</h2>
        <p className="challenges-intro">
          Click any challenge to open its sandbox. Complete at least 3 to unlock your personalized results.
        </p>

        <div className="challenge-grid">
          {miniChallenges.map(challenge => {
            const prog = programmes[challenge.programme];
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
                <h3>{challenge.title}</h3>
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
                
                <div className="challenge-guide-hint">
                  <span>{prog?.childEmoji}</span>
                  <span>Guided by {challenge.childGuide}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results CTA */}
      {completedCount >= 3 && (
        <div className="sandbox-results-cta">
          <div className="sandbox-results-cta-inner">
            <Trophy size={40} />
            <div>
              <h3>You've completed {completedCount} challenges!</h3>
              <p>Ready to see which programme matches your strengths?</p>
            </div>
            <button className="cta-primary" onClick={handleViewResults}>
              See My Results
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="sandbox-footer">
        <div className="sandbox-cta">
          <h3>What happens next?</h3>
          <p>
            After completing 3 challenges, you'll get personalized recommendations 
            for which programme fits your skills and interests. From there, you can 
            join a 20-week programme, build real projects, and eventually sell your 
            creations through our Cyberstore—keeping 55% of every sale.
          </p>
          <div className="cta-buttons">
            <Link to="/programmes/bright-sparks" className="cta-secondary">
              ← Back to Bright Sparks
            </Link>
            <Link to="/pathways" className="cta-secondary">
              Browse All Programmes
            </Link>
          </div>
        </div>
      </div>

      {/* Challenge Sandbox Modal */}
      {activeSandbox && (
        <ChallengeSandbox
          challenge={activeSandbox}
          programme={programmes[activeSandbox.programme]}
          progress={progress[activeSandbox.id]}
          onClose={() => setActiveSandbox(null)}
          onComplete={(submission) => {
            handleChallengeComplete(activeSandbox.id, submission);
          }}
          onSaveDraft={(submission) => {
            handleSaveDraft(activeSandbox.id, submission);
          }}
        />
      )}
    </div>
  );
};

export default BrightSparksSandbox;