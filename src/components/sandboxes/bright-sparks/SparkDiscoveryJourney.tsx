// src/components/sandboxes/bright-sparks/SparkDiscoveryJourney.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle,
  Play, Pause, Clock, Star, Zap, Download, Share2,
  Music, Code, BookOpen, Heart, Mic, Trophy, Package
} from 'lucide-react';
import styles from './SparkDiscoveryJourney.module.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Challenge {
  id: string;
  programmeId: string;
  programmeName: string;
  icon: string;
  color: string;
  title: string;
  prompt: string;
  timeLimit: number; // seconds
  placeholder: string;
  examples: string[];
  outputLabel: string;
}

interface ChallengeResult {
  challengeId: string;
  response: string;
  timeSpent: number;
  completed: boolean;
}

interface ProgrammeMatch {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  tagline: string;
  products: string[];
  incomeRange: string;
}

// ============================================
// DATA
// ============================================

const challenges: Challenge[] = [
  {
    id: 'beat-loop',
    programmeId: 'trubble-n-bass',
    programmeName: 'Trubble n Bass',
    icon: '🎵',
    color: '#f59e0b',
    title: 'Describe Your Dream Beat',
    prompt: 'Close your eyes. What does your ideal beat sound like? Describe the mood, tempo, instruments, and vibe. Be specific!',
    timeLimit: 180,
    placeholder: 'Example: A slow, dreamy lo-fi beat with soft piano chords, vinyl crackle, and a heartbeat-like kick drum. Something you\'d study to at 2am...',
    examples: ['Lo-fi with rain sounds', 'Hard trap with Caribbean riddims', 'Chill R&B with 90s samples'],
    outputLabel: 'Beat description'
  },
  {
    id: 'code-solve',
    programmeId: 'stemgineers',
    programmeName: 'STEMgineers',
    icon: '🤖',
    color: '#10b981',
    title: 'Spot the Problem',
    prompt: 'Think of something broken or annoying in your daily life (an app, a device, a process). Describe what\'s wrong and how you\'d fix it with technology.',
    timeLimit: 180,
    placeholder: 'Example: My grandma\'s TV remote has 50 buttons and she only uses 3. I\'d create a simplified remote with big buttons and voice control...',
    examples: ['School booking system is slow', 'Grandparents struggle with video calls', 'Bus tracker is never accurate'],
    outputLabel: 'Tech solution idea'
  },
  {
    id: 'micro-story',
    programmeId: 'pageturners',
    programmeName: 'Pageturners',
    icon: '📖',
    color: '#06b6d4',
    title: 'Flash Fiction',
    prompt: 'Write a complete story in exactly 50 words. It must have a beginning, middle, and end. Any genre.',
    timeLimit: 300,
    placeholder: 'Start writing your 50-word story here...',
    examples: ['A twist ending', 'A moment of realization', 'A conversation that changes everything'],
    outputLabel: 'Your story'
  },
  {
    id: 'design-brief',
    programmeId: 'silk-stilettos',
    programmeName: 'Silk Stilettos',
    icon: '👗',
    color: '#ec4899',
    title: 'Design a Template',
    prompt: 'Describe a digital template that would help someone in your life. What problem does it solve? What would it look like?',
    timeLimit: 180,
    placeholder: 'Example: A weekly meal planner template for my mum who always asks "what should I cook?" It would have a shopping list that auto-generates based on recipes...',
    examples: ['Budget tracker for students', 'Social media content calendar', 'Recipe organizer with heritage tags'],
    outputLabel: 'Template concept'
  },
  {
    id: 'voice-intro',
    programmeId: 'gtechcasters',
    programmeName: 'G-Tech Casters',
    icon: '🎙️',
    color: '#ef4444',
    title: 'Your Voice Intro',
    prompt: 'Write a 30-second script introducing yourself for a podcast. Include: your name, one thing you\'re passionate about, and why people should listen to you.',
    timeLimit: 180,
    placeholder: 'Example: "Hey, I\'m Maya, and I\'m obsessed with the way food connects us to our history. On this show, I interview grandmas about their secret recipes..."',
    examples: ['Gaming and accessibility', 'Local music scene', 'Caribbean heritage stories'],
    outputLabel: 'Podcast intro script'
  },
  {
    id: 'recipe-story',
    programmeId: 'auntie-anansis-kitchen',
    programmeName: "Auntie Anansi's Kitchen",
    icon: '🍲',
    color: '#84cc16',
    title: 'Recipe Memory',
    prompt: 'Describe a family dish and the story behind it. Who made it? When? What does it mean to your family?',
    timeLimit: 240,
    placeholder: 'Example: My grandma\'s curry goat. She\'d start at 5am on Sundays. The whole house would smell like scotch bonnet and thyme. It was the only time all the cousins got along...',
    examples: ['Sunday dinner tradition', 'Holiday special', 'Recipe passed down generations'],
    outputLabel: 'Recipe story'
  }
];

const programmes: ProgrammeMatch[] = [
  { id: 'trubble-n-bass', name: 'Trubble n Bass', icon: '🎵', color: '#f59e0b', score: 0, tagline: 'Make beats that sell', products: ['Beat packs', 'Loop kits', 'SFX'], incomeRange: '£100-350/mo' },
  { id: 'stemgineers', name: 'STEMgineers', icon: '🤖', color: '#10b981', score: 0, tagline: 'Build things that work', products: ['Tutorials', 'Tools', 'Guides'], incomeRange: '£100-400/mo' },
  { id: 'pageturners', name: 'Pageturners', icon: '📖', color: '#06b6d4', score: 0, tagline: 'Words that earn', products: ['E-books', 'Guides', 'Templates'], incomeRange: '£75-300/mo' },
  { id: 'silk-stilettos', name: 'Silk Stilettos', icon: '👗', color: '#ec4899', score: 0, tagline: 'Women building in tech', products: ['Templates', 'Planners', 'Assets'], incomeRange: '£150-450/mo' },
  { id: 'gtechcasters', name: 'G-Tech Casters', icon: '🎙️', color: '#ef4444', score: 0, tagline: 'Stories through sound', products: ['Podcasts', 'Audio assets'], incomeRange: '£100-500/mo' },
  { id: 'auntie-anansis-kitchen', name: "Auntie Anansi's Kitchen", icon: '🍲', color: '#84cc16', score: 0, tagline: 'Food culture preserved', products: ['Recipe packs', 'Food guides'], incomeRange: '£75-300/mo' },
  { id: 'kaywanas-court', name: "Kaywana's Court", icon: '🎭', color: '#a855f7', score: 0, tagline: 'Performance meets product', products: ['Performance packs', 'Workshops'], incomeRange: '£100-400/mo' },
  { id: 'techreneurs', name: 'TECHreneurs', icon: '💰', color: '#10b981', score: 0, tagline: 'Creativity → Income', products: ['Your products, priced right'], incomeRange: 'Unlocks earning' },
];

// ============================================
// MAIN COMPONENT
// ============================================

const SparkDiscoveryJourney: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'challenges' | 'results'>('intro');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [matches, setMatches] = useState<ProgrammeMatch[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      handleSubmitChallenge();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startChallenge = () => {
    const challenge = challenges.find(c => c.id === selectedChallenges[currentChallengeIndex]);
    if (challenge) {
      setTimeRemaining(challenge.timeLimit);
      setIsTimerRunning(true);
      setCurrentResponse('');
    }
  };

  const handleSubmitChallenge = () => {
    const challenge = challenges.find(c => c.id === selectedChallenges[currentChallengeIndex]);
    if (!challenge) return;

    const result: ChallengeResult = {
      challengeId: challenge.id,
      response: currentResponse,
      timeSpent: challenge.timeLimit - timeRemaining,
      completed: currentResponse.trim().length > 20
    };

    setResults(prev => [...prev, result]);
    setIsTimerRunning(false);

    if (currentChallengeIndex < selectedChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setCurrentResponse('');
      setTimeRemaining(0);
    } else {
      calculateMatches();
    }
  };

  const calculateMatches = () => {
    const updatedMatches = programmes.map(prog => {
      let score = Math.random() * 20; // Base variation

      // Score based on completed challenges
      results.forEach(result => {
        const challenge = challenges.find(c => c.id === result.challengeId);
        if (challenge?.programmeId === prog.id && result.completed) {
          score += 40;
          // Bonus for longer, more thoughtful responses
          if (result.response.length > 100) score += 15;
          if (result.response.length > 200) score += 10;
        }
      });

      return { ...prog, score: Math.round(score) };
    });

    const sorted = updatedMatches.sort((a, b) => b.score - a.score);
    setMatches(sorted);
    setStep('results');
  };

  const toggleChallengeSelection = (id: string) => {
    if (selectedChallenges.includes(id)) {
      setSelectedChallenges(prev => prev.filter(c => c !== id));
    } else if (selectedChallenges.length < 3) {
      setSelectedChallenges(prev => [...prev, id]);
    }
  };

  const startJourney = () => {
    if (selectedChallenges.length >= 3) {
      setStep('challenges');
    }
  };

  const resetJourney = () => {
    setStep('intro');
    setCurrentChallengeIndex(0);
    setResults([]);
    setCurrentResponse('');
    setTimeRemaining(0);
    setIsTimerRunning(false);
    setMatches([]);
    setSelectedChallenges([]);
  };

  // ============================================
  // INTRO SCREEN
  // ============================================
  if (step === 'intro') {
    return (
      <div className={styles.journey}>
        <div className={styles.introHeader}>
          <div className={styles.sparkIcon}>
            <Sparkles size={48} />
          </div>
          <h2>Spark Discovery Journey</h2>
          <p>
            Complete 3 mini-challenges. Discover which programme fits you best.
            This will take about 15 minutes.
          </p>
        </div>

        <div className={styles.challengeSelector}>
          <h3>Choose 3 Challenges</h3>
          <p className={styles.selectorNote}>Pick the ones that interest you most</p>

          <div className={styles.challengeOptions}>
            {challenges.map(challenge => (
              <button
                key={challenge.id}
                className={`${styles.challengeOption} ${selectedChallenges.includes(challenge.id) ? styles.selected : ''}`}
                onClick={() => toggleChallengeSelection(challenge.id)}
                style={{ '--challenge-color': challenge.color } as React.CSSProperties}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionIcon}>{challenge.icon}</span>
                  <span className={styles.optionProgramme}>{challenge.programmeName}</span>
                  {selectedChallenges.includes(challenge.id) && (
                    <CheckCircle size={20} className={styles.checkIcon} />
                  )}
                </div>
                <h4>{challenge.title}</h4>
                <p>{challenge.prompt.substring(0, 80)}...</p>
                <div className={styles.optionMeta}>
                  <Clock size={14} />
                  <span>{Math.floor(challenge.timeLimit / 60)} min</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.selectionStatus}>
            <span>{selectedChallenges.length}/3 challenges selected</span>
            {selectedChallenges.length >= 3 && (
              <span className={styles.ready}>Ready to start!</span>
            )}
          </div>

          <button
            className={styles.startBtn}
            onClick={startJourney}
            disabled={selectedChallenges.length < 3}
          >
            <Play size={20} />
            Begin Discovery Journey
          </button>
        </div>

        <div className={styles.howItWorks}>
          <h4>How It Works</h4>
          <div className={styles.howSteps}>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>1</div>
              <p>Complete each challenge within the time limit</p>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>2</div>
              <p>Write detailed responses — the more you share, the better your match</p>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>3</div>
              <p>Get your personalized programme recommendations</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // CHALLENGE SCREEN
  // ============================================
  if (step === 'challenges') {
    const currentChallengeId = selectedChallenges[currentChallengeIndex];
    const challenge = challenges.find(c => c.id === currentChallengeId);

    if (!challenge) return null;

    return (
      <div className={styles.journey}>
        <div className={styles.challengeProgress}>
          <div className={styles.progressDots}>
            {selectedChallenges.map((id, i) => (
              <div
                key={id}
                className={`${styles.progressDot} ${i < currentChallengeIndex ? styles.done : ''} ${i === currentChallengeIndex ? styles.current : ''}`}
              />
            ))}
          </div>
          <span className={styles.progressText}>
            Challenge {currentChallengeIndex + 1} of {selectedChallenges.length}
          </span>
        </div>

        <div
          className={styles.challengeCard}
          style={{ '--challenge-color': challenge.color } as React.CSSProperties}
        >
          <div className={styles.challengeHeader}>
            <span className={styles.challengeIcon}>{challenge.icon}</span>
            <div className={styles.challengeInfo}>
              <span className={styles.challengeProgramme}>{challenge.programmeName}</span>
              <h3>{challenge.title}</h3>
            </div>
            <div className={`${styles.timer} ${timeRemaining < 30 ? styles.urgent : ''}`}>
              <Clock size={18} />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className={styles.challengePrompt}>
            <p>{challenge.prompt}</p>
          </div>

          {!isTimerRunning && timeRemaining === 0 ? (
            <div className={styles.challengeStart}>
              <div className={styles.examples}>
                <strong>Ideas to get you started:</strong>
                <ul>
                  {challenge.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
              <button className={styles.startChallengeBtn} onClick={startChallenge}>
                <Play size={20} />
                Start {Math.floor(challenge.timeLimit / 60)}-Minute Timer
              </button>
            </div>
          ) : (
            <div className={styles.challengeResponse}>
              <textarea
                value={currentResponse}
                onChange={e => setCurrentResponse(e.target.value)}
                placeholder={challenge.placeholder}
                className={styles.responseArea}
                autoFocus
              />
              <div className={styles.responseFooter}>
                <span className={styles.charCount}>
                  {currentResponse.length} characters
                </span>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmitChallenge}
                  disabled={currentResponse.trim().length < 20}
                >
                  {currentChallengeIndex < selectedChallenges.length - 1 ? (
                    <>Next Challenge <ArrowRight size={18} /></>
                  ) : (
                    <>See My Results <Star size={18} /></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.challengeTip}>
          <Zap size={16} />
          <span>
            <strong>Tip:</strong> The more detail you include, the better we can match you to the right programme.
          </span>
        </div>
      </div>
    );
  }

  // ============================================
  // RESULTS SCREEN
  // ============================================
  if (step === 'results') {
    const topMatches = matches.slice(0, 3);
    const completedCount = results.filter(r => r.completed).length;

    return (
      <div className={styles.journey}>
        <div className={styles.resultsHeader}>
          <div className={styles.resultsCelebration}>🎯</div>
          <h2>Your Spark Profile</h2>
          <p>
            Based on {completedCount} challenge{completedCount !== 1 ? 's' : ''} completed,
            here's where your spark burns brightest.
          </p>
        </div>

        <div className={styles.topMatches}>
          <h3>🔥 Your Top Matches</h3>
          <div className={styles.matchGrid}>
            {topMatches.map((match, i) => (
              <div
                key={match.id}
                className={styles.matchCard}
                style={{ '--match-color': match.color } as React.CSSProperties}
              >
                <div className={styles.matchRank}>#{i + 1}</div>
                <div className={styles.matchIcon}>{match.icon}</div>
                <h4>{match.name}</h4>
                <p className={styles.matchTagline}>{match.tagline}</p>
                <div className={styles.matchProducts}>
                  {match.products.slice(0, 3).map((product, j) => (
                    <span key={j} className={styles.productTag}>{product}</span>
                  ))}
                </div>
                <div className={styles.matchIncome}>{match.incomeRange}</div>
                <Link to={`/programmes/${match.id}`} className={styles.matchBtn}>
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.yourResponses}>
          <h3>📝 Your Discovery Outputs</h3>
          <p className={styles.responsesNote}>
            These are your first portfolio pieces! Save them for your application.
          </p>
          <div className={styles.responsesList}>
            {results.filter(r => r.completed).map(result => {
              const challenge = challenges.find(c => c.id === result.challengeId);
              if (!challenge) return null;
              return (
                <div key={result.challengeId} className={styles.savedResponse}>
                  <div className={styles.responseHeader}>
                    <span className={styles.responseIcon}>{challenge.icon}</span>
                    <strong>{challenge.outputLabel}</strong>
                  </div>
                  <p>{result.response}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.nextSteps}>
          <h3>What's Next?</h3>
          <div className={styles.nextStepsGrid}>
            <div className={styles.nextStep}>
              <div className={styles.stepIcon}>
                <Star size={24} />
              </div>
              <h4>Apply to Bright Sparks</h4>
              <p>Full 8-week programme where you'll try all paths</p>
              <Link to="/membership" className={styles.nextStepBtn}>
                Apply Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.nextStep}>
              <div className={styles.stepIcon}>
                <Download size={24} />
              </div>
              <h4>Save Your Results</h4>
              <p>Download your discovery profile for later</p>
              <button className={styles.nextStepBtn} onClick={() => window.print()}>
                Download PDF <Download size={16} />
              </button>
            </div>
            <div className={styles.nextStep}>
              <div className={styles.stepIcon}>
                <Share2 size={24} />
              </div>
              <h4>Share Your Spark</h4>
              <p>Tell others about your discovery</p>
              <button className={styles.nextStepBtn}>
                Share Results <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultsFooter}>
          <button className={styles.retakeBtn} onClick={resetJourney}>
            <RotateCcw size={18} />
            Retake Discovery Journey
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SparkDiscoveryJourney;