import React, { useState } from 'react';
import { VOLUNTEER_ROLES } from '../../../data/volunteers/volunteerRoles';
import './ProgramVolunteerCTA.css';

interface ProgramVolunteerCTAProps {
  programId: string;
  programName: string;
  skillsNeeded: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

const ProgramVolunteerCTA: React.FC<ProgramVolunteerCTAProps> = ({
  programId,
  programName,
  skillsNeeded,
  experienceLevel
}) => {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    availability: ''
  });

  // Find relevant volunteer roles for this program
  const relevantRoles = VOLUNTEER_ROLES.filter((role: { skillsRequired: string[]; }) => 
    skillsNeeded.some(skill => 
      role.skillsRequired.some((required: string) => 
        required.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(required.toLowerCase())
      )
    )
  );

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quick volunteer application:', { programId, ...formData });
    alert('Thank you! Our Community Engagement Director will contact you within 48 hours.');
    setShowQuickForm(false);
    setFormData({ name: '', email: '', experience: '', availability: '' });
  };

  if (relevantRoles.length === 0) {
    return null; // No relevant volunteer opportunities for this program
  }

  return (
    <div className="program-volunteer-cta">
      <div className="volunteer-cta-header">
        <div className="volunteer-icon">🤝</div>
        <div className="volunteer-message">
          <h3>Share Your {programName} Expertise</h3>
          <p>
            Help others develop these skills while strengthening our community. 
            Your experience creates opportunities for the next generation.
          </p>
        </div>
      </div>

      <div className="volunteer-opportunities">
        <h4>How You Can Help:</h4>
        <div className="opportunities-list">
          {relevantRoles.slice(0, 2).map((role: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; timeCommitment: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; skillsRequired: any[]; }) => (
            <div key={role.id} className="opportunity-item">
              <div className="opportunity-header">
                <h5>{role.title}</h5>
                <span className="time-commitment">{role.timeCommitment}</span>
              </div>
              <p className="opportunity-description">{role.description}</p>
              <div className="opportunity-requirements">
                <strong>Looking for:</strong> {role.skillsRequired.slice(0, 2).join(', ')}
                {role.skillsRequired.length > 2 && ` + ${role.skillsRequired.length - 2} more`}
              </div>
            </div>
          ))}
          
          {relevantRoles.length > 2 && (
            <div className="more-opportunities">
              + {relevantRoles.length - 2} more volunteer opportunities for this program
            </div>
          )}
        </div>
      </div>

      <div className="volunteer-actions">
        <button 
          className="quick-apply-btn"
          onClick={() => setShowQuickForm(true)}
        >
          Express Interest
        </button>
        <a 
          href="/volunteers" 
          className="learn-more-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Volunteer Roles
        </a>
      </div>

      {showQuickForm && (
        <div className="quick-form-overlay">
          <div className="quick-form-modal">
            <div className="modal-header">
              <h3>Volunteer for {programName}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowQuickForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleQuickFormSubmit} className="quick-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Your {programName} Experience *</label>
                <textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                  placeholder={`Tell us about your experience with ${skillsNeeded.join(', ')}...`}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">When Are You Available? *</label>
                <textarea
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({...prev, availability: e.target.value}))}
                  placeholder="Weekday evenings, weekends, flexible schedule..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowQuickForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="volunteer-benefits">
        <div className="benefit-item">
          <strong>Professional Development:</strong> Keep skills current while teaching others
        </div>
        <div className="benefit-item">
          <strong>Community Impact:</strong> Help address the backstage skills shortage
        </div>
        <div className="benefit-item">
          <strong>Networking:</strong> Connect with local venue professionals and other experts
        </div>
      </div>
    </div>
  );
};

export default ProgramVolunteerCTA;