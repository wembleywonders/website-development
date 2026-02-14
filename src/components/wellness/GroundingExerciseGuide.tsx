/**
 * Grounding Exercise Component
 * ============================
 * 
 * Guides users through grounding exercises step-by-step
 * Used by Mindful ROV specialist
 * 
 * Features:
 * - Mood check-in to suggest appropriate exercises
 * - Timed steps with progress indicator
 * - Breathing phase visualisation
 * - Audio-ready structure (for future TTS)
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GROUNDING_EXERCISES,
  MOOD_OPTIONS,
  getExercise,
  getExercisesForMood,
  getQuickExercises,
  type GroundingExercise,
  type GroundingStep,
  type MoodCheckIn
} from '../../data/wellness/groundingExercises';

// ============================================
// TYPES
// ============================================

interface GroundingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
  initialExerciseId?: string;
  skipMoodCheck?: boolean;
}

type ViewState = 'mood-check' | 'exercise-select' | 'exercise-active' | 'complete';

// ============================================
// SUB-COMPONENTS
// ============================================

/**
 * Mood Check-In Screen
 */
const MoodCheckIn: React.FC<{
  onSelectMood: (mood: MoodCheckIn) => void;
  onSkip: () => void;
}> = ({ onSelectMood, onSkip }) => {
  return (
    <div className="grounding__mood-check">
      <h2 className="grounding__title">How are you feeling?</h2>
      <p className="grounding__subtitle">
        This helps me suggest the right exercise for you.
      </p>
      
      <div className="grounding__mood-grid">
        {MOOD_OPTIONS.map(mood => (
          <button
            key={mood.id}
            className="grounding__mood-button"
            onClick={() => onSelectMood(mood)}
          >
            <span className="grounding__mood-emoji">{mood.emoji}</span>
            <span className="grounding__mood-label">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <button 
        className="grounding__skip-button"
        onClick={onSkip}
      >
        Skip — show me all exercises
      </button>
    </div>
  );
};

/**
 * Exercise Selection Screen
 */
const ExerciseSelector: React.FC<{
  exercises: GroundingExercise[];
  mood?: MoodCheckIn | null;
  onSelectExercise: (exercise: GroundingExercise) => void;
  onBack: () => void;
}> = ({ exercises, mood, onSelectExercise, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'breathing' | 'sensory' | 'movement' | 'cognitive'>('all');
  
  const filteredExercises = filter === 'all' 
    ? exercises 
    : exercises.filter(ex => ex.category === filter);

  return (
    <div className="grounding__exercise-select">
      {mood && (
        <div className="grounding__mood-response">
          <p>{mood.followUp}</p>
        </div>
      )}
      
      <h2 className="grounding__title">Choose an exercise</h2>
      
      {/* Category filters */}
      <div className="grounding__filters">
        <button 
          className={`grounding__filter ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`grounding__filter ${filter === 'breathing' ? 'active' : ''}`}
          onClick={() => setFilter('breathing')}
        >
          😮‍💨 Breathing
        </button>
        <button 
          className={`grounding__filter ${filter === 'sensory' ? 'active' : ''}`}
          onClick={() => setFilter('sensory')}
        >
          🖐️ Sensory
        </button>
        <button 
          className={`grounding__filter ${filter === 'movement' ? 'active' : ''}`}
          onClick={() => setFilter('movement')}
        >
          💪 Movement
        </button>
        <button 
          className={`grounding__filter ${filter === 'cognitive' ? 'active' : ''}`}
          onClick={() => setFilter('cognitive')}
        >
          🧠 Cognitive
        </button>
      </div>
      
      {/* Exercise cards */}
      <div className="grounding__exercise-grid">
        {filteredExercises.map(exercise => (
          <button
            key={exercise.id}
            className="grounding__exercise-card"
            onClick={() => onSelectExercise(exercise)}
          >
            <span className="grounding__exercise-icon">{exercise.icon}</span>
            <div className="grounding__exercise-info">
              <h3 className="grounding__exercise-name">{exercise.name}</h3>
              <p className="grounding__exercise-description">{exercise.description}</p>
              <div className="grounding__exercise-meta">
                <span className="grounding__exercise-duration">⏱️ {exercise.duration}</span>
                <span className="grounding__exercise-difficulty">{exercise.difficulty}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <button className="grounding__back-button" onClick={onBack}>
        ← Back
      </button>
    </div>
  );
};

/**
 * Breathing Phase Indicator
 */
const BreathingIndicator: React.FC<{
  phase?: GroundingStep['breathPhase'];
  duration: number;
}> = ({ phase, duration }) => {
  if (!phase) return null;
  
  const phaseConfig = {
    inhale: { label: 'BREATHE IN', color: '#60A5FA', scale: 1.3 },
    hold: { label: 'HOLD', color: '#A78BFA', scale: 1.3 },
    exhale: { label: 'BREATHE OUT', color: '#34D399', scale: 1 },
    rest: { label: 'HOLD EMPTY', color: '#F472B6', scale: 1 }
  };
  
  const config = phaseConfig[phase];
  
  return (
    <div className="grounding__breathing-indicator">
      <div 
        className={`grounding__breathing-circle grounding__breathing-circle--${phase}`}
        style={{
          backgroundColor: config.color,
          transform: `scale(${config.scale})`,
          transition: `transform ${duration}s ease-in-out`
        }}
      >
        <span className="grounding__breathing-label">{config.label}</span>
      </div>
    </div>
  );
};

/**
 * Active Exercise Screen
 */
const ActiveExercise: React.FC<{
  exercise: GroundingExercise;
  onComplete: () => void;
  onExit: () => void;
}> = ({ exercise, onComplete, onExit }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentStep = exercise.steps[currentStepIndex];
  const isLastStep = currentStepIndex === exercise.steps.length - 1;
  const progress = ((currentStepIndex + 1) / exercise.steps.length) * 100;
  
  // Initialize step timer
  useEffect(() => {
    if (currentStep.duration) {
      setTimeRemaining(currentStep.duration);
    }
  }, [currentStepIndex, currentStep.duration]);
  
  // Countdown timer
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;
    
    timerRef.current = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeRemaining, isPaused]);
  
  // Auto-advance when timer reaches 0
  useEffect(() => {
    if (timeRemaining === 0 && currentStep.duration && !isPaused) {
      if (isLastStep) {
        onComplete();
      } else {
        handleNext();
      }
    }
  }, [timeRemaining]);
  
  const handleNext = useCallback(() => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [isLastStep, onComplete]);
  
  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);
  
  const handlePauseToggle = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);
  
  return (
    <div className="grounding__active">
      {/* Header */}
      <header className="grounding__active-header">
        <button 
          className="grounding__exit-button"
          onClick={onExit}
          aria-label="Exit exercise"
        >
          ✕
        </button>
        <h2 className="grounding__exercise-title">{exercise.name}</h2>
        <span className="grounding__step-counter">
          {currentStepIndex + 1} / {exercise.steps.length}
        </span>
      </header>
      
      {/* Progress bar */}
      <div className="grounding__progress-bar">
        <div 
          className="grounding__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Main content */}
      <div className="grounding__active-content">
        {/* Breathing indicator (if applicable) */}
        {currentStep.breathPhase && (
          <BreathingIndicator 
            phase={currentStep.breathPhase}
            duration={currentStep.duration || 4}
          />
        )}
        
        {/* Instruction */}
        <p className="grounding__instruction">
          {currentStep.instruction}
        </p>
        
        {/* Timer */}
        {currentStep.duration && (
          <div className="grounding__timer">
            <span className="grounding__timer-value">{timeRemaining}</span>
            <span className="grounding__timer-label">seconds</span>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="grounding__controls">
        <button
          className="grounding__control-button grounding__control-button--secondary"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          ← Previous
        </button>
        
        <button
          className="grounding__control-button grounding__control-button--pause"
          onClick={handlePauseToggle}
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        
        <button
          className="grounding__control-button grounding__control-button--primary"
          onClick={handleNext}
        >
          {isLastStep ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

/**
 * Completion Screen
 */
const CompletionScreen: React.FC<{
  exercise: GroundingExercise;
  onAnotherExercise: () => void;
  onClose: () => void;
}> = ({ exercise, onAnotherExercise, onClose }) => {
  return (
    <div className="grounding__complete">
      <div className="grounding__complete-icon">✨</div>
      <h2 className="grounding__complete-title">Well done</h2>
      <p className="grounding__complete-message">
        {exercise.completionMessage}
      </p>
      
      <div className="grounding__complete-actions">
        <button
          className="grounding__button grounding__button--primary"
          onClick={onClose}
        >
          I'm feeling better
        </button>
        <button
          className="grounding__button grounding__button--secondary"
          onClick={onAnotherExercise}
        >
          Try another exercise
        </button>
      </div>
      
      <p className="grounding__complete-note">
        Remember: You can come back to these exercises anytime. 
        They work better with practice.
      </p>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const GroundingExerciseGuide: React.FC<GroundingExerciseProps> = ({
  isOpen,
  onClose,
  initialExerciseId,
  skipMoodCheck = false
}) => {
  const [view, setView] = useState<ViewState>(
    skipMoodCheck ? 'exercise-select' : 'mood-check'
  );
  const [selectedMood, setSelectedMood] = useState<MoodCheckIn | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<GroundingExercise | null>(null);
  const [availableExercises, setAvailableExercises] = useState<GroundingExercise[]>(GROUNDING_EXERCISES);
  
  // Handle initial exercise
  useEffect(() => {
    if (initialExerciseId) {
      const exercise = getExercise(initialExerciseId);
      if (exercise) {
        setSelectedExercise(exercise);
        setView('exercise-active');
      }
    }
  }, [initialExerciseId]);
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && !initialExerciseId) {
      setView(skipMoodCheck ? 'exercise-select' : 'mood-check');
      setSelectedMood(null);
      setSelectedExercise(null);
      setAvailableExercises(GROUNDING_EXERCISES);
    }
  }, [isOpen, initialExerciseId, skipMoodCheck]);
  
  const handleMoodSelect = (mood: MoodCheckIn) => {
    setSelectedMood(mood);
    const exercises = getExercisesForMood(mood.id);
    setAvailableExercises(exercises.length > 0 ? exercises : GROUNDING_EXERCISES);
    setView('exercise-select');
  };
  
  const handleSkipMoodCheck = () => {
    setAvailableExercises(GROUNDING_EXERCISES);
    setView('exercise-select');
  };
  
  const handleExerciseSelect = (exercise: GroundingExercise) => {
    setSelectedExercise(exercise);
    setView('exercise-active');
  };
  
  const handleExerciseComplete = () => {
    setView('complete');
  };
  
  const handleExerciseExit = () => {
    setView('exercise-select');
    setSelectedExercise(null);
  };
  
  const handleAnotherExercise = () => {
    setView('exercise-select');
    setSelectedExercise(null);
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="grounding-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="grounding-title"
    >
      <div 
        className="grounding-modal"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button (except during active exercise) */}
        {view !== 'exercise-active' && (
          <button 
            className="grounding__close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        )}
        
        {/* View Router */}
        {view === 'mood-check' && (
          <MoodCheckIn 
            onSelectMood={handleMoodSelect}
            onSkip={handleSkipMoodCheck}
          />
        )}
        
        {view === 'exercise-select' && (
          <ExerciseSelector
            exercises={availableExercises}
            mood={selectedMood}
            onSelectExercise={handleExerciseSelect}
            onBack={() => setView('mood-check')}
          />
        )}
        
        {view === 'exercise-active' && selectedExercise && (
          <ActiveExercise
            exercise={selectedExercise}
            onComplete={handleExerciseComplete}
            onExit={handleExerciseExit}
          />
        )}
        
        {view === 'complete' && selectedExercise && (
          <CompletionScreen
            exercise={selectedExercise}
            onAnotherExercise={handleAnotherExercise}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default GroundingExerciseGuide;