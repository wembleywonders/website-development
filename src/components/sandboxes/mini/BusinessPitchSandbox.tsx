// src/components/sandboxes/mini/BusinessPitchSandbox.tsx
// 💼 30-Second Business Pitch Practice
// TECHreneurs - Practice pitching your services to local businesses

import React, { useState, useEffect, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Briefcase, Clock, Target, Building, ChevronRight } from 'lucide-react';
import './MiniSandbox.css';

// Business scenarios to pitch to
const BUSINESS_SCENARIOS = [
  {
    id: 'restaurant',
    business: 'Caribbean Restaurant',
    owner: 'Mrs. Johnson',
    need: 'Losing money to Deliveroo fees',
    context: 'You spotted her looking frustrated at her tablet while waiting for your jerk chicken',
    idealSolution: 'Website with online ordering system'
  },
  {
    id: 'salon',
    business: 'Hair Salon',
    owner: 'Auntie Grace',
    need: 'Clients keep forgetting appointments',
    context: 'She mentioned three no-shows this week while doing your hair',
    idealSolution: 'Automated SMS reminders'
  },
  {
    id: 'church',
    business: 'Community Church',
    owner: 'Pastor Williams',
    need: 'Elderly members can\'t attend in person',
    context: 'After service, he asked if you knew anyone who could help with technology',
    idealSolution: 'Livestreaming setup'
  },
  {
    id: 'tradesman',
    business: 'Plumbing Business',
    owner: 'Mr. Okonkwo',
    need: 'Paper invoices getting lost, payments delayed',
    context: 'He fixed your boiler and mentioned he\'s still chasing payments from months ago',
    idealSolution: 'Digital invoicing system'
  },
  {
    id: 'care-home',
    business: 'Care Home',
    owner: 'Manager Sandra',
    need: 'Residents struggle with video calls to family',
    context: 'You visited your grandmother and noticed staff helping with tablets',
    idealSolution: 'Tech support and training sessions'
  },
  {
    id: 'boutique',
    business: 'Clothing Boutique',
    owner: 'Sister Marcia',
    need: 'Beautiful clothes but no online presence',
    context: 'She has amazing stock but only sells to walk-ins',
    idealSolution: 'Instagram/product photography'
  }
];

const PITCH_FRAMEWORKS = [
  { name: 'Problem-Solution', structure: 'I noticed [problem]. I can help with [solution].' },
  { name: 'Question Hook', structure: 'What if [possibility]? I could help you [outcome].' },
  { name: 'Empathy Lead', structure: 'I understand [pain point]. Here\'s what\'s worked for others...' },
  { name: 'Social Proof', structure: 'I helped [similar business] with [result]. Could do the same for you.' }
];

const BusinessPitchSandbox: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(BUSINESS_SCENARIOS[0]);
  const [pitch, setPitch] = useState('');
  const [selectedFramework, setSelectedFramework] = useState(PITCH_FRAMEWORKS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [pitchHistory, setPitchHistory] = useState<Array<{scenario: string; pitch: string; time: number}>>([]);

  const constraints: SandboxConstraints = {
    timeLimit: 30, // 30 seconds to deliver pitch
    maxLength: 100, // ~100 words max
    minItems: 1
  };

  const prompt: SandboxPrompt = {
    title: `Pitch to ${currentScenario.business}`,
    instruction: `${currentScenario.owner} owns a ${currentScenario.business.toLowerCase()}. ${currentScenario.context}. Pitch your help in 30 seconds.`,
    tips: [
      'Start with their problem, not your skills',
      'Be specific about the outcome',
      'End with a clear next step',
      'Sound natural, not salesy'
    ],
    example: `"${currentScenario.owner}, I noticed ${currentScenario.need.toLowerCase()}. I could set up ${currentScenario.idealSolution.toLowerCase()} for you — would save you hours each week. Want me to show you what it could look like?"`
  };

  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && recordingTime < 30) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingTime]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (pitch.trim()) {
      setPitchHistory(prev => [...prev, {
        scenario: currentScenario.business,
        pitch: pitch,
        time: recordingTime
      }]);
    }
  };

  const handleNewScenario = () => {
    const currentIndex = BUSINESS_SCENARIOS.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % BUSINESS_SCENARIOS.length;
    setCurrentScenario(BUSINESS_SCENARIOS[nextIndex]);
    setPitch('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  const wordCount = pitch.trim().split(/\s+/).filter(w => w).length;
  const isOverLimit = wordCount > constraints.maxLength!;
  const isOverTime = recordingTime > constraints.timeLimit!;

  const handleComplete = useCallback((): SandboxResult => {
    return {
      success: pitch.trim().length > 0 && !isOverLimit,
      data: {
        scenario: currentScenario,
        pitch,
        wordCount,
        recordingTime,
        framework: selectedFramework.name
      },
      feedback: pitch.trim().length === 0 
        ? 'Write your pitch before completing!'
        : isOverLimit 
          ? 'Great effort! Try to be more concise — busy business owners need quick pitches.'
          : 'Nice pitch! Remember: the goal is to start a conversation, not close a deal.'
    };
  }, [pitch, wordCount, isOverLimit, currentScenario, recordingTime, selectedFramework]);

  return (
    <MiniSandboxBase
      title="30-Second Business Pitch"
      emoji="💼"
      programme="TECHreneurs"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#10b981"
    >
      <div className="mini-sandbox__pitch-area">
        {/* Scenario Card */}
        <div className="mini-sandbox__scenario-card">
          <div className="mini-sandbox__scenario-header">
            <Building size={24} />
            <div>
              <h3>{currentScenario.business}</h3>
              <p>Owner: {currentScenario.owner}</p>
            </div>
          </div>
          <div className="mini-sandbox__scenario-context">
            <strong>The Situation:</strong>
            <p>{currentScenario.context}</p>
          </div>
          <div className="mini-sandbox__scenario-need">
            <Target size={16} />
            <span>Their need: {currentScenario.need}</span>
          </div>
        </div>

        {/* Framework Selector */}
        <div className="mini-sandbox__framework-selector">
          <label>Choose a pitch framework:</label>
          <div className="mini-sandbox__frameworks">
            {PITCH_FRAMEWORKS.map(fw => (
              <button
                key={fw.name}
                className={`mini-sandbox__framework ${selectedFramework.name === fw.name ? 'selected' : ''}`}
                onClick={() => setSelectedFramework(fw)}
              >
                {fw.name}
              </button>
            ))}
          </div>
          <p className="mini-sandbox__framework-hint">{selectedFramework.structure}</p>
        </div>

        {/* Pitch Input */}
        <div className="mini-sandbox__pitch-input">
          <div className="mini-sandbox__pitch-header">
            <span>Your Pitch</span>
            <span className={`mini-sandbox__word-count ${isOverLimit ? 'over' : ''}`}>
              {wordCount}/100 words
            </span>
          </div>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder={`"${currentScenario.owner}, I noticed..."`}
            className={isOverLimit ? 'over-limit' : ''}
          />
        </div>

        {/* Recording Timer (Simulated) */}
        <div className="mini-sandbox__recording">
          <div className={`mini-sandbox__timer ${isOverTime ? 'over' : ''}`}>
            <Clock size={20} />
            <span>{recordingTime}s / 30s</span>
          </div>
          {!isRecording ? (
            <button 
              className="mini-sandbox__record-btn"
              onClick={handleStartRecording}
            >
              🎤 Practice Speaking
            </button>
          ) : (
            <button 
              className="mini-sandbox__stop-btn"
              onClick={handleStopRecording}
            >
              ⏹️ Stop
            </button>
          )}
        </div>

        {/* Next Scenario */}
        <button className="mini-sandbox__next-scenario" onClick={handleNewScenario}>
          Try Another Scenario <ChevronRight size={18} />
        </button>

        {/* Pitch History */}
        {pitchHistory.length > 0 && (
          <div className="mini-sandbox__history">
            <h4>Your Pitches Today</h4>
            {pitchHistory.map((p, i) => (
              <div key={i} className="mini-sandbox__history-item">
                <span className="mini-sandbox__history-business">{p.scenario}</span>
                <span className="mini-sandbox__history-time">{p.time}s</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default BusinessPitchSandbox;