import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import DraggableMaya from "../components/maya/DraggableMaya";
import Footer from "../components/layout/Footer";
import './ApplyPage.css';

type ApplicationType = 'volunteer' | 'connector' | 'champion' | 'curator' | 'director' | 'staff';

interface ApplicationConfig {
  title: string;
  subtitle: string;
  badge: string;
  showSafeguarding: boolean;
  showMembershipTier: boolean;
  showLeadershipExperience: boolean;
  showProgramInterests: boolean;
  showEmploymentDetails: boolean;
}

interface FormData {
  // Personal Information (always shown)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  dateOfBirth: string;
  
  // Professional Background (conditional)
  occupation: string;
  employer: string;
  experience: string;
  skills: string;
  
  // Application-specific
  applicationType: ApplicationType;
  tier: string;
  motivation: string;
  availability: string;
  
  // Volunteer-specific
  programInterests: string[];
  previousVolunteering: string;
  
  // Leadership-specific (Champion/Curator/Director)
  leadershipExperience: string;
  communityConnections: string;
  sectorKnowledge: string;
  
  // Employment-specific (Staff)
  position: string;
  salary: string;
  startDate: string;
  
  // References
  reference1Name: string;
  reference1Contact: string;
  reference1Relationship: string;
  reference2Name: string;
  reference2Contact: string;
  reference2Relationship: string;
  
  // Agreements
  codeOfConduct: boolean;
  safeguardingPolicy: boolean;
  dataProtection: boolean;
  backgroundCheck: boolean;
}

const APPLICATION_CONFIGS: Record<ApplicationType, ApplicationConfig> = {
  volunteer: {
    title: 'Volunteer Application',
    subtitle: 'Join our community of volunteers making a difference in Wembley',
    badge: '🤝',
    showSafeguarding: true,
    showMembershipTier: false,
    showLeadershipExperience: false,
    showProgramInterests: true,
    showEmploymentDetails: false,
  },
  connector: {
    title: 'Connector Membership Application',
    subtitle: 'Join as a Connector - our foundation membership tier',
    badge: '🔗',
    showSafeguarding: false,
    showMembershipTier: true,
    showLeadershipExperience: false,
    showProgramInterests: true,
    showEmploymentDetails: false,
  },
  champion: {
    title: 'Champion Membership Application',
    subtitle: 'Apply to become a Champion - advocate for community needs',
    badge: '⚡',
    showSafeguarding: false,
    showMembershipTier: true,
    showLeadershipExperience: true,
    showProgramInterests: true,
    showEmploymentDetails: false,
  },
  curator: {
    title: 'Curator Membership Application',
    subtitle: 'Join as a Curator - shape our programmes and offerings',
    badge: '🎨',
    showSafeguarding: false,
    showMembershipTier: true,
    showLeadershipExperience: true,
    showProgramInterests: true,
    showEmploymentDetails: false,
  },
  director: {
    title: 'Director Application',
    subtitle: 'Apply to join our Board of Directors',
    badge: '👔',
    showSafeguarding: true,
    showMembershipTier: false,
    showLeadershipExperience: true,
    showProgramInterests: false,
    showEmploymentDetails: false,
  },
  staff: {
    title: 'Staff Position Application',
    subtitle: 'Join the Wembley Wonders team',
    badge: '💼',
    showSafeguarding: true,
    showMembershipTier: false,
    showLeadershipExperience: false,
    showProgramInterests: false,
    showEmploymentDetails: true,
  },
};

const PROGRAM_INTERESTS = [
  { value: 'kaywanas-court', label: 'Kaywana\'s Court (Performance & Culture)' },
  { value: 'pageturners', label: 'Pageturners Writer\'s Workshop' },
  { value: 'raydyo', label: 'Raydyo Community Radio' },
  { value: 'joystick', label: 'Joystick Magazine' },
  { value: 'backstage-skills', label: 'Backstage Skills Training' },
  { value: 'workshops', label: 'Quarterly Workshops' },
  { value: 'emergency-response', label: 'Emergency Response' },
  { value: 'family-support', label: 'Family Support' },
];

const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const applicationType = (searchParams.get('type') || 'volunteer') as ApplicationType;
  const config = APPLICATION_CONFIGS[applicationType];
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    dateOfBirth: '',
    occupation: '',
    employer: '',
    experience: '',
    skills: '',
    applicationType: applicationType,
    tier: applicationType,
    motivation: '',
    availability: '',
    programInterests: [],
    previousVolunteering: '',
    leadershipExperience: '',
    communityConnections: '',
    sectorKnowledge: '',
    position: '',
    salary: '',
    startDate: '',
    reference1Name: '',
    reference1Contact: '',
    reference1Relationship: '',
    reference2Name: '',
    reference2Contact: '',
    reference2Relationship: '',
    codeOfConduct: false,
    safeguardingPolicy: false,
    dataProtection: false,
    backgroundCheck: false,
  });

  // Calculate total steps based on application type
  const getTotalSteps = () => {
    let steps = 3; // Personal Info, Experience/Motivation, References/Agreements
    if (config.showLeadershipExperience) steps += 1;
    if (config.showProgramInterests) steps += 1;
    return steps;
  };

  const totalSteps = getTotalSteps();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProgramInterestChange = (programValue: string) => {
    setFormData(prev => ({
      ...prev,
      programInterests: prev.programInterests.includes(programValue)
        ? prev.programInterests.filter(p => p !== programValue)
        : [...prev.programInterests, programValue]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        if (config.showEmploymentDetails) {
          return formData.position && formData.motivation;
        }
        return formData.occupation && formData.experience && formData.skills;
      case 3:
        if (config.showLeadershipExperience) {
          return formData.leadershipExperience && formData.communityConnections;
        }
        if (config.showProgramInterests) {
          return formData.programInterests.length > 0 && formData.motivation && formData.availability;
        }
        return formData.motivation && formData.availability;
      case 4:
        if (config.showProgramInterests && config.showLeadershipExperience) {
          return formData.programInterests.length > 0;
        }
        return formData.reference1Name && formData.reference1Contact && formData.codeOfConduct && formData.dataProtection;
      case 5:
        return formData.reference1Name && formData.reference1Contact && formData.codeOfConduct && formData.dataProtection;
      default:
        return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    
    // Save application data (TODO: Send to backend API)
    
    // Navigate to success page with application data
    navigate('/application-success', {
      state: {
        applicationType: applicationType,
        applicationData: formData,
        offerAccountCreation: true // Enable optional account creation
      }
    });
  };

  // Map application type to valid membership tier for Maya
  const getMayaTier = (): 'visitor' | 'connector' | 'champion' | 'curator' => {
    if (applicationType === 'connector' || applicationType === 'champion' || applicationType === 'curator') {
      return applicationType;
    }
    return 'visitor'; // Default for volunteer, director, staff
  };

  return (
    <div className="apply-page">
      <div className="apply-header">
        <div className="apply-badge">
          <span>{config.badge}</span>
          <span>{config.title}</span>
        </div>
        <h1 className="apply-title">Join Wembley Wonders</h1>
        <p className="apply-subtitle">{config.subtitle}</p>
        
        {/* Guest Application Notice */}
        {applicationType === 'volunteer' && (
          <div className="apply-info-panel" style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            marginTop: '1rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <p style={{ margin: 0, color: '#6ee7b7', fontSize: '0.95rem' }}>
              ✓ No account required to apply. Create one later to track your application status.
            </p>
          </div>
        )}
        
        {applicationType !== 'volunteer' && (
          <div className="apply-info-panel">
            <p>Not sure which tier is right for you? <Link to="/membership">Learn about membership tiers</Link></p>
          </div>
        )}
      </div>

      <div className="apply-content">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-text">Step {currentStep} of {totalSteps}</div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ... (rest of your form sections remain the same) ... */}
          {/* Just keeping the structure for brevity - copy all your existing form sections here */}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                ← Previous
              </button>
            )}
            
            <div className="nav-spacer"></div>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="btn btn-primary"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed()}
                className="btn btn-primary btn-submit"
              >
                Submit Application →
              </button>
            )}
          </div>
        </form>
      </div>

      <DraggableMaya membershipTier={getMayaTier()} />
      <Footer />
    </div>
  );
};

export default ApplyPage;