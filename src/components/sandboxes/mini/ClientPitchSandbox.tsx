// src/components/sandboxes/mini/ClientPitchSandbox.tsx
// 🏢 90-Second Client Pitch Practice
// G-Tech Casters - Practice pitching media services to local organizations

import React, { useState, useEffect, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Building, Clock, Target, Mic, ChevronRight, DollarSign, CheckCircle } from 'lucide-react';
import './MiniSandbox.css';

interface ClientScenario {
  id: string;
  type: string;
  name: string;
  owner: string;
  situation: string;
  need: string;
  budget: string;
  yourService: string;
}

const CLIENT_SCENARIOS: ClientScenario[] = [
  {
    id: 'church',
    type: 'Church',
    name: 'New Covenant Baptist',
    owner: 'Pastor Williams',
    situation: 'Sunday services only reach people in the building. Elderly and overseas members feel disconnected.',
    need: 'Livestreaming for weekly services',
    budget: '£200-400/month',
    yourService: 'Weekly livestream setup and operation'
  },
  {
    id: 'restaurant',
    type: 'Restaurant',
    name: 'Aunty Joy\'s Kitchen',
    owner: 'Joy Okonkwo',
    situation: 'Amazing food but empty during weekdays. No video presence while competitors have reels everywhere.',
    need: 'Social media video content',
    budget: '£150-300/month',
    yourService: 'Monthly video content package (4 reels + stories)'
  },
  {
    id: 'school',
    type: 'School',
    name: 'Wembley Primary',
    owner: 'Head Teacher Mrs. Patel',
    situation: 'Parents want to see more of school life. Sports days and performances have no professional coverage.',
    need: 'Event documentation',
    budget: '£300-500/event',
    yourService: 'Event filming, editing, and highlight reel'
  },
  {
    id: 'solicitor',
    type: 'Professional Services',
    name: 'Marcus Thompson Law',
    owner: 'Marcus Thompson',
    situation: 'Wants to build thought leadership but doesn\'t have time. Competitors have podcasts, he has nothing.',
    need: 'Podcast production',
    budget: '£400-600/month',
    yourService: 'Full podcast production (recording to publishing)'
  },
  {
    id: 'salon',
    type: 'Hair Salon',
    name: 'Crown & Glory',
    owner: 'Sister Marcia',
    situation: 'Beautiful transformations every day but no photos shared. Losing clients to salons with strong Instagram.',
    need: 'Content creation',
    budget: '£100-200/month',
    yourService: 'Weekly photo/video sessions of transformations'
  },
  {
    id: 'care-home',
    type: 'Care Home',
    name: 'Sunshine House',
    owner: 'Manager David Chen',
    situation: 'Families overseas can\'t see their loved ones. Virtual visits are clunky and unreliable.',
    need: 'Virtual visit facilitation',
    budget: '£150-250/month',
    yourService: 'Scheduled video call support + monthly highlights'
  }
];

const PITCH_ELEMENTS = [
  { id: 'problem', label: 'Their Problem', tip: 'Show you understand their specific pain' },
  { id: 'solution', label: 'Your Solution', tip: 'What you\'ll do (specific, not vague)' },
  { id: 'outcome', label: 'The Outcome', tip: 'What changes for them' },
  { id: 'next-step', label: 'Next Step', tip: 'Clear, low-commitment action' }
];

const ClientPitchSandbox: React.FC = () => {
  const [scenario, setScenario] = useState(CLIENT_SCENARIOS[0]);
  const [pitchParts, setPitchParts] = useState<Record<string, string>>({
    problem: '',
    solution: '',
    outcome: '',
    'next-step': ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [completedPitches, setCompletedPitches] = useState<string[]>([]);

  const constraints: SandboxConstraints = {
    timeLimit: 90,
    minItems: 4 // All 4 pitch elements
  };

  const prompt: SandboxPrompt = {
    title: `Pitch to ${scenario.name}`,
    instruction: `${scenario.owner} runs a ${scenario.type.toLowerCase()}. ${scenario.situation} Create a 90-second pitch covering all 4 elements.`,
    tips: [
      'Start with their problem, not your credentials',
      'Be specific about what you\'ll deliver',
      'Mention realistic outcomes',
      'End with a simple next step'
    ],
    example: `"${scenario.owner}, I noticed [problem]. I can help by [solution]. This means [outcome]. Want me to show you an example?"`
  };

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && recordingTime < 90) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingTime]);

  const updatePitchPart = (id: string, value: string) => {
    setPitchParts(prev => ({ ...prev, [id]: value }));
  };

  const completedElements = Object.values(pitchParts).filter(p => p.trim().length > 10).length;
  const isComplete = completedElements >= 4;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (isComplete && !completedPitches.includes(scenario.id)) {
      setCompletedPitches(prev => [...prev, scenario.id]);
    }
  };

  const nextScenario = () => {
    const currentIndex = CLIENT_SCENARIOS.findIndex(s => s.id === scenario.id);
    const nextIndex = (currentIndex + 1) % CLIENT_SCENARIOS.length;
    setScenario(CLIENT_SCENARIOS[nextIndex]);
    setPitchParts({ problem: '', solution: '', outcome: '', 'next-step': '' });
    setRecordingTime(0);
    setIsRecording(false);
  };

  const handleComplete = useCallback((): SandboxResult => {
    return {
      success: isComplete,
      data: {
        scenario: scenario.name,
        pitchParts,
        recordingTime,
        completedElements
      },
      feedback: !isComplete
        ? `Complete all 4 pitch elements. You have ${completedElements}/4.`
        : recordingTime > 90
          ? 'Good pitch but too long! Business owners are busy — tighten it up.'
          : 'Solid pitch! Now try it with a real local business.'
    };
  }, [isComplete, scenario, pitchParts, recordingTime, completedElements]);

  return (
    <MiniSandboxBase
      title="90-Second Client Pitch"
      emoji="🏢"
      programme="G-Tech Casters"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#06b6d4"
    >
      <div className="mini-sandbox__pitch-builder">
        {/* Client Card */}
        <div className="mini-sandbox__client-card">
          <div className="mini-sandbox__client-header">
            <div className="mini-sandbox__client-type">{scenario.type}</div>
            <div className="mini-sandbox__client-budget">
              <DollarSign size={14} />
              {scenario.budget}
            </div>
          </div>
          <h3 className="mini-sandbox__client-name">{scenario.name}</h3>
          <p className="mini-sandbox__client-owner">Owner: {scenario.owner}</p>
          <div className="mini-sandbox__client-situation">
            <Target size={16} />
            <p>{scenario.situation}</p>
          </div>
          <div className="mini-sandbox__client-service">
            <strong>Your potential service:</strong> {scenario.yourService}
          </div>
        </div>

        {/* Progress */}
        <div className="mini-sandbox__pitch-progress">
          <span>{completedElements}/4 elements</span>
          <div className="mini-sandbox__progress-dots">
            {PITCH_ELEMENTS.map((el, i) => (
              <div 
                key={el.id}
                className={`mini-sandbox__progress-dot ${pitchParts[el.id]?.trim().length > 10 ? 'complete' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Pitch Elements */}
        <div className="mini-sandbox__pitch-elements">
          {PITCH_ELEMENTS.map((element) => (
            <div key={element.id} className="mini-sandbox__pitch-element">
              <div className="mini-sandbox__element-header">
                <label>{element.label}</label>
                {pitchParts[element.id]?.trim().length > 10 && (
                  <CheckCircle size={16} className="mini-sandbox__element-check" />
                )}
              </div>
              <textarea
                value={pitchParts[element.id]}
                onChange={(e) => updatePitchPart(element.id, e.target.value)}
                placeholder={element.tip}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Recording Section */}
        <div className="mini-sandbox__recording-section">
          <div className={`mini-sandbox__timer ${recordingTime > 90 ? 'over' : ''}`}>
            <Clock size={18} />
            <span>{recordingTime}s / 90s</span>
          </div>
          
          {!isRecording ? (
            <button 
              className="mini-sandbox__record-btn"
              onClick={handleStartRecording}
              disabled={!isComplete}
            >
              <Mic size={18} />
              {isComplete ? 'Practice Speaking' : 'Complete all elements first'}
            </button>
          ) : (
            <button 
              className="mini-sandbox__stop-btn"
              onClick={handleStopRecording}
            >
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        {/* Next Scenario */}
        <button className="mini-sandbox__next-btn" onClick={nextScenario}>
          Try Another Client <ChevronRight size={18} />
        </button>

        {/* Completed Counter */}
        {completedPitches.length > 0 && (
          <div className="mini-sandbox__completed-count">
            🎯 {completedPitches.length} client pitch{completedPitches.length > 1 ? 'es' : ''} practiced
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default ClientPitchSandbox;