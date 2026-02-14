/**
 * SKILLS & EMPLOYMENT PATHWAYS
 * 
 * Partnership page connecting our community to employment opportunities.
 * 
 * The Forgotten 60% face barriers to traditional employment:
 * - No formal qualifications
 * - Gaps in CV
 * - No network/connections
 * - Discrimination
 * - Location/transport barriers
 * 
 * We bridge the gap between creative skills and sustainable careers.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  type: 'employer' | 'training' | 'support' | 'apprenticeship';
  opportunities: string[];
  website?: string;
  localToWembley?: boolean;
}

interface Pathway {
  id: string;
  title: string;
  icon: string;
  description: string;
  stages: PathwayStage[];
  outcomes: string[];
  duration: string;
  wwProgrammes: string[];
}

interface PathwayStage {
  name: string;
  description: string;
  duration: string;
}

interface Opportunity {
  id: string;
  title: string;
  employer: string;
  type: 'job' | 'apprenticeship' | 'internship' | 'freelance';
  location: string;
  salary?: string;
  deadline?: string;
  wwRecommended?: boolean;
  requirements: string[];
}

// ============================================================
// DATA
// ============================================================

const PARTNERS: Partner[] = [
  {
    id: 'jobcentre-wembley',
    name: 'Jobcentre Plus Wembley',
    description: 'Local employment support and benefits advice',
    type: 'support',
    opportunities: ['Job search support', 'Benefits advice', 'Skills assessments', 'Work coaching'],
    localToWembley: true
  },
  {
    id: 'brent-start',
    name: 'Brent Start',
    description: 'Adult education and skills training in Brent',
    type: 'training',
    opportunities: ['Free courses', 'ESOL', 'Digital skills', 'Employability'],
    website: 'https://www.brentstart.ac.uk',
    localToWembley: true
  },
  {
    id: 'cnwl-college',
    name: 'College of North West London',
    description: 'Further education college with creative and tech courses',
    type: 'training',
    opportunities: ['Media production', 'IT & Computing', 'Business', 'Creative industries'],
    website: 'https://www.cnwl.ac.uk',
    localToWembley: true
  },
  {
    id: 'creative-access',
    name: 'Creative Access',
    description: 'Connecting underrepresented talent with creative industries',
    type: 'apprenticeship',
    opportunities: ['Paid internships', 'Apprenticeships', 'Mentoring', 'Industry connections'],
    website: 'https://creativeaccess.org.uk'
  },
  {
    id: 'founders-future',
    name: 'Founders of the Future',
    description: 'Supporting underrepresented entrepreneurs',
    type: 'support',
    opportunities: ['Startup support', 'Funding access', 'Mentoring', 'Networks'],
    website: 'https://foundersofthefuture.co'
  },
  {
    id: 'princes-trust',
    name: "The Prince's Trust",
    description: 'Supporting young people into work, education, and enterprise',
    type: 'support',
    opportunities: ['Enterprise programme', 'Get into work', 'Development awards', 'Mentoring'],
    website: 'https://www.princes-trust.org.uk'
  },
  {
    id: 'apprenticeships-gov',
    name: 'Find an Apprenticeship',
    description: 'Official government apprenticeship listings',
    type: 'apprenticeship',
    opportunities: ['Level 3-7 apprenticeships', 'All industries', 'Earn while learning'],
    website: 'https://www.findapprenticeship.service.gov.uk'
  },
  {
    id: 'black-young-profs',
    name: 'Black Young Professionals',
    description: 'Career development for Black professionals',
    type: 'support',
    opportunities: ['Networking', 'Career coaching', 'Job board', 'Events'],
    website: 'https://www.byp-network.com'
  }
];

const PATHWAYS: Pathway[] = [
  {
    id: 'content-creator',
    title: 'Content Creator Pathway',
    icon: '🎬',
    description: 'From bedroom creator to professional media producer',
    stages: [
      { name: 'Foundation', description: 'Learn production basics with G-Tech Casters', duration: '3 months' },
      { name: 'Portfolio', description: 'Build portfolio through WW projects', duration: '3 months' },
      { name: 'Freelance', description: 'Take first paid gigs via WW marketplace', duration: '6 months' },
      { name: 'Professional', description: 'Level 3 Content Creator Apprenticeship', duration: '18 months' }
    ],
    outcomes: ['Content Creator L3 qualification', 'Professional portfolio', 'Industry connections'],
    duration: '2-3 years',
    wwProgrammes: ['G-Tech Casters', 'Raydyo', 'Joystick']
  },
  {
    id: 'tech-support',
    title: 'Tech Support Pathway',
    icon: '💻',
    description: 'From fixing phones to IT professional',
    stages: [
      { name: 'Foundation', description: 'Device repair and troubleshooting with Scrap Cat', duration: '3 months' },
      { name: 'Certification', description: 'CompTIA A+ or equivalent', duration: '3 months' },
      { name: 'Experience', description: 'Volunteer tech support, repair cafes', duration: '6 months' },
      { name: 'Professional', description: 'IT Support Technician L3 Apprenticeship', duration: '18 months' }
    ],
    outcomes: ['IT Support Technician L3', 'Industry certifications', 'Practical experience'],
    duration: '2-3 years',
    wwProgrammes: ['Scrap Cat', 'STEMgeneers', 'TECHreneurs']
  },
  {
    id: 'creative-business',
    title: 'Creative Business Pathway',
    icon: '💼',
    description: 'From side hustle to sustainable business',
    stages: [
      { name: 'Foundation', description: 'Business basics with TECHreneurs', duration: '3 months' },
      { name: 'Launch', description: 'First products/services on WW marketplace', duration: '3 months' },
      { name: 'Growth', description: 'Scale with mentoring and community support', duration: '12 months' },
      { name: 'Formalise', description: 'Business Administrator L3 or self-employed', duration: '18 months' }
    ],
    outcomes: ['Viable business or Business Admin L3', 'Revenue generation', 'Professional network'],
    duration: '2-3 years',
    wwProgrammes: ['TECHreneurs', 'Money Reset', 'Any creative programme']
  },
  {
    id: 'creative-industries',
    title: 'Creative Industries Pathway',
    icon: '🎨',
    description: 'From passion to creative career',
    stages: [
      { name: 'Foundation', description: 'Creative skills via WW programmes', duration: '3 months' },
      { name: 'Portfolio', description: 'Professional portfolio development', duration: '6 months' },
      { name: 'Industry', description: 'Internships via Creative Access', duration: '3-6 months' },
      { name: 'Career', description: 'Entry-level creative role or freelance', duration: 'Ongoing' }
    ],
    outcomes: ['Industry-standard portfolio', 'Professional experience', 'Career in creative sector'],
    duration: '1-2 years',
    wwProgrammes: ["Kaywana's Court", 'Silk Stilettos', 'Trubble n Bass']
  }
];

const FEATURED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Junior Video Editor',
    employer: 'Local Media Company',
    type: 'apprenticeship',
    location: 'Wembley / Hybrid',
    salary: '£18,000 + training',
    requirements: ['Portfolio of work', 'Basic editing skills', 'Enthusiasm'],
    wwRecommended: true
  },
  {
    id: 'opp-2',
    title: 'IT Support Apprentice',
    employer: 'Brent Council',
    type: 'apprenticeship',
    location: 'Wembley',
    salary: '£20,000',
    requirements: ['Interest in IT', 'Problem-solving skills', 'Customer service'],
    wwRecommended: true
  },
  {
    id: 'opp-3',
    title: 'Social Media Content Creator',
    employer: 'Various (Freelance)',
    type: 'freelance',
    location: 'Remote',
    salary: '£15-30/hour',
    requirements: ['Portfolio', 'Platform knowledge', 'Creativity'],
    wwRecommended: true
  }
];

// ============================================================
// COMPONENT
// ============================================================

export const SkillsEmploymentPathways: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pathways' | 'partners' | 'opportunities'>('pathways');
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null);
  
  return (
    <div className="skills-employment">
      {/* Header */}
      <header className="skills-employment__header">
        <h1>Skills & Employment Pathways</h1>
        <p>
          From creative passion to sustainable career. We connect our community 
          with real opportunities, training, and support.
        </p>
      </header>
      
      {/* Stats */}
      <section className="skills-employment__stats">
        <div className="stat-card">
          <span className="stat-value">85%</span>
          <span className="stat-label">of our graduates find work or further training within 6 months</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">£0</span>
          <span className="stat-label">cost to access our programmes - skills shouldn't cost</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">12+</span>
          <span className="stat-label">partner organisations supporting your journey</span>
        </div>
      </section>
      
      {/* Navigation */}
      <nav className="skills-employment__nav">
        <button 
          className={activeTab === 'pathways' ? 'active' : ''}
          onClick={() => setActiveTab('pathways')}
        >
          🛤️ Career Pathways
        </button>
        <button 
          className={activeTab === 'partners' ? 'active' : ''}
          onClick={() => setActiveTab('partners')}
        >
          🤝 Our Partners
        </button>
        <button 
          className={activeTab === 'opportunities' ? 'active' : ''}
          onClick={() => setActiveTab('opportunities')}
        >
          💼 Opportunities
        </button>
      </nav>
      
      {/* Pathways Tab */}
      {activeTab === 'pathways' && (
        <section className="skills-employment__pathways">
          <h2>Career Pathways</h2>
          <p>
            Clear routes from where you are now to where you want to be. 
            Each pathway combines WW programmes with external qualifications and real experience.
          </p>
          
          <div className="pathways-grid">
            {PATHWAYS.map(pathway => (
              <div 
                key={pathway.id}
                className="pathway-card"
                onClick={() => setSelectedPathway(pathway)}
              >
                <span className="pathway-icon">{pathway.icon}</span>
                <h3>{pathway.title}</h3>
                <p>{pathway.description}</p>
                <div className="pathway-meta">
                  <span className="duration">⏱️ {pathway.duration}</span>
                  <span className="stages">{pathway.stages.length} stages</span>
                </div>
                <div className="pathway-outcomes">
                  {pathway.outcomes.slice(0, 2).map((outcome, i) => (
                    <span key={i} className="outcome">✓ {outcome}</span>
                  ))}
                </div>
                <button className="view-pathway">View Pathway →</button>
              </div>
            ))}
          </div>
          
          {/* Pathway Detail Modal */}
          {selectedPathway && (
            <div className="pathway-modal" onClick={() => setSelectedPathway(null)}>
              <div className="pathway-modal__content" onClick={e => e.stopPropagation()}>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedPathway(null)}
                >
                  ×
                </button>
                
                <div className="pathway-detail">
                  <span className="icon">{selectedPathway.icon}</span>
                  <h2>{selectedPathway.title}</h2>
                  <p className="description">{selectedPathway.description}</p>
                  
                  <div className="pathway-timeline">
                    <h3>Your Journey</h3>
                    {selectedPathway.stages.map((stage, i) => (
                      <div key={i} className="stage">
                        <div className="stage-marker">{i + 1}</div>
                        <div className="stage-content">
                          <h4>{stage.name}</h4>
                          <p>{stage.description}</p>
                          <span className="stage-duration">{stage.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pathway-outcomes-full">
                    <h3>What You'll Achieve</h3>
                    <ul>
                      {selectedPathway.outcomes.map((outcome, i) => (
                        <li key={i}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pathway-programmes">
                    <h3>WW Programmes</h3>
                    <div className="programme-tags">
                      {selectedPathway.wwProgrammes.map((prog, i) => (
                        <span key={i} className="programme-tag">{prog}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="start-pathway">
                    Start This Pathway →
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
      
      {/* Partners Tab */}
      {activeTab === 'partners' && (
        <section className="skills-employment__partners">
          <h2>Our Partners</h2>
          <p>
            We work with trusted organisations to provide comprehensive support. 
            These aren't just logos - they're active partnerships that benefit our community.
          </p>
          
          <div className="partner-filters">
            <span className="filter-label">Filter:</span>
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Training</button>
            <button className="filter-btn">Apprenticeships</button>
            <button className="filter-btn">Support</button>
            <button className="filter-btn">Local</button>
          </div>
          
          <div className="partners-grid">
            {PARTNERS.map(partner => (
              <div key={partner.id} className="partner-card">
                <div className="partner-header">
                  <h3>{partner.name}</h3>
                  {partner.localToWembley && (
                    <span className="badge badge--local">📍 Local</span>
                  )}
                </div>
                <p>{partner.description}</p>
                
                <div className="partner-opportunities">
                  <h4>What they offer:</h4>
                  <ul>
                    {partner.opportunities.map((opp, i) => (
                      <li key={i}>{opp}</li>
                    ))}
                  </ul>
                </div>
                
                {partner.website && (
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <section className="skills-employment__opportunities">
          <h2>Current Opportunities</h2>
          <p>
            Real opportunities for our community. WW-recommended means we've 
            vetted the employer and believe they'll treat you fairly.
          </p>
          
          <div className="opportunities-list">
            {FEATURED_OPPORTUNITIES.map(opp => (
              <div key={opp.id} className="opportunity-card">
                <div className="opportunity-header">
                  <div className="opportunity-info">
                    <h3>{opp.title}</h3>
                    <span className="employer">{opp.employer}</span>
                  </div>
                  {opp.wwRecommended && (
                    <span className="badge badge--recommended">✓ WW Recommended</span>
                  )}
                </div>
                
                <div className="opportunity-meta">
                  <span className="type">{opp.type}</span>
                  <span className="location">📍 {opp.location}</span>
                  {opp.salary && <span className="salary">💷 {opp.salary}</span>}
                </div>
                
                <div className="opportunity-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {opp.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <button className="apply-btn">Learn More →</button>
              </div>
            ))}
          </div>
          
          <div className="opportunities-note">
            <p>
              <strong>💡 Tip:</strong> Complete a WW programme to strengthen your application. 
              Our graduates get priority consideration from partner employers.
            </p>
          </div>
        </section>
      )}
      
      {/* Support Section */}
      <section className="skills-employment__support">
        <h2>How We Support You</h2>
        
        <div className="support-grid">
          <div className="support-card">
            <span className="icon">📝</span>
            <h3>CV & Applications</h3>
            <p>Help with CVs, cover letters, and applications. We know what employers want.</p>
          </div>
          
          <div className="support-card">
            <span className="icon">🎤</span>
            <h3>Interview Prep</h3>
            <p>Practice interviews, confidence building, and knowing your worth.</p>
          </div>
          
          <div className="support-card">
            <span className="icon">🤝</span>
            <h3>References</h3>
            <p>Completed a programme? We'll provide references that matter.</p>
          </div>
          
          <div className="support-card">
            <span className="icon">🔗</span>
            <h3>Connections</h3>
            <p>Warm introductions to employers who value what you bring.</p>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="skills-employment__cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Whether you're looking for your first opportunity or changing direction, 
          we're here to help.
        </p>
        <div className="cta-buttons">
          <button className="cta-primary">Join a Programme</button>
          <button className="cta-secondary">Book a Chat</button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="skills-employment__footer">
        <p>
          Wembley Wonders CIC — Building pathways, not barriers.
        </p>
        <p className="company-info">
          Company No. 12960817 | Flat 2, 452 High Road, Wembley HA9 7AY
        </p>
      </footer>
    </div>
  );
};

export default SkillsEmploymentPathways;