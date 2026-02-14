// src/components/sandboxes/mini/DiagnosticQuizSandbox.tsx
// 🔧 Diagnostic Quiz
// STEMgeneers - Practice troubleshooting common tech issues

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Wrench, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import './MiniSandbox.css';

interface DiagnosticScenario {
  id: string;
  device: string;
  symptom: string;
  customerSays: string;
  questions: Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
  likelyIssue: string;
  estimatedFix: string;
}

const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'slow-laptop',
    device: 'Laptop',
    symptom: 'Running very slow',
    customerSays: '"My laptop takes forever to start up and everything is sluggish"',
    questions: [
      {
        question: 'First diagnostic question to ask?',
        options: [
          'What websites do you visit?',
          'When did this start happening?',
          'What\'s your WiFi password?',
          'Do you want a new laptop?'
        ],
        correct: 1,
        explanation: 'Timing helps identify if it\'s gradual degradation or sudden (suggesting recent change/malware).'
      },
      {
        question: 'Quick check to run first?',
        options: [
          'Reinstall Windows',
          'Check Task Manager for high CPU/memory usage',
          'Replace the hard drive',
          'Update all drivers'
        ],
        correct: 1,
        explanation: 'Task Manager quickly shows if a specific program is hogging resources.'
      },
      {
        question: 'If storage is 95% full, best quick fix?',
        options: [
          'Delete System32',
          'Run Disk Cleanup and clear temp files',
          'Buy external drive immediately',
          'Nothing can be done'
        ],
        correct: 1,
        explanation: 'Disk Cleanup can free several GB quickly. Always start with free solutions.'
      }
    ],
    likelyIssue: 'Full storage, too many startup programs, or failing HDD',
    estimatedFix: '£30-50 for cleanup/optimization, £80-120 for SSD upgrade'
  },
  {
    id: 'no-wifi',
    device: 'Phone',
    symptom: 'Won\'t connect to WiFi',
    customerSays: '"My phone sees the WiFi but won\'t connect, says authentication error"',
    questions: [
      {
        question: 'First thing to check?',
        options: [
          'Is the password definitely correct?',
          'What phone brand is it?',
          'How old is the phone?',
          'What\'s your data plan?'
        ],
        correct: 0,
        explanation: 'Most "authentication errors" are simply wrong passwords. Always verify basics first.'
      },
      {
        question: 'Password is correct but still failing. Next step?',
        options: [
          'Factory reset the phone',
          'Forget the network and reconnect',
          'Call the internet provider',
          'Buy a new router'
        ],
        correct: 1,
        explanation: 'Forgetting and reconnecting clears cached credentials that may be corrupted.'
      },
      {
        question: 'Still not working after forget/reconnect?',
        options: [
          'Check if other devices connect to same network',
          'Replace the phone',
          'It\'s definitely the router',
          'Nothing else to try'
        ],
        correct: 0,
        explanation: 'Testing other devices isolates whether it\'s a phone issue or network issue.'
      }
    ],
    likelyIssue: 'Wrong password, corrupted network profile, or MAC filtering on router',
    estimatedFix: '£0-20 (usually solved with troubleshooting)'
  },
  {
    id: 'cracked-screen',
    device: 'Phone',
    symptom: 'Cracked screen, touch not working in places',
    customerSays: '"Dropped my phone, screen cracked, and now parts of it don\'t respond to touch"',
    questions: [
      {
        question: 'First assessment question?',
        options: [
          'How much did the phone cost?',
          'Can you see any display at all, or is it completely black?',
          'What case were you using?',
          'When did you buy it?'
        ],
        correct: 1,
        explanation: 'Determines if it\'s just the digitizer (touch) or also the LCD/OLED (display).'
      },
      {
        question: 'Display works but touch is dead in bottom half. What\'s damaged?',
        options: [
          'The battery',
          'The digitizer/touch layer',
          'The motherboard',
          'The charging port'
        ],
        correct: 1,
        explanation: 'Partial touch failure with working display = digitizer damage, not LCD.'
      },
      {
        question: 'Before quoting repair, important to ask?',
        options: [
          'Their favorite color',
          'Is the phone under warranty or insured?',
          'Their email address',
          'What apps they use'
        ],
        correct: 1,
        explanation: 'Warranty/insurance could mean free repair. Always check before they pay you.'
      }
    ],
    likelyIssue: 'Cracked digitizer, possibly damaged LCD underneath',
    estimatedFix: '£40-80 for digitizer only, £80-150 for full screen assembly'
  },
  {
    id: 'printer-offline',
    device: 'Printer',
    symptom: 'Shows offline, won\'t print',
    customerSays: '"Printer was working yesterday, now computer says it\'s offline but it\'s turned on"',
    questions: [
      {
        question: 'First quick check?',
        options: [
          'Update printer drivers',
          'Is the printer connected? (USB plugged in or on same WiFi)',
          'Reinstall the printer',
          'Buy a new printer'
        ],
        correct: 1,
        explanation: 'Physical connection is the most common issue. Check cables and WiFi first.'
      },
      {
        question: 'WiFi printer, router was restarted yesterday. Connection issue?',
        options: [
          'Printer probably got a new IP address',
          'Printer is broken',
          'Computer virus',
          'Need new ink'
        ],
        correct: 0,
        explanation: 'Routers often assign new IPs after restart. Printer needs reconnecting to network.'
      },
      {
        question: 'What Windows setting often causes "offline" status?',
        options: [
          'Screen brightness',
          '"Use Printer Offline" checkbox in printer properties',
          'Windows Update',
          'Firewall settings'
        ],
        correct: 1,
        explanation: 'Windows has a setting that can get accidentally enabled, forcing offline mode.'
      }
    ],
    likelyIssue: 'Connection lost after network change, or "offline" mode enabled',
    estimatedFix: '£0-30 (usually resolved with reconnection)'
  },
  {
    id: 'virus-popup',
    device: 'Computer',
    symptom: 'Scary popup saying computer infected',
    customerSays: '"A popup appeared saying I have a virus and to call this number. Is it real?"',
    questions: [
      {
        question: 'Is this popup likely legitimate?',
        options: [
          'Yes, Microsoft often calls people',
          'No, this is almost certainly a scam',
          'Maybe, call the number to check',
          'Yes, if it has a phone number'
        ],
        correct: 1,
        explanation: 'Real antivirus never asks you to call. This is a common tech support scam.'
      },
      {
        question: 'Customer can\'t close the popup. What to do?',
        options: [
          'Pay the fee it asks for',
          'Force close browser with Task Manager (Ctrl+Shift+Esc)',
          'Call the number',
          'Shut down and never use computer again'
        ],
        correct: 1,
        explanation: 'Task Manager can force close stuck browsers. Never interact with the scam.'
      },
      {
        question: 'After closing, what should you recommend?',
        options: [
          'Run a real antivirus scan (Malwarebytes free)',
          'Nothing, problem solved',
          'Pay for premium antivirus immediately',
          'Format the computer'
        ],
        correct: 0,
        explanation: 'A legitimate scan checks for actual malware that may have triggered the scam popup.'
      }
    ],
    likelyIssue: 'Tech support scam popup (not real virus)',
    estimatedFix: '£20-40 for scan and cleanup, £0 if just browser popup'
  }
];

const DiagnosticQuizSandbox: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(DIAGNOSTIC_SCENARIOS[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [scenariosCompleted, setScenariosCompleted] = useState<string[]>([]);

  const constraints: SandboxConstraints = {
    minItems: 3, // Complete at least 3 scenarios
    timeLimit: 600 // 10 minutes
  };

  const prompt: SandboxPrompt = {
    title: `Diagnose: ${currentScenario.device}`,
    instruction: `Customer says: ${currentScenario.customerSays}. Work through the diagnostic questions.`,
    tips: [
      'Always start with the simplest explanation',
      'Ask clarifying questions before assuming',
      'Check free solutions before paid fixes',
      'Don\'t oversell repairs they don\'t need'
    ]
  };

  const currentQ = currentScenario.questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setTotalAnswered(prev => prev + 1);
    
    if (answerIndex === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentScenario.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Scenario complete
      if (!scenariosCompleted.includes(currentScenario.id)) {
        setScenariosCompleted(prev => [...prev, currentScenario.id]);
      }
    }
  };

  const nextScenario = () => {
    const currentIndex = DIAGNOSTIC_SCENARIOS.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % DIAGNOSTIC_SCENARIOS.length;
    setCurrentScenario(DIAGNOSTIC_SCENARIOS[nextIndex]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const isScenarioComplete = currentQuestion === currentScenario.questions.length - 1 && showExplanation;

  const handleComplete = useCallback((): SandboxResult => {
    const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
    
    return {
      success: scenariosCompleted.length >= 3 && accuracy >= 60,
      data: {
        scenariosCompleted: scenariosCompleted.length,
        totalQuestions: totalAnswered,
        correctAnswers: score,
        accuracy
      },
      feedback: scenariosCompleted.length < 3
        ? `Complete at least 3 scenarios. You\'ve done ${scenariosCompleted.length}.`
        : accuracy < 60
          ? `${accuracy}% accuracy. Review the explanations and try again — real customers need better!`
          : `${accuracy}% accuracy across ${scenariosCompleted.length} scenarios. You\'re ready to troubleshoot real issues!`
    };
  }, [score, totalAnswered, scenariosCompleted]);

  return (
    <MiniSandboxBase
      title="Diagnostic Quiz"
      emoji="🔧"
      programme="STEMgeneers"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#f59e0b"
    >
      <div className="mini-sandbox__diagnostic">
        {/* Progress */}
        <div className="mini-sandbox__diag-progress">
          <div className="mini-sandbox__diag-score">
            Score: {score}/{totalAnswered} ({totalAnswered > 0 ? Math.round((score/totalAnswered)*100) : 0}%)
          </div>
          <div className="mini-sandbox__diag-scenarios">
            Scenarios: {scenariosCompleted.length}/3 minimum
          </div>
        </div>

        {/* Scenario Info */}
        <div className="mini-sandbox__scenario-info">
          <div className="mini-sandbox__device-badge">
            {currentScenario.device}: {currentScenario.symptom}
          </div>
          <p className="mini-sandbox__customer-says">{currentScenario.customerSays}</p>
        </div>

        {/* Question */}
        <div className="mini-sandbox__question-card">
          <div className="mini-sandbox__question-num">
            Question {currentQuestion + 1} of {currentScenario.questions.length}
          </div>
          <h3 className="mini-sandbox__question-text">{currentQ.question}</h3>

          <div className="mini-sandbox__options">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`mini-sandbox__option ${
                  selectedAnswer === index 
                    ? index === currentQ.correct 
                      ? 'correct' 
                      : 'incorrect'
                    : ''
                } ${selectedAnswer !== null && index === currentQ.correct ? 'show-correct' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="mini-sandbox__option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="mini-sandbox__option-text">{option}</span>
                {selectedAnswer !== null && index === currentQ.correct && (
                  <CheckCircle size={18} className="mini-sandbox__correct-icon" />
                )}
                {selectedAnswer === index && index !== currentQ.correct && (
                  <XCircle size={18} className="mini-sandbox__incorrect-icon" />
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mini-sandbox__explanation ${selectedAnswer === currentQ.correct ? 'correct' : 'incorrect'}`}>
              <strong>{selectedAnswer === currentQ.correct ? '✓ Correct!' : '✗ Not quite'}</strong>
              <p>{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        {showExplanation && (
          <div className="mini-sandbox__diag-nav">
            {!isScenarioComplete ? (
              <button className="mini-sandbox__next-q-btn" onClick={nextQuestion}>
                Next Question <ChevronRight size={18} />
              </button>
            ) : (
              <div className="mini-sandbox__scenario-complete">
                <div className="mini-sandbox__diagnosis-summary">
                  <h4>Diagnosis Summary</h4>
                  <p><strong>Likely issue:</strong> {currentScenario.likelyIssue}</p>
                  <p><strong>Estimated fix:</strong> {currentScenario.estimatedFix}</p>
                </div>
                <button className="mini-sandbox__next-scenario-btn" onClick={nextScenario}>
                  Next Scenario <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Scenario List */}
        <div className="mini-sandbox__scenario-list">
          <h4>Scenarios</h4>
          <div className="mini-sandbox__scenario-chips">
            {DIAGNOSTIC_SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                className={`mini-sandbox__scenario-chip ${
                  currentScenario.id === scenario.id ? 'current' : ''
                } ${scenariosCompleted.includes(scenario.id) ? 'completed' : ''}`}
                onClick={() => {
                  setCurrentScenario(scenario);
                  resetQuiz();
                }}
              >
                {scenario.device}
                {scenariosCompleted.includes(scenario.id) && <CheckCircle size={12} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default DiagnosticQuizSandbox;