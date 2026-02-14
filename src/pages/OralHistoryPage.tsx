import React, { useState } from 'react';
import { 
  BookOpen, Mic, Heart, Clock, PoundSterling, Users,
  CheckCircle, ArrowRight, Globe, Utensils, Ship, 
  User, MessageCircle, Calendar, Mail, Phone,
  ChevronDown, ChevronUp, Archive, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './OralHistoryPage.css';

// ========================================
// TYPES
// ========================================

interface StorySeriesType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  lookingFor: string[];
  duration: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ========================================
// DATA
// ========================================

const storySeries: StorySeriesType[] = [
  {
    id: 'arrival-stories',
    title: 'Arrival Stories',
    icon: <Globe size={32} />,
    description: 'First-person accounts of coming to the UK - the journey, culture shock, and finding your feet.',
    lookingFor: [
      'When and why you came to Britain',
      'First impressions and surprises',
      'How you adapted and what you miss',
    ],
    duration: '15-30 minutes',
  },
  {
    id: 'kitchen-stories',
    title: 'Island Kitchen Stories',
    icon: <Utensils size={32} />,
    description: 'Food memories from home - recipes, what changed when cooking here, the tastes you miss.',
    lookingFor: [
      'Food memories from your childhood',
      'What you couldn\'t find in Britain',
      'Recipes that would be lost without you',
    ],
    duration: '20 minutes',
  },
  {
    id: 'between-worlds',
    title: 'Between Two Worlds',
    icon: <Users size={32} />,
    description: 'Second generation voices - born here, from there. Identity, belonging, code-switching.',
    lookingFor: [
      'Growing up between cultures',
      'Questions of identity and belonging',
      'What you inherited, what you rejected',
    ],
    duration: '25 minutes',
  },
  {
    id: 'elder-wisdom',
    title: 'Elder Wisdom',
    icon: <Heart size={32} />,
    description: 'Conversations with community elders - preserving stories, advice, and heritage knowledge.',
    lookingFor: [
      'Life lessons and advice for young people',
      'Traditions and skills being lost',
      'Stories from your community\'s history',
    ],
    duration: '30-45 minutes',
  },
  {
    id: 'windrush-legacy',
    title: 'Windrush & Beyond',
    icon: <Ship size={32} />,
    description: 'The Windrush generation and descendants - history, hostile environment, resilience.',
    lookingFor: [
      'Windrush generation testimonies',
      'Experiences of the hostile environment',
      'Stories of community resilience',
    ],
    duration: '30 minutes',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Do I need any experience?',
    answer: 'No! You just need your own story and experiences to share. We handle all the recording and production - you just talk.',
  },
  {
    question: 'How long does it take?',
    answer: 'Most interviews take 20-45 minutes depending on the series. We work around your schedule and can come to your home or meet at a community space.',
  },
  {
    question: 'When do I get paid?',
    answer: 'You receive £25 after your story is approved and broadcast on Rayd-yo community radio. Payment is usually within 2 weeks of broadcast, via bank transfer, PayPal, or cash pickup.',
  },
  {
    question: 'Can I share my story more than once?',
    answer: 'Each person can contribute ONE story per series. But if you have different stories - for example, an Arrival Story AND a Kitchen Story - those are separate contributions with separate payments.',
  },
  {
    question: 'What if I change my mind?',
    answer: 'You can withdraw consent any time BEFORE your story is broadcast. Once it\'s in our archive, it becomes part of our permanent community record.',
  },
  {
    question: 'Will my story be edited?',
    answer: 'We may edit for length and clarity, but we never change what you said or meant. If you ask us to exclude something specific, we will.',
  },
  {
    question: 'Who owns my story?',
    answer: 'You grant Wembley Wonders rights to broadcast and archive your story. These rights are non-exclusive, meaning you can still share your story elsewhere.',
  },
  {
    question: 'Can I stay anonymous?',
    answer: 'You can use just your first name or a pseudonym if you prefer. We\'ll discuss this when you sign up.',
  },
];

// ========================================
// COMPONENT
// ========================================

const OralHistoryPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    series: '',
    briefStory: '',
    preferredContact: 'email',
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
    // In production, this would submit to backend
    console.log('Story submission:', formData);
    setFormSubmitted(true);
    
    // Store in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('ww_story_submissions') || '[]');
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('ww_story_submissions', JSON.stringify(submissions));
  };

  return (
    <div className="oral-history-page">
      
      {/* Hero Section */}
      <section className="oh-hero">
        <div className="oh-hero__container">
          <div className="oh-hero__badge">
            <Archive size={16} />
            Community Archive
          </div>
          <h1 className="oh-hero__title">
            Your Story Matters.<br />
            <span className="oh-hero__highlight">Get Paid to Share It.</span>
          </h1>
          <p className="oh-hero__subtitle">
            We're building a permanent oral history archive of Wembley's diverse communities. 
            Share your unique story, preserve it for future generations, and earn <strong>£25</strong>.
          </p>
          <div className="oh-hero__cta">
            <a href="#share-story" className="oh-btn oh-btn--primary">
              <Mic size={20} />
              Share Your Story
            </a>
            <a href="#how-it-works" className="oh-btn oh-btn--secondary">
              Learn How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="oh-section oh-mission">
        <div className="oh-container">
          <div className="oh-mission__content">
            <h2>Building a Living Archive</h2>
            <p>
              Wembley is one of the most diverse places in England. Our community holds thousands of 
              stories - of arrival, adaptation, resilience, and hope. Stories that your grandchildren 
              will want to hear. Stories that are being lost as elders pass on.
            </p>
            <p>
              <strong>Rayd-yo Community Radio</strong> is collecting these stories, broadcasting them, 
              and preserving them in a permanent archive. When you share your story, you're not just 
              getting paid - you're contributing to our community's collective memory.
            </p>
            <div className="oh-mission__stats">
              <div className="oh-stat">
                <span className="oh-stat__number">£25</span>
                <span className="oh-stat__label">Per story published</span>
              </div>
              <div className="oh-stat">
                <span className="oh-stat__number">5</span>
                <span className="oh-stat__label">Story series</span>
              </div>
              <div className="oh-stat">
                <span className="oh-stat__number">∞</span>
                <span className="oh-stat__label">Preserved forever</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="oh-section oh-process">
        <div className="oh-container">
          <h2 className="oh-section__title">How It Works</h2>
          <p className="oh-section__subtitle">Four simple steps from signup to payment</p>
          
          <div className="oh-process__steps">
            <div className="oh-step">
              <div className="oh-step__number">1</div>
              <div className="oh-step__icon"><MessageCircle size={28} /></div>
              <h3>Tell Us About Yourself</h3>
              <p>Fill in the form below with a brief description of the story you'd like to share.</p>
            </div>
            
            <div className="oh-step">
              <div className="oh-step__number">2</div>
              <div className="oh-step__icon"><Calendar size={28} /></div>
              <h3>We Schedule Your Interview</h3>
              <p>A Community Archivist contacts you to arrange a time. We come to you - your home, a care home, or community space.</p>
            </div>
            
            <div className="oh-step">
              <div className="oh-step__number">3</div>
              <div className="oh-step__icon"><Mic size={28} /></div>
              <h3>Share Your Story</h3>
              <p>A relaxed conversation guided by our interviewer. You talk, we record. Usually 20-45 minutes.</p>
            </div>
            
            <div className="oh-step">
              <div className="oh-step__number">4</div>
              <div className="oh-step__icon"><PoundSterling size={28} /></div>
              <h3>Get Paid</h3>
              <p>After editorial review and broadcast on Rayd-yo, you receive £25 via bank transfer, PayPal, or cash.</p>
            </div>
          </div>
          
          <div className="oh-process__note">
            <CheckCircle size={20} />
            <p><strong>No equipment needed.</strong> No experience required. We handle everything - you just share your story.</p>
          </div>
        </div>
      </section>

      {/* Story Series Section */}
      <section className="oh-section oh-series">
        <div className="oh-container">
          <h2 className="oh-section__title">What Stories We're Collecting</h2>
          <p className="oh-section__subtitle">Choose the series that fits your experience</p>
          
          <div className="oh-series__grid">
            {storySeries.map((series) => (
              <div 
                key={series.id} 
                className={`oh-series__card ${selectedSeries === series.id ? 'oh-series__card--selected' : ''}`}
                onClick={() => {
                  setSelectedSeries(series.id);
                  setFormData({ ...formData, series: series.id });
                }}
              >
                <div className="oh-series__icon">{series.icon}</div>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
                <div className="oh-series__looking-for">
                  <strong>We're looking for:</strong>
                  <ul>
                    {series.lookingFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="oh-series__meta">
                  <Clock size={14} />
                  <span>{series.duration}</span>
                  <PoundSterling size={14} />
                  <span>£25</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Voices Section */}
      <section className="oh-section oh-priority">
        <div className="oh-container">
          <div className="oh-priority__content">
            <Sparkles size={32} className="oh-priority__icon" />
            <h2>Priority Voices</h2>
            <p>
              We're building a <strong>diverse</strong> archive, not a repeat roster. 
              We prioritise voices not yet represented:
            </p>
            <div className="oh-priority__list">
              <div className="oh-priority__item">
                <Heart size={18} />
                <span><strong>Elders (75+)</strong> - preserving wisdom while we can</span>
              </div>
              <div className="oh-priority__item">
                <Globe size={18} />
                <span><strong>Underrepresented communities</strong> - not just the largest diaspora groups</span>
              </div>
              <div className="oh-priority__item">
                <Users size={18} />
                <span><strong>First-time contributors</strong> - one unique testimony per person per series</span>
              </div>
              <div className="oh-priority__item">
                <BookOpen size={18} />
                <span><strong>Unique perspectives</strong> - stories that add something new to our archive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Form Section */}
      <section id="share-story" className="oh-section oh-form-section">
        <div className="oh-container">
          <h2 className="oh-section__title">Share Your Story</h2>
          <p className="oh-section__subtitle">Tell us about yourself and we'll be in touch to arrange your interview</p>
          
          {formSubmitted ? (
            <div className="oh-form-success">
              <CheckCircle size={48} />
              <h3>Thank You!</h3>
              <p>We've received your submission. A Community Archivist will contact you within 5 working days to arrange your interview.</p>
              <p className="oh-form-success__note">
                Check your email (and spam folder) for our response.
              </p>
            </div>
          ) : (
            <form className="oh-form" onSubmit={handleSubmit}>
              <div className="oh-form__row">
                <div className="oh-form__group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Full name"
                  />
                </div>
              </div>
              
              <div className="oh-form__row oh-form__row--two">
                <div className="oh-form__group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div className="oh-form__group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="07xxx xxxxxx"
                  />
                </div>
              </div>
              
              <div className="oh-form__group">
                <label htmlFor="series">Which Story Series? *</label>
                <select
                  id="series"
                  name="series"
                  value={formData.series}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a series...</option>
                  {storySeries.map((series) => (
                    <option key={series.id} value={series.id}>{series.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="oh-form__group">
                <label htmlFor="briefStory">Tell Us Briefly About Your Story *</label>
                <textarea
                  id="briefStory"
                  name="briefStory"
                  value={formData.briefStory}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="A few sentences about the story you'd like to share. For example: 'I came to Wembley from Jamaica in 1962. I have stories about the journey, finding work, and how different everything was...'"
                />
                <p className="oh-form__hint">This helps us match you with the right Community Archivist</p>
              </div>
              
              <div className="oh-form__group">
                <label>Preferred Contact Method *</label>
                <div className="oh-form__radio-group">
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleFormChange}
                    />
                    <Mail size={16} />
                    Email
                  </label>
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleFormChange}
                    />
                    <Phone size={16} />
                    Phone Call
                  </label>
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleFormChange}
                    />
                    <MessageCircle size={16} />
                    WhatsApp
                  </label>
                </div>
              </div>
              
              <div className="oh-form__consent">
                <p>
                  By submitting this form, you're expressing interest in sharing your story. 
                  Full consent (including payment details and rights) will be discussed and signed 
                  before your interview takes place.
                </p>
              </div>
              
              <button type="submit" className="oh-btn oh-btn--primary oh-btn--large">
                <Mic size={20} />
                Submit My Interest
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="oh-section oh-faq">
        <div className="oh-container">
          <h2 className="oh-section__title">Frequently Asked Questions</h2>
          
          <div className="oh-faq__list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`oh-faq__item ${expandedFaq === index ? 'oh-faq__item--expanded' : ''}`}
              >
                <button
                  className="oh-faq__question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === index && (
                  <div className="oh-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Archivist CTA */}
      <section className="oh-section oh-archivist-cta">
        <div className="oh-container">
          <div className="oh-archivist-cta__content">
            <h2>Want to Collect Stories?</h2>
            <p>
              Become a <strong>Community Archivist</strong> and earn £15 per interview you conduct. 
              Perfect for students, care workers, or anyone with community connections.
            </p>
            <Link to="/raydyo" className="oh-btn oh-btn--golden">
              Learn About Community Archivists
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Listen Section */}
      <section className="oh-section oh-listen">
        <div className="oh-container">
          <h2 className="oh-section__title">Hear Stories From Our Archive</h2>
          <p className="oh-section__subtitle">Listen to stories already shared by your neighbours</p>
          <Link to="/raydyo" className="oh-btn oh-btn--secondary">
            <BookOpen size={18} />
            Visit Rayd-yo
          </Link>
        </div>
      </section>

    </div>
  );
};

export default OralHistoryPage;