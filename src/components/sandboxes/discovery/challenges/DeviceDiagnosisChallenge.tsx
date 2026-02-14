// src/components/sandboxes/discovery/challenges/DeviceDiagnosisChallenge.tsx
// Scrap Cat: Diagnose why a device isn't working
// Troubleshooting logic tree

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface DeviceDiagnosisChallengeProps {
  onComplete: (result: { completed: boolean; diagnosis?: string; steps?: string[]; timeSpent: number }) => void;
  onSkip: () => void;
}

interface DiagnosisStep {
  id: string;
  question: string;
  options: {
    text: string;
    nextStep?: string;
    diagnosis?: string;
    hint?: string;
  }[];
}

const DIAGNOSIS_TREE: DiagnosisStep[] = [
  {
    id: 'start',
    question: "A phone won't charge when plugged in. What's your first check?",
    options: [
      { text: 'Check if the outlet works', nextStep: 'outlet' },
      { text: 'Try a different cable', nextStep: 'cable' },
      { text: 'Look at the charging port', nextStep: 'port' },
      { text: 'Check for software issues', nextStep: 'software', hint: 'Usually hardware first!' }
    ]
  },
  {
    id: 'outlet',
    question: 'You plugged something else in - the outlet works fine. Next step?',
    options: [
      { text: 'Try a different cable', nextStep: 'cable' },
      { text: 'Look at the charging port', nextStep: 'port' },
      { text: 'Try a different charger brick', nextStep: 'brick' }
    ]
  },
  {
    id: 'cable',
    question: 'You tried a different cable. What happened?',
    options: [
      { text: 'Still not charging', nextStep: 'port' },
      { text: 'It works now!', diagnosis: 'cable', hint: 'Faulty cable - common issue!' },
      { text: 'Charges slowly', nextStep: 'slow' }
    ]
  },
  {
    id: 'brick',
    question: 'You tried a different charger brick. Result?',
    options: [
      { text: 'Still not charging', nextStep: 'port' },
      { text: 'It works now!', diagnosis: 'brick', hint: 'Faulty adapter - often overlooked!' },
      { text: 'Different behavior', nextStep: 'port' }
    ]
  },
  {
    id: 'port',
    question: 'Time to inspect the charging port. What do you see?',
    options: [
      { text: 'Lint/debris visible', diagnosis: 'debris', hint: 'Clean with toothpick - careful!' },
      { text: 'Port looks damaged/bent', diagnosis: 'port-damage', hint: 'May need professional repair' },
      { text: 'Looks clean and normal', nextStep: 'deeper' },
      { text: 'Corrosion/green residue', diagnosis: 'corrosion', hint: 'Water damage - serious issue' }
    ]
  },
  {
    id: 'software',
    question: 'You restarted the phone. Any change?',
    options: [
      { text: 'Still not charging', nextStep: 'port' },
      { text: 'Now it charges!', diagnosis: 'software', hint: 'Software glitch - restart fixed it' },
      { text: 'Battery icon shows but slow', nextStep: 'slow' }
    ]
  },
  {
    id: 'slow',
    question: 'The phone charges but very slowly. What could cause this?',
    options: [
      { text: 'Wrong wattage charger', diagnosis: 'wattage', hint: 'Fast charge needs right adapter' },
      { text: 'Battery health degraded', diagnosis: 'battery', hint: 'Old batteries charge slower' },
      { text: 'Background apps draining', diagnosis: 'apps', hint: 'Close apps while charging' }
    ]
  },
  {
    id: 'deeper',
    question: 'Port looks fine. The phone shows no sign of charging at all. Your diagnosis?',
    options: [
      { text: 'Internal charging circuit fault', diagnosis: 'circuit', hint: 'Professional repair needed' },
      { text: 'Battery completely dead', diagnosis: 'dead-battery', hint: 'Try leaving plugged in 30min' },
      { text: 'Motherboard issue', diagnosis: 'motherboard', hint: 'Most expensive outcome' }
    ]
  }
];

const DIAGNOSIS_RESULTS: Record<string, { title: string; difficulty: string; action: string }> = {
  'cable': { title: 'Faulty Cable', difficulty: 'Easy fix', action: 'Replace cable (£5-15)' },
  'brick': { title: 'Faulty Adapter', difficulty: 'Easy fix', action: 'Replace charger (£10-30)' },
  'debris': { title: 'Port Blocked', difficulty: 'DIY fix', action: 'Carefully clean with toothpick' },
  'port-damage': { title: 'Damaged Port', difficulty: 'Pro repair', action: 'Port replacement needed' },
  'corrosion': { title: 'Water Damage', difficulty: 'Serious', action: 'Professional assessment' },
  'software': { title: 'Software Glitch', difficulty: 'Easy fix', action: 'Restart solved it!' },
  'wattage': { title: 'Wrong Charger', difficulty: 'Easy fix', action: 'Get correct wattage adapter' },
  'battery': { title: 'Battery Wear', difficulty: 'Pro repair', action: 'Battery replacement' },
  'apps': { title: 'App Drain', difficulty: 'Easy fix', action: 'Close background apps' },
  'circuit': { title: 'Charging Circuit', difficulty: 'Pro repair', action: 'Board-level repair' },
  'dead-battery': { title: 'Dead Battery', difficulty: 'Wait & see', action: 'Leave charging 30min' },
  'motherboard': { title: 'Motherboard Issue', difficulty: 'Major repair', action: 'Consider replacement' }
};

const DeviceDiagnosisChallenge: React.FC<DeviceDiagnosisChallengeProps> = ({ onComplete, onSkip }) => {
  const [currentStepId, setCurrentStepId] = useState('start');
  const [stepHistory, setStepHistory] = useState<string[]>(['start']);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const currentStep = DIAGNOSIS_TREE.find(s => s.id === currentStepId);

  const handleOption = useCallback((option: typeof DIAGNOSIS_TREE[0]['options'][0]) => {
    if (option.diagnosis) {
      setDiagnosis(option.diagnosis);
    } else if (option.nextStep) {
      setCurrentStepId(option.nextStep);
      setStepHistory(prev => [...prev, option.nextStep!]);
    }
  }, []);

  const goBack = useCallback(() => {
    if (stepHistory.length > 1) {
      const newHistory = stepHistory.slice(0, -1);
      setStepHistory(newHistory);
      setCurrentStepId(newHistory[newHistory.length - 1]);
    }
  }, [stepHistory]);

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      diagnosis: diagnosis || undefined,
      steps: stepHistory,
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [diagnosis, stepHistory, startTime, onComplete]);

  const result = diagnosis ? DIAGNOSIS_RESULTS[diagnosis] : null;

  return (
    <div className="challenge-container diagnosis-challenge">
      {!diagnosis ? (
        <>
          <div className="diagnosis-progress">
            <span>Step {stepHistory.length}</span>
            <div className="breadcrumb">
              {stepHistory.map((s, i) => (
                <span key={i} className="crumb">
                  {i > 0 && ' → '}
                  {DIAGNOSIS_TREE.find(st => st.id === s)?.question.substring(0, 20)}...
                </span>
              ))}
            </div>
          </div>

          <div className="diagnosis-question">
            <div className="device-visual">📱❓</div>
            <h3>{currentStep?.question}</h3>
          </div>

          <div className="diagnosis-options">
            {currentStep?.options.map((option, i) => (
              <button
                key={i}
                className="diagnosis-option"
                onClick={() => handleOption(option)}
              >
                <span className="option-text">{option.text}</span>
                {option.hint && (
                  <span className="option-hint">💡 {option.hint}</span>
                )}
              </button>
            ))}
          </div>

          {stepHistory.length > 1 && (
            <button className="btn-back" onClick={goBack}>
              ← Go back
            </button>
          )}
        </>
      ) : (
        <div className="diagnosis-result">
          <div className="result-icon">🔍</div>
          <h3>Diagnosis: {result?.title}</h3>
          <div className="result-details">
            <span className={`difficulty ${result?.difficulty.toLowerCase().replace(' ', '-')}`}>
              {result?.difficulty}
            </span>
            <p className="action">{result?.action}</p>
          </div>
          
          <div className="journey-recap">
            <h4>Your troubleshooting path:</h4>
            <div className="path-steps">
              {stepHistory.map((s, i) => (
                <span key={i} className="path-step">
                  {i + 1}. {DIAGNOSIS_TREE.find(st => st.id === s)?.question.substring(0, 40)}...
                </span>
              ))}
              <span className="path-step final">→ {result?.title}</span>
            </div>
          </div>
        </div>
      )}

      <div className="tips-compact">
        <strong>Key principle:</strong> Start simple (cables, connections) before assuming 
        complex issues. Most problems have simple solutions.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          {diagnosis ? 'Try another scenario' : 'Skip this challenge'}
        </button>
        {diagnosis && (
          <button className="btn-submit" onClick={handleSubmit}>
            ✅ Complete Challenge
          </button>
        )}
      </div>
    </div>
  );
};

export default DeviceDiagnosisChallenge;