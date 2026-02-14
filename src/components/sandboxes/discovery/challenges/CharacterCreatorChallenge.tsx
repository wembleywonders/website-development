// src/components/sandboxes/discovery/challenges/CharacterCreatorChallenge.tsx
// Kaywana's Court: Create a character with a secret and a goal

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface CharacterCreatorChallengeProps {
  onComplete: (result: { completed: boolean; character?: Character; timeSpent: number }) => void;
  onSkip: () => void;
}

interface Character {
  name: string;
  age: string;
  role: string;
  want: string;       // What they want (public goal)
  need: string;       // What they need (deeper need)
  secret: string;     // What they're hiding
  quirk: string;      // Memorable detail
}

const PROMPTS = {
  roles: [
    'Shop owner', 'Teacher', 'Delivery driver', 'Nurse', 'Street performer',
    'Security guard', 'Chef', 'Bus driver', 'Hairdresser', 'Mechanic'
  ],
  wants: [
    'To be respected', 'To find love', 'To get rich', 'To escape',
    'To prove themselves', 'To protect someone', 'To start over', 'To be remembered'
  ],
  needs: [
    'To forgive themselves', 'To let go of the past', 'To accept help',
    'To be honest', 'To face their fear', 'To trust again', 'To slow down'
  ],
  secrets: [
    'They\'re not who they claim to be', 'They made a terrible mistake',
    'They know something dangerous', 'They\'re planning to leave',
    'They\'re in love with someone forbidden', 'They can\'t read',
    'They\'re deeply in debt', 'They witnessed something'
  ],
  quirks: [
    'Always hums the same tune', 'Never makes eye contact',
    'Collects unusual objects', 'Speaks in questions',
    'Has a distinctive laugh', 'Always early/always late',
    'Refers to themselves in third person', 'Has a nervous habit'
  ]
};

const CharacterCreatorChallenge: React.FC<CharacterCreatorChallengeProps> = ({ onComplete, onSkip }) => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    age: '',
    role: '',
    want: '',
    need: '',
    secret: '',
    quirk: ''
  });
  const [startTime] = useState(Date.now());

  const updateField = useCallback((field: keyof Character, value: string) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  }, []);

  const randomize = useCallback((field: keyof typeof PROMPTS) => {
    const options = PROMPTS[field];
    const random = options[Math.floor(Math.random() * options.length)];
    updateField(field === 'roles' ? 'role' : field === 'wants' ? 'want' : field === 'needs' ? 'need' : field === 'secrets' ? 'secret' : 'quirk', random);
  }, [updateField]);

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      character,
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [character, startTime, onComplete]);

  const isComplete = character.name && character.role && character.want && character.secret;
  const completedFields = Object.values(character).filter(Boolean).length;

  return (
    <div className="challenge-container character-challenge">
      <div className="character-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(completedFields / 7) * 100}%` }}
          />
        </div>
        <span>{completedFields}/7 details</span>
      </div>

      <div className="character-form">
        {/* Basic Info */}
        <div className="form-row">
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="What's their name?"
            />
          </div>
          <div className="form-field short">
            <label>Age</label>
            <input
              type="text"
              value={character.age}
              onChange={(e) => updateField('age', e.target.value)}
              placeholder="e.g., 30s"
            />
          </div>
        </div>

        {/* Role */}
        <div className="form-field with-random">
          <label>Role/Occupation</label>
          <div className="input-with-btn">
            <input
              type="text"
              value={character.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="What do they do?"
            />
            <button onClick={() => randomize('roles')}>🎲</button>
          </div>
        </div>

        {/* Want vs Need */}
        <div className="form-section">
          <h4>🎭 Want vs Need</h4>
          <p className="section-hint">
            What they <em>want</em> is their surface goal. What they <em>need</em> is 
            what will actually make them whole.
          </p>
          
          <div className="form-field with-random">
            <label>What they WANT (surface goal)</label>
            <div className="input-with-btn">
              <input
                type="text"
                value={character.want}
                onChange={(e) => updateField('want', e.target.value)}
                placeholder="Their obvious goal"
              />
              <button onClick={() => randomize('wants')}>🎲</button>
            </div>
          </div>

          <div className="form-field with-random">
            <label>What they NEED (deeper need)</label>
            <div className="input-with-btn">
              <input
                type="text"
                value={character.need}
                onChange={(e) => updateField('need', e.target.value)}
                placeholder="What they don't realize they need"
              />
              <button onClick={() => randomize('needs')}>🎲</button>
            </div>
          </div>
        </div>

        {/* Secret */}
        <div className="form-section secret-section">
          <h4>🤫 The Secret</h4>
          <p className="section-hint">
            Every interesting character is hiding something. It creates tension.
          </p>
          
          <div className="form-field with-random">
            <label>Their Secret</label>
            <div className="input-with-btn">
              <textarea
                value={character.secret}
                onChange={(e) => updateField('secret', e.target.value)}
                placeholder="What are they hiding?"
                rows={2}
              />
              <button onClick={() => randomize('secrets')}>🎲</button>
            </div>
          </div>
        </div>

        {/* Quirk */}
        <div className="form-field with-random">
          <label>Memorable Quirk</label>
          <div className="input-with-btn">
            <input
              type="text"
              value={character.quirk}
              onChange={(e) => updateField('quirk', e.target.value)}
              placeholder="A distinctive habit or trait"
            />
            <button onClick={() => randomize('quirks')}>🎲</button>
          </div>
        </div>
      </div>

      {/* Character Preview */}
      {isComplete && (
        <div className="character-preview">
          <h4>📋 Character Summary</h4>
          <p>
            <strong>{character.name}</strong>
            {character.age && ` (${character.age})`} is a <strong>{character.role}</strong> who 
            wants <em>{character.want}</em>
            {character.need && <>, but what they really need is to <em>{character.need}</em></>}.
            {character.secret && <> They're hiding something: <em>{character.secret.toLowerCase()}</em>.</>}
            {character.quirk && <> You'd notice them because <em>{character.quirk.toLowerCase()}</em>.</>}
          </p>
        </div>
      )}

      <div className="tips-compact">
        <strong>Drama tip:</strong> Conflict comes from the gap between want and need. 
        The secret threatens everything. The quirk makes them human.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          {isComplete ? '✅ Complete Character' : 'Fill name, role, want & secret'}
        </button>
      </div>
    </div>
  );
};

export default CharacterCreatorChallenge;