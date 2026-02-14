import React, { useState } from 'react';
import { 
  Step2FormData, 
  Step2ValidationErrors, 
  VolunteeringExperience,
  LanguageSkill,
  ExperienceSectionData 
} from '../../../types/application/step2Types';
import { 
  LANGUAGES,
  LANGUAGE_PROFICIENCY_LEVELS
} from '../../../data/application/educationData';
import { 
  DIGITAL_SKILLS_ASSESSMENT,
  SKILL_LEVEL_OPTIONS
} from '../../../data/application/skillsData';
import { validateVolunteeringExperience } from '../../../utils/validation/step2Validation';
import './ExperienceSection.css';

interface ExperienceSectionProps {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  errors,
  onChange
}) => {
  const [showVolunteeringForm, setShowVolunteeringForm] = useState(false);
  const [editingVolunteeringIndex, setEditingVolunteeringIndex] = useState<number | null>(null);
  const [volunteeringErrors, setVolunteeringErrors] = useState<string[]>([]);
  const [showLanguageForm, setShowLanguageForm] = useState(false);

  const handleVolunteeringToggle = (hasExperience: boolean) => {
    onChange('hasVolunteeringExperience', hasExperience);
    if (!hasExperience) {
      onChange('volunteeringExperience', []);
    }
  };

  const handleAddVolunteering = () => {
    setEditingVolunteeringIndex(null);
    setShowVolunteeringForm(true);
    setVolunteeringErrors([]);
  };

  const handleEditVolunteering = (index: number) => {
    setEditingVolunteeringIndex(index);
    setShowVolunteeringForm(true);
    setVolunteeringErrors([]);
  };

  const handleSaveVolunteering = (experience: VolunteeringExperience) => {
    const validationErrors = validateVolunteeringExperience(experience);
    
    if (validationErrors.length > 0) {
      setVolunteeringErrors(validationErrors);
      return;
    }

    const currentExperiences = data.volunteeringExperience || [];
    let updatedExperiences;

    if (editingVolunteeringIndex !== null) {
      updatedExperiences = [...currentExperiences];
      updatedExperiences[editingVolunteeringIndex] = experience;
    } else {
      updatedExperiences = [...currentExperiences, experience];
    }

    onChange('volunteeringExperience', updatedExperiences);
    setShowVolunteeringForm(false);
    setEditingVolunteeringIndex(null);
    setVolunteeringErrors([]);
  };

  const handleDeleteVolunteering = (index: number) => {
    const currentExperiences = data.volunteeringExperience || [];
    const updatedExperiences = currentExperiences.filter((_, i) => i !== index);
    onChange('volunteeringExperience', updatedExperiences);
  };

  const handleCancelVolunteering = () => {
    setShowVolunteeringForm(false);
    setEditingVolunteeringIndex(null);
    setVolunteeringErrors([]);
  };

  const handleAddLanguage = (language: LanguageSkill) => {
    const currentLanguages = data.languageSkills || [];
    const updatedLanguages = [...currentLanguages, language];
    onChange('languageSkills', updatedLanguages);
    setShowLanguageForm(false);
  };

  const handleDeleteLanguage = (index: number) => {
    const currentLanguages = data.languageSkills || [];
    const updatedLanguages = currentLanguages.filter((_, i) => i !== index);
    onChange('languageSkills', updatedLanguages);
  };

  return (
    <div className="experience-section">
      <div className="section-header">
        <h2>Skills & Experience</h2>
        <p>Tell us about your volunteering experience, language skills, and digital abilities</p>
      </div>

      {/* Digital Skills Assessment */}
      <div className="digital-skills-section">
        <h3>Digital Skills Level</h3>
        <p>How would you rate your overall digital skills?</p>
        
        <div className="skill-level-options">
          {SKILL_LEVEL_OPTIONS.map((level) => (
            <label key={level.value} className="skill-level-option">
              <input
                type="radio"
                name="digitalSkillsLevel"
                value={level.value}
                checked={data.digitalSkillsLevel === level.value}
                onChange={(e) => onChange('digitalSkillsLevel', e.target.value)}
              />
              <div className="level-content">
                <div className="level-label">{level.label}</div>
                <div className="level-description">{level.description}</div>
              </div>
            </label>
          ))}
        </div>

        {data.digitalSkillsLevel && (
          <div className="digital-skills-breakdown">
            <h4>Digital Skills Breakdown</h4>
            <div className="skills-assessment-grid">
              {DIGITAL_SKILLS_ASSESSMENT.map((skill, index) => (
                <div key={index} className="skill-assessment-item">
                  <h5>{skill.skill}</h5>
                  <div className="skill-level-description">
                    <strong>{data.digitalSkillsLevel}:</strong> {
                      skill[data.digitalSkillsLevel as keyof typeof skill]
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Volunteering Experience */}
      <div className="volunteering-section">
        <h3>Volunteering Experience</h3>
        <div className="volunteering-toggle">
          <label className="radio-option">
            <input
              type="radio"
              name="hasVolunteeringExperience"
              checked={data.hasVolunteeringExperience === true}
              onChange={() => handleVolunteeringToggle(true)}
            />
            <span>Yes, I have volunteering experience</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="hasVolunteeringExperience"
              checked={data.hasVolunteeringExperience === false}
              onChange={() => handleVolunteeringToggle(false)}
            />
            <span>No, I haven't volunteered before</span>
          </label>
        </div>

        {data.hasVolunteeringExperience && (
          <div className="volunteering-details">
            <div className="subsection-header">
              <div>
                <h4>Your Volunteering Experience</h4>
                <p>Add details about your volunteer work and community involvement</p>
              </div>
              <button
                type="button"
                className="btn-add"
                onClick={handleAddVolunteering}
              >
                + Add Experience
              </button>
            </div>

            {data.volunteeringExperience && data.volunteeringExperience.length > 0 && (
              <div className="experience-list">
                {data.volunteeringExperience.map((experience, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div className="experience-title">
                        <strong>{experience.role}</strong> at {experience.organization}
                      </div>
                      <div className="experience-actions">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => handleEditVolunteering(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDeleteVolunteering(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="experience-details">
                      <div className="experience-dates">
                        {new Date(experience.startDate).toLocaleDateString()} - {
                          experience.isCurrentRole 
                            ? 'Present' 
                            : experience.endDate 
                              ? new Date(experience.endDate).toLocaleDateString()
                              : 'Unknown'
                        }
                      </div>
                      <div className="experience-description">
                        {experience.description}
                      </div>
                      {experience.skillsGained.length > 0 && (
                        <div className="experience-skills">
                          <strong>Skills Gained:</strong> {experience.skillsGained.join(', ')}
                        </div>
                      )}
                      {experience.hoursPerWeek && (
                        <div className="experience-commitment">
                          <strong>Time Commitment:</strong> {experience.hoursPerWeek} hours per week
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showVolunteeringForm && (
              <VolunteeringForm
                experience={editingVolunteeringIndex !== null ? data.volunteeringExperience?.[editingVolunteeringIndex] : undefined}
                errors={volunteeringErrors}
                onSave={handleSaveVolunteering}
                onCancel={handleCancelVolunteering}
              />
            )}
          </div>
        )}
      </div>

      {/* Language Skills */}
      <div className="language-skills-section">
        <div className="subsection-header">
          <div>
            <h3>Language Skills</h3>
            <p>What languages do you speak? This helps us match you with diverse community members</p>
          </div>
          <button
            type="button"
            className="btn-add"
            onClick={() => setShowLanguageForm(true)}
          >
            + Add Language
          </button>
        </div>

        {data.languageSkills && data.languageSkills.length > 0 && (
          <div className="language-list">
            {data.languageSkills.map((language, index) => (
              <div key={index} className="language-item">
                <div className="language-info">
                  <div className="language-name">{language.language}</div>
                  <div className="language-level">{language.proficiency}</div>
                  {language.canInterpret && (
                    <div className="interpretation-indicator">
                      Can provide interpretation
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDeleteLanguage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {showLanguageForm && (
          <LanguageForm
            onSave={handleAddLanguage}
            onCancel={() => setShowLanguageForm(false)}
          />
        )}
      </div>
    </div>
  );
};

// Volunteering Form Component
interface VolunteeringFormProps {
  experience?: VolunteeringExperience;
  errors: string[];
  onSave: (experience: VolunteeringExperience) => void;
  onCancel: () => void;
}

const VolunteeringForm: React.FC<VolunteeringFormProps> = ({
  experience,
  errors,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<VolunteeringExperience>({
    organization: experience?.organization || '',
    role: experience?.role || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    isCurrentRole: experience?.isCurrentRole || false,
    description: experience?.description || '',
    skillsGained: experience?.skillsGained || [],
    hoursPerWeek: experience?.hoursPerWeek || undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleSkillsChange = (skills: string) => {
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    setFormData(prev => ({ ...prev, skillsGained: skillsArray }));
  };

  return (
    <div className="volunteering-form">
      <div className="form-overlay">
        <div className="form-modal">
          <div className="form-header">
            <h3>{experience ? 'Edit' : 'Add'} Volunteering Experience</h3>
            <button type="button" className="btn-close" onClick={onCancel}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Organization</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.organization}
                  onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="e.g. Local Food Bank"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Role/Position</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g. Kitchen Helper"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isCurrentRole}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      isCurrentRole: e.target.checked,
                      endDate: e.target.checked ? '' : prev.endDate
                    }))}
                  />
                  This is my current role
                </label>
                {!formData.isCurrentRole && (
                  <input
                    type="date"
                    className="form-input"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    placeholder="End Date"
                  />
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Hours per week</label>
              <select
                className="form-select"
                value={formData.hoursPerWeek || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  hoursPerWeek: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
              >
                <option value="">Select hours</option>
                <option value="1">1-2 hours</option>
                <option value="3">3-5 hours</option>
                <option value="6">6-10 hours</option>
                <option value="11">11-15 hours</option>
                <option value="16">16+ hours</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what you did and any achievements..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Skills Gained</label>
              <input
                type="text"
                className="form-input"
                value={formData.skillsGained.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="e.g. Communication, Teamwork, Organization"
              />
              <div className="help-text">Separate skills with commas</div>
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
                {experience ? 'Update' : 'Add'} Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Language Form Component
interface LanguageFormProps {
  onSave: (language: LanguageSkill) => void;
  onCancel: () => void;
}

const LanguageForm: React.FC<LanguageFormProps> = ({
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<LanguageSkill>({
    language: '',
    proficiency: 'basic',
    canInterpret: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.language) {
      onSave(formData);
    }
  };

  return (
    <div className="language-form">
      <div className="form-card">
        <div className="form-header">
          <h4>Add Language Skill</h4>
          <button type="button" className="btn-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">Language</label>
              <select
                className="form-select"
                value={formData.language}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                required
              >
                <option value="">Select language</option>
                {LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.label}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Proficiency Level</label>
              <select
                className="form-select"
                value={formData.proficiency}
                onChange={(e) => setFormData(prev => ({ ...prev, proficiency: e.target.value as any }))}
                required
              >
                {LANGUAGE_PROFICIENCY_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label} - {level.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.canInterpret}
                onChange={(e) => setFormData(prev => ({ ...prev, canInterpret: e.target.checked }))}
              />
              I can provide interpretation/translation services
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Language
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceSection;