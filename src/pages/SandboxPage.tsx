// src/pages/SandboxPage.tsx
// SELF-CONTAINED - No external component dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SandboxPage.css';

// ============================================
// TYPES
// ============================================

type SandboxStep = 'choose' | 'create' | 'preview' | 'complete';

interface Creation {
  id: string;
  type: string;
  title: string;
  content: string;
  wordCount: number;
  createdAt: Date;
}

interface Template {
  id: string;
  icon: string;
  title: string;
  description: string;
  placeholder: string;
  tip: string;
}

// ============================================
// TEMPLATES
// ============================================

const TEMPLATES: Template[] = [
  {
    id: 'social-post',
    icon: '📱',
    title: 'Social Media Post',
    description: 'Create a viral-worthy post for any platform',
    placeholder: 'Write something that makes people stop scrolling...',
    tip: 'Hook them in the first line. What would make YOU stop scrolling?'
  },
  {
    id: 'story-starter',
    icon: '✍️',
    title: 'Story Starter',
    description: 'Begin an amazing story with a killer opening',
    placeholder: 'Once upon a time... or maybe start with action!',
    tip: 'The best stories drop you right into the action. No slow intros!'
  },
  {
    id: 'business-idea',
    icon: '💡',
    title: 'Business Idea',
    description: 'Capture your next big entrepreneurial concept',
    placeholder: 'What problem does your idea solve?',
    tip: 'Every great business solves a real problem. What frustrates YOU?'
  },
  {
    id: 'project-plan',
    icon: '📋',
    title: 'Project Plan',
    description: 'Outline your next creative or technical project',
    placeholder: "What are you building? What's the first step?",
    tip: 'Break it down! Big projects are just lots of small tasks.'
  },
  {
    id: 'recipe-remix',
    icon: '🍲',
    title: 'Recipe Remix',
    description: 'Put your spin on a family recipe or create something new',
    placeholder: "What's the dish? What makes YOUR version special?",
    tip: 'The secret ingredient is always the story behind it!'
  },
  {
    id: 'podcast-pitch',
    icon: '🎙️',
    title: 'Podcast Episode',
    description: 'Plan a podcast episode or show concept',
    placeholder: "What's your episode about? Who's your guest?",
    tip: 'Great podcasts feel like eavesdropping on a fascinating conversation.'
  },
  {
    id: 'radio-drama',
    icon: '📻',
    title: 'Radio Drama Scene',
    description: 'Write a short dramatic scene for audio',
    placeholder: 'Set the scene, then let your characters speak...',
    tip: 'In radio drama, every sound tells a story. What do we hear?'
  },
  {
    id: 'journal-reflection',
    icon: '📔',
    title: 'Journal Entry',
    description: 'Reflect on your day, goals, or creative process',
    placeholder: 'What happened today? How did it make you feel?',
    tip: 'Honesty is the only rule. This is just for you.'
  }
];

const ROV_TIPS: string[] = [
  "Just pick something and start. You can't break anything!",
  "The best creators start by playing, not planning.",
  "Don't worry about perfection — that's what iteration is for.",
  "Every masterpiece started as a rough draft.",
  "Your first idea doesn't have to be your best idea.",
  "Creating something 'bad' is better than creating nothing.",
];

// ============================================
// MAIN COMPONENT
// ============================================

const SandboxPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [step, setStep] = useState<SandboxStep>('choose');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [creations, setCreations] = useState<Creation[]>([]);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [rovTipIndex, setRovTipIndex] = useState(0);

  // Rotate ROV tips
  useEffect(() => {
    const interval = setInterval(() => {
      setRovTipIndex((prev) => (prev + 1) % ROV_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Load any saved creations from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('ww_sandbox_creations');
    if (saved) {
      try {
        setCreations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved creations', e);
      }
    }
  }, []);

  // Save creations to sessionStorage
  const saveCreation = useCallback((creation: Creation) => {
    const updated = [...creations, creation];
    setCreations(updated);
    sessionStorage.setItem('ww_sandbox_creations', JSON.stringify(updated));
    sessionStorage.setItem('ww_sandbox_latest', JSON.stringify(creation));
  }, [creations]);

  // Handlers
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setTitle('');
    setContent('');
    setStep('create');
  };

  const handlePreview = () => {
    if (title.trim() && content.trim()) {
      setStep('preview');
    }
  };

  const handleComplete = () => {
    const creation: Creation = {
      id: `creation-${Date.now()}`,
      type: selectedTemplate?.id || 'unknown',
      title: title.trim(),
      content: content.trim(),
      wordCount: content.trim().split(/\s+/).filter(Boolean).length,
      createdAt: new Date(),
    };
    
    saveCreation(creation);
    setStep('complete');
    
    // Show conversion modal after first creation
    if (creations.length === 0) {
      setTimeout(() => setShowConversionModal(true), 1500);
    }
  };

  const handleReset = () => {
    setStep('choose');
    setSelectedTemplate(null);
    setTitle('');
    setContent('');
  };

  const handleSaveAndSignup = () => {
    navigate('/signup?from=sandbox');
  };

  const totalWordCount = creations.reduce((sum, c) => sum + c.wordCount, 0);
  const currentWordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="sandbox-page">
      {/* Hero Section */}
      <section className="sandbox-hero">
        <div className="sandbox-hero-content">
          <h1 className="sandbox-title">
            <span className="title-icon">🎨</span>
            Create Something Right Now
          </h1>
          <p className="sandbox-subtitle">
            No signup. No commitment. Just pick a template and start creating.
            <br />
            <span className="sandbox-highlight">Takes about 60 seconds.</span>
          </p>
        </div>

        {/* ROV Guide */}
        <div className="sandbox-rov">
          <div className="rov-avatar">
            <span className="rov-emoji">🎨</span>
          </div>
          <div className="rov-content">
            <span className="rov-name">The Experimenter</span>
            <p className="rov-tip">{ROV_TIPS[rovTipIndex]}</p>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="sandbox-progress">
        <div className={`progress-step ${step === 'choose' ? 'active' : ''} ${['create', 'preview', 'complete'].includes(step) ? 'completed' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Choose</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'create' ? 'active' : ''} ${['preview', 'complete'].includes(step) ? 'completed' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Create</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'preview' ? 'active' : ''} ${step === 'complete' ? 'completed' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Preview</span>
        </div>
        <div className="progress-line" />
        <div className={`progress-step ${step === 'complete' ? 'active completed' : ''}`}>
          <span className="step-number">4</span>
          <span className="step-label">Done!</span>
        </div>
      </div>

      {/* Stats Bar (if has creations) */}
      {creations.length > 0 && step === 'choose' && (
        <div className="sandbox-stats-bar">
          <span>🎉 You've created {creations.length} {creations.length === 1 ? 'thing' : 'things'}</span>
          <span>•</span>
          <span>📝 {totalWordCount} words</span>
        </div>
      )}

      {/* Main Content */}
      <main className="sandbox-main">
        
        {/* Step 1: Choose Template */}
        {step === 'choose' && (
          <section className="sandbox-step step-choose">
            <h2 className="step-title">What do you want to create?</h2>
            <div className="template-grid">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  className="template-card"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <span className="template-icon">{template.icon}</span>
                  <h3 className="template-title">{template.title}</h3>
                  <p className="template-description">{template.description}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Create */}
        {step === 'create' && selectedTemplate && (
          <section className="sandbox-step step-create">
            <div className="create-header">
              <button className="back-btn" onClick={() => setStep('choose')}>
                ← Back
              </button>
              <div className="create-template-info">
                <span className="template-icon-small">{selectedTemplate.icon}</span>
                <span>{selectedTemplate.title}</span>
              </div>
            </div>

            <div className="create-form">
              <div className="form-group">
                <label htmlFor="creation-title">Give it a title</label>
                <input
                  id="creation-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My awesome creation..."
                  maxLength={100}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="creation-content">Now create!</label>
                <textarea
                  id="creation-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={selectedTemplate.placeholder}
                  rows={8}
                  maxLength={2000}
                />
                <div className="form-footer">
                  <span className="char-count">
                    {content.length} / 2000 characters
                  </span>
                  <span className="word-count">
                    {currentWordCount} words
                  </span>
                </div>
              </div>

              {/* ROV Tip */}
              <div className="create-rov-tip">
                <span className="tip-icon">💡</span>
                <p>{selectedTemplate.tip}</p>
              </div>

              <div className="create-actions">
                <button
                  className="preview-btn"
                  onClick={handlePreview}
                  disabled={!title.trim() || !content.trim()}
                >
                  Preview →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && selectedTemplate && (
          <section className="sandbox-step step-preview">
            <div className="preview-header">
              <button className="back-btn" onClick={() => setStep('create')}>
                ← Edit
              </button>
              <h2>Looking good!</h2>
            </div>

            <div className="preview-card">
              <div className="preview-badge">
                <span>{selectedTemplate.icon}</span>
                <span>{selectedTemplate.title}</span>
              </div>
              <h3 className="preview-title">{title}</h3>
              <div className="preview-content">
                {content.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              <div className="preview-meta">
                <span>Created just now</span>
                <span>•</span>
                <span>By You</span>
                <span>•</span>
                <span>{currentWordCount} words</span>
              </div>
            </div>

            <div className="preview-actions">
              <button className="complete-btn" onClick={handleComplete}>
                Looks great! ✨
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <section className="sandbox-step step-complete">
            <div className="complete-celebration">
              <span className="celebration-emoji">🎉</span>
              <h2>You created something!</h2>
              <p className="celebration-subtitle">
                In about 60 seconds, you went from nothing to something real.
                <br />
                <strong>Imagine what you could create with the full toolkit.</strong>
              </p>
            </div>

            {/* ROV Handoff */}
            <div className="complete-rov">
              <div className="rov-avatar archivist">
                <span className="rov-emoji">📚</span>
              </div>
              <div className="rov-content">
                <span className="rov-name">The Archivist</span>
                <p className="rov-message">
                  Great work! I'm the Archivist - I help creators save and organise their work.
                  Sign up free to save this to your Creator's Journal.
                </p>
              </div>
            </div>

            {/* Journey Preview */}
            <div className="complete-next">
              <h3>Your Creator Journey</h3>
              <div className="journey-preview">
                <div className="journey-step completed">
                  <span className="journey-icon">✅</span>
                  <span className="journey-label">Sandbox</span>
                  <span className="journey-status">Done!</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step next">
                  <span className="journey-icon">📔</span>
                  <span className="journey-label">Journal</span>
                  <span className="journey-status">Save work</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step">
                  <span className="journey-icon">🔧</span>
                  <span className="journey-label">Impact Lab</span>
                  <span className="journey-status">Refine</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step">
                  <span className="journey-icon">🏆</span>
                  <span className="journey-label">Certify</span>
                  <span className="journey-status">Verify</span>
                </div>
                <div className="journey-arrow">→</div>
                <div className="journey-step">
                  <span className="journey-icon">💰</span>
                  <span className="journey-label">Sell</span>
                  <span className="journey-status">Earn 55%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="complete-actions">
              <button className="save-btn primary" onClick={handleSaveAndSignup}>
                💾 Save This & Sign Up Free
              </button>
              <button className="try-again-btn" onClick={handleReset}>
                Create something else
              </button>
            </div>

            <p className="complete-trust">
              🔒 Free to join • No credit card required • Your data stays yours
            </p>
          </section>
        )}

      </main>

      {/* Trust Indicators */}
      <section className="sandbox-trust">
        <div className="trust-items">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>No account needed to try</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <span>Takes 60 seconds</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💾</span>
            <span>Sign up to save your work</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💰</span>
            <span>Creators keep 55% of sales</span>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="sandbox-explore">
        <h2>Want to explore more?</h2>
        <div className="explore-links">
          <Link to="/creator-pathways" className="explore-link">
            <span className="explore-icon">🗺️</span>
            <span>See the full Creator Journey</span>
          </Link>
          <Link to="/programmes" className="explore-link">
            <span className="explore-icon">🚀</span>
            <span>Browse Creator Spaces</span>
          </Link>
          <Link to="/about" className="explore-link">
            <span className="explore-icon">💡</span>
            <span>Learn about Wembley Wonders</span>
          </Link>
        </div>
      </section>

      {/* Conversion Modal */}
      {showConversionModal && (
        <div className="conversion-modal-overlay" onClick={() => setShowConversionModal(false)}>
          <div className="conversion-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowConversionModal(false)}>×</button>
            
            <div className="modal-rov">
              <div className="rov-avatar archivist">
                <span className="rov-emoji">📚</span>
              </div>
            </div>
            
            <h2>Don't lose what you've created!</h2>
            
            <p className="modal-preview">
              "{title}" - {currentWordCount} words
            </p>
            
            <ul className="modal-benefits">
              <li>💾 Save to your Creator's Journal</li>
              <li>🛠️ Access the full creator toolkit</li>
              <li>🤝 Get guidance from specialist mentors</li>
              <li>💰 Eventually sell your work (55% to you)</li>
            </ul>
            
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveAndSignup}>
                Save & Sign Up Free
              </button>
              <button className="btn-secondary" onClick={() => setShowConversionModal(false)}>
                Maybe later
              </button>
            </div>
            
            <p className="modal-trust">
              🔒 Free to join • No credit card required
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SandboxPage;
