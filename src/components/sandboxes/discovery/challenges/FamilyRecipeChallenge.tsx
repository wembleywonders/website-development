// src/components/sandboxes/discovery/challenges/FamilyRecipeChallenge.tsx
// Auntie Anansi's Kitchen: Document a family recipe with its story
// Cultural preservation through food

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface FamilyRecipeChallengeProps {
  onComplete: (result: { completed: boolean; recipe?: FamilyRecipe; timeSpent: number }) => void;
  onSkip: () => void;
}

interface FamilyRecipe {
  name: string;
  origin: string;
  learnedFrom: string;
  occasion: string;
  story: string;
  ingredients: string[];
  keyTechnique: string;
  secretTip: string;
}

const ORIGIN_PROMPTS = [
  'Jamaica', 'Trinidad', 'Barbados', 'Nigeria', 'Ghana', 'India', 
  'Pakistan', 'Bangladesh', 'Poland', 'Ireland', 'Italy', 'Portugal',
  'Wembley fusion', 'Family invention', 'Other'
];

const OCCASION_PROMPTS = [
  { emoji: '🎄', label: 'Christmas / Holiday' },
  { emoji: '🎂', label: 'Birthdays' },
  { emoji: '🙏', label: 'Sunday dinner' },
  { emoji: '💒', label: 'Weddings / Big events' },
  { emoji: '😷', label: 'When someone\'s sick' },
  { emoji: '👋', label: 'When guests come' },
  { emoji: '💰', label: 'End of month (budget meal)' },
  { emoji: '☀️', label: 'Summer cookout' },
  { emoji: '❤️', label: 'Just because' }
];

const STORY_PROMPTS = [
  'The first time you had this dish',
  'Who makes it best in your family',
  'The argument about the "right" way to make it',
  'What this dish means to your family',
  'A memory connected to this food'
];

const FamilyRecipeChallenge: React.FC<FamilyRecipeChallengeProps> = ({ onComplete, onSkip }) => {
  const [recipe, setRecipe] = useState<Partial<FamilyRecipe>>({
    name: '',
    origin: '',
    learnedFrom: '',
    occasion: '',
    story: '',
    ingredients: ['', '', '', '', ''],
    keyTechnique: '',
    secretTip: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime] = useState(Date.now());

  const updateField = useCallback((field: keyof FamilyRecipe, value: any) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateIngredient = useCallback((index: number, value: string) => {
    setRecipe(prev => {
      const ingredients = [...(prev.ingredients || ['', '', '', '', ''])];
      ingredients[index] = value;
      return { ...prev, ingredients };
    });
  }, []);

  const addIngredient = useCallback(() => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), '']
    }));
  }, []);

  const filledIngredients = (recipe.ingredients || []).filter(i => i.trim()).length;
  const hasBasics = recipe.name?.trim() && recipe.learnedFrom?.trim();
  const hasStory = recipe.story?.trim() && recipe.story.length >= 50;
  const hasIngredients = filledIngredients >= 3;
  const isComplete = hasBasics && hasStory && hasIngredients;

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      recipe: {
        name: recipe.name || '',
        origin: recipe.origin || '',
        learnedFrom: recipe.learnedFrom || '',
        occasion: recipe.occasion || '',
        story: recipe.story || '',
        ingredients: (recipe.ingredients || []).filter(i => i.trim()),
        keyTechnique: recipe.keyTechnique || '',
        secretTip: recipe.secretTip || ''
      },
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [recipe, startTime, onComplete]);

  const steps = [
    { id: 'basics', title: 'The Dish', done: hasBasics },
    { id: 'story', title: 'The Story', done: hasStory },
    { id: 'ingredients', title: 'Ingredients', done: hasIngredients },
    { id: 'secrets', title: 'Secrets', done: recipe.keyTechnique?.trim() || recipe.secretTip?.trim() }
  ];

  return (
    <div className="challenge-container recipe-challenge">
      {/* Step Navigation */}
      <div className="step-nav">
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`step-btn ${currentStep === index ? 'active' : ''} ${step.done ? 'done' : ''}`}
            onClick={() => setCurrentStep(index)}
          >
            <span className="step-indicator">{step.done ? '✓' : index + 1}</span>
            <span className="step-title">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content">
        {/* Step 1: Basics */}
        {currentStep === 0 && (
          <div className="recipe-step">
            <h3>🍲 What's the Dish?</h3>
            
            <div className="field-group">
              <label>Recipe Name</label>
              <input
                type="text"
                value={recipe.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="What do you call it?"
              />
            </div>

            <div className="field-group">
              <label>Where does it come from?</label>
              <div className="origin-chips">
                {ORIGIN_PROMPTS.map(origin => (
                  <button
                    key={origin}
                    className={`chip ${recipe.origin === origin ? 'selected' : ''}`}
                    onClick={() => updateField('origin', origin)}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label>Who taught you / Who makes it?</label>
              <input
                type="text"
                value={recipe.learnedFrom || ''}
                onChange={(e) => updateField('learnedFrom', e.target.value)}
                placeholder="Grandma, Mum, Auntie, learned from YouTube..."
              />
            </div>

            <div className="field-group">
              <label>When do you eat it?</label>
              <div className="occasion-chips">
                {OCCASION_PROMPTS.map(occ => (
                  <button
                    key={occ.label}
                    className={`chip ${recipe.occasion === occ.label ? 'selected' : ''}`}
                    onClick={() => updateField('occasion', occ.label)}
                  >
                    {occ.emoji} {occ.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Story */}
        {currentStep === 1 && (
          <div className="recipe-step">
            <h3>📖 The Story Behind It</h3>
            <p className="step-intro">
              Every family recipe carries a story. This is what makes it more than just food.
            </p>
            
            <div className="story-prompts">
              <strong>Story starters:</strong>
              <ul>
                {STORY_PROMPTS.map((prompt, i) => (
                  <li key={i}>{prompt}</li>
                ))}
              </ul>
            </div>

            <div className="field-group">
              <label>Tell the story of this dish in your family</label>
              <textarea
                value={recipe.story || ''}
                onChange={(e) => updateField('story', e.target.value)}
                placeholder="Share a memory, a tradition, or why this dish matters..."
                rows={5}
              />
              <span className="char-hint">
                {(recipe.story || '').length} characters 
                {(recipe.story || '').length < 50 && ' (aim for at least 50)'}
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Ingredients */}
        {currentStep === 2 && (
          <div className="recipe-step">
            <h3>🥘 The Ingredients</h3>
            <p className="step-intro">
              List from memory - don't worry about exact measurements! 
              "A good handful" or "til it looks right" counts.
            </p>
            
            <div className="ingredients-list">
              {(recipe.ingredients || []).map((ing, index) => (
                <div key={index} className="ingredient-row">
                  <span className="ing-number">{index + 1}</span>
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={index < 3 ? 'Main ingredient' : 'Additional ingredient (optional)'}
                  />
                </div>
              ))}
            </div>
            
            {(recipe.ingredients || []).length < 10 && (
              <button className="btn-add-ingredient" onClick={addIngredient}>
                + Add another ingredient
              </button>
            )}
            
            <div className="ingredients-count">
              {filledIngredients} ingredients listed
              {filledIngredients < 3 && ' (need at least 3)'}
            </div>
          </div>
        )}

        {/* Step 4: Secrets */}
        {currentStep === 3 && (
          <div className="recipe-step">
            <h3>🤫 The Family Secrets</h3>
            <p className="step-intro">
              Every great cook has their tricks. What makes YOUR version special?
            </p>
            
            <div className="field-group">
              <label>Key Technique</label>
              <input
                type="text"
                value={recipe.keyTechnique || ''}
                onChange={(e) => updateField('keyTechnique', e.target.value)}
                placeholder="e.g., 'Let the onions caramelize properly - don't rush it'"
              />
            </div>

            <div className="field-group">
              <label>The Secret Tip</label>
              <textarea
                value={recipe.secretTip || ''}
                onChange={(e) => updateField('secretTip', e.target.value)}
                placeholder="The thing that makes all the difference... the ingredient no one expects, the step most people skip, the timing that matters"
                rows={3}
              />
            </div>

            <div className="secret-examples">
              <strong>Examples of family secrets:</strong>
              <ul>
                <li>"A splash of vinegar right at the end"</li>
                <li>"The meat has to marinate overnight, no shortcuts"</li>
                <li>"Use the fat from last week's roast"</li>
                <li>"Grandma's pot - nothing else works the same"</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Recipe Card Preview */}
      {recipe.name && (
        <div className="recipe-preview">
          <h4>📝 Recipe Card Preview</h4>
          <div className="preview-card">
            <div className="preview-header">
              <strong>{recipe.name}</strong>
              {recipe.origin && <span className="origin-tag">{recipe.origin}</span>}
            </div>
            {recipe.learnedFrom && (
              <p className="preview-source">From: {recipe.learnedFrom}</p>
            )}
            {recipe.occasion && (
              <p className="preview-occasion">Made for: {recipe.occasion}</p>
            )}
            {recipe.story && (
              <p className="preview-story">"{recipe.story.substring(0, 100)}..."</p>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-navigation">
        {currentStep > 0 && (
          <button className="btn-prev" onClick={() => setCurrentStep(currentStep - 1)}>
            ← Previous
          </button>
        )}
        {currentStep < 3 ? (
          <button className="btn-next" onClick={() => setCurrentStep(currentStep + 1)}>
            Next →
          </button>
        ) : null}
      </div>

      <div className="tips-compact">
        <strong>Why this matters:</strong> Recipes are oral history. Every dish documented is 
        a piece of culture preserved for the next generation.
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
          {isComplete ? '✅ Save Recipe' : 'Complete basics, story & ingredients'}
        </button>
      </div>
    </div>
  );
};

export default FamilyRecipeChallenge;