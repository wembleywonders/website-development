// src/pages/programmes/auntie-anansis-kitchen/AuntieAnansisKitchenSandbox.tsx
// Recipe Heritage Keeper - Document family recipes with stories and heritage context
// "Culture. Food. Heritage."

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Save,
  BookOpen,
  Clock,
  Users,
  Heart,
  MapPin,
  Camera,
  Play,
  ChefHat,
  Sparkles
} from 'lucide-react';
import './AuntieAnansisKitchenSandbox.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  notes?: string;
  substitutes?: string;
}

interface Step {
  id: string;
  instruction: string;
  tips?: string;
  timing?: string;
}

interface HeritageNote {
  id: string;
  type: 'story' | 'origin' | 'tradition' | 'memory' | 'tip';
  content: string;
  contributor?: string;
}

interface Recipe {
  title: string;
  origin: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'easy' | 'medium' | 'challenging';
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  heritageNotes: HeritageNote[];
  tags: string[];
}

// ============================================
// INITIAL STATE
// ============================================

const EMPTY_RECIPE: Recipe = {
  title: '',
  origin: '',
  servings: '4',
  prepTime: '30 mins',
  cookTime: '1 hour',
  difficulty: 'medium',
  description: '',
  ingredients: [],
  steps: [],
  heritageNotes: [],
  tags: []
};

const SAMPLE_RECIPE: Recipe = {
  title: "Granny's Curry Goat",
  origin: "Jamaica, passed down from Great-Grandmother Mavis",
  servings: '6-8',
  prepTime: '45 mins',
  cookTime: '2.5 hours',
  difficulty: 'medium',
  description: "A rich, aromatic curry that's been in our family for four generations. Best served on Sundays after church.",
  ingredients: [
    { id: '1', name: 'Goat meat', amount: '2', unit: 'lbs', notes: 'On the bone for flavour' },
    { id: '2', name: 'Jamaican curry powder', amount: '3', unit: 'tbsp', notes: "Granny's blend preferred" },
    { id: '3', name: 'Scotch bonnet pepper', amount: '1', unit: 'whole', notes: 'Keep whole to control heat' },
    { id: '4', name: 'Thyme', amount: '4', unit: 'sprigs', notes: 'Fresh from the garden' },
    { id: '5', name: 'Allspice (pimento)', amount: '6', unit: 'berries', notes: 'Crushed' }
  ],
  steps: [
    { id: '1', instruction: 'Season the goat overnight with curry powder, thyme, garlic, and salt', tips: 'The longer it marinates, the better', timing: 'Night before' },
    { id: '2', instruction: 'Brown the meat in batches in hot oil until deeply golden', tips: "Don't crowd the pot - patience is key", timing: '15-20 mins' },
    { id: '3', instruction: 'Add onions, more curry powder, and cook until fragrant', timing: '5 mins' },
    { id: '4', instruction: 'Add water, whole scotch bonnet, and simmer low and slow', tips: 'Keep the pepper whole unless you want it hot-hot!', timing: '2-2.5 hours' }
  ],
  heritageNotes: [
    { id: '1', type: 'story', content: "Granny Mavis learned this from her mother in St. Elizabeth parish. She always said the secret was in the 'hand' - the intuition you develop over years of cooking.", contributor: 'Mum' },
    { id: '2', type: 'tradition', content: 'Always served with rice and peas on Sundays. The family gathers round the table and the eldest serves first.' },
    { id: '3', type: 'tip', content: "If you can't get goat, mutton works. Never use lamb - it's too delicate for this dish.", contributor: 'Auntie Pearl' }
  ],
  tags: ['jamaican', 'curry', 'sunday dinner', 'family recipe', 'slow-cooked']
};

const HERITAGE_NOTE_TYPES = [
  { value: 'story', label: '📖 Story', description: 'A story connected to this dish' },
  { value: 'origin', label: '🌍 Origin', description: 'Where this recipe came from' },
  { value: 'tradition', label: '🎉 Tradition', description: 'How/when this dish is served' },
  { value: 'memory', label: '💭 Memory', description: 'A personal memory' },
  { value: 'tip', label: '💡 Tip', description: 'Wisdom passed down' }
];

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: 'Easy', emoji: '🟢' },
  { value: 'medium', label: 'Medium', emoji: '🟡' },
  { value: 'challenging', label: 'Challenging', emoji: '🔴' }
];

// ============================================
// COMPONENT
// ============================================

const AuntieAnansisKitchenSandbox: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>(SAMPLE_RECIPE);
  const [activeTab, setActiveTab] = useState<'basics' | 'ingredients' | 'method' | 'heritage' | 'preview'>('basics');
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Update recipe field
  const updateField = (field: keyof Recipe, value: any) => {
    setRecipe(prev => ({ ...prev, [field]: value }));
  };

  // Ingredient handlers
  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: generateId(),
      name: '',
      amount: '',
      unit: '',
      notes: ''
    };
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing =>
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const removeIngredient = (id: string) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id)
    }));
  };

  // Step handlers
  const addStep = () => {
    const newStep: Step = {
      id: generateId(),
      instruction: '',
      tips: '',
      timing: ''
    };
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (id: string, field: keyof Step, value: string) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (id: string) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }));
  };

  // Heritage note handlers
  const addHeritageNote = (type: HeritageNote['type']) => {
    const newNote: HeritageNote = {
      id: generateId(),
      type,
      content: '',
      contributor: ''
    };
    setRecipe(prev => ({
      ...prev,
      heritageNotes: [...prev.heritageNotes, newNote]
    }));
  };

  const updateHeritageNote = (id: string, field: keyof HeritageNote, value: string) => {
    setRecipe(prev => ({
      ...prev,
      heritageNotes: prev.heritageNotes.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      )
    }));
  };

  const removeHeritageNote = (id: string) => {
    setRecipe(prev => ({
      ...prev,
      heritageNotes: prev.heritageNotes.filter(note => note.id !== id)
    }));
  };

  // Reset to sample
  const loadSample = () => {
    setRecipe(SAMPLE_RECIPE);
  };

  // Start fresh
  const startFresh = () => {
    setRecipe(EMPTY_RECIPE);
  };

  // Tab navigation
  const tabs = ['basics', 'ingredients', 'method', 'heritage', 'preview'] as const;
  const currentTabIndex = tabs.indexOf(activeTab);
  const canGoBack = currentTabIndex > 0;
  const canGoForward = currentTabIndex < tabs.length - 1;

  const goBack = () => {
    if (canGoBack) setActiveTab(tabs[currentTabIndex - 1]);
  };

  const goForward = () => {
    if (canGoForward) setActiveTab(tabs[currentTabIndex + 1]);
  };

  return (
    <div className="aak-sandbox">
      {/* Header */}
      <header className="aak-sandbox__header">
        <Link to="/programmes/auntie-anansis-kitchen" className="aak-sandbox__back">
          <ArrowLeft size={20} />
          <span>Back to Programme</span>
        </Link>
        
        <div className="aak-sandbox__title-area">
          <span className="aak-sandbox__emoji">🍲</span>
          <div>
            <h1>Recipe Heritage Keeper</h1>
            <p>Document family recipes with stories and heritage context</p>
          </div>
        </div>

        <div className="aak-sandbox__actions">
          <button onClick={loadSample} className="aak-sandbox__btn aak-sandbox__btn--ghost">
            Load Example
          </button>
          <button onClick={startFresh} className="aak-sandbox__btn aak-sandbox__btn--ghost">
            Start Fresh
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="aak-sandbox__tabs">
        {[
          { id: 'basics', label: 'Basics', icon: <BookOpen size={18} /> },
          { id: 'ingredients', label: 'Ingredients', icon: <ChefHat size={18} /> },
          { id: 'method', label: 'Method', icon: <Play size={18} /> },
          { id: 'heritage', label: 'Heritage', icon: <Heart size={18} /> },
          { id: 'preview', label: 'Preview', icon: <Sparkles size={18} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`aak-sandbox__tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="aak-sandbox__content">
        
        {/* BASICS TAB */}
        {activeTab === 'basics' && (
          <div className="aak-sandbox__panel">
            <h2>Recipe Basics</h2>
            <p className="aak-sandbox__hint">Start with the essential information about your dish.</p>

            <div className="aak-sandbox__form">
              <div className="aak-sandbox__field aak-sandbox__field--full">
                <label>Recipe Name</label>
                <input
                  type="text"
                  value={recipe.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Granny's Curry Goat"
                />
              </div>

              <div className="aak-sandbox__field aak-sandbox__field--full">
                <label>Origin / Source</label>
                <input
                  type="text"
                  value={recipe.origin}
                  onChange={(e) => updateField('origin', e.target.value)}
                  placeholder="e.g., Jamaica, passed down from Great-Grandmother Mavis"
                />
              </div>

              <div className="aak-sandbox__field aak-sandbox__field--full">
                <label>Description</label>
                <textarea
                  value={recipe.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="What makes this dish special? When is it traditionally served?"
                  rows={3}
                />
              </div>

              <div className="aak-sandbox__field-row">
                <div className="aak-sandbox__field">
                  <label><Users size={16} /> Servings</label>
                  <input
                    type="text"
                    value={recipe.servings}
                    onChange={(e) => updateField('servings', e.target.value)}
                    placeholder="e.g., 4-6"
                  />
                </div>

                <div className="aak-sandbox__field">
                  <label><Clock size={16} /> Prep Time</label>
                  <input
                    type="text"
                    value={recipe.prepTime}
                    onChange={(e) => updateField('prepTime', e.target.value)}
                    placeholder="e.g., 30 mins"
                  />
                </div>

                <div className="aak-sandbox__field">
                  <label><Clock size={16} /> Cook Time</label>
                  <input
                    type="text"
                    value={recipe.cookTime}
                    onChange={(e) => updateField('cookTime', e.target.value)}
                    placeholder="e.g., 2 hours"
                  />
                </div>

                <div className="aak-sandbox__field">
                  <label>Difficulty</label>
                  <select
                    value={recipe.difficulty}
                    onChange={(e) => updateField('difficulty', e.target.value)}
                  >
                    {DIFFICULTY_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.emoji} {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INGREDIENTS TAB */}
        {activeTab === 'ingredients' && (
          <div className="aak-sandbox__panel">
            <h2>Ingredients</h2>
            <p className="aak-sandbox__hint">List what you'll need. Add notes about sourcing or substitutes.</p>

            <div className="aak-sandbox__ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="aak-sandbox__ingredient-row">
                  <span className="aak-sandbox__ingredient-num">{index + 1}</span>
                  
                  <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                    placeholder="Amount"
                    className="aak-sandbox__input--amount"
                  />
                  
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    placeholder="Unit"
                    className="aak-sandbox__input--unit"
                  />
                  
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    placeholder="Ingredient name"
                    className="aak-sandbox__input--name"
                  />
                  
                  <input
                    type="text"
                    value={ingredient.notes || ''}
                    onChange={(e) => updateIngredient(ingredient.id, 'notes', e.target.value)}
                    placeholder="Notes (optional)"
                    className="aak-sandbox__input--notes"
                  />
                  
                  <button
                    onClick={() => removeIngredient(ingredient.id)}
                    className="aak-sandbox__btn--icon aak-sandbox__btn--danger"
                    aria-label="Remove ingredient"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={addIngredient} className="aak-sandbox__btn aak-sandbox__btn--add">
              <Plus size={18} />
              Add Ingredient
            </button>
          </div>
        )}

        {/* METHOD TAB */}
        {activeTab === 'method' && (
          <div className="aak-sandbox__panel">
            <h2>Method</h2>
            <p className="aak-sandbox__hint">Walk through the cooking process. Include tips and timing.</p>

            <div className="aak-sandbox__steps-list">
              {recipe.steps.map((step, index) => (
                <div key={step.id} className="aak-sandbox__step-card">
                  <div className="aak-sandbox__step-header">
                    <span className="aak-sandbox__step-num">Step {index + 1}</span>
                    {step.timing && (
                      <span className="aak-sandbox__step-timing">
                        <Clock size={14} /> {step.timing}
                      </span>
                    )}
                    <button
                      onClick={() => removeStep(step.id)}
                      className="aak-sandbox__btn--icon aak-sandbox__btn--danger"
                      aria-label="Remove step"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <textarea
                    value={step.instruction}
                    onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                    placeholder="Describe this step..."
                    rows={2}
                  />
                  
                  <div className="aak-sandbox__step-extras">
                    <input
                      type="text"
                      value={step.timing || ''}
                      onChange={(e) => updateStep(step.id, 'timing', e.target.value)}
                      placeholder="Timing (e.g., 15 mins)"
                    />
                    <input
                      type="text"
                      value={step.tips || ''}
                      onChange={(e) => updateStep(step.id, 'tips', e.target.value)}
                      placeholder="Tips or tricks (optional)"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addStep} className="aak-sandbox__btn aak-sandbox__btn--add">
              <Plus size={18} />
              Add Step
            </button>
          </div>
        )}

        {/* HERITAGE TAB */}
        {activeTab === 'heritage' && (
          <div className="aak-sandbox__panel">
            <h2>Heritage & Stories</h2>
            <p className="aak-sandbox__hint">
              This is what makes your recipe a family treasure. Add stories, memories, and wisdom.
            </p>

            <div className="aak-sandbox__heritage-types">
              {HERITAGE_NOTE_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => addHeritageNote(type.value as HeritageNote['type'])}
                  className="aak-sandbox__heritage-type-btn"
                >
                  <span>{type.label}</span>
                  <span className="aak-sandbox__heritage-type-desc">{type.description}</span>
                </button>
              ))}
            </div>

            <div className="aak-sandbox__heritage-list">
              {recipe.heritageNotes.map((note) => {
                const typeInfo = HERITAGE_NOTE_TYPES.find(t => t.value === note.type);
                return (
                  <div key={note.id} className={`aak-sandbox__heritage-card aak-sandbox__heritage-card--${note.type}`}>
                    <div className="aak-sandbox__heritage-header">
                      <span className="aak-sandbox__heritage-type">{typeInfo?.label}</span>
                      <button
                        onClick={() => removeHeritageNote(note.id)}
                        className="aak-sandbox__btn--icon aak-sandbox__btn--danger"
                        aria-label="Remove note"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <textarea
                      value={note.content}
                      onChange={(e) => updateHeritageNote(note.id, 'content', e.target.value)}
                      placeholder="Share the story, memory, or wisdom..."
                      rows={3}
                    />
                    
                    <input
                      type="text"
                      value={note.contributor || ''}
                      onChange={(e) => updateHeritageNote(note.id, 'contributor', e.target.value)}
                      placeholder="Who shared this? (optional)"
                      className="aak-sandbox__heritage-contributor"
                    />
                  </div>
                );
              })}
            </div>

            {recipe.heritageNotes.length === 0 && (
              <div className="aak-sandbox__empty-state">
                <Heart size={48} />
                <p>No heritage notes yet</p>
                <p>Click a button above to add stories, memories, or traditions</p>
              </div>
            )}
          </div>
        )}

        {/* PREVIEW TAB */}
        {activeTab === 'preview' && (
          <div className="aak-sandbox__panel aak-sandbox__preview">
            <div className="aak-sandbox__preview-header">
              <h2>{recipe.title || 'Untitled Recipe'}</h2>
              {recipe.origin && (
                <p className="aak-sandbox__preview-origin">
                  <MapPin size={16} /> {recipe.origin}
                </p>
              )}
            </div>

            {recipe.description && (
              <p className="aak-sandbox__preview-description">{recipe.description}</p>
            )}

            <div className="aak-sandbox__preview-meta">
              <span><Users size={16} /> {recipe.servings} servings</span>
              <span><Clock size={16} /> Prep: {recipe.prepTime}</span>
              <span><Clock size={16} /> Cook: {recipe.cookTime}</span>
              <span>
                {DIFFICULTY_OPTIONS.find(d => d.value === recipe.difficulty)?.emoji}{' '}
                {DIFFICULTY_OPTIONS.find(d => d.value === recipe.difficulty)?.label}
              </span>
            </div>

            {recipe.ingredients.length > 0 && (
              <div className="aak-sandbox__preview-section">
                <h3>Ingredients</h3>
                <ul className="aak-sandbox__preview-ingredients">
                  {recipe.ingredients.map(ing => (
                    <li key={ing.id}>
                      <strong>{ing.amount} {ing.unit}</strong> {ing.name}
                      {ing.notes && <em> — {ing.notes}</em>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.steps.length > 0 && (
              <div className="aak-sandbox__preview-section">
                <h3>Method</h3>
                <ol className="aak-sandbox__preview-steps">
                  {recipe.steps.map((step, i) => (
                    <li key={step.id}>
                      <div className="aak-sandbox__preview-step">
                        <p>{step.instruction}</p>
                        {step.tips && (
                          <p className="aak-sandbox__preview-tip">💡 {step.tips}</p>
                        )}
                        {step.timing && (
                          <span className="aak-sandbox__preview-timing">{step.timing}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {recipe.heritageNotes.length > 0 && (
              <div className="aak-sandbox__preview-section aak-sandbox__preview-heritage">
                <h3>Heritage & Stories</h3>
                {recipe.heritageNotes.map(note => {
                  const typeInfo = HERITAGE_NOTE_TYPES.find(t => t.value === note.type);
                  return (
                    <blockquote key={note.id} className={`aak-sandbox__preview-quote aak-sandbox__preview-quote--${note.type}`}>
                      <span className="aak-sandbox__preview-quote-type">{typeInfo?.label}</span>
                      <p>"{note.content}"</p>
                      {note.contributor && <cite>— {note.contributor}</cite>}
                    </blockquote>
                  );
                })}
              </div>
            )}

            <div className="aak-sandbox__preview-actions">
              <button 
                onClick={() => setShowSaveModal(true)} 
                className="aak-sandbox__btn aak-sandbox__btn--primary"
              >
                <Save size={18} />
                Save Recipe
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="aak-sandbox__footer">
        <button 
          onClick={goBack} 
          disabled={!canGoBack}
          className="aak-sandbox__btn aak-sandbox__btn--nav"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="aak-sandbox__progress">
          {tabs.map((tab, i) => (
            <span 
              key={tab} 
              className={`aak-sandbox__progress-dot ${i <= currentTabIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <button 
          onClick={goForward} 
          disabled={!canGoForward}
          className="aak-sandbox__btn aak-sandbox__btn--nav aak-sandbox__btn--primary"
        >
          {activeTab === 'heritage' ? 'Preview' : 'Next'}
          <ArrowRight size={18} />
        </button>
      </footer>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="aak-sandbox__modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="aak-sandbox__modal" onClick={e => e.stopPropagation()}>
            <h3>🍲 Recipe Saved!</h3>
            <p>In the full programme, your recipe would be saved to your personal heritage cookbook.</p>
            <p>This is a sandbox — your work isn't permanently saved, but you've experienced the tool!</p>
            
            <div className="aak-sandbox__modal-actions">
              <Link to="/programmes/auntie-anansis-kitchen" className="aak-sandbox__btn aak-sandbox__btn--primary">
                Join Programme
              </Link>
              <button onClick={() => setShowSaveModal(false)} className="aak-sandbox__btn aak-sandbox__btn--ghost">
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuntieAnansisKitchenSandbox;