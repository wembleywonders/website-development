// src/pages/StrategicPartnershipsPage.tsx
//
// ─────────────────────────────────────────────────────────────────────────────
// PATCH NOTES (July 2026 — surgical corrections, funder-facing page):
//  1. REMOVED the impactStats strip entirely ("500+", "£14k+", "80%", "50+
//     Years"). Standing rule: public-facing numbers must be live-computed or
//     explicitly labelled illustrative — extra weight on funder-facing pages.
//     Reinstate only with verified figures (Judith editorial + CJ verification).
//  2. FIXED phone number: was placeholder 020 1234 5678; now 0208 902 9991.
//  3. EMAIL: partnerships@wembleywonders.org is NOT in the Cloudflare alias
//     architecture (catch-all is Drop — mail to it vanishes). Swapped to
//     admin@wembleywonders.org. If partnerships@ is wanted, create the alias
//     in Cloudflare FIRST, then swap back.
//  4. FORM DEFANGED: previous handleSubmit simulated an API call and wrote
//     inquiries to the VISITOR'S OWN localStorage — no inquiry ever reached
//     WW. Interim honest behaviour: submit composes a real email to admin@
//     in the visitor's mail client. Replace with a real backend endpoint
//     when built (candidate: Spring Boot inquiry endpoint + editorial
//     routing per WW email architecture).
//  5. HELD: currentPartners list ("UCL", "Brent Council", "Community Halls
//     Network", "Local Press Consortium") and the named "UCL Mental Health
//     Partnership" example — removed pending verification that these are
//     real, current partnerships with consent to be named publicly.
//     Governance question (CJ/Judith; Blake on naming consent if needed).
//  6. NEUTRALISED two false claims pending Judith replacement copy:
//     "50+ years in Wembley" (CIC incorporated 19 Oct 2020) and
//     "80% completion vs 30% industry average" (unverified comparative).
//
// TODO-JUDITH: all remaining marketing copy on this page needs editorial
// review as part of the platform-wide stats/claims sweep.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Users, GraduationCap, Megaphone, Heart,
  Target, TrendingUp, Award, Handshake, ArrowRight,
  CheckCircle, Mail, Phone, MapPin, Send, Calendar,
  Briefcase, Shield
} from 'lucide-react';
import './StrategicPartnershipsPage.css';

const PARTNERSHIP_EMAIL = 'admin@wembleywonders.org'; // see patch note 3

const StrategicPartnershipsPage: React.FC = () => {
  const [activePartnership, setActivePartnership] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const partnershipTypes = [
    {
      id: 'corporate',
      icon: <Building2 size={32} />,
      title: 'Corporate Partnership',
      tagline: 'CSR with measurable community impact',
      description: 'Partner with us to deliver meaningful corporate social responsibility that creates real change in Wembley.',
      benefits: [
        'Named programme sponsorship',
        'Employee volunteering opportunities',
        'Skills-based volunteering placements',
        'Branded community impact reports',
        'Staff training and development workshops'
      ],
      investment: 'From £5,000/year',
      examples: ['Equipment donations', 'Workshop hosting', 'Mentorship programmes']
    },
    {
      id: 'educational',
      icon: <GraduationCap size={32} />,
      title: 'Educational Partnership',
      tagline: 'Connect students with real-world experience',
      description: 'Universities, colleges, and training providers partnering to provide students with practical community experience.',
      benefits: [
        'Student placement programmes',
        'Research collaboration opportunities',
        'Guest lecture exchanges',
        'Joint qualification development',
        'Access to diverse community perspectives'
      ],
      investment: 'Varies by programme',
      // TODO-JUDITH: previously named "UCL Mental Health Partnership" —
      // held pending verification/consent (patch note 5).
      examples: ['Student placements', 'Media studies placements', 'Business degree projects']
    },
    {
      id: 'venue',
      icon: <MapPin size={32} />,
      title: 'Venue Partnership',
      tagline: 'Host community programmes in your space',
      description: 'Local venues and spaces partnering to host our workshops, events, and programmes.',
      benefits: [
        'Increased community footfall',
        'Positive local reputation',
        'Featured in our marketing',
        'Access to our network',
        'Event co-hosting opportunities'
      ],
      investment: 'In-kind space provision',
      examples: ['Community halls', 'Cafés', 'Libraries', 'Youth centres']
    },
    {
      id: 'media',
      icon: <Megaphone size={32} />,
      title: 'Media Partnership',
      tagline: 'Amplify community voices together',
      description: 'Media organizations partnering to support Raydyo radio and Joystick magazine.',
      benefits: [
        'Cross-platform content sharing',
        'Joint campaign opportunities',
        'Access to grassroots stories',
        'Community journalism collaboration',
        'Diverse voice amplification'
      ],
      investment: 'Content exchange + support',
      examples: ['Local press', 'Community radio', 'Online publications', 'Podcasts']
    },
    {
      id: 'funder',
      icon: <Heart size={32} />,
      title: 'Funder Partnership',
      tagline: 'Invest in sustainable community development',
      description: 'Trusts, foundations, and grant-makers supporting our mission for systemic community change.',
      benefits: [
        'Detailed impact reporting',
        'Site visits and engagement',
        'Named project funding',
        'Long-term strategic partnership',
        'Evidence-based outcomes'
      ],
      investment: 'Project or core funding',
      examples: ['Youth programmes', 'Digital inclusion', 'Heritage preservation', 'Economic empowerment']
    },
    {
      id: 'supplier',
      icon: <Briefcase size={32} />,
      title: 'Supplier Partnership',
      tagline: 'Support our operations with goods and services',
      description: 'Businesses providing products and services that help us deliver our programmes.',
      benefits: [
        'Community recognition',
        'Staff engagement opportunities',
        'Featured partner status',
        'Networking access',
        'Impact testimonials'
      ],
      investment: 'Discounted or donated goods/services',
      examples: ['Tech equipment', 'Catering', 'Printing', 'Software licenses']
    }
  ];

  // currentPartners list REMOVED — held pending verification (patch note 5).
  // impactStats strip REMOVED — unverified figures (patch note 1).

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Interim honest behaviour (patch note 4): compose a real email in the
    // visitor's mail client. No fake API, no localStorage dead-drop.
    const typeTitle =
      partnershipTypes.find(t => t.id === formData.partnershipType)?.title ||
      formData.partnershipType ||
      'Not specified';

    const subject = encodeURIComponent(
      `Partnership inquiry: ${formData.organizationName || 'New organisation'}`
    );
    const body = encodeURIComponent(
      `Organisation: ${formData.organizationName}\n` +
      `Contact name: ${formData.contactName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Partnership interest: ${typeTitle}\n\n` +
      `${formData.message}`
    );

    window.location.href = `mailto:${PARTNERSHIP_EMAIL}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <div className="partnerships-page">
      {/* Hero Section */}
      <section className="partnerships-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Handshake size={20} />
            <span>Strategic Partnerships</span>
          </div>
          <h1>Partner With Purpose</h1>
          <p>
            Join organizations investing in Wembley's future. Our partnerships
            create measurable community impact while delivering real value for
            your organization.
          </p>
          <div className="hero-cta">
            <a href="#partnership-types" className="btn-primary">
              Explore Partnership Options
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Impact stats strip removed (patch note 1). Reinstate only with
          live-computed or verified, Judith-approved figures. */}

      {/* Why Partner Section */}
      <section className="why-partner">
        <div className="section-content">
          <h2>Why Partner With Wembley Wonders?</h2>
          <div className="why-grid">
            <div className="why-card">
              <Target size={28} />
              <h3>Measurable Impact</h3>
              <p>
                Every partnership includes detailed impact reporting. Know exactly
                how your investment changes lives.
              </p>
            </div>
            <div className="why-card">
              <Users size={28} />
              <h3>Community Roots</h3>
              {/* TODO-JUDITH: was "50+ years in Wembley" — false (CIC
                  incorporated 19 Oct 2020). Interim copy reflects the
                  founders' organising history without attributing it to
                  the company. */}
              <p>
                Built by organisers with decades of community work in Brent.
                Your partnership benefits from authentic local connection.
              </p>
            </div>
            <div className="why-card">
              <Shield size={28} />
              <h3>CIC Structure</h3>
              <p>
                As a Community Interest Company, profits are reinvested in the
                community. Your support has lasting impact.
              </p>
            </div>
            <div className="why-card">
              <TrendingUp size={28} />
              <h3>Outcomes, Not Outputs</h3>
              {/* TODO-JUDITH: was "80% completion vs 30% industry average" —
                  unverified comparative removed. */}
              <p>
                We design programmes around completion and progression, and we
                report honestly on both.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="partnership-types">
        <div className="section-content">
          <h2>Partnership Opportunities</h2>
          <p className="section-intro">
            Every organization is different. We tailor partnerships to align with
            your goals while maximizing community benefit.
          </p>

          <div className="types-grid">
            {partnershipTypes.map(type => (
              <div
                key={type.id}
                className={`type-card ${activePartnership === type.id ? 'expanded' : ''}`}
                onClick={() => setActivePartnership(activePartnership === type.id ? null : type.id)}
              >
                <div className="type-header">
                  <div className="type-icon">{type.icon}</div>
                  <div className="type-title">
                    <h3>{type.title}</h3>
                    <p className="type-tagline">{type.tagline}</p>
                  </div>
                </div>

                <div className="type-body">
                  <p className="type-description">{type.description}</p>

                  <div className="type-benefits">
                    <h4>What You Get</h4>
                    <ul>
                      {type.benefits.map((benefit, i) => (
                        <li key={i}>
                          <CheckCircle size={16} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="type-meta">
                    <div className="type-investment">
                      <strong>Investment:</strong> {type.investment}
                    </div>
                    <div className="type-examples">
                      <strong>Examples:</strong> {type.examples.join(' • ')}
                    </div>
                  </div>

                  <a href="#contact" className="type-cta">
                    Discuss This Partnership
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Organizations We Work With" section removed — held pending
          verification of named partners and consent to name them publicly
          (patch note 5). Reinstate with a verified list only. */}

      {/* Partnership Process */}
      <section className="partnership-process">
        <div className="section-content">
          <h2>How We Partner</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Initial Conversation</h4>
              <p>Tell us about your organization and goals. We'll explore alignment and possibilities.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Proposal Development</h4>
              <p>We create a tailored partnership proposal with clear deliverables and impact measures.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Agreement & Launch</h4>
              <p>Finalize terms, sign partnership agreement, and launch with internal and external communications.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Delivery & Reporting</h4>
              <p>Regular check-ins, quarterly impact reports, and annual partnership review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="contact-section">
        <div className="section-content">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Talk Partnership</h2>
              <p>
                Ready to explore how we can work together? We would love to
                hear from you.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <Mail size={20} />
                  <div>
                    <strong>Email</strong>
                    <span>{PARTNERSHIP_EMAIL}</span>
                  </div>
                </div>
                <div className="contact-method">
                  <Phone size={20} />
                  <div>
                    <strong>Phone</strong>
                    <span>0208 902 9991</span>
                  </div>
                </div>
                <div className="contact-method">
                  <MapPin size={20} />
                  <div>
                    <strong>Location</strong>
                    <span>Wembley, London</span>
                  </div>
                </div>
                <div className="contact-method">
                  <Calendar size={20} />
                  <div>
                    <strong>Response Time</strong>
                    <span>We aim to respond within a few working days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="form-success">
                  <CheckCircle size={48} />
                  <h3>Almost There</h3>
                  <p>
                    Your email app should have opened with your inquiry ready
                    to send — press send there to reach us. If nothing opened,
                    email us directly at {PARTNERSHIP_EMAIL}.
                  </p>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        organizationName: '',
                        contactName: '',
                        email: '',
                        phone: '',
                        partnershipType: '',
                        message: '',
                      });
                    }}
                  >
                    Start Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="organizationName">Organization Name *</label>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
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
                      <label htmlFor="partnershipType">Partnership Interest *</label>
                      <select
                        id="partnershipType"
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select type</option>
                        {partnershipTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.title}</option>
                        ))}
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Tell us about your interest *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="What are your partnership goals? How do you envision working together?"
                      required
                    />
                  </div>

                  <p className="form-note">
                    Submitting opens your email app with this inquiry addressed
                    to {PARTNERSHIP_EMAIL}.
                  </p>

                  <button
                    type="submit"
                    className="btn-submit"
                  >
                    <Send size={18} />
                    Send Partnership Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Not Ready for Partnership?</h2>
          <p>There are other ways to support our work</p>
          <div className="cta-links">
            <Link to="/sponsorship" className="cta-link">
              <Award size={20} />
              Event Sponsorship
            </Link>
            <Link to="/volunteer-application" className="cta-link">
              <Users size={20} />
              Volunteer With Us
            </Link>
            <Link to="/hire-graduates" className="cta-link">
              <GraduationCap size={20} />
              Hire Our Graduates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrategicPartnershipsPage;