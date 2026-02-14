import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, Users, BookOpen, Calendar, Code, MessageSquare, 
  Calculator, CheckCircle, ArrowRight, Phone, Mail, Award, Clock, Archive
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import MediaSection from '../components/media/MediaSection';
import { useMayaStore } from '../stores/mayaStore';
import './WorkWithUsPage.css';

const WorkWithUsPage = () => {
  const { updateUserContext } = useMayaStore();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [projectScope, setProjectScope] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contactData, setContactData] = useState({
    organization: '',
    contact: '',
    email: '',
    phone: '',
    requirements: ''
  });

  useEffect(() => {
    // Remove contextualInfo as it's not part of the expected type
    updateUserContext({
      currentPage: 'work-with-us'
    });
  }, [updateUserContext]);

  // Professional service packages with realistic market rates
  const services = [
    {
      id: 'consulting',
      title: 'Community Development Consulting',
      tagline: 'Strategic guidance for community-centered programs',
      hourlyRate: 75,
      dayRate: 500,
      description: 'Expert consultation on community engagement strategies, program development, and organizational capacity building.',
      deliverables: [
        'Comprehensive community needs assessment',
        'Strategic program development roadmap',
        'Stakeholder engagement framework',
        'Sustainability and funding strategy',
        'Implementation timeline and milestones'
      ],
      typical: {
        duration: '4-12 weeks',
        investment: '£5,000 - £15,000',
        outcomes: '40% improvement in community engagement metrics'
      },
      suitableFor: ['Local authorities', 'Community organizations', 'Educational institutions', 'Housing associations']
    },
    {
      id: 'workshops',
      title: 'Workshop Facilitation & Training',
      tagline: 'Hands-on learning experiences that drive engagement',
      hourlyRate: 85,
      dayRate: 600,
      description: 'Interactive workshops on digital literacy, creative development, community building, and youth engagement.',
      deliverables: [
        'Customized workshop curriculum',
        'Professional facilitation (1-5 days)',
        'Participant resource packages',
        'Follow-up action planning session',
        'Impact evaluation and reporting'
      ],
      typical: {
        duration: '1-5 days delivery + planning',
        investment: '£2,000 - £8,000',
        outcomes: '85% participant satisfaction, measurable skill development'
      },
      suitableFor: ['Corporate teams', 'Educational institutions', 'Community groups', 'Public sector organizations']
    },
    {
      id: 'curriculum',
      title: 'Curriculum Development',
      tagline: 'Evidence-based learning programs that deliver results',
      hourlyRate: 70,
      dayRate: 480,
      description: 'Design and development of comprehensive learning curricula for community education, digital skills, and creative programs.',
      deliverables: [
        'Complete curriculum framework',
        'Session plans and learning materials',
        'Assessment and evaluation tools',
        'Facilitator training guides',
        'Digital resource library'
      ],
      typical: {
        duration: '8-16 weeks',
        investment: '£8,000 - £25,000',
        outcomes: 'Proven learning outcomes, scalable delivery model'
      },
      suitableFor: ['Training providers', 'Educational institutions', 'Community colleges', 'Corporate learning teams']
    },
    {
      id: 'events',
      title: 'Community Event Design & Management',
      tagline: 'Memorable experiences that build lasting connections',
      hourlyRate: 65,
      dayRate: 450,
      description: 'End-to-end event planning and execution specializing in community showcase events, networking formats, and inclusive gatherings.',
      deliverables: [
        'Event concept and format design',
        'Venue sourcing and logistics management',
        'Marketing and promotional strategy',
        'On-site coordination and facilitation',
        'Post-event evaluation and follow-up'
      ],
      typical: {
        duration: '6-12 weeks planning + event delivery',
        investment: '£3,000 - £12,000',
        outcomes: '90% attendee satisfaction, strong community connections'
      },
      suitableFor: ['Community organizations', 'Local authorities', 'Corporate events', 'Festival organizers']
    }
  ];

  // Project scoping calculator
  const calculateEstimate = () => {
    if (!selectedService || !projectScope || !timeline) return null;
    
    const service = services.find(s => s.id === selectedService);
    if (!service) return null;
    
    const baseRate = service.dayRate;
    
    let daysRequired = 0;
    switch (projectScope) {
      case 'small': 
        daysRequired = 5; 
        break;
      case 'medium': 
        daysRequired = 15; 
        break;
      case 'large': 
        daysRequired = 30; 
        break;
      case 'enterprise': 
        daysRequired = 60; 
        break;
      default: 
        daysRequired = 10;
    }
    
    let timelineMultiplier = 1;
    switch (timeline) {
      case 'urgent': 
        timelineMultiplier = 1.3; 
        break;
      case 'standard': 
        timelineMultiplier = 1; 
        break;
      case 'flexible': 
        timelineMultiplier = 0.9; 
        break;
      default: 
        timelineMultiplier = 1;
    }
    
    const estimate = Math.round(baseRate * daysRequired * timelineMultiplier);
    return { estimate, days: daysRequired, service: service.title };
  };

  const estimate = calculateEstimate();

  const handleInquiry = () => {
    console.log('Lead captured:', { ...contactData, selectedService, estimate });
    alert('Thank you! We will contact you within 24 hours to discuss your requirements.');
  };

  type Service = {
    id: string;
    title: string;
    tagline: string;
    hourlyRate: number;
    dayRate: number;
    description: string;
    deliverables: string[];
    typical: {
      duration: string;
      investment: string;
      outcomes: string;
    };
    suitableFor: string[];
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <div className="service-card">
      <div className="service-header">
        <h3>{service.title}</h3>
        <p className="service-tagline">{service.tagline}</p>
      </div>
      
      <div className="service-rates">
        <div className="rate-item">
          <span className="rate-label">Hourly</span>
          <span className="rate-value">£{service.hourlyRate}</span>
        </div>
        <div className="rate-item">
          <span className="rate-label">Daily</span>
          <span className="rate-value">£{service.dayRate}</span>
        </div>
      </div>
      
      <p className="service-description">{service.description}</p>
      
      <div className="service-deliverables">
        <h4>What's Included:</h4>
        <ul>
          {service.deliverables.map((item, index) => (
            <li key={index}>
              <CheckCircle size={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="service-typical">
        <h4>Typical Project:</h4>
        <div className="typical-grid">
          <div className="typical-item">
            <strong>Duration:</strong> {service.typical.duration}
          </div>
          <div className="typical-item">
            <strong>Investment:</strong> {service.typical.investment}
          </div>
          <div className="typical-item">
            <strong>Outcomes:</strong> {service.typical.outcomes}
          </div>
        </div>
      </div>
      
      <div className="suitable-for">
        <h4>Ideal For:</h4>
        <div className="suitable-tags">
          {service.suitableFor.map((org, index) => (
            <span key={index} className="suitable-tag">{org}</span>
          ))}
        </div>
      </div>
      
      <button 
        className="select-service-btn"
        onClick={() => setSelectedService(service.id)}
      >
        Get Quote for {service.title}
        <ArrowRight size={16} />
      </button>
    </div>
  );

  const pageContent = (
    <div className="work-with-us-content">
      {/* Page Header */}
      <div className="work-with-us-header">
        <h1>Work With Us</h1>
        <p className="header-subtitle">
          Professional consulting services that bridge community needs with organizational goals. 
          Every project supports our community programs while delivering measurable results for your organization.
        </p>
        
        <div className="header-stats">
          <div className="stat">
            <strong>95%</strong>
            <span>Client satisfaction</span>
          </div>
          <div className="stat">
            <strong>£250K+</strong>
            <span>Community impact generated</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Organizations served</span>
          </div>
        </div>
      </div>

      {/* Dual Purpose Banner */}
      <div className="dual-purpose-banner">
        <div className="banner-content">
          <h2>Professional Services • Community Impact</h2>
          <p>
            G-Tech Community Platform Ltd delivers market-leading consulting services while 
            Wembley Wonders CIC creates lasting community change. Your investment drives both 
            organizational success and social impact.
          </p>
        </div>
      </div>

      {/* Client Success Stories MediaSection */}
      <MediaSection
        allowedRoles={['staff', 'volunteer']}
        contentType="client-success-stories"
        layout="carousel"
        autoArchive={true}
        title="Client Success Stories"
        maxItems={8}
      />

      {/* Professional Services */}
      <div className="services-section">
        <h2>Our Professional Services</h2>
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Project Work in Action MediaSection */}
      <MediaSection
        allowedRoles={['staff', 'volunteer', 'client']}
        contentType="consulting-work-progress"
        layout="grid"
        autoArchive={true}
        title="Consulting Work in Progress"
        maxItems={12}
      />

      {/* Project Calculator */}
      <div className="calculator-section">
        <div className="scope-calculator">
          <h3>Project Scope Calculator</h3>
          <p>Get an instant estimate for your requirements</p>
          
          <div className="calculator-form">
            <div className="form-group">
              <label>Service Type:</label>
              <select 
                value={selectedService || ''} 
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select a service...</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Project Scope:</label>
              <select value={projectScope} onChange={(e) => setProjectScope(e.target.value)}>
                <option value="">Select scope...</option>
                <option value="small">Small (1-2 weeks, single deliverable)</option>
                <option value="medium">Medium (3-6 weeks, multiple deliverables)</option>
                <option value="large">Large (2-3 months, comprehensive project)</option>
                <option value="enterprise">Enterprise (3+ months, organizational transformation)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Timeline:</label>
              <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                <option value="">Select timeline...</option>
                <option value="urgent">Urgent (within 4 weeks) +30%</option>
                <option value="standard">Standard (6-8 weeks)</option>
                <option value="flexible">Flexible (3+ months) -10%</option>
              </select>
            </div>
            
            {estimate && (
              <div className="estimate-result">
                <div className="estimate-value">
                  Estimated Investment: £{estimate.estimate.toLocaleString()}
                </div>
                <div className="estimate-details">
                  {estimate.service} • {estimate.days} days • {timeline} timeline
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="inquiry-section">
        <h2>Start Your Project</h2>
        <div className="inquiry-container">
          <div className="inquiry-form">
            <div className="input-row">
              <div className="input-group">
                <label>Organization Name</label>
                <input 
                  type="text" 
                  value={contactData.organization}
                  onChange={(e) => setContactData({...contactData, organization: e.target.value})}
                  placeholder="Your organization"
                />
              </div>
              <div className="input-group">
                <label>Contact Person</label>
                <input 
                  type="text" 
                  value={contactData.contact}
                  onChange={(e) => setContactData({...contactData, contact: e.target.value})}
                  placeholder="Your name"
                />
              </div>
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  placeholder="your.email@organization.com"
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input 
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                  placeholder="+44 20 XXXX XXXX"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>Project Requirements</label>
              <textarea 
                rows={5}
                placeholder="Describe your objectives, target audience, timeline, and any specific requirements..."
                value={contactData.requirements}
                onChange={(e) => setContactData({...contactData, requirements: e.target.value})}
              />
            </div>
            
            {estimate && (
              <div className="estimate-display">
                <h4>Your Estimated Project:</h4>
                <p>£{estimate.estimate.toLocaleString()} for {estimate.service}</p>
              </div>
            )}
            
            <button onClick={handleInquiry} className="submit-btn">
              Request Detailed Proposal
              <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="contact-info">
            <h3>Prefer to Talk?</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <Phone size={20} />
                <span>020 8902 9991</span>
              </div>
              <div className="contact-method">
                <Mail size={20} />
                <span>consulting@g-tech.community</span>
              </div>
            </div>
            
            <div className="response-time">
              <CheckCircle size={16} />
              <span>We respond within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Impact Documentation MediaSection */}
      <MediaSection
        allowedRoles={['staff', 'volunteer']}
        contentType="community-impact-reports"
        layout="masonry"
        autoArchive={true}
        title="Community Impact in Action"
        maxItems={10}
      />

      {/* Community Impact Flow */}
      <div className="community-impact">
        <h2>Your Investment Creates Community Impact</h2>
        <div className="impact-flow">
          <div className="impact-step">
            <div className="step-number">1</div>
            <h3>Professional Services</h3>
            <p>Market-rate consulting delivers exceptional results for your organization</p>
          </div>
          <ArrowRight className="flow-arrow" size={24} />
          <div className="impact-step">
            <div className="step-number">2</div>
            <h3>Community Reinvestment</h3>
            <p>60% of profits fund community programs and digital inclusion initiatives</p>
          </div>
          <ArrowRight className="flow-arrow" size={24} />
          <div className="impact-step">
            <div className="step-number">3</div>
            <h3>Lasting Change</h3>
            <p>Young people gain digital skills, creative confidence, and career opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageTemplate 
      pageTitle="Work With Us"
      pageStrapline="Professional consulting services that create community impact"
      pageType="community"
    >
      {pageContent}
      <DraggableMaya 
        membershipTier="visitor"
      />
    </PageTemplate>
  );
};

export default WorkWithUsPage;