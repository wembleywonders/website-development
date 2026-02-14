// src/pages/creators-hub/sandbox/steps/MiniLabStep.tsx
import React, { useState, ReactEventHandler } from 'react';
import './MiniLabStep.css';

interface Prompt {
  id: string;
  title: string;
  description: string;
  placeholder: string;
}

interface MiniLabResult {
  promptId: string;
  promptTitle?: string;
  response: string;
  timestamp: string;
}

interface MiniLabStepProps {
  onComplete: (result: MiniLabResult) => void;
}

const MiniLabStep: React.FC<MiniLabStepProps> = ({ onComplete }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [userResponse, setUserResponse] = useState<string>('');

  const prompts: Prompt[] = [
    {
      id: 'maker',
      title: '📸 Show Something You Made',
      description: 'Take a photo of something you created (food, art, code, anything!) and describe it in 3 sentences.',
      placeholder: 'I made... because... and I learned...',
    },
    {
      id: 'idea',
      title: '💡 Share an Idea',
      description: 'What\'s one thing you wish existed in your community? Describe it in 100 words.',
      placeholder: 'My idea is... it would help... because...',
    },
    {
      id: 'skill',
      title: '🎯 Teach One Thing',
      description: 'What\'s one skill you could teach someone in 5 minutes? Write a quick how-to.',
      placeholder: 'Here\'s how to... First... Then... Finally...',
    },
  ];

  const handlePromptSelect = (promptId: string): void => {
    setSelectedPrompt(promptId);
    setUserResponse('');
  };

  const handlePromptClick = (promptId: string): React.MouseEventHandler<HTMLDivElement> => {
    return () => {
      handlePromptSelect(promptId);
    };
  };

  const handleChangePrompt = (): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      setSelectedPrompt('');
    };
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      if (!selectedPrompt || !userResponse.trim()) {
        alert('Please complete the mini lab before continuing');
        return;
      }

      const prompt = prompts.find(p => p.id === selectedPrompt);
      onComplete({
        promptId: selectedPrompt,
        promptTitle: prompt?.title,
        response: userResponse,
        timestamp: new Date().toISOString(),
      });
    };
  };

  const getSelectedPrompt = (): Prompt | undefined => {
    return prompts.find(p => p.id === selectedPrompt);
  };

  const selectedPromptData = getSelectedPrompt();

  return (
    <div className="mini-lab-step">
      <div className="step-header">
        <h2>Step 1: Mini Lab</h2>
        <p>Choose a quick creative prompt to get started (takes ~10 minutes)</p>
      </div>

      {!selectedPrompt ? (
        <div className="prompt-selection">
          {prompts.map(prompt => (
            <div
              key={prompt.id}
              className="prompt-card"
              onClick={handlePromptClick(prompt.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePromptSelect(prompt.id);
                }
              }}
            >
              <h3>{prompt.title}</h3>
              <p>{prompt.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="prompt-response">
          <div className="selected-prompt">
            <h3>{selectedPromptData?.title || ''}</h3>
            <p>{selectedPromptData?.description || ''}</p>
            <button
              className="change-prompt"
              onClick={handleChangePrompt()}
            >
              Change Prompt
            </button>
          </div>

          <div className="response-area">
            <textarea
              value={userResponse}
              onChange={handleTextChange}
              placeholder={selectedPromptData?.placeholder || 'Write your response here...'}
              rows={8}
              aria-label="Mini lab response"
            />
            <div className="char-count">
              {userResponse.length} characters
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit()}
            disabled={!userResponse.trim()}
            aria-disabled={!userResponse.trim()}
          >
            Continue to Journal →
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniLabStep;