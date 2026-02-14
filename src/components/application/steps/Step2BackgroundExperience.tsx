import React, { useState, useEffect } from 'react';
import { 
  Step2Props, 
  Step2FormData, 
  Step2ValidationErrors 
} from '../../../types/application/step2Types';
import { 
  validateStep2, 
  getStep2CompletionPercentage,
  validateEmploymentSection,
  validateEducationSection,
  validateExperienceSection,
  validateAvailabilitySection
} from '../../../utils/validation/step2Validation';
import { 
  EmploymentSection,
  EducationSection,
  ExperienceSection,
  SkillsSelector,
  AvailabilitySection
} from '../fields';
import './Step2BackgroundExperience.css';

interface Step2BackgroundExperienceProps extends Omit<Step2Props, 'onValidate'> {
  onSaveProgress?: (data: Partial<Step2FormData>) => void;
  autoSave?: boolean;
}

const Step2BackgroundExperience: React.FC<Step2BackgroundExperienceProps> = ({
  data,
  errors,
  onChange,
  onNext,
  onPrevious,
  isLoading = false,
  onSaveProgress,
  autoSave = true
}) => {
  const [localData, setLocalData] = useState<Partial<Step2FormData>>(data);
  const [localErrors, setLocalErrors] = useState<Step2ValidationErrors>(errors);
  const [activeSection, setActiveSection] = useState<string>('employment');
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasUnsavedChanges && onSaveProgress) {
      const saveTimer = setTimeout(() => {
        onSaveProgress(localData);
        setHasUnsavedChanges(false);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(saveTimer);
    }
  }, [localData, hasUnsavedChanges, autoSave, onSaveProgress]);

  // Update completion percentage when data changes
  useEffect(() => {
    const percentage = getStep2CompletionPercentage(localData);
    setCompletionPercentage(percentage);
  }, [localData]);

  // Sync with parent data
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Sync with parent errors
  useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);

  const handleFieldChange = (field: keyof Step2FormData, value: any) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    setHasUnsavedChanges(true);
    
    // Clear field-specific errors when user makes changes
    if (localErrors[field as keyof Step2ValidationErrors]) {
      const newErrors = { ...localErrors };
      delete newErrors[field as keyof Step2ValidationErrors];
      setLocalErrors(newErrors);
    }
    
    // Notify parent of changes
    onChange(field, value);
  };

  const validateCurrentSection = (sectionId: string): boolean => {
    let sectionErrors: Partial<Step2ValidationErrors> = {};
    
    switch (sectionId) {
      case 'employment':
        sectionErrors = validateEmploymentSection(localData);
        break;
      case 'education':
        sectionErrors = validateEducationSection(localData);
        break;
      case 'experience':
        sectionErrors = validateExperienceSection(localData);
        break;
      case 'availability':
        sectionErrors = validateAvailabilitySection(localData);
        break;
      default:
        break;
    }
    
    setLocalErrors(prev => ({ ...prev, ...sectionErrors }));
    return Object.keys(sectionErrors).length === 0;
  };

  const handleSectionChange = (sectionId: string) => {
    // Validate current section before switching
    validateCurrentSection(activeSection);
    setActiveSection(sectionId);
  };

  const handleNext = () => {
    // Validate all sections before proceeding
    const allErrors = validateStep2(localData);
    setLocalErrors(allErrors);
    
    if (Object.keys(allErrors).length === 0) {
      onNext();
    } else {
      // Find first section with errors and switch to it
      const errorFields = Object.keys(allErrors);
      if (errorFields.some(field => ['employmentStatus', 'currentJobTitle', 'currentEmployer'].includes(field))) {
        setActiveSection('employment');
      } else if (errorFields.includes('highestEducationLevel')) {
        setActiveSection('education');
      } else if (errorFields.includes('skills')) {
        setActiveSection('experience');
      } else if (errorFields.some(field => ['interestAreas', 'timeCommitment', 'availability'].includes(field))) {
        setActiveSection('availability');
      }
    }
  };

  const handlePrevious = () => {
    if (hasUnsavedChanges && onSaveProgress) {
      onSaveProgress(localData);
    }
    onPrevious();
  };

  const sections = [
    {
      id: 'employment',
      title: 'Employment',
      description: 'Current work situation and experience',
      icon: '💼',
      isComplete: () => {
        const errors = validateEmploymentSection(localData);
        return Object.keys(errors).length === 0;
      }
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Qualifications and learning background',
      icon: '🎓',
      isComplete: () => {
        const errors = validateEducationSection(localData);
        return Object.keys(errors).length === 0;
      }
    },
    {
      id: 'experience',
      title: 'Skills & Experience',
      description: 'Your abilities and volunteer experience',
      icon: '⭐',
      isComplete: () => {
        const errors = validateExperienceSection(localData);
        return Object.keys(errors).length === 0;
      }
    },
    {
      id: 'availability',
      title: 'Interests & Availability',
      description: 'What interests you and when you can help',
      icon: '📅',
      isComplete: () => {
        const errors = validateAvailabilitySection(localData);
        return Object.keys(errors).length === 0;
      }
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'employment':
        return (
          <EmploymentSection
            data={localData}
            errors={localErrors}
            onChange={handleFieldChange}
          />
        );
      case 'education':
        return (
          <EducationSection
            data={localData}
            errors={localErrors}
            onChange={handleFieldChange}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            data={localData}
            errors={localErrors}
            onChange={handleFieldChange}
          />
        );
      case 'availability':
        return (
          <AvailabilitySection
            data={localData}
            errors={localErrors}
            onChange={handleFieldChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="step2-background-experience">
      <div className="step-header">
        <div className="step-title">
          <h1>Background & Experience</h1>
          <p>Tell us about your background so we can match you with suitable opportunities</p>
        </div>
        
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="progress-text">{completionPercentage}% complete</span>
        </div>
      </div>

      <div className="step-navigation">
        <div className="section-tabs">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`section-tab ${activeSection === section.id ? 'active' : ''} ${section.isComplete() ? 'complete' : ''}`}
              onClick={() => handleSectionChange(section.id)}
              disabled={isLoading}
            >
              <div className="tab-icon">{section.icon}</div>
              <div className="tab-content">
                <div className="tab-title">{section.title}</div>
                <div className="tab-description">{section.description}</div>
              </div>
              {section.isComplete() && <div className="completion-indicator">✓</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="step-content">
        <div className="section-container">
          {renderActiveSection()}
        </div>
      </div>

      <div className="step-actions">
        <div className="action-info">
          {hasUnsavedChanges && (
            <span className="unsaved-indicator">
              💾 Unsaved changes
            </span>
          )}
          {autoSave && !hasUnsavedChanges && (
            <span className="saved-indicator">
              ✓ Changes saved
            </span>
          )}
        </div>
        
        <div className="action-buttons">
          <button
            type="button"
            className="btn-secondary"
            onClick={handlePrevious}
            disabled={isLoading}
          >
            ← Previous
          </button>
          
          <button
            type="button"
            className="btn-primary"
            onClick={handleNext}
            disabled={isLoading || completionPercentage < 80}
          >
            {isLoading ? 'Saving...' : 'Next →'}
          </button>
        </div>
      </div>

      {Object.keys(localErrors).length > 0 && (
        <div className="validation-summary">
          <h3>Please complete the following:</h3>
          <ul>
            {Object.entries(localErrors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Step2BackgroundExperience;