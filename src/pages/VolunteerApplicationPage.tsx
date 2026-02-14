// src/pages/VolunteerApplicationPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Heart, Users, Crown, ArrowRight, ArrowLeft, 
  CheckCircle, Clock, Calendar, MapPin, Send,
  Shield, BookOpen, Mic, Briefcase
} from 'lucide-react';
import './VolunteerApplicationPage.css';

interface FormData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  age: string;
  
  // Step 2: Role & Availability
  preferredRole: 'connector' | 'curator' | 'champion' | '';
  availability: string[];
  hoursPerWeek: string;
  startDate: string;
  
  // Step 3: Experience & Motivation
  experience: string;
  skills: string[];
  motivation: string;
  heardAbout: string;
  
  // Step 4: Background & Agreements
  hasDBSCheck: boolean;
  willingToDBS: boolean;
  hasRightToVolunteer: boolean;
  acceptsSafeguarding: boolean;
  acceptsDataPolicy: boolean;
  emergencyName: string;
  emergencyPhone: string;
}

const VolunteerApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedRole = searchParams.get('role') || '';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postcode: '',
    age: '',
    preferredRole: preSelectedRole as FormData['preferredRole'],
    availability: [],
    hoursPerWeek: '',
    startDate: '',
    experience: '',
    skills: [],
    motivation: '',
    heardAbout: '',
    hasDBSCheck: false,
    willingToDBS: false,
    hasRightToVolunteer: false,
    acceptsSafeguarding: false,
    acceptsDataPolicy: false,
    emergencyName: '',
    emergencyPhone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    {
      id: 'connector',
      title: 'Connector',
      icon: <Heart size={24} />,
      color: '#10b981',
      commitment: '2-4 hours/week',
      description: 'Welcome new members, facilitate introductions, build community bonds',
      tasks: ['Greeting at events', 'One-to-one check-ins', 'Community outreach', 'Social media support']
    },
    {
      id: 'curator',
      title: 'Curator',
      icon: <Users size={24} />,
      color: '#06b6d4',
      commitment: '4-8 hours/week',
      description: 'Organize events, manage resources, coordinate programme activities',
      tasks: ['Event planning', 'Resource management', 'Workshop assistance', 'Documentation']
    },
    {
      id: 'champion',
      title: 'Champion',
      icon: <Crown size={24} />,
      color: '#fbbf24',
      commitment: '8+ hours/week',
      description: 'Lead initiatives, mentor others, represent the community externally',
      tasks: ['Programme leadership', 'Mentoring', 'External representation', 'Strategic input']
    }
  ];

  const availabilityOptions = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Saturday',
    'Sunday',
    'Flexible'
  ];

  const skillOptions = [
    'Teaching/Training',
    'Event Planning',
    'Social Media',
    'Graphic Design',
    'Video/Audio Production',
    'Writing/Editing',
    'Tech Support',
    'Youth Work',
    'Project Management',
    'Fundraising',
    'Community Outreach',
    'Languages'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayToggle = (field: 'availability' | 'skills', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Required';
      if (!formData.postcode.trim()) newErrors.postcode = 'Required';
      if (!formData.age) newErrors.age = 'Required';
    }

    if (step === 2) {
      if (!formData.preferredRole) newErrors.preferredRole = 'Please select a role';
      if (formData.availability.length === 0) newErrors.availability = 'Select at least one';
      if (!formData.hoursPerWeek) newErrors.hoursPerWeek = 'Required';
    }

    if (step === 3) {
      if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to volunteer';
      if (formData.motivation.trim().length < 50) {
        newErrors.motivation = 'Please write at least a few sentences';
      }
    }

    if (step === 4) {
      if (!formData.hasDBSCheck && !formData.willingToDBS) {
        newErrors.dbs = 'DBS check required for volunteering with young people';
      }
      if (!formData.hasRightToVolunteer) newErrors.hasRightToVolunteer = 'Required';
      if (!formData.acceptsSafeguarding) newErrors.acceptsSafeguarding = 'Required';
      if (!formData.acceptsDataPolicy) newErrors.acceptsDataPolicy = 'Required';
      if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage for demo
      const applications = JSON.parse(localStorage.getItem('ww_volunteer_applications') || '[]');
      applications.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('ww_volunteer_applications', JSON.stringify(applications));
      
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="volunteer-page">
        <div className="volunteer-success">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Application Submitted!</h1>
          <p>
            Thank you for applying to volunteer with Wembley Wonders, {formData.firstName}.
          </p>
          
          <div className="success-details">
            <h3>What happens next?</h3>
            <ol>
              <li>We'll review your application within <strong>5 working days</strong></li>
              <li>You'll receive an email to schedule an informal chat</li>
              <li>If successful, we'll arrange your DBS check and induction</li>
              <li>You'll be matched with a team and start your volunteer journey!</li>
            </ol>
          </div>

          <div className="success-role">
            <span>You applied for:</span>
            <strong>{roles.find(r => r.id === formData.preferredRole)?.title}</strong>
          </div>

          <div className="success-actions">
            <Link to="/volunteers" className="btn-secondary">
              Learn More About Volunteering
            </Link>
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer-page">
      {/* Header */}
      <section className="volunteer-header">
        <div className="header-content">
          <Link to="/volunteers" className="back-link">
            <ArrowLeft size={16} />
            Back to Volunteering
          </Link>
          <h1>Volunteer Application</h1>
          <p>Join our community of volunteers making real impact in Wembley</p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-steps">
          {[1, 2, 3, 4].map(step => (
            <div 
              key={step} 
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            >
              <div className="step-number">
                {currentStep > step ? <CheckCircle size={16} /> : step}
              </div>
              <span className="step-label">
                {step === 1 && 'About You'}
                {step === 2 && 'Role & Time'}
                {step === 3 && 'Experience'}
                {step === 4 && 'Final Steps'}
              </span>
            </div>
          ))}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="form-container">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>About You</h2>
            <p className="step-intro">Let's start with some basic information</p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="postcode">Postcode *</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className={errors.postcode ? 'error' : ''}
                  placeholder="e.g. HA9 0WS"
                />
                {errors.postcode && <span className="error-msg">{errors.postcode}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age Range *</label>
              <select
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={errors.age ? 'error' : ''}
              >
                <option value="">Select your age range</option>
                <option value="16-17">16-17 (Junior Volunteer)</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65+">65+</option>
              </select>
              {errors.age && <span className="error-msg">{errors.age}</span>}
            </div>
          </div>
        )}

        {/* Step 2: Role & Availability */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>Role & Availability</h2>
            <p className="step-intro">Tell us how you'd like to contribute</p>

            <div className="form-group">
              <label>Which role interests you most? *</label>
              <div className="role-cards">
                {roles.map(role => (
                  <div
                    key={role.id}
                    className={`role-card ${formData.preferredRole === role.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, preferredRole: role.id as FormData['preferredRole'] }))}
                    style={{ '--role-color': role.color } as React.CSSProperties}
                  >
                    <div className="role-icon">{role.icon}</div>
                    <h4>{role.title}</h4>
                    <p className="role-commitment">
                      <Clock size={14} /> {role.commitment}
                    </p>
                    <p className="role-desc">{role.description}</p>
                    <ul className="role-tasks">
                      {role.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {errors.preferredRole && <span className="error-msg">{errors.preferredRole}</span>}
            </div>

            <div className="form-group">
              <label>When are you available? *</label>
              <div className="checkbox-grid">
                {availabilityOptions.map(option => (
                  <label key={option} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(option)}
                      onChange={() => handleArrayToggle('availability', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errors.availability && <span className="error-msg">{errors.availability}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hoursPerWeek">Hours per week you can commit *</label>
                <select
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  className={errors.hoursPerWeek ? 'error' : ''}
                >
                  <option value="">Select hours</option>
                  <option value="1-2">1-2 hours</option>
                  <option value="2-4">2-4 hours</option>
                  <option value="4-8">4-8 hours</option>
                  <option value="8+">8+ hours</option>
                </select>
                {errors.hoursPerWeek && <span className="error-msg">{errors.hoursPerWeek}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="startDate">When can you start?</label>
                <select
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                >
                  <option value="">Select timeframe</option>
                  <option value="immediately">Immediately</option>
                  <option value="1-2-weeks">Within 1-2 weeks</option>
                  <option value="1-month">Within a month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Experience & Motivation */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>Experience & Motivation</h2>
            <p className="step-intro">Help us understand what you bring and why you want to volunteer</p>

            <div className="form-group">
              <label htmlFor="experience">Relevant experience (optional)</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about any relevant experience - paid or voluntary. This could include youth work, teaching, community organizing, or simply life experience you think would be valuable."
              />
            </div>

            <div className="form-group">
              <label>Skills you can offer (select all that apply)</label>
              <div className="checkbox-grid skills-grid">
                {skillOptions.map(skill => (
                  <label key={skill} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleArrayToggle('skills', skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to volunteer with us? *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={5}
                className={errors.motivation ? 'error' : ''}
                placeholder="What draws you to Wembley Wonders? What do you hope to gain and contribute?"
              />
              {errors.motivation && <span className="error-msg">{errors.motivation}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="heardAbout">How did you hear about us?</label>
              <select
                id="heardAbout"
                name="heardAbout"
                value={formData.heardAbout}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="word-of-mouth">Word of mouth</option>
                <option value="social-media">Social media</option>
                <option value="website">Website</option>
                <option value="event">Community event</option>
                <option value="volunteer-centre">Volunteer centre</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Background & Agreements */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>Final Steps</h2>
            <p className="step-intro">Important information and agreements</p>

            <div className="info-box">
              <Shield size={24} />
              <div>
                <h4>Safeguarding & DBS Checks</h4>
                <p>
                  As we work with young people, all volunteers require a DBS (Disclosure and Barring Service) 
                  check. We'll help you apply if you don't have one.
                </p>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-item standalone">
                <input
                  type="checkbox"
                  name="hasDBSCheck"
                  checked={formData.hasDBSCheck}
                  onChange={handleInputChange}
                />
                <span>I already have a valid DBS check (Enhanced)</span>
              </label>
            </div>

            <div className="form-group">
              <label className="checkbox-item standalone">
                <input
                  type="checkbox"
                  name="willingToDBS"
                  checked={formData.willingToDBS}
                  onChange={handleInputChange}
                />
                <span>I'm willing to undergo a DBS check (free for volunteers)</span>
              </label>
              {errors.dbs && <span className="error-msg">{errors.dbs}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-item standalone required">
                <input
                  type="checkbox"
                  name="hasRightToVolunteer"
                  checked={formData.hasRightToVolunteer}
                  onChange={handleInputChange}
                />
                <span>I confirm I have the right to volunteer in the UK *</span>
              </label>
              {errors.hasRightToVolunteer && <span className="error-msg">{errors.hasRightToVolunteer}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-item standalone required">
                <input
                  type="checkbox"
                  name="acceptsSafeguarding"
                  checked={formData.acceptsSafeguarding}
                  onChange={handleInputChange}
                />
                <span>
                  I agree to follow the{' '}
                  <Link to="/safeguarding" target="_blank">Safeguarding Policy</Link> *
                </span>
              </label>
              {errors.acceptsSafeguarding && <span className="error-msg">{errors.acceptsSafeguarding}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-item standalone required">
                <input
                  type="checkbox"
                  name="acceptsDataPolicy"
                  checked={formData.acceptsDataPolicy}
                  onChange={handleInputChange}
                />
                <span>
                  I agree to the{' '}
                  <Link to="/privacy" target="_blank">Privacy Policy</Link> and consent to my data being processed *
                </span>
              </label>
              {errors.acceptsDataPolicy && <span className="error-msg">{errors.acceptsDataPolicy}</span>}
            </div>

            <div className="emergency-section">
              <h4>Emergency Contact</h4>
              <p>In case we need to reach someone on your behalf</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyName">Contact Name *</label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    className={errors.emergencyName ? 'error' : ''}
                  />
                  {errors.emergencyName && <span className="error-msg">{errors.emergencyName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyPhone">Contact Phone *</label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className={errors.emergencyPhone ? 'error' : ''}
                  />
                  {errors.emergencyPhone && <span className="error-msg">{errors.emergencyPhone}</span>}
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="alert alert-error">{errors.submit}</div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" className="btn-back" onClick={handleBack}>
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          
          {currentStep < 4 ? (
            <button type="button" className="btn-next" onClick={handleNext}>
              Continue
              <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              type="button" 
              className="btn-submit" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplicationPage;