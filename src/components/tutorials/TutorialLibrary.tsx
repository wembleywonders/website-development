import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './TutorialLibrary.css';

// Import types and data
import { 
  Tutorial, 
  Programme, 
  ROVGuide, 
  Difficulty,
  ROV_GUIDES, 
  PROGRAMMES,
  getFreeTutorials,
  getTutorialsByProgramme,
  searchTutorials,
  calculateTotalDuration
} from '../../data/tutorials';

// Import all tutorial data
import { STEMGENEERS_TUTORIALS } from '../../data/tutorials/tutorials.stemgeneers';
import { SILK_STILETTOS_TUTORIALS } from '../../data/tutorials/tutorials.silk-stilettos';
import { TECHRENEURS_TUTORIALS } from '../../data/tutorials/tutorials.techreneurs';
import { KAYWANAS_COURT_TUTORIALS } from '../../data/tutorials/tutorials.kaywanas-court';
import { GTECH_CASTERS_TUTORIALS } from '../../data/tutorials/tutorials.gtech-casters';

/**
 * UNIFIED TUTORIAL LIBRARY
 * ========================
 * 
 * Features:
 * - Filter by programme or show all
 * - Search across all tutorials
 * - ROV guide integration for help
 * - Progress tracking per user
 * - Cross-programme recommendations
 * - Conversion CTAs (kit, workshop, membership)
 */

// Combine all tutorials
const ALL_TUTORIALS: Tutorial[] = [
  ...STEMGENEERS_TUTORIALS,
  ...SILK_STILETTOS_TUTORIALS,
  ...TECHRENEURS_TUTORIALS,
  ...KAYWANAS_COURT_TUTORIALS,
  ...GTECH_CASTERS_TUTORIALS,
];

// ========================================
// PROGRESS STORAGE (localStorage)
// ========================================

interface UserProgress {
  completedTutorials: string[];
  tutorialProgress: Record<string, number[]>; // tutorialId -> completed step indices
  lastAccessed: Record<string, string>; // tutorialId -> ISO date
}

const getProgress = (): UserProgress => {
  const stored = localStorage.getItem('ww_tutorial_progress');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    completedTutorials: [],
    tutorialProgress: {},
    lastAccessed: {}
  };
};

const saveProgress = (progress: UserProgress) => {
  localStorage.setItem('ww_tutorial_progress', JSON.stringify(progress));
};

// ========================================
// ROV GUIDE CHAT COMPONENT
// ========================================

interface ROVChatProps {
  guide: typeof ROV_GUIDES[ROVGuide];
  tutorialContext?: string;
  onClose: () => void;
}

const ROVChat: React.FC<ROVChatProps> = ({ guide, tutorialContext, onClose }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'rov', text: string}[]>([
    { role: 'rov', text: guide.greeting }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    // Simulated ROV response (in production, this would call Maya/Claude API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'rov', 
        text: `Great question! ${tutorialContext ? `Regarding ${tutorialContext}: ` : ''}I'd explain this step by step. In a full implementation, I'd connect to the Maya AI system to give you a personalized response based on your progress and the tutorial content.`
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="rov-chat">
      <div className="rov-chat-header" style={{ backgroundColor: guide.colour }}>
        <span className="rov-avatar">{guide.avatar}</span>
        <div className="rov-info">
          <strong>{guide.name}</strong>
          <span>{guide.specialisms[0]}</span>
        </div>
        <button className="rov-close" onClick={onClose}>×</button>
      </div>
      
      <div className="rov-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`rov-message ${msg.role}`}>
            {msg.role === 'rov' && <span className="rov-msg-avatar">{guide.avatar}</span>}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      
      <div className="rov-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
        />
        <button onClick={sendMessage} style={{ backgroundColor: guide.colour }}>
          Send
        </button>
      </div>
    </div>
  );
};

// ========================================
// TUTORIAL CARD COMPONENT
// ========================================

interface TutorialCardProps {
  tutorial: Tutorial;
  progress: UserProgress;
  onSelect: (tutorial: Tutorial) => void;
  showProgramme?: boolean;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, progress, onSelect, showProgramme }) => {
  const programme = PROGRAMMES[tutorial.primaryProgramme];
  const isCompleted = progress.completedTutorials.includes(tutorial.id);
  const stepProgress = progress.tutorialProgress[tutorial.id] || [];
  const progressPercent = tutorial.steps.length > 0 
    ? Math.round((stepProgress.length / tutorial.steps.length) * 100)
    : 0;

  return (
    <div 
      className={`tutorial-card ${!tutorial.freeAccess ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
      onClick={() => tutorial.freeAccess && onSelect(tutorial)}
    >
      {isCompleted && <div className="completed-badge">✓ Completed</div>}
      
      <div className="tutorial-card-header">
        <span className="tutorial-icon">{tutorial.icon}</span>
        <div className="tutorial-badges">
          {tutorial.freeAccess ? (
            <span className="free-badge">FREE</span>
          ) : (
            <span className="members-badge">🔒 MEMBERS</span>
          )}
          {showProgramme && (
            <span 
              className="programme-badge"
              style={{ backgroundColor: `${programme.colour}20`, color: programme.colour }}
            >
              {programme.icon} {programme.name}
            </span>
          )}
        </div>
      </div>
      
      <h3>{tutorial.title}</h3>
      <p>{tutorial.description}</p>
      
      <div className="tutorial-meta">
        <span className={`difficulty-tag ${tutorial.difficulty}`}>{tutorial.difficulty}</span>
        <span className="duration-tag">⏱️ {tutorial.duration}</span>
        <span className="steps-tag">📝 {tutorial.steps.length} steps</span>
      </div>

      {progressPercent > 0 && progressPercent < 100 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%`, backgroundColor: programme.colour }} />
          <span className="progress-text">{progressPercent}% complete</span>
        </div>
      )}

      {tutorial.freeAccess ? (
        <button className="start-btn" style={{ backgroundColor: programme.colour }}>
          {progressPercent > 0 && progressPercent < 100 ? 'Continue' : isCompleted ? 'Review' : 'Start'} →
        </button>
      ) : (
        <button className="unlock-btn">Unlock with Membership</button>
      )}
    </div>
  );
};

// ========================================
// TUTORIAL VIEWER COMPONENT
// ========================================

interface TutorialViewerProps {
  tutorial: Tutorial;
  progress: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
  onClose: () => void;
}

const TutorialViewer: React.FC<TutorialViewerProps> = ({ tutorial, progress, onProgressUpdate, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showROVChat, setShowROVChat] = useState(false);
  
  const guide = ROV_GUIDES[tutorial.rovGuide];
  const programme = PROGRAMMES[tutorial.primaryProgramme];
  const completedSteps = progress.tutorialProgress[tutorial.id] || [];
  const progressPercent = Math.round((completedSteps.length / tutorial.steps.length) * 100);

  const markStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return;
    
    const newProgress = { ...progress };
    newProgress.tutorialProgress[tutorial.id] = [...completedSteps, stepIndex];
    newProgress.lastAccessed[tutorial.id] = new Date().toISOString();
    
    // Check if all steps complete
    if (newProgress.tutorialProgress[tutorial.id].length === tutorial.steps.length) {
      if (!newProgress.completedTutorials.includes(tutorial.id)) {
        newProgress.completedTutorials.push(tutorial.id);
      }
    }
    
    onProgressUpdate(newProgress);
    saveProgress(newProgress);
  };

  // Find cross-programme recommendations
  const recommendations = useMemo(() => {
    return ALL_TUTORIALS
      .filter(t => 
        t.id !== tutorial.id && 
        t.freeAccess &&
        (t.tags.some(tag => tutorial.tags.includes(tag)) || 
         tutorial.nextTutorials?.includes(t.id))
      )
      .slice(0, 3);
  }, [tutorial]);

  const step = tutorial.steps[currentStep];

  return (
    <div className="tutorial-viewer">
      {/* Header */}
      <div className="viewer-header">
        <button className="back-btn" onClick={onClose}>← Back to Library</button>
        <div className="progress-section">
          <div className="progress-bar-large">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%`, backgroundColor: programme.colour }} 
            />
          </div>
          <span>{progressPercent}% Complete</span>
        </div>
        <button 
          className="rov-help-btn"
          onClick={() => setShowROVChat(!showROVChat)}
          style={{ borderColor: guide.colour, color: guide.colour }}
        >
          {guide.avatar} Ask {guide.name}
        </button>
      </div>

      <div className="viewer-content">
        {/* Main Content */}
        <div className="viewer-main">
          <div className="tutorial-header-section">
            <span className="tutorial-icon-large">{tutorial.icon}</span>
            <div>
              <h1>{tutorial.title}</h1>
              <p>{tutorial.description}</p>
              <div className="tutorial-meta-large">
                <span style={{ color: programme.colour }}>{programme.icon} {programme.name}</span>
                <span>⏱️ {tutorial.duration}</span>
                <span className={`difficulty ${tutorial.difficulty}`}>{tutorial.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="step-nav">
            {tutorial.steps.map((s, i) => (
              <button
                key={i}
                className={`step-nav-btn ${currentStep === i ? 'active' : ''} ${completedSteps.includes(i) ? 'completed' : ''}`}
                onClick={() => setCurrentStep(i)}
                style={{ 
                  borderColor: currentStep === i ? programme.colour : undefined,
                  backgroundColor: completedSteps.includes(i) ? programme.colour : undefined
                }}
              >
                {completedSteps.includes(i) ? '✓' : s.step}
              </button>
            ))}
          </div>

          {/* Current Step Content */}
          {step && (
            <div className="step-content" style={{ borderColor: `${programme.colour}30` }}>
              <div className="step-header">
                <span className="step-number" style={{ backgroundColor: programme.colour }}>
                  Step {step.step}
                </span>
                <h2>{step.title}</h2>
              </div>

              <p className="step-description">{step.description}</p>

              {step.tip && (
                <div className="step-tip">
                  <span>💡 Pro Tip</span>
                  <p>{step.tip}</p>
                </div>
              )}

              {step.warning && (
                <div className="step-warning">
                  <span>⚠️ Warning</span>
                  <p>{step.warning}</p>
                </div>
              )}

              {step.rovPrompt && (
                <button 
                  className="ask-rov-inline"
                  onClick={() => setShowROVChat(true)}
                  style={{ borderColor: guide.colour, color: guide.colour }}
                >
                  🤔 "{step.rovPrompt}" — Ask {guide.name}
                </button>
              )}

              <div className="step-actions">
                <button
                  className="mark-complete-btn"
                  onClick={() => markStepComplete(currentStep)}
                  disabled={completedSteps.includes(currentStep)}
                  style={{ backgroundColor: completedSteps.includes(currentStep) ? programme.colour : undefined }}
                >
                  {completedSteps.includes(currentStep) ? '✓ Completed' : 'Mark Complete'}
                </button>
                
                {currentStep < tutorial.steps.length - 1 && (
                  <button
                    className="next-step-btn"
                    onClick={() => {
                      markStepComplete(currentStep);
                      setCurrentStep(currentStep + 1);
                    }}
                    style={{ backgroundColor: programme.colour }}
                  >
                    Next Step →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {tutorial.commonMistakes.length > 0 && (
            <div className="mistakes-section">
              <h3>⚠️ Common Mistakes to Avoid</h3>
              <ul>
                {tutorial.commonMistakes.map((mistake, i) => (
                  <li key={i}>{mistake}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cross-Programme Recommendations */}
          {recommendations.length > 0 && (
            <div className="recommendations-section">
              <h3>📚 You Might Also Like</h3>
              <div className="recommendations-grid">
                {recommendations.map(rec => {
                  const recProgramme = PROGRAMMES[rec.primaryProgramme];
                  return (
                    <div 
                      key={rec.id} 
                      className="recommendation-card"
                      onClick={() => {
                        setCurrentStep(0);
                        onClose();
                        // Would navigate to new tutorial
                      }}
                    >
                      <span className="rec-icon">{rec.icon}</span>
                      <div>
                        <strong>{rec.title}</strong>
                        <span style={{ color: recProgramme.colour }}>
                          {recProgramme.icon} {recProgramme.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="viewer-sidebar">
          {/* Tools List */}
          <div className="tools-section">
            <h3>🔧 Tools & Materials</h3>
            <div className="tools-list">
              {tutorial.tools.map((tool, i) => (
                <div key={i} className={`tool-item ${tool.essential ? 'essential' : ''}`}>
                  <div className="tool-info">
                    <span className="tool-name">{tool.name}</span>
                    {tool.price && <span className="tool-price">{tool.price}</span>}
                  </div>
                  {tool.essential && <span className="essential-tag">Essential</span>}
                  {tool.cyberstoreSlug && (
                    <Link to={`/cyberstore/${tool.cyberstoreSlug}`} className="cyberstore-link">
                      Buy on Cyberstore →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kit Upsell */}
          {tutorial.kit && (
            <div className="kit-upsell" style={{ borderColor: `${programme.colour}40` }}>
              <h3>📦 Get the Kit</h3>
              <p>Everything for this tutorial in one package:</p>
              <div className="kit-card">
                <strong>{tutorial.kit.name}</strong>
                <span className="kit-price" style={{ color: programme.colour }}>
                  {tutorial.kit.price}
                </span>
                {tutorial.kit.savings && <span className="kit-savings">{tutorial.kit.savings}</span>}
                <Link to={`/cyberstore/kits/${tutorial.kit.slug}`} className="kit-link" style={{ backgroundColor: programme.colour }}>
                  View Kit →
                </Link>
              </div>
            </div>
          )}

          {/* Workshop Upsell */}
          {tutorial.workshop && (
            <div className="workshop-upsell">
              <h3>👨‍🏫 Want 1-on-1 Help?</h3>
              <p>Live session with experienced guide:</p>
              <div className="workshop-card">
                <strong>{tutorial.workshop.title}</strong>
                <span className="workshop-price">{tutorial.workshop.price}</span>
                <span className="workshop-duration">{tutorial.workshop.duration} • {tutorial.workshop.format}</span>
                <Link to={`/workshops/${tutorial.workshop.bookingSlug}`} className="workshop-link">
                  Book Session →
                </Link>
              </div>
            </div>
          )}

          {/* Badge */}
          {tutorial.badgeAwarded && (
            <div className="badge-section" style={{ borderColor: `${programme.colour}40` }}>
              <h3>🏆 Earn Badge</h3>
              <p>Complete all steps to earn:</p>
              <div className="badge-preview" style={{ borderColor: programme.colour }}>
                <span>{tutorial.icon}</span>
                <strong>{tutorial.badgeAwarded.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ROV Chat Panel */}
      {showROVChat && (
        <ROVChat 
          guide={guide} 
          tutorialContext={tutorial.title}
          onClose={() => setShowROVChat(false)} 
        />
      )}
    </div>
  );
};

// ========================================
// MAIN TUTORIAL LIBRARY COMPONENT
// ========================================

interface TutorialLibraryProps {
  defaultProgramme?: Programme;
  showAllProgrammes?: boolean;
  compactMode?: boolean;
}

const TutorialLibrary: React.FC<TutorialLibraryProps> = ({ 
  defaultProgramme,
  showAllProgrammes = true,
  compactMode = false
}) => {
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | 'all'>(defaultProgramme || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [progress, setProgress] = useState<UserProgress>(getProgress());

  // Filter tutorials
  const filteredTutorials = useMemo(() => {
    let tutorials = ALL_TUTORIALS;
    
    if (selectedProgramme !== 'all') {
      tutorials = tutorials.filter(t => t.programmes.includes(selectedProgramme));
    }
    
    if (selectedDifficulty !== 'all') {
      tutorials = tutorials.filter(t => t.difficulty === selectedDifficulty);
    }
    
    if (searchQuery) {
      tutorials = searchTutorials(tutorials, searchQuery);
    }
    
    return tutorials;
  }, [selectedProgramme, selectedDifficulty, searchQuery]);

  const freeTutorials = filteredTutorials.filter(t => t.freeAccess);
  const memberTutorials = filteredTutorials.filter(t => !t.freeAccess);

  // Stats
  const stats = useMemo(() => ({
    total: ALL_TUTORIALS.length,
    free: ALL_TUTORIALS.filter(t => t.freeAccess).length,
    completed: progress.completedTutorials.length,
    inProgress: Object.keys(progress.tutorialProgress).filter(
      id => !progress.completedTutorials.includes(id)
    ).length
  }), [progress]);

  if (activeTutorial) {
    return (
      <TutorialViewer 
        tutorial={activeTutorial}
        progress={progress}
        onProgressUpdate={setProgress}
        onClose={() => setActiveTutorial(null)}
      />
    );
  }

  return (
    <div className={`tutorial-library ${compactMode ? 'compact' : ''}`}>
      {/* Header */}
      <div className="library-header">
        <h2>📚 Tutorial Library</h2>
        <p>Step-by-step guides to build real skills. {stats.free} free tutorials across all programmes.</p>
        
        {/* Progress Stats */}
        <div className="progress-stats">
          <div className="stat">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Tutorials</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="library-filters">
        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Programme Filter */}
        {showAllProgrammes && (
          <div className="programme-filters">
            <button 
              className={`filter-btn ${selectedProgramme === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedProgramme('all')}
            >
              All Programmes
            </button>
            {Object.values(PROGRAMMES).map(prog => (
              <button 
                key={prog.id}
                className={`filter-btn ${selectedProgramme === prog.id ? 'active' : ''}`}
                onClick={() => setSelectedProgramme(prog.id)}
                style={{ 
                  borderColor: selectedProgramme === prog.id ? prog.colour : undefined,
                  color: selectedProgramme === prog.id ? prog.colour : undefined
                }}
              >
                {prog.icon} {prog.name}
              </button>
            ))}
          </div>
        )}

        {/* Difficulty Filter */}
        <div className="difficulty-filters">
          <button 
            className={`diff-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedDifficulty('all')}
          >
            All Levels
          </button>
          {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(diff => (
            <button 
              key={diff}
              className={`diff-btn ${diff} ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>Showing {filteredTutorials.length} tutorials</span>
        {searchQuery && <span> for "{searchQuery}"</span>}
      </div>

      {/* Free Tutorials */}
      {freeTutorials.length > 0 && (
        <div className="tutorial-section">
          <h3 className="section-title free">🎁 Free Tutorials ({freeTutorials.length})</h3>
          <p className="section-description">Start learning right now. No signup required.</p>
          <div className="tutorial-grid">
            {freeTutorials.map(tutorial => (
              <TutorialCard 
                key={tutorial.id}
                tutorial={tutorial}
                progress={progress}
                onSelect={setActiveTutorial}
                showProgramme={selectedProgramme === 'all'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Members Tutorials */}
      {memberTutorials.length > 0 && (
        <div className="tutorial-section">
          <h3 className="section-title members">🔒 Members Only ({memberTutorials.length})</h3>
          <p className="section-description">Unlock all tutorials with membership from £15/month.</p>
          <div className="tutorial-grid">
            {memberTutorials.map(tutorial => (
              <TutorialCard 
                key={tutorial.id}
                tutorial={tutorial}
                progress={progress}
                onSelect={setActiveTutorial}
                showProgramme={selectedProgramme === 'all'}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredTutorials.length === 0 && (
        <div className="no-results">
          <span>🔍</span>
          <h3>No tutorials found</h3>
          <p>Try adjusting your filters or search term.</p>
          <button onClick={() => {
            setSelectedProgramme('all');
            setSelectedDifficulty('all');
            setSearchQuery('');
          }}>
            Clear Filters
          </button>
        </div>
      )}

      {/* Membership CTA */}
      <div className="membership-cta">
        <h3>Ready for the Full Library?</h3>
        <p>Unlock {stats.total - stats.free}+ advanced tutorials, live workshops, and direct support.</p>
        <div className="cta-features">
          <span>✓ All tutorials unlocked</span>
          <span>✓ Monthly live workshops</span>
          <span>✓ ROV guide support</span>
          <span>✓ Kit discounts</span>
        </div>
        <Link to="/membership" className="membership-btn">
          Join — £15/month
        </Link>
        <p className="sliding-scale">💚 Sliding scale available</p>
      </div>
    </div>
  );
};

export default TutorialLibrary;