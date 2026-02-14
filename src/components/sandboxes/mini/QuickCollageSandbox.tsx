// src/components/sandboxes/mini/QuickCollageSandbox.tsx
// Mini-sandbox for creating 3-image collages
// Programme: G-Tech Casters / Content Creation
// Constraint: 3 images max, simple arrangement only

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { ConstraintMeter, SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './QuickCollageSandbox.css';

// ============================================
// PROMPTS
// ============================================

const COLLAGE_PROMPTS: SandboxPrompt[] = [
  {
    id: 'collage-before-after',
    title: 'Before, During, After',
    brief: 'Tell a transformation story in exactly 3 images. Could be a repair, a recipe, a journey, a makeover, or a day in progress. The sequence should tell the story without words.',
    category: 'Narrative Sequence',
    hints: [
      'The middle image is the transition - make it interesting',
      'Consistent framing helps viewers follow the story',
      'The "after" image should feel like a satisfying conclusion'
    ],
    inspiration: 'Instagram carousels that work best tell a complete story across slides. Each image earns its place by moving the narrative forward.'
  },
  {
    id: 'collage-texture',
    title: 'Three Textures',
    brief: 'Find 3 interesting textures in your environment. Could be surfaces, materials, patterns. Make us want to touch the screen.',
    category: 'Visual Exploration',
    hints: [
      'Get close - texture is about detail',
      'Consider contrast: rough/smooth, natural/manufactured',
      'Lighting reveals texture - side lighting works well'
    ],
    inspiration: 'Fashion mood boards often focus on texture over color. A leather, a knit, and a silk tell a story of contrast and luxury.'
  },
  {
    id: 'collage-color',
    title: 'One Color, Three Ways',
    brief: 'Pick a color. Find it in 3 different places or objects. Show us how the same color can look completely different in different contexts.',
    category: 'Color Study',
    hints: [
      'Natural vs artificial light changes everything',
      'Same color, different materials = different feeling',
      'Consider what the color "means" in each context'
    ],
    inspiration: 'William Eggleston found profound beauty in ordinary colored objects. A red ceiling becomes art through attention and framing.'
  },
  {
    id: 'collage-wembley',
    title: 'Wembley in Three Frames',
    brief: 'Capture the spirit of Wembley in just 3 images. Not tourist shots - your Wembley. The corners only locals know.',
    category: 'Place Portrait',
    hints: [
      'Wide, medium, close-up gives visual variety',
      'People, place, detail - a classic structure',
      'What makes Wembley *Wembley* to you?'
    ],
    inspiration: 'Martin Parr\'s seaside photos show that place portraits are about character, not beauty. Find the quirks.'
  },
  {
    id: 'collage-contrast',
    title: 'Old Meets New',
    brief: 'Find 3 moments where something old and something new exist together. Could be architecture, objects, people, anything.',
    category: 'Juxtaposition',
    hints: [
      'The tension between old and new is the story',
      'Look for surprising combinations',
      'Sometimes old and new complement; sometimes they clash'
    ],
    inspiration: 'Photographers like Gueorgui Pinkhassov find poetry in urban contrasts - ancient walls with modern graffiti, traditional dress with smartphones.'
  }
];

// ============================================
// TYPES
// ============================================

interface CollageImage {
  id: string;
  file: File;
  preview: string;
  position: number;
  caption?: string;
}

type LayoutStyle = 'row' | 'column' | 'grid' | 'feature-left' | 'feature-right';

// ============================================
// COMPONENT
// ============================================

const QuickCollageSandbox: React.FC = () => {
  const [currentPrompt] = useState<SandboxPrompt>(
    COLLAGE_PROMPTS[Math.floor(Math.random() * COLLAGE_PROMPTS.length)]
  );
  const [images, setImages] = useState<CollageImage[]>([]);
  const [layout, setLayout] = useState<LayoutStyle>('row');
  const [collageTitle, setCollageTitle] = useState('');

  const constraints: SandboxConstraints = {
    maxItems: 3,
    timeLimit: 15,  // 15 minute session
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = constraints.maxItems! - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newImages: CollageImage[] = filesToAdd.map((file, index) => ({
      id: `img-${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      position: images.length + index
    }));

    setImages(prev => [...prev, ...newImages]);
    e.target.value = ''; // Reset input
  }, [images.length, constraints.maxItems]);

  const removeImage = useCallback((imageId: string) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      // Revoke old preview URL
      const removed = prev.find(img => img.id === imageId);
      if (removed) URL.revokeObjectURL(removed.preview);
      return updated;
    });
  }, []);

  const moveImage = useCallback((imageId: string, direction: 'left' | 'right') => {
    setImages(prev => {
      const index = prev.findIndex(img => img.id === imageId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, []);

  const updateCaption = useCallback((imageId: string, caption: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, caption } : img
    ));
  }, []);

  const canAddMore = images.length < constraints.maxItems!;

  const layouts: { id: LayoutStyle; label: string; icon: string }[] = [
    { id: 'row', label: 'Row', icon: '⬜⬜⬜' },
    { id: 'column', label: 'Column', icon: '⬛' },
    { id: 'grid', label: 'Grid', icon: '⊞' },
    { id: 'feature-left', label: 'Feature Left', icon: '◧' },
    { id: 'feature-right', label: 'Feature Right', icon: '◨' },
  ];

  return (
    <MiniSandboxBase
      sandboxId="quick-collage"
      sandboxName="3-Image Collage"
      sandboxEmoji="🖼️"
      programme="G-Tech Casters"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="quick-collage-sandbox">
        {/* Image Counter */}
        <div className="image-counter-section">
          <ConstraintMeter
            label="Images"
            current={images.length}
            max={constraints.maxItems!}
            unit="images"
            emoji="🖼️"
          />
        </div>

        {/* Title Input */}
        <div className="title-section">
          <label htmlFor="collage-title">Collage Title (optional)</label>
          <input
            id="collage-title"
            type="text"
            value={collageTitle}
            onChange={(e) => setCollageTitle(e.target.value)}
            placeholder="Give your collage a title..."
            maxLength={100}
          />
        </div>

        {/* Upload Area */}
        {canAddMore && (
          <div className="upload-section">
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
              <span className="upload-icon">📷</span>
              <span className="upload-text">
                Click to add images ({constraints.maxItems! - images.length} remaining)
              </span>
              <span className="upload-hint">
                JPG, PNG, or GIF
              </span>
            </label>
          </div>
        )}

        {/* Layout Selector */}
        {images.length > 1 && (
          <div className="layout-section">
            <label>Layout Style</label>
            <div className="layout-options">
              {layouts.map(l => (
                <button
                  key={l.id}
                  className={`layout-btn ${layout === l.id ? 'active' : ''}`}
                  onClick={() => setLayout(l.id)}
                >
                  <span className="layout-icon">{l.icon}</span>
                  <span className="layout-label">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collage Preview */}
        <div className={`collage-preview layout-${layout} images-${images.length}`}>
          {images.length === 0 ? (
            <div className="collage-empty">
              <span>🖼️</span>
              <p>Your collage will appear here</p>
              <p className="hint">Add up to 3 images to start</p>
            </div>
          ) : (
            images.map((img, index) => (
              <div key={img.id} className="collage-image-wrapper">
                <img src={img.preview} alt={`Image ${index + 1}`} />
                <div className="image-overlay">
                  <div className="image-controls">
                    {index > 0 && (
                      <button onClick={() => moveImage(img.id, 'left')}>←</button>
                    )}
                    {index < images.length - 1 && (
                      <button onClick={() => moveImage(img.id, 'right')}>→</button>
                    )}
                    <button 
                      className="btn-remove"
                      onClick={() => removeImage(img.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  className="image-caption"
                  placeholder={`Caption ${index + 1} (optional)`}
                  value={img.caption || ''}
                  onChange={(e) => updateCaption(img.id, e.target.value)}
                />
              </div>
            ))
          )}
        </div>

        {/* Image List (for reordering on mobile) */}
        {images.length > 0 && (
          <div className="image-list-mobile">
            <h4>Your Images</h4>
            <div className="image-list">
              {images.map((img, index) => (
                <div key={img.id} className="image-list-item">
                  <span className="item-number">{index + 1}</span>
                  <img src={img.preview} alt="" />
                  <span className="item-name">{img.file.name}</span>
                  <div className="item-actions">
                    <button 
                      onClick={() => moveImage(img.id, 'left')}
                      disabled={index === 0}
                    >↑</button>
                    <button 
                      onClick={() => moveImage(img.id, 'right')}
                      disabled={index === images.length - 1}
                    >↓</button>
                    <button onClick={() => removeImage(img.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Panel */}
        <div className="tips-panel">
          <h4>🎯 Quick Collage Tips</h4>
          <ul>
            <li><strong>3 is enough</strong> - More images doesn't mean better</li>
            <li><strong>Sequence matters</strong> - Order creates narrative</li>
            <li><strong>Look for connections</strong> - Color, shape, or theme</li>
            <li><strong>Crop in camera</strong> - Frame tightly when shooting</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default QuickCollageSandbox;