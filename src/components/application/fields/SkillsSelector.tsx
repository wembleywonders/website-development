import React, { useState, useMemo } from 'react';
import { 
  Step2FormData, 
  Step2ValidationErrors, 
  Skill,
  SkillLevel 
} from '../../../types/application/step2Types';
import { 
  AVAILABLE_SKILLS,
  SKILL_CATEGORIES,
  SKILL_LEVEL_OPTIONS,
  getSkillsByCategory,
  getAllCategories
} from '../../../data/application/skillsData';
import { VALIDATION_RULES } from '../../../types/application/step2Types';
import './SkillsSelector.css';

interface SkillsSelectorProps {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
}

const SkillsSelector: React.FC<SkillsSelectorProps> = ({
  data,
  errors,
  onChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const selectedSkills = data.skills || [];

  // Filter skills based on category and search term
  const filteredSkills = useMemo(() => {
    let skills = selectedCategory === 'all' 
      ? AVAILABLE_SKILLS 
      : getSkillsByCategory(selectedCategory);

    if (searchTerm) {
      skills = skills.filter(skill => 
        skill.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return skills;
  }, [selectedCategory, searchTerm]);

  const handleSkillToggle = (skillOption: typeof AVAILABLE_SKILLS[0]) => {
    const existingSkillIndex = selectedSkills.findIndex(s => s.id === skillOption.value);
    
    if (existingSkillIndex >= 0) {
      // Remove skill
      const updatedSkills = selectedSkills.filter(s => s.id !== skillOption.value);
      onChange('skills', updatedSkills);
    } else {
      // Add skill with default level
      if (selectedSkills.length < VALIDATION_RULES.MAX_SKILLS) {
        const newSkill: Skill = {
          id: skillOption.value,
          name: skillOption.label,
          level: 'intermediate',
          description: skillOption.description
        };
        onChange('skills', [...selectedSkills, newSkill]);
      }
    }
  };

  const handleSkillLevelChange = (skillId: string, level: SkillLevel) => {
    const updatedSkills = selectedSkills.map(skill => 
      skill.id === skillId ? { ...skill, level } : skill
    );
    onChange('skills', updatedSkills);
  };

  const handleSkillUpdate = (skillId: string, updates: Partial<Skill>) => {
    const updatedSkills = selectedSkills.map(skill => 
      skill.id === skillId ? { ...skill, ...updates } : skill
    );
    onChange('skills', updatedSkills);
  };

  const handleAddCustomSkill = (customSkill: Skill) => {
    if (selectedSkills.length < VALIDATION_RULES.MAX_SKILLS) {
      onChange('skills', [...selectedSkills, customSkill]);
      setShowSkillForm(false);
    }
  };

  const handleEditSkill = (skillId: string) => {
    setEditingSkillId(skillId);
    setShowSkillForm(true);
  };

  const isSkillSelected = (skillId: string) => {
    return selectedSkills.some(s => s.id === skillId);
  };

  const canAddMoreSkills = selectedSkills.length < VALIDATION_RULES.MAX_SKILLS;

  return (
    <div className="skills-selector">
      <div className="skills-header">
        <h3>Select Your Skills</h3>
        <p>Choose {VALIDATION_RULES.MIN_SKILLS}-{VALIDATION_RULES.MAX_SKILLS} skills that you have. You can adjust the level for each skill.</p>
        
        <div className="skills-counter">
          <span className={`counter ${selectedSkills.length < VALIDATION_RULES.MIN_SKILLS ? 'insufficient' : ''}`}>
            {selectedSkills.length} / {VALIDATION_RULES.MAX_SKILLS} skills selected
          </span>
          {selectedSkills.length < VALIDATION_RULES.MIN_SKILLS && (
            <span className="counter-help">Select at least {VALIDATION_RULES.MIN_SKILLS} skills</span>
          )}
        </div>
      </div>

      {errors.skills && (
        <div className="error-message">{errors.skills}</div>
      )}

      {/* Selected Skills Display */}
      {selectedSkills.length > 0 && (
        <div className="selected-skills-section">
          <h4>Your Selected Skills</h4>
          <div className="selected-skills-grid">
            {selectedSkills.map((skill) => (
              <div key={skill.id} className="selected-skill-item">
                <div className="skill-header">
                  <div className="skill-name">{skill.name}</div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => handleSkillToggle({ value: skill.id } as any)}
                    aria-label={`Remove ${skill.name}`}
                  >
                    ×
                  </button>
                </div>
                
                <div className="skill-level-selector">
                  <label className="skill-level-label">Level:</label>
                  <select
                    className="skill-level-select"
                    value={skill.level}
                    onChange={(e) => handleSkillLevelChange(skill.id, e.target.value as SkillLevel)}
                  >
                    {SKILL_LEVEL_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="skill-experience">
                  <label className="experience-label">Years of experience (optional):</label>
                  <input
                    type="number"
                    className="experience-input"
                    min="0"
                    max="50"
                    value={skill.yearsExperience || ''}
                    onChange={(e) => handleSkillUpdate(skill.id, { 
                      yearsExperience: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    placeholder="0"
                  />
                </div>

                {skill.description && (
                  <div className="skill-description">{skill.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Browser */}
      <div className="skills-browser">
        <div className="browser-controls">
          <div className="category-filter">
            <label htmlFor="category-select">Filter by category:</label>
            <select
              id="category-select"
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {getAllCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="search-filter">
            <label htmlFor="skill-search">Search skills:</label>
            <input
              id="skill-search"
              type="text"
              className="search-input"
              placeholder="e.g. communication, project management..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skillOption) => {
            const isSelected = isSkillSelected(skillOption.value);
            const isDisabled = !isSelected && !canAddMoreSkills;
            
            return (
              <div
                key={skillOption.value}
                className={`skill-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleSkillToggle(skillOption)}
              >
                <div className="skill-icon">{skillOption.icon}</div>
                <div className="skill-content">
                  <div className="skill-label">{skillOption.label}</div>
                  <div className="skill-desc">{skillOption.description}</div>
                  <div className="skill-category">{skillOption.category}</div>
                </div>
                <div className="skill-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => {}} // Handled by parent click
                    aria-label={`${isSelected ? 'Remove' : 'Add'} ${skillOption.label}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="no-skills-found">
            <p>No skills found matching your search.</p>
            {searchTerm && (
              <button
                type="button"
                className="btn-clear-search"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Custom Skill Addition */}
      <div className="custom-skill-section">
        <div className="custom-skill-header">
          <h4>Don't see your skill?</h4>
          <button
            type="button"
            className="btn-add-custom"
            onClick={() => setShowSkillForm(true)}
            disabled={!canAddMoreSkills}
          >
            + Add Custom Skill
          </button>
        </div>
        
        {!canAddMoreSkills && (
          <p className="skill-limit-notice">
            You've reached the maximum of {VALIDATION_RULES.MAX_SKILLS} skills. Remove a skill to add a different one.
          </p>
        )}
      </div>

      {showSkillForm && (
        <CustomSkillForm
          skill={editingSkillId ? selectedSkills.find(s => s.id === editingSkillId) : undefined}
          onSave={editingSkillId ? 
            (updates) => handleSkillUpdate(editingSkillId, updates) : 
            handleAddCustomSkill
          }
          onCancel={() => {
            setShowSkillForm(false);
            setEditingSkillId(null);
          }}
        />
      )}
    </div>
  );
};

// Custom Skill Form Component
interface CustomSkillFormProps {
  skill?: Skill;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}

const CustomSkillForm: React.FC<CustomSkillFormProps> = ({
  skill,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Skill>({
    id: skill?.id || `custom_${Date.now()}`,
    name: skill?.name || '',
    level: skill?.level || 'intermediate',
    yearsExperience: skill?.yearsExperience || undefined,
    description: skill?.description || ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: string[] = [];
    if (!formData.name.trim()) {
      validationErrors.push('Skill name is required');
    }
    if (formData.name.length < 2) {
      validationErrors.push('Skill name must be at least 2 characters');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
    setErrors([]);
  };

  return (
    <div className="custom-skill-form">
      <div className="form-overlay">
        <div className="form-modal">
          <div className="form-header">
            <h3>{skill ? 'Edit' : 'Add'} Custom Skill</h3>
            <button type="button" className="btn-close" onClick={onCancel}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label required">Skill Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Event Planning"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Briefly describe this skill and how you use it"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Skill Level</label>
                <select
                  className="form-select"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as SkillLevel }))}
                >
                  {SKILL_LEVEL_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  max="50"
                  value={formData.yearsExperience || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    yearsExperience: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  placeholder="0"
                />
              </div>
            </div>

            {errors.length > 0 && (
              <div className="error-summary">
                {errors.map((error, index) => (
                  <div key={index} className="error-message">{error}</div>
                ))}
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {skill ? 'Update' : 'Add'} Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};