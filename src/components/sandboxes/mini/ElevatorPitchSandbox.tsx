// src/components/sandboxes/mini/ElevatorPitchSandbox.tsx
// 🎯 30-Second Elevator Pitch
// TECHreneurs - Practice your elevator pitch for any situation

import React, { useState, useEffect, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Zap, Clock, Mic, RefreshCw, CheckCircle } from 'lucide-react';
import './MiniSandbox.css';

interface PitchScenario {
  id: string;
  context: string;
  audience: string;
  constraint: string;
  example: string;
}

const PITCH_SCENARIOS: PitchScenario[] = [
  {
    id: 'networking',
    context: 'Community networking event',
    audience: 'You\'re at a local business mixer. Someone asks "So what do you do?"',
    constraint: 'You have 30 seconds before they get distracted',
    example: '"I help local businesses get more customers through their phones. Last month I set up a restaurant with online ordering — they saved £500 in delivery fees. Know any businesses struggling with tech?"'
  },
  {
    id: 'church',
    context: 'After church service',
    audience: 'Auntie mentions her friend\'s business is struggling. Friend is right there.',
    constraint: 'Natural conversation, not salesy',
    example: '"I help small businesses with their tech — websites, social media, that kind of thing. What kind of business is it? Maybe I can suggest something quick that might help."'
  },
  {
    id: 'barbershop',
    context: 'In the barber chair',
    audience: 'Barber mentions he\'s losing clients to a new shop with online booking',
    constraint: 'You\'re mid-haircut, need to be helpful not pushy',
    example: '"I actually set those up! It\'s not as expensive as you\'d think — could probably have you sorted in a week. Want me to show you what it would look like?"'
  },
  {
    id: 'family',
    context: 'Family gathering',
    audience: 'Uncle asks what you\'re doing these days',
    constraint: 'Need to explain without jargon, make them proud',
    example: '"I help local shops and restaurants with their computer things — making sure they show up on Google, getting their menus online, that sort of thing. Actually keeping pretty busy!"'
  },
  {
    id: 'potential-client',
    context: 'Cold approach',
    audience: 'You noticed a business with obvious tech problems and the owner is free',
    constraint: 'Don\'t be creepy, offer genuine value',
    example: '"Excuse me — I noticed your menu doesn\'t have a QR code. I help local businesses with that kind of thing. Would a digital menu help you? I could show you a quick example."'
  },
  {
    id: 'referral',
    context: 'Friend asking for referral',
    audience: 'Friend says "My cousin needs a website, who should they call?"',
    constraint: 'This is your chance to get a warm intro',
    example: '"I do that! Tell them to message me — I\'ll give them a free 15-minute chat to see what they actually need. Sometimes they don\'t even need a full website, just Google Business sorted."'
  }
];

const ElevatorPitchSandbox: React.FC = () => {
  const [scenario, setScenario] = useState(PITCH_SCENARIOS[0]);
  const [pitch, setPitch] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attempts, setAttempts] = useState<Array<{ scenario: string; time: number; wordCount: number }>>([]);

  const constraints: SandboxConstraints = {
    timeLimit: 30,
    maxLength: 75 // ~75 words = 30 seconds
  };

  const prompt: SandboxPrompt = {
    title: scenario.context,
    instruction: scenario.audience,
    tips: [
      'Lead with what you DO, not your title',
      'Include a quick proof point (result you achieved)',
      'End with engagement (question or offer)',
      'Sound natural — like you\'re talking, not presenting'
    ],
    example: scenario.example
  };

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && recordingTime < 30) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    if (recordingTime >= 30 && isRecording) {
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingTime]);

  const wordCount = pitch.trim().split(/\s+/).filter(w => w).length;
  const isOverLimit = wordCount > 75;

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (pitch.trim()) {
      setAttempts([...attempts, {
        scenario: scenario.context,
        time: recordingTime,
        wordCount
      }]);
    }
  };

  const nextScenario = () => {
    const nextIndex = (PITCH_SCENARIOS.findIndex(s => s.id === scenario.id) + 1) % PITCH_SCENARIOS.length;
    setScenario(PITCH_SCENARIOS[nextIndex]);
    setPitch('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  const randomScenario = () => {
    const randomIndex = Math.floor(Math.random() * PITCH_SCENARIOS.length);
    setScenario(PITCH_SCENARIOS[randomIndex]);
    setPitch('');
    setRecordingTime(0);
    setIsRecording(false);
  };

  const handleComplete = useCallback((): SandboxResult => {
    const isValid = pitch.trim().length > 20 && wordCount <= 75;
    
    return {
      success: isValid,
      data: {
        scenario: scenario.context,
        pitch,
        wordCount,
        recordingTime,
        totalAttempts: attempts.length + 1
      },
      feedback: pitch.trim().length < 20
        ? 'Write out your pitch first!'
        : wordCount > 75
          ? 'Too long! A 30-second pitch is about 75 words. Cut the fluff.'
          : recordingTime > 30
            ? 'Good content but you went over 30 seconds. Tighten it up!'
            : 'Solid pitch! Practice it until it feels natural, then use it for real.'
    };
  }, [pitch, wordCount, recordingTime, scenario, attempts]);

  return (
    <MiniSandboxBase
      title="30-Second Elevator Pitch"
      emoji="🎯"
      programme="TECHreneurs"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#f59e0b"
    >
      <div className="mini-sandbox__elevator-pitch">
        {/* Scenario Card */}
        <div className="mini-sandbox__scenario-display">
          <div className="mini-sandbox__scenario-context">
            <Zap size={18} />
            <span>{scenario.context}</span>
          </div>
          <p className="mini-sandbox__scenario-audience">{scenario.audience}</p>
          <p className="mini-sandbox__scenario-constraint">⏱️ {scenario.constraint}</p>
        </div>

        {/* Pitch Input */}
        <div className="mini-sandbox__pitch-write">
          <div className="mini-sandbox__write-header">
            <span>Your Pitch</span>
            <span className={`mini-sandbox__word-counter ${isOverLimit ? 'over' : ''}`}>
              {wordCount}/75 words
            </span>
          </div>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="Write your pitch here... Remember: what you DO, quick proof, engagement question."
            rows={4}
            className={isOverLimit ? 'over-limit' : ''}
          />
        </div>

        {/* Example Toggle */}
        <details className="mini-sandbox__example-toggle">
          <summary>See example pitch</summary>
          <p className="mini-sandbox__example-pitch">{scenario.example}</p>
        </details>

        {/* Recording */}
        <div className="mini-sandbox__pitch-record">
          <div className={`mini-sandbox__record-timer ${recordingTime > 30 ? 'over' : ''}`}>
            <Clock size={18} />
            <span>{recordingTime}s / 30s</span>
            {recordingTime <= 30 && recordingTime > 0 && (
              <div 
                className="mini-sandbox__timer-bar"
                style={{ width: `${(recordingTime / 30) * 100}%` }}
              />
            )}
          </div>

          {!isRecording ? (
            <button 
              className="mini-sandbox__start-record"
              onClick={startRecording}
            >
              <Mic size={18} /> Practice Speaking
            </button>
          ) : (
            <button 
              className="mini-sandbox__stop-record"
              onClick={stopRecording}
            >
              ⏹️ Stop
            </button>
          )}
        </div>

        {/* Scenario Controls */}
        <div className="mini-sandbox__scenario-controls">
          <button onClick={nextScenario} className="mini-sandbox__next-scenario-btn">
            Next Scenario
          </button>
          <button onClick={randomScenario} className="mini-sandbox__random-btn">
            <RefreshCw size={16} /> Random
          </button>
        </div>

        {/* Attempts */}
        {attempts.length > 0 && (
          <div className="mini-sandbox__attempts">
            <h4>Practice Attempts: {attempts.length}</h4>
            <div className="mini-sandbox__attempts-list">
              {attempts.slice(-3).map((a, i) => (
                <div key={i} className="mini-sandbox__attempt-item">
                  <span>{a.scenario}</span>
                  <span>{a.time}s • {a.wordCount} words</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Reminder */}
        <div className="mini-sandbox__pitch-tips">
          <strong>Quick check:</strong>
          <ul>
            <li>Did you say what you DO (not your title)?</li>
            <li>Did you include a result/proof?</li>
            <li>Did you end with engagement?</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default ElevatorPitchSandbox;