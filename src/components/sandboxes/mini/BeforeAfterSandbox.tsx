// src/components/sandboxes/mini/BeforeAfterSandbox.tsx
// ✨ Before/After Transformation
// Silk Stilettos - Document transformations for your portfolio

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Camera, ArrowRight, CheckCircle, Plus, Star } from 'lucide-react';
import './MiniSandbox.css';

interface TransformationType {
  id: string;
  name: string;
  icon: string;
  beforePrompts: string[];
  afterPrompts: string[];
  impactQuestions: string[];
}

const TRANSFORMATION_TYPES: TransformationType[] = [
  {
    id: 'wardrobe',
    name: 'Wardrobe Edit',
    icon: '👗',
    beforePrompts: [
      'What was their wardrobe like before?',
      'What were their daily outfit struggles?',
      'How long did getting dressed take?'
    ],
    afterPrompts: [
      'What key pieces did you introduce?',
      'What did you remove or donate?',
      'What\'s their new morning routine?'
    ],
    impactQuestions: [
      'How much time do they save daily?',
      'How do they feel getting dressed now?',
      'What compliments have they received?'
    ]
  },
  {
    id: 'event-look',
    name: 'Event Styling',
    icon: '✨',
    beforePrompts: [
      'What was their initial vision?',
      'What challenges did they express?',
      'What had they tried before?'
    ],
    afterPrompts: [
      'What final look did you create?',
      'What was the hero piece?',
      'How did styling elevate the outfit?'
    ],
    impactQuestions: [
      'How did they feel at the event?',
      'What reactions did they get?',
      'Would they book you again?'
    ]
  },
  {
    id: 'space-makeover',
    name: 'Space Makeover',
    icon: '🏠',
    beforePrompts: [
      'What was the space like before?',
      'What wasn\'t working?',
      'What was the budget?'
    ],
    afterPrompts: [
      'What changes did you make?',
      'What key pieces were added?',
      'What was kept/repurposed?'
    ],
    impactQuestions: [
      'How does the space feel now?',
      'How is it being used differently?',
      'What do visitors say?'
    ]
  },
  {
    id: 'brand-image',
    name: 'Brand Image',
    icon: '💼',
    beforePrompts: [
      'What was their professional image before?',
      'What impression were they giving?',
      'What opportunities were they missing?'
    ],
    afterPrompts: [
      'What\'s their new signature style?',
      'What key changes were made?',
      'How does it align with their goals?'
    ],
    impactQuestions: [
      'How has their confidence changed?',
      'Any career/business impact?',
      'What do colleagues/clients say?'
    ]
  },
  {
    id: 'confidence',
    name: 'Confidence Journey',
    icon: '💪',
    beforePrompts: [
      'How did they feel about their appearance?',
      'What were they hiding or avoiding?',
      'What was holding them back?'
    ],
    afterPrompts: [
      'What helped them feel confident?',
      'What do they now embrace?',
      'What\'s their new favorite outfit?'
    ],
    impactQuestions: [
      'How has their self-talk changed?',
      'What are they now doing they weren\'t before?',
      'How has this affected other areas of life?'
    ]
  }
];

interface Transformation {
  clientName: string;
  type: string;
  beforeStory: string;
  afterStory: string;
  impact: string;
  testimonial: string;
  rating: number;
}

const BeforeAfterSandbox: React.FC = () => {
  const [selectedType, setSelectedType] = useState(TRANSFORMATION_TYPES[0]);
  const [transformation, setTransformation] = useState<Transformation>({
    clientName: '',
    type: selectedType.name,
    beforeStory: '',
    afterStory: '',
    impact: '',
    testimonial: '',
    rating: 5
  });
  const [savedTransformations, setSavedTransformations] = useState<Transformation[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const constraints: SandboxConstraints = {
    minItems: 1,
    timeLimit: 600
  };

  const prompt: SandboxPrompt = {
    title: `Document: ${selectedType.name}`,
    instruction: 'Create a compelling before/after story for your portfolio. Real or practice case.',
    tips: [
      'Specific details make it believable',
      'Focus on feelings, not just facts',
      'Include a client quote if possible',
      'Show the transformation journey'
    ]
  };

  const updateTransformation = (field: keyof Transformation, value: string | number) => {
    setTransformation(prev => ({ ...prev, [field]: value }));
  };

  const isComplete = 
    transformation.clientName.trim().length > 0 &&
    transformation.beforeStory.trim().length > 20 &&
    transformation.afterStory.trim().length > 20 &&
    transformation.impact.trim().length > 10;

  const saveTransformation = () => {
    if (isComplete) {
      setSavedTransformations([...savedTransformations, { ...transformation, type: selectedType.name }]);
      setTransformation({
        clientName: '',
        type: selectedType.name,
        beforeStory: '',
        afterStory: '',
        impact: '',
        testimonial: '',
        rating: 5
      });
    }
  };

  const changeType = (type: TransformationType) => {
    setSelectedType(type);
    setTransformation(prev => ({ ...prev, type: type.name }));
    setCurrentPromptIndex(0);
  };

  const handleComplete = useCallback((): SandboxResult => {
    const allTransformations = isComplete 
      ? [...savedTransformations, transformation]
      : savedTransformations;

    return {
      success: allTransformations.length >= 1,
      data: {
        transformations: allTransformations,
        totalDocumented: allTransformations.length
      },
      feedback: !isComplete && savedTransformations.length === 0
        ? 'Complete all required fields: client name, before story, after story, and impact.'
        : `${allTransformations.length} transformation${allTransformations.length > 1 ? 's' : ''} documented! These stories will sell your services better than any ad.`
    };
  }, [transformation, isComplete, savedTransformations]);

  return (
    <MiniSandboxBase
      title="Before/After Transformation"
      emoji="✨"
      programme="Silk Stilettos"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#ec4899"
    >
      <div className="mini-sandbox__before-after">
        {/* Type Selector */}
        <div className="mini-sandbox__type-selector">
          {TRANSFORMATION_TYPES.map(type => (
            <button
              key={type.id}
              className={`mini-sandbox__type-btn ${selectedType.id === type.id ? 'selected' : ''}`}
              onClick={() => changeType(type)}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* Client Name */}
        <div className="mini-sandbox__field">
          <label>Client Name (or pseudonym) *</label>
          <input
            type="text"
            value={transformation.clientName}
            onChange={(e) => updateTransformation('clientName', e.target.value)}
            placeholder="e.g., Adaeze, 'A busy mum from Wembley'"
          />
        </div>

        {/* Before/After Container */}
        <div className="mini-sandbox__ba-container">
          {/* Before */}
          <div className="mini-sandbox__ba-section before">
            <div className="mini-sandbox__ba-header">
              <span className="mini-sandbox__ba-label">BEFORE</span>
            </div>
            <div className="mini-sandbox__ba-prompts">
              {selectedType.beforePrompts.map((p, i) => (
                <span key={i} className="mini-sandbox__ba-prompt">• {p}</span>
              ))}
            </div>
            <textarea
              value={transformation.beforeStory}
              onChange={(e) => updateTransformation('beforeStory', e.target.value)}
              placeholder="Describe the situation before your help..."
              rows={4}
            />
            <div className="mini-sandbox__char-count">
              {transformation.beforeStory.length} characters
              {transformation.beforeStory.length < 20 && ' (min 20)'}
            </div>
          </div>

          {/* Arrow */}
          <div className="mini-sandbox__ba-arrow">
            <ArrowRight size={24} />
          </div>

          {/* After */}
          <div className="mini-sandbox__ba-section after">
            <div className="mini-sandbox__ba-header">
              <span className="mini-sandbox__ba-label">AFTER</span>
            </div>
            <div className="mini-sandbox__ba-prompts">
              {selectedType.afterPrompts.map((p, i) => (
                <span key={i} className="mini-sandbox__ba-prompt">• {p}</span>
              ))}
            </div>
            <textarea
              value={transformation.afterStory}
              onChange={(e) => updateTransformation('afterStory', e.target.value)}
              placeholder="Describe the transformation..."
              rows={4}
            />
            <div className="mini-sandbox__char-count">
              {transformation.afterStory.length} characters
              {transformation.afterStory.length < 20 && ' (min 20)'}
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="mini-sandbox__field">
          <label>The Impact *</label>
          <div className="mini-sandbox__impact-prompts">
            {selectedType.impactQuestions.map((q, i) => (
              <span key={i}>• {q}</span>
            ))}
          </div>
          <textarea
            value={transformation.impact}
            onChange={(e) => updateTransformation('impact', e.target.value)}
            placeholder="What changed for them as a result?"
            rows={3}
          />
        </div>

        {/* Testimonial */}
        <div className="mini-sandbox__field">
          <label>Client Testimonial (optional but powerful)</label>
          <textarea
            value={transformation.testimonial}
            onChange={(e) => updateTransformation('testimonial', e.target.value)}
            placeholder='"In their own words..."'
            rows={2}
          />
        </div>

        {/* Rating */}
        <div className="mini-sandbox__field">
          <label>Their Rating</label>
          <div className="mini-sandbox__star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                className={`mini-sandbox__star ${star <= transformation.rating ? 'filled' : ''}`}
                onClick={() => updateTransformation('rating', star)}
              >
                <Star size={24} />
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        {isComplete && (
          <button className="mini-sandbox__save-transformation" onClick={saveTransformation}>
            <CheckCircle size={18} /> Save & Document Another
          </button>
        )}

        {/* Preview */}
        {isComplete && (
          <div className="mini-sandbox__ba-preview">
            <h4>Portfolio Preview</h4>
            <div className="mini-sandbox__preview-card">
              <div className="mini-sandbox__preview-header">
                <span>{selectedType.icon} {selectedType.name}</span>
                <span className="mini-sandbox__preview-client">{transformation.clientName}</span>
              </div>
              <div className="mini-sandbox__preview-ba">
                <div className="mini-sandbox__preview-before">
                  <strong>Before:</strong>
                  <p>{transformation.beforeStory.substring(0, 100)}...</p>
                </div>
                <div className="mini-sandbox__preview-after">
                  <strong>After:</strong>
                  <p>{transformation.afterStory.substring(0, 100)}...</p>
                </div>
              </div>
              {transformation.testimonial && (
                <p className="mini-sandbox__preview-quote">"{transformation.testimonial}"</p>
              )}
              <div className="mini-sandbox__preview-stars">
                {'⭐'.repeat(transformation.rating)}
              </div>
            </div>
          </div>
        )}

        {/* Saved */}
        {savedTransformations.length > 0 && (
          <div className="mini-sandbox__saved-transformations">
            <h4>Documented: {savedTransformations.length}</h4>
            {savedTransformations.map((t, i) => (
              <div key={i} className="mini-sandbox__saved-transformation">
                <span>{t.type}</span>
                <span>{t.clientName}</span>
                <span>{'⭐'.repeat(t.rating)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default BeforeAfterSandbox;