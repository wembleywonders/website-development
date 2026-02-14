import React, { useState, useEffect } from 'react';
import './WorkshopInterestSelector.css';

export interface WorkshopInterests {
  selectedPathway: string;
  programmes: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  availability: string[];
  timeCommitment: 'light' | 'moderate' | 'intensive';
}

interface WorkshopInterestSelectorProps {
  interests: WorkshopInterests;
  onChange: (interests: WorkshopInterests) => void;
}

const PATHWAYS = [
  {
    id: 'theater-construction',
    name: 'Theater Construction Pathway',
    description: 'Build sets, create backdrops, design physical spaces',
    skills: ['Carpentry & Set Building', 'Scenic Painting', 'Props Construction'],
    timeCommitment: 'moderate',
    schedule: 'Tuesday & Thursday evenings, Saturday mornings',
    duration: '12 weeks progressive training',
    employmentOutcomes: ['Set builder at local theaters', 'Freelance scenic artist', 'Props workshop assistant'],
    mayaAdvice: "This pathway builds practical construction skills that theaters desperately need. You'll start with basic carpentry, move to scenic painting, then advanced prop construction. Skills build on each other logically.",
    warningFlags: ['Requires physical stamina', 'Some weekend work', 'Workshop safety training mandatory']
  },
  {
    id: 'technical-theater',
    name: 'Technical Theater Pathway',
    description: 'Master lighting, sound, and electrical systems',
    skills: ['Lighting Technology', 'Sound Engineering', 'Basic Electrical Installation'],
    timeCommitment: 'intensive',
    schedule: 'Monday & Wednesday evenings, Sunday workshops',
    duration: '16 weeks technical progression',
    employmentOutcomes: ['Theater technician roles', 'Live event sound/lighting', 'Venue technical support'],
    mayaAdvice: "High-demand technical skills with clear employment pathways. You'll learn industry-standard equipment and safety protocols. Questors Theatre and Troubadour are actively hiring trained technicians.",
    warningFlags: ['Evening and weekend schedules', 'Electrical safety certification required', 'Equipment handling responsibilities']
  },
  {
    id: 'costume-design',
    name: 'Costume & Design Pathway',
    description: 'Create costumes, manage wardrobes, design looks',
    skills: ['Costume Making', 'Fabric Work', 'Wardrobe Management'],
    timeCommitment: 'moderate',
    schedule: 'Wednesday evenings, Saturday afternoons',
    duration: '10 weeks creative development',
    employmentOutcomes: ['Theater wardrobe assistant', 'Costume rental companies', 'Event styling support'],
    mayaAdvice: "Combines creativity with practical sewing skills. Strong integration with Scrap Cat recycling program - you'll work with donated fabrics and learn sustainable costume practices.",
    warningFlags: ['Detailed hand work required', 'Fabric costs (reduced by Scrap Cat donations)', 'Fitting sessions with performers']
  },
  {
    id: 'community-programs',
    name: 'Community Programs Focus',
    description: 'Engage with our signature community initiatives',
    skills: ['Choose from: Trubble n Bass, Kaywana\'s Court, Bright Sparks, Connoisseurs Club'],
    timeCommitment: 'light',
    schedule: 'Varies by program - evenings and weekends available',
    duration: '8-12 weeks per program',
    employmentOutcomes: ['Community facilitation', 'Program coordination', 'Youth work opportunities'],
    mayaAdvice: "These programs focus on community building and creative expression rather than specific employment skills. Great for exploring interests before committing to technical pathways.",
    warningFlags: ['Less direct employment outcomes', 'Requires community engagement', 'Performance/presentation elements']
  },
  {
    id: 'multi-pathway-explorer',
    name: 'Multi-Pathway Explorer',
    description: 'Explore multiple areas - requires careful time management',
    skills: ['Select from any combination above'],
    timeCommitment: 'intensive',
    schedule: 'Multiple evening and weekend commitments',
    duration: '20+ weeks overlapping schedules',
    employmentOutcomes: ['Versatile skills but longer development time', 'Jack-of-all-trades roles'],
    mayaAdvice: "⚠️ CAUTION: This option requires significant time commitment and strong organizational skills. Most successful learners focus on one pathway first, then expand. Consider starting with your primary interest.",
    warningFlags: ['High dropout risk', 'Scheduling conflicts likely', 'Overwhelming for beginners', 'May delay specialization']
  }
];

const AVAILABILITY_OPTIONS = [
  { id: 'weekday-evenings', name: 'Weekday Evenings', description: 'Monday-Friday after 6pm', conflicts: ['technical-theater'] },
  { id: 'weekends', name: 'Weekends', description: 'Saturday and Sunday', conflicts: [] },
  { id: 'flexible', name: 'Flexible Schedule', description: 'Available various times', conflicts: [] },
  { id: 'school-holidays', name: 'School Holidays Only', description: 'Limited availability', conflicts: ['all-pathways'] },
];

const WorkshopInterestSelector: React.FC<WorkshopInterestSelectorProps> = ({
  interests,
  onChange
}) => {
  const [mayaMessage, setMayaMessage] = useState<string>('');
  const [schedulingConflicts, setSchedulingConflicts] = useState<string[]>([]);
  const [showMayaGuidance, setShowMayaGuidance] = useState(false);

  useEffect(() => {
    if (interests.selectedPathway) {
      const pathway = PATHWAYS.find(p => p.id === interests.selectedPathway);
      if (pathway) {
        setMayaMessage(pathway.mayaAdvice);
        
        // Check for scheduling conflicts
        const conflicts = interests.availability.reduce((acc: string[], avail) => {
          const availOption = AVAILABILITY_OPTIONS.find(opt => opt.id === avail);
          if (availOption?.conflicts.includes(interests.selectedPathway) || 
              availOption?.conflicts.includes('all-pathways')) {
            acc.push(`${availOption.name} may not be compatible with ${pathway.name}`);
          }
          return acc;
        }, []);
        setSchedulingConflicts(conflicts);
      }
    }
  }, [interests.selectedPathway, interests.availability]);

  const handlePathwayChange = (pathwayId: string) => {
    const pathway = PATHWAYS.find(p => p.id === pathwayId);
    onChange({
      ...interests,
      selectedPathway: pathwayId,
      timeCommitment: pathway?.timeCommitment as any || 'moderate',
      programmes: pathwayId === 'community-programs' ? [] : [pathwayId]
    });
    setShowMayaGuidance(true);
  };

  const handleSkillLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    onChange({
      ...interests,
      skillLevel: level
    });
  };

  const handleAvailabilityChange = (availabilityId: string, checked: boolean) => {
    const newAvailability = checked 
      ? [...interests.availability, availabilityId]
      : interests.availability.filter(id => id !== availabilityId);
    
    onChange({
      ...interests,
      availability: newAvailability
    });
  };

  const selectedPathway = PATHWAYS.find(p => p.id === interests.selectedPathway);

  return (
    <div className="workshop-interest-selector">
      <h3 className="signup-section-title">Choose Your Learning Pathway</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Select a focused pathway that builds coherent skills for real employment opportunities. Maya will guide your choices.
      </p>

      {/* Maya Assistant Toggle */}
      <div className="maya-toggle-section">
        <button 
          type="button"
          onClick={() => setShowMayaGuidance(!showMayaGuidance)}
          className="maya-toggle-btn"
        >
          🤖 Maya Guidance {showMayaGuidance ? '(Hide)' : '(Show)'}
        </button>
      </div>

      {/* Pathway Selection */}
      <div className="pathway-selection">
        {PATHWAYS.map((pathway) => (
          <div key={pathway.id} className={`pathway-card ${interests.selectedPathway === pathway.id ? 'selected' : ''}`}>
            <label className="pathway-label">
              <input
                type="radio"
                name="selectedPathway"
                value={pathway.id}
                checked={interests.selectedPathway === pathway.id}
                onChange={() => handlePathwayChange(pathway.id)}
                className="pathway-radio"
              />
              <div className="pathway-content">
                <div className="pathway-header">
                  <h4 className="pathway-name">{pathway.name}</h4>
                  <span className={`time-commitment ${pathway.timeCommitment}`}>
                    {pathway.timeCommitment} commitment
                  </span>
                </div>
                <p className="pathway-description">{pathway.description}</p>
                
                <div className="pathway-details">
                  <div className="pathway-skills">
                    <strong>Skills: </strong>
                    {pathway.skills.join(', ')}
                  </div>
                  <div className="pathway-schedule">
                    <strong>Schedule: </strong>{pathway.schedule}
                  </div>
                  <div className="pathway-duration">
                    <strong>Duration: </strong>{pathway.duration}
                  </div>
                </div>

                {pathway.warningFlags.length > 0 && (
                  <div className="pathway-warnings">
                    <strong>⚠️ Consider:</strong>
                    <ul>
                      {pathway.warningFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Maya Guidance Section */}
      {showMayaGuidance && mayaMessage && (
        <div className="maya-guidance-section">
          <div className="maya-avatar">🤖</div>
          <div className="maya-message">
            <h4>Maya's Guidance</h4>
            <p>{mayaMessage}</p>
            
            {selectedPathway && (
              <div className="employment-outcomes">
                <strong>Employment opportunities:</strong>
                <ul>
                  {selectedPathway.employmentOutcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scheduling Conflicts Warning */}
      {schedulingConflicts.length > 0 && (
        <div className="scheduling-conflicts">
          <h4>⚠️ Scheduling Conflicts Detected</h4>
          <ul>
            {schedulingConflicts.map((conflict, idx) => (
              <li key={idx}>{conflict}</li>
            ))}
          </ul>
          <p>Maya recommends adjusting your availability or considering a different pathway.</p>
        </div>
      )}

      {/* Experience Level */}
      <div className="experience-section">
        <h4 className="section-subtitle">Experience Level</h4>
        <div className="skill-level-options">
          {[
            { value: 'beginner', label: 'Beginner', description: 'New to these skills' },
            { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
            { value: 'advanced', label: 'Advanced', description: 'Experienced practitioner' }
          ].map((level) => (
            <label key={level.value} className="skill-level-label">
              <input
                type="radio"
                name="skillLevel"
                value={level.value}
                className="skill-level-radio"
                checked={interests.skillLevel === level.value}
                onChange={() => handleSkillLevelChange(level.value as any)}
              />
              <div className="skill-level-content">
                <div className="skill-level-name">{level.label}</div>
                <div className="skill-level-description">{level.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="availability-section">
        <h4 className="section-subtitle">Your Availability</h4>
        <div className="availability-grid">
          {AVAILABILITY_OPTIONS.map((option) => (
            <div key={option.id} className="availability-card">
              <label className="availability-label">
                <input
                  type="checkbox"
                  className="availability-checkbox"
                  checked={interests.availability.includes(option.id)}
                  onChange={(e) => handleAvailabilityChange(option.id, e.target.checked)}
                />
                <div className="availability-content">
                  <div className="availability-name">{option.name}</div>
                  <div className="availability-description">{option.description}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="communication-section">
        <h4 className="section-subtitle">Stay Connected</h4>
        <div className="communication-options">
          <label className="communication-option">
            <input type="checkbox" defaultChecked />
            Email updates about your chosen pathway
          </label>
          <label className="communication-option">
            <input type="checkbox" defaultChecked />
            SMS reminders for workshops and deadlines
          </label>
          <label className="communication-option">
            <input type="checkbox" />
            WhatsApp community group for your pathway
          </label>
        </div>
      </div>
    </div>
  );
};

export default WorkshopInterestSelector;