import React, { useState } from 'react';
import { 
  Step2FormData, 
  Step2ValidationErrors, 
  WorkExperience,
  EmploymentSectionData 
} from '../../../types/application/step2Types';
import { 
  EMPLOYMENT_STATUS_OPTIONS, 
  WORK_SECTORS 
} from '../../../data/application/educationData';
import { validateWorkExperience } from '../../../utils/validation/step2Validation';
import './EmploymentSection.css';

interface EmploymentSectionProps {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({
  data,
  errors,
  onChange
}) => {
  const [showWorkExperienceForm, setShowWorkExperienceForm] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);
  const [workExperienceErrors, setWorkExperienceErrors] = useState<string[]>([]);

  const isEmployed = ['employed_full_time', 'employed_part_time', 'self_employed'].includes(data.employmentStatus || '');
  const isSelfEmployed = data.employmentStatus === 'self_employed';

  const handleEmploymentStatusChange = (status: string) => {
    onChange('employmentStatus', status);
    
    // Clear related fields when status changes
    if (!['employed_full_time', 'employed_part_time', 'self_employed'].includes(status)) {
      onChange('currentJobTitle', '');
      onChange('currentEmployer', '');
      onChange('workSector', '');
      onChange('yearsInCurrentRole', undefined);
    }
  };

  const handleAddWorkExperience = () => {
    setEditingExperienceIndex(null);
    setShowWorkExperienceForm(true);
    setWorkExperienceErrors([]);
  };

  const handleEditWorkExperience = (index: number) => {
    setEditingExperienceIndex(index);
    setShowWorkExperienceForm(true);
    setWorkExperienceErrors([]);
  };

  const handleSaveWorkExperience = (experience: WorkExperience) => {
    const validationErrors = validateWorkExperience(experience);
    
    if (validationErrors.length > 0) {
      setWorkExperienceErrors(validationErrors);
      return;
    }

    const currentExperiences = data.workExperience || [];
    let updatedExperiences;

    if (editingExperienceIndex !== null) {
      // Update existing experience
      updatedExperiences = [...currentExperiences];
      updatedExperiences[editingExperienceIndex] = experience;
    } else {
      // Add new experience
      updatedExperiences = [...currentExperiences, experience];
    }

    onChange('workExperience', updatedExperiences);
    setShowWorkExperienceForm(false);
    setEditingExperienceIndex(null);
    setWorkExperienceErrors([]);
  };

  const handleDeleteWorkExperience = (index: number) => {
    const currentExperiences = data.workExperience || [];
    const updatedExperiences = currentExperiences.filter((_, i) => i !== index);
    onChange('workExperience', updatedExperiences);
  };

  const handleCancelWorkExperience = () => {
    setShowWorkExperienceForm(false);
    setEditingExperienceIndex(null);
    setWorkExperienceErrors([]);
  };

  return (
    <div className="employment-section">
      <div className="section-header">
        <h2>Employment Information</h2>
        <p>Tell us about your current work situation and experience</p>
      </div>

      <div className="form-group">
        <label className="form-label required">
          Current Employment Status
        </label>
        <div className="radio-grid">
          {EMPLOYMENT_STATUS_OPTIONS.map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="employmentStatus"
                value={option.value}
                checked={data.employmentStatus === option.value}
                onChange={(e) => handleEmploymentStatusChange(e.target.value)}
              />
              <div className="radio-content">
                <div className="radio-label">{option.label}</div>
                <div className="radio-description">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.employmentStatus && (
          <div className="error-message">{errors.employmentStatus}</div>
        )}
      </div>

      {isEmployed && (
        <div className="current-employment-details">
          <h3>Current Employment Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">
                Job Title
              </label>
              <input
                type="text"
                className={`form-input ${errors.currentJobTitle ? 'error' : ''}`}
                value={data.currentJobTitle || ''}
                onChange={(e) => onChange('currentJobTitle', e.target.value)}
                placeholder="e.g. Community Support Worker"
              />
              {errors.currentJobTitle && (
                <div className="error-message">{errors.currentJobTitle}</div>
              )}
            </div>

            {!isSelfEmployed && (
              <div className="form-group">
                <label className="form-label required">
                  Employer
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.currentEmployer ? 'error' : ''}`}
                  value={data.currentEmployer || ''}
                  onChange={(e) => onChange('currentEmployer', e.target.value)}
                  placeholder="e.g. Local Council"
                />
                {errors.currentEmployer && (
                  <div className="error-message">{errors.currentEmployer}</div>
                )}
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Work Sector
              </label>
              <select
                className="form-select"
                value={data.workSector || ''}
                onChange={(e) => onChange('workSector', e.target.value)}
              >
                <option value="">Select sector</option>
                {WORK_SECTORS.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Years in Current Role
              </label>
              <select
                className="form-select"
                value={data.yearsInCurrentRole || ''}
                onChange={(e) => onChange('yearsInCurrentRole', e.target.value ? parseInt(e.target.value) : undefined)}
              >
                <option value="">Select years</option>
                <option value="0">Less than 1 year</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                  <option key={year} value={year}>{year} year{year > 1 ? 's' : ''}</option>
                ))}
                <option value="21">More than 20 years</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="work-experience-section">
        <div className="subsection-header">
          <h3>Previous Work Experience</h3>
          <p>Add any relevant work experience that might be useful for community work</p>
          <button
            type="button"
            className="btn-add"
            onClick={handleAddWorkExperience}
          >
            + Add Work Experience
          </button>
        </div>

        {data.workExperience && data.workExperience.length > 0 && (
          <div className="experience-list">
            {data.workExperience.map((experience, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <div className="experience-title">
                    <strong>{experience.jobTitle}</strong> at {experience.employer}
                  </div>
                  <div className="experience-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => handleEditWorkExperience(index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteWorkExperience(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="experience-details">
                  <div className="experience-dates">
                    {new Date(experience.startDate).toLocaleDateString()} - {
                      experience.isCurrentJob 
                        ? 'Present' 
                        : experience.endDate 
                          ? new Date(experience.endDate).toLocaleDateString()
                          : 'Unknown'
                    }
                  </div>
                  <div className="experience-description">
                    {experience.description}
                  </div>
                  {experience.relevantSkills.length > 0 && (
                    <div className="experience-skills">
                      <strong>Relevant Skills:</strong> {experience.relevantSkills.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showWorkExperienceForm && (
          <WorkExperienceForm
            experience={editingExperienceIndex !== null ? data.workExperience?.[editingExperienceIndex] : undefined}
            errors={workExperienceErrors}
            onSave={handleSaveWorkExperience}
            onCancel={handleCancelWorkExperience}
          />
        )}
      </div>
    </div>
  );
};

// Work Experience Form Component
interface WorkExperienceFormProps {
  experience?: WorkExperience;
  errors: string[];
  onSave: (experience: WorkExperience) => void;
  onCancel: () => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  experience,
  errors,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<WorkExperience>({
    jobTitle: experience?.jobTitle || '',
    employer: experience?.employer || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    isCurrentJob: experience?.isCurrentJob || false,
    description: experience?.description || '',
    relevantSkills: experience?.relevantSkills || [],
    sector: experience?.sector || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleSkillsChange = (skills: string) => {
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    setFormData(prev => ({ ...prev, relevantSkills: skillsArray }));
  };

  return (
    <div className="work-experience-form">
      <div className="form-overlay">
        <div className="form-modal">
          <div className="form-header">
            <h3>{experience ? 'Edit' : 'Add'} Work Experience</h3>
            <button type="button" className="btn-close" onClick={onCancel}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Job Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Employer</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.employer}
                  onChange={(e) => setFormData(prev => ({ ...prev, employer: e.target.value }))}
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
                <label className="form-label">
                  <input
                    type="checkbox"
                    checked={formData.isCurrentJob}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      isCurrentJob: e.target.checked,
                      endDate: e.target.checked ? '' : prev.endDate
                    }))}
                  />
                  This is my current job
                </label>
                {!formData.isCurrentJob && (
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
              <label className="form-label required">Job Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your role and responsibilities..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Relevant Skills</label>
              <input
                type="text"
                className="form-input"
                value={formData.relevantSkills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="e.g. Team leadership, Customer service, Project management"
              />
              <div className="help-text">Separate skills with commas</div>
            </div>

            <div className="form-group">
              <label className="form-label">Sector</label>
              <select
                className="form-select"
                value={formData.sector}
                onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
              >
                <option value="">Select sector</option>
                {WORK_SECTORS.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
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

export default EmploymentSection;