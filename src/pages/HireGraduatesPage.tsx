// src/pages/HireGraduatesPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, Users, Star, CheckCircle, 
  ArrowRight, Send, Building2, Clock, Award, Target,
  Code, Mic, BookOpen, Music, Heart, Package,
  Mail, Phone, Calendar, Sparkles, TrendingUp
} from 'lucide-react';
import './HireGraduatesPage.css';

const HireGraduatesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    roleType: '',
    programmesInterested: [] as string[],
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const programmes = [
    { id: 'stemgeneers', name: 'STEMgeneers', icon: <Code size={20} />, skills: ['Coding', 'Data Analysis', 'Tech Support', 'Problem Solving'] },
    { id: 'techreneurs', name: 'TECHreneurs', icon: <TrendingUp size={20} />, skills: ['Business Development', 'E-commerce', 'Marketing', 'Sales'] },
    { id: 'pageturners', name: 'Pageturners', icon: <BookOpen size={20} />, skills: ['Content Writing', 'Editing', 'Research', 'Documentation'] },
    { id: 'gtechcasters', name: 'G-Tech Casters', icon: <Mic size={20} />, skills: ['Audio Production', 'Presenting', 'Interviewing', 'Podcasting'] },
    { id: 'trubble-n-bass', name: 'Trubble n Bass', icon: <Music size={20} />, skills: ['Music Production', 'Sound Design', 'Audio Engineering', 'Creative Direction'] },
    { id: 'silk-stilettos', name: 'Silk Stilettos', icon: <Heart size={20} />, skills: ['Design', 'Branding', 'Social Media', 'Project Management'] },
    { id: 'kaywanas-court', name: "Kaywana's Court", icon: <Star size={20} />, skills: ['Performance', 'Event Coordination', 'Community Engagement', 'Cultural Programming'] },
    { id: 'auntie-anansis-kitchen', name: "Auntie Anansi's Kitchen", icon: <Package size={20} />, skills: ['Food Production', 'Recipe Development', 'Cultural Heritage', 'Content Creation'] },
  ];

  const benefits = [
    {
      icon: <Award size={28} />,
      title: 'Job-Ready Talent',
      description: 'Our graduates complete 20-week intensive programmes with real project portfolios.'
    },
    {
      icon: <Target size={28} />,
      title: 'Verified Skills',
      description: 'Every graduate has demonstrated competency through practical assessments, not just theory.'
    },
    {
      icon: <Users size={28} />,
      title: 'Diverse Perspectives',
      description: 'Access talent from underrepresented communities bringing fresh ideas and approaches.'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Community Values',
      description: 'Graduates understand collaboration, accountability, and contributing to something bigger.'
    }
  ];

  const stats = [
    { number: '85%', label: 'Employment rate within 6 months' },
    { number: '80%', label: 'Programme completion rate' },
    { number: '20', label: 'Weeks of intensive training' },
    { number: '100+', label: 'Hours of project work' },
  ];

  const testimonials = [
    {
      quote: "The candidates from Wembley Wonders came with portfolios that proved their skills. No guesswork needed.",
      author: "HR Manager, Tech Startup",
      role: "Hired 2 STEMgeneers graduates"
    },
    {
      quote: "What impressed us most was their professionalism and eagerness to learn. They hit the ground running.",
      author: "Creative Director, Media Agency",
      role: "Hired G-Tech Casters graduate"
    },
    {
      quote: "We've built an ongoing relationship - their graduates understand real-world creative production.",
      author: "Producer, Community Radio",
      role: "Multiple hires over 2 years"
    }
  ];

  const roleTypes = [
    'Full-time permanent',
    'Part-time permanent',
    'Fixed-term contract',
    'Apprenticeship',
    'Paid internship',
    'Freelance/Project-based'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProgrammeToggle = (programmeId: string) => {
    setFormData(prev => ({
      ...prev,
      programmesInterested: prev.programmesInterested.includes(programmeId)
        ? prev.programmesInterested.filter(p => p !== programmeId)
        : [...prev.programmesInterested, programmeId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const inquiries = JSON.parse(localStorage.getItem('ww_hire_inquiries') || '[]');
    inquiries.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('ww_hire_inquiries', JSON.stringify(inquiries));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="hire-page">
      {/* Hero Section */}
      <section className="hire-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <GraduationCap size={20} />
            <span>Hire Our Graduates</span>
          </div>
          <h1>Talent With Proven Skills</h1>
          <p>
            Access job-ready graduates from our intensive 20-week programmes. 
            Every candidate comes with a portfolio of real work and verified competencies.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Post an Opportunity
              <ArrowRight size={18} />
            </a>
            <a href="#programmes" className="btn-secondary">
              View Graduate Skills
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-content">
          <h2>Why Hire Wembley Wonders Graduates?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes & Skills */}
      <section id="programmes" className="programmes-section">
        <div className="section-content">
          <h2>Graduate Skills by Programme</h2>
          <p className="section-intro">
            Each programme develops specific professional skills through hands-on projects.
          </p>
          
          <div className="programmes-grid">
            {programmes.map(programme => (
              <div key={programme.id} className="programme-card">
                <div className="programme-header">
                  <span className="programme-icon">{programme.icon}</span>
                  <h3>{programme.name}</h3>
                </div>
                <div className="skills-list">
                  {programme.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <Link to={`/programmes/${programme.id}`} className="programme-link">
                  Learn about programme →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="section-content">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">
                <Briefcase size={24} />
              </div>
              <div className="step-content">
                <h4>1. Share Your Needs</h4>
                <p>Tell us about the role, skills required, and your organization. We'll match you with suitable graduates.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <Users size={24} />
              </div>
              <div className="step-content">
                <h4>2. Review Candidates</h4>
                <p>We send you profiles with portfolios showcasing real project work. Review their demonstrated skills.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <Calendar size={24} />
              </div>
              <div className="step-content">
                <h4>3. Interview & Hire</h4>
                <p>Conduct your standard interview process. We can provide context on their training and capabilities.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-icon">
                <CheckCircle size={24} />
              </div>
              <div className="step-content">
                <h4>4. Ongoing Support</h4>
                <p>We stay in touch to support successful transitions. Feedback helps us improve our programmes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-content">
          <h2>What Employers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">"{testimonial.quote}"</div>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="contact-section">
        <div className="section-content">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Ready to Hire?</h2>
              <p>
                Tell us about your hiring needs and we'll connect you with 
                qualified graduates from our programmes.
              </p>
              
              <div className="contact-features">
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>No recruitment fees</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Pre-screened candidates</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Portfolio-verified skills</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Ongoing support available</span>
                </div>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <Mail size={18} />
                  <span>careers@wembleywonders.org</span>
                </div>
                <div className="contact-method">
                  <Phone size={18} />
                  <span>020 1234 5678</span>
                </div>
                <div className="contact-method">
                  <Clock size={18} />
                  <span>Response within 48 hours</span>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>Request Received!</h3>
                  <p>
                    We'll review your requirements and get back to you within 
                    48 hours with candidate profiles that match your needs.
                  </p>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        companyName: '',
                        contactName: '',
                        email: '',
                        phone: '',
                        roleType: '',
                        programmesInterested: [],
                        description: '',
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3>Request Graduate Profiles</h3>
                  
                  <div className="form-group">
                    <label htmlFor="companyName">Company/Organization Name *</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactName">Your Name *</label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="roleType">Role Type *</label>
                      <select
                        id="roleType"
                        name="roleType"
                        value={formData.roleType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select type</option>
                        {roleTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Programmes of Interest</label>
                    <p className="form-hint">Select which graduate skills you're looking for</p>
                    <div className="programmes-select">
                      {programmes.map(programme => (
                        <label 
                          key={programme.id} 
                          className={`programme-checkbox ${formData.programmesInterested.includes(programme.id) ? 'selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.programmesInterested.includes(programme.id)}
                            onChange={() => handleProgrammeToggle(programme.id)}
                          />
                          <span className="programme-icon-small">{programme.icon}</span>
                          <span>{programme.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Tell us about the role *</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Describe the role, required skills, and any other relevant details..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Request Graduate Profiles
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Options */}
      <section className="other-options">
        <div className="section-content">
          <h2>Other Ways to Work With Us</h2>
          <div className="options-grid">
            <Link to="/strategic-partnerships" className="option-card">
              <Building2 size={24} />
              <h4>Corporate Partnership</h4>
              <p>Strategic partnerships for ongoing collaboration</p>
            </Link>
            <Link to="/corporate-training" className="option-card">
              <Users size={24} />
              <h4>Corporate Training</h4>
              <p>Upskill your existing team with our workshops</p>
            </Link>
            <Link to="/volunteer-application" className="option-card">
              <Star size={24} />
              <h4>Mentor Our Students</h4>
              <p>Share your expertise as a volunteer mentor</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HireGraduatesPage;