import React, { useState } from 'react';
import { 
  Step2FormData, 
  Step2ValidationErrors, 
  EducationHistory,
  EducationSectionData 
} from '../../../types/application/step2Types';
import { 
  EDUCATION_LEVELS, 
  STUDY_FIELDS,
  PROFESSIONAL_QUALIFICATIONS,
  getStudyFieldsByCategory,
  getStudyFieldCategories,
  getProfessionalQualificationsByCategory,
  getProfessionalQualificationCategories
} from '../../../data/application/educationData';
import './EducationSection.css';

interface EducationSectionProps {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  data,
  errors,
  onChange
}) => {
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>(
    data.professionalQualifications || []
  );

  const handleAddEducation = () => {
    setEditingEducationIndex(null);
    setShowEducationForm(true);
  };

  const handleEditEducation = (index: number) => {
    setEditingEducationIndex(index);
    setShowEducationForm(true);
  };

  const handleSaveEducation = (education: EducationHistory) => {
    const currentEducation = data.educationHistory || [];
    let updatedEducation;

    if (editingEducationIndex !== null) {
      updatedEducation = [...currentEducation];
      updatedEducation[editingEducationIndex] = education;
    } else {
      updatedEducation = [...currentEducation, education];
    }

    onChange('educationHistory', updatedEducation);
    setShowEducationForm(false);
    setEditingEducationIndex(null);
  };

  const handleDeleteEducation = (index: number) => {
    const currentEducation = data.educationHistory || [];
    const updatedEducation = currentEducation.filter((_, i) => i !== index);
    onChange('educationHistory', updatedEducation);
  };

  const handleCancelEducation = () => {
    setShowEducationForm(false);
    setEditingEducationIndex(null);
  };

  const handleProfessionalQualificationToggle = (qualificationValue: string) => {
    const updated = selectedQualifications.includes(qualificationValue)
      ? selectedQualifications.filter(q => q !== qualificationValue)
      : [...selectedQualifications, qualificationValue];
    
    setSelectedQualifications(updated);
    onChange('professionalQualifications', updated);
  };

  const handleCurrentStudyToggle = (isStudying: boolean) => {
    onChange('currentlyStudying', isStudying);
    if (!isStudying) {
      onChange('currentStudyDetails', '');
    }
  };

  return (
    <div className="education-section">
      <div className="section-header">
        <h2>Education & Qualifications</h2>
        <p>Tell us about your educational background and any professional qualifications</p>
      </div>

      <div className="form-group">
        <label className="form-label required">
          Highest Level of Education
        </label>
        <div className="education-levels">
          {EDUCATION_LEVELS.map((level) => (
            <label key={level.value} className="education-level-option">
              <input
                type="radio"
                name="highestEducationLevel"
                value={level.value}
                checked={data.highestEducationLevel === level.value}
                onChange={(e) => onChange('highestEducationLevel', e.target.value)}
              />
              <div className="level-content">
                <div className="level-label">{level.label}</div>
                <div className="level-description">{level.description}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.highestEducationLevel && (
          <div className="error-message">{errors.highestEducationLevel}</div>
        )}
      </div>

      <div className="education-details-section">
        <div className="subsection-header">
          <h3>Education History</h3>
          <p>Add details about your educational background</p>
          <button
            type="button"
            className="btn-add"
            onClick={handleAddEducation}
          >
            + Add Education
          </button>
        </div>

        {data.educationHistory && data.educationHistory.length > 0 && (
          <div className="education-list">
            {data.educationHistory.map((education, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <div className="education-title">
                    <strong>{education.fieldOfStudy}</strong> at {education.institution}
                  </div>
                  <div className="education-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => handleEditEducation(index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteEducation(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="education-details">
                  <div className="education-level">
                    {EDUCATION_LEVELS.find(l => l.value === education.level)?.label}
                  </div>
                  <div className="education-year">
                    {education.isCompleted 
                      ? `Graduated ${education.graduationYear || 'Unknown'}`
                      : 'In Progress'
                    }
                  </div>
                  {education.relevantToRole && (
                    <div className="relevance-indicator">
                      ✓ Relevant to community work
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showEducationForm && (
          <EducationForm
            education={editingEducationIndex !== null ? data.educationHistory?.[editingEducationIndex] : undefined}
            onSave={handleSaveEducation}
            onCancel={handleCancelEducation}
          />
        )}
      </div>

      <div className="professional-qualifications-section">
        <h3>Professional Qualifications</h3>
        <p>Select any professional qualifications or certifications you hold</p>
        
        <div className="qualifications-grid">
          {getProfessionalQualificationCategories().map(category => (
            <div key={category} className="qualification-category">
              <h4>{category}</h4>
              <div className="qualification-options">
                {getProfessionalQualificationsByCategory(category).map(qualification => (
                  <label key={qualification.value} className="qualification-option">
                    <input
                      type="checkbox"
                      checked={selectedQualifications.includes(qualification.value)}
                      onChange={() => handleProfessionalQualificationToggle(qualification.value)}
                    />
                    <span className="qualification-label">{qualification.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="current-study-section">
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.currentlyStudying || false}
              onChange={(e) => handleCurrentStudyToggle(e.target.checked)}
            />
            <span>I am currently studying</span>
          </label>
        </div>

        {data.currentlyStudying && (
          <div className="form-group">
            <label className="form-label">
              What are you currently studying?
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              value={data.currentStudyDetails || ''}
              onChange={(e) => onChange('currentStudyDetails', e.target.value)}
              placeholder="e.g. Part-time Business Management course at Brent College, expected completion 2025"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Education Form Component
interface EducationFormProps {
  education?: EducationHistory;
  onSave: (education: EducationHistory) => void;
  onCancel: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<EducationHistory>({
    level: education?.level || 'secondary_school',
    institution: education?.institution || '',
    fieldOfStudy: education?.fieldOfStudy || '',
    graduationYear: education?.graduationYear || undefined,
    isCompleted: education?.isCompleted ?? true,
    relevantToRole: education?.relevantToRole || false
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: string[] = [];
    if (!formData.institution.trim()) validationErrors.push('Institution is required');
    if (!formData.fieldOfStudy.trim()) validationErrors.push('Field of study is required');
    if (formData.isCompleted && !formData.graduationYear) {
      validationErrors.push('Graduation year is required for completed education');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 10 }, (_, i) => currentYear - i + 9);

  return (
    <div className="education-form">
      <div className="form-overlay">
        <div className="form-modal">
          <div className="form-header">
            <h3>{education ? 'Edit' : 'Add'} Education</h3>
            <button type="button" className="btn-close" onClick={onCancel}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label required">Education Level</label>
              <select
                className="form-select"
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as any }))}
                required
              >
                {EDUCATION_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Institution</label>
              <input
                type="text"
                className="form-input"
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                placeholder="e.g. University of Westminster"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Field of Study</label>
              <div className="field-selection">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select category first</option>
                  {getStudyFieldCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {selectedCategory && (
                  <select
                    className="form-select"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                  >
                    <option value="">Select field of study</option>
                    {getStudyFieldsByCategory(selectedCategory).map(field => (
                      <option key={field.value} value={field.label}>{field.label}</option>
                    ))}
                  </select>
                )}

                <input
                  type="text"
                  className="form-input"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                  placeholder="Or type your field of study"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isCompleted}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      isCompleted: e.target.checked,
                      graduationYear: e.target.checked ? prev.graduationYear : undefined
                    }))}
                  />
                  Completed
                </label>
              </div>

              {formData.isCompleted && (
                <div className="form-group">
                  <label className="form-label">Graduation Year</label>
                  <select
                    className="form-select"
                    value={formData.graduationYear || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      graduationYear: e.target.value ? parseInt(e.target.value) : undefined 
                    }))}
                  >
                    <option value="">Select year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.relevantToRole || false}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    relevantToRole: e.target.checked 
                  }))}
                />
                This education is relevant to community work
              </label>
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
                {education ? 'Update' : 'Add'} Education
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;