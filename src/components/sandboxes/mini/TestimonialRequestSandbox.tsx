// src/components/sandboxes/mini/TestimonialRequestSandbox.tsx
// ⭐ Testimonial Request Practice
// Cross-Programme - Learn to ask for testimonials without being awkward

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Star, MessageSquare, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';
import './MiniSandbox.css';

interface TestimonialScenario {
  id: string;
  serviceType: string;
  clientName: string;
  situation: string;
  outcome: string;
  timing: string;
  relationship: 'new' | 'regular' | 'referral';
  bestApproach: string[];
}

const TESTIMONIAL_SCENARIOS: TestimonialScenario[] = [
  {
    id: 'tech-fix',
    serviceType: 'Tech Support',
    clientName: 'Mrs. Okonkwo',
    situation: 'Fixed her laptop that was running slow for months',
    outcome: 'She\'s delighted — said "You\'ve given me my computer back!"',
    timing: 'Just finished the job, she\'s paying you now',
    relationship: 'new',
    bestApproach: [
      'Strike while the iron is hot — ask now',
      'Reference her own words ("You mentioned it feels like a new computer...")',
      'Make it easy — offer to help her write it or ask specific questions'
    ]
  },
  {
    id: 'wedding-styling',
    serviceType: 'Event Styling',
    clientName: 'Keisha',
    situation: 'Styled her for her best friend\'s wedding',
    outcome: 'She felt amazing, got lots of compliments, sent you photos',
    timing: 'Two days after the event, she messaged to thank you',
    relationship: 'referral',
    bestApproach: [
      'Reply while she\'s still buzzing from the event',
      'Ask if she\'d share her experience to help others like her',
      'Offer options: written review, voice note, or quick video'
    ]
  },
  {
    id: 'podcast-launch',
    serviceType: 'Podcast Production',
    clientName: 'Marcus (lawyer)',
    situation: 'Produced first 4 episodes of his thought leadership podcast',
    outcome: 'Episodes are live, he\'s getting positive feedback from colleagues',
    timing: 'Monthly check-in call coming up',
    relationship: 'regular',
    bestApproach: [
      'Tie it to his success — "Since you\'re getting such great feedback..."',
      'Position it as helping others in his network discover you',
      'Suggest LinkedIn recommendation for professional credibility'
    ]
  },
  {
    id: 'phone-repair',
    serviceType: 'Phone Repair',
    clientName: 'Young professional (Jay)',
    situation: 'Emergency screen repair — done in 2 hours, saved his job interview photos',
    outcome: 'Relieved and grateful, said "You saved my life!"',
    timing: 'He\'s about to leave, phone in hand',
    relationship: 'new',
    bestApproach: [
      'Quick ask while gratitude is high',
      'Make it instant — Google review right now takes 30 seconds',
      'Mention it helps others find trustworthy repair (social proof angle)'
    ]
  },
  {
    id: 'social-media',
    serviceType: 'Social Media Management',
    clientName: 'Aunty Joy (restaurant owner)',
    situation: 'Running her Instagram for 3 months, bookings have increased',
    outcome: 'She mentioned weekday tables are now filling up',
    timing: 'During regular content planning meeting',
    relationship: 'regular',
    bestApproach: [
      'Reference the specific results she shared',
      'Ask if she\'d recommend you to other restaurant owners',
      'Offer to write draft testimonial for her approval (busy owners appreciate this)'
    ]
  },
  {
    id: 'livestream-church',
    serviceType: 'Livestream Services',
    clientName: 'Pastor Williams',
    situation: 'Set up livestreaming for Sunday services, running smoothly for 2 months',
    outcome: 'Overseas members are watching, elderly members thankful',
    timing: 'After service, members are chatting and thanking him',
    relationship: 'regular',
    bestApproach: [
      'Connect testimonial to the congregation\'s impact, not just tech',
      'Ask if a member who benefited would also share their story',
      'Suggest video testimonial — churches love authentic community stories'
    ]
  }
];

interface TestimonialRequest {
  scenarioId: string;
  approach: string;
  script: string;
}

const REQUEST_APPROACHES = [
  { id: 'direct', name: 'Direct Ask', description: 'Simple, confident request', example: '"Would you be willing to share your experience in a quick review?"' },
  { id: 'reference', name: 'Reference Their Words', description: 'Echo back what they said', example: '"You mentioned [their words] — would you mind sharing that as a review?"' },
  { id: 'help-others', name: 'Help Others Angle', description: 'Frame it as helping future clients', example: '"Your review would really help others who are in the same situation you were"' },
  { id: 'make-easy', name: 'Make It Easy', description: 'Remove friction from the process', example: '"I can draft something based on our chat — you just approve or edit"' }
];

const TestimonialRequestSandbox: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(TESTIMONIAL_SCENARIOS[0]);
  const [selectedApproach, setSelectedApproach] = useState<string>('');
  const [script, setScript] = useState('');
  const [savedRequests, setSavedRequests] = useState<TestimonialRequest[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const constraints: SandboxConstraints = {
    minItems: 3,
    timeLimit: 600
  };

  const prompt: SandboxPrompt = {
    title: `Ask ${currentScenario.clientName} for Testimonial`,
    instruction: `${currentScenario.situation}. ${currentScenario.outcome} Write how you'd ask for a testimonial.`,
    tips: [
      'Timing matters — ask when satisfaction is highest',
      'Make it easy for them (offer to help write it)',
      'Be specific about where you\'ll use it',
      'Don\'t be apologetic — you did great work!'
    ]
  };

  const isScriptValid = script.trim().length >= 30;

  const saveRequest = () => {
    if (isScriptValid && selectedApproach) {
      setSavedRequests([...savedRequests, {
        scenarioId: currentScenario.id,
        approach: selectedApproach,
        script
      }]);
      setShowFeedback(true);
    }
  };

  const nextScenario = () => {
    const currentIndex = TESTIMONIAL_SCENARIOS.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % TESTIMONIAL_SCENARIOS.length;
    setCurrentScenario(TESTIMONIAL_SCENARIOS[nextIndex]);
    setSelectedApproach('');
    setScript('');
    setShowFeedback(false);
  };

  const getFeedback = () => {
    const usedBestApproach = currentScenario.bestApproach.some(tip => 
      script.toLowerCase().includes(tip.toLowerCase().split(' ').slice(0, 3).join(' '))
    );
    
    if (script.length < 50) {
      return { type: 'warning', message: 'Your request might be too brief. Add more context to make it natural.' };
    }
    if (script.toLowerCase().includes('sorry') || script.toLowerCase().includes('bother')) {
      return { type: 'warning', message: 'Avoid apologetic language! You did great work — own it confidently.' };
    }
    if (!script.includes('?')) {
      return { type: 'tip', message: 'Consider ending with a question to invite their response.' };
    }
    return { type: 'success', message: 'Good approach! Natural, confident, and clear about what you\'re asking.' };
  };

  const handleComplete = useCallback((): SandboxResult => {
    const allRequests = isScriptValid && selectedApproach
      ? [...savedRequests, { scenarioId: currentScenario.id, approach: selectedApproach, script }]
      : savedRequests;

    return {
      success: allRequests.length >= 3,
      data: {
        requests: allRequests,
        totalPracticed: allRequests.length,
        approachesUsed: [...new Set(allRequests.map(r => r.approach))]
      },
      feedback: allRequests.length < 3
        ? `Practice at least 3 scenarios. You've completed ${allRequests.length}.`
        : `${allRequests.length} testimonial requests practiced! You've used ${[...new Set(allRequests.map(r => r.approach))].length} different approaches. Now ask real clients!`
    };
  }, [script, selectedApproach, isScriptValid, savedRequests, currentScenario]);

  return (
    <MiniSandboxBase
      title="Testimonial Request"
      emoji="⭐"
      programme="All Programmes"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#f59e0b"
    >
      <div className="mini-sandbox__testimonial">
        {/* Progress */}
        <div className="mini-sandbox__test-progress">
          <span>Scenarios practiced: {savedRequests.length}/3 minimum</span>
          {savedRequests.length >= 3 && <CheckCircle size={16} className="success" />}
        </div>

        {/* Scenario Card */}
        <div className="mini-sandbox__scenario-card">
          <div className="mini-sandbox__scenario-top">
            <span className="mini-sandbox__service-type">{currentScenario.serviceType}</span>
            <span className={`mini-sandbox__relationship ${currentScenario.relationship}`}>
              {currentScenario.relationship === 'new' ? '🆕 New Client' : 
               currentScenario.relationship === 'regular' ? '🔄 Regular' : '👋 Referral'}
            </span>
          </div>
          <h3 className="mini-sandbox__client-name">{currentScenario.clientName}</h3>
          <p className="mini-sandbox__scenario-situation">{currentScenario.situation}</p>
          <p className="mini-sandbox__scenario-outcome">
            <strong>Result:</strong> {currentScenario.outcome}
          </p>
          <p className="mini-sandbox__scenario-timing">
            <strong>⏰ Timing:</strong> {currentScenario.timing}
          </p>
        </div>

        {/* Best Approaches for This Scenario */}
        <div className="mini-sandbox__best-approaches">
          <h4>💡 Tips for this situation:</h4>
          <ul>
            {currentScenario.bestApproach.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Approach Selector */}
        <div className="mini-sandbox__approach-selector">
          <h4>Choose your approach:</h4>
          <div className="mini-sandbox__approaches">
            {REQUEST_APPROACHES.map(approach => (
              <button
                key={approach.id}
                className={`mini-sandbox__approach ${selectedApproach === approach.id ? 'selected' : ''}`}
                onClick={() => setSelectedApproach(approach.id)}
              >
                <strong>{approach.name}</strong>
                <span>{approach.description}</span>
              </button>
            ))}
          </div>
          {selectedApproach && (
            <p className="mini-sandbox__approach-example">
              Example: {REQUEST_APPROACHES.find(a => a.id === selectedApproach)?.example}
            </p>
          )}
        </div>

        {/* Script Writing */}
        <div className="mini-sandbox__script-area">
          <label>Write what you'd actually say:</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`"${currentScenario.clientName}, ..."`}
            rows={4}
          />
          <div className="mini-sandbox__script-count">
            {script.length} characters {script.length < 30 && '(min 30)'}
          </div>
        </div>

        {/* Submit / Feedback */}
        {!showFeedback ? (
          <button 
            className="mini-sandbox__submit-request"
            onClick={saveRequest}
            disabled={!isScriptValid || !selectedApproach}
          >
            Submit Request
          </button>
        ) : (
          <div className={`mini-sandbox__request-feedback ${getFeedback().type}`}>
            <p>{getFeedback().message}</p>
            <button className="mini-sandbox__next-scenario" onClick={nextScenario}>
              Next Scenario <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Scenario Navigation */}
        <div className="mini-sandbox__scenario-nav">
          {TESTIMONIAL_SCENARIOS.map((scenario, i) => (
            <button
              key={scenario.id}
              className={`mini-sandbox__scenario-dot ${
                currentScenario.id === scenario.id ? 'current' : ''
              } ${savedRequests.some(r => r.scenarioId === scenario.id) ? 'completed' : ''}`}
              onClick={() => {
                setCurrentScenario(scenario);
                setSelectedApproach('');
                setScript('');
                setShowFeedback(false);
              }}
              title={scenario.serviceType}
            >
              {savedRequests.some(r => r.scenarioId === scenario.id) ? '✓' : i + 1}
            </button>
          ))}
        </div>

        {/* Key Principles */}
        <div className="mini-sandbox__principles">
          <h4>🔑 Testimonial Principles</h4>
          <ul>
            <li><strong>Timing:</strong> Ask when satisfaction is highest (right after success)</li>
            <li><strong>Specificity:</strong> Reference their specific words or results</li>
            <li><strong>Easy:</strong> Offer to draft or guide them</li>
            <li><strong>Confident:</strong> No apologizing — you earned this!</li>
            <li><strong>Options:</strong> Written, video, voice note, LinkedIn</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default TestimonialRequestSandbox;