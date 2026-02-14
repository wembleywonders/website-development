import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './ConnectorApplicationForm.css';

interface ApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  
  // Background Information
  employment: string;
  education: string;
  volunteerExperience: string;
  
  // Motivation & Commitment
  motivationStatement: string;
  availableHours: number;
  specificInterests: string[];
  
  // Skills & Experience
  digitalSkills: number; // 1-5 scale
  leadershipExperience: string;
  communityInvolvement: string;
  
  // Safeguarding & References
  safeguardingConsent: boolean;
  reference1Name: string;
  reference1Contact: string;
  reference2Name: string;
  reference2Contact: string;
  
  // Declarations
  eligibilityDeclaration: boolean;
  dataProtectionConsent: boolean;
  backgroundCheckConsent: boolean;
}

const ConnectorApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    postcode: '',
    employment: '',
    education: '',
    volunteerExperience: '',
    motivationStatement: '',
    availableHours: 4,
    specificInterests: [],
    digitalSkills: 3,
    leadershipExperience: '',
    communityInvolvement: '',
    safeguardingConsent: false,
    reference1Name: '',
    reference1Contact: '',
    reference2Name: '',
    reference2Contact: '',
    eligibilityDeclaration: false,
    dataProtectionConsent: false,
    backgroundCheckConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Youth Development Programs',
    'Community Events & Festivals',
    'Environmental Initiatives',
    'Digital Inclusion Projects',
    'Local Business Support',
    'Arts & Culture Programs',
    'Sports & Recreation',
    'Education & Skills Training',
    'Social Services Support',
    'Community Safety Initiatives'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Information
        if (!applicationData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!applicationData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!applicationData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(applicationData.email)) newErrors.email = 'Email is invalid';
        if (!applicationData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!applicationData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!applicationData.postcode.trim()) newErrors.postcode = 'Postcode is required';
        break;

      case 2: // Background Information
        if (!applicationData.employment.trim()) newErrors.employment = 'Employment information is required';
        if (!applicationData.education.trim()) newErrors.education = 'Education information is required';
        break;

      case 3: // Motivation & Commitment
        if (!applicationData.motivationStatement.trim()) newErrors.motivationStatement = 'Motivation statement is required';
        if (applicationData.motivationStatement.length < 100) newErrors.motivationStatement = 'Please provide at least 100 characters';
        if (applicationData.specificInterests.length === 0) newErrors.specificInterests = 'Please select at least one area of interest';
        break;

      case 4: // Skills & Experience
        if (!applicationData.leadershipExperience.trim()) newErrors.leadershipExperience = 'Leadership experience is required';
        if (!applicationData.communityInvolvement.trim()) newErrors.communityInvolvement = 'Community involvement information is required';
        break;

      case 5: // References & Safeguarding
        if (!applicationData.reference1Name.trim()) newErrors.reference1Name = 'First reference name is required';
        if (!applicationData.reference1Contact.trim()) newErrors.reference1Contact = 'First reference contact is required';
        if (!applicationData.reference2Name.trim()) newErrors.reference2Name = 'Second reference name is required';
        if (!applicationData.reference2Contact.trim()) newErrors.reference2Contact = 'Second reference contact is required';
        if (!applicationData.safeguardingConsent) newErrors.safeguardingConsent = 'Safeguarding consent is required';
        break;

      case 6: // Final Declarations
        if (!applicationData.eligibilityDeclaration) newErrors.eligibilityDeclaration = 'Eligibility declaration is required';
        if (!applicationData.dataProtectionConsent) newErrors.dataProtectionConsent = 'Data protection consent is required';
        if (!applicationData.backgroundCheckConsent) newErrors.backgroundCheckConsent = 'Background check consent is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save application data
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const newApplication = {
        ...applicationData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      savedApplications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(savedApplications));
      
      navigate('/application-success');
    } catch (error) {
      console.error('Application submission failed:', error);
      setErrors({ submit: 'Application submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setApplicationData(prev => ({
      ...prev,
      specificInterests: prev.specificInterests.includes(interest)
        ? prev.specificInterests.filter(i => i !== interest)
        : [...prev.specificInterests, interest]
    }));
  };

  const updateField = (field: keyof ApplicationData, value: any) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Personal Information</h2>
            <p className="step-description">Let's start with your basic information</p>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={applicationData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={applicationData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={applicationData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={applicationData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={applicationData.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postcode">Postcode *</label>
                <input
                  type="text"
                  id="postcode"
                  value={applicationData.postcode}
                  onChange={(e) => updateField('postcode', e.target.value)}
                  className={errors.postcode ? 'error' : ''}
                  placeholder="HA9 0WS"
                />
                {errors.postcode && <span className="error-message">{errors.postcode}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Full Address</label>
              <textarea
                id="address"
                rows={3}
                value={applicationData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Street address, city, etc."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Background Information</h2>
            <p className="step-description">Tell us about your professional and educational background</p>
            
            <div className="form-group">
              <label htmlFor="employment">Current Employment Status *</label>
              <textarea
                id="employment"
                rows={3}
                value={applicationData.employment}
                onChange={(e) => updateField('employment', e.target.value)}
                className={errors.employment ? 'error' : ''}
                placeholder="Current job, profession, or if unemployed/retired/student"
              />
              {errors.employment && <span className="error-message">{errors.employment}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="education">Educational Background *</label>
              <textarea
                id="education"
                rows={3}
                value={applicationData.education}
                onChange={(e) => updateField('education', e.target.value)}
                className={errors.education ? 'error' : ''}
                placeholder="Highest level of education, qualifications, relevant courses"
              />
              {errors.education && <span className="error-message">{errors.education}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="volunteerExperience">Previous Volunteer Experience</label>
              <textarea
                id="volunteerExperience"
                rows={4}
                value={applicationData.volunteerExperience}
                onChange={(e) => updateField('volunteerExperience', e.target.value)}
                placeholder="Any previous volunteering, community work, or unpaid roles"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>Motivation & Commitment</h2>
            <p className="step-description">Help us understand why you want to join and what interests you most</p>
            
            <div className="form-group">
              <label htmlFor="motivationStatement">Why do you want to become a Connector? *</label>
              <textarea
                id="motivationStatement"
                rows={6}
                value={applicationData.motivationStatement}
                onChange={(e) => updateField('motivationStatement', e.target.value)}
                className={errors.motivationStatement ? 'error' : ''}
                placeholder="Tell us about your motivation, what you hope to achieve, and how you want to contribute to the Wembley community (minimum 100 characters)"
              />
              <div className="character-count">{applicationData.motivationStatement.length} characters</div>
              {errors.motivationStatement && <span className="error-message">{errors.motivationStatement}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="availableHours">Available Hours per Month</label>
              <div className="hours-selector">
                <input
                  type="range"
                  id="availableHours"
                  min="2"
                  max="20"
                  value={applicationData.availableHours}
                  onChange={(e) => updateField('availableHours', parseInt(e.target.value))}
                />
                <div className="hours-display">{applicationData.availableHours} hours per month</div>
              </div>
              <p className="form-note">Minimum commitment: 4 hours per month</p>
            </div>

            <div className="form-group">
              <label>Areas of Interest * (Select all that apply)</label>
              <div className="interest-grid">
                {interestOptions.map(interest => (
                  <label key={interest} className="interest-option">
                    <input
                      type="checkbox"
                      checked={applicationData.specificInterests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
              {errors.specificInterests && <span className="error-message">{errors.specificInterests}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h2>Skills & Experience</h2>
            <p className="step-description">Tell us about your skills and any relevant experience</p>
            
            <div className="form-group">
              <label htmlFor="digitalSkills">Digital Skills Level</label>
              <div className="skills-selector">
                <input
                  type="range"
                  id="digitalSkills"
                  min="1"
                  max="5"
                  value={applicationData.digitalSkills}
                  onChange={(e) => updateField('digitalSkills', parseInt(e.target.value))}
                />
                <div className="skills-labels">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
                <div className="skills-display">Level {applicationData.digitalSkills}/5</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="leadershipExperience">Leadership Experience *</label>
              <textarea
                id="leadershipExperience"
                rows={4}
                value={applicationData.leadershipExperience}
                onChange={(e) => updateField('leadershipExperience', e.target.value)}
                className={errors.leadershipExperience ? 'error' : ''}
                placeholder="Any leadership roles, team management, project coordination, or organizing experience"
              />
              {errors.leadershipExperience && <span className="error-message">{errors.leadershipExperience}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="communityInvolvement">Community Involvement *</label>
              <textarea
                id="communityInvolvement"
                rows={4}
                value={applicationData.communityInvolvement}
                onChange={(e) => updateField('communityInvolvement', e.target.value)}
                className={errors.communityInvolvement ? 'error' : ''}
                placeholder="Previous community involvement, local groups, neighborhood activities, or civic participation"
              />
              {errors.communityInvolvement && <span className="error-message">{errors.communityInvolvement}</span>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2>References & Safeguarding</h2>
            <p className="step-description">We need two references and your consent for safeguarding checks</p>
            
            <div className="references-section">
              <h3>Reference 1</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="reference1Name">Full Name *</label>
                  <input
                    type="text"
                    id="reference1Name"
                    value={applicationData.reference1Name}
                    onChange={(e) => updateField('reference1Name', e.target.value)}
                    className={errors.reference1Name ? 'error' : ''}
                  />
                  {errors.reference1Name && <span className="error-message">{errors.reference1Name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="reference1Contact">Contact Information *</label>
                  <input
                    type="text"
                    id="reference1Contact"
                    value={applicationData.reference1Contact}
                    onChange={(e) => updateField('reference1Contact', e.target.value)}
                    className={errors.reference1Contact ? 'error' : ''}
                    placeholder="Email or phone number"
                  />
                  {errors.reference1Contact && <span className="error-message">{errors.reference1Contact}</span>}
                </div>
              </div>
            </div>

            <div className="references-section">
              <h3>Reference 2</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="reference2Name">Full Name *</label>
                  <input
                    type="text"
                    id="reference2Name"
                    value={applicationData.reference2Name}
                    onChange={(e) => updateField('reference2Name', e.target.value)}
                    className={errors.reference2Name ? 'error' : ''}
                  />
                  {errors.reference2Name && <span className="error-message">{errors.reference2Name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="reference2Contact">Contact Information *</label>
                  <input
                    type="text"
                    id="reference2Contact"
                    value={applicationData.reference2Contact}
                    onChange={(e) => updateField('reference2Contact', e.target.value)}
                    className={errors.reference2Contact ? 'error' : ''}
                    placeholder="Email or phone number"
                  />
                  {errors.reference2Contact && <span className="error-message">{errors.reference2Contact}</span>}
                </div>
              </div>
            </div>

            <div className="safeguarding-section">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={applicationData.safeguardingConsent}
                    onChange={(e) => updateField('safeguardingConsent', e.target.checked)}
                    className={errors.safeguardingConsent ? 'error' : ''}
                  />
                  <span>I consent to enhanced safeguarding training and background checks as required for working with young people *</span>
                </label>
                {errors.safeguardingConsent && <span className="error-message">{errors.safeguardingConsent}</span>}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <h2>Final Declarations</h2>
            <p className="step-description">Please review and confirm these important declarations</p>
            
            <div className="declarations-section">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={applicationData.eligibilityDeclaration}
                    onChange={(e) => updateField('eligibilityDeclaration', e.target.checked)}
                    className={errors.eligibilityDeclaration ? 'error' : ''}
                  />
                  <span>I confirm that I am eligible to work/volunteer in the UK and all information provided is true and accurate *</span>
                </label>
                {errors.eligibilityDeclaration && <span className="error-message">{errors.eligibilityDeclaration}</span>}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={applicationData.dataProtectionConsent}
                    onChange={(e) => updateField('dataProtectionConsent', e.target.checked)}
                    className={errors.dataProtectionConsent ? 'error' : ''}
                  />
                  <span>I consent to the processing of my personal data in accordance with GDPR and our privacy policy *</span>
                </label>
                {errors.dataProtectionConsent && <span className="error-message">{errors.dataProtectionConsent}</span>}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={applicationData.backgroundCheckConsent}
                    onChange={(e) => updateField('backgroundCheckConsent', e.target.checked)}
                    className={errors.backgroundCheckConsent ? 'error' : ''}
                  />
                  <span>I consent to background checks being conducted as part of the safeguarding process *</span>
                </label>
                {errors.backgroundCheckConsent && <span className="error-message">{errors.backgroundCheckConsent}</span>}
              </div>
            </div>

            {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="application-page">
      
      <div className="application-container">
        <div className="application-header">
          <h1>Connector Membership Application</h1>
          <div className="progress-bar">
            <div className="progress-steps">
              {[1, 2, 3, 4, 5, 6].map(step => (
                <div
                  key={step}
                  className={`progress-step ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
          <p className="step-indicator">Step {currentStep} of 6</p>
        </div>

        <div className="application-form">
          {renderStep()}
          
          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-secondary">
                Back
              </button>
            )}
            
            {currentStep < 6 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit} 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectorApplicationForm;
