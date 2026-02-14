// src/components/sandboxes/mini/MiniSandboxBase.tsx
// Base component for all mini-sandboxes with shared constraints UI

import React, { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Target, CheckCircle, AlertTriangle, Award } from 'lucide-react';
import './MiniSandbox.css';

export interface SandboxConstraints {
  timeLimit?: number;      // seconds
  maxLength?: number;      // words or items
  minItems?: number;       // minimum required
  maxItems?: number;       // maximum allowed
}

export interface SandboxPrompt {
  title: string;
  instruction: string;
  tips?: string[];
  example?: string;
}

export interface SandboxResult {
  success: boolean;
  data: Record<string, unknown>;
  feedback: string;
}

export interface MiniSandboxBaseProps {
  title: string;
  emoji: string;
  programme: string;
  constraints: SandboxConstraints;
  prompt: SandboxPrompt;
  onComplete: () => SandboxResult;
  color?: string;
  children: ReactNode;
}

// Exported constraint meter component
export const ConstraintMeter: React.FC<{
  current: number;
  max: number;
  label: string;
  color?: string;
}> = ({ current, max, label, color = '#06b6d4' }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isOver = current > max;

  return (
    <div className="constraint-meter">
      <div className="constraint-meter__header">
        <span>{label}</span>
        <span className={isOver ? 'over' : ''}>
          {current}/{max}
        </span>
      </div>
      <div className="constraint-meter__track">
        <div 
          className={`constraint-meter__fill ${isOver ? 'over' : ''}`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: isOver ? '#ef4444' : color
          }}
        />
      </div>
    </div>
  );
};

// Exported session timer component
export const SessionTimer: React.FC<{
  seconds: number;
  limit?: number;
  onTimeUp?: () => void;
}> = ({ seconds, limit, onTimeUp }) => {
  const isOver = limit ? seconds > limit : false;
  const remaining = limit ? Math.max(limit - seconds, 0) : seconds;

  useEffect(() => {
    if (limit && seconds >= limit && onTimeUp) {
      onTimeUp();
    }
  }, [seconds, limit, onTimeUp]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`session-timer ${isOver ? 'over' : ''}`}>
      <Clock size={16} />
      <span>
        {limit ? formatTime(remaining) : formatTime(seconds)}
        {limit && !isOver && ' remaining'}
        {isOver && ' over!'}
      </span>
    </div>
  );
};

const MiniSandboxBase: React.FC<MiniSandboxBaseProps> = ({
  title,
  emoji,
  programme,
  constraints,
  prompt,
  onComplete,
  color = '#06b6d4',
  children
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);
  const [showTips, setShowTips] = useState(true);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    const completionResult = onComplete();
    setResult(completionResult);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsCompleted(false);
    setResult(null);
  };

  const isTimeOver = constraints.timeLimit ? elapsedTime > constraints.timeLimit : false;

  return (
    <div className="mini-sandbox" style={{ borderColor: color }}>
      {/* Header */}
      <header className="mini-sandbox__header">
        <Link to="/sandbox" className="mini-sandbox__back">
          <ArrowLeft size={18} />
        </Link>
        <span className="mini-sandbox__emoji">{emoji}</span>
        <div className="mini-sandbox__title-area">
          <h2>{title}</h2>
          <span className="mini-sandbox__programme" style={{ color }}>{programme}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="mini-sandbox__content">
        {/* Constraints */}
        <div className="mini-sandbox__constraints">
          {constraints.timeLimit && (
            <div className={`mini-sandbox__constraint ${isTimeOver ? 'over' : ''}`}>
              <Clock size={14} />
              <span>
                {Math.max(constraints.timeLimit - elapsedTime, 0)}s 
                {isTimeOver ? ' over!' : ' left'}
              </span>
            </div>
          )}
          {constraints.maxLength && (
            <div className="mini-sandbox__constraint">
              <Target size={14} />
              <span>Max {constraints.maxLength}</span>
            </div>
          )}
          {constraints.minItems && (
            <div className="mini-sandbox__constraint">
              <Target size={14} />
              <span>Min {constraints.minItems}</span>
            </div>
          )}
        </div>

        {/* Prompt */}
        {!isCompleted && (
          <div className="mini-sandbox__prompt">
            <h3>{prompt.title}</h3>
            <p>{prompt.instruction}</p>
            
            {showTips && prompt.tips && prompt.tips.length > 0 && (
              <div className="mini-sandbox__tips">
                <ul>
                  {prompt.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Children (sandbox-specific content) */}
        {!isCompleted ? (
          children
        ) : (
          /* Completion Result */
          <div className="mini-sandbox__result">
            <div className={`mini-sandbox__result-icon ${result?.success ? 'success' : 'try-again'}`}>
              {result?.success ? (
                <Award size={48} />
              ) : (
                <AlertTriangle size={48} />
              )}
            </div>
            
            <h3 className="mini-sandbox__result-title">
              {result?.success ? '🎉 Nice Work!' : '💪 Keep Going!'}
            </h3>
            
            <p className="mini-sandbox__result-feedback">
              {result?.feedback}
            </p>

            <div className="mini-sandbox__result-stats">
              <div className="mini-sandbox__result-stat">
                <Clock size={16} />
                <span>Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            <div className="mini-sandbox__result-actions">
              <button 
                className="mini-sandbox__btn mini-sandbox__btn--primary"
                onClick={handleReset}
              >
                Try Again
              </button>
              <Link 
                to="/sandbox"
                className="mini-sandbox__btn mini-sandbox__btn--secondary"
              >
                More Mini-Sandboxes
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {!isCompleted && (
        <footer className="mini-sandbox__footer">
          <SessionTimer 
            seconds={elapsedTime} 
            limit={constraints.timeLimit}
          />
          
          <button 
            className="mini-sandbox__complete-btn"
            onClick={handleComplete}
            style={{ backgroundColor: color }}
          >
            <CheckCircle size={18} />
            Complete
          </button>
        </footer>
      )}
    </div>
  );
};

export default MiniSandboxBase;