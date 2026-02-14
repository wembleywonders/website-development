// src/components/sandboxes/mini/StyleBoardSandbox.tsx
// 👗 Style Board Creator
// Silk Stilettos - Create a 3-look mood board for client consultations

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt, SandboxResult } from './MiniSandboxBase';
import { Palette, Plus, Trash2, CheckCircle, User } from 'lucide-react';
import './MiniSandbox.css';

interface ClientBrief {
  id: string;
  name: string;
  occasion: string;
  budget: string;
  bodyType: string;
  preferences: string;
  avoids: string;
  inspiration: string;
}

interface StyleLook {
  id: string;
  name: string;
  occasion: string;
  keyPieces: string[];
  colors: string[];
  accessories: string[];
  notes: string;
}

const CLIENT_BRIEFS: ClientBrief[] = [
  {
    id: 'wedding-guest',
    name: 'Adaeze',
    occasion: 'Nigerian wedding guest (not bridal party)',
    budget: '£150-300',
    bodyType: 'Curvy, size 16',
    preferences: 'Bold colors, traditional and modern mix',
    avoids: 'White, cream, anything too revealing',
    inspiration: 'Elegant but want to stand out'
  },
  {
    id: 'job-interview',
    name: 'Priya',
    occasion: 'Law firm interview',
    budget: '£100-200',
    bodyType: 'Petite, size 8',
    preferences: 'Classic, professional, modest',
    avoids: 'Bright colors, patterns, heels over 2"',
    inspiration: 'Confident but approachable'
  },
  {
    id: 'date-night',
    name: 'Keisha',
    occasion: 'Anniversary dinner',
    budget: '£80-150',
    bodyType: 'Athletic, size 12',
    preferences: 'Feminine, a bit sexy but classy',
    avoids: 'Uncomfortable shoes, bodycon',
    inspiration: 'Effortlessly put-together'
  },
  {
    id: 'church-sunday',
    name: 'Sister Gloria',
    occasion: 'Church thanksgiving service',
    budget: '£100-200',
    bodyType: 'Plus size, size 20',
    preferences: 'Elegant, respectful, colorful',
    avoids: 'Short hemlines, sleeveless, tight fits',
    inspiration: 'Dignified, graceful presence'
  },
  {
    id: 'business-casual',
    name: 'Fatima',
    occasion: 'New marketing job (creative agency)',
    budget: '£200-350',
    bodyType: 'Tall, size 14',
    preferences: 'Modern, creative, modest (hijabi)',
    avoids: 'Sheer fabrics, short skirts',
    inspiration: 'Fashion-forward professional'
  }
];

const COLOR_OPTIONS = [
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Burgundy', hex: '#722f37' },
  { name: 'Emerald', hex: '#046307' },
  { name: 'Gold', hex: '#d4af37' },
  { name: 'Coral', hex: '#ff6f61' },
  { name: 'Blush', hex: '#de98ab' },
  { name: 'Cream', hex: '#fffdd0' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Mustard', hex: '#ffdb58' },
  { name: 'Purple', hex: '#6b3fa0' }
];

const StyleBoardSandbox: React.FC = () => {
  const [currentClient, setCurrentClient] = useState(CLIENT_BRIEFS[0]);
  const [looks, setLooks] = useState<StyleLook[]>([
    { id: '1', name: '', occasion: '', keyPieces: [''], colors: [], accessories: [''], notes: '' }
  ]);
  const [savedBoards, setSavedBoards] = useState<Array<{client: string; looks: StyleLook[]}>>([]);

  const constraints: SandboxConstraints = {
    minItems: 3, // 3 looks per board
    timeLimit: 600 // 10 minutes
  };

  const prompt: SandboxPrompt = {
    title: `Style Board for ${currentClient.name}`,
    instruction: `Create 3 complete looks for ${currentClient.occasion}. Consider their budget (${currentClient.budget}), body type, and preferences.`,
    tips: [
      'Each look should serve a different need',
      'Consider their body type and comfort',
      'Stay within their stated budget',
      'Include accessories that elevate the look'
    ]
  };

  const addLook = () => {
    if (looks.length < 3) {
      setLooks([...looks, {
        id: Date.now().toString(),
        name: '',
        occasion: '',
        keyPieces: [''],
        colors: [],
        accessories: [''],
        notes: ''
      }]);
    }
  };

  const removeLook = (id: string) => {
    if (looks.length > 1) {
      setLooks(looks.filter(l => l.id !== id));
    }
  };

  const updateLook = (id: string, field: keyof StyleLook, value: any) => {
    setLooks(looks.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addKeyPiece = (lookId: string) => {
    setLooks(looks.map(l => 
      l.id === lookId ? { ...l, keyPieces: [...l.keyPieces, ''] } : l
    ));
  };

  const updateKeyPiece = (lookId: string, index: number, value: string) => {
    setLooks(looks.map(l => {
      if (l.id !== lookId) return l;
      const newPieces = [...l.keyPieces];
      newPieces[index] = value;
      return { ...l, keyPieces: newPieces };
    }));
  };

  const toggleColor = (lookId: string, colorName: string) => {
    setLooks(looks.map(l => {
      if (l.id !== lookId) return l;
      const hasColor = l.colors.includes(colorName);
      return {
        ...l,
        colors: hasColor 
          ? l.colors.filter(c => c !== colorName)
          : [...l.colors, colorName].slice(0, 3)
      };
    }));
  };

  const addAccessory = (lookId: string) => {
    setLooks(looks.map(l =>
      l.id === lookId ? { ...l, accessories: [...l.accessories, ''] } : l
    ));
  };

  const updateAccessory = (lookId: string, index: number, value: string) => {
    setLooks(looks.map(l => {
      if (l.id !== lookId) return l;
      const newAccessories = [...l.accessories];
      newAccessories[index] = value;
      return { ...l, accessories: newAccessories };
    }));
  };

  const isLookComplete = (look: StyleLook) => {
    return look.name.trim() !== '' &&
           look.keyPieces.filter(p => p.trim()).length >= 2 &&
           look.colors.length >= 1;
  };

  const completeLooks = looks.filter(isLookComplete);
  const isComplete = completeLooks.length >= 3;

  const nextClient = () => {
    if (isComplete) {
      setSavedBoards([...savedBoards, { client: currentClient.name, looks: completeLooks }]);
    }
    const currentIndex = CLIENT_BRIEFS.findIndex(c => c.id === currentClient.id);
    const nextIndex = (currentIndex + 1) % CLIENT_BRIEFS.length;
    setCurrentClient(CLIENT_BRIEFS[nextIndex]);
    setLooks([{ id: '1', name: '', occasion: '', keyPieces: [''], colors: [], accessories: [''], notes: '' }]);
  };

  const handleComplete = useCallback((): SandboxResult => {
    const allBoards = isComplete
      ? [...savedBoards, { client: currentClient.name, looks: completeLooks }]
      : savedBoards;

    return {
      success: isComplete || savedBoards.length > 0,
      data: {
        boards: allBoards,
        totalBoards: allBoards.length,
        currentClient: currentClient.name,
        completeLooksCount: completeLooks.length
      },
      feedback: completeLooks.length < 3
        ? `You have ${completeLooks.length}/3 complete looks. Each look needs a name, 2+ key pieces, and at least 1 color.`
        : `Style board complete for ${currentClient.name}! ${allBoards.length} board${allBoards.length > 1 ? 's' : ''} created. Ready for real client consultations!`
    };
  }, [looks, completeLooks, isComplete, savedBoards, currentClient]);

  return (
    <MiniSandboxBase
      title="Style Board Creator"
      emoji="👗"
      programme="Silk Stilettos"
      constraints={constraints}
      prompt={prompt}
      onComplete={handleComplete}
      color="#ec4899"
    >
      <div className="mini-sandbox__style-board">
        {/* Client Brief */}
        <div className="mini-sandbox__client-brief">
          <div className="mini-sandbox__brief-header">
            <User size={20} />
            <h3>{currentClient.name}</h3>
            <span className="mini-sandbox__brief-budget">{currentClient.budget}</span>
          </div>
          <p className="mini-sandbox__brief-occasion"><strong>Occasion:</strong> {currentClient.occasion}</p>
          <div className="mini-sandbox__brief-details">
            <span><strong>Body:</strong> {currentClient.bodyType}</span>
            <span><strong>Likes:</strong> {currentClient.preferences}</span>
            <span><strong>Avoids:</strong> {currentClient.avoids}</span>
          </div>
          <p className="mini-sandbox__brief-inspo"><em>"{currentClient.inspiration}"</em></p>
        </div>

        {/* Progress */}
        <div className="mini-sandbox__board-progress">
          <span>{completeLooks.length}/3 looks complete</span>
          {isComplete && <CheckCircle size={18} className="success" />}
        </div>

        {/* Looks */}
        <div className="mini-sandbox__looks">
          {looks.map((look, lookIndex) => (
            <div key={look.id} className={`mini-sandbox__look-card ${isLookComplete(look) ? 'complete' : ''}`}>
              <div className="mini-sandbox__look-header">
                <span className="mini-sandbox__look-num">Look {lookIndex + 1}</span>
                {looks.length > 1 && (
                  <button className="mini-sandbox__remove-look" onClick={() => removeLook(look.id)}>
                    <Trash2 size={16} />
                  </button>
                )}
                {isLookComplete(look) && <CheckCircle size={16} className="mini-sandbox__look-check" />}
              </div>

              {/* Look Name */}
              <input
                type="text"
                value={look.name}
                onChange={(e) => updateLook(look.id, 'name', e.target.value)}
                placeholder="Look name (e.g., 'Bold & Beautiful')"
                className="mini-sandbox__look-name-input"
              />

              {/* Key Pieces */}
              <div className="mini-sandbox__look-section">
                <label>Key Pieces *</label>
                {look.keyPieces.map((piece, i) => (
                  <input
                    key={i}
                    type="text"
                    value={piece}
                    onChange={(e) => updateKeyPiece(look.id, i, e.target.value)}
                    placeholder={`Piece ${i + 1} (e.g., "Emerald wrap dress")`}
                  />
                ))}
                {look.keyPieces.length < 4 && (
                  <button className="mini-sandbox__add-piece" onClick={() => addKeyPiece(look.id)}>
                    <Plus size={14} /> Add Piece
                  </button>
                )}
              </div>

              {/* Colors */}
              <div className="mini-sandbox__look-section">
                <label>Color Palette * (select up to 3)</label>
                <div className="mini-sandbox__color-grid">
                  {COLOR_OPTIONS.map(color => (
                    <button
                      key={color.name}
                      className={`mini-sandbox__color-btn ${look.colors.includes(color.name) ? 'selected' : ''}`}
                      onClick={() => toggleColor(look.id, color.name)}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {look.colors.includes(color.name) && <CheckCircle size={12} />}
                    </button>
                  ))}
                </div>
                <div className="mini-sandbox__selected-colors">
                  {look.colors.join(', ') || 'No colors selected'}
                </div>
              </div>

              {/* Accessories */}
              <div className="mini-sandbox__look-section">
                <label>Accessories</label>
                {look.accessories.map((acc, i) => (
                  <input
                    key={i}
                    type="text"
                    value={acc}
                    onChange={(e) => updateAccessory(look.id, i, e.target.value)}
                    placeholder={`Accessory ${i + 1} (e.g., "Gold statement earrings")`}
                  />
                ))}
                {look.accessories.length < 3 && (
                  <button className="mini-sandbox__add-piece" onClick={() => addAccessory(look.id)}>
                    <Plus size={14} /> Add Accessory
                  </button>
                )}
              </div>

              {/* Notes */}
              <div className="mini-sandbox__look-section">
                <label>Styling Notes</label>
                <textarea
                  value={look.notes}
                  onChange={(e) => updateLook(look.id, 'notes', e.target.value)}
                  placeholder="Why this works for them, how to style it..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Look */}
        {looks.length < 3 && (
          <button className="mini-sandbox__add-look" onClick={addLook}>
            <Plus size={18} /> Add Look ({looks.length}/3)
          </button>
        )}

        {/* Next Client */}
        {isComplete && (
          <button className="mini-sandbox__next-client" onClick={nextClient}>
            Save & Next Client
          </button>
        )}

        {/* Saved Boards */}
        {savedBoards.length > 0 && (
          <div className="mini-sandbox__saved-boards">
            <h4>Completed Boards: {savedBoards.length}</h4>
            {savedBoards.map((board, i) => (
              <div key={i} className="mini-sandbox__saved-board">
                {board.client} - {board.looks.length} looks
              </div>
            ))}
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default StyleBoardSandbox;