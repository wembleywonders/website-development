/**
 * MAYA ONBOARD ROV
 * 
 * Guides new creators through their first steps at WW.
 * Personalizes the onboarding based on their interests and goals.
 * 
 * Philosophy: A warm welcome matters. Meet people where they are.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface OnboardProfile {
  id: string;
  name?: string;
  email?: string;
}

export interface OnboardAnswers {
  creativeInterest?: string[];
  experience?: 'beginner' | 'some' | 'experienced';
  goals?: string[];
  availability?: 'few-hours' | 'regular' | 'intensive';
  hasExistingWork?: boolean;
  preferredLearningStyle?: 'hands-on' | 'structured' | 'self-paced';
}

export interface ProgrammeRecommendation {
  id: string;
  name: string;
  icon: string;
  description: string;
  matchScore: number;
  matchReasons: string[];
  nextWorkshop?: string;
}

export interface MayaOnboardROVProps {
  profile: OnboardProfile;
  onComplete: (answers: OnboardAnswers, recommendation: ProgrammeRecommendation) => void;
  onSkip?: () => void;
}

// ============================================================
// PROGRAMME DATA
// ============================================================

const PROGRAMMES = [
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    description: 'Music production - beats, mixing, releasing tracks',
    interests: ['music', 'audio', 'beats', 'production'],
    skills: ['creativity', 'technology']
  },
  {
    id: 'kawanas-court',
    name: "Kaywana's Court",
    icon: '🎨',
    description: 'Design & fashion - visual identity, clothing, branding',
    interests: ['design', 'fashion', 'visual', 'art', 'clothing'],
    skills: ['creativity', 'visual']
  },
  {
    id: 'page-turners',
    name: 'PageTurners',
    icon: '✍️',
    description: 'Writing & content - articles, stories, copywriting',
    interests: ['writing', 'content', 'stories', 'journalism'],
    skills: ['creativity', 'communication']
  },
  {
    id: 'g-tech-casters',
    name: 'G-Tech Casters',
    icon: '🎬',
    description: 'Video production - filming, editing, streaming',
    interests: ['video', 'film', 'youtube', 'streaming', 'content'],
    skills: ['creativity', 'technology']
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    icon: '💻',
    description: 'Web development - coding, apps, tech projects',
    interests: ['coding', 'tech', 'web', 'apps', 'programming'],
    skills: ['technology', 'problem-solving']
  },
  {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🔬',
    description: 'STEM exploration - science, engineering, innovation',
    interests: ['science', 'engineering', 'stem', 'innovation'],
    skills: ['technology', 'problem-solving']
  }
];

// ============================================================
// QUESTIONS
// ============================================================

interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'single' | 'multi' | 'yesno';
  options: { value: string; label: string; icon?: string }[];
  field: keyof OnboardAnswers;
}

const QUESTIONS: Question[] = [
  {
    id: 'interests',
    text: "What kind of creative work excites you?",
    subtext: "Pick all that apply - there's no wrong answer!",
    type: 'multi',
    field: 'creativeInterest',
    options: [
      { value: 'music', label: 'Making music & beats', icon: '🎵' },
      { value: 'design', label: 'Design & visual art', icon: '🎨' },
      { value: 'fashion', label: 'Fashion & clothing', icon: '👗' },
      { value: 'writing', label: 'Writing & content', icon: '✍️' },
      { value: 'video', label: 'Video & film', icon: '🎬' },
      { value: 'coding', label: 'Coding & tech', icon: '💻' },
      { value: 'streaming', label: 'Streaming & gaming', icon: '🎮' },
      { value: 'unsure', label: "Not sure yet - I'm exploring", icon: '🔍' }
    ]
  },
  {
    id: 'experience',
    text: "How would you describe your experience?",
    type: 'single',
    field: 'experience',
    options: [
      { value: 'beginner', label: "I'm just starting out", icon: '🌱' },
      { value: 'some', label: "I've tried some things", icon: '🌿' },
      { value: 'experienced', label: 'I have solid experience', icon: '🌳' }
    ]
  },
  {
    id: 'goals',
    text: "What are you hoping to achieve?",
    subtext: "Pick your main goals",
    type: 'multi',
    field: 'goals',
    options: [
      { value: 'learn-skills', label: 'Learn new skills', icon: '📚' },
      { value: 'make-money', label: 'Earn from my creativity', icon: '💰' },
      { value: 'build-portfolio', label: 'Build a portfolio', icon: '📁' },
      { value: 'meet-people', label: 'Meet other creators', icon: '👥' },
      { value: 'have-fun', label: 'Have fun creating', icon: '🎉' },
      { value: 'career-change', label: 'Explore a career change', icon: '🚀' }
    ]
  },
  {
    id: 'availability',
    text: "How much time can you commit?",
    type: 'single',
    field: 'availability',
    options: [
      { value: 'few-hours', label: 'A few hours when I can', icon: '⏰' },
      { value: 'regular', label: 'Regular weekly sessions', icon: '📅' },
      { value: 'intensive', label: 'I can go intensive', icon: '🔥' }
    ]
  },
  {
    id: 'existing-work',
    text: "Do you have existing work to sell?",
    subtext: "Beats, designs, writing, code - anything you've made",
    type: 'yesno',
    field: 'hasExistingWork',
    options: [
      { value: 'true', label: 'Yes, I have stuff ready', icon: '✅' },
      { value: 'false', label: 'Not yet, I need to create', icon: '🔨' }
    ]
  }
];

// ============================================================
// RECOMMENDATION LOGIC
// ============================================================

function getRecommendations(answers: OnboardAnswers): ProgrammeRecommendation[] {
  return PROGRAMMES.map(programme => {
    let score = 0;
    const reasons: string[] = [];
    
    // Match interests
    const interests = answers.creativeInterest || [];
    const matchedInterests = programme.interests.filter(i => 
      interests.some(ui => ui.toLowerCase().includes(i) || i.includes(ui.toLowerCase()))
    );
    
    if (matchedInterests.length > 0) {
      score += matchedInterests.length * 25;
      reasons.push(`Matches your interest in ${matchedInterests.join(', ')}`);
    }
    
    // Beginner-friendly programmes
    if (answers.experience === 'beginner') {
      if (['trubble-n-bass', 'kawanas-court', 'page-turners'].includes(programme.id)) {
        score += 10;
        reasons.push('Great for beginners');
      }
    }
    
    // Goal alignment
    const goals = answers.goals || [];
    if (goals.includes('make-money') && answers.hasExistingWork) {
      score += 15;
      reasons.push('Fast path to marketplace');
    }
    
    if (goals.includes('career-change')) {
      if (['techreneurs', 'g-tech-casters'].includes(programme.id)) {
        score += 15;
        reasons.push('Strong career potential');
      }
    }
    
    return {
      id: programme.id,
      name: programme.name,
      icon: programme.icon,
      description: programme.description,
      matchScore: Math.min(score, 100),
      matchReasons: reasons
    };
  })
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 3);
}

// ============================================================
// COMPONENT
// ============================================================

export const MayaOnboardROV: React.FC<MayaOnboardROVProps> = ({
  profile,
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardAnswers>({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const currentQuestion = QUESTIONS[step];
  const isLastQuestion = step === QUESTIONS.length - 1;
  
  const handleAnswer = (value: string | string[]) => {
    const field = currentQuestion.field;
    
    if (currentQuestion.type === 'yesno') {
      setAnswers(prev => ({ ...prev, [field]: value === 'true' }));
    } else if (currentQuestion.type === 'multi') {
      const current = (answers[field] as string[]) || [];
      const newValue = Array.isArray(value) ? value : 
        current.includes(value) 
          ? current.filter(v => v !== value)
          : [...current, value];
      setAnswers(prev => ({ ...prev, [field]: newValue }));
    } else {
      setAnswers(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      setShowRecommendations(true);
    } else {
      setStep(s => s + 1);
    }
  };
  
  const handleBack = () => {
    if (showRecommendations) {
      setShowRecommendations(false);
    } else if (step > 0) {
      setStep(s => s - 1);
    }
  };
  
  const recommendations = getRecommendations(answers);
  
  const currentAnswer = currentQuestion ? answers[currentQuestion.field] : null;
  const canProceed = currentQuestion?.type === 'multi' 
    ? (currentAnswer as string[] || []).length > 0
    : !!currentAnswer;
  
  return (
    <div className="maya-onboard-rov">
      <div className="maya-onboard-rov__header">
        <div className="maya-avatar">
          <span>🌟</span>
        </div>
        <div className="maya-intro">
          <h2>Hi{profile.name ? ` ${profile.name}` : ''}! I'm Maya</h2>
          <p>Let me help you find your path at Wembley Wonders</p>
        </div>
      </div>
      
      {/* Progress */}
      {!showRecommendations && (
        <div className="maya-onboard-rov__progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <span className="progress-text">
            Question {step + 1} of {QUESTIONS.length}
          </span>
        </div>
      )}
      
      {/* Question */}
      {!showRecommendations && currentQuestion && (
        <div className="maya-onboard-rov__question">
          <h3>{currentQuestion.text}</h3>
          {currentQuestion.subtext && (
            <p className="question-subtext">{currentQuestion.subtext}</p>
          )}
          
          <div className={`options-grid options-grid--${currentQuestion.type}`}>
            {currentQuestion.options.map(option => {
              const isSelected = currentQuestion.type === 'multi'
                ? (currentAnswer as string[] || []).includes(option.value)
                : currentAnswer === option.value;
              
              return (
                <button
                  key={option.value}
                  className={`option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.icon && <span className="option-icon">{option.icon}</span>}
                  <span className="option-label">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Recommendations */}
      {showRecommendations && (
        <div className="maya-onboard-rov__recommendations">
          <h3>🎯 Based on what you've told me...</h3>
          
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <div 
                key={rec.id}
                className={`recommendation-card ${index === 0 ? 'recommendation-card--top' : ''}`}
                onClick={() => onComplete(answers, rec)}
              >
                <div className="recommendation-header">
                  <span className="rec-icon">{rec.icon}</span>
                  <div className="rec-info">
                    <h4>{rec.name}</h4>
                    <p>{rec.description}</p>
                  </div>
                  {index === 0 && (
                    <span className="best-match-badge">Best Match</span>
                  )}
                </div>
                
                <div className="recommendation-reasons">
                  {rec.matchReasons.map((reason, i) => (
                    <span key={i} className="reason">✓ {reason}</span>
                  ))}
                </div>
                
                <button className="select-btn">
                  {index === 0 ? "Let's Start Here →" : "Choose This →"}
                </button>
              </div>
            ))}
          </div>
          
          <p className="explore-note">
            💡 You can always explore other programmes later. This is just a starting point!
          </p>
        </div>
      )}
      
      {/* Navigation */}
      <div className="maya-onboard-rov__nav">
        {(step > 0 || showRecommendations) && (
          <button className="nav-btn nav-btn--back" onClick={handleBack}>
            ← Back
          </button>
        )}
        
        {!showRecommendations && (
          <button 
            className="nav-btn nav-btn--next"
            onClick={handleNext}
            disabled={!canProceed}
          >
            {isLastQuestion ? 'See My Recommendations' : 'Next →'}
          </button>
        )}
        
        {onSkip && !showRecommendations && (
          <button className="nav-btn nav-btn--skip" onClick={onSkip}>
            Skip for now
          </button>
        )}
      </div>
      
      <div className="maya-onboard-rov__footer">
        <p>
          💚 No pressure. We're here to help you explore and grow at your own pace.
        </p>
      </div>
    </div>
  );
};

export default MayaOnboardROV;