/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Songwriting Workshop - Complete Creative Tools
 * Chords, Melody, Structure, Lyrics - everything you need to write songs.
 * 
 * "The song was always in you. These tools help you find it."
 */

import React, { useState, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import {
  CHORD_PROGRESSIONS,
  SCALES,
  MELODIC_PATTERNS,
  SONG_SECTIONS,
  SONG_STRUCTURES,
  RHYME_TYPES,
  LYRIC_PROMPTS,
  RHYME_GROUPS,
  KEY_CHORDS,
  NOTES,
  CHORD_TYPES,
  SONGWRITING_STATS,
  getProgressionsByGenre,
  getScaleNotes,
  findRhymes,
  countSyllables,
  ChordProgression,
  Scale,
  SongStructure,
  LyricPrompt
} from './data/songwritingLibrary';
import './SongwritingWorkshop.css';

// ============================================
// TYPES
// ============================================

type WorkshopTab = 'chords' | 'melody' | 'structure' | 'lyrics';

interface SongwritingWorkshopProps {
  onClose?: () => void;
}

// ============================================
// AUDIO SETUP
// ============================================

let synth: Tone.PolySynth | null = null;

const initAudio = async () => {
  if (synth) return;
  await Tone.start();
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.8 }
  }).toDestination();
  synth.volume.value = -6;
};

const playChord = async (notes: string[], duration = '2n') => {
  await initAudio();
  if (!synth) return;
  const notesWithOctave = notes.map((n, i) => `${n}${i === 0 ? 3 : 4}`);
  synth.triggerAttackRelease(notesWithOctave, duration);
};

const playNote = async (note: string, octave = 4) => {
  await initAudio();
  if (!synth) return;
  synth.triggerAttackRelease(`${note}${octave}`, '8n');
};

const playProgression = async (chords: string[], key: string) => {
  await initAudio();
  if (!synth) return;
  
  const keyChords = KEY_CHORDS[key] || KEY_CHORDS['C'];
  const numeralToIndex: { [key: string]: number } = {
    'I': 0, 'i': 0, 'ii': 1, 'II': 1, 'iii': 2, 'III': 2,
    'IV': 3, 'iv': 3, 'V': 4, 'v': 4, 'vi': 5, 'VI': 5,
    'vii': 6, 'VII': 6, 'vii°': 6
  };
  
  let time = Tone.now();
  chords.forEach((numeral, i) => {
    const cleanNumeral = numeral.replace('7', '').replace('maj', '').replace('dim', '').replace('°', '');
    const index = numeralToIndex[cleanNumeral];
    if (index !== undefined && keyChords[index]) {
      const chordRoot = keyChords[index].replace('m', '').replace('dim', '');
      const isMinor = keyChords[index].includes('m') || numeral.toLowerCase() === numeral;
      const intervals = isMinor ? CHORD_TYPES.minor.intervals : CHORD_TYPES.major.intervals;
      const rootIndex = NOTES.indexOf(chordRoot);
      if (rootIndex !== -1) {
        const notes = intervals.map(int => `${NOTES[(rootIndex + int) % 12]}${int === 0 ? 3 : 4}`);
        synth?.triggerAttackRelease(notes, '2n', time + i * 0.6);
      }
    }
  });
};

// ============================================
// MAIN COMPONENT
// ============================================

const SongwritingWorkshop: React.FC<SongwritingWorkshopProps> = ({ onClose }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<WorkshopTab>('chords');

  // Chord Builder State
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedProgression, setSelectedProgression] = useState<ChordProgression | null>(null);
  const [genreFilter, setGenreFilter] = useState<string>('all');

  // Melody State
  const [melodyKey, setMelodyKey] = useState('C');
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [melodyNotes, setMelodyNotes] = useState<string[]>([]);

  // Structure State
  const [selectedStructure, setSelectedStructure] = useState<SongStructure | null>(null);
  const [customSections, setCustomSections] = useState<string[]>([]);

  // Lyrics State
  const [rhymeWord, setRhymeWord] = useState('');
  const [foundRhymes, setFoundRhymes] = useState<string[]>([]);
  const [lyricText, setLyricText] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<LyricPrompt | null>(null);

  // ============================================
  // CHORD BUILDER
  // ============================================

  const filteredProgressions = useMemo(() => {
    if (genreFilter === 'all') return CHORD_PROGRESSIONS;
    return getProgressionsByGenre(genreFilter);
  }, [genreFilter]);

  const genres = useMemo(() => {
    const allGenres = new Set<string>();
    CHORD_PROGRESSIONS.forEach(p => p.genres.forEach(g => allGenres.add(g)));
    return Array.from(allGenres).sort();
  }, []);

  const handlePlayProgression = useCallback(() => {
    if (selectedProgression) {
      playProgression(selectedProgression.numerals.slice(0, 4), selectedKey);
    }
  }, [selectedProgression, selectedKey]);

  const renderChordBuilder = () => (
    <div className="workshop-panel chord-builder">
      <div className="panel-header">
        <h3>🎸 Chord Progression Builder</h3>
        <p>Find the perfect chords for your song</p>
      </div>

      {/* Key & Filter Selection */}
      <div className="controls-row">
        <div className="control-group">
          <label>Key</label>
          <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
            {NOTES.map(note => (
              <option key={note} value={note}>{note} Major</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Genre Filter</label>
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chords in Key */}
      <div className="chords-in-key">
        <h4>Chords in {selectedKey} Major</h4>
        <div className="key-chords">
          {KEY_CHORDS[selectedKey]?.map((chord, i) => {
            const numerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
            return (
              <button
                key={chord}
                className={`key-chord ${chord.includes('m') ? 'minor' : 'major'} ${chord.includes('dim') ? 'dim' : ''}`}
                onClick={() => {
                  const root = chord.replace('m', '').replace('dim', '');
                  const isMinor = chord.includes('m');
                  const intervals = isMinor ? CHORD_TYPES.minor.intervals : CHORD_TYPES.major.intervals;
                  const rootIndex = NOTES.indexOf(root);
                  const notes = intervals.map(int => NOTES[(rootIndex + int) % 12]);
                  playChord(notes);
                }}
              >
                <span className="chord-name">{chord}</span>
                <span className="chord-numeral">{numerals[i]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progression Library */}
      <div className="progression-library">
        <h4>Chord Progressions ({filteredProgressions.length})</h4>
        <div className="progressions-grid">
          {filteredProgressions.map(prog => (
            <button
              key={prog.id}
              className={`progression-card ${selectedProgression?.id === prog.id ? 'selected' : ''}`}
              onClick={() => setSelectedProgression(prog)}
            >
              <div className="prog-header">
                <span className="prog-name">{prog.name}</span>
                {prog.cultural && <span className="prog-cultural">🌍</span>}
              </div>
              <div className="prog-numerals">
                {prog.numerals.slice(0, 4).join(' → ')}
                {prog.numerals.length > 4 && '...'}
              </div>
              <div className="prog-mood">{prog.mood}</div>
              <div className="prog-genres">
                {prog.genres.slice(0, 3).map(g => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Progression Details */}
      {selectedProgression && (
        <div className="progression-details">
          <div className="details-header">
            <h4>{selectedProgression.name}</h4>
            <button className="play-btn" onClick={handlePlayProgression}>
              ▶ Play in {selectedKey}
            </button>
          </div>
          
          <div className="details-body">
            <div className="prog-full-numerals">
              {selectedProgression.numerals.map((num, i) => (
                <span key={i} className="numeral-box">{num}</span>
              ))}
            </div>
            
            <p className="prog-description">{selectedProgression.description}</p>
            
            {selectedProgression.cultural && (
              <div className="cultural-note">
                <span className="cultural-icon">🌍</span>
                <span>{selectedProgression.cultural}</span>
              </div>
            )}
            
            {selectedProgression.famous && selectedProgression.famous.length > 0 && (
              <div className="famous-songs">
                <strong>Famous examples:</strong> {selectedProgression.famous.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // ============================================
  // MELODY WORKSHOP
  // ============================================

  const scaleNotes = useMemo(() => {
    return getScaleNotes(melodyKey, selectedScale.id);
  }, [melodyKey, selectedScale]);

  const handleAddNote = useCallback((note: string) => {
    playNote(note);
    setMelodyNotes(prev => [...prev, note]);
  }, []);

  const handleClearMelody = useCallback(() => {
    setMelodyNotes([]);
  }, []);

  const handlePlayMelody = useCallback(async () => {
    await initAudio();
    if (!synth || melodyNotes.length === 0) return;
    
    let time = Tone.now();
    melodyNotes.forEach((note, i) => {
      synth?.triggerAttackRelease(`${note}4`, '8n', time + i * 0.3);
    });
  }, [melodyNotes]);

  const renderMelodyWorkshop = () => (
    <div className="workshop-panel melody-workshop">
      <div className="panel-header">
        <h3>🎵 Melody Workshop</h3>
        <p>Build melodies that stick</p>
      </div>

      {/* Key & Scale Selection */}
      <div className="controls-row">
        <div className="control-group">
          <label>Key</label>
          <select value={melodyKey} onChange={(e) => setMelodyKey(e.target.value)}>
            {NOTES.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Scale</label>
          <select 
            value={selectedScale.id} 
            onChange={(e) => {
              const scale = SCALES.find(s => s.id === e.target.value);
              if (scale) setSelectedScale(scale);
            }}
          >
            {SCALES.map(scale => (
              <option key={scale.id} value={scale.id}>{scale.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scale Info */}
      <div className="scale-info">
        <div className="scale-mood">
          <strong>Mood:</strong> {selectedScale.mood}
        </div>
        <div className="scale-genres">
          <strong>Used in:</strong> {selectedScale.genres.join(', ')}
        </div>
        <p className="scale-desc">{selectedScale.description}</p>
      </div>

      {/* Scale Notes - Playable */}
      <div className="scale-keyboard">
        <h4>Notes in {melodyKey} {selectedScale.name}</h4>
        <div className="scale-notes">
          {scaleNotes.map((note, i) => (
            <button
              key={`${note}-${i}`}
              className={`scale-note ${note === melodyKey ? 'root' : ''}`}
              onClick={() => handleAddNote(note)}
            >
              {note}
              <span className="degree">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Melody Builder */}
      <div className="melody-builder">
        <div className="melody-header">
          <h4>Your Melody</h4>
          <div className="melody-actions">
            <button onClick={handlePlayMelody} disabled={melodyNotes.length === 0}>
              ▶ Play
            </button>
            <button onClick={handleClearMelody} disabled={melodyNotes.length === 0}>
              Clear
            </button>
          </div>
        </div>
        <div className="melody-display">
          {melodyNotes.length === 0 ? (
            <span className="melody-placeholder">Click notes above to build your melody...</span>
          ) : (
            melodyNotes.map((note, i) => (
              <span key={i} className="melody-note">{note}</span>
            ))
          )}
        </div>
      </div>

      {/* Melodic Patterns */}
      <div className="melodic-patterns">
        <h4>Melodic Patterns & Shapes</h4>
        <div className="patterns-grid">
          {MELODIC_PATTERNS.map(pattern => (
            <div key={pattern.id} className="pattern-card">
              <div className="pattern-name">{pattern.name}</div>
              <div className="pattern-contour">
                {pattern.contour.map((dir, i) => (
                  <span key={i} className={`contour-arrow ${dir}`}>
                    {dir === 'up' && '↗'}
                    {dir === 'down' && '↘'}
                    {dir === 'same' && '→'}
                    {dir === 'jump-up' && '⤴'}
                    {dir === 'jump-down' && '⤵'}
                  </span>
                ))}
              </div>
              <div className="pattern-emotion">{pattern.emotion}</div>
              {pattern.example && (
                <div className="pattern-example">e.g. {pattern.example}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // SONG STRUCTURE
  // ============================================

  const handleSelectStructure = useCallback((structure: SongStructure) => {
    setSelectedStructure(structure);
    setCustomSections([...structure.sections]);
  }, []);

  const handleAddSection = useCallback((sectionId: string) => {
    setCustomSections(prev => [...prev, sectionId]);
  }, []);

  const handleRemoveSection = useCallback((index: number) => {
    setCustomSections(prev => prev.filter((_, i) => i !== index));
  }, []);

  const renderStructureBuilder = () => (
    <div className="workshop-panel structure-builder">
      <div className="panel-header">
        <h3>🏗️ Song Structure Builder</h3>
        <p>Arrange your sections into a complete song</p>
      </div>

      {/* Structure Templates */}
      <div className="structure-templates">
        <h4>Structure Templates</h4>
        <div className="templates-grid">
          {SONG_STRUCTURES.map(structure => (
            <button
              key={structure.id}
              className={`structure-template ${selectedStructure?.id === structure.id ? 'selected' : ''}`}
              onClick={() => handleSelectStructure(structure)}
            >
              <div className="template-name">{structure.name}</div>
              <div className="template-genres">{structure.genres.join(', ')}</div>
              <div className="template-sections">
                {structure.sections.slice(0, 5).join(' → ')}
                {structure.sections.length > 5 && '...'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Structure */}
      <div className="current-structure">
        <h4>Your Song Structure</h4>
        <div className="structure-timeline">
          {customSections.length === 0 ? (
            <span className="structure-placeholder">Select a template or add sections below...</span>
          ) : (
            customSections.map((sectionId, i) => {
              const section = SONG_SECTIONS.find(s => s.id === sectionId);
              return (
                <div key={i} className={`timeline-section ${sectionId}`}>
                  <span className="section-name">{section?.name || sectionId}</span>
                  <span className="section-bars">{section?.typicalBars || 8} bars</span>
                  <button 
                    className="remove-section"
                    onClick={() => handleRemoveSection(i)}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>
        {customSections.length > 0 && (
          <div className="structure-stats">
            Total: ~{customSections.reduce((acc, id) => {
              const section = SONG_SECTIONS.find(s => s.id === id);
              return acc + (section?.typicalBars || 8);
            }, 0)} bars
          </div>
        )}
      </div>

      {/* Section Palette */}
      <div className="section-palette">
        <h4>Add Sections</h4>
        <div className="sections-grid">
          {SONG_SECTIONS.map(section => (
            <button
              key={section.id}
              className={`section-btn ${section.id}`}
              onClick={() => handleAddSection(section.id)}
            >
              <span className="section-title">{section.name}</span>
              <span className="section-bars-small">{section.typicalBars} bars</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Reference */}
      <div className="section-reference">
        <h4>Section Guide</h4>
        <div className="reference-grid">
          {SONG_SECTIONS.slice(0, 6).map(section => (
            <div key={section.id} className="reference-card">
              <h5>{section.name}</h5>
              <p className="ref-purpose">{section.purpose}</p>
              {section.lyricalFocus && (
                <p className="ref-lyrics"><strong>Lyrics:</strong> {section.lyricalFocus}</p>
              )}
              <ul className="ref-tips">
                {section.tips.slice(0, 2).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // LYRIC LAB
  // ============================================

  const handleFindRhymes = useCallback(() => {
    if (!rhymeWord.trim()) return;
    const rhymes = findRhymes(rhymeWord.trim());
    
    // Also search all rhyme groups for partial matches
    const additionalRhymes: string[] = [];
    const wordEnding = rhymeWord.slice(-2).toLowerCase();
    
    Object.entries(RHYME_GROUPS).forEach(([, words]) => {
      words.forEach(w => {
        if (w.toLowerCase().endsWith(wordEnding) && 
            w.toLowerCase() !== rhymeWord.toLowerCase() &&
            !rhymes.includes(w)) {
          additionalRhymes.push(w);
        }
      });
    });
    
    setFoundRhymes([...rhymes, ...additionalRhymes.slice(0, 10)]);
  }, [rhymeWord]);

  const syllableCount = useMemo(() => {
    return countSyllables(lyricText);
  }, [lyricText]);

  const lineCount = useMemo(() => {
    return lyricText.split('\n').filter(line => line.trim()).length;
  }, [lyricText]);

  const renderLyricLab = () => (
    <div className="workshop-panel lyric-lab">
      <div className="panel-header">
        <h3>✍️ Lyric Lab</h3>
        <p>Write words that move people</p>
      </div>

      <div className="lyric-tools">
        {/* Rhyme Finder */}
        <div className="rhyme-finder">
          <h4>🔍 Rhyme Finder</h4>
          <div className="rhyme-input-row">
            <input
              type="text"
              placeholder="Enter a word..."
              value={rhymeWord}
              onChange={(e) => setRhymeWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFindRhymes()}
            />
            <button onClick={handleFindRhymes}>Find Rhymes</button>
          </div>
          {foundRhymes.length > 0 && (
            <div className="rhymes-results">
              {foundRhymes.map((rhyme, i) => (
                <span key={i} className="rhyme-word">{rhyme}</span>
              ))}
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="writing-area">
          <h4>📝 Write Your Lyrics</h4>
          <textarea
            placeholder="Start writing your lyrics here...&#10;&#10;Tip: Press Enter for new lines to see your syllable count per line."
            value={lyricText}
            onChange={(e) => setLyricText(e.target.value)}
          />
          <div className="lyric-stats">
            <span className="stat">{lineCount} lines</span>
            <span className="stat">{syllableCount} syllables</span>
            <span className="stat">{lyricText.split(/\s+/).filter(w => w).length} words</span>
          </div>
        </div>

        {/* Rhyme Types Reference */}
        <div className="rhyme-types">
          <h4>Rhyme Types</h4>
          <div className="types-list">
            {RHYME_TYPES.map(type => (
              <div key={type.id} className="rhyme-type">
                <strong>{type.name}</strong>
                <span className="type-desc">{type.description}</span>
                <span className="type-example">"{type.example[0]}" / "{type.example[1]}"</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Writing Prompts */}
      <div className="writing-prompts">
        <h4>💡 Writing Prompts</h4>
        <div className="prompts-grid">
          {LYRIC_PROMPTS.map(prompt => (
            <button
              key={prompt.id}
              className={`prompt-card ${selectedPrompt?.id === prompt.id ? 'selected' : ''}`}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <span className="prompt-theme">{prompt.theme}</span>
              <p className="prompt-text">{prompt.prompt}</p>
              {prompt.cultural && (
                <span className="prompt-cultural">🌍 {prompt.cultural}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Prompt Details */}
      {selectedPrompt && (
        <div className="prompt-details">
          <h4>Writing Prompt: {selectedPrompt.theme}</h4>
          <p className="prompt-full">{selectedPrompt.prompt}</p>
          <div className="prompt-keywords">
            <strong>Keywords to explore:</strong>
            {selectedPrompt.keywords.map(kw => (
              <span key={kw} className="keyword">{kw}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="songwriting-workshop">
      {/* Header */}
      <header className="workshop-header">
        <div className="header-content">
          <h1>🎤 Songwriting Workshop</h1>
          <p>From idea to finished song. Chords, melody, structure, lyrics.</p>
        </div>
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ✕ Close
          </button>
        )}
      </header>

      {/* Tab Navigation */}
      <nav className="workshop-tabs">
        <button
          className={`tab ${activeTab === 'chords' ? 'active' : ''}`}
          onClick={() => setActiveTab('chords')}
        >
          🎸 Chords
          <span className="tab-count">{SONGWRITING_STATS.chordProgressions}</span>
        </button>
        <button
          className={`tab ${activeTab === 'melody' ? 'active' : ''}`}
          onClick={() => setActiveTab('melody')}
        >
          🎵 Melody
          <span className="tab-count">{SONGWRITING_STATS.scales}</span>
        </button>
        <button
          className={`tab ${activeTab === 'structure' ? 'active' : ''}`}
          onClick={() => setActiveTab('structure')}
        >
          🏗️ Structure
          <span className="tab-count">{SONGWRITING_STATS.songStructures}</span>
        </button>
        <button
          className={`tab ${activeTab === 'lyrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('lyrics')}
        >
          ✍️ Lyrics
          <span className="tab-count">{SONGWRITING_STATS.lyricPrompts}</span>
        </button>
      </nav>

      {/* Content */}
      <main className="workshop-content">
        {activeTab === 'chords' && renderChordBuilder()}
        {activeTab === 'melody' && renderMelodyWorkshop()}
        {activeTab === 'structure' && renderStructureBuilder()}
        {activeTab === 'lyrics' && renderLyricLab()}
      </main>

      {/* Footer */}
      <footer className="workshop-footer">
        <div className="winston-wisdom">
          <span className="winston-icon">👴🏾</span>
          <p>
            <strong>Uncle Winston:</strong> 
            {activeTab === 'chords' && " Great songs often use simple chords. It's what you do with them that matters."}
            {activeTab === 'melody' && " Sing your melody before you play it. If you can't sing it, others won't remember it."}
            {activeTab === 'structure' && " Know the rules before you break them. Structure gives your listener something to hold onto."}
            {activeTab === 'lyrics' && " Write from truth. The specific is universal. Your story is everyone's story."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SongwritingWorkshop;