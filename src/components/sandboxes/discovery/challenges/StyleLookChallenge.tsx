// src/components/sandboxes/discovery/challenges/StyleLookChallenge.tsx
// Silk Stilettos: Style a complete look for a specific occasion

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface StyleLookChallengeProps {
  onComplete: (result: { completed: boolean; outfit?: Outfit; timeSpent: number }) => void;
  onSkip: () => void;
}

interface Outfit {
  occasion: string;
  top: string;
  bottom: string;
  shoes: string;
  accessory: string;
  explanation: string;
}

interface ClothingItem {
  id: string;
  name: string;
  emoji: string;
  category: 'top' | 'bottom' | 'shoes' | 'accessory';
  styles: string[]; // Which occasions this works for
}

const OCCASIONS = [
  { id: 'interview', name: 'Job Interview', emoji: '💼', hint: 'Professional but approachable' },
  { id: 'date', name: 'First Date', emoji: '💕', hint: 'Confident and comfortable' },
  { id: 'party', name: 'Birthday Party', emoji: '🎉', hint: 'Fun and expressive' },
  { id: 'funeral', name: 'Funeral', emoji: '🕯️', hint: 'Respectful and understated' },
  { id: 'casual', name: 'Weekend Brunch', emoji: '🥐', hint: 'Relaxed but put-together' }
];

const CLOTHING_ITEMS: ClothingItem[] = [
  // Tops
  { id: 'blazer', name: 'Tailored Blazer', emoji: '🧥', category: 'top', styles: ['interview', 'funeral'] },
  { id: 'blouse', name: 'Silk Blouse', emoji: '👚', category: 'top', styles: ['interview', 'date', 'funeral'] },
  { id: 'tshirt', name: 'Graphic Tee', emoji: '👕', category: 'top', styles: ['party', 'casual'] },
  { id: 'sweater', name: 'Cozy Knit', emoji: '🧶', category: 'top', styles: ['casual', 'date'] },
  { id: 'crop', name: 'Crop Top', emoji: '👙', category: 'top', styles: ['party'] },
  { id: 'shirt', name: 'Button-Down', emoji: '👔', category: 'top', styles: ['interview', 'casual', 'funeral'] },
  
  // Bottoms
  { id: 'trousers', name: 'Tailored Trousers', emoji: '👖', category: 'bottom', styles: ['interview', 'funeral'] },
  { id: 'jeans', name: 'Dark Jeans', emoji: '👖', category: 'bottom', styles: ['casual', 'date', 'party'] },
  { id: 'skirt', name: 'Midi Skirt', emoji: '🩱', category: 'bottom', styles: ['interview', 'date', 'funeral'] },
  { id: 'miniskirt', name: 'Mini Skirt', emoji: '👗', category: 'bottom', styles: ['party', 'date'] },
  { id: 'shorts', name: 'Linen Shorts', emoji: '🩳', category: 'bottom', styles: ['casual', 'party'] },
  
  // Shoes
  { id: 'heels', name: 'Block Heels', emoji: '👠', category: 'shoes', styles: ['interview', 'date', 'party'] },
  { id: 'loafers', name: 'Leather Loafers', emoji: '👞', category: 'shoes', styles: ['interview', 'casual', 'funeral'] },
  { id: 'sneakers', name: 'Clean Sneakers', emoji: '👟', category: 'shoes', styles: ['casual', 'party'] },
  { id: 'boots', name: 'Ankle Boots', emoji: '👢', category: 'shoes', styles: ['date', 'casual', 'party'] },
  { id: 'flats', name: 'Ballet Flats', emoji: '🥿', category: 'shoes', styles: ['interview', 'funeral', 'casual'] },
  
  // Accessories
  { id: 'watch', name: 'Classic Watch', emoji: '⌚', category: 'accessory', styles: ['interview', 'funeral', 'date'] },
  { id: 'statement', name: 'Statement Necklace', emoji: '📿', category: 'accessory', styles: ['party', 'date'] },
  { id: 'scarf', name: 'Silk Scarf', emoji: '🧣', category: 'accessory', styles: ['interview', 'casual'] },
  { id: 'bag', name: 'Structured Bag', emoji: '👜', category: 'accessory', styles: ['interview', 'funeral'] },
  { id: 'earrings', name: 'Drop Earrings', emoji: '💎', category: 'accessory', styles: ['party', 'date'] },
  { id: 'sunglasses', name: 'Sunglasses', emoji: '🕶️', category: 'accessory', styles: ['casual', 'party'] }
];

const StyleLookChallenge: React.FC<StyleLookChallengeProps> = ({ onComplete, onSkip }) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({
    top: '',
    bottom: '',
    shoes: '',
    accessory: ''
  });
  const [explanation, setExplanation] = useState('');
  const [startTime] = useState(Date.now());

  const occasion = OCCASIONS.find(o => o.id === selectedOccasion);

  const selectItem = useCallback((category: string, itemId: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category] === itemId ? '' : itemId
    }));
  }, []);

  const getItemById = (id: string) => CLOTHING_ITEMS.find(i => i.id === id);

  const isGoodChoice = (item: ClothingItem) => {
    return selectedOccasion ? item.styles.includes(selectedOccasion) : false;
  };

  // Calculate outfit score
  const selectedItems = Object.values(selections).filter(Boolean);
  const goodChoices = selectedItems.filter(id => {
    const item = getItemById(id);
    return item && isGoodChoice(item);
  }).length;

  const outfitComplete = selectedItems.length === 4;
  const outfitScore = outfitComplete ? Math.round((goodChoices / 4) * 100) : 0;

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      outfit: {
        occasion: selectedOccasion || '',
        top: selections.top,
        bottom: selections.bottom,
        shoes: selections.shoes,
        accessory: selections.accessory,
        explanation
      },
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [selectedOccasion, selections, explanation, startTime, onComplete]);

  return (
    <div className="challenge-container style-challenge">
      {/* Occasion Selection */}
      {!selectedOccasion ? (
        <div className="occasion-selection">
          <h3>Choose an Occasion</h3>
          <p>What are you dressing for?</p>
          
          <div className="occasion-grid">
            {OCCASIONS.map(occ => (
              <button
                key={occ.id}
                className="occasion-card"
                onClick={() => setSelectedOccasion(occ.id)}
              >
                <span className="occ-emoji">{occ.emoji}</span>
                <span className="occ-name">{occ.name}</span>
                <span className="occ-hint">{occ.hint}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Occasion Header */}
          <div className="occasion-header">
            <div className="occasion-info">
              <span className="occ-emoji-large">{occasion?.emoji}</span>
              <div>
                <h3>Styling for: {occasion?.name}</h3>
                <p>{occasion?.hint}</p>
              </div>
            </div>
            <button 
              className="btn-change-occasion"
              onClick={() => {
                setSelectedOccasion(null);
                setSelections({ top: '', bottom: '', shoes: '', accessory: '' });
              }}
            >
              Change occasion
            </button>
          </div>

          {/* Outfit Preview */}
          <div className="outfit-preview">
            <h4>Your Look</h4>
            <div className="outfit-slots">
              {(['top', 'bottom', 'shoes', 'accessory'] as const).map(category => {
                const item = getItemById(selections[category]);
                const isGood = item && isGoodChoice(item);
                
                return (
                  <div 
                    key={category} 
                    className={`outfit-slot ${item ? 'filled' : ''} ${isGood ? 'good-choice' : ''}`}
                  >
                    {item ? (
                      <>
                        <span className="slot-emoji">{item.emoji}</span>
                        <span className="slot-name">{item.name}</span>
                        {isGood && <span className="good-badge">✓ Great choice!</span>}
                      </>
                    ) : (
                      <>
                        <span className="slot-placeholder">?</span>
                        <span className="slot-label">{category}</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
            {outfitComplete && (
              <div className={`outfit-score ${outfitScore >= 75 ? 'great' : outfitScore >= 50 ? 'good' : 'needs-work'}`}>
                <span className="score-value">{outfitScore}%</span>
                <span className="score-label">
                  {outfitScore >= 75 ? 'Perfect for the occasion!' : 
                   outfitScore >= 50 ? 'Nice! Some pieces could be swapped.' : 
                   'Creative! Might not fit the occasion though.'}
                </span>
              </div>
            )}
          </div>

          {/* Item Selection */}
          <div className="item-selection">
            {(['top', 'bottom', 'shoes', 'accessory'] as const).map(category => (
              <div key={category} className="category-section">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <div className="items-row">
                  {CLOTHING_ITEMS.filter(i => i.category === category).map(item => {
                    const isSelected = selections[category] === item.id;
                    const wouldBeGood = isGoodChoice(item);
                    
                    return (
                      <button
                        key={item.id}
                        className={`item-btn ${isSelected ? 'selected' : ''} ${wouldBeGood ? 'recommended' : ''}`}
                        onClick={() => selectItem(category, item.id)}
                      >
                        <span className="item-emoji">{item.emoji}</span>
                        <span className="item-name">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          {outfitComplete && (
            <div className="explanation-section">
              <label>Why does this look work? (optional)</label>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain your styling choices..."
                rows={2}
              />
            </div>
          )}
        </>
      )}

      <div className="tips-compact">
        <strong>Styling principle:</strong> Context is everything. The same item can be 
        perfect or terrible depending on the occasion. Always dress for where you're going.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!outfitComplete}
        >
          {outfitComplete ? '✅ Complete Look' : 'Select all 4 items'}
        </button>
      </div>
    </div>
  );
};

export default StyleLookChallenge;