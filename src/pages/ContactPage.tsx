import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Users, 
  Headphones, Calendar, HelpCircle, Heart, AlertCircle,
  Send, CheckCircle, ExternalLink, Navigation
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [selectedContactType, setSelectedContactType] = useState<string>('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    contactType: '',
    subject: '',
    message: '',
    urgency: 'standard',
    preferredResponse: 'email'
  });

  const contactMethods = [
    {
      id: 'general-inquiry',
      title: 'General Inquiries',
      description: 'Questions about our programs, membership, or community activities',
      icon: <MessageCircle size={24} />,
      channels: [
        { type: 'email', value: 'hello@wembleywonders.org', response: '24-48 hours' },
        { type: 'phone', value: '+44 (0) 20 XXXX XXXX', response: 'Mon-Fri 10am-4pm' }
      ],
      color: '#06b6d4'
    },
    {
      id: 'membership',
      title: 'Membership Support',
      description: 'Join our community, member benefits, or account assistance',
      icon: <Users size={24} />,
      channels: [
        { type: 'email', value: 'membership@wembleywonders.org', response: '24 hours' },
        { type: 'phone', value: '+44 (0) 20 XXXX XXXX', response: 'Tue-Thu 1pm-5pm' }
      ],
      color: '#10b981'
    },
    {
      id: 'workshops',
      title: 'Workshops & Programs',
      description: 'Course bookings, workshop schedules, and learning support',
      icon: <Calendar size={24} />,
      channels: [
        { type: 'email', value: 'workshops@wembleywonders.org', response: '24 hours' },
        { type: 'whatsapp', value: '+44 7XXX XXX XXX', response: 'Mon-Fri 9am-6pm' }
      ],
      color: '#8b5cf6'
    },
    {
      id: 'media-platforms',
      title: 'Media & Content',
      description: 'Rayd-yo shows, Joystick articles, or content submissions',
      icon: <Headphones size={24} />,
      channels: [
        { type: 'email', value: 'media@wembleywonders.org', response: '48 hours' },
        { type: 'discord', value: 'WembleyWonders#1234', response: 'Community managed' }
      ],
      color: '#f59e0b'
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      description: 'Consulting, training, and business collaboration opportunities',
      icon: <ExternalLink size={24} />,
      channels: [
        { type: 'email', value: 'consulting@g-tech.community', response: '24 hours' },
        { type: 'phone', value: '+44 (0) 20 XXXX XXXX', response: 'Mon-Fri 9am-5pm' }
      ],
      color: '#ef4444'
    },
    {
      id: 'support',
      title: 'Support & Wellbeing',
      description: 'Community support, accessibility needs, or personal assistance',
      icon: <Heart size={24} />,
      channels: [
        { type: 'email', value: 'support@wembleywonders.org', response: '12 hours' },
        { type: 'text', value: '+44 7XXX XXX XXX', response: 'Mon-Fri 9am-9pm' }
      ],
      color: '#ec4899'
    }
  ];

  const officeHours = [
    { day: 'Monday', hours: '10:00am - 6:00pm', services: 'All services available' },
    { day: 'Tuesday', hours: '10:00am - 8:00pm', services: 'Extended membership support' },
    { day: 'Wednesday', hours: '12:00pm - 6:00pm', services: 'Workshop bookings focus' },
    { day: 'Thursday', hours: '10:00am - 8:00pm', services: 'Professional services' },
    { day: 'Friday', hours: '10:00am - 4:00pm', services: 'Community events planning' },
    { day: 'Saturday', hours: 'By appointment', services: 'Workshop delivery only' },
    { day: 'Sunday', hours: 'Closed', services: 'Emergency contact available' }
  ];

  const handleContactSubmission = () => {
    console.log('Contact form submitted:', contactForm);
    alert(`Thank you ${contactForm.name}! We'll respond via ${contactForm.preferredResponse} within our standard timeframe.`);
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      contactType: '',
      subject: '',
      message: '',
      urgency: 'standard',
      preferredResponse: 'email'
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={16} />;
      case 'phone': return <Phone size={16} />;
      case 'whatsapp': return <MessageCircle size={16} />;
      case 'discord': return <Users size={16} />;
      case 'text': return <MessageCircle size={16} />;
      default: return <MessageCircle size={16} />;
    }
  };

  const ContactMethodCard = ({ method }: { method: any }) => (
    <div className="contact-method-card" style={{ borderLeftColor: method.color }}>
      <div className="method-header">
        <div className="method-icon" style={{ backgroundColor: `${method.color}20`, color: method.color }}>
          {method.icon}
        </div>
        <div className="method-info">
          <h3>{method.title}</h3>
          <p>{method.description}</p>
        </div>
      </div>
      
      <div className="method-channels">
        {method.channels.map((channel: any, index: number) => (
          <div key={index} className="channel-item">
            <div className="channel-details">
              {getChannelIcon(channel.type)}
              <div className="channel-info">
                <span className="channel-value">{channel.value}</span>
                <span className="response-time">Response: {channel.response}</span>
              </div>
            </div>
            <button 
              className="contact-btn"
              onClick={() => {
                setSelectedContactType(method.id);
                setContactForm(prev => ({ ...prev, contactType: method.id }));
              }}
              style={{ backgroundColor: method.color }}
            >
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="contact-page-content">
      {/* Page Header */}
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p className="header-subtitle">
          Multiple ways to connect with our community. Choose the method that works best for your needs, 
          and we'll respond with the care and attention you deserve.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="contact-methods-section">
        <h2>Choose Your Contact Method</h2>
        <div className="contact-methods-grid">
          {contactMethods.map(method => (
            <ContactMethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>

      {/* Quick Contact Form */}
      <div className="quick-contact-section">
        <h2>Send Us a Message</h2>
        <div className="contact-form-container">
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="How should we address you?"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone (Optional)</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+44 20 XXXX XXXX"
                />
              </div>
              <div className="form-group">
                <label>What's this about?</label>
                <select
                  value={contactForm.contactType}
                  onChange={(e) => setContactForm(prev => ({ ...prev, contactType: e.target.value }))}
                >
                  <option value="">Select a topic...</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="membership">Membership</option>
                  <option value="workshops">Workshops & Programs</option>
                  <option value="media-platforms">Media & Content</option>
                  <option value="professional-services">Professional Services</option>
                  <option value="support">Support & Wellbeing</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief summary of your message"
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>
              <textarea
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us more about how we can help you..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Urgency Level</label>
                <select
                  value={contactForm.urgency}
                  onChange={(e) => setContactForm(prev => ({ ...prev, urgency: e.target.value }))}
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="standard">Standard - Normal response time</option>
                  <option value="high">High - Need response within 24 hours</option>
                  <option value="urgent">Urgent - Same day response needed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Response Method</label>
                <select
                  value={contactForm.preferredResponse}
                  onChange={(e) => setContactForm(prev => ({ ...prev, preferredResponse: e.target.value }))}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone call</option>
                  <option value="text">Text message</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>

            <button onClick={handleContactSubmission} className="submit-contact-btn">
              <Send size={18} />
              Send Message
            </button>
          </div>

          <div className="contact-sidebar">
            <div className="response-expectations">
              <h3>Response Times</h3>
              <div className="expectation-item">
                <CheckCircle size={16} className="check-icon" />
                <span>General inquiries: 24-48 hours</span>
              </div>
              <div className="expectation-item">
                <CheckCircle size={16} className="check-icon" />
                <span>Membership support: Within 24 hours</span>
              </div>
              <div className="expectation-item">
                <CheckCircle size={16} className="check-icon" />
                <span>Urgent matters: Same day</span>
              </div>
              <div className="expectation-item">
                <AlertCircle size={16} className="alert-icon" />
                <span>Emergencies: Call directly</span>
              </div>
            </div>

            <div className="accessibility-notice">
              <h3>Accessibility Support</h3>
              <p>Need assistance with accessibility? We provide:</p>
              <ul>
                <li>BSL interpretation (advance booking)</li>
                <li>Large print materials</li>
                <li>Easy read formats</li>
                <li>Phone support for online forms</li>
              </ul>
              <p>Contact our support team for assistance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours & Location */}
      <div className="office-info-section">
        <div className="office-hours">
          <h2>
            <Clock size={24} />
            Office Hours
          </h2>
          <div className="hours-grid">
            {officeHours.map((day, index) => (
              <div key={index} className="hours-item">
                <div className="day-name">{day.day}</div>
                <div className="day-hours">{day.hours}</div>
                <div className="day-services">{day.services}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="location-info">
          <h2>
            <MapPin size={24} />
            Find Us
          </h2>
          <div className="location-details">
            <div className="address">
              <strong>Wembley Wonders CIC</strong><br />
              Community Hub Building<br />
              123 High Road<br />
              Wembley, London HA0 1XX
            </div>
            
            <div className="transport-info">
              <h4>Public Transport</h4>
              <ul>
                <li>Wembley Central Station - 5 min walk</li>
                <li>Bus routes: 18, 92, 182, 223</li>
                <li>Parking available on-site</li>
              </ul>
            </div>

            <button className="directions-btn">
              <Navigation size={16} />
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Community Feedback Note */}
      <div className="community-feedback-note">
        <h2>Your Voice Matters</h2>
        <p>
          We're always looking to improve our community programs and services. 
          Whether you have feedback, suggestions, or just want to share your experience, 
          we'd love to hear from you. Your input helps us build a better community for everyone.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;