/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Sample Explorer - Browse Sound Effects, Moods & Genres
 * Part of Trubble n Bass creative tools.
 * 
 * "Every sound tells a story."
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  SOUND_EFFECT_CATEGORIES,
  MOOD_CATEGORIES,
  MUSIC_GENRES,
  RAYDYO_TEMPLATES,
  LIBRARY_STATS,
  searchSoundEffects,
  getFeaturedMoods,
  getAllMoodsSorted,
  SoundCategory,
  MoodCategory,
  Genre,
  ProductionTemplate
} from './data/soundLibrary';
import './SampleExplorer.css';

// ============================================
// TYPES
// ============================================

type ViewMode = 'sounds' | 'moods' | 'genres' | 'templates';

interface SampleExplorerProps {
  onClose?: () => void;
  onSelectSound?: (category: string, subcategory: string) => void;
  onSelectMood?: (mood: MoodCategory) => void;
  onSelectGenre?: (genre: Genre) => void;
  onSelectTemplate?: (template: ProductionTemplate) => void;
}

// ============================================
// MAIN COMPONENT
// ============================================

const SampleExplorer: React.FC<SampleExplorerProps> = ({
  onClose,
  onSelectSound,
  onSelectMood,
  onSelectGenre,
  onSelectTemplate
}) => {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('sounds');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAllMoods, setShowAllMoods] = useState(false);

  // Selection state
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Filtered data
  const filteredSounds = useMemo(() => {
    return searchSoundEffects(searchQuery);
  }, [searchQuery]);

  const displayMoods = useMemo(() => {
    return showAllMoods ? getAllMoodsSorted() : getFeaturedMoods();
  }, [showAllMoods]);

  // Handlers
  const handleMoodToggle = useCallback((mood: MoodCategory) => {
    setSelectedMoods(prev => {
      if (prev.includes(mood.id)) {
        return prev.filter(id => id !== mood.id);
      }
      return [...prev, mood.id];
    });
    onSelectMood?.(mood);
  }, [onSelectMood]);

  const handleGenreToggle = useCallback((genre: Genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre.id)) {
        return prev.filter(id => id !== genre.id);
      }
      return [...prev, genre.id];
    });
    onSelectGenre?.(genre);
  }, [onSelectGenre]);

  const handleSubcategorySelect = useCallback((category: SoundCategory, subcategory: string) => {
    onSelectSound?.(category.name, subcategory);
  }, [onSelectSound]);

  // ============================================
  // RENDER: Sound Effects Browser
  // ============================================

  const renderSoundEffects = () => (
    <div className="sfx-browser">
      {/* Search */}
      <div className="sfx-search">
        <span className="search-icon">馃攳</span>
        <input
          type="text"
          placeholder="Search sound effects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => setSearchQuery('')}>
            鉁�
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="sfx-stats">
        <span>{LIBRARY_STATS.soundCategories} categories</span>
        <span className="stat-divider">鈥�</span>
        <span>{LIBRARY_STATS.soundSubcategories} sounds</span>
      </div>

      {/* Categories Grid */}
      <div className="sfx-categories">
        {filteredSounds.map(category => (
          <div
            key={category.id}
            className={`sfx-category ${expandedCategory === category.id ? 'expanded' : ''}`}
          >
            {/* Category Header */}
            <button
              className="category-header"
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
            >
              <span className="category-icon">{category.icon}</span>
              <div className="category-info">
                <h4 className="category-name">{category.name}</h4>
                <span className="category-count">
                  {category.subcategories.length} sounds
                </span>
              </div>
              <span className={`expand-icon ${expandedCategory === category.id ? 'rotated' : ''}`}>
                鈻�
              </span>
            </button>

            {/* Subcategories */}
            {expandedCategory === category.id && (
              <div className="subcategories">
                {category.subcategories.map(sub => (
                  <button
                    key={sub}
                    className="subcategory-btn"
                    onClick={() => handleSubcategorySelect(category, sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSounds.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">馃攪</span>
          <p>No sounds found for "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')}>Clear search</button>
        </div>
      )}
    </div>
  );

  // ============================================
  // RENDER: Mood Selector
  // ============================================

  const renderMoods = () => (
    <div className="mood-browser">
      <div className="mood-header">
        <h3>Select the mood for your production</h3>
        <button
          className="mood-toggle-btn"
          onClick={() => setShowAllMoods(!showAllMoods)}
        >
          {showAllMoods ? '猸� Featured Only' : '馃敜 Show All A-Z'}
        </button>
      </div>

      <div className="mood-grid">
        {displayMoods.map(mood => {
          const isSelected = selectedMoods.includes(mood.id);
          return (
            <button
              key={mood.id}
              className={`mood-pill ${isSelected ? 'selected' : ''} ${mood.featured ? 'featured' : ''}`}
              style={{
                '--mood-color': mood.color,
                backgroundColor: isSelected ? mood.color : 'transparent',
                borderColor: mood.color
              } as React.CSSProperties}
              onClick={() => handleMoodToggle(mood)}
            >
              <span className="mood-name">{mood.name}</span>
              {mood.featured && !showAllMoods && (
                <span className="mood-star">猸�</span>
              )}
            </button>
          );
        })}
      </div>

      {selectedMoods.length > 0 && (
        <div className="mood-selection-summary">
          <span className="summary-label">Selected:</span>
          <div className="selected-moods">
            {selectedMoods.map(id => {
              const mood = MOOD_CATEGORIES.find(m => m.id === id);
              return mood ? (
                <span
                  key={id}
                  className="selected-mood-tag"
                  style={{ backgroundColor: mood.color }}
                >
                  {mood.name}
                  <button onClick={() => handleMoodToggle(mood)}>鉁�</button>
                </span>
              ) : null;
            })}
          </div>
          <button
            className="clear-selection"
            onClick={() => setSelectedMoods([])}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );

  // ============================================
  // RENDER: Genre Selector
  // ============================================

  const renderGenres = () => (
    <div className="genre-browser">
      <h3>Choose your genre</h3>
      
      <div className="genre-grid">
        {MUSIC_GENRES.map((genre: Genre) => {
          const isSelected: boolean = selectedGenres.includes(genre.id);
          return (
            <button
              key={genre.id}
              className={`genre-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleGenreToggle(genre)}
            >
              <span className="genre-icon">{genre.icon}</span>
              <h4 className="genre-name">{genre.name}</h4>
              <p className="genre-desc">{genre.description}</p>
              {genre.bpmRange && (
            <span className="genre-bpm">
              {genre.bpmRange[0]}-{genre.bpmRange[1]} BPM
            </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedGenres.length > 0 && (
        <div className="genre-selection-summary">
          <span>
            Selected: {selectedGenres
              .map(id => MUSIC_GENRES.find(g => g.id === id)?.name)
              .filter((name): name is string => !!name)
              .join(', ')
            }
          </span>
        </div>
      )}
    </div>
  );

  // ============================================
  // RENDER: Rayd-yo Templates
  // ============================================

  const renderTemplates = () => (
    <div className="template-browser">
      <div className="template-intro">
        <h3>馃摶 Rayd-yo Production Templates</h3>
        <p>Professional radio formats - ready to customise</p>
      </div>

      <div className="template-grid">
        {RAYDYO_TEMPLATES.map((template: ProductionTemplate) => (
          <button
            key={template.id}
            className="template-card"
            onClick={() => onSelectTemplate?.(template)}
          >
            <div className="template-header">
              <span className="template-category">{template.category}</span>
              <span className="template-duration">{template.duration}s</span>
            </div>
            <h4 className="template-name">{template.name}</h4>
            <p className="template-desc">{template.description}</p>
            <div className="template-meta">
              <span className="template-bpm">{template.bpm} BPM</span>
              <div className="template-tags">
            {template.suggestedMoods.slice(0, 2).map((moodId: string) => {
              const mood: MoodCategory | undefined = MOOD_CATEGORIES.find((m: MoodCategory) => m.id === moodId);
              return mood ? (
                <span
                  key={moodId}
                  className="template-mood-tag"
                  style={{ backgroundColor: mood.color }}
                >
                  {mood.name}
                </span>
              ) : null;
            })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="sample-explorer">
      {/* Header */}
      <header className="explorer-header">
        <div className="header-title">
          <h2>馃帶 Sample Explorer</h2>
          <p>Browse sounds, moods, and genres for your production</p>
        </div>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            鉁� Close
          </button>
        )}
      </header>

      {/* Tab Navigation */}
      <nav className="explorer-tabs">
        <button
          className={`tab ${viewMode === 'sounds' ? 'active' : ''}`}
          onClick={() => setViewMode('sounds')}
        >
          馃攰 Sound Effects
          <span className="tab-count">{LIBRARY_STATS.soundSubcategories}</span>
        </button>
        <button
          className={`tab ${viewMode === 'moods' ? 'active' : ''}`}
          onClick={() => setViewMode('moods')}
        >
          馃幁 Moods
          <span className="tab-count">{LIBRARY_STATS.moods}</span>
        </button>
        <button
          className={`tab ${viewMode === 'genres' ? 'active' : ''}`}
          onClick={() => setViewMode('genres')}
        >
          馃幍 Genres
          <span className="tab-count">{LIBRARY_STATS.genres}</span>
        </button>
        <button
          className={`tab ${viewMode === 'templates' ? 'active' : ''}`}
          onClick={() => setViewMode('templates')}
        >
          馃摶 Templates
          <span className="tab-count">{LIBRARY_STATS.templates}</span>
        </button>
      </nav>

      {/* Content */}
      <main className="explorer-content">
        {viewMode === 'sounds' && renderSoundEffects()}
        {viewMode === 'moods' && renderMoods()}
        {viewMode === 'genres' && renderGenres()}
        {viewMode === 'templates' && renderTemplates()}
      </main>

      {/* Footer with Uncle Winston */}
      <footer className="explorer-footer">
        <div className="winston-tip">
          <span className="winston-icon">馃懘馃従</span>
          <p>
            <strong>Uncle Winston:</strong> Sound selection is half the battle. 
            Choose sounds that fit the mood, not just sounds that sound cool.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SampleExplorer;