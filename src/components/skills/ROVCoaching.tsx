// src/components/skills/ROVCoaching.tsx
import React, { useState, useEffect } from 'react';
import { ROVCoachingSession, ROVPersonality } from '../../types/skills';
import './ROVCoaching.css';

interface ROVCoachingProps {
  skillId: string;
  currentLevel: number;
  targetLevel: number;
  membershipTier: 'connector' | 'curator' | 'champion';
  onSessionComplete: (session: ROVCoachingSession) => void;
}

const ROVCoaching: React.FC<ROVCoachingProps> = ({
  skillId,
  currentLevel,
  targetLevel,
  membershipTier,
  onSessionComplete
}) => {
  const [activeSession, setActiveSession] = useState<ROVCoachingSession | null>(null);
  const [availableROVs, setAvailableROVs] = useState<ROVPersonality[]>([]);
  const [currentGuidance, setCurrentGuidance] = useState<string>('');
  const [sessionProgress, setSessionProgress] = useState(0);

  useEffect(() => {
    // Set available ROVs based on membership tier
    const rovsByTier = {
      connector: ['helper'],
      curator: ['helper', 'insight', 'pathfinder'],
      champion: ['helper', 'insight', 'pathfinder', 'justice']
    };
    setAvailableROVs(rovsByTier[membershipTier] as ROVPersonality[]);
  }, [membershipTier]);

  const startCoachingSession = (rovPersonality: ROVPersonality) => {
    const session: ROVCoachingSession = {
      id: `session_${Date.now()}`,
      userId: 'current-user', // Would come from auth context
      skillId,
      rovPersonality,
      startedAt: new Date(),
      duration: 0,
      guidance: [],
      exercises: [],
      progress: 0,
      status: 'active'
    };
    
    setActiveSession(session);
    setSessionProgress(0);
    generateInitialGuidance(rovPersonality);
  };

  const generateInitialGuidance = (rov: ROVPersonality) => {
    const guidanceByROV = {
      helper: `Welcome! I'm here to support your skill development journey. Let's start with some foundational exercises to build your confidence.`,
      insight: `I've analyzed your progress data. Based on your current level ${currentLevel}, I recommend focusing on pattern recognition and analytical thinking exercises.`,
      pathfinder: `I've mapped out an optimal learning path for you. We'll break down your goal into achievable milestones and tackle them systematically.`,
      justice: `As we develop your leadership skills, it's important to consider the ethical implications and community impact of your decisions.`
    };
    
    setCurrentGuidance(guidanceByROV[rov]);
  };

  const completeExercise = () => {
    if (!activeSession) return;
    
    const newProgress = Math.min(sessionProgress + 20, 100);
    setSessionProgress(newProgress);
    
    if (newProgress >= 100) {
      endSession();
    } else {
      generateProgressGuidance();
    }
  };

  const generateProgressGuidance = () => {
    const progressGuidance = [
      "Great progress! Let's try a more challenging exercise.",
      "You're building momentum. Here's the next step in your development.",
      "Excellent work! I can see your understanding deepening.",
      "Almost there! This final exercise will solidify your learning."
    ];
    
    const index = Math.floor(sessionProgress / 25);
    setCurrentGuidance(progressGuidance[index] || progressGuidance[progressGuidance.length - 1]);
  };

  const endSession = () => {
    if (!activeSession) return;
    
    const completedSession: ROVCoachingSession = {
      ...activeSession,
      endedAt: new Date(),
      duration: Math.floor((Date.now() - activeSession.startedAt.getTime()) / 1000),
      progress: sessionProgress,
      status: 'completed'
    };
    
    onSessionComplete(completedSession);
    setActiveSession(null);
    setSessionProgress(0);
    setCurrentGuidance('');
  };

  const getRovDescription = (rov: ROVPersonality) => {
    const descriptions = {
      helper: 'Supportive guidance and encouragement for building confidence',
      insight: 'Data-driven analysis and strategic recommendations',
      pathfinder: 'Goal-oriented planning and step-by-step navigation',
      justice: 'Ethical leadership development and community impact focus'
    };
    return descriptions[rov];
  };

  const getRovAvatar = (rov: ROVPersonality) => {
    const avatars = {
      helper: '🤝',
      insight: '📊',
      pathfinder: '🧭',
      justice: '⚖️'
    };
    return avatars[rov];
  };

  if (activeSession) {
    return (
      <div className="rov-coaching-session">
        <div className="session-header">
          <div className="rov-info">
            <span className="rov-avatar">{getRovAvatar(activeSession.rovPersonality)}</span>
            <h3>{activeSession.rovPersonality.toUpperCase()} ROV</h3>
          </div>
          <div className="session-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${sessionProgress}%` }}
              />
            </div>
            <span>{sessionProgress}% Complete</span>
          </div>
        </div>
        
        <div className="guidance-area">
          <div className="guidance-bubble">
            <p>{currentGuidance}</p>
          </div>
        </div>
        
        <div className="exercise-area">
          <div className="current-exercise">
            <h4>Practice Exercise</h4>
            <p>Complete this skill-building activity with ROV guidance:</p>
            <div className="exercise-actions">
              <button 
                className="complete-exercise-btn"
                onClick={completeExercise}
              >
                Complete Exercise
              </button>
            </div>
          </div>
        </div>
        
        <div className="session-actions">
          <button className="end-session-btn" onClick={endSession}>
            End Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rov-coaching-selector">
      <div className="coaching-header">
        <h3>Choose Your ROV Coach</h3>
        <p>Select an AI coaching personality to guide your skill development</p>
      </div>
      
      <div className="rov-grid">
        {availableROVs.map((rov) => (
          <div 
            key={rov}
            className="rov-card"
            onClick={() => startCoachingSession(rov)}
          >
            <div className="rov-avatar-large">{getRovAvatar(rov)}</div>
            <h4>{rov.toUpperCase()} ROV</h4>
            <p>{getRovDescription(rov)}</p>
            <button className="start-coaching-btn">
              Start Coaching Session
            </button>
          </div>
        ))}
      </div>
      
      {membershipTier === 'connector' && (
        <div className="upgrade-prompt">
          <p>Upgrade to Curator or Champion for access to advanced ROV coaches</p>
          <button className="upgrade-btn">Explore Upgrades</button>
        </div>
      )}
    </div>
  );
};

export default ROVCoaching;