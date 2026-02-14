import React, { useState } from 'react';
import { 
  Mic, PoundSterling, Users, Clock, CheckCircle, 
  GraduationCap, Heart, Briefcase, ArrowRight, 
  BookOpen, Calendar, Award, MapPin, Phone, Mail,
  ChevronDown, ChevronUp, FileText, MessageCircle,
  Home, Building, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CommunityArchivistPage.css';

// ========================================
// TYPES
// ========================================

interface FAQItem {
  question: string;
  answer: string;
}

interface IdealCandidate {
  icon: React.ReactNode;
  title: string;
  description: string;
  why: string;
}

// ========================================
// DATA
// ========================================

const idealCandidates: IdealCandidate[] = [
  {
    icon: <GraduationCap size={28} />,
    title: 'Students',
    description: 'Sociology, anthropology, history, journalism, social work students looking for ethical income that builds real skills.',
    why: 'Flexible hours around lectures. Real fieldwork experience. Portfolio material. £15/interview adds up.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Care Workers',
    description: 'Staff in residential care, home care, or day centres with access to elders whose stories deserve preservation.',
    why: 'You already have trusted relationships. You see stories being lost. This gives those stories permanence.',
  },
  {
    icon: <Users size={28} />,
    title: 'Community Connectors',
    description: 'People with deep roots in their community - extended family networks, church connections, cultural associations.',
    why: 'People trust you. You know who has stories. You can reach people we can\'t.',
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Freelancers & Side-Hustlers',
    description: 'Anyone looking for meaningful, flexible income that makes a real difference to your community.',
    why: 'Work when you want. No minimum hours. Stack interviews around your main work.',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'How much can I earn?',
    answer: 'You earn £15 per approved interview. Active Community Archivists typically conduct 4-8 interviews per month (£60-£120). Top performers with strong community networks can do more. Payment is monthly, via bank transfer.',
  },
  {
    question: 'What training is required?',
    answer: 'You must complete our 2-hour Oral History Basics module (free, online or in-person) and be a paid-up Wembley Wonders member. The training covers ethics, consent, interview techniques, and technical recording.',
  },
  {
    question: 'Do I need special equipment?',
    answer: 'No! You use your smartphone to record. We provide the interview guides, consent forms, and submission portal. You just need a phone with decent storage and a quiet space for interviews.',
  },
  {
    question: 'How do I find storytellers?',
    answer: 'That\'s where your community connections matter. We also send you leads from people who sign up at wembleywonders.org/oral-history - you contact them and arrange the interview.',
  },
  {
    question: 'What if an interview isn\'t approved?',
    answer: 'Most rejections are for technical reasons (audio too poor) or because the person already has a story in that series. We give feedback so you can improve. Re-recordings are sometimes possible.',
  },
  {
    question: 'Can I interview family members?',
    answer: 'Yes! In fact, your own family often has the best stories. Just ensure proper consent and editorial distance - treat it professionally.',
  },
  {
    question: 'Is this a job or freelance?',
    answer: 'Freelance. You\'re self-employed, work your own hours, and invoice us monthly for approved interviews. No tax is deducted - you\'re responsible for declaring your earnings.',
  },
  {
    question: 'How long does each interview take?',
    answer: 'The interview itself is 20-45 minutes depending on the series. With travel, setup, and admin, budget about 1.5-2 hours total per interview.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'Primarily Wembley and Brent, but we accept stories from across North West London. If you have connections in other areas with diaspora communities, talk to us.',
  },
  {
    question: 'When do I get paid?',
    answer: 'Monthly, on the last Friday of each month. Minimum payout is £30 (2 interviews). We review submissions within 5-10 working days.',
  },
];

// ========================================
// COMPONENT
// ========================================

const CommunityArchivistPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    background: '',
    communityConnections: '',
    whyInterested: '',
    availability: '',
    isMember: 'no',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Archivist application:', formData);
    setFormSubmitted(true);
    
    // Store in localStorage for demo
    const applications = JSON.parse(localStorage.getItem('ww_archivist_applications') || '[]');
    applications.push({
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('ww_archivist_applications', JSON.stringify(applications));
  };

  return (
    <div className="community-archivist-page">
      
      {/* Hero Section */}
      <section className="ca-hero">
        <div className="ca-hero__container">
          <div className="ca-hero__badge">
            <Mic size={16} />
            Earn With Us
          </div>
          <h1 className="ca-hero__title">
            Become a<br />
            <span className="ca-hero__highlight">Community Archivist</span>
          </h1>
          <p className="ca-hero__subtitle">
            Collect oral histories from your community. Preserve stories that matter. 
            Earn <strong>£15 per interview</strong> you conduct.
          </p>
          <div className="ca-hero__cta">
            <a href="#apply" className="ca-btn ca-btn--primary">
              <FileText size={20} />
              Apply Now
            </a>
            <a href="#how-it-works" className="ca-btn ca-btn--secondary">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="ca-hero__stats">
          <div className="ca-hero__stat">
            <span className="ca-hero__stat-number">£15</span>
            <span className="ca-hero__stat-label">Per interview</span>
          </div>
          <div className="ca-hero__stat">
            <span className="ca-hero__stat-number">Flexible</span>
            <span className="ca-hero__stat-label">Hours</span>
          </div>
          <div className="ca-hero__stat">
            <span className="ca-hero__stat-number">Phone</span>
            <span className="ca-hero__stat-label">Only equipment</span>
          </div>
          <div className="ca-hero__stat">
            <span className="ca-hero__stat-number">Monthly</span>
            <span className="ca-hero__stat-label">Payment</span>
          </div>
        </div>
      </section>

      {/* What Is It Section */}
      <section className="ca-section ca-what">
        <div className="ca-container">
          <div className="ca-what__content">
            <h2>What is a Community Archivist?</h2>
            <p>
              A Community Archivist is a trained member of Wembley Wonders who conducts 
              oral history interviews on behalf of our Rayd-yo Community Archive. You find 
              storytellers, conduct recorded interviews using our guides, and submit them for broadcast.
            </p>
            <p>
              Think of it as being a <strong>story collector</strong> - you're preserving the voices 
              of your community before they're lost. Elders with memories of home. Parents with 
              arrival stories. Second-generation voices navigating identity. Food memories. 
              Heritage knowledge.
            </p>
            <div className="ca-what__highlight">
              <Sparkles size={24} />
              <div>
                <strong>This isn't just a side hustle.</strong>
                <p>You're building a permanent archive that future generations will treasure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="ca-section ca-candidates">
        <div className="ca-container">
          <h2 className="ca-section__title">Who Is This For?</h2>
          <p className="ca-section__subtitle">People with community connections and a few hours to spare</p>
          
          <div className="ca-candidates__grid">
            {idealCandidates.map((candidate, index) => (
              <div key={index} className="ca-candidate-card">
                <div className="ca-candidate-card__icon">{candidate.icon}</div>
                <h3>{candidate.title}</h3>
                <p className="ca-candidate-card__desc">{candidate.description}</p>
                <div className="ca-candidate-card__why">
                  <strong>Why this works for you:</strong>
                  <p>{candidate.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="ca-section ca-process">
        <div className="ca-container">
          <h2 className="ca-section__title">How It Works</h2>
          <p className="ca-section__subtitle">From application to your first payment</p>
          
          <div className="ca-process__timeline">
            <div className="ca-process__step">
              <div className="ca-process__step-number">1</div>
              <div className="ca-process__step-content">
                <h3>Apply & Join</h3>
                <p>Fill in the application below. If accepted, you'll need to become a Wembley Wonders member (£5/month Connector tier minimum).</p>
              </div>
            </div>
            
            <div className="ca-process__step">
              <div className="ca-process__step-number">2</div>
              <div className="ca-process__step-content">
                <h3>Complete Training</h3>
                <p>Take our free 2-hour Oral History Basics module. Online or in-person. Covers ethics, consent, interview technique, recording tips.</p>
              </div>
            </div>
            
            <div className="ca-process__step">
              <div className="ca-process__step-number">3</div>
              <div className="ca-process__step-content">
                <h3>Get Your Toolkit</h3>
                <p>Access interview guides, consent forms, submission portal, and the Community Archivist WhatsApp group for support.</p>
              </div>
            </div>
            
            <div className="ca-process__step">
              <div className="ca-process__step-number">4</div>
              <div className="ca-process__step-content">
                <h3>Find Storytellers</h3>
                <p>Use your community connections. We also send you leads from our website. You schedule at times that work for you.</p>
              </div>
            </div>
            
            <div className="ca-process__step">
              <div className="ca-process__step-number">5</div>
              <div className="ca-process__step-content">
                <h3>Conduct Interviews</h3>
                <p>Meet the storyteller (their home, care home, or community space). Record on your phone. Get consent signed.</p>
              </div>
            </div>
            
            <div className="ca-process__step">
              <div className="ca-process__step-number">6</div>
              <div className="ca-process__step-content">
                <h3>Submit & Get Paid</h3>
                <p>Upload audio and consent form within 48 hours. After editorial approval, you earn £15. Paid monthly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="ca-section ca-earnings">
        <div className="ca-container">
          <h2 className="ca-section__title">What You Can Earn</h2>
          
          <div className="ca-earnings__grid">
            <div className="ca-earnings__card ca-earnings__card--main">
              <PoundSterling size={32} />
              <div className="ca-earnings__amount">£15</div>
              <div className="ca-earnings__label">Per approved interview</div>
            </div>
            
            <div className="ca-earnings__card">
              <div className="ca-earnings__scenario">
                <strong>Casual</strong>
                <span>2 interviews/month</span>
              </div>
              <div className="ca-earnings__result">£30/month</div>
            </div>
            
            <div className="ca-earnings__card">
              <div className="ca-earnings__scenario">
                <strong>Regular</strong>
                <span>4-6 interviews/month</span>
              </div>
              <div className="ca-earnings__result">£60-90/month</div>
            </div>
            
            <div className="ca-earnings__card">
              <div className="ca-earnings__scenario">
                <strong>Active</strong>
                <span>8+ interviews/month</span>
              </div>
              <div className="ca-earnings__result">£120+/month</div>
            </div>
          </div>
          
          <div className="ca-earnings__note">
            <CheckCircle size={20} />
            <p>
              <strong>No minimum commitment.</strong> Interview when you have time. 
              Some months you might do 10 interviews, some months zero. You're in control.
            </p>
          </div>
        </div>
      </section>

      {/* What You Need Section */}
      <section className="ca-section ca-requirements">
        <div className="ca-container">
          <h2 className="ca-section__title">What You Need</h2>
          
          <div className="ca-requirements__grid">
            <div className="ca-requirements__column">
              <h3><CheckCircle size={20} /> Essential</h3>
              <ul>
                <li>Smartphone with voice recording app</li>
                <li>Wembley Wonders membership (Connector tier, £5/month)</li>
                <li>Completed Oral History Basics training (free)</li>
                <li>DBS check (we help arrange this if needed)</li>
                <li>Community connections - people who trust you</li>
              </ul>
            </div>
            
            <div className="ca-requirements__column">
              <h3><Sparkles size={20} /> Helpful (Not Required)</h3>
              <ul>
                <li>Heritage language fluency (opens more interviews)</li>
                <li>Access to care homes or elder communities</li>
                <li>Previous interview or research experience</li>
                <li>Connections to underrepresented communities</li>
                <li>Flexible daytime availability (elders prefer mornings)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="ca-section ca-toolkit">
        <div className="ca-container">
          <h2 className="ca-section__title">Your Toolkit</h2>
          <p className="ca-section__subtitle">Everything you need to succeed</p>
          
          <div className="ca-toolkit__grid">
            <div className="ca-toolkit__item">
              <FileText size={24} />
              <h4>Interview Guides</h4>
              <p>Detailed question guides for each series - Arrival Stories, Elder Wisdom, Kitchen Stories, and more.</p>
            </div>
            
            <div className="ca-toolkit__item">
              <FileText size={24} />
              <h4>Consent Forms</h4>
              <p>Legally-reviewed consent forms that protect you, the storyteller, and Wembley Wonders.</p>
            </div>
            
            <div className="ca-toolkit__item">
              <Building size={24} />
              <h4>Submission Portal</h4>
              <p>Easy upload system for audio files, consent forms, and metadata. Track your submissions.</p>
            </div>
            
            <div className="ca-toolkit__item">
              <MessageCircle size={24} />
              <h4>WhatsApp Support</h4>
              <p>Community of fellow archivists. Ask questions, share tips, troubleshoot issues.</p>
            </div>
            
            <div className="ca-toolkit__item">
              <Calendar size={24} />
              <h4>Monthly Meetups</h4>
              <p>First Thursday of each month. Share experiences, get feedback, improve your skills.</p>
            </div>
            
            <div className="ca-toolkit__item">
              <Award size={24} />
              <h4>Ongoing Training</h4>
              <p>Advanced workshops on sensitive topics, elder interviewing, heritage language recording.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="ca-section ca-form-section">
        <div className="ca-container">
          <h2 className="ca-section__title">Apply to Become a Community Archivist</h2>
          <p className="ca-section__subtitle">Tell us about yourself and your community connections</p>
          
          {formSubmitted ? (
            <div className="ca-form-success">
              <CheckCircle size={48} />
              <h3>Application Received!</h3>
              <p>
                Thank you for your interest in becoming a Community Archivist. 
                We'll review your application and be in touch within 5 working days.
              </p>
              <p className="ca-form-success__next">
                <strong>What happens next:</strong> If your application looks good, we'll invite you 
                for a brief chat (in person or video call) to discuss your community connections 
                and answer any questions.
              </p>
            </div>
          ) : (
            <form className="ca-form" onSubmit={handleSubmit}>
              <div className="ca-form__section">
                <h3>About You</h3>
                
                <div className="ca-form__row ca-form__row--two">
                  <div className="ca-form__group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="ca-form__group">
                    <label htmlFor="location">Area You Live *</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g., Wembley, Harlesden, Kilburn"
                    />
                  </div>
                </div>
                
                <div className="ca-form__row ca-form__row--two">
                  <div className="ca-form__group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="ca-form__group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="ca-form__group">
                  <label htmlFor="background">Your Background *</label>
                  <textarea
                    id="background"
                    name="background"
                    value={formData.background}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    placeholder="Student? Care worker? What do you currently do? Any relevant experience?"
                  />
                </div>
              </div>
              
              <div className="ca-form__section">
                <h3>Your Community Connections</h3>
                
                <div className="ca-form__group">
                  <label htmlFor="communityConnections">Who Could You Interview? *</label>
                  <textarea
                    id="communityConnections"
                    name="communityConnections"
                    value={formData.communityConnections}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    placeholder="Think about: family members with arrival stories, elders at your church/mosque/temple, residents at a care home you work at, community associations you're part of..."
                  />
                  <p className="ca-form__hint">
                    We're looking for people with genuine community access - not just good intentions.
                  </p>
                </div>
              </div>
              
              <div className="ca-form__section">
                <h3>Motivation & Availability</h3>
                
                <div className="ca-form__group">
                  <label htmlFor="whyInterested">Why Are You Interested? *</label>
                  <textarea
                    id="whyInterested"
                    name="whyInterested"
                    value={formData.whyInterested}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    placeholder="What draws you to oral history work? Why does preserving community stories matter to you?"
                  />
                </div>
                
                <div className="ca-form__group">
                  <label htmlFor="availability">Your Availability *</label>
                  <textarea
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleFormChange}
                    required
                    rows={2}
                    placeholder="When are you typically free? Evenings? Weekends? Flexible daytime?"
                  />
                </div>
                
                <div className="ca-form__group">
                  <label htmlFor="isMember">Are you already a Wembley Wonders member? *</label>
                  <select
                    id="isMember"
                    name="isMember"
                    value={formData.isMember}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="no">No, not yet</option>
                    <option value="yes">Yes, I'm a member</option>
                    <option value="applied">I've applied but not confirmed</option>
                  </select>
                  <p className="ca-form__hint">
                    You'll need Connector membership (£5/month) to become a Community Archivist. 
                    Don't worry - you can sign up after your application is accepted.
                  </p>
                </div>
              </div>
              
              <button type="submit" className="ca-btn ca-btn--primary ca-btn--large">
                <FileText size={20} />
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="ca-section ca-faq">
        <div className="ca-container">
          <h2 className="ca-section__title">Frequently Asked Questions</h2>
          
          <div className="ca-faq__list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`ca-faq__item ${expandedFaq === index ? 'ca-faq__item--expanded' : ''}`}
              >
                <button
                  className="ca-faq__question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === index && (
                  <div className="ca-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="ca-section ca-story-cta">
        <div className="ca-container">
          <div className="ca-story-cta__content">
            <h2>Have a Story to Share Instead?</h2>
            <p>
              Not interested in collecting stories, but have one of your own? 
              Share your arrival story, food memories, or elder wisdom and earn £25.
            </p>
            <Link to="/raydyo" className="ca-btn ca-btn--secondary">
              <BookOpen size={18} />
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CommunityArchivistPage;